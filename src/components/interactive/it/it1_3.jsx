import React, { useState } from 'react';
import { 
  Globe2, 
  Building2, 
  Home, 
  Smartphone, 
  Server, 
  Users, 
  Monitor, 
  Database,
  ShieldCheck,
  Zap,
  AlertTriangle,
  MapPin,
  Laptop,
  Headphones,
  Watch,
  Router,
  Cloud,
  Radio
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    /* Existing Animations */
    @keyframes data-flow-center {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translateY(60px) scale(0.5); opacity: 0; }
    }
    @keyframes data-flow-diagonal-left {
      0% { transform: translate(0, 0) scale(1); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translate(-50px, 60px) scale(0.5); opacity: 0; }
    }
    @keyframes data-flow-diagonal-right {
      0% { transform: translate(0, 0) scale(1); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translate(50px, 60px) scale(0.5); opacity: 0; }
    }
    @keyframes p2p-flow-1 {
      0% { left: 10%; top: 20%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { left: 90%; top: 20%; opacity: 0; }
    }
    @keyframes p2p-flow-2 {
      0% { left: 90%; top: 20%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { left: 50%; top: 80%; opacity: 0; }
    }
    @keyframes p2p-flow-3 {
      0% { left: 50%; top: 80%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { left: 10%; top: 20%; opacity: 0; }
    }
    @keyframes blob-drift {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(20px, -20px) scale(1.05); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes dash {
      to { stroke-dashoffset: -160; }
    }

    .animate-cs-center { animation: data-flow-center 2s infinite cubic-bezier(0.4, 0, 0.2, 1); }
    .animate-cs-left { animation: data-flow-diagonal-left 2s infinite cubic-bezier(0.4, 0, 0.2, 1) 0.5s; }
    .animate-cs-right { animation: data-flow-diagonal-right 2s infinite cubic-bezier(0.4, 0, 0.2, 1) 1s; }
    .animate-p2p-1 { animation: p2p-flow-1 2s infinite linear; }
    .animate-p2p-2 { animation: p2p-flow-2 2s infinite linear 0.6s; }
    .animate-p2p-3 { animation: p2p-flow-3 2s infinite linear 1.2s; }
    .animate-drift { animation: blob-drift 12s ease-in-out infinite; }
    .animate-dash-flow { animation: dash 3s linear infinite; }

    /* New Simulator Animations */
    @keyframes sim-orbit {
      0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
    }
    @keyframes sim-orbit-reverse {
      0% { transform: rotate(180deg) translateX(60px) rotate(-180deg); }
      100% { transform: rotate(540deg) translateX(60px) rotate(-540deg); }
    }

    .animate-sim-orbit { animation: sim-orbit 4s infinite linear; }
    .animate-sim-orbit-rev { animation: sim-orbit-reverse 4s infinite linear; }

    .sim-grid-bg {
      background-size: 30px 30px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }
  `}} />
);

const NetworkSimulator = ({ scale }) => {
  switch (scale) {
    case 'PAN':
      return (
        <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-700 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 left-4 text-xs font-mono text-pink-400 opacity-70 tracking-wider">SIMULATOR: PAN (PERSONAL AREA NETWORK)</div>
          
          {/* Center Device */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            <Smartphone className="w-8 h-8 text-pink-400" />
            
            {/* Bluetooth Waves */}
            <div className="absolute inset-0 border-2 border-pink-400 rounded-full animate-ping opacity-60"></div>
          </div>

          {/* Orbiting Peripherals */}
          <div className="absolute z-20 animate-sim-orbit">
            <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shadow-lg">
              <Headphones className="w-5 h-5 text-pink-300" />
            </div>
          </div>
          <div className="absolute z-20 animate-sim-orbit-rev">
            <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shadow-lg">
              <Watch className="w-5 h-5 text-pink-300" />
            </div>
          </div>
        </div>
      );
    case 'LAN':
      return (
        <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-700 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 left-4 text-xs font-mono text-emerald-400 opacity-70 tracking-wider">SIMULATOR: LAN (LOCAL AREA NETWORK)</div>
          
          {/* Central Switch */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-emerald-500/20 rounded-xl border border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Server className="w-7 h-7 text-emerald-400" />
          </div>

          {/* Connecting Cables */}
          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="20" y1="25" x2="50" y2="50" stroke="#047857" strokeWidth="0.8" strokeDasharray="1.5" />
            <line x1="80" y1="25" x2="50" y2="50" stroke="#047857" strokeWidth="0.8" strokeDasharray="1.5" />
            <line x1="50" y1="80" x2="50" y2="50" stroke="#047857" strokeWidth="0.8" strokeDasharray="1.5" />
          </svg>

          {/* Data Packets */}
          <div className="absolute top-[37%] left-[35%] w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping z-30 shadow-[0_0_8px_rgba(52,211,153,1)]"></div>
          <div className="absolute top-[37%] left-[65%] w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping z-30 shadow-[0_0_8px_rgba(45,212,191,1)]" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-[65%] left-[50%] w-2.5 h-2.5 bg-green-400 rounded-full animate-ping z-30 shadow-[0_0_8px_rgba(74,222,128,1)]" style={{animationDelay: '0.6s'}}></div>

          {/* PCs */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <Monitor className="w-6 h-6 text-slate-350" />
          </div>
          <div className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <Laptop className="w-6 h-6 text-slate-350" />
          </div>
          <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <Monitor className="w-6 h-6 text-slate-355" />
          </div>
        </div>
      );
    case 'MAN':
      return (
        <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 left-4 text-xs font-mono text-blue-400 opacity-70 tracking-wider">SIMULATOR: MAN (METROPOLITAN AREA NETWORK)</div>
          
          {/* Main ISP Router */}
          <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-blue-500/20 rounded-full border border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)]">
            <Router className="w-8 h-8 text-blue-400" />
          </div>

          {/* Fiber Lines */}
          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 20 50 Q 50 20 80 25" fill="none" stroke="#1e3a8a" strokeWidth="1" />
            <path d="M 20 50 Q 50 80 80 75" fill="none" stroke="#1e3a8a" strokeWidth="1" />
            
            {/* Animated Fiber Light */}
            <path d="M 20 50 Q 50 20 80 25" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="10 150" className="animate-dash-flow" />
            <path d="M 20 50 Q 50 80 80 75" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="10 150" className="animate-dash-flow" style={{animationDelay: '1s'}} />
          </svg>

          {/* City Buildings */}
          <div className="absolute top-1/4 left-[80%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 shadow-md">
              <Building2 className="w-8 h-8 text-blue-300" />
            </div>
            <span className="text-[10px] text-slate-400 mt-2 bg-slate-800 px-1.5 py-0.5 rounded font-mono">Branch A</span>
          </div>
          <div className="absolute top-3/4 left-[80%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 shadow-md">
              <Building2 className="w-8 h-8 text-blue-300" />
            </div>
            <span className="text-[10px] text-slate-400 mt-2 bg-slate-800 px-1.5 py-0.5 rounded font-mono">Branch B</span>
          </div>
        </div>
      );
    case 'WAN':
      return (
        <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-700 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 left-4 text-xs font-mono text-purple-400 opacity-70 tracking-wider">SIMULATOR: WAN (WIDE AREA NETWORK)</div>
          
          {/* Internet Cloud Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-16 bg-purple-900/40 rounded-full border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-sm">
            <Cloud className="w-10 h-10 text-purple-400" />
          </div>

          {/* Satellite and Waves */}
          <div className="absolute top-[12%] left-[50%] -translate-x-1/2 z-10 opacity-75">
             <Radio className="w-6 h-6 text-slate-450" />
             <div className="absolute inset-0 border border-slate-500 rounded-full animate-ping"></div>
          </div>

          {/* Global Connections */}
          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Satellite links */}
            <line x1="20" y1="50" x2="50" y2="15" stroke="#6b21a8" strokeWidth="0.5" strokeDasharray="1 2" />
            <line x1="80" y1="50" x2="50" y2="15" stroke="#6b21a8" strokeWidth="0.5" strokeDasharray="1 2" />
            {/* Submarine cables */}
            <path d="M 20 50 Q 50 80 80 50" fill="none" stroke="#581c87" strokeWidth="1" />
            <path d="M 20 50 Q 50 80 80 50" fill="none" stroke="#d8b4fe" strokeWidth="0.5" strokeDasharray="5 200" className="animate-dash-flow" />
          </svg>

          {/* Globes (Continents) */}
          <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative bg-slate-800 p-2 rounded-xl border border-slate-700 shadow-lg">
              <Globe2 className="w-8 h-8 text-indigo-300" />
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-md"></div>
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded whitespace-nowrap font-mono">New York</span>
          </div>
          
          <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative bg-slate-800 p-2 rounded-xl border border-slate-700 shadow-lg">
              <Globe2 className="w-8 h-8 text-indigo-300" />
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-md"></div>
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded whitespace-nowrap font-mono">Bangkok</span>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function IT1_3() {
  const [activeScale, setActiveScale] = useState('LAN');
  const [isAnimatingScale, setIsAnimatingScale] = useState(false);

  const handleScaleChange = (scale) => {
    if (scale === activeScale) return;
    setIsAnimatingScale(true);
    setTimeout(() => {
      setActiveScale(scale);
      setIsAnimatingScale(false);
    }, 250);
  };

  const networkScales = {
    PAN: {
      name: 'PAN (Personal Area Network)',
      thaiName: 'เครือข่ายส่วนบุคคล',
      icon: <Smartphone className="w-8 h-8" />,
      colorName: 'pink',
      borderActive: 'border-pink-500',
      bgActive: 'bg-pink-500',
      bgLight: 'bg-pink-50',
      textActive: 'text-pink-600',
      textColorClass: 'text-pink-700',
      badgeClass: 'bg-pink-100 text-pink-700',
      distance: 'ระยะ 1 - 10 เมตร',
      desc: 'เครือข่ายขนาดเล็กที่สุด ใช้เชื่อมต่ออุปกรณ์ส่วนตัวที่อยู่ใกล้กันมากๆ มักใช้เทคโนโลยีไร้สาย เช่น Bluetooth เชื่อมต่อหูฟังกับสมาร์ทโฟน',
      examples: 'Bluetooth, NFC, การปล่อย Hotspot มือถือ'
    },
    LAN: {
      name: 'LAN (Local Area Network)',
      thaiName: 'เครือข่ายท้องถิ่น',
      icon: <Home className="w-8 h-8" />,
      colorName: 'emerald',
      borderActive: 'border-emerald-500',
      bgActive: 'bg-emerald-500',
      bgLight: 'bg-emerald-50',
      textActive: 'text-emerald-600',
      textColorClass: 'text-emerald-700',
      badgeClass: 'bg-emerald-100 text-emerald-700',
      distance: 'ระยะ 10 เมตร - 1 กิโลเมตร',
      desc: 'เครือข่ายที่นิยมใช้มากที่สุด ครอบคลุมพื้นที่จำกัด เช่น ภายในห้อง อาคาร สำนักงาน หรือบ้าน นิยมใช้สาย UTP (สายแลน) หรือ Wi-Fi',
      examples: 'เครือข่ายในห้องเรียน, ออฟฟิศ, เครือข่าย Wi-Fi ในบ้าน'
    },
    MAN: {
      name: 'MAN (Metropolitan Area Network)',
      thaiName: 'เครือข่ายระดับเมือง',
      icon: <Building2 className="w-8 h-8" />,
      colorName: 'blue',
      borderActive: 'border-blue-500',
      bgActive: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textActive: 'text-blue-600',
      textColorClass: 'text-blue-700',
      badgeClass: 'bg-blue-100 text-blue-700',
      distance: 'ระยะ 1 - 50 กิโลเมตร',
      desc: 'เครือข่ายที่เชื่อมโยง LAN หลายๆ วงเข้าด้วยกัน ครอบคลุมระดับเมืองหรือวิทยาเขต มักใช้สาย Fiber Optic ที่มีความเร็วสูงในการเชื่อมต่อ',
      examples: 'เครือข่ายเคเบิลทีวีท้องถิ่น, เครือข่ายระหว่างตึกในมหาวิทยาลัย'
    },
    WAN: {
      name: 'WAN (Wide Area Network)',
      thaiName: 'เครือข่ายระดับประเทศ/โลก',
      icon: <Globe2 className="w-8 h-8" />,
      colorName: 'purple',
      borderActive: 'border-purple-500',
      bgActive: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textActive: 'text-purple-600',
      textColorClass: 'text-purple-700',
      badgeClass: 'bg-purple-100 text-purple-700',
      distance: 'ข้ามประเทศ - ทั่วโลก',
      desc: 'เครือข่ายขนาดใหญ่ที่สุด เชื่อมต่อคอมพิวเตอร์และเครือข่ายย่อยๆ ทั่วโลกเข้าด้วยกัน อาศัยผู้ให้บริการสื่อสาร (ISP), ดาวเทียม หรือสายเคเบิลใต้น้ำ',
      examples: 'อินเทอร์เน็ต (Internet), เครือข่ายธนาคารที่มีสาขาทั่วโลก'
    }
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative overflow-hidden">
      <CustomStyles />
      
      {/* ─── Layer 1: Ambient Backdrop & 4 Blobs ─── */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-drift animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift animation-delay-4000 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-88 h-88 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift animation-delay-2000 pointer-events-none"></div>

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section 1: Network Scale */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ประเภทเครือข่ายตามขนาดพื้นที่
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ประเภทเครือข่ายคอมพิวเตอร์ (Network Scale Types)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ระบบเครือข่ายถูกแบ่งประเภทตาม <strong className="text-emerald-600 font-semibold">ระยะทางและขอบเขตทางภูมิศาสตร์</strong> ตั้งแต่ระดับอุปกรณ์ใกล้ตัวไปจนถึงโครงข่ายเชื่อมสัญญาณครอบคลุมทั่วโลก
          </p>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Left: Interactive Selectors */}
            <div className="lg:w-1/3 flex flex-col gap-3">
              {Object.keys(networkScales).map((key) => (
                <button
                  key={key}
                  onClick={() => handleScaleChange(key)}
                  className={`network-btn relative p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 border-2 overflow-hidden cursor-pointer w-full text-left
                    ${activeScale === key 
                      ? `${networkScales[key].borderActive} bg-white shadow-md scale-[1.02]` 
                      : 'border-slate-100 bg-white/50 hover:bg-white hover:border-slate-200 hover:scale-[1.01]'}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${activeScale === key ? 'from-emerald-50/30' : 'from-transparent'} to-transparent opacity-0 transition-opacity duration-300 ${activeScale === key ? 'opacity-100' : ''}`}></div>
                  
                  <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-white ${networkScales[key].bgActive} shadow-inner shrink-0`}>
                    {networkScales[key].icon}
                  </div>
                  <div className="relative z-10 text-left">
                    <h3 className={`font-bold text-lg ${activeScale === key ? networkScales[key].textActive : 'text-slate-700'}`}>
                      {key}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{networkScales[key].thaiName}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Dynamic Display Panel with Simulator */}
            <div className="lg:w-2/3">
              <div className={`glass-panel rounded-3xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden shadow-lg border-l-[6px] transition-all duration-350 ${networkScales[activeScale].borderActive}`}>
                
                <div className={`relative z-10 flex flex-col h-full transition-all duration-300 transform ${isAnimatingScale ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                  
                  {/* Information Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${networkScales[activeScale].textColorClass}`}>
                        {networkScales[activeScale].name}
                      </h3>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs ${networkScales[activeScale].badgeClass} border border-white/20 shadow-sm`}>
                        <Zap className="w-3.5 h-3.5" /> 
                        <span>ระยะ: {networkScales[activeScale].distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual Simulator Area */}
                  <div className="mb-6">
                     <NetworkSimulator scale={activeScale} />
                  </div>
                  
                  {/* Details Footer */}
                  <div className="mt-auto grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">คำอธิบาย</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {networkScales[activeScale].desc}
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-4 border border-white/80 shadow-sm">
                      <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">ตัวอย่างการใช้งาน</h4>
                      <p className="text-slate-800 font-semibold text-sm leading-relaxed">{networkScales[activeScale].examples}</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Section 2: Network Architecture */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              สถาปัตยกรรมระบบเครือข่าย
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สถาปัตยกรรมเครือข่าย (Network Architecture)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            รูปแบบการจัดระเบียบและกำหนดบทบาทหน้าที่ของคอมพิวเตอร์แต่ละเครื่องในระบบโครงข่ายในการแลกเปลี่ยนข้อมูล
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Client-Server Architecture */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2.5rem] p-8 flex flex-col relative group border-l-[6px] border-l-blue-500 hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-transparent rounded-[2.5rem] pointer-events-none"></div>
              
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <Server className="text-blue-600 w-7 h-7" />
                  แบบพึ่งพาเครื่องแม่ข่าย <span className="text-lg font-normal text-slate-500">(Client-Server)</span>
                </h3>
                <p className="text-slate-500 text-[14.5px] leading-relaxed">
                  มีเครื่องคอมพิวเตอร์แม่ข่าย (Server) ทำหน้าที่ประมวลผล จัดเก็บข้อมูล และให้บริการทรัพยากรส่วนกลางแก่เครื่องลูกข่าย (Clients)
                </p>
              </div>

              {/* Animation Box */}
              <div className="bg-slate-50/80 rounded-3xl h-64 border border-slate-100 shadow-inner relative flex justify-center items-center overflow-hidden mb-8">
                
                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="50" y1="30" x2="50" y2="80" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="30" x2="20" y2="80" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="30" x2="80" y2="80" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                </svg>

                {/* Server (Top Center) */}
                <div className="absolute top-[15%] w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 z-20 group-hover:animate-float">
                  <Database className="w-8 h-8" />
                </div>

                {/* Data Packets (Animated) */}
                <div className="absolute top-[30%] w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)] z-10 animate-cs-center"></div>
                <div className="absolute top-[30%] w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10 animate-cs-left"></div>
                <div className="absolute top-[30%] w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)] z-10 animate-cs-right"></div>

                {/* Clients (Bottom) */}
                <div className="absolute bottom-[10%] left-[20%] -translate-x-1/2 w-12 h-12 bg-white border border-slate-200 text-slate-500 rounded-xl flex items-center justify-center z-20 shadow-sm">
                  <Laptop className="w-6 h-6" />
                </div>
                <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-12 h-12 bg-white border border-slate-200 text-slate-500 rounded-xl flex items-center justify-center z-20 shadow-sm">
                  <Monitor className="w-6 h-6" />
                </div>
                <div className="absolute bottom-[10%] left-[80%] -translate-x-1/2 w-12 h-12 bg-white border border-slate-200 text-slate-500 rounded-xl flex items-center justify-center z-20 shadow-sm">
                  <Smartphone className="w-6 h-6" />
                </div>
              </div>

              {/* Pros & Cons as callouts */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-4 border-l-[3px] border-l-emerald-500 shadow-sm">
                  <div className="font-bold text-emerald-700 text-sm mb-2 flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600"/> ข้อดี</div>
                  <ul className="text-xs text-slate-650 space-y-1.5 leading-relaxed font-semibold">
                    <li>✓ ความปลอดภัยระบบสูง</li>
                    <li>✓ จัดเก็บและสำรองข้อมูลจากจุดเดียว</li>
                    <li>✓ รองรับการขยายตัวขนาดใหญ่</li>
                  </ul>
                </div>
                <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-2xl p-4 border-l-[3px] border-l-rose-500 shadow-sm">
                  <div className="font-bold text-rose-700 text-sm mb-2 flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-rose-600"/> ข้อจำกัด</div>
                  <ul className="text-xs text-slate-655 space-y-1.5 leading-relaxed font-semibold">
                    <li>× ต้นทุนซื้อแม่ข่ายลิขสิทธิ์สูง</li>
                    <li>× หาก Server ล่มระบบทั้งหมดดับ</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Peer-to-Peer Architecture */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2.5rem] p-8 flex flex-col relative group border-l-[6px] border-l-orange-500 hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-50/10 to-transparent rounded-[2.5rem] pointer-events-none"></div>
              
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <Users className="text-orange-600 w-7 h-7" />
                  แบบเท่าเทียมกัน <span className="text-lg font-normal text-slate-500">(Peer-to-Peer)</span>
                </h3>
                <p className="text-slate-500 text-[14.5px] leading-relaxed">
                  คอมพิวเตอร์ทุกเครื่องเชื่อมโยงกันตรงแบบเท่าเทียม (Peer) ไม่มีแม่ข่าย ทุกเครื่องเป็นทั้งผู้ให้และผู้รับบริการร่วมกัน
                </p>
              </div>

              {/* Animation Box */}
              <div className="bg-slate-50/80 rounded-3xl h-64 border border-slate-100 shadow-inner relative flex justify-center items-center overflow-hidden mb-8">
                
                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="20" y1="20" x2="80" y2="20" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="80" y1="20" x2="50" y2="80" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="80" x2="20" y2="20" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                </svg>

                {/* Data Packets (Animated along the triangle) */}
                <div className="absolute w-3 h-3 bg-orange-405 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)] z-10 animate-p2p-1"></div>
                <div className="absolute w-3 h-3 bg-rose-405 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)] z-10 animate-p2p-2"></div>
                <div className="absolute w-3 h-3 bg-yellow-405 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)] z-10 animate-p2p-3"></div>

                {/* Peers (Nodes) */}
                <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-orange-50 border border-orange-200 text-orange-600 rounded-full flex items-center justify-center z-20 shadow-md group-hover:animate-float">
                  <Laptop className="w-6 h-6" />
                </div>
                <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-orange-50 border border-orange-200 text-orange-600 rounded-full flex items-center justify-center z-20 shadow-md group-hover:animate-float" style={{animationDelay: '1s'}}>
                  <Monitor className="w-6 h-6" />
                </div>
                <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-orange-50 border border-orange-200 text-orange-600 rounded-full flex items-center justify-center z-20 shadow-md group-hover:animate-float" style={{animationDelay: '2s'}}>
                  <Smartphone className="w-6 h-6" />
                </div>
              </div>

              {/* Pros & Cons as callouts */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-4 border-l-[3px] border-l-emerald-500 shadow-sm">
                  <div className="font-bold text-emerald-700 text-sm mb-2 flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600"/> ข้อดี</div>
                  <ul className="text-xs text-slate-650 space-y-1.5 leading-relaxed font-semibold">
                    <li>✓ ต้นทุนต่ำมาก ไม่ต้องใช้แม่ข่าย</li>
                    <li>✓ ติดตั้งเริ่มต้นระบบทำได้ง่าย</li>
                    <li>✓ หากจุดใดเสียระบบไม่ล่มทั้งหมด</li>
                  </ul>
                </div>
                <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-2xl p-4 border-l-[3px] border-l-rose-500 shadow-sm">
                  <div className="font-bold text-rose-700 text-sm mb-2 flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-rose-600"/> ข้อจำกัด</div>
                  <ul className="text-xs text-slate-655 space-y-1.5 leading-relaxed font-semibold">
                    <li>× ความปลอดภัยของเครือข่ายต่ำ</li>
                    <li>× ข้อมูลกระจัดกระจายจัดการยาก</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ใบงานการเปรียบเทียบสเกลและสถาปัตยกรรมเครือข่าย"
          taskText={`คำชี้แจง: ให้นักเรียนวิเคราะห์สถานการณ์จำลองต่อไปนี้และเขียนรายงานส่งในระบบ:

1. การออกแบบเครือข่ายสำหรับร้านกาแฟ Co-Working Space:
   - หากคุณเป็นผู้ควบคุมงานวางระบบเครือข่ายให้กับร้านกาแฟ 3 ชั้นที่มีลูกค้าเข้าใช้งานพร้อมกันเฉลี่ย 150 คน อุปกรณ์บริการจุดใดของร้านที่ควรเชื่อมต่อกันแบบ PAN, LAN และเครือข่ายภายนอกควรส่งสัญญาณผ่าน WAN อย่างไร?
   - อธิบายเหตุผลที่ระบบจัดการธุรกรรมเงินสด (POS) ของทางร้านควรแยกสิทธิ์ความปลอดภัยออกจากเครือข่ายลูกค้าทั่วไปตามเงื่อนไขทางกายภาพ
2. การเลือกสถาปัตยกรรมระบบ:
   - บริษัทเทคโนโลยีแห่งหนึ่งต้องการสร้างแอปพลิเคชันสำหรับส่งไฟล์วิดีโอขนาดใหญ่ (ระดับ 4K) ระหว่างพนักงานภายในตึกสำนักงาน 5 ชั้น จงวิเคราะห์เชิงเปรียบเทียบระหว่างสถาปัตยกรรม Client-Server และ Peer-to-Peer ว่าระบบใดจะช่วยลดแบนด์วิดท์ฝั่งเซิร์ฟเวอร์หลักได้ดีกว่า และระบบใดเหมาะสมในแง่การบริหารความปลอดภัย
3. สรุปประเภทเครือข่าย: อธิบายข้อจำกัดเชิงเทคนิคในการขยายขนาดเครือข่ายท้องถิ่น (LAN) ไปสู่ระดับเมือง (MAN) ทั้งในแง่ของสื่อสัญญาณที่เลือกใช้และอุปกรณ์โครงข่ายหลัก`}
        />
      </main>
    </div>
  );
}
