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
  Database,
  Layout,
  PlayCircle
} from 'lucide-react';

// ─── Theme Ambient Blobs for OOP Unit 1 (Orange/Amber/Rose Theme) ───────────
const OOP1_BLOBS = [
  { color: 'bg-orange-200', size: 'w-[45vw] h-[45vw]', position: '-top-10 -left-10', opacity: 'opacity-25' },
  { color: 'bg-amber-200',  size: 'w-[40vw] h-[40vw]', position: 'top-[20%] -right-10', opacity: 'opacity-20' },
  { color: 'bg-rose-200',   size: 'w-[42vw] h-[42vw]', position: 'bottom-[10%] -left-5', opacity: 'opacity-25' },
  { color: 'bg-yellow-200', size: 'w-[38vw] h-[38vw]', position: 'bottom-[-10%] right-[10%]', opacity: 'opacity-20' },
];

export default function oop1_2() {

  // ==========================================================================
  // SIMULATOR 1: VS Code Setup Dialog Wizard Mockup (Step 3)
  // ==========================================================================
  const [installerState, setInstallerState] = useState({
    addPath: false,
    openMenu: true,
    createDesktop: false,
    step: 'welcome', // welcome -> installing -> done
    progress: 0
  });

  const handleCheckboxChange = (field) => {
    if (installerState.step !== 'welcome') return;
    setInstallerState(prev => ({ ...prev, [field]: !prev[field] }));
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
          return { ...prev, progress: prev.progress + 20 };
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [installerState.step]);

  const resetInstaller = () => {
    setInstallerState({
      addPath: false,
      openMenu: true,
      createDesktop: false,
      step: 'welcome',
      progress: 0
    });
    setTerminalLogs([
      'Microsoft Windows [Version 10.0.22631]',
      '(c) Microsoft Corporation. All rights reserved.',
      ''
    ]);
    setTerminalInput('');
    setVsCodeLaunched(false);
  };


  // ==========================================================================
  // SIMULATOR 2: CLI Launcher & PATH Console (Step 5)
  // ==========================================================================
  const [terminalLogs, setTerminalLogs] = useState([
    'Microsoft Windows [Version 10.0.22631]',
    '(c) Microsoft Corporation. All rights reserved.',
    ''
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [vsCodeLaunched, setVsCodeLaunched] = useState(false);

  const runTerminalCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let output = [];
    output.push(`C:\\Users\\KruMac> ${trimmed}`);

    if (trimmed === 'd:') {
      output.push('D:\\>');
    } else if (trimmed === 'cd 12_john' || trimmed === 'cd 12_John') {
      output.push('D:\\12_john>');
    } else if (trimmed === 'code .') {
      if (installerState.addPath) {
        output.push('[System]: ตรวจพบค่าตัวแปรระบบ PATH!');
        output.push('[System]: กำลังเปิดโปรแกรม VS Code ดึงโฮสต์ไดเรกทอรี D:\\12_john...');
        setVsCodeLaunched(true);
        // เลื่อนหน้าต่างไปที่วิชวลจำลอง VS Code ด้านล่าง
        setTimeout(() => {
          const element = document.getElementById('vscode-ui-workspace');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      } else {
        output.push(`'code' is not recognized as an internal or external command,`);
        output.push(`operable program or batch file.`);
        output.push(`[Error]: กรุณากลับไปที่ขั้นตอนที่ 3 เพื่อติ๊กเครื่องหมายถูกที่ช่อง Add to PATH`);
      }
    } else if (trimmed === 'code --version') {
      if (installerState.addPath) {
        output.push('1.96.2');
        output.push('78a4c140e28105d1fb13a1e1');
        output.push('x64');
      } else {
        output.push(`'code' is not recognized as an internal or external command,`);
        output.push(`operable program or batch file.`);
      }
    } else if (trimmed === 'clear') {
      setTerminalLogs([]);
      return;
    } else {
      output.push(`Command '${trimmed}' not found. Try 'code --version' or 'code .'`);
    }

    setTerminalLogs(prev => [...prev, ...output, '']);
    setTerminalInput('');
  };

  const handleShortcutClick = (cmd) => {
    if (installerState.step !== 'done') {
      setTerminalLogs(prev => [...prev, `[System Alert]: กรุณาติดตั้ง VS Code ในขั้นตอนที่ 3 ให้เสร็จสิ้นก่อน!`, '']);
      return;
    }
    
    // จำลองกระบวนการรันลำดับคำสั่งเพื่อความสมจริง
    if (cmd === 'code .') {
      setTerminalLogs(prev => [
        ...prev,
        'C:\\Users\\KruMac> d:',
        'D:\\>',
        'D:\\> cd 12_john',
        'D:\\12_john> code .',
        installerState.addPath 
          ? '[System]: ตรวจพบค่าตัวแปรระบบ PATH!\n[System]: เปิด VS Code สำเร็จที่พิกัด Workspace D:\\12_john'
          : `'code' is not recognized as an internal or external command,\noperable program or batch file.\n[Error]: ลืมเลือกช่อง Add to PATH ขณะติดตั้ง!`,
        ''
      ]);
      if (installerState.addPath) {
        setVsCodeLaunched(true);
        setTimeout(() => {
          const element = document.getElementById('vscode-ui-workspace');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 600);
      }
    } else {
      runTerminalCommand(cmd);
    }
  };


  // ==========================================================================
  // SIMULATOR 3: VS Code UI Workspace Explorer (Step 6)
  // ==========================================================================
  const [vscodeActiveArea, setVscodeActiveArea] = useState('editor'); // activity, sidebar, editor, terminal
  const [vscodeTerminalLogs, setVscodeTerminalLogs] = useState([]);
  const [vscodeCodeRunning, setVscodeCodeRunning] = useState(false);

  const vscodeAreaDescriptions = {
    activity: {
      title: 'แถบกิจกรรมข้างสุด (Activity Bar)',
      desc: 'คอลัมน์แถบไอคอนทางด้านซ้ายสุด ทำหน้าที่เป็นเมนูหลักเพื่อเปลี่ยนเนื้อหาแผงข้าง (Sidebar) ประกอบด้วย ปุ่ม Explorer (ค้นหาไฟล์), Search (ค้นหาคำ), Source Control (Git), Run & Debug, และ Extensions (สำหรับติดตั้งส่วนเสริม Python/OOP)'
    },
    sidebar: {
      title: 'แผงข้างจัดการไฟล์ (Sidebar - Explorer)',
      desc: 'แผงที่แสดงรายละเอียดโครงสร้างและลำดับไฟล์ของ Workspace ปัจจุบัน ในที่นี้จะเปิดโฮสต์ระบบโปรเจกต์ของนักเรียนอยู่ที่พิกัดไดเรกทอรี D:\\12_john ซึ่งจะประกอบด้วยไฟล์งานหลัก เช่น 1.1_hello.py และ 1.2_variables.py ทำให้นักเรียนเปิดปิดและจัดโครงสร้างไฟล์งานวิชา OOP ได้ง่ายดาย'
    },
    editor: {
      title: 'กลุ่มพื้นที่เขียนโค้ดหลัก (Editor Group)',
      desc: 'พื้นที่หลักตรงกลางสำหรับการเขียนและแก้ไขซอร์สโค้ดโปรแกรม รองรับระบบแยกเฉดสีคีย์เวิร์ด (Syntax Highlighting) อัตโนมัติ เพื่อให้อ่านเข้าใจความแตกต่างของคำสั่ง class, print, strings และตัวแปรอย่างรวดเร็ว'
    },
    terminal: {
      title: 'แถบแผงคอนโซลควบคุมรันสคริปต์ (Terminal Panel)',
      desc: 'หน้าต่างบรรทัดคำสั่งจำลองที่บิวต์อินอยู่ด้านล่างสุดของตัวโปรแกรม คอยรับหน้าที่รันไฟล์สคริปต์ไพธอนโดยตรง และแสดงเอาต์พุตผลลัพธ์ของโปรแกรมที่รันขึ้นมา โดยนักเรียนไม่ต้องสลับโปรแกรมออกไปภายนอก'
    }
  };

  const runVscodeCode = () => {
    if (vscodeCodeRunning) return;
    setVscodeCodeRunning(true);
    setVscodeTerminalLogs(['D:\\12_john> python 1.1_hello.py']);

    setTimeout(() => {
      setVscodeTerminalLogs(prev => [
        ...prev,
        'ยินดีต้อนรับสู่ห้องเรียนครูแม็ค (สลักพิกัดห้อง Workspace ไดรฟ์ D สำเร็จ!)',
        '>>> ระบบประมวลผล Python OOP สำเร็จ 100%'
      ]);
      setVscodeCodeRunning(false);
    }, 850);
  };

  const clearVscodeTerminal = () => {
    setVscodeTerminalLogs([]);
  };

  // ==========================================================================
  // QUIZ ENGINE DATA (5 Questions)
  // ==========================================================================
  const OOP1_2_QUIZ = [
    {
      title: 'ภารกิจที่ 1: การสอบทานการสั่งรันโปรเจกต์ผ่าน CLI',
      desc: 'การสั่งประมวลคำสั่งย่อ code . ในหน้าต่าง Command Prompt (cmd) มีวัตถุประสงค์และกลไกการทำงานอย่างไร?',
      target: 'เพื่อเปิด VS Code ในไดเรกทอรีปัจจุบันที่กำลังทำงานอยู่',
      options: [
        { key: 'A', text: 'เพื่อคอมไพล์โค้ด Python ทั้งระบบให้เร่งความเร็วการทำงาน', isCorrect: false },
        { key: 'B', text: 'เพื่อเปิด VS Code ในไดเรกทอรีปัจจุบันที่กำลังทำงานอยู่', isCorrect: true },
        { key: 'C', text: 'เพื่อดาวน์โหลดและติดตั้งตัวแปลภาษาจากทางไกลเข้ามา', isCorrect: false },
        { key: 'D', text: 'เพื่อรีสตาร์ทระบบคอมพิวเตอร์และลบแคชไฟล์ชั่วคราว', isCorrect: false }
      ],
      tip: 'คำสั่งย่อ code ตามด้วยสัญลักษณ์จุด (.) คือการระบุพิกัด Workspace ปัจจุบันเพื่อดึงข้อมูลโฟลเดอร์นั้นขึ้นมาแก้ไข'
    },
    {
      title: 'ภารกิจที่ 2: ความแตกต่างระดับสิทธิ์ของ User Installer',
      desc: 'ความแตกต่างเชิงสถาปัตยกรรมที่สำคัญที่สุดระหว่างไฟล์ติดตั้งประเภท User Installer และ System Installer คือสิ่งใด?',
      target: 'User Installer ไม่ต้องการสิทธิ์ของระดับ Administrator ในการบันทึกฐานข้อมูลลงระบบ',
      options: [
        { key: 'A', text: 'User Installer รองรับคุณสมบัติการทำงานเร็วกว่า System Installer 2 เท่า', isCorrect: false },
        { key: 'B', text: 'User Installer ไม่ต้องการสิทธิ์ของระดับ Administrator ในการบันทึกฐานข้อมูลลงระบบ', isCorrect: true },
        { key: 'C', text: 'System Installer ทำงานร่วมกับภาษาไพธอนเวอร์ชันเก่าได้ดีกว่า', isCorrect: false },
        { key: 'D', text: 'User Installer ถูกออกแบบมาเฉพาะบน macOS เท่านั้น ไม่รองรับ Windows', isCorrect: false }
      ],
      tip: 'User Installer จะเขียนข้อมูลลงเฉพาะไดเรกทอรีผู้ใช้ (AppData) จึงไม่ส่งผลต่อผู้ใช้บัญชีอื่นๆ และไม่ร้องขอรหัสผ่าน Admin'
    },
    {
      title: 'ภารกิจที่ 3: วิเคราะห์ปัญหาระบบ PATH ที่ไม่ได้รับทะเบียน',
      desc: 'หากผู้เรียนรันคำสั่ง code . ในหน้าต่าง Command Prompt แล้วปรากฏข้อผิดพลาด \'code\' is not recognized... เกิดจากสาเหตุใด?',
      target: 'ไม่ได้ติ๊กเช็คบ็อกซ์ Add to PATH ขณะติดตั้ง ทำให้ Windows ค้นหาเส้นทางเรียกใช้โปรแกรมไม่พบ',
      options: [
        { key: 'A', text: 'ไม่ได้ดาวน์โหลดไลบรารีระบบปฏิบัติการ Node.js ในเครื่อง', isCorrect: false },
        { key: 'B', text: 'โฟลเดอร์โครงการ D:\\12_john ถูกล็อกรหัสสิทธิ์ความปลอดภัยไว้', isCorrect: false },
        { key: 'C', text: 'ไม่ได้ติ๊กเช็คบ็อกซ์ Add to PATH ขณะติดตั้ง ทำให้ Windows ค้นหาเส้นทางเรียกใช้โปรแกรมไม่พบ', isCorrect: true },
        { key: 'D', text: 'โปรแกรมพิมพ์ข้อความหลักในเครื่อง Windows ชำรุดเสียหาย', isCorrect: false }
      ],
      tip: 'ข้อความ not recognized บนคอนโซลหมายถึง Windows ค้นหาพิกัดตัวแปรใน PATH ไม่พบ จึงเรียกใช้งานคำสั่งย่อผ่าน CLI ไม่ได้'
    },
    {
      title: 'ภารกิจที่ 4: การจัดระเบียบโครงสร้าง Workspace ในไดรฟ์ D',
      desc: 'เหตุใดผู้สอนจึงกำหนดระเบียบห้ามมิให้นักเรียนพิมพ์ตัวอักษรภาษาไทย สระ หรือการเค้นช่องว่างในชื่อโฟลเดอร์ของรายวิชา?',
      target: 'เพื่อป้องกันปัญหาการเข้ารหัสอักขระ (Encoding) ที่ต่างชนิดกัน ซึ่งส่งผลให้ Python Interpreter ประมวลผลลัพธ์ผิดพลาด',
      options: [
        { key: 'A', text: 'ระบบ Windows 11 จะลบโฟลเดอร์ภาษาไทยออกโดยอัตโนมัติเมื่อรีสตาร์ทเครื่อง', isCorrect: false },
        { key: 'B', text: 'เพื่อช่วยเพิ่มปริมาณความเร็วในการเชื่อมต่อผ่านเครือข่ายไร้สาย', isCorrect: false },
        { key: 'C', text: 'เพื่อป้องกันปัญหาการเข้ารหัสอักขระ (Encoding) ที่ต่างชนิดกัน ซึ่งส่งผลให้ Python Interpreter ประมวลผลลัพธ์ผิดพลาด', isCorrect: true },
        { key: 'D', text: 'เป็นกฎข้อกำหนดในการจดทะเบียนเครื่องหมายการค้าลิขสิทธิ์สากล', isCorrect: false }
      ],
      tip: 'อักขระที่ไม่ใช่ภาษาอังกฤษมาตรฐานหรือมีช่องว่าง มักสร้างปัญหาทาง Encoding ในตัวแปลคำสั่ง ทำให้เวลาคอมไพล์หรือระบุพาร์ทไฟล์เกิดการแครช'
    },
    {
      title: 'ภารกิจที่ 5: การทำงานของ Workspace Explorer ใน VS Code',
      desc: 'หากต้องการตรวจสอบลำดับขั้นชั้นของไฟล์ ตลอดจนจัดการเปิดปิดโค้ดสคริปต์ต่างๆ ในโปรเจกต์ D:\\12_john จะต้องคลิกพื้นที่อินเตอร์เฟสส่วนใด?',
      target: 'แผงข้างจัดการไฟล์ (Sidebar - Explorer)',
      options: [
        { key: 'A', text: 'แถบแผงคอนโซลควบคุมรันสคริปต์ (Terminal Panel)', isCorrect: false },
        { key: 'B', text: 'กลุ่มพื้นที่เขียนโค้ดหลัก (Editor Group)', isCorrect: false },
        { key: 'C', text: 'แถบกิจกรรมข้างสุด (Activity Bar)', isCorrect: false },
        { key: 'D', text: 'แผงข้างจัดการไฟล์ (Sidebar - Explorer)', isCorrect: true }
      ],
      tip: 'แผงข้าง Explorer คือหน้าต่างอำนวยการสำหรับสำรวจ ดึง ลำดับ และบริหารโครงสร้างต้นไม้ไฟล์งานปฏิบัติการทั้งหมดใน Workspace ของคุณ'
    }
  ];

  // Instructor assignment text
  const teacherTaskContent = `ใบงานกิจกรรมปฏิบัติการ หน่วยที่ 1.2: การติดตั้งและตั้งค่าพื้นที่ Workspace ใน VS Code
ให้นักเรียนปฏิบัติและบันทึกรายงานผลการเรียนรู้เชิงวิชาชีพลงในใบงานดังนี้:

1. ตรวจสอบความถูกต้องในการเตรียมตัวติดตั้ง VS Code:
   - บันทึกภาพหน้าต่างติดตั้ง (Setup Wizard) ขั้นตอน Select Additional Tasks ที่มีการทำเครื่องหมายถูกที่ช่อง:
     [✓] Add "Open with Code" action to Windows Explorer...
     [✓] Add to PATH (requires shell restart)
   - อธิบายเหตุผลในเชิงวิสาสะเทคนิคของการติ๊กเลือก "Add to PATH"

2. จัดเตรียมไดเรกทอรีโปรเจกต์ตามมาตรฐานรายวิชา:
   - เข้าไปที่ Drive D: ของเครื่องคอมพิวเตอร์ และทำการสร้างโฟลเดอร์ด้วยรูปแบบ "เลขที่_ชื่อภาษาอังกฤษ" เช่น D:\\12_john
   - บันทึกภาพหน้าต่าง Windows Explorer เพื่อยืนยันว่าพาธที่ตั้งถูกต้องสมบูรณ์ ไม่มีอักขระพิเศษหรือภาษาไทย

3. สอบทานและสั่งเปิด Workspace ผ่าน CLI:
   - เปิดหน้าต่าง Command Prompt (cmd)
   - พิมพ์คำสั่งนำทางไปยังโฟลเดอร์โครงการที่เตรียมไว้ (พิมพ์ d: ตามด้วย cd 12_john)
   - สั่งพิมพ์คำสั่ง code . เพื่อเปิด VS Code
   - บันทึกภาพหน้าจอ Command Prompt ขณะที่กำลังคีย์คำสั่ง และภาพโปรแกรม VS Code ที่เปิดตัวขึ้นมาโดยชี้ตำแหน่ง Explorer ไปที่ Workspace ไดรฟ์ D ดังกล่าว`;

  const getTabButtonClass = (area) => {
    const base = "py-2 rounded-lg border font-semibold cursor-pointer transition-colors text-center text-xs";
    if (vscodeActiveArea === area) {
      return `${base} bg-orange-600 border-orange-500 text-white`;
    }
    return `${base} bg-white border-slate-200 text-slate-700 hover:bg-slate-55`;
  };

  return (
    <div className="font-sans text-zinc-800 pb-24 relative">
      
      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <AmbientBackdrop blobs={OOP1_BLOBS} />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── STEP 1: การแนะนำเครื่องมือ Visual Studio Code ────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 1: การแนะนำเครื่องมือเขียนรหัสโปรแกรม Visual Studio Code"
          icon={<Cpu className="w-6 h-6 text-orange-500" />}
          description="การทำความเข้าใจสถาปัตยกรรมและคุณสมบัติของโปรแกรมแก้ไขโค้ดสมัยใหม่ในการพัฒนาแอปพลิเคชัน"
          variant="default"
          accent="orange"
        >
          {/* ดีไซน์เปิดโปร่งโล่งแบบไร้กรอบ (Fluid Open-Air Layout) */}
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              ในการเขียนโปรแกรมเชิงวัตถุ (OOP) เราหลีกเลี่ยงการเขียนโค้ดลงบนโปรแกรมพิมพ์ข้อความธรรมดาอย่าง Notepad เนื่องจากไม่มีกลไกช่วยเหลือ เช่น การจดจำคำสั่ง สีสันของโค้ด หรือการคอมไพล์งานด่วน 
              ดังนั้น เราจึงต้องเลือกใช้ <span className="bg-orange-50/60 border border-orange-200/50 px-2.5 py-0.5 rounded-lg text-orange-700 font-semibold text-sm">Visual Studio Code (VS Code)</span> ซึ่งเป็นโปรแกรมแก้ไขโค้ดระดับแนวหน้าของโลกที่เบา รวดเร็ว และสามารถอัปเกรดติดตั้งตัวแปลภาษาเพิ่มเติมได้อิสระ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ConceptCard 
                symbol="Lightweight"
                title="น้ำหนักเบาและตอบสนองเร็ว"
                description="บิวต์อินด้วยสถาปัตยกรรมประสิทธิภาพสูง สั่งพิมพ์ประมวลผลได้ฉับพลันโดยไม่หนัก RAM เครื่อง"
                accent="orange"
              />
              <ConceptCard 
                symbol="Extensions"
                title="ระบบส่วนเสริมระดับสากล"
                description="ตลาด Extensions Marketplace ขนาดใหญ่ ช่วยดึงความสามารถการเช็คและวิเคราะห์คลาส OOP ภาษา Python"
                accent="amber"
              />
              <ConceptCard 
                symbol="Integrated"
                title="รวมเครื่องมือจบในที่เดียว"
                description="มีหน้าต่าง Command Terminal และระบบจัดการคุมเวอร์ชัน Git ติดตั้งพร้อมในหน้าต่างหลักโปรแกรม"
                accent="rose"
              />
            </div>
          </div>
        </SectionBlock>

        {/* ─── STEP 2: การดาวน์โหลดและเปรียบเทียบไฟล์ติดตั้ง ────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 2: การดาวน์โหลดและเปรียบเทียบไฟล์ติดตั้งผู้ใช้งาน (User vs System Installer)"
          icon={<Download className="w-6 h-6 text-amber-500" />}
          description="การวิเคราะห์ขอบเขตสิทธิ์และการบันทึกสิทธิ์ของไฟล์ลงสู่ระบบ Registry ของระบบปฏิบัติการคอมพิวเตอร์"
          variant="default"
          accent="amber"
        >
          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              เมื่อเปิดหน้าเว็บดาวน์โหลดทางการของไมโครซอฟท์ <span className="bg-amber-50/60 border border-amber-200/50 px-2.5 py-0.5 rounded-lg text-amber-700 font-semibold text-sm">code.visualstudio.com</span>
              ระบบจะแสดงตัวเลือกการติดตั้งที่แตกต่างกันตามระดับสิทธิ์ความปลอดภัยในสถาบันการศึกษาหรือคอมพิวเตอร์เชิงอาชีพ โดยแบ่งขอบเขตหลักได้เป็น 2 ประเภทใหญ่ดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[4px] border-l-cyan-500/80">
                <h4 className="font-bold text-slate-800 text-[16px] mb-2">User Installer (แบบผู้ใช้ทั่วไป - แนะนำ)</h4>
                <p className="text-[14px] text-slate-500 leading-relaxed font-sans mb-4">
                  ติดตั้งไฟล์หลักลงในโฟลเดอร์ส่วนตัวของ Account ปัจจุบัน (เช่น AppData\Local\Programs) **ไม่ต้องใช้สิทธิ์ระดับผู้ดูแลระบบ (Administrator Privilege)** มีความปลอดภัยสูงสุดในการเรียนในห้องปฏิบัติการคอมพิวเตอร์ของโรงเรียนที่ถูกล็อกรหัสแอดมินไว้
                </p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-mono text-[12.5px] text-slate-600">
                  Path: AppData\Local\Programs\Microsoft VS Code
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[4px] border-l-orange-500/80">
                <h4 className="font-bold text-slate-800 text-[16px] mb-2">System Installer (แบบสิทธิ์เครื่องหลัก)</h4>
                <p className="text-[14px] text-slate-500 leading-relaxed font-sans mb-4">
                  ติดตั้งลงในระบบส่วนกลางของคอมพิวเตอร์ (Program Files) **จำเป็นต้องป้อนรหัสสิทธิ์ Administrator** โปรแกรมจะสามารถเรียกใช้งานได้จากทุกๆ บัญชีผู้ใช้งานที่มีการสร้างขึ้นมาใช้งานร่วมกันในเครื่องนี้
                </p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-mono text-[12.5px] text-slate-600">
                  Path: C:\Program Files\Microsoft VS Code
                </div>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* ─── STEP 3: การรันติดตั้งและ Add to PATH ─────────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 3: กระบวนการติดตั้งและการลงทะเบียนระบบ PATH (Setup Wizard)"
          icon={<Settings className="w-6 h-6 text-orange-500" />}
          description="การติดตั้งจำลองการตั้งค่าตัวเลือกสำคัญบน Windows เพื่อให้คำสั่งย่อรันได้สมบูรณ์แบบ"
          variant="default"
          accent="orange"
        >
          <div className="space-y-6 leading-relaxed mb-8">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              ในขั้นตอนติดตั้งโปรแกรม VS Code บนระบบปฏิบัติการ Windows หน้าต่างการเลือกตั้งค่าเสริมเพิ่มเติม (Select Additional Tasks) มีความสำคัญสูงสุดในการอำนวยความสะดวกในวิชาชีพโปรแกรมเมอร์ 
              นักศึกษาควรเช็คถูกที่ช่อง **Add "Open with Code"** เพื่อเปิดใช้สิทธิ์คลิกขวาที่ไดเรกทอรี และเช็คที่ช่อง **Add to PATH** เพื่อลงทะเบียนเส้นทางสำหรับเรียกใช้งานผ่านหน้าต่างคอมมานด์ไลน์
            </p>

            <div className="bg-orange-50/60 backdrop-blur-md border border-orange-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-orange-500">
              <h4 className="font-bold text-orange-900 text-[15px] mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-orange-500" />
                จุดวิเคราะห์ทางเทคนิค: ทำไมถึงต้อง Add to PATH?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                การคลิก Add to PATH จะนำตำแหน่งไดเรกทอรีของโปรแกรมลงไปบันทึกไว้ในสิ่่งแวดล้อมระบบ ทำให้เราสามารถพิมพ์คำสั่ง <code>code .</code> เพื่อสั่งเปิด VS Code ขึ้นมาทำงานในโฟลเดอร์ปัจจุบันที่สั่งการอยู่ได้โดยทันทีโดยไม่ต้องไปค้นหาพาธโปรแกรมแบบแมนนวล
              </p>
            </div>
          </div>

          {/* SIMULATOR 1: VS Code Setup Dialog Wizard Mockup */}
          <SimulatorShell
            title="เครื่องจำลองตัวช่วยติดตั้ง (Visual Studio Code Installer Setup Wizard)"
            accentBg="bg-orange-50/60"
            iconColor="text-orange-600"
            icon={<Settings className="w-6 h-6 text-orange-600" />}
          >
            <div className="max-w-2xl mx-auto bg-slate-100 border border-slate-200 rounded-2xl p-6 shadow-inner text-slate-800 relative">
              
              {/* Installer Top Header */}
              <div className="border-b border-slate-200 pb-3 mb-4 flex justify-between items-center select-none">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Laptop className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-xs text-slate-700 font-mono">Setup - Visual Studio Code (User Installer)</span>
                </div>
                <div className="text-[10px] text-slate-400 font-bold tracking-widest font-mono">STEP 3 / 6</div>
              </div>

              {/* Wizard Content Steps */}
              {installerState.step === 'welcome' && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h3 className="text-md font-bold text-slate-800 leading-snug mb-1">Select Additional Tasks (เลือกงานเสริมเพิ่มเติม)</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      โปรดเลือกงานตั้งค่าระบบด้านล่างที่คุณต้องการให้ตัวช่วยติดตั้งทำการลงระบบขณะดำเนินงานติดตั้ง VS Code:
                    </p>
                  </div>

                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-3.5">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">// ตัวเลือกพาธระบบและความคุ้มค่า:</span>
                    
                    <label className="flex items-start gap-3.5 cursor-pointer text-xs font-bold text-orange-950 bg-orange-50/30 p-2 border border-orange-200/50 rounded-lg select-none">
                      <input 
                        type="checkbox"
                        checked={installerState.addPath}
                        onChange={() => handleCheckboxChange('addPath')}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer mt-0.5"
                      />
                      <div>
                        <span>Add to PATH (requires shell restart)</span>
                        <p className="text-[10px] font-normal text-orange-600/90 mt-0.5">ลงทะเบียนโปรแกรมเข้ากับบรรทัดคำสั่งเพื่อให้ระบบสั่งพิมพ์ code . เรียกใช้งานโปรเจกต์ได้สำเร็จ</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3.5 cursor-pointer text-xs font-semibold text-slate-700 select-none pl-2">
                      <input 
                        type="checkbox"
                        checked={installerState.openMenu}
                        onChange={() => handleCheckboxChange('openMenu')}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer mt-0.5"
                      />
                      <div>
                        <span>Add "Open with Code" action to Windows Explorer directory context menu</span>
                        <p className="text-[10px] text-slate-400 font-normal mt-0.5">สิทธิ์ในการคลิกขวาที่โฟลเดอร์ใดๆ เพื่อสั่งเปิดเข้าทำงานในโปรแกรมแก้ไขโค้ดได้ทันที</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3.5 cursor-pointer text-xs font-semibold text-slate-700 select-none pl-2">
                      <input 
                        type="checkbox"
                        checked={installerState.createDesktop}
                        onChange={() => handleCheckboxChange('createDesktop')}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer mt-0.5"
                      />
                      <div>
                        <span>Create a desktop icon (สร้างไอคอนไว้บนหน้าจอเดสก์ท็อป)</span>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      onClick={startInstallation}
                      className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 shadow"
                    >
                      Install (เริ่มติดตั้ง)
                    </button>
                  </div>
                </div>
              )}

              {installerState.step === 'installing' && (
                <div className="flex flex-col justify-center items-center py-10 space-y-4">
                  <RefreshCw className="w-12 h-12 text-orange-600 animate-spin" />
                  <div className="text-center space-y-1">
                    <span className="font-bold text-sm">กำลังติดตั้งระบบสารสนเทศ... {installerState.progress}%</span>
                    <p className="text-[11px] text-slate-400">กำลังคัดลอกไฟล์โปรแกรมและอัปเดตค่ารีจิสทรีในพาธตัวแปร</p>
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
                <div className="flex flex-col justify-center items-center py-6 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">VS Code Setup Completed (ลงระบบโปรแกรมสำเร็จ!)</h4>
                    <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                      ติดตั้งสภาพแวดล้อม IDE ลงในเครื่องเรียบร้อยแล้ว ดำเนินการต่อสู่การจัดเตรียมโฟลเดอร์ Workspace
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg text-[11px] text-orange-700 max-w-md font-sans">
                    {installerState.addPath 
                      ? '✓ ลงระบบ PATH สำเร็จ: ระบบสามารถเรียกใช้งานคำสั่ง code . ใน CLI ได้ในพิกัด D:\\ได้แล้ว'
                      : '⚠️ ระวัง: ยังไม่ได้เพิ่มค่าลง PATH คุณจะไม่สามารถใช้คำสั่งย่อรันโปรแกรมได้ใน Terminal'}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const element = document.getElementById('step4-workspace-section');
                        if(element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 shadow flex items-center gap-1.5"
                    >
                      เข้าสู่ขั้นตอนถัดไป <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={resetInstaller}
                      className="px-4 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95"
                    >
                      รีเซ็ตค่าติดตั้ง
                    </button>
                  </div>
                </div>
              )}

            </div>
          </SimulatorShell>
        </SectionBlock>

        {/* ─── STEP 4: การจัดโครงสร้างโฟลเดอร์ไดรฟ์ D ──────────────────────────────── */}
        <section id="step4-workspace-section" className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-amber-600 tracking-wider uppercase">
              ขั้นตอนที่ 4: การจัดเตรียมพื้นที่การเรียนรู้ในไดรฟ์ D (Project Workspace Setup)
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสร้างโฟลเดอร์แบบแผนจัดโครงสร้างโครงการวิชาเขียนโปรแกรม
            </h3>
          </div>
          
          <div className="space-y-6 leading-relaxed">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              ในการบริหารคลังระบบการเรียนการสอนของผู้สอน นักเรียนทุกคนจำเป็นต้องจัดเก็บรหัสโค้ดงานอย่างเป็นระบบ ระเบียบ และตรวจสอบง่าย 
              โดยผู้สอนได้กำหนดมาตรฐานให้สร้างที่ตั้งโครงการในเครื่องดังนี้:
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-amber-500/80">
              <span className="text-sm font-bold text-amber-600 font-mono tracking-wider uppercase">DIRECTORY REGULATION STANDARD</span>
              <h4 className="font-extrabold text-slate-800 text-[18px] mt-2 mb-3">รูปแบบพาธที่ตั้ง: D:\[เลขที่]_[ชื่อภาษาอังกฤษ]</h4>
              
              <ul className="space-y-3.5 pl-2 mb-6">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <span className="text-[15px] text-slate-600">
                    <strong className="text-slate-800">ตำแหน่งไดรฟ์ (Drive Location):</strong> ต้องสร้างโฟลเดอร์ไว้ภายในไดรฟ์ <strong className="text-amber-700">D:\</strong> เสมอ เพื่อความปลอดภัยจากการถูกล้างค่าจากระบบรีสตาร์ทแช่แข็งไดรฟ์ C
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <span className="text-[15px] text-slate-600">
                    <strong className="text-slate-800">รูปแบบการสะกดชื่อ (Naming Format):</strong> ใช้เครื่องหมายขีดล่าง (Underscore) คั่นระหว่างเลขลำดับเลขที่ในห้องเรียน และชื่อตัวภาษาอังกฤษอักษรเล็ก เช่น <strong className="text-amber-700 font-mono">D:\12_john</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <span className="text-[15px] text-slate-600">
                    <strong className="text-slate-800">ข้อควรระวัง (Critical Warning):</strong> ห้ามมีภาษาไทย สระ หรือการเว้นวรรคช่องว่างในชื่อโฟลเดอร์เป็นอันขาด เพราะจะทำให้ตัวแปลภาษาไพธอนประมวลค่าผิดพลาดเนื่องจาก Encoding ของระบบต่างประเภทกัน
                  </span>
                </li>
              </ul>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/50 flex items-center gap-3">
                <Info className="w-6 h-6 text-amber-500 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  เมื่อนักเรียนเตรียมพิกัด Workspace นี้เสร็จสิ้นแล้ว ในขั้นตอนที่ 5 เราจะดำเนินการเปิดใช้งานพิกัดนี้ขึ้นมาบนตัวแก้ไขรหัสผ่านการพิมพ์บรรทัดคำสั่งอย่างรวดเร็วระดับสากล
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STEP 5: การสอบทานระบบผ่านบรรทัดคำสั่ง CLI ────────────────────────────── */}
        <SectionBlock
          title="ขั้นตอนที่ 5: การสอบทานตำแหน่งพาธและเรียกเปิดระบบเขียนโค้ด (CLI Launch Verification)"
          icon={<Terminal className="w-6 h-6 text-rose-500" />}
          description="การสั่งเปิดใช้งาน Workspace ในไดรฟ์ D ที่ลงระบบไว้ ผ่านคำสั่งบรรทัดคอมมานด์ code ."
          variant="default"
          accent="rose"
        >
          <div className="space-y-6 leading-relaxed mb-8">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              เมื่อติดตั้งโปรแกรมและเตรียมโฟลเดอร์เสร็จแล้ว เราจะทำการเปิดสอบทานระบบด้วยการพิมพ์คำสั่งย่อผ่าน <span className="bg-rose-50/60 border border-rose-200/50 px-2.5 py-0.5 rounded-lg text-rose-700 font-semibold text-sm">Command Prompt</span> 
              โดยจำลองการนำทางไดเรกทอรีไปยังตำแหน่งโฟลเดอร์ D:\12_john และพิมพ์คำสั่งย่อที่ได้รับการลงทะเบียนในค่า PATH 
              นั่นคือคำสั่ง <code className="bg-slate-900 text-rose-300 px-2 py-0.5 rounded font-mono text-[13.5px]">code .</code> (หมายความว่า: ให้เอาโปรแกรม VS Code มาเปิดทำงานตรงตำแหน่งโฟลเดอร์ปัจจุบันนี้ทันที)
            </p>
          </div>

          {/* SIMULATOR 2: CLI Console & PATH Launch */}
          <SimulatorShell
            title="เครื่องจำลองคำสั่งสั่งรันโปรเจกต์ (CLI Launcher & Terminal PATH Simulator)"
            accentBg="bg-rose-50/60"
            iconColor="text-rose-600"
            icon={<FolderPlus className="w-6 h-6 text-rose-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Command Pads (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">COMMAND ENGINE</span>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-2">คลิกจำลองลำดับขั้นตอนคำสั่งปฏิบัติงาน:</h4>
                  
                  <div className="space-y-2.5">
                    {/* Stage 1: Move to D */}
                    <button
                      onClick={() => handleShortcutClick('d:')}
                      className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500/40 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-between"
                    >
                      <span>1. ย้ายตำแหน่งไปไดรฟ์ D (พิมพ์ d:)</span>
                      <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-400">Step 1</span>
                    </button>

                    {/* Stage 2: Cd into 12_john */}
                    <button
                      onClick={() => handleShortcutClick('cd 12_john')}
                      className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500/40 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-between"
                    >
                      <span>2. นำทางเข้าโฟลเดอร์เลขที่ (cd 12_john)</span>
                      <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-400">Step 2</span>
                    </button>

                    {/* Stage 3: Launch Code . */}
                    <button
                      onClick={() => handleShortcutClick('code .')}
                      className="w-full text-left px-4 py-3 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-900/40 hover:border-rose-500 text-rose-300 rounded-xl text-sm font-mono font-bold cursor-pointer transition-all duration-200 active:scale-[0.98] flex items-center justify-between"
                    >
                      <span>3. สั่งเปิด VS Code ตรงโฟลเดอร์ (code .)</span>
                      <span className="text-[10px] bg-rose-500/25 px-2 py-0.5 rounded text-rose-200 font-sans font-bold animate-pulse">รันระบบ</span>
                    </button>

                    {/* Stage 4: Check code version */}
                    <button
                      onClick={() => handleShortcutClick('code --version')}
                      className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 active:scale-[0.98]"
                    >
                      สอบทานเวอร์ชันความพร้อม (code --version)
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase tracking-wider">// คีย์ลัดสถานะ PATH:</span>
                  <div className="text-xs text-slate-400 leading-relaxed font-sans">
                    หากขั้นตอนที่ 3 ติ๊กช่อง **Add to PATH** ตัวเลือกสั่งการย่อจะรันได้สำเร็จสมบูรณ์ทันที
                  </div>
                </div>
              </div>

              {/* Right Windows Console Screen (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 shadow-2xl flex-1 flex flex-col justify-between min-h-[300px] relative font-mono text-[13.5px] leading-relaxed text-zinc-200">
                  <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3"># WINDOWS SYSTEM CONSOLE</span>
                  
                  <div className="mt-6 flex-1 overflow-y-auto max-h-[240px] no-scrollbar space-y-1 select-all text-zinc-300">
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="whitespace-pre-wrap">{log}</div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-2 text-[10px] text-slate-500 flex justify-between font-mono select-none">
                    <span>Active Path: D:\12_john</span>
                    <span>Registry: OK</span>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </SectionBlock>

        {/* ─── STEP 6: ส่วนประกอบหน้าตาโปรแกรม VS Code ──────────────────────────────── */}
        <section id="vscode-ui-workspace" className="space-y-6 transition-all duration-700">
          <div className="border-b border-zinc-200/80 pb-4 flex justify-between items-center">
            <div>
              <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
                ขั้นตอนที่ 6: การสำรวจส่วนประกอบและหน้าตาโปรแกรม (VS Code Interface Walkthrough)
              </span>
              <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
                โครงสร้างอินเตอร์เฟสและกล่องเครื่องมือหลักในห้องทำงาน VS Code
              </h3>
            </div>
            {vsCodeLaunched && (
              <span className="bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 animate-pulse shadow-sm">
                <Check className="w-4 h-4 stroke-[3]" /> เปิด Workspace D:\12_john สำเร็จ
              </span>
            )}
          </div>

          <div className="space-y-6 leading-relaxed mb-6">
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600">
              เมื่อหน้าต่างโปรแกรมแก้ไขโค้ดถูกรันขึ้นมา หน้าตาการทำเลย์เอาต์จะประกอบด้วย 4 คอลัมน์พิกัดแกนสำหรับการแบ่งหน้าที่งานเขียนโค้ด 
              โปรดนำเมาส์คลิกสำรวจตำแหน่งในกระดานแผงด้านล่างเพื่อวิเคราะห์คุณประโยชน์ทางอาชีพของแต่ละแถบปุ่ม:
            </p>
          </div>

          {/* SIMULATOR 3: Interactive VS Code UI Workspace Explorer */}
          <SimulatorShell
            title="ห้องปฏิบัติการหน้าตาโปรแกรมเสมือนจริง (VS Code Interactive UI Explorer)"
            accentBg="bg-slate-55"
            iconColor="text-slate-800"
            icon={<Layout className="w-6 h-6 text-slate-800" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
              
              {/* Left Mock Editor Interface (8 cols) */}
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl min-h-[400px]">
                
                {/* VS Code title bar */}
                <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 select-none border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="font-mono text-[11px] text-slate-500 ml-1 font-bold">1.1_hello.py - 12_john - Visual Studio Code [Workspace Drive D]</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-600">PyVM compiler active</span>
                </div>

                {/* Main Interface Layout below title bar */}
                <div className="flex-1 flex overflow-hidden">
                  
                  {/* Part 1: Activity Bar (Left icon list) */}
                  <div 
                    onClick={() => setVscodeActiveArea('activity')}
                    className={`w-12 bg-slate-950 flex flex-col justify-between py-4 border-r border-slate-800 items-center cursor-pointer transition-colors duration-200
                      ${vscodeActiveArea === 'activity' ? 'bg-orange-500/10 border-r-2 border-r-orange-500' : 'hover:bg-slate-900/50'}`}
                  >
                    <div className="space-y-4 text-slate-400 flex flex-col items-center">
                      <div className={`p-1.5 rounded-lg transition-colors ${vscodeActiveArea === 'activity' ? 'text-orange-500 bg-orange-500/10' : ''}`}><FolderPlus className="w-5 h-5" /></div>
                      <div className="p-1.5 rounded-lg text-slate-600"><Terminal className="w-5 h-5" /></div>
                      <div className="p-1.5 rounded-lg text-slate-600"><Cpu className="w-5 h-5" /></div>
                    </div>
                    <div className="text-slate-600"><Settings className="w-5 h-5" /></div>
                  </div>

                  {/* Part 2: Sidebar (File Explorer) */}
                  <div 
                    onClick={() => setVscodeActiveArea('sidebar')}
                    className={`w-48 bg-slate-900/95 border-r border-slate-800 p-4 font-mono text-[11.5px] cursor-pointer transition-colors duration-200 flex flex-col justify-between
                      ${vscodeActiveArea === 'sidebar' ? 'bg-orange-500/5 border-r-2 border-r-orange-500' : 'hover:bg-slate-900/30'}`}
                  >
                    <div>
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[9.5px] mb-3 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-orange-500" /> EXPLORER: 12_JOHN
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <div className="flex items-center gap-1 text-slate-500 font-bold font-sans">✓ ไดรฟ์ D:\12_john</div>
                        <div className="pl-3 font-semibold text-orange-400 flex items-center gap-1">🗎 1.1_hello.py</div>
                        <div className="pl-3 text-slate-500 flex items-center gap-1">🗎 1.2_variables.py</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-600 font-bold tracking-wider">// workspace active</div>
                  </div>

                  {/* Part 3: Main Editor and Terminal vertical stack */}
                  <div className="flex-1 flex flex-col justify-between bg-slate-900">
                    
                    {/* Editor Space (Top) */}
                    <div 
                      onClick={() => setVscodeActiveArea('editor')}
                      className={`flex-1 p-5 font-mono text-[13px] leading-relaxed cursor-pointer transition-colors duration-200 border-b border-slate-800 relative
                        ${vscodeActiveArea === 'editor' ? 'bg-orange-500/5' : 'hover:bg-slate-900/30'}`}
                    >
                      <span className="text-[9px] font-mono text-slate-600 absolute top-2 right-4 font-bold tracking-widest">// editor group</span>
                      
                      {/* Active file tabs */}
                      <div className="flex border-b border-slate-800 -mx-5 -mt-5 mb-4 bg-slate-950/60 select-none">
                        <div className="px-4 py-1.5 bg-slate-900 border-r border-slate-800 text-orange-400 font-bold border-t-2 border-t-orange-500 flex items-center gap-1.5 text-xs">
                          1.1_hello.py
                        </div>
                        <div className="px-4 py-1.5 text-slate-500 text-xs">
                          1.2_variables.py
                        </div>
                      </div>

                      {/* Code line rows */}
                      <div className="space-y-1">
                        <div><span className="text-slate-600 mr-4 select-none">1</span><span className="text-slate-500"># โครงงานเขียนโค้ดวิชา OOP เลขที่ 12</span></div>
                        <div><span className="text-slate-600 mr-4 select-none">2</span><span className="text-orange-500">class</span> <span className="text-amber-300 font-bold">Workspace</span>:</div>
                        <div><span className="text-slate-600 mr-4 select-none">3</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-500">pass</span></div>
                        <div><span className="text-slate-600 mr-4 select-none">4</span></div>
                        <div><span className="text-slate-600 mr-4 select-none">5</span><span className="text-orange-500">print</span>(<span className="text-emerald-400">"ยินดีต้อนรับสู่ห้องเรียนครูแม็ค (สลักพิกัดห้อง Workspace ไดรฟ์ D สำเร็จ!)"</span>)</div>
                      </div>

                      {/* Floating Run Button inside Editor */}
                      <button
                        onClick={(e) => { e.stopPropagation(); runVscodeCode(); }}
                        disabled={vscodeCodeRunning}
                        className="absolute bottom-4 right-4 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg hover:scale-105 active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <PlayCircle className="w-4 h-4 animate-pulse" /> รันโค้ดสด (Run)
                      </button>
                    </div>

                    {/* Integrated Terminal Panel (Bottom) */}
                    <div 
                      onClick={() => setVscodeActiveArea('terminal')}
                      className={`h-40 bg-slate-950 border-t border-slate-800 p-4 font-mono text-[12.5px] leading-relaxed cursor-pointer transition-colors duration-200 flex flex-col justify-between
                        ${vscodeActiveArea === 'terminal' ? 'bg-orange-500/5' : 'hover:bg-slate-950/50'}`}
                    >
                      <div className="flex justify-between items-center select-none pb-2 border-b border-slate-900">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">TERMINAL (ไคลเอนต์จำลอง)</span>
                        <div className="flex gap-2">
                          <button onClick={(e) => { e.stopPropagation(); clearVscodeTerminal(); }} className="text-[9px] text-slate-500 hover:text-white font-sans uppercase">Clear logs</button>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto max-h-[90px] pt-2 space-y-1 text-emerald-400 select-all no-scrollbar">
                        {vscodeTerminalLogs.length === 0 && (
                          <span className="text-slate-600 italic text-xs select-none">รอคลิกปุ่ม "รันโค้ดสด (Run)" มุมขวาบนแผงเอดิเตอร์...</span>
                        )}
                        {vscodeTerminalLogs.map((log, i) => (
                          <div key={i} className="animate-fadeIn">{log}</div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* VS Code status bar */}
                <div className="bg-slate-950 px-4 py-1 flex justify-between text-[10px] text-slate-500 select-none border-t border-slate-800">
                  <span className="text-orange-500 font-bold">✓ PATH: Active</span>
                  <span>UTF-8 &nbsp;&nbsp;&nbsp;&nbsp; Python 3.13</span>
                </div>
              </div>

              {/* Right Area Description Cards (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-orange-400 blur-2xl opacity-15 pointer-events-none" />
                
                <div className="space-y-4">
                  <span className="px-3 py-1 bg-orange-50 border border-orange-200 text-orange-600 rounded-full font-bold text-xs select-none">
                    วิเคราะห์ตำแหน่ง UI
                  </span>
                  
                  <div className="space-y-2 pt-2 transition-all duration-300">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500 animate-pulse" />
                      {vscodeAreaDescriptions[vscodeActiveArea].title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-sans">
                      {vscodeAreaDescriptions[vscodeActiveArea].desc}
                    </p>
                  </div>
                </div>

                {/* Hint buttons to trigger details */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 mt-4">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">// ป้ายนำทางตำแหน่งด่วน:</span>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <button 
                      onClick={() => setVscodeActiveArea('activity')} 
                      className={getTabButtonClass('activity')}
                    >
                      Activity Bar
                    </button>
                    <button 
                      onClick={() => setVscodeActiveArea('sidebar')} 
                      className={getTabButtonClass('sidebar')}
                    >
                      Sidebar Explorer
                    </button>
                    <button 
                      onClick={() => setVscodeActiveArea('editor')} 
                      className={getTabButtonClass('editor')}
                    >
                      Editor Group
                    </button>
                    <button 
                      onClick={() => setVscodeActiveArea('terminal')} 
                      className={getTabButtonClass('terminal')}
                    >
                      Terminal Panel
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── SECTION 5: แบบประเมินความรอบรู้ทางวิชาการ (QuizEngine) ────────────────── */}
        <QuizEngine
          title="แบบทดสอบสถาปัตยกรรมและสภาพแวดล้อม VS Code"
          description="ทดสอบความรู้ความสมเหตุสมผลเชิงวิชาการของนักศึกษาผ่านกระบวนการตั้งค่าและส่วนประกอบของหน้าต่าง IDE"
          levels={OOP1_2_QUIZ}
          accentColor="from-orange-500/20 to-amber-500/20"
          icon={<Gamepad2 className="w-8 h-8 text-orange-500" />}
        />

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="งานมอบหมายกิจกรรมประยุกต์วิชาชีพ บทเรียนที่ 1.2" 
          taskText={teacherTaskContent} 
        />

      </main>
    </div>
  );
}
