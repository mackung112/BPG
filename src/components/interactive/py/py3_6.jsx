import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  ToggleRight,
  Lightbulb,
  LightbulbOff,
  Scale,
  Zap,
  Check,
  X,
  Target,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  Settings,
  RefreshCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// ============================================================================
// 1. Boolean Logic Gates Simulator (AND / OR / NOT)
// ============================================================================
const BooleanLogicGates = () => {
  const [operator, setOperator] = useState('and'); // 'and', 'or', 'not'
  
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  
  const [output, setOutput] = useState(false);

  useEffect(() => {
    if (operator === 'and') {
      setOutput(inputA && inputB);
    } else if (operator === 'or') {
      setOutput(inputA || inputB);
    } else if (operator === 'not') {
      setOutput(!inputA);
    }
  }, [inputA, inputB, operator]);

  const getGateDescription = () => {
    if (operator === 'and') return "ต้องเป็น True ทั้งคู่ ถึงจะยอมให้ไฟติด (เหมือนการต่อหลอดไฟแบบอนุกรม)";
    if (operator === 'or') return "แค่มี True ตัวใดตัวหนึ่ง หรือทั้งคู่ ไฟก็ติดแล้ว! (เหมือนการต่อหลอดไฟแบบขนาน)";
    if (operator === 'not') return "ดื้อดึงขั้นสุด! ตรงข้ามกับที่ป้อนเข้ามาเสมอ (สลับ True เป็น False, สลับ False เป็น True)";
    return "";
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Settings className="w-8 h-8 text-amber-400" />
          ห้องทดลองวงจรตรรกศาสตร์ (Logic Gates)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose text-lg">
          ลองเปิด-ปิดสวิตช์ด้านล่าง เพื่อดูพฤติกรรมของตัวดำเนินการตรรกะ <code>and</code>, <code>or</code>, และ <code>not</code>
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Mode Selector */}
        <div className="flex bg-slate-800 p-2 rounded-2xl mb-10 border border-slate-700 shadow-inner">
           <button 
             onClick={() => setOperator('and')}
             className={`flex-1 py-4 px-6 rounded-xl font-bold font-mono text-xl transition-all duration-300 ${operator === 'and' ? 'bg-amber-500 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-[1.02]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
           >
             AND
           </button>
           <button 
             onClick={() => setOperator('or')}
             className={`flex-1 py-4 px-6 rounded-xl font-bold font-mono text-xl transition-all duration-300 ${operator === 'or' ? 'bg-emerald-500 text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.02]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
           >
             OR
           </button>
           <button 
             onClick={() => setOperator('not')}
             className={`flex-1 py-4 px-6 rounded-xl font-bold font-mono text-xl transition-all duration-300 ${operator === 'not' ? 'bg-rose-500 text-slate-900 shadow-[0_0_20px_rgba(244,63,114,0.4)] scale-[1.02]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
           >
             NOT
           </button>
        </div>

        {/* Simulator Area */}
        <div className="bg-slate-950 border border-slate-700 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-12 shadow-inner min-h-[300px]">
          
          {/* Inputs */}
          <div className="flex flex-col gap-6 w-full md:w-1/3">
            <div className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-4 ${inputA ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-800 border-slate-700'}`} onClick={() => setInputA(!inputA)}>
               <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Input A</span>
               <div className={`text-3xl font-mono font-black ${inputA ? 'text-emerald-400' : 'text-slate-500'}`}>
                 {inputA ? 'True' : 'False'}
               </div>
               <div className={`w-16 h-8 rounded-full relative transition-colors ${inputA ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                 <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${inputA ? 'left-9' : 'left-1'}`}></div>
               </div>
            </div>

            {operator !== 'not' && (
              <div className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-4 ${inputB ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-800 border-slate-700'}`} onClick={() => setInputB(!inputB)}>
                 <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Input B</span>
                 <div className={`text-3xl font-mono font-black ${inputB ? 'text-emerald-400' : 'text-slate-500'}`}>
                   {inputB ? 'True' : 'False'}
                 </div>
                 <div className={`w-16 h-8 rounded-full relative transition-colors ${inputB ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                   <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${inputB ? 'left-9' : 'left-1'}`}></div>
                 </div>
              </div>
            )}
          </div>

          {/* Logic Gate Visual */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
             <div className="flex items-center gap-4 mb-4">
               {operator !== 'not' && <div className="h-0.5 w-12 bg-slate-600"></div>}
               <div className={`font-mono text-3xl font-black p-4 rounded-xl shadow-lg border-2 ${
                 operator === 'and' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' :
                 operator === 'or' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' :
                 'bg-rose-500/20 text-rose-400 border-rose-500/50'
               }`}>
                 {operator.toUpperCase()}
               </div>
               <div className="h-0.5 w-12 bg-slate-600"></div>
             </div>
             <p className="text-slate-500 text-sm text-center">Logic Gate</p>
          </div>

          {/* Output */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8 rounded-3xl border-4 transition-all duration-500" style={{
            backgroundColor: output ? 'rgba(250, 204, 21, 0.1)' : 'rgba(30, 41, 59, 0.5)',
            borderColor: output ? 'rgba(250, 204, 21, 0.5)' : 'rgba(51, 65, 85, 1)',
            boxShadow: output ? '0 0 40px rgba(250, 204, 21, 0.3)' : 'none'
          }}>
            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Output (Result)</span>
            
            {output ? (
              <Lightbulb className="w-24 h-24 text-yellow-400 animate-pulse drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] mb-4" />
            ) : (
              <LightbulbOff className="w-24 h-24 text-slate-600 mb-4" />
            )}
            
            <div className={`text-4xl font-mono font-black ${output ? 'text-yellow-400' : 'text-slate-500'}`}>
              {output ? 'True' : 'False'}
            </div>
          </div>

        </div>

        {/* Dynamic Explanation */}
        <div className={`mt-8 p-4 rounded-xl border flex items-start gap-4 text-left transition-colors duration-300 ${
          operator === 'and' ? 'bg-amber-950/30 border-amber-900/50 text-amber-200' :
          operator === 'or' ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-200' :
          'bg-rose-950/30 border-rose-900/50 text-rose-200'
        }`}>
          <HelpCircle className="w-6 h-6 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-bold">{getGateDescription()}</p>
        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 2. Comparison Simulator
// ============================================================================
const ComparisonSimulator = () => {
  const [val1, setVal1] = useState(10);
  const [val2, setVal2] = useState(5);
  const [compOp, setCompOp] = useState('>');
  const [result, setResult] = useState(true);

  useEffect(() => {
    let res = false;
    if (compOp === '>') res = val1 > val2;
    if (compOp === '<') res = val1 < val2;
    if (compOp === '==') res = val1 === val2;
    if (compOp === '!=') res = val1 !== val2;
    if (compOp === '>=') res = val1 >= val2;
    if (compOp === '<=') res = val1 <= val2;
    
    setResult(res);
  }, [val1, val2, compOp]);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16">
       <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-4">
         <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
           <Scale className="w-7 h-7" />
         </div>
         เครื่องชั่งตรรกะ (Comparison Operators)
       </h4>
       <p className="text-slate-600 leading-loose text-lg mb-10">
         ค่าความจริง (True/False) มักจะไม่ได้มาจากการพิมพ์ดื้อๆ แต่มักจะ <strong>เกิดจากการเปรียบเทียบ</strong> 
         ลองเปลี่ยนตัวเลขและเครื่องหมายเปรียบเทียบด้านล่างดูสิ!
       </p>
       
       <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-inner flex flex-col items-center">
         
         <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12">
            {/* Value 1 */}
            <input 
              type="number" 
              value={val1}
              onChange={(e) => setVal1(parseFloat(e.target.value) || 0)}
              className="bg-slate-800 border-2 border-slate-700 focus:border-indigo-500 rounded-2xl w-32 md:w-40 text-center font-mono text-4xl text-white py-4 outline-none transition-colors"
            />
            
            {/* Operator */}
            <select 
              value={compOp}
              onChange={(e) => setCompOp(e.target.value)}
              className="appearance-none bg-indigo-600 text-white font-mono text-4xl font-bold text-center w-24 h-24 rounded-2xl border-none outline-none cursor-pointer hover:bg-indigo-500 shadow-lg"
              style={{ textAlignLast: 'center' }}
            >
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
            </select>
            
            {/* Value 2 */}
            <input 
              type="number" 
              value={val2}
              onChange={(e) => setVal2(parseFloat(e.target.value) || 0)}
              className="bg-slate-800 border-2 border-slate-700 focus:border-indigo-500 rounded-2xl w-32 md:w-40 text-center font-mono text-4xl text-white py-4 outline-none transition-colors"
            />
         </div>
         
         <div className="flex flex-col items-center w-full">
           <div className="h-10 w-0.5 bg-slate-700 mb-2"></div>
           <ArrowDownToLineIcon className="w-6 h-6 text-slate-700 mb-6" />
           
           <div className={`w-full max-w-sm py-6 rounded-2xl border-4 flex justify-center items-center gap-4 transition-all duration-500 ${
             result ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-105' : 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-[0_0_30px_rgba(244,63,114,0.3)]'
           }`}>
             {result ? <Check className="w-10 h-10" /> : <X className="w-10 h-10" />}
             <span className="font-mono text-5xl font-black tracking-wider">
               {result ? 'True' : 'False'}
             </span>
           </div>
         </div>
         
       </div>
    </div>
  );
};

// Simple Arrow Down Icon component
const ArrowDownToLineIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 17V3"></path>
    <path d="m6 11 6 6 6-6"></path>
    <path d="M19 21H5"></path>
  </svg>
);


// ============================================================================
// 3. Truth Table Quiz Game
// ============================================================================
const TruthTableQuiz = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); 
  
  const questions = [
    { p: true, op: 'and', q: false, ans: false, exp: "True and False ได้ False (ต้องจริงทั้งคู่ถึงจะจริง)" },
    { p: false, op: 'or', q: true, ans: true, exp: "False or True ได้ True (แค่มีจริงโผล่มาสักตัว ก็จริงแล้ว)" },
    { p: true, op: 'not', q: null, ans: false, exp: "not True คือการกลับด้าน จึงกลายเป็น False" },
    { p: true, op: 'and', q: true, ans: true, exp: "True and True ได้ True แน่นอน!" },
    { p: false, op: 'or', q: false, ans: false, exp: "False or False ได้ False (ไม่มีจริงให้เลือกเลย)" },
  ];

  const handleAnswer = (selectedAns) => {
    if (gameState !== 'playing') return;
    
    const current = questions[level];
    if (selectedAns === current.ans) {
      setScore(score + 1);
      setGameState('correct');
    } else {
      setGameState('wrong');
    }
    
    setTimeout(() => {
      if (level + 1 < questions.length) {
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

  const current = questions[level] || questions[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-16">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-br-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        
        <div className="w-full md:w-1/2">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 font-bold mb-6 border border-indigo-500/30">
             <Target className="w-5 h-5" /> Minigame
           </div>
           <h4 className="text-3xl font-bold text-white mb-6">
             ทดสอบตารางความจริง (Truth Table)
           </h4>
           <p className="text-slate-400 leading-loose text-lg mb-8">
             มาดูกันว่าคุณแม่น Logic Gates หรือเปล่า! เลือกผลลัพธ์ที่ถูกต้องจากสมการตรรกศาสตร์ด้านขวามือ
           </p>
           
           <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
             <div className="flex justify-between items-center text-slate-300 font-bold mb-2">
               <span>ข้อที่ {Math.min(level + 1, questions.length)} / {questions.length}</span>
               <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-5 h-5"/> {score} ถูกต้อง</span>
             </div>
             <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
               <div 
                 className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                 style={{ width: `${(Math.min(level, questions.length) / questions.length) * 100}%` }}
               ></div>
             </div>
           </div>
        </div>

        <div className="w-full md:w-1/2">
          {gameState === 'gameover' ? (
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-10 text-center shadow-inner animate-[fadeIn_0.5s_ease-out]">
              <h4 className="text-3xl font-bold text-white mb-4">จบเกม!</h4>
              <div className="text-7xl font-black text-indigo-400 mb-6 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                {score} <span className="text-3xl text-slate-500">/ {questions.length}</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {score === questions.length ? 'สมบูรณ์แบบ! คุณคือปรมาจารย์ด้านตรรกศาสตร์!' : 
                 score >= 3 ? 'เก่งมาก! พื้นฐานตรรกะของคุณแน่นใช้ได้เลย' : 
                 'ไม่เป็นไร ค่อยๆ ทบทวนเรื่อง AND/OR ใหม่นะ สู้ๆ!'}
              </p>
              <button onClick={resetGame} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 w-full transition-all">
                <RefreshCcw className="w-5 h-5" /> เล่นใหม่อีกครั้ง
              </button>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-8 shadow-inner flex flex-col items-center relative min-h-[350px]">
              
              {/* Question Expression */}
              <div className="bg-[#1E1E1E] w-full rounded-2xl p-8 mb-8 border border-slate-800 flex items-center justify-center shadow-lg relative h-32">
                <div className="text-3xl lg:text-4xl font-mono font-bold text-white flex items-center gap-3">
                  {current.op === 'not' ? (
                    <>
                      <span className="text-rose-400">not</span> 
                      <span className={current.p ? "text-emerald-400" : "text-slate-400"}>{current.p ? 'True' : 'False'}</span>
                    </>
                  ) : (
                    <>
                      <span className={current.p ? "text-emerald-400" : "text-slate-400"}>{current.p ? 'True' : 'False'}</span>
                      <span className={current.op === 'and' ? "text-amber-400" : "text-purple-400"}>{current.op}</span>
                      <span className={current.q ? "text-emerald-400" : "text-slate-400"}>{current.q ? 'True' : 'False'}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => handleAnswer(true)}
                  disabled={gameState !== 'playing'}
                  className={`flex-1 py-6 rounded-2xl border-2 text-3xl font-mono font-bold transition-all duration-300 ${
                    (gameState === 'correct' || gameState === 'wrong') 
                      ? (current.ans === true 
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105 z-10' 
                          : 'bg-slate-900 border-slate-800 text-slate-700 opacity-30')
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-400'
                  }`}
                >
                  True
                </button>
                <button 
                  onClick={() => handleAnswer(false)}
                  disabled={gameState !== 'playing'}
                  className={`flex-1 py-6 rounded-2xl border-2 text-3xl font-mono font-bold transition-all duration-300 ${
                    (gameState === 'correct' || gameState === 'wrong') 
                      ? (current.ans === false 
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105 z-10' 
                          : 'bg-slate-900 border-slate-800 text-slate-700 opacity-30')
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200 hover:border-rose-500/50 hover:text-rose-400'
                  }`}
                >
                  False
                </button>
              </div>

              {/* Feedback Overlay */}
              {(gameState === 'correct' || gameState === 'wrong') && (
                <div className={`absolute bottom-0 left-0 w-full p-6 rounded-b-3xl flex flex-col items-center justify-center animate-[slideUp_0.3s_ease-out] ${gameState === 'correct' ? 'bg-emerald-500/95 text-white' : 'bg-rose-500/95 text-white'}`}>
                  <div className="flex items-center gap-2 font-bold text-2xl mb-2">
                    {gameState === 'correct' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                    {gameState === 'correct' ? 'ถูกต้อง!' : 'ผิดครับ!'}
                  </div>
                  <p className="text-sm md:text-base opacity-95 text-center leading-relaxed">{current.exp}</p>
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
// 4. Main Page Component
// ============================================================================
const pyUnit3_6_Boolean = () => {
  const teacherTaskContent = `
    ใบงาน "เช็คตรรกะ"
    1. ให้นักเรียนหาผลลัพธ์ของสมการเปรียบเทียบต่อไปนี้ (ตอบ True หรือ False):
       - 10 > 5
       - 20 == "20"
       - 5 != 10
    2. หาผลลัพธ์ของ Logic Gates:
       - True and False
       - True or False
       - not True
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.6.1 Boolean Basics */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 flex flex-col md:flex-row gap-12 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full md:w-1/2">
              <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-4">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                True และ False
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-8">
                ใน Python เราจะใช้คำว่า <strong className="text-emerald-500 font-mono text-xl">True</strong> (ขึ้นต้นด้วย T ใหญ่เสมอ) สำหรับค่าความจริง 
                และ <strong className="text-rose-500 font-mono text-xl">False</strong> (ขึ้นต้นด้วย F ใหญ่เสมอ) สำหรับค่าเท็จ
              </p>
              
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                   <Zap className="w-24 h-24 text-yellow-400" />
                 </div>
                 <strong className="text-white block mb-4 flex items-center gap-3 text-xl relative z-10">
                   <Lightbulb className="w-6 h-6 text-yellow-400"/> ความลับหลังบ้าน
                 </strong>
                 <p className="text-slate-300 leading-loose text-lg relative z-10">
                   จริงๆ แล้วคอมพิวเตอร์มอง <strong>True = 1</strong> และ <strong>False = 0</strong> 
                   ดังนั้นถ้าคุณอุตริเอา <code>True + True</code> ใน Python ผลลัพธ์ที่ได้จะออกมาเป็น <code>2</code> แบบงงๆ เลยล่ะ!
                 </p>
              </div>
           </div>
           
           <div className="w-full md:w-1/2">
             <div className="bg-[#1E1E1E] rounded-3xl p-8 shadow-2xl font-mono text-sm md:text-base border border-slate-800 relative overflow-hidden">
               <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                 <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                 <div className="ml-auto text-slate-500 text-xs">booleans.py</div>
               </div>
               
               <div className="space-y-4 relative z-10">
                 <div className="text-slate-500 mb-2">// การประกาศตัวแปร Boolean (ต้องพิมพ์ใหญ่ตัวแรกเสมอ)</div>
                 <div className="text-slate-300">is_online = <span className="text-emerald-400 font-bold">True</span></div>
                 <div className="text-slate-300">has_error = <span className="text-rose-400 font-bold">False</span></div>
                 
                 <div className="text-slate-500 mt-8 mb-2">// ถ้าพิมพ์ตัวเล็ก จะเกิด Syntax Error เพราะ Python ไม่รู้จัก</div>
                 <div className="text-slate-300">is_wrong = <span className="text-red-500 line-through">true</span>  <span className="text-slate-500 italic"># พัง! 💥</span></div>
                 
                 <div className="text-slate-500 mt-8 mb-2">// พิสูจน์ว่า True คือ 1</div>
                 <div className="text-slate-300">print(<span className="text-emerald-400 font-bold">True</span> + <span className="text-emerald-400 font-bold">True</span>)</div>
                 <div className="text-slate-400 italic bg-white/5 p-2 rounded mt-2 border-l-4 border-slate-600">
                   &gt;&gt; 2
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* 3.6.2 Comparison Simulator */}
        <ComparisonSimulator />

        {/* 3.6.3 Logic Gates (AND, OR, NOT) */}
        <div className="mt-24 mb-10">
           <div className="flex items-center gap-4 pl-4 border-l-[6px] border-amber-500">
             <h3 className="text-4xl font-bold text-slate-800">
               ตัวดำเนินการตรรกะ (Logical Operators)
             </h3>
           </div>
           <p className="text-slate-600 text-lg mt-6 pl-5 max-w-4xl leading-loose">
             ในชีวิตจริง เรามักต้องตัดสินใจโดยใช้เงื่อนไขหลายๆ อย่างประกอบกัน เช่น "ถ้าสอบผ่าน <strong className="text-amber-600">และ</strong> ไม่ขาดเรียน จะได้เกรด A" 
             ใน Python เราก็มีตัวเชื่อมเงื่อนไขเหล่านี้ คือ <code>and</code>, <code>or</code>, <code>not</code>
           </p>
        </div>
        
        <BooleanLogicGates />

        {/* 3.6.4 Truth Table Quiz */}
        <TruthTableQuiz />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.6)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit3_6_Boolean;
