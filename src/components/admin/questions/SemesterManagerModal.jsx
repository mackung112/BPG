import { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  AlertCircle, 
  Sparkles, 
  BookOpen
} from 'lucide-react';

export default function SemesterManagerModal({
  isOpen,
  onClose,
  semesters = [],
  subjects = [],
  onCreateSemester,
  onUpdateSemester,
  onDeleteSemester,
  onSetCurrentSemester
}) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    academicYear: '2567',
    termNumber: '1',
    isCurrent: false
  });
  const [error, setError] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  if (!isOpen) return null;

  // คำนวณจำนวนวิชาในแต่ละภาคเรียน
  const subjectCountBySemester = (semesterId) => {
    return subjects.filter(s => s.semesterId === semesterId && !s.isStashed).length;
  };

  const handleStartCreate = () => {
    setEditingId('NEW');
    setFormData({
      name: `ภาคเรียนที่ 1/2568`,
      academicYear: '2568',
      termNumber: '1',
      isCurrent: semesters.length === 0
    });
    setError('');
  };

  const handleStartEdit = (semester) => {
    setEditingId(semester.id);
    setFormData({
      name: semester.name || '',
      academicYear: semester.academic_year || '2567',
      termNumber: semester.term_number || '1',
      isCurrent: !!semester.is_current
    });
    setError('');
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('กรุณากรอกชื่อภาคเรียน');
      return;
    }

    try {
      if (editingId === 'NEW') {
        await onCreateSemester({
          name: formData.name.trim(),
          academicYear: formData.academicYear.trim(),
          termNumber: formData.termNumber.trim(),
          isCurrent: formData.isCurrent
        });
      } else {
        await onUpdateSemester(editingId, {
          name: formData.name.trim(),
          academicYear: formData.academicYear.trim(),
          termNumber: formData.termNumber.trim(),
          isCurrent: formData.isCurrent
        });
      }
      setEditingId(null);
      setError('');
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleDelete = async (semesterId) => {
    try {
      await onDeleteSemester(semesterId);
      setDeleteConfirmId(null);
    } catch (err) {
      setError(err.message || 'ลบภาคเรียนไม่สำเร็จ');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-zinc-100 space-y-5 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-md shadow-indigo-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span>จัดการภาคเรียนที่สอน</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                  {semesters.length} ภาคเรียน
                </span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                กำหนดภาคเรียนเพื่อจัดกลุ่มวิชาที่สอนในแต่ละเทอม และพักวิชาที่ยังไม่ได้สอน
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-2 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Create / Edit Form */}
          {editingId ? (
            <form onSubmit={handleSubmit} className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-4.5 space-y-3.5">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  {editingId === 'NEW' ? 'เพิ่มภาคเรียนใหม่' : 'แก้ไขภาคเรียน'}
                </span>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="text-xs text-zinc-500 hover:text-zinc-700 cursor-pointer"
                >
                  ยกเลิก
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    ชื่อภาคเรียน <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="เช่น ภาคเรียนที่ 1/2567"
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      ภาคเรียนที่ (Term)
                    </label>
                    <input
                      type="text"
                      value={formData.termNumber}
                      onChange={e => {
                        const val = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          termNumber: val,
                          name: `ภาคเรียนที่ ${val}/${prev.academicYear}`
                        }));
                      }}
                      placeholder="1, 2 หรือ ฤดูร้อน"
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      ปีการศึกษา (Year)
                    </label>
                    <input
                      type="text"
                      value={formData.academicYear}
                      onChange={e => {
                        const val = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          academicYear: val,
                          name: `ภาคเรียนที่ ${prev.termNumber}/${val}`
                        }));
                      }}
                      placeholder="2567, 2568"
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    checked={formData.isCurrent}
                    onChange={e => setFormData({ ...formData, isCurrent: e.target.checked })}
                    className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="isCurrent" className="text-xs font-semibold text-zinc-700 cursor-pointer select-none">
                    ตั้งเป็นภาคเรียนปัจจุบัน (Active Term)
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-200/60 rounded-xl transition-colors cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>บันทึกภาคเรียน</span>
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={handleStartCreate}
              className="w-full py-2.5 px-4 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/80 rounded-2xl text-xs font-semibold text-indigo-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>สร้างภาคเรียนใหม่</span>
            </button>
          )}

          {/* List of Semesters */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-wider px-1">
              รายการภาคเรียนทั้งหมด
            </h4>

            {semesters.length === 0 ? (
              <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200/60">
                <Calendar className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
                <p className="text-xs text-zinc-500">ยังไม่มีภาคเรียนในระบบ</p>
                <button
                  onClick={handleStartCreate}
                  className="mt-2 text-xs text-indigo-600 font-semibold cursor-pointer"
                >
                  + เพิ่มภาคเรียนแรก
                </button>
              </div>
            ) : (
              semesters.map(semester => {
                const count = subjectCountBySemester(semester.id);
                const isCurrent = !!semester.is_current;
                const isConfirmingDelete = deleteConfirmId === semester.id;

                return (
                  <div
                    key={semester.id}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                      isCurrent
                        ? 'bg-indigo-50/40 border-indigo-200 ring-1 ring-indigo-500/20'
                        : 'bg-white border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isCurrent ? 'bg-indigo-600 text-white shadow-xs' : 'bg-zinc-100 text-zinc-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                              {semester.name}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                                ภาคเรียนปัจจุบัน
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-indigo-500" />
                              <span>{count} รายวิชาที่สอน</span>
                            </span>
                            {semester.academic_year && (
                              <span className="text-zinc-400">
                                ปีการศึกษา {semester.academic_year}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {!isCurrent && (
                          <button
                            type="button"
                            onClick={() => onSetCurrentSemester(semester.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-zinc-600 hover:text-indigo-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                            title="กำหนดให้เป็นภาคเรียนปัจจุบัน"
                          >
                            ตั้งเป็นปัจจุบัน
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleStartEdit(semester)}
                          className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                          title="แก้ไขภาคเรียน"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(semester.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="ลบภาคเรียน"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Delete Confirmation Alert inline */}
                    {isConfirmingDelete && (
                      <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div className="text-xs text-rose-800">
                            <p className="font-bold">ยืนยันการลบภาคเรียน "{semester.name}"?</p>
                            <p className="text-[11px] text-rose-600 mt-0.5">
                              วิชาทั้ง {count} วิชาในภาคเรียนนี้จะถูกย้ายกลับไปที่ <b>"คลังวิชาที่พักไว้ก่อน"</b> โดยอัตโนมัติ (ข้อมูลชุดข้อสอบจะไม่สูญหาย)
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-200/50 rounded-lg cursor-pointer"
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(semester.id)}
                            className="px-3 py-1 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                          >
                            ยืนยันการลบ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
