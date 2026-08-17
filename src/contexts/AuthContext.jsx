import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // auth.user
  const [adminData, setAdminData] = useState(null); // public.admins data
  const [studentSession, setStudentSession] = useState(null); // for student exam login
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          setUser(session.user);
          await fetchAdminData(session.user.id);
        }

        // Check if there's a stored student session
        const storedStudentId = localStorage.getItem('student_id');
        const storedSessionId = localStorage.getItem('exam_session_id');
        if (storedStudentId && storedSessionId) {
          setStudentSession({ student_id: storedStudentId, session_id: storedSessionId });
        }
      } catch (err) {
        console.error('Error fetching auth session:', err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        await fetchAdminData(session.user.id);
      } else {
        setAdminData(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAdminData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        if (error.code !== 'PGRST116') { // not found error
          console.error('Error fetching admin data:', error.message);
        }
        return;
      }
      
      setAdminData(data);
    } catch (err) {
      console.error('Unexpected error fetching admin data:', err);
    }
  };

  const loginAdmin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const logoutAdmin = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const loginStudent = async (studentId, secretCode) => {
    // 1. Verify session exists with secret_code
    const { data: sessionData, error: sessionError } = await supabase
      .from('exam_sessions')
      .select('id, status, started_at, time_limit_minutes')
      .eq('secret_code', secretCode.trim().toUpperCase())
      .maybeSingle();
      
    if (sessionError || !sessionData) {
      throw new Error('ไม่พบรหัสการสอบนี้ หรือรหัสไม่ถูกต้อง');
    }

    // 1.1 Check if session is already completed (allow if student has retake permission)
    if (sessionData.status === 'completed') {
      const { data: pCheck } = await supabase
        .from('exam_participants')
        .select('*')
        .eq('session_id', sessionData.id)
        .eq('student_id', studentId.trim())
        .maybeSingle();

      if (pCheck?.allow_rejoin) {
        // Teacher approved retake!
        await supabase
          .from('exam_participants')
          .update({ status: 'testing', allow_rejoin: false })
          .eq('id', pCheck.id);

        localStorage.setItem('student_id', studentId.trim());
        localStorage.setItem('exam_session_id', sessionData.id);
        setStudentSession({ student_id: studentId.trim(), session_id: sessionData.id });
        return sessionData.id;
      }

      throw new Error('การสอบนี้สิ้นสุดลงแล้ว ไม่อนุญาตให้เข้าห้องสอบ (หากต้องการสอบซ่อม กรุณาแจ้งครูผู้สอน)');
    }

    // 1.2 Check if time limit has expired for active session
    if (sessionData.status === 'active' && sessionData.started_at && sessionData.time_limit_minutes) {
      const startTime = new Date(sessionData.started_at).getTime();
      const now = Date.now();
      const elapsedMinutes = (now - startTime) / (1000 * 60);
      if (elapsedMinutes >= sessionData.time_limit_minutes) {
        // Check if student has retake permission
        const { data: pCheck } = await supabase
          .from('exam_participants')
          .select('*')
          .eq('session_id', sessionData.id)
          .eq('student_id', studentId.trim())
          .maybeSingle();

        if (pCheck?.allow_rejoin) {
          // Allow retake
          await supabase
            .from('exam_participants')
            .update({ status: 'testing', allow_rejoin: false })
            .eq('id', pCheck.id);

          localStorage.setItem('student_id', studentId.trim());
          localStorage.setItem('exam_session_id', sessionData.id);
          setStudentSession({ student_id: studentId.trim(), session_id: sessionData.id });
          return sessionData.id;
        }

        // Auto mark as completed
        await supabase
          .from('exam_sessions')
          .update({ status: 'completed', end_time: new Date() })
          .eq('id', sessionData.id);
        throw new Error('การสอบนี้หมดเวลาแล้ว ไม่อนุญาตให้เข้าห้องสอบ (หากต้องการสอบซ่อม กรุณาแจ้งครูผู้สอน)');
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
      // If already submitted and not allowed to retake
      if (existingParticipant.status === 'completed' && !existingParticipant.allow_rejoin) {
        throw new Error('คุณได้ส่งข้อสอบชุดนี้เรียบร้อยแล้ว (หากต้องการสอบซ่อม กรุณาแจ้งครูผู้สอน)');
      }

      // If disconnected or cheating and not allowed to rejoin
      if ((existingParticipant.status === 'disconnected' || existingParticipant.status === 'cheating') && !existingParticipant.allow_rejoin) {
        throw new Error('คุณถูกระงับการสอบ กรุณาแจ้งครูผู้คุมสอบเพื่อขออนุมัติเข้าใหม่');
      }
      
      // Update status to testing/waiting for retake or rejoin
      const nextStatus = sessionData.status === 'active' ? 'testing' : 'waiting';
      await supabase
        .from('exam_participants')
        .update({ status: nextStatus, allow_rejoin: false })
        .eq('id', existingParticipant.id);
    } else {
      // Insert new participant (allow both waiting and active sessions)
      const initialStatus = sessionData.status === 'active' ? 'testing' : 'waiting';
      const { error: insertError } = await supabase
        .from('exam_participants')
        .insert([{ session_id: sessionData.id, student_id: studentId.trim(), status: initialStatus }]);
        
      if (insertError) {
        throw new Error('เกิดข้อผิดพลาดในการเข้าห้องสอบ: ' + insertError.message);
      }
    }

    // Success
    localStorage.setItem('student_id', studentId.trim());
    localStorage.setItem('exam_session_id', sessionData.id);
    setStudentSession({ student_id: studentId.trim(), session_id: sessionData.id });
    return sessionData.id;
  };

  const logoutStudent = async () => {
    if (studentSession) {
      // Set status to disconnected
      await supabase
        .from('exam_participants')
        .update({ status: 'disconnected' })
        .eq('session_id', studentSession.session_id)
        .eq('student_id', studentSession.student_id);
    }
    localStorage.removeItem('student_id');
    localStorage.removeItem('exam_session_id');
    setStudentSession(null);
  };

  // Inactivity Timeout for Admin (30 minutes)
  useEffect(() => {
    let timeout;
    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in ms

    const resetTimer = () => {
      clearTimeout(timeout);
      if (user) {
        timeout = setTimeout(() => {
          logoutAdmin();
          alert('คุณถูกออกจากระบบเนื่องจากไม่มีการใช้งานเกิน 30 นาที');
        }, INACTIVITY_LIMIT);
      }
    };

    if (user) {
      resetTimer();
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      window.addEventListener('scroll', resetTimer);
      window.addEventListener('click', resetTimer);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      adminData,
      isSuperAdmin: adminData?.role === 'super_admin',
      isAdmin: adminData?.role === 'admin' || adminData?.role === 'super_admin',
      studentSession,
      loading,
      loginAdmin,
      logoutAdmin,
      loginStudent,
      logoutStudent
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
