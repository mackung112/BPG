import { useState } from 'react';
import { Cpu, AlertTriangle, CheckCircle2, Info, ChevronRight, Eye, ShieldCheck, Zap } from 'lucide-react';

export default function Hw1_1() {
  const [selectedBrand, setSelectedBrand] = useState('intel');
  const [activeSegment, setActiveSegment] = useState('suffix');
  const [activeSocket, setActiveSocket] = useState('lga');
  const [showDamageRisk, setShowDamageRisk] = useState(false);

  const cpuData = {
    intel: {
      fullName: 'Intel Core i5-14400F',
      segments: [
        { id: 'brand', label: 'Intel', tag: 'แบรนด์ผู้ผลิต', desc: 'ผู้ออกแบบและผลิตสถาปัตยกรรมชิปประมวลผล x86 ชั้นนำ' },
        { id: 'brandLine', label: 'Core i5', tag: 'ระดับประสิทธิภาพ (Tier)', desc: 'ระดับกลาง (Mainstream) มาพร้อม 10 Cores (6 P-Core + 4 E-Core) 16 Threads เหมาะสำหรับงานทั่วไปและเล่นเกม' },
        { id: 'gen', label: '14', tag: 'เจเนอเรชัน (Generation)', desc: 'เจเนอเรชันที่ 14 (Raptor Lake Refresh) ใช้สถาปัตยกรรมไฮบริด 10nm (Intel 7)' },
        { id: 'sku', label: '400', tag: 'รุ่นย่อย / พลังประมวลผล (SKU)', desc: 'ลำดับรุ่นในตระกูล i5 บ่งบอกระดับ Base/Boost Clock (2.5 GHz - 4.7 GHz) และอัตรากินไฟ TDP 65W' },
        { id: 'suffix', label: 'F', tag: 'รหัสท้ายคุณลักษณะพิเศษ', desc: 'ไม่มีการ์ดจอในตัว (No Integrated GPU) ต้องติดตั้งการ์ดจอแยก (Discrete GPU) เครื่องจึงจะแสดงผลได้!' },
      ]
    },
    amd: {
      fullName: 'AMD Ryzen 5 7600X',
      segments: [
        { id: 'brand', label: 'AMD', tag: 'แบรนด์ผู้ผลิต', desc: 'Advanced Micro Devices ผู้นำสถาปัตยกรรมชิปประมวลผลตระกูล Zen' },
        { id: 'brandLine', label: 'Ryzen 5', tag: 'ระดับประสิทธิภาพ (Tier)', desc: 'ระดับกลางประสิทธิภาพสูง (6 Cores / 12 Threads) สถาปัตยกรรม Zen 4 ผลิตบนกระบวนการ 5nm' },
        { id: 'gen', label: '7', tag: 'เจเนอเรชัน (Series)', desc: 'Ryzen 7000 Series รองรับหน่วยความจำ DDR5 และมาตรฐาน PCIe 5.0 บนซ็อกเก็ต AM5' },
        { id: 'sku', label: '600', tag: 'รุ่นย่อย / ประสิทธิภาพ (SKU)', desc: 'บ่งบอกระดับความเร็วและแคช L3 สูงถึง 32MB ความเร็วสูงสุด 5.3 GHz' },
        { id: 'suffix', label: 'X', tag: 'รหัสท้ายคุณลักษณะพิเศษ', desc: 'ปลดล็อกตัวคูณความเร็ว (Factory Overclocked) ทำความเร็วสูง ค่า TDP 105W ต้องใช้พัดลมระบายความร้อนแยก' },
      ]
    }
  };

  const currentCpu = cpuData[selectedBrand];
  const activeInfo = currentCpu.segments.find(s => s.id === activeSegment) || currentCpu.segments[4];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 font-sans">
      {/* Blueprint Container */}
      <div 
        className="relative bg-white rounded-2xl border-2 border-cyan-400/80 shadow-[0_10px_35px_rgba(6,182,212,0.18)] p-4 sm:p-7 overflow-hidden"
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
        {/* Technical Header & Blueprint Markings */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-300/70 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-sm animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-800 uppercase">
              BLUEPRINT SPEC SHEET // รหัสวิชา 21910-2019
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500">SCHEMATIC ID: CPU-DEC-003</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-300 rounded">
              INTERACTIVE MODULE
            </span>
          </div>
        </div>

        {/* Section 1: Brand Toggle & CPU Code Breakdown */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-600" />
                ถอดรหัสโครงสร้างชื่อรุ่นซีพียู (CPU Naming Blueprint)
              </h3>
              <p className="text-sm text-slate-600 mt-0.5">
                คลิกที่ส่วนต่างๆ ของชื่อรุ่นเพื่อดูความหมายและข้อกำหนดทางเทคนิค
              </p>
            </div>

            {/* Brand Toggle Buttons */}
            <div className="inline-flex p-1 bg-slate-100 border border-slate-300 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => { setSelectedBrand('intel'); setActiveSegment('suffix'); }}
                className={`min-h-[44px] px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  selectedBrand === 'intel'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Intel Core
              </button>
              <button
                type="button"
                onClick={() => { setSelectedBrand('amd'); setActiveSegment('suffix'); }}
                className={`min-h-[44px] px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  selectedBrand === 'amd'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AMD Ryzen
              </button>
            </div>
          </div>

          {/* Interactive CPU Name Segment Bar */}
          <div className="bg-slate-900/95 text-white p-4 sm:p-6 rounded-2xl border-2 border-cyan-400 shadow-xl mb-4 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
              PROCESSOR MODEL SELECTOR
            </div>

            {/* Segments Display */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-2">
              {currentCpu.segments.map((seg) => {
                const isSelected = activeSegment === seg.id;
                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setActiveSegment(seg.id)}
                    className={`min-h-[48px] px-3.5 sm:px-5 py-2 rounded-xl font-mono text-lg sm:text-2xl font-bold transition-all duration-200 border-2 relative cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-white shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-105 z-10'
                        : 'bg-slate-800/80 text-cyan-200 border-cyan-700/60 hover:border-cyan-400 hover:bg-slate-800'
                    }`}
                  >
                    {seg.label}
                    {isSelected && (
                      <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Decoded Info Box */}
            <div className="mt-4 pt-4 border-t border-slate-700/80 flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-cyan-900/50">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-400 text-slate-950 font-mono">
                    {activeInfo.label}
                  </span>
                  <span className="text-xs text-cyan-300 font-semibold">
                    {activeInfo.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeInfo.desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Technician Caution Banner (ถอดแบบกล่องเตือนในสไลด์เป๊ะ) */}
        <div className="mb-6 rounded-2xl bg-[#3b1d06] border-2 border-amber-400 p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl shrink-0 shadow-md">
              <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold text-amber-200 tracking-wide flex items-center gap-2">
                รหัสท้าย CPU ต้องระวัง! (Technician Warning)
              </h4>
              <div className="mt-2 space-y-1.5 text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">▸</span>
                  <span>
                    <strong className="text-white font-semibold">Intel ลงท้ายด้วย F / KF</strong> (เช่น i5-14400F): 
                    <span className="text-amber-300 underline font-semibold ml-1">ไม่มีการ์ดจอในตัว</span> ต้องซื้อการ์ดจอแยกเสมอ มิฉะนั้นจอจะเปิดไม่ติด!
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">▸</span>
                  <span>
                    <strong className="text-white font-semibold">AMD ลงท้ายด้วย G</strong> (เช่น Ryzen 5 5600G): 
                    มีชิปกราฟิกในตัวประสิทธิภาพสูง (APU) ใช้งานต่อจอภาพจากเมนบอร์ดได้ทันทีไม่ต้องใส่การ์ดจอแยก
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: LGA vs PGA Socket Architecture Comparison */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-600" />
              เปรียบเทียบสถาปัตยกรรมซ็อกเก็ต: LGA vs PGA
            </h4>
            <button
              type="button"
              onClick={() => setShowDamageRisk(!showDamageRisk)}
              className="min-h-[44px] px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg border border-cyan-400 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-cyan-700" />
              {showDamageRisk ? 'ซ่อนจุดเสี่ยงความเสียหาย' : 'แสดงจุดเสี่ยงความเสียหายช่าง (Damage Risk)'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LGA Card */}
            <div 
              onClick={() => setActiveSocket('lga')}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                activeSocket === 'lga'
                  ? 'border-cyan-500 bg-cyan-50/70 shadow-md ring-2 ring-cyan-400/40'
                  : 'border-slate-300 bg-white hover:border-cyan-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-cyan-600 text-white">
                  LGA (Land Grid Array)
                </span>
                <span className="text-xs font-mono text-slate-500">Intel LGA1700 / AMD AM5</span>
              </div>
              
              <h5 className="font-bold text-slate-900 text-base mb-1">
                ขาพินอยู่บนซ็อกเก็ตเมนบอร์ด — ซีพียูเรียบ
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 mb-3">
                ใต้ชิปซีพียูเป็นแผ่นหน้าสัมผัสทองคำเรียบ ขาพินสปริงโค้งงอจะติดตั้งอยู่ภายในเบ้าซ็อกเก็ตของเมนบอร์ด
              </p>

              {/* Vector Graphic: LGA Chip with Contact Pads */}
              <div className="h-32 bg-slate-900 rounded-xl border border-cyan-400/50 p-2 flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 200 120" className="w-full h-full max-h-28">
                  {/* CPU PCB Base */}
                  <rect x="50" y="15" width="100" height="90" rx="6" fill="#0891b2" stroke="#00e5ff" strokeWidth="2" />
                  {/* Center silicon substrate */}
                  <rect x="65" y="30" width="70" height="60" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
                  {/* Gold Contact Array (LGA Pads) */}
                  <g fill="#fbbf24" opacity="0.85">
                    {[...Array(6)].map((_, r) =>
                      [...Array(8)].map((__, c) => (
                        <circle key={`lga-${r}-${c}`} cx={72 + c * 8} cy={37 + r * 8} r="1.5" />
                      ))
                    )}
                  </g>
                  {/* Notch Alignment Markers */}
                  <circle cx="50" cy="60" r="4" fill="#0f172a" />
                  <circle cx="150" cy="60" r="4" fill="#0f172a" />
                  <polygon points="53,18 63,18 53,28" fill="#fbbf24" />
                </svg>
                <span className="absolute bottom-1 right-2 text-[10px] font-mono text-cyan-300">
                  BOTTOM VIEW: FLAT PADS
                </span>
              </div>

              {/* Risk Alert if toggled */}
              {showDamageRisk && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-xs leading-relaxed animate-fadeIn">
                  <strong className="font-bold text-rose-700 block mb-0.5">⚠️ จุดเสี่ยงช่าง:</strong>
                  ห้ามทำของตกใส่ซ็อกเก็ตบนเมนบอร์ด หรือเอานิ้วไปแตะ เพราะขาพินสปริงจะล้มหรือหักได้ง่ายมาก และดัดคืนยากที่สุด!
                </div>
              )}
            </div>

            {/* PGA Card */}
            <div 
              onClick={() => setActiveSocket('pga')}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                activeSocket === 'pga'
                  ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/40'
                  : 'border-slate-300 bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-600 text-white">
                  PGA (Pin Grid Array)
                </span>
                <span className="text-xs font-mono text-slate-500">AMD AM4 / Older CPUs</span>
              </div>
              
              <h5 className="font-bold text-slate-900 text-base mb-1">
                ขาพินแหลมอยู่ใต้ตัวซีพียู — ซ็อกเก็ตเป็นรูรับ
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 mb-3">
                ใต้ชิปซีพียูจะมีเข็มพินทองคำนับพันขายื่นออกมา เพื่อเสียบลงในช่องรูของซ็อกเก็ตและล็อกด้วยก้านโยก
              </p>

              {/* Vector Graphic: PGA Chip with Protruding Pins */}
              <div className="h-32 bg-slate-900 rounded-xl border border-amber-400/50 p-2 flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 200 120" className="w-full h-full max-h-28">
                  {/* CPU PCB Base */}
                  <rect x="50" y="20" width="100" height="85" rx="6" fill="#15803d" stroke="#4ade80" strokeWidth="2" />
                  {/* Center Core Area */}
                  <rect x="75" y="40" width="50" height="45" rx="2" fill="#0f172a" stroke="#86efac" strokeWidth="1" />
                  {/* Pins extending outwards (PGA Pins) */}
                  <g stroke="#fbbf24" strokeWidth="1.2">
                    {[...Array(6)].map((_, r) =>
                      [...Array(10)].map((__, c) => {
                        // skip middle area
                        if (c >= 3 && c <= 6 && r >= 2 && r <= 4) return null;
                        return (
                          <line
                            key={`pga-${r}-${c}`}
                            x1={58 + c * 9}
                            y1={28 + r * 10}
                            x2={58 + c * 9}
                            y2={33 + r * 10}
                          />
                        );
                      })
                    )}
                  </g>
                  {/* Pin 1 Golden Triangle Marker */}
                  <polygon points="53,23 61,23 53,31" fill="#fbbf24" />
                </svg>
                <span className="absolute bottom-1 right-2 text-[10px] font-mono text-amber-300">
                  BOTTOM VIEW: GOLDEN PINS
                </span>
              </div>

              {/* Risk Alert if toggled */}
              {showDamageRisk && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-xs leading-relaxed animate-fadeIn">
                  <strong className="font-bold text-rose-700 block mb-0.5">⚠️ จุดเสี่ยงช่าง:</strong>
                  ระวังซิลิโคนเหนียวดูดซีพียูติดฮีตซิงค์หลุดออกมาทั้งแผง (CPU Yanking) และระวังทำซีพียูตก ขาพินจะงอทันที
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Blueprint Footer Stamp */}
        <div className="mt-6 pt-3 border-t border-cyan-300/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
          <div>SCALE: 1:1 VECTOR BLUEPRINT</div>
          <div className="flex items-center gap-1.5 text-cyan-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
            VERIFIED FOR HARDWARE WORKSHOP
          </div>
        </div>
      </div>
    </div>
  );
}
