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
  Link,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function SQL3_7() {
  const [fkBehavior, setFkBehavior] = useState('RESTRICT'); // 'RESTRICT' | 'CASCADE' | 'SET_NULL'
  const [selectedDeptId, setSelectedDeptId] = useState('101');
  
  const initialDepartments = [
    { id: 101, name: 'Computer Science (CS)' },
    { id: 102, name: 'Information Technology (IT)' },
    { id: 103, name: 'Cyber Security (CYS)' }
  ];

  const initialStudents = [
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
    { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 }
  ];

  const [departments, setDepartments] = useState(initialDepartments);
  const [students, setStudents] = useState(initialStudents);

  const [removingDeptIds, setRemovingDeptIds] = useState([]);
  const [removingStudentIds, setRemovingStudentIds] = useState([]);
  const [pulsingStudentIds, setPulsingStudentIds] = useState([]);

  // Console Logs
  const [logMessages, setLogMessages] = useState([
    { time: '08:20:00', status: 'info', message: 'Referential Integrity Engine online.' },
    { time: '08:20:01', status: 'info', message: 'Foreign Key constraints established on table students(class_id) referencing departments(id).' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  const getSQLPreview = () => {
    let behaviorComment = '';
    if (fkBehavior === 'RESTRICT') {
      behaviorComment = '-- DEFAULT: Blocks deletion if child rows exist';
    } else if (fkBehavior === 'CASCADE') {
      behaviorComment = '-- ON DELETE CASCADE: Automatically deletes referencing child rows';
    } else if (fkBehavior === 'SET_NULL') {
      behaviorComment = '-- ON DELETE SET NULL: Sets child referencing columns to NULL';
    }

    return `DELETE FROM departments\nWHERE id = ${selectedDeptId || 'NULL'};\n${behaviorComment}`;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const targetDeptId = parseInt(selectedDeptId, 10);
    const deptExists = departments.some(d => d.id === targetDeptId);

    if (!deptExists) {
      addLog(`Error: Department with ID ${targetDeptId} does not exist.`, 'error');
      return;
    }

    const queryStr = `DELETE FROM departments WHERE id = ${targetDeptId};`;
    addLog(`Running DML: ${queryStr}`, 'info');

    // Count child rows referencing this department
    const referencingStudents = students.filter(s => s.class_id === targetDeptId);
    const hasChildren = referencingStudents.length > 0;

    if (fkBehavior === 'RESTRICT') {
      if (hasChildren) {
        // BlOCKED!
        addLog(`Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (\`db\`.\`students\`, CONSTRAINT \`fk_students_dept\` FOREIGN KEY (\`class_id\`) REFERENCES \`departments\` (\`id\`))`, 'error');
        addLog(`Operation aborted to preserve Referential Integrity. Please re-assign students first.`, 'error');
      } else {
        // Success
        setRemovingDeptIds([targetDeptId]);
        setTimeout(() => {
          setDepartments(prev => prev.filter(d => d.id !== targetDeptId));
          setRemovingDeptIds([]);
          addLog(`Query OK, 1 row affected (1.5ms). Department ${targetDeptId} deleted successfully.`, 'success');
          
          // Select another department
          const remaining = departments.filter(d => d.id !== targetDeptId);
          if (remaining.length > 0) {
            setSelectedDeptId(remaining[0].id.toString());
          } else {
            setSelectedDeptId('');
          }
        }, 800);
      }
    } else if (fkBehavior === 'CASCADE') {
      setRemovingDeptIds([targetDeptId]);
      if (hasChildren) {
        const studentIdsToDel = referencingStudents.map(s => s.id);
        setRemovingStudentIds(studentIdsToDel);
        
        setTimeout(() => {
          setDepartments(prev => prev.filter(d => d.id !== targetDeptId));
          setStudents(prev => prev.filter(s => s.class_id !== targetDeptId));
          setRemovingDeptIds([]);
          setRemovingStudentIds([]);
          addLog(`Query OK, 1 parent row affected (1.2ms).`, 'success');
          addLog(`Cascading Trigger: Automatically deleted ${studentIdsToDel.length} referencing student records (ID: ${studentIdsToDel.join(', ')}).`, 'warning');
          
          const remaining = departments.filter(d => d.id !== targetDeptId);
          if (remaining.length > 0) {
            setSelectedDeptId(remaining[0].id.toString());
          } else {
            setSelectedDeptId('');
          }
        }, 800);
      } else {
        setTimeout(() => {
          setDepartments(prev => prev.filter(d => d.id !== targetDeptId));
          setRemovingDeptIds([]);
          addLog(`Query OK, 1 row affected (1.1ms). Department ${targetDeptId} deleted.`, 'success');
          
          const remaining = departments.filter(d => d.id !== targetDeptId);
          if (remaining.length > 0) {
            setSelectedDeptId(remaining[0].id.toString());
          } else {
            setSelectedDeptId('');
          }
        }, 800);
      }
    } else if (fkBehavior === 'SET_NULL') {
      setRemovingDeptIds([targetDeptId]);
      if (hasChildren) {
        const studentIdsToPulse = referencingStudents.map(s => s.id);
        setPulsingStudentIds(studentIdsToPulse);
        
        setTimeout(() => {
          setDepartments(prev => prev.filter(d => d.id !== targetDeptId));
          setStudents(prev => prev.map(s => {
            if (s.class_id === targetDeptId) {
              return { ...s, class_id: null };
            }
            return s;
          }));
          setRemovingDeptIds([]);
          setPulsingStudentIds([]);
          addLog(`Query OK, 1 parent row affected (1.5ms).`, 'success');
          addLog(`Cascading Trigger: Set class_id to NULL for ${studentIdsToPulse.length} referencing student records.`, 'warning');
          
          const remaining = departments.filter(d => d.id !== targetDeptId);
          if (remaining.length > 0) {
            setSelectedDeptId(remaining[0].id.toString());
          } else {
            setSelectedDeptId('');
          }
        }, 800);
      } else {
        setTimeout(() => {
          setDepartments(prev => prev.filter(d => d.id !== targetDeptId));
          setRemovingDeptIds([]);
          addLog(`Query OK, 1 row affected (1.0ms). Department ${targetDeptId} deleted.`, 'success');
          
          const remaining = departments.filter(d => d.id !== targetDeptId);
          if (remaining.length > 0) {
            setSelectedDeptId(remaining[0].id.toString());
          } else {
            setSelectedDeptId('');
          }
        }, 800);
      }
    }
  };

  const handleReset = () => {
    setDepartments(initialDepartments);
    setStudents(initialStudents);
    setSelectedDeptId('101');
    setRemovingDeptIds([]);
    setRemovingStudentIds([]);
    setPulsingStudentIds([]);
    addLog('Parent & Child tables database states reset.', 'info');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql3_7-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              การจัดการความสัมพันธ์ข้อมูล / Referential Integrity
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เงื่อนไขและการประเมินผลกระทบก่อนการลบข้อมูล (Safe Deletes & Referential Integrity)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              ในระบบฐานข้อมูลเชิงสัมพันธ์ ข้อมูลระหว่างตารางมักถูกเชื่อมโยงกันด้วยข้อจำกัดคีย์นอก <span className="font-semibold text-indigo-600 font-mono">Foreign Key (FK)</span> การลบข้อมูลในตารางหลัก (Parent Table เช่น ตารางแผนก) อาจส่งผลกระทบต่อข้อมูลในตารางย่อย (Child Table เช่น ตารางนักเรียน) RDBMS จึงต้องคอยคุ้มครองระบบความถูกต้องของข้อมูลผ่านหลักการที่เรียกว่า **ความสมบูรณ์เชิงอ้างอิง (Referential Integrity)**
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-6">
              {/* Card 1: RESTRICT */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-rose-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <span className="text-[11px] font-bold text-rose-600 font-mono uppercase tracking-wider block mb-1">1. RESTRICT / NO ACTION</span>
                <h4 className="text-[15px] font-bold text-slate-800 mb-1.5">บล็อกคำสั่ง (ห้ามลบ)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  เป็นพฤติกรรมมาตรฐานของระบบ RDBMS โดยจะห้ามลบข้อมูลตารางหลัก (Parent) โดยเด็ดขาด หากยังมีข้อมูลตารางย่อย (Child) ที่ยังเชื่อมโยง/อ้างอิงอยู่ เพื่อเลี่ยงข้อผิดพลาด
                </p>
              </div>

              {/* Card 2: CASCADE */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-amber-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <span className="text-[11px] font-bold text-amber-600 font-mono uppercase tracking-wider block mb-1">2. ON DELETE CASCADE</span>
                <h4 className="text-[15px] font-bold text-slate-800 mb-1.5">ลบลำดับขั้น (ลบพ่วง)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  หากตารางหลักถูกลบ ข้อมูลตารางย่อยที่อ้างอิงคีย์นอกนั้นอยู่ จะถูกระบบสั่งทำลายทิ้งพ่วงตามกันไปทั้งหมดทันที (มีประโยชน์ในการเคลียร์ชุดย่อย แต่เสี่ยงข้อมูลหายโดยไม่รู้ตัว)
                </p>
              </div>

              {/* Card 3: SET NULL */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-emerald-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <span className="text-[11px] font-bold text-emerald-600 font-mono uppercase tracking-wider block mb-1">3. ON DELETE SET NULL</span>
                <h4 className="text-[15px] font-bold text-slate-800 mb-1.5">ตั้งค่าเป็นว่าง (SET NULL)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  หากคีย์หลักถูกทำลาย ระบบจะไปอัปเดตช่องคีย์นอก (FK) ในตารางย่อยให้กลายเป็นค่าว่าง NULL โดยอัตโนมัติ เพื่อรักษาประวัติตารางย่อยไว้โดยปลดการเชื่อมสัมพันธ์เดิมออก
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองคีย์นอกและความสัมพันธ์ / Foreign Key & Integrity Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              วิเคราะห์ความตึงตัวของกฎความถูกต้อง RDBMS และการทริกเกอร์ Cascade/Set Null แบบข้ามตาราง
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* Left Controls */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[500px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                INTEGRITY RULES
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    ตั้งค่าพฤติกรรมข้อจำกัด:
                  </h4>
                  <button 
                    onClick={handleReset}
                    className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded hover:bg-slate-700 hover:text-white cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Tables
                  </button>
                </div>

                {/* Option buttons for FK behavior */}
                <div className="space-y-2.5">
                  <span className="text-xs text-slate-300 font-mono font-bold block">1. เลือกนโยบายคีย์นอก (Foreign Key Option):</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setFkBehavior('RESTRICT')}
                      className={`text-[10.5px] py-2 px-1 rounded-lg border font-bold cursor-pointer transition-all duration-200 ${
                        fkBehavior === 'RESTRICT' 
                          ? 'bg-rose-600/30 text-rose-300 border-rose-500 shadow-md' 
                          : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-slate-700'
                      }`}
                    >
                      RESTRICT
                    </button>
                    <button
                      onClick={() => setFkBehavior('CASCADE')}
                      className={`text-[10.5px] py-2 px-1 rounded-lg border font-bold cursor-pointer transition-all duration-200 ${
                        fkBehavior === 'CASCADE' 
                          ? 'bg-amber-600/30 text-amber-300 border-amber-500 shadow-md' 
                          : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-slate-700'
                      }`}
                    >
                      CASCADE
                    </button>
                    <button
                      onClick={() => setFkBehavior('SET_NULL')}
                      className={`text-[10.5px] py-2 px-1 rounded-lg border font-bold cursor-pointer transition-all duration-200 ${
                        fkBehavior === 'SET_NULL' 
                          ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500 shadow-md' 
                          : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-slate-700'
                      }`}
                    >
                      SET NULL
                    </button>
                  </div>
                </div>

                {/* Target select drop down */}
                <div className="space-y-2 bg-slate-950/40 p-4 border border-slate-800 rounded-xl">
                  <label className="text-xs text-slate-300 font-mono font-bold block">2. เลือกแผนกที่ต้องการลบ (DELETE FROM departments):</label>
                  <select
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none focus:border-orange-500 cursor-pointer"
                    disabled={departments.length === 0}
                  >
                    {departments.length === 0 ? (
                      <option value="">ไม่มีแผนกงานในระบบตาราง</option>
                    ) : (
                      departments.map(d => {
                        const stdCount = students.filter(s => s.class_id === d.id).length;
                        return (
                          <option key={d.id} value={d.id}>
                            ID {d.id} - {d.name} ({stdCount} นักเรียนเชื่อมอยู่)
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>

              {/* Run query button */}
              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 h-10 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
                disabled={departments.length === 0}
              >
                <Trash2 className="w-4 h-4 text-white" /> Delete Parent Department Row
              </button>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[500px] overflow-hidden z-10">
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-orange-400" />
                  RDBMS Referential Integrity Monitor
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Grid content displaying both tables */}
              <div className="flex-1 p-5 space-y-4 flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Departments Table */}
                  <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3 relative">
                    <span className="text-[8.5px] font-mono text-orange-400 absolute top-2 right-3 font-bold uppercase">
                      Parent Table
                    </span>
                    <h5 className="text-[11px] font-bold text-slate-300 flex items-center gap-1 font-mono mb-2">
                      <Table className="w-3.5 h-3.5 text-orange-500" /> departments
                    </h5>
                    <div className="overflow-x-auto max-h-36 overflow-y-auto no-scrollbar">
                      <table className="w-full text-[10.5px] font-mono text-slate-400 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500 font-bold">
                            <th className="pb-1 text-left">id (PK)</th>
                            <th className="pb-1 text-left">name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {departments.length > 0 ? (
                            departments.map(d => {
                              const isRemoving = removingDeptIds.includes(d.id);
                              return (
                                <tr 
                                  key={d.id} 
                                  className={`border-b border-slate-800 transition-all duration-700 ${
                                    isRemoving ? 'opacity-0 scale-95 translate-x-4 bg-rose-950/20' : ''
                                  }`}
                                >
                                  <td className="py-1 text-orange-400 font-bold">{d.id}</td>
                                  <td className="py-1 text-slate-300 font-sans">{d.name}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="2" className="py-4 text-center text-slate-500 italic">
                                ( No departments )
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Students Table */}
                  <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 relative">
                    <span className="text-[8.5px] font-mono text-cyan-400 absolute top-2 right-3 font-bold uppercase">
                      Child Table
                    </span>
                    <h5 className="text-[11px] font-bold text-slate-300 flex items-center gap-1 font-mono mb-2">
                      <Table className="w-3.5 h-3.5 text-cyan-500" /> students (FK Ref)
                    </h5>
                    <div className="overflow-x-auto max-h-36 overflow-y-auto no-scrollbar">
                      <table className="w-full text-[10.5px] font-mono text-slate-400 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500 font-bold">
                            <th className="pb-1 text-left">name</th>
                            <th className="pb-1 text-right">class_id (FK)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.length > 0 ? (
                            students.map(s => {
                              const isRemoving = removingStudentIds.includes(s.id);
                              const isPulsing = pulsingStudentIds.includes(s.id);
                              return (
                                <tr 
                                  key={s.id} 
                                  className={`border-b border-slate-800 transition-all duration-700 ${
                                    isRemoving ? 'opacity-0 scale-95 -translate-x-4 bg-rose-950/30' : ''
                                  } ${
                                    isPulsing ? 'bg-emerald-500/20 text-emerald-200 animate-pulse font-bold' : ''
                                  }`}
                                >
                                  <td className="py-1 text-slate-300 font-sans">{s.name}</td>
                                  <td className="py-1 text-right">
                                    {s.class_id === null ? (
                                      <span className="text-red-500/70 font-bold italic text-[9px] bg-red-950/20 px-1 rounded">NULL</span>
                                    ) : (
                                      <span className="text-cyan-400 font-bold">{s.class_id}</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="2" className="py-4 text-center text-slate-500 italic">
                                ( No students )
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* SQL syntax preview */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    DML Syntax Preview:
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-[13px] font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLPreview()}
                  </pre>
                </div>
              </div>

              {/* Database logs output */}
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
          title="ใบงานทบทวนเงื่อนไขและคีย์นอก (MySQL FK Integrity Practice Task)" 
          taskText={`[กิจกรรมปฏิบัติการ DML FK Integrity]
ให้นักเรียนตอบคำถามจากการตรวจสอบพฤติกรรมด้วยตรรกศาสตร์ Sandbox:

1. วิเคราะห์และอธิบายพฤติกรรม (ForeignKey Policy Analysis):
   - เมื่อใช้พฤติกรรม RESTRICT/NO ACTION เพราะเหตุใดเราจึงไม่สามารถลบแผนก Computer Science (id 101) ได้?
   - ข้อความแจ้งเตือน Error Code 1451 หมายถึงข้อผิดพลาดในการประมวลผลข้อมูลใดของ RDBMS?

2. วิเคราะห์เปรียบเทียบกลไก CASCADE vs SET NULL:
   - นโยบาย ON DELETE CASCADE ส่งผลต่อจำนวนระเบียบนิสิตนักเรียนอย่างไรเมื่อลบแผนกงาน? มีความเสี่ยงประเภทใดบ้าง?
   - นโยบาย ON DELETE SET NULL เหมาะสมนำมาใช้กับงานออกแบบระบบในชีวิตจริงในบริบทตัวอย่างใดบ้างเพื่อรักษาประวัติข้อมูล?

3. เขียนคำสั่ง SQL คิวรี (Referential Integrity DML):
   - สมมติว่ามีตารางแผนก "departments" และตารางหลักสูตร "courses" ที่เชื่อมด้วย FK (dept_id)
     1. จงเขียนสคริปต์การลบวิชาในแผนก dept_id = 101 ออกจากระบบ
     2. อธิบายแนวทางการปรับโครงสร้างตาราง DDL เพื่อเปิดใช้ระบบ ON DELETE SET NULL ให้แก่คอลัมน์คีย์นอก (dept_id) ของตารางหลักสูตร`}
        />

      </main>
    </div>
  );
}
