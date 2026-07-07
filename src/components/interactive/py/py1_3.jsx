import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  Cpu,
  Code,
  Layers,
  ArrowRight,
  Activity,
  Server,
  Network,
  Sparkles,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Laptop,
  Check,
  HelpCircle,
  Sliders,
  Globe,
  FileCode,
  ScanFace,
  Download
} from 'lucide-react';

export default function py1_3() {
  // ==========================================
  // 3. หลักการทำงานของ Interpreter (Line-by-Line Laser Visualizer)
  // ==========================================
  const [interActiveLine, setInterActiveLine] = useState(-1);
  const [interTerminal, setInterTerminal] = useState([]);
  const [interStatus, setInterStatus] = useState('idle'); // idle, running, bug
  const [interSpeed, setInterSpeed] = useState(600);

  const pythonLines = [
    { code: 'num1 = 100', desc: 'จองพื้นที่หน่วยความจำ num1 เก็บค่า 100', action: () => 'num1 = 100 initialized.' },
    { code: 'num2 = 50', desc: 'จองพื้นที่หน่วยความจำ num2 เก็บค่า 50', action: () => 'num2 = 50 initialized.' },
    { code: 'total = num1 + num2', desc: 'บวกค่า 100 + 50 ได้ 150', action: () => 'total calculated: 150' },
    { code: 'print(f"ผลลัพธ์คือ: {total}")', desc: 'สั่งแสดงผลลัพธ์ออกทางจอภาพ', action: () => 'Console Out: "ผลลัพธ์คือ: 150"' }
  ];

  const runInterpreterStep = () => {
    if (interStatus === 'running') return;
    
    const nextLine = interActiveLine + 1;
    if (nextLine >= pythonLines.length) {
      setInterActiveLine(-1);
      setInterTerminal(['🔄 รีเซ็ตหน่วยประมวลผล Interpreter เรียบร้อยแล้ว']);
      setInterStatus('idle');
      return;
    }

    setInterStatus('running');
    setInterActiveLine(nextLine);

    setTimeout(() => {
      const lineData = pythonLines[nextLine];
      const result = lineData.action();
      setInterTerminal(old => [...old, `[Line ${nextLine + 1}] Executing "${lineData.code}"\n  ➔ ${result}`]);
      setInterStatus('idle');
    }, interSpeed);
  };

  // ==========================================
  // 4. หลักการทำงานของ Compiler (Whole-Code Compiler Engine)
  // ==========================================
  const [compileCodeState, setCompileCodeState] = useState('clean'); // clean, has_bug
  const [compileStatus, setCompileStatus] = useState('idle'); // idle, compiling, success, failed
  const [compileLogs, setCompileLogs] = useState([]);

  const cppCodeExamples = {
    clean: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int num1 = 100, num2 = 50;\n    int total = num1 + num2;\n    cout << "Result: " << total << endl;\n    return 0;\n}`,
    has_bug: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int num1 = 100, num2 = 50;\n    int total = num1 + num2\n    cout << "Result: " << total << endl;\n    return 0; // ลืมปิดเซมิโคลอนบรรทัดก่อนหน้า\n}`
  };

  const handleCompile = () => {
    if (compileStatus === 'compiling') return;
    setCompileStatus('compiling');
    setCompileLogs(['🚀 เริ่มต้นวิเคราะห์ไวยากรณ์โค้ดและไลบรารี C++...', '🔍 ตรวจสอบ Syntax อักขระประโยคควบคุม...']);

    setTimeout(() => {
      if (compileCodeState === 'clean') {
        setCompileLogs(old => [
          ...old,
          '✓ ตรวจสอบไวยากรณ์โค้ดผ่าน 100% ไร้ข้อผิดพลาด',
          '📦 บีบอัดสร้างชุดคำสั่ง Binary สำหรับ CPU สถาปัตยกรรม x64สำเร็จ',
          '✓ คอมไพล์เสร็จสมบูรณ์! ได้ไฟล์โปรแกรมสำเร็จรูป "result_program.exe"'
        ]);
        setCompileStatus('success');
      } else {
        setCompileLogs(old => [
          ...old,
          '❌ [ERROR] SyntaxError: Expected \';\' before \'cout\' on line 6',
          '❌ [FATAL] ขัดข้องในการเชื่อมโยงชุดคำสั่ง! คอมไพล์ล้มเหลว'
        ]);
        setCompileStatus('failed');
      }
    }, 1200);
  };

  const resetCompiler = () => {
    setCompileStatus('idle');
    setCompileLogs([]);
  };

  // ==========================================
  // 5. ตัวอย่างการใช้งาน (Language Matcher)
  // ==========================================
  const [c5Languages] = useState([
    { name: 'Python', type: 'Interpreter', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
    { name: 'C++', type: 'Compiler', color: 'bg-indigo-50 text-indigo-700 border-indigo-300' },
    { name: 'JavaScript', type: 'Interpreter', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
    { name: 'Go (Golang)', type: 'Compiler', color: 'bg-indigo-50 text-indigo-700 border-indigo-300' },
    { name: 'Rust', type: 'Compiler', color: 'bg-indigo-50 text-indigo-700 border-indigo-300' },
    { name: 'PHP', type: 'Interpreter', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' }
  ]);

  // ==========================================
  // 6. ตารางเปรียบเทียบ (Vibrant Battle Switch)
  // ==========================================
  const [c6ActiveRow, setC6ActiveRow] = useState(null);

  const battleRows = [
    {
      feature: 'ความเร็วในการเปิดทำงาน (Execution)',
      interpreter: 'ทำงานช้ากว่า เนื่องจากตัวแปรภาษาต้องอ่านโค้ดและวิเคราะห์ตรรกะทีละบรรทัดทุกครั้งที่รันโปรแกรม',
      compiler: 'ทำงานเร็วมาก เพราะแปลโค้ดทั้งชุดกลายเป็นภาษาเครื่อง (Machine Code) เก็บไว้ล่วงหน้าแล้ว',
      highlight: 'Speed'
    },
    {
      feature: 'การแสดงผลความผิดพลาด (Error Handling)',
      interpreter: 'ตรวจพบและหยุดทันทีในบรรทัดที่พบข้อผิดพลาด ทำให้นักเรียนแก้ไขบั๊กและไล่ตรรกะได้สะดวกมาก',
      compiler: 'ต้องสแกนตรวจหาข้อผิดพลาดทั้งโปรแกรม หากพบบั๊กเพียงจุดเดียวเครื่องจะไม่สร้างไฟล์รันผลให้',
      highlight: 'Debugging'
    },
    {
      feature: 'ไฟล์ผลลัพธ์ซอฟต์แวร์ (Output Files)',
      interpreter: 'ไม่มีการสร้างไฟล์ผลลัพธ์ใหม่ ต้องใช้ไฟล์โค้ดต้นฉบับคู่กับแอป Interpreter ทุกครั้งเพื่อรัน',
      compiler: 'สร้างไฟล์สำเร็จรูป .exe หรือ .bin แยกออกมาอิสระ นำไปเปิดใช้งานบนเครื่องอื่นได้โดยไม่ต้องมีโค้ด',
      highlight: 'Portability'
    }
  ];

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-emerald-200 selection:text-emerald-900 relative">

      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full bg-emerald-200/40 blur-[160px]"></div>
        <div className="absolute bottom-[12%] right-[-5%] w-[550px] h-[550px] rounded-full bg-teal-200/35 blur-[160px]"></div>
      </div>

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-6 md:space-y-8 relative z-10">

        {/* ----------------- Subtopic 1 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-50/80 text-emerald-600 border border-emerald-100 shadow-inner group cursor-pointer">
              <Cpu className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ความสำคัญของเครื่องมือแปลภาษาคอมพิวเตอร์</h2>
              <p className="text-[15px] text-slate-500">สะพานตรรกะเชื่อมการแปลไวยากรณ์ภาษามนุษย์สู่กระแสไฟฟ้าของเลขฐานสอง</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                คอมพิวเตอร์ประมวลผลงานผ่านชุดคำสั่งของกระแสไฟฟ้าในทรานซิสเตอร์ (แทนรหัสด้วย 0 และ 1) 
                แต่โค้ดที่เราเขียนมีความใกล้เคียงกับภาษาพูดของมนุษย์ 
                จึงต้องมี **เครื่องมือแปลภาษาคอมพิวเตอร์** ทำหน้าที่ควบคุมตรวจจับไวยากรณ์และแปลงรหัสสั่งงาน
              </p>
              
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                <h4 className="font-semibold text-emerald-950 text-sm mb-1">สะพานแปลงภาษา</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  หากขาดเครื่องมือแปลภาษาคอมพิวเตอร์ สมองกลของหน่วยประมวลผล CPU จะไม่สามารถทำตามความต้องการของซอฟต์แวร์ได้เลย ภาษาเครื่องมือแปลจึงมีความสำคัญอย่างมาก
                </p>
              </div>
            </div>

            {/* Vibrant visual indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <h4 className="font-bold text-slate-800 text-sm mb-2">1. ป้องกันข้อผิดพลาด</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  คอยช่วยนักเรียนตรวจสอบความถูกต้องของสัญลักษณ์ สะกดคำ (Syntax Check) เพื่อความราบรื่นในการทำงาน
                </p>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <h4 className="font-bold text-slate-800 text-sm mb-2">2. ปรับแต่งโครงสร้าง</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  จัดระเบียบตรรกะให้ทำงานเข้าสู่ CPU ได้ด้วยขนาดและกำลังประมวลผลที่เหมาะสมและปลอดภัยที่สุด
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 2 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-50/80 text-emerald-600 border border-emerald-100 shadow-inner group cursor-pointer">
              <Layers className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ประเภทของเครื่องมือแปลภาษาโปรแกรมคอมพิวเตอร์</h2>
              <p className="text-[15px] text-slate-500">ทำความเข้าใจสองคู่ปรับแนวคิดตัวแปรคำสั่งภาษา: อินเตอร์พรีเตอร์ และ คอมไพเลอร์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interpreter Card */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-0.5 rounded-full font-bold">
                  Interpreter Style
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2.5 mb-2">อินเตอร์พรีเตอร์ (Interpreter)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  แปลตรรกะและทำงานทีละบรรทัด หากพบข้อผิดพลาด ณ บรรทัดใดจะยกเลิกการรันทันที เหมาะกับภาษาเขียนง่าย เช่น **Python และ JavaScript**
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ตรวจสอบบั๊กและแก้ไขง่ายรวดเร็ว
              </div>
            </div>

            {/* Compiler Card */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-600 px-3 py-0.5 rounded-full font-bold">
                  Compiler Style
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2.5 mb-2">คอมไพเลอร์ (Compiler)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  สแกนโค้ดรวบยอดทั้งหน้า แปลงสร้างไฟล์สำเร็จรูป (.exe) ก่อนรัน หากมีจุดบกพร่องจะไม่สร้างโปรแกรมเลย เหมาะกับงานความเร็วสูง เช่น **C++ และ Rust**
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-indigo-600 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> ประสิทธิภาพการรันงานเร็วขีดสุด
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 3 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-50/80 text-emerald-600 border border-emerald-100 shadow-inner group cursor-pointer">
              <ScanFace className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">หลักการทำงานของ Interpreter</h2>
              <p className="text-[15px] text-slate-500">สแกนรหัสคำสั่งทีละบรรทัดแบบสลับตัวแปรและรายงานความก้าวหน้าอย่างชัดเจน</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ตัวแปลภาษาอินเตอร์พรีเตอร์จะทำตัวเสมือน **นักแปลเอกสารสดแบบทีละประโยค** 
                ตัวแอปพลิเคชันจะแปลงโค้ด Python บรรทัดแรกไปสู่ภาษาเครื่อง แล้วส่งให้ CPU ทำงานทันที 
                เมื่อสำเร็จแล้วจึงไหลต่อบรรทัดที่สอง
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ข้อดีที่ล้ำค่าคือ หากเจอบั๊กตัวแปร เช่น การเขียนคำสั่งหารศูนย์ บรรทัดที่ผ่านมาก่อนหน้ายังรันได้ปกติ 
                แล้วมาหยุดตรงจุดบั๊ก ทำให้นักเรียนวินิจฉัยจุดบกพร่องของตรรกะได้สะดวกที่สุด
              </p>
            </div>

            {/* Interpreter Laser Visualizer */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Python Interpreter Simulator
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-zinc-500 font-mono">Speed:</label>
                  <select 
                    value={interSpeed} 
                    onChange={(e) => setInterSpeed(Number(e.target.value))}
                    className="bg-slate-800 text-zinc-300 border border-slate-700 text-[11px] rounded focus:outline-none"
                  >
                    <option value={300}>เร็ว (300ms)</option>
                    <option value={600}>ปกติ (600ms)</option>
                    <option value={1200}>ช้า (1200ms)</option>
                  </select>
                </div>
              </div>

              {/* Code lines list */}
              <div className="space-y-2 font-mono text-[13px] mb-4">
                {pythonLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border leading-relaxed transition-all relative overflow-hidden
                      ${interActiveLine === idx 
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 scale-[1.01]' 
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 opacity-60'
                      }`}
                  >
                    {/* Laser scanning line effect overlay */}
                    {interActiveLine === idx && interStatus === 'running' && (
                      <div className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none"></div>
                    )}
                    
                    <div className="flex justify-between items-center font-bold">
                      <span>{line.code}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">{line.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action controller */}
              <div className="flex justify-between items-center">
                <button
                  onClick={runInterpreterStep}
                  disabled={interStatus === 'running'}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer active:scale-95 transition-all shadow-md hover:shadow-emerald-600/20 disabled:bg-zinc-600"
                >
                  <Play className="w-4 h-4 inline-block mr-1.5" />
                  {interActiveLine === -1 ? 'เริ่มรัน Interpreter' : 'กดรันทีละบรรทัด'}
                </button>

                <div className="text-[11px] font-mono text-zinc-500">
                  Line Status: {interStatus === 'running' ? 'Translating...' : 'Standby'}
                </div>
              </div>

              {/* Terminal Logs Output */}
              <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl min-h-[90px] font-mono text-[12px] text-slate-400">
                <div className="text-zinc-600 mb-1.5 flex justify-between items-center">
                  <span>// Python Console Output Screen:</span>
                  {interActiveLine === pythonLines.length - 1 && (
                    <span className="text-emerald-400 font-bold text-[10px]">✓ PROCESS FINISHED</span>
                  )}
                </div>
                {interTerminal.length === 0 && <p className="text-zinc-600 italic">หน้าจอว่างเปล่า...</p>}
                <pre className="text-emerald-400 leading-relaxed whitespace-pre-wrap">
                  {interTerminal.join('\n')}
                </pre>
              </div>

            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 4 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-50/80 text-emerald-600 border border-emerald-100 shadow-inner group cursor-pointer">
              <FileCode className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">หลักการทำงานของ Compiler</h2>
              <p className="text-[15px] text-slate-500">รวบยอดการแปลงไฟล์ไวยากรณ์สร้างซอฟต์แวร์ .exe สำเร็จรูปแบบไม่มีสะดุด</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ตัวแปลภาษาคอมไพเลอร์จะเปรียบดั่ง **กองคัดกรองแปลหนังสือแบบรูปเล่ม** 
                เครื่องจะทำการตรวจสอบความถูกต้องเชิงอักขระของซอฟต์แวร์ C++ ทั้งหน้ากระดาษรวดเดียว 
                หากไม่มีจุดที่สะกดผิดหรือข้อผิดพลาดไวยากรณ์แม้แต่น้อย เครื่องจะส่งคืนไฟล์ระบบผลลัพธ์ **(.exe)** ออกมา
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ข้อเด่นคือการนำไฟล์ผลลัพธ์ (.exe) ไปแจกจ่ายเปิดรันได้ทันทีบนคอมพิวเตอร์ปลายทางเครื่องอื่นๆ 
                โดยไม่มีความจำเป็นต้องติดตั้งชุดโปรแกรมหรือตัวแปลงภาษาคอมพิวเตอร์เพิ่มซ้ำอีกรอบ
              </p>
            </div>

            {/* Whole Code compiler machine UI */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <div className="absolute top-2 right-4 text-[10px] font-mono text-zinc-500">GCC Compiler x64</div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono text-sm text-indigo-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" /> Compiler Engine Box
                </h3>

                {/* State selector code */}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setCompileCodeState('clean'); resetCompiler(); }}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer border
                      ${compileCodeState === 'clean' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-zinc-400 border-slate-700'}`}
                  >
                    โค้ดปกติ
                  </button>
                  <button
                    onClick={() => { setCompileCodeState('has_bug'); resetCompiler(); }}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer border
                      ${compileCodeState === 'has_bug' ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-zinc-400 border-slate-700'}`}
                  >
                    โค้ดมีบั๊ก
                  </button>
                </div>
              </div>

              {/* Code viewer display */}
              <div className="mb-4">
                <pre className="font-mono text-[12.5px] text-indigo-300 bg-slate-950 p-4 rounded-xl border border-indigo-950 leading-relaxed max-h-[160px] overflow-y-auto">
                  {cppCodeExamples[compileCodeState]}
                </pre>
              </div>

              <div className="flex gap-3 justify-center mb-4">
                <button
                  onClick={handleCompile}
                  disabled={compileStatus === 'compiling'}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md hover:shadow-indigo-600/20 active:scale-95 transition-all disabled:bg-zinc-600"
                >
                  {compileStatus === 'compiling' ? 'กำลังคอมไพล์โค้ด...' : 'เริ่มต้นคอมไพล์โค้ด'}
                </button>
                <button
                  onClick={resetCompiler}
                  className="px-4 py-2 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl text-xs cursor-pointer active:scale-95 transition-all"
                >
                  ล้างข้อมูลรัน
                </button>
              </div>

              {/* Output log console */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[100px] font-mono text-[12px]">
                <div className="text-zinc-600 mb-2">// GCC compiler trace logs:</div>
                {compileLogs.length === 0 && <p className="text-zinc-600 italic">สเตตัสบอร์ด: Ready to Compile.</p>}
                
                <div className="space-y-1">
                  {compileLogs.map((log, i) => {
                    const isError = log.includes('❌') || log.includes('[ERROR]');
                    const isSuccess = log.includes('✓');
                    return (
                      <div 
                        key={i} 
                        className={`leading-relaxed animate-fadeIn
                          ${isError ? 'text-rose-400' : isSuccess ? 'text-emerald-400' : 'text-slate-400'}`}
                      >
                        {log}
                      </div>
                    );
                  })}
                </div>

                {compileStatus === 'success' && (
                  <div className="mt-4 p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-center justify-between animate-bounce">
                    <span className="font-sans text-xs">สร้างไฟล์สำเร็จ: result_program.exe</span>
                    <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-sans flex items-center gap-1 cursor-pointer">
                      <Download className="w-3.5 h-3.5" /> ดาวน์โหลดโปรแกรม
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 5 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-50/80 text-emerald-600 border border-emerald-100 shadow-inner group cursor-pointer">
              <Globe className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ตัวอย่างการใช้ Interpreter และ Compiler</h2>
              <p className="text-[15px] text-slate-500">กฎความเหมาะสมและกลุ่มภาษาคอมพิวเตอร์ยอดนิยมที่เลือกใช้อุปกรณ์ตัวแปรเฉพาะ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                แต่ละภาษาถูกกำหนดประเภทเครื่องแปลตามรูปแบบประยุกต์ใช้งาน 
                ภาษาที่เน้นการพัฒนาโปรเจกต์ขนาดเล็ก รันงานและเช็คผลลัพธ์ผ่านเว็บเบราว์เซอร์ได้ทันที มักจะเลือกใช้ระบบ **Interpreter**
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ขณะที่ระบบเซิร์ฟเวอร์ฐานราก หรือซอฟต์แวร์ประมวลผลความละเอียดสูงที่มีขั้นตอนมหาศาล 
                จะเลือกใช้ความมั่นคงของ **Compiler** เพื่อความสมบูรณ์แบบสูงสุดของผลลัพธ์
              </p>
            </div>

            {/* Language grid cards */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              <h3 className="font-semibold text-slate-900 mb-4 text-center text-sm">กลุ่มรายชื่อภาษากับเครื่องมือแปลประจำตัว</h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-[13px]">
                {c5Languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 border rounded-xl shadow-sm text-center font-bold flex flex-col justify-between hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer ${lang.color}`}
                  >
                    <div>{lang.name}</div>
                    <span className="text-[10px] mt-1 opacity-70 font-normal">{lang.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 6 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-50/80 text-emerald-600 border border-emerald-100 shadow-inner group cursor-pointer">
              <Sliders className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ความแตกต่างระหว่าง Interpreter และ Compiler</h2>
              <p className="text-[15px] text-slate-500">วิเคราะห์เปรียบเทียบในมิติความเร็ว การตรวจแก้ข้อผิดพลาด และสถาปัตยกรรมผลลัพธ์</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans mb-6">
              ตารางวิเคราะห์ความต่างแบบเจาะลึก เพื่อให้นักเรียนประเมินความสามารถของเครื่องมือแปลภาษาในการผลิตโปรแกรมจริง
            </p>

            {/* Custom Interactive Table Grid */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white/80">
              <div className="grid grid-cols-3 bg-slate-900 text-white font-bold text-xs p-4 border-b border-slate-200">
                <div>ตัวชี้วัดความต่าง</div>
                <div>อินเตอร์พรีเตอร์ (Interpreter)</div>
                <div>คอมไพเลอร์ (Compiler)</div>
              </div>

              <div className="divide-y divide-slate-100 text-xs leading-relaxed text-slate-700">
                {battleRows.map((row, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setC6ActiveRow(idx)}
                    onMouseLeave={() => setC6ActiveRow(null)}
                    className={`grid grid-cols-3 p-4 transition-all duration-200 cursor-pointer
                      ${c6ActiveRow === idx ? 'bg-emerald-50/30' : ''}`}
                  >
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {row.feature}
                    </div>
                    <div className="pr-4">{row.interpreter}</div>
                    <div>{row.compiler}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ใบงานปฏิบัติ: แกะรอยความแตกต่างเครื่องแปลภาษา"
          taskText={`โจทย์ปฏิบัติการตรวจจับเครื่องมือแปลภาษา (หน่วยที่ 1.3):
ให้นักเรียนวิเคราะห์การทำงานของ Interpreter และ Compiler และบันทึกคำตอบด้วยตนเอง

ข้อที่ 1: การวิเคราะห์กระบวนการค้นหาบั๊ก
สมมติว่านักเรียนเขียนโปรแกรม 10 บรรทัด โดยบรรทัดที่ 5 มีการคำนวณที่เขียนผิดไวยากรณ์ (Syntax Error)
- หากรันโปรแกรมนี้ผ่านตัวแปรภาษาแบบ Interpreter ผลลัพธ์การทำงานของโปรแกรมจะเป็นอย่างไร? (บรรทัดที่ 1-4 จะรันผ่านหรือไม่? และหยุดทำงานเมื่อใด?)
- หากรันโปรแกรมนี้ผ่าน Compiler เครื่องคอมพิวเตอร์จะทำอย่างไร? และนักเรียนจะพบบั๊กเมื่อใด?

ข้อที่ 2: การประยุกต์เลือกภาษา
- จงจัดกลุ่มภาษาคอมพิวเตอร์ต่อไปนี้: "Python, C++, Java, Rust, JavaScript, PHP" แยกเป็นกลุ่มเครื่องมือ Interpreter และ Compiler อย่างถูกต้อง
- และอธิบายเหตุผลว่าทำไมโปรแกรมเกม 3D ความเร็วสูงจึงควรใช้ภาษาที่ใช้คอมไพเลอร์ในการคอมไพล์งาน`}
        />

      </main>
    </div>
  );
}
