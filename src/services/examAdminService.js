import { supabase } from '../lib/supabase.js';

export const examAdminService = {
  // --- Exam Sessions ---
  async fetchQuestionBanks() {
    const { data, error } = await supabase.from('question_banks').select('*');
    if (error) throw error;
    return data;
  },

  async fetchExamSessions() {
    const { data, error } = await supabase
      .from('exam_sessions')
      .select('*, question_banks(title)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createExamSession(sessionData, questionsData) {
    let payload = { ...sessionData };
    let { data, error } = await supabase.from('exam_sessions').insert([payload]).select().single();
    
    // Auto-fallback if database schema does not have shuffle_questions or shuffle_choices columns
    if (error && (error.message?.includes('shuffle_') || error.details?.includes('shuffle_'))) {
      delete payload.shuffle_questions;
      delete payload.shuffle_choices;
      const retryResult = await supabase.from('exam_sessions').insert([payload]).select().single();
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) throw error;

    const toInsert = questionsData.map((q, idx) => ({
      session_id: data.id,
      question_id: q.id,
      points: q.points,
      order_index: idx
    }));

    const { error: questionsError } = await supabase.from('exam_session_questions').insert(toInsert);
    if (questionsError) throw questionsError;

    return data;
  },

  async updateExamSession(id, updates) {
    let payload = { ...updates };
    let { data, error } = await supabase
      .from('exam_sessions')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    // Auto-fallback if database schema does not have shuffle_questions or shuffle_choices columns
    if (error && (error.message?.includes('shuffle_') || error.details?.includes('shuffle_'))) {
      delete payload.shuffle_questions;
      delete payload.shuffle_choices;
      const retryResult = await supabase
        .from('exam_sessions')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) throw error;
    return data;
  },

  async deleteExamSession(id) {
    const { error } = await supabase.from('exam_sessions').delete().eq('id', id);
    if (error) throw error;
  },

  // --- Participants ---
  async fetchExamParticipants(sessionId) {
    const { data, error } = await supabase
      .from('exam_participants')
      .select('*, students(first_name, last_name, classroom)')
      .eq('session_id', sessionId)
      .order('joined_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  async fetchExamParticipantsForResults(sessionId) {
    const { data, error } = await supabase
      .from('exam_participants')
      .select('id, student_id, status, allow_rejoin, retake_requested, retake_requested_at, strike_count, extra_time_minutes')
      .eq('session_id', sessionId);
    if (error) throw error;
    return data;
  },

  async updateParticipantRejoin(participantId, allowRejoin, status, rejoinMode) {
    const updates = { allow_rejoin: allowRejoin, status: status };
    if (rejoinMode) updates.rejoin_mode = rejoinMode;
    if (allowRejoin) {
      updates.started_at = null;
      updates.strike_count = 0;
      updates.warnings_count = 0;
    }
    const { error } = await supabase
      .from('exam_participants')
      .update(updates)
      .eq('id', participantId);
    if (error) throw error;
  },
  
  async updateParticipantRejoinByStudent(sessionId, studentId, allowRejoin, status) {
    const updates = { allow_rejoin: allowRejoin, status: status, retake_requested: false };
    if (allowRejoin) {
      updates.started_at = null;
      updates.strike_count = 0;
      updates.warnings_count = 0;
    }
    const { error } = await supabase
      .from('exam_participants')
      .update(updates)
      .eq('session_id', sessionId)
      .eq('student_id', studentId);
    if (error) throw error;
  },

  async deleteExamParticipant(participantId, sessionId, studentId) {
    // Delete results first
    await supabase
      .from('exam_results')
      .delete()
      .eq('session_id', sessionId)
      .eq('student_id', studentId);
    
    // Then participant
    const { error } = await supabase
      .from('exam_participants')
      .delete()
      .eq('id', participantId);
    if (error) throw error;
  },

  // --- Realtime Operations (Broadcast, Extra Time & Suspension Resolution) ---
  async sendRoomBroadcast(sessionId, event, payload) {
    const topic = `room:exam_${sessionId}`;
    const channel = supabase.channel(topic);
    if (typeof channel.subscribe === 'function' && channel.state !== 'joined') {
      await new Promise((resolve) => {
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED' || status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            resolve();
          }
        });
      });
    }
    return channel.send({
      type: 'broadcast',
      event,
      payload
    });
  },

  async broadcastAnnouncement(sessionId, message, teacherName = 'ครูผู้คุมสอบ') {
    const payload = {
      message,
      teacherName,
      timestamp: new Date().toISOString()
    };
    await this.sendRoomBroadcast(sessionId, 'broadcast_announcement', payload);
    return payload;
  },

  async broadcastRoomTimeAdjusted(sessionId, newTimeLimitMinutes, additionalMinutes = null) {
    const payload = {
      newTimeLimitMinutes,
      additionalMinutes,
      timestamp: new Date().toISOString()
    };
    await this.sendRoomBroadcast(sessionId, 'room_time_adjusted', payload);
    return payload;
  },

  async addExtraTimeToStudent(participantId, additionalMinutes = 5) {
    // Fetch current extra time
    const { data: pData, error: fetchErr } = await supabase
      .from('exam_participants')
      .select('extra_time_minutes, student_id, session_id')
      .eq('id', participantId)
      .maybeSingle();

    if (fetchErr) throw fetchErr;

    const currentExtra = Number(pData?.extra_time_minutes || 0);
    const newTotal = currentExtra + Number(additionalMinutes);

    const { error: updateErr } = await supabase
      .from('exam_participants')
      .update({ extra_time_minutes: newTotal })
      .eq('id', participantId);

    if (updateErr) throw updateErr;

    // Send realtime notification
    if (pData?.session_id) {
      const channel = supabase.channel(`room:exam_${pData.session_id}`);
      await channel.send({
        type: 'broadcast',
        event: 'time_extended',
        payload: {
          studentId: pData.student_id,
          additionalMinutes,
          newTotal
        }
      });
    }

    return { success: true, newTotal };
  },

  async resolveSuspension(sessionId, studentId, action, reason = null) {
    if (action === 'resume') {
      const { error } = await supabase
        .from('exam_participants')
        .update({
          status: 'testing',
          allow_rejoin: true,
          strike_count: 0,
          warnings_count: 0
        })
        .eq('session_id', sessionId)
        .eq('student_id', studentId);

      if (error) throw error;

      // Realtime notification to student
      const channel = supabase.channel(`room:exam_${sessionId}`);
      await channel.send({
        type: 'broadcast',
        event: 'suspension_resolved',
        payload: {
          studentId,
          action: 'resume'
        }
      });

      return { success: true, action: 'resume' };
    }

    if (action === 'force_submit') {
      // Call RPC to grade existing draft answers as suspended
      const { data, error } = await supabase.rpc('submit_exam_result', {
        p_session_id: sessionId,
        p_student_id: studentId,
        p_answers: {},
        p_time_spent: 0,
        p_is_suspended: true,
        p_note: reason || 'ครูผู้คุมสอบสั่งยุติการสอบทันที (Force Submit)'
      });

      if (error) throw error;

      const channel = supabase.channel(`room:exam_${sessionId}`);
      await channel.send({
        type: 'broadcast',
        event: 'suspension_resolved',
        payload: {
          studentId,
          action: 'force_submit'
        }
      });

      return { success: true, action: 'force_submit', data };
    }

    throw new Error(`Unknown resolution action: ${action}`);
  },

  async toggleSolutionsRelease(sessionId, released = true) {
    const { data, error } = await supabase
      .from('exam_sessions')
      .update({ solutions_released: released })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;

    const channel = supabase.channel(`room:exam_${sessionId}`);
    await channel.send({
      type: 'broadcast',
      event: 'solutions_released',
      payload: { released }
    });

    return data;
  },

  // --- Results ---
  async fetchExamResultsValid(sessionId) {
    const { data, error } = await supabase
      .from('exam_results')
      .select('student_id, score, is_suspended')
      .eq('session_id', sessionId)
      .eq('is_suspended', false);
    if (error) throw error;
    return data;
  },

  async fetchExamResultsFull(sessionId) {
    const { data, error } = await supabase
      .from('exam_results')
      .select('*, students(first_name, last_name, classroom)')
      .eq('session_id', sessionId)
      .order('submitted_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  async addExamResult(resultData) {
    const { error } = await supabase.from('exam_results').insert([resultData]);
    if (error) throw error;
  },

  async updateExamResultScore(id, score) {
    const { error } = await supabase
      .from('exam_results')
      .update({ score })
      .eq('id', id);
    if (error) throw error;
  },

  async deleteExamResult(id) {
    const { error } = await supabase
      .from('exam_results')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // --- Helpers / Students ---
  async fetchStudentById(studentId) {
    const { data, error } = await supabase
      .from('students')
      .select('student_id')
      .eq('student_id', studentId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async fetchAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('student_id, first_name, last_name, classroom');
    if (error) throw error;
    return data;
  }
};
