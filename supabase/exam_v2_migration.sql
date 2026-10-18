-- ==============================================================================
-- Exam System V2 Migration: Security, Server-Side Grading, and Resilience
-- ==============================================================================

-- 1. Ensure required columns in exam_participants
ALTER TABLE IF EXISTS exam_participants
  ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS extra_time_minutes INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS strike_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS strike_logs JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS current_answers JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS flagged_questions JSONB DEFAULT '[]'::jsonb;

-- 2. Ensure required columns in exam_sessions
ALTER TABLE IF EXISTS exam_sessions
  ADD COLUMN IF NOT EXISTS solutions_released BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS exam_mode TEXT DEFAULT 'official'; -- 'official' or 'practice'

-- 3. Create or replace secure server-side grading RPC: submit_exam_result
CREATE OR REPLACE FUNCTION submit_exam_result(
  p_session_id UUID,
  p_student_id TEXT,
  p_answers JSONB,
  p_time_spent INTEGER DEFAULT 0,
  p_is_suspended BOOLEAN DEFAULT false,
  p_note TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session RECORD;
  v_participant RECORD;
  v_question RECORD;
  v_student_answer TEXT;
  v_correct_answer_text TEXT;
  v_choice RECORD;
  v_raw_score NUMERIC := 0;
  v_total_possible NUMERIC := 0;
  v_points_per_q NUMERIC := 1;
  v_q_count INTEGER := 0;
  v_attempt_num INTEGER := 1;
  v_is_retake BOOLEAN := false;
  v_result_id UUID;
  v_final_score NUMERIC := 0;
  v_final_status TEXT;
BEGIN
  -- 1. Validate Exam Session
  SELECT * INTO v_session FROM exam_sessions WHERE id = p_session_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Exam session % not found', p_session_id;
  END IF;

  -- 2. Validate Participant
  SELECT * INTO v_participant FROM exam_participants 
  WHERE session_id = p_session_id AND student_id = p_student_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Participant % not enrolled in session %', p_student_id, p_session_id;
  END IF;

  -- 3. Determine attempt number and retake status
  SELECT COALESCE(MAX(attempt_number), 0) + 1 INTO v_attempt_num 
  FROM exam_results 
  WHERE session_id = p_session_id AND student_id = p_student_id;

  v_is_retake := (v_attempt_num > 1);

  -- 4. Calculate Question Count and Points
  SELECT COUNT(*) INTO v_q_count 
  FROM exam_session_questions 
  WHERE session_id = p_session_id;

  -- 5. Calculate Score securely against questions table
  FOR v_question IN
    SELECT 
      sq.points,
      sq.order_index,
      q.id AS question_id,
      q.question_text,
      q.choices,
      q.correct_answer_index
    FROM exam_session_questions sq
    JOIN questions q ON sq.question_id = q.id
    WHERE sq.session_id = p_session_id
    ORDER BY sq.order_index ASC
  LOOP
    -- Points for this question
    v_points_per_q := COALESCE(v_question.points, 
      CASE WHEN v_q_count > 0 AND v_session.total_score IS NOT NULL 
           THEN (v_session.total_score::NUMERIC / v_q_count) 
           ELSE 1 
      END
    );
    v_total_possible := v_total_possible + v_points_per_q;

    -- Extract student's submitted answer for this question
    v_student_answer := TRIM(COALESCE(p_answers->>v_question.question_id::text, ''));

    -- Find correct answer text from choices or correct_answer_index
    v_correct_answer_text := '';
    IF v_question.choices IS NOT NULL THEN
      -- Check if choices is an array of objects with is_correct
      FOR v_choice IN SELECT * FROM jsonb_to_recordset(v_question.choices) AS x(text TEXT, is_correct BOOLEAN) LOOP
        IF v_choice.is_correct = true THEN
          v_correct_answer_text := TRIM(COALESCE(v_choice.text, ''));
          EXIT;
        END IF;
      END LOOP;

      -- If not found via is_correct, fallback to correct_answer_index
      IF v_correct_answer_text = '' AND v_question.correct_answer_index IS NOT NULL THEN
        v_correct_answer_text := TRIM(COALESCE(v_question.choices->v_question.correct_answer_index->>'text', ''));
      END IF;
    END IF;

    -- Check if student answer matches
    IF v_student_answer <> '' AND v_correct_answer_text <> '' AND LOWER(v_student_answer) = LOWER(v_correct_answer_text) THEN
      v_raw_score := v_raw_score + v_points_per_q;
    END IF;
  END LOOP;

  v_final_score := ROUND(v_raw_score, 2);

  -- 6. Insert into exam_results
  INSERT INTO exam_results (
    session_id,
    student_id,
    score,
    total_questions,
    attempt_number,
    is_retake,
    is_suspended,
    started_at,
    submitted_at,
    note
  ) VALUES (
    p_session_id,
    p_student_id,
    v_final_score,
    v_q_count,
    v_attempt_num,
    v_is_retake,
    p_is_suspended,
    COALESCE(v_participant.started_at, NOW()),
    NOW(),
    COALESCE(p_note, CASE WHEN p_is_suspended THEN 'ถูกระงับการสอบ (Suspended)' WHEN v_is_retake THEN 'สอบซ่อม (Retake)' ELSE 'สอบรอบปกติ' END)
  ) RETURNING id INTO v_result_id;

  -- 7. Update exam_participants status
  v_final_status := CASE WHEN p_is_suspended THEN 'cheating' ELSE 'completed' END;

  UPDATE exam_participants
  SET 
    status = v_final_status,
    allow_rejoin = false,
    retake_requested = false,
    current_answers = p_answers,
    attempt_count = v_attempt_num,
    saved_exam_state = NULL
  WHERE session_id = p_session_id AND student_id = p_student_id;

  -- 8. Return sanitized summary to the client
  RETURN jsonb_build_object(
    'success', true,
    'result_id', v_result_id,
    'score', v_final_score,
    'total_score', COALESCE(v_session.total_score, v_total_possible),
    'total_questions', v_q_count,
    'attempt_number', v_attempt_num,
    'is_suspended', p_is_suspended,
    'is_retake', v_is_retake,
    'status', v_final_status
  );
END;
$$;
