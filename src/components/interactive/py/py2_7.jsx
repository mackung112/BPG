import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  Database, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Star, 
  Flame, 
  Check, 
  Maximize2, 
  HelpCircle, 
  Code2, 
  ChevronRight, 
  Smile 
} from 'lucide-react';

// ============================================================================
// CARD 1: การย่อหน้า (Indentation) เพื่อความชัดเจน
// ============================================================================

const IndentationCard = () => {
  const [isIndented, setIsIndented] = useState(false);

  const flatCode = [
    "BEGIN",
    "READ score",
    "IF score >= 50 THEN",
    "PRINT \"Pass\"",
    "ELSE",
    "PRINT \"Fail\"",
    "END IF",
    "END"
  ];

  const indentedCode = [
    { code: "BEGIN", indent: 0 },
    { code: "READ score", indent: 1 },
    { code: "IF score >= 50 THEN", indent: 1 },
    { code: "  PRINT \"Pass\"", indent: 2 },
    { code: "ELSE", indent: 1 },
    { code: "  PRINT \"Fail\"", indent: 2 },
    { code: "END IF", indent: 1 },
    { code: "END", indent: 0 }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <Layers className="w-3.5 h-3.5" /> ความเป็นระเบียบโครงสร้าง
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-indigo-600" />
          การย่อหน้า (Indentation) เพื่อความชัดเจน
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          ในการเขียนรหัสเทียม **การย่อหน้า (Indentation)** หรือการเยื้องบรรทัดเข้าไปด้านในเป็นข้อตกลงที่สำคัญที่สุด 
          เพื่อชี้ให้เห็นอย่างชัดเจนว่ากลุ่มคำสั่งย่อยใดขึ้นตรงต่อการตรวจสอบหรือการวนรอบโครงสร้างด้านบน 
          การย่อหน้าจะช่วยให้นักพัฒนาในทีมอ่านทำความเข้าใจและนำรหัสเทียมไปแปลงเป็นโค้ดโปรแกรมจริงได้ง่ายขึ้นหลายเท่าตัว
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controls & Explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex-1 flex flex-col justify-center">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                ทดลองสลับมุมมองจัดระเบียบย่อหน้า:
              </span>

              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setIsIndented(false)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-all active:scale-98 ${
                    !isIndented
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  ไม่มีการย่อหน้า (อ่านยาก)
                </button>
                <button
                  type="button"
                  onClick={() => setIsIndented(true)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-all active:scale-98 ${
                    isIndented
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  มีการเยื้องย่อหน้า (อ่านง่าย)
                </button>
              </div>

              <div className={`p-4 rounded-xl border transition-all duration-300 text-xs leading-relaxed ${
                isIndented 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-rose-50 border-rose-100 text-rose-700'
              }`}>
                <div className="flex gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-0.5">{isIndented ? 'โครงสร้างชัดเจน!' : 'โครงสร้างคลุมเครือ!'}</strong>
                    {isIndented 
                      ? 'สังเกตเห็นระดับขอบเขตของเงื่อนไข IF และ ELSE ได้ทันทีผ่านการเยื้องสายตา ช่วยให้ทำความเข้าใจระบบลอจิกได้ใน 1 วินาที' 
                      : 'คำสั่งทุกบรรทัดกองรวมกันในแนวระนาบเดียวกันหมด ทำให้ผู้พัฒนาต้องอ่านทบทวนคำสั่งละเอียดถึงจะแยกบล็อกเงื่อนไขย่อยได้'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Code Container */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl min-h-[260px]">
            <div>
              <span className="block text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex justify-between items-center">
                <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5" /> indent_visualizer.txt</span>
                <span className={isIndented ? 'text-emerald-400' : 'text-rose-400'}>
                  {isIndented ? '● FORMATTED' : '● UNFORMATTED'}
                </span>
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1 relative">
                {isIndented ? (
                  indentedCode.map((line, idx) => {
                    const hasIndent = line.indent > 0;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-start rounded px-2.5 py-0.5 transition-all duration-500 transform translate-x-0 ${
                          hasIndent ? 'bg-indigo-950/20 text-indigo-200' : ''
                        }`}
                      >
                        <span className="w-5 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">{idx + 1}</span>
                        <span 
                          style={{ paddingLeft: `${line.indent * 24}px` }}
                          className="font-mono transition-all duration-500"
                        >
                          {line.code}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  flatCode.map((line, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start rounded px-2.5 py-0.5 transition-all duration-500 transform"
                    >
                      <span className="w-5 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">{idx + 1}</span>
                      <span className="font-mono">{line}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARD 2: การเขียนหมายเหตุ (Comment) ในรหัสเทียม
// ============================================================================

const CommentCard = () => {
  const [showComments, setShowComments] = useState(true);

  const pseudocodeWithComments = [
    { code: "BEGIN", comment: null, indent: 0 },
    { code: "total = 0", comment: "กำหนดค่าตัวสะสมยอดรวมเริ่มต้นเป็น 0", indent: 1 },
    { code: "READ num", comment: "รับค่าตัวเลขแรกจากแป้นพิมพ์ของผู้ใช้", indent: 1 },
    { code: "WHILE num != -1 DO", comment: "ประมวลผลลูปซ้ำตราบใดที่ตัวเลขที่ระบุไม่ใช่ค่า -1", indent: 1 },
    { code: "  total = total + num", comment: "บวกเพิ่มค่าที่รับเข้ามาสะสมเข้ารวมในตัวแปร total", indent: 2 },
    { code: "  READ num", comment: "พักรับข้อมูลตัวเลขชุดต่อไปจากผู้ใช้", indent: 2 },
    { code: "END WHILE", comment: "สิ้นสุดบล็อกการสะสมวนซ้ำ", indent: 1 },
    { code: "PRINT total", comment: "แสดงยอดผลรวมรวมสะสมสุทธิออกทางจอภาพ", indent: 1 },
    { code: "END", comment: null, indent: 0 }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50/50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <span className="bg-purple-50 text-purple-600 border border-purple-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5" /> คำอธิบายช่วยความจำ
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Database className="w-7 h-7 text-purple-600" />
          การเขียนหมายเหตุ (Comment) ในรหัสเทียม
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          **หมายเหตุ (Comment)** คือส่วนของคำอธิบายการทำงานในแต่ละสเต็ปของอัลกอริทึม โดยจะใช้สัญลักษณ์เฉพาะนำหน้า (เช่น `//` หรือ `#`) 
          เพื่อชี้แจงให้ระบบทราบว่า **บรรทัดหมายเหตุเหล่านี้จะไม่นำไปประมวลผลประมวลผลจริง** 
          การใส่หมายเหตุช่วยให้โปรแกรมเมอร์คนอื่นเข้าใจอัลกอริทึมการคิดของเราได้ทันที หรือช่วยเตือนความจำกรณีที่เราย้อนกลับมาอ่านงานตัวเอง
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Controls & Explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex-1 flex flex-col justify-center">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                สวิตช์เปิด/ปิดหน้าต่างคำอธิบายลอจิก:
              </span>

              <button
                type="button"
                onClick={() => setShowComments(!showComments)}
                className={`w-full py-4.5 px-6 rounded-2xl font-bold text-sm transition-all active:scale-98 flex items-center justify-center gap-2.5 shadow-md ${
                  showComments
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/10'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${showComments ? 'rotate-180 transition-transform duration-500' : ''}`} />
                <span>{showComments ? 'ซ่อนคำอธิบายหมายเหตุ (Hide Comments)' : 'แสดงคำอธิบายหมายเหตุ (Show Comments)'}</span>
              </button>

              <div className="mt-6 bg-white border border-slate-200 p-4 rounded-xl text-xs leading-relaxed text-slate-500 flex gap-2">
                <Info className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>ในการพัฒนาจริง ยิ่งอัลกอริทึมซับซ้อนมากเท่าใด การเขียนคอมเมนต์ชี้แจงจะมีค่าอย่างยิ่งต่อตัวเราและโปรแกรมเมอร์ในทีม</span>
              </div>
            </div>
          </div>

          {/* Live Code Container */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <span className="block text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> comment_workspace.txt
              </span>

              <div className="font-mono text-xs md:text-sm leading-loose text-slate-300 space-y-1">
                {pseudocodeWithComments.map((line, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between border-b border-transparent py-0.5">
                    <div className="flex items-start">
                      <span className="w-5 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">{idx + 1}</span>
                      <span style={{ paddingLeft: `${line.indent * 20}px` }} className="font-mono">
                        {line.code}
                      </span>
                    </div>

                    {line.comment && (
                      <span className={`font-mono text-[10px] md:text-xs transition-all duration-300 md:ml-4 ${
                        showComments 
                          ? 'text-emerald-400 opacity-100 font-bold' 
                          : 'text-slate-700 opacity-20 select-none'
                      }`}>
                        // {showComments ? line.comment : '...'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INTERACTIVE PLAYGROUND: PSEUDOCODE REFACTORING STUDIO
// ============================================================================

const RefactoringStudio = () => {
  const [indented, setIndented] = useState(false);
  const [commented, setCommented] = useState(false);
  const [capitalized, setCapitalized] = useState(false);
  
  // Confetti / Completion state
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute readability score
  const getReadabilityScore = () => {
    let score = 20;
    if (indented) score += 30;
    if (commented) score += 25;
    if (capitalized) score += 25;
    return score;
  };

  const readabilityScore = getReadabilityScore();

  useEffect(() => {
    if (readabilityScore === 100) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [readabilityScore]);

  const rawCodeBlock = [
    { code: "begin", indented: "BEGIN", commented: "BEGIN", capitalized: "BEGIN" },
    { code: "read age", indented: "  read age", commented: "  read age  // รับข้อมูลอายุ", capitalized: "  READ age" },
    { code: "if age >= 18 then", indented: "  if age >= 18 then", commented: "  if age >= 18 then  // เช็คอายุถึงเกณฑ์หรือไม่", capitalized: "  IF age >= 18 THEN" },
    { code: "print \"adult\"", indented: "    print \"adult\"", commented: "    print \"adult\"  // อนุมัติสิทธิ์บัตรผู้ใหญ่", capitalized: "    PRINT \"adult\"" },
    { code: "else", indented: "  else", commented: "  else  // กรณีไม่เข้าเกณฑ์เงื่อนไขแรก", capitalized: "  ELSE" },
    { code: "print \"minor\"", indented: "    print \"minor\"", commented: "    print \"minor\"  // สิทธิ์บัตรวัยเยาว์", capitalized: "    PRINT \"minor\"" },
    { code: "end if", indented: "  end if", commented: "  end if  // สิ้นสุดเช็คขอบเขตเงื่อนไข", capitalized: "  END IF" },
    { code: "end", indented: "END", commented: "END", capitalized: "END" }
  ];

  const getRenderedCodeLine = (line) => {
    let text = line.code;
    
    // Step 1: Capitalization check
    if (capitalized) {
      text = text.replace("begin", "BEGIN")
                 .replace("read", "READ")
                 .replace("if", "IF")
                 .replace("then", "THEN")
                 .replace("print", "PRINT")
                 .replace("else", "ELSE")
                 .replace("end if", "END IF")
                 .replace("end", "END");
    }

    // Step 2: Indentation check
    if (indented) {
      if (line.code.startsWith("read") || line.code.startsWith("if") || line.code.startsWith("else") || line.code.startsWith("end if")) {
        text = "  " + text;
      } else if (line.code.startsWith("print")) {
        text = "    " + text;
      }
    }

    return text;
  };

  const getCommentForLine = (idx) => {
    if (!commented) return null;
    const comments = {
      1: "รับข้อมูลอายุสมาชิก",
      2: "เช็คอายุเข้าเกณฑ์ผู้ใหญ่หรือไม่?",
      3: "พิมพ์แสดงคำว่าสิทธิ์บัตรผู้ใหญ่",
      4: "กรณีอายุไม่ถึง 18 ปี",
      5: "พิมพ์สิทธิ์บัตรวัยเยาว์",
      6: "สิ้นสุดขอบเขตเงื่อนไขเดี่ยว"
    };
    return comments[idx] ? `// ${comments[idx]}` : null;
  };

  const handleResetRefactor = () => {
    setIndented(false);
    setCommented(false);
    setCapitalized(false);
  };

  return (
    <div className="bg-[#1e293b] rounded-[2.5rem] p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden group">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-8">
        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Gamification Zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2">
          <Cpu className="w-8 h-8 text-indigo-400" />
          ห้องปฏิบัติการจัดรูปโครงสร้างรหัสเทียม (Refactoring Studio)
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-sm">
          ร่วมรับบทบาทวิศวกรปัดกวาดโค้ด จัดการรหัสเทียมที่ยุ่งเหยิง ไร้ระเบียบ และไม่มีหมายเหตุอธิบาย 
          ขยับเพิ่มระดับความสมบูรณ์และวัดคะแนนความน่าอ่าน (Readability Gauge) ให้เต็ม 100%!
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left column: Controls (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-5 flex-1 flex flex-col justify-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">
              REFACTOR CONTROLLERS
            </span>

            {/* Action Button 1 */}
            <button
              onClick={() => setIndented(!indented)}
              className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs transition-all active:scale-95 flex items-center justify-between border ${
                indented
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 shrink-0" />
                <span>1. จัดเยื้องย่อหน้า (Indentation)</span>
              </span>
              {indented && <Check className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Action Button 2 */}
            <button
              onClick={() => setCommented(!commented)}
              className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs transition-all active:scale-95 flex items-center justify-between border ${
                commented
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4 shrink-0" />
                <span>2. เพิ่มหมายเหตุ (Comments)</span>
              </span>
              {commented && <Check className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Action Button 3 */}
            <button
              onClick={() => setCapitalized(!capitalized)}
              className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs transition-all active:scale-95 flex items-center justify-between border ${
                capitalized
                  ? 'bg-cyan-600 border-cyan-500 text-slate-950 font-extrabold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 shrink-0" />
                <span>3. ตัวพิมพ์ใหญ่คีย์เวิร์ด (Keywords)</span>
              </span>
              {capitalized && <Check className="w-4 h-4 text-slate-950" />}
            </button>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button 
                onClick={handleResetRefactor}
                className="text-[9px] font-bold text-slate-500 hover:text-slate-400 underline cursor-pointer"
              >
                ล้างการปรับแต่งทั้งหมด
              </button>
            </div>
          </div>
        </div>

        {/* Middle column: Live Code Editor display (Span 5) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-inner">
          <div>
            <span className="block text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> refactor_playground.py
            </span>

            <div className="font-mono text-[10px] md:text-xs leading-loose text-slate-300 space-y-1.5">
              {rawCodeBlock.map((line, idx) => {
                const textLine = getRenderedCodeLine(line);
                const commentText = getCommentForLine(idx);
                return (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <span className="w-5 text-[8px] text-slate-600 text-right select-none font-bold mr-3 mt-0.5">{idx + 1}</span>
                      <span className="font-mono transition-all duration-300">{textLine}</span>
                    </div>
                    {commentText && (
                      <span className="text-[10px] text-emerald-400 font-bold font-mono transition-opacity duration-300 animate-fade-in md:ml-4">
                        {commentText}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Readability Gauge & Reward (Span 3) */}
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-inner items-center text-center">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 w-full text-left">
            READABILITY GAUGE
          </span>

          {/* Radial Progress Score Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center bg-slate-950 rounded-full border border-slate-800 shadow-2xl">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="54" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle 
                cx="72" 
                cy="72" 
                r="54" 
                stroke="#6366f1" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray="339.3"
                strokeDashoffset={339.3 - (339.3 * readabilityScore) / 100}
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white font-mono tracking-tighter">
                {readabilityScore}%
              </span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                ความอ่านง่าย
              </span>
            </div>
          </div>

          {/* Dynamic explanation and status rewards */}
          <div className="mt-6 w-full">
            {isSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-emerald-400 text-xs font-semibold animate-bounce mt-2 flex items-center justify-center gap-1.5">
                <Smile className="w-4 h-4 shrink-0" />
                <span>สุดยอด! รหัสเทียมระดับโปร</span>
              </div>
            ) : (
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-slate-400 text-[10px] leading-relaxed">
                {readabilityScore < 50 
                  ? 'รหัสค่อนข้างยุ่งเหยิง รบกวนสลับคำสั่งควบคุมเพื่อเริ่มเยื้องบล็อก' 
                  : 'ใกล้สำเร็จแล้ว! เติมคอมเมนต์หรือสับคำพิมพ์ใหญ่ให้สมบูรณ์'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN EXPORT COMPONENT
// ============================================================================

export default function py2_7() {
  const teacherTaskContent = `ให้นักเรียนเขียนอธิบายข้อดีของการจัดระเบียบโครงสร้างรหัสเทียม พร้อมทำการจัดรูปแบบรหัสเทียมต่อไปนี้ลงในสมุดบันทึก:

โจทย์รหัสเทียมที่ไม่มีการจัดรูปแบบ (Messy Code):
begin
total = 100
read order
if order >= 500 then
total = total * 0.95
print total
else
print "no discount"
end if
end

(ข้อปฏิบัติ: ปรับตัวแปรและโครงสร้างคำสั่งคีย์เวิร์ดให้เป็นตัวพิมพ์ใหญ่สากล, มีการเยื้องย่อหน้า (Indentation) แบ่งระดับบล็อกควบคุม และใส่คอมเมนต์คำอธิบายประกอบการทำงานให้เรียบร้อยครบถ้วน)`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-100 selection:text-indigo-900 relative">
      {/* Ambient backgrounds blur overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px] animate-pulse"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        {/* Layer 3 Cards Stack */}
        <IndentationCard />
        <CommentCard />
        <RefactoringStudio />

        {/* Layer 4 Handoff footer */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.7)" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
