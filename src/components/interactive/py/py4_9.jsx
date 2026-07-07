import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import { 
  Binary, 
  Cpu, 
  ArrowRight,
  ArrowLeftRight,
  MonitorPlay,
  Grid3X3,
  FastForward,
  Rewind
} from 'lucide-react';

// Sub-component for 4.9.1 Truth Table Interactive
const TruthTableSim = () => {
  const [valA, setValA] = useState(0);
  const [valB, setValB] = useState(0);

  const andResult = valA & valB;
  const orResult = valA | valB;
  const xorResult = valA ^ valB;

  const ToggleBtn = ({ val, setVal, label }) => (
    <button 
      onClick={() => setVal(val === 1 ? 0 : 1)}
      className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-bold font-mono text-3xl shadow-lg transition-all transform active:scale-90 ${val === 1 ? 'bg-indigo-500 text-white shadow-indigo-500/50' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
    >
      <span className="text-xs font-sans text-slate-300 uppercase mb-1">{label}</span>
      {val}
    </button>
  );

  const ResultDisplay = ({ title, desc, result, highlight }) => (
    <div className={`p-4 rounded-xl flex flex-col items-center justify-center border-2 transition-all ${result === 1 ? highlight : 'bg-slate-50 border-slate-200 opacity-60'}`}>
      <span className="text-sm font-bold text-slate-500 mb-1">{title}</span>
      <span className="font-mono text-4xl font-black">{result}</span>
      <span className="text-xs text-slate-400 mt-2 text-center">{desc}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8 mb-16 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl z-0"></div>
      <div className="relative z-10">
        <h4 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2"><Grid3X3 className="text-indigo-500"/> 4.9.1 ลองเล่นเครื่องหมายบิตเบื้องต้น</h4>
        <p className="text-slate-600 mb-8">คลิกที่ปุ่ม A หรือ B ด้านล่างเพื่อเปลี่ยนค่า (0 หรือ 1) แล้วสังเกตผลลัพธ์ของแต่ละเครื่องหมาย</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          
          <div className="flex gap-6">
            <ToggleBtn val={valA} setVal={setValA} label="Input A" />
            <ToggleBtn val={valB} setVal={setValB} label="Input B" />
          </div>

          <div className="hidden md:block w-px h-32 bg-slate-200"></div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <ResultDisplay 
              title="A & B" 
              desc="AND (ต้อง 1 ทั้งคู่)" 
              result={andResult} 
              highlight="bg-emerald-50 border-emerald-300 text-emerald-600 shadow-[0_0_15px_rgba(52,211,153,0.3)]" 
            />
            <ResultDisplay 
              title="A | B" 
              desc="OR (มี 1 แค่ตัวเดียวก็พอ)" 
              result={orResult} 
              highlight="bg-sky-50 border-sky-300 text-sky-600 shadow-[0_0_15px_rgba(14,165,233,0.3)]" 
            />
            <ResultDisplay 
              title="A ^ B" 
              desc="XOR (ต้องต่างกัน)" 
              result={xorResult} 
              highlight="bg-purple-50 border-purple-300 text-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-component for 4.9.2 Shift Visualizer
const ShiftSim = () => {
  const [num, setNum] = useState(13); // Start with 13 (00001101)
  
  const handleShiftLeft = () => {
    if (num < 128) setNum(num << 1);
  };
  
  const handleShiftRight = () => {
    setNum(num >> 1);
  };

  const toBinaryArray = (n) => {
    return n.toString(2).padStart(8, '0').split('');
  };

  const bits = toBinaryArray(num);

  return (
    <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl p-8 mb-16 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="relative z-10 text-center">
        <h4 className="text-xl font-bold text-amber-400 mb-2 flex items-center justify-center gap-2"><ArrowLeftRight /> 4.9.2 จำลองการเลื่อนบิต (Bitwise Shift)</h4>
        <p className="text-slate-400 mb-10 text-sm">การเลื่อนซ้าย 1 ครั้ง คือการ <strong className="text-emerald-400">คูณ 2</strong> | การเลื่อนขวา 1 ครั้ง คือการ <strong className="text-rose-400">หาร 2 (ปัดเศษทิ้ง)</strong></p>
        
        <div className="flex flex-col items-center gap-8">
           <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 font-mono">
             {num}
           </div>
           
           <div className="flex gap-2 bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-inner">
             {bits.map((bit, i) => (
               <div key={i} className={`w-10 h-14 flex items-center justify-center font-mono text-2xl font-bold rounded-lg border-2 transition-all duration-300 ${bit === '1' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                 {bit}
               </div>
             ))}
           </div>
           
           <div className="flex gap-6 mt-4">
             <button 
               onClick={handleShiftLeft}
               disabled={num >= 128}
               className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(5,150,105,0.4)]"
             >
               <Rewind className="w-5 h-5" /> &lt;&lt; 1 (คูณ 2)
             </button>
             <button 
               onClick={() => setNum(13)}
               className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-3 rounded-xl font-bold transition-all active:scale-95"
             >
               Reset
             </button>
             <button 
               onClick={handleShiftRight}
               disabled={num === 0}
               className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
             >
               &gt;&gt; 1 (หาร 2) <FastForward className="w-5 h-5" />
             </button>
           </div>
           <div className="text-slate-500 text-xs font-mono bg-black/40 px-4 py-2 rounded-lg mt-2">
             * ขีดจำกัดในการจำลองนี้คือ 8-bit (ค่าสูงสุด 255)
           </div>
        </div>
      </div>
    </div>
  );
};


export default function pyUnit4_9_BitwiseOps() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (Bitwise Operators):
1. ให้นักเรียนแปลงเลข 15 และ 7 เป็นเลขฐานสอง (8-bit) ลงในกระดาษ
2. คำนวณหาผลลัพธ์ของ 15 & 7 (AND) ทีละบิต แล้วแปลงผลลัพธ์กลับเป็นเลขฐานสิบ
3. ใช้ Python รันคำสั่ง print(15 & 7) ว่าตรงกับที่คำนวณในกระดาษหรือไม่
4. ทดสอบ 10 << 1 ได้ผลลัพธ์เป็น 20 ให้นักเรียนอธิบายว่าทำไมถึงเพิ่มเป็นสองเท่า (อ้างอิงจากการเลื่อนบิตฐานสอง)`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-50/70 blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-4xl font-black text-indigo-600 mb-4 tracking-tight pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              จัดการข้อมูลระดับทะลวงบิต! (Bitwise)
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              ในคอมพิวเตอร์ ข้อมูลทุกอย่างถูกเก็บเป็นเลข 0 และ 1 เครื่องหมาย <strong>Bitwise</strong> จะทำการเจาะลึกลงไปจัดการกับ 0 และ 1 เหล่านั้นโดยตรงทีละบิต ซึ่งทำงานได้รวดเร็วมาก!
            </p>
        </div>

        {/* 4.9.1 */}
        <TruthTableSim />

        {/* 4.9.2 */}
        <ShiftSim />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
