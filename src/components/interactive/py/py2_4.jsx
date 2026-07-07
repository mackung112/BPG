import React, { useState, useRef, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  TerminalSquare, 
  Keyboard, 
  Monitor, 
  Calculator,
  Play,
  RotateCcw,
  Code2,
  ListTodo,
  CheckCircle2,
  Laptop
} from 'lucide-react';

const PseudocodeTerminal = () => {
  const [code, setCode] = useState("BEGIN\n  PRINT \"What is your birth year?\"\n  READ birthYear\n  COMPUTE age = 2024 - birthYear\n  PRINT \"Your age is \", age\nEND");
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const currentLineRef = useRef(0);
  const variablesRef = useRef({});
  const linesRef = useRef([]);

  const parseAndExecute = (line) => {
    let text = line.trim();
    if (!text || text === "BEGIN" || text === "END") return true;

    // PRINT command
    if (text.startsWith("PRINT") || text.startsWith("DISPLAY") || text.startsWith("WRITE")) {
      const keyword = text.split(" ")[0];
      const args = text.substring(keyword.length).trim();
      let printStr = "";
      let inQuotes = false;
      let currentVar = "";
      
      for (let i = 0; i < args.length; i++) {
        if (args[i] === '"' || args[i] === "'") {
          inQuotes = !inQuotes;
        } else if (!inQuotes && args[i] === ',') {
           if (currentVar.trim() !== "") {
             printStr += variablesRef.current[currentVar.trim()] || "";
             currentVar = "";
           }
        } else if (inQuotes) {
          printStr += args[i];
        } else {
          currentVar += args[i];
        }
      }
      if (currentVar.trim() !== "") {
        printStr += variablesRef.current[currentVar.trim()] || "";
      }

      setOutput(prev => [...prev, printStr]);
      return true;
    }

    // READ command
    if (text.startsWith("READ") || text.startsWith("INPUT") || text.startsWith("GET")) {
      const keyword = text.split(" ")[0];
      const varName = text.substring(keyword.length).trim();
      variablesRef.current.inputVar = varName;
      setWaitingForInput(true);
      return false; // Pause execution
    }

    // COMPUTE/SET command (simplified)
    if (text.includes("=")) {
      let processText = text;
      if(text.startsWith("COMPUTE")) processText = text.substring(7).trim();
      if(text.startsWith("SET")) processText = text.substring(3).trim();
      if(text.startsWith("CALCULATE")) processText = text.substring(9).trim();

      const parts = processText.split("=");
      if (parts.length === 2) {
        const varName = parts[0].trim();
        const expr = parts[1].trim();
        try {
           let evalStr = expr;
           Object.keys(variablesRef.current).forEach(key => {
             if(key !== 'inputVar') {
                const regex = new RegExp(`\\b${key}\\b`, 'g');
                evalStr = evalStr.replace(regex, variablesRef.current[key]);
             }
           });
           const val = new Function('return ' + evalStr)();
           variablesRef.current[varName] = val;
        } catch (e) {
           variablesRef.current[varName] = expr; // Fallback to string
        }
      }
      return true;
    }

    return true; // Ignore unknown lines
  };

  const executeNextLine = () => {
    if (currentLineRef.current >= linesRef.current.length) {
      setIsRunning(false);
      setOutput(prev => [...prev, "\n[Program Finished]"]);
      return;
    }

    const line = linesRef.current[currentLineRef.current];
    const shouldContinue = parseAndExecute(line);
    
    currentLineRef.current += 1;

    if (shouldContinue) {
      setTimeout(executeNextLine, 400); 
    }
  };

  const handleRun = () => {
    setOutput(["[Program Started]\n"]);
    setIsRunning(true);
    setWaitingForInput(false);
    variablesRef.current = {};
    currentLineRef.current = 0;
    linesRef.current = code.split('\n');
    executeNextLine();
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!waitingForInput) return;
    
    const varName = variablesRef.current.inputVar;
    variablesRef.current[varName] = isNaN(inputValue) ? inputValue : Number(inputValue);
    
    setOutput(prev => [...prev, `> ${inputValue}`]);
    setInputValue("");
    setWaitingForInput(false);
    
    setTimeout(executeNextLine, 200);
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <TerminalSquare className="w-8 h-8 text-sky-400" />
          Terminal Simulator: ทดลองรันรหัสเทียม
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          ลองแก้ไขโค้ดด้านซ้ายมือโดยใช้คำสั่ง <code className="text-sky-300">READ</code> <code className="text-emerald-300">PRINT</code> และ <code className="text-amber-300">COMPUTE</code> แล้วกดปุ่ม RUN เพื่อดูผลลัพธ์จำลองการประมวลผล
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Editor */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-inner">
          <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
            <span className="text-slate-300 font-mono text-sm font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-sky-400"/> editor.pseudo
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-current" /> RUN
              </button>
            </div>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isRunning}
            className="w-full flex-1 p-5 bg-transparent text-emerald-400 font-mono text-[15px] md:text-base resize-none outline-none focus:ring-inset focus:ring-1 focus:ring-sky-500 disabled:opacity-70 leading-loose"
            rows={10}
            spellCheck={false}
          />
        </div>

        {/* Console output */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-inner">
           <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
            <span className="text-slate-300 font-mono text-sm font-bold flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-slate-400"/> Output Console
            </span>
            <button onClick={() => setOutput([])} className="text-slate-400 hover:text-white transition-colors p-1" title="Clear Console">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-5 font-mono text-slate-300 text-[15px] md:text-base flex flex-col overflow-y-auto leading-loose">
             {output.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
             ))}
             
             {waitingForInput && (
               <form onSubmit={handleInputSubmit} className="mt-2 flex items-center gap-3">
                 <span className="text-sky-400 animate-pulse">{'>'}</span>
                 <input 
                   type="text" 
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   autoFocus
                   className="bg-slate-900 border border-slate-700 rounded-md text-white px-3 py-1 outline-none focus:border-sky-500 flex-1 font-mono"
                   placeholder="พิมพ์ข้อมูลแล้วกด Enter..."
                 />
               </form>
             )}
             
             {isRunning && !waitingForInput && (
                <div className="mt-2 flex items-center gap-2 text-slate-500">
                  <div className="w-2 h-4 bg-slate-500 animate-pulse"></div>
                  <span className="text-sm">กำลังประมวลผล...</span>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const pyUnit2_4_PseudoCommands = () => {
  const teacherTaskContent = `
    ให้นักเรียนเขียนรหัสเทียมสำหรับโปรแกรม "เครื่องคิดเลขร้านกาแฟ" โดยมีลำดับดังนี้:
    1. รับข้อมูล (INPUT) ว่าลูกค้าซื้อกาแฟแก้วละกี่บาท (price) และซื้อกี่แก้ว (amount)
    2. คำนวณ (PROCESS) ราคารวม = price * amount
    3. แสดงผล (PRINT) ข้อความว่า "ราคารวมที่ต้องจ่ายคือ [ราคารวม] บาท"
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <ListTodo className="w-10 h-10 text-sky-500" />
             คำสั่งพื้นฐานในรหัสเทียม
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             ไม่ว่าโปรแกรมจะซับซ้อนแค่ไหน การทำงานพื้นฐานของคอมพิวเตอร์ก็หนีไม่พ้น 3 กระบวนการหลัก คือ 
             <strong>การรับข้อมูล (Input) -&gt; ประมวลผล (Process) -&gt; และแสดงผลลัพธ์ (Output)</strong> 
             ดังนั้นคำสั่งในรหัสเทียมจึงถูกสร้างมาเพื่อรองรับกระบวนการเหล่านี้
           </p>
        </div>

        {/* 3 Basic Commands */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* INPUT */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
             <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6 shadow-sm">
               <Keyboard className="w-8 h-8" />
             </div>
             <h4 className="text-2xl font-bold text-slate-800 mb-4">1. การรับข้อมูล (INPUT)</h4>
             <p className="text-slate-600 leading-loose mb-6 flex-1">
               ใช้เมื่อโปรแกรมต้องการให้ผู้ใช้ป้อนข้อมูลเข้ามา (เช่น พิมพ์ผ่านคีย์บอร์ด) ข้อมูลที่รับมาจะถูกนำไปเก็บไว้ใน <strong>"ตัวแปร" (Variable)</strong> เพื่อรอใช้งานต่อไป
               คำที่นิยมใช้คือ <code className="text-amber-600 font-bold">READ</code>, <code className="text-amber-600 font-bold">INPUT</code> หรือ <code className="text-amber-600 font-bold">GET</code>
             </p>
             <div className="bg-slate-900 rounded-xl p-5 shadow-inner">
               <div className="text-slate-400 text-xs mb-2 uppercase tracking-wider font-bold">ตัวอย่างการใช้งาน</div>
               <div className="text-amber-400 font-mono text-[15px] leading-loose">
                 READ username<br/>
                 INPUT password<br/>
                 GET age
               </div>
             </div>
          </div>

          {/* PROCESS */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
             <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-6 shadow-sm">
               <Calculator className="w-8 h-8" />
             </div>
             <h4 className="text-2xl font-bold text-slate-800 mb-4">2. การคำนวณ (PROCESS)</h4>
             <p className="text-slate-600 leading-loose mb-6 flex-1">
               ใช้สำหรับกำหนดค่าเริ่มต้นให้ตัวแปร หรือนำตัวแปรมาคำนวณทางคณิตศาสตร์ (+, -, *, /, MOD) 
               คำที่นิยมใช้คือ <code className="text-sky-600 font-bold">COMPUTE</code>, <code className="text-sky-600 font-bold">SET</code>, <code className="text-sky-600 font-bold">CALCULATE</code> หรือละคำสั่งไปเลยแล้วเขียนสมการทันที
             </p>
             <div className="bg-slate-900 rounded-xl p-5 shadow-inner">
               <div className="text-slate-400 text-xs mb-2 uppercase tracking-wider font-bold">ตัวอย่างการใช้งาน</div>
               <div className="text-sky-400 font-mono text-[15px] leading-loose">
                 SET score = 0<br/>
                 COMPUTE area = width * height<br/>
                 total = price + tax
               </div>
             </div>
          </div>

          {/* OUTPUT */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
             <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6 shadow-sm">
               <Monitor className="w-8 h-8" />
             </div>
             <h4 className="text-2xl font-bold text-slate-800 mb-4">3. การแสดงผล (OUTPUT)</h4>
             <p className="text-slate-600 leading-loose mb-6 flex-1">
               ใช้สั่งให้คอมพิวเตอร์ส่งข้อมูลออกมาทางหน้าจอ อาจเป็นข้อความเพียวๆ (ใส่ในเครื่องหมายคำพูด) หรือเอาค่าในตัวแปรมาแสดงผล 
               คำที่นิยมใช้คือ <code className="text-emerald-600 font-bold">PRINT</code>, <code className="text-emerald-600 font-bold">DISPLAY</code>, <code className="text-emerald-600 font-bold">WRITE</code>
             </p>
             <div className="bg-slate-900 rounded-xl p-5 shadow-inner">
               <div className="text-slate-400 text-xs mb-2 uppercase tracking-wider font-bold">ตัวอย่างการใช้งาน</div>
               <div className="text-emerald-400 font-mono text-[15px] leading-loose">
                 PRINT "Login Successful"<br/>
                 DISPLAY total_price<br/>
                 PRINT "Your age is ", age
               </div>
             </div>
          </div>

        </div>

        {/* Note on combining inputs and outputs */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-2xl mb-16 flex items-start gap-6">
           <Laptop className="w-10 h-10 text-blue-500 shrink-0 mt-1" />
           <div>
             <h4 className="text-2xl font-bold text-blue-800 mb-4">เทคนิค: การพิมพ์ข้อความก่อนรับค่า (Prompting)</h4>
             <p className="text-blue-900 text-lg leading-loose">
               ในโลกความเป็นจริง เราไม่สามารถใช้คำสั่ง <code>READ age</code> ลอยๆ ได้ เพราะหน้าจอผู้ใช้จะว่างเปล่าและไม่รู้ว่าต้องพิมพ์อะไร 
               ดังนั้น <strong>ก่อนรับค่าเสมอ</strong> เราควรใช้คำสั่ง <code>PRINT</code> เพื่อบอกผู้ใช้ก่อน เช่น:
             </p>
             <div className="mt-4 bg-white p-4 rounded-xl font-mono text-slate-700 border border-blue-200 inline-block shadow-sm">
               PRINT "กรุณาป้อนอายุของคุณ: "<br/>
               READ age
             </div>
           </div>
        </div>

        {/* Simulator */}
        <PseudocodeTerminal />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.4)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_4_PseudoCommands;
