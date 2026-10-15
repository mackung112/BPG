import { useState, useEffect, useRef, useMemo } from 'react';
import { getAllQuestions, parseBankTitle } from '../../services/questionBankService';
import * as semesterService from '../../services/semesterService';
import defaultSubjectsData from '../../data/subjects.json';
import { 
  X, 
  Shuffle, 
  CheckSquare, 
  ChevronDown, 
  ChevronUp, 
  Save, 
  Search, 
  RotateCcw,
  Layers,
  Calendar,
  Archive,
  Check,
  ChevronsUpDown,
  AlertCircle
} from 'lucide-react';

export default function QuestionPicker({ onClose, onSave, banks = [], initialConfig = null }) {
  // 1. Tab & Selection Modes
  const [activeTab, setActiveTab] = useState(
    initialConfig?.rawConfig?.activeTab || initialConfig?.mode || 'random'
  );

  // 2. Questions Dictionary & Loading State
  const [questionsByBank, setQuestionsByBank] = useState({});
  const [loading, setLoading] = useState(true);

  // 3. Random Mode State
  const [randomConfigs, setRandomConfigs] = useState(
    initialConfig?.rawConfig?.randomConfigs || {}
  );
  
  // 4. Manual Mode State
  const [expandedBanks, setExpandedBanks] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState(
    initialConfig?.rawConfig?.selectedQuestions || {}
  );
  
  // 5. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState('ALL');
  
  // 6. Expanded Subjects State
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const initializedRef = useRef(false);

  // Semesters & Subject-Semester Mapping from Local Storage (Synchronous & Instant)
  const semesters = useMemo(() => semesterService.getSemesters(), []);
  const subjectSemesterMap = useMemo(() => semesterService.getSubjectSemesterMap(), []);
  const currentSemester = useMemo(() => {
    return semesters.find(s => s.is_current) || semesters[0] || null;
  }, [semesters]);

  // Group Banks into Subjects
  const subjects = useMemo(() => {
    const map = new Map();

    (banks || []).forEach(bank => {
      const { subjectCode, examTitle } = parseBankTitle(bank.title);
      const enrichedBank = {
        ...bank,
        parsedSubjectCode: subjectCode,
        parsedExamTitle: examTitle
      };

      const key = subjectCode || '__GENERAL__';

      if (!map.has(key)) {
        if (key === '__GENERAL__') {
          map.set('__GENERAL__', {
            id: '__GENERAL__',
            subject_code: '',
            subject_name: 'คลังทั่วไป / ยังไม่ระบุวิชา',
            banks: []
          });
        } else {
          const matchedInJson = defaultSubjectsData.find(s => s.subject_code === subjectCode);
          map.set(key, {
            id: `temp-${subjectCode}`,
            subject_code: subjectCode,
            subject_name: matchedInJson ? matchedInJson.subject_name : `วิชารหัส ${subjectCode}`,
            banks: []
          });
        }
      }

      map.get(key).banks.push(enrichedBank);
    });

    // Attach semester and stash metadata
    const list = Array.from(map.values()).map(subj => {
      if (subj.id === '__GENERAL__') {
        return {
          ...subj,
          semesterId: null,
          semesterName: 'คลังทั่วไป',
          isStashed: false
        };
      }

      const code = subj.subject_code;
      const mappedSemId = subjectSemesterMap[code];

      if (mappedSemId === semesterService.STASH_SEMESTER_ID) {
        return {
          ...subj,
          semesterId: null,
          semesterName: 'พักไว้ก่อน (ไม่ได้สอนเทอมนี้)',
          isStashed: true
        };
      }

      if (mappedSemId) {
        const matched = semesters.find(s => s.id === mappedSemId);
        return {
          ...subj,
          semesterId: mappedSemId,
          semesterName: matched?.name || 'ภาคเรียนที่ระบุ',
          isStashed: false
        };
      }

      return {
        ...subj,
        semesterId: currentSemester?.id || null,
        semesterName: currentSemester?.name || 'ภาคเรียนปัจจุบัน',
        isStashed: false
      };
    });

    // Sort: real subjects first, __GENERAL__ last
    list.sort((a, b) => {
      if (a.id === '__GENERAL__') return 1;
      if (b.id === '__GENERAL__') return -1;
      return a.subject_code.localeCompare(b.subject_code);
    });

    return list;
  }, [banks, semesters, subjectSemesterMap, currentSemester]);

  // Load All Questions ONCE on Mount
  useEffect(() => {
    let isMounted = true;

    const loadQuestions = async () => {
      setLoading(true);
      try {
        const data = await getAllQuestions();
        if (!isMounted || !data) return;

        const grouped = {};
        const defaultConfigs = {};

        (banks || []).forEach(b => {
          grouped[b.id] = data.filter(q => q.bank_id === b.id);
          defaultConfigs[b.id] = { count: 0, points: 10 };
        });

        setQuestionsByBank(grouped);

        // One-time restoration
        if (!initializedRef.current) {
          initializedRef.current = true;

          // Restore randomConfigs
          const savedRandom = initialConfig?.rawConfig?.randomConfigs;
          if (savedRandom) {
            setRandomConfigs({ ...defaultConfigs, ...savedRandom });
          } else {
            setRandomConfigs(defaultConfigs);
          }

          // Restore selectedQuestions
          let savedSelected = initialConfig?.rawConfig?.selectedQuestions;
          if (!savedSelected && initialConfig?.mode === 'manual' && Array.isArray(initialConfig?.questions)) {
            savedSelected = {};
            initialConfig.questions.forEach(q => {
              savedSelected[q.id] = { selected: true, points: q.points || 1 };
            });
          }

          if (savedSelected && Object.keys(savedSelected).length > 0) {
            setSelectedQuestions(savedSelected);

            const autoBanks = {};
            data.forEach(q => {
              if (savedSelected[q.id]?.selected) {
                autoBanks[q.bank_id] = true;
              }
            });
            setExpandedBanks(autoBanks);
          }

          if (initialConfig?.rawConfig?.activeTab) {
            setActiveTab(initialConfig.rawConfig.activeTab);
          } else if (initialConfig?.mode) {
            setActiveTab(initialConfig.mode);
          }
        }
      } catch (err) {
        console.error('Error loading questions in QuestionPicker:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadQuestions();

    return () => {
      isMounted = false;
    };
  }, []); // Run ONCE on mount!

  // Filtered Subjects based on Semester Tab and Search Query
  const displayedSubjects = useMemo(() => {
    // 1. Separate Active vs Stashed according to selected tab
    let list = selectedSemesterFilter === '__STASH__'
      ? subjects.filter(s => s.isStashed)
      : subjects.filter(s => {
          if (s.isStashed) return false;
          if (selectedSemesterFilter === 'ALL') return true;
          return s.semesterId === selectedSemesterFilter || s.id === '__GENERAL__';
        });

    // 2. Only show subjects that have at least 1 bank
    list = list.filter(s => s.banks && s.banks.length > 0);

    // 3. Search query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(s => {
        const matchCode = s.subject_code && s.subject_code.toLowerCase().includes(query);
        const matchName = s.subject_name && s.subject_name.toLowerCase().includes(query);
        const matchBank = s.banks && s.banks.some(b => 
          (b.title && b.title.toLowerCase().includes(query)) ||
          (b.parsedExamTitle && b.parsedExamTitle.toLowerCase().includes(query))
        );
        return matchCode || matchName || matchBank;
      });
    }

    return list;
  }, [subjects, selectedSemesterFilter, searchQuery]);

  // Semester Counts & Stats
  const totalActiveSubjectsWithBanks = useMemo(() => {
    return subjects.filter(s => !s.isStashed && s.banks?.length > 0).length;
  }, [subjects]);

  const stashedSubjectsWithBanks = useMemo(() => {
    return subjects.filter(s => s.isStashed && s.banks?.length > 0);
  }, [subjects]);

  const displayedBanksCount = useMemo(() => {
    return displayedSubjects.reduce((sum, s) => sum + (s.banks?.length || 0), 0);
  }, [displayedSubjects]);

  // Expand / Collapse All
  const allExpanded = useMemo(() => {
    if (displayedSubjects.length === 0) return true;
    return displayedSubjects.every(s => expandedSubjects[s.id || s.subject_code] !== false);
  }, [displayedSubjects, expandedSubjects]);

  const handleToggleExpandAll = () => {
    const target = !allExpanded;
    const next = { ...expandedSubjects };
    displayedSubjects.forEach(s => {
      next[s.id || s.subject_code] = target;
    });
    setExpandedSubjects(next);
  };

  const toggleSubjectExpand = (subjectKey) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectKey]: prev[subjectKey] === false ? true : false
    }));
  };

  // --- Random Mode Handlers ---
  const handleRandomConfigChange = (bankId, field, value) => {
    setRandomConfigs(prev => {
      const current = prev[bankId] || { count: 0, points: 10 };
      let val = Number(value);
      if (field === 'count') {
        const totalQ = questionsByBank[bankId]?.length || 0;
        if (isNaN(val) || val < 0) val = 0;
        if (totalQ > 0 && val > totalQ) val = totalQ;
      } else if (field === 'points') {
        if (isNaN(val) || val < 0) val = 0;
      }
      return {
        ...prev,
        [bankId]: { ...current, [field]: val }
      };
    });
  };

  const handleSetMaxRandom = (bankId) => {
    const totalQ = questionsByBank[bankId]?.length || 0;
    setRandomConfigs(prev => ({
      ...prev,
      [bankId]: {
        count: totalQ,
        points: prev[bankId]?.points ?? 10
      }
    }));
  };

  const handleClearBankRandom = (bankId) => {
    setRandomConfigs(prev => ({
      ...prev,
      [bankId]: {
        count: 0,
        points: prev[bankId]?.points ?? 10
      }
    }));
  };

  const handleSelectAllSubjectRandom = (subject) => {
    setRandomConfigs(prev => {
      const next = { ...prev };
      (subject.banks || []).forEach(b => {
        const totalQ = questionsByBank[b.id]?.length || 0;
        next[b.id] = {
          count: totalQ,
          points: next[b.id]?.points ?? 10
        };
      });
      return next;
    });
  };

  const handleClearSubjectRandom = (subject) => {
    setRandomConfigs(prev => {
      const next = { ...prev };
      (subject.banks || []).forEach(b => {
        if (next[b.id]) {
          next[b.id] = {
            ...next[b.id],
            count: 0
          };
        }
      });
      return next;
    });
  };

  // --- Manual Mode Handlers ---
  const toggleBankExpand = (bankId) => {
    setExpandedBanks(prev => ({ ...prev, [bankId]: !prev[bankId] }));
  };

  const handleQuestionSelect = (qId, checked) => {
    setSelectedQuestions(prev => {
      const next = { ...prev };
      if (checked) {
        next[qId] = { selected: true, points: 1 };
      } else {
        delete next[qId];
      }
      return next;
    });
  };

  const handleQuestionPoints = (qId, points) => {
    setSelectedQuestions(prev => ({
      ...prev,
      [qId]: { ...prev[qId], points: Math.max(0.1, Number(points)) }
    }));
  };

  const handleSelectAllInBank = (bankQuestions, selectAll) => {
    setSelectedQuestions(prev => {
      const next = { ...prev };
      bankQuestions.forEach(q => {
        if (selectAll) {
          next[q.id] = next[q.id] || { selected: true, points: 1 };
          next[q.id].selected = true;
        } else {
          delete next[q.id];
        }
      });
      return next;
    });
  };

  const handleSelectAllSubjectManual = (subject) => {
    setSelectedQuestions(prev => {
      const next = { ...prev };
      (subject.banks || []).forEach(b => {
        const bQuestions = questionsByBank[b.id] || [];
        bQuestions.forEach(q => {
          next[q.id] = next[q.id] || { selected: true, points: 1 };
          next[q.id].selected = true;
        });
      });
      return next;
    });
  };

  const handleClearSubjectManual = (subject) => {
    setSelectedQuestions(prev => {
      const next = { ...prev };
      (subject.banks || []).forEach(b => {
        const bQuestions = questionsByBank[b.id] || [];
        bQuestions.forEach(q => {
          delete next[q.id];
        });
      });
      return next;
    });
  };

  // --- Global Clear ---
  const handleClearSelection = () => {
    if (activeTab === 'random') {
      setRandomConfigs(prev => {
        const reset = {};
        Object.keys(prev).forEach(bId => {
          reset[bId] = { ...prev[bId], count: 0 };
        });
        return reset;
      });
    } else {
      setSelectedQuestions({});
    }
  };

  // --- Save Handler ---
  const handleSave = () => {
    let finalQuestions = [];
    let totalScore = 0;
    let targetQuestionCount = 0;

    if (activeTab === 'random') {
      banks.forEach(bank => {
        const config = randomConfigs[bank.id];
        if (config && config.count > 0) {
          const bankQuestions = questionsByBank[bank.id] || [];
          const pointsPerQuestion = Number((config.points / config.count).toFixed(2));
          
          bankQuestions.forEach(q => {
            finalQuestions.push({ id: q.id, points: pointsPerQuestion });
          });
          
          targetQuestionCount += config.count;
          totalScore += config.points;
        }
      });
    } else {
      Object.keys(selectedQuestions).forEach(qId => {
        if (selectedQuestions[qId]?.selected) {
          const points = selectedQuestions[qId].points ?? 1;
          finalQuestions.push({ id: qId, points: points });
          totalScore += points;
        }
      });
      targetQuestionCount = finalQuestions.length;
    }

    if (finalQuestions.length === 0) {
      alert('กรุณาเลือกข้อสอบอย่างน้อย 1 ข้อ');
      return;
    }

    const calculatedTotalScore = Number(totalScore.toFixed(2));

    onSave({
      questions: finalQuestions,
      questionCount: targetQuestionCount,
      totalScore: calculatedTotalScore,
      mode: activeTab,
      summaryText: activeTab === 'random' 
        ? `สุ่มแบบอิสระ ${targetQuestionCount} ข้อ/คน (จากคลัง ${finalQuestions.length} ข้อ, เต็ม ${calculatedTotalScore} คะแนน)`
        : `เลือกเจาะจง ${finalQuestions.length} ข้อ (เต็ม ${calculatedTotalScore} คะแนน)`,
      rawConfig: {
        activeTab,
        randomConfigs,
        selectedQuestions
      }
    });
  };

  // Calculation totals for display
  const totalRandomQuestions = useMemo(() => {
    return banks.reduce((acc, b) => acc + (randomConfigs[b.id]?.count || 0), 0);
  }, [banks, randomConfigs]);

  const totalRandomScore = useMemo(() => {
    return banks.reduce((sum, b) => {
      const cfg = randomConfigs[b.id];
      return (cfg && cfg.count > 0) ? sum + Number(cfg.points || 0) : sum;
    }, 0);
  }, [banks, randomConfigs]);

  const selectedManualCount = useMemo(() => {
    return Object.values(selectedQuestions).filter(q => q?.selected).length;
  }, [selectedQuestions]);

  const selectedManualScore = useMemo(() => {
    const raw = Object.values(selectedQuestions).reduce((sum, q) => {
      return q?.selected ? sum + Number(q.points || 1) : sum;
    }, 0);
    return Number(raw.toFixed(1));
  }, [selectedQuestions]);

  const hasSelectedItems = activeTab === 'random' ? totalRandomQuestions > 0 : selectedManualCount > 0;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-zinc-700">กำลังโหลดชุดข้อสอบ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl lg:max-w-5xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-100 bg-zinc-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Layers className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-zinc-900">ตั้งค่าการเลือกข้อสอบ</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  เลือกชุดข้อสอบเข้าสู่ห้องสอบ จัดกลุ่มตามภาคเรียนและรายวิชาเพื่อง่ายต่อการค้นหา
                </p>
              </div>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-2 hover:bg-zinc-200/60 rounded-full text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs (Random vs Manual) */}
        <div className="flex items-center border-b border-zinc-100 px-4 sm:px-6 bg-white">
          <button 
            type="button"
            onClick={() => setActiveTab('random')}
            className={`px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'random' 
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40' 
                : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span>สุ่มจากคลัง</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'manual' 
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40' 
                : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>เลือกรายข้อ</span>
          </button>
        </div>

        {/* Filter Bar: Semesters Tabs + Search */}
        <div className="px-4 sm:px-6 pt-3 pb-3 bg-zinc-50/50 border-b border-zinc-100 space-y-2.5">
          {/* Semester Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {/* All */}
            <button
              type="button"
              onClick={() => setSelectedSemesterFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedSemesterFilter === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              <span>ทั้งหมด</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedSemesterFilter === 'ALL' ? 'bg-indigo-700 text-indigo-100' : 'bg-zinc-100 text-zinc-600'
              }`}>
                {totalActiveSubjectsWithBanks}
              </span>
            </button>

            {/* Terms */}
            {semesters.map(sem => {
              const isSelected = selectedSemesterFilter === sem.id;
              const count = subjects.filter(s => s.semesterId === sem.id && !s.isStashed && s.banks?.length > 0).length;

              return (
                <button
                  key={sem.id}
                  type="button"
                  onClick={() => setSelectedSemesterFilter(sem.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
                  }`}
                >
                  <span>{sem.name}</span>
                  {sem.is_current && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase tracking-wider ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      ปัจจุบัน
                    </span>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Stash Tab */}
            {stashedSubjectsWithBanks.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedSemesterFilter('__STASH__')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                  selectedSemesterFilter === '__STASH__'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100/70 border border-amber-200/60'
                }`}
                title="วิชาที่พักไว้ก่อน (ไม่ได้สอนเทอมนี้)"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>พักไว้</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSemesterFilter === '__STASH__' ? 'bg-amber-700 text-amber-100' : 'bg-amber-200/80 text-amber-900'
                }`}>
                  {stashedSubjectsWithBanks.length}
                </span>
              </button>
            )}
          </div>

          {/* Sub bar: Search + Expand/Collapse All */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleExpandAll}
                className="text-xs font-semibold text-zinc-600 hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1.5 rounded-lg border border-zinc-200"
              >
                <ChevronsUpDown className="w-3.5 h-3.5" />
                <span>{allExpanded ? 'ยุบทุกวิชา' : 'ขยายทุกวิชา'}</span>
              </button>
              <span className="text-xs text-zinc-400">
                พบ {displayedSubjects.length} วิชา ({displayedBanksCount} ชุดข้อสอบ)
              </span>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="ค้นหารหัสวิชา, ชื่อวิชา, หรือชุดข้อสอบ..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 border border-zinc-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Body: Grouped by Subjects */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-50/40 space-y-4">
          
          {/* Information Notice */}
          {activeTab === 'random' ? (
            <div className="bg-indigo-50/70 border border-indigo-100 text-indigo-900 p-3.5 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5">
              <Shuffle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">โหมดสุ่มจากคลัง: </span>
                ระบุจำนวนข้อที่จะสุ่มและคะแนนเต็มรวมของแต่ละชุดข้อสอบ (ระบบจะเกลี่ยคะแนนต่อข้อและสุ่มโจทย์ให้อัตโนมัติเมื่อนักเรียนเข้าสอบ)
              </div>
            </div>
          ) : (
            <div className="bg-amber-50/70 border border-amber-100 text-amber-900 p-3.5 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">โหมดเลือกรายข้อ: </span>
                คลิกที่ชุดข้อสอบเพื่อเปิดดูโจทย์ ติ๊กเลือกข้อสอบและกำหนดคะแนนแต่ละข้อได้ตามต้องการ
              </div>
            </div>
          )}

          {/* Empty State */}
          {displayedSubjects.length === 0 && (
            <div className="p-12 text-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white">
              <AlertCircle className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-zinc-600">ไม่พบชุดข้อสอบหรือรายวิชา</p>
              <p className="text-xs text-zinc-400 mt-1">
                {searchQuery 
                  ? `ไม่มีชุดข้อสอบที่ตรงกับคำค้นหา "${searchQuery}"` 
                  : 'ยังไม่มีชุดข้อสอบในหมวดนี้'}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 px-3 py-1.5 text-xs text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 font-semibold cursor-pointer"
                >
                  ล้างคำค้นหา
                </button>
              )}
            </div>
          )}

          {/* Subject Cards */}
          {displayedSubjects.map(subject => {
            const subjectKey = subject.id || subject.subject_code || '__GENERAL__';
            const isExpanded = expandedSubjects[subjectKey] !== false;
            const isGeneral = subject.id === '__GENERAL__';
            const isStashed = subject.isStashed;
            const subjectBanks = subject.banks || [];
            const subjectTotalQuestions = subjectBanks.reduce((sum, b) => sum + (questionsByBank[b.id]?.length || 0), 0);

            // Random stats in subject
            const subjectRandomSelectedCount = subjectBanks.reduce((sum, b) => sum + (randomConfigs[b.id]?.count || 0), 0);
            const subjectRandomPoints = subjectBanks.reduce((sum, b) => {
              const cfg = randomConfigs[b.id];
              return (cfg && cfg.count > 0) ? sum + Number(cfg.points || 0) : sum;
            }, 0);

            // Manual stats in subject
            const subjectManualSelectedCount = subjectBanks.reduce((sum, b) => {
              const bQuestions = questionsByBank[b.id] || [];
              return sum + bQuestions.filter(q => selectedQuestions[q.id]?.selected).length;
            }, 0);
            const subjectManualPoints = subjectBanks.reduce((sum, b) => {
              const bQuestions = questionsByBank[b.id] || [];
              return sum + bQuestions.reduce((qSum, q) => {
                return selectedQuestions[q.id]?.selected ? qSum + Number(selectedQuestions[q.id]?.points || 1) : qSum;
              }, 0);
            }, 0);

            return (
              <div 
                key={subjectKey}
                className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-xs transition-all"
              >
                {/* Subject Header */}
                <div 
                  onClick={() => toggleSubjectExpand(subjectKey)}
                  className={`p-3 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                    isExpanded ? 'bg-zinc-50/80 border-b border-zinc-200' : 'bg-white hover:bg-zinc-50/60'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 flex-wrap">
                    {/* Subject Code badge */}
                    {subject.subject_code ? (
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg border ${
                        isStashed
                          ? 'text-amber-800 bg-amber-100/80 border-amber-200'
                          : 'text-indigo-700 bg-indigo-50 border-indigo-200/80'
                      }`}>
                        {subject.subject_code}
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-zinc-100 text-zinc-600 border border-zinc-200">
                        ทั่วไป
                      </span>
                    )}

                    {/* Subject Name */}
                    <h3 className="font-bold text-zinc-800 text-xs sm:text-sm truncate" title={subject.subject_name}>
                      {subject.subject_name}
                    </h3>

                    {/* Semester pill if on 'ALL' tab */}
                    {selectedSemesterFilter === 'ALL' && subject.semesterName && !isGeneral && (
                      <span className="text-[11px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-indigo-500" />
                        {subject.semesterName}
                      </span>
                    )}

                    {/* Number of sets */}
                    <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                      {subjectBanks.length} ชุด ({subjectTotalQuestions} ข้อ)
                    </span>

                    {/* Selection Highlight Pill */}
                    {activeTab === 'random' && subjectRandomSelectedCount > 0 && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        สุ่ม {subjectRandomSelectedCount} ข้อ ({subjectRandomPoints} คะแนน)
                      </span>
                    )}
                    {activeTab === 'manual' && subjectManualSelectedCount > 0 && (
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3 text-indigo-600" />
                        เลือกแล้ว {subjectManualSelectedCount} ข้อ ({Number(subjectManualPoints.toFixed(1))} คะแนน)
                      </span>
                    )}
                  </div>

                  {/* Right Actions: Quick Select / Clear in Subject & Chevron */}
                  <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                    {activeTab === 'random' ? (
                      subjectRandomSelectedCount > 0 ? (
                        <button
                          type="button"
                          onClick={() => handleClearSubjectRandom(subject)}
                          className="text-[11px] font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          title="ล้างการสุ่มทั้งหมดในวิชานี้"
                        >
                          ล้างวิชานี้
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectAllSubjectRandom(subject)}
                          className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          title="สุ่มข้อสอบเต็มจำนวนทุกชุดในวิชานี้"
                        >
                          สุ่มทั้งวิชา
                        </button>
                      )
                    ) : (
                      subjectManualSelectedCount > 0 ? (
                        <button
                          type="button"
                          onClick={() => handleClearSubjectManual(subject)}
                          className="text-[11px] font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          title="ยกเลิกข้อสอบทั้งหมดในวิชานี้"
                        >
                          ล้างวิชานี้
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectAllSubjectManual(subject)}
                          className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          title="เลือกข้อสอบทั้งหมดในวิชานี้"
                        >
                          เลือกทั้งวิชา
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() => toggleSubjectExpand(subjectKey)}
                      className="p-1 hover:bg-zinc-200/60 rounded-lg text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                      title={isExpanded ? 'ยุบวิชานี้' : 'ขยายวิชานี้'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Subject Content (when expanded) */}
                {isExpanded && (
                  <div className="p-3 sm:p-4 bg-white">
                    {/* RANDOM MODE VIEW */}
                    {activeTab === 'random' && (
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600">
                            <tr>
                              <th className="p-3 font-semibold">ชุดข้อสอบ</th>
                              <th className="p-3 font-semibold text-center w-28">มีทั้งหมด</th>
                              <th className="p-3 font-semibold w-36">จำนวนที่จะสุ่ม</th>
                              <th className="p-3 font-semibold w-32">คะแนนเต็มรวม</th>
                              <th className="p-3 font-semibold text-center w-24">สุ่มด่วน</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100">
                            {subjectBanks.map(bank => {
                              const totalQ = questionsByBank[bank.id]?.length || 0;
                              const currentCount = randomConfigs[bank.id]?.count ?? 0;
                              const currentPoints = randomConfigs[bank.id]?.points ?? 10;
                              const isSetSelected = currentCount > 0;

                              return (
                                <tr key={bank.id} className={`transition-colors ${isSetSelected ? 'bg-indigo-50/30' : 'hover:bg-zinc-50'}`}>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <Layers className={`w-4 h-4 shrink-0 ${isSetSelected ? 'text-indigo-600' : 'text-zinc-400'}`} />
                                      <div className="min-w-0">
                                        <span className="font-semibold text-zinc-800 block truncate" title={bank.title}>
                                          {bank.parsedExamTitle || bank.title}
                                        </span>
                                        {bank.parsedExamTitle && bank.parsedSubjectCode && (
                                          <span className="text-[10px] text-zinc-400 font-mono">
                                            {bank.title}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-center text-zinc-600 font-medium">
                                    {totalQ > 0 ? `${totalQ} ข้อ` : <span className="text-zinc-400">0 ข้อ</span>}
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-1.5">
                                      <input 
                                        type="number" 
                                        min="0" 
                                        max={totalQ}
                                        disabled={totalQ === 0}
                                        value={currentCount}
                                        onChange={(e) => handleRandomConfigChange(bank.id, 'count', e.target.value)}
                                        className={`w-full px-2.5 py-1.5 border rounded-lg text-center font-bold text-xs sm:text-sm outline-none transition-all ${
                                          isSetSelected 
                                            ? 'border-indigo-400 bg-white text-indigo-700 ring-2 ring-indigo-100' 
                                            : 'border-zinc-200 bg-zinc-50 text-zinc-700 focus:bg-white focus:border-indigo-500'
                                        }`}
                                      />
                                      <span className="text-[11px] text-zinc-400 shrink-0">ข้อ</span>
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-1.5">
                                      <input 
                                        type="number" 
                                        min="0.1" 
                                        step="0.5"
                                        disabled={totalQ === 0}
                                        value={currentPoints}
                                        onChange={(e) => handleRandomConfigChange(bank.id, 'points', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-lg text-center text-xs sm:text-sm outline-none bg-zinc-50 focus:bg-white focus:border-indigo-500 text-zinc-800 font-semibold"
                                      />
                                      <span className="text-[11px] text-zinc-400 shrink-0">คะแนน</span>
                                    </div>
                                  </td>
                                  <td className="p-3 text-center">
                                    {totalQ > 0 && (
                                      currentCount === totalQ ? (
                                        <button
                                          type="button"
                                          onClick={() => handleClearBankRandom(bank.id)}
                                          className="text-[11px] text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded transition-colors cursor-pointer"
                                        >
                                          ล้าง
                                        </button>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => handleSetMaxRandom(bank.id)}
                                          className="text-[11px] text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded font-semibold transition-colors cursor-pointer"
                                        >
                                          เต็ม {totalQ}
                                        </button>
                                      )
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* MANUAL MODE VIEW */}
                    {activeTab === 'manual' && (
                      <div className="space-y-3">
                        {subjectBanks.map(bank => {
                          const bQuestions = questionsByBank[bank.id] || [];
                          const isExpanded = expandedBanks[bank.id];
                          const bankSelectedCount = bQuestions.filter(q => selectedQuestions[q.id]?.selected).length;

                          return (
                            <div key={bank.id} className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
                              <div 
                                onClick={() => toggleBankExpand(bank.id)}
                                className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                                  isExpanded ? 'bg-zinc-50 border-b border-zinc-200' : 'bg-zinc-50/50 hover:bg-zinc-100/70'
                                }`}
                              >
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Layers className={`w-4 h-4 ${bankSelectedCount > 0 ? 'text-indigo-600' : 'text-zinc-400'}`} />
                                  <span className="font-bold text-zinc-700 text-xs sm:text-sm">
                                    {bank.parsedExamTitle || bank.title}
                                  </span>
                                  <span className="text-zinc-400 font-normal text-xs">({bQuestions.length} ข้อ)</span>
                                  {bankSelectedCount > 0 && (
                                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                                      เลือกแล้ว {bankSelectedCount}/{bQuestions.length} ข้อ
                                    </span>
                                  )}
                                </div>
                                <button type="button" className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                              </div>

                              {isExpanded && (
                                <div>
                                  {bQuestions.length === 0 ? (
                                    <div className="p-4 text-center text-xs text-zinc-400">
                                      ยังไม่มีข้อสอบในชุดนี้
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="flex items-center justify-between px-4 py-2 bg-indigo-50/30 border-b border-zinc-100 text-xs text-zinc-600">
                                        <span>เลือกแล้ว {bankSelectedCount} จาก {bQuestions.length} ข้อ</span>
                                        <div className="flex items-center gap-2">
                                          <button
                                            type="button"
                                            onClick={() => handleSelectAllInBank(bQuestions, true)}
                                            className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                                          >
                                            เลือกทั้งหมด
                                          </button>
                                          <span className="text-zinc-300">|</span>
                                          <button
                                            type="button"
                                            onClick={() => handleSelectAllInBank(bQuestions, false)}
                                            className="text-zinc-500 hover:text-zinc-700 cursor-pointer"
                                          >
                                            ยกเลิกทั้งหมด
                                          </button>
                                        </div>
                                      </div>

                                      <div className="divide-y divide-zinc-100 p-2 max-h-80 overflow-y-auto">
                                        {bQuestions.map((q, idx) => {
                                          const isSelected = selectedQuestions[q.id]?.selected || false;
                                          const points = selectedQuestions[q.id]?.points ?? 1;

                                          return (
                                            <div key={q.id} className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-zinc-50'}`}>
                                              <div className="pt-0.5">
                                                <input 
                                                  type="checkbox" 
                                                  checked={isSelected}
                                                  onChange={(e) => handleQuestionSelect(q.id, e.target.checked)}
                                                  className="w-4 h-4 text-indigo-600 rounded border-zinc-300 focus:ring-indigo-500 cursor-pointer"
                                                />
                                              </div>
                                              <div className="flex-1 text-xs sm:text-sm text-zinc-800 pt-0.5 min-w-0">
                                                <span className="font-semibold text-zinc-400 mr-1.5">{idx + 1}.</span>
                                                <span>{q.question_text}</span>
                                              </div>
                                              {isSelected && (
                                                <div className="flex items-center gap-1.5 w-28 shrink-0">
                                                  <label className="text-[11px] text-zinc-500">คะแนน:</label>
                                                  <input 
                                                    type="number" 
                                                    min="0.1" 
                                                    step="0.5"
                                                    value={points}
                                                    onChange={(e) => handleQuestionPoints(q.id, e.target.value)}
                                                    className="w-full px-2 py-1 border border-zinc-200 rounded-md text-xs text-center focus:ring-2 focus:ring-indigo-500 outline-none bg-white font-semibold"
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs sm:text-sm font-medium text-zinc-700 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3 flex-wrap">
            {activeTab === 'random' ? (
              <span>
                รวมข้อสอบที่จะสุ่ม: <strong className="text-indigo-600 text-base sm:text-lg">{totalRandomQuestions}</strong> ข้อ 
                {totalRandomScore > 0 && <span className="text-zinc-500 ml-1.5">(คะแนนเต็ม {totalRandomScore} คะแนน)</span>}
              </span>
            ) : (
              <span>
                เลือกข้อสอบแล้ว: <strong className="text-indigo-600 text-base sm:text-lg">{selectedManualCount}</strong> ข้อ 
                {selectedManualScore > 0 && <span className="text-zinc-500 ml-1.5">(คะแนนเต็ม {selectedManualScore} คะแนน)</span>}
              </span>
            )}
            {hasSelectedItems && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-semibold cursor-pointer ml-1"
                title="ล้างข้อสอบที่เลือกในแท็บนี้"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ล้างที่เลือกทั้งหมด</span>
              </button>
            )}
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-zinc-600 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button 
              type="button" 
              onClick={handleSave} 
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" /> บันทึกและตั้งค่า
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
