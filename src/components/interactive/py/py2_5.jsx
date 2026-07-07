import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  Database, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeftRight, 
  Network, 
  Scale, 
  BrainCircuit, 
  Check, 
  X, 
  Bug, 
  RefreshCw, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  Home, 
  Thermometer, 
  Sun, 
  Activity, 
  Wallet, 
  Lock, 
  Unlock, 
  ShieldCheck 
} from 'lucide-react';

// ============================================================================
// COMMON COMPONENTS & HELPERS
// ============================================================================

const CustomSelect = ({ value, options, onChange, placeholder = "เลือก...", disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block mx-1 align-middle">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded-lg border font-mono font-bold text-xs transition-all active:scale-98 flex items-center gap-1 ${
          value 
            ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 hover:bg-indigo-500/35'
            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
        }`}
      >
        <span>{value || placeholder}</span>
        <span className="text-[8px] opacity-60">▼</span>
      </button>
      
      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 mt-1.5 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-50 animate-fade-in font-mono">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-colors block ${
                  value === opt ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-slate-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================================================
// CARD 1: เงื่อนไขทางเลือกแบบ IF (Single Alternative)
// ============================================================================

const SingleIfCard = () => {
  const [score, setScore] = useState(75);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [explanation, setExplanation] = useState("คลิกปุ่มเริ่มรันด้านล่างเพื่อไล่การตรวจสอบลอจิกทีละสเต็ป");

  const pseudocodeLines = [
    { code: "BEGIN", indent: 0 },
    { code: `READ score  (ค่าปัจจุบัน = ${score})`, indent: 1 },
    { code: `IF score >= 50 THEN`, indent: 1, check: (s) => s >= 50 },
    { code: '  PRINT "Pass"', indent: 2 },
    { code: "END IF", indent: 1 },
    { code: "END", indent: 0 }
  ];

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    setCurrentLine(0);
    setExplanation("เริ่มต้นโปรแกรมด้วยคำสั่ง BEGIN");

    const steps = [
      { line: 0, exp: "เริ่มประกาศเริ่มต้นการทำงาน" },
      { line: 1, exp: `อ่านข้อมูลคะแนนนำเข้าของนักเรียน ปัจจุบันคือ score = ${score}` },
      { 
        line: 2, 
        exp: `ทำการตรวจสอบเงื่อนไขหลัก: score >= 50 หรือไม่? (${score} >= 50) สรุปเป็น: ${score >= 50 ? 'จริง (True)' : 'เท็จ (False)'}`
      },
      ...(score >= 50 ? [
        { line: 3, exp: "เนื่องจากเงื่อนไขเป็นจริง ทำตามคำสั่งแสดงผลข้อมูลด้านใน: พิมพ์คำว่า 'Pass' ลงจอ", out: "Pass" }
      ] : [
        { line: 4, exp: "เนื่องจากเงื่อนไขเป็นเท็จ ข้ามการประมวลผลคำสั่งพิมพ์ข้ามไปสิ้นสุดโครงสร้างทันที" }
      ]),
      { line: 4, exp: "สิ้นสุดกลุ่มคำสั่งเงื่อนไขเดี่ยว (END IF)" },
      { line: 5, exp: "สิ้นสุดขั้นตอนอัลกอริทึมสมบูรณ์" }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setCurrentLine(steps[i].line);
        setExplanation(steps[i].exp);
        if (steps[i].out) {
          setConsoleOutput(prev => [...prev, steps[i].out]);
        }
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1100);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <Cpu className="w-3.5 h-3.5" /> โครงสร้างทางเลือกเดี่ยว
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-indigo-600" />
          เงื่อนไขทางเลือกแบบ IF
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          เป็นรูปแบบการตัดสินใจที่ง่ายที่สุด คำสั่งภายในบล็อกเงื่อนไขจะถูกประมวลผลก็ต่อเมื่อการประเมินผลลัพธ์เงื่อนไขออกมาเป็น **จริง (True)** เท่านั้น 
          แต่ถ้าผลลัพธ์เป็น **เท็จ (False)** ระบบจะข้ามคำสั่งกลุ่มนั้นไปทำส่วนถัดไปทันทีโดยไม่มีคำสั่งสำรอง
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controller & Inputs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                กำหนดคะแนนที่ป้อนเข้าสู่ระบบ (score):
              </label>
              
              <div className="flex gap-3 mb-4">
                {[45, 50, 75, 95].map((val) => (
                  <button
                    key={val}
                    disabled={isRunning}
                    onClick={() => {
                      setScore(val);
                      setExplanation(`อัปเดตคะแนนเป็น ${val} คะแนน พร้อมสำหรับการทดสอบรันอัลกอริทึม`);
                      setCurrentLine(-1);
                      setConsoleOutput([]);
                    }}
                    className={`flex-1 py-2.5 rounded-xl font-mono font-bold text-sm transition-all active:scale-98 ${
                      score === val
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>คะแนนผ่านเกณฑ์ที่ต้องตรวจสอบคือมากกว่าหรือเท่ากับ 50 แต้ม</span>
              </div>
            </div>

            {/* Terminal Screen Console */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex-1 flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 pb-1.5 border-b border-slate-800">
                  Console Output Window
                </span>
                <div className="font-mono text-sm leading-relaxed text-emerald-400">
                  {consoleOutput.length === 0 ? (
                    <span className="text-slate-600 italic text-xs select-none">
                      [ ไม่มีข้อความแสดงผลออกทางจอภาพ ]
                    </span>
                  ) : (
                    consoleOutput.map((out, idx) => <div key={idx}>&gt; {out}</div>)
                  )}
                </div>
              </div>

              <button
                disabled={isRunning}
                onClick={handleRun}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 text-xs"
              >
                <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-pulse' : ''}`} />
                <span>{isRunning ? 'กำลังจำลองลอจิกทีละบรรทัด...' : 'เริ่มจำลองขั้นตอน (Run)'}</span>
              </button>
            </div>
          </div>

          {/* Live Trace Workspace */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> code_workspace_1.txt
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1">
                {pseudocodeLines.map((line, idx) => {
                  const isActive = currentLine === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start rounded px-2.5 py-0.5 transition-all ${
                        isActive 
                          ? 'bg-indigo-500/20 border-l-4 border-indigo-500 pl-1.5 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.15)] font-bold'
                          : 'border-l-4 border-transparent'
                      }`}
                    >
                      <span className="w-5 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">{idx + 1}</span>
                      <span style={{ paddingLeft: `${line.indent * 20}px` }}>{line.code}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2.5 items-start text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-300 block mb-0.5">คำอธิบายขั้นตอนปัจจุบัน:</span>
                {explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 2: เงื่อนไขทางเลือกแบบ IF-ELSE (Double Alternative)
// ============================================================================

const IfElseCard = () => {
  const [balance, setBalance] = useState(100);
  const [price, setPrice] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [explanation, setExplanation] = useState("กำหนดงบประมาณและราคาสินค้าเพื่อทดลองลอจิกสองทางเลือก");

  const pseudocodeLines = [
    { code: "BEGIN", indent: 0 },
    { code: `READ balance, price  (เงินสด = $${balance}, ราคาสินค้า = $${price})`, indent: 1 },
    { code: "IF balance >= price THEN", indent: 1 },
    { code: '  PRINT "Purchase Success"', indent: 2 },
    { code: `  balance = balance - price  (เหลือเงิน = $${Math.max(0, balance - price)})`, indent: 2 },
    { code: "ELSE", indent: 1 },
    { code: '  PRINT "Insufficient Funds"', indent: 2 },
    { code: "END IF", indent: 1 },
    { code: "END", indent: 0 }
  ];

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    setCurrentLine(0);

    const steps = [
      { line: 0, exp: "เริ่มประกาศเริ่มต้นขั้นตอนการทำงานหลัก" },
      { line: 1, exp: `รับค่าตัวแปร: balance = ${balance} บาท, price = ${price} บาท` },
      { 
        line: 2, 
        exp: `ตรวจสอบความสมดุลเงื่อนไขหลัก: balance >= price หรือไม่? (${balance} >= ${price}) ผลลัพธ์: ${balance >= price ? 'จริง (True)' : 'เท็จ (False)'}`
      },
      ...(balance >= price ? [
        { line: 3, exp: "เงื่อนไขเป็นจริง เข้าทำงานในบล็อก IF: แสดงข้อความแจ้งเตือนคำสั่งซื้อสำเร็จ", out: "Purchase Success" },
        { line: 4, exp: `หักลบเงินในบัญชีคงเหลือ: balance = balance - price (${balance} - ${price} = ${balance - price} บาท)` }
      ] : [
        { line: 5, exp: "เงื่อนไขหลักประเมินเป็นเท็จ ข้ามคำสั่งบล็อกแรกและเข้าทำงานในบล็อก ELSE สำรองทันที" },
        { line: 6, exp: "ทำตามคำสั่งในบล็อก ELSE: พิมพ์แจ้งเตือนยอดเงินไม่พอสำหรับการทำรายการออกหน้าจอ", out: "Insufficient Funds" }
      ]),
      { line: 7, exp: "สิ้นสุดโครงสร้างเงื่อนไขแบบสองทางเลือก (END IF)" },
      { line: 8, exp: "สิ้นสุดขั้นตอนอัลกอริทึมสมบูรณ์" }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setCurrentLine(steps[i].line);
        setExplanation(steps[i].exp);
        if (steps[i].out) {
          setConsoleOutput(prev => [...prev, steps[i].out]);
        }
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1100);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-cyan-50 text-cyan-600 border border-cyan-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <ArrowLeftRight className="w-3.5 h-3.5" /> โครงสร้างสองทางเลือก
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Layers className="w-7 h-7 text-cyan-600" />
          เงื่อนไขทางเลือกแบบ IF-ELSE
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          เป็นโครงสร้างตรวจสอบเงื่อนไขที่ขยายขึ้นเพื่อรองรับสภาวะที่เป็น **เท็จ (False)** โดยการระบุบล็อก `ELSE` เพิ่มเติม 
          เพื่อให้แน่ใจว่าระบบมีการประมวลผลคำสั่งสำรองเสมอหากเงื่อนไขเริ่มต้นไม่สอดคล้อง (ไม่ว่าผลลัพธ์ตรรกะจะจริงหรือเท็จก็ตาม)
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controller & Inputs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
              <div>
                <label className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <span>กระเป๋าเงินของคุณ (balance):</span>
                  <span className="text-cyan-600 text-sm font-bold font-mono">${balance}</span>
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="200" 
                  step="10"
                  value={balance} 
                  disabled={isRunning}
                  onChange={(e) => {
                    setBalance(parseInt(e.target.value));
                    setExplanation(`อัปเดตยอดเงินสดเป็น $${e.target.value}`);
                    setCurrentLine(-1);
                    setConsoleOutput([]);
                  }}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <label className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <span>ราคาสินค้า (price):</span>
                  <span className="text-rose-500 text-sm font-bold font-mono">${price}</span>
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="200" 
                  step="10"
                  value={price} 
                  disabled={isRunning}
                  onChange={(e) => {
                    setPrice(parseInt(e.target.value));
                    setExplanation(`อัปเดตราคาสินค้าเป็น $${e.target.value}`);
                    setCurrentLine(-1);
                    setConsoleOutput([]);
                  }}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div className="bg-white/80 rounded-xl px-4 py-3 border border-slate-200/50 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">ผลการซื้อล่วงหน้า:</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  balance >= price ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {balance >= price ? 'มีเงินพอสำหรับการซื้อ' : 'ยอดเงินไม่เพียงพอ'}
                </span>
              </div>
            </div>

            {/* Terminal Screen Console */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex-1 flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 pb-1.5 border-b border-slate-800">
                  Console Output Window
                </span>
                <div className="font-mono text-sm leading-relaxed text-cyan-400">
                  {consoleOutput.length === 0 ? (
                    <span className="text-slate-600 italic text-xs select-none">
                      [ ไม่มีข้อความแสดงผลออกทางจอภาพ ]
                    </span>
                  ) : (
                    consoleOutput.map((out, idx) => <div key={idx}>&gt; {out}</div>)
                  )}
                </div>
              </div>

              <button
                disabled={isRunning}
                onClick={handleRun}
                className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-md shadow-cyan-600/10 flex items-center justify-center gap-2 text-xs"
              >
                <Wallet className="w-4 h-4" />
                <span>{isRunning ? 'กำลังจำลองลอจิกทีละบรรทัด...' : 'เริ่มจำลองขั้นตอน (Run)'}</span>
              </button>
            </div>
          </div>

          {/* Live Trace Workspace */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> code_workspace_2.txt
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1">
                {pseudocodeLines.map((line, idx) => {
                  const isActive = currentLine === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start rounded px-2.5 py-0.5 transition-all ${
                        isActive 
                          ? 'bg-cyan-500/20 border-l-4 border-cyan-500 pl-1.5 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold'
                          : 'border-l-4 border-transparent'
                      }`}
                    >
                      <span className="w-5 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">{idx + 1}</span>
                      <span style={{ paddingLeft: `${line.indent * 20}px` }}>{line.code}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2.5 items-start text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300 block mb-0.5">คำอธิบายขั้นตอนปัจจุบัน:</span>
                {explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 3: เงื่อนไขทางเลือกแบบ IF-ELIF-ELSE (Multiple Alternatives)
// ============================================================================

const IfElifElseCard = () => {
  const [score, setScore] = useState(72);
  const [highlightLine, setHighlightLine] = useState(-1);

  // Active line highlight mapping based on live score values
  useEffect(() => {
    if (score >= 80) {
      setHighlightLine(3); // grade = "A"
    } else if (score >= 70) {
      setHighlightLine(5); // grade = "B"
    } else if (score >= 60) {
      setHighlightLine(7); // grade = "C"
    } else {
      setHighlightLine(9); // grade = "F"
    }
  }, [score]);

  const getGrade = (s) => {
    if (s >= 80) return { name: "A", color: "bg-emerald-500 text-white shadow-emerald-500/20 border-emerald-400" };
    if (s >= 70) return { name: "B", color: "bg-indigo-500 text-white shadow-indigo-500/20 border-indigo-400" };
    if (s >= 60) return { name: "C", color: "bg-amber-500 text-white shadow-amber-500/20 border-amber-400" };
    return { name: "F", color: "bg-rose-500 text-white shadow-rose-500/20 border-rose-400" };
  };

  const gradeInfo = getGrade(score);

  const pseudocodeLines = [
    { code: "BEGIN", indent: 0, lineId: 0 },
    { code: `READ score  (สแกนคะแนน = ${score})`, indent: 1, lineId: 1 },
    { code: "IF score >= 80 THEN", indent: 1, lineId: 2, active: score >= 80 },
    { code: '  grade = "A"', indent: 2, lineId: 3, active: score >= 80 },
    { code: "ELSE IF score >= 70 THEN", indent: 1, lineId: 4, active: score >= 70 && score < 80 },
    { code: '  grade = "B"', indent: 2, lineId: 5, active: score >= 70 && score < 80 },
    { code: "ELSE IF score >= 60 THEN", indent: 1, lineId: 6, active: score >= 60 && score < 70 },
    { code: '  grade = "C"', indent: 2, lineId: 7, active: score >= 60 && score < 70 },
    { code: "ELSE", indent: 1, lineId: 8, active: score < 60 },
    { code: '  grade = "F"', indent: 2, lineId: 9, active: score < 60 },
    { code: "END IF", indent: 1, lineId: 10 },
    { code: "PRINT grade", indent: 1, lineId: 11 },
    { code: "END", indent: 0, lineId: 12 }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-purple-50 text-purple-600 border border-purple-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> โครงสร้างหลายทางเลือก
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Scale className="w-7 h-7 text-purple-600" />
          เงื่อนไขทางเลือกแบบ IF-ELIF-ELSE
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          โครงสร้างควบคุมหลายทางเลือก ใช้เพื่อรับมือกับเหตุการณ์ที่มีความเป็นไปได้มากกว่า 2 กรณีขึ้นไป (เช่น การตัดเกรด หรือระดับความร้อน) 
          การประเมินจะกระทำไล่จากเงื่อนไขบนสุดลงมาทีละกรณี เมื่อพบกรณีใดเป็น **จริง (True)** ระบบจะทำชุดคำสั่งนั้นแล้วโดดข้ามบล็อกที่เหลือออกทันที
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controller & Inputs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex-1 flex flex-col justify-between">
              <div>
                <label className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  <span>เลื่อนปรับคะแนนแบบเรียลไทม์ (score):</span>
                  <span className="text-purple-600 text-sm font-bold font-mono">{score} คะแนน</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="1"
                  value={score} 
                  onChange={(e) => setScore(parseInt(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              {/* Reactive Visual Display */}
              <div className="my-8 text-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">เกรดที่ได้ประเมิน</span>
                <div className={`inline-flex w-20 h-20 rounded-2xl items-center justify-center font-sans text-3xl font-extrabold shadow-lg border ${gradeInfo.color} transition-all duration-300 transform active:scale-95`}>
                  {gradeInfo.name}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                  {score >= 80 ? 'เกณฑ์ยอดเยี่ยม (A)' : score >= 70 ? 'เกณฑ์ดีมาก (B)' : score >= 60 ? 'เกณฑ์พอใช้ (C)' : 'ยังไม่ผ่านเกณฑ์ขั้นต่ำ (F)'}
                </div>
              </div>

              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100/50 flex gap-2 text-xs text-slate-600 leading-relaxed">
                <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>สังเกตดูว่ารหัสเทียมทางฝั่งขวาจะไฮไลต์เฉพาะบรรทัดโครงสร้างที่ค่าคะแนนเป็นจริงในปัจจุบันแบบทันท่วงที</span>
              </div>
            </div>
          </div>

          {/* Live Trace Workspace */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> code_workspace_3.txt
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1">
                {pseudocodeLines.map((line, idx) => {
                  const isActiveLine = highlightLine === line.lineId;
                  const isBranchLine = line.active;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start rounded px-2.5 py-0.5 transition-all ${
                        isActiveLine 
                          ? 'bg-purple-500/25 border-l-4 border-purple-500 pl-1.5 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)] font-bold'
                          : isBranchLine 
                            ? 'bg-purple-500/10 border-l-4 border-purple-700/50 pl-1.5 text-purple-300'
                            : 'border-l-4 border-transparent'
                      }`}
                    >
                      <span className="w-5 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">{idx + 1}</span>
                      <span style={{ paddingLeft: `${line.indent * 20}px` }}>{line.code}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl">
              <span className="font-bold text-purple-300 block mb-1">ความเห็นคอมไพเลอร์:</span>
              <span>รหัสเทียมจะมองข้ามทุกส่วนเงื่อนไขด้านล่างทันทีเมื่อผลคะแนนประเมินเป็นจริงในส่วนบน เพื่อประสิทธิภาพในการจัดการลอจิก</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 4: การเขียนเงื่อนไขซ้อนทับ (Nested IF)
// ============================================================================

const NestedIfCard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Derive target highlight lines based on combination of switches
  const getHighlightPath = () => {
    if (!isLoggedIn) return [2, 7, 8]; // IF -> ELSE block -> PRINT Access Denied
    if (isLoggedIn && !isAdmin) return [2, 3, 5, 6]; // IF -> Nested IF check -> ELSE nested block -> PRINT User Portal
    return [2, 3, 4]; // IF -> Nested IF check -> Nest TRUE -> PRINT Admin Portal
  };

  const activePaths = getHighlightPath();

  const pseudocodeLines = [
    { id: 0, code: "BEGIN", indent: 0 },
    { id: 1, code: "READ is_logged_in, is_admin", indent: 1 },
    { id: 2, code: "IF is_logged_in == TRUE THEN", indent: 1 },
    { id: 3, code: "  IF is_admin == TRUE THEN", indent: 2 },
    { id: 4, code: '    PRINT "Admin Panel Access Granted"', indent: 3 },
    { id: 5, code: "  ELSE", indent: 2 },
    { id: 6, code: '    PRINT "User Dashboard Access Granted"', indent: 3 },
    { id: 7, code: "  END IF", indent: 2 },
    { id: 8, code: "ELSE", indent: 1 },
    { id: 9, code: '  PRINT "Access Denied: Please Log In"', indent: 2 },
    { id: 10, code: "END IF", indent: 1 },
    { id: 11, code: "END", indent: 0 }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> โครงสร้างซ้อนเงื่อนไข
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Network className="w-7 h-7 text-emerald-600" />
          การเขียนเงื่อนไขซ้อนทับ NESTED IF
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          เป็นรูปแบบการซ้อนลอจิกที่มีการนำโครงสร้างคำสั่ง `IF` ไปใส่อยู่ข้างในคำสั่ง `IF` ของอีกเงื่อนไขหนึ่ง 
          เปรียบเสมือนการกรองข้อมูลหลายชั้น ซึ่งเงื่อนไขชั้นในสุดจะถูกตรวจสอบก็ต่อเมื่อเงื่อนไขหลักภายนอกประเมินค่าเป็น **จริง (True)** แล้วเท่านั้น
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controller & Inputs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                แผงจำลองการยืนยันตัวตน (Authentication Gateway):
              </span>

              {/* Input Switch 1 */}
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isLoggedIn ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {isLoggedIn ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <strong className="block text-xs text-slate-800">เข้าสู่ระบบ (is_logged_in)</strong>
                    <span className="text-[10px] text-slate-400">{isLoggedIn ? 'สถานะ: ลงชื่อเข้าใช้แล้ว' : 'สถานะ: บุคคลภายนอก'}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    isLoggedIn ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-all ${
                    isLoggedIn ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Input Switch 2 */}
              <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                isLoggedIn ? 'bg-white border-slate-200' : 'bg-slate-100/50 border-slate-100 opacity-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isLoggedIn && isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs text-slate-800">ผู้ดูแลระบบ (is_admin)</strong>
                    <span className="text-[10px] text-slate-400">{isLoggedIn && isAdmin ? 'บัญชี: Admin' : 'บัญชี: สมาชิกทั่วไป'}</span>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!isLoggedIn}
                  onClick={() => setIsAdmin(!isAdmin)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    isLoggedIn && isAdmin ? 'bg-purple-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-all ${
                    isLoggedIn && isAdmin ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            {/* Simulated Live Gateway Door Display */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col justify-center items-center min-h-[140px]">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">GATEWAY DOOR STATUS</span>
              <div className={`px-5 py-3 rounded-xl font-bold border transition-all duration-300 text-xs flex items-center gap-2 ${
                !isLoggedIn 
                  ? 'bg-rose-900/20 border-rose-800 text-rose-400 animate-pulse'
                  : isAdmin 
                    ? 'bg-purple-900/20 border-purple-800 text-purple-400'
                    : 'bg-emerald-900/20 border-emerald-800 text-emerald-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  !isLoggedIn ? 'bg-rose-500' : isAdmin ? 'bg-purple-500' : 'bg-emerald-500'
                }`} />
                <span>
                  {!isLoggedIn 
                    ? 'ACCESS DENIED: บุคคลภายนอก' 
                    : isAdmin 
                      ? 'ADMIN GRANTED: บอร์ดผู้ควบคุมหลัก' 
                      : 'USER GRANTED: หน้าบอร์ดสมาชิก'}
                </span>
              </div>
            </div>
          </div>

          {/* Live Trace Workspace */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> code_workspace_4.txt
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1">
                {pseudocodeLines.map((line, idx) => {
                  const isHighlighted = activePaths.includes(line.id);
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start rounded px-2.5 py-0.5 transition-all ${
                        isHighlighted 
                          ? 'bg-emerald-500/20 border-l-4 border-emerald-500 pl-1.5 text-emerald-200 shadow-[0_0_15px_rgba(34,197,94,0.15)] font-bold'
                          : 'border-l-4 border-transparent opacity-45'
                      }`}
                    >
                      <span className="w-5 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">{idx + 1}</span>
                      <span style={{ paddingLeft: `${line.indent * 20}px` }}>{line.code}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl">
              <span className="font-bold text-emerald-400 block mb-1">กลไกความปลอดภัย:</span>
              <span>หากไม่ลงชื่อเข้าใช้ ตัวแปลเงื่อนไขภายนอกจะตัดจบบล็อกไปที่เงื่อนไขเท็จด้านนอกทันทีเพื่อการประหยัดกระบวนการประมวลผล</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INTERACTIVE PLAYGROUND: SMART HOME CONTROLLER SIMULATOR
// ============================================================================

const SmartHomeSimulator = () => {
  // Input parameters
  const [motion, setMotion] = useState(true);
  const [ambientLight, setAmbientLight] = useState(25);
  const [temp, setTemp] = useState(32);

  // Controller execution tracking helper
  const isLampsOn = motion && ambientLight < 30;
  const isACActive = motion && temp > 28;
  const isHeaterActive = motion && temp < 20;
  const isClimateStandby = !motion || (temp >= 20 && temp <= 28);

  const getTraceHighlightLines = () => {
    const list = [0, 1]; // BEGIN, READ
    if (motion) {
      list.push(2); // IF motion == TRUE
      if (ambientLight < 30) {
        list.push(3); // IF ambient_light < 30
        list.push(4); // PRINT Lamps ON
      } else {
        list.push(5); // ELSE (light level check)
        list.push(6); // PRINT Lamps OFF
      }
      list.push(8); // END IF
      
      list.push(10); // IF temp > 28
      if (temp > 28) {
        list.push(11); // PRINT AC ON
      } else if (temp < 20) {
        list.push(12); // ELSE IF temp < 20
        list.push(13); // PRINT Heater ON
      } else {
        list.push(14); // ELSE
        list.push(15); // PRINT Climate Standby
      }
      list.push(17); // END IF
    } else {
      list.push(18); // ELSE (No motion)
      list.push(19); // PRINT Lamps OFF (No motion)
      list.push(20); // PRINT Climate Standby
    }
    list.push(22); // END IF (outer)
    list.push(23); // END
    return list;
  };

  const activeLines = getTraceHighlightLines();

  const simulatorPseudocode = [
    { id: 0, code: "BEGIN", indent: 0 },
    { id: 1, code: `READ motion, temp, ambient_light`, indent: 1 },
    { id: 2, code: `IF motion == TRUE THEN  (สถานะ: ${motion ? 'จริง' : 'เท็จ'})`, indent: 1 },
    { id: 3, code: `  IF ambient_light < 30 THEN  (แสง: ${ambientLight}%)`, indent: 2 },
    { id: 4, code: '    PRINT "Lamps: ON (Active & Dark)"', indent: 3, isActiveNode: isLampsOn },
    { id: 5, code: "  ELSE", indent: 2 },
    { id: 6, code: '    PRINT "Lamps: OFF (Ambient Bright)"', indent: 3, isActiveNode: motion && ambientLight >= 30 },
    { id: 7, code: "  END IF", indent: 2 },
    { id: 8, code: "", indent: 0, isGap: true },
    { id: 10, code: `  IF temp > 28 THEN  (อุณหภูมิ: ${temp}°C)`, indent: 2 },
    { id: 11, code: '    PRINT "Air Conditioner: ON (Cooling)"', indent: 3, isActiveNode: isACActive },
    { id: 12, code: `  ELSE IF temp < 20 THEN  (อุณหภูมิ: ${temp}°C)`, indent: 2 },
    { id: 13, code: '    PRINT "Heater: ON (Heating)"', indent: 3, isActiveNode: isHeaterActive },
    { id: 14, code: "  ELSE", indent: 2 },
    { id: 15, code: '    PRINT "Climate System: STANDBY"', indent: 3, isActiveNode: isClimateStandby && motion },
    { id: 16, code: "  END IF", indent: 2 },
    { id: 17, code: "END IF", indent: 1 },
    { id: 18, code: "ELSE", indent: 1 },
    { id: 19, code: '  PRINT "Lamps: OFF (No Motion)"', indent: 2, isActiveNode: !motion },
    { id: 20, code: '  PRINT "Climate: STANDBY (Power Saving)"', indent: 2, isActiveNode: !motion },
    { id: 21, code: "END IF", indent: 1 },
    { id: 22, code: "END", indent: 0 }
  ];

  return (
    <div className="bg-[#1e293b] rounded-[2.5rem] p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden group">
      {/* Background radial overlay */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-bl-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-10">
        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Gamification Zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2">
          <Home className="w-8 h-8 text-indigo-400" />
          ระบบบ้านอัจฉริยะแบบมีเงื่อนไข (Smart Home Simulator)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-[15px]">
          จำลองลอจิกตัวคุมระบบฮาร์ดแวร์บ้านอัจฉริยะ ปรับสวิตช์ความเคลื่อนไหว และระดับแสงแดด หรือความร้อน 
          เพื่อสังเกตการเดินทางไหลเวียนของข้อมูลและไฮไลต์รหัสเทียมซ้อนกันในแบบเรียลไทม์
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left column: Controls (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 flex-1 flex flex-col justify-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">
              SENSOR INPUT PANELS
            </span>

            {/* Input 1: Motion Detector */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl transition-all ${
                  motion ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Activity className={`w-5 h-5 ${motion ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <strong className="block text-xs text-white">การเคลื่อนไหว</strong>
                  <span className="text-[10px] text-slate-500">{motion ? 'ตรวจพบผู้อยู่อาศัย' : 'ไม่มีคนอยู่ห้อง'}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMotion(!motion)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  motion ? 'bg-indigo-500' : 'bg-slate-800'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-all ${
                  motion ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Input 2: Ambient Light Level */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Sun className="w-4 h-4 text-amber-400" /> แสงแดดรอบนอก (Light)
                </span>
                <span className="font-bold text-white font-mono">{ambientLight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={ambientLight}
                onChange={(e) => setAmbientLight(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[8px] font-bold text-slate-500">
                <span>0% (มืดสนิท)</span>
                <span>30% (เริ่มค่ำ)</span>
                <span>100% (จ้า)</span>
              </div>
            </div>

            {/* Input 3: Room Temperature */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Thermometer className="w-4 h-4 text-cyan-400" /> อุณหภูมิห้อง (Temp)
                </span>
                <span className="font-bold text-white font-mono">{temp}°C</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="40" 
                value={temp}
                onChange={(e) => setTemp(parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-[8px] font-bold text-slate-500">
                <span>10°C (หนาวมาก)</span>
                <span>28°C (อบอุ่น)</span>
                <span>40°C (ร้อนจัด)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle column: Code Editor live display (Span 5) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-inner">
          <div>
            <span className="block text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> smart_control.py (รหัสเทียม)
            </span>

            <div className="font-mono text-[11px] md:text-xs leading-loose text-slate-300 space-y-1">
              {simulatorPseudocode.map((line, idx) => {
                if (line.isGap) return <div key={idx} className="h-2"></div>;
                const isLineActive = activeLines.includes(line.id);
                const isTargetNode = line.isActiveNode;

                return (
                  <div 
                    key={idx} 
                    className={`flex items-start rounded px-2 py-0.5 transition-all ${
                      isTargetNode
                        ? 'bg-indigo-500/30 border-l-4 border-emerald-500 pl-1 text-emerald-300 font-extrabold shadow-[0_0_10px_rgba(16,185,129,0.15)] animate-pulse'
                        : isLineActive
                          ? 'bg-indigo-500/15 border-l-4 border-indigo-500 pl-1 text-indigo-200'
                          : 'border-l-4 border-transparent opacity-30'
                    }`}
                  >
                    <span className="w-5 text-[8px] text-slate-600 text-right select-none font-bold mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    <span style={{ paddingLeft: `${line.indent * 14}px` }} className="font-mono">
                      {line.code}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Beautiful hardware virtualization screen (Span 4) */}
        <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-inner relative overflow-hidden">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
            PHYSICAL LIVING ROOM
          </span>

          {/* Smart House SVG Panel */}
          <div className="flex-1 flex flex-col justify-center items-center py-6">
            <div className="relative w-44 h-44 flex items-center justify-center bg-slate-950 rounded-full border border-slate-800 shadow-2xl overflow-hidden">
              {/* Climate flow backgrounds */}
              {isACActive && (
                <div className="absolute inset-0 bg-cyan-500/5 animate-pulse flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-cyan-500/10 scale-110 animate-ping"></div>
                </div>
              )}
              {isHeaterActive && (
                <div className="absolute inset-0 bg-rose-500/5 animate-pulse flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-rose-500/10 scale-110 animate-ping"></div>
                </div>
              )}

              {/* Graphic container */}
              <div className="relative z-10 flex flex-col items-center space-y-4">
                {/* Lightbulb indicator */}
                <div className={`p-4 rounded-full transition-all duration-500 shadow-xl ${
                  isLampsOn 
                    ? 'bg-amber-400 text-slate-950 shadow-amber-400/20 scale-110' 
                    : 'bg-slate-800 text-slate-600 border border-slate-700'
                }`}>
                  <Sun className={`w-8 h-8 ${isLampsOn ? 'animate-spin-slow' : ''}`} />
                </div>

                {/* Status Badge */}
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">แสงไฟ:</div>
                  <div className={`text-xs font-extrabold mt-0.5 ${isLampsOn ? 'text-amber-400' : 'text-slate-500'}`}>
                    {isLampsOn ? 'เปิดทำงาน (ON)' : 'ปิดการทำงาน (OFF)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Climate system displays */}
            <div className="w-full mt-6 grid grid-cols-2 gap-3">
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase block mb-1">แอร์ (AC):</span>
                <span className={`text-[11px] font-extrabold ${isACActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {isACActive ? 'ทำงาน (COOLING)' : 'ปิดใช้งาน'}
                </span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase block mb-1">ฮีตเตอร์:</span>
                <span className={`text-[11px] font-extrabold ${isHeaterActive ? 'text-rose-400' : 'text-slate-600'}`}>
                  {isHeaterActive ? 'ทำงาน (HEATING)' : 'ปิดใช้งาน'}
                </span>
              </div>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-xl border text-[10px] leading-relaxed text-center font-semibold tracking-wide transition-all ${
            !motion 
              ? 'bg-slate-950/40 border-slate-800 text-slate-500' 
              : isACActive 
                ? 'bg-cyan-950/30 border-cyan-800/80 text-cyan-300'
                : isHeaterActive 
                  ? 'bg-rose-950/30 border-rose-800/80 text-rose-300'
                  : 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
          }`}>
            {!motion 
              ? 'โหมดประหยัดพลังงาน: ปิดไฟ/เครื่องปรับอากาศสแตนด์บาย' 
              : `โหมดปกติ: ประมวลผลจากเซ็นเซอร์ปัจจุบัน (${temp}°C, แสง ${ambientLight}%)`}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN EXPORT COMPONENT
// ============================================================================

export default function py2_5() {
  const teacherTaskContent = `ให้นักเรียนเขียนรหัสเทียม (Pseudocode) จากสถานการณ์จำลองต่อไปนี้ลงในสมุดบันทึก:

โจทย์: ระบบจำลองตู้ออกบัตรส่วนลดตั๋วชมภาพยนตร์อัจฉริยะ (Cinema Discount Gate)
1. ทำการรับข้อมูลอายุ (age) และระดับบัตรสมาชิก (is_member: จริง/เท็จ)
2. หากอายุต่ำกว่า 15 ปี:
   - บัตรราคาเด็ก 80 บาท
3. หากอายุตั้งแต่ 15 ปีขึ้นไป:
   - ตรวจเช็คต่อว่าเป็นสมาชิก (is_member == TRUE) หรือไม่
   - หากเป็นสมาชิก บัตรราคาผู้ใหญ่ลดพิเศษ 140 บาท
   - หากไม่เป็นสมาชิก บัตรราคาผู้ใหญ่ปกติ 180 บาท

(คำชี้แนะ: พิจารณาเลือกใช้คำสั่งภาษาอังกฤษพิมพ์ใหญ่,BEGIN-END, ย่อหน้าเยื้องอย่างชัดเจน และโครงสร้างเงื่อนไขซ้อนทับ NESTED IF ให้ถูกต้องสมบูรณ์)`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-100 selection:text-indigo-900 relative">
      {/* Ambient background glow layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        {/* Layer 3 Content Cards */}
        <SingleIfCard />
        <IfElseCard />
        <IfElifElseCard />
        <NestedIfCard />
        <SmartHomeSimulator />

        {/* Layer 4 Handoff assignment */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.5)" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
