import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, Home, RotateCcw, CheckCircle2, Clock, PlayCircle, Loader2, Sparkles } from 'lucide-react';

export default function ExamResult() {
  const { sessionId } = useParams();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    if (!studentSession || studentSession.session_id !== sessionId) {
      navigate('/', { replace: true });
      return;
    }
    fetchData();

    // Intercept browser Back button: redirect to home page '/' instead of exam room
    window.history.pushState(null, '', window.location.href);
    const handlePopState = async () => {
      await logoutStudent();
      navigate('/', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);

    // Subscribe to real-time changes on exam_participants
    const channel = supabase
      .channel(`exam_result_participant_${sessionId}_${studentSession.student_id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'exam_participants',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          if (payload.new && payload.new.student_id === studentSession.student_id) {
            setParticipant(payload.new);
            if (payload.new.allow_rejoin) {
              setToastMsg({ type: 'success', text: '🎉 คุณครูอนุมัติให้สอบซ่อมแล้ว! คุณสามารถกดเริ่มสอบซ่อมได้ทันที' });
            }
          }
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      supabase.removeChannel(channel);
    };
  }, [sessionId, studentSession, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch exam results
      const { data: resData } = await supabase
        .from('exam_results')
        .select('*, exam_sessions(title, total_score, question_count, exam_mode, max_attempts, retake_until_pass, passing_percentage)')
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id)
        .order('submitted_at', { ascending: true });
        
      if (resData && resData.length > 0) {
        setResults(resData);
      }

      // 2. Fetch participant status for retake info
      const { data: pData } = await supabase
        .from('exam_participants')
        .select('*')
        .eq('session_id', sessionId)
        .eq('student_id', studentSession.student_id)
        .maybeSingle();

      if (pData) {
        setParticipant(pData);
      }
    } catch (err) {
      console.error('Error loading result data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestRetake = async () => {
    if (!participant || requesting) return;
    setRequesting(true);
    try {
      const { error } = await supabase
        .from('exam_participants')
        .update({
          retake_requested: true,
          retake_requested_at: new Date().toISOString()
        })
        .eq('id', participant.id);

      if (error) throw error;

      setParticipant(prev => ({ ...prev, retake_requested: true }));
      setToastMsg({ type: 'info', text: '📩 ส่งคำขอสอบซ่อมไปยังคุณครูแล้ว กรุณารอครูอนุมัติสักครู่' });
    } catch (err) {
      alert('ส่งคำขอไม่สำเร็จ: ' + err.message);
    } finally {
      setRequesting(false);
    }
  };

  const handleStartRetake = async () => {
    if (!participant) return;
    try {
      const isOnline = results.length > 0 && results[0].exam_sessions?.exam_mode === 'online';
      const sessionData = results[0]?.exam_sessions;
      const existingParticipant = participant;
      const updatePayload = {
        status: isOnline ? 'testing' : (sessionData.status === 'active' ? 'testing' : 'waiting'),
        allow_rejoin: false,
        retake_requested: false,
        warnings_count: 0
      };
      
      if (isOnline) {
        updatePayload.started_at = new Date().toISOString();
      }

      await supabase
        .from('exam_participants')
        .update(updatePayload)
        .eq('id', participant.id);

      localStorage.setItem('student_id', studentSession.student_id);
      localStorage.setItem('exam_session_id', sessionId);
      navigate(`/exam-room/${sessionId}`);
    } catch (err) {
      alert('เข้าห้องสอบไม่สำเร็จ: ' + err.message);
    }
  };

  const handleFinish = async () => {
    await logoutStudent();
    navigate('/');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-medium text-zinc-500">กำลังโหลดผลสอบ...</div>;
  if (results.length === 0) return <div className="min-h-screen flex items-center justify-center font-medium text-zinc-500">ไม่พบข้อมูลคะแนนสอบ</div>;

  const latestResult = results[results.length - 1];
  const sessionInfo = latestResult?.exam_sessions || {};
  const passingPercentage = sessionInfo.passing_percentage || 50;

  // Filter out suspended results for score calculation
  const completedResults = results.filter(r => !r.is_suspended);
  const displayResults = completedResults.length > 0 ? completedResults : results;
  const latestCompleted = displayResults[displayResults.length - 1];

  const bestScore = Math.round(Math.max(...displayResults.map(r => Number(r.score))));
  const totalScore = Math.round(Number(sessionInfo.total_score || sessionInfo.question_count || latestCompleted.total_questions || 10));
  const currentScore = Math.round(Number(latestCompleted.score));
  const percentage = Math.round((currentScore / totalScore) * 100);
  const isPass = percentage >= passingPercentage;

  const isOnline = sessionInfo.exam_mode === 'online';
  const maxAttempts = sessionInfo.max_attempts || 1;
  const retakeUntilPass = sessionInfo.retake_until_pass === true;
  
  const bestPercentage = Math.round((bestScore / totalScore) * 100);
  const hasPassedOverall = bestPercentage >= passingPercentage;
  
  let hasAttemptsLeft = false;
  if (retakeUntilPass) {
    hasAttemptsLeft = !hasPassedOverall;
  } else if (isOnline) {
    hasAttemptsLeft = results.length < maxAttempts;
  }

  const isApprovedToRetake = participant?.allow_rejoin === true || hasAttemptsLeft;
  const isPendingRequest = participant?.retake_requested === true && !participant?.allow_rejoin && !hasAttemptsLeft;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className={`absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[130px] animate-pulse ${isPass ? 'bg-emerald-200/25' : 'bg-rose-200/25'}`} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-200/20 blur-[130px]" />
      
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[28px] shadow-2xl border border-white/60 p-7 text-center relative z-10 space-y-5">
        
        {/* Toast Alert Banner */}
        {toastMsg && (
          <div className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-bounce ${
            toastMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
          }`}>
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{toastMsg.text}</span>
          </div>
        )}

        <div className={`w-18 h-18 rounded-full flex items-center justify-center mx-auto shadow-lg transition-transform hover:scale-105 ${
          isPass ? 'bg-emerald-100 text-emerald-600 shadow-emerald-200/50' : 'bg-amber-100 text-amber-600 shadow-amber-200/50'
        }`}>
          <Trophy className="w-9 h-9" />
        </div>
        
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">ส่งข้อสอบสำเร็จ!</h1>
          <p className="text-xs text-zinc-500 mt-1 font-medium">{latestResult.exam_sessions?.title || 'ผลการสอบ'}</p>
          <p className="text-xs font-mono text-zinc-400 mt-0.5">รหัสนักเรียน: {studentSession.student_id}</p>
        </div>

        {/* Score Card */}
        <div className="bg-zinc-50/80 p-5 rounded-3xl border border-zinc-100 text-center">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
            {results.length > 1 ? `คะแนนรอบล่าสุด (รอบที่ ${results.length})` : 'คะแนนที่คุณได้'}
          </p>
          <div className="text-5xl font-black text-zinc-900 mb-2 font-mono tracking-tight">
            {currentScore} <span className="text-xl text-zinc-400 font-normal">/ {totalScore}</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
            isPass ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {isPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
            {isPass ? 'ผ่านเกณฑ์' : 'ไม่ผ่านเกณฑ์'} ({percentage}%)
          </div>
        </div>

        {/* Multi-Attempt History (If retaken) */}
        {results.length > 1 && (
          <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-2xl text-left space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-600" /> ประวัติการสอบ ({results.length} รอบ)
              </span>
              <span className="text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md text-[11px] font-bold">
                คะแนนล่าสุด: {currentScore}/{totalScore}
              </span>
            </div>

            <div className="divide-y divide-indigo-100/80 text-xs">
              {results.map((r, idx) => (
                <div key={r.id || idx} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-zinc-800">
                      รอบที่ {r.attempt_number || idx + 1}
                    </span>
                    {idx === 0 ? (
                      <span className="text-[10px] text-zinc-600 font-medium bg-zinc-100 px-1.5 py-0.5 rounded">
                        สอบรอบปกติ
                      </span>
                    ) : (
                      <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                        🎯 สอบซ่อม
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    {Math.round(Number(r.score))} / {totalScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⏱️ ข้อมูลเวลาสอบ */}
        {latestCompleted.started_at && (
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <div className="flex justify-between text-[11px] text-zinc-600">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> เริ่มสอบ</span>
              <span className="font-mono">{new Date(latestCompleted.started_at).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'medium' })}</span>
            </div>
            <div className="flex justify-between text-[11px] text-zinc-600">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> ส่งข้อสอบ</span>
              <span className="font-mono">{new Date(latestCompleted.submitted_at).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'medium' })}</span>
            </div>
            <div className="flex justify-between text-[11px] text-zinc-700 font-bold border-t border-zinc-200 pt-1.5">
              <span>⏱️ เวลาที่ใช้สอบ</span>
              <span className="font-mono">{(() => {
                const startMs = new Date(latestCompleted.started_at).getTime();
                const endMs = new Date(latestCompleted.submitted_at).getTime();
                const diffSec = Math.floor((endMs - startMs) / 1000);
                const mins = Math.floor(diffSec / 60);
                const secs = diffSec % 60;
                return `${mins} นาที ${secs} วินาที`;
              })()}</span>
            </div>
          </div>
        )}

        {/* 🌟 Retake Section (ขอสอบซ่อม / สอบซ่อมได้) */}
        <div className="pt-1 space-y-2.5">
          {hasPassedOverall ? (
            /* ✅ ผ่านแล้ว — ไม่ต้องแสดงปุ่มสอบซ่อม */
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                คุณสอบผ่านเกณฑ์แล้ว! 🎉
              </div>
              <p className="text-xs text-emerald-600 mt-1">ยินดีด้วย ไม่ต้องสอบซ่อมแล้ว</p>
            </div>
          ) : isApprovedToRetake ? (
            /* Teacher Approved: Can Start Retake Immediately */
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                {retakeUntilPass && !hasPassedOverall
                  ? `คุณยังไม่ผ่านเกณฑ์ (ต้องการ ${passingPercentage}%) สอบซ่อมได้เลย!`
                  : hasAttemptsLeft 
                    ? 'คุณยังมีสิทธิ์สอบเหลืออยู่!' 
                    : 'คุณครูอนุมัติให้สอบซ่อมแล้ว!'}
              </div>
              <p className="text-xs text-emerald-600 font-medium">
                พร้อมแล้วกดปุ่มด้านล่างเพื่อเริ่มทำข้อสอบรอบใหม่ได้ทันที
              </p>
              <button
                onClick={handleStartRetake}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" /> เริ่มทำข้อสอบซ่อมรอบใหม่
              </button>
            </div>
          ) : isPendingRequest ? (
            /* Pending Approval: Waiting for Teacher */
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center gap-2.5 text-amber-800 text-xs font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
              <span>ส่งคำขอสอบซ่อมแล้ว กำลังรอคุณครูอนุมัติ...</span>
            </div>
          ) : (
            /* Request Retake Button */
            <button
              onClick={handleRequestRetake}
              disabled={requesting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-2xl font-bold text-xs hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {requesting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> กำลังส่งคำขอ...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 text-indigo-600" /> ขอสอบซ่อม (ส่งคำขอถึงครูผู้สอน)
                </>
              )}
            </button>
          )}

          <button 
            onClick={handleFinish} 
            className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-bold text-xs hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md cursor-pointer"
          >
            <Home className="w-4 h-4" /> กลับสู่หน้าหลัก
          </button>
        </div>

      </div>
    </div>
  );
}
