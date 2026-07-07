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
  Play,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Info,
  Terminal,
  RefreshCw,
  BookOpen,
  Lock,
  Unlock
} from 'lucide-react';

export default function SQL3_6() {
  const [safeMode, setSafeMode] = useState(true);
  const [selectedId, setSelectedId] = useState('2');
  const [omitWhere, setOmitWhere] = useState(false);
  
  const initialStudents = [
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
    { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
    { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [removingIds, setRemovingIds] = useState([]);

  // Console Logs
  const [logMessages, setLogMessages] = useState([
    { time: '08:15:00', status: 'info', message: 'DML DELETE Simulator initialized.' },
    { time: '08:15:01', status: 'info', message: 'Safe Updates Protection is active. SELECT Target Row to delete.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  const getSQLPreview = () => {
    if (omitWhere) {
      return 'DELETE FROM students;';
    }
    return `DELETE FROM students\nWHERE id = ${selectedId || 'NULL'};`;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const sqlText = getSQLPreview().replace(/\n/g, ' ');
    addLog(`Running DML: ${sqlText}`, 'info');

    if (omitWhere) {
      if (safeMode) {
        addLog(`Error Code: 1175. You are using safe update mode and you tried to delete all rows without a WHERE clause that uses a KEY column.`, 'error');
        addLog(`Aborting DELETE operation to protect database rows.`, 'error');
      } else {
        // Safe Mode is OFF: Wipe all rows!
        const allIds = students.map(s => s.id);
        setRemovingIds(allIds);
        
        setTimeout(() => {
          setStudents([]);
          setRemovingIds([]);
          addLog(`Query OK, ${allIds.length} rows affected (4.5ms). WARNING: All student records have been wiped out!`, 'warning');
        }, 800);
      }
    } else {
      const targetIdVal = parseInt(selectedId, 10);
      const studentExists = students.some(s => s.id === targetIdVal);

      if (!studentExists) {
        addLog(`Query OK, 0 rows affected (0.8ms). No student matched with ID ${targetIdVal}.`, 'warning');
        return;
      }

      setRemovingIds([targetIdVal]);
      
      // Animate fade out then remove
      setTimeout(() => {
        setStudents(prev => prev.filter(s => s.id !== targetIdVal));
        setRemovingIds([]);
        addLog(`Query OK, 1 row affected (1.9ms). Record with ID ${targetIdVal} deleted from system.`, 'success');
        
        // Pick another existing student for selectedId
        const remaining = students.filter(s => s.id !== targetIdVal);
        if (remaining.length > 0) {
          setSelectedId(remaining[0].id.toString());
        } else {
          setSelectedId('');
        }
      }, 800);
    }
  };

  const handleReset = () => {
    setStudents(initialStudents);
    setSelectedId('2');
    setRemovingIds([]);
    setOmitWhere(false);
    addLog('Students table records re-populated.', 'info');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql3_6-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              ภาษาจัดการข้อมูล DML / DELETE Statement
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คำสั่งลบข้อมูล (DELETE)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              คำสั่ง <span className="font-semibold text-indigo-600 font-mono">DELETE</span> ใช้สำหรับลบระเบียนแถวข้อมูลที่ไม่ต้องการออกจากตารางโดยการกรองเงื่อนไขผ่านเงื่อนไข <span className="font-mono bg-indigo-50 text-indigo-700 px-1 rounded text-sm">WHERE</span> โดยยังคงโครงสร้างตาราง คอลัมน์ และข้อจำกัด (Constraints) ไว้ตามเดิม ซึ่งพฤติกรรมนี้ต่างจากคำสั่ง DDL `DROP TABLE` (ลบทั้งตารางและโครงสร้าง) และ `TRUNCATE TABLE` (ล้างข้อมูลทั้งหมดพร้อมรีเซ็ต Auto Increment)
            </p>

            <div className="bg-orange-50/60 backdrop-blur-md border border-orange-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-orange-500 leading-relaxed text-[14.5px] text-orange-950">
              <span className="font-bold text-orange-900 flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="w-4.5 h-4.5 text-orange-600" /> ข้อควรระวังสูงสุดเกี่ยวกับคำสั่ง DELETE:
              </span>
              หากเรียกใช้คำสั่ง `DELETE FROM table_name;` โดยไม่ได้ใส่เงื่อนไข `WHERE` คัดกรอง ข้อมูลระเบียนทั้งหมดจะถูกลบเกลี้ยงตารางทันที RDBMS จะต้องประมวลผลการลบและบันทึกประวัติการกระทำทีละแถว (Log record deletion) ทำให้การลบข้อมูลปริมาณมหาศาลใช้เวลานานและกินทรัพยากรมากกว่า TRUNCATE
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองคิวรีลบข้อมูล / DELETE Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบจำลองการลบระเบียนข้อมูลพร้อมเอฟเฟกต์เฟดระเบียนสูญหายแบบเรียลไทม์
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* Left Controls */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[480px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                DELETE OPTIONS
              </span>

              <div className="space-y-5 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    ควบคุมคำสั่งลบข้อมูล:
                  </h4>
                  <button 
                    onClick={handleReset}
                    className="text-[10px] bg-orange-600/30 text-orange-300 border border-orange-500/20 px-2.5 py-1 rounded hover:bg-orange-600/50 cursor-pointer transition-colors"
                  >
                    Reset Records
                  </button>
                </div>

                {/* Switch for Safe Mode */}
                <div className="flex items-center justify-between bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-1.5">
                    {safeMode ? (
                      <Lock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Unlock className="w-4 h-4 text-rose-500 animate-pulse" />
                    )}
                    <span className="text-xs font-mono text-slate-300 font-bold">SQL_SAFE_UPDATES = {safeMode ? '1' : '0'}</span>
                  </div>
                  <button
                    onClick={() => setSafeMode(!safeMode)}
                    className={`text-[10.5px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer ${
                      safeMode ? 'bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50' : 'bg-rose-600/30 text-rose-300 hover:bg-rose-600/50'
                    }`}
                  >
                    {safeMode ? 'เปิดคุ้มครอง' : 'ปิดการคุ้มครอง'}
                  </button>
                </div>

                {/* Option checkboxes */}
                <div className="bg-slate-950/40 p-4 border border-slate-800 rounded-xl space-y-4">
                  {/* Select target ID */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        id="omitWhereCheck"
                        checked={omitWhere}
                        onChange={(e) => setOmitWhere(e.target.checked)}
                        className="text-orange-600 focus:ring-0 cursor-pointer rounded bg-slate-800 border-slate-700"
                      />
                      <label htmlFor="omitWhereCheck" className="text-xs text-rose-300 font-bold font-mono cursor-pointer flex items-center gap-1">
                        ละทิ้งเงื่อนไข WHERE (ลบระเบียนทั้งหมด)
                      </label>
                    </div>
                  </div>

                  {!omitWhere && (
                    <div className="space-y-1.5 animate-fade-in">
                      <label className="text-xs text-slate-400 font-mono font-bold block">ค้นหารหัสเป้าหมายที่จะลบ (WHERE id = ?):</label>
                      <select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none focus:border-orange-500 cursor-pointer"
                        disabled={students.length === 0}
                      >
                        {students.length === 0 ? (
                          <option value="">ไม่มีข้อมูลนักเรียนเหลือในตาราง</option>
                        ) : (
                          students.map(s => (
                            <option key={s.id} value={s.id}>ID {s.id} - {s.name}</option>
                          ))
                        )}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Run Button */}
              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 h-10 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6 shadow-lg shadow-rose-950/30"
                disabled={students.length === 0 && !omitWhere}
              >
                <Trash2 className="w-4 h-4 text-white" /> Run SQL DELETE Statement
              </button>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[480px] overflow-hidden z-10">
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-orange-400" />
                  MySQL Live Table Grid Data
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Table Grid Content */}
              <div className="flex-1 p-5 space-y-6 flex flex-col justify-between">
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4">
                  <h5 className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5 font-mono mb-2">
                    <Table className="w-3.5 h-3.5 text-rose-500" /> students table records
                  </h5>
                  <div className="overflow-x-auto max-h-44 overflow-y-auto no-scrollbar">
                    <table className="w-full text-xs font-mono text-slate-400 text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 font-bold">
                          <th className="pb-2">id (PK)</th>
                          <th className="pb-2">name</th>
                          <th className="pb-2">email</th>
                          <th className="pb-2 text-right">class_id</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length > 0 ? (
                          students.map(std => {
                            const isRemoving = removingIds.includes(std.id);
                            return (
                              <tr 
                                key={std.id} 
                                className={`border-b border-slate-800 hover:bg-white/5 transition-all duration-700 ${
                                  isRemoving ? 'opacity-0 scale-95 -translate-x-4 bg-rose-950/40 text-rose-300' : ''
                                }`}
                              >
                                <td className="py-2 text-orange-400 font-bold">{std.id}</td>
                                <td className="py-2 font-sans text-slate-300">{std.name}</td>
                                <td className="py-2 text-slate-300">{std.email}</td>
                                <td className="py-2 text-slate-300 text-right">{std.class_id}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="4" className="py-12 text-center text-slate-500 italic">
                              ( Empty set / 0 records in students table )
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SQL Code Preview */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    DML Syntax Preview:
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-[13px] font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLPreview()}
                  </pre>
                </div>
              </div>

              {/* Database terminal console output */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-32 overflow-y-auto no-scrollbar z-10">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> Database Logs Output:
                </div>
                <div className="space-y-1 text-slate-300">
                  {logMessages.map((msg, i) => (
                    <div key={i} className="flex gap-2.5 leading-relaxed">
                      <span className="text-slate-600 select-none shrink-0">{msg.time}</span>
                      <span className={
                        msg.status === 'success' 
                          ? 'text-emerald-400 font-bold' 
                          : msg.status === 'error' 
                            ? 'text-rose-500 font-bold animate-pulse' 
                            : msg.status === 'warning'
                              ? 'text-amber-500 font-bold'
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
          title="ใบงานทบทวนสคริปต์ลบข้อมูลระเบียน (MySQL DELETE Practice Task)" 
          taskText={`[กิจกรรมปฏิบัติการ DML DELETE]
ให้นักเรียนตอบคำถามจากการประเมินและการทดสอบใช้งาน Sandbox ของคำสั่งลบข้อมูล:

1. วิเคราะห์และเปรียบเทียบการลบข้อมูล (DELETE vs TRUNCATE vs DROP):
   - การลบแถวทั้งหมดด้วย DELETE FROM students; แตกต่างจากการเรียกใช้คำสั่ง TRUNCATE TABLE students; ในมุมของประวัติความเร็วและการรีเซ็ตคีย์ AUTO_INCREMENT อย่างไร?
   - โครงสร้างดั้งเดิมของตาราง (คอลัมน์ ข้อจำกัดคีย์) จะยังคงอยู่หรือไม่ในคำสั่ง DELETE และคำสั่ง DROP TABLE?

2. การระบุเงื่อนไขในคิวรีลบข้อมูล (DML DELETE Query Filter):
   - จงเขียนโค้ด SQL ลบข้อมูลออกจากตาราง "products" โดยกำหนดเงื่อนไขลบสินค้าที่ล้าสมัยซึ่งมีปริมาณสินค้าคงคลัง (stock) เท่ากับ 0 และยอดเข้าชม (views) น้อยกว่า 10 ครั้ง
   - จะเกิดอะไรขึ้นหากเราปิดเซฟโหมดและรันสคริปต์ DELETE FROM students;? อธิบายสถานการณ์ในโลกความเป็นจริงหากไม่มีข้อมูลสำรอง (Backups)

3. พัฒนาสคริปต์ DML DELETE (Coding Practice):
   - จงเขียนประโยคลบข้อมูลในตารางบัญชี "accounts" (id, owner, type, balance, active_status) ภายใต้โจทย์ข้อตกลงปฏิบัติการดังนี้:
     1. ลบระเบียนแถวบัญชีเงินฝากที่มีรหัส id เป็น 1025
     2. ลบระเบียนบัญชีเงินฝากทั้งหมดที่มีสถานะ active_status เป็น 'INACTIVE' และยอดเงิน balance เป็น 0.00`}
        />

      </main>
    </div>
  );
}
