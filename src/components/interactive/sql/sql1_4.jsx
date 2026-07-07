import React, { useState, useEffect, useRef } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  ConceptCard,
  SectionBlock,
  AmbientBackdrop,
  SQL1_BLOBS
} from '../shared';
import {
  Database,
  Code,
  Monitor,
  Download,
  Server,
  Terminal,
  Check,
  CheckCircle2,
  Play,
  ArrowRight,
  Lock,
  Settings,
  AlertCircle,
  Cpu,
  Layers,
  ChevronRight,
  FolderOpen,
  Plus,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SQL1_4() {
  // ─── Shared State between Simulators ───
  const [rootPassword, setRootPassword] = useState('admin123');
  const [isPasswordConfigured, setIsPasswordConfigured] = useState(false);

  // ─── Simulator 1: MySQL Installer State ───
  const [installerStep, setInstallerStep] = useState(1); // 1: Setup Type, 2: Installation, 3: Type & Network, 4: Password, 5: Apply, 6: Finish
  const [setupType, setSetupType] = useState('');
  const [installProgress, setInstallProgress] = useState({
    server: { percent: 0, status: 'pending' },
    workbench: { percent: 0, status: 'pending' },
    shell: { percent: 0, status: 'pending' }
  });
  const [isInstalling, setIsInstalling] = useState(false);
  const [networkPort, setNetworkPort] = useState('3306');
  const [tempPassword, setTempPassword] = useState('');
  const [tempConfirmPassword, setTempConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [applySteps, setApplySteps] = useState([
    { id: 1, name: 'เขียนไฟล์ตั้งค่าคอนฟิก (Writing configuration file)', status: 'pending' },
    { id: 2, name: 'ตั้งค่า Windows Service (Updating Windows service)', status: 'pending' },
    { id: 3, name: 'เริ่มต้นเซิร์ฟเวอร์ฐานข้อมูล (Starting MySQL Server)', status: 'pending' },
    { id: 4, name: 'ใช้สิทธิ์ความปลอดภัยเริ่มต้น (Applying security settings)', status: 'pending' }
  ]);
  const [isApplying, setIsApplying] = useState(false);

  // ─── Simulator 2: Workbench State ───
  const [workbenchStep, setWorkbenchStep] = useState('welcome'); // 'welcome', 'password_dialog', 'workspace'
  const [enteredPassword, setEnteredPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [schemas, setSchemas] = useState(['sys', 'sakila', 'world']);
  const [editorCode, setEditorCode] = useState('-- คลิกเลือกคำสั่ง SQL ด้านล่างเพื่อพิมพ์คำสั่ง\n');
  const [outputLogs, setOutputLogs] = useState([
    { status: 'info', time: '07:49:50', action: 'Workbench', message: 'เริ่มต้นโปรแกรม MySQL Workbench สำเร็จ', duration: '-' }
  ]);
  const [resultGrid, setResultGrid] = useState(null); // { columns: [], rows: [] }

  // ─── Password Strength Evaluator ───
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: 'ยังไม่ระบุ', color: 'text-zinc-400', barColor: 'bg-zinc-200', width: 'w-0' };
    if (pass.length < 4) return { label: 'อ่อนแอมาก (Too Short)', color: 'text-red-500', barColor: 'bg-red-500', width: 'w-1/4' };
    
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { label: 'อ่อนแอ (Weak)', color: 'text-rose-500', barColor: 'bg-rose-500', width: 'w-2/5' };
    if (score <= 3) return { label: 'ปานกลาง (Medium)', color: 'text-amber-500', barColor: 'bg-amber-500', width: 'w-3/5' };
    return { label: 'แข็งแกร่ง (Strong)', color: 'text-emerald-500', barColor: 'bg-emerald-500', width: 'w-full' };
  };

  const strength = getPasswordStrength(tempPassword);

  // ─── Simulator 1: Run Installation Progress ───
  const startInstalling = () => {
    if (isInstalling) return;
    setIsInstalling(true);
    
    let currentProduct = 'server';
    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        const next = { ...prev };
        if (next.server.status !== 'done') {
          next.server.status = 'installing';
          next.server.percent += 10;
          if (next.server.percent >= 100) {
            next.server.percent = 100;
            next.server.status = 'done';
          }
        } else if (next.workbench.status !== 'done') {
          next.workbench.status = 'installing';
          next.workbench.percent += 15;
          if (next.workbench.percent >= 100) {
            next.workbench.percent = 100;
            next.workbench.status = 'done';
          }
        } else if (next.shell.status !== 'done') {
          next.shell.status = 'installing';
          next.shell.percent += 20;
          if (next.shell.percent >= 100) {
            next.shell.percent = 100;
            next.shell.status = 'done';
            clearInterval(interval);
            setIsInstalling(false);
          }
        }
        return next;
      });
    }, 250);
  };

  // ─── Simulator 1: Apply Configuration Steps ───
  const startApplyingConfig = () => {
    if (isApplying) return;
    setIsApplying(true);

    let stepIndex = 0;
    const interval = setInterval(() => {
      setApplySteps((prev) => {
        const next = [...prev];
        if (stepIndex < next.length) {
          next[stepIndex].status = 'success';
          stepIndex++;
        } else {
          clearInterval(interval);
          setIsApplying(false);
        }
        return next;
      });
    }, 800);
  };

  // ─── Simulator 2: Database Query Execution ───
  const executeQuery = () => {
    const code = editorCode.trim();
    const timestamp = new Date().toLocaleTimeString();
    
    if (code.toUpperCase().startsWith('SHOW DATABASES')) {
      setResultGrid({
        columns: ['Database'],
        rows: schemas.map(schema => [schema])
      });
      setOutputLogs(prev => [
        { status: 'success', time: timestamp, action: 'SHOW DATABASES', message: `${schemas.length} row(s) returned`, duration: '0.001 sec' },
        ...prev
      ]);
    } else if (code.toUpperCase().startsWith('CREATE DATABASE')) {
      const dbMatch = code.match(/CREATE DATABASE\s+([a-zA-Z0-9_]+)/i);
      const dbName = dbMatch ? dbMatch[1] : null;
      
      if (!dbName) {
        setOutputLogs(prev => [
          { status: 'error', time: timestamp, action: 'CREATE DATABASE', message: 'Error: Syntax error, please specify database name', duration: '0.000 sec' },
          ...prev
        ]);
        return;
      }

      if (schemas.includes(dbName.toLowerCase())) {
        setOutputLogs(prev => [
          { status: 'error', time: timestamp, action: `CREATE DATABASE ${dbName}`, message: `Error: Can't create database '${dbName}'; database exists`, duration: '0.000 sec' },
          ...prev
        ]);
      } else {
        const updatedSchemas = [...schemas, dbName.toLowerCase()];
        setSchemas(updatedSchemas);
        setResultGrid(null);
        setOutputLogs(prev => [
          { status: 'success', time: timestamp, action: `CREATE DATABASE ${dbName}`, message: '1 row(s) affected', duration: '0.012 sec' },
          ...prev
        ]);
      }
    } else if (code.toUpperCase().startsWith('SELECT')) {
      setResultGrid({
        columns: ['Result_Output'],
        rows: [['MySQL Workbench Connected successfully!']]
      });
      setOutputLogs(prev => [
        { status: 'success', time: timestamp, action: 'SELECT ...', message: '1 row(s) returned', duration: '0.001 sec' },
        ...prev
      ]);
    } else {
      setOutputLogs(prev => [
        { status: 'error', time: timestamp, action: 'Execute', message: 'Error: Command not recognized in this simulator. Try: SHOW DATABASES; or CREATE DATABASE school_db;', duration: '0.000 sec' },
        ...prev
      ]);
    }
  };

  // Reset Workbench connection
  const resetWorkbench = () => {
    setWorkbenchStep('welcome');
    setEnteredPassword('');
    setLoginError('');
    setResultGrid(null);
    setSchemas(['sys', 'sakila', 'world']);
    setEditorCode('-- คลิกเลือกคำสั่ง SQL ด้านล่างเพื่อพิมพ์คำสั่ง\n');
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Intro Concept */}
        <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
          การเริ่มต้นจัดทำระบบฐานข้อมูลจำเป็นต้องอาศัยชุดซอฟต์แวร์ในการรองรับการเขียนประมวลผลคำสั่ง 
          ในหน่วยการเรียนรู้นี้จะแนะนำโครงสร้างความสัมพันธ์ระหว่าง **ระบบจัดการฐานข้อมูล (RDBMS)**, **ภาษาสื่อสาร (SQL)** 
          และ **โปรแกรมควบคุมกราฟิก (GUI)** เพื่อให้ผู้ปฏิบัติงานเห็นภาพสถาปัตยกรรมการจัดการทั้งหมด
        </p>

        {/* ─── Section 1: Roles and Functions ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              บทบาทและหน้าที่ / ความหมายเชิงระบบ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สถาปัตยกรรมการทำงานของโปรแกรมหลักในการจัดการข้อมูล
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Concept Card 1: MySQL */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-100/50 border border-blue-200/30 px-1.5 py-0.5 rounded">
                    RDBMS (Server)
                  </span>
                  <h4 className="text-[15px] font-bold text-slate-800 mt-1">MySQL Server</h4>
                </div>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ทำหน้าที่เป็นเครื่องแม่ข่าย (Server) หลักในการจัดเก็บ รักษาความปลอดภัย และประมวลผลข้อมูลเชิงสัมพันธ์ 
                รองรับการเชื่อมต่อจากผู้ใช้หลายรายพร้อมกันและควบคุมความเสถียรของธุรกรรม
              </p>
            </div>

            {/* Concept Card 2: SQL */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-100/50 border border-blue-200/30 px-1.5 py-0.5 rounded">
                    Standard Language
                  </span>
                  <h4 className="text-[15px] font-bold text-slate-800 mt-1">ภาษา SQL</h4>
                </div>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ภาษาคอมพิวเตอร์มาตรฐานที่ใช้สร้างสคริปต์คำสั่ง เพื่อบอกให้ MySQL Server ดำเนินการ 
                เช่น การสร้างคลังข้อมูล การกรองผลลัพธ์ข้อมูลเฉพาะกลุ่ม หรือตั้งกฎควบคุมสิทธิ์
              </p>
            </div>

            {/* Concept Card 3: MySQL Workbench */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-100/50 border border-blue-200/30 px-1.5 py-0.5 rounded">
                    Client GUI Tool
                  </span>
                  <h4 className="text-[15px] font-bold text-slate-800 mt-1">MySQL Workbench</h4>
                </div>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                โปรแกรมแสดงผลแบบกราฟิก (GUI Client) ช่วยอำนวยความสะดวกให้นักพัฒนาสามารถพิมพ์เขียนโค้ด SQL, 
                ออกแบบความสัมพันธ์ตาราง (EER Diagram) และติดตามสถิติการทำงานเซิร์ฟเวอร์โดยไม่ต้องพิมพ์ผ่าน command line
              </p>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Download and Acquisition ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              การเข้าถึงระบบ / ดาวน์โหลดซอฟต์แวร์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การจัดหาและการเลือกชุดติดตั้งอย่างเหมาะสม
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ผู้เรียนสามารถดาวน์โหลดระบบจัดการฐานข้อมูลระดับชุมชน (MySQL Community Server) และโปรแกรมจัดการได้ฟรี 
            โดยการจัดหาซอฟต์แวร์มีข้อพิจารณาที่ควรทำความเข้าใจดังนี้:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-blue-500/80 space-y-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 w-fit">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="text-[16px] font-bold text-slate-800">ลิงก์ดาวน์โหลดอย่างเป็นทางการ</h4>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ดาวน์โหลดฟรีสำหรับระเบียบการศึกษาและการใช้งานส่วนบุคคล ผ่านเว็บหลักของ MySQL:
              </p>
              <a 
                href="https://dev.mysql.com/downloads/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md cursor-pointer w-full justify-center group"
              >
                ดาวน์โหลด MySQL Community
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="bg-blue-50/60 backdrop-blur-md border border-blue-200/60 rounded-2xl p-5 border-l-[3px] border-l-blue-500 leading-relaxed space-y-3">
                <h4 className="text-[15px] font-bold text-blue-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  คำแนะนำในการเลือกเวอร์ชันติดตั้งสำหรับระบบปฏิบัติการ Windows
                </h4>
                <p className="text-[14px] text-slate-600">
                  สำหรับการใช้งานบน Windows แนะนำให้ใช้ไฟล์ **MySQL Installer for Windows** 
                  เนื่องจากเป็นตัวติดตั้งแบบรวมศูนย์ (All-in-One Wizard) ซึ่งระบบจะช่วยอำนวยความสะดวกในการดาวน์โหลดและจัดตั้งซอฟต์แวร์เสริมที่จำเป็นทั้งหมดในรอบเดียว
                </p>
              </div>

              {/* Comparison grid inside evolution panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/40 border border-white/20 p-4 rounded-xl">
                  <h5 className="text-[14px] font-bold text-slate-700 mb-1">Web Installer (Web Community)</h5>
                  <p className="text-[13px] text-slate-500">
                    ขนาดไฟล์เริ่มต้นประมาณ 2.5 MB ขนาดไฟล์เล็กมาก เนื่องจากจะทำการดาวน์โหลดไฟล์แพ็คเกจจริงจากอินเทอร์เน็ตทีละตัวระหว่างที่ผู้ติดตั้งกำลังดำเนินการรันการติดตั้ง เหมาะสมกับผู้ใช้ที่มีอินเทอร์เน็ตความเร็วสูงและต่อเนื่อง
                  </p>
                </div>
                <div className="bg-white/40 border border-white/20 p-4 rounded-xl">
                  <h5 className="text-[14px] font-bold text-slate-700 mb-1">Offline Installer (Installer Community)</h5>
                  <p className="text-[13px] text-slate-500">
                    ขนาดไฟล์ประมาณ 450 MB ดาวน์โหลดคลังแพ็คเกจซอฟต์แวร์แบบออฟไลน์ทั้งหมดเอาไว้ในไฟล์เดียว ทำให้สามารถนำไปติดตั้งลงเครื่องคอมพิวเตอร์อื่นๆ ที่ไม่ได้เชื่อมต่ออินเทอร์เน็ตหรือมีข้อจำกัดด้านความเร็วเครือข่ายได้สะดวก
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Installation & Configuration (Simulator 1) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              การติดตั้งระบบ / เครื่องมือปฏิบัติตามขั้นตอน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              กระบวนการติดตั้งและการกำหนดค่าระบบความปลอดภัยเบื้องต้น
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            กระบวนการติดตั้งชุดโปรแกรม MySQL จะมีขั้นตอนสำคัญในการกำหนดค่าความปลอดภัยและการล็อกพอร์ตการส่งสัญญาณเครือข่าย 
            จงฝึกฝนผ่านกล่องจำลองการทำงานด้านล่างนี้:
          </p>

          {/* ─── Simulator 1: MySQL Installer Shell ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="installer-simulator">
            
            {/* Control Panel (Left) */}
            <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[400px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                INSTALLATION WIZARD
              </span>
              
              <div className="space-y-5 mt-4">
                <div className="space-y-1">
                  <h4 className="text-[16px] font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    ผู้ช่วยติดตั้ง MySQL
                  </h4>
                  <p className="text-[13px] text-slate-400">
                    โปรดจำลองทำตามขั้นตอนการติดตั้งด้านขวา เพื่อเรียนรู้กระบวนการจัดเก็บไฟล์และสัญญะเครือข่าย
                  </p>
                </div>

                {/* Progress stepper */}
                <div className="space-y-3 text-sm">
                  {[
                    { step: 1, name: 'เลือก Setup Type' },
                    { step: 2, name: 'ดำเนินการติดตั้งไฟล์' },
                    { step: 3, name: 'ตั้งค่าเครือข่ายพอร์ต' },
                    { step: 4, name: 'ความปลอดภัย & รหัส root' },
                    { step: 5, name: 'ประมวลผลเซฟค่ากำหนด' },
                    { step: 6, name: 'การติดตั้งเสร็จสมบูรณ์' }
                  ].map((s) => (
                    <div 
                      key={s.step} 
                      className={`flex items-center gap-3 transition-colors duration-200 ${
                        installerStep === s.step 
                          ? 'text-blue-400 font-bold' 
                          : installerStep > s.step 
                            ? 'text-slate-400 line-through' 
                            : 'text-slate-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono border ${
                        installerStep === s.step 
                          ? 'bg-blue-500/20 border-blue-400 text-blue-400' 
                          : installerStep > s.step 
                            ? 'bg-slate-800 border-slate-700 text-slate-400' 
                            : 'bg-transparent border-slate-800 text-slate-600'
                      }`}>
                        {installerStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
                      </div>
                      <span className="text-[13px]">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Alert box */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 mt-6">
                <span className="text-[11px] text-slate-500 uppercase tracking-wide block font-mono">
                  สถานะความลับระบบ:
                </span>
                <div className="text-[13px] text-slate-300 font-mono mt-1 flex flex-col gap-1">
                  <div>พอร์ตเชื่อมต่อ: <span className="text-emerald-400 font-bold">{networkPort}</span></div>
                  <div>รหัสผ่าน Root: <span className="text-amber-400 font-bold">{isPasswordConfigured ? '●●●●●●●●' : '(ยังไม่ตั้งค่า)'}</span></div>
                </div>
              </div>
            </div>

            {/* Display Panel / Simulation Interface (Right) */}
            <div className="lg:col-span-8 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[420px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">
                MYSQL INSTALLER WINDOW
              </span>

              {/* Inside Window - Wizard Body */}
              <div className="flex-1 mt-6 flex flex-col justify-center">
                
                {/* Step 1: Choosing setup type */}
                {installerStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-[17px] font-bold text-white">Choosing a Setup Type</h4>
                      <p className="text-[12.5px] text-slate-400">โปรดเลือกรูปแบบแพ็คเกจเริ่มต้นสำหรับโปรแกรมที่จะประยุกต์ใช้งาน</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { type: 'Developer Default', desc: 'ติดตั้ง MySQL Server, Workbench, Shell และโปรแกรมเสริมที่จำเป็นครบวงจร (แนะนำเพื่อการเรียน)' },
                        { type: 'Server Only', desc: 'ติดตั้งเฉพาะเซิร์ฟเวอร์ MySQL หลักเพียงอย่างเดียว โดยไม่มีเครื่องมือ GUI มาให้' },
                        { type: 'Client Only', desc: 'ติดตั้งเฉพาะโปรแกรมเชื่อมต่อควบคุมภายนอกและไคลเอนต์ เช่น Workbench' },
                        { type: 'Full', desc: 'ติดตั้งไลบรารีซอฟต์แวร์ ตัวเชื่อมต่อภาษา และเอกสารคู่มือทั้งหมด 100%' }
                      ].map((t) => (
                        <button
                          key={t.type}
                          onClick={() => setSetupType(t.type)}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                            setupType === t.type
                              ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                              : 'bg-slate-900/60 border-white/10 hover:border-white/30 text-slate-300'
                          }`}
                        >
                          <h5 className="text-sm font-bold text-white flex items-center justify-between">
                            {t.type}
                            {t.type === 'Developer Default' && (
                              <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded">
                                แนะนำ
                              </span>
                            )}
                          </h5>
                          <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">{t.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Installation progress */}
                {installerStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-[17px] font-bold text-white">Installation Progress</h4>
                      <p className="text-[12.5px] text-slate-400">ตรวจสอบโปรแกรมที่กำลังดำเนินการจัดเตรียมลงระบบปฏิบัติการ</p>
                    </div>

                    <div className="space-y-4">
                      {/* Products installation row */}
                      {[
                        { key: 'server', name: 'MySQL Server 8.0.32' },
                        { key: 'workbench', name: 'MySQL Workbench 8.0.32' },
                        { key: 'shell', name: 'MySQL Shell 8.0.32' }
                      ].map((p) => {
                        const state = installProgress[p.key];
                        return (
                          <div key={p.key} className="bg-slate-900/60 border border-white/5 rounded-xl p-3.5 flex items-center justify-between">
                            <div className="space-y-1.5 flex-1 pr-6">
                              <div className="flex justify-between text-xs">
                                <span className="text-white font-bold">{p.name}</span>
                                <span className="text-slate-400 font-mono">{state.percent}%</span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-200" 
                                  style={{ width: `${state.percent}%` }}
                                />
                              </div>
                            </div>
                            <span className={`text-[12px] font-bold px-2 py-1 rounded shrink-0 ${
                              state.status === 'done'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : state.status === 'installing'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse'
                                  : 'bg-slate-800 text-slate-500'
                            }`}>
                              {state.status === 'done' ? 'Complete' : state.status === 'installing' ? 'Installing...' : 'Ready'}
                            </span>
                          </div>
                        );
                      })}

                      {/* Run Action button */}
                      {installProgress.shell.status !== 'done' && (
                        <button
                          onClick={startInstalling}
                          disabled={isInstalling}
                          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                        >
                          <Play className="w-4 h-4" />
                          {isInstalling ? 'กำลังดำเนินการดาวน์โหลดและติดตั้ง...' : 'คลิก Execute เพื่อเริ่มทำการติดตั้ง'}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Type and Networking */}
                {installerStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-[17px] font-bold text-white">Type and Networking</h4>
                      <p className="text-[12.5px] text-slate-400">กำหนดช่องสัญญาณพอร์ตในการสื่อสารร่วมกับแอปพลิเคชัน</p>
                    </div>

                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">
                          CONNECTIVITY METHOD (วิธีเชื่อมโยงเครือข่าย)
                        </label>
                        <select className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none">
                          <option>TCP/IP (มาตรฐานสำหรับการใช้งานในระบบปกติ)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1">
                            PORT NUMBER (พอร์ตมาตรฐาน)
                          </label>
                          <input 
                            type="text" 
                            value={networkPort}
                            onChange={(e) => setNetworkPort(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="3306"
                            className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1">
                            X PROTOCOL PORT
                          </label>
                          <input 
                            type="text" 
                            disabled 
                            value="33060"
                            className="w-full bg-slate-950/50 border border-white/5 rounded-lg py-2 px-3 text-sm text-slate-500 font-mono"
                          />
                        </div>
                      </div>

                      {networkPort !== '3306' && (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg p-3 text-xs leading-relaxed">
                          ⚠️ พอร์ต 3306 คือพอร์ตมาตรฐานสากลของระบบ MySQL 
                          การปรับพอร์ตไปเป็นเลขอื่นอาจทำให้นักเรียนสับสนเมื่อเชื่อมต่อผ่านซอฟต์แวร์ข้างนอกได้
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Accounts and Roles (Root Password) */}
                {installerStep === 4 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-[17px] font-bold text-white">Accounts and Roles</h4>
                      <p className="text-[12.5px] text-slate-400">สถาปนาสิทธิ์ผู้ดูแลระบบหลัก (Root Account) และจัดแจงความปลอดภัย</p>
                    </div>

                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 space-y-4">
                      <div className="bg-slate-950 border border-white/10 rounded-lg p-3">
                        <span className="text-[11px] text-slate-500 uppercase tracking-wide font-mono block">
                          คำเตือนความปลอดภัย:
                        </span>
                        <p className="text-[12px] text-slate-300 mt-1">
                          บัญชี **root** มีอำนาจเด็ดขาดในการสร้าง แก้ไข และลบข้อมูลทั้งหมดในระบบฐานข้อมูล 
                          โปรดระบุและเก็บรหัสผ่านของคุณให้ดี รหัสผ่านนี้จะนำไปป้อนทดสอบต่อในขั้นตอนการใช้งาน Workbench
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1">
                            MySQL Root Password (รหัสผ่านหลัก)
                          </label>
                          <div className="relative">
                            <input 
                              type={showPass ? 'text' : 'password'}
                              value={tempPassword}
                              onChange={(e) => setTempPassword(e.target.value)}
                              placeholder="ตั้งรหัสผ่านความปลอดภัย..."
                              className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:border-blue-500 focus:outline-none pr-10"
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPass(!showPass)}
                              className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-500 hover:text-slate-300 focus:outline-none"
                            >
                              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1">
                            Repeat Password (ยืนยันรหัสผ่านอีกครั้ง)
                          </label>
                          <input 
                            type="password"
                            value={tempConfirmPassword}
                            onChange={(e) => setTempConfirmPassword(e.target.value)}
                            placeholder="ยืนยันรหัสผ่านเดิม..."
                            className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        {/* Password strength & Match checks */}
                        {tempPassword && (
                          <div className="flex items-center justify-between text-xs pt-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400">ความปลอดภัยรหัสผ่าน:</span>
                              <span className={`font-bold ${strength.color}`}>{strength.label}</span>
                            </div>
                            <span className={tempPassword === tempConfirmPassword ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {tempConfirmPassword ? (tempPassword === tempConfirmPassword ? '✓ รหัสผ่านตรงกัน' : '✗ รหัสผ่านไม่ตรงกัน') : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Apply Configuration */}
                {installerStep === 5 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-[17px] font-bold text-white">Apply Configuration</h4>
                      <p className="text-[12.5px] text-slate-400">เขียนบันทึกค่ากำหนดเครือข่ายและระบบความปลอดภัยเพื่อลงทะเบียน</p>
                    </div>

                    <div className="space-y-3">
                      {applySteps.map((step) => (
                        <div key={step.id} className="bg-slate-900/60 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                          <span className="text-sm text-slate-300">{step.name}</span>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                            step.status === 'success'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {step.status === 'success' ? '✓' : ''}
                          </div>
                        </div>
                      ))}

                      {applySteps[3].status !== 'success' && (
                        <button
                          onClick={startApplyingConfig}
                          disabled={isApplying}
                          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                        >
                          <Settings className="w-4 h-4 animate-spin" />
                          {isApplying ? 'กำลังปรับแต่งฐานข้อมูลระบบ...' : 'คลิก Execute เพื่อบันทึกค่าและเริ่มต้นระบบ'}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 6: Installation Finished */}
                {installerStep === 6 && (
                  <div className="space-y-4 animate-fadeIn text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-[20px] font-bold text-white">Installation Complete!</h4>
                    <p className="text-[14px] text-slate-300 max-w-md mx-auto leading-relaxed">
                      ระบบจัดการฐานข้อมูล MySQL Server และเครื่องมือ MySQL Workbench 
                      ได้รับการจัดสรร ติดตั้ง และบันทึกรหัสผ่าน root สู่ระบบเรียบร้อยแล้ว
                    </p>
                    <div className="bg-slate-900/70 border border-white/5 p-4 rounded-2xl max-w-sm mx-auto text-left space-y-2 mt-4">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">ข้อมูลลงทะเบียน:</h5>
                      <div className="text-sm text-slate-300 font-mono">
                        <div>Host: <span className="text-white">localhost (127.0.0.1)</span></div>
                        <div>Port: <span className="text-white">{networkPort}</span></div>
                        <div>User: <span className="text-white">root</span></div>
                        <div>Password: <span className="text-white font-bold">{rootPassword}</span></div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Wizard Footer - Buttons */}
              <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center">
                <button
                  disabled={installerStep === 1 || installerStep === 6}
                  onClick={() => setInstallerStep(prev => prev - 1)}
                  className="px-4 py-2 bg-slate-900 text-slate-400 border border-white/5 rounded-lg text-xs font-semibold hover:text-white transition-all disabled:opacity-30 cursor-pointer"
                >
                  ย้อนกลับ (Back)
                </button>

                {installerStep < 6 ? (
                  <button
                    disabled={
                      (installerStep === 1 && !setupType) ||
                      (installerStep === 2 && installProgress.shell.status !== 'done') ||
                      (installerStep === 4 && (!tempPassword || tempPassword !== tempConfirmPassword)) ||
                      (installerStep === 5 && applySteps[3].status !== 'success')
                    }
                    onClick={() => {
                      if (installerStep === 4) {
                        setRootPassword(tempPassword);
                        setIsPasswordConfigured(true);
                      }
                      setInstallerStep(prev => prev + 1);
                    }}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
                  >
                    ถัดไป (Next)
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // Automatically trigger simulator 2 password verification sync
                      setInstallerStep(1);
                      setSetupType('');
                      setInstallProgress({
                        server: { percent: 0, status: 'pending' },
                        workbench: { percent: 0, status: 'pending' },
                        shell: { percent: 0, status: 'pending' }
                      });
                      setTempPassword('');
                      setTempConfirmPassword('');
                      setApplySteps([
                        { id: 1, name: 'เขียนไฟล์ตั้งค่าคอนฟิก (Writing configuration file)', status: 'pending' },
                        { id: 2, name: 'ตั้งค่า Windows Service (Updating Windows service)', status: 'pending' },
                        { id: 3, name: 'เริ่มต้นเซิร์ฟเวอร์ฐานข้อมูล (Starting MySQL Server)', status: 'pending' },
                        { id: 4, name: 'ใช้สิทธิ์ความปลอดภัยเริ่มต้น (Applying security settings)', status: 'pending' }
                      ]);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    ทดสอบติดตั้งใหม่อีกครั้ง
                  </button>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ─── Section 4: Operating System & Workbench (Simulator 2) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              การบริหารคลังข้อมูล / พื้นที่ปฏิบัติงาน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเชื่อมต่อระบบและเขียนสคริปต์บน MySQL Workbench
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ภายหลังจากสร้างระบบฐานข้อมูลแล้ว นักพัฒนาจะอาศัยโปรแกรม MySQL Workbench เป็นพื้นที่ปฏิบัติตามขั้นตอน 
            ในการเข้าทำงาน คุณต้องกรอกรหัสผ่านเพื่ออนุมัติสิทธิ์ และส่งคำสั่ง SQL ไปยัง MySQL Server เพื่อสืบค้นข้อมูล:
          </p>

          {/* ─── Simulator 2: MySQL Workbench Simulator ─── */}
          <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]" id="workbench-simulator">
            
            {/* Workbench OS-like Title Bar */}
            <div className="bg-slate-900 border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Simulated window circles */}
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono text-slate-400 pl-4 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-blue-400" />
                  MySQL Workbench 8.0 Community
                </div>
              </div>
              
              {workbenchStep === 'workspace' && (
                <button
                  onClick={resetWorkbench}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-white/5 text-[11px] text-slate-300 rounded font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  ตัดการเชื่อมต่อ (Disconnect)
                </button>
              )}
            </div>

            {/* Workbench Interface Content Area */}
            <div className="flex-1 flex flex-col justify-between relative bg-slate-900/40">
              
              {/* STEP 1: Welcome/Home Screen */}
              {workbenchStep === 'welcome' && (
                <div className="p-8 space-y-6 flex-1 flex flex-col justify-center animate-fadeIn">
                  <div className="space-y-1">
                    <h4 className="text-[19px] font-bold text-white">Welcome to MySQL Workbench</h4>
                    <p className="text-[12.5px] text-slate-400">เลือกกล่องโมดูลการเชื่อมต่อ (MySQL Connections) เพื่อเปิดใช้งานคลังข้อมูลภายใน</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Database Connection Card */}
                    <button
                      onClick={() => setWorkbenchStep('password_dialog')}
                      className="p-5 rounded-xl text-left bg-slate-900 border border-white/10 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer relative"
                    >
                      <span className="absolute top-3 right-3 text-[10px] bg-blue-500/20 text-blue-400 px-1 rounded font-mono font-bold">
                        TCP/IP
                      </span>
                      <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 w-fit mb-3 group-hover:scale-105 transition-transform">
                        <Server className="w-5 h-5" />
                      </div>
                      <h5 className="text-sm font-bold text-white">Local Instance 3306</h5>
                      <div className="text-[12px] text-slate-400 mt-2 font-mono space-y-0.5">
                        <div>Host: localhost:3306</div>
                        <div>User: root</div>
                      </div>
                    </button>

                    {/* Placeholder add connections card */}
                    <div className="p-5 rounded-xl border border-dashed border-white/15 hover:border-white/20 flex flex-col items-center justify-center text-center text-slate-500 gap-1 cursor-not-allowed">
                      <Plus className="w-6 h-6" />
                      <span className="text-[12px]">New Connection</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Password Prompt Dialog Overlay */}
              {workbenchStep === 'password_dialog' && (
                <div className="p-8 flex-1 flex items-center justify-center animate-fadeIn bg-slate-950/80 backdrop-blur-sm absolute inset-0 z-20">
                  <div className="bg-slate-900 border border-white/10 rounded-xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative">
                    <h5 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                      Connect to MySQL Server
                    </h5>
                    
                    <div className="space-y-1">
                      <label className="text-[12px] text-slate-400 font-mono">
                        User: root@localhost:3306
                      </label>
                      <p className="text-[12.5px] text-slate-300">
                        ป้อนรหัสผ่านเพื่อเข้าสู่ระบบฐานข้อมูล (ระบุรหัสที่คุณกรอกในขั้นตอนการติดตั้ง):
                      </p>
                    </div>

                    <div className="space-y-2">
                      <input 
                        type="password"
                        value={enteredPassword}
                        onChange={(e) => {
                          setEnteredPassword(e.target.value);
                          setLoginError('');
                        }}
                        placeholder="รหัสผ่าน Root password..."
                        className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            // verify password
                            if (enteredPassword === rootPassword || enteredPassword === 'admin123') {
                              setWorkbenchStep('workspace');
                            } else {
                              setLoginError('รหัสผ่านไม่ถูกต้อง โปรดตรวจสอบกับรหัสผ่านด้านซ้าย หรือรหัสผ่านที่คุณกรอกในสเต็ปติดตั้ง');
                            }
                          }
                        }}
                      />

                      {loginError && (
                        <div className="text-rose-400 text-[12px] leading-relaxed">
                          ✗ {loginError}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between gap-3 pt-2">
                      <button
                        onClick={() => {
                          setWorkbenchStep('welcome');
                          setEnteredPassword('');
                          setLoginError('');
                        }}
                        className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold hover:text-white transition-all cursor-pointer border border-white/5"
                      >
                        ยกเลิก (Cancel)
                      </button>
                      <button
                        onClick={() => {
                          if (enteredPassword === rootPassword || enteredPassword === 'admin123') {
                            setWorkbenchStep('workspace');
                          } else {
                            setLoginError('รหัสผ่านไม่ถูกต้อง โปรดตรวจสอบกับรหัสผ่านด้านซ้าย หรือรหัสผ่านที่คุณกรอกในสเต็ปติดตั้ง');
                          }
                        }}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                      >
                        ตกลง (OK)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 & 4: Workbench Full Workspace (IDE Mode) */}
              {workbenchStep === 'workspace' && (
                <div className="flex-1 flex flex-col md:flex-row items-stretch animate-fadeIn">
                  
                  {/* Left Sidebar: Schemas Navigation */}
                  <div className="w-full md:w-56 bg-slate-950 border-r border-white/5 p-3 flex flex-col justify-between shrink-0">
                    <div className="space-y-4">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <FolderOpen className="w-3.5 h-3.5" />
                        Schemas (คลังข้อมูล)
                      </div>
                      
                      <div className="space-y-1">
                        {schemas.map((schema) => (
                          <div 
                            key={schema} 
                            className="flex items-center gap-2 text-xs font-mono py-1.5 px-2 hover:bg-slate-900 text-slate-300 rounded cursor-pointer"
                          >
                            <Database className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{schema}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 text-[11px] text-slate-500 font-mono">
                      Connected: root@3306
                    </div>
                  </div>

                  {/* Main Work Area: Query Editor + Result Grid + Output Console */}
                  <div className="flex-1 flex flex-col min-w-0">
                    
                    {/* Toolbar */}
                    <div className="bg-slate-900/80 border-b border-white/5 p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={executeQuery}
                          className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-sm"
                          title="Execute Query (สายฟ้า)"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Execute</span>
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">Query Editor 1</span>
                    </div>

                    {/* Query Input Area */}
                    <div className="flex-1 min-h-[160px] bg-slate-950 p-4 font-mono text-[13px] text-emerald-400 relative">
                      <textarea
                        value={editorCode}
                        onChange={(e) => setEditorCode(e.target.value)}
                        className="w-full h-full bg-transparent text-emerald-400 focus:outline-none resize-none border-0 p-0 font-mono text-[13px] leading-relaxed"
                        spellCheck="false"
                      />
                    </div>

                    {/* Interactive SQL presets click to fill */}
                    <div className="bg-slate-900 border-t border-white/5 p-3 flex flex-wrap gap-2.5 items-center">
                      <span className="text-[11px] font-bold text-slate-400">คำสั่งสปอยล์:</span>
                      <button
                        onClick={() => setEditorCode('SHOW DATABASES;')}
                        className="px-2.5 py-1.5 bg-slate-950/70 border border-white/10 hover:border-blue-500/50 hover:bg-slate-900 text-slate-300 font-mono text-xs rounded transition-all cursor-pointer"
                      >
                        SHOW DATABASES;
                      </button>
                      <button
                        onClick={() => setEditorCode('CREATE DATABASE school_db;')}
                        className="px-2.5 py-1.5 bg-slate-950/70 border border-white/10 hover:border-blue-500/50 hover:bg-slate-900 text-slate-300 font-mono text-xs rounded transition-all cursor-pointer"
                      >
                        CREATE DATABASE school_db;
                      </button>
                      <button
                        onClick={() => setEditorCode('SELECT "Hello World" AS message;')}
                        className="px-2.5 py-1.5 bg-slate-950/70 border border-white/10 hover:border-blue-500/50 hover:bg-slate-900 text-slate-300 font-mono text-xs rounded transition-all cursor-pointer"
                      >
                        SELECT ...;
                      </button>
                    </div>

                    {/* Result Grid Panel (Displays only on SELECT or SHOW) */}
                    {resultGrid && (
                      <div className="h-44 bg-slate-900/60 border-t border-white/10 flex flex-col min-w-0">
                        <div className="bg-slate-900 border-b border-white/5 px-3 py-1.5 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                          Result Grid
                        </div>
                        <div className="flex-1 overflow-auto">
                          <table className="w-full text-left text-xs font-mono border-collapse">
                            <thead>
                              <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400">
                                {resultGrid.columns.map((col, idx) => (
                                  <th key={idx} className="p-2 border-r border-white/5 font-bold">{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {resultGrid.rows.map((row, rowIdx) => (
                                <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/5 text-slate-300">
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="p-2 border-r border-white/5">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Output Console Screen (Bottom) */}
                    <div className="h-28 bg-slate-950 border-t border-white/10 flex flex-col min-w-0">
                      <div className="bg-slate-900 border-b border-white/5 px-3 py-1.5 text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase">
                        Action Output Log
                      </div>
                      <div className="flex-1 overflow-y-auto p-2 font-mono text-[11px] space-y-1.5">
                        {outputLogs.map((log, idx) => (
                          <div key={idx} className={`flex items-start gap-2 ${
                            log.status === 'success' 
                              ? 'text-emerald-400' 
                              : log.status === 'error' 
                                ? 'text-rose-400 animate-pulse' 
                                : 'text-slate-400'
                          }`}>
                            <span className="text-slate-600 shrink-0">[{log.time}]</span>
                            <span className="font-bold shrink-0">{log.action}:</span>
                            <span className="flex-1 break-all">{log.message}</span>
                            <span className="text-slate-600 shrink-0 font-bold">({log.duration})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="การวิเคราะห์การติดตั้งและการเขียนคำสั่งผ่านโปรแกรมจัดการฐานข้อมูล"
          taskText={`คำชี้แจง: ให้นักเรียนตอบคำถามประเมินผลการเรียนรู้ต่อไปนี้ เพื่อแสดงความเข้าใจขั้นตอนการจัดหา ติดตั้ง และใช้งานโปรแกรมจัดการฐานข้อมูล MySQL:

1. เพราะเหตุใดขั้นตอนการกักเก็บและระบุ "MySQL Root Password" ในการติดตั้งโปรแกรม จึงได้รับการประเมินว่าเป็นจุดที่วิกฤตที่สุดในแง่ของความปลอดภัยของระบบ จงอธิบายความรับผิดชอบของสิทธิ์ root
2. พอร์ตหลักในการระบุเส้นทางเพื่อสื่อสารข้อมูลไปยังเซิร์ฟเวอร์ MySQL บนเครื่องคือพอร์ตหมายเลขใด และหากพอร์ตดังกล่าวมีโปรแกรมอื่นในเครื่องใช้งานอยู่ก่อนแล้ว จะส่งผลกระทบและมีแนวทางแก้ไขอย่างไร
3. จงอธิบายกระบวนการส่งคำสั่งและการประมวลผลของคำสั่ง SQL จากหน้าต่าง Query Editor ใน MySQL Workbench ไปสู่หน่วยจัดเก็บข้อมูล พร้อมทั้งระบุความหมายของกล่อง Result Grid และ Output Panel ที่เป็นองค์ประกอบด้านล่าง`}
        />
      </main>
    </div>
  );
}
