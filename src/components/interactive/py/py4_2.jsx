import React, { useState, useEffect, useRef } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle, 
  Code2,
  Sparkles,
  Keyboard,
  Info,
  ArrowRight,
  Database,
  ShieldAlert,
  ArrowRightLeft,
  RefreshCw,
  Cpu
} from 'lucide-react';

// ============================================================================
// 1. CARD 1: 4.2.1 รูปแบบการใช้งานฟังก์ชัน input() (Basic Input)
// ============================================================================
const BasicInputCard = () => {
  const [userInput, setUserInput] = useState('กรุงเทพฯ');
  const [visualStep, setVisualStep] = useState('idle'); // idle, listening, storing, completed
  const [variableBox, setVariableBox] = useState('?');

  const startSimulation = () => {
    setVisualStep('listening');
    setVariableBox('?');
    
    // Step 1: Simulated Prompt wait
    setTimeout(() => {
      setVisualStep('storing');
      // Step 2: Storing in memory
      setTimeout(() => {
        setVariableBox(`"${userInput}"`);
        setVisualStep('completed');
      }, 1000);
    }, 1200);
  };

  const resetSimulation = () => {
    setVisualStep('idle');
    setVariableBox('?');
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-emerald-500" /> รูปแบบการใช้งานฟังก์ชัน input() เพื่อรับข้อมูล
          </h4>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          ฟังก์ชัน <code>input()</code> ใช้สำหรับรับข้อมูลจากผู้ใช้งานผ่านแป้นพิมพ์คอมพิวเตอร์ โดยระบบจะ **หยุดรอชั่วคราว** จนกว่าผู้ใช้งานจะกดแป้นพิมพ์แล้วกด Enter จากนั้นข้อมูลจะถูกนำไปจัดเก็บลงในตัวแปรในหน่วยความจำ
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Controls */}
          <div className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ป้อนข้อมูลจำลองที่ผู้ใช้จะพิมพ์:</span>
              <input 
                type="text" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                disabled={visualStep !== 'idle' && visualStep !== 'completed'}
                placeholder="เช่น กรุงเทพฯ หรือ ส้มตำ"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 font-mono text-sm focus:outline-none focus:border-emerald-500"
              />
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={startSimulation}
                  disabled={visualStep !== 'idle' && visualStep !== 'completed'}
                  className="flex-1 bg-[#4F46E5] text-white hover:bg-[#4338CA] active:scale-98 rounded-xl font-bold py-3 transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <Play className="w-4 h-4" /> เริ่มแสดงกลไกรับข้อมูล
                </button>
                <button
                  onClick={resetSimulation}
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-xl px-4 py-3 active:scale-98 transition-all"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Explanation card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-[13px] leading-relaxed text-slate-600 flex gap-2.5">
              <Info className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
              <div>
                <strong className="block text-slate-800 mb-0.5">สถานะการทำงาน:</strong>
                {visualStep === 'idle' && 'พร้อมสำหรับการรันโค้ด คลิกปุ่มเริ่มจำลองเพื่อสังเกตกลไกเบื้องหลัง'}
                {visualStep === 'listening' && 'โปรแกรมหยุดรอชั่วคราว (Pause) เปิดสายไฟรอรับข้อมูลจากแป้นพิมพ์...'}
                {visualStep === 'storing' && 'เมื่อกด Enter คอมพิวเตอร์ดึงข้อมูลดิบย้ายเข้าไปเก็บในตัวแปร target...'}
                {visualStep === 'completed' && 'เก็บค่าเสร็จสมบูรณ์ ชนิดข้อมูลที่ได้จะเป็น String เสมอ'}
              </div>
            </div>
          </div>

          {/* Interactive visualizer */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
                <span># python compiler flow</span>
                <span className="text-emerald-400">interactive sandbox</span>
              </div>
              <div className="font-mono text-sm leading-relaxed mb-4">
                <span className="text-blue-400">city</span> = <span className="text-yellow-300">input</span>(<span className="text-emerald-400">"คุณอาศัยอยู่ที่ไหน?: "</span>)
              </div>
            </div>

            {/* Diagram of Storing */}
            <div className="flex items-center justify-around bg-black/40 p-4 rounded-xl border border-slate-800 relative my-4">
              {/* Keyboard component */}
              <div className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center gap-1 shrink-0 ${
                visualStep === 'listening' ? 'bg-indigo-500/20 border-indigo-500 animate-pulse text-indigo-300' : 'bg-slate-800/80 border-slate-700 text-slate-400'
              }`}>
                <Keyboard className="w-6 h-6" />
                <span className="text-[10px] font-mono">{visualStep === 'listening' ? `"${userInput}"` : 'Keyboard'}</span>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[9px] text-slate-500 font-mono">input()</span>
                <ArrowRight className={`w-6 h-6 transition-all ${
                  visualStep === 'storing' ? 'text-emerald-400 animate-bounce' : 'text-slate-700'
                }`} />
              </div>

              {/* Memory Variable box */}
              <div className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center gap-1 shrink-0 ${
                visualStep === 'completed' ? 'bg-emerald-500/20 border-emerald-500 shadow-lg text-emerald-300 scale-105' : 'bg-slate-800/80 border-slate-700 text-slate-400'
              }`}>
                <Database className="w-6 h-6" />
                <span className="text-[10px] font-mono">city = {variableBox}</span>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-800">
              <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-slate-500" /> Console printed result</div>
              <div className="bg-black/60 p-3 rounded-xl border border-slate-950 font-mono text-[14px] text-emerald-400 min-h-[50px] flex items-center shadow-inner">
                {visualStep === 'listening' ? (
                  <span className="flex items-center gap-1">
                    คุณอาศัยอยู่ที่ไหน?: <span className="bg-slate-700 text-white px-2 py-0.5 rounded text-[12px] font-bold animate-pulse">{userInput}</span>_
                  </span>
                ) : visualStep === 'storing' || visualStep === 'completed' ? (
                  <span>คุณอาศัยอยู่ที่ไหน?: <span className="text-white">{userInput}</span></span>
                ) : (
                  <span className="text-slate-600 italic select-none">รอการเริ่มต้นจำลอง...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. CARD 2: 4.2.2 การแปลงชนิดข้อมูลที่รับเข้ามา (Type Casting)
// ============================================================================
const TypeCastingCard = () => {
  const [numValue, setNumValue] = useState('10');
  const [rawOutput, setRawOutput] = useState('');
  const [castOutput, setCastOutput] = useState('');

  useEffect(() => {
    // raw concat
    setRawOutput(`"${numValue}" + "${numValue}" = "${numValue}${numValue}"`);
    // cast addition
    const parsed = parseInt(numValue);
    if (isNaN(parsed)) {
      setCastOutput('Error (ไม่ใช่ตัวเลขจำนวนเต็ม)');
    } else {
      setCastOutput(`int(${numValue}) + int(${numValue}) = ${parsed + parsed}`);
    }
  }, [numValue]);

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ArrowRightLeft className="w-6 h-6 text-indigo-500" /> การแปลงชนิดข้อมูลที่รับเข้ามา (Type Casting)
          </h4>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          **กฎเหล็กสำคัญที่สุด:** ค่าที่ได้จากฟังก์ชัน <code>input()</code> จะจัดเก็บในสถานะ **ข้อความ (String) เสมอ** หากเรานำไปคำนวณคณิตศาสตร์โดยตรงโปรแกรมจะพังหรือเกิดการประมวลผลต่อกันแบบตัวอักษรแทน เราต้องครอบเพื่อทำการแปลงชนิดข้อมูล (Type Casting) เช่น ครอบด้วย <code>int()</code> หรือ <code>float()</code>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Controls */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ทดสอบป้อนตัวเลขตัวแปร:</span>
            <input 
              type="text" 
              value={numValue}
              onChange={(e) => setNumValue(e.target.value)}
              placeholder="ป้อนค่าตัวเลข เช่น 10 หรือ 99"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-800 text-[12.5px] leading-relaxed flex gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <strong className="block mb-0.5">ระวังจุดบกพร่องยอดฮิต!</strong>
                หากผู้ใช้กรอกข้อความที่แปลงเป็นเลขไม่ได้ เช่น "สิบ" ตัวแปรภาษา Python จะขึ้นแจ้งข้อผิดพลาด <code>ValueError</code> ทันที
              </div>
            </div>
          </div>

          {/* Visualization box */}
          <div className="grid grid-cols-1 gap-4 font-mono text-xs md:text-sm">
            {/* Case A: Without casting */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-rose-400 text-[10px] font-bold border-b border-slate-800 pb-2 mb-3 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> กรณีที่ 1: ไม่ทำการแปลงค่า (พฤติกรรมผิดพลาด)
                </div>
                <div className="leading-relaxed">
                  <span className="text-blue-400">score</span> = <span className="text-yellow-300">input</span>(<span className="text-emerald-400">"กรอกคะแนน: "</span>) <span className="text-slate-500"># ชนิด: str</span><br/>
                  <span className="text-indigo-400">print</span>(<span className="text-blue-400">score</span> + <span className="text-blue-400">score</span>)
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800">
                <span className="text-slate-500 text-[9px] uppercase tracking-wider block mb-1">ผลลัพธ์บนจอ:</span>
                <div className="bg-black/60 px-4 py-2 rounded-xl text-rose-300 border border-rose-500/20 shadow-inner">
                  &gt; {rawOutput}
                </div>
              </div>
            </div>

            {/* Case B: With casting */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-emerald-400 text-[10px] font-bold border-b border-slate-800 pb-2 mb-3 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> กรณีที่ 2: ทำการแปลงค่าผ่าน int() (ถูกต้อง)
                </div>
                <div className="leading-relaxed">
                  <span className="text-blue-400">score</span> = <span className="text-yellow-300">int</span>(<span className="text-yellow-300">input</span>(<span className="text-emerald-400">"กรอกคะแนน: "</span>)) <span className="text-slate-500"># ชนิด: int</span><br/>
                  <span className="text-indigo-400">print</span>(<span className="text-blue-400">score</span> + <span className="text-blue-400">score</span>)
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800">
                <span className="text-slate-500 text-[9px] uppercase tracking-wider block mb-1">ผลลัพธ์บนจอ:</span>
                <div className="bg-black/60 px-4 py-2 rounded-xl text-emerald-300 border border-emerald-500/20 shadow-inner">
                  &gt; {castOutput}
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
// 3. CARD 3: 4.2.3 Interactive Terminal Chatbot (I/O Sandbox)
// ============================================================================
const TerminalSimulator = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if ((step === 1 || step === 3) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleRun = () => {
    setStep(1);
    setName('');
    setYear('');
    setInputVal('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputVal.trim() !== '') {
      if (step === 1) {
        setName(inputVal);
        setInputVal('');
        setStep(2);
        setTimeout(() => setStep(3), 600); // delay effect
      } else if (step === 3) {
        setYear(inputVal);
        setInputVal('');
        setStep(4);
      }
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-teal-500" /> เครื่องจำลองคอนโซลรับส่งพิกัด I/O และหน่วยความจำตัวแปร
          </h4>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          เรียนรู้การทำงานแบบประสานสอดคล้องระหว่างโค้ด หน้าจอคอนโซลสั่งการ และหน่วยความจำของคอมพิวเตอร์แบบละเอียด ลองกด **รันโปรแกรม** พิมพ์ตอบข้อมูล และดูความก้าวหน้าทีละขั้นตอน
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Source Code Panel (Column 1) */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center gap-2.5">
                <Code2 className="w-4.5 h-4.5 text-emerald-500" />
                <span className="text-slate-400 font-mono text-xs">chatbot.py</span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-loose text-slate-300">
                <div className={`p-1 rounded transition-colors ${step >= 1 && step <= 2 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
                  <span className="text-blue-400">name</span> = <span className="text-yellow-200">input</span>(<span className="text-emerald-400">"คุณชื่ออะไร? : "</span>)
                </div>
                <div className={`p-1 rounded transition-colors ${step >= 3 && step <= 4 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
                  <span className="text-blue-400">birth_year</span> = <span className="text-yellow-200">int</span>(<span className="text-yellow-200">input</span>(<span className="text-emerald-400">"ปีเกิด ค.ศ.: "</span>))
                </div>
                <br />
                <div className={`p-1 rounded transition-colors ${step === 4 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
                  <span className="text-blue-400">age</span> = <span className="text-orange-400">2026</span> - <span className="text-blue-400">birth_year</span>
                </div>
                <div className={`p-1 rounded transition-colors ${step === 4 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
                  <span className="text-indigo-400">print</span>(<span className="text-emerald-400">f"สวัสดีคุณ <span className="text-blue-300">{`{name}`}</span> คุณอายุ <span className="text-blue-300">{`{age}`}</span>"</span>)
                </div>
              </div>
            </div>
            
            <div className="bg-slate-950 p-4 border-t border-slate-800 text-center">
              <button 
                onClick={handleRun}
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-2.5 px-6 rounded-xl transition-all text-xs"
              >
                {step === 0 ? '▶ รันโปรแกรม (Run)' : '🔄 รีสตาร์ทโปรแกรม'}
              </button>
            </div>
          </div>

          {/* Terminal Console Panel (Column 2) */}
          <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="bg-[#020617] px-5 py-3 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-500 font-mono text-xs">Console Terminal</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
              </div>
              
              <div className="p-5 font-mono text-[13px] leading-loose text-emerald-400 flex-grow">
                {step === 0 && (
                  <div className="text-slate-500 flex items-center justify-center h-[120px] text-xs">
                    รอการกดคลิกปุ่ม รันโปรแกรม...
                  </div>
                )}
                
                {step >= 1 && (
                  <div className="mb-2">
                    คุณชื่ออะไร? : {name ? <span className="text-white">{name}</span> : 
                      <input 
                        ref={inputRef}
                        type="text" 
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="bg-transparent border-none outline-none text-white w-32 animate-pulse focus:animate-none border-b border-emerald-500/50"
                        placeholder="พิมพ์ชื่อ..."
                        autoFocus
                      />
                    }
                  </div>
                )}

                {step >= 3 && (
                  <div className="mb-2">
                    ปีเกิด ค.ศ.: {year ? <span className="text-white">{year}</span> : 
                      <input 
                        ref={inputRef}
                        type="number" 
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="bg-transparent border-none outline-none text-white w-32 animate-pulse focus:animate-none border-b border-emerald-500/50"
                        placeholder="พิมพ์ปี..."
                      />
                    }
                  </div>
                )}

                {step === 4 && (
                  <div className="mt-4 pt-3 border-t border-slate-800 text-emerald-300">
                    &gt; สวัสดีคุณ <span className="text-white font-bold">{name}</span> ปีนี้คุณอายุ <span className="text-white font-bold">{2026 - parseInt(year)}</span> ปีแล้วนะ!
                  </div>
                )}

                {(step === 1 || step === 3) && (
                  <div className="mt-6 text-[10px] text-slate-500 flex items-center gap-1.5">
                    <Keyboard className="w-3.5 h-3.5" /> พิมพ์แล้วกด Enter เพื่อส่งค่าเข้าสู่ระบบ
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-slate-950 p-4 border-t border-slate-900 text-slate-500 text-[10px] font-mono text-center">
              Active: {step === 1 ? 'input_name_wait' : step === 3 ? 'input_year_wait' : 'system_idle'}
            </div>
          </div>

          {/* Memory Inspector (Column 3) */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-500" /> หน่วยความจำเครื่อง (RAM Variables)
              </span>

              <div className="space-y-3 font-mono text-xs">
                {/* Var 1: name */}
                <div className={`p-3 rounded-xl border transition-all ${
                  name ? 'bg-white border-emerald-500 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'
                }`}>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">ตัวแปร: name</div>
                  <div className="font-bold mt-1 text-slate-800 text-sm">{name ? `"${name}"` : 'None (ว่างเปล่า)'}</div>
                  {name && <div className="text-[9px] text-emerald-600 mt-0.5">ประเภท: String (str)</div>}
                </div>

                {/* Var 2: birth_year */}
                <div className={`p-3 rounded-xl border transition-all ${
                  year ? 'bg-white border-emerald-500 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'
                }`}>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">ตัวแปร: birth_year</div>
                  <div className="font-bold mt-1 text-slate-800 text-sm">{year ? year : 'None (ว่างเปล่า)'}</div>
                  {year && <div className="text-[9px] text-emerald-600 mt-0.5">ประเภท: Integer (int) #ผ่าน casting แล้ว</div>}
                </div>

                {/* Var 3: age */}
                <div className={`p-3 rounded-xl border transition-all ${
                  step === 4 ? 'bg-white border-indigo-500 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'
                }`}>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">ตัวแปรคำนวณ: age</div>
                  <div className="font-bold mt-1 text-slate-800 text-sm">{step === 4 ? 2026 - parseInt(year) : 'None (ว่างเปล่า)'}</div>
                  {step === 4 && <div className="text-[9px] text-indigo-600 mt-0.5">ประเภท: Integer (int)</div>}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed pt-4 border-t border-slate-200 mt-4">
              สังเกตว่า <strong>birth_year</strong> ถูกครอบด้วยคำสั่ง <code>int(...)</code> ทำให้ตัวแปรถูกเก็บเป็นจำนวนเต็มอย่างถูกต้อง และนำไปคำนวณหา <strong>age</strong> ได้ทันที
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. CARD 4: มินิเกม: ภารกิจผู้รับข้อมูล (Input Rescue Game)
// ============================================================================
const InputRescueGame = () => {
  const [level, setLevel] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, success, fail

  const levels = {
    1: {
      title: 'ภารกิจที่ 1: รับค่าอายุเพื่อนำไปบวกเพิ่ม',
      desc: 'ต้องการรับเลขอายุ เช่น 18 ปีจากผู้ใช้ เพื่อนำไปคำนวณบวกเพิ่มอีก 5 ปีถัดไป ต้องเขียนโครงสร้างรับข้อมูลอย่างไรให้คำนวณผ่านและไม่เกิด Error?',
      target: '23', // 18 + 5
      code: 'age = ?("อายุของคุณ: ")\nprint(age + 5)',
      options: [
        { key: 'A', text: 'input', isCorrect: false },
        { key: 'B', text: 'int(input)', isCorrect: true },
        { key: 'C', text: 'float', isCorrect: false },
        { key: 'D', text: 'int', isCorrect: false }
      ],
      tip: 'การคำนวณอายุด้วยจำนวนเต็ม จำเป็นต้องครอบ input() ด้วย int()'
    },
    2: {
      title: 'ภารกิจที่ 2: รับน้ำหนักตัวแบบมีจุดทศนิยม',
      desc: 'ต้องการรับค่าน้ำหนักตัว เช่น 55.4 กิโลกรัม เพื่อนำไปเป็นตัวคูณในการคำนวณปริมาณน้ำที่ต้องดื่ม ต้องแปลงชนิดข้อมูลเป็นรูปแบบใด?',
      target: '55.4',
      code: 'weight = ?(input("น้ำหนัก: "))',
      options: [
        { key: 'A', text: 'int', isCorrect: false },
        { key: 'B', text: 'str', isCorrect: false },
        { key: 'C', text: 'float', isCorrect: true },
        { key: 'D', text: 'bool', isCorrect: false }
      ],
      tip: 'ข้อมูลที่มีเศษทศนิยม ตัวแปรภาษา Python ใช้รหัสโครงสร้างแบบ float'
    },
    3: {
      title: 'ภารกิจที่ 3: แก้ไขบั๊ก TypeError',
      desc: 'โค้ดรับส่วนสูง height = input("ส่วนสูงซม.: ") พังเพราะนำไปทำ height / 100 แล้วเกิด TypeError: unsupported operand type... ต้องทำการแก้ไขโค้ดที่บรรทัดคำนวณอย่างไร?',
      target: '1.75',
      code: 'height = input("ส่วนสูงซม.: ")\n# ผู้ใช้พิมพ์ 175\nprint(? / 100)',
      options: [
        { key: 'A', text: 'height', isCorrect: false },
        { key: 'B', text: 'float(height)', isCorrect: true },
        { key: 'C', text: 'int("height")', isCorrect: false },
        { key: 'D', text: 'str(height)', isCorrect: false }
      ],
      tip: 'เนื่องจาก height มีชนิดข้อมูลเป็นข้อความ str เราต้องแคสต์เป็นตัวเลขทศนิยม float(height) ก่อนนำไปหารด้วย 100'
    }
  };

  const handleAnswerSelect = (option) => {
    if (gameStatus !== 'playing') return;
    setSelectedAnswer(option);
    if (option.isCorrect) {
      setGameStatus('success');
    } else {
      setGameStatus('fail');
    }
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setSelectedAnswer(null);
    setGameStatus('playing');
  };

  const resetGame = () => {
    setLevel(1);
    setSelectedAnswer(null);
    setGameStatus('playing');
  };

  const currentLevel = levels[level];

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#10B981]/20 to-[#06B6D4]/20 rounded-bl-full blur-3xl -z-0 transition-all duration-700 group-hover:scale-125"></div>

      <div className="relative z-10 text-center mb-10">
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Gamification Zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
          <Terminal className="w-8 h-8 text-emerald-400 animate-bounce" />
          มินิเกม: ภารกิจผู้รับข้อมูล (Input Rescue)
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-[15px]">
          เลือกรหัสการแปลงชนิดข้อมูลหรือวิธีแก้ไวยากรณ์เพื่อให้คำสั่งรับข้อมูลของโปรแกรมทำงานคำนวณตัวเลขและส่งค่าได้อย่างปลอดภัย
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Play Area */}
        <div className="bg-slate-800/80 backdrop-blur rounded-3xl p-6 md:p-8 border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">ด่านที่ {level} / 3</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((l) => (
                  <div 
                    key={l} 
                    className={`w-8 h-2 rounded-full transition-all ${
                      l === level ? 'bg-emerald-500' : l < level ? 'bg-emerald-600' : 'bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{currentLevel.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">{currentLevel.desc}</p>

            <div className="mb-6 bg-slate-900 rounded-xl p-4 border border-slate-950 font-mono text-[13.5px]">
              <div className="text-[10px] text-emerald-400 uppercase mb-2 font-bold tracking-wider">// ค้นหาสัญลักษณ์เพื่อแทนที่ ?</div>
              <pre className="text-slate-300 whitespace-pre">{currentLevel.code}</pre>
            </div>

            <div className="mb-6">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">เป้าหมายผลการแสดงออกหน้าจอ:</span>
              <div className="bg-slate-950 border border-emerald-500/20 px-5 py-3 rounded-xl font-mono text-emerald-400 text-base shadow-inner inline-block min-w-[200px]">
                {currentLevel.target}
              </div>
            </div>
          </div>

          {/* Tips block */}
          {gameStatus === 'playing' && (
            <div className="mt-4 bg-emerald-950/40 border border-emerald-800/50 p-3.5 rounded-xl text-emerald-300 text-[12px] leading-relaxed flex gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>วิเคราะห์ทางผ่าน:</strong> {currentLevel.tip}</span>
            </div>
          )}

          {/* Success Banner */}
          {gameStatus === 'success' && (
            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl flex items-center gap-3 animate-pulse">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <div>
                <p className="text-sm font-bold">สำเร็จสมบูรณ์! การแปลงชนิดข้อมูลเป็นไปอย่างเหมาะสม</p>
              </div>
            </div>
          )}

          {/* Failure Banner */}
          {gameStatus === 'fail' && (
            <div className="mt-4 bg-rose-500/10 border border-rose-500/40 text-rose-400 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <div>
                <p className="text-sm font-bold">เกิดข้อผิดพลาด! ชนิดข้อมูลของตัวแปรไม่เหมาะสมกับการประมวลผล</p>
              </div>
            </div>
          )}
        </div>

        {/* Answers and Actions */}
        <div className="flex flex-col justify-between gap-6">
          <div className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/80 flex-1 flex flex-col justify-center">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">เลือกคำตอบป้อนตัวแปร ?</span>
            <div className="grid grid-cols-1 gap-3">
              {currentLevel.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={gameStatus !== 'playing'}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 active:scale-98 ${
                    selectedAnswer?.key === option.key
                      ? option.isCorrect
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                        : 'bg-rose-500/20 border-rose-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-600 disabled:opacity-50'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    selectedAnswer?.key === option.key
                      ? option.isCorrect
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {option.key}
                  </span>
                  <span className="font-mono text-[14.5px]">{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {gameStatus === 'success' && level < 3 && (
              <button
                onClick={nextLevel}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                ลุยต่อด่านถัดไป <ChevronRight className="w-5 h-5" />
              </button>
            )}
            
            {gameStatus === 'success' && level === 3 && (
              <div className="w-full text-center animate-fade-in">
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-4 rounded-2xl mb-4 font-bold text-sm">
                  🎉 ยินดีด้วย! คุณผ่านภารกิจผู้รับข้อมูลและแปลงตัวแปรได้ครบถ้วน
                </div>
                <button
                  onClick={resetGame}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold transition-all"
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" /> เล่นทบทวนใหม่อีกครั้ง
                </button>
              </div>
            )}

            {gameStatus === 'fail' && (
              <button
                onClick={() => { setGameStatus('playing'); setSelectedAnswer(null); }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-3.5 rounded-2xl font-bold transition-all"
              >
                ลองทบทวนโค้ดใหม่อีกครั้ง
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. MAIN COMPONENT (Vertical Stack Layout)
// ============================================================================
export default function pyUnit4_2_InputDemo() {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === '1122') {
      setIsUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const teacherTaskContent = `ใบงานกิจกรรม: ปฏิบัติการฟังก์ชันการรับข้อมูลและการแปลงชนิดข้อมูล
ให้นักเรียนเปิดเครื่องมือพัฒนาโปรแกรม Python และเขียนคำสั่งเพื่อตอบโจทย์ทั้ง 20 ข้อดังต่อไปนี้:

1. โปรแกรมทักทายผู้ใช้งาน (Greeting Program)
   เขียนโปรแกรมรับชื่อเล่นของผู้ใช้ผ่านคีย์บอร์ด แล้วแสดงผลลัพธ์เป็นคำว่า "สวัสดีคุณ [ชื่อเล่น] ขอต้อนรับสู่โลกคอมพิวเตอร์"
   - ตัวอย่างอินพุต: แม็ค
   - ตัวอย่างผลลัพธ์: สวัสดีคุณ แม็ค ขอต้อนรับสู่โลกคอมพิวเตอร์

2. โปรแกรมคำนวณปีเกิด พ.ศ. (Birth Year Calculator)
   เขียนโปรแกรมรับเลขอายุปัจจุบัน (จำนวนเต็ม) แล้วคำนวณและแสดงปี พ.ศ. เกิดของผู้ใช้ (สมมติว่าปีปัจจุบันคือ พ.ศ. 2569)
   - ตัวอย่างอินพุต: 18
   - ตัวอย่างผลลัพธ์: ปี พ.ศ. เกิดของคุณคือ 2551

3. โปรแกรมเครื่องบวกเลขสองเท่า (Double Number Calculator)
   เขียนโปรแกรมรับตัวเลขจำนวนเต็ม 1 จำนวน แล้วนำค่าไปบวกเพิ่มขึ้นเป็น 2 เท่าจากเดิม
   - ตัวอย่างอินพุต: 15
   - ตัวอย่างผลลัพธ์: ผลลัพธ์หลังคูณสองเท่ากับ: 30

4. โปรแกรมคำนวณราคาสินค้ารวมภาษีมูลค่าเพิ่ม (VAT 7% Calculator)
   เขียนโปรแกรมรับราคาสินค้าดิบ (ทศนิยม) แล้วคำนวณพร้อมพิมพ์ราคาสินค้ารวม VAT 7%
   - ตัวอย่างอินพุต: 120.0
   - ตัวอย่างผลลัพธ์: ราคาสินค้ารวม VAT 7%: 128.4 บาท

5. โปรแกรมหาพื้นที่สี่เหลี่ยมผืนผ้า (Area of Rectangle)
   เขียนโปรแกรมรับค่าความกว้างและความยาวของรูปสี่เหลี่ยม (ทศนิยม) แล้วแสดงผลคำนวณพื้นที่
   - ตัวอย่างอินพุต: กว้าง = 5.5, ยาว = 10.0
   - ตัวอย่างผลลัพธ์: พื้นที่สี่เหลี่ยมผืนผ้า: 55.0 ตารางหน่วย

6. โปรแกรมแปลง ค.ศ. เป็น พ.ศ. (A.D. to B.E. Converter)
   เขียนโปรแกรมรับปีคริสต์ศักราช (ค.ศ.) จำนวนเต็ม แล้วพิมพ์แปลงเป็นปีพุทธศักราช (พ.ศ.)
   - ตัวอย่างอินพุต: 2026
   - ตัวอย่างผลลัพธ์: ปี พ.ศ. ปัจจุบันคือ: 2569 พ.ศ.

7. โปรแกรมคำนวณเกรดเฉลี่ยรายวิชา (Average Score Calculator)
   เขียนโปรแกรมรับคะแนนวิชาคณิตศาสตร์, วิทยาศาสตร์, และภาษาอังกฤษ (จำนวนเต็ม) แล้วหาค่าเฉลี่ย
   - ตัวอย่างอินพุต: คณิต = 80, วิทย์ = 75, อังกฤษ = 85
   - ตัวอย่างผลลัพธ์: คะแนนเฉลี่ยสะสม: 80.0 คะแนน

8. โปรแกรมหาค่าดัชนีมวลกาย (BMI Calculator)
   เขียนโปรแกรมรับค่าน้ำหนัก (กิโลกรัม) และส่วนสูง (เซนติเมตร) แล้วแปลงส่วนสูงเป็นเมตร จากนั้นคำนวณ BMI = น้ำหนัก / (ส่วนสูงเมตร ** 2)
   - ตัวอย่างอินพุต: น้ำหนัก = 70.0, ส่วนสูง = 175
   - ตัวอย่างผลลัพธ์: ดัชนีมวลกาย (BMI) ของคุณคือ: 22.86

9. โปรแกรมแปลงองศาเซลเซียสเป็นฟาเรนไฮต์ (Celsius to Fahrenheit)
   เขียนโปรแกรมรับอุณหภูมิเซลเซียส (ทศนิยม) แล้วคำนวณแปลงเป็นฟาเรนไฮต์สูตร F = C * 9/5 + 32
   - ตัวอย่างอินพุต: 37.5
   - ตัวอย่างผลลัพธ์: อุณหภูมิในหน่วยฟาเรนไฮต์: 99.5 องศาฟาเรนไฮต์

10. โปรแกรมคำนวณราคาประหยัดค่าหน่วยไฟฟ้า (Electricity Bill Calculator)
    เขียนโปรแกรมรับจำนวนหน่วยไฟฟ้าที่ใช้ และราคาต่อหน่วย (ทศนิยม) แล้วคำนวณหาค่าไฟที่ต้องจ่ายทั้งหมด
    - ตัวอย่างอินพุต: หน่วยไฟฟ้า = 150, ราคาต่อหน่วย = 4.5
    - ตัวอย่างผลลัพธ์: ค่าไฟฟ้าสุทธิที่ต้องชำระ: 675.0 บาท

11. โปรแกรมหาเศษส่วนแบ่งกลุ่ม (Division and Remainder Finder)
    เขียนโปรแกรมรับตัวเลขจำนวนเต็มสองจำนวน (ตัวตั้ง a และตัวหาร b) จากนั้นให้ประมวลหาผลหารจำนวนเต็ม (a // b) และเศษค้างเหลือจากการหาร (a % b)
    - ตัวอย่างอินพุต: ตัวตั้ง = 17, ตัวหาร = 5
    - ตัวอย่างผลลัพธ์: ผลหารจำนวนเต็ม = 3, เศษเหลือมอดูโล = 2

12. โปรแกรมแปลงแปลงเวลาจากชั่วโมงเป็นวินาที (Hours to Seconds Converter)
    เขียนโปรแกรมรับข้อมูลเวลาในหน่วยชั่วโมง (จำนวนเต็ม) จากนั้นคำนวณแปลงเป็นนาทีและวินาทีตามลำดับ
    - ตัวอย่างอินพุต: 2
    - ตัวอย่างผลลัพธ์: 2 ชั่วโมง คิดเป็น 120 นาที หรือ 7200 วินาที

13. โปรแกรมระบบขายของอัตโนมัติ (Mini-Cashier Change Calculator)
    เขียนโปรแกรมรับราคาสินค้ารวม และยอดจำนวนเงินที่ลูกค้าจ่าย (จำนวนเต็ม) จากนั้นคำนวณเงินทอนส่งคืนให้ลูกค้า
    - ตัวอย่างอินพุต: ราคารวม = 430, จำนวนเงินจ่าย = 500
    - ตัวอย่างผลลัพธ์: ยอดเงินทอนทอนคืน: 70 บาท

14. โปรแกรมสร้างป้ายข้อความพิมพ์วน (String Multiplier)
    เขียนโปรแกรมรับคำสตริง 1 คำ และจำนวนตัวเลขจำนวนเต็มรอบที่ต้องการ พิมพ์แสดงผลคำนั้นต่อกันตามจำนวนรอบ
    - ตัวอย่างอินพุต: คำ = "Python", รอบ = 3
    - ตัวอย่างผลลัพธ์: ผลลัพธ์: PythonPythonPython

15. โปรแกรมรับข้อมูลสินค้าจัดโปรโมชั่นส่วนลด (Product Discount Calculator)
    เขียนโปรแกรมรับราคาเต็มของสินค้าดิบ และเปอร์เซ็นต์ส่วนลด เช่น 15% จากนั้นคำนวณแสดงราคาสุทธิหลังหักส่วนลด
    - ตัวอย่างอินพุต: ราคาปกติ = 1200, ส่วนลด = 15
    - ตัวอย่างผลลัพธ์: ราคาหลังหักลดสะสม 15%: 1020.0 บาท

16. โปรแกรมคำนวณจำนวนเฉลี่ยและคนจัดงานกลุ่ม (Student Grouping Calculator)
    เขียนโปรแกรมรับจำนวนนักเรียนทั้งหมด และจำนวนกลุ่มที่ต้องการจัด (จำนวนเต็ม) จากนั้นหาว่าในแต่ละกลุ่มมีเด็กกี่คน และเศษเหลือนักเรียนกี่คนที่ไม่มีกลุ่ม
    - ตัวอย่างอินพุต: จำนวนเด็ก = 47, จำนวนกลุ่ม = 5
    - ตัวอย่างผลลัพธ์: แบ่งกลุ่มได้กลุ่มละ 9 คน และเศษนักเรียนค้างเกาะเศษเหลือ = 2 คน

17. โปรแกรมประมวณคำนวณดอกเบี้ยสิ้นปี (Interest Savings Calculator)
    เขียนโปรแกรมรับเงินต้นที่ฝาก และอัตราดอกเบี้ยร้อยละต่อปี จากนั้นแสดงยอดรวมดอกเบี้ยหลังครบรอบปีแรก
    - ตัวอย่างอินพุต: เงินฝาก = 50000.0, ดอกเบี้ยปีละ = 1.75
    - ตัวอย่างผลลัพธ์: ดอกเบี้ยที่ได้รับเมื่อครบปี: 875.0 บาท

18. โปรแกรมคำนวณสี่การทำงานคณิตหลัก (Arithmetic Operators Multi-Calculator)
    เขียนโปรแกรมรับค่าตัวเลขทศนิยม 2 จำนวน แล้วพิมพ์แสดงผลรวม, ผลลบ, ผลคูณ และผลหาร ทศนิยมทันที
    - ตัวอย่างอินพุต: x = 12.0, y = 4.0
    - ตัวอย่างผลลัพธ์: บวก = 16.0, ลบ = 8.0, คูณ = 48.0, หาร = 3.0

19. โปรแกรมหาปริมาตรทรงกระบอก (Volume of Cylinder)
    เขียนโปรแกรมรับค่ายอดรัศมี (r) และส่วนสูง (h) ของรูปทรงกระบอก จากนั้นคำนวณหาปริมาตร V = 3.14159 * (r ** 2) * h
    - ตัวอย่างอินพุต: รัศมี = 3.0, ส่วนสูง = 10.0
    - ตัวอย่างผลลัพธ์: ปริมาตรของรูปทรงกระบอก: 282.7431 ลูกบาศก์หน่วย

20. โปรแกรมสั่งสลับค่าตัวแปร (Variables Swapper Program)
    เขียนโปรแกรมรับข้อมูลตัวแปร a และ b จากนั้นสลับตำแหน่งค่าย้อนกัน และพิมพ์แสดงผลเพื่อยืนยันว่าสลับกันสำเร็จ
    - ตัวอย่างอินพุต: a = "มด", b = "ช้าง"
    - ตัวอย่างผลลัพธ์: สลับค่าสำเร็จ! ปัจจุบัน a = "ช้าง" และ b = "มด"`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-emerald-200 selection:text-emerald-900 relative">
      {/* Background ambient glow layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-100/40 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-teal-100/50 blur-[130px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        
        {/* CARD 1: 4.2.1 รูปแบบการใช้งานฟังก์ชัน input() */}
        <BasicInputCard />

        {/* CARD 2: 4.2.2 การแปลงชนิดข้อมูลที่รับเข้ามา (Type Casting) */}
        <TypeCastingCard />

        {/* CARD 3: 4.2.3 ตัวจำลอง Console Chatbot sandbox */}
        <TerminalSimulator />

        {/* CARD 4: มินิเกมผู้รับข้อมูล (Input Rescue) */}
        <InputRescueGame />

        {/* Teacher Task footer */}
        {isUnlocked ? (
          <TeacherTask title="ใบงานบทเรียน 4.2" taskText={teacherTaskContent} />
        ) : (
          <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col items-center justify-center text-center shadow-xl">
              <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-6 animate-pulse">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">เข้าถึงภารกิจสำหรับนักเรียน (Instructor Task)</h3>
              <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                กิจกรรมปฏิบัติการนี้ถูกจำกัดสิทธิ์เฉพาะในชั้นเรียน กรุณากรอกรหัสผ่าน 4 หลักที่ได้รับจากอาจารย์ผู้สอนเพื่อเข้าสู่แบบฝึกหัด
              </p>
              
              <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center items-center">
                <input 
                  type="password"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="ป้อนรหัสผ่าน 4 หลัก"
                  className={`h-[42px] w-full sm:w-48 text-center border rounded-xl font-mono text-lg tracking-widest focus:outline-none transition-all ${
                    passError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/12 bg-red-50' 
                      : 'border-slate-300 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/12 bg-white'
                  }`}
                />
                <button
                  type="submit"
                  className="h-[42px] w-full sm:w-auto px-6 bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 rounded-xl font-semibold cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  ถอดรหัสผ่าน
                </button>
              </form>
              
              {passError && (
                <p className="text-red-500 font-bold text-xs mt-3 animate-pulse">
                  ⚠️ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}