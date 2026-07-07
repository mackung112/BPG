import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Scale, 
  AlertOctagon, 
  CheckCircle2, 
  Check, 
  X, 
  ArrowRightLeft, 
  Search,
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  RefreshCw,
  Trophy,
  HelpCircle
} from 'lucide-react';

// ============================================================================
// CARD 1: 4.5.1 ตัวดำเนินการเปรียบเทียบ (==, !=, >, <, >=, <=)
// ============================================================================
const ComparisonOverview = () => {
  const ops = [
    { symbol: "==", name: "เท่ากับ (Equal)", desc: "ตรวจสอบว่าค่าฝั่งซ้ายและฝั่งขวามีความเท่ากันหรือไม่", ex: "10 == 10", res: "True", color: "from-blue-500 to-indigo-500", border: "border-indigo-100" },
    { symbol: "!=", name: "ไม่เท่ากับ (Not Equal)", desc: "ตรวจสอบว่าค่าฝั่งซ้ายและฝั่งขวามีค่าต่างกันหรือไม่", ex: "5 != 10", res: "True", color: "from-rose-500 to-pink-500", border: "border-rose-100" },
    { symbol: ">", name: "มากกว่า (Greater Than)", desc: "ตรวจสอบว่าค่าฝั่งซ้ายมากกว่าฝั่งขวาอย่างชัดเจน", ex: "12 > 8", res: "True", color: "from-amber-500 to-orange-500", border: "border-amber-100" },
    { symbol: "<", name: "น้อยกว่า (Less Than)", desc: "ตรวจสอบว่าค่าฝั่งซ้ายน้อยกว่าฝั่งขวาอย่างชัดเจน", ex: "3 < 9", res: "True", color: "from-teal-500 to-emerald-500", border: "border-emerald-100" },
    { symbol: ">=", name: "มากกว่าหรือเท่ากับ", desc: "ตรวจสอบว่าค่าฝั่งซ้ายมีค่ามากกว่า หรือเท่ากับฝั่งขวา", ex: "8 >= 8", res: "True", color: "from-purple-500 to-violet-500", border: "border-purple-100" },
    { symbol: "<=", name: "น้อยกว่าหรือเท่ากับ", desc: "ตรวจสอบว่าค่าฝั่งซ้ายมีค่าน้อยกว่า หรือเท่ากับฝั่งขวา", ex: "2 <= 5", res: "True", color: "from-cyan-500 to-sky-500", border: "border-cyan-100" }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
          <Search className="w-7 h-7 text-amber-500" />
          ตารางเครื่องหมายเปรียบเทียบใน Python
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-8">
          ตัวดำเนินการเปรียบเทียบ (Comparison Operators) ใช้สำหรับทดสอบสมมติฐานระหว่างข้อมูล 2 ฝั่ง 
          โดยคอมพิวเตอร์จะคืนค่าเป็นตรรกะ <strong>Boolean</strong> คือ <strong>True (จริง)</strong> หรือ <strong>False (เท็จ)</strong> เพียงอย่างใดอย่างหนึ่งเท่านั้น:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ops.map((op, idx) => (
            <div key={idx} className={`bg-slate-50 p-6 rounded-2xl border-2 hover:border-amber-400 hover:bg-white transition-all flex flex-col justify-between shadow-sm relative overflow-hidden group`}>
              <div>
                <span className={`inline-block font-mono text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r ${op.color} pb-1`}>
                  {op.symbol}
                </span>
                <h5 className="font-bold text-slate-800 text-[15px] mb-1">{op.name}</h5>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{op.desc}</p>
              </div>
              
              <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200/50 flex justify-between items-center font-mono text-xs text-slate-700">
                <span className="text-slate-500">{op.ex}</span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {op.res}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 2: ตัวแจ้งเตือน = vs ==
// ============================================================================
const EqualityWarning = () => {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center gap-10 border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="lg:w-1/2 relative z-10">
        <div className="inline-flex items-center gap-2 text-rose-500 font-bold mb-4 bg-rose-500/10 border border-rose-500/30 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
          <AlertOctagon className="w-4 h-4 shrink-0 animate-pulse" /> ข้อควรระวังระดับสูงสุดของโปรแกรมเมอร์
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          อย่าสับสนระหว่าง <br/>
          <code className="text-amber-500 bg-slate-800 px-2.5 py-0.5 rounded font-mono font-bold">=</code> กับ <code className="text-emerald-500 bg-slate-800 px-2.5 py-0.5 rounded font-mono font-bold">==</code>
        </h3>
        <p className="text-slate-400 text-sm md:text-[15px] leading-relaxed">
          นี่คือจุดผิดพลาดยอดฮิตอันดับ 1 ของคนหัดเขียนโค้ด! เครื่องหมายกำหนดค่าเดี่ยวกับเครื่องหมายเปรียบเทียบเท่ากับมีหน้าตาคล้ายกัน แต่ทำงานต่างกันโดยสิ้นเชิงในคอมพิวเตอร์:
        </p>
      </div>

      <div className="lg:w-1/2 w-full flex flex-col gap-4 relative z-10 font-sans">
        <div className="bg-slate-800/60 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl font-black font-mono text-amber-500 w-12 text-center">=</span>
            <div>
              <h4 className="font-bold text-white text-sm md:text-base">กำหนดค่า (Assignment)</h4>
              <p className="text-xs text-slate-400">นำข้อมูลฝั่งขวา เข้าไปจัดเก็บไว้ในตัวแปรกล่องฝั่งซ้าย</p>
            </div>
          </div>
          <code className="block bg-slate-950 p-2.5 rounded-lg text-xs text-slate-300 font-mono mt-2 text-center border border-slate-800">
            <span className="text-blue-400">score</span> = <span className="text-purple-400">100</span> <span className="text-slate-500 ml-2"># score เก็บค่า 100</span>
          </code>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/30 p-5 rounded-2xl">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl font-black font-mono text-emerald-500 w-12 text-center">==</span>
            <div>
              <h4 className="font-bold text-white text-sm md:text-base">เปรียบเทียบความเท่ากัน (Equality)</h4>
              <p className="text-xs text-slate-400">ยิงคำถามถาม CPU ว่า ข้อมูล 2 ฝั่ง มีค่าเท่ากันใช่หรือไม่?</p>
            </div>
          </div>
          <code className="block bg-slate-950 p-2.5 rounded-lg text-xs text-slate-300 font-mono mt-2 text-center border border-slate-800">
            <span className="text-yellow-300">print</span>(<span className="text-blue-400">score</span> == <span className="text-purple-400">100</span>) <span className="text-slate-500 ml-2"># ผลลัพธ์เป็น: True</span>
          </code>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 3: ตาชั่งตรรกะเชิงเปรียบเทียบ (Interactive Logic Scale Playground)
// ============================================================================
const LogicScalePlayground = () => {
  const [leftVal, setLeftVal] = useState('10');
  const [rightVal, setRightVal] = useState('5');
  const [operator, setOperator] = useState('>');
  const [result, setResult] = useState(true);

  const operators = [
    { symbol: '==', label: 'เท่ากันใช่ไหม (==)' },
    { symbol: '!=', label: 'ไม่เท่ากันใช่ไหม (!=' },
    { symbol: '>', label: 'มากกว่าใช่ไหม (>)' },
    { symbol: '<', label: 'น้อยกว่าใช่ไหม (<)' },
    { symbol: '>=', label: 'มากกว่าหรือเท่ากัน (>=)' },
    { symbol: '<=', label: 'น้อยกว่าหรือเท่ากัน (<=)' }
  ];

  useEffect(() => {
    let a = isNaN(leftVal) || leftVal === '' ? leftVal : Number(leftVal);
    let b = isNaN(rightVal) || rightVal === '' ? rightVal : Number(rightVal);

    let res = false;
    if (operator === '==') res = a == b;
    if (operator === '!=') res = a != b;
    if (operator === '>') res = a > b;
    if (operator === '<') res = a < b;
    if (operator === '>=') res = a >= b;
    if (operator === '<=') res = a <= b;

    setResult(res);
  }, [leftVal, rightVal, operator]);

  let rotationAngle = 0;
  const leftNum = Number(leftVal);
  const rightNum = Number(rightVal);
  if (!isNaN(leftNum) && !isNaN(rightNum)) {
    if (leftNum > rightNum) rotationAngle = -10;
    else if (leftNum < rightNum) rotationAngle = 10;
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 left-0 w-48 h-48 bg-amber-50 rounded-br-full z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-8">
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2.5">
          <Scale className="w-7 h-7 text-amber-500" />
          เครื่องจำลองตาชั่งตรรกะเปรียบเทียบ
        </h4>
        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed text-sm md:text-[15px]">
          กรอกตัวเลขทั้งสองฝั่ง และปรับเครื่องหมายเปรียบเทียบ สังเกตการถ่วงดุลของตาชั่งน้ำหนักและการวิเคราะห์บูลีนในโค้ด Python:
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 p-6 rounded-3xl flex flex-col justify-center gap-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition-all text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">ตัวแปรกระดานซ้าย (a)</span>
            <input 
              type="text"
              value={leftVal}
              onChange={(e) => setLeftVal(e.target.value)}
              className="bg-transparent border-none outline-none text-2xl font-bold font-mono text-center text-slate-700 w-full"
            />
          </div>

          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">เลือกเงื่อนไขเปรียบเทียบ</label>
            <div className="relative">
              <select 
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full bg-slate-800 text-amber-400 font-mono font-bold text-center h-12 rounded-xl border-2 border-slate-700 appearance-none focus:outline-none focus:border-amber-400 pr-10 pl-6 cursor-pointer"
              >
                {operators.map((op) => (
                  <option key={op.symbol} value={op.symbol}>
                    {op.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400 font-bold text-[10px]">
                ▼
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition-all text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">ตัวแปรกระดานขวา (b)</span>
            <input 
              type="text"
              value={rightVal}
              onChange={(e) => setRightVal(e.target.value)}
              className="bg-transparent border-none outline-none text-2xl font-bold font-mono text-center text-slate-700 w-full"
            />
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between items-center shadow-inner">
          <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest text-center mb-4">
            # ตาชั่งจำลองตรรกศาสตร์ (Balance Physics)
          </span>

          <div className="w-full flex-grow flex items-center justify-center min-h-[160px]">
            <svg viewBox="0 0 200 150" width="100%" className="max-w-[180px] h-auto">
              <path d="M 80 130 L 120 130 L 110 120 L 90 120 Z" fill="#475569" />
              <line x1="100" y1="120" x2="100" y2="50" stroke="#475569" strokeWidth="4" />
              <circle cx="100" cy="50" r="5" fill="#f59e0b" />

              <g 
                style={{ transform: `rotate(${rotationAngle}deg)`, transformOrigin: "100px 50px", transition: "all 0.5s ease-in-out" }}
              >
                <line x1="30" y1="50" x2="170" y2="50" stroke="#64748b" strokeWidth="3" />
                <line x1="30" y1="50" x2="30" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M 10 85 L 50 85 L 45 92 L 15 92 Z" fill="#475569" />
                {!isNaN(leftNum) && leftNum > 0 && (
                  <rect x="23" y="73" width="14" height="12" rx="2" fill="#f59e0b" className="animate-pulse" />
                )}

                <line x1="170" y1="50" x2="170" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M 150 85 L 190 85 L 185 92 L 155 92 Z" fill="#475569" />
                {!isNaN(rightNum) && rightNum > 0 && (
                  <rect x="163" y="73" width="14" height="12" rx="2" fill="#10b981" className="animate-pulse" />
                )}
              </g>
            </svg>
          </div>

          <div className="text-[10px] text-center text-slate-400 leading-relaxed mt-4">
            ตาชั่งเอียงดุลตามค่าน้ำหนักตัวแปร: ซ้าย = <strong className="text-white">{leftVal}</strong> | ขวา = <strong className="text-white">{rightVal}</strong>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-950 rounded-3xl p-6 border border-slate-900 flex flex-col justify-between gap-6">
          <div>
            <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-900 pb-2 mb-4">
              <span># python sandbox code</span>
              <span className="text-amber-500 font-bold">result state</span>
            </div>

            <div className="font-mono text-xs leading-loose text-slate-300">
              <span className="text-blue-400">a</span> = <span className="text-orange-300">{isNaN(leftVal) || leftVal === '' ? `"${leftVal}"` : leftVal}</span><br />
              <span className="text-blue-400">b</span> = <span className="text-orange-300">{isNaN(rightVal) || rightVal === '' ? `"${rightVal}"` : rightVal}</span><br />
              <span className="text-blue-400">check</span> = <span className="text-blue-400">a</span> <span className="text-amber-500 font-bold">{operator}</span> <span className="text-blue-400">b</span><br />
              <span className="text-indigo-400">print</span>(<span className="text-blue-400">check</span>)
            </div>
          </div>

          <div className="border-t border-slate-900 pt-4">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-2">
              Console Output result:
            </span>
            <div className="flex flex-col items-center">
              <div className={`px-8 py-3 rounded-2xl text-2xl font-black font-mono tracking-wide shadow-lg border-2 inline-block transition-all duration-300 ${
                result
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-emerald-500/5'
                  : 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-rose-500/5'
              }`}>
                {result ? 'True' : 'False'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// CARD 4: มินิเกม: ประตูมิติเปรียบเทียบตรรกศาสตร์ (Boolean Portal Game)
// ============================================================================
const BooleanPortalGame = () => {
  const [level, setLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState('playing');
  const [score, setScore] = useState(0);

  const challenges = {
    1: {
      formula: '"cat" == "cat"',
      correct: 'True',
      tip: "ข้อความสะกดเหมือนกันและเปรียบเทียบด้วยเครื่องหมายเท่ากับ (==)",
      reason: 'สายอักขระ (String) มีตัวสะกดเหมือนกันเป๊ะ ผลลัพธ์จึงเป็นจริง'
    },
    2: {
      formula: '15 != 15',
      correct: 'False',
      tip: "ถามว่า 15 ไม่เท่ากับ 15 ใช่หรือไม่?",
      reason: '15 มีค่าเท่ากับ 15 ดังนั้น ข้ออ้างว่า 15 ไม่เท่ากับ 15 จึงเป็นเท็จ'
    },
    3: {
      formula: '9.8 >= 9.8',
      correct: 'True',
      tip: "ทศนิยม 9.8 มากกว่า หรือเท่ากับ 9.8 หรือไม่?",
      reason: 'เนื่องจากมีเงื่อนไขเท่ากับอยู่ด้วย ทำให้สมมติฐานนี้มีค่าเป็นจริง'
    },
    4: {
      formula: '"Python" == "python"',
      correct: 'False',
      tip: "ข้อความ Case Sensitive: ตัวพิมพ์ใหญ่ P และตัวพิมพ์เล็ก p",
      reason: 'Python มีการเปรียบเทียบแบบแบ่งแยกอักษรตัวเล็ก/ใหญ่ ผลเปรียบเทียบจึงเป็นเท็จ'
    },
    5: {
      formula: '100 <= 99',
      correct: 'False',
      tip: "ตัวตั้ง 100 มีค่าน้อยกว่าหรือเท่ากับ 99 หรือไม่?",
      reason: '100 มีค่ามากกว่า 99 อย่างชัดเจน โค้ดส่งค่าเท็จ (False)'
    }
  };

  const handleChoosePortal = (choice) => {
    if (gameStatus !== 'playing') return;
    const currentTask = challenges[level];
    
    if (choice === currentTask.correct) {
      setScore(prev => prev + 1);
      setGameStatus('success');
    } else {
      setGameStatus('fail');
    }
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setGameStatus('playing');
  };

  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setGameStatus('playing');
  };

  const activeChallenge = challenges[level];

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 rounded-bl-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-8">
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Gamification Zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2.5">
          <Trophy className="w-8 h-8 text-amber-400" />
          มินิเกม: ประตูมิติสัจจะบูลีน (Boolean Portal Game)
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-sm md:text-[15px]">
          ส่งคำสั่งสมการเปรียบเทียบผ่านประตูมิติให้ถูกต้อง เพื่อสะสมพลังงานบูลีนและประเมินค่าชนิดข้อมูล Boolean!
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-slate-800/60 rounded-3xl p-6 md:p-8 border border-slate-700 flex flex-col justify-between gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">ด่านทดสอบที่ {level} / 5</span>
              <span className="text-xs font-mono text-slate-400">คะแนนสะสม: <strong className="text-emerald-400">{score}</strong></span>
            </div>

            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div 
                  key={idx}
                  className={`h-2 rounded-full flex-1 transition-all ${
                    idx === level ? 'bg-amber-400 animate-pulse' : idx < level ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                ></div>
              ))}
            </div>

            {level <= 5 ? (
              <>
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-900 text-center font-mono py-10 shadow-inner">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">// ประเมินลอจิกสมการนี้</div>
                  <div className="text-2xl md:text-3xl font-bold text-white tracking-widest">
                    {activeChallenge.formula}
                  </div>
                </div>

                {gameStatus === 'playing' && (
                  <div className="bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl text-amber-300 text-[12px] leading-relaxed mt-6 flex gap-2">
                    <Info className="w-5 h-5 shrink-0 text-amber-400 mt-0.5 animate-pulse" />
                    <span><strong>เคล็ดพอร์ทัล:</strong> {activeChallenge.tip}</span>
                  </div>
                )}

                {gameStatus === 'success' && (
                  <div className="bg-emerald-500/15 border border-emerald-500/30 p-4 rounded-xl text-emerald-400 text-xs md:text-sm mt-6 flex gap-2.5 items-center animate-pulse">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <div>
                      <strong className="block text-white">ถูกต้อง! โค้ดรันสำเร็จ</strong>
                      <span>{activeChallenge.reason}</span>
                    </div>
                  </div>
                )}

                {gameStatus === 'fail' && (
                  <div className="bg-rose-500/15 border border-rose-500/30 p-4 rounded-xl text-rose-500 text-xs md:text-sm mt-6 flex gap-2.5 items-center">
                    <AlertOctagon className="w-6 h-6 shrink-0 animate-bounce" />
                    <div>
                      <strong className="block text-white">ประเมินลอจิกผิดพลาด!</strong>
                      <span>{activeChallenge.reason}</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 bg-slate-950 rounded-2xl border border-slate-900">
                <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
                <h5 className="text-xl font-bold text-white mb-2">จบภารกิจพอร์ทัลเปรียบเทียบ!</h5>
                <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                  คุณทำผลงานสะสมคะแนนได้: <strong className="text-emerald-400">{score} คะแนนเต็ม 5</strong> ยอดเยี่ยมมากในการเรียนรู้ Boolean!
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {gameStatus === 'success' && level < 5 && (
              <button
                onClick={nextLevel}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3.5 rounded-xl font-bold transition-all active:scale-98 flex items-center justify-center gap-1 text-xs md:text-sm shadow-md"
              >
                <span>ลุยต่อมิติตัดสินใจถัดไป</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {gameStatus === 'success' && level === 5 && (
              <button
                onClick={() => setLevel(6)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3.5 rounded-xl font-bold transition-all active:scale-98 flex items-center justify-center gap-1 text-xs md:text-sm"
              >
                <span>ดูสรุปผลถ้วยรางวัล</span>
              </button>
            )}

            {gameStatus === 'fail' && (
              <button
                onClick={() => setGameStatus('playing')}
                className="w-full bg-slate-700 hover:bg-slate-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all active:scale-98 text-xs md:text-sm"
              >
                ลองวิเคราะห์และแก้ตัวอีกรอบ
              </button>
            )}

            {level > 5 && (
              <button
                onClick={restartGame}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all active:scale-98 text-xs md:text-sm shadow-lg"
              >
                <RefreshCw className="w-4 h-4 inline mr-1.5" /> เล่นเก็บคะแนนอีกครั้ง
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-800/40 rounded-3xl p-6 border border-slate-700/80 flex flex-col justify-center gap-5">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
            ส่งข้อมูลเปรียบเทียบเข้าสู่ Portal
          </span>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center">
            <button
              onClick={() => handleChoosePortal('True')}
              disabled={gameStatus !== 'playing' || level > 5}
              className={`flex-1 p-6 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 active:scale-95 ${
                gameStatus === 'playing' && level <= 5
                  ? 'bg-emerald-500/10 border-emerald-500/40 hover:bg-emerald-500/25 hover:border-emerald-400 text-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/35">
                T
              </div>
              <strong className="block text-sm font-bold uppercase tracking-wider">True Gate</strong>
              <span className="text-[10px] text-slate-400">เงื่อนไขเป็นจริง</span>
            </button>

            <button
              onClick={() => handleChoosePortal('False')}
              disabled={gameStatus !== 'playing' || level > 5}
              className={`flex-1 p-6 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 active:scale-95 ${
                gameStatus === 'playing' && level <= 5
                  ? 'bg-rose-500/10 border-rose-500/40 hover:bg-rose-500/25 hover:border-rose-400 text-rose-300 hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-lg border border-rose-500/35">
                F
              </div>
              <strong className="block text-sm font-bold uppercase tracking-wider">False Gate</strong>
              <span className="text-[10px] text-slate-400">เงื่อนไขเป็นเท็จ</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// MAIN EXPORT COMPONENT (Unit 4.5)
// ============================================================================
export default function py4_5() {
  const teacherTaskContent = `โจทย์ปฏิบัติการตรวจเช็คระบบความปลอดภัยส่วนบุคคล:

ให้นักเรียนเปิดเครื่องมือเขียนโปรแกรมระดับ IDE และเขียนสคริปต์ตรวจสอบการเข้าร่วมกิจกรรมเครื่องเล่นความเร็วสูง:
1. ประกาศรับข้อมูลอินพุตจากผู้ใช้งาน 2 ชนิด:
   - อายุ (age) ด้วย int(input(...))
   - ส่วนสูง (height) หน่วยเซนติเมตร ด้วย int(input(...))

2. ตรวจสอบสิทธิ์การเปรียบเทียบ:
   - ตรวจว่าอายุผ่านเกณฑ์ (อายุตั้งแต่ 12 ปีขึ้นไป) และจัดเก็บในตัวแปร is_old_enough
   - ตรวจว่าส่วนสูงผ่านเกณฑ์ (ส่วนสูงตั้งแต่ 140 ซม. ขึ้นไป) และจัดเก็บในตัวแปร is_tall_enough

3. แสดงผลลัพธ์ผ่าน f-string ในคอนโซล เช่น:
   "อายุผ่านเกณฑ์หรือไม่? : True"
   "ส่วนสูงผ่านเกณฑ์หรือไม่? : False"`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-amber-200 selection:text-amber-900 relative">
      {/* Layer 1: Ambient Background Glow Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-amber-100/40 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-[140px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        <ComparisonOverview />
        <EqualityWarning />
        <LogicScalePlayground />
        <BooleanPortalGame />

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 4.5)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
