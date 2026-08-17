import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, Users, ShieldAlert, LogOut, AlertCircle, RefreshCw, Sparkles, Key } from 'lucide-react';

export default function ExamLobby() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();
  
  const [sessionInfo, setSessionInfo] = useState(null);
  const [participantStatus, setParticipantStatus] = useState('waiting');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const participantStatusRef = useRef(participantStatus);
  participantStatusRef.current = participantStatus;

  const sessionInfoRef = useRef(sessionInfo);
  sessionInfoRef.current = sessionInfo;

  const fetchSessionInfo = async (showRefreshAnimation = false) => {
    if (showRefreshAnimation) setIsRefreshing(true);
    try {
      // 1. Get session info
      const { data: sData, error: sError } = await supabase
        .from('exam_sessions')
        .select('*, question_banks(title)')
        .eq('id', sessionId)
        .maybeSingle();

      if (sError || !sData) {
        setErrorMsg('ไม่พบข้อมูลห้องสอบนี้ (ห้องสอบอาจถูกปิดหรือลบไปแล้ว)');
        setLoading(false);
        return;
      }

      setSessionInfo(sData);

      // 2. If session is already completed, inform student
      if (sData.status === 'completed') {
        setErrorMsg('การสอบชุดนี้สิ้นสุดลงแล้ว');
        setLoading(false);
        return;
      }

      // 3. Get participant status
      if (studentSession?.student_id) {
        const { data: pData, error: pError } = await supabase
          .from('exam_participants')
          .select('status, allow_rejoin')
          .eq('session_id', sessionId)
          .eq('student_id', studentSession.student_id)
          .maybeSingle();

        if (pError || !pData) {
          setErrorMsg('ไม่พบข้อมูลการเข้าสอบของคุณในห้องนี้ กรุณาเข้าสู่ระบบใหม่');
          setLoading(false);
          return;
        }

        setParticipantStatus(pData.status);

        // If session is active and participant is allowed to test, navigate to room
        if (sData.status === 'active' && pData.status !== 'cheating' && pData.status !== 'disconnected') {
          navigate(`/exam-room/${sessionId}`, { replace: true });
          return;
        }
      }

      setErrorMsg(null);
    } catch (err) {
      console.error('Error fetching lobby info:', err);
      setErrorMsg('เกิดข้อผิดพลาดในการเชื่อมต่อ: ' + (err.message || 'กรุณาลองใหม่อีกครั้ง'));
    } finally {
      setLoading(false);
      if (showRefreshAnimation) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/login', { replace: true });
      return;
    }

    fetchSessionInfo();

    // 🔄 Fallback Polling (Every 3 seconds) in case Realtime connection drops or lags
    const pollInterval = setInterval(() => {
      fetchSessionInfo();
    }, 3000);

    // 📡 Realtime: Listen for session status updates (when teacher starts exam)
    const sessionSub = supabase
      .channel(`lobby_session_${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'exam_sessions', filter: `id=eq.${sessionId}` },
        (payload) => {
          if (payload.new.status === 'active') {
            const currentPStatus = participantStatusRef.current;
            if (currentPStatus !== 'cheating' && currentPStatus !== 'disconnected') {
              navigate(`/exam-room/${sessionId}`, { replace: true });
            }
          } else if (payload.new.status === 'completed') {
            alert('การสอบถูกปิดหรือสิ้นสุดลงแล้ว');
            logoutStudent();
            navigate('/', { replace: true });
          }
        }
      )
      .subscribe();

    // 📡 Realtime: Listen for participant status updates (when teacher allows rejoin)
    const participantSub = supabase
      .channel(`lobby_participant_${studentSession.student_id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          if (payload.new.student_id === studentSession.student_id) {
            setParticipantStatus(payload.new.status);
            
            // If teacher approved rejoin and session is already active
            if ((payload.new.status === 'waiting' || payload.new.status === 'testing') && sessionInfoRef.current?.status === 'active') {
              navigate(`/exam-room/${sessionId}`, { replace: true });
            }
          }
        }
      )
      .subscribe();

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(sessionSub);
      supabase.removeChannel(participantSub);
    };
  }, [sessionId, studentSession, navigate]);

  const handleLeave = async () => {
    if (confirm('คุณต้องการออกจากห้องสอบหรือไม่?')) {
      await logoutStudent();
      navigate('/', { replace: true });
    }
  };

  const handleBackToLogin = async () => {
    await logoutStudent();
    navigate('/login', { replace: true });
  };

  // 1. Error View (Invalid / Deleted / Finished session)
  if (errorMsg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-200/25 blur-[130px] animate-pulse" />
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/60 p-8 text-center relative z-10 space-y-6">
          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto text-rose-600 shadow-lg shadow-rose-200">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ไม่สามารถเข้าห้องสอบได้</h1>
            <p className="text-gray-600 text-sm mt-2 font-medium">{errorMsg}</p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => fetchSessionInfo(true)}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> ลองใหม่อีกครั้ง
            </button>
            <button
              onClick={handleBackToLogin}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> ออกจากระบบและกรอกรหัสใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Loading State (With quick exit button if it takes too long)
  if (loading && !sessionInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="max-w-sm w-full bg-white/90 backdrop-blur-xl rounded-[28px] shadow-xl border border-white/60 p-8 text-center relative z-10 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-gray-800">กำลังเชื่อมต่อห้องสอบ...</p>
          <p className="text-xs text-gray-400">กรุณารอสักครู่ ระบบกำลังดึงข้อมูลการสอบ</p>
          <button
            onClick={handleBackToLogin}
            className="text-xs text-rose-500 hover:underline pt-2 font-medium cursor-pointer"
          >
            หากรอนานเกินไป คลิกที่นี่เพื่อกลับหน้าเข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  // 3. Lobby Waiting View
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-200/25 blur-[130px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[10%] w-[38vw] h-[38vw] rounded-full bg-purple-200/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-lg w-full bg-white/85 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/60 p-8 text-center relative z-10">
        
        {participantStatus === 'cheating' || participantStatus === 'disconnected' ? (
          /* Cheating / Disconnected Warning Card */
          <div className="space-y-5">
            <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto text-rose-500 shadow-lg shadow-rose-200 animate-bounce">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">คุณถูกระงับการสอบชั่วคราว</h1>
              <p className="text-gray-600 text-sm mt-2 font-medium">
                เนื่องจากระบบตรวจพบการออกจากหน้าจอสอบ หรือขาดการเชื่อมต่อ<br/>
                กรุณาแจ้งคุณครูผู้คุมสอบเพื่อขออนุมัติปลดล็อกเข้าสอบใหม่
              </p>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center gap-2 text-rose-600 text-sm font-bold animate-pulse">
              <Clock className="w-5 h-5" /> กำลังรอการอนุมัติจากผู้คุมสอบ...
            </div>
          </div>
        ) : (
          /* Ready & Waiting Card */
          <div className="space-y-5">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto text-white shadow-xl shadow-indigo-300 transform -rotate-3">
              <Users className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                รอเริ่มการสอบ
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                เตรียมพร้อมเข้าสอบ
              </h1>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                เมื่อครูผู้สอนกด <span className="font-bold text-indigo-600">"เริ่มสอบ"</span> ระบบจะนำคุณเข้าสู่ห้องสอบทันทีอัตโนมัติ
              </p>
            </div>

            {/* Exam Session Details Card */}
            <div className="bg-gray-50/90 p-5 rounded-2xl border border-gray-200/80 text-left space-y-3 shadow-inner">
              <div className="flex justify-between items-center text-sm border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500 font-medium">วิชา / หัวข้อ:</span>
                <span className="font-bold text-gray-900 truncate max-w-[200px]" title={sessionInfo?.title}>
                  {sessionInfo?.title || sessionInfo?.question_banks?.title || 'แบบทดสอบ'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500 font-medium">เวลาที่ให้:</span>
                <span className="font-bold text-indigo-700 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {sessionInfo?.time_limit_minutes} นาที
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500 font-medium">รหัสห้องสอบ (Code):</span>
                <span className="font-mono font-bold text-gray-900 bg-white px-2.5 py-0.5 rounded border border-gray-200">
                  {sessionInfo?.secret_code}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">รหัสนักเรียน:</span>
                <span className="font-mono font-bold text-indigo-900">
                  {studentSession?.student_id}
                </span>
              </div>
            </div>
            
            {/* Live pulsating status bar */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-600 py-1">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
              <span>ระบบกำลังเชื่อมต่อแบบเรียลไทม์...</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => fetchSessionInfo(true)}
            disabled={isRefreshing}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'กำลังอัปเดต...' : 'รีเฟรชสถานะ'}
          </button>

          <button 
            onClick={handleLeave} 
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> ออกจากห้องรอสอบ
          </button>
        </div>

      </div>
    </div>
  );
}
