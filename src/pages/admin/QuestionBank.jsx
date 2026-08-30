import { useState, useEffect } from 'react';
import { useQuestionBank } from '../../hooks/useQuestionBank';
import { 
  FileText, 
  Upload, 
  Plus, 
  Trash2, 
  FileDown, 
  Pencil, 
  X, 
  Check, 
  AlertCircle, 
  Search, 
  HelpCircle,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function QuestionBank() {
  const { user } = useAuth();
  const {
    banks, loading, error: hookError, selectedBank, setSelectedBank, questions,
    loadBanks, loadQuestions, createBank, updateBank, deleteBank,
    createQuestion, updateQuestion, deleteQuestion, importGiftQuestions
  } = useQuestionBank();

  const [newBankTitle, setNewBankTitle] = useState('');
  const [searchQuestion, setSearchQuestion] = useState('');
  
  // Importer State
  const [txtContent, setTxtContent] = useState('');
  const [importing, setImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Bank Edit Modal
  const [editingBank, setEditingBank] = useState(null);
  const [editBankTitle, setEditBankTitle] = useState('');
  const [updatingBank, setUpdatingBank] = useState(false);

  // Bank Delete Modal
  const [deletingBank, setDeletingBank] = useState(null);
  const [deletingBankLoading, setDeletingBankLoading] = useState(false);

  // Single Question Create Modal
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [singleQText, setSingleQText] = useState('');
  const [singleChoices, setSingleChoices] = useState([
    { text: '', is_correct: true },
    { text: '', is_correct: false },
    { text: '', is_correct: false },
    { text: '', is_correct: false },
  ]);
  const [savingQuestion, setSavingQuestion] = useState(false);

  // Single Question Edit Modal
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editQText, setEditQText] = useState('');
  const [editChoices, setEditChoices] = useState([]);
  const [updatingQuestion, setUpdatingQuestion] = useState(false);

  // Question Delete Modal
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [deletingQuestionLoading, setDeletingQuestionLoading] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    loadBanks();
  }, [loadBanks]);

  useEffect(() => {
    if (selectedBank) {
      loadQuestions(selectedBank.id);
    }
  }, [selectedBank, loadQuestions]);

  useEffect(() => {
    if (!selectedBank && banks.length > 0) {
      setSelectedBank(banks[0]);
    }
  }, [banks, selectedBank, setSelectedBank]);




  // 1. Create Bank
  const handleCreateBank = async (e) => {
    e.preventDefault();
    if (!newBankTitle.trim()) return;
    try {
      const data = await createBank(newBankTitle.trim(), user?.id);
      showToast('success', `สร้างคลัง "${newBankTitle}" สำเร็จ!`);
      setNewBankTitle('');
      setSelectedBank(data);
    } catch (err) {
      showToast('error', 'สร้างไม่สำเร็จ: ' + err.message);
    }
  };

  // 2. Edit Bank
  const handleOpenEditBank = (bank) => {
    setEditingBank(bank);
    setEditBankTitle(bank.title);
  };

  const handleUpdateBank = async (e) => {
    e.preventDefault();
    if (!editingBank || !editBankTitle.trim()) return;
    setUpdatingBank(true);
    try {
      await updateBank(editingBank.id, editBankTitle.trim());
      showToast('success', 'เปลี่ยนชื่อคลังข้อสอบสำเร็จ!');
      if (selectedBank?.id === editingBank.id) {
        setSelectedBank({ ...selectedBank, title: editBankTitle.trim() });
      }
      setEditingBank(null);
    } catch (err) {
      showToast('error', 'แก้ไขไม่สำเร็จ: ' + err.message);
    } finally {
      setUpdatingBank(false);
    }
  };

  // 3. Delete Bank
  const handleConfirmDeleteBank = async () => {
    if (!deletingBank) return;
    setDeletingBankLoading(true);
    try {
      await deleteBank(deletingBank.id);
      showToast('success', `ลบคลังข้อสอบ "${deletingBank.title}" สำเร็จ`);
      if (selectedBank?.id === deletingBank.id) {
        setSelectedBank(null);
      }
      setDeletingBank(null);
    } catch (err) {
      showToast('error', 'ลบคลังข้อสอบไม่สำเร็จ: ' + err.message);
    } finally {
      setDeletingBankLoading(false);
    }
  };

  // 4. Create Single Question
  const handleOpenCreateQuestion = () => {
    setSingleQText('');
    setSingleChoices([
      { text: '', is_correct: true },
      { text: '', is_correct: false },
      { text: '', is_correct: false },
      { text: '', is_correct: false },
    ]);
    setIsCreateQuestionOpen(true);
  };

  const handleSaveSingleQuestion = async (e) => {
    e.preventDefault();
    if (!selectedBank) return;
    if (!singleQText.trim()) {
      showToast('error', 'กรุณาระบุโจทย์คำถาม');
      return;
    }

    const filledChoices = singleChoices.filter(c => c.text.trim() !== '');
    if (filledChoices.length < 2) {
      showToast('error', 'กรุณากรอกตัวเลือกอย่างน้อย 2 ตัวเลือก');
      return;
    }

    const correctIdx = filledChoices.findIndex(c => c.is_correct);
    if (correctIdx === -1) {
      showToast('error', 'กรุณาเลือกตัวเลือกที่ถูกต้อง 1 ข้อ');
      return;
    }

    setSavingQuestion(true);
    try {
      await createQuestion(selectedBank.id, {
        question_text: singleQText.trim(),
        choices: filledChoices,
        correct_answer_index: correctIdx
      });

      showToast('success', 'เพิ่มข้อสอบสำเร็จ!');
      setIsCreateQuestionOpen(false);
    } catch (err) {
      showToast('error', 'เกิดข้อผิดพลาด: ' + err.message);
    } finally {
      setSavingQuestion(false);
    }
  };

  // 5. Edit Question
  const handleOpenEditQuestion = (q) => {
    setEditingQuestion(q);
    setEditQText(q.question_text || '');
    // clone choices
    const choices = (q.choices || []).map((c, i) => ({
      text: c.text,
      is_correct: i === q.correct_answer_index || c.is_correct
    }));
    setEditChoices(choices);
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!editingQuestion || !selectedBank) return;
    if (!editQText.trim()) {
      showToast('error', 'กรุณาระบุโจทย์คำถาม');
      return;
    }

    const filledChoices = editChoices.filter(c => c.text.trim() !== '');
    if (filledChoices.length < 2) {
      showToast('error', 'กรุณากรอกตัวเลือกอย่างน้อย 2 ตัวเลือก');
      return;
    }

    const correctIdx = filledChoices.findIndex(c => c.is_correct);
    if (correctIdx === -1) {
      showToast('error', 'กรุณาเลือกตัวเลือกที่ถูกต้อง 1 ข้อ');
      return;
    }

    setUpdatingQuestion(true);
    try {
      await updateQuestion(selectedBank.id, editingQuestion.id, {
        question_text: editQText.trim(),
        choices: filledChoices,
        correct_answer_index: correctIdx
      });

      showToast('success', 'อัปเดตข้อสอบสำเร็จ!');
      setEditingQuestion(null);
    } catch (err) {
      showToast('error', 'แก้ไขไม่สำเร็จ: ' + err.message);
    } finally {
      setUpdatingQuestion(false);
    }
  };

  // 6. Delete Question
  const handleConfirmDeleteQuestion = async () => {
    if (!deletingQuestion || !selectedBank) return;
    setDeletingQuestionLoading(true);
    try {
      await deleteQuestion(selectedBank.id, deletingQuestion.id);
      showToast('success', 'ลบข้อสอบเรียบร้อยแล้ว');
      setDeletingQuestion(null);
    } catch (err) {
      showToast('error', 'ลบไม่สำเร็จ: ' + err.message);
    } finally {
      setDeletingQuestionLoading(false);
    }
  };

  // 7. Bulk Import Questions
  const handleImportText = async () => {
    if (!selectedBank || !txtContent.trim()) return;
    setImporting(true);

    try {
      const count = await importGiftQuestions(selectedBank.id, txtContent);
      showToast('success', `นำเข้าข้อสอบ ${count} ข้อสำเร็จ!`);
      setTxtContent('');
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const txt = "// ตัวอย่างรูปแบบข้อสอบ GIFT (คัดลอกไปแก้แล้วนำเข้าได้ทันที)\nข้อใดคือเมืองหลวงของประเทศไทย?{\n=กรุงเทพมหานคร\n~เชียงใหม่\n~ภูเก็ต\n~ขอนแก่น\n}\n\n1 + 1 มีค่าเท่ากับเท่าไร?{\n=2\n~3\n~4\n~5\n}\n";
    const blob = new Blob(['\uFEFF' + txt], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "question_template.txt");
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
        setTxtContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const filteredQuestions = questions.filter(q => 
    (q.question_text || '').toLowerCase().includes(searchQuestion.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 left-4 sm:left-auto z-50 flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
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
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              คลังข้อสอบ (Question Bank)
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              สร้าง แก้ไข จัดการคลังและข้อสอบ พร้อมระบบนำเข้าอัตโนมัติ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-purple-50 px-4 py-2 rounded-xl text-purple-700 font-bold text-sm border border-purple-100 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            คลังข้อสอบทั้งหมด: {banks.length} คลัง
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-12rem)] lg:h-[calc(100vh-12rem)]">
        
        {/* Left Column: Bank List */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
            <form onSubmit={handleCreateBank} className="flex gap-2">
              <input 
                value={newBankTitle} 
                onChange={e => setNewBankTitle(e.target.value)} 
                type="text" 
                placeholder="ชื่อคลังข้อสอบใหม่..." 
                className="flex-1 px-3 py-2 text-xs border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-white" 
              />
              <button 
                type="submit" 
                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-sm cursor-pointer"
                title="สร้างคลังข้อสอบ"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-auto divide-y divide-zinc-100 p-2 space-y-1">
            {banks.map(b => (
              <div 
                key={b.id} 
                onClick={() => setSelectedBank(b)}
                className={`p-3 rounded-xl cursor-pointer flex items-center justify-between group transition-all ${
                  selectedBank?.id === b.id 
                    ? 'bg-indigo-50/80 border border-indigo-200 text-indigo-900 shadow-xs' 
                    : 'hover:bg-zinc-50 text-zinc-700'
                }`}
              >
                <div className="font-semibold text-xs truncate pr-2 flex items-center gap-2">
                  <FileText className={`w-4 h-4 shrink-0 ${selectedBank?.id === b.id ? 'text-indigo-600' : 'text-zinc-400'}`} />
                  <span className="truncate">{b.title}</span>
                </div>
                
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleOpenEditBank(b); }}
                    className="p-1 text-zinc-400 hover:text-indigo-600 hover:bg-white rounded"
                    title="เปลี่ยนชื่อคลัง"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDeletingBank(b); }}
                    className="p-1 text-zinc-400 hover:text-rose-600 hover:bg-white rounded"
                    title="ลบคลังข้อสอบ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {banks.length === 0 && !loading && (
              <div className="p-8 text-center text-xs text-zinc-400">
                ยังไม่มีคลังข้อสอบ<br />พิมพ์ชื่อแล้วกดเครื่องหมาย + ด้านบน
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Questions & Import */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 lg:col-span-3 flex flex-col overflow-hidden relative">
          {!selectedBank ? (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 p-8 text-center">
              <FileText className="w-16 h-16 mb-4 text-zinc-200" />
              <p className="text-base font-bold text-zinc-700">โปรดเลือกหรือสร้างคลังข้อสอบ</p>
              <p className="text-xs text-zinc-500 mt-1">เพื่อดู สร้าง แก้ไข และนำเข้าข้อสอบในคลัง</p>
            </div>
          ) : (
            <>
              {/* Bank Title & Actions Header */}
              <div className="p-4 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      {selectedBank.title}
                      <button 
                        onClick={() => handleOpenEditBank(selectedBank)}
                        className="p-1 text-zinc-400 hover:text-indigo-600 rounded cursor-pointer"
                        title="แก้ไขชื่อคลัง"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </h2>
                    <p className="text-xs text-zinc-500">ข้อสอบทั้งหมด: {questions.length} ข้อ</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenCreateQuestion}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มข้อสอบเดี่ยว</span>
                  </button>
                </div>
              </div>

              {/* Content Grid: Questions List + Bulk Importer */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                
                {/* Questions List */}
                <div className="flex-1 overflow-auto p-4 space-y-3 border-r border-zinc-100">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="ค้นหาข้อสอบในคลัง..."
                      value={searchQuestion}
                      onChange={e => setSearchQuestion(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-xl focus:border-indigo-500"
                    />
                  </div>

                  {filteredQuestions.length === 0 ? (
                    <div className="text-center py-12 text-xs text-zinc-400">
                      <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      ยังไม่มีข้อสอบในคลังนี้<br />คลิก "+ เพิ่มข้อสอบเดี่ยว" หรือนำเข้าจากกล่องขวามือ
                    </div>
                  ) : (
                    filteredQuestions.map((q, idx) => (
                      <div key={q.id} className="bg-zinc-50/80 p-3.5 rounded-xl border border-zinc-200/80 relative group hover:border-indigo-200 transition-colors">
                        <div className="absolute top-2.5 right-2.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <button 
                            onClick={() => handleOpenEditQuestion(q)} 
                            className="p-1.5 text-zinc-600 hover:text-indigo-600 bg-white rounded-lg border border-zinc-200 shadow-xs cursor-pointer"
                            title="แก้ไขข้อสอบ"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => setDeletingQuestion(q)} 
                            className="p-1.5 text-zinc-600 hover:text-rose-600 bg-white rounded-lg border border-zinc-200 shadow-xs cursor-pointer"
                            title="ลบข้อสอบ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="font-bold text-xs text-zinc-900 pr-16 leading-relaxed">
                          {idx + 1}. {q.question_text}
                        </p>

                        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {q.choices.map((c, i) => {
                            const isCorrect = i === q.correct_answer_index || c.is_correct;
                            return (
                              <div 
                                key={i} 
                                className={`text-[11px] px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                                  isCorrect 
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold' 
                                    : 'bg-white border-zinc-200 text-zinc-600'
                                }`}
                              >
                                {isCorrect ? <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> : <div className="w-3 h-3 rounded-full border border-zinc-300 shrink-0" />}
                                <span className="truncate">{c.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bulk Importer */}
                <div className="w-full md:w-[360px] p-4 flex flex-col bg-zinc-50/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xs text-zinc-800 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-purple-600" /> นำเข้าข้อสอบหลายข้อ
                    </h3>
                    <button 
                      onClick={handleDownloadTemplate} 
                      className="flex items-center gap-1 text-[11px] bg-white hover:bg-zinc-100 text-zinc-700 px-2 py-1 rounded-lg border border-zinc-200 transition-colors cursor-pointer"
                    >
                      <FileDown className="w-3 h-3" /> ตัวอย่าง GIFT
                    </button>
                  </div>
                  
                  <div className="text-[10px] text-zinc-500 mb-2 space-y-0.5">
                    <p><b>รูปแบบไฟล์ Text (GIFT):</b></p>
                    <pre className="bg-white p-2 rounded-lg font-mono text-[9.5px] text-zinc-700 border border-zinc-200">
{`โจทย์คำถาม?{
=ตัวเลือกที่ถูก
~ตัวเลือกที่ผิด
~ตัวเลือกที่ผิด
}`}
                    </pre>
                  </div>

                  <textarea 
                    value={txtContent}
                    onChange={e => setTxtContent(e.target.value)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex-1 w-full p-2.5 border rounded-xl text-xs font-mono resize-none min-h-[140px] transition-colors ${
                      isDragging ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-zinc-200 bg-white'
                    }`}
                    placeholder="วางข้อความ GIFT หรือลากไฟล์ .txt มาปล่อย..."
                  />
                  
                  <button 
                    onClick={handleImportText}
                    disabled={importing || !txtContent.trim()}
                    className="mt-3 w-full bg-purple-600 text-white font-bold py-2 rounded-xl text-xs hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
                  >
                    {importing ? 'กำลังนำเข้า...' : 'ประมวลผลและนำเข้าข้อสอบ'}
                  </button>
                </div>

              </div>
            </>
          )}
        </div>

      </div>

      {/* EDIT BANK MODAL */}
      {editingBank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" /> เปลี่ยนชื่อคลังข้อสอบ
              </h3>
              <button onClick={() => setEditingBank(null)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdateBank} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">ชื่อคลังข้อสอบ</label>
                <input
                  required
                  value={editBankTitle}
                  onChange={e => setEditBankTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:border-indigo-500"
                />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setEditingBank(null)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">ยกเลิก</button>
                <button disabled={updatingBank} type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                  {updatingBank ? 'กำลังบันทึก...' : 'บันทึก'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE BANK MODAL */}
      {deletingBank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันลบคลังข้อสอบ?</h3>
              <p className="text-xs text-zinc-600 mt-1">
                คุณต้องการลบคลังข้อสอบ "<strong>{deletingBank.title}</strong>" พร้อมข้อสอบทั้งหมดในคลังนี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setDeletingBank(null)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={deletingBankLoading} onClick={handleConfirmDeleteBank} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">
                {deletingBankLoading ? 'กำลังลบ...' : 'ยืนยันการลบ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE SINGLE QUESTION MODAL */}
      {isCreateQuestionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" /> เพิ่มข้อสอบใหม่ในคลัง
              </h3>
              <button onClick={() => setIsCreateQuestionOpen(false)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSingleQuestion} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">โจทย์คำถาม *</label>
                <textarea
                  required
                  rows={3}
                  value={singleQText}
                  onChange={e => setSingleQText(e.target.value)}
                  placeholder="ระบุข้อความคำถาม..."
                  className="w-full p-2.5 border border-zinc-200 rounded-xl focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-zinc-700">ตัวเลือกคำตอบ (เลือกปุ่มกลมหน้ารายการที่ถูกต้อง) *</label>
                {singleChoices.map((choice, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={choice.is_correct}
                      onChange={() => {
                        setSingleChoices(singleChoices.map((c, idx) => ({
                          ...c,
                          is_correct: idx === i
                        })));
                      }}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      title="เลือกเป็นข้อที่ถูกต้อง"
                    />
                    <input
                      type="text"
                      required={i < 2}
                      value={choice.text}
                      onChange={e => {
                        const next = [...singleChoices];
                        next[i].text = e.target.value;
                        setSingleChoices(next);
                      }}
                      placeholder={`ตัวเลือกที่ ${i + 1}${choice.is_correct ? ' (ข้อที่ถูกต้อง ✓)' : ''}`}
                      className={`flex-1 px-3 py-2 border rounded-xl ${choice.is_correct ? 'border-emerald-500 bg-emerald-50/30' : 'border-zinc-200'}`}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setIsCreateQuestionOpen(false)} className="flex-1 py-2.5 border rounded-xl font-semibold">ยกเลิก</button>
                <button disabled={savingQuestion} type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                  {savingQuestion ? 'กำลังบันทึก...' : 'บันทึกข้อสอบ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT QUESTION MODAL */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Pencil className="w-5 h-5 text-indigo-600" /> แก้ไขข้อสอบ
              </h3>
              <button onClick={() => setEditingQuestion(null)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateQuestion} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">โจทย์คำถาม *</label>
                <textarea
                  required
                  rows={3}
                  value={editQText}
                  onChange={e => setEditQText(e.target.value)}
                  className="w-full p-2.5 border border-zinc-200 rounded-xl focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-zinc-700">ตัวเลือกคำตอบ (เลือกปุ่มกลมหน้ารายการที่ถูกต้อง) *</label>
                {editChoices.map((choice, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="editCorrectChoice"
                      checked={choice.is_correct}
                      onChange={() => {
                        setEditChoices(editChoices.map((c, idx) => ({
                          ...c,
                          is_correct: idx === i
                        })));
                      }}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <input
                      type="text"
                      required={i < 2}
                      value={choice.text}
                      onChange={e => {
                        const next = [...editChoices];
                        next[i].text = e.target.value;
                        setEditChoices(next);
                      }}
                      className={`flex-1 px-3 py-2 border rounded-xl ${choice.is_correct ? 'border-emerald-500 bg-emerald-50/30 font-semibold' : 'border-zinc-200'}`}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setEditingQuestion(null)} className="flex-1 py-2.5 border rounded-xl font-semibold">ยกเลิก</button>
                <button disabled={updatingQuestion} type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                  {updatingQuestion ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE QUESTION MODAL */}
      {deletingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">ยืนยันลบข้อสอบนี้?</h3>
              <p className="text-xs text-zinc-600 mt-1 line-clamp-3">
                "{deletingQuestion.question_text}"
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setDeletingQuestion(null)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button disabled={deletingQuestionLoading} onClick={handleConfirmDeleteQuestion} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">
                {deletingQuestionLoading ? 'กำลังลบ...' : 'ยืนยันการลบ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
