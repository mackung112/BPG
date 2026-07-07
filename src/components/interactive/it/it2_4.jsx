/**
 * it2_4.jsx — หน่วยที่ 2.4 การตรวจสอบและทดสอบระบบเบื้องต้น
 * ====================================================================
 * Vertical Stacking Page Architecture: 5 subtopics + Diagnostic Widget + BIOS/UEFI Simulator + Quiz
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Monitor, Cpu, MemoryStick, HardDrive, Plug, Cable, Wind, Layers,
  Box, Wrench, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw,
  Zap, CircuitBoard, Fan, Power, ChevronRight, ChevronDown,
  Shield, Thermometer, Settings, Package, Sparkles, Eye, Play, Check, ShieldAlert
} from 'lucide-react';
import { AmbientBackdrop, SimulatorShell, QuizEngine } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

/* ═══════════════════════════════════════════════════════════════════
   AMBIENT BACKDROP THEME — IT Unit 2 (Rose/Amber/Purple Testing)
   ═══════════════════════════════════════════════════════════════════ */
const IT2_4_BLOBS = [
  { color: 'bg-rose-200',   size: 'w-96 h-96', position: '-top-20 -left-20',       opacity: 'opacity-35' },
  { color: 'bg-amber-200',  size: 'w-80 h-80', position: 'top-1/3 -right-20',      opacity: 'opacity-30' },
  { color: 'bg-purple-200', size: 'w-72 h-72', position: '-bottom-20 left-1/4',     opacity: 'opacity-25' },
  { color: 'bg-blue-200',   size: 'w-60 h-60', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 2.4
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: หน้าที่ระดับต่ำของกระบวนการ POST',
    desc: 'กระบวนการ Power-On Self-Test (POST) ทำหน้าที่และทำงานในระดับชั้นใดเป็นลำดับแรกเมื่อเปิดเครื่อง?',
    options: [
      { key: 'A', text: 'ตรวจหาไวรัสและมัลแวร์ในไดรฟ์บูตหลักของระบบปฏิบัติการ', isCorrect: false },
      { key: 'B', text: 'ตรวจหาและควบคุมแรงดันไฟจากพาวเวอร์ซัพพลายร่วมกับการระบายความร้อนของเคส', isCorrect: false },
      { key: 'C', text: 'ทดสอบและเตรียมความพร้อมของอุปกรณ์ฮาร์ดแวร์พื้นฐานระดับต่ำ (Low-Level Hardware) ก่อนส่งต่อให้ระบบปฏิบัติการ', isCorrect: true },
      { key: 'D', text: 'ทำความสะอาดไฟล์ขยะและเพิ่มความเร็วในการอ่านข้อมูลของแรมคู่', isCorrect: false }
    ],
    tip: 'POST ทำหน้าที่ตรวจสอบความพร้อมของอุปกรณ์หลัก CPU, RAM, GPU ก่อนส่งหน้าที่ให้บูตโหลดเดอร์ของ OS'
  },
  {
    title: 'โจทย์ที่ 2: สัญญาณแจ้งเตือนข้อบกพร่อง POST',
    desc: 'เมื่อเกิดข้อผิดพลาดขึ้นในระหว่างกระบวนการ POST แต่หน้าจอภาพยังไม่สามารถแสดงผลรูปภาพได้ เมนบอร์ดจะมีตรรกะเตือนข้อบกพร่องให้ผู้ประกอบรับรู้ได้อย่างไร?',
    options: [
      { key: 'A', text: 'ส่งสัญญาณคลื่นความถี่วิทยุไปยังเครือข่ายบลูทูธของโทรศัพท์', isCorrect: false },
      { key: 'B', text: 'แจ้งเตือนผ่านเสียงสัญญาณเตือน (Beep Code) จากลำโพงบัสเซอร์ และไฟตรวจแก้สถานะ (Debug LED)', isCorrect: true },
      { key: 'C', text: 'การตัดกระแสไฟหลัก 220V และตัดการเชื่อมต่อพาวเวอร์ซัพพลายทันที', isCorrect: false },
      { key: 'D', text: 'สว่างไฟพัดลมเคสเป็นสีกะพริบเพื่อบอกอาการชำรุดเงียบ', isCorrect: false }
    ],
    tip: 'ในขณะที่การ์ดจอยังไม่พร้อมแสดงผลภาพ BIOS จะส่งรหัสสัญญาณเสียงเตือน (Beep Code) ผ่านลำโพงขนาดเล็ก (Buzzer) บนบอร์ด และเปิดไฟ Debug LED'
  },
  {
    title: 'โจทย์ที่ 3: วินิจฉัยความผิดพลาดของ Debug LED',
    desc: 'หากไฟวิเคราะห์สถานะ Debug LED ค้างอยู่ที่สีขาว (White) หรือสัญลักษณ์ VGA บนแผงเมนบอร์ด และมีเสียงบี๊บยาว 1 ครั้ง สั้น 2 ครั้ง สาเหตุที่น่าจะเป็นไปได้มากที่สุดในทางปฏิบัติคือข้อใด?',
    options: [
      { key: 'A', text: 'แรม DDR5 เสียบสล็อต A1-A2 ทำให้ไม่ทำงานในระบบ Dual-Channel', isCorrect: false },
      { key: 'B', text: 'สายพัดลมระบายความร้อน CPU_FAN หลวมหรือยังไม่ได้เชื่อมต่อ', isCorrect: false },
      { key: 'C', text: 'การ์ดจอหลวม, ยังไม่ได้เสียบสายไฟเลี้ยง PCIe, หรือหน้าสัมผัสสกปรก', isCorrect: true },
      { key: 'D', text: 'ตัวจัดเก็บข้อมูล M.2 SSD ไม่มีระบบปฏิบัติการอยู่ในเครื่อง', isCorrect: false }
    ],
    tip: 'รหัส Debug LED สีขาว (VGA) หรือเสียงสัญญาณยาว 1 สั้น 2 หมายความว่า BIOS ไม่พบหรือทำงานร่วมกับการ์ดจอ (VGA/GPU) ไม่ได้'
  },
  {
    title: 'โจทย์ที่ 4: การเปิดใช้งานสเปกความเร็วแรมระดับสูง',
    desc: 'เป้าหมายหลักของการปรับใช้ระบบ XMP (Extreme Memory Profile) หรือ EXPO (Extended Profiles for Overclocking) ในหน้าจอ BIOS/UEFI คืออะไร?',
    options: [
      { key: 'A', text: 'การเพิ่มแรงดันไฟฟ้าของพาวเวอร์ซัพพลายเพื่อช่วยการประมวลผลกราฟิก', isCorrect: false },
      { key: 'B', text: 'การโหลดค่าโปรไฟล์ความเร็วแรมและระดับไฟที่ผู้ผลิตทดสอบมาจากโรงงาน เพื่อใช้งานได้ตรงขีดความสามารถเต็มประสิทธิภาพ', isCorrect: true },
      { key: 'C', text: 'การแบ่งพาร์ติชันดิสก์เป็น MBR/GPT เพื่อติดตั้งระบบปฏิบัติการตัวใหม่', isCorrect: false },
      { key: 'D', text: 'การลดรอบหมุนพัดลมระบายความร้อนลงเพื่อความเงียบของเครื่องคอมพิวเตอร์', isCorrect: false }
    ],
    tip: 'การเปิดใช้ XMP หรือ EXPO ใน BIOS จะเป็นการสั่งให้เมนบอร์ดเรียกใช้สเปกความเร็วแรม แรงดัน และไทมิ่งระดับสูงที่เสถียร'
  },
  {
    title: 'โจทย์ที่ 5: การประเมินค่าแรงดันไฟใน BIOS',
    desc: 'ในหน้าตรวจสอบสถานะแรงดันไฟของ BIOS การจ่ายไฟเลี้ยงช่อง +12V อยู่ที่ค่าใดที่ถือว่าอยู่ในเกณฑ์มาตรฐานความปลอดภัย (ค่าคลาดเคลื่อนไม่เกิน +-5%)?',
    options: [
      { key: 'A', text: '9.50 โวลต์', isCorrect: false },
      { key: 'B', text: '11.95 โวลต์', isCorrect: true },
      { key: 'C', text: '14.10 โวลต์', isCorrect: false },
      { key: 'D', text: '5.05 โวลต์', isCorrect: false }
    ],
    tip: 'มาตรฐาน ATX กำหนดให้ค่าแรงดันไฟคลาดเคลื่อนได้ไม่เกิน ±5% ดังนั้น รางไฟ +12V จะต้องอยู่ในช่วง 11.4V ถึง 12.6V'
  }
];

/* ═══════════════════════════════════════════════════════════════════
   SUBCOMPONENTS: INTERACTIVE DIAGNOSTIC DEMOS & LABS
   ═══════════════════════════════════════════════════════════════════ */

// 1. POST Sequence Widget
function PostSequenceWidget() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const steps = [
    { label: 'Power Initialization', desc: 'PSU ส่งไฟเลี้ยงระดับคงที่ และส่งสัญญาณ Power Good (PW_OK) ให้เมนบอร์ด' },
    { label: 'CPU Verification', desc: 'BIOS เริ่มต้นตรวจสอบสถาปัตยกรรม หน่วยความจำแคช และสัญญาณนาฬิกาของ CPU' },
    { label: 'DRAM Verification', desc: 'ทดสอบการรับส่งข้อมูล ความจุ ไทมิ่ง และช่องสัญญาณ Dual-Channel ของ RAM' },
    { label: 'VGA/GPU Verification', desc: 'ตรวจสอบการเชื่อมต่อและเตรียมพร้อมระบบการส่งออกสัญญาณภาพของการ์ดจอ' },
    { label: 'Boot Device Check', desc: 'สแกนพอร์ต M.2 NVMe และพอร์ต SATA ค้นหาบูตโหลดเดอร์ของระบบปฏิบัติการ' }
  ];

  const handleStart = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setLogs(['[SYS] กำลังเปิดเครื่องคอมพิวเตอร์...', '[SYS] แรงดันไฟฟ้าสม่ำเสมอ -> สัญญาณ Power Good ได้รับแล้ว']);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        
        const logMap = [
          '[POST] CPU: ค้นพบ Intel Core i5-13400F 10 Cores @ 2.50GHz (สถานะ: ปกติ)',
          '[POST] DRAM: ตรวจพบ RAM ขนาด 16GB ความเร็ว DDR5-4800 ในสล็อต A2/B2 (สถานะ: ปกติ)',
          '[POST] VGA: ตรวจพบการ์ดจอ PCIe Gen4 x16 สัญญาณเชื่อมต่อถูกต้อง (สถานะ: ปกติ)',
          '[POST] BOOT: ค้นพบ Samsung SSD 980 PRO 1TB พร้อมตารางพาร์ติชัน GPT',
          '[POST] ✅ การตรวจสอบความสมบูรณ์ฮาร์ดแวร์เสร็จสิ้น (POST PASSED) — เริ่มต้นเรียกใช้งานระบบปฏิบัติการ'
        ];

        setLogs(prev => [...prev, logMap[currentStep]]);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, currentStep]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 max-w-4xl mx-auto my-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <h4 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <Play className="w-4 h-4 text-emerald-400" /> เครื่องจำลองกระบวนการ Power-On Self-Test (POST)
        </h4>
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            isRunning 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 active:scale-98'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" /> เริ่มทดสอบ POST
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {steps.map((s, idx) => {
          const isActive = currentStep === idx;
          const isDone = currentStep > idx;
          return (
            <div 
              key={idx} 
              className={`p-3.5 rounded-2xl border text-center transition-all duration-300 ${
                isActive 
                  ? 'border-indigo-500 bg-indigo-950/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                  : isDone
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-300'
                  : 'border-slate-800 bg-slate-950/60 text-slate-500'
              }`}
            >
              <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-[13px] mb-2 transition-all ${
                isActive 
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : isDone
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <p className="text-[13px] font-bold mb-1">{s.label}</p>
              <p className="text-[11px] leading-tight opacity-75">{s.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[13px]">
        <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-2 mb-2 text-[11px] uppercase tracking-wider">
          <span>Virtual Console Output</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" /> Live Status</span>
        </div>
        <div className="space-y-1.5 min-h-[140px] max-h-[220px] overflow-y-auto font-sans leading-relaxed text-slate-300">
          {logs.map((log, i) => (
            <div key={i} className={`flex items-start gap-2 ${log.startsWith('[ERR]') ? 'text-rose-400' : log.startsWith('[OK]') || log.includes('✅') ? 'text-emerald-400' : 'text-slate-300'}`}>
              <span className="font-mono text-slate-500 shrink-0 select-none">&gt;&gt;</span>
              <p className="font-mono text-[13px] leading-tight">{log}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Motherboard Fault Diagnostic Widget
function MotherboardDiagnostic() {
  const [selectedFault, setSelectedFault] = useState('normal');

  const faults = {
    normal: {
      title: 'สถานะเครื่องประกอบปกติ (Normal Post)',
      beep: 'เสียงบี๊บสั้น 1 ครั้ง (1 Short Beep)',
      beepDesc: 'ระบบผ่านการตรวจสอบฮาร์ดแวร์พื้นฐานเรียบร้อย (System OK)',
      led: 'green',
      ledLabel: 'BOOT LED (สีเขียว)',
      desc: 'ชิ้นส่วน CPU, RAM, GPU และสายสัญญาณต่างๆ เสียบเชื่อมโยงลงล็อคและได้รับกระแสไฟที่สม่ำเสมอ พัดลมทำงานปกติ และระบบพร้อมบูตระบบปฏิบัติการหลัก',
    },
    cpu: {
      title: 'ข้อผิดพลาดระบบ CPU / ไฟเลี้ยง VRM',
      beep: 'เสียงบี๊บสั้น 5 ครั้ง (5 Short Beeps)',
      beepDesc: 'ข้อบกพร่องที่ตัวประมวลผลกลาง หรือลืมเสียบสาย 8-pin EPS',
      led: 'red',
      ledLabel: 'CPU LED (สีแดง)',
      desc: 'เมนบอร์ดไม่สามารถตรวจพบ CPU หรือตรวจพบว่าไม่มีสัญญาณนาฬิกาตอบสนองจากซ็อกเก็ต สาเหตุส่วนใหญ่เกิดจากการลืมต่อสายไฟ 8-pin EPS ที่มุมบอร์ด หรือขาซ็อกเก็ตกดเชื่อมต่อไม่สมบูรณ์',
    },
    dram: {
      title: 'ข้อผิดพลาดระบบหน่วยความจำ RAM',
      beep: 'เสียงบี๊บยาวต่อเนื่องยาวไม่หยุด (Continuous Long Beeps)',
      beepDesc: 'ข้อบกพร่องที่แรม เช่น เสียบแรมหลวม หรือแรมสกปรก',
      led: 'yellow',
      ledLabel: 'DRAM LED (สีเหลือง)',
      desc: 'เกิดความผิดพลาดในการทดสอบรับส่งข้อมูลสัญญาณของแรม มักเกิดจากสลักแรมล็อกไม่แน่น หรือแผ่นทองเหลืองสกปรก ให้ถอดแรมใช้ยางลบทำความสะอาดและเสียบลงสล็อตที่ถูกต้อง (A2/B2)',
    },
    vga: {
      title: 'ข้อผิดพลาดระบบการ์ดแสดงผล (VGA/GPU)',
      beep: 'เสียงบี๊บยาว 1 ครั้ง สั้น 2 ครั้ง (1 Long 2 Short Beeps)',
      beepDesc: 'ข้อบกพร่องที่การ์ดจอ หรือลืมเสียบสายไฟ PCIe Power',
      led: 'white',
      ledLabel: 'VGA LED (สีขาว)',
      desc: 'ระบบตรวจหาการ์ดจอภายนอกในสล็อต PCIe x16 ไม่พบ หรือไม่ได้รับการ์ดเชื่อมต่อกระแสไฟเพียงพอเนื่องจากไม่ได้ต่อสาย 8-pin/16-pin จาก PSU ทำให้หน้าจอไม่มีสัญญาณภาพออก',
    },
    boot: {
      title: 'ข้อผิดพลาดระบบอุปกรณ์จัดเก็บข้อมูลบูต',
      beep: 'เสียงบี๊บสั้น 1 ครั้ง และไม่สลับหน้าจอ (หรือไม่มีเสียง)',
      beepDesc: 'ไม่พบระบบปฏิบัติการหรือตารางพาร์ติชันสำหรับบูต',
      led: 'green-yellow',
      ledLabel: 'BOOT LED (สีเขียวเหลือง)',
      desc: 'เมนบอร์ดผ่านการ POST ฮาร์ดแวร์หลักแล้ว แต่ระบบสแกนไม่พบบูตโหลดเดอร์ใน M.2 NVMe SSD หรือ SATA HDD/USB ตัวบอร์ดจะหยุดนิ่งหรือวนกลับมาหน้าจอแจ้งให้ใส่สื่อบูต',
    }
  };

  const current = faults[selectedFault];

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto my-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left: Motherboard SVG Model */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[300px]">
          <span className="text-[11px] font-mono text-slate-500 absolute top-3 left-3">ATX MOTHERBOARD DIAGNOSTIC BOARD</span>
          
          <svg viewBox="0 0 240 240" className="w-56 h-56 transition-all duration-300">
            {/* Board Base */}
            <rect x="10" y="10" width="220" height="220" rx="8" fill="#064E3B" stroke="#047857" strokeWidth="2" />
            
            {/* CPU Socket */}
            <rect x="40" y="30" width="55" height="55" rx="4" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <text x="67.5" y="62" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">LGA 1700</text>
            
            {/* Memory Slots */}
            {[[115, 30], [125, 30], [135, 30], [145, 30]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="5" height="60" rx="1" fill={i % 2 === 0 ? "#1E293B" : "#475569"} stroke="#0f172a" strokeWidth="0.5" />
            ))}
            <text x="130" y="25" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">DDR5 SLOTS</text>

            {/* PCIe x16 Slot */}
            <rect x="30" y="110" width="130" height="8" rx="1" fill="#334155" stroke="#475569" strokeWidth="1" />
            <text x="95" y="105" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">PCIe Gen5 x16</text>

            {/* M.2 NVMe Slot */}
            <rect x="40" y="93" width="40" height="6" rx="1" fill="#1e293b" />
            <circle cx="76" cy="96" r="1.5" fill="#94a3b8" />

            {/* CMOS Battery */}
            <circle cx="190" cy="180" r="14" fill="#94A3B8" stroke="#cbd5e1" strokeWidth="1" />
            <text x="190" y="183" textAnchor="middle" fill="#1e293b" fontSize="8" fontWeight="bold">CR2032</text>

            {/* Power Connector 24-Pin */}
            <rect x="210" y="50" width="12" height="45" rx="1" fill="#1e293b" />

            {/* Debug LEDs Panel */}
            <rect x="200" y="15" width="22" height="28" rx="2" fill="#111827" stroke="#1e293b" strokeWidth="1" />
            <text x="211" y="22" textAnchor="middle" fill="#6b7280" fontSize="5" fontFamily="monospace">DEBUG</text>
            
            {/* LED 1: CPU */}
            <circle cx="205" cy="28" r="2.5" fill={current.led === 'red' ? '#EF4444' : '#1F2937'} className={current.led === 'red' ? 'animate-pulse' : ''} />
            <text x="215" y="29.5" fill="#ef4444" fontSize="4.5" fontFamily="monospace" fontWeight="bold">CPU</text>

            {/* LED 2: DRAM */}
            <circle cx="205" cy="34" r="2.5" fill={current.led === 'yellow' ? '#F59E0B' : '#1F2937'} className={current.led === 'yellow' ? 'animate-pulse' : ''} />
            <text x="215" y="35.5" fill="#f59e0b" fontSize="4.5" fontFamily="monospace" fontWeight="bold">DRAM</text>

            {/* LED 3: VGA */}
            <circle cx="205" cy="40" r="2.5" fill={current.led === 'white' ? '#FFFFFF' : '#1F2937'} className={current.led === 'white' ? 'animate-pulse' : ''} />
            <text x="215" y="41.5" fill="#ffffff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">VGA</text>

            {/* LED 4: BOOT */}
            <circle cx="205" cy="18" r="2.5" fill={current.led === 'green' || current.led === 'green-yellow' ? '#10B981' : '#1F2937'} className={current.led === 'green' || current.led === 'green-yellow' ? 'animate-pulse' : ''} />
            <text x="215" y="19.5" fill="#10b981" fontSize="4.5" fontFamily="monospace" fontWeight="bold">BOOT</text>
          </svg>

          {/* Sound wave visual pulses */}
          <div className="flex items-center gap-1.5 mt-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-full">
            <span className="text-[11px] font-mono text-slate-500">BEEP PATTERN:</span>
            <div className="flex items-center gap-1 h-6 grow overflow-hidden">
              {selectedFault === 'normal' && (
                <div className="w-3.5 h-3.5 rounded bg-emerald-500 animate-[ping_1.5s_infinite] shrink-0" />
              )}
              {selectedFault === 'cpu' && (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-2 h-4 rounded-sm bg-rose-500 animate-[bounce_0.6s_infinite]" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              )}
              {selectedFault === 'dram' && (
                <div className="w-full h-3 rounded-sm bg-amber-500 animate-pulse" />
              )}
              {selectedFault === 'vga' && (
                <div className="flex gap-1 items-center">
                  <div className="w-7 h-4 rounded-sm bg-indigo-500 animate-[pulse_1s_infinite]" />
                  <div className="w-2.5 h-3 rounded-sm bg-indigo-400 animate-[pulse_0.5s_infinite]" />
                  <div className="w-2.5 h-3 rounded-sm bg-indigo-400 animate-[pulse_0.5s_infinite]" style={{ animationDelay: '0.2s' }} />
                </div>
              )}
              {selectedFault === 'boot' && (
                <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              )}
            </div>
          </div>
        </div>

        {/* Right: Controller and Description */}
        <div className="space-y-4">
          <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider block">เลือกชนิดจำลองความผิดพลาดในการประกอบ</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(faults).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedFault(key)}
                className={`px-4 py-2.5 rounded-2xl border text-sm font-semibold cursor-pointer transition-all duration-200 active:scale-98 ${
                  selectedFault === key
                    ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 font-bold shadow-sm'
                    : 'border-slate-100 bg-white/50 text-slate-600 hover:border-slate-200'
                }`}
              >
                {key === 'normal' ? '🟢 ไม่มีบั๊ก' : key === 'cpu' ? '🔴 CPU Error' : key === 'dram' ? '🟡 DRAM Error' : key === 'vga' ? '⚪ VGA Error' : '🟢 BOOT Error'}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h5 className="text-[18px] font-bold text-slate-800 leading-tight">{current.title}</h5>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">SIGNAL LIGHTS (LED)</span>
                <p className="font-bold text-slate-700">{current.ledLabel}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">BEEP CODE SOUND</span>
                <p className="font-bold text-slate-700 leading-tight">{current.beep}</p>
                <p className="text-[11px] text-slate-400">{current.beepDesc}</p>
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Premium BIOS/UEFI Simulator
function BiosSimulator() {
  const [bootStage, setBootStage] = useState('os'); // 'bios' | 'post' | 'os' | 'desktop'
  const [fanProfile, setFanProfile] = useState('Standard'); // 'Silent' | 'Standard' | 'Turbo'
  const [temp, setTemp] = useState(42);
  const [rpm, setRpm] = useState(2000);
  const [xmpEnabled, setXmpEnabled] = useState(false);
  const [bootOrder, setBootOrder] = useState(['NVMe SSD', 'USB Drive', 'SATA HDD']);
  
  // POST status states
  const [postProgress, setPostProgress] = useState(0);
  const [postMessage, setPostMessage] = useState('');

  // Handle fan profile change
  const handleFanChange = (profile) => {
    setFanProfile(profile);
    if (profile === 'Silent') {
      setRpm(1200);
      setTemp(55);
    } else if (profile === 'Standard') {
      setRpm(2000);
      setTemp(42);
    } else {
      setRpm(3200);
      setTemp(34);
    }
  };

  // Move item up in boot order
  const moveBootUp = (idx) => {
    if (idx === 0) return;
    const newOrder = [...bootOrder];
    const tempItem = newOrder[idx - 1];
    newOrder[idx - 1] = newOrder[idx];
    newOrder[idx] = tempItem;
    setBootOrder(newOrder);
  };

  // Move item down in boot order
  const moveBootDown = (idx) => {
    if (idx === bootOrder.length - 1) return;
    const newOrder = [...bootOrder];
    const tempItem = newOrder[idx + 1];
    newOrder[idx + 1] = newOrder[idx];
    newOrder[idx] = tempItem;
    setBootOrder(newOrder);
  };

  // Run exit sequence
  const handleSaveAndExit = () => {
    setBootStage('post');
    setPostProgress(0);
    setPostMessage('กำลังเริ่มต้นการตรวจทานระบบระดับต่ำ...');
  };

  // POST Simulator runner
  useEffect(() => {
    if (bootStage !== 'post') return;

    const timer = setInterval(() => {
      setPostProgress(prev => {
        const next = prev + 25;
        if (next === 25) {
          setPostMessage('POST: CPU OK — ค้นพบแกนตัวช่วยประมวลผล 10 คอร์');
        } else if (next === 50) {
          setPostMessage(`POST: DRAM OK — แรมทำงานที่ความเร็ว ${xmpEnabled ? '6000' : '4800'} MT/s`);
        } else if (next === 75) {
          setPostMessage('POST: VGA OK — ค้นพบสัญญาณเชื่อมโยงภาพการ์ดจอหลัก');
        } else if (next === 100) {
          setPostMessage(`POST: BOOT DEVICE -> กำลังเรียกบูตจาก "${bootOrder[0]}"`);
          clearInterval(timer);
          setTimeout(() => {
            if (bootOrder[0] === 'NVMe SSD') {
              setBootStage('desktop');
            } else {
              setBootStage('os'); // Reverts to bios/error screen since other drives lack OS
            }
          }, 1500);
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [bootStage, bootOrder, xmpEnabled]);

  return (
    <SimulatorShell
      icon={<Settings className="w-6 h-6" />}
      title="เครื่องจำลองการปฏิบัติตามมาตรฐานหน้าจอ BIOS/UEFI (ROG EZ-Mode UEFI Utility)"
      dark
    >
      {/* ─── STAGE: BOOT ERROR ─── */}
      {bootStage === 'os' && (
        <div className="bg-black text-slate-200 font-mono p-8 min-h-[460px] rounded-2xl flex flex-col justify-between border border-slate-900 leading-relaxed select-none">
          <div className="space-y-4">
            <p className="text-red-500 font-black text-lg">⚠️ Reboot and Select Proper Boot Device</p>
            <p className="text-slate-400">หรือลืมติดตั้งระบบปฏิบัติการลงในไดรฟ์ที่เลือกบูตลำดับแรก!</p>
            <div className="bg-slate-950/80 p-4 border border-slate-900 rounded-xl space-y-1 mt-6 text-[13px] text-slate-300">
              <p className="font-bold text-white mb-2">ข้อมูลจำลองลำดับความพร้อมของพาร์ติชันในเครื่อง:</p>
              <p>• [NVMe SSD] ━━ สัญญาณตาราง GPT มีไฟล์ระบบ Windows 11 บูตได้ 100%</p>
              <p>• [USB Drive] ━━ บูตเปล่า (มีแต่อรรถประโยชน์ซ่อมบำรุง ไม่มีตัวติดตั้ง OS)</p>
              <p>• [SATA HDD]  ━━ ฮาร์ดดิสก์เปล่าชั่วคราว ไม่มีระบบ OS</p>
            </div>
            <p className="text-yellow-500 text-[13px] animate-pulse">💡 คำแนะนำ: กดเข้าหน้า BIOS เพื่อลากปรับ "NVMe SSD" ให้ขึ้นไปอยู่ลำดับที่ 1 หรือเสียบไดรฟ์บูต OS</p>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-900 mt-6">
            <button
              onClick={() => setBootStage('bios')}
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" /> กดปุ่ม Del / F2 เพื่อเปิดตั้งค่า BIOS/UEFI
            </button>
          </div>
        </div>
      )}

      {/* ─── STAGE: POST SCREEN RUNNER ─── */}
      {bootStage === 'post' && (
        <div className="bg-black text-slate-300 font-mono p-8 min-h-[460px] rounded-2xl flex flex-col justify-between border border-slate-900 select-none">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
              <div>
                <h4 className="text-white font-bold text-base">ROG VIRTUAL BIOS POST LOG</h4>
                <p className="text-[11px] text-slate-500">American Megatrends UEFI Core revision 2026.05</p>
              </div>
              <span className="text-indigo-400 font-bold text-sm">{postProgress}%</span>
            </div>

            <div className="space-y-2 text-[13px] leading-relaxed">
              <p>{postMessage}</p>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${postProgress}%` }} />
              </div>
            </div>
          </div>
          
          <div className="text-slate-500 text-[11px] pt-4 border-t border-slate-950 flex justify-between">
            <span>Press DEL to run UEFI Setup Utility</span>
            <span className="animate-pulse">BOOTING SEQUENCE IN PROCESS</span>
          </div>
        </div>
      )}

      {/* ─── STAGE: MOCK OS DESKTOP SUCCESS ─── */}
      {bootStage === 'desktop' && (
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 text-white p-8 min-h-[460px] rounded-2xl flex flex-col justify-between items-center text-center select-none shadow-2xl relative overflow-hidden border border-indigo-900/50">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[80px] -top-20 -right-20 pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[80px] -bottom-20 -left-20 pointer-events-none" />

          <div className="my-auto space-y-6 relative z-10 max-w-lg">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-2xl font-black tracking-tight text-white">ระบบคอมพิวเตอร์บูตผ่าน 100%!</h4>
              <p className="text-[13px] text-slate-300 leading-relaxed">
                คอมพิวเตอร์ของคุณ POST ผ่านอย่างสมบูรณ์ และโหลดเรียกรหัสบูตเริ่มต้นจาก <span className="font-mono bg-indigo-950 px-2 py-0.5 rounded text-indigo-300 font-bold">NVMe SSD</span> ย้ายระบบเข้าสู่ระบบปฏิบัติการสากลได้เสถียร
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-left grid grid-cols-2 gap-3 text-xs leading-normal font-sans">
              <div>
                <span className="text-slate-500 block">RAM SPEED (ACTIVE):</span>
                <span className={`font-bold ${xmpEnabled ? 'text-indigo-400' : 'text-slate-300'}`}>
                  {xmpEnabled ? 'DDR5-6000 MT/s (XMP ON)' : 'DDR5-4800 MT/s (JEDEC)'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">FAN PROFILE:</span>
                <span className="font-bold text-slate-300">{fanProfile} Mode</span>
              </div>
              <div>
                <span className="text-slate-500 block">CPU TEMPERATURE:</span>
                <span className="font-bold text-slate-300">{temp}°C (คงที่)</span>
              </div>
              <div>
                <span className="text-slate-500 block">BOOT ORDER:</span>
                <span className="font-bold text-slate-300">{bootOrder[0]} (อันดับ 1)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setBootStage('bios')}
            className="bg-white/10 hover:bg-white/15 border border-white/20 active:scale-98 text-white px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all flex items-center gap-1.5 relative z-10"
          >
            <RotateCcw className="w-4 h-4" /> เริ่มบำรุงรักษา / เข้าหน้า BIOS ใหม่
          </button>
        </div>
      )}

      {/* ─── STAGE: UEFI BIOS INTERFACE ─── */}
      {bootStage === 'bios' && (
        <div className="bg-slate-950 text-slate-200 font-sans p-5 rounded-2xl border border-slate-800 shadow-2xl min-h-[460px] select-none text-[13px]">
          {/* Top Bar info */}
          <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-600 text-white font-bold text-xs px-2 py-0.5 rounded uppercase">GUIDELINE:</span>
              <span className="text-slate-400 font-mono text-[11px]">EZ Mode (v1602) | CPU: i5-13400F</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-indigo-400" /> CPU Temp: <strong className="text-rose-400">{temp}°C</strong></span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-yellow-400" /> Vcore: <strong className="text-slate-200">1.216 V</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Column 1: Info & CPU Temp */}
            <div className="space-y-4">
              {/* System Info card */}
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <h5 className="text-[13px] font-bold text-indigo-400 border-b border-slate-800 pb-1.5 uppercase">System Information</h5>
                <div className="space-y-1.5 text-[12px] text-slate-300">
                  <p className="flex justify-between"><span>CPU Name:</span> <strong className="text-slate-100 font-mono">i5-13400F</strong></p>
                  <p className="flex justify-between"><span>CPU Speed:</span> <strong className="text-slate-100 font-mono">2.50 GHz</strong></p>
                  <p className="flex justify-between"><span>Total Memory:</span> <strong className="text-slate-100 font-mono">16384 MB</strong></p>
                  <p className="flex justify-between"><span>Voltage rails:</span> <strong className="text-slate-400 font-mono">+12V={12.096}V</strong></p>
                  <p className="flex justify-between"><span></span> <strong className="text-slate-400 font-mono">+5V={5.040}V</strong></p>
                </div>
              </div>

              {/* Fan Temperature Monitor */}
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <h5 className="text-[13px] font-bold text-indigo-400 border-b border-slate-800 pb-1.5 uppercase">Fan speed & Temperature</h5>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs block">CPU_FAN (RPM)</span>
                    <strong className="text-lg text-emerald-400 font-mono">{rpm} RPM</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">CPU Temp</span>
                    <strong className={`text-lg font-mono ${temp > 50 ? 'text-amber-400' : 'text-slate-100'}`}>{temp}°C</strong>
                  </div>
                </div>

                {/* Profile Controls */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 text-[11px] block">เลือกโปรไฟล์ความแรงพัดลม (Fan Profile):</span>
                  <div className="grid grid-cols-3 gap-1">
                    {['Silent', 'Standard', 'Turbo'].map((prof) => (
                      <button
                        key={prof}
                        onClick={() => handleFanChange(prof)}
                        className={`py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                          fanProfile === prof
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {prof}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Memory & Storage Details */}
            <div className="space-y-4">
              {/* DRAM Status & XMP/EXPO */}
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <h5 className="text-[13px] font-bold text-indigo-400 border-b border-slate-800 pb-1.5 uppercase">DRAM Status & Profile</h5>
                
                <div className="space-y-1.5 text-[12px] text-slate-300">
                  <p className="flex justify-between"><span>DIMM_A1:</span> <strong className="text-slate-500">N/A (Empty)</strong></p>
                  <p className="flex justify-between"><span>DIMM_A2:</span> <strong className="text-slate-100">DDR5 8GB (4800 MT/s)</strong></p>
                  <p className="flex justify-between"><span>DIMM_B1:</span> <strong className="text-slate-500">N/A (Empty)</strong></p>
                  <p className="flex justify-between"><span>DIMM_B2:</span> <strong className="text-slate-100">DDR5 8GB (4800 MT/s)</strong></p>
                </div>

                {/* XMP Toggle */}
                <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-200">Intel XMP Profile</span>
                    <p className="text-[10px] text-slate-500 leading-tight">เพิ่มความเร็วบัสแรมตามโปรไฟล์เสถียร</p>
                  </div>
                  <button
                    onClick={() => setXmpEnabled(!xmpEnabled)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      xmpEnabled
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {xmpEnabled ? 'ENABLED (6000)' : 'DISABLED (4800)'}
                  </button>
                </div>
              </div>

              {/* Storage interface enumeration */}
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <h5 className="text-[13px] font-bold text-indigo-400 border-b border-slate-800 pb-1.5 uppercase">SATA / M.2 Storage</h5>
                <div className="space-y-1.5 text-[12px]">
                  <p className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1 font-mono">M.2_1 (CPU PCIe):</span>
                    <strong className="text-emerald-400">980 PRO 1TB</strong>
                  </p>
                  <p className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1 font-mono">SATA6G_1:</span>
                    <strong className="text-slate-400">BarraCuda 2TB</strong>
                  </p>
                  <p className="flex justify-between items-center text-slate-500">
                    <span className="flex items-center gap-1 font-mono">SATA6G_2:</span>
                    <strong>None</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Boot Priority & Save and Exit */}
            <div className="space-y-4">
              {/* Boot Priority list */}
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <div>
                  <h5 className="text-[13px] font-bold text-indigo-400 border-b border-slate-800 pb-1.5 uppercase">Boot Priority</h5>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">จัดลำดับอุปกรณ์ที่ต้องการสแกนหาไฟล์ระบบ (บนสุดบูตก่อน)</p>
                </div>
                
                <div className="space-y-1.5">
                  {bootOrder.map((device, idx) => (
                    <div
                      key={device}
                      className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-indigo-400 font-mono">#{idx + 1}</span>
                        <span className="text-slate-200 font-bold">{device}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveBootUp(idx)}
                          disabled={idx === 0}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] disabled:opacity-30 hover:bg-slate-700 cursor-pointer"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveBootDown(idx)}
                          disabled={idx === bootOrder.length - 1}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] disabled:opacity-30 hover:bg-slate-700 cursor-pointer"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* F10 Save & Exit Button */}
              <button
                onClick={handleSaveAndExit}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:scale-98 text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-indigo-400/20"
              >
                <Power className="w-4 h-4 text-emerald-400" /> Save & Exit Setup (F10)
              </button>
              
              <div className="text-[11px] text-slate-500 leading-tight text-center">
                <span className="text-amber-500 font-bold">⚠️ หมายเหตุ:</span> ลำดับบูตแรกต้องมีระบบ OS (เช่น NVMe SSD) เท่านั้นเพื่อบูตเข้าใช้งานได้ หากเลือกบูตไดรฟ์อื่นที่ไม่สมบูรณ์จะแสดง Boot Error!
              </div>
            </div>
          </div>
        </div>
      )}
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT — EXPORT DEFAULT
   ═══════════════════════════════════════════════════════════════════ */
export default function IT2_4() {
  return (
    <div className="relative min-h-screen pb-16">
      {/* Layer 1: Ambient Backdrop with specialized glows */}
      <AmbientBackdrop blobs={IT2_4_BLOBS} />

      {/* Layer 3: Main content with vertical flow & Open-Air layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Introduction ─── */}
        <div className="space-y-4">
          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ภายหลังการประกอบชิ้นส่วนอุปกรณ์คอมพิวเตอร์เข้าที่อย่างครบถ้วนแล้ว ขั้นตอนการตรวจสอบและทดสอบระบบระดับต่ำ (Low-Level Diagnostic) ถือเป็นกระบวนการถัดไปที่มีความสำคัญสูงสุด เพื่อตรวจสอบการเชื่อมต่อสัญญาณของวงจรต่างๆ การจ่ายกระแสไฟของพาวเวอร์ซัพพลาย และการรับส่งข้อมูลเริ่มต้นของฮาร์ดแวร์หลักว่าพร้อมสำหรับขั้นตอนการรองรับระบบปฏิบัติการหรือไม่
          </p>
          <div className="bg-gradient-to-r from-amber-500/10 to-rose-500/10 rounded-2xl p-5 border border-amber-200/50">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="text-sm font-bold text-amber-800 mb-1">ความปลอดภัยขณะทดสอบครั้งแรก</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  ตรวจสอบให้แน่ใจว่าไม่มีหัวน็อตหรือไขควงโลหะตกค้างอยู่บน PCB ของเมนบอร์ดหรือการ์ดจอ ก่อนเสียบสายไฟ AC จากเต้ารับ และหากมีสปาร์ก ควัน หรือกลิ่นไหม้เกิดขึ้น ให้ตัดกระแสไฟหรือถอดปลั๊กทันที
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Subtopic 1: POST Process ─── */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-inner group">
              <Cpu className="w-6 h-6 group-hover:animate-pulse" />
            </div>
            <div>
              <h3 className="text-[22px] md:text-[26px] font-bold text-zinc-900 leading-tight">
                กระบวนการ Power-On Self-Test (POST) และการทำงานทดสอบระดับต่ำ
              </h3>
              <span className="text-sm font-semibold bg-gradient-to-r from-rose-500 to-amber-500 text-transparent bg-clip-text pb-2 leading-normal">
                Low-Level Hardware POST Process
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              กระบวนการ Power-On Self-Test (POST) คือโปรแกรมชุดคำสั่งทดสอบขนาดเล็กที่ทำงานทันทีที่คอมพิวเตอร์ได้รับกระแสไฟ โดยบรรจุอยู่ในชิปหน่วยความจำถาวรแบบ EEPROM หรือ Flash Memory (BIOS/UEFI ROM) บนเมนบอร์ด หน้าที่หลักของมันคือการคัดกรองและประเมินสัญญาณของฮาร์ดแวร์พื้นฐานที่จำเป็นต่อการเปิดใช้งานเครื่อง
            </p>
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              หากอุปกรณ์ชิ้นใดชิ้นหนึ่งเกิดข้อผิดพลาดในการเชื่อมโยงสัญญาณหรือไม่ได้รับกระแสไฟ กระบวนการ POST จะหยุดชะงัก (POST Hangs) เพื่อป้องกันความเสียหายที่อาจเกิดขึ้นกับข้อมูลและชิปตัวนำไฟฟ้าอื่นๆ พร้อมกับส่งสัญญาณเตือนในลักษณะของรหัสความผิดพลาด
            </p>
          </div>

          <PostSequenceWidget />
        </section>

        {/* ─── Subtopic 2: Debug LED & Beep Code ─── */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-inner group">
              <CircuitBoard className="w-6 h-6 group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h3 className="text-[22px] md:text-[26px] font-bold text-zinc-900 leading-tight">
                การวิเคราะห์และแก้ไขปัญหาผ่าน Debug LED และ Beep Code
              </h3>
              <span className="text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text pb-2 leading-normal">
                Diagnostics: Debug LEDs & Beep Sound Codes
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              สัญลักษณ์สัญญาณเตือนเพื่อชี้เป้าความชำรุดเสียหายในช่วง POST ในอดีตมักใช้การส่งรหัสเสียงบี๊บ (Beep Codes) ผ่านลำโพงขนาดเล็กที่เป็นหัวต่อลำโพงระบบ (System Speaker/Buzzer) บนเมนบอร์ด ปัจจุบันเมนบอร์ดส่วนใหญ่อัปเกรดมาติดตั้งชุดสัญญาณไฟวิเคราะห์ความชำรุด (Debug LEDs) จำนวน 4 ดวง เรียงกันที่มุมบอร์ดเพื่อช่วยระบุตำแหน่งข้อผิดพลาดด้วยสีและความหมายที่เข้าใจได้ทันที
            </p>
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              ชุดไฟ Debug LEDs ประกอบด้วย:
              <strong className="text-rose-600"> CPU (ไฟแดง)</strong> แปลว่าบอร์ดตรวจพบปัญหาความเข้ากันได้/หน้าสัมผัสของ CPU, 
              <strong className="text-amber-500"> DRAM (ไฟเหลือง)</strong> บ่งชี้ปัญหาสล็อต/ขาลักษณะแรม, 
              <strong className="text-slate-800 bg-slate-100 px-1 rounded"> VGA (ไฟขาว)</strong> ตรวจไม่พบการส่งออกสัญญาณภาพการ์ดจอ และ 
              <strong className="text-emerald-600"> BOOT (ไฟเขียว)</strong> ตรวจสอบไม่พบไดรฟ์ที่มีรหัสบูตพาร์ติชัน
            </p>
          </div>

          <MotherboardDiagnostic />
        </section>

        {/* ─── Subtopic 3: BIOS/UEFI & Hardware Status ─── */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-inner group">
              <Monitor className="w-6 h-6 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-[22px] md:text-[26px] font-bold text-zinc-900 leading-tight">
                อินเทอร์เฟซ BIOS/UEFI และการตรวจสอบสถานะฮาร์ดแวร์
              </h3>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text pb-2 leading-normal">
                BIOS/UEFI Utility & Hardware Health Check
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              เมื่อกระบวนการ POST ผ่านอย่างสมบูรณ์ ข้อมูลฮาร์ดแวร์ทั้งหมดจะถูกลงทะเบียนเข้าสู่ระบบอินเทอร์เฟซการตั้งค่าระบบหลัก BIOS (Basic Input/Output System) หรือในคอมพิวเตอร์ยุคปัจจุบันใช้มาตรฐานที่อัปเกรดมาคือ UEFI (Unified Extensible Firmware Interface) ซึ่งมาพร้อมอินเทอร์เฟซกราฟิกที่สวยงาม รองรับการควบคุมด้วยเมาส์ และรองรับฟังก์ชันการบูตอุปกรณ์แบบคีย์ระบบความปลอดภัยสูง
            </p>
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              การเข้าสู่หน้าจอ BIOS ทำได้โดยการกดปุ่มทางด่วนลัด (เช่น <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border text-[13px] font-mono">Del</kbd> หรือ <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border text-[13px] font-mono">F2</kbd>) ซ้ำๆ ทันทีที่กดปุ่มพาวเวอร์เพื่อสั่งเปิดเครื่อง เมื่อเข้ามาแล้ว หน้านี้จะทำหน้าที่เป็นสถานีตรวจสอบและยืนยันข้อมูลความเข้ากันได้ของระบบ แสดงผลจำนวนอุปกรณ์จัดเก็บข้อมูล ความจุแรม และสเปกความเร็วสัญญาณนาฬิกาของซีพียู
            </p>
          </div>
        </section>

        {/* ─── Subtopic 4: Cooling & Voltage Monitoring ─── */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-inner group">
              <Fan className="w-6 h-6 group-hover:animate-[spin_2s_linear_infinite]" />
            </div>
            <div>
              <h3 className="text-[22px] md:text-[26px] font-bold text-zinc-900 leading-tight">
                ระบบระบายความร้อน รอบพัดลม และการตรวจสอบแรงดันไฟฟ้า
              </h3>
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text pb-2 leading-normal">
                Cooling Profile Curves & Power Voltage Monitoring
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              ในหน้าแรกของ UEFI BIOS มักบรรจุตารางและกราฟข้อมูลการทำงานของระบบระบายความร้อนเพื่อตรวจสุขภาพและวิเคราะห์ปัญหาเบื้องต้น ความร้อนของ CPU ควรมีอุณหภูมิคงที่อยู่ในช่วง 35°C ถึง 55°C (ขึ้นอยู่กับประสิทธิภาพของ Cooler และอุณหภูมิห้อง) หากความร้อนขยับขึ้นทะยานเกิน 80°C อย่างรวดเร็วในหน้า BIOS ชี้ชัดว่าลืมสลักขันฐานระบายความร้อน หรือไม่ได้ทาซิลิโคน
            </p>
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              นอกจากรอบพัดลม (Fan RPM) ข้อมูลสำคัญที่ต้องวิเคราะห์คือแรงดันกระแสไฟจากพาวเวอร์ซัพพลาย (Power Rail Monitor) ได้แก่ สายจ่ายไฟกระแสตรง <strong className="font-mono text-zinc-800">+12V</strong> (สำหรับเลี้ยงมอเตอร์พัดลม ปั๊มน้ำ และการ์ดจอ), <strong className="font-mono text-zinc-800">+5V</strong> (สำหรับวงจรจัดเก็บข้อมูลและพอร์ต USB), และ <strong className="font-mono text-zinc-800">+3.3V</strong> (สำหรับชิปและแรม) ซึ่งระดับไฟทั้งหมดนี้ต้องคลาดเคลื่อนไม่เกิน ±5% ตามข้อกำหนดของมาตรฐาน ATX
            </p>
          </div>
        </section>

        {/* ─── Subtopic 5: Boot Priority & XMP/EXPO ─── */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-inner group">
              <Zap className="w-6 h-6 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-[22px] md:text-[26px] font-bold text-zinc-900 leading-tight">
                การกำหนดลำดับการบูตและการเปิดใช้งานโปรไฟล์ความเร็วแรมระดับสูง (XMP/EXPO)
              </h3>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-rose-500 text-transparent bg-clip-text pb-2 leading-normal">
                Boot Sequence Order & High-Performance XMP/EXPO Memory Profile
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              ขั้นตอนสำคัญสำหรับการเตรียมตัวก่อนเริ่มติดตั้งหรือเปิดการใช้งานระบบปฏิบัติการ ได้แก่ การปรับเปลี่ยนลำดับอุปกรณ์บูตเริ่มต้น (Boot Sequence) ลำดับที่มีความสำคัญสูงสุดในช่วงติดตั้งระบบปฏิบัติการครั้งแรกคือการกำหนดให้พอร์ต USB หรือ Bootable USB แขวนอยู่อันดับ 1 และเมื่อทำการติดตั้ง OS เสร็จสิ้น จึงให้ปรับย้าย NVMe SSD หรือ Windows Boot Manager กลับมาอยู่อันดับ 1 แทน
            </p>
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
              ในด้านของประสิทธิภาพของหน่วยความจำแรม แรม DDR5 สเปกความเร็วสูง (เช่น DDR5-6000) หากไม่ปรับแต่งค่าเริ่มต้นของระบบ ระบบจะเรียกความเร็วแรมเริ่มต้นของ JEDEC เท่านั้น (DDR5-4800) ซึ่งต่ำกว่าขีดความสามารถ ช่างเทคนิคจึงจำเป็นต้องเข้าไปเปิดระบบ **Intel XMP (eXtreme Memory Profile)** หรือ **AMD EXPO (Extended Profiles for Overclocking)** ในหน้าเมนบอร์ด เพื่อให้เรียกใช้งานระดับไฟ ไทมิ่ง และความเร็วสูงสุดที่ผู้ผลิตแรมการันตีว่าเสถียร
            </p>
          </div>
        </section>

        {/* ─── Simulator Block ─── */}
        <BiosSimulator />

        {/* ─── Quiz Engine ─── */}
        <QuizEngine
          title="ทดสอบความรู้: การตรวจสอบและทดสอบระบบเบื้องต้น"
          description="ตอบคำถาม 5 ข้อ เพื่อตรวจสอบความเข้าใจในระบบ POST สัญญาณไฟวิเคราะห์ และการตั้งค่าหน้าจอ BIOS/UEFI"
          levels={QUIZ_LEVELS}
          accentColor="from-rose-500/20 to-amber-500/20"
          icon={<Settings className="w-6 h-6" />}
        />

      </main>

      {/* Layer 4: Teacher Task Footer */}
      <div className="relative z-10">
        <TeacherTask
          title="ใบงานปฏิบัติ: ตรวจแก้ประจุบกพร่องและตั้งค่าระบบในหน้าจอ BIOS/UEFI"
          taskText={`1. ศึกษาและทดลองเล่นกระบวนการจำลอง POST และสัญญาณไฟบนเมนบอร์ด Diagnostic\n2. เข้าสู่หน้าจำลองระบบ BIOS/UEFI สังเกตอุณหภูมิซีพียูขณะเปลี่ยนระดับโปรไฟล์รอบพัดลม\n3. ฝึกฝนตรรกะการจัดลำดับการบูต (Boot Priority) ย้าย NVMe SSD ให้ขยับสแกนขึ้นอันดับ 1\n4. ทำการเปิดใช้งาน Intel XMP Profile เพื่อตั้งระดับบัสแรมโมดูลไปที่ความเร็วสูงขึ้น\n5. สั่งกดบันทึกความสมบูรณ์และทดสอบการเปิดบูต OS (Save & Exit) เพื่อให้ได้การโหลดระบบผ่านสมบูรณ์ 100%\n6. เขียนรายงานระบุสัญญาณรหัสความผิดพลาด Debug LED ทั้ง 4 ประเภทพร้อมเสียงบี๊บเตือนส่งครู`}
        />
      </div>
    </div>
  );
}
