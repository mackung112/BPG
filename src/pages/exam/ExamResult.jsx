import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, Home, LogOut } from 'lucide-react';

export default function ExamResult() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/');
      return;
    }
    fetchResult();
  }, [sessionId, studentSession]);

  const fetchResult = async () => {
    const { data } = await supabase
      .from('exam_results')
      .select('*, exam_sessions(title)')
      .eq('session_id', sessionId)
      .eq('student_id', studentSession.student_id)
      .single();
      
    if (data) setResult(data);
  };

  const handleFinish = async () => {
    await logoutStudent();
    navigate('/');
  };

  if (!result) return <div className="min-h-screen flex items-center justify-center">กำลังโหลดผลสอบ...</div>;

  const percentage = Math.round((result.score / result.total_questions) * 100);
  const isPass = percentage >= 50;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className={`absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[130px] animate-pulse ${isPass ? 'bg-emerald-200/25' : 'bg-rose-200/25'}`} />
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/50 p-8 text-center relative z-10">
        
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ${
          isPass ? 'bg-emerald-100 text-emerald-500 shadow-emerald-200' : 'bg-rose-100 text-rose-500 shadow-rose-200'
        }`}>
          <Trophy className="w-12 h-12" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ส่งข้อสอบสำเร็จ!</h1>
        <p className="text-gray-500 mb-8">{result.exam_sessions?.title}</p>

        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-8">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">คะแนนของคุณ</p>
          <div className="text-5xl font-black text-gray-900 mb-2">
            {result.score} <span className="text-2xl text-gray-400">/ {result.total_questions}</span>
          </div>
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
            isPass ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {isPass ? 'ผ่านเกณฑ์' : 'พยายามใหม่อีกนิดนะ'}
          </div>
        </div>

        <button 
          onClick={handleFinish} 
          className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
        >
          <Home className="w-5 h-5" /> กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );
}
