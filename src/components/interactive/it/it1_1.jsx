import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Monitor, 
  HardDrive, 
  Keyboard, 
  Code2, 
  Settings, 
  Database,
  Users,
  FileText,
  MousePointer2,
  Printer,
  ChevronRight,
  Zap,
  Layers,
  Sparkles,
  Activity
} from 'lucide-react';

// เราจะใช้ Style Tag ฝังแอนิเมชันพิเศษที่ Tailwind ไม่มีมาให้โดยตรง
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0px); }
    }
    @keyframes flow-horizontal {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    @keyframes flow-vertical {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(200%); }
    }
    @keyframes blob-drift {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(20px, -20px) scale(1.05); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes flow-svg-line {
      to {
        stroke-dashoffset: -36;
      }
    }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-flow-h { animation: flow-horizontal 2s linear infinite; }
    .animate-flow-v { animation: flow-vertical 2s linear infinite; }
    .animate-drift { animation: blob-drift 12s ease-in-out infinite; }
    .animate-flow-svg-line { animation: flow-svg-line 1.2s linear infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    .glass-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
  `}} />
);

export default function IT1_1() {
  const [activeCycle, setActiveCycle] = useState('process');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ลูกเล่น: เมื่อกดเปลี่ยน Cycle ให้สถานะ Transition ทำงานเพื่อเล่นแอนิเมชันฝั่งขวา
  const handleCycleClick = (cycle) => {
    if (cycle === activeCycle) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCycle(cycle);
      setIsTransitioning(false);
    }, 200); // ระยะเวลา fade out สั้นๆ ก่อนเปลี่ยนเนื้อหา
  };

  const systemComponents = [
    {
      id: 'hardware',
      title: 'ฮาร์ดแวร์ (Hardware)',
      icon: <Cpu className="w-8 h-8" />,
      theme: 'blue',
      color: 'from-blue-500 to-sky-600',
      shadowGlow: 'group-hover:shadow-blue-500/30',
      desc: 'ส่วนประกอบทางกายภาพที่จับต้องได้ โครงสร้างหลักของระบบ',
      details: ['CPU & Motherboard', 'RAM & Storage', 'Input / Output Devices']
    },
    {
      id: 'software',
      title: 'ซอฟต์แวร์ (Software)',
      icon: <Code2 className="w-8 h-8" />,
      theme: 'teal',
      color: 'from-teal-500 to-emerald-600',
      shadowGlow: 'group-hover:shadow-teal-500/30',
      desc: 'ชุดคำสั่งที่สั่งให้ฮาร์ดแวร์ทำงานตามกระบวนการ',
      details: ['OS (Windows, macOS)', 'Application Software', 'Utility Programs']
    },
    {
      id: 'peopleware',
      title: 'บุคลากร (Peopleware)',
      icon: <Users className="w-8 h-8" />,
      theme: 'amber',
      color: 'from-amber-500 to-orange-600',
      shadowGlow: 'group-hover:shadow-amber-500/30',
      desc: 'ผู้ใช้งาน ผู้สั่งการ และผู้ดูแลระบบคอมพิวเตอร์',
      details: ['End User', 'System Admin', 'Programmer / Developer']
    },
    {
      id: 'data',
      title: 'ข้อมูล (Data/Info)',
      icon: <Database className="w-8 h-8" />,
      theme: 'rose',
      color: 'from-rose-500 to-pink-600',
      shadowGlow: 'group-hover:shadow-rose-500/30',
      desc: 'ข้อเท็จจริงที่นำมาประมวลผลเพื่อให้เกิดประโยชน์',
      details: ['Raw Data (ข้อมูลดิบ)', 'Information (สารสนเทศ)', 'Database Systems']
    }
  ];

  const cycleData = {
    input: {
      title: '1. รับข้อมูล (Input)',
      icon: <MousePointer2 className="w-12 h-12 text-blue-500" />,
      theme: 'blue',
      gradient: 'from-sky-500 to-blue-600',
      bgLight: 'bg-sky-50/80',
      desc: 'รับข้อมูลดิบ (Raw Data) หรือคำสั่งจากผู้ใช้เข้าสู่ระบบคอมพิวเตอร์ แปลงสัญญาณทางกายภาพเป็นสัญญาณดิจิทัลเพื่อส่งต่อไปยังหน่วยประมวลผล',
      examples: ['คีย์บอร์ด (Keyboard)', 'เมาส์ (Mouse)', 'สแกนเนอร์ (Scanner)', 'ไมโครโฟน (Microphone)']
    },
    process: {
      title: '2. ประมวลผล (Process)',
      icon: <Cpu className="w-12 h-12 text-orange-500" />,
      theme: 'orange',
      gradient: 'from-orange-500 to-amber-500',
      bgLight: 'bg-orange-50/80',
      desc: 'ศูนย์กลางการทำงานของระบบ ทำหน้าที่คิดคำนวณ เปรียบเทียบทางตรรกะ และแปลงข้อมูลดิบตามชุดคำสั่ง (Software) ให้กลายเป็นสารสนเทศที่มีความหมาย',
      examples: ['หน่วยประมวลผลกลาง (CPU)', 'หน่วยประมวลผลกราฟิก (GPU)', 'การคำนวณทางคณิตศาสตร์ตรรกะ (ALU)']
    },
    output: {
      title: '3. แสดงผล (Output)',
      icon: <Printer className="w-12 h-12 text-emerald-500" />,
      theme: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50/80',
      desc: 'นำผลลัพธ์หรือสารสนเทศที่ได้จากการประมวลผลเสร็จสิ้นแล้ว แปลงกลับจากสัญญาณดิจิทัลให้ออกมาแสดงให้ผู้ใช้รับทราบในรูปแบบที่มนุษย์เข้าใจได้',
      examples: ['จอภาพ (Monitor)', 'เครื่องพิมพ์ (Printer)', 'ลำโพง (Speaker)', 'มอเตอร์สั่น']
    },
    storage: {
      title: '4. จัดเก็บข้อมูล (Storage)',
      icon: <HardDrive className="w-12 h-12 text-rose-500" />,
      theme: 'rose',
      gradient: 'from-rose-500 to-pink-600',
      bgLight: 'bg-rose-50/80',
      desc: 'บันทึกข้อมูลตั้งต้น หรือผลลัพธ์ที่ได้จากการประมวลผล เก็บไว้ในหน่วยความจำถาวรเพื่อป้องกันการสูญหาย และสามารถนำกลับมาใช้งานใหม่ได้ในอนาคต',
      examples: ['ฮาร์ดดิสก์ (HDD / SSD)', 'หน่วยความจำหลัก (RAM)', 'แฟลชไดรฟ์ (USB Drive)', 'คลาวด์ (Cloud Storage)']
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-sans text-slate-800 space-y-20 relative overflow-hidden">
      <CustomStyles />
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift animation-delay-4000 pointer-events-none"></div>

      <section className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-sky-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
            <Layers className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              องค์ประกอบของระบบคอมพิวเตอร์
            </h2>
            <p className="text-slate-500 text-base mt-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              ระบบที่สมบูรณ์ต้องอาศัยการทำงานร่วมกันของ 4 ส่วนหลัก
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemComponents.map((item) => (
            <div 
              key={item.id}
              className={`group relative glass-card rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 ${item.shadowGlow} overflow-hidden cursor-default`}
            >
              {/* Background Animated Glow on Hover */}
              <div className={`absolute -inset-4 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${item.color} shadow-lg text-white transform group-hover:rotate-6 transition-transform duration-300`}>
                  {/* Floating effect on the icon */}
                  <div className="group-hover:animate-float">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed h-10">
                  {item.desc}
                </p>
                
                <div className="space-y-2.5">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-slate-50/50 p-2 rounded-xl group-hover:bg-white group-hover:text-slate-900 transition-all duration-300 border border-slate-100 group-hover:border-transparent group-hover:shadow-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${item.color}`}></div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 pb-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-3 rounded-2xl shadow-lg shadow-orange-500/20">
            <Zap className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              วงจรการประมวลผลข้อมูล (Data Flow)
            </h2>
            <p className="text-slate-500 text-base mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              คลิกที่ไอคอนในวงจรเพื่อดูการทำงานและการไหลเวียนของข้อมูล
            </p>
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-4 sm:p-8 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Diagram Area (Left) */}
            <div className="w-full xl:w-7/12">
              <div className="relative w-full h-[450px] sm:h-[400px]">
                
                {/* 1. Connecting Lines (Mobile Viewport) */}
                <svg className="block sm:hidden absolute inset-0 w-full h-full pointer-events-none">
                  {/* Input -> Process */}
                  <line x1="30%" y1="18%" x2="30%" y2="50%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                  { (activeCycle === 'input' || activeCycle === 'process') && (
                    <line x1="30%" y1="18%" x2="30%" y2="50%" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 24" className="animate-flow-svg-line" />
                  )}

                  {/* Process -> Output */}
                  <line x1="30%" y1="50%" x2="30%" y2="82%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                  { (activeCycle === 'process' || activeCycle === 'output') && (
                    <line x1="30%" y1="50%" x2="30%" y2="82%" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 24" className="animate-flow-svg-line" />
                  )}

                  {/* Process -> Storage */}
                  <line x1="30%" y1="50%" x2="75%" y2="50%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                  { (activeCycle === 'process' || activeCycle === 'storage') && (
                    <line x1="30%" y1="50%" x2="75%" y2="50%" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 24" className="animate-flow-svg-line" />
                  )}
                </svg>

                {/* 2. Connecting Lines (Desktop/Tablet Viewport) */}
                <svg className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none">
                  {/* Input -> Process */}
                  <line x1="15%" y1="30%" x2="50%" y2="30%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                  { (activeCycle === 'input' || activeCycle === 'process') && (
                    <line x1="15%" y1="30%" x2="50%" y2="30%" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 24" className="animate-flow-svg-line" />
                  )}

                  {/* Process -> Output */}
                  <line x1="50%" y1="30%" x2="85%" y2="30%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                  { (activeCycle === 'process' || activeCycle === 'output') && (
                    <line x1="50%" y1="30%" x2="85%" y2="30%" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 24" className="animate-flow-svg-line" />
                  )}

                  {/* Process -> Storage */}
                  <line x1="50%" y1="30%" x2="50%" y2="75%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                  { (activeCycle === 'process' || activeCycle === 'storage') && (
                    <line x1="50%" y1="30%" x2="50%" y2="75%" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 24" className="animate-flow-svg-line" />
                  )}
                </svg>

                {/* Input Node */}
                <button 
                  onClick={() => handleCycleClick('input')}
                  className={`absolute left-[30%] top-[18%] sm:left-[15%] sm:top-[30%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-500 ${activeCycle === 'input' ? 'scale-110 z-20' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                >
                  {activeCycle === 'input' && <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center bg-white border-2 shadow-xl transition-all duration-500 ${activeCycle === 'input' ? 'border-blue-500 shadow-blue-500/40' : 'border-slate-100'}`}>
                    <div className={activeCycle === 'input' ? 'animate-float' : ''}>
                      {cycleData.input.icon}
                    </div>
                  </div>
                  <span className={`font-extrabold tracking-wide uppercase text-xs sm:text-sm ${activeCycle === 'input' ? 'text-blue-600' : 'text-slate-400'}`}>Input</span>
                </button>

                {/* Process Node (Center) */}
                <button 
                  onClick={() => handleCycleClick('process')}
                  className={`absolute left-[30%] top-[50%] sm:left-[50%] sm:top-[30%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-500 ${activeCycle === 'process' ? 'scale-110 z-20' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                >
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  {/* Outer spinning ring for process */}
                  <div className={`absolute -inset-3 rounded-full border-2 border-dashed ${activeCycle === 'process' ? 'border-orange-400 animate-[spin_10s_linear_infinite]' : 'border-slate-200'}`}></div>
                  
                  <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-white border-4 shadow-2xl relative transition-all duration-500 ${activeCycle === 'process' ? 'border-orange-500 shadow-orange-500/40' : 'border-slate-100'}`}>
                    <div className={activeCycle === 'process' ? 'animate-float' : ''}>
                      {cycleData.process.icon}
                    </div>
                  </div>
                  <span className={`font-extrabold tracking-wide uppercase text-sm sm:text-base ${activeCycle === 'process' ? 'text-orange-600' : 'text-slate-400'}`}>Process</span>
                </button>

                {/* Output Node */}
                <button 
                  onClick={() => handleCycleClick('output')}
                  className={`absolute left-[30%] top-[82%] sm:left-[85%] sm:top-[30%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-500 ${activeCycle === 'output' ? 'scale-110 z-20' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                >
                  {activeCycle === 'output' && <div className="absolute inset-0 bg-emerald-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center bg-white border-2 shadow-xl transition-all duration-500 ${activeCycle === 'output' ? 'border-emerald-500 shadow-emerald-500/40' : 'border-slate-100'}`}>
                     <div className={activeCycle === 'output' ? 'animate-float' : ''}>
                      {cycleData.output.icon}
                    </div>
                  </div>
                  <span className={`font-extrabold tracking-wide uppercase text-xs sm:text-sm ${activeCycle === 'output' ? 'text-emerald-600' : 'text-slate-400'}`}>Output</span>
                </button>

                {/* Storage Node */}
                <button 
                  onClick={() => handleCycleClick('storage')}
                  className={`absolute left-[75%] top-[50%] sm:left-[50%] sm:top-[75%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-all duration-500 ${activeCycle === 'storage' ? 'scale-110 z-20' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                >
                  {activeCycle === 'storage' && <div className="absolute inset-0 bg-rose-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center bg-white border-2 shadow-xl transition-all duration-500 ${activeCycle === 'storage' ? 'border-rose-500 shadow-rose-500/40' : 'border-slate-100'}`}>
                     <div className={activeCycle === 'storage' ? 'animate-float' : ''}>
                      {cycleData.storage.icon}
                    </div>
                  </div>
                  <span className={`font-extrabold tracking-wide uppercase text-xs sm:text-sm ${activeCycle === 'storage' ? 'text-rose-600' : 'text-slate-400'}`}>Storage</span>
                </button>

              </div>
            </div>

            {/* Details Card Panel (Right) */}
            <div className="w-full xl:w-5/12">
              <div 
                className={`relative w-full min-h-[400px] rounded-[2rem] p-8 sm:p-10 text-white overflow-hidden shadow-2xl transition-all duration-500 ease-out transform ${
                  isTransitioning ? 'opacity-0 scale-95 translate-x-8' : 'opacity-100 scale-100 translate-x-0'
                } flex flex-col justify-between`}
              >
                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cycleData[activeCycle].gradient} opacity-90`}></div>
                
                {/* Decorative circles inside panel */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-inner">
                        {React.cloneElement(cycleData[activeCycle].icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        {cycleData[activeCycle].title}
                      </h3>
                    </div>
                    
                    <div className="w-12 h-1 bg-white/30 rounded-full mb-6"></div>
                    
                    <p className="text-white/90 text-base sm:text-lg leading-relaxed font-medium">
                      {cycleData[activeCycle].desc}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 mt-auto">
                    <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Zap className="w-3 h-3" /> ตัวอย่างอุปกรณ์ที่เกี่ยวข้อง
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {cycleData[activeCycle].examples.map((ex, idx) => (
                        <span key={idx} className="bg-white/20 hover:bg-white/30 transition-colors text-white text-sm px-4 py-2 rounded-xl font-semibold shadow-sm backdrop-blur-md border border-white/10">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
