import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Users, 
  Upload, 
  Trash2, 
  Search, 
  UserPlus, 
  FileDown, 
  Pencil, 
  X, 
  Check, 
  AlertCircle, 
  RefreshCw,
  GraduationCap,
  Filter
} from 'lucide-react';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classroomFilter, setClassroomFilter] = useState('all');
  
  // Single Add Form
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [classroom, setClassroom] = useState('');
  const [adding, setAdding] = useState(false);

  // Bulk Import
  const [csvText, setCsvText] = useState('');
  const [importing, setImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Edit Modal State
  const [editingStudent, setEditingStudent] = useState(null);
  const [editStudentId, setEditStudentId] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editClassroom, setEditClassroom] = useState('');
  const [updating, setUpdating] = useState(false);

  // Delete Modal State
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

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
    } else if (error) {
      showToast('error', 'โหลดข้อมูลไม่สำเร็จ: ' + error.message);
    }
    setLoading(false);
  };

  // 1. Create Student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!studentId.trim() || !firstName.trim() || !lastName.trim() || !classroom.trim()) {
      showToast('error', 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    setAdding(true);
    try {
      const { error } = await supabase.from('students').insert([{
        student_id: studentId.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        nickname: nickname.trim(),
        classroom: classroom.trim()
      }]);

      if (error) {
        if (error.message.includes('unique') || error.code === '23505') {
          throw new Error('รหัสนักเรียนนี้มีอยู่ในระบบแล้ว');
        }
        throw error;
      }

      showToast('success', `เพิ่มนักเรียน "${firstName} ${lastName}" สำเร็จ!`);
      setStudentId(''); 
      setFirstName(''); 
      setLastName(''); 
      setNickname(''); 
      setClassroom('');
      fetchStudents();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setAdding(false);
    }
  };

  // 2. Open Edit Modal
  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setEditStudentId(student.student_id);
    setEditFirstName(student.first_name || '');
    setEditLastName(student.last_name || '');
    setEditNickname(student.nickname || '');
    setEditClassroom(student.classroom || '');
  };

  // 2.1 Update Student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    if (!editFirstName.trim() || !editLastName.trim() || !editClassroom.trim()) {
      showToast('error', 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('students')
        .update({
          first_name: editFirstName.trim(),
          last_name: editLastName.trim(),
          nickname: editNickname.trim(),
          classroom: editClassroom.trim()
        })
        .eq('student_id', editingStudent.student_id);

      if (error) throw error;

      showToast('success', `อัปเดตข้อมูลนักเรียน "${editFirstName} ${editLastName}" สำเร็จ!`);
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาดในการแก้ไข: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // 3. Delete Student
  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('student_id', deletingStudent.student_id);

      if (error) throw error;

      showToast('success', `ลบข้อมูลนักเรียนรหัส ${deletingStudent.student_id} เรียบร้อยแล้ว`);
      setDeletingStudent(null);
      fetchStudents();
    } catch (err) {
      showToast('error', 'ลบไม่สำเร็จ: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  // 4. Bulk CSV Import
  const handleBulkImport = async () => {
    if (!csvText.trim()) return;
    setImporting(true);

    try {
      const lines = csvText.split('\n');
      const newStudents = [];
      
      for (let line of lines) {
        const parts = line.split(/[,\t]/).map(s => s.trim());
        if (parts.length >= 5 && parts[0] && parts[0] !== 'รหัสนักเรียน') {
          newStudents.push({
            student_id: parts[0],
            first_name: parts[1],
            last_name: parts[2],
            nickname: parts[3],
            classroom: parts[4]
          });
        }
      }

      if (newStudents.length === 0) {
        throw new Error('รูปแบบข้อมูลไม่ถูกต้อง กรุณาใช้รูปแบบ: รหัส,ชื่อ,สกุล,ชื่อเล่น,ห้อง');
      }

      const { error } = await supabase.from('students').upsert(newStudents, { onConflict: 'student_id' });
      if (error) throw error;

      showToast('success', `นำเข้านักเรียน ${newStudents.length} คนสำเร็จ!`);
      setCsvText('');
      fetchStudents();
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาดในการนำเข้า: ' + err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "รหัสนักเรียน,ชื่อ,นามสกุล,ชื่อเล่น,ห้องเรียน\n1001,สมชาย,ใจดี,ชาย,ม.6/1\n1002,สมหญิง,รักเรียน,หญิง,ม.6/1\n";
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "student_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Classrooms list for filter
  const classrooms = ['all', ...Array.from(new Set(students.map(s => s.classroom).filter(Boolean)))];

  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      (s.student_id || '').includes(search) || 
      (s.first_name || '').toLowerCase().includes(search.toLowerCase()) || 
      (s.last_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.nickname || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.classroom || '').toLowerCase().includes(search.toLowerCase());
    
    const matchesClass = classroomFilter === 'all' || s.classroom === classroomFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-900/90 border-emerald-500/40 text-emerald-100' 
            : 'bg-rose-900/90 border-rose-500/40 text-rose-100'
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
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-sky-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              จัดการข้อมูลนักเรียน
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              เพิ่ม แก้ไข ลบ และนำเข้าข้อมูลนักเรียนสำหรับการเข้าสอบในระบบ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-bold text-sm border border-indigo-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            นักเรียนทั้งหมด: {students.length} คน
          </div>
          <button
            onClick={fetchStudents}
            disabled={loading}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all border border-zinc-200 cursor-pointer"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Forms */}
        <div className="space-y-6 lg:col-span-1">
          {/* Add Single Student */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/80">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-indigo-600" /> เพิ่มนักเรียนรายบุคคล
            </h2>
            <form onSubmit={handleAddStudent} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">รหัสนักเรียน *</label>
                <input 
                  required 
                  value={studentId} 
                  onChange={e => setStudentId(e.target.value)} 
                  type="text" 
                  placeholder="เช่น 65001" 
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">ชื่อ *</label>
                  <input 
                    required 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)} 
                    type="text" 
                    placeholder="สมชาย" 
                    className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">นามสกุล *</label>
                  <input 
                    required 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)} 
                    type="text" 
                    placeholder="ใจดี" 
                    className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">ชื่อเล่น</label>
                  <input 
                    value={nickname} 
                    onChange={e => setNickname(e.target.value)} 
                    type="text" 
                    placeholder="ชาย" 
                    className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">ห้องเรียน *</label>
                  <input 
                    required 
                    value={classroom} 
                    onChange={e => setClassroom(e.target.value)} 
                    type="text" 
                    placeholder="เช่น 1/1, ม.6/1" 
                    className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={adding}
                className="w-full mt-2 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {adding ? 'กำลังบันทึก...' : 'เพิ่มนักเรียน'}
              </button>
            </form>
          </div>

          {/* Bulk Import */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/80">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-3">
              <Upload className="w-5 h-5 text-sky-600" /> นำเข้าหลายคน (CSV / Excel)
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500">รูปแบบ: <code>รหัส,ชื่อ,นามสกุล,ชื่อเล่น,ห้อง</code></p>
                <button 
                  onClick={handleDownloadTemplate} 
                  className="flex items-center gap-1 text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2.5 py-1.5 rounded-lg border border-zinc-200 transition-colors cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" /> แม่แบบ CSV
                </button>
              </div>
              <textarea 
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                placeholder="วางข้อมูลจาก Excel หรือลากไฟล์ .csv มาวางที่นี่..." 
                className={`w-full px-3.5 py-2.5 border rounded-xl h-28 text-xs font-mono transition-all ${
                  isDragging ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200' : 'border-zinc-200'
                }`}
              />
              <button 
                onClick={handleBulkImport} 
                disabled={importing || !csvText.trim()}
                className="w-full bg-sky-600 text-white py-2.5 rounded-xl font-bold hover:bg-sky-700 disabled:opacity-50 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                {importing ? 'กำลังนำเข้า...' : 'นำเข้าข้อมูลนักเรียน'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Student List Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 lg:col-span-2 flex flex-col h-[calc(100vh-12rem)] overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row gap-3 items-center justify-between bg-zinc-50/50">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
              <input 
                type="text" 
                placeholder="ค้นหารหัส, ชื่อ-สกุล, หรือห้อง..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Classroom Filter */}
            {classrooms.length > 2 && (
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
                <select
                  value={classroomFilter}
                  onChange={e => setClassroomFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 text-zinc-700"
                >
                  <option value="all">ทุกห้องเรียน</option>
                  {classrooms.filter(c => c !== 'all').map(c => (
                    <option key={c} value={c}>ห้อง {c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-zinc-50/80 text-xs font-semibold text-zinc-500 uppercase tracking-wider sticky top-0 z-10 border-b border-zinc-100 backdrop-blur-xs">
                <tr>
                  <th className="px-5 py-3.5">รหัสนักเรียน</th>
                  <th className="px-5 py-3.5">ชื่อ-นามสกุล</th>
                  <th className="px-5 py-3.5">ห้องเรียน</th>
                  <th className="px-5 py-3.5 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-zinc-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                      กำลังโหลดข้อมูลนักเรียน...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-zinc-400">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      ไม่พบข้อมูลนักเรียน
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(s => (
                    <tr key={s.student_id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-5 py-3.5 font-mono font-bold text-indigo-600">
                        {s.student_id}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-zinc-900">{s.first_name} {s.last_name}</div>
                        {s.nickname && <div className="text-xs text-zinc-400">({s.nickname})</div>}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg font-medium text-xs border border-zinc-200">
                          {s.classroom}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Button */}
                          <button 
                            onClick={() => handleOpenEdit(s)} 
                            className="p-2 text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                            title="แก้ไขข้อมูลนักเรียน"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button 
                            onClick={() => setDeletingStudent(s)} 
                            className="p-2 text-zinc-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                            title="ลบนักเรียน"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* EDIT STUDENT MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">แก้ไขข้อมูลนักเรียน</h3>
                  <p className="text-xs text-zinc-500">รหัส: {editingStudent.student_id}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">รหัสนักเรียน (ห้ามแก้ไข)</label>
                <input
                  disabled
                  value={editStudentId}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-100/70 border border-zinc-200 rounded-xl text-zinc-500 cursor-not-allowed font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">ชื่อ *</label>
                  <input
                    required
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    type="text"
                    className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">นามสกุล *</label>
                  <input
                    required
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    type="text"
                    className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">ชื่อเล่น</label>
                  <input
                    value={editNickname}
                    onChange={(e) => setEditNickname(e.target.value)}
                    type="text"
                    className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">ห้องเรียน *</label>
                  <input
                    required
                    value={editClassroom}
                    onChange={(e) => setEditClassroom(e.target.value)}
                    type="text"
                    className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  disabled={updating}
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl disabled:opacity-50 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  {updating ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-5 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-900">ยืนยันการลบนักเรียน?</h3>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                คุณต้องการลบข้อมูลของ <strong className="text-zinc-900">{deletingStudent.first_name} {deletingStudent.last_name}</strong> (รหัส {deletingStudent.student_id}) ออกจากระบบหรือไม่?
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingStudent(null)}
                className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl disabled:opacity-50 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                {deleting ? 'กำลังลบ...' : 'ยืนยันการลบ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
