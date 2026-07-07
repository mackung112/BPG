import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  Cpu,
  Code,
  Layers,
  ArrowRight,
  Activity,
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
  Download,
  Info,
  ChevronRight,
  Settings
} from 'lucide-react';

export default function py1_5() {
  // ==========================================
  // 1. ดาวน์โหลดและติดตั้ง Python (Virtual Installer)
  // ==========================================
  const [installerStep, setInstallerStep] = useState('welcome'); // welcome, installing, success
  const [addPathChecked, setAddPathChecked] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [pathAlert, setPathAlert] = useState(false);

  const startInstallation = () => {
    if (!addPathChecked) {
      setPathAlert(true);
      return;
    }
    setPathAlert(false);
    setInstallerStep('installing');
    setInstallProgress(0);

    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setInstallerStep('success');
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const resetInstaller = () => {
    setInstallerStep('welcome');
    setAddPathChecked(false);
    setInstallProgress(0);
    setPathAlert(false);
  };

  // ==========================================
  // 2. การติดตั้ง IDE / VS Code Extension Simulator
  // ==========================================
  const [extensionStatus, setExtensionStatus] = useState('idle'); // idle, installing, installed
  const [extProgress, setExtProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [termState, setTermState] = useState('idle');

  const installExtension = () => {
    if (extensionStatus !== 'idle') return;
    setExtensionStatus('installing');
    setExtProgress(0);

    const interval = setInterval(() => {
      setExtProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExtensionStatus('installed');
          setTerminalLogs(['✓ Python Extension successfully loaded into VS Code Workspace.', '✓ Syntax highlighting enabled for *.py files.', '✓ PyLint Linter successfully initialized.']);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const resetExtension = () => {
    setExtensionStatus('idle');
    setExtProgress(0);
    setTerminalLogs([]);
    setTermState('idle');
  };

  const runTestCode = () => {
    if (extensionStatus !== 'installed') return;
    setTermState('running');
    setTimeout(() => {
      setTerminalLogs(old => [...old, '➔ py test_script.py', '  Output: "ยินดีต้อนรับการเขียนโค้ดใบงานหน่วยที่ 1.5"', '✓ [SUCCESS] Code executed with zero errors.']);
      setTermState('done');
    }, 600);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-rose-200 selection:text-rose-900 relative">

      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full bg-rose-200/40 blur-[160px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-pink-200/35 blur-[160px]"></div>
      </div>

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-6 md:space-y-8 relative z-10">

        {/* ----------------- Subtopic 1 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-rose-50/80 text-rose-600 border border-rose-100 shadow-inner group cursor-pointer">
              <Download className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">การดาวน์โหลดและติดตั้งตัวแปรภาษา Python</h2>
              <p className="text-[15px] text-slate-500">เรียนรู้ขั้นตอนการจองพื้นที่ตัวแปรและการเปิดสิทธิ์ให้เครื่องคอมพิวเตอร์รู้จักคำสั่งไพธอน</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ขั้นตอนการเริ่มขีดเขียนโปรเจกต์งานด้วยภาษา Python คือการเข้าเว็บหลัก **python.org** 
                แล้วดาวน์โหลดตัวติดตั้งติดตั้งประจำระบบปฏิบัติการ Windows หรือ macOS ของเครื่องนักเรียน
              </p>
              
              <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
                <h4 className="font-semibold text-rose-950 text-sm mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
                  กฎเหล็กวิกฤต: ทำเครื่องหมาย PATH!
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ในหน้าต่างต้อนรับติดตั้งครั้งแรก นักเรียน **จำเป็นต้องเช็คถูกช่อง "Add python.exe to PATH"** 
                  เพื่อเพิ่มตัวแปรตำแหน่งไฟล์ลงในระบบวินโดว์ มิฉะนั้นโปรแกรมสั่งการ Command Prompt จะไม่รู้จักตัวแปลภาษาไพธอนและแจ้งขัดข้องการสั่งรันงาน
                </p>
              </div>
            </div>

            {/* Virtual Windows Python Installer Simulator */}
            <div className="p-6 bg-slate-100 border border-slate-300 rounded-2xl shadow-2xl flex flex-col justify-between max-w-lg mx-auto w-full relative overflow-hidden">
              <div className="flex items-center justify-between bg-slate-800 text-white px-4 py-2 rounded-t-xl -mx-6 -mt-6 mb-4">
                <span className="text-[11px] font-mono font-bold flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5" /> Python 3.12.3 (64-bit) Setup
                </span>
                <span className="text-xs">✕</span>
              </div>

              {installerStep === 'welcome' && (
                <div className="space-y-4 font-sans text-xs text-slate-700 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900">Install Python 3.12.3 (64-bit)</h3>
                  <p className="leading-relaxed">Select Install Now to install Python with default settings, or choose Customize to select optional features.</p>
                  
                  {/* Big Install Button box */}
                  <div 
                    onClick={startInstallation}
                    className="p-3 bg-white border border-slate-300 rounded-lg hover:border-rose-500 hover:bg-rose-50/20 active:scale-[0.99] transition-all cursor-pointer flex gap-3 items-center shadow-sm"
                  >
                    <Settings className="w-7 h-7 text-rose-600" />
                    <div>
                      <div className="font-bold text-slate-950">Install Now</div>
                      <div className="text-[10px] text-slate-500">C:\Users\KruMac\AppData\Local\Programs\Python...</div>
                    </div>
                  </div>

                  {/* Add PATH check box block */}
                  <div className="pt-3 border-t border-slate-200">
                    <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-slate-950">
                      <input
                        type="checkbox"
                        checked={addPathChecked}
                        onChange={(e) => {
                          setAddPathChecked(e.target.checked);
                          if (e.target.checked) setPathAlert(false);
                        }}
                        className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                      />
                      <span className={`${pathAlert ? 'text-rose-600 animate-pulse font-bold' : ''}`}>
                        Add python.exe to PATH (สิทธิ์ตัวแปรระบบ)
                      </span>
                    </label>
                    
                    {pathAlert ? (
                      <p className="text-[10px] text-rose-600 font-bold mt-2 animate-fadeIn">
                        ⚠️ [เตือนภัยพิบัติ]: กรุณาติ๊กช่อง Add python.exe to PATH ก่อนเพื่อความปลอดภัยในการสั่งการ!
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1">จำเป็นสำหรับการป้อนรหัสสั่งการใน Command Prompt</p>
                    )}
                  </div>
                </div>
              )}

              {installerStep === 'installing' && (
                <div className="space-y-4 font-sans text-xs text-slate-700 py-6 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-950">Installing Progress...</h3>
                  <p className="text-slate-500">Standard libraries and pip packages are loading...</p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-rose-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${installProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-right font-mono text-[10px] font-bold text-rose-600">{installProgress}%</div>
                </div>
              )}

              {installerStep === 'success' && (
                <div className="space-y-4 font-sans text-xs text-slate-700 py-4 text-center animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-sm font-bold text-emerald-950">Setup was successful</h3>
                  <p className="leading-relaxed px-4">Python ได้รับการลงทะเบียนในระบบ PATH เรียบร้อยแล้ว สมองกล CPU พร้อมรับคำสั่งเขียนโค้ดของนักเรียน</p>
                  
                  <div className="pt-4">
                    <button 
                      onClick={resetInstaller}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl cursor-pointer active:scale-95 transition-all"
                    >
                      ลองติดตั้งใหม่อีกรอบ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 2 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-rose-50/80 text-rose-600 border border-rose-100 shadow-inner group cursor-pointer">
              <FileCode className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">การติดตั้งและใช้งาน IDE</h2>
              <p className="text-[15px] text-slate-500">ติดตั้งแผงควบคุมเขียนโค้ดและส่วนเสริมการไฮไลท์สีสัญลักษณ์ตรรกะแบบลื่นไหล</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                แม้จะเขียนไพธอนบน Notepad ทั่วไปได้ แต่การทำงานจะล่าช้า 
                เราจึงนิยมใช้โปรแกรมแก้ไขโค้ดทรงพลังระดับโลกอย่าง **Visual Studio Code (VS Code)** 
                ร่วมกับการติดตั้งส่วนเสริม **Python Extension (IDE Helper)**
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ตัวส่วนเสริม Extension จะคอยทำหน้าที่ไฮไลท์จับกลุ่มเฉดสีของโค้ดโปรแกรม 
                แจ้งจุดสะกดอักขระผิด และแนะนำคำสั่งอัจฉริยะ (IntelliSense) 
                ช่วยร่นระยะเวลาเขียนโปรแกรมได้มาก
              </p>
            </div>

            {/* VS Code Extension Manager Simulator */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-rose-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> VS Code Extension Manager
                </span>
                <span className="text-[10px] font-mono text-zinc-500">v1.88 Workspace</span>
              </div>

              {/* Sidebar layout mock */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white">Python extension (Microsoft)</h4>
                    <p className="text-[10px] text-zinc-500 font-sans">Rich support for Python language (Linter, Debugging)</p>
                  </div>
                  <div>
                    {extensionStatus === 'installed' ? (
                      <span className="text-[10px] bg-rose-950/30 border border-rose-500/30 text-rose-400 px-3 py-1 rounded font-bold">
                        ✓ INSTALLED
                      </span>
                    ) : (
                      <button
                        onClick={installExtension}
                        disabled={extensionStatus === 'installing'}
                        className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer active:scale-95 transition-all
                          ${extensionStatus === 'installing' 
                            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
                            : 'bg-rose-600 hover:bg-rose-700 text-white'}`}
                      >
                        {extensionStatus === 'installing' ? `${extProgress}% Loading` : 'INSTALL'}
                      </button>
                    )}
                  </div>
                </div>

                {extensionStatus === 'installing' && (
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-200"
                      style={{ width: `${extProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Virtual VS Code Terminal */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[110px] font-mono text-[12.5px] text-slate-400 relative">
                <div className="absolute top-2 right-4 text-[9px] text-zinc-600">// VS Code Output terminal</div>
                
                {extensionStatus === 'idle' && (
                  <p className="text-zinc-600 italic py-4 text-center">
                    [ รอการติดตั้งส่วนเสริม Python Extension ด้านบน... ]
                  </p>
                )}

                <div className="space-y-1.5">
                  {terminalLogs.map((log, i) => (
                    <div 
                      key={i} 
                      className={`leading-relaxed animate-fadeIn
                        ${log.includes('✓') ? 'text-emerald-400' : 'text-slate-300'}`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Console operations */}
              {extensionStatus === 'installed' && (
                <div className="flex gap-2 justify-between items-center">
                  <button
                    onClick={runTestCode}
                    disabled={termState === 'running'}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[11px] cursor-pointer active:scale-95 transition-all shadow-md shadow-emerald-600/10"
                  >
                    🚀 ลองรันชุดคำสั่ง Python ใน Terminal
                  </button>
                  <button
                    onClick={resetExtension}
                    className="text-[10px] text-zinc-500 hover:underline cursor-pointer font-bold"
                  >
                    ล้างสเตตัสการติดตั้ง
                  </button>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ใบงานปฏิบัติ: วิเคราะห์คุณลักษณะการติดตั้งและ IDE"
          taskText={`โจทย์ปฏิบัติงานการเตรียมตัวเขียนโค้ด (หน่วยที่ 1.5):
ให้นักเรียนระบุขั้นตอนและวิเคราะห์ประโยชน์ระบบคำสั่ง และบันทึกสรุปผลด้วยตนเอง

ข้อที่ 1: การติ๊กเลือก PATH สิทธิพิเศษของระบบ
จากจำลอง Windows Python Installer:
- จงอธิบายตามหลักตรรกะว่า หากนักเรียนลืมติ๊กเช็คถูกที่ช่อง "Add python.exe to PATH" ระหว่างการติดตั้ง จะเกิดข้อบกพร่องอย่างไรขึ้นเมื่อเปิด Command Prompt เพื่อป้อนคำสั่งพิมพ์ทดสอบรหัส
- และความสำคัญของ PATH มีหน้าที่ช่วยระบบปฏิบัติการ Windows อย่างไรบ้าง

ข้อที่ 2: วินิจฉัยพลังของส่วนเสริม Extension
- ในการจำลองติดตั้งส่วนเสริม VS Code Python Extension ให้นักเรียนสรุปขีดความสามารถช่วยเหลือ 2 ด้านหลัก (เช่น การเน้นสี Syntax หรือ Linter) ว่าช่วยอำนวยความสะดวกต่อนักเขียนโปรแกรมอย่างไรบ้าง`}
        />

      </main>
    </div>
  );
}
