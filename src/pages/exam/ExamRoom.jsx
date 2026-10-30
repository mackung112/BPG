import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  getSessionInfo,
  getParticipant,
  getExamQuestions,
  getStudentResults,
  updateParticipantStatus,
  submitExamResult,
  saveDraftAnswers,
  loadDraftAnswers,
  deleteSuspendedResult
} from '../../services/examStudentService.js';
import { useExamTimer, calculateRemainingSeconds } from '../../hooks/exam/useExamTimer.js';
import { useAntiCheat } from '../../hooks/exam/useAntiCheat.js';
import QuestionPalette from '../../components/exam/QuestionPalette.jsx';
import QuestionRenderer from '../../components/exam/QuestionRenderer.jsx';
import { supabase } from '../../lib/supabase.js';
import {
  Clock, ShieldAlert, CheckCircle, Send, Maximize2, Minimize2,
  Lock, AlertTriangle, Flag, ChevronLeft, ChevronRight, Check, HelpCircle,
  Sparkles, MessageSquare, Menu, X, ArrowRight, ArrowLeft
} from 'lucide-react';

const getDraftKey = (sId, stId) => `exam_draft_v2_${sId}_${stId}`;

export default function ExamRoom() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();

  const [sessionInfo, setSessionInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastWarning, setToastWarning] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  const [strikeWarningModal, setStrikeWarningModal] = useState(null);
  const [isSuspended, setIsSuspended] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaletteDrawerOpen, setIsPaletteDrawerOpen] = useState(false);
  const [isRetakeMode, setIsRetakeMode] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [extraTimeMinutes, setExtraTimeMinutes] = useState(0);
  const [examStartedAt, setExamStartedAt] = useState(null);

  const submitLockRef = useRef(false);
  const handleSubmitRef = useRef();
  const draftSaveTimerRef = useRef(null);

  // --- Realtime Broadcast Channel Listener ---
  useEffect(() => {
    if (!sessionId || !studentSession?.student_id) return;

    const channel = supabase.channel(`room:exam_${sessionId}`);

    channel
      .on('broadcast', { event: 'broadcast_announcement' }, (payload) => {
        if (payload?.payload?.message) {
          setAnnouncement(payload.payload);
        }
      })
      .on('broadcast', { event: 'time_extended' }, (payload) => {
        const { studentId, additionalMinutes, newTotal } = payload?.payload || {};
        if (studentId === studentSession.student_id) {
          setExtraTimeMinutes(newTotal);
          showSecurityWarning(`⏰ ครูผู้คุมสอบได้เพิ่มเวลาให้คุณ +${additionalMinutes} นาที (รวมเวลาเพิ่ม ${newTotal} นาที)`);
        }
      })
      .on('broadcast', { event: 'room_time_adjusted' }, (payload) => {
        const { newTimeLimitMinutes, additionalMinutes } = payload?.payload || {};
        if (newTimeLimitMinutes) {
          setSessionInfo(prev => prev ? ({ ...prev, time_limit_minutes: newTimeLimitMinutes }) : prev);
          if (additionalMinutes) {
            showSecurityWarning(`⏰ ครูผู้คุมสอบได้เพิ่มเวลาสอบให้ทุกคนในห้อง +${additionalMinutes} นาที (รวมเวลาสอบ ${newTimeLimitMinutes} นาที)`);
          } else {
            showSecurityWarning(`⏰ ครูผู้คุมสอบได้ปรับเวลาสอบของห้องเป็น ${newTimeLimitMinutes} นาที`);
          }
        } else if (additionalMinutes) {
          setExtraTimeMinutes(prev => prev + Number(additionalMinutes));
          showSecurityWarning(`⏰ ครูผู้คุมสอบได้เพิ่มเวลาสอบให้ทุกคนในห้อง +${additionalMinutes} นาที`);
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'exam_sessions',
        filter: `id=eq.${sessionId}`
      }, (payload) => {
        if (payload?.new) {
          setSessionInfo(prev => ({ ...prev, ...payload.new }));
        }
      })
      .on('broadcast', { event: 'suspension_resolved' }, (payload) => {
        const { studentId, action } = payload?.payload || {};
        if (studentId === studentSession.student_id) {
          if (action === 'resume') {
            setIsSuspended(false);
            setStrikeWarningModal(null);
            showSecurityWarning('✅ ได้รับการอนุมัติให้สอบต่อ กรุณาทำข้อสอบด้วยความซื่อสัตย์');
          } else if (action === 'force_submit') {
            alert('ครูผู้คุมสอบได้สั่งยุติการสอบของคุณ ระบบจะนำไปยังหน้าผลสอบ');
            navigate(`/exam-result/${sessionId}`, { replace: true });
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, studentSession?.student_id, navigate]);

  // --- Server-Authoritative Timer ---
  const durationMin = sessionInfo?.time_limit_minutes || 60;
  const timerConfig = examStartedAt ? {
    startedAt: examStartedAt,
    durationMinutes: durationMin,
    extraTimeMinutes
  } : null;

  const { timeLeft, setTimeLeft } = useExamTimer(
    timerConfig,
    (autoSubmit) => handleSubmitRef.current?.(autoSubmit),
    !submitting && questions.length > 0 && !isSuspended
  );

  const showSecurityWarning = (msg) => {
    setToastWarning(msg);
    setTimeout(() => setToastWarning(null), 4000);
  };

  // --- Progressive 3-Strike & Anti-Cheat Monitor ---
  const handleSuspended = useCallback(async (reason) => {
    setIsSuspended(true);
    setStrikeWarningModal({
      strike: 3,
      message: reason || 'ตรวจพบการออกจากหน้าจอข้อสอบครบ 3 ครั้ง การสอบถูกระงับชั่วคราว กรุณาแจ้งครูผู้คุมสอบ'
    });
  }, []);

  const handleStrikeAlert = useCallback(async ({ strikeCount, reason, timestamp }) => {
    // Send live strike event to teacher room
    const channel = supabase.channel(`room:exam_${sessionId}`);
    channel.send({
      type: 'broadcast',
      event: 'student_strike_alert',
      payload: {
        studentId: studentSession?.student_id,
        studentName: studentSession?.first_name ? `${studentSession.first_name} ${studentSession.last_name || ''}` : studentSession?.student_id,
        strikeCount,
        reason,
        timestamp
      }
    }).catch(() => {});
  }, [sessionId, studentSession]);

  const { isFullscreen, requestFullscreen, exitFullscreen, isMobile } = useAntiCheat({
    sessionId,
    studentId: studentSession?.student_id,
    sessionMode: sessionInfo?.exam_mode || 'official',
    initialWarnings: 0,
    onSuspended: handleSuspended,
    onAutoSubmit: () => handleSubmitRef.current?.(true),
    onWarning: (msg) => {
      setToastWarning(msg);
      setTimeout(() => setToastWarning(null), 3500);
    },
    onSleep: (lostSec) => {
      showSecurityWarning(`⚠️ ระบบตรวจพบหน้าจอดับไป ${lostSec} วินาที`);
    },
    onStrikeAlert: handleStrikeAlert,
    isActive: !submitting && questions.length > 0 && !isSuspended
  });

  // --- Hybrid Draft Auto-Save ---
  const persistDraft = useCallback((updatedAnswers, updatedFlagged) => {
    if (!sessionId || !studentSession?.student_id) return;

    // 1. Instant local storage save
    try {
      localStorage.setItem(getDraftKey(sessionId, studentSession.student_id), JSON.stringify({
        answers: updatedAnswers,
        flagged: updatedFlagged,
        attemptNumber,
        timestamp: Date.now()
      }));
    } catch (_) {}

    // 2. Debounced save to PostgreSQL
    if (draftSaveTimerRef.current) clearTimeout(draftSaveTimerRef.current);
    draftSaveTimerRef.current = setTimeout(() => {
      saveDraftAnswers(
        sessionId,
        studentSession.student_id,
        updatedAnswers,
        Object.keys(updatedFlagged).filter(k => updatedFlagged[k])
      ).catch((err) => console.warn('Draft sync background failed:', err));
    }, 1500);
  }, [sessionId, studentSession?.student_id, attemptNumber]);

  // --- Load Session & Questions ---
  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/', { replace: true });
      return;
    }

    const initExam = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const sData = await getSessionInfo(sessionId);
        if (!sData) {
          await logoutStudent();
          navigate('/login', { replace: true });
          return;
        }
        setSessionInfo(sData);

        const pData = await getParticipant(sessionId, studentSession.student_id);
        if (!pData) {
          setErrorMsg('ไม่พบข้อมูลการลงทะเบียนในห้องสอบนี้');
          setLoading(false);
          return;
        }

        setExtraTimeMinutes(Number(pData.extra_time_minutes || 0));

        if (pData.status === 'completed' && !pData.allow_rejoin) {
          navigate(`/exam-result/${sessionId}`, { replace: true });
          return;
        }

        if (pData.status === 'cheating' && !pData.allow_rejoin) {
          setIsSuspended(true);
          setStrikeWarningModal({
            strike: 3,
            message: 'การสอบของคุณถูกระงับชั่วคราว กรุณาแจ้งครูผู้คุมสอบเพื่อขอปลดล็อก'
          });
        }

        // Determine attempts & start time
        const prevResults = await getStudentResults(sessionId, studentSession.student_id);
        const validResults = prevResults.filter(r => !r.is_suspended);
        const currentAttempt = validResults.length + 1;
        setAttemptNumber(currentAttempt);
        setIsRetakeMode(currentAttempt > 1 || Boolean(pData.allow_rejoin));

        // Per-Attempt Authoritative Timer:
        // Use student attempt start time so retakes & fresh starts get their full allotted time.
        let startTimestamp = pData.started_at;
        if (!startTimestamp || pData.allow_rejoin || pData.status === 'waiting') {
          startTimestamp = new Date().toISOString();
          await updateParticipantStatus(sessionId, studentSession.student_id, {
            status: 'testing',
            allow_rejoin: false,
            started_at: startTimestamp
          });
        } else if (pData.status !== 'testing') {
          await updateParticipantStatus(sessionId, studentSession.student_id, {
            status: 'testing'
          });
        }

        // Validate remaining time before timer starts to prevent premature auto-submit
        const durationMin = sData.time_limit_minutes || 60;
        const initialRem = calculateRemainingSeconds(startTimestamp, durationMin, Number(pData.extra_time_minutes || 0));
        if (initialRem !== null && initialRem <= 0) {
          setErrorMsg('เวลาสอบสำหรับรอบนี้หมดลงแล้ว กรุณาติดต่อคุณครูผู้สอนหากต้องการสอบซ่อม');
          setLoading(false);
          return;
        }

        setExamStartedAt(startTimestamp);

        // Restore Hybrid Draft: Database draft first, fallback to local cache
        const serverDraft = await loadDraftAnswers(sessionId, studentSession.student_id);
        let restoredAnswers = serverDraft.answers || {};
        let restoredFlagged = {};
        if (Array.isArray(serverDraft.flagged)) {
          serverDraft.flagged.forEach(qId => { restoredFlagged[qId] = true; });
        }

        if (Object.keys(restoredAnswers).length === 0) {
          try {
            const raw = localStorage.getItem(getDraftKey(sessionId, studentSession.student_id));
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed?.answers) restoredAnswers = parsed.answers;
              if (parsed?.flagged) restoredFlagged = parsed.flagged;
            }
          } catch (_) {}
        }

        setAnswers(restoredAnswers);
        setFlagged(restoredFlagged);

        // Fetch questions (ZERO-LEAK with Seeded Randomization & Subset Sampling)
        const qList = await getExamQuestions(sessionId, studentSession.student_id, {
          shuffleQuestions: sData.shuffle_questions !== false,
          shuffleChoices: sData.shuffle_choices !== false,
          questionCount: sData.question_count
        });
        if (!qList || qList.length === 0) {
          setErrorMsg('ไม่พบข้อสอบในชุดนี้ กรุณาติดต่อคุณครูผู้คุมสอบ');
          setLoading(false);
          return;
        }

        setQuestions(qList);
        if (!isMobile) requestFullscreen();
      } catch (err) {
        console.error('Init exam error:', err);
        setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อสอบ');
      } finally {
        setLoading(false);
      }
    };

    initExam();
  }, [sessionId, studentSession, navigate, isMobile]);

  // --- Choice Selection ---
  const handleSelectAnswer = (questionId, choiceText) => {
    setAnswers(prev => {
      const updated = { ...prev, [questionId]: choiceText };
      persistDraft(updated, flagged);
      return updated;
    });
  };

  const handleToggleFlag = (questionId) => {
    setFlagged(prev => {
      const updated = { ...prev, [questionId]: !prev[questionId] };
      persistDraft(answers, updated);
      return updated;
    });
  };

  // --- Submit Exam Action ---
  const handleSubmit = async (isAuto = false) => {
    if (submitting || submitLockRef.current) return;
    submitLockRef.current = true;
    setSubmitting(true);
    if (!isAuto && isSubmitModalOpen) setIsSubmitModalOpen(false);

    try {
      // 1. Submit answers via secure PostgreSQL RPC (Zero Client Scoring)
      const res = await submitExamResult({
        sessionId,
        studentId: studentSession.student_id,
        answers,
        timeSpentSeconds: 0,
        isSuspended: false,
        note: isRetakeMode ? `สอบซ่อม (รอบที่ ${attemptNumber})` : 'สอบรอบปกติ (รอบที่ 1)'
      });

      // 2. Clear local storage draft
      try {
        localStorage.removeItem(getDraftKey(sessionId, studentSession.student_id));
      } catch (_) {}

      await exitFullscreen();
      navigate(`/exam-result/${sessionId}`, { replace: true });
    } catch (err) {
      console.error('Submit exam error:', err);
      alert('เกิดข้อผิดพลาดในการส่งข้อสอบ: ' + (err.message || JSON.stringify(err)));
      setSubmitting(false);
      submitLockRef.current = false;
    }
  };
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  });

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- Error Screen ---
  if (errorMsg || (!loading && questions.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-sans p-4">
        <div className="max-w-md w-full bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">เกิดข้อผิดพลาด</h2>
          <p className="text-sm text-zinc-400">{errorMsg || 'ไม่พบข้อสอบในชุดนี้'}</p>
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

  // --- Loading Screen ---
  if (loading || !sessionInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-sans p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-zinc-300">กำลังเตรียมข้อสอบและเชื่อมต่อห้องสอบแบบปลอดภัย...</p>
        </div>
      </div>
    );
  }

  // --- Fullscreen Prompt for Desktop ---
  if (!isMobile && !isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="bg-zinc-900 p-8 rounded-3xl max-w-md w-full shadow-2xl border border-zinc-800 space-y-6">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto text-indigo-400">
            <Maximize2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">เข้าสู่โหมดเต็มหน้าจอ</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              ระบบสอบออนไลน์กำหนดให้ทำข้อสอบในโหมดเต็มจอเพื่อป้องกันการสลับแท็บ กรุณาคลิกปุ่มด้านล่างเพื่อดำเนินการต่อ
            </p>
          </div>
          <button
            onClick={requestFullscreen}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            เปิดโหมดเต็มจอและทำข้อสอบ
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || {};
  const currentQAnswer = answers[currentQ.id];
  const isCurrentQFlagged = Boolean(flagged[currentQ.id]);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans select-none relative text-zinc-900 dark:text-zinc-100">
      {/* Background Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] select-none flex flex-wrap gap-16 p-8 items-center justify-center font-mono font-bold text-zinc-900 dark:text-white text-lg rotate-[-15deg]">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}>{studentSession.student_id} • SECURE EXAM SESSION</span>
        ))}
      </div>

      {/* Toast Alert */}
      {toastWarning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <AlertTriangle className="w-4 h-4" />
          <span>{toastWarning}</span>
        </div>
      )}

      {/* Teacher Announcement Modal */}
      {announcement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-indigo-200 dark:border-indigo-800 space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">ประกาศด่วนจากครูผู้คุมสอบ</h3>
                <p className="text-xs text-zinc-500">{announcement.teacherName || 'ครูผู้คุมสอบ'}</p>
              </div>
            </div>
            <div className="p-4 bg-indigo-50/50 dark:bg-zinc-800/60 rounded-2xl border border-indigo-100 dark:border-zinc-700 text-sm font-medium leading-relaxed">
              {announcement.message}
            </div>
            <button
              onClick={() => setAnnouncement(null)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              รับทราบ
            </button>
          </div>
        </div>
      )}

      {/* Suspended Modal on Strike 3 */}
      {isSuspended && strikeWarningModal && (
        <div className="fixed inset-0 z-[120] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4 text-center">
          <div className="bg-zinc-900 border border-rose-500/40 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">การสอบถูกระงับชั่วคราว</h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                {strikeWarningModal.message}
              </p>
            </div>
            <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/60 text-xs text-zinc-300 text-left space-y-1.5 font-mono">
              <div>รหัสนักเรียน: <span className="font-bold text-white">{studentSession.student_id}</span></div>
              <div>ห้องสอบ: <span className="font-bold text-white">{sessionInfo.title}</span></div>
              <div>สถานะ: <span className="text-rose-400 font-bold">รอครูผู้คุมสอบอนุมัติปลดล็อก</span></div>
            </div>
            <p className="text-xs text-zinc-500">
              ระบบส่งสัญญาณแจ้งเตือนไปยังหน้าจอครูผู้คุมสอบแล้ว เมื่อครูกดอนุมัติ หน้าจอนี้จะปลดล็อกอัตโนมัติ
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white h-9 px-3 flex items-center justify-center rounded-xl font-bold font-mono text-sm shadow-md shadow-indigo-600/20">
              {studentSession.student_id}
            </div>
            <div>
              <h1 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm truncate max-w-[150px] sm:max-w-xs">
                {sessionInfo.title}
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                ตอบแล้ว {answeredCount}/{questions.length} ข้อ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mobile Palette Toggle */}
            <button
              onClick={() => setIsPaletteDrawerOpen(true)}
              className="lg:hidden p-2 text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
              aria-label="เปิดแผงผังข้อสอบ"
            >
              <Menu className="w-4 h-4" />
              <span>ผังข้อ</span>
            </button>

            {!isMobile && (
              <button
                onClick={isFullscreen ? exitFullscreen : requestFullscreen}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800"
                title={isFullscreen ? 'ออกจากโหมดเต็มจอ' : 'เข้าสู่โหมดเต็มหน้าจอ'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}

            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm ${
              timeLeft !== null && timeLeft < 300
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse border border-rose-300'
                : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 py-6 flex gap-6 relative z-10">
        {/* Single Question Focus Workspace */}
        <section className="flex-1 flex flex-col justify-between space-y-6 max-w-3xl mx-auto">
          {/* Question Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* Top Bar of Card */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <span className="h-8 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold font-mono text-xs flex items-center justify-center">
                  ข้อที่ {currentIndex + 1} / {questions.length}
                </span>
                <span className="text-xs text-zinc-400 font-medium">({currentQ.points || 1} คะแนน)</span>
              </div>

              {/* Flag Toggle Button */}
              <button
                type="button"
                onClick={() => handleToggleFlag(currentQ.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isCurrentQFlagged
                    ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isCurrentQFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isCurrentQFlagged ? 'ปักธงไว้แล้ว' : 'ปักธงทบทวน'}</span>
              </button>
            </div>

            {/* Question Text with GIFT/HTML Image Support */}
            <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-relaxed whitespace-pre-wrap">
              <QuestionRenderer content={currentQ.question_text} />
            </div>

            {/* Image (if any, from image_url column, unless already in question_text) */}
            {currentQ.image_url && !currentQ.question_text?.includes(currentQ.image_url) && (
              <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 max-h-72 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <img src={currentQ.image_url} alt="Question Diagram" className="max-h-72 object-contain" />
              </div>
            )}

            {/* Choices with Inline Icon & Image Support */}
            <div className="space-y-3 pt-2">
              {(currentQ.choices || []).map((choice, cIdx) => {
                const choiceText = typeof choice === 'object' ? choice.text : String(choice);
                const isSelected = currentQAnswer === choiceText;

                return (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={() => handleSelectAnswer(currentQ.id, choiceText)}
                    className={`w-full p-4 rounded-2xl text-left text-sm sm:text-base transition-all duration-150 flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500/20 font-semibold'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold font-mono transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600'
                      }`}>
                        {String.fromCharCode(65 + cIdx)}
                      </span>
                      <span className="flex-1 min-w-0">
                        <QuestionRenderer content={choiceText} inline />
                      </span>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 stroke-[3] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ข้อก่อนหน้า</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <span>ข้อถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ตรวจทานและส่งข้อสอบ</span>
              </button>
            )}
          </div>
        </section>

        {/* Desktop Sidebar: Question Palette */}
        <aside className="hidden lg:block w-80 shrink-0 sticky top-22 h-[calc(100vh-7rem)]">
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            flagged={flagged}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
          />
        </aside>
      </main>

      {/* Mobile Bottom Sheet Drawer: Question Palette */}
      {isPaletteDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/60 backdrop-blur-xs lg:hidden animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-t-3xl p-4 shadow-2xl border-t border-zinc-200 dark:border-zinc-800">
            <QuestionPalette
              questions={questions}
              currentIndex={currentIndex}
              answers={answers}
              flagged={flagged}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
              isMobileDrawer={true}
              onCloseDrawer={() => setIsPaletteDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">ยืนยันการส่งข้อสอบ</h3>
              <p className="text-xs text-zinc-500">
                คุณตอบข้อสอบแล้ว {answeredCount} จากทั้งหมด {questions.length} ข้อ
              </p>
            </div>

            {questions.length - answeredCount > 0 && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>ยังมีข้อที่ยังไม่ได้ตอบ {questions.length - answeredCount} ข้อ ต้องการส่งทันทีหรือไม่?</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl text-sm transition-all cursor-pointer"
              >
                กลับไปตรวจทาน
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleSubmit(false)}
                className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? 'กำลังส่ง...' : 'ยืนยันส่งข้อสอบ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
