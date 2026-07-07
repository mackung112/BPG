import React, { useState } from 'react';
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
  Terminal
} from 'lucide-react';

export default function DSA1_7() {
  // ─── Layer 1: Ambient Background Blobs (Orange & Indigo Theme) ─────────────
  const DSA1_7_BLOBS = [
    { color: 'bg-orange-200',  size: 'w-[450px] h-[450px]', position: '-top-32 -left-32',   opacity: 'opacity-40' },
    { color: 'bg-indigo-200',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32',  opacity: 'opacity-35' },
    { color: 'bg-amber-100',   size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-slate-200',   size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3',    opacity: 'opacity-25' }
  ];

  // ─── Simulator States ──────────────────────────────────────────────────────
  const [activeCase, setActiveCase] = useState('case1'); // case1 | case2 | case3
  const [currentStep, setCurrentStep] = useState(0);

  // Cases Definitions
  const casesData = {
    case1: {
      title: "การอ้างอิงตัวแปรแบบไดนามิก (Variable References & Mutability)",
      description: "ทำความเข้าใจกลไกเมื่อตัวแปร x และ y ชี้วัตถุ List ตัวเดียวกันใน Heap Memory เมื่อทำการเพิ่มข้อมูลด้วย y.append() จะส่งผลให้ค่าใน x เปลี่ยนตามไปด้วยเนื่องจากเป็นการอ้างอิงวัตถุเดียวกัน",
      maxSteps: 3,
      stepsCode: [
        "# เริ่มต้นจำลองตรรกะอ้างอิง",
        "x = [10, 20]      # สร้าง List และให้ x ชี้ไป",
        "y = x            # ให้ y อ้างอิงตัวแปรเดียวกับ x",
        "y.append(30)     # ปรับปรุงข้อมูลสมาชิกผ่านตัวแปร y"
      ],
      explanation: [
        "เริ่มต้นสภาพแวดล้อม จำลอง Stack และ Heap Memory ให้ว่างเปล่าเพื่อเตรียมประมวลผลคำสั่ง Python",
        "คำสั่ง x = [10, 20] ทำการสร้างออบเจกต์ประเภท List ก้อนใหม่บน Heap Memory ที่แอดเดรส 0x101 และตัวแปร x ใน Stack จะทำหน้าที่ชี้ (Reference) ไปยังตำแหน่งนั้นทันที",
        "คำสั่ง y = x ส่งผลให้ตัวแปร y ใน Stack คัดลอกค่า Address Reference จาก x ทำให้ตัวแปร y ชี้ไปยังออบเจกต์ List ก้อนเดียวกัน (0x101) ไม่ได้เกิดการคัดลอกข้อมูลใหม่แต่อย่างใด",
        "คำสั่ง y.append(30) ทำการแก้ไขสมาชิกของออบเจกต์ List ที่แอดเดรส 0x101 สมาชิกภายในเปลี่ยนเป็น [10, 20, 30] เนื่องจาก x ชี้อยู่ที่เดียวกัน ทำให้ x ได้รับผลลัพธ์นี้ไปด้วยโดยปริยาย (Mutable Behavior)"
      ]
    },
    case2: {
      title: "การจัดการข้อผิดพลาดและดักจับบั๊ก (Exception try-except)",
      description: "สาธิตความล้มเหลวของการทำงานเมื่อเข้าถึงดัชนีเกินขอบเขตโครงสร้างข้อมูล (IndexError) และวิธีป้องกันไม่ให้ระบบล่ม (Crash) โดยใช้บล็อกการควบคุม try-except",
      maxSteps: 5,
      stepsCode: [
        "# เริ่มต้นจำลองการดักจับข้อผิดพลาด",
        "data = [10, 20]  # สร้าง List ขนาด 2 ช่อง",
        "try:             # เริ่มต้นบล็อกเฝ้าระวังภัยภัย",
        "    val = data[5] # พยายามดึงค่า index 5 (ไม่มีอยู่จริง!)",
        "except IndexError:# ตรวจพบ IndexError และเข้าทำงานบล็อกนี้",
        "    val = -1      # กำหนดค่ากู้ภัยเริ่มต้นและรักษาระบบให้รอดพ้น"
      ],
      explanation: [
        "เตรียมพร้อมรันโค้ดจัดการความล้มเหลว บอร์ดคอนโซลและระบบเฝ้าระวังภัยทำงาน",
        "คำสั่ง data = [10, 20] จัดทำออบเจกต์ List ขนาด 2 สมาชิก (index 0 และ 1) ไว้บน Heap ที่แอดเดรส 0x201 โดยมีตัวแปร data ใน Stack ชี้เชื่อมไปหา",
        "โค้ดเข้าสู่บล็อกควบคุม try: ระบบเตรียมการดักจับสัญญาณผิดปกติที่อาจเกิดขึ้นจากการทำงานภายในสเต็ปถัดไป",
        "คำสั่ง val = data[5] พยายามเข้าถึงตำแหน่งที่เกินโครงสร้าง (ขอบเขตสูงสุดคือ 1) ส่งผลให้ตัวแปรเกิดความล้มเหลว รันไทม์จะทริกเกอร์สัญญาณ IndexError ขึ้นทันที คอนโซลกะพริบแจ้งเตือนระดับวิกฤต!",
        "ระบบตรวจสอบความขัดแย้งและพบข้อกำหนดในบล็อก except IndexError: จึงทำการโอนถ่ายการทำงานมายังบล็อกนี้เพื่อป้องกันไม่ให้โปรแกรมทั้งหมดพังและหยุดการรันลง",
        "คำสั่งกู้ภัย val = -1 กำหนดค่าเริ่มต้นฉุกเฉินให้ตัวแปร val เก็บค่าคงที่พิเศษ -1 เพื่อให้ระบบประมวลผลต่อในส่วนถัดไปได้อย่างปลอดภัยโดยปราศจากการขัดจังหวะระบบ"
      ]
    },
    case3: {
      title: "การเชื่อมโยงคลาสและวัตถุโครงสร้างโหนด (OOP Node Connection)",
      description: "สาธิตพื้นฐานโครงสร้างข้อมูลที่ไม่ต่อเนื่อง (เช่น Linked List) ผ่านการสร้างวัตถุ Class Node เพื่อจัดเก็บค่าข้อมูล (data) และพอยน์เตอร์ชี้วัตถุถัดไป (next)",
      maxSteps: 3,
      stepsCode: [
        "# เริ่มต้นสร้างคลาส Node และพิมพ์เขียววัตถุ",
        "node1 = Node(\"A\")  # สร้าง Node ตัวแรกเก็บข้อมูล 'A'",
        "node2 = Node(\"B\")  # สร้าง Node ตัวที่สองเก็บข้อมูล 'B'",
        "node1.next = node2 # เชื่อมพอยน์เตอร์ next ของ node1 ชี้ไป node2"
      ],
      explanation: [
        "ระบบเตรียมพร้อมเรียกใช้งานแม่แบบ Class Node (มีตัวแปร data และ pointer next เริ่มต้นเป็น None)",
        "คำสั่ง node1 = Node('A') สั่งคอนสตรัคเตอร์ __init__ ให้สร้างอ็อบเจกต์ Node ตัวแรกใน Heap (0x301) บรรจุข้อมูล 'A' และกำหนดคุณลักษณะ next ชี้ไปที่ None โดยตัวแปร node1 บน Stack ชี้มาหา",
        "คำสั่ง node2 = Node('B') ทำการสถาปนาอ็อบเจกต์ Node ตัวที่สองบน Heap (0x302) บรรจุข้อมูล 'B' และ next เป็น None ตัวแปร node2 บน Stack จะชี้ไปยัง Node ตัวใหม่นี้",
        "คำสั่ง node1.next = node2 เปลี่ยนแปลงค่า Pointer ภายในคุณลักษณะ next ของโหนด 'A' (0x301) ให้เปลี่ยนทิศทางการเชื่อมต่อ วิ่งพุ่งทะยานโยงชี้ไปหาแกนกึ่งกลางของ Node 'B' (0x302) ได้สำเร็จสมบูรณ์"
      ]
    }
  };

  const currentCaseData = casesData[activeCase];

  // Handler to progress step
  const handleNextStep = () => {
    if (currentStep < currentCaseData.maxSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleCaseChange = (caseId) => {
    setActiveCase(caseId);
    setCurrentStep(0);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_7_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Introduction ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              พื้นฐานตัวแปรและโครงสร้างควบคุม / Python Engine SOT
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทบทวนภาษา Python สำหรับโครงสร้างข้อมูล
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ภาษา Python โดดเด่นด้านความเรียบง่ายและยืดหยุ่นในการเขียนคำสั่ง แต่ในมุมมองของโครงสร้างข้อมูล 
            เราต้องเข้าใจพฤติกรรมในหน่วยความจำระดับลึก เช่น กลไกการอ้างอิงวัตถุ (Reference) ของตัวแปร 
            และโครงสร้างควบคุมที่ส่งผลโดยตรงต่อการเขียนโปรแกรมเชิงวัตถุ (OOP) เพื่อปูพื้นฐานสู่การสร้างโครงสร้างแบบเชื่อมโยง
          </p>
        </section>

        {/* ─── Section 2: Theory Stack (Vertical Stacking) ─── */}
        <section className="space-y-10">
          
          {/* Subtopic 1 */}
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                A
              </span>
              ตัวแปร, ลูป, และเงื่อนไข (Variables, Loops, and Conditions)
            </h4>
            
            <div className="space-y-3.5 text-zinc-600 text-[15px] leading-relaxed">
              <p>
                ในภาษา Python ตัวแปรไม่ได้เป็น "กล่องใส่ค่า" เหมือนภาษาระดับต่ำทั่วไป แต่ทำหน้าที่เสมือน{' '}
                <span className="bg-orange-50 text-orange-700 font-semibold px-2 py-0.5 rounded border border-orange-100/80 font-mono text-sm">
                  ป้ายชื่ออ้างอิง (Label / Reference)
                </span>{' '}
                ที่ชี้ไปยังวัตถุ (Object) ในหน่วยความจำฮีป (Heap Memory) โดยตรง โดยมีกลไกสำคัญดังนี้:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-200/50">
                  <span className="font-bold text-slate-800 block text-sm mb-1">กลไก Dynamic Typing</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    ระบบจะกำหนดประเภทข้อมูลของวัตถุโดยอัตโนมัติขณะรันไทม์ ทำให้ผู้พัฒนาสามารถเปลี่ยนประเภทของตัวแปรไปชี้วัตถุอื่นได้ทันทีโดยไม่ต้องประกาศล่วงหน้า
                  </p>
                </div>
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-200/50">
                  <span className="font-bold text-slate-800 block text-sm mb-1">การวนซ้ำ Traversal Base</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    การท่องเข้าไปในโครงสร้างข้อมูลจะพึ่งพา <code className="text-orange-600">for ... in</code> สำหรับวนอ่านสมาชิกแบบลำดับขั้นตอน และใช้ <code className="text-orange-600">while</code> เมื่อเงื่อนไขยังเป็นจริง
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
              ฟังก์ชันและการจัดการข้อผิดพลาด (Functions & Exception Handling)
            </h4>

            <div className="space-y-4 text-zinc-600 text-[15px] leading-relaxed">
              <p>
                การส่งผ่านตัวแปรเข้าสู่ฟังก์ชันใน Python เป็นไปในลักษณะ{' '}
                <span className="bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-100/80 font-mono text-sm">
                  Pass-by-assignment
                </span>{' '}
                ซึ่งส่งผลอย่างลึกซึ้งต่อการปรับปรุงโครงสร้างข้อมูล:
              </p>

              <div className="bg-amber-50/60 backdrop-blur-md border border-amber-200/60 rounded-2xl p-5 border-l-[4px] border-l-amber-500 leading-relaxed">
                <h5 className="font-bold text-amber-900 text-sm mb-1">Mutable vs Immutable Behavior</h5>
                <p className="text-[13px] text-amber-800">
                  วัตถุที่แก้ไขข้อมูลภายในไม่ได้ (Immutable) เช่น Integer, Tuple, String จะทำการก๊อปปี้แอดเดรสสร้างใหม่ทันทีเมื่อเกิดการคำนวณใหม่ 
                  ในทางกลับกัน วัตถุที่แก้ไขได้ (Mutable) เช่น List และ Dictionary จะอัปเดตสมาชิกภายในจุดเดิม ทำให้ทุกตัวแปรที่ชี้ไปที่เดียวกันเห็นการเปลี่ยนแปลงร่วมกันทันที
                </p>
              </div>

              <p>
                นอกจากนี้ การเข้าถึงตำแหน่งดัชนีของโครงสร้างข้อมูล (เช่น การจัดการ Stack ว่างเปล่า) มีโอกาสเกิดข้อผิดพลาด 
                เราจะใช้โครงสร้าง <span className="font-bold text-slate-800">try - except - finally</span>{' '}
                ในการดักจับขอบเขตรันไทม์เพื่อสยบความล้มเหลวและรักษาระบบโปรแกรมไม่ให้สิ้นชีพกลางทาง
              </p>
            </div>
          </div>

          {/* Subtopic 3 */}
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                C
              </span>
              การเขียนโปรแกรมเชิงวัตถุ (OOP) เบื้องต้นใน Python
            </h4>

            <div className="space-y-3.5 text-zinc-600 text-[15px] leading-relaxed">
              <p>
                โครงสร้างข้อมูลระดับสูง (Linked List, Trees, Graphs) ในภาคการทำงานจริง จะขับเคลื่อนด้วยโครงสร้างเชิงวัตถุ 
                โดยมีพิมพ์เขียว <span className="font-bold text-slate-800">Class</span> ที่รวบรวมสถานะข้อมูล (Attributes) และพฤติกรรม (Methods) เข้าไว้ด้วยกัน:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1.5 text-xs">
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 space-y-1">
                  <span className="font-bold text-slate-800 block">Class & Object Instance</span>
                  <p className="text-zinc-500 leading-normal">
                    คลาสคือเทมเพลตต้นแบบ ส่วนวัตถุจริงคืออินสแตนซ์ที่จองแรมเพื่อเก็บข้อมูลจริง
                  </p>
                </div>
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 space-y-1">
                  <span className="font-bold text-slate-800 block">Constructor (__init__)</span>
                  <p className="text-zinc-500 leading-normal">
                    เมธอดอัตโนมัติสำหรับกวาดค่าเริ่มต้น เช่น การกำหนดพอยน์เตอร์ถัดไปให้เป็น None เสมอ
                  </p>
                </div>
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 space-y-1">
                  <span className="font-bold text-slate-800 block">Keyword 'self'</span>
                  <p className="text-zinc-500 leading-normal">
                    ตัวแทนอ้างอิงวัตถุปัจจุบัน ช่วยให้โหนดยึดค่าตัวแปรภายในและชี้สายสัมพันธ์ไปภายนอกได้
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: PyOOP-Visualizer (Interactive Memory Mapper) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองระดับลึกของหน่วยความจำ / PyOOP-Visualizer
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แผนภาพจำลองประมวลผลโค้ดและโครงสร้างแรม (Stack & Heap Memory Map)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            เลือกด่านจำลองเหตุการณ์ในกล่องควบคุมด้านล่าง เพื่อเปิดใช้งานตัวถอดรหัสทีละบรรทัด (Step-by-step Execution Engine) 
            และสังเกตความแตกต่างเมื่อตัวแปรชี้วัตถุในแรม Stack vs Heap พร้อมลูกศรอ้างอิงที่วิ่งเข้าแกนกึ่งกลางอย่างเป็นระบบ:
          </p>

          <SimulatorShell
            dark
            title="Python OOP & Reference Memory Visualizer"
            icon={<Cpu className="w-8 h-8 text-orange-400 animate-pulse" />}
            glowColors="from-slate-800/40 to-slate-950/15"
            iconColor="text-orange-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Sandbox Control Panel (Dark Theme) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[490px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  DEBUGER INTERACTION
                </span>

                <div className="space-y-5">
                  
                  {/* Case Switcher */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      1. เลือกเคสตัวอย่างบทเรียน Python:
                    </span>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'case1', label: '🔗 Variable References & Mutability', accent: 'border-orange-500/80 text-orange-400' },
                        { id: 'case2', label: '⚠️ try-except Exception Handling', accent: 'border-rose-500/80 text-rose-400' },
                        { id: 'case3', label: '📦 OOP Node & Reference Linking', accent: 'border-indigo-500/80 text-indigo-400' }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleCaseChange(item.id)}
                          className={`p-2.5 rounded-xl border text-[11.5px] font-bold transition-all text-left cursor-pointer ${
                            activeCase === item.id
                              ? `bg-slate-800/90 ${item.accent} shadow shadow-slate-950`
                              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Case description */}
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans">
                    <span className="text-[10px] font-mono font-bold text-slate-500 block mb-1 uppercase">เป้าหมายจำลอง:</span>
                    {currentCaseData.description}
                  </div>

                  {/* Execution Stepper Controls */}
                  <div className="space-y-3.5 pt-1.5 border-t border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      2. สเต็ปและเครื่องมือควบคุมประมวลผล:
                    </span>

                    <div className="flex gap-2.5">
                      <button
                        onClick={handleNextStep}
                        disabled={currentStep >= currentCaseData.maxSteps}
                        className={`grow flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentStep >= currentCaseData.maxSteps
                            ? 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow shadow-orange-950/40'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Step Forward (▶)
                      </button>

                      <button
                        onClick={handleReset}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono font-bold text-white bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500">สเต็ปปัจจุบัน (Current Step):</span>
                      <span className="text-orange-400 tracking-wider">
                        {currentStep} / {currentCaseData.maxSteps}
                      </span>
                    </div>
                  </div>

                  {/* Code Line Highlight window */}
                  <div className="space-y-2 pt-1 border-t border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      3. ติดตามรหัสคำสั่งขั้นตอนการประมวลผล (Step Trace):
                    </span>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto min-h-[110px] space-y-1">
                      {currentCaseData.stepsCode.map((line, idx) => (
                        <div
                          key={idx}
                          className={`px-2 py-0.5 rounded transition-all leading-normal ${
                            currentStep === idx
                              ? 'bg-orange-500/20 border-l-[3px] border-l-orange-500 text-white font-bold'
                              : 'text-zinc-500 opacity-60'
                          }`}
                        >
                          <span className="inline-block w-4 text-slate-600 text-[10px] select-none mr-2">
                            {idx + 1}
                          </span>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Explanation text box */}
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11.5px] leading-relaxed text-emerald-400 bg-black/45 p-3 rounded-xl border border-slate-800 font-sans min-h-[75px]">
                  <span className="text-zinc-500 block text-[9px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-slate-500" />
                    การอธิบายเหตุการณ์ในคอมพิวเตอร์:
                  </span>
                  {currentCaseData.explanation[currentStep]}
                </div>
              </div>

              {/* Right Memory Area Canvas Board (Dark Theme) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[490px]">
                
                {/* Board Label */}
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 absolute top-3 left-4 right-4">
                  <span>MEMORY SYSTEM SIMULATION (RAM MODEL)</span>
                  <span className="text-slate-400">HEAP BASE: DYNAMIC ALLOC</span>
                </div>

                {/* Main Memory SVG canvas */}
                <div className="grow flex items-center justify-center mt-6">
                  <div className="w-full h-[320px] bg-slate-900/40 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center p-2 shadow-inner">
                    
                    <svg className="w-full h-full" viewBox="0 0 600 320">
                      
                      {/* Define Marker End arrow design once */}
                      <defs>
                        <marker
                          id="arrow"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fb923c" />
                        </marker>
                        <marker
                          id="oopArrow"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                        </marker>
                      </defs>

                      {/* Layout Labels */}
                      {/* Stack Header */}
                      <rect x="25" y="15" width="200" height="28" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                      <text x="125" y="32" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-bold font-mono tracking-wider">🗂️ STACK AREA (References)</text>

                      {/* Heap Header */}
                      <rect x="345" y="15" width="230" height="28" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                      <text x="460" y="32" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-bold font-mono tracking-wider">📦 HEAP AREA (Objects & Nodes)</text>

                      {/* Divider dash line */}
                      <line x1="300" y1="20" x2="300" y2="300" stroke="#334155" strokeDasharray="4 6" />

                      {/* ==================== CASE 1 VISUALS ==================== */}
                      {activeCase === 'case1' && (
                        <>
                          {/* STACK: x variable */}
                          {currentStep >= 1 && (
                            <g className="transition-all duration-300">
                              <rect x="35" y="80" width="180" height="42" rx="10" fill="#1e1b4b/65" stroke="#3730a3" strokeWidth="1.5" />
                              <text x="50" y="105" fill="#c084fc" className="text-[11.5px] font-bold font-mono">x</text>
                              <text x="145" y="105" fill="#e2e8f0" className="text-[11px] font-mono">0x101 (ref)</text>
                              <circle cx="200" cy="101" r="5" fill="#f43f5e" />
                            </g>
                          )}

                          {/* STACK: y variable */}
                          {currentStep >= 2 && (
                            <g className="transition-all duration-300">
                              <rect x="35" y="160" width="180" height="42" rx="10" fill="#1e1b4b/65" stroke="#3730a3" strokeWidth="1.5" />
                              <text x="50" y="185" fill="#c084fc" className="text-[11.5px] font-bold font-mono">y</text>
                              <text x="145" y="185" fill="#e2e8f0" className="text-[11px] font-mono">0x101 (ref)</text>
                              <circle cx="200" cy="181" r="5" fill="#f43f5e" />
                            </g>
                          )}

                          {/* HEAP: List Object */}
                          {currentStep >= 1 && (
                            <g className="transition-all duration-300">
                              {/* Glowing Backdrop if modified */}
                              <rect
                                x="370"
                                y="110"
                                width="180"
                                height="75"
                                rx="14"
                                fill="#180b03/85"
                                stroke={currentStep === 3 ? '#ea580c' : '#c2410c'}
                                strokeWidth="2.2"
                              />
                              <text x="385" y="132" fill="#fb923c" className="text-[11px] font-bold font-mono">List (Address: 0x101)</text>
                              
                              {/* Inner members list representation */}
                              <rect x="385" y="145" width="150" height="28" rx="8" fill="#1e293b" stroke="#334155" />
                              <text x="460" y="163" fill="#e2e8f0" textAnchor="middle" className="text-xs font-mono font-bold tracking-widest">
                                {currentStep === 3 ? '[10, 20, 30]' : '[10, 20]'}
                              </text>

                              {/* Highlight sparkle if updated */}
                              {currentStep === 3 && (
                                <g>
                                  <circle cx="510" cy="130" r="10" fill="#ea580c" className="animate-ping" opacity="0.3" />
                                  <circle cx="510" cy="130" r="4" fill="#fb923c" />
                                </g>
                              )}
                            </g>
                          )}

                          {/* Connection Arrows: x -> heap */}
                          {currentStep >= 1 && (
                            <path
                              d="M 200,101 C 260,101 290,147 370,147"
                              fill="none"
                              stroke="#fb923c"
                              strokeWidth="2"
                              markerEnd="url(#arrow)"
                              className="transition-all duration-300"
                            />
                          )}

                          {/* Connection Arrows: y -> heap */}
                          {currentStep >= 2 && (
                            <path
                              d="M 200,181 C 260,181 290,147 370,147"
                              fill="none"
                              stroke="#fb923c"
                              strokeWidth="2"
                              markerEnd="url(#arrow)"
                              className="transition-all duration-300"
                            />
                          )}
                        </>
                      )}

                      {/* ==================== CASE 2 VISUALS ==================== */}
                      {activeCase === 'case2' && (
                        <>
                          {/* STACK: data variable */}
                          {currentStep >= 1 && (
                            <g className="transition-all duration-300">
                              <rect x="35" y="80" width="180" height="42" rx="10" fill="#111827/70" stroke="#475569" strokeWidth="1.5" />
                              <text x="50" y="105" fill="#f59e0b" className="text-[11.5px] font-bold font-mono">data</text>
                              <text x="145" y="105" fill="#e2e8f0" className="text-[11px] font-mono">0x201 (ref)</text>
                              <circle cx="200" cy="101" r="5" fill="#f59e0b" />
                            </g>
                          )}

                          {/* STACK: try status */}
                          {currentStep >= 2 && currentStep <= 3 && (
                            <g className="transition-all duration-300">
                              <rect x="35" y="145" width="180" height="32" rx="8" fill="#14532d/50" stroke="#22c55e" strokeWidth="1.5" className="animate-pulse" />
                              <text x="90" y="165" fill="#4ade80" className="text-[10px] font-bold text-center">🛡️ Active try block...</text>
                            </g>
                          )}

                          {/* STACK: val variable */}
                          {currentStep >= 5 && (
                            <g className="transition-all duration-300">
                              <rect x="35" y="200" width="180" height="42" rx="10" fill="#1e1b4b/65" stroke="#3730a3" strokeWidth="1.5" />
                              <text x="50" y="225" fill="#818cf8" className="text-[11.5px] font-bold font-mono">val</text>
                              <text x="160" y="225" fill="#e2e8f0" className="text-[11px] font-mono font-bold">-1</text>
                            </g>
                          )}

                          {/* HEAP: data list object */}
                          {currentStep >= 1 && (
                            <g className="transition-all duration-300">
                              <rect x="370" y="80" width="180" height="75" rx="14" fill="#0f172a" stroke="#475569" strokeWidth="1.8" />
                              <text x="385" y="102" fill="#94a3b8" className="text-[10.5px] font-bold font-mono">List (Address: 0x201)</text>
                              
                              <rect x="385" y="115" width="150" height="28" rx="8" fill="#1e293b" stroke="#334155" />
                              <text x="460" y="133" fill="#e2e8f0" textAnchor="middle" className="text-xs font-mono font-bold tracking-widest">[10, 20]</text>
                            </g>
                          )}

                          {/* Arrow connection for data variable */}
                          {currentStep >= 1 && (
                            <path
                              d="M 200,101 C 250,101 290,117 370,117"
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth="2"
                              markerEnd="url(#arrow)"
                              className="transition-all duration-300"
                            />
                          )}

                          {/* IndexError Exception Overlay Box */}
                          {currentStep === 3 && (
                            <g className="transition-all duration-300">
                              {/* Background overlay flash red */}
                              <rect x="325" y="180" width="260" height="110" rx="16" fill="#7f1d1d/90" stroke="#ef4444" strokeWidth="2.5" className="animate-pulse" />
                              <text x="455" y="208" fill="#f87171" textAnchor="middle" className="text-xs font-extrabold font-mono">⚠️ CRITICAL EXCEPTION THROWN</text>
                              
                              <rect x="340" y="222" width="230" height="52" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1" />
                              <text x="355" y="238" fill="#fca5a5" className="text-[9.5px] font-mono">IndexError: list index out of range</text>
                              <text x="355" y="252" fill="#ef4444" className="text-[9.5px] font-mono font-bold">data[5] is inaccessible</text>
                              <text x="355" y="266" fill="#f87171" className="text-[9.5px] font-mono">Size is 2. Attempted to read index 5.</text>
                            </g>
                          )}

                          {/* Catch IndexError Block representation */}
                          {currentStep === 4 && (
                            <g className="transition-all duration-300">
                              <rect x="325" y="180" width="260" height="110" rx="16" fill="#14532d/90" stroke="#22c55e" strokeWidth="2" />
                              <text x="455" y="208" fill="#4ade80" textAnchor="middle" className="text-xs font-bold font-mono">🛡️ EXCEPTION INTERCEPTED</text>
                              
                              <rect x="340" y="222" width="230" height="52" rx="8" fill="#064e3b" stroke="#22c55e" strokeWidth="1" />
                              <text x="355" y="240" fill="#a7f3d0" className="text-[9.5px] font-sans">except IndexError as e: matched!</text>
                              <text x="355" y="258" fill="#34d399" className="text-[9.5px] font-sans font-bold">Redirecting execution flow...</text>
                            </g>
                          )}

                          {/* Rescue Completed Visual */}
                          {currentStep >= 5 && (
                            <g className="transition-all duration-300">
                              <rect x="325" y="180" width="260" height="100" rx="16" fill="#1e293b/90" stroke="#0284c7" strokeWidth="2" />
                              <text x="455" y="205" fill="#38bdf8" textAnchor="middle" className="text-xs font-bold font-mono">✅ RECOVERY COMPLETED</text>
                              
                              <rect x="340" y="218" width="230" height="46" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
                              <text x="355" y="235" fill="#bae6fd" className="text-[10px] font-sans">ความเสียหายถูกแก้ไขสำเร็จ</text>
                              <text x="355" y="250" fill="#38bdf8" className="text-[10px] font-sans font-bold">ระบบประมวลผลต่ออย่างปกติ</text>
                            </g>
                          )}
                        </>
                      )}

                      {/* ==================== CASE 3 VISUALS ==================== */}
                      {activeCase === 'case3' && (
                        <>
                          {/* STACK: node1 variable */}
                          {currentStep >= 1 && (
                            <g className="transition-all duration-300">
                              <rect x="35" y="80" width="180" height="42" rx="10" fill="#1e1b4b/65" stroke="#3730a3" strokeWidth="1.5" />
                              <text x="50" y="105" fill="#818cf8" className="text-[11.5px] font-bold font-mono">node1</text>
                              <text x="145" y="105" fill="#e2e8f0" className="text-[11px] font-mono">0x301 (ref)</text>
                              <circle cx="200" cy="101" r="5" fill="#818cf8" />
                            </g>
                          )}

                          {/* STACK: node2 variable */}
                          {currentStep >= 2 && (
                            <g className="transition-all duration-300">
                              <rect x="35" y="180" width="180" height="42" rx="10" fill="#1e1b4b/65" stroke="#3730a3" strokeWidth="1.5" />
                              <text x="50" y="205" fill="#818cf8" className="text-[11.5px] font-bold font-mono">node2</text>
                              <text x="145" y="205" fill="#e2e8f0" className="text-[11px] font-mono">0x302 (ref)</text>
                              <circle cx="200" cy="201" r="5" fill="#818cf8" />
                            </g>
                          )}

                          {/* HEAP: node1 Object (Node "A") */}
                          {currentStep >= 1 && (
                            <g className="transition-all duration-300">
                              <rect x="350" y="70" width="105" height="70" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1.8" />
                              <text x="402" y="90" fill="#94a3b8" textAnchor="middle" className="text-[9.5px] font-bold font-mono">Node (0x301)</text>
                              
                              {/* Attributes data and next */}
                              <rect x="358" y="100" width="40" height="30" rx="6" fill="#0f172a" stroke="#334155" />
                              <text x="378" y="118" fill="#e2e8f0" textAnchor="middle" className="text-xs font-mono font-extrabold">A</text>
                              <text x="378" y="128" fill="#64748b" textAnchor="middle" className="text-[7.5px] font-mono">data</text>

                              <rect x="405" y="100" width="42" height="30" rx="6" fill="#0f172a" stroke={currentStep === 3 ? '#818cf8' : '#334155'} />
                              <text x="426" y="118" fill={currentStep === 3 ? '#818cf8' : '#64748b'} textAnchor="middle" className="text-[10px] font-mono font-bold">
                                {currentStep === 3 ? '0x302' : 'None'}
                              </text>
                              <text x="426" y="128" fill="#64748b" textAnchor="middle" className="text-[7.5px] font-mono">next</text>

                              {/* Dot representing the pointer start */}
                              <circle cx="426" cy="115" r="3.5" fill="#818cf8" />
                            </g>
                          )}

                          {/* HEAP: node2 Object (Node "B") */}
                          {currentStep >= 2 && (
                            <g className="transition-all duration-300">
                              <rect x="475" y="160" width="105" height="70" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1.8" />
                              <text x="527" y="180" fill="#94a3b8" textAnchor="middle" className="text-[9.5px] font-bold font-mono">Node (0x302)</text>
                              
                              {/* Attributes data and next */}
                              <rect x="483" y="190" width="40" height="30" rx="6" fill="#0f172a" stroke="#334155" />
                              <text x="503" y="208" fill="#e2e8f0" textAnchor="middle" className="text-xs font-mono font-extrabold">B</text>
                              <text x="503" y="218" fill="#64748b" textAnchor="middle" className="text-[7.5px] font-mono">data</text>

                              <rect x="530" y="190" width="42" height="30" rx="6" fill="#0f172a" stroke="#334155" />
                              <text x="551" y="208" fill="#64748b" textAnchor="middle" className="text-[10px] font-mono">None</text>
                              <text x="551" y="218" fill="#64748b" textAnchor="middle" className="text-[7.5px] font-mono">next</text>
                            </g>
                          )}

                          {/* Connections: node1 stack -> heap */}
                          {currentStep >= 1 && (
                            <path
                              d="M 200,101 C 250,101 280,105 350,105"
                              fill="none"
                              stroke="#818cf8"
                              strokeWidth="1.8"
                              markerEnd="url(#oopArrow)"
                              className="transition-all duration-300"
                            />
                          )}

                          {/* Connections: node2 stack -> heap */}
                          {currentStep >= 2 && (
                            <path
                              d="M 200,201 C 250,201 320,195 475,195"
                              fill="none"
                              stroke="#818cf8"
                              strokeWidth="1.8"
                              markerEnd="url(#oopArrow)"
                              className="transition-all duration-300"
                            />
                          )}

                          {/* Object reference connection: node1.next -> node2 (Absolute Center Connection) */}
                          {/* We draw the arrow from the next block of node1 (426, 115) to geometric center of node2 (527, 195) */}
                          {currentStep === 3 && (
                            <path
                              d="M 426,115 C 450,115 480,140 527,195"
                              fill="none"
                              stroke="#818cf8"
                              strokeWidth="2.2"
                              markerEnd="url(#oopArrow)"
                              className="transition-all duration-300 animate-pulse"
                            />
                          )}
                        </>
                      )}

                      {/* Initial state empty memory text */}
                      {currentStep === 0 && (
                        <text x="300" y="160" fill="#475569" textAnchor="middle" className="text-xs font-mono font-bold">
                          [ระบบหน่วยความจำว่างเปล่า กด Step Forward เพื่อรันทีละสเต็ป]
                        </text>
                      )}

                    </svg>
                  </div>
                </div>

                {/* Legend bar */}
                <div className="mt-3 bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex justify-around text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span>
                    <span>Stack References (ตัวแปร)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-orange-500 block"></span>
                    <span>Heap Alloc (วัตถุข้อมูลในแรม)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-orange-400">→</span>
                    <span>Geometric Pointer (ตัวชี้แกนกึ่งกลาง)</span>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ใบงานทบทวนกลไกหน่วยความจำของภาษา Python สำหรับโครงสร้างข้อมูล"
          taskText={`คำชี้แจง: ให้นักเรียนสั่งวิเคราะห์ทดลองและกดเลือกคำสั่งจำลองรันทีละขั้นตอน (Step Forward) ในตัวจำลอง PyOOP-Visualizer ด้านบน สังเกตพฤติกรรมโครงสร้างหน่วยความจำและตอบคำถามทางวิชาการลงในระบบการบ้าน:

1. อธิบายคำจำกัดความและกลไกของ "Pass-by-assignment" ในภาษา Python เมื่อทำการส่งผ่านวัตถุประเภทแก้ไขข้อมูลได้ (Mutable) เช่น List เข้าสู่ฟังก์ชัน 
   - อธิบายเปรียบเทียบในแง่ของตำแหน่งแอดเดรสหน่วยความจำ และเหตุใดการแก้ไขภายในฟังก์ชันจึงส่งผลกระทบต่อวัตถุภายนอก
2. จากผลการจำลองด่านที่ 2 (try-except Exception Handling) เหตุใดการใช้บล็อก try-except จึงเป็นสถาปัตยกรรมที่วิศวกรซอฟต์แวร์จำเป็นต้องใช้ในการพัฒนาโครงสร้างข้อมูลระดับสูง
   - ยกตัวอย่างเหตุการณ์รันไทม์ (Runtime Errors) ของโครงสร้างข้อมูลที่จำต้องประยุกต์ใช้ระบบดักจับนี้อย่างน้อย 2 สถานการณ์
3. ในด่านจำลองที่ 3 (OOP Node Connection) เมื่อเกิดคำสั่ง node1.next = node2 
   - อธิบายกลไกในระดับ Heap Memory ว่าแอตทริบิวต์ next ของวัตถุโหนด A มีการเปลี่ยนแปลงค่า Reference อย่างไร และส่งผลอย่างไรต่อการเชื่อมต่อเป็นสายต่อลำดับขั้นตอน`}
        />

      </main>
    </div>
  );
}
