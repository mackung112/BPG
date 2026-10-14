import { useState, useEffect, useMemo } from 'react';
import { useQuestionBank } from '../../hooks/useQuestionBank';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Layers, 
  BookOpen, 
  Check, 
  AlertCircle, 
  X, 
  Calendar, 
  Archive 
} from 'lucide-react';

import SubjectSidebar from '../../components/admin/questions/SubjectSidebar';
import QuestionList from '../../components/admin/questions/QuestionList';
import SubjectModal from '../../components/admin/questions/SubjectModal';
import ExamSetModal from '../../components/admin/questions/ExamSetModal';
import QuestionModal from '../../components/admin/questions/QuestionModal';
import TransferQuestionModal from '../../components/admin/questions/TransferQuestionModal';
import DeleteConfirmModal from '../../components/admin/questions/DeleteConfirmModal';
import SemesterManagerModal from '../../components/admin/questions/SemesterManagerModal';

export default function QuestionBank() {
  const { user } = useAuth();
  const {
    banks,
    subjects,
    loading,
    selectedBank,
    setSelectedBank,
    selectedSubjectCode,
    setSelectedSubjectCode,
    questions,
    // Semester operations & states
    semesters,
    currentSemester,
    selectedSemesterFilter,
    setSelectedSemesterFilter,
    createSemester,
    updateSemester,
    deleteSemester,
    setCurrentSemester,
    assignSubjectToSemester,
    stashSubject,
    // Base actions
    refreshAll,
    loadQuestions,
    createSubject,
    updateSubject,
    deleteSubject,
    createExamSet,
    updateExamSet,
    deleteExamSet,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    importGiftQuestions,
    moveExamSetToSubject,
    moveQuestionToBank,
    copyQuestionToBank
  } = useQuestionBank();

  // Toast State
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Dragging state
  const [draggingItem, setDraggingItem] = useState(null);

  // Modals States
  const [subjectModal, setSubjectModal] = useState({ isOpen: false, editingSubject: null });
  const [examSetModal, setExamSetModal] = useState({ isOpen: false, subject: null, editingExamSet: null });
  const [questionModal, setQuestionModal] = useState({ isOpen: false, editingQuestion: null });
  const [semesterModalOpen, setSemesterModalOpen] = useState(false);
  const [transferModal, setTransferModal] = useState({ 
    isOpen: false, 
    question: null, 
    targetSubject: null, 
    targetBank: null, 
    availableBanks: [] 
  });
  const [deleteModal, setDeleteModal] = useState({ 
    isOpen: false, 
    type: null, 
    item: null, 
    title: '', 
    description: '', 
    loading: false 
  });

  // โหลดข้อมูลเริ่มต้น
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // โหลดข้อสอบเมื่อเปลี่ยน selectedBank
  useEffect(() => {
    if (selectedBank) {
      loadQuestions(selectedBank.id);
    }
  }, [selectedBank, loadQuestions]);

  // กำหนด selectedBank เริ่มต้นหากยังไม่ได้เลือก
  useEffect(() => {
    if (!selectedBank && banks.length > 0) {
      setSelectedBank(banks[0]);
    }
  }, [banks, selectedBank, setSelectedBank]);

  // หาวิชาปัจจุบันของ selectedBank
  const currentSubject = useMemo(() => {
    if (!selectedBank) return null;
    return subjects.find(s => s.banks && s.banks.some(b => b.id === selectedBank.id)) || null;
  }, [selectedBank, subjects]);

  // สถิติต่างๆ
  const activeSubjectCount = useMemo(() => {
    return subjects.filter(s => !s.isStashed && s.id !== '__GENERAL__').length;
  }, [subjects]);

  const stashedSubjectCount = useMemo(() => {
    return subjects.filter(s => s.isStashed).length;
  }, [subjects]);

  // --- Handlers สำหรับรายวิชา (Subjects) ---
  const handleOpenCreateSubject = () => {
    setSubjectModal({ isOpen: true, editingSubject: null });
  };

  const handleOpenEditSubject = (subject) => {
    setSubjectModal({ isOpen: true, editingSubject: subject });
  };

  const handleSaveSubject = async (formData) => {
    try {
      if (subjectModal.editingSubject) {
        await updateSubject(
          subjectModal.editingSubject.id, 
          formData, 
          subjectModal.editingSubject.subject_code
        );
        if (formData.semesterId) {
          await assignSubjectToSemester(formData.subject_code.trim(), formData.semesterId, user?.id);
        }
        showToast('success', `แก้ไขข้อมูลรายวิชา "${formData.subject_name}" สำเร็จ`);
      } else {
        await createSubject(formData, formData.semesterId);
        showToast('success', `สร้างรายวิชา "${formData.subject_name}" สำเร็จ`);
      }
    } catch (err) {
      showToast('error', err.message || 'เกิดข้อผิดพลาดในการบันทึกรายวิชา');
      throw err;
    }
  };

  const handleDeleteSubjectClick = (subject) => {
    setDeleteModal({
      isOpen: true,
      type: 'subject',
      item: subject,
      title: 'ยืนยันการลบรายวิชา?',
      description: `คุณต้องการลบรายวิชา "${subject.subject_code} ${subject.subject_name}" หรือไม่? (ชุดข้อสอบในวิชานี้จะถูกย้ายไปเก็บที่คลังทั่วไปเพื่อไม่ให้สูญหาย)`,
      loading: false
    });
  };

  // --- Handlers สำหรับภาคเรียนและการจัดตารางวิชา (Semester & Stashing) ---
  const handleAssignSubjectToSemester = async (subjectCode, targetSemesterId) => {
    try {
      await assignSubjectToSemester(subjectCode, targetSemesterId, user?.id);
      const targetSem = semesters.find(s => s.id === targetSemesterId);
      showToast('success', `ย้ายวิชา ${subjectCode} ไปยัง "${targetSem?.name || 'ภาคเรียนเป้าหมาย'}" สำเร็จ`);
    } catch (err) {
      showToast('error', 'ย้ายภาคเรียนไม่สำเร็จ: ' + err.message);
    }
  };

  const handleStashSubject = async (subjectCode) => {
    try {
      await stashSubject(subjectCode, user?.id);
      showToast('success', `ย้ายวิชา ${subjectCode} ไปพักไว้ก่อนเรียบร้อยแล้ว (ไม่ได้สอนในเทอมนี้)`);
    } catch (err) {
      showToast('error', 'พักวิชาไม่สำเร็จ: ' + err.message);
    }
  };

  // --- Handlers สำหรับชุดข้อสอบ (Exam Sets) ---
  const handleOpenCreateExamSet = (subject) => {
    setExamSetModal({ isOpen: true, subject, editingExamSet: null });
  };

  const handleOpenEditExamSet = (bank, subject) => {
    setExamSetModal({ isOpen: true, subject, editingExamSet: bank });
  };

  const handleSaveExamSet = async ({ subjectCode, examTitle }) => {
    try {
      if (examSetModal.editingExamSet) {
        await updateExamSet(examSetModal.editingExamSet.id, subjectCode, examTitle);
        showToast('success', `แก้ไขชื่อชุดข้อสอบ "${examTitle}" สำเร็จ`);
      } else {
        await createExamSet(subjectCode, examTitle, user?.id);
        showToast('success', `สร้างชุดข้อสอบ "${examTitle}" สำเร็จ`);
      }
    } catch (err) {
      showToast('error', err.message || 'เกิดข้อผิดพลาดในการบันทึกชุดข้อสอบ');
      throw err;
    }
  };

  const handleDeleteExamSetClick = (bank) => {
    setDeleteModal({
      isOpen: true,
      type: 'bank',
      item: bank,
      title: 'ยืนยันการลบชุดข้อสอบ?',
      description: `คุณต้องการลบชุดข้อสอบ "${bank.parsedExamTitle || bank.title}" พร้อมข้อสอบทั้งหมดในชุดนี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`,
      loading: false
    });
  };

  // --- Handlers สำหรับข้อสอบเดี่ยว (Questions) ---
  const handleOpenCreateQuestion = () => {
    setQuestionModal({ isOpen: true, editingQuestion: null });
  };

  const handleOpenEditQuestion = (question) => {
    setQuestionModal({ isOpen: true, editingQuestion: question });
  };

  const handleSaveQuestion = async (questionData) => {
    if (!selectedBank) return;
    try {
      if (questionModal.editingQuestion) {
        await updateQuestion(selectedBank.id, questionModal.editingQuestion.id, questionData);
        showToast('success', 'อัปเดตข้อสอบสำเร็จ');
      } else {
        await createQuestion(selectedBank.id, questionData);
        showToast('success', 'เพิ่มข้อสอบใหม่สำเร็จ');
      }
    } catch (err) {
      showToast('error', err.message || 'บันทึกข้อสอบไม่สำเร็จ');
      throw err;
    }
  };

  const handleDeleteQuestionClick = (question) => {
    setDeleteModal({
      isOpen: true,
      type: 'question',
      item: question,
      title: 'ยืนยันการลบข้อสอบ?',
      description: `คุณต้องการลบข้อสอบ "${question.question_text}" ออกจากชุดข้อสอบนี้หรือไม่?`,
      loading: false
    });
  };

  // นำเข้าไฟล์ GIFT
  const handleImportGift = async (bankId, content) => {
    try {
      const count = await importGiftQuestions(bankId, content);
      showToast('success', `นำเข้าข้อสอบ ${count} ข้อสำเร็จ!`);
    } catch (err) {
      showToast('error', err.message || 'นำเข้าข้อสอบไม่สำเร็จ');
      throw err;
    }
  };

  // --- Drag & Drop Operations ---
  // 1. ย้ายชุดข้อสอบข้ามวิชา
  const handleMoveExamSetToSubject = async (bankId, targetSubjectCode) => {
    try {
      const targetSub = subjects.find(s => s.subject_code === targetSubjectCode);
      await moveExamSetToSubject(bankId, targetSubjectCode);
      showToast('success', `ย้ายชุดข้อสอบไปยังวิชา "${targetSub?.subject_name || targetSubjectCode || 'ทั่วไป'}" เรียบร้อยแล้ว`);
    } catch (err) {
      showToast('error', 'ย้ายชุดข้อสอบไม่สำเร็จ: ' + err.message);
    }
  };

  // 2. ปล่อยข้อสอบลงบนรายวิชา หรือชุดข้อสอบใน sidebar
  const handleDropQuestionOnSubject = (question, targetSubject, targetBank) => {
    const availableBanks = targetSubject.banks || [];
    setTransferModal({
      isOpen: true,
      question,
      targetSubject,
      targetBank,
      availableBanks
    });
  };

  // 3. ยืนยันการย้าย / คัดลอกข้อสอบ
  const handleConfirmTransfer = async ({ mode, targetBankId, newBankTitle, targetSubjectCode }) => {
    try {
      let finalBankId = targetBankId;

      if (!finalBankId && newBankTitle) {
        const created = await createExamSet(targetSubjectCode, newBankTitle, user?.id);
        finalBankId = created.id;
      }

      if (!finalBankId) throw new Error('ไม่พบชุดข้อสอบปลายทาง');

      if (mode === 'move') {
        await moveQuestionToBank(transferModal.question.id, selectedBank?.id, finalBankId);
        showToast('success', 'ย้ายข้อสอบไปยังชุดข้อสอบปลายทางสำเร็จ');
      } else {
        await copyQuestionToBank(transferModal.question.id, finalBankId);
        showToast('success', 'คัดลอกข้อสอบไปยังชุดข้อสอบปลายทางสำเร็จ');
      }
    } catch (err) {
      showToast('error', 'ดำเนินการไม่สำเร็จ: ' + err.message);
      throw err;
    }
  };

  // --- Confirm Delete Execution ---
  const handleConfirmDelete = async () => {
    const { type, item } = deleteModal;
    if (!item) return;

    setDeleteModal(prev => ({ ...prev, loading: true }));
    try {
      if (type === 'subject') {
        await deleteSubject(item.id, item.subject_code);
        showToast('success', `ลบรายวิชา "${item.subject_name}" เรียบร้อยแล้ว`);
      } else if (type === 'bank') {
        await deleteExamSet(item.id);
        showToast('success', `ลบชุดข้อสอบ "${item.parsedExamTitle || item.title}" เรียบร้อยแล้ว`);
      } else if (type === 'question') {
        if (selectedBank) {
          await deleteQuestion(selectedBank.id, item.id);
          showToast('success', 'ลบข้อสอบเรียบร้อยแล้ว');
        }
      }
      setDeleteModal({ isOpen: false, type: null, item: null, title: '', description: '', loading: false });
    } catch (err) {
      showToast('error', 'การลบไม่สำเร็จ: ' + err.message);
      setDeleteModal(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 left-4 sm:left-auto z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border transition-all duration-300 animate-slide-in ${
          toast.type === 'success' 
            ? 'bg-emerald-900/90 border-emerald-500/40 text-emerald-100' 
            : 'bg-rose-900/90 border-rose-500/40 text-rose-100'
        }`}>
          {toast.type === 'success' ? (
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-200/80 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-md shadow-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              <span>คลังข้อสอบตามรายวิชา</span>
              {currentSemester && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/80 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-indigo-600" />
                  {currentSemester.name}
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              จัดกลุ่มวิชาตามภาคเรียน ลากวิชาเข้าออกหรือพักไว้ก่อน และสร้างชุดข้อสอบได้อย่างอิสระ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Active Teaching Subjects Badge */}
          <div className="bg-indigo-50 px-3.5 py-2 rounded-2xl text-indigo-700 font-bold text-xs border border-indigo-100/80 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>{activeSubjectCount} วิชาเปิดสอน</span>
          </div>

          {/* Stashed Subjects Badge */}
          <div className="bg-amber-50 px-3.5 py-2 rounded-2xl text-amber-800 font-bold text-xs border border-amber-200/80 flex items-center gap-2">
            <Archive className="w-4 h-4 text-amber-600" />
            <span>{stashedSubjectCount} วิชาพักไว้</span>
          </div>

          {/* Total Exam Sets Badge */}
          <div className="bg-purple-50 px-3.5 py-2 rounded-2xl text-purple-700 font-bold text-xs border border-purple-100/80 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>{banks.length} ชุดข้อสอบ</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid (Left Sidebar + Right Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-14rem)] lg:h-[calc(100vh-14rem)]">
        {/* Left Column: Subjects & Exam Sets Sidebar (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 h-[560px] lg:h-full">
          <SubjectSidebar
            subjects={subjects}
            semesters={semesters}
            currentSemester={currentSemester}
            selectedBank={selectedBank}
            onSelectBank={setSelectedBank}
            selectedSubjectCode={selectedSubjectCode}
            onSelectSubjectCode={setSelectedSubjectCode}
            onOpenCreateSubject={handleOpenCreateSubject}
            onOpenEditSubject={handleOpenEditSubject}
            onDeleteSubject={handleDeleteSubjectClick}
            onOpenCreateExamSet={handleOpenCreateExamSet}
            onOpenEditExamSet={handleOpenEditExamSet}
            onDeleteExamSet={handleDeleteExamSetClick}
            onMoveExamSetToSubject={handleMoveExamSetToSubject}
            onDropQuestionOnSubject={handleDropQuestionOnSubject}
            draggingItem={draggingItem}
            setDraggingItem={setDraggingItem}
            // Semester & Stash features
            onOpenSemesterManager={() => setSemesterModalOpen(true)}
            onAssignSubjectToSemester={handleAssignSubjectToSemester}
            onStashSubject={handleStashSubject}
            selectedSemesterFilter={selectedSemesterFilter}
            onSelectSemesterFilter={setSelectedSemesterFilter}
          />
        </div>

        {/* Right Column: Question List & Actions (7-8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 h-full">
          <QuestionList
            selectedBank={selectedBank}
            selectedSubject={currentSubject}
            questions={questions}
            loading={loading}
            onOpenCreateQuestion={handleOpenCreateQuestion}
            onOpenEditQuestion={handleOpenEditQuestion}
            onDeleteQuestion={handleDeleteQuestionClick}
            onImportGift={handleImportGift}
            onOpenEditExamSet={handleOpenEditExamSet}
            setDraggingItem={setDraggingItem}
          />
        </div>
      </div>

      {/* MODALS */}
      {/* 1. Modal จัดการภาคเรียนที่สอน */}
      <SemesterManagerModal
        isOpen={semesterModalOpen}
        onClose={() => setSemesterModalOpen(false)}
        semesters={semesters}
        subjects={subjects}
        onCreateSemester={async (data) => {
          const res = await createSemester(data);
          showToast('success', `สร้างภาคเรียน "${res.name}" สำเร็จ`);
        }}
        onUpdateSemester={async (id, data) => {
          const res = await updateSemester(id, data);
          showToast('success', `แก้ไขข้อมูลภาคเรียน "${res.name}" สำเร็จ`);
        }}
        onDeleteSemester={async (id) => {
          await deleteSemester(id);
          showToast('success', 'ลบภาคเรียนเรียบร้อยแล้ว (วิชาถูกย้ายไปพักไว้ก่อน)');
        }}
        onSetCurrentSemester={async (id) => {
          await setCurrentSemester(id);
          showToast('success', 'กำหนดเป็นภาคเรียนปัจจุบันเรียบร้อยแล้ว');
        }}
      />

      {/* 2. Modal จัดการรายวิชา */}
      <SubjectModal
        isOpen={subjectModal.isOpen}
        onClose={() => setSubjectModal({ isOpen: false, editingSubject: null })}
        onSave={handleSaveSubject}
        editingSubject={subjectModal.editingSubject}
        semesters={semesters}
        currentSemester={currentSemester}
      />

      {/* 3. Modal จัดการชุดข้อสอบ */}
      <ExamSetModal
        isOpen={examSetModal.isOpen}
        onClose={() => setExamSetModal({ isOpen: false, subject: null, editingExamSet: null })}
        onSave={handleSaveExamSet}
        subject={examSetModal.subject}
        editingExamSet={examSetModal.editingExamSet}
      />

      {/* 4. Modal จัดการข้อสอบเดี่ยว */}
      <QuestionModal
        isOpen={questionModal.isOpen}
        onClose={() => setQuestionModal({ isOpen: false, editingQuestion: null })}
        onSave={handleSaveQuestion}
        editingQuestion={questionModal.editingQuestion}
      />

      {/* 5. Modal ย้าย/คัดลอกข้อสอบ (Drag & Drop Confirmation) */}
      <TransferQuestionModal
        isOpen={transferModal.isOpen}
        onClose={() => setTransferModal({ isOpen: false, question: null, targetSubject: null, targetBank: null, availableBanks: [] })}
        question={transferModal.question}
        targetSubject={transferModal.targetSubject}
        targetBank={transferModal.targetBank}
        availableBanks={transferModal.availableBanks}
        onConfirmTransfer={handleConfirmTransfer}
      />

      {/* 6. Modal ยืนยันการลบ */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title={deleteModal.title}
        description={deleteModal.description}
        itemName={deleteModal.item ? (deleteModal.item.subject_name || deleteModal.item.parsedExamTitle || deleteModal.item.title || deleteModal.item.question_text) : ''}
        loading={deleteModal.loading}
      />
    </div>
  );
}
