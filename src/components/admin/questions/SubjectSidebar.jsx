import { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  Pencil, 
  Trash2, 
  GripVertical, 
  FolderPlus,
  Search,
  Calendar,
  Archive,
  ArrowRight,
  Sparkles,
  Settings,
  MoreVertical,
  Check
} from 'lucide-react';

export default function SubjectSidebar({
  subjects = [],
  semesters = [],
  currentSemester = null,
  selectedBank,
  onSelectBank,
  selectedSubjectCode,
  onSelectSubjectCode,
  onOpenCreateSubject,
  onOpenEditSubject,
  onDeleteSubject,
  onOpenCreateExamSet,
  onOpenEditExamSet,
  onDeleteExamSet,
  onMoveExamSetToSubject,
  onDropQuestionOnSubject, // (question, targetSubject, targetBank)
  draggingItem, // { type: 'subject' | 'exam_set' | 'question', ... }
  setDraggingItem,
  // New Semester & Stash features
  onOpenSemesterManager,
  onAssignSubjectToSemester,
  onStashSubject,
  selectedSemesterFilter = 'ALL',
  onSelectSemesterFilter
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [isStashSectionOpen, setIsStashSectionOpen] = useState(true);
  const [dragOverTarget, setDragOverTarget] = useState(null); // 'subject:CODE', 'bank:ID', 'stash', 'semester:ID'
  const [activeMenuSubjectCode, setActiveMenuSubjectCode] = useState(null);

  const toggleExpand = (subjectCode) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectCode]: !prev[subjectCode]
    }));
  };

  // กรองรายวิชาตามคำค้นหา
  const searchFiltered = subjects.filter(s => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const matchSubject = 
      (s.subject_code && s.subject_code.toLowerCase().includes(term)) ||
      (s.subject_name && s.subject_name.toLowerCase().includes(term));
    const matchBank = s.banks && s.banks.some(b => 
      (b.title && b.title.toLowerCase().includes(term)) ||
      (b.parsedExamTitle && b.parsedExamTitle.toLowerCase().includes(term))
    );
    return matchSubject || matchBank;
  });

  // แยกวิชาออกเป็น 2 กลุ่ม: วิชาที่เปิดสอน (Active in Semester) และ วิชาที่พักไว้ก่อน (Stashed)
  const activeSubjects = searchFiltered.filter(s => !s.isStashed);
  const stashedSubjects = searchFiltered.filter(s => s.isStashed);

  // กรองตามแถบเลือกภาคเรียน (Filter Tabs)
  const displayedActiveSubjects = activeSubjects.filter(s => {
    if (selectedSemesterFilter === 'ALL') return true;
    if (selectedSemesterFilter === '__STASH__') return false;
    return s.semesterId === selectedSemesterFilter || s.id === '__GENERAL__';
  });

  // 1. Drag Handlers สำหรับวิชา (Drag Subject เข้า/ออก ภาคเรียน หรือ พักไว้)
  const handleSubjectDragStart = (e, subject) => {
    const payload = {
      type: 'subject',
      subjectCode: subject.subject_code,
      subjectName: subject.subject_name,
      fromSemesterId: subject.semesterId,
      isStashed: subject.isStashed
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(payload));
    if (setDraggingItem) setDraggingItem(payload);
  };

  // 2. Drag Handlers สำหรับ Exam Set (ลากชุดข้อสอบข้ามวิชา)
  const handleBankDragStart = (e, bank, currentSubjectCode) => {
    const payload = {
      type: 'exam_set',
      bankId: bank.id,
      bankTitle: bank.title,
      fromSubjectCode: currentSubjectCode
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(payload));
    if (setDraggingItem) setDraggingItem(payload);
  };

  const handleDragEnd = () => {
    setDragOverTarget(null);
    if (setDraggingItem) setDraggingItem(null);
  };

  // Drag Over Handlers
  const handleSubjectDragOver = (e, subjectCode) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget(`subject:${subjectCode}`);
  };

  const handleBankDragOver = (e, bankId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget(`bank:${bankId}`);
  };

  const handleStashDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget('stash');
  };

  const handleSemesterDragOver = (e, semesterId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget(`semester:${semesterId}`);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverTarget(null);
  };

  // Drop Handlers
  // 1. ปล่อยลงบนคลังพักวิชาไว้ก่อน (Stash Zone)
  const handleDropOnStash = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget(null);

    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;

    try {
      const payload = JSON.parse(raw);
      if (payload.type === 'subject') {
        if (!payload.isStashed) {
          onStashSubject(payload.subjectCode);
        }
      }
    } catch (err) {
      console.error('Error dropping on stash:', err);
    } finally {
      if (setDraggingItem) setDraggingItem(null);
    }
  };

  // 2. ปล่อยลงบนภาคเรียนเป้าหมาย
  const handleDropOnSemester = (e, targetSemesterId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget(null);

    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;

    try {
      const payload = JSON.parse(raw);
      if (payload.type === 'subject') {
        if (payload.fromSemesterId !== targetSemesterId || payload.isStashed) {
          onAssignSubjectToSemester(payload.subjectCode, targetSemesterId);
        }
      }
    } catch (err) {
      console.error('Error dropping on semester:', err);
    } finally {
      if (setDraggingItem) setDraggingItem(null);
    }
  };

  // 3. ปล่อยลงบนรายวิชา (ชุดข้อสอบ หรือ ข้อสอบรายข้อ)
  const handleDropOnSubject = (e, targetSubject) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget(null);

    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;

    try {
      const payload = JSON.parse(raw);
      if (payload.type === 'exam_set') {
        if (payload.fromSubjectCode !== targetSubject.subject_code) {
          onMoveExamSetToSubject(payload.bankId, targetSubject.subject_code);
        }
      } else if (payload.type === 'question') {
        onDropQuestionOnSubject(payload.data, targetSubject, null);
      }
    } catch (err) {
      console.error('Error handling drop on subject:', err);
    } finally {
      if (setDraggingItem) setDraggingItem(null);
    }
  };

  // 4. ปล่อยลงบนชุดข้อสอบโดยตรง
  const handleDropOnBank = (e, targetSubject, targetBank) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTarget(null);

    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;

    try {
      const payload = JSON.parse(raw);
      if (payload.type === 'question') {
        onDropQuestionOnSubject(payload.data, targetSubject, targetBank);
      }
    } catch (err) {
      console.error('Error handling drop on bank:', err);
    } finally {
      if (setDraggingItem) setDraggingItem(null);
    }
  };

  const isDraggingSubject = draggingItem?.type === 'subject';

  // Render a Single Subject Card
  const renderSubjectCard = (subject, isStashedView = false) => {
    const isExpanded = expandedSubjects[subject.subject_code] !== false;
    const isSubjectDragOver = dragOverTarget === `subject:${subject.subject_code}`;
    const isGeneralSubject = subject.id === '__GENERAL__';
    const isMenuOpen = activeMenuSubjectCode === subject.subject_code;
    const isSelectedSubject = selectedSubjectCode === subject.subject_code;

    return (
      <div
        key={subject.id || subject.subject_code}
        draggable={!isGeneralSubject}
        onDragStart={e => !isGeneralSubject && handleSubjectDragStart(e, subject)}
        onDragEnd={handleDragEnd}
        onDragOver={e => handleSubjectDragOver(e, subject.subject_code)}
        onDragLeave={handleDragLeave}
        onDrop={e => handleDropOnSubject(e, subject)}
        className={`rounded-2xl border transition-all duration-200 overflow-visible relative group ${
          isSubjectDragOver
            ? 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/30'
            : isSelectedSubject
              ? 'border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
              : isStashedView
                ? 'border-amber-200/90 bg-amber-50/20 hover:border-amber-300'
                : 'border-zinc-200/80 bg-white hover:border-zinc-300'
        }`}
      >
        {/* Subject Title Bar */}
        <div 
          onClick={() => {
            toggleExpand(subject.subject_code);
            if (onSelectSubjectCode) onSelectSubjectCode(subject.subject_code);
          }}
          className={`p-2.5 sm:p-3 flex items-center justify-between cursor-pointer rounded-2xl transition-colors ${
            isSubjectDragOver 
              ? 'bg-indigo-100/50' 
              : isStashedView
                ? 'bg-amber-50/40 hover:bg-amber-100/40'
                : 'bg-zinc-50/60 hover:bg-zinc-100/60'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 pr-1">
            {!isGeneralSubject && (
              <span 
                className="text-zinc-300 hover:text-zinc-500 cursor-grab active:cursor-grabbing shrink-0" 
                title="ลากวิชานี้เพื่อย้ายภาคเรียน หรือลากไปพักไว้ก่อน"
                onClick={e => e.stopPropagation()}
              >
                <GripVertical className="w-3.5 h-3.5" />
              </span>
            )}

            <button
              type="button"
              className="text-zinc-400 hover:text-zinc-600 shrink-0 cursor-pointer"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {subject.subject_code && (
                  <span className={`font-mono text-[10.5px] font-bold px-1.5 py-0.5 rounded border ${
                    isStashedView
                      ? 'text-amber-800 bg-amber-100/80 border-amber-200'
                      : 'text-indigo-700 bg-indigo-50 border-indigo-100/80'
                  }`}>
                    {subject.subject_code}
                  </span>
                )}
                <span className="text-xs font-bold text-zinc-800 truncate" title={subject.subject_name}>
                  {subject.subject_name}
                </span>
              </div>

              {/* Status / Semester badge */}
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                {isStashedView ? (
                  <span className="text-[10px] text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded font-medium flex items-center gap-1">
                    <Archive className="w-2.5 h-2.5" />
                    พักไว้ก่อน (ไม่ได้สอนเทอมนี้)
                  </span>
                ) : subject.semesterName && !isGeneralSubject && (
                  <span className="text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.2 rounded font-medium flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5 text-indigo-500" />
                    {subject.semesterName}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions on Subject */}
          <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
            <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-200/60 px-1.5 py-0.5 rounded-full mr-1">
              {subject.banks?.length || 0} ชุด
            </span>

            {/* Quick Action: Stash or Restore */}
            {!isGeneralSubject && (
              isStashedView ? (
                <button
                  type="button"
                  onClick={() => onAssignSubjectToSemester(subject.subject_code, currentSemester?.id)}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-100/70 rounded-lg transition-colors cursor-pointer"
                  title={`ย้ายวิชานี้เข้า "${currentSemester?.name || 'ภาคเรียนปัจจุบัน'}"`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onStashSubject(subject.subject_code)}
                  className="p-1.5 text-amber-600 hover:bg-amber-100/70 rounded-lg transition-colors cursor-pointer"
                  title="ลากหรือกดย้ายไปพักไว้ก่อน (ไม่ได้สอนเทอมนี้)"
                >
                  <Archive className="w-3.5 h-3.5" />
                </button>
              )
            )}

            {/* Add Exam Set Button */}
            <button
              onClick={() => onOpenCreateExamSet(subject)}
              className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
              title={`สร้างชุดข้อสอบในวิชา ${subject.subject_name}`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Menu button for choosing target semester or editing */}
            {!isGeneralSubject && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuSubjectCode(isMenuOpen ? null : subject.subject_code)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50 rounded-lg transition-colors cursor-pointer"
                  title="จัดการวิชาและภาคเรียน"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div 
                    className="absolute right-0 top-full mt-1 z-30 w-52 bg-white rounded-2xl shadow-xl border border-zinc-200 py-1.5 text-xs animate-fade-in"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
                      ย้ายวิชาไปภาคเรียน
                    </div>

                    {semesters.map(sem => {
                      const isCurrentSem = subject.semesterId === sem.id && !subject.isStashed;
                      return (
                        <button
                          key={sem.id}
                          type="button"
                          onClick={() => {
                            onAssignSubjectToSemester(subject.subject_code, sem.id);
                            setActiveMenuSubjectCode(null);
                          }}
                          className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-indigo-50 transition-colors cursor-pointer ${
                            isCurrentSem ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-zinc-700'
                          }`}
                        >
                          <span className="truncate">{sem.name}</span>
                          {isCurrentSem && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}

                    <div className="border-t border-zinc-100 my-1"></div>

                    {/* Stash Option */}
                    {!subject.isStashed ? (
                      <button
                        type="button"
                        onClick={() => {
                          onStashSubject(subject.subject_code);
                          setActiveMenuSubjectCode(null);
                        }}
                        className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer font-medium"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>พักไว้ก่อน (ไม่ได้สอนเทอมนี้)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onAssignSubjectToSemester(subject.subject_code, currentSemester?.id);
                          setActiveMenuSubjectCode(null);
                        }}
                        className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer font-medium"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>ย้ายเข้าภาคเรียนปัจจุบัน</span>
                      </button>
                    )}

                    <div className="border-t border-zinc-100 my-1"></div>

                    <button
                      type="button"
                      onClick={() => {
                        onOpenEditSubject(subject);
                        setActiveMenuSubjectCode(null);
                      }}
                      className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3 text-zinc-400" />
                      <span>แก้ไขรายวิชา</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onDeleteSubject(subject);
                        setActiveMenuSubjectCode(null);
                      }}
                      className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3 text-rose-500" />
                      <span>ลบรายวิชา</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Drag Over Hint */}
        {isSubjectDragOver && (
          <div className="px-3 py-2 bg-indigo-100/80 text-indigo-800 text-[11px] font-semibold text-center border-t border-indigo-200 animate-pulse">
            🎯 ปล่อยที่นี่เพื่อย้ายข้อสอบมายังวิชา {subject.subject_code || subject.subject_name}
          </div>
        )}

        {/* Banks List inside Subject */}
        {isExpanded && (
          <div className="p-2 space-y-1 bg-white border-t border-zinc-100 rounded-b-2xl">
            {(!subject.banks || subject.banks.length === 0) ? (
              <div className="py-3 px-3 text-center">
                <p className="text-[11px] text-zinc-400">ยังไม่มีชุดข้อสอบในวิชานี้</p>
                <button
                  onClick={() => onOpenCreateExamSet(subject)}
                  className="mt-1 text-xs text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>สร้างชุดข้อสอบ</span>
                </button>
              </div>
            ) : (
              subject.banks.map(bank => {
                const isSelected = selectedBank?.id === bank.id;
                const isBankDragOver = dragOverTarget === `bank:${bank.id}`;

                return (
                  <div
                    key={bank.id}
                    draggable
                    onDragStart={e => handleBankDragStart(e, bank, subject.subject_code)}
                    onDragEnd={handleDragEnd}
                    onDragOver={e => handleBankDragOver(e, bank.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={e => handleDropOnBank(e, subject, bank)}
                    onClick={() => onSelectBank(bank)}
                    className={`p-2 rounded-xl cursor-pointer flex items-center justify-between group transition-all text-xs ${
                      isSelected
                        ? 'bg-purple-50 border border-purple-200 text-purple-900 shadow-xs'
                        : 'hover:bg-zinc-50 border border-transparent text-zinc-700'
                    } ${
                      isBankDragOver
                        ? 'ring-2 ring-purple-500 bg-purple-100/70 border-purple-300'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      <span 
                        className="text-zinc-300 group-hover:text-zinc-400 cursor-grab active:cursor-grabbing shrink-0" 
                        title="ลากชุดข้อสอบนี้ไปปล่อยที่วิชาอื่นได้"
                      >
                        <GripVertical className="w-3.5 h-3.5" />
                      </span>
                      <Layers className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-purple-600' : 'text-zinc-400'}`} />
                      <span className="font-medium truncate" title={bank.parsedExamTitle || bank.title}>
                        {bank.parsedExamTitle || bank.title}
                      </span>
                    </div>

                    <div 
                      className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" 
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onOpenEditExamSet(bank, subject)}
                        className="p-1 text-zinc-400 hover:text-purple-600 hover:bg-white rounded transition-colors"
                        title="เปลี่ยนชื่อชุดข้อสอบ"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteExamSet(bank)}
                        className="p-1 text-zinc-400 hover:text-rose-600 hover:bg-white rounded transition-colors"
                        title="ลบชุดข้อสอบ"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className="bg-white rounded-3xl shadow-sm border border-zinc-200/80 flex flex-col h-full overflow-hidden"
      onClick={() => setActiveMenuSubjectCode(null)}
    >
      {/* Sidebar Top Header */}
      <div className="p-3.5 sm:p-4 border-b border-zinc-100 bg-zinc-50/50 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                รายวิชา & ภาคเรียน
              </h2>
              <span className="text-[10px] text-zinc-400">
                {subjects.length} วิชา ({activeSubjects.length} เปิดสอน, {stashedSubjects.length} พักไว้)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Manage Semesters Button */}
            <button
              type="button"
              onClick={onOpenSemesterManager}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              title="สร้าง ลบ แก้ไข ภาคเรียนที่สอน"
            >
              <Settings className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">ภาคเรียน</span>
            </button>

            {/* Create Subject Button */}
            <button
              onClick={onOpenCreateSubject}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all"
              title="เพิ่มรายวิชาใหม่"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>สร้างรายวิชา</span>
            </button>
          </div>
        </div>

        {/* Semester Filter Tabs / Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            type="button"
            onClick={() => onSelectSemesterFilter && onSelectSemesterFilter('ALL')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold shrink-0 cursor-pointer transition-all ${
              selectedSemesterFilter === 'ALL'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            ทั้งหมด ({subjects.length})
          </button>

          {semesters.map(sem => {
            const isSelected = selectedSemesterFilter === sem.id;
            const count = subjects.filter(s => s.semesterId === sem.id && !s.isStashed).length;
            const isDragOverThisSem = dragOverTarget === `semester:${sem.id}`;

            return (
              <button
                key={sem.id}
                type="button"
                onClick={() => onSelectSemesterFilter && onSelectSemesterFilter(sem.id)}
                onDragOver={e => handleSemesterDragOver(e, sem.id)}
                onDragLeave={handleDragLeave}
                onDrop={e => handleDropOnSemester(e, sem.id)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
                  isDragOverThisSem
                    ? 'ring-2 ring-indigo-500 bg-indigo-100 text-indigo-900 animate-pulse'
                    : isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
                }`}
                title={`คลิกเพื่อกรอง หรือลากวิชามาวางเพื่อกำหนดให้สอนใน ${sem.name}`}
              >
                <span>{sem.name}</span>
                <span className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-indigo-700/80 text-indigo-100' : 'bg-zinc-200 text-zinc-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}

          {/* Stash Filter Tab */}
          <button
            type="button"
            onClick={() => onSelectSemesterFilter && onSelectSemesterFilter('__STASH__')}
            onDragOver={handleStashDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropOnStash}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold shrink-0 cursor-pointer transition-all flex items-center gap-1 ${
              dragOverTarget === 'stash'
                ? 'ring-2 ring-amber-500 bg-amber-100 text-amber-900 animate-pulse'
                : selectedSemesterFilter === '__STASH__'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100/70 border border-amber-200/60'
            }`}
            title="คลิกเพื่อดูวิชาที่พักไว้ หรือลากวิชามาปล่อยที่นี่เพื่อพักไว้"
          >
            <Archive className="w-3 h-3" />
            <span>พักไว้ ({stashedSubjects.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="ค้นหารหัสวิชา หรือชุดข้อสอบ..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Main Subjects Content */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
        {/* DRAG-OVER BANNER WHEN DRAGGING A SUBJECT */}
        {isDraggingSubject && (
          <div className="space-y-2 p-2 bg-indigo-50/70 border-2 border-dashed border-indigo-300 rounded-2xl animate-fade-in text-center">
            <div className="text-xs font-bold text-indigo-900 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>กำลังลากวิชา "{draggingItem.subjectName || draggingItem.subjectCode}"</span>
            </div>
            <p className="text-[11px] text-indigo-700">
              ลากไปปล่อยที่ <b>แท็บภาคเรียน</b> ด้านบน หรือ <b>กล่องพักไว้ก่อน</b> ด้านล่าง เพื่อจัดตารางสอน
            </p>
          </div>
        )}

        {/* Section 1: Active Subjects (วิชาที่สอนในภาคเรียน) */}
        {selectedSemesterFilter !== '__STASH__' && (
          <div className="space-y-2">
            {selectedSemesterFilter !== 'ALL' && (
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-indigo-500" />
                  <span>วิชาที่สอนในเทอมนี้ ({displayedActiveSubjects.length})</span>
                </span>
              </div>
            )}

            {displayedActiveSubjects.map(subject => renderSubjectCard(subject, false))}

            {displayedActiveSubjects.length === 0 && (
              <div className="py-8 px-4 text-center text-zinc-400 text-xs border border-dashed border-zinc-200 rounded-2xl">
                <BookOpen className="w-7 h-7 mx-auto mb-1.5 opacity-30 text-indigo-600" />
                <p>ไม่มีรายวิชาที่สอนในตัวกรองนี้</p>
                <p className="text-[10px] text-zinc-400 mt-1">
                  ลากวิชาจาก <b>"คลังวิชาที่พักไว้ก่อน"</b> ด้านล่าง มาใส่ในภาคเรียนนี้ได้
                </p>
              </div>
            )}
          </div>
        )}

        {/* Section 2: Stashed Subjects (คลังวิชาที่พักไว้ก่อน / ไม่ได้สอนในเทอมนี้) */}
        <div 
          onDragOver={handleStashDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnStash}
          className={`rounded-2xl border transition-all duration-200 p-2.5 ${
            dragOverTarget === 'stash'
              ? 'border-amber-500 bg-amber-100/90 ring-4 ring-amber-400/40 shadow-md'
              : 'border-amber-200/80 bg-amber-50/40 hover:border-amber-300'
          }`}
        >
          {/* Header of Stash section */}
          <div 
            onClick={() => setIsStashSectionOpen(prev => !prev)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 bg-amber-100 text-amber-700 rounded-lg">
                <Archive className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <span>วิชาที่พักไว้ก่อน</span>
                  <span className="text-[10px] text-amber-700 font-semibold px-1.5 py-0.2 rounded-full bg-amber-100 border border-amber-200">
                    {stashedSubjects.length} วิชา
                  </span>
                </h3>
                <p className="text-[10px] text-amber-700/80">
                  ไม่ได้สอนในเทอมนี้ — ลากวิชามาพักไว้ที่นี่ได้
                </p>
              </div>
            </div>

            <button type="button" className="text-amber-700 hover:text-amber-900">
              {isStashSectionOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Stash Drop Zone Indicator when dragging */}
          {dragOverTarget === 'stash' && (
            <div className="mt-2.5 p-3 bg-amber-200/80 border-2 border-dashed border-amber-500 rounded-xl text-center text-amber-900 text-xs font-bold animate-pulse">
              📦 ปล่อยที่นี่เพื่อพักวิชาไว้ก่อน (ไม่ได้สอนในเทอมนี้)
            </div>
          )}

          {/* Stashed subjects list */}
          {isStashSectionOpen && (
            <div className="mt-2.5 space-y-2 pt-2 border-t border-amber-200/60">
              {stashedSubjects.length === 0 ? (
                <div className="py-4 text-center text-[11px] text-amber-700/70 border border-dashed border-amber-200 rounded-xl bg-amber-50/50">
                  ไม่มีวิชาที่พักไว้<br />
                  <span className="text-[10px] text-amber-600/70">
                    (ลากวิชาใดก็ได้มาวางที่นี่ หากเทอมนี้ไม่ได้สอน)
                  </span>
                </div>
              ) : (
                stashedSubjects.map(subject => renderSubjectCard(subject, true))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
