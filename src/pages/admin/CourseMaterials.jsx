import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTeacherSubjects } from '../../contexts/TeacherSubjectsContext';
import { updateTeacherSubject } from '../../services/teacherSubjectService';
import SubjectAIAssistant from '../../components/admin/SubjectAIAssistant';
import { Loader2, Check, Sparkles, BookOpen, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CourseMaterials() {
  const { subjectId } = useParams();
  const { subjects, refreshSubjects } = useTeacherSubjects();
  
  const [subject, setSubject] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  
  // Parsed topics for the right panel
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (subjects.length > 0 && subjectId) {
      const found = subjects.find(s => s.id === subjectId);
      if (found) {
        setSubject(found);
        setMarkdown(found.syllabus_markdown || '');
      }
    }
  }, [subjects, subjectId]);

  useEffect(() => {
    if (!markdown) {
      setTopics([]);
      return;
    }
    const lines = markdown.split('\n');
    const extracted = [];
    
    lines.forEach(line => {
      const headerMatch = line.match(/^(#{1,3})\s+(.+)$/);
      if (headerMatch) {
        extracted.push({
          level: headerMatch[1].length,
          title: headerMatch[2].trim(),
          content: []
        });
      }
    });
    setTopics(extracted);
  }, [markdown]);

  const handleDownloadMarkdown = (topic) => {
    const safeTitle = topic.title.replace(/[\/\\?%*:|"<>]/g, '-');
    const fileName = `${safeTitle}.md`;
    const template = `# ${topic.title}
วิชา: ${subject.subject_code} ${subject.subject_name}

## 🎯 จุดประสงค์การเรียนรู้
- (ระบุสิ่งที่ผู้เรียนจะทำได้หลังจากเรียนจบหัวข้อนี้)

## 📚 เนื้อหาบทเรียน
- (เขียนรายละเอียดเนื้อหาที่นี่...)

## 📝 กิจกรรม / ใบงาน
- (ระบุโจทย์หรือกิจกรรมสำหรับนักเรียน)

## 🔗 สื่ออ้างอิง
- 
`;
    const blob = new Blob([template], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateTeacherSubject(subjectId, { syllabus_markdown: markdown });
      await refreshSubjects();
      const { updateCurriculumSubjectByCode } = await import('../../services/curriculumService');
      await updateCurriculumSubjectByCode(subject.subject_code, { syllabus_markdown: markdown }).catch(() => {});
      
      alert('บันทึกโครงสร้างรายวิชาเรียบร้อยแล้ว');
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!subject) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" /></div>;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {subject.subject_code} {subject.subject_name}
            </h1>
            <p className="text-gray-500 font-medium">จัดการสื่อการสอนและโครงสร้างรายวิชา</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
            บันทึกโครงสร้าง
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Markdown Workspace */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[750px]">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-3 px-4 flex justify-between items-center shrink-0">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                ร่างโครงสร้างเนื้อหา (Syllabus)
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="px-3 py-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isPreview ? 'กลับไปแก้ไข' : 'ดูตัวอย่าง'}
                </button>
                <button
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors border ${
                    showAIAssistant 
                      ? 'bg-purple-100 text-purple-700 border-purple-200' 
                      : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  AI ผู้ช่วย
                </button>
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-y-auto bg-white p-4">
                {isPreview ? (
                  <div className="prose prose-sm prose-indigo max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {markdown || '*ยังไม่มีเนื้อหาหลักสูตร*'}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <textarea 
                    value={markdown} 
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="w-full h-full min-h-[500px] resize-none border-0 focus:ring-0 text-sm font-mono leading-relaxed"
                    placeholder="# โครงสร้างเนื้อหาหลักสูตร... (พิมพ์ที่นี่หรือให้ AI ช่วยร่าง)"
                  />
                )}
              </div>

              {/* AI Assistant Sidebar (Internal) */}
              {showAIAssistant && (
                <div className="w-80 shrink-0 border-l border-gray-200 bg-gray-50 flex flex-col">
                  <SubjectAIAssistant 
                    subjectData={{ ...subject, syllabus_markdown: markdown }}
                    onClose={() => setShowAIAssistant(false)}
                    onApplyMarkdown={(newMarkdown, isReplace = false) => {
                      setMarkdown(isReplace 
                          ? newMarkdown 
                          : (markdown ? markdown + '\n\n' + newMarkdown : newMarkdown)
                      );
                      if (isReplace) setIsPreview(true);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Extracted Topics & Workflows */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-[750px]">
            <h2 className="text-lg font-bold text-gray-800 mb-1">จัดการสื่อการสอนแต่ละหัวข้อ</h2>
            <p className="text-sm text-gray-500 mb-6">ระบบจะดึงหัวข้อจาก Syllabus ด้านซ้ายอัตโนมัติ เพื่อนำไปสร้างสื่อและใบงานต่อ</p>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {topics.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                  <FileText className="w-12 h-12 opacity-20" />
                  <p className="text-sm text-center">ยังไม่พบหัวข้อเนื้อหา<br/>กรุณาเพิ่ม # หรือ ## ในโครงสร้างด้านซ้าย</p>
                </div>
              ) : (
                topics.map((topic, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${topic.level === 1 ? 'border-indigo-200 bg-indigo-50/50' : 'border-gray-200 bg-white'} hover:border-indigo-300 transition-colors group`}>
                    <h3 className={`font-semibold text-gray-800 mb-3 line-clamp-2 ${topic.level === 1 ? 'text-base' : 'text-sm'}`}>
                      {topic.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleDownloadMarkdown(topic)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        ดาวน์โหลดไฟล์ .md (โครงร่างเนื้อหา)
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
