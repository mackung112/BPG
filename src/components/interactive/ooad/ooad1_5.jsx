import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Code, 
  Sparkles, 
  Sliders, 
  Cpu, 
  Layers,
  Shield,
  HelpCircle,
  Clock,
  CreditCard,
  Mail
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
    @keyframes flow-line-ooad {
      to {
        stroke-dashoffset: -40;
      }
    }
    @keyframes pulse-orange-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.7)); }
    }
    @keyframes pulse-red-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.8)); }
    }
    .animate-float-subtle { animation: float-subtle 4s ease-in-out infinite; }
    .animate-flow-line-ooad { animation: flow-line-ooad 1.2s linear infinite; }
    .animate-pulse-orange-glow { animation: pulse-orange-glow 1.5s ease-in-out infinite; }
    .animate-pulse-red-glow { animation: pulse-red-glow 1.2s ease-in-out infinite; }
    .glass-card-ooad {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.45);
    }
  `}} />
);

export default function OOAD1_5() {
  // ─── Layer 1: Ambient Background Blobs (Teal/Indigo/Purple/Rose Theme) ───
  const blobs = [
    { color: 'bg-teal-200',    size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-30' },
    { color: 'bg-indigo-150',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-25' },
    { color: 'bg-purple-200',  size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-25' },
    { color: 'bg-rose-100',    size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-20' }
  ];

  // ─── State for Booking Simulator ───
  const [rooms, setRooms] = useState([
    { id: '301', name: 'Deluxe Room 301', price: 1500, status: 'Available' },
    { id: '302', name: 'Suite Room 302', price: 3000, status: 'Reserved' },
    { id: '303', name: 'Standard Room 303', price: 1000, status: 'Available' }
  ]);

  const [selectedRoomId, setSelectedRoomId] = useState('301');
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1); // -1: idle, 0: Request, 1: Concurrency, 2: Payment, 3: DB Update, 4: Done
  const [terminalLogs, setTerminalLogs] = useState(['[SYSTEM READY] ระบบประมวลผลความต้องการจองห้องพักเริ่มต้นทำงานแล้ว']);
  const [raceConditionOccurred, setRaceConditionOccurred] = useState(false);

  const currentRoom = rooms.find(r => r.id === selectedRoomId);

  const handleExecuteBooking = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setRaceConditionOccurred(false);
    setActiveStep(0);

    setTerminalLogs([
      `[STEP 1 - CLIENT REQUEST] ผู้ใช้งานส่งคำขอจองห้องพัก: ${currentRoom.name}`,
      `[STEP 1 - CLIENT REQUEST] ตรวจสอบวันที่จอง (Date Range Validated)`
    ]);

    // Step 1: Concurrency Manager
    setTimeout(() => {
      setActiveStep(1);
      if (isSafeMode) {
        if (currentRoom.status === 'Reserved') {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 2 - LOCK EVALUATOR] ตรวจพบข้อมูลในระบบ: ห้องนี้ถูกจองไว้แล้วในช่วงเวลาดังกล่าว`,
            `[STEP 2 - BLOCK] การจองถูกปฏิเสธโดยระบบป้องกันการจองซ้ำ (Safe Mode: Serializable Lock ป้องกัน Double Booking)`,
            `[STEP 2 - SHUTDOWN] ยกเลิกทรานแซกชันเพื่อความถูกต้องของข้อมูล`
          ]);
          setIsProcessing(false);
          return;
        } else {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 2 - LOCK EVALUATOR] ตรวจสอบการชนกันของทรานแซกชัน (Concurrency Validation)`,
            `[STEP 2 - LOCK ACQUIRED] เปิดระบบคิวแบบมีขอบเขตและ Row-Lock เพื่อรอการยืนยันการชำระเงิน`
          ]);
        }
      } else {
        // Unsafe mode simulation - ignores Reservation check
        if (currentRoom.status === 'Reserved') {
          setRaceConditionOccurred(true);
          setTerminalLogs(prev => [
            ...prev,
            `[⚠️ WARNING] ปิดโหมดความปลอดภัย (No Lock Mode)!`,
            `[⚠️ WARNING] ตรวจพบความต้องการเชิงแข่งขัน (Race Condition) รหัสชนกัน!`,
            `[⚠️ CONFLICT] ระบบอนุญาตให้สร้างการจองทับซ้อนกับประวัติจองเดิมโดยไม่มีการตรวจสอบระดับฐานข้อมูล!`
          ]);
        } else {
          setTerminalLogs(prev => [
            ...prev,
            `[STEP 2 - NO LOCK] ละเว้นการจองแบบ Row-Lock (ผ่านตรรกะแบบไม่คัดแยกทรานแซกชัน)`
          ]);
        }
      }
    }, 1200);

    // Step 2: Payment Gateway
    setTimeout(() => {
      setActiveStep(2);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 3 - PAYMENT GATEWAY] ส่งข้อมูลชำระเงินไปยังเกตเวย์ชำระเงินภายนอก (Stripe integration API)`,
        `[STEP 3 - PAYMENT GATEWAY] ยอดค่าบริการ: ${currentRoom.price} บาท | รอรับรหัสตอบรับ (Payment Success Callback)`
      ]);
    }, 2400);

    // Step 3: Database Commit
    setTimeout(() => {
      setActiveStep(3);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 4 - DATABASE UPDATE] บันทึกผลสำเร็จลงในตารางสเปกหลักของระบบ`,
        isSafeMode 
          ? `[STEP 4 - DB WRITE] เขียนบันทึกตารางการจองสำเร็จ: ปรับปรุงสถานะห้อง ${selectedRoomId} เป็น Reserved`
          : `[🚨 DATA CORRUPTION] ยืนยันการจองทับซ้อนสำเร็จ! ห้อง ${selectedRoomId} มีผู้จอง 2 คนในเวลาเดียวกัน (ละเมิดข้อกำหนด NFR-02)`
      ]);

      // Update room status
      setRooms(prev => prev.map(r => {
        if (r.id === selectedRoomId) {
          return { ...r, status: 'Reserved' };
        }
        return r;
      }));
    }, 3600);

    // Step 4: Finished (Done)
    setTimeout(() => {
      setActiveStep(4);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 5 - COMPLETE] ส่งอีเมลใบเสร็จและบาร์โค้ดการจองให้ผู้ใช้โดยอัตโนมัติภายใน 3 วินาที (ผ่านเกณฑ์ AC-04)`,
        `[SYSTEM DONE] ทรานแซกชันปลดล็อกพร้อมรับคำขอใหม่`
      ]);
      setIsProcessing(false);
    }, 4800);
  };

  const handleResetSimulator = () => {
    setRooms([
      { id: '301', name: 'Deluxe Room 301', price: 1500, status: 'Available' },
      { id: '302', name: 'Suite Room 302', price: 3000, status: 'Reserved' },
      { id: '303', name: 'Standard Room 303', price: 1000, status: 'Available' }
    ]);
    setActiveStep(-1);
    setTerminalLogs(['[SYSTEM RESET] รีเซ็ตระบบจัดห้องกลับสู่สถานะดั้งเดิมเรียบร้อยแล้ว']);
    setRaceConditionOccurred(false);
    setIsProcessing(false);
  };

  // ─── Quiz Engine Configurations (SRS Specifications) ───
  const quizLevels = [
    {
      title: "การวิเคราะห์โครงร่างความต้องการระบบจอง",
      desc: "ข้อกำหนดระบุว่า: 'ผู้ใช้งานต้องสามารถตรวจสอบห้องว่างในปฏิทินแบบวันต่อวัน และระบุจำนวนผู้เข้าพักได้สูงสุด 4 คนต่อห้อง'",
      options: [
        { key: "A", text: "Functional Requirement (พฤติกรรมและความสามารถของระบบ)", isCorrect: true },
        { key: "B", text: "Non-Functional Requirement (สเกลและขีดความสามารถข้อมูล)", isCorrect: false },
        { key: "C", text: "System Constraint (ข้อจำกัดการเชื่อมต่อเทคโนโลยี)", isCorrect: false },
        { key: "D", text: "Assumption (สมมติฐานหลักโครงการ)", isCorrect: false }
      ],
      tip: "ข้อนี้ระบุหน้าที่การทำงานโดยตรงที่โปรแกรมต้องมีเพื่อให้ผู้ใช้กดเช็คปฏิทินและกรอกฟอร์มได้"
    },
    {
      title: "ความถูกต้องและความคงเส้นคงวาของข้อมูล (ACID)",
      desc: "ข้อกำหนดระบุว่า: 'ระบบต้องป้องกันการจองชนกันของห้องพักเดียวกัน ในวันที่เดียวกัน (Double Booking) ด้วยระบบ Concurrency Control แบบ Serializable'",
      options: [
        { key: "A", text: "Functional Requirement", isCorrect: false },
        { key: "B", text: "Non-Functional Requirement (ข้อกำหนดด้านคุณภาพและความน่าเชื่อถือ)", isCorrect: true },
        { key: "C", text: "System Constraint", isCorrect: false },
        { key: "D", text: "Acceptance Criteria", isCorrect: false }
      ],
      tip: "ระบุถึงความคงสภาพถูกต้องของข้อมูล (Data Integrity) ภายใต้ปริมาณการเข้าใช้งานพร้อมกัน ไม่ใช่เมนูฟังก์ชันตรงๆ"
    },
    {
      title: "ข้อจำกัดด้านความปลอดภัยของช่องทางชำระเงิน",
      desc: "ข้อกำหนดระบุว่า: 'ระบบต้องส่งข้อมูลการชำระเงินและเก็บบันทึกประวัติบัตรเครดิตตามมาตรฐานความปลอดภัย PCI-DSS เสมอ'",
      options: [
        { key: "A", text: "Functional Requirement", isCorrect: false },
        { key: "B", text: "Non-Functional Requirement", isCorrect: false },
        { key: "C", text: "System Constraint (ข้อจำกัดด้านมาตรฐานอุตสาหกรรมความปลอดภัย)", isCorrect: true },
        { key: "D", text: "Assumption", isCorrect: false }
      ],
      tip: "มาตรฐานความปลอดภัยจากองค์กรภายนอก เช่น PCI-DSS, ISO/IEC 27001 ถือเป็นข้อจำกัดเชิงนโยบาย/เทคโนโลยี (System Constraint) ที่ระบบต้องปฏิบัติให้ผ่านเกณฑ์"
    },
    {
      title: "การจัดทำเกณฑ์การยอมรับ (Acceptance Criteria)",
      desc: "ข้อกำหนดระบุว่า: 'ใบเสร็จชำระเงินอิเล็กทรอนิกส์ในรูปแบบ PDF ต้องถูกส่งไปยังอีเมลของผู้จองภายในเวลา 3.0 วินาทีหลังจากตัดยอดบัตรเครดิตสำเร็จ'",
      options: [
        { key: "A", text: "Functional Requirement", isCorrect: false },
        { key: "B", text: "Acceptance Criteria (เกณฑ์การตรวจรับและยอมรับผลงาน)", isCorrect: true },
        { key: "C", text: "System Constraint", isCorrect: false },
        { key: "D", text: "Assumption", isCorrect: false }
      ],
      tip: "เป็นการระบุการรับประกันขอบเขตเวลาและผลลัพธ์สุดท้ายที่เป็นตัวเลขชี้วัดที่ชัดเจนเพื่อใช้ตรวจสอบว่างานนี้ผ่านเกณฑ์การทำข้อตกลงหรือไม่"
    }
  ];

  // Python backend code visualizer
  const pythonCode = `def execute_room_reservation(room_id: str, guest_id: str, booking_date: str):
    # 1. เริ่มทรานแซกชันด้วยระดับการคัดแยกสูงสุด (Serializable Isolation)
    with database.transaction(isolation_level="SERIALIZABLE") as tx:
        # 2. ค้นหาสถานะห้องพักและล็อกแถวข้อมูลเพื่อตรวจสอบ concurrency
        room = tx.execute(
            "SELECT id, status, price FROM rooms WHERE id = %s FOR UPDATE",
            (room_id,)
        ).fetchone()
        
        if not room:
            raise ValueError(f"ไม่พบห้องพักหมายเลข: {room_id}")
            
        # 3. ข้อกำหนดเชิงฟังก์ชัน (FR): ห้องต้องอยู่ในสถานะ Available เท่านั้น
        if room['status'] != "Available":
            raise ValueError(f"ห้อง {room_id} ถูกจองไปแล้วโดยผู้ใช้อื่น")
            
        # 4. ล็อกการจองไว้ชั่วคราวเป็นเวลา 10 นาที (Pending Payment Hold)
        tx.execute(
            "UPDATE rooms SET status = 'Pending_Payment' WHERE id = %s",
            (room_id,)
        )
        
        # 5. ซิงค์กับระบบชำระเงิน Stripe API (External Interface Requirement)
        payment_status = payment_gateway.charge(room['price'], card_token)
        
        if payment_status == "SUCCESS":
            # 6. ยืนยันข้อมูลลงฐานข้อมูลจริงเมื่อจ่ายเงินเสร็จสิ้น
            tx.execute(
                "UPDATE rooms SET status = 'Reserved', guest_id = %s WHERE id = %s",
                (guest_id, room_id)
            )
            # 7. ส่งอีเมลยืนยันผลตามเกณฑ์การทดสอบ (AC)
            send_confirmation_email(guest_id, room_id)
        else:
            # ดึงข้อมูลกลับคืนสู่สถานะว่างหากชำระเงินไม่ผ่าน
            tx.execute("UPDATE rooms SET status = 'Available' WHERE id = %s", (room_id,))
            raise TransactionError("ชำระเงินไม่สำเร็จ การจองล้มเหลว")`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <CustomStyles />

      {/* Layer 1: Ambient Background Blobs */}
      <AmbientBackdrop blobs={blobs} />

      {/* Layer 3: Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* Section 1: Intro & SRS Core Concept */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ตัวอย่างโครงงานซอฟต์แวร์จริง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงร่างความต้องการระบบจองห้องพักออนไลน์ (Booking Management SRS)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ระบบการจองห้องพักออนไลน์ (Booking Management System) เป็นตัวอย่างระบบงานแบบโต้ตอบเชิงเวลาจริง (Real-time Transaction) 
            ที่ท้าทายในวิชาออกแบบระบบเชิงวัตถุ เนื่องจากต้องการการจัดการทรานแซกชันที่สอดประสานกัน 
            เพื่อป้องกันข้อมูลขัดแย้งจากการจองที่นั่งหรือห้องพักเดียวกันพร้อมกัน เอกสาร SRS ตามมาตรฐานสากล <span className="mx-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200/50 text-teal-700 font-mono text-[14px]">IEEE 830</span> สำหรับระบบจอง ประกอบด้วยหัวข้อสำคัญดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ConceptCard
              symbol="FR"
              title="ข้อกำหนดเชิงฟังก์ชัน (Functional)"
              description="ระบบต้องเช็คสถานะห้องว่าง รับชำระเงิน และแสดงปฏิทินจองแบบอินเตอร์แอคทีฟได้"
              accent="teal"
            />
            <ConceptCard
              symbol="NFR"
              title="การประมวลผลทับซ้อน (Non-Functional)"
              description="ป้องกัน Double Booking ด้วย Serializable Lock ระดับฐานข้อมูล และรักษาความถูกต้อง 100%"
              accent="indigo"
            />
            <ConceptCard
              symbol="CON"
              title="ข้อจำกัดระบบ (System Constraint)"
              description="ซิงค์ข้อมูลผ่านช่องทาง Stripe API และเก็บข้อมูลบัตรเครดิตตามเกณฑ์มาตรฐาน PCI-DSS"
              accent="amber"
            />
            <ConceptCard
              symbol="AC"
              title="เกณฑ์ตรวจสอบ (Acceptance Criteria)"
              description="ส่งใบเสร็จยืนยันจองทางอีเมลอัตโนมัติภายใน 3 วินาทีหลังทำทรานแซกชันสำเร็จ"
              accent="rose"
            />
          </div>
        </section>

        {/* Section 2: Deep Dive SRS Booking Template */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              โครงร่างเอกสารทางวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              องค์ประกอบเอกสารความต้องการ สำหรับวิศวกรรมระบบจองห้องพัก
            </h3>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เอกสารสเปกข้อกำหนดสำหรับระบบจองต้องเขียนเงื่อนไขให้กระชับและไม่ให้เกิดความกำกวม เพื่อให้การเขียนโปรแกรมฝั่ง Backend ออกแบบตรรกะ Row-Lock ได้อย่างถูกต้อง:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/50">
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[25%]">หมวดหมู่ข้อกำหนด</th>
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[30%]">ข้อความร่างสเปกจริง (ภาษาไทย)</th>
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[45%]">เหตุผลและเกณฑ์ควบคุมคุณภาพ (IEEE 830)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-teal-50 border border-teal-200/60 text-teal-700 font-mono text-[12px] uppercase">FR-01: Calendar Sync</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      ระบบต้องปรับปรุงปฏิทินแสดงผลห้องพักว่างและเปลี่ยนสถานะห้องพักทันทีหลังจากบันทึกยืนยันข้อมูลผู้เข้าพัก
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      กำหนดขอบเขตพฤติกรรม (Functional Behavior) เพื่อให้หน้าบ้านแสดงผลตอบรับเรียลไทม์กับผู้ใช้งานรายอื่น
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-mono text-[12px] uppercase">NFR-02: Safety Lock</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-medium">
                      ระบบต้องประมวลผลการจองทับซ้อนและบล็อกการจองชนกันอย่างเสถียร 100% ภายใต้สถิติผู้ใช้งานพร้อมกัน 200 รายการต่อวินาที
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      ระบุเกณฑ์ความมั่นคงของข้อมูลในรูปตัวเลข (200 รายการ/วินาที) เพื่อป้องกันการจองชนกันโดยสมบูรณ์
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200/60 text-amber-700 font-mono text-[12px] uppercase">CON-03: Compliance</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      การเชื่อมโยงระบบตัดเงินต้องส่งผ่านข้อมูลโดยใช้โปรโตคอล HTTPS 1.3 และไม่จัดเก็บข้อมูลเลข CVC ของลูกค้าลงสตอเรจ
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      ตีกรอบความปลอดภัยข้อมูลระบบจอง (Compliance Constraint) ตามหลักมาตรฐาน PCI-DSS
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-rose-50 border border-rose-200/60 text-rose-700 font-mono text-[12px] uppercase">AC-04: Receipt Email</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      ระบบต้องส่งอีเมลยืนยันการจองพร้อมบาร์โค้ดเช็คอิน PDF ถึงผู้จองภายใน 3.0 วินาทีหลังจาก Stripe ยืนยันการชำระเงินสำเร็จ
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      กำหนดเงื่อนไขการส่งต่อและปิดทรานแซกชัน (Acceptance Criteria) เพื่อใช้ในการทดสอบระบบและเกณฑ์ยอมรับของลูกค้า
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Simulator */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              การทำงานจริงของระบบ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวจำลองระบบป้องกันจองห้องพักซ้อนแบบทรานแซกชัน (Booking & Concurrency Pipeline)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดสอบการทำงานของทรานแซกชันการจองห้องพักออนไลน์ 
            โดยคุณสามารถสลับการใช้งานระหว่าง <strong>"โหมดปลอดภัย (Safe: Row-Lock)"</strong> 
            เพื่อป้องกันข้อมูลจองซ้อน และ <strong>"โหมดไร้การควบคุม (Unsafe: No Lock)"</strong> เพื่อจำลองสถานการณ์ Race Condition ที่ทำลายความคงสภาพของระบบ:
          </p>

          <SimulatorShell
            dark
            title="Real-time Room Reservation Simulator"
            icon={<Sliders className="w-8 h-8 text-teal-400" />}
            glowColors="from-teal-950/20 to-indigo-950/15"
            iconColor="text-teal-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Panel - Control panel */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  BOOKING CONSOLE
                </div>

                <div className="space-y-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกห้องพักที่ต้องการจอง:</span>
                  
                  {/* Select Room */}
                  <div className="grid grid-cols-1 gap-2">
                    {rooms.map(r => {
                      const isChosen = r.id === selectedRoomId;
                      return (
                        <button
                          key={r.id}
                          onClick={() => { if(!isProcessing) setSelectedRoomId(r.id); }}
                          disabled={isProcessing}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex justify-between items-center
                            ${isChosen 
                              ? 'border-teal-500 bg-teal-950/40 text-teal-200' 
                              : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                            <div>
                              <span className="text-[13px] font-bold block">{r.name}</span>
                              <span className="text-[9px] font-mono text-slate-500">อัตราค่าบริการ: {r.price} บาท/คืน</span>
                            </div>
                          </div>
                          <div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded
                              ${r.status === 'Available' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                              {r.status === 'Available' ? '🟢 ว่าง' : '🔴 ถูกจอง'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Lock Mode Selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">2. เลือกระบบป้องกันข้อมูลทับซ้อน (Concurrency Lock):</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { if(!isProcessing) setIsSafeMode(true); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5
                          ${isSafeMode
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        <Shield className="w-3.5 h-3.5 text-emerald-400" /> ปลอดภัย (Safe)
                      </button>
                      <button
                        onClick={() => { if(!isProcessing) setIsSafeMode(false); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5
                          ${!isSafeMode
                            ? 'border-rose-500 bg-rose-950/40 text-rose-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> ไม่จำกัดคิว (Unsafe)
                      </button>
                    </div>
                  </div>

                  {/* Warning Note */}
                  <div className="bg-slate-950/60 p-3.5 border border-slate-800 rounded-xl text-slate-400 text-[12px] leading-relaxed">
                    {isSafeMode ? (
                      <p className="text-emerald-400/90">
                        <strong>🛡️ Safe Mode:</strong> ยึดหลักทรานแซกชันระดับจัดสรรแถวเดี่ยว ป้องกันการเขียนทับกันของผู้ใช้งาน (Serializable Isolation) ปลอดภัยต่อระบบ 100%
                      </p>
                    ) : (
                      <p className="text-rose-400/90">
                        <strong>⚠️ Unsafe Mode:</strong> ละเว้นการจองแบบล็อกฐานข้อมูล ทรานแซกชันสองตัวเขียนข้อมูลทับกันได้ ส่งผลให้เกิดปัญหามีการจองซ้ำห้องเดียวกัน (Double Booking Conflict)
                      </p>
                    )}
                  </div>
                </div>

                {/* Operations & Terminal Logs */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex gap-2">
                    <button
                      onClick={handleExecuteBooking}
                      disabled={isProcessing}
                      className="w-8/12 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg disabled:opacity-40 transition-all duration-200"
                    >
                      <Play className="w-4 h-4" /> ประมวลผลจองห้องพัก
                    </button>
                    <button
                      onClick={handleResetSimulator}
                      disabled={isProcessing}
                      className="w-4/12 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตระบบ
                    </button>
                  </div>

                  {/* Tiny Output Shell */}
                  <div className="bg-black/80 p-3 rounded-xl border border-slate-950 font-mono text-[11px] leading-relaxed text-teal-400 overflow-y-auto max-h-[110px] min-h-[90px]">
                    <div className="text-slate-500 border-b border-slate-900 pb-1 mb-1.5 uppercase tracking-wide text-[8.5px] font-bold">Booking Process Logs:</div>
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="animate-fadeIn">
                        <span className="text-slate-650">&gt; </span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Visual Pipeline Diagram */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  SRS CONCURRENCY DATA FLOW
                </div>

                <div className="space-y-6 mt-6 flex-1 flex flex-col justify-between">
                  {/* SVG Concurrency Flow */}
                  <div className="relative bg-slate-900/40 rounded-xl border border-slate-900/60 p-4 grow flex items-center justify-center min-h-[220px]">
                    <svg viewBox="0 0 560 220" className="w-full h-full" id="booking-pipeline-svg">
                      <defs>
                        <marker id="arrow-gray-booking" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                        </marker>
                        <marker id="arrow-teal-booking" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#14b8a6" />
                        </marker>
                        <marker id="arrow-green-booking" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                        </marker>
                        <marker id="arrow-red-booking" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                        </marker>
                      </defs>

                      {/* Connection paths between centers: (70,90) -> (190,90) -> (310,90) -> (430,90) */}
                      {/* Line 1 */}
                      <path 
                        d="M 70,90 L 190,90" 
                        fill="none" 
                        stroke={activeStep >= 0 ? "#14b8a6" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 ? "6,4" : "none"}
                        className={activeStep === 0 ? "animate-flow-line-ooad" : ""}
                        markerEnd={activeStep >= 0 ? "url(#arrow-teal-booking)" : "url(#arrow-gray-booking)"}
                      />

                      {/* Line 2 */}
                      <path 
                        d="M 190,90 L 310,90" 
                        fill="none" 
                        stroke={activeStep >= 1 ? (raceConditionOccurred ? "#ef4444" : "#14b8a6") : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 1 ? "6,4" : "none"}
                        className={activeStep === 1 ? "animate-flow-line-ooad" : ""}
                        markerEnd={activeStep >= 1 ? (raceConditionOccurred ? "url(#arrow-red-booking)" : "url(#arrow-teal-booking)") : "url(#arrow-gray-booking)"}
                      />

                      {/* Line 3 */}
                      <path 
                        d="M 310,90 L 430,90" 
                        fill="none" 
                        stroke={activeStep >= 2 ? "#10b981" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 2 ? "6,4" : "none"}
                        className={activeStep === 2 ? "animate-flow-line-ooad" : ""}
                        markerEnd={activeStep >= 2 ? "url(#arrow-green-booking)" : "url(#arrow-gray-booking)"}
                      />

                      {/* Line 4 (Downward to Email confirmation Node) */}
                      <path 
                        d="M 430,90 L 430,170" 
                        fill="none" 
                        stroke={activeStep >= 3 ? "#10b981" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 3 ? "6,4" : "none"}
                        className={activeStep === 3 ? "animate-flow-line-ooad" : ""}
                        markerEnd={activeStep >= 3 ? "url(#arrow-green-booking)" : "url(#arrow-gray-booking)"}
                      />

                      {/* Node 1: Client Request */}
                      <g transform="translate(70, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 0 ? "#14b8a6" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <FileText className={`w-5 h-5 ${activeStep === 0 ? 'text-teal-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Client Request</text>
                      </g>

                      {/* Node 2: Concurrency Manager */}
                      <g transform="translate(190, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 1 ? (raceConditionOccurred ? "#ef4444" : "#14b8a6") : "#475569"} strokeWidth="2.5" className={raceConditionOccurred && activeStep === 1 ? "animate-pulse" : ""} />
                        <g transform="translate(-10, -10)">
                          <Cpu className={`w-5 h-5 ${activeStep === 1 ? (raceConditionOccurred ? 'text-rose-400 animate-pulse' : 'text-teal-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Isolation Lock</text>
                      </g>

                      {/* Node 3: Stripe Payment Gateway */}
                      <g transform="translate(310, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 2 ? "#14b8a6" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <CreditCard className={`w-5 h-5 ${activeStep === 2 ? 'text-teal-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Payment Gateway</text>
                      </g>

                      {/* Node 4: SQL Database Commit */}
                      <g transform="translate(430, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 3 ? (raceConditionOccurred ? "#ef4444" : "#10b981") : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Database className={`w-5 h-5 ${activeStep === 3 ? (raceConditionOccurred ? 'text-rose-400 animate-pulse' : 'text-emerald-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">PostgreSQL Write</text>
                      </g>

                      {/* Node 5: Email Alert / Confirmation */}
                      <g transform="translate(430, 170)">
                        <circle r="20" fill={activeStep >= 4 ? "#064e3b" : "#111827"} stroke={activeStep >= 4 ? "#10b981" : "#374151"} strokeWidth="2" />
                        <g transform="translate(-8, -8)">
                          <Mail className={`w-4 h-4 ${activeStep >= 4 ? "text-emerald-400" : "text-slate-650"}`} />
                        </g>
                        <text x="28" y="4" textAnchor="start" className="fill-slate-500 font-sans text-[8.5px] font-bold uppercase">อีเมลเช็คอิน (Send Confirmation PDF)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Audit Panel */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">ผลการตรวจสอบสอดคล้องข้อมูล (Booking System Audit):</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                        ${raceConditionOccurred 
                          ? 'bg-rose-950/80 text-rose-400 border-rose-900' 
                          : 'bg-emerald-950/80 text-emerald-400 border-emerald-900'
                        }`}
                      >
                        {raceConditionOccurred ? '🔴 CRITICAL: DOUBLE BOOKING DETECTED' : '🟢 HEALTHY: NO CONFLICT'}
                      </span>
                    </div>

                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">ห้องพัก: <strong className="text-slate-200">{currentRoom.name}</strong></span>
                        <span className="text-slate-400">โหมดความปลอดภัย: <strong className={isSafeMode ? 'text-emerald-400' : 'text-rose-400'}>{isSafeMode ? '🔒 SERIALIZABLE ON' : '🔓 SERIALIZABLE OFF'}</strong></span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-[12px] font-mono text-center">
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-500 block text-[9.5px]">สถานะห้องพักในระบบ</span>
                          <span className={`text-[13px] font-bold ${currentRoom.status === 'Reserved' ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {currentRoom.status === 'Reserved' ? 'ถูกจอง (Reserved)' : 'ว่าง (Available)'}
                          </span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-500 block text-[9.5px]">ข้อผิดพลาดสะสม</span>
                          <span className={`text-[13px] font-bold ${raceConditionOccurred ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`}>
                            {raceConditionOccurred ? 'RACE CONFLICT (จองซ้ำ)' : '0 (ปกติ)'}
                          </span>
                        </div>
                      </div>
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
              ตัวอย่างโค้ดโปรแกรมเบื้องหลัง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตรรกะระดับระบบความปลอดภัยฐานข้อมูล (Python Row-Lock Execution)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            การทำตามสเปกข้อกำหนดในระบบทรานแซกชันจริง (NFR-02: Double Booking Prevention) 
            โปรแกรมเมอร์ต้องระบุระดับการจองและล็อกแถวข้อมูลเพื่อปฏิเสธการจองชนกัน:
          </p>

          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            <ConsoleScreen
              label="# python/booking_lock.py"
              accentLabel="concurrency rules"
              accentColor="text-teal-400"
              codeBlock={
                <pre className="text-[13.5px] font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                  {pythonCode}
                </pre>
              }
              output="โค้ดนี้ใช้ตรรกะ SELECT ... FOR UPDATE เพื่อจองคิวข้อมูลในแถวฐานข้อมูล ป้องกันไม่ให้แอปพลิเคชันคลาวด์เขียนบันทึกข้อมูลทับกัน"
              outputColor="text-teal-400"
              multiline={true}
            />
          </div>
        </section>

        {/* Section 5: SRS Extraction and Classification Game */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ประเมินความเข้าใจวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลองการวินิจฉัยและจำแนกประเภทความต้องการ (SRS Classifier Arena)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดสอบทักษะการแยกแยะหมวดหมู่ความต้องการในแบบจำลองโครงการจองห้องพักออนไลน์ เพื่อเตรียมความพร้อมสำหรับการทำรายงานโครงงาน:
          </p>

          <div className="max-w-4xl mx-auto">
            <QuizEngine
              title="มินิเกม: วิเคราะห์สเปกความต้องการระบบจองออนไลน์"
              description="จำแนกประเภทความต้องการตามมาตรฐาน IEEE 830 และขจัดเงื่อนไขกำกวม"
              levels={quizLevels}
              accentColor="from-teal-600/20 to-emerald-500/10"
              icon={<Shield className="w-6 h-6 text-teal-400" />}
            />
          </div>
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจวิเคราะห์ความต้องการระบบจองบริการออนไลน์"
          taskText={`[โจทย์วิเคราะห์ความต้องการ: ระบบจัดการข้อมูลการจอง (Project 3)]

ให้นักศึกษาสวมบทบาทเป็นนักวิเคราะห์ระบบ (System Analyst) ดำเนินการวิเคราะห์และร่างเขียนข้อกำหนดความต้องการซอฟต์แวร์ (SRS) ในแต่ละด้านของระบบจองห้องพักหรือจองที่นั่งสายการบินตามคำอธิบายดังต่อไปนี้:

1. เขียน Functional Requirement (FR) จำนวน 1 ข้อ สำหรับฟังก์ชัน "การถือครองการจองชั่วคราวระบุเวลา (Temporary Hold)" ระหว่างรอพนักงานชำระเงิน
2. เขียน Non-Functional Requirement (NFR) จำนวน 1 ข้อ ด้าน "ความเสถียรและการรองรับการใช้งาน (Availability)"
3. เขียน System Constraint (CON) จำนวน 1 ข้อ ด้าน "มาตรฐานความปลอดภัยการเก็บข้อมูลชำระเงินของลูกค้า"

*กฎเหล็ก:* 
- หลีกเลี่ยงประโยคอัตวิสัยที่มีความกำกวมสูง เช่น "ปล่อยจองห้องได้รวดเร็ว", "ใช้งานง่ายสบายตา", "ความปลอดภัยดีที่สุด"
- ต้องอธิบายเป็นเงื่อนไขทางวิศวกรรมคอมพิวเตอร์ที่วัดผลได้เป็นตัวเลขหรือมาตรฐานชัดเจน (เช่น วงเงินหรือวินาทีที่สามารถทดสอบได้)`}
        />

      </main>
    </div>
  );
}
