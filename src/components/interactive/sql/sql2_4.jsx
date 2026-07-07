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

export default function SQL2_4() {
  // Alter operation state: 'ADD' | 'DROP' | 'MODIFY' | 'RENAME'
  const [subCommand, setSubCommand] = useState('ADD');

  // Input States
  const [newColName, setNewColName] = useState('phone');
  const [newColType, setNewColType] = useState('VARCHAR(15)');
  const [targetCol, setTargetCol] = useState('email');
  const [modifyType, setModifyType] = useState('VARCHAR(255)');
  const [renameOld, setRenameOld] = useState('email');
  const [renameNew, setRenameNew] = useState('contact_email');

  // Initial table columns schema state
  const [columns, setColumns] = useState([
    { name: 'id', type: 'INT', extra: 'PRIMARY KEY AUTO_INCREMENT' },
    { name: 'name', type: 'VARCHAR(100)', extra: 'NOT NULL' },
    { name: 'email', type: 'VARCHAR(150)', extra: '' }
  ]);

  // Console Logs
  const [logMessages, setLogMessages] = useState([
    { time: '07:10:00', status: 'info', message: 'MySQL DDL Alter Engine initialized.' },
    { time: '07:10:01', status: 'info', message: 'Target Table: students loaded. Awaiting DDL commands.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  // Generate dynamic preview of the SQL command
  const getSQLPreview = () => {
    switch (subCommand) {
      case 'ADD':
        return `ALTER TABLE students ADD \`${newColName || 'new_column'}\` ${newColType};`;
      case 'DROP':
        return `ALTER TABLE students DROP COLUMN \`${targetCol}\`;`;
      case 'MODIFY':
        return `ALTER TABLE students MODIFY COLUMN \`${targetCol}\` ${modifyType};`;
      case 'RENAME':
        return `ALTER TABLE students RENAME COLUMN \`${renameOld}\` TO \`${renameNew || 'new_name'}\`;`;
      default:
        return '';
    }
  };

  // Execute ALTER TABLE action
  const executeQuery = (e) => {
    e.preventDefault();
    const query = getSQLPreview();
    addLog(`Running: ${query}`, 'info');

    // Sub-command: ADD
    if (subCommand === 'ADD') {
      const cleanName = newColName.trim().replace(/[^a-zA-Z0-9_]/g, '');
      if (!cleanName) {
        addLog(`Error Code: 1064. You have an error in your SQL syntax near empty column name.`, 'error');
        return;
      }
      if (columns.some(col => col.name.toLowerCase() === cleanName.toLowerCase())) {
        addLog(`Error Code: 1060. Duplicate column name '${cleanName}'`, 'error');
        return;
      }
      setColumns(prev => [...prev, { name: cleanName, type: newColType, extra: '' }]);
      addLog(`Query OK, 0 rows affected. Column '${cleanName}' successfully added!`, 'success');
      setNewColName('');
    }

    // Sub-command: DROP
    if (subCommand === 'DROP') {
      if (targetCol === 'id') {
        addLog(`Warning: Column 'id' is a PRIMARY KEY. Dropping key columns might crash relations!`, 'warning');
      }
      if (columns.length <= 1) {
        addLog(`Error Code: 1090. You cannot drop all columns in a table.`, 'error');
        return;
      }
      setColumns(prev => prev.filter(col => col.name !== targetCol));
      addLog(`Query OK, 0 rows affected. Column '${targetCol}' dropped successfully.`, 'success');
      // Set dropdown target to first available column if deleted
      const remaining = columns.filter(col => col.name !== targetCol);
      if (remaining.length > 0) {
        setTargetCol(remaining[0].name);
        setRenameOld(remaining[0].name);
      }
    }

    // Sub-command: MODIFY
    if (subCommand === 'MODIFY') {
      setColumns(prev => prev.map(col => {
        if (col.name === targetCol) {
          return { ...col, type: modifyType };
        }
        return col;
      }));
      addLog(`Query OK, 0 rows affected. Column '${targetCol}' type modified to ${modifyType}.`, 'success');
    }

    // Sub-command: RENAME
    if (subCommand === 'RENAME') {
      const cleanNewName = renameNew.trim().replace(/[^a-zA-Z0-9_]/g, '');
      if (!cleanNewName) {
        addLog(`Error Code: 1064. Empty new column name.`, 'error');
        return;
      }
      if (columns.some(col => col.name.toLowerCase() === cleanNewName.toLowerCase() && col.name !== renameOld)) {
        addLog(`Error Code: 1060. Duplicate column name '${cleanNewName}'`, 'error');
        return;
      }
      setColumns(prev => prev.map(col => {
        if (col.name === renameOld) {
          return { ...col, name: cleanNewName };
        }
        return col;
      }));
      addLog(`Query OK, 0 rows affected. Column '${renameOld}' renamed to '${cleanNewName}'.`, 'success');
      setRenameNew('');
      setRenameOld(cleanNewName);
      setTargetCol(cleanNewName);
    }
  };

  // Reset columns to initial state
  const resetSchema = () => {
    setColumns([
      { name: 'id', type: 'INT', extra: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'name', type: 'VARCHAR(100)', extra: 'NOT NULL' },
      { name: 'email', type: 'VARCHAR(150)', extra: '' }
    ]);
    setSubCommand('ADD');
    setTargetCol('email');
    setRenameOld('email');
    addLog('Students table schema reset to default state.', 'info');
  };

  return (
    <div className="w-full relative animate-fade-in" id="sql2_4-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content (Fluid Open-Air Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              การจัดการตาราง DDL / ALTER TABLE Operation
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คำสั่งแก้ไขโครงสร้างตาราง (ALTER TABLE) ใน MySQL
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              คำสั่ง <span className="font-semibold text-indigo-600 font-mono">ALTER TABLE</span> คือหนึ่งในคำสั่งสำคัญของภาษา DDL (Data Definition Language) ที่ใช้เมื่อระบบฐานข้อมูลเปิดใช้งานไปแล้ว แต่ต้องการปรับเปลี่ยนโครงสร้างระดับกายภาพของตารางโดยที่ข้อมูลเดิมภายในตารางไม่สูญหาย (ยกเว้นกรณีการลบคอลัมน์)
            </p>

            {/* Grid of 4 ALTER TABLE options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mt-6">
              
              {/* Option 1: ADD */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-indigo-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Plus className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">ADD</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้เพิ่มคอลัมน์ใหม่เพื่อจัดเก็บข้อมูลรูปแบบเพิ่มเติม (เช่น เพิ่มเบอร์โทรศัพท์ลงตารางผู้ใช้งาน)
                </p>
              </div>

              {/* Option 2: DROP COLUMN */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-rose-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Trash2 className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">DROP COLUMN</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้สำหรับลบคอลัมน์ที่ไม่ต้องการออกจากฐานข้อมูลอย่างถาวร (⚠️ ระวัง: ข้อมูลในฟิลด์นั้นจะสูญหายทันที)
                </p>
              </div>

              {/* Option 3: MODIFY COLUMN */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-amber-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <RefreshCw className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">MODIFY COLUMN</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้เปลี่ยนแปลงชนิดข้อมูล (Data Type) หรือคุณสมบัติข้อจำกัดของคอลัมน์ที่มีอยู่ (เช่น ขยายความยาวข้อความ)
                </p>
              </div>

              {/* Option 4: RENAME COLUMN */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-cyan-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Edit2 className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">RENAME COLUMN</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้สำหรับเปลี่ยนชื่อเดิมของคอลัมน์เป้าหมายให้เป็นชื่อใหม่เพื่อเพิ่มความชัดเจนในการนำข้อมูลไปสเปกใช้งาน
                </p>
              </div>

            </div>

            {/* Frosted Callout */}
            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-indigo-500 leading-relaxed text-[14.5px] text-indigo-900">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 mb-1.5">
                <Info className="w-4.5 h-4.5 text-indigo-600" /> ข้อควรระวังในการ MODIFY ชนิดข้อมูลตารางที่มีข้อมูลอยู่แล้ว:
              </span>
              ในการทำคำสั่ง <span className="font-mono bg-indigo-100 text-indigo-800 px-1 rounded text-[12px] font-bold">MODIFY</span> ชนิดข้อมูล หากเปลี่ยนชนิดจากขนาดใหญ่ลงมาหาขนาดเล็ก (เช่น `VARCHAR(255)` ไปเป็น `VARCHAR(20)`) หรือเปลี่ยนข้ามประเภทข้อมูล หากความยาวหรือประเภทขัดแย้งกับข้อมูลเดิมที่มีอยู่จริง MySQL จะทำการแจ้งเตือนหรือปฏิเสธคำสั่งเพื่อป้องกันข้อมูลโดนตัดส่วน (Data Truncation Error)
            </div>
          </div>
        </section>

        {/* ─── Section 2: Simulator Panel ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              เครื่องมือแก้ไขโครงสร้าง / Schema Modifier Simulator
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบจำลองการปรับแต่งคอลัมน์ตารางลูกค้า MySQL Workbench GUI
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองเลือกคำสั่งย่อย DDL ที่สวิตช์วิเคราะห์กระดานด้านซ้ายมือ ใส่ค่าที่ต้องการปรับเปลี่ยน และประเมินผลการรันคำสั่งโครงสร้างผ่าน Terminal ด้านขวามือ:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            
            {/* Left Column: Command & Settings Panel */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[500px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                ALTER OPERATION
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    เลือกคำสั่งปรับแต่ง:
                  </h4>
                  <button 
                    onClick={resetSchema}
                    className="text-[9.5px] bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded hover:bg-indigo-600/50 cursor-pointer transition-colors"
                  >
                    Reset Schema
                  </button>
                </div>

                {/* Subcommand Selector Badges */}
                <div className="grid grid-cols-4 gap-2">
                  {['ADD', 'DROP', 'MODIFY', 'RENAME'].map(cmd => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => setSubCommand(cmd)}
                      className={`h-8 font-mono text-[11px] font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                        subCommand === cmd
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.03]'
                          : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                      }`}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>

                {/* Dynamic Parameter Settings Form */}
                <div className="bg-slate-950/40 p-4 border border-slate-800 rounded-xl space-y-4">
                  {subCommand === 'ADD' && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-mono font-bold block">New Column Name:</label>
                        <input
                          type="text"
                          value={newColName}
                          onChange={(e) => setNewColName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                          className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none focus:border-indigo-500"
                          placeholder="ชื่อคอลัมน์ใหม่"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-mono font-bold block">Datatype:</label>
                        <select
                          value={newColType}
                          onChange={(e) => setNewColType(e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none"
                        >
                          <option value="VARCHAR(15)">VARCHAR(15)</option>
                          <option value="INT">INT</option>
                          <option value="DATE">DATE</option>
                          <option value="TEXT">TEXT</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {subCommand === 'DROP' && (
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-mono font-bold block">Select Column to DROP:</label>
                      <select
                        value={targetCol}
                        onChange={(e) => setTargetCol(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none"
                      >
                        {columns.map(col => (
                          <option key={col.name} value={col.name}>{col.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {subCommand === 'MODIFY' && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-mono font-bold block">Select Target Column:</label>
                        <select
                          value={targetCol}
                          onChange={(e) => setTargetCol(e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none"
                        >
                          {columns.map(col => (
                            <option key={col.name} value={col.name}>{col.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-mono font-bold block">New Datatype:</label>
                        <select
                          value={modifyType}
                          onChange={(e) => setModifyType(e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none"
                        >
                          <option value="VARCHAR(255)">VARCHAR(255)</option>
                          <option value="VARCHAR(30)">VARCHAR(30)</option>
                          <option value="TEXT">TEXT</option>
                          <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {subCommand === 'RENAME' && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-mono font-bold block">Rename Old Column:</label>
                        <select
                          value={renameOld}
                          onChange={(e) => setRenameOld(e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none"
                        >
                          {columns.map(col => (
                            <option key={col.name} value={col.name}>{col.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-mono font-bold block">To New Name:</label>
                        <input
                          type="text"
                          value={renameNew}
                          onChange={(e) => setRenameNew(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                          className="bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded px-3 py-1.5 w-full focus:outline-none focus:border-indigo-500"
                          placeholder="ชื่อใหม่ที่สะกดตรงฟิลด์"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action trigger button */}
              <button
                onClick={executeQuery}
                className="w-full flex items-center justify-center gap-2 h-10 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-600 hover:scale-[1.01] active:scale-98 transition-all duration-200 cursor-pointer text-xs mt-6"
              >
                <Play className="w-4 h-4" /> Execute ALTER TABLE Command
              </button>

            </div>

            {/* Right Column: Schema Table View & SQL Logs */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[500px] overflow-hidden z-10">
              
              {/* Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  MySQL Workbench Database Schema View (columns list)
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Layout Content */}
              <div className="flex-1 p-5 space-y-6 flex flex-col justify-between">
                
                {/* Visual Schema Table columns representation */}
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4">
                  <span className="text-[9px] font-mono text-indigo-400 absolute top-2 right-3 font-bold uppercase">
                    students table layout
                  </span>
                  <h5 className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5 font-mono mb-3">
                    <Table className="w-3.5 h-3.5 text-indigo-500" /> columns definition
                  </h5>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-slate-400 text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 font-bold">
                          <th className="pb-2">Field Name</th>
                          <th className="pb-2">DataType</th>
                          <th className="pb-2 text-right">Attributes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {columns.map((col, index) => (
                          <tr key={index} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                            <td className="py-2.5 text-indigo-400 font-bold font-mono">`{col.name}`</td>
                            <td className="py-2.5 text-emerald-400">{col.type}</td>
                            <td className="py-2.5 text-slate-400 text-right text-[11px]">{col.extra || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Live SQL Preview code block */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                    Generated DDL Query string:
                  </div>
                  <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 text-[13.5px] font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {getSQLPreview()}
                  </pre>
                </div>

              </div>

              {/* Action Log Console output */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-36 overflow-y-auto no-scrollbar z-10">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> Database Engine Logs:
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
                              ? 'text-amber-400 font-bold animate-pulse' 
                              : 'text-indigo-300'
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
          title="ใบงานทักษะคำสั่งสคริปต์ปรับแต่งตาราง (MySQL ALTER TABLE Practice Task)" 
          taskText={`[กิจกรรมฝึกปฏิบัติปฏิบัติการ DDL ALTER]
ให้นักเรียนศึกษาการทำงาน ทฤษฎีความรู้ และระบบตัวจำลอง Schema Modifier Simulator ด้านบนแล้วเขียนคำตอบลงสมุด:

1. ความรู้และการเปรียบเทียบคำสั่งแก้ไขตาราง (ALTER TABLE Commands Analysis):
   - การแก้ไขตารางด้วยคำสั่งย่อย ADD และ MODIFY COLUMN ในภาษา SQL ต่างกันอย่างไร? จงเขียนชุดอธิบายหน้าที่หลักของแต่ละตัว
   - ในการทำระบบคำสั่ง DROP COLUMN บนตารางฐานข้อมูล จะมีความปลอดภัยมากน้อยเพียงใด? และมีข้อควรระวังใดที่ต้องให้ความสำคัญสูงสุด?

2. การประเมินข้อจำกัดความเข้ากันได้ (Constraints Assessment):
   - เพราะเหตุใดระบบฐานข้อมูล MySQL จึงไม่ยินยอมให้กระทำคำสั่งลบคอลัมน์ที่เป็น PRIMARY KEY โดยไม่มีการสั่งปลดคุณสมบัติความเป็นคีย์หลักหรือลบตารางหลักเสียก่อน?
   - หากต้องการเปลี่ยนชนิดข้อมูลคอลัมน์ชื่อจาก VARCHAR(50) เป็น VARCHAR(255) กับ เปลี่ยนชนิดข้อจำกัดจาก NOT NULL ให้ยินยอมเป็นค่าว่าง (NULL) ต้องรันคำสั่งชนิดใดบ้าง?

3. เขียนรหัสคำสั่ง SQL (SQL ALTER TABLE Coding):
   - จงเขียนโครงสร้างประโยคแก้ไขตารางของ MySQL สำหรับความต้องการต่อไปนี้:
     1. เพิ่มคอลัมน์บันทึก "หมายเหตุ" (notes) ชนิดข้อมูลเป็น TEXT ลงในตาราง "students"
     2. ลบคอลัมน์ "age" ออกจากตาราง "students"
     3. แก้ไขชนิดข้อมูลของคอลัมน์ "phone" ในตาราง "students" ให้เป็น VARCHAR(20) จากนั้นเปลี่ยนชื่อคอลัมน์จาก "phone" ให้กลายเป็น "student_phone"`}
        />

      </main>
    </div>
  );
}
