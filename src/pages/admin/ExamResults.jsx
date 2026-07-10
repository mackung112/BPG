import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trophy, Download, Search, FileSpreadsheet } from 'lucide-react';

export default function ExamResults() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchResults(selectedSession.id);
    } else {
      setResults([]);
    }
  }, [selectedSession]);

  const fetchSessions = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('exam_sessions')
      .select('*, question_banks(title)')
      .in('status', ['active', 'completed']) // Show active (so they can see live scores) or completed
      .order('created_at', { ascending: false });
    if (data) setSessions(data);
    setLoading(false);
  };

  const fetchResults = async (sessionId) => {
    const { data } = await supabase
      .from('exam_results')
      .select(`
        *,
        students(first_name, last_name, classroom)
      `)
      .eq('session_id', sessionId)
      .order('score', { ascending: false });
    if (data) setResults(data);
  };

  const handleExportCSV = () => {
    if (!results || results.length === 0) return;

    // BOM for UTF-8 encoding so Excel reads Thai correctly
    const BOM = "\uFEFF";
    
    // Header
    let csvContent = "รหัสนักเรียน,ชื่อ-สกุล,ห้องเรียน,คะแนนที่ได้,คะแนนเต็ม,เวลาที่ใช้(นาที),ส่งข้อสอบเมื่อ\n";
    
    results.forEach(r => {
      const studentId = r.student_id;
      const name = `${r.students?.first_name} ${r.students?.last_name}`;
      const classroom = r.students?.classroom;
      const score = r.score;
      const total = r.total_questions;
      // Calculate minutes used
      let timeUsed = '-';
      if (r.submitted_at) {
        const start = new Date(selectedSession.started_at);
        const submit = new Date(r.submitted_at);
        const diffMs = submit - start;
        const diffMins = Math.round(diffMs / 60000);
        timeUsed = diffMins > 0 ? diffMins : '<1';
      }
      
      const submitTime = r.submitted_at ? new Date(r.submitted_at).toLocaleString('th-TH') : '-';

      // Wrap string fields in quotes to handle commas inside text
      csvContent += `"${studentId}","${name}","${classroom}",${score},${total},"${timeUsed}","${submitTime}"\n`;
    });

    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `คะแนนสอบ_${selectedSession.title}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = results.filter(r => 
    r.student_id.includes(search) || 
    r.students?.first_name.includes(search) || 
    r.students?.classroom.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-500" /> สรุปผลคะแนนสอบ
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        
        {/* Left Column: Select Session */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-700">เลือกการสอบ</h2>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-gray-100 p-2">
            {loading ? (
              <div className="p-4 text-center text-sm text-gray-500">กำลังโหลด...</div>
            ) : sessions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">ยังไม่มีการสอบที่เสร็จสิ้น</div>
            ) : (
              sessions.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => setSelectedSession(s)}
                  className={`p-3 rounded-xl cursor-pointer transition-colors ${selectedSession?.id === s.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-gray-50'}`}
                >
                  <div className="font-bold text-sm text-gray-800">{s.title}</div>
                  <div className="text-xs text-gray-500 mt-1">วันที่: {new Date(s.created_at).toLocaleDateString('th-TH')}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: View Results */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-3 flex flex-col overflow-hidden">
          {!selectedSession ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
              <FileSpreadsheet className="w-16 h-16 mb-4 text-gray-200" />
              <p className="text-lg font-medium text-gray-600">เลือกการสอบจากด้านซ้าย</p>
              <p className="text-sm">เพื่อดูและดาวน์โหลดผลคะแนน (CSV)</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedSession.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">คลังข้อสอบ: {selectedSession.question_banks?.title} | ส่งข้อสอบแล้ว: {results.length} คน</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="ค้นหา..." 
                      value={search}
                      onChange={e=>setSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button 
                    onClick={handleExportCSV}
                    disabled={results.length === 0}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" /> ดาวน์โหลด CSV
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto bg-gray-50/30">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-3 border-b">รหัสนักเรียน</th>
                      <th className="px-5 py-3 border-b">ชื่อ-สกุล</th>
                      <th className="px-5 py-3 border-b">ห้องเรียน</th>
                      <th className="px-5 py-3 border-b text-center">คะแนน</th>
                      <th className="px-5 py-3 border-b text-right">ส่งข้อสอบเมื่อ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredResults.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-12 text-gray-500">ไม่พบข้อมูลคะแนน</td></tr>
                    ) : (
                      filteredResults.map((r, i) => (
                        <tr key={r.id} className="hover:bg-white transition-colors">
                          <td className="px-5 py-3 font-mono text-indigo-600">{r.student_id}</td>
                          <td className="px-5 py-3 font-medium text-gray-800">{r.students?.first_name} {r.students?.last_name}</td>
                          <td className="px-5 py-3 text-gray-600">{r.students?.classroom}</td>
                          <td className="px-5 py-3 text-center">
                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-bold ${
                              (r.score / r.total_questions) >= 0.5 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {r.score} / {r.total_questions}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right text-xs text-gray-500">
                            {r.submitted_at ? new Date(r.submitted_at).toLocaleString('th-TH') : '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
