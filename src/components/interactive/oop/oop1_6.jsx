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
  Package, 
  DownloadCloud, 
  RefreshCcw,
  CheckCircle2,
  AlertTriangle,
  Server
} from 'lucide-react';

const OOP1_BLOBS = [
  { color: 'bg-orange-200', size: 'w-[45vw] h-[45vw]', position: '-top-10 -left-10', opacity: 'opacity-25' },
  { color: 'bg-amber-200',  size: 'w-[40vw] h-[40vw]', position: 'top-[20%] -right-10', opacity: 'opacity-20' },
  { color: 'bg-rose-200',   size: 'w-[42vw] h-[42vw]', position: 'bottom-[10%] -left-5', opacity: 'opacity-25' },
  { color: 'bg-yellow-200', size: 'w-[38vw] h-[38vw]', position: 'bottom-[-10%] right-[10%]', opacity: 'opacity-20' },
];

export default function oop1_6() {
  const [terminalLogs, setTerminalLogs] = useState([
    'PS D:\\12_john> '
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isInstalling, setIsInstalling] = useState(false);
  const [installedPackages, setInstalledPackages] = useState(['pip', 'setuptools']);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed || isInstalling) return;

    let output = [];
    output.push(`PS D:\\12_john> ${trimmed}`);
    setTerminalInput('');

    if (trimmed.startsWith('pip install ')) {
      const pkg = trimmed.replace('pip install ', '').trim();
      if (!pkg) {
        output.push('ERROR: You must give at least one requirement to install');
        output.push('PS D:\\12_john> ');
        setTerminalLogs(prev => [...prev, ...output]);
        return;
      }

      if (installedPackages.includes(pkg)) {
        output.push(`Requirement already satisfied: ${pkg} in c:\\users\\krumac\\appdata\\local\\programs\\python\\python313\\lib\\site-packages (2.6.0)`);
        output.push('PS D:\\12_john> ');
        setTerminalLogs(prev => [...prev, ...output]);
      } else {
        setIsInstalling(true);
        setTerminalLogs(prev => [...prev, ...output, `Collecting ${pkg}...`]);
        
        setTimeout(() => {
          setTerminalLogs(prev => [
            ...prev,
            `Downloading ${pkg}-latest-cp313-cp313-win_amd64.whl (12.4 MB)`
          ]);
          
          setTimeout(() => {
            setTerminalLogs(prev => [
              ...prev,
              `Installing collected packages: ${pkg}`,
              `Successfully installed ${pkg}-latest`
            ]);
            setInstalledPackages(prev => [...prev, pkg]);
            setIsInstalling(false);
            
            setTimeout(() => {
              setTerminalLogs(prev => [...prev, 'PS D:\\12_john> ']);
            }, 200);
          }, 1500);
        }, 1000);
      }
    } else if (trimmed === 'pip list') {
      output.push('Package    Version');
      output.push('---------- -------');
      installedPackages.forEach(p => {
        output.push(`${p.padEnd(10)} 1.0.0`);
      });
      output.push('PS D:\\12_john> ');
      setTerminalLogs(prev => [...prev, ...output]);
    } else if (trimmed === 'clear' || trimmed === 'cls') {
      setTerminalLogs(['PS D:\\12_john> ']);
    } else {
      output.push(`${trimmed} : The term '${trimmed}' is not recognized.`);
      output.push('PS D:\\12_john> ');
      setTerminalLogs(prev => [...prev, ...output]);
    }
  };

  const handleShortcutCommand = (cmd) => {
    handleCommand(cmd);
  };

  return (
    <div className="font-sans text-zinc-800 pb-24 relative">
      <AmbientBackdrop blobs={OOP1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        <SectionBlock
          title="การติดตั้งไลบรารีภายนอกด้วย pip"
          icon={<Package className="w-6 h-6 text-orange-500" />}
          description="การขยายขีดความสามารถของ Python โดยการดาวน์โหลดโมดูลและคลาสสำเร็จรูปจากนักพัฒนาทั่วโลก"
          variant="default"
          accent="orange"
        >
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              ในการเขียนโปรแกรมเชิงวัตถุเพื่อสร้างโปรเจกต์ขนาดใหญ่ เราไม่จำเป็นต้องสร้างทุกอย่างขึ้นมาเองจากศูนย์ ภาษา Python มีระบบจัดการแพ็กเกจที่เรียกว่า <span className="bg-orange-50/60 border border-orange-200/50 px-2.5 py-0.5 rounded-lg text-orange-700 font-semibold text-sm">pip (Package Installer for Python)</span> ซึ่งเป็นเครื่องมืออรรถประโยชน์ (Utility) สำหรับเชื่อมต่อกับเซิร์ฟเวอร์คลังข้อมูล PyPI (Python Package Index) เพื่อดาวน์โหลดไลบรารีต่างๆ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptCard 
                symbol="PyPI Server"
                title="Python Package Index"
                description="เปรียบเสมือน App Store ของภาษา Python ที่เก็บรวบรวมไลบรารีมากกว่า 500,000 โปรเจกต์ให้โหลดไปใช้งานฟรี"
                accent="amber"
              />
              <ConceptCard 
                symbol="Command Line"
                title="คำสั่ง pip install"
                description="สั่งงานผ่าน Terminal ง่ายๆ เพียงพิมพ์ 'pip install ตามด้วยชื่อไลบรารี' ระบบจะทำการโหลดและติดตั้งลงพิกัดให้อัตโนมัติ"
                accent="orange"
              />
            </div>
          </div>

          <SimulatorShell
            title="ระบบจำลองการทำงานของ Network Package Manager (pip)"
            accentBg="bg-amber-50/60"
            iconColor="text-amber-600"
            icon={<DownloadCloud className="w-6 h-6 text-amber-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Architecture Diagram */}
              <div className="lg:col-span-4 bg-white/60 backdrop-blur border border-slate-200 rounded-2xl p-5 flex flex-col justify-center items-center relative overflow-hidden">
                <h4 className="font-bold text-xs text-slate-400 mb-6 uppercase tracking-widest absolute top-4 left-5">Data Flow</h4>
                
                <div className="flex flex-col items-center mt-6 w-full space-y-4">
                  <div className="w-24 h-24 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col items-center justify-center shadow-inner relative">
                    <Server className="w-8 h-8 text-blue-500 mb-1" />
                    <span className="text-[10px] font-bold text-blue-700">PyPI Server</span>
                    {isInstalling && (
                      <div className="absolute -bottom-8 bg-blue-500 w-1.5 h-6 animate-pulse"></div>
                    )}
                  </div>

                  <div className="h-6 w-full flex justify-center relative">
                    {isInstalling ? (
                      <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200 animate-pulse">
                        <DownloadCloud className="w-3 h-3" /> Downloading
                      </div>
                    ) : (
                      <div className="w-1.5 h-full border-l-2 border-dashed border-slate-300"></div>
                    )}
                  </div>

                  <div className="w-full bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-slate-300 text-xs mb-3 font-mono font-bold">
                      <Terminal className="w-4 h-4 text-emerald-400" /> Your Computer
                    </div>
                    <div className="space-y-1.5 text-[10px] font-mono">
                      <div className="bg-slate-800 p-2 rounded border border-slate-700 text-slate-400 flex justify-between">
                        <span>python.exe</span>
                        <span>[Runtime]</span>
                      </div>
                      <div className="bg-slate-800 p-2 rounded border border-slate-700 text-amber-400 flex justify-between">
                        <span>pip.exe</span>
                        <span>[Manager]</span>
                      </div>
                      <div className="bg-slate-800 p-2 rounded border border-emerald-900/50 text-emerald-400 flex justify-between relative overflow-hidden">
                        <span className="relative z-10">site-packages/</span>
                        <span className="relative z-10">[{installedPackages.length} Pkgs]</span>
                        {isInstalling && <div className="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Simulator */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="bg-[#1E1E1E] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col h-[360px] border border-slate-800">
                  <div className="bg-[#333333] h-9 flex items-center px-4 justify-between select-none">
                    <div className="flex gap-4 items-center text-[#CCCCCC] text-[11px] font-sans">
                      <span className="uppercase tracking-widest font-bold">Terminal</span>
                    </div>
                    <div className="text-slate-400 text-xs font-mono">powershell</div>
                  </div>

                  <div className="flex-1 p-4 font-mono text-[13.5px] text-[#CCCCCC] overflow-y-auto no-scrollbar">
                    {terminalLogs.map((log, index) => {
                      if (log.startsWith('PS D:\\12_john>')) {
                        const parts = log.split('PS D:\\12_john>');
                        return (
                          <div key={index}>
                            <span className="text-[#5CE6CD]">PS D:\12_john&gt;</span>
                            <span>{parts[1]}</span>
                          </div>
                        );
                      } else if (log.includes('Successfully installed')) {
                        return <div key={index} className="text-[#4EC9B0]">{log}</div>;
                      } else if (log.includes('Requirement already satisfied')) {
                        return <div key={index} className="text-[#CE9178]">{log}</div>;
                      } else if (log.includes('ERROR:')) {
                        return <div key={index} className="text-rose-500">{log}</div>;
                      } else if (log.includes('Collecting') || log.includes('Downloading') || log.includes('Installing')) {
                        return <div key={index} className="text-[#9CDCFE]">{log}</div>;
                      }
                      return <div key={index} className="text-[#D4D4D4]">{log}</div>;
                    })}

                    {!isInstalling && terminalLogs.length > 0 && terminalLogs[terminalLogs.length - 1] === 'PS D:\\12_john> ' && (
                      <div className="flex items-center">
                        <input 
                          autoFocus
                          type="text" 
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCommand(terminalInput);
                          }}
                          disabled={isInstalling}
                          className="flex-1 bg-transparent border-none outline-none text-[#CCCCCC] focus:ring-0 p-0 ml-1 font-mono"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-orange-50/60 border border-orange-200/60 rounded-xl p-3 flex gap-2 flex-wrap">
                  <button 
                    disabled={isInstalling}
                    onClick={() => handleShortcutCommand('pip install pygame')}
                    className="px-4 py-2 bg-white hover:bg-orange-50 text-orange-700 text-[11px] font-mono font-bold rounded-lg border border-orange-200 shadow-sm transition-all disabled:opacity-50"
                  >
                    pip install pygame
                  </button>
                  <button 
                    disabled={isInstalling}
                    onClick={() => handleShortcutCommand('pip install requests')}
                    className="px-4 py-2 bg-white hover:bg-orange-50 text-orange-700 text-[11px] font-mono font-bold rounded-lg border border-orange-200 shadow-sm transition-all disabled:opacity-50"
                  >
                    pip install requests
                  </button>
                  <button 
                    disabled={isInstalling}
                    onClick={() => handleShortcutCommand('pip list')}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-mono font-bold rounded-lg border border-slate-200 shadow-sm transition-all disabled:opacity-50"
                  >
                    pip list (เช็ครายการ)
                  </button>
                </div>
              </div>
            </div>
          </SimulatorShell>
        </SectionBlock>

        <TeacherTask
          title="ใบงานปฏิบัติ: การติดตั้งไลบรารีสร้างเกม GUI"
          taskText={`วิชา OOP ในช่วงท้ายเทอมจะมีการประยุกต์ใช้คลาสเพื่อสร้างเกมด้วย Pygame ให้นักเรียนเตรียมความพร้อมของเครื่องดังนี้:

1. เปิด Terminal ใน VS Code (Ctrl + ~)
2. ตรวจสอบว่ามีอินเทอร์เน็ตเชื่อมต่ออยู่
3. พิมพ์คำสั่ง 'pip install pygame' แล้วกด Enter
4. รอจนกว่าระบบจะดาวน์โหลดและขึ้นข้อความ Successfully installed
5. พิมพ์คำสั่ง 'pip list' เพื่อตรวจสอบว่ารายชื่อไลบรารี pygame ปรากฏอยู่ในระบบ
6. บันทึกภาพหน้าจอ Terminal ขณะแสดงผลคำสั่ง pip list ส่งเพื่อยืนยันความพร้อม`}
        />

      </main>
    </div>
  );
}
