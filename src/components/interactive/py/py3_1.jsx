import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Code2, 
  MessageSquare, 
  AlignLeft, 
  TerminalSquare,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Play,
  RotateCcw,
  XCircle,
  FileCode2,
  Search,
  Eye,
  EyeOff,
  CornerDownRight
} from 'lucide-react';

// ============================================================================
// 1. Code Structure Inspector (Enhanced)
// ============================================================================
const CodeStructureInspector = () => {
  const [activeHighlight, setActiveHighlight] = useState('none');

  const pythonCode = [
    { id: 1, type: 'comment', text: '# โปรแกรมคำนวณเกรดเบื้องต้น', indent: 0, exp: 'นี่คือ Comment ที่อธิบายภาพรวมของโปรแกรม จะไม่ถูกประมวลผล' },
    { id: 2, type: 'code', text: 'score = int(input("Enter score: "))', indent: 0, exp: 'นี่คือคำสั่งรับค่าและแปลงเป็นตัวเลข (Statement)' },
    { id: 3, type: 'code', text: 'if score >= 80:', indent: 0, exp: 'คำสั่ง if เพื่อตรวจสอบเงื่อนไข สังเกตเครื่องหมาย : ท้ายบรรทัด' },
    { id: 4, type: 'comment', text: '    # ถ้านักเรียนได้คะแนน 80 ขึ้นไปจะได้เกรด A', indent: 0, exp: 'Comment ที่อยู่ด้านใน Block ของ if (ย่อหน้าตามลงมาด้วย)' },
    { id: 5, type: 'code', text: 'print("Grade: A")', indent: 1, exp: 'คำสั่ง print ที่ต้องย่อหน้า 4 เคาะ เพราะเป็นส่วนหนึ่งของ if' },
    { id: 6, type: 'code', text: 'else:', indent: 0, exp: 'คำสั่ง else ไม่ต้องย่อหน้า เพราะอยู่ระดับเดียวกับ if' },
    { id: 7, type: 'code', text: 'print("Grade: F")', indent: 1, exp: 'คำสั่ง print ที่ต้องย่อหน้า 4 เคาะ เพราะเป็นส่วนหนึ่งของ else' }
  ];

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-bl-full blur-3xl -z-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-70"></div>
      
      <div className="relative z-10 text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <TerminalSquare className="w-8 h-8 text-indigo-400" />
          Python Code Inspector
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose text-lg">
          เครื่องมือแสกนโครงสร้างโค้ด Python ลองกดปุ่มด้านล่างเพื่อไฮไลต์ส่วนประกอบสำคัญต่างๆ 
          ในภาษา Python ที่ทำให้โค้ดอ่านง่ายและเป็นระเบียบ
        </p>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
           <button 
             onClick={() => setActiveHighlight(activeHighlight === 'comment' ? 'none' : 'comment')}
             className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
               activeHighlight === 'comment' 
               ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]' 
               : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700'
             }`}
           >
             <MessageSquare className={`w-7 h-7 shrink-0 mt-1 ${activeHighlight === 'comment' ? 'text-emerald-400' : 'text-slate-500'}`} />
             <div>
               <h4 className="font-bold text-xl mb-2">การคอมเมนต์ (Comments)</h4>
               <p className="text-sm opacity-90 leading-relaxed font-light">ส่วนที่ใช้เครื่องหมาย # อธิบายโค้ด โปรแกรมจะข้ามบรรทัดนี้ไป ไม่เกิด Error ใดๆ</p>
             </div>
           </button>

           <button 
             onClick={() => setActiveHighlight(activeHighlight === 'indent' ? 'none' : 'indent')}
             className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
               activeHighlight === 'indent' 
               ? 'bg-amber-500/20 border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]' 
               : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700'
             }`}
           >
             <AlignLeft className={`w-7 h-7 shrink-0 mt-1 ${activeHighlight === 'indent' ? 'text-amber-400' : 'text-slate-500'}`} />
             <div>
               <h4 className="font-bold text-xl mb-2">การย่อหน้า (Indentation)</h4>
               <p className="text-sm opacity-90 leading-relaxed font-light">การเว้นวรรค 4 เคาะ บ่งบอกขอบเขตการทำงาน (Block) ของคำสั่ง หากเว้นผิดโปรแกรมจะพังทันที</p>
             </div>
           </button>

           <button 
             onClick={() => setActiveHighlight(activeHighlight === 'command' ? 'none' : 'command')}
             className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
               activeHighlight === 'command' 
               ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.02]' 
               : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700'
             }`}
           >
             <Code2 className={`w-7 h-7 shrink-0 mt-1 ${activeHighlight === 'command' ? 'text-blue-400' : 'text-slate-500'}`} />
             <div>
               <h4 className="font-bold text-xl mb-2">คำสั่ง (Statements & Keywords)</h4>
               <p className="text-sm opacity-90 leading-relaxed font-light">คำสั่งหลักที่ใช้สั่งงานคอมพิวเตอร์ เช่น if, else, print ซึ่ง Python จะทำงานทีละบรรทัดจากบนลงล่าง</p>
             </div>
           </button>
        </div>

        {/* Code View */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div className="bg-[#0D1117] rounded-2xl border border-slate-700 font-mono text-sm md:text-base p-6 shadow-2xl relative overflow-hidden flex-1">
            {/* MacOS dots */}
            <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
              <div className="ml-auto text-xs text-slate-500 flex items-center gap-2"><FileCode2 className="w-4 h-4"/> main.py</div>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              {pythonCode.map((line, idx) => {
                const isComment = line.type === 'comment';
                const isIndent = line.indent > 0;
                const isCommand = line.type === 'code';

                // Determine highlighting classes
                let highlightClass = "text-slate-300 transition-colors duration-500";
                let bgClass = "bg-transparent transition-all duration-500 border border-transparent";
                let tooltipText = "";
                
                if (activeHighlight === 'comment' && isComment) {
                    highlightClass = "text-emerald-400 font-bold";
                    bgClass = "bg-emerald-500/10 border-emerald-500/30 scale-[1.01] rounded-lg px-2 -ml-2";
                    tooltipText = line.exp;
                } else if (activeHighlight === 'command' && isCommand && !isComment) {
                    highlightClass = "text-blue-400 font-bold";
                    bgClass = "bg-blue-500/10 border-blue-500/30 scale-[1.01] rounded-lg px-2 -ml-2";
                    tooltipText = line.exp;
                } else if (activeHighlight === 'indent' && (isIndent || (isComment && line.text.startsWith('    ')))) {
                    highlightClass = "text-amber-100";
                    bgClass = "bg-slate-800/80 border-amber-500/30 rounded-lg px-2 -ml-2";
                    tooltipText = "นี่คือ Block การทำงานที่อยู่ภายใต้คำสั่งด้านบน";
                } else if (activeHighlight !== 'none') {
                    highlightClass = "text-slate-600 blur-[1px]"; // Unfocused lines
                }

                return (
                  <div key={line.id} className={`flex items-center group relative cursor-crosshair ${bgClass}`}>
                    {/* Line Number */}
                    <div className="w-8 text-right pr-4 text-slate-600 select-none shrink-0 font-light border-r border-slate-800 mr-4">{idx + 1}</div>
                    
                    {/* Indentation Visualizer */}
                    {activeHighlight === 'indent' && isIndent && (
                      <div className="w-[32px] h-full flex items-center shrink-0">
                        <div className="h-6 w-full border-b-2 border-l-2 border-dashed border-amber-500 rounded-bl-xl relative">
                          <span className="absolute -top-6 left-2 text-[10px] text-amber-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded-md border border-amber-500/50 z-20 shadow-lg">4 Spaces (1 Tab)</span>
                        </div>
                      </div>
                    )}
                    {activeHighlight === 'indent' && isComment && line.text.startsWith('    ') && (
                      <div className="w-[32px] h-full flex items-center shrink-0">
                        <div className="h-full w-full border-l-2 border-dashed border-amber-500/30"></div>
                      </div>
                    )}
                    {activeHighlight === 'indent' && line.indent === 0 && !line.text.startsWith('    ') && (
                      <div className="w-[0px] h-full"></div>
                    )}

                    {/* Code Text */}
                    <div className={`${highlightClass} whitespace-pre py-1 flex-1`}>
                      {activeHighlight === 'indent' && (isIndent || line.text.startsWith('    ')) ? line.text.replace('    ', '') : line.text}
                    </div>

                    {/* Tooltip on Hover if Active */}
                    {activeHighlight !== 'none' && tooltipText !== '' && (
                      <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 flex items-center gap-2 translate-x-4 group-hover:translate-x-0">
                        <div className="bg-slate-800 text-xs px-3 py-1.5 rounded-lg border shadow-xl flex items-center gap-2 max-w-[250px] whitespace-normal
                          ${activeHighlight === 'comment' ? 'border-emerald-500 text-emerald-300' : 
                            activeHighlight === 'indent' ? 'border-amber-500 text-amber-300' : 'border-blue-500 text-blue-300'}">
                          <Search className="w-3 h-3 shrink-0" />
                          {tooltipText}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Explanation Box */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 min-h-[80px] flex items-center shadow-lg">
             <div className="flex items-start gap-4 w-full">
                <div className="bg-indigo-500/20 p-2 rounded-lg shrink-0">
                  <Lightbulb className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">
                    {activeHighlight === 'none' ? 'เริ่มแสกนโครงสร้างโค้ด' : 
                     activeHighlight === 'comment' ? 'เจาะลึก: Comment' :
                     activeHighlight === 'indent' ? 'เจาะลึก: Indentation' : 'เจาะลึก: Statements'}
                  </h5>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {activeHighlight === 'none' ? 'คลิกปุ่มด้านซ้ายเพื่อดูว่าแต่ละบรรทัดในภาษา Python ถูกจัดประเภทเป็นโครงสร้างแบบไหน' : 
                     activeHighlight === 'comment' ? 'การเขียนคอมเมนต์ที่ดีช่วยให้คุณและทีมทำงานง่ายขึ้น ลองใช้ # อธิบายโค้ดที่ซับซ้อนเสมอ' :
                     activeHighlight === 'indent' ? 'IndentationError คือฝันร้ายของมือใหม่! ตรวจสอบเสมอว่าเว้นวรรค 4 เคาะเท่ากันทุกบรรทัดใน Block เดียวกัน' : 
                     'คำสั่งต่างๆ จะทำงานเรียงตามลำดับจากบรรทัดบนสุดลงมาล่างสุด (Top-down execution) เสมอ ยกเว้นจะถูกควบคุมด้วย Loop หรือ Condition'}
                  </p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 2. Interactive Indentation Fixer Game
// ============================================================================
const IndentationFixer = () => {
  // Lines state. True means it is indented (4 spaces), False means no indent.
  const [indents, setIndents] = useState([false, false, false, false]);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState(null); // 'success' or 'fail'

  const toggleIndent = (index) => {
    if (isChecking) return;
    const newIndents = [...indents];
    newIndents[index] = !newIndents[index];
    setIndents(newIndents);
    setResult(null);
  };

  const checkAnswer = () => {
    setIsChecking(true);
    setTimeout(() => {
      // Correct pattern: line 0: false, line 1: true, line 2: false, line 3: true
      if (!indents[0] && indents[1] && !indents[2] && indents[3]) {
        setResult('success');
      } else {
        setResult('fail');
      }
      setIsChecking(false);
    }, 1000);
  };

  const resetGame = () => {
    setIndents([false, false, false, false]);
    setResult(null);
    setIsChecking(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        
        <div className="w-full md:w-1/2">
           <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
             <CornerDownRight className="w-6 h-6 text-amber-500" /> Minigame: ซ่อมโค้ดพัง!
           </h4>
           <p className="text-slate-400 leading-loose mb-6">
             โปรแกรมต้อนรับผู้เข้าชมด้านขวามือ <strong className="text-amber-400">เว้นวรรคผิดทั้งหมด!</strong> ทำให้เกิด IndentationError ทันทีที่รัน
             <br/><br/>
             <strong>ภารกิจ:</strong> คลิกที่ลูกศรหน้าบรรทัดเพื่อ "ผลัก" โค้ดให้เว้นวรรค 4 เคาะ (เฉพาะบรรทัดที่จำเป็นต้องอยู่ภายใต้ if หรือ else) แล้วกด RUN
           </p>
           
           <div className="flex gap-4">
             <button 
               onClick={checkAnswer}
               disabled={isChecking || result === 'success'}
               className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.3)]"
             >
               {isChecking ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />} RUN CODE
             </button>
             <button 
               onClick={resetGame}
               className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl transition-all"
             >
               <RotateCcw className="w-5 h-5" />
             </button>
           </div>
           
           {result === 'success' && (
             <div className="mt-6 bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-xl flex items-center gap-3 animate-[pulse_2s_ease-in-out_infinite]">
               <CheckCircle2 className="w-6 h-6 shrink-0" />
               <p className="text-sm font-bold">ยอดเยี่ยม! โค้ดรันผ่านแล้ว คุณเข้าใจการทำงานของ Indentation อย่างถ่องแท้</p>
             </div>
           )}
           {result === 'fail' && (
             <div className="mt-6 bg-rose-500/20 border border-rose-500 text-rose-400 p-4 rounded-xl flex items-center gap-3">
               <XCircle className="w-6 h-6 shrink-0" />
               <p className="text-sm">IndentationError: ยังเว้นวรรคผิดอยู่นะ! ลองดูดีๆ ว่าคำสั่งไหนต้องอยู่ข้างใน if และ else</p>
             </div>
           )}
        </div>

        <div className="w-full md:w-1/2">
           <div className="bg-[#1E1E1E] rounded-xl font-mono text-lg border border-slate-700 overflow-hidden shadow-xl">
             <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 flex items-center gap-2 border-b border-slate-700">
               <TerminalSquare className="w-4 h-4" /> welcome.py
             </div>
             <div className="p-4 flex flex-col gap-2">
               
               {/* Fixed lines */}
               <div className="text-slate-300 px-2 py-1">age = 18</div>
               
               {/* Line 0: if */}
               <div className="flex items-center group">
                 <button onClick={() => toggleIndent(0)} className="w-8 h-8 rounded hover:bg-slate-700 flex items-center justify-center shrink-0 mr-2 text-slate-500 hover:text-amber-400 transition-colors">
                   <ChevronRight className="w-5 h-5" />
                 </button>
                 <div className={`transition-all duration-300 ${indents[0] ? 'translate-x-8 text-rose-400' : 'text-slate-300'}`}>
                   if age &gt;= 18:
                 </div>
               </div>

               {/* Line 1: print */}
               <div className="flex items-center group">
                 <button onClick={() => toggleIndent(1)} className="w-8 h-8 rounded hover:bg-slate-700 flex items-center justify-center shrink-0 mr-2 text-slate-500 hover:text-amber-400 transition-colors">
                   <ChevronRight className="w-5 h-5" />
                 </button>
                 <div className={`transition-all duration-300 ${indents[1] ? 'translate-x-8 text-emerald-400' : 'text-rose-400'} flex items-center relative`}>
                   {indents[1] && <div className="absolute -left-4 w-4 h-[2px] border-b-2 border-l-2 border-dashed border-amber-500/50 bottom-[10px]"></div>}
                   print("Welcome!")
                 </div>
               </div>

               {/* Line 2: else */}
               <div className="flex items-center group">
                 <button onClick={() => toggleIndent(2)} className="w-8 h-8 rounded hover:bg-slate-700 flex items-center justify-center shrink-0 mr-2 text-slate-500 hover:text-amber-400 transition-colors">
                   <ChevronRight className="w-5 h-5" />
                 </button>
                 <div className={`transition-all duration-300 ${indents[2] ? 'translate-x-8 text-rose-400' : 'text-slate-300'}`}>
                   else:
                 </div>
               </div>

               {/* Line 3: print */}
               <div className="flex items-center group">
                 <button onClick={() => toggleIndent(3)} className="w-8 h-8 rounded hover:bg-slate-700 flex items-center justify-center shrink-0 mr-2 text-slate-500 hover:text-amber-400 transition-colors">
                   <ChevronRight className="w-5 h-5" />
                 </button>
                 <div className={`transition-all duration-300 ${indents[3] ? 'translate-x-8 text-emerald-400' : 'text-rose-400'} flex items-center relative`}>
                   {indents[3] && <div className="absolute -left-4 w-4 h-[2px] border-b-2 border-l-2 border-dashed border-amber-500/50 bottom-[10px]"></div>}
                   print("Too young!")
                 </div>
               </div>

             </div>
           </div>
        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 3. Main Page Component
// ============================================================================
const pyUnit3_1_PyStructure = () => {
  const teacherTaskContent = `
    ใบงาน "นักสืบโค้ด (Code Detective)"
    1. ให้นักเรียนดูโค้ด Python ที่กำหนดให้ (บนกระดานหรือใบงาน) ซึ่งเขียนบรรทัดและเว้นวรรคผิด
    2. ใช้ปากกาสีแดงโยงเส้นแก้ไขการย่อหน้า (Indentation) ให้ถูกต้อง เพื่อให้โปรแกรมทำงานได้
    3. ระบุบรรทัดไหนที่เป็นเพียง Comment
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.1.1 Comments */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 flex flex-col md:flex-row gap-12 items-center transition-all hover:shadow-2xl hover:-translate-y-1">
           <div className="w-full md:w-1/2">
              <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-7 h-7" />
                </div>
                การอธิบายโค้ด (Comment)
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-8">
                ในการเขียนโปรแกรม เรามักจะเขียนข้อความสั้นๆ แทรกไว้ในโค้ดเพื่อ <strong>"อธิบายว่าโค้ดส่วนนี้ทำงานอย่างไร"</strong> 
                ซึ่งข้อความนี้เรียกว่าคอมเมนต์ (Comment) โดยคอมพิวเตอร์และตัวแปลภาษา (Interpreter) จะ <strong className="text-rose-500">มองข้ามบรรทัดนี้ไปเลย ไม่นำไปประมวลผล</strong> 
                ในภาษา Python เราจะใช้เครื่องหมาย <code>#</code> (Hash/Pound) นำหน้าข้อความ
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                    <Lightbulb className="w-6 h-6 text-emerald-500 mb-3" />
                    <h5 className="font-bold text-emerald-800 mb-2">เตือนความจำตัวเอง</h5>
                    <p className="text-emerald-700/80 text-sm leading-relaxed">ช่วยให้เราจำได้ว่าโค้ดบรรทัดนี้เขียนขึ้นเพื่ออะไร เมื่อกลับมาอ่านในอนาคต</p>
                 </div>
                 <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                    <EyeOff className="w-6 h-6 text-emerald-500 mb-3" />
                    <h5 className="font-bold text-emerald-800 mb-2">ปิดโค้ดชั่วคราว</h5>
                    <p className="text-emerald-700/80 text-sm leading-relaxed">ใช้ "ซ่อน" โค้ดชั่วคราวเวลาหาบั๊ก (Bug) โดยไม่ต้องลบทิ้ง (Commenting out)</p>
                 </div>
              </div>
           </div>
           
           <div className="w-full md:w-1/2">
             <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl font-mono text-sm md:text-base border border-slate-800 relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               <div className="text-slate-500 mb-4 border-b border-slate-800 pb-2 flex justify-between items-center">
                 <span>// รูปแบบการใช้งาน Comment</span>
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                 </div>
               </div>
               
               <div className="space-y-3 relative z-10">
                 <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors font-bold tracking-wide">
                   # ประกาศตัวแปรเก็บชื่อและอายุ
                 </div>
                 <div className="text-slate-300">
                   name = <span className="text-amber-300">"Mackung"</span>
                 </div>
                 <div className="text-slate-300">
                   age = <span className="text-blue-300">18</span> <span className="text-emerald-400 ml-4"># กำหนดอายุเป็น 18 ปี</span>
                 </div>
                 <div className="mt-6 text-slate-500 italic">
                   # print("Hello") &lt;-- โค้ดนี้จะไม่ถูกรัน เพราะโดนคอมเมนต์ไว้
                 </div>
                 <div className="text-slate-300 mt-2">
                   print(<span className="text-amber-300">"Welcome!"</span>)
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* 3.1.2 Syntax */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 flex flex-col md:flex-row-reverse gap-12 items-center transition-all hover:shadow-2xl hover:-translate-y-1">
           <div className="w-full md:w-1/2">
              <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <Code2 className="w-7 h-7" />
                </div>
                รูปแบบคำสั่งและไวยากรณ์ (Syntax)
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-8">
                <strong>Syntax</strong> คือ "ไวยากรณ์" หรือ กฎกติกาของภาษาคอมพิวเตอร์ (เหมือนหลัก Grammar ในภาษาอังกฤษ) 
                จุดเด่นที่ทำให้โลกหลงรัก Python คือไวยากรณ์ที่ <strong>สั้น กระชับ และคลีน (Clean)</strong> โดยการตัดสัญลักษณ์ที่ยุ่งยากออกไป
              </p>
              
              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 space-y-5">
                 <div className="flex items-start gap-4">
                   <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100 shrink-0 text-blue-500 font-bold">1</div>
                   <div>
                     <strong className="text-blue-900 block mb-1">ไม่มี Semicolon (;)</strong>
                     <p className="text-blue-800/70 text-sm leading-relaxed">ภาษาอย่าง C หรือ Java ต้องปิดท้ายคำสั่งด้วย <code>;</code> เสมอ แต่ Python ใช้แค่การ <strong>ขึ้นบรรทัดใหม่ (Enter)</strong> เท่านั้น</p>
                   </div>
                 </div>
                 <div className="w-full h-px bg-blue-100"></div>
                 <div className="flex items-start gap-4">
                   <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100 shrink-0 text-blue-500 font-bold">2</div>
                   <div>
                     <strong className="text-blue-900 block mb-1">Case-Sensitive</strong>
                     <p className="text-blue-800/70 text-sm leading-relaxed">ตัวพิมพ์เล็ก-ใหญ่ มีความหมายต่างกันอย่างสิ้นเชิง <code>Name</code> จะไม่เท่ากับ <code>name</code> หรือ <code>NAME</code></p>
                   </div>
                 </div>
                 <div className="w-full h-px bg-blue-100"></div>
                 <div className="flex items-start gap-4">
                   <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100 shrink-0 text-blue-500 font-bold">3</div>
                   <div>
                     <strong className="text-blue-900 block mb-1">ทำงานทีละบรรทัด (Top-down)</strong>
                     <p className="text-blue-800/70 text-sm leading-relaxed">คำสั่งจะถูกอ่านและประมวลผลจากบรรทัดบนสุด ลงมาบรรทัดล่างสุดทีละบรรทัด ตามลำดับ</p>
                   </div>
                 </div>
              </div>
           </div>
           
           <div className="w-full md:w-1/2">
             <div className="relative group">
               <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full transition-all group-hover:bg-blue-500/30"></div>
               <img 
                 src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Syntax concept" 
                 className="rounded-[2rem] shadow-2xl object-cover h-[450px] w-full relative z-10 border-4 border-white transform transition-transform duration-500 group-hover:scale-[1.02]"
               />
               
               {/* Floating Tag */}
               <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce">
                 <div className="text-sm font-bold text-slate-800">Clean & Readable Code</div>
                 <div className="text-xs text-slate-500">The Pythonic Way ✨</div>
               </div>
             </div>
           </div>
        </div>

        {/* 3.1.3 Indentation */}
        <div className="mb-20">
           <div className="flex items-center gap-4 mb-10 pl-4 border-l-[6px] border-amber-500">
             <h3 className="text-4xl font-bold text-slate-800">
               การเว้นวรรคและย่อหน้า (Indentation)
             </h3>
           </div>
           
           <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-12">
             <div className="flex flex-col md:flex-row items-start gap-10 mb-12">
               <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-500 flex items-center justify-center shrink-0 shadow-inner">
                 <AlignLeft className="w-10 h-10" />
               </div>
               <div className="flex-1">
                 <p className="text-slate-600 leading-loose text-xl mb-6">
                   นี่คือ <strong>เอกลักษณ์ที่สำคัญที่สุด</strong> ของภาษา Python! ในภาษาอื่นๆ (เช่น C, Java, JavaScript) จะใช้เครื่องหมายปีกกา <code>{`{ }`}</code> เพื่อกำหนดขอบเขต (Block) ของคำสั่งย่อย 
                   <strong className="text-amber-600 text-2xl mx-2">แต่ในภาษา Python จะใช้ "การเคาะเว้นวรรค (Space)" เข้าไปด้านในแทนปีกกา!</strong>
                 </p>
                 <div className="bg-amber-50/80 border border-amber-200 p-6 rounded-2xl shadow-sm">
                   <h5 className="font-bold text-amber-900 mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600"/> กฎเหล็กของ Indentation:</h5>
                   <p className="text-amber-800/80 leading-relaxed">
                     หากคำสั่งมีการสร้าง Block ย่อย (เช่น หลังคำสั่ง <code>if</code>, <code>for</code> หรือ <code>while</code> ที่ลงท้ายด้วยเครื่องหมาย <code>:</code>) บรรทัดถัดไปและบรรทัดที่อยู่ในหมวดเดียวกัน <strong>จะต้องเว้นวรรคเข้าไปข้างใน 4 เคาะ (หรือกด 1 Tab) ให้ตรงกันเป๊ะเสมอ</strong>
                   </p>
                 </div>
               </div>
             </div>
             
             <div className="bg-red-50 border-l-[6px] border-red-500 p-6 rounded-r-2xl mb-12 shadow-sm flex gap-4 items-start">
                 <AlertCircle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                 <div>
                   <strong className="text-red-900 text-xl block mb-2">ข้อควรระวังขั้นสุด (IndentationError) 🚨</strong>
                   <p className="text-red-800/80 leading-loose">
                     การเว้นวรรคผิด หรือเว้นวรรคไม่เท่ากันแม้แต่เคาะเดียว จะทำให้โปรแกรมพังและแจ้งข้อผิดพลาด <code>IndentationError</code> ทันที! ห้ามผสมการกด Tab กับการเคาะ Spacebar ในไฟล์เดียวกันโดยเด็ดขาด 
                     นี่คือจุดที่มือใหม่เขียนโปรแกรมจะเจอ Error บ่อยที่สุด!
                   </p>
                 </div>
             </div>

             {/* Inspector Component */}
             <CodeStructureInspector />

           </div>
        </div>

        {/* 3.1.4 Interactive Indentation Fixer Game */}
        <div className="mb-20">
          <IndentationFixer />
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.1)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit3_1_PyStructure;
