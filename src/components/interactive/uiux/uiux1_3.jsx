import React, { useState, useEffect } from 'react';
import { FileText, Bot, Sparkles, Code2, ArrowRight, Layers, Command, MessageSquare, TerminalSquare, CheckCircle2 } from 'lucide-react';
import SimulatorShell from '../shared/SimulatorShell';
import AmbientBackdrop from '../shared/AmbientBackdrop';
import SectionBlock from '../shared/SectionBlock';

export default function Uiux1_3() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance animation for the simulator
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeStep, isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const steps = [
    {
      id: 0,
      title: "1. อ่านไฟล์ design.md",
      desc: "Stitch วิเคราะห์ข้อกำหนดเรื่องสี ฟอนต์ และคอมโพเนนต์",
      agentText: "กำลังอ่าน DESIGN.md... พบ Glassmorphism และโทนสี Indigo",
      codeGen: "/* ยังไม่มีโค้ด */"
    },
    {
      id: 1,
      title: "2. รับคำสั่งจากผู้ใช้",
      desc: "นักออกแบบ/นักพัฒนาสั่งงานผ่าน Prompt",
      agentText: "รับทราบ! ต้องการสร้างปุ่ม Primary แบบมี Glassmorphism",
      codeGen: "// รอการประมวลผล..."
    },
    {
      id: 2,
      title: "3. จับคู่ Design System",
      desc: "Stitch แปลง Design Tokens เป็น Tailwind Classes",
      agentText: "จับคู่: bg-white/60, backdrop-blur-xl, border-white/40",
      codeGen: "className=\"bg-white/60 backdrop-blur-xl...\""
    },
    {
      id: 3,
      title: "4. สร้างชิ้นงานจริง",
      desc: "ได้ผลลัพธ์เป็น Code Component ที่พร้อมใช้งาน",
      agentText: "สร้างปุ่มสำเร็จ! รัน impeccable detect ไม่พบปัญหา",
      codeGen: "<button className=\"bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-xl px-6 py-2 text-indigo-600 font-semibold hover:-translate-y-1 transition-all\">\n  คลิกเลย\n</button>"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FAFAFA] font-sans">
      <AmbientBackdrop />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 pb-20">
        
        {/* Section 1.3.1 */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              1.3.1 เริ่มต้นใช้งาน google Stitch
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แนะนำเครื่องมือ Google Stitch
            </h3>
          </div>
          
          <div className="prose prose-zinc max-w-none">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed">
              <b>Google Stitch</b> คือ AI Coding Assistant (หรือเอเจนต์ช่วยเขียนโค้ด) ที่ออกแบบมาให้ทำงานร่วมกับนักพัฒนาและนักออกแบบโดยตรง ความสามารถพิเศษของ Stitch คือการ <b>"อ่านและเข้าใจ Design System"</b> ผ่านไฟล์มาตรฐาน เช่น <code>DESIGN.md</code> ทำให้โค้ดที่สร้างออกมานั้น ตรงกับหน้าตาของแอปพลิเคชันที่เราออกแบบไว้ 100%
            </p>
          </div>

          <SectionBlock>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">ทำไมต้องใช้ Stitch?</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        ในอดีต นักออกแบบ (Designer) ส่งดีไซน์ให้นักพัฒนา (Developer) เขียนโค้ด มักจะเกิดปัญหา "โค้ดไม่ตรงปก" (สีเพี้ยน, ขนาดผิด) Stitch เข้ามาอุดช่องโหว่นี้โดยเป็นตัวกลางที่แปลง <b>ข้อกำหนด (Rules)</b> เป็น <b>โค้ด (Code)</b> อัตโนมัติ
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">บทบาทของ DESIGN.md</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        <code>DESIGN.md</code> เปรียบเสมือน "คัมภีร์" หรือ "คู่มือแบรนด์" ที่รวบรวมค่าต่างๆ เช่น โทนสี (Color Palette), ฟอนต์ (Typography), และสไตล์การ์ด เมื่อ Stitch อ่านไฟล์นี้ มันจะรู้ทันทีว่าต้องใช้คลาส Tailwind CSS อะไร
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Illustration */}
              <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[350px]">
                {/* Flow lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 120 175 Q 200 175 250 175" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" strokeDasharray="5,5" fill="none" className="animate-pulse" />
                  <path d="M 320 175 Q 400 175 450 175" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" strokeDasharray="5,5" fill="none" className="animate-pulse" />
                </svg>

                <div className="flex items-center justify-between w-full relative z-10 px-4">
                  {/* Designer Node */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <FileText className="w-8 h-8 text-rose-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">DESIGN.md</span>
                  </div>

                  {/* AI Agent Node */}
                  <div className="flex flex-col items-center space-y-3 relative">
                    <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full"></div>
                    <div className="w-20 h-20 bg-indigo-600 border border-indigo-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)] z-10">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-xs font-mono text-indigo-300">Google Stitch</span>
                  </div>

                  {/* Result Node */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Code2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">UI Component</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionBlock>
        </section>

        {/* Section 1.3.2 */}
        <section className="space-y-6 pt-8">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-fuchsia-600 tracking-wider uppercase">
              1.3.2 การใช้งานร่วมกับ design.md
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              กระบวนการทำงานของ AI กับ Design System
            </h3>
          </div>

          <div className="prose prose-zinc max-w-none mb-8">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed">
              ลองใช้งานระบบจำลอง (Simulator) ด้านล่าง เพื่อดูว่า Google Stitch รับคำสั่งและดึงข้อมูลจากเอกสาร <code>DESIGN.md</code> มาสร้างโค้ดหน้าตาแอปพลิเคชันได้อย่างไร
            </p>
          </div>

          {/* Interactive Stitch Simulator */}
          <SimulatorShell className="p-0 overflow-hidden border border-slate-200/60 shadow-xl bg-slate-50/50 backdrop-blur-xl rounded-3xl">
            {/* Header */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
               <div className="flex space-x-2">
                 <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
               </div>
               <span className="text-xs font-mono text-slate-400">Stitch_Agent_Simulator.exe</span>
               <button 
                 onClick={toggleAnimation}
                 className={`px-3 py-1 rounded text-xs font-bold transition-colors ${isAnimating ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
               >
                 {isAnimating ? 'STOP AUTO' : 'PLAY DEMO'}
               </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              
              {/* Left Panel: DESIGN.md & Steps */}
              <div className="lg:col-span-4 border-r border-slate-200 bg-white p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-6">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <h4 className="font-mono text-sm font-bold text-slate-800">DESIGN.md</h4>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-[11px] text-slate-600 space-y-2 mb-8 shadow-inner overflow-hidden relative">
                  <div className={`absolute left-0 top-0 w-1 h-full bg-indigo-500 transition-all duration-300 ${activeStep === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
                  <p><span className="text-rose-500">#</span> <b>Design System</b></p>
                  <p><span className="text-indigo-500">##</span> <b>Colors</b></p>
                  <p>- Primary: <span className="text-indigo-600">indigo-600</span></p>
                  <p>- Surface: <span className="text-slate-500">white/60</span></p>
                  <p className="mt-2"><span className="text-indigo-500">##</span> <b>Glassmorphism</b></p>
                  <p>- <span className="text-teal-600">backdrop-blur-xl</span></p>
                  <p>- <span className="text-teal-600">border-white/40</span></p>
                  <p>- <span className="text-teal-600">shadow-xl</span></p>
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Workflow Steps</h4>
                <div className="space-y-3 flex-1">
                  {steps.map((step, idx) => (
                    <div 
                      key={step.id} 
                      onClick={() => { setActiveStep(step.id); setIsAnimating(false); }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${activeStep === step.id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold ${activeStep === step.id ? 'text-indigo-700' : 'text-slate-700'}`}>{step.title}</span>
                        {activeStep === step.id && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                      </div>
                      <p className="text-xs text-slate-500">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel: Stitch Agent & Code Editor */}
              <div className="lg:col-span-8 bg-slate-50 flex flex-col">
                
                {/* Agent Chat Area */}
                <div className="p-6 border-b border-slate-200 bg-white/50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200">
                      <Bot className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex-1">
                      <p className="text-sm font-mono text-slate-700 transition-all duration-300">
                        {steps[activeStep].agentText}
                        {activeStep < 3 && <span className="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-1 align-middle"></span>}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code Generator Area */}
                <div className="flex-1 p-6 relative flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <TerminalSquare className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-mono text-slate-500">component.jsx</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-slate-900 rounded-xl p-4 overflow-hidden shadow-inner font-mono text-[13px] text-slate-300 border border-slate-800">
                     <pre className="whitespace-pre-wrap transition-all duration-500 leading-relaxed">
                       {steps[activeStep].codeGen}
                     </pre>
                  </div>

                  {/* Visual Preview */}
                  {activeStep === 3 && (
                    <div className="absolute inset-x-6 bottom-6 h-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-rose-500/10"></div>
                      {/* Rendered Component Preview */}
                      <button className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-xl px-8 py-3 text-indigo-600 font-bold tracking-wide hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-400/50 transition-all duration-300 relative z-10 flex items-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>คลิกเลย</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </SimulatorShell>

          <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-6 border-l-[3.5px] border-l-emerald-500 mt-8 shadow-sm">
            <h4 className="text-[18px] font-semibold text-emerald-900 flex items-center gap-2 mb-3">
               <Command className="w-5 h-5 text-emerald-600" />
               สรุปข้อดีของการใช้ Design System ร่วมกับ AI
            </h4>
            <ul className="space-y-3 text-[15.5px] text-emerald-800/80 leading-relaxed list-disc list-inside ml-2">
              <li><b>ลดข้อผิดพลาด (Consistency):</b> มั่นใจได้ว่าปุ่มทุกปุ่ม การ์ดทุกใบ จะใช้สีและฟอนต์เดียวกันทั้งโปรเจกต์</li>
              <li><b>ทำงานเร็วขึ้น (Speed):</b> ไม่ต้องเสียเวลางมหา Class Tailwind เอง AI สามารถดึง Class ที่ถูกต้องจาก <code>DESIGN.md</code> มาพิมพ์ให้ทันที</li>
              <li><b>สื่อสารตรงกัน (Single Source of Truth):</b> ทั้งนักออกแบบและนักพัฒนาอ้างอิงความถูกต้องจากไฟล์เดียว หมดปัญหาเถียงกันเรื่องสีเพี้ยน</li>
            </ul>
          </div>

        </section>

      </main>
    </div>
  );
}
