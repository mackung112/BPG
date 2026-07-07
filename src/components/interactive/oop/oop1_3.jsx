import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  AmbientBackdrop, 
  SimulatorShell, 
  SectionBlock, 
  ConceptCard 
} from '../shared';
import { 
  Blocks, 
  Terminal, 
  Search, 
  CheckCircle2, 
  Settings, 
  Zap,
  Code2,
  FileCode,
  Download
} from 'lucide-react';

const OOP1_BLOBS = [
  { color: 'bg-orange-200', size: 'w-[45vw] h-[45vw]', position: '-top-10 -left-10', opacity: 'opacity-25' },
  { color: 'bg-amber-200',  size: 'w-[40vw] h-[40vw]', position: 'top-[20%] -right-10', opacity: 'opacity-20' },
  { color: 'bg-rose-200',   size: 'w-[42vw] h-[42vw]', position: 'bottom-[10%] -left-5', opacity: 'opacity-25' },
  { color: 'bg-yellow-200', size: 'w-[38vw] h-[38vw]', position: 'bottom-[-10%] right-[10%]', opacity: 'opacity-20' },
];

export default function oop1_3() {
  const [extensionStatus, setExtensionStatus] = useState('idle'); // idle, installing, installed
  const [extProgress, setExtProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [codeMode, setCodeMode] = useState('plain'); // plain, highlighted

  const installExtension = () => {
    if (extensionStatus !== 'idle') return;
    setExtensionStatus('installing');
    setExtProgress(0);

    const interval = setInterval(() => {
      setExtProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExtensionStatus('installed');
          setTerminalLogs([
            '[System]: Python Extension successfully installed and activated.',
            '[Linter]: Pylint initialized. Checking for syntax errors...',
            '[IntelliSense]: Autocomplete engine is now ready for OOP coding.'
          ]);
          setCodeMode('highlighted');
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  const resetExtension = () => {
    setExtensionStatus('idle');
    setExtProgress(0);
    setTerminalLogs([]);
    setCodeMode('plain');
  };

  return (
    <div className="font-sans text-zinc-800 pb-24 relative">
      <AmbientBackdrop blobs={OOP1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        <SectionBlock
          title="การติดตั้ง Python Extension ใน VS Code"
          icon={<Blocks className="w-6 h-6 text-orange-500" />}
          description="เสริมประสิทธิภาพให้กับโปรแกรม VS Code เพื่อให้รู้จักและเข้าใจภาษา Python อย่างลึกซึ้ง"
          variant="default"
          accent="orange"
        >
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              โดยค่าเริ่มต้น (Default) VS Code เป็นเพียงโปรแกรมแก้ไขข้อความธรรมดา (Text Editor) หากเราต้องการใช้เขียนโปรแกรมเชิงวัตถุ (OOP) ด้วยภาษา Python เราจำเป็นต้องติดตั้ง <span className="bg-orange-50/60 border border-orange-200/50 px-2.5 py-0.5 rounded-lg text-orange-700 font-semibold text-sm">Python Extension</span> ที่พัฒนาโดย Microsoft ซึ่งจะเปรียบเสมือนการ "มอบสมองกล" ให้ VS Code สามารถตรวจสอบความถูกต้องของโค้ดและแนะนำคำสั่งได้
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptCard 
                symbol="Highlighting"
                title="Syntax Highlighting"
                description="เปลี่ยนโค้ดสีขาวดำให้มีสีสันแยกตามประเภท เช่น คลาส ตัวแปร ฟังก์ชัน ช่วยให้อ่านและค้นหาจุดผิดได้ง่ายขึ้น"
                accent="rose"
              />
              <ConceptCard 
                symbol="IntelliSense"
                title="IntelliSense (ผู้ช่วยอัจฉริยะ)"
                description="ระบบคาดเดาและแนะนำคำสั่งอัตโนมัติ (Auto-complete) ลดข้อผิดพลาดจากการพิมพ์ผิดและทำงานได้รวดเร็วขึ้น"
                accent="amber"
              />
            </div>
          </div>

          <SimulatorShell
            title="ระบบจำลองส่วนขยาย (VS Code Extension Marketplace)"
            accentBg="bg-orange-50/60"
            iconColor="text-orange-600"
            icon={<Blocks className="w-6 h-6 text-orange-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Panel: Extension Manager */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl flex flex-col justify-between relative text-slate-300">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                  <span className="font-mono text-[11px] text-orange-400 flex items-center gap-1.5 font-bold tracking-widest">
                    <Search className="w-3.5 h-3.5" /> EXTENSIONS
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-4 shadow-inner">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
                      <Code2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-white">Python</h4>
                          <p className="text-[10px] text-slate-500 font-sans mt-0.5">Microsoft</p>
                        </div>
                        <div>
                          {extensionStatus === 'installed' ? (
                            <span className="text-[10px] bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Installed
                            </span>
                          ) : (
                            <button
                              onClick={installExtension}
                              disabled={extensionStatus === 'installing'}
                              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all active:scale-95 shadow
                                ${extensionStatus === 'installing' 
                                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                                  : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                            >
                              {extensionStatus === 'installing' ? `Installing ${extProgress}%` : 'Install'}
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        IntelliSense (Pylance), Linting, Debugging (multi-threaded, remote), Jupyter Notebooks, code formatting, refactoring, unit tests, and more.
                      </p>
                      
                      {extensionStatus === 'installing' && (
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3 shadow-inner">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all duration-200"
                            style={{ width: `${extProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex-1 font-mono text-[11px] text-slate-400 relative">
                  <span className="absolute top-2 right-4 text-[9px] text-zinc-600 font-bold tracking-widest">OUTPUT</span>
                  {extensionStatus === 'idle' && (
                    <div className="flex h-full items-center justify-center text-slate-600 italic">
                      [ รอการติดตั้งส่วนเสริม Python... ]
                    </div>
                  )}
                  <div className="space-y-1.5 mt-4">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed animate-fadeIn text-emerald-400">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
                
                {extensionStatus === 'installed' && (
                  <div className="mt-3 text-right">
                    <button onClick={resetExtension} className="text-[10px] text-slate-500 hover:text-slate-300 font-bold hover:underline cursor-pointer">
                      รีเซ็ตค่าติดตั้ง
                    </button>
                  </div>
                )}
              </div>

              {/* Right Panel: Code Editor Effect Comparison */}
              <div className="bg-[#1E1E1E] border border-slate-700 rounded-2xl p-5 shadow-2xl flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                  <FileCode className="w-4 h-4 text-slate-400" />
                  <span className="font-mono text-xs text-slate-300">student.py</span>
                  {codeMode === 'highlighted' && (
                    <span className="ml-auto text-[10px] bg-rose-950/50 text-rose-400 px-2 py-0.5 rounded border border-rose-900/50 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Syntax Active
                    </span>
                  )}
                </div>

                <div className="flex-1 font-mono text-[13px] leading-[1.7]">
                  {codeMode === 'plain' ? (
                    <div className="text-[#D4D4D4] opacity-80">
                      <div>class Student:</div>
                      <div className="pl-4">def __init__(self, name, age):</div>
                      <div className="pl-8">self.name = name</div>
                      <div className="pl-8">self.age = age</div>
                      <br/>
                      <div className="pl-4">def display_info(self):</div>
                      <div className="pl-8">print(f"Student: {'{'}self.name{'}'}, Age: {'{'}self.age{'}'}")</div>
                      <br/>
                      <div>s1 = Student("Somchai", 18)</div>
                      <div>s1.display_info()</div>
                    </div>
                  ) : (
                    <div className="animate-fadeIn">
                      <div><span className="text-[#569CD6]">class</span> <span className="text-[#4EC9B0]">Student</span>:</div>
                      <div className="pl-4"><span className="text-[#569CD6]">def</span> <span className="text-[#DCDCAA]">__init__</span>(<span className="text-[#9CDCFE]">self</span>, <span className="text-[#9CDCFE]">name</span>, <span className="text-[#9CDCFE]">age</span>):</div>
                      <div className="pl-8"><span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">name</span> = <span className="text-[#9CDCFE]">name</span></div>
                      <div className="pl-8"><span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">age</span> = <span className="text-[#9CDCFE]">age</span></div>
                      <br/>
                      <div className="pl-4"><span className="text-[#569CD6]">def</span> <span className="text-[#DCDCAA]">display_info</span>(<span className="text-[#9CDCFE]">self</span>):</div>
                      <div className="pl-8"><span className="text-[#DCDCAA]">print</span>(<span className="text-[#CE9178]">f"Student: </span>{'{'}<span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">name</span>{'}'}<span className="text-[#CE9178]">, Age: </span>{'{'}<span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">age</span>{'}'}<span className="text-[#CE9178]">"</span>)</div>
                      <br/>
                      <div><span className="text-[#9CDCFE]">s1</span> = <span className="text-[#4EC9B0]">Student</span>(<span className="text-[#CE9178]">"Somchai"</span>, <span className="text-[#B5CEA8]">18</span>)</div>
                      <div><span className="text-[#9CDCFE]">s1</span>.<span className="text-[#DCDCAA]">display_info</span>()</div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-[#2D2D2D] rounded-lg border border-[#3E3E3E] text-xs text-[#CCCCCC]">
                  {codeMode === 'plain' ? (
                    <p>โค้ดไม่มีการแยกสี ทำให้อ่านโครงสร้าง Class และ Method ได้ยาก และไม่มีระบบแจ้งเตือนข้อผิดพลาด</p>
                  ) : (
                    <p className="text-[#4EC9B0] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      ส่วนเสริมทำงานแล้ว! แยกสีคลาส (สีเขียวฟ้า) เมธอด (สีเหลือง) และข้อความ (สีส้ม) อย่างชัดเจน
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SimulatorShell>
        </SectionBlock>

        <TeacherTask
          title="ใบงานปฏิบัติ: การติดตั้งส่วนเสริม Python"
          taskText={`ให้นักเรียนปฏิบัติการตั้งค่าสภาพแวดล้อมโปรแกรม VS Code ดังนี้:

1. เปิดโปรแกรม VS Code ไปที่เมนู Extensions (หรือกดคีย์ลัด Ctrl+Shift+X)
2. ค้นหาคำว่า "Python" และเลือกติดตั้งส่วนเสริมที่พัฒนาโดย "Microsoft"
3. เมื่อติดตั้งเสร็จ ให้สร้างไฟล์ใหม่ชื่อ test.py แล้วลองพิมพ์คำสั่ง print("Hello OOP")
4. บันทึกภาพหน้าจอขณะที่โค้ดในไฟล์ test.py มีการเปลี่ยนสี (Syntax Highlighting) ส่งลงในรายงาน`}
        />

      </main>
    </div>
  );
}
