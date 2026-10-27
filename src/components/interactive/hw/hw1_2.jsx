import { useState } from 'react';
import { Search, ShieldAlert, Wrench, CheckCircle2, ChevronRight, Zap, ArrowRight, Gauge, Cpu, AlertCircle } from 'lucide-react';

export default function Hw1_2() {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({ 1: true, 2: false, 3: false });

  const toggleComplete = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const steps = [
    {
      id: 1,
      num: '01',
      title: 'วิเคราะห์สเปค',
      subtitle: '(Decode)',
      badge: 'SPECS COMPATIBILITY',
      tagline: 'ถอดรหัสข้อกำหนดทางเทคนิค (Spec Sheet) และตรวจสอบความเข้ากันได้ของฮาร์ดแวร์ 100%',
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          {/* Magnifying Glass with Chip */}
          <circle cx="22" cy="22" r="14" stroke="#00e5ff" strokeWidth="3" fill="#0f172a" />
          <path d="M32 32L44 44" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round" />
          {/* Microchip in Lens */}
          <rect x="16" y="16" width="12" height="12" rx="2" stroke="#38bdf8" strokeWidth="2" fill="#0284c7" />
          <line x1="16" y1="19" x2="13" y2="19" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="25" x2="13" y2="25" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="19" x2="31" y2="19" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="25" x2="31" y2="25" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      checklist: [
        'ตรวจสอบ Socket ซีพียูตรงกับเมนบอร์ด (เช่น LGA1700 กับ Intel Gen 12-14)',
        'เช็คเจเนอเรชันแรม DDR4 หรือ DDR5 (บัสตรงตาม Memory Controller)',
        'คำนวณวัตต์การกินไฟรวม (Total TDP) และเผื่อกำลังไฟ PSU อย่างน้อย 20-30%'
      ],
      proTip: 'ดาวน์โหลดคู่มือ Motherboard Manual และอ่านหน้า Memory Support List ก่อนสั่งซื้อชิ้นส่วนเสมอ'
    },
    {
      id: 2,
      num: '02',
      title: 'ป้องกันอันตราย',
      subtitle: '(Protect)',
      badge: 'SAFETY & ESD PROTOCOL',
      tagline: 'มาตรการความปลอดภัยจากกระแสไฟฟ้าสลับ (AC) และไฟฟ้าสถิตทำลายล้าง (ESD)',
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          {/* Tech Shield with Lightning */}
          <path
            d="M24 4L8 10V22C8 33 15 41 24 44C33 41 40 33 40 22V10L24 4Z"
            stroke="#00e5ff"
            strokeWidth="3"
            fill="#0f172a"
          />
          {/* Lightning Bolt */}
          <path
            d="M25 12L17 25H25L23 36L32 23H24L25 12Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
      checklist: [
        'ถอดปลั๊ก AC 220V และกดปุ่ม Power หน้าเคสค้างไว้ 10 วินาทีเพื่อ Discharge ไฟค้างใน Capacitor',
        'สวมสายรัดข้อมือป้องกันไฟฟ้าสถิต (ESD Wrist Strap) คีบกราวด์โครงเคสเหล็ก',
        'ห้ามประกอบเครื่องบนพรมขนสัตว์ หรือวางอุปกรณ์บนซองกันไฟฟ้าสถิตด้านนอก (ผิวด้านนอกนำไฟฟ้า)'
      ],
      proTip: 'แรงดันไฟฟ้าสถิตเพียง 10-100 โวลต์ที่มนุษย์ไม่รู้สึก สามารถยิงวงจร Transistor นาโนเมตรในชิปพังทันที'
    },
    {
      id: 3,
      num: '03',
      title: 'เลือกใช้อาวุธ',
      subtitle: '(Execute)',
      badge: 'PRECISION TOOLKIT',
      tagline: 'การใช้เครื่องมือช่างและอุปกรณ์ตรวจวัดทางไฟฟ้าเบื้องต้นอย่างแม่นยำ',
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          {/* Crossed Wrench & Multimeter */}
          <path
            d="M10 18L18 10C20 8 23 8 25 10L14 21C12 21 10 20 10 18Z"
            stroke="#00e5ff"
            strokeWidth="2.5"
            fill="#0284c7"
          />
          <line x1="14" y1="21" x2="6" y2="29" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
          {/* Digital Multimeter Body */}
          <rect x="24" y="10" width="18" height="28" rx="3" stroke="#00e5ff" strokeWidth="2.5" fill="#0f172a" />
          {/* Multimeter Screen */}
          <rect x="28" y="14" width="10" height="7" rx="1" fill="#22d3ee" />
          {/* Dial Knob */}
          <circle cx="33" cy="28" r="4" stroke="#fbbf24" strokeWidth="2" fill="#0f172a" />
          <line x1="33" y1="26" x2="33" y2="28" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      checklist: [
        'ไขควงแฉก PH2 ปลายแม่เหล็กมาตรฐานความยาว 150-200mm พอดีหัวสกรูเมนบอร์ดและเคส',
        'ดิจิทัลมัลติมิเตอร์ (DMM) ตรวจวัดรางจ่ายไฟ PSU: ราง 12V (สายเหลือง), 5V (สายแดง), 3.3V (สายส้ม)',
        'ซิลิโคนระบายความร้อนเกรดมาตรฐาน (Thermal Conductivity > 5 W/mK) และกระดาษไร้ขุยเช็ดหน้าสัมผัส'
      ],
      proTip: 'ห้ามใช้ไขควงไฟฟ้าแรงบิดสูงขันน็อตเมนบอร์ด เพราะ PCB ลายปริ้นท์อาจบิ่นแตกเสียหายถาวร'
    }
  ];

  const current = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 font-sans">
      {/* Blueprint Container Frame */}
      <div
        className="relative bg-white rounded-2xl border-2 border-cyan-400 shadow-[0_10px_35px_rgba(6,182,212,0.18)] p-4 sm:p-7 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 8px 8px, 8px 8px'
        }}
      >
        {/* Technical Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-300 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-sm animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-800 uppercase">
              WORKSHOP PROTOCOL // หน่วยการเรียนรู้ที่ 1: ขั้นตอนเตรียมการช่าง
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500">PIPELINE ID: TECH-FLOW-002</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-300 rounded">
              STANDARD WORKFLOW
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-600" />
            3 ขั้นตอนมาตรฐานช่างคอมพิวเตอร์มืออาชีพ
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            คลิกที่การ์ดแต่ละขั้นตอนเพื่อดูเช็คลิสต์การปฏิบัติงานและเทคนิคหน้างาน
          </p>
        </div>

        {/* 3 Cyber Chamfered Cards with Connecting Bus */}
        <div className="relative mb-6">
          {/* Desktop Connecting Pipeline Wire */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 -translate-y-1/2 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 -z-0 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
            {steps.map((st) => {
              const isSelected = activeStep === st.id;
              const isDone = completedSteps[st.id];

              return (
                <div
                  key={st.id}
                  onClick={() => setActiveStep(st.id)}
                  className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-50/80 shadow-[0_0_25px_rgba(6,182,212,0.35)] scale-[1.02] ring-2 ring-cyan-400'
                      : 'border-cyan-200 bg-white hover:border-cyan-400 hover:shadow-lg'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                  }}
                >
                  {/* Top Notch Accent */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 shadow-md">
                      {st.icon}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComplete(st.id);
                        }}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-slate-100 text-slate-400 hover:text-slate-600 border border-slate-300'
                        }`}
                        title="ทำเครื่องหมายผ่านขั้นตอนนี้"
                      >
                        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Number */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black font-mono text-cyan-600 tracking-wider">
                        {st.num}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                        {st.title} <span className="text-cyan-700 font-mono text-sm">{st.subtitle}</span>
                      </h4>
                    </div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-100 text-cyan-900 border border-cyan-300">
                      {st.badge}
                    </span>
                  </div>

                  {/* Tagline Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[3.5rem]">
                    {st.tagline}
                  </p>

                  {/* Bottom Indicator */}
                  <div className="mt-4 pt-3 border-t border-cyan-200/60 flex items-center justify-between text-xs font-semibold text-cyan-700">
                    <span>{isSelected ? '● กำลังเปิดดูรายละเอียด' : 'คลิกเพื่อดูรายละเอียด'}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Step Deep-Dive Inspector Panel */}
        <div className="bg-slate-900 text-white rounded-2xl border-2 border-cyan-400 p-5 sm:p-6 shadow-xl relative overflow-hidden">
          {/* Subtle Cyber Grid in Dark Box */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#00e5ff_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950 font-mono font-bold text-xs">
                  STEP {current.num}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  ข้อกำหนดและเช็คลิสต์การปฏิบัติงาน: {current.title} {current.subtitle}
                </h4>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                STATUS: {completedSteps[current.id] ? 'COMPLETED (พร้อมปฏิบัติการ)' : 'PENDING (รอดำเนินการ)'}
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 mb-5">
              {current.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Pro-Tip Box */}
            <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/60 flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
                <strong className="text-amber-300 font-bold mr-1">คำแนะนำจากครูแม็ค (Pro-Tip):</strong>
                {current.proTip}
              </div>
            </div>
          </div>
        </div>

        {/* Blueprint Footer */}
        <div className="mt-6 pt-3 border-t border-cyan-300/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
          <div>FLOW SEQUENCE // VERIFIED STANDARD</div>
          <div className="text-cyan-800 font-bold">
            PROGRESS: {Object.values(completedSteps).filter(Boolean).length} / 3 STEPS READY
          </div>
        </div>
      </div>
    </div>
  );
}
