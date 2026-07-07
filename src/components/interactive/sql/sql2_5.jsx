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
  BookOpen,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';

export default function SQL2_5() {
  // Simulator database tree state
  const [dbExists, setDbExists] = useState(true);
  const [tablesList, setTablesList] = useState(['students', 'departments']);
  
  // Selection state
  const [dropTargetType, setDropTargetType] = useState('TABLE'); // 'DATABASE' | 'TABLE'
  const [selectedTable, setSelectedTable] = useState('students');
  const [ifExistsChecked, setIfExistsChecked] = useState(true);

  // Security Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');

  // Terminal & Action Output Log
  const [logMessages, setLogMessages] = useState([
    { time: '07:35:00', status: 'info', message: 'MySQL DROP command engine ready.' },
    { time: '07:35:01', status: 'info', message: 'Schema `student_db` contains tables: students, departments.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  // Generate dynamic SQL DDL command string
  const getSQLString = () => {
    const existsClause = ifExistsChecked ? ' IF EXISTS' : '';
    if (dropTargetType === 'DATABASE') {
      return `DROP DATABASE${existsClause} \`student_db\`;`;
    } else {
      return `DROP TABLE${existsClause} \`${selectedTable}\`;`;
    }
  };

  // Attempt to run the destructive DROP command
  const handleDropInitiate = (e) => {
    e.preventDefault();
    setConfirmInput('');
    setShowConfirmModal(true);
  };

  // Confirm and execute the DROP query
  const handleDropExecute = () => {
    setShowConfirmModal(false);
    const sql = getSQLString();
    addLog(`Running: ${sql}`, 'info');

    const expectedConfirmCode = dropTargetType === 'DATABASE' ? 'student_db' : selectedTable;
    if (confirmInput.trim() !== expectedConfirmCode) {
      addLog(`Execution aborted. Confirmation text did not match '${expectedConfirmCode}'.`, 'error');
      return;
    }

    if (dropTargetType === 'DATABASE') {
      if (!dbExists) {
        if (ifExistsChecked) {
          addLog(`Query OK, 0 rows affected, 1 warning (Note: Schema student_db doesn't exist)`, 'success');
        } else {
          addLog(`Error Code: 1049. Unknown database 'student_db'`, 'error');
        }
        return;
      }
      setDbExists(false);
      setTablesList([]);
      addLog(`Query OK, 0 rows affected. Database 'student_db' destroyed successfully!`, 'success');
    } else {
      // DROP TABLE
      if (!dbExists) {
        addLog(`Error Code: 1046. No database selected (You must create/use a database first)`, 'error');
        return;
      }
      const target = selectedTable;
      const existsInTree = tablesList.includes(target);

      if (!existsInTree) {
        if (ifExistsChecked) {
          addLog(`Query OK, 0 rows affected, 1 warning (Note: Table student_db.${target} doesn't exist)`, 'success');
        } else {
          addLog(`Error Code: 1051. Unknown table 'student_db.${target}'`, 'error');
        }
        return;
      }

      setTablesList(prev => prev.filter(t => t !== target));
      addLog(`Query OK, 0 rows affected. Table '${target}' dropped successfully from disk.`, 'success');
      
      // Auto switch target to remaining table if any
      const remaining = tablesList.filter(t => t !== target);
      if (remaining.length > 0) {
        setSelectedTable(remaining[0]);
      }
    }
  };

  // Reset simulator schema and elements
  const resetSimulator = () => {
    setDbExists(true);
    setTablesList(['students', 'departments']);
    setDropTargetType('TABLE');
    setSelectedTable('students');
    setIfExistsChecked(true);
    addLog('Database student_db and all tables successfully restored.', 'info');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql2_5-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content (Fluid Open-Air Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              คำสั่งทำลาย DDL / Database Object Destruction
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คำสั่งลบฐานข้อมูลและลบตาราง (DROP DATABASE, DROP TABLE)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              คำสั่ง <span className="font-semibold text-indigo-600 font-mono">DROP</span> คือคำสั่งประเภท DDL (Data Definition Language) ที่มีความรุนแรงและเป็นอันตรายที่สุดในระบบจัดการฐานข้อมูล เนื่องจากทำหน้าที่ลบโครงสร้างทางกายภาพ ข้อมูล ดัชนี และข้อจำกัดความสัมพันธ์ทั้งหมดของตารางหรือฐานข้อมูลเป้าหมายออกจากระบบจัดเก็บข้อมูลในฮาร์ดดิสก์อย่างสิ้นเชิงและไม่สามารถเรียกคืนได้ (Irreversible)
            </p>

            {/* Grid of DROP components */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-6">
              
              {/* Card 1: DROP DATABASE */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-red-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-red-50 text-red-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Trash2 className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800 font-mono">DROP DATABASE</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ลบฐานข้อมูลและตารางข้อมูลทั้งหมดที่อยู่ภายใต้ Schema นั้นออกไปทันทีแบบถาวร (เช่น `DROP DATABASE student_db;`)
                </p>
              </div>

              {/* Card 2: DROP TABLE */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-orange-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-orange-50 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Table className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800 font-mono">DROP TABLE</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ลบตาราง โครงสร้างแถวข้อมูล คอลัมน์ และ Index ทั้งหมดออกไปจากหน่วยความจำระบบ (เช่น `DROP TABLE students;`)
                </p>
              </div>

              {/* Card 3: IF EXISTS Clause */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-emerald-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Check className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800 font-mono">IF EXISTS</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  คีย์เวิร์ดตรวจสอบ หากไม่พบฐานข้อมูลหรือตารางในชื่อที่กำหนด ระบบจะเปลี่ยนเป็นแจ้งเตือน (Warning) แทนการตอบรับ Error เพื่อให้สคริปต์สเต็ปถัดไปทำงานได้ลื่นไหล
                </p>
              </div>

            </div>

            {/* Frosted Callout */}
            <div className="bg-red-50/60 backdrop-blur-md border border-red-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-red-500 leading-relaxed text-[14.5px] text-red-900">
              <span className="font-bold text-red-800 flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="w-4.5 h-4.5 text-red-600 animate-pulse" /> ความต่างที่อันตรายระหว่าง DROP และ DELETE:
              </span>
              คำสั่ง <span className="font-mono bg-red-100 text-red-800 px-1 rounded text-[12px] font-bold">DELETE</span> เป็นคำสั่ง DML ทำหน้าที่ทยอยลบเฉพาะแถวระเบียนข้อมูล (Rows) แต่โครงสร้างตารางและคอลัมน์ยังอยู่ แต่ในทางกลับกันคำสั่ง <span className="font-mono bg-red-100 text-red-800 px-1 rounded text-[12px] font-bold">DROP</span> คือคำสั่งระดับโครงสร้าง (DDL) ที่ลบโครงสร้างสเปกตารางและทุกข้อมูลยิบย่อยออกไปอย่างถาวรจากสารบบเครื่องเซิร์ฟเวอร์
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-red-600 tracking-wider uppercase">
              เครื่องมือจำลองการลบทำลาย / Destructive DDL Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบจำลองการรันคำสั่งลบทำลายวัตถุฐานข้อมูลและตารางข้อมูล
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองเลือกออบเจกต์ฐานข้อมูลหรือตารางด้านซ้ายมือ เพื่อเขียนคำสั่งลบและสังเกตผลกระทบลงโครงสร้าง Navigator Tree และการบันทึก Terminal เสมือนจริงด้านขวามือ:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            
            {/* Left Column: Command panel & Danger Zone */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[480px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest text-red-400">
                DANGER ZONE
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    ตั้งค่าคำสั่งลบทำลาย:
                  </h4>
                  <button 
                    onClick={resetSimulator}
                    className="text-[9.5px] bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded hover:bg-indigo-600/50 cursor-pointer transition-colors"
                  >
                    Restore Database
                  </button>
                </div>

                {/* Target Selection Radio boxes */}
                <div className="space-y-3">
                  <span className="text-xs text-slate-300 font-mono font-bold block">ลบทำลายวัตถุเป้าหมาย:</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDropTargetType('DATABASE')}
                      className={`h-9 font-mono text-[11px] font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                        dropTargetType === 'DATABASE'
                          ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-[1.02]'
                          : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                      }`}
                    >
                      DATABASE (student_db)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDropTargetType('TABLE')}
                      className={`h-9 font-mono text-[11px] font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                        dropTargetType === 'TABLE'
                          ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-[1.02]'
                          : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                      }`}
                    >
                      TABLE
                    </button>
                  </div>
                </div>

                {/* Dropdowns and IF EXISTS Checkbox */}
                <div className="bg-slate-950/40 p-4 border border-slate-800 rounded-xl space-y-4">
                  {dropTargetType === 'TABLE' && (
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-mono font-bold block">เลือกตารางที่ต้องการลบ (TABLE Name):</label>
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none focus:border-red-500"
                      >
                        <option value="students">students (ตารางลูก)</option>
                        <option value="departments">departments (ตารางแม่)</option>
                        <option value="invalid_table">invalid_table (ตารางที่ไม่มีอยู่จริง)</option>
                      </select>
                    </div>
                  )}

                  {/* IF EXISTS Checkbox */}
                  <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                    <div className="flex gap-2 items-center">
                      <ShieldAlert className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-300 block">IF EXISTS Parameter</span>
                        <span className="text-[10px] text-slate-400">ป้องกันระบบฟ้องคิวรีเออเรอร์กรณีไม่มีตาราง</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={ifExistsChecked} 
                        onChange={() => setIfExistsChecked(!ifExistsChecked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action execute trigger */}
              <button
                onClick={handleDropInitiate}
                className="w-full flex items-center justify-center gap-2 h-10 bg-red-600 text-white font-bold rounded-lg hover:bg-red-600 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
              >
                <Trash2 className="w-4 h-4 text-white" /> Execute DROP Query
              </button>

            </div>

            {/* Right Column: Database Navigation Tree & Action log */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[480px] overflow-hidden z-10">
              
              {/* Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  MySQL Workbench Navigator (Schemas Tree List)
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Workbench tree viewer contents */}
              <div className="flex-1 p-6 space-y-6 flex flex-col justify-between relative">
                
                {/* Visual Tree representation */}
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4 font-mono text-xs">
                  <span className="text-[9px] font-mono text-slate-500 absolute top-2 right-3 font-bold uppercase">
                    Schemas lists
                  </span>
                  
                  {dbExists ? (
                    <div className="space-y-3 animate-fade-in text-slate-300">
                      <div className="flex items-center gap-2 font-bold text-indigo-400">
                        <Database className="w-4 h-4" /> \`student_db\`
                      </div>
                      <div className="pl-6 space-y-2 border-l border-slate-800 ml-2">
                        <div className="flex items-center gap-2 text-slate-400">
                          <FolderOpen className="w-4 h-4 text-amber-500/80" /> Tables ({tablesList.length})
                        </div>
                        <div className="pl-6 space-y-1.5 border-l border-slate-800 ml-2">
                          {tablesList.length > 0 ? (
                            tablesList.map(tbl => (
                              <div key={tbl} className="flex items-center gap-2 text-slate-300 animate-fade-in">
                                <Table className="w-3.5 h-3.5 text-slate-400" /> \`{tbl}\`
                              </div>
                            ))
                          ) : (
                            <span className="text-[10px] text-slate-600 italic block">No tables remaining in schema.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-slate-600 italic text-[11px] animate-fade-in space-y-2">
                      <ShieldAlert className="w-8 h-8 text-slate-700 mx-auto animate-pulse" />
                      <span>( ไม่มีฐานข้อมูลแสดงในระบบ / No Database Selected )</span>
                      <p className="text-[9.5px] text-slate-700 leading-normal">
                        กดปุ่ม Restore Database ด้านซ้ายเพื่อรีเซ็ต
                      </p>
                    </div>
                  )}
                </div>

                {/* SQL syntax preview panel */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    Generated DDL SQL Preview:
                  </div>
                  <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 text-[13px] font-mono text-red-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLString()}
                  </pre>
                </div>

              </div>

              {/* Console logs */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-36 overflow-y-auto no-scrollbar z-10">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> Action Output Console:
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
          title="ภารกิจวิเคราะห์ความปลอดภัยในการลบวัตถุฐานข้อมูล (Database Object Destruction Analysis Task)" 
          taskText={`[กิจกรรมปฏิบัติท้ายหน้าบทเรียน]
ให้นักเรียนตอบคำถามจากการสังเกตการจำลองคำสั่งลบทำลายฐานข้อมูลและตาราง (DROP Sandbox) ลงสมุดบันทึก:

1. การวิเคราะห์กลไกความปลอดภัยและผลลัพธ์ (Destructive Analysis):
   - เหตุใดการใช้คำสั่ง DROP TABLE จึงถือเป็นกิจกรรมที่มีระดับความเสี่ยงสูงที่สุดระดับต้นๆ ของงานบริหารฐานข้อมูล? 
   - คีย์เวิร์ด IF EXISTS ที่ต่อท้ายประโยค DROP DATABASE หรือ DROP TABLE มีบทบาทช่วยเหลือผู้เขียนสคริปต์อัตโนมัติ (เช่น สคริปต์ Batch) อย่างไร?

2. การเปรียบเทียบคำสั่งภาษา SQL (High-Fidelity Operations Comparison):
   - จงเปรียบเทียบพฤติกรรมการทำงานทางกายภาพของโครงสร้างและข้อมูลของตารางเมื่อสั่งคำสั่ง:
     1. DROP TABLE students
     2. TRUNCATE TABLE students
     3. DELETE FROM students

3. เขียนสคริปต์สเปกคำสั่ง DDL (DDL Coding Task):
   - จงเขียนโครงสร้างประโยค SQL สำหรับสั่งรันความต้องการต่อไปนี้:
     1. สั่งลบฐานข้อมูลที่ชื่อ "old_school_db" โดยป้องกันระบบฟ้องเออเรอร์หากไม่มีฐานข้อมูลชื่อนี้อยู่จริง
     2. สั่งลบตารางชื่อ "temporary_logs" ในลักษณะสคริปต์ DDL ธรรมดา`}
        />

      </main>

      {/* ─── Security Confirmation Modal ─── */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-red-500/20 max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4 animate-fade-in text-left">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-white text-[15px] font-bold">แจ้งเตือนยืนยันการลบทำลาย</h4>
                <p className="text-[11px] text-slate-400 leading-normal">คุณกำลังรันคำสั่ง DDL ที่มีระดับความอันตรายสูง</p>
              </div>
            </div>

            <p className="text-[13px] text-slate-300 leading-relaxed font-normal">
              เพื่อยืนยันการรันประโยคคิวรีด้านล่างนี้ กรุณาพิมพ์คำตอบรหัสยืนยัน <span className="font-mono bg-red-950/40 text-red-400 px-2 py-0.5 rounded text-xs font-bold">"{dropTargetType === 'DATABASE' ? 'student_db' : selectedTable}"</span> ลงในช่องป้อนข้อมูล:
            </p>
            <div className="font-mono text-xs text-red-400 bg-black p-2.5 rounded border border-slate-800">
              {getSQLString()}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-mono font-bold block uppercase">Confirm Code:</label>
              <input 
                type="text" 
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                className="bg-black border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-mono w-full focus:border-red-500 focus:outline-none"
                placeholder="พิมพ์ชื่อวัตถุฐานข้อมูลเพื่อยืนยัน"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-slate-800 hover:bg-slate-900 rounded-lg text-slate-400 text-xs font-bold cursor-pointer transition-all"
              >
                ยกเลิก (Cancel)
              </button>
              <button 
                onClick={handleDropExecute}
                className="px-4 py-2 bg-red-600 hover:bg-red-600 hover:scale-[1.02] active:scale-98 text-white rounded-lg text-xs font-bold cursor-pointer transition-all"
              >
                ยืนยันการลบ (Execute)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
