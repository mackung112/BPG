import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, Home, CheckCircle2 } from 'lucide-react';

export default function ExamResult() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/');
      return;
    }
    fetchResult();
  }, [sessionId, studentSession]);

  const fetchResult = async () => {
    setLoading(true);
    // Use maybeSingle to get exactly 0 or 1 row — never 406
    const { data } = await supabase
      .from('exam_results')
      .select('*, exam_sessions(title, total_score)')
      .eq('session_id', sessionId)
      .eq('student_id', studentSession.student_id)
      .maybeSingle();
      
    if (data) {
      setResult(data);
    }
    setLoading(false);
  };

  const handleFinish = async () => {
    await logoutStudent();
    navigate('/');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-medium text-zinc-500">กำลังโหลดผลสอบ...</div>;
  if (!result) return <div className="min-h-screen flex items-center justify-center font-medium text-zinc-500">ไม่พบข้อมูลคะแนนสอบ</div>;

  const totalScore = result.exam_sessions?.total_score || result.total_questions || 10;
  const percentage = Math.round((result.score / totalScore) * 100);
  const isPass = percentage >= 50;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className={`absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[130px] animate-pulse ${isPass ? 'bg-emerald-200/25' : 'bg-rose-200/25'}`} />
      
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 text-center relative z-10 space-y-6">
        
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg ${
          isPass ? 'bg-emerald-100 text-emerald-600 shadow-emerald-200/50' : 'bg-amber-100 text-amber-600 shadow-amber-200/50'
        }`}>
          <Trophy className="w-10 h-10" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">ส่งข้อสอบสำเร็จ!</h1>
          <p className="text-xs text-zinc-500 mt-1">{result.exam_sessions?.title || 'ผลการสอบ'}</p>
          <p className="text-xs font-mono text-zinc-400 mt-0.5">รหัสนักเรียน: {studentSession.student_id}</p>
        </div>

        {/* Score Card */}
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 text-center">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            คะแนนที่คุณได้
          </p>
          <div className="text-5xl font-black text-zinc-900 mb-2 font-mono">
            {result.score} <span className="text-xl text-zinc-400 font-normal">/ {totalScore}</span>
          </div>
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
            isPass ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {isPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
            {isPass ? 'ผ่านเกณฑ์' : 'ไม่ผ่านเกณฑ์'}
          </div>
        </div>

        <button 
          onClick={handleFinish} 
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg cursor-pointer"
        >
          <Home className="w-4 h-4" /> กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );
}
