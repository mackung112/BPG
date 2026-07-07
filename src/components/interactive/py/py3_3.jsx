import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Binary, 
  Settings2, 
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Hash,
  Calculator,
  Plus,
  Minus,
  X,
  DivideSquare,
  Percent,
  ChevronsUp,
  Target,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award
} from 'lucide-react';

// ============================================================================
// 1. Integer Casting Factory (Enhanced)
// ============================================================================
const IntegerCastingFactory = () => {
  const [inputValue, setInputValue] = useState('3.14');
  const [inputType, setInputType] = useState('float');
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState(null);
  const [processStep, setProcessStep] = useState(0); // 0=idle, 1=loading, 2=converting, 3=done

  const handleProcess = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setOutput(null);
    setProcessStep(1);

    // Simulated multi-step processing for visual effect
    setTimeout(() => setProcessStep(2), 600);

    setTimeout(() => {
      let result;
      let isError = false;
      let errorMsg = '';
      let explanation = '';

      if (inputType === 'float') {
        result = Math.trunc(parseFloat(inputValue));
        explanation = "Float ถูกตัดจุดทศนิยมทิ้งทั้งหมดโดยไม่มีการปัดเศษ (Truncate)";
      } else if (inputType === 'string_valid') {
        result = parseInt(inputValue, 10);
        explanation = "String ที่มีแต่ตัวเลขถูกถอดเครื่องหมายคำพูดออก กลายเป็น Integer สมบูรณ์";
      } else if (inputType === 'string_invalid') {
        isError = true;
        errorMsg = `ValueError: invalid literal for int()`;
        explanation = "พัง! String มีตัวอักษรผสมอยู่ ไม่สามารถแปลงเป็นตัวเลขฐานสิบได้";
      }

      setOutput({ value: result, isError, errorMsg, explanation });
      setProcessStep(3);
      setIsProcessing(false);
    }, 1800);
  };

  const handleSelectInput = (val, type) => {
    setInputValue(val);
    setInputType(type);
    setOutput(null);
    setProcessStep(0);
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-bl-full blur-3xl -z-0 transition-transform duration-700 group-hover:scale-125"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Settings2 className="w-8 h-8 text-blue-400" />
          โรงงานแปลงร่าง: int() Factory
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          ลองเลือกวัตถุดิบ (Input) ด้านซ้าย แล้วกดปุ่มเดินเครื่อง <code>int()</code> เพื่อดูว่าฟังก์ชันนี้จะแปลงข้อมูลออกมาเป็นจำนวนเต็ม (Integer) ได้หรือไม่
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Step 1: Input Selection */}
        <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6 shadow-inner h-full flex flex-col">
          <h4 className="text-slate-400 font-bold mb-6 text-center flex items-center justify-center gap-2">
            <span className="bg-slate-800 text-slate-300 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            เลือกวัตถุดิบ
          </h4>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <button 
              onClick={() => handleSelectInput('3.14', 'float')}
              className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${inputValue === '3.14' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
            >
              <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs border border-slate-700">float</div>
              <code className="text-lg">3.14</code>
            </button>
            <button 
              onClick={() => handleSelectInput('99.99', 'float')}
              className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${inputValue === '99.99' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
            >
              <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs border border-slate-700">float</div>
              <code className="text-lg">99.99</code>
            </button>
            <button 
              onClick={() => handleSelectInput('2024', 'string_valid')}
              className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${inputValue === '2024' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
            >
              <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs border border-slate-700">str</div>
              <code className="text-lg">"2024"</code>
            </button>
            <button 
              onClick={() => handleSelectInput('Hello', 'string_invalid')}
              className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${inputValue === 'Hello' ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,114,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
            >
              <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs border border-slate-700">str</div>
              <code className="text-lg">"Hello"</code>
            </button>
          </div>
        </div>

        {/* Step 2: Machine / Processor */}
        <div className="flex flex-col items-center py-8">
          <button 
            onClick={handleProcess}
            disabled={isProcessing}
            className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300 ${isProcessing ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.6)] scale-105' : 'border-slate-600 bg-slate-800 hover:border-blue-400 hover:bg-slate-700 shadow-xl'} group cursor-pointer disabled:cursor-not-allowed`}
          >
            {processStep === 0 && <Cpu className="w-16 h-16 text-slate-400 group-hover:text-blue-400 transition-colors" />}
            {processStep === 1 && <Settings2 className="w-16 h-16 text-blue-400 animate-spin" />}
            {processStep === 2 && <Hash className="w-16 h-16 text-cyan-400 animate-[bounce_1s_infinite]" />}
            {processStep === 3 && (output?.isError ? <AlertTriangle className="w-16 h-16 text-rose-500" /> : <CheckCircle2 className="w-16 h-16 text-emerald-500" />)}
            
            <span className={`font-bold mt-3 font-mono text-2xl ${isProcessing ? 'text-blue-400' : 'text-slate-300'}`}>int()</span>
            
            {/* Click me hint */}
            {!isProcessing && processStep === 0 && (
              <span className="absolute -top-12 bg-blue-600 text-white text-sm px-4 py-2 rounded-full animate-bounce shadow-lg after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:border-l-[6px] after:border-l-transparent after:border-t-[6px] after:border-t-blue-600 after:border-r-[6px] after:border-r-transparent">กดทำงาน!</span>
            )}
          </button>
          
          <div className="mt-8 text-center min-h-[40px]">
            {processStep === 1 && <span className="text-blue-400 font-mono text-sm animate-pulse">กำลังอ่านข้อมูล: {inputValue}...</span>}
            {processStep === 2 && <span className="text-cyan-400 font-mono text-sm animate-pulse">กำลังแปลงสภาพเป็น Integer...</span>}
            {processStep === 3 && <span className="text-slate-500 font-mono text-sm">กระบวนการเสร็จสิ้น</span>}
          </div>
        </div>

        {/* Step 3: Output */}
        <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6 shadow-inner h-full flex flex-col relative overflow-hidden">
           <h4 className="text-slate-400 font-bold mb-6 text-center flex items-center justify-center gap-2 relative z-10">
             <span className="bg-slate-800 text-slate-300 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
             ผลลัพธ์ (Output)
           </h4>
           
           <div className={`flex-1 rounded-xl border flex flex-col items-center justify-center p-6 text-center transition-all duration-500 relative z-10 ${
             !output ? 'bg-slate-900 border-slate-800 text-slate-600'
             : output.isError ? 'bg-rose-950/50 border-rose-500/50 text-rose-400 shadow-[0_0_20px_rgba(244,63,114,0.3)]'
             : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
           }`}>
              {!output && (
                <div className="flex flex-col items-center opacity-50">
                  <ArrowRight className="w-10 h-10 mb-4" />
                  <span className="font-mono text-sm">รอรับสินค้า...</span>
                </div>
              )}
              
              {output && output.isError && (
                <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                  <XCircle className="w-12 h-12 mb-3 text-rose-500" />
                  <span className="font-mono text-xs md:text-sm leading-relaxed font-bold bg-rose-500/20 px-3 py-2 rounded-lg">{output.errorMsg}</span>
                </div>
              )}

              {output && !output.isError && (
                <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                  <span className="font-mono text-6xl md:text-7xl font-black text-emerald-400 mb-2">{output.value}</span>
                  <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/30">type: &lt;class 'int'&gt;</div>
                </div>
              )}
           </div>
           
           {/* Explanation Box */}
           <div className={`mt-4 rounded-xl p-4 text-sm leading-relaxed transition-all duration-500 ${output ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${output?.isError ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'}`}>
             {output?.explanation || '\u00A0'}
           </div>
        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 2. Modulo Quiz Mini-game (Find the Remainder)
// ============================================================================
const ModuloGame = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // playing, correct, wrong, gameover
  
  const levels = [
    { num1: 10, num2: 3, answer: 1, options: [0, 1, 3, 10], exp: "10 หารด้วย 3 ได้ 3 ครั้ง (9) เหลือเศษ 1" },
    { num1: 15, num2: 4, answer: 3, options: [2, 3, 4, 15], exp: "15 หารด้วย 4 ได้ 3 ครั้ง (12) เหลือเศษ 3" },
    { num1: 20, num2: 5, answer: 0, options: [0, 1, 4, 5], exp: "20 หารด้วย 5 ลงตัวพอดี จึงเหลือเศษ 0" },
    { num1: 7, num2: 10, answer: 7, options: [0, 3, 7, 10], exp: "7 หารด้วย 10 ไม่ได้เลย (0 ครั้ง) จึงเหลือเศษ 7 เท่าเดิม!" },
    { num1: 100, num2: 2, answer: 0, options: [0, 1, 2, 50], exp: "เลขคู่ทุกตัวเมื่อ % 2 จะได้เศษ 0 เสมอ!" }
  ];

  const handleAnswer = (selected) => {
    if (gameState !== 'playing') return;
    
    const currentQuestion = levels[level];
    if (selected === currentQuestion.answer) {
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
    }, 2500);
  };

  const resetGame = () => {
    setLevel(0);
    setScore(0);
    setGameState('playing');
  };

  const current = levels[level] || levels[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-16">
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        
        <div className="w-full md:w-1/2">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 font-bold mb-6 border border-cyan-500/30">
             <Target className="w-5 h-5" /> Modulo Challenge
           </div>
           <h4 className="text-3xl font-bold text-white mb-6">
             ภารกิจ: ตามล่าหา "เศษ" 
           </h4>
           <p className="text-slate-400 leading-loose text-lg mb-8">
             เครื่องหมาย <strong>% (Modulo)</strong> คือการหารเอาเศษ ซึ่งเป็นตัวดำเนินการที่ใช้บ่อยมากๆ ในการเขียนโปรแกรม 
             (เช่น เช็คเลขคู่-คี่, หาค่าที่ลงตัว) <br/><br/>
             <strong className="text-cyan-400">วิธีคิด:</strong> ให้เอาตัวเลขหน้าหารด้วยตัวเลขหลัง แล้วดูว่า <em>"เหลือเศษเท่าไหร่?"</em>
           </p>
           
           <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
             <div className="flex justify-between items-center text-slate-300 font-bold mb-2">
               <span>ความคืบหน้า: ด่าน {Math.min(level + 1, levels.length)} / {levels.length}</span>
               <span className="text-yellow-400 flex items-center gap-1"><Award className="w-5 h-5"/> {score} คะแนน</span>
             </div>
             <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
               <div 
                 className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500"
                 style={{ width: `${(Math.min(level, levels.length) / levels.length) * 100}%` }}
               ></div>
             </div>
           </div>
        </div>

        <div className="w-full md:w-1/2">
          {gameState === 'gameover' ? (
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-10 text-center shadow-inner animate-[fadeIn_0.5s_ease-out]">
              <h4 className="text-3xl font-bold text-white mb-4">จบภารกิจ!</h4>
              <div className="text-7xl font-black text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                {score} <span className="text-3xl text-slate-500">/ {levels.length}</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {score === levels.length ? 'สมบูรณ์แบบ! คุณเข้าใจการทำงานของ Modulo ทะลุปรุโปร่ง!' : 
                 score >= 3 ? 'เยี่ยมมาก! พื้นฐานการหารเอาเศษของคุณแน่นพอสมควรเลย' : 
                 'ไม่เป็นไร ลองฝึกคิดภาพการแบ่งของแล้วเหลือเศษดูนะ ลองใหม่อีกครั้ง!'}
              </p>
              <button onClick={resetGame} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 w-full transition-all">
                <RefreshCcw className="w-5 h-5" /> เล่นใหม่อีกครั้ง
              </button>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-8 shadow-inner flex flex-col items-center relative">
              
              {/* Question Screen */}
              <div className="bg-[#1E1E1E] w-full rounded-2xl p-8 mb-8 border border-slate-800 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-transparent opacity-50"></div>
                <div className="text-5xl md:text-6xl font-mono font-bold text-white relative z-10 flex items-center gap-4">
                  <span className="text-blue-400">{current.num1}</span>
                  <span className="text-cyan-500">%</span>
                  <span className="text-blue-400">{current.num2}</span>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {current.options.map((opt, i) => {
                  // Determine button styling based on state
                  let btnClass = "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200";
                  if (gameState === 'correct' || gameState === 'wrong') {
                    if (opt === current.answer) {
                      btnClass = "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105 z-10"; // The correct answer is always highlighted
                    } else {
                      btnClass = "bg-slate-900 border-slate-800 text-slate-600 opacity-50"; // Others fade out
                    }
                  }

                  return (
                    <button 
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      disabled={gameState !== 'playing'}
                      className={`p-5 rounded-xl border-2 text-2xl font-mono font-bold transition-all duration-300 ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Overlay */}
              {(gameState === 'correct' || gameState === 'wrong') && (
                <div className={`absolute bottom-0 left-0 w-full p-4 rounded-b-3xl flex flex-col items-center justify-center animate-[slideUp_0.3s_ease-out] ${gameState === 'correct' ? 'bg-emerald-500/95 text-white' : 'bg-rose-500/95 text-white'}`}>
                  <div className="flex items-center gap-2 font-bold text-lg mb-1">
                    {gameState === 'correct' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    {gameState === 'correct' ? 'ถูกต้อง!' : 'ผิดครับ!'}
                  </div>
                  <p className="text-sm opacity-90 text-center">{current.exp}</p>
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
const pyUnit3_3_Integer = () => {
  const teacherTaskContent = `
    ใบงาน "นักจัดการตัวเลข"
    1. ให้นักเรียนเขียนผลลัพธ์ของคำสั่งต่อไปนี้ลงในกระดาษ:
       - int(5.99)
       - int("150")
       - int("abc")
    2. หาผลลัพธ์ของสมการเหล่านี้:
       - 15 % 4
       - 10 // 3
       - 2 ** 3
    3. อธิบายว่าทำไม int(5.99) ถึงไม่ได้ผลลัพธ์เป็น 6
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.3.1 Integer Characteristics */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 flex flex-col lg:flex-row gap-12 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full lg:w-1/2">
              <h4 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                ลักษณะของข้อมูลจำนวนเต็ม
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-8">
                <strong>Integer (int)</strong> คือ ตัวเลขที่ <strong>ไม่มีจุดทศนิยม</strong> ประกอบไปด้วย 3 กลุ่มหลัก:
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-xl font-bold shrink-0 text-xl group-hover:scale-110 transition-transform">+</div>
                  <div>
                    <h6 className="font-bold text-slate-800">จำนวนเต็มบวก (Positive)</h6>
                    <span className="text-slate-500 text-sm">เช่น 1, 50, 1000, 9999</span>
                  </div>
                </li>
                <li className="flex items-center gap-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 transition-colors group">
                  <div className="bg-slate-100 text-slate-600 w-12 h-12 flex items-center justify-center rounded-xl font-bold shrink-0 text-xl group-hover:scale-110 transition-transform">0</div>
                  <div>
                    <h6 className="font-bold text-slate-800">ศูนย์ (Zero)</h6>
                    <span className="text-slate-500 text-sm">เลข 0 ไม่มีค่าบวกหรือลบ</span>
                  </div>
                </li>
                <li className="flex items-center gap-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-rose-300 transition-colors group">
                  <div className="bg-rose-100 text-rose-600 w-12 h-12 flex items-center justify-center rounded-xl font-bold shrink-0 text-xl group-hover:scale-110 transition-transform">-</div>
                  <div>
                    <h6 className="font-bold text-slate-800">จำนวนเต็มลบ (Negative)</h6>
                    <span className="text-slate-500 text-sm">เช่น -1, -50, -1000, -9999</span>
                  </div>
                </li>
              </ul>
              
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-[2px] rounded-2xl shadow-lg">
                <div className="bg-white p-6 rounded-[14px]">
                  <strong className="text-blue-800 block mb-2 flex items-center gap-2 text-lg"><Lightbulb className="w-6 h-6 text-yellow-500"/> ความเจ๋งของ Python 3:</strong>
                  <p className="text-slate-700 leading-loose">
                    ในภาษา C หรือ Java ตัวเลข int จะมี <strong>ขีดจำกัดสูงสุด</strong> (เช่น เก็บได้ไม่เกิน 2 พันล้าน) หากเกินจะเกิดอาการ Memory Overflow
                    แต่ใน Python 3 ตัวเลข int <strong>ไม่มีขีดจำกัดขนาด (Unlimited Precision)</strong> สามารถเก็บตัวเลขยาวเป็นแสนหลักได้สบายๆ ตราบใดที่ RAM ในเครื่องยังเหลือ!
                  </p>
                </div>
              </div>
           </div>
           
           <div className="w-full lg:w-1/2">
             <div className="bg-[#1E1E1E] rounded-3xl p-8 shadow-2xl font-mono text-sm md:text-base border border-slate-800 relative overflow-hidden">
               {/* Decorative dots */}
               <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
                 <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
                 <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
                 <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
               </div>
               
               <div className="space-y-4">
                 <div className="text-slate-500 mb-2">// การประกาศตัวแปร Integer</div>
                 <div className="text-slate-300">age = <span className="text-emerald-400">15</span></div>
                 <div className="text-slate-300">temperature = <span className="text-emerald-400">-5</span></div>
                 <div className="text-slate-300">bank_balance = <span className="text-emerald-400">0</span></div>
                 
                 <div className="text-slate-500 mt-6 mb-2">// Python รองรับตัวเลขมหาศาลอัตโนมัติ</div>
                 <div className="text-slate-300 flex items-start">
                   <span className="w-24 shrink-0">big_num = </span>
                   <span className="text-emerald-400 break-all">999999999999999999999999999999</span>
                 </div>
                 
                 <div className="text-slate-500 mt-6 mb-2">// ตรวจสอบประเภทข้อมูลด้วย type()</div>
                 <div className="text-slate-300">print(<span className="text-blue-400">type</span>(age))</div>
                 <div className="text-slate-400 italic bg-white/5 p-2 rounded mt-2 border-l-4 border-slate-600">
                   &gt;&gt; &lt;class 'int'&gt;
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* 3.3.2 Special Math Operators */}
        <div className="mb-20 mt-24">
           <div className="flex items-center gap-4 mb-10 pl-4 border-l-[6px] border-cyan-500">
             <h3 className="text-4xl font-bold text-slate-800">
               ตัวดำเนินการคณิตศาสตร์พิเศษของ Python
             </h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
             
             {/* Power */}
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
               <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                 <ChevronsUp className="w-8 h-8" />
               </div>
               <h5 className="text-2xl font-bold text-slate-800 mb-2">ยกกำลัง <code>**</code></h5>
               <p className="text-slate-600 leading-loose mb-6">ไม่ต้องใช้ฟังก์ชันยาวๆ ใช้ดาวสองดวงก็ยกกำลังได้เลย</p>
               <div className="bg-slate-900 text-white font-mono p-4 rounded-xl w-full text-left">
                 <span className="text-purple-400">2</span> ** <span className="text-purple-400">3</span><br/>
                 <span className="text-slate-500"># ผลลัพธ์: 8 (2*2*2)</span>
               </div>
             </div>
             
             {/* Floor Division */}
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
               <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                 <DivideSquare className="w-8 h-8" />
               </div>
               <h5 className="text-2xl font-bold text-slate-800 mb-2">หารปัดเศษทิ้ง <code>//</code></h5>
               <p className="text-slate-600 leading-loose mb-6">หารแบบปกติจะได้ Float แต่ถ้าใช้ // จะตัดเศษทิ้งกลายเป็น Int เสมอ</p>
               <div className="bg-slate-900 text-white font-mono p-4 rounded-xl w-full text-left">
                 <span className="text-blue-400">10</span> // <span className="text-blue-400">3</span><br/>
                 <span className="text-slate-500"># ผลลัพธ์: 3</span>
               </div>
             </div>

             {/* Modulo */}
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
               <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                 <Percent className="w-8 h-8" />
               </div>
               <h5 className="text-2xl font-bold text-slate-800 mb-2">หารเอาเศษ <code>%</code></h5>
               <p className="text-slate-600 leading-loose mb-6">พระเอกของวงการโปรแกรมมิ่ง! ใช้หาเศษที่เหลือจากการหาร</p>
               <div className="bg-slate-900 text-white font-mono p-4 rounded-xl w-full text-left">
                 <span className="text-cyan-400">10</span> % <span className="text-cyan-400">3</span><br/>
                 <span className="text-slate-500"># ผลลัพธ์: 1 (เศษ 1)</span>
               </div>
             </div>

           </div>

           {/* Modulo Game */}
           <ModuloGame />

        </div>

        {/* 3.3.3 Type Casting */}
        <div className="mb-20 mt-24">
           <div className="flex items-center gap-4 mb-10 pl-4 border-l-[6px] border-blue-600">
             <h3 className="text-4xl font-bold text-slate-800">
               การแปลงชนิดข้อมูลเป็นจำนวนเต็ม (Type Casting)
             </h3>
           </div>
           
           <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 mb-12">
             <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
               <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center shrink-0 shadow-lg">
                 <ArrowRight className="w-12 h-12" />
               </div>
               <div>
                 <p className="text-slate-600 leading-loose text-xl">
                   บ่อยครั้งที่เรารับข้อมูลเข้ามาในรูปแบบ <strong>"ข้อความ (String)"</strong> เช่น การรับค่าจากคีย์บอร์ดผ่าน <code>input()</code> 
                   หรือเป็น <strong>"ทศนิยม (Float)"</strong> แต่โปรแกรมเราต้องการนำตัวเลขเหล่านั้นไปคำนวณทางคณิตศาสตร์แบบจำนวนเต็ม 
                   เราจึงต้องพึ่งพาฟังก์ชัน <strong><code>int()</code></strong> ในการ "แปลงร่าง" บีบบังคับข้อมูลเหล่านั้นให้กลายเป็น Integer 
                 </p>
               </div>
             </div>
             
             {/* Simulator Component */}
             <IntegerCastingFactory />
             
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.3)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit3_3_Integer;
