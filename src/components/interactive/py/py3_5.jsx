import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Quote,
  Wand2,
  Plus,
  X,
  AlertCircle,
  MessageSquareQuote,
  Sparkles,
  Link,
  TextCursorInput,
  Scissors,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Key
} from 'lucide-react';

// ============================================================================
// 1. String Math Lab (Enhanced)
// ============================================================================
const StringMathLab = () => {
  const [operator, setOperator] = useState('add'); // 'add' or 'multiply'
  
  // States for addition
  const [str1, setStr1] = useState('Super');
  const [str2, setStr2] = useState('man');
  
  // States for multiplication
  const [baseStr, setBaseStr] = useState('Ha');
  const [multiplier, setMultiplier] = useState(3);
  
  // Animation state
  const [animateOutput, setAnimateOutput] = useState(false);

  useEffect(() => {
    setAnimateOutput(true);
    const timer = setTimeout(() => setAnimateOutput(false), 500);
    return () => clearTimeout(timer);
  }, [str1, str2, baseStr, multiplier, operator]);

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 rounded-bl-full blur-3xl -z-0 transition-transform duration-700 group-hover:scale-125"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Wand2 className="w-8 h-8 text-pink-400" />
          ห้องทดลองเวทมนตร์ข้อความ (String Math Lab)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose text-lg">
          รู้หรือไม่ว่าในภาษา Python เราสามารถเอา "ข้อความมาบวกกัน" หรือ "เอาข้อความมาคูณตัวเลข" ได้ด้วย! ลองสลับโหมดและปรับค่าตัวแปรดูสิ
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Mode Selector */}
        <div className="flex bg-slate-800 p-2 rounded-2xl mb-10 border border-slate-700 shadow-inner">
           <button 
             onClick={() => setOperator('add')}
             className={`flex-1 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${operator === 'add' ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)] scale-[1.02]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
           >
             <Link className="w-5 h-5" /> การบวกข้อความ (Concatenation)
           </button>
           <button 
             onClick={() => setOperator('multiply')}
             className={`flex-1 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${operator === 'multiply' ? 'bg-gradient-to-r from-fuchsia-600 to-purple-500 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)] scale-[1.02]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
           >
             <X className="w-5 h-5" /> การคูณข้อความ (Repetition)
           </button>
        </div>

        {/* Input Area */}
        <div className="bg-slate-950 border border-slate-700 rounded-3xl p-10 flex flex-col items-center gap-8 shadow-inner justify-center relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {operator === 'add' ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest">String 1</div>
                  <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 border border-slate-700 focus-within:border-pink-500 transition-colors shadow-lg">
                    <span className="text-pink-400 text-2xl font-mono mr-2">"</span>
                    <input 
                      type="text" 
                      value={str1}
                      onChange={(e) => setStr1(e.target.value.substring(0, 15))}
                      className="bg-transparent text-white font-mono text-3xl outline-none w-32 text-center"
                    />
                    <span className="text-pink-400 text-2xl font-mono ml-2">"</span>
                  </div>
                </div>

                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border-2 border-pink-500/50 shrink-0 shadow-[0_0_15px_rgba(219,39,119,0.3)] animate-pulse">
                  <Plus className="w-8 h-8 text-pink-400" />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest">String 2</div>
                  <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 border border-slate-700 focus-within:border-pink-500 transition-colors shadow-lg">
                    <span className="text-pink-400 text-2xl font-mono mr-2">"</span>
                    <input 
                      type="text" 
                      value={str2}
                      onChange={(e) => setStr2(e.target.value.substring(0, 15))}
                      className="bg-transparent text-white font-mono text-3xl outline-none w-32 text-center"
                    />
                    <span className="text-pink-400 text-2xl font-mono ml-2">"</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest">Base String</div>
                  <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 border border-slate-700 focus-within:border-fuchsia-500 transition-colors shadow-lg">
                    <span className="text-fuchsia-400 text-2xl font-mono mr-2">"</span>
                    <input 
                      type="text" 
                      value={baseStr}
                      onChange={(e) => setBaseStr(e.target.value.substring(0, 10))}
                      className="bg-transparent text-white font-mono text-3xl outline-none w-32 text-center"
                    />
                    <span className="text-fuchsia-400 text-2xl font-mono ml-2">"</span>
                  </div>
                </div>

                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border-2 border-fuchsia-500/50 shrink-0 shadow-[0_0_15px_rgba(192,38,211,0.3)] animate-pulse">
                  <X className="w-8 h-8 text-fuchsia-400" />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest">Multiplier (Integer)</div>
                  <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 border border-slate-700 focus-within:border-emerald-500 transition-colors shadow-lg">
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      value={multiplier}
                      onChange={(e) => setMultiplier(parseInt(e.target.value) || 0)}
                      className="bg-transparent text-emerald-400 font-mono text-3xl outline-none w-24 text-center font-bold"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-10 relative shadow-2xl flex flex-col items-center justify-center min-h-[220px] mt-8 group-hover:border-pink-500/30 transition-colors">
           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-sm font-bold px-6 py-2 rounded-full border border-slate-600 flex items-center gap-2 shadow-lg">
             <Sparkles className="w-4 h-4 text-amber-400" /> ผลลัพธ์ (Output)
           </div>
           
           <div className={`text-white font-mono text-4xl md:text-5xl text-center leading-relaxed max-w-full overflow-hidden break-all px-4 ${animateOutput ? 'scale-110 text-white' : 'scale-100 text-slate-200'} transition-all duration-300 font-black`}>
             {operator === 'add' ? (
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 drop-shadow-[0_0_10px_rgba(244,63,114,0.3)]">
                 "{str1}{str2}"
               </span>
             ) : (
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 drop-shadow-[0_0_10px_rgba(192,38,211,0.3)]">
                 "{baseStr.repeat(Math.min(multiplier, 100))}"
               </span>
             )}
           </div>
           
           {/* Contextual Hints */}
           <div className="absolute bottom-4 w-full px-8">
             {operator === 'add' && (!str1.endsWith(' ') && !str2.startsWith(' ') && str1 !== '' && str2 !== '') && (
               <p className="text-pink-300 text-sm text-center bg-pink-500/10 px-4 py-2 rounded-lg border border-pink-500/20 mx-auto max-w-xl animate-[fadeIn_0.5s_ease-out]">
                 💡 สังเกตไหมว่าข้อความจะติดกันเป็นพรืด! หากต้องการเว้นวรรค คุณต้องใส่ช่องว่างไว้ที่ตัวแปรใดตัวแปรหนึ่งด้วย
               </p>
             )}
             {operator === 'multiply' && multiplier > 30 && (
               <p className="text-amber-300 text-sm text-center bg-amber-500/10 px-4 py-2 rounded-lg border border-amber-500/20 mx-auto max-w-xl animate-[bounce_1s_infinite]">
                 ⚠️ ว้าว! ข้อความคูณกันเยอะมากจนล้นจอแล้ว ระวัง Memory เต็มนะ!
               </p>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 2. Quote Escape Interactive Game
// ============================================================================
const QuoteEscapeGame = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // playing, correct, wrong, gameover
  
  const levels = [
    { text: "Hello World", options: ["'", '"'], answer: "'", both: true, exp: "ข้อความปกติ ไม่มีเครื่องหมายพิเศษ ใช้ ' หรือ \" ก็ได้ทั้งคู่" },
    { text: "I'm learning Python", options: ["'", '"'], answer: '"', both: false, exp: "มีเครื่องหมาย ' (Single quote) อยู่ด้านใน จึงต้องใช้ \" (Double quote) ครอบด้านนอกเพื่อไม่ให้พัง" },
    { text: 'She said "Yes!"', options: ["'", '"'], answer: "'", both: false, exp: 'มีเครื่องหมาย " (Double quote) อยู่ด้านใน จึงต้องใช้ \' (Single quote) ครอบด้านนอกแทน' },
    { text: "Line 1\nLine 2\nLine 3", options: ['"', '"""'], answer: '"""', both: false, exp: "เมื่อมีการขึ้นบรรทัดใหม่ (Multi-line) ต้องใช้ Triple Quotes เท่านั้น!" }
  ];

  const handleAnswer = (selected) => {
    if (gameState !== 'playing') return;
    
    const current = levels[level];
    let isCorrect = false;
    
    if (current.both) {
      isCorrect = true; // Any is correct
    } else {
      isCorrect = selected === current.answer;
    }
    
    if (isCorrect) {
      setScore(score + 1);
      setGameState('correct');
    } else {
      setGameState('wrong');
    }
    
    setTimeout(() => {
      if (level + 1 < levels.length) {
        setLevel(level + 1);
        setGameState('playing');
      } else {
        setGameState('gameover');
      }
    }, 3000);
  };

  const resetGame = () => {
    setLevel(0);
    setScore(0);
    setGameState('playing');
  };

  const current = levels[level] || levels[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-16">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-br-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        
        <div className="w-full lg:w-1/2">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 font-bold mb-6 border border-blue-500/30">
             <Key className="w-5 h-5" /> Minigame
           </div>
           <h4 className="text-3xl font-bold text-white mb-6">
             ศึกเลือกอัญประกาศ (Quote Selector)
           </h4>
           <p className="text-slate-400 leading-loose text-lg mb-8">
             คอมพิวเตอร์จะสับสนถ้าคุณใช้เครื่องหมายคำพูด (Quote) ไม่ถูกหลัก! 
             <br/><br/>
             <strong>ภารกิจ:</strong> เลือกเครื่องหมายครอบข้อความ (Quote) ด้านขวา ให้เหมาะสมกับข้อความที่กำหนดให้ เพื่อไม่ให้เกิด Syntax Error!
           </p>
           
           <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
             <div className="flex justify-between items-center text-slate-300 font-bold mb-2">
               <span>ข้อที่ {Math.min(level + 1, levels.length)} / {levels.length}</span>
               <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-5 h-5"/> {score} ถูกต้อง</span>
             </div>
           </div>
        </div>

        <div className="w-full lg:w-1/2">
          {gameState === 'gameover' ? (
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-10 text-center shadow-inner animate-[fadeIn_0.5s_ease-out]">
              <h4 className="text-3xl font-bold text-white mb-4">จบภารกิจ!</h4>
              <div className="text-7xl font-black text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                {score} <span className="text-3xl text-slate-500">/ {levels.length}</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {score === levels.length ? 'ยอดเยี่ยม! คุณคือผู้เชี่ยวชาญด้าน String ตัวจริง' : 
                 score >= 2 ? 'ทำได้ดี! แต่ยังมีสับสนนิดหน่อย จำหลักการสลับ Quote ไว้ให้ดี' : 
                 'ต้องฝึกฝนเพิ่มเติม ลองดูข้อความด้านในดีๆ ว่ามีเครื่องหมายอะไรซ่อนอยู่บ้าง'}
              </p>
              <button onClick={resetGame} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 w-full transition-all">
                เล่นใหม่อีกครั้ง
              </button>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-8 shadow-inner flex flex-col items-center relative min-h-[350px]">
              
              {/* Question Text Box */}
              <div className="bg-[#1E1E1E] w-full rounded-2xl p-8 mb-8 border border-slate-800 flex items-center justify-center shadow-lg relative min-h-[120px]">
                <div className="text-2xl font-mono font-bold text-slate-300 whitespace-pre-line text-center">
                  {current.text}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {current.options.map((opt, i) => {
                  let isSelected = false;
                  let btnClass = "bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200";
                  
                  if (gameState === 'correct' || gameState === 'wrong') {
                    // Logic for showing correct/wrong colors
                    if ((current.both) || (opt === current.answer)) {
                       btnClass = "bg-emerald-600 border-emerald-500 text-white scale-105 z-10 shadow-[0_0_20px_rgba(16,185,129,0.4)]";
                    } else {
                       btnClass = "bg-slate-900 border-slate-800 text-slate-700 opacity-30";
                    }
                  }

                  return (
                    <button 
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      disabled={gameState !== 'playing'}
                      className={`py-6 rounded-2xl border-2 text-4xl font-mono font-bold transition-all duration-300 ${btnClass}`}
                    >
                      {opt}<span className="text-slate-500 opacity-50">...</span>{opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Overlay */}
              {(gameState === 'correct' || gameState === 'wrong') && (
                <div className={`absolute bottom-0 left-0 w-full p-6 rounded-b-3xl flex flex-col items-center justify-center animate-[slideUp_0.3s_ease-out] ${gameState === 'correct' ? 'bg-emerald-500/95 text-white' : 'bg-rose-500/95 text-white'}`}>
                  <div className="flex items-center gap-2 font-bold text-2xl mb-2">
                    {gameState === 'correct' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                    {gameState === 'correct' ? 'ถูกต้อง!' : 'Syntax Error!'}
                  </div>
                  <p className="text-base opacity-95 text-center leading-relaxed">{current.exp}</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 3. Main Page Component
// ============================================================================
const pyUnit3_5_String = () => {
  const teacherTaskContent = `
    ใบงาน "นักต่อข้อความ"
    1. กำหนดตัวแปร:
       word1 = "Super"
       word2 = "man"
    2. ให้นักเรียนเขียนคำสั่งเพื่อนำ 2 ตัวแปรนี้มาต่อกันให้ได้คำว่า "Superman"
    3. ถ้านักเรียนอยากสั่งให้พิมพ์คำว่า "Ha" 100 ครั้งติดต่อกัน จะต้องเขียนโค้ดแบบไหนให้สั้นที่สุด?
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.5.1 String Quotes */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 flex flex-col md:flex-row gap-12 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full md:w-1/2">
              <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-4">
                <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquareQuote className="w-7 h-7" />
                </div>
                เครื่องหมายครอบข้อความ
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-8">
                กฎเหล็กของการสร้างข้อมูลแบบข้อความคือ <strong>ต้องเขียนครอบด้วยเครื่องหมายอัญประกาศ (Quotes) เสมอ</strong> 
                เพื่อบอกให้โปรแกรมรู้ว่า "ตั้งแต่ตรงนี้ ถึงตรงนี้ คือข้อความนะ ไม่ใช่คำสั่ง!"
              </p>
              
              <div className="space-y-6">
                 <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm flex gap-5 items-start hover:border-pink-300 transition-colors">
                   <div className="bg-pink-50 text-pink-600 font-mono text-2xl font-black w-14 h-14 rounded-xl flex items-center justify-center shrink-0">' '</div>
                   <div>
                     <strong className="text-slate-800 text-lg block mb-1">Single Quote</strong>
                     <p className="text-slate-600 leading-relaxed">พิมพ์ง่ายที่สุด ใช้ครอบข้อความทั่วไป</p>
                   </div>
                 </div>
                 
                 <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex gap-5 items-start hover:border-purple-300 transition-colors">
                   <div className="bg-purple-50 text-purple-600 font-mono text-2xl font-black w-14 h-14 rounded-xl flex items-center justify-center shrink-0">" "</div>
                   <div>
                     <strong className="text-slate-800 text-lg block mb-1">Double Quote</strong>
                     <p className="text-slate-600 leading-relaxed">ใช้เมื่อในข้อความเรามีตัวอักษร ' อยู่ด้วย (เช่น I'm) จะได้ไม่ชนกัน</p>
                   </div>
                 </div>
                 
                 <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm flex gap-5 items-start hover:border-indigo-300 transition-colors">
                   <div className="bg-indigo-50 text-indigo-600 font-mono text-xl font-black w-14 h-14 rounded-xl flex items-center justify-center shrink-0">"""</div>
                   <div>
                     <strong className="text-slate-800 text-lg block mb-1">Triple Quote</strong>
                     <p className="text-slate-600 leading-relaxed">ทรงพลังสุด! พิมพ์ขึ้นบรรทัดใหม่ (Enter) ลงในข้อความได้เลย</p>
                   </div>
                 </div>
              </div>
           </div>
           
           <div className="w-full md:w-1/2">
             <div className="bg-[#1E1E1E] rounded-3xl p-8 shadow-2xl font-mono text-sm md:text-base border border-slate-800 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                 <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                 <div className="ml-auto text-slate-500 text-xs">string_examples.py</div>
               </div>
               
               <div className="space-y-4 relative z-10">
                 <div className="text-slate-500 mb-2">// การประกาศตัวแปร String</div>
                 <div className="text-slate-300">name1 = <span className="text-pink-400">'Mackung'</span></div>
                 <div className="text-slate-300">name2 = <span className="text-pink-400">"John Doe"</span></div>
                 
                 <div className="text-slate-500 mt-8 mb-2">// ป้องกัน Error จากเครื่องหมายซ้ำซ้อน</div>
                 <div className="text-slate-300">quote = <span className="text-pink-400">"I'm learning Python"</span></div>
                 
                 <div className="text-slate-500 mt-8 mb-2">// Triple Quote สามารถขึ้นบรรทัดใหม่ได้</div>
                 <div className="text-slate-300">paragraph = <span className="text-amber-400">"""</span></div>
                 <div className="text-amber-400 ml-4">นี่คือบรรทัดที่ 1</div>
                 <div className="text-amber-400 ml-4">ตามด้วยบรรทัดที่ 2</div>
                 <div className="text-slate-300"><span className="text-amber-400">"""</span></div>
               </div>
             </div>
             
             <div className="bg-red-50 border-l-[6px] border-red-500 p-6 rounded-r-2xl mt-8 shadow-sm flex gap-4 items-start">
                 <AlertCircle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                 <div>
                   <strong className="text-red-900 text-xl block mb-2">คำเตือนมือใหม่ 🚨</strong>
                   <p className="text-red-800/80 leading-loose">
                     <code>age = "15"</code> แบบนี้ไม่ใช่ตัวเลข 15 นะครับ แต่มันคือ <strong>"ข้อความรูปตัวเลข 1 กับ 5"</strong> 
                     ไม่สามารถนำไปบวกลบคูณหารทางคณิตศาสตร์ได้เด็ดขาด!
                   </p>
                 </div>
             </div>
           </div>
        </div>

        {/* 3.5.2 Quote Game */}
        <QuoteEscapeGame />

        {/* 3.5.3 String Operators Simulator */}
        <div className="mt-24 mb-10">
           <div className="flex items-center gap-4 pl-4 border-l-[6px] border-pink-500">
             <h3 className="text-4xl font-bold text-slate-800">
               การต่อข้อความ และ คัดลอกข้อความ
             </h3>
           </div>
        </div>
        
        <StringMathLab />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.5)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit3_5_String;
