import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Upload, Plus, Trash2, Eye, FileDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function QuestionBank() {
  const { user } = useAuth();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newBankTitle, setNewBankTitle] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [questions, setQuestions] = useState([]);
  
  const [txtContent, setTxtContent] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchBanks();
  }, []);

  useEffect(() => {
    if (selectedBank) {
      fetchQuestions(selectedBank.id);
    } else {
      setQuestions([]);
    }
  }, [selectedBank]);

  const fetchBanks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('question_banks')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setBanks(data);
    setLoading(false);
  };

  const fetchQuestions = async (bankId) => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('bank_id', bankId)
      .order('created_at', { ascending: true });
    if (!error && data) setQuestions(data);
  };

  const handleCreateBank = async (e) => {
    e.preventDefault();
    if (!newBankTitle) return;
    const { data, error } = await supabase
      .from('question_banks')
      .insert([{ title: newBankTitle, created_by: user.id }])
      .select()
      .single();
    if (!error && data) {
      setNewBankTitle('');
      fetchBanks();
      setSelectedBank(data);
    } else {
      alert('สร้างไม่สำเร็จ');
    }
  };

  const handleDeleteBank = async (id) => {
    if(!confirm('ยืนยันลบคลังข้อสอบพร้อมข้อสอบทั้งหมดในนี้?')) return;
    await supabase.from('question_banks').delete().eq('id', id);
    if(selectedBank?.id === id) setSelectedBank(null);
    fetchBanks();
  };

  const parseQuestions = (text) => {
    // 1. Remove comments (// ...)
    const lines = text.split('\n');
    let noComments = [];
    for (let line of lines) {
      const idx = line.indexOf('//');
      // basic comment stripping, ignoring escaping for now 
      if (idx !== -1) {
        noComments.push(line.substring(0, idx).trim());
      } else {
        noComments.push(line.trim());
      }
    }
    const cleanText = noComments.join('\n');

    // 2. Regex to match `QuestionText{...}`
    // format: `โจทย์{=ถูก~ผิด~ผิด}`
    const questionRegex = /([^{]+)\{([^}]+)\}/g;
    let match;
    const parsed = [];

    while ((match = questionRegex.exec(cleanText)) !== null) {
      let qText = match[1].trim();
      // Unescape special chars if any
      qText = qText.replace(/\\([=~{}])/g, '$1');

      const body = match[2].trim();
      // split body by = or ~ but be careful with escaped \= or \~
      // We will tokenize it.
      let currentToken = '';
      let isCorrect = false;
      const choices = [];
      let correctAnswerIndex = 0;

      for (let i = 0; i < body.length; i++) {
        const char = body[i];
        if (char === '\\' && i + 1 < body.length && ['=','~','{','}'].includes(body[i+1])) {
          currentToken += body[i+1];
          i++; // skip next
        } else if (char === '=' || char === '~') {
          // Push previous token if exists
          if (currentToken.trim()) {
            choices.push({ text: currentToken.trim(), is_correct: isCorrect });
            if (isCorrect) correctAnswerIndex = choices.length - 1;
          }
          currentToken = '';
          isCorrect = (char === '=');
        } else {
          currentToken += char;
        }
      }
      // push last token
      if (currentToken.trim()) {
        choices.push({ text: currentToken.trim(), is_correct: isCorrect });
        if (isCorrect) correctAnswerIndex = choices.length - 1;
      }

      if (qText && choices.length > 0) {
        parsed.push({
          question_text: qText,
          choices: choices,
          correct_answer_index: correctAnswerIndex
        });
      }
    }
    return parsed;
  };

  const handleImportText = async () => {
    if (!selectedBank || !txtContent.trim()) return;
    setImporting(true);

    try {
      const parsedQuestions = parseQuestions(txtContent);
      if (parsedQuestions.length === 0) {
        alert('ไม่พบข้อสอบในรูปแบบที่กำหนด');
        setImporting(false);
        return;
      }

      // Add bank_id to each
      const toInsert = parsedQuestions.map(q => ({
        bank_id: selectedBank.id,
        question_text: q.question_text,
        choices: q.choices,
        correct_answer_index: q.correct_answer_index
      }));

      const { error } = await supabase.from('questions').insert(toInsert);
      if (error) throw error;
      
      alert(`นำเข้าข้อสอบ ${toInsert.length} ข้อสำเร็จ`);
      setTxtContent('');
      fetchQuestions(selectedBank.id);
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
    
    setImporting(false);
  };

  const handleDeleteQuestion = async (id) => {
    if(!confirm('ลบข้อสอบนี้?')) return;
    await supabase.from('questions').delete().eq('id', id);
    fetchQuestions(selectedBank.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FileText className="w-8 h-8 text-indigo-600" /> คลังข้อสอบ
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        
        {/* Left Column: Bank List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <form onSubmit={handleCreateBank} className="flex gap-2">
              <input value={newBankTitle} onChange={e=>setNewBankTitle(e.target.value)} type="text" placeholder="ชื่อคลังข้อสอบใหม่..." className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <button type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Plus className="w-5 h-5" />
              </button>
            </form>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-gray-100 p-2">
            {banks.map(b => (
              <div 
                key={b.id} 
                onClick={() => setSelectedBank(b)}
                className={`p-3 rounded-xl cursor-pointer flex items-center justify-between group transition-colors ${selectedBank?.id === b.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-gray-50'}`}
              >
                <div className="font-medium text-sm text-gray-700 truncate pr-2">{b.title}</div>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteBank(b.id); }} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {banks.length === 0 && !loading && (
              <div className="p-4 text-center text-sm text-gray-500">ยังไม่มีคลังข้อสอบ</div>
            )}
          </div>
        </div>

        {/* Right Column: Questions & Import */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-3 flex flex-col overflow-hidden relative">
          {!selectedBank ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <FileText className="w-16 h-16 mb-4 text-gray-200" />
              <p className="text-lg font-medium text-gray-600">โปรดเลือกหรือสร้างคลังข้อสอบ</p>
              <p className="text-sm">เพื่อดู จัดการ และนำเข้าข้อสอบจากไฟล์ Text</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedBank.title}</h2>
                  <p className="text-sm text-gray-500">ข้อสอบทั้งหมด: {questions.length} ข้อ</p>
                </div>
              </div>

              {/* Content Grid */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                
                {/* Questions List */}
                <div className="flex-1 overflow-auto p-5 space-y-4 border-r border-gray-100">
                  <h3 className="font-bold text-gray-700 mb-2">รายการข้อสอบ</h3>
                  {questions.length === 0 ? (
                    <div className="text-center py-8 text-sm text-gray-500">ยังไม่มีข้อสอบในคลังนี้</div>
                  ) : (
                    questions.map((q, idx) => (
                      <div key={q.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDeleteQuestion(q.id)} className="text-red-400 hover:text-red-600 p-1 bg-white rounded shadow-sm">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-sm text-gray-800 pr-8">{idx + 1}. {q.question_text}</p>
                        <div className="mt-3 space-y-1">
                          {q.choices.map((c, i) => (
                            <div key={i} className={`text-xs p-2 rounded-lg border ${c.is_correct ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' : 'bg-white border-gray-200 text-gray-600'}`}>
                              {c.is_correct && '✓ '}{c.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Importer */}
                <div className="w-full md:w-[350px] p-5 flex flex-col bg-gray-50/50">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
                    <Upload className="w-4 h-4" /> นำเข้าข้อสอบ
                  </h3>
                  
                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <p><b>รูปแบบไฟล์ Text:</b></p>
                    <pre className="bg-gray-100 p-2 rounded-md font-mono text-[10px] text-gray-700 border border-gray-200">
{`// คำอธิบาย(ไม่บังคับ)
โจทย์{
=ตัวเลือกที่ถูก
~ตัวเลือกที่ผิด
~ตัวเลือกที่ผิด
}`}
                    </pre>
                    <p>ใช้ <code>\</code> เพื่อ escape สัญลักษณ์ <code>= ~ {'{ }'}</code></p>
                  </div>

                  <textarea 
                    value={txtContent}
                    onChange={e=>setTxtContent(e.target.value)}
                    className="flex-1 w-full p-3 border border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 resize-none min-h-[200px]"
                    placeholder="วางเนื้อหาข้อสอบที่นี่..."
                  />
                  
                  <button 
                    onClick={handleImportText}
                    disabled={importing || !txtContent.trim()}
                    className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                  >
                    {importing ? 'กำลังประมวลผล...' : 'วิเคราะห์และเพิ่มข้อสอบ'}
                  </button>
                </div>

              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
