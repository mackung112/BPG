import { useState, useEffect, useRef } from 'react';
import { useQuestionBank } from '../../hooks/useQuestionBank';
import { X, Shuffle, CheckSquare, ChevronDown, ChevronUp, Save, Search, RotateCcw } from 'lucide-react';

export default function QuestionPicker({ onClose, onSave, banks = [], initialConfig = null }) {
  const [activeTab, setActiveTab] = useState(
    initialConfig?.rawConfig?.activeTab || initialConfig?.mode || 'random'
  );
  const [questionsByBank, setQuestionsByBank] = useState({});
  const { fetchAllQuestions, loading } = useQuestionBank();

  // Random Mode State
  const [randomConfigs, setRandomConfigs] = useState(
    initialConfig?.rawConfig?.randomConfigs || {}
  );
  
  // Manual Mode State
  const [expandedBanks, setExpandedBanks] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState(
    initialConfig?.rawConfig?.selectedQuestions || {}
  );
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const initializedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const data = await fetchAllQuestions();
      if (!isMounted || !data) return;

      const grouped = {};
      const defaultConfigs = {};
      banks.forEach(b => {
        grouped[b.id] = data.filter(q => q.bank_id === b.id);
        defaultConfigs[b.id] = { count: 0, points: 10 }; // Default total score for a bank is 10
      });
      setQuestionsByBank(grouped);

      // Only run initial restoration once upon loading questions
      if (!initializedRef.current) {
        initializedRef.current = true;

        // Restore randomConfigs
        const savedRandom = initialConfig?.rawConfig?.randomConfigs;
        if (savedRandom) {
          const mergedRandom = { ...defaultConfigs };
          Object.keys(savedRandom).forEach(bId => {
            if (mergedRandom[bId]) {
              mergedRandom[bId] = {
                count: savedRandom[bId]?.count ?? 0,
                points: savedRandom[bId]?.points ?? 10
              };
            } else {
              mergedRandom[bId] = savedRandom[bId];
            }
          });
          setRandomConfigs(mergedRandom);
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

          // Auto-expand banks that have selected questions
          const autoExpanded = {};
          data.forEach(q => {
            if (savedSelected[q.id]?.selected) {
              autoExpanded[q.bank_id] = true;
            }
          });
          setExpandedBanks(autoExpanded);
        }

        if (initialConfig?.rawConfig?.activeTab) {
          setActiveTab(initialConfig.rawConfig.activeTab);
        } else if (initialConfig?.mode) {
          setActiveTab(initialConfig.mode);
        }
      }
    };
    init();

    return () => {
      isMounted = false;
    };
  }, [banks, fetchAllQuestions, initialConfig]);

  const handleRandomConfigChange = (bankId, field, value) => {
    setRandomConfigs(prev => {
      const current = prev[bankId] || { count: 0, points: 10 };
      let val = Number(value);
      if (field === 'count') {
        const totalQ = questionsByBank[bankId]?.length || 0;
        if (val < 0) val = 0;
        if (totalQ > 0 && val > totalQ) val = totalQ;
      } else if (field === 'points') {
        if (val < 0) val = 0;
      }
      return {
        ...prev,
        [bankId]: { ...current, [field]: val }
      };
    });
  };

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

  const handleSave = () => {
    let finalQuestions = [];
    let totalScore = 0;
    let targetQuestionCount = 0;

    if (activeTab === 'random') {
      // Process Random Mode: Store all questions from selected banks in the pool
      banks.forEach(bank => {
        const config = randomConfigs[bank.id];
        if (config && config.count > 0) {
          const bankQuestions = questionsByBank[bank.id] || [];
          const pointsPerQuestion = Number((config.points / config.count).toFixed(2));
          
          // Add all available questions in this bank into the pool
          bankQuestions.forEach(q => {
            finalQuestions.push({ id: q.id, points: pointsPerQuestion });
          });
          
          targetQuestionCount += config.count;
          totalScore += config.points;
        }
      });
    } else {
      // Process Manual Mode
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

  const filteredBanks = banks.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRandomQuestions = banks.reduce((acc, b) => acc + (randomConfigs[b.id]?.count || 0), 0);
  const selectedManualCount = Object.values(selectedQuestions).filter(q => q?.selected).length;
  const hasSelectedItems = activeTab === 'random' ? totalRandomQuestions > 0 : selectedManualCount > 0;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>กำลังโหลดข้อมูลข้อสอบ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">ตั้งค่าการเลือกข้อสอบ</h2>
            <p className="text-sm text-gray-500 mt-1">กำหนดรูปแบบการดึงข้อสอบเข้าสู่ห้องสอบนี้ (ระบบจะจำรายการที่เลือกไว้ให้อัตโนมัติ)</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 px-4 sm:px-6 pt-2 gap-2 pb-2 sm:pb-0">
          <div className="flex">
            <button 
              type="button"
              onClick={() => setActiveTab('random')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${activeTab === 'random' ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              <Shuffle className="w-4 h-4" /> สุ่มจากคลัง
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('manual')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${activeTab === 'manual' ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              <CheckSquare className="w-4 h-4" /> เลือกรายข้อ
            </button>
          </div>
          
          <div className="flex items-center pb-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="ค้นหาชื่อคลังข้อสอบ..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-full text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
          
          {activeTab === 'random' && (
            <div className="space-y-4">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6">
                กำหนดจำนวนข้อที่จะสุ่มจากแต่ละคลัง และคะแนนเต็มที่ต้องการของแต่ละคลัง (ระบบจะหารเฉลี่ยให้เป็นคะแนนต่อข้ออัตโนมัติ)
              </div>
              
              <div className="border border-gray-200 rounded-2xl overflow-x-auto bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr>
                      <th className="p-4 font-medium">ชื่อคลังข้อสอบ</th>
                      <th className="p-4 font-medium text-center w-32">จำนวนข้อที่มี</th>
                      <th className="p-4 font-medium w-40">จำนวนที่จะสุ่ม (ข้อ)</th>
                      <th className="p-4 font-medium w-32">คะแนนเต็ม (รวม)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBanks.length === 0 ? (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500">ไม่พบคลังข้อสอบที่ตรงกับการค้นหา</td></tr>
                    ) : (
                      filteredBanks.map(bank => {
                        const totalQ = questionsByBank[bank.id]?.length || 0;
                        return (
                        <tr key={bank.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium text-gray-800">{bank.title}</td>
                          <td className="p-4 text-center text-gray-500">{totalQ}</td>
                          <td className="p-4">
                            <input 
                              type="number" 
                              min="0" 
                              max={totalQ}
                              value={randomConfigs[bank.id]?.count ?? 0}
                              onChange={(e) => handleRandomConfigChange(bank.id, 'count', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center bg-white"
                            />
                          </td>
                          <td className="p-4">
                            <input 
                              type="number" 
                              min="0.1" 
                              step="0.1"
                              value={randomConfigs[bank.id]?.points ?? 10}
                              onChange={(e) => handleRandomConfigChange(bank.id, 'points', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center bg-white"
                            />
                          </td>
                        </tr>
                      );
                    }))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="space-y-4">
              <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm mb-6">
                เลือกข้อสอบและกำหนดน้ำหนักคะแนนรายข้อด้วยตนเอง
              </div>

              <div className="space-y-3">
                {filteredBanks.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 border border-dashed rounded-xl bg-gray-50 border-gray-200">ไม่พบคลังข้อสอบที่ตรงกับการค้นหา</div>
                ) : (
                  filteredBanks.map(bank => {
                    const bQuestions = questionsByBank[bank.id] || [];
                    if (bQuestions.length === 0) return null;
                    const isExpanded = expandedBanks[bank.id];
                    const bankSelectedCount = bQuestions.filter(q => selectedQuestions[q.id]?.selected).length;
                  
                  return (
                    <div key={bank.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                      <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <button 
                          type="button"
                          onClick={() => toggleBankExpand(bank.id)}
                          className="flex-1 flex items-center justify-between text-left cursor-pointer"
                        >
                          <div className="font-bold text-gray-700 flex items-center gap-2 flex-wrap">
                            <span>{bank.title}</span>
                            <span className="text-gray-400 font-normal text-sm">({bQuestions.length} ข้อ)</span>
                            {bankSelectedCount > 0 && (
                              <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                                เลือกแล้ว {bankSelectedCount}/{bQuestions.length} ข้อ
                              </span>
                            )}
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500 shrink-0 ml-2" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 ml-2" />}
                        </button>
                      </div>
                      
                      {isExpanded && (
                        <div>
                          <div className="flex items-center justify-between px-4 py-2 bg-indigo-50/40 border-b border-gray-100 text-xs text-gray-600">
                            <span>เลือกแล้ว {bankSelectedCount} จาก {bQuestions.length} ข้อ</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleSelectAllInBank(bQuestions, true)}
                                className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                              >
                                เลือกทั้งหมด
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                type="button"
                                onClick={() => handleSelectAllInBank(bQuestions, false)}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                              >
                                ยกเลิกทั้งหมด
                              </button>
                            </div>
                          </div>

                          <div className="divide-y divide-gray-100 p-2">
                            {bQuestions.map((q, idx) => {
                              const isSelected = selectedQuestions[q.id]?.selected || false;
                              const points = selectedQuestions[q.id]?.points ?? 1;
                              
                              return (
                                <div key={q.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}>
                                  <div className="pt-1">
                                    <input 
                                      type="checkbox" 
                                      checked={isSelected}
                                      onChange={(e) => handleQuestionSelect(q.id, e.target.checked)}
                                      className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                    />
                                  </div>
                                  <div className="flex-1 text-sm text-gray-800 pt-1">
                                    <span className="font-medium text-gray-500 mr-2">{idx + 1}.</span>
                                    {q.question_text}
                                  </div>
                                  {isSelected && (
                                    <div className="flex items-center gap-2 w-32 shrink-0">
                                      <label className="text-xs text-gray-500">คะแนน:</label>
                                      <input 
                                        type="number" 
                                        min="0.1" 
                                        step="0.1"
                                        value={points}
                                        onChange={(e) => handleQuestionPoints(q.id, e.target.value)}
                                        className="flex-1 px-2 py-1.5 border border-gray-200 rounded-md text-sm text-center focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
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
                  );
                }))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-sm font-medium text-gray-700 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3 flex-wrap">
            {activeTab === 'random' ? (
              <span>รวมข้อสอบที่สุ่ม: <strong className="text-indigo-600 text-lg">{totalRandomQuestions}</strong> ข้อ</span>
            ) : (
              <span>เลือกข้อสอบแล้ว: <strong className="text-indigo-600 text-lg">{selectedManualCount}</strong> ข้อ</span>
            )}
            {hasSelectedItems && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-normal cursor-pointer ml-1"
                title="ล้างข้อสอบที่เลือกในแท็บนี้"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ล้างที่เลือกทั้งหมด</span>
              </button>
            )}
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button type="button" onClick={onClose} className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              ยกเลิก
            </button>
            <button type="button" onClick={handleSave} className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <Save className="w-4 h-4" /> บันทึกและตั้งค่า
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
