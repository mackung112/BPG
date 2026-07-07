import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  AmbientBackdrop, 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  QuizEngine 
} from '../shared';
import { 
  Cpu, 
  Layers, 
  Laptop, 
  Terminal, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Zap, 
  Info, 
  Settings, 
  Download, 
  Gamepad2, 
  FolderPlus, 
  RefreshCw, 
  Database
} from 'lucide-react';

// ─── Theme Ambient Blobs for OOP Unit 1 (Orange/Amber/Rose Theme) ───────────
const OOP1_BLOBS = [
  { color: 'bg-orange-200', size: 'w-[45vw] h-[45vw]', position: '-top-10 -left-10', opacity: 'opacity-25' },
  { color: 'bg-amber-200',  size: 'w-[40vw] h-[40vw]', position: 'top-[20%] -right-10', opacity: 'opacity-20' },
  { color: 'bg-rose-200',   size: 'w-[42vw] h-[42vw]', position: 'bottom-[10%] -left-5', opacity: 'opacity-25' },
  { color: 'bg-yellow-200', size: 'w-[38vw] h-[38vw]', position: 'bottom-[-10%] right-[10%]', opacity: 'opacity-20' },
];

export default function oop1_1() {

  // ==========================================================================
  // SIMULATOR 1: Windows Installer Mockup State & Logic (Step 2)
  // ==========================================================================
  const [installerState, setInstallerState] = useState({
    addPath: false,
    allUsers: true,
    step: 'welcome', // welcome -> installing -> done
    progress: 0,
    showTerminal: false,
    terminalLogs: [],
    terminalInput: '',
    terminalActive: false
  });

  const handleCheckboxChange = (field) => {
    if (installerState.step !== 'welcome') return;
    setInstallerState(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const startInstallation = () => {
    setInstallerState(prev => ({ ...prev, step: 'installing', progress: 0 }));
  };

  useEffect(() => {
    let interval;
    if (installerState.step === 'installing') {
      interval = setInterval(() => {
        setInstallerState(prev => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            return { ...prev, step: 'done' };
          }
          return { ...prev, progress: prev.progress + 10 };
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [installerState.step]);

  const resetInstaller = () => {
    setInstallerState({
      addPath: false,
      allUsers: true,
      step: 'welcome',
      progress: 0,
      showTerminal: false,
      terminalLogs: [],
      terminalInput: '',
      terminalActive: false
    });
  };

  const runTerminalCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let output = [];
    output.push(`C:\\Users\\KruMac> ${trimmed}`);

    if (trimmed === 'python --version') {
      if (installerState.addPath) {
        output.push('Python 3.13.1');
      } else {
        output.push(`'python' is not recognized as an internal or external command,`);
        output.push(`operable program or batch file.`);
      }
    } else if (trimmed === 'python') {
      if (installerState.addPath) {
        output.push('Python 3.13.1 (tags/v3.13.1:0671405, Dec  3 2026, 19:12:47) [MSC v.1942 64 bit (AMD64)] on win32');
        output.push('Type "help", "copyright", "credits" or "license" for more information.');
        output.push('>>> // เข้าสู่สภาวะ Interactive Shell สำเร็จ');
      } else {
        output.push(`'python' is not recognized as an internal or external command,`);
        output.push(`operable program or batch file.`);
      }
    } else if (trimmed === 'pip --version') {
      if (installerState.addPath) {
        output.push('pip 24.3.1 from C:\\Users\\KruMac\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\pip (python 3.13)');
      } else {
        output.push(`'pip' is not recognized as an internal or external command,`);
        output.push(`operable program or batch file.`);
      }
    } else if (trimmed === 'clear') {
      setInstallerState(prev => ({ ...prev, terminalLogs: [] }));
      return;
    } else {
      output.push(`Command '${trimmed}' not found. Try 'python --version' or 'pip --version'`);
    }

    setInstallerState(prev => ({
      ...prev,
      terminalLogs: [...prev.terminalLogs, ...output],
      terminalInput: ''
    }));
  };


  // ==========================================================================
  // SIMULATOR 2: Bytecode & PVM Visualizer State & Logic (Step 3)
  // ==========================================================================
  const [pvmStep, setPvmStep] = useState(0); // 0=idle, 1=source, 2=compiler, 3=bytecode, 4=pvm_done
  const [selectedCodeSnip, setSelectedCodeSnip] = useState('snip1');
  const [pvmLogs, setPvmLogs] = useState([]);
  const [pvmRunning, setPvmRunning] = useState(false);

  const codeSnippets = {
    snip1: {
      source: 'print("Hello OOP")',
      bytecode: `1           0 LOAD_NAME                0 (print)\n            2 LOAD_CONST               0 ('Hello OOP')\n            4 CALL_FUNCTION            1\n            6 RETURN_VALUE`,
      output: 'Hello OOP'
    },
    snip2: {
      source: 'x = 10\nprint(x * 2)',
      bytecode: `1           0 LOAD_CONST               0 (10)\n            2 STORE_NAME               0 (x)\n\n2           4 LOAD_NAME                1 (print)\n            6 LOAD_NAME                0 (x)\n            8 LOAD_CONST               1 (2)\n           10 BINARY_MULTIPLY\n           12 CALL_FUNCTION            1\n           14 RETURN_VALUE`,
      output: '20'
    }
  };

  const runPvmVisualizer = () => {
    if (pvmRunning) return;
    setPvmRunning(true);
    setPvmStep(1);
    setPvmLogs(['[System]: อ่านไฟล์ซอร์สโค้ด (.py) ในระดับ High-Level ภาษาอังกฤษ']);

    setTimeout(() => {
      setPvmStep(2);
      setPvmLogs(prev => [...prev, '[Compiler]: สแกนความถูกต้องของไวยากรณ์ (Syntax Tree Parser) และแปลงค่านำส่งโครงสร้าง']);
      
      setTimeout(() => {
        setPvmStep(3);
        setPvmLogs(prev => [
          ...prev, 
          '[Bytecode]: ผลิตไฟล์ไบต์โค้ด .pyc (รหัสคำสั่งกลาง 0, 2, 4 LOAD_NAME, LOAD_CONST)',
        ]);
        
        setTimeout(() => {
          setPvmStep(4);
          setPvmLogs(prev => [
            ...prev, 
            `[PVM Engine]: เครื่องจักรเสมือนถอดรหัสรันไทม์ผ่าน CPU สำเร็จ!`,
            `>>> เอาต์พุตของโปรแกรม: ${codeSnippets[selectedCodeSnip].output}`
          ]);
          setPvmRunning(false);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const resetPvmVisualizer = () => {
    setPvmStep(0);
    setPvmLogs([]);
    setPvmRunning(false);
  };


  // ==========================================================================
  // SIMULATOR 3: Interactive CLI Terminal Command Lab State (Step 4)
  // ==========================================================================
  const [cliActiveMode, setCliActiveMode] = useState('shell'); // shell, repl
  const [cliLogs, setCliLogs] = useState([
    'Microsoft Windows [Version 10.0.22631]',
    '(c) Microsoft Corporation. All rights reserved.',
    ''
  ]);

  const runCliPreset = (command) => {
    if (cliActiveMode === 'repl') {
      if (command === 'exit()') {
        setCliLogs(prev => [
          ...prev,
          '>>> exit()',
          'กลับเข้าสู่ระบบ Command Line ปกติ',
          ''
        ]);
        setCliActiveMode('shell');
      } else if (command === 'print("Welcome to OOP")') {
        setCliLogs(prev => [
          ...prev,
          '>>> print("Welcome to OOP")',
          'Welcome to OOP'
        ]);
      } else if (command === 'class Student: pass') {
        setCliLogs(prev => [
          ...prev,
          '>>> class Student: pass',
          '>>> // สร้างบล็อกพิมพ์เขียวคลาสในหน่วยความจำชั่วคราวเรียบร้อย'
        ]);
      }
      return;
    }

    let out = [];
    out.push(`C:\\Users\\KruMac> ${command}`);

    if (command === 'python --version') {
      out.push('Python 3.13.1');
    } else if (command === 'pip --version') {
      out.push('pip 24.3.1 from C:\\Users\\KruMac\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\pip (python 3.13)');
    } else if (command === 'python') {
      setCliActiveMode('repl');
      out.push('Python 3.13.1 (tags/v3.13.1, Dec  3 2026) on win32');
      out.push('Type "help", "copyright", "credits" or "license" for more information.');
      out.push('>>> // เข้าสู่โหมดเขียนคำสั่งโต้ตอบสด (Python Shell)');
    } else if (command === 'pip install pygame') {
      out.push('Collecting pygame');
      out.push('  Downloading pygame-2.6.0-cp313-cp313-win_amd64.whl (10.5 MB)');
      out.push('Installing collected packages: pygame');
      out.push('Successfully installed pygame-2.6.0');
    } else if (command === 'clear') {
      setCliLogs([]);
      return;
    }

    setCliLogs(prev => [...prev, ...out, '']);
  };


  // ==========================================================================
  // QUIZ ENGINE DATA (5 Questions)
  // ==========================================================================
  const OOP1_1_QUIZ = [
    {
      title: 'ภารกิจที่ 1: ขั้นตอนการทำงานของรันไทม์ Python',
      desc: 'ในระดับวิศวกรรมคอมพิวเตอร์ ตัวแปลภาษา Python (CPython) มีกระบวนการแปลคำสั่งและส่งมอบผลลัพธ์ผ่าน PVM อย่างไร?',
      target: 'High-Level Code -> Bytecode (.pyc) -> PVM (Python Virtual Machine) -> CPU',
      options: [
        { key: 'A', text: 'High-Level Code -> Machine Code (.exe) -> CPU โดยตรงไม่ต้องแปลง', isCorrect: false },
        { key: 'B', text: 'High-Level Code -> Bytecode (.pyc) -> PVM (Python Virtual Machine) -> CPU', isCorrect: true },
        { key: 'C', text: 'Machine Code -> Bytecode -> ซอร์สโค้ดต้นฉบับ -> คลาสออบเจกต์', isCorrect: false },
        { key: 'D', text: 'PVM -> ตัวแปลภาษา C++ -> ซอร์สโค้ด Python -> ระบบปฏิบัติการ', isCorrect: false }
      ],
      tip: 'กระบวนการรันไทม์ของ Python จะแปลงซอร์สโค้ดอังกฤษเป็นรหัสกลางระดับต่ำ (Bytecode) ก่อนส่งให้ PVM ถอดรหัสยิงงานสู่ซีพียู'
    },
    {
      title: 'ภารกิจที่ 2: ความสำคัญสูงสุดของระบบตัวแปร PATH',
      desc: 'การคลิกเลือกช่อง "Add python.exe to PATH" ระหว่างการติดตั้งระบบมีจุดประสงค์หลักทางวิศวกรรมเพื่อสิ่งใด?',
      target: 'ลงทะเบียนพิกัดตำแหน่งโปรแกรมระบบปฏิบัติการเพื่อให้รันคำสั่งได้จากไดเรกทอรีใดก็ได้',
      options: [
        { key: 'A', text: 'ติดตั้งไลบรารีและแพ็กเกจ OOP ทั้งหมดในเครื่องแบบอัตโนมัติ', isCorrect: false },
        { key: 'B', text: 'ปรับปรุงประสิทธิภาพซีพียูในการบีบอัดไฟล์ 7-Zip', isCorrect: false },
        { key: 'C', text: 'ลงทะเบียนพิกัดตำแหน่งโปรแกรมระบบปฏิบัติการเพื่อให้รันคำสั่งได้จากไดเรกทอรีใดก็ได้', isCorrect: true },
        { key: 'D', text: 'ช่วยแก้ไขความบกพร่องของหน้าจออินเตอร์เฟสในเบราว์เซอร์', isCorrect: false }
      ],
      tip: 'ตัวแปรระบบ PATH บันทึกพิกัดตำแหน่งไฟล์หลัก (python.exe) เพื่อให้ระบบปฏิบัติการสามารถเข้าถึงและเรียกใช้ผ่าน Command Line ได้สะดวก'
    },
    {
      title: 'ภารกิจที่ 3: สังเกตและวิเคราะห์อาการบักลืม Add to PATH',
      desc: 'หากเปิด Command Line แล้วพบข้อความแจ้งเตือน "\'python\' is not recognized as an internal or external command" เป็นเพราะสาเหตุใด?',
      target: 'ระบบปฏิบัติการไม่พบเส้นทางที่ตั้งของ python.exe เนื่องจากไม่ได้ถูกลงทะเบียนใน PATH',
      options: [
        { key: 'A', text: 'โค้ดคำสั่งในโปรแกรมมีข้อผิดพลาดทางไวยากรณ์ (SyntaxError)', isCorrect: false },
        { key: 'B', text: 'ระบบปฏิบัติการไม่พบเส้นทางที่ตั้งของ python.exe เนื่องจากไม่ได้ถูกลงทะเบียน in PATH', isCorrect: true },
        { key: 'C', text: 'เครือข่ายอินเทอร์เน็ตล่ม ทำให้ตัวประมวลผลหยุดทำงานชั่วคราว', isCorrect: false },
        { key: 'D', text: 'ระบบปฏิบัติการป้องกันการรันไฟล์นามสกุล .pyc', isCorrect: false }
      ],
      tip: 'อาการ is not recognized เกิดจากความล้มเหลวในการหาตำแหน่งไฟล์ระบบ เนื่องจาก Windows ไม่ได้ระบุตำแหน่งติดตั้งไว้ในตัวแปร PATH'
    },
    {
      title: 'ภารกิจที่ 4: การระบุเวอร์ชันระบบการจัดการไลบรารี pip',
      desc: 'เมื่อติดตั้ง Python สำเร็จ คำสั่งบรรทัดใดใช้ในการประเมินและดึงหมายเลขเวอร์ชันของ Package Manager (pip) ของโปรแกรม?',
      target: 'pip --version',
      options: [
        { key: 'A', text: 'python --version', isCorrect: false },
        { key: 'B', text: 'pip --version', isCorrect: true },
        { key: 'C', text: 'pvm --version', isCorrect: false },
        { key: 'D', text: 'import pip', isCorrect: false }
      ],
      tip: 'คำสั่งในการสอบทาน Package Installer ของ Python ผ่านหน้าต่าง Command Line คือ pip --version'
    },
    {
      title: 'ภารกิจที่ 5: การทำงานของ Python REPL Shell',
      desc: 'เมื่อเข้าสู่โหมดประมวลผลคำสั่งสด Python Shell (ที่มีเครื่องหมายนำทาง >>> ) คุณต้องพิมพ์คำสั่งใดเพื่อออกจากโหมดนี้?',
      target: 'exit()',
      options: [
        { key: 'A', text: 'stop', isCorrect: false },
        { key: 'B', text: 'break', isCorrect: false },
        { key: 'C', text: 'exit()', isCorrect: true },
        { key: 'D', text: 'clear', isCorrect: false }
      ],
      tip: 'ออกจากโหมดเขียนโค้ดสด Interactive REPL ได้ด้วยฟังก์ชันมาตรฐาน exit() หรือกดปุ่มคีย์บอร์ดลัด Ctrl + Z แล้วกด Enter'
    }
  ];

  // Instructor assignment text
  const teacherTaskContent = `ใบงานกิจกรรมปฏิบัติการ หน่วยที่ 1.1: การติดตั้งและสอบทานระบบรันไทม์ Python
ให้นักเรียนปฏิบัติการและสรุปเนื้อหาผลลัพธ์ผ่านตัวจำลองและอุปกรณ์ในเครื่องส่วนตัวดังนี้:

1. ดาวน์โหลดตัวแปลภาษา Python เวอร์ชันล่าสุดจากเว็บไซต์ทางการ python.org และดำเนินการติดตั้ง
   (บันทึกภาพหน้าจอกระบวนการติดตั้งในสเตปที่มีการคลิกเช็คบ็อกซ์ "Add python.exe to PATH")

2. เปิด Command Prompt หรือ PowerShell ในเครื่องคอมพิวเตอร์ของตนเอง และรันคำสั่ง:
   - python --version
   - pip --version
   (ให้บันทึกภาพหน้าจอพร้อมคัดลอกข้อความผลลัพธ์เลขเวอร์ชันที่แสดงจริงในคอมพิวเตอร์มาใส่ในเอกสารส่งงาน)

3. พิมพ์คำสั่ง python เพื่อเข้าสู่โหมดประมวลผลสดโต้ตอบ (REPL Shell)
   และพิมพ์คำสั่งประมวลผลทางคณิตศาสตร์ง่ายๆ เช่น:
   >>> 125 * 8
   (คัดลอกผลลัพธ์และอธิบายบทบาทของเครื่องจักรเสมือน PVM ในการถอดรหัสคำสั่งนี้ลงใบงาน)`;


  return (
    <div className="font-sans text-zinc-800 pb-24 relative">
      
      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <AmbientBackdrop blobs={OOP1_BLOBS} />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── STEP 1: การเตรียมการและดาวน์โหลดตัวติดตั้ง ──────────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 1: การเตรียมการและดาวน์โหลดตัวติดตั้งมาตรฐาน (Downloading Installer)"
          icon={<Download className="w-6 h-6 text-orange-500" />}
          description="การสืบค้นหาไฟล์ติดตั้งตัวแปลภาษาที่ถูกต้องจากแหล่งข้อมูลที่เชื่อถือได้ตามมาตรฐานความปลอดภัยทางเทคนิค"
          variant="default"
          accent="orange"
        >
          {/* ดีไซน์เปิดโปร่งโล่งแบบไร้กรอบ (Fluid Open-Air Layout) */}
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              การติดตั้งสภาพแวดล้อมการเขียนโปรแกรมเชิงวัตถุด้วยภาษา Python จำเป็นต้องเริ่มต้นจากการเข้าสู่แหล่งเก็บข้อมูลอย่างเป็นทางการคือเว็บไซต์ <span className="bg-orange-50/60 border border-orange-200/50 px-2.5 py-0.5 rounded-lg text-orange-700 font-semibold text-sm">python.org</span> เท่านั้น 
              หลีกเลี่ยงการดาวน์โหลดจากคลังข้อมูลภายนอกที่ไม่ได้รับรอง เพื่อป้องกันสปายแวร์หรือแพ็กเกจที่เกิดการดัดแปลงสภาพโครงสร้าง
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-orange-500/45 transition-all duration-300 cursor-pointer group">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-orange-500" />
                  การประเมินสถาปัตยกรรมระบบ
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  ตรวจสอบระบบปฏิบัติการของคุณว่าเป็นเวอร์ชัน 64-bit หรือ 32-bit เพื่อสแกนหาไฟล์ดาวน์โหลดติดตั้งที่ตรงสเปคฮาร์ดแวร์ ส่งผลต่อการใช้ทรัพยากรหน่วยความจำของเครื่องอย่างเต็มประสิทธิภาพ
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-orange-500/45 transition-all duration-300 cursor-pointer group">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-orange-500" />
                  การเลือกประเภทรุ่น (Python Stable Release)
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  แนะนำให้เลือกติดตั้งเวอร์ชัน Stable (เช่น Python 3.13.x หรือรุ่นล่าสุด) เพื่อลดปัญหาบักความขัดแย้งของไลบรารีภายนอก และได้รับการป้องกันอัปเดตระบบความปลอดภัยสม่ำเสมอ
                </p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* ─── STEP 2: การกำหนดค่าติดตั้งและสิทธิ์ในระบบ ───────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 2: การติดตั้งและบันทึกพาธระบบปฏิบัติการ (PATH Configuration)"
          icon={<Settings className="w-6 h-6 text-amber-500" />}
          description="การกำหนดระดับสิทธิ์ความสำคัญการติดตั้งตัวช่วยรัน และระบุตำแหน่ง Environment PATH ให้เครื่องรู้จักไฟล์ระบบ"
          variant="default"
          accent="amber"
        >
          <div className="space-y-6 leading-relaxed mb-8">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              เมื่อรันไฟล์ตัวติดตั้งที่ดาวน์โหลดมา การตั้งค่าสำคัญที่สุดคือการติ๊กทำเครื่องหมายถูกที่ช่อง <span className="bg-amber-50/60 border border-amber-200/50 px-2.5 py-0.5 rounded-lg text-amber-700 font-semibold text-sm">Add python.exe to PATH</span> 
              ก่อนทำการกดปุ่มเริ่มติดตั้ง เพราะขั้นตอนนี้จะบันทึกเส้นทางตำแหน่งที่อยู่ของตัวแปลภาษาลงในตัวแปรระบบปฏิบัติการ (Environment Variables) ทำให้สามารถเรียกคำสั่งรันโปรแกรมได้จากทุกโฟลเดอร์ในเครื่องคอมพิวเตอร์
            </p>

            <div className="bg-amber-50/60 backdrop-blur-md border border-amber-200/60 rounded-2xl p-4 border-l-[3px] border-l-amber-500 leading-relaxed">
              <h4 className="font-bold text-amber-900 text-[15px] mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-500" />
                เกิดอะไรขึ้นหากลืมติ๊กเลือกช่อง Add to PATH?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                หากลืมเช็คบ็อกซ์นี้ เมื่อพิมพ์คำสั่ง <code>python</code> หรือ <code>pip</code> บน Command Prompt ระบบ Windows จะไม่ทราบว่าโปรแกรมเก็บอยู่ที่ใด และจะส่งข้อความแจ้งความบกพร่องกลับมาว่าโปรแกรมไม่ได้รับการยอมรับหรือหาไม่พบ
              </p>
            </div>
          </div>

          {/* SIMULATOR 1: Windows Installer Mockup */}
          <SimulatorShell
            title="เครื่องจำลองตัวช่วยติดตั้ง (Windows Installer Mockup & Environment Path Test)"
            accentBg="bg-amber-50/60"
            iconColor="text-amber-600"
            icon={<Settings className="w-6 h-6 text-amber-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Panel: Mock Installer Wizard */}
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 shadow-inner flex flex-col justify-between min-h-[380px] text-slate-800">
                
                {/* Header of Installer Window */}
                <div className="border-b border-slate-200 pb-3 mb-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-xs text-slate-700">Python 3.13.1 (64-bit) Setup</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  </div>
                </div>

                {/* Body of Installer depending on steps */}
                {installerState.step === 'welcome' && (
                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 leading-normal">ติดตั้งสภาพแวดล้อมรันไทม์ Python</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      กำหนดค่าเบื้องต้นและระบุสิทธิ์แอดมิน เพื่อติดตั้งฟังก์ชันหลักสำหรับการเริ่มเขียนโปรแกรม
                    </p>

                    {/* Interactive Install Now Card Button */}
                    <div 
                      onClick={startInstallation}
                      className="bg-white hover:bg-orange-50/20 border border-slate-200 hover:border-orange-500/50 p-4 rounded-xl shadow-sm cursor-pointer transition-all hover:scale-[1.01] flex items-start gap-4 active:scale-[0.99]"
                    >
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mt-1">
                        <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-xs text-slate-800">Install Now (คลิกเพื่อเริ่มติดตั้งทันที)</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          C:\Users\KruMac\AppData\Local\Programs\Python\Python313<br/>
                          รวมการติดตั้ง Package Manager (pip), IDLE และไลบรารีสถิติตามแบบหลักสูตร
                        </p>
                      </div>
                    </div>

                    {/* Crucial Checkboxes at Bottom */}
                    <div className="bg-white/80 p-3.5 rounded-xl border border-slate-200 space-y-2 mt-4">
                      <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold select-none">
                        <input 
                          type="checkbox"
                          checked={installerState.allUsers}
                          onChange={() => handleCheckboxChange('allUsers')}
                          className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                        />
                        <span>Install launcher for all users (recommended)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-xs font-bold select-none text-orange-700 bg-orange-50/50 p-1.5 rounded border border-orange-200/50">
                        <input 
                          type="checkbox"
                          checked={installerState.addPath}
                          onChange={() => handleCheckboxChange('addPath')}
                          className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                        />
                        <span className="flex items-center gap-1">
                          Add python.exe to PATH <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {installerState.step === 'installing' && (
                  <div className="flex-1 flex flex-col justify-center items-center py-8 space-y-4">
                    <RefreshCw className="w-12 h-12 text-orange-600 animate-spin" />
                    <div className="text-center space-y-1">
                      <span className="font-bold text-sm">กำลังคัดลอกไฟล์ระบบ... {installerState.progress}%</span>
                      <p className="text-[11px] text-slate-400">กำลังติดตั้งตัวประมวลผลและลงทะเบียนระบบ PATH</p>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-orange-600 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${installerState.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {installerState.step === 'done' && (
                  <div className="flex-1 flex flex-col justify-center items-center py-6 space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm">Setup was successful (ติดตั้งเสร็จสิ้น!)</h4>
                      <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                        ไลบรารีแกนกลางและ Python Runtime ถูกบันทึกลงฮาร์ดดิสก์ของเครื่องเรียบร้อยแล้ว
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setInstallerState(prev => ({ ...prev, showTerminal: true }))}
                      className="mt-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-transform duration-200 active:scale-95 shadow"
                    >
                      <Terminal className="w-4 h-4 text-orange-400" /> เปิดระบบ Command Prompt เพื่อสอบทาน
                    </button>
                  </div>
                )}

                {/* Reset button inside Installer Footer */}
                <div className="border-t border-slate-200 pt-3 mt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Python Software Foundation</span>
                  {installerState.step === 'done' && (
                    <button 
                      onClick={resetInstaller}
                      className="text-orange-600 font-bold hover:underline cursor-pointer"
                    >
                      รีเซ็ตกระบวนการเริ่มใหม่
                    </button>
                  )}
                </div>
              </div>

              {/* Right Panel: Simulated Windows Terminal Console */}
              <div className="flex flex-col justify-between gap-4">
                <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 shadow-2xl flex-1 flex flex-col justify-between min-h-[300px] relative font-mono text-[13.5px] leading-relaxed text-zinc-100">
                  <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3"># WINDOWS COMMAND PROMPT</span>
                  
                  <div className="flex-1 overflow-y-auto max-h-[260px] no-scrollbar pt-6 space-y-2 text-zinc-300">
                    <div>Microsoft Windows [Version 10.0.22631]</div>
                    <div>(c) Microsoft Corporation. All rights reserved.</div>
                    <div className="text-zinc-500 italic text-xs">// คลิกปุ่มชุดคำสั่งด้านล่างเพื่อทดลองรันจริง...</div>
                    
                    {installerState.terminalLogs.map((log, i) => (
                      <div key={i} className="whitespace-pre-wrap select-all">{log}</div>
                    ))}
                  </div>

                  {/* Input field simulation */}
                  <div className="border-t border-slate-800 pt-3 flex items-center gap-2">
                    <span className="text-orange-400 shrink-0 select-none">C:\Users\KruMac&gt;</span>
                    <input
                      type="text"
                      value={installerState.terminalInput}
                      onChange={(e) => setInstallerState(prev => ({ ...prev, terminalInput: e.target.value }))}
                      onKeyDown={(e) => { if(e.key === 'Enter') runTerminalCommand(installerState.terminalInput); }}
                      placeholder="พิมพ์คำสั่ง เช่น python --version"
                      disabled={installerState.step !== 'done'}
                      className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 font-mono text-[13.5px]"
                    />
                  </div>
                </div>

                {/* Preset CLI helper buttons to ease user interaction */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => runTerminalCommand('python --version')}
                    disabled={installerState.step !== 'done'}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 cursor-pointer disabled:opacity-50 transition-all font-bold"
                  >
                    python --version
                  </button>
                  <button
                    onClick={() => runTerminalCommand('pip --version')}
                    disabled={installerState.step !== 'done'}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 cursor-pointer disabled:opacity-50 transition-all font-bold"
                  >
                    pip --version
                  </button>
                  <button
                    onClick={() => runTerminalCommand('python')}
                    disabled={installerState.step !== 'done'}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 cursor-pointer disabled:opacity-50 transition-all font-bold"
                  >
                    python (โหมดสด REPL)
                  </button>
                  <button
                    onClick={() => runTerminalCommand('clear')}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-500 cursor-pointer transition-all"
                  >
                    ล้างหน้าจอคอมมอน
                  </button>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </SectionBlock>

        {/* ─── STEP 3: ความเข้าใจตรรกะระบบเบื้องหลังการติดตั้ง ────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 3: ความเข้าใจสถาปัตยกรรมตัวแปลภาษาหลังระบบติดตั้งสำเร็จ (Behind the Scenes)"
          icon={<Layers className="w-6 h-6 text-orange-500" />}
          description="การวิเคราะห์กระบวนการแปลงสภาพของรันไทม์ Python จากซอร์สโค้ดระดับสูงไปสู่กลไกหน่วยประมวลผลไฟฟ้า"
          variant="default"
          accent="orange"
        >
          <div className="space-y-6 leading-relaxed mb-8">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              เมื่อติดตั้งระบบสำเร็จแล้ว ก่อนที่เราจะสอบทานด้วยการสั่งรันโปรเจกต์ นักเรียนวิศวกรรมคอมพิวเตอร์จำเป็นต้องเข้าใจตรรกะเชิงลึกของการประมวลผล 
              ระบบ **CPython** จะทำงานโดยนำซอร์สโค้ดที่คุณเขียนไปทำการตรวจสอบความถูกต้องเชิงไวยากรณ์ แปลงค่านำส่งเป็นรหัสกลาง หรือ **Bytecode (.pyc)** 
              เพื่อส่งต่อให้ตัวประมวลผลในเครื่องจักรเสมือน **PVM (Python Virtual Machine)** ดำเนินการเปลี่ยนสภาพเป็นชุดสัญญาณรันงานจริงสู่หน่วยประมวลผลหลักของเครื่อง
            </p>

            <div className="bg-orange-50/60 backdrop-blur-md border border-orange-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-orange-500">
              <h4 className="font-bold text-orange-900 text-[15px] mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-orange-500" />
                จุดสังเกตเชิงลึก (PVM & Performance)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                การมีอยู่ของไฟล์ .pyc บนฮาร์ดไดรฟ์ช่วยให้การเริ่มรันโปรแกรมในครั้งถัดไปมีความเร็วสูงขึ้นมาก เพราะระบบรันไทม์ไม่ต้องเสียทรัพยากรเวลาในการคอมไพล์สแกน Syntax Tree ใหม่ตั้งแต่แรก
              </p>
            </div>
          </div>

          {/* SIMULATOR 2: Compiler & PVM Step-by-Step */}
          <SimulatorShell
            title="เครื่องคอมไพล์รหัสและเครื่องจักรเสมือนจริง (Bytecode & PVM Visualizer)"
            accentBg="bg-orange-50/60"
            iconColor="text-orange-600"
            icon={<Layers className="w-6 h-6 text-orange-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
              
              {/* Left Settings & Controls (3 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                
                <div>
                  <label className="block text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">เลือกชุดคำสั่งทดลอง:</label>
                  <div className="space-y-2 mb-6">
                    <button
                      onClick={() => { setSelectedCodeSnip('snip1'); resetPvmVisualizer(); }}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-mono cursor-pointer transition-all active:scale-[0.98]
                        ${selectedCodeSnip === 'snip1' 
                          ? 'bg-orange-600 border-orange-500 text-white font-bold shadow-md shadow-orange-600/20' 
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                      print("Hello OOP")
                    </button>
                    <button
                      onClick={() => { setSelectedCodeSnip('snip2'); resetPvmVisualizer(); }}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-mono cursor-pointer transition-all active:scale-[0.98]
                        ${selectedCodeSnip === 'snip2' 
                          ? 'bg-orange-600 border-orange-500 text-white font-bold shadow-md shadow-orange-600/20' 
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                      x = 10; print(x * 2)
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[13.5px] leading-relaxed mb-4 text-emerald-400">
                    <span className="text-slate-500 text-[10px] block mb-1 uppercase tracking-wider">// ซอร์สโค้ดระดับสูง (.py)</span>
                    <pre className="whitespace-pre-wrap">{codeSnippets[selectedCodeSnip].source}</pre>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={runPvmVisualizer}
                    disabled={pvmRunning}
                    className="flex-1 bg-[#EA580C] hover:bg-[#C2410C] text-white hover:scale-[1.02] active:scale-98 rounded-xl font-bold py-3 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 text-[13px]"
                  >
                    {pvmRunning ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>คอมไพล์และรัน <Play className="w-4 h-4" /></>
                    )}
                  </button>
                  {pvmStep > 0 && (
                    <button
                      onClick={resetPvmVisualizer}
                      className="px-4 py-3 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Middle Flow Panel (4 cols) */}
              <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">PIPELINE FLOW</span>
                
                <h4 className="text-sm font-bold text-slate-400 mb-4 mt-2">แผนผังรันไทม์การไหล (Absolute Geometric Center)</h4>
                
                {/* SVG Visual absolute flow paths */}
                <div className="relative w-full h-64 flex flex-col justify-between items-center py-2 z-10">
                  {/* Absolute Center Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* Line 1 -> 2 */}
                    <line x1="50%" y1="12%" x2="50%" y2="38%" stroke={pvmStep >= 2 ? '#EA580C' : '#334155'} strokeWidth="3" className="transition-colors duration-500" />
                    {/* Line 2 -> 3 */}
                    <line x1="50%" y1="38%" x2="50%" y2="62%" stroke={pvmStep >= 3 ? '#EA580C' : '#334155'} strokeWidth="3" className="transition-colors duration-500" />
                    {/* Line 3 -> 4 */}
                    <line x1="50%" y1="62%" x2="50%" y2="88%" stroke={pvmStep >= 4 ? '#10B981' : '#334155'} strokeWidth="3" className="transition-colors duration-500" />
                  </svg>

                  {/* Node 1: Code */}
                  <div className={`w-40 py-2.5 rounded-xl border text-center transition-all duration-300 font-mono text-xs z-10
                    ${pvmStep >= 1 
                      ? 'bg-orange-600/20 border-orange-500 text-orange-300 ring-2 ring-orange-500/20 font-bold scale-105' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    1. Source Code (.py)
                  </div>

                  {/* Node 2: Compiler */}
                  <div className={`w-40 py-2.5 rounded-xl border text-center transition-all duration-300 font-mono text-xs z-10
                    ${pvmStep >= 2 
                      ? 'bg-orange-600/20 border-orange-500 text-orange-300 ring-2 ring-orange-500/20 font-bold scale-105' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    2. CPython Compiler
                  </div>

                  {/* Node 3: Bytecode */}
                  <div className={`w-40 py-2.5 rounded-xl border text-center transition-all duration-300 font-mono text-xs z-10
                    ${pvmStep >= 3 
                      ? 'bg-orange-600/20 border-orange-500 text-orange-300 ring-2 ring-orange-500/20 font-bold scale-105' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    3. Bytecode (.pyc)
                  </div>

                  {/* Node 4: PVM */}
                  <div className={`w-40 py-2.5 rounded-xl border text-center transition-all duration-300 font-mono text-xs z-10
                    ${pvmStep >= 4 
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/20 font-bold scale-105' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    4. PVM Virtual Machine
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500 text-center tracking-wider mt-4">
                  SVG trace aligned directly to geometric centers
                </div>
              </div>

              {/* Right Output View (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4 relative">
                <ConsoleScreen
                  label="# virtual byte code compiler"
                  accentLabel="low level compilation output"
                  accentColor="text-orange-400"
                  isLoading={pvmRunning}
                  multiline={true}
                  output={pvmStep >= 3 ? codeSnippets[selectedCodeSnip].bytecode : ''}
                  placeholder="รอกระบวนการคอมไพล์จากด้านซ้ายเพื่อแสดงรหัส Bytecode..."
                />
                
                <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl flex-1 flex flex-col justify-between relative min-h-[140px]">
                  <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3"># PVM RUNTIME LOGS</span>
                  <div className="space-y-2 mt-4 font-mono text-[13px] leading-relaxed">
                    {pvmLogs.length === 0 && (
                      <p className="text-slate-600 italic">กดคลิกรันโค้ดจำลองเพื่อดูความสัมพันธ์ของรันไทม์เบื้องหลัง...</p>
                    )}
                    {pvmLogs.map((log, i) => (
                      <div key={i} className="text-orange-300 flex items-start gap-2 animate-fadeIn">
                        <Zap className="w-3.5 h-3.5 text-amber-500 mt-1 shrink-0" />
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </SectionBlock>

        {/* ─── STEP 4: การสอบทานและความถูกต้องระบบรันไทม์ ────────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 4: การสอบทานระบบผ่านบรรทัดคำสั่งและการรันคำสั่งสด (System Verification)"
          icon={<Terminal className="w-6 h-6 text-rose-500" />}
          description="ขั้นตอนสุดท้ายในการใช้ระบบปฏิบัติการ Command Prompt ตรวจเช็คหมายเลขเวอร์ชันและเรียกใช้โหมดเขียนคำสั่งโต้ตอบ"
          variant="default"
          accent="rose"
        >
          <div className="space-y-6 leading-relaxed mb-8">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              ภายหลังจากติดตั้งเสร็จสิ้น ขั้นตอนสำคัญที่สุดคือการใช้หน้าต่างดำ <span className="bg-rose-50/60 border border-rose-200/50 px-2.5 py-0.5 rounded-lg text-rose-700 font-semibold text-sm">Command Line Interface</span> เพื่อรันคำสั่งเช็คสภาพความถูกต้อง 
              และลองเข้าสู่โหมดการเขียนโค้ดเพื่อทดสอบระบบรันไทม์ของแท้ โดยสามารถเรียกคำสั่งมาตรฐานในการสอบทานดังนี้:
            </p>

            <ul className="space-y-3.5 pl-2">
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-rose-500 mt-1 shrink-0" />
                <span className="text-[15px] text-slate-600">
                  <strong className="text-slate-800">python --version:</strong> ตรวจสอบว่า Windows รู้จักตำแหน่งของภาษา และดึงหมายเลขรุ่นเวอร์ชันระบบออกมาแสดงจริง
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-rose-500 mt-1 shrink-0" />
                <span className="text-[15px] text-slate-600">
                  <strong className="text-slate-800">pip --version:</strong> สอบทานความสมบูรณ์แบบของผู้จัดการแพ็กเกจไลบรารี สำหรับเตรียมการดาวน์โหลดเครื่องมือธุรกิจในหน่วยถัดไป
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-rose-500 mt-1 shrink-0" />
                <span className="text-[15px] text-slate-600">
                  <strong className="text-slate-800">python (REPL Interactive Shell):</strong> พิมพ์คำสั่ง <code>python</code> เพื่อย้ายระบบเข้าสู่สภาพแวดล้อมรันชุดคำสั่งทีละบรรทัด สังเกตสัญลักษณ์เครื่องหมาย &gt;&gt;&gt; ท้ายบรรทัด
                </span>
              </li>
            </ul>
          </div>

          {/* SIMULATOR 3: Interactive CLI Terminal Lab */}
          <SimulatorShell
            title="ห้องปฏิบัติการรันคำสั่งตรวจสอบ (CLI Terminal verification Lab)"
            accentBg="bg-rose-50/60"
            iconColor="text-rose-600"
            icon={<FolderPlus className="w-6 h-6 text-rose-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Control Column (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">COMMAND PAD</span>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-2">คลิกเลือกคำสั่งจำลองเพื่อยิงผลลัพธ์:</h4>
                  
                  {cliActiveMode === 'shell' ? (
                    <div className="space-y-2.5">
                      <button
                        onClick={() => runCliPreset('python --version')}
                        className="w-full text-left px-4 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500/40 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98]"
                      >
                        python --version
                      </button>
                      <button
                        onClick={() => runCliPreset('pip --version')}
                        className="w-full text-left px-4 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500/40 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98]"
                      >
                        pip --version
                      </button>
                      <button
                        onClick={() => runCliPreset('python')}
                        className="w-full text-left px-4 py-3.5 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-900/40 hover:border-rose-500 text-rose-300 rounded-xl text-sm font-mono font-bold cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-between"
                      >
                        <span>python</span>
                        <span className="text-[10px] bg-rose-500/25 px-2 py-0.5 rounded text-rose-200 font-sans">เข้าสู่โหมด REPL</span>
                      </button>
                      <button
                        onClick={() => runCliPreset('pip install pygame')}
                        className="w-full text-left px-4 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500/40 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98]"
                      >
                        pip install pygame
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-amber-400 text-xs font-bold p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        ⚠️ ปัจจุบันอยู่ในโหมดประมวลผลคำสั่งสด (&gt;&gt;&gt;)
                      </div>
                      
                      <button
                        onClick={() => runCliPreset('print("Welcome to OOP")')}
                        className="w-full text-left px-4 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98]"
                      >
                        print("Welcome to OOP")
                      </button>
                      
                      <button
                        onClick={() => runCliPreset('class Student: pass')}
                        className="w-full text-left px-4 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98]"
                      >
                        class Student: pass
                      </button>

                      <button
                        onClick={() => runCliPreset('exit()')}
                        className="w-full text-left px-4 py-3.5 bg-slate-950 border border-slate-800 text-rose-400 hover:text-rose-400 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98] font-bold"
                      >
                        exit() (กลับออกมาสู่ CMD ปกติ)
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => runCliPreset('clear')}
                  className="w-full text-center py-2 border border-slate-800 text-slate-500 hover:text-slate-300 font-mono text-xs rounded-xl hover:bg-slate-950 transition-colors cursor-pointer"
                >
                  Clear Console Screen
                </button>
              </div>

              {/* Right Mock CLI Screen (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 shadow-2xl flex-1 flex flex-col justify-between min-h-[320px] relative font-mono text-[13.5px] leading-relaxed text-zinc-100">
                  <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3"># CONSOLE TERMINAL OUTPUT</span>
                  
                  <div className="mt-6 flex-1 overflow-y-auto max-h-[260px] no-scrollbar space-y-1 select-all text-zinc-300">
                    {cliLogs.map((log, idx) => (
                      <div key={idx} className="whitespace-pre-wrap">{log}</div>
                    ))}
                  </div>
                  
                  <div className="border-t border-slate-900 pt-2 text-[10px] text-slate-500 flex justify-between font-mono">
                    <span>Virtual Env: active</span>
                    <span>System Status: success</span>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </SectionBlock>

        {/* ─── SECTION 5: แบบประเมินความรอบรู้ทางวิชาการ (QuizEngine) ────────────────── */}
        <QuizEngine
          title="แบบทดสอบสถาปัตยกรรมและขั้นตอนติดตั้ง Python"
          description="ทดสอบความรู้ความสมเหตุสมผลเชิงวิชาการของนักศึกษาผ่านกระบวนการติดตั้งและสภาพแวดล้อมระบบรันไทม์"
          levels={OOP1_1_QUIZ}
          accentColor="from-orange-500/20 to-amber-500/20"
          icon={<Gamepad2 className="w-8 h-8 text-orange-500" />}
        />

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="งานมอบหมายกิจกรรมประยุกต์วิชาชีพ บทเรียนที่ 1.1" 
          taskText={teacherTaskContent} 
        />

      </main>
    </div>
  );
}
