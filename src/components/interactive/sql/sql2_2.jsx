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
  Table,
  Plus,
  Trash2,
  Play,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Settings,
  ChevronRight,
  X,
  Sparkles,
  Info,
  RefreshCw,
  Terminal,
  MousePointer,
  HelpCircle,
  Check,
  FileCode,
  ShieldAlert,
  BookOpen,
  Key,
  Link2,
  Zap,
  ArrowRightLeft
} from 'lucide-react';

export default function SQL2_2() {
  // Constraints Toggle States
  const [pkEnabled, setPkEnabled] = useState(true);
  const [nnEnabled, setNnEnabled] = useState(true);
  const [uqEnabled, setUqEnabled] = useState(true);
  const [fkEnabled, setFkEnabled] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);

  // Form Inputs
  const [inputId, setInputId] = useState('3');
  const [inputName, setInputName] = useState('สมจิต');
  const [inputEmail, setInputEmail] = useState('somjit@mail.com');
  const [inputClassId, setInputClassId] = useState('101');

  // Database Mock Data
  const departments = [
    { id: 101, name: 'Computer Science (CS)' },
    { id: 102, name: 'Information Tech (IT)' }
  ];

  const [students, setStudents] = useState([
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 }
  ]);

  // Terminal & Logs
  const [logMessages, setLogMessages] = useState([
    { time: '13:30:00', status: 'info', message: 'MySQL Constraints Validation Engine loaded.' },
    { time: '13:30:01', status: 'info', message: 'Referential integrity check: active. Parent: departments, Child: students.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  // Auto increment effect
  useEffect(() => {
    if (aiEnabled) {
      const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      setInputId(nextId.toString());
    }
  }, [aiEnabled, students]);

  // Handle row deletion to reset simulator data
  const resetSimulator = () => {
    setStudents([
      { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
      { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 }
    ]);
    setInputId(aiEnabled ? '3' : '3');
    setInputName('สมจิต');
    setInputEmail('somjit@mail.com');
    setInputClassId('101');
    setPkEnabled(true);
    setNnEnabled(true);
    setUqEnabled(true);
    setFkEnabled(true);
    setAiEnabled(true);
    setLogMessages([
      { time: new Date().toTimeString().split(' ')[0], status: 'info', message: 'Simulator reset to default state.' }
    ]);
  };

  // Generate dynamic SQL DDL representation
  const generateDDL = () => {
    return `CREATE TABLE students (
  id INT${pkEnabled ? ' PRIMARY KEY' : ''}${aiEnabled ? ' AUTO_INCREMENT' : ''},
  name VARCHAR(100)${nnEnabled ? ' NOT NULL' : ''},
  email VARCHAR(150)${uqEnabled ? ' UNIQUE' : ''},
  class_id INT,
  ${fkEnabled ? 'FOREIGN KEY (class_id) REFERENCES departments(id)' : '-- No Foreign Key Constraint'}
);`;
  };

  // Execute mock INSERT command
  const handleInsert = (e) => {
    e.preventDefault();
    
    const targetId = aiEnabled 
      ? (students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1)
      : parseInt(inputId, 10);

    const targetName = inputName.trim();
    const targetEmail = inputEmail.trim();
    const targetClassId = parseInt(inputClassId, 10);

    // SQL syntax trace representation
    const insertSQL = `INSERT INTO students (id, name, email, class_id) VALUES (${isNaN(targetId) ? 'NULL' : targetId}, '${targetName || 'NULL'}', '${targetEmail || 'NULL'}', ${targetClassId});`;
    addLog(`Running: ${insertSQL}`, 'info');

    // 1. Check Primary Key constraint
    if (pkEnabled) {
      if (isNaN(targetId)) {
        addLog(`Error Code: 1048. Column 'id' cannot be null (Primary Key restriction)`, 'error');
        return;
      }
      if (students.some(s => s.id === targetId)) {
        addLog(`Error Code: 1062. Duplicate entry '${targetId}' for key 'students.PRIMARY'`, 'error');
        return;
      }
    }

    // 2. Check Not Null constraint
    if (nnEnabled) {
      if (!targetName) {
        addLog(`Error Code: 1048. Column 'name' cannot be null`, 'error');
        return;
      }
    }

    // 3. Check Unique constraint
    if (uqEnabled && targetEmail) {
      if (students.some(s => s.email.toLowerCase() === targetEmail.toLowerCase())) {
        addLog(`Error Code: 1062. Duplicate entry '${targetEmail}' for key 'students.email_UNIQUE'`, 'error');
        return;
      }
    }

    // 4. Check Foreign Key constraint
    if (fkEnabled) {
      if (!departments.some(d => d.id === targetClassId)) {
        addLog(`Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (\`student_db\`.\`students\`, CONSTRAINT \`fk_students_departments\` FOREIGN KEY (\`class_id\`) REFERENCES \`departments\` (\`id\`))`, 'error');
        return;
      }
    }

    // Insert successful
    const newStudent = {
      id: isNaN(targetId) ? (students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1) : targetId,
      name: targetName || null,
      email: targetEmail || null,
      class_id: targetClassId
    };

    setStudents(prev => [...prev, newStudent]);
    addLog(`Query OK, 1 row affected. Row successfully inserted!`, 'success');

    // Reset some form values
    if (!aiEnabled) {
      setInputId(prev => (parseInt(prev, 10) + 1).toString());
    }
    setInputName('');
    setInputEmail('');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql2_2-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content (Fluid Open-Air Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              ข้อกำหนดความถูกต้อง / Database Constraints
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ข้อจำกัดความสมบูรณ์ของข้อมูล (Constraints) ใน MySQL
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              ข้อจำกัด (<span className="font-semibold text-zinc-800">Constraints</span>) คือ กฎเกณฑ์ที่กำหนดไว้สำหรับคอลัมน์ในตารางเพื่อควบคุมความถูกต้องและน่าเชื่อถือของข้อมูลในระบบฐานข้อมูล RDBMS ซึ่งจะป้องกันการป้อนข้อมูลที่ผิดพลาด หรือการสร้างข้อมูลขยะที่ขัดแย้งกับหลักโครงสร้างทางธุรกิจ
            </p>

            {/* Grid of 5 constraints cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch mt-6">
              
              {/* Constraint 1: Primary Key */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-indigo-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                    <Key className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">Primary Key (PK)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  คีย์หลักระบุตัวตนห้ามซ้ำซ้อนกันในแถวตาราง และต้องไม่เป็นค่าว่างเปล่า (NOT NULL) หนึ่งตารางจะมีได้เพียงคีย์เดียวเท่านั้น
                </p>
              </div>

              {/* Constraint 2: Foreign Key */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-emerald-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                    <ArrowRightLeft className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">Foreign Key (FK)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  คีย์นอกเชื่อมโยงความสัมพันธ์ไปยังตารางอื่น เพื่อจำกัดไม่ให้ป้อนค่า ID ที่ไม่มีอยู่จริงในตารางอ้างอิงหลัก
                </p>
              </div>

              {/* Constraint 3: Not Null */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-rose-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                    <ShieldAlert className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">Not Null (NN)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  กำหนดห้ามเว้นว่างข้อมูล บังคับให้ป้อนค่าเสมอเพื่อป้องกันข้อมูลสูญหาย (เช่น ชื่อนักเรียน, รหัสผ่านบัญชี)
                </p>
              </div>

              {/* Constraint 4: Unique */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-amber-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">Unique (UQ)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ข้อมูลห้ามซ้ำกันเด็ดขาดในคอลัมน์ (เช่น เบอร์โทรศัพท์, อีเมล) แต่ยอมรับค่าว่าง (NULL) ได้ในทางปฏิบัติ
                </p>
              </div>

              {/* Constraint 5: Auto Increment */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-cyan-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                    <Zap className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">Auto Increment</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  สั่งให้ระบบฐานข้อมูลเพิ่มตัวเลขอัตโนมัติเริ่มจาก 1 เมื่อเพิ่มข้อมูลแถวใหม่ มักนำมาจับคู่ใช้งานกับ Primary Key
                </p>
              </div>

            </div>

            {/* Frosted Callout */}
            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-indigo-500 leading-relaxed text-[14.5px] text-indigo-900">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                <Info className="w-4.5 h-4.5 text-indigo-600" /> ความสำคัญของคุณสมบัติ Referentials Integrity:
              </span>
              การนำข้อจำกัด <span className="font-mono bg-indigo-100 text-indigo-800 px-1 rounded text-[12px] font-bold">Foreign Key</span> มากำหนดเพื่อโยงตารางลูกเข้ากับตารางแม่ จะมีประโยชน์อย่างยิ่งในการป้องกันไม่ให้ระบบลบข้อมูลในตารางแม่ (เช่น ลบแผนกออก) ในขณะที่มีพนักงานอ้างอิงโยงกับรหัสแผนกนั้นอยู่ในตารางลูก ซึ่งช่วยรักษาความสัมพันธ์ข้อมูลให้ครบถ้วนเสมอ
            </div>
          </div>
        </section>

        {/* ─── Section 2: Constraints Sandbox Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองระบบการเขียนแบบสอบถาม / Constraints Sandbox Simulator
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โปรแกรมทดสอบข้อจำกัดและการป้อนข้อมูลเข้าตาราง MySQL เสมือนจริง
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองปิด-เปิดสวิตช์ข้อจำกัดความถูกต้องด้านซ้ายมือ แล้วกรอกข้อมูลจำลองลงตาราง <code className="bg-slate-100 px-1 rounded text-sm font-bold text-indigo-600">students</code> สังเกตผลของพฤติกรรมและการวิเคราะห์ DDL SQL ทางด้านขวามือ:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            
            {/* Left Column: Constraints Settings Board */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[580px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                CONSTRAINTS CONFIG
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    การตั้งค่าระบบ Constraints:
                  </h4>
                  <button 
                    onClick={resetSimulator}
                    className="text-[9.5px] bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded hover:bg-indigo-600/50 cursor-pointer transition-colors"
                  >
                    Reset Sandbox
                  </button>
                </div>

                {/* Constraint Toggles list */}
                <div className="space-y-4">
                  {/* PK */}
                  <div className="flex items-center justify-between bg-slate-950/40 p-3 rounded-xl border border-white/5">
                    <div className="flex gap-2.5 items-center">
                      <div className={`p-1.5 rounded-lg ${pkEnabled ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800/80 text-slate-400'}`}>
                        <Key className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">PRIMARY KEY</span>
                        <span className="text-[10px] text-slate-400">คีย์หลักห้ามซ้ำ ห้ามมีค่าว่าง</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={pkEnabled} onChange={() => setPkEnabled(!pkEnabled)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 font-bold"></div>
                    </label>
                  </div>

                  {/* AI */}
                  <div className="flex items-center justify-between bg-slate-950/40 p-3 rounded-xl border border-white/5">
                    <div className="flex gap-2.5 items-center">
                      <div className={`p-1.5 rounded-lg ${aiEnabled ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'}`}>
                        <Zap className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">AUTO_INCREMENT</span>
                        <span className="text-[10px] text-slate-400">เพิ่มค่ารหัส ID ตัวเลขให้อัตโนมัติ</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={aiEnabled} onChange={() => setAiEnabled(!aiEnabled)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500 font-bold"></div>
                    </label>
                  </div>

                  {/* NN */}
                  <div className="flex items-center justify-between bg-slate-950/40 p-3 rounded-xl border border-white/5">
                    <div className="flex gap-2.5 items-center">
                      <div className={`p-1.5 rounded-lg ${nnEnabled ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800/80 text-slate-400'}`}>
                        <ShieldAlert className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">NOT NULL</span>
                        <span className="text-[10px] text-slate-400">บังคับกรอกข้อมูล ห้ามทิ้งว่างคอลัมน์ name</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={nnEnabled} onChange={() => setNnEnabled(!nnEnabled)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500 font-bold"></div>
                    </label>
                  </div>

                  {/* UQ */}
                  <div className="flex items-center justify-between bg-slate-950/40 p-3 rounded-xl border border-white/5">
                    <div className="flex gap-2.5 items-center">
                      <div className={`p-1.5 rounded-lg ${uqEnabled ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800/80 text-slate-400'}`}>
                        <Sparkles className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">UNIQUE</span>
                        <span className="text-[10px] text-slate-400">ห้ามกรอกค่าอีเมลซ้ำกับเรคคอร์ดอื่นๆ</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={uqEnabled} onChange={() => setUqEnabled(!uqEnabled)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {/* FK */}
                  <div className="flex items-center justify-between bg-slate-950/40 p-3 rounded-xl border border-white/5">
                    <div className="flex gap-2.5 items-center">
                      <div className={`p-1.5 rounded-lg ${fkEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                        <ArrowRightLeft className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">FOREIGN KEY</span>
                        <span className="text-[10px] text-slate-400">เชื่อม class_id ไปตาราง departments</span>
                      </div>
                    </div>
                    <label className="relative inline-flex inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={fkEnabled} onChange={() => setFkEnabled(!fkEnabled)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Data Ingestion Insert Form */}
              <form onSubmit={handleInsert} className="bg-slate-950/60 p-4 border border-slate-800 rounded-2xl space-y-3.5 mt-6">
                <div className="text-[10px] text-slate-400 font-mono font-bold tracking-wider uppercase">
                  INSERT ROW SIMULATOR
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">ID (PK):</label>
                    <input 
                      type="text" 
                      value={inputId} 
                      onChange={(e) => setInputId(e.target.value.replace(/[^0-9]/g, ''))}
                      disabled={aiEnabled}
                      className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-xs font-mono w-full disabled:opacity-40" 
                      placeholder="เช่น 3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">ชื่อ (Name):</label>
                    <input 
                      type="text" 
                      value={inputName} 
                      onChange={(e) => setInputName(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-xs w-full font-mono" 
                      placeholder="เช่น สมจิต"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">อีเมล (Email):</label>
                    <input 
                      type="text" 
                      value={inputEmail} 
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-xs font-mono w-full" 
                      placeholder="somjit@mail.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">Class ID (FK):</label>
                    <select 
                      value={inputClassId} 
                      onChange={(e) => setInputClassId(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-xs font-mono w-full focus:outline-none"
                    >
                      <option value="101">101 (CS Dept)</option>
                      <option value="102">102 (IT Dept)</option>
                      <option value="999">999 (ไม่มีในตารางอ้างอิง)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 h-9 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-600 hover:scale-[1.01] active:scale-98 cursor-pointer transition-all text-xs"
                >
                  <Plus className="w-4 h-4 text-white" />
                  สั่งรัน INSERT INTO students VALUES (...)
                </button>
              </form>

            </div>

            {/* Right Column: Database tables and console logs */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[580px] overflow-hidden z-10">
              
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  MySQL Workbench Database Analyzer (Schema Map)
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Database Tables Section with SVG Connection */}
              <div className="flex-1 p-5 space-y-6 relative flex flex-col justify-between">
                
                {/* Visual Connection Overlay for Desktop */}
                <div className="absolute inset-0 pointer-events-none hidden md:block z-0" aria-hidden="true">
                  <svg className="w-full h-full">
                    {/* SVG Connector line starting from class_id column cell to departments parent id cell */}
                    {fkEnabled && (
                      <path 
                        d="M 170,120 C 230,120 230,225 290,225" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="2" 
                        strokeDasharray="4 3"
                        className="animate-pulse"
                      />
                    )}
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* Parent Table: departments */}
                  <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3.5 relative">
                    <span className="text-[9px] font-mono text-emerald-400 absolute top-2 right-3 font-bold uppercase">
                      Parent Table
                    </span>
                    <h5 className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5 font-mono mb-2">
                      <Table className="w-3.5 h-3.5 text-emerald-500" /> departments
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] font-mono text-slate-400 text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500">
                            <th className="pb-1.5 font-bold">id (PK)</th>
                            <th className="pb-1.5 font-bold">dept_name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {departments.map((d) => (
                            <tr key={d.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                              <td className="py-1.5 text-emerald-400 font-bold">{d.id}</td>
                              <td className="py-1.5 text-slate-300">{d.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Relationship Badge */}
                  <div className="md:hidden flex items-center justify-center p-2 bg-emerald-950/20 border border-emerald-800/30 rounded-xl text-[10px] text-emerald-400 gap-1.5 font-mono">
                    <ArrowRightLeft className="w-3.5 h-3.5" /> 
                    {fkEnabled ? 'FOREIGN KEY CONNECTED (101, 102)' : 'FOREIGN KEY CONNECTS DISABLE'}
                  </div>

                  {/* Child Table: students */}
                  <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3.5">
                    <span className="text-[9px] font-mono text-indigo-400 absolute top-2 right-3 font-bold uppercase">
                      Child Table
                    </span>
                    <h5 className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5 font-mono mb-2">
                      <Table className="w-3.5 h-3.5 text-indigo-500" /> students
                    </h5>
                    <div className="overflow-x-auto max-h-36 overflow-y-auto no-scrollbar">
                      <table className="w-full text-[11px] font-mono text-slate-400 text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500">
                            <th className="pb-1.5 font-bold">id {pkEnabled && <span className="text-indigo-400 font-bold">PK</span>}</th>
                            <th className="pb-1.5 font-bold">name</th>
                            <th className="pb-1.5 font-bold">email</th>
                            <th className="pb-1.5 font-bold">class_id</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((s, index) => (
                            <tr key={index} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                              <td className="py-1.5 font-bold text-indigo-400">{s.id}</td>
                              <td className="py-1.5 text-slate-300">{s.name === null ? <span className="text-red-500/60 font-bold italic">NULL</span> : s.name}</td>
                              <td className="py-1.5 text-slate-400 max-w-[100px] truncate">{s.email === null ? <span className="text-red-500/60 font-bold italic">NULL</span> : s.email}</td>
                              <td className={`py-1.5 font-bold ${fkEnabled ? 'text-emerald-400' : 'text-slate-500'}`}>{s.class_id}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* DDL Preview panel */}
                <div className="space-y-1 mt-4">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <FileCode className="w-3 h-3 text-slate-500" />
                    SQL DDL CREATE TABLE syntax representation:
                  </div>
                  <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 text-[13px] font-mono text-indigo-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {generateDDL()}
                  </pre>
                </div>

              </div>

              {/* Action Log panel */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-36 overflow-y-auto no-scrollbar z-10">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> Action Output Logs:
                </div>
                <div className="space-y-1 text-slate-300">
                  {logMessages.map((msg, i) => (
                    <div key={i} className="flex gap-2.5 leading-relaxed">
                      <span className="text-slate-600 select-none shrink-0">{msg.time}</span>
                      <span className={
                        msg.status === 'success' 
                          ? 'text-emerald-400 font-bold' 
                          : msg.status === 'error' 
                            ? 'text-rose-500 font-bold' 
                            : 'text-indigo-400'
                      }>
                        {msg.status === 'success' ? '✓' : msg.status === 'error' ? '✗' : 'i'} {msg.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask 
          title="ใบงานทดสอบความสมบูรณ์และข้อจำกัดของข้อมูล (MySQL Constraints Verification Task)" 
          taskText={`[กิจกรรมปฏิบัติส่งท้ายบทเรียน]
ให้นักเรียนใช้ทฤษฎีและทดสอบระบบจำลอง Constraints Sandbox Simulator ด้านบนในการสังเกตและวิเคราะห์ผล แล้วเขียนคำตอบลงในสมุดเรียน:

1. การวิเคราะห์กฎข้อจำกัด (Constraints Scrutiny):
   - หากเปิดใช้งาน PRIMARY KEY และ AUTO_INCREMENT คอลัมน์ "id" จะรับค่าประเภทใด และมีพฤติกรรมอย่างไรเมื่อมีข้อมูลใหม่ถูกสร้างขึ้น?
   - ข้อแตกต่างในการป้อนข้อมูลสำหรับฟิลด์ที่เป็น UNIQUE กับ NOT NULL คืออะไร? สามารถเว้นว่างข้อมูลในช่อง UNIQUE ได้หรือไม่?

2. การฝ่าฝืนกฎความถูกต้อง (Constraint Violation):
   - จงอธิบายสาเหตุและรหัสข้อผิดพลาดของการฝ่าฝืนใน MySQL เมื่อ:
     1. ใส่ค่า ID ซ้ำลงในคอลัมน์ที่เป็นคีย์หลัก (Primary Key Duplicate)
     2. ป้อนค่าเลขแผนก (class_id) เป็น 999 ในขณะที่ยังเปิดใช้งาน FOREIGN KEY อยู่
     3. จงบอกวิธีการแก้ข้อผิดพลาด "Column 'name' cannot be null"

3. การออกแบบคำสั่งสร้างตาราง DDL:
   - ให้นักเรียนเขียนสคริปต์คำสั่งสร้างตาราง (CREATE TABLE) สำหรับตารางพนักงาน "employees" ที่มีคอลัมน์ดังนี้:
     1. emp_id: เป็นจำนวนเต็ม, คีย์หลัก, เพิ่มอัตโนมัติ
     2. first_name: บังคับกรอกชื่อจริง ห้ามว่าง
     3. citizen_number: รหัสประชาชน ห้ามซ้ำซ้อนกันในระบบ
     4. department_id: คีย์นอกเชื่อมโยงไปยังตารางแผนกหลัก (departments.id)`}
        />

      </main>
    </div>
  );
}
