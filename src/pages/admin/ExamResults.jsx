import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Trophy, 
  Download, 
  Search, 
  FileSpreadsheet, 
  Trash2, 
  Pencil, 
  X, 
  Check, 
  AlertCircle, 
  RefreshCw,
  Plus,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Lock,
  UserCheck,
  UserX,
  TrendingUp,
  Percent
} from 'lucide-react';

export default function ExamResults() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [results, setResults] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Retake Policy State
  // Policies: 'best' | 'latest' | 'average' | 'capped' | 'scaled'
  const [retakePolicy, setRetakePolicy] = useState('best');
  const [capScore, setCapScore] = useState(5);
  const [customMaxScore, setCustomMaxScore] = useState(10);
  const [isRetakePanelOpen, setIsRetakePanelOpen] = useState(false);

  // Add/Record Score Modal
  const [isAddScoreOpen, setIsAddScoreOpen] = useState(false);
  const [newStudentId, setNewStudentId] = useState('');
  const [newScore, setNewScore] = useState('');
  const [savingScore, setSavingScore] = useState(false);

  // Edit Result Modal
  const [editingResult, setEditingResult] = useState(null);
  const [editScore, setEditScore] = useState('');
  const [updatingResult, setUpdatingResult] = useState(false);

  // Delete Result Modal
  const [deletingResult, setDeletingResult] = useState(null);
  const [deletingResultLoading, setDeletingResultLoading] = useState(false);

  // Delete Session Modal
  const [isDeleteSessionOpen, setIsDeleteSessionOpen] = useState(false);
  const [deletingSessionLoading, setDeletingSessionLoading] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchResultsAndParticipants(selectedSession.id);
      // Set sensible defaults based on session total score
      const defaultTotal = selectedSession.total_score || 10;
      setCapScore(Math.ceil(defaultTotal / 2));
      setCustomMaxScore(defaultTotal);

      // Realtime listener for participants and results
      const channel = supabase
        .channel(`admin_exam_results_${selectedSession.id}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${selectedSession.id}` }, () => {
          fetchResultsAndParticipants(selectedSession.id);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'exam_results', filter: `session_id=eq.${selectedSession.id}` }, () => {
          fetchResultsAndParticipants(selectedSession.id);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setResults([]);
      setParticipants([]);
    }
  }, [selectedSession]);

  const fetchSessions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('exam_sessions')
      .select('*, question_banks(title)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSessions(data);
      if (!selectedSession && data.length > 0) {
        setSelectedSession(data[0]);
      }
    } else if (error) {
      showToast('error', 'โหลดรายการสอบไม่สำเร็จ: ' + error.message);
    }
    setLoading(false);
  };

  const fetchResultsAndParticipants = async (sessionId) => {
    // 1. Fetch results
    const { data: rData, error: rErr } = await supabase
      .from('exam_results')
      .select(`
        *,
        students(first_name, last_name, classroom)
      `)
      .eq('session_id', sessionId)
      .order('submitted_at', { ascending: true });

    if (!rErr && rData) {
      setResults(rData);
    } else if (rErr) {
      showToast('error', 'โหลดคะแนนไม่สำเร็จ: ' + rErr.message);
    }

    // 2. Fetch participants
    const { data: pData } = await supabase
      .from('exam_participants')
      .select('id, student_id, status, allow_rejoin, retake_requested, retake_requested_at')
      .eq('session_id', sessionId);

    if (pData) {
      setParticipants(pData);
    }
  };

  // Group results by studentId for multi-attempt processing
  const studentMap = {};
  results.forEach(r => {
    if (!studentMap[r.student_id]) {
      studentMap[r.student_id] = {
        student_id: r.student_id,
        students: r.students,
        attempts: []
      };
    }
    studentMap[r.student_id].attempts.push(r);
  });

  const totalScoreVal = selectedSession?.total_score || 10;

  // Calculate final score according to selected retake policy
  const calculateStudentFinalScore = (attempts) => {
    if (!attempts || attempts.length === 0) return { finalScore: 0, effectiveTotal: totalScoreVal };

    const scores = attempts.map(a => Number(a.score));
    let finalScore = 0;
    let effectiveTotal = totalScoreVal;

    switch (retakePolicy) {
      case 'best':
        // คะแนนที่ดีที่สุดของทุกรอบที่สอบ
        finalScore = Math.max(...scores);
        break;

      case 'latest':
        // คะแนนครั้งล่าสุด
        finalScore = scores[scores.length - 1];
        break;

      case 'average':
        // ค่าเฉลี่ยทุกรอบ
        finalScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
        break;

      case 'capped': {
        // คะแนนที่ดีที่สุด แต่จำกัดเพดานไม่ให้เกิน capScore
        const best = Math.max(...scores);
        finalScore = Math.min(best, Number(capScore || totalScoreVal));
        break;
      }

      case 'scaled': {
        // กำหนดคะแนนเต็มใหม่ตามที่ครูกำหนด
        const best = Math.max(...scores);
        const newMax = Number(customMaxScore || totalScoreVal);
        finalScore = (best / totalScoreVal) * newMax;
        effectiveTotal = newMax;
        break;
      }

      default:
        finalScore = Math.max(...scores);
    }

    return {
      finalScore: Math.round(finalScore * 10) / 10,
      effectiveTotal
    };
  };

  // Build unified student list
  const studentList = Object.values(studentMap).map(s => {
    const { finalScore, effectiveTotal } = calculateStudentFinalScore(s.attempts);
    const participant = participants.find(p => p.student_id === s.student_id);
    const isRetakeAllowed = participant?.allow_rejoin === true;
    const isRetakeRequested = participant?.retake_requested === true;
    const isPass = (finalScore / effectiveTotal) >= 0.5;

    return {
      ...s,
      finalScore,
      effectiveTotal,
      isRetakeAllowed,
      isRetakeRequested,
      retakeRequestedAt: participant?.retake_requested_at,
      isPass,
      participantId: participant?.id,
      participantStatus: participant?.status
    };
  });

  // Retake Actions: Allow / Disallow
  const handleToggleRetake = async (studentId, currentAllowed) => {
    if (!selectedSession) return;
    try {
      const nextAllowed = !currentAllowed;
      const { error } = await supabase
        .from('exam_participants')
        .update({ 
          allow_rejoin: nextAllowed,
          status: nextAllowed ? 'waiting' : 'completed',
          retake_requested: false
        })
        .eq('session_id', selectedSession.id)
        .eq('student_id', studentId);

      if (error) throw error;

      showToast('success', nextAllowed ? `อนุมัติให้นักเรียน ${studentId} สอบซ่อมเรียบร้อยแล้ว` : `ปิดสิทธิ์สอบซ่อมของนักเรียน ${studentId}`);
      fetchResultsAndParticipants(selectedSession.id);
    } catch (err) {
      showToast('error', 'ทำรายการไม่สำเร็จ: ' + err.message);
    }
  };

  // Bulk Allow Retake for Failed Students (< 50%)
  const handleAllowRetakeAllFailed = async () => {
    if (!selectedSession) return;
    const failedStudents = studentList.filter(s => !s.isPass);
    if (failedStudents.length === 0) {
      showToast('success', 'ไม่มีนักเรียนที่สอบตก ทุกคนผ่านเกณฑ์ทั้งหมด');
      return;
    }

    try {
      for (const s of failedStudents) {
        await supabase
          .from('exam_participants')
          .update({ allow_rejoin: true, status: 'waiting' })
          .eq('session_id', selectedSession.id)
          .eq('student_id', s.student_id);
      }
      showToast('success', `อนุมัติสอบซ่อมให้นักเรียนที่ไม่ผ่านเกณฑ์ทั้ง ${failedStudents.length} คนสำเร็จ!`);
      fetchResultsAndParticipants(selectedSession.id);
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาด: ' + err.message);
    }
  };

  // 1. Add / Record Manual Score
  const handleAddManualScore = async (e) => {
    e.preventDefault();
    if (!selectedSession || !newStudentId.trim() || newScore === '') return;

    setSavingScore(true);
    try {
      const { data: student, error: sErr } = await supabase
        .from('students')
        .select('student_id')
        .eq('student_id', newStudentId.trim())
        .single();

      if (sErr || !student) {
        throw new Error('ไม่พบรหัสนักเรียนนี้ในระบบ');
      }

      const totalQ = selectedSession.total_score || 10;
      const parsedScore = parseFloat(newScore);

      const { error } = await supabase.from('exam_results').insert([{
        session_id: selectedSession.id,
        student_id: newStudentId.trim(),
        score: parsedScore,
        total_questions: totalQ,
        submitted_at: new Date()
      }]);

      if (error) throw error;

      showToast('success', `บันทึกคะแนนของรหัส ${newStudentId} สำเร็จ!`);
      setNewStudentId('');
      setNewScore('');
      setIsAddScoreOpen(false);
      fetchResultsAndParticipants(selectedSession.id);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSavingScore(false);
    }
  };

  // 2. Edit Individual Score
  const handleOpenEditResult = (r) => {
    setEditingResult(r);
    setEditScore(r.score);
  };

  const handleUpdateResult = async (e) => {
    e.preventDefault();
    if (!editingResult || editScore === '') return;

    setUpdatingResult(true);
    try {
      const { error } = await supabase
        .from('exam_results')
        .update({
          score: parseFloat(editScore)
        })
        .eq('id', editingResult.id);

      if (error) throw error;

      showToast('success', 'แก้ไขคะแนนเรียบร้อยแล้ว!');
      setEditingResult(null);
      fetchResultsAndParticipants(selectedSession.id);
    } catch (err) {
      showToast('error', 'แก้ไขไม่สำเร็จ: ' + err.message);
    } finally {
      setUpdatingResult(false);
    }
  };

  // 3. Delete Individual Result
  const handleConfirmDeleteResult = async () => {
    if (!deletingResult || !selectedSession) return;
    setDeletingResultLoading(true);

    try {
      const { error } = await supabase
        .from('exam_results')
        .delete()
        .eq('id', deletingResult.id);

      if (error) throw error;

      showToast('success', 'ลบข้อมูลคะแนนของนักเรียนสำเร็จ');
      setDeletingResult(null);
      fetchResultsAndParticipants(selectedSession.id);
    } catch (err) {
      showToast('error', 'ลบไม่สำเร็จ: ' + err.message);
    } finally {
      setDeletingResultLoading(false);
    }
  };

  // 4. Delete Whole Session
  const handleConfirmDeleteSession = async () => {
    if (!selectedSession) return;
    setDeletingSessionLoading(true);

    try {
      const { error } = await supabase
        .from('exam_sessions')
        .delete()
        .eq('id', selectedSession.id);

      if (error) throw error;

      showToast('success', `ลบประวัติการสอบ "${selectedSession.title}" เรียบร้อยแล้ว`);
      setIsDeleteSessionOpen(false);
      setSelectedSession(null);
      fetchSessions();
    } catch (err) {
      showToast('error', 'ลบข้อมูลไม่สำเร็จ: ' + err.message);
    } finally {
      setDeletingSessionLoading(false);
    }
  };

  // 5. Export CSV
  const handleExportCSV = () => {
    if (!studentList || studentList.length === 0 || !selectedSession) return;

    const BOM = "\uFEFF";
    let csvContent = "รหัสนักเรียน,ชื่อ-สกุล,ห้องเรียน,จำนวนรอบที่สอบ,คะแนนรอบแรก,คะแนนรอบล่าสุด,คะแนนสุทธิหลังคิดเกณฑ์,คะแนนเต็ม,เกณฑ์ที่เลือก,ผลการประเมิน\n";
    
    studentList.forEach(s => {
      const studentId = s.student_id;
      const name = `${s.students?.first_name || ''} ${s.students?.last_name || ''}`;
      const classroom = s.students?.classroom || '-';
      const attemptsCount = s.attempts.length;
      const firstScore = s.attempts[0]?.score ?? '-';
      const latestScore = s.attempts[s.attempts.length - 1]?.score ?? '-';
      const finalScore = s.finalScore;
      const effectiveTotal = s.effectiveTotal;
      const statusText = s.isPass ? 'ผ่าน' : 'ไม่ผ่าน';

      let policyName = 'คะแนนที่ดีที่สุด';
      if (retakePolicy === 'latest') policyName = 'คะแนนครั้งล่าสุด';
      if (retakePolicy === 'average') policyName = 'คะแนนเฉลี่ย';
      if (retakePolicy === 'capped') policyName = `จำกัดคะแนนไม่เกิน ${capScore}`;
      if (retakePolicy === 'scaled') policyName = `ปรับเต็ม ${customMaxScore}`;

      csvContent += `"${studentId}","${name}","${classroom}",${attemptsCount},${firstScore},${latestScore},${finalScore},${effectiveTotal},"${policyName}","${statusText}"\n`;
    });

    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `สรุปผลคะแนนสอบและสอบซ่อม_${selectedSession.title}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = studentList.filter(s => 
    (s.student_id || '').includes(search) || 
    (s.students?.first_name || '').toLowerCase().includes(search.toLowerCase()) || 
    (s.students?.last_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.students?.classroom || '').toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const totalStudents = studentList.length;
  const passCount = studentList.filter(s => s.isPass).length;
  const retakeApprovedCount = studentList.filter(s => s.isRetakeAllowed).length;
  const retakenStudentsCount = studentList.filter(s => s.attempts.length > 1).length;
  const avgFinalScore = totalStudents > 0 ? (studentList.reduce((sum, s) => sum + s.finalScore, 0) / totalStudents).toFixed(1) : 0;

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
          <div className="p-3 bg-gradient-to-br from-amber-500 to-indigo-600 rounded-xl text-white shadow-md shadow-amber-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              สรุปผลคะแนนสอบ & ระบบสอบซ่อม
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              อนุมัติสอบซ่อม คำนวณคะแนนตามเกณฑ์ที่ครูเลือก (ดีสุด / ล่าสุด / เฉลี่ย / เพดานคะแนน / ปรับเต็มใหม่)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchSessions(); if (selectedSession) fetchResultsAndParticipants(selectedSession.id); }}
            disabled={loading}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all border border-zinc-200 cursor-pointer"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        
        {/* Left Column: Select Session */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
            <h2 className="font-bold text-xs text-zinc-700">เลือกรายการสอบ</h2>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-zinc-100 p-2 space-y-1">
            {loading ? (
              <div className="p-8 text-center text-xs text-zinc-400">กำลังโหลด...</div>
            ) : sessions.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-400">ยังไม่มีการสอบ</div>
            ) : (
              sessions.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => setSelectedSession(s)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedSession?.id === s.id 
                      ? 'bg-amber-50/80 border border-amber-200 text-amber-900 shadow-xs' 
                      : 'hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{s.title}</div>
                  <div className="text-[11px] text-zinc-500 mt-1 flex justify-between">
                    <span>{new Date(s.created_at).toLocaleDateString('th-TH')}</span>
                    <span className={`px-1.5 py-0.2 rounded font-semibold ${s.status === 'completed' ? 'text-zinc-600 bg-zinc-100' : 'text-emerald-700 bg-emerald-50'}`}>
                      {s.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังสอบ'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Retake Policy & Results Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 lg:col-span-3 flex flex-col overflow-hidden">
          {!selectedSession ? (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 p-8 text-center">
              <FileSpreadsheet className="w-16 h-16 mb-4 text-zinc-200" />
              <p className="text-base font-bold text-zinc-700">เลือกการสอบจากด้านซ้าย</p>
              <p className="text-xs text-zinc-500 mt-1">เพื่อจัดการการสอบซ่อมและดูคะแนนสอบ</p>
            </div>
          ) : (
            <>
              {/* Header & Quick Action Bar */}
              <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                    {selectedSession.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                    <span>นักเรียนทั้งหมด: <strong>{totalStudents} คน</strong></span>
                    <span>•</span>
                    <span>ผ่านเกณฑ์: <strong className="text-emerald-600">{passCount} คน</strong></span>
                    <span>•</span>
                    <span>สอบซ่อมแล้ว: <strong className="text-indigo-600">{retakenStudentsCount} คน</strong></span>
                    <span>•</span>
                    <span>ได้รับอนุมัติซ่อม: <strong className="text-amber-600">{retakeApprovedCount} คน</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRetakePanelOpen(!isRetakePanelOpen)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isRetakePanelOpen 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20' 
                        : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>ตั้งค่าเกณฑ์สอบซ่อม</span>
                  </button>

                  <button
                    onClick={handleAllowRetakeAllFailed}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                    title="อนุมัติสอบซ่อมให้นักเรียนที่ได้คะแนนน้อยกว่า 50%"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>อนุมัติคนตกทั้งหมด</span>
                  </button>

                  <button 
                    onClick={handleExportCSV}
                    disabled={studentList.length === 0}
                    className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>

                  <button
                    onClick={() => setIsAddScoreOpen(true)}
                    className="p-1.5 text-zinc-600 hover:text-indigo-600 hover:bg-zinc-100 rounded-lg cursor-pointer"
                    title="กรอกคะแนนเพิ่ม"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setIsDeleteSessionOpen(true)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="ลบประวัติการสอบนี้ทั้งหมด"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RETAKE CALCULATION POLICY PANEL (COLLAPSIBLE) */}
              {isRetakePanelOpen && (
                <div className="p-4 bg-indigo-50/40 border-b border-indigo-100 space-y-3 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      เลือกนโยบายการคำนวณคะแนนสอบซ่อม (Retake Score Calculation):
                    </span>
                    <span className="text-[11px] text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md font-semibold">
                      คะแนนเฉลี่ยปัจจุบัน: {avgFinalScore} / {totalScoreVal}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
                    {/* Option 1: Best Score */}
                    <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      retakePolicy === 'best' 
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                        : 'bg-white/70 border-zinc-200 hover:bg-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <input 
                          type="radio" 
                          name="retakePolicy" 
                          value="best" 
                          checked={retakePolicy === 'best'} 
                          onChange={() => setRetakePolicy('best')}
                          className="text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="font-bold text-zinc-900">🌟 คะแนนที่ดีที่สุด</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-tight">ใช้คะแนนสูงสุดจากทุกรอบที่สอบ</p>
                    </label>

                    {/* Option 2: Latest Score */}
                    <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      retakePolicy === 'latest' 
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                        : 'bg-white/70 border-zinc-200 hover:bg-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <input 
                          type="radio" 
                          name="retakePolicy" 
                          value="latest" 
                          checked={retakePolicy === 'latest'} 
                          onChange={() => setRetakePolicy('latest')}
                          className="text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="font-bold text-zinc-900">⏱️ ครั้งล่าสุด</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-tight">ใช้คะแนนของการสอบรอบล่าสุด</p>
                    </label>

                    {/* Option 3: Average Score */}
                    <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      retakePolicy === 'average' 
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                        : 'bg-white/70 border-zinc-200 hover:bg-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <input 
                          type="radio" 
                          name="retakePolicy" 
                          value="average" 
                          checked={retakePolicy === 'average'} 
                          onChange={() => setRetakePolicy('average')}
                          className="text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="font-bold text-zinc-900">📊 ค่าเฉลี่ย</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-tight">คิดคะแนนเฉลี่ยจากทุกรอบ</p>
                    </label>

                    {/* Option 4: Capped Max Score */}
                    <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      retakePolicy === 'capped' 
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                        : 'bg-white/70 border-zinc-200 hover:bg-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <input 
                          type="radio" 
                          name="retakePolicy" 
                          value="capped" 
                          checked={retakePolicy === 'capped'} 
                          onChange={() => setRetakePolicy('capped')}
                          className="text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="font-bold text-zinc-900">🛡️ จำกัดเพดานคะแนน</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[11px] text-zinc-500">ไม่เกิน:</span>
                        <input 
                          type="number" 
                          min="1" 
                          max={totalScoreVal}
                          step="0.5"
                          value={capScore}
                          onChange={e => setCapScore(e.target.value)}
                          className="w-14 px-1.5 py-0.5 border rounded bg-white font-mono text-center font-bold text-indigo-700"
                        />
                        <span className="text-[11px] text-zinc-400">/{totalScoreVal}</span>
                      </div>
                    </label>

                    {/* Option 5: Scaled / Custom Max */}
                    <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      retakePolicy === 'scaled' 
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                        : 'bg-white/70 border-zinc-200 hover:bg-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <input 
                          type="radio" 
                          name="retakePolicy" 
                          value="scaled" 
                          checked={retakePolicy === 'scaled'} 
                          onChange={() => setRetakePolicy('scaled')}
                          className="text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="font-bold text-zinc-900">🎯 กำหนดคะแนนเต็มใหม่</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[11px] text-zinc-500">เต็มใหม่:</span>
                        <input 
                          type="number" 
                          min="1" 
                          step="1"
                          value={customMaxScore}
                          onChange={e => setCustomMaxScore(e.target.value)}
                          className="w-14 px-1.5 py-0.5 border rounded bg-white font-mono text-center font-bold text-indigo-700"
                        />
                        <span className="text-[11px] text-zinc-400">คะแนน</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Filter bar */}
              <div className="p-3 border-b border-zinc-100 flex items-center justify-between bg-white text-xs">
                <div className="relative w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="ค้นหารหัส, ชื่อ-สกุล, หรือห้อง..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-zinc-200 rounded-xl text-xs bg-white focus:border-indigo-500"
                  />
                </div>

                <div className="text-zinc-500 text-[11px]">
                  💡 <em>คลิกที่ปุ่ม "อนุมัติสอบซ่อม" หน้ารายชื่อเพื่อเปิดสิทธิ์ให้นักเรียนสอบรอบใหม่</em>
                </div>
              </div>

              {/* Unified Results Table */}
              <div className="flex-1 overflow-auto bg-white">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-zinc-50/80 text-zinc-500 sticky top-0 z-10 border-b border-zinc-100 font-semibold uppercase tracking-wider backdrop-blur-xs">
                    <tr>
                      <th className="px-4 py-3">รหัสนักเรียน</th>
                      <th className="px-4 py-3">ชื่อ-นามสกุล</th>
                      <th className="px-4 py-3">ห้องเรียน</th>
                      <th className="px-4 py-3">ประวัติการสอบ (ทุกรอบ)</th>
                      <th className="px-4 py-3 text-center">คะแนนสุทธิ (ตามเกณฑ์)</th>
                      <th className="px-4 py-3 text-center">สถานะสอบซ่อม</th>
                      <th className="px-4 py-3 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredStudents.length === 0 ? (
                      <tr><td colSpan="7" className="text-center py-12 text-zinc-400">ไม่พบข้อมูลคะแนนสอบ</td></tr>
                    ) : (
                      filteredStudents.map(s => {
                        return (
                          <tr key={s.student_id} className="hover:bg-zinc-50/80 transition-colors">
                            <td className="px-4 py-3 font-mono font-bold text-indigo-600">{s.student_id}</td>
                            <td className="px-4 py-3 font-semibold text-zinc-900">{s.students?.first_name} {s.students?.last_name}</td>
                            <td className="px-4 py-3 text-zinc-600">{s.students?.classroom || '-'}</td>
                            
                            {/* Attempt badges */}
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {s.attempts.map((att, idx) => (
                                  <span 
                                    key={att.id}
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] border ${
                                      idx === 0 
                                        ? 'bg-zinc-100 border-zinc-200 text-zinc-700 font-medium' 
                                        : 'bg-indigo-50 border-indigo-200 text-indigo-800 font-bold'
                                    }`}
                                    title={`รอบที่ ${idx + 1} ส่งเมื่อ ${att.submitted_at ? new Date(att.submitted_at).toLocaleTimeString('th-TH') : '-'}`}
                                  >
                                    <span>#{idx + 1}:</span>
                                    <span>{att.score}</span>
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Calculated Final Score */}
                            <td className="px-4 py-3 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs font-mono ${
                                  s.isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {s.finalScore} / {s.effectiveTotal}
                                </span>
                              </div>
                            </td>

                            {/* Retake Status */}
                            <td className="px-4 py-3 text-center">
                              {s.isRetakeRequested ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-bounce">
                                  🔔 นักเรียนขอสอบซ่อม
                                </span>
                              ) : s.isRetakeAllowed ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 animate-pulse">
                                  <RotateCcw className="w-3 h-3" /> อนุมัติแล้ว (รอทำ)
                                </span>
                              ) : s.attempts.length > 1 ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                                  <Check className="w-3 h-3" /> สอบซ่อมแล้ว ({s.attempts.length} รอบ)
                                </span>
                              ) : (
                                <span className="text-[11px] text-zinc-400">รอบปกติ</span>
                              )}
                            </td>

                            {/* Action Buttons */}
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Toggle Retake Button */}
                                <button
                                  onClick={() => handleToggleRetake(s.student_id, s.isRetakeAllowed)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    s.isRetakeRequested
                                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm animate-pulse'
                                      : s.isRetakeAllowed
                                      ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                                  }`}
                                  title={s.isRetakeAllowed ? 'ยกเลิกสิทธิ์สอบซ่อม' : 'อนุมัติให้นักเรียนสอบซ่อม'}
                                >
                                  {s.isRetakeRequested ? (
                                    <>
                                      <RotateCcw className="w-3 h-3" /> อนุมัติสอบซ่อมทันที!
                                    </>
                                  ) : s.isRetakeAllowed ? (
                                    <>
                                      <UserX className="w-3 h-3" /> ปิดสิทธิ์ซ่อม
                                    </>
                                  ) : (
                                    <>
                                      <RotateCcw className="w-3 h-3" /> อนุมัติสอบซ่อม
                                    </>
                                  )}
                                </button>

                                {/* Edit latest score */}
                                {s.attempts.length > 0 && (
                                  <button
                                    onClick={() => handleOpenEditResult(s.attempts[s.attempts.length - 1])}
                                    className="p-1.5 text-zinc-400 hover:text-indigo-600 rounded cursor-pointer"
                                    title="แก้ไขคะแนนรอบล่าสุด"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {/* Delete latest result */}
                                {s.attempts.length > 0 && (
                                  <button
                                    onClick={() => setDeletingResult(s.attempts[s.attempts.length - 1])}
                                    className="p-1.5 text-zinc-400 hover:text-rose-600 rounded cursor-pointer"
                                    title="ลบคะแนนรอบล่าสุด"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

      </div>

      {/* ADD SCORE MODAL */}
      {isAddScoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" /> กรอกคะแนนสอบให้นักเรียน
              </h3>
              <button onClick={() => setIsAddScoreOpen(false)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddManualScore} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">รหัสนักเรียน *</label>
                <input
                  required
                  value={newStudentId}
                  onChange={e => setNewStudentId(e.target.value)}
                  placeholder="เช่น 65001"
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">คะแนนที่ได้ (เต็ม {totalScoreVal}) *</label>
                <input
                  required
                  type="number"
                  step="0.5"
                  min="0"
                  max={totalScoreVal}
                  value={newScore}
                  onChange={e => setNewScore(e.target.value)}
                  placeholder="เช่น 8.5"
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setIsAddScoreOpen(false)} className="flex-1 py-2.5 border rounded-xl font-semibold">ยกเลิก</button>
                <button disabled={savingScore} type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                  {savingScore ? 'กำลังบันทึก...' : 'บันทึกคะแนน'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT RESULT MODAL */}
      {editingResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Pencil className="w-5 h-5 text-indigo-600" /> แก้ไขคะแนนสอบ
              </h3>
              <button onClick={() => setEditingResult(null)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateResult} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">นักเรียน</label>
                <div className="p-3 bg-zinc-100/70 border border-zinc-200 rounded-xl text-zinc-700 font-semibold">
                  {editingResult.students?.first_name} {editingResult.students?.last_name} ({editingResult.student_id})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">คะแนนใหม่ (เต็ม {totalScoreVal}) *</label>
                <input
                  required
                  type="number"
                  step="0.5"
                  min="0"
                  max={totalScoreVal}
                  value={editScore}
                  onChange={e => setEditScore(e.target.value)}
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setEditingResult(null)} className="flex-1 py-2.5 border rounded-xl font-semibold">ยกเลิก</button>
                <button disabled={updatingResult} type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                  {updatingResult ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE INDIVIDUAL RESULT MODAL */}
      {deletingResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันลบคะแนนสอบ?</h3>
              <p className="text-xs text-zinc-600 mt-1">
                คุณต้องการลบคะแนนของ <strong>{deletingResult.students?.first_name} {deletingResult.students?.last_name}</strong> (รหัส {deletingResult.student_id}) หรือไม่?
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setDeletingResult(null)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={deletingResultLoading} onClick={handleConfirmDeleteResult} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">
                {deletingResultLoading ? 'กำลังลบ...' : 'ยืนยันการลบ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE SESSION MODAL */}
      {isDeleteSessionOpen && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันลบประวัติการสอบทั้งห้อง?</h3>
              <p className="text-xs text-zinc-600 mt-1">
                คุณต้องการลบประวัติการสอบ "<strong>{selectedSession.title}</strong>" พร้อมผลคะแนนของนักเรียนทั้งหมดหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setIsDeleteSessionOpen(false)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={deletingSessionLoading} onClick={handleConfirmDeleteSession} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">
                {deletingSessionLoading ? 'กำลังลบ...' : 'ยืนยันการลบ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
