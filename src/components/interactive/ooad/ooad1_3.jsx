import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Bell, 
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
  GraduationCap
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
    @keyframes flow-line {
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
    .animate-flow-line { animation: flow-line 1.2s linear infinite; }
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

export default function OOAD1_3() {
  // ─── Layer 1: Ambient Background Blobs (Orange/Indigo/Purple Theme) ───
  const blobs = [
    { color: 'bg-orange-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-30' },
    { color: 'bg-indigo-200', size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-25' },
    { color: 'bg-purple-200', size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-25' },
    { color: 'bg-amber-100',  size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-20' }
  ];

  // ─── State for Student GPA Simulator ───
  const subjectCredits = {
    sysAnalysis: 3,
    dataStructs: 3,
    oopProg: 3,
    softEng: 3,
    networks: 3
  };

  const [grades, setGrades] = useState({
    sysAnalysis: 'A',
    dataStructs: 'B+',
    oopProg: 'B',
    softEng: 'C+',
    networks: 'C'
  });

  const gradePoints = {
    'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1); // -1: idle, 0: Input, 1: Validate, 2: Calculate, 3: DB Write & Probation Check, 4: Complete
  const [gpaResult, setGpaResult] = useState(null);
  const [isProbation, setIsProbation] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(['[SYSTEM READY] ระบบจำลองการประมวลผลผลการเรียน SRS เริ่มต้นทำงานแล้ว']);

  const handleGradeChange = (subject, grade) => {
    setGrades(prev => ({ ...prev, [subject]: grade }));
  };

  const handleCalculateAndCommit = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveStep(0);
    setGpaResult(null);
    setIsProbation(false);

    setTerminalLogs([
      `[STEP 1 - CLIENT INPUT] อ่านข้อมูลระดับคะแนนรายวิชาที่เลือก`,
      `[STEP 1] รายวิชา: SA (${grades.sysAnalysis}), DSA (${grades.dataStructs}), OOP (${grades.oopProg}), SE (${grades.softEng}), Net (${grades.networks})`
    ]);

    // Step 1: Validation Engine
    setTimeout(() => {
      setActiveStep(1);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 2 - VALIDATION] ดำเนินการตรวจสอบความถูกต้องของรหัสผ่านนักศึกษาและสิทธิ์การบันทึกของอาจารย์ผู้สอน`,
        `[STEP 2] ตรวจสอบเงื่อนไข: หน่วยกิตวิชาเรียนมีค่าอยู่ในเกณฑ์ 1-3 หน่วยกิต และประเภทเกรดอยู่ในกลุ่ม [A, B+, B, C+, C, D+, D, F]`,
        `[STEP 2] ผ่านเกณฑ์ตรวจสอบโครงสร้างข้อกำหนด: ข้อมูลเกรดสมบูรณ์ถูกต้องตามมาตรฐานโครงร่างฐานข้อมูล`
      ]);
    }, 1200);

    // Step 2: GPA Calculation Engine
    let computedGpa = 0;
    setTimeout(() => {
      setActiveStep(2);
      
      let totalPoints = 0;
      let totalCredits = 0;
      
      Object.keys(grades).forEach(sub => {
        const credit = subjectCredits[sub];
        const point = gradePoints[grades[sub]];
        totalPoints += point * credit;
        totalCredits += credit;
      });

      computedGpa = Math.round((totalPoints / totalCredits) * 100) / 100;
      const isProb = computedGpa < 2.00;

      setGpaResult(computedGpa);
      setIsProbation(isProb);

      setTerminalLogs(prev => [
        ...prev,
        `[STEP 3 - GPA COMPUTATION] ดำเนินการคัดแยกผลคูณของคะแนนเฉลี่ยน้ำหนักและจำนวนหน่วยกิตสะสม`,
        `[STEP 3] ผลคำนวณ: คะแนนสะสมรวม = ${totalPoints} | หน่วยกิตรวม = ${totalCredits}`,
        `[STEP 3] เกรดเฉลี่ยสะสมที่คำนวณได้: ${computedGpa.toFixed(2)}`
      ]);
    }, 2400);

    // Step 3: ACID DB Write & Probation Check
    setTimeout(() => {
      setActiveStep(3);
      const isProb = computedGpa < 2.00;

      setTerminalLogs(prev => [
        ...prev,
        `[STEP 4 - DATABASE WRITE] เริ่มต้น ACID Transaction เพื่อเก็บบันทึกประวัตินักศึกษาลงใน PostgreSQL`,
        `[STEP 4] SQL: "BEGIN TRANSACTION;"`,
        `[STEP 4] SQL: "UPDATE academic_records SET gpax = ${computedGpa.toFixed(2)} WHERE student_id = 'STD-319102003' FOR UPDATE;"`,
        `[STEP 4] ตรวจสอบสิทธิ์และบันทึกข้อมูลสำเร็จ (Committed Transaction)`,
        isProb 
          ? `[🚨 WARN - PROBATION] เกรดเฉลี่ยต่ำกว่าเกณฑ์ความปลอดภัยวิทยาทัณฑ์ (< 2.00) ดึงข้อมูลสถานะเป็น 'วิทยาทัณฑ์' อัตโนมัติ`
          : `[STEP 4 - AUDIT] สถานะนักศึกษาปกติ (NORMAL) ระดับเกรดเฉลี่ยอยู่ในเกณฑ์ปลอดภัย`
      ]);
    }, 3800);

    // Step 4: Finished
    setTimeout(() => {
      setActiveStep(4);
      setTerminalLogs(prev => [
        ...prev,
        `[COMPLETE] การประมวลผลตามสายพานข้อมูล SRS เสร็จสิ้น ปลดล็อกแถวข้อมูลระบบ และพร้อมจัดพิมพ์ใบรายงานผลการเรียนแบบ PDF`
      ]);
      setIsProcessing(false);
    }, 4800);
  };

  const handleReset = () => {
    setGrades({
      sysAnalysis: 'A',
      dataStructs: 'B+',
      oopProg: 'B',
      softEng: 'C+',
      networks: 'C'
    });
    setGpaResult(null);
    setIsProbation(false);
    setActiveStep(-1);
    setTerminalLogs(['[SYSTEM RESET] รีเซ็ตประวัตินักศึกษาดั้งเดิมเรียบร้อย พร้อมคำนวณผลการเรียนใหม่']);
    setIsProcessing(false);
  };

  // ─── Quiz Engine Configurations (Student Management SRS) ───
  const quizLevels = [
    {
      title: "การแยกหมวดหมู่ข้อกำหนดการคำนวณเกรด",
      desc: "ข้อกำหนดระบุว่า: 'ระบบต้องคำนวณเกรดเฉลี่ยสะสมสะกดจากหน่วยกิตวิชาคูณคะแนนเกรดแล้วหารด้วยหน่วยกิตรวมสะสมทศนิยม 2 ตำแหน่ง'",
      options: [
        { key: "A", text: "Functional Requirement (สิ่งที่ระบบต้องปฏิบัติและดำเนินการคำนวณ)", isCorrect: true },
        { key: "B", text: "Non-Functional Requirement (สถิติด้านโครงสร้างระบบ)", isCorrect: false },
        { key: "C", text: "System Constraint (กรอบหรือข้อจำกัดด้านเทคนิคสถาปัตยกรรม)", isCorrect: false },
        { key: "D", text: "Acceptance Criteria (เกณฑ์ตรวจรับความพึงพอใจ)", isCorrect: false }
      ],
      tip: "ตรรกะการคัดแยก ประมวลผล หรือสูตรทางคณิตศาสตร์ที่โปรแกรมต้องทำเพื่อนำส่งข้อมูล ถือเป็นข้อกำหนดเชิงฟังก์ชัน (Functional Requirement)"
    },
    {
      title: "ข้อกำหนดเชิงความปลอดภัยและการตรวจสอบระบบ (Security & Audit Trail)",
      desc: "ข้อกำหนดระบุว่า: 'ประวัติการแก้ไขคะแนนหรือเกรดของนักศึกษาทุกครั้งต้องถูกบันทึกลงในระบบบันทึกเหตุการณ์ (Audit Trail) โดยมีข้อมูลชื่อผู้แก้ไข วันที่เวลา และสาเหตุการแก้ไข และห้ามแก้ไขหรือลบประวัตินี้'",
      options: [
        { key: "A", text: "Functional Requirement", isCorrect: false },
        { key: "B", text: "Non-Functional Requirement (ข้อกำหนดด้านความมั่นคงและความปลอดภัยข้อมูล)", isCorrect: true },
        { key: "C", text: "System Constraint", isCorrect: false },
        { key: "D", text: "Acceptance Criteria", isCorrect: false }
      ],
      tip: "ความสามารถในการตรวจสอบ (Auditability) และการรักษาความมั่นคงปลอดภัย (Security) ของข้อมูลผลการเรียน จัดอยู่ในหมวดหมู่ Non-Functional Requirement"
    },
    {
      title: "การระบุข้อจำกัดภายนอกระบบ (External Constraints)",
      desc: "ข้อกำหนดระบุว่า: 'ระบบต้องดึงประวัตินักศึกษาใหม่ผ่าน REG API ของระบบทะเบียนกลางของสถาบันที่ทำงานผ่านคีย์แลกเปลี่ยนข้อมูลสากล HTTPS TLS 1.3 เท่านั้น'",
      options: [
        { key: "A", text: "Functional Requirement", isCorrect: false },
        { key: "B", text: "Non-Functional Requirement", isCorrect: false },
        { key: "C", text: "System Constraint (การตีกรอบสถาปัตยกรรมและเทคโนโลยีภายนอก)", isCorrect: true },
        { key: "D", text: "User Acceptance Criteria", isCorrect: false }
      ],
      tip: "การกำหนดโครงสร้างเชื่อมต่อด้วย API เฉพาะ หรือโปรโตคอลความปลอดภัยที่เป็นมาตรฐานตายตัว เป็นการตีกรอบทางวิศวกรรม จัดเป็นข้อจำกัด (Constraint)"
    },
    {
      title: "เกณฑ์การยอมรับและการทดสอบผลลัพธ์ (Acceptance Criteria)",
      desc: "ข้อความใดเขียนเป็นข้อกำหนดเกณฑ์การยอมรับได้ดีที่สุดตามหลักการไม่กำกวมและตรวจสอบได้ (Verifiable)",
      options: [
        { key: "A", text: "การแสดงผลประวัติการคำนวณและใบรับรองเกรดเฉลี่ยต้องทำงานรวดเร็วและใช้กราฟิกที่ดึงดูดสายตานักศึกษา", isCorrect: false },
        { key: "B", text: "เจ้าหน้าที่สามารถสั่งพิมพ์ใบรับรองเกรด (Transcript) ออกเป็นเอกสาร PDF ได้ และคะแนนเฉลี่ยต้องคำนวณได้ตรงตามผลคำนวณด้วยมือในโปรแกรมคำนวณเกรดอ้างอิง", isCorrect: true },
        { key: "C", text: "ระบบต้องประมวลผลดีเยี่ยมเพื่อไม่ให้อาจารย์ผู้บันทึกเกรดพบเจอบั๊กหรือข้อผิดพลาดใดๆ ตลอดสัปดาห์ป้อนคะแนน", isCorrect: false },
        { key: "D", text: "หน้าจอผู้ใช้งานระบบบันทึกผลการเรียนต้องใช้งานได้ง่ายมากสำหรับผู้ใช้ทุกคนโดยไม่มีการฝึกอบรม", isCorrect: false }
      ],
      tip: "เกณฑ์การยอมรับที่ตรวจวัดได้จริง (เช่น พิมพ์ผลลัพธ์ PDF ออกมาตรวจเปรียบเทียบความถูกต้องทางคณิตศาสตร์ได้ตรง) ปราศจากคำเชิงอัตวิสัย"
    }
  ];

  // Python code representation in simulation console
  const pythonCode = `def calculate_and_save_gpa(student_id: str, grades_dict: dict):
    # 1. เริ่มต้นธุรกรรมฐานข้อมูล (ACID Transaction)
    with database.transaction() as db_session:
        # 2. ทำการ Lock แถวข้อมูลนักศึกษาเพื่อป้องกันการแย่งสิทธิ์แก้ไข (Concurrency Control)
        student = db_session.execute(
            "SELECT id, gpax, status FROM students WHERE id = %s FOR UPDATE",
            (student_id,)
        ).fetchone()
        
        if not student:
            raise ValueError(f"ไม่พบข้อมูลนักศึกษา ID: {student_id}")
            
        # 3. ตรรกะประมวลผลคำนวณเกรดเฉลี่ยสะสม (Functional Requirement)
        total_points = 0.0
        total_credits = 0
        
        subject_credits = {
            "sysAnalysis": 3, "dataStructs": 3, "oopProg": 3, "softEng": 3, "networks": 3
        }
        grade_mapping = {
            "A": 4.0, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D+": 1.5, "D": 1.0, "F": 0.0
        }
        
        for subject, grade in grades_dict.items():
            credit = subject_credits[subject]
            point = grade_mapping[grade]
            total_points += (point * credit)
            total_credits += credit
            
        gpa = round(total_points / total_credits, 2)
        
        # 4. ตรวจสอบสถานะวิทยาทัณฑ์ (Probation Check)
        status = "PROBATION" if gpa < 2.00 else "NORMAL"
        
        # 5. บันทึกลงฐานข้อมูลทางกายภาพ (PostgreSQL Write)
        db_session.execute(
            "UPDATE students SET gpax = %s, status = %s WHERE id = %s",
            (gpa, status, student_id)
        )
        
        # 6. บันทึก Audit Log ลงประวัติการแก้ไขเสมอ (Non-Functional Security)
        log_action(db_session, student_id, action="GPA_CALCULATION", status=status)
        
    return gpa, status`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <CustomStyles />

      {/* Layer 1: Ambient Background Blobs */}
      <AmbientBackdrop blobs={blobs} />

      {/* Layer 3: Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* Section 1: Intro & Student SRS Core Concept */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              กรณีศึกษาโครงการจริง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงร่างความต้องการระบบจัดการข้อมูลนักศึกษา (Student Management SRS)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การจัดทำเอกสารความต้องการระบบทะเบียนและจัดการข้อมูลนักศึกษา (Student Management System) 
            ต้องการการตีกรอบพฤติกรรมและการคำนวณที่แม่นยำทางคณิตศาสตร์ 
            โดยการคัดแยกข้อกำหนดในเอกสาร SRS ตามมาตรฐานสากล <span className="mx-1 px-1.5 py-0.5 rounded bg-orange-50 border border-orange-200/50 text-orange-700 font-mono text-[14px]">IEEE 830</span> แบ่งออกเป็น 4 มิติดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ConceptCard
              symbol="FR"
              title="ข้อกำหนดเชิงฟังก์ชัน (Functional)"
              description="ครอบคลุมการเพิ่ม/ลบประวัตินักศึกษา การลงทะเบียนเรียน และการคำนวณเกรดเฉลี่ยรายภาคเรียน"
              accent="orange"
            />
            <ConceptCard
              symbol="NFR"
              title="ประสิทธิภาพและความมั่นคง (Non-Functional)"
              description="ประวัติเกรดเฉลี่ยต้องทำระบบบันทึก Audit Log เสมอ และหน้ารายงานเกรดต้องพร้อมใช้งาน 99.9%"
              accent="indigo"
            />
            <ConceptCard
              symbol="CON"
              title="ข้อจำกัดระบบ (System Constraint)"
              description="การคำนวณ GPA ต้องยึดระบบทศนิยม 2 ตำแหน่งแบบปัดเศษ และดึงข้อมูลผ่าน REG API ผ่าน HTTPS"
              accent="purple"
            />
            <ConceptCard
              symbol="AC"
              title="เกณฑ์การยอมรับ (Acceptance Criteria)"
              description="ค่าเกรดเฉลี่ยที่ระบบคำนวณได้ต้องตรงกับผลลัพธ์คำนวณด้วยมือ 100% ปราศจากทศนิยมคลาดเคลื่อน"
              accent="amber"
            />
          </div>
        </section>

        {/* Section 2: Deep Dive Student SRS Schema */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              โครงร่างเอกสารทางวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตารางวิเคราะห์องค์ประกอบเอกสารความต้องการสำหรับงานทะเบียน
            </h3>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              ตารางต่อไปนี้แสดงตัวอย่างข้อความความต้องการจริงในระบบงานทะเบียนนักศึกษา และการอธิบายความสอดรับกับเกณฑ์ตรวจสอบคุณภาพทางสากล:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/50">
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[25%]">หมวดหมู่ข้อกำหนด</th>
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[35%]">ข้อความสเปกความต้องการ (SRS Statement)</th>
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[40%]">คำอธิบายและแนวทางสากล (IEEE 830)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-orange-50 border border-orange-200/60 text-orange-700 font-mono text-[12px] uppercase">FR-REG-01</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      ระบบต้องอนุญาตให้อาจารย์ผู้สอนบันทึกและส่งรายงานผลการเรียนรายวิชา (เกรด) ผ่านระบบทะเบียน และส่งผลการคำนวณเกรดเฉลี่ยไปยังกล่องจดหมายนักศึกษา
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      กำหนดพฤติกรรมการทำงานเชิงหน้าที่ (Functional Behavior) ที่ตอบสนองความประสงค์หลักของผู้ใช้ในระบบ
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-mono text-[12px] uppercase">NFR-SEC-02</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-medium">
                      สถิติประวัติผลการเรียนต้องไม่ถูกเขียนทับหรือลบทิ้งโดยตรง และการเชื่อมต่อผ่านเว็บเบราว์เซอร์ของอาจารย์ต้องผ่านระบบยืนยันตัวตนแบบ Multi-Factor (MFA)
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      ข้อกำหนดเชิงความปลอดภัย (Security NFR) เพื่อป้องกันการเจาะเข้าแก้ไขเกรดแบบทุจริตและการตรวจสอบสิทธิ์ย้อนหลัง
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-purple-50 border border-purple-200/60 text-purple-700 font-mono text-[12px] uppercase">CON-DB-03</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      การคำนวณเกรดเฉลี่ยต้องใช้เกณฑ์ตัดตัวเลขทศนิยมสองตำแหน่งโดยไม่มีการปัดเศษขึ้นในกรณีเศษไม่ถึง 0.005 ตามระเบียบเกณฑ์งานทะเบียนสถาบันปี 2565
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      ข้อจำกัดเกณฑ์สถาบันการศึกษา (Business Rule Constraint) ที่กำหนดตรรกะทางคณิตศาสตร์ให้ตรงตามข้อบังคับสากล
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200/60 text-amber-700 font-mono text-[12px] uppercase">AC-UAT-04</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      ในการทดสอบตรวจรับงาน หน้าจอตรวจสอบผลการเรียนของนักศึกษาต้องทำงานได้อย่างถูกต้อง และคำนวณผลการเรียนสำเร็จตรงกับสมุดคำนวณ Excel ของทะเบียนทุกประการ
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      เกณฑ์การตรวจวัดเพื่อรับมอบผลงาน (User Acceptance Testing) ที่ระบุเงื่อนไขเปรียบเทียบแบบจับต้องได้ ปราศจากประโยคกว้างๆ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive GPA Calculation & Registry Pipeline */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองระบบการเรียนรู้
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบประมวลผลคะแนนนักศึกษาและทรานแซกชันฐานข้อมูล (Grade Processing Pipeline)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองจำลองการป้อนเกรดของนักศึกษาในรายวิชาต่างๆ เพื่อตรวจสอบสิทธิเงื่อนไขของสูตรคำนวณ 
            และการบันทึกข้อมูลทางกายภาพลงฐานข้อมูล SQL (ACID Transaction) พร้อมระบบคัดกรองนักศึกษาตกเกณฑ์ (Probation Alert) ตามโครงสร้างเอกสาร SRS:
          </p>

          <SimulatorShell
            dark
            title="Grade calculation & DB Transaction Simulator"
            icon={<Sliders className="w-8 h-8 text-orange-400" />}
            glowColors="from-orange-950/20 to-purple-950/15"
            iconColor="text-orange-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Panel - Grade Entry Controls */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[490px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  ACADEMIC CONTROLLER
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. บันทึกผลการเรียนนักศึกษา:</span>
                  
                  <div className="space-y-2.5">
                    {[
                      { id: 'sysAnalysis', name: 'วิเคราะห์และออกแบบระบบ', credit: 3 },
                      { id: 'dataStructs', name: 'โครงสร้างข้อมูลและอัลกอริทึม', credit: 3 },
                      { id: 'oopProg', name: 'การเขียนโปรแกรมเชิงวัตถุ', credit: 3 },
                      { id: 'softEng', name: 'วิศวกรรมซอฟต์แวร์เบื้องต้น', credit: 3 },
                      { id: 'networks', name: 'เครือข่ายคอมพิวเตอร์เบื้องต้น', credit: 3 }
                    ].map(sub => (
                      <div key={sub.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300">
                        <div className="min-w-0 pr-2">
                          <span className="text-[12px] font-bold block truncate">{sub.name}</span>
                          <span className="text-[9.5px] font-mono text-slate-500 block">{sub.credit} หน่วยกิต</span>
                        </div>
                        <select
                          value={grades[sub.id]}
                          disabled={isProcessing}
                          onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-orange-400 font-mono text-xs font-bold rounded-lg px-2 py-1 outline-none cursor-pointer focus:border-orange-500 transition-colors"
                        >
                          {Object.keys(gradePoints).map(g => (
                            <option key={g} value={g}>{g} ({gradePoints[g].toFixed(1)})</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulation Control Buttons */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex gap-2">
                    <button
                      onClick={handleCalculateAndCommit}
                      disabled={isProcessing}
                      className="w-8/12 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg disabled:opacity-40 transition-all duration-200"
                    >
                      <Play className="w-4 h-4" /> ประมวลผลและบันทึก (Commit)
                    </button>
                    <button
                      onClick={handleReset}
                      disabled={isProcessing}
                      className="w-4/12 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-350 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตเกรด
                    </button>
                  </div>

                  {/* Terminal Trace Output */}
                  <div className="bg-black/90 p-3 rounded-xl border border-slate-950 font-mono text-[11px] leading-relaxed text-orange-400 overflow-y-auto max-h-[110px] min-h-[90px]">
                    <div className="text-slate-500 border-b border-slate-900/60 pb-1 mb-1.5 uppercase tracking-wide text-[8.5px] font-bold">Transaction Trace Logs:</div>
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="animate-fadeIn">
                        <span className="text-slate-600">&gt; </span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Visual Pipeline Layout */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[490px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  SRS COMPLIANCE DATA PIPELINE
                </div>

                <div className="space-y-6 mt-6 flex-1 flex flex-col justify-between">
                  
                  {/* SVG Diagram with Absolute Center Connection */}
                  <div className="relative bg-slate-900/40 rounded-xl border border-slate-900/60 p-4 grow flex items-center justify-center min-h-[220px]">
                    <svg viewBox="0 0 560 220" className="w-full h-full" id="grade-pipeline-svg">
                      <defs>
                        <marker id="arrow-gray-ooad" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                        </marker>
                        <marker id="arrow-orange-ooad" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#f97316" />
                        </marker>
                        <marker id="arrow-green-ooad" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                        </marker>
                        <marker id="arrow-red-ooad" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                        </marker>
                      </defs>

                      {/* Connection paths between centers: (70,90) -> (190,90) -> (310,90) -> (430,90) */}
                      {/* Path 1 */}
                      <path 
                        d="M 70,90 L 190,90" 
                        fill="none" 
                        stroke={activeStep >= 0 ? "#f97316" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 ? "6,4" : "none"}
                        className={activeStep === 0 ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 0 ? "url(#arrow-orange-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Path 2 */}
                      <path 
                        d="M 190,90 L 310,90" 
                        fill="none" 
                        stroke={activeStep >= 1 ? "#f97316" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 1 ? "6,4" : "none"}
                        className={activeStep === 1 ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 1 ? "url(#arrow-orange-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Path 3 */}
                      <path 
                        d="M 310,90 L 430,90" 
                        fill="none" 
                        stroke={activeStep >= 2 ? "#10b981" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 2 ? "6,4" : "none"}
                        className={activeStep === 2 ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 2 ? "url(#arrow-green-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Path 4 (Downward flow to Probation status center) */}
                      <path 
                        d="M 430,90 L 430,170" 
                        fill="none" 
                        stroke={activeStep >= 3 && isProbation ? "#ef4444" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 3 && isProbation ? "6,4" : "none"}
                        className={activeStep === 3 && isProbation ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 3 && isProbation ? "url(#arrow-red-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Node 1: Client Input */}
                      <g transform="translate(70, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 0 ? "#f97316" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <FileText className={`w-5 h-5 ${activeStep === 0 ? 'text-orange-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Grade Input</text>
                      </g>

                      {/* Node 2: Validation Engine */}
                      <g transform="translate(190, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 1 ? "#f97316" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Cpu className={`w-5 h-5 ${activeStep === 1 ? 'text-orange-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Schema Check</text>
                      </g>

                      {/* Node 3: GPA Calculator */}
                      <g transform="translate(310, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 2 ? "#10b981" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <GraduationCap className={`w-5 h-5 ${activeStep === 2 ? 'text-emerald-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">GPA Calc</text>
                      </g>

                      {/* Node 4: SQL Database */}
                      <g transform="translate(430, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 3 ? (isProbation ? "#ef4444" : "#10b981") : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Database className={`w-5 h-5 ${activeStep === 3 ? (isProbation ? 'text-rose-400' : 'text-emerald-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">ACID Write</text>
                      </g>

                      {/* Node 5: Probation Alert */}
                      <g transform="translate(430, 170)">
                        <circle r="20" fill={isProbation && activeStep >= 3 ? "#7f1d1d" : "#111827"} stroke={isProbation && activeStep >= 3 ? "#ef4444" : "#374151"} strokeWidth="2" className={isProbation && activeStep >= 3 ? "animate-pulse-red-glow" : ""} />
                        <g transform="translate(-8, -8)">
                          <Bell className={`w-4 h-4 ${isProbation && activeStep >= 3 ? "text-rose-400" : "text-slate-650"}`} />
                        </g>
                        <text x="28" y="4" textAnchor="start" className="fill-slate-500 font-sans text-[8.5px] font-bold uppercase">วิทยาทัณฑ์ (Probation Alert)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Real-time Result Audit Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">ข้อมูลตรวจสอบความมั่นคงผลการเรียน (Real-time Grade Audit):</span>
                      {gpaResult !== null && (
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border
                          ${isProbation 
                            ? 'bg-rose-950/80 text-rose-400 border-rose-900' 
                            : 'bg-emerald-950/80 text-emerald-400 border-emerald-900'
                          }`}
                        >
                          {isProbation ? '⚠️ ACADEMIC PROBATION' : '✅ ACADEMIC SECURE'}
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="text-slate-400">รหัสนักศึกษา: <strong className="text-slate-200">STD-319102003</strong></span>
                        <span className="text-slate-400 text-right">สถานะ: <strong className="text-slate-200">ปกติ (Spring)</strong></span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900/60 text-[12px] font-mono text-center">
                        <div className="bg-slate-900/80 p-2 rounded border border-slate-850">
                          <span className="text-[9px] text-slate-500 block">เกรดเฉลี่ยสะสม</span>
                          <span className="text-slate-200 font-bold text-sm">
                            {gpaResult !== null ? gpaResult.toFixed(2) : '---'}
                          </span>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded border border-slate-850">
                          <span className="text-[9px] text-slate-500 block">หน่วยกิตสะสม</span>
                          <span className="text-slate-200 font-bold text-sm">15.0</span>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded border border-slate-850">
                          <span className="text-[9px] text-slate-500 block">สถานะในระบบ</span>
                          <span className={`font-bold text-sm ${isProbation ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {activeStep >= 3 ? (isProbation ? 'PROB' : 'NORMAL') : 'PENDING'}
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

        {/* Section 4: Python Console Code Audit */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              โครงสร้างทางวิศวกรรมคอมพิวเตอร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตรรกะระดับสถาปัตยกรรม (Python Backend Implementation)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            เพื่อรองรับคุณสมบัติ <strong className="text-orange-600 font-semibold font-sans">ACID Transaction (Atomicity, Consistency, Isolation, Durability)</strong> 
            ตามที่ระบุในข้อกำหนดสากลของ SRS ระบบหลังบ้านจริงต้องมีกลไกป้องกันการแย่งสิทธิ์บันทึกข้อมูลเกรดผ่านฐานข้อมูลและล็อกแถวข้อมูล 
            ศึกษาและทบทวนตรรกะในฟังก์ชันภาษา Python ด้านล่าง:
          </p>

          <ConsoleScreen
            code={pythonCode}
            language="python"
            theme="monokai"
          />
        </section>

        {/* Section 5: Gamified Quiz Arena */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              แบบฝึกทักษะความรู้
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินความสามารถการวิเคราะห์ SRS สำหรับงานทะเบียน
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ฝึกฝนทักษะการแยกแยะหมวดหมู่ความต้องการสำหรับข้อกำหนดระบบทะเบียนและประมวลผลเกรด โดยตอบคำถาม 4 ระดับความยากดังนี้:
          </p>

          <QuizEngine
            title="Student Management SRS Quiz Arena"
            description="จำแนกและระบุลักษณะข้อกำหนดทางวิชาการสำหรับการบันทึกผลการเรียนนักศึกษา"
            levels={quizLevels}
            accentColor="from-orange-600/20 to-purple-650/10"
            icon={<GraduationCap className="w-8 h-8 text-orange-500" />}
          />
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: วิเคราะห์ข้อกำหนดเอกสาร SRS สำหรับระบบทะเบียนและจัดการเกรดนักศึกษา"
          taskText={`[โจทย์ปฏิบัติประจำวิชาการวิเคราะห์และออกแบบระบบเชิงวัตถุ]

ให้นักเรียนศึกษาบทเรียนและเขียนตัวอย่างข้อความข้อกำหนดความต้องการ (Requirements Statements) สำหรับ "ระบบลงทะเบียนนักศึกษาใหม่ (Student Registration System)" โดยจำแนกออกเป็น 4 หมวดหมู่ตามรูปแบบเอกสาร SRS ที่ถูกต้อง:

1. เขียนร่างระบุข้อกำหนดให้มีความครบถ้วน โดยยกตัวอย่างจริงประเภทละ 1 ข้อความ:
   - 1. ข้อกำหนดเชิงฟังก์ชัน (Functional Requirement) เช่น ขั้นตอนบันทึกประวัติ หรือการเลือกแผนการเรียน
   - 2. ข้อกำหนดไม่ใช่เชิงฟังก์ชัน (Non-Functional Requirement) เช่น ความเร็ว ระบบรักษาความปลอดภัย หรือการล็อกทรานแซกชัน
   - 3. เงื่อนไข/ข้อจำกัด (Constraint) เช่น การใช้โปรโตคอล API หรือฐานข้อมูลที่ระบบบังคับใช้
   - 4. เกณฑ์การยอมรับ (Acceptance Criteria) เช่น เงื่อนไขที่ใช้ชี้วัดในการทำ UAT ร่วมกับเจ้าหน้าที่ทะเบียน
2. อธิบายเหตุผลทางวิชาการว่า ทำไมการทำ "Row-level locking" หรือระบบควบคุมการทำงานพร้อมกัน (Concurrency Control) จึงจัดเป็นหัวข้อคุณภาพ (NFR) ที่จำเป็นอย่างยิ่งสำหรับระบบบันทึกเกรดและลงทะเบียนวิชาเรียน

ส่งใบงานปฏิบัติโดยแบ่งหัวข้อเขียนอธิบายทีละขั้นตอนให้เป็นระเบียบชัดเจนเพื่อประเมินความเข้าใจท้ายหน่วยเรียนนี้`}
        />

      </main>
    </div>
  );
}
