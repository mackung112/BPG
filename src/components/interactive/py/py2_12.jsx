import React, { useState, useEffect, useRef } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  ArrowDown, 
  ArrowRight, 
  BookOpen, 
  Check, 
  ChevronRight, 
  Code2, 
  Info, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Terminal, 
  Sliders, 
  Activity, 
  Database,
  Cpu,
  Zap,
  Repeat
} from 'lucide-react';

// ============================================================================
// SOUND SYNTH FUNCTIONS (Web Audio API)
// ============================================================================
const playSound = (type, isMuted) => {};

// ============================================================================
// 1. CARD 1: แนวคิดการทำงานซ้ำตามเงื่อนไข (Looping Concept)
// ============================================================================
const LoopingConceptCard = ({ isMuted }) => {
  const [activeTab, setActiveTab] = useState('while');
  
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <Repeat className="w-7 h-7 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              แนวคิดการทำงานซ้ำและโครงสร้างลูป
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Looping Concepts & Iteration Structure</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          ในการเขียนโปรแกรมคอมพิวเตอร์ การกระทำคำสั่งซ้ำๆ กันหลายครั้งถือเป็นหัวใจสำคัญของการประมวลผลที่มีประสิทธิภาพ โครงสร้างการทำงานซ้ำ หรือ **ลูป (Loop)** ช่วยให้นักพัฒนาสามารถเขียนชุดคำสั่งสั้นๆ เพื่อทำงานซ้ำเป็นร้อยหรือเป็นล้านครั้งได้อย่างง่ายดาย โดยจะขึ้นอยู่กับการตรวจสอบเงื่อนไขทางตรรกศาสตร์
        </p>

        {/* 2. Loop Category Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => { playSound('click', isMuted); setActiveTab('while'); }}
            className={`p-5 rounded-2xl text-left border transition-all active:scale-98 ${activeTab === 'while' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
          >
            <span className="block font-bold text-base mb-1">1. ลูปแบบตรวจสอบเงื่อนไข (While Loop)</span>
            <span className={`text-[12px] ${activeTab === 'while' ? 'text-indigo-200' : 'text-slate-500'}`}>
              วนซ้ำแบบไม่รู้จำนวนรอบที่แน่นอน ทำงานซ้ำเรื่อยๆ จนกว่าเงื่อนไขที่เช็คจะเป็นเท็จ (False)
            </span>
          </button>

          <button 
            onClick={() => { playSound('click', isMuted); setActiveTab('for'); }}
            className={`p-5 rounded-2xl text-left border transition-all active:scale-98 ${activeTab === 'for' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
          >
            <span className="block font-bold text-base mb-1">2. ลูปแบบระบุรอบชัดเจน (For Loop)</span>
            <span className={`text-[12px] ${activeTab === 'for' ? 'text-indigo-200' : 'text-slate-500'}`}>
              วนซ้ำตามจำนวนรอบที่ระบุไว้ เช่น ดึงข้อมูลทีละตัวในกล่องพัสดุ (List) หรือตามระยะลำดับตัวเลข
            </span>
          </button>
        </div>

        {/* 3. Deep Dive Table */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6">
          <h5 className="text-sm font-bold text-slate-800 mb-3.5 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
            เปรียบเทียบความแตกต่าง (While vs For Structure)
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-2.5 pr-4">คุณลักษณะ (Feature)</th>
                  <th className="py-2.5 px-4 text-indigo-600 bg-indigo-50/50 rounded-t-xl">While Loop (ตรวจสอบเงื่อนไข)</th>
                  <th className="py-2.5 pl-4 text-emerald-600">For Loop (ระบุช่วง/ลิสต์)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                <tr>
                  <td className="py-3 pr-4 font-bold">จำนวนรอบการทำงาน</td>
                  <td className="py-3 px-4 font-semibold text-slate-700 bg-indigo-50/20">ไม่แน่นอน (ทำงานจนกว่าเงื่อนไขหลุดลูป)</td>
                  <td className="py-3 pl-4">แน่นอน (ขึ้นกับจำนวนข้อมูล หรือ Range)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">การกำหนดจุดเริ่ม/เพิ่มค่า</td>
                  <td className="py-3 px-4 text-slate-700 bg-indigo-50/20">ต้องระบุตัวแปรนับค่าและสั่งเพิ่มค่าด้วยตัวเองภายในบล็อก</td>
                  <td className="py-3 pl-4">ระบบจัดสรรเพิ่มค่ารอบถัดไปอัตโนมัติ (เช่น ในคำสั่ง range)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">รูปแบบการเขียน Python</td>
                  <td className="py-3 px-4 font-mono text-indigo-700 bg-indigo-50/20">while condition:</td>
                  <td className="py-3 pl-4 font-mono text-emerald-700">for item in sequence:</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">สถานการณ์ที่แนะนำ</td>
                  <td className="py-3 px-4 text-slate-700 bg-indigo-50/20">การรอรับข้อมูล, การรันเกม, การเติมน้ำลงถังจนเต็ม</td>
                  <td className="py-3 pl-4">การอ่านข้อมูลสมาชิก, คัดเกรดนักเรียนทั้งห้อง, พิมพ์สูตรคูณ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Summary Info */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>
            <strong>กฎเหล็กของลูป (Loop Rule):</strong> ในการสร้างลูปแบบ `while` ต้องออกแบบให้เงื่อนไขมีโอกาสเป็น **เท็จ (False)** เสมอ โดยการเพิ่มค่าสะสมตัวแปรนับรอบ เพราะหากไม่มีคำสั่งเปลี่ยนตรรกะในบล็อก ลูปจะทำงานซ้ำเรื่อยๆ ไม่มีวันสิ้นสุด ซึ่งเรียกว่า **"ลูปไม่รู้จบ (Infinite Loop)"** และทำให้ระบบคอมพิวเตอร์ค้างทำงานพังทลายลงในที่สุด
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 2. CARD 2: ตัวอย่างการเขียนผังงานแบบ while (While Loop Flowchart & Simulator)
// ============================================================================
const WhileLoopCard = ({ isMuted }) => {
  const [targetCapacity, setTargetCapacity] = useState(8);
  const [currentWater, setCurrentWater] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState('idle'); // idle, init, check, fill, success
  const [logs, setLogs] = useState([]);
  const timerRef = useRef(null);

  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentWater(0);
    setLogs(['[START] เริ่มต้นคำสั่งจำลอง...']);
    setActiveStep('init');
    playSound('click', isMuted);

    let step = 0;
    let waterTemp = 0;

    timerRef.current = setInterval(() => {
      step++;

      if (step === 1) {
        // init
        setActiveStep('init');
        setLogs(prev => [...prev, '⚡ กำหนดค่าตัวแปรเริ่มต้น water = 0 ลิตร']);
        playSound('click', isMuted);
      } else if (step === 2 || (step > 2 && activeStep === 'fill')) {
        // check condition
        setActiveStep('check');
        const cond = waterTemp < targetCapacity;
        setLogs(prev => [...prev, `🔍 ตรวจสอบเงื่อนไข: water < target (${waterTemp} < ${targetCapacity})? ผลลัพธ์: ${cond ? 'จริง (TRUE)' : 'เท็จ (FALSE)'}`]);
        playSound('click', isMuted);

        if (!cond) {
          // If condition is false, break and go to success screen
          setActiveStep('success');
          setLogs(prev => [...prev, '🚨 เงื่อนไขเป็นเท็จ -> หลุดออกนอกลูปเรียบร้อย!']);
          playSound('success', isMuted);
          clearInterval(timerRef.current);
          setIsRunning(false);
        }
      } else if (activeStep === 'check') {
        // fill water
        setActiveStep('fill');
        waterTemp += 2;
        setCurrentWater(waterTemp);
        setLogs(prev => [...prev, `💧 เติมน้ำเพิ่ม: water += 2 -> ยอดปัจจุบันคือ ${waterTemp} ลิตร`]);
        playSound('bubble', isMuted);
        
        // Loop back trigger
        setActiveStep('check');
        step = 1; // resets loop internally to jump back to check on next tick
      }
    }, 1500);
  };

  const resetSimulation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentWater(0);
    setIsRunning(false);
    setActiveStep('idle');
    setLogs([]);
    playSound('click', isMuted);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-50 rounded-bl-full z-0 pointer-events-none"></div>

      <style>{`
        @keyframes flow-active {
          to { stroke-dashoffset: -20; }
        }
        .flow-line-anim {
          stroke-dasharray: 6, 4;
          animation: flow-active 1s linear infinite;
        }
      `}</style>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-100 rounded-2xl text-cyan-600">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              ผังงานแบบวนซ้ำด้วย While Loop
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">While Loop Flowchart & Simulation</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          โครงสร้างลูปแบบ **While** จะทำงานซ้ำในส่วนคำสั่งภายใน (Body of Loop) เมื่อตรวจสอบผลลัพธ์ของตรรกะในเงื่อนไขการตัดสินใจหลักแล้วเป็น **จริง (True)** และจะไหลลูกศรวนลูปกลับไปตรวจสอบซ้ำที่หัวเพชรตัดสินใจเรื่อยๆ จนกว่าจะได้ผลลัพธ์เป็น **เท็จ (False)** คอมพิวเตอร์จึงจะเบนทิศทางเดินออกไปด่านนอกต่อไป
        </p>

        {/* 2. Dynamic Control & Simulator Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">1. ตั้งค่าเป้าหมายลูป (เครื่องหยอดเหรียญตักน้ำ):</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5 font-mono">
                    <span>ความจุน้ำเป้าหมาย (targetCapacity)</span>
                    <span className="text-cyan-600 font-bold text-sm">{targetCapacity} ลิตร</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    step="2"
                    disabled={isRunning}
                    value={targetCapacity}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setTargetCapacity(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 disabled:opacity-40"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">💧 ระบบเติมรอบละ 2 ลิตร สามารถขยับปรับเพื่อจำลองรอบคำนวณที่เปลี่ยนแปลงได้</p>
                </div>

                {/* Simulate Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={startSimulation}
                    disabled={isRunning}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs transition-all shadow-md shadow-cyan-100 disabled:opacity-40"
                  >
                    <Play className="w-4 h-4 fill-white" /> เริ่มตักน้ำจำลอง
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-95 text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Python Code Panel */}
              <div className="mt-5.5 bg-slate-900 p-4.5 rounded-2xl border border-slate-800 font-mono text-[12.5px] leading-relaxed text-slate-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// ตัวอย่างชุดคำสั่งภาษา Python (while)</span>
                <div className={`py-0.5 px-1 rounded transition-colors ${activeStep === 'init' ? 'bg-cyan-950 text-cyan-300 font-bold border-l-2 border-cyan-500 pl-2' : ''}`}>
                  water = 0
                </div>
                <div className={`py-0.5 px-1 rounded transition-colors ${activeStep === 'check' ? 'bg-cyan-950 text-cyan-300 font-bold border-l-2 border-cyan-500 pl-2' : ''}`}>
                  while water &lt; <span className="text-orange-400 font-bold">{targetCapacity}</span>:
                </div>
                <div className={`pl-4 py-0.5 px-1 rounded transition-colors ${activeStep === 'fill' ? 'bg-emerald-950 text-emerald-300 font-bold border-l-2 border-emerald-500 pl-2' : ''}`}>
                  water += 2
                </div>
                <div className={`pl-4 py-0.5 px-1 rounded text-slate-500`}>
                  print("เติมน้ำแล้ว:", water)
                </div>
                <div className={`py-0.5 px-1 rounded transition-colors ${activeStep === 'success' ? 'bg-cyan-950 text-cyan-300 font-bold border-l-2 border-cyan-500 pl-2' : ''}`}>
                  print("น้ำเต็มถังแล้ว!")
                </div>
              </div>
            </div>

            {/* Simulated Water Bucket graphics */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-16 h-20 bg-slate-100 border-2 border-slate-300 rounded-b-2xl relative overflow-hidden shrink-0 shadow-inner">
                {/* Water Level inside */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-cyan-500/80 transition-all duration-700 shadow-[0_0_10px_#0ea5e9]"
                  style={{ height: `${(currentWater / targetCapacity) * 100}%` }}
                ></div>
                {/* Grid measurement markers */}
                <div className="absolute inset-0 flex flex-col justify-between text-[7px] text-slate-400 font-mono p-1 pointer-events-none">
                  <span>- MAX</span>
                  <span>- 50%</span>
                  <span>- 0</span>
                </div>
              </div>
              <div className="flex-1 space-y-1 text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase">ระดับน้ำในถัง:</span>
                <div className="text-base font-extrabold text-slate-700 font-mono">
                  {currentWater} / <span className="text-cyan-600">{targetCapacity} ลิตร</span>
                </div>
                <span className={`text-[10.5px] font-bold inline-block px-2.5 py-0.5 rounded-full ${currentWater >= targetCapacity ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'}`}>
                  {currentWater >= targetCapacity ? '✓ น้ำประมวลผลเต็มถัง' : '⚡ กำลังดำเนินการตักน้ำ...'}
                </span>
              </div>
            </div>
          </div>

          {/* SVG Visualizer Flowchart */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[480px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> while flowchart tracer</span>
              <span className={activeStep !== 'idle' ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>
                status: {activeStep}
              </span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="320" viewBox="0 0 380 320" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-w" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0ea5e9" />
                  </marker>
                  <marker id="arr-e" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                  </marker>
                  <marker id="arr-s" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                  </marker>
                </defs>

                {/* START OVAL */}
                <rect x="140" y="5" width="100" height="24" rx="12" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="20" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">START</text>

                {/* Line down to Init */}
                <path d="M 190,29 L 190,50" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-w)" />

                {/* INIT BLOCK (water = 0) */}
                <rect x="140" y="50" width="100" height="26" rx="4" 
                  fill={activeStep === 'init' ? "#082f49" : "#0f172a"} 
                  stroke={activeStep === 'init' ? "#0ea5e9" : "#334155"} 
                  strokeWidth={activeStep === 'init' ? "2" : "1.5"}
                />
                <text x="190" y="66" fill={activeStep === 'init' ? "#bae6fd" : "#94a3b8"} fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle">กำหนด water = 0</text>

                {/* Junction circle point at 190,92 above Diamond */}
                <circle cx="190" cy="92" r="3.5" fill="#0ea5e9" />

                {/* Line to Diamond */}
                <path d="M 190,76 L 190,105" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-w)" />

                {/* WHILE DECISION DIAMOND */}
                <polygon points="190,105 250,135 190,165 130,135" 
                  fill={activeStep === 'check' ? "#064e3b" : "#1c1917"} 
                  stroke={activeStep === 'check' ? "#10b981" : "#d97706"} 
                  strokeWidth="1.5"
                />
                <text x="190" y="139" fill={activeStep === 'check' ? "#a7f3d0" : "#fde68a"} fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle">water &lt; target?</text>

                {/* YES (Down) to Increment */}
                <path d="M 190,165 L 190,205" fill="none" 
                  stroke={isRunning && activeStep === 'fill' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                  markerEnd={isRunning && activeStep === 'fill' ? "url(#arr-e)" : "url(#arr-s)"}
                  className={isRunning && activeStep === 'fill' ? "flow-line-anim" : ""} 
                />
                <text x="215" y="185" fill={isRunning && activeStep === 'fill' ? "#10b981" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">จริง (Yes)</text>

                {/* PROCESS BLOCK (water += 2) */}
                <rect x="135" y="205" width="110" height="26" rx="4" 
                  fill={activeStep === 'fill' ? "#064e3b" : "#0f172a"} 
                  stroke={activeStep === 'fill' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="190" y="221" fill={activeStep === 'fill' ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle">เติมน้ำ water += 2</text>

                {/* LOOP BACK PATH (Left & Up) - Height adjusted to y=240 to avoid crossing END path */}
                <path d="M 190,231 L 190,240 L 90,240 L 90,92 L 186,92" fill="none" 
                  stroke={isRunning && activeStep === 'check' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                  markerEnd={isRunning && activeStep === 'check' ? "url(#arr-e)" : "url(#arr-s)"}
                />

                {/* NO BRANCH (Right -> Down to Display) */}
                <path d="M 250,135 L 305,135 L 305,198" fill="none" 
                  stroke={activeStep === 'success' ? "#0ea5e9" : "#334155"} 
                  strokeWidth="1.5" 
                  markerEnd={activeStep === 'success' ? "url(#arr-w)" : "url(#arr-s)"}
                />
                <text x="278" y="127" fill={activeStep === 'success' ? "#0ea5e9" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">เท็จ (No)</text>

                {/* POINTED DISPLAY SHAPE (x=305) */}
                <g transform="translate(243.5, 200) scale(1.3 0.5)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" 
                    fill={activeStep === 'success' ? "#0c4a6e" : "#0f172a"} 
                    stroke={activeStep === 'success' ? "#0ea5e9" : "#334155"} 
                    strokeWidth="1.5" 
                  />
                </g>
                <text x="305" y="214" fill={activeStep === 'success' ? "#bae6fd" : "#94a3b8"} fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" textAnchor="middle">ต้มน้ำเต็มถัง!</text>

                {/* Line down to END - Height adjusted to y=262 to avoid crossing Loop path */}
                <path d="M 305,226 L 305,262 L 190,262" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 190,262 L 190,275" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-w)" />

                {/* END OVAL */}
                <rect x="140" y="275" width="100" height="24" rx="12" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="290" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">END</text>
              </svg>
            </div>

            {/* Live Terminal logs */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10.5px] font-mono text-slate-400 h-28 overflow-y-auto space-y-1 select-none">
              <span className="text-slate-500 font-bold block">// คอนโซลแสดงสถานะการเช็คลูป:</span>
              {logs.map((log, idx) => (
                <div key={idx} className={log.includes('จริง') ? 'text-emerald-400' : log.includes('เท็จ') ? 'text-amber-400' : log.includes('START') ? 'text-slate-400' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Card Summary */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <span>
            <strong>เจาะลึกผังงานแบบ While:</strong> เส้นทางย้อนลูปจะลากจากส่วนท้ายสุดของบล็อกทำงานภายในย้อนขึ้นไปประกบที่เส้นทางหลักด้านบน "เหนือเพชรการตัดสินใจ" เสมอ เพื่อบังคับให้คอมพิวเตอร์เข้ากระบวนการตรวจสอบค่าซ้ำรอบใหม่ และเส้นขากลับนี้ห้ามวาดทแยงหรือลากไขว้ทับเส้นขากระโดดออกนอกลูปเด็ดขาด
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 3. CARD 3: ตัวอย่างการเขียนผังงานแบบ for (For Loop Flowchart & Conveyor Belt)
// ============================================================================
const ForLoopCard = ({ isMuted }) => {
  const [boxCount, setBoxCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState('idle'); // idle, init, check, scan, success
  const [logs, setLogs] = useState([]);
  const timerRef = useRef(null);

  const parcelLabels = ['A', 'B', 'C', 'D', 'E'];
  const activeParcels = parcelLabels.slice(0, boxCount);

  const startScanning = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentIndex(-1);
    setLogs(['[START] เริ่มเปิดระบบสแกนสายพาน...']);
    setActiveStep('init');
    playSound('click', isMuted);

    let idx = -1;
    let step = 0;

    timerRef.current = setInterval(() => {
      step++;

      if (step === 1) {
        // init
        setActiveStep('init');
        setLogs(prev => [...prev, `⚡ ดึงข้อมูลกล่องพัสดุ: labels = ${JSON.stringify(activeParcels)}`]);
        playSound('click', isMuted);
      } else if (step === 2 || (step > 2 && activeStep === 'scan')) {
        // check if index < count
        setActiveStep('check');
        idx++;
        const hasMore = idx < boxCount;
        setLogs(prev => [...prev, `🔍 เช็ครอบ: ตัวดึงข้อมูลดึงชิ้นที่ index [${idx}] สำเร็จหรือไม่? -> ${hasMore ? 'สำเร็จ (มีพัสดุ)' : 'หมดแล้ว (ลูปจบ)'}`]);
        playSound('click', isMuted);

        if (!hasMore) {
          // loop completed
          setActiveStep('success');
          setLogs(prev => [...prev, '🚨 ประมวลผลพัสดุครบถ้วน -> ปิดการทำงานสายพาน!']);
          playSound('success', isMuted);
          clearInterval(timerRef.current);
          setIsRunning(false);
        } else {
          setCurrentIndex(idx);
        }
      } else if (activeStep === 'check') {
        // scan action
        setActiveStep('scan');
        setLogs(prev => [...prev, `📸 [สแกนบาร์โค้ด] กล่องพัสดุ ${activeParcels[idx]} ตรวจสอบสินค้าเรียบร้อย!`]);
        playSound('scan', isMuted);
        
        // Loop trigger back
        setActiveStep('check');
        step = 1;
      }
    }, 1600);
  };

  const resetScanning = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex(-1);
    setIsRunning(false);
    setActiveStep('idle');
    setLogs([]);
    playSound('click', isMuted);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
            <Repeat className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              ผังงานแบบวนซ้ำด้วย For Loop
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">For Loop Flowchart & Scanning Simulation</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          โครงสร้างลูปแบบ **For** ในภาษา Python มักใช้เพื่อการวนอ่านดึงสมาชิกแบบลำดับลำเลียง เช่น พัสดุแต่ละกล่องในลิสต์เก็บสะสม โดยตัวประมวลผลจะวิ่งวนขดลูปเพื่อเข้าสแกนประเมินงานสมาชิกทีละชิ้น และจะสับปลายลูกศรไปข้างหน้าโดยอัตโนมัติเมื่อคัดกรองพัสดุสะสมครบเรียบร้อย
        </p>

        {/* 2. Controls & Simulator split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">1. ตั้งจำนวนกล่องพัสดุบนสายพาน:</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5 font-mono">
                    <span>จำนวนกล่องพัสดุสะสม (boxCount)</span>
                    <span className="text-emerald-600 font-bold text-sm">{boxCount} กล่อง</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="5"
                    step="1"
                    disabled={isRunning}
                    value={boxCount}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setBoxCount(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-40"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">📦 ตัวแปรอ็อบเจกต์จะถูกเก็บลงใน List และวนสแกนอ่านค่าแบบจำกัดรอบชัดเจน</p>
                </div>

                {/* Simulate Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={startScanning}
                    disabled={isRunning}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs transition-all shadow-md shadow-emerald-100 disabled:opacity-40"
                  >
                    <Play className="w-4 h-4 fill-white" /> เริ่มสแกนพัสดุจำลอง
                  </button>
                  <button
                    onClick={resetScanning}
                    className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-95 text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Python representation */}
              <div className="mt-5.5 bg-slate-900 p-4.5 rounded-2xl border border-slate-800 font-mono text-[12.5px] leading-relaxed text-slate-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// คำสั่งประมวลผล For ใน Python</span>
                <div>boxes = {JSON.stringify(activeParcels)}</div>
                <div className={`py-0.5 px-1 rounded transition-colors ${activeStep === 'check' ? 'bg-emerald-950 text-emerald-300 font-bold border-l-2 border-emerald-500 pl-2' : ''}`}>
                  for item in boxes:
                </div>
                <div className={`pl-4 py-0.5 px-1 rounded transition-colors ${activeStep === 'scan' ? 'bg-emerald-950 text-emerald-300 font-bold border-l-2 border-emerald-500 pl-2' : ''}`}>
                  scan(item)
                </div>
                <div className={`pl-4 py-0.5 px-1 text-slate-500`}>
                  print("สแกนสำเร็จ:", item)
                </div>
                <div className={`py-0.5 px-1 rounded transition-colors ${activeStep === 'success' ? 'bg-emerald-950 text-emerald-300 font-bold border-l-2 border-emerald-500 pl-2' : ''}`}>
                  print("สแกนหมดถ้วนแล้ว!")
                </div>
              </div>
            </div>

            {/* Conveyer Belt visual graphic */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-2.5">ภาพจำลองกระดานสายพานลำเลียง:</span>
              <div className="h-16 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200 flex items-center justify-around px-3 gap-1.5 shadow-inner">
                {/* conveyor tracks */}
                <div className="absolute inset-x-0 bottom-1 h-2 bg-slate-300 bg-[repeating-linear-gradient(90deg,#94a3b8,#94a3b8_8px,#cbd5e1_8px,#cbd5e1_16px)]"></div>
                
                {/* conveyor parcels */}
                {activeParcels.map((label, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isScanned = idx < currentIndex;
                  return (
                    <div 
                      key={label}
                      className={`w-11 h-11 rounded-lg border flex flex-col items-center justify-center font-mono font-bold text-xs transition-all relative z-10 ${
                        isCurrent 
                          ? 'bg-amber-500 border-amber-600 text-white scale-110 shadow-md ring-2 ring-amber-300 shadow-amber-200' 
                          : isScanned 
                            ? 'bg-slate-200 border-slate-300 text-slate-400 line-through' 
                            : 'bg-emerald-100 border-emerald-300 text-emerald-700'
                      }`}
                    >
                      <span className="text-[9px] opacity-75 font-sans font-normal">Box</span>
                      {label}
                      {isScanned && <Check className="w-3.5 h-3.5 text-emerald-600 absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-sm border border-emerald-300" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SVG Diagram showing For Loop logic */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[480px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> for flowchart tracer</span>
              <span className="text-emerald-400 font-semibold font-mono">
                match: boxes {currentIndex + 1} / {boxCount}
              </span>
            </div>

            {/* Flowchart SVG */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="320" viewBox="0 0 380 320" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-f" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                  </marker>
                  <marker id="arr-m" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                  </marker>
                  <marker id="arr-x" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                  </marker>
                </defs>

                {/* START OVAL */}
                <rect x="140" y="5" width="100" height="24" rx="12" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="20" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">START</text>

                {/* Line down to Init */}
                <path d="M 190,29 L 190,50" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-m)" />

                {/* INIT BLOCK (boxes = [...]) */}
                <rect x="135" y="50" width="110" height="26" rx="4" 
                  fill={activeStep === 'init' ? "#064e3b" : "#0f172a"} 
                  stroke={activeStep === 'init' ? "#10b981" : "#334155"} 
                  strokeWidth={activeStep === 'init' ? "2" : "1.5"}
                />
                <text x="190" y="66" fill={activeStep === 'init' ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle">ดึงข้อมูลลิสต์พัสดุ</text>

                {/* Junction circle point at 190,92 above Loop Diamond */}
                <circle cx="190" cy="92" r="3.5" fill="#10b981" />

                {/* Line to Diamond */}
                <path d="M 190,76 L 190,105" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-m)" />

                {/* FOR DECISION DIAMOND */}
                <polygon points="190,105 255,135 190,165 125,135" 
                  fill={activeStep === 'check' ? "#064e3b" : "#1c1917"} 
                  stroke={activeStep === 'check' ? "#10b981" : "#d97706"} 
                  strokeWidth="1.5"
                />
                <text x="190" y="139" fill={activeStep === 'check' ? "#a7f3d0" : "#fde68a"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">มีกล่องพัสดุเหลือ?</text>

                {/* YES (Down) to Scan process */}
                <path d="M 190,165 L 190,205" fill="none" 
                  stroke={isRunning && activeStep === 'scan' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                  markerEnd={isRunning && activeStep === 'scan' ? "url(#arr-f)" : "url(#arr-x)"}
                />
                <text x="215" y="185" fill={isRunning && activeStep === 'scan' ? "#10b981" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">จริง (Yes)</text>

                {/* PROCESS BLOCK (Scan Box) */}
                <rect x="135" y="205" width="110" height="26" rx="4" 
                  fill={activeStep === 'scan' ? "#064e3b" : "#0f172a"} 
                  stroke={activeStep === 'scan' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="190" y="221" fill={activeStep === 'scan' ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle">สแกนชิ้นถัดไปบนสายพาน</text>

                {/* LOOP BACK PATH (Left & Up) - Height adjusted to y=240 to avoid crossing END path */}
                <path d="M 190,231 L 190,240 L 85,240 L 85,92 L 186,92" fill="none" 
                  stroke={isRunning && activeStep === 'check' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                  markerEnd={isRunning && activeStep === 'check' ? "url(#arr-f)" : "url(#arr-x)"}
                />

                {/* NO BRANCH (Right -> Down to Display) */}
                <path d="M 255,135 L 310,135 L 310,198" fill="none" 
                  stroke={activeStep === 'success' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                  markerEnd={activeStep === 'success' ? "url(#arr-f)" : "url(#arr-x)"}
                />
                <text x="282" y="127" fill={activeStep === 'success' ? "#10b981" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">เท็จ (No)</text>

                {/* POINTED DISPLAY SHAPE (x=310) */}
                <g transform="translate(248.5, 200) scale(1.3 0.5)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" 
                    fill={activeStep === 'success' ? "#064e3b" : "#0f172a"} 
                    stroke={activeStep === 'success' ? "#10b981" : "#334155"} 
                    strokeWidth="1.5" 
                  />
                </g>
                <text x="310" y="214" fill={activeStep === 'success' ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" textAnchor="middle">สแกนพัสดุครบแล้ว!</text>

                {/* Line down to END - Height adjusted to y=262 to avoid crossing Loop path */}
                <path d="M 310,226 L 310,262 L 190,262" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 190,262 L 190,275" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-m)" />

                {/* END OVAL */}
                <rect x="140" y="275" width="100" height="24" rx="12" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="290" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">END</text>
              </svg>
            </div>

            {/* Console logs */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10.5px] font-mono text-slate-400 h-28 overflow-y-auto space-y-1 select-none">
              <span className="text-slate-500 font-bold block">// คอนโซลเอาต์พุตสะสม:</span>
              {logs.map((log, idx) => (
                <div key={idx} className={log.includes('สำเร็จ') ? 'text-emerald-400' : log.includes('หมดแล้ว') ? 'text-amber-400' : log.includes('START') ? 'text-slate-400' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Summary */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปตรรกะ For Loop:</strong> โครงสร้าง For มีข้อเด่นในการจัดสรรสายประมวลผลที่ปลอดภัย เพราะตัวโปรแกรมจะรู้วิกฤติตารางขอบเขตชัดเจนโดยตรง ทำให้โอกาสเกิดภาวะลูปไม่รู้จบ (Infinite Loop) ต่ำกว่าลูปแบบ while และสามารถนำข้อมูลแต่ละตัวออกมาใช้ในตัวประมวลผลได้เสถียรที่สุด
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 4. MAIN PAGE COMPONENT (Vertical Stack Layout & Layer 1 Backdrop)
// ============================================================================
export default function pyUnit2_12_LoopingFlowcharts() {
  const [isMuted, setIsMuted] = useState(false);

  const teacherTaskContent = `ใบงานกิจกรรมปฏิบัติ: ปฏิบัติการสร้างผังงานและการเขียนโค้ดลูปวนซ้ำ
ให้นักเรียนเปิดเครื่องมือเขียนโปรแกรมคอมพิวเตอร์และเขียนคำสั่งเพื่อตอบโจทย์ดังต่อไปนี้:

1. เขียนคำสั่งสร้างระบบจำลองรับหยอดเหรียญซื้อเครื่องดื่มอัตโนมัติด้วย Python (โครงสร้างลูปวนซ้ำ while):
   - กำหนดตัวแปรสะสมยอดเงินยอดหยอด cash = 0 และราคาน้ำกระป๋องที่ต้องจ่าย target_price = 15 บาท
   - สร้างลูป while เพื่อวนซ้ำรับเงินรอบละ 5 บาท (จำลองคีย์คำสั่ง cash += 5) จนกว่าจะครบ 15 บาท
   - ตรวจเงื่อนไข cash < target_price? ในลูป และพิมพ์ความคืบหน้ายอดปัจจุบันออกหน้าจอ
   - เมื่อหยอดครบ 15 บาท ให้แสดงคำว่า "ได้รับเครื่องดื่มแล้ว!" ผ่าน pointed Display shape

2. ออกแบบและวาดแผนภูมิผังงาน (Flowchart) ของลูป while นี้ลงในกระดานเครื่องมือ draw.io 
   - จัดทิศทางลูกศรวนกลับ (Loop back path) ให้ขนานขึ้นประกบเหนือหัวเพชรตัดสินใจอย่างถูกต้องตามมาตรฐาน ANSI 
   - และตรวจสอบความคมชัดระนาบรอยต่อ และติดตั้งจุดต่อทิศทาง (Merge Connector Dot) ให้ครบถ้วนสมบูรณ์`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative">
      
      {/* LAYER 1: Ambient Backdrop (Glowing blur rings) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[8%] w-[450px] h-[450px] rounded-full bg-cyan-100/40 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[8%] w-[480px] h-[480px] rounded-full bg-emerald-100/30 blur-[140px]"></div>
      </div>



      {/* LAYER 3: Vertically Stacked Content Cards */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-4 space-y-16">
        
        {/* Card 1: แนวคิดการทำงานซ้ำ */}
        <LoopingConceptCard isMuted={isMuted} />

        {/* Card 2: ผังงานแบบวนซ้ำด้วย While Loop (ถังเติมน้ำ) */}
        <WhileLoopCard isMuted={isMuted} />

        {/* Card 3: ผังงานแบบวนซ้ำด้วย For Loop (สายพานพัสดุ) */}
        <ForLoopCard isMuted={isMuted} />

        {/* LAYER 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="ใบงานปฏิบัติ 2.12" 
          taskText={teacherTaskContent} 
        />

      </main>
    </div>
  );
}
