import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Play, 
  Users, 
  StopCircle, 
  RefreshCw, 
  Key, 
  Clock, 
  Trash2, 
  Pencil, 
  X, 
  Check, 
  AlertCircle, 
  UserMinus,
  Settings2,
  Plus,
  ShieldAlert,
  Lock,
  Timer,
  Hourglass,
  PlusCircle
} from 'lucide-react';
import QuestionPicker from './QuestionPicker';

export default function ExamControl() {
  const { user } = useAuth();
  const [banks, setBanks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live Timer & Quick Time Edit State
  const [activeTimeRemaining, setActiveTimeRemaining] = useState(null);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState('');

  // New Session Form
  const [examConfig, setExamConfig] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(60);
  const [isCreating, setIsCreating] = useState(false);

  // Edit Session Modal
  const [editingSession, setEditingSession] = useState(null);
  const [editSessionTitle, setEditSessionTitle] = useState('');
  const [editTimeLimit, setEditTimeLimit] = useState(60);
  const [editSecretCode, setEditSecretCode] = useState('');
  const [editStatus, setEditStatus] = useState('waiting');
  const [updatingSession, setUpdatingSession] = useState(false);

  // Action Modals
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [startingExam, setStartingExam] = useState(false);

  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [endingExam, setEndingExam] = useState(false);

  const [deletingSession, setDeletingSession] = useState(null);
  const [deletingSessionLoading, setDeletingSessionLoading] = useState(false);

  const [deletingParticipant, setDeletingParticipant] = useState(null);
  const [deletingParticipantLoading, setDeletingParticipantLoading] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    let subscription = null;
    if (activeSession) {
      fetchParticipants(activeSession.id);
      
      subscription = supabase
        .channel(`exam_room_${activeSession.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${activeSession.id}` },
          () => {
            fetchParticipants(activeSession.id);
          }
        )
        .subscribe();
    } else {
      setParticipants([]);
    }

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [activeSession]);

  // Live Timer Interval for Active Session
  useEffect(() => {
    if (!activeSession || activeSession.status !== 'active' || !activeSession.started_at) {
      setActiveTimeRemaining(null);
      return;
    }

    const calcRemaining = () => {
      const startTime = new Date(activeSession.started_at).getTime();
      const now = Date.now();
      const timeLimitMs = (activeSession.time_limit_minutes || 60) * 60 * 1000;
      const elapsed = now - startTime;
      return Math.max(0, Math.floor((timeLimitMs - elapsed) / 1000));
    };

    setActiveTimeRemaining(calcRemaining());

    const interval = setInterval(() => {
      setActiveTimeRemaining(calcRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession?.started_at, activeSession?.time_limit_minutes, activeSession?.status]);

  const formatSeconds = (sec) => {
    if (sec === null || sec === undefined) return '--:--';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Quick Extend Time (+5, +10, +15 minutes)
  const handleExtendTime = async (extraMinutes) => {
    if (!activeSession) return;
    try {
      const currentLimit = Number(activeSession.time_limit_minutes || 60);
      const newMinutes = currentLimit + Number(extraMinutes);
      
      const { error } = await supabase
        .from('exam_sessions')
        .update({ time_limit_minutes: newMinutes })
        .eq('id', activeSession.id);

      if (error) throw error;

      showToast('success', `เพิ่มเวลาสอบ +${extraMinutes} นาที สำเร็จ! (เวลารวม ${newMinutes} นาที)`);
      setActiveSession(prev => ({ ...prev, time_limit_minutes: newMinutes }));
      fetchSessions();
    } catch (err) {
      showToast('error', 'เพิ่มเวลาไม่สำเร็จ: ' + err.message);
    }
  };

  // Custom Time Set
  const handleSetCustomTime = async (e) => {
    e.preventDefault();
    if (!activeSession || !customTimeInput) return;
    const val = parseInt(customTimeInput, 10);
    if (isNaN(val) || val <= 0) {
      showToast('error', 'กรุณาระบุจำนวนนาทีที่ถูกต้อง');
      return;
    }

    try {
      const { error } = await supabase
        .from('exam_sessions')
        .update({ time_limit_minutes: val })
        .eq('id', activeSession.id);

      if (error) throw error;

      showToast('success', `ปรับเวลาสอบเป็น ${val} นาที เรียบร้อยแล้ว`);
      setActiveSession(prev => ({ ...prev, time_limit_minutes: val }));
      setIsTimeModalOpen(false);
      fetchSessions();
    } catch (err) {
      showToast('error', 'ปรับเวลาไม่สำเร็จ: ' + err.message);
    }
  };

  const fetchInitialData = async () => {
    setLoading(true);
    const { data: bData } = await supabase.from('question_banks').select('*');
    if (bData) setBanks(bData);

    await fetchSessions();
    setLoading(false);
  };

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('exam_sessions')
      .select('*, question_banks(title)')
      .order('created_at', { ascending: false });
    if (data) {
      setSessions(data);
      if (activeSession) {
        const updated = data.find(s => s.id === activeSession.id);
        if (updated) setActiveSession(updated);
      }
    }
  };

  const fetchParticipants = async (sessionId) => {
    const { data } = await supabase
      .from('exam_participants')
      .select('*, students(first_name, last_name, classroom)')
      .eq('session_id', sessionId)
      .order('joined_at', { ascending: true });
    if (data) setParticipants(data);
  };

  const generateSecretCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // 1. Create Session
  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (isCreating) return;
    
    if (!examConfig) {
      showToast('error', 'กรุณาตั้งค่าชุดข้อสอบก่อนเปิดห้องสอบ');
      return;
    }

    setIsCreating(true);
    const secretCode = generateSecretCode();
    
    try {
      const { data: sessionData, error: sessionError } = await supabase.from('exam_sessions').insert([{
        bank_id: banks.length > 0 ? banks[0].id : null,
        created_by: user?.id,
        teacher_id: user?.id,
        title: sessionTitle.trim(),
        secret_code: secretCode,
        time_limit_minutes: timeLimit,
        question_count: examConfig.questionCount || examConfig.questions.length,
        total_score: examConfig.totalScore,
        status: 'waiting'
      }]).select().single();

      if (sessionError) throw sessionError;

      const toInsert = examConfig.questions.map((q, idx) => ({
        session_id: sessionData.id,
        question_id: q.id,
        points: q.points,
        order_index: idx
      }));

      const { error: questionsError } = await supabase.from('exam_session_questions').insert(toInsert);
      if (questionsError) throw questionsError;

      showToast('success', `เปิดห้องสอบ "${sessionTitle}" สำเร็จ! รหัสห้องคือ ${secretCode}`);
      setSessionTitle('');
      setIsPickerOpen(false);
      setExamConfig(null);
      await fetchSessions();
      setActiveSession(sessionData);
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาด: ' + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // 2. Edit Session
  const handleOpenEditSession = (session) => {
    setEditingSession(session);
    setEditSessionTitle(session.title || '');
    setEditTimeLimit(session.time_limit_minutes || 60);
    setEditSecretCode(session.secret_code || '');
    setEditStatus(session.status || 'waiting');
  };

  const handleUpdateSession = async (e) => {
    e.preventDefault();
    if (!editingSession) return;

    setUpdatingSession(true);
    try {
      const { error } = await supabase
        .from('exam_sessions')
        .update({
          title: editSessionTitle.trim(),
          time_limit_minutes: parseInt(editTimeLimit, 10),
          secret_code: editSecretCode.trim().toUpperCase(),
          status: editStatus
        })
        .eq('id', editingSession.id);

      if (error) throw error;

      showToast('success', 'บันทึกการแก้ไขห้องสอบสำเร็จ!');
      setEditingSession(null);
      fetchSessions();
    } catch (err) {
      showToast('error', 'แก้ไขไม่สำเร็จ: ' + err.message);
    } finally {
      setUpdatingSession(false);
    }
  };

  // 3. Start Exam (Modal Confirmed)
  const handleConfirmStartExam = async () => {
    if (!activeSession) return;
    setStartingExam(true);
    try {
      const startTime = new Date();
      const { error } = await supabase
        .from('exam_sessions')
        .update({ status: 'active', started_at: startTime })
        .eq('id', activeSession.id);

      if (error) throw error;

      showToast('success', 'เริ่มการสอบแล้ว! นักเรียนสามารถเข้าทำข้อสอบได้จนกว่าจะหมดเวลา');
      setIsStartModalOpen(false);
      fetchSessions();
      setActiveSession({ ...activeSession, status: 'active', started_at: startTime });
    } catch (err) {
      showToast('error', 'เริ่มสอบไม่สำเร็จ: ' + err.message);
    } finally {
      setStartingExam(false);
    }
  };

  // 4. End Exam (Modal Confirmed)
  const handleConfirmEndExam = async () => {
    if (!activeSession) return;
    setEndingExam(true);
    try {
      const endTime = new Date();
      const { error } = await supabase
        .from('exam_sessions')
        .update({ status: 'completed', end_time: endTime })
        .eq('id', activeSession.id);

      if (error) throw error;

      showToast('success', 'จบการสอบเรียบร้อยแล้ว! ระบบปิดรับคำตอบและห้ามเข้าห้องสอบทุกกรณี');
      setIsEndModalOpen(false);
      fetchSessions();
      setActiveSession({ ...activeSession, status: 'completed', end_time: endTime });
    } catch (err) {
      showToast('error', 'จบการสอบไม่สำเร็จ: ' + err.message);
    } finally {
      setEndingExam(false);
    }
  };

  // 5. Delete Session
  const handleConfirmDeleteSession = async () => {
    if (!deletingSession) return;
    setDeletingSessionLoading(true);

    try {
      const { error } = await supabase
        .from('exam_sessions')
        .delete()
        .eq('id', deletingSession.id);

      if (error) throw error;

      showToast('success', `ลบห้องสอบ "${deletingSession.title}" เรียบร้อยแล้ว`);
      if (activeSession?.id === deletingSession.id) {
        setActiveSession(null);
      }
      setDeletingSession(null);
      fetchSessions();
    } catch (err) {
      showToast('error', 'ลบห้องสอบไม่สำเร็จ: ' + err.message);
    } finally {
      setDeletingSessionLoading(false);
    }
  };

  // 6. Manage Participant
  const handleAllowRejoin = async (participantId) => {
    try {
      const { error } = await supabase
        .from('exam_participants')
        .update({ allow_rejoin: true, status: 'waiting' })
        .eq('id', participantId);
      if (error) throw error;
      showToast('success', 'อนุมัติให้นักเรียนเข้าสอบใหม่เรียบร้อยแล้ว');
      fetchParticipants(activeSession.id);
    } catch (err) {
      showToast('error', 'ทำรายการไม่สำเร็จ: ' + err.message);
    }
  };

  const handleAllowAllRejoin = async () => {
    const flagged = participants.filter(p => p.status === 'cheating' || p.status === 'disconnected');
    if (flagged.length === 0) return;
    try {
      for (const p of flagged) {
        await supabase
          .from('exam_participants')
          .update({ allow_rejoin: true, status: 'waiting' })
          .eq('id', p.id);
      }
      showToast('success', `อนุมัติให้นักเรียน ${flagged.length} คนเข้าสอบใหม่เรียบร้อยแล้ว`);
      fetchParticipants(activeSession.id);
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาด: ' + err.message);
    }
  };

  const handleConfirmDeleteParticipant = async () => {
    if (!deletingParticipant || !activeSession) return;
    setDeletingParticipantLoading(true);
    try {
      const { error } = await supabase
        .from('exam_participants')
        .delete()
        .eq('id', deletingParticipant.id);

      if (error) throw error;

      showToast('success', 'ลบนักเรียนออกจากห้องสอบแล้ว');
      setDeletingParticipant(null);
      fetchParticipants(activeSession.id);
    } catch (err) {
      showToast('error', 'ลบไม่สำเร็จ: ' + err.message);
    } finally {
      setDeletingParticipantLoading(false);
    }
  };

  // Cheating / Disconnected alert count
  const flaggedParticipants = participants.filter(p => p.status === 'cheating' || p.status === 'disconnected');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-900/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/20' 
            : 'bg-rose-900/90 border-rose-500/40 text-rose-100 shadow-rose-950/20'
        }`}>
          {toast.type === 'success' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-emerald-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              แผงควบคุมการสอบ (Exam Control)
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              สร้างห้องสอบ คุมสอบสด ปลดล็อกนักเรียน และปิดรับการสอบอัตโนมัติ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchSessions(); if (activeSession) fetchParticipants(activeSession.id); }}
            disabled={loading}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all border border-zinc-200 cursor-pointer"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Create & List Sessions */}
        <div className="space-y-6 lg:col-span-1">
          {/* Create Session Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-200/80">
            <h2 className="text-base font-bold text-zinc-900 mb-3.5 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" /> เปิดห้องสอบใหม่
            </h2>
            <form onSubmit={handleCreateSession} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-600 mb-1">ชื่อการสอบ *</label>
                <input 
                  required 
                  value={sessionTitle} 
                  onChange={e => setSessionTitle(e.target.value)} 
                  type="text" 
                  placeholder="เช่น สอบกลางภาค วิทยาการคำนวณ" 
                  className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs" 
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-600 mb-1">ชุดข้อสอบ *</label>
                <div className="border border-zinc-200 rounded-xl p-3 bg-zinc-50 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <div className="text-xs font-bold text-zinc-800">
                      {examConfig ? examConfig.summaryText : 'ยังไม่ได้เลือกข้อสอบ'}
                    </div>
                    {examConfig && (
                      <div className="text-[11px] text-zinc-500">
                        {examConfig.questions.length} ข้อ ({examConfig.totalScore} คะแนน)
                      </div>
                    )}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsPickerOpen(true)}
                    className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors shrink-0 cursor-pointer"
                  >
                    {examConfig ? 'เปลี่ยนชุด' : 'เลือกข้อสอบ'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-600 mb-1">เวลาสอบ (นาที) *</label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                  <input 
                    required 
                    value={timeLimit} 
                    onChange={e => setTimeLimit(e.target.value)} 
                    type="number" 
                    min="1" 
                    className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isCreating} 
                className="w-full mt-2 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20 cursor-pointer text-xs"
              >
                {isCreating ? 'กำลังสร้างห้องสอบ...' : 'เปิดห้องสอบ'}
              </button>
            </form>
          </div>

          {/* Session List Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-200/80">
            <h2 className="text-base font-bold text-zinc-900 mb-3">รายการห้องสอบ</h2>
            <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
              {sessions.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => setActiveSession(s)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all group ${
                    activeSession?.id === s.id 
                    ? 'bg-indigo-50/80 border-indigo-500 shadow-xs' 
                    : 'hover:bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-bold text-xs text-zinc-900 truncate pr-2">{s.title}</div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenEditSession(s); }}
                        className="p-1 text-zinc-400 hover:text-indigo-600 rounded cursor-pointer"
                        title="แก้ไขห้องสอบ"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setDeletingSession(s); }}
                        className="p-1 text-zinc-400 hover:text-rose-600 rounded cursor-pointer"
                        title="ลบห้องสอบ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-medium mt-2">
                    <span className="bg-zinc-100 px-2 py-0.5 rounded text-zinc-700 font-mono tracking-wider font-bold">
                      {s.secret_code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      s.status === 'waiting' ? 'bg-amber-100 text-amber-700' : 
                      s.status === 'active' ? 'bg-emerald-100 text-emerald-700 animate-pulse' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {s.status === 'completed' && <Lock className="w-3 h-3" />}
                      {s.status === 'waiting' ? 'รอสอบ' : s.status === 'active' ? 'กำลังสอบ' : 'เสร็จสิ้น (ปิดรับ)'}
                    </span>
                  </div>
                </div>
              ))}

              {sessions.length === 0 && !loading && (
                <div className="p-6 text-center text-xs text-zinc-400">ยังไม่มีห้องสอบ</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Session Control */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 lg:col-span-2 flex flex-col h-[calc(100vh-12rem)] overflow-hidden">
          {!activeSession ? (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 p-8 text-center">
              <Users className="w-16 h-16 mb-4 text-zinc-200" />
              <p className="text-base font-bold text-zinc-700">เลือกห้องสอบจากรายการด้านซ้าย</p>
              <p className="text-xs text-zinc-500 mt-1">เพื่อดูรายชื่อนักเรียน สั่งเริ่ม/จบการสอบ และจัดการห้องสอบ</p>
            </div>
          ) : (
            <>
              {/* Incident Alert Banner (if any cheating/disconnected) */}
              {flaggedParticipants.length > 0 && (
                <div className="bg-rose-50 border-b border-rose-200 p-3 px-5 flex items-center justify-between gap-3 animate-pulse">
                  <div className="flex items-center gap-2.5 text-rose-800 text-xs font-bold">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>แจ้งเตือน: พบนักเรียนออกจากหน้าจอสอบ หรือขาดการเชื่อมต่อ {flaggedParticipants.length} คน!</span>
                  </div>
                  <button
                    onClick={handleAllowAllRejoin}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold shadow-xs cursor-pointer"
                  >
                    อนุมัติเข้าใหม่ทั้งหมด ({flaggedParticipants.length})
                  </button>
                </div>
              )}

              {/* Control Header */}
              <div className="p-5 border-b border-zinc-100 bg-zinc-50/50 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-zinc-900">{activeSession.title}</h2>
                    <button
                      onClick={() => handleOpenEditSession(activeSession)}
                      className="p-1 text-zinc-400 hover:text-indigo-600 rounded cursor-pointer"
                      title="แก้ไขข้อมูลห้องสอบ"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-lg">
                      <Key className="w-3.5 h-3.5" /> รหัสห้อง: <span className="font-mono text-sm tracking-widest">{activeSession.secret_code}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Clock className="w-3.5 h-3.5" /> {activeSession.time_limit_minutes} นาที
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      activeSession.status === 'waiting' ? 'bg-amber-100 text-amber-800' :
                      activeSession.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {activeSession.status === 'completed' && <Lock className="w-3 h-3" />}
                      {activeSession.status === 'waiting' ? 'รอเริ่มสอบ' : activeSession.status === 'active' ? 'กำลังสอบอยู่' : 'จบการสอบแล้ว (ห้ามเข้า)'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setDeletingSession(activeSession)} 
                    className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer"
                    title="ลบห้องสอบนี้"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {activeSession.status === 'waiting' && (
                    <button 
                      onClick={() => setIsStartModalOpen(true)} 
                      className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4" /> เริ่มสอบทันที
                    </button>
                  )}
                  {activeSession.status === 'active' && (
                    <button 
                      onClick={() => setIsEndModalOpen(true)} 
                      className="flex items-center gap-1.5 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                    >
                      <StopCircle className="w-4 h-4" /> จบการสอบ
                    </button>
                  )}
                  {activeSession.status === 'completed' && (
                    <div className="flex items-center gap-1.5 bg-zinc-100 text-zinc-700 border border-zinc-300 px-3.5 py-2 rounded-xl text-xs font-bold">
                      <Lock className="w-3.5 h-3.5 text-zinc-600" /> ห้องสอบปิดแล้ว
                    </div>
                  )}
                </div>
              </div>

              {/* ⏱️ LIVE COUNTDOWN TIMER & REAL-TIME TIME CONTROL BAR */}
              {activeSession.status === 'active' && (
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 border-b border-indigo-900/60 flex flex-wrap items-center justify-between gap-4 shadow-inner">
                  {/* Left: Live Countdown Clock */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-md ${
                      activeTimeRemaining !== null && activeTimeRemaining < 300 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' 
                        : 'bg-indigo-500/20 text-cyan-300 border border-indigo-500/30'
                    }`}>
                      <Timer className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-400 font-semibold">เวลาสอบที่เหลืออยู่ (Realtime Countdown)</p>
                      <div className="flex items-center gap-2.5 mt-0.5">
                        <span className={`text-2xl font-black font-mono tracking-tight ${
                          activeTimeRemaining !== null && activeTimeRemaining < 300 ? 'text-rose-400 animate-pulse' : 'text-white'
                        }`}>
                          {formatSeconds(activeTimeRemaining)}
                        </span>
                        {activeTimeRemaining === 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                            หมดเวลาแล้ว
                          </span>
                        )}
                        <span className="text-xs text-zinc-400 font-medium">
                          (ตั้งไว้ {activeSession.time_limit_minutes} นาที)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick Time Add & Custom Adjust Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-zinc-300 font-semibold mr-1 flex items-center gap-1">
                      <Hourglass className="w-3.5 h-3.5 text-amber-400" /> เพิ่มเวลา:
                    </span>
                    <button
                      onClick={() => handleExtendTime(5)}
                      className="px-3 py-1.5 bg-indigo-600/70 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold border border-indigo-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                      title="เพิ่มเวลาอีก 5 นาที"
                    >
                      +5 นาที
                    </button>
                    <button
                      onClick={() => handleExtendTime(10)}
                      className="px-3 py-1.5 bg-indigo-600/70 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold border border-indigo-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                      title="เพิ่มเวลาอีก 10 นาที"
                    >
                      +10 นาที
                    </button>
                    <button
                      onClick={() => handleExtendTime(15)}
                      className="px-3 py-1.5 bg-indigo-600/70 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold border border-indigo-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                      title="เพิ่มเวลาอีก 15 นาที"
                    >
                      +15 นาที
                    </button>
                    <button
                      onClick={() => {
                        setCustomTimeInput(activeSession.time_limit_minutes || 60);
                        setIsTimeModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-cyan-300 rounded-xl text-xs font-bold border border-cyan-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs"
                      title="กำหนดเวลาสอบใหม่ตามต้องการ"
                    >
                      <Pencil className="w-3.5 h-3.5" /> ปรับเวลา
                    </button>
                  </div>
                </div>
              )}

              {/* Lobby Header */}
              <div className="p-3.5 border-b border-zinc-100 bg-white flex justify-between items-center text-xs">
                <h3 className="font-bold text-zinc-800 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  นักเรียนในห้องสอบ: {participants.length} คน
                </h3>
                <button 
                  onClick={() => fetchParticipants(activeSession.id)} 
                  className="text-xs text-indigo-600 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> รีเฟรชรายชื่อ
                </button>
              </div>

              {/* Participants Grid */}
              <div className="flex-1 overflow-auto p-4 bg-zinc-50/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {participants.map(p => {
                    const isFlagged = p.status === 'cheating' || p.status === 'disconnected';
                    return (
                      <div 
                        key={p.id} 
                        className={`bg-white p-3 rounded-xl border shadow-xs flex flex-col justify-between gap-2 relative group transition-all ${
                          isFlagged ? 'border-rose-300 ring-2 ring-rose-100 bg-rose-50/20' : 'border-zinc-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-xs text-zinc-900">{p.students?.first_name} {p.students?.last_name}</div>
                            <div className="text-[11px] text-zinc-500 font-mono">{p.student_id} | {p.students?.classroom}</div>
                          </div>
                          <button
                            onClick={() => setDeletingParticipant(p)}
                            className="p-1 text-zinc-400 hover:text-rose-600 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="เตะ/ลบออกจากห้องสอบ"
                          >
                            <UserMinus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            p.status === 'waiting' ? 'bg-amber-100 text-amber-700' :
                            p.status === 'testing' ? 'bg-indigo-100 text-indigo-700' :
                            p.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              p.status === 'testing' ? 'bg-indigo-500 animate-pulse' : 'bg-current'
                            }`} />
                            {p.status.toUpperCase()}
                          </span>

                          {isFlagged && (
                            <button 
                              onClick={() => handleAllowRejoin(p.id)}
                              className="text-[11px] bg-rose-600 text-white px-2 py-0.5 rounded-lg hover:bg-rose-700 font-semibold cursor-pointer shadow-xs"
                            >
                              อนุมัติเข้าใหม่
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {participants.length === 0 && (
                    <div className="col-span-full py-16 text-center text-zinc-400">
                      <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                      <p className="text-xs">ยังไม่มีนักเรียนเข้าร่วมห้องสอบนี้</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* START EXAM CONFIRMATION MODAL */}
      {isStartModalOpen && activeSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl w-fit">
              <Play className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันการเริ่มสอบทันที?</h3>
              <div className="text-xs text-zinc-600 mt-2 space-y-1.5 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                <p>• นักเรียนทุกคนในห้องรอสอบจะเข้าสู่หน้าทำข้อสอบทันที</p>
                <p>• ระบบจะเริ่มนับเวลาถอยหลัง <strong>{activeSession.time_limit_minutes} นาที</strong></p>
                <p className="text-emerald-700 font-semibold">• นักเรียนที่เข้ามาช้าสามารถล็อกอินเข้าร่วมทำข้อสอบได้ทันทีจนกว่าจะหมดเวลา</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setIsStartModalOpen(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={startingExam} onClick={handleConfirmStartExam} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20">
                {startingExam ? 'กำลังเริ่ม...' : 'ยืนยันเริ่มการสอบ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* END EXAM CONFIRMATION MODAL */}
      {isEndModalOpen && activeSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <StopCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันจบการสอบและปิดห้องสอบ?</h3>
              <div className="text-xs text-zinc-600 mt-2 space-y-1.5 leading-relaxed bg-rose-50 p-3 rounded-xl border border-rose-200">
                <p>• นักเรียนทุกคนจะถูกบังคับส่งคำตอบทันที</p>
                <p>• ระบบจะปิดห้องสอบ และ<strong>ห้ามไม่ให้ใครเข้าห้องสอบนี้อีก</strong></p>
                <p>• คุณสามารถดูผลคะแนนสอบได้ที่หน้า "ผลคะแนนสอบ"</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setIsEndModalOpen(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={endingExam} onClick={handleConfirmEndExam} className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-600/20">
                {endingExam ? 'กำลังจบการสอบ...' : 'ยืนยันจบการสอบ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SESSION MODAL */}
      {editingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-indigo-600" /> แก้ไขข้อมูลห้องสอบ
              </h3>
              <button onClick={() => setEditingSession(null)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateSession} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">ชื่อการสอบ *</label>
                <input
                  required
                  value={editSessionTitle}
                  onChange={e => setEditSessionTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-zinc-200 rounded-xl focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">เวลาสอบ (นาที)</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={editTimeLimit}
                    onChange={e => setEditTimeLimit(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-zinc-200 rounded-xl focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">รหัสลับห้องสอบ</label>
                  <input
                    required
                    maxLength={10}
                    value={editSecretCode}
                    onChange={e => setEditSecretCode(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-mono font-bold uppercase border border-zinc-200 rounded-xl focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">สถานะห้องสอบ</label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-zinc-200 rounded-xl focus:border-indigo-500"
                >
                  <option value="waiting">รอสอบ (Waiting - นักเรียนเข้าห้องรอได้)</option>
                  <option value="active">กำลังสอบ (Active - นักเรียนเข้าสอบได้ตามเวลาที่เหลือ)</option>
                  <option value="completed">เสร็จสิ้น (Completed - ปิดห้องถาวร)</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setEditingSession(null)} className="flex-1 py-2.5 border rounded-xl font-semibold">ยกเลิก</button>
                <button disabled={updatingSession} type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                  {updatingSession ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE SESSION MODAL */}
      {deletingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันลบห้องสอบ?</h3>
              <p className="text-xs text-zinc-600 mt-1">
                คุณต้องการลบห้องสอบ "<strong>{deletingSession.title}</strong>" พร้อมข้อมูลการสอบและนักเรียนในห้องสอบนี้หรือไม่?
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setDeletingSession(null)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={deletingSessionLoading} onClick={handleConfirmDeleteSession} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">
                {deletingSessionLoading ? 'กำลังลบ...' : 'ยืนยันการลบ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE PARTICIPANT MODAL */}
      {deletingParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <UserMinus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันลบนักเรียนออกจากห้องสอบ?</h3>
              <p className="text-xs text-zinc-600 mt-1">
                คุณต้องการลบ <strong>{deletingParticipant.students?.first_name} {deletingParticipant.students?.last_name}</strong> (รหัส {deletingParticipant.student_id}) ออกจากห้องสอบนี้หรือไม่?
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setDeletingParticipant(null)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={deletingParticipantLoading} onClick={handleConfirmDeleteParticipant} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">
                {deletingParticipantLoading ? 'กำลังลบ...' : 'ยืนยันลบ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM TIME ADJUSTMENT MODAL */}
      {isTimeModalOpen && activeSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" /> ปรับเวลาสอบใหม่
              </h3>
              <button onClick={() => setIsTimeModalOpen(false)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSetCustomTime} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1.5">
                  ระบุเวลาสอบทั้งหมด (นาที)
                </label>
                <div className="relative">
                  <input
                    required
                    type="number"
                    min="1"
                    value={customTimeInput}
                    onChange={e => setCustomTimeInput(e.target.value)}
                    placeholder="เช่น 45, 60, 90"
                    className="w-full pl-4 pr-12 py-2.5 text-sm font-bold font-mono border border-zinc-200 rounded-xl focus:border-indigo-500 outline-none"
                  />
                  <span className="absolute right-3.5 top-3 text-xs text-zinc-400 font-semibold">
                    นาที
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  * เวลาสอบจะถูกอัปเดตไปยังหน้าจอของนักเรียนทุกคนในห้องสอบแบบ Realtime ทันที
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <button 
                  type="button" 
                  onClick={() => setIsTimeModalOpen(false)} 
                  className="flex-1 py-2.5 border rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  บันทึกเวลา
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modals */}
      {isPickerOpen && (
        <QuestionPicker 
          banks={banks} 
          onClose={() => setIsPickerOpen(false)} 
          onSave={(config) => {
            setExamConfig(config);
            setIsPickerOpen(false);
          }} 
        />
      )}
    </div>
  );
}
