import React, { useState } from 'react';
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
  BookOpen
} from 'lucide-react';

export default function SQL3_1() {
  const [insertMode, setInsertMode] = useState('EXPLICIT'); // 'EXPLICIT' | 'IMPLICIT'
  
  // Input fields
  const [inputId, setInputId] = useState('6');
  const [inputName, setInputName] = useState('ปิติ');
  const [inputEmail, setInputEmail] = useState('piti@mail.com');
  const [inputClassId, setInputClassId] = useState('101');

  // Table Data
  const [students, setStudents] = useState([
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
    { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
    { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
  ]);

  const [logMessages, setLogMessages] = useState([
    { time: '07:50:00', status: 'info', message: 'DML Insert Engine ready.' },
    { time: '07:50:01', status: 'info', message: 'Ready to receive single-row INSERT INTO statement.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  const getSQLString = () => {
    const cleanId = inputId || 'NULL';
    const cleanName = inputName ? `'${inputName}'` : 'NULL';
    const cleanEmail = inputEmail ? `'${inputEmail}'` : 'NULL';
    const cleanClassId = inputClassId || 'NULL';

    if (insertMode === 'EXPLICIT') {
      return `INSERT INTO students (id, name, email, class_id)\nVALUES (${cleanId}, ${cleanName}, ${cleanEmail}, ${cleanClassId});`;
    } else {
      return `INSERT INTO students\nVALUES (${cleanId}, ${cleanName}, ${cleanEmail}, ${cleanClassId});`;
    }
  };

  const handleInsert = (e) => {
    e.preventDefault();
    const idVal = parseInt(inputId, 10);
    const nameVal = inputName.trim();
    const emailVal = inputEmail.trim();
    const classIdVal = parseInt(inputClassId, 10);

    // SQL Code display trace
    addLog(`Running: ${getSQLString().replace(/\n/g, ' ')}`, 'info');

    if (isNaN(idVal)) {
      addLog(`Error Code: 1048. Column 'id' cannot be null`, 'error');
      return;
    }

    if (students.some(s => s.id === idVal)) {
      addLog(`Error Code: 1062. Duplicate entry '${idVal}' for key 'students.PRIMARY'`, 'error');
      return;
    }

    if (!nameVal) {
      addLog(`Error Code: 1364. Field 'name' doesn't have a default value`, 'error');
      return;
    }

    // Success Insert
    const newStudent = {
      id: idVal,
      name: nameVal,
      email: emailVal || null,
      class_id: isNaN(classIdVal) ? null : classIdVal
    };

    setStudents(prev => [...prev, newStudent]);
    addLog(`Query OK, 1 row affected (1.4ms). Record added.`, 'success');

    // Auto-increment the next default ID suggestion
    setInputId((idVal + 1).toString());
    setInputName('');
    setInputEmail('');
  };

  const resetTable = () => {
    setStudents([
      { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
      { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
      { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
      { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
      { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
    ]);
    setInputId('6');
    setInputName('ปิติ');
    setInputEmail('piti@mail.com');
    setInputClassId('101');
    addLog('Students table reset to initial rows.', 'info');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql3_1-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              ภาษาจัดการข้อมูล DML / INSERT INTO Statement
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คำสั่งเพิ่มข้อมูลลงในตาราง (INSERT INTO)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              คำสั่ง <span className="font-semibold text-indigo-600 font-mono">INSERT INTO</span> คือคำสั่งประเภท DML (Data Manipulation Language) ที่ใช้สำหรับบันทึกหรือเพิ่มเรคคอร์ดแถวใหม่เข้าสู่ตารางเป้าหมาย ซึ่งสามารถจำแนกสไตล์การเขียนโค้ดได้เป็น 2 แบบหลัก:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-6">
              {/* Card 1: Explicit columns */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-indigo-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <h4 className="text-[15px] font-bold text-slate-800 mb-2 font-mono">1. แบบระบุคอลัมน์ (Explicit Columns)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                  เป็นการเขียนที่ระบุคอลัมน์ที่ต้องการใส่ค่าไว้ด้านหลังตาราง เหมาะสำหรับตารางที่มีบางคอลัมน์ปล่อยเป็นค่าว่างได้ หรือมีค่าดีฟอลต์ (Default) ไม่จำเป็นต้องกรอกครบทุกคอลัมน์
                </p>
                <pre className="bg-slate-950 p-3 rounded-lg text-[12.5px] font-mono text-cyan-400 overflow-x-auto whitespace-pre">
{`INSERT INTO students (id, name, email)
VALUES (6, 'ปิติ', 'piti@mail.com');`}
                </pre>
              </div>

              {/* Card 2: Implicit columns */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-orange-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <h4 className="text-[15px] font-bold text-slate-800 mb-2 font-mono">2. แบบไม่ระบุคอลัมน์ (Implicit Columns)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                  เป็นการเขียนแบบย่อที่ละชื่อคอลัมน์ไว้ แต่ผู้เขียน **ต้องป้อนค่าเรียงตามลำดับโครงสร้างตารางจริงบนดิสก์ให้ครบถ้วนทุกคอลัมน์** ห้ามขาดหายแม้แต่คอลัมน์เดียว
                </p>
                <pre className="bg-slate-950 p-3 rounded-lg text-[12.5px] font-mono text-cyan-400 overflow-x-auto whitespace-pre">
{`INSERT INTO students
VALUES (6, 'ปิติ', 'piti@mail.com', 101);`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองประมวล DML / INSERT INTO Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แผงจำลองความเข้าใจการป้อนข้อมูลเดี่ยวเข้าสู่ตารางฐานข้อมูล
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* Left Controls */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[480px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                INPUT CONTROL
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    ตั้งค่าคำสั่งเพิ่มข้อมูล:
                  </h4>
                  <button 
                    onClick={resetTable}
                    className="text-[9.5px] bg-orange-600/30 text-orange-300 border border-orange-500/20 px-2.5 py-1 rounded hover:bg-orange-600/50 cursor-pointer transition-colors"
                  >
                    Reset Table
                  </button>
                </div>

                {/* Mode Selectors */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInsertMode('EXPLICIT')}
                    className={`h-9 font-mono text-[11px] font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                      insertMode === 'EXPLICIT'
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                        : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                    }`}
                  >
                    ระบุคอลัมน์ (Explicit)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInsertMode('IMPLICIT')}
                    className={`h-9 font-mono text-[11px] font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                      insertMode === 'IMPLICIT'
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                        : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                    }`}
                  >
                    ไม่ระบุคอลัมน์ (Implicit)
                  </button>
                </div>

                {/* Fields Inputs */}
                <div className="bg-slate-950/40 p-4 border border-slate-800 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 block">id (คีย์หลัก):</label>
                      <input 
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value.replace(/[^0-9]/g, ''))}
                        className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-2.5 py-1.5 w-full focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 block">name (ชื่อจริง):</label>
                      <input 
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-2.5 py-1.5 w-full focus:outline-none focus:border-orange-500"
                        placeholder="เช่น ปิติ"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 block">email (อีเมล):</label>
                      <input 
                        type="text"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-2.5 py-1.5 w-full focus:outline-none focus:border-orange-500"
                        placeholder="piti@mail.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 block">class_id (รหัสวิชา):</label>
                      <input 
                        type="text"
                        value={inputClassId}
                        onChange={(e) => setInputClassId(e.target.value.replace(/[^0-9]/g, ''))}
                        className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-2.5 py-1.5 w-full focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleInsert}
                className="w-full flex items-center justify-center gap-2 h-10 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
              >
                <Plus className="w-4 h-4" /> Run SQL INSERT Query
              </button>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[480px] overflow-hidden z-10">
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-orange-400" />
                  MySQL Workbench Database Viewer - students table
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Table Data View */}
              <div className="flex-1 p-5 space-y-6 flex flex-col justify-between">
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4">
                  <h5 className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5 font-mono mb-3">
                    <Table className="w-3.5 h-3.5 text-orange-500" /> students table records
                  </h5>
                  <div className="overflow-x-auto max-h-40 overflow-y-auto no-scrollbar">
                    <table className="w-full text-xs font-mono text-slate-400 text-left border-collapse border-b border-slate-800">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 font-bold">
                          <th className="pb-2">id (PK)</th>
                          <th className="pb-2">name</th>
                          <th className="pb-2">email</th>
                          <th className="pb-2 text-right">class_id</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((std) => (
                          <tr key={std.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                            <td className="py-2 text-orange-400 font-bold font-mono">{std.id}</td>
                            <td className="py-2 text-slate-300 font-sans">{std.name}</td>
                            <td className="py-2 text-slate-400">{std.email || <span className="text-red-500/60 italic font-bold">NULL</span>}</td>
                            <td className="py-2 text-slate-300 text-right">{std.class_id || <span className="text-red-500/60 italic font-bold">NULL</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SQL preview */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    DML Syntax Preview:
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-[13.5px] font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLString()}
                  </pre>
                </div>
              </div>

              {/* Console log */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-32 overflow-y-auto no-scrollbar z-10">
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
                            : 'text-orange-400'
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
          title="ภารกิจวิเคราะห์โครงสร้างคิวรี INSERT (DML Single Row Insertion Task)" 
          taskText={`[ใบงานมอบหมายปฏิบัติการ DML]
ให้นักเรียนตอบคำถามลงในสมุดหลังจากเรียนรู้ผ่าน Simulator ในบทเรียนนี้:

1. การเปรียบเทียบไวยากรณ์ (Syntax Comparison):
   - จงอธิบายข้อดีและข้อจำกัดของการเขียน INSERT INTO แบบระบุชื่อคอลัมน์ (Explicit) และไม่ระบุชื่อคอลัมน์ (Implicit)
   - หากมีการแก้ไขลำดับคอลัมน์ของตารางบนดิสก์จริง การเขียนแบบย่อยที่ไม่ระบุชื่อคอลัมน์ (Implicit) จะส่งผลเสียหายอย่างไรต่อระบบฐานข้อมูล?

2. การเกิดข้อผิดพลาดของข้อจำกัด (Constraint Failures Analysis):
   - จากข้อความประมวลผลเออเรอร์ของระบบจำลอง:
     1. Error Code 1062 (Duplicate entry) เกิดขึ้นจากพฤติกรรมการป้อนข้อมูลลักษณะใด?
     2. Error Code 1364 (Field doesn't have default value) เกิดขึ้นเนื่องจากไม่ได้ป้อนคอลัมน์ใด?

3. เขียนสคริปต์ DML (DML Coding):
   - จงเขียนโครงสร้างประโยคเพิ่มข้อมูล 1 แถว สำหรับตารางบุคลากร (staff) ที่มีโครงสร้าง (id, full_name, role_title, salary) ดังต่อไปนี้:
     1. เขียนแบบระบุชื่อคอลัมน์: รหัส 105, ชื่อ "สมเกียรติ", ตำแหน่ง "Analyst", เงินเดือน 45000
     2. เขียนแบบย่อไม่ระบุคอลัมน์: รหัส 106, ชื่อ "วันเพ็ญ", ตำแหน่ง "HR", เงินเดือน 38000`}
        />

      </main>
    </div>
  );
}
