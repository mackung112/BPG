import { supabase } from '../lib/supabase.js';

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

/**
 * Fetch exam questions for examinees with ZERO LEAK of answers.
 * Explicitly excludes correct_answer_index and solution explanations.
 */
export const getExamQuestions = async (sessionId) => {
  let { data, error } = await supabase
    .from('exam_session_questions')
    .select(`
      id,
      points,
      order_index,
      questions (
        id,
        question_text,
        choices,
        image_url
      )
    `)
    .eq('session_id', sessionId)
    .order('order_index', { ascending: true });

  // Fallback if image_url column doesn't exist on questions table
  if (error && (error.code === '42703' || error.message?.includes('image_url'))) {
    const fallbackRes = await supabase
      .from('exam_session_questions')
      .select(`
        id,
        points,
        order_index,
        questions (
          id,
          question_text,
          choices
        )
      `)
      .eq('session_id', sessionId)
      .order('order_index', { ascending: true });

    if (fallbackRes.error) throw fallbackRes.error;
    data = fallbackRes.data;
    error = null;
  }

  if (error) throw error;

  return (data || []).map((item, idx) => {
    const rawQ = item.questions || {};
    const rawChoices = rawQ.choices || [];

    // Sanitize choices: strip any is_correct or internal answer flags
    const sanitizedChoices = rawChoices.map((choice) => {
      if (typeof choice === 'object' && choice !== null) {
        return { text: choice.text ?? '' };
      }
      return { text: String(choice) };
    });

    return {
      session_question_id: item.id,
      question_id: rawQ.id,
      id: rawQ.id, // backward compatibility
      question_text: rawQ.question_text || '',
      choices: sanitizedChoices,
      image_url: rawQ.image_url || null,
      points: Number(item.points || 1),
      order_index: item.order_index ?? idx
    };
  });
};

/**
 * Submit exam answers to the secure PostgreSQL RPC function.
 * All scoring and validation happens on the server.
 */
export const submitExamResult = async ({
  sessionId,
  studentId,
  answers = {},
  timeSpentSeconds = 0,
  isSuspended = false,
  note = null
}) => {
  const { data, error } = await supabase.rpc('submit_exam_result', {
    p_session_id: sessionId,
    p_student_id: studentId,
    p_answers: answers,
    p_time_spent: timeSpentSeconds,
    p_is_suspended: Boolean(isSuspended),
    p_note: note
  });

  if (error) throw error;
  return data;
};

/**
 * Save draft answers and flagged questions to PostgreSQL for resilience.
 */
export const saveDraftAnswers = async (sessionId, studentId, answers, flagged = []) => {
  const { data, error } = await supabase
    .from('exam_participants')
    .update({
      current_answers: answers,
      flagged_questions: flagged
    })
    .eq('session_id', sessionId)
    .eq('student_id', studentId);

  if (error) throw error;
  return data;
};

/**
 * Load saved draft answers from PostgreSQL.
 */
export const loadDraftAnswers = async (sessionId, studentId) => {
  const { data, error } = await supabase
    .from('exam_participants')
    .select('current_answers, flagged_questions')
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .maybeSingle();

  if (error) throw error;
  return {
    answers: data?.current_answers || {},
    flagged: Array.isArray(data?.flagged_questions) ? data.flagged_questions : []
  };
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
    .select('*, exam_sessions(title, total_score, question_count, exam_mode, max_attempts, retake_until_pass, passing_percentage, solutions_released)')
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .order('submitted_at', { ascending: true });
  if (error) throw error;
  return data || [];
};
