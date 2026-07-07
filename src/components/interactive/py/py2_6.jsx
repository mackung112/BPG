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
  Activity, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  RefreshCw, 
  ShieldAlert, 
  Flame, 
  Battery, 
  Coins, 
  Terminal,
  Scale
} from 'lucide-react';

// ============================================================================
// CARD 1: การวนซ้ำแบบ WHILE LOOP (Condition-Controlled)
// ============================================================================

const WhileLoopCard = () => {
  const [startCount, setStartCount] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [count, setCount] = useState(2);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [explanation, setExplanation] = useState("เลือกค่าเริ่มต้นแล้วกดปุ่มเริ่มจำลองลูปจำลองทีละขั้นตอน");

  const pseudocodeLines = [
    { code: "BEGIN", indent: 0 },
    { code: `count = ${isRunning ? count : startCount}  (ตัวนับสะสม)`, indent: 1 },
    { code: `WHILE count < 5 DO  (ตรวจสอบ: ${isRunning ? `${count} < 5` : `count < 5`})`, indent: 1 },
    { code: `  PRINT count`, indent: 2 },
    { code: `  count = count + 1  (ค่าใหม่ = ${isRunning ? count + 1 : 'count + 1'})`, indent: 2 },
    { code: "END WHILE", indent: 1 },
    { code: "END", indent: 0 }
  ];

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    setCount(startCount);
    setCurrentLine(0);
    setExplanation("เริ่มต้นโปรแกรมด้วยคำสั่ง BEGIN");

    let currentVal = startCount;
    const steps = [];

    // Pre-calculate steps for line-by-line visualization
    steps.push({ line: 0, val: currentVal, exp: "เริ่มประกาศเริ่มต้นโครงสร้างหลัก" });
    steps.push({ line: 1, val: currentVal, exp: `กำหนดค่าเริ่มต้นตัวสะสม: count = ${currentVal}` });

    while (currentVal < 5) {
      steps.push({ 
        line: 2, 
        val: currentVal, 
        exp: `ทดสอบตรวจสอบเงื่อนไขลูป: count < 5 หรือไม่? (${currentVal} < 5) ผลตรรกะคือ: จริง (True)` 
      });
      steps.push({ 
        line: 3, 
        val: currentVal, 
        exp: `เงื่อนไขเป็นจริง ทำตามคำสั่งในลูป: แสดงค่าตัวเลข ${currentVal} ออกทางจอภาพ`, 
        out: currentVal.toString() 
      });
      const nextVal = currentVal + 1;
      steps.push({ 
        line: 4, 
        val: currentVal, 
        exp: `คำนวณสะสมเพิ่มค่าตัวนับ: count = count + 1 (${currentVal} + 1 = ${nextVal})` 
      });
      currentVal = nextVal;
    }

    steps.push({ 
      line: 2, 
      val: currentVal, 
      exp: `ทดสอบตรวจสอบเงื่อนไขลูป: count < 5 หรือไม่? (${currentVal} < 5) ผลตรรกะคือ: เท็จ (False) เตรียมข้ามบล็อกลูป` 
    });
    steps.push({ line: 5, val: currentVal, exp: "สิ้นสุดโครงสร้างลูปวนซ้ำ (END WHILE)" });
    steps.push({ line: 6, val: currentVal, exp: "สิ้นสุดขั้นตอนอัลกอริทึมวนรอบสมบูรณ์" });

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        const step = steps[i];
        setCurrentLine(step.line);
        setCount(step.val);
        setExplanation(step.exp);
        if (step.out) {
          setConsoleOutput(prev => [...prev, step.out]);
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
          <Activity className="w-3.5 h-3.5" /> ลูปควบคุมด้วยเงื่อนไข
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-indigo-600" />
          การวนซ้ำแบบ WHILE LOOP
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          โครงสร้างการวนซ้ำแบบ **WHILE LOOP** จะทำการตรวจสอบค่าความจริงเงื่อนไขตรรกะก่อนการประมวลผลคำสั่งย่อยในแต่ละรอบ (Pre-test Loop) 
          หากเงื่อนไขเป็นจริง (True) โปรแกรมจะเข้าไปทำตามคำสั่งในบล็อกลูป และวนกลับไปตรวจสอบเงื่อนไขใหม่เรื่อย ๆ 
          ลูปแบบนี้เหมาะสำหรับกรณีที่ **ไม่ทราบจำนวนรอบการวนซ้ำที่แน่นอนล่วงหน้า**
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controls & Inputs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                กำหนดจุดเริ่มต้นของตัวนับ (count):
              </label>
              
              <div className="flex gap-3 mb-4">
                {[0, 2, 4, 6].map((val) => (
                  <button
                    key={val}
                    disabled={isRunning}
                    onClick={() => {
                      setStartCount(val);
                      setExplanation(`ตั้งต้นตัวนับไว้ที่ ${val} พร้อมตรวจเงื่อนไขด่านแรก`);
                      setCurrentLine(-1);
                      setConsoleOutput([]);
                    }}
                    className={`flex-1 py-2.5 rounded-xl font-mono font-bold text-sm transition-all active:scale-98 ${
                      startCount === val
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
                <span>ลูปจะรันทำงานวนรอบจนกว่าตัวนับสะสมจะมีค่าตั้งแต่ 5 ขึ้นไป</span>
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
                <Play className="w-3.5 h-3.5" />
                <span>{isRunning ? 'กำลังจำลองเงื่อนไขลูป...' : 'เริ่มจำลองขั้นตอน (Run)'}</span>
              </button>
            </div>
          </div>

          {/* Live Trace Workspace */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> while_loop_workspace.txt
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
                <span className="font-bold text-indigo-300 block mb-0.5">สถานะตัวแปรและข้อมูลลูป:</span>
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
// CARD 2: การวนซ้ำแบบ FOR LOOP (Count-Controlled)
// ============================================================================

const ForLoopCard = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [indexVal, setIndexVal] = useState(1);

  const pseudocodeLines = [
    { code: "BEGIN", indent: 0, stepId: 0 },
    { code: "FOR i = 1 TO 5 STEP 1 DO", indent: 1, stepId: 1 },
    { code: "  PRINT i", indent: 2, stepId: 2 },
    { code: "END FOR", indent: 1, stepId: 3 },
    { code: "END", indent: 0, stepId: 4 }
  ];

  const handleStep = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);
    setCurrentStep(0);

    const steps = [
      { step: 0, idx: 1, log: null },
      { step: 1, idx: 1, log: null },
      { step: 2, idx: 1, log: "1" },
      { step: 1, idx: 2, log: null },
      { step: 2, idx: 2, log: "2" },
      { step: 1, idx: 3, log: null },
      { step: 2, idx: 3, log: "3" },
      { step: 1, idx: 4, log: null },
      { step: 2, idx: 4, log: "4" },
      { step: 1, idx: 5, log: null },
      { step: 2, idx: 5, log: "5" },
      { step: 3, idx: 5, log: null },
      { step: 4, idx: 5, log: null }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setCurrentStep(steps[i].step);
        setIndexVal(steps[i].idx);
        if (steps[i].log) {
          setConsoleLogs(prev => [...prev, steps[i].log]);
        }
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 900);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-cyan-50 text-cyan-600 border border-cyan-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <Layers className="w-3.5 h-3.5" /> ลูปควบคุมด้วยจำนวนรอบ
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Database className="w-7 h-7 text-cyan-600" />
          การวนซ้ำแบบ FOR LOOP
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          โครงสร้างการวนซ้ำแบบ **FOR LOOP** ถูกสร้างขึ้นเพื่อ **กำหนดรอบการทำงานที่ชัดเจนแน่นอน** ล่วงหน้า 
          โดยระบุตัวแปรควบคุมค่าดัชนี (Index) ค่าเริ่มต้น (Start) จุดเป้าหมายสูงสุด (To) และระยะกระโดดเดินหน้า (Step) 
          ระบบจะอัปเดตและเช็คค่ารอบอัตโนมัติจนกระทั่งดัชนีครบระยะรอบ
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Step visual graphics */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex-1 flex flex-col justify-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                ดัชนีรอบและเม็ดกระดุมจำลอง (Step Beads Indicator)
              </span>

              <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <span className="text-xs font-bold text-slate-600">รอบตัวแปร (i):</span>
                <span className="bg-cyan-50 text-cyan-600 font-mono font-bold text-sm px-3.5 py-1.5 rounded-xl border border-cyan-100">
                  i = {indexVal}
                </span>
              </div>

              {/* Loop Beads visualization */}
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((item) => {
                  const isPassed = isRunning && indexVal >= item;
                  const isCurrent = isRunning && indexVal === item && currentStep === 2;
                  return (
                    <div 
                      key={item}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs border transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-cyan-500 text-white border-cyan-400 scale-110 shadow-lg shadow-cyan-500/20'
                          : isPassed 
                            ? 'bg-cyan-100 text-cyan-700 border-cyan-200'
                            : 'bg-white text-slate-400 border-slate-200'
                      }`}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terminal Screen Console */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 pb-1.5 border-b border-slate-800">
                  Console Output Window
                </span>
                <div className="font-mono text-sm leading-relaxed text-cyan-400 flex flex-wrap gap-2">
                  {consoleLogs.length === 0 ? (
                    <span className="text-slate-600 italic text-xs select-none">
                      [ ไม่มีข้อความแสดงผลออกทางจอภาพ ]
                    </span>
                  ) : (
                    consoleLogs.map((log, idx) => (
                      <span key={idx} className="bg-cyan-900/40 px-2.5 py-1 rounded-lg border border-cyan-800/60 font-bold text-xs">
                        {log}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <button
                disabled={isRunning}
                onClick={handleStep}
                className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-md shadow-cyan-600/10 flex items-center justify-center gap-2 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isRunning ? 'ระบบกำลังวนรอบอัตโนมัติ...' : 'เริ่มจำลองขั้นตอน (Run)'}</span>
              </button>
            </div>
          </div>

          {/* Live Trace Workspace */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> for_loop_workspace.txt
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1">
                {pseudocodeLines.map((line, idx) => {
                  const isActive = isRunning && currentStep === line.stepId;
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

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-4 rounded-xl">
              <span className="font-bold text-cyan-300 block mb-1">กลไกอัตโนมัติ:</span>
              <span>ในลูป FOR ดัชนีรอบจะถูกเพิ่มขึ้นทีละ 1 (STEP 1) และเช็คจุดสิ้นสุดอย่างปลอดภัย โดยนักเรียนไม่ต้องทำการเขียนอัปเดตตัวสะสมเอง</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 3: การกำหนดจุดสิ้นสุดการวนซ้ำ (Sentinel Value / Termination)
// ============================================================================

const SentinelCard = () => {
  const [numInput, setNumInput] = useState('');
  const [numList, setNumList] = useState([10, 20]);
  const [totalSum, setTotalSum] = useState(30);
  const [activeLine, setActiveLine] = useState(-1);
  const [isTerminated, setIsTerminated] = useState(false);
  const [explanation, setExplanation] = useState("ป้อนตัวเลขบวกเพื่อทดสอบ หรือพิมพ์ -1 เพื่อสั่งจบลูป");

  const pseudocodeLines = [
    { id: 0, code: "BEGIN", indent: 0 },
    { id: 1, code: "total = 0  (สะสมเริ่มต้น)", indent: 1 },
    { id: 2, code: "READ num", indent: 1 },
    { id: 3, code: `WHILE num != -1 DO  (ค่าเข้าตรวจ = ${isTerminated ? '-1' : numInput || '?'})`, indent: 1 },
    { id: 4, code: `  total = total + num  (ยอดรวมสะสม = ${totalSum})`, indent: 2 },
    { id: 5, code: "  READ num", indent: 2 },
    { id: 6, code: "END WHILE", indent: 1 },
    { id: 7, code: "PRINT total", indent: 1 },
    { id: 8, code: "END", indent: 0 }
  ];

  const handleAddNumber = (e) => {
    e.preventDefault();
    const val = parseInt(numInput);
    if (isNaN(val)) return;

    if (val === -1) {
      setIsTerminated(true);
      setActiveLine(3); // Highlights checks line
      setExplanation("ตรวจจับได้ค่าสัญญาณ Sentinel (-1) เงื่อนไข WHILE num != -1 เป็นเท็จ ข้ามออกทันที");
      
      setTimeout(() => {
        setActiveLine(7); // PRINT total
        setExplanation(`ประมวลผลคำสั่งหลังลูป: แสดงยอดผลรวมสะสมรวมทั้งหมดคือ: ${totalSum}`);
      }, 1200);

      setTimeout(() => {
        setActiveLine(8); // END
        setExplanation("สิ้นสุดขั้นตอนประมวลผลอัลกอริทึมอย่างสมบูรณ์");
      }, 2400);

      setNumInput('');
      return;
    }

    if (val < 0) {
      alert("กรุณาป้อนจำนวนเต็มบวก หรือค่า -1 เพื่อจบลูปเท่านั้น");
      return;
    }

    // Standard valid number addition flow
    setNumList(prev => [...prev, val]);
    setTotalSum(prev => prev + val);
    setNumInput('');

    setActiveLine(4); // total = total + num
    setExplanation(`รับค่า ${val} ทำการคำนวณบวกสะสมเข้าตัวแปร: total = total + ${val}`);

    setTimeout(() => {
      setActiveLine(5); // READ num
      setExplanation("หยุดพักรออ่านรับค่าข้อมูลตัวแปรใหม่จากคีย์บอร์ดในสเต็ปถัดไป");
    }, 1000);
  };

  const handleReset = () => {
    setNumList([]);
    setTotalSum(0);
    setNumInput('');
    setIsTerminated(false);
    setActiveLine(-1);
    setExplanation("รีเซ็ตระบบสะสมเริ่มต้นใหม่เรียบร้อยแล้ว");
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-purple-50 text-purple-600 border border-purple-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" /> จุดสิ้นสุดและค่าเฝ้าระวัง
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Scale className="w-7 h-7 text-purple-600" />
          การกำหนดจุดสิ้นสุดลูปด้วย Sentinel Value
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          สำหรับการประมวลผลลูปที่ไม่ทราบจำนวนรอบจำกัดแน่นอน นิยมใช้ **ค่าเฝ้าระวัง (Sentinel Value)** หรือค่าพิเศษเฉพาะเพื่อส่งสัญญาณหยุดลูป 
          ตัวอย่างเช่น การบวกสะสมราคาสินค้าในตะกร้าช็อปปิ้งไปเรื่อย ๆ และให้ผู้ใช้พิมพ์ตัวเลขเฉพาะอย่าง `-1` เพื่อแจ้งเตือนว่าการซื้อของเสร็จสมบูรณ์ 
          โดยที่ตัวโปรแกรมต้องข้ามและ **ไม่นำเอาค่า Sentinel มาร่วมคำนวณสะสม**
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controller & Inputs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                ป้อนตัวเลขสะสมเข้าระบบ (num):
              </span>

              <form onSubmit={handleAddNumber} className="flex gap-3 mb-4">
                <input 
                  type="number"
                  disabled={isTerminated}
                  value={numInput}
                  onChange={(e) => setNumInput(e.target.value)}
                  placeholder="ป้อนตัวเลขบวก หรือ -1"
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-mono text-sm"
                />
                <button
                  type="submit"
                  disabled={isTerminated || !numInput}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 rounded-xl text-xs active:scale-98 transition-all disabled:opacity-50"
                >
                  ป้อนข้อมูล
                </button>
              </form>

              {/* Number bag visual */}
              <div className="mt-4">
                <span className="block text-[10px] text-slate-400 font-bold uppercase mb-2">กล่องรายการสะสมปัจจุบัน:</span>
                <div className="flex flex-wrap gap-1.5 min-h-[40px] bg-white p-3 rounded-xl border border-slate-200/60">
                  {numList.length === 0 ? (
                    <span className="text-[10px] text-slate-400 italic">ว่างเปล่า</span>
                  ) : (
                    numList.map((item, idx) => (
                      <span key={idx} className="bg-purple-50 border border-purple-100 text-purple-700 font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg">
                        {item}
                      </span>
                    ))
                  )}
                  {isTerminated && (
                    <span className="bg-rose-500 text-white font-mono font-bold text-xs px-2 py-0.5 rounded-lg animate-pulse">
                      -1 (Sentinel!)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Terminal Screen Console */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 pb-1.5 border-b border-slate-800 flex justify-between items-center">
                  <span>Shopping Cart Output</span>
                  <button 
                    onClick={handleReset}
                    className="text-[8px] text-purple-400 hover:text-purple-300 font-bold tracking-normal underline cursor-pointer"
                  >
                    RESET ALL
                  </button>
                </span>
                <div className="font-mono text-sm leading-relaxed text-purple-400">
                  <div className="text-xs text-slate-500">&gt; สแตนด์บายรับข้อมูล...</div>
                  {numList.map((item, idx) => (
                    <div key={idx} className="text-xs text-slate-400">&gt; เพิ่มข้อมูลยอด: {item}</div>
                  ))}
                  {isTerminated && (
                    <>
                      <div className="text-xs text-rose-400">&gt; ตรวจจับ Sentinel: -1</div>
                      <div className="text-sm text-emerald-400 font-bold mt-1">&gt; ยอดรวมสุทธิ: {totalSum}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Live Trace Workspace */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> sentinel_workspace.txt
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1">
                {pseudocodeLines.map((line, idx) => {
                  const isActive = activeLine === line.id;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start rounded px-2.5 py-0.5 transition-all ${
                        isActive 
                          ? 'bg-purple-500/20 border-l-4 border-purple-500 pl-1.5 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold'
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
              <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-purple-300 block mb-0.5">สถานะปัจจุบัน:</span>
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
// INTERACTIVE PLAYGROUND: ROBOT MINER & BATTERY LOOP SIMULATOR
// ============================================================================

const RobotMinerSimulator = () => {
  const [loopType, setLoopType] = useState('WHILE');
  const [initialBattery, setInitialBattery] = useState(5);
  const [hazard, setHazard] = useState(false);
  
  // Running simulation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRobotStep, setCurrentRobotStep] = useState(-1);
  const [batteryLeft, setBatteryLeft] = useState(5);
  const [oresMined, setOresMined] = useState(0);
  const [activeLine, setActiveLine] = useState(-1);
  const [simLogs, setSimLogs] = useState([]);
  const [simStatus, setSimStatus] = useState("สแตนด์บายจำลอง");

  // Pseudocode schemas based on loop types
  const whileLoopCode = [
    { id: 0, code: "BEGIN", indent: 0 },
    { id: 1, code: `ores_mined = 0, battery = ${isRunningState() ? batteryLeft : initialBattery}`, indent: 1 },
    { id: 2, code: `WHILE battery > 0 AND hazard == FALSE DO`, indent: 1 },
    { id: 3, code: "  robot.move_forward()", indent: 2 },
    { id: 4, code: "  ores_mined = ores_mined + 1", indent: 2 },
    { id: 5, code: "  battery = battery - 1", indent: 2 },
    { id: 6, code: `  IF robot.detect_hazard() THEN`, indent: 2 },
    { id: 7, code: "    hazard = TRUE", indent: 3 },
    { id: 8, code: "  END IF", indent: 2 },
    { id: 9, code: "END WHILE", indent: 1 },
    { id: 10, code: "PRINT ores_mined", indent: 1 },
    { id: 11, code: "END", indent: 0 }
  ];

  const forLoopCode = [
    { id: 0, code: "BEGIN", indent: 0 },
    { id: 1, code: `ores_mined = 0, battery = ${isRunningState() ? batteryLeft : initialBattery}`, indent: 1 },
    { id: 2, code: "FOR round = 1 TO 5 STEP 1 DO", indent: 1 },
    { id: 3, code: "  IF battery == 0 OR hazard == TRUE THEN", indent: 2 },
    { id: 4, code: "    BREAK  (ตัดหลุดลูปทันที)", indent: 3 },
    { id: 5, code: "  END IF", indent: 2 },
    { id: 6, code: "  robot.move_forward()", indent: 2 },
    { id: 7, code: "  ores_mined = ores_mined + 1", indent: 2 },
    { id: 8, code: "  battery = battery - 1", indent: 2 },
    { id: 9, code: "END FOR", indent: 1 },
    { id: 10, code: "PRINT ores_mined", indent: 1 },
    { id: 11, code: "END", indent: 0 }
  ];

  function isRunningState() {
    return isPlaying || currentRobotStep >= 0;
  }

  // Pre-calculate full path cycles for execution tracing
  const generateSimulationSteps = () => {
    const list = [];
    let currentBattery = initialBattery;
    let currentMined = 0;
    let currentHazard = false;

    list.push({ line: 0, bat: currentBattery, mined: currentMined, haz: false, exp: "หุ่นยนต์สตาร์ทระบบหลัก", state: "START" });
    list.push({ line: 1, bat: currentBattery, mined: currentMined, haz: false, exp: `เตรียมตัวแปร: ores_mined = 0, battery = ${currentBattery}`, state: "SETUP" });

    if (loopType === 'WHILE') {
      let cycle = 1;
      while (currentBattery > 0 && !currentHazard) {
        list.push({ 
          line: 2, 
          bat: currentBattery, 
          mined: currentMined, 
          haz: currentHazard, 
          exp: `รอบที่ ${cycle}: ตรวจเงื่อนไข battery > 0 (${currentBattery} > 0) AND hazard == FALSE (${currentHazard ? 'จริง' : 'เท็จ'}) : ผ่านเกณฑ์`, 
          state: "CHECK_TRUE" 
        });
        
        list.push({ 
          line: 3, 
          bat: currentBattery, 
          mined: currentMined, 
          haz: currentHazard, 
          exp: `หุ่นยนต์เคลื่อนตัวไปข้างหน้าทีละรอบราง`, 
          state: "MOVE",
          stepMarker: cycle - 1
        });
        
        currentMined++;
        list.push({ 
          line: 4, 
          bat: currentBattery, 
          mined: currentMined, 
          haz: currentHazard, 
          exp: `ขุดแร่แร่ทองคำสำเร็จสะสม: ores_mined = ${currentMined}`, 
          state: "MINE" 
        });
        
        currentBattery--;
        list.push({ 
          line: 5, 
          bat: currentBattery, 
          mined: currentMined, 
          haz: currentHazard, 
          exp: `สูญเสียพลังงานขุด 1 หน่วย คงเหลือแบตเตอรี่: ${currentBattery}`, 
          state: "DRAIN" 
        });

        // Trigger hazard sentinel check at cycle 3 (middle of track)
        if (hazard && cycle === 3) {
          currentHazard = true;
          list.push({ line: 6, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "ตรวจพบกล่องสัญญาณสิ่งกีดขวาง (Hazard Detected!)", state: "HAZARD_HIT" });
          list.push({ line: 7, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "ตั้งค่าตัวแปรด่านตรวจจับ: hazard = TRUE", state: "HAZARD_SET" });
          list.push({ line: 8, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "ปิดบล็อกป้องกันอันตราย", state: "HAZARD_END" });
        } else {
          list.push({ line: 6, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "ตรวจจับพิกัดสิ่งกีดขวาง: ไม่พบพื้นที่อันตราย ปลอดภัย", state: "HAZARD_SAFE" });
        }
        
        cycle++;
      }

      // Exit checks
      list.push({ 
        line: 2, 
        bat: currentBattery, 
        mined: currentMined, 
        haz: currentHazard, 
        exp: `ตรวจประเมินเงื่อนไขลูป: battery = ${currentBattery}, hazard = ${currentHazard ? 'TRUE' : 'FALSE'} ผลลัพธ์: ล้มเหลว (False)`, 
        state: "CHECK_FALSE" 
      });
      list.push({ line: 9, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "หลุดออกจากบล็อกลูปวนซ้ำ (END WHILE)", state: "OUT_LOOP" });
      list.push({ line: 10, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: `พิมพ์ผลลัพธ์จำนวนแร่ที่ขุดได้สุทธิออกจอภาพ: ${currentMined} ก้อน`, out: `ผลผลิตรวม: ${currentMined} Ores`, state: "PRINT" });
      list.push({ line: 11, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "สิ้นสุดขั้นตอนอัลกอริทึมหุ่นยนต์ขุดเหมือง", state: "END" });

    } else {
      // FOR Loop logic tracing
      for (let round = 1; round <= 5; round++) {
        list.push({ 
          line: 2, 
          bat: currentBattery, 
          mined: currentMined, 
          haz: currentHazard, 
          exp: `รันรอบลูป FOR รอบที่ ${round} จาก 5 รอบ`, 
          state: "FOR_ROUND" 
        });

        const isBreak = currentBattery === 0 || currentHazard;
        list.push({ 
          line: 3, 
          bat: currentBattery, 
          mined: currentMined, 
          haz: currentHazard, 
          exp: `เช็คเงื่อนไขหยุดก่อนรัน: battery == 0 (${currentBattery === 0}) OR hazard == TRUE (${currentHazard}) -> ${isBreak ? 'หลุดลูป' : 'ทำต่อ'}`, 
          state: "BREAK_CHECK" 
        });

        if (isBreak) {
          list.push({ line: 4, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "ตรวจพบเงื่อนไขการตัดลูป! สั่งดึงคีย์เวิร์ด BREAK ทันที", state: "BREAK_HIT" });
          break;
        }

        list.push({ 
          line: 6, 
          bat: currentBattery, 
          mined: currentMined, 
          haz: currentHazard, 
          exp: "หุ่นยนต์เดินหน้าเข้าสู่พิกัดราง", 
          state: "MOVE",
          stepMarker: round - 1
        });
        
        currentMined++;
        list.push({ line: 7, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: `ขุดเจาะ Ores ทองคำชิ้นใหม่สำเร็จ: total = ${currentMined}`, state: "MINE" });
        
        currentBattery--;
        list.push({ line: 8, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: `ใช้แบตเตอรี่คงเหลือ: ${currentBattery}`, state: "DRAIN" });

        if (hazard && round === 3) {
          currentHazard = true;
        }
      }

      list.push({ line: 9, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "สิ้นสุดกลุ่มคำสั่งลูป FOR", state: "OUT_LOOP" });
      list.push({ line: 10, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: `พิมพ์ผลลัพธ์ผลผลิตขุดได้ปลายทาง: ${currentMined} ก้อน`, out: `ผลผลิตรวม: ${currentMined} Ores`, state: "PRINT" });
      list.push({ line: 11, bat: currentBattery, mined: currentMined, haz: currentHazard, exp: "สิ้นสุดขั้นตอนอัลกอริทึมวนรอบ FOR สมบูรณ์", state: "END" });
    }

    return list;
  };

  const startSimulator = () => {
    setIsPlaying(true);
    setOresMined(0);
    setBatteryLeft(initialBattery);
    setSimLogs([]);
    setCurrentRobotStep(-1);
    
    const steps = generateSimulationSteps();
    let idx = 0;
    
    const clock = setInterval(() => {
      if (idx < steps.length) {
        const item = steps[idx];
        setActiveLine(item.line);
        setBatteryLeft(item.bat);
        setOresMined(item.mined);
        setSimStatus(item.exp);
        
        if (item.stepMarker !== undefined) {
          setCurrentRobotStep(item.stepMarker);
        }
        if (item.out) {
          setSimLogs(prev => [...prev, item.out]);
        }
        idx++;
      } else {
        clearInterval(clock);
        setIsPlaying(false);
      }
    }, 1000);
  };

  const resetAllSim = () => {
    setIsPlaying(false);
    setCurrentRobotStep(-1);
    setOresMined(0);
    setBatteryLeft(initialBattery);
    setActiveLine(-1);
    setSimLogs([]);
    setSimStatus("รีเซ็ตระบบ จำลองพร้อมทดสอบ");
  };

  const currentCodeSet = loopType === 'WHILE' ? whileLoopCode : forLoopCode;

  return (
    <div className="bg-[#1e293b] rounded-[2.5rem] p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden group">
      {/* Ambience Layer */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-bl-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-8">
        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Gamification Zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2">
          <Cpu className="w-8 h-8 text-cyan-400" />
          หุ่นยนต์ขุดแร่และวงลูปพลังงาน (Robot Miner Simulator)
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-sm">
          ออกแบบภารกิจให้หุ่นยนต์เหมืองแร่ เปรียบเทียบประสิทธิภาพการเขียนระหว่าง WHILE loop และ FOR loop 
          พร้อมกลไกสั่งหลุดลูปฉุกเฉินเมื่อพลังงานดับหรือมีสัญญาณเตือนอันตราย
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Inputs (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-5 flex-1 flex flex-col justify-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">
              MINER MISSION CONTROLLER
            </span>

            {/* Loop Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                เลือกรูปแบบลูปในการขุด (Loop Type):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['WHILE', 'FOR'].map((type) => (
                  <button
                    key={type}
                    disabled={isPlaying}
                    onClick={() => {
                      setLoopType(type);
                      resetAllSim();
                    }}
                    className={`py-2 rounded-xl font-mono font-bold text-xs transition-all active:scale-98 ${
                      loopType === type
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                        : 'bg-slate-800 text-slate-400 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {type} LOOP
                  </button>
                ))}
              </div>
            </div>

            {/* Initial Battery */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1 text-slate-300">
                  <Battery className="w-4 h-4 text-cyan-400" /> พลังงานตั้งต้น (Battery)
                </span>
                <span className="font-bold text-white font-mono">{initialBattery} รอบ</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                disabled={isPlaying}
                value={initialBattery}
                onChange={(e) => {
                  setInitialBattery(parseInt(e.target.value));
                  setBatteryLeft(parseInt(e.target.value));
                }}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Hazard Sentinel Toggle */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${hazard ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-500'}`}>
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs text-white">สิ่งกีดขวาง/อันตราย</strong>
                  <span className="text-[9px] text-slate-500">จำลองค่าตรวจจับ Sentinel</span>
                </div>
              </div>
              <button
                type="button"
                disabled={isPlaying}
                onClick={() => setHazard(!hazard)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  hazard ? 'bg-rose-500' : 'bg-slate-800'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-all ${
                  hazard ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle column: Code Editor live display (Span 5) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-inner">
          <div>
            <span className="block text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> loop_mining.txt
            </span>

            <div className="font-mono text-[10px] md:text-xs leading-loose text-slate-300 space-y-1">
              {currentCodeSet.map((line, idx) => {
                const isLineActive = activeLine === line.id;
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start rounded px-2.5 py-0.5 transition-all ${
                      isLineActive
                        ? 'bg-cyan-500/25 border-l-4 border-cyan-500 pl-1.5 text-cyan-200 font-bold shadow-[0_0_12px_rgba(6,182,212,0.15)] animate-pulse'
                        : 'border-l-4 border-transparent opacity-35'
                    }`}
                  >
                    <span className="w-5 text-[8px] text-slate-600 text-right select-none font-bold mr-3 mt-0.5">{idx + 1}</span>
                    <span style={{ paddingLeft: `${line.indent * 16}px` }}>{line.code}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] text-slate-400 leading-relaxed flex gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <strong className="block text-cyan-300 mb-0.5">เหตุการณ์จำลองสด:</strong>
              {simStatus}
            </div>
          </div>
        </div>

        {/* Right column: Physical Miner Rail track (Span 3) */}
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-5 border border-slate-800 flex flex-col justify-between shadow-inner relative overflow-hidden">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
            PHYSICAL MINE TRACK
          </span>

          <div className="flex-1 flex flex-col justify-between py-2">
            {/* SVG Track Graphic */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex items-center justify-center min-h-[160px]">
              <svg viewBox="0 0 100 240" className="w-full max-w-[120px] h-auto">
                {/* Rails Track */}
                <line x1="35" y1="10" x2="35" y2="230" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="65" y1="10" x2="65" y2="230" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                
                {/* Track ties */}
                {[20, 60, 100, 140, 180, 220].map((y) => (
                  <line key={y} x1="30" y1={y} x2="70" y2={y} stroke="#334155" strokeWidth="3" />
                ))}

                {/* Ore node items */}
                {[40, 80, 120, 160, 200].map((y, idx) => {
                  const isMined = currentRobotStep >= idx;
                  return (
                    <g key={y}>
                      <circle 
                        cx="50" cy={y} r="8" 
                        fill={isMined ? '#334155' : '#f59e0b'} 
                        stroke={isMined ? '#1e293b' : '#fbbf24'} 
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />
                      {!isMined && <path d={`M50 ${y-4} L53 ${y+3} L46 ${y+3} Z`} fill="#d97706" />}
                    </g>
                  );
                })}

                {/* Hazard block indicator */}
                {hazard && (
                  <g transform="translate(18, 110)">
                    <polygon points="12,0 24,20 0,20" fill="#ef4444" stroke="#f87171" strokeWidth="1" />
                    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">!</text>
                  </g>
                )}

                {/* Miner Robot node */}
                <g 
                  transform={`translate(32, ${20 + (currentRobotStep + 1) * 40})`} 
                  className="transition-all duration-500 ease-out"
                >
                  <rect x="2" y="2" width="32" height="26" rx="4" fill="#06b6d4" stroke="#22d3ee" strokeWidth="1.5" />
                  <circle cx="10" cy="15" r="3" fill="white" />
                  <circle cx="26" cy="15" r="3" fill="white" />
                  <rect x="14" y="20" width="8" height="3" rx="1.5" fill="#1e293b" />
                  {/* Wheel designs */}
                  <circle cx="5" cy="27" r="3" fill="#0f172a" />
                  <circle cx="31" cy="27" r="3" fill="#0f172a" />
                </g>
              </svg>
            </div>

            {/* Virtual Dashboard Counters */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[8px] text-slate-500 font-bold block uppercase mb-1">แร่ขุดได้:</span>
                <span className="font-bold text-yellow-400 font-mono flex items-center justify-center gap-1">
                  <Coins className="w-3.5 h-3.5 shrink-0" /> {oresMined} ก้อน
                </span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[8px] text-slate-500 font-bold block uppercase mb-1">แบตเตอรี่:</span>
                <span className="font-bold text-cyan-400 font-mono">
                  {batteryLeft} / {initialBattery}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {!isPlaying && currentRobotStep === -1 ? (
              <button
                onClick={startSimulator}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all active:scale-95 text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>จำลองการขุด</span>
              </button>
            ) : (
              <button
                onClick={resetAllSim}
                className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl transition-all active:scale-95 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ตขอบเขต</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN EXPORT COMPONENT
// ============================================================================

export default function py2_6() {
  const teacherTaskContent = `ให้นักเรียนเขียนรหัสเทียม (Pseudocode) จากสถานการณ์แก้ปัญหาต่อไปนี้ลงในสมุดบันทึก:

โจทย์: ระบบตรวจสอบอุณหภูมิโรงเรือนเกษตรอัจฉริยะ (Greenhouse Smart Sensor Loop)
1. กำหนดอุณหภูมิวิกฤตความปลอดภัยสูงสุดคือ 35 องศาเซลเซียส
2. ประกาศตัวแปรรับค่าตัวนับเริ่มต้น counter = 1
3. เขียนลูปวนซ้ำทำงานวนรอบ 5 ครั้ง (ลูป counter <= 5) เพื่อเช็คสภาพโรงเรือน:
   - ทำการอ่านอุณหภูมิปัจจุบัน (READ temp)
   - หากอุณหภูมิ (temp) มากกว่า 35 องศาเซลเซียส ให้พิมพ์เตือนภัย "Critical Alert: Coolers ON!" และทำการตัดจบออกนอกลูปวนซ้ำทันที (BREAK)
   - หากปกติ ให้แสดงข้อความรอบ "Sensor Round [counter]: Normal"
   - เพิ่มยอดตัวสะสมรอบขึ้นครั้งละ 1 (counter = counter + 1)

(คำชี้แนะ: พิจารณาเลือกใช้คำสั่งภาษาอังกฤษคีย์เวิร์ดตัวพิมพ์ใหญ่, BEGIN-END, เคาะย่อหน้าบล็อก และโครงสร้างการหยุดลูปฉุกเฉิน BREAK ให้ถูกต้องสมบูรณ์)`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-cyan-100 selection:text-cyan-900 relative">
      {/* Ambient background blur layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px] animate-pulse"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        {/* Layer 3 Content Cards */}
        <WhileLoopCard />
        <ForLoopCard />
        <SentinelCard />
        <RobotMinerSimulator />

        {/* Layer 4 Handoff assignment */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.6)" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
