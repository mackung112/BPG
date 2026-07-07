import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  FileCode,
  Check,
  Edit2,
  FolderOpen,
  Search,
  BookOpen
} from 'lucide-react';

export default function SQL2_3() {
  // ─── Workbench Simulator Schemas State ───
  const [schemas, setSchemas] = useState({
    data_std_bd: { 
      tables: ['teachers'],
      views: [],
      stored_procedures: [],
      functions: []
    },
    student_db: { 
      tables: ['scores'],
      views: [],
      stored_procedures: [],
      functions: []
    },
    sys: { 
      tables: ['sys_config'],
      views: [],
      stored_procedures: [],
      functions: []
    }
  });
  
  const [activeSchema, setActiveSchema] = useState(null); // Double-click data_std_bd to activate
  const [expandedSchemas, setExpandedSchemas] = useState({
    data_std_bd: true,
    student_db: false,
    sys: false
  });

  // Active guide tab: 'create' | 'alter' | 'drop'
  const [activeTab, setActiveTab] = useState('create');

  // Stepper steps for guiding the user
  const [createStep, setCreateStep] = useState(1); 
  // 1: Double-click data_std_bd & Right-click Tables -> Create Table...
  // 2: Fill Table Name "students" & select columns -> Click Apply
  // 3: Review DDL Script -> Click Apply
  // 4: Apply Success -> Click Finish
  // 5: Created successfully

  const [alterStep, setAlterStep] = useState(1);
  // 1: Right-click "students" table -> Alter Table...
  // 2: Click Add Column, type "phone" (VARCHAR(15)) -> Click Apply
  // 3: Review ALTER DDL Script -> Click Apply
  // 4: Apply Success -> Click Finish
  // 5: Altered successfully

  const [dropStep, setDropStep] = useState(1);
  // 1: Right-click "students" table -> Drop Table...
  // 2: Drop confirmation modal -> Click Drop Now
  // 3: Deleted successfully

  // Workbench Workspace Panel Tabs
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('query1'); // 'query1' | 'table_editor'
  const [editorMode, setEditorMode] = useState(null); // 'create' | 'alter' | null
  const [editorTableName, setEditorTableName] = useState('');
  
  // Table columns definition list
  const [editorColumns, setEditorColumns] = useState([]);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(0);

  // Context Menu State
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [contextMenuType, setContextMenuType] = useState(null); // 'tables_header' | 'table_item'
  const [contextMenuTarget, setContextMenuTarget] = useState(null); // schemaName or tableName

  // Modals & Action States
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [simulatedQueryResult, setSimulatedQueryResult] = useState(null); // When Select Rows is clicked

  // Action log state
  const [logMessages, setLogMessages] = useState([
    { time: '13:00:38', status: 'info', message: 'MySQL Workbench initiated. Workspace ready.' },
    { time: '13:00:39', status: 'info', message: 'Connection established to localhost:3306 (MySQL v8.0.32)' }
  ]);

  const navigatorRef = useRef(null);

  // Helper log emitter
  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  // Switch between DDL stepper tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEditorMode(null);
    setActiveWorkspaceTab('query1');
    setShowContextMenu(false);
    setShowApplyModal(false);
    setShowFinishModal(false);
    setShowConfirmModal(false);
    setIsExecuting(false);
    setSimulatedQueryResult(null);
    
    // Reset steps
    setCreateStep(1);
    setAlterStep(1);
    setDropStep(1);
    
    // Setup tables in schemas based on active tab
    if (tab === 'create' || tab === 'drop') {
      setSchemas(prev => ({
        ...prev,
        data_std_bd: { ...prev.data_std_bd, tables: ['teachers'] }
      }));
    } else if (tab === 'alter') {
      setSchemas(prev => ({
        ...prev,
        data_std_bd: { ...prev.data_std_bd, tables: ['teachers', 'students'] }
      }));
    }
    
    addLog(`Switched simulation guide to: ${tab === 'create' ? 'Create Table' : tab === 'alter' ? 'Alter Table' : 'Drop Table'}`, 'info');
  };

  // Double click schema to activate database
  const handleSchemaDoubleClick = (schemaName) => {
    setActiveSchema(schemaName);
    addLog(`DATABASE ACTIVE: \`${schemaName}\` is now default schema.`, 'info');
    
    if (activeTab === 'create' && createStep === 1 && schemaName === 'data_std_bd') {
      addLog('Step 1 info: Database data_std_bd active. Now right-click on Tables folder.', 'info');
    }
  };

  // Context Menu for Tables Category Folder Node
  const handleTablesHeaderContext = (e, schemaName) => {
    e.preventDefault();
    if (activeSchema !== schemaName) {
      addLog(`Cannot open context menu. Schema \`${schemaName}\` must be active first (double-click it).`, 'warning');
      return;
    }
    
    const parentRect = navigatorRef.current.getBoundingClientRect();
    const clickX = e.clientX - parentRect.left;
    const clickY = e.clientY - parentRect.top;
    
    setContextMenuType('tables_header');
    setContextMenuTarget(schemaName);
    setContextMenuPos({ x: clickX + 10, y: clickY });
    setShowContextMenu(true);
  };

  // Context Menu for individual Table Node
  const handleTableItemContext = (e, tableName) => {
    e.preventDefault();
    const parentRect = navigatorRef.current.getBoundingClientRect();
    const clickX = e.clientX - parentRect.left;
    const clickY = e.clientY - parentRect.top;

    setContextMenuType('table_item');
    setContextMenuTarget(tableName);
    setContextMenuPos({ x: clickX + 10, y: clickY });
    setShowContextMenu(true);
  };

  // Context Menu Option handlers
  const handleMenuCreateTable = () => {
    setShowContextMenu(false);
    if (activeTab === 'create' && createStep === 1 && activeSchema === 'data_std_bd') {
      setEditorMode('create');
      setActiveWorkspaceTab('table_editor');
      setEditorTableName('students');
      setEditorColumns([
        { name: 'student_id', datatype: 'INT', defaultValue: '', pk: true, nn: true, uq: false, bin: false, un: false, zf: false, ai: true, g: false },
        { name: 'name', datatype: 'VARCHAR(100)', defaultValue: '', pk: false, nn: true, uq: false, bin: false, un: false, zf: false, ai: false, g: false },
        { name: 'email', datatype: 'VARCHAR(100)', defaultValue: '', pk: false, nn: false, uq: true, bin: false, un: false, zf: false, ai: false, g: false }
      ]);
      setSelectedColumnIndex(0);
      setCreateStep(2);
      addLog('Opened Table Editor in CREATE mode. Input Table Name and define columns.', 'info');
    } else {
      addLog('Guideline: Double-click data_std_bd to activate it first, then right-click Tables.', 'warning');
    }
  };

  const handleMenuAlterTable = (tableName) => {
    setShowContextMenu(false);
    if (activeTab === 'alter' && alterStep === 1 && tableName === 'students') {
      setEditorMode('alter');
      setActiveWorkspaceTab('table_editor');
      setEditorTableName(tableName);
      setEditorColumns([
        { name: 'student_id', datatype: 'INT', defaultValue: '', pk: true, nn: true, uq: false, bin: false, un: false, zf: false, ai: true, g: false },
        { name: 'name', datatype: 'VARCHAR(100)', defaultValue: '', pk: false, nn: true, uq: false, bin: false, un: false, zf: false, ai: false, g: false },
        { name: 'email', datatype: 'VARCHAR(100)', defaultValue: '', pk: false, nn: false, uq: true, bin: false, un: false, zf: false, ai: false, g: false }
      ]);
      setSelectedColumnIndex(0);
      setAlterStep(2);
      addLog(`Opened Table Editor in ALTER mode for \`${tableName}\`.`, 'info');
    } else {
      addLog('Guideline: Switch to Alter Table tab and right-click on the "students" table node.', 'warning');
    }
  };

  const handleMenuDropTable = (tableName) => {
    setShowContextMenu(false);
    if (activeTab === 'drop' && dropStep === 1 && tableName === 'students') {
      setContextMenuTarget(tableName);
      setShowConfirmModal(true);
      setDropStep(2);
      addLog(`Confirm Dialog opened for dropping table \`${tableName}\`.`, 'warning');
    } else {
      addLog('Guideline: Switch to Drop Table tab and right-click on the "students" table node.', 'warning');
    }
  };

  // Simulate SQL select rows
  const handleMenuSelectRows = (tableName) => {
    setShowContextMenu(false);
    setActiveWorkspaceTab('query1');
    setSimulatedQueryResult({
      tableName,
      columns: ['student_id', 'name', 'email', 'phone'],
      rows: [
        { student_id: 1, name: 'สมชาย รักดี', email: 'somchai@email.com', phone: '081-234-5678' },
        { student_id: 2, name: 'สมศรี มณีทอง', email: 'somsri@email.com', phone: '089-876-5432' }
      ]
    });
    addLog(`Executed DQL: SELECT * FROM data_std_bd.${tableName} LIMIT 1000;`, 'success');
  };

  // Modify currently selected column grid inputs
  const handleColumnChange = (index, field, value) => {
    setEditorColumns(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Add column row button
  const handleAddColumnRow = () => {
    const isAlterMode = activeTab === 'alter';
    const newColName = isAlterMode ? 'phone' : `column_${editorColumns.length + 1}`;
    const newColType = isAlterMode ? 'VARCHAR(15)' : 'VARCHAR(45)';
    
    setEditorColumns(prev => [
      ...prev,
      { name: newColName, datatype: newColType, defaultValue: '', pk: false, nn: false, uq: false, bin: false, un: false, zf: false, ai: false, g: false }
    ]);
    
    setSelectedColumnIndex(editorColumns.length);
    addLog('Added new column row to grid. Click on it to adjust attributes below.', 'info');
  };

  // Dynamically generate SQL scripts based on current states
  const generateSQLScript = () => {
    if (editorMode === 'create') {
      let sql = `CREATE TABLE \`data_std_bd\`.\`${editorTableName || 'new_table'}\` (\n`;
      const colDefinitions = editorColumns.map(col => {
        let line = `  \`${col.name}\` ${col.datatype}`;
        if (col.nn) line += ' NOT NULL';
        if (col.ai) line += ' AUTO_INCREMENT';
        if (col.un) line += ' UNSIGNED';
        if (col.zf) line += ' ZEROFILL';
        if (col.defaultValue) line += ` DEFAULT '${col.defaultValue}'`;
        return line;
      });

      // PK Constraints
      const pks = editorColumns.filter(c => c.pk).map(c => `\`${c.name}\``);
      if (pks.length > 0) {
        colDefinitions.push(`  PRIMARY KEY (${pks.join(', ')})`);
      }

      // Unique Constraints
      editorColumns.forEach(c => {
        if (c.uq) {
          colDefinitions.push(`  UNIQUE INDEX \`${c.name}_UNIQUE\` (\`${c.name}\` ASC)`);
        }
      });

      sql += colDefinitions.join(',\n') + '\n);';
      return sql;
    } else if (editorMode === 'alter') {
      // Check if phone was added
      const hasPhone = editorColumns.some(c => c.name === 'phone');
      if (hasPhone) {
        return `ALTER TABLE \`data_std_bd\`.\`students\` \nADD COLUMN \`phone\` VARCHAR(15) NULL AFTER \`email\`;`;
      }
      return `ALTER TABLE \`data_std_bd\`.\`students\` \nMODIFY COLUMN \`name\` VARCHAR(150) NOT NULL;`;
    }
    return '';
  };

  // Trigger DDL Apply
  const handleApplyClick = () => {
    if (editorMode === 'create' && createStep === 2) {
      if (!editorTableName.trim()) {
        alert('กรุณาระบุชื่อตาราง (Table Name) ในช่องด้านบน');
        return;
      }
      setShowApplyModal(true);
      setCreateStep(3);
    } else if (editorMode === 'alter' && alterStep === 2) {
      setShowApplyModal(true);
      setAlterStep(3);
    }
  };

  // Confirmed DDL Apply in modal
  const handleConfirmSQLApply = () => {
    setIsExecuting(true);
    addLog(`Running DDL statement on MySQL instance...`, 'info');
    
    setTimeout(() => {
      setIsExecuting(false);
      setShowApplyModal(false);
      setShowFinishModal(true);
      
      if (activeTab === 'create' && createStep === 3) {
        setCreateStep(4);
        addLog(`DDL successful: Table data_std_bd.${editorTableName} created on disc.`, 'success');
      } else if (activeTab === 'alter' && alterStep === 3) {
        setAlterStep(4);
        addLog(`DDL successful: Table data_std_bd.students altered.`, 'success');
      }
    }, 1200);
  };

  // Finish DDL flow
  const handleFinishFlow = () => {
    setShowFinishModal(false);
    setEditorMode(null);
    setActiveWorkspaceTab('query1');
    
    if (activeTab === 'create' && createStep === 4) {
      setSchemas(prev => ({
        ...prev,
        data_std_bd: { 
          ...prev.data_std_bd, 
          tables: ['teachers', 'students'] 
        }
      }));
      setCreateStep(5);
      addLog(`Table 'students' cataloged. Stepper guide complete!`, 'success');
    } else if (activeTab === 'alter' && alterStep === 4) {
      setAlterStep(5);
      addLog(`Table modification finalised. Table editor closed.`, 'success');
    }
  };

  // Drop Now button trigger
  const handleConfirmDropNow = () => {
    setIsExecuting(true);
    addLog(`Running DDL: DROP TABLE \`data_std_bd\`.\`students\`;`, 'info');
    
    setTimeout(() => {
      setIsExecuting(false);
      setShowConfirmModal(false);
      
      setSchemas(prev => ({
        ...prev,
        data_std_bd: { 
          ...prev.data_std_bd, 
          tables: ['teachers'] 
        }
      }));
      
      setDropStep(3);
      addLog(`DDL successful: Table data_std_bd.students deleted. Disk clean.`, 'success');
    }, 1000);
  };

  // Close context menu when click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setShowContextMenu(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Selected column reference helper
  const activeCol = editorColumns[selectedColumnIndex] || null;

  return (
    <div className="w-full relative" id="sql2_3-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content (Fluid Open-Air Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-600" />
              สรุปคำสั่งและข้อจำกัด / SQL Constraints & Attributes
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสร้างตารางและข้อจำกัดคอลัมน์ในฐานข้อมูล (MySQL Constraints)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              ในการสร้างหรือแก้ไขตารางด้วยคำสั่งภาษา DDL (<span className="font-mono bg-cyan-50/65 border border-cyan-200/50 text-cyan-900 px-1 py-0.5 rounded text-xs font-bold">CREATE TABLE</span> หรือ <span className="font-mono bg-cyan-50/65 border border-cyan-200/50 text-cyan-900 px-1 py-0.5 rounded text-xs font-bold">ALTER TABLE</span>) เราจำเป็นต้องกำหนดคุณสมบัติและข้อกำหนดควบคุมคอลัมน์ (Constraints) เพื่อป้องกันความซ้ำซ้อนและรักษาความถูกต้องสมบูรณ์ของโครงสร้างข้อมูล (Database Integrity)
            </p>

            {/* 6 Grid items detailing the exact slide information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mt-6">
              
              {/* Card 1: PRIMARY KEY */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-cyan-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center bg-cyan-100 text-cyan-900 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded">PK</span>
                  <h4 className="text-[15.5px] font-bold text-slate-800">PRIMARY KEY (คีย์หลัก)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ฟิลด์ที่กำหนดความระบุตัวตนที่ไม่ซ้ำกันในตาราง <span className="font-semibold text-slate-800">ห้ามมีค่าซ้ำกัน</span> และ <span className="font-semibold text-slate-800">ห้ามเป็นค่าว่าง (NULL)</span> โดยเด็ดขาด
                </p>
              </div>

              {/* Card 2: NOT NULL */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-blue-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center bg-blue-100 text-blue-900 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded">NN</span>
                  <h4 className="text-[15.5px] font-bold text-slate-800">NOT NULL (ห้ามว่าง)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ข้อจำกัดบังคับผู้ป้อนข้อมูลว่าคอลัมน์นี้ <span className="font-semibold text-slate-800">ต้องมีข้อมูลป้อนเข้ามาเสมอ</span> ห้ามเว้นไว้เป็นค่าว่างหรือปล่อยเป็น NULL
                </p>
              </div>

              {/* Card 3: UNIQUE */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-emerald-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center bg-emerald-100 text-emerald-900 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded">UQ</span>
                  <h4 className="text-[15.5px] font-bold text-slate-800">UNIQUE (ไม่ซ้ำ)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  คอลัมน์ที่กำหนดให้ข้อมูลภายใน <span className="font-semibold text-slate-800">ห้ามซ้ำซ้อนกันในแนวตั้ง</span> (เช่น อีเมล หรือเบอร์โทรศัพท์) แต่สามารถมีค่าเป็น NULL ว่างได้
                </p>
              </div>

              {/* Card 4: BINARY */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-amber-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center bg-amber-100 text-amber-900 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded">BIN</span>
                  <h4 className="text-[15.5px] font-bold text-slate-800">BINARY (เลขฐานสอง)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  การจัดเก็บสายข้อมูลประเภทไบนารีระดับล่าง <span className="font-semibold text-slate-800">เก็บข้อมูลแบบ Bit/Byte</span> มักนำไปใช้บันทึกไฟล์ สื่อภาพ หรือคีย์เข้ารหัสลับ
                </p>
              </div>

              {/* Card 5: UNSIGNED */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-violet-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center bg-violet-100 text-violet-900 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded">UN</span>
                  <h4 className="text-[15.5px] font-bold text-slate-800">UNSIGNED (เป็นบวกเสมอ)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  บังคับคอลัมน์ตัวเลขให้รับเฉพาะค่าบวกเท่านั้น <span className="font-semibold text-slate-800">ไม่มีค่าเครื่องหมายลบติดมา</span> (เช่น รหัส ID, อายุ หรือ ราคาสินค้า)
                </p>
              </div>

              {/* Card 6: ZEROFILL */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-rose-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center bg-rose-100 text-rose-900 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded">ZF</span>
                  <h4 className="text-[15.5px] font-bold text-slate-800">ZEROFILL (เติมศูนย์ข้างหน้า)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  คอลัมน์ที่จะแสดงข้อมูลตัวเลขโดย <span className="font-semibold text-slate-800">เติมตัวเลขศูนย์เพิ่มข้างหน้าให้เต็มจำนวนหลัก</span> ที่จำกัดไว้ (เช่น INT(4) ของเลข 7 จะเป็น 0007)
                </p>
              </div>

            </div>

            {/* Slide context warning box */}
            <div className="bg-cyan-50/60 backdrop-blur-md border border-cyan-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-cyan-500 leading-relaxed text-[14.5px] text-cyan-900">
              <span className="font-bold text-cyan-800 flex items-center gap-1.5 mb-1.5">
                <Info className="w-4.5 h-4.5 text-cyan-600" /> จากกระบวนการในห้องเรียน (Slide Highlights):
              </span>
              โปรแกรม MySQL Workbench มีแผงเอดิเตอร์ในการตั้งค่าคอลัมน์อยู่ 2 ส่วน ส่วนหลักคือตารางกำหนดประเภทข้อมูลใน Grid และส่วนย่อยด้านล่าง (<span className="font-semibold">Column Details</span>) ที่ประกอบด้วยกล่อง Checkboxes เต็มรูปแบบ เช่น <span className="font-semibold text-cyan-700">Primary Key</span>, <span className="font-semibold text-cyan-700">Not Null</span>, และ <span className="font-semibold text-cyan-700">Unique</span> ซึ่งคุณสามารถจำลองคลิกปรับเปลี่ยนได้แบบเรียลไทม์ในตัวจำลอง Workbench ด้านล่างนี้
            </div>
          </div>
        </section>

        {/* ─── Section 2: Interactive Workbench Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">
              ตัวจำลองเครื่องมือ / Workbench GUI Simulator
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ปฏิบัติการจัดการโครงสร้างและคุณสมบัติตารางบน MySQL Workbench
            </h3>
          </div>

          {/* Simulator Shell */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            
            {/* Left Stepper Guide Panel (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-5 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[550px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                INSTRUCTION GUIDE
              </span>

              <div className="space-y-6 mt-4">
                {/* Stepper selection tabs */}
                <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => handleTabChange('create')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === 'create'
                        ? 'bg-cyan-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    1. สร้างตาราง (CREATE)
                  </button>
                  <button
                    onClick={() => handleTabChange('alter')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === 'alter'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    2. แก้ไขตาราง (ALTER)
                  </button>
                  <button
                    onClick={() => handleTabChange('drop')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === 'drop'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    3. ลบตาราง (DROP)
                  </button>
                </div>

                {/* Checklist guide items */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide border-b border-slate-800 pb-2">
                    ขั้นตอนปฏิบัติกิจกรรม:
                  </h4>

                  {/* Create Table Guide */}
                  {activeTab === 'create' && (
                    <div className="space-y-3">
                      {[
                        { step: 1, text: 'ดับเบิลคลิกที่ "data_std_bd" ใน Navigator แถบซ้ายเพื่อให้แอคทีฟ (ตัวหนา)' },
                        { step: 2, text: 'คลิกขวาที่โฟลเดอร์ Tables ของ data_std_bd แล้วเลือก Create Table...' },
                        { step: 3, text: 'ตั้งชื่อตาราง "students" ด้านบน สังเกตคอลัมน์ และคลิกปุ่ม Apply ที่ขวาล่าง' },
                        { step: 4, text: 'ตรวจสอบสคริปต์ CREATE TABLE ในหน้าต่างรีวิว แล้วกดปุ่ม Apply' },
                        { step: 5, text: 'กด Finish สิ้นสุดกระบวนการสร้างและขึ้นโครงสร้างตารางใหม่' }
                      ].map((item) => (
                        <div 
                          key={item.step} 
                          className={`flex items-start gap-3 text-xs leading-relaxed transition-all ${
                            createStep === item.step 
                              ? 'text-cyan-400 font-bold scale-[1.01]' 
                              : createStep > item.step 
                                ? 'text-slate-500 line-through' 
                                : 'text-slate-600'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono border shrink-0 text-[10px] mt-0.5 ${
                            createStep === item.step 
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 animate-pulse' 
                              : createStep > item.step 
                                ? 'bg-slate-800 border-slate-700 text-slate-500' 
                                : 'bg-transparent border-slate-800 text-slate-600'
                          }`}>
                            {createStep > item.step ? '✓' : item.step}
                          </div>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Alter Table Guide */}
                  {activeTab === 'alter' && (
                    <div className="space-y-3">
                      {[
                        { step: 1, text: 'คลิกขยาย Tables ของ data_std_bd และคลิกขวาที่ตาราง "students"' },
                        { step: 2, text: 'คลิกเลือกเมนู "Alter Table..."' },
                        { step: 3, text: 'คลิกปุ่ม "+ Column Row" เพื่อเพิ่มฟิลด์ "phone" (ชนิด VARCHAR(15)) และกด Apply' },
                        { step: 4, text: 'ตรวจสอบสคริปต์ ALTER TABLE ในหน้าต่างรีวิว แล้วกด Apply อีกครั้ง' },
                        { step: 5, text: 'กด Finish สิ้นสุดกระบวนการแก้ไขคอลัมน์ของตาราง' }
                      ].map((item) => (
                        <div 
                          key={item.step} 
                          className={`flex items-start gap-3 text-xs leading-relaxed transition-all ${
                            alterStep === item.step 
                              ? 'text-blue-400 font-bold scale-[1.01]' 
                              : alterStep > item.step 
                                ? 'text-slate-500 line-through' 
                                : 'text-slate-600'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono border shrink-0 text-[10px] mt-0.5 ${
                            alterStep === item.step 
                              ? 'bg-blue-500/20 border-blue-400 text-blue-400 animate-pulse' 
                              : alterStep > item.step 
                                ? 'bg-slate-800 border-slate-700 text-slate-500' 
                                : 'bg-transparent border-slate-800 text-slate-600'
                          }`}>
                            {alterStep > item.step ? '✓' : item.step}
                          </div>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Drop Table Guide */}
                  {activeTab === 'drop' && (
                    <div className="space-y-3">
                      {[
                        { step: 1, text: 'คลิกขวาที่ตาราง "students" ภายใต้โฟลเดอร์ Tables ใน Navigator' },
                        { step: 2, text: 'เลือกคำสั่งลบตาราง "Drop Table..." ในป๊อปอัพเมนู' },
                        { step: 3, text: 'ในหน้าต่างยืนยันความปลอดภัยสีแดง -> คลิก "Drop Now" เพื่อลบตารางถาวร' }
                      ].map((item) => (
                        <div 
                          key={item.step} 
                          className={`flex items-start gap-3 text-xs leading-relaxed transition-all ${
                            dropStep === item.step 
                              ? 'text-rose-400 font-bold scale-[1.01]' 
                              : dropStep > item.step 
                                ? 'text-slate-500 line-through' 
                                : 'text-slate-600'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono border shrink-0 text-[10px] mt-0.5 ${
                            dropStep === item.step 
                              ? 'bg-rose-500/20 border-rose-400 text-rose-400 animate-pulse' 
                              : dropStep > item.step 
                                ? 'bg-slate-800 border-slate-700 text-slate-500' 
                                : 'bg-transparent border-slate-800 text-slate-600'
                          }`}>
                            {dropStep > item.step ? '✓' : item.step}
                          </div>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tips footer */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 mt-6 text-xs text-slate-400 leading-normal space-y-1">
                <div className="font-bold text-amber-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> เทคนิคลัด Workbench:
                </div>
                <p>
                  หลังสร้างและแก้ไขตารางแล้ว สามารถคลิกขวาที่ชื่อตารางและเลือก <span className="text-cyan-400 font-mono">Select Rows - Limit 1000</span> เพื่อคัดกรองดูผลการทำรายการข้อมูลและฟังก์ชันตารางได้ทันที
                </p>
              </div>

            </div>

            {/* Right MySQL Workbench Interactive Window (lg:col-span-8) */}
            <div className="lg:col-span-8 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[550px] overflow-hidden z-10 select-none">
              
              {/* Workbench Window Frame Headers */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '7s' }} />
                  MySQL Workbench - Instance @ localhost:3306 (Admin Panel)
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Workbench Menu Bar */}
              <div className="bg-[#2a2a2e] px-3 py-2 border-b border-slate-950 flex items-center justify-between text-[11px] text-slate-300 font-sans">
                <div className="flex items-center gap-3">
                  <span className="hover:text-white cursor-pointer transition-colors">File</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
                  <span className="hover:text-white cursor-pointer transition-colors">View</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Database</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Server</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Tools</span>
                </div>
                
                {/* Visual Connected Status */}
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>CONNECTED</span>
                </div>
              </div>

              {/* Split view: Sidebar Left, Content Right */}
              <div className="flex-1 flex min-h-[380px] relative" ref={navigatorRef}>
                
                {/* 1. Navigator Panel (Left Sidebar) */}
                <div className="w-48 bg-[#18181b] border-r border-slate-900 p-3 flex flex-col justify-between shrink-0 font-mono text-[11px]">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-800">
                      Navigator
                    </div>
                    
                    {/* Tab labels */}
                    <div className="text-[10px] text-slate-400 bg-slate-950 p-0.5 rounded border border-slate-900 mb-3 flex text-center font-semibold">
                      <span className="flex-1 bg-slate-900 text-white p-1 rounded shadow-sm">SCHEMAS</span>
                      <span className="flex-1 p-1 text-slate-700">Admin</span>
                    </div>

                    {/* Collapsible Schemas Tree */}
                    <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
                      {Object.keys(schemas).map((schemaName) => {
                        const isActive = activeSchema === schemaName;
                        const isExpanded = expandedSchemas[schemaName];

                        return (
                          <div key={schemaName} className="space-y-0.5">
                            {/* Database Root Node */}
                            <div 
                              onDoubleClick={() => handleSchemaDoubleClick(schemaName)}
                              onClick={() => {
                                handleSchemaDoubleClick(schemaName);
                                setExpandedSchemas(prev => ({ ...prev, [schemaName]: !prev[schemaName] }));
                              }}
                              className={`flex items-center justify-between px-2 py-1.5 rounded transition-all cursor-pointer select-none group border ${
                                isActive 
                                  ? 'bg-cyan-950/30 text-cyan-400 border-cyan-800/30 font-bold' 
                                  : 'hover:bg-slate-900 text-slate-400 border-transparent hover:text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                <Database className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                                <span>{schemaName}</span>
                              </div>
                              <ChevronDown className={`w-3 h-3 text-slate-600 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Database Elements */}
                            {isExpanded && (
                              <div className="pl-4 space-y-1 border-l border-slate-800 ml-3.5 mt-0.5">
                                
                                {/* 1. Tables Element */}
                                <div className="space-y-0.5">
                                  <div 
                                    onContextMenu={(e) => handleTablesHeaderContext(e, schemaName)}
                                    className={`flex items-center justify-between px-1.5 py-1 rounded hover:bg-slate-900/60 text-slate-500 hover:text-slate-300 cursor-pointer`}
                                    onClick={(e) => {
                                      if (activeSchema === schemaName) {
                                        handleTablesHeaderContext(e, schemaName);
                                      } else {
                                        addLog('Activate database schema first by double-clicking it.', 'warning');
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-1">
                                      <FolderOpen className="w-3 h-3 text-slate-600" />
                                      <span>Tables</span>
                                    </div>
                                    {activeTab === 'create' && createStep === 1 && isActive && (
                                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping shrink-0" />
                                    )}
                                  </div>

                                  {/* Table nodes */}
                                  <div className="pl-3 space-y-0.5 mt-0.5">
                                    {schemas[schemaName].tables.map((table) => {
                                      const isTargetForAlter = activeTab === 'alter' && alterStep === 1 && table === 'students';
                                      const isTargetForDrop = activeTab === 'drop' && dropStep === 1 && table === 'students';

                                      return (
                                        <div
                                          key={table}
                                          onContextMenu={(e) => handleTableItemContext(e, table)}
                                          onClick={(e) => {
                                            handleTableItemContext(e, table);
                                          }}
                                          className={`flex items-center justify-between px-1.5 py-0.5 rounded text-[10.5px] cursor-pointer group border ${
                                            isTargetForAlter || isTargetForDrop
                                              ? 'bg-cyan-950/20 text-cyan-400 border-cyan-800/20 animate-pulse font-bold'
                                              : 'hover:bg-slate-900 text-slate-400 hover:text-slate-300 border-transparent'
                                          }`}
                                        >
                                          <div className="flex items-center gap-1.5 truncate">
                                            <Table className="w-3 h-3 text-slate-600 shrink-0" />
                                            <span>{table}</span>
                                          </div>
                                          
                                          {(isTargetForAlter || isTargetForDrop) && (
                                            <span className="text-[7px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-1 rounded transform scale-90 shrink-0">
                                              เมนูคลิก
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* 2. Views Element */}
                                <div className="flex items-center gap-1 px-1.5 py-1 text-slate-600 hover:text-slate-400 cursor-not-allowed">
                                  <FolderOpen className="w-3 h-3 text-slate-700" />
                                  <span>Views</span>
                                </div>

                                {/* 3. Stored Procedures */}
                                <div className="flex items-center gap-1 px-1.5 py-1 text-slate-600 hover:text-slate-400 cursor-not-allowed">
                                  <FolderOpen className="w-3 h-3 text-slate-700" />
                                  <span>Stored Procedures</span>
                                </div>

                                {/* 4. Functions */}
                                <div className="flex items-center gap-1 px-1.5 py-1 text-slate-600 hover:text-slate-400 cursor-not-allowed">
                                  <FolderOpen className="w-3 h-3 text-slate-700" />
                                  <span>Functions</span>
                                </div>

                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigator Context Tips */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-[9.5px] text-slate-500 leading-normal mb-1">
                    {activeTab === 'create' && createStep === 1 && (
                      <span className="text-cyan-400 font-bold flex items-start gap-1">
                        <MousePointer className="w-3 h-3 mt-0.5 shrink-0 animate-pulse" /> Double-click `data_std_bd` ในแถบด้านซ้ายเพื่อทดลองแอคทีฟ
                      </span>
                    )}
                    {activeTab === 'alter' && alterStep === 1 && (
                      <span className="text-blue-400 font-bold flex items-start gap-1 animate-pulse">
                        <MousePointer className="w-3 h-3 mt-0.5 shrink-0" /> คลิกหรือคลิกขวาที่ตาราง `students` ใต้ Tables เพื่อเริ่มการ Alter
                      </span>
                    )}
                    {activeTab === 'drop' && dropStep === 1 && (
                      <span className="text-rose-400 font-bold flex items-start gap-1 animate-pulse">
                        <MousePointer className="w-3 h-3 mt-0.5 shrink-0" /> คลิกหรือคลิกขวาที่ตาราง `students` และเลือก Drop Table...
                      </span>
                    )}
                    {((activeTab === 'create' && createStep > 1) || (activeTab === 'alter' && alterStep > 1) || (activeTab === 'drop' && dropStep > 1)) && (
                      <span className="text-slate-500">
                        ดึงคำสั่งจำลองแล้ว จัดเตรียมฟิลด์ที่หน้าต่างขวามือด้านล่าง
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Content Area (Right Panel) */}
                <div className="flex-1 bg-[#1e1e1e] p-3 flex flex-col justify-between min-h-[380px] overflow-hidden">
                  
                  {/* Workspace Tab Header */}
                  <div className="flex border-b border-slate-900 bg-slate-900 -mx-3 -mt-3 px-3 py-1 font-mono text-[10px] text-slate-400 gap-1 select-none">
                    <button 
                      onClick={() => setActiveWorkspaceTab('query1')}
                      className={`px-3 py-1.5 rounded-t-lg transition-colors cursor-pointer ${
                        activeWorkspaceTab === 'query1' ? 'bg-[#1e1e1e] text-white font-bold' : 'hover:bg-[#252528]'
                      }`}
                    >
                      Query 1
                    </button>
                    {editorMode && (
                      <button 
                        onClick={() => setActiveWorkspaceTab('table_editor')}
                        className={`px-3 py-1.5 rounded-t-lg transition-colors cursor-pointer flex items-center gap-1 ${
                          activeWorkspaceTab === 'table_editor' ? 'bg-[#1e1e1e] text-white font-bold' : 'hover:bg-[#252528]'
                        }`}
                      >
                        <FileCode className="w-3 h-3 text-cyan-400" />
                        <span>{editorMode === 'create' ? 'new_table' : editorTableName} - Schema *</span>
                      </button>
                    )}
                  </div>

                  {activeWorkspaceTab === 'table_editor' && editorMode ? (
                    <div className="flex-1 flex flex-col justify-between bg-[#151515] rounded-xl p-3 animate-fade-in relative z-10 border border-slate-800 mt-2 overflow-y-auto">
                      
                      {/* Top editor parameters (Table name) */}
                      <div className="flex items-center gap-3 border-b border-slate-800 pb-2 mb-2">
                        <label className="text-[10.5px] text-slate-400 font-mono font-bold">Table Name:</label>
                        <input
                          type="text"
                          value={editorTableName}
                          onChange={(e) => setEditorTableName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                          disabled={editorMode === 'alter' || createStep > 2}
                          className="bg-slate-950 border border-slate-800 text-white rounded px-2 py-0.5 text-xs font-mono w-44 focus:border-cyan-500 focus:outline-none disabled:text-slate-600 disabled:bg-slate-900 disabled:border-slate-800"
                        />
                      </div>

                      {/* Split Table Layout: Grid Top, Detailed Attributes Bottom */}
                      <div className="flex-1 flex flex-col justify-between space-y-3 min-h-[220px]">
                        
                        {/* Upper: Grid Table Columns list */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                            <span>Columns definition grid:</span>
                            {((activeTab === 'alter' && alterStep === 2) || (activeTab === 'create' && createStep === 2)) && (
                              <button
                                onClick={handleAddColumnRow}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-2 py-0.5 rounded flex items-center gap-1 text-[8.5px] cursor-pointer transition-colors shadow"
                              >
                                <Plus className="w-2.5 h-2.5" /> + Column Row
                              </button>
                            )}
                          </div>

                          <div className="border border-slate-800 rounded bg-slate-950 font-mono text-[10px]">
                            {/* Grid Headers */}
                            <div className="grid grid-cols-12 bg-slate-900 py-1.5 px-2 border-b border-slate-800 text-slate-400 font-bold text-center">
                              <span className="col-span-4 text-left">Column Name</span>
                              <span className="col-span-4 text-left">Datatype</span>
                              <span className="col-span-1">PK</span>
                              <span className="col-span-1">NN</span>
                              <span className="col-span-1">UQ</span>
                              <span className="col-span-1">AI</span>
                            </div>

                            {/* Columns Rows */}
                            <div className="max-h-24 overflow-y-auto no-scrollbar">
                              {editorColumns.map((col, idx) => (
                                <div 
                                  key={idx} 
                                  onClick={() => setSelectedColumnIndex(idx)}
                                  className={`grid grid-cols-12 py-1 px-2 items-center border-b border-slate-900/60 cursor-pointer ${
                                    selectedColumnIndex === idx 
                                      ? 'bg-cyan-950/20 text-cyan-400 font-bold border-l-2 border-l-cyan-500' 
                                      : 'hover:bg-slate-900/40 text-slate-300 hover:text-white'
                                  }`}
                                >
                                  {/* Col Name */}
                                  <div className="col-span-4 pr-1">
                                    <input
                                      type="text"
                                      value={col.name}
                                      onChange={(e) => handleColumnChange(idx, 'name', e.target.value)}
                                      disabled={(editorMode === 'alter' && idx < 3) || selectedColumnIndex !== idx}
                                      className="bg-transparent border-none text-slate-100 focus:outline-none w-full py-0.5 px-0.5 font-mono disabled:text-slate-500"
                                    />
                                  </div>

                                  {/* Datatype dropdown */}
                                  <div className="col-span-4 pr-1 text-slate-400">
                                    {editorMode === 'alter' && idx < 3 ? (
                                      <span className="text-[9.5px] text-slate-500">{col.datatype}</span>
                                    ) : (
                                      <select
                                        value={col.datatype}
                                        onChange={(e) => handleColumnChange(idx, 'datatype', e.target.value)}
                                        disabled={selectedColumnIndex !== idx}
                                        className="bg-slate-900 border border-slate-800 text-slate-200 text-[9px] rounded focus:outline-none w-full"
                                      >
                                        <option value="INT">INT</option>
                                        <option value="VARCHAR(45)">VARCHAR(45)</option>
                                        <option value="VARCHAR(100)">VARCHAR(100)</option>
                                        <option value="VARCHAR(15)">VARCHAR(15)</option>
                                        <option value="DATE">DATE</option>
                                        <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                                      </select>
                                    )}
                                  </div>

                                  {/* PK indicator */}
                                  <div className="col-span-1 text-center font-bold text-[9px] text-cyan-400">
                                    {col.pk ? '✓' : '-'}
                                  </div>

                                  {/* NN indicator */}
                                  <div className="col-span-1 text-center font-bold text-[9px] text-blue-400">
                                    {col.nn ? '✓' : '-'}
                                  </div>

                                  {/* UQ indicator */}
                                  <div className="col-span-1 text-center font-bold text-[9px] text-emerald-400">
                                    {col.uq ? '✓' : '-'}
                                  </div>

                                  {/* AI indicator */}
                                  <div className="col-span-1 text-center font-bold text-[9px] text-rose-400">
                                    {col.ai ? '✓' : '-'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Lower: Detailed Attributes Panel (Exactly like image 3) */}
                        {activeCol && (
                          <div className="bg-[#1b1b1e] border border-slate-800 rounded-lg p-3 space-y-2.5">
                            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono font-bold tracking-wider uppercase border-b border-slate-800 pb-1.5">
                              <span>Column Options Details: <span className="text-cyan-400 font-bold">{activeCol.name}</span></span>
                              <span className="text-slate-600">MySQL Workbench Properties</span>
                            </div>

                            {/* Data Type and Default Fields */}
                            <div className="grid grid-cols-2 gap-4 text-[10.5px]">
                              <div className="flex items-center gap-2">
                                <label className="text-slate-400 font-mono font-bold">Data Type:</label>
                                <span className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[10px]">
                                  {activeCol.datatype}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="text-slate-400 font-mono font-bold">Default Value:</label>
                                <input 
                                  type="text" 
                                  value={activeCol.defaultValue}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'defaultValue', e.target.value)}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  placeholder="NULL"
                                  className="bg-slate-950 border border-slate-800 text-white font-mono text-[10px] rounded px-2 py-0.5 focus:border-cyan-500 focus:outline-none w-28 disabled:text-slate-600"
                                />
                              </div>
                            </div>

                            {/* Checkbox columns attributes list (Exactly matched to image 3) */}
                            <div className="grid grid-cols-3 gap-y-2 text-[10px] font-mono text-slate-300">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.pk}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'pk', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Primary Key</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.nn}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'nn', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Not Null</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.uq}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'uq', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Unique</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.bin}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'bin', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Binary</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.un}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'un', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Unsigned</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.zf}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'zf', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Zero Fill</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.ai}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'ai', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Auto Increment</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={activeCol.g}
                                  disabled={editorMode === 'alter' && selectedColumnIndex < 3}
                                  onChange={(e) => handleColumnChange(selectedColumnIndex, 'g', e.target.checked)}
                                  className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-0 w-3 h-3 cursor-pointer"
                                />
                                <span>Generated</span>
                              </label>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Editor Apply trigger buttons bar */}
                      <div className="flex justify-end gap-3 pt-2.5 border-t border-slate-800 mt-3">
                        <button
                          onClick={() => {
                            setEditorMode(null);
                            setActiveWorkspaceTab('query1');
                            if (activeTab === 'create') setCreateStep(1);
                            if (activeTab === 'alter') setAlterStep(1);
                          }}
                          className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold rounded-lg hover:text-white cursor-pointer transition-colors"
                        >
                          Revert
                        </button>
                        
                        <button
                          onClick={handleApplyClick}
                          className="px-4.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-500 rounded-lg text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-1"
                        >
                          Apply <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ) : (
                    /* Default state / SQL Query 1 Shell view */
                    <div className="flex-1 flex flex-col justify-between mt-2">
                      <div className="flex-1 bg-slate-950 rounded-xl p-3 border border-slate-900 text-xs font-mono min-h-[160px] relative overflow-y-auto">
                        
                        {/* Simulating SQL Query display */}
                        <div className="absolute top-2 right-3 text-[9px] text-slate-600 tracking-wider">
                          SQL QUERY EDITOR
                        </div>
                        
                        {simulatedQueryResult ? (
                          <div className="space-y-3">
                            <span className="text-cyan-400 font-bold block">
                              &gt; SELECT * FROM data_std_bd.{simulatedQueryResult.tableName} LIMIT 1000;
                            </span>
                            
                            {/* Grid result table */}
                            <div className="border border-slate-800 rounded bg-[#1c1c1e] text-[10px]">
                              {/* Grid headers */}
                              <div className="grid grid-cols-4 bg-[#27272a] py-1 px-2 font-bold text-slate-400 border-b border-slate-800 text-center">
                                {simulatedQueryResult.columns.map((c, i) => (
                                  <span key={i} className="truncate text-left pl-1">{c}</span>
                                ))}
                              </div>
                              {/* Grid rows */}
                              <div className="divide-y divide-slate-800/40 text-slate-300">
                                {simulatedQueryResult.rows.map((row, idx) => (
                                  <div key={idx} className="grid grid-cols-4 py-1 px-2 hover:bg-slate-900/30">
                                    <span className="pl-1 truncate">{row.student_id}</span>
                                    <span className="pl-1 truncate">{row.name}</span>
                                    <span className="pl-1 truncate text-emerald-400">{row.email}</span>
                                    <span className="pl-1 truncate text-cyan-400">{row.phone || 'NULL'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-500 block">
                              2 rows returned in query execution.
                            </span>
                          </div>
                        ) : (
                          <div className="text-slate-600 italic select-none h-full flex flex-col items-center justify-center space-y-2">
                            <Terminal className="w-8 h-8 text-slate-800 animate-pulse" />
                            <p className="text-[11px] leading-normal text-center">
                              {activeTab === 'create' 
                                ? 'ดับเบิลคลิก data_std_bd และคลิกขวา Tables -> เลือก Create Table... เพื่อเปิดโปรแกรมจัดการตาราง' 
                                : activeTab === 'alter'
                                  ? 'คลิกขวาที่ตาราง students และเลือก Alter Table... เพื่อทำการจำลองการปรับแต่งโครงสร้าง'
                                  : 'คลิกขวาที่ตาราง students และเลือก Drop Table... เพื่อตรวจสอบโมดูลความปลอดภัย'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Context menu overlay popup */}
                  {showContextMenu && (
                    <div 
                      className="absolute bg-[#27272a] border border-slate-800 rounded-lg shadow-2xl py-1 z-30 font-mono text-[11px] text-slate-200 w-44"
                      style={{ 
                        left: `${contextMenuPos.x}px`, 
                        top: `${contextMenuPos.y}px` 
                      }}
                    >
                      {contextMenuType === 'tables_header' && (
                        <>
                          <button 
                            onClick={handleMenuCreateTable}
                            className="w-full text-left px-3 py-1.5 hover:bg-cyan-600 hover:text-white flex items-center justify-between text-cyan-400 font-bold cursor-pointer transition-colors"
                          >
                            <span>Create Table...</span>
                            <Plus className="w-3 h-3 text-cyan-400" />
                          </button>
                          <button className="w-full text-left px-3 py-1 text-slate-500 cursor-not-allowed">Create Table Like...</button>
                          <button className="w-full text-left px-3 py-1 text-slate-500 cursor-not-allowed">Search Table Data...</button>
                        </>
                      )}

                      {contextMenuType === 'table_item' && (
                        <>
                          <button 
                            onClick={() => handleMenuSelectRows(contextMenuTarget)}
                            disabled={contextMenuTarget !== 'students'}
                            className={`w-full text-left px-3 py-1.5 flex items-center justify-between font-bold ${
                              contextMenuTarget === 'students' 
                                ? 'hover:bg-cyan-600 hover:text-white text-cyan-400 cursor-pointer' 
                                : 'text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <span>Select Rows - Limit 1000</span>
                            <Search className="w-3 h-3 text-cyan-500" />
                          </button>
                          
                          <button 
                            onClick={() => handleMenuAlterTable(contextMenuTarget)}
                            disabled={contextMenuTarget !== 'students'}
                            className={`w-full text-left px-3 py-1.5 flex items-center justify-between font-bold ${
                              contextMenuTarget === 'students' 
                                ? 'hover:bg-blue-600 hover:text-white text-blue-400 cursor-pointer' 
                                : 'text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <span>Alter Table...</span>
                            <Edit2 className="w-3 h-3" />
                          </button>
                          
                          <button 
                            onClick={() => handleMenuDropTable(contextMenuTarget)}
                            disabled={contextMenuTarget !== 'students'}
                            className={`w-full text-left px-3 py-1.5 flex items-center justify-between font-bold ${
                              contextMenuTarget === 'students' 
                                ? 'hover:bg-rose-600 hover:text-white text-rose-400 cursor-pointer' 
                                : 'text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <span>Drop Table...</span>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                      
                      <div className="border-t border-slate-800 my-1" />
                      <button className="w-full text-left px-3 py-1 text-slate-500 cursor-not-allowed">Refresh All</button>
                    </div>
                  )}

                </div>
              </div>

              {/* RDBMS Console Action Output logs */}
              <div className="bg-[#151518] border-t border-slate-900 p-4 shrink-0 font-mono text-[11px] max-h-32 overflow-y-auto no-scrollbar z-10">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> Action Output Console Log:
                </div>
                <div className="space-y-1 text-slate-300">
                  {logMessages.map((msg, i) => (
                    <div key={i} className="flex gap-3 leading-relaxed">
                      <span className="text-slate-500 select-none shrink-0">{msg.time}</span>
                      <span className={
                        msg.status === 'success' 
                          ? 'text-emerald-400 font-bold' 
                          : msg.status === 'error' 
                            ? 'text-rose-500 font-bold' 
                            : msg.status === 'warning' 
                              ? 'text-amber-400' 
                              : 'text-cyan-400'
                      }>
                        {msg.status === 'success' ? '✓' : msg.status === 'error' ? '✗' : 'i'} {msg.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── MODALS DIALOGS ─── */}

              {/* 1. REVIEW SQL DDL PREVIEW MODAL */}
              {showApplyModal && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-40 flex items-center justify-center p-6 animate-fade-in">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 flex flex-col justify-between shadow-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <h5 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-cyan-400" /> Review SQL Script to Apply
                      </h5>
                      <button onClick={() => { setShowApplyModal(false); if (activeTab === 'create') setCreateStep(2); else setAlterStep(2); }} className="text-slate-500 hover:text-white cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-slate-400 leading-normal">
                        รันสคริปต์ DDL ที่โปรแกรมจำลองวิเคราะห์โค้ดเบื้องหลัง:
                      </p>
                      <pre className="bg-slate-950 p-4 rounded-xl border border-slate-950 text-xs font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                        {generateSQLScript()}
                      </pre>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => { setShowApplyModal(false); if (activeTab === 'create') setCreateStep(2); else setAlterStep(2); }}
                        className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold rounded-lg hover:text-white cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmSQLApply}
                        disabled={isExecuting}
                        className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-lg border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        {isExecuting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Executing...
                          </>
                        ) : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SUCCESS / FINISH MODAL */}
              {showFinishModal && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-40 flex items-center justify-center p-6 animate-fade-in">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl space-y-4 flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-2 shadow-inner">
                      <Check className="w-7 h-7" />
                    </div>
                    <h5 className="text-white font-bold text-[16px]">Apply SQL Script Success!</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {activeTab === 'create' 
                        ? `ตาราง students ได้รับการสร้างขึ้นสู่ฐานข้อมูล data_std_bd เรียบร้อย DDL ทำงานเสร็จสิ้น` 
                        : `ตาราง students ได้รับการแก้ไขขยายโครงสร้างคอลัมน์ DDL สำเร็จลุล่วง`}
                    </p>
                    <button
                      onClick={handleFinishFlow}
                      className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 border border-cyan-500 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-[1.03]"
                    >
                      Finish
                    </button>
                  </div>
                </div>
              )}

              {/* 3. DROP CONFIRMATION WARNING MODAL */}
              {showConfirmModal && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-40 flex items-center justify-center p-6 animate-fade-in">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 flex flex-col justify-between shadow-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <h5 className="text-sm font-bold text-rose-400 font-mono flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" /> Confirm Drop Table Action
                      </h5>
                      <button onClick={() => { setShowConfirmModal(false); setDropStep(1); }} className="text-slate-500 hover:text-white cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-slate-200 leading-relaxed font-bold">
                        คุณต้องการสั่งลบทำลายตาราง `students` ออกจากเซิร์ฟเวอร์แบบถาวรหรือไม่?
                      </p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        การรันคำสั่ง DDL: <span className="font-mono text-rose-400 bg-rose-950/20 px-1 py-0.5 rounded">DROP TABLE data_std_bd.students;</span> จะทำลายโครงสร้าง ฟิลด์ข้อมูล และข้อมูลแถวทิ้งทั้งหมดโดยไม่สามารถกู้คืนกลับมาได้
                      </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => { setShowConfirmModal(false); setDropStep(1); }}
                        className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold rounded-lg hover:text-white cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDropNow}
                        disabled={isExecuting}
                        className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg border border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        {isExecuting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Dropping...
                          </>
                        ) : 'Drop Now'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask 
          title="ภารกิจออกแบบโครงสร้างและการจัดการตารางข้อมูล (Table Schema Design and Administration Task)" 
          taskText={`[ใบงานคำสั่งกิจกรรมปฏิบัติท้ายบทเรียน]
ให้นักเรียนวิเคราะห์ความรู้จากคำอธิบายทฤษฎีและการทดลองใช้งานโปรแกรมจำลอง MySQL Workbench แล้วตอบคำถามลงในสมุดบันทึก:

1. ข้อจำกัดและคุณสมบัติคอลัมน์ (Table Constraints & Attributes):
   - จงอธิบายความสำคัญในการติ๊กคุณสมบัติ PK (Primary Key), NN (Not Null) และ AI (Auto Increment) ร่วมกันในคอลัมน์รหัสหลักของตาราง
   - คุณสมบัติ UNSIGNED และ ZEROFILL ทำหน้าที่อะไรในการควบคุมการจัดเก็บและการแสดงผลข้อมูลตัวเลขตามเนื้อหาที่ได้จำลองเรียนรู้?

2. สคริปต์ SQL DDL เบื้องหลังปฏิบัติการ (Review SQL Script):
   - จงเขียนคำสั่ง SQL (DDL) ในการสร้างตารางชื่อ "courses" ประกอบด้วยรหัส course_id (INT, เป็นคีย์หลัก, ห้ามเป็นค่าว่าง, และรันอัตโนมัติ), ชื่อวิชา course_name (VARCHAR(150), ห้ามเป็นค่าว่าง)
   - จงเขียนคำสั่ง SQL (DDL) ในการแก้ไขปรับแต่งโครงสร้างตาราง "courses" โดยทำการเพิ่มคอลัมน์ credits (INT, ห้ามเป็นค่าว่าง, มีความคุ้มครองกำหนดค่าเริ่มต้น DEFAULT เป็น 3)
   - จงเขียนคำสั่ง SQL (DDL) ที่ระบบ RDBMS สั่งลบตารางชื่อ "old_students" ออกจากระบบอย่างถาวร

3. ประเมินการบริหารจัดการข้อมูล (Database Management Assessment):
   - การคลิกขวาที่ตารางใน Navigator แล้วเลือก "Select Rows - Limit 1000" ส่งคำสั่งประเภทใดไปประมวลผลที่ฐานข้อมูล (DML, DDL หรือ DQL)? และได้ผลลัพธ์ข้อมูลในรูปแบบใด?
   - ข้อจำกัด UNIQUE (UQ) ต่างจาก PRIMARY KEY (PK) อย่างไรในเรื่องเงื่อนไขการป้อนข้อมูลและการจัดเก็บข้อมูลว่างในตาราง?`}
        />

      </main>
    </div>
  );
}
