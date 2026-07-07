import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  Code,
  Brain,
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
  Smartphone,
  Trophy,
  Workflow
} from 'lucide-react';

export default function py1_4() {
  // ==========================================
  // 1. ลักษณะเด่น (Python vs C++ vs Java Battle)
  // ==========================================
  const [battleTask, setBattleTask] = useState('hello');
  const [snakeEyeGlow, setSnakeEyeGlow] = useState(false);

  const battleCode = {
    hello: {
      python: 'print("สวัสดีชาวโลก")',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "สวัสดีชาวโลก" << endl;\n    return 0;\n}',
      java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("สวัสดีชาวโลก");\n    }\n}',
      lines: { py: 1, cpp: 7, jv: 5 }
    },
    sum: {
      python: 'total = sum(range(1, 101))\nprint(total)',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int total = 0;\n    for(int i=1; i<=100; i++) total += i;\n    cout << total << endl;\n    return 0;\n}',
      java: 'public class Main {\n    public static void main(String[] args) {\n        int total = 0;\n        for(int i=1; i<=100; i++) total += i;\n        System.out.println(total);\n    }\n}',
      lines: { py: 2, cpp: 9, jv: 7 }
    }
  };

  const triggerSnakeGlow = () => {
    setSnakeEyeGlow(true);
    setTimeout(() => setSnakeEyeGlow(false), 800);
  };

  // ==========================================
  // 2. ตัวอย่างการประยุกต์ใช้งาน (Tech Ecosystem Switcher)
  // ==========================================
  const [c2ActiveTech, setC2ActiveTech] = useState('ai');

  const ecosystems = {
    ai: {
      title: 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง (AI & Machine Learning)',
      desc: 'Python คือราชาผู้ปกครองวงการ AI ด้วยการมีห้องสมุดระดับโลกอย่าง TensorFlow, PyTorch และ Scikit-Learn ที่ช่วยให้นักเขียนตรรกะสามารถสร้างสมองจำลองของคอมพิวเตอร์เพื่อตรวจจับใบหน้าหรือวิเคราะห์เสียงพูดได้ในเวลาอันรวดเร็ว',
      metric: '95% Popularity in AI Research',
      visual: 'Neural network paths analyzer executing...'
    },
    data: {
      title: 'วิทยาการข้อมูลและการวิเคราะห์สถิติ (Data Science & Analytics)',
      desc: 'การจัดการข้อมูลดิบขนาดพันล้านแถว (Big Data) ถูกลดความยากลงอย่างล้นหลามด้วยไลบรารี Pandas, NumPy และแผงวาดกราฟสถิติที่สวยงามอย่าง Matplotlib และ Seaborn',
      metric: '88% Used by Data Scientists Globally',
      visual: 'Histogram grid calculations processing...'
    },
    web: {
      title: 'การพัฒนาเซิร์ฟเวอร์หลังบ้าน (Web Backend Development)',
      desc: 'ระบบบริการระดับโลกเบื้องหลังสามารถประมวลผลคำขอพร้อมกันล้านคนได้อย่างปลอดภัยและรวดเร็ว ผ่านเว็บเฟรมเวิร์กอย่าง Django, FastAPI และ Flask',
      metric: 'Django / FastAPI Backend Speed',
      visual: 'HTTP Gateway request handshakes verified...'
    }
  };

  const selectedTech = ecosystems[c2ActiveTech];

  // ==========================================
  // 3. ความสำคัญ (Virtual Library Packager Installer)
  // ==========================================
  const [installingPack, setInstallingPack] = useState(null);
  const [installedPacks, setInstalledPacks] = useState([]);
  const [installProgress, setInstallProgress] = useState(0);

  const pyPackages = [
    { name: 'pandas', desc: 'เครื่องมือจัดการตารางโครงสร้างข้อมูลสเปรดชีต' },
    { name: 'numpy', desc: 'ห้องสมุดคำนวณเวกเตอร์และสเตตัสคณิตศาสตร์ระดับสูง' },
    { name: 'tensorflow', desc: 'โครงสร้างการเรียนรู้ของสมองเทียม AI และการวิเคราะห์ภาพ' }
  ];

  const installPackage = (packName) => {
    if (installedPacks.includes(packName) || installingPack) return;
    setInstallingPack(packName);
    setInstallProgress(0);

    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setInstalledPacks(old => [...old, packName]);
          setInstallingPack(null);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const uninstallAllPacks = () => {
    setInstalledPacks([]);
    setInstallingPack(null);
  };

  // ==========================================
  // 4. แพลตฟอร์มระดับโลก (Vibrant Floating App Board)
  // ==========================================
  const [hoveredApp, setHoveredApp] = useState(null);

  const globalApps = [
    { name: 'Instagram', percent: '75% Core Logic', role: 'ระบบคัดเลือกฟิลเตอร์รูปภาพและฟีดข่าวการสไลด์มือถือหลังบ้านรันด้วย Python', color: 'from-pink-500 to-amber-500' },
    { name: 'YouTube', percent: '68% Recommendations', role: 'ระบบวิเคราะห์พฤติกรรมการดูและส่งคลิปที่เหมาะสมตรงใจผู้ใช้งานสตรีมมิ่ง', color: 'from-red-600 to-rose-500' },
    { name: 'Spotify', percent: '80% Audio Processing', role: 'การประมวลผลคลื่นความถี่เพลงและการจัดเพลย์ลิสต์อัจฉริยะประยุกต์ใช้ปัญญาประดิษฐ์', color: 'from-emerald-500 to-teal-500' },
    { name: 'Netflix', percent: '72% Analysis backend', role: 'ระบบหลังบ้านคอยสแกนตรวจสอบความจุวิดีโอและเลือกกระจายสัญญาณภาพสีคุณภาพสูง', color: 'from-slate-900 to-red-700 font-bold' }
  ];

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-amber-200 selection:text-amber-900 relative">

      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full bg-amber-200/35 blur-[160px]"></div>
        <div className="absolute bottom-[15%] right-[-5%] w-[550px] h-[550px] rounded-full bg-orange-200/30 blur-[160px]"></div>
      </div>

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-6 md:space-y-8 relative z-10">

        {/* ----------------- Subtopic 1 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-50/80 text-amber-600 border border-amber-100 shadow-inner group cursor-pointer">
              <Code className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ลักษณะเด่นและไวยากรณ์พื้นฐาน</h2>
              <p className="text-[15px] text-slate-500">ความงามของไวยากรณ์ที่กระชับและลบความซับซ้อนทิ้งออกไปอย่างสมบูรณ์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                จุดเด่นที่ทำความนิยมของภาษา Python ทะยานสู่อันดับหนึ่งคือ **"ความง่ายในการอ่านและการเขียน"** 
                มีปรัชญาที่มุ่งลดความซับซ้อนของรูปแบบประโยค โค้ดของไพธอนจึงใช้บรรทัดน้อยมากเมื่อเทียบกับภาษาอื่น
              </p>
              
              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl flex items-center gap-4">
                {/* SVG Beautiful Snake plate */}
                <svg 
                  className={`w-12 h-12 text-amber-600 transition-all duration-500 cursor-pointer hover:scale-110 ${snakeEyeGlow ? 'rotate-12 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : ''}`}
                  viewBox="0 0 100 100"
                  onClick={triggerSnakeGlow}
                >
                  <path d="M20,50 Q30,20 50,50 T80,50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="6" fill={snakeEyeGlow ? '#ef4444' : 'currentColor'} />
                  <circle cx="56" cy="46" r="1.5" fill="white" />
                </svg>

                <p className="text-xs text-slate-600 leading-relaxed">
                  **สัญลักษณ์งูคู่ไพธอน**: คลิกที่สัญลักษณ์งูด้านข้างเพื่อกระตุ้นชีพจรสายตาและศึกษารูปแบบประโยคโค้ดเปรียบเทียบในแผงจำลองด้านข้าง
                </p>
              </div>
            </div>

            {/* Python vs Java vs C++ Visual Battle */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <div className="absolute top-2 right-4 text-[10px] font-mono text-zinc-500">Syntax Battle Simulator</div>
              
              <div className="flex gap-2 justify-center mb-6">
                {['hello', 'sum'].map((task) => (
                  <button
                    key={task}
                    onClick={() => { setBattleTask(task); triggerSnakeGlow(); }}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-[13px] cursor-pointer hover:scale-[1.02] active:scale-98 transition-all
                      ${battleTask === task 
                        ? 'bg-amber-600 border-amber-500 text-white shadow-md shadow-amber-600/30' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                  >
                    {task === 'hello' ? 'พิมพ์คำทักทาย' : 'หาผลรวมเลข 1-100'}
                  </button>
                ))}
              </div>

              <div className="space-y-4 font-mono text-[13px]">
                {/* Python Box */}
                <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl relative">
                  <div className="absolute top-2 right-3 text-[9px] text-amber-500 font-bold">1. Python Code ({battleCode[battleTask].lines.py} Line)</div>
                  <pre className="text-amber-300 font-semibold leading-relaxed whitespace-pre-wrap">{battleCode[battleTask].python}</pre>
                </div>

                {/* Java Box */}
                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl relative">
                  <div className="absolute top-2 right-3 text-[9px] text-zinc-500 font-bold">2. Java Code ({battleCode[battleTask].lines.jv} Lines)</div>
                  <pre className="text-slate-400 leading-relaxed overflow-x-auto">{battleCode[battleTask].java}</pre>
                </div>

                {/* C++ Box */}
                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl relative">
                  <div className="absolute top-2 right-3 text-[9px] text-zinc-500 font-bold">3. C++ Code ({battleCode[battleTask].lines.cpp} Lines)</div>
                  <pre className="text-slate-400 leading-relaxed overflow-x-auto">{battleCode[battleTask].cpp}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 2 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-50/80 text-amber-600 border border-amber-100 shadow-inner group cursor-pointer">
              <Brain className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ตัวอย่างการประยุกต์ใช้งานในปัจจุบัน</h2>
              <p className="text-[15px] text-slate-500">มิติด้านวิทยาการและอาณาจักรเทคโนโลยีคอมพิวเตอร์ที่ถูกยึดครองโดยไพธอน</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {['ai', 'data', 'web'].map((tech) => (
              <button
                key={tech}
                onClick={() => setC2ActiveTech(tech)}
                className={`p-4 rounded-xl text-left border cursor-pointer hover:scale-[1.02] transition-all duration-200
                  ${c2ActiveTech === tech 
                    ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-500/20' 
                    : 'bg-white/40 border-slate-200 hover:bg-white'}`}
              >
                <div className="text-[11px] text-amber-600 font-mono font-bold mb-1 uppercase">{tech} sector</div>
                <h4 className="font-semibold text-slate-800">
                  {tech === 'ai' && 'AI & Machine Learning'}
                  {tech === 'data' && 'Data Science & Analysis'}
                  {tech === 'web' && 'Web Backend server'}
                </h4>
              </button>
            ))}
          </div>

          {/* Tech ecosystem visual screen */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-2 right-4 text-[10px] font-mono text-zinc-500">Live Ecosystem Trace</div>
            
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-amber-400 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-amber-500" />
                {selectedTech.title}
              </h3>
              <p className="text-[14px] text-zinc-300 leading-relaxed font-sans max-w-3xl">
                {selectedTech.desc}
              </p>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-amber-300/80 font-mono">
                  Popularity Index: **{selectedTech.metric}**
                </div>
                <div className="text-[11px] font-mono text-zinc-500">
                  Visual engine status: {selectedTech.visual}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 3 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-50/80 text-amber-600 border border-amber-100 shadow-inner group cursor-pointer">
              <Layers className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ความสำคัญของภาษา Python ในการพัฒนาซอฟต์แวร์</h2>
              <p className="text-[15px] text-slate-500">พลังอำนาจที่ไร้ขีดจำกัดจากชุมชนช่วยเหลือและกลุ่มไลบรารีขนาดมหึมา</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ปัจจัยสำคัญที่ขับเคลื่อนโครงการขนาดใหญ่คือ **"การไม่ต้องเริ่มเขียนจากศูนย์"** 
                Python มีระบบกระจายแพ็คเกจส่วนกลาง (PyPI) ที่มีผู้เชี่ยวชาญจากค่ายเทคโนโลยีระดับโลกคอยแบ่งปันโมดูลไลบรารีสำเร็จรูป 
                ช่วยให้ทีมสร้างซอฟต์แวร์นำไปใช้งานได้ทันที
              </p>
              
              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
                <h4 className="font-semibold text-amber-950 text-sm mb-1">ชุมชนผู้พัฒนาที่มั่นคง</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  หากนักเรียนเจอปัญหาหรือข้อบกพร่องในตรรกะโค้ด คอมมูนิตี้ช่วยเหลือขนาดใหญ่ทั่วโลกพร้อมส่งคำตอบให้ศึกษาได้อย่างไม่มีความเงียบเหงา
                </p>
              </div>
            </div>

            {/* Virtual library installer board */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              <h3 className="font-semibold text-slate-900 mb-1 text-center text-sm">เครื่องติดตั้งแพ็คเกจโมดูลจำลอง (Pip installer)</h3>
              <p className="text-xs text-slate-500 text-center mb-6">คลิกติดตั้งโมดูลด้านล่างเพื่อเพิ่มขีดความสามารถการคำนวณของซอฟต์แวร์</p>

              <div className="space-y-3 mb-6">
                {pyPackages.map((pack) => {
                  const installed = installedPacks.includes(pack.name);
                  const isCurrent = installingPack === pack.name;
                  return (
                    <div 
                      key={pack.name}
                      className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-slate-800">{pack.name}</div>
                        <div className="text-[11px] text-slate-500 font-sans">{pack.desc}</div>
                      </div>
                      
                      <div>
                        {installed ? (
                          <span className="text-[11px] bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> สำเร็จ
                          </span>
                        ) : (
                          <button
                            disabled={installingPack !== null}
                            onClick={() => installPackage(pack.name)}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer active:scale-95 transition-all
                              ${installingPack 
                                ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed' 
                                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow shadow-amber-500/10'}`}
                          >
                            {isCurrent ? `${installProgress}%` : 'ติดตั้ง'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console log display */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-2xl font-mono text-[12px] min-h-[90px] relative">
                <div className="absolute top-2 right-4 text-[9px] text-amber-500/60">Pip Output terminal</div>
                <div className="text-zinc-600 mb-1.5">// Pip console logs:</div>
                
                {installingPack && (
                  <div className="text-amber-400 animate-pulse">
                    ➔ pip install {installingPack} ... [ Downloading Package files ]
                  </div>
                )}

                {installedPacks.length === 0 && !installingPack && (
                  <p className="text-zinc-600 italic">[ บอร์ดยังว่างเปล่า ไม่มีส่วนเสริมใดได้รับการติดตั้ง ]</p>
                )}

                <div className="space-y-1">
                  {installedPacks.map(p => (
                    <div key={p} className="text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Successfully installed {p}-latest_version
                    </div>
                  ))}
                </div>
              </div>

              {installedPacks.length > 0 && (
                <div className="mt-4 text-right">
                  <button 
                    onClick={uninstallAllPacks}
                    className="text-xs text-rose-600 hover:underline cursor-pointer font-bold"
                  >
                    ถอนการติดตั้งโมดูลทั้งหมด
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 4 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-50/80 text-amber-600 border border-amber-100 shadow-inner group cursor-pointer">
              <Globe className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">แพลตฟอร์มที่สร้างด้วย Python</h2>
              <p className="text-[15px] text-slate-500">สะท้อนความไว้วางใจระดับโลกผ่านผลิตภัณฑ์ซอฟต์แวร์ยักษ์ใหญ่ที่นักเรียนใช้งานประจำวัน</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans max-w-4xl">
              ไม่ใช่เพียงแค่โมเดลวิจัยทางวิชาการ แต่ระบบคอมพิวเตอร์ระดับโลกที่มีผู้ใช้งานจริงพร้อมกันหลายร้อยล้านคน 
              ล้วนนำตรรกะของ Python เข้ามาใช้เป็นหัวใจหลักในการคัดเลือกข้อมูลและรันเซิร์ฟเวอร์
            </p>

            {/* Global app cards board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
              {globalApps.map((app) => (
                <div
                  key={app.name}
                  onMouseEnter={() => setHoveredApp(app.name)}
                  onMouseLeave={() => setHoveredApp(null)}
                  className={`p-6 border border-slate-200/80 rounded-2xl bg-white/40 shadow-sm cursor-pointer transition-all duration-300 flex flex-col justify-between relative overflow-hidden
                    ${hoveredApp === app.name 
                      ? 'border-amber-500/40 bg-amber-50/10 shadow-lg scale-[1.03]' 
                      : ''
                    }`}
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold text-amber-600 uppercase">{app.percent}</span>
                    <h3 className="font-bold text-slate-800 text-lg mt-1 mb-2">{app.name}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-sans">
                      {app.role}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 font-mono">GLOBAL PLATFORM</span>
                    <Trophy className={`w-4 h-4 text-amber-500 transition-all ${hoveredApp === app.name ? 'animate-bounce scale-110' : 'opacity-35'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ใบงานปฏิบัติ: วิเคราะห์จุดเด่นและการนำไปใช้ของ Python"
          taskText={`โจทย์ปฏิบัติงานวิเคราะห์ (หน่วยที่ 1.4):
ให้นักเรียนวิเคราะห์ข้อดีและการประยุกต์ใช้ภาษา Python และบันทึกสรุปผลด้วยตนเอง

ข้อที่ 1: การเปรียบเทียบความเรียบง่ายของไวยากรณ์
จากเครื่องจำลอง Syntax Battle:
- จงเขียนคำสั่ง Python ที่ใช้สั่งหาผลรวมตัวเลข 1 ถึง 100 
- และเปรียบเทียบจำนวนบรรทัดของโค้ด Python กับภาษา C++ และ Java ว่ามีความแตกต่างกันอย่างไร มีผลต่อนักเขียนโปรแกรมอย่างไรบ้าง

ข้อที่ 2: การวิเคราะห์แพลตฟอร์มยักษ์ใหญ่
- ระบุชื่อแพลตฟอร์มระดับโลกจำนวน 3 รายการที่ประยุกต์ใช้งาน Python เป็นกลไกเบื้องหลัง
- และเขียนอธิบายว่า Python มีบทบาทสำคัญในการทำหน้าที่อะไรภายในระบบแพลตฟอร์มของแอพพลิเคชั่นเหล่านั้น`}
        />

      </main>
    </div>
  );
}
