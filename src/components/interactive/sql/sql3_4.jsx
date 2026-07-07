import React, { useState, useEffect } from 'react';
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
  Edit2
} from 'lucide-react';

export default function SQL3_4() {
  const [students, setStudents] = useState([
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
    { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
    { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
  ]);

  // Form states
  const [selectedId, setSelectedId] = useState('1');
  const [editEmail, setEditEmail] = useState('somchai@mail.com');
  const [editClassId, setEditClassId] = useState('101');

  // Pulse animation state tracker for updated row
  const [pulsingRowId, setPulsingRowId] = useState(null);

  // Sync inputs when selected student changes
  useEffect(() => {
    const student = students.find(s => s.id === parseInt(selectedId, 10));
    if (student) {
      setEditEmail(student.email || '');
      setEditClassId((student.class_id || '').toString());
    }
  }, [selectedId, students]);

  // Console Logs
  const [logMessages, setLogMessages] = useState([
    { time: '08:05:00', status: 'info', message: 'DML UPDATE Engine online.' },
    { time: '08:05:01', status: 'info', message: 'Select record from left pane to modify. Target: students table.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  const getSQLPreview = () => {
    const targetId = selectedId || 'NULL';
    const emailVal = editEmail ? `'${editEmail}'` : 'NULL';
    const classIdVal = editClassId || 'NULL';

    return `UPDATE students\nSET email = ${emailVal}, class_id = ${classIdVal}\nWHERE id = ${targetId};`;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const idVal = parseInt(selectedId, 10);
    const emailVal = editEmail.trim();
    const classIdVal = parseInt(editClassId, 10);

    const queryStr = getSQLPreview().replace(/\n/g, ' ');
    addLog(`Running DML: ${queryStr}`, 'info');

    // Perform Update
    setStudents(prev => prev.map(s => {
      if (s.id === idVal) {
        return {
          ...s,
          email: emailVal || null,
          class_id: isNaN(classIdVal) ? null : classIdVal
        };
      }
      return s;
    }));

    setPulsingRowId(idVal);
    addLog(`Query OK, 1 row affected (1.9ms). Row with ID ${idVal} updated successfully!`, 'success');

    // Turn off pulse after 2s
    setTimeout(() => {
      setPulsingRowId(null);
    }, 2000);
  };

  const resetTable = () => {
    setStudents([
      { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
      { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
      { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
      { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
      { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
    ]);
    setSelectedId('1');
    setPulsingRowId(null);
    addLog('Students table records reset to original data.', 'info');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql3_4-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              ภาษาจัดการข้อมูล DML / UPDATE Statement
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คำสั่งแก้ไขปรับปรุงข้อมูล (UPDATE)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              คำสั่ง <span className="font-semibold text-indigo-600 font-mono">UPDATE</span> เป็นคำสั่งประเภท DML (Data Manipulation Language) ที่ใช้เมื่อต้องการปรับปรุง แก้ไข หรืออัปเดตข้อมูลของระเบียนเดิมที่มีอยู่แล้วในคอลัมน์ของตาราง ซึ่งโครงสร้างคำสั่งจะประกอบด้วยคำสำคัญ 3 ส่วน ได้แก่ `UPDATE` (ระบุตาราง), `SET` (ระบุคอลัมน์และค่าใหม่) และ `WHERE` (ระบุเงื่อนไขในการกรองเป้าหมาย)
            </p>

            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-indigo-500 leading-relaxed text-[14.5px] text-indigo-900">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                <Info className="w-4.5 h-4.5 text-indigo-600" /> โครงสร้างและหลักการเขียน UPDATE:
              </span>
              รูปแบบไวยากรณ์: `UPDATE table_name SET col1 = val1, col2 = val2 WHERE condition;` หากเขียนแก้ไขคอลัมน์หลายตัวพร้อมกัน ให้คั่นรายการเปลี่ยนคอลัมน์ด้วยเครื่องหมายจุลภาค (Comma `,`)
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองคิวรีแก้ไข / UPDATE Sandbox
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบจำลองการสร้างคำสั่งคิวรีเพื่ออัปเดตและเปลี่ยนแปลงค่าระเบียนตาราง
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* Left Controls */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[460px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                UPDATE INPUTS
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    ตั้งค่าคำสั่งคิวรีแก้ไข:
                  </h4>
                  <button 
                    onClick={resetTable}
                    className="text-[9.5px] bg-orange-600/30 text-orange-300 border border-orange-500/20 px-2.5 py-1 rounded hover:bg-orange-600/50 cursor-pointer transition-colors"
                  >
                    Reset Table
                  </button>
                </div>

                {/* Form parameters */}
                <div className="bg-slate-950/40 p-4 border border-slate-800 rounded-xl space-y-4">
                  {/* Select target ID */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-mono font-bold block">ค้นหาแถวนักเรียนที่ต้องการแก้ (WHERE id = ?):</label>
                    <select
                      value={selectedId}
                      onChange={(e) => setSelectedId(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none focus:border-orange-500"
                    >
                      {students.map(s => (
                        <option key={s.id} value={s.id}>ID {s.id} - {s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* SET Email */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-mono font-bold block">แก้ไขอีเมลใหม่ (SET email = ?):</label>
                    <input 
                      type="text"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none focus:border-orange-500"
                      placeholder="กรอกอีเมลใหม่"
                    />
                  </div>

                  {/* SET Class ID */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-mono font-bold block">แก้ไขรหัสวิชาเรียน (SET class_id = ?):</label>
                    <select
                      value={editClassId}
                      onChange={(e) => setEditClassId(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none"
                    >
                      <option value="101">101 (CS Dept)</option>
                      <option value="102">102 (IT Dept)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Run Query Button */}
              <button
                onClick={handleUpdate}
                className="w-full flex items-center justify-center gap-2 h-10 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
              >
                <Edit2 className="w-4 h-4 text-white" /> Run SQL UPDATE Statement
              </button>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[460px] overflow-hidden z-10">
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-orange-400" />
                  MySQL Table Grid Real-time Monitor
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Table Records List */}
              <div className="flex-1 p-5 space-y-6 flex flex-col justify-between">
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4">
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
                              pulsingRowId === std.id ? 'bg-orange-500/25 border-orange-500/50 scale-[1.01] animate-pulse text-white' : ''
                            }`}
                          >
                            <td className="py-2 text-orange-400 font-bold font-mono">{std.id}</td>
                            <td className="py-2 font-sans">{std.name}</td>
                            <td className="py-2 text-slate-300">{std.email}</td>
                            <td className="py-2 text-slate-300 text-right">{std.class_id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SQL query Preview */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    Generated UPDATE SQL syntax preview:
                  </div>
                  <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 text-[13.5px] font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
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
          title="ใบงานทบทวนคำสั่งแก้ไขข้อมูลระเบียน (MySQL UPDATE SET Practice Task)" 
          taskText={`[กิจกรรมปฏิบัติท้ายบทเรียน DML UPDATE]
ให้นักเรียนตอบคำถามจากการประเมินผลและใช้งาน Sandbox ในบทเรียนนี้:

1. วิเคราะห์และอธิบายไวยากรณ์ (Syntax Anatomy):
   - คีย์เวิร์ด SET และ WHERE ในคำสั่ง UPDATE มีหน้าที่ควบคุมลักษณะคิวรีที่ต่างกันอย่างไร?
   - หากตารางผู้ใช้ไม่มีข้อมูลแถวที่มี id = 99 อยู่จริง แต่เราเผลอรันคำสั่ง UPDATE students SET email = 'test@mail.com' WHERE id = 99; ตัวจัดการฐานข้อมูลจะแจ้งเตือน Error หรือไม่? ข้อมูลเดิมจะเสียหายหรือไม่?

2. โครงสร้างแก้ไขแบบหลายคอลัมน์ (Multiple Columns Updates):
   - จงศึกษาและเขียนสคริปต์คำสั่งแก้ไขข้อมูลตารางสินค้า "products" โดยต้องการเปลี่ยนคอลัมน์ "price" (ราคา) ให้เป็น 1500 และลดค่าคอลัมน์ "stock" (จำนวนคงเหลือ) ให้เหลือ 5 ชิ้น เฉพาะสินค้าที่มีรหัส "P-099" ภายในคิวรีรอบเดียว

3. เขียนสคริปต์คิวรี DML UPDATE (UPDATE Coding Task):
   - จงเขียนประโยคอัปเดตข้อมูลตารางบุคลากร "staff" (id, status, role) สำหรับกิจกรรมดังต่อไปนี้:
     1. ปรับเปลี่ยนตำแหน่งงาน (role) ของพนักงานรหัส 204 ให้กลายเป็น "Senior Manager"
     2. ปรับคอลัมน์สถานะ (status) ของพนักงานที่มีรหัส 205 ให้มีค่าเป็น "ACTIVE"`}
        />

      </main>
    </div>
  );
}
