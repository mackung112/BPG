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
  AlertTriangle,
  CheckCircle2,
  Info,
  Terminal,
  Settings,
  ShieldAlert,
  Lock,
  Unlock,
  BookOpen,
  Shield,
  RefreshCw,
  Check
} from 'lucide-react';

export default function SQL3_5() {
  const [safeUpdates, setSafeUpdates] = useState(true); // default ON
  const [selectedQuery, setSelectedQuery] = useState('UNSAFE_NO_WHERE'); // 'UNSAFE_NO_WHERE' | 'UNSAFE_NON_KEY' | 'SAFE_KEY'
  
  const initialStudents = [
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
    { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
    { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [pulsingRowIds, setPulsingRowIds] = useState([]);

  // Logs
  const [logMessages, setLogMessages] = useState([
    { time: '08:10:00', status: 'info', message: 'Safe Updates Engine online.' },
    { time: '08:10:01', status: 'warning', message: 'SQL_SAFE_UPDATES is currently enabled (Value: 1).' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  const toggleSafeUpdates = () => {
    const nextState = !safeUpdates;
    setSafeUpdates(nextState);
    addLog(`SET SQL_SAFE_UPDATES = ${nextState ? '1' : '0'};`, 'info');
    if (!nextState) {
      addLog(`WARNING: Safe Update Mode disabled. Database is now unprotected from unsafe updates/deletes!`, 'warning');
    } else {
      addLog(`Safe Update Mode re-enabled. Protection active.`, 'success');
    }
  };

  const getSQLPreview = () => {
    switch (selectedQuery) {
      case 'UNSAFE_NO_WHERE':
        return 'UPDATE students\nSET class_id = 105;';
      case 'UNSAFE_NON_KEY':
        return `UPDATE students\nSET email = 'active_stud@mail.com'\nWHERE class_id = 101;`;
      case 'SAFE_KEY':
        return `UPDATE students\nSET email = 'updated@mail.com'\nWHERE id = 3;`;
      default:
        return '';
    }
  };

  const handleRunQuery = (e) => {
    e.preventDefault();
    const sqlPreview = getSQLPreview().replace(/\n/g, ' ');
    addLog(`Running Query: ${sqlPreview}`, 'info');

    if (safeUpdates) {
      // Safe Mode is ON (1)
      if (selectedQuery === 'UNSAFE_NO_WHERE') {
        addLog(`Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.`, 'error');
        addLog(`Execution blocked: UPDATE aborted. 0 rows affected.`, 'error');
      } else if (selectedQuery === 'UNSAFE_NON_KEY') {
        addLog(`Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column (class_id is not indexed/key).`, 'error');
        addLog(`Execution blocked: UPDATE aborted. 0 rows affected.`, 'error');
      } else {
        // SAFE_KEY
        setStudents(prev => prev.map(s => {
          if (s.id === 3) {
            return { ...s, email: 'updated@mail.com' };
          }
          return s;
        }));
        setPulsingRowIds([3]);
        addLog(`Query OK, 1 row affected (1.2ms). Rows matched: 1  Changed: 1  Warnings: 0`, 'success');
        setTimeout(() => setPulsingRowIds([]), 2000);
      }
    } else {
      // Safe Mode is OFF (0)
      if (selectedQuery === 'UNSAFE_NO_WHERE') {
        setStudents(prev => prev.map(s => ({ ...s, class_id: 105 })));
        setPulsingRowIds([1, 2, 3, 4, 5]);
        addLog(`Query OK, 5 rows affected (3.8ms). Rows matched: 5  Changed: 5  Warnings: 0`, 'success');
        addLog(`⚠️ CRITICAL WARNING: Entire table class_id values updated to 105 due to missing WHERE clause!`, 'warning');
        setTimeout(() => setPulsingRowIds([]), 2000);
      } else if (selectedQuery === 'UNSAFE_NON_KEY') {
        const matchedIds = students.filter(s => s.class_id === 101).map(s => s.id);
        setStudents(prev => prev.map(s => {
          if (s.class_id === 101) {
            return { ...s, email: 'active_stud@mail.com' };
          }
          return s;
        }));
        setPulsingRowIds(matchedIds);
        addLog(`Query OK, ${matchedIds.length} rows affected (2.4ms). Rows matched: ${matchedIds.length}  Changed: ${matchedIds.length}  Warnings: 0`, 'success');
        setTimeout(() => setPulsingRowIds([]), 2000);
      } else {
        // SAFE_KEY
        setStudents(prev => prev.map(s => {
          if (s.id === 3) {
            return { ...s, email: 'updated@mail.com' };
          }
          return s;
        }));
        setPulsingRowIds([3]);
        addLog(`Query OK, 1 row affected (1.1ms). Rows matched: 1  Changed: 1  Warnings: 0`, 'success');
        setTimeout(() => setPulsingRowIds([]), 2000);
      }
    }
  };

  const handleReset = () => {
    setStudents(initialStudents);
    setPulsingRowIds([]);
    addLog('Students table records reset to original data.', 'info');
  };

  // Detect if any columns are fully overwritten/hacked
  const isTotallyOverwritten = students.every(s => s.class_id === 105);
  const isClass101Emailed = students.filter(s => s.class_id === 101 && s.email === 'active_stud@mail.com').length === 3;

  return (
    <div className="w-full relative animate-fade-in" id="sql3_5-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              ภาษาจัดการข้อมูล DML / SQL Safe Mode
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เงื่อนไขและการตรวจสอบความถูกต้องก่อนการแก้ไขข้อมูล (Safe Updates)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              ข้อผิดพลาดที่ร้ายแรงที่สุดประการหนึ่งในการทำงานกับคำสั่ง <span className="font-semibold text-indigo-600 font-mono">UPDATE</span> คือ การเผลอกดรันคำสั่งแก้ไขโดยไม่ได้ระบุเงื่อนไข <span className="font-mono bg-indigo-50 text-indigo-700 px-1 rounded text-sm">WHERE</span> หรือระบุเงื่อนไขกว้างเกินไป ซึ่งส่งผลให้ข้อมูลทั้งตารางถูกอัปเดตทับด้วยค่าใหม่ทั้งหมดทันที (Mass Data Corruption)
            </p>

            <div className="bg-amber-50/60 backdrop-blur-md border border-amber-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-amber-500 leading-relaxed text-[14.5px] text-amber-900">
              <span className="font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
                <Shield className="w-4.5 h-4.5 text-amber-600 animate-pulse" /> ระบบความปลอดภัย SQL_SAFE_UPDATES คืออะไร?
              </span>
              ระบบจัดการฐานข้อมูล (เช่น MySQL Workbench) ได้ออกแบบระบบเซฟโหมดตัวกรองความปลอดภัย โดยกำหนดค่า <span className="font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-xs">SQL_SAFE_UPDATES = 1</span> ไว้เป็นค่าเริ่มต้น ระบบจะบล็อก (Block) และยกเลิกการแก้ไขข้อมูลของคำสั่ง UPDATE หรือ DELETE ทันที หากตรวจพบว่าคำสั่งนั้น **ไม่มีเงื่อนไข WHERE** หรือ **เงื่อนไข WHERE ไม่ได้ระบุคอลัมน์ที่เป็นคีย์หลัก (เช่น Primary Key หรือ Index)**
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <span className="text-xs font-bold text-red-500 font-mono uppercase tracking-wider block mb-1">❌ แบบอันตราย (Unsafe Update)</span>
                <pre className="text-[13px] font-mono bg-slate-900 text-rose-400 p-3 rounded-lg overflow-x-auto">
                  {`-- ไม่มี WHERE (แก้ไขหมด)
UPDATE students SET class_id = 105;

-- WHERE คอลัมน์ที่ไม่ได้ดัชนีคีย์
UPDATE students 
SET email = 'temp@mail.com' 
WHERE class_id = 101;`}
                </pre>
                <p className="text-[13px] text-slate-500 mt-2.5 leading-relaxed">
                  เมื่อระบบป้องกันทำงาน คำสั่งด้านบนจะถูกบล็อกและแจ้งเตือน <span className="font-mono text-red-600 bg-red-50 px-1 rounded text-xs font-bold">Error 1175</span> เพื่อช่วยชีวิตข้อมูล
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <span className="text-xs font-bold text-emerald-600 font-mono uppercase tracking-wider block mb-1">✅ แบบปลอดภัย (Safe Update)</span>
                <pre className="text-[13px] font-mono bg-slate-900 text-emerald-400 p-3 rounded-lg overflow-x-auto">
                  {`-- มี WHERE และอ้างอิง Primary Key
UPDATE students 
SET email = 'updated@mail.com' 
WHERE id = 3;`}
                </pre>
                <p className="text-[13px] text-slate-500 mt-2.5 leading-relaxed">
                  คำสั่งนี้ระบุตัวระบุเฉพาะเจาะจงเจาะถึงคีย์หลักของข้อมูลระเบียน ทำให้เครื่องคอมพิวเตอร์สามารถประมวลผลได้อย่างปลอดภัยและรวดเร็ว
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองระบบความปลอดภัยแก้ไข / Safe Updates Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทดลองสับสวิตช์ควบคุมเซฟโหมดและรันสคริปต์ SQL เพื่อประเมินพฤติกรรมการบล็อกของ RDBMS
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* Left Controls */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[500px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                SAFE CONTROL
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    ตั้งค่า Safe Updates & SQL Query:
                  </h4>
                  <button 
                    onClick={handleReset}
                    className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded hover:bg-slate-700 hover:text-white cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Data
                  </button>
                </div>

                {/* Switch for Safe updates */}
                <div className="bg-slate-950/50 p-4 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      {safeUpdates ? (
                        <Lock className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Unlock className="w-4 h-4 text-rose-500 animate-pulse" />
                      )}
                      SQL_SAFE_UPDATES = {safeUpdates ? '1' : '0'}
                    </span>
                    <button
                      onClick={toggleSafeUpdates}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                        safeUpdates 
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30' 
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/30'
                      }`}
                    >
                      {safeUpdates ? 'เปิดเซฟโหมด (ON)' : 'ปิดเซฟโหมด (OFF)'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {safeUpdates 
                      ? '🔒 มีการปกป้อง: MySQL จะยกเลิก UPDATE หรือ DELETE หากไม่มี WHERE ที่ระบุ Key Column'
                      : '⚠️ ไร้การปกป้อง: คำสั่ง DML ทั้งหมดจะทำงานโดยไม่มีการกลั่นกรอง แม้ข้อมูลจะเสียหายทั้งตาราง'}
                  </p>
                </div>

                {/* Query Selection options */}
                <div className="space-y-3">
                  <span className="text-xs text-slate-300 font-mono font-bold block">เลือกคิวรีจำลองเพื่อกดรันทดสอบ:</span>
                  
                  {/* Option 1: Unsafe no WHERE */}
                  <label className={`flex items-start gap-3 bg-slate-950/40 p-3 rounded-xl border cursor-pointer hover:bg-slate-950/60 transition-all ${
                    selectedQuery === 'UNSAFE_NO_WHERE' ? 'border-orange-500' : 'border-white/5'
                  }`}>
                    <input 
                      type="radio" 
                      name="safeQueryOpt"
                      value="UNSAFE_NO_WHERE"
                      checked={selectedQuery === 'UNSAFE_NO_WHERE'}
                      onChange={() => setSelectedQuery('UNSAFE_NO_WHERE')}
                      className="mt-1 text-orange-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-[12.5px] font-mono font-bold text-rose-400 block">UPDATE students SET class_id = 105;</span>
                      <span className="text-[11px] text-slate-400">แก้ไขค่าทั้งหมดโดยไม่ได้ใส่ WHERE (เสี่ยงพังทลาย)</span>
                    </div>
                  </label>

                  {/* Option 2: Unsafe with WHERE non-key */}
                  <label className={`flex items-start gap-3 bg-slate-950/40 p-3 rounded-xl border cursor-pointer hover:bg-slate-950/60 transition-all ${
                    selectedQuery === 'UNSAFE_NON_KEY' ? 'border-orange-500' : 'border-white/5'
                  }`}>
                    <input 
                      type="radio" 
                      name="safeQueryOpt"
                      value="UNSAFE_NON_KEY"
                      checked={selectedQuery === 'UNSAFE_NON_KEY'}
                      onChange={() => setSelectedQuery('UNSAFE_NON_KEY')}
                      className="mt-1 text-orange-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-[12.5px] font-mono font-bold text-amber-400 block">UPDATE students SET ... WHERE class_id = 101;</span>
                      <span className="text-[11px] text-slate-400">แก้ไขเฉพาะกลุ่ม แต่ฟิลด์ class_id ไม่ใช่ดัชนีคีย์ระเบียบ</span>
                    </div>
                  </label>

                  {/* Option 3: Safe with WHERE key */}
                  <label className={`flex items-start gap-3 bg-slate-950/40 p-3 rounded-xl border cursor-pointer hover:bg-slate-950/60 transition-all ${
                    selectedQuery === 'SAFE_KEY' ? 'border-orange-500' : 'border-white/5'
                  }`}>
                    <input 
                      type="radio" 
                      name="safeQueryOpt"
                      value="SAFE_KEY"
                      checked={selectedQuery === 'SAFE_KEY'}
                      onChange={() => setSelectedQuery('SAFE_KEY')}
                      className="mt-1 text-orange-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-[12.5px] font-mono font-bold text-emerald-400 block">UPDATE students SET ... WHERE id = 3;</span>
                      <span className="text-[11px] text-slate-400">แก้ไขคอลัมน์เจาะจงระบุพิกัดตรงด้วยคีย์หลัก id (ปลอดภัยสูง)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Run Query Button */}
              <button
                onClick={handleRunQuery}
                className="w-full flex items-center justify-center gap-2 h-10 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
              >
                <Play className="w-4 h-4 text-white" /> Execute Query Statement
              </button>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[500px] overflow-hidden z-10">
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-orange-400" />
                  MySQL Workbench Grid view
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Table Records List */}
              <div className="flex-1 p-5 space-y-5 flex flex-col justify-between">
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4 relative">
                  <h5 className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5 font-mono mb-2">
                    <Table className="w-3.5 h-3.5 text-orange-500" /> students records list
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
                        {students.map(std => (
                          <tr 
                            key={std.id} 
                            className={`border-b border-slate-800 hover:bg-white/5 transition-all duration-300 ${
                              pulsingRowIds.includes(std.id) 
                                ? (selectedQuery === 'UNSAFE_NO_WHERE' 
                                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-200 font-bold scale-[1.01]' 
                                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 font-bold scale-[1.01]')
                                : ''
                            }`}
                          >
                            <td className="py-2 text-orange-400 font-bold font-mono">{std.id}</td>
                            <td className="py-2 font-sans text-slate-300">{std.name}</td>
                            <td className="py-2 text-slate-300">{std.email}</td>
                            <td className="py-2 text-slate-300 text-right">{std.class_id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Highlight warning if catastrophically overwritten */}
                  {isTotallyOverwritten && (
                    <div className="mt-3 bg-rose-950/40 border border-rose-800/40 rounded-lg p-2.5 text-[11px] text-rose-300 flex items-center gap-2 animate-pulse">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>ภัยพิบัติระบบ! ข้อมูลคอลัมน์ class_id ของทุกคนถูกเปลี่ยนเป็น 105 เนื่องจากไม่มีเงื่อนไข WHERE ในคำสั่ง และเซฟโหมดถูกสับสวิตช์ปิดอยู่!</span>
                    </div>
                  )}

                  {isClass101Emailed && !isTotallyOverwritten && (
                    <div className="mt-3 bg-amber-950/40 border border-amber-800/45 rounded-lg p-2.5 text-[11px] text-amber-300 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>ข้อมูลเฉพาะกลุ่มที่มี class_id = 101 ได้รับการแก้ไขแล้ว แต่หากเปิดระบบ Safe Mode จะโดนสกัดไว้เนื่องจาก class_id ไม่ใช่ดัชนีคีย์หลัก</span>
                    </div>
                  )}
                </div>

                {/* SQL query Preview */}
                <div className="space-y-1">
                  <div className="text-[9.5px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    Generated SQL Preview:
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-[13px] font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLPreview()}
                  </pre>
                </div>
              </div>

              {/* Console log */}
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
                            ? 'text-rose-500 font-bold' 
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
          title="ใบงานทบทวนความปลอดภัยระดับเซฟโหมด (MySQL Safe Updates Practice Task)" 
          taskText={`[กิจกรรมปฏิบัติการ DML Safe Mode]
ให้นักเรียนวิเคราะห์ผลกระทบการอัปเดตข้อมูลผ่าน Sandbox แล้วอธิบายรายละเอียดดังนี้:

1. วิเคราะห์กลไกเซฟโหมด (Safe Mode Logic):
   - เพราะเหตุใด MySQL Workbench จึงต้องเปิดระบบ SQL_SAFE_UPDATES = 1 ไว้เป็นค่าเริ่มต้น?
   - ข้อผิดพลาดในการรัน UPDATE แบบไม่มี WHERE ในองค์กรธุรกิจส่งผลเสียหายอย่างไรในทางปฏิบัติ?

2. การประเมินคำสั่งคิวรี (Query Assessment):
   - สมมติว่าต้องการปรับปรุงค่าในตาราง "students" แต่เซฟโหมดเปิดอยู่ (SQL_SAFE_UPDATES = 1) คำสั่งดังต่อไปนี้สามารถทำได้สำเร็จหรือไม่? เพราะเหตุใด?
     1) UPDATE students SET email = 'user@mail.com' WHERE name = 'สมชาย'; (คอลัมน์ name ไม่ใช่คีย์หลัก)
     2) UPDATE students SET class_id = 101 WHERE id = 1; (คอลัมน์ id เป็นคีย์หลัก/Primary Key)

3. การเขียนสคริปต์แก้ไขอย่างปลอดภัย (Safe DML Scripting):
   - จงเขียนคำสั่งเปิดและปิดระบบเซฟโหมดของ MySQL ผ่านสคริปต์ SQL
   - จงเขียนประโยค SQL แก้ไขตารางบุคลากร "employees" โดยต้องการปรับเปลี่ยนฐานเงินเดือน "salary" เป็น 45,000 บาท ให้แก่พนักงานที่มีรหัส "EMP009" ซึ่งคอลัมน์รหัสนี้ถูกระบุเป็น Primary Key ของตาราง`}
        />

      </main>
    </div>
  );
}
