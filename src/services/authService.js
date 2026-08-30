import { supabase } from '../lib/supabase';

export const getAuthSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const fetchAdminData = async (userId) => {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
    
  if (error && error.code !== 'PGRST116') {
    throw error;
  }
  return data;
};

export const loginAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const loginStudent = async (studentId, secretCode) => {
  // 1. Verify session exists with secret_code
  const { data: sessionData, error: sessionError } = await supabase
    .from('exam_sessions')
    .select('id, status, started_at, time_limit_minutes, exam_mode, max_attempts, retake_until_pass, passing_percentage, question_count, total_score')
    .eq('secret_code', secretCode.trim().toUpperCase())
    .maybeSingle();
    
  if (sessionError || !sessionData) {
    throw new Error('ไม่พบรหัสการสอบนี้ หรือรหัสไม่ถูกต้อง');
  }

  const isOnline = sessionData.exam_mode === 'online';

  // 1.1 Check if session is already completed (allow if student has retake permission)
  if (sessionData.status === 'completed') {
    const { data: pCheck } = await supabase
      .from('exam_participants')
      .select('*')
      .eq('session_id', sessionData.id)
      .eq('student_id', studentId.trim())
      .maybeSingle();

    if (pCheck) {
      let canAutoRetake = false;
      let hasPassed = false;
      if (pCheck.status === 'completed') {
        const { data: pastResults } = await supabase.from('exam_results').select('score').eq('session_id', sessionData.id).eq('student_id', studentId.trim());
        const actualAttemptCount = pastResults ? pastResults.length : 0;
        const maxAttempts = sessionData.max_attempts || 1;
        const retakeUntilPass = sessionData.retake_until_pass === true;
        
        if (retakeUntilPass && pastResults && pastResults.length > 0) {
          const bestScore = Math.max(...pastResults.map(r => Number(r.score) || 0));
          const totalScore = Number(sessionData.total_score || sessionData.question_count || 10);
          if ((bestScore / totalScore) * 100 >= (sessionData.passing_percentage || 50)) {
            hasPassed = true;
          }
        }
        if ((retakeUntilPass && !hasPassed) || (!retakeUntilPass && actualAttemptCount > 0 && actualAttemptCount < maxAttempts)) {
          canAutoRetake = true;
        }
      }

      // Block if student already passed with retake_until_pass
      if (sessionData.retake_until_pass && hasPassed) {
        throw new Error('คุณสอบผ่านเกณฑ์แล้ว ไม่สามารถสอบซ่อมได้อีก');
      }

      if (isOnline) {
        if (canAutoRetake || pCheck.attempt_count < sessionData.max_attempts) {
           await supabase
            .from('exam_participants')
            .update({ status: 'testing', started_at: new Date().toISOString() })
            .eq('id', pCheck.id);
          localStorage.setItem('student_id', studentId.trim());
          localStorage.setItem('exam_session_id', sessionData.id);
          return sessionData.id;
        }
      } else {
        let needsForceSubmit = pCheck.status === 'testing' || pCheck.status === 'waiting' || pCheck.status === 'disconnected';
        if (pCheck.allow_rejoin || canAutoRetake || needsForceSubmit) {
          // Teacher approved retake, auto retake, or force submit
          if (!needsForceSubmit) {
            await supabase
              .from('exam_participants')
              .update({ status: 'testing', allow_rejoin: false, started_at: new Date().toISOString() })
              .eq('id', pCheck.id);
          }

          localStorage.setItem('student_id', studentId.trim());
          localStorage.setItem('exam_session_id', sessionData.id);
          return sessionData.id;
        }
      }
    }

    throw new Error('การสอบนี้สิ้นสุดลงแล้ว ไม่อนุญาตให้เข้าห้องสอบ (หากต้องการสอบซ่อม กรุณาแจ้งครูผู้สอน)');
  }

  // 1.2 Check if time limit has expired for active session (Only for onsite)
  if (!isOnline && sessionData.status === 'active' && sessionData.started_at && sessionData.time_limit_minutes) {
    const startTime = new Date(sessionData.started_at).getTime();
    const now = Date.now();
    const elapsedMinutes = (now - startTime) / (1000 * 60);
    if (elapsedMinutes >= sessionData.time_limit_minutes) {
      const retakeUntilPass = sessionData.retake_until_pass === true;

      // Check if student has retake permission
      const { data: pCheck } = await supabase
        .from('exam_participants')
        .select('*')
        .eq('session_id', sessionData.id)
        .eq('student_id', studentId.trim())
        .maybeSingle();

      // If retake_until_pass is on and student never joined, allow first attempt (fall through to sections 2-3)
      if (!(retakeUntilPass && !pCheck)) {
        let canAutoRetake = false;
        let hasPassed = false;
        if (pCheck && pCheck.status === 'completed') {
          const { data: pastResults } = await supabase.from('exam_results').select('score').eq('session_id', sessionData.id).eq('student_id', studentId.trim());
          const actualAttemptCount = pastResults ? pastResults.length : 0;
          const maxAttempts = sessionData.max_attempts || 1;
          
          if (retakeUntilPass && pastResults && pastResults.length > 0) {
            const bestScore = Math.max(...pastResults.map(r => Number(r.score) || 0));
            const totalScore = Number(sessionData.total_score || sessionData.question_count || 10);
            if ((bestScore / totalScore) * 100 >= (sessionData.passing_percentage || 50)) {
              hasPassed = true;
            }
          }
          if ((retakeUntilPass && !hasPassed) || (!retakeUntilPass && actualAttemptCount > 0 && actualAttemptCount < maxAttempts)) {
            canAutoRetake = true;
          }
        }

        // Block if student already passed
        if (retakeUntilPass && hasPassed) {
          throw new Error('คุณสอบผ่านเกณฑ์แล้ว ไม่สามารถสอบซ่อมได้อีก');
        }

        let needsForceSubmit = pCheck && (pCheck.status === 'testing' || pCheck.status === 'waiting' || pCheck.status === 'disconnected');

        if (pCheck?.allow_rejoin || canAutoRetake || needsForceSubmit) {
          // Allow retake or force submit
          if (!needsForceSubmit) {
            await supabase
              .from('exam_participants')
              .update({ status: 'testing', allow_rejoin: false, started_at: new Date().toISOString() })
              .eq('id', pCheck.id);
          }

          localStorage.setItem('student_id', studentId.trim());
          localStorage.setItem('exam_session_id', sessionData.id);
          return sessionData.id;
        }

        // Auto mark as completed only if retake_until_pass is NOT enabled
        if (!retakeUntilPass) {
          await supabase
            .from('exam_sessions')
            .update({ status: 'completed', end_time: new Date() })
            .eq('id', sessionData.id);
        }
        throw new Error('การสอบนี้หมดเวลาแล้ว ไม่อนุญาตให้เข้าห้องสอบ (หากต้องการสอบซ่อม กรุณาแจ้งครูผู้สอน)');
      }
    }
  }

  // 2. Verify student exists
  const { data: studentData, error: studentError } = await supabase
    .from('students')
    .select('student_id')
    .eq('student_id', studentId.trim())
    .maybeSingle();
    
  if (studentError || !studentData) {
    throw new Error('ไม่พบรหัสนักเรียนนี้ในระบบ กรุณาตรวจสอบรหัสอีกครั้ง');
  }

  // 3. Try to join participants (or update status if already exists)
  const { data: existingParticipant } = await supabase
    .from('exam_participants')
    .select('*')
    .eq('session_id', sessionData.id)
    .eq('student_id', studentId.trim())
    .maybeSingle();

  if (existingParticipant) {
    let updatePayload = {};

    const { data: pastResults } = await supabase
      .from('exam_results')
      .select('id, score')
      .eq('session_id', sessionData.id)
      .eq('student_id', studentId.trim());
      
    const actualAttemptCount = pastResults ? pastResults.length : 0;
    const maxAttempts = sessionData.max_attempts || 1;
    const retakeUntilPass = sessionData.retake_until_pass === true;
    
    let hasPassed = false;
    if (retakeUntilPass && pastResults && pastResults.length > 0) {
      const bestScore = Math.max(...pastResults.map(r => Number(r.score) || 0));
      const totalScore = Number(sessionData.total_score || sessionData.question_count || 10);
      const percentage = (bestScore / totalScore) * 100;
      if (percentage >= (sessionData.passing_percentage || 50)) {
        hasPassed = true;
      }
    }

    if (!existingParticipant.allow_rejoin) {
      if (retakeUntilPass) {
        if (hasPassed) {
          throw new Error('คุณสอบผ่านเกณฑ์แล้ว ไม่สามารถสอบซ่อมได้อีก');
        }
      } else if (actualAttemptCount >= maxAttempts) {
        throw new Error('คุณได้ทำข้อสอบชุดนี้ครบตามจำนวนที่กำหนดแล้ว');
      }
    }

    if (existingParticipant.status === 'completed') {
      if (retakeUntilPass && !hasPassed) {
        updatePayload = { status: sessionData.status === 'active' ? 'testing' : 'waiting', allow_rejoin: false, warnings_count: 0, started_at: new Date().toISOString() };
      } else if (isOnline) {
        // Normal online logic
        updatePayload = { status: 'testing', started_at: new Date().toISOString(), warnings_count: 0, allow_rejoin: false };
      } else {
        if (!existingParticipant.allow_rejoin) {
          throw new Error('คุณได้ส่งข้อสอบชุดนี้เรียบร้อยแล้ว (หากต้องการสอบซ่อม กรุณาแจ้งครูผู้สอน)');
        }
        updatePayload = { status: sessionData.status === 'active' ? 'testing' : 'waiting', allow_rejoin: false, warnings_count: 0, started_at: new Date().toISOString() };
      }
    } else if (existingParticipant.status === 'disconnected' || existingParticipant.status === 'cheating') {
      if (isOnline) {
        // Allow rejoin immediately, keep started_at same, status testing
        updatePayload = { status: 'testing' };
      } else {
        if (!existingParticipant.allow_rejoin) {
          throw new Error('คุณถูกระงับการสอบ กรุณาแจ้งครูผู้คุมสอบเพื่อขออนุมัติเข้าใหม่');
        }
        updatePayload = { status: sessionData.status === 'active' ? 'testing' : 'waiting' };
      }
    } else {
      // Status is waiting or testing
      updatePayload = { status: sessionData.status === 'active' ? 'testing' : 'waiting', allow_rejoin: false };
      if (isOnline && !existingParticipant.started_at) {
        updatePayload.started_at = new Date().toISOString();
      }
    }
    
    await supabase
      .from('exam_participants')
      .update(updatePayload)
      .eq('id', existingParticipant.id);
  } else {
    // Insert new participant (allow both waiting and active sessions)
    const initialStatus = sessionData.status === 'active' ? 'testing' : 'waiting';
    const insertPayload = { session_id: sessionData.id, student_id: studentId.trim(), status: initialStatus };
    if (isOnline) {
      insertPayload.started_at = new Date().toISOString();
    }

    const { error: insertError } = await supabase
      .from('exam_participants')
      .insert([insertPayload]);
      
    if (insertError) {
      throw new Error('เกิดข้อผิดพลาดในการเข้าห้องสอบ: ' + insertError.message);
    }
  }

  // Success
  localStorage.setItem('student_id', studentId.trim());
  localStorage.setItem('exam_session_id', sessionData.id);
  return sessionData.id;
};

export const logoutStudent = async (studentSession) => {
  if (studentSession) {
    // Set status to disconnected only if they haven't completed or been caught cheating
    await supabase
      .from('exam_participants')
      .update({ status: 'disconnected' })
      .eq('session_id', studentSession.session_id)
      .eq('student_id', studentSession.student_id)
      .neq('status', 'completed')
      .neq('status', 'cheating');
  }
  localStorage.removeItem('student_id');
  localStorage.removeItem('exam_session_id');
};
