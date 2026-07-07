import TeacherTask from '../../ui/TeacherTask';
import React, { useState, useMemo } from 'react';
import {
  Play,
  Code2,
  Settings2,
  ListOrdered,
  AlertCircle,
  MoveRight,
  Calculator,
  ChevronsRight,
  TrendingUp,
  TrendingDown,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

/* ─────────────────────────────────────────────────
   1. For Loop Simulator Component
   ───────────────────────────────────────────────── */
const ForLoopSimulator = () => {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);
  const [newItem, setNewItem] = useState("");
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const addItem = () => {
    if (newItem.trim() && items.length < 5) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const runLoop = () => {
    setIsRunning(true);
    setActiveIdx(-1);
    setLogs([]);

    let current = 0;
    const interval = setInterval(() => {
      if (current < items.length) {
        setActiveIdx(current);
        setLogs(prev => [...prev, `ผลไม้: ${items[current]}`]);
        current++;
      } else {
        clearInterval(interval);
        setActiveIdx(-1);
        setIsRunning(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-50" />

      {/* Code Editor Panel */}
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-sky-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <Code2 className="w-5 h-5" /> 4.12.1 การทำงานของ For Loop
        </h4>

        {/* Input and Item management */}
        <div className="mb-6 bg-slate-850 p-4 rounded-xl border border-slate-700/50 flex flex-col gap-2 font-sans text-sm">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="เพิ่มชื่อผลไม้..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white outline-none focus:border-sky-500 flex-1"
            />
            <button
              onClick={addItem}
              className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              เพิ่ม
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {items.map((item, idx) => (
              <span key={idx} className="bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                {item}
                <button onClick={() => removeItem(idx)} className="text-rose-500 font-bold hover:text-rose-400">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <div>fruits = [</div>
          <div className="pl-4 text-emerald-400">
            {items.map((item, i) => `"${item}"`).join(", ")}
          </div>
          <div>]</div>
          <div className="text-pink-500 mt-2">for <span className="text-blue-400">fruit</span> in <span className="text-blue-400">fruits</span>:</div>
          <div className={`ml-8 transition-all duration-300 ${activeIdx !== -1 ? 'bg-sky-900/40 outline outline-1 outline-sky-500/50 rounded p-1' : 'opacity-45'}`}>
            <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"ผลไม้: "</span> + <span className="text-blue-400">fruit</span>)
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={runLoop}
            disabled={isRunning || items.length === 0}
            className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-sky-500/20"
          >
            <Play className="w-5 h-5" /> จำลองการทำงานลูป
          </button>
        </div>
      </div>

      {/* Visualizer Panel */}
      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
          ตัวแปรชี้และผลการวนซ้ำ
        </h4>

        {/* Visual representation of current item */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-2 justify-center items-center my-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center font-bold transition-all ${idx === activeIdx ? 'bg-sky-100 border-sky-500 ring-4 ring-sky-200 scale-110 shadow-lg text-sky-700' : 'bg-white border-slate-200 text-slate-500 opacity-60'}`}
              >
                <span className="text-xs text-slate-400">Index {idx}</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto bg-black rounded-xl p-6 min-h-[140px] font-mono text-emerald-400 shadow-inner flex flex-col justify-end">
            <div className="text-slate-500 text-sm mb-2 mt-auto">$ python main.py</div>
            {logs.map((log, i) => <div key={i} className="animate-[fade-in_0.3s_ease-out]">{log}</div>)}
            {isRunning && activeIdx !== -1 && <div className="text-sky-400 animate-pulse">กำลังดึงผลไม้รอบที่ {activeIdx + 1}...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   2. Range Simulator Component
   ───────────────────────────────────────────────── */
const RangeSimulator = () => {
  const [params, setParams] = useState({
    start: 0,
    stop: 10,
    step: 1
  });

  const [mode, setMode] = useState(1); 

  const updateParam = (key, val) => {
    setParams(prev => ({ ...prev, [key]: Number(val) }));
  };

  const generateRange = () => {
    let { start, stop, step } = params;
    
    if (mode === 1) {
      start = 0;
      step = 1;
    } else if (mode === 2) {
      step = 1;
    }

    const result = [];
    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        result.push(i);
        if (result.length > 50) break;
      }
    } else if (step < 0) {
      for (let i = start; i > stop; i += step) {
        result.push(i);
        if (result.length > 50) break;
      }
    }
    return result;
  };

  const result = useMemo(() => generateRange(), [params, mode]);

  // Derived display values for visualizer
  const activeStart = mode === 1 ? 0 : params.start;
  const activeStep = (mode === 1 || mode === 2) ? 1 : params.step;
  const activeStop = params.stop;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100/50 rounded-tl-[100px] blur-3xl z-0 pointer-events-none opacity-50"></div>
      
      {/* Configuration Panel */}
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-orange-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <Calculator className="w-5 h-5" /> 4.12.3 ปรับตั้งค่า Range
        </h4>
        
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(m => (
            <button 
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-sans font-bold transition-all shadow-md active:scale-95 ${mode === m ? 'bg-orange-500 text-white shadow-orange-500/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              {m} พารามิเตอร์
            </button>
          ))}
        </div>
        
        <div className="mb-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col gap-6">
           {mode >= 2 && (
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center">
                 <label className="text-sm font-sans font-bold text-slate-400">จุดเริ่มต้น (Start)</label>
                 <input 
                   type="number" 
                   value={params.start}
                   onChange={(e) => updateParam('start', e.target.value)}
                   className="bg-slate-900 text-orange-400 w-24 px-3 py-2 rounded-lg outline-none border border-slate-600 focus:border-orange-500 transition-colors text-right font-bold text-xl shadow-inner"
                 />
               </div>
               <p className="text-xs font-sans text-slate-500">ค่าแรกที่จะปรากฏในลำดับ (รวมค่านี้)</p>
             </div>
           )}
           <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center">
               <label className="text-sm font-sans font-bold text-emerald-400">จุดสิ้นสุด (Stop)</label>
               <input 
                 type="number" 
                 value={params.stop}
                 onChange={(e) => updateParam('stop', e.target.value)}
                 className="bg-slate-900 text-emerald-400 w-24 px-3 py-2 rounded-lg outline-none border border-emerald-600/50 focus:border-emerald-500 transition-colors text-right font-bold text-xl shadow-inner"
               />
             </div>
             <p className="text-xs font-sans text-emerald-500/70 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900">
               *โปรแกรมจะ <strong>หยุดก่อนถึง</strong> ค่านี้เสมอ (ไม่รวมค่านี้เด็ดขาด!)
             </p>
           </div>
           {mode === 3 && (
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center">
                 <label className="text-sm font-sans font-bold text-slate-400">ระยะก้าวเดิน (Step)</label>
                 <input 
                   type="number" 
                   value={params.step}
                   onChange={(e) => updateParam('step', e.target.value)}
                   className="bg-slate-900 text-sky-400 w-24 px-3 py-2 rounded-lg outline-none border border-slate-600 focus:border-sky-500 transition-colors text-right font-bold text-xl shadow-inner"
                 />
               </div>
               <p className="text-xs font-sans text-slate-500">ค่าบวก = เดินหน้า | ค่าลบ = ถอยหลัง (นับลง)</p>
             </div>
           )}
        </div>
        
        <div className="mt-auto flex flex-col gap-2 bg-black/40 p-6 rounded-2xl border border-slate-800">
          <div className="text-sm font-sans text-slate-500 mb-2">ตัวอย่างโค้ด:</div>
          <div className="transition-all duration-300 rounded text-xl">
             <span className="text-pink-500">for</span> <span className="text-blue-400">i</span> <span className="text-pink-500">in</span> <span className="text-purple-400 font-bold">range</span>(
               {mode === 1 && <span className="text-emerald-400 font-bold">{params.stop}</span>}
               {mode === 2 && <span><span className="text-orange-400 font-bold">{params.start}</span>, <span className="text-emerald-400 font-bold">{params.stop}</span></span>}
               {mode === 3 && <span><span className="text-orange-400 font-bold">{params.start}</span>, <span className="text-emerald-400 font-bold">{params.stop}</span>, <span className="text-sky-400 font-bold">{params.step}</span></span>}
             ):
          </div>
          <div className="ml-8 mt-1">
             <span className="text-yellow-200">print</span>(<span className="text-blue-400">i</span>)
          </div>
        </div>

      </div>

      {/* Output Panel */}
      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        
        <h4 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
           <span className="flex items-center gap-2"><ListOrdered className="w-5 h-5 text-orange-500" /> ผลลัพธ์ (Output Sequence)</span>
           <span className="text-sm font-normal text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{result.length} ตัวเลข</span>
        </h4>

        {/* Visualized Steps Line */}
        <div className="mb-6 relative h-20 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center overflow-hidden shadow-inner px-8">
           {result.length === 0 ? (
             <span className="text-slate-400 text-sm font-bold flex items-center gap-2">
               <AlertCircle className="w-4 h-4"/> ไม่เกิดการสร้างตัวเลข
             </span>
           ) : (
             <div className="flex items-center gap-1 w-full justify-between relative z-10">
               <div className="flex flex-col items-center">
                 <span className="text-xs font-bold text-orange-500 mb-1">Start</span>
                 <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center font-bold text-sm z-10">
                   {activeStart}
                 </div>
               </div>
               
               <div className="flex-1 border-b-2 border-dashed border-slate-300 relative mx-2">
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded-full border border-sky-200 flex items-center gap-1">
                   {activeStep > 0 ? <TrendingUp className="w-3 h-3"/> : <TrendingDown className="w-3 h-3"/>}
                   ก้าวละ {activeStep}
                 </div>
               </div>
               
               <div className="flex flex-col items-center opacity-50 grayscale">
                 <span className="text-xs font-bold text-rose-500 mb-1">Stop Line</span>
                 <div className="w-8 h-8 rounded-lg bg-rose-50 border-2 border-rose-300 border-dashed flex items-center justify-center font-bold text-sm z-10">
                   {activeStop}
                 </div>
               </div>
             </div>
           )}
        </div>

        {/* Output Boxes */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-inner overflow-y-auto min-h-[300px]">
           {result.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
               <AlertCircle className="w-12 h-12 mb-2 text-rose-400" />
               <p className="text-center font-bold">พารามิเตอร์ขัดแย้งกัน!<br/>ไม่สามารถก้าวจาก {activeStart} ไปหา {activeStop} ด้วยก้าว {activeStep} ได้</p>
             </div>
           ) : (
             <div className="flex flex-wrap gap-2">
               {result.map((num, i) => (
                 <div key={i} className="w-14 h-14 flex items-center justify-center bg-orange-50 text-orange-700 font-black font-mono text-xl rounded-xl border-2 border-orange-200 shadow-sm transition-all hover:scale-110 hover:bg-orange-500 hover:text-white hover:border-orange-600 cursor-default">
                   {num}
                 </div>
               ))}
               {result.length > 50 && (
                 <div className="w-14 h-14 flex items-center justify-center text-slate-400 font-bold bg-slate-100 rounded-xl">...</div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   3. Main Export
   ───────────────────────────────────────────────── */
export default function Py4_12() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรมด้วยลูปทำซ้ำที่แน่นอน (For Loop & range):

1. พิมพ์ตัวเลขในขอบเขต: รับตัวเลขเริ่มและตัวเลขสิ้นสุดจากผู้ใช้ แล้วใช้ for loop ร่วมกับ range() พิมพ์ตัวเลขเรียงกันจากเริ่มถึงสิ้นสุดทีละบรรทัด

2. หาผลรวมเลข 1 ถึง N: รับตัวเลขจำนวนเต็มบวก n จากผู้ใช้ แล้วใช้ for loop คำนวณหาผลรวมของเลขตั้งแต่ 1 ถึง n และแสดงผลลัพธ์สุดท้าย

3. สูตรคูณแม่ที่ระบุ: รับตัวเลขแม่สูตรคูณจากผู้ใช้ 1 ตัว แล้วใช้ for loop วนซ้ำ 12 รอบ (1 ถึง 12) เพื่อพิมพ์ตารางสูตรคูณแม่นั้น

4. นับตัวเลขลดลงทีละ 2: ใช้ for loop และ range() เพื่อพิมพ์ตัวเลขถอยหลังตั้งแต่ 100 ลงมาจนถึง 0 โดยลดลงทีละ 2 ในแต่ละรอบ

5. หาผลรวมเลขคู่: รับตัวเลขสูงสุดจากผู้ใช้ แล้วใช้ for loop วนลูปหาผลรวมเฉพาะตัวเลขที่เป็นเลขคู่ตั้งแต่นเลข 1 ถึงเลขที่รับมา

6. คำนวณคะแนนเฉลี่ยในลิสต์: กำหนดลิสต์คะแนนสอบไว้ในโค้ด (เช่น [85, 72, 90, 68, 94]) แล้วใช้ for loop ดึงคะแนนแต่ละตัวมาคำนวณหาค่าเฉลี่ยของทั้งห้อง

7. นับจำนวนตัวอักษรพิมพ์ใหญ่: รับข้อความภาษาอังกฤษ 1 ประโยคจากผู้ใช้ แล้วใช้ for loop ตรวจสอบตัวอักษรทีละตัวเพื่อทำการนับว่ามีตัวอักษรพิมพ์ใหญ่อยู่กี่ตัว

8. แยกเลขคู่และเลขคี่: มีลิสต์ตัวเลขคละกันอยู่ 1 ชุด ให้ใช้ for loop ตรวจสอบตัวเลขในลิสต์ทีละตัว แล้วแยกเลขคู่ออกไปเก็บในลิสต์ใหม่ใบหนึ่ง และเลขคี่ในลิสต์ใหม่อีกใบหนึ่ง

9. หาค่ามากที่สุดในลิสต์: เขียนโค้ดหาค่าตัวเลขที่มากที่สุดในลิสต์ที่กำหนดให้ โดยห้ามใช้ฟังก์ชันสำเร็จรูปอย่าง max() แต่ให้ใช้ for loop วนลูปเปรียบเทียบทีละตัวแทน

10. ตัวคูณเลขยกกำลังสอง: ใช้ for loop และ range() คำนวณค่าตัวเลขยกกำลังสอง (เช่น 1^2, 2^2, 3^2, ...) ตั้งแต่เลข 1 ถึง 15 แล้วพิมพ์ผลลัพธ์ออกมาในแต่ละรอบ

11. พิมพ์ตารางหมากรุก: ใช้ฟังก์ชัน for loop ซ้อนกัน 2 ชั้น (Nested Loop) เพื่อสร้างตารางขนาด 5x5 โดยบรรทัดที่เป็นแถวคู่ให้พิมพ์ X แถวคี่ให้พิมพ์ O

12. ค้นหาตำแหน่งในลิสต์: กำหนดลิสต์รายชื่อผลไม้ไว้ จากนั้นรับชื่อผลไม้ที่ต้องการค้นหาจากผู้ใช้ แล้วใช้ for loop ไล่เช็คทีละตำแหน่งเพื่อบอกว่าผลไม้นั้นอยู่ที่ดัชนี (Index) ที่เท่าไหร่

13. โปรแกรมทวีคูณแบคทีเรีย: สมมติว่าแบคทีเรียจะเพิ่มจำนวนขึ้นเป็น 2 เท่าในทุกๆ ชั่วโมง ให้ใช้ for loop คำนวณและแสดงจำนวนแบคทีเรียในแต่ละชั่วโมง โดยเริ่มจาก 1 ตัว ไปจนครบ 24 ชั่วโมง

14. กรองชื่อที่สั้นเกินไป: มีลิสต์รายชื่อผู้ใช้งานอยู่ 1 ชุด ให้ใช้ for loop ตรวจสอบความยาวชื่อของทุกคน แล้วเลือกพิมพ์เฉพาะรายชื่อที่มีความยาวตั้งแต่ 5 ตัวอักษรขึ้นไปเท่านั้น

15. สร้างพาสเวิร์ดแบบสุ่ม: รับตัวเลขความยาวที่ต้องการจากผู้ใช้ จากนั้นใช้ for loop วนลูปตามจำนวนรอบความยาวนั้นเพื่อสุ่มเลือกตัวอักษรจากคลังคำมาต่อกันเป็นรหัสผ่านใหม่

16. สลับด้านข้อความ (Reverse String): รับข้อความจากผู้ใช้ 1 ประโยค แล้วใช้ for loop วนลูปจากตัวอักษรตัวสุดท้ายย้อนกลับมาตัวแรก เพื่อสร้างและพิมพ์ข้อความชุดใหม่ที่กลับด้านแล้ว

17. นับจำนวนตัวเลขที่หาร 3 และ 5 ลงตัว: ใช้ for loop วนเช็คตัวเลขตั้งแต่ 1 ถึง 500 แล้วให้นับว่ามีตัวเลขทั้งหมดกี่ตัวที่สามารถนำ 3 และ 5 ไปหารได้ลงตัวพร้อมกัน

18. โปรแกรมคำนวณราคาหลังหักภาษี: มีลิสต์ราคาสินค้าอยู่ 1 ชุด ให้ใช้ for loop ดึงราคาสินค้าแต่ละชิ้นมาคำนวณบวกภาษีมูลค่าเพิ่ม 7% แล้วบันทึกผลลัพธ์กลับลงไปในลิสต์ใหม่

19. วาดรูปสามเหลี่ยมดาวมุมฉาก: รับตัวเลขจำนวนแถวจากผู้ใช้ แล้วใช้ฟังก์ชัน for loop ควบคุมจำนวนรอบการพิมพ์เครื่องหมายดาว * ให้เพิ่มขึ้นตามจำนวนแถว (แถวที่ 1 มี 1 ดวง, แถวที่ 2 มี 2 ดวง ไปเรื่อยๆ)

20. ตรวจสอบคำต้องห้าม: กำหนดลิสต์คำต้องห้ามเอาไว้ในระบบ จากนั้นรับประโยคจากผู้ใช้ แล้วใช้ for loop ตรวจสอบว่าในประโยคนั้นมีคำต้องห้ามอยู่หรือไม่ หากมีให้เปลี่ยนคำนั้นเป็นเครื่องหมาย ***`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-sky-200 selection:text-sky-950">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-[120px]" />
        <div className="absolute top-[50%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-100/60 blur-[120px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-4xl font-black mb-4 tracking-tight pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-500">
            วนซ้ำที่แน่นอนด้วย for และ range()
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            ลูป <strong>for</strong> ใช้สำหรับเข้าถึงสมาชิกแต่ละตัวในลำดับข้อมูล เช่น ลิสต์ (List) หรือข้อความ (String) 
            ส่วนฟังก์ชัน <strong>range()</strong> ช่วยเสกกลุ่มตัวเลขขึ้นมาเพื่อระบุรอบการทำงานได้ตามต้องการ
          </p>
        </div>

        {/* Section 1: for Loop */}
        <div className="mb-12 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-sky-100 p-2 rounded-xl text-sky-600">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800">4.12.1 การใช้งานลูป for เชิงลึก</h4>
              <p className="text-slate-500 text-sm">การดึงข้อมูลจากชุดข้อมูลลำดับมาประมวลผลทีละรอบ</p>
            </div>
          </div>
          <ForLoopSimulator />
        </div>

        {/* Section 2: range() Function */}
        <div className="mb-12 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800">4.12.2 การสร้างชุดตัวเลขด้วยฟังก์ชัน range()</h4>
              <p className="text-slate-500 text-sm">การระบุพารามิเตอร์เพื่อปรับทิศทางและจังหวะก้าวเดินของตัวเลข</p>
            </div>
          </div>

          {/* Theory Section */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl mb-12">
              <h4 className="text-2xl font-black text-orange-600 mb-6 flex items-center gap-4">
                <ChevronsRight className="w-10 h-10 text-orange-500" />
                เสกตัวเลขด้วย range()
              </h4>
              
              <p className="text-slate-600 leading-relaxed text-lg mb-8 max-w-3xl">
                ฟังก์ชัน <code className="bg-orange-50 text-orange-700 px-2 py-1 rounded font-bold">range()</code> คือเครื่องมือสร้าง "ลำดับตัวเลข" (Sequence of numbers) นิยมใช้คู่กับ <code className="bg-slate-100 px-1 rounded">for</code> เพื่อกำหนดจำนวนรอบการทำงาน โดยไม่ต้องสร้างตัวแปรมานั่งบวกค่าเองทีละหนึ่งเหมือน <code className="bg-slate-100 px-1 rounded">while</code>
              </p>

              <h5 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-orange-500 pl-4">
                รูปแบบพารามิเตอร์ (การเรียกใช้งาน 3 แบบ)
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors">
                   <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span> ใส่ค่าเดียว (Stop)</h5>
                   <code className="block bg-white p-3 rounded-xl border border-slate-200 font-bold text-orange-600 text-center shadow-sm mb-4">range(5)</code>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     ถ้าระบุแค่ 1 ค่า ระบบจะมองว่านั่นคือ <strong>จุดสิ้นสุด (Stop)</strong><br/>
                     ระบบจะแอบตั้งค่าเริ่มต้น (Start) เป็น <strong className="text-orange-500">0</strong> ให้เสมอ
                   </p>
                   <div className="mt-4 font-mono text-sm bg-slate-200 px-3 py-2 rounded-lg text-slate-700 text-center">0, 1, 2, 3, 4</div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors">
                   <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span> ใส่สองค่า (Start, Stop)</h5>
                   <code className="block bg-white p-3 rounded-xl border border-slate-200 font-bold text-orange-600 text-center shadow-sm mb-4">range(1, 6)</code>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     ระบุ <strong>จุดเริ่มต้น (Start)</strong> และ <strong>จุดสิ้นสุด (Stop)</strong><br/>
                     จำไว้ว่ามันจะหยุด <strong className="text-rose-500">"ก่อนถึง"</strong> เลข Stop เสมอ (ไม่รวมเลข 6)
                   </p>
                   <div className="mt-4 font-mono text-sm bg-slate-200 px-3 py-2 rounded-lg text-slate-700 text-center">1, 2, 3, 4, 5</div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors">
                   <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">3</span> ใส่สามค่า (+ Step)</h5>
                   <code className="block bg-white p-3 rounded-xl border border-slate-200 font-bold text-orange-600 text-center shadow-sm mb-4">range(0, 10, 2)</code>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     ค่าที่สามคือ <strong>ระยะก้าว (Step)</strong><br/>
                     บอกว่าจะให้เพิ่มทีละเท่าไร (หรือลดทีละเท่าไรถ้าใส่ค่าติดลบ)
                   </p>
                   <div className="mt-4 font-mono text-sm bg-slate-200 px-3 py-2 rounded-lg text-slate-700 text-center">0, 2, 4, 6, 8</div>
                </div>
                
              </div>

              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 flex gap-4 items-start">
                 <Info className="w-8 h-8 text-rose-500 shrink-0" />
                 <div>
                   <h5 className="font-bold text-rose-800 mb-1">ทำไม Stop ถึงไม่ถูกรวม? (Exclusive Boundary)</h5>
                   <p className="text-rose-700/80 text-sm leading-relaxed">
                     เป็นรูปแบบดั้งเดิมของชาวโปรแกรมเมอร์ (0-indexed) การเขียนว่า <code>range(5)</code> แปลว่า <strong>"ขอตัวเลข 5 ตัว"</strong> ถ้าเริ่มนับจาก 0 มันก็จะไปจบที่ 4 (0, 1, 2, 3, 4 ได้ครบ 5 ตัวพอดี) ถ้ารวมเลข 5 ไปด้วย มันจะกลายเป็น 6 ตัว ซึ่งทำให้งงกว่าเดิมเวลาเอาไปประยุกต์ใช้กับตำแหน่ง (Index) ของ List
                   </p>
                 </div>
              </div>

          </div>

          <RangeSimulator />
        </div>

        {/* Section 3: Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (หน่วยที่ 4.12)" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
