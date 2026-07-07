import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Shield, 
  Activity, 
  Cpu, 
  Layers, 
  Database, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  CheckCircle,
  XCircle,
  FileCheck,
  Code
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  SimulatorShell, 
  ConceptCard, 
  AmbientBackdrop 
} from '../shared';

// Custom CSS keyframes and animations for visual tracers and gradients
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    @keyframes flow-svg-line {
      to {
        stroke-dashoffset: -36;
      }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6)); }
    }
    .animate-float { animation: float 3.5s ease-in-out infinite; }
    .animate-flow-svg-line { animation: flow-svg-line 1.5s linear infinite; }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .glass-card {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.45);
    }
  `}} />
);

export default function OOAD1_1() {
  // ─── 1. Ambient Background Blobs (Orange/Indigo/Purple Theme) ───────────
  const OOAD1_1_BLOBS = [
    { color: 'bg-orange-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-30' },
    { color: 'bg-amber-100',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-25' },
    { color: 'bg-purple-200', size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-25' },
    { color: 'bg-indigo-150', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-20' }
  ];

  // ─── 2. State for Requirements Quality & Repair Lab (Section 3) ─────────
  const initialRequirements = [
    {
      id: 1,
      name: "ประสิทธิภาพระบบ",
      draft: "หน้าจอบทเรียนต้องโหลดอย่างรวดเร็วและไม่อืดอาด",
      category: "Non-Functional (Performance)",
      problem: "คำว่า 'อย่างรวดเร็ว' และ 'ไม่อืดอาด' มีความกำกวมสูงมาก ไม่สามารถเขียน Test Case วัดผลความเร็วที่เป็นวิทยาศาสตร์ได้",
      repaired: "หน้าเว็บบทเรียนต้องดาวน์โหลดและพร้อมสำหรับโต้ตอบ (Time to Interactive) ภายในเวลาไม่เกิน 1.5 วินาทีเมื่อเชื่อมต่อด้วยอินเทอร์เน็ตความเร็ว 10 Mbps ขึ้นไป",
      details: "ระบุตัวเลขประเมินผลชัดเจน (1.5 วินาที) และระบุขอบเขตตัวแปรภายนอก (อินเทอร์เน็ต 10 Mbps)",
      repairedType: "Non-Functional Requirement",
      icon: <Zap className="w-5 h-5" />,
      color: "cyan"
    },
    {
      id: 2,
      name: "สิทธิ์และการลบข้อมูล",
      draft: "อาจารย์สามารถสั่งเพิ่มข้อมูลคะแนนและให้ลบนักเรียนออกได้หากทำผิดกฎ",
      category: "Functional (System Behavior)",
      problem: "มีสองหน้าที่รวมกันในข้อความเดียว และคำว่า 'หากทำผิดกฎ' ขาดข้อกำหนดทางธุรกิจ (Business Rules) รองรับอย่างชัดเจนว่าคือกฎใด",
      repaired: "ระบบต้องอนุญาตให้อาจารย์ (Instructor) บันทึกและแก้ไขคะแนนสอบรายวิชาได้ ส่วนการลบประวัตินักเรียนออกจากระบบจะกระทำได้โดยเจ้าหน้าที่ทะเบียน (Registrar) เท่านั้นตามมติการสอบสวนทุจริต",
      details: "แยกสิทธิ์ของผู้ใช้ (Instructor vs Registrar) และกำหนดขอบเขตเงื่อนไขระบบเชิงตรรกะ",
      repairedType: "Functional Requirement",
      icon: <Users className="w-5 h-5" />,
      color: "indigo"
    },
    {
      id: 3,
      name: "สถาปัตยกรรมเทคนิค",
      draft: "ระบบต้องทำงานบนเซิร์ฟเวอร์แบบ Linux และใช้ฐานข้อมูลตัวใหม่",
      category: "System Constraint",
      problem: "คำว่า 'ฐานข้อมูลตัวใหม่' กำกวม ไม่ระบุยี่ห้อ เวอร์ชัน หรือสถาปัตยกรรมทางวิศวกรรมที่ใช้จัดตั้งระบบ",
      repaired: "ระบบต้องติดตั้งและทำงานบนระบบปฏิบัติการ Rocky Linux 9.x ขึ้นไป และจัดเก็บข้อมูลผ่านระบบจัดการฐานข้อมูลเชิงสัมพันธ์ PostgreSQL 15.x ขึ้นไป",
      details: "กำหนดเวอร์ชันขั้นต่ำของระบบปฏิบัติการและฐานข้อมูลเพื่อลดความเสี่ยงด้านความเข้ากันได้",
      repairedType: "System Constraint",
      icon: <Database className="w-5 h-5" />,
      color: "amber"
    },
    {
      id: 4,
      name: "ความคาดหวังโครงการ",
      draft: "ผู้ใช้ทุกคนคงเข้าใจและใช้งานเครื่องสมาร์ทโฟนเป็นปกติอยู่แล้ว",
      category: "Assumption",
      problem: "เขียนเป็นประโยคแสดงความคิดเห็นส่วนตัว ไม่ได้ระบุรูปแบบเชิงทางการที่เป็นประโยชน์ต่อความเสี่ยงของโครงการ",
      repaired: "โครงการนี้อ้างอิงสมมติฐานว่ากลุ่มผู้ใช้งานเป้าหมาย (นักศึกษาระดับ ปวช.) มีอุปกรณ์สมาร์ทโฟนระบบปฏิบัติการ iOS 15+ หรือ Android 11+ และมีทักษะการใช้งานอินเทอร์เน็ตทั่วไป",
      details: "เปลี่ยนประโยคความคิดเห็นให้เป็นสมมติฐานโครงการอย่างเป็นทางการเพื่อประเมินระดับความเสี่ยงของซอฟต์แวร์",
      repairedType: "Assumption & Dependency",
      icon: <Layers className="w-5 h-5" />,
      color: "violet"
    }
  ];

  const [selectedReqId, setSelectedReqId] = useState(1);
  const [repairedStatus, setRepairedStatus] = useState({ 1: false, 2: false, 3: false, 4: false });
  const [isAnimating, setIsAnimating] = useState(false);
  const [simLog, setSimLog] = useState(["พร้อมจำลองกระบวนการวิเคราะห์และซ่อมแซมตามมาตรฐาน IEEE 830"]);

  const currentReq = initialRequirements.find(r => r.id === selectedReqId);
  const isCurrentRepaired = repairedStatus[selectedReqId];

  const handleRepairClick = () => {
    if (isAnimating || isCurrentRepaired) return;
    setIsAnimating(true);
    
    // Add logs step-by-step
    const logs = [
      `[เริ่มต้นสแกน] ข้อความร่าง ID ${selectedReqId}: "${currentReq.draft}"`,
      `[วิเคราะห์ความเสี่ยง] พบปัญหาข้อกำหนดไม่สมบูรณ์หรือมีความกำกวมสูง`,
      `[ดำเนินการ] กำลังส่งข้อมูลไปยัง Gate เพื่อปรับแต่งตามหลักเกณฑ์ความต้องการที่ดี...`
    ];
    setSimLog(logs);

    setTimeout(() => {
      setRepairedStatus(prev => ({ ...prev, [selectedReqId]: true }));
      setSimLog(prev => [
        ...prev,
        `[สำเร็จ] อัปเกรดความต้องการสู่รูปแบบที่เป็นทางการและตรวจสอบได้ (Verifiable)`,
        `[จัดเก็บ] บันทึกในคลัง SRS ส่วนที่เหมาะสม: ${currentReq.repairedType}`
      ]);
      setIsAnimating(false);
    }, 1500);
  };

  const handleResetSim = () => {
    if (isAnimating) return;
    setRepairedStatus({ 1: false, 2: false, 3: false, 4: false });
    setSimLog(["รีเซ็ตคลังข้อกำหนดเสร็จสิ้น พร้อมทำการทดสอบใหม่"]);
  };

  // ─── 3. State for Requirements Classifier Arena (Section 4) ───────────
  const quizQuestions = [
    {
      id: 1,
      statement: "หน้าเว็บแสดงรายงานสถิตินักศึกษาต้องดึงข้อมูลและแสดงผลลัพธ์ภายใน 2.0 วินาทีเมื่อผู้ใช้งานกดค้นหา",
      options: [
        { text: "Functional Requirement (ข้อกำหนดเชิงฟังก์ชัน)", isCorrect: false },
        { text: "Non-Functional Requirement (ข้อกำหนดเชิงประสิทธิภาพ/ความเร็ว)", isCorrect: true },
        { text: "System Constraint (ข้อจำกัดทางเทคนิคของระบบ)", isCorrect: false },
        { text: "Assumption (สมมติฐานเบื้องต้น)", isCorrect: false }
      ],
      explanation: "ถูกต้อง! เพราะข้อนี้ระบุค่าตัวชี้วัดประสิทธิภาพเชิงคุณภาพ (Performance) ในรูปตัวเลข 2.0 วินาที ซึ่งประเมินความเร็วและขีดความสามารถในการทำงานของหน้าจอ ไม่ใช่ตัวฟังก์ชันการทำงานตรงๆ"
    },
    {
      id: 2,
      statement: "นักเรียนต้องสามารถล็อกอินผ่านบัญชีของสถาบัน (Google Workspaces @domain.ac.th) เพื่อเข้าเรียนได้",
      options: [
        { text: "Functional Requirement (สิ่งที่ระบบต้องปฏิบัติได้)", isCorrect: true },
        { text: "Non-Functional Requirement (ความปลอดภัยของระบบ)", isCorrect: false },
        { text: "System Constraint (ข้อจำกัดด้านเครื่องมือ)", isCorrect: false },
        { text: "Assumption (ข้อตกลงภายนอก)", isCorrect: false }
      ],
      explanation: "ถูกต้อง! ข้อความนี้ระบุพฤติกรรมการทำงานของระบบและขั้นตอนสำคัญที่ระบบต้องตอบสนอง (คือระบบต้องยอมรับอินพุต/ตรวจสอบตัวตนผู้ใช้ผ่าน Google Workspaces) จึงจัดเป็น Functional Requirement"
    },
    {
      id: 3,
      statement: "โค้ดแอปพลิเคชันฝั่งหลังบ้าน (Backend API) ต้องถูกเขียนและคอมไพล์ด้วย Node.js เวอร์ชัน 20 LTS เท่านั้น",
      options: [
        { text: "Functional Requirement", isCorrect: false },
        { text: "Non-Functional Requirement", isCorrect: false },
        { text: "System Constraint (ข้อจำกัดและเทคโนโลยีที่ถูกตีกรอบ)", isCorrect: true },
        { text: "Assumption", isCorrect: false }
      ],
      explanation: "ถูกต้อง! การตีกรอบเทคโนโลยี เช่น ภาษา เครื่องมือ แพลตฟอร์ม หรือเวอร์ชันระบบปฏิบัติการ ถือเป็น System Constraint (ข้อจำกัดของระบบ) ซึ่งจำกัดพื้นที่ในการเขียนหรือตัดสินใจทางเทคนิคของนักพัฒนา"
    },
    {
      id: 4,
      statement: "คาดว่า API ธนาคารกสิกรไทยจะเปิดให้เชื่อมต่อทดสอบแบบ Sandbox ตลอดเวลาโดยไม่มีการปิดปรับปรุงในช่วงพัฒนา",
      options: [
        { text: "Functional Requirement", isCorrect: false },
        { text: "Non-Functional Requirement", isCorrect: false },
        { text: "System Constraint", isCorrect: false },
        { text: "Assumption & Dependency (สมมติฐานและปัจจัยความเสี่ยงภายนอก)", isCorrect: true }
      ],
      explanation: "ถูกต้อง! เป็นสมมติฐาน (Assumption) เพราะเป็นการคาดคะเนปัจจัยภายนอกระบบที่เราไม่สามารถควบคุมหรือบริหารจัดการได้เองโดยตรง แต่เป็นตัวแปรสำคัญที่ส่งผลต่อความสำเร็จของโครงการ"
    }
  ];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIdx];

  const handleOptionClick = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (currentQuestion.options[selectedOptionIdx].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <CustomStyles />

      {/* ─── Layer 1: Ambient Backdrop & Glow Gradients ─── */}
      <AmbientBackdrop blobs={OOAD1_1_BLOBS} />

      {/* ─── Layer 3: Flexible Subtopics & Interactives ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Intro to SRS (Fluid Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              วิศวกรรมความต้องการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              บทบาทและความสำคัญของเอกสาร SRS
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ในกระบวนการวิเคราะห์และออกแบบระบบเชิงวัตถุ (OOAD) ขั้นตอนที่สำคัญที่สุดก่อนเริ่มเขียนโค้ดคือ การสร้างความเข้าใจที่ตรงกันผ่านเอกสาร
              <span className="mx-1 px-1.5 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-700 font-mono text-[14px]">SRS (Software Requirements Specification)</span>
              หรือเอกสารข้อกำหนดความต้องการซอฟต์แวร์ ซึ่งเป็นข้อตกลงอย่างเป็นทางการที่อธิบายสถาปัตยกรรม หน้าที่ ความเร็ว และกฎเกณฑ์ธุรกิจทั้งหมดของระบบ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ConceptCard
                symbol="Blueprint"
                title="พิมพ์เขียวการสร้างระบบ"
                description="เป็นคู่มืออ้างอิงให้โปรแกรมเมอร์และสถาปนิกใช้เขียนโค้ดและเลือกใช้เครื่องมือทำงานให้เสร็จตรงเป้าหมาย"
                accent="indigo"
              />
              <ConceptCard
                symbol="Contract"
                title="สัญญาความเข้าใจตรงกัน"
                description="ป้องกันการเปลี่ยนขอบเขตงานกลางคัน (Scope Creep) ระหว่างลูกค้าและผู้พัฒนา ป้องกันข้อโต้แย้งภายหลัง"
                accent="cyan"
              />
              <ConceptCard
                symbol="Testing"
                title="เกณฑ์สำหรับประเมินผล"
                description="วิศวกรฝ่ายประกันคุณภาพ (QA) ใช้เป็นหลักการเขียนแผนทดสอบระบบ (Test Cases) เพื่อยืนยันความถูกต้อง"
                accent="emerald"
              />
              <ConceptCard
                symbol="Estimation"
                title="ประเมินราคาและระยะเวลา"
                description="ใช้วิเคราะห์ค่าใช้จ่าย กำลังคน และตารางส่งมอบงานได้อย่างสอดคล้องกับขอบเขตงานจริง"
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* ─── Section 2: Core Elements ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              องค์ประกอบของ SRS
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              จำแนกห้าองค์ประกอบสำคัญในข้อกำหนดระบบ
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เอกสาร SRS ที่มีคุณภาพต้องแยกแยะโครงสร้างและประเภทของความต้องการอย่างเป็นสากล เพื่อไม่ให้ข้อมูลปะปนกันจนเกิดความสับสนในการออกแบบ โดยแบ่งเป็น 5 องค์ประกอบหลัก:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  symbol: "FR",
                  title: "Functional Requirement",
                  desc: "ข้อกำหนดเชิงฟังก์ชัน ระบุสิ่งที่ระบบต้องตอบสนอง เช่น การล็อกอิน การเพิ่มคะแนน และการสืบค้นข้อมูล",
                  accent: "indigo"
                },
                {
                  symbol: "NFR",
                  title: "Non-Functional",
                  desc: "ข้อกำหนดเชิงคุณภาพ ระบุประสิทธิภาพ ความเร็ว ความมั่นคงปลอดภัย อัตราการพร้อมใช้งาน และความสะดวกในการใช้",
                  accent: "cyan"
                },
                {
                  symbol: "CON",
                  title: "System Constraint",
                  desc: "ข้อจำกัดของระบบ ตีกรอบสถาปัตยกรรมทางเทคโนโลยี เช่น ระบบปฏิบัติการ ฐานข้อมูล ภาษาพัฒนา และมาตรฐานความปลอดภัย",
                  accent: "amber"
                },
                {
                  symbol: "INT",
                  title: "System Interface",
                  desc: "ส่วนเชื่อมต่อระบบ อธิบายช่องทางการเชื่อมโยงกับอุปกรณ์ภายนอก แพลตฟอร์มอื่นๆ หรือ Web API ของผู้ให้บริการ",
                  accent: "emerald"
                },
                {
                  symbol: "ASM",
                  title: "Assumptions",
                  desc: "สมมติฐานหลัก คาดการณ์เงื่อนไขภายนอกโครงการที่เป็นจริง เช่น สิทธิการเข้าถึงของยูสเซอร์ หรือคุณภาพสัญญาณโครงข่าย",
                  accent: "violet"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-sm rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 block w-fit mb-3 text-slate-500 uppercase tracking-widest">
                      {item.symbol}
                    </span>
                    <h4 className="font-bold text-slate-800 text-[15px] leading-tight mb-2">{item.title}</h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Interactive Quality & Repair Lab ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ระบบจำลองเชิงโต้ตอบ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวจำลองการประเมินและซ่อมแซมคุณภาพข้อกำหนด (IEEE 830)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองสวมบทบาทเป็นนักวิเคราะห์ระบบ (System Analyst) ตรวจสอบความกำกวมของแบบร่างความต้องการดั้งเดิม 
            และเลือกทำคำสั่งเพื่อซ่อมแซมและแปลงสารให้อยู่ในรูปแบบที่ถูกต้องตามข้อกำหนดสากลของเอกสาร SRS:
          </p>

          <SimulatorShell
            dark
            title="Requirements Quality Diagnosis & Refactoring Lab"
            icon={<Sliders className="w-8 h-8 text-orange-400" />}
            glowColors="from-orange-950/20 to-indigo-950/15"
            iconColor="text-orange-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Controls (Left Panel) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  QUALITY DETECTOR
                </div>

                <div className="space-y-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกประเด็นข้อกำหนดที่ต้องการตรวจสอบ:</span>
                  
                  {/* Selectors */}
                  <div className="grid grid-cols-2 gap-2">
                    {initialRequirements.map(req => {
                      const isRep = repairedStatus[req.id];
                      return (
                        <button
                          key={req.id}
                          onClick={() => setSelectedReqId(req.id)}
                          disabled={isAnimating}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[80px]
                            ${selectedReqId === req.id 
                              ? 'border-orange-500 bg-orange-950/40 text-orange-200' 
                              : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                            }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider block">{req.name}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded w-fit mt-1
                            ${isRep ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                            {isRep ? '🟢 สมบูรณ์' : '🔴 รอซ่อมแซม'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Requirement Card */}
                  <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">ข้อกำหนดดั้งเดิม (Draft Requirement):</span>
                      <p className="text-slate-200 text-sm font-semibold mt-1">"{currentReq.draft}"</p>
                    </div>

                    <div className="border-t border-slate-900 pt-2 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-mono text-orange-400 uppercase tracking-wider block">ข้อบกพร่อง / ความเสี่ยงเชิงวิศวกรรม:</span>
                        <p className="text-slate-400 text-[12px] leading-relaxed mt-0.5">{currentReq.problem}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions and Logs */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex gap-2">
                    <button
                      onClick={handleRepairClick}
                      disabled={isAnimating || isCurrentRepaired}
                      className="w-8/12 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg disabled:opacity-40 transition-all duration-200"
                    >
                      <Sparkles className="w-4 h-4" /> ซ่อมแซมความกำกวม (IEEE 830)
                    </button>
                    <button
                      onClick={handleResetSim}
                      disabled={isAnimating}
                      className="w-4/12 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตแล็บ
                    </button>
                  </div>

                  {/* Terminal Log */}
                  <div className="bg-black/80 p-3 rounded-xl border border-slate-950 font-mono text-[11px] leading-relaxed text-orange-400 overflow-y-auto max-h-[110px] min-h-[90px]">
                    <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-1.5 uppercase tracking-wide text-[8.5px] font-bold">Trace Analyzer Output:</div>
                    {simLog.map((line, i) => (
                      <div key={i} className="animate-fadeIn">
                        <span className="text-zinc-650">&gt; </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visualization (Right Panel) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  SRS ENGINEERING PIPELINE
                </div>

                <div className="space-y-6 mt-6 flex-1 flex flex-col justify-between">
                  {/* Pipeline Graph SVG */}
                  <div className="relative bg-slate-900/40 rounded-xl border border-slate-900/60 p-4 grow flex items-center justify-center min-h-[200px]">
                    <svg viewBox="0 0 500 220" className="w-full h-full" id="ooad-srs-svg">
                      <defs>
                        {/* Define marker arrow heads with exact match color */}
                        <marker id="arrow-gray" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                        </marker>
                        <marker id="arrow-green" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                        </marker>
                        <marker id="arrow-orange" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#f97316" />
                        </marker>
                      </defs>

                      {/* Connection paths with exact center coordinates behind nodes */}
                      <path 
                        d="M 80,90 L 250,90" 
                        fill="none" 
                        stroke={isAnimating ? "#f97316" : "#475569"} 
                        strokeWidth="3" 
                        strokeDasharray={isAnimating ? "6,4" : "none"}
                        className={isAnimating ? "animate-flow-svg-line" : ""}
                        markerEnd="url(#arrow-gray)"
                      />

                      {/* Success path (Green line when repaired) */}
                      <path 
                        d="M 250,90 L 420,90" 
                        fill="none" 
                        stroke={isCurrentRepaired ? "#10b981" : "#334155"} 
                        strokeWidth="3" 
                        strokeDasharray={isAnimating && isCurrentRepaired ? "6,4" : "none"}
                        className={isAnimating && isCurrentRepaired ? "animate-flow-svg-line" : ""}
                        markerEnd={isCurrentRepaired ? "url(#arrow-green)" : "url(#arrow-gray)"}
                      />

                      {/* Reject path (Vertically down to Node 4 when not repaired) */}
                      <path 
                        d="M 250,90 L 250,170" 
                        fill="none" 
                        stroke={!isCurrentRepaired ? "#f97316" : "#334155"} 
                        strokeWidth="2.5" 
                        strokeDasharray={!isCurrentRepaired ? "none" : "4,4"}
                        markerEnd={!isCurrentRepaired ? "url(#arrow-orange)" : "url(#arrow-gray)"}
                      />

                      {/* Glowing traveling particles on active state */}
                      {isAnimating && (
                        <circle r="5" fill="#f97316" className="animate-pulse-glow">
                          <animateMotion dur="1.2s" repeatCount="indefinite" path="M 80,90 L 250,90" />
                        </circle>
                      )}
                      
                      {isAnimating && isCurrentRepaired && (
                        <circle r="5" fill="#10b981" className="animate-pulse-glow">
                          <animateMotion dur="1.2s" repeatCount="indefinite" path="M 250,90 L 420,90" />
                        </circle>
                      )}

                      {/* Nodes group */}
                      {/* Node 1: Input */}
                      <g transform="translate(80, 90)">
                        <circle r="26" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <FileText className="w-5 h-5 text-slate-400" />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">ข้อเขียนร่าง</text>
                      </g>

                      {/* Node 2: Quality Gate */}
                      <g transform="translate(250, 90)">
                        <circle r="30" fill={isCurrentRepaired ? "#064e3b" : "#451a03"} stroke={isCurrentRepaired ? "#10b981" : "#f97316"} strokeWidth="2.5" className="transition-colors duration-500" />
                        <g transform="translate(-12, -12)">
                          <Cpu className={`w-6 h-6 ${isCurrentRepaired ? "text-emerald-400 animate-pulse" : "text-orange-400"} transition-colors duration-500`} />
                        </g>
                        <text x="0" y="46" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">เครื่องตรวจคุณภาพ</text>
                      </g>

                      {/* Node 3: SRS Output */}
                      <g transform="translate(420, 90)">
                        <circle r="26" fill={isCurrentRepaired ? "#064e3b" : "#111827"} stroke={isCurrentRepaired ? "#10b981" : "#374151"} strokeWidth="2.5" className="transition-colors duration-500" />
                        <g transform="translate(-10, -10)">
                          <FileCheck className={`w-5 h-5 ${isCurrentRepaired ? "text-emerald-400" : "text-slate-650"} transition-colors duration-500`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">ผ่านเกณฑ์ SRS</text>
                      </g>

                      {/* Node 4: Rejected / Refactor Bin */}
                      <g transform="translate(250, 170)">
                        <circle r="20" fill={isCurrentRepaired ? "#111827" : "#7f1d1d"} stroke={isCurrentRepaired ? "#374151" : "#f87171"} strokeWidth="2" className="transition-colors duration-500" />
                        <g transform="translate(-8, -8)">
                          <AlertTriangle className={`w-4 h-4 ${isCurrentRepaired ? "text-slate-600" : "text-red-400 animate-float"} transition-colors duration-500`} />
                        </g>
                        <text x="32" y="4" textAnchor="start" className="fill-slate-500 font-sans text-[8.5px] font-bold uppercase">บกพร่อง (ต้องแก้)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Refactored Text View */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">ผลการจัดทำเอกสารความต้องการที่ดี (SRS Ready Output):</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${isCurrentRepaired ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900' : 'bg-red-950/80 text-red-400 border border-red-900'}`}>
                        {isCurrentRepaired ? '🟢 STANDARD APPROVED' : '🔴 REJECTED: AMBIGUOUS'}
                      </span>
                    </div>

                    <div className="min-h-[70px] bg-slate-950/60 p-3 rounded-lg border border-slate-900 flex items-center justify-center">
                      {isCurrentRepaired ? (
                        <p className="text-emerald-300 font-sans text-sm md:text-[15px] font-semibold leading-relaxed w-full">
                          "{currentReq.repaired}"
                        </p>
                      ) : (
                        <p className="text-slate-500 font-sans text-sm italic">
                          คำชี้แจงถูกสกัดออกเนื่องจากขัดต่อคุณภาพมาตรฐานโปรดกด "ซ่อมแซมความกำกวม" ทางด้านซ้าย
                        </p>
                      )}
                    </div>

                    {isCurrentRepaired && (
                      <div className="pt-2 border-t border-slate-800 text-[11.5px] text-slate-400 leading-relaxed font-sans">
                        <strong className="text-emerald-400 block mb-0.5">เหตุผลและหลักวิศวกรรมที่ใช้ปรับปรุง:</strong>
                        {currentReq.details}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Section 4: Quiz Challenge (Classification Arena) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              แบบฝึกทักษะการวิเคราะห์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความท้าทายในการจัดหมวดหมู่ความต้องการ
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              เพื่อประเมินความเข้าใจของนักศึกษาในเรื่ององค์ประกอบที่แตกต่างกันของเอกสาร SRS ให้นักเรียนคัดเลือกประเภทความต้องการจากสถานการณ์จำลองที่พบบ่อยในโครงการพัฒนาซอฟต์แวร์จริง:
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-3xl p-6 md:p-8 max-w-4xl mx-auto">
              {!quizCompleted ? (
                <div className="space-y-6">
                  {/* Progress Header */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-mono">
                      คำถามที่ {currentQuestionIdx + 1} จาก {quizQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      คะแนนสะสม: {score} / {quizQuestions.length}
                    </span>
                  </div>

                  {/* Question Statement */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500">
                      พิจารณาประโยคข้อกำหนด:
                    </span>
                    <p className="text-slate-800 text-[17px] md:text-[18px] font-bold leading-relaxed">
                      "{currentQuestion.statement}"
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, idx) => {
                      let btnClass = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-orange-300";
                      
                      if (selectedOptionIdx === idx) {
                        btnClass = "border-orange-500 bg-orange-50/50 text-orange-800 font-semibold ring-2 ring-orange-200";
                      }
                      
                      if (isAnswerSubmitted) {
                        if (option.isCorrect) {
                          btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold";
                        } else if (selectedOptionIdx === idx) {
                          btnClass = "border-rose-500 bg-rose-50 text-rose-800";
                        } else {
                          btnClass = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60 cursor-not-allowed";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(idx)}
                          disabled={isAnswerSubmitted}
                          className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between text-[15px]
                            ${btnClass}`}
                        >
                          <span className="leading-snug">{option.text}</span>
                          {isAnswerSubmitted && option.isCorrect && (
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-2 animate-scaleUp" />
                          )}
                          {isAnswerSubmitted && selectedOptionIdx === idx && !option.isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-650 shrink-0 ml-2 animate-scaleUp" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Next Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOptionIdx === null}
                        className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-sm font-bold shadow-md hover:scale-[1.02] active:scale-98 disabled:opacity-40 transition-all duration-200 cursor-pointer"
                      >
                        ยืนยันคำตอบ
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-700 hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      >
                        {currentQuestionIdx < quizQuestions.length - 1 ? 'ข้อถัดไป' : 'เสร็จสิ้นแบบฝึกทักษะ'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Explanation panel using Frosted Glass Callout (DESIGN.md §3) */}
                  {isAnswerSubmitted && (
                    <div className="bg-orange-50/60 backdrop-blur-md border border-orange-200/60 rounded-2xl p-5 border-l-[3px] border-l-orange-500 leading-relaxed animate-fadeIn">
                      <h5 className="font-bold text-orange-950 text-sm mb-1.5 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-orange-600" />
                        คำอธิบายทางวิชาการ:
                      </h5>
                      <p className="text-[13.5px] text-slate-750 leading-relaxed font-sans">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Results Screen
                <div className="text-center py-8 space-y-6">
                  <div className="inline-flex p-4 bg-orange-100 rounded-full text-orange-600 animate-float" style={{ animationDuration: '3.5s' }}>
                    <Sparkles className="w-12 h-12" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-slate-900">การทดสอบจำแนกองค์ประกอบเสร็จสิ้น!</h4>
                    <p className="text-slate-500 text-sm">คุณทำคะแนนได้ยอดเยี่ยมและพร้อมนำไปประยุกต์ใช้ในโครงการจริง</p>
                  </div>

                  <div className="max-w-xs mx-auto bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">ผลคะแนนสอบ</span>
                    <span className="text-5xl font-black text-orange-600 font-mono">{score}</span>
                    <span className="text-lg text-slate-400 font-mono font-bold"> / {quizQuestions.length}</span>
                  </div>

                  <button
                    onClick={handleRestartQuiz}
                    className="px-6 py-3 border border-orange-500 text-orange-600 rounded-xl text-sm font-bold cursor-pointer hover:bg-orange-50/50 hover:scale-[1.02] active:scale-98 transition-all duration-200 flex items-center gap-1.5 mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" /> เริ่มทำแบบทดสอบใหม่
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: การสกัดและเขียนข้อกำหนดความต้องการระบบที่ดี"
          taskText={`[โจทย์ปฏิบัติประจำวิชาการวิเคราะห์และออกแบบระบบเชิงวัตถุ]

ให้นักเรียนวิเคราะห์และเขียนข้อกำหนดความต้องการระบบของ "ระบบห้องสมุดดิจิทัล (Digital Library)" ตามหลักเกณฑ์และองค์ประกอบของเอกสาร SRS ดังนี้:

1. สกัดข้อกำหนดเชิงฟังก์ชัน (Functional Requirement) สำหรับการ ยืมหนังสือและการคืนหนังสือ มาอย่างละ 1 ข้อกำหนดที่เป็นระบบสากล ไม่คลุมเครือ
2. เขียนข้อกำหนดที่ไม่ใช่เชิงฟังก์ชัน (Non-Functional Requirement) ด้านความมั่นคงปลอดภัย (Security) หรือประสิทธิภาพระบบ (Performance) มาอย่างละ 1 ข้อกำหนดในรูปตัวเลขดัชนีชี้วัดที่สามารถเขียนเงื่อนไขตรวจสอบ (Verifiable) ได้ชัดเจน
3. ระบุข้อจำกัดของระบบ (System Constraints) ด้านเทคโนโลยี ฐานข้อมูล หรือเครื่องแม่ข่าย (OS) อย่างน้อย 1 ข้อกำหนดเพื่อใช้ตีกรอบในการพัฒนาโปรแกรม
4. อธิบายเหตุผลว่าหากเขียนข้อกำหนดระบบที่มีความกำกวม (Ambiguity) เช่น "ระบบต้องค้นหาหนังสือได้เร็วกว่าเดิมมากและหน้าจอใช้ง่ายที่สุด" จะส่งผลกระทบและเพิ่มความเสี่ยงอย่างไรต่อวิศวกรฝ่ายทดสอบระบบ (QA Tester) และผู้พัฒนาโปรแกรม

ส่งชิ้นงานโดยเขียนจัดกลุ่มคำตอบเป็นข้อๆ อย่างเรียบร้อยเพื่อนำส่งและบันทึกประเมินผลการเรียนการศึกษาในลำดับต่อไป`}
        />

      </main>
    </div>
  );
}
