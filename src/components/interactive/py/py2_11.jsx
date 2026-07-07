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
  Database,
  Cpu,
  Compass,
  Zap,
  ToggleLeft
} from 'lucide-react';

// ============================================================================
// SOUND SYNTH FUNCTIONS (Web Audio API)
// ============================================================================
const playSound = (type, isMuted) => {};

// ============================================================================
// 1. CARD 1: แนวคิดการตัดสินใจและเงื่อนไข (Decision Logic Concept)
// ============================================================================
const DecisionConceptCard = ({ isMuted }) => {
  const [valA, setValA] = useState(10);
  const [valB, setValB] = useState(12);
  const [operator, setOperator] = useState('>=');

  const operators = ['>', '<', '>=', '<=', '==', '!='];

  const evaluateExpression = () => {
    if (operator === '>') return valA > valB;
    if (operator === '<') return valA < valB;
    if (operator === '>=') return valA >= valB;
    if (operator === '<=') return valA <= valB;
    if (operator === '==') return valA === valB;
    if (operator === '!=') return valA !== valB;
    return false;
  };

  const isTrue = evaluateExpression();

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              แนวคิดการตัดสินใจและเงื่อนไขเปรียบเทียบ
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Decision Logic & Relational Operators</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          ในการดำเนินชีวิตประจำวันของมนุษย์มีความจำเป็นต้องตัดสินใจตลอดเวลา เช่น "ถ้าฝนตกจะอยู่บ้าน" คอมพิวเตอร์ก็เช่นกัน การสร้างทางเลือกให้กับโปรแกรมจะอาศัย **ตัวดำเนินการเปรียบเทียบ (Relational Operators)** เพื่อให้ได้ข้อประเมินตรรกะที่เป็นจริง (`True`) หรือเท็จ (`False`) เสมอ
        </p>

        {/* 2. Syntax Deep Dive */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
          <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
            ตัวดำเนินการเปรียบเทียบไวยากรณ์สากล (Relational Operators Table)
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            {[
              { op: '>', desc: 'มากกว่า' },
              { op: '<', desc: 'น้อยกว่า' },
              { op: '>=', desc: 'มากกว่าหรือเท่ากับ' },
              { op: '<=', desc: 'น้อยกว่าหรือเท่ากับ' },
              { op: '==', desc: 'เท่ากับ' },
              { op: '!=', desc: 'ไม่เท่ากับ' }
            ].map((item) => (
              <div key={item.op} className={`p-3 rounded-xl border transition-all ${operator === item.op ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-md' : 'bg-white border-slate-200 text-slate-700'}`}>
                <span className="block text-base font-mono font-bold">{item.op}</span>
                <span className="text-[10.5px] opacity-80">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 & 4. Python Code & Interactive Gate Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">1. ปรับค่าเพื่อทดสอบตรรกะ:</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5 font-mono">
                    <span>ตัวแปร A (valA)</span>
                    <span className="text-indigo-600 font-bold">{valA}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={valA}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setValA(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">เลือกเครื่องหมายเปรียบเทียบ:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {operators.map((op) => (
                      <button
                        key={op}
                        onClick={() => {
                          playSound('click', isMuted);
                          setOperator(op);
                        }}
                        className={`p-2.5 rounded-xl border font-mono text-sm font-bold transition-all active:scale-95 ${
                          operator === op 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5 font-mono">
                    <span>ตัวแปร B (valB)</span>
                    <span className="text-indigo-600 font-bold">{valB}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={valB}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setValB(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Python representation */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-[13px] leading-relaxed text-slate-300">
              <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// คำนวณตรรกะใน Python</span>
              <div>A = <span className="text-orange-400 font-bold">{valA}</span></div>
              <div>B = <span className="text-orange-400 font-bold">{valB}</span></div>
              <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-slate-400">
                result = A {operator} B
              </div>
              <div className="text-slate-400">
                print(result) <span className="text-slate-500 font-bold">// Output: </span>
                <span className={isTrue ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {isTrue ? 'True' : 'False'}
                </span>
              </div>
            </div>
          </div>

          {/* Blueprint SVG diamond comparator */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[380px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between text-[10px] font-mono text-slate-500 border-b border-slate-800 pb-2 mb-3">
              <span># relational comparator monitor</span>
              <span className={isTrue ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isTrue ? '✓ condition true' : '✗ condition false'}
              </span>
            </div>

            {/* SVG Visualizer */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="240" viewBox="0 0 380 240" className="max-w-[380px] drop-shadow-[0_6px_15px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-n" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                  </marker>
                  <marker id="arr-t" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                  </marker>
                  <marker id="arr-f" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
                  </marker>
                  <marker id="arr-g" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                  </marker>
                </defs>

                {/* Variable Pill A (Left) */}
                <rect x="55" y="12" width="60" height="24" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="85" y="28" fill="#bae6fd" fontFamily="monospace" fontSize="10.5" fontWeight="bold" textAnchor="middle">A: {valA}</text>
                <path d="M 115,24 L 175,24" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />

                {/* Variable Pill B (Right) */}
                <rect x="265" y="12" width="60" height="24" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="295" y="28" fill="#bae6fd" fontFamily="monospace" fontSize="10.5" fontWeight="bold" textAnchor="middle">B: {valB}</text>
                <path d="M 265,24 L 195,24" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />

                {/* Main Flow Down */}
                <path d="M 185,5 L 185,48" fill="none" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arr-n)" />

                {/* CENTRAL DECISION DIAMOND */}
                <polygon points="185,50 250,110 185,170 120,110" 
                  fill={isTrue ? "#064e3b" : "#4c0519"} 
                  stroke={isTrue ? "#10b981" : "#f43f5e"} 
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />
                <text x="185" y="114" fill={isTrue ? "#a7f3d0" : "#fecdd3"} fontFamily="monospace" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {valA} {operator} {valB}?
                </text>

                {/* True Exit branch (Right -> Down) */}
                <path d="M 250,110 L 305,110 L 305,188" fill="none" stroke={isTrue ? "#10b981" : "#475569"} strokeWidth="2.5" markerEnd={isTrue ? "url(#arr-t)" : "url(#arr-g)"} />
                <text x="305" y="140" fill={isTrue ? "#10b981" : "#475569"} fontSize="11" fontWeight="bold" textAnchor="middle">จริง (True)</text>

                {/* True Action Box */}
                <rect x="255" y="190" width="100" height="36" rx="8" fill={isTrue ? "#064e3b" : "#1e293b"} stroke={isTrue ? "#10b981" : "#475569"} strokeWidth="1.5" />
                <text x="305" y="212" fill={isTrue ? "#a7f3d0" : "#94a3b8"} fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">ทำคำสั่งใน If</text>

                {/* False Exit branch (Left -> Down) */}
                <path d="M 120,110 L 65,110 L 65,188" fill="none" stroke={!isTrue ? "#f43f5e" : "#475569"} strokeWidth="2.5" markerEnd={!isTrue ? "url(#arr-f)" : "url(#arr-g)"} />
                <text x="65" y="140" fill={!isTrue ? "#f43f5e" : "#475569"} fontSize="11" fontWeight="bold" textAnchor="middle">เท็จ (False)</text>

                {/* False Action Box */}
                <rect x="15" y="190" width="100" height="36" rx="8" fill={!isTrue ? "#4c0519" : "#1e293b"} stroke={!isTrue ? "#f43f5e" : "#475569"} strokeWidth="1.5" />
                <text x="65" y="212" fill={!isTrue ? "#ffe4e6" : "#94a3b8"} fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">ข้ามคำสั่ง If</text>
              </svg>
            </div>

            {/* Simulated Printed output screen */}
            <div className="relative z-10 pt-3 border-t border-slate-900 text-center font-mono text-[13px]">
              <span className={`px-4 py-1.5 rounded-xl border inline-block ${
                isTrue ? 'bg-emerald-950/60 border-emerald-900 text-emerald-400' : 'bg-rose-950/60 border-rose-900 text-rose-400'
              }`}>
                ผลลัพธ์ประเมินตรรกะ: {isTrue ? 'TRUE (เป็นจริง)' : 'FALSE (เป็นเท็จ)'}
              </span>
            </div>
          </div>
        </div>

        {/* 5. Summary */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปตรรกะเปรียบเทียบ:</strong> รูปเพชรการตัดสินใจในผังงานจะต้องมีการรับข้อมูลสองฝั่งเพื่อการประเมิน หรือตรวจสอบตัวแปรเดี่ยวเทียบกับค่าคงที่ ผลสรุปที่ได้จะไหลไปยังทิศทางแยก 2 แขนงเท่านั้น เพื่อการควบคุมคำสั่งในลำดับต่อไป
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 2. CARD 2: ตัวอย่างการเขียนผังงานแบบ if (Single If Flowchart)
// ============================================================================
const SingleIfCard = ({ isMuted }) => {
  const [purchase, setPurchase] = useState(800);

  const discount = purchase >= 1000 ? 100 : 0;
  const netPrice = purchase - discount;

  const hasDiscount = purchase >= 1000;

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-50 rounded-bl-full z-0 pointer-events-none"></div>

      <style>{`
        @keyframes dashed {
          to { stroke-dashoffset: -20; }
        }
        .dash-line {
          stroke-dasharray: 6, 4;
          animation: dashed 1.2s linear infinite;
        }
      `}</style>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-100 rounded-2xl text-cyan-600">
            <ToggleLeft className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              โครงสร้างแบบทางเลือกเดี่ยว
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">One-way Selection (If Structure)</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          โครงสร้างควบคุมแบบ **ทางเลือกเดี่ยว (Single If)** จะทำงานหรือทำกิจกรรมกระบวนการพิเศษก็ต่อเมื่อผลการประเมินตรรกะในเงื่อนไขการตัดสินใจเป็น **จริง (True)** เท่านั้น หากผลการประเมินเป็น **เท็จ (False)** โปรแกรมจะทำการข้ามบล็อกกิจกรรมพิเศษนี้ไปด่านถัดไปโดยทันที
        </p>

        {/* 2. Syntax Deep Dive */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
          <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-cyan-500" />
            การควบคุมบล็อกโครงสร้างย่อหน้า (Indentation & Scope)
          </h5>
          <p className="text-[13px] leading-relaxed text-slate-600 mb-3">
            ในภาษา Python เราจะใช้คีย์เวิร์ด <code>if</code> ตามด้วยประโยคตรรกะ และลงท้ายด้วยเครื่องหมายโคลอน <code>:</code> โดยกิจกรรมพิเศษที่จะทำเมื่อเป็นจริงจะถูกบังคับให้เว้นระยะย่อหน้าเข้าไปด้านใน (Indentation) เสมอ
          </p>
          <div className="bg-slate-900 text-yellow-300 font-mono text-[12.5px] p-3 rounded-xl border border-slate-800">
            <div>if amount &gt;= 1000:</div>
            <div className="text-emerald-400 font-bold pl-6">discount = 100  <span className="text-slate-500 font-normal"># ทำเฉพาะเมื่อเป็นจริง</span></div>
            <div>net_price = amount - discount  <span className="text-slate-500 font-normal"># ทำเสมอ ไม่ว่าตรรกะจะเป็นอย่างไร</span></div>
          </div>
        </div>

        {/* 3 & 4. Python Code & Interactive Single-If Tracer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls & Variables */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5">1. ขยับปรับยอดสั่งซื้อจำลอง:</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 font-mono">
                    <span>ยอดซื้อเงินสด (purchase)</span>
                    <span className="text-cyan-600 text-sm font-bold">{purchase} บาท</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    step="50"
                    value={purchase}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setPurchase(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5 font-bold">💡 คำใบ้: ลองเลื่อนปรับให้มากกว่า 1,000 บาทเพื่อดูเส้นตรรกะเลี้ยวขวา</p>
                </div>
              </div>

              {/* Dynamic Python code view */}
              <div className="mt-5.5 bg-slate-900 p-4.5 rounded-2xl border border-slate-800 font-mono text-[12.5px] leading-relaxed text-slate-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// ตรรกะโปรแกรมจำลอง</span>
                <div>amount = <span className="text-orange-400 font-bold">{purchase}</span></div>
                <div>discount = <span className="text-orange-400 font-bold">{discount}</span></div>
                <div className={`py-1 rounded px-1 transition-colors ${hasDiscount ? 'bg-emerald-950 text-emerald-300 font-bold' : ''}`}>
                  if amount &gt;= 1000:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;discount = 100
                </div>
                <div>net_price = amount - discount</div>
              </div>
            </div>

            {/* Calculations results */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">ตัวแปรในระบบ:</span>
              <div className="flex justify-between text-xs text-slate-600 font-mono">
                <span>ส่วนลดที่ได้รับ (discount):</span>
                <strong className={hasDiscount ? 'text-emerald-600 font-bold' : 'text-slate-500 font-bold'}>{discount} บาท</strong>
              </div>
              <div className="flex justify-between text-xs text-slate-600 border-t border-slate-100 pt-2 font-mono">
                <span>ยอดเงินจ่ายสุทธิ (netPrice):</span>
                <strong className="text-cyan-600 text-sm font-bold">{netPrice} บาท</strong>
              </div>
            </div>
          </div>

          {/* SVG Diagram showing Single If logic */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-cyan-400" /> single-if flow tracer</span>
              <span className={hasDiscount ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {hasDiscount ? '✓ yes branch triggered' : '✓ bypass path active'}
              </span>
            </div>

            {/* Flowchart SVG */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="280" viewBox="0 0 380 280" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-c" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0ea5e9" />
                  </marker>
                </defs>

                {/* START OVAL */}
                <rect x="140" y="5" width="100" height="26" rx="13" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="21" fill="#c7d2fe" fontFamily="monospace" fontSize="9.5" fontWeight="bold" textAnchor="middle">START</text>

                {/* Line 1 */}
                <path d="M 190,31 L 190,55" fill="none" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arr-c)" className="dash-line" />

                {/* INPUT */}
                <polygon points="135,55 255,55 235,90 115,90" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="185" y="76" fill="#bae6fd" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" textAnchor="middle">รับค่าราคาสินค้า ({purchase})</text>

                {/* Line 2 */}
                <path d="M 185,90 L 185,115" fill="none" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arr-c)" className="dash-line" />

                {/* DECISION DIAMOND */}
                <polygon points="185,115 245,145 185,175 125,145" 
                  fill={hasDiscount ? "#064e3b" : "#1c1917"} 
                  stroke={hasDiscount ? "#10b981" : "#d97706"} 
                  strokeWidth="1.5"
                />
                <text x="185" y="149" fill={hasDiscount ? "#a7f3d0" : "#fde68a"} fontFamily="sans-serif" fontSize="9" fontWeight="bold" textAnchor="middle">ยอดรวม &gt;= 1000?</text>

                {/* YES (Right) to Discount */}
                <path d="M 245,145 L 295,145 L 295,185" fill="none" stroke={hasDiscount ? "#10b981" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-c)" className={hasDiscount ? "dash-line" : ""} />
                <text x="270" y="137" fill={hasDiscount ? "#10b981" : "#475569"} fontSize="9" fontWeight="bold" textAnchor="middle">จริง (Yes)</text>

                <rect x="245" y="185" width="100" height="30" rx="5" 
                  fill={hasDiscount ? "#064e3b" : "#0f172a"} 
                  stroke={hasDiscount ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="295" y="203" fill={hasDiscount ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="9" fontWeight="bold" textAnchor="middle">ลดเงิน 100 บาท</text>

                {/* NO (Down - Bypass) */}
                <path d="M 185,175 L 185,225" fill="none" stroke={!hasDiscount ? "#0ea5e9" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-c)" className={!hasDiscount ? "dash-line" : ""} />
                <text x="198" y="195" fill={!hasDiscount ? "#0ea5e9" : "#475569"} fontSize="9" fontWeight="bold" textAnchor="middle">เท็จ (No)</text>

                {/* Merge from YES branch back to main flow */}
                <path d="M 295,215 L 295,225 L 185,225" fill="none" stroke={hasDiscount ? "#10b981" : "#334155"} strokeWidth="1.5" />

                {/* Final Line */}
                <path d="M 185,225 L 185,245" fill="none" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arr-c)" />

                {/* pointed Display shape at center 185.
                    tx = 111.5, sx = 1.4 -> center is exactly 185!
                */}
                <g transform="translate(111.5, 245) scale(1.4 0.5)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="2" />
                </g>
                <text x="185" y="259" fill="#bae6fd" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">จ่ายจริง: {netPrice} บาท</text>
              </svg>
            </div>

            {/* Console summary */}
            <div className="relative z-10 pt-3 border-t border-slate-900 text-center font-mono text-[12.5px]">
              <span className="text-slate-400">สุทธิ: {purchase} - {discount} = {netPrice} บาท (ประมวลผลกระบวนการเดี่ยวสำเร็จ)</span>
            </div>
          </div>
        </div>

        {/* 5. Summary */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปตรรกะ Single If:</strong> ทางเลือกเดี่ยวออกแบบมาเพื่อกระตุ้นฟังก์ชันเสริมเมื่อเจอตรรกะจริง โดยในทิศทางเท็จจะไม่ทำอะไรเลยนอกจากลากเส้นเดินทางอ้อมเพื่อหลอมรวมหล่อหลอมกระแสหลักกลับเข้าสายเดิม
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 3. CARD 3: ตัวอย่างการเขียนผังงานแบบเลือกทำอย่างใดอย่างหนึ่ง (If-Else Flowchart)
// ============================================================================
const IfElseCard = ({ isMuted }) => {
  const [score, setScore] = useState(45);

  const isPassed = score >= 50;

  useEffect(() => {
    // Play subtle audio sound when score crosses threshold
    if (score === 50) {
      playSound('success', isMuted);
    } else if (score === 49) {
      playSound('fail', isMuted);
    }
  }, [score]);

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <ToggleLeft className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              โครงสร้างแบบสองทางเลือกอย่างใดอย่างหนึ่ง
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Two-way Selection (If-Else Structure)</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          โครงสร้างควบคุมแบบ **สองทางเลือก (If-Else)** บังคับการสับตรรกะระบบแบบสมบูรณ์ โดยโปรแกรมมีสองเส้นทางย่อยที่มีกิจกรรมบรรจุอยู่ภายในทั้งสองทาง ผลการประเมินตรรกะจะเป็นเครื่องแบ่งขั้วอย่างชัดเจนว่าจะต้องทำกิจกรรมใดและข้ามกิจกรรมใด (ไม่มีการได้ประมวลผลทั้งสองข้างพร้อมกัน)
        </p>

        {/* 2. Syntax Deep Dive */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
          <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
            ไวยากรณ์และคู่ตรรกะทวิลักษณ์ (If-Else Code Breakdown)
          </h5>
          <p className="text-[13px] leading-relaxed text-slate-600 mb-3">
            ใช้คำสั่งคู่กันคือ <code>if</code> สำหรับตรรกะที่เป็นจริง และ <code>else</code> สำหรับบล็อกกรณีที่เป็นเท็จทั้งหมดที่เหลือ (ไม่ต้องใส่เงื่อนไขข้างหลัง else)
          </p>
          <div className="bg-slate-900 text-yellow-300 font-mono text-[12.5px] p-3.5 rounded-xl border border-slate-800">
            <div>if score &gt;= 50:</div>
            <div className="text-emerald-400 pl-6">result = "ผ่าน" <span className="text-slate-500 font-normal">// เข้าทาง True</span></div>
            <div>else:</div>
            <div className="text-rose-400 pl-6">result = "ตก" <span className="text-slate-500 font-normal">// เข้าทาง False</span></div>
          </div>
        </div>

        {/* 3 & 4. Python Code & Interactive tracer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5">1. ปรับสไลเดอร์คะแนนสะสม:</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 font-mono">
                    <span>คะแนนสอบ (score)</span>
                    <span className="text-indigo-600 text-sm font-bold">{score} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={score}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setScore(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>ไม่ผ่าน (&lt; 50)</span>
                    <span>ผ่าน (&gt;= 50)</span>
                  </div>
                </div>
              </div>

              {/* Python code view */}
              <div className="mt-5.5 bg-slate-900 p-4.5 rounded-2xl border border-slate-800 font-mono text-[12.5px] leading-relaxed text-slate-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// การประมวลผล If-Else</span>
                <div>score = <span className="text-orange-400 font-bold">{score}</span></div>
                <div className={`py-0.5 px-1 rounded ${isPassed ? 'bg-emerald-950 text-emerald-300 font-bold' : ''}`}>
                  if score &gt;= 50:
                </div>
                <div className={`pl-4 py-0.5 ${isPassed ? 'bg-emerald-950/70 text-emerald-300 font-bold' : 'text-slate-500'}`}>
                  result = "ผ่าน"
                </div>
                <div className={`py-0.5 px-1 rounded ${!isPassed ? 'bg-rose-950 text-rose-300 font-bold' : ''}`}>
                  else:
                </div>
                <div className={`pl-4 py-0.5 ${!isPassed ? 'bg-rose-950/70 text-rose-300 font-bold' : 'text-slate-500'}`}>
                  result = "ตก"
                </div>
              </div>
            </div>

            {/* Calculations results */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">สถานะผลลัพธ์:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {isPassed ? '✓ สอบผ่านเกณฑ์' : '✗ ไม่ผ่านเกณฑ์'}
              </span>
            </div>
          </div>

          {/* SVG Diagram showing If-Else logic */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-indigo-400" /> if-else flow tracer</span>
              <span className={isPassed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isPassed ? '✓ true branch lit' : '✗ false branch lit'}
              </span>
            </div>

            {/* Flowchart SVG */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="280" viewBox="0 0 380 280" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-i" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                  </marker>
                </defs>

                {/* START OVAL */}
                <rect x="140" y="5" width="100" height="26" rx="13" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="21" fill="#c7d2fe" fontFamily="monospace" fontSize="9.5" fontWeight="bold" textAnchor="middle">START</text>

                {/* Line 1 */}
                <path d="M 190,31 L 190,55" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-i)" className="dash-line" />

                {/* DECISION DIAMOND */}
                <polygon points="190,55 245,85 190,115 135,85" 
                  fill={isPassed ? "#064e3b" : "#4c0519"} 
                  stroke={isPassed ? "#10b981" : "#f43f5e"} 
                  strokeWidth="1.5"
                />
                <text x="190" y="89" fill={isPassed ? "#a7f3d0" : "#fecdd3"} fontFamily="sans-serif" fontSize="9" fontWeight="bold" textAnchor="middle">คะแนน &gt;= 50?</text>

                {/* TRUE (Right branch) */}
                <path d="M 245,85 L 295,85 L 295,125" fill="none" stroke={isPassed ? "#10b981" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-i)" className={isPassed ? "dash-line" : ""} />
                <text x="270" y="77" fill={isPassed ? "#10b981" : "#475569"} fontSize="9" fontWeight="bold" textAnchor="middle">จริง (Yes)</text>

                <rect x="245" y="125" width="100" height="30" rx="5" 
                  fill={isPassed ? "#064e3b" : "#0f172a"} 
                  stroke={isPassed ? "#10b981" : "#334155"} 
                  strokeWidth={isPassed ? "2" : "1.5"}
                />
                <text x="295" y="143" fill={isPassed ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" textAnchor="middle">แสดงผล "ผ่าน"</text>

                {/* FALSE (Left branch) */}
                <path d="M 135,85 L 85,85 L 85,125" fill="none" stroke={!isPassed ? "#f43f5e" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-i)" className={!isPassed ? "dash-line" : ""} />
                <text x="110" y="77" fill={!isPassed ? "#f43f5e" : "#475569"} fontSize="9" fontWeight="bold" textAnchor="middle">เท็จ (No)</text>

                <rect x="35" y="125" width="100" height="30" rx="5" 
                  fill={!isPassed ? "#4c0519" : "#0f172a"} 
                  stroke={!isPassed ? "#f43f5e" : "#334155"} 
                  strokeWidth={!isPassed ? "2" : "1.5"}
                />
                <text x="85" y="143" fill={!isPassed ? "#ffe4e6" : "#94a3b8"} fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" textAnchor="middle">แสดงผล "ตก"</text>

                {/* Connect lines to central circular merge point */}
                <path d="M 295,155 L 295,190 L 195,190" fill="none" stroke={isPassed ? "#10b981" : "#334155"} strokeWidth="1.5" />
                <path d="M 85,155 L 85,190 L 185,190" fill="none" stroke={!isPassed ? "#f43f5e" : "#334155"} strokeWidth="1.5" />

                {/* Merge connector circle at center 190 */}
                <circle cx="190" cy="190" r="4" fill="#818cf8" />

                {/* Line down to end */}
                <path d="M 190,194 L 190,220" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-i)" className="dash-line" />

                {/* Pointed Display shape output center 185.
                    tx = 111.5, sx = 1.4 -> center is exactly 185!
                */}
                <g transform="translate(111.5, 220) scale(1.4 0.5)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" 
                    fill={isPassed ? "#064e3b" : "#4c0519"} 
                    stroke={isPassed ? "#10b981" : "#f43f5e"} 
                    strokeWidth="2" 
                  />
                </g>
                <text x="185" y="234" fill={isPassed ? "#d1fae5" : "#ffe4e6"} fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  ผลลัพธ์: {isPassed ? 'สอบผ่าน' : 'สอบตก'}
                </text>
              </svg>
            </div>

            {/* Summary details */}
            <div className="relative z-10 pt-3 border-t border-slate-900 text-center font-mono text-[12.5px]">
              <span className="text-slate-400">ผลสรุป: คะแนน {score} คะแนน จัดพิมพ์ระบบทวิภาคเสร็จสมบูรณ์</span>
            </div>
          </div>
        </div>

        {/* 5. Summary */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปตรรกะ If-Else:</strong> บังคับเส้นทางแบบแยกสองขั้ว โดยเมื่อคอมพิวเตอร์เลือกกระทำการงานฝั่งใดฝั่งหนึ่งแล้ว จะปิดมิติงานของอีกฝั่งลงทันทีก่อนจะหวนกลับมารวมกระแสทำงานที่จุดสิ้นสุด END
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 4. CARD 4: ตัวอย่างการเขียนผังงานแบบหลายเงื่อนไข (If-Elif-Else Flowchart)
// ============================================================================
const IfElifElseCard = ({ isMuted }) => {
  const [gradeScore, setGradeScore] = useState(75);

  const getGrade = () => {
    if (gradeScore >= 80) return 'A';
    if (gradeScore >= 70) return 'B';
    if (gradeScore >= 60) return 'C';
    return 'F';
  };

  const activeGrade = getGrade();

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <ToggleLeft className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              โครงสร้างแบบหลายทางเลือก
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Multi-way Selection (If-Elif-Else Structure)</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          โครงสร้างควบคุมแบบ **หลายทางเลือก (If-Elif-Else)** ใช้เมื่อระบบมีทางคัดเลือกตัดสินใจมากกว่า 2 ทิศทาง เช่น การคำนวณตัดเกรด A, B, C, F โดยระบบจะสแกนคัดกรองจากเงื่อนไขบนสุดลงล่าง และเมื่อเจอเงื่อนไขแรกที่เป็นจริง จะทำกิจกรรมของช่องนั้นแล้วข้ามตรรกะที่เหลือด้านล่างทั้งหมดไปหาจุด END ทันที
        </p>

        {/* 2. Syntax Deep Dive */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
          <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
            โครงสร้างแบบบันไดเลื่อนคัดกรอง (Cascading Diamond Spec)
          </h5>
          <p className="text-[13px] leading-relaxed text-slate-600 mb-3">
            ใช้คีย์เวิร์ด <code>elif</code> (ย่อมาจาก else if) ในการเชื่อมโยงเงื่อนไขถัดไป และปิดตูดด้วย <code>else</code> เสมอสำหรับการรวบตึงกรณีที่เหลือ
          </p>
          <div className="bg-slate-900 text-yellow-300 font-mono text-[12.5px] p-3.5 rounded-xl border border-slate-800">
            <div>if score &gt;= 80: grade = "A"</div>
            <div className="text-indigo-400">elif score &gt;= 70: grade = "B"  <span className="text-slate-500 font-normal">// จะตรวจเมื่อตัวแรกเป็นเท็จเท่านั้น</span></div>
            <div className="text-indigo-400">elif score &gt;= 60: grade = "C"</div>
            <div>else: grade = "F"</div>
          </div>
        </div>

        {/* 3 & 4. Python Code & Interactive grade cascades */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5">1. ปรับสไลเดอร์ประเมินคะแนนเกรด:</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 font-mono">
                    <span>คะแนนสะสม (gradeScore)</span>
                    <span className="text-indigo-600 text-sm font-bold">{gradeScore} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={gradeScore}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setGradeScore(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>เกรด F (&lt;60)</span>
                    <span>เกรด C (60)</span>
                    <span>เกรด B (70)</span>
                    <span>เกรด A (80+)</span>
                  </div>
                </div>
              </div>

              {/* Python code view */}
              <div className="mt-5.5 bg-slate-900 p-4.5 rounded-2xl border border-slate-800 font-mono text-[12.5px] leading-relaxed text-slate-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// การประมวลผล Elif Cascade</span>
                <div>score = <span className="text-orange-400 font-bold">{gradeScore}</span></div>
                <div className={`py-0.5 px-1 rounded ${activeGrade === 'A' ? 'bg-emerald-950 text-emerald-300 font-bold' : ''}`}>
                  if score &gt;= 80: grade = "A"
                </div>
                <div className={`py-0.5 px-1 rounded ${activeGrade === 'B' ? 'bg-emerald-950 text-emerald-300 font-bold' : ''}`}>
                  elif score &gt;= 70: grade = "B"
                </div>
                <div className={`py-0.5 px-1 rounded ${activeGrade === 'C' ? 'bg-emerald-950 text-emerald-300 font-bold' : ''}`}>
                  elif score &gt;= 60: grade = "C"
                </div>
                <div className={`py-0.5 px-1 rounded ${activeGrade === 'F' ? 'bg-rose-950 text-rose-300 font-bold' : ''}`}>
                  else: grade = "F"
                </div>
              </div>
            </div>

            {/* Calculations results */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">เกรดที่คำนวณได้:</span>
              <span className="px-5 py-1 rounded-full text-base font-bold bg-indigo-100 text-indigo-700 font-mono">
                GRADE {activeGrade}
              </span>
            </div>
          </div>

          {/* SVG Diagram showing Cascading Elif logic */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-indigo-400" /> cascading grade tree</span>
              <span className="text-indigo-400 font-semibold font-mono">
                match: grade {activeGrade}
              </span>
            </div>

            {/* Flowchart SVG */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="280" viewBox="0 0 380 280" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-k" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                  </marker>
                </defs>

                {/* DIAMOND 1 (>=80) at center 175 */}
                <polygon points="175,10 220,30 175,50 130,30" 
                  fill={gradeScore >= 80 ? "#064e3b" : "#1c1917"} 
                  stroke={gradeScore >= 80 ? "#10b981" : "#d97706"} 
                  strokeWidth="1.5"
                />
                <text x="175" y="33" fill={gradeScore >= 80 ? "#a7f3d0" : "#fde68a"} fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">Score &gt;= 80?</text>

                {/* YES (Right) to A */}
                <path d="M 220,30 L 270,30 L 270,45" fill="none" stroke={gradeScore >= 80 ? "#10b981" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-k)" />
                <rect x="240" y="45" width="60" height="20" rx="3" 
                  fill={activeGrade === 'A' ? "#064e3b" : "#0f172a"} 
                  stroke={activeGrade === 'A' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="270" y="58" fill={activeGrade === 'A' ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">เกรด A</text>

                {/* NO (Down) to Diamond 2 */}
                <path d="M 175,50 L 175,70" fill="none" stroke={gradeScore < 80 ? "#818cf8" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-k)" />

                {/* DIAMOND 2 (>=70) */}
                <polygon points="175,70 220,90 175,110 130,90" 
                  fill={gradeScore >= 70 && gradeScore < 80 ? "#064e3b" : "#1c1917"} 
                  stroke={gradeScore >= 70 && gradeScore < 80 ? "#10b981" : "#d97706"} 
                  strokeWidth="1.5"
                />
                <text x="175" y="93" fill={gradeScore >= 70 && gradeScore < 80 ? "#a7f3d0" : "#fde68a"} fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">Score &gt;= 70?</text>

                {/* YES (Right) to B */}
                <path d="M 220,90 L 270,90 L 270,105" fill="none" stroke={gradeScore >= 70 && gradeScore < 80 ? "#10b981" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-k)" />
                <rect x="240" y="105" width="60" height="20" rx="3" 
                  fill={activeGrade === 'B' ? "#064e3b" : "#0f172a"} 
                  stroke={activeGrade === 'B' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="270" y="118" fill={activeGrade === 'B' ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">เกรด B</text>

                {/* NO (Down) to Diamond 3 */}
                <path d="M 175,110 L 175,130" fill="none" stroke={gradeScore < 70 ? "#818cf8" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-k)" />

                {/* DIAMOND 3 (>=60) */}
                <polygon points="175,130 220,150 175,170 130,150" 
                  fill={gradeScore >= 60 && gradeScore < 70 ? "#064e3b" : "#1c1917"} 
                  stroke={gradeScore >= 60 && gradeScore < 70 ? "#10b981" : "#d97706"} 
                  strokeWidth="1.5"
                />
                <text x="175" y="153" fill={gradeScore >= 60 && gradeScore < 70 ? "#a7f3d0" : "#fde68a"} fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">Score &gt;= 60?</text>

                {/* YES (Right) to C */}
                <path d="M 220,150 L 270,150 L 270,165" fill="none" stroke={gradeScore >= 60 && gradeScore < 70 ? "#10b981" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-k)" />
                <rect x="240" y="165" width="60" height="20" rx="3" 
                  fill={activeGrade === 'C' ? "#064e3b" : "#0f172a"} 
                  stroke={activeGrade === 'C' ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="270" y="178" fill={activeGrade === 'C' ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">เกรด C</text>

                {/* NO (Down) to F */}
                <path d="M 175,170 L 175,195" fill="none" stroke={gradeScore < 60 ? "#f43f5e" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-k)" />
                <rect x="145" y="195" width="60" height="20" rx="3" 
                  fill={activeGrade === 'F' ? "#4c0519" : "#0f172a"} 
                  stroke={activeGrade === 'F' ? "#f43f5e" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="175" y="208" fill={activeGrade === 'F' ? "#ffe4e6" : "#94a3b8"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">เกรด F</text>

                {/* All exits gather to far right line */}
                <path d="M 300,55 L 330,55 L 330,240" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 300,115 L 330,115" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 300,175 L 330,175" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 205,205 L 330,205" fill="none" stroke="#475569" strokeWidth="1.5" />

                <path d="M 330,240 L 190,240" fill="none" stroke="#818cf8" strokeWidth="1.5" />

                <path d="M 190,240 L 190,250" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-k)" />

                {/* Pointed Display shape output center 185.
                    tx = 111.5, sx = 1.4 -> center is exactly 185!
                */}
                <g transform="translate(111.5, 250) scale(1.4 0.5)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                </g>
                <text x="185" y="264" fill="#c7d2fe" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  เกรดสุทธิ: Grade {activeGrade}
                </text>
              </svg>
            </div>

            {/* Summary */}
            <div className="relative z-10 pt-3 border-t border-slate-900 text-center font-mono text-[12px]">
              <span className="text-slate-400">วิเคราะห์: คัดเกรด {gradeScore} ข้ามตรรกะที่เหลือลงสู่จุด End สำเร็จ</span>
            </div>
          </div>
        </div>

        {/* 5. Summary */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปตรรกะ Elif:</strong> ใช้สำหรับตัดเกรดหรือแบ่งช่วงอุณหภูมิ เพื่อป้องกันไม่ให้คอมพิวเตอร์เขียนโค้ด if ซ้อนกันหลายรอบเกินความจำเป็น ช่วยเพิ่มความเร็วในการประมวลผลสูงสุด
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 5. CARD 5: ตัวอย่างการเขียนผังงานแบบเงื่อนไขซ้อนเงื่อนไข (Nested If Flowchart)
// ============================================================================
const NestedIfCard = ({ isMuted }) => {
  const [age, setAge] = useState(20);
  const [isThai, setIsThai] = useState(true);

  const getVoterStatus = () => {
    if (age >= 18) {
      if (isThai) {
        return { status: 'มีสิทธิ์เลือกตั้ง', type: 'success', desc: 'ครบเกณฑ์อายุและถือสัญชาติไทย' };
      } else {
        return { status: 'ไม่มีสิทธิ์ (สัญชาติต่างชาติ)', type: 'warning', desc: 'อายุถึงเกณฑ์แต่ไม่ใช่สัญชาติไทย' };
      }
    } else {
      return { status: 'ไม่มีสิทธิ์ (อายุไม่ถึง)', type: 'error', desc: 'อายุยังไม่ถึงเกณฑ์สากล 18 ปี' };
    }
  };

  const currentStatus = getVoterStatus();

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* 1. Content Overview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <ToggleLeft className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              โครงสร้างทางเลือกแบบซ้อนทับกัน
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Nested Selection (Nested If Structure)</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          โครงสร้างควบคุมแบบ **เงื่อนไขซ้อนเงื่อนไข (Nested If)** คือการเขียนวางสัญลักษณ์การตัดสินใจซ้อนอยู่ภายในผลลัพธ์ของอีกเงื่อนไขหนึ่ง โดยสัญลักษณ์การตรวจสอบชั้นใน (Sub-decision) จะถูกเรียกใช้งานก็ต่อเมื่อผลลัพธ์ของเงื่อนไขชั้นนอกสุด (Outer-decision) มีค่าประเมินตรรกะเป็นจริงแล้วเท่านั้น
        </p>

        {/* 2. Syntax Deep Dive */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
          <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
            การหดระยะขอบเขตและการซ้อนชั้น (Nested Scope & Indentation)
          </h5>
          <p className="text-[13px] leading-relaxed text-slate-600 mb-3">
            โครงสร้าง Nested If บังคับเรื่องการย่อหน้า (Indentation) ใน Python เป็น 2 ระดับขั้น (ย่อหน้าซ้อนย่อหน้า) ซึ่งหากเขียนผิดตำแหน่ง ตรรกะโปรแกรมมิ่งจะเพี้ยนทันที
          </p>
          <div className="bg-slate-900 text-yellow-300 font-mono text-[12.5px] p-3.5 rounded-xl border border-slate-800">
            <div>if age &gt;= 18:</div>
            <div className="text-indigo-400 pl-6">if is_thai:  <span className="text-slate-500 font-normal">// ย่อหน้าระดับที่ 1: ซ้อนอยู่ด้านใน</span></div>
            <div className="text-emerald-400 pl-12">status = "มีสิทธิ์เลือกตั้ง"  <span className="text-slate-500 font-normal">// ย่อหน้าระดับที่ 2: ทำเมื่อสองเงื่อนไขเป็นจริง</span></div>
          </div>
        </div>

        {/* 3 & 4. Python Code & Interactive Nested tracer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5">1. ปรับแต่งตัวแปรคัดเลือกสิทธิ์:</span>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 font-mono">
                    <span>อายุ (age)</span>
                    <span className="text-indigo-600 text-sm font-bold">{age} ปี</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="25"
                    step="1"
                    value={age}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setAge(parseInt(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">มีสัญชาติไทย (isThai):</span>
                  <button
                    onClick={() => {
                      playSound('click', isMuted);
                      setIsThai(!isThai);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      isThai 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {isThai ? 'สัญชาติไทย (True)' : 'ต่างชาติ (False)'}
                  </button>
                </div>
              </div>

              {/* Python code view */}
              <div className="mt-5.5 bg-slate-900 p-4.5 rounded-2xl border border-slate-800 font-mono text-[12.5px] leading-relaxed text-slate-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">// ระบบจำลองการประเมินสิทธิ์</span>
                <div>age = <span className="text-orange-400 font-bold">{age}</span></div>
                <div>is_thai = <span className="text-orange-400 font-bold">{isThai ? 'True' : 'False'}</span></div>
                <div className={`py-0.5 ${age >= 18 ? 'bg-indigo-950 text-indigo-300 font-bold' : ''}`}>
                  if age &gt;= 18:
                </div>
                <div className={`pl-4 py-0.5 ${age >= 18 && isThai ? 'bg-emerald-950 text-emerald-300 font-bold' : age >= 18 && !isThai ? 'bg-amber-950 text-amber-300 font-bold' : ''}`}>
                  if is_thai: status = "มีสิทธิ์"
                </div>
                <div className="pl-4">else: status = "ไม่มีสิทธิ์ (สัญชาติ)"</div>
                <div className={`py-0.5 ${age < 18 ? 'bg-rose-950 text-rose-300 font-bold' : 'text-slate-500'}`}>
                  else: status = "ไม่มีสิทธิ์ (อายุ)"
                </div>
              </div>
            </div>

            {/* Calculations results */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase">สิทธิ์ทางการเมือง:</span>
              <strong className={`text-base font-bold ${
                currentStatus.type === 'success' ? 'text-emerald-600' : currentStatus.type === 'warning' ? 'text-amber-600' : 'text-rose-600'
              }`}>{currentStatus.status}</strong>
              <span className="text-slate-400 text-[10.5px] leading-relaxed font-mono">{currentStatus.desc}</span>
            </div>
          </div>

          {/* SVG Diagram showing Nested If logic */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
              <span className="uppercase tracking-widest flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-indigo-400" /> nested decision flow tracer</span>
              <span className="text-indigo-400 font-semibold font-mono">
                active routing: {age >= 18 ? 'outer yes' : 'outer no'}
              </span>
            </div>

            {/* Flowchart SVG */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <svg width="100%" height="280" viewBox="0 0 380 280" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <defs>
                  <marker id="arr-n" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                  </marker>
                </defs>

                {/* START OVAL */}
                <rect x="140" y="5" width="100" height="24" rx="12" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="190" y="20" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">START</text>

                {/* Line 1 */}
                <path d="M 190,29 L 190,50" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-n)" className="dash-line" />

                {/* OUTER DIAMOND (Age >= 18) */}
                <polygon points="190,50 240,75 190,100 140,75" 
                  fill={age >= 18 ? "#064e3b" : "#4c0519"} 
                  stroke={age >= 18 ? "#10b981" : "#f43f5e"} 
                  strokeWidth="1.5"
                />
                <text x="190" y="78" fill={age >= 18 ? "#a7f3d0" : "#fecdd3"} fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">อายุ &gt;= 18 ปี?</text>

                {/* OUTER NO (Left) to age restrict */}
                <path d="M 140,75 L 75,75 L 75,115" fill="none" stroke={age < 18 ? "#f43f5e" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-n)" className={age < 18 ? "dash-line" : ""} />
                <text x="105" y="67" fill={age < 18 ? "#f43f5e" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">เท็จ (No)</text>

                <rect x="25" y="115" width="100" height="28" rx="5" 
                  fill={age < 18 ? "#4c0519" : "#0f172a"} 
                  stroke={age < 18 ? "#f43f5e" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="75" y="132" fill={age < 18 ? "#ffe4e6" : "#94a3b8"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">ไม่มีสิทธิ์ (อายุไม่ถึง)</text>

                {/* OUTER YES (Down) to Inner Diamond */}
                <path d="M 190,100 L 190,125" fill="none" stroke={age >= 18 ? "#10b981" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-n)" className={age >= 18 ? "dash-line" : ""} />
                <text x="202" y="112" fill={age >= 18 ? "#10b981" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">จริง (Yes)</text>

                {/* INNER DIAMOND (Is Thai?) */}
                <polygon points="190,125 240,150 190,175 140,150" 
                  fill={age >= 18 && isThai ? "#064e3b" : age >= 18 && !isThai ? "#7c2d12" : "#1c1917"} 
                  stroke={age >= 18 && isThai ? "#10b981" : age >= 18 && !isThai ? "#f97316" : "#334155"} 
                  strokeWidth="1.5"
                />
                <text x="190" y="153" fill={age >= 18 && isThai ? "#a7f3d0" : age >= 18 && !isThai ? "#ffedd5" : "#94a3b8"} fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">สัญชาติไทย?</text>

                {/* INNER YES (Right) to Voter eligible */}
                <path d="M 240,150 L 305,150 L 305,185" fill="none" stroke={age >= 18 && isThai ? "#10b981" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-n)" className={age >= 18 && isThai ? "dash-line" : ""} />
                <text x="270" y="142" fill={age >= 18 && isThai ? "#10b981" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">จริง (Yes)</text>

                <rect x="255" y="185" width="100" height="28" rx="5" 
                  fill={age >= 18 && isThai ? "#064e3b" : "#0f172a"} 
                  stroke={age >= 18 && isThai ? "#10b981" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="305" y="202" fill={age >= 18 && isThai ? "#d1fae5" : "#94a3b8"} fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">มีสิทธิ์เลือกตั้ง</text>

                {/* INNER NO (Left) to nationality restrict */}
                <path d="M 140,150 L 140,185" fill="none" stroke={age >= 18 && !isThai ? "#f97316" : "#334155"} strokeWidth="1.5" markerEnd="url(#arr-n)" className={age >= 18 && !isThai ? "dash-line" : ""} />
                <text x="125" y="167" fill={age >= 18 && !isThai ? "#f97316" : "#475569"} fontSize="8.5" fontWeight="bold" textAnchor="middle">เท็จ (No)</text>

                <rect x="90" y="185" width="110" height="28" rx="5" 
                  fill={age >= 18 && !isThai ? "#7c2d12" : "#0f172a"} 
                  stroke={age >= 18 && !isThai ? "#f97316" : "#334155"} 
                  strokeWidth="1.5" 
                />
                <text x="145" y="202" fill={age >= 18 && !isThai ? "#ffedd5" : "#94a3b8"} fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">ไม่มีสิทธิ์ (สัญชาติ)</text>

                {/* Exits to End */}
                <path d="M 75,143 L 75,230 L 305,230" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 145,213 L 145,230" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 305,213 L 305,230" fill="none" stroke="#475569" strokeWidth="1.5" />

                {/* Merge connector circles */}
                <circle cx="145" cy="230" r="3.5" fill="#475569" />
                <circle cx="190" cy="230" r="4.5" fill="#818cf8" />

                {/* Final line to End */}
                <path d="M 190,230 L 190,245" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arr-n)" />

                {/* Pointed Display shape output center 185.
                    tx = 111.5, sx = 1.4 -> center is exactly 185!
                */}
                <g transform="translate(111.5, 245) scale(1.4 0.5)">
                  <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                </g>
                <text x="185" y="259" fill="#c7d2fe" fontFamily="sans-serif" fontSize="7" fontWeight="bold" textAnchor="middle">
                  ผลสรุปสิทธิ์: {currentStatus.status}
                </text>
              </svg>
            </div>

            {/* Simulated Printed output screen */}
            <div className="relative z-10 pt-3 border-t border-slate-900 text-center font-mono text-[12.5px]">
              <span className="text-slate-400">ประมวลผล: อายุ {age} ปี สัญชาติไทย {isThai ? 'มี' : 'ไม่มี'} ผ่าน Nested คัดกรองเสร็จสิ้น</span>
            </div>
          </div>
        </div>

        {/* 5. Summary */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[13px] leading-relaxed text-slate-500 flex gap-2">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>
            <strong>สรุปตรรกะ Nested If:</strong> เหมาะสำหรับการประมวลผลตรรกะที่มีการกรองตามความลึก (Hierarchical checklist) ข้อควรระวังคือการวางย่อหน้าที่ซับซ้อนเกินไป อาจส่งผลเสียทำให้ระบบตรวจสอบบั๊กยากขึ้น
          </span>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 6. MAIN PAGE COMPONENT (Vertical Stack Layout & Layer 1 Backdrop)
// ============================================================================
export default function pyUnit2_11_DecisionFlowcharts() {
  const [isMuted, setIsMuted] = useState(false);

  const teacherTaskContent = `ใบงานกิจกรรมปฏิบัติ: ปฏิบัติการจำลองระบบเงื่อนไขและการคัดเลือก
ให้นักเรียนเปิดเครื่องมือเขียนโปรแกรมคอมพิวเตอร์และเขียนคำสั่งเพื่อตอบโจทย์ดังต่อไปนี้:

1. เขียนชุดคำสั่งจำลองระบบคัดกรองราคาสินค้าระดับพรีเมียมด้วย Python (โครงสร้างแบบหลายทางเลือก if-elif-else):
   - กำหนดตัวแปร score_point = 85 (ยอดสะสมการแลกคะแนน)
   - เงื่อนไขตรวจสอบดังนี้:
     - หากคะแนนสะสมสะสมตั้งแต่ 90 แต้มขึ้นไป ให้ลดค่าสินค้าสุทธิ 200 บาท
     - หากคะแนนสะสมสะสมตั้งแต่ 70 แต้มขึ้นไป ให้ลดค่าสินค้าสุทธิ 100 บาท
     - หากต่ำกว่าเกณฑ์อื่นๆ ไม่ได้รับส่วนลดพิเศษใดๆ
   - คำนวณราคาขายสุทธิหลังหักยอดส่วนลดจากราคาสินค้าดิบ 1,000 บาท
   - พิมพ์รายงานผลลัพธ์ออกจอคอมพิวเตอร์ให้ครบตัวแปร

2. วาดผังภาพ (Flowchart) ของระบบนี้ในเครื่องมือ draw.io โดยใช้สัญลักษณ์มาตรฐานสากล (ANSI) ครบถ้วน รวมถึง pointed Display shape สำหรับพิมพ์ผลลัพธ์ และตรวจสอบกระแสความลื่นไหลให้แน่ใจว่าไม่มีเส้นไขว้ทับซ้อนกัน หรือเกิดจุดทางเลือกปลายเปิดที่สาบสูญ`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative">
      
      {/* LAYER 1: Ambient Backdrop (Glowing blur rings) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[8%] right-[12%] w-[420px] h-[420px] rounded-full bg-indigo-100/40 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[18%] left-[6%] w-[460px] h-[460px] rounded-full bg-cyan-100/50 blur-[140px]"></div>
      </div>



      {/* LAYER 3: Vertically Stacked Components */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-4 space-y-16">
        
        {/* Card 1: แนวคิดการตัดสินใจและเงื่อนไขเปรียบเทียบ */}
        <DecisionConceptCard isMuted={isMuted} />

        {/* Card 2: โครงสร้างแบบทางเลือกเดี่ยว (Single If) */}
        <SingleIfCard isMuted={isMuted} />

        {/* Card 3: โครงสร้างแบบสองทางเลือกอย่างใดอย่างหนึ่ง (If-Else) */}
        <IfElseCard isMuted={isMuted} />

        {/* Card 4: โครงสร้างแบบหลายทางเลือก (If-Elif-Else) */}
        <IfElifElseCard isMuted={isMuted} />

        {/* Card 5: โครงสร้างทางเลือกแบบซ้อนทับกัน (Nested If) */}
        <NestedIfCard isMuted={isMuted} />

        {/* LAYER 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="ใบงานปฏิบัติ 2.11" 
          taskText={teacherTaskContent} 
        />

      </main>
    </div>
  );
}
