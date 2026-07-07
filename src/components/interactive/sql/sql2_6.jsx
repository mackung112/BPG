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
  ArrowRightLeft,
  Timer
} from 'lucide-react';

export default function SQL2_6() {
  // Simulator Table Data
  const initialData = [
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com' },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com' },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com' },
    { id: 4, name: 'สมเดช', email: 'somdej@mail.com' },
    { id: 5, name: 'สมหมาย', email: 'sommai@mail.com' }
  ];

  const [students, setStudents] = useState(initialData);
  const [nextAutoId, setNextAutoId] = useState(6);
  const [selectedCommand, setSelectedCommand] = useState('TRUNCATE'); // 'TRUNCATE' | 'DELETE_ALL' | 'DELETE_WHERE'

  // Terminal Logs
  const [logMessages, setLogMessages] = useState([
    { time: '07:42:00', status: 'info', message: 'TRUNCATE vs DELETE Comparison engine ready.' },
    { time: '07:42:01', status: 'info', message: 'Table students loaded with 5 rows. Current Next AUTO_INCREMENT = 6.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  // Get current SQL Query representation
  const getSQLPreview = () => {
    switch (selectedCommand) {
      case 'TRUNCATE':
        return 'TRUNCATE TABLE students;';
      case 'DELETE_ALL':
        return 'DELETE FROM students;';
      case 'DELETE_WHERE':
        return 'DELETE FROM students WHERE id = 3;';
      default:
        return '';
    }
  };

  // Execute the SQL DDL/DML query
  const handleExecute = (e) => {
    e.preventDefault();
    const sql = getSQLPreview();
    
    if (selectedCommand === 'TRUNCATE') {
      addLog(`Running DDL command: ${sql}`, 'info');
      setStudents([]);
      setNextAutoId(1);
      // Simulate extremely fast execution for DDL
      setTimeout(() => {
        addLog(`Query OK, 0 rows affected (1.2ms) - Table recreated. Next AUTO_INCREMENT reset to 1.`, 'success');
      }, 50);
    } else if (selectedCommand === 'DELETE_ALL') {
      addLog(`Running DML command: ${sql}`, 'info');
      const rowCount = students.length;
      setStudents([]);
      // Do NOT reset nextAutoId
      // Simulate slower transaction logging execution
      setTimeout(() => {
        addLog(`Query OK, ${rowCount} rows affected (12.4ms) - Rows deleted row-by-row. Next AUTO_INCREMENT remains ${nextAutoId}.`, 'success');
      }, 50);
    } else if (selectedCommand === 'DELETE_WHERE') {
      addLog(`Running DML command: ${sql}`, 'info');
      if (!students.some(s => s.id === 3)) {
        addLog(`Query OK, 0 rows affected (0.8ms) - No row matched id = 3.`, 'warning');
        return;
      }
      setStudents(prev => prev.filter(s => s.id !== 3));
      setTimeout(() => {
        addLog(`Query OK, 1 row affected (1.8ms) - Row with id = 3 deleted. Next AUTO_INCREMENT remains ${nextAutoId}.`, 'success');
      }, 50);
    }
  };

  // Insert a new row to demonstrate Auto-Increment behavior
  const handleInsertRow = () => {
    const names = ['สมยศ', 'สมศรี', 'สมบัติ', 'สมนึก', 'สมปอง'];
    const emails = ['somyos', 'somsri', 'sombat', 'somnuk', 'sompong'];
    
    // Pick random index
    const randIdx = Math.floor(Math.random() * names.length);
    const newName = names[randIdx] + ' (ใหม่)';
    const newEmail = `${emails[randIdx]}_new@mail.com`;

    const newRow = {
      id: nextAutoId,
      name: newName,
      email: newEmail
    };

    setStudents(prev => [...prev, newRow]);
    addLog(`INSERT INTO students (name, email) VALUES ('${newName}', '${newEmail}');`, 'info');
    
    const nextId = nextAutoId + 1;
    setNextAutoId(nextId);
    
    addLog(`Query OK, 1 row affected (1.5ms). Inserted with ID: ${nextAutoId}. Next AUTO_INCREMENT updated to ${nextId}.`, 'success');
  };

  // Reset simulator
  const handleReset = () => {
    setStudents(initialData);
    setNextAutoId(6);
    setSelectedCommand('TRUNCATE');
    setLogMessages([
      { time: new Date().toTimeString().split(' ')[0], status: 'info', message: 'Simulator data and variables reset.' }
    ]);
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql2_6-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content (Fluid Open-Air Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              การจัดการข้อมูลตาราง DDL / TRUNCATE TABLE Operation
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คำสั่งล้างข้อมูลในตาราง (TRUNCATE TABLE)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              คำสั่ง <span className="font-semibold text-indigo-600 font-mono">TRUNCATE TABLE</span> เป็นคำสั่งประเภท DDL (Data Definition Language) ที่ใช้สำหรับล้างแถวข้อมูลทั้งหมดภายในตารางอย่างรวดเร็ว โดยระบบจะทำลายตารางเดิมแล้วสร้างตารางเปล่าขึ้นมาใหม่ภายใต้โครงสร้างและข้อจำกัดเดิม ส่งผลให้ค่านับตัวเลขอัตโนมัติ (<span className="font-semibold text-zinc-800">Auto Increment</span>) ถูกรีเซ็ตกลับไปเริ่มต้นที่เลข 1 ใหม่เสมอ
            </p>

            {/* Structured 3-way comparison table */}
            <div className="overflow-x-auto bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 mt-6">
              <h4 className="text-[15px] font-bold text-slate-800 mb-3 flex items-center gap-2">
                <ArrowRightLeft className="w-4.5 h-4.5 text-indigo-600" />
                ตารางวิเคราะห์เปรียบเทียบการลบข้อมูล (DROP vs TRUNCATE vs DELETE)
              </h4>
              <table className="w-full text-xs text-left text-slate-600 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-800 font-bold">
                    <th className="py-2.5">คุณสมบัติ / ข้อเปรียบเทียบ</th>
                    <th className="py-2.5 text-red-600 font-mono">DROP TABLE</th>
                    <th className="py-2.5 text-indigo-600 font-mono">TRUNCATE TABLE</th>
                    <th className="py-2.5 text-amber-600 font-mono">DELETE FROM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2 font-bold text-slate-700">ประเภทคำสั่ง (Category)</td>
                    <td className="py-2 font-mono">DDL (ภาษานิยามโครงสร้าง)</td>
                    <td className="py-2 font-mono text-indigo-600">DDL (ภาษานิยามโครงสร้าง)</td>
                    <td className="py-2 font-mono">DML (ภาษาจัดการข้อมูล)</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2 font-bold text-slate-700">ความเร็วในการทำงาน (Speed)</td>
                    <td className="py-2">เร็วที่สุด (ลบไฟล์โครงสร้าง)</td>
                    <td className="py-2 text-indigo-600 font-semibold">เร็วมาก (ทำลายแล้วสร้างใหม่)</td>
                    <td className="py-2">ช้ากว่า (ไล่ลบทีกระระเบียน)</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2 font-bold text-slate-700">การคงอยู่ของโครงสร้างตาราง</td>
                    <td className="py-2 text-red-600">โดนลบหายไปจากดิสก์</td>
                    <td className="py-2 text-emerald-600">คงอยู่ (ตารางเปล่าตัวใหม่)</td>
                    <td className="py-2 text-emerald-600">คงอยู่ (ลบแถวแต่คงตาราง)</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2 font-bold text-slate-700">เงื่อนไขคัดกรอง (WHERE)</td>
                    <td className="py-2">ไม่รองรับ</td>
                    <td className="py-2">ไม่รองรับ</td>
                    <td className="py-2 text-emerald-600 font-semibold">รองรับ (ลบเฉพาะแถวได้)</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2 font-bold text-slate-700">รีเซ็ต AUTO_INCREMENT</td>
                    <td className="py-2">ไม่ได้ (ตารางหายไปแล้ว)</td>
                    <td className="py-2 text-emerald-600 font-semibold">รีเซ็ตกลับไปเริ่มต้นที่ 1</td>
                    <td className="py-2 text-red-600">ไม่รีเซ็ต (นับค่าต่อจากเดิม)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2 font-bold text-slate-700">การทำ Rollback (เรียกคืนข้อมูล)</td>
                    <td className="py-2">ไม่รองรับ (ลบถาวร)</td>
                    <td className="py-2">ไม่รองรับ (ยืนยันคอมมิททันที)</td>
                    <td className="py-2 text-emerald-600 font-semibold">รองรับ (กู้คืนได้ผ่าน Transaction)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Frosted Callout */}
            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-indigo-500 leading-relaxed text-[14.5px] text-indigo-900">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                <Info className="w-4.5 h-4.5 text-indigo-600" /> ทำไม TRUNCATE จึงมีความเร็วเหนือกว่า DELETE ในตารางข้อมูลขนาดใหญ่?:
              </span>
              เนื่องจากคำสั่ง <span className="font-mono bg-indigo-100 text-indigo-800 px-1 rounded text-[12px] font-bold">DELETE</span> จะค่อยๆ ตรวจสอบและสแกนลบข้อมูลทีละแถว (Row-by-Row) พร้อมทั้งบันทึกการกระทำลงใน Transaction Log สำหรับเตรียมทำ Rollback ทำให้ใช้พลังงานระบบมาก ในขณะที่ <span className="font-mono bg-indigo-100 text-indigo-800 px-1 rounded text-[12px] font-bold">TRUNCATE</span> จะสั่งข้ามการบันทึก Log รายตัวและทำการปลดพื้นที่ (Deallocate Data Pages) ของตารางออกทันที ทำให้เสร็จสิ้นในระดับมิลลิวินาทีแม้มีข้อมูลนับล้านระเบียน
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              เปรียบเทียบกลไกการล้างข้อมูล / Sandbox Operations Comparison
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบจำลองการเปรียบเทียบพฤติกรรมคำสั่ง TRUNCATE TABLE และ DELETE
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองเลือกคำสั่งลบข้อมูลประเภทต่างๆ ด้านซ้ายมือ กดปุ่มรันคำสั่ง และทดสอบกดปุ่มเพิ่มระเบียนข้อมูลใหม่เพื่อวิเคราะห์พฤติกรรมค่าคีย์หลัก AUTO_INCREMENT ที่ได้รับ:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            
            {/* Left Column: Command Selectors & Controls */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[460px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                SQL CONSOLE
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    เลือกสคริปต์ลบข้อมูล:
                  </h4>
                  <button 
                    onClick={handleReset}
                    className="text-[9.5px] bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded hover:bg-indigo-600/50 cursor-pointer transition-colors"
                  >
                    Reset Simulator
                  </button>
                </div>

                {/* Command Radio Selection Toggles */}
                <div className="space-y-3.5">
                  {/* Option 1: TRUNCATE */}
                  <label className="flex items-center justify-between bg-slate-950/40 p-3.5 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-950/60 transition-colors">
                    <div className="flex gap-2.5 items-center">
                      <input 
                        type="radio" 
                        name="sqlCommand" 
                        value="TRUNCATE" 
                        checked={selectedCommand === 'TRUNCATE'} 
                        onChange={() => setSelectedCommand('TRUNCATE')} 
                        className="text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">TRUNCATE TABLE students;</span>
                        <span className="text-[10px] text-slate-300">ล้างระเบียนทั้งหมด & รีเซ็ต AUTO_INCREMENT</span>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: DELETE ALL */}
                  <label className="flex items-center justify-between bg-slate-950/40 p-3.5 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-950/60 transition-colors">
                    <div className="flex gap-2.5 items-center">
                      <input 
                        type="radio" 
                        name="sqlCommand" 
                        value="DELETE_ALL" 
                        checked={selectedCommand === 'DELETE_ALL'} 
                        onChange={() => setSelectedCommand('DELETE_ALL')} 
                        className="text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">DELETE FROM students;</span>
                        <span className="text-[10px] text-slate-300">ล้างระเบียนทั้งหมดแบบ DML (คงค่า AUTO_INCREMENT เดิม)</span>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: DELETE WHERE */}
                  <label className="flex items-center justify-between bg-slate-950/40 p-3.5 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-950/60 transition-colors">
                    <div className="flex gap-2.5 items-center">
                      <input 
                        type="radio" 
                        name="sqlCommand" 
                        value="DELETE_WHERE" 
                        checked={selectedCommand === 'DELETE_WHERE'} 
                        onChange={() => setSelectedCommand('DELETE_WHERE')} 
                        className="text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">DELETE WHERE id = 3;</span>
                        <span className="text-[10px] text-slate-300">ลบเฉพาะระเบียนที่มีรหัสเท่ากับ 3</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action launchers buttons */}
              <div className="space-y-3 mt-6">
                <button
                  onClick={handleExecute}
                  className="w-full flex items-center justify-center gap-2 h-10 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-600 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs"
                >
                  <Play className="w-4 h-4 text-white" /> Execute Selected SQL Query
                </button>

                <button
                  type="button"
                  onClick={handleInsertRow}
                  className="w-full flex items-center justify-center gap-2 h-9 bg-slate-950/80 border border-slate-800 text-slate-300 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-all cursor-pointer text-[11px]"
                >
                  <Plus className="w-4 h-4 text-indigo-400" /> Insert New Row (ทดสอบ AUTO_INCREMENT)
                </button>
              </div>

            </div>

            {/* Right Column: Database list and console output */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[460px] overflow-hidden z-10">
              
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  MySQL Workbench Database Viewer - students table
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Table Data list */}
              <div className="flex-1 p-5 space-y-6 flex flex-col justify-between">
                
                {/* Visual DB Grid */}
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4 relative">
                  {/* Next AI status indicators */}
                  <div className="absolute top-2 right-3 flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-800 px-2 py-0.5 rounded text-[10px] text-indigo-300 font-mono">
                    <Timer className="w-3 h-3 text-indigo-400" />
                    Next Auto Increment: <span className="font-bold text-white">{nextAutoId}</span>
                  </div>

                  <h5 className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5 font-mono mb-3">
                    <Table className="w-3.5 h-3.5 text-indigo-500" /> students table rows
                  </h5>

                  <div className="overflow-x-auto max-h-40 overflow-y-auto no-scrollbar">
                    <table className="w-full text-[11px] font-mono text-slate-400 text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 font-bold">
                          <th className="pb-2">id (AUTO_INC)</th>
                          <th className="pb-2">name</th>
                          <th className="pb-2 text-right">email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length > 0 ? (
                          students.map(std => (
                            <tr key={std.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors animate-fade-in">
                              <td className="py-2 text-indigo-400 font-bold">{std.id}</td>
                              <td className="py-2 text-slate-300">{std.name}</td>
                              <td className="py-2 text-slate-400 text-right">{std.email}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="py-6 text-center text-slate-600 italic">
                              ( ตารางว่างเปล่า / Empty Set )
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SQL syntax preview panel */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    SQL DDL/DML Statement Preview:
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-xs font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLPreview()}
                  </pre>
                </div>

              </div>

              {/* Console logs */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-32 overflow-y-auto no-scrollbar z-10">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> Action Output logs:
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
          title="ภารกิจวิเคราะห์ความต่างคำสั่งเคลียร์ระเบียนข้อมูล (MySQL TRUNCATE vs DELETE Task)" 
          taskText={`[ใบงานกิจกรรมปฏิบัติท้ายชั่วโมงเรียน]
ให้นักเรียนตอบคำถามจากการทดสอบโปรแกรมจำลอง TRUNCATE vs DELETE Sandbox Simulator ลงสมุดเรียน:

1. วิเคราะห์เปรียบเทียบทางทฤษฎี (Theoretical Comparison Analysis):
   - คำสั่ง TRUNCATE TABLE และ DELETE FROM ในแง่ภาษา SQL จัดอยู่ในประเภทคำสั่งระดับใด (DDL หรือ DML) และทั้งสองตัวมีความต่างในการใช้บันทึกไฟล์ระบบ (Transaction logging) อย่างไร?
   - เพราะเหตุใดคำสั่ง TRUNCATE TABLE จึงเป็นทางเลือกที่เหมาะสมมากกว่าในการล้างข้อมูลเพื่อเคลียร์ระบบตารางขนาดใหญ่เมื่อเทียบกับคำสั่ง DELETE?

2. การรีเซ็ตค่าคีย์หลัก (Auto-Increment Analysis):
   - ภายหลังจากการรันคำสั่ง DELETE FROM (ลบทั้งหมด) แล้วผู้ใช้เพิ่มข้อมูลนักเรียนคนใหม่ รหัส ID จะถูกรันลำดับต่อจากเดิม หรือรีเซ็ตกลับไปเริ่มต้นที่เลข 1?
   - พฤติกรรมค่าคีย์หลัก AUTO_INCREMENT หลังรันคำสั่ง TRUNCATE TABLE จะเป็นอย่างไรเมื่อเปรียบเทียบกับคำสั่ง DELETE? (จงเขียนอธิบายพร้อมภาพจำลองระบุประกอบ)

3. เขียนสคริปต์คำสั่งภาษา SQL (SQL DDL/DML Scripting):
   - จงเขียนโครงสร้างประโยค SQL สำหรับคำสั่งปฏิบัติการดังต่อไปนี้:
     1. ลบข้อมูลทั้งหมดจากตาราง "sales_history" ด้วยคำสั่งที่ทำงานเร็วที่สุดและต้องการคืนพื้นที่หน่วยความจำ
     2. ลบเฉพาะระเบียนของลูกค้าที่มีรหัสเท่ากับ 120 ออกจากตาราง "customers" ด้วยคำสั่งประเภท DML`}
        />

      </main>
    </div>
  );
}
