import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  SectionBlock,
  AmbientBackdrop
} from '../shared';
import {
  Layers,
  Database,
  ArrowRight,
  Sparkles,
  Cpu,
  Activity,
  Code,
  Zap,
  Info,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Search,
  Plus,
  Network
} from 'lucide-react';

export default function DSA1_8() {
  // ─── Layer 1: Ambient Background Blobs (Indigo & Emerald Theme) ───────────
  const DSA1_8_BLOBS = [
    { color: 'bg-emerald-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32',   opacity: 'opacity-40' },
    { color: 'bg-indigo-200',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32',  opacity: 'opacity-35' },
    { color: 'bg-cyan-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-slate-200',   size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3',    opacity: 'opacity-25' }
  ];

  // ─── Simulator States ──────────────────────────────────────────────────────
  const [simMode, setSimMode] = useState('memory'); // memory | speed
  const [selectedType, setSelectedType] = useState('list'); // list | tuple | dict | set
  const [dataInput, setDataInput] = useState('');
  const [dictValueInput, setDictValueInput] = useState('');
  
  // Data stores for Memory Mode
  const [listData, setListData] = useState(['Apple', 'Banana', 'Cherry']);
  const [tupleData, setTupleData] = useState(['Red', 'Green', 'Blue']);
  const [dictData, setDictData] = useState({ 'A': 100, 'B': 200, 'C': 300 });
  const [setData, setSetData] = useState(['Orange', 'Lemon', 'Lime']);
  
  // Simulation Feedback
  const [simFeedback, setSimFeedback] = useState('ระบบพร้อมจำลองโครงสร้างหน่วยความจำเรียลไทม์');
  const [errorFeedback, setErrorFeedback] = useState('');
  const [hashFlow, setHashFlow] = useState(null); // { key, hash, bucket } or null
  const [isDuplicateSet, setIsDuplicateSet] = useState(false);

  // Speed Mode states
  const [dataScale, setDataScale] = useState(25000); // 1,000 to 100,000 slider
  const [searchTarget, setSearchTarget] = useState('TARGET_ELEMENT');
  const [runCompetition, setRunCompetition] = useState(false);
  const [times, setTimes] = useState({ list: 0, tuple: 0, dict: 0, set: 0 });

  // ─── Computational & Insert Logic ──────────────────────────────────────────
  
  // Basic Hash Function for Simulator (computes hash index out of 8 buckets)
  const computeHashIndex = (val) => {
    let hash = 0;
    const str = String(val);
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 8; // 8 buckets limit in visualization
  };

  const handleInsert = (e) => {
    e.preventDefault();
    setErrorFeedback('');
    setIsDuplicateSet(false);
    setHashFlow(null);

    const rawVal = dataInput.trim();
    if (!rawVal) {
      setErrorFeedback('กรุณากรอกข้อมูลที่ต้องการป้อนเข้าสู่ระบบ');
      return;
    }

    if (selectedType === 'list') {
      setListData(prev => [...prev, rawVal]);
      setSimFeedback(`[List Insert] เพิ่ม "${rawVal}" เข้าสู่โครงสร้างต่อจากลำดับเดิม ดัชนี index = ${listData.length} (ความซับซ้อนเฉลี่ย O(1) แบบ Amortized)`);
      setDataInput('');
    } 
    
    else if (selectedType === 'tuple') {
      setErrorFeedback('❌ [Tuple Blocked] ไม่สามารถเพิ่มข้อมูลได้เนื่องจาก Tuple มีพฤติกรรมคงที่แบบ Immutable (ล็อกแรมถาวร)');
    } 
    
    else if (selectedType === 'dict') {
      const vVal = dictValueInput.trim();
      if (!vVal) {
        setErrorFeedback('กรุณาระบุ Value สำหรับจับคู่ Key-Value Pair ของ Dictionary');
        return;
      }
      
      const parsedVal = isNaN(vVal) ? vVal : Number(vVal);
      const bucket = computeHashIndex(rawVal);
      
      setHashFlow({
        key: rawVal,
        hash: `hash("${rawVal}") = ${rawVal.charCodeAt(0) || 0}`,
        bucket: bucket
      });

      setDictData(prev => ({ ...prev, [rawVal]: parsedVal }));
      setSimFeedback(`[Dict Insert] คีย์ "${rawVal}" วิ่งเข้าท่อ Hash คำนวณแฮชลง Bucket หมายเลข ${bucket} จับคู่ค่า ${parsedVal} ประสิทธิภาพ O(1)`);
      setDataInput('');
      setDictValueInput('');
    } 
    
    else if (selectedType === 'set') {
      if (setData.includes(rawVal)) {
        setIsDuplicateSet(true);
        setErrorFeedback(`🚫 [Set Blocked] สมาชิก "${rawVal}" ซ้ำในระบบ! กฎความเป็นเอกลักษณ์ (Unique) ปฏิเสธการนำเข้า`);
        setSimFeedback(`[Set Duplicate] ตรวจพบข้อมูล "${rawVal}" ซ้ำกันใน Hash Table - ละทิ้งโดยอัตโนมัติ`);
        return;
      }

      const bucket = computeHashIndex(rawVal);
      setHashFlow({
        key: rawVal,
        hash: `hash("${rawVal}") = ${rawVal.charCodeAt(0) || 0}`,
        bucket: bucket
      });

      setSetData(prev => [...prev, rawVal]);
      setSimFeedback(`[Set Insert] สมาชิกใหม่ "${rawVal}" วิ่งผ่านแฮชลงช่อง Bucket หมายเลข ${bucket} ความเร็วคงที่ O(1)`);
      setDataInput('');
    }
  };

  const handleResetData = () => {
    setListData(['Apple', 'Banana', 'Cherry']);
    setTupleData(['Red', 'Green', 'Blue']);
    setDictData({ 'A': 100, 'B': 200, 'C': 300 });
    setSetData(['Orange', 'Lemon', 'Lime']);
    setHashFlow(null);
    setIsDuplicateSet(false);
    setErrorFeedback('');
    setSimFeedback('รีเซ็ตข้อมูลตัวอย่างในแรมชั่วคราวเรียบร้อยแล้ว');
  };

  // ─── Speed Competition Logic ───
  const startSpeedCompetition = () => {
    setRunCompetition(true);
    setSimFeedback('🏁 เริ่มทำการค้นหาคำศัพท์ในปริมาณ N ขนาดใหญ่บนแรมจำลอง...');
    
    // Simulate real relative times based on N and theoretical complexities
    // Dict/Set = O(1) Constant (almost unchanged with N)
    // List/Tuple = O(N) Linear (scales with N, Tuple slightly faster due to lower overhead)
    setTimeout(() => {
      const baseDictTime = 0.001; // Constant
      const baseSetTime = 0.0011; // Constant
      
      const listSearchTime = (dataScale * 0.00018); // Linear O(N)
      const tupleSearchTime = (dataScale * 0.00014); // Linear O(N), but 20-30% faster than List due to cache friendly C-array allocation
      
      setTimes({
        list: listSearchTime,
        tuple: tupleSearchTime,
        dict: baseDictTime,
        set: baseSetTime
      });
      
      setRunCompetition(false);
      setSimFeedback(`🏁 แข่งขันค้นหาเสร็จสิ้น! เมื่อ N = ${dataScale.toLocaleString()} แฟ้มข้อมูล, ค้นหาใน Dict/Set แบบ O(1) เร็วกว่าลูปเรียงตัวใน List แบบ O(n) ชัดเจน`);
    }, 1200);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_8_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Introduction ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              โครงสร้างข้อมูลสำเร็จรูป / Python C-Level Types SOT
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              Built-in Data Types ของ Python
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ภาษา Python มาพร้อมกับโครงสร้างข้อมูลสำเร็จรูปที่ผ่านการปรับแต่งความเร็วสูงสุดในระดับภาษา C 
            การศึกษาความต่างของพฤติกรรมในหน่วยความจำ และความซับซ้อนของขั้นตอนวิธีเบื้องหลังตัวเก็บข้อมูลทั้ง 4 ตัว 
            (List, Tuple, Dictionary, Set) จะช่วยให้การพัฒนาซอฟต์แวร์ประมวลผลได้อย่างรวดเร็วและใช้แรมอย่างเหมาะสม
          </p>
        </section>

        {/* ─── Section 2: Theory Stacking (Vertical Stacking) ─── */}
        <section className="space-y-10">

          {/* Subtopic 1 */}
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                A
              </span>
              List และการประยุกต์ใช้ (List and Applications)
            </h4>

            <div className="space-y-3.5 text-zinc-600 text-[15px] leading-relaxed">
              <p>
                แม้ว่าวิศวกรและนักพัฒนาจะเรียกใช้ <code className="text-emerald-700">List</code> อย่างแพร่หลาย 
                แต่กลไกเบื้องหลังในระดับแรมของ Python ทำงานด้วยโครงสร้าง{' '}
                <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-100/80 font-mono text-sm">
                  Dynamic Array
                </span>{' '}
                ซึ่งเก็บค่าสมาชิกเรียงตามลำดับดัชนีอย่างเป็นระบบ โดยมีลักษณะสำคัญดังนี้:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-200/50">
                  <span className="font-bold text-slate-800 block text-xs mb-1">Index-based Access - O(1)</span>
                  <p className="text-[11.5px] text-zinc-500 leading-normal">
                    การเข้าถึงสมาชิกผ่านค่าดัชนีระบุตรง เช่น `data[2]` ทำงานด้วยความเร็วคงที่เสมอเนื่องจากคำนวณตำแหน่งจองแรมได้ทันที
                  </p>
                </div>
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-200/50">
                  <span className="font-bold text-slate-800 block text-xs mb-1">Mutable Behavior</span>
                  <p className="text-[11.5px] text-zinc-500 leading-normal">
                    ยินยอมให้เพิ่ม ลบ หรือสลับค่าข้อมูลในจุดเดิมได้อย่างเสรี และสามารถมีสมาชิกที่มีข้อมูลซ้ำกันได้ตามความต้องการ
                  </p>
                </div>
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-200/50">
                  <span className="font-bold text-slate-800 block text-xs mb-1">แทรกด่านแรกสุด - O(n)</span>
                  <p className="text-[11.5px] text-zinc-500 leading-normal">
                    การแทรกข้อมูลด้านหน้าสุดหรือตรงกลางระบบ ต้องขยับดัชนีของสมาชิกตัวที่เหลือถอยหลังไปทั้งหมด ทำให้เกิดต้นทุนการวนรอบสูง
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subtopic 2 */}
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                B
              </span>
              Tuple และข้อจำกัด (Tuple and Limitations)
            </h4>

            <div className="space-y-4 text-zinc-600 text-[15px] leading-relaxed">
              <p>
                <code className="text-indigo-700">Tuple</code> เป็นชนิดข้อมูลที่เก็บสมาชิกเรียงลำดับคล้ายคลึงกับ List 
                แต่ถูกสร้างขึ้นมาเพื่อวัตถุประสงค์ความคงที่ของข้อมูล โดยทำงานภายใต้กฎ{' '}
                <span className="bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-100/80 font-mono text-sm">
                  Immutable
                </span>{' '}
                อย่างเคร่งครัด:
              </p>

              <div className="bg-indigo-50/50 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[4px] border-l-indigo-500 leading-relaxed text-xs">
                <h5 className="font-bold text-indigo-900 text-sm mb-1.5 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-[10px] uppercase font-mono font-extrabold text-indigo-700 border border-indigo-200">ข้อจำกัดและขีดความสามารถทางแรม</span>
                </h5>
                <p className="text-[13px] text-slate-600 mb-2 leading-relaxed">
                  เนื่องจาก Tuple ห้ามแทรก เพิ่ม หรือลบข้อมูลใดๆ สถาปัตยกรรม Python จึงจัดสรรแรมให้เท่ากับขนาดที่ต้องการพอดีโดยปราศจาก "หน่วยความจำเผื่อขยายขนาด (No Memory Allocation Overhead)" ส่งผลให้ Tuple ใช้ทรัพยากรแรมน้อยกว่า List และทำงานในลูปประมวลผลได้รวดเร็วกว่า
                </p>
                <p className="text-[12.5px] text-slate-500 italic">
                  การประยุกต์ใช้จริง: การตั้งค่าพิกัดภูมิศาสตร์ `(lat, lon)`, ตัวแปรสี `(R, G, B)` หรือกลุ่มตัวแปรคงที่ไม่แปรผัน
                </p>
              </div>
            </div>
          </div>

          {/* Subtopic 3 */}
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                C
              </span>
              Dictionary และหลักการทำงาน (Dictionary and Hashing)
            </h4>

            <div className="space-y-3.5 text-zinc-600 text-[15px] leading-relaxed">
              <p>
                ในการจัดการข้อมูลที่ต้องการค้นหาอย่างฉับพลัน <code className="text-emerald-700">Dictionary</code> เป็นเครื่องมือที่มีประสิทธิภาพสูงที่สุด 
                เก็บข้อมูลคู่พจนานุกรม <span className="font-bold text-slate-800">Key-Value Pair</span> 
                เบื้องหลังการประมวลผลขับเคลื่อนด้วยกลไก{' '}
                <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-100/80 font-mono text-sm">
                  Hash Table
                </span>{' '}
                ตามหลักวิศวกรรมคอมพิวเตอร์สากล:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50 space-y-1.5">
                  <span className="font-bold text-slate-800 block text-xs uppercase tracking-wide text-emerald-700">กลไก Hash Function</span>
                  <p className="text-[12.5px] text-zinc-500 leading-relaxed">
                    เมื่อผู้ใช้งานระบุคีย์ ระบบจะส่งคีย์ไปคำนวณผ่านสมการคณิตศาสตร์เรียกว่า Hash Function เพื่อถอดรหัสออกมาเป็นตัวเลขดัชนี (Hash Code) และพุ่งไปหาช่องเก็บข้อมูล (Bucket) ในหน่วยความจำชั่วคราวโดยตรง
                  </p>
                </div>
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50 space-y-1.5">
                  <span className="font-bold text-slate-800 block text-xs uppercase tracking-wide text-emerald-700">ความเร็วระนาบคงที่ - O(1)</span>
                  <p className="text-[12.5px] text-zinc-500 leading-relaxed">
                    เนื่องจากรู้ช่องแรมที่จะไปทันทีโดยไม่ต้องวนรอบค้นหา (เหมือนการเทียบข้อมูลสมาชิกรวมใน List) ทำให้ Dictionary สามารถค้นหา เพิ่ม และลบข้อมูลได้ด้วยประสิทธิภาพคงที่ O(1) เสมอ แม้ระบบจะมีคีย์เป็นล้านตัวก็ตาม
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subtopic 4 */}
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                D
              </span>
              Set และทฤษฎีเซต (Set and Set Theory)
            </h4>

            <div className="space-y-3.5 text-zinc-600 text-[15px] leading-relaxed">
              <p>
                <code className="text-indigo-700">Set</code> เป็นโครงสร้างข้อมูลที่ไม่สนใจอันดับก่อนหลัง (Unordered) 
                และมีกฎเหล็กที่สำคัญคือ **"ห้ามมีสมาชิกข้อมูลซ้ำกันเด็ดขาด (Unique Elements Only)"** 
                เบื้องหลังการทำงานอาศัยกลไก Hash Table เช่นเดียวกับ Dictionary ส่งผลให้สามารถระบุคีย์ตรวจสอบค่าได้ทันที
              </p>

              <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                <span className="font-bold text-slate-800 block text-xs mb-2">ความสามารถร่วมของฟังก์ชันทฤษฎีเซตทางคณิตศาสตร์สากล:</span>
                
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <li className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-slate-200/50">
                    <span className="text-emerald-600 font-extrabold text-sm">∪</span>
                    <span><strong>Union</strong>: รวมชุดสมาชิกทั้งหมด</span>
                  </li>
                  <li className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-slate-200/50">
                    <span className="text-emerald-600 font-extrabold text-sm">∩</span>
                    <span><strong>Intersection</strong>: เลือกเฉพาะสมาชิกที่ซ้ำกัน</span>
                  </li>
                  <li className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-slate-200/50">
                    <span className="text-emerald-600 font-extrabold text-sm">−</span>
                    <span><strong>Difference</strong>: เลือกเฉพาะสมาชิกที่ไม่ซ้ำกับอีกกลุ่ม</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: PyDataTypes-Sim (Interactive Simulation Sandbox) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              เปรียบเทียบกลไกประสิทธิภาพเชิงประจักษ์ / PyDataTypes-Sim
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แผงจำลองโครงสร้างข้อมูลพื้นฐานและการประเมินความเร็วประมวลผล (PyDataTypes-Sim)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองสลับโหมดการจำลองระหว่าง **การจัดเรียงแรม (Memory Layout)** เพื่อวิเคราะห์สายท่อ Hashing 
            และ **การวิเคราะห์การค้นหาความเร็วสูง (Speed Sandbox)** เพื่อประจักษ์ความต่างของอัลกอริทึมเวลาบิ๊กโอในภาษา Python:
          </p>

          <SimulatorShell
            dark
            title="Python Built-in Types Architecture Sandbox"
            icon={<Network className="w-8 h-8 text-emerald-400 animate-pulse" />}
            glowColors="from-slate-800/40 to-slate-950/15"
            iconColor="text-emerald-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Sandbox Control Panel (Dark Theme) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[490px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROL SANDBOX
                </span>

                <div className="space-y-5">
                  
                  {/* Mode Selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      1. เลือกโหมดตัวจำลอง (Simulation Mode):
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { setSimMode('memory'); setHashFlow(null); setErrorFeedback(''); }}
                        className={`py-2 rounded-xl border text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                          simMode === 'memory'
                            ? 'bg-slate-800 text-emerald-400 border-emerald-500/80 shadow'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Memory & Hashing (แรม)
                      </button>
                      <button
                        onClick={() => { setSimMode('speed'); setErrorFeedback(''); }}
                        className={`py-2 rounded-xl border text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                          simMode === 'speed'
                            ? 'bg-slate-800 text-cyan-400 border-cyan-500/80 shadow'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Speed Competition (ความเร็ว)
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Controls based on selected Mode */}
                  {simMode === 'memory' ? (
                    <>
                      {/* Sub-controls Memory Mode */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                          2. เลือกชนิดโครงสร้างข้อมูล Python:
                        </span>
                        <div className="grid grid-cols-4 gap-1.5 font-mono text-[10.5px]">
                          {[
                            { id: 'list', label: 'List' },
                            { id: 'tuple', label: 'Tuple' },
                            { id: 'dict', label: 'Dict' },
                            { id: 'set', label: 'Set' }
                          ].map(t => (
                            <button
                              key={t.id}
                              onClick={() => { setSelectedType(t.id); setErrorFeedback(''); setHashFlow(null); setIsDuplicateSet(false); }}
                              className={`py-1.5 rounded-lg border font-bold transition-all cursor-pointer text-center ${
                                selectedType === t.id
                                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/70 shadow'
                                  : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Insertion Panel */}
                      <form onSubmit={handleInsert} className="space-y-3 pt-2 border-t border-slate-800">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                          3. ป้อนและจำลองข้อมูลเข้า (Insert Simulation):
                        </span>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder={selectedType === 'dict' ? 'กรอก Key (เช่น Name)' : 'กรอกข้อความทั่วไป'}
                            value={dataInput}
                            onChange={e => setDataInput(e.target.value)}
                            className="grow bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                          />

                          {selectedType === 'dict' && (
                            <input
                              type="text"
                              placeholder="Value"
                              value={dictValueInput}
                              onChange={e => setDictValueInput(e.target.value)}
                              className="w-1/3 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                            />
                          )}

                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Insert
                          </button>
                        </div>

                        {errorFeedback && (
                          <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs font-sans text-rose-400 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 animate-pulse" />
                            <span>{errorFeedback}</span>
                          </div>
                        )}

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={handleResetData}
                            className="text-[10px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            รีเซ็ตหน่วยความจำจำลอง
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      {/* Speed Sandbox Controls */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                            <span>2. ปรับปริมาณข้อมูลนำเข้า N:</span>
                            <span className="text-cyan-400 font-mono text-xs">{dataScale.toLocaleString()} แฟ้มคำศัพท์</span>
                          </div>
                          <input
                            type="range"
                            min="1000"
                            max="100000"
                            step="5000"
                            value={dataScale}
                            onChange={e => setDataScale(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                          />
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-800">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                            3. ค้นหาคำศัพท์ท้ายข้อมูลระบบ:
                          </span>
                          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                            <div className="flex justify-between items-center text-zinc-500">
                              <span>เป้าหมายการค้นหา:</span>
                              <span className="text-white font-bold">"{searchTarget}"</span>
                            </div>
                            <div className="text-[10.5px] text-zinc-600 leading-relaxed">
                              ระบบจะจำลองการทำงานของ Python ค้นหาข้อมูลตำแหน่งท้ายสุดของ N แถว โดย List/Tuple จะต้องวนลูปสแกนอ่านดัชนีเรียงตัว $O(n)$ ขณะที่ Dict/Set จะวิ่งผ่านท่อแฮชและหยิบค่าทันที $O(1)$
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={startSpeedCompetition}
                          disabled={runCompetition}
                          className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            runCompetition
                              ? 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
                              : 'bg-cyan-500 hover:bg-cyan-600 text-cyan-950 shadow shadow-cyan-950/40'
                          }`}
                        >
                          <Search className="w-3.5 h-3.5" />
                          {runCompetition ? 'กำลังคำนวณการทำงาน...' : 'เริ่มการทดสอบความเร็วค้นหา (LIVE)'}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Live Feedback Log */}
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11.5px] leading-relaxed text-emerald-400 bg-black/45 p-3 rounded-xl border border-slate-800 font-sans min-h-[75px]">
                  <span className="text-zinc-500 block text-[9px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-slate-500" />
                    Terminal Log Output:
                  </span>
                  {simFeedback}
                </div>
              </div>

              {/* Right Memory Area & Graph Canvas Board (Dark Theme) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[490px]">
                
                {/* Board Label */}
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 absolute top-3 left-4 right-4">
                  <span>PYTHON MEMORY & COMPILATION VIEW</span>
                  <span className="text-slate-400">BIG O ALGORITHM ENGINE</span>
                </div>

                {/* Visual rendering canvas area */}
                <div className="grow flex items-center justify-center mt-6">
                  <div className="w-full h-[320px] bg-slate-900/40 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center p-2 shadow-inner">
                    
                    {simMode === 'memory' ? (
                      <svg className="w-full h-full" viewBox="0 0 600 320">
                        
                        {/* Defining SVG markers */}
                        <defs>
                          <marker
                            id="hashArrow"
                            viewBox="0 0 10 10"
                            refX="6"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                          >
                            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                          </marker>
                        </defs>

                        {/* Layout header title mapping */}
                        <text x="300" y="25" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold font-mono tracking-wider">
                          {selectedType.toUpperCase()} DATA ALLOCATION MODEL
                        </text>

                        {/* ==================== LIST & TUPLE MEMORY LAYOUT ==================== */}
                        {(selectedType === 'list' || selectedType === 'tuple') && (
                          <g className="transition-all duration-300">
                            {/* Layout boundary label */}
                            <rect x="50" y="55" width="500" height="210" rx="16" fill="#0f172a/70" stroke={selectedType === 'tuple' ? '#475569' : '#10b981'} strokeWidth="1.8" />
                            
                            {/* Flag label for mutable/immutable status */}
                            <rect x="70" y="70" width="160" height="26" rx="6" fill={selectedType === 'tuple' ? '#450a0a' : '#064e3b'} />
                            <text x="150" y="86" fill={selectedType === 'tuple' ? '#fca5a5' : '#a7f3d0'} textAnchor="middle" className="text-[9.5px] font-bold font-mono">
                              {selectedType === 'tuple' ? '🔒 IMMUTABLE TUPLE' : '🔓 MUTABLE LIST'}
                            </text>

                            {/* Allocation details */}
                            <text x="520" y="86" fill="#64748b" textAnchor="end" className="text-[9.5px] font-mono">
                              {selectedType === 'tuple' ? 'No Overhead Allocation' : 'Overallocated Space (Capacity: 8)'}
                            </text>

                            {/* Elements Slots */}
                            <g>
                              {(selectedType === 'list' ? listData : tupleData).map((item, idx) => {
                                const colWidth = 90;
                                const startX = 80 + idx * 105;
                                return (
                                  <g key={idx} className="transition-all duration-300">
                                    {/* Slot rectangle */}
                                    <rect x={startX} y={120} width={colWidth} height={70} rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                                    
                                    {/* Index label below */}
                                    <rect x={startX + 25} y={200} width={40} height={20} rx="5" fill="#334155" />
                                    <text x={startX + 45} y={214} fill="#e2e8f0" textAnchor="middle" className="text-[10px] font-bold font-mono">
                                      index {idx}
                                    </text>

                                    {/* String Value */}
                                    <text x={startX + 45} y={160} fill="#10b981" textAnchor="middle" className="text-xs font-bold font-mono truncate">
                                      "{item}"
                                    </text>
                                  </g>
                                );
                              })}

                              {/* Overallocated Empty Slots (Only for Dynamic Array List representation to show overhead) */}
                              {selectedType === 'list' && listData.length < 5 && (
                                <g>
                                  {[...Array(5 - listData.length)].map((_, i) => {
                                    const idx = listData.length + i;
                                    const startX = 80 + idx * 105;
                                    if (startX > 480) return null;
                                    return (
                                      <g key={idx} className="opacity-30">
                                        <rect x={startX} y={120} width={90} height={70} rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" strokeDasharray="3 4" />
                                        <text x={startX + 45} y={160} fill="#64748b" textAnchor="middle" className="text-[9.5px] font-mono italic">
                                          (Empty)
                                        </text>
                                        <text x={startX + 45} y={214} fill="#475569" textAnchor="middle" className="text-[9.5px] font-mono">
                                          index {idx}
                                        </text>
                                      </g>
                                    );
                                  })}
                                </g>
                              )}
                            </g>
                          </g>
                        )}

                        {/* ==================== DICTIONARY & SET MEMORY LAYOUT (HASH TABLES) ==================== */}
                        {(selectedType === 'dict' || selectedType === 'set') && (
                          <g className="transition-all duration-300">
                            
                            {/* Hash Function Pipe Graphical element */}
                            <g className="transition-all duration-300">
                              <rect x="40" y="110" width="130" height="90" rx="14" fill="#065f46/80" stroke="#10b981" strokeWidth="2" />
                              <text x="105" y="138" fill="#a7f3d0" textAnchor="middle" className="text-[10px] font-extrabold font-mono uppercase tracking-wider">Hash Function</text>
                              <rect x="52" y="150" width="106" height="34" rx="8" fill="#022c22" stroke="#047857" />
                              <text x="105" y="171" fill="#34d399" textAnchor="middle" className="text-[9px] font-mono font-bold">
                                {hashFlow ? hashFlow.hash : 'กำลังรออินพุต...'}
                              </text>
                            </g>

                            {/* Hash Buckets Grid (Right area) */}
                            <g className="transition-all duration-300">
                              {[...Array(8)].map((_, i) => {
                                const bucketX = i < 4 ? 220 : 410;
                                const bucketY = 60 + (i % 4) * 60;
                                
                                // Determine if this bucket has value
                                let matchingKey = null;
                                let matchingValue = null;
                                
                                if (selectedType === 'dict') {
                                  // Find key that hashes to i
                                  Object.keys(dictData).forEach(key => {
                                    if (computeHashIndex(key) === i) {
                                      matchingKey = key;
                                      matchingValue = dictData[key];
                                    }
                                  });
                                } else {
                                  // Set
                                  setData.forEach(val => {
                                    if (computeHashIndex(val) === i) {
                                      matchingKey = val;
                                    }
                                  });
                                }

                                const isFlowBucket = hashFlow && hashFlow.bucket === i;

                                return (
                                  <g key={i} className="transition-all duration-300">
                                    {/* Bucket slot box */}
                                    <rect
                                      x={bucketX}
                                      y={bucketY}
                                      width={170}
                                      height={46}
                                      rx="8"
                                      fill="#1e293b/90"
                                      stroke={isFlowBucket ? '#10b981' : (matchingKey ? '#047857' : '#334155')}
                                      strokeWidth={isFlowBucket ? '2' : '1'}
                                      className={isFlowBucket ? 'animate-pulse' : ''}
                                    />
                                    
                                    {/* Index tag */}
                                    <rect x={bucketX + 6} y={bucketY + 13} width={20} height={20} rx="4" fill="#0f172a" />
                                    <text x={bucketX + 16} y={26} fill="#64748b" textAnchor="middle" className="text-[8.5px] font-mono font-bold" transform={`translate(0, ${bucketY + 1})`}>
                                      {i}
                                    </text>

                                    {/* Bucket Content display */}
                                    {matchingKey ? (
                                      <text x={bucketX + 36} y={26} fill="#e2e8f0" className="text-[10px] font-mono font-bold" transform={`translate(0, ${bucketY + 1})`}>
                                        {selectedType === 'dict' ? `"${matchingKey}": ${matchingValue}` : `"${matchingKey}"`}
                                      </text>
                                    ) : (
                                      <text x={bucketX + 36} y={26} fill="#475569" className="text-[9.5px] font-mono italic" transform={`translate(0, ${bucketY + 1})`}>
                                        (Empty bucket)
                                      </text>
                                    )}

                                    {/* Highlight Flow Input pointer arrow */}
                                    {isFlowBucket && (
                                      <path
                                        d={i < 4
                                          ? `M 170,155 C 190,155 190,${bucketY + 23} 210,${bucketY + 23}`
                                          : `M 170,155 C 220,155 300,280 395,${bucketY + 23}`
                                        }
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="2"
                                        markerEnd="url(#hashArrow)"
                                      />
                                    )}
                                  </g>
                                );
                              })}
                            </g>

                            {/* Duplicate Block animation cover */}
                            {isDuplicateSet && (
                              <g className="transition-all duration-300">
                                <rect x="150" y="100" width="300" height="120" rx="16" fill="#7f1d1d/95" stroke="#ef4444" strokeWidth="2.5" />
                                <circle cx="300" cy="140" r="18" fill="#ef4444" />
                                <text x="300" y="145" fill="#ffffff" textAnchor="middle" className="text-sm font-extrabold">✕</text>
                                <text x="300" y="178" fill="#fca5a5" textAnchor="middle" className="text-xs font-bold font-mono">DUPLICATE MEMBER DETECTED</text>
                                <text x="300" y="196" fill="#ef4444" textAnchor="middle" className="text-[10px] font-mono font-bold">SET BLOCKS NON-UNIQUE VALUES</text>
                              </g>
                            )}

                          </g>
                        )}
                        
                      </svg>
                    ) : (
                      // ==================== SPEED COMPETITION BAR CHART VIEW ====================
                      <div className="w-full h-full flex flex-col justify-between p-3 font-mono">
                        
                        <div className="text-[10px] text-slate-500 uppercase block mb-1">
                          พล็อตระยะเวลาค้นหาจำลอง (หน่วย: microseconds | ค่าน้อย = เร็วกว่า)
                        </div>

                        {/* Leaderboard Chart grid */}
                        <div className="grow flex flex-col justify-around py-4">
                          {[
                            { id: 'dict', label: '🔵 Dict - O(1)', time: times.dict, color: 'bg-emerald-500 text-emerald-100', textCol: 'text-emerald-400' },
                            { id: 'set', label: '🟢 Set - O(1)', time: times.set, color: 'bg-emerald-600 text-emerald-100', textCol: 'text-emerald-400' },
                            { id: 'tuple', label: '🟠 Tuple - O(n)', time: times.tuple, color: 'bg-amber-500 text-amber-950', textCol: 'text-amber-400' },
                            { id: 'list', label: '🔴 List - O(n)', time: times.list, color: 'bg-rose-500 text-rose-100', textCol: 'text-rose-400' }
                          ].map(bar => {
                            // Calculate percentage width for visual chart
                            // Dict/Set are very small. List at max N (100,000) is the max width.
                            // We normalize according to the maximum list time to fit bounds nicely
                            const maxPossibleTime = 100000 * 0.00018; // ~18 microsec
                            const ratio = times.list > 0 ? (bar.time / times.list) * 82 : 0;
                            const percentageWidth = Math.max(1.8, ratio); // keep min visible width

                            return (
                              <div key={bar.id} className="space-y-1">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-bold text-slate-400">{bar.label}</span>
                                  <span className={`font-bold ${bar.textCol}`}>
                                    {times.list > 0 ? `${bar.time.toFixed(4)} µs` : '0.0000 µs'}
                                  </span>
                                </div>
                                
                                <div className="w-full h-6 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center relative">
                                  {/* Color filled bar */}
                                  <div
                                    style={{ width: `${percentageWidth}%` }}
                                    className={`h-full ${bar.color} transition-all duration-1000 rounded-l`}
                                  />
                                  
                                  {/* Speed Rank Badge inside bar */}
                                  {times.list > 0 && (
                                    <span className="absolute right-3 text-[9px] font-bold text-slate-500">
                                      {bar.id === 'dict' || bar.id === 'set' ? '🏆 เร็วที่สุดเสถียร (O(1))' : '⚠️ ช้าลงแปรผันตาม N (O(n))'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Benchmark Summary callout */}
                        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 font-sans leading-relaxed">
                          <span className="text-[9px] font-mono text-zinc-500 block mb-0.5 uppercase">วิจารณ์ผลเชิงประจักษ์:</span>
                          {times.list > 0 ? (
                            <span>
                              เมื่อ N ขยายสู่ระดับ {dataScale.toLocaleString()} สัญกรณ์ความคงที่ $O(1)$ ของ Dictionary และ Set รักษาระดับเวลาไม่ถึง <strong className="text-emerald-400">0.002 µs</strong> ขณะที่ List และ Tuple ที่เป็น $O(n)$ จะต้องลูปเทียบค่าไล่ลำดับทำให้เวลารวมพุ่งขึ้นไปถึง <strong className="text-rose-400">{(times.list).toFixed(2)} µs</strong> พิสูจน์ขีดความสามารถการทำ Hashing 100%
                            </span>
                          ) : (
                            'กดปุ่มสีฟ้าด้านซ้ายเพื่อสตรีมการประเมินความเร็วประมวลผลจริง'
                          )}
                        </div>

                      </div>
                    )}

                  </div>
                </div>

                {/* Legend bar */}
                <div className="mt-3 bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex justify-around text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500 block"></span>
                    <span>Constant O(1) Speed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-rose-500 block"></span>
                    <span>Linear O(N) Loop</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">→</span>
                    <span>Hash Vector Pipe</span>
                  </div>
                </div>

              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ใบงานสรุปการวิเคราะห์สถาปัตยกรรม Built-in Data Types ของ Python"
          taskText={`คำชี้แจง: ให้นักเรียนสั่งวิเคราะห์ทดลองและสลับโหมดคำสั่งจำลองรันทั้ง Memory & Hashing และ Speed Competition ในตัวจำลอง PyDataTypes-Sim ด้านบน สังเกตพฤติกรรมโครงสร้างหน่วยความจำและตอบคำถามทางวิชาการลงในระบบการบ้าน:

1. เหตุใดการสแกนหาข้อมูลและดึงค่าใน Dictionary หรือ Set ของ Python จึงสามารถรักษาประสิทธิภาพคงที่ O(1) ได้เสมอ ไม่ว่าปริมาณข้อมูลจะขยายตัวสูงระดับล้านแถวก็ตาม
   - อธิบายอิงจากบทบาทและกลไกการทำงานของ Hash Function, Hash Code และช่องเก็บข้อมูล (Buckets) ในแรมชั่วคราว
2. จากผลการทดสอบ Speed Competition Sandbox ที่ขนาดข้อมูล N = 100,000 รายการ 
   - จงระบุค่าความเร็ว (หน่วย µs) ของทั้ง 4 ชนิดข้อมูล และวิเคราะห์เชิงคุณภาพว่าเพราะเหตุใด Tuple จึงประหยัดพลังงานประมวลผลและค้นหาได้เร็วกว่า List เล็กน้อย
3. อธิบายพฤติกรรมและความสอดคล้องในทฤษฎีเซตสากล เมื่อนักเรียนพยายามทำการ Insert ข้อมูลที่มีอยู่เดิมซ้ำเข้าไปในระบบโครงสร้าง Set
   - อธิบายกลไกการดักจับในระดับ Hash Table ของ Python และผลการทดสอบในตัวจำลองที่เกิดขึ้น`}
        />

      </main>
    </div>
  );
}
