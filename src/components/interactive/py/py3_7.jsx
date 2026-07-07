import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  PackageSearch,
  Box,
  Puzzle,
  DownloadCloud,
  ArrowRight,
  Code2,
  Terminal,
  Dices,
  Calculator,
  CalendarDays,
  Zap,
  CheckCircle2,
  Settings2,
  Info
} from 'lucide-react';

// ============================================================================
// 1. Import Syntax Visualizer (import vs from vs as)
// ============================================================================
const ImportSyntaxVisualizer = () => {
  const [syntaxType, setSyntaxType] = useState('standard'); // standard, from, alias

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-bl-full blur-3xl -z-0 transition-all duration-700 group-hover:scale-125"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Settings2 className="w-8 h-8 text-indigo-400" />
          ห้องจำลองไวยากรณ์ (Import Syntax)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose text-lg">
          การนำเข้าโมดูลมีหลายท่า! ลองสลับแท็บด้านล่างเพื่อดูว่าการประกาศ <code>import</code> แต่ละแบบ 
          จะส่งผลต่อการเรียกใช้โค้ดด้านในอย่างไร
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Selectors */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
           <button 
             onClick={() => setSyntaxType('standard')}
             className={`p-5 rounded-2xl border text-left transition-all duration-300 ${syntaxType === 'standard' ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] scale-105' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
           >
             <div className="font-mono font-bold mb-1">import module</div>
             <div className="text-xs opacity-80">นำเข้าทั้งกล่อง เรียกใช้แบบยาว</div>
           </button>
           
           <button 
             onClick={() => setSyntaxType('from')}
             className={`p-5 rounded-2xl border text-left transition-all duration-300 ${syntaxType === 'from' ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-105' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
           >
             <div className="font-mono font-bold mb-1">from module import...</div>
             <div className="text-xs opacity-80">หยิบมาแค่บางชิ้น เรียกใช้แบบสั้น</div>
           </button>
           
           <button 
             onClick={() => setSyntaxType('alias')}
             className={`p-5 rounded-2xl border text-left transition-all duration-300 ${syntaxType === 'alias' ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
           >
             <div className="font-mono font-bold mb-1">import module as...</div>
             <div className="text-xs opacity-80">ตั้งชื่อเล่นให้กล่อง เรียกง่ายขึ้น</div>
           </button>
        </div>

        {/* Code Visualizer */}
        <div className="w-full lg:w-2/3 bg-[#1E1E1E] rounded-3xl p-8 border border-slate-700 shadow-inner flex flex-col min-h-[300px]">
           <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
             <Code2 className="w-5 h-5 text-slate-400" />
             <div className="text-slate-400 text-sm font-bold tracking-widest">Example Code (math module)</div>
           </div>

           <div className="flex-1 font-mono text-lg md:text-xl space-y-4">
             {syntaxType === 'standard' && (
               <div className="animate-[fadeIn_0.3s_ease-out]">
                 <div className="text-slate-500 mb-2"># นำเข้ากล่อง math ทั้งใบ</div>
                 <div><span className="text-indigo-400 font-bold">import</span> <span className="text-emerald-400">math</span></div>
                 <div className="text-slate-500 mt-6 mb-2"># เวลาใช้ ต้องบอกชื่อกล่องนำหน้าเสมอ</div>
                 <div>result = <span className="text-emerald-400 bg-emerald-500/10 px-1 rounded underline decoration-emerald-500/50">math.</span>sqrt(16)</div>
                 <div>print(<span className="text-emerald-400 bg-emerald-500/10 px-1 rounded underline decoration-emerald-500/50">math.</span>pi)</div>
               </div>
             )}

             {syntaxType === 'from' && (
               <div className="animate-[fadeIn_0.3s_ease-out]">
                 <div className="text-slate-500 mb-2"># เจาะจงหยิบแค่ sqrt และ pi ออกมาจากกล่อง</div>
                 <div><span className="text-purple-400 font-bold">from</span> <span className="text-emerald-400">math</span> <span className="text-purple-400 font-bold">import</span> sqrt, pi</div>
                 <div className="text-slate-500 mt-6 mb-2"># ใช้ชื่อเครื่องมือได้เลยทันที! (สั้นกระชับ)</div>
                 <div>result = <span className="text-rose-400 bg-rose-500/10 px-1 rounded font-bold">sqrt</span>(16)</div>
                 <div>print(<span className="text-rose-400 bg-rose-500/10 px-1 rounded font-bold">pi</span>)</div>
               </div>
             )}

             {syntaxType === 'alias' && (
               <div className="animate-[fadeIn_0.3s_ease-out]">
                 <div className="text-slate-500 mb-2"># นำเข้าทั้งกล่อง แต่ตั้งชื่อเล่นให้สั้นลงเป็น 'm'</div>
                 <div><span className="text-blue-400 font-bold">import</span> <span className="text-emerald-400">math</span> <span className="text-blue-400 font-bold">as</span> <span className="text-amber-400 font-bold">m</span></div>
                 <div className="text-slate-500 mt-6 mb-2"># เวลาเรียกใช้ ใช้แค่ตัว m นำหน้า</div>
                 <div>result = <span className="text-amber-400 bg-amber-500/10 px-1 rounded font-bold">m.</span>sqrt(16)</div>
                 <div>print(<span className="text-amber-400 bg-amber-500/10 px-1 rounded font-bold">m.</span>pi)</div>
               </div>
             )}
           </div>

           <div className={`mt-6 p-4 rounded-xl border flex items-start gap-4 transition-colors duration-300 ${
             syntaxType === 'standard' ? 'bg-indigo-950/50 border-indigo-900 text-indigo-200' :
             syntaxType === 'from' ? 'bg-purple-950/50 border-purple-900 text-purple-200' :
             'bg-blue-950/50 border-blue-900 text-blue-200'
           }`}>
             <Info className="w-5 h-5 shrink-0 mt-0.5" />
             <p className="text-sm leading-relaxed">
               {syntaxType === 'standard' && "ข้อดี: ป้องกันชื่อฟังก์ชันซ้ำซ้อนกัน ข้อเสีย: ต้องพิมพ์ชื่อโมดูลยาวๆ ทุกครั้ง"}
               {syntaxType === 'from' && "ข้อดี: โค้ดสั้น อ่านง่าย ข้อเสีย: ถ้านำเข้าชื่อที่ซ้ำกับตัวแปรที่เรามีอยู่เดิม โค้ดอาจพังได้!"}
               {syntaxType === 'alias' && "มักใช้กับโมดูลยอดฮิตที่มีชื่อยาวๆ (เช่น import numpy as np, import pandas as pd)"}
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 2. Random Module Simulator (Gacha / Dice)
// ============================================================================
const RandomModuleSimulator = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValues, setDiceValues] = useState([1, 1]);
  const [choiceResult, setChoiceResult] = useState('???');
  
  const choices = ["🍕 Pizza", "🍣 Sushi", "🍔 Burger", "🍜 Noodle", "🥗 Salad"];

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    // Simulate animation
    let count = 0;
    const interval = setInterval(() => {
      setDiceValues([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
      setChoiceResult(choices[Math.floor(Math.random() * choices.length)]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div className="mb-20 mt-12 bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50">
       <div className="flex flex-col lg:flex-row gap-12 items-center">
         
         <div className="w-full lg:w-1/2">
            <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-4">
              <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <Dices className="w-7 h-7" />
              </div>
              ทดสอบใช้งานจริง: โมดูล Random
            </h4>
            <p className="text-slate-600 leading-loose text-lg mb-8">
              หนึ่งในโมดูลพื้นฐานที่ถูกเรียกใช้บ่อยที่สุดคือ <strong><code>random</code></strong> (สำหรับสุ่มตัวเลข) 
              ในตัวอย่างนี้ เราจะลองใช้ 2 ฟังก์ชันยอดฮิต:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                <div className="bg-emerald-500 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm">randint(a,b)</div>
                <div className="text-emerald-900">สุ่มตัวเลขจำนวนเต็มตั้งแต่ a ถึง b</div>
              </li>
              <li className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                <div className="bg-emerald-500 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm">choice(list)</div>
                <div className="text-emerald-900">สุ่มเลือกไอเทม 1 ชิ้นจากลิสต์ที่กำหนด</div>
              </li>
            </ul>
            <button 
              onClick={rollDice}
              disabled={isRolling}
              className={`w-full py-5 rounded-2xl font-bold text-xl text-white transition-all shadow-lg flex items-center justify-center gap-3 ${isRolling ? 'bg-slate-400 cursor-not-allowed scale-95' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.02] hover:shadow-emerald-500/50'}`}
            >
              <Zap className={isRolling ? "animate-pulse" : ""} /> {isRolling ? 'กำลังสุ่ม...' : 'RUN สคริปต์สุ่ม!'}
            </button>
         </div>
         
         <div className="w-full lg:w-1/2">
            <div className="bg-slate-900 rounded-3xl p-8 shadow-inner border border-slate-800 flex flex-col gap-8 h-full min-h-[350px]">
              
              <div className="flex-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">random.randint(1, 6)</div>
                <div className="flex gap-6 relative z-10">
                  <div className={`w-20 h-20 bg-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center text-slate-800 font-bold text-5xl ${isRolling ? 'animate-[shake_0.2s_infinite]' : ''}`}>
                    {diceValues[0]}
                  </div>
                  <div className={`w-20 h-20 bg-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center text-slate-800 font-bold text-5xl ${isRolling ? 'animate-[shake_0.2s_infinite]' : ''}`}>
                    {diceValues[1]}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">random.choice(foods)</div>
                <div className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all ${isRolling ? 'scale-110 opacity-50' : 'scale-100 opacity-100'}`}>
                  {choiceResult}
                </div>
              </div>

            </div>
         </div>
         
       </div>
    </div>
  );
};


// ============================================================================
// 3. Module Warehouse (Visualizing Built-in Modules)
// ============================================================================
const ModuleWarehouse = () => {
  const modules = [
    { name: "math", icon: <Calculator className="w-8 h-8"/>, desc: "ฟังก์ชันคณิตศาสตร์ขั้นสูง (sin, cos, log, sqrt)", color: "text-blue-500", bg: "bg-blue-100" },
    { name: "random", icon: <Dices className="w-8 h-8"/>, desc: "ระบบสุ่มตัวเลข และสุ่มเลือกสิ่งของ", color: "text-emerald-500", bg: "bg-emerald-100" },
    { name: "datetime", icon: <CalendarDays className="w-8 h-8"/>, desc: "จัดการวัน เวลา และปฏิทิน", color: "text-purple-500", bg: "bg-purple-100" },
    { name: "os", icon: <Terminal className="w-8 h-8"/>, desc: "ทำงานร่วมกับระบบปฏิบัติการ (สร้าง/ลบไฟล์)", color: "text-amber-500", bg: "bg-amber-100" },
  ];

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8 pl-4 border-l-[6px] border-slate-700">
         <h3 className="text-4xl font-bold text-slate-800">
           Python Standard Library (คลังแสงฟรี)
         </h3>
      </div>
      <p className="text-slate-600 text-lg mb-10 pl-5 max-w-4xl leading-loose">
        ตอนที่คุณติดตั้ง Python ลงในเครื่อง มันไม่ได้มาตัวเปล่าๆ แต่แถม <strong>"โกดังเก็บเครื่องมือ" (Standard Library)</strong> มาให้ด้วย 
        เพียงแต่เครื่องมือเหล่านี้ถูกแพ็คอยู่ในกล่อง (Module) แยกกัน คุณต้องใช้คำสั่ง <code>import</code> แกะกล่องออกมาก่อนถึงจะใช้ได้
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((mod, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-default">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${mod.bg} ${mod.color}`}>
              {mod.icon}
            </div>
            <h5 className="font-mono text-2xl font-bold text-slate-800 mb-2">import {mod.name}</h5>
            <p className="text-slate-500 leading-relaxed text-sm">{mod.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================================
// 4. Main Page Component
// ============================================================================
const pyUnit3_7_Module = () => {
  const teacherTaskContent = `
    ใบงาน "นักนำเข้า"
    1. ถ้าต้องการสุ่มตัวเลขจำนวนเต็มตั้งแต่ 1-100 จะต้อง import โมดูลใด และใช้คำสั่งใด?
    2. ให้อธิบายความแตกต่างระหว่าง:
       - import math
       - from math import pi
    3. ทำไม Python ถึงไม่ Load โมดูลทั้งหมดที่มีมาให้ตั้งแต่เปิดโปรแกรมเลย?
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.7.1 Analogy Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-14 shadow-2xl mb-16 flex flex-col md:flex-row gap-12 items-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0"></div>
           <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/10 rounded-full blur-3xl -z-0"></div>
           
           <div className="w-full md:w-1/2 relative z-10">
              <h4 className="text-3xl font-bold mb-6 flex items-center gap-4">
                <Box className="w-10 h-10 text-blue-200" />
                ทำไมต้อง Import?
              </h4>
              <p className="text-blue-100 leading-loose text-lg mb-8">
                ลองจินตนาการว่า Python คือ <strong>"กระเป๋าเครื่องมือช่าง"</strong> <br/><br/>
                คำสั่งพื้นฐานคือ ค้อน ไขควง ที่พกติดตัวตลอดเวลา (หยิบใช้ได้เลย) <br/><br/>
                ส่วน <strong>Module</strong> คือ เลื่อยไฟฟ้า หรือสว่านเจาะปูน ที่คุณไม่ได้ใช้ทุกวัน ถ้าต้องแบกเครื่องมือทุกชิ้นที่มีบนโลกไว้ในกระเป๋าตลอดเวลา กระเป๋าคงหนักจนเดินไม่ไหว! (เปลือง RAM) <br/><br/>
                ดังนั้น คุณจึงต้อง <strong>import (เบิกของ)</strong> เฉพาะตอนที่จะใช้เท่านั้น!
              </p>
           </div>
           
           <div className="w-full md:w-1/2 relative z-10 flex justify-center">
             <div className="relative w-full max-w-sm">
               <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl flex flex-col items-center relative z-20">
                 <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
                   <Puzzle className="w-10 h-10 text-white" />
                 </div>
                 <h5 className="font-bold text-2xl mb-2">My Program</h5>
                 <p className="text-blue-200 text-sm mb-6 text-center">โปรแกรมเริ่มต้นจะเบาและทำงานได้เร็วมาก</p>
                 
                 <div className="w-full space-y-3">
                   <div className="bg-black/20 rounded-xl p-3 flex items-center gap-3 text-sm font-mono text-emerald-300 border border-emerald-500/30">
                     <DownloadCloud className="w-4 h-4"/> + import math
                   </div>
                   <div className="bg-black/20 rounded-xl p-3 flex items-center gap-3 text-sm font-mono text-emerald-300 border border-emerald-500/30">
                     <DownloadCloud className="w-4 h-4"/> + import random
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* 3.7.2 Import Syntax Visualizer */}
        <ImportSyntaxVisualizer />

        {/* 3.7.3 Module Warehouse */}
        <ModuleWarehouse />

        {/* 3.7.4 Random Simulator */}
        <RandomModuleSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.7)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit3_7_Module;
