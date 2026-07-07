import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  HelpCircle, 
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
  Eye
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  SimulatorShell, 
  ConceptCard, 
  AmbientBackdrop,
  ConsoleScreen,
  QuizEngine
} from '../shared';

// Custom CSS animation keyframes
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
    @keyframes pulse-teal-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.7)); }
    }
    @keyframes pulse-indigo-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(79, 70, 229, 0.8)); }
    }
    .animate-float-subtle { animation: float-subtle 4s ease-in-out infinite; }
    .animate-flow-line-dsa { animation: flow-line-dsa 1.2s linear infinite; }
    .animate-pulse-teal-glow { animation: pulse-teal-glow 1.5s ease-in-out infinite; }
    .animate-pulse-indigo-glow { animation: pulse-indigo-glow 1.2s ease-in-out infinite; }
  `}} />
);

export default function DSA1_6() {
  // ─── Layer 1: Ambient Background Blobs (Teal/Indigo/Sky/Purple) ───
  const blobs = [
    { color: 'bg-teal-200',    size: 'w-[450px] h-[450px]', position: '-top-32 -left-32',   opacity: 'opacity-45' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32',  opacity: 'opacity-40' },
    { color: 'bg-emerald-200', size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-35' },
    { color: 'bg-indigo-200',  size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3',    opacity: 'opacity-30' }
  ];

  // ─── State for ADT Simulator ───
  const [adtType, setAdtType] = useState('Stack'); // Stack | Queue
  const [implementation, setImplementation] = useState('Array'); // Array | LinkedList
  const [items, setItems] = useState(['A', 'B']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1); // -1: idle, 0: Interface API, 1: Implementation logic, 2: Physical RAM write, 3: Completed
  const [terminalLogs, setTerminalLogs] = useState(['[ADT READY] แพลตฟอร์มจำลอง Abstract Data Type เริ่มต้นทำงานแล้ว']);
  const [peekedValue, setPeekedValue] = useState(null);

  const handlePush = (val) => {
    if (isProcessing) return;
    if (items.length >= 5) {
      setTerminalLogs(prev => [
        ...prev, 
        `[⚠️ OVERFLOW] การประมวลผลล้มเหลว: โครงสร้างข้อมูลเต็มขีดจำกัดจำลอง (ความยาวสูงสุด: 5)`
      ]);
      return;
    }
    
    setIsProcessing(true);
    setPeekedValue(null);
    setActiveStep(0);
    
    const opName = adtType === 'Stack' ? 'push' : 'enqueue';
    setTerminalLogs([
      `[STEP 1 - INTERFACE API] เรียกใช้ API เชิงนามธรรม: adt.${opName}('${val}')`,
      `[STEP 1 - INTERFACE API] อินเตอร์เฟซได้รับค่าอินพุต โดยไม่คำนึงถึงโครงสร้างแรมเบื้องหลัง`
    ]);

    // Step 1: Implementation Logic
    setTimeout(() => {
      setActiveStep(1);
      if (implementation === 'Array') {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 2 - ARRAY LOGIC] ค้นหาดัชนีทางกายภาพสำหรับวางข้อมูลสินค้า`,
          adtType === 'Stack'
            ? `[STEP 2 - ARRAY LOGIC] โหมด Stack: แทรกข้อมูลเพิ่มที่ท้ายอาร์เรย์ (ดัชนี: ${items.length})`
            : `[STEP 2 - ARRAY LOGIC] โหมด Queue: แทรกข้อมูลเพิ่มที่ท้ายอาร์เรย์ (ดัชนี: ${items.length})`
        ]);
      } else {
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 2 - LINKED LIST LOGIC] สร้างอ็อบเจกต์โนดใหม่ในหน่วยความจำ (Node Object Created)`,
          adtType === 'Stack'
            ? `[STEP 2 - LINKED LIST LOGIC] โหมด Stack: ปรับลิงก์ newNode.next = head; head = newNode`
            : `[STEP 2 - LINKED LIST LOGIC] โหมด Queue: ปรับลิงก์ tail.next = newNode; tail = newNode`
        ]);
      }
    }, 1200);

    // Step 2: Physical RAM Write
    setTimeout(() => {
      setActiveStep(2);
      
      setItems(prev => {
        if (adtType === 'Stack') {
          // Stack: push adds to the end (top) or beginning (if linked list simulation, let's keep array representation)
          return [...prev, val];
        } else {
          // Queue: enqueue adds to the end (back)
          return [...prev, val];
        }
      });

      setTerminalLogs(prev => [
        ...prev,
        `[STEP 3 - PHYSICAL WRITE] ทำการเขียนบันทึกค่าลงพิกัดหน่วยความจำ RAM`,
        implementation === 'Array'
          ? `[STEP 3 - PHYSICAL WRITE] อาร์เรย์อัปเดตช่องหน่วยความจำคงที่สำเร็จ`
          : `[STEP 3 - PHYSICAL WRITE] ผูกพอยน์เตอร์เชื่อมความสัมพันธ์และจองสตอเรจสำเร็จ`
      ]);
    }, 2400);

    // Step 3: Completed
    setTimeout(() => {
      setActiveStep(3);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 4 - DONE] การทำงาน API เสร็จสิ้น ผลลัพธ์ใน ADT สอดคล้องตามพฤติกรรมของ ${adtType}`
      ]);
      setIsProcessing(false);
    }, 3600);
  };

  const handlePop = () => {
    if (isProcessing) return;
    if (items.length === 0) {
      setTerminalLogs(prev => [
        ...prev, 
        `[⚠️ UNDERFLOW] การประมวลผลล้มเหลว: โครงสร้างข้อมูลว่างเปล่า ไม่สามารถลบข้อมูลได้`
      ]);
      return;
    }

    setIsProcessing(true);
    setPeekedValue(null);
    setActiveStep(0);
    
    const opName = adtType === 'Stack' ? 'pop' : 'dequeue';
    setTerminalLogs([
      `[STEP 1 - INTERFACE API] เรียกใช้ API เชิงนามธรรม: adt.${opName}()`,
      `[STEP 1 - INTERFACE API] เตรียมนำข้อมูลออกตามกฎเกณฑ์พฤติกรรมเชิงนามธรรม`
    ]);

    // Step 1: Implementation logic
    setTimeout(() => {
      setActiveStep(1);
      if (adtType === 'Stack') {
        const poppedVal = items[items.length - 1];
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 2 - STACK BEHAVIOR] โหมด Stack (LIFO): นำข้อมูลตัวล่าสุดออกจากส่วนบนสุด (ค่าที่นำออก: ${poppedVal})`,
          implementation === 'Array' 
            ? `[STEP 2 - ARRAY] ลดขนาดดัชนีชี้ตำแหน่งตัวบนสุด (top = top - 1)`
            : `[STEP 2 - LINKED LIST] เลื่อนพอยน์เตอร์เฮด (head = head.next)`
        ]);
      } else {
        const poppedVal = items[0];
        setTerminalLogs(prev => [
          ...prev,
          `[STEP 2 - QUEUE BEHAVIOR] โหมด Queue (FIFO): นำข้อมูลตัวแรกสุดออกจากหัวแถว (ค่าที่นำออก: ${poppedVal})`,
          implementation === 'Array' 
            ? `[STEP 2 - ARRAY] ดึงค่าช่องแรกสุด และจำเป็นต้องเลื่อนสไลด์ข้อมูลตัวถัดไปมาข้างหน้า O(n)`
            : `[STEP 2 - LINKED LIST] ปรับลิงก์หัวคิวไปยังโหนดถัดไปในระบบ O(1)`
        ]);
      }
    }, 1200);

    // Step 2: Physical RAM Write
    setTimeout(() => {
      setActiveStep(2);
      
      setItems(prev => {
        if (adtType === 'Stack') {
          // Remove last element (top of stack)
          return prev.slice(0, -1);
        } else {
          // Remove first element (front of queue)
          return prev.slice(1);
        }
      });

      setTerminalLogs(prev => [
        ...prev,
        `[STEP 3 - PHYSICAL WRITE] ดำเนินการปลดระบายหน่วยความจำ RAM พิกัดดังกล่าวเสร็จสิ้น`
      ]);
    }, 2400);

    // Step 3: Done
    setTimeout(() => {
      setActiveStep(3);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 4 - DONE] การลบข้อมูลเสร็จสมบูรณ์เรียบร้อยแล้ว`
      ]);
      setIsProcessing(false);
    }, 3600);
  };

  const handlePeek = () => {
    if (items.length === 0) {
      setTerminalLogs(prev => [...prev, `[PEEK FAILED] โครงสร้างข้อมูลไม่มีสมาชิก`]);
      return;
    }
    const target = adtType === 'Stack' ? items[items.length - 1] : items[0];
    setPeekedValue(target);
    setTerminalLogs(prev => [
      ...prev,
      `[PEEK CALL] ตรวจสอบค่าตัว${adtType === 'Stack' ? 'บนสุด' : 'หน้าสุด'} (โดยไม่นำออก) ได้รับผลลัพธ์: '${target}'`
    ]);
  };

  const handleResetSimulator = () => {
    setItems(['A', 'B']);
    setActiveStep(-1);
    setPeekedValue(null);
    setTerminalLogs(['[SYSTEM RESET] รีเซ็ตค่าสต็อกข้อมูลและโครงสร้างข้อมูล ADT สู่สภาวะเริ่มต้น']);
    setIsProcessing(false);
  };

  // ─── Quiz Engine Configurations ───
  const quizLevels = [
    {
      title: "แนวคิดพื้นฐานของ Abstract Data Type (ADT)",
      desc: "ข้อใดอธิบายความหมายของ Abstract Data Type (ADT) ได้ถูกต้องที่สุดตามทฤษฎีวิทยาการคอมพิวเตอร์",
      options: [
        { key: "A", text: "โมเดลเชิงคณิตศาสตร์ที่กำหนดเมธอดและพฤติกรรมการกระทำกับข้อมูล โดยไม่ผูกมัดกับวิธีการพัฒนาเบื้องหลัง", isCorrect: true },
        { key: "B", text: "โครงสร้างข้อมูลระดับล่างสุดที่บันทึกพิกัดเลขฐานสิบหกในระบบ RAM ของคอมพิวเตอร์", isCorrect: false },
        { key: "C", text: "การสืบทอดคลาสของอ็อบเจกต์ (Class Inheritance) ในภาษาเชิงวัตถุเพื่อเขียนคำสั่งแบบมีโครงสร้าง", isCorrect: false },
        { key: "D", text: "ชนิดข้อมูลที่ระบบปฏิบัติการ Linux จัดสรรให้หน่วยประมวลผล CPU โหลดข้อมูลได้เร็วขึ้น", isCorrect: false }
      ],
      tip: "คำว่า Abstract (นามธรรม) หมายถึง การโฟกัสเฉพาะว่า 'ทำอะไรได้บ้าง (What)' แทนการสนใจเรื่อง 'ทำอย่างไร (How)'"
    },
    {
      title: "ความแตกต่างระหว่าง ADT และ Data Structure",
      desc: "ข้อความใดแสดงให้เห็นความสัมพันธ์ระหว่าง Stack ADT และโครงสร้างข้อมูล (Data Structure) เชิงกายภาพอย่างชัดเจน",
      options: [
        { key: "A", text: "Stack ADT คือแนวคิดนามธรรมที่สามารถสร้างขึ้นจริงได้โดยประยุกต์ใช้โครงสร้างข้อมูลแบบ List หรือ Linked List ก็ได้", isCorrect: true },
        { key: "B", text: "Stack ADT ต้องทำจาก Array เท่านั้น ส่วน Queue ADT ต้องทำจาก Linked List", isCorrect: false },
        { key: "C", text: "ไม่มีความแตกต่างใดๆ ทั้งสองคำสามารถใช้เรียกแทนกันได้ทุกกรณี", isCorrect: false },
        { key: "D", text: "Stack ADT ทำงานช้ากว่าโครงสร้างข้อมูลเชิงกายภาพเสมอ", isCorrect: false }
      ],
      tip: "ADT เปรียบเสมือน 'พิมพ์เขียว / ขอบเขตความสามารถ' ส่วนโครงสร้างข้อมูล (เช่น List, Linked List) คือ 'วัสดุจริง' ที่นำมาประกอบร่าง"
    },
    {
      title: "ข้อดีของการประยุกต์ใช้ ADT",
      desc: "ข้อใดถือเป็นประโยชน์สูงสุดในการเขียนโปรแกรมซอฟต์แวร์ขนาดใหญ่ด้วยแนวคิด ADT และการห่อหุ้มข้อมูล (Encapsulation)",
      options: [
        { key: "A", text: "สามารถปรับเปลี่ยนโค้ดหรือฐานข้อมูลภายในคลาสได้ตลอดเวลาโดยไม่ต้องแก้ไขโค้ดภายนอกที่เรียกใช้ API เดิม", isCorrect: true },
        { key: "B", text: "ทำให้การประมวลผลคำนวณกราฟิก 3D ทำงานได้ลื่นไหลขึ้นเป็นเท่าตัว", isCorrect: false },
        { key: "C", text: "ช่วยประหยัดไฟให้กับเซิร์ฟเวอร์เนื่องจากการทำงานใช้ RAM น้อยลง", isCorrect: false },
        { key: "D", text: "ระบบปฏิบัติการสามารถจดจำคำสั่งและแปลงภาษาแอปพลิเคชันเป็นไบนารีอัตโนมัติ", isCorrect: false }
      ],
      tip: "การแยกแยะอินเตอร์เฟซออกจากรายละเอียดการเขียนโค้ดเบื้องหลัง ช่วยลดการผูกมัดเหนี่ยวรั้งระหว่างโมดูล (Decoupling)"
    },
    {
      title: "การปกป้องข้อมูลระดับแอตทริบิวต์ใน Python",
      desc: "ในภาษา Python ข้อใดเป็นโครงสร้างในการประกาศแอตทริบิวต์เพื่อซ่อนข้อมูลไม่ให้ภารภายนอกเข้าถึงได้โดยตรง (Private Attributes)",
      options: [
        { key: "A", text: "ประกาศตัวแปรสมาชิกโดยใส่เครื่องหมายขีดล่างสองตัว __ (Double Underscore) นำหน้าชื่อ", isCorrect: true },
        { key: "B", text: "ระบุคีย์เวิร์ด private นำหน้าประกาศเช่นเดียวกับภาษา Java หรือ C++", isCorrect: false },
        { key: "C", text: "ใส่สัญลักษณ์เครื่องหมายคำถาม ? ท้ายตัวแปรสมาชิก", isCorrect: false },
        { key: "D", text: "เขียนฟังก์ชันและห่อหุ้มแอตทริบิวต์ทั้งหมดไว้ในรูปของทิวเพิล (Tuple) คงที่", isCorrect: false }
      ],
      tip: "Python ใช้กลไกจำกัดระดับการเข้าถึง (Name Mangling) ด้วยเครื่องหมายขีดล่างสองตัว เช่น `self.__data`"
    }
  ];

  const pythonCode = `class StackADT:
    def __init__(self):
        # 1. ซ่อนโครงสร้างข้อมูลทางกายภาพเบื้องหลัง (Encapsulation)
        # ใช้เครื่องหมาย __ เพื่อกำหนดให้เป็น Private Attribute
        self.__data = []  # การเก็บข้อมูลเบื้องหลังด้วย Python List
        
    def push(self, item: any) -> None:
        """อินเตอร์เฟซหลัก: เพิ่มข้อมูลเข้าสู่ระดับบนสุดของ Stack (LIFO)"""
        self.__data.append(item)
        
    def pop(self) -> any:
        """อินเตอร์เฟซหลัก: นำข้อมูลตัวบนสุดออกจาก Stack"""
        if self.is_empty():
            raise IndexError("สแตกว่างเปล่า (Stack Underflow)")
        return self.__data.pop()
        
    def peek(self) -> any:
        """อินเตอร์เฟซหลัก: ดูข้อมูลตัวบนสุดโดยไม่ลบค่าออกจากโครงสร้าง"""
        if self.is_empty():
            return None
        return self.__data[-1]
        
    def is_empty(self) -> bool:
        """ตรวจสอบสถานะว่างเปล่าของโครงสร้าง"""
        return len(self.__data) == 0
        
    def size(self) -> int:
        """คืนค่าขนาดยอดสมาชิกในโครงสร้างข้อมูล"""
        return len(self.__data)`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <CustomStyles />

      {/* Layer 1: Ambient Background Blobs */}
      <AmbientBackdrop blobs={blobs} />

      {/* Layer 3: Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* Section 1: Intro to ADT */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              วิทยาการคอมพิวเตอร์และแนวคิดเชิงคำนวณ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างข้อมูลแบบนามธรรม (Abstract Data Type: ADT) คืออะไร
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ในการพัฒนาซอฟต์แวร์ <span className="mx-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200/50 text-teal-700 font-mono text-[14px]">Abstract Data Type (ADT)</span> 
            หรือประเภทข้อมูลนามธรรม คือการระบุข้อตกลงและชุดการปฏิบัติการ (API/Operations) ที่ข้อมูลนั้นสามารถทำได้ 
            โดยจะไม่ระบุวิธีการจัดเก็บจริงในฮาร์ดแวร์หรือแรม (Implementation) แนวคิดนี้ช่วยให้นักพัฒนาสามารถแยกแยะ
            <strong>"พฤติกรรมที่ยอมรับ (What)"</strong> ออกจาก <strong>"วิธีการพัฒนาจริงด้านหลัง (How)"</strong> ได้อย่างเด็ดขาด:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ConceptCard
              symbol="Interface"
              title="สเปก/พฤติกรรมเชิงนามธรรม"
              description="ระบุความสามารถหลัก เช่น สแตกรองรับเมธอด push และ pop โดยไม่เจาะจงชนิดโครงสร้างข้อมูลด้านหลัง"
              accent="teal"
            />
            <ConceptCard
              symbol="How"
              title="การประยุกต์เชิงกายภาพ"
              description="คือวิธีการที่ใช้เขียนรหัสโครงสร้างข้อมูลจริง เช่น นำอาร์เรย์ (List) หรือ รายการเชื่อมโยง (Linked List) มาพัฒนา"
              accent="indigo"
            />
            <ConceptCard
              symbol="Hiding"
              title="การซ่อนรายละเอียดภายใน"
              description="ควบคุมข้อมูลผ่าน API ที่เปิดเผยเท่านั้น ป้องกันไม่ให้ส่วนอื่นของซอฟต์แวร์เข้ามายุ่งเกี่ยวกับ RAM โดยตรง"
              accent="amber"
            />
            <ConceptCard
              symbol="Change"
              title="ความยืดหยุ่นระดับพัฒนา"
              description="ช่วยให้ผู้พัฒนาสามารถปรับปรุงหรือเปลี่ยนสถาปัตยกรรมเก็บข้อมูลภายในได้โดยไม่มีผลกระทบต่อภายนอก"
              accent="rose"
            />
          </div>
        </section>

        {/* Section 2: Pros & Cons of ADT */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              การวิเคราะห์เชิงวิศวกรรม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเปรียบเทียบข้อดีและข้อเสียของการออกแบบด้วย ADT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pros card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-emerald-500/80">
              <span className="text-sm font-mono font-bold text-emerald-600 uppercase tracking-widest block mb-2">🟢 ADVANTAGES / ข้อดี</span>
              <ul className="space-y-3">
                {[
                  "การแยกแยะอินเตอร์เฟซ (Decoupling) ช่วยลดการผูกติดกันของซอฟต์แวร์ ทำให้บำรุงรักษาง่าย",
                  "การป้องกันการเข้าถึงข้อมูลโดยตรง (Encapsulation) ช่วยเพิ่มความมั่นคงและปลอดภัยของระบบข้อมูล",
                  "สามารถแก้ไขข้อบกพร่องภายในคลาสได้ง่าย โดยไม่มีผลกระทบและไม่ต้องตามไปแก้ไขคำสั่งในโมดูลอื่น",
                  "นักพัฒนาสามารถออกแบบและจำลองระบบเสมือนเพื่อเริ่มเขียนโค้ดทีมอื่นล่วงหน้าได้ทันที"
                ].map((item, idx) => (
                  <li key={idx} className="text-[14px] md:text-[15px] text-slate-700 leading-relaxed flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-rose-500/80">
              <span className="text-sm font-mono font-bold text-rose-600 uppercase tracking-widest block mb-2">🔴 DISADVANTAGES / ข้อเสีย</span>
              <ul className="space-y-3">
                {[
                  "มีความซับซ้อนเชิงสถาปัตยกรรมเพิ่มขึ้น (Overhead) จากการเพิ่มโครงสร้างการเรียกฟังก์ชันภายนอก",
                  "อาจส่งผลกระทบต่อประสิทธิภาพความเร็วและหน่วยความจำเล็กน้อย เนื่องจากการประมวลผลถูกครอบผ่านเลเยอร์ตัวกลาง",
                  "ต้องใช้เวลาและทักษะการออกแบบในการวางแบบแปลน API ที่เหมาะสมตั้งแต่เริ่มต้นโครงงาน",
                  "ยากต่อการสืบค้นและทำความเข้าใจลำดับการส่งผ่านข้อมูลสำหรับนักพัฒนาหน้าใหม่"
                ].map((item, idx) => (
                  <li key={idx} className="text-[14px] md:text-[15px] text-slate-700 leading-relaxed flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Section: Summary of Basic ADT Operations ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              คู่มือวิทยาการคอมพิวเตอร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สรุปคำสั่งและฟังก์ชันพื้นฐานในโครงสร้างข้อมูลนามธรรม (ADT Methods Summary)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ประเภทข้อมูลนามธรรมที่เป็นมาตรฐานสองประเภทคือ **Stack (สแตก)** และ **Queue (คิว)** มีการกำหนดคำสั่งและกฎเกณฑ์พฤติกรรมการจัดการข้อมูลดังนี้:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: 'stack.push(item)',
                subtitle: 'เพิ่มข้อมูลใน Stack',
                description: 'เพิ่มข้อมูลเข้าไปไว้ที่ตำแหน่งบนสุดของ Stack (LIFO - เข้าหลังออกก่อน)',
                code: 'stack.push("C")',
                result: '[\'A\', \'B\', \'C\']',
                titleClass: 'text-indigo-600',
                bgGradient: 'from-indigo-50/50 via-transparent to-transparent',
              },
              {
                title: 'stack.pop()',
                subtitle: 'ลบข้อมูลใน Stack',
                description: 'ลบและส่งคืนข้อมูลตัวบนสุดของ Stack ออกจากโครงสร้าง',
                code: 'stack.pop()',
                result: '\'B\'',
                titleClass: 'text-sky-500',
                bgGradient: 'from-sky-50/50 via-transparent to-transparent',
              },
              {
                title: 'queue.enqueue(item)',
                subtitle: 'เพิ่มข้อมูลใน Queue',
                description: 'เพิ่มข้อมูลเข้าสู่ท้ายแถวของ Queue (FIFO - เข้าก่อนออกก่อน)',
                code: 'queue.enqueue("C")',
                result: '[\'A\', \'B\', \'C\']',
                titleClass: 'text-teal-600',
                bgGradient: 'from-teal-50/50 via-transparent to-transparent',
              },
              {
                title: 'queue.dequeue()',
                subtitle: 'ลบข้อมูลใน Queue',
                description: 'ลบและส่งคืนข้อมูลจากหัวแถวสุดของ Queue ออกไปใช้งาน',
                code: 'queue.dequeue()',
                result: '\'A\'',
                titleClass: 'text-rose-500',
                bgGradient: 'from-rose-50/50 via-transparent to-transparent',
              },
              {
                title: 'adt.peek()',
                subtitle: 'เรียกดูหัวแถว/บนสุด',
                description: 'เรียกดูข้อมูลตัวหัวแถวหรือตัวบนสุดของโครงสร้างโดยไม่มีการลบข้อมูลจริงออกไป',
                code: 'stack.peek()',
                result: '\'B\'',
                titleClass: 'text-emerald-600',
                bgGradient: 'from-emerald-50/50 via-transparent to-transparent',
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-5 md:p-6 hover:shadow-2xl hover:-translate-y-1 hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top soft ambient light glow */}
                <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${card.bgGradient} opacity-60 pointer-events-none`} />

                <div className="space-y-3.5 relative z-10">
                  <span className={`block font-mono text-[16px] md:text-[18px] font-bold tracking-tight truncate ${card.titleClass}`}>
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

        {/* Section 3: Interactive ADT Simulator */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ตัวจำลองตรรกะเชิงลึก
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              บอร์ดทดสอบคุณสมบัติประเภทข้อมูลนามธรรม (ADT Interface vs Physical Layout)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองจำลองการทำธุรกรรมด้วยประเภทข้อมูลนามธรรม โดยคุณสามารถสลับอินเตอร์เฟซระหว่าง <strong>"Stack (LIFO)"</strong> หรือ <strong>"Queue (FIFO)"</strong> 
            และจับคู่การจำลองบันทึกข้อมูลเบื้องหลังด้วยโครงสร้างทางกายภาพที่แตกต่างกัน เพื่อสังเกตขั้นตอนความแตกต่างทางหน่วยความจำ:
          </p>

          <SimulatorShell
            dark
            title="ADT Behavior & Memory Pipeline Simulator"
            icon={<Sliders className="w-8 h-8 text-teal-400" />}
            glowColors="from-teal-950/20 to-indigo-950/15"
            iconColor="text-teal-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Panel: Control panel */}
              <div className="lg:col-span-5 bg-slate-950/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  ADT CONSOLE
                </div>

                <div className="space-y-5">
                  {/* Select ADT Type */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกประเภทข้อมูลนามธรรม (ADT API):</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { if(!isProcessing) setAdtType('Stack'); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all
                          ${adtType === 'Stack'
                            ? 'border-teal-500 bg-teal-950/40 text-teal-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        Stack ADT (LIFO)
                      </button>
                      <button
                        onClick={() => { if(!isProcessing) setAdtType('Queue'); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all
                          ${adtType === 'Queue'
                            ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        Queue ADT (FIFO)
                      </button>
                    </div>
                  </div>

                  {/* Select physical implementation */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">2. เลือกโครงสร้างข้อมูลจัดเก็บจริง (Implementation):</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { if(!isProcessing) setImplementation('Array'); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all
                          ${implementation === 'Array'
                            ? 'border-teal-500 bg-teal-950/40 text-teal-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        Array (List)
                      </button>
                      <button
                        onClick={() => { if(!isProcessing) setImplementation('LinkedList'); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all
                          ${implementation === 'LinkedList'
                            ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        Linked List
                      </button>
                    </div>
                  </div>

                  {/* Operation Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">3. ดำเนินการปฏิบัติการเชิงคำสั่ง:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          const nextVal = String.fromCharCode(65 + items.length); // A, B, C, D...
                          handlePush(nextVal);
                        }}
                        disabled={isProcessing || items.length >= 5}
                        className="py-2.5 bg-slate-800 border border-slate-700 hover:border-teal-500 text-teal-400 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {adtType === 'Stack' ? 'Push()' : 'Enqueue()'}
                      </button>
                      <button
                        onClick={handlePop}
                        disabled={isProcessing || items.length === 0}
                        className="py-2.5 bg-slate-800 border border-slate-700 hover:border-rose-500 text-rose-400 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
                      >
                        <Minus className="w-3.5 h-3.5" />
                        {adtType === 'Stack' ? 'Pop()' : 'Dequeue()'}
                      </button>
                      <button
                        onClick={handlePeek}
                        disabled={isProcessing || items.length === 0}
                        className="py-2.5 bg-slate-800 border border-slate-700 hover:border-amber-500 text-amber-400 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
                      >
                        <Eye className="w-3.5 h-3.5" /> Peek()
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reset and Logs */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetSimulator}
                      disabled={isProcessing}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตการทำงาน
                    </button>
                  </div>

                  {/* Tiny Output Shell */}
                  <div className="bg-black/80 p-3 rounded-xl border border-slate-950 font-mono text-[11px] leading-relaxed text-teal-400 overflow-y-auto max-h-[110px] min-h-[90px]">
                    <div className="text-slate-500 border-b border-slate-900 pb-1 mb-1.5 uppercase tracking-wide text-[8.5px] font-bold">ADT Runtime Trace:</div>
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="animate-fadeIn">
                        <span className="text-slate-400">&gt; </span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel: Visual representation of memory */}
              <div className="lg:col-span-7 bg-slate-950/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  ADT LAYERING GRAPH & MEMORY VIEW
                </div>

                <div className="space-y-6 mt-6 flex-1 flex flex-col justify-between">
                  {/* SVG Concurrency Flow */}
                  <div className="relative bg-slate-900/40 rounded-xl border border-slate-900/60 p-4 grow flex items-center justify-center min-h-[220px]">
                    <svg viewBox="0 0 560 220" className="w-full h-full" id="adt-concurrency-svg">
                      <defs>
                        <marker id="arrow-gray-adt" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                        </marker>
                        <marker id="arrow-teal-adt" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#14b8a6" />
                        </marker>
                        <marker id="arrow-indigo-adt" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
                        </marker>
                      </defs>

                      {/* Connection paths between centers: */}
                      {/* API to Array: M 280,50 L 160,50 L 160,120 */}
                      <path 
                        d="M 280,50 L 160,50 L 160,120" 
                        fill="none" 
                        stroke={activeStep >= 0 && implementation === 'Array' ? "#14b8a6" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 && implementation === 'Array' ? "6,4" : "none"}
                        className={activeStep === 0 && implementation === 'Array' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 1 && implementation === 'Array' ? "url(#arrow-teal-adt)" : "url(#arrow-gray-adt)"}
                      />

                      {/* API to Linked List: M 280,50 L 400,50 L 400,120 */}
                      <path 
                        d="M 280,50 L 400,50 L 400,120" 
                        fill="none" 
                        stroke={activeStep >= 0 && implementation === 'LinkedList' ? "#6366f1" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 && implementation === 'LinkedList' ? "6,4" : "none"}
                        className={activeStep === 0 && implementation === 'LinkedList' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 1 && implementation === 'LinkedList' ? "url(#arrow-indigo-adt)" : "url(#arrow-gray-adt)"}
                      />

                      {/* Array to RAM: M 160,120 L 160,190 L 280,190 */}
                      <path 
                        d="M 160,120 L 160,190 L 280,190" 
                        fill="none" 
                        stroke={activeStep >= 1 && implementation === 'Array' ? "#14b8a6" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 1 && implementation === 'Array' ? "6,4" : "none"}
                        className={activeStep === 1 && implementation === 'Array' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 2 && implementation === 'Array' ? "url(#arrow-teal-adt)" : "url(#arrow-gray-adt)"}
                      />

                      {/* Linked List to RAM: M 400,120 L 400,190 L 280,190 */}
                      <path 
                        d="M 400,120 L 400,190 L 280,190" 
                        fill="none" 
                        stroke={activeStep >= 1 && implementation === 'LinkedList' ? "#6366f1" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 1 && implementation === 'LinkedList' ? "6,4" : "none"}
                        className={activeStep === 1 && implementation === 'LinkedList' ? "animate-flow-line-dsa" : ""}
                        markerEnd={activeStep >= 2 && implementation === 'LinkedList' ? "url(#arrow-indigo-adt)" : "url(#arrow-gray-adt)"}
                      />

                      {/* Traveling dots */}
                      {isProcessing && activeStep === 0 && (
                        <circle r="5" fill={implementation === 'Array' ? "#14b8a6" : "#6366f1"} className="animate-pulse">
                          <animateMotion dur="1s" repeatCount="indefinite" path={implementation === 'Array' ? "M 280,50 L 160,50 L 160,120" : "M 280,50 L 400,50 L 400,120"} />
                        </circle>
                      )}

                      {/* Node 1: Public ADT API */}
                      <g transform="translate(280, 50)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 0 ? "#14b8a6" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Layers className={`w-5 h-5 ${activeStep === 0 ? 'text-teal-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="-32" textAnchor="middle" className="fill-teal-400 font-sans text-[9px] font-bold uppercase tracking-wider">Public ADT API Interface</text>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[8.5px] font-bold">{adtType} ADT ({adtType === 'Stack' ? 'push/pop' : 'enq/deq'})</text>
                      </g>

                      {/* Node 2: Array-Based Implementation */}
                      <g transform="translate(160, 120)">
                        <circle r="24" fill="#1e293b" stroke={activeStep === 1 && implementation === 'Array' ? "#14b8a6" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-9, -9)">
                          <Sliders className={`w-4.5 h-4.5 ${activeStep === 1 && implementation === 'Array' ? 'text-teal-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="-32" y="4" textAnchor="end" fill="#94a3b8" className="font-sans text-[8.5px] font-bold">Array Implementation</text>
                      </g>

                      {/* Node 3: Linked-List-Based Implementation */}
                      <g transform="translate(400, 120)">
                        <circle r="24" fill="#1e293b" stroke={activeStep === 1 && implementation === 'LinkedList' ? "#6366f1" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-9, -9)">
                          <Activity className={`w-4.5 h-4.5 ${activeStep === 1 && implementation === 'LinkedList' ? 'text-indigo-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="32" y="4" textAnchor="start" fill="#94a3b8" className="font-sans text-[8.5px] font-bold">Linked List Implementation</text>
                      </g>

                      {/* Node 4: Physical RAM Node */}
                      <g transform="translate(280, 190)">
                        <circle r="20" fill={activeStep >= 2 ? "#064e3b" : "#111827"} stroke={activeStep >= 2 ? "#10b981" : "#374151"} strokeWidth="2" className={activeStep === 2 ? "animate-pulse" : ""} />
                        <g transform="translate(-8, -8)">
                          <Database className={`w-4 h-4 ${activeStep >= 2 ? "text-emerald-400" : "text-slate-600"}`} />
                        </g>
                        <text x="0" y="30" textAnchor="middle" className="fill-slate-400 font-sans text-[8.5px] font-bold uppercase">Physical Memory (RAM)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Physical RAM visualizer */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">โครงสร้างหน่วยความจำจำลอง (Physical Layout in RAM):</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                        ${implementation === 'Array' 
                          ? 'bg-teal-950/80 text-teal-400 border-teal-900' 
                          : 'bg-indigo-950/80 text-indigo-400 border-indigo-900'
                        }`}
                      >
                        {implementation === 'Array' ? '📊 ARRAY CONTIGUOUS MEMORY' : '🔗 LINKED LIST DYNAMIC NODES'}
                      </span>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-900 min-h-[90px] flex flex-col justify-center items-center">
                      {items.length === 0 ? (
                        <span className="text-slate-600 italic text-sm">ไม่มีข้อมูลในหน่วยความจำ (ADT is Empty)</span>
                      ) : (
                        <div className="w-full">
                          {implementation === 'Array' ? (
                            /* Array representation: contiguous boxes */
                            <div className="flex gap-1 justify-center max-w-md mx-auto">
                              {items.map((item, idx) => {
                                const isTop = adtType === 'Stack' && idx === items.length - 1;
                                const isFront = adtType === 'Queue' && idx === 0;
                                return (
                                  <div key={idx} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-lg border flex items-center justify-center font-bold text-sm text-slate-200 transition-all duration-300
                                      ${isTop || isFront ? 'bg-teal-950 border-teal-500 shadow-teal-950/40 ring-1 ring-teal-500' : 'bg-slate-900 border-slate-800'}`}>
                                      {item}
                                    </div>
                                    <span className="text-[9px] text-slate-500 mt-1 font-mono">[{idx}]</span>
                                    {(isTop || isFront) && (
                                      <span className="text-[8.5px] font-bold text-teal-400 font-mono mt-0.5">{isTop ? 'TOP' : 'FRONT'}</span>
                                    )}
                                  </div>
                                );
                              })}
                              {/* Empty slots representation */}
                              {Array.from({ length: 5 - items.length }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center opacity-30">
                                  <div className="w-12 h-12 rounded-lg border border-dashed border-slate-800 bg-transparent flex items-center justify-center text-slate-700 text-xs">-</div>
                                  <span className="text-[9px] text-slate-500 mt-1 font-mono">[{items.length + i}]</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* Linked List representation: boxes with arrow pointers */
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              {items.map((item, idx) => {
                                const isTop = adtType === 'Stack' && idx === items.length - 1;
                                const isFront = adtType === 'Queue' && idx === 0;
                                return (
                                  <React.Fragment key={idx}>
                                    <div className="flex flex-col items-center">
                                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm text-slate-200 transition-all duration-300
                                        ${isTop || isFront ? 'bg-indigo-950 border-indigo-500 shadow-indigo-950/40 ring-1 ring-indigo-500' : 'bg-slate-900 border-slate-800'}`}>
                                        {item}
                                      </div>
                                      <span className="text-[9px] text-slate-500 mt-1 font-mono">Node</span>
                                      {(isTop || isFront) && (
                                        <span className="text-[8.5px] font-bold text-indigo-400 font-mono mt-0.5">{isTop ? 'TOP/HEAD' : 'FRONT/HEAD'}</span>
                                      )}
                                    </div>
                                    {idx < items.length - 1 && (
                                      <ArrowRight className="w-4 h-4 text-indigo-500/80 animate-pulse" />
                                    )}
                                    {idx === items.length - 1 && (
                                      <>
                                        <ArrowRight className="w-4 h-4 text-slate-700" />
                                        <span className="text-[10px] font-mono text-slate-600">NULL</span>
                                      </>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* Section 4: Python Code Visualizer showing backend design rules */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ตัวอย่างโค้ดโปรแกรม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสร้างประเภทข้อมูลนามธรรมใน Python (Encapsulated Stack Class)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ในภาษา <span className="mx-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200/50 text-teal-700 font-mono text-[14px]">Python</span> 
            เราสามารถนิยามโครงสร้างคลาสเพื่อทำหน้าที่เป็น ADT โดยซ่อนตัวแปรจัดเก็บข้อมูลจริงไว้เบื้องหลัง (Information Hiding) 
            ทำให้ภายนอกเรียกใช้งานผ่านอินเตอร์เฟซ API ที่ผ่านการควบคุมดูแลความถูกต้องเรียบร้อยแล้วเท่านั้น:
          </p>

          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            <ConsoleScreen
              label="# python/stack_adt.py"
              accentLabel="adt class interface"
              accentColor="text-teal-400"
              codeBlock={
                <pre className="text-[13.5px] font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                  {pythonCode}
                </pre>
              }
              output="สแตกรองรับการกระทำพื้นฐานผ่าน API โดยซ่อนโครงสร้าง __data (Private) ป้องกันบักการสืบค้นข้อมูลปนเปื้อนภายนอก"
              outputColor="text-teal-400"
              multiline={true}
            />
          </div>
        </section>

        {/* Section 5: Quiz Challenge */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ประเมินความเข้าใจวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลองทดสอบแนวคิดโครงสร้างข้อมูลนามธรรม (ADT Concept Challenge)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดสอบความรู้ความเข้าใจเกี่ยวกับสถาปัตยกรรมประเภทข้อมูลนามธรรมและประโยชน์ในการพัฒนาโครงสร้างซอฟต์แวร์สากล:
          </p>

          <div className="max-w-4xl mx-auto">
            <QuizEngine
              title="มินิเกม: ไขรหัสประเภทข้อมูลนามธรรม ADT"
              description="ตอบคำถามความเข้าใจความแตกต่างของแนวคิดนามธรรมเชิงพฤติกรรมและการจัดเรียงหน่วยความจำจริง"
              levels={quizLevels}
              accentColor="from-teal-600/20 to-indigo-500/10"
              icon={<Shield className="w-6 h-6 text-teal-400" />}
            />
          </div>
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจออกแบบประเภทข้อมูลนามธรรมและเขียนโค้ดภาษา Python"
          taskText={`[โจทย์ปฏิบัติการออกแบบประเภทข้อมูลนามธรรม (Abstract Data Type)]

ให้นักศึกษาออกแบบประเภทข้อมูลนามธรรม (ADT) สำหรับโครงสร้างข้อมูล "คิวแบบสองทิศทาง (Double-Ended Queue: Deque ADT)" ซึ่งเป็นคิวที่สามารถนำข้อมูลเข้าและออกได้ทั้งจากทางด้านหน้า (Front) และด้านหลัง (Rear) โดยปฏิบัติการดังนี้:

1. นิยามอินเตอร์เฟซหรือพฤติกรรมที่จำเป็นของ Deque ADT ในลักษณะคำอธิบาย เช่น add_front(), add_rear(), remove_front(), remove_rear(), is_empty(), size()
2. เขียนคลาสภาษา Python ชื่อ "DequeADT" เพื่อจำลองข้อมูลนามธรรมนี้ โดยการซ่อนตัวแปรจัดเก็บข้อมูลภายในแบบ Private (__data) 
3. อธิบายข้อดีของการใช้แนวคิด ADT เมื่อต้องปรับเปลี่ยนระบบเก็บข้อมูลด้านหลังจากอาร์เรย์ (Python List) ไปเป็นรายการเชื่อมโยงคู่ (Doubly Linked List)`}
        />

      </main>
    </div>
  );
}
