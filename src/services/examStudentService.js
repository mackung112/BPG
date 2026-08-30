import { supabase } from '../lib/supabase';

export const getSessionInfo = async (sessionId) => {
  const { data, error } = await supabase
    .from('exam_sessions')
    .select('*, question_banks(title)')
    .eq('id', sessionId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const getParticipant = async (sessionId, studentId) => {
  const { data, error } = await supabase
    .from('exam_participants')
    .select('*')
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const updateParticipantStatus = async (sessionId, studentId, payload) => {
  const { data, error } = await supabase
    .from('exam_participants')
    .update(payload)
    .eq('session_id', sessionId)
    .eq('student_id', studentId);
  if (error) throw error;
  return data;
};

export const updateParticipantById = async (participantId, payload) => {
  const { data, error } = await supabase
    .from('exam_participants')
    .update(payload)
    .eq('id', participantId);
  if (error) throw error;
  return data;
};

export const getExamQuestions = async (sessionId) => {
  const { data, error } = await supabase
    .from('exam_session_questions')
    .select(`
      points,
      questions (
        id, question_text, choices, correct_answer_index
      )
    `)
    .eq('session_id', sessionId);
  if (error) throw error;
  return data;
};

export const submitExamResult = async (payload) => {
  const { data, error } = await supabase
    .from('exam_results')
    .insert([payload]);
  if (error) throw error;
  return data;
};

export const deleteSuspendedResult = async (sessionId, studentId, attemptNumber) => {
  const { data, error } = await supabase
    .from('exam_results')
    .delete()
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .eq('attempt_number', attemptNumber)
    .eq('is_suspended', true);
  if (error) throw error;
  return data;
};

export const getStudentResults = async (sessionId, studentId) => {
  const { data, error } = await supabase
    .from('exam_results')
    .select('*, exam_sessions(title, total_score, question_count, exam_mode, max_attempts, retake_until_pass, passing_percentage)')
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .order('submitted_at', { ascending: true });
  if (error) throw error;
  return data || [];
};
