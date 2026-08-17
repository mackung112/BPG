import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, ShieldAlert, CheckCircle, Send, Maximize2, Minimize2, Lock, AlertTriangle } from 'lucide-react';

export default function ExamRoom() {
  const { sessionId } = useParams();
  const { studentSession } = useAuth();
  const navigate = useNavigate();
  
  const [sessionInfo, setSessionInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastWarning, setToastWarning] = useState(null);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const cheatingFlag = useRef(false);
  const violationCountRef = useRef(0);

  const showSecurityWarning = (msg) => {
    setToastWarning(msg);
    setTimeout(() => setToastWarning(null), 3500);
  };

  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/login', { replace: true });
      return;
    }
    initExam();

    // 🔒 1. Anti-Cheat: Tab Switch & Window Blur (Allow 3 warnings, 4th time kicks)
    const triggerCheating = async (reason) => {
      if (cheatingFlag.current || submitting) return;
      cheatingFlag.current = true;

      try {
        await supabase
          .from('exam_participants')
          .update({ status: 'cheating' })
          .eq('session_id', sessionId)
          .eq('student_id', studentSession.student_id);
      } catch (e) {
        console.error('Failed to log cheating status:', e);
      }

      alert(`⚠️ ระบบตรวจพบพฤติกรรมต้องสงสัย (${reason})\nข้อสอบของคุณถูกระงับและส่งรายงานไปยังครูผู้คุมสอบแล้ว`);
      navigate(`/exam-lobby/${sessionId}`, { replace: true });
    };

    const handleViolation = (reason) => {
      if (cheatingFlag.current || submitting) return;

      violationCountRef.current += 1;

      if (violationCountRef.current <= 3) {
        // Warning 1, 2, 3: Show urgent warning modal without revealing exact strike count
        setWarningModalOpen(true);
        showSecurityWarning('⚠️ คำเตือน: ระบบตรวจพบการออกจากหน้าจอข้อสอบ');
      } else {
        // 4th time: Take immediate action and lock exam
        triggerCheating(reason || 'สลับหน้าต่างหรือออกจากหน้าจอข้อสอบเกินที่ระบบอนุญาต');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation('ออกจากหน้าต่างข้อสอบ หรือสลับแท็บเบราว์เซอร์');
      }
    };

    const handleWindowBlur = () => {
      if (!cheatingFlag.current && !submitting) {
        handleViolation('คลิกออกนอกหน้าจอข้อสอบ หรือสลับโปรแกรม');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    // 🔒 2. Anti-Cheat: Prevent Copy, Cut, Paste, Select, Drag & Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      showSecurityWarning('🚫 ไม่อนุญาตให้คลิกขวาในห้องสอบ');
      return false;
    };

    const handleCopy = (e) => {
      e.preventDefault();
      showSecurityWarning('🚫 ไม่อนุญาตให้คัดลอกข้อความในห้องสอบ');
      return false;
    };

    const handleCut = (e) => {
      e.preventDefault();
      showSecurityWarning('🚫 ไม่อนุญาตให้ตัดข้อความ');
      return false;
    };

    const handlePaste = (e) => {
      e.preventDefault();
      showSecurityWarning('🚫 ไม่อนุญาตให้วางข้อความ');
      return false;
    };

    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // 🔒 3. Anti-Cheat: Block Keyboard Shortcuts (DevTools, Copy/Paste, View Source, Print, Reload)
    const handleKeyDown = (e) => {
      // F12 or F5
      if (e.key === 'F12' || e.key === 'F5') {
        e.preventDefault();
        showSecurityWarning('🚫 ไม่อนุญาตให้ใช้ปุ่มฟังก์ชันนี้');
        return false;
      }

      // Ctrl + Shortcuts (C, V, X, A, U, S, P, R, J, I, Shift+I, Shift+J, Shift+C)
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (['c', 'v', 'x', 'a', 'u', 's', 'p', 'r', 'j', 'i'].includes(key)) {
          e.preventDefault();
          showSecurityWarning(`🚫 ไม่อนุญาตให้ใช้คีย์ลัด Ctrl+${key.toUpperCase()}`);
          return false;
        }
      }

      // Alt + Tab / Windows key warning
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        triggerCheating('พยายามใช้ Alt+Tab สลับหน้าต่าง');
        return false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 🔒 4. Prevent Page Reload / Closing without warning
    const handleBeforeUnload = (e) => {
      if (!submitting) {
        e.preventDefault();
        e.returnValue = 'ข้อสอบยังดำเนินอยู่ หากออกจากหน้านี้จะถือว่าสิ้นสุดการสอบ';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 🔒 5. Intercept browser back button
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      showSecurityWarning('⚠️ หากต้องการส่งข้อสอบ กรุณากดปุ่ม "ส่งข้อสอบ" ด้านล่าง');
    };
    window.addEventListener('popstate', handlePopState);

    // 🔒 6. Fullscreen Change Tracker
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // 🔒 7. Listen for session ending by teacher in real time
    const sessionSub = supabase
      .channel(`session_end_${sessionId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'exam_sessions', filter: `id=eq.${sessionId}` }, (payload) => {
        if (payload.new.status === 'completed') {
          handleSubmit(true);
        }
      })
      .subscribe();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      supabase.removeChannel(sessionSub);
    };
  }, [sessionId, studentSession, submitting]);

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
      .maybeSingle();
      
    if (!sData) {
      navigate('/', { replace: true });
      return;
    }
    
    setSessionInfo(sData);

    // Check participant status
    const { data: pData } = await supabase
      .from('exam_participants')
      .select('status, allow_rejoin')
      .eq('session_id', sessionId)
      .eq('student_id', studentSession.student_id)
      .maybeSingle();

    // If student already completed the exam and has no retake permission, redirect immediately to result
    if (pData?.status === 'completed' && !pData?.allow_rejoin) {
      navigate(`/exam-result/${sessionId}`, { replace: true });
      return;
    }

    const isRetakeAllowed = pData?.status === 'testing' || pData?.allow_rejoin;

    // Calculate time
    const startTime = new Date(sData.started_at || Date.now()).getTime();
    const now = Date.now();
    const timeLimitMs = (sData.time_limit_minutes || 60) * 60 * 1000;
    const elapsed = now - startTime;
    const remaining = Math.max(0, Math.floor((timeLimitMs - elapsed) / 1000));

    if (!isRetakeAllowed && (sData.status === 'completed' || (sData.started_at && remaining <= 0))) {
      alert('การสอบนี้เสร็จสิ้นหรือหมดเวลาแล้ว ไม่สามารถทำข้อสอบต่อได้ (หากต้องการสอบซ่อม กรุณากดขอสอบซ่อม)');
      navigate(`/exam-result/${sessionId}`, { replace: true });
      return;
    }

    if (sData.status === 'completed' || remaining <= 0) {
      setTimeLeft((sData.time_limit_minutes || 30) * 60);
    } else {
      setTimeLeft(remaining);
    }

    // 2. Set participant status to testing & clear rejoin flag
    await supabase
      .from('exam_participants')
      .update({ status: 'testing', allow_rejoin: false, retake_requested: false })
      .eq('session_id', sessionId)
      .eq('student_id', studentSession.student_id);

    // 3. Fetch questions
    const { data: eqData } = await supabase
      .from('exam_session_questions')
      .select(`
        points,
        questions (
          id, question_text, choices
        )
      `)
      .eq('session_id', sessionId);
      
    if (eqData) {
      let loadedQs = eqData.map(item => ({
        ...item.questions,
        points: item.points
      }));

      // Shuffle questions
      loadedQs = loadedQs.sort(() => 0.5 - Math.random());

      // Shuffle choices for each question
      loadedQs = loadedQs.map(q => {
        const shuffledChoices = [...q.choices].sort(() => 0.5 - Math.random());
        return {
          ...q,
          choices: shuffledChoices
        };
      });

      setQuestions(loadedQs);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Error attempting to enable fullscreen:', err.message);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleSelectChoice = (questionId, choiceText) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: choiceText
    }));
  };

  const handleSubmit = async (isAuto = false) => {
    if (!isAuto && !confirm('คุณแน่ใจหรือไม่ว่าต้องการส่งข้อสอบ?')) {
      return;
    }

    setSubmitting(true);
    try {
      // 1. Calculate Score
      let score = 0;
      const totalQuestions = questions.length;
      
      const { data: qData } = await supabase
        .from('exam_session_questions')
        .select(`
          points,
          question_id,
          questions (
            id, choices, correct_index, correct_answer_index
          )
        `)
        .eq('session_id', sessionId);

      const questionMap = {};
      if (qData) {
        qData.forEach(item => {
          questionMap[item.question_id] = {
            points: item.points,
            ...item.questions
          };
        });
      }

      for (const [qId, studentChoiceText] of Object.entries(answers)) {
        const eq = questionMap[qId];
        if (!eq) continue;

        const q = eq;
        const choices = q.choices || [];
        let correctText = '';

        const correctChoiceObj = choices.find(c => typeof c === 'object' && (c.is_correct === true || c.isCorrect === true));
        if (correctChoiceObj) {
          correctText = correctChoiceObj.text || '';
        } else if (typeof q.correct_answer_index === 'number' && choices[q.correct_index ?? q.correct_answer_index]) {
          const c = choices[q.correct_index ?? q.correct_answer_index];
          correctText = typeof c === 'object' ? c.text : c;
        }

        if (correctText && studentChoiceText && correctText.trim() === studentChoiceText) {
          score += Number(eq.points || 1);
        }
      }
      
      // 2. Save result to exam_results
      const { error: insertErr } = await supabase
        .from('exam_results')
        .insert([{
          session_id: sessionId,
          student_id: studentSession.student_id,
          score: score,
          total_questions: totalQuestions,
          submitted_at: new Date().toISOString()
        }]);

      if (insertErr) throw insertErr;
        
      // 3. Update participant status
      await supabase
        .from('exam_participants')
        .update({ status: 'completed', allow_rejoin: false, retake_requested: false })
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id);
        
      // 4. Exit fullscreen if active
      if (document.fullscreenElement && document.exitFullscreen) {
        try { await document.exitFullscreen(); } catch (_) {}
      }

      // 5. Navigate to result (replace history entry)
      window.location.replace(`/exam-result/${sessionId}`);
      
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

  if (!sessionInfo || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white font-sans">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-zinc-300">กำลังเตรียมข้อสอบและระบบล็อกความปลอดภัย...</p>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-none relative"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* 🛡️ Faint Security Watermark in background (Prevents camera photos) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] select-none flex flex-wrap gap-16 p-8 items-center justify-center font-mono font-bold text-zinc-900 text-lg rotate-[-15deg]">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}>{studentSession.student_id} • ANTI-CHEAT LOCK</span>
        ))}
      </div>

      {/* ⚠️ Floating Security Toast Warning */}
      {toastWarning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <AlertTriangle className="w-4 h-4" />
          <span>{toastWarning}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white h-9 px-3 flex items-center justify-center rounded-xl font-bold font-mono text-sm shadow-md shadow-indigo-200">
              {studentSession.student_id}
            </div>
            <div>
              <h1 className="font-bold text-zinc-900 truncate max-w-[180px] sm:max-w-xs text-sm">{sessionInfo.title}</h1>
              <p className="text-[11px] text-zinc-500 font-medium">
                ทำแล้ว {answeredCount} / {questions.length} ข้อ
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer border border-zinc-200"
              title={isFullscreen ? 'ออกจากโหมดเต็มจอ' : 'เข้าสู่โหมดเต็มหน้าจอ'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono font-bold text-base ${
              timeLeft < 300 ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-200' : 'bg-zinc-100 text-zinc-800'
            }`}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 py-6 space-y-5 relative z-10">
        
        {/* Anti-cheat Security Banner */}
        <div className="bg-gradient-to-r from-indigo-950 to-slate-900 text-white p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg border border-indigo-800/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-400/30">
              <Lock className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white flex items-center gap-1.5">
                🔒 โหมดความปลอดภัยสูงสุด (Anti-Cheat Lockdown)
              </p>
              <p className="text-zinc-300 text-[11px] mt-0.5">
                ห้ามสลับแอป ห้ามเปิดแท็บใหม่ ห้ามคัดลอกข้อความ มิฉะนั้นระบบจะล็อกข้อสอบทันที
              </p>
            </div>
          </div>
          {!isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="shrink-0 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-xl shadow-xs transition-all cursor-pointer hidden sm:block"
            >
              เต็มจอ
            </button>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            return (
              <div 
                key={q.id} 
                className={`bg-white p-5 sm:p-6 rounded-2xl shadow-xs border transition-all ${
                  isAnswered ? 'border-indigo-100 bg-white' : 'border-zinc-200/80 bg-white'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isAnswered ? 'bg-indigo-600 text-white shadow-xs' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <h3 className="text-[15px] font-bold text-zinc-900 leading-snug pt-0.5">
                    {q.question_text}
                  </h3>
                </div>

                <div className="space-y-2.5 sm:pl-10">
                  {q.choices.map((choice, cIdx) => {
                    const isSelected = answers[q.id] === choice.text;
                    return (
                      <label 
                        key={cIdx} 
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected 
                          ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 font-semibold shadow-xs' 
                          : 'bg-zinc-50/50 border-zinc-200/80 text-zinc-700 hover:bg-zinc-100/70 hover:border-zinc-300'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={`question_${q.id}`} 
                          value={choice.text}
                          checked={isSelected}
                          onChange={() => handleSelectChoice(q.id, choice.text)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm select-none">
                          {choice.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="pt-6 pb-20 flex flex-col items-center gap-2">
          <button 
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="flex items-center justify-center gap-2.5 w-full sm:w-80 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? 'กำลังส่งคำตอบ...' : `ส่งข้อสอบ (ตอบแล้ว ${answeredCount}/${questions.length})`} 
            <Send className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-zinc-400">
            เมื่อส่งข้อสอบแล้ว จะไม่สามารถกลับมาแก้ไขคำตอบได้อีก
          </p>
        </div>

      </main>

      {/* ⚠️ Security Warning Modal (Accidental tab / window switch) */}
      {warningModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-rose-200 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-rose-100">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-zinc-900">
                คำเตือนความปลอดภัยในการสอบ!
              </h2>
              <p className="text-xs text-zinc-500 font-mono">
                รหัสประจำตัว: {studentSession?.student_id}
              </p>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed bg-rose-50/70 p-4 rounded-2xl border border-rose-100 text-left">
              ระบบตรวจพบว่าคุณ<strong className="text-rose-700">สลับแท็บเบราว์เซอร์ ย่อหน้าจอ หรือเปิดโปรแกรมอื่น</strong><br /><br />
              <span className="text-rose-700 font-bold">
                ⚠️ หากระบบตรวจพบการออกจากหน้าจอข้อสอบอีก การสอบของคุณจะถูกระงับทันที และส่งรายงานไปยังครูผู้คุมสอบ
              </span>
            </p>

            <button
              onClick={() => setWarningModalOpen(false)}
              className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-bold text-sm shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              รับทราบและกลับไปทำข้อสอบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
