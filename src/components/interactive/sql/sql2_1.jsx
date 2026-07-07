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
  FolderOpen,
  Check,
  FileCode,
  ShieldAlert,
  BookOpen
} from 'lucide-react';

export default function SQL2_1() {
  // Simulator State
  const [colName, setColName] = useState('age');
  const [selectedType, setSelectedType] = useState('INT');
  const [sampleValue, setSampleValue] = useState('18');
  const [validationResult, setValidationResult] = useState({ valid: true, reason: 'ค่า INT ถูกต้อง ถูกเก็บในเมมโมรีขนาด 4 Bytes' });
  
  // Guided Quest Step
  const [questStep, setQuestStep] = useState(1);
  // 1: age -> INT, value "18"
  // 2: email -> VARCHAR, value "student@school.com"
  // 3: birth_date -> DATE, value "2008-12-25"
  // 4: is_registered -> BOOLEAN, value "TRUE" or "1"
  // 5: tuition_fee -> DECIMAL, value "3500.50"
  // 6: Complete

  // Output console logs
  const [logMessages, setLogMessages] = useState([
    { time: '13:20:00', status: 'info', message: 'SQL Data Type Engine loaded.' },
    { time: '13:20:01', status: 'info', message: 'Parser online. Ready to validate MySQL field attributes.' }
  ]);

  const addLog = (message, status = 'success') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogMessages(prev => [
      { time: timestamp, status, message },
      ...prev
    ]);
  };

  // Helper validation logic
  const validateValue = (type, val) => {
    if (val.trim() === '') {
      return { valid: false, reason: 'กรุณากรอกข้อมูลทดสอบในช่อง Sample Value' };
    }
    
    switch(type) {
      case 'INT': {
        const num = Number(val);
        if (isNaN(num)) return { valid: false, reason: 'ข้อมูลไม่ใช่ตัวเลขจำนวนเต็ม' };
        if (!Number.isInteger(num)) return { valid: false, reason: 'INT ต้องเป็นตัวเลขจำนวนเต็ม ห้ามมีจุดทศนิยม' };
        return { valid: true, reason: 'ค่า INT ถูกต้อง ถูกเก็บในเมมโมรีขนาด 4 Bytes' };
      }
      case 'VARCHAR': {
        if (val.length > 255) return { valid: false, reason: 'ความยาวเกินขีดจำกัดความยาวสูงสุด VARCHAR(255)' };
        return { valid: true, reason: `ค่า VARCHAR ถูกต้อง เก็บเป็นสายอักขระความยาวแปรผัน (${val.length} อักขระ)` };
      }
      case 'DATE': {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(val)) return { valid: false, reason: 'DATE ต้องใช้รูปแบบ YYYY-MM-DD เท่านั้น (เช่น 2026-06-04)' };
        const parsed = Date.parse(val);
        if (isNaN(parsed)) return { valid: false, reason: 'ค่าวันที่ไม่ถูกต้องตามหลักปฏิทินสากล' };
        return { valid: true, reason: 'ค่า DATE ถูกต้อง รูปแบบ YYYY-MM-DD (เก็บเป็นไบต์ 3 Bytes)' };
      }
      case 'DATETIME': {
        const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!datetimeRegex.test(val)) return { valid: false, reason: 'DATETIME ต้องระบุวันและเวลารูปแบบ YYYY-MM-DD HH:MM:SS (เช่น 2026-06-04 13:30:00)' };
        const datePart = val.split(' ')[0];
        const parsed = Date.parse(datePart);
        if (isNaN(parsed)) return { valid: false, reason: 'ค่าวันที่ไม่ถูกต้องตามหลักปฏิทินสากล' };
        return { valid: true, reason: 'ค่า DATETIME ถูกต้อง รวมข้อมูลเวลาครบถ้วน (เก็บ 8 Bytes)' };
      }
      case 'BOOLEAN': {
        const upperVal = val.toUpperCase().trim();
        if (upperVal === 'TRUE' || upperVal === 'FALSE' || upperVal === '1' || upperVal === '0') {
          return { valid: true, reason: 'BOOLEAN ถูกต้อง ใน MySQL จะจำลองเก็บเป็น TINYINT(1) (1 = TRUE, 0 = FALSE)' };
        }
        return { valid: false, reason: 'BOOLEAN รองรับเพียงค่า TRUE, FALSE, 1 หรือ 0 เท่านั้น' };
      }
      case 'FLOAT': {
        const num = Number(val);
        if (isNaN(num)) return { valid: false, reason: 'ข้อมูลไม่ใช่ตัวเลขทศนิยม' };
        return { valid: true, reason: 'ค่า FLOAT ถูกต้อง เก็บในระบบทศนิยมตำแหน่งลอย Single-Precision' };
      }
      case 'DECIMAL': {
        const num = Number(val);
        if (isNaN(num)) return { valid: false, reason: 'ข้อมูลไม่ใช่ตัวเลขจำนวนจริง' };
        return { valid: true, reason: 'ค่า DECIMAL ถูกต้อง เก็บตัวเลขทศนิยมแบบคงที่แม่นยำสูง (Fixed-Point) เหมาะกับงานการเงิน' };
      }
      case 'TEXT': {
        return { valid: true, reason: 'ค่า TEXT ถูกต้อง เก็บข้อมูลสตริงขนาดใหญ่สูงสุด 65,535 อักขระ' };
      }
      default:
        return { valid: false, reason: 'ชนิดข้อมูลขัดข้อง' };
    }
  };

  // Run validation on inputs change
  useEffect(() => {
    const result = validateValue(selectedType, sampleValue);
    setValidationResult(result);
    
    if (result.valid) {
      addLog(`Validation passed: Column '${colName}' of type ${selectedType} is valid for input '${sampleValue}'`, 'success');
      
      // Auto-step the quest if values match targets
      if (questStep === 1 && colName === 'age' && selectedType === 'INT' && sampleValue === '18') {
        setQuestStep(2);
        setColName('email');
        setSelectedType('VARCHAR');
        setSampleValue('student@school.com');
        addLog('Quest Step 1 Complete: Validated INT age!', 'info');
      } else if (questStep === 2 && colName === 'email' && selectedType === 'VARCHAR' && sampleValue === 'student@school.com') {
        setQuestStep(3);
        setColName('birth_date');
        setSelectedType('DATE');
        setSampleValue('2008-12-25');
        addLog('Quest Step 2 Complete: Validated VARCHAR email!', 'info');
      } else if (questStep === 3 && colName === 'birth_date' && selectedType === 'DATE' && sampleValue === '2008-12-25') {
        setQuestStep(4);
        setColName('is_registered');
        setSelectedType('BOOLEAN');
        setSampleValue('TRUE');
        addLog('Quest Step 3 Complete: Validated DATE birth_date!', 'info');
      } else if (questStep === 4 && colName === 'is_registered' && selectedType === 'BOOLEAN' && (sampleValue === 'TRUE' || sampleValue === '1')) {
        setQuestStep(5);
        setColName('tuition_fee');
        setSelectedType('DECIMAL');
        setSampleValue('3500.50');
        addLog('Quest Step 4 Complete: Validated BOOLEAN status!', 'info');
      } else if (questStep === 5 && colName === 'tuition_fee' && selectedType === 'DECIMAL' && sampleValue === '3500.50') {
        setQuestStep(6);
        addLog('Quest Complete: All MySQL basic data types successfully validated!', 'info');
      }
    } else {
      addLog(`Validation failed: '${sampleValue}' is invalid for type ${selectedType}`, 'error');
    }
  }, [colName, selectedType, sampleValue]);

  // Dynamic DDL output preview
  const generateColDDL = () => {
    let sizeStr = '';
    if (selectedType === 'VARCHAR') sizeStr = '(255)';
    if (selectedType === 'DECIMAL') sizeStr = '(10, 2)';
    
    return `\`${colName || 'column'}\` ${selectedType}${sizeStr} NULL`;
  };

  const resetQuest = () => {
    setQuestStep(1);
    setColName('age');
    setSelectedType('INT');
    setSampleValue('18');
    addLog('Quest steps restarted by user.', 'info');
  };

  return (
    <div className="w-full relative" id="sql2_1-root">
      {/* ─── Layer 1: Ambient Background Gradients ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Theory Content (Fluid Open-Air Layout) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-600" />
              ชนิดข้อมูลระบบฐานข้อมูล / MySQL Data Types
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ชนิดข้อมูล (Data Types) ที่สำคัญในระบบจัดการฐานข้อมูล MySQL
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal space-y-8">
            <p>
              การเลือกชนิดข้อมูล (<span className="font-semibold text-zinc-800">Data Type</span>) ให้ตรงกับลักษณะข้อมูลที่จะนำมาจัดเก็บจริง ถือเป็นหัวใจหลักในการวิเคราะห์และออกแบบตาราง ชนิดข้อมูลจะควบคุมสิทธิ์ ขนาดพื้นที่ที่ใช้ในการจัดเก็บตัวแปร และความถูกต้องในการประมวลผลทางคณิตศาสตร์หรือตรรกะในระบบ RDBMS
            </p>

            {/* Grid of 8 data types cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mt-6">
              
              {/* Type 1: INT */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-cyan-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-cyan-50/50 border border-cyan-200/50 text-cyan-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">INT</span>
                  <h4 className="text-[15px] font-bold text-slate-800">INT (Integer)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้เก็บตัวเลขจำนวนเต็มแบบไม่มีจุดทศนิยม รองรับทั้งบวกและลบ (เช่น อายุ, จำนวนนับ, รหัส ID) ใช้เนื้อที่เก็บคงที่ 4 Bytes
                </p>
              </div>

              {/* Type 2: VARCHAR */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-blue-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-blue-50/50 border border-blue-200/50 text-blue-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">VARCHAR</span>
                  <h4 className="text-[15px] font-bold text-slate-800">VARCHAR</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้เก็บสายอักขระข้อความที่มีความยาวแปรผันตามจริง ป้อนข้อความยาวเท่าใดก็จะกินพื้นที่ระบบตามความยาวจริงพร้อมไบต์ควบคุม
                </p>
              </div>

              {/* Type 3: DATE */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-emerald-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-emerald-50/50 border border-emerald-200/50 text-emerald-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">DATE</span>
                  <h4 className="text-[15px] font-bold text-slate-800">DATE (วันเดือนปี)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้จัดเก็บบันทึกข้อมูลวันที่โดยเฉพาะ เจาะจงรูปแบบมาตรฐานระบบสากลคือ <span className="font-mono bg-slate-100 text-slate-800 px-1 py-0.2 rounded text-[11px]">YYYY-MM-DD</span> (เช่น วันเกิด, วันลงทะเบียน)
                </p>
              </div>

              {/* Type 4: DATETIME */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-teal-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-teal-50/50 border border-teal-200/50 text-teal-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">DATETIME</span>
                  <h4 className="text-[15px] font-bold text-slate-800">DATETIME</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  เก็บบันทึกข้อมูลวันและเวลาควบคู่กัน รูปแบบแสดงคือ <span className="font-mono bg-slate-100 text-slate-800 px-1 py-0.2 rounded text-[11px]">YYYY-MM-DD HH:MM:SS</span> ใช้เนื้อที่จัดเก็บระบบคงที่ 8 Bytes
                </p>
              </div>

              {/* Type 5: BOOLEAN */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-violet-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-violet-50/50 border border-violet-200/50 text-violet-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">BOOLEAN</span>
                  <h4 className="text-[15px] font-bold text-slate-800">BOOLEAN</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  เก็บตรรกะความจริง รองรับค่า True หรือ False ในทางปฏิบัติของเซิร์ฟเวอร์ MySQL จะแปลงค่า BOOLEAN ไปเป็นข้อมูล <span className="font-mono bg-slate-100 text-slate-800 px-1 py-0.2 rounded text-[11px]">TINYINT(1)</span>
                </p>
              </div>

              {/* Type 6: FLOAT */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-amber-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-amber-50/50 border border-amber-200/50 text-amber-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">FLOAT</span>
                  <h4 className="text-[15px] font-bold text-slate-800">FLOAT</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  เก็บข้อมูลตัวเลขทศนิยมในรูปแบบพอยต์ตำแหน่งลอย (Floating-Point) แบบความละเอียดปกติ มักใช้กับค่าผลลัพธ์ทางคณิตศาสตร์/ฟิสิกส์ทั่วไป
                </p>
              </div>

              {/* Type 7: DECIMAL */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-orange-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-orange-50/50 border border-orange-200/50 text-orange-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">DECIMAL</span>
                  <h4 className="text-[15px] font-bold text-slate-800">DECIMAL</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ชนิดข้อมูลทศนิยมแบบคงที่แม่นยำสูง (Fixed-Point) ไม่มีการสูญเสียความละเอียดจากการคำนวณ จึงถูกระบุเป็นเกณฑ์เก็บเงินตราหรือภาษี
                </p>
              </div>

              {/* Type 8: TEXT */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-rose-500 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex bg-rose-50/50 border border-rose-200/50 text-rose-700 px-1 py-0.5 rounded text-[11px] font-bold font-mono">TEXT</span>
                  <h4 className="text-[15px] font-bold text-slate-800">TEXT (ข้อความยาว)</h4>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  ใช้เก็บสายอักขระข้อความที่มีขนาดยาวมากเป็นพิเศษสูงสุด 65,535 อักขระ เหมาะสำหรับคำอธิบายรายละเอียดสินค้า ประวัติ หรือบทความ
                </p>
              </div>

            </div>

            {/* Frosted Callout */}
            <div className="bg-cyan-50/60 backdrop-blur-md border border-cyan-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-cyan-500 leading-relaxed text-[14.5px] text-cyan-900">
              <span className="font-bold text-cyan-800 flex items-center gap-1.5 mb-1.5">
                <Info className="w-4.5 h-4.5 text-cyan-600" /> ทำไมรูปแบบ DATE จึงเคร่งครัดเรื่องการบันทึก?:
              </span>
              เซิร์ฟเวอร์ MySQL คาดหวังการจัดส่งข้อความวันที่ในรูปแบบ <span className="font-mono bg-cyan-100 text-cyan-800 px-1 rounded text-[12px] font-bold">YYYY-MM-DD</span> เสมอ หากป้อนรูปแบบท้องถิ่น เช่น `DD/MM/YYYY` หรือ `DD-MM-YYYY` ตัวจัดการคอลัมน์ของ MySQL จะทำการตีค่าข้อมูลเป็นข้อผิดพลาด หรือแปลงค่าขยะกลายเป็นวันที่ว่างเปล่า `0000-00-00`
            </div>
          </div>
        </section>

        {/* ─── Section 2: Interactive Datatype Validator Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">
              เครื่องมือตรวจสอบข้อมูล / Data Type Inspector
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ระบบจำลองการประเมินความเข้ากันได้ของข้อมูลคอลัมน์ MySQL
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทำภารกิจตรวจสอบชนิดข้อมูลตามบอร์ดนำทางด้านซ้ายให้สำเร็จ โดยป้อนฟิลด์ เลือกชนิดข้อมูล และลองทดสอบความถูกต้องที่บอร์ดวิเคราะห์ด้านขวา:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            
            {/* Left Column: Quest Control Board */}
            <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-5 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[480px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                QUEST TRACKER
              </span>

              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    ภารกิจจำลองเรียนรู้:
                  </h4>
                  {questStep === 6 && (
                    <button 
                      onClick={resetQuest}
                      className="text-[9.5px] bg-cyan-600/30 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded hover:bg-cyan-600/50 cursor-pointer"
                    >
                      Restart Quest
                    </button>
                  )}
                </div>

                {/* Quest lists */}
                <div className="space-y-3.5">
                  {[
                    { step: 1, name: 'age', type: 'INT', value: '18', desc: 'ตั้งฟิลด์ age ชนิด INT ป้อนค่าอายุเป็น "18"' },
                    { step: 2, name: 'email', type: 'VARCHAR', value: 'student@school.com', desc: 'ตั้งฟิลด์ email ชนิด VARCHAR ป้อนเมล "student@school.com"' },
                    { step: 3, name: 'birth_date', type: 'DATE', value: '2008-12-25', desc: 'ตั้งฟิลด์ birth_date ชนิด DATE ป้อนวันเกิด "2008-12-25"' },
                    { step: 4, name: 'is_registered', type: 'BOOLEAN', value: 'TRUE', desc: 'ตั้งฟิลด์ is_registered ชนิด BOOLEAN ป้อนตรรกะ "TRUE"' },
                    { step: 5, name: 'tuition_fee', type: 'DECIMAL', value: '3500.50', desc: 'ตั้งฟิลด์ tuition_fee ชนิด DECIMAL ป้อนค่าเทอม "3500.50"' }
                  ].map((q) => (
                    <div 
                      key={q.step} 
                      className={`flex items-start gap-3 text-xs leading-relaxed transition-all ${
                        questStep === q.step 
                          ? 'text-cyan-400 font-bold scale-[1.01]' 
                          : questStep > q.step 
                            ? 'text-slate-500 line-through' 
                            : 'text-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono border shrink-0 text-[10px] mt-0.5 ${
                        questStep === q.step 
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 animate-pulse' 
                          : questStep > q.step 
                            ? 'bg-slate-800 border-slate-700 text-slate-500' 
                            : 'bg-transparent border-slate-800 text-slate-600'
                      }`}>
                        {questStep > q.step ? '✓' : q.step}
                      </div>
                      <div className="flex-1">
                        <span className="block">{q.desc}</span>
                        {questStep === q.step && (
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                            Target: <span className="text-white">name={q.name}</span>, <span className="text-white">type={q.type}</span>, <span className="text-white">val={q.value}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {questStep === 6 && (
                    <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3.5 text-center text-emerald-400 animate-fade-in space-y-1">
                      <div className="font-bold flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" /> ภารกิจวิเคราะห์ดาต้าเสร็จสมบูรณ์!
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        คุณได้เรียนรู้วิธีการกำหนด Column Name, Datatype และการวิเคราะห์ค่าข้อมูลของ MySQL data types ครบถ้วนแล้ว
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Guide Alert box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 mt-6 text-xs text-slate-400 leading-normal space-y-1">
                <div className="font-bold text-amber-500 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-500" /> หมายเหตุทางเทคนิค:
                </div>
                <p>
                  ชนิดข้อมูลตัวเลขจำพวก DECIMAL มีความปลอดภัยสูงที่สุดสำหรับการป้อนข้อมูลทศนิยมเพราะเก็บเป็น String ทศนิยมแม่นยำสูง แตกต่างจาก FLOAT ที่เป็นฐานสองทำให้อาจมีเศษปัดทศนิยมเพี้ยนในการบวกเงินสด
                </p>
              </div>

            </div>

            {/* Right Column: Database Field Inspector Panel */}
            <div className="lg:col-span-8 bg-slate-950/95 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between relative min-h-[480px] overflow-hidden z-10 select-none">
              
              {/* Top Window Header */}
              <div className="bg-[#1e1e1e] border-b border-slate-900 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                  MySQL Workbench - Field Datatype Inspector DDL View
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Workspace inputs area */}
              <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                
                {/* 1. Control Panel Fields */}
                <div className="bg-[#151518] border border-slate-800 rounded-xl p-4 space-y-4">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>MySQL Column Parameter Inputs:</span>
                    <span className="text-cyan-400">DDL Engine V1.0</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Column Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-mono font-bold block">Column Name:</label>
                      <input 
                        type="text"
                        value={colName}
                        onChange={(e) => setColName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                        className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1.5 text-xs font-mono w-full focus:border-cyan-500 focus:outline-none"
                        placeholder="ระบุชื่อฟิลด์"
                      />
                    </div>

                    {/* Datatype Select */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-mono font-bold block">MySQL Data Type:</label>
                      <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1.5 text-xs font-mono w-full focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="INT">INT</option>
                        <option value="VARCHAR">VARCHAR(255)</option>
                        <option value="DATE">DATE</option>
                        <option value="DATETIME">DATETIME</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                        <option value="FLOAT">FLOAT</option>
                        <option value="DECIMAL">DECIMAL(10,2)</option>
                        <option value="TEXT">TEXT</option>
                      </select>
                    </div>

                    {/* Sample Value text input */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-mono font-bold block">Sample Value (Data):</label>
                      <input 
                        type="text"
                        value={sampleValue}
                        onChange={(e) => setSampleValue(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1.5 text-xs font-mono w-full focus:border-cyan-500 focus:outline-none"
                        placeholder="ป้อนค่าทดสอบความถูกต้อง"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Validation Inspector Results */}
                <div className="flex-1 flex flex-col justify-center">
                  {validationResult.valid ? (
                    <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-emerald-400 text-xs font-bold font-mono">✓ VALIDATION SUCCESS</h5>
                        <p className="text-[11px] text-slate-300 leading-normal font-mono">
                          {validationResult.reason}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-rose-950/20 border border-rose-800/30 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                        <ShieldAlert className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-rose-400 text-xs font-bold font-mono">✗ TYPE MISMATCH / FORMAT ERROR</h5>
                        <p className="text-[11px] text-slate-300 leading-normal font-mono">
                          {validationResult.reason}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. DDL Code Preview */}
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                    Generated DDL Snippet:
                  </div>
                  <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 text-xs font-mono text-cyan-400 leading-relaxed overflow-x-auto whitespace-pre">
                    {generateColDDL()}
                  </pre>
                </div>

              </div>

              {/* Bottom Output Log */}
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

            </div>

          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask 
          title="ภารกิจวิเคราะห์และสเปกชนิดข้อมูลคอลัมน์ (MySQL Datatypes Specification Task)" 
          taskText={`[ใบงานคำสั่งกิจกรรมปฏิบัติท้ายบทเรียน]
ให้นักเรียนวิเคราะห์ความรู้จากคำอธิบายทฤษฎีประเภทข้อมูลและการทดสอบใช้งานโปรแกรมจำลองชนิดข้อมูล MySQL Datatype Inspector แล้วตอบคำถามลงในสมุดบันทึก:

1. การวิเคราะห์ขอบเขตพื้นที่และชนิดข้อมูล (Datatype Analysis):
   - ทำไมตำรา RDBMS จึงต้องกำหนดความต่างระหว่าง INT และ FLOAT ในการใช้งานคอลัมน์? ทั้งสองใช้เนื้อที่ในการจัดเก็บข้อมูลของคอมพิวเตอร์ต่างกันอย่างไร?
   - ข้อดีของการใช้ VARCHAR(size) แทนการระบุ TEXT ในคอลัมน์ชื่อพนักงานพนักงานและรายละเอียดประวัติทั่วไปคืออะไร?

2. การประยุกต์เปรียบเทียบในระบบ (Fidelity Comparison):
   - การเก็บข้อมูลประเภท "สถานะการทำงาน" (ทำงานอยู่ = TRUE, ออกแล้ว = FALSE) ใน MySQL จะถูกแปลงจัดเก็บในชนิดข้อมูลระดับฟิสิกส์ประเภทใด และใช้ค่าตัวเลขใดแทน?
   - ชนิดข้อมูล DECIMAL(8,2) ใช้เก็บทศนิยมแบบใด? และรองรับตัวเลขค่าสูงสุดเท่าใด? (จงเขียนรูปแบบตัวอย่างตัวเลข)

3. เขียน DDL สเปกฟิลด์ (Field Specifying DDL Code):
   - จงเขียนโครงสร้างสคริปต์ประกาศประเภทข้อมูลคอลัมน์ในคำสั่ง CREATE TABLE สำหรับฟิลด์ต่อไปนี้:
     1. รหัสบัตรประชาชน (citizen_id): เก็บเป็นข้อความความยาวคงที่ 13 อักขระ
     2. ค่าแรงเฉลี่ยพนักงาน (salary): เก็บเป็นตัวเลขทศนิยมคงที่แม่นยำสูงจำนวน 8 หลัก โดยมีทศนิยม 2 ตำแหน่ง
     3. วันและเวลาบันทึกรายการ (created_at): เก็บบันทึกข้อมูลปีคริสตศักราช วันเดือนปี และเวลาปัจจุบัน`}
        />

      </main>
    </div>
  );
}
