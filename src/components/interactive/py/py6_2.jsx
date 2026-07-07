import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Code,
  ArrowRight,
  ChevronRight,
  Terminal,
  Activity,
  UserCheck
} from 'lucide-react';
import { 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function py6_2_UserDefinedFunctions() {
  const [msgInput, setMsgInput] = useState('Python');
  const [repeatCount, setRepeatCount] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const [simLine, setSimLine] = useState(-1); // -1 = idle
  const [logs, setLogs] = useState(['# เริ่มต้นระบบ: ฟังก์ชัน make_banner ถูกโหลดเข้าหน่วยความจำแล้ว']);
  const [terminalOutput, setTerminalOutput] = useState([]);
  
  const timerRef = useRef(null);

  const handleCall = () => {
    if (isRunning) return;
    setIsRunning(true);
    setSimLine(0); // Start at line 0 (Calling function)
    setTerminalOutput([]);
    setLogs(prev => [...prev, `>>> make_banner("${msgInput}", ${repeatCount})`]);
  };

  useEffect(() => {
    if (!isRunning) return;

    let step = 0;
    let runCount = 0;

    timerRef.current = setInterval(() => {
      // Step-by-Step execution machine
      if (step === 0) {
        // Line 0: The call statement
        setSimLine(5); // Jumps to function header
        setLogs(prev => [...prev, `# JUMP: กระโดดเข้าไปทำงานในฟังก์ชัน make_banner พร้อมพารามิเตอร์ msg="${msgInput}", count=${repeatCount}`]);
        step = 1;
      } 
      else if (step === 1) {
        // Line 5: Function header (def make_banner...)
        setSimLine(1); // Go to parameter unpacking/read
        setLogs(prev => [...prev, `# PARAM: ตัวแปรพารามิเตอร์ในฟังก์ชันได้รับค่าเรียบร้อย`]);
        step = 2;
      }
      else if (step === 2) {
        // Line 1: loop checking/entering
        if (runCount < repeatCount) {
          setSimLine(2); // Enter loop print
          runCount++;
          setTerminalOutput(prev => [...prev, `[BANNER] ${msgInput}`]);
          setLogs(prev => [...prev, `# LOOP: พิมพ์ข้อมูลรอบที่ ${runCount} ออกทางหน้าจอ`]);
          step = 3; // Loop back check
        } else {
          setSimLine(3); // Exit loop / Function end
          setLogs(prev => [...prev, `# EXIT: วนลูปครบรอบดึงคำสั่งเสร็จสิ้นและออกจากการทำงาน`]);
          step = 4;
        }
      }
      else if (step === 3) {
        // Jumps back to loop head check
        setSimLine(1);
        step = 2; // Check condition again
      }
      else if (step === 4) {
        // End of function execution
        setSimLine(-1);
        setIsRunning(false);
        clearInterval(timerRef.current);
      }
    }, 1200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, msgInput, repeatCount]);

  const handleReset = () => {
    setMsgInput('Python');
    setRepeatCount(3);
    setIsRunning(false);
    setSimLine(-1);
    setLogs(['# เริ่มต้นระบบ: ฟังก์ชัน make_banner ถูกโหลดเข้าหน่วยความจำแล้ว']);
    setTerminalOutput([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const teacherTaskContent = `โจทย์ปฏิบัติการสร้างฟังก์ชันและพารามิเตอร์:
1. ให้นักเรียนสร้างฟังก์ชันชื่อ calculate_area(width, height)
2. ภายในฟังก์ชัน ให้คำนวณพื้นที่รูปสี่เหลี่ยมผืนผ้า (กว้าง * ยาว)
3. ให้พิมพ์ผลลัพธ์พื้นที่ที่คำนวณได้ออกทางหน้าจอโดยตรงจากในฟังก์ชัน
4. สั่งเรียกใช้งานฟังก์ชัน calculate_area() โดยส่งอาร์กิวเมนต์กว้าง 5 และยาว 8 เข้าไปตรวจสอบผลลัพธ์`;

  return (
    <div className="font-sans text-slate-900 pb-24 relative overflow-hidden">
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section 1: Theory */}
        <div className="mb-12">
          <SectionBlock 
            title="การประกาศและเรียกใช้งานฟังก์ชันที่ผู้เขียนโปรแกรมกำหนดเอง"
            description="ฟังก์ชัน (User-Defined Function) คือบล็อกของโค้ดโปรแกรมที่ถูกจัดโครงสร้างและรวมกลุ่มคำสั่งไว้ด้วยกันเพื่อทำหน้าที่ประมวลผลงานเฉพาะอย่าง สามารถเรียกใช้งานซ้ำได้ทุกตำแหน่งที่ต้องการ ช่วยลดการเขียนโค้ดซ้ำซ้อน และเพิ่มความเป็นระบบระเบียบในตัวโปรแกรม"
            accent="indigo"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <ConceptCard 
                symbol="def"
                title="คีย์เวิร์ดประกาศฟังก์ชัน"
                description="ใช้คีย์เวิร์ด def นำหน้าชื่อฟังก์ชัน ตามด้วยวงเล็บกลมและเครื่องหมายโคลอน (:) เพื่อเตรียมพื้นที่ทำงานย่อย"
                code='def say_hello():'
                result='Function Declared'
                accent="indigo"
              />
              <ConceptCard 
                symbol="calling"
                title="การเรียกใช้งานฟังก์ชัน"
                description="สั่งให้คำสั่งที่บรรจุอยู่ภายใต้ฟังก์ชันทำงาน โดยระบุชื่อฟังก์ชันตามด้วยวงเล็บเหลี่ยมโค้งต่อท้ายเสมอ"
                code='say_hello()'
                result='Executes Block'
                accent="teal"
              />
              <ConceptCard 
                symbol="parameter"
                title="พารามิเตอร์ (Parameter)"
                description="ตัวแปรที่ระบุไว้ในวงเล็บของฟังก์ชันตอนประกาศ เพื่อทำหน้าที่เป็นตัวแทนคอยรับข้อมูลส่งเข้ามาประมวลผล"
                code='def greet(name):'
                result='Accepts Variable'
                accent="violet"
              />
              <ConceptCard 
                symbol="argument"
                title="อาร์กิวเมนต์ (Argument)"
                description="ค่าข้อมูลจริงที่ส่งผ่านเข้าไปให้ฟังก์ชัน ณ ตอนสืบเนื่องเรียกใช้งาน (ส่งผ่านไปยังตัวแปรพารามิเตอร์)"
                code='greet("Somsak")'
                result='name = "Somsak"'
                accent="sky"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 2: Simulator */}
        <div className="mb-12">
          <SimulatorShell 
            title="เครื่องจำลองการรันโปรแกรมฟังก์ชันย่อยทีละบรรทัด (Call Stack Trace Simulator)"
            icon={<Code className="w-6 h-6" />}
            accentBg="bg-indigo-50"
            iconColor="text-indigo-600"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Controls and Code View */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                {/* Panel inputs */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-[15px] mb-4">
                    กำหนดตัวแปรพารามิเตอร์ที่จะส่งเข้าฟังก์ชัน
                  </h5>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Message (ข้อความ)</label>
                        <input 
                          type="text"
                          value={msgInput}
                          onChange={(e) => setMsgInput(e.target.value)}
                          disabled={isRunning}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Repeat Count (รอบวนซ้ำ)</label>
                        <input 
                          type="number"
                          min={1}
                          max={5}
                          value={repeatCount}
                          onChange={(e) => setRepeatCount(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                          disabled={isRunning}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={handleCall}
                        disabled={isRunning}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4" /> สั่งรันฟังก์ชัน (Call Function)
                      </button>
                      <button 
                        onClick={handleReset}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
                        title="รีเซ็ตโปรแกรม"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Code Highlights */}
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-slate-300 font-mono text-sm leading-relaxed relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-[10px] text-slate-600 uppercase">Source Code Trace</div>
                  
                  <div className="flex flex-col gap-1">
                    
                    {/* Line 0: The Calling Statement */}
                    <div className={`transition-all duration-300 p-1.5 rounded flex items-center gap-2 ${
                      simLine === 0 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] text-white' : 'opacity-60'
                    }`}>
                      <span className="text-slate-600 text-xs w-6 select-none">1</span>
                      <span>make_banner(<span className="text-amber-400">"{msgInput}"</span>, <span className="text-amber-400">{repeatCount}</span>)</span>
                      {simLine === 0 && <span className="text-[10px] text-indigo-400 font-sans ml-auto flex items-center animate-pulse"><ChevronRight className="w-4 h-4" /> เริ่มเรียกใช้</span>}
                    </div>

                    {/* Spacer/Empty */}
                    <div className="p-1 opacity-20"><span className="text-slate-600 text-xs w-6 select-none">2</span></div>

                    {/* Line 5: Function Header */}
                    <div className={`transition-all duration-300 p-1.5 rounded flex items-center gap-2 ${
                      simLine === 5 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] text-white' : 'opacity-60'
                    }`}>
                      <span className="text-slate-600 text-xs w-6 select-none">3</span>
                      <span><span className="text-pink-500">def</span> <span className="text-sky-400">make_banner</span>(msg, count):</span>
                      {simLine === 5 && <span className="text-[10px] text-indigo-400 font-sans ml-auto flex items-center animate-pulse"><ChevronRight className="w-4 h-4" /> เข้าสู่ฟังก์ชัน</span>}
                    </div>

                    {/* Line 1: Loop Head */}
                    <div className={`ml-6 transition-all duration-300 p-1.5 rounded flex items-center gap-2 ${
                      simLine === 1 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] text-white' : 'opacity-60'
                    }`}>
                      <span className="text-slate-600 text-xs w-6 select-none">4</span>
                      <span><span className="text-pink-500">for</span> i <span className="text-pink-500">in</span> <span className="text-sky-400">range</span>(count):</span>
                      {simLine === 1 && <span className="text-[10px] text-indigo-400 font-sans ml-auto flex items-center animate-pulse"><ChevronRight className="w-4 h-4" /> ตรวจสอบจำนวนรอบ</span>}
                    </div>

                    {/* Line 2: Loop body print */}
                    <div className={`ml-12 transition-all duration-300 p-1.5 rounded flex items-center gap-2 ${
                      simLine === 2 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] text-white' : 'opacity-60'
                    }`}>
                      <span className="text-slate-600 text-xs w-6 select-none">5</span>
                      <span><span className="text-yellow-200">print</span>(<span className="text-emerald-400">f"[BANNER] {'{msg}'}"</span>)</span>
                      {simLine === 2 && <span className="text-[10px] text-emerald-400 font-sans ml-auto flex items-center animate-pulse"><ChevronRight className="w-4 h-4" /> ทำคำสั่งแสดงผล</span>}
                    </div>

                    {/* Line 3: Out/End of function */}
                    <div className={`ml-6 transition-all duration-300 p-1.5 rounded flex items-center gap-2 ${
                      simLine === 3 ? 'bg-indigo-900/60 outline outline-1 outline-indigo-500/50 scale-[1.02] text-white' : 'opacity-60'
                    }`}>
                      <span className="text-slate-600 text-xs w-6 select-none">6</span>
                      <span><span className="text-slate-500"># สิ้นสุดการประมวลผลของฟังก์ชัน</span></span>
                      {simLine === 3 && <span className="text-[10px] text-indigo-400 font-sans ml-auto flex items-center animate-pulse"><ChevronRight className="w-4 h-4" /> จบการทำงาน</span>}
                    </div>

                  </div>
                </div>

              </div>

              {/* Console Screen Panel */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                {/* Execution logs */}
                <ConsoleScreen 
                  label="# python - call stack & variable values"
                  accentLabel="runtime logging"
                  codeBlock={
                    <div className="font-mono text-sm text-slate-400 flex flex-col gap-1">
                      <div><span className="text-indigo-400">JUMP POINT:</span> Main Program Line 1</div>
                      <div className="flex gap-4">
                        <span>[Variables in memory]</span>
                        <span className="text-amber-400">msg = "{msgInput}"</span>
                        <span className="text-amber-400">count = {repeatCount}</span>
                      </div>
                    </div>
                  }
                  isLoading={isRunning && simLine === -1}
                  output={logs.join('\n')}
                  multiline={true}
                  placeholder="กดปุ่มสั่งรันเพื่อจำลองการกระโดดรันคำสั่งทีละบรรทัด"
                />

                {/* Virtual Display Terminal Output */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-inner flex-1 flex flex-col">
                  <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-slate-500" /> Console Terminal Output (จอแสดงผล)
                  </div>
                  <div className="bg-black/60 p-4 rounded-xl border border-slate-950 font-mono text-[14px] text-emerald-400 flex-1 min-h-[100px] flex flex-col gap-1 overflow-y-auto leading-relaxed shadow-inner">
                    <div className="text-slate-500 text-xs select-none">$ python app.py</div>
                    {terminalOutput.map((out, i) => (
                      <div key={i} className="animate-fade-in">&gt; {out}</div>
                    ))}
                    {isRunning && (
                      <div className="w-2 h-4 bg-emerald-400 animate-pulse mt-1"></div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </SimulatorShell>
        </div>

        {/* Section 3: Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
