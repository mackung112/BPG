import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  AmbientBackdrop
} from '../shared';
import {
  Database,
  ArrowRight,
  Play,
  RotateCcw,
  Cpu,
  Layers,
  CheckCircle2,
  Info,
  AlertCircle,
  Plus,
  Trash2,
  HelpCircle,
  Binary,
  Merge
} from 'lucide-react';

export default function DSA1_5() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_5_BLOBS = [
    { color: 'bg-teal-200',    size: 'w-[450px] h-[450px]', position: '-top-32 -left-32',   opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32',  opacity: 'opacity-35' },
    { color: 'bg-emerald-200', size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-amber-100',   size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3',    opacity: 'opacity-25' }
  ];

  // ─── 2. Set Simulator States ──────────────────────────────────────────────
  const [setA, setSetA] = useState(['Apple', 'Banana', 'Cherry']);
  const [setB, setSetB] = useState(['Banana', 'Cherry', 'Dates']);
  const [inputValA, setInputValA] = useState('');
  const [inputValB, setInputValB] = useState('');
  const [selectedOp, setSelectedOp] = useState('union'); // union | intersection | diffA | diffB
  const [simLogs, setSimLogs] = useState(['ระบบจำลอง Set พร้อมทำงาน: โหลดค่าเริ่มต้น Set A และ Set B']);

  // Dynamic set computing
  const aOnly = setA.filter(x => !setB.includes(x));
  const bOnly = setB.filter(x => !setA.includes(x));
  const intersection = setA.filter(x => setB.includes(x));
  
  const getOpResult = () => {
    if (selectedOp === 'union') {
      // Set union: A ∪ B
      return Array.from(new Set([...setA, ...setB]));
    } else if (selectedOp === 'intersection') {
      // Set intersection: A ∩ B
      return intersection;
    } else if (selectedOp === 'diffA') {
      // Difference: A - B
      return aOnly;
    } else if (selectedOp === 'diffB') {
      // Difference: B - A
      return bOnly;
    }
    return [];
  };

  const addLog = (msg) => {
    setSimLogs(prev => [...prev, msg]);
  };

  // Add Element to Set A
  const handleAddToA = () => {
    const value = inputValA.trim();
    if (!value) return;
    if (setA.includes(value)) {
      addLog(`>>> setA.add("${value}") -> สมาชิกซ้ำ! ข้อมูลไม่ถูกเพิ่มลงในเซต`);
      setInputValA('');
      return;
    }
    setSetA(prev => [...prev, value]);
    addLog(`>>> setA.add("${value}") -> เพิ่มสำเร็จ!`);
    setInputValA('');
  };

  // Add Element to Set B
  const handleAddToB = () => {
    const value = inputValB.trim();
    if (!value) return;
    if (setB.includes(value)) {
      addLog(`>>> setB.add("${value}") -> สมาชิกซ้ำ! ข้อมูลไม่ถูกเพิ่มลงในเซต`);
      setInputValB('');
      return;
    }
    setSetB(prev => [...prev, value]);
    addLog(`>>> setB.add("${value}") -> เพิ่มสำเร็จ!`);
    setInputValB('');
  };

  // Remove Element from Set A
  const handleRemoveFromA = (val) => {
    setSetA(prev => prev.filter(x => x !== val));
    addLog(`>>> setA.remove("${val}") -> ลบออกจาก Set A เรียบร้อย`);
  };

  // Remove Element from Set B
  const handleRemoveFromB = (val) => {
    setSetB(prev => prev.filter(x => x !== val));
    addLog(`>>> setB.remove("${val}") -> ลบออกจาก Set B เรียบร้อย`);
  };

  const handleResetSimulator = () => {
    setSetA(['Apple', 'Banana', 'Cherry']);
    setSetB(['Banana', 'Cherry', 'Dates']);
    setInputValA('');
    setInputValB('');
    setSelectedOp('union');
    setSimLogs(['รีเซ็ตตารางจำลองและค่าเริ่มต้นของเซตสำเร็จ']);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_5_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Introduction to Set ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              โครงสร้างข้อมูลกลุ่มเฉพาะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              Set (เซต)
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ในทางวิทยาการคอมพิวเตอร์ <strong className="mx-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-700 font-mono text-[14px]">Set (เซต)</strong> 
              คือ โครงสร้างข้อมูลเชิงเส้นประเภทลำดับเฉพาะที่ไม่มีการเรียงลำดับ (Unordered) และสมาชิกแต่ละตัวต้องไม่มีความซ้ำซ้อนกัน (Unique Elements) โดยคีย์ประมวลผลเบื้องหลังจะเก็บลงในตารางแฮช (Hash Table) เพื่อความเร็วสูงสุดในการสืบค้นข้อมูลในระดับ $O(1)$
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    การประกาศและสร้างเซต (Set Declaration)
                  </h4>
                  <p className="text-[15px] text-zinc-650 leading-relaxed">
                    เราสร้าง Set ในภาษา Python โดยใช้เครื่องหมายปีกกา <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm text-indigo-600 font-semibold">{"{ }"}</code> (Curly braces) ในการครอบสมาชิก และคั่นแต่ละตัวด้วยเครื่องหมายจุลภาค (Comma)
                  </p>
                  <div className="bg-slate-900 text-slate-100 rounded-xl p-3.5 font-mono text-[13px] border border-white/10 shadow-inner">
                    <span className="text-zinc-500 font-bold block mb-1">PYTHON CODE:</span>
                    <span className="text-emerald-400"># ⚠️ การสร้างเซตว่าง (ต้องใช้ set() เท่านั้น เพราะ {"{}"} จะสร้าง empty dict)</span><br />
                    cargo = set()<br />
                    <span className="text-emerald-400"># สร้างเซตที่มีข้อมูลเริ่มต้น</span><br />
                    scores = {"{"}<span className="text-amber-300">85</span>, <span className="text-amber-300">90</span>, <span className="text-amber-300">78</span>{"}"}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    คุณสมบัติหลักของ Set (เซต)
                  </h4>
                  <p className="text-[15px] text-zinc-650 leading-relaxed">
                    เบื้องหลังของเซตขับเคลื่อนด้วยตารางแฮช (Hash Table) เช่นเดียวกับคีย์ของ Dictionary ทำให้มีความเร็วในการสืบค้นข้อมูลในระดับ $O(1)$ และมีคุณสมบัติที่ต้องจำดังนี้:
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-zinc-655 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold font-mono">1.</span>
                      <span><strong>ไม่มีลำดับ (Unordered):</strong> สมาชิกไม่มีดัชนี (No Index) เข้าถึงข้อมูลผ่าน `set[0]` ไม่ได้ และตำแหน่งสล็อตอาจเปลี่ยนแปลงได้เสมอ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold font-mono">2.</span>
                      <span><strong>ค่าไม่ซ้ำซ้อน (Unique Elements):</strong> เซตจะบล็อกข้อมูลที่ซ้ำกันโดยอัตโนมัติ สมาชิกแต่ละตัวมีได้เพียงหนึ่งเดียวในเซต</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual Duplicate Elimination Map */}
              <div className="border-t border-zinc-200/80 pt-5 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  กระบวนการคัดกรองข้อมูลซ้ำซ้อนอัตโนมัติ (Duplicate Elimination Process)
                </span>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 overflow-x-auto">
                  <div className="min-w-[500px] flex items-center justify-between gap-4 py-4 px-6 bg-white border border-slate-200 rounded-xl">
                    {/* Source List */}
                    <div className="text-center space-y-2">
                      <span className="text-xs font-bold text-slate-500 block">List (มีค่าซ้ำกัน)</span>
                      <div className="flex gap-2 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        {['10', '20', '20', '30'].map((val, i) => (
                          <div key={i} className={`w-10 h-10 flex items-center justify-center font-mono text-sm font-bold bg-white rounded border border-slate-300 shadow-sm ${i === 2 ? 'text-rose-500 border-rose-300' : 'text-slate-800'}`}>
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action arrow */}
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-[10px] font-mono text-indigo-650 font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">set() conversion</span>
                      <ArrowRight className="w-6 h-6 text-indigo-500 mt-1" />
                    </div>

                    {/* Target Set */}
                    <div className="text-center space-y-2">
                      <span className="text-xs font-bold text-slate-500 block">Set (คัดกรองเหลือค่าเดียว)</span>
                      <div className="flex gap-2 bg-teal-50/50 p-2.5 rounded-lg border border-teal-200">
                        {['10', '20', '30'].map((val, i) => (
                          <div key={i} className="w-10 h-10 flex items-center justify-center font-mono text-sm font-bold bg-white rounded border border-teal-300 text-teal-700 shadow-sm">
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed font-sans">
                  <div className="flex items-start gap-2 bg-emerald-50/50 border border-emerald-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong>Duplicate Elimination:</strong> เมื่อทำการแปลง List ที่มีสมาชิกซ้ำกันให้เป็น Set ค่าที่ซ้ำกันจะถูกขจัดทิ้งทันที เหลือเพียงข้อมูลที่มีเอกลักษณ์ (Unique) เท่านั้น</p>
                  </div>
                  <div className="flex items-start gap-2 bg-rose-50/50 border border-rose-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <p><strong>Unordered Nature:</strong> สมาชิกในเซตไม่ได้เรียงลำดับดัชนี เมื่อพิมพ์เซตออกมา ลำดับของข้อมูลอาจไม่เหมือนกับตอนที่เรากำหนดเริ่มต้น</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Pros & Cons ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              การวิเคราะห์ประสิทธิภาพ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ข้อดีและข้อจำกัดในการใช้โครงสร้างข้อมูลแบบ Set
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Pros card */}
            <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-emerald-950 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ข้อดีเด่นของ Set
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>สืบค้นรวดเร็วทันที $O(1)$:</strong> ใช้ Hash Table ค้นหาและระบุสมาชิกได้คงที่ระดับสัดส่วนเสี้ยววินาทีโดยไม่ต้องสแกนลูปหาข้อมูล
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>การันตีความปลอดภัยไร้ตัวซ้ำ:</strong> ขจัดภาระงานเขียนฟังก์ชันคัดกรองข้อมูลซ้ำซ้อนในระดับ Application โค้ด
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 text-xs font-semibold text-emerald-800 font-mono">
                SUITABLE FOR: MEMBERSHIP TESTING & MATH SET OPERATIONS
              </div>
            </div>

            {/* Cons card */}
            <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-rose-950 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                  ข้อจำกัดและข้อเสียของ Set
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>เข้าถึงข้อมูลผ่านดัชนีไม่ได้:</strong> เนื่องจากไม่มีลำดับ จึงไม่สามารถใช้วงเล็บดัชนีเข้าถึงตัวแปรแบบ `scores[0]` ได้โดยตรง
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>สมาชิกต้องเป็นข้อมูลคงที่ (Immutable):</strong> ข้อมูลสมาชิกในเซตต้องเป็นประเภท Hashable เท่านั้น ไม่สามารถเก็บ List ซ้อนภายในได้
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 text-xs font-semibold text-rose-800 font-mono">
                LIMITATION: NO INDEX ACCESS & MUTABLE ELEMENT RESTRICTION
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Summary of Basic Set Methods ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              คู่มือวิทยาการคำนวณ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สรุปคำสั่งพื้นฐานในการจัดการเซต (Set Methods Summary)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            การทำงานกับตัวแปรประเภทเซตในภาษา Python มีเมธอดหลักมาตรฐานในการควบคุมและสั่งจัดการข้อมูลภายในดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: '.add(x)',
                subtitle: 'การเพิ่มข้อมูล',
                description: 'นำค่า x ไปบันทึกเพิ่มเข้าสู่เซต หากค่านั้นมีอยู่แล้วในเซต ระบบจะข้ามคำสั่งโดยไม่แจ้ง Error',
                code: 'scores.add(95)',
                result: '{85, 90, 78, 95}',
                titleClass: 'text-emerald-600',
                bgGradient: 'from-emerald-50/50 via-transparent to-transparent',
              },
              {
                title: '.remove(x)',
                subtitle: 'การลบตามค่าข้อมูล',
                description: 'สืบค้นและลบข้อมูลที่มีค่าเท่ากับ x ออกจากเซต (หากตรวจไม่พบค่าข้อมูลในเซตจะเกิด KeyError)',
                code: 'scores.remove(90)',
                result: '{85, 78}',
                titleClass: 'text-sky-500',
                bgGradient: 'from-sky-50/50 via-transparent to-transparent',
              },
              {
                title: 'A.union(B)',
                subtitle: 'การรวมเซต (Union)',
                description: 'การรวมสมาชิกทั้งหมดจากเซต A และเซต B เข้าไว้ด้วยกัน (หรือใช้สัญลักษณ์ดำเนินการ A | B)',
                code: 'A.union({78, 99})',
                result: '{85, 90, 78, 99}',
                titleClass: 'text-rose-500',
                bgGradient: 'from-rose-50/50 via-transparent to-transparent',
              },
              {
                title: 'A.intersection(B)',
                subtitle: 'การหาจุดร่วม (Intersection)',
                description: 'ดึงเฉพาะสมาชิกที่ปรากฏอยู่ร่วมกันทั้งสองเซตออกมา (หรือใช้สัญลักษณ์ดำเนินการ A & B)',
                code: 'A.intersection({78, 99})',
                result: '{78}',
                titleClass: 'text-amber-500',
                bgGradient: 'from-amber-50/50 via-transparent to-transparent',
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top soft ambient light glow */}
                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${card.bgGradient} opacity-60 pointer-events-none`} />

                <div className="space-y-4 relative z-10">
                  <span className={`block font-mono text-[20px] font-bold tracking-tight ${card.titleClass}`}>
                    {card.title}
                  </span>
                  <div className="space-y-2">
                    <h4 className="text-[17px] font-bold text-slate-800 leading-tight">
                      {card.subtitle}
                    </h4>
                    <p className="text-[14px] text-slate-500 leading-relaxed min-h-[64px]">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="bg-slate-50 border border-slate-100/60 rounded-xl p-3 flex justify-between items-center font-mono text-[12px] md:text-[13px] mt-6 relative z-10">
                  <span className="text-slate-700 truncate mr-2">{card.code}</span>
                  <span className="text-indigo-600 font-bold shrink-0">{card.result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 4: Interactive Set Sandbox ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ห้องปฏิบัติการจำลอง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวจำลองตรรกะเชิงเซตและผังเวนน์-ออยเลอร์ (Set Operations & Venn Diagram Simulator)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองเพิ่ม/ลดข้อมูลในเซต A และเซต B สังเกตพฤติกรรมข้อมูลซ้ำซ้อน และเลือกตัวดำเนินการทางคณิตศาสตร์เซต เพื่อดูผลลัพธ์ผ่านแผนภาพเวนน์-ออยเลอร์จำลอง:
          </p>

          <SimulatorShell
            dark
            title="Interactive Python Set Operations & Venn Sandbox"
            icon={<Merge className="w-8 h-8 text-teal-400" />}
            glowColors="from-zinc-900/30 to-zinc-950/10"
            iconColor="text-teal-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Controller Panel (Left) */}
              <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROLLER
                </div>

                <div className="space-y-5 pt-3">
                  {/* Set A Controls */}
                  <div className="bg-slate-800/35 p-3 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-teal-300 font-bold">Set A = {`{ ${setA.join(', ')} }`}</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="เพิ่ม เช่น Orange"
                        value={inputValA}
                        onChange={(e) => setInputValA(e.target.value)}
                        className="bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-teal-500 grow"
                      />
                      <button
                        onClick={handleAddToA}
                        className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add to A
                      </button>
                    </div>
                    {setA.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-slate-800">
                        {setA.map((val, idx) => (
                          <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-slate-800">
                            {val}
                            <Trash2 className="w-2.5 h-2.5 text-rose-500 cursor-pointer" onClick={() => handleRemoveFromA(val)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Set B Controls */}
                  <div className="bg-slate-800/35 p-3 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-indigo-300 font-bold">Set B = {`{ ${setB.join(', ')} }`}</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="เพิ่ม เช่น Melon"
                        value={inputValB}
                        onChange={(e) => setInputValB(e.target.value)}
                        className="bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500 grow"
                      />
                      <button
                        onClick={handleAddToB}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add to B
                      </button>
                    </div>
                    {setB.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-slate-800">
                        {setB.map((val, idx) => (
                          <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-slate-800">
                            {val}
                            <Trash2 className="w-2.5 h-2.5 text-rose-500 cursor-pointer" onClick={() => handleRemoveFromB(val)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Set Operations Selectors */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">ตัวดำเนินการคณิตศาสตร์เซต:</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { id: 'union', label: 'A | B (Union)' },
                        { id: 'intersection', label: 'A & B (Intersect)' },
                        { id: 'diffA', label: 'A - B (Diff A)' },
                        { id: 'diffB', label: 'B - A (Diff B)' }
                      ].map((op) => (
                        <button
                          key={op.id}
                          onClick={() => {
                            setSelectedOp(op.id);
                            addLog(`>>> สั่งรันตัวดำเนินการ ${op.label}`);
                          }}
                          className={`py-2 rounded-xl border text-center font-bold text-[10.5px] cursor-pointer transition-all ${
                            selectedOp === op.id
                              ? 'border-teal-500 bg-teal-950/40 text-teal-350 shadow shadow-teal-500/25'
                              : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset & Quick Helper */}
                  <button
                    onClick={handleResetSimulator}
                    className="w-full py-2 bg-slate-850 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-800"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตหน่วยความจำและค่าจำลอง
                  </button>

                </div>

                {/* Console Log Panel */}
                <div className="mt-6 pt-3 border-t border-slate-800">
                  <div className="bg-black/60 p-3.5 rounded-xl border border-slate-950 min-h-[110px] font-mono text-[11.5px] leading-relaxed text-teal-400 select-all overflow-y-auto max-h-[140px]">
                    <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-2 uppercase tracking-wide text-[9px] font-bold">
                      Python Console Log Trace:
                    </div>
                    {simLogs.map((log, index) => (
                      <div key={index} className="animate-fadeIn">
                        {log.startsWith('>>>') ? (
                          <span className="text-indigo-300 font-bold">{log}</span>
                        ) : (
                          <span className="text-teal-400"><span className="text-zinc-500">&gt;&gt; </span>{log}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Venn Diagram Visualizer (Right) */}
              <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  VENN-EULER DIAGRAM & MEMORY VISUALIZER
                </div>

                <div className="grow flex flex-col justify-between mt-6">
                  
                  {/* Venn Diagram Canvas */}
                  <div className="relative h-56 w-full max-w-[420px] mx-auto bg-slate-900/30 rounded-2xl border border-slate-900 flex items-center justify-center overflow-hidden">
                    
                    {/* Circle A */}
                    <div className={`absolute left-6 w-44 h-44 rounded-full border-2 transition-all duration-300 flex flex-col items-center pt-8 px-4
                      ${selectedOp === 'union' || selectedOp === 'diffA'
                        ? 'bg-teal-500/15 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.15)]'
                        : 'border-slate-850 bg-slate-950/30'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-teal-400 font-mono tracking-wider absolute top-3">SET A</span>
                    </div>

                    {/* Circle B */}
                    <div className={`absolute right-6 w-44 h-44 rounded-full border-2 transition-all duration-300 flex flex-col items-center pt-8 px-4
                      ${selectedOp === 'union' || selectedOp === 'diffB'
                        ? 'bg-indigo-500/15 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                        : 'border-slate-850 bg-slate-950/30'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-wider absolute top-3">SET B</span>
                    </div>

                    {/* Intersect Overlap Highlighter */}
                    <div className={`absolute w-[100px] h-[130px] rounded-[50px] transition-all duration-300 pointer-events-none
                      ${selectedOp === 'union'
                        ? 'bg-teal-500/15 shadow-[inset_0_0_15px_rgba(20,184,166,0.1)]'
                        : selectedOp === 'intersection'
                        ? 'bg-emerald-500/20 border-2 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'bg-transparent'
                      }`}
                    />

                    {/* Venn Regions Texts */}
                    {/* Region 1: A Only */}
                    <div className="absolute left-10 w-24 text-center z-10">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        {aOnly.slice(0, 3).map((val, idx) => (
                          <span key={idx} className={`text-[10.5px] font-mono transition-colors ${selectedOp === 'union' || selectedOp === 'diffA' ? 'text-teal-300 font-semibold' : 'text-slate-500'}`}>
                            {val}
                          </span>
                        ))}
                        {aOnly.length > 3 && <span className="text-[9px] text-slate-500 font-mono">+{aOnly.length - 3} elements</span>}
                        {aOnly.length === 0 && <span className="text-[9px] text-slate-650 italic font-sans font-medium">ว่างเปล่า</span>}
                      </div>
                    </div>

                    {/* Region 2: Overlap Intersection */}
                    <div className="absolute w-24 text-center z-10">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        {intersection.slice(0, 3).map((val, idx) => (
                          <span key={idx} className={`text-[10.5px] font-mono transition-colors ${selectedOp === 'union' || selectedOp === 'intersection' ? 'text-emerald-300 font-semibold' : 'text-slate-500'}`}>
                            {val}
                          </span>
                        ))}
                        {intersection.length > 3 && <span className="text-[9px] text-slate-500 font-mono">+{intersection.length - 3} elements</span>}
                        {intersection.length === 0 && <span className="text-[9px] text-slate-650 italic font-sans font-medium">ไม่มีจุดร่วม</span>}
                      </div>
                    </div>

                    {/* Region 3: B Only */}
                    <div className="absolute right-10 w-24 text-center z-10">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        {bOnly.slice(0, 3).map((val, idx) => (
                          <span key={idx} className={`text-[10.5px] font-mono transition-colors ${selectedOp === 'union' || selectedOp === 'diffB' ? 'text-indigo-300 font-semibold' : 'text-slate-500'}`}>
                            {val}
                          </span>
                        ))}
                        {bOnly.length > 3 && <span className="text-[9px] text-slate-500 font-mono">+{bOnly.length - 3} elements</span>}
                        {bOnly.length === 0 && <span className="text-[9px] text-slate-650 italic font-sans font-medium">ว่างเปล่า</span>}
                      </div>
                    </div>

                  </div>

                  {/* Operation Result Box */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mt-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-teal-400 tracking-wider uppercase">Operation Result:</span>
                        <span className="text-[10.5px] font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-mono">
                          {selectedOp === 'union'
                            ? 'A ∪ B (Union)'
                            : selectedOp === 'intersection'
                            ? 'A ∩ B (Intersection)'
                            : selectedOp === 'diffA'
                            ? 'A - B (Difference A)'
                            : 'B - A (Difference B)'}
                        </span>
                      </div>
                      <div className="text-xs leading-relaxed text-slate-400 font-mono bg-black/40 p-2.5 rounded border border-slate-900/60 overflow-x-auto min-h-[46px] flex items-center">
                        <span className="text-emerald-400 font-bold mr-2 shrink-0">Output:</span>
                        <span className="text-slate-200">
                          {`{ ${getOpResult().join(', ')} }`}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: ปฏิบัติการจัดการ Set ใน Python"
          pin="1122"
          taskText={`[โจทย์ปฏิบัติการหลักสูตรรายวิชาโครงสร้างข้อมูล 21900-1002]
โจทย์ปฏิบัติการจัดการ Set ใน Python ให้นักเรียนเขียนคำสั่งต่อไปนี้:

1. สร้างเซตว่างชื่อ my_set (ใช้คำสั่งสร้างเซตที่ถูกต้องเพื่อไม่ให้ซ้ำกับดิกชันนารีว่าง) แล้วเพิ่มตัวเลข 100 ลงไป
2. กำหนดให้ animals = {"cat", "dog"} จงเขียนคำสั่งเพื่อเพิ่ม "bird" เข้าไปในเซต
3. กำหนดให้ numbers = {10, 20, 30, 40, 50} จงเขียนคำสั่งเพื่อลบเลข 30 ออกจากเซต
4. กำหนดให้ set_a = {1, 2, 3} และ set_b = {3, 4, 5} จงเขียนคำสั่งเพื่อหาผลรวมสมาชิกร่วมกัน (Union) ของทั้งสองเซต
5. กำหนดให้ items_list = ["pen", "book", "pen", "pencil", "book"] จงเขียนคำสั่งแปลงลิสต์นี้ให้เป็น Set เพื่อกำจัดข้อมูลที่ซ้ำกันออกไป

เฉลย Set:
1. my_set = set() ตามด้วย my_set.add(100) (จุดดักผีของนักเรียน: เด็กมักจะประกาศ my_set = {} ซึ่งจะได้ dict)
2. animals.add("bird")
3. numbers.remove(30) (หรือ .discard(30))
4. set_a.union(set_b) (หรือ set_a | set_b)
5. set(items_list)`}
        />

      </main>

    </div>
  );
}
