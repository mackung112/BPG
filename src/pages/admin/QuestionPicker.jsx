import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Shuffle, CheckSquare, ChevronDown, ChevronUp, Save, Search } from 'lucide-react';

export default function QuestionPicker({ onClose, onSave, banks }) {
  const [activeTab, setActiveTab] = useState('random');
  const [questionsByBank, setQuestionsByBank] = useState({});
  const [loading, setLoading] = useState(true);

  // Random Mode State
  const [randomConfigs, setRandomConfigs] = useState({}); // { bankId: { count: 0, points: 1 } }
  
  // Manual Mode State
  const [expandedBanks, setExpandedBanks] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState({}); // { questionId: { selected: true, points: 1 } }
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [banks]);

  const fetchQuestions = async () => {
    setLoading(true);
    const { data } = await supabase.from('questions').select('id, bank_id, question_text');
    if (data) {
      const grouped = {};
      const initialConfigs = {};
      banks.forEach(b => {
        grouped[b.id] = data.filter(q => q.bank_id === b.id);
        initialConfigs[b.id] = { count: 0, points: 10 }; // Default total score for a bank is 10
      });
      setQuestionsByBank(grouped);
      setRandomConfigs(initialConfigs);
    }
    setLoading(false);
  };

  const handleRandomConfigChange = (bankId, field, value) => {
    setRandomConfigs(prev => ({
      ...prev,
      [bankId]: { ...prev[bankId], [field]: Number(value) }
    }));
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
      [qId]: { ...prev[qId], points: Number(points) }
    }));
  };

  const handleSave = () => {
    let finalQuestions = [];
    let totalScore = 0;

    if (activeTab === 'random') {
      // Process Random Mode
      banks.forEach(bank => {
        const config = randomConfigs[bank.id];
        if (config.count > 0) {
          const bankQuestions = questionsByBank[bank.id] || [];
          // Shuffle and pick
          const shuffled = [...bankQuestions].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, config.count);
          const pointsPerQuestion = config.points / config.count; // Calculate points per question
          
          selected.forEach(q => {
            finalQuestions.push({ id: q.id, points: pointsPerQuestion });
          });
          totalScore += config.points; // Add the bank's total score
        }
      });
    } else {
      // Process Manual Mode
      Object.keys(selectedQuestions).forEach(qId => {
        if (selectedQuestions[qId].selected) {
          const points = selectedQuestions[qId].points;
          finalQuestions.push({ id: qId, points: points });
          totalScore += points;
        }
      });
    }

    if (finalQuestions.length === 0) {
      alert('กรุณาเลือกข้อสอบอย่างน้อย 1 ข้อ');
      return;
    }

    onSave({
      questions: finalQuestions,
      totalScore,
      summaryText: activeTab === 'random' 
        ? `สุ่มข้อสอบรวม ${finalQuestions.length} ข้อ (${totalScore} คะแนน)`
        : `เลือกเจาะจง ${finalQuestions.length} ข้อ (${totalScore} คะแนน)`
    });
  };

  const filteredBanks = banks.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <p className="text-sm text-gray-500 mt-1">กำหนดรูปแบบการดึงข้อสอบเข้าสู่ห้องสอบนี้</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-2">
          <button 
            type="button"
            onClick={() => setActiveTab('random')}
            className={`px-6 py-3 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'random' ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <Shuffle className="w-4 h-4" /> สุ่มจากคลัง
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-3 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'manual' ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <CheckSquare className="w-4 h-4" /> เลือกรายข้อ
          </button>
          
          <div className="ml-auto flex items-center pb-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="ค้นหาชื่อคลังข้อสอบ..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-full text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          
          {activeTab === 'random' && (
            <div className="space-y-4">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6">
                กำหนดจำนวนข้อที่จะสุ่มจากแต่ละคลัง และคะแนนเต็มที่ต้องการของแต่ละคลัง (ระบบจะหารเฉลี่ยให้เป็นคะแนนต่อข้ออัตโนมัติ)
              </div>
              
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
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
                              value={randomConfigs[bank.id]?.count || 0}
                              onChange={(e) => handleRandomConfigChange(bank.id, 'count', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center bg-white"
                            />
                          </td>
                          <td className="p-4">
                            <input 
                              type="number" 
                              min="0.1" 
                              step="0.1"
                              value={randomConfigs[bank.id]?.points || 1}
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
                  
                  return (
                    <div key={bank.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                      <button 
                        type="button"
                        onClick={() => toggleBankExpand(bank.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="font-bold text-gray-700">{bank.title} <span className="text-gray-400 font-normal ml-2 text-sm">({bQuestions.length} ข้อ)</span></div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                      </button>
                      
                      {isExpanded && (
                        <div className="divide-y divide-gray-100 p-2">
                          {bQuestions.map((q, idx) => {
                            const isSelected = selectedQuestions[q.id]?.selected || false;
                            const points = selectedQuestions[q.id]?.points || 1;
                            
                            return (
                              <div key={q.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}>
                                <div className="pt-1">
                                  <input 
                                    type="checkbox" 
                                    checked={isSelected}
                                    onChange={(e) => handleQuestionSelect(q.id, e.target.checked)}
                                    className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
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
                      )}
                    </div>
                  );
                }))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">
            {activeTab === 'random' ? (
              <span>รวมข้อสอบที่สุ่ม: <strong className="text-indigo-600 text-lg">{banks.reduce((acc, b) => acc + (randomConfigs[b.id]?.count || 0), 0)}</strong> ข้อ</span>
            ) : (
              <span>เลือกข้อสอบแล้ว: <strong className="text-indigo-600 text-lg">{Object.values(selectedQuestions).filter(q => q.selected).length}</strong> ข้อ</span>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              ยกเลิก
            </button>
            <button type="button" onClick={handleSave} className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 flex items-center gap-2 transition-colors">
              <Save className="w-4 h-4" /> บันทึกและตั้งค่า
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
