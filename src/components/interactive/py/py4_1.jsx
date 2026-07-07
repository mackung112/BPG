import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { QuizEngine, AmbientBackdrop, PY4_BLOBS } from '../shared';
import { 
  Printer, 
  Code2, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  RefreshCw, 
  Sliders, 
  CornerDownRight, 
  Keyboard, 
  Info,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

// ============================================================================
// 1. CARD 1: 4.1.1 รูปแบบการใช้งานฟังก์ชัน print() (Basic Print)
// ============================================================================
const BasicPrintCard = () => {
  const [printType, setPrintType] = useState('string');
  const [isPlaying, setIsPlaying] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');

  const presets = {
    string: {
      code: 'print("สวัสดีคอมพิวเตอร์")',
      output: 'สวัสดีคอมพิวเตอร์',
      dataType: 'String (ข้อความ)',
      explanation: 'แสดงข้อความดิบ ต้องห่อหุ้มด้วยเครื่องหมายอัญประกาศคู่ (") หรือเครื่องหมายเดี่ยว (\') เสมอ เพื่อไม่ให้สับสนกับตัวแปร'
    },
    number: {
      code: 'print(2026)',
      output: '2026',
      dataType: 'Integer (จำนวนเต็ม)',
      explanation: 'แสดงผลตัวเลขจำนวนเต็มหรือตัวเลขทศนิยมโดยตรงโดยไม่ต้องมีอัญประกาศครอบ และนำไปคำนวณคณิตศาสตร์ได้'
    },
    boolean: {
      code: 'print(True)',
      output: 'True',
      dataType: 'Boolean (ค่าตรรกะ)',
      explanation: 'แสดงค่าตรรกะความจริง (True) หรือความเท็จ (False) ซึ่งตัวแรกสุดต้องเป็นตัวพิมพ์ใหญ่สะกดแบบภาษา Python'
    },
    expression: {
      code: 'print(100 - 25 * 3)',
      output: '25',
      dataType: 'Expression (นิพจน์คำนวณ)',
      explanation: 'ตัวแปลภาษาจะคำนวณคณิตศาสตร์ในวงเล็บตามหลักพีชคณิต (คูณก่อนแล้วค่อยลบ) จากนั้นจึงส่งค่าสุดท้ายไปพิมพ์ผลลัพธ์'
    }
  };

  const handleRun = () => {
    setIsPlaying(true);
    setConsoleOutput('กำลังรันคำสั่ง...');
    setTimeout(() => {
      setConsoleOutput(presets[printType].output);
      setIsPlaying(false);
    }, 500);
  };

  useEffect(() => {
    setConsoleOutput('');
  }, [printType]);

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full z-0 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Printer className="w-6 h-6 text-sky-500" /> รูปแบบการใช้งานฟังก์ชัน print() พื้นฐาน
          </h4>
        </div>
        
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          คำสั่งพื้นฐานที่สุดในการแสดงผลข้อมูลออกทางหน้าจอคอมพิวเตอร์คือ <code>print()</code> โดยเราสามารถป้อนข้อมูลหลากหลายประเภทลงในวงเล็บของฟังก์ชันได้โดยตรง
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Controls */}
          <div className="flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">ลองเลือกประเภทข้อมูลที่จะสั่งพิมพ์:</span>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {Object.keys(presets).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPrintType(type)}
                    className={`p-3 rounded-xl border text-left transition-all active:scale-98 ${
                      printType === type 
                        ? 'bg-sky-600 border-sky-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[10px] opacity-80 mb-0.5">{presets[type].dataType}</div>
                    <div className="font-mono text-[12.5px] font-bold truncate">
                      {presets[type].code}
                    </div>
                  </button>
                ))}
              </div>

              {/* Dynamic Info */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-[13px] leading-relaxed text-slate-600 flex gap-2">
                <Info className="w-5 h-5 shrink-0 text-sky-500 mt-0.5" />
                <div>
                  <strong className="block text-slate-800 mb-0.5">การทำงานของ Python:</strong>
                  {presets[printType].explanation}
                </div>
              </div>
            </div>

            <button
              onClick={handleRun}
              disabled={isPlaying}
              className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA] active:scale-98 rounded-xl font-bold py-3 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-indigo-200"
            >
              <Play className="w-4 h-4" /> ประมวลผลคำสั่ง (RUN)
            </button>
          </div>

          {/* Interactive Screen Output */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
                <span># python shell view</span>
                <span className="text-emerald-500">live script</span>
              </div>
              <code className="text-yellow-300 font-mono text-sm leading-relaxed block select-all py-2">
                <span className="text-indigo-400">print</span>({printType === 'string' ? <span className="text-emerald-400">"สวัสดีคอมพิวเตอร์"</span> : printType === 'number' ? <span className="text-orange-400">2026</span> : printType === 'boolean' ? <span className="text-purple-400">True</span> : <span className="text-slate-300">100 - 25 * 3</span>})
              </code>
            </div>

            <div className="mt-8">
              <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex items-center gap-1.5"><Terminal className="w-4 h-4 text-slate-500" /> Virtual Output Console</div>
              <div className="bg-black/60 rounded-xl p-4 min-h-[70px] flex items-center border border-slate-950 font-mono text-emerald-400 text-[14.5px] shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
                {isPlaying ? (
                  <span className="flex items-center gap-2 text-slate-400">
                    <RefreshCw className="w-4 h-4 animate-spin text-sky-400" /> คอมพิวเตอร์กำลังทำงาน...
                  </span>
                ) : consoleOutput ? (
                  <span className="animate-fade-in">&gt; {consoleOutput}</span>
                ) : (
                  <span className="text-slate-600 italic select-none">คลิกปุ่ม RUN ด้านซ้ายเพื่อสั่งพิมพ์ผลลัพธ์</span>
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
// 2. CARD 2: 4.1.2 การจัดรูปแบบสตริง (String Formatting และ f-string)
// ============================================================================
const FStringCard = () => {
  const [name, setName] = useState('แม็ค');
  const [score, setScore] = useState(85.452);
  const [precision, setPrecision] = useState('.2f');
  const [output, setOutput] = useState('');

  const formatValue = (val, spec) => {
    const num = parseFloat(val);
    if (isNaN(num)) return 'Error';
    if (spec === '.2f') return num.toFixed(2);
    if (spec === '.1f') return num.toFixed(1);
    if (spec === '.0f') return num.toFixed(0);
    return num.toString();
  };

  useEffect(() => {
    setOutput(`นักเรียน ${name} สอบได้คะแนน ${formatValue(score, precision)} คะแนน`);
  }, [name, score, precision]);

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-500" /> การจัดรูปแบบสตริงด้วย f-string และตัวปัดทศนิยม
          </h4>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          **f-string (Formatted String Literals)** คือรูปแบบการต่อตัวแปรเข้ากับข้อความที่มีประสิทธิภาพและอ่านง่ายที่สุด โดยการใส่ตัวอักษร <code>f</code> ข้างหน้าอัญประกาศ และระบุตัวปรับแก้ เช่น ทศนิยมผ่านตัวย่อ <code>{`:.2f`}</code>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Config column */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ปรับค่าตัวแปรจำลอง:</span>
            
            <div>
              <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">ชื่อนักเรียน (name):</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">คะแนนสอบ (score):</label>
              <input 
                type="number" 
                step="0.001"
                value={score} 
                onChange={(e) => setScore(parseFloat(e.target.value) || 0)} 
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-600 mb-2 uppercase tracking-wide">เลือกรหัสความแม่นยำทศนิยม (Precision):</label>
              <div className="flex gap-2">
                {[
                  { spec: '.2f', label: 'ทศนิยม 2 ตำแหน่ง (:.2f)', detail: 'ปัดเศษเหลือ 2 จุด' },
                  { spec: '.1f', label: 'ทศนิยม 1 ตำแหน่ง (:.1f)', detail: 'ปัดเศษเหลือ 1 จุด' },
                  { spec: '.0f', label: 'ไม่เอาทศนิยม (:.0f)', detail: 'ปัดเป็นจำนวนเต็ม' }
                ].map((item) => (
                  <button
                    key={item.spec}
                    onClick={() => setPrecision(item.spec)}
                    title={item.detail}
                    className={`flex-1 p-2.5 rounded-xl border text-[12px] font-mono font-bold transition-all active:scale-95 ${
                      precision === item.spec 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Screen output */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
                <span># f-string parser</span>
                <span className="text-indigo-400">compiling values</span>
              </div>
              <div className="font-mono text-xs md:text-sm leading-relaxed space-y-1.5">
                <div><span className="text-slate-500">name =</span> <span className="text-emerald-400">"{name}"</span></div>
                <div><span className="text-slate-500">score =</span> <span className="text-orange-400">{score}</span></div>
                <div className="pt-3 mt-3 border-t border-slate-800 text-[13.5px]">
                  <span className="text-indigo-400">print</span>(
                  <span className="text-emerald-400">f"นักเรียน <span className="text-yellow-300">{`{name}`}</span> สอบได้คะแนน <span className="text-yellow-300">{`{score:${precision}}`}</span> คะแนน"</span>
                  )
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-slate-500" /> Console printed result</div>
              <div className="bg-black/50 p-4 rounded-xl border border-slate-950 font-mono text-[14px] text-emerald-400 min-h-[60px] flex items-center shadow-inner">
                &gt; {output}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. CARD 3: 4.1.3 การใช้ escape characters ในสตริง (Escape Code)
// ============================================================================
const EscapeCodeCard = () => {
  const [inputText, setInputText] = useState('ภาษา\\nPython\\tสนุกมาก!');
  const [selectedKey, setSelectedKey] = useState(null);

  const keys = [
    { key: '\\n', desc: 'ขึ้นบรรทัดใหม่ (Newline)', example: 'Python\\nProgramming' },
    { key: '\\t', desc: 'แทรกย่อหน้า (Tab)', example: 'หัวข้อ\\tเนื้อหา' },
    { key: '\\\\', desc: 'พิมพ์เฉียงถอยหลัง (Backslash)', example: 'C:\\\\python_folder' },
    { key: '\\"', desc: 'แทรกเครื่องหมายอัญประกาศคู่ (Double quote)', example: 'ครูบอกว่า \\"ตั้งใจเรียน\\"' }
  ];

  const handleKeyClick = (item) => {
    setSelectedKey(item.key);
    setInputText(item.example);
  };

  const getParsedText = () => {
    return inputText
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '    ')
      .replace(/\\\\/g, '\\')
      .replace(/\\"/g, '"');
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-cyan-500" /> การใช้ Escape Characters รหัสควบคุมสตริงพิเศษ
          </h4>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          **Escape Characters** คือรหัสควบคุมพิเศษที่มีเครื่องหมายสแลชหงาย <code>\</code> (Backslash) นำหน้าอักขระ ใช้สั่งย่อหน้า ขึ้นบรรทัดใหม่ หรือหลบเครื่องหมายคำพูดไม่ให้โปรแกรม Error
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Controls */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">คลิกเพื่อลองดูลวดลาย Escape Code:</span>
            
            <div className="grid grid-cols-2 gap-3">
              {keys.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleKeyClick(item)}
                  className={`p-3 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between h-20 ${
                    inputText === item.example
                      ? 'bg-cyan-600 border-cyan-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono font-bold text-base">{item.key}</span>
                  <span className="text-[10px] opacity-80 leading-snug">{item.desc}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">พิมพ์ป้อนโค้ดทดสอบเอง:</label>
              <input 
                type="text" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-cyan-500"
              />
              <p className="text-slate-400 text-[11px] mt-1.5">ใช้ \n เพื่อแบ่งบรรทัด หรือ \t เพื่อจัดเว้นวรรค</p>
            </div>
          </div>

          {/* Interactive Screen output */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
                <span># raw vs escape render</span>
                <span className="text-cyan-400">system parse</span>
              </div>
              <div className="font-mono text-sm leading-relaxed">
                <span className="text-indigo-400">print</span>(<span className="text-emerald-400">"{inputText}"</span>)
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-slate-500" /> Console Screen Output</div>
              <pre className="bg-black/60 p-4 rounded-xl border border-slate-950 font-mono text-[14px] text-yellow-300 min-h-[100px] whitespace-pre-wrap leading-relaxed shadow-inner">
                {getParsedText()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. CARD 4: 4.1.4 การแสดงผลข้อมูลหลายประเภทพร้อมกัน (sep=)
// ============================================================================
const SepParameterCard = () => {
  const [separator, setSeparator] = useState(', ');
  const [customSep, setCustomSep] = useState('');

  const getActualSep = () => {
    if (separator === 'custom') return customSep;
    if (separator === '\\n') return '\n';
    return separator;
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-amber-500" /> การพิมพ์ข้อมูลหลายอาร์กิวเมนต์และการคั่นด้วย sep
          </h4>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          หากต้องการส่งข้อมูลหลายประเภทไปพิมพ์พร้อมกัน เราจะคั่นข้อมูลด้วยเครื่องหมายจุลภาค <code>,</code> โดยมีพารามิเตอร์คีย์เวิร์ดพิเศษ <code>sep="..."</code> คอยทำหน้าที่ควบคุมตัวคั่นระหว่างอักขระแต่ละชุด
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Controls */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">เลือกหรือปรับเปลี่ยนค่าคั่น (sep):</span>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: ', ', label: 'จุลภาคเว้นวรรค (", ")' },
                { val: ' -> ', label: 'ลูกศรชี้ (" -> ")' },
                { val: '\\n', label: 'ขึ้นบรรทัดใหม่ ("\\n")' },
                { val: 'custom', label: 'กำหนดรูปแบบเอง...' }
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setSeparator(item.val)}
                  className={`p-3 rounded-xl border text-left font-medium text-[13px] transition-all active:scale-95 ${
                    separator === item.val
                      ? 'bg-amber-600 border-amber-600 text-white font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {separator === 'custom' && (
              <div className="animate-fade-in">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">พิมพ์ตัวคั่นที่กำหนดเอง:</label>
                <input 
                  type="text"
                  placeholder="เช่น | หรือ === หรือ 🚀"
                  value={customSep}
                  onChange={(e) => setCustomSep(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Interactive Screen output */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
                <span># separator formatting</span>
                <span className="text-amber-400">multiple arguments</span>
              </div>
              <div className="font-mono text-sm leading-relaxed">
                <span className="text-indigo-400">print</span>(<span className="text-emerald-400">"ส้ม"</span>, <span className="text-emerald-400">"กล้วย"</span>, <span className="text-emerald-400">"มะพร้าว"</span>, <span className="text-orange-400">sep</span>=<span className="text-emerald-400">"{separator === 'custom' ? customSep : separator}"</span>)
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-slate-500" /> Console Screen Output</div>
              <div className="bg-black/60 p-4 rounded-xl border border-slate-950 font-mono text-[14px] text-emerald-400 min-h-[80px] whitespace-pre-wrap flex items-center shadow-inner">
                &gt; {['ส้ม', 'กล้วย', 'มะพร้าว'].join(getActualSep())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. CARD 5: 4.1.5 การแสดงผลข้อมูลในบรรทัดใหม่และเว้นวรรค (end=)
// ============================================================================
const EndParameterCard = () => {
  const [endChar, setEndChar] = useState('\\n');
  const [customEnd, setCustomEnd] = useState('');

  const getActualEnd = () => {
    if (endChar === 'custom') return customEnd;
    if (endChar === '\\n') return '\n';
    if (endChar === '\\t') return '\t';
    return endChar; // '' or ' '
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Section Badge & Title */}
        <div className="flex items-center gap-3 mb-6">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CornerDownRight className="w-6 h-6 text-sky-500" /> การพิมพ์ในบรรทัดเดียวกันด้วยพารามิเตอร์ end
          </h4>
        </div>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          โดยปกติ ทุกครั้งที่สั่ง <code>print()</code> ภาษา Python จะใส่ตัวอักษรขึ้นบรรทัดใหม่ <code>\n</code> มาท้ายคำสั่งเสมอ หากเราต้องการไม่ให้ขึ้นบรรทัดใหม่แต่ให้คำสั่งถัดไปแสดงผลต่อกันในแถวเดิม ให้ปรับแต่งผ่านพารามิเตอร์ <code>end="..."</code>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Controls */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">เลือกตัวลงท้ายบรรทัด (end):</span>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '\\n', label: 'ขึ้นบรรทัดใหม่ ("\\n")' },
                { val: '', label: 'พิมพ์ติดกันเลย ("")' },
                { val: ' | ', label: 'ขีดแบ่งแยก (" | ")' },
                { val: 'custom', label: 'กำหนดรหัสเอง...' }
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setEndChar(item.val)}
                  className={`p-3 rounded-xl border text-left font-medium text-[13px] transition-all active:scale-95 ${
                    endChar === item.val
                      ? 'bg-sky-600 border-sky-600 text-white font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {endChar === 'custom' && (
              <div className="animate-fade-in">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">พิมพ์ตัวปิดท้ายที่กำหนดเอง:</label>
                <input 
                  type="text"
                  placeholder="เช่น ... หรือ !!!"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Interactive Screen output */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
                <span># end line modifier</span>
                <span className="text-sky-400">consecutive executions</span>
              </div>
              <div className="font-mono text-sm leading-relaxed space-y-1.5">
                <div>
                  <span className="text-indigo-400">print</span>(<span className="text-emerald-400">"เรียนเขียนโปรแกรม"</span>, <span className="text-orange-400">end</span>=<span className="text-emerald-400">"{endChar === 'custom' ? customEnd : endChar}"</span>)
                </div>
                <div>
                  <span className="text-indigo-400">print</span>(<span className="text-emerald-400">"กับครูแม็ค"</span>)
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5"><Terminal className="w-4 h-4 text-slate-500" /> Console Screen Output</div>
              <div className="bg-black/60 p-4 rounded-xl border border-slate-950 font-mono text-[14.5px] text-emerald-400 min-h-[80px] whitespace-pre-wrap flex items-center shadow-inner">
                &gt; เรียนเขียนโปรแกรม{getActualEnd()}กับครูแม็ค
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================================
// 6. DATA: ข้อมูลด่านเกมสำหรับ QuizEngine — มินิเกมถอดรหัส print()
// ============================================================================
const PRINT_QUIZ_LEVELS = [
  {
    title: 'ภารกิจที่ 1: รายงานข้อมูลวันระบบ',
    desc: 'จงเชื่อมโยง วัน, เดือน, และปี ออกมาให้แสดงผลลัพธ์เป็นโครงสร้างวันที่คั่นด้วยขีดกลางดังนี้: 28-05-2026',
    target: '28-05-2026',
    code: 'print("28", "05", "2026", sep=?)',
    options: [
      { key: 'A', text: '"/"', isCorrect: false },
      { key: 'B', text: '"-"', isCorrect: true },
      { key: 'C', text: '":"', isCorrect: false },
      { key: 'D', text: '"" (ข้อความว่างเปล่า)', isCorrect: false },
    ],
    tip: 'ใช้สัญลักษณ์เครื่องหมายยัติภังค์ (-) ในการเว้นคั่นวันเดือนปี',
  },
  {
    title: 'ภารกิจที่ 2: พิมพ์เชื่อมแถวไม่สลับบรรทัด',
    desc: 'ต้องการแสดงผลข้อความยอดจ่ายเงินโดยคำสั่งสองชุด แต่ต้องการให้แสดงในบรรทัดเดียวกัน เช่น "Total: 150 บาท"',
    target: 'Total: 150 บาท',
    code: 'print("Total: ", end=?)\nprint("150 บาท")',
    options: [
      { key: 'A', text: '"\\n"', isCorrect: false },
      { key: 'B', text: '"\\t"', isCorrect: false },
      { key: 'C', text: '"" (ข้อความว่าง)', isCorrect: true },
      { key: 'D', text: '" | "', isCorrect: false },
    ],
    tip: 'การจัดแต่งให้แสดงบรรทัดเดียวกัน ให้กำหนดพารามิเตอร์ end เป็นสตริงว่างเปล่า ""',
  },
  {
    title: 'ภารกิจที่ 3: ปัดเศษราคาทศนิยมสินค้า',
    desc: 'ต้องการปัดราคาสินค้าจากตัวแปร price = 99.456 ให้พิมพ์ออกมาเป็นทศนิยม 2 ตำแหน่งเท่านั้น คือ "ราคา: 99.46 บาท"',
    target: 'ราคา: 99.46 บาท',
    code: 'price = 99.456\nprint(f"ราคา: {price:?} บาท")',
    options: [
      { key: 'A', text: '.2f', isCorrect: true },
      { key: 'B', text: '.1f', isCorrect: false },
      { key: 'C', text: '2f', isCorrect: false },
      { key: 'D', text: ':.2f', isCorrect: false },
    ],
    tip: 'ตัวย่อในการแปลงข้อมูลชนิดทศนิยม (Float) เป็น 2 ตำแหน่งคือ .2f',
  },
];

// ============================================================================
// 7. MAIN PAGE COMPONENT (Vertical Stack Layout)
// ============================================================================

export default function pyUnit4_1_PrintFunction() {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === '1122') {
      setIsUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const teacherTaskContent = `ใบงานกิจกรรม: ปฏิบัติการฟังก์ชันการแสดงผลคอมพิวเตอร์
ให้นักเรียนเปิดเครื่องมือพัฒนาโปรแกรม Python และเขียนคำสั่งเพื่อตอบโจทย์ทั้ง 20 ข้อดังต่อไปนี้:

1. โปรแกรมทักทายง่ายๆ (Simple Greeting)
   เขียนคำสั่งแสดงข้อความ "สวัสดีคอมพิวเตอร์ ยินดีที่ได้รู้จัก" ออกทางหน้าจอ
   - ตัวอย่างผลลัพธ์: สวัสดีคอมพิวเตอร์ ยินดีที่ได้รู้จัก

2. โปรแกรมแสดงประวัติส่วนตัว (Profile Printer)
   เขียนคำสั่งเพื่อพิมพ์ชื่อเล่น และอายุของคุณ โดยแบ่งเป็น 2 บรรทัดคนละคำสั่ง
   - ตัวอย่างผลลัพธ์:
     ชื่อเล่น: แม็ค
     อายุ: 18 ปี

3. โปรแกรมพิมพ์รูปทรงกล่อง (Box Shape Printer)
   ใช้สัญลักษณ์สี่เหลี่ยมหรือดวงดาว * ในการพิมพ์ออกมาเรียงกันเป็นกรอบสี่เหลี่ยมจัตุรัสขนาด 3x3
   - ตัวอย่างผลลัพธ์:
     ***
     * *
     ***

4. โปรแกรมที่อยู่ยาวชุดเดียว (Multiline Address String)
   พิมพ์ข้อมูลที่อยู่อาศัยของคุณแยกบรรทัดเป็น 3 บรรทัด โดยใช้ฟังก์ชัน print() เพียงคำสั่งเดียวเท่านั้น (ใช้ Escape Character \\n)
   - ตัวอย่างผลลัพธ์:
     บ้านเลขที่ 99/9
     ตำบลในเมือง อำเภอเมือง
     จังหวัดกรุงเทพฯ

5. โปรแกรมจัดคอลัมน์ข้อมูลประจำตัว (Column Tab Alignment)
   พิมพ์ข้อมูล ชื่อจริง, นามสกุล และรหัสประจำตัวของคุณ โดยแยกคอลัมน์ให้อยู่แนวเดียวกันด้วยแท็บอักขระ (\\t)
   - ตัวอย่างผลลัพธ์: ชื่อ: แม็ค   นามสกุล: ดีใจ   รหัส: 6999

6. โปรแกรมแสดงผลการคำนวณสด (Arithmetic Math Equation)
   เขียนคำสั่งเพื่อแสดงผลโจทย์สมการและคำตอบคณิตศาสตร์อย่างเป็นระเบียบ เช่น "100 + 200 = 300"
   - ตัวอย่างผลลัพธ์: 100 + 200 = 300

7. โปรแกรมพิมพ์ข้อความมีอัญประกาศ (Quotes Escaping)
   พิมพ์ข้อความภาษาไทยที่ต้องมีสัญลักษณ์เครื่องหมายคำพูดคู่ครอบคำพูด เช่น ครูแม็คพูดว่า "การเขียนโค้ดต้องหมั่นฝึกฝน" โดยไม่ทำให้ตัวแปรภาษาประมวลผลผิดพลาด
   - ตัวอย่างผลลัพธ์: ครูแม็คพูดว่า "การเขียนโค้ดต้องหมั่นฝึกฝน"

8. โปรแกรมแสดง Path โฟลเดอร์ Windows (Windows File Path Raw)
   พิมพ์ตำแหน่งไฟล์ของระบบ Windows เช่น C:\\python\\project\\main.py โดยป้องกันไม่ให้เครื่องหมาย \\ รวมตัวเป็น Escape Code (แนะนำใช้ \\\\ หรือ Raw String r"...")
   - ตัวอย่างผลลัพธ์: C:\\python\\project\\main.py

9. โปรแกรมประมวลผลทางคณิตศาสตร์ทันที (Direct Computation)
   ใช้ฟังก์ชัน print() พิมพ์ผลลัพธ์คำตอบทางคณิตศาสตร์สดจากนิพจน์ 150 * 4 ออกทางหน้าจอ (ห้ามส่งค่าเป็นสตริงตรงๆ)
   - ตัวอย่างผลลัพธ์: 600

10. โปรแกรมพิมพ์ตัวแปรด้วย f-string (Basic f-string)
    ประกาศตัวแปร subject = "Python" และ unit = 4 แล้วใช้ f-string พิมพ์ข้อความแสดงความยินดี
    - ตัวอย่างผลลัพธ์: กำลังเรียนวิชา Python หน่วยที่ 4

11. โปรแกรมปัดเศษทศนิยมค่าราคาสินค้า (Floating Price Precision)
    กำหนดตัวแปร price = 49.9753 แล้วใช้ f-string แสดงผลราคาสินค้าโดยทำการปัดเศษทศนิยมเหลือ 2 ตำแหน่ง
    - ตัวอย่างผลลัพธ์: ราคาสินค้าคือ 49.98 บาท

12. โปรแกรมจัดรูปแบบร้อยละเปอร์เซ็นต์ (Interest Rate Formatting)
    กำหนดตัวแปร rate = 0.0175 จากนั้นนำค่านี้คูณ 100 แล้วใช้ f-string ปัดทศนิยมให้พิมพ์ออกมาเป็น 1.8% ในประโยค
    - ตัวอย่างผลลัพธ์: อัตราดอกเบี้ยเฉลี่ย: 1.8%

13. โปรแกรมแสดงค่าตัวแปรหลายประเภทรวมกัน (Multi-Argument Output)
    กำหนดตัวแปร item_name = "สมุดบันทึก" และ quantity = 12 แล้วพิมพ์ประโยคต่อเนื่องโดยส่งอาร์กิวเมนต์คั่นจุลภาค , หลายตัวลงในวงเล็บ
    - ตัวอย่างผลลัพธ์: ฉันซื้อ สมุดบันทึก จำนวน 12 เล่ม

14. โปรแกรมสร้างรหัสสินค้าเชื่อมขีดกลาง (Separator Joined Code)
    ประกาศค่าข้อความ 3 ส่วน ได้แก่ "TH", "2026" และ "99" จากนั้นพิมพ์โดยใช้พารามิเตอร์ sep="-" เชื่อมคั่นกลาง
    - ตัวอย่างผลลัพธ์: TH-2026-99

15. โปรแกรมพิมพ์ข้อมูลแยกคนละแถว (Newline Separated Arguments)
    ส่งค่าผลไม้ 3 อาร์กิวเมนต์ ได้แก่ "ส้ม", "กล้วย", "มะพร้าว" และใช้คีย์เวิร์ด sep="\\n" ในการแยกบรรทัดแสดงผล
    - ตัวอย่างผลลัพธ์:
      ส้ม
      กล้วย
      มะพร้าว

16. โปรแกรมพิมพ์ท้ายประโยคแถวเดิม (Continuous Print Line)
    เขียนคำสั่ง print("ยอดรวมสุทธิ:") และคำสั่ง print("250 บาท") คนละแถวในโค้ด แต่กำหนดพารามิเตอร์ end=" " เพื่อให้พิมพ์ต่อเนื่องในบรรทัดเดียวกัน
    - ตัวอย่างผลลัพธ์: ยอดรวมสุทธิ: 250 บาท

17. โปรแกรมขยายเส้นขีดสำหรับแยกข้อมูล (Multiplier Separator Line)
    ใช้หลักการคูณสายอักขระ (String Multiplication) ในการสั่งพิมพ์สัญลักษณ์เครื่องหมายลบ - จำนวน 30 ตัวติดต่อกันเพื่อทำเส้นใต้คั่นหน้าจอ
    - ตัวอย่างผลลัพธ์: ------------------------------

18. โปรแกรมรายงานผลสอบและระดับคะแนน (Report Card Printer)
    ใช้ f-string ร่วมกับตัวแปร name = "สุรชัย" และ score = 92 เพื่อพิมพ์บันทึกแจ้งคะแนนสอบของนักเรียน
    - ตัวอย่างผลลัพธ์: นักเรียน สุรชัย สอบวิชาคอมพิวเตอร์ได้คะแนนเต็ม 92/100 คะแนน

19. โปรแกรมคำนวณสมการคูณแม่สอง (Multiplication Table Generator)
    พิมพ์สมการแม่สูตรคูณตั้งแต่ 2 x 1 = 2 ไปจนถึง 2 x 5 = 10 รวม 5 บรรทัด โดยในวงเล็บ f-string ให้ใส่สูตรนิพจน์คำนวณคณิตศาสตร์สด
    - ตัวอย่างผลลัพธ์:
      2 x 1 = 2
      2 x 2 = 4
      2 x 3 = 6
      2 x 4 = 8
      2 x 5 = 10

20. โปรแกรมสร้างรหัสลงท้ายมีสัญลักษณ์ความสำเร็จ (Custom Terminating Character)
    พิมพ์คำสั่ง print("ขั้นตอนสำเร็จ") โดยปรับปรุงค่าพารามิเตอร์ end="...🚀\\n" เพื่อแสดงผลสัญลักษณ์แบบมีระดับชั้นยอด
    - ตัวอย่างผลลัพธ์: ขั้นตอนสำเร็จ...🚀`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative">
      {/* Layer 1: Ambient Backdrop — shared component */}
      <AmbientBackdrop blobs={PY4_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        
        {/* CARD 1: 4.1.1 รูปแบบการใช้งานฟังก์ชัน print() */}
        <BasicPrintCard />

        {/* CARD 2: 4.1.2 การจัดรูปแบบสตริง (f-string) */}
        <FStringCard />

        {/* CARD 3: 4.1.3 การใช้ escape characters ในสตริง */}
        <EscapeCodeCard />

        {/* CARD 4: 4.1.4 การแสดงผลข้อมูลหลายประเภทพร้อมกัน (sep=) */}
        <SepParameterCard />

        {/* CARD 5: 4.1.5 การแสดงผลข้อมูลในบรรทัดใหม่และเว้นวรรค (end=) */}
        <EndParameterCard />

        {/* CARD 6: มินิเกมไขปริศนา — QuizEngine shared component */}
        <QuizEngine
          title="มินิเกม: ภารกิจถอดรหัส PRINT!"
          description="เลือกรหัสหรือพารามิเตอร์ที่ขาดหายไปเพื่อให้ชุดคำสั่งทำหน้าที่แสดงผลลัพธ์ออกตรงเป้าหมายสมบูรณ์แบบ"
          levels={PRINT_QUIZ_LEVELS}
          accentColor="from-indigo-500/20 to-sky-500/20"
          icon={<Printer className="w-8 h-8 text-indigo-400" />}
        />

        {/* Teacher Task footer */}
        {isUnlocked ? (
          <TeacherTask title="ใบงานบทเรียน 4.1" taskText={teacherTaskContent} />
        ) : (
          <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col items-center justify-center text-center shadow-xl">
              <div className="p-4 bg-blue-100 rounded-2xl text-blue-600 border border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-6 animate-pulse">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">เข้าถึงภารกิจสำหรับนักเรียน (Instructor Task)</h3>
              <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                กิจกรรมปฏิบัติการนี้ถูกจำกัดสิทธิ์เฉพาะในชั้นเรียน กรุณากรอกรหัสผ่าน 4 หลักที่ได้รับจากอาจารย์ผู้สอนเพื่อเข้าสู่แบบฝึกหัด
              </p>
              
              <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center items-center">
                <input 
                  type="password"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="ป้อนรหัสผ่าน 4 หลัก"
                  className={`h-[42px] w-full sm:w-48 text-center border rounded-xl font-mono text-lg tracking-widest focus:outline-none transition-all ${
                    passError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/12 bg-red-50' 
                      : 'border-slate-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/12 bg-white'
                  }`}
                />
                <button
                  type="submit"
                  className="h-[42px] w-full sm:w-auto px-6 bg-blue-600 text-white hover:bg-blue-500 active:scale-95 rounded-xl font-semibold cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  ถอดรหัสผ่าน
                </button>
              </form>
              
              {passError && (
                <p className="text-red-500 font-bold text-xs mt-3 animate-pulse">
                  ⚠️ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
