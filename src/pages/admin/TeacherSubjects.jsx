import { useState, useEffect } from 'react';
import { BookOpen, Search, Plus, Loader2, Trash2, Copy, Check, Clock, Calendar, AlertCircle, ChevronDown, ChevronUp, Edit2, X, Sparkles, Eye, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getTeacherSubjects, addTeacherSubject, deleteTeacherSubject } from '../../services/teacherSubjectService';
import SubjectAIAssistant from '../../components/admin/SubjectAIAssistant';


export default function TeacherSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [globalCurriculum, setGlobalCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const [teachingDay, setTeachingDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isPreviewSyllabus, setIsPreviewSyllabus] = useState(false);

  const toggleExpand = (id) => {
    if (editingId) return; // Prevent collapse while editing
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEditClick = (subject, e) => {
    e.stopPropagation();
    setEditingId(subject.id);
    setExpandedId(subject.id);
    setEditData({ ...subject });
  };

  // Search Results
  const searchResults = searchTerm.trim() 
    ? globalCurriculum.filter(s => 
        s.subject_code.includes(searchTerm) || 
        s.subject_name.includes(searchTerm)
      ).slice(0, 10) // Limit to 10 results
    : [];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [teacherData, { data: curriculumData, error: currErr }] = await Promise.all([
        getTeacherSubjects(),
        import('../../lib/supabase').then(m => m.supabase.from('curriculum_subjects').select('*'))
      ]);
      if (currErr) throw currErr;
      
      setSubjects(teacherData);
      setGlobalCurriculum(curriculumData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSearchTerm(subject.subject_code + ' ' + subject.subject_name);
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!selectedSubject) {
      setError('กรุณาค้นหาและเลือกรายวิชาจากหลักสูตร');
      return;
    }

    try {
      setError('');
      setIsSaving(true);

      const newSubject = await addTeacherSubject({
        subject_code: selectedSubject.subject_code,
        subject_name: selectedSubject.subject_name,
        subject_name_en: selectedSubject.subject_name_en || null,
        theory_hours: selectedSubject.theory_hours,
        practical_hours: selectedSubject.practical_hours,
        credits: String(selectedSubject.credits),
        reference_standard: selectedSubject.reference_standard || '',
        learning_outcomes: selectedSubject.learning_outcomes || '',
        objectives: selectedSubject.objectives || '',
        competencies: selectedSubject.competencies || '',
        description: selectedSubject.description || `หลักสูตร ${selectedSubject.curriculum}`,
        teaching_day: teachingDay || null,
        start_time: startTime || null,
        end_time: endTime || null,
        academic_year: academicYear || null
      });

      setSubjects([newSubject, ...subjects]);
      
      // Reset form
      setSearchTerm('');
      setSelectedSubject(null);
      setTeachingDay('');
      setStartTime('');
      setEndTime('');
      
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('คุณต้องการลบรายวิชานี้ใช่หรือไม่?')) return;
    try {
      await deleteTeacherSubject(id);
      setSubjects(subjects.filter(s => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setIsSaving(true);
      setError('');
      
      const { updateCurriculumSubjectByCode } = await import('../../services/curriculumService');
      const { updateTeacherSubject } = await import('../../services/teacherSubjectService');
      
      const updates = {
        subject_name_en: editData.subject_name_en,
        reference_standard: editData.reference_standard,
        learning_outcomes: editData.learning_outcomes,
        objectives: editData.objectives,
        competencies: editData.competencies,
        description: editData.description,
        syllabus_markdown: editData.syllabus_markdown
      };

      // 1. Update curriculum_subjects (Global dataset)
      await updateCurriculumSubjectByCode(editData.subject_code, updates).catch(err => {
        console.error("Failed to update global curriculum, user might not have permission or entry missing:", err);
      });

      // 2. Update teacher_subjects (Local dataset)
      const updatedSubject = await updateTeacherSubject(editData.id, updates);
      
      // Update state
      setSubjects(subjects.map(s => s.id === updatedSubject.id ? updatedSubject : s));
      
      // Also update globalCurriculum state in case they search again
      setGlobalCurriculum(globalCurriculum.map(s => s.subject_code === updatedSubject.subject_code ? { ...s, ...updates } : s));

      setEditingId(null);
      setEditData(null);
      setShowAIAssistant(false);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลแก้ไข');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyMarkdown = (subject) => {
    const text = `**รหัสวิชา:** ${subject.subject_code}
**ชื่อวิชา:** ${subject.subject_name} ${subject.subject_name_en ? `(${subject.subject_name_en})` : ''}
**ท-ป-น:** ${subject.theory_hours || 0}-${subject.practical_hours || 0}-${subject.credits || 0}
**ปีการศึกษา:** ${subject.academic_year || '-'}
**เวลาเรียน:** ${subject.teaching_day ? `วัน${subject.teaching_day}` : '-'} ${subject.start_time ? `${subject.start_time.slice(0,5)} - ${subject.end_time?.slice(0,5)}` : ''}

**อ้างอิงมาตรฐาน**
${subject.reference_standard || '-'}

**ผลลัพธ์การเรียนรู้ระดับรายวิชา**
${subject.learning_outcomes || '-'}

**จุดประสงค์รายวิชา**
${subject.objectives || '-'}

**สมรรถนะรายวิชา**
${subject.competencies || '-'}

**คำอธิบายรายวิชา**
${subject.description || '-'}`;

    navigator.clipboard.writeText(text);
    setCopiedId(subject.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">รายวิชาและตารางสอน</h1>
          <p className="text-gray-500 mt-1">เพิ่มรายวิชาที่สอน โดยค้นหาจากฐานข้อมูลหลักสูตรในระบบ</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm overflow-visible">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-600" />
          เพิ่มรายวิชาใหม่
        </h2>
        
        <form onSubmit={handleAddSubject} className="space-y-4">
          <div className="relative z-10">
            <label className="block text-sm font-medium text-gray-700 mb-1">ค้นหารหัสวิชา หรือ ชื่อวิชา</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (selectedSubject && e.target.value !== selectedSubject.subject_code + ' ' + selectedSubject.subject_name) {
                    setSelectedSubject(null);
                  }
                }}
                placeholder="พิมพ์เพื่อค้นหา เช่น 20204 หรือ ระบบปฏิบัติการ"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-gray-50"
                disabled={isSaving}
              />
            </div>

            {/* Dropdown Results */}
            {!selectedSubject && searchTerm.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-xl max-h-60 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  searchResults.map(sub => (
                    <div 
                      key={sub.subject_code}
                      onClick={() => handleSelectSubject(sub)}
                      className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 flex flex-col"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-700">{sub.subject_code}</span>
                        <span className="text-gray-900 font-medium">{sub.subject_name}</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        หลักสูตร {sub.curriculum} | ท-ป-น: {sub.theory_hours}-{sub.practical_hours}-{sub.credits}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-4 text-center text-gray-500 text-sm">
                    ไม่พบรายวิชาที่ค้นหา
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ปีการศึกษา (ไม่บังคับ)</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="เช่น 1/2567"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isSaving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">วันทำการสอน (ไม่บังคับ)</label>
              <select
                value={teachingDay}
                onChange={(e) => setTeachingDay(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isSaving}
              >
                <option value="">-- เลือกวัน --</option>
                <option value="จันทร์">จันทร์</option>
                <option value="อังคาร">อังคาร</option>
                <option value="พุธ">พุธ</option>
                <option value="พฤหัสบดี">พฤหัสบดี</option>
                <option value="ศุกร์">ศุกร์</option>
                <option value="เสาร์">เสาร์</option>
                <option value="อาทิตย์">อาทิตย์</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เวลาเริ่ม (ไม่บังคับ)</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isSaving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เวลาสิ้นสุด (ไม่บังคับ)</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="submit"
              disabled={isSaving || !selectedSubject}
              className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  บันทึกเข้าตารางสอน
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            รายวิชาที่สอน
          </h2>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
            {subjects.length} วิชา
          </span>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        ) : subjects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>ยังไม่มีรายวิชาที่สอน กรุณาเพิ่มรายวิชาด้านบน</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {subjects.map(subject => (
              <div key={subject.id} className="hover:bg-gray-50 transition-colors">
                <div 
                  className="p-4 sm:p-6 cursor-pointer flex flex-col lg:flex-row gap-4 sm:gap-6"
                  onClick={() => toggleExpand(subject.id)}
                >
                  {/* Subject Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md font-mono">
                            {subject.subject_code}
                          </span>
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">
                            {subject.theory_hours || 0}-{subject.practical_hours || 0}-{subject.credits || 0}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          {subject.subject_name}
                          {expandedId === subject.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </h3>
                      </div>
                      
                      
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => handleEditClick(subject, e)}
                          className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="แก้ไขรายละเอียด"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(subject.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบรายวิชา"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">ปีการศึกษา:</span> 
                        {subject.academic_year || '-'}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">เวลาเรียน:</span> 
                        {subject.teaching_day ? `วัน${subject.teaching_day}` : '-'} {subject.start_time ? `${subject.start_time.slice(0,5)} - ${subject.end_time?.slice(0,5)}` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Copy Action */}
                  <div className="w-full lg:w-[35%] flex flex-col sm:flex-row lg:flex-col gap-2 justify-center items-stretch sm:items-end" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleCopyMarkdown(subject)}
                      className={`flex items-center justify-center gap-1.5 px-4 py-2 w-full lg:w-auto rounded-xl text-sm font-semibold transition-all ${
                        copiedId === subject.id 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {copiedId === subject.id ? (
                        <>
                          <Check className="w-4 h-4" /> คัดลอกแล้ว
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> คัดลอกข้อมูลวิชา
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === subject.id && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/50">
                    {editingId === subject.id ? (
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                            <Edit2 className="w-4 h-4" /> แก้ไขข้อมูลรายวิชา (แก้แล้วบันทึกลงฐานข้อมูลกลาง)
                          </h4>
                          <button 
                            onClick={() => { setEditingId(null); setEditData(null); setShowAIAssistant(false); }}
                            className="p-1 text-gray-400 hover:bg-gray-200 rounded"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อวิชาภาษาอังกฤษ</label>
                          <input 
                            type="text" 
                            value={editData.subject_name_en || ''} 
                            onChange={(e) => setEditData({...editData, subject_name_en: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">อ้างอิงมาตรฐาน</label>
                          <textarea 
                            value={editData.reference_standard || ''} 
                            onChange={(e) => setEditData({...editData, reference_standard: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[60px]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ผลลัพธ์การเรียนรู้ระดับรายวิชา</label>
                          <textarea 
                            value={editData.learning_outcomes || ''} 
                            onChange={(e) => setEditData({...editData, learning_outcomes: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[60px]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">จุดประสงค์รายวิชา</label>
                          <textarea 
                            value={editData.objectives || ''} 
                            onChange={(e) => setEditData({...editData, objectives: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">สมรรถนะรายวิชา</label>
                          <textarea 
                            value={editData.competencies || ''} 
                            onChange={(e) => setEditData({...editData, competencies: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">คำอธิบายรายวิชา</label>
                          <textarea 
                            value={editData.description || ''} 
                            onChange={(e) => setEditData({...editData, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[120px]"
                          />
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                              <label className="block text-sm font-medium text-gray-700">โครงสร้างเนื้อหาหลักสูตร (Syllabus Markdown)</label>
                              
                              <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                                <button 
                                  type="button"
                                  onClick={() => setIsPreviewSyllabus(false)}
                                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-md transition-colors ${!isPreviewSyllabus ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                  <Code className="w-3.5 h-3.5" />
                                  แก้ไข
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => setIsPreviewSyllabus(true)}
                                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-md transition-colors ${isPreviewSyllabus ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  ดูตัวอย่าง
                                </button>
                              </div>
                            </div>

                            {!showAIAssistant && (
                              <button
                                type="button"
                                onClick={() => setShowAIAssistant(true)}
                                className="flex items-center justify-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors w-full sm:w-auto"
                              >
                                <Sparkles className="w-4 h-4" />
                                AI ร่างหลักสูตร
                              </button>
                            )}
                          </div>
                          
                          <div className={`flex flex-col ${showAIAssistant ? 'xl:flex-row' : ''} gap-4`}>
                            {isPreviewSyllabus ? (
                              <div className={`w-full px-4 py-4 border border-gray-300 rounded-lg text-sm min-h-[400px] max-h-[600px] overflow-y-auto bg-gray-50 prose prose-sm prose-indigo max-w-none ${showAIAssistant ? 'flex-1' : ''}`}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {editData.syllabus_markdown || '*ยังไม่มีเนื้อหา*'}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <textarea 
                                value={editData.syllabus_markdown || ''} 
                                onChange={(e) => setEditData({...editData, syllabus_markdown: e.target.value})}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[400px] font-mono ${showAIAssistant ? 'flex-1' : ''}`}
                                placeholder="# โครงสร้างเนื้อหาหลักสูตร..."
                              />
                            )}
                            
                            {showAIAssistant && (
                              <div className="xl:w-[450px] shrink-0 border border-indigo-100 rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px] xl:h-auto">
                                <SubjectAIAssistant 
                                  subjectData={editData}
                                  onClose={() => setShowAIAssistant(false)}
                                  onApplyMarkdown={(markdown, isReplace = false) => {
                                    setEditData(prev => ({ 
                                      ...prev, 
                                      syllabus_markdown: isReplace 
                                        ? markdown 
                                        : (prev.syllabus_markdown ? prev.syllabus_markdown + '\n\n' + markdown : markdown) 
                                    }));
                                    if (isReplace) {
                                      setIsPreviewSyllabus(true);
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-2">
                          <button 
                            type="button"
                            onClick={() => { setEditingId(null); setEditData(null); setShowAIAssistant(false); }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                            disabled={isSaving}
                          >
                            ยกเลิก
                          </button>
                          <button 
                            type="button"
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                            disabled={isSaving}
                          >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            บันทึกการแก้ไข
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 text-sm">
                        {subject.subject_name_en && (
                          <div>
                            <h4 className="font-bold text-indigo-900 mb-1">ชื่อวิชาภาษาอังกฤษ</h4>
                            <p className="text-gray-700">{subject.subject_name_en}</p>
                          </div>
                        )}

                        {subject.reference_standard && (
                          <div>
                            <h4 className="font-bold text-indigo-900 mb-2">อ้างอิงมาตรฐาน</h4>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{subject.reference_standard}</p>
                          </div>
                        )}

                        {subject.learning_outcomes && (
                          <div>
                            <h4 className="font-bold text-indigo-900 mb-2">ผลลัพธ์การเรียนรู้ระดับรายวิชา</h4>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{subject.learning_outcomes}</p>
                          </div>
                        )}

                        {subject.objectives && (
                          <div>
                            <h4 className="font-bold text-indigo-900 mb-2">จุดประสงค์รายวิชา</h4>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{subject.objectives}</p>
                          </div>
                        )}
                        
                        {subject.competencies && (
                          <div>
                            <h4 className="font-bold text-indigo-900 mb-2">สมรรถนะรายวิชา</h4>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{subject.competencies}</p>
                          </div>
                        )}
                        
                        {subject.description && (
                          <div>
                            <h4 className="font-bold text-indigo-900 mb-2">คำอธิบายรายวิชา</h4>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{subject.description}</p>
                          </div>
                        )}
                        
                        {subject.syllabus_markdown && (
                          <div className="mt-4 border-t pt-4">
                            <h4 className="font-bold text-indigo-900 mb-4">โครงสร้างเนื้อหาหลักสูตร</h4>
                            <div className="prose prose-sm prose-indigo max-w-none bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {subject.syllabus_markdown}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}

                        {!subject.objectives && !subject.competencies && !subject.description && (
                          <div className="text-gray-500 italic">ไม่มีข้อมูลรายละเอียดสำหรับรายวิชานี้ในระบบ</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
