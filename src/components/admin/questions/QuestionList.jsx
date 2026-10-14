import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Upload, 
  FileDown, 
  CheckCircle2, 
  HelpCircle, 
  GripVertical,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

export default function QuestionList({
  selectedBank,
  selectedSubject,
  questions = [],
  loading = false,
  onOpenCreateQuestion,
  onOpenEditQuestion,
  onDeleteQuestion,
  onImportGift,
  onOpenEditExamSet,
  setDraggingItem
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showImporter, setShowImporter] = useState(false);
  const [txtContent, setTxtContent] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Drag start สำหรับข้อสอบรายข้อ (ลากไปปล่อยที่วิชาหรือชุดข้อสอบอื่น)
  const handleQuestionDragStart = (e, question) => {
    const payload = {
      type: 'question',
      data: question,
      fromBankId: selectedBank?.id
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(payload));
    if (setDraggingItem) setDraggingItem(payload);
  };

  const handleDragEnd = () => {
    if (setDraggingItem) setDraggingItem(null);
  };

  // Import GIFT Text
  const handleImportSubmit = async () => {
    if (!txtContent.trim() || !selectedBank) return;
    setIsImporting(true);
    try {
      await onImportGift(selectedBank.id, txtContent);
      setTxtContent('');
      setShowImporter(false);
    } catch (err) {
      // error handled in parent
    } finally {
      setIsImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const txt = "// ตัวอย่างรูปแบบข้อสอบ GIFT (คัดลอกไปแก้แล้วนำเข้าได้ทันที)\nข้อใดคือเมืองหลวงของประเทศไทย?{\n=กรุงเทพมหานคร\n~เชียงใหม่\n~ภูเก็ต\n~ขอนแก่น\n}\n\n1 + 1 มีค่าเท่ากับเท่าไร?{\n=2\n~3\n~4\n~5\n}\n";
    const blob = new Blob(['\uFEFF' + txt], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'question_template.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTxtContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  if (!selectedBank) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-zinc-200/80 h-full flex flex-col items-center justify-center text-zinc-400 p-8 text-center">
        <div className="p-4 bg-purple-50 text-purple-600 rounded-3xl mb-4">
          <Layers className="w-12 h-12" />
        </div>
        <h3 className="text-base font-bold text-zinc-800">
          โปรดเลือกชุดข้อสอบ
        </h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm">
          เลือกรายวิชาและชุดข้อสอบจากเมนูด้านซ้าย หรือกดปุ่มเครื่องหมาย <b>+</b> เพื่อสร้างชุดข้อสอบใหม่
        </p>
      </div>
    );
  }

  const filteredQuestions = questions.filter(q =>
    (q.question_text || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-zinc-200/80 h-full flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-zinc-100 bg-zinc-50/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500">
              {selectedSubject ? `${selectedSubject.subject_code ? selectedSubject.subject_code + ' - ' : ''}${selectedSubject.subject_name}` : 'คลังทั่วไป'}
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">
              ชุดข้อสอบ
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              {selectedBank.parsedExamTitle || selectedBank.title}
            </h2>
            <button
              onClick={() => onOpenEditExamSet(selectedBank, selectedSubject)}
              className="p-1 text-zinc-400 hover:text-purple-600 rounded-lg hover:bg-zinc-100 transition-colors"
              title="แก้ไขชื่อชุดข้อสอบ"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            มีข้อสอบทั้งหมด {questions.length} ข้อ •{' '}
            <span className="text-indigo-600 font-medium inline-flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3" />
              สามารถจับลากข้อสอบไปปล่อยใส่วิชาอื่นทางซ้ายได้ทันที
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImporter(!showImporter)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              showImporter
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>นำเข้าไฟล์ GIFT</span>
          </button>

          <button
            onClick={onOpenCreateQuestion}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มข้อสอบ</span>
          </button>
        </div>
      </div>

      {/* Bulk Importer Drawer (เมื่อเปิดใช้งาน) */}
      {showImporter && (
        <div className="p-4 bg-purple-50/50 border-b border-purple-100 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-bold text-zinc-800">
                นำเข้าข้อสอบหลายข้อด้วยรูปแบบ GIFT
              </h3>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center gap-1 text-[11px] bg-white hover:bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg border border-zinc-200 transition-colors cursor-pointer"
            >
              <FileDown className="w-3 h-3" /> ดาวน์โหลดตัวอย่างไฟล์
            </button>
          </div>

          <textarea
            value={txtContent}
            onChange={e => setTxtContent(e.target.value)}
            onDragOver={e => { e.preventDefault(); setIsDraggingFile(true); }}
            onDragLeave={() => setIsDraggingFile(false)}
            onDrop={handleFileDrop}
            rows={4}
            className={`w-full p-3 border rounded-xl text-xs font-mono resize-y transition-colors ${
              isDraggingFile 
                ? 'border-purple-500 bg-purple-100/50 ring-2 ring-purple-300' 
                : 'border-zinc-200 bg-white'
            }`}
            placeholder="วางข้อความ GIFT หรือลากไฟล์ .txt มาวางที่นี่..."
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowImporter(false)}
              className="px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl"
            >
              ปิด
            </button>
            <button
              onClick={handleImportSubmit}
              disabled={isImporting || !txtContent.trim()}
              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              {isImporting ? 'กำลังนำเข้า...' : 'ประมวลผลและนำเข้า'}
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-3 border-b border-zinc-100 bg-white">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="ค้นหาโจทย์ข้อสอบในชุดนี้..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Question Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/30">
        {filteredQuestions.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 text-xs">
            <HelpCircle className="w-10 h-10 mx-auto mb-2 opacity-30 text-zinc-400" />
            <p className="font-semibold text-zinc-600">ยังไม่มีข้อสอบในชุดนี้</p>
            <p className="text-[11px] text-zinc-400 mt-1">
              คลิกปุ่ม "+ เพิ่มข้อสอบ" หรือนำเข้าด้วยไฟล์ GIFT ด้านบน
            </p>
          </div>
        ) : (
          filteredQuestions.map((question, idx) => (
            <div
              key={question.id}
              draggable
              onDragStart={e => handleQuestionDragStart(e, question)}
              onDragEnd={handleDragEnd}
              className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all group relative cursor-default"
            >
              {/* Question Header & Action Buttons */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  {/* Drag Handle */}
                  <div 
                    className="p-1 -ml-1 text-zinc-300 group-hover:text-indigo-500 cursor-grab active:cursor-grabbing shrink-0 mt-0.5 rounded hover:bg-indigo-50 transition-colors"
                    title="จับลากข้อสอบข้อนี้ไปปล่อยที่วิชาหรือชุดข้อสอบอื่นได้"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-zinc-400 mr-1.5 uppercase">
                      ข้อที่ {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-zinc-900 leading-relaxed">
                      {question.question_text}
                    </p>
                  </div>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => onOpenEditQuestion(question)}
                    className="p-1.5 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-zinc-200 shadow-xs"
                    title="แก้ไขข้อสอบ"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteQuestion(question)}
                    className="p-1.5 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-zinc-200 shadow-xs"
                    title="ลบข้อสอบ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Choices Grid */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                {(question.choices || []).map((choice, cIdx) => {
                  const isCorrect = cIdx === question.correct_answer_index || Boolean(choice.is_correct);
                  return (
                    <div
                      key={cIdx}
                      className={`text-xs px-3 py-2 rounded-xl border flex items-center gap-2 transition-colors ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold'
                          : 'bg-zinc-50/50 border-zinc-200/80 text-zinc-600'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 shrink-0" />
                      )}
                      <span className="truncate">{choice.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
