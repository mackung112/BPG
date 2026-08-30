import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  ShieldAlert, 
  Terminal, 
  Search, 
  HardDrive, 
  Activity, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShieldCheck,
  Play,
  FileSearch,
  Zap,
  RotateCcw
} from 'lucide-react';

export default function os11_1() {
  const [activeTab, setActiveTab] = useState(0);
  
  // Tab 1: UAC Simulator
  const [uacState, setUacState] = useState('idle'); // idle, user_cmd, admin_prompt, admin_cmd
  
  // Tab 2: SFC Simulator
  const [sfcProgress, setSfcProgress] = useState(0);
  const [sfcState, setSfcState] = useState('idle'); // idle, running, complete
  
  // Tab 3: Analyzer
  const [selectedResult, setSelectedResult] = useState(null);
  
  // Tab 4: CHKDSK
  const [chkdskStage, setChkdskStage] = useState(0);
  const [chkdskLogs, setChkdskLogs] = useState([]);
  const [chkdskState, setChkdskState] = useState('idle');
  
  // Tab 5: Task Manager
  const [cpuUsage, setCpuUsage] = useState(85);
  const [memoryUsage, setMemoryUsage] = useState(92);
  const [diskUsage, setDiskUsage] = useState(10);
  const [processes, setProcesses] = useState([
    { id: 1, name: 'System Idle Process', cpu: 10, memory: 8, status: 'Running' },
    { id: 2, name: 'Google Chrome', cpu: 15, memory: 450, status: 'Running' },
    { id: 3, name: 'UnknownMiner.exe', cpu: 60, memory: 800, status: 'High Resource' }
  ]);
  const [taskManagerState, setTaskManagerState] = useState('running');

  // --- Tab 2: SFC Logic ---
  useEffect(() => {
    let interval;
    if (sfcState === 'running') {
      interval = setInterval(() => {
        setSfcProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setSfcState('complete');
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [sfcState]);

  // --- Tab 4: CHKDSK Logic ---
  useEffect(() => {
    if (chkdskState === 'running') {
      const stages = [
        "Stage 1: Examining basic file system structure...",
        "Stage 2: Examining file name linkage...",
        "Stage 3: Examining security descriptors...",
        "Stage 4: Looking for bad clusters in user file data...",
        "Stage 5: Looking for bad, free clusters...",
        "Windows has scanned the file system and found no problems."
      ];
      
      let currentStage = 0;
      setChkdskLogs([stages[0]]);
      
      const interval = setInterval(() => {
        currentStage++;
        if (currentStage < stages.length) {
          setChkdskLogs(prev => [...prev, stages[currentStage]]);
          setChkdskStage(currentStage);
        } else {
          clearInterval(interval);
          setChkdskState('complete');
        }
      }, 1200);
      
      return () => clearInterval(interval);
    }
  }, [chkdskState]);

  // --- Tab 5: Task Manager Logic ---
  useEffect(() => {
    let interval;
    if (taskManagerState === 'running') {
      interval = setInterval(() => {
        setCpuUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
        setMemoryUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
      }, 1000);
    } else {
      setCpuUsage(15);
      setMemoryUsage(45);
    }
    return () => clearInterval(interval);
  }, [taskManagerState]);

  const endMalwareProcess = () => {
    setProcesses(prev => prev.filter(p => p.id !== 3));
    setTaskManagerState('resolved');
  };

  const tabs = [
    { id: 0, title: 'UAC & Admin', icon: <ShieldAlert size={18} /> },
    { id: 1, title: 'SFC Scanner', icon: <Terminal size={18} /> },
    { id: 2, title: 'Scan Analyzer', icon: <Search size={18} /> },
    { id: 3, title: 'Check Disk', icon: <HardDrive size={18} /> },
    { id: 4, title: 'Task Manager', icon: <Activity size={18} /> }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Layer 1: Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Layer 3: Main Content & Simulator */}
      <main className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-16 sm:pb-20 space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* Theory Section */}
        <section className="space-y-4 sm:space-y-6">
          <div className="border-b border-zinc-200/80 pb-3 sm:pb-4">
            <span className="text-xs sm:text-sm font-bold text-indigo-600 tracking-wider uppercase">
              System Repair Utilities
            </span>
            <h3 className="text-xl sm:text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โปรแกรมยูทิลิตี้สำหรับการวิเคราะห์และซ่อมแซมไฟล์ระบบพื้นฐาน
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 sm:p-6 border-l-[4px] border-l-indigo-500 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 shadow-inner shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-800">1. UAC & Administrator Mode</h4>
              </div>
              <p className="text-slate-600 text-sm sm:text-[16px] leading-relaxed">
                การรันคำสั่งแก้ไขระบบจำเป็นต้องใช้สิทธิ์สูงสุด (Administrator) โดยระบบ Windows จะใช้ <strong>UAC (User Account Control)</strong> เพื่อป้องกันโปรแกรมแปลกปลอมทำงานโดยพลการ
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 sm:p-6 border-l-[4px] border-l-cyan-500 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-50/80 text-cyan-600 shadow-inner shrink-0">
                  <Terminal size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-800">2. SFC (System File Checker)</h4>
              </div>
              <p className="text-slate-600 text-sm sm:text-[16px] leading-relaxed">
                คำสั่ง <code>sfc /scannow</code> ใช้ตรวจสอบและซ่อมแซมไฟล์ระบบที่สูญหายหรือเสียหาย โดยเปรียบเทียบกับไฟล์ต้นฉบับใน Windows Component Store
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 sm:p-6 border-l-[4px] border-l-orange-500 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-orange-50/80 text-orange-600 shadow-inner shrink-0">
                  <Search size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-800">3. Log Analysis</h4>
              </div>
              <p className="text-slate-600 text-sm sm:text-[16px] leading-relaxed">
                การอ่านผลลัพธ์หลังสแกน SFC มี 4 รูปแบบ หากซ่อมไม่ได้ ระบบจะบันทึกรายละเอียดความผิดปกติไว้ที่ไฟล์ <code>CBS.log</code> เสมอ
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 sm:p-6 border-l-[4px] border-l-emerald-500 hover:-translate-y-1 transition-all duration-300 lg:col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/80 text-emerald-600 shadow-inner shrink-0">
                  <HardDrive size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-800">4. Check Disk (CHKDSK)</h4>
              </div>
              <p className="text-slate-600 text-sm sm:text-[16px] leading-relaxed">
                ใช้คำสั่ง <code>chkdsk C: /f /r</code> เพื่อค้นหาและซ่อมแซม Bad Sector บนฮาร์ดดิสก์ พร้อมพยายามกู้คืนข้อมูลที่อ่านไม่ได้กลับมา
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 sm:p-6 border-l-[4px] border-l-blue-500 hover:-translate-y-1 transition-all duration-300 lg:col-span-2 md:col-span-2">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50/80 text-blue-600 shadow-inner shrink-0">
                  <Activity size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-800">5. Task Manager Monitor</h4>
              </div>
              <p className="text-slate-600 text-sm sm:text-[16px] leading-relaxed">
                การใช้ <code>Ctrl+Shift+Esc</code> วิเคราะห์กราฟประมวลผล (CPU, RAM, Disk) เพื่อค้นหาโปรแกรมที่ใช้ทรัพยากรผิดปกติ และจัดการหยุดการทำงาน (End Task)
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Simulator Section */}
        <section className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header & Tabs */}
          <div className="border-b border-white/10 bg-black/20 p-3.5 sm:p-4">
            <h4 className="text-white font-semibold flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base">
              <Zap size={18} className="text-indigo-400 shrink-0" />
              Interactive Diagnostic Studio
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer min-h-[40px] ${
                    activeTab === idx 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Simulator Content Area */}
          <div className="p-3.5 sm:p-6 md:p-8 min-h-[360px] sm:min-h-[400px]">
            {/* Mode 1: UAC Simulator */}
            {activeTab === 0 && (
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="w-full md:w-1/3 space-y-3 sm:space-y-4">
                  <p className="text-slate-300 text-xs sm:text-[16px]">ทดลองเปิด Command Prompt ทั้ง 2 โหมด เพื่อดูความแตกต่างของสิทธิ์การใช้งาน</p>
                  
                  <button 
                    onClick={() => setUacState('user_cmd')}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-left transition-all cursor-pointer min-h-[44px]"
                  >
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">เปิดแบบปกติ (User)</h5>
                      <span className="text-slate-400 text-[11px] sm:text-sm">รันด้วยสิทธิ์ผู้ใช้ทั่วไป</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-500 shrink-0" />
                  </button>

                  <button 
                    onClick={() => setUacState('admin_prompt')}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-indigo-900/40 border border-indigo-500/50 hover:border-indigo-400 text-left transition-all cursor-pointer min-h-[44px]"
                  >
                    <div>
                      <h5 className="text-indigo-300 font-medium text-xs sm:text-sm">เปิดแบบ Admin</h5>
                      <span className="text-slate-400 text-[11px] sm:text-sm">รันด้วยสิทธิ์ผู้ดูแลระบบ</span>
                    </div>
                    <ShieldCheck size={18} className="text-indigo-400 shrink-0" />
                  </button>
                  
                  <button 
                    onClick={() => setUacState('idle')}
                    className="w-full text-center py-2.5 text-slate-500 hover:text-white text-xs sm:text-sm cursor-pointer transition-colors min-h-[40px] flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw size={16} /> รีเซ็ต
                  </button>
                </div>

                <div className="w-full md:w-2/3 flex items-center justify-center bg-black/30 rounded-xl border border-white/5 p-3 sm:p-4 relative min-h-[220px]">
                  {uacState === 'idle' && (
                    <div className="text-slate-500 text-center py-6">
                      <Terminal size={40} className="mx-auto mb-3 opacity-50" />
                      <p className="text-xs sm:text-sm">เลือกโหมดเพื่อจำลองการเปิดโปรแกรม</p>
                    </div>
                  )}

                  {uacState === 'user_cmd' && (
                    <div className="w-full h-full bg-black text-slate-300 font-mono text-xs sm:text-sm p-3.5 sm:p-4 rounded-lg overflow-x-auto">
                      <div>Microsoft Windows [Version 10.0.19045.3803]</div>
                      <div>(c) Microsoft Corporation. All rights reserved.</div>
                      <br/>
                      <div className="text-emerald-400 break-words">C:\Users\Student&gt; sfc /scannow</div>
                      <div className="text-red-400 mt-2 break-words">You must be an administrator running a console session in order to use the sfc utility.</div>
                    </div>
                  )}

                  {uacState === 'admin_prompt' && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl p-2 sm:p-4">
                      <div className="bg-slate-200 w-full max-w-[400px] mx-2 sm:mx-4 p-4 sm:p-6 rounded-lg shadow-2xl border-t-[6px] border-yellow-500">
                        <div className="flex gap-3 sm:gap-4">
                          <ShieldAlert size={36} className="text-yellow-600 shrink-0" />
                          <div>
                            <h3 className="text-slate-900 font-medium text-base sm:text-lg">User Account Control</h3>
                            <p className="text-slate-700 text-xs sm:text-sm mt-1 mb-4">Do you want to allow this app to make changes to your device?</p>
                            <p className="font-bold text-slate-900 text-xs sm:text-sm">Windows Command Processor</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 sm:gap-3 mt-4">
                          <button onClick={() => setUacState('admin_cmd')} className="px-5 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium cursor-pointer min-h-[40px] text-xs sm:text-sm">Yes</button>
                          <button onClick={() => setUacState('idle')} className="px-5 sm:px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded font-medium cursor-pointer min-h-[40px] text-xs sm:text-sm">No</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {uacState === 'admin_cmd' && (
                    <div className="w-full h-full bg-black text-slate-300 font-mono text-xs sm:text-sm p-3.5 sm:p-4 rounded-lg overflow-x-auto">
                      <div className="bg-white text-black px-2 inline-block mb-2 font-bold text-[10px] sm:text-xs">Administrator: Command Prompt</div>
                      <div>Microsoft Windows [Version 10.0.19045.3803]</div>
                      <br/>
                      <div className="text-emerald-400 break-words">C:\Windows\System32&gt; _</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mode 2: SFC Scanner */}
            {activeTab === 1 && (
              <div className="flex flex-col h-full gap-4">
                <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 mb-2">
                  <button 
                    onClick={() => { setSfcState('running'); setSfcProgress(0); }}
                    disabled={sfcState === 'running'}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all min-h-[44px] text-xs sm:text-sm ${
                      sfcState === 'running' 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer hover:shadow-lg'
                    }`}
                  >
                    <Play size={18} /> รันคำสั่ง sfc /scannow
                  </button>
                  {sfcState === 'complete' && (
                    <button 
                      onClick={() => { setSfcState('idle'); setSfcProgress(0); }}
                      className="px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium cursor-pointer min-h-[44px] flex items-center gap-1.5"
                    >
                      <RotateCcw size={18} />
                    </button>
                  )}
                </div>

                <div className="bg-black text-slate-300 font-mono text-xs sm:text-sm p-3.5 sm:p-6 rounded-xl flex-grow h-[300px] overflow-x-auto overflow-y-auto">
                  <div>C:\Windows\System32&gt; {sfcState !== 'idle' && 'sfc /scannow'}</div>
                  
                  {sfcState !== 'idle' && (
                    <div className="mt-4 text-slate-400">
                      <div>Beginning system scan. This process will take some time.</div>
                      <br/>
                      <div>Beginning verification phase of system scan.</div>
                      <div className="mt-2 text-indigo-300">
                        Verification {sfcProgress}% complete.
                      </div>
                      
                      {/* Progress Bar ASCII */}
                      <div className="mt-2 text-slate-600 whitespace-pre">
                        [{Array.from({length: 40}).map((_, i) => (i < (sfcProgress/100)*40 ? '=' : ' ')).join('')}]
                      </div>
                    </div>
                  )}

                  {sfcState === 'complete' && (
                    <div className="mt-4 text-emerald-400 font-bold leading-relaxed break-words">
                      Windows Resource Protection found corrupt files and successfully repaired them.<br/>
                      For online repairs, details are included in the CBS log file located at<br/>
                      windir\Logs\CBS\CBS.log.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mode 3: Analyzer */}
            {activeTab === 2 && (
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                <div className="w-full md:w-1/2 space-y-2.5 sm:space-y-3">
                  <h5 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">ผลลัพธ์จากการสแกน 4 รูปแบบ</h5>
                  
                  {[
                    { id: 'ok', title: '1. ไม่พบไฟล์เสียหาย', desc: 'did not find any integrity violations.', color: 'border-emerald-500/50' },
                    { id: 'fixed', title: '2. พบและซ่อมแซมสำเร็จ', desc: 'found corrupt files and successfully repaired them.', color: 'border-blue-500/50' },
                    { id: 'fail', title: '3. พบแต่ซ่อมแซมไม่ได้', desc: 'found corrupt files but was unable to fix some of them.', color: 'border-red-500/50' },
                    { id: 'error', title: '4. ระบบไม่สามารถสแกนได้', desc: 'could not perform the requested operation.', color: 'border-orange-500/50' }
                  ].map((res) => (
                    <button
                      key={res.id}
                      onClick={() => setSelectedResult(res.id)}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all cursor-pointer min-h-[44px] ${
                        selectedResult === res.id 
                          ? `bg-slate-800 border-white/40 shadow-lg` 
                          : `bg-black/20 ${res.color} hover:bg-slate-800/50`
                      }`}
                    >
                      <h6 className="text-white font-medium text-xs sm:text-[15px]">{res.title}</h6>
                      <p className="text-slate-400 text-[11px] sm:text-xs mt-1 italic break-words">"...{res.desc}"</p>
                    </button>
                  ))}
                </div>

                <div className="w-full md:w-1/2 bg-slate-800/80 rounded-xl border border-white/10 p-4 sm:p-6 flex items-center justify-center min-h-[200px]">
                  {!selectedResult && (
                    <div className="text-slate-500 text-center py-4">
                      <FileSearch size={40} className="mx-auto mb-3 opacity-50" />
                      <p className="text-xs sm:text-sm">เลือกรูปแบบผลลัพธ์เพื่อดูคำแนะนำ</p>
                    </div>
                  )}

                  {selectedResult === 'ok' && (
                    <div className="text-center">
                      <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-500" />
                      <h4 className="text-emerald-400 font-bold text-base sm:text-lg mb-2">ระบบสมบูรณ์ปกติ</h4>
                      <p className="text-slate-300 text-xs sm:text-[16px] leading-relaxed">
                        Windows Resource Protection ไม่พบไฟล์ระบบใดๆ สูญหายหรือเสียหาย <strong>ไม่ต้องดำเนินการใดๆ เพิ่มเติม</strong>
                      </p>
                    </div>
                  )}

                  {selectedResult === 'fixed' && (
                    <div className="text-center">
                      <ShieldCheck size={40} className="mx-auto mb-3 text-blue-500" />
                      <h4 className="text-blue-400 font-bold text-base sm:text-lg mb-2">ซ่อมแซมเสร็จสิ้นอัตโนมัติ</h4>
                      <p className="text-slate-300 text-xs sm:text-[16px] leading-relaxed">
                        ระบบพบไฟล์ที่เสียหาย แต่สามารถดึงไฟล์ต้นฉบับจาก Component Store มาเขียนทับและ<strong>แก้ไขปัญหาให้เสร็จสมบูรณ์แล้ว</strong>
                      </p>
                    </div>
                  )}

                  {selectedResult === 'fail' && (
                    <div className="text-center">
                      <AlertTriangle size={40} className="mx-auto mb-3 text-red-500" />
                      <h4 className="text-red-400 font-bold text-base sm:text-lg mb-2">ไฟล์เสียหายระดับลึก (ซ่อมไม่ได้)</h4>
                      <p className="text-slate-300 text-xs sm:text-[16px] leading-relaxed mb-3 sm:mb-4">
                        ไฟล์ต้นฉบับในระบบพัง หรือติดไวรัส ทำให้ sfc ไม่สามารถดึงมาซ่อมได้
                      </p>
                      <div className="bg-black/40 p-3 rounded text-xs sm:text-sm text-left border-l-4 border-red-500 break-words">
                        <strong className="text-white block mb-1">วิธีแก้ปัญหา:</strong>
                        1. รันคำสั่ง DISM: <code className="text-orange-300 break-all">DISM /Online /Cleanup-Image /RestoreHealth</code><br/>
                        2. เปิดอ่านไฟล์ CBS.log เพื่อดูชื่อไฟล์ที่มีปัญหา
                      </div>
                    </div>
                  )}

                  {selectedResult === 'error' && (
                    <div className="text-center">
                      <XCircle size={40} className="mx-auto mb-3 text-orange-500" />
                      <h4 className="text-orange-400 font-bold text-base sm:text-lg mb-2">สแกนไม่สำเร็จ (ติดขัด)</h4>
                      <p className="text-slate-300 text-xs sm:text-[16px] leading-relaxed">
                        ระบบไม่สามารถเริ่มกระบวนการสแกนได้ อาจเกิดจาก Service ถูกปิดลง
                      </p>
                      <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-3">
                        แนะนำให้รีสตาร์ทเครื่องเข้าโหมด <strong>Safe Mode</strong> แล้วลองรัน sfc /scannow ใหม่อีกครั้ง
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mode 4: CHKDSK */}
            {activeTab === 3 && (
               <div className="flex flex-col h-full gap-4">
                 <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 mb-2">
                   <button 
                     onClick={() => { setChkdskState('running'); setChkdskLogs([]); setChkdskStage(0); }}
                     disabled={chkdskState === 'running'}
                     className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all min-h-[44px] text-xs sm:text-sm ${
                       chkdskState === 'running' 
                         ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                         : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer hover:shadow-lg'
                     }`}
                   >
                     <Play size={18} /> รันคำสั่ง chkdsk C: /f /r
                   </button>
                   {chkdskState === 'complete' && (
                     <button 
                       onClick={() => { setChkdskState('idle'); setChkdskLogs([]); }}
                       className="px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium cursor-pointer min-h-[44px] flex items-center gap-1.5"
                     >
                       <RotateCcw size={18} />
                     </button>
                   )}
                 </div>
 
                 <div className="bg-black text-slate-300 font-mono text-xs sm:text-[13px] p-3.5 sm:p-6 rounded-xl flex-grow h-[350px] overflow-x-auto overflow-y-auto">
                   <div>C:\Windows\System32&gt; {chkdskState !== 'idle' && 'chkdsk C: /f /r'}</div>
                   
                   {chkdskState !== 'idle' && (
                     <div className="mt-4 text-slate-400 space-y-2">
                       <div>The type of the file system is NTFS.</div>
                       
                       {chkdskLogs.map((log, i) => (
                         <div key={i} className={`break-words ${log.includes('found no problems') ? 'text-emerald-400 font-bold mt-4' : 'text-slate-400'}`}>
                           {log}
                         </div>
                       ))}
                       
                       {chkdskState === 'running' && (
                         <div className="animate-pulse">_</div>
                       )}
                     </div>
                   )}
                 </div>
               </div>
            )}

            {/* Mode 5: Task Manager */}
            {activeTab === 4 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end mb-2 sm:mb-4">
                  <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3.5 sm:p-4">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">CPU Usage</div>
                    <div className="flex items-end gap-3">
                      <div className={`text-2xl sm:text-3xl font-bold ${cpuUsage > 80 ? 'text-red-400' : 'text-blue-400'}`}>
                        {Math.round(cpuUsage)}%
                      </div>
                      <div className="flex-1 h-7 sm:h-8 bg-slate-800 rounded overflow-hidden flex items-end">
                        <div 
                          className={`w-full transition-all duration-1000 ${cpuUsage > 80 ? 'bg-red-500/50' : 'bg-blue-500/50'}`}
                          style={{ height: `${cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3.5 sm:p-4">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Memory (RAM)</div>
                    <div className="flex items-end gap-3">
                      <div className={`text-2xl sm:text-3xl font-bold ${memoryUsage > 85 ? 'text-orange-400' : 'text-emerald-400'}`}>
                        {Math.round(memoryUsage)}%
                      </div>
                      <div className="flex-1 h-7 sm:h-8 bg-slate-800 rounded overflow-hidden flex items-end">
                        <div 
                          className={`w-full transition-all duration-1000 ${memoryUsage > 85 ? 'bg-orange-500/50' : 'bg-emerald-500/50'}`}
                          style={{ height: `${memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-700/50">
                  <div className="min-w-[480px] sm:min-w-0 bg-white text-slate-800 font-sans">
                    <div className="bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-500 grid grid-cols-12 gap-4 border-b">
                      <div className="col-span-6">Name</div>
                      <div className="col-span-2 text-right">CPU</div>
                      <div className="col-span-2 text-right">Memory</div>
                      <div className="col-span-2 text-right">Action</div>
                    </div>
                    
                    <div className="divide-y divide-slate-100">
                      {processes.map(p => (
                        <div key={p.id} className={`px-4 py-3 text-sm grid grid-cols-12 gap-4 items-center ${p.id === 3 ? 'bg-orange-50' : ''}`}>
                          <div className="col-span-6 font-medium flex items-center gap-2 min-w-0">
                            <span className="truncate">{p.name}</span>
                            {p.id === 3 && <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0">High Usage</span>}
                          </div>
                          <div className={`col-span-2 text-right font-mono text-xs sm:text-sm ${p.id === 3 ? 'text-red-600 font-bold' : ''}`}>
                            {p.id === 3 ? (cpuUsage * 0.75).toFixed(1) : p.cpu.toFixed(1)}%
                          </div>
                          <div className={`col-span-2 text-right font-mono text-xs sm:text-sm ${p.id === 3 ? 'text-orange-600 font-bold' : ''}`}>
                            {p.memory} MB
                          </div>
                          <div className="col-span-2 text-right">
                            {p.id === 3 && (
                              <button 
                                onClick={endMalwareProcess}
                                className="px-2.5 py-1 bg-slate-800 text-white text-xs rounded hover:bg-red-600 transition-colors cursor-pointer min-h-[32px]"
                              >
                                End Task
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {taskManagerState === 'resolved' && (
                  <div className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3 text-xs sm:text-sm">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>จัดการปิด Process ตัวปัญหาสำเร็จ ทรัพยากรเครื่องกลับมาทำงานปกติแล้ว</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Layer 4: Teacher Task */}
      <TeacherTask 
        id="os11_1_task"
        title="ภารกิจวิเคราะห์ระบบ"
        description="จงใช้ Simulator ทดลองสแกนระบบและเคลียร์ Process ที่ทำให้เครื่องช้า จากนั้นสรุปความแตกต่างระหว่างคำสั่ง SFC และ CHKDSK"
      />
    </div>
  );
}
