import { useState } from 'react';
import { BookOpen, Search, X, Check, AlertCircle, Loader2, Calendar } from 'lucide-react';
import subjectsData from '../../../data/subjects.json';
import { STASH_SEMESTER_ID } from '../../../services/semesterService';

function SubjectModalDialog({ 
  onClose, 
  onSave, 
  editingSubject,
  semesters = [],
  currentSemester = null
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectCode, setSubjectCode] = useState(() => editingSubject?.subject_code || '');
  const [subjectName, setSubjectName] = useState(() => editingSubject?.subject_name || '');
  const [subjectNameEn, setSubjectNameEn] = useState(() => editingSubject?.rawTeacherSubject?.subject_name_en || '');
  const [theoryHours, setTheoryHours] = useState(() => String(editingSubject?.rawTeacherSubject?.theory_hours ?? '0'));
  const [practicalHours, setPracticalHours] = useState(() => String(editingSubject?.rawTeacherSubject?.practical_hours ?? '0'));
  const [credits, setCredits] = useState(() => String(editingSubject?.rawTeacherSubject?.credits ?? '1'));
  const [curriculum, setCurriculum] = useState(() => editingSubject?.rawTeacherSubject?.curriculum || 'ปวช.');
  const [targetSemesterId, setTargetSemesterId] = useState(() => {
    if (editingSubject?.isStashed) return STASH_SEMESTER_ID;
    return editingSubject?.semesterId || currentSemester?.id || (semesters[0]?.id || '');
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ค้นหารายวิชาจากฐานข้อมูลหลักสูตร
  const searchResults = searchTerm.trim().length >= 2
    ? subjectsData.filter(s => 
        (s.subject_code && s.subject_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (s.subject_name && s.subject_name.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSelectFromSearch = (item) => {
    setSubjectCode(item.subject_code || '');
    setSubjectName(item.subject_name || '');
    setSubjectNameEn(item.subject_name_en || '');
    setTheoryHours(String(item.theory_hours ?? '0'));
    setPracticalHours(String(item.practical_hours ?? '0'));
    setCredits(String(item.credits ?? '1'));
    setCurriculum(item.curriculum || 'ปวช.');
    setSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectCode.trim()) {
      setError('กรุณากรอกรหัสวิชา (เช่น 21910-2004)');
      return;
    }
    if (!subjectName.trim()) {
      setError('กรุณากรอกชื่อรายวิชา');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await onSave({
        subject_code: subjectCode.trim(),
        subject_name: subjectName.trim(),
        subject_name_en: subjectNameEn.trim(),
        theory_hours: Number(theoryHours) || 0,
        practical_hours: Number(practicalHours) || 0,
        credits: String(credits),
        curriculum,
        semesterId: targetSemesterId
      });
      onClose();
    } catch (err) {
      setError(err.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-zinc-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                {editingSubject ? 'แก้ไขข้อมูลรายวิชา' : 'เพิ่มรายวิชาใหม่'}
              </h3>
              <p className="text-xs text-zinc-500">
                {editingSubject ? 'ปรับปรุงข้อมูลรายวิชา ภาคเรียน และรหัสวิชา' : 'ค้นหาจากหลักสูตรหรือกำหนดรหัสวิชาด้วยตนเอง'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Search from curriculum (only for new) */}
        {!editingSubject && (
          <div className="space-y-1.5 bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-200/80">
            <label className="block text-xs font-semibold text-zinc-700">
              ⚡ ค้นหาจากหลักสูตรมาตรฐาน (ปวช./ปวส.)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="พิมพ์รหัสวิชา หรือชื่อวิชา เช่น 21910-2004 หรือ โปรแกรม..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="mt-2 divide-y divide-zinc-100 bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                {searchResults.map(item => (
                  <button
                    key={item.subject_code}
                    type="button"
                    onClick={() => handleSelectFromSearch(item)}
                    className="w-full text-left px-3 py-2 hover:bg-indigo-50 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-600">
                          {item.subject_code}
                        </span>
                        <span className="text-xs text-zinc-800 font-medium">
                          {item.subject_name}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400">
                        {item.curriculum} • ทฤษฎี {item.theory_hours || 0} ปฏิบัติ {item.practical_hours || 0} หน่วยกิต {item.credits}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      เลือก ↵
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subject Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block font-semibold text-zinc-700 mb-1">
                รหัสวิชา <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น 21910-2004"
                value={subjectCode}
                onChange={e => setSubjectCode(e.target.value)}
                className="w-full px-3 py-2 font-mono border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block font-semibold text-zinc-700 mb-1">
                ชื่อรายวิชา (ภาษาไทย) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น การเขียนโปรแกรมคอมพิวเตอร์"
                value={subjectName}
                onChange={e => setSubjectName(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs"
                required
              />
            </div>
          </div>

          {/* Semester Selector */}
          <div>
            <label className="block font-semibold text-zinc-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>ภาคเรียนที่เปิดสอน</span>
            </label>
            <select
              value={targetSemesterId}
              onChange={e => setTargetSemesterId(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs bg-white cursor-pointer"
            >
              {semesters.map(sem => (
                <option key={sem.id} value={sem.id}>
                  📅 {sem.name} {sem.is_current ? '(ปัจจุบัน)' : ''}
                </option>
              ))}
              <option value={STASH_SEMESTER_ID}>
                📦 พักวิชานี้ไว้ก่อน (ไม่ได้สอนในเทอมนี้)
              </option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              ชื่อรายวิชาภาษาอังกฤษ (ถ้ามี)
            </label>
            <input
              type="text"
              placeholder="เช่น Computer Programming"
              value={subjectNameEn}
              onChange={e => setSubjectNameEn(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 mb-1">ทฤษฎี (ชม.)</label>
              <input
                type="number"
                min="0"
                value={theoryHours}
                onChange={e => setTheoryHours(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-xl text-center text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 mb-1">ปฏิบัติ (ชม.)</label>
              <input
                type="number"
                min="0"
                value={practicalHours}
                onChange={e => setPracticalHours(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-xl text-center text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 mb-1">หน่วยกิต</label>
              <input
                type="text"
                value={credits}
                onChange={e => setCredits(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-xl text-center text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 mb-1">ระดับหลักสูตร</label>
              <select
                value={curriculum}
                onChange={e => setCurriculum(e.target.value)}
                className="w-full px-2 py-1.5 border border-zinc-200 rounded-xl text-xs bg-white"
              >
                <option value="ปวช.">ปวช.</option>
                <option value="ปวส.">ปวส.</option>
                <option value="ระยะสั้น">ระยะสั้น</option>
                <option value="ทั่วไป">ทั่วไป</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2.5 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-zinc-200 rounded-xl font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingSubject ? 'บันทึกการแก้ไข' : 'สร้างรายวิชา'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SubjectModal({ 
  isOpen, 
  onClose, 
  onSave, 
  editingSubject,
  semesters = [],
  currentSemester = null
}) {
  if (!isOpen) return null;

  return (
    <SubjectModalDialog
      key={editingSubject ? editingSubject.id : 'new'}
      onClose={onClose}
      onSave={onSave}
      editingSubject={editingSubject}
      semesters={semesters}
      currentSemester={currentSemester}
    />
  );
}
