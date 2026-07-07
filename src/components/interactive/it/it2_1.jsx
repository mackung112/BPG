import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  Activity, 
  HardDrive, 
  Tv, 
  Plug, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  ArrowRight, 
  Terminal, 
  Info,
  Sparkles,
  ShoppingBag,
  Gamepad2,
  Monitor
} from 'lucide-react';
import { SimulatorShell, ConceptCard, AmbientBackdrop } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// ─── Custom Styles for Animations ──────────────────────────────────────────
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float-gentle {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    @keyframes pulse-soft {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.4; }
    }
    @keyframes flow-svg-line {
      to {
        stroke-dashoffset: -20;
      }
    }
    .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
    .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
    .animate-flow-svg-line { animation: flow-svg-line 1s linear infinite; }
    
    .glow-led-indigo {
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.6), inset 0 0 5px rgba(99, 102, 241, 0.4);
    }
    .glow-led-emerald {
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.6), inset 0 0 5px rgba(16, 185, 129, 0.4);
    }
    .glow-led-rose {
      box-shadow: 0 0 10px rgba(244, 63, 94, 0.6), inset 0 0 5px rgba(244, 63, 94, 0.4);
    }
  `}} />
);

// ─── Ambient backdrop blobs preset ──────────────────────────────────────────
const IT2_BLOBS = [
  { color: 'bg-indigo-200', size: 'w-96 h-96', position: '-top-20 -left-20', opacity: 'opacity-30' },
  { color: 'bg-violet-200', size: 'w-80 h-80', position: '-top-20 -right-20', opacity: 'opacity-25' },
  { color: 'bg-blue-200', size: 'w-72 h-72', position: '-bottom-20 left-1/4', opacity: 'opacity-20' },
  { color: 'bg-cyan-200', size: 'w-80 h-80', position: 'top-1/3 -right-20', opacity: 'opacity-20' }
];

// ─── PC Parts Database ──────────────────────────────────────────────────────
const PARTS = {
  cpu: [
    { id: 'cpu-i9', name: 'Intel Core i9-14900K', brand: 'Intel', socket: 'LGA1700', ramGen: 'DDR5', tdp: 125, maxTdp: 253, price: 21900, description: '24 Cores (8P+16E) / 32 Threads | Turbo 6.0 GHz | TDP 125W' },
    { id: 'cpu-i5', name: 'Intel Core i5-12400', brand: 'Intel', socket: 'LGA1700', ramGen: 'DDR4', tdp: 65, maxTdp: 117, price: 5400, description: '6 Cores (6P) / 12 Threads | Turbo 4.4 GHz | TDP 65W' },
    { id: 'cpu-r7', name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', socket: 'AM5', ramGen: 'DDR5', tdp: 120, maxTdp: 162, price: 15900, description: '8 Cores / 16 Threads | Turbo 5.0 GHz | 96MB L3 V-Cache | TDP 120W' },
    { id: 'cpu-r5', name: 'AMD Ryzen 5 5600', brand: 'AMD', socket: 'AM4', ramGen: 'DDR4', tdp: 65, maxTdp: 88, price: 4300, description: '6 Cores / 12 Threads | Turbo 4.4 GHz | TDP 65W' }
  ],
  motherboard: [
    { id: 'mb-z790', name: 'ASUS ROG Strix Z790-F', socket: 'LGA1700', ramGen: 'DDR5', formFactor: 'ATX', price: 12500, description: 'Socket LGA1700 | Form Factor ATX | RAM Slots DDR5 | PCIe 5.0 x16' },
    { id: 'mb-b760m', name: 'GIGABYTE B760M DS3H AX', socket: 'LGA1700', ramGen: 'DDR4', formFactor: 'Micro-ATX', price: 4200, description: 'Socket LGA1700 | Form Factor M-ATX | RAM Slots DDR4 | Wi-Fi 6E' },
    { id: 'mb-b650', name: 'MSI MAG B650 Tomahawk', socket: 'AM5', ramGen: 'DDR5', formFactor: 'ATX', price: 7900, description: 'Socket AM5 | Form Factor ATX | RAM Slots DDR5 | PCIe 4.0 x16' },
    { id: 'mb-b550m', name: 'ASRock B550M Pro4', socket: 'AM4', ramGen: 'DDR4', formFactor: 'Micro-ATX', price: 3400, description: 'Socket AM4 | Form Factor M-ATX | RAM Slots DDR4 | Dual M.2 Slots' }
  ],
  ram: [
    { id: 'ram-d5-32', name: 'CORSAIR Vengeance 32GB (16GBx2) DDR5 6000MHz', ramGen: 'DDR5', price: 4600, description: 'DDR5 | ความจุ 32GB Dual Channel | ความเร็วบัส 6000 MHz | CL36' },
    { id: 'ram-d5-16', name: 'Kingston Fury Beast 16GB DDR5 5600MHz', ramGen: 'DDR5', price: 2400, description: 'DDR5 | ความจุ 16GB Single Channel | ความเร็วบัส 5600 MHz' },
    { id: 'ram-d4-16', name: 'G.SKILL Ripjaws V 16GB (8GBx2) DDR4 3200MHz', ramGen: 'DDR4', price: 1550, description: 'DDR4 | ความจุ 16GB Dual Channel | ความเร็วบัส 3200 MHz' },
    { id: 'ram-d4-8', name: 'Kingston ValueRAM 8GB DDR4 2666MHz', ramGen: 'DDR4', price: 790, description: 'DDR4 | ความจุ 8GB Single Channel | ความเร็วบัส 2666 MHz' }
  ],
  storage: [
    { id: 'st-nvme-pcie5', name: 'Crucial T700 1TB NVMe M.2 (Gen 5)', type: 'NVMe', speed: '12400 MB/s', price: 6900, tdp: 10, description: 'PCIe 5.0 x4 M.2 SSD | ความเร็วอ่าน 12,400 MB/s เขียน 11,800 MB/s' },
    { id: 'st-nvme-pcie4', name: 'Samsung 990 PRO 1TB NVMe M.2 (Gen 4)', type: 'NVMe', speed: '7450 MB/s', price: 3950, tdp: 7, description: 'PCIe 4.0 x4 M.2 SSD | ความเร็วอ่าน 7,450 MB/s เขียน 6,900 MB/s' },
    { id: 'st-sata-ssd', name: 'WD Blue 500GB 2.5" SATA SSD', type: 'SATA SSD', speed: '560 MB/s', price: 1590, tdp: 4, description: 'SATA III 2.5 นิ้ว | ความเร็วอ่าน 560 MB/s เขียน 530 MB/s' },
    { id: 'st-hdd', name: 'Seagate BarraCuda 2TB SATA HDD', type: 'HDD', speed: '190 MB/s', price: 1950, tdp: 8, description: 'SATA III 3.5 นิ้ว | ความเร็วรอบ 7200 RPM | Buffer 256MB' }
  ],
  gpu: [
    { id: 'gpu-rtx4090', name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', type: 'Dedicated', tdp: 450, price: 68900, description: '24GB GDDR6X VRAM | PCIe 4.0 | TDP 450W | สำหรับ Gaming & AI หนักหน่วง' },
    { id: 'gpu-rtx4060', name: 'NVIDIA GeForce RTX 4060 8GB GDDR6', type: 'Dedicated', tdp: 115, price: 11500, description: '8GB GDDR6 VRAM | PCIe 4.0 | TDP 115W | ประหยัดไฟ ทำงานกราฟิกดี' },
    { id: 'gpu-rx7600', name: 'AMD Radeon RX 7600 8GB GDDR6', type: 'Dedicated', tdp: 165, price: 9900, description: '8GB GDDR6 VRAM | PCIe 4.0 | TDP 165W | คุ้มค่าสำหรับการเล่นเกม 1080p' },
    { id: 'gpu-integrated', name: 'Integrated GPU (การ์ดจอออนบอร์ด)', type: 'Integrated', tdp: 0, price: 0, description: 'ใช้ชิปประมวลผลฝังในตัว CPU | เหมาะสำหรับงานสำนักงาน ดูหนัง และเล่นเน็ต' }
  ],
  psu: [
    { id: 'psu-1000w', name: 'MSI MAG A1000G 1000W (80+ Gold / Fully Modular)', wattage: 1000, efficiency: '80+ Gold', type: 'Fully Modular', price: 5900, description: '1000W | ได้มาตรฐาน 80 Plus Gold | ถอดสายได้ทุกเส้น (Fully Modular)' },
    { id: 'psu-750w', name: 'Thermaltake Toughpower 750W (80+ Gold / Fully Modular)', wattage: 750, efficiency: '80+ Gold', type: 'Fully Modular', price: 3400, description: '750W | ได้มาตรฐาน 80 Plus Gold | ถอดสายได้ทุกเส้น (Fully Modular)' },
    { id: 'psu-550w', name: 'Cooler Master MWE 550W (80+ Bronze / Non-Modular)', wattage: 550, efficiency: '80+ Bronze', type: 'Non-Modular', price: 1650, description: '550W | ได้มาตรฐาน 80 Plus Bronze | สายไฟติดกับตัวเครื่อง (Non-Modular)' }
  ]
};

export default function IT2_1() {
  const [selectedCpu, setSelectedCpu] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedGpu, setSelectedGpu] = useState(null);
  const [selectedPsu, setSelectedPsu] = useState(null);

  // States สำหรับสวิตช์แท็บแผงวิเคราะห์และคู่มือ
  const [activeRightTab, setActiveRightTab] = useState('assembly');

  // States สำหรับการจำลองการบูต
  const [isBooting, setIsBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [bootLogs, setBootLogs] = useState([]);
  const [isBooted, setIsBooted] = useState(false);

  // คำนวณความเข้ากันได้
  const socketCompatible = selectedCpu && selectedMotherboard ? selectedCpu.socket === selectedMotherboard.socket : true;
  const ramCompatible = selectedMotherboard && selectedRam ? selectedMotherboard.ramGen === selectedRam.ramGen : true;

  // คำนวณกำลังไฟวัตต์ (TDP)
  const systemBaseTdp = 40; // เมนบอร์ด แรม พัดลม และอื่นๆ
  const cpuTdp = selectedCpu ? selectedCpu.maxTdp : 0;
  const gpuTdp = selectedGpu ? selectedGpu.tdp : 0;
  const storageTdp = selectedStorage ? selectedStorage.tdp : 0;
  const totalTdp = cpuTdp + gpuTdp + storageTdp + systemBaseTdp;
  const psuWattage = selectedPsu ? selectedPsu.wattage : 0;
  const isPsuSufficient = selectedPsu ? psuWattage >= totalTdp : true;

  // คำนวณราคารวม
  const totalPrice = 
    (selectedCpu?.price || 0) + 
    (selectedMotherboard?.price || 0) + 
    (selectedRam?.price || 0) + 
    (selectedStorage?.price || 0) + 
    (selectedGpu?.price || 0) + 
    (selectedPsu?.price || 0);

  // คำนวณคะแนนประสิทธิภาพ (Performance Scores)
  const calculateScores = () => {
    if (!selectedCpu || !selectedMotherboard || !selectedRam || !selectedStorage || !selectedGpu || !selectedPsu) {
      return { gaming: 0, office: 0, creation: 0 };
    }
    if (!socketCompatible || !ramCompatible || !isPsuSufficient) {
      return { gaming: 5, office: 5, creation: 5 }; // ขัดข้องทางเทคนิค
    }

    let gaming = 10;
    let office = 40;
    let creation = 10;

    // GPU scoring
    if (selectedGpu.id === 'gpu-rtx4090') { gaming += 60; creation += 45; }
    else if (selectedGpu.id === 'gpu-rtx4060') { gaming += 40; creation += 30; }
    else if (selectedGpu.id === 'gpu-rx7600') { gaming += 35; creation += 22; }
    else { gaming += 5; creation += 5; } // integrated

    // CPU scoring
    if (selectedCpu.id === 'cpu-i9') { gaming += 20; creation += 35; office += 40; }
    else if (selectedCpu.id === 'cpu-r7') { gaming += 25; creation += 25; office += 40; }
    else if (selectedCpu.id === 'cpu-i5') { gaming += 12; creation += 15; office += 35; }
    else if (selectedCpu.id === 'cpu-r5') { gaming += 10; creation += 12; office += 35; }

    // RAM scoring
    if (selectedRam.ramGen === 'DDR5') {
      gaming += selectedRam.id === 'ram-d5-32' ? 8 : 4;
      creation += selectedRam.id === 'ram-d5-32' ? 8 : 4;
    } else {
      gaming += selectedRam.id === 'ram-d4-16' ? 3 : 1;
      creation += selectedRam.id === 'ram-d4-16' ? 3 : 1;
    }

    // Storage scoring
    if (selectedStorage.type === 'NVMe') {
      gaming += 7;
      creation += 12;
      office += 20;
    } else if (selectedStorage.type === 'SATA SSD') {
      gaming += 4;
      creation += 6;
      office += 18;
    } else {
      gaming += 1;
      creation += 1;
      office += 5;
    }

    return {
      gaming: Math.min(Math.round(gaming), 100),
      office: Math.min(Math.round(office), 100),
      creation: Math.min(Math.round(creation), 100)
    };
  };

  const scores = calculateScores();

  // จัดแจงการเช็คขั้นตอนบูต (BIOS / POST Simulation)
  const handleBoot = () => {
    if (!selectedCpu || !selectedMotherboard || !selectedRam || !selectedStorage || !selectedGpu || !selectedPsu) return;
    if (!socketCompatible || !ramCompatible || !isPsuSufficient) return;

    setIsBooting(true);
    setBootStep(0);
    setBootLogs([]);
    
    const logs = [
      'AMIBIOS (C) 2026 American Megatrends, Inc.',
      `BIOS Date: 06/07/26 Ver: 26.04 (UEFI Mode)`,
      'Initializing system components...',
      `CPU: ${selectedCpu.name} @ ${selectedCpu.brand === 'Intel' ? '3.20GHz' : '4.20GHz'} ... OK`,
      `Motherboard: ${selectedMotherboard.name} (Socket ${selectedMotherboard.socket}) ... OK`,
      `Memory: ${selectedRam.name} ... OK`,
      `Storage Detected: ${selectedStorage.name} (${selectedStorage.speed}) ... OK`,
      `GPU Card: ${selectedGpu.name} ... OK`,
      `PSU status: ${selectedPsu.name} ... OK`,
      'Checking hardware configuration and compatibility...',
      'POST (Power On Self Test) completed successfully with 0 errors.',
      'Booting from UEFI storage partition...',
      'Loading Operating System kernel...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logs.length) {
        setBootLogs(prev => [...prev, logs[currentStep]]);
        currentStep++;
        setBootStep(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooted(true);
          setIsBooting(false);
        }, 1000);
      }
    }, 250);
  };

  const handleReset = () => {
    setSelectedCpu(null);
    setSelectedMotherboard(null);
    setSelectedRam(null);
    setSelectedStorage(null);
    setSelectedGpu(null);
    setSelectedPsu(null);
    setIsBooted(false);
    setIsBooting(false);
    setBootLogs([]);
    setBootStep(0);
    setActiveRightTab('assembly');
  };

  return (
    <div className="relative z-10 w-full min-h-screen">
      <CustomStyles />
      <AmbientBackdrop blobs={IT2_BLOBS} />

      {/* ─── Layer 3: Main Layout ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory of 6 Components (Fluid Open-Air) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              วิทยาการฮาร์ดแวร์คอมพิวเตอร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทำความรู้จักชิ้นส่วนหลักและข้อกำหนดทางเทคนิค
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl space-y-4">
            <p>
              ในการประกอบและซ่อมบำรุงเครื่องคอมพิวเตอร์ การทำความเข้าใจโครงสร้าง สเปก และความเข้ากันได้ (Compatibility) ของฮาร์ดแวร์มีความสำคัญอย่างยิ่ง เครื่องคอมพิวเตอร์ส่วนบุคคล (PC) ประกอบด้วยชิ้นส่วนการทำงานหลัก 6 ประเภทที่ทำงานประสานกัน
            </p>
            
            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-4 border-l-[3px] border-l-indigo-500 leading-relaxed text-[15px] md:text-[16px] text-indigo-950 font-medium">
              💡 <span className="bg-indigo-100/80 border border-indigo-300/60 text-indigo-800 rounded px-1.5 py-0.5 text-xs font-mono font-bold mr-1">KEY RULE</span> ความเข้ากันได้ของชิ้นส่วน (Compatibility) มีกฎข้อบังคับที่เปลี่ยนไม่ได้ เช่น Socket ของ CPU และ Motherboard ต้องตรงกัน แหนมเมมโมรี่ (RAM) ต้องตรงชนิด DDR ที่เมนบอร์ดรองรับ และแหล่งจ่ายไฟ (PSU) ต้องมีกำลังวัตต์เพียงพอกับอุปกรณ์ทั้งหมด
            </div>
          </div>

          {/* Grid Layout of 6 Core Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            
            <ConceptCard 
              symbol="CPU"
              title="หน่วยประมวลผลกลาง (Processor)"
              description="เปรียบเสมือนสมองของคอมพิวเตอร์ ทำหน้าที่คิดคำนวณและทำตามคำสั่งซอฟต์แวร์ แบ่งเป็นค่าย Intel (LGA1700, LGA1200) และ AMD (AM5, AM4)"
              code="Intel: LGA1700 | AMD: AM5"
              result="TDP: 65W - 253W"
              accent="indigo"
            />

            <ConceptCard 
              symbol="Motherboard"
              title="แผงวงจรหลัก (Mainboard)"
              description="ศูนย์รวมช่องทางเชื่อมต่ออุปกรณ์ทุกชิ้น มีขนาดมาตรฐาน ATX, Micro-ATX, และ Mini-ITX มีสล็อตระบุชนิดแรม DDR4 หรือ DDR5 ชัดเจน"
              code="ATX | M-ATX | Mini-ITX"
              result="Socket Compatibility"
              accent="violet"
            />

            <ConceptCard 
              symbol="RAM"
              title="หน่วยความจำชั่วคราว (Memory)"
              description="เก็บข้อมูลขณะใช้งานเพื่อให้ CPU ประมวลผลได้รวดเร็ว ความต่างของ DDR4 และ DDR5 อยู่ที่ความเร็วบัสและการประหยัดพลังงาน แนะนำต่อเป็น Dual-Channel เพื่อแบนด์วิดท์สูงสุด"
              code="DDR4 vs DDR5"
              result="Single vs Dual Channel"
              accent="emerald"
            />

            <ConceptCard 
              symbol="Storage"
              title="หน่วยเก็บข้อมูลหลัก (HDD / SSD)"
              description="จัดเก็บระบบปฏิบัติการและไฟล์แบบถาวร SATA HDD (เน้นความจุ) SSD SATA (ความเร็วปานกลาง) และ NVMe M.2 (ต่อตรงบนบอร์ด ความเร็วหลักพัน MB/s)"
              code="NVMe PCIe 4.0/5.0 vs SATA"
              result="Speed: 150 - 12400+ MB/s"
              accent="cyan"
            />

            <ConceptCard 
              symbol="VGA / GPU"
              title="หน่วยประมวลผลกราฟิก (Graphic Card)"
              description="ประมวลผลการแสดงภาพบนจอ แบ่งเป็นการ์ดจอออนบอร์ด (Integrated) และการ์ดจอแยก (Dedicated) ซึ่งใช้พลังงานสูง (TDP สูง) แต่อัตราประมวลผลสูงมาก"
              code="NVIDIA GeForce | AMD Radeon"
              result="Integrated vs Dedicated"
              accent="amber"
            />

            <ConceptCard 
              symbol="PSU"
              title="แหล่งจ่ายไฟ (Power Supply Unit)"
              description="แปลงไฟบ้านมาจ่ายให้อุปกรณ์ในเครื่อง ต้องคำนวณวัตต์ให้เพียงพอ และควรมีมาตรฐาน 80 Plus (Bronze, Gold, Platinum) เพื่อรับรองประสิทธิภาพการประหยัดพลังงาน"
              code="80 Plus Certification"
              result="Modular vs Non-Modular"
              accent="rose"
            />

          </div>
        </section>

        {/* ─── Section 2: Custom PC Builder Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              กิจกรรมปฏิบัติการจำลอง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องจำลองจัดสเปกและตรวจสอบความเข้ากันได้คอมพิวเตอร์
            </h3>
          </div>

          <p className="text-[16px] text-zinc-600 max-w-4xl leading-relaxed">
            เลือกชิ้นส่วนหลักทีละหมวดหมู่ในแผงควบคุมด้านซ้าย ชิ้นส่วนที่เลือกจะถูกเสียบลงในแบบจำลองเมนบอร์ดทางด้านขวา ระบบจะวิเคราะห์สถานะความเข้ากันได้ของพอร์ต ช่องเสียบ และปริมาณกำลังไฟรวมแบบเรียลไทม์ หากผ่านการทดสอบ คุณจะสามารถลองเปิดเครื่อง (Boot PC) ได้จริง
          </p>

          <SimulatorShell 
            icon={<Cpu className="w-6 h-6 text-indigo-600" />}
            title="Interactive PC Assembly & Compatibility Tool"
            accentBg="bg-indigo-50"
            iconColor="text-indigo-600"
            dark={false}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              
              {/* ─ ฝั่งซ้าย: Control Panel (Dark Theme) ─ */}
              <div className="col-span-12 lg:col-span-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  PC PARTS SELECTION PANEL
                </span>

                {isBooted ? (
                  <div className="h-full flex flex-col justify-between items-center text-center py-10 px-4">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">คอมพิวเตอร์ของคุณบูตสำเร็จ!</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        ชิ้นส่วนทุกอย่างได้รับการเชื่อมต่อและใช้พลังงานอย่างถูกต้องตามหลักวิศวกรรมฮาร์ดแวร์ คอมไพเลอร์บอร์ด POST ผ่าน 100%
                      </p>
                      <div className="inline-grid grid-cols-3 gap-4 w-full bg-slate-950/50 rounded-xl p-4 border border-white/5 text-left mb-6">
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono">CPU</div>
                          <div className="text-xs font-semibold text-white truncate">{selectedCpu?.name.split(' ')[2]}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono">RAM</div>
                          <div className="text-xs font-semibold text-white">{selectedRam?.ramGen} {selectedRam?.id.includes('32') ? '32GB' : selectedRam?.id.includes('16') ? '16GB' : '8GB'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono">GPU</div>
                          <div className="text-xs font-semibold text-white truncate">{selectedGpu?.name.split(' ').slice(2, 4).join(' ')}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
                    >
                      <RotateCcw className="w-4 h-4" /> จัดสเปกเครื่องใหม่
                    </button>
                  </div>
                ) : isBooting ? (
                  <div className="h-full flex flex-col justify-between py-6 font-mono text-[13.5px] text-emerald-400 bg-slate-950 p-5 rounded-xl border border-emerald-500/20 overflow-y-auto min-h-[350px]">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-2 mb-3">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">POST Diagnostics Terminal</span>
                      </div>
                      {bootLogs.map((log, index) => (
                        <div key={index} className="leading-relaxed whitespace-pre-wrap">
                          {log.startsWith('POST:') ? (
                            <span className="text-white">{log}</span>
                          ) : log.includes('OK') ? (
                            <span>{log.slice(0, -3)}<strong className="text-emerald-300 bg-emerald-950 px-1 rounded">OK</strong></span>
                          ) : (
                            <span className="text-slate-400">{log}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 border-t border-slate-900 pt-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>กำลังประมวลผลการทำงาน POST... Step {bootStep}/13</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[520px] overflow-y-auto pr-2">
                    {/* CPU selection */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-indigo-400" /> 1. หน่วยประมวลผลกลาง (CPU)
                        </label>
                        <span className="text-[11px] text-slate-500 italic">เลือกตาม Socket: LGA1700 / AM5 / AM4</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PARTS.cpu.map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedCpu(item)}
                            className={`p-3 text-left rounded-xl transition-all duration-200 border cursor-pointer ${
                              selectedCpu?.id === item.id 
                                ? 'bg-indigo-950/50 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-bold text-sm flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-indigo-400 text-xs">{item.price.toLocaleString()} ฿</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 truncate">{item.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Motherboard selection */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-violet-400" /> 2. แผงวงจรหลัก (Motherboard)
                        </label>
                        <span className="text-[11px] text-slate-500 italic">ต้องมี Socket และ DDR ตรงกับ CPU/RAM</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PARTS.motherboard.map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedMotherboard(item)}
                            className={`p-3 text-left rounded-xl transition-all duration-200 border cursor-pointer ${
                              selectedMotherboard?.id === item.id 
                                ? 'bg-violet-950/50 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-bold text-sm flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-violet-400 text-xs">{item.price.toLocaleString()} ฿</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 truncate">{item.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* RAM selection */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-emerald-400" /> 3. หน่วยความจำหลัก (RAM)
                        </label>
                        <span className="text-[11px] text-slate-500 italic">ต้องเลือกชนิด DDR4/DDR5 ให้ตรงตามเมนบอร์ด</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PARTS.ram.map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedRam(item)}
                            className={`p-3 text-left rounded-xl transition-all duration-200 border cursor-pointer ${
                              selectedRam?.id === item.id 
                                ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-bold text-sm flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-emerald-400 text-xs">{item.price.toLocaleString()} ฿</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 truncate">{item.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Storage selection */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                          <HardDrive className="w-4 h-4 text-cyan-400" /> 4. หน่วยเก็บข้อมูล (Storage)
                        </label>
                        <span className="text-[11px] text-slate-500 italic">NVMe (เร็วพิเศษ เสียบตรงบอร์ด) vs SATA (ต่อสาย)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PARTS.storage.map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedStorage(item)}
                            className={`p-3 text-left rounded-xl transition-all duration-200 border cursor-pointer ${
                              selectedStorage?.id === item.id 
                                ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-bold text-sm flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-cyan-400 text-xs">{item.price.toLocaleString()} ฿</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 truncate">{item.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* GPU selection */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                          <Tv className="w-4 h-4 text-amber-400" /> 5. การ์ดจอ / หน่วยประมวลผลกราฟิก (GPU)
                        </label>
                        <span className="text-[11px] text-slate-500 italic">Integrated (ออนบอร์ดทั่วไป) vs Dedicated (การ์ดจอแยกแรงสูง)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PARTS.gpu.map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedGpu(item)}
                            className={`p-3 text-left rounded-xl transition-all duration-200 border cursor-pointer ${
                              selectedGpu?.id === item.id 
                                ? 'bg-amber-950/50 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-bold text-sm flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-amber-400 text-xs">{item.price.toLocaleString()} ฿</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 truncate">{item.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* PSU selection */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                          <Plug className="w-4 h-4 text-rose-400" /> 6. แหล่งจ่ายไฟ (PSU)
                        </label>
                        <span className="text-[11px] text-slate-500 italic">กำลังวัตต์ (W) ต้องเพียงพอครอบคลุมค่า TDP ระบบสูงสุด</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PARTS.psu.map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedPsu(item)}
                            className={`p-3 text-left rounded-xl transition-all duration-200 border cursor-pointer ${
                              selectedPsu?.id === item.id 
                                ? 'bg-rose-950/50 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]' 
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-bold text-sm flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-rose-400 text-xs">{item.price.toLocaleString()} ฿</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 truncate">{item.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* ─ ฝั่งขวา: Visual Motherboard & Calculator Panel (Dark Theme) ─ */}
              <div className="col-span-12 lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  SYSTEM ANALYZER & ASSEMBLY VISUALIZER
                </span>

                {/* Tab Navigation for Right Panel */}
                <div className="flex gap-2 mt-6 z-10">
                  <button 
                    onClick={() => setActiveRightTab('assembly')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeRightTab === 'assembly' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-white/5'
                    }`}
                  >
                    ผังการประกอบเครื่อง (Assembly)
                  </button>
                  <button 
                    onClick={() => setActiveRightTab('standards')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeRightTab === 'standards' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-white/5'
                    }`}
                  >
                    เกณฑ์มาตรฐานจัดสเปก (Build Guide)
                  </button>
                </div>

                {/* 1. Conditional Content Box */}
                {activeRightTab === 'assembly' ? (
                  <div className="mt-3 bg-slate-900/80 rounded-xl p-5 border border-white/10 relative h-[280px] overflow-hidden flex items-center justify-center">
                    
                    {/* Neon Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                    {/* Absolute Center Connection Copper Trace Lines SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                      {/* Trace CPU (120, 100) -> RAM (280, 100) */}
                      <line x1="120" y1="100" x2="280" y2="100" stroke="#334155" strokeWidth="3" />
                      {selectedCpu && selectedRam && ramCompatible && (
                        <line x1="120" y1="100" x2="280" y2="100" stroke="#10b981" strokeWidth="3" strokeDasharray="6 8" className="animate-flow-svg-line" />
                      )}

                      {/* Trace CPU (120, 100) -> PCIe / GPU (180, 190) Orthogonal path */}
                      <path d="M 120,100 L 120,140 L 180,140 L 180,190" fill="none" stroke="#334155" strokeWidth="3" />
                      {selectedCpu && selectedGpu && (
                        <path d="M 120,100 L 120,140 L 180,140 L 180,190" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="6 8" className="animate-flow-svg-line" />
                      )}

                      {/* Trace CPU (120, 100) -> Storage (290, 190) Orthogonal path */}
                      <path d="M 120,100 L 120,150 L 290,150 L 290,190" fill="none" stroke="#334155" strokeWidth="3" />
                      {selectedCpu && selectedStorage && (
                        <path d="M 120,100 L 120,150 L 290,150 L 290,190" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6 8" className="animate-flow-svg-line" />
                      )}

                      {/* Trace PSU (200, 250) -> CPU / PCIe Power line */}
                      <path d="M 200,250 L 200,225 L 80,225 L 80,100 L 120,100" fill="none" stroke="#334155" strokeWidth="2.5" />
                      {selectedPsu && selectedCpu && isPsuSufficient && (
                        <path d="M 200,250 L 200,225 L 80,225 L 80,100 L 120,100" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 7" className="animate-flow-svg-line" />
                      )}
                    </svg>

                    {/* CPU Socket Node */}
                    <div 
                      style={{ left: '120px', top: '100px' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 z-10 ${
                        selectedCpu 
                          ? 'bg-indigo-950 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] text-indigo-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      <Cpu className={`w-6 h-6 ${selectedCpu ? 'animate-pulse' : ''}`} />
                      <span className="text-[9px] font-mono mt-1 font-bold">
                        {selectedCpu ? selectedCpu.socket : 'SOCKET'}
                      </span>
                    </div>

                    {/* RAM Slots Node */}
                    <div 
                      style={{ left: '280px', top: '100px' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 z-10 ${
                        selectedRam 
                          ? 'bg-emerald-950 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-emerald-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      <div className="flex gap-1">
                        <div className={`w-1 h-12 rounded-full ${selectedRam ? 'bg-emerald-400' : 'bg-slate-800'}`} />
                        <div className={`w-1 h-12 rounded-full ${selectedRam ? 'bg-emerald-400' : 'bg-slate-800'}`} />
                      </div>
                      <span className="text-[8px] font-mono mt-1 font-bold">
                        {selectedRam ? selectedRam.ramGen : 'RAM'}
                      </span>
                    </div>

                    {/* PCIe Slot / GPU Node */}
                    <div 
                      style={{ left: '180px', top: '190px' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-24 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                        selectedGpu 
                          ? 'bg-amber-950 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] text-amber-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      <Tv className="w-5 h-5 mr-1" />
                      <span className="text-[8px] font-mono font-bold">
                        {selectedGpu ? selectedGpu.name.split(' ').slice(2, 4).join(' ') : 'PCIe GPU'}
                      </span>
                    </div>

                    {/* Storage Node */}
                    <div 
                      style={{ left: '290px', top: '190px' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-10 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 z-10 ${
                        selectedStorage 
                          ? 'bg-cyan-950 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] text-cyan-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      <HardDrive className="w-4 h-4" />
                      <span className="text-[8px] font-mono font-bold">
                        {selectedStorage ? selectedStorage.type : 'STORAGE'}
                      </span>
                    </div>

                    {/* Power Supply Node */}
                    <div 
                      style={{ left: '200px', top: '250px' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-28 h-8 rounded border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                        selectedPsu 
                          ? 'bg-rose-950 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] text-rose-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      <Plug className="w-4 h-4 mr-1" />
                      <span className="text-[8px] font-mono font-bold">
                        {selectedPsu ? `${selectedPsu.wattage}W ${selectedPsu.efficiency}` : 'PSU / POWER'}
                      </span>
                    </div>

                    {/* Motherboard Form Factor Label */}
                    <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-600 bg-slate-950/40 px-1.5 py-0.5 rounded border border-white/5">
                      {selectedMotherboard ? `${selectedMotherboard.formFactor} BOARD` : 'CHASSIS / NO MB'}
                    </div>

                  </div>
                ) : (
                  <div className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-white/10 h-[280px] overflow-y-auto space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
                    
                    {/* CPU & Socket Standard */}
                    <div className="border-b border-slate-800 pb-3">
                      <h6 className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm text-indigo-400">
                        <Cpu className="w-3.5 h-3.5" /> มาตรฐาน Socket CPU & เมนบอร์ด
                      </h6>
                      <p className="text-slate-400">
                        ซีพียูและเมนบอร์ดต้องมีขนาดและประเภทสล็อต (Socket) ที่เข้ากันได้พอดี หากสเปกไม่ตรงกันจะไม่สามารถเสียบขาพินได้จริง:
                      </p>
                      <ul className="list-none mt-1 space-y-1 pl-1">
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-indigo-400 shrink-0" /> Intel Core (Gen 12-14) ↔ Socket <strong className="text-white">LGA1700</strong>
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-indigo-400 shrink-0" /> AMD Ryzen (7000+) ↔ Socket <strong className="text-white">AM5</strong>
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-indigo-400 shrink-0" /> AMD Ryzen (3000-5000) ↔ Socket <strong className="text-white">AM4</strong>
                        </li>
                      </ul>
                    </div>

                    {/* RAM & DDR Standard */}
                    <div className="border-b border-slate-800 pb-3">
                      <h6 className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm text-emerald-400">
                        <Activity className="w-3.5 h-3.5" /> มาตรฐานหน่วยความจำ (RAM DDR)
                      </h6>
                      <p className="text-slate-400">
                        ช่องเสียบแรมของเมนบอร์ดจะถูกออกแบบมาสำหรับแรมเจเนอเรชันเดียวเท่านั้น (เสียบข้ามรุ่นไม่ได้เนื่องจากตำแหน่งรอยบากต่างกัน):
                      </p>
                      <ul className="list-none mt-1 space-y-1 pl-1">
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" /> แรมแบบ <strong className="text-white">DDR5</strong> มีแบนด์วิดท์กว้างและบัสสูงกว่า (เช่น 5600-6000MHz) คู่กับเมนบอร์ด DDR5
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" /> แรมแบบ <strong className="text-white">DDR4</strong> เป็นมาตรฐานเสถียรดั้งเดิม (เช่น 3200MHz) คู่กับเมนบอร์ด DDR4
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" /> <strong className="text-white">Dual Channel:</strong> แนะนำเสียบแรมคู่ (เช่น 8GBx2) เพื่อแบ่งภาระการรับส่งข้อมูล ช่วยให้แรงขึ้น 15-20%
                        </li>
                      </ul>
                    </div>

                    {/* TDP & PSU Wattage Standard */}
                    <div className="border-b border-slate-800 pb-3">
                      <h6 className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm text-rose-400">
                        <Plug className="w-3.5 h-3.5" /> มาตรฐานกำลังไฟวัตต์ (TDP & PSU)
                      </h6>
                      <p className="text-slate-400">
                        ค่า TDP (Thermal Design Power) บ่งบอกอัตราพลังงานความร้อนที่อุปกรณ์ปล่อยออกขณะทำงานหนัก:
                      </p>
                      <ul className="list-none mt-1 space-y-1 pl-1">
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-rose-400 shrink-0" /> กำลังไฟวัตต์สูงสุดของ PSU ต้องมีค่ามากกว่า TDP รวมของชิ้นส่วนในระบบทั้งหมด
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-rose-400 shrink-0" /> <strong className="text-white">80 Plus Certification:</strong> ตรารับประกันประสิทธิภาพการแปลงไฟฟ้าจาก AC เป็น DC ช่วยประหยัดค่าไฟและลดความร้อนสะสม
                        </li>
                      </ul>
                    </div>

                    {/* Storage Standards */}
                    <div>
                      <h6 className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm text-cyan-400">
                        <HardDrive className="w-3.5 h-3.5" /> มาตรฐานความเร็ว Storage (HDD vs SSD)
                      </h6>
                      <p className="text-slate-400">
                        การเลือกหน่วยเก็บข้อมูลส่งผลโดยตรงต่อความเร็วในการบูตเครื่องและเปิดแอปพลิเคชัน:
                      </p>
                      <ul className="list-none mt-1 space-y-1 pl-1">
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" /> <strong className="text-white">NVMe M.2 SSD:</strong> เชื่อมต่อตรงบนบอร์ด เลน PCIe 4.0/5.0 ทำความเร็วสูงสุด (3500 - 12000 MB/s)
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" /> <strong className="text-white">SATA SSD:</strong> เชื่อมต่อผ่านสาย SATA ทำความเร็วปานกลาง (~550 MB/s)
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" /> <strong className="text-white">SATA HDD:</strong> จานหมุน ความเร็วช้าสุด (~150 MB/s) เหมาะสำหรับเก็บสำรองข้อมูลขนาดใหญ่
                        </li>
                      </ul>
                    </div>

                  </div>
                )}

                {/* 2. Analytical panel & Compatibility Check */}
                <div className="space-y-4">
                  
                  {/* Compatibility Checklist */}
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 space-y-2.5">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-indigo-400" /> ตรวจสอบความเข้ากันได้ (Compatibility Check)
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      
                      {/* Check Socket */}
                      <div className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                        <span className="text-xs text-slate-400">Sockets CPU & MB</span>
                        {selectedCpu && selectedMotherboard ? (
                          socketCompatible ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> เข้ากันได้</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400"><XCircle className="w-3.5 h-3.5" /> ไม่เข้ากัน</span>
                          )
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">รอชิ้นส่วน</span>
                        )}
                      </div>

                      {/* Check RAM Type */}
                      <div className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                        <span className="text-xs text-slate-400">ชนิดแรม DDR</span>
                        {selectedMotherboard && selectedRam ? (
                          ramCompatible ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> เข้ากันได้</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400"><XCircle className="w-3.5 h-3.5" /> ไม่เข้ากัน</span>
                          )
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">รอชิ้นส่วน</span>
                        )}
                      </div>

                      {/* Check PSU Wattage */}
                      <div className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                        <span className="text-xs text-slate-400">กำลังไฟ PSU</span>
                        {selectedPsu ? (
                          isPsuSufficient ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> เพียงพอ</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400"><AlertTriangle className="w-3.5 h-3.5" /> ไฟไม่พอ</span>
                          )
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">รอชิ้นส่วน</span>
                        )}
                      </div>

                    </div>

                    {/* Compatibility Error Explainer Banner */}
                    {(!socketCompatible || !ramCompatible || !isPsuSufficient) && (
                      <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-3 flex gap-2.5 items-start mt-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-rose-200 space-y-1">
                          <p className="font-bold">ตรวจพบข้อขัดแย้งในการจัดสเปก:</p>
                          {!socketCompatible && (
                            <p>• Socket เมนบอร์ด ({selectedMotherboard?.socket}) และ CPU ({selectedCpu?.socket}) ต่างกัน ทำให้อุปกรณ์ไม่สามารถติดตั้งเข้ากับสล็อตทางกายภาพได้</p>
                          )}
                          {!ramCompatible && (
                            <p>• สล็อตแรมเมนบอร์ดรองรับเฉพาะแรมชนิด {selectedMotherboard?.ramGen} แต่เลือกซื้อแรม {selectedRam?.ramGen} ซึ่งมีร่องบากและแรงดันไฟไม่สามารถใช้งานร่วมกันได้</p>
                          )}
                          {!isPsuSufficient && (
                            <p>• ปริมาณความต้องการการกินกำลังไฟรวมของระบบสูดสุด ({totalTdp}W) สูงกว่าอัตราจ่ายไฟของ PSU ({psuWattage}W) ซึ่งจะนำไปสู่อาการเครื่องดับชำรุดขณะใช้งานหนัก</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Calculator Summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/50 rounded-xl p-4 border border-white/5">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">ราคารวมโดยประมาณ</div>
                      <div className="text-lg font-bold text-white mt-1">{totalPrice.toLocaleString()} ฿</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">กำลังไฟ TDP สูงสุด</div>
                      <div className="text-lg font-bold text-indigo-400 mt-1">{totalTdp} W</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">ประสิทธิภาพแรม</div>
                      <div className="text-xs font-semibold text-slate-300 mt-1.5">
                        {selectedRam ? (selectedRam.id.includes('x2') ? 'Dual-Channel 🚀' : 'Single-Channel ⚠️') : '-'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">ความเร็วสตอเรจ</div>
                      <div className="text-xs font-semibold text-slate-300 mt-1.5">
                        {selectedStorage ? selectedStorage.speed : '-'}
                      </div>
                    </div>
                  </div>

                  {/* Performance scores bar charts */}
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 space-y-3">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">การประเมินประสิทธิภาพระบบ (Simulation Index)</h5>
                    <div className="space-y-2.5">
                      
                      {/* Gaming Score */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400 flex items-center gap-1"><Gamepad2 className="w-3.5 h-3.5" /> ประสิทธิภาพการเล่นเกม (Gaming)</span>
                          <span className="font-bold text-white">{scores.gaming} / 100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${scores.gaming}%` }} 
                            className="h-full bg-[#4F46E5] rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>

                      {/* Productivity / Creative Score */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> การตัดต่อ/กราฟิกและ AI (Creative Work)</span>
                          <span className="font-bold text-white">{scores.creation} / 100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${scores.creation}%` }} 
                            className="h-full bg-[#06B6D4] rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>

                      {/* Office Score */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400 flex items-center gap-1"><Monitor className="w-3.5 h-3.5" /> งานเอกสารและการเรียนทั่วไป (Office & Study)</span>
                          <span className="font-bold text-white">{scores.office} / 100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${scores.office}%` }} 
                            className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* 3. Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-5 py-3 rounded-xl text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-transparent hover:bg-slate-900/40 text-sm font-semibold transition-all duration-200 cursor-pointer text-center"
                  >
                    ล้างการจัดสเปก
                  </button>

                  <button
                    disabled={
                      !selectedCpu || !selectedMotherboard || !selectedRam || 
                      !selectedStorage || !selectedGpu || !selectedPsu ||
                      !socketCompatible || !ramCompatible || !isPsuSufficient || isBooting || isBooted
                    }
                    onClick={handleBoot}
                    className={`flex-[2] px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
                      (!selectedCpu || !selectedMotherboard || !selectedRam || 
                      !selectedStorage || !selectedGpu || !selectedPsu)
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-transparent'
                        : (!socketCompatible || !ramCompatible || !isPsuSufficient)
                          ? 'bg-rose-950/40 text-rose-500 border border-rose-900/50 cursor-not-allowed'
                          : isBooted 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:scale-[1.01]'
                    }`}
                  >
                    {isBooted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> บูตระบบสำเร็จเสร็จสิ้น
                      </>
                    ) : isBooting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        กำลังบูตเครื่อง...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> ทดสอบเปิดเครื่อง (Boot PC)
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <section className="relative z-10">
          <TeacherTask 
            title="ภารกิจประจำบทเรียน: การจัดสเปกและตรวจสอบความเข้ากันได้คอมพิวเตอร์"
            taskText={`ให้นักเรียนเลือกประกอบเครื่องคอมพิวเตอร์ตามความต้องการและเงื่อนไข 3 สถานการณ์ต่อไปนี้โดยการคลิกชิ้นส่วนในหน้าจำลอง เมื่อจัดสเปกตรงตามที่ระบบทดสอบเปิดเครื่องสำเร็จแล้ว ให้จดบันทึกสเปกโดยละเอียดและราคารวมลงกระดาษเพื่อนำส่งครู:

1. ชุดสำนักงานและงานพิมพ์เอกสารแบบประหยัด (Office PC)
- กำหนดให้ใช้ CPU ค่ายใดก็ได้ แต่ต้องมี Integrated GPU (การ์ดจอออนบอร์ดเพื่อประหยัดต้นทุน)
- เลือก RAM ความจุ 8GB ขึ้นไป
- เลือกอุปกรณ์เก็บข้อมูลแบบ SSD (SATA หรือ NVMe) ความเร็วสูงและคุ้มค่า
- ใช้ PSU เพียง 550W ก็เหมาะสม
- บูตเครื่องตรวจสอบความเข้ากันได้ให้ผ่าน 100%

2. ชุดเล่นเกมระดับไฮเอนด์และกราฟิก 4K (AAA Gaming PC)
- เลือก CPU ประสิทธิภาพสูงของ AMD (Ryzen 7 7800X3D) คู่กับ Motherboard ที่มี Socket เข้ากันได้
- เลือก RAM DDR5 ขนาด 32GB ความเร็วบัส 6000MHz
- ใช้การ์ดจอแยกตัวท็อป NVIDIA GeForce RTX 4090
- เลือกใช้ SSD ความเร็วสูงระดับ Gen 5 NVMe M.2
- ตรวจคำนวณ TDP รวมที่ใช้ และจัดหา PSU ที่จ่ายกำลังไฟเพียงพอกับความต้องการระบบโดยไม่ Overload

3. ชุดทำงานสร้างสรรค์ผลงานมีเดียและกราฟิก (Content Creator PC)
- เลือกใช้ CPU Intel Core i9-14900K เพื่อเน้นประมวลผล Multi-cores คู่กับเมนบอร์ดที่รองรับหน่วยความจำ DDR5
- เลือก RAM DDR5 ขนาด 32GB หรือ 16GB
- ใช้การ์ดจอแยก NVIDIA GeForce RTX 4060
- เลือกที่เก็บข้อมูลความจุสูงและใช้ PSU ที่จ่ายไฟเพียงพอ

*หมายเหตุ: นักเรียนสามารถทดลองเลือกคู่สเปกที่ผิดพลาดเพื่อสังเกตข้อความแจ้งเตือนความผิดพลาด (Socket Mismatch หรือ RAM Generation Mismatch) ในตัวจำลองประกอบและเรียนรู้สาเหตุได้จริง`}
          />
        </section>

      </main>
    </div>
  );
}
