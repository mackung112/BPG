import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Upload, Trash2, Search, UserPlus, FileDown } from 'lucide-react';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Single Add Form
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [classroom, setClassroom] = useState('');

  // Bulk Import
  const [csvText, setCsvText] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('classroom', { ascending: true })
      .order('student_id', { ascending: true });
    
    if (!error && data) {
      setStudents(data);
    }
    setLoading(false);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!studentId || !firstName || !lastName || !classroom) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      return;
    }

    const { error } = await supabase.from('students').insert([{
      student_id: studentId,
      first_name: firstName,
      last_name: lastName,
      nickname: nickname,
      classroom: classroom
    }]);

    if (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message);
    } else {
      alert('เพิ่มนักเรียนสำเร็จ');
      setStudentId(''); setFirstName(''); setLastName(''); setNickname(''); setClassroom('');
      fetchStudents();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('ยืนยันการลบนักเรียนรหัส ' + id + '?')) return;
    
    const { error } = await supabase.from('students').delete().eq('student_id', id);
    if (error) {
      alert('ลบไม่สำเร็จ: ' + error.message);
    } else {
      fetchStudents();
    }
  };

  const handleBulkImport = async () => {
    if (!csvText.trim()) return;
    setImporting(true);

    // Parse simple CSV: รหัส,ชื่อ,สกุล,ชื่อเล่น,ห้อง
    const lines = csvText.split('\n');
    const newStudents = [];
    
    for (let line of lines) {
      const parts = line.split(',').map(s => s.trim());
      if (parts.length >= 5) {
        newStudents.push({
          student_id: parts[0],
          first_name: parts[1],
          last_name: parts[2],
          nickname: parts[3],
          classroom: parts[4]
        });
      }
    }

    if (newStudents.length > 0) {
      const { error } = await supabase.from('students').upsert(newStudents, { onConflict: 'student_id' });
      if (error) {
        alert('เกิดข้อผิดพลาดในการนำเข้า: ' + error.message);
      } else {
        alert(`นำเข้านักเรียน ${newStudents.length} คนสำเร็จ`);
        setCsvText('');
        fetchStudents();
      }
    } else {
      alert('รูปแบบข้อมูลไม่ถูกต้อง กรุณาใช้รูปแบบ: รหัส,ชื่อ,สกุล,ชื่อเล่น,ห้อง');
    }
    setImporting(false);
  };

  const filteredStudents = students.filter(s => 
    s.student_id.includes(search) || 
    s.first_name.includes(search) || 
    s.classroom.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-600" /> จัดการนักเรียน
        </h1>
        <div className="text-sm text-gray-500">
          นักเรียนทั้งหมด: {students.length} คน
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Forms */}
        <div className="space-y-6 lg:col-span-1">
          {/* Add Single Student */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-emerald-500" /> เพิ่มนักเรียนทีละคน
            </h2>
            <form onSubmit={handleAddStudent} className="space-y-3 text-sm">
              <input required value={studentId} onChange={e=>setStudentId(e.target.value)} type="text" placeholder="รหัสนักเรียน *" className="w-full px-3 py-2 border rounded-lg" />
              <input required value={firstName} onChange={e=>setFirstName(e.target.value)} type="text" placeholder="ชื่อ *" className="w-full px-3 py-2 border rounded-lg" />
              <input required value={lastName} onChange={e=>setLastName(e.target.value)} type="text" placeholder="นามสกุล *" className="w-full px-3 py-2 border rounded-lg" />
              <input value={nickname} onChange={e=>setNickname(e.target.value)} type="text" placeholder="ชื่อเล่น" className="w-full px-3 py-2 border rounded-lg" />
              <input required value={classroom} onChange={e=>setClassroom(e.target.value)} type="text" placeholder="ห้องเรียน (เช่น 1/1) *" className="w-full px-3 py-2 border rounded-lg" />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700">เพิ่มนักเรียน</button>
            </form>
          </div>

          {/* Bulk Import */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-blue-500" /> นำเข้าหลายคน (CSV)
            </h2>
            <div className="space-y-3">
              <p className="text-xs text-gray-500">รูปแบบ (ต่อ 1 บรรทัด): <br/><code>รหัส,ชื่อ,นามสกุล,ชื่อเล่น,ห้องเรียน</code></p>
              <textarea 
                value={csvText}
                onChange={e=>setCsvText(e.target.value)}
                placeholder="ตัวอย่าง:\n1001,สมชาย,ใจดี,ชาย,ม.6/1\n1002,สมหญิง,รักเรียน,หญิง,ม.6/1" 
                className="w-full px-3 py-2 border rounded-lg h-32 text-sm font-mono"
              />
              <button 
                onClick={handleBulkImport} 
                disabled={importing || !csvText}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                {importing ? 'กำลังนำเข้า...' : 'อัปโหลดข้อมูล'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Student List */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col h-[calc(100vh-8rem)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="ค้นหารหัส, ชื่อ หรือ ห้องเรียน..." 
                value={search}
                onChange={e=>setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto border rounded-xl">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 border-b">รหัส</th>
                  <th className="px-4 py-3 border-b">ชื่อ-สกุล</th>
                  <th className="px-4 py-3 border-b">ห้องเรียน</th>
                  <th className="px-4 py-3 border-b text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-500">กำลังโหลดข้อมูล...</td></tr>
                ) : filteredStudents.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-500">ไม่พบข้อมูลนักเรียน</td></tr>
                ) : (
                  filteredStudents.map(s => (
                    <tr key={s.student_id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-mono text-indigo-600">{s.student_id}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold">{s.first_name} {s.last_name}</div>
                        <div className="text-xs text-gray-500">({s.nickname || '-'})</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 px-2 py-1 rounded-md font-medium text-gray-600">
                          {s.classroom}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDelete(s.student_id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
