import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, ShieldAlert, CheckCircle, Send } from 'lucide-react';

export default function ExamRoom() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();
  
  const [sessionInfo, setSessionInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
  const cheatingFlag = useRef(false);

  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/login');
      return;
    }
    initExam();
    
    // Anti-cheat: Visibility change
    const handleVisibilityChange = async () => {
      if (document.hidden && !cheatingFlag.current) {
        cheatingFlag.current = true;
        // Mark as cheating
        await supabase
          .from('exam_participants')
          .update({ status: 'cheating' })
          .eq('session_id', sessionId)
          .eq('student_id', studentSession.student_id);
          
        navigate(`/exam-lobby/${sessionId}`);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for session ending by teacher
    const sessionSub = supabase
      .channel(`session_end_${sessionId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'exam_sessions', filter: `id=eq.${sessionId}` }, (payload) => {
        if (payload.new.status === 'completed') {
          // Force submit
          handleSubmit(true);
        }
      })
      .subscribe();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      supabase.removeChannel(sessionSub);
    };
  }, [sessionId, studentSession]);

  useEffect(() => {
    // Timer countdown
    if (timeLeft === null || timeLeft <= 0) {
      if (timeLeft === 0 && !submitting && questions.length > 0) {
        handleSubmit(true);
      }
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, submitting, questions]);

  const initExam = async () => {
    // 1. Get session info
    const { data: sData } = await supabase
      .from('exam_sessions')
      .select('*, question_banks(title)')
      .eq('id', sessionId)
      .single();
      
    if (!sData) {
      navigate('/');
      return;
    }
    
    setSessionInfo(sData);

    // 2. Set participant status to testing
    await supabase
      .from('exam_participants')
      .update({ status: 'testing' })
      .eq('session_id', sessionId)
      .eq('student_id', studentSession.student_id);

    // 3. Fetch questions
    const { data: qData } = await supabase
      .from('questions')
      .select('id, question_text, choices') // DO NOT SELECT correct_answer_index FOR SECURITY if RLS allows, but for now we pull it to grade on client, or we can fetch it on submit.
      .eq('bank_id', sData.bank_id)
      .order('id', { ascending: true }); // In a real app we might randomise
      
    if (qData) {
      setQuestions(qData);
    }
    
    // 4. Calculate time left
    const startTime = new Date(sData.started_at).getTime();
    const now = new Date().getTime();
    const timeLimitMs = sData.time_limit_minutes * 60 * 1000;
    const elapsed = now - startTime;
    const remaining = Math.max(0, Math.floor((timeLimitMs - elapsed) / 1000));
    setTimeLeft(remaining);
  };

  const handleSelectChoice = (questionId, choiceIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: choiceIndex
    }));
  };

  const handleSubmit = async (forced = false) => {
    if (!forced && !confirm('คุณตรวจสอบคำตอบทั้งหมดแล้ว และยืนยันการส่งข้อสอบใช่หรือไม่?')) return;
    
    setSubmitting(true);
    
    try {
      // 1. Fetch full questions again to grade (to prevent tampering on client side)
      const { data: fullQuestions } = await supabase
        .from('questions')
        .select('id, correct_answer_index')
        .eq('bank_id', sessionInfo.bank_id);
        
      let score = 0;
      for (const q of fullQuestions) {
        if (answers[q.id] === q.correct_answer_index) {
          score++;
        }
      }
      
      // 2. Insert to exam_results
      await supabase
        .from('exam_results')
        .insert([{
          session_id: sessionId,
          student_id: studentSession.student_id,
          score: score,
          total_questions: fullQuestions.length
        }]);
        
      // 3. Update participant status
      await supabase
        .from('exam_participants')
        .update({ status: 'completed' })
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id);
        
      // 4. Navigate to result
      navigate(`/exam-result/${sessionId}`);
      
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการส่งข้อสอบ: ' + err.message);
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    if (seconds === null) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!sessionInfo || questions.length === 0) return <div className="min-h-screen flex items-center justify-center">กำลังเตรียมข้อสอบ...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-lg shadow-indigo-200">
              {studentSession.student_id}
            </div>
            <div>
              <h1 className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">{sessionInfo.title}</h1>
              <p className="text-xs text-gray-500">{questions.length} ข้อ</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg ${
            timeLeft < 300 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-gray-100 text-gray-700'
          }`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 py-8 space-y-6">
        
        {/* Anti-cheat warning */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-bold mb-1">ระบบป้องกันการทุจริตทำงานอยู่</p>
            <p>ห้ามสลับแอป ห้ามเปิดแท็บใหม่ หรือย่อหน้าจอเด็ดขาด มิฉะนั้นระบบจะล็อคหน้าจอข้อสอบทันที</p>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex gap-3">
                <span className="text-indigo-500 shrink-0">{idx + 1}.</span>
                <span>{q.question_text}</span>
              </h3>
              <div className="space-y-3 pl-8">
                {q.choices.map((choice, cIdx) => {
                  const isSelected = answers[q.id] === cIdx;
                  return (
                    <label 
                      key={cIdx} 
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                        ? 'bg-indigo-50 border-indigo-500 shadow-sm' 
                        : 'bg-gray-50/50 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name={`question_${q.id}`} 
                        value={cIdx}
                        checked={isSelected}
                        onChange={() => handleSelectChoice(q.id, cIdx)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className={`${isSelected ? 'font-medium text-indigo-900' : 'text-gray-700'}`}>
                        {choice.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-8 pb-16 flex justify-center">
          <button 
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'กำลังส่งคำตอบ...' : 'ส่งข้อสอบ'} <Send className="w-5 h-5" />
          </button>
        </div>

      </main>
    </div>
  );
}
