import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Clock, 
  ShieldAlert, 
  CheckCircle, 
  Send, 
  Maximize2, 
  Minimize2, 
  Lock, 
  AlertTriangle,
  Flag,
  ChevronLeft,
  ChevronRight,
  Check,
  HelpCircle,
  Sparkles
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 2;

export default function ExamRoom() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();
  
  const [sessionInfo, setSessionInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
  const [toastWarning, setToastWarning] = useState(null);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isRetakeMode, setIsRetakeMode] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const cheatingFlag = useRef(false);
  const violationCountRef = useRef(0);
  const sessionModeRef = useRef('onsite');

  const showSecurityWarning = (msg) => {
    setToastWarning(msg);
    setTimeout(() => setToastWarning(null), 3500);
  };

  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/login', { replace: true });
      return;
    }
    const loadExamAndFullscreen = async () => {
      await initExam();
      
      // Auto-fullscreen attempt
      if (!document.fullscreenElement) {
        try {
          const el = document.documentElement;
          if (el.requestFullscreen) await el.requestFullscreen();
          else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
          else if (el.msRequestFullscreen) await el.msRequestFullscreen();
          setIsFullscreen(true);
        } catch (e) {
          console.warn('Auto fullscreen blocked by browser:', e.message);
        }
      } else {
        setIsFullscreen(true);
      }
    };
    
    loadExamAndFullscreen();

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

      if (sessionModeRef.current === 'online') {
        supabase
          .from('exam_participants')
          .update({ warnings_count: violationCountRef.current })
          .eq('session_id', sessionId)
          .eq('student_id', studentSession.student_id)
          .then();

        if (violationCountRef.current < 3) {
          setWarningModalOpen(true);
          showSecurityWarning(`⚠️ คำเตือน: ระบบตรวจพบการออกจากหน้าจอข้อสอบ (เตือนครั้งที่ ${violationCountRef.current}/2)`);
        } else {
          cheatingFlag.current = true;
          alert('⚠️ คุณทำผิดกฎเกินกำหนด ระบบกำลังส่งข้อสอบของคุณอัตโนมัติ');
          setTimeLeft(0);
        }
      } else {
        if (violationCountRef.current <= 3) {
          setWarningModalOpen(true);
          showSecurityWarning('⚠️ คำเตือน: ระบบตรวจพบการออกจากหน้าจอข้อสอบ');
        } else {
          triggerCheating(reason || 'สลับหน้าต่างหรือออกจากหน้าจอข้อสอบเกินที่ระบบอนุญาต');
        }
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
      if (e.key === 'F12' || e.key === 'F5') {
        e.preventDefault();
        showSecurityWarning('🚫 ไม่อนุญาตให้ใช้ปุ่มฟังก์ชันนี้');
        return false;
      }

      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (['c', 'v', 'x', 'a', 'u', 's', 'p', 'r', 'j', 'i'].includes(key)) {
          e.preventDefault();
          showSecurityWarning(`🚫 ไม่อนุญาตให้ใช้คีย์ลัด Ctrl+${key.toUpperCase()}`);
          return false;
        }
      }

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

    // 🔒 7. Listen for session ending or time extension by teacher in real time
    const sessionSub = supabase
      .channel(`session_update_${sessionId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'exam_sessions', filter: `id=eq.${sessionId}` }, (payload) => {
        if (payload.new.status === 'completed') {
          handleSubmit(true);
        } else if (payload.new.time_limit_minutes) {
          // Real-time time extension from teacher
          setSessionInfo(prev => ({ ...prev, ...payload.new }));
          const startTime = new Date(payload.new.started_at || Date.now()).getTime();
          const now = Date.now();
          const timeLimitMs = payload.new.time_limit_minutes * 60 * 1000;
          const remaining = Math.max(0, Math.floor((timeLimitMs - (now - startTime)) / 1000));
          setTimeLeft(remaining);
          showSecurityWarning(`📢 ครูผู้สอนปรับเวลาสอบเป็น ${payload.new.time_limit_minutes} นาที`);
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
    setLoading(true);
    setErrorMsg(null);
    try {
      // 1. Get session info
      const { data: sData, error: sError } = await supabase
        .from('exam_sessions')
        .select('*, question_banks(title)')
        .eq('id', sessionId)
        .maybeSingle();
        
      if (sError || !sData) {
        await logoutStudent();
        navigate('/login', { replace: true });
        return;
      }
      
      setSessionInfo(sData);

      // Check participant status and previous attempts
      const { data: pData } = await supabase
        .from('exam_participants')
        .select('status, allow_rejoin, is_retake, started_at, warnings_count')
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id)
        .maybeSingle();

      sessionModeRef.current = sData.exam_mode || 'onsite';
      violationCountRef.current = pData?.warnings_count || 0;

      // Fetch previous results for this student to detect retake
      const { data: prevResults } = await supabase
        .from('exam_results')
        .select('id, score, attempt_number')
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id)
        .order('submitted_at', { ascending: true });

      const hasPreviousAttempts = prevResults && prevResults.length > 0;
      const isRetake = hasPreviousAttempts || pData?.allow_rejoin || pData?.is_retake;
      const currentAttempt = (prevResults?.length || 0) + 1;

      setIsRetakeMode(isRetake);
      setAttemptNumber(currentAttempt);

      // If student already completed the exam and has no retake permission, redirect immediately to result
      if (pData?.status === 'completed' && !pData?.allow_rejoin) {
        navigate(`/exam-result/${sessionId}`, { replace: true });
        return;
      }

      const isRetakeAllowed = pData?.status === 'testing' || pData?.allow_rejoin;

      // Calculate time
      const startTime = sessionModeRef.current === 'online' && pData?.started_at
          ? new Date(pData.started_at).getTime()
          : new Date(sData.started_at || Date.now()).getTime();
      const now = Date.now();
      const timeLimitMs = (sData.time_limit_minutes || 60) * 60 * 1000;
      const elapsed = now - startTime;
      const remaining = Math.max(0, Math.floor((timeLimitMs - elapsed) / 1000));

      if (sessionModeRef.current !== 'online' && !isRetakeAllowed && (sData.status === 'completed' || (sData.started_at && remaining <= 0))) {
        alert('การสอบนี้เสร็จสิ้นหรือหมดเวลาแล้ว ไม่สามารถทำข้อสอบต่อได้ (หากต้องการสอบซ่อม กรุณากดขอสอบซ่อม)');
        navigate(`/exam-result/${sessionId}`, { replace: true });
        return;
      }

      if (sData.status === 'completed' || remaining <= 0) {
        setTimeLeft((sData.time_limit_minutes || 30) * 60);
      } else {
        setTimeLeft(remaining);
      }

      // 2. Set participant status to testing & update retake flags
      await supabase
        .from('exam_participants')
        .update({
          status: 'testing',
          allow_rejoin: false,
          retake_requested: false,
          is_retake: isRetake,
          attempt_count: currentAttempt
        })
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id);

      // 3. Fetch question pool for this session
      const { data: eqData, error: eqError } = await supabase
        .from('exam_session_questions')
        .select(`
          points,
          questions (
            id, question_text, choices, correct_answer_index
          )
        `)
        .eq('session_id', sessionId);
        
      if (eqError || !eqData || eqData.length === 0) {
        setErrorMsg('ไม่พบข้อสอบในชุดนี้ หรือห้องสอบยังไม่ได้ตั้งค่าคำถาม');
        setLoading(false);
        return;
      }

      let pool = eqData.map(item => ({
        ...item.questions,
        points: item.points
      }));

      // Genuine independent random shuffle of the entire candidate pool
      pool = pool.sort(() => Math.random() - 0.5);

      // Determine how many questions to draw for this attempt
      const targetCount = sData.question_count && sData.question_count > 0 && sData.question_count < pool.length
        ? sData.question_count
        : pool.length;

      let sampledQuestions = pool.slice(0, targetCount);

      // Calculate score points per question
      const pointsPerQ = (sData.total_score && targetCount > 0)
        ? (Number(sData.total_score) / targetCount)
        : (sampledQuestions[0]?.points || 1);

      // Determine correct answer text before shuffling, then shuffle choices independently
      sampledQuestions = sampledQuestions.map(q => {
        const rawChoices = q.choices || [];
        
        let correctText = '';
        const correctChoiceObj = rawChoices.find(c => typeof c === 'object' && (c.is_correct === true || c.isCorrect === true));
        if (correctChoiceObj) {
          correctText = correctChoiceObj.text || '';
        } else if (typeof q.correct_answer_index === 'number' && rawChoices[q.correct_answer_index]) {
          const c = rawChoices[q.correct_answer_index];
          correctText = typeof c === 'object' ? c.text : c;
        }

        const shuffledChoices = [...rawChoices].sort(() => Math.random() - 0.5);
        return {
          ...q,
          correctText: correctText,
          points: pointsPerQ,
          choices: shuffledChoices
        };
      });

      setQuestions(sampledQuestions);
    } catch (err) {
      console.error('Error initializing exam:', err);
      setErrorMsg('เกิดข้อผิดพลาดในการโหลดข้อสอบ: ' + (err.message || ''));
    } finally {
      setLoading(false);
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

  const toggleFlag = (questionId) => {
    setFlagged(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const goToQuestion = (index) => {
    const targetPage = Math.floor(index / QUESTIONS_PER_PAGE);
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (isAuto = false) => {
    if (!isAuto && isSubmitModalOpen) {
      setIsSubmitModalOpen(false);
    }

    setSubmitting(true);
    try {
      // 1. Calculate Score based on the dynamically assigned questions for this attempt
      let rawScore = 0;
      const totalQuestions = questions.length;
      
      for (const q of questions) {
        const studentChoiceText = answers[q.id];
        if (!studentChoiceText) continue;

        if (q.correctText && studentChoiceText.trim() === q.correctText.trim()) {
          rawScore += Number(q.points || (Number(sessionInfo?.total_score || 10) / totalQuestions));
        }
      }

      // Round to integer cleanly (ปัดเศษเป็นจำนวนเต็มทั้งหมด)
      const finalScore = Math.round(rawScore);
      
      // 2. Save result to exam_results with attempt tracking
      const isRetakeSubmission = attemptNumber > 1;
      const { error: insertErr } = await supabase
        .from('exam_results')
        .insert([{
          session_id: sessionId,
          student_id: studentSession.student_id,
          score: finalScore,
          total_questions: totalQuestions,
          attempt_number: attemptNumber,
          is_retake: isRetakeSubmission,
          note: isRetakeSubmission ? `สอบซ่อม (รอบที่ ${attemptNumber})` : 'สอบรอบปกติ (รอบที่ 1)',
          submitted_at: new Date().toISOString()
        }]);

      if (insertErr) throw insertErr;
        
      // 3. Update participant status
      await supabase
        .from('exam_participants')
        .update({ 
          status: 'completed', 
          allow_rejoin: false, 
          retake_requested: false,
          is_retake: isRetakeSubmission,
          attempt_count: attemptNumber
        })
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id);
        
      // 4. Exit fullscreen if active
      if (document.fullscreenElement && document.exitFullscreen) {
        try { await document.exitFullscreen(); } catch (_) {}
      }

      // 5. Navigate to result (replace history entry)
      navigate(`/exam-result/${sessionId}`, { replace: true });
      
    } catch (err) {
      console.error('Submit error:', err);
      alert('เกิดข้อผิดพลาดในการส่งข้อสอบ: ' + (err.message || JSON.stringify(err)));
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    if (seconds === null) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white font-sans p-4">
        <div className="max-w-md w-full bg-zinc-800 p-8 rounded-3xl border border-zinc-700 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">เกิดข้อผิดพลาด</h2>
          <p className="text-sm text-zinc-400 font-medium">{errorMsg}</p>
          <button
            onClick={async () => {
              await logoutStudent();
              navigate('/login', { replace: true });
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all cursor-pointer mt-2"
          >
            กลับสู่หน้าเข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  if (loading || !sessionInfo || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white font-sans p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-zinc-300">กำลังเตรียมข้อสอบและระบบล็อกความปลอดภัย...</p>
          <button
            onClick={async () => {
              await logoutStudent();
              navigate('/login', { replace: true });
            }}
            className="text-xs text-zinc-500 hover:text-rose-400 hover:underline pt-2 block mx-auto cursor-pointer"
          >
            หากรอนานเกินไป คลิกที่นี่เพื่อกลับหน้าเข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  if (!isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-900 flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="bg-zinc-800 p-8 rounded-3xl max-w-md w-full shadow-2xl border border-zinc-700/50 space-y-6">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">เข้าสู่โหมดเต็มจอ</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              ระบบป้องกันการทุจริตบังคับให้ทำข้อสอบในโหมดเต็มจอเท่านั้น กรุณาคลิกปุ่มด้านล่างเพื่อดำเนินการต่อ
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.documentElement;
              if (el.requestFullscreen) el.requestFullscreen();
              else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
              else if (el.msRequestFullscreen) el.msRequestFullscreen();
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            เปิดโหมดเต็มจอและทำข้อสอบ
          </button>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

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
      {/* 🛡️ Faint Security Watermark in background */}
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
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-zinc-900 truncate max-w-[180px] sm:max-w-xs text-sm">{sessionInfo.title}</h1>
                {isRetakeMode && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md border border-amber-300">
                    สอบซ่อม #{attemptNumber}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 font-medium">
                ทำแล้ว {answeredCount}/{questions.length} ข้อ • หน้า {currentPage + 1}/{totalPages}
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
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 py-5 space-y-5 relative z-10">
        
        {/* 🎯 Retake Exam Notice Banner */}
        {isRetakeMode && (
          <div className="bg-amber-500/10 border border-amber-400/40 text-amber-900 p-3.5 rounded-2xl text-xs flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center shrink-0">🎯</span>
              <div>
                <p className="font-bold text-amber-900">โหมดสอบซ่อม (ครั้งที่ {attemptNumber})</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  คะแนนสอบครั้งที่ 1 ถูกปรับเป็น 0 แล้ว ระบบจะบันทึกคะแนนรอบนี้เป็นคะแนนสอบซ่อม
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-amber-200/70 text-amber-900 font-bold rounded-lg text-[11px] shrink-0 font-mono">
              RETAKE #{attemptNumber}
            </span>
          </div>
        )}

        {/* 🧭 Question Status Palette / Quick Navigator Grid */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600" /> แผนผังข้อสอบ (คลิกเพื่อไปยังข้อนั้น)
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> ทำแล้ว ({answeredCount})
              </span>
              <span className="flex items-center gap-1 text-amber-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> ปักธง ({flaggedCount})
              </span>
              <span className="flex items-center gap-1 text-zinc-500 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 border border-zinc-300" /> ยังไม่ทำ ({unansweredCount})
              </span>
            </div>
          </div>

          {/* Question Bubbles Grid */}
          <div className="flex flex-wrap gap-2 pt-1">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flagged[q.id] === true;
              const isCurrentPage = idx >= startIndex && idx < startIndex + QUESTIONS_PER_PAGE;

              let style = 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200';
              if (isFlagged) {
                style = 'bg-amber-400 text-amber-950 border-amber-500 font-bold shadow-xs';
              } else if (isAnswered) {
                style = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-xs';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`w-9 h-9 rounded-xl text-xs font-mono transition-all cursor-pointer relative flex items-center justify-center border ${style} ${
                    isCurrentPage ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105 font-black z-10' : ''
                  }`}
                  title={`ข้อ ${idx + 1}${isFlagged ? ' (ปักธง)' : isAnswered ? ' (ทำแล้ว)' : ' (ยังไม่ทำ)'}`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <Flag className="w-2.5 h-2.5 fill-amber-950 text-amber-950 absolute -top-1 -right-1" />
                  )}
                  {isAnswered && !isFlagged && (
                    <Check className="w-2.5 h-2.5 text-white absolute -top-1 -right-1 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 📄 Displaying 2 Questions on Current Page */}
        <div className="space-y-5">
          {currentQuestions.map((q, localIdx) => {
            const actualIndex = startIndex + localIdx;
            const isAnswered = answers[q.id] !== undefined;
            const isFlagged = flagged[q.id] === true;

            return (
              <div 
                key={q.id} 
                className={`bg-white p-5 sm:p-6 rounded-2xl shadow-xs border transition-all ${
                  isFlagged 
                    ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-200' 
                    : isAnswered 
                    ? 'border-emerald-200 bg-white' 
                    : 'border-zinc-200/80 bg-white'
                }`}
              >
                {/* Question Top Bar (Number + Flag Action) */}
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 font-mono ${
                      isFlagged
                        ? 'bg-amber-400 text-amber-950 font-black shadow-xs'
                        : isAnswered 
                        ? 'bg-emerald-500 text-white font-bold shadow-xs' 
                        : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {actualIndex + 1}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      ข้อที่ {actualIndex + 1} จาก {questions.length}
                    </span>
                  </div>

                  {/* Flag Toggle Button */}
                  <button
                    onClick={() => toggleFlag(q.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isFlagged
                        ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-xs'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 text-amber-600' : 'text-zinc-400'}`} />
                    <span>{isFlagged ? 'ปักธงไว้แล้ว' : 'ปักธงข้อนี้'}</span>
                  </button>
                </div>

                {/* Question Text */}
                <h3 className="text-base font-bold text-zinc-900 leading-relaxed mb-4">
                  {q.question_text}
                </h3>

                {/* Choices List */}
                <div className="space-y-2.5">
                  {q.choices.map((choice, cIdx) => {
                    const isSelected = answers[q.id] === choice.text;
                    return (
                      <label 
                        key={cIdx} 
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected 
                          ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-300' 
                          : 'bg-zinc-50/60 border-zinc-200/80 text-zinc-700 hover:bg-zinc-100/80 hover:border-zinc-300'
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
                        <span className="text-sm select-none leading-relaxed">
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

        {/* 🔄 Bottom Pagination & Navigation Controls */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setCurrentPage(p => Math.max(0, p - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> ก่อนหน้า
          </button>

          <div className="text-center">
            <p className="text-xs font-bold text-zinc-800">
              หน้า {currentPage + 1} / {totalPages}
            </p>
            <p className="text-[11px] text-zinc-400 font-medium">
              ข้อ {startIndex + 1} - {Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length)} จาก {questions.length} ข้อ
            </p>
          </div>

          {currentPage < totalPages - 1 ? (
            <button
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages - 1, p + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              ถัดไป <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all cursor-pointer animate-pulse"
            >
              ส่งข้อสอบ <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Global Submit Floating Bar */}
        <div className="pt-2 pb-16 flex justify-center">
          <button 
            onClick={() => setIsSubmitModalOpen(true)}
            disabled={submitting}
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-bold text-xs shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" /> ตรวจทานและส่งข้อสอบ (ตอบแล้ว {answeredCount}/{questions.length})
          </button>
        </div>

      </main>

      {/* 🚀 Submit Confirmation & Summary Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-100">
              <Send className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-black text-zinc-900">
                ยืนยันการส่งข้อสอบ?
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                {sessionInfo?.title}
              </p>
            </div>

            {/* Answer Summary Card */}
            <div className="grid grid-cols-3 gap-2 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 text-center">
              <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="block text-2xl font-black text-emerald-700 font-mono">{answeredCount}</span>
                <span className="text-[11px] font-bold text-emerald-800">ทำแล้ว</span>
              </div>
              <div className="p-2 bg-amber-50 rounded-xl border border-amber-100">
                <span className="block text-2xl font-black text-amber-700 font-mono">{flaggedCount}</span>
                <span className="text-[11px] font-bold text-amber-800">ปักธงไว้</span>
              </div>
              <div className="p-2 bg-rose-50 rounded-xl border border-rose-100">
                <span className="block text-2xl font-black text-rose-700 font-mono">{unansweredCount}</span>
                <span className="text-[11px] font-bold text-rose-800">ยังไม่ทำ</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                ⚠️ คุณยังมีข้อที่ยังไม่ได้ทำอีก {unansweredCount} ข้อ
              </p>
            )}

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                กลับไปตรวจทาน
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleSubmit(false)}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                {submitting ? 'กำลังส่ง...' : 'ยืนยันส่งข้อสอบ'}
              </button>
            </div>
          </div>
        </div>
      )}

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
