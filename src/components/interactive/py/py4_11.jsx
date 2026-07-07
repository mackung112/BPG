import TeacherTask from '../../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play,
  Pause,
  RotateCcw,
  Code2,
  RefreshCw,
  Zap,
  FastForward,
  LogOut,
  TerminalSquare
} from 'lucide-react';

const WhileSimulator = () => {
  const [maxCount, setMaxCount] = useState(5);
  
  const [sim, setSim] = useState({
    count: 0,
    line: 0,
    logs: [],
    action: null,
    isRunning: false
  });

  const timerRef = useRef(null);

  const resetSim = () => {
    setSim({
      count: 0,
      line: 0,
      logs: [],
      action: null,
      isRunning: false
    });
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleManualAction = (action) => {
    if (sim.isRunning) {
      setSim(prev => ({ ...prev, action }));
    }
  };

  const toggleRun = () => {
    setSim(prev => {
      if (prev.count >= maxCount && !prev.isRunning) {
        return { count: 0, line: 0, logs: [], action: null, isRunning: true };
      }
      return { ...prev, isRunning: !prev.isRunning };
    });
  };

  useEffect(() => {
    if (!sim.isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSim(prev => {
        let { line, count, logs, action, isRunning } = prev;
        let nextLine = line;
        
        // Loop Logic Machine
        if (line === 0 || line === 6) {
          if (count >= maxCount) {
             isRunning = false;
          } else {
             nextLine = 1;
          }
        } 
        else if (line === 1) {
          if (count >= maxCount) {
             isRunning = false;
          } else {
             nextLine = 2; // Enter block
          }
        } 
        else if (line === 2) {
          // Check for manual user interrupt
          if (action === 'break') {
             logs = [...logs, `[BREAK] ออกจากลูปทันทีที่รอบ ${count}`];
             isRunning = false;
             action = null;
             nextLine = 0;
          } else if (action === 'continue') {
             logs = [...logs, `[CONTINUE] ข้ามการทำงานรอบ ${count} ไปยังรอบถัดไป`];
             count += 1; // Increment safely so we don't infinite loop in simulator
             nextLine = 1; // Go back to while check
             action = null;
          } else {
             nextLine = 5; // Normal print
          }
        } 
        else if (line === 5) {
          logs = [...logs, `รันคำสั่งปกติรอบที่ ${count}`];
          nextLine = 6;
        } 
        else if (line === 6) {
          count += 1;
          nextLine = 1; // Loop back
        }

        return { line: nextLine, count, logs, action, isRunning };
      });
    }, 1200);

    return () => clearInterval(timerRef.current);
  }, [sim.isRunning, maxCount]);


  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-50"></div>
      
      {/* Code Editor Panel */}
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-indigo-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <TerminalSquare className="w-5 h-5" /> จำลองการควบคุมลูป (Break & Continue)
        </h4>
        
        <p className="font-sans text-slate-400 text-sm mb-6">
          กด Run เพื่อให้ลูปทำงาน จากนั้นลองกดปุ่ม Break หรือ Continue <strong className="text-amber-400">ในขณะที่ลูปกำลังทำงานอยู่</strong> เพื่อดูผลลัพธ์
        </p>

        <div className="flex gap-2 mb-6">
          {!sim.isRunning ? (
            <button 
              onClick={toggleRun}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm shadow-md"
            >
              <Play className="w-5 h-5" /> Run Loop
            </button>
          ) : (
            <button 
              onClick={toggleRun}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm shadow-md"
            >
              <Pause className="w-5 h-5" /> Pause
            </button>
          )}
          <button 
            onClick={resetSim}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
          >
            <RotateCcw className="w-5 h-5" /> Reset
          </button>
        </div>
        
        <div className="flex flex-col gap-2 relative bg-black/40 p-6 rounded-2xl border border-slate-800">
          
          <div className="mb-2">
            <span className="text-blue-400">count</span> = <span className="text-amber-400">{sim.count}</span>
          </div>
          
          {/* While Statement */}
          <div className={`transition-all duration-300 rounded p-1 ${sim.line === 1 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] shadow-lg' : ''}`}>
             <span className="text-pink-500">while</span> <span className="text-blue-400">count</span> &lt; <span className="text-amber-400">{maxCount}</span>:
          </div>
          
          {/* Simulated user interrupt block */}
          <div className={`ml-8 transition-all duration-300 rounded p-1 ${sim.line === 2 ? 'bg-indigo-900/40 outline outline-1 outline-indigo-500/30' : 'opacity-80'}`}>
             <span className="text-slate-500 text-sm"># (เช็คการกดปุ่มจากผู้ใช้)</span>
          </div>

          <div className={`ml-8 transition-all duration-300 rounded p-1 ${sim.line === 5 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] shadow-lg' : 'opacity-80'}`}>
             <span className="text-yellow-200">print</span>(<span className="text-emerald-400">f"รันคำสั่งปกติรอบที่ {'{count}'}"</span>)
          </div>
          <div className={`ml-8 transition-all duration-300 rounded p-1 ${sim.line === 6 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] shadow-lg' : 'opacity-80'}`}>
             <span className="text-blue-400">count</span> += <span className="text-amber-400">1</span>
          </div>

        </div>

        {/* Interactive Loop Controls */}
        <div className="mt-8 grid grid-cols-2 gap-4">
           <button 
             onClick={() => handleManualAction('break')}
             disabled={!sim.isRunning}
             className="bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:grayscale text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
           >
             <LogOut className="w-6 h-6" /> Break<br/><span className="text-xs font-normal opacity-80">พังลูปทิ้งทันที!</span>
           </button>
           <button 
             onClick={() => handleManualAction('continue')}
             disabled={!sim.isRunning}
             className="bg-sky-600 hover:bg-sky-500 disabled:opacity-30 disabled:grayscale text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(2,132,199,0.4)]"
           >
             <FastForward className="w-6 h-6" /> Continue<br/><span className="text-xs font-normal opacity-80">ข้ามไปเริ่มรอบใหม่!</span>
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
           <RefreshCw className={`w-5 h-5 text-indigo-500 ${sim.isRunning ? 'animate-spin' : ''}`} /> Console Output
        </h4>

        <div className="flex-1 bg-black rounded-xl p-6 font-mono text-emerald-400 shadow-inner overflow-y-auto max-h-[400px]">
           <div className="text-slate-500 text-sm mb-4">$ python loop.py</div>
           <div className="flex flex-col gap-2">
             {sim.logs.map((log, i) => (
               <div key={i} className={`animate-[fade-in_0.3s_ease-out] ${log.includes('[BREAK]') ? 'text-rose-400 font-bold' : log.includes('[CONTINUE]') ? 'text-sky-400 font-bold' : ''}`}>
                 {log}
               </div>
             ))}
             {sim.isRunning && (sim.line === 5 || sim.line === 2) && (
               <div className="w-2 h-4 bg-emerald-400 animate-pulse mt-1"></div>
             )}
             {!sim.isRunning && sim.logs.length > 0 && !sim.action && sim.count >= maxCount && (
               <div className="text-slate-500 mt-4">Process finished.</div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_11_WhileLoop() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรมด้วยลูปขณะที่ (While Loop):

1. นับถอยหลังยานอวกาศ: รับตัวเลขจำนวนเต็มบวกจากผู้ใช้ แล้วใช้ while loop นับถอยหลังทีละ 1 จนถึง 0 จากนั้นให้พิมพ์คำว่า "Blast Off!"

2. โปรแกรมทายตัวเลขซ่อนอยู่: กำหนดตัวเลขเป้าหมายไว้ในโค้ด แล้วใช้ while loop รับค่าการทายจากผู้ใช้ไปเรื่อยๆ จนกว่าจะทายถูก โดยคอยคำใบ้ว่า "มากเกินไป" หรือ "น้อยเกินไป"

3. เครื่องคิดเลขสะสมยอดรวม: ใช้ while loop รับค่าตัวเลขจากผู้ใช้ไปเรื่อยๆ เพื่อนำมาบวกทบกัน และจะหยุดทำงานเมื่อผู้ใช้พิมพ์เลข 0 จากนั้นให้แสดงผลรวมทั้งหมด

4. ตู้ฝากเงินเป้าหมาย: รับเงินต้นเริ่มต้น และเป้าหมายเงินออม จากนั้นใช้ while loop สมมติการหยอดกระปุกครั้งละ 50 บาท จนกว่าเงินจะถึงหรือเกินเป้าหมาย พร้อมนับว่าต้องหยอดทั้งหมดกี่ครั้ง

5. สูตรคูณแม่ที่กำหนด: รับตัวเลขแม่สูตรคูณจากผู้ใช้ 1 ตัว แล้วใช้ while loop คูณเลขตัวนั้นกับตัวคูณตั้งแต่ 1 ถึง 12 พร้อมแสดงผลลัพธ์ทีละบรรทัด

6. ตัดคะแนนจนกว่าจะหมด: ตั้งคะแนนเริ่มต้นไว้ 100 คะแนน แล้วใช้ while loop สุ่มหักคะแนนออกครั้งละ 1 ถึง 10 คะแนนไปเรื่อยๆ จนกว่าคะแนนจะเหลือน้อยกว่าหรือเท่ากับ 0 พร้อมแสดงจำนวนรอบที่หัก

7. หาความยาวข้อความขั้นต่ำ: ใช้ while loop รับข้อความจากผู้ใช้ไปเรื่อยๆ ตราบใดที่ข้อความนั้นมีความยาวไม่ถึง 8 ตัวอักษร หากถึงแล้วให้หยุดลูปและแสดงข้อความนั้น

8. โปรแกรมกรอกรหัสผ่านซ้ำ: กำหนดรหัสผ่านที่ถูกต้องไว้ในระบบ แล้วใช้ while loop ให้ผู้ใช้กรอกรหัสผ่าน หากผิดให้กรอกใหม่ไปเรื่อยๆ จนกว่าจะถูก จึงจะอนุญาตให้เข้าสู่ระบบ

9. คำนวณแฟกทอเรียล (Factorial): รับตัวเลขจำนวนเต็มบวก n จากผู้ใช้ แล้วใช้ while loop คูณลดแต้มลงมาเรื่อยๆ (เช่น 4 x 3 x 2 x 1) เพื่อหาค่า แฟกทอเรียล

10. แสดงเลขคู่ในขอบเขต: รับตัวเลขสิ้นสุดจากผู้ใช้ จากนั้นใช้ while loop เริ่มพิมพ์ตั้งแต่เลข 2 และเพิ่มทีละ 2 ไปเรื่อยๆ จนกว่าจะเกินตัวเลขที่ผู้ใช้กำหนด

11. เกมเป่ายิ้งฉุบชนะ 3 ใน 5: ใช้ while loop จำลองการแข่งเป่ายิ้งฉุบกับคอมพิวเตอร์ไปเรื่อยๆ ระบบจะหยุดทำงานก็ต่อเมื่อมีฝ่ายใดใดฝ่ายหนึ่งทำคะแนนชนะครบ 3 ครั้งก่อน

12. หารสองไปเรื่อยๆ: รับตัวเลขจำนวนเต็มบวกขนาดยิ่งใหญ่จากผู้ใช้ แล้วใช้ while loop นำเลขนั้นมาหารด้วย 2 ไปเรื่อยๆ ตราบใดที่ค่ายังมากกว่า 1 พร้อมนับว่าหารได้ทั้งหมดกี่ครั้ง

13. โปรแกรมรับคำสั่งเมนูควบคุม: สร้างเมนู 1.กินข้าว 2.นอน 3.ออกจากระบบ โดยใช้ while loop รันหน้าเมนูนี้ซ้ำๆ ตราบใดที่ผู้ใช้ยังไม่กดเลือกเมนูหมายเลข 3

14. หาตัวประกอบของตัวเลข: รับตัวเลขจำนวนเต็มจากผู้ใช้ แล้วใช้ while loop ตรวจสอบไล่ตั้งแต่เลข 1 ขึ้นไปทีละตัว เพื่อดูว่ามีเลขใดบ้างที่นำไปหารเลขของผู้ใช้ได้ลงตัว

15. บวกเลขโดดในจำนวน: รับตัวเลขจำนวนเต็มยาวๆ เช่น 5384 แล้วใช้ while loop ดึงเลขทีละหลัก (ใช้การหารเอาเศษ) นำมาบวกกันให้ได้ผลรวมของเลขโดดทั้งหมด (5+3+8+4)

16. โปรแกรมพิมพ์รูปบันไดดาว: รับตัวเลขจำนวนแถวจากผู้ใช้ แล้วใช้ while loop ควบคุมการพิมพ์เครื่องหมายดาว * ให้เพิ่มขึ้นทีละ 1 ดวงในแต่ละบรรทัดจนครบจำนวนแถว

17. พิมพ์ตัวอักษรทีละตัว: รับข้อความ 1 ข้อความจากผู้ใช้ แล้วใช้ while loop ควบคุมดัชนี (Index) เพื่อดึงตัวอักษรออกมาพิมพ์ทีละบรรทัดตั้งแต่ตัวแรกจนถึงตัวสุดท้าย

18. เครื่องเตือนความจำกินยา: ใช้ while loop จำลองเวลาตั้งแต่ 1 ถึง 24 ชั่วโมง โดยโปรแกรมจะพิมพ์แจ้งเตือนว่า "ได้เวลากินยา" ทุกๆ 6 ชั่วโมง (ชั่วโมงที่ 6, 12, 18, 24)

19. สุ่มเลขไม่ซ้ำให้ครบจำนวน: ใช้ while loop ควบคุมการสุ่มตัวเลข 1-10 เข้าไปเก็บในลิสต์ โดยจะสุ่มไปเรื่อยๆ และข้ามเลขที่ซ้ำ จนกว่าจะได้ตัวเลขในลิสต์ครบ 5 ตัวไม่ซ้ำกัน

20. ลำดับฟีโบนัชชี (Fibonacci) ไม่เกินค่าที่กำหนด: รับตัวเลขสูงสุดจากผู้ใช้ จากนั้นใช้ while loop คำนวณและแสดงลำดับเลขฟีโบนัชชี (0, 1, 1, 2, 3, 5, 8...) ไปเรื่อยๆ ตราบใดที่ค่าของตัวเลขยังไม่เกินค่าที่รับมา`;

  return (
    <div className="font-sans text-slate-900 pb-24">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-[120px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Theory Section */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl mb-12 flex flex-col gap-12">
            <div className="max-w-3xl">
               <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-normal pb-2 flex items-center gap-4">
                 <RefreshCw className="w-10 h-10 text-teal-600" /> ลูปทำงานซ้ำ while
               </h3>
               <p className="text-slate-600 leading-relaxed text-lg mb-6">
                 การเขียนโปรแกรมบางครั้งเราต้องทำงานเดิมซ้ำๆ การก๊อปปี้โค้ดวางต่อกันไม่ใช่ทางออกที่ดี คำสั่ง <code className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">while</code> ถูกสร้างมาเพื่อสร้าง <strong>ลูป (Loop)</strong> หลักการจำง่ายๆ คือ <strong>"ตราบใดที่เงื่อนไขยังเป็นจริง ก็จงทำต่อไป"</strong>
               </p>
            </div>
            
            {/* 4.13.1 */}
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-6 border-l-[3px] border-indigo-500 pl-4">โครงสร้างคำสั่ง while loop</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
                   <div className="absolute top-4 right-4 text-indigo-200"><RefreshCw className="w-16 h-16" /></div>
                   <h5 className="text-lg font-bold text-indigo-800 mb-2 relative z-10">จุดเริ่มต้น (Init)</h5>
                   <p className="text-indigo-700/80 text-sm relative z-10">
                     ต้องมีตัวแปรเพื่อใช้นับรอบ หรือเช็คเงื่อนไขก่อนเริ่มลูป เช่น <code>count = 0</code>
                   </p>
                </div>
                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
                   <div className="absolute top-4 right-4 text-indigo-200"><Zap className="w-16 h-16" /></div>
                   <h5 className="text-lg font-bold text-indigo-800 mb-2 relative z-10">เงื่อนไขรันลูป (Condition)</h5>
                   <p className="text-indigo-700/80 text-sm relative z-10">
                     กำหนดสิ่งที่ทำให้ลูปทำงานต่อ เช่น <code>while count &lt; 5:</code> ถ้าเท็จจะหลุดลูป
                   </p>
                </div>
                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
                   <div className="absolute top-4 right-4 text-indigo-200"><RotateCcw className="w-16 h-16" /></div>
                   <h5 className="text-lg font-bold text-indigo-800 mb-2 relative z-10">จุดอัปเดตค่า (Update)</h5>
                   <p className="text-indigo-700/80 text-sm relative z-10 font-bold text-rose-500">
                     สำคัญ! ต้องอัปเดตค่าตัวแปรในลูป ไม่งั้นจะเกิด Infinite Loop (ลูปค้าง)
                   </p>
                </div>
              </div>
            </div>

            {/* 4.13.2 */}
            <div className="mt-8">
              <h4 className="text-2xl font-bold text-slate-900 mb-6 border-l-[3px] border-indigo-500 pl-4">การควบคุมลูปด้วย break และ continue</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-rose-50 border border-rose-200 p-8 rounded-3xl flex flex-col justify-between">
                    <div>
                      <LogOut className="w-12 h-12 text-rose-500 mb-4" />
                      <h5 className="text-2xl font-black text-rose-700 mb-2">คำสั่ง break</h5>
                      <p className="text-rose-600/80 mb-4">
                        ใช้เมื่อต้องการ <strong>"พังประตูออกจากลูปทันที"</strong> ไม่ว่าลูปนั้นจะเหลือการทำงานอีกกี่รอบก็ตาม (มักใช้คู่กับ if เพื่อเช็คเงื่อนไขฉุกเฉิน)
                      </p>
                    </div>
                    <div className="mt-4 bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 border border-slate-800 text-left">
                      <div className="text-slate-500 mb-1"># ตัวอย่างการใช้ break</div>
                      <div>count = <span className="text-amber-400">1</span></div>
                      <div><span className="text-pink-500">while</span> count &lt;= <span className="text-amber-400">5</span>:</div>
                      <div className="pl-4"><span className="text-pink-500">if</span> count == <span className="text-amber-400">3</span>:</div>
                      <div className="pl-8"><span className="text-rose-400 font-bold">break</span>  <span className="text-slate-500"># หลุดลูปทันที</span></div>
                      <div className="pl-4"><span className="text-yellow-200">print</span>(count)</div>
                      <div className="pl-4">count += <span className="text-amber-400">1</span></div>
                    </div>
                 </div>
                 <div className="bg-sky-50 border border-sky-200 p-8 rounded-3xl flex flex-col justify-between">
                    <div>
                      <FastForward className="w-12 h-12 text-sky-500 mb-4" />
                      <h5 className="text-2xl font-black text-sky-700 mb-2">คำสั่ง continue</h5>
                      <p className="text-sky-600/80 mb-4">
                        ใช้เมื่อต้องการ <strong>"ข้ามการทำงานที่เหลือของรอบนี้"</strong> และกระโดดกลับไปเช็คเงื่อนไขที่หัวลูปเพื่อเริ่มรอบใหม่ทันที
                      </p>
                    </div>
                    <div className="mt-4 bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 border border-slate-800 text-left">
                      <div className="text-slate-500 mb-1"># ตัวอย่างการใช้ continue</div>
                      <div>count = <span className="text-amber-400">0</span></div>
                      <div><span className="text-pink-500">while</span> count &lt; <span className="text-amber-400">5</span>:</div>
                      <div className="pl-4">count += <span className="text-amber-400">1</span></div>
                      <div className="pl-4"><span className="text-pink-500">if</span> count == <span className="text-amber-400">3</span>:</div>
                      <div className="pl-8"><span className="text-sky-400 font-bold">continue</span>  <span className="text-slate-500"># ข้ามรอบนี้</span></div>
                      <div className="pl-4"><span className="text-yellow-200">print</span>(count)</div>
                    </div>
                 </div>
              </div>
            </div>

        </div>

        {/* Simulator */}
        <WhileSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
