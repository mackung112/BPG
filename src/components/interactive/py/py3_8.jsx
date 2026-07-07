import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  MemoryStick,
  Box,
  Fingerprint,
  Trash2,
  AlertTriangle,
  Link2,
  Unlink2,
  RefreshCcw,
  MousePointerClick,
  MonitorCheck
} from 'lucide-react';

// ============================================================================
// 1. Variable Reference Visualizer (Memory Boxes)
// ============================================================================
const MemoryVisualizer = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { code: "x = 5", vars: [{ name: "x", val: 5, refId: "id1", color: "bg-blue-500" }], objects: [{ id: "id1", val: 5, color: "border-blue-500 text-blue-400" }] },
    { code: "y = x", vars: [{ name: "x", val: 5, refId: "id1", color: "bg-blue-500" }, { name: "y", val: 5, refId: "id1", color: "bg-indigo-500" }], objects: [{ id: "id1", val: 5, color: "border-blue-500 text-blue-400" }] },
    { code: "x = 10", vars: [{ name: "x", val: 10, refId: "id2", color: "bg-emerald-500" }, { name: "y", val: 5, refId: "id1", color: "bg-indigo-500" }], objects: [{ id: "id1", val: 5, color: "border-blue-500 text-blue-400" }, { id: "id2", val: 10, color: "border-emerald-500 text-emerald-400" }] },
    { code: "y = 10", vars: [{ name: "x", val: 10, refId: "id2", color: "bg-emerald-500" }, { name: "y", val: 10, refId: "id2", color: "bg-indigo-500" }], objects: [{ id: "id1", val: 5, color: "border-slate-600 text-slate-500 opacity-50", orphaned: true }, { id: "id2", val: 10, color: "border-emerald-500 text-emerald-400" }] }
  ];

  const current = steps[step];

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };
  const reset = () => setStep(0);

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Link2 className="w-8 h-8 text-cyan-400" />
          ระบบป้ายชื่อตัวแปร (Variable as References)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose text-lg">
          ใน Python ตัวแปรไม่ใช่ <strong>"กล่องใส่ของ"</strong> แต่เป็น <strong>"ป้ายชื่อ (Tag)"</strong> ที่เอาไปแปะติดกับข้อมูลที่อยู่ใน RAM ลองกดปุ่ม <code>Next Step</code> เพื่อดูการเปลี่ยนแปลงทีละบรรทัด
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto bg-slate-950 border border-slate-700 rounded-3xl p-8 flex flex-col md:flex-row gap-12 shadow-inner min-h-[400px]">
        
        {/* Code Execution Panel */}
        <div className="w-full md:w-1/3 flex flex-col justify-between">
          <div>
            <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Python Code</div>
            <div className="font-mono text-xl space-y-3">
              {steps.map((s, idx) => (
                <div key={idx} className={`p-3 rounded-xl border transition-all duration-300 ${idx === step ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : idx < step ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-transparent border-transparent text-slate-700'}`}>
                  {idx <= step ? s.code : '\u00A0'}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
            <button onClick={prevStep} disabled={step === 0} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors">ย้อนกลับ</button>
            <button onClick={nextStep} disabled={step === steps.length - 1} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl disabled:hidden font-bold transition-colors">ถัดไป (Next)</button>
            {step === steps.length - 1 && (
              <button onClick={reset} className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-xl font-bold transition-colors">เริ่มใหม่</button>
            )}
          </div>
        </div>

        {/* Memory Visualizer */}
        <div className="w-full md:w-2/3 border-l-2 border-slate-800 pl-0 md:pl-12 flex flex-col relative">
           
           <div className="flex-1 flex justify-between gap-8 h-full">
             {/* Names (Tags) */}
             <div className="w-1/3 flex flex-col justify-around py-10 relative z-10">
               <div className="text-slate-500 text-xs font-bold text-center mb-4 absolute top-0 w-full">ป้ายชื่อตัวแปร</div>
               {current.vars.map((v, i) => (
                 <div key={i} className={`w-full py-4 rounded-xl flex items-center justify-center font-mono font-bold text-2xl text-white shadow-lg z-10 animate-[bounceIn_0.3s_ease-out] ${v.color}`}>
                   {v.name}
                 </div>
               ))}
             </div>

             {/* Links SVG */}
             <div className="w-1/3 absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full">
                  {current.vars.map((v, i) => {
                    // Calculate positions (simplified approximation for visual effect)
                    const startY = current.vars.length === 1 ? '50%' : (i === 0 ? '30%' : '70%');
                    const objIdx = current.objects.findIndex(o => o.id === v.refId);
                    const endY = current.objects.length === 1 ? '50%' : (objIdx === 0 ? '30%' : '70%');
                    
                    return (
                      <line 
                        key={i} 
                        x1="33%" y1={startY} 
                        x2="66%" y2={endY} 
                        stroke="rgba(6, 182, 212, 0.4)" 
                        strokeWidth="4" 
                        strokeDasharray="8 8"
                        className="animate-[dash_1s_linear_infinite]"
                      />
                    );
                  })}
                </svg>
             </div>

             {/* Objects in RAM */}
             <div className="w-1/3 flex flex-col justify-around py-10 relative z-10">
               <div className="text-slate-500 text-xs font-bold text-center mb-4 absolute top-0 w-full">กล่องข้อมูลใน RAM</div>
               {current.objects.map((obj, i) => (
                 <div key={i} className={`w-full aspect-square rounded-2xl border-4 flex flex-col items-center justify-center bg-slate-900 shadow-xl transition-all duration-500 z-10 ${obj.color}`}>
                   <div className="font-mono text-5xl font-black">{obj.val}</div>
                   <div className="text-xs mt-2 opacity-70 font-mono">id: {obj.id}</div>
                   
                   {obj.orphaned && (
                     <div className="absolute -top-3 -right-3 w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                       <Trash2 className="w-5 h-5 text-white" />
                     </div>
                   )}
                 </div>
               ))}
             </div>
           </div>

           {/* Explanation Box */}
           <div className="mt-8 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-sm leading-relaxed text-slate-300">
              {step === 0 && "บรรทัดแรก: ระบบสร้างกล่องข้อมูลเลข 5 ไว้ใน RAM แล้วเอาป้ายชื่อ x ไปแปะไว้"}
              {step === 1 && "บรรทัดสอง: เราสั่ง y = x ระบบไม่ได้ก๊อปปี้เลข 5 แต่มันแค่สร้างป้ายชื่อ y ไปแปะที่กล่องเดิม!"}
              {step === 2 && "บรรทัดสาม: พอสั่ง x = 10 ระบบจะดึงป้ายชื่อ x ออกจากกล่อง 5 แล้วไปแปะที่กล่องใบใหม่ (10) แทน"}
              {step === 3 && <span className="text-rose-400">บรรทัดสุดท้าย: พอป้ายชื่อหลุดหมด กล่องเลข 5 จะกลายเป็น "ขยะ" ทันที รอให้ Garbage Collector มาเก็บกวาดทิ้ง!</span>}
           </div>
        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 2. Small Integer Caching Lab (id function)
// ============================================================================
const IdFunctionLab = () => {
  const [val1, setVal1] = useState(5);
  const [val2, setVal2] = useState(5);
  const [isSameId, setIsSameId] = useState(true);

  // Simulate Python's small integer caching (-5 to 256)
  useEffect(() => {
    if (val1 === val2 && val1 >= -5 && val1 <= 256 && Number.isInteger(val1)) {
      setIsSameId(true);
    } else {
      setIsSameId(false);
    }
  }, [val1, val2]);

  // Generate a fake but consistent memory address
  const generateId = (val, isClone = false) => {
    if (!Number.isInteger(val)) return `0x7FFA${Math.abs(Math.floor(val * 1000)).toString(16).toUpperCase()}`;
    const base = 140700000000000;
    if (isClone && !isSameId && val1 === val2) {
      return base + (val * 32) + 128; // slightly different address
    }
    return base + (val * 32);
  };

  const id1 = generateId(val1);
  const id2 = generateId(val2, true);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 relative overflow-hidden group hover:shadow-2xl transition-shadow">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        
        <div className="w-full lg:w-1/2">
           <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-4">
             <div className="bg-fuchsia-100 text-fuchsia-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
               <Fingerprint className="w-7 h-7" />
             </div>
             พิสูจน์ที่อยู่ด้วย id()
           </h4>
           <p className="text-slate-600 leading-loose text-lg mb-8">
             ใน Python เราสามารถเช็ค <strong>"เลขที่อยู่ (Memory Address)"</strong> ของข้อมูลได้ด้วยฟังก์ชัน <code>id()</code> 
             ถ้าของสองชิ้นมีเลข ID ตรงกันเป๊ะ แปลว่ามันคือ <strong>ของชิ้นเดียวกัน</strong> ที่อยู่ใน RAM ไม่ใช่การก๊อปปี้!
           </p>
           
           <div className="bg-fuchsia-50 border-l-[6px] border-fuchsia-500 p-6 rounded-r-2xl shadow-sm mb-6">
             <strong className="text-fuchsia-900 block mb-2 font-bold">ลองทำแบบนี้ดู:</strong>
             <ul className="list-disc pl-5 text-fuchsia-800 space-y-2">
               <li>ลองใส่เลขเดียวกัน (เช่น 5 กับ 5) สังเกตว่า ID จะเหมือนกัน!</li>
               <li>ทีนี้ลองใส่เลขเดียวกันแต่ค่าสูงๆ (เช่น 300 กับ 300) สังเกตว่า ID จะ <strong>ไม่เหมือนกัน</strong> เพราะระบบจองที่ไว้ให้แค่เลขติดลบนิดหน่อยจนถึง 256 เท่านั้น (เรียกว่า Small Integer Caching)</li>
             </ul>
           </div>
        </div>

        <div className="w-full lg:w-1/2 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-inner flex flex-col gap-8">
           
           <div className="grid grid-cols-2 gap-6 relative">
             
             {/* Match Line connecting IDs if they are same */}
             {isSameId && (
               <div className="absolute top-1/2 left-1/4 right-1/4 h-2 bg-emerald-500/20 -translate-y-1/2 z-0 hidden md:block"></div>
             )}

             {/* Var A */}
             <div className="flex flex-col items-center gap-4 relative z-10">
               <div className="text-slate-400 font-bold bg-slate-800 px-4 py-1 rounded-full border border-slate-700">ตัวแปร A</div>
               <input 
                 type="number" 
                 value={val1}
                 onChange={(e) => setVal1(parseFloat(e.target.value) || 0)}
                 className="bg-slate-950 border-2 border-slate-700 rounded-2xl w-full text-center font-mono text-3xl text-white py-4 outline-none focus:border-fuchsia-500 transition-colors"
               />
               <div className={`mt-2 font-mono text-sm px-3 py-1.5 rounded-lg border ${isSameId ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                 id: {id1}
               </div>
             </div>

             {/* Var B */}
             <div className="flex flex-col items-center gap-4 relative z-10">
               <div className="text-slate-400 font-bold bg-slate-800 px-4 py-1 rounded-full border border-slate-700">ตัวแปร B</div>
               <input 
                 type="number" 
                 value={val2}
                 onChange={(e) => setVal2(parseFloat(e.target.value) || 0)}
                 className="bg-slate-950 border-2 border-slate-700 rounded-2xl w-full text-center font-mono text-3xl text-white py-4 outline-none focus:border-fuchsia-500 transition-colors"
               />
               <div className={`mt-2 font-mono text-sm px-3 py-1.5 rounded-lg border ${isSameId ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                 id: {id2}
               </div>
             </div>
           </div>

           <div className={`w-full py-4 rounded-xl text-center font-bold text-lg border-2 transition-all ${isSameId ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-rose-500/10 border-rose-500/50 text-rose-400'}`}>
             {isSameId ? '✓ ป้ายชื่อทั้ง 2 อัน ชี้ไปที่กล่องใบเดียวกันเป๊ะ!' : '✗ ป้ายชื่อชี้ไปคนละกล่อง (แม้ว่าข้อมูลข้างในจะหน้าตาเหมือนกัน)'}
           </div>

        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 3. Garbage Collector Mini-game
// ============================================================================
const GarbageCollectorGame = () => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [garbage, setGarbage] = useState([]);

  // Max missed before game over
  const MAX_MISSED = 5;

  useEffect(() => {
    if (!playing) return;
    
    // Spawn garbage randomly
    const spawnInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        const id = Math.random().toString(36).substr(2, 9);
        const val = Math.floor(Math.random() * 100);
        // Random horizontal position (10% to 90%)
        const left = Math.floor(Math.random() * 80) + 10; 
        
        setGarbage(prev => [...prev, { id, val, left, top: 0 }]);
      }
    }, 1000);

    // Fall animation
    const fallInterval = setInterval(() => {
      setGarbage(prev => {
        const next = prev.map(g => ({ ...g, top: g.top + 5 })); // drop speed
        
        // Count missed
        const missedItems = next.filter(g => g.top > 100);
        if (missedItems.length > 0) {
          setMissed(m => m + missedItems.length);
        }
        
        // Keep only those on screen
        return next.filter(g => g.top <= 100);
      });
    }, 100);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(fallInterval);
    };
  }, [playing]);

  useEffect(() => {
    if (missed >= MAX_MISSED) {
      setPlaying(false);
    }
  }, [missed]);

  const collect = (id) => {
    if (!playing) return;
    setGarbage(prev => prev.filter(g => g.id !== id));
    setScore(s => s + 1);
  };

  const startGame = () => {
    setScore(0);
    setMissed(0);
    setGarbage([]);
    setPlaying(true);
  };

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8 pl-4 border-l-[6px] border-emerald-500">
         <h3 className="text-4xl font-bold text-slate-800">
           คนเก็บขยะ (Garbage Collector)
         </h3>
      </div>
      
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {!playing && missed === 0 && (
          <div className="absolute inset-0 z-20 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <Trash2 className="w-20 h-20 text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            <h4 className="text-3xl font-bold text-white mb-4">Minigame: กำจัดขยะใน RAM</h4>
            <p className="text-slate-300 max-w-xl leading-loose mb-8">
              เมื่อไม่มีป้ายชื่อ (ตัวแปร) ไหนชี้มาที่ข้อมูลแล้ว ข้อมูลนั้นจะกลายเป็นขยะ (Garbage) ที่รกหน่วยความจำ 
              คุณต้องสวมบทเป็น <strong>Garbage Collector</strong> คลิกเพื่อทำลายกล่องข้อมูลขยะเหล่านี้ก่อนที่มันจะร่วงลงพื้นและทำให้ RAM เต็ม! 
              (พลาดได้สูงสุด {MAX_MISSED} ครั้ง)
            </p>
            <button onClick={startGame} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105">
              เริ่มทำความสะอาด!
            </button>
          </div>
        )}

        {!playing && missed >= MAX_MISSED && (
          <div className="absolute inset-0 z-20 bg-rose-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
            <AlertTriangle className="w-24 h-24 text-rose-400 mb-6 drop-shadow-[0_0_20px_rgba(244,63,114,0.8)] animate-pulse" />
            <h4 className="text-4xl font-black text-white mb-4">Memory Out of Bounds! (RAM เต็ม)</h4>
            <div className="text-6xl font-black text-white mb-6 bg-rose-800/50 px-8 py-4 rounded-2xl">{score} <span className="text-2xl text-rose-300">คะแนน</span></div>
            <p className="text-rose-200 text-lg mb-8">คุณปล่อยให้ขยะร่วงลงพื้นเกินกำหนด ทำให้โปรแกรม Crash ไปเรียบร้อย...</p>
            <button onClick={startGame} className="bg-white text-rose-900 hover:bg-rose-100 px-8 py-4 rounded-xl font-bold text-xl shadow-lg transition-all hover:scale-105">
              ลองใหม่อีกครั้ง
            </button>
          </div>
        )}

        {/* Game UI */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4 relative z-10">
          <div className="flex items-center gap-3 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg font-bold font-mono border border-emerald-500/30">
            <MousePointerClick className="w-5 h-5"/> Score: {score}
          </div>
          <div className="flex items-center gap-3 bg-rose-500/20 text-rose-400 px-4 py-2 rounded-lg font-bold font-mono border border-rose-500/30">
            <AlertTriangle className="w-5 h-5"/> Missed: {missed}/{MAX_MISSED}
          </div>
        </div>

        {/* Game Area */}
        <div className="w-full h-[400px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden shadow-inner">
          
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-rose-600/50 to-transparent"></div>

          {/* Falling Garbage */}
          {garbage.map(g => (
            <div 
              key={g.id}
              onClick={() => collect(g.id)}
              className="absolute w-16 h-16 bg-slate-800 border-2 border-rose-500/50 rounded-xl flex flex-col items-center justify-center text-rose-400 cursor-crosshair hover:bg-rose-600 hover:text-white hover:scale-110 transition-all shadow-lg select-none"
              style={{
                left: `${g.left}%`,
                top: `${g.top}%`
              }}
            >
              <div className="font-mono font-bold text-2xl">{g.val}</div>
              <Unlink2 className="w-3 h-3 absolute top-1 right-1 opacity-50" />
            </div>
          ))}

          {!playing && missed === 0 && (
            <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          )}

        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 4. Main Page Component
// ============================================================================
const pyUnit3_8_Memory = () => {
  const teacherTaskContent = `
    ใบงาน "นักจัดสรรหน่วยความจำ"
    1. ถ้าเขียนโค้ด:
       a = 100
       b = a
       a = 200
       อยากทราบว่าตอนนี้ b มีค่าเท่าไหร่? อธิบายด้วยหลักการ "ป้ายชื่อ"
    2. ทำไม Python ถึงต้องมีระบบ Garbage Collector? ถ้าไม่มีจะเกิดผลเสียอะไร?
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.8.1 The Truth about Variables */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-14 shadow-2xl mb-16 flex flex-col md:flex-row gap-12 items-center text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-0"></div>
           
           <div className="w-full md:w-1/2 relative z-10">
              <h4 className="text-3xl font-bold mb-6 flex items-center gap-4 text-cyan-400">
                <Box className="w-10 h-10" />
                ความจริงที่ถูกปิดบัง
              </h4>
              <p className="text-slate-300 leading-loose text-lg mb-8">
                ในภาษาเก่าๆ อย่าง C หรือ Java ตัวแปรคือ <strong>"กล่อง"</strong> ที่คุณต้องกำหนดขนาดให้มันล่วงหน้า (เช่น ต้องบอกว่าเป็น int) แล้วคุณก็เอาเลขใส่ลงไปในกล่อง<br/><br/>
                แต่ใน Python <strong>ข้อมูลต่างหากที่เป็นพระเอก!</strong> ทันทีที่คุณสร้างข้อมูล (เช่น เลข 5) ระบบจะสร้างกล่องใส่เลข 5 ไปวางใน RAM อัตโนมัติ 
                ส่วนตัวแปร (เช่น x) เป็นแค่ <strong>"ป้ายชื่อผูกเชือก"</strong> ที่เอาไปคล้องติดกับกล่องนั้นเท่านั้นเอง!
              </p>
           </div>
           
           <div className="w-full md:w-1/2 relative z-10 flex justify-center">
             <div className="bg-slate-950 rounded-3xl p-8 border-2 border-cyan-500/30 shadow-xl w-full max-w-sm flex flex-col items-center gap-6">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 w-full text-center">ตัวแปรไม่ใช่กล่อง แต่เป็นป้ายชื่อ</div>
                
                <div className="flex items-center gap-8 justify-center w-full mt-4">
                  <div className="bg-cyan-600 text-white font-mono text-2xl font-bold px-6 py-2 rounded-l-full rounded-r-sm shadow-lg relative flex items-center gap-2">
                    x
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-950"></div>
                  </div>
                  
                  <div className="h-0.5 w-16 bg-dashed bg-cyan-500 relative">
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500 rotate-45"></div>
                  </div>
                  
                  <div className="w-24 h-24 bg-slate-800 border-4 border-slate-700 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
                    <span className="font-mono text-4xl font-black text-white">5</span>
                    <span className="text-[10px] text-slate-500 mt-1">Memory Address</span>
                  </div>
                </div>
                
             </div>
           </div>
        </div>

        {/* 3.8.2 Memory Visualizer (Boxes & Tags) */}
        <MemoryVisualizer />

        {/* 3.8.3 id() Lab */}
        <IdFunctionLab />

        {/* 3.8.4 Garbage Collector */}
        <GarbageCollectorGame />

        {/* Final Conclusion Box */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl p-8 text-white shadow-xl flex items-center gap-6 mb-16 transform hover:-translate-y-1 transition-transform">
          <MonitorCheck className="w-16 h-16 shrink-0 opacity-80" />
          <div>
            <h4 className="text-2xl font-bold mb-2">ยินดีด้วย! คุณจบ Unit 3 แล้ว 🎉</h4>
            <p className="text-emerald-50 text-lg leading-relaxed">
              ตอนนี้คุณเข้าใจโครงสร้างภาษา ข้อมูลจำนวนเต็ม ทศนิยม ข้อความ ตรรกะ ไปจนถึงการทำงานของหน่วยความจำระดับลึก 
              พื้นฐานของคุณแข็งแกร่งพอที่จะสร้างโปรแกรมที่ซับซ้อนในบทต่อไปแล้วครับ!
            </p>
          </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.8)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit3_8_Memory;
