import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Play, Users, StopCircle, RefreshCw, Key, CheckCircle, Clock, Trash2 } from 'lucide-react';
import QuestionPicker from './QuestionPicker';

export default function ExamControl() {
  const { user } = useAuth();
  const [banks, setBanks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Session Form
  const [examConfig, setExamConfig] = useState(null); // { questions: [], totalScore: 0, summaryText: '' }
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(60);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    let subscription = null;
    if (activeSession) {
      fetchParticipants(activeSession.id);
      
      // Subscribe to real-time participant changes
      subscription = supabase
        .channel(`exam_room_${activeSession.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${activeSession.id}` },
          (payload) => {
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

  const fetchInitialData = async () => {
    setLoading(true);
    // Fetch banks
    const { data: bData } = await supabase.from('question_banks').select('*');
    if (bData) setBanks(bData);

    // Fetch active/waiting sessions
    await fetchSessions();
    setLoading(false);
  };

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('exam_sessions')
      .select('*, question_banks(title)')
      .order('created_at', { ascending: false });
    if (data) setSessions(data);
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

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (isCreating) return;
    
    if (!examConfig) {
      alert('กรุณาตั้งค่าข้อสอบก่อนสร้างห้องสอบ');
      return;
    }

    setIsCreating(true);

    const secretCode = generateSecretCode();
    
    // 1. สร้างห้องสอบ (exam_sessions)
    // ส่ง bank_id ไปหลอกๆ 1 คลังเพื่อให้ผ่านกฏห้ามว่างของฐานข้อมูลเก่า (เราใช้ตารางกลางแทนแล้ว)
    try {
      const { data: sessionData, error: sessionError } = await supabase.from('exam_sessions').insert([{
        bank_id: banks.length > 0 ? banks[0].id : null,
        created_by: user.id,
        teacher_id: user.id,
        title: sessionTitle,
        secret_code: secretCode,
        time_limit_minutes: timeLimit,
        total_score: examConfig.totalScore,
        status: 'waiting'
      }]).select().single();

      if (sessionError) throw sessionError;

      // 2. บันทึกรายการข้อสอบลงใน exam_session_questions
      const toInsert = examConfig.questions.map((q, idx) => ({
        session_id: sessionData.id,
        question_id: q.id,
        points: q.points,
        order_index: idx
      }));

      const { error: questionsError } = await supabase.from('exam_session_questions').insert(toInsert);

      if (questionsError) throw questionsError;

      setSessionTitle('');
      setIsPickerOpen(false);
      setExamConfig(null);
      await fetchSessions();
      setActiveSession(sessionData);
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteSession = async () => {
    if (!activeSession) return;
    if (!confirm('คุณแน่ใจหรือไม่ที่จะยกเลิกและลบห้องสอบนี้ทิ้ง?')) return;

    const { error } = await supabase
      .from('exam_sessions')
      .delete()
      .eq('id', activeSession.id);

    if (error) {
      alert('ลบห้องสอบไม่สำเร็จ: ' + error.message);
    } else {
      setActiveSession(null);
      fetchSessions();
    }
  };

  const handleStartExam = async () => {
    if (!activeSession) return;
    if (!confirm('ยืนยันการเริ่มสอบ? นักเรียนจะไม่สามารถเข้าห้องสอบเพิ่มได้')) return;

    const { error } = await supabase
      .from('exam_sessions')
      .update({ status: 'active', started_at: new Date() })
      .eq('id', activeSession.id);

    if (!error) {
      fetchSessions();
      setActiveSession({ ...activeSession, status: 'active', started_at: new Date() });
    } else {
      alert('เริ่มสอบไม่สำเร็จ: ' + error.message);
    }
  };

  const handleEndExam = async () => {
    if (!activeSession) return;
    if (!confirm('ยืนยันการจบการสอบ? นักเรียนทุกคนจะถูกบังคับส่งข้อสอบ')) return;

    const { error } = await supabase
      .from('exam_sessions')
      .update({ status: 'completed', end_time: new Date() })
      .eq('id', activeSession.id);

    if (!error) {
      fetchSessions();
      setActiveSession({ ...activeSession, status: 'completed' });
    } else {
      alert('จบการสอบไม่สำเร็จ: ' + error.message);
    }
  };

  const handleAllowRejoin = async (participantId) => {
    await supabase
      .from('exam_participants')
      .update({ allow_rejoin: true, status: 'waiting' })
      .eq('id', participantId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Play className="w-8 h-8 text-indigo-600" /> แผงควบคุมการสอบ (Exam Control)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Create & List Sessions */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 mb-4">เปิดห้องสอบใหม่</h2>
            <form onSubmit={handleCreateSession} className="space-y-3 text-sm">
              <input required value={sessionTitle} onChange={e=>setSessionTitle(e.target.value)} type="text" placeholder="ชื่อการสอบ (เช่น สอบกลางภาค)" className="w-full px-3 py-2 border rounded-lg" />
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-gray-700">ชุดข้อสอบ</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {examConfig ? examConfig.summaryText : 'ยังไม่ได้เลือกข้อสอบ'}
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsPickerOpen(true)}
                  className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  ตั้งค่าข้อสอบ
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-gray-600 whitespace-nowrap">เวลาสอบ (นาที):</label>
                <input required value={timeLimit} onChange={e=>setTimeLimit(e.target.value)} type="number" min="1" className="w-full px-3 py-2 border rounded-lg" />
              </div>

              <button type="submit" disabled={isCreating} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                {isCreating ? 'กำลังสร้างห้องสอบ...' : 'สร้างห้องสอบ'}
              </button>
            </form>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 mb-4">ห้องสอบล่าสุด</h2>
            <div className="space-y-2 max-h-[400px] overflow-auto pr-2">
              {sessions.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => setActiveSession(s)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeSession?.id === s.id 
                    ? 'bg-indigo-50 border-indigo-500 shadow-sm' 
                    : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="font-bold text-gray-800">{s.title}</div>
                  <div className="text-xs text-gray-500 mb-2 truncate">คลัง: {s.question_banks?.title || 'ไม่พบ'}</div>
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-mono tracking-widest">{s.secret_code}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      s.status === 'waiting' ? 'bg-amber-100 text-amber-700' : 
                      s.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {s.status === 'waiting' ? 'รอสอบ' : s.status === 'active' ? 'กำลังสอบ' : 'เสร็จสิ้น'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Session Control */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col h-[calc(100vh-8rem)]">
          {!activeSession ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
              <Users className="w-16 h-16 mb-4 text-gray-200" />
              <p className="text-lg font-medium text-gray-600">เลือกห้องสอบด้านซ้าย</p>
              <p className="text-sm">เพื่อดูสถานะนักเรียน หรือ ควบคุมการสอบ</p>
            </div>
          ) : (
            <>
              {/* Control Header */}
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{activeSession.title}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-lg">
                      <Key className="w-4 h-4" /> รหัสลับ: <span className="font-mono text-lg tracking-widest">{activeSession.secret_code}</span>
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" /> {activeSession.time_limit_minutes} นาที
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {activeSession.status === 'waiting' && (
                    <>
                      <button onClick={handleDeleteSession} className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2.5 rounded-xl font-bold hover:bg-rose-100 shadow-sm border border-rose-200 transition-all" title="ยกเลิกห้องสอบนี้">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button onClick={handleStartExam} className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 shadow-sm hover:shadow-md transition-all">
                        <Play className="w-5 h-5" /> เริ่มสอบทันที
                      </button>
                    </>
                  )}
                  {activeSession.status === 'active' && (
                    <button onClick={handleEndExam} className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-rose-600 shadow-sm hover:shadow-md transition-all">
                      <StopCircle className="w-5 h-5" /> จบการสอบ
                    </button>
                  )}
                  {activeSession.status === 'completed' && (
                    <span className="flex items-center gap-2 bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-bold">
                      <CheckCircle className="w-5 h-5" /> จบการสอบแล้ว
                    </span>
                  )}
                </div>
              </div>

              {/* Lobby / Participants */}
              <div className="p-4 border-b border-gray-50 bg-white flex justify-between items-center">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" />
                  นักเรียนในระบบ: {participants.length} คน
                </h3>
                <button onClick={() => fetchParticipants(activeSession.id)} className="text-sm text-indigo-600 flex items-center gap-1 hover:underline">
                  <RefreshCw className="w-4 h-4" /> รีเฟรช
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {participants.map(p => (
                    <div key={p.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-800">{p.students?.first_name} {p.students?.last_name}</div>
                          <div className="text-xs text-gray-500 font-mono">{p.student_id} | {p.students?.classroom}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                        <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${
                          p.status === 'waiting' ? 'bg-amber-100 text-amber-700' :
                          p.status === 'testing' ? 'bg-indigo-100 text-indigo-700' :
                          p.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-rose-100 text-rose-700' // disconnected/cheating
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            p.status === 'testing' ? 'bg-indigo-500 animate-pulse' : 'bg-current'
                          }`} />
                          {p.status.toUpperCase()}
                        </span>

                        {(p.status === 'disconnected' || p.status === 'cheating') && (
                          <button 
                            onClick={() => handleAllowRejoin(p.id)}
                            className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100 font-medium"
                          >
                            อนุมัติเข้าใหม่
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {participants.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>ยังไม่มีนักเรียนเข้าร่วม</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
