import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Calculator, 
  BookOpen, 
  Percent, 
  Divide, 
  PlusSquare,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  RefreshCw,
  Play,
  RotateCcw,
  Layers,
  ChevronRight,
  TrendingUp,
  Sliders,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

// ============================================================================
// CUSTOM DROPDOWN FOR GAME ZONE
// ============================================================================
const CustomDropdown = ({ value, options, onChange, placeholder = "?", disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block mx-1.5 align-middle">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-xl border-2 font-mono font-bold text-sm transition-all active:scale-95 flex items-center justify-center ${
          value 
            ? 'bg-rose-500/20 border-rose-500 text-rose-300 hover:bg-rose-500/30'
            : 'bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700'
        }`}
      >
        {value || placeholder}
      </button>
      
      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-16 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-50 animate-fade-in font-mono">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-center py-2 rounded-lg text-sm font-bold hover:bg-rose-600 hover:text-white transition-colors block ${
                  value === opt ? 'text-rose-400 font-bold bg-rose-500/10' : 'text-slate-300'
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
// CARD 1: 4.3.1 เครื่องหมายคณิตศาสตร์พื้นฐาน (+, -, *, /, //, %, **)
// ============================================================================
const OperatorsOverview = () => {
  const basicOps = [
    { symbol: "+", name: "บวก (Addition)", desc: "นำตัวเลขสองตัวมารวมกัน", ex: "5 + 2", res: "7", color: "bg-blue-50/70 border-blue-200 text-blue-700" },
    { symbol: "-", name: "ลบ (Subtraction)", desc: "หักล้างตัวเลขตัวหลังออกจากตัวแรก", ex: "5 - 2", res: "3", color: "bg-indigo-50/70 border-indigo-200 text-indigo-700" },
    { symbol: "*", name: "คูณ (Multiplication)", desc: "เพิ่มจำนวนของตัวเลขขึ้นตามตัวคูณ", ex: "5 * 2", res: "10", color: "bg-violet-50/70 border-violet-200 text-violet-700" },
    { symbol: "/", name: "หารปกติ (Division)", desc: "หารจำนวน ได้ผลลัพธ์เป็นทศนิยมเสมอ", ex: "5 / 2", res: "2.5", color: "bg-fuchsia-50/70 border-fuchsia-200 text-fuchsia-700", notice: "ได้ผลลัพธ์เป็นทศนิยม (Float) เสมอ" }
  ];

  const advancedOps = [
    { symbol: "//", name: "หารปัดเศษทิ้ง (Floor Division)", desc: "หารปกติ แต่ตัดเศษทศนิยมออกทั้งหมด เหลือเฉพาะส่วนจำนวนเต็ม", ex: "5 // 2", res: "2", color: "bg-rose-50/70 border-rose-200 text-rose-700", tip: "มีประโยชน์มากในการแบ่งกลุ่มจำนวนเต็มหรือตัดรอบเวลา" },
    { symbol: "%", name: "หารเอาเศษ (Modulo)", desc: "หาเศษที่เหลือจากการแบ่งกลุ่มจำนวนเต็มจนหมด", ex: "5 % 2", res: "1", color: "bg-pink-50/70 border-pink-200 text-pink-700", tip: "ใช้ตรวจสอบเลขคู่/เลขคี่ หรือตรวจสอบการหารลงตัว" },
    { symbol: "**", name: "ยกกำลัง (Exponentiation)", desc: "คูณตัวเลขตัวแรกซ้ำตามจำนวนครั้งของเลขชี้กำลัง", ex: "5 ** 2", res: "25", color: "bg-orange-50/70 border-orange-200 text-orange-700", tip: "เขียนสั้นและเร็วกว่าการเรียกใช้งานโมดูลคณิตศาสตร์" }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5" id="operators-overview-section">
      <div className="absolute top-0 right-0 w-48 h-48 bg-rose-50/60 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4 flex items-center gap-2.5 pb-2 leading-normal">
          <PlusSquare className="w-8 h-8 text-rose-500" />
          เครื่องหมายคณิตศาสตร์พื้นฐานใน Python
        </h4>
        <p className="text-zinc-600 text-[15px] leading-relaxed mb-8">
          ภาษา Python ประกอบไปด้วยตัวดำเนินการทางคณิตศาสตร์ 7 เครื่องหมายหลัก โดยแบ่งออกเป็นกลุ่มเครื่องหมายพื้นฐานทั่วไปที่คุ้นเคย และกลุ่มเครื่องหมายคำนวณขั้นสูงที่ช่วยแก้ไขปัญหากลไกทางตรรกศาสตร์ได้อย่างทรงประสิทธิภาพ:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Basic Math */}
          <div className="space-y-4">
            <h5 className="font-bold text-slate-800 text-lg flex items-center gap-2 pl-2 border-l-4 border-blue-500">
              เครื่องหมายคณิตศาสตร์พื้นฐาน
            </h5>
            <div className="space-y-3">
              {basicOps.map((op, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all hover:scale-[1.01] ${op.color}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-mono font-bold text-lg border border-slate-200 text-slate-800">
                      {op.symbol}
                    </span>
                    <div>
                      <strong className="block text-slate-800 text-sm">{op.name}</strong>
                      <span className="text-slate-600 text-xs leading-relaxed block">{op.desc}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <code className="bg-white border border-slate-200/70 px-2 py-1 rounded-lg text-xs font-mono font-bold text-slate-700 block shadow-2xs">
                      {op.ex} &rarr; {op.res}
                    </code>
                    {op.notice && (
                      <span className="text-[9px] font-bold text-rose-500 mt-1 block">
                        *{op.notice}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Advanced Math */}
          <div className="space-y-4">
            <h5 className="font-bold text-slate-800 text-lg flex items-center gap-2 pl-2 border-l-4 border-rose-500">
              เครื่องหมายขั้นสูงเฉพาะเขียนโปรแกรม
            </h5>
            <div className="space-y-3">
              {advancedOps.map((op, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border-2 flex flex-col justify-between transition-all hover:scale-[1.01] ${op.color}`}>
                  <div className="flex items-center justify-between mb-2 gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-mono font-bold text-lg border border-slate-200 text-slate-800">
                        {op.symbol}
                      </span>
                      <div>
                        <strong className="block text-slate-800 text-sm">{op.name}</strong>
                        <span className="text-slate-600 text-xs leading-relaxed block">{op.desc}</span>
                      </div>
                    </div>
                    <code className="bg-white border border-slate-200/70 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-slate-700 shrink-0 shadow-2xs">
                      {op.ex} &rarr; {op.res}
                    </code>
                  </div>
                  <div className="bg-white/70 px-3 py-2 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex gap-2 items-center">
                    <Lightbulb className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span><strong>ประโยชน์หลัก:</strong> {op.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 2: ห้องทดลองคำนวณคณิตศาสตร์ & Visual Modulo/Division Illustrator
// ============================================================================
const MathPlayground = () => {
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(3);
  const [operator, setOperator] = useState('%');
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');

  const operators = [
    { symbol: '+', name: 'บวก (+)', desc: 'นำค่าสองฝั่งมารวมกัน', bg: 'bg-blue-100 border-blue-200 text-blue-600 hover:border-blue-300' },
    { symbol: '-', name: 'ลบ (-)', desc: 'หักล้างค่าตัวหลังออกจากตัวตั้ง', bg: 'bg-indigo-100 border-indigo-200 text-indigo-600 hover:border-indigo-300' },
    { symbol: '*', name: 'คูณ (*)', desc: 'เพิ่มค่าเป็นทวีคูณ', bg: 'bg-violet-100 border-violet-200 text-violet-600 hover:border-violet-300' },
    { symbol: '/', name: 'หารปกติ (/)', desc: 'หารได้คำตอบทศนิยมเสมอ', bg: 'bg-fuchsia-100 border-fuchsia-200 text-fuchsia-600 hover:border-fuchsia-300' },
    { symbol: '//', name: 'หารปัดเศษทิ้ง (//)', desc: 'หารแล้วปัดลงเอาเฉพาะจำนวนเต็ม', bg: 'bg-rose-100 border-rose-200 text-rose-600 hover:border-rose-300' },
    { symbol: '%', name: 'หารเอาเศษ (%)', desc: 'เอาเฉพาะเศษที่ค้างคาจากการหาร', bg: 'bg-pink-100 border-pink-200 text-pink-600 hover:border-pink-300' },
    { symbol: '**', name: 'ยกกำลัง (**)', desc: 'คูณตัวตั้งซ้ำตามจำนวนรอบเลขชี้กำลัง', bg: 'bg-orange-100 border-orange-200 text-orange-600 hover:border-orange-300' }
  ];

  useEffect(() => {
    calculate();
  }, [num1, num2, operator]);

  const calculate = () => {
    setError('');
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult('?');
      return;
    }

    if ((operator === '/' || operator === '//' || operator === '%') && b === 0) {
      setError('ZeroDivisionError: division by zero (ห้ามตัวหารเป็นศูนย์เด็ดขาด!)');
      setResult('Error');
      return;
    }

    let r = 0;
    switch (operator) {
      case '+': r = a + b; break;
      case '-': r = a - b; break;
      case '*': r = a * b; break;
      case '/': r = a / b; break;
      case '//': r = Math.floor(a / b); break;
      case '%': r = a % b; break;
      case '**': r = Math.pow(a, b); break;
      default: r = 0;
    }

    setResult(Number.isInteger(r) ? r : parseFloat(r.toFixed(4)));
  };

  const renderVisualIllustrator = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);
    const isValid = !isNaN(a) && !isNaN(b) && a >= 1 && a <= 20 && b >= 1 && b <= 10;
    
    if (!isValid || (operator !== '%' && operator !== '//' && operator !== '/')) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500 italic text-xs py-8 px-4 text-center">
          <Info className="w-5 h-5 mb-1.5 text-slate-400 opacity-60" />
          <span>ใส่ค่าตัวตั้ง (1 - 20) และตัวหาร (1 - 10) ด้านซ้าย</span>
          <span>และเลือกเครื่องหมาย /, // หรือ % เพื่อแสดงแผนภาพจัดแบ่งเศษเหลือทันที</span>
        </div>
      );
    }

    const fullGroups = Math.floor(a / b);
    const remainder = a % b;

    return (
      <div className="w-full space-y-4 py-1 font-sans">
        <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          # แผนภาพจำลองการจัดแบ่งกลุ่ม (Visual Divider Illustrator)
        </span>

        <div className="flex flex-wrap gap-4 items-start justify-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800 shadow-inner">
          {Array.from({ length: fullGroups }).map((_, gIdx) => (
            <div key={gIdx} className="bg-indigo-500/10 border-2 border-dashed border-indigo-500/40 rounded-xl p-2.5 flex flex-col items-center gap-1.5 transition-all hover:scale-105">
              <span className="text-[8px] font-bold uppercase tracking-wider text-indigo-400">กลุ่มที่ {gIdx + 1}</span>
              <div className="flex gap-1">
                {Array.from({ length: b }).map((_, cIdx) => (
                  <div key={cIdx} className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                ))}
              </div>
            </div>
          ))}

          {remainder > 0 && (
            <div className="bg-rose-500/10 border-2 border-dashed border-rose-500/40 rounded-xl p-2.5 flex flex-col items-center gap-1.5 transition-all hover:scale-105">
              <span className="text-[8px] font-bold uppercase tracking-wider text-rose-400">เศษค้างเหลือ (%)</span>
              <div className="flex gap-1">
                {Array.from({ length: remainder }).map((_, cIdx) => (
                  <div key={cIdx} className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[12px] leading-relaxed text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
          <p className="flex items-center gap-1.5 mb-1.5">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-200">ยอดรวมของทั้งหมด {a} ชิ้น แบ่งกลุ่มละ {b} ชิ้น:</span>
          </p>
          <ul className="pl-6 space-y-1 list-disc text-slate-400">
            <li>แบ่งได้เต็มๆ จำนวน: <strong className="text-indigo-300 font-mono">{fullGroups} กลุ่ม</strong> (ผลลัพธ์ของคีย์คำสั่ง <code className="text-white bg-slate-950 px-1.5 py-0.5 rounded font-mono font-bold text-xs">{a} // {b}</code>)</li>
            <li>จำนวนเศษค้างที่แบ่งต่อไม่ได้: <strong className="text-rose-300 font-mono">{remainder} ชิ้น</strong> (ผลเศษเหลือของคีย์คำสั่ง <code className="text-white bg-slate-950 px-1.5 py-0.5 rounded font-mono font-bold text-xs">{a} % {b}</code>)</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5" id="math-playground-section">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50/60 rounded-br-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4 flex items-center gap-2.5 pb-2 leading-normal">
          <Sliders className="w-8 h-8 text-emerald-500" />
          ห้องปฏิบัติการตัวดำเนินการคณิตศาสตร์ (Math Playground)
        </h4>
        <p className="text-zinc-600 text-[15px] leading-relaxed mb-8">
          ปรับแต่งอินพุตตัวเลขและเปลี่ยนเครื่องหมายเพื่อทดลองคิดผลลัพธ์สไตล์ Python สังเกตผลลัพธ์ที่แตกต่างกันอย่างชัดเจนของ <strong>/</strong>, <strong>//</strong> และ <strong>%</strong>:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Box */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-6 rounded-[2rem] flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-center">
                <div className="flex flex-col items-center gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ตัวตั้ง (a)</label>
                  <input 
                    type="number" 
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    className="w-24 h-14 text-center text-xl font-bold font-mono bg-white border border-slate-300 rounded-2xl focus:border-emerald-600 focus:ring-3 focus:ring-emerald-100 transition-all focus:outline-none"
                  />
                </div>
                
                <div className="text-2xl font-mono font-bold text-slate-400 mt-5 w-10 text-center select-none">
                  {operator}
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ตัวหาร (b)</label>
                  <input 
                    type="number" 
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    className="w-24 h-14 text-center text-xl font-bold font-mono bg-white border border-slate-300 rounded-2xl focus:border-emerald-600 focus:ring-3 focus:ring-emerald-100 transition-all focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {operators.map((op) => (
                  <button
                    key={op.symbol}
                    onClick={() => setOperator(op.symbol)}
                    className={`h-11 rounded-xl font-mono text-sm font-bold border-2 transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                      operator === op.symbol
                        ? `${op.bg.split(' ')[0]} ${op.bg.split(' ')[2]} border-emerald-400 shadow-md scale-105`
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>{op.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl text-emerald-800 text-xs leading-relaxed flex gap-2.5">
              <Lightbulb className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <strong className="block text-emerald-900 text-xs mb-0.5 font-bold">{operators.find(o => o.symbol === operator)?.name}</strong>
                <span>{operators.find(o => o.symbol === operator)?.desc}</span>
              </div>
            </div>
          </div>

          {/* Code & Visual Output Box */}
          <div className="lg:col-span-6 bg-slate-900 rounded-[2rem] p-6 border border-slate-800 flex flex-col justify-between gap-6 shadow-xl">
            <div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2.5 mb-4">
                <span># python variables & output</span>
                <span className="text-emerald-400 font-bold">online console</span>
              </div>

              <div className="font-mono text-sm leading-loose text-slate-300">
                <span className="text-blue-400">a</span> = <span className="text-amber-400">{num1 === '' ? '0' : num1}</span><br />
                <span className="text-blue-400">b</span> = <span className="text-amber-400">{num2 === '' ? '0' : num2}</span><br />
                <span className="text-blue-400">result</span> = <span className="text-blue-400">a</span> <span className="text-emerald-400 font-bold">{operator}</span> <span className="text-blue-400">b</span><br />
                <span className="text-indigo-400">print</span>(<span className="text-blue-400">result</span>)
              </div>
            </div>

            {renderVisualIllustrator()}

            <div className="border-t border-slate-800 pt-4 mt-2">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-2 font-mono">Console printed output:</span>
              {error ? (
                <div className="text-rose-400 font-mono text-xs animate-pulse bg-rose-950/40 p-3.5 rounded-xl border border-rose-900/40">
                  {error}
                </div>
              ) : (
                <div className="text-3xl font-mono font-bold text-emerald-400 bg-black/60 px-5 py-3 rounded-2xl border border-slate-950 inline-block shadow-inner select-all">
                  {result}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 3: 4.3.2 ลำดับความสำคัญของเครื่องหมาย (Operator Precedence Animation)
// ============================================================================
const OperatorPrecedenceCard = () => {
  const [preset, setPreset] = useState(1);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const presetsConfig = {
    1: {
      formula: "2 + 3 * 4",
      steps: [
        {
          expr: "2 + 3 * 4",
          highlight: "3 * 4",
          explain: "สแกนหาตัวดำเนินการที่มีความสำคัญสูงสุด: การคูณ (*) เหนือกว่าการบวก (+) ดังนั้นระบบจึงแยกคำนวณ 3 * 4 ก่อนการบวก"
        },
        {
          expr: "2 + 12",
          highlight: "2 + 12",
          explain: "เมื่อทำคูณเรียบร้อย ได้ผลลัพธ์เป็น 12 จากนั้นจึงดำเนินการบวกตามลำดับขั้น 2 + 12"
        },
        {
          expr: "14",
          highlight: "14",
          explain: "สิ้นสุดกระบวนการคำนวณ ผลลัพธ์สุดท้ายที่คืนมาประเมินค่าเป็น: 14"
        }
      ]
    },
    2: {
      formula: "(2 + 3) * 4",
      steps: [
        {
          expr: "(2 + 3) * 4",
          highlight: "(2 + 3)",
          explain: "ตรวจสอบลำดับความสำคัญระดับสูงสุด: วงเล็บ ( ) มีลำดับพิเศษที่อยู่สูงกว่าเครื่องหมายคำนวณทั้งหมด ดำเนินการคิดผลบวกภายใน (2 + 3) ก่อนอื่นใด"
        },
        {
          expr: "5 * 4",
          highlight: "5 * 4",
          explain: "ได้ผลลัพธ์ในวงเล็บเท่ากับ 5 จากนั้นจึงประมวลผลด่านนอกต่อโดยนำมาคูณกับ 4"
        },
        {
          expr: "20",
          highlight: "20",
          explain: "กระบวนการคำนวณเสร็จสมบูรณ์ ผลลัพธ์สุดท้ายที่ได้คือ: 20"
        }
      ]
    },
    3: {
      formula: "10 - 2 ** 3 * 2 + 5 % 2",
      steps: [
        {
          expr: "10 - 2 ** 3 * 2 + 5 % 2",
          highlight: "2 ** 3",
          explain: "เครื่องหมายยกกำลัง (**) มีลำดับสูงที่สุดในสมการนี้ (เหนือกว่าคูณ, ลบ, บวก, มอดูโล) ประเมินค่า 2 ** 3 (สองยกกำลังสาม = 8)"
        },
        {
          expr: "10 - 8 * 2 + 5 % 2",
          highlight: "8 * 2",
          explain: "เหลือเครื่องหมาย ลบ, คูณ, บวก, มอดูโล โดย คูณ (*) และ มอดูโล (%) มีระดับงานเท่ากัน แต่คูณอยู่ซ้ายกว่า จึงคิด 8 * 2 = 16 ก่อน"
        },
        {
          expr: "10 - 16 + 5 % 2",
          highlight: "5 % 2",
          explain: "ประมวลผลเครื่องหมายมอดูโล (%) คือการหาเศษ 5 % 2 (ห้าหารสอง เหลือเศษหนึ่ง) ก่อนทำการบวกหรือลบที่มีอันดับสำคัญต่ำกว่า"
        },
        {
          expr: "10 - 16 + 1",
          highlight: "10 - 16",
          explain: "เหลือเครื่องหมายลบ (-) และ บวก (+) ซึ่งมีความสำคัญระดับเท่ากัน ดำเนินการคำนวณจากซ้ายไปขวา: 10 - 16 ได้ค่าเป็น -6"
        },
        {
          expr: "-6 + 1",
          highlight: "-6 + 1",
          explain: "ทำการคำนวณขั้นสุดท้ายคือผลบวกระหว่าง -6 และ 1 ได้คำตอบติดลบ"
        },
        {
          expr: "-5",
          highlight: "-5",
          explain: "คำนวณประมวลผลเสร็จสิ้น ผลลัพธ์ปลายทางที่ได้คือ: -5"
        }
      ]
    }
  };

  const handleSelectPreset = (pIdx) => {
    setPreset(pIdx);
    setStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && step < presetsConfig[preset].steps.length - 1) {
      timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 3000);
    } else if (isPlaying && step === presetsConfig[preset].steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, preset]);

  const currentSteps = presetsConfig[preset].steps;
  const currentStepData = currentSteps[step];

  const renderFormulaWithHighlight = (fullText, highlightPart) => {
    if (!highlightPart) return <span>{fullText}</span>;
    const parts = fullText.split(highlightPart);
    return (
      <span>
        {parts[0]}
        <span className="text-rose-400 bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 rounded-lg font-bold animate-pulse inline-block scale-105 mx-0.5 font-mono select-none">
          {highlightPart}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden transition-all hover:shadow-2xl font-sans" id="operator-precedence-section">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-bl-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-stretch text-white">
        {/* Theory Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
          <div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2 pb-2 leading-normal">
              <Layers className="w-7 h-7 text-rose-400 animate-pulse" />
              ลำดับความสำคัญของเครื่องหมายทางคณิตศาสตร์
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              ภาษา Python มีกฎการคำนวณสมการที่สอดคล้องกับมาตรฐานคณิตศาสตร์สากล (หรือทฤษฎี PEMDAS) ซึ่งจะค้นหาและคำนวณเครื่องหมายที่มีระดับความสำคัญสูงสุดทีละขั้นดังนี้:
            </p>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-900 px-4 py-2.5 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                <span className="col-span-2 text-center">ระดับ</span>
                <span className="col-span-4 pl-2">ตัวดำเนินการ</span>
                <span className="col-span-6 pl-2">ประเภทความสำคัญ</span>
              </div>
              
              {[
                { rank: "1", op: "( )", name: "วงเล็บ (Parentheses) - สูงสุด", color: "text-rose-400 bg-rose-500/5" },
                { rank: "2", op: "**", name: "ยกกำลัง (Exponentiation)", color: "text-orange-400" },
                { rank: "3", op: "* , / , // , %", name: "คูณ, หาร, หารปัดเศษ, หารเอาเศษ", color: "text-amber-400" },
                { rank: "4", op: "+ , -", name: "บวก และ ลบ - ต่ำสุด", color: "text-blue-400" }
              ].map((item, idx) => (
                <div key={idx} className={`grid grid-cols-12 px-4 py-3 border-b border-slate-800/40 text-xs font-mono items-center ${item.color.includes('bg') ? item.color : ''}`}>
                  <span className="col-span-2 text-center font-bold text-slate-500">{item.rank}</span>
                  <span className={`col-span-4 pl-2 font-bold ${item.color.split(' ')[0]}`}>{item.op}</span>
                  <span className="col-span-6 pl-2 text-slate-300 font-sans font-medium">{item.name}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 mt-4 leading-relaxed flex gap-2.5">
              <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>เคล็ดลับการคำนวณ:</strong> หากพบเจอตัวดำเนินการที่มีระดับความสำคัญเท่ากันในระดับเดียวกัน (เช่น คูณ และ หารเศษ) Python จะประเมินและสแกนคิดคำนวณจาก **ซ้ายไปขวา (Left to Right)** เสมอ
              </span>
            </div>
          </div>
        </div>

        {/* Visualizer Column */}
        <div className="w-full lg:w-1/2 bg-slate-950 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between gap-6 shadow-inner">
          <div>
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-900 pb-2.5 flex justify-between items-center">
              <span># Step-by-Step Precedence visualizer</span>
              <span className="text-rose-400 font-bold animate-pulse">Running collapse</span>
            </span>

            <div className="flex gap-2.5 mb-6">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  disabled={isPlaying}
                  onClick={() => handleSelectPreset(num)}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                    preset === num 
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-900/35'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  สมการ {num}: {presetsConfig[num].formula}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 min-h-[150px] flex flex-col justify-center items-center text-center font-mono">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">// ขั้นตอนที่ {step + 1} จากทั้งหมด {currentSteps.length}</div>
              <div className="text-xl md:text-2xl font-bold leading-relaxed tracking-wide">
                {renderFormulaWithHighlight(currentStepData.expr, currentStepData.highlight)}
              </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-xs md:text-[13px] leading-relaxed text-slate-300 mt-4 flex gap-2.5">
              <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-300 text-xs mb-0.5 font-bold">ขั้นตอนคิดตรรกะของ Python:</strong>
                {currentStepData.explain}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            {step === 0 && !isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 px-6 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 text-xs md:text-sm"
              >
                <Play className="w-4 h-4 shrink-0" />
                <span>รันแอนิเมชันคำนวณทีละขั้น (Play)</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setStep(prev => Math.max(0, prev - 1))}
                  disabled={isPlaying || step === 0}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold py-3 px-4 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-1.5 disabled:opacity-30 text-xs md:text-sm"
                >
                  ย้อนกลับ
                </button>
                <button
                  onClick={() => setStep(prev => Math.min(currentSteps.length - 1, prev + 1))}
                  disabled={isPlaying || step === currentSteps.length - 1}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold py-3 px-4 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-1.5 disabled:opacity-30 text-xs md:text-sm"
                >
                  ถัดไป
                </button>
                <button
                  onClick={handleSelectPreset.bind(null, preset)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3.5 rounded-2xl transition-all active:scale-98 flex items-center justify-center shrink-0 border border-slate-700"
                  title="เริ่มจำลองใหม่"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 4: มินิเกม: ศึกชิงแชมป์สมการ (Math Equation Wizard)
// ============================================================================
const MathEquationWizard = () => {
  const [level, setLevel] = useState(1);
  const [answers, setAnswers] = useState({ slot1: null, slot2: null });
  const [evaluatedResult, setEvaluatedResult] = useState('?');
  const [gameStatus, setGameStatus] = useState('playing');

  const levels = {
    1: {
      title: "ด่านที่ 1: วิหารบวกคูณขั้นพื้นฐาน",
      desc: "เป้าหมาย: จงจัดวางเครื่องหมายลงในช่องว่างเพื่อให้ผลลัพธ์การคำนวณออกมามีค่าเท่ากับ 14 (คำแนะนำ: สังเกตว่าอะไรทำงานก่อนกันนะ!)",
      formula: "2 [ ? ] 3 [ ? ] 4",
      target: 14,
      slots: {
        slot1: ["+", "-", "*", "/"],
        slot2: ["+", "*", "%", "**"]
      },
      hint: "เครื่องหมายคูณ (*) มีความสำคัญสูงกว่าบวก (+) จึงต้องประมวลผลก่อนเสมอนะ"
    },
    2: {
      title: "ด่านที่ 2: เขาวงกตครอบงำวงเล็บ",
      desc: "เป้าหมาย: วงเล็บ ( ) ถูกบังคับให้อันดับสูงที่สุดในสมการ จงเลือกเครื่องหมายเพื่อประมวลคำตอบให้มีค่าออกมาเป็น 20",
      formula: "( 2 [ ? ] 3 ) [ ? ] 4",
      target: 20,
      slots: {
        slot1: ["+", "-", "//", "**"],
        slot2: ["-", "*", "%", "/"]
      },
      hint: "บวกค่าภายในวงเล็บจนเสร็จเรียบร้อย (ได้ 5) แล้วนำมาหาวิธีให้ได้ผลลัพธ์เป็น 20 ด้านนอก"
    },
    3: {
      title: "ด่านที่ 3: หุบเขาหารเอาเศษ (Modulo)",
      desc: "เป้าหมาย: นำเครื่องหมายพิเศษมาประยุกต์จัดวางเพื่อให้ผลรวมสุดท้ายประเมินค่าออกมาได้เท่ากับ 5 พอดีเป๊ะ",
      formula: "17 [ ? ] 3 [ ? ] 3",
      target: 5,
      slots: {
        slot1: ["%", "//", "*", "**"],
        slot2: ["+", "-", "*", "/"]
      },
      hint: "ใช้มอดูโล (%) เพื่อหาเศษของ 17 % 3 ซึ่งจะได้เศษเท่ากับ 2 จากนั้นจึงหาวิธีมาบวกเพิ่มข้างหลัง"
    }
  };

  const handleSlotSelect = (slotKey, value) => {
    if (gameStatus !== 'playing') return;
    const updatedAnswers = { ...answers, [slotKey]: value };
    setAnswers(updatedAnswers);
    
    const computedVal = evaluateCustomEquation(level, updatedAnswers.slot1, updatedAnswers.slot2);
    setEvaluatedResult(computedVal);
  };

  const verifyAnswers = () => {
    const currentLvl = levels[level];
    if (evaluatedResult === currentLvl.target) {
      setGameStatus('success');
    } else {
      setGameStatus('fail');
    }
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setAnswers({ slot1: null, slot2: null });
    setEvaluatedResult('?');
    setGameStatus('playing');
  };

  const resetGame = () => {
    setLevel(1);
    setAnswers({ slot1: null, slot2: null });
    setEvaluatedResult('?');
    setGameStatus('playing');
  };

  const currentLevel = levels[level];

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group font-sans" id="math-equation-wizard-section">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-bl-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-8">
        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Gamification Zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2.5">
          <Calculator className="w-8 h-8 text-rose-400" />
          มินิเกม: ศึกชิงแชมป์สมการ (Math Equation Wizard)
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-sm md:text-[15px]">
          ท้าทายจินตนาการและการวิเคราะห์! เลือกรหัสเครื่องหมายและจัดวางให้ถูกตำแหน่งเพื่อให้สมการคำนวณตรงเป้าหมายที่กำหนด!
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Game Area */}
        <div className="bg-slate-800/80 backdrop-blur rounded-3xl p-6 md:p-8 border border-slate-700 flex flex-col justify-between gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">ด่านประลองที่ {level} / 3</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((l) => (
                  <div 
                    key={l} 
                    className={`w-8 h-2 rounded-full transition-all ${
                      l === level ? 'bg-rose-500' : l < level ? 'bg-rose-600' : 'bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{currentLevel.title}</h4>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">{currentLevel.desc}</p>

            <div className="mb-6 bg-slate-950 rounded-2xl p-5 border border-slate-900 text-center font-mono text-lg md:text-xl text-white flex items-center justify-center gap-3">
              {level === 1 && (
                <div className="flex items-center gap-2">
                  <span>2</span>
                  <CustomDropdown value={answers.slot1} options={currentLevel.slots.slot1} onChange={(val) => handleSlotSelect('slot1', val)} disabled={gameStatus !== 'playing'} />
                  <span>3</span>
                  <CustomDropdown value={answers.slot2} options={currentLevel.slots.slot2} onChange={(val) => handleSlotSelect('slot2', val)} disabled={gameStatus !== 'playing'} />
                  <span>4</span>
                </div>
              )}
              {level === 2 && (
                <div className="flex items-center gap-2">
                  <span>(</span>
                  <span>2</span>
                  <CustomDropdown value={answers.slot1} options={currentLevel.slots.slot1} onChange={(val) => handleSlotSelect('slot1', val)} disabled={gameStatus !== 'playing'} />
                  <span>3</span>
                  <span>)</span>
                  <CustomDropdown value={answers.slot2} options={currentLevel.slots.slot2} onChange={(val) => handleSlotSelect('slot2', val)} disabled={gameStatus !== 'playing'} />
                  <span>4</span>
                </div>
              )}
              {level === 3 && (
                <div className="flex items-center gap-2">
                  <span>17</span>
                  <CustomDropdown value={answers.slot1} options={currentLevel.slots.slot1} onChange={(val) => handleSlotSelect('slot1', val)} disabled={gameStatus !== 'playing'} />
                  <span>3</span>
                  <CustomDropdown value={answers.slot2} options={currentLevel.slots.slot2} onChange={(val) => handleSlotSelect('slot2', val)} disabled={gameStatus !== 'playing'} />
                  <span>3</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">คำนวณปัจจุบัน:</span>
                <div className={`px-4 py-2 border rounded-xl font-mono text-base font-bold shadow-inner ${
                  evaluatedResult === currentLevel.target 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 animate-pulse'
                    : 'bg-slate-950 border-slate-900 text-slate-300'
                }`}>
                  {evaluatedResult}
                </div>
              </div>

              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">เป้าหมายปลายทาง:</span>
                <div className="bg-slate-950 border border-rose-500/30 px-5 py-2 rounded-xl font-mono text-rose-400 text-lg font-bold shadow-inner">
                  {currentLevel.target}
                </div>
              </div>
            </div>
          </div>

          {gameStatus === 'playing' && (
            <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl text-rose-300 text-xs leading-relaxed flex gap-2">
              <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
              <span><strong>เวทมนตร์วิซาร์ด:</strong> {currentLevel.hint}</span>
            </div>
          )}

          {gameStatus === 'success' && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 animate-pulse">
              <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs md:text-sm font-bold">สมการผ่านเกณฑ์เรียบร้อย! ผลลัพธ์และเป้าหมายตรงกันอย่างสมบูรณ์แบบ</p>
              </div>
            </div>
          )}

          {gameStatus === 'fail' && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-6 h-6 shrink-0 animate-bounce" />
              <div>
                <p className="text-xs md:text-sm font-bold">ผลรวมไม่ตรงเป้าหมาย! ลองปรับวิเคราะห์ลำดับสำคัญดูใหม่อีกรอบนะ</p>
              </div>
            </div>
          )}
        </div>

        {/* Submit & Status Area */}
        <div className="flex flex-col justify-between gap-6">
          <div className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/60 flex-1 flex flex-col justify-center gap-5 text-center items-center">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              // Verification Control
            </span>
            
            <p className="text-slate-300 text-xs leading-relaxed max-w-xs mx-auto">
              เมื่อกำหนดและเลือกเครื่องหมายในกล่อง Dropdown [ ? ] ครบทั้งสองกล่องแล้ว ให้คลิกปุ่มด้านล่างเพื่อประเมินความสอดคล้อง
            </p>

            <button
              onClick={verifyAnswers}
              disabled={answers.slot1 === null || answers.slot2 === null || gameStatus !== 'playing'}
              className="bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold py-3.5 px-6 rounded-2xl transition-all active:scale-98 shadow-lg shadow-rose-900/20 text-xs md:text-sm max-w-xs mx-auto w-full"
            >
              ตรวจสอบความถูกต้อง (Verify)
            </button>
          </div>

          <div className="flex gap-4">
            {gameStatus === 'success' && level < 3 && (
              <button
                onClick={nextLevel}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] text-xs md:text-sm"
              >
                <span>ลุยต่อด่านถัดไป</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {gameStatus === 'success' && level === 3 && (
              <div className="w-full text-center">
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl mb-4 font-bold text-xs md:text-sm animate-pulse">
                  🎉 ยินดีด้วย! คุณผ่านด่านท้าทายลำดับเครื่องหมายคณิตศาสตร์สำเร็จ 100%
                </div>
                <button
                  onClick={resetGame}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white px-6 py-3.5 rounded-2xl font-bold transition-all text-xs md:text-sm shadow-md"
                >
                  <RefreshCw className="w-4 h-4 inline mr-1.5" /> เล่นทบทวนใหม่อีกครั้ง
                </button>
              </div>
            )}

            {gameStatus === 'fail' && (
              <button
                onClick={() => { setGameStatus('playing'); setAnswers({ slot1: null, slot2: null }); setEvaluatedResult('?'); }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-2xl font-bold transition-all text-xs md:text-sm border border-slate-700"
              >
                ลองคำนวณใหม่อีกครั้ง
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// REAL-TIME EQUATION EVALUATION HELPER
// ============================================================================
const evaluateCustomEquation = (level, s1, s2) => {
  if (!s1 || !s2) return '?';
  try {
    if (level === 1) {
      let val = 0;
      if ((s2 === '*' || s2 === '/' || s2 === '%' || s2 === '//') && (s1 === '+' || s1 === '-')) {
        let right = evalSimple(3, s2, 4);
        if (right === 'Error') return 'Error';
        val = evalSimple(2, s1, right);
      } else {
        let left = evalSimple(2, s1, 3);
        if (left === 'Error') return 'Error';
        val = evalSimple(left, s2, 4);
      }
      return val === 'Error' ? 'Error' : val;
    }
    else if (level === 2) {
      let inside = evalSimple(2, s1, 3);
      if (inside === 'Error') return 'Error';
      let val = evalSimple(inside, s2, 4);
      return val === 'Error' ? 'Error' : val;
    }
    else if (level === 3) {
      let val = 0;
      if ((s2 === '*' || s2 === '/' || s2 === '%' || s2 === '//') && (s1 === '+' || s1 === '-')) {
        let right = evalSimple(3, s2, 3);
        if (right === 'Error') return 'Error';
        val = evalSimple(17, s1, right);
      } else {
        let left = evalSimple(17, s1, 3);
        if (left === 'Error') return 'Error';
        val = evalSimple(left, s2, 3);
      }
      return val === 'Error' ? 'Error' : val;
    }
  } catch (e) {
    return 'Error';
  }
  return '?';
};

const evalSimple = (x, op, y) => {
  switch (op) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return y !== 0 ? x / y : 'Error';
    case '//': return y !== 0 ? Math.floor(x / y) : 'Error';
    case '%': return y !== 0 ? x % y : 'Error';
    case '**': return Math.pow(x, y);
    default: return 0;
  }
};

// ============================================================================
// MAIN EXPORT COMPONENT
// ============================================================================
export default function py4_3() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรมทางคณิตศาสตร์:

ข้อ 1: โปรแกรมคำนวณทอนเงินอัตโนมัติ
ให้นักเรียนรับค่า "ราคาสินค้ารวม (price)" และ "จำนวนยอดเงินที่จ่ายเข้ามา (payment)" จากนั้นเขียนคำสั่งเพื่อหาค่า "เงินทอนรวม (change)" ที่ลูกค้าพึงได้รับแสดงผลลัพธ์ผ่าน f-string

ข้อ 2: โปรแกรมวิเคราะห์แปลงวินาที (เน้นใช้ // และ %)
ให้นักเรียนสร้างระบบรับอินพุต "วินาทีเริ่มต้น (total_seconds)" (เช่น 4000 วินาที)
แล้วแปลงเป็น ชั่วโมง, นาที และ วินาทีที่เหลือค้างคา โดยใช้เครื่องหมายหารปัดเศษทิ้ง (//) และหาเศษ (%)
(คำแนะนำ: 1 ชั่วโมง = 3600 วินาที, 1 นาที = 60 วินาที)
ตัวอย่างการพิมพ์แสดง: "4000 วินาที แปลงค่าได้: 1 ชั่วโมง 6 นาที 40 วินาที"`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-rose-200 selection:text-rose-900 relative">
      {/* Layer 1: Ambient Background Glow Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-rose-100/40 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-orange-100/50 blur-[140px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        <OperatorsOverview />
        <MathPlayground />
        <OperatorPrecedenceCard />
        <MathEquationWizard />

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 4.3)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
