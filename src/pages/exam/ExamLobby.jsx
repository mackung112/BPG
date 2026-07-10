import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, Users, ShieldAlert, LogOut } from 'lucide-react';

export default function ExamLobby() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();
  const [sessionInfo, setSessionInfo] = useState(null);
  const [participantStatus, setParticipantStatus] = useState('waiting');
  
  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/login');
      return;
    }
    fetchSessionInfo();
    
    // Subscribe to session changes (to know when exam starts)
    const sessionSub = supabase
      .channel(`session_${sessionId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'exam_sessions', filter: `id=eq.${sessionId}` }, (payload) => {
        if (payload.new.status === 'active' && participantStatus !== 'cheating' && participantStatus !== 'disconnected') {
          navigate(`/exam-room/${sessionId}`);
        } else if (payload.new.status === 'completed') {
          alert('การสอบถูกยกเลิกหรือสิ้นสุดลงแล้ว');
          logoutStudent();
          navigate('/');
        }
      })
      .subscribe();
      
    // Subscribe to participant changes (to know if teacher kicked them or allowed rejoin)
    const participantSub = supabase
      .channel(`participant_${studentSession.student_id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${sessionId}` }, (payload) => {
        // Only react if this is the current student
        if (payload.new.student_id === studentSession.student_id) {
          setParticipantStatus(payload.new.status);
          
          // If they were cheating and got approved (waiting), and session is active, push to exam room
          if (payload.new.status === 'waiting' && sessionInfo?.status === 'active') {
            navigate(`/exam-room/${sessionId}`);
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(sessionSub);
      supabase.removeChannel(participantSub);
    };
  }, [sessionId, studentSession]);

  const fetchSessionInfo = async () => {
    // Get session
    const { data: sData } = await supabase
      .from('exam_sessions')
      .select('*, question_banks(title)')
      .eq('id', sessionId)
      .single();
    if (sData) {
      setSessionInfo(sData);
    }
    
    // Get participant status
    const { data: pData } = await supabase
      .from('exam_participants')
      .select('status')
      .eq('session_id', sessionId)
      .eq('student_id', studentSession.student_id)
      .single();
      
    if (pData) {
      setParticipantStatus(pData.status);
      if (sData?.status === 'active' && pData.status !== 'cheating' && pData.status !== 'disconnected') {
        navigate(`/exam-room/${sessionId}`);
      }
    }
  };

  const handleLeave = async () => {
    if(confirm('คุณต้องการออกจากห้องสอบหรือไม่?')) {
      await logoutStudent();
      navigate('/');
    }
  };

  if (!sessionInfo) return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-200/25 blur-[130px] animate-pulse" />
      
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/50 p-8 text-center relative z-10">
        
        {participantStatus === 'cheating' || participantStatus === 'disconnected' ? (
          <div className="space-y-4">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500 mb-6 shadow-lg shadow-rose-200">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">คุณถูกระงับการสอบชั่วคราว</h1>
            <p className="text-gray-600">เนื่องจากคุณออกจากหน้าจอสอบ หรือขาดการเชื่อมต่อ<br/>กรุณาแจ้งครูผู้คุมสอบเพื่อขออนุมัติเข้าใหม่</p>
            <div className="animate-pulse flex items-center justify-center gap-2 text-rose-500 font-bold mt-4">
              <Clock className="w-5 h-5" /> รอการอนุมัติจากผู้คุมสอบ...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-6 shadow-lg shadow-indigo-200">
              <Users className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">กำลังรอเริ่มการสอบ...</h1>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">วิชา/หัวข้อ:</span>
                  <span className="font-bold text-gray-900">{sessionInfo.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">เวลาที่ให้:</span>
                  <span className="font-bold text-gray-900">{sessionInfo.time_limit_minutes} นาที</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">รหัสนักเรียน:</span>
                  <span className="font-bold text-gray-900">{studentSession?.student_id}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm pb-4">
              กรุณารอในหน้านี้จนกว่าครูจะกดเริ่มสอบ...
            </p>

            <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold animate-pulse">
              <div className="w-2 h-2 bg-indigo-500 rounded-full" />
              <div className="w-2 h-2 bg-indigo-500 rounded-full animation-delay-200" />
              <div className="w-2 h-2 bg-indigo-500 rounded-full animation-delay-400" />
            </div>
          </div>
        )}

        <button onClick={handleLeave} className="mt-8 text-sm text-gray-400 hover:text-red-500 flex items-center justify-center gap-1 mx-auto transition-colors">
          <LogOut className="w-4 h-4" /> ออกจากห้องรอสอบ
        </button>
      </div>
    </div>
  );
}
