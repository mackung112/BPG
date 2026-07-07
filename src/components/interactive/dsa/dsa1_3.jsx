import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  HelpCircle, 
  Info,
  Play, 
  RotateCcw, 
  ArrowRight, 
  Cpu, 
  Shield, 
  Sparkles, 
  Sliders, 
  Code,
  Terminal,
  Activity,
  Plus,
  Minus,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  SimulatorShell, 
  ConceptCard, 
  AmbientBackdrop,
  ConsoleScreen,
  QuizEngine
} from '../shared';

// Custom CSS animations for flow lines and glowing effects
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float-subtle {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
      100% { transform: translateY(0px); }
    }
    @keyframes flow-line-dsa {
      to {
        stroke-dashoffset: -40;
      }
    }
    @keyframes pulse-indigo-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.7)); }
    }
    @keyframes pulse-emerald-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.8)); }
    }
    .animate-float-subtle { animation: float-subtle 4s ease-in-out infinite; }
    .animate-flow-line-dsa { animation: flow-line-dsa 1.2s linear infinite; }
    .animate-pulse-indigo-glow { animation: pulse-indigo-glow 1.5s ease-in-out infinite; }
    .animate-pulse-emerald-glow { animation: pulse-emerald-glow 1.2s ease-in-out infinite; }
  `}} />
);

export default function DSA1_3() {
  // ─── Layer 1: Ambient Background Blobs (Indigo/Emerald Theme) ───
  const blobs = [
    { color: 'bg-indigo-200',   size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-30' },
    { color: 'bg-emerald-100',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-25' },
    { color: 'bg-sky-200',      size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-25' },
    { color: 'bg-slate-200',    size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-20' }
  ];

  // ─── State for Tuple vs List Simulator ───
  const [selectedStructure, setSelectedStructure] = useState('List'); // List | Tuple
  const [selectedOperation, setSelectedOperation] = useState('Append'); // Append | Modify | Delete
  const [listItems, setListItems] = useState(['Red', 'Green', 'Blue']);
  const [tupleItems, setTupleItems] = useState(['Red', 'Green', 'Blue']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1); // -1: idle, 0: API Interface, 1: Logic Control, 2: RAM Write, 3: Complete/Error
  const [terminalLogs, setTerminalLogs] = useState(['[SYSTEM READY] แพลตฟอร์มจำลองความแตกต่าง Mutability (Tuple vs List) พร้อมทำงานแล้ว']);
  const [hasError, setHasError] = useState(false);
  const [inputVal, setInputVal] = useState('Yellow');

  // List: base empty size 56 bytes + 8 bytes per allocated capacity slot (start with 4)
  // Tuple: base empty size 40 bytes + 8 bytes per item (exactly 3)
  const getCapacityAndBytes = (structure, items) => {
    if (structure === 'List') {
      const len = items.length;
      let capacity = 4;
      if (len > 4) capacity = 8;
      if (len > 8) capacity = 16;
      const bytes = 56 + 8 * capacity;
      return { capacity, bytes };
    } else {
      // Tuple: size is exact to the element size
      const bytes = 40 + 8 * items.length;
      return { capacity: items.length, bytes };
    }
  };

  const handleRunOperation = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setHasError(false);
    setActiveStep(0);

    const targetItems = selectedStructure === 'List' ? listItems : tupleItems;

    // Operation strings for logging
    let cmdString = '';
    if (selectedStructure === 'List') {
      if (selectedOperation === 'Append') cmdString = `my_list.append('${inputVal}')`;
      if (selectedOperation === 'Modify') cmdString = `my_list[1] = 'Cyan'`;
      if (selectedOperation === 'Delete') cmdString = `my_list.pop()`;
    } else {
      if (selectedOperation === 'Append') cmdString = `my_tuple + ('${inputVal}',)`;
      if (selectedOperation === 'Modify') cmdString = `my_tuple[1] = 'Cyan'`;
      if (selectedOperation === 'Delete') cmdString = `del my_tuple[-1]`;
    }

    setTerminalLogs([
      `>>> ${cmdString}`,
      `[STEP 1 - API CALL] ส่งคำขอปฏิบัติการระดับผู้ใช้เข้าสู่อินเตอร์เฟซประเภทข้อมูล`
    ]);

    // Step 1: Logic Verification
    setTimeout(() => {
      setActiveStep(1);
      if (selectedStructure === 'List') {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 2 - LOGIC CONTROL] โครงสร้างแบบ Mutable (List) รองรับการเขียนทับ/เปลี่ยนแปลง`,
          `[STEP 2 - LOGIC CONTROL] ตรวจสอบขีดความสามารถการจัดสรร (Capacity: ${getCapacityAndBytes('List', targetItems).capacity} ช่อง)`
        ]);
      } else {
        // Tuple
        if (selectedOperation === 'Append') {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 2 - LOGIC CONTROL] การต่อข้อมูล Tuple จำเป็นต้องคัดลอกค่าและคืนค่าวัตถุใหม่ชิ้นอื่น (New Tuple Created)`,
            `[STEP 2 - LOGIC CONTROL] ระบบจะทำการจัดสรรพื้นที่แรมแยกส่วนต่างหากเป็น O(n)`
          ]);
        } else {
          // Modify / Delete
          setHasError(true);
          setTerminalLogs(prev => [
            ...prev,
            `[❌ ERROR CONTROL] โครงสร้างแบบ Immutable (Tuple) ไม่รองรับการเขียนข้อมูลทับในตำแหน่งเดิม!`,
            `[❌ ERROR CONTROL] ระบบแจ้งบล็อกการเข้าถึง (Access Violation) และโยนข้อผิดพลาด`
          ]);
        }
      }
    }, 1200);

    // Step 2: RAM Write or Abort
    setTimeout(() => {
      setActiveStep(2);
      if (selectedStructure === 'List') {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 3 - PHYSICAL WRITE] กำลังดำเนินการบันทึกข้อมูลและอัปเดตสมาชิกลงหน่วยความจำหลัก`,
          `[STEP 3 - PHYSICAL WRITE] เขียนค่าลงในตำแหน่ง Heap Address สำเร็จเรียบร้อย`
        ]);

        // Execute changes on List
        if (selectedOperation === 'Append') {
          setListItems(prev => [...prev, inputVal]);
        } else if (selectedOperation === 'Modify') {
          setListItems(prev => {
            const next = [...prev];
            if (next.length > 1) next[1] = 'Cyan';
            return next;
          });
        } else if (selectedOperation === 'Delete') {
          setListItems(prev => prev.slice(0, -1));
        }
      } else {
        // Tuple
        if (selectedOperation === 'Append') {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 3 - PHYSICAL WRITE] จองที่ว่างใหม่เพื่อสร้างวัตถุใหม่ใน Heap RAM`,
            `[STEP 3 - PHYSICAL WRITE] ย้ายข้อมูลสมาชิกเก่าไปรวมกับตัวต่อท้ายในพิกัดใหม่สำเร็จ`
          ]);
          setTupleItems(prev => [...prev, inputVal]);
        } else {
          // Modify / Delete (Error state)
          setTerminalLogs(prev => [
            ...prev,
            `[⚠️ ABORTED] การเขียนลงหน่วยความจำล้มเหลว: โล่ป้องกัน Immutable Lock ทำงาน`,
            `[⚠️ ABORTED] ยกเลิกคำสั่ง (No modification permitted on Heap)`
          ]);
        }
      }
    }, 2400);

    // Step 3: Complete / Show Traceback
    setTimeout(() => {
      setActiveStep(3);
      if (selectedStructure === 'List') {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 4 - DONE] การทำงานเสร็จสมบูรณ์: สถานะ List ถูกเปลี่ยนสภาพเรียบร้อย`
        ]);
        setIsProcessing(false);
      } else {
        if (selectedOperation === 'Append') {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 4 - DONE] การรวมตัวแปร Tuple ใหม่เสร็จสมบูรณ์`
          ]);
          setIsProcessing(false);
        } else {
          // Error Traceback (Show actual Python errors)
          const errorMsg = selectedOperation === 'Modify'
            ? `TypeError: 'tuple' object does not support item assignment`
            : `TypeError: 'tuple' object does not support item deletion`;
          setTerminalLogs(prev => [
            ...prev,
            `Traceback (most recent call last):`,
            `  File "<stdin>", line 1, in <module>`,
            `${errorMsg}`
          ]);
          setIsProcessing(false);
        }
      }
    }, 3600);
  };

  const handleResetSimulator = () => {
    setListItems(['Red', 'Green', 'Blue']);
    setTupleItems(['Red', 'Green', 'Blue']);
    setActiveStep(-1);
    setHasError(false);
    setTerminalLogs(['[SYSTEM RESET] รีเซ็ตโครงสร้างและขนาดตัวอย่างหน่วยความจำสู่สภาวะเริ่มต้น']);
    setIsProcessing(false);
  };

  // ─── Quiz Engine Configurations ───
  const quizLevels = [
    {
      title: "คุณสมบัติพื้นฐานของ Tuple",
      desc: "ข้อใดคือคุณสมบัติหลักที่ทำให้โครงสร้างข้อมูลแบบทิวเพิล (Tuple) แตกต่างจากโครงสร้างข้อมูลแบบรายการ (List)",
      options: [
        { key: "A", text: "เป็นแบบมิวเทเบิล (Mutable) ที่แก้ไข เพิ่ม หรือลดข้อมูลสมาชิกในจุดเดิมได้เสรี", isCorrect: false },
        { key: "B", text: "เป็นแบบอิมมิวเทเบิล (Immutable) ที่เมื่อสร้างแล้วจะไม่สามารถแก้ไขสมาชิกภายในได้", isCorrect: true },
        { key: "C", text: "ไม่รักษาลำดับข้อมูล (Unordered) และไม่ยินยอมให้มีข้อมูลสมาชิกที่ซ้ำซ้อนกันได้", isCorrect: false },
        { key: "D", text: "สามารถเรียกอ่านข้อมูลได้รวดเร็วกว่าโครงสร้างข้อมูลประเภทอื่นถึง 100 เท่าเสมอ", isCorrect: false }
      ],
      tip: "คำว่า Immutable (อิมมิวเทเบิล) หมายถึงการคงที่ของโครงสร้างและข้อมูลภายใน ทำให้สิทธิ์การเขียนทับถูกล็อกอย่างถาวร"
    },
    {
      title: "การประกาศตัวแปร Tuple สมาชิกเดี่ยว",
      desc: "ในภาษา Python หากต้องการสร้างตัวแปร Tuple ที่เก็บข้อมูลสมาชิกตัวเดียวคือสตริง 'A' ข้อใดคือรูปแบบการเขียนรหัสคำสั่งที่ถูกต้อง",
      options: [
        { key: "A", text: "my_tuple = ('A')", isCorrect: false },
        { key: "B", text: "my_tuple = tuple['A']", isCorrect: false },
        { key: "C", text: "my_tuple = ('A',)", isCorrect: true },
        { key: "D", text: "my_tuple = define tuple('A')", isCorrect: false }
      ],
      tip: "การเขียน Tuple สมาชิกตัวเดียวจำเป็นต้องใส่เครื่องหมายจุลภาค (Comma) ท้ายสุด เผื่อให้ตัวแปรภาษา Python เข้าใจว่าไม่ใช่วงเล็บคณิตศาสตร์ปกติ"
    },
    {
      title: "ประสิทธิภาพและการใช้หน่วยความจำ",
      desc: "เหตุใด Tuple จึงประหยัดหน่วยความจำแรม (RAM) มากกว่าโครงสร้างข้อมูลแบบ List ในการเก็บค่าชุดเดียวกัน",
      options: [
        { key: "A", text: "เนื่องจาก Tuple จัดสรรพื้นที่คงที่พอดีตัวเลขสมาชิก โดยไม่มี Overhead เผื่อขยายขนาด (Dynamic capacity buffer)", isCorrect: true },
        { key: "B", text: "เนื่องจาก Tuple นำข้อมูลไปเก็บบันทึกบนพื้นที่ฮาร์ดดิสก์แบบออฟไลน์", isCorrect: false },
        { key: "C", text: "เนื่องจาก Tuple ไม่สามารถประมวลผลข้อมูลที่มีลักษณะเป็นสายอักขระ (String) ได้", isCorrect: false },
        { key: "D", text: "เนื่องจาก Tuple จะส่งข้อมูลไปประมวลผลบนการ์ดแสดงผลกราฟิก (GPU) เสมอ", isCorrect: false }
      ],
      tip: "List จัดสรรหน่วยความจำแบบ Dynamic Array ซึ่งต้องคอยคัดลอกและจองความจุเผื่อขยาย (Overallocation Buffer) ทำให้ใช้แรมมากกว่า Tuple ที่เป็น Static Array"
    },
    {
      title: "การประยุกต์ใช้ Tuple ในฐานะ Key",
      desc: "ข้อใดถือเป็นประโยชน์สูงสุดของการมีพฤติกรรมแบบคงที่ (Immutable) ของ Tuple ในการสถาปนาระบบฐานข้อมูลระดับสูง",
      options: [
        { key: "A", text: "สามารถนำ Tuple ไปจัดเรียงข้อมูลด้วยความชันเชิงเส้น O(1)", isCorrect: false },
        { key: "B", text: "สามารถนำ Tuple ไปใช้เป็น Key ใน Dictionary หรือสมาชิกใน Set ได้เพราะเป็นออบเจกต์ประเภท Hashable", isCorrect: true },
        { key: "C", text: "ช่วยเพิ่มปริมาณการดาวน์โหลดข้อมูลข้ามเครือข่ายอินเทอร์เน็ตได้ราบรื่นขึ้น", isCorrect: false },
        { key: "D", text: "ทำให้ตัวแปลภาษา Python เปลี่ยนระบบเป็นโปรแกรมสแตนด์อโลน (Executable File) ได้ทันที", isCorrect: false }
      ],
      tip: "ในการใช้โครงสร้าง Hash Table ค่าคีย์ต้องมีเสถียรภาพคงที่ (Hashable) โดย List (Mutable) จะไม่อนุญาตให้นำมาใช้เป็นคีย์ได้เด็ดขาด"
    }
  ];

  const pythonCode = `# 1. การสร้างและประกาศตัวแปรทิวเพิล (Tuple Creation)
student_record = ("Mack", 28, "Computer Engineering")
single_element = (99,)  # ต้องมีเครื่องหมายจุลภาคต่อท้ายเสมอสำหรับสมาชิกเดี่ยว

# 2. การเข้าถึงสมาชิกผ่านค่าดัชนี (Index Access)
name = student_record[0]  # ผลลัพธ์: "Mack"
age = student_record[1]   # ผลลัพธ์: 28

# 3. การกระจายค่าตัวแปรในบรรทัดเดียว (Tuple Unpacking)
name, age, department = student_record
print(f"ชื่อ: {name}, อายุ: {age}, แผนกวิชา: {department}")

# 4. เมธอดมาตรฐานการสืบค้นข้อมูลใน Tuple
scores = (95, 80, 95, 100)
num_95 = scores.count(95)   # ผลลัพธ์: 2 (นับจำนวนข้อมูล 95 ในทิวเพิล)
pos_80 = scores.index(80)   # ผลลัพธ์: 1 (หาดัชนีตำแหน่งแรกของ 80)

# 5. การจำลองข้อผิดพลาดเมื่อพยายามแก้ไขข้อมูล (TypeError)
try:
    student_record[1] = 29  # พยายามแก้ไขอายุเป็น 29
except TypeError as error:
    print(f"ขัดข้องตามระบบความปลอดภัย: {error}")
    # ผลลัพธ์: TypeError: 'tuple' object does not support item assignment`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative" id="dsa1_3-component-root">
      <CustomStyles />

      {/* Layer 1: Ambient Background Blobs */}
      <AmbientBackdrop blobs={blobs} />

      {/* Layer 3: Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10" id="main-content-layout">

        {/* Section 1: Intro to Tuple */}
        <section className="space-y-6" aria-labelledby="section-intro-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ความหมายและคุณสมบัติ
            </span>
            <h2 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1" id="section-intro-title">
              Tuple (ทิวเพิล)
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              Inทางวิทยาการคอมพิวเตอร์ <strong className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200/50 text-indigo-700 font-mono text-[14px]">Tuple (ทิวเพิล)</strong> 
              คือ โครงสร้างข้อมูลเชิงเส้นประเภทเรียงลำดับดัชนี (Sequence) ที่ใช้สำหรับจัดเก็บกลุ่มข้อมูลเรียงต่อกันในหน่วยความจำ คล้ายกับ List แต่มีจุดต่างสำคัญคือมีสถานะเป็น **Immutable (ไม่สามารถปรับปรุงแก้ไขโครงสร้างและข้อมูลได้หลังจากถูกสร้างขึ้นมาแล้ว)** ช่วยเพิ่มความเร็วในการอ่านข้อมูลและปลอดภัยจากการเขียนทับข้อมูลโดยไม่ได้รับอนุญาต
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    การประกาศและสร้างทิวเพิล (Tuple Declaration)
                  </h4>
                  <p className="text-[15px] text-zinc-650 leading-relaxed">
                    เราสร้าง Tuple ในภาษา Python โดยใช้เครื่องหมายวงเล็บโค้ง <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm text-indigo-600 font-semibold">( )</code> (Parentheses) ในการครอบสมาชิก และคั่นแต่ละตัวด้วยเครื่องหมายจุลภาค (Comma)
                  </p>
                  <div className="bg-slate-900 text-slate-100 rounded-xl p-3.5 font-mono text-[13px] border border-white/10 shadow-inner">
                    <span className="text-zinc-500 font-bold block mb-1">PYTHON CODE:</span>
                    <span className="text-emerald-400"># สร้างทิวเพิลว่าง</span><br />
                    cargo = ()<br />
                    <span className="text-emerald-400"># สร้างทิวเพิลที่มีข้อมูลเริ่มต้น</span><br />
                    scores = (<span className="text-amber-300">85</span>, <span className="text-amber-300">90</span>, <span className="text-amber-300">78</span>)<br />
                    <span className="text-emerald-400"># การสร้างทิวเพิลสมาชิกเดี่ยว (ต้องลงท้ายด้วย Comma เสมอ)</span><br />
                    single_val = (<span className="text-amber-300">85</span>,)
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    การระบุตำแหน่งด้วยดัชนี (Indexing)
                  </h4>
                  <p className="text-[15px] text-zinc-650 leading-relaxed">
                    แม้ข้อมูลใน Tuple จะไม่สามารถเปลี่ยนแปลงค่าได้ (Immutable) แต่สามารถอ้างอิงอ่านค่าผ่านเลขพิกัดดัชนีเหมือนกับ List ทุกประการ:
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-zinc-650 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold font-mono">1.</span>
                      <span><strong>ดัชนีปกติ (Positive Index):</strong> เริ่มตั้งแต่ <code className="px-1 py-0.2 bg-emerald-50 text-emerald-700 font-mono font-bold rounded">0</code> สำหรับตัวหน้าสุด ไล่ไปทางขวาทีละ +1</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold font-mono">2.</span>
                      <span><strong>ดัชนีติดลบ (Negative Index):</strong> เริ่มตั้งแต่ <code className="px-1 py-0.2 bg-rose-50 text-rose-700 font-mono font-bold rounded">-1</code> สำหรับตัวท้ายสุด ไล่ย้อนกลับมาทางซ้ายทีละ -1</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual Indexing Map */}
              <div className="border-t border-zinc-200/80 pt-5 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  แผนผังการเข้าถึงข้อมูลผ่านดัชนีของ Tuple (Tuple Index Map)
                </span>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 overflow-x-auto">
                  <div className="min-w-[480px] flex flex-col gap-2">
                    {/* Positive index row */}
                    <div className="flex gap-4">
                      <div className="w-32 shrink-0 flex items-center justify-end pr-3">
                        <span className="text-xs font-bold text-emerald-600 font-mono">Positive Index</span>
                      </div>
                      <div className="grow grid grid-cols-4 gap-3">
                        {['0', '1', '2', '3'].map((idx, i) => (
                          <div key={i} className="text-center font-mono text-xs font-bold text-emerald-600 py-1 bg-emerald-50 rounded-lg border border-emerald-100/50">
                            {idx}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Elements row */}
                    <div className="flex gap-4">
                      <div className="w-32 shrink-0 flex items-center justify-end pr-3">
                        <span className="text-xs font-bold text-slate-800">Element (ข้อมูล Tuple)</span>
                      </div>
                      <div className="grow grid grid-cols-4 gap-3">
                        {['"Red"', '"Green"', '"Blue"', '"Yellow"'].map((val, i) => (
                          <div key={i} className="text-center font-mono text-sm font-bold text-indigo-700 py-3 bg-white rounded-xl border border-indigo-100/50 shadow-sm">
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Negative index row */}
                    <div className="flex gap-4">
                      <div className="w-32 shrink-0 flex items-center justify-end pr-3">
                        <span className="text-xs font-bold text-rose-500 font-mono">Negative Index</span>
                      </div>
                      <div className="grow grid grid-cols-4 gap-3">
                        {['-4', '-3', '-2', '-1'].map((idx, i) => (
                          <div key={i} className="text-center font-mono text-xs font-bold text-rose-500 py-1 bg-rose-50 rounded-lg border border-rose-100/50">
                            {idx}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed font-sans">
                  <div className="flex items-start gap-2 bg-emerald-50/50 border border-emerald-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong>Positive Indexing:</strong> อ้างอิงจากลำดับหน้าสุด เหมาะสำหรับใช้งานในการอ้างอิงข้อมูลลำดับเริ่มต้นทั่วไป</p>
                  </div>
                  <div className="flex items-start gap-2 bg-rose-50/50 border border-rose-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <p><strong>Negative Indexing:</strong> อ้างอิงย้อนกลับจากสมาชิกตัวหลังสุด เหมาะสำหรับตรวจสอบหรือดึงข้อมูลตัวท้าย ๆ ออกมาใช้งาน</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Pros & Cons of Tuple */}
        <section className="space-y-6" aria-labelledby="section-proscons-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              การประเมินโครงสร้างวิศวกรรมซอฟต์แวร์
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-proscons-title">
              วิเคราะห์เปรียบเทียบข้อดีและข้อเสียของโครงสร้างข้อมูล Tuple
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="proscons-details-container">
            {/* Pros card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3px] border-l-emerald-500/80">
              <span className="text-sm font-mono font-bold text-emerald-600 uppercase tracking-widest block mb-3">🟢 ADVANTAGES / ข้อดีเด่นชัด</span>
              <ul className="space-y-3.5">
                {[
                  "มีความเร็วในการเรียกอ่านและประมวลผลข้อมูลสูงกว่า List เล็กน้อยเนื่องจากตรรกะระบบไม่ยุ่งยาก",
                  "ประหยัดพื้นที่หน่วยความจำแรม (RAM Allocation) ได้อย่างยอดเยี่ยม เพราะตัดความจุส่วนเกินสำรองออก 100%",
                  "ความปลอดภัยของข้อมูลสูง (Data Integrity) ป้องกันข้อผิดพลาดจากการเผลอเขียนทับโดยไม่ได้รับอนุญาต",
                  "สามารถแฮชค่าข้อมูลได้คงที่ (Hashable) นำไปใช้เป็น Key ของ Dictionary หรือลงทะเบียนใน Set ได้ปลอดภัย"
                ].map((item, idx) => (
                  <li key={idx} className="text-[14px] md:text-[15px] text-slate-700 leading-relaxed flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3px] border-l-rose-500/80">
              <span className="text-sm font-mono font-bold text-rose-600 uppercase tracking-widest block mb-3">🔴 DISADVANTAGES / ข้อจำกัดการทำงาน</span>
              <ul className="space-y-3.5">
                {[
                  "ขาดความยืดหยุ่นในการเขียนตรรกะ เนื่องจากไม่สนับสนุนเมธอดปรับขนาดข้อมูล เช่น append, insert, หรือ pop",
                  "หากจำเป็นต้องแก้ไขข้อมูล ต้องเสียเวลาทำซ้ำด้วยการแปลงโครงสร้างเป็น List เพื่อแก้ไข หรือจองแรมสถาปนาตัวใหม่ขึ้นมาทดแทน",
                  "อาจสร้างความสับสนและเป็นอุปสรรคต่อการปรับปรุงระบบ (Maintenance) หากนำไปใช้งานในที่ที่ความต้องการระบบมีการปรับเปลี่ยนบ่อย",
                  "มีเมธอดให้เรียกประมวลผลแบบเบ็ดเสร็จในภาษาน้อยมาก (มีเพียง count และ index เป็นเครื่องมือจำกัด)"
                ].map((item, idx) => (
                  <li key={idx} className="text-[14px] md:text-[15px] text-slate-700 leading-relaxed flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Section: Summary of Basic Tuple Methods ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คู่มือวิทยาการคำนวณ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สรุปคำสั่งและฟังก์ชันพื้นฐานในการจัดการทิวเพิล (Tuple Methods Summary)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            เนื่องจากทิวเพิลเป็นประเภทข้อมูลแบบคงที่ (Immutable) เมธอดและฟังก์ชันพื้นฐานในการจัดการและเข้าถึงข้อมูลจึงมีข้อจำกัด โดยมีคำสั่งหลักดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'len(tuple)',
                subtitle: 'การตรวจสอบความยาว',
                description: 'ฟังก์ชันตรวจสอบและคืนค่าจำนวนสมาชิกทั้งหมดที่มีอยู่ภายใน Tuple',
                code: 'len(scores)',
                result: '4',
                titleClass: 'text-emerald-600',
                bgGradient: 'from-emerald-50/50 via-transparent to-transparent',
              },
              {
                title: '.count(x)',
                subtitle: 'การนับข้อมูลเฉพาะค่า',
                description: 'นับปริมาณการปรากฏตัวทั้งหมดของข้อมูลที่มีค่าเท่ากับ x ภายใน Tuple',
                code: 'scores.count(90)',
                result: '2',
                titleClass: 'text-sky-500',
                bgGradient: 'from-sky-50/50 via-transparent to-transparent',
              },
              {
                title: '.index(x)',
                subtitle: 'การสืบค้นตำแหน่งดัชนี',
                description: 'ค้นหาและคืนค่าดัชนีตัวแรกที่ตรวจพบข้อมูลที่มีค่าเท่ากับ x (หากไม่พบจะ Error)',
                code: 'scores.index(78)',
                result: '2',
                titleClass: 'text-rose-500',
                bgGradient: 'from-rose-50/50 via-transparent to-transparent',
              },
              {
                title: 'tuple1 + tuple2',
                subtitle: 'การเชื่อมรวมทิวเพิล',
                description: 'สั่งเชื่อมรวมข้อมูลทิวเพิลสองตัวเข้าด้วยกันเพื่อสถาปนาวัตถุ Tuple ใหม่แยกออกมา',
                code: 'scores + (95,)',
                result: '(85, 90, 78, 90, 95)',
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
                  <span className={`block font-mono text-[22px] font-bold tracking-tight ${card.titleClass}`}>
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
                  <span className="text-slate-700">{card.code}</span>
                  <span className="text-indigo-600 font-bold">{card.result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Dynamic Mutability & Memory Allocation Simulator */}
        <section className="space-y-6" aria-labelledby="section-simulator-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองระดับวิศวกรรมสถาปัตยกรรมหน่วยความจำ
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-simulator-title">
              บอร์ดทดสอบสิทธิเขียนและเปรียบเทียบขนาดแรม (Tuple vs List Memory Allocation)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองจำลองการทำธุรกรรมลงสู่หน่วยความจำ โดยเลือกว่าจะกระทำลงบน <strong>List (Mutable)</strong> หรือ <strong>Tuple (Immutable)</strong> จากนั้นระบุเมธอดความต้องการการจัดการ เพื่อติดตามกระบวนการไหลและสังเกตพฤติกรรมในหน่วยประมวลผล และดูขนาดไบต์ตามจริงในหน่วยความจำ RAM:
          </p>

          <SimulatorShell
            dark
            title="Mutability & Memory Footprint Sandbox"
            icon={<Sliders className="w-8 h-8 text-indigo-400" />}
            glowColors="from-slate-900/30 to-indigo-950/20"
            iconColor="text-indigo-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4" id="sim-panels-grid">
              
              {/* Left Column: Control Panel */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[480px]" id="sim-control-panel">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">COMPILE TERMINAL</span>
                
                <div className="space-y-5">
                  {/* Select Structure */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกประเภทโครงสร้างหน่วยความจำเป้าหมาย:</span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => { if (!isProcessing) setSelectedStructure('List'); }}
                        disabled={isProcessing}
                        id="btn-select-list"
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5
                          ${selectedStructure === 'List'
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        <Unlock className="w-3.5 h-3.5" /> List (Mutable)
                      </button>
                      <button
                        onClick={() => { if (!isProcessing) setSelectedStructure('Tuple'); }}
                        disabled={isProcessing}
                        id="btn-select-tuple"
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5
                          ${selectedStructure === 'Tuple'
                            ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        <Lock className="w-3.5 h-3.5" /> Tuple (Immutable)
                      </button>
                    </div>
                  </div>

                  {/* Select Operation */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">2. เลือกคำสั่งในการจัดการข้อมูล:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { op: 'Append', label: 'เพิ่มข้อมูล' },
                        { op: 'Modify', label: 'แก้ไขค่า' },
                        { op: 'Delete', label: 'ลบข้อมูล' }
                      ].map(item => (
                        <button
                          key={item.op}
                          onClick={() => { if (!isProcessing) setSelectedOperation(item.op); }}
                          disabled={isProcessing}
                          id={`btn-op-${item.op.toLowerCase()}`}
                          className={`py-2 rounded-xl border text-center font-bold text-[11px] cursor-pointer transition-all
                            ${selectedOperation === item.op
                              ? 'border-indigo-400 bg-indigo-950/30 text-indigo-300'
                              : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:border-slate-700'
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input value if Append is selected */}
                  {selectedOperation === 'Append' && (
                    <div className="space-y-2 animate-fadeIn">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">3. ระบุค่าข้อมูลสมาชิกเพื่อเพิ่มต่อท้าย:</span>
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value.substring(0, 10))}
                        disabled={isProcessing}
                        id="input-val-box"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-40"
                        placeholder="ข้อความความยาวไม่เกิน 10 ตัวอักษร"
                      />
                    </div>
                  )}

                  {/* Run button */}
                  <div className="pt-2">
                    <button
                      onClick={handleRunOperation}
                      disabled={isProcessing || (selectedStructure === 'List' ? listItems.length : tupleItems.length) === 0 && selectedOperation === 'Delete'}
                      id="btn-run-sim"
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-slate-950/55 disabled:opacity-40"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      รันคำสั่งเชิงโต้ตอบ (Execute Code)
                    </button>
                  </div>
                </div>

                {/* Log Screen & Reset */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <button
                    onClick={handleResetSimulator}
                    disabled={isProcessing}
                    id="btn-reset-sim"
                    className="w-full py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตหน่วยความจำจำลอง
                  </button>

                  <div className="bg-black/90 p-3 rounded-xl border border-slate-950 font-mono text-[11px] leading-relaxed text-indigo-400 overflow-y-auto max-h-[120px] min-h-[100px]" id="terminal-screen">
                    <span className="text-slate-500 border-b border-slate-900 pb-1 mb-1.5 uppercase tracking-wide text-[8.5px] font-bold block">Trace Output Console:</span>
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className={log.startsWith('TypeError') || log.startsWith('  File') || log.startsWith('Traceback') ? 'text-rose-400 font-bold' : 'text-indigo-300'}>
                        <span className="text-slate-700 select-none">&gt; </span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic SVG Memory View */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[480px]" id="sim-visual-panel">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-4 font-bold tracking-widest">MEMORY ALLOCATION AND PATH SYSTEM</span>

                <div className="space-y-6 mt-6 flex-1 flex flex-col justify-between">
                  {/* SVG Pipeline */}
                  <div className="relative bg-slate-900/30 rounded-xl border border-slate-900/80 p-4 grow flex items-center justify-center min-h-[220px]" id="svg-board-canvas">
                    <svg viewBox="0 0 560 220" className="w-full h-full" id="svg-paths-container">
                      <defs>
                        <marker id="arrow-gray" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                        </marker>
                        <marker id="arrow-emerald" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                        </marker>
                        <marker id="arrow-indigo" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
                        </marker>
                      </defs>

                      {/* Connection Line: API to List Node: M 280,50 L 160,50 L 160,120 */}
                      <path 
                        d="M 280,50 L 160,50 L 160,120" 
                        fill="none" 
                        stroke={activeStep >= 0 && selectedStructure === 'List' ? "#10b981" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 && selectedStructure === 'List' ? "6,4" : "none"}
                        className={activeStep === 0 && selectedStructure === 'List' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 1 && selectedStructure === 'List' ? "url(#arrow-emerald)" : "url(#arrow-gray)"}
                      />

                      {/* Connection Line: API to Tuple Node: M 280,50 L 400,50 L 400,120 */}
                      <path 
                        d="M 280,50 L 400,50 L 400,120" 
                        fill="none" 
                        stroke={activeStep >= 0 && selectedStructure === 'Tuple' ? "#6366f1" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 && selectedStructure === 'Tuple' ? "6,4" : "none"}
                        className={activeStep === 0 && selectedStructure === 'Tuple' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 1 && selectedStructure === 'Tuple' ? "url(#arrow-indigo)" : "url(#arrow-gray)"}
                      />

                      {/* Connection Line: List Node to RAM: M 160,120 L 160,190 L 280,190 */}
                      <path 
                        d="M 160,120 L 160,190 L 280,190" 
                        fill="none" 
                        stroke={activeStep >= 1 && selectedStructure === 'List' ? "#10b981" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 1 && selectedStructure === 'List' ? "6,4" : "none"}
                        className={activeStep === 1 && selectedStructure === 'List' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 2 && selectedStructure === 'List' ? "url(#arrow-emerald)" : "url(#arrow-gray)"}
                      />

                      {/* Connection Line: Tuple Node to RAM: M 400,120 L 400,190 L 280,190 */}
                      <path 
                        d="M 400,120 L 400,190 L 280,190" 
                        fill="none" 
                        stroke={activeStep >= 1 && selectedStructure === 'Tuple' && !hasError ? "#6366f1" : hasError && activeStep >= 1 && selectedStructure === 'Tuple' ? "#f43f5e" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 1 && selectedStructure === 'Tuple' ? "6,4" : "none"}
                        className={activeStep === 1 && selectedStructure === 'Tuple' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 2 && selectedStructure === 'Tuple' && !hasError ? "url(#arrow-indigo)" : "url(#arrow-gray)"}
                      />

                      {/* Running Dot animation */}
                      {isProcessing && activeStep === 0 && (
                        <circle r="5.5" fill={selectedStructure === 'List' ? "#10b981" : "#6366f1"} className="animate-pulse">
                          <animateMotion dur="1s" repeatCount="indefinite" path={selectedStructure === 'List' ? "M 280,50 L 160,50 L 160,120" : "M 280,50 L 400,50 L 400,120"} />
                        </circle>
                      )}

                      {/* Node 1: Public Interface API */}
                      <g transform="translate(280, 50)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 0 ? (selectedStructure === 'List' ? "#10b981" : "#6366f1") : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Code className={`w-5 h-5 ${activeStep === 0 ? (selectedStructure === 'List' ? 'text-emerald-400' : 'text-indigo-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="-33" textAnchor="middle" className="fill-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider">User API Operations</text>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-500 font-sans text-[8.5px] font-bold">Python Code Call</text>
                      </g>

                      {/* Node 2: List Heap allocation logic */}
                      <g transform="translate(160, 120)">
                        <circle r="24" fill="#1e293b" stroke={activeStep === 1 && selectedStructure === 'List' ? "#10b981" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-9, -9)">
                          <Unlock className={`w-4.5 h-4.5 ${activeStep === 1 && selectedStructure === 'List' ? 'text-emerald-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="-32" y="4" textAnchor="end" className="fill-slate-400 font-sans text-[8.5px] font-bold">List (Dynamic Array)</text>
                      </g>

                      {/* Node 3: Tuple Heap allocation logic */}
                      <g transform="translate(400, 120)">
                        <circle r="24" fill="#1e293b" stroke={activeStep === 1 && selectedStructure === 'Tuple' ? (hasError ? "#ef4444" : "#6366f1") : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-9, -9)">
                          <Lock className={`w-4.5 h-4.5 ${activeStep === 1 && selectedStructure === 'Tuple' ? (hasError ? 'text-red-400' : 'text-indigo-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="32" y="4" textAnchor="start" className="fill-slate-400 font-sans text-[8.5px] font-bold">Tuple (Static Array)</text>
                      </g>

                      {/* Node 4: Physical Memory */}
                      <g transform="translate(280, 190)">
                        <circle r="20" fill={activeStep >= 2 ? (hasError ? "#7f1d1d" : "#064e3b") : "#111827"} stroke={activeStep >= 2 ? (hasError ? "#ef4444" : "#10b981") : "#374151"} strokeWidth="2" className={activeStep === 2 ? "animate-pulse" : ""} />
                        <g transform="translate(-8, -8)">
                          <Database className={`w-4 h-4 ${activeStep >= 2 ? (hasError ? "text-red-400" : "text-emerald-400") : "text-slate-600"}`} />
                        </g>
                        <text x="0" y="32" textAnchor="middle" className="fill-slate-400 font-sans text-[8.5px] font-bold uppercase">Physical Memory (RAM)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Physical RAM Visualizer boxes */}
                  <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 space-y-4" id="ram-visualizer-box">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">
                        {selectedStructure.toUpperCase()} HEAP STRUCTURE
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono
                        ${selectedStructure === 'List'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900'
                          : 'bg-indigo-950/80 text-indigo-400 border border-indigo-900'
                        }`}
                      >
                        {selectedStructure === 'List' ? '📊 DYNAMIC LIST RECONSTRUCTION' : '🔒 IMMUTABLE TUPLE LAYOUT'}
                      </span>
                    </div>

                    {/* Contiguous slot grids representation */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-900/80 min-h-[90px] flex flex-col justify-center items-center">
                      {selectedStructure === 'List' ? (
                        /* List representation: shows elements + overallocated buffer */
                        <div className="w-full" id="list-elements-row">
                          <div className="flex gap-1.5 justify-center flex-wrap">
                            {listItems.map((item, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-lg border border-emerald-500/30 bg-emerald-950/30 flex items-center justify-center font-bold text-xs text-white transition-all duration-300">
                                  {item}
                                </div>
                                <span className="text-[8.5px] text-slate-500 mt-1 font-mono">[{idx}]</span>
                              </div>
                            ))}
                            {/* Empty Buffer Slots to show dynamic pre-allocation */}
                            {Array.from({ length: getCapacityAndBytes('List', listItems).capacity - listItems.length }).map((_, i) => (
                              <div key={i} className="flex flex-col items-center opacity-30">
                                <div className="w-12 h-12 rounded-lg border border-dashed border-slate-750 bg-transparent flex items-center justify-center text-slate-500 text-[10px] font-mono">
                                  N/A
                                </div>
                                <span className="text-[8.5px] text-slate-650 mt-1 font-mono">[{listItems.length + i}]</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Tuple representation: shows exactly items layout with locks */
                        <div className="w-full" id="tuple-elements-row">
                          <div className="flex gap-1.5 justify-center flex-wrap items-center">
                            {tupleItems.map((item, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-xl border border-indigo-500/50 bg-indigo-950/40 flex items-center justify-center font-bold text-xs text-white transition-all duration-300 relative">
                                  <Lock className="w-2.5 h-2.5 text-indigo-400 absolute top-1 right-1 opacity-70" />
                                  {item}
                                </div>
                                <span className="text-[8.5px] text-slate-500 mt-1 font-mono">[{idx}]</span>
                              </div>
                            ))}
                            {tupleItems.length === 0 && (
                              <span className="text-slate-600 italic text-xs">ทิวเพิลว่างเปล่า (Empty Tuple)</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Capacity and Memory Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-1">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-1">
                        <span className="text-slate-500 block text-[9.5px] font-bold uppercase">ALLOCATED CAPACITY / ความจุจอง</span>
                        <span className="text-white font-bold text-sm">
                          {selectedStructure === 'List' 
                            ? `${listItems.length} / ${getCapacityAndBytes('List', listItems).capacity} ช่อง (จองเผื่อ)`
                            : `${tupleItems.length} / ${tupleItems.length} ช่อง (คงที่พอดีตัว)`
                          }
                        </span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-1">
                        <span className="text-slate-500 block text-[9.5px] font-bold uppercase">MEMORY FOOTPRINT / ขนาดไบต์</span>
                        <span className={selectedStructure === 'List' ? 'text-emerald-400 font-bold text-sm' : 'text-indigo-400 font-bold text-sm'}>
                          {getCapacityAndBytes(selectedStructure, selectedStructure === 'List' ? listItems : tupleItems).bytes} Bytes (sys.getsizeof)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* Section 4: Python Code and Syntax */}
        <section className="space-y-6" aria-labelledby="section-code-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวอย่างการประกาศและใช้งาน
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-code-title">
              ไวยากรณ์และการเข้าถึงข้อมูล Tuple ในภาษา Python
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ในเชิงปฏิบัติ ทิวเพิลมีประโยชน์อย่างมากในการเก็บข้อมูลคงที่ (Record/Metadata) ที่ต้องการความเสถียร โดยนักศึกษาสามารถสังเกตตัวอย่างรูปแบบการสร้าง การนำข้อมูลออก (Unpacking) ตลอดจนการจัดการข้อผิดพลาดเมื่อมีตรรกะพยายามเขียนทับค่า:
          </p>

          <div className="max-w-5xl mx-auto" id="python-console-display">
            <ConsoleScreen
              label="# python/tuple_demonstration.py"
              accentLabel="tuple data structures"
              accentColor="text-indigo-400"
              codeBlock={
                <pre className="text-[13.5px] font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                  {pythonCode}
                </pre>
              }
              output="ทิวเพิลไม่อนุญาตให้แก้ไขข้อมูล (Immutable) จึงใช้ประโยชน์ในการกระจายค่าและป้องกันข้อมูลระบบเปลี่ยนสถานะ"
              outputColor="text-indigo-400"
              multiline={true}
            />
          </div>
        </section>

        {/* Section 5: Quiz Challenge */}
        <section className="space-y-6" aria-labelledby="section-quiz-title">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ด่านประเมินผลการเรียนรู้
            </span>
            <h3 className="text-[24px] font-semibold text-zinc-900 leading-tight mt-1" id="section-quiz-title">
              มินิเกมวัดความรู้: กฎเกณฑ์และประสิทธิภาพของทิวเพิล (Tuple Arena)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ตอบคำถามวิชาการ 4 ระดับ เพื่อประเมินความเข้าใจเกี่ยวกับกลไกแรม มิวทาบิลิลี่ และการนำ Tuple ไปประยุกต์ใช้งานจริงในงานอาชีพนักพัฒนา:
          </p>

          <div className="max-w-4.5xl mx-auto" id="quiz-engine-wrapper">
            <QuizEngine
              title="มินิเกม: ท้าทายสิทธิเข้าถึงข้อมูล Tuple"
              description="ตอบคำถามประมวลข้อกำหนดทางวิศวกรรมคอมพิวเตอร์และการประเมินความรู้โครงสร้างข้อมูลทิวเพิล"
              levels={quizLevels}
              accentColor="from-indigo-600/20 to-emerald-500/10"
              icon={<Shield className="w-6 h-6 text-indigo-400" />}
            />
          </div>
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: ปฏิบัติการจัดการ Tuple ใน Python"
          pin="1122"
          taskText={`[โจทย์ปฏิบัติการหลักสูตรรายวิชาโครงสร้างข้อมูล 21900-1002]
โจทย์ปฏิบัติการจัดการ Tuple ใน Python ให้นักเรียนเขียนคำสั่งต่อไปนี้:

1. สร้างทูเพิลชื่อ my_tuple ที่มีสมาชิกเป็นตัวเลข 10, 20 และ 30 ตามลำดับ
2. กำหนดให้ days = ("Mon", "Tue", "Wed", "Thu", "Fri") จงเขียนคำสั่งเพื่อดึงตัวอักษร "Wed" ออกมาแสดงผล
3. กำหนดให้ point = (15.5, 20.0) จงเขียนคำสั่ง Unpacking เพื่อกระจายค่าไปเก็บในตัวแปร x และ y ตามลำดับ
4. กำหนดให้ t1 = (1, 2) และ t2 = (3, 4) จงเขียนคำสั่งเพื่อนำทูเพิลทั้งสองมาต่อกันเป็นทูเพิลใหม่ชื่อ t3
5. กำหนดให้ numbers = (5, 2, 8, 5, 1, 5) จงเขียนคำสั่งเพื่อนับว่ามีเลข 5 อยู่ในทูเพิลนี้ทั้งหมดกี่ตัว

เฉลย Tuple:
1. my_tuple = (10, 20, 30)
2. print(days[2])
3. x, y = point
4. t3 = t1 + t2
5. numbers.count(5)`}
        />

      </main>
    </div>
  );
}
