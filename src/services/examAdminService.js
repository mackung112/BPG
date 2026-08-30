import { supabase } from '../lib/supabase';

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
    const { data, error } = await supabase.from('exam_sessions').insert([sessionData]).select().single();
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
    const { data, error } = await supabase
      .from('exam_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
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
      .select('id, student_id, status, allow_rejoin, retake_requested, retake_requested_at')
      .eq('session_id', sessionId);
    if (error) throw error;
    return data;
  },

  async updateParticipantRejoin(participantId, allowRejoin, status, rejoinMode) {
    const updates = { allow_rejoin: allowRejoin, status: status };
    if (rejoinMode) updates.rejoin_mode = rejoinMode;
    const { error } = await supabase
      .from('exam_participants')
      .update(updates)
      .eq('id', participantId);
    if (error) throw error;
  },
  
  async updateParticipantRejoinByStudent(sessionId, studentId, allowRejoin, status) {
    const { error } = await supabase
      .from('exam_participants')
      .update({ allow_rejoin: allowRejoin, status: status, retake_requested: false })
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
