import React, { useState, useEffect, useRef } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  AlertCircle, 
  AlertTriangle, 
  ArrowDown, 
  ArrowRight, 
  BookOpen, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Code2, 
  HelpCircle, 
  Info, 
  Play, 
  RefreshCw, 
  RotateCcw, 
  Sparkles, 
  Terminal, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  X, 
  Compass, 
  Zap
} from 'lucide-react';

// ============================================================================
// SOUND SYNTH FUNCTIONS (Web Audio API)
// ============================================================================
const playSound = (type, isMuted) => {};

// ============================================================================
// 1. CARD 1: กฎเกณฑ์และข้อกำหนดในการเขียนผังงานที่ดี (Flow Direction & Routing Simulator)
// ============================================================================
const FlowDirectionCard = ({ isMuted }) => {
  const [isChaotic, setIsChaotic] = useState(false);
  const [flowSpeed, setFlowSpeed] = useState(1); // 0.5x, 1x, 2x
  const [isRunning, setIsRunning] = useState(true);

  // Map speed to animation duration
  const getDuration = () => {
    if (flowSpeed === 0.5) return '2.5s';
    if (flowSpeed === 2) return '0.5s';
    return '1.2s';
  };

  const handleToggle = () => {
    playSound('click', isMuted);
    setIsChaotic(!isChaotic);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <style>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .flow-line-animate {
          stroke-dasharray: 6, 4;
          animation: flowDash ${getDuration()} linear infinite;
        }
        .flow-line-static {
          stroke-dasharray: none;
        }
      `}</style>

      <div className="relative z-10">
        {/* Title without sub-level numbers */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              หลักการจัดวางรูปทรงและทิศทางผังงานสากล
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Flow Direction & Layout Standards</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-8 max-w-4xl">
          ผังงานที่ดีเปรียบเสมือนแผนที่นำทางระบบโปรแกรมมิ่ง การออกแบบโครงสร้างและลายเส้นลูกศรต้องเป็นระเบียบและมีความสม่ำเสมอ เพื่อให้อ่านเข้าใจง่าย ไร้ความคลุมเครือ โดยยึดหลักเกณฑ์สำคัญ 3 ประการดังนี้:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Rules & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div className="space-y-4">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">กฎเหล็กการจัดวางทิศทาง:</span>
              
              <div className="space-y-3">
                <div className="flex gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="text-[13.5px] text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 block mb-0.5">ไหลจากบนลงล่าง และ ซ้ายไปขวา</strong>
                    เป็นทิศทางสากลในการอ่านที่สอดคล้องกับพฤติกรรมสายตาของมนุษย์และลำดับประมวลผลโค้ดคอมพิวเตอร์
                  </div>
                </div>

                <div className="flex gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="text-[13.5px] text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 block mb-0.5">มีจุดเริ่มต้นและจุดสิ้นสุดเพียงจุดเดียว</strong>
                    ทุกฟังก์ชันหลักต้องเริ่มต้นที่จุดเดียว (Single Entry) และสิ้นสุดจุดเดียว (Single Exit) ป้องกันข้อมูลค้างระบบ
                  </div>
                </div>

                <div className="flex gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="text-[13.5px] text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 block mb-0.5">เส้นทางเชื่อมต่อตรงกึ่งกลาง</strong>
                    ปลายหัวลูกศรต้องต่อเข้าตรงกลางรูปทรงถัดไปพอดี ห้ามลากเส้นเอียง โยงทะลุโครงสร้าง หรือไขว้ตัดกันอย่างไร้ระเบียบ
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <label className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  <span>เปรียบเทียบรูปแบบผังงาน:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${isChaotic ? 'bg-rose-100 text-rose-700 font-bold' : 'bg-emerald-100 text-emerald-700 font-bold'}`}>
                    {isChaotic ? 'ยุ่งเหยิงผิดกฎเกณฑ์' : 'จัดระเบียบสากล'}
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { if (isChaotic) handleToggle(); }}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                      !isChaotic 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    ระเบียบสากล (Good)
                  </button>
                  <button
                    onClick={() => { if (!isChaotic) handleToggle(); }}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                      isChaotic 
                        ? 'bg-rose-600 border-rose-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    ยุ่งเหยิง (Bad Practice)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                  <span>ความเร็วจำลองสัญญาณไฟ (Flow Speed):</span>
                  <span className="font-mono text-indigo-600 font-bold">{flowSpeed}x</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sliders className="w-4 h-4 text-slate-400" />
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.75"
                    value={flowSpeed}
                    onChange={(e) => {
                      playSound('click', isMuted);
                      setFlowSpeed(parseFloat(e.target.value));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  playSound('click', isMuted);
                  setIsRunning(!isRunning);
                }}
                className={`w-full py-2.5 rounded-xl font-bold transition-all active:scale-98 flex items-center justify-center gap-2 border text-xs ${
                  isRunning 
                    ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-900' 
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> หยุดจำลองสัญญาณการประมวลผล
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> เริ่มจำลองสัญญาณการประมวลผล
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Blueprint Canvas */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden group">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-35 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
              <span className="text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-400" /> interactive flow system
              </span>
              <span className={isChaotic ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}>
                {isChaotic ? '⚠️ warning: complex path' : '✓ optimal route active'}
              </span>
            </div>

            {/* SVG Visualizer Container */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              {!isChaotic ? (
                // GOOD FLOWCHART SVG (Clean, Top-to-bottom)
                <svg width="100%" height="340" viewBox="0 0 380 340" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                    </marker>
                    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                    </marker>
                  </defs>

                  {/* START OVAL */}
                  <rect x="140" y="10" width="100" height="30" rx="15" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" className="transition-all duration-300" />
                  <text x="190" y="29" fill="#c7d2fe" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">START</text>

                  {/* LINE 1 */}
                  <path d="M 190,40 L 190,75" stroke={isRunning ? "#818cf8" : "#475569"} strokeWidth="2" markerEnd="url(#arrow)" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />

                  {/* INPUT PARALLELOGRAM */}
                  <polygon points="135,75 255,75 235,115 115,115" fill="#082f49" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="185" y="99" fill="#bae6fd" fontFamily="sans-serif" fontSize="11" fontWeight="bold" textAnchor="middle">รับค่าคะแนนสอบ</text>

                  {/* LINE 2 */}
                  <path d="M 185,115 L 185,150" stroke={isRunning ? "#818cf8" : "#475569"} strokeWidth="2" markerEnd="url(#arrow)" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />

                  {/* DECISION DIAMOND */}
                  <polygon points="185,150 240,185 185,220 130,185" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
                  <text x="185" y="189" fill="#fde68a" fontFamily="sans-serif" fontSize="11" fontWeight="bold" textAnchor="middle">คะแนน &gt;= 50?</text>

                  {/* TRUE LINE (YES - RIGHT) */}
                  <path d="M 240,185 L 305,185 L 305,230" stroke={isRunning ? "#10b981" : "#475569"} strokeWidth="2" markerEnd="url(#arrow-green)" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />
                  <text x="270" y="177" fill="#10b981" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">จริง (Yes)</text>

                  {/* FALSE LINE (NO - LEFT) */}
                  <path d="M 130,185 L 65,185 L 65,230" stroke={isRunning ? "#ef4444" : "#475569"} strokeWidth="2" markerEnd="url(#arrow)" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />
                  <text x="95" y="177" fill="#ef4444" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">เท็จ (No)</text>

                  {/* TRUE PROCESS (PASS) */}
                  <rect x="255" y="230" width="100" height="35" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="305" y="252" fill="#d1fae5" fontFamily="sans-serif" fontSize="11" fontWeight="bold" textAnchor="middle">แสดงผล "ผ่าน"</text>

                  {/* FALSE PROCESS (FAIL) */}
                  <rect x="15" y="230" width="100" height="35" rx="6" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                  <text x="65" y="252" fill="#ffe4e6" fontFamily="sans-serif" fontSize="11" fontWeight="bold" textAnchor="middle">แสดงผล "ตก"</text>

                  {/* TRUE EXIT LINE */}
                  <path d="M 305,265 L 305,295 L 185,295" stroke={isRunning ? "#10b981" : "#475569"} strokeWidth="2" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />

                  {/* FALSE EXIT LINE */}
                  <path d="M 65,265 L 65,295 L 185,295" stroke={isRunning ? "#818cf8" : "#475569"} strokeWidth="2" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />

                  {/* FINAL LINE */}
                  <path d="M 185,295 L 185,310" stroke={isRunning ? "#818cf8" : "#475569"} strokeWidth="2" markerEnd="url(#arrow)" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />

                  {/* END OVAL */}
                  <rect x="135" y="310" width="100" height="28" rx="14" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                  <text x="185" y="327" fill="#c7d2fe" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">END</text>
                </svg>
              ) : (
                // BAD FLOWCHART SVG (Chaotic, Intersecting, Crossed layout)
                <svg width="100%" height="340" viewBox="0 0 380 340" className="max-w-[380px] drop-shadow-[0_4px_12px_rgba(244,63,94,0.15)] animate-shake">
                  <defs>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" strokeWidth="1" />
                    </marker>
                  </defs>

                  {/* SCRAMBLED BLOCKS */}
                  {/* START OVAL is strangely placed on the left middle */}
                  <rect x="15" y="80" width="90" height="30" rx="15" fill="#2d0612" stroke="#f43f5e" strokeWidth="2" />
                  <text x="60" y="99" fill="#fecdd3" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">START</text>

                  {/* INPUT is in the middle top */}
                  <polygon points="150,15 250,15 235,50 135,50" fill="#2d0612" stroke="#f43f5e" strokeWidth="2" />
                  <text x="190" y="36" fill="#fecdd3" fontFamily="sans-serif" fontSize="10" textAnchor="middle">รับค่าคะแนน</text>

                  {/* DECISION is in the far bottom left */}
                  <polygon points="75,250 125,280 75,310 25,280" fill="#2d0612" stroke="#f43f5e" strokeWidth="2" />
                  <text x="75" y="283" fill="#fecdd3" fontFamily="sans-serif" fontSize="9" textAnchor="middle">คะแนน &gt;= 50?</text>

                  {/* YES PROCESS is on top right */}
                  <rect x="260" y="80" width="100" height="35" rx="6" fill="#2d0612" stroke="#f43f5e" strokeWidth="2" />
                  <text x="310" y="102" fill="#fecdd3" fontFamily="sans-serif" fontSize="10" textAnchor="middle">แสดงผล "ผ่าน"</text>

                  {/* NO PROCESS is in the center right */}
                  <rect x="250" y="190" width="100" height="35" rx="6" fill="#2d0612" stroke="#f43f5e" strokeWidth="2" />
                  <text x="300" y="212" fill="#fecdd3" fontFamily="sans-serif" fontSize="10" textAnchor="middle">แสดงผล "ตก"</text>

                  {/* END OVAL is in the far bottom right */}
                  <rect x="260" y="290" width="100" height="30" rx="15" fill="#2d0612" stroke="#f43f5e" strokeWidth="2" />
                  <text x="310" y="309" fill="#fecdd3" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">END</text>

                  {/* CRISS-CROSS ARROWS (CHAOTIC COUPLING) */}
                  {/* Start -> Input (Crossed diagonally upward right) */}
                  <path d="M 60,80 L 60,35 L 135,35" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-red)" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />
                  
                  {/* Input -> Decision (Looong diagonal arrow crossing right through the center) */}
                  <path d="M 185,50 L 185,150 L 75,150 L 75,250" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-red)" 
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />
                  <text x="135" y="142" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">เส้นลากโยงข้ามผัง</text>

                  {/* Decision YES -> YES Process (Crosses bottom to top right) */}
                  <path d="M 125,280 L 220,280 L 220,98 L 260,98" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-red)"
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />
                  <text x="195" y="270" fill="#fecdd3" fontSize="9" textAnchor="middle">Yes</text>

                  {/* Decision NO -> NO Process (Crosses diangonally right) */}
                  <path d="M 75,310 L 75,325 L 230,325 L 230,208 L 250,208" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-red)"
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />
                  <text x="135" y="320" fill="#fecdd3" fontSize="9" textAnchor="middle">No</text>

                  {/* YES Process -> END */}
                  <path d="M 310,115 L 310,290" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-red)"
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />

                  {/* NO Process -> END (Crosses with YES Exit arrow) */}
                  <path d="M 300,225 L 300,290" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-red)"
                    className={isRunning ? "flow-line-animate" : "flow-line-static"} />

                  {/* BAD GRAPH INDICATOR - red highlight box */}
                  <rect x="125" y="110" width="130" height="90" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" className="animate-pulse" />
                  <text x="190" y="165" fill="#f43f5e" fontSize="9.5" fontWeight="bold" textAnchor="middle" className="animate-pulse">เส้นลูกศรตัดกันพัลวัน!</text>
                </svg>
              )}
            </div>

            {/* Bottom info text */}
            <div className="relative z-10 pt-3 border-t border-slate-900 text-[12.5px] leading-relaxed text-slate-400">
              {isChaotic ? (
                <span className="text-rose-400 flex gap-2 items-center">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  ผังงานยุ่งเหยิงจัดองค์ประกอบแบบไร้ทิศทาง ทำให้ผู้แกะโค้ดตรวจสอบเงื่อนไขได้ช้าและเสี่ยงเกิดตรรกะตกหล่นสูงมาก
                </span>
              ) : (
                <span className="text-emerald-400 flex gap-2 items-center">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ผังงานมาตรฐานไหลไปทิศทางเดียวกันอย่างสวยงาม ปราศจากเส้นลากตัดสลับ ช่วยให้แปลงโครงสร้างรหัสได้ง่ายไร้ที่ติ
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. CARD 2: ข้อควรระวังและข้อผิดพลาดในการเขียนผังงาน (Flowchart Fault Debugger & Fixer)
// ============================================================================
const ErrorVisualizerCard = ({ isMuted }) => {
  const [activeTab, setActiveTab] = useState('inf'); // inf, dangling, symbol, crossed
  const [isFixedMap, setIsFixedMap] = useState({
    inf: false,
    dangling: false,
    symbol: false,
    crossed: false
  });

  const handleTabChange = (tabId) => {
    playSound('click', isMuted);
    setActiveTab(tabId);
  };

  const handleFix = (tabId) => {
    playSound('repair', isMuted);
    setIsFixedMap(prev => ({
      ...prev,
      [tabId]: true
    }));
  };

  const handleReset = (tabId) => {
    playSound('click', isMuted);
    setIsFixedMap(prev => ({
      ...prev,
      [tabId]: false
    }));
  };

  const errorSpecs = {
    inf: {
      title: 'Infinite Loop (ลูปวนซ้ำอนันต์ไม่มีทางออก)',
      desc: 'เกิดจากการที่ข้อมูลภายในตัวแปรเงื่อนไขไม่เคยถูกเปลี่ยนค่าหรือแก้ไข (Update) ภายในบล็อกลูป ส่งผลให้การทดสอบตรรกะในกล่องการตัดสินใจ (Decision) เป็นจริงตลอดเวลา โปรแกรมจึงค้างและล่มในที่สุด',
      faultDesc: 'ผังงานวนลูปกลับไปทดสอบเงื่อนไข Count < 5 โดยลืมแก้ไขค่า Count (ไม่มีกล่อง Count = Count + 1) ทำให้กระแสไหลไม่สิ้นสุด',
      fixDesc: 'เพิ่มกล่องการประมวลผล (Process) เพื่อทำการเพิ่มค่าตัวนับ Count = Count + 1 ในช่วงท้ายลูป ทำให้ลูปมีโอกาสจบลงเมื่อมีค่าถึง 5',
      codeErr: 'count = 0\nwhile count < 5:\n    print("วนซ้ำทำกิ๊ฟต์")\n    # บั๊ก: ลืมเขียนเพิ่มค่าตัวแปร count!',
      codeFix: 'count = 0\nwhile count < 5:\n    print("วนซ้ำทำกิ๊ฟต์")\n    count += 1 # แก้ไข: ค่า count เพิ่มขึ้นทุกรอบจนจบเงื่อนไข'
    },
    dangling: {
      title: 'Dangling End (ลูกศรปลายเปิดสาบสูญ)',
      desc: 'เกิดจากสัญลักษณ์การประมวลผลหรือสัญลักษณ์อื่นๆ ลอยอยู่ตรงขอบแผนภูมิกระแสการทำงาน โดยไม่มีเส้นเชื่อมลูกศรชี้ต่อไปยังจุดสิ้นสุด (End) หรือเชื่อมกลับขึ้นไปในระบบ ส่งผลให้ตรรกะหยุดชะงักและระบบค้างกลางคัน',
      faultDesc: 'กรณีผลการตรวจสอบ "ฝนไม่ตก" ทางเดินฝั่ง False ลากมาถึงกล่องประมวลผล "ออกไปเล่นฟุตบอล" แล้วเส้นขาดหายลอยเคว้ง ไม่สิ้นสุด',
      fixDesc: 'ลากเส้นหัวลูกศรจากกล่อง "ออกไปเล่นฟุตบอล" นำลงมาเชื่อมต่อสมทบสู่จุดปิดท้าย END เป็นการปิดวงจรอย่างถูกต้องสมบูรณ์',
      codeErr: 'def weather_check(is_rainy):\n    if is_rainy:\n        print("เปิดร่มกันฝน")\n        return "เสร็จสิ้น"\n    else:\n        print("ออกไปเล่นฟุตบอล")\n        # บั๊ก: เส้นตรรกะหลุดหาย ไม่ส่งค่าคืนและไม่มีทิศทางหยุด',
      codeFix: 'def weather_check(is_rainy):\n    if is_rainy:\n        print("เปิดร่มกันฝน")\n    else:\n        print("ออกไปเล่นฟุตบอล")\n    return "เสร็จสิ้น" # แก้ไข: ทุกทิศทางหลอมรวมมาสิ้นสุดคำสั่งร่วมกัน'
    },
    symbol: {
      title: 'Incorrect Symbol (ใช้รูปทรงสัญลักษณ์ผิดประเภท)',
      desc: 'การนำสัญลักษณ์มาตรฐาน ANSI ไปใช้งานผิดบทบาทหน้าที่ เช่น ใช้กล่องประมวลผล (Process) เพื่อประเมินผลเงื่อนไขแทนรูป Diamond หรือใช้ Parallelogram ในการคำนวณภายใน ซึ่งสร้างความเข้าใจผิดให้แก่ทีมพัฒนาในการนำไปสลักโค้ด',
      faultDesc: 'ใช้กล่องสี่เหลี่ยมผืนผ้าประมวลผลธรรมดา (Process) บรรจุเงื่อนไข "Age >= 18?" และใช้สี่เหลี่ยมด้านขนาน (Input/Output) คำนวณคณิตศาสตร์',
      fixDesc: 'ปรับสัญลักษณ์เงื่อนไขเป็นสี่เหลี่ยมขนมเปียกปูน (Decision Diamond) และการคำนวณปรับเป็นสี่เหลี่ยมผืนผ้า (Process) ตามแบบสเปกสากล พร้อมแสดงผลลัพธ์ผ่านรูปทรง pointed Display ดั้งเดิม',
      codeErr: '# บั๊กการแปลความหมาย:\n# หากใช้ Process เป็น Decision และใช้ IO เป็น Process\n# นักเขียนโปรแกรมจะสับสนระดับตัวแปรและการจัดการเมมโมรี่',
      codeFix: '# สเปกถูกต้อง:\n# Diamond -> if/else\n# Rectangle -> Process (=)\n# Parallelogram/Display -> input()/print()'
    },
    crossed: {
      title: 'Crossed Flow Lines (เส้นเชื่อมไขว้ตัดซับซ้อน)',
      desc: 'การลากเส้นลูกศรข้ามผ่านตัดสลับกันไปมาในแผนผังอย่างไร้สไตล์ ซึ่งมีผลทำให้ผู้ประเมินแผนภาพหลุดมิติและเข้าใจทิศทางการไหลผิดเพี้ยนไปอีกด้านหนึ่ง',
      faultDesc: 'เส้นเดินทางฝั่ง True และ False ถูกลากลักตัดกึ่งกลางไขว้กันเป็นรูปกากบาท เพื่ออ้อมไปหากล่องกระบวนการอีกฟากหนึ่ง',
      fixDesc: 'จัดเส้นทางการเดินสายและกล่องเป้าหมายซ้ายขวาให้สมดุลเพื่อคลายเส้นทางไม่ให้มีจุดทับซ้อน ปราศจากการข้ามสายเส้นเชื่อมร้อยเปอร์เซ็นต์',
      codeErr: '# ปัญหาทางวิศวกรรม:\n# ไหลข้ามตรรกะสลับซ้ายขวาในส่วนควบคุมเดียวกัน\n# เสี่ยงเขียนตรรกะผิดฝั่ง (False path สลับกับ True)',
      codeFix: '# การจัดระเบียบโครงข่าย:\n# เงื่อนไขซ้ายคุมกระแสซ้าย เงื่อนไขขวาคุมกระแสขวา\n# ชัดเจน ตรวจสอบง่าย 100%'
    }
  };

  const spec = errorSpecs[activeTab];
  const isFixed = isFixedMap[activeTab];

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-40 h-40 bg-rose-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Title without sub-level numbers */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-rose-100 rounded-2xl text-rose-600">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 leading-tight">
              จุดอันตรายและข้อผิดพลาดทางผังงานที่พบบ่อย
            </h4>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Flowchart Errors & Live Debugger</p>
          </div>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 max-w-4xl">
          ในการทำงานร่วมกันเป็นทีม การปล่อยให้เกิดข้อผิดพลาดในการวาดผังภาพจะสร้างบั๊กมหาศาลเมื่อระบบถูกส่งไปเขียนโค้ดจริง มาเรียนรู้วิธีการสแกนตรวจบั๊กและกดปุ่ม **🔧 ซ่อมแซมระบบผังงาน** เพื่อเรียนรู้วิธีการปรับปรุงที่ถูกต้องผ่านชุดตัวจำลองออฟไลน์ด้านล่างนี้:
        </p>

        {/* Tab Selection buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {Object.keys(errorSpecs).map((id) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`p-3 rounded-2xl border text-center transition-all active:scale-95 flex flex-col justify-center items-center gap-1.5 ${
                activeTab === id 
                  ? 'bg-rose-600 border-rose-600 text-white shadow-md font-bold' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] opacity-75 font-mono">
                {id === 'inf' ? 'INFINITE LOOP' : id === 'dangling' ? 'DANGLING END' : id === 'symbol' ? 'INCORRECT ANSI' : 'CROSSED LINE'}
              </div>
              <div className="text-xs truncate font-bold">{id === 'inf' ? 'ลูปอนันต์' : id === 'dangling' ? 'จุดสายปลายเปิด' : id === 'symbol' ? 'สัญลักษณ์ผิดประเภท' : 'เส้นตัดไขว้กัน'}</div>
            </button>
          ))}
        </div>

        {/* Dynamic content wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details and Controller */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div>
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                {isFixed ? '🔧 ซ่อมแซมตรรกะเสร็จสิ้น' : '⚠️ ตรวจพบข้อผิดพลาดในระบบ'}
              </span>
              <h5 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{spec.title}</h5>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mb-4">{spec.desc}</p>
              
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-[13px] leading-relaxed text-slate-600">
                <strong className="text-slate-800 flex items-center gap-2 mb-1.5">
                  <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                  {isFixed ? 'การปรับแก้ทางผังงาน (Corrective Action):' : 'คำอธิบายจุดบกพร่อง (Bug Description):'}
                </strong>
                <span>{isFixed ? spec.fixDesc : spec.faultDesc}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {!isFixed ? (
                <button
                  onClick={() => handleFix(activeTab)}
                  className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA] active:scale-98 rounded-xl font-bold py-3.5 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 text-xs tracking-wider uppercase"
                >
                  🔧 ซ่อมแซมระบบผังงาน (Fix Error)
                </button>
              ) : (
                <button
                  onClick={() => handleReset(activeTab)}
                  className="w-full bg-slate-800 text-slate-300 hover:bg-slate-900 active:scale-98 rounded-xl font-bold py-3 transition-all flex items-center justify-center gap-2 border border-slate-800 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตจำลองข้อผิดพลาดอีกครั้ง
                </button>
              )}
            </div>
          </div>

          {/* Canvas SVG and Python Code Panel */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* SVG Visual Display */}
            <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-2xl flex-1 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:20px_20px] opacity-25 pointer-events-none"></div>

              <div className="relative z-10 flex justify-between text-[10px] font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
                <span># diagnostic monitor blueprint</span>
                <span className={isFixed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold animate-pulse'}>
                  {isFixed ? 'system status: normal' : 'system status: compile error'}
                </span>
              </div>

              {/* Dynamic SVG Rendering */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-1">
                
                {/* 1. INFINITE LOOP DIAGRAMS */}
                {activeTab === 'inf' && (!isFixed ? (
                  // INF - BROKEN (No Count Increment)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-r" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
                      </marker>
                    </defs>

                    {/* Start */}
                    <rect x="135" y="10" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                    <text x="180" y="27" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">START</text>

                    <path d="M 180,35 L 180,60" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-r)" />

                    {/* Decision Count < 5 */}
                    <polygon points="180,60 230,85 180,110 130,85" fill="#2d0612" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                    <text x="180" y="88" fill="#fca5a5" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">Count &lt; 5?</text>

                    {/* YES line down */}
                    <path d="M 180,110 L 180,140" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-r)" />
                    <text x="195" y="125" fill="#fca5a5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Yes</text>

                    {/* Process block (Print "Hello") */}
                    <rect x="125" y="140" width="110" height="30" rx="5" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
                    <text x="180" y="159" fill="#fde68a" fontFamily="sans-serif" fontSize="9.5" textAnchor="middle">แสดงผล "Hello"</text>

                    {/* LOOP BACK TO DECISION (No increment!) */}
                    <path d="M 125,155 L 80,155 L 80,85 L 130,85" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-r)" className="animate-pulse" />
                    <text x="70" y="125" fill="#ef4444" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 70 125)">INFINITE LOOP</text>
                  </svg>
                ) : (
                  // INF - FIXED (Has Increment)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-g" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                      </marker>
                    </defs>

                    {/* Start */}
                    <rect x="135" y="5" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="21" fill="#c7d2fe" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">START</text>

                    <path d="M 180,30 L 180,50" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-g)" />

                    {/* Decision */}
                    <polygon points="180,50 230,75 180,100 130,75" fill="#1c1917" stroke="#d97706" strokeWidth="1.5" />
                    <text x="180" y="78" fill="#fde68a" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">Count &lt; 5?</text>

                    {/* YES down */}
                    <path d="M 180,100 L 180,120" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-g)" />
                    <text x="195" y="112" fill="#10b981" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Yes</text>

                    {/* Process (Print "Hello") */}
                    <rect x="125" y="120" width="110" height="25" rx="4" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.5" />
                    <text x="180" y="136" fill="#bae6fd" fontFamily="sans-serif" fontSize="9" textAnchor="middle">แสดงผล "Hello"</text>

                    <path d="M 180,145 L 180,165" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-g)" />

                    {/* FIXED PROCESS: Count = Count + 1 */}
                    <rect x="115" y="165" width="130" height="28" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    <text x="180" y="182" fill="#d1fae5" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">Count = Count + 1</text>

                    {/* LOOP BACK TO DECISION (Corrected flow) */}
                    <path d="M 115,179 L 60,179 L 60,75 L 130,75" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-g)" />
                  </svg>
                ))}

                {/* 2. DANGLING END DIAGRAMS */}
                {activeTab === 'dangling' && (!isFixed ? (
                  // DANGLING - BROKEN (No connection to end on False path)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-danger" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
                      </marker>
                    </defs>

                    {/* Start */}
                    <rect x="135" y="10" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="26" fill="#c7d2fe" fontFamily="monospace" fontSize="9" textAnchor="middle">START</text>

                    <path d="M 180,35 L 180,60" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-danger)" />

                    {/* Decision Rainy? */}
                    <polygon points="180,60 230,85 180,110 130,85" fill="#1c1917" stroke="#d97706" strokeWidth="1.5" />
                    <text x="180" y="88" fill="#fde68a" fontFamily="sans-serif" fontSize="10" textAnchor="middle">ฝนตกไหม?</text>

                    {/* YES (Right) to End */}
                    <path d="M 230,85 L 290,85 L 290,130" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-danger)" />
                    <text x="255" y="77" fill="#818cf8" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Yes</text>

                    <rect x="240" y="130" width="100" height="30" rx="5" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.5" />
                    <text x="290" y="149" fill="#bae6fd" fontFamily="sans-serif" fontSize="9" textAnchor="middle">กางร่มกันฝน</text>

                    <path d="M 290,160 L 290,185 L 225,185" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-danger)" />

                    {/* NO (Left) DANGLING (No Arrow to End!) */}
                    <path d="M 130,85 L 70,85 L 70,130" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-danger)" />
                    <text x="100" y="77" fill="#ef4444" fontFamily="sans-serif" fontSize="9" fontWeight="bold" textAnchor="middle">No</text>

                    <rect x="20" y="130" width="100" height="30" rx="5" fill="#2d0612" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                    <text x="70" y="149" fill="#fca5a5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">ไปเตะฟุตบอล</text>

                    {/* Dangling visual indicator (arrow points to nowhere) */}
                    <path d="M 70,160 L 70,180" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-danger)" className="animate-bounce" />
                    <circle cx="70" cy="180" r="4" fill="#ef4444" className="animate-ping" />

                    {/* END */}
                    <rect x="135" y="172" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="188" fill="#c7d2fe" fontFamily="monospace" fontSize="9" textAnchor="middle">END</text>
                  </svg>
                ) : (
                  // DANGLING - FIXED (Correct connections)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-fixed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                      </marker>
                    </defs>

                    {/* Start */}
                    <rect x="135" y="10" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="26" fill="#c7d2fe" fontFamily="monospace" fontSize="9" textAnchor="middle">START</text>

                    <path d="M 180,35 L 180,60" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-fixed)" />

                    {/* Decision Rainy? */}
                    <polygon points="180,60 230,85 180,110 130,85" fill="#1c1917" stroke="#d97706" strokeWidth="1.5" />
                    <text x="180" y="88" fill="#fde68a" fontFamily="sans-serif" fontSize="10" textAnchor="middle">ฝนตกไหม?</text>

                    {/* YES (Right) to End */}
                    <path d="M 230,85 L 290,85 L 290,130" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-fixed)" />
                    <text x="255" y="77" fill="#10b981" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Yes</text>

                    <rect x="240" y="130" width="100" height="30" rx="5" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.5" />
                    <text x="290" y="149" fill="#bae6fd" fontFamily="sans-serif" fontSize="9" textAnchor="middle">กางร่มกันฝน</text>

                    <path d="M 290,160 L 290,185 L 225,185" stroke="#10b981" strokeWidth="1.5" />

                    {/* NO (Left) CONNECTED TO END */}
                    <path d="M 130,85 L 70,85 L 70,130" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-fixed)" />
                    <text x="100" y="77" fill="#10b981" fontFamily="sans-serif" fontSize="9" textAnchor="middle">No</text>

                    <rect x="20" y="130" width="100" height="30" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="70" y="149" fill="#d1fae5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">ไปเตะฟุตบอล</text>

                    {/* Fixed connection line */}
                    <path d="M 70,160 L 70,185 L 135,185" stroke="#10b981" strokeWidth="2" className="drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]" markerEnd="url(#arrow-fixed)" />

                    {/* END */}
                    <rect x="135" y="172" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="188" fill="#c7d2fe" fontFamily="monospace" fontSize="9" textAnchor="middle">END</text>
                  </svg>
                ))}

                {/* 3. INCORRECT SYMBOL DIAGRAMS */}
                {activeTab === 'symbol' && (!isFixed ? (
                  // SYMBOL - BROKEN (Wrong Shapes)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-err" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
                      </marker>
                    </defs>

                    {/* Start is rectangle (Error!) */}
                    <rect x="135" y="10" width="90" height="25" fill="#2d0612" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                    <text x="180" y="26" fill="#fca5a5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">START (รูปสี่เหลี่ยมผิด!)</text>

                    <path d="M 180,35 L 180,60" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-err)" />

                    {/* Decision is process rectangle (Error!) */}
                    <rect x="125" y="60" width="110" height="30" rx="2" fill="#2d0612" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                    <text x="180" y="79" fill="#fca5a5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">ตรวจสอบ Age &gt;= 18? (ผิด!)</text>

                    <path d="M 180,90 L 180,120" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-err)" />

                    {/* Process calculation is diamond (Error!) */}
                    <polygon points="180,120 230,140 180,160 130,140" fill="#2d0612" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                    <text x="180" y="144" fill="#fca5a5" fontFamily="sans-serif" fontSize="8" textAnchor="middle">ผลรวม = A + B (ผิด!)</text>

                    <path d="M 180,160 L 180,180" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-err)" />

                    {/* End is triangle (Error!) */}
                    <polygon points="180,180 220,205 140,205" fill="#2d0612" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                    <text x="180" y="200" fill="#fca5a5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">END (สามเหลี่ยมผิด!)</text>
                  </svg>
                ) : (
                  // SYMBOL - FIXED (Correct ANSI Shapes including Display symbol path)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-sym-ok" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                      </marker>
                    </defs>

                    {/* Correct Start: Capsule Oval */}
                    <rect x="135" y="10" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="26" fill="#c7d2fe" fontFamily="monospace" fontSize="9.5" fontWeight="bold" textAnchor="middle">START</text>

                    <path d="M 180,35 L 180,60" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-sym-ok)" />

                    {/* Correct Decision: Diamond */}
                    <polygon points="180,60 230,80 180,100 130,80" fill="#1c1917" stroke="#d97706" strokeWidth="1.5" />
                    <text x="180" y="84" fill="#fde68a" fontFamily="sans-serif" fontSize="9" fontWeight="bold" textAnchor="middle">Age &gt;= 18?</text>

                    <path d="M 180,100 L 180,125" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-sym-ok)" />

                    {/* Correct Process Calculation: Rectangle */}
                    <rect x="125" y="125" width="110" height="28" rx="4" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.5" />
                    <text x="180" y="142" fill="#bae6fd" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" textAnchor="middle">ผลรวม = A + B</text>

                    <path d="M 180,153 L 180,175" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-sym-ok)" />

                    {/* Correct Output Display Symbol using pointed path scaled and offset:
                        path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" 
                        Let's scale it to fit nicely around center 180, 187:
                        We map coordinates: x-offset=120, y-offset=165, scaling factor 1.2
                    */}
                    <g transform="translate(132, 168) scale(1.1 0.7)">
                      <path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    </g>
                    <text x="182" y="187" fill="#d1fae5" fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle">แสดงผลหน้าจอ</text>

                    <path d="M 180,200 L 180,205" stroke="#10b981" strokeWidth="1" />
                  </svg>
                ))}

                {/* 4. CROSSED LINES DIAGRAMS */}
                {activeTab === 'crossed' && (!isFixed ? (
                  // CROSSED - BROKEN (Intersecting lines)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-cr-err" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
                      </marker>
                    </defs>

                    {/* Start */}
                    <rect x="135" y="10" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="26" fill="#c7d2fe" fontFamily="monospace" fontSize="9" textAnchor="middle">START</text>

                    <path d="M 180,35 L 180,60" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-cr-err)" />

                    {/* Decision X > Y? */}
                    <polygon points="180,60 230,85 180,110 130,85" fill="#1c1917" stroke="#d97706" strokeWidth="1.5" />
                    <text x="180" y="88" fill="#fde68a" fontFamily="sans-serif" fontSize="10" textAnchor="middle">X &gt; Y?</text>

                    {/* YES (Right box but path goes to LEFT) CROSSES FALSE path */}
                    {/* YES line starts right, goes left-diagonally down */}
                    <path d="M 230,85 L 260,85 L 110,135 L 75,135" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-cr-err)" className="animate-pulse" />
                    <text x="245" y="77" fill="#ef4444" fontFamily="sans-serif" fontSize="9.5" textAnchor="middle">Yes</text>

                    {/* FALSE line starts left, goes right-diagonally down */}
                    <path d="M 130,85 L 100,85 L 250,135 L 285,135" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="115" y="77" fill="#ef4444" fontFamily="sans-serif" fontSize="9.5" textAnchor="middle">No</text>

                    {/* Process blocks (Left and Right) */}
                    <rect x="15" y="125" width="80" height="30" rx="5" fill="#2d0612" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="55" y="144" fill="#fca5a5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Max = X</text>

                    <rect x="265" y="125" width="80" height="30" rx="5" fill="#2d0612" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="305" y="144" fill="#fca5a5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Max = Y</text>

                    {/* Red warning ring in the crossing center (180, 110) */}
                    <circle cx="180" cy="110" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />
                    <text x="180" y="123" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">จุดทับไขว้ข้ามเลน!</text>
                  </svg>
                ) : (
                  // CROSSED - FIXED (Neat, parallel paths)
                  <svg width="100%" height="210" viewBox="0 0 360 210" className="max-w-[360px]">
                    <defs>
                      <marker id="arrow-cr-ok" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                      </marker>
                    </defs>

                    {/* Start */}
                    <rect x="135" y="10" width="90" height="25" rx="12.5" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="180" y="26" fill="#c7d2fe" fontFamily="monospace" fontSize="9" textAnchor="middle">START</text>

                    <path d="M 180,35 L 180,60" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-cr-ok)" />

                    {/* Decision X > Y? */}
                    <polygon points="180,60 230,85 180,110 130,85" fill="#1c1917" stroke="#d97706" strokeWidth="1.5" />
                    <text x="180" y="88" fill="#fde68a" fontFamily="sans-serif" fontSize="10" textAnchor="middle">X &gt; Y?</text>

                    {/* Neat Parallel YES to Right Process */}
                    <path d="M 230,85 L 305,85 L 305,125" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-cr-ok)" />
                    <text x="255" y="77" fill="#10b981" fontFamily="sans-serif" fontSize="9.5" textAnchor="middle">Yes</text>

                    {/* Neat Parallel NO to Left Process */}
                    <path d="M 130,85 L 55,85 L 55,125" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-cr-ok)" />
                    <text x="105" y="77" fill="#10b981" fontFamily="sans-serif" fontSize="9.5" textAnchor="middle">No</text>

                    {/* Process blocks (Left and Right) */}
                    <rect x="15" y="125" width="80" height="30" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="55" y="144" fill="#d1fae5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Max = Y</text>

                    <rect x="265" y="125" width="80" height="30" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="305" y="144" fill="#d1fae5" fontFamily="sans-serif" fontSize="9" textAnchor="middle">Max = X</text>
                  </svg>
                ))}

              </div>
            </div>

            {/* Code Panel Display comparing Python logic */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 overflow-hidden shadow-inner flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-800 pb-2 mb-3">
                <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5" /> Python Code Alignment</span>
                <span className={isFixed ? 'text-emerald-500' : 'text-amber-500'}>
                  {isFixed ? '✓ logic compiled' : '⚠ warning: loop warning'}
                </span>
              </div>

              <pre className="font-mono text-[12.5px] text-yellow-300 leading-relaxed whitespace-pre overflow-x-auto py-2">
                <code>{isFixed ? spec.codeFix : spec.codeErr}</code>
              </pre>

              <div className="bg-black/50 p-2.5 rounded-xl border border-slate-950/80 text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-2">
                <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Status: {isFixed ? 'ตรรกะรันผ่าน ครบรอบเงื่อนไขเรียบร้อย' : 'คอมพิวเตอร์พังหรือหยุดชะงักเนื่องจากสัญญาณบล็อก'}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. CARD 3: มินิเกม: ผู้ประเมินความถูกต้องทางผังงาน (Flowchart Auditor Game)
// ============================================================================
const FlowchartAuditorGame = ({ isMuted }) => {
  const [level, setLevel] = useState(1);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [gameState, setGameState] = useState('playing'); // playing, success, fail
  const [score, setScore] = useState(0);

  const cases = {
    1: {
      title: 'เคสตรวจวินิจฉัยที่ 1: ระบบเก็บเงินเครื่องซักผ้าอัจฉริยะ',
      desc: 'ต้องการป้อนตรวจสอบเงื่อนไข "ยอดเหรียญ >= 40 บาท?" แต่ในแผนภูมิ แผนผังกลับนำกล่องรูปสี่เหลี่ยมด้านขนาน (Input/Output) บรรจุข้อความเงื่อนไขตรวจสอบซะงั้น!',
      question: 'ในฐานะ AI Auditor คุณคิดว่าแผนภูมินี้ละเมิดกฎเกณฑ์ ANSI ข้อใด?',
      options: [
        { key: 'A', text: 'เกิดลูปอนันต์ (Infinite Loop) ทำงานค้าง', isCorrect: false },
        { key: 'B', text: 'ใช้รูปทรงสัญลักษณ์ผิดประเภท (นำ IO มาใช้เป็น Decision)', isCorrect: true, feedback: 'ถูกต้อง! สัญลักษณ์ตรวจสอบเงื่อนไขทางเลือกต้องใช้รูป Diamond (ขนมเปียกปูน) เท่านั้น ห้ามใช้สี่เหลี่ยมด้านขนาน!' },
        { key: 'C', text: 'มีจุดเริ่มต้น 2 จุดขนานกัน', isCorrect: false },
        { key: 'D', text: 'จุดสายปลายเปิด (Dangling End) ไม่มี End', isCorrect: false }
      ],
      tip: 'สังเกตรูปสี่เหลี่ยมด้านขนาน (Parallelogram) มีไว้สำหรับรับเข้าหรือรายงานค่า (Input/Output) เท่านั้น ไม่ได้มีไว้สำหรับสับรางสายตรรกะแยก'
    },
    2: {
      title: 'เคสตรวจวินิจฉัยที่ 2: เครื่องนับจำนวนรอบชงกาแฟอัตโนมัติ',
      desc: 'ระบบสั่งกาแฟจำลอง มีการวนลูปทำซ้ำเงื่อนไข "แก้วน้ำกาแฟ < 3" โดยในลูปมีกระบวนการ Process บดเม็ดเมล็ดกาแฟและหยดน้ำ แต่กระแสไหลลูกศรท้ายลูปพุ่งวนหลุดย้อนศรชี้กลับเข้ากล่องประเมิน Count โดยไม่มีการหยอดค่าตัวเพิ่มแก้ว',
      question: 'หากนำผังงานนี้ไปแปลงสลักโค้ด Python จะเกิดวิกฤตการณ์ข้อใดในโปรแกรม?',
      options: [
        { key: 'A', text: 'เกิดการข้ามบรรทัดคำสั่งทำให้ผลลัพธ์เพี้ยน', isCorrect: false },
        { key: 'B', text: 'เกิดลูปอนันต์ทำงานไม่สิ้นสุด (Infinite Loop) เพราะค่าแก้วไม่เคยขยับ', isCorrect: true, feedback: 'แม่นยำ! เมื่อไม่มีกล่องกระบวนการบวกค่าตัวแปรแก้ว เงื่อนไขจะยังเป็นจริงและรันบดเม็ดกาแฟจนเมโมรี่ล้นเครื่องคอม!' },
        { key: 'C', text: 'ข้อความภาษาไทยตัดตัวหางขาด', isCorrect: false },
        { key: 'D', text: 'เกิดสายปลายลอย Dangling End ข้อมูลระเบิด', isCorrect: false }
      ],
      tip: 'เมื่อมีการเขียนระบบลูปวนซ้ำ (Iteration) ต้องมั่นใจว่ามีกล่องประมวลผลตัวแปรกระตุ้นให้เงื่อนไขเป็นเท็จในรอบถัดๆ ไปเสมอ'
    },
    3: {
      title: 'เคสตรวจวินิจฉัยที่ 3: ระบบคัดกรองวัคซีนโควิดตามอายุ',
      desc: 'ผังงานตรวจสอบอายุประชากร มีการตั้งค่า Diamond "Age >= 60?" ถ้าจริงให้ไป "รับสิทธิ์ช่องพิเศษ" แล้วเข้าหา END แต่ถ้าเท็จ (False) ลูกศรลากจากรูป Diamond ชี้ตกค้างคาไว้กลางอากาศเฉยๆ โดยไม่เชื่อมไปไหนเลย',
      question: 'แผนผังนี้เกิดปัญหาโครงสร้างด้านใด ซึ่งจะทำให้วิศวกรซอฟต์แวร์สับสนสูงสุด?',
      options: [
        { key: 'A', text: 'เกิดสายการไหลปลายเปิดลอยเคว้ง (Dangling End) ในเงื่อนไขทางเลือกเท็จ', isCorrect: true, feedback: 'สุดยอด! เส้นทางการไหลในทางตรรกะเท็จลอยค้าง ไร้เส้นเชื่อมเข้า END หรือเชื่อมต่อจุดอื่น ระบบจึงหาทางจบไม่พบ' },
        { key: 'B', text: 'ใช้สัญลักษณ์จุดรวมสาย Connector ผิด ANSI', isCorrect: false },
        { key: 'C', text: 'รูปทรง Start มีมุมเหลี่ยมแหลม', isCorrect: false },
        { key: 'D', text: 'เส้นโยงเดินทางไขว้กันเป็นกากบาทชำรุด', isCorrect: false }
      ],
      tip: 'ทุกๆ เส้นแยกออกของสัญลักษณ์การตัดสินใจ (Decision) ไม่ว่าจะออกทาง Yes หรือ No ต้องมีการนำทางกลับเข้าวงจรระบบเสมอ'
    }
  };

  const handleAnswer = (option) => {
    if (gameState !== 'playing') return;
    setSelectedOpt(option);
    if (option.isCorrect) {
      playSound('success', isMuted);
      setGameState('success');
      setScore(prev => prev + 10);
    } else {
      playSound('fail', isMuted);
      setGameState('fail');
    }
  };

  const handleNext = () => {
    playSound('click', isMuted);
    setLevel(prev => prev + 1);
    setSelectedOpt(null);
    setGameState('playing');
  };

  const handleResetGame = () => {
    playSound('click', isMuted);
    setLevel(1);
    setSelectedOpt(null);
    setGameState('playing');
    setScore(0);
  };

  const currentCase = cases[level];

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#4F46E5]/10 to-[#06B6D4]/10 rounded-bl-full blur-3xl -z-0 transition-all duration-700 group-hover:scale-110"></div>

      <div className="relative z-10 text-center mb-10">
        <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 rounded-full px-4.5 py-1.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" /> gamified evaluation zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
          มินิเกม: ผู้ประเมินความถูกต้องทางผังงาน (Flowchart Auditor)
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-[14.5px]">
          สวมวิญญาณเป็นวิศวกรวิเคราะห์คุณภาพระบบ สแกนและตรวจจับหาจุดพังทลายของผังงานเพื่อเก็บระดับคะแนนและผ่านใบประกาศนียบัตร!
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Play Area */}
        <div className="lg:col-span-7 bg-slate-800/60 backdrop-blur rounded-3xl p-6 md:p-8 border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">ด่านตรวจสอบที่ {level} / 3</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-3 py-1 rounded-full">SCORE: {score} XP</span>
            </div>

            {/* Level indicator rings */}
            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3].map((idx) => (
                <div 
                  key={idx} 
                  className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                    idx === level ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : idx < level ? 'bg-emerald-500' : 'bg-slate-700/60'
                  }`}
                ></div>
              ))}
            </div>

            <h4 className="text-xl font-bold text-white mb-3">{currentCase.title}</h4>
            <p className="text-slate-300 text-[13.5px] leading-relaxed mb-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-900/80">{currentCase.desc}</p>
            
            <div className="mb-4">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">คำแนะนำการตรวจสอบ:</span>
              <div className="bg-indigo-950/30 border border-indigo-900/40 p-4 rounded-xl text-indigo-300 text-xs leading-relaxed flex gap-2">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{currentCase.tip}</span>
              </div>
            </div>
          </div>

          {/* Result Messages */}
          {gameState === 'success' && (
            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-4 rounded-2xl flex items-start gap-3 animate-fade-in">
              <Check className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">ผลการตรวจจับผ่าน! (+10 XP)</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedOpt.feedback}</p>
              </div>
            </div>
          )}

          {gameState === 'fail' && (
            <div className="mt-4 bg-rose-500/10 border border-rose-500/40 text-rose-400 p-4 rounded-2xl flex items-center gap-3 animate-shake">
              <X className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-sm font-bold">วิเคราะห์ผิดพลาด!</p>
                <p className="text-xs text-slate-300 mt-0.5">พิกัดความเสียหายที่วิเคราะห์ยังไม่ตรงจุด ลองสังเกตคำใบ้อีกครั้ง</p>
              </div>
            </div>
          )}
        </div>

        {/* Answers and Actions Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Options Panel */}
          <div className="bg-slate-800/30 rounded-3xl p-6 border border-slate-700/60 flex-1 flex flex-col justify-center">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
              {currentCase.question}
            </span>
            <div className="grid grid-cols-1 gap-3">
              {currentCase.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleAnswer(option)}
                  disabled={gameState !== 'playing'}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 active:scale-98 ${
                    selectedOpt?.key === option.key
                      ? option.isCorrect
                        ? 'bg-emerald-500/25 border-emerald-500 text-white font-bold'
                        : 'bg-rose-500/25 border-rose-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-700 disabled:opacity-50'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    selectedOpt?.key === option.key
                      ? option.isCorrect
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {option.key}
                  </span>
                  <span className="text-[13px] leading-relaxed">{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div>
            {gameState === 'success' && level < 3 && (
              <button
                onClick={handleNext}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] text-xs tracking-wider uppercase"
              >
                ลุยการตรวจจับเคสถัดไป <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {gameState === 'success' && level === 3 && (
              <div className="w-full text-center animate-fade-in">
                <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-400 p-4.5 rounded-2xl mb-4 font-bold text-xs leading-relaxed flex items-center gap-2.5 justify-center">
                  <ShieldCheck className="w-5 h-5" />
                  คุณตรวจผ่านครบ 3 เคสใหญ่ ได้รับเกียรตินิยมผู้ตรวจวินิจฉัยตรรกะดีเยี่ยม!
                </div>
                <button
                  onClick={handleResetGame}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold transition-all text-xs"
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" /> ล้างข้อมูลเริ่มฝึกฝนใหม่
                </button>
              </div>
            )}

            {gameState === 'fail' && (
              <button
                onClick={() => { setSelectedOpt(null); setGameState('playing'); }}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-3.5 rounded-2xl font-bold transition-all text-xs"
              >
                ย้อนคิดพิจารณาตรรกะใหม่
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 4. MAIN PAGE COMPONENT (Vertical Stack Layout & Ambient Backdrop Layer 1)
// ============================================================================
export default function pyUnit2_9_GoodFlowchartPractices() {
  const [isMuted, setIsMuted] = useState(false);

  const teacherTaskContent = `ใบงานกิจกรรมปฏิบัติ: วิศวกรตรวจคุณภาพแผนภูมิภาพระบบสากล
ให้นักเรียนวิเคราะห์แผนงานและปฏิบัติงานสร้างผังงานที่ดีโดยมีภารกิจดังนี้:

1. ให้นักเรียนจำลองการวิเคราะห์และออกแบบผังงาน "ระบบจำหน่ายเครื่องดื่มอัตโนมัติ" ในสมุดจดบันทึก หรือโปรแกรม draw.io โดยต้องมีส่วนประกอบดังนี้:
   - จุดเริ่มต้น (START) และจุดสิ้นสุด (END) เพียงแค่อย่างละจุดเดียวเท่านั้น
   - มีการจัดระบบลูกศรเชื่อมทิศทางจากบนลงล่าง และจากซ้ายไปขวาอย่างสะอาดเรียบร้อย ปราศจากลายเส้นที่ตัดหรือข้ามหัวกัน
   - ใช้สัญลักษณ์ ANSI ตรงตามประเภท 100% (รูป Diamond สำหรับตัวเลือก และ Rectangle สำหรับขั้นตอน)
   - ป้องกันไม่ให้เกิดลูปอนันต์ (Infinite Loop) และปิดปลายสาย (Dangling) ทั้งหมด

2. เขียนเปรียบเทียบตรรกะของผังงานดังกล่าวให้ออกมาเป็นโค้ด Python ในรูปแบบของเงื่อนไข if-else หรือโครงสร้างลูป while loop สั้นๆ ในช่องโจทย์ปฏิบัติเพื่อทดลองความพร้อมใช้งานของระบบ`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative">
      
      {/* LAYER 1: Ambient Backdrop (Glowing blur rings) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[8%] right-[12%] w-[420px] h-[420px] rounded-full bg-indigo-100/40 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[18%] left-[6%] w-[460px] h-[460px] rounded-full bg-cyan-100/50 blur-[140px]"></div>
      </div>

      {/* LAYER 3: Vertically Stacked Components */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-4 space-y-16">
        
        {/* CARD 1: Flow Direction & Routing Simulator */}
        <FlowDirectionCard isMuted={isMuted} />

        {/* CARD 2: Flowchart Error Debugger & Fixer */}
        <ErrorVisualizerCard isMuted={isMuted} />

        {/* CARD 3: Flowchart Auditor Mini-Game */}
        <FlowchartAuditorGame isMuted={isMuted} />

        {/* LAYER 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="ใบงานปฏิบัติ 2.9" 
          taskText={teacherTaskContent} 
        />

      </main>
    </div>
  );
}
