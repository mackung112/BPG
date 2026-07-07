import React, { useState } from 'react';
import { 
  Network, 
  Share2, 
  ShieldAlert, 
  Coins, 
  Send, 
  Mail, 
  Wifi, 
  HardDriveDownload, 
  FileCheck2,
  ArrowRightLeft,
  Radio,
  Smartphone,
  Server,
  Printer,
  FileBox,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Activity,
  Sparkles
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    @keyframes packet-simplex {
      0% { left: 10%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { left: 90%; opacity: 0; }
    }
    @keyframes packet-half-duplex-forward {
      0% { left: 10%; opacity: 0; }
      5% { opacity: 1; }
      45% { left: 90%; opacity: 1; }
      50% { left: 90%; opacity: 0; }
      100% { left: 90%; opacity: 0; }
    }
    @keyframes packet-half-duplex-backward {
      0% { right: 10%; opacity: 0; }
      50% { right: 10%; opacity: 0; }
      55% { opacity: 1; }
      95% { right: 90%; opacity: 1; }
      100% { right: 90%; opacity: 0; }
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 0.5; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes blob-drift {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(20px, -20px) scale(1.05); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes flow-svg-line {
      to {
        stroke-dashoffset: -20;
      }
    }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-simplex { animation: packet-simplex 2s linear infinite; }
    .animate-hd-fwd { animation: packet-half-duplex-forward 4s linear infinite; }
    .animate-hd-bwd { animation: packet-half-duplex-backward 4s linear infinite; }
    .animate-fd-1 { animation: packet-simplex 1.5s linear infinite; }
    .animate-fd-2 { animation: packet-simplex 1.5s linear infinite reverse; }
    .animate-pulse-ring { animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
    .animate-drift { animation: blob-drift 12s ease-in-out infinite; }
    .animate-flow-svg-line { animation: flow-svg-line 1.5s linear infinite; }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }
  `}} />
);

export default function IT1_2() {
  const [activeElement, setActiveElement] = useState('sender');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleElementClick = (elem) => {
    if (elem === activeElement) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveElement(elem);
      setIsTransitioning(false);
    }, 200);
  };

  const commElements = {
    sender: {
      title: 'ผู้ส่ง (Sender)',
      icon: <Send className="w-10 h-10 text-blue-500" />,
      color: 'blue',
      borderColor: 'border-l-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      desc: 'อุปกรณ์เริ่มต้นที่ทำหน้าที่สร้างและจัดส่งข้อมูลเข้าสู่ระบบเครือข่าย เช่น คอมพิวเตอร์ สมาร์ทโฟน หรือกล้องวงจรปิด',
    },
    message: {
      title: 'ข้อมูล/ข่าวสาร (Message)',
      icon: <Mail className="w-10 h-10 text-indigo-500" />,
      color: 'indigo',
      borderColor: 'border-l-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      desc: 'เนื้อหา สาร หรือข้อมูลที่ต้องการส่ง ซึ่งอาจอยู่ในรูปแบบข้อความ เสียง ภาพ หรือวิดีโอ ที่ถูกแปลงเป็นสัญญาณดิจิทัล',
    },
    medium: {
      title: 'สื่อกลาง (Medium)',
      icon: <Wifi className="w-10 h-10 text-emerald-500" />,
      color: 'emerald',
      borderColor: 'border-l-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      desc: 'เส้นทางหรือช่องทางที่ข้อมูลเดินทางผ่านจากผู้ส่งไปยังผู้รับ เช่น สายสัญญาณ (LAN, Fiber Optic) หรือคลื่นวิทยุ (Wi-Fi)',
    },
    receiver: {
      title: 'ผู้รับ (Receiver)',
      icon: <HardDriveDownload className="w-10 h-10 text-orange-500" />,
      color: 'orange',
      borderColor: 'border-l-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      desc: 'อุปกรณ์ปลายทางที่ทำหน้าที่รับข้อมูลที่ส่งผ่านสื่อกลางมา และนำไปประมวลผลหรือแสดงผลต่อไป',
    },
    protocol: {
      title: 'โปรโตคอล (Protocol)',
      icon: <FileCheck2 className="w-10 h-10 text-rose-500" />,
      color: 'rose',
      borderColor: 'border-l-rose-500',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      desc: 'กฎ ระเบียบ หรือภาษาข้อตกลงส่วนกลาง ที่ทำให้ผู้ส่งและผู้รับ (ซึ่งอาจเป็นคนละยี่ห้อหรือคนละระบบ) สามารถสื่อสารกันรู้เรื่อง',
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

        {/* Section 1: Benefits */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ประโยชน์ของเครือข่ายคอมพิวเตอร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทำไมเราต้องสร้างระบบเครือข่าย? (Network Value)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hardware Sharing */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Printer className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800">แชร์ฮาร์ดแวร์</h4>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">
                ใช้อุปกรณ์ราคาสูงร่วมกันได้ เช่น เครื่องพิมพ์ หรือสแกนเนอร์ส่วนกลาง ช่วยลดต้นทุนในการซื้ออุปกรณ์ให้พนักงานทุกคน
              </p>
            </div>

            {/* Data Sharing */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FileBox className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800">แชร์ข้อมูล</h4>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">
                ผู้ใช้สามารถดึงไฟล์ข้อมูลจาก File Server ส่วนกลางมาใช้งานได้ทันที ไม่ต้องเซฟใส่แฟลชไดรฟ์เดินส่งกันอีกต่อไป
              </p>
            </div>

            {/* Software Sharing */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Server className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800">แชร์ซอฟต์แวร์</h4>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">
                ติดตั้งโปรแกรมฐานข้อมูลหรือแอปพลิเคชันไว้ที่เครื่องแม่ข่าย แล้วให้เครื่องลูกข่ายประมวลผลผ่านเครือข่าย ช่วยให้บริหารจัดการง่าย
              </p>
            </div>
          </div>

          {/* Pros and Cons Box as Frosted Glass Callouts */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Pros */}
            <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-6 border-l-[4px] border-l-emerald-500 leading-relaxed shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-emerald-700 text-lg mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> ข้อดีของการมีเครือข่าย
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-2.5 text-slate-700 text-sm md:text-[15px]">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span> 
                  <span>ประหยัดค่าใช้จ่ายด้านฮาร์ดแวร์โดยการใช้ทรัพยากรร่วมกัน</span>
                </li>
                <li className="flex gap-2.5 text-slate-700 text-sm md:text-[15px]">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span> 
                  <span>จัดเก็บและจัดการข้อมูลจากศูนย์กลาง (Centralized) เพิ่มความปลอดภัย</span>
                </li>
                <li className="flex gap-2.5 text-slate-700 text-sm md:text-[15px]">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span> 
                  <span>สื่อสารและประสานงานภายในองค์กรได้อย่างสะดวกรวดเร็ว</span>
                </li>
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-2xl p-6 border-l-[4px] border-l-rose-500 leading-relaxed shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-rose-700 text-lg mb-4">
                <ShieldAlert className="w-5 h-5 text-rose-600" /> ข้อจำกัดและความเสี่ยง
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-2.5 text-slate-700 text-sm md:text-[15px]">
                  <span className="text-rose-500 font-bold shrink-0">×</span> 
                  <span>ต้นทุนการวางระบบ อุปกรณ์สวิตช์ เราเตอร์ และเดินสายสัญญาณค่อนข้างสูงในระยะแรก</span>
                </li>
                <li className="flex gap-2.5 text-slate-700 text-sm md:text-[15px]">
                  <span className="text-rose-500 font-bold shrink-0">×</span> 
                  <span>หากอุปกรณ์แม่ข่าย (Server) หรือสวิตช์หลักเสีย เครือข่ายจะชะงักทั้งหมด</span>
                </li>
                <li className="flex gap-2.5 text-slate-700 text-sm md:text-[15px]">
                  <span className="text-rose-500 font-bold shrink-0">×</span> 
                  <span>เสี่ยงต่อการถูกมัลแวร์คุกคามหรือโจรกรรมข้อมูลหากระบบความปลอดภัยไม่เข้มงวด</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 5 Elements */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              องค์ประกอบของการสื่อสาร
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              5 องค์ประกอบพื้นฐานของการสื่อสารข้อมูล (Communication Components)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            คลิกที่ไอคอนแต่ละจุดในผังระบบเครือข่าย เพื่อดูหน้าที่และการเชื่อมโยงขององค์ประกอบต่างๆ
          </p>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2.5rem] p-6 sm:p-10">
            
            {/* Interactive Network Map using viewBox for Perfect Coordinates */}
            <div className="relative w-full h-[320px] mb-8">
              
              {/* SVG Connecting Lines with Pixel-Perfect Center Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* 1. Main Path: Sender -> Medium -> Receiver */}
                <path d="M 10 60 L 50 60 L 90 60" stroke="#E2E8F0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* 2. Message Path: Sender -> Message -> Medium */}
                <path d="M 10 60 L 30 20 L 50 60" stroke="#E2E8F0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* 3. Protocol Path: Medium -> Protocol -> Receiver */}
                <path d="M 50 60 L 70 20 L 90 60" stroke="#E2E8F0" strokeWidth="1.2" fill="none" strokeLinecap="round" />

                {/* --- Glowing Flow Animations based on Active Selection --- */}
                {activeElement === 'sender' && (
                  <>
                    <path d="M 10 60 L 30 20" stroke="#3b82f6" strokeWidth="1.6" strokeDasharray="2 4" fill="none" strokeLinecap="round" className="animate-flow-svg-line" />
                    <path d="M 10 60 L 50 60" stroke="#3b82f6" strokeWidth="1.6" strokeDasharray="2 4" fill="none" strokeLinecap="round" className="animate-flow-svg-line" />
                  </>
                )}
                {activeElement === 'message' && (
                  <path d="M 10 60 L 30 20 L 50 60" stroke="#6366f1" strokeWidth="1.6" strokeDasharray="2 4" fill="none" strokeLinecap="round" className="animate-flow-svg-line" />
                )}
                {activeElement === 'medium' && (
                  <path d="M 10 60 L 50 60 L 90 60" stroke="#10b981" strokeWidth="1.6" strokeDasharray="2 4" fill="none" strokeLinecap="round" className="animate-flow-svg-line" />
                )}
                {activeElement === 'protocol' && (
                  <path d="M 30 20 L 50 60 L 70 20" stroke="#f43f5e" strokeWidth="1.6" strokeDasharray="2 4" fill="none" strokeLinecap="round" className="animate-flow-svg-line" />
                )}
                {activeElement === 'receiver' && (
                  <path d="M 50 60 L 90 60" stroke="#f97316" strokeWidth="1.6" strokeDasharray="2 4" fill="none" strokeLinecap="round" className="animate-flow-svg-line" />
                )}
              </svg>

              {/* 5 Node Interactive Buttons */}
              
              {/* Sender Node */}
              <button 
                onClick={() => handleElementClick('sender')} 
                className={`absolute left-[10%] top-[60%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeElement === 'sender' ? 'scale-110 z-20' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                {activeElement === 'sender' && <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center border-4 shadow-lg z-10 transition-all duration-300 ${
                  activeElement === 'sender' ? 'border-blue-500 text-blue-500' : 'border-slate-200 text-slate-400 group-hover:border-blue-300'
                }`}>
                  <div className={`transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${activeElement === 'sender' ? 'animate-float' : ''}`}>
                    <Send className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                </div>
                <span className={`font-bold text-[13px] sm:text-sm bg-white/90 px-3 py-1 rounded-full border border-slate-100 shadow-sm backdrop-blur-sm transition-all duration-300 ${
                  activeElement === 'sender' ? 'text-blue-600 border-blue-200' : 'text-slate-500 group-hover:text-blue-500'
                }`}>
                  Sender
                </span>
              </button>

              {/* Message Node */}
              <button 
                onClick={() => handleElementClick('message')} 
                className={`absolute left-[30%] top-[20%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeElement === 'message' ? 'scale-110 z-20' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                {activeElement === 'message' && <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl rotate-12 flex items-center justify-center border-4 shadow-lg z-10 transition-all duration-300 ${
                  activeElement === 'message' ? 'border-indigo-500 text-indigo-500' : 'border-slate-200 text-slate-400 group-hover:border-indigo-300'
                }`}>
                  <div className={`transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 -rotate-12 ${activeElement === 'message' ? 'animate-float' : ''}`}>
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                </div>
                <span className={`font-bold text-[13px] sm:text-sm bg-white/90 px-3 py-1 rounded-full border border-slate-100 shadow-sm backdrop-blur-sm transition-all duration-300 ${
                  activeElement === 'message' ? 'text-indigo-600 border-indigo-200' : 'text-slate-500 group-hover:text-indigo-500'
                }`}>
                  Message
                </span>
              </button>

              {/* Medium Node */}
              <button 
                onClick={() => handleElementClick('medium')} 
                className={`absolute left-[50%] top-[60%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeElement === 'medium' ? 'scale-110 z-20' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                {activeElement === 'medium' && <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center border-4 shadow-lg z-10 transition-all duration-300 ${
                  activeElement === 'medium' ? 'border-emerald-500 text-emerald-500' : 'border-slate-200 text-slate-400 group-hover:border-emerald-300'
                }`}>
                  <div className={`transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${activeElement === 'medium' ? 'animate-float' : ''}`}>
                    <Wifi className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                </div>
                <span className={`font-bold text-[13px] sm:text-sm bg-white/90 px-3 py-1 rounded-full border border-slate-100 shadow-sm backdrop-blur-sm transition-all duration-300 ${
                  activeElement === 'medium' ? 'text-emerald-600 border-emerald-200' : 'text-slate-500 group-hover:text-emerald-500'
                }`}>
                  Medium
                </span>
              </button>

              {/* Protocol Node */}
              <button 
                onClick={() => handleElementClick('protocol')} 
                className={`absolute left-[70%] top-[20%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeElement === 'protocol' ? 'scale-110 z-20' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                {activeElement === 'protocol' && <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse"></div>}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl -rotate-12 flex items-center justify-center border-4 shadow-lg z-10 transition-all duration-300 ${
                  activeElement === 'protocol' ? 'border-rose-500 text-rose-500' : 'border-slate-200 text-slate-400 group-hover:border-rose-300'
                }`}>
                  <div className={`transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 rotate-12 ${activeElement === 'protocol' ? 'animate-float' : ''}`}>
                    <FileCheck2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                </div>
                <span className={`font-bold text-[13px] sm:text-sm bg-white/90 px-3 py-1 rounded-full border border-slate-100 shadow-sm backdrop-blur-sm transition-all duration-300 ${
                  activeElement === 'protocol' ? 'text-rose-600 border-rose-200' : 'text-slate-500 group-hover:text-rose-500'
                }`}>
                  Protocol
                </span>
              </button>

              {/* Receiver Node */}
              <button 
                onClick={() => handleElementClick('receiver')} 
                className={`absolute left-[90%] top-[60%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeElement === 'receiver' ? 'scale-110 z-20' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                {activeElement === 'receiver' && <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center border-4 shadow-lg z-10 transition-all duration-300 ${
                  activeElement === 'receiver' ? 'border-orange-500 text-orange-500' : 'border-slate-200 text-slate-400 group-hover:border-orange-300'
                }`}>
                  <div className={`transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${activeElement === 'receiver' ? 'animate-float' : ''}`}>
                    <HardDriveDownload className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                </div>
                <span className={`font-bold text-[13px] sm:text-sm bg-white/90 px-3 py-1 rounded-full border border-slate-100 shadow-sm backdrop-blur-sm transition-all duration-300 ${
                  activeElement === 'receiver' ? 'text-orange-600 border-orange-200' : 'text-slate-500 group-hover:text-orange-500'
                }`}>
                  Receiver
                </span>
              </button>

            </div>

            {/* Dynamic Details Panel */}
            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden mt-6">
              <div className={`transition-all duration-300 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className={`p-6 sm:p-8 md:p-10 bg-white/80 backdrop-blur-xl border border-white/50 text-slate-800 rounded-3xl flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-xl border-l-[6px] ${commElements[activeElement].borderColor}`}>
                  <div className={`p-5 rounded-2xl shrink-0 shadow-inner ${commElements[activeElement].bgColor} ${commElements[activeElement].textColor}`}>
                    {React.cloneElement(commElements[activeElement].icon, { className: "w-12 h-12 md:w-16 md:h-16" })}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                      {commElements[activeElement].title}
                    </h3>
                    <p className="text-slate-600 text-[15px] md:text-base leading-relaxed">
                      {commElements[activeElement].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Transmission Modes */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ทิศทางการไหลของข้อมูล
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทิศทางการส่งสัญญาณ (Transmission Mode)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            รูปแบบและลักษณะการไหลเวียนของสัญญาณข้อมูลระหว่างอุปกรณ์ 2 ฝั่งในระบบสื่อสาร
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Simplex */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col hover:border-blue-300/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group cursor-default">
              <div className="mb-4">
                <span className="text-[13px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 font-mono tracking-wider">
                  SIMPLEX
                </span>
                <h4 className="text-[20px] font-bold text-slate-800 mt-2">สื่อสารทางเดียว (Simplex)</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 h-16">
                ข้อมูลถูกส่งไปใน <strong className="text-blue-500">ทิศทางเดียวเสมอ (One-Way)</strong> ผู้ส่งทำหน้าที่ส่งอย่างเดียว และผู้รับทำหน้าที่รับอย่างเดียวโดยไม่มีทางโต้กลับได้
              </p>
              
              {/* Animated Diagram */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 flex justify-between items-center relative mt-auto h-32 overflow-hidden shadow-inner">
                <Radio className="w-10 h-10 text-blue-500 z-10 bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm" />
                
                {/* Connecting Line */}
                <div className="absolute left-16 right-16 h-1 bg-slate-200/80 top-1/2 -translate-y-1/2 rounded-full"></div>
                
                {/* Moving Packet */}
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-simplex"></div>

                <Smartphone className="w-10 h-10 text-slate-400 z-10 bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm" />
              </div>
              <div className="text-center mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                สถานีส่งวิทยุ <span className="mx-1 text-blue-400">→</span> เครื่องรับวิทยุ
              </div>
            </div>

            {/* Half-Duplex */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col hover:border-purple-300/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group cursor-default">
              <div className="mb-4">
                <span className="text-[13px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 font-mono tracking-wider">
                  HALF-DUPLEX
                </span>
                <h4 className="text-[20px] font-bold text-slate-800 mt-2">สื่อสารกึ่งสองทาง (Half-Duplex)</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 h-16">
                ส่งข้อมูลได้ทั้ง 2 ทิศทาง แต่ <strong className="text-purple-500">สวนทางกันในเวลาเดียวกันไม่ได้</strong> ต้องสลับกันทำหน้าที่ (ผลัดกันพูด)
              </p>
              
              {/* Animated Diagram */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 flex justify-between items-center relative mt-auto h-32 overflow-hidden shadow-inner">
                <Radio className="w-10 h-10 text-purple-500 z-10 bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm" />
                
                {/* Connecting Line */}
                <div className="absolute left-16 right-16 h-1 bg-slate-200/80 top-1/2 -translate-y-1/2 rounded-full"></div>
                
                {/* Moving Packet Forward */}
                <div className="absolute w-4 h-4 bg-purple-500 rounded-full top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-hd-fwd"></div>
                {/* Moving Packet Backward */}
                <div className="absolute w-4 h-4 bg-orange-500 rounded-full top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-hd-bwd"></div>

                <Radio className="w-10 h-10 text-orange-500 z-10 bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm" />
              </div>
              <div className="text-center mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                วอ. สื่อสาร <span className="mx-1 text-purple-400">↔️</span> วอ. สื่อสาร (สลับพูด)
              </div>
            </div>

            {/* Full-Duplex */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col hover:border-emerald-300/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group cursor-default">
              <div className="mb-4">
                <span className="text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 font-mono tracking-wider">
                  FULL-DUPLEX
                </span>
                <h4 className="text-[20px] font-bold text-slate-800 mt-2">สื่อสารสองทางเต็มรูปแบบ (Full-Duplex)</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 h-16">
                รับและส่งข้อมูลได้สองทิศทาง <strong className="text-emerald-500">ในเวลาเดียวกันอย่างอิสระ</strong> สื่อสารได้พร้อมกันโดยช่องสัญญาณแยกกันชัดเจน
              </p>
              
              {/* Animated Diagram */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 flex justify-between items-center relative mt-auto h-32 overflow-hidden shadow-inner">
                <Smartphone className="w-10 h-10 text-emerald-500 z-10 bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm" />
                
                {/* Connecting Lines */}
                <div className="absolute left-16 right-16 h-1 bg-slate-200/80 top-[40%] rounded-full"></div>
                <div className="absolute left-16 right-16 h-1 bg-slate-200/80 top-[60%] rounded-full"></div>
                
                {/* Moving Packet Right */}
                <div className="absolute w-3 h-3 bg-emerald-500 rounded-full top-[40%] -translate-y-1/2 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-fd-1"></div>
                {/* Moving Packet Left */}
                <div className="absolute w-3 h-3 bg-teal-500 rounded-full top-[60%] -translate-y-1/2 shadow-[0_0_10px_rgba(20,184,166,0.8)] animate-fd-2"></div>

                <Smartphone className="w-10 h-10 text-teal-500 z-10 bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm" />
              </div>
              <div className="text-center mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                สมาร์ทโฟน <span className="mx-1 text-emerald-400">⇄</span> สมาร์ทโฟน (พูดคุยพร้อมกัน)
              </div>
            </div>

          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ใบงานการประเมินองค์ประกอบและโหมดการสื่อสารในระบบเครือข่าย"
          taskText={`คำชี้แจง: ให้นักเรียนตอบคำถามประเมินความรู้และวิเคราะห์กรณีศึกษาต่อไปนี้ลงในระบบการส่งงาน:

1. วิเคราะห์ความสัมพันธ์: อธิบายหน้าที่ของ "โปรโตคอล (Protocol)" และ "สื่อกลาง (Medium)" และเหตุใดหากขาดส่วนใดส่วนหนึ่งไป ผู้รับสารจึงไม่สามารถรับข้อมูลที่ถูกต้องสมบูรณ์ได้
2. การเลือกใช้โหมดการส่งสัญญาณ (Transmission Mode):
   - หากได้รับมอบหมายให้ออกแบบระบบแจ้งเหตุเพลิงไหม้อัตโนมัติ (Fire Alarm System) จากเซนเซอร์ตรวจจับควันส่งไปยังแผงควบคุมหลัก ควรเลือกใช้โหมด Simplex, Half-Duplex หรือ Full-Duplex? เพราะเหตุใด?
   - ระบบวิทยุสื่อสารพกพา (Walkie-Talkie) ของหน่วยกู้ภัยทำไมจึงใช้โหมด Half-Duplex แทนที่จะเป็น Full-Duplex? อธิบายปัจจัยเชิงโครงสร้างระบบและงบประมาณ
3. สรุปความแตกต่างเชิงเปรียบเทียบ: จงเขียนตารางเปรียบเทียบข้อดีและข้อจำกัดของโหมด Simplex, Half-Duplex และ Full-Duplex ในมิติของ (1) ความคุ้มค่าของแบนด์วิดท์ (2) ความเร็วในการโต้ตอบ และ (3) ความยืดหยุ่นในการใช้งาน`}
        />
      </main>
    </div>
  );
}
