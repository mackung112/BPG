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
  Search, 
  CheckCircle2, 
  Settings, 
  Cpu,
  Laptop,
  AlertTriangle,
  ChevronRight,
  Command,
  Monitor,
  Zap
} from 'lucide-react';

const OOP1_BLOBS = [
  { color: 'bg-orange-200', size: 'w-[45vw] h-[45vw]', position: '-top-10 -left-10', opacity: 'opacity-25' },
  { color: 'bg-amber-200',  size: 'w-[40vw] h-[40vw]', position: 'top-[20%] -right-10', opacity: 'opacity-20' },
  { color: 'bg-rose-200',   size: 'w-[42vw] h-[42vw]', position: 'bottom-[10%] -left-5', opacity: 'opacity-25' },
  { color: 'bg-yellow-200', size: 'w-[38vw] h-[38vw]', position: 'bottom-[-10%] right-[10%]', opacity: 'opacity-20' },
];

export default function oop1_4() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedInterpreter, setSelectedInterpreter] = useState(null); // null or string path

  const togglePalette = () => {
    setPaletteOpen(!paletteOpen);
    setSearchValue('');
  };

  const handleSelectInterpreter = (path) => {
    setSelectedInterpreter(path);
    setPaletteOpen(false);
  };

  return (
    <div className="font-sans text-zinc-800 pb-24 relative">
      <AmbientBackdrop blobs={OOP1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        <SectionBlock
          title="การตั้งค่า Python Interpreter"
          icon={<Cpu className="w-6 h-6 text-orange-500" />}
          description="บอก VS Code ให้รู้ว่า 'สมองกล' หรือตัวแปลภาษา Python ของเครื่องเราถูกติดตั้งไว้ที่ไหน"
          variant="default"
          accent="orange"
        >
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              บางครั้งในคอมพิวเตอร์หนึ่งเครื่องอาจมี Python ติดตั้งอยู่หลายเวอร์ชัน (เช่น 3.9, 3.10, 3.13) การกำหนด <span className="bg-orange-50/60 border border-orange-200/50 px-2.5 py-0.5 rounded-lg text-orange-700 font-semibold text-sm">Python Interpreter</span> คือการระบุให้ VS Code ทราบอย่างชัดเจนว่าจะให้ใช้ Python เวอร์ชันไหนในการรันโค้ด และใช้เวอร์ชันไหนในการวิเคราะห์และแสดงผล IntelliSense
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptCard 
                symbol="Command Palette"
                title="เรียกใช้งานผ่าน Command Palette"
                description="กดคีย์ลัด Ctrl + Shift + P เพื่อเปิดแถบคำสั่งลัดของ VS Code พิมพ์ค้นหา 'Python: Select Interpreter'"
                accent="amber"
              />
              <ConceptCard 
                symbol="Selection"
                title="การเลือกเวอร์ชันที่ถูกต้อง"
                description="เลือกเวอร์ชันที่เป็น Global (มักลงท้ายด้วยเส้นทาง AppData\Local\Programs\Python หรือ C:\Python)"
                accent="orange"
              />
            </div>
          </div>

          <SimulatorShell
            title="ระบบจำลองการเลือก Interpreter (Command Palette Mockup)"
            accentBg="bg-amber-50/60"
            iconColor="text-amber-600"
            icon={<Command className="w-6 h-6 text-amber-600" />}
          >
            <div className="bg-[#1E1E1E] rounded-2xl p-0 shadow-2xl relative overflow-hidden flex flex-col h-[480px]">
              {/* VS Code Header */}
              <div className="bg-[#333333] h-10 flex items-center px-4 justify-between select-none">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-[#CCCCCC] text-xs font-sans">Visual Studio Code</div>
                </div>
                <div className="flex-1 flex justify-center">
                  <button 
                    onClick={togglePalette}
                    className="bg-[#444444] hover:bg-[#555555] text-[#CCCCCC] text-xs px-24 py-1 rounded-md border border-[#555555] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" /> student.py - OOP_Project
                  </button>
                </div>
                <div className="w-20"></div>
              </div>

              {/* Main Editor Area */}
              <div className="flex-1 p-6 relative">
                <div className="font-mono text-[14px] leading-loose text-[#D4D4D4]">
                  <div><span className="text-[#569CD6]">print</span>(<span className="text-[#CE9178]">"Testing Python Interpreter"</span>)</div>
                  <div><span className="text-[#569CD6]">import</span> sys</div>
                  <div><span className="text-[#569CD6]">print</span>(sys.version)</div>
                </div>

                {/* Simulated Command Palette Overlay */}
                {paletteOpen && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] bg-[#252526] border border-[#454545] rounded-lg shadow-2xl mt-2 overflow-hidden z-20 animate-fadeIn">
                    <div className="flex items-center px-3 py-2 border-b border-[#454545]">
                      <span className="text-[#007ACC] font-mono mr-2">&gt;</span>
                      <input 
                        autoFocus
                        type="text" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Python: Select Interpreter"
                        className="w-full bg-transparent border-none text-[#CCCCCC] text-[13px] font-sans focus:outline-none focus:ring-0"
                      />
                    </div>
                    <div className="py-2 max-h-[300px] overflow-y-auto">
                      <div className="px-4 py-1 text-[11px] text-[#888888] font-bold tracking-wider mb-1">
                        PYTHON ENVIRONMENTS
                      </div>
                      
                      <div 
                        onClick={() => handleSelectInterpreter('Python 3.13.1')}
                        className="px-4 py-2 hover:bg-[#04395E] cursor-pointer flex flex-col group"
                      >
                        <div className="flex items-center gap-2 text-[#CCCCCC] text-[13px]">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <span>Python 3.13.1 64-bit</span>
                          {selectedInterpreter === 'Python 3.13.1' && <span className="ml-auto text-[10px] bg-[#0E639C] text-white px-2 py-0.5 rounded">Selected</span>}
                        </div>
                        <div className="text-[11px] text-[#888888] ml-6 group-hover:text-[#AAAAAA]">
                          C:\Users\KruMac\AppData\Local\Programs\Python\Python313\python.exe
                        </div>
                      </div>

                      <div 
                        onClick={() => handleSelectInterpreter('Python 3.10.8')}
                        className="px-4 py-2 hover:bg-[#04395E] cursor-pointer flex flex-col group"
                      >
                        <div className="flex items-center gap-2 text-[#CCCCCC] text-[13px]">
                          <Monitor className="w-4 h-4 text-slate-500" />
                          <span>Python 3.10.8 64-bit</span>
                          {selectedInterpreter === 'Python 3.10.8' && <span className="ml-auto text-[10px] bg-[#0E639C] text-white px-2 py-0.5 rounded">Selected</span>}
                        </div>
                        <div className="text-[11px] text-[#888888] ml-6 group-hover:text-[#AAAAAA]">
                          C:\Program Files\Python310\python.exe
                        </div>
                      </div>

                      <div 
                        onClick={() => handleSelectInterpreter('Python 3.9.0')}
                        className="px-4 py-2 hover:bg-[#04395E] cursor-pointer flex flex-col group"
                      >
                        <div className="flex items-center gap-2 text-[#CCCCCC] text-[13px]">
                          <Monitor className="w-4 h-4 text-slate-500" />
                          <span>Python 3.9.0 64-bit (Microsoft Store)</span>
                          {selectedInterpreter === 'Python 3.9.0' && <span className="ml-auto text-[10px] bg-[#0E639C] text-white px-2 py-0.5 rounded">Selected</span>}
                        </div>
                        <div className="text-[11px] text-[#888888] ml-6 group-hover:text-[#AAAAAA]">
                          C:\Users\KruMac\AppData\Local\Microsoft\WindowsApps\python.exe
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Helper UI to trigger Command Palette */}
                {!paletteOpen && !selectedInterpreter && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl flex flex-col items-center text-center max-w-md animate-pulse">
                    <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
                    <h4 className="text-amber-500 font-bold mb-2">ยังไม่ได้เลือก Interpreter</h4>
                    <p className="text-[#AAAAAA] text-[13px] mb-4">
                      คลิกที่แถบด้านบน (หรือจำลองการกด Ctrl+Shift+P) เพื่อเปิด Command Palette แล้วเลือก Python 3.13.1
                    </p>
                    <button onClick={togglePalette} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-bold transition-colors">
                      เปิด Command Palette (Ctrl+Shift+P)
                    </button>
                  </div>
                )}
              </div>

              {/* VS Code Status Bar */}
              <div className="bg-[#007ACC] h-6 flex items-center px-3 justify-between text-white text-[11px] font-sans">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 hover:bg-white/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
                    <span className="font-bold">{"><_"}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:bg-white/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors" onClick={togglePalette}>
                    {selectedInterpreter ? (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>{selectedInterpreter}</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />
                        <span className="text-yellow-100">Select Python Interpreter</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span>UTF-8</span>
                  <span>Python</span>
                </div>
              </div>
            </div>
            
            {selectedInterpreter && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-emerald-800 font-bold text-sm">การตั้งค่าสมบูรณ์!</h4>
                  <p className="text-emerald-600 text-xs mt-1 leading-relaxed">
                    สังเกตที่มุมซ้ายล่าง (Status Bar) จะปรากฏเวอร์ชันของ Python ที่เลือกไว้ 
                    การตั้งค่านี้จะถูกบันทึกไว้ในโฟลเดอร์ <code>.vscode/settings.json</code> ของโปรเจกต์
                  </p>
                </div>
              </div>
            )}
          </SimulatorShell>
        </SectionBlock>

        <TeacherTask
          title="ใบงานปฏิบัติ: การเลือก Python Interpreter"
          taskText={`ให้นักเรียนปฏิบัติตามขั้นตอนเพื่อเลือกตัวประมวลผลภาษา Python ให้กับโปรเจกต์:

1. เปิดโปรแกรม VS Code
2. กดคีย์บอร์ดลัด Ctrl + Shift + P
3. พิมพ์ค้นหาคำว่า "Python: Select Interpreter" แล้วกด Enter
4. เลือกเวอร์ชัน Python ที่เป็นแบบ Global (เช่น Python 3.13.1 64-bit) ที่แสดงเส้นทางพาธปกติ
5. บันทึกภาพหน้าจอโปรแกรม VS Code บริเวณ Status Bar (มุมซ้ายล่าง) ที่แสดงตัวเลขเวอร์ชัน Python ส่งเพื่อประเมินผล`}
        />

      </main>
    </div>
  );
}
