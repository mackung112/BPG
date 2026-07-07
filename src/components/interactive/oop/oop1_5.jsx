import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  AmbientBackdrop, 
  SimulatorShell, 
  SectionBlock, 
  ConceptCard 
} from '../shared';
import { 
  Terminal, 
  Play, 
  RefreshCcw, 
  CheckCircle2, 
  TerminalSquare,
  Keyboard,
  ArrowRight
} from 'lucide-react';

const OOP1_BLOBS = [
  { color: 'bg-orange-200', size: 'w-[45vw] h-[45vw]', position: '-top-10 -left-10', opacity: 'opacity-25' },
  { color: 'bg-amber-200',  size: 'w-[40vw] h-[40vw]', position: 'top-[20%] -right-10', opacity: 'opacity-20' },
  { color: 'bg-rose-200',   size: 'w-[42vw] h-[42vw]', position: 'bottom-[10%] -left-5', opacity: 'opacity-25' },
  { color: 'bg-yellow-200', size: 'w-[38vw] h-[38vw]', position: 'bottom-[-10%] right-[10%]', opacity: 'opacity-20' },
];

export default function oop1_5() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');

  const toggleTerminal = () => {
    setTerminalOpen(!terminalOpen);
    if (!terminalOpen && terminalLogs.length === 0) {
      setTerminalLogs([
        'Windows PowerShell',
        'Copyright (C) Microsoft Corporation. All rights reserved.',
        '',
        'PS D:\\12_john> '
      ]);
    }
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let output = [];
    output.push(`PS D:\\12_john> ${trimmed}`);

    if (trimmed === 'python student.py') {
      output.push('Student: Somchai, Age: 18');
      output.push('Student: Somsri, Age: 19');
    } else if (trimmed === 'clear' || trimmed === 'cls') {
      setTerminalLogs(['PS D:\\12_john> ']);
      setTerminalInput('');
      return;
    } else {
      output.push(`${trimmed} : The term '${trimmed}' is not recognized as the name of a cmdlet, function, script file, or operable program.`);
    }

    output.push('PS D:\\12_john> ');
    setTerminalLogs(prev => [...prev, ...output]);
    setTerminalInput('');
  };

  const handleShortcutCommand = (cmd) => {
    if (!terminalOpen) setTerminalOpen(true);
    handleCommand(cmd);
  };

  return (
    <div className="font-sans text-zinc-800 pb-24 relative">
      <AmbientBackdrop blobs={OOP1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        <SectionBlock
          title="การใช้งาน Integrated Terminal ใน VS Code"
          icon={<TerminalSquare className="w-6 h-6 text-orange-500" />}
          description="ลดความยุ่งยากในการสลับหน้าต่าง โดยการฝัง Command Prompt / PowerShell ไว้ในโปรแกรมแก้ไขโค้ด"
          variant="default"
          accent="orange"
        >
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              ในอดีต โปรแกรมเมอร์ต้องสลับหน้าต่างไปมาระหว่างโปรแกรมเขียนโค้ดกับโปรแกรม Command Line สีดำ เพื่อสั่งรันไฟล์ แต่ใน VS Code มีระบบ <span className="bg-orange-50/60 border border-orange-200/50 px-2.5 py-0.5 rounded-lg text-orange-700 font-semibold text-sm">Integrated Terminal</span> ที่ฝังเทอร์มินัลเอาไว้ในตัว ทำให้คุณสามารถสั่งรันโค้ด Python ได้ทันทีในหน้าจอเดียวกัน
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptCard 
                symbol="Shortcut"
                title="คีย์ลัด Ctrl + ~ (Grave Accent)"
                description="วิธีที่เร็วที่สุดในการเปิด/ปิดหน้าต่าง Terminal ด้านล่าง คือการกดปุ่ม Ctrl ค้างไว้พร้อมกับปุ่ม เปลี่ยนภาษา (~)"
                accent="rose"
              />
              <ConceptCard 
                symbol="Run Button"
                title="ปุ่ม Run (สามเหลี่ยมมุมขวาบน)"
                description="หากติดตั้งส่วนเสริม Python แล้ว จะปรากฏปุ่ม Play ที่มุมขวาบน เมื่อกดระบบจะเปิด Terminal และพิมพ์คำสั่งให้เราอัตโนมัติ"
                accent="amber"
              />
            </div>
          </div>

          <SimulatorShell
            title="ระบบจำลอง Integrated Terminal"
            accentBg="bg-rose-50/60"
            iconColor="text-rose-600"
            icon={<Terminal className="w-6 h-6 text-rose-600" />}
          >
            <div className="bg-[#1E1E1E] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col h-[500px] border border-slate-800">
              {/* Fake VS Code Header */}
              <div className="bg-[#333333] h-10 flex items-center px-4 justify-between select-none">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex gap-4 text-[#CCCCCC] text-xs font-sans">
                    <span className="cursor-pointer hover:text-white">File</span>
                    <span className="cursor-pointer hover:text-white">Edit</span>
                    <span className="cursor-pointer hover:text-white">Terminal</span>
                  </div>
                </div>
              </div>

              {/* Editor Split */}
              <div className="flex-1 flex flex-col relative">
                {/* Editor Area */}
                <div className="flex-1 bg-[#1E1E1E] p-5 flex flex-col relative">
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-4">
                    <span className="font-mono text-sm text-slate-300">student.py</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleShortcutCommand('python student.py')}
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-xs cursor-pointer bg-slate-800 px-2 py-1 rounded"
                        title="Run Python File"
                      >
                        <Play className="w-4 h-4 fill-current" /> Run
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-[13.5px] leading-relaxed text-[#D4D4D4] animate-fadeIn">
                    <div><span className="text-[#569CD6]">class</span> <span className="text-[#4EC9B0]">Student</span>:</div>
                    <div className="pl-4"><span className="text-[#569CD6]">def</span> <span className="text-[#DCDCAA]">__init__</span>(<span className="text-[#9CDCFE]">self</span>, <span className="text-[#9CDCFE]">name</span>, <span className="text-[#9CDCFE]">age</span>):</div>
                    <div className="pl-8"><span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">name</span> = <span className="text-[#9CDCFE]">name</span></div>
                    <div className="pl-8"><span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">age</span> = <span className="text-[#9CDCFE]">age</span></div>
                    <br/>
                    <div className="pl-4"><span className="text-[#569CD6]">def</span> <span className="text-[#DCDCAA]">display_info</span>(<span className="text-[#9CDCFE]">self</span>):</div>
                    <div className="pl-8"><span className="text-[#DCDCAA]">print</span>(<span className="text-[#CE9178]">f"Student: </span>{'{'}<span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">name</span>{'}'}<span className="text-[#CE9178]">, Age: </span>{'{'}<span className="text-[#9CDCFE]">self</span>.<span className="text-[#9CDCFE]">age</span>{'}'}<span className="text-[#CE9178]">"</span>)</div>
                    <br/>
                    <div><span className="text-[#9CDCFE]">s1</span> = <span className="text-[#4EC9B0]">Student</span>(<span className="text-[#CE9178]">"Somchai"</span>, <span className="text-[#B5CEA8]">18</span>)</div>
                    <div><span className="text-[#9CDCFE]">s2</span> = <span className="text-[#4EC9B0]">Student</span>(<span className="text-[#CE9178]">"Somsri"</span>, <span className="text-[#B5CEA8]">19</span>)</div>
                    <div><span className="text-[#9CDCFE]">s1</span>.<span className="text-[#DCDCAA]">display_info</span>()</div>
                    <div><span className="text-[#9CDCFE]">s2</span>.<span className="text-[#DCDCAA]">display_info</span>()</div>
                  </div>

                  {!terminalOpen && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                      <button 
                        onClick={toggleTerminal}
                        className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                      >
                        <Keyboard className="w-5 h-5" /> จำลองการกดคีย์ลัด Ctrl + ~
                      </button>
                    </div>
                  )}
                </div>

                {/* Terminal Panel */}
                {terminalOpen && (
                  <div className="h-[220px] bg-[#1E1E1E] border-t border-slate-700 flex flex-col animate-slideUp z-10">
                    <div className="flex px-4 py-1.5 text-xs font-sans text-slate-400 gap-6 uppercase tracking-widest border-b border-slate-800 select-none">
                      <span className="hover:text-white cursor-pointer">PROBLEMS</span>
                      <span className="hover:text-white cursor-pointer">OUTPUT</span>
                      <span className="text-white border-b border-rose-500 cursor-pointer">TERMINAL</span>
                      <span className="hover:text-white cursor-pointer">PORTS</span>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="text-rose-400 lowercase font-mono">powershell</span>
                        <span onClick={toggleTerminal} className="hover:text-rose-500 cursor-pointer">X</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-3 font-mono text-[13px] text-[#CCCCCC] overflow-y-auto no-scrollbar">
                      {terminalLogs.map((log, index) => {
                        if (log.startsWith('PS D:\\12_john>')) {
                          const parts = log.split('PS D:\\12_john>');
                          return (
                            <div key={index}>
                              <span className="text-[#5CE6CD]">PS D:\12_john&gt;</span>
                              <span>{parts[1]}</span>
                            </div>
                          );
                        } else if (log.includes('Student:')) {
                          return <div key={index} className="text-[#D4D4D4] font-bold">{log}</div>;
                        } else if (log.includes('not recognized')) {
                          return <div key={index} className="text-rose-500">{log}</div>;
                        }
                        return <div key={index} className="text-[#888888]">{log}</div>;
                      })}

                      {/* Active Input Line */}
                      {terminalLogs.length > 0 && terminalLogs[terminalLogs.length - 1] === 'PS D:\\12_john> ' && (
                        <div className="flex items-center">
                          <input 
                            autoFocus
                            type="text" 
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCommand(terminalInput);
                            }}
                            className="flex-1 bg-transparent border-none outline-none text-[#CCCCCC] focus:ring-0 p-0 ml-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Helper Panel */}
            <div className="mt-4 flex gap-3 flex-wrap">
              <button 
                disabled={!terminalOpen}
                onClick={() => handleCommand('python student.py')}
                className="px-4 py-2 bg-white/60 hover:bg-white text-slate-700 text-xs font-mono font-bold rounded-lg border border-slate-300 transition-colors disabled:opacity-50"
              >
                พิมพ์คำสั่ง: python student.py
              </button>
              <button 
                disabled={!terminalOpen}
                onClick={() => handleCommand('clear')}
                className="px-4 py-2 bg-white/60 hover:bg-white text-slate-700 text-xs font-mono font-bold rounded-lg border border-slate-300 transition-colors disabled:opacity-50"
              >
                ล้างหน้าจอ: clear
              </button>
            </div>

          </SimulatorShell>
        </SectionBlock>

        <TeacherTask
          title="ใบงานปฏิบัติ: การใช้งาน Terminal ในโปรแกรม"
          taskText={`ให้นักเรียนปฏิบัติเพื่อตรวจสอบความเข้าใจการทำงานของ Terminal ดังนี้:

1. เปิดไฟล์โปรเจกต์ Python ที่เราเขียนไว้ก่อนหน้าใน VS Code
2. ใช้คีย์บอร์ดลัด Ctrl + ~ (Control และ Grave Accent) เพื่อเปิดแผง Terminal ด้านล่าง
3. สังเกตที่บรรทัดคำสั่ง (Prompt) ว่ากำลังชี้พิกัดไปที่โฟลเดอร์โปรเจกต์ของเราหรือไม่ (เช่น D:\\12_john>)
4. พิมพ์คำสั่งรันไฟล์ เช่น 'python hello.py' (เปลี่ยนชื่อไฟล์ตามที่มีจริง)
5. ถ่ายภาพหน้าจอโปรแกรมที่แสดงโค้ดและผลลัพธ์ใน Terminal แบบชัดเจน ส่งในรายงาน`}
        />

      </main>
    </div>
  );
}
