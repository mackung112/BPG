import { useState } from 'react';
import {
  Users, Upload, Trash2, Search, UserPlus, FileDown,
  Pencil, X, Check, AlertCircle, RefreshCw, GraduationCap, Filter
} from 'lucide-react';
import { useStudents } from '../../hooks/useStudents';

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 left-4 sm:left-auto z-50 max-w-sm w-auto flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
      toast.type === 'success'
        ? 'bg-emerald-900/90 border-emerald-500/40 text-emerald-100'
        : 'bg-rose-900/90 border-rose-500/40 text-rose-100'
    }`}>
      {toast.type === 'success'
        ? <Check className="w-5 h-5 text-emerald-400 shrink-0" />
        : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      <span className="text-sm font-medium">{toast.message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75 cursor-pointer"><X className="w-4 h-4" /></button>
    </div>
  );
}

function ConfirmModal({ title, description, onConfirm, onCancel, loading, confirmLabel = 'ยืนยัน', danger = true }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4">
        <div className={`p-3 rounded-2xl w-fit ${danger ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
          <Trash2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-zinc-900">{title}</h3>
          <p className="text-xs text-zinc-600 mt-1">{description}</p>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={onCancel} className="flex-1 py-2.5 border rounded-xl text-xs font-semibold cursor-pointer">ยกเลิก</button>
          <button
            disabled={loading}
            onClick={onConfirm}
            className={`flex-1 py-2.5 text-white rounded-xl text-xs font-semibold cursor-pointer ${danger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'กำลังดำเนินการ...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StudentManagement() {
  const {
    students, loading, reload, classrooms,
    filterStudents, addStudent, editStudent, removeStudent,
    importCSV, exportCSV, downloadTemplate,
  } = useStudents();

  // UI State only
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [classroomFilter, setClassroomFilter] = useState('all');

  // Add Form State
  const [addForm, setAddForm] = useState({ student_id: '', first_name: '', last_name: '', nickname: '', classroom: '' });
  const [adding, setAdding] = useState(false);

  // Edit Modal State
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({ first_name: '', last_name: '', nickname: '', classroom: '' });
  const [updating, setUpdating] = useState(false);

  // Delete Modal State
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // CSV Import State
  const [csvText, setCsvText] = useState('');
  const [importing, setImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // ─── Handlers ─────────────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await addStudent(addForm);
      showToast('success', `เพิ่มนักเรียน "${addForm.first_name} ${addForm.last_name}" สำเร็จ!`);
      setAddForm({ student_id: '', first_name: '', last_name: '', nickname: '', classroom: '' });
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setEditForm({
      first_name: student.first_name || '',
      last_name: student.last_name || '',
      nickname: student.nickname || '',
      classroom: student.classroom || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await editStudent(editingStudent.student_id, editForm);
      showToast('success', `อัปเดต "${editForm.first_name} ${editForm.last_name}" สำเร็จ!`);
      setEditingStudent(null);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await removeStudent(deletingStudent.student_id);
      showToast('success', `ลบนักเรียนรหัส ${deletingStudent.student_id} เรียบร้อยแล้ว`);
      setDeletingStudent(null);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      const count = await importCSV(csvText);
      showToast('success', `นำเข้านักเรียน ${count} คนสำเร็จ!`);
      setCsvText('');
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCsvText(ev.target.result);
      reader.readAsText(file);
    }
  };

  const filteredStudents = filterStudents(search, classroomFilter);

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-sky-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">จัดการข้อมูลนักเรียน</h1>
            <p className="text-sm text-zinc-500 mt-0.5">เพิ่ม แก้ไข ลบ และนำเข้าข้อมูลนักเรียน</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-bold text-sm border border-indigo-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            นักเรียนทั้งหมด: {students.length} คน
          </div>
          <button
            onClick={reload} disabled={loading}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl border border-zinc-200 cursor-pointer transition-all"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Forms */}
        <div className="space-y-6 lg:col-span-1">
          {/* Add Single Student */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200/80">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-indigo-600" /> เพิ่มนักเรียนรายบุคคล
            </h2>
            <form onSubmit={handleAdd} className="space-y-3.5 text-sm">
              {[
                { key: 'student_id', label: 'รหัสนักเรียน *', placeholder: 'เช่น 65001', required: true },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">{f.label}</label>
                  <input
                    required={f.required} value={addForm[f.key]}
                    onChange={e => setAddForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { key: 'first_name', label: 'ชื่อ *', placeholder: 'สมชาย', required: true },
                  { key: 'last_name', label: 'นามสกุล *', placeholder: 'ใจดี', required: true },
                  { key: 'nickname', label: 'ชื่อเล่น', placeholder: 'ชาย', required: false },
                  { key: 'classroom', label: 'ห้องเรียน *', placeholder: 'ม.6/1', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1">{f.label}</label>
                    <input
                      required={f.required} value={addForm[f.key]}
                      onChange={e => setAddForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-3.5 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm"
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit" disabled={adding}
                className="w-full mt-2 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {adding ? 'กำลังบันทึก...' : 'เพิ่มนักเรียน'}
              </button>
            </form>
          </div>

          {/* CSV Import */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-200/80">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" /> นำเข้าข้อมูล CSV
              </h2>
              <button
                onClick={downloadTemplate}
                className="text-xs text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" /> ดาวน์โหลด Template
              </button>
            </div>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-4 transition-colors ${isDragging ? 'border-indigo-400 bg-indigo-50' : 'border-zinc-200'}`}
            >
              <textarea
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                placeholder={'วางข้อมูล CSV ที่นี่\nรหัส,ชื่อ,สกุล,ชื่อเล่น,ห้อง\n65001,สมชาย,ใจดี,ชาย,ม.6/1'}
                rows={5}
                className="w-full text-xs font-mono resize-none outline-none text-zinc-700 bg-transparent placeholder-zinc-400"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleImport} disabled={importing || !csvText.trim()}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-md cursor-pointer disabled:opacity-50 transition-all"
              >
                {importing ? 'กำลังนำเข้า...' : 'นำเข้าข้อมูล'}
              </button>
              <button
                onClick={() => setCsvText('')} disabled={!csvText}
                className="px-4 py-2.5 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer disabled:opacity-40"
              >
                ล้าง
              </button>
            </div>
          </div>
        </div>

        {/* Right: Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-200/80 flex flex-col">
          {/* Filter Bar */}
          <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text" placeholder="ค้นหารหัส, ชื่อ, ห้องเรียน..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl text-sm focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <select
                value={classroomFilter} onChange={e => setClassroomFilter(e.target.value)}
                className="pl-9 pr-8 py-2 border border-zinc-200 rounded-xl text-sm focus:border-indigo-500 appearance-none bg-white"
              >
                {classrooms.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'ทุกห้องเรียน' : c}</option>
                ))}
              </select>
            </div>
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-4 py-2 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
            >
              <FileDown className="w-4 h-4" /> Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 text-zinc-500 font-semibold uppercase tracking-wider border-b border-zinc-100">
                <tr>
                  <th className="px-4 py-3">รหัส</th>
                  <th className="px-4 py-3">ชื่อ-สกุล</th>
                  <th className="px-4 py-3">ชื่อเล่น</th>
                  <th className="px-4 py-3">ห้องเรียน</th>
                  <th className="px-4 py-3 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-12 text-zinc-400">กำลังโหลด...</td></tr>
                ) : filteredStudents.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-12 text-zinc-400">ไม่พบข้อมูลนักเรียน</td></tr>
                ) : filteredStudents.map(s => (
                  <tr key={s.student_id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-indigo-600">{s.student_id}</td>
                    <td className="px-4 py-3 font-semibold text-zinc-900">{s.first_name} {s.last_name}</td>
                    <td className="px-4 py-3 text-zinc-500">{s.nickname || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg font-semibold">{s.classroom}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-zinc-400 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors"
                          title="แก้ไข"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingStudent(s)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg cursor-pointer transition-colors"
                          title="ลบ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" /> แก้ไขข้อมูลนักเรียน
              </h3>
              <button onClick={() => setEditingStudent(null)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs font-mono text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">รหัส: {editingStudent.student_id}</div>
            <form onSubmit={handleUpdate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'first_name', label: 'ชื่อ *', required: true },
                  { key: 'last_name', label: 'นามสกุล *', required: true },
                  { key: 'nickname', label: 'ชื่อเล่น', required: false },
                  { key: 'classroom', label: 'ห้องเรียน *', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block font-semibold text-zinc-700 mb-1">{f.label}</label>
                    <input
                      required={f.required} value={editForm[f.key]}
                      onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setEditingStudent(null)} className="flex-1 py-2.5 border rounded-xl font-semibold cursor-pointer">ยกเลิก</button>
                <button disabled={updating} type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 cursor-pointer">
                  {updating ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingStudent && (
        <ConfirmModal
          title="ยืนยันลบนักเรียน?"
          description={`คุณต้องการลบนักเรียน "${deletingStudent.first_name} ${deletingStudent.last_name}" (รหัส ${deletingStudent.student_id}) ออกจากระบบหรือไม่?`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingStudent(null)}
          loading={deleting}
          confirmLabel="ยืนยันลบ"
        />
      )}
    </div>
  );
}
