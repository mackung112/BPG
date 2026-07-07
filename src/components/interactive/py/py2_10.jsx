import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  ArrowDown, 
  ArrowRight, 
  BookOpen, 
  Check, 
  ChevronRight, 
  Code2, 
  HelpCircle, 
  Info, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Terminal, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  Database,
  Cpu,
  Layers,
  X
} from 'lucide-react';

// ============================================================================
// SOUND SYNTH FUNCTIONS (Web Audio API)
// ============================================================================
const playSound = (type, isMuted) => {};

// ============================================================================
// 1. CARD 1: แนวคิดการทำงานแบบลำดับจากบนลงล่าง (Sequential Flow Concept)
// ============================================================================
const SequentialConceptCard = ({ isMuted }) => {
  const [step, setStep] = useState(0); // 0 to 5
  const [memory, setMemory] = useState({ base: '?', height: '?', area: '?' });
  const [consoleLogs, setConsoleLogs] = useState([]);

  const codeLines = [
    { num: 1, text: '# กำหนดความยาวฐานของรูปสามเหลี่ยม', type: 'comment' },
    { num: 2, text: 'base = 12.0', type: 'input', value: { base: '12.0' } },
    { num: 3, text: '# กำหนดความสูงของรูปสามเหลี่ยม', type: 'comment' },
    { num: 4, text: 'height = 8.0', type: 'input', value: { height: '8.0' } },
    { num: 5, text: '# คำนวณพื้นที่ตามสูตรคณิตศาสตร์', type: 'comment' },
    { num: 6, text: 'area = 0.5 * base * height', type: 'process', value: { area: '48.0' } },
    { num: 7, text: '# แสดงผลลัพธ์ผ่านหน้าจอคอมพิวเตอร์', type: 'comment' },
    { num: 8, text: 'print(f"พื้นที่: {area} ตร.หน่วย")', type: 'output', log: '> พื้นที่: 48.0 ตร.หน่วย' }
  ];

  const runNextStep = () => {
    playSound('click', isMuted);
    if (step >= 5) {
      // Reset
      setStep(0);
      setMemory({ base: '?', height: '?', area: '?' });
      setConsoleLogs([]);
      return;
    }

    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep === 1) {
      setMemory({ base: '12.0', height: '?', area: '?' });
      setConsoleLogs(['[ระบบ]: เริ่มประมวลผลตัวแปร base...']);
    } else if (nextStep === 2) {
      setMemory({ base: '12.0', height: '8.0', area: '?' });
      setConsoleLogs(prev => [...prev, '[ระบบ]: รับค่าตัวแปร height...']);
    } else if (nextStep === 3) {
      setMemory({ base: '12.0', height: '8.0', area: '48.0' });
      setConsoleLogs(prev => [...prev, '[ระบบ]: ประมวลผลสูตร 0.5 * 12.0 * 8.0...']);
    } else if (nextStep === 4) {
      setConsoleLogs(prev => [...prev, '> พื้นที่: 48.0 ตร.หน่วย']);
    } else if (nextStep === 5) {
      setConsoleLogs(prev => [...prev, '[ระบบ]: เสร็จสิ้นกระบวนการทำงาน (END)']);
      playSound('success', isMuted);
    }
  };

  const resetDebug = () => {
    playSound('click', isMuted);
    setStep(0);
    setMemory({ base: '?', height: '?', area: '?' });
    setConsoleLogs([]);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* ==================== 1. Content Overview ==================== */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-100 rounded-2xl text-cyan-600">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              แนวคิดการทำงานแบบลำดับจากบนลงล่าง
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Sequential Top-to-Bottom Structure</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          โครงสร้างควบคุมแบบ **เรียงลำดับ (Sequential)** คือโครงสร้างพื้นฐานที่สุดในการเขียนโค้ดคอมพิวเตอร์และการวาดผังงาน โดยโปรแกรมจะเริ่มทำงานบรรทัดแรกสุดและประมวลผลต่อเนื่องลงมาด้านล่างทีละบรรทัดแบบเส้นตรง ปราศจากการตัดสินใจแยกเส้นทางเลี้ยวเบี่ยง และไม่มีการวนซ้ำกลับมาทำส่วนเดิม
        </p>

        {/* ==================== 2. Syntax Deep Dive ==================== */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
          <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-cyan-500" />
            วิเคราะห์ไวยากรณ์ผังงานเส้นตรง (Sequential Logic Breakdown)
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] leading-relaxed text-slate-600">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm">
              <span className="font-bold text-slate-800 block mb-1">1. ลำดับเหตุการณ์ (Linear Sequence)</span>
              คอมพิวเตอร์ประมวลผลจากจุดเริ่มต้น มุ่งตรงลงหาจุดจบ ทิศทางของลูกศรจะชี้ลงสู่ด้านล่างเสมอ (ไม่มีลูกศรชี้กลับด้านบน)
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm">
              <span className="font-bold text-slate-800 block mb-1">2. การไหลของตัวแปร (Data Stream)</span>
              ตัวแปรต้นจะถูกประกาศก่อนด้านบน จากนั้นตัวประมวลผล (Process) จะนำตัวแปรต้นไปรวมหรือคำนวณค่า เพื่อส่งต่อข้อมูลให้สัญลักษณ์ถัดไป
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm">
              <span className="font-bold text-slate-800 block mb-1">3. ความสม่ำเสมอของตรรกะ (Consistency)</span>
              ในผังงานแบบเรียงลำดับ ทุกรูปทรงกระบวนการ (Start, Input, Process, Output, End) จะทำงานเพียง **รอบเดียว** และไม่เคยถูกข้ามเลยสักขั้นตอน
            </div>
          </div>
        </div>

        {/* ==================== 3 & 4. Real Code & Interactive Debugger ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Debugger Controls & Code View */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">โค้ดคำนวณสามเหลี่ยม (Python):</span>
              
              <div className="bg-slate-900 rounded-2xl p-4.5 border border-slate-800 font-mono text-[13px] leading-relaxed space-y-1.5 overflow-x-auto shadow-inner">
                {codeLines.map((line) => {
                  // Determine if this line is active based on step
                  let isActive = false;
                  if (step === 1 && line.num === 2) isActive = true;
                  if (step === 2 && line.num === 4) isActive = true;
                  if (step === 3 && line.num === 6) isActive = true;
                  if (step === 4 && line.num === 8) isActive = true;

                  return (
                    <div 
                      key={line.num} 
                      className={`flex gap-3 px-2 py-0.5 rounded transition-all duration-300 ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-200 font-bold border-l-4 border-cyan-500 pl-1' 
                          : line.type === 'comment' 
                            ? 'text-slate-500 italic' 
                            : 'text-slate-300'
                      }`}
                    >
                      <span className="text-slate-600 select-none w-4 text-right">{line.num}</span>
                      <span>{line.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Memory Variable View */}
              <div className="mt-5 bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-500" /> ตารางสถานะหน่วยความจำ (Memory State)
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="block text-[10px] text-slate-400 font-bold font-mono">base (ฐาน)</span>
                    <strong className={`block text-sm mt-0.5 font-mono ${memory.base !== '?' ? 'text-cyan-600 font-bold' : 'text-slate-400'}`}>{memory.base}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="block text-[10px] text-slate-400 font-bold font-mono">height (สูง)</span>
                    <strong className={`block text-sm mt-0.5 font-mono ${memory.height !== '?' ? 'text-cyan-600 font-bold' : 'text-slate-400'}`}>{memory.height}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="block text-[10px] text-slate-400 font-bold font-mono">area (พื้นที่)</span>
                    <strong className={`block text-sm mt-0.5 font-mono ${memory.area !== '?' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>{memory.area}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Step actions */}
            <div className="flex gap-2.5">
              <button
                onClick={runNextStep}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white active:scale-98 rounded-xl font-bold py-3 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-100 text-xs uppercase"
              >
                <ChevronRight className="w-4 h-4 animate-pulse" /> 
                {step === 0 ? 'เริ่มประมวลผลคำสั่ง' : step >= 5 ? 'รีเซ็ตการรันโปรแกรม' : 'รันบรรทัดถัดไป (Next)'}
              </button>

              {step > 0 && (
                <button
                  onClick={resetDebug}
                  className="p-3 bg-slate-200 hover:bg-slate-300 text-slate-700 active:scale-95 rounded-xl transition-all border border-slate-300"
                  title="เริ่มจำลองใหม่"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Canvas SVG Diagram & Simulated Terminal output */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden group">
            {/* Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> debugging sequence flowchart
              </span>
              <span className="text-cyan-400 font-semibold font-mono">
                {step === 0 ? 'idle: waiting' : step === 5 ? 'process terminated' : `executing step ${step}`}
              </span>
            </div>

            {/* Flowchart SVG with dynamic step highlights */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="280" viewBox="0 0 380 280" className="max-w-[380px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                <defs>
                  <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0ea5e9" />
                  </marker>
                </defs>

                {/* START (Highlight at step 0 & 1) */}
                <rect x="140" y="5" width="100" height="28" rx="14" 
                  fill={step === 1 ? "#1e1b4b" : "#0f172a"} 
                  stroke={step === 1 ? "#0ea5e9" : "#334155"} 
                  strokeWidth={step === 1 ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />
                <text x="190" y="22" fill={step === 1 ? "#38bdf8" : "#94a3b8"} fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">START</text>

                {/* Line 1 */}
                <path d="M 190,33 L 190,55" stroke={step >= 1 ? "#0ea5e9" : "#334155"} strokeWidth="1.5" markerEnd="url(#arrow-blue)" />

                {/* INPUT PARALLELOGRAM (Highlight at step 1 & 2) */}
                <polygon points="135,55 255,55 235,90 115,90" 
                  fill={step === 2 ? "#082f49" : "#0f172a"} 
                  stroke={step === 2 ? "#0ea5e9" : "#334155"} 
                  strokeWidth={step === 2 ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />
                <text x="185" y="76" fill={step === 2 ? "#38bdf8" : "#94a3b8"} fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" textAnchor="middle">รับค่า base และ height</text>

                {/* Line 2 */}
                <path d="M 185,90 L 185,115" stroke={step >= 2 ? "#0ea5e9" : "#334155"} strokeWidth="1.5" markerEnd="url(#arrow-blue)" />

                {/* PROCESS RECTANGLE (Highlight at step 3) */}
                <rect x="115" y="115" width="140" height="30" rx="5" 
                  fill={step === 3 ? "#1e1b4b" : "#0f172a"} 
                  stroke={step === 3 ? "#0ea5e9" : "#334155"} 
                  strokeWidth={step === 3 ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />
                <text x="185" y="134" fill={step === 3 ? "#38bdf8" : "#94a3b8"} fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">area = 0.5 * base * height</text>

                {/* Line 3 */}
                <path d="M 185,145 L 185,170" stroke={step >= 3 ? "#0ea5e9" : "#334155"} strokeWidth="1.5" markerEnd="url(#arrow-blue)" />

                {/* OUTPUT DISPLAY SYMBOL (pointed shape scaled)
                    path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z"
                    Aligned to center at exactly x=185 with sx=1.4 to prevent text overflow.
                */}
                <g transform="translate(111.5, 170) scale(1.4 0.7)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" 
                    fill={step === 4 ? "#064e3b" : "#0f172a"} 
                    stroke={step === 4 ? "#10b981" : "#334155"} 
                    strokeWidth={step === 4 ? "2.5" : "1.5"}
                    className="transition-all duration-300"
                  />
                </g>
                <text x="185" y="190" fill={step === 4 ? "#a7f3d0" : "#94a3b8"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">แสดงค่าพื้นที่ (area)</text>

                {/* Line 4 */}
                <path d="M 185,202 L 185,225" stroke={step >= 4 ? "#0ea5e9" : "#334155"} strokeWidth="1.5" markerEnd="url(#arrow-blue)" />

                {/* END OVAL (Highlight at step 5) */}
                <rect x="140" y="225" width="90" height="26" rx="13" 
                  fill={step === 5 ? "#1e1b4b" : "#0f172a"} 
                  stroke={step === 5 ? "#0ea5e9" : "#334155"} 
                  strokeWidth={step === 5 ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />
                <text x="185" y="241" fill={step === 5 ? "#38bdf8" : "#94a3b8"} fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">END</text>
              </svg>
            </div>

            {/* Simulated Live Console Log */}
            <div className="relative z-10">
              <span className="text-[10px] text-slate-500 font-mono mb-2 uppercase tracking-wider flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Output Virtual Shell
              </span>
              <div className="bg-black/60 border border-slate-900 rounded-xl p-4.5 min-h-[85px] font-mono text-xs text-emerald-400 flex flex-col justify-end gap-1.5 shadow-inner">
                {consoleLogs.length === 0 ? (
                  <span className="text-slate-600 italic select-none">รันโปรแกรมทีละขั้นเพื่อดูเอาต์พุต...</span>
                ) : (
                  consoleLogs.map((log, idx) => (
                    <span key={idx} className="animate-fade-in">{log}</span>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ==================== 5. Summary ==================== */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปแนวคิดแบบเรียงลำดับ:</strong> การทำงานแบบเรียงลำดับเป็นพื้นฐานของตรรกะโปรแกรมมิ่ง เพราะคอมพิวเตอร์ไม่มีทางข้ามขั้นตอนไปประมวลผลด้านล่างได้หากขั้นตอนก่อนหน้ายังทำไม่เสร็จ ทำให้เกิดความเป็นเส้นตรงและตรรกะที่ติดตามย้อนรอยได้เสถียรที่สุด
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 2. CARD 2: ตัวอย่างการเขียนผังงานแบบเรียงลำดับ (Sequential Flowchart Examples)
// ============================================================================
const SequentialExamplesCard = ({ isMuted }) => {
  const [price, setPrice] = useState(200);
  const [vatRate, setVatRate] = useState(7); // 7%
  const [quizLevel, setQuizLevel] = useState(1);
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizState, setQuizState] = useState('playing'); // playing, success, fail
  const [xp, setXp] = useState(0);

  // Dynamic calculated values
  const vatAmount = (price * (vatRate / 100)).toFixed(2);
  const totalPrice = (price + parseFloat(vatAmount)).toFixed(2);

  const quizCases = {
    1: {
      title: 'ควิซวัดผลขั้นที่ 1: คำนวณยอดสุทธิร้านกาแฟ',
      question: 'ถ้าราคากาแฟร้อนในเมนู 120 บาท มีค่าบริการบวกภาษี VAT 10% ยอดเงินสุทธิ (Total) ที่ต้องพิมพ์ออกมาเป็นเท่าใด?',
      options: [
        { key: 'A', text: '120 บาท', isCorrect: false },
        { key: 'B', text: '130 บาท', isCorrect: false },
        { key: 'C', text: '132 บาท', isCorrect: true, feedback: 'ถูกต้อง! คำนวณโดยนำ 120 + (120 * 0.10) = 132 บาท ยอดเยี่ยม!' },
        { key: 'D', text: '144 บาท', isCorrect: false }
      ],
      tip: 'สูตรประมวลผลคือ: total = price + (price * vat_rate)'
    },
    2: {
      title: 'ควิซวัดผลขั้นที่ 2: หักหาค่าภาษีเฉพาะส่วน',
      question: 'ถ้าร้านวัสดุก่อสร้างขายราคาสินค้าป้าย 800 บาท มีอัตราภาษี 7% ยอดภาษี VAT (ที่เป็นกระบวนการคิดเฉพาะส่วน vat = price * vat_rate) เป็นเท่าใด?',
      options: [
        { key: 'A', text: '56 บาท', isCorrect: true, feedback: 'เป๊ะมาก! ยอดภาษีดิบอย่างเดียวคือ 800 * 0.07 = 56 บาทถ้วน!' },
        { key: 'B', text: '856 บาท', isCorrect: false },
        { key: 'C', text: '42 บาท', isCorrect: false },
        { key: 'D', text: '80 บาท', isCorrect: false }
      ],
      tip: 'สูตรประมวลผลหาเฉพาะยอดแวตคือ: vat = price * vat_rate'
    },
    3: {
      title: 'ควิซวัดผลขั้นที่ 3: ระบบส่วนลดสมทบแวตสุทธิ',
      question: 'ในผังงานขั้นสูง: price = 100 -> discount = 20 -> vat = (price - discount) * 0.07 -> total = price - discount + vat ยอดรวมสุทธิสุดสิ้นคือเท่าใด?',
      options: [
        { key: 'A', text: '87 บาท', isCorrect: false },
        { key: 'B', text: '85.6 บาท', isCorrect: true, feedback: 'สุดยอด! (100 - 20) + ((100-20)*0.07) = 80 + 5.6 = 85.6 บาท ประมวลผลแบบเส้นตรงไร้ที่ติ!' },
        { key: 'C', text: '80 บาท', isCorrect: false },
        { key: 'D', text: '93.6 บาท', isCorrect: false }
      ],
      tip: 'คิดหาผลรวมหลังหักส่วนลดก่อน จากนั้นจึงหาแวต 7% ของยอดสุทธิแล้วสมทบยอดเข้าด้วยกัน'
    }
  };

  const handleQuizAnswer = (opt) => {
    if (quizState !== 'playing') return;
    setSelectedAns(opt);
    if (opt.isCorrect) {
      playSound('success', isMuted);
      setQuizState('success');
      setXp(prev => prev + 15);
    } else {
      playSound('fail', isMuted);
      setQuizState('fail');
    }
  };

  const nextQuizLevel = () => {
    playSound('click', isMuted);
    setQuizLevel(prev => prev + 1);
    setSelectedAns(null);
    setQuizState('playing');
  };

  const resetQuiz = () => {
    playSound('click', isMuted);
    setQuizLevel(1);
    setSelectedAns(null);
    setQuizState('playing');
    setXp(0);
  };

  const activeQuiz = quizCases[quizLevel];

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* ==================== 1. Content Overview ==================== */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <Sliders className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              การประยุกต์ใช้งานผังงานแบบลำดับในโปรแกรม
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Sequential Flowchart Implementation</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          ตัวอย่างยอดนิยมในการจำลองตรรกะแบบลำดับ คือ **ระบบคำนวณภาษีมูลค่าเพิ่ม (VAT 7%) และราคาขายสุทธิ** โดยระบบจำเป็นต้องรับเข้าตัวแปรตัวเลขราคาสินค้าดิบก่อน จากนั้นจึงประมวลผลหาค่าสัดส่วนภาษี ปิดท้ายด้วยคิดเงินรวมสุทธิและสั่งฉายรายงานผลออกทางหน้าจอเครื่องแคชเชียร์
        </p>

        {/* ==================== 2. Syntax Deep Dive ==================== */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
          <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Code2 className="w-4.5 h-4.5 text-indigo-500" />
            ตัวแปรและสูตรที่ใช้ประมวลผล (Sequential Formula Spec)
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] leading-relaxed text-slate-600">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm">
              <code className="text-indigo-600 font-bold block mb-1">vat = price * (vat_rate / 100)</code>
              คำนวณภาษีมูลค่าเพิ่มเฉพาะตัวแปร โดยหาอัตราร้อยละจากราคาสินค้าดิบที่รับค่าเข้ามา
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm">
              <code className="text-indigo-600 font-bold block mb-1">total = price + vat</code>
              รวมยอดเงินที่ผู้บริโภคจำต้องชำระจริง โดยนำราคาสินค้ารวมเข้ากับภาษีที่ประมวลผลเรียบร้อยแล้ว
            </div>
          </div>
        </div>

        {/* ==================== 3 & 4. Real Code & Interactive Sandbox ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sandbox Playground */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5">1. ปรับค่าตัวแปรจำลองคำนวณ:</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 tracking-wide font-mono">
                    <span>ราคาสินค้าดิบ (price)</span>
                    <span className="text-indigo-600 text-sm font-bold">{price} บาท</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={price}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setPrice(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 tracking-wide font-mono">
                    <span>อัตราภาษี (vatRate)</span>
                    <span className="text-indigo-600 text-sm font-bold">{vatRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={vatRate}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setVatRate(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Dynamic Python code representation of variables */}
              <div className="mt-5.5 bg-slate-900 p-4.5 rounded-2xl border border-slate-800 font-mono text-[12.5px] leading-relaxed text-slate-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// กำลังผูกค่าตัวแปรเรียลไทม์</span>
                <div>price = <span className="text-orange-400 font-bold">{price}.0</span></div>
                <div>vat_rate = <span className="text-orange-400 font-bold">{(vatRate / 100).toFixed(2)}</span></div>
                <div className="text-slate-500 pt-1.5 mt-1.5 border-t border-slate-800">vat = price * vat_rate</div>
                <div>total = price + vat</div>
              </div>
            </div>

            {/* Calculations results */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">ผลประมวลค่าตัวแปร:</span>
              <div className="flex justify-between text-xs text-slate-600 font-mono">
                <span>ภาษี VAT ({vatRate}%):</span>
                <strong className="text-slate-950 font-bold">{vatAmount} บาท</strong>
              </div>
              <div className="flex justify-between text-xs text-slate-600 border-t border-slate-100 pt-2 font-mono">
                <span>ยอดจ่ายเงินสุทธิ (Total):</span>
                <strong className="text-indigo-600 text-sm font-bold">{totalPrice} บาท</strong>
              </div>
            </div>
          </div>

          {/* Flowchart Live Dashboard with pointed Display shape */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden group">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-400" /> data streaming blueprint
              </span>
              <span className="text-indigo-400 font-semibold">
                live sequence active
              </span>
            </div>

            {/* SVG Visualizer showing flowchart and live inputs */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="280" viewBox="0 0 380 280" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-ind" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                  </marker>
                </defs>

                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .dash-flow {
                    stroke-dasharray: 6, 4;
                    animation: dash 1s linear infinite;
                  }
                `}</style>

                {/* START OVAL */}
                <rect x="140" y="5" width="100" height="26" rx="13" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="21" fill="#c7d2fe" fontFamily="monospace" fontSize="9.5" fontWeight="bold" textAnchor="middle">START</text>

                {/* Line 1 */}
                <path d="M 190,31 L 190,55" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-ind)" className="dash-flow" />

                {/* INPUT PARALLELOGRAM: Input price */}
                <polygon points="135,55 255,55 235,90 115,90" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="185" y="76" fill="#bae6fd" fontFamily="sans-serif" fontSize="9" fontWeight="bold" textAnchor="middle">รับค่าราคาสินค้า ({price})</text>

                {/* Line 2 */}
                <path d="M 185,90 L 185,115" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-ind)" className="dash-flow" />

                {/* PROCESS RECTANGLE: Calculate VAT & Total */}
                <rect x="110" y="115" width="150" height="30" rx="5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="185" y="133" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">total = price + vat ({vatAmount})</text>

                {/* Line 3 */}
                <path d="M 185,145 L 185,170" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-ind)" className="dash-flow" />

                {/* ANSI pointed DISPLAY shape for printing output
                    path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z"
                    Aligned to center at exactly x=185 with sx=1.45 to prevent text overflow.
                */}
                <g transform="translate(108.875, 170) scale(1.45 0.7)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                </g>
                <text x="185" y="190" fill="#d1fae5" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">พิมพ์ยอดจ่าย: {totalPrice} บาท</text>

                {/* Line 4 */}
                <path d="M 185,202 L 185,225" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-ind)" className="dash-flow" />

                {/* END OVAL */}
                <rect x="140" y="225" width="100" height="26" rx="13" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="241" fill="#c7d2fe" fontFamily="monospace" fontSize="9.5" fontWeight="bold" textAnchor="middle">END</text>
              </svg>
            </div>

            {/* Simulated Printed output screen */}
            <div className="relative z-10 pt-3 border-t border-slate-900 flex justify-between text-xs text-slate-400 leading-relaxed font-mono">
              <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4 text-slate-500" /> Cashier Printout</span>
              <span className="text-emerald-400">Printed: {totalPrice} THB (VAT {vatRate}% included)</span>
            </div>
          </div>

        </div>

        {/* ==================== 4. Reinforcement Quiz ==================== */}
        <div className="mt-10 bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h5 className="text-base font-bold text-white leading-tight">ทดสอบด่วน: เสริมความรู้ตรรกะแบบเรียงลำดับ</h5>
                <p className="text-slate-400 text-xs mt-0.5 font-mono">Instant Reinforcement Quiz | SCORE: {xp} XP</p>
              </div>
            </div>

            {/* Quiz progress */}
            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-bold font-mono">
              <span className="text-indigo-400">ด่าน {quizLevel} / 3</span>
              <div className="flex gap-1 ml-2">
                {[1, 2, 3].map((lvl) => (
                  <div 
                    key={lvl} 
                    className={`w-5 h-1.5 rounded-full transition-all ${
                      lvl === quizLevel ? 'bg-indigo-400' : lvl < quizLevel ? 'bg-emerald-400' : 'bg-slate-800'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Question column */}
            <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between text-left">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">โจทย์ด่านคำนวณ:</span>
                <h6 className="text-sm font-bold text-slate-100 mb-2 leading-relaxed">{activeQuiz.title}</h6>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">{activeQuiz.question}</p>
              </div>

              {quizState === 'playing' && (
                <div className="bg-indigo-950/20 border border-indigo-900/30 p-3 rounded-xl text-indigo-300 text-[11px] leading-relaxed flex gap-2">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>คำใบ้:</strong> {activeQuiz.tip}</span>
                </div>
              )}

              {quizState === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-3.5 rounded-xl text-xs leading-relaxed flex gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">ตอบถูกกระบวนการ! (+15 XP)</span>
                    <span className="text-[11px] text-slate-300">{selectedAns.feedback}</span>
                  </div>
                </div>
              )}

              {quizState === 'fail' && (
                <div className="bg-rose-500/10 border border-rose-500/40 text-rose-400 p-3.5 rounded-xl text-xs leading-relaxed flex gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">ตรรกะคำนวณคลาดเคลื่อน!</span>
                    <span className="text-[11px] text-slate-300">ลองทบทวนหลักการประมวลผลแบบบรรทัดต่อบรรทัดและกดลองใหม่อีกครั้ง</span>
                  </div>
                </div>
              )}
            </div>

            {/* Answer buttons column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              <div className="grid grid-cols-1 gap-2 flex-1 justify-center">
                {activeQuiz.options.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleQuizAnswer(opt)}
                    disabled={quizState !== 'playing'}
                    className={`p-3 rounded-xl border text-left transition-all active:scale-97 text-xs flex items-center gap-3 ${
                      selectedAns?.key === opt.key
                        ? opt.isCorrect
                          ? 'bg-emerald-500/25 border-emerald-500 text-white font-bold'
                          : 'bg-rose-500/25 border-rose-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-50'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0 ${
                      selectedAns?.key === opt.key
                        ? opt.isCorrect
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {opt.key}
                    </span>
                    <span className="font-mono">{opt.text}</span>
                  </button>
                ))}
              </div>

              {/* Next step buttons */}
              <div className="flex gap-2">
                {quizState === 'success' && quizLevel < 3 && (
                  <button
                    onClick={nextQuizLevel}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  >
                    ด่านถัดไป <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {quizState === 'success' && quizLevel === 3 && (
                  <button
                    onClick={resetQuiz}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl text-xs transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" /> ทำแบบทดสอบใหม่อีกครั้ง
                  </button>
                )}

                {quizState === 'fail' && (
                  <button
                    onClick={() => { setSelectedAns(null); setQuizState('playing'); }}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-xs transition-all"
                  >
                    ทบทวนและคำนวณอีกครั้ง
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ==================== 5. Summary ==================== */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปตัวอย่างระบบคิดเงิน:</strong> ในการเขียนผังงานเพื่อแก้ไขปัญหาทางคณิตศาสตร์ที่เป็นเส้นตรง การรับข้อมูลนำเข้า (เช่น ราคาสินค้าดิบ) จะต้องอยู่ตอนเริ่ม และเมื่อได้ผลสุทธิจากการประมวลผล (Process) แล้ว จึงรายงานผลลัพธ์ผ่านรูปทรง Display pointed box ในช่วงก่อนที่จะสิ้นสุดการทำงานเสมอ
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 3. MAIN PAGE COMPONENT (Vertical Stack Layout & Layer 1 Backdrop)
// ============================================================================
export default function pyUnit2_10_SequentialFlowchart() {
  const [isMuted, setIsMuted] = useState(false);

  const teacherTaskContent = `ใบงานกิจกรรมปฏิบัติ: ปฏิบัติการจำลองผังงานและเขียนโค้ดแบบเรียงลำดับ
ให้นักเรียนเปิดเครื่องมือพัฒนาภาษา Python และเขียนคำสั่งตอบสนองโจทย์ดังนี้:

1. เขียนชุดคำสั่งภาษา Python ในโครงสร้างแบบเรียงลำดับ (Sequential Structure) เพื่อคำนวณราคาขายสุทธิหลังหักส่วนลดร้านค้า:
   - กำหนดตัวแปร price = 500.0 (ราคาสินค้าก่อนหักส่วนลด)
   - กำหนดตัวแปร discount = 50.0 (ยอดหักส่วนลดสินค้า)
   - กำหนดตัวแปร vat_rate = 0.07 (ภาษีมูลค่าเพิ่มเจ็ดเปอร์เซ็นต์)
   - เขียนลำดับขั้นคำนวณหายอดสุทธิหลังหักลดและประเมินภาษี:
     vat = (price - discount) * vat_rate
     total = price - discount + vat
   - แสดงผลลัพธ์ราคาสุทธิที่ต้องชำระในรูปแบบประโยคจัดรูปแบบ:
     "ยอดรวมค่าชำระสินค้าสุทธิคือ: [ค่าของตัวแปร total] บาท"

2. วาดผังงาน (Flowchart) ของระบบคำนวณนี้ในโปรแกรม draw.io โดยใช้สัญลักษณ์มาตรฐาน ANSI ครบถ้วน (วงรีสำหรับเริ่ม/จบ, สี่เหลี่ยมผืนผ้าสำหรับคิด vat และ total, และสี่เหลี่ยมด้านขนานหรือ pointed Display สำหรับพิมพ์สรุปผล) บันทึกและวิเคราะห์การไหลของข้อมูลจากบนลงล่างอธิบายลงในสมุดเรียน`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative">
      
      {/* LAYER 1: Ambient Backdrop (Glowing blur rings) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[380px] h-[380px] rounded-full bg-cyan-100/40 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[5%] w-[420px] h-[420px] rounded-full bg-indigo-100/50 blur-[130px]"></div>
      </div>



      {/* LAYER 3: Vertically Stacked Interactive Cards */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-4 space-y-16">
        
        {/* Card 1: แนวคิดการทำงานแบบลำดับจากบนลงล่าง (Step Debugger Simulator) */}
        <SequentialConceptCard isMuted={isMuted} />

        {/* Card 2: ตัวอย่างการเขียนผังงานแบบเรียงลำดับ (Variable Calculator Sandbox) */}
        <SequentialExamplesCard isMuted={isMuted} />

        {/* LAYER 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="ใบงานปฏิบัติ 2.10" 
          taskText={teacherTaskContent} 
        />

      </main>
    </div>
  );
}
