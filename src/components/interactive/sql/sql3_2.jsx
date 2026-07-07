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

export default function SQL3_2() {
  // Array of 3 new potential student rows to insert in batch
  const [rowsToInsert, setRowsToInsert] = useState([
    { id: 6, name: 'มานะ', email: 'mana@mail.com', class_id: 101, checked: true },
    { id: 7, name: 'ชูใจ', email: 'choojai@mail.com', class_id: 102, checked: true },
    { id: 8, name: 'ปิติ', email: 'piti@mail.com', class_id: 101, checked: true }
  ]);

  // Main table list
  const [students, setStudents] = useState([
    { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
    { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
    { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
    { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
    { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
  ]);

  const [logMessages, setLogMessages] = useState([
    { time: '07:55:00', status: 'info', message: 'DML Multiple Insert Validator ready.' },
    { time: '07:55:01', status: 'info', message: 'Ready to compare batch execution roundtrips.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  const toggleChecked = (index) => {
    setRowsToInsert(prev => prev.map((row, i) => i === index ? { ...row, checked: !row.checked } : row));
  };

  const handleFieldChange = (index, field, value) => {
    setRowsToInsert(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };

  const getSQLString = () => {
    const active = rowsToInsert.filter(r => r.checked);
    if (active.length === 0) return '-- No rows selected for insertion';

    const valuesStr = active.map(r => {
      const cleanId = r.id || 'NULL';
      const cleanName = r.name ? `'${r.name}'` : 'NULL';
      const cleanEmail = r.email ? `'${r.email}'` : 'NULL';
      const cleanClassId = r.class_id || 'NULL';
      return `  (${cleanId}, ${cleanName}, ${cleanEmail}, ${cleanClassId})`;
    }).join(',\n');

    return `INSERT INTO students (id, name, email, class_id)\nVALUES\n${valuesStr};`;
  };

  const handleExecuteBatch = (e) => {
    e.preventDefault();
    const active = rowsToInsert.filter(r => r.checked);
    
    if (active.length === 0) {
      addLog('No rows selected to run.', 'warning');
      return;
    }

    addLog(`Executing Batch Query: ${active.length} rows inside single statement.`, 'info');

    // Validate duplicate IDs
    const duplicateIds = active.filter(row => students.some(s => s.id === parseInt(row.id, 10)) || active.filter(a => parseInt(a.id, 10) === parseInt(row.id, 10)).length > 1);
    if (duplicateIds.length > 0) {
      addLog(`Error Code: 1062. Duplicate entry '${duplicateIds[0].id}' for key 'students.PRIMARY'`, 'error');
      return;
    }

    // Insert successful
    const newStudents = active.map(r => ({
      id: parseInt(r.id, 10),
      name: r.name,
      email: r.email || null,
      class_id: parseInt(r.class_id, 10) || null
    }));

    setStudents(prev => [...prev, ...newStudents]);
    addLog(`Query OK, ${active.length} rows affected (2.1ms). Multiple records inserted in a single transaction.`, 'success');

    // Increment sugested IDs for next insert
    const nextStartId = Math.max(...students.map(s => s.id), ...newStudents.map(n => n.id)) + 1;
    setRowsToInsert(prev => prev.map((row, i) => ({
      ...row,
      id: nextStartId + i,
      name: '',
      email: '',
      checked: false
    })));
  };

  const resetTable = () => {
    setStudents([
      { id: 1, name: 'สมชาย', email: 'somchai@mail.com', class_id: 101 },
      { id: 2, name: 'สมหญิง', email: 'somying@mail.com', class_id: 102 },
      { id: 3, name: 'สมจิต', email: 'somjit@mail.com', class_id: 101 },
      { id: 4, name: 'สมเดช', email: 'somdej@mail.com', class_id: 102 },
      { id: 5, name: 'สมหมาย', email: 'sommai@mail.com', class_id: 101 }
    ]);
    setRowsToInsert([
      { id: 6, name: 'มานะ', email: 'mana@mail.com', class_id: 101, checked: true },
      { id: 7, name: 'ชูใจ', email: 'choojai@mail.com', class_id: 102, checked: true },
      { id: 8, name: 'ปิติ', email: 'piti@mail.com', class_id: 101, checked: true }
    ]);
    addLog('Students table and batch parameters reset.', 'info');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql3_2-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              ภาษาจัดการข้อมูล DML / Multiple Row Insertion
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเพิ่มข้อมูลหลายรายการพร้อมกัน (Multiple INSERT)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              ในการพัฒนาซอฟต์แวร์จริง การเพิ่มข้อมูลทีละแถวโดยการยิงคำสั่ง `INSERT INTO` ซ้ำๆ หลายรอบจะสร้างปัญหาคอขวดเนื่องจากความหน่วงเครือข่าย (Network Latency) และการประมวลผลธุรกรรมของเซิร์ฟเวอร์ ภาษา SQL จึงสนับสนุน **คำสั่งเพิ่มข้อมูลหลายแถวพร้อมกัน (Multiple INSERT)** โดยการระบุค่าข้อมูลเรียงคั่นด้วยเครื่องหมายจุลภาค (Comma `,`) ภายใต้ประโยคคำสั่งหลักรอบเดียว
            </p>

            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-indigo-500 leading-relaxed text-[14.5px] text-indigo-900">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                <Info className="w-4.5 h-4.5 text-indigo-600" /> ประโยชน์ทางวิศวกรรมของ Multiple INSERT:
              </span>
              การรันคิวรีแบบชุด (Batch Query) ช่วยลดรอบการส่งข้อมูลระหว่างฝั่ง Client และ Database Server จากเดิมที่ต้องส่ง 1,000 รอบ ให้เหลือเพียงรอบเดียว ซึ่งช่วยประหยัดโหลดหน่วยความจำของคลังเซิร์ฟเวอร์ได้อย่างมหาศาลและเพิ่มความเร็วในการประมวลผลสูงกว่า 10 เท่าตัว
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวจำลองคิวรีแบบชุด / Multiple Insert Simulator
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบจำลองการสร้างและประมวลผลชุดคำสั่งเพิ่มข้อมูลพร้อมกันหลายแถว
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* Left Controls */}
            <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[500px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                BATCH CONSOLE
              </span>

              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    กำหนดค่าเรคคอร์ดในชุดคำสั่ง (Multiple Values):
                  </h4>
                  <button 
                    onClick={resetTable}
                    className="text-[9.5px] bg-orange-600/30 text-orange-300 border border-orange-500/20 px-2.5 py-1 rounded hover:bg-orange-600/50 cursor-pointer transition-colors"
                  >
                    Reset Sandbox
                  </button>
                </div>

                {/* Batch list of 3 items input */}
                <div className="space-y-3">
                  {rowsToInsert.map((row, idx) => (
                    <div key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-white/5 space-y-2.5 transition-all">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400">
                          <input 
                            type="checkbox"
                            checked={row.checked}
                            onChange={() => toggleChecked(idx)}
                            className="text-orange-600 focus:ring-0 cursor-pointer rounded"
                          />
                          ระเบียนที่ #{idx + 1}
                        </label>
                        <span className="text-[9.5px] font-mono text-slate-500">ID: {row.id}</span>
                      </div>

                      {row.checked && (
                        <div className="grid grid-cols-3 gap-2 animate-fade-in">
                          <input 
                            type="text"
                            placeholder="ชื่อ"
                            value={row.name}
                            onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-white text-[11px] font-mono rounded px-2 py-1 w-full focus:outline-none focus:border-orange-500"
                          />
                          <input 
                            type="text"
                            placeholder="อีเมล"
                            value={row.email}
                            onChange={(e) => handleFieldChange(idx, 'email', e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-white text-[11px] font-mono rounded px-2 py-1 w-full focus:outline-none focus:border-orange-500"
                          />
                          <input 
                            type="text"
                            placeholder="Class ID"
                            value={row.class_id}
                            onChange={(e) => handleFieldChange(idx, 'class_id', e.target.value.replace(/[^0-9]/g, ''))}
                            className="bg-slate-900 border border-slate-800 text-white text-[11px] font-mono rounded px-2 py-1 w-full focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action execute trigger */}
              <button
                onClick={handleExecuteBatch}
                className="w-full flex items-center justify-center gap-2 h-10 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
              >
                <Play className="w-4 h-4 text-white" /> Execute Multiple INSERT Statement
              </button>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[500px] overflow-hidden z-10">
              {/* Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-orange-400" />
                  MySQL DB Schema Analyzer - students table
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Main Workspace */}
              <div className="flex-1 p-5 space-y-6 flex flex-col justify-between">
                {/* Table rows list */}
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
                          <th className="pb-2 text-right">class_id</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(std => (
                          <tr key={std.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                            <td className="py-2 text-orange-400 font-bold font-mono">{std.id}</td>
                            <td className="py-2 text-slate-300 font-sans">{std.name}</td>
                            <td className="py-2 text-slate-300 text-right">{std.class_id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SQL Code preview */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    Generated Batch SQL syntax:
                  </div>
                  <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 text-[13px] font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLString()}
                  </pre>
                </div>
              </div>

              {/* Console log */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-32 overflow-y-auto no-scrollbar z-10">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> Action Output log console:
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
          title="ใบงานฝึกทักษะคิวรีแบบชุด (Multiple INSERT Practice Task)" 
          taskText={`[กิจกรรมปฏิบัติ DML Batch Insert]
ให้นักเรียนตอบคำถามลงในสมุดเรียนจากการประเมินผลผ่านระบบจำลอง:

1. การวิเคราะห์โครงสร้างไวยากรณ์ (Syntax Anatomy):
   - จงอธิบายบทบาทของสัญลักษณ์เครื่องหมายจุลภาค (Comma) ในการเขียนคิวรีแบบ Multiple INSERT
   - หากข้อมูลแถวที่ 2 ในชุดคำสั่งเกิดข้อผิดพลาดคีย์หลักซ้ำ (Duplicate Primary Key) ในขณะที่แถวอื่นๆ ผ่านเกณฑ์ทั้งหมด ระบบฐานข้อมูล MySQL จะมีพฤติกรรมอย่างไร? (จะเพิ่มเฉพาะแถวที่ถูกต้อง หรือยกเลิกทั้งหมด?)

2. ประสิทธิภาพและความสมเหตุสมผลในการประมวลผล (Performance & Latency):
   - การสั่ง INSERT INTO ทีละบรรทัด 5 รอบ VS การสั่ง INSERT INTO แบบ Multiple values รอบเดียว ให้ผลลัพธ์ข้อมูลต่างกันหรือไม่? และประสิทธิภาพในระบบคอมพิวเตอร์แตกต่างกันอย่างไร?

3. เขียนสคริปต์ SQL คิวรี (DML Multiple Rows Coding):
   - จงเขียนประโยคสคริปต์เพิ่มข้อมูลลูกค้า 3 รายพร้อมกันลงในตาราง "customers" (รหัส, ชื่อจริง, เบอร์โทรศัพท์) ภายในสายคำสั่งเดียว:
     - แถวที่ 1: รหัส 10, ชื่อ "ชูใจ", เบอร์ "081-111-1111"
     - แถวที่ 2: รหัส 11, ชื่อ "มานะ", เบอร์ "082-222-2222"
     - แถวที่ 3: รหัส 12, ชื่อ "ปิติ", เบอร์ "083-333-3333"`}
        />

      </main>
    </div>
  );
}
