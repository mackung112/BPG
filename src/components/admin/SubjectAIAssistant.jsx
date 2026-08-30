import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, ArrowDownToLine, X } from 'lucide-react';
import { chatWithSyllabusAI } from '../../services/aiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SubjectAIAssistant({ subjectData, onClose, onApplyMarkdown }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, loading]);

  // Initial welcome message
  useEffect(() => {
    setHistory([
      {
        role: 'model',
        parts: [{ text: `สวัสดีครับคุณครู! ผมคือ AI ผู้ช่วยร่างหลักสูตรประจำวิชา **${subjectData.subject_name}** ครับ\n\nผมได้อ่าน "คำอธิบายรายวิชา" และ "สมรรถนะ" เรียบร้อยแล้ว คุณครูต้องการให้ผมช่วยร่างเค้าโครงเนื้อหาแบบกี่สัปดาห์ หรือกี่หน่วยการเรียนรู้ดีครับ?` }]
      }
    ]);
  }, [subjectData.subject_name]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage = textToSend.trim();
    setInput('');
    setError('');
    
    // Add user message to UI
    const newHistory = [
      ...history, 
      { role: 'user', parts: [{ text: userMessage }] }
    ];
    setHistory(newHistory);
    setLoading(true);

    try {
      // Prepare history format for Gemini API (excluding the initial greeting which we fake, or we can send it)
      // Actually, it's better to just send the whole history except the first fake greeting if we want, 
      // but Gemini expects user/model alternation starting with user.
      // So we will just send the real history starting with the user message.
      const apiHistory = newHistory.slice(1, -1); // Exclude first greeting and the message just added
      
      const responseText = await chatWithSyllabusAI(subjectData, subjectData.syllabus_markdown || '', apiHistory, userMessage);
      
      let finalResponseText = responseText;
      const updateRegex = /<UPDATE_SYLLABUS>([\s\S]*?)<\/UPDATE_SYLLABUS>/i;
      const match = responseText.match(updateRegex);
      
      if (match) {
        const extractedMarkdown = match[1].trim();
        // Trigger the update in the editor (true = replace mode)
        onApplyMarkdown(extractedMarkdown, true);
        
        // Replace the tag block with a nice summary message
        finalResponseText = responseText.replace(updateRegex, '\n\n*(✨ ระบบได้ทำการแก้ไขเนื้อหาในช่อง Markdown ด้านซ้ายมือให้อัตโนมัติแล้ว)*\n\n').trim();
        if (finalResponseText === '*(✨ ระบบได้ทำการแก้ไขเนื้อหาในช่อง Markdown ด้านซ้ายมือให้อัตโนมัติแล้ว)*') {
          finalResponseText = "✨ ผมได้ทำการอัปเดตเนื้อหาหลักสูตรในช่องด้านซ้ายมือให้เรียบร้อยแล้วครับ ลองตรวจสอบดูได้เลยครับ มีจุดไหนอยากให้ปรับเพิ่มอีกไหมครับ?";
        }
      }
      
      setHistory(prev => [
        ...prev,
        { role: 'model', parts: [{ text: finalResponseText }] }
      ]);
    } catch (err) {
      setError(err.message);
      // Revert the history to remove the user message since the call failed
      setHistory(history); 
    } finally {
      setLoading(false);
    }
  };

  const templates = [
    "ร่างโครงสร้างหลักสูตร 18 สัปดาห์",
    "แบ่งเนื้อหาเป็น 8 หน่วยการเรียนรู้",
    "ช่วยสรุปคำอธิบายรายวิชาเป็นหัวข้อย่อย",
  ];

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 xl:border-l w-full max-w-full xl:w-96 max-h-[80vh] rounded-xl xl:rounded-r-xl shadow-xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-indigo-50/50 rounded-t-xl xl:rounded-none xl:rounded-tr-xl">
        <div className="flex items-center gap-2 text-indigo-700 font-medium">
          <Sparkles className="w-5 h-5" />
          <span>AI ร่างหลักสูตรอัจฉริยะ</span>
        </div>
        <button onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar">
        {history.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            <div className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'}`}>
              {msg.role === 'user' ? (
                msg.parts[0].text
              ) : (
                <div className="prose prose-sm prose-indigo max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.parts[0].text}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* Insert Button for Model Messages */}
              {msg.role === 'model' && index > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => onApplyMarkdown(msg.parts[0].text)}
                    className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                    แทรกลงในช่อง Markdown ด้านซ้าย
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3 flex-row">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
              <span className="text-sm text-gray-500">กำลังคิด...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white rounded-br-xl">
        {/* Quick Prompts */}
        {history.length <= 1 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
            {templates.map((tpl, i) => (
              <button 
                key={i}
                onClick={() => handleSend(tpl)}
                className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 min-h-[36px] flex items-center rounded-full transition-colors border border-indigo-100 cursor-pointer"
              >
                {tpl}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="พิมพ์คำสั่งให้ AI ช่วยร่างเนื้อหา..."
            className="flex-1 max-h-32 min-h-[44px] resize-none border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            rows={1}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">AI ทำงานภายใต้ข้อมูลรายวิชานี้เท่านั้น (Gemini Flash Latest)</p>
      </div>
    </div>
  );
}
