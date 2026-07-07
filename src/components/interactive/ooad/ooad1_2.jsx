import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Zap, 
  Users, 
  Database,
  ShieldAlert,
  FolderOpen,
  Award,
  Terminal,
  Play,
  Sparkles,
  Info
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  SimulatorShell, 
  ConceptCard, 
  AmbientBackdrop,
  QuizEngine 
} from '../shared';

// Custom CSS for animations and slide glitch typography
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes slide-in {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes float-icon {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(3deg); }
    }
    @keyframes pulse-flow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.9; }
    }
    .animate-slide { animation: slide-in 0.4s ease-out forwards; }
    .animate-float-icon { animation: float-icon 4s ease-in-out infinite; }
    .animate-pulse-flow { animation: pulse-flow 2s ease-in-out infinite; }
    
    .glitch-text {
      position: relative;
      text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                   -0.025em -0.05em 0 rgba(0, 255, 255, 0.75),
                   0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    
    .slide-shell {
      background-color: #0d0e12;
      border: 1px solid #1f2937;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
  `}} />
);

export default function OOAD1_2() {
  // ─── 1. Ambient Background Blobs (Orange/Indigo/Purple Theme) ───────────
  const OOAD1_2_BLOBS = [
    { color: 'bg-orange-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-30' },
    { color: 'bg-indigo-200', size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-25' },
    { color: 'bg-purple-200', size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-25' },
    { color: 'bg-amber-100',  size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-20' }
  ];

  // ─── 2. Slide Deck Data (Based on User Images) ──────────────────────────
  const slides = [
    {
      id: 0,
      title: "บทที่ 1 การจัดทำเอกสาร SRS",
      subtitle: "System Requirement Specification",
      isCover: true,
      description: "เอกสารที่รวบรวมความต้องการเชิงเทคนิคและการทำงานของซอฟต์แวร์ไว้ในรูปแบบทางการ เพื่อให้ผู้พัฒนาและลูกค้าเข้าใจตรงกัน 100%"
    },
    {
      id: 1,
      title: "1. บทนำ (INTRODUCTION)",
      questions: [
        "วัตถุประสงค์ของระบบคืออะไร?",
        "ขอบเขตของระบบครอบคลุมถึงไหน?",
        "คำจำกัดความหรือคำย่อที่ใช้ในเอกสารมีอะไรบ้าง?"
      ],
      example: "ระบบนี้มีวัตถุประสงค์เพื่อจัดการข้อมูลนักศึกษาในสถาบันการศึกษา โดยสามารถลงทะเบียนนักศึกษา บันทึกผลการเรียน และพิมพ์ใบรายงานผลได้",
      extraTitle: "คำจำกัดความ (Definitions):",
      extraItems: [
        { term: "CRUD", definition: "Create, Read, Update, Delete" },
        { term: "UI", definition: "User Interface" }
      ],
      emoji: "🤘" // Yellow hand sign from slide
    },
    {
      id: 2,
      title: "2. ภาพรวมระบบ (OVERALL DESCRIPTION)",
      questions: [
        "ผู้ใช้งานระบบคือใครบ้าง? (User Characteristics)",
        "ระบบนี้ทำงานในบริบทหรือสภาวะแวดล้อมใด? (Product Perspective)",
        "ระบบมีอินเทอร์เฟซอะไรเชื่อมต่อบ้าง? (UI, Hardware, Software Interfaces)"
      ],
      example: "ระบบจะถูกใช้งานโดยเจ้าหน้าที่ทะเบียนและอาจารย์ ผ่านเว็บเบราว์เซอร์",
      extraTitle: "อินเทอร์เฟซหลัก:",
      extraItems: [
        { term: "Web UI", definition: "รองรับการใช้งานผ่านหน้าจอคอมพิวเตอร์ตั้งโต๊ะและมือถือ" }
      ],
      emoji: "😜" //Squinty tongue out face from slide
    },
    {
      id: 3,
      title: "3. ข้อกำหนดเชิงฟังก์ชัน (FUNCTIONAL REQUIREMENTS)",
      questions: [
        "รายการสิ่งที่ระบบต้องทำมีอะไรบ้าง? (เป็นรายการย่อยๆ ที่ชัดเจน)",
        "ระบบต้องตอบสนองอย่างไรเมื่อผู้ใช้ป้อนข้อมูลอินพุต?"
      ],
      example: "ระบบจะต้องจัดเรียงสิทธิ์และดำเนินธุรกรรมข้อมูลตามรหัสนักศึกษาอย่างถูกต้อง",
      extraTitle: "ตัวอย่างข้อกำหนดเชิงฟังก์ชัน:",
      extraItems: [
        { term: "FR-01", definition: "ระบบต้องสามารถบันทึกข้อมูลนักศึกษาใหม่ได้" },
        { term: "FR-02", definition: "ระบบต้องสามารถค้นหาข้อมูลนักศึกษาโดยใช้รหัสนักศึกษา" },
        { term: "FR-03", definition: "ระบบต้องสามารถส่งออกข้อมูลเป็นไฟล์ PDF ได้" }
      ],
      emoji: "🤘"
    },
    {
      id: 4,
      title: "4. ข้อกำหนดไม่ใช่เชิงฟังก์ชัน (NON-FUNCTIONAL REQUIREMENTS)",
      questions: [
        "ระบบต้องมีคุณภาพด้านความเร็วอย่างไร? (Performance)",
        "ระบบต้องมีความปลอดภัยและความมั่นคงระดับใด? (Security)",
        "ระบบต้องรองรับความสามารถในการพร้อมใช้งานเท่าไหร่? (Availability)"
      ],
      example: "ระบบต้องสามารถประมวลผลคำสั่งได้อย่างรวดเร็ว ปลอดภัย และมีประสิทธิภาพการทำงานสูง",
      extraTitle: "ตัวอย่างข้อกำหนดไม่ใช่เชิงฟังก์ชัน:",
      extraItems: [
        { term: "NFR-01", definition: "ระบบต้องสามารถรองรับผู้ใช้พร้อมกันอย่างน้อย 50 คน" },
        { term: "NFR-02", definition: "ระบบต้องใช้โปรโตคอล HTTPS ในการส่งข้อมูลเพื่อความปลอดภัย" },
        { term: "NFR-03", definition: "หน้าเว็บต้องดาวน์โหลดองค์ประกอบหลักเสร็จสิ้นภายใน 3 วินาที" }
      ],
      emoji: "😜"
    },
    {
      id: 5,
      title: "5. เงื่อนไข/ข้อจำกัด & สมมติฐาน (CONSTRAINTS & ASSUMPTIONS)",
      questions: [
        "ข้อจำกัดด้านเทคโนโลยี ฮาร์ดแวร์ หรือสถาปัตยกรรมมีอะไรบ้าง?",
        "สมมติฐานหรือตัวแปรภายนอกที่เป็นจริงในระหว่างพัฒนาคืออะไร?"
      ],
      example: "การตีกรอบสภาพแวดล้อมทางเทคโนโลยีที่ระบบจะรัน และสิ่งที่คาดการณ์ว่าจะเป็นจริง",
      extraTitle: "ตัวอย่างเงื่อนไขและสมมติฐาน:",
      extraItems: [
        { term: "Constraint", definition: "ระบบต้องทำงานบนเว็บเบราว์เซอร์ Google Chrome เวอร์ชัน 90 ขึ้นไปเท่านั้น" },
        { term: "Assumption", definition: "สมมติว่าเจ้าหน้าที่ทุกคนมีบัญชีอีเมลขององค์กรสำหรับล็อกอินแล้ว" }
      ],
      emoji: "🤘"
    },
    {
      id: 6,
      title: "6. เกณฑ์การยอมรับ (ACCEPTANCE CRITERIA)",
      questions: [
        "ระบบจะ 'ถือว่าเสร็จสมบูรณ์' และพร้อมส่งมอบเมื่อใด?",
        "เงื่อนไขขั้นต่ำที่ลูกค้าและผู้พัฒนาจะอนุมัติปิดโครงการคืออะไร?"
      ],
      example: "ข้อตกลงในการผ่านการทดสอบ UAT (User Acceptance Testing) ก่อนส่งมอบชิ้นงาน",
      extraTitle: "ตัวอย่างเกณฑ์การยอมรับ:",
      extraItems: [
        { term: "AC-01", definition: "ผู้ใช้สามารถเพิ่ม ลบ แก้ไข ข้อมูลนักศึกษาได้โดยไม่มีข้อผิดพลาด" },
        { term: "AC-02", definition: "ระบบต้องสามารถจัดทำและส่งออกรายงานผลการเรียนเป็นไฟล์ PDF ได้อย่างถูกต้อง" },
        { term: "AC-03", definition: "ระบบต้องไม่มี Bug ในระดับร้ายแรง (Critical Bug) หลงเหลืออยู่ในตอนทดสอบ UAT" }
      ],
      emoji: "😜"
    },
    {
      id: 7,
      title: "7. ภาคผนวก (APPENDIX)",
      questions: [
        "มีแผนภาพจำลองระบบอะไรบ้าง? (Use Case, Activity Diagrams)",
        "มีหน้าจอตัวอย่างระบบงานแบบดราฟต์ไหม? (Wireframes/Mockups)",
        "มีตารางคำศัพท์เฉพาะหรือภาคผนวกอื่นๆ หรือไม่?"
      ],
      example: "การแนบเอกสารเสริมอ้างอิงเพื่อสนับสนุนข้อมูลในโครงร่างหลักให้เข้าใจง่ายขึ้น",
      extraTitle: "ตัวอย่างข้อมูลในภาคผนวก:",
      extraItems: [
        { term: "Diagrams", definition: "Use Case Diagram สำหรับฟังก์ชันการจัดการนักศึกษา" },
        { term: "UI Design", definition: "Wireframe หน้าจอการสืบค้นประวัตินักศึกษา" },
        { term: "Glossary", definition: "GPA = Grade Point Average, PDF = Portable Document Format" }
      ],
      emoji: "🤘"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    if (activeSlide < slides.length - 1) setActiveSlide(activeSlide + 1);
  };

  const handlePrevSlide = () => {
    if (activeSlide > 0) setActiveSlide(activeSlide - 1);
  };

  // ─── 3. State for Interactive Outline Builder (Section 3) ──────────────
  const outlineItems = [
    { id: 'item1', text: "วัตถุประสงค์เพื่อจัดการฐานข้อมูลทะเบียนเรียน", target: 1 },
    { id: 'item2', text: "ระบบจะทำงานผ่านเว็บเบราว์เซอร์โดยอาจารย์เป็นผู้ใช้", target: 2 },
    { id: 'item3', text: "FR-01: ระบบต้องสืบค้นประวัตินักศึกษาได้จากรหัสประชากร", target: 3 },
    { id: 'item4', text: "NFR-01: หน้าจอต้องพร้อมโต้ตอบภายใน 2.5 วินาที", target: 4 },
    { id: 'item5', text: "ระบบต้องการ PostgreSQL 15 และ Rocky Linux 9.x", target: 5 },
    { id: 'item6', text: "AC-01: ระบบส่งออกข้อมูล PDF ได้ถูกต้องโดยไม่มีคอขวด", target: 6 },
    { id: 'item7', text: "แนบแผนภาพ Use Case Diagram การจัดการข้อมูลนักศึกษา", target: 7 }
  ];

  const sections = [
    { id: 1, title: "1. บทนำ" },
    { id: 2, title: "2. ภาพรวมระบบ" },
    { id: 3, title: "3. ข้อกำหนดฟังก์ชัน" },
    { id: 4, title: "4. ข้อกำหนดคุณภาพ" },
    { id: 5, title: "5. ข้อจำกัด/สมมติฐาน" },
    { id: 6, title: "6. เกณฑ์การยอมรับ" },
    { id: 7, title: "7. ภาคผนวก" }
  ];

  const [assignments, setAssignments] = useState({}); // { itemId: sectionId }
  const [outlineCompleted, setOutlineCompleted] = useState(false);
  const [outlineFeedback, setOutlineFeedback] = useState("");

  const handleAssignItem = (itemId, sectionId) => {
    setAssignments(prev => {
      const updated = { ...prev, [itemId]: sectionId };
      
      // Check correctness
      let correctCount = 0;
      outlineItems.forEach(item => {
        if (updated[item.id] === item.target) {
          correctCount++;
        }
      });

      if (correctCount === outlineItems.length) {
        setOutlineCompleted(true);
        setOutlineFeedback("ยินดีด้วย! คุณจัดทำโครงร่างมาตรฐานเอกสาร SRS ได้ถูกต้องครบถ้วนสมบูรณ์ 100%");
      } else {
        setOutlineCompleted(false);
        const assignedCount = Object.keys(updated).length;
        if (assignedCount === outlineItems.length) {
          setOutlineFeedback(`ยังไม่ถูกต้องทั้งหมด! (จับคู่ถูกต้อง ${correctCount} จาก ${outlineItems.length} หัวข้อ) โปรดตรวจสอบอีกครั้ง`);
        } else {
          setOutlineFeedback(`กำลังดำเนินการ... จับคู่แล้ว ${assignedCount} / ${outlineItems.length} หัวข้อ`);
        }
      }

      return updated;
    });
  };

  const handleResetOutline = () => {
    setAssignments({});
    setOutlineCompleted(false);
    setOutlineFeedback("");
  };

  // ─── 4. QuizEngine Levels Data (Section 4) ─────────────────────────────
  const ooadQuizLevels = [
    {
      title: "บทนำของเอกสาร SRS",
      desc: "ระบุความมุ่งหมายและวัตถุประสงค์ของเอกสาร SRS ให้เหมาะสม",
      code: "1. INTRODUCTION\n  1.1 Purpose (วัตถุประสงค์)\n  1.2 Scope (ขอบเขต)\n  1.3 Definitions (คำจำกัดความ)\n\n# คำถาม: คำศัพท์ CRUD และ UI ควรระบุไว้ภายใต้หัวข้อย่อยใดในบทนำ?",
      target: "1.3 Definitions (คำจำกัดความ)",
      options: [
        { key: "A", text: "1.1 Purpose (วัตถุประสงค์)", isCorrect: false },
        { key: "B", text: "1.2 Scope (ขอบเขต)", isCorrect: false },
        { key: "C", text: "1.3 Definitions (คำจำกัดความ)", isCorrect: true },
        { key: "D", text: "1.4 References (เอกสารอ้างอิง)", isCorrect: false }
      ],
      tip: "Definitions เป็นส่วนที่ใช้ระบุอักษรย่อ คำแปล หรือความหมายของคำทางเทคนิคเพื่อให้ลูกค้าอ่านเข้าใจ"
    },
    {
      title: "ประเภทความต้องการ: หน้าจอและเบราว์เซอร์",
      desc: "ประเมินและจัดกลุ่มสเปคด้านเทคนิคของหน้าจอคอมพิวเตอร์และเว็บเบราว์เซอร์",
      code: "ข้อกำหนด: \"อินเทอร์เฟซหลักคือ Web UI รองรับ Google Chrome เวอร์ชัน 90 ขึ้นไป\"\n\n# คำถาม: ข้อกำหนดด้านเวอร์ชัน Google Chrome จัดอยู่ในองค์ประกอบใดของ SRS?",
      target: "Constraints (ข้อจำกัดระบบ)",
      options: [
        { key: "A", text: "Functional Requirements (ข้อกำหนดเชิงฟังก์ชัน)", isCorrect: false },
        { key: "B", text: "Non-Functional Requirements (ข้อกำหนดคุณภาพ)", isCorrect: false },
        { key: "C", text: "Constraints (ข้อจำกัดทางสถาปัตยกรรมเทคนิค)", isCorrect: true },
        { key: "D", text: "Acceptance Criteria (เกณฑ์การยอมรับ)", isCorrect: false }
      ],
      tip: "เวอร์ชันเบราว์เซอร์ที่จำเพาะเจาะจง ถือเป็นการตีกรอบทางวิศวกรรมเทคนิค จึงจัดเป็นข้อจำกัด (Constraint)"
    },
    {
      title: "การจัดทำฟังก์ชันการส่งออก PDF",
      desc: "แยกแยะข้อกำหนดการบันทึกและการพิมพ์ไฟล์ PDF ออกเป็นประเภทที่เหมาะสม",
      code: "สเปค: \"FR-03 ระบบต้องสามารถส่งออกข้อมูลเป็นไฟล์ PDF ได้\"\n\n# คำถาม: ประโยคนี้สื่อพฤติกรรมการทำงานของระบบโดยตรง จัดเป็นข้อกำหนดประเภทใด?",
      target: "Functional Requirement",
      options: [
        { key: "A", text: "Functional Requirement (ข้อกำหนดเชิงฟังก์ชัน)", isCorrect: true },
        { key: "B", text: "Non-Functional Requirement (ข้อกำหนดไม่ใช่เชิงฟังก์ชัน)", isCorrect: false },
        { key: "C", text: "System Interface (ส่วนติดต่อระบบ)", isCorrect: false },
        { key: "D", text: "Appendix (ภาคผนวก)", isCorrect: false }
      ],
      tip: "สิ่งที่ระบบต้องทำ (ระบบต้องส่งออกไฟล์ได้) คือการอธิบาย Behavior/Feature ซึ่งเป็นเชิงฟังก์ชันตรงตัว"
    },
    {
      title: "การประเมิน UAT และการส่งมอบ",
      desc: "ค้นหาจุดที่ใช้กำหนดขอบเขต UAT และนิยามระบบที่พร้อมเสร็จสมบูรณ์",
      code: "ข้อตกลง: \"ระบบต้องไม่มี bug ระดับ Critical และสามารถคำนวณสถิติถูกต้อง\"\n\n# คำถาม: ข้อกำหนด UAT เพื่ออนุมัติรับของ จัดอยู่ในหัวข้อใดของโครงสร้าง SRS?",
      target: "Acceptance Criteria",
      options: [
        { key: "A", text: "Introduction (บทนำ)", isCorrect: false },
        { key: "B", text: "Overall Description (ภาพรวมระบบ)", isCorrect: false },
        { key: "C", text: "Acceptance Criteria (เกณฑ์ยอมรับส่งมอบ)", isCorrect: true },
        { key: "D", text: "Appendix (ภาคผนวก)", isCorrect: false }
      ],
      tip: "เกณฑ์ที่ใช้ชี้วัดว่าระบบจะ 'ถือว่าเสร็จสมบูรณ์' เพื่ออนุมัติส่งมอบงาน เรียกว่า เกณฑ์การยอมรับ (Acceptance Criteria)"
    }
  ];

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <CustomStyles />

      {/* ─── Layer 1: Ambient Backdrop & Glow Gradients ─── */}
      <AmbientBackdrop blobs={OOAD1_2_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Introduction to Standard SRS (Fluid Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              มาตรฐานเอกสารซอฟต์แวร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทำความเข้าใจเอกสาร SRS และโครงสร้างมาตรฐาน
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Theoretical Text (Fluid Open-Air Layout) */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
                เอกสาร <strong className="text-orange-600 font-semibold font-sans">SRS (Software Requirements Specification)</strong> คือเอกสารทางการที่อธิบายสถาปัตยกรรม ตรรกะ ฟังก์ชันการทำงาน และคุณภาพทั้งหมดของระบบ เพื่อเป็นข้อสัญญาและข้อตกลงที่ชัดเจนระหว่างผู้พัฒนากับลูกค้า 
              </p>
              
              <div className="bg-orange-50/60 backdrop-blur-md border border-orange-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-orange-500 leading-relaxed">
                <h4 className="font-bold text-orange-950 text-sm mb-1">ทำไมต้องจัดทำตามโครงสร้างมาตรฐาน?</h4>
                <p className="text-[13.5px] text-slate-750 font-normal leading-relaxed">
                  โครงสร้างที่เป็นสากล (เช่น IEEE 830 หรือ ISO) ช่วยป้องกันไม่ให้ข้อมูลหรือเงื่อนไขสำคัญของระบบตกหล่น ทำให้นักวิเคราะห์ สถาปนิกโปรแกรม และวิศวกรฝ่ายทดสอบระบบ (QA) สามารถทำความเข้าใจความต้องการและเริ่มงานได้ตรงจุดโดยไม่เกิดความเข้าใจคลาดเคลื่อน
                </p>
              </div>
            </div>

            {/* Structured Table Overview (Visual Card) */}
            <div className="lg:col-span-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6">
              <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-600 animate-float-icon" />
                โครงสร้าง 7 หัวข้อหลักของ SRS
              </h4>
              <div className="space-y-2">
                {[
                  { num: "1", name: "บทนำ (Introduction)", desc: "วัตถุประสงค์ ขอบเขต คำศัพท์เทคนิค" },
                  { num: "2", name: "ภาพรวมระบบ (Overall Description)", desc: "ลักษณะผู้ใช้ อินเทอร์เฟซ บริบทระบบ" },
                  { num: "3", name: "ข้อกำหนดเชิงฟังก์ชัน (Functional)", desc: "ตรรกะ Feature และสิ่งที่ระบบต้องทำ" },
                  { num: "4", name: "ข้อกำหนดไม่ใช่เชิงฟังก์ชัน (Non-Functional)", desc: "ความเร็ว ความเสถียร ความปลอดภัย" },
                  { num: "5", name: "เงื่อนไข/ข้อจำกัด & สมมติฐาน", desc: "ข้อจำกัดเทคโนโลยี สมมติฐานโครงการ" },
                  { num: "6", name: "เกณฑ์การยอมรับ (Acceptance Criteria)", desc: "เงื่อนไขทดสอบ UAT เพื่อรับของ" },
                  { num: "7", name: "ภาคผนวก (Appendix)", desc: "แผนภาพ Use Case, Mockup, คำศัพท์" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white transition-all duration-200">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <span className="text-xs font-bold text-slate-850 truncate">{item.name}</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500 max-w-[180px] text-right truncate">{item.desc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <a 
                  href="https://visuresolutions.com/th" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] text-slate-400 font-mono hover:text-orange-500 transition-colors"
                >
                  Source Reference: Visure Solutions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Interactive Slides Player (Presenting Slides Content) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              สื่อนำเสนอเชิงโต้ตอบ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              วิธีเขียนเอกสาร SRS ทีละหัวข้อ (พร้อมตัวอย่าง)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            คลิกเลือกหมายเลขหัวข้อหรือกดปุ่มนำทางเพื่อศึกษาคำอธิบายเชิงลึกและกรณีศึกษาตัวอย่างระบบจัดการข้อมูลนักศึกษาในแต่ละหัวข้อหลักของสไลด์:
          </p>

          {/* Presentation Slide Shell */}
          <div className="slide-shell rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden p-6 md:p-10 text-white min-h-[460px] flex flex-col justify-between">
            {/* Top header on slide */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6 shrink-0">
              <span className="text-xs md:text-sm font-bold tracking-wider text-orange-400 uppercase font-mono glitch-text">
                วิธีเขียนเอกสาร SRS ทีละหัวข้อ (พร้อมตัวอย่าง)
              </span>
              <div className="flex gap-1.5 font-mono text-xs">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold cursor-pointer transition-all duration-200
                      ${activeSlide === idx 
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    {idx === 0 ? "Cover" : idx}
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Body (Dynamic Content rendering based on active slide) */}
            <div className="flex-1 flex flex-col justify-center animate-slide" key={activeSlide}>
              {slides[activeSlide].isCover ? (
                // Cover Slide Layout
                <div className="text-center space-y-6 max-w-2xl mx-auto py-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-bold mb-2 uppercase tracking-widest font-mono">
                    <Sparkles className="w-3.5 h-3.5" /> Course Slide Deck
                  </div>
                  <h4 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight glitch-text">
                    {slides[activeSlide].title}
                  </h4>
                  <p className="text-2xl font-bold text-orange-400 font-mono">
                    ({slides[activeSlide].subtitle})
                  </p>
                  <div className="w-16 h-1.5 bg-orange-500 rounded-full mx-auto my-4"></div>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {slides[activeSlide].description}
                  </p>
                </div>
              ) : (
                // Standard Content Slide Layout
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Core concept points */}
                  <div className="lg:col-span-7 space-y-5">
                    <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug border-l-[3.5px] border-l-orange-500 pl-4 py-0.5">
                      {slides[activeSlide].title}
                    </h4>

                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">ประเด็นสำคัญที่ต้องระบุ:</span>
                      <ul className="space-y-2.5">
                        {slides[activeSlide].questions?.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[15px] text-slate-300 leading-relaxed font-sans">
                            <span className="w-5 h-5 rounded bg-slate-900 border border-slate-800 text-orange-500 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Example Box (The Yellow Card look from slide) */}
                    <div className="bg-yellow-400 rounded-2xl p-5 text-yellow-950 font-sans shadow-lg shadow-yellow-400/5 transition-transform duration-300 hover:scale-[1.01]">
                      <h5 className="font-extrabold text-xs uppercase tracking-widest mb-2 border-b border-yellow-950/10 pb-1.5 w-fit">
                        💡 ตัวอย่างประโยคข้อกำหนดความต้องการ:
                      </h5>
                      <p className="text-[14.5px] leading-relaxed font-semibold">
                        "{slides[activeSlide].example}"
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Definitions or subtopics list */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[260px] bg-slate-900/60 rounded-2xl p-5 border border-slate-800">
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-orange-400 uppercase tracking-widest block font-mono">
                        {slides[activeSlide].extraTitle}
                      </h5>
                      <div className="space-y-3">
                        {slides[activeSlide].extraItems?.map((item, idx) => (
                          <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1">
                            <span className="text-xs font-bold font-mono text-emerald-400">{item.term}</span>
                            <span className="text-[13px] text-slate-350 leading-relaxed font-sans">{item.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Decorated Hand/Face Emoji placeholder look from user slide */}
                    <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t border-slate-800/65">
                      <span className="text-[10px] text-slate-500 font-mono">DECK GRAPHICS</span>
                      <div className="text-2xl animate-float-icon">{slides[activeSlide].emoji}</div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-between items-center border-t border-slate-800 pt-6 mt-8 shrink-0">
              <button
                onClick={handlePrevSlide}
                disabled={activeSlide === 0}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" /> ก่อนหน้า
              </button>

              <span className="text-xs font-mono text-slate-500">
                สไลด์ {activeSlide + 1} จาก {slides.length}
              </span>

              <button
                onClick={handleNextSlide}
                disabled={activeSlide === slides.length - 1}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                ถัดไป <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Interactive SRS Document Constructor Lab (Simulator) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ระบบจำลองการเรียนรู้
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ห้องปฏิบัติการประกอบโครงร่างเอกสาร SRS (SRS Outline Builder)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองสร้างเอกสาร SRS ฉบับสมบูรณ์ด้วยตนเอง โดยการอ่านข้อความคำอธิบายความต้องการด้านล่าง แล้วเลือกจับคู่จัดหมวดหมู่ให้ลงตาม 7 หัวข้อมาตรฐานของโครงสร้างเอกสารให้ถูกต้อง:
          </p>

          <SimulatorShell
            dark
            title="IEEE SRS Outline Builder & Document Assembler"
            icon={<Sliders className="w-8 h-8 text-orange-400" />}
            glowColors="from-zinc-900/30 to-slate-950/20"
            iconColor="text-orange-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Draft Statements (Left Side) */}
              <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  REQUIREMENTS DECK
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกหัวข้อและเป้าหมายการจับกลุ่ม:</span>
                  
                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                    {outlineItems.map(item => {
                      const currentAssigned = assignments[item.id];
                      return (
                        <div key={item.id} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                          <p className="text-[13.5px] text-slate-200 font-semibold leading-relaxed">
                            "{item.text}"
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9.5px] font-mono text-slate-500 uppercase">จัดหมวดหมู่:</span>
                            {sections.map(sec => {
                              const isActive = currentAssigned === sec.id;
                              const isCorrectAssign = item.target === sec.id;
                              
                              let btnClass = "border-slate-800 text-slate-400 hover:border-slate-700 bg-slate-900/40";
                              if (isActive) {
                                btnClass = outlineCompleted
                                  ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                                  : "border-orange-500 text-orange-400 bg-orange-950/30 font-semibold";
                              }

                              return (
                                <button
                                  key={sec.id}
                                  onClick={() => handleAssignItem(item.id, sec.id)}
                                  className={`px-2 py-1 rounded text-[11px] border cursor-pointer transition-all duration-150 ${btnClass}`}
                                >
                                  {sec.title}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={handleResetOutline}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-350 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" /> ล้างตารางจับคู่
                  </button>
                </div>
              </div>

              {/* Document Outline Visualizer (Right Side) */}
              <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  DOCUMENT STRUCTURE PREVIEW
                </div>

                <div className="space-y-4 mt-6 flex-1 flex flex-col justify-between">
                  <div className="bg-slate-900/50 rounded-xl border border-slate-900 p-4 grow flex flex-col justify-between min-h-[220px]">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                      โครงสร้างเอกสารความต้องการ (SRS Outline):
                    </span>

                    {/* Standardized Outline Sections */}
                    <div className="space-y-2.5">
                      {sections.map(sec => {
                        const itemInThisSec = outlineItems.find(item => assignments[item.id] === sec.id);
                        const isCorrectAssigned = itemInThisSec && itemInThisSec.target === sec.id;
                        
                        return (
                          <div 
                            key={sec.id} 
                            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 min-h-[46px]
                              ${itemInThisSec 
                                ? isCorrectAssigned 
                                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
                                  : 'bg-rose-950/20 border-rose-500/40 text-rose-400'
                                : 'bg-slate-900/60 border-slate-850 text-slate-500'}`}
                          >
                            <span className="text-xs font-bold font-mono">{sec.title}</span>
                            <span className="text-[12px] font-sans truncate max-w-[280px]">
                              {itemInThisSec ? `"${itemInThisSec.text}"` : "--- ว่างเปล่า (ลากคำสั่งมาวาง) ---"}
                            </span>
                            {itemInThisSec && (
                              <span className="text-xs">
                                {isCorrectAssigned ? "🟢 Correct" : "🔴 Wrong"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Panel */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl min-h-[80px] flex items-center justify-center text-center">
                    {outlineFeedback ? (
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-widest">สถานะบิณฑ์เอกสาร</span>
                        <p className={`text-sm font-bold ${outlineCompleted ? 'text-emerald-400 animate-pulse-glow' : 'text-orange-400'}`}>
                          {outlineFeedback}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-500 text-xs italic">
                        จัดส่งและจัดหมวดหมู่ความต้องการทางซ้ายให้ครบถ้วนเพื่อตรวจสอบความสอดคล้อง
                      </p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Section 4: Gamification Quiz Arena ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              แบบฝึกทักษะความรู้
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินความเข้าใจโครงสร้าง SRS
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองฝึกลองตอบคำถาม 4 ระดับ เพื่อทดสอบความรู้ความสามารถในการจัดทำและวางโครงร่างเอกสาร SRS ให้เป็นระเบียบตามสากล:
          </p>

          <QuizEngine
            title="Gamification Zone: โครงร่างมาตรฐาน SRS"
            description="วิเคราะห์โค้ดสเปคความต้องการและจัดวางให้ตรงตำแหน่งหัวข้อ SRS ที่ถูกต้อง"
            levels={ooadQuizLevels}
            accentColor="from-orange-600/20 to-amber-500/10"
            icon={<Sliders className="w-8 h-8 text-orange-500" />}
          />
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: จัดร่างโครงสร้างมาตรฐานเอกสาร SRS ประจำระบบทะเบียน"
          taskText={`[โจทย์ปฏิบัติประจำวิชาการวิเคราะห์และออกแบบระบบเชิงวัตถุ]

ให้นักเรียนจำลองการร่างสารบัญและจัดหมวดหมู่ความต้องการสำหรับ "ระบบยืมคืนหนังสือห้องสมุดโรงเรียน (School Library System)" ลงในโครงร่างมาตรฐาน 7 หัวข้อของ SRS โดยมีขอบเขตงานดังนี้:

1. เขียนร่างระบุข้อมูลอย่างละ 1 ตัวอย่างความต้องการ ลงใน 3 หัวข้อหลักแรกของโครงสร้างมาตรฐาน:
   - 1. บทนำ (INTRODUCTION) (ระบุวัตถุประสงค์ของระบบห้องสมุด)
   - 2. ภาพรวมระบบ (OVERALL DESCRIPTION) (จำแนกลักษณะผู้ใช้ เช่น บรรณารักษ์ หรือนักเรียน)
   - 3. ข้อกำหนดเชิงฟังก์ชัน (FUNCTIONAL REQUIREMENTS) (เขียนข้อความระบบต้องปฏิบัติ เช่น ค้นหา ยืม คืนหนังสือ)
2. เขียนข้อกำหนดด้านเทคนิคและเกณฑ์ในการตรวจรับชิ้นงานลงใน 3 หัวข้อถัดไป:
   - 4. ข้อกำหนดไม่ใช่เชิงฟังก์ชัน (NON-FUNCTIONAL REQUIREMENTS) (ระบุความเร็วระบบหรือความปลอดภัย)
   - 5. เงื่อนไข/ข้อจำกัด & สมมติฐาน (CONSTRAINTS & ASSUMPTIONS) (ตีกรอบเว็บเบราว์เซอร์หรือสิทธิ์ยูสเซอร์)
   - 6. เกณฑ์การยอมรับ (ACCEPTANCE CRITERIA) (ข้อตกลงในการผ่าน UAT)
3. อธิบายประโยชน์สำคัญที่ทีมสถาปนิกและผู้ทดสอบ (QA) ได้รับจากการมีสารบัญหัวข้อและตัวเลขดัชนีกำกับตามแบบมาตรฐาน SRS นี้

ส่งใบงานปฏิบัติโดยเขียนคำตอบเป็นสัดส่วนแบ่งหัวข้อให้สวยงามเพื่อประเมินเกรดผลลัพธ์ในห้องเรียนระดับต่อไป`}
        />

      </main>
    </div>
  );
}
