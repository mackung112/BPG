import React, { useState, useEffect } from 'react';
import { 
  Network, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2, 
  Info, 
  Binary, 
  Globe, 
  Lock, 
  Database, 
  Cpu, 
  ArrowRight,
  ShieldAlert,
  Sliders,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { QuizEngine } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// ─── Custom CSS Animations and Styles ───
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes drift-blob {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(30px, -30px) scale(1.08); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-drift-blob { animation: drift-blob 18s ease-in-out infinite; }
    
    .glass-panel {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.03);
    }
    .dark-panel-left {
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .dark-panel-right {
      background: rgba(2, 6, 23, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
  `}} />
);

export default function IT5_2() {
  // ─── State for Interactive IPv4 Bitwise Analyzer ───
  const [ipOctets, setIpOctets] = useState([192, 168, 1, 50]);
  const [cidr, setCidr] = useState(24);
  const [ipInputStr, setIpInputStr] = useState('192.168.1.50');
  const [ipError, setIpError] = useState('');

  // Update input text when octets state changes
  useEffect(() => {
    setIpInputStr(ipOctets.join('.'));
    setIpError('');
  }, [ipOctets]);

  // Parse IP text input
  const handleIpInputChange = (e) => {
    const value = e.target.value;
    setIpInputStr(value);
    
    const parts = value.split('.');
    if (parts.length !== 4) {
      setIpError('รูปแบบ IP ต้องประกอบด้วยตัวเลข 4 ชุดคั่นด้วยจุด เช่น 192.168.1.50');
      return;
    }

    const newOctets = [];
    for (let i = 0; i < 4; i++) {
      const num = parseInt(parts[i], 10);
      if (isNaN(num) || num < 0 || num > 255) {
        setIpError(`ชุดตัวเลขที่ ${i + 1} ต้องมีค่าระหว่าง 0 ถึง 255`);
        return;
      }
      newOctets.push(num);
    }
    
    setIpError('');
    setIpOctets(newOctets);
  };

  // Convert octets to 32-bit binary array of integers (0 or 1)
  const getIpBits = () => {
    const bits = [];
    ipOctets.forEach(octet => {
      const binaryStr = octet.toString(2).padStart(8, '0');
      for (let i = 0; i < 8; i++) {
        bits.push(parseInt(binaryStr[i], 10));
      }
    });
    return bits;
  };

  // Convert CIDR prefix to 32-bit binary array of integers
  const getMaskBits = () => {
    const bits = [];
    for (let i = 0; i < 32; i++) {
      bits.push(i < cidr ? 1 : 0);
    }
    return bits;
  };

  // Toggle single bit of IP address
  const handleToggleIpBit = (bitIndex) => {
    const currentBits = getIpBits();
    currentBits[bitIndex] = currentBits[bitIndex] === 1 ? 0 : 1;
    
    // Reconstruct octets from bits
    const newOctets = [];
    for (let i = 0; i < 4; i++) {
      const start = i * 8;
      const bitSegment = currentBits.slice(start, start + 8);
      const octetValue = parseInt(bitSegment.join(''), 2);
      newOctets.push(octetValue);
    }
    setIpOctets(newOctets);
  };

  // Calculate subnet masks from CIDR
  const getMaskOctets = () => {
    const maskBits = getMaskBits();
    const octets = [];
    for (let i = 0; i < 4; i++) {
      const segment = maskBits.slice(i * 8, i * 8 + 8);
      octets.push(parseInt(segment.join(''), 2));
    }
    return octets;
  };

  // Bitwise AND operation: IP & Subnet Mask
  const getNetworkOctets = () => {
    const mask = getMaskOctets();
    return ipOctets.map((o, idx) => o & mask[idx]);
  };

  // Bitwise OR and Negate: IP | (~Mask & 255)
  const getBroadcastOctets = () => {
    const mask = getMaskOctets();
    return ipOctets.map((o, idx) => o | (~mask[idx] & 255));
  };

  // Get first usable IP Address octets
  const getFirstUsableOctets = (netOctets) => {
    const copy = [...netOctets];
    if (cidr < 31) {
      copy[3] = copy[3] + 1;
    }
    return copy;
  };

  // Get last usable IP Address octets
  const getLastUsableOctets = (broadOctets) => {
    const copy = [...broadOctets];
    if (cidr < 31) {
      copy[3] = copy[3] - 1;
    }
    return copy;
  };

  // Determine IP Class
  const getIpClass = (firstOctet) => {
    if (firstOctet >= 1 && firstOctet <= 126) return { name: 'Class A', desc: 'เครือข่ายขนาดใหญ่พิเศษ (เช่น องค์กรข้ามชาติ)', defaultMask: '/8' };
    if (firstOctet === 127) return { name: 'Class A (Loopback)', desc: 'ที่อยู่สำหรับทดสอบระบบภายในเครื่อง (Local Host)', defaultMask: '/8' };
    if (firstOctet >= 128 && firstOctet <= 191) return { name: 'Class B', desc: 'เครือข่ายขนาดกลาง-ใหญ่ (เช่น มหาวิทยาลัย, รัฐวิสาหกิจ)', defaultMask: '/16' };
    if (firstOctet >= 192 && firstOctet <= 223) return { name: 'Class C', desc: 'เครือข่ายขนาดเล็ก (เช่น สำนักงาน, บ้านเรือนทั่วไป)', defaultMask: '/24' };
    if (firstOctet >= 224 && firstOctet <= 239) return { name: 'Class D (Multicast)', desc: 'ส่งข้อมูลแบบกลุ่มหลายปลายทางพร้อมกัน (เช่น IPTV, Video Call)', defaultMask: 'ไม่มีดีฟอลต์' };
    return { name: 'Class E (Experimental)', desc: 'วิจัยและทดลองวิทยาการโครงข่าย', defaultMask: 'ไม่มีดีฟอลต์' };
  };

  // Check Private IP range
  const checkPrivateIp = () => {
    const [o1, o2] = ipOctets;
    if (o1 === 10) return { isPrivate: true, range: '10.0.0.0 - 10.255.255.255', scope: 'คลาส A (Private)' };
    if (o1 === 172 && o2 >= 16 && o2 <= 31) return { isPrivate: true, range: '172.16.0.0 - 172.31.255.255', scope: 'คลาส B (Private)' };
    if (o1 === 192 && o2 === 168) return { isPrivate: true, range: '192.168.0.0 - 192.168.255.255', scope: 'คลาส C (Private)' };
    if (o1 === 169 && o2 === 254) return { isPrivate: false, isLinkLocal: true, range: '169.254.0.0 - 169.254.255.255', scope: 'APIPA (Link-Local)' };
    if (o1 === 127) return { isPrivate: false, isLoopback: true, range: '127.0.0.0 - 127.255.255.255', scope: 'Loopback Loop' };
    return { isPrivate: false, scope: 'Public IP (เชื่อมต่อตรงอินเทอร์เน็ตสาธารณะ)' };
  };

  // Preset IP addresses for demonstration
  const PRESETS = [
    { name: 'Class C (ทั่วไป)', ip: [192, 168, 1, 50], cidr: 24 },
    { name: 'Class A (Private)', ip: [10, 24, 150, 8], cidr: 8 },
    { name: 'Class B (Private)', ip: [172, 20, 4, 112], cidr: 16 },
    { name: 'Multicast Group', ip: [224, 0, 0, 251], cidr: 24 },
    { name: 'Loopback Local', ip: [127, 0, 0, 1], cidr: 8 },
    { name: 'APIPA Auto IP', ip: [169, 254, 88, 19], cidr: 16 }
  ];

  const applyPreset = (preset) => {
    setIpOctets(preset.ip);
    setCidr(preset.cidr);
  };

  // Derived calculations
  const ipBits = getIpBits();
  const maskBits = getMaskBits();
  const maskOctets = getMaskOctets();
  const netOctets = getNetworkOctets();
  const broadOctets = getBroadcastOctets();
  const firstUsable = getFirstUsableOctets(netOctets);
  const lastUsable = getLastUsableOctets(broadOctets);
  
  const ipClassInfo = getIpClass(ipOctets[0]);
  const ipTypeInfo = checkPrivateIp();

  // ─── Quiz Levels Config ───
  const QUIZ_LEVELS = [
    {
      title: 'ด่านที่ 1: วิเคราะห์ Network ID และ Host ID',
      desc: 'ที่อยู่ IP Address หมายเลข 192.168.10.45 พร้อม Subnet Mask 255.255.255.0 (/24) จะมีสัดส่วนของ Network ID และ Host ID ในรูปแบบข้อใด?',
      options: [
        { key: 'A', text: 'Network ID: 192.168.10.0 | Host ID: .45', isCorrect: true },
        { key: 'B', text: 'Network ID: 192.168.0.0 | Host ID: .10.45', isCorrect: false },
        { key: 'C', text: 'Network ID: 192.0.0.0 | Host ID: .168.10.45', isCorrect: false },
        { key: 'D', text: 'Network ID: 192.168.10.45 | Host ID: .0', isCorrect: false }
      ],
      tip: 'ซับเน็ตมาสก์ /24 (255.255.255.0) แปลว่ามีบิตของเครือข่าย 24 บิตแรก (3 Octets แรก) ส่วนที่เหลืออีก 8 บิตคือส่วนระบุเครื่องปลายทาง'
    },
    {
      title: 'ด่านที่ 2: จำแนกที่อยู่อินเทอร์เน็ตสาธารณะและส่วนตัว',
      desc: 'หากสำนักงานต้องการวางผัง IP Address ให้กับเครื่องลูกข่าย 150 เครื่องภายในวงแลนที่ไม่ได้ต่อเชื่อมออกสู่โลกอินเทอร์เน็ตตรง ๆ เพื่อความปลอดภัย หมายเลขไอพีข้อใดที่สามารถนำมาติดตั้งใช้งานเป็น Private IP ได้อย่างถูกต้องสากล?',
      options: [
        { key: 'A', text: '172.45.10.1', isCorrect: false },
        { key: 'B', text: '192.168.50.10', isCorrect: true },
        { key: 'C', text: '8.8.8.8', isCorrect: false },
        { key: 'D', text: '224.0.0.1', isCorrect: false }
      ],
      tip: 'Private IP Class C กำหนดช่วงสากลไว้คือ 192.168.0.0 ถึง 192.168.255.255 ส่วน 8.8.8.8 เป็น Public IP และ 224.0.0.1 เป็น Multicast IP'
    },
    {
      title: 'ด่านที่ 3: ถอดรหัสบิตคำนวณวงเครือข่าย',
      desc: 'ถ้าอุปกรณ์ระบบมีหมายเลข IP Address เป็น 172.16.85.120 และใช้ Subnet Mask เป็น 255.255.0.0 (/16) เมื่อนำมาคำนวณบิตตรรกะด้วย Bitwise AND จะได้ที่อยู่เครือข่าย (Network Address) ประจำวงแลนนี้เป็นหมายเลขใด?',
      options: [
        { key: 'A', text: '172.16.0.0', isCorrect: true },
        { key: 'B', text: '172.16.85.0', isCorrect: false },
        { key: 'C', text: '172.0.0.0', isCorrect: false },
        { key: 'D', text: '172.16.85.255', isCorrect: false }
      ],
      tip: 'บิตของ Subnet Mask คือ 1 ทั้งหมดใน 16 บิตแรก ทำให้ผลลัพธ์ AND จะดึงบิตของไอพี 2 Octets แรกไว้ทั้งหมด ส่วนที่เหลือกลายเป็น 0'
    }
  ];

  return (
    <div className="font-sans text-slate-800 pb-20 relative overflow-hidden">
      <CustomStyles />

      {/* ─── Layer 1: Ambient Background Blobs ─── */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-drift-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none animate-drift-blob" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-88 h-88 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-drift-blob" style={{ animationDelay: '6s' }}></div>
      <div className="absolute top-1/2 right-12 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none animate-drift-blob" style={{ animationDelay: '9s' }}></div>

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* Intro section: Fluid Open-Air Layout */}
        <div className="space-y-4">
          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ในการส่งข้อมูลบนเครือข่ายอินเทอร์เน็ต คอมพิวเตอร์จำเป็นต้องมีหมายเลขระบุตัวตนเฉพาะตัวที่ไม่ซ้ำกัน เรียกว่า <strong className="text-teal-600 font-semibold">IP Address (Internet Protocol Address)</strong> โดยมาตรฐาน IPv4 (เวอร์ชัน 4) เป็นโครงสร้างแรกเริ่มที่ยังคงนิยมใช้งานกันแพร่หลายในปัจจุบัน ซึ่งทำงานอยู่บนเลขฐานสองขนาด 32 บิต เพื่อช่วยให้อุปกรณ์ส่งสัญญาณข้อมูลข้ามพรมแดนได้อย่างมีระเบียบและแม่นยำ
          </p>

          <div className="p-5 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl border-l-[3.5px] border-l-teal-500 shadow-sm leading-relaxed">
            <span className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-1 block">💡 คำอธิบายเชิงเปรียบเทียบ (Real-World Analogy)</span>
            <p className="text-zinc-600 text-[14.5px] font-normal leading-relaxed">
              เปรียบเสมือน <strong>"ที่อยู่ทางไปรษณีย์"</strong>: หมายเลข IP Address จะมีสองส่วนประกอบอยู่เสมอ ส่วนแรกบอกให้ไปรษณีย์รู้ว่าต้องไปส่งที่ <strong className="text-slate-800 font-semibold">"หมู่บ้าน/ตำบลใด" (Network ID)</strong> และส่วนที่สองบอกเจาะลึกเฉพาะเจาะจงว่าคือ <strong className="text-slate-800 font-semibold">"บ้านเลขที่เท่าใด" (Host ID)</strong> ซับเน็ตมาสก์ก็เปรียบเสมือนกฎเกณฑ์ที่บอกว่า ตัวอักษรแถวใดระบุชื่อหมู่บ้าน และตัวอักษรหลักใดระบุตัวบ้าน
            </p>
          </div>
        </div>

        {/* ─── Section 1: โครงสร้างของหมายเลข IPv4 ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              โครงสร้างระดับพื้นฐานเครือข่าย
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างของหมายเลข IPv4 (IPv4 Address Structure)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            หมายเลข IPv4 ประกอบด้วยตัวเลขระบบฐานสองขนาด **32 บิต (32 bits)** ซึ่งสำหรับมนุษย์การจดจำตัวเลข 0 และ 1 จำนวน 32 ตัวติดต่อกันทำได้ยากมาก วิศวกรเครือข่ายจึงจัดรูปแบบการแสดงผลใหม่โดยแบ่งออกเป็น **4 ส่วนเท่าๆ กัน (เรียกว่า Octet)** ส่วนละ 8 บิต คั่นด้วยจุด และแปลงแต่ละส่วนเป็นเลขฐานสิบ (Dotted Decimal Notation)
          </p>

          {/* Visual card illustrating 32-bit Octet splitting */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 shadow-md">
            <div className="text-center font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">ตัวอย่างโครงสร้างหมายเลข IP Address: 192.168.1.1</div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {[
                { dec: '192', bin: '11000000', label: '1st Octet (8 บิต)' },
                { dec: '168', bin: '10101000', label: '2nd Octet (8 บิต)' },
                { dec: '1', bin: '00000001', label: '3rd Octet (8 บิต)' },
                { dec: '1', bin: '00000001', label: '4th Octet (8 บิต)' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex flex-col items-center gap-2">
                  <span className="text-[13px] font-bold text-slate-400 font-mono">{item.label}</span>
                  <div className="text-3xl font-extrabold text-teal-600 font-mono tracking-tight">{item.dec}</div>
                  <div className="font-mono text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200/50 shadow-inner tracking-widest">{item.bin}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400 font-medium">
              <Info className="w-4 h-4 text-teal-500" />
              <span>เนื่องจากแต่ละ Octet มีขนาด 8 บิต ค่าของตัวเลขฐานสิบในแต่ละชุดจึงไม่มีทางเกิน **0 ถึง 255** (2^8 = 256 ค่า)</span>
            </div>
          </div>
        </section>

        {/* ─── Section 2: ความสำคัญของ Network ID และ Host ID ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              การแบ่งขอบเขตตรรกะอุปกรณ์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ส่วนระบุเครือข่ายและเครื่องคอมพิวเตอร์ (Network ID vs Host ID)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            หมายเลข IP Address 1 หมายเลข ไม่ได้ทำงานโดดๆ แต่มีโครงสร้างสองส่วนที่คอยกำหนดบทบาทในการระบุตำแหน่ง:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel border-l-[3.5px] border-l-indigo-500 rounded-3xl p-6 hover:-translate-y-0.5 transition-all duration-300">
              <h4 className="text-lg font-bold text-indigo-700 flex items-center gap-2 mb-3">
                <Network className="w-5 h-5" /> Network ID (ส่วนระบุเครือข่าย)
              </h4>
              <p className="text-zinc-655 text-[14.5px] leading-relaxed font-semibold">
                ทำหน้าที่ระบุขอบเขตของ **"วงเครือข่าย"** หรือซับเน็ต อุปกรณ์ทุกชิ้นที่เชื่อมต่ออยู่ในวงแลนเดียวกัน **ต้องมีหมายเลข Network ID ที่เหมือนกันเป๊ะ** จึงจะสามารถรับส่งข้อมูลหากันได้โดยตรงโดยไม่ต้องอาศัยเราเตอร์นำส่ง
              </p>
            </div>

            <div className="glass-panel border-l-[3.5px] border-l-emerald-500 rounded-3xl p-6 hover:-translate-y-0.5 transition-all duration-300">
              <h4 className="text-lg font-bold text-emerald-700 flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5" /> Host ID (ส่วนระบุเครื่องคอมพิวเตอร์)
              </h4>
              <p className="text-zinc-655 text-[14.5px] leading-relaxed font-semibold">
                ทำหน้าที่ระบุเจาะจงตัวอุปกรณ์ปลายทาง (เช่น คอมพิวเตอร์, มือถือ, เครื่องพิมพ์) ที่ทำงานอยู่ภายใต้วงเครือข่ายนั้นๆ อุปกรณ์แต่ละชิ้นในวงแลนเดียวกัน **ต้องมีหมายเลข Host ID ที่ห้ามซ้ำกันอย่างเด็ดขาด** เพื่อป้องกัน IP ชนกัน
              </p>
            </div>
          </div>
        </section>

        {/* ─── Section 3: ตัวจำลองการบิตไวส์แอนด์และวิเคราะห์ไอพี (Simulator) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ตัวจำลองระบบคำนวณและวิเคราะห์บิต
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องมือจำลองแยกส่วนไอพีและบิตตรรกะ (Interactive IPv4 Bitwise Analyzer)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองป้อนหมายเลข IP Address หรือปรับเลือกค่าซับเน็ตมาสก์ด้วยสไลเดอร์เพื่อสังเกตการคำนวณ **Bitwise AND** ซึ่งเป็นกลไกตรรกะที่คอมพิวเตอร์และเราเตอร์ใช้ในการแยกดึง Network ID ออกมาจากตัวเลขไอพี
          </p>

          {/* SIMULATOR SHELL - DARK PANEL */}
          <div className="dark-panel-left rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Top Right Label */}
            <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">// BITWISE_ANALYSIS_LAB</span>
            
            <div className="relative z-10 flex flex-col gap-8">
              
              {/* Preset selectors row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ตัวอย่างหมายเลข IP:</span>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(p)}
                    className="px-3 py-1.5 bg-slate-855 hover:bg-slate-750 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 cursor-pointer hover:scale-[1.02] active:scale-98 transition-all duration-200 animate-none"
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Grid 12 - Inputs and Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Interactive inputs - Span 4 */}
                <div className="lg:col-span-4 bg-slate-950/50 p-5 rounded-2xl border border-slate-850 flex flex-col gap-5">
                  <div className="border-b border-slate-850 pb-2">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-teal-400" /> แผงควบคุม (Controls)
                    </h4>
                  </div>

                  {/* IP Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ip-address-input" className="text-xs font-bold text-slate-350 uppercase tracking-wide">ป้อน IP Address (เลขฐานสิบ):</label>
                    <input
                      id="ip-address-input"
                      type="text"
                      value={ipInputStr}
                      onChange={handleIpInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                    {ipError && (
                      <span className="text-[11px] font-semibold text-rose-400 leading-tight mt-0.5">{ipError}</span>
                    )}
                  </div>

                  {/* Subnet Slider */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-350 uppercase tracking-wide">
                      <label htmlFor="cidr-prefix-slider">ซับเน็ตมาสก์ (CIDR):</label>
                      <span className="text-teal-400 font-mono text-sm">/{cidr}</span>
                    </div>
                    
                    <input
                      id="cidr-prefix-slider"
                      type="range"
                      min="8"
                      max="30"
                      value={cidr}
                      onChange={(e) => setCidr(parseInt(e.target.value, 10))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-slate-500 font-bold font-mono">
                      <span>/8 (Class A)</span>
                      <span>/16 (Class B)</span>
                      <span>/24 (Class C)</span>
                      <span>/30</span>
                    </div>
                  </div>

                  {/* Info badges */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col gap-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-850">
                      <span className="text-slate-400 font-semibold">Subnet Mask (Decimal):</span>
                      <span className="text-teal-300 font-mono font-bold">{maskOctets.join('.')}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-850">
                      <span className="text-slate-400 font-semibold">ระดับคลาส (Class):</span>
                      <span className="text-indigo-400 font-bold">{ipClassInfo.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400 font-semibold">ประเภทขอบเขต:</span>
                      <span className={`font-bold ${ipTypeInfo.isPrivate ? 'text-emerald-400' : ipTypeInfo.isLinkLocal || ipTypeInfo.isLoopback ? 'text-amber-400' : 'text-sky-400'}`}>
                        {ipTypeInfo.scope}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Bitwise calculations and display - Span 8 */}
                <div className="lg:col-span-8 bg-slate-950/70 p-6 rounded-2xl border border-slate-850 flex flex-col gap-6">
                  <div className="border-b border-slate-850 pb-2">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Binary className="w-4 h-4 text-cyan-400" /> ตารางวิเคราะห์บิต 32-Bit (Bitwise Operator Table)
                    </h4>
                  </div>

                  {/* Click to Toggle tip */}
                  <div className="text-[11px] font-semibold text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                    💡 **เคล็ดลับ**: คุณสามารถ **คลิกเมาส์ที่กล่องบิต (เลข 0 หรือ 1)** ในแถว IP Address ด้านล่างเพื่อทำการ **สลับค่าบิต (Toggle Bit)** พลิกเลขฐานสิบและตรรกะได้โดยตรง!
                  </div>

                  {/* 32-Bit Grid with Boundary Line */}
                  <div className="overflow-x-auto pb-4">
                    <div className="min-w-[700px] flex flex-col gap-4 font-mono select-none relative">
                      
                      {/* Label Row */}
                      <div className="grid gap-1 text-[8.5px] text-slate-500 font-bold text-center" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
                        {Array.from({ length: 32 }).map((_, i) => (
                          <div key={i} className={i % 8 === 0 ? 'text-teal-400' : ''}>
                            {i + 1}
                          </div>
                        ))}
                      </div>

                      {/* Row 1: IP Address Bits */}
                      <div className="grid gap-1 items-center relative" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
                        <div className="absolute -left-20 text-[10px] text-slate-400 font-bold">IP Address</div>
                        {ipBits.map((bit, idx) => {
                          const isNetworkBit = idx < cidr;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleToggleIpBit(idx)}
                              className={`h-7 rounded-md font-bold text-xs flex items-center justify-center cursor-pointer border transition-all hover:scale-105
                                ${isNetworkBit 
                                  ? 'bg-indigo-950 text-indigo-400 border-indigo-500/45 hover:border-indigo-400' 
                                  : 'bg-slate-900 text-slate-400 border-slate-750 hover:border-slate-500'
                                }`}
                              title={`คลิกเพื่อสลับบิตที่ ${idx + 1}`}
                            >
                              {bit}
                            </button>
                          );
                        })}
                      </div>

                      {/* Row 2: Subnet Mask Bits */}
                      <div className="grid gap-1 items-center relative" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
                        <div className="absolute -left-20 text-[10px] text-slate-400 font-bold">Subnet Mask</div>
                        {maskBits.map((bit, idx) => {
                          return (
                            <div
                              key={idx}
                              className={`h-7 rounded-md font-bold text-xs flex items-center justify-center border
                                ${bit === 1 
                                  ? 'bg-teal-950 text-teal-400 border-teal-500/40' 
                                  : 'bg-slate-900 text-slate-600 border-slate-850'
                                }`}
                            >
                              {bit}
                            </div>
                          );
                        })}
                      </div>

                      {/* Operator Symbol Row */}
                      <div className="grid gap-1 text-[8px] text-slate-600 text-center select-none relative h-2" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
                        <div className="absolute -left-20 text-[9px] text-slate-600 font-bold">AND (&)</div>
                        {Array.from({ length: 32 }).map((_, i) => (
                          <div key={i} className="font-bold">
                            &
                          </div>
                        ))}
                      </div>

                      {/* Row 3: Network ID Bits */}
                      <div className="grid gap-1 items-center relative" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
                        <div className="absolute -left-20 text-[10px] text-slate-400 font-bold">Network ID</div>
                        {ipBits.map((ipBit, idx) => {
                          const maskBit = maskBits[idx];
                          const resultBit = ipBit & maskBit;
                          const isNetworkBit = idx < cidr;
                          
                          return (
                            <div
                              key={idx}
                              className={`h-7 rounded-md font-bold text-xs flex items-center justify-center border
                                ${isNetworkBit 
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/45' 
                                  : 'bg-slate-900/30 text-slate-700 border-slate-900'
                                }`}
                            >
                              {resultBit}
                            </div>
                          );
                        })}
                      </div>

                      {/* Dynamic vertical slider boundary line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-rose-500/80 pointer-events-none transition-all duration-300"
                        style={{ 
                          left: `calc((${cidr} / 32) * 100% - 1.5px)`
                        }}
                      >
                        <div className="absolute top-[-15px] -translate-x-1/2 bg-rose-500 text-[8px] px-1 py-0.5 rounded text-white font-bold tracking-wide uppercase whitespace-nowrap z-20">
                          ขอบเขต Net | Host (/{cidr})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculations Result Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-900">
                    <div className="space-y-2.5">
                      <div className="text-xs text-slate-450 font-bold uppercase tracking-wider">ผลลัพธ์เครือข่าย (Network Parameters):</div>
                      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-850 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">Network Address:</span>
                          <span className="text-emerald-400 font-mono font-bold">{netOctets.join('.')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">Broadcast Address:</span>
                          <span className="text-rose-400 font-mono font-bold">{broadOctets.join('.')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="text-xs text-slate-450 font-bold uppercase tracking-wider">โฮสต์แอดเดรสใช้งานได้ (Host Address Range):</div>
                      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-850 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">ไอพีแรกสุด (First Usable):</span>
                          <span className="text-sky-300 font-mono font-bold">{firstUsable.join('.')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">ไอพีสุดท้าย (Last Usable):</span>
                          <span className="text-sky-300 font-mono font-bold">{lastUsable.join('.')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total hosts count */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-850 text-xs">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-teal-400" />
                      <span className="text-slate-350 font-semibold">จำนวนอุปกรณ์สูงสุดในวง (Usable Hosts Limit):</span>
                    </div>
                    <span className="text-white font-mono text-sm font-extrabold bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      {(cidr >= 31) ? 0 : (Math.pow(2, 32 - cidr) - 2).toLocaleString()} เครื่อง
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ─── Section 4: การจัดแบ่งประเภทระดับโครงข่าย (IP Classes & Private Ranges) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ชั้นคลาสและช่วงแอดเดรสใช้งาน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คลาสของไอพี (IPv4 Classes) และหมายเลขส่วนตัว (Private IP Address)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ในยุคแรกเริ่มของอินเทอร์เน็ต เพื่อจัดการหมายเลขไอพีที่ส่งต่อให้ทั่วโลกใช้ได้สะดวก จึงมีการแบ่งกลุ่มไอพีตามระบบ **Class-based Addressing** เพื่อความมีระเบียบดังนี้:
          </p>

          {/* Cards Grid for Class A, B, C */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                className: 'Class A',
                range: '1.0.0.0 - 126.255.255.255',
                mask: '255.0.0.0 (/8)',
                color: 'border-l-teal-500',
                accentColor: 'text-teal-700 bg-teal-50 border-teal-100',
                desc: 'บิตแรกสุดของ Octet ที่ 1 เป็น 0 เสมอ เหมาะกับองค์กรขนาดใหญ่ระดับโลกเพราะรองรับโฮสต์ได้สูงถึง 16.7 ล้านเครื่องต่อเครือข่าย'
              },
              {
                className: 'Class B',
                range: '128.0.0.0 - 191.255.255.255',
                mask: '255.255.0.0 (/16)',
                color: 'border-l-indigo-500',
                accentColor: 'text-indigo-700 bg-indigo-50 border-indigo-100',
                desc: 'บิตแรกสุดเป็น 10 เสมอ เหมาะกับมหาวิทยาลัย องค์กรรัฐวิสาหกิจขนาดใหญ่ รองรับโฮสต์ได้สูงสุด 65,534 เครื่องต่อเครือข่าย'
              },
              {
                className: 'Class C',
                range: '192.0.0.0 - 223.255.255.255',
                color: 'border-l-cyan-500',
                mask: '255.255.255.0 (/24)',
                accentColor: 'text-cyan-700 bg-cyan-50 border-cyan-100',
                desc: 'บิตแรกสุดเป็น 110 เสมอ เหมาะกับสำนักงานขนาดกลางถึงเล็ก หรือบ้านเรือนทั่วไป รองรับอุปกรณ์ในเครือข่ายได้สูงสุด 254 เครื่อง'
              }
            ].map((c, idx) => (
              <div 
                key={idx}
                className={`group bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-[3.5px] ${c.color} cursor-default`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-extrabold text-slate-400">CLASS TYPE</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border tracking-wide uppercase ${c.accentColor}`}>
                      Mask: {c.mask.split(' ')[1]}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 leading-tight">{c.className}</h4>
                    <span className="text-xs font-mono font-bold text-slate-500">{c.range}</span>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed min-h-[72px]">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            นอกจากนี้ยังมี **Class D (224.0.0.0 - 239.255.255.255)** สำหรับงานส่งกลุ่มข้อมูลหลายปลายทาง (Multicast) และ **Class E (240.0.0.0 - 255.255.255.255)** ที่สงวนไว้เพื่อการวิจัยทางวิชาการ
          </p>

          {/* Public vs Private IP side-by-side section */}
          <div className="border-t border-zinc-200/80 pt-6 space-y-4">
            <h4 className="text-[18px] font-bold text-zinc-850">ไอพีจริง (Public IP) ปะทะ ไอพีส่วนตัว (Private IP)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="bg-white/60 rounded-3xl p-6 border border-white/50 shadow-sm flex flex-col justify-between cursor-default">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold rounded-full">
                    <Globe className="w-3.5 h-3.5" /> Public IP Address
                  </div>
                  <p className="text-zinc-655 text-[14.5px] leading-relaxed font-semibold">
                    คือหมายเลขไอพีที่ได้รับการรับรองจากหน่วยงานสากลเพื่อเชื่อมต่อใช้ออกสู่โครงข่ายอินเทอร์เน็ตสาธารณะตรงๆ โดยห้ามซ้ำกันเลยในระบบโลก
                  </p>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li className="flex items-start gap-1">
                      <span className="text-sky-500">✓</span> 
                      <span>ใช้สำหรับเว็บเซิร์ฟเวอร์, อีเมลเซิร์ฟเวอร์, หรือเราเตอร์ทางผ่านหลักปลายทาง</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-sky-500">✓</span> 
                      <span>ต้องทำการจดทะเบียนเช่าซื้อกับผู้ให้บริการอินเทอร์เน็ต (ISP)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/60 rounded-3xl p-6 border border-white/50 shadow-sm flex flex-col justify-between cursor-default">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                    <Lock className="w-3.5 h-3.5" /> Private IP Address
                  </div>
                  <p className="text-zinc-655 text-[14.5px] leading-relaxed font-semibold">
                    คือหมายเลขที่สงวนไว้สำหรับใช้วางผังระบบคอมพิวเตอร์และเชื่อมต่อสื่อสารภายในบ้านหรือองค์กรอย่างอิสระ โดยไม่มีการสื่อสารออกสู่โลกภายนอกหากปราศจาก NAT
                  </p>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-500">✓</span> 
                      <span>ช่วงที่ระบุคือ: 10.x.x.x (คลาส A), 172.16-31.x.x (คลาส B), 192.168.x.x (คลาส C)</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-500">✓</span> 
                      <span>ช่วยประหยัดหมายเลข Public IP และตัดสัญญาณความมั่นคงภัยคุกคามภายนอก</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Section 5: QuizEngine Gamification ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              แบบประเมินความรอบรู้ท้ายการเรียน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบประเมินทักษะโครงสร้าง IP Address (Interactive Quiz Challenge)
            </h3>
          </div>
          
          <QuizEngine 
            title="เกมไขรหัสไอพีแอดเดรส (IP Addressing Quiz)"
            description="ประเมินความเข้าใจด้าน Network ID, Host ID, IP Classes และการวิเคราะห์คำนวณบิตซับเน็ต"
            levels={QUIZ_LEVELS}
            accentColor="from-teal-600/20 to-indigo-500/10"
            icon={<Network className="w-8 h-8 text-teal-400" />}
          />
        </section>

        {/* ─── Section 6: Standardized TeacherTask Footer ─── */}
        <TeacherTask 
          title="กิจกรรมปฏิบัติการ: วางผังการจ่าหน้าหมายเลขที่อยู่ไอพี (IT IP Addressing Plan Sheet)"
          taskText={`คำชี้แจง: ให้นักเรียนสวมบทบาทเป็น วิศวกรผู้ออกแบบระบบเครือข่าย (Network System Engineer) ทำการเขียนแผนการจ่าหน้าหมายเลขไอพีให้กับสำนักงานสาขา โดยตอบคำถามและทำงานส่งดังต่อไปนี้:

1. แผนงานออกแบบโครงสร้าง Private IP (IPv4 Network Layout Design):
   สมมติว่าแผนกจัดซื้อของบริษัทต้องการจัดระเบียบเครือข่ายภายในแผนกที่มีเครื่องลูกข่าย (Client Computer) จำนวน 80 เครื่อง และเครื่องพิมพ์เครือข่าย (Network Printer) 5 เครื่อง ให้ตอบคำถาม:
   - นักเรียนจะเลือกใช้โครงสร้าง IP Address ในระดับคลาส (Class) ใดที่เหมาะสมที่สุด? เพราะเหตุใดจึงเลือกคลาสนั้น?
   - จงเขียนเสนอหมายเลข Network Address (วงเครือข่ายหลัก) และซับเน็ตมาสก์ (Subnet Mask) ที่เหมาะสมกับการจ่าหน้านี้ในรูปแบบ CIDR และเลขฐานสิบ
   - ระบุช่วงหมายเลขไอพีใช้งานได้ที่เป็นไปได้ (First Usable IP และ Last Usable IP) สำหรับอุปกรณ์ทั้งหมดในห้องแผนกนี้

2. การวิเคราะห์ที่อยู่ IP (IP Address Breakdown Analysis):
   กำหนดหมายเลขไอพีมาให้ดังนี้: "10.150.22.45"
   - จงอธิบายว่าเป็นหมายเลข IP ประเภทใด (Public IP หรือ Private IP)?
   - จากดีฟอลต์ซับเน็ตมาสก์ของคลาสนี้ ส่วนใดคือ Network ID และส่วนใดคือ Host ID?
   - เมื่อทำการแปลงค่า Octet แรกไปเป็นเลขฐานสอง จะได้ค่าตัวเลขบิตในรูปแบบข้อใด? 

3. วิเคราะห์ความเข้าใจบิตตรรกะ (Bitwise Reasoning):
   - ทำไมคอมพิวเตอร์และอุปกรณ์นำส่งสัญญาณ (เช่น Router, Switch L3) จึงไม่มองตัวเลขไอพีในแบบเลขฐานสิบ (เช่น 192.168.1.1) แต่ต้องมองเป็นเลขฐานสอง 32 บิตในการค้นหาเส้นทาง? จงอธิบายความสำคัญของการคำนวณ Bitwise AND ในการค้นหาซับเน็ตแอดเดรสปลายทาง`}
        />

      </main>
    </div>
  );
}
