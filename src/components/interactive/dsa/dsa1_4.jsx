import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  ChevronRight,
  Plus,
  Trash2,
  Sliders,
  HelpCircle
} from 'lucide-react';

export default function DSA1_4() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_4_BLOBS = [
    { color: 'bg-indigo-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-blue-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-violet-200', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. Hash Table Data Definition ─────────────────────────────────────────
  const PRESET_KEYS = [
    { key: "gpa", val: "3.8", asciiSum: 312, hashIdx: 0, desc: "ดัชนี = 312 % 8 = 0" },
    { key: "name", val: "Mac", asciiSum: 282, hashIdx: 2, desc: "ดัชนี = 282 % 8 = 2" },
    { key: "age", val: "25", asciiSum: 301, hashIdx: 5, desc: "ดัชนี = 301 % 8 = 5" },
    { key: "tag", val: "staff", asciiSum: 316, hashIdx: 4, desc: "ดัชนี = 316 % 8 = 4 (ตำแหน่งปกติ)" },
    { key: "gat", val: "test", asciiSum: 316, hashIdx: 4, desc: "ดัชนี = 316 % 8 = 4 (ชนกับ tag! ต้องชนเลื่อนหาช่องว่าง)" }
  ];

  // ─── 3. Hash Table Simulator States ────────────────────────────────────────
  const [buckets, setBuckets] = useState(Array(8).fill(null)); // { key, val, asciiSum, probeCount }
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  
  // Animation states
  const [currentStep, setCurrentStep] = useState('idle'); // idle | math | check | collision | done
  const [inspectingIdx, setInspectingIdx] = useState(-1);
  const [simLog, setSimLog] = useState(['ระบบเตรียมพร้อมทดสอบแฮชตาราง']);
  const [isSimulating, setIsSimulating] = useState(false);

  const runInsertSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(false); // We control dynamically
    
    const item = PRESET_KEYS[selectedPresetIdx];
    
    // Check if key already exists
    const exists = buckets.find(b => b && b.key === item.key);
    if (exists) {
      setSimLog([`[เกิดข้อผิดพลาด] คีย์ "${item.key}" มีอยู่ใน Dictionary แล้ว คีย์ห้ามซ้ำซ้อนกัน!`]);
      return;
    }

    setIsSimulating(true);
    let logs = [`[เริ่มบันทึกคีย์] ทำการแฮชและบันทึกคีย์ "${item.key}" : "${item.val}"`];
    setSimLog([...logs]);

    // Step 1: Calculate ASCII sum
    setCurrentStep('math');
    logs.push(`1. คำนวณผลรวมรหัส ASCII ของอักขระ: ${item.key.split('').map(c => `${c}(${c.charCodeAt(0)})`).join(' + ')} = ${item.asciiSum}`);
    setSimLog([...logs]);

    setTimeout(() => {
      // Step 2: Modulo size (8)
      const idealIdx = item.hashIdx;
      logs.push(`2. คำนวณตำแหน่ง Ideal Index: ${item.asciiSum} % 8 = ${idealIdx}`);
      setSimLog([...logs]);
      setInspectingIdx(idealIdx);
      setCurrentStep('check');

      setTimeout(() => {
        // Step 3: Inspect bucket
        inspectBucketStep(idealIdx, idealIdx, item, 0, logs);
      }, 1500);

    }, 1500);
  };

  const inspectBucketStep = (idealIdx, currentIdx, item, probeCount, currentLogs) => {
    let logs = [...currentLogs];
    setInspectingIdx(currentIdx);

    const bucketVal = buckets[currentIdx];
    
    if (bucketVal === null) {
      // Slot is empty! Save here
      logs.push(`3. ตรวจสอบดัชนี ${currentIdx} -> ว่างเปล่า! จัดเก็บข้อมูลลงช่องนี้สำเร็จ`);
      if (probeCount > 0) {
        logs.push(`[แก้ไขสำเร็จ] ลำเลียงตัวแปรหลีกชนด้วยกรรมวิธี Linear Probing (ชนย้ายไป ${probeCount} ครั้ง)`);
      }
      setSimLog(logs);
      
      setBuckets(prev => {
        const next = [...prev];
        next[currentIdx] = {
          key: item.key,
          val: item.val,
          asciiSum: item.asciiSum,
          probeCount: probeCount
        };
        return next;
      });

      setCurrentStep('done');
      setIsSimulating(false);
      setInspectingIdx(-1);
    } else {
      // Collision!
      logs.push(`3. ตรวจสอบดัชนี ${currentIdx} -> ตรวจพบข้อมูลเดิม "${bucketVal.key}" (ชนกัน! Hash Collision)`);
      setCurrentStep('collision');
      setSimLog([...logs]);

      setTimeout(() => {
        // Probe next bucket
        const nextIdx = (currentIdx + 1) % 8;
        logs.push(`[เลื่อนหาช่อง] ขยับตรวจสอบช่องหน่วยความจำถัดไป: (${currentIdx} + 1) % 8 = ${nextIdx}`);
        setSimLog([...logs]);
        setCurrentStep('check');

        setTimeout(() => {
          inspectBucketStep(idealIdx, nextIdx, item, probeCount + 1, logs);
        }, 1500);

      }, 1500);
    }
  };

  const handleClearTable = () => {
    if (isSimulating) return;
    setBuckets(Array(8).fill(null));
    setSelectedPresetIdx(0);
    setCurrentStep('idle');
    setInspectingIdx(-1);
    setSimLog(['ระบบทำการล้างตารางแฮช สแตนด์บายตารางเปล่า']);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_4_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: What is a Dictionary ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              โครงสร้างคู่กุญแจและค่า
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              Dictionary (พจนานุกรม)
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ในทางวิทยาการคอมพิวเตอร์ <strong className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[14px]">Dictionary</strong> 
              (หรือ Hash Map ในภาษาอื่น) คือโครงสร้างข้อมูลประเภทจัดเก็บกลุ่มข้อมูลเป็นคู่ของกุญแจและค่าข้อมูล (Key-Value Pairs) โดยเน้นเรื่องความรวดเร็วสูงสุดในการเข้าถึงข้อมูลผ่านค่าคีย์ โดยระบบเบื้องหลังจะเก็บข้อมูลลงในตารางแฮช (Hash Table) เพื่อจัดทำดัชนีเข้าค้นหาข้อมูลได้โดยตรงทันที
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    การประกาศและสร้าง Dictionary
                  </h4>
                  <p className="text-[15px] text-zinc-600 leading-relaxed">
                    เราสามารถสร้าง Dictionary ในภาษา Python โดยใช้เครื่องหมายปีกกา <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm text-indigo-600 font-semibold">{"{ }"}</code> (Curly braces) ในการครอบข้อมูล และคั่นระหว่าง Key กับ Value ด้วยเครื่องหมายโคลอน (Colon: `:`)
                  </p>
                  <div className="bg-slate-900 text-slate-100 rounded-xl p-3.5 font-mono text-[13px] border border-white/10 shadow-inner">
                    <span className="text-zinc-500 font-bold block mb-1">PYTHON CODE:</span>
                    <span className="text-emerald-400"># สร้าง Dictionary ว่าง</span><br />
                    cargo = {"{}"}<br />
                    <span className="text-emerald-400"># สร้าง Dictionary พร้อมข้อมูลเริ่มต้น {"{คีย์: ค่า}"}</span><br />
                    user = {"{"}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-350">"name"</span>: <span className="text-sky-300">"Mac"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-350">"age"</span>: <span className="text-amber-300">25</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-350">"gpa"</span>: <span className="text-amber-300">3.8</span><br />
                    {"}"}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    โครงสร้างและหลักการทำงาน (Hash Table)
                  </h4>
                  <p className="text-[15px] text-zinc-600 leading-relaxed">
                    Dictionary จะใช้กลไกของ **ตารางแฮช (Hash Table)** เพื่อเชื่อมคีย์กับตำแหน่งในหน่วยความจำ (Index) โดยระบบจะนำกุญแจ (Key) ไปประมวลผลผ่าน **แฮชฟังก์ชัน (Hash Function)** เพื่อระบุสล็อตที่ถูกต้องทันที ทำให้เข้าถึงค่า (Value) ได้อย่างรวดเร็ว
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-zinc-650 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold font-mono">1.</span>
                      <span><strong>กุญแจ (Key):</strong> ต้องเป็นข้อมูลชนิดที่แก้ไขไม่ได้ (Immutable / Hashable) เช่น String, Number, หรือ Tuple และต้องมีค่าไม่ซ้ำกัน</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold font-mono">2.</span>
                      <span><strong>ค่าข้อมูล (Value):</strong> สามารถเป็นข้อมูลชนิดใดก็ได้ รวมถึงสามารถมีค่าซ้ำกันได้</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual Indexing Map */}
              <div className="border-t border-zinc-200/80 pt-5 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  แผนผังการทำงานและการจับคู่คีย์-ค่า (Key-Value Mapping Process)
                </span>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 overflow-x-auto">
                  <div className="min-w-[500px] flex flex-col gap-4">
                    {/* Steps showing Key -> Hash Function -> Index -> Value */}
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { key: '"name"', idx: 'Hash -> Slot [2]', val: '"Mac"' },
                        { key: '"age"', idx: 'Hash -> Slot [5]', val: '25' },
                        { key: '"gpa"', idx: 'Hash -> Slot [0]', val: '3.8' }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                          <div className="text-[11px] font-bold text-slate-500 font-sans uppercase mb-1">Key (กุญแจ)</div>
                          <div className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg w-full text-center">
                            {item.key}
                          </div>
                          
                          <div className="my-2 text-[10px] font-mono text-zinc-400 font-bold flex flex-col items-center">
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 rotate-90 my-0.5" />
                            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-sans">{item.idx}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 rotate-90 my-0.5" />
                          </div>

                          <div className="text-[11px] font-bold text-slate-500 font-sans uppercase mb-1">Value (ค่าข้อมูล)</div>
                          <div className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg w-full text-center">
                            {item.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed font-sans">
                  <div className="flex items-start gap-2 bg-indigo-50/50 border border-indigo-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <p><strong>Hash Function:</strong> เบื้องหลังระบบจะนำ Key ไปคำนวณผ่านฟังก์ชันแฮชเพื่อระบุ Slot ดัชนีในตาราง เพื่อดึงค่า Value ออกมาโดยไม่ต้องค้นหาทีละตำแหน่ง</p>
                  </div>
                  <div className="flex items-start gap-2 bg-amber-50/50 border border-amber-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p><strong>Unique Keys Constraint:</strong> กุญแจ (Key) แต่ละตัวห้ามซ้ำกัน แต่ค่าข้อมูล (Value) สามารถซ้ำกันได้ตามความต้องการ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Pros & Cons ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              การประเมินประสิทธิภาพ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ข้อดีและข้อเสียของ Dictionary
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Pros card */}
            <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-emerald-950 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ข้อดีเด่นของ Dictionary
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>ความเร็วสืบค้นสม่ำเสมอ $O(1)$ (Constant Time):</strong> ค้นหา เพิ่ม และลบข้อมูลได้ด้วยความเร็วคงที่ทันที ไม่ว่าปริมาณข้อมูลจะสเกลใหญ่ระดับล้านโหนดก็ตาม
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>โครงสร้างแบบกึ่งโครงสร้าง (Semi-structured):</strong> เก็บข้อมูลอธิบายลักษณะเฉพาะแบบจับกลุ่มได้ยืดหยุ่นกว่า Array ลำดับตัวเลข
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 text-xs font-semibold text-emerald-800 font-mono">
                RECOMMENDED FOR: INSTANT LOOKUPS & ID-VALUE ASSOCIATIONS
              </div>
            </div>

            {/* Cons card */}
            <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-rose-950 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                  ข้อเสียและข้อจำกัดของ Dictionary
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>การสูญเสียพื้นที่แรมสำรอง (Memory Overhead):</strong> ตารางแฮชต้องจองพื้นที่แรมให้กว้างกว่าขนาดข้อมูลจริงค่อนข้างมาก เพื่อลดปัญหาแฮชชนกัน
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>ปัญหาแฮชชนกัน (Hash Collision):</strong> หากคำนวณตำแหน่งแล้วได้พิกัดช่องแรมเดียวกัน ระบบต้องมีกระบวนการแก้ไขที่ส่งผลให้ประสิทธิภาพความเร็วลดลงเหลือ $O(n)$ ชั่วคราว
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 text-xs font-semibold text-rose-800 font-mono">
                LIMITATION: MEMORY OVERHEAD & HASH COLLISION RESOLUTION
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section: Summary of Basic Dictionary Methods ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คู่มือวิทยาการคำนวณ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สรุปคำสั่งและฟังก์ชันพื้นฐานในการจัดการพจนานุกรม (Dictionary Summary)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            การดำเนินการกับตัวแปรประเภท Dictionary ในภาษา Python มีเมธอดและฟังก์ชันการจัดการมาตรฐานหลักในการควบคุมและเข้าถึงข้อมูลดังนี้:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: 'len(dict)',
                subtitle: 'ความยาวพจนานุกรม',
                description: 'ฟังก์ชันตรวจสอบจำนวนคู่ข้อมูล (Key-Value) ทั้งหมดที่บันทึกอยู่ใน Dictionary',
                code: 'len(user)',
                result: '3',
                titleClass: 'text-emerald-600',
                bgGradient: 'from-emerald-50/50 via-transparent to-transparent',
              },
              {
                title: '.get(key, def)',
                subtitle: 'ดึงข้อมูลปลอดภัย',
                description: 'ดึงค่าข้อมูลผ่าน Key หากไม่พบจะคืนค่าเริ่มต้น (default) แทนการหยุดชะงักของโปรแกรม',
                code: 'user.get("gpa", 4.0)',
                result: '3.8',
                titleClass: 'text-sky-500',
                bgGradient: 'from-sky-50/50 via-transparent to-transparent',
              },
              {
                title: '.keys()',
                subtitle: 'ดึงคีย์ทั้งหมด',
                description: 'ดึงรายการกุญแจ (Key) ทั้งหมดออกมาเพื่อทำการตรวจสอบหรือสั่งวนลูป',
                code: 'user.keys()',
                result: "['name', 'age', 'gpa']",
                titleClass: 'text-rose-500',
                bgGradient: 'from-rose-50/50 via-transparent to-transparent',
              },
              {
                title: '.values()',
                subtitle: 'ดึงค่าข้อมูลทั้งหมด',
                description: 'ดึงรายการเฉพาะข้อมูลดิบ (Value) ทั้งหมดออกมาอ้างอิงรวดเร็ว',
                code: 'user.values()',
                result: "['Mac', 25, 3.8]",
                titleClass: 'text-amber-500',
                bgGradient: 'from-amber-50/50 via-transparent to-transparent',
              },
              {
                title: '.pop(key)',
                subtitle: 'ลบคู่คีย์-ค่า',
                description: 'ลบคู่กุญแจและค่าออกจากหน่วยความจำ พร้อมส่งคืนค่า Value ของคู่ที่ถูกเอาออก',
                code: 'user.pop("age")',
                result: '25',
                titleClass: 'text-violet-500',
                bgGradient: 'from-violet-50/50 via-transparent to-transparent',
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top soft ambient light glow */}
                <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${card.bgGradient} opacity-60 pointer-events-none`} />

                <div className="space-y-3.5 relative z-10">
                  <span className={`block font-mono text-[18px] md:text-[20px] font-bold tracking-tight truncate ${card.titleClass}`}>
                    {card.title}
                  </span>
                  <div className="space-y-1.5">
                    <h4 className="text-[15px] font-bold text-slate-800 leading-tight">
                      {card.subtitle}
                    </h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed min-h-[54px]">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="bg-slate-50 border border-slate-100/60 rounded-xl p-3 flex flex-col gap-1 font-mono text-[11px] md:text-[12px] mt-4 relative z-10 w-full overflow-hidden">
                  <span className="text-slate-600 truncate">{card.code}</span>
                  <span className="text-indigo-600 font-bold self-end truncate">{card.result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 3: Interactive Hash Lab Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองตารางแฮช
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ห้องทดลองวิเคราะห์กลไกแฮชและการชนกันของคีย์ (Hash Collision)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองเพิ่มกุญแจข้อมูลลงในตารางแฮชขนาด 8 ช่องเสมือน โดยทดลองสั่งเพิ่มคีย์ปกติ และลองสั่งเพิ่มคีย์ที่แฮชได้ผลลัพธ์ดัชนีชนกัน 
            (เช่น <strong>"tag"</strong> กับ <strong>"gat"</strong>) เพื่อสังเกตขั้นตอนคำนวณและการตรวจสอบช่องแรมว่าง (Probing) แบบเป็นขั้นตอน:
          </p>

          <SimulatorShell
            dark
            title="Python Dictionary Hash Table & Probing Tracer"
            icon={<Cpu className="w-8 h-8 text-teal-400" />}
            glowColors="from-zinc-900/30 to-zinc-950/10"
            iconColor="text-teal-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Controller Panel (Left) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROLLER
                </div>

                <div className="space-y-6">
                  {/* Preset key selector */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกคีย์ข้อมูลที่จะแฮชลงหน่วยความจำ:</span>
                    <div className="flex flex-col gap-2">
                      {PRESET_KEYS.map((item, idx) => {
                        const isAdded = buckets.some(b => b && b.key === item.key);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (!isSimulating) {
                                setSelectedPresetIdx(idx);
                                setCurrentStep('idle');
                              }
                            }}
                            disabled={isSimulating}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 flex justify-between items-center text-xs font-semibold
                              ${selectedPresetIdx === idx
                                ? 'bg-indigo-650 border-indigo-500 text-white shadow shadow-indigo-500/20'
                                : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white'
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">"{item.key}" : "{item.val}"</span>
                              {isAdded && <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">ADDED</span>}
                            </div>
                            <span className="text-[10px] opacity-75 font-mono text-teal-400">{item.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Simulation Control Buttons */}
                <div className="mt-8 pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex gap-3">
                    <button
                      onClick={runInsertSimulation}
                      disabled={isSimulating}
                      className="grow bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] transition-all disabled:opacity-45"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> กำลังตรวจสอบระบบ...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> สั่งจำลองการแฮชบันทึก
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleClearTable}
                      disabled={isSimulating}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-40"
                    >
                      <RotateCcw className="w-4 h-4" /> ล้างตาราง
                    </button>
                  </div>

                  {/* Terminal Console Logs */}
                  <div className="bg-black/60 p-3.5 rounded-xl border border-slate-950 min-h-[120px] font-mono text-[11.5px] leading-relaxed text-teal-400 select-all overflow-y-auto max-h-[170px]">
                    <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-2 uppercase tracking-wide text-[9px] font-bold">Hash Trace Output console:</div>
                    {simLog.map((line, idx) => (
                      <div key={idx} className="animate-fadeIn">
                        <span className="text-zinc-500">&gt; </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Hash Table Visual Grid Display (Right) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  HASH BUCKETS TABLE VIEW
                </div>

                <div className="space-y-4 mt-6 grow flex flex-col justify-between">
                  
                  {/* Dynamic Slots */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">ตารางความจุหน่วยความจำ (Hash buckets [0-7]):</span>
                    
                    <div className="flex flex-col gap-2 bg-slate-900/40 border border-slate-900 p-4 rounded-xl">
                      {buckets.map((b, idx) => {
                        const isInspecting = idx === inspectingIdx;
                        const hasVal = b !== null;
                        
                        let cellClass = 'border-slate-800 bg-slate-950/20 text-slate-600 border-dashed';
                        if (hasVal) {
                          cellClass = 'border-indigo-650 bg-indigo-950/40 text-white';
                        }
                        if (isInspecting) {
                          if (currentStep === 'collision') {
                            cellClass = 'border-rose-500 bg-rose-950/60 text-rose-300 scale-[1.01] shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                          } else {
                            cellClass = 'border-teal-500 bg-teal-950/60 text-teal-300 scale-[1.01] shadow-[0_0_12px_rgba(20,184,166,0.3)]';
                          }
                        }

                        return (
                          <div
                            key={idx}
                            className={`border rounded-xl p-2.5 flex items-center justify-between text-xs font-mono transition-all duration-300
                              ${cellClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-slate-500">[{idx}]</span>
                              {hasVal ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-teal-400 font-bold">"{b.key}"</span>
                                  <span className="text-slate-400 font-sans">➔</span>
                                  <span className="text-indigo-200">"{b.val}"</span>
                                </div>
                              ) : (
                                <span className="text-slate-600 font-sans italic">-- ว่างเปล่า --</span>
                              )}
                            </div>

                            {hasVal && (
                              <div className="flex items-center gap-2 text-[10px] opacity-60">
                                <span>ASCII: {b.asciiSum}</span>
                                {b.probeCount > 0 && <span className="text-amber-400 font-bold bg-amber-950/60 px-1 rounded">PROBED +{b.probeCount}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Math Formula Bar */}
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] leading-relaxed text-slate-400">
                    <span className="text-teal-400 font-bold block mb-1">คณิตศาสตร์การแฮช (Mathematical formula bar):</span>
                    {currentStep === 'idle' ? (
                      'สแตนด์บายคำนวณ: เลือก preset คีย์แล้วกดปุ่มสั่งประมวลผลแฮชบันทึก'
                    ) : (
                      <div>
                        <span>Hash function: </span>
                        <code className="text-white">index = (sum of ASCII codes of key) % table_size</code>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Section 4: Python Dictionary Syntax & Usage ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คู่มือเขียนรหัสโปรแกรม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              วิธีการใช้งานโครงสร้าง Dictionary ในภาษา Python
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การประกาศและใช้คู่กุญแจและค่าข้อมูลมีรูปแบบที่เข้าใจง่าย พร้อมเมธอดมาตรฐานในการเข้าถึงออบเจกต์ภายในดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1. การประกาศและดึงข้อมูล (Init & Read)",
                desc: "ใช้ปีกกา {} ประกาศคู่ข้อมูล และดึงค่าผ่านคีย์ตรงๆ",
                code: `# สร้าง Dictionary\nuser = {"name": "Mac", "age": 25}\n\n# ดึงข้อมูลผ่านคีย์ตรงๆ O(1)\nprint(user["name"])  # ได้ค่า "Mac"`,
                accent: "indigo"
              },
              {
                title: "2. การเพิ่มและแก้ไขข้อมูล (Insert & Update)",
                desc: "อ้างอิงคีย์เพื่อกำหนดค่าใหม่ หากคีย์นั้นยังไม่มีระบบจะเพิ่มเข้าให้ทันที",
                code: `# แก้ไขข้อมูล O(1)\nuser["age"] = 26\n\n# เพิ่มคีย์-ค่าใหม่ O(1)\nuser["gpa"] = 3.8`,
                accent: "cyan"
              },
              {
                title: "3. เมธอดสืบค้นข้อมูล (Iterate dict)",
                desc: "ดึงคีย์ทั้งหมด ดึงค่าทั้งหมด หรือดึงค่าแบบทีละคู่เพื่อวนลูปใช้งาน",
                code: `# ดึงคีย์ทั้งหมด\nkeys = user.keys()\n\n# วนลูปจับคู่\nfor k, v in user.items():\n    print(f"Key: {k}, Val: {v}")`,
                accent: "emerald"
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-sm rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between min-h-[220px]">
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px] leading-tight mb-1">{card.title}</h4>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed mb-4">{card.desc}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-[11.5px] text-slate-700 leading-normal whitespace-pre">
                  <code>{card.code}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: ปฏิบัติการจัดการ Dictionary ใน Python"
          pin="1122"
          taskText={`[โจทย์ปฏิบัติการหลักสูตรรายวิชาโครงสร้างข้อมูล 21900-1002]
โจทย์ปฏิบัติการจัดการ Dictionary ใน Python ให้นักเรียนเขียนคำสั่งต่อไปนี้:

1. สร้างดิกชันนารีว่างชื่อ student และเขียนคำสั่งเพิ่มคีย์ "name" ที่มีค่า (value) เป็น "Somchai" เข้าไป
2. กำหนดให้ user = {"username": "john_doe", "score": 50} จงเขียนคำสั่งเพื่ออัปเดตค่า score ให้กลายเป็น 100
3. กำหนดให้ capitals = {"Thailand": "Bangkok", "Japan": "Tokyo"} จงเขียนคำสั่งเพื่อดึงชื่อเมืองหลวงของ "Japan" ออกมา
4. กำหนดให้ inventory = {"apple": 10, "banana": 5, "orange": 8} จงเขียนคำสั่งเพื่อลบคีย์ "banana" ออกจากดิกชันนารี
5. กำหนดให้ employee = {"id": 101, "name": "Anna", "salary": 25000} จงเขียนคำสั่งหาจำนวนคู่ Key-Value ทั้งหมดในดิกชันนารีนี้

เฉลย Dictionary:
1. student = {} ตามด้วย student["name"] = "Somchai"
2. user["score"] = 100 (หรือใช้ user.update({"score": 100}))
3. capitals["Japan"] (หรือ capitals.get("Japan"))
4. inventory.pop("banana") (หรือ del inventory["banana"])
5. len(employee)`}
        />

      </main>

    </div>
  );
}
