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

export default function SQL3_3() {
  const [selectedQueryMode, setSelectedQueryMode] = useState('IS_NULL'); // 'IS_NULL' | 'IS_NOT_NULL' | 'EQUALS_NULL'
  
  // Table rows with some NULL emails
  const students = [
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: null, class_id: 102 },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
    { id: 4, name: 'สมเดช', email: null, class_id: 102 },
    { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
  ];

  // Logs
  const [logMessages, setLogMessages] = useState([
    { time: '08:00:00', status: 'info', message: 'NULL Logic Engine loaded.' },
    { time: '08:00:01', status: 'info', message: 'Tabel students loaded. Warning: comparison with NULL requires special keywords.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  const getSQLPreview = () => {
    switch (selectedQueryMode) {
      case 'IS_NULL':
        return 'SELECT * FROM students WHERE email IS NULL;';
      case 'IS_NOT_NULL':
        return 'SELECT * FROM students WHERE email IS NOT NULL;';
      case 'EQUALS_NULL':
        return 'SELECT * FROM students WHERE email = NULL; -- WARNING: Fails to match NULL!';
      default:
        return '';
    }
  };

  // Run selected query
  const getQueryResult = () => {
    switch (selectedQueryMode) {
      case 'IS_NULL':
        return students.filter(s => s.email === null);
      case 'IS_NOT_NULL':
        return students.filter(s => s.email !== null);
      case 'EQUALS_NULL':
        // Comparing with = NULL in SQL always yields unknown (empty results)
        return [];
      default:
        return students;
    }
  };

  const handleRunQuery = (e) => {
    e.preventDefault();
    const sql = getSQLPreview();
    const result = getQueryResult();

    addLog(`Running DQL: ${sql}`, 'info');

    if (selectedQueryMode === 'EQUALS_NULL') {
      addLog(`Empty set returned (0.5ms). Warning: Comparison '= NULL' always returns NULL (Unknown) in SQL. Use 'IS NULL' instead.`, 'warning');
    } else {
      addLog(`Query OK. Returned ${result.length} rows (1.1ms).`, 'success');
    }
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql3_3-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              การจัดการค่าข้อมูล / NULL Logic & Queries
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การจัดการและทำความเข้าใจกับค่าว่าง (NULL Values)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              ในระบบฐานข้อมูลเชิงสัมพันธ์ ค่า <span className="font-mono font-bold text-indigo-600 bg-slate-100 px-1 rounded text-sm">NULL</span> ไม่ใช่ค่าช่องว่างเปล่า (Empty String `""`) และไม่ใช่เลขศูนย์ (`0`) แต่หมายถึง **การไม่มีอยู่ของข้อมูล (Missing/Unknown Value)** หรือไม่มีข้อมูลถูกกรอกลงฟิลด์นั้น ทำให้มีกลไกทางตรรกศาสตร์สามค่า (Three-Valued Logic) ที่ทำให้การเขียนเงื่อนไขตรวจสอบปกติต้องใช้คีย์เวิร์ดเฉพาะ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-6">
              {/* Box 1: Why = NULL fails */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-rose-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <h4 className="text-[15px] font-bold text-slate-800 mb-2 font-mono flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" /> ทำไมเงื่อนไข "= NULL" จึงขัดข้อง?
                </h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  เนื่องจากคอมพิวเตอร์ไม่สามารถบอกได้ว่า "สิ่งที่ไม่รู้" จะเท่ากับ "สิ่งที่ไม่รู้" หรือไม่ ส่งผลให้ประโยคเปรียบเทียบ `WHERE email = NULL` ได้ค่าผลลัพธ์เป็น Unknown เสมอ และตารางจะไม่คืนแถวข้อมูลใดๆ ออกมาเลย
                </p>
              </div>

              {/* Box 2: IS NULL keywords */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-emerald-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <h4 className="text-[15px] font-bold text-slate-800 mb-2 font-mono flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> คีย์เวิร์ด "IS NULL" และ "IS NOT NULL"
                </h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  เมื่อต้องการดึงข้อมูลแถวที่มีหรือไม่มีค่า NULL ทาง RDBMS จึงจัดหาคำสั่งเฉพาะคือ `IS NULL` เพื่อกรองระเบียนค่าว่าง และ `IS NOT NULL` เพื่อดึงระเบียนแถวข้อมูลที่มีเนื้อหาครบถ้วน
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              เปรียบเทียบตรรกะค่าว่าง / NULL Logic Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบวิเคราะห์ผลกระทบการคัดกรองระเบียนตารางที่มีค่าว่าง (NULL)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* Left Panel */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[460px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                SELECT LOGIC
              </span>

              <div className="space-y-6 mt-4">
                <div className="border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    เลือกเงื่อนไขคัดกรองคิวรี:
                  </h4>
                </div>

                <div className="space-y-3">
                  {/* IS NULL */}
                  <label className="flex items-center justify-between bg-slate-950/40 p-3.5 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-950/60 transition-colors">
                    <div className="flex gap-2.5 items-center">
                      <input 
                        type="radio" 
                        name="nullLogic" 
                        value="IS_NULL" 
                        checked={selectedQueryMode === 'IS_NULL'} 
                        onChange={() => setSelectedQueryMode('IS_NULL')} 
                        className="text-orange-600 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">WHERE email IS NULL</span>
                        <span className="text-[10px] text-slate-300">ดึงเฉพาะแถวที่ไม่ได้กรอกอีเมล</span>
                      </div>
                    </div>
                  </label>

                  {/* IS NOT NULL */}
                  <label className="flex items-center justify-between bg-slate-950/40 p-3.5 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-950/60 transition-colors">
                    <div className="flex gap-2.5 items-center">
                      <input 
                        type="radio" 
                        name="nullLogic" 
                        value="IS_NOT_NULL" 
                        checked={selectedQueryMode === 'IS_NOT_NULL'} 
                        onChange={() => setSelectedQueryMode('IS_NOT_NULL')} 
                        className="text-orange-600 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">WHERE email IS NOT NULL</span>
                        <span className="text-[10px] text-slate-300">ดึงเฉพาะแถวที่มีอีเมลครบถ้วน</span>
                      </div>
                    </div>
                  </label>

                  {/* EQUALS NULL */}
                  <label className="flex items-center justify-between bg-slate-950/40 p-3.5 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-950/60 transition-colors border-rose-500/25">
                    <div className="flex gap-2.5 items-center">
                      <input 
                        type="radio" 
                        name="nullLogic" 
                        value="EQUALS_NULL" 
                        checked={selectedQueryMode === 'EQUALS_NULL'} 
                        onChange={() => setSelectedQueryMode('EQUALS_NULL')} 
                        className="text-rose-500 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-rose-400 block font-mono flex items-center gap-1">
                          WHERE email = NULL <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                        </span>
                        <span className="text-[10px] text-slate-300">ทดสอบการเขียนผิดไวยากรณ์เปรียบเทียบ</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Run Query Button */}
              <button
                onClick={handleRunQuery}
                className="w-full flex items-center justify-center gap-2 h-10 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-600 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
              >
                <Play className="w-4 h-4 text-white" /> Execute Query Statement
              </button>
            </div>

            {/* Right Display Panels */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[460px] overflow-hidden z-10">
              
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-orange-400" />
                  MySQL Query Execution results
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Tables display area */}
              <div className="flex-1 p-5 space-y-5 flex flex-col justify-between">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Original Table */}
                  <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3">
                    <span className="text-[9px] font-mono text-slate-500 absolute top-2 right-3 font-bold uppercase">
                      Disk Data
                    </span>
                    <h5 className="text-[11px] font-bold text-slate-300 flex items-center gap-1 font-mono mb-2">
                      <Table className="w-3.5 h-3.5 text-slate-400" /> students (Original)
                    </h5>
                    <div className="overflow-x-auto max-h-32 overflow-y-auto no-scrollbar">
                      <table className="w-full text-[10.5px] font-mono text-slate-400 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500 font-bold">
                            <th className="pb-1">id</th>
                            <th className="pb-1">name</th>
                            <th className="pb-1">email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map(s => (
                            <tr key={s.id} className="border-b border-slate-800">
                              <td>{s.id}</td>
                              <td>{s.name}</td>
                              <td>{s.email === null ? <span className="text-red-500/70 font-bold italic font-mono text-[9px] bg-red-950/20 px-1 rounded">NULL</span> : s.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Query Result Table */}
                  <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3">
                    <span className="text-[9px] font-mono text-emerald-400 absolute top-2 right-3 font-bold uppercase">
                      Query Output
                    </span>
                    <h5 className="text-[11px] font-bold text-slate-300 flex items-center gap-1 font-mono mb-2">
                      <Table className="w-3.5 h-3.5 text-emerald-500" /> Result grid
                    </h5>
                    <div className="overflow-x-auto max-h-32 overflow-y-auto no-scrollbar">
                      <table className="w-full text-[10.5px] font-mono text-slate-400 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500 font-bold">
                            <th className="pb-1">id</th>
                            <th className="pb-1">name</th>
                            <th className="pb-1">email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getQueryResult().length > 0 ? (
                            getQueryResult().map(s => (
                              <tr key={s.id} className="border-b border-slate-800 hover:bg-white/5 animate-fade-in">
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.email === null ? <span className="text-red-500/70 font-bold italic font-mono text-[9px] bg-red-950/20 px-1 rounded">NULL</span> : s.email}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="py-6 text-center text-slate-500 italic">
                                ( Empty Set / 0 rows returned )
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* SQL syntax generator preview */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    DQL Query Code Preview:
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-xs font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
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
                            ? 'text-rose-500 font-bold animate-pulse' 
                            : msg.status === 'warning'
                              ? 'text-amber-500 font-bold'
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
          title="ใบงานทดสอบเปรียบเทียบและการจัดการตรรกะค่าว่าง (MySQL NULL values Task)" 
          taskText={`[กิจกรรมส่งท้ายชั่วโมง DML NULL]
ให้นักเรียนตอบคำถามจากการประเมินและทฤษฎีในบทเรียนลงในสมุด:

1. วิเคราะห์ความหมายและผลลัพธ์คิวรี (NULL logic Analysis):
   - ทำไมคำสั่ง "SELECT * FROM students WHERE email = NULL" จึงไม่ได้เรคคอร์ดใดๆ ออกมาจากระบบจำลอง? อธิบายความหมายเชิงลึกของตรรกศาสตร์สามค่า (Three-Valued Logic) ใน RDBMS
   - ความแตกต่างทางขนาดพื้นที่จัดเก็บในฟิสิกส์ดิสก์ ระหว่างคอลัมน์ที่เป็น VARCHAR เก็บค่า NULL กับการเก็บค่าช่องว่างเปล่า (Empty String "") คืออะไร?

2. การประยุกต์เปรียบเทียบเงื่อนไข (DQL Filter Conditions):
   - หากโจทย์ต้องการข้อมูลนักเรียนทั้งหมดในระบบ ยกเว้นนักเรียนที่ไม่มีประวัติอีเมล จะต้องเขียนคิวรีกรองฟิลด์แบบใด? (จงเขียนโค้ด)
   - คีย์เวิร์ด IS NOT NULL และ IS NULL ใช้รันร่วมกับคำสั่งแก้ไขโครงสร้าง DDL ได้หรือไม่?

3. เขียนสคริปต์ SQL คิวรี (DQL NULL Coding):
   - จงเขียนประโยคดึงข้อมูลพนักงาน "employees" (id, full_name, department_id, salary) ภายใต้โจทย์ดังนี้:
     1. ค้นหาพนักงานที่ไม่ได้ระบุชื่อรหัสแผนกงาน (department_id เป็นค่าว่าง)
     2. ค้นหาพนักงานที่ได้ระบุแผนกงานครบถ้วนแล้วและมีอัตราเงินเดือนมากกว่า 30,000 บาท`}
        />

      </main>
    </div>
  );
}
