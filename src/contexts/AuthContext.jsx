import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import * as authService from '../services/authService';

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
        const session = await authService.getAuthSession();
        
        if (session?.user) {
          setUser(session.user);
          const data = await authService.fetchAdminData(session.user.id);
          setAdminData(data);
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
        const data = await authService.fetchAdminData(session.user.id);
        setAdminData(data);
      } else {
        setAdminData(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginAdmin = async (email, password) => {
    return await authService.loginAdmin(email, password);
  };

  const logoutAdmin = async () => {
    await authService.logoutAdmin();
  };

  const loginStudent = async (studentId, secretCode) => {
    const sessionId = await authService.loginStudent(studentId, secretCode);
    setStudentSession({ student_id: studentId.trim(), session_id: sessionId });
    return sessionId;
  };

  const logoutStudent = async () => {
    await authService.logoutStudent(studentSession);
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
