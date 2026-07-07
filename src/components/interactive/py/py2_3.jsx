import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  BookOpen, 
  Layers, 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeftRight, 
  Network, 
  Scale, 
  BrainCircuit, 
  Check, 
  X, 
  Bug,
  RefreshCw,
  Play,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

// ============================================================================
// 1. DYNAMIC DROPDOWN FOR BUILDER ZONE
// ============================================================================
const CustomSelect = ({ value, options, onChange, placeholder = "เลือก...", disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block mx-1 align-middle">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded-lg border font-mono font-bold text-xs transition-all active:scale-98 flex items-center gap-1 ${
          value 
            ? 'bg-purple-500/20 border-purple-400 text-purple-200 hover:bg-purple-500/35'
            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
        }`}
      >
        <span>{value || placeholder}</span>
        <span className="text-[8px] opacity-60">▼</span>
      </button>
      
      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 mt-1.5 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-50 animate-fade-in font-mono">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-purple-600 hover:text-white transition-colors block ${
                  value === opt ? 'text-purple-400 font-bold bg-purple-500/10' : 'text-slate-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================================================
// 2. CARD 1: 2.3.1 ความหมายและประโยชน์ของรหัสเทียม
// ============================================================================
const IntroCard = () => {
  const [activeStage, setActiveStage] = useState('pseudocode');

  const stages = {
    natural: {
      title: "ภาษาคน (Natural Language)",
      subtitle: "ความคิดตั้งต้นของมนุษย์",
      color: "from-pink-500 to-rose-500",
      bg: "bg-rose-50/50",
      border: "border-rose-200",
      text: "text-rose-700",
      desc: "ภาษาที่มนุษย์ใช้พูดสื่อสารกันปกติ เช่น 'ถ้านักเรียนได้คะแนน 50 แต้มขึ้นไป ให้สอบผ่าน ไม่อย่างนั้นก็ให้สอบตก' มีจุดเด่นคือทุกคนเข้าใจได้ในเสี้ยววินาที แต่มีข้อเสียสำคัญคือ 'ความคลุมเครือ ไม่เป็นระบบ' และคอมพิวเตอร์ไม่อาจประมวลผลได้ตรงประเด็น",
      analog: "เปรียบเสมือน: ไอเดียบ้านคร่าวๆ ที่คุณเล่าให้เพื่อนฟังด้วยปากเปล่า"
    },
    pseudocode: {
      title: "รหัสเทียม (Pseudocode)",
      subtitle: "สะพานเชื่อมสมองสู่เครื่องจักร",
      color: "from-indigo-500 to-purple-500",
      bg: "bg-indigo-50/50",
      border: "border-indigo-200",
      text: "text-indigo-700",
      desc: "การจำลองขั้นตอนแก้ปัญหาโดยใช้คำศัพท์ภาษาอังกฤษที่กระชับและมีโครงสร้างคล้ายกับรหัสโปรแกรมมิ่ง (เช่น IF, THEN, ELSE) แต่ปราศจากไวยากรณ์สัญลักษณ์ที่เข้มงวด ช่วยให้นักพัฒนาโฟกัสที่ความคิดเชิงตรรกะได้เต็มที่",
      analog: "เปรียบเสมือน: พิมพ์เขียวโครงสร้างบ้านที่สถาปนิกและช่างทุกคนอ่านเข้าใจสอดคล้องกัน"
    },
    code: {
      title: "โค้ดจริง (Real Program Code)",
      subtitle: "คำสั่งปลายทางที่รันได้จริง",
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50/50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      desc: "คำสั่งของภาษาโปรแกรมมิ่งจริง (เช่น Python) ที่คอมพิวเตอร์และอินเตอร์พรีเตอร์นำไปรันประมวลผลได้จริง จำเป็นต้องถูกต้องตามหลักไวยากรณ์ (Syntax) 100% ไร้การตกหล่นของเครื่องหมาย เครื่องหมายพังเพียงจุดเดียวก็รันไม่ได้",
      analog: "เปรียบเสมือน: บ้านจริงที่ลงมือก่อสร้างเสร็จเรียบร้อยพร้อมเข้าอยู่อาศัย"
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
          <BookOpen className="w-7 h-7 text-indigo-600" />
          ความหมายและประโยชน์ของรหัสเทียม
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-8">
          รหัสเทียม (Pseudocode) คือ "สะพานเชื่อมความคิด" ที่กระชับและยืดหยุ่น เพื่อออกแบบลอจิกโปรแกรมมิ่ง ลองคลิกเปรียบเทียบระดับความคิดด้านล่างนี้:
        </p>

        {/* Visual Bridge Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative">
          {Object.entries(stages).map(([key, stage]) => {
            const isActive = activeStage === key;
            return (
              <button
                key={key}
                onClick={() => setActiveStage(key)}
                className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 relative flex flex-col justify-between active:scale-98 ${
                  isActive
                    ? `bg-white ${stage.border} shadow-lg scale-105 z-10`
                    : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 opacity-80'
                }`}
              >
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${stage.color} mb-3 uppercase tracking-wider`}>
                    {stage.subtitle}
                  </span>
                  <h5 className="text-lg font-bold text-slate-800 mb-2">{stage.title}</h5>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                  <span>คลิกเปรียบเทียบความหมาย</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 ${stages[activeStage].bg} ${stages[activeStage].border}`}>
          <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-between">
            <div className="space-y-4 flex-1">
              <h5 className={`text-xl font-bold ${stages[activeStage].text} flex items-center gap-2`}>
                <Sparkles className="w-5 h-5 shrink-0" />
                {stages[activeStage].title}
              </h5>
              <p className="text-slate-700 leading-relaxed text-[15px]">
                {stages[activeStage].desc}
              </p>
              <div className="bg-white/80 rounded-xl px-4 py-3 border border-slate-200/50 text-xs md:text-sm italic font-medium text-slate-600">
                {stages[activeStage].analog}
              </div>
            </div>
            
            {/* Visual Code Preview Box */}
            <div className="shrink-0 lg:w-80 flex flex-col justify-center">
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-xs text-slate-300 shadow-inner">
                <div className="flex justify-between items-center text-slate-500 border-b border-slate-800 pb-2 mb-3">
                  <span className="uppercase text-[9px] font-bold tracking-widest">{activeStage} preview</span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
                {activeStage === 'natural' && (
                  <p className="text-rose-300 leading-relaxed text-[13px]">
                    ถ้านักเรียนทำคะแนนสอบได้ไม่ต่ำกว่า 50 คะแนน ก็แสดงว่าสอบผ่าน แต่ถ้าเกิดน้อยกว่านั้นก็แสดงว่าตก
                  </p>
                )}
                {activeStage === 'pseudocode' && (
                  <div className="space-y-1 text-[13px]">
                    <div><span className="text-purple-400 font-bold">BEGIN</span></div>
                    <div className="pl-4"><span className="text-blue-400 font-bold">READ</span> score</div>
                    <div className="pl-4"><span className="text-pink-400 font-bold">IF</span> score &gt;= 50 <span className="text-pink-400 font-bold">THEN</span></div>
                    <div className="pl-8"><span className="text-emerald-400 font-bold">PRINT</span> "Pass"</div>
                    <div className="pl-4"><span className="text-pink-400 font-bold">ELSE</span></div>
                    <div className="pl-8"><span className="text-emerald-400 font-bold">PRINT</span> "Fail"</div>
                    <div className="pl-4"><span className="text-pink-400 font-bold">END IF</span></div>
                    <div><span className="text-purple-400 font-bold">END</span></div>
                  </div>
                )}
                {activeStage === 'code' && (
                  <div className="space-y-1 text-[13px]">
                    <div>score = <span className="text-yellow-400">int</span>(<span className="text-yellow-400">input</span>(<span className="text-emerald-400">"Enter score: "</span>))</div>
                    <div><span className="text-orange-400 font-bold">if</span> score &gt;= <span className="text-cyan-400">50</span>:</div>
                    <div className="pl-4"><span className="text-yellow-400">print</span>(<span className="text-emerald-400">"Pass"</span>)</div>
                    <div><span className="text-orange-400 font-bold">else</span>:</div>
                    <div className="pl-4"><span className="text-yellow-400">print</span>(<span className="text-emerald-400">"Fail"</span>)</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Benefits Section */}
        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h5 className="font-bold text-indigo-900 text-lg mb-4 flex items-center gap-2">
            <BrainCircuit className="w-5.5 h-5.5 text-indigo-600 shrink-0" />
            ทำไมโปรแกรมเมอร์มืออาชีพต้องเขียนรหัสเทียมก่อนเสมอ?
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/70 p-4 rounded-xl border border-indigo-100/50 shadow-sm">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">✓</span>
              <strong className="block text-slate-800 text-[14px] mb-1">มุ่งเน้นไปที่การแก้ปัญหา (Logic)</strong>
              <p className="text-slate-600 text-xs leading-relaxed">ช่วยดึงสมาธิมาคิดกระบวนการคิดของระบบได้ครบถ้วน โดยไม่ต้องพะวงกับการลืมเครื่องหมายเซมิโคลอนหรือวงเล็บ</p>
            </div>
            <div className="bg-white/70 p-4 rounded-xl border border-indigo-100/50 shadow-sm">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">✓</span>
              <strong className="block text-slate-800 text-[14px] mb-1">ก้าวข้ามขอบเขตของภาษาโปรแกรม</strong>
              <p className="text-slate-600 text-xs leading-relaxed">สร้างระบบที่เป็นกลาง ไม่ว่าทีมงานจะถนัดเขียน Python, Java, JavaScript หรือ C++ ทุกคนก็สามารถอ่านเข้าใจลоจิกเดียวกันได้</p>
            </div>
            <div className="bg-white/70 p-4 rounded-xl border border-indigo-100/50 shadow-sm">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">✓</span>
              <strong className="block text-slate-800 text-[14px] mb-1">นำไปแปรรูปเป็นรหัสโค้ดได้ง่ายดาย</strong>
              <p className="text-slate-600 text-xs leading-relaxed">หากรหัสเทียมทำงานถูกต้อง การแปลงเป็นรหัสโค้ดจริงเพียงแค่พิมพ์คีย์เวิร์ดและสร้างตัวแปรให้ตรงตามรูปแบบภาษาคอมพิวเตอร์</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. CARD 2: 2.3.2 หลักการเขียนรหัสเทียมเบื้องต้น & Bug Hunter Game
// ============================================================================
const PrinciplesCard = () => {
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-bl-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
          <Layers className="w-7 h-7 text-purple-600" />
          หลักการเขียนรหัสเทียมเบื้องต้น
        </h4>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-8">
          แม้ว่ารหัสเทียมจะมีความเป็นกลาง แต่เพื่อให้อัลกอริทึมมีความเป็นระเบียบ จึงมีข้อปฏิบัติสากล 4 ประการที่ควรยึดถือ:
        </p>

        {/* 4 Conventions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              num: "1",
              title: "คีย์เวิร์ดภาษาอังกฤษตัวพิมพ์ใหญ่",
              desc: "นิยมใช้ตัวพิมพ์ใหญ่เพื่อดึงดูดสายตาและแยกคำสั่งออกจากชื่อตัวแปร เช่น READ, PRINT, PROCESS, IF, WHILE",
              badge: "READ / PRINT / IF"
            },
            {
              num: "2",
              title: "หนึ่งบรรทัดมีเพียงหนึ่งคำสั่ง",
              desc: "เขียนคำสั่งแยกบรรทัดอย่างเป็นลำดับจากบนลงล่าง เพื่อควบคุมขั้นตอนการไหลของข้อมูลให้ง่ายต่อการติดตามทีละเฟส",
              badge: "One Step / Line"
            },
            {
              num: "3",
              title: "ครอบเขตเริ่มต้นด้วย BEGIN และจบด้วย END",
              desc: "ระบุจุดเริ่มโปรแกรมด้วย BEGIN และจุดสิ้นสุดด้วย END เพื่อสร้างขอบเขตงานอัลกอริทึมที่ถูกต้องชัดเจน",
              badge: "BEGIN ... END"
            },
            {
              num: "4",
              title: "ย่อหน้าย่อย (Indentation) บ่งชี้บล็อก",
              desc: "เคาะย่อหน้าสำหรับคำสั่งย่อยในโครงสร้างควบคุมหรือวนซ้ำ เพื่อให้ง่ายต่อการสังเกตกลุ่มบล็อกเดียวกัน",
              badge: "Indentation"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/80 hover:border-purple-300 p-5 rounded-2xl transition-all flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mb-4">
                  {item.num}
                </span>
                <h5 className="font-bold text-slate-800 text-[15px] mb-2">{item.title}</h5>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
              <span className="mt-4 inline-block bg-white text-purple-600 border border-purple-100 font-mono text-[10px] px-2.5 py-1 rounded-lg self-start">
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Mini Game: Bad Code Fixer */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-inner">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left side: Bad Code */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest inline-block mb-3">
                  <Bug className="w-3.5 h-3.5 inline mr-1" /> รหัสเทียมที่สับสน (Unformatted)
                </span>
                <h5 className="text-white font-bold text-lg mb-2">โค้ดผสมปนเปและอ่านยาก</h5>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  การผสมผสานภาษาคน ไม่มีตัวระบุขอบเขตเริ่ม-จบ และไม่มีย่อหน้า ทำให้ยากต่อการมองภาพรวมลอจิกและทำงานต่อ
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-[13px] text-rose-300 leading-loose min-h-[170px]">
                {!isFixed ? (
                  <div className="space-y-1 font-mono">
                    <div className="flex items-center gap-2"><span className="text-rose-500">✗</span> พิมพ์คำชี้แนะ "ใส่ยอดเงินฝาก: "</div>
                    <div className="flex items-center gap-2"><span className="text-rose-500">✗</span> โหลดข้อมูลเข้าสู่ตัวแปร deposit</div>
                    <div className="flex items-center gap-2"><span className="text-rose-500">✗</span> ถ้ายอด deposit มากกว่าแสน คู่อัตราดอกเบี้ย 0.05 แล้วเก็บไว้ใน interest</div>
                    <div className="flex items-center gap-2"><span className="text-rose-500">✗</span> พิมพ์คำบอกดอกเบี้ยที่ได้ interest ออกหน้าจอ</div>
                  </div>
                ) : (
                  <div className="space-y-1 opacity-25 select-none font-mono">
                    <div>พิมพ์คำชี้แนะ "ใส่ยอดเงินฝาก: "</div>
                    <div>โหลดข้อมูลเข้าสู่ตัวแปร deposit</div>
                    <div>ถ้ายอด deposit มากกว่าแสน คู่อัตราดอกเบี้ย 0.05 แล้วเก็บไว้ใน interest</div>
                    <div>พิมพ์คำบอกดอกเบี้ยที่ได้ interest ออกหน้าจอ</div>
                  </div>
                )}
              </div>
            </div>

            {/* Action trigger button */}
            <div className="flex items-center justify-center shrink-0">
              <button
                onClick={() => setIsFixed(!isFixed)}
                className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-md flex flex-col items-center gap-2.5 ${
                  isFixed
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                }`}
              >
                <RefreshCw className={`w-5 h-5 ${!isFixed ? 'animate-spin-slow' : 'rotate-180 transition-transform duration-300'}`} />
                <span>{isFixed ? 'รีเซ็ตข้อมูล' : 'จัดฟอร์แมตตามหลักสากล'}</span>
              </button>
            </div>

            {/* Right side: Fixed Code */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest inline-block mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> ปรับปรุงเสร็จสิ้น (Standardized)
                </span>
                <h5 className="text-white font-bold text-lg mb-2">ลื่นไหลตามระเบียบสากล</h5>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  ใช้คำสั่งภาษาอังกฤษพิมพ์ใหญ่ มี BEGIN-END คอนโทรลเงื่อนไข และย่อหน้าแบ่งบล็อกคำสั่งย่อยอย่างมืออาชีพ
                </p>
              </div>

              <div className={`bg-slate-950 p-5 rounded-xl border font-mono text-[13px] leading-loose min-h-[170px] transition-all duration-500 ${
                isFixed ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] text-emerald-300 animate-pulse' : 'border-slate-800 text-slate-600 opacity-40'
              }`}>
                {isFixed ? (
                  <div className="space-y-1">
                    <div><span className="text-purple-400 font-bold">BEGIN</span></div>
                    <div className="pl-4"><span className="text-blue-400 font-bold">PRINT</span> "Enter deposit amount: "</div>
                    <div className="pl-4"><span className="text-blue-400 font-bold">READ</span> deposit</div>
                    <div className="pl-4"><span className="text-pink-400 font-bold">IF</span> deposit &gt; 100000 <span className="text-pink-400 font-bold">THEN</span></div>
                    <div className="pl-8">interest = deposit * 0.05</div>
                    <div className="pl-8"><span className="text-blue-400 font-bold">PRINT</span> interest</div>
                    <div className="pl-4"><span className="text-pink-400 font-bold">END IF</span></div>
                    <div><span className="text-purple-400 font-bold">END</span></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 italic text-xs select-none">
                    กดคลิกปุ่มกลางจอภาพเพื่อสั่งจัดกระบวนระเบียบรหัสเทียม
                  </div>
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
// 4. CARD 3: ห้องปฏิบัติการสร้างรหัสเทียม (Interactive Pseudocode Lab & Simulator)
// ============================================================================
const PseudocodeLabSimulator = () => {
  const [level, setLevel] = useState(1);
  const [answers, setAnswers] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null
  });
  
  // Simulation control state
  const [runnerStep, setRunnerStep] = useState(-1);
  const [isRunnerPlaying, setIsRunnerPlaying] = useState(false);
  const [trace, setTrace] = useState([]);
  const [hasCompletedLevels, setHasCompletedLevels] = useState({
    1: false,
    2: false,
    3: false
  });
  
  // Custom inputs for running tests
  const [testInputs, setTestInputs] = useState({
    score: '75',
    price: '400',
    qty: '3'
  });

  const levelsConfig = {
    1: {
      title: "ระบบคัดแยกผลการเรียน (Grade Evaluator)",
      desc: "เป้าหมาย: หากคะแนนที่รับเข้ามา (score) มีค่าตั้งแต่ 50 แต้มขึ้นไป ให้พิมพ์คำว่า 'Pass' หากไม่สอดคล้องให้แสดงคำว่า 'Fail' ปิดท้ายอัลกอริทึมตามหลักการ",
      slots: {
        slot1: { options: ["IF", "WHILE", "FOR", "READ"], placeholder: "เงื่อนไขเริ่มต้น" },
        slot2: { options: ["THEN", "ELSE", "DO", "END"], placeholder: "ผลการตรวจสอบ" },
        slot3: { options: ["ELSE", "THEN", "ELIF", "END"], placeholder: "เงื่อนไขสลับ" },
        slot4: { options: ["END IF", "END WHILE", "END", "ELSE"], placeholder: "สิ้นสุดเงื่อนไข" }
      },
      inputsDesc: "กำหนดคะแนนทดสอบ:",
      inputKey: "score",
      inputMin: 0,
      inputMax: 100,
      lines: (ans, activeIdx, disabled) => [
        { code: "BEGIN", indent: 0 },
        { code: "READ score", indent: 1 },
        { 
          code: (
            <span>
              <CustomSelect value={ans.slot1} options={levelsConfig[1].slots.slot1.options} placeholder={levelsConfig[1].slots.slot1.placeholder} onChange={(val) => handleAnswerChange('slot1', val)} disabled={disabled} />
              {" score >= 50 "}
              <CustomSelect value={ans.slot2} options={levelsConfig[1].slots.slot2.options} placeholder={levelsConfig[1].slots.slot2.placeholder} onChange={(val) => handleAnswerChange('slot2', val)} disabled={disabled} />
            </span>
          ),
          indent: 1 
        },
        { code: 'PRINT "Pass"', indent: 2 },
        { 
          code: (
            <CustomSelect value={ans.slot3} options={levelsConfig[1].slots.slot3.options} placeholder={levelsConfig[1].slots.slot3.placeholder} onChange={(val) => handleAnswerChange('slot3', val)} disabled={disabled} />
          ),
          indent: 1 
        },
        { code: 'PRINT "Fail"', indent: 2 },
        { 
          code: (
            <CustomSelect value={ans.slot4} options={levelsConfig[1].slots.slot4.options} placeholder={levelsConfig[1].slots.slot4.placeholder} onChange={(val) => handleAnswerChange('slot4', val)} disabled={disabled} />
          ),
          indent: 1 
        },
        { code: "END", indent: 0 }
      ]
    },
    2: {
      title: "ระบบคำนวณส่วนลดอัจฉริยะ (Cashier Discount)",
      desc: "เป้าหมาย: รับราคาสินค้าและจำนวน (price, qty) คำนวณเป็นยอดรวม (total) ถ้ายอดรวมตั้งแต่ 1000 บาทขึ้นไป จะปรับลดเงิน 10% (คูณ 0.9) และแสดงผลลัพธ์ลงจอ",
      slots: {
        slot1: { options: ["IF", "WHILE", "FOR", "READ"], placeholder: "เงื่อนไข" },
        slot2: { options: ["THEN", "DO", "ELSE", "END"], placeholder: "ผลเงื่อนไข" },
        slot3: { options: ["END IF", "END WHILE", "ELSE", "END"], placeholder: "ปิดเงื่อนไข" }
      },
      inputsDesc: "กำหนด ราคาสินค้า และ จำนวนสินค้า:",
      inputKey1: "price",
      inputKey2: "qty",
      lines: (ans, activeIdx, disabled) => [
        { code: "BEGIN", indent: 0 },
        { code: "READ price, qty", indent: 1 },
        { code: "total = price * qty", indent: 1 },
        { 
          code: (
            <span>
              <CustomSelect value={ans.slot1} options={levelsConfig[2].slots.slot1.options} placeholder={levelsConfig[2].slots.slot1.placeholder} onChange={(val) => handleAnswerChange('slot1', val)} disabled={disabled} />
              {" total >= 1000 "}
              <CustomSelect value={ans.slot2} options={levelsConfig[2].slots.slot2.options} placeholder={levelsConfig[2].slots.slot2.placeholder} onChange={(val) => handleAnswerChange('slot2', val)} disabled={disabled} />
            </span>
          ),
          indent: 1
        },
        { code: "total = total * 0.9", indent: 2 },
        { 
          code: (
            <CustomSelect value={ans.slot3} options={levelsConfig[2].slots.slot3.options} placeholder={levelsConfig[2].slots.slot3.placeholder} onChange={(val) => handleAnswerChange('slot3', val)} disabled={disabled} />
          ),
          indent: 1 
        },
        { code: "PRINT total", indent: 1 },
        { code: "END", indent: 0 }
      ]
    },
    3: {
      title: "ระบบลูปประมวลผลเพิ่มจำนวนรอบ (While Loop Count)",
      desc: "เป้าหมาย: ประกาศเริ่มต้น counter = 0 ทำการทำงานซ้ำในขณะที่ตัวเลข counter ยังคงน้อยกว่า 3 รอบ เพื่อพิมพ์ตัวคัดกรอง counter เพิ่มขึ้นรอบละ 1",
      slots: {
        slot1: { options: ["WHILE", "IF", "FOR", "REPEAT"], placeholder: "วนซ้ำแบบ" },
        slot2: { options: ["DO", "THEN", "ELSE", "UNTIL"], placeholder: "ทำงานลูป" },
        slot3: { options: ["END WHILE", "END IF", "END FOR", "END"], placeholder: "ปิดขอบเขตลูป" }
      },
      inputsDesc: "ลูประบบรันโดยตรง (ไม่ต้องกำหนดค่าอินพุต):",
      lines: (ans, activeIdx, disabled) => [
        { code: "BEGIN", indent: 0 },
        { code: "counter = 0", indent: 1 },
        { 
          code: (
            <span>
              <CustomSelect value={ans.slot1} options={levelsConfig[3].slots.slot1.options} placeholder={levelsConfig[3].slots.slot1.placeholder} onChange={(val) => handleAnswerChange('slot1', val)} disabled={disabled} />
              {" counter < 3 "}
              <CustomSelect value={ans.slot2} options={levelsConfig[3].slots.slot2.options} placeholder={levelsConfig[3].slots.slot2.placeholder} onChange={(val) => handleAnswerChange('slot2', val)} disabled={disabled} />
            </span>
          ),
          indent: 1
        },
        { code: "counter = counter + 1", indent: 2 },
        { code: "PRINT counter", indent: 2 },
        { 
          code: (
            <CustomSelect value={ans.slot3} options={levelsConfig[3].slots.slot3.options} placeholder={levelsConfig[3].slots.slot3.placeholder} onChange={(val) => handleAnswerChange('slot3', val)} disabled={disabled} />
          ),
          indent: 1 
        },
        { code: "END", indent: 0 }
      ]
    }
  };

  const handleAnswerChange = (slotKey, value) => {
    setAnswers(prev => ({
      ...prev,
      [slotKey]: value
    }));
  };

  // Switch between challenges
  const switchLevel = (lvl) => {
    setLevel(lvl);
    setAnswers({ slot1: null, slot2: null, slot3: null, slot4: null });
    setRunnerStep(-1);
    setIsRunnerPlaying(false);
    setTrace([]);
  };

  // Compile trace logic dynamically
  const compilePseudocodeTrace = () => {
    const computedTrace = generateExecutionTrace(level, answers, testInputs);
    setTrace(computedTrace);
    return computedTrace;
  };

  // Run the simulation line by line
  const startSimulation = () => {
    const slotsCount = Object.keys(levelsConfig[level].slots).length;
    const filledCount = Object.entries(answers).filter(([k, v]) => k.startsWith('slot') && k.slice(4) <= slotsCount && v !== null).length;
    
    if (filledCount < slotsCount) {
      alert("กรุณาเลือกคีย์เวิร์ดในกล่อง dropdown ให้ครบทุกช่องก่อนเริ่มประมวลผลอัลกอริทึม!");
      return;
    }

    const computedTrace = compilePseudocodeTrace();
    setRunnerStep(0);
    setIsRunnerPlaying(true);
  };

  const resetSimulation = () => {
    setRunnerStep(-1);
    setIsRunnerPlaying(false);
    setTrace([]);
  };

  // Runner clock cycle
  useEffect(() => {
    let timer;
    if (isRunnerPlaying && runnerStep >= 0 && runnerStep < trace.length - 1) {
      timer = setTimeout(() => {
        const nextStep = runnerStep + 1;
        setRunnerStep(nextStep);
        
        if (trace[nextStep]?.isError) {
          setIsRunnerPlaying(false);
        }
      }, 1000);
    } else if (isRunnerPlaying && runnerStep === trace.length - 1) {
      setIsRunnerPlaying(false);
      const hasError = trace.some(t => t.isError);
      if (!hasError) {
        setHasCompletedLevels(prev => ({
          ...prev,
          [level]: true
        }));
      }
    }
    return () => clearTimeout(timer);
  }, [isRunnerPlaying, runnerStep, trace]);

  // Derived state from trace
  const currentStepData = runnerStep >= 0 ? trace[runnerStep] : null;
  const activeLine = currentStepData !== null ? currentStepData.line : -1;
  const activeRam = currentStepData !== null ? currentStepData.ram : {};
  const activeConsole = currentStepData !== null ? currentStepData.console : [];
  const currentExplanation = currentStepData !== null ? currentStepData.explain : "พร้อมทำการเริ่มประมวลผลลอจิกจำลอง";
  const currentErrorState = currentStepData !== null ? currentStepData.isError : false;

  const currentLevelObj = levelsConfig[level];
  const renderedLines = currentLevelObj.lines(answers, activeLine, isRunnerPlaying);

  return (
    <div className="bg-[#1e293b] rounded-[2.5rem] p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden group">
      {/* Glow Layer */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-8">
        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Gamification Zone
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2">
          <Terminal className="w-8 h-8 text-purple-400" />
          ห้องปฏิบัติการรหัสเทียม (Pseudocode Lab & Simulator)
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-sm md:text-[15px]">
          สวมบทบาทนักเขียนสคริปต์ขั้นตอนประกอบคีย์เวิร์ดที่หายไปลงในช่องว่าง เพื่อสร้างอัลกอริทึมที่ถูกต้องและกดทดสอบการรันประมวลผลจริง!
        </p>
      </div>

      {/* Level Selection Tabs */}
      <div className="relative z-10 flex justify-center gap-3 mb-8">
        {[1, 2, 3].map((lvl) => (
          <button
            key={lvl}
            onClick={() => switchLevel(lvl)}
            disabled={isRunnerPlaying}
            className={`px-5 py-3 rounded-2xl font-bold text-xs md:text-sm transition-all active:scale-98 flex items-center gap-2 ${
              level === lvl 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <span>ด่าน {lvl}: {lvl === 1 ? "ระดับเบื้องต้น" : lvl === 2 ? "ระบบคำนวณ" : "วนลูปซ้ำ"}</span>
            {hasCompletedLevels[lvl] && (
              <span className="bg-emerald-500 text-white rounded-full p-0.5"><Check className="w-3 h-3" /></span>
            )}
          </button>
        ))}
      </div>

      {/* Lab Interface Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Code Editor Workspace (Span 7) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-inner">
          <div>
            <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-3 mb-4">
              <span className="flex items-center gap-1.5"><Code2 className="w-4 h-4 text-purple-400" /> workspace_pseudocode.txt</span>
              <span className="text-purple-400">interactive ide v1.0</span>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-loose text-slate-300 min-h-[300px]">
              {renderedLines.map((line, idx) => {
                const isLineActive = activeLine === idx;
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start rounded px-2 transition-all ${
                      isLineActive 
                        ? currentErrorState 
                          ? 'bg-rose-900/30 border-l-4 border-rose-500 pl-1 text-rose-200'
                          : 'bg-purple-500/20 border-l-4 border-purple-500 pl-1 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.1)]'
                        : 'border-l-4 border-transparent'
                    }`}
                  >
                    <span className="w-6 text-[10px] text-slate-600 text-right select-none font-bold mr-4 mt-0.5">
                      {idx + 1}
                    </span>
                    <span 
                      style={{ paddingLeft: `${line.indent * 24}px` }}
                      className="font-mono text-xs md:text-sm inline-block leading-relaxed"
                    >
                      {line.code}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Input Controllers */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {currentLevelObj.inputsDesc}
            </span>
            
            <div className="flex flex-wrap gap-4 items-center">
              {level === 1 && (
                <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 w-full md:w-auto">
                  <span className="text-xs text-slate-400 font-mono">score = </span>
                  <input 
                    type="number"
                    value={testInputs.score}
                    onChange={(e) => setTestInputs(prev => ({ ...prev, score: e.target.value }))}
                    disabled={isRunnerPlaying}
                    min={0}
                    max={100}
                    className="bg-transparent border-b border-purple-500 outline-none text-white font-mono text-sm w-16 text-center"
                  />
                  <span className="text-[10px] text-slate-500 italic">(0 - 100)</span>
                </div>
              )}

              {level === 2 && (
                <div className="flex flex-wrap gap-4 w-full">
                  <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex-1 min-w-[120px]">
                    <span className="text-xs text-slate-400 font-mono">price = </span>
                    <input 
                      type="number"
                      value={testInputs.price}
                      onChange={(e) => setTestInputs(prev => ({ ...prev, price: e.target.value }))}
                      disabled={isRunnerPlaying}
                      className="bg-transparent border-b border-purple-500 outline-none text-white font-mono text-sm w-16 text-center"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex-1 min-w-[120px]">
                    <span className="text-xs text-slate-400 font-mono">qty = </span>
                    <input 
                      type="number"
                      value={testInputs.qty}
                      onChange={(e) => setTestInputs(prev => ({ ...prev, qty: e.target.value }))}
                      disabled={isRunnerPlaying}
                      className="bg-transparent border-b border-purple-500 outline-none text-white font-mono text-sm w-16 text-center"
                    />
                  </div>
                </div>
              )}
              
              {level === 3 && (
                <span className="text-xs text-slate-500 italic">ทำงานจำลองวนลูปอัตโนมัติด้วยตัวแปร counter ใน RAM 3 รอบ</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Inspector & Execution Console (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between items-stretch">
          
          {/* Top Panel: Variable RAM Memory Inspector */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-inner flex flex-col justify-between flex-1">
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400 animate-pulse" /> ตรวจสอบหน่วยความจำ (Variable RAM)
              </span>

              <div className="space-y-3 font-mono text-xs">
                {level === 1 && (
                  <div className={`p-3 rounded-xl border transition-all ${
                    activeRam.hasOwnProperty('score') ? 'bg-slate-950 border-purple-500 shadow-md text-purple-200' : 'bg-slate-950/40 border-slate-800 opacity-40 text-slate-500'
                  }`}>
                    <div className="text-[9px] uppercase font-bold tracking-wider">ตัวแปร: score</div>
                    <div className="font-bold text-sm mt-1">{activeRam.hasOwnProperty('score') ? activeRam.score : 'Null'}</div>
                    {activeRam.hasOwnProperty('score') && <div className="text-[8px] text-purple-400 mt-0.5">ประเภท: INTEGER</div>}
                  </div>
                )}

                {level === 2 && (
                  <>
                    <div className={`p-3 rounded-xl border transition-all ${
                      activeRam.hasOwnProperty('price') ? 'bg-slate-950 border-purple-500 shadow-md text-purple-200' : 'bg-slate-950/40 border-slate-800 opacity-40 text-slate-500'
                    }`}>
                      <div className="text-[9px] uppercase font-bold tracking-wider">ตัวแปร: price</div>
                      <div className="font-bold text-sm mt-1">{activeRam.hasOwnProperty('price') ? activeRam.price : 'Null'}</div>
                      {activeRam.hasOwnProperty('price') && <div className="text-[8px] text-purple-400 mt-0.5">ประเภท: INTEGER</div>}
                    </div>
                    
                    <div className={`p-3 rounded-xl border transition-all ${
                      activeRam.hasOwnProperty('qty') ? 'bg-slate-950 border-purple-500 shadow-md text-purple-200' : 'bg-slate-950/40 border-slate-800 opacity-40 text-slate-500'
                    }`}>
                      <div className="text-[9px] uppercase font-bold tracking-wider">ตัวแปร: qty</div>
                      <div className="font-bold text-sm mt-1">{activeRam.hasOwnProperty('qty') ? activeRam.qty : 'Null'}</div>
                      {activeRam.hasOwnProperty('qty') && <div className="text-[8px] text-purple-400 mt-0.5">ประเภท: INTEGER</div>}
                    </div>

                    <div className={`p-3 rounded-xl border transition-all ${
                      activeRam.hasOwnProperty('total') ? 'bg-slate-950 border-emerald-500 shadow-md text-emerald-200 scale-102' : 'bg-slate-950/40 border-slate-800 opacity-40 text-slate-500'
                    }`}>
                      <div className="text-[9px] uppercase font-bold tracking-wider">ตัวแปร: total</div>
                      <div className="font-bold text-sm mt-1">{activeRam.hasOwnProperty('total') ? activeRam.total : 'Null'}</div>
                      {activeRam.hasOwnProperty('total') && <div className="text-[8px] text-emerald-400 mt-0.5">ประเภท: PROCESS RESULT</div>}
                    </div>
                  </>
                )}

                {level === 3 && (
                  <div className={`p-3 rounded-xl border transition-all ${
                    activeRam.hasOwnProperty('counter') ? 'bg-slate-950 border-purple-500 shadow-md text-purple-200' : 'bg-slate-950/40 border-slate-800 opacity-40 text-slate-500'
                  }`}>
                    <div className="text-[9px] uppercase font-bold tracking-wider">ตัวแปรวนซ้ำ: counter</div>
                    <div className="font-bold text-sm mt-1">{activeRam.hasOwnProperty('counter') ? activeRam.counter : 'Null'}</div>
                    {activeRam.hasOwnProperty('counter') && <div className="text-[8px] text-purple-400 mt-0.5">ประเภท: COUNTER INTEGER</div>}
                  </div>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-xs leading-relaxed mt-4 flex gap-2.5 transition-all ${
              currentErrorState
                ? 'bg-rose-950/30 border-rose-800/80 text-rose-300 shadow-md'
                : 'bg-slate-950/80 border-slate-800 text-slate-300'
            }`}>
              {currentErrorState ? (
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5 animate-bounce" />
              ) : (
                <Info className="w-5 h-5 shrink-0 text-purple-400 mt-0.5" />
              )}
              <div>
                <strong className={`block text-xs mb-0.5 ${currentErrorState ? 'text-rose-400' : 'text-purple-300'}`}>
                  {currentErrorState ? 'พบข้อผิดพลาดไวยากรณ์' : 'ลอจิกการทำงานขณะนี้:'}
                </strong>
                {currentExplanation}
              </div>
            </div>
          </div>

          {/* Bottom Panel: Screen Output Console */}
          <div className="bg-slate-950 rounded-3xl p-5 border border-slate-900 shadow-inner min-h-[170px] flex flex-col justify-between">
            <div>
              <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-900 pb-2 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-600" /> หน้าจอกล่องแสดงผล (Console Screen)
              </span>

              <div className="font-mono text-sm leading-relaxed min-h-[60px] flex flex-col justify-center gap-1.5">
                {activeConsole.length === 0 ? (
                  <span className="text-slate-600 italic text-xs select-none text-center block w-full py-4">
                    [ ไม่มีผลลัพธ์แสดงออกจอ ]
                  </span>
                ) : (
                  activeConsole.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold shadow-inner ${
                        item.includes('Syntax Error') 
                          ? 'bg-rose-950/60 border border-rose-800 text-rose-400' 
                          : 'bg-slate-900 border border-slate-800 text-emerald-400'
                      }`}
                    >
                      &gt; {item}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Run and Control Panel */}
            <div className="mt-4 flex gap-3">
              {runnerStep === -1 ? (
                <button
                  onClick={startSimulation}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-6 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 text-xs md:text-sm"
                >
                  <Play className="w-4 h-4 shrink-0" />
                  <span>เริ่มรันอัลกอริทึม (Run)</span>
                </button>
              ) : (
                <button
                  onClick={resetSimulation}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold py-3 px-6 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-2 text-xs md:text-sm"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" />
                  <span>รีเซ็ตขอบเขต</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Level Success Confetti Zone */}
      {hasCompletedLevels[level] && runnerStep === trace.length - 1 && !trace.some(t => t.isError) && (
        <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-3xl text-center text-emerald-400 animate-fade-in relative z-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 text-left">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h5 className="font-bold text-base text-white">ประมวลผลอัลกอริทึมระดับ {level} สำเร็จสมบูรณ์!</h5>
              <p className="text-slate-400 text-xs mt-0.5">คีย์เวิร์ดโครงสร้างการเขียนรหัสเทียมและผลลัพธ์ผ่านเกณฑ์ความเข้ากันได้</p>
            </div>
          </div>

          <div className="flex gap-2">
            {level < 3 ? (
              <button
                onClick={() => switchLevel(level + 1)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-5 rounded-xl transition-all active:scale-98 text-xs flex items-center gap-1 shadow-md shadow-emerald-500/15"
              >
                <span>ทดสอบด่านถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 rounded-xl px-4 py-2 font-bold text-xs uppercase tracking-wider">
                👑 ปฏิบัติการครบถ้วนยอดเยี่ยม!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 5. CARD 4: 2.3.3 ความสัมพันธ์ระหว่างรหัสเทียมและผังงาน (Flowchart Linker)
// ============================================================================
const PseudocodeFlowchartCompare = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const blockMap = {
    begin: {
      pseudo: "BEGIN",
      explain: "จุดเริ่มต้นของกระบวนการเขียนโปรแกรมหลัก"
    },
    read: {
      pseudo: "READ rain",
      explain: "รับค่าตัวแปร rain จากการสแกนแป้นพิมพ์ (เช่น 'yes' หรือ 'no')"
    },
    if: {
      pseudo: "IF rain == \"yes\" THEN",
      explain: "ตรวจสอบข้อมูลเปรียบเทียบค่าตรรกะว่าฝนตกจริงหรือไม่?"
    },
    print_yes: {
      pseudo: "    PRINT \"Take Umbrella\"",
      explain: "หากเงื่อนไขเป็นจริง (ฝนตก) จะประมวลผลให้กางร่มออกนอกบ้าน"
    },
    print_no: {
      pseudo: "    PRINT \"No Umbrella\"",
      explain: "หากเงื่อนไขเป็นเท็จ (ฝนไม่ตก) ไม่จำเป็นต้องมีกลอุปกรณ์เสริม"
    },
    end_if: {
      pseudo: "END IF",
      explain: "สิ้นสุดกลุ่มคำสั่งย่อยในเงื่อนไขการตัดสินใจ"
    },
    end: {
      pseudo: "END",
      explain: "สิ้นสุดขั้นตอนอัลกอริทึมหลักของระบบ"
    }
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden transition-all hover:shadow-2xl">
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-br-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10 text-white mb-8">
        <h4 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
          <Scale className="w-7 h-7 text-indigo-400" />
          ความสัมพันธ์ระหว่างรหัสเทียมและผังงาน
        </h4>
        <p className="text-slate-400 text-[15px] leading-relaxed">
          ทั้ง <strong>รหัสเทียม (Pseudocode)</strong> และ <strong>ผังงาน (Flowchart)</strong> เป็นเครื่องมือสากลในการวาดแผนงานขั้นตอน มีความสัมพันธ์กันแบบ 1:1 
          ลองเลื่อนเมาส์วางไว้เหนือบรรทัดรหัสเทียมหรือกล่องสัญลักษณ์ผังงานเพื่อดูความสอดคล้องกัน:
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Pseudocode Block list (Span 5) */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-900 pb-2 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Standard Pseudocode
            </span>

            <div className="font-mono text-sm leading-loose space-y-2">
              <div 
                onMouseEnter={() => setHoveredId('begin')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  hoveredId === 'begin' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-purple-400 font-bold">BEGIN</span>
              </div>

              <div 
                onMouseEnter={() => setHoveredId('read')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  hoveredId === 'read' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-blue-400 font-bold">READ</span> rain
              </div>

              <div 
                onMouseEnter={() => setHoveredId('if')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  hoveredId === 'if' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-pink-400 font-bold">IF</span> rain == "yes" <span className="text-pink-400 font-bold">THEN</span>
              </div>

              <div 
                onMouseEnter={() => setHoveredId('print_yes')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all pl-8 ${
                  hoveredId === 'print_yes' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-7' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-blue-400 font-bold">PRINT</span> "Take Umbrella"
              </div>

              <div 
                onMouseEnter={() => setHoveredId('print_no')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  hoveredId === 'print_no' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-pink-400 font-bold">ELSE</span>
              </div>

              <div 
                onMouseEnter={() => setHoveredId('print_no')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all pl-8 ${
                  hoveredId === 'print_no' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-7' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-blue-400 font-bold">PRINT</span> "No Umbrella"
              </div>

              <div 
                onMouseEnter={() => setHoveredId('end_if')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  hoveredId === 'end_if' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-pink-400 font-bold">END IF</span>
              </div>

              <div 
                onMouseEnter={() => setHoveredId('end')}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  hoveredId === 'end' ? 'bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="text-purple-400 font-bold">END</span>
              </div>
            </div>
          </div>

          {/* Hover interactive description card */}
          <div className="mt-8 bg-slate-900 border border-slate-800 p-4 rounded-2xl flex gap-3 text-xs leading-relaxed text-slate-300 min-h-[80px] items-center">
            <Info className="w-5 h-5 shrink-0 text-indigo-400" />
            <div>
              <strong className="block text-indigo-300 mb-0.5">คำอธิบายกล่องคำสั่ง:</strong>
              {hoveredId && blockMap[hoveredId] 
                ? blockMap[hoveredId].explain 
                : "เอาเมาส์วางเพื่อเจาะลึกความสัมพันธ์ของแต่ละคำสั่ง"
              }
            </div>
          </div>
        </div>

        {/* Right column: Interactive SVG Flowchart (Span 7) */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-center justify-center relative overflow-x-auto">
          
          <svg 
            viewBox="0 0 360 450" 
            width="100%" 
            height="100%" 
            className="max-w-[340px] md:max-w-[360px] h-auto text-slate-300 transition-all font-sans"
          >
            {/* Define arrows */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
              </marker>
              <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
              </marker>
            </defs>

            {/* Shape 1: Start (Pill shape) */}
            <g 
              onMouseEnter={() => setHoveredId('begin')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <rect 
                x="130" y="10" width="100" height="35" rx="17.5" 
                fill={hoveredId === 'begin' ? 'rgba(99,102,241,0.2)' : 'rgba(30,41,59,0.7)'} 
                stroke={hoveredId === 'begin' ? '#6366f1' : '#475569'} 
                strokeWidth={hoveredId === 'begin' ? '2.5' : '1.5'} 
                className="transition-all duration-300"
              />
              <text x="180" y="32" textAnchor="middle" className="text-[10px] font-bold fill-white tracking-widest font-mono">BEGIN</text>
            </g>

            {/* Arrow 1 */}
            <line 
              x1="180" y1="45" x2="180" y2="75" 
              stroke={hoveredId === 'begin' || hoveredId === 'read' ? '#6366f1' : '#475569'} 
              strokeWidth={hoveredId === 'begin' || hoveredId === 'read' ? '2' : '1.5'}
              markerEnd={hoveredId === 'begin' || hoveredId === 'read' ? 'url(#arrow-active)' : 'url(#arrow)'}
              className="transition-all duration-300"
            />

            {/* Shape 2: READ rain (Parallelogram) */}
            <g 
              onMouseEnter={() => setHoveredId('read')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <polygon 
                points="135,75 245,75 225,110 115,110" 
                fill={hoveredId === 'read' ? 'rgba(99,102,241,0.2)' : 'rgba(30,41,59,0.7)'} 
                stroke={hoveredId === 'read' ? '#6366f1' : '#475569'} 
                strokeWidth={hoveredId === 'read' ? '2.5' : '1.5'} 
                className="transition-all duration-300"
              />
              <text x="180" y="97" textAnchor="middle" className="text-[10px] font-bold fill-white tracking-wide font-mono">READ rain</text>
            </g>

            {/* Arrow 2 */}
            <line 
              x1="180" y1="110" x2="180" y2="140" 
              stroke={hoveredId === 'read' || hoveredId === 'if' ? '#6366f1' : '#475569'} 
              strokeWidth={hoveredId === 'read' || hoveredId === 'if' ? '2' : '1.5'}
              markerEnd={hoveredId === 'read' || hoveredId === 'if' ? 'url(#arrow-active)' : 'url(#arrow)'}
              className="transition-all duration-300"
            />

            {/* Shape 3: Condition check (Diamond) */}
            <g 
              onMouseEnter={() => setHoveredId('if')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <polygon 
                points="180,140 240,180 180,220 120,180" 
                fill={hoveredId === 'if' ? 'rgba(99,102,241,0.2)' : 'rgba(30,41,59,0.7)'} 
                stroke={hoveredId === 'if' ? '#6366f1' : '#475569'} 
                strokeWidth={hoveredId === 'if' ? '2.5' : '1.5'} 
                className="transition-all duration-300"
              />
              <text x="180" y="184" textAnchor="middle" className="text-[9px] font-bold fill-white tracking-tight font-mono">rain == "yes"?</text>
            </g>

            {/* Yes Arrow Path (Right to PRINT yes) */}
            <path 
              d="M 240 180 L 300 180 L 300 250" 
              fill="none"
              stroke={hoveredId === 'if' || hoveredId === 'print_yes' ? '#6366f1' : '#475569'} 
              strokeWidth={hoveredId === 'if' || hoveredId === 'print_yes' ? '2' : '1.5'}
              markerEnd={hoveredId === 'if' || hoveredId === 'print_yes' ? 'url(#arrow-active)' : 'url(#arrow)'}
              className="transition-all duration-300"
            />
            <text x="265" y="172" className="text-[9px] font-bold fill-emerald-400">Yes</text>

            {/* No Arrow Path (Left to PRINT no) */}
            <path 
              d="M 120 180 L 60 180 L 60 250" 
              fill="none"
              stroke={hoveredId === 'if' || hoveredId === 'print_no' ? '#6366f1' : '#475569'} 
              strokeWidth={hoveredId === 'if' || hoveredId === 'print_no' ? '2' : '1.5'}
              markerEnd={hoveredId === 'if' || hoveredId === 'print_no' ? 'url(#arrow-active)' : 'url(#arrow)'}
              className="transition-all duration-300"
            />
            <text x="90" y="172" className="text-[9px] font-bold fill-rose-400">No</text>

            {/* Shape 4: PRINT "Take Umbrella" */}
            <g 
              onMouseEnter={() => setHoveredId('print_yes')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <polygon 
                points="255,250 355,250 335,285 235,285" 
                fill={hoveredId === 'print_yes' ? 'rgba(99,102,241,0.2)' : 'rgba(30,41,59,0.7)'} 
                stroke={hoveredId === 'print_yes' ? '#6366f1' : '#475569'} 
                strokeWidth={hoveredId === 'print_yes' ? '2.5' : '1.5'} 
                className="transition-all duration-300"
              />
              <text x="295" y="272" textAnchor="middle" className="text-[8px] font-bold fill-white font-mono">PRINT "Take..."</text>
            </g>

            {/* Shape 5: PRINT "No Umbrella" */}
            <g 
              onMouseEnter={() => setHoveredId('print_no')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <polygon 
                points="20,250 120,250 100,285 0,285" 
                fill={hoveredId === 'print_no' ? 'rgba(99,102,241,0.2)' : 'rgba(30,41,59,0.7)'} 
                stroke={hoveredId === 'print_no' ? '#6366f1' : '#475569'} 
                strokeWidth={hoveredId === 'print_no' ? '2.5' : '1.5'} 
                className="transition-all duration-300"
              />
              <text x="60" y="272" textAnchor="middle" className="text-[8px] font-bold fill-white font-mono">PRINT "No..."</text>
            </g>

            {/* Yes bottom connector */}
            <path 
              d="M 290 285 L 290 340 L 180 340" 
              fill="none"
              stroke={hoveredId === 'print_yes' || hoveredId === 'end_if' ? '#6366f1' : '#475569'} 
              strokeWidth={hoveredId === 'print_yes' || hoveredId === 'end_if' ? '2' : '1.5'}
              className="transition-all duration-300"
            />

            {/* No bottom connector */}
            <path 
              d="M 60 285 L 60 340 L 180 340" 
              fill="none"
              stroke={hoveredId === 'print_no' || hoveredId === 'end_if' ? '#6366f1' : '#475569'} 
              strokeWidth={hoveredId === 'print_no' || hoveredId === 'end_if' ? '2' : '1.5'}
              className="transition-all duration-300"
            />

            {/* Middle bottom line */}
            <line 
              x1="180" y1="340" x2="180" y2="370" 
              stroke={hoveredId === 'end_if' || hoveredId === 'end' ? '#6366f1' : '#475569'} 
              strokeWidth={hoveredId === 'end_if' || hoveredId === 'end' ? '2' : '1.5'}
              markerEnd={hoveredId === 'end_if' || hoveredId === 'end' ? 'url(#arrow-active)' : 'url(#arrow)'}
              className="transition-all duration-300"
            />

            {/* Shape 6: End */}
            <g 
              onMouseEnter={() => setHoveredId('end')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <rect 
                x="130" y="370" width="100" height="35" rx="17.5" 
                fill={hoveredId === 'end' ? 'rgba(99,102,241,0.2)' : 'rgba(30,41,59,0.7)'} 
                stroke={hoveredId === 'end' ? '#6366f1' : '#475569'} 
                strokeWidth={hoveredId === 'end' ? '2.5' : '1.5'} 
                className="transition-all duration-300"
              />
              <text x="180" y="392" textAnchor="middle" className="text-[10px] font-bold fill-white tracking-widest font-mono">END</text>
            </g>
          </svg>

        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. TRACE GENERATOR FOR SIMULATOR ENGINE
// ============================================================================
const generateExecutionTrace = (level, answers, testInputs) => {
  const trace = [];
  
  if (level === 1) {
    const isSlot1Correct = answers.slot1 === 'IF';
    const isSlot2Correct = answers.slot2 === 'THEN';
    const isSlot3Correct = answers.slot3 === 'ELSE';
    const isSlot4Correct = answers.slot4 === 'END IF';
    
    // BEGIN
    trace.push({
      line: 0,
      ram: {},
      console: [],
      explain: "เริ่มต้นการทำงานของโปรแกรมหลัก"
    });
    
    // READ score
    const scoreVal = parseInt(testInputs.score) || 0;
    trace.push({
      line: 1,
      ram: { score: scoreVal },
      console: [],
      explain: `อ่านค่าจากคีย์บอร์ด ได้รับค่าคะแนน: ${scoreVal}`
    });
    
    // Check Slot 1 & 2
    if (!isSlot1Correct || !isSlot2Correct) {
      trace.push({
        line: 2,
        ram: { score: scoreVal },
        console: ["Syntax Error: โครงสร้างประโยคเงื่อนไขผิดพลาด"],
        explain: "ไวยากรณ์ไม่ถูกต้อง! โครงสร้างตรวจสอบเงื่อนไขแบบตัดสินใจ ต้องขึ้นต้นด้วย IF และระบุขอบเขตด้วย THEN",
        isError: true
      });
      return trace;
    }
    
    const conditionTrue = scoreVal >= 50;
    trace.push({
      line: 2,
      ram: { score: scoreVal },
      console: [],
      explain: `เปรียบเทียบเงื่อนไข: score >= 50 (${scoreVal} >= 50) ผลลัพธ์เป็น ${conditionTrue ? 'จริง (True)' : 'เท็จ (False)'}`
    });
    
    if (conditionTrue) {
      trace.push({
        line: 3,
        ram: { score: scoreVal },
        console: ["Pass"],
        explain: "เงื่อนไขเป็นจริง (True) ประมวลผลคำสั่งย่อย: แสดงผลลัพธ์คำว่า 'Pass' ออกหน้าจอ"
      });
    } else {
      if (!isSlot3Correct) {
        trace.push({
          line: 4,
          ram: { score: scoreVal },
          console: ["Syntax Error: ขาดบล็อกสลับเงื่อนไข"],
          explain: "ไวยากรณ์ไม่ถูกต้อง! ในกรณีต้องการทางเลือกสลับเมื่อเงื่อนไขหลักเป็นเท็จ ต้องระบุบล็อกด้วยคีย์เวิร์ด ELSE",
          isError: true
        });
        return trace;
      }
      
      trace.push({
        line: 4,
        ram: { score: scoreVal },
        console: [],
        explain: "เงื่อนไขหลักประเมินเป็นเท็จ (False) จึงข้ามมาทำงานในบล็อก ELSE"
      });
      
      trace.push({
        line: 5,
        ram: { score: scoreVal },
        console: ["Fail"],
        explain: "ประมวลผลคำสั่งย่อยในบล็อก ELSE: แสดงผลลัพธ์คำว่า 'Fail' ออกหน้าจอ"
      });
    }
    
    if (!isSlot4Correct) {
      trace.push({
        line: 6,
        ram: { score: scoreVal },
        console: conditionTrue ? ["Pass", "Syntax Error"] : ["Fail", "Syntax Error"],
        explain: "ไวยากรณ์ไม่ถูกต้อง! โครงสร้างเงื่อนไขแบบเงื่อนไขสองทางเลือก ต้องปิดท้ายขอบเขตด้วยคีย์เวิร์ด END IF เสมอ",
        isError: true
      });
      return trace;
    }
    
    trace.push({
      line: 6,
      ram: { score: scoreVal },
      console: conditionTrue ? ["Pass"] : ["Fail"],
      explain: "สิ้นสุดขอบเขตเงื่อนไข (END IF)"
    });
    
    trace.push({
      line: 7,
      ram: { score: scoreVal },
      console: conditionTrue ? ["Pass"] : ["Fail"],
      explain: "สิ้นสุดขั้นตอนอัลกอริทึมสมบูรณ์"
    });
  }
  else if (level === 2) {
    const isSlot1Correct = answers.slot1 === 'IF';
    const isSlot2Correct = answers.slot2 === 'THEN';
    const isSlot3Correct = answers.slot3 === 'END IF';
    
    const priceVal = parseInt(testInputs.price) || 0;
    const qtyVal = parseInt(testInputs.qty) || 0;
    
    trace.push({
      line: 0,
      ram: {},
      console: [],
      explain: "เริ่มต้นการทำงานโปรแกรมลดราคารวม Smart Cashier"
    });
    
    trace.push({
      line: 1,
      ram: { price: priceVal, qty: qtyVal },
      console: [],
      explain: `รับข้อมูลราคา (${priceVal}) และจำนวนสินค้า (${qtyVal}) เข้ามาจัดเก็บลงในหน่วยความจำ RAM`
    });
    
    const totalVal = priceVal * qtyVal;
    trace.push({
      line: 2,
      ram: { price: priceVal, qty: qtyVal, total: totalVal },
      console: [],
      explain: `คำนวณราคายอดรวมเริ่มต้น: total = price * qty (${priceVal} * ${qtyVal} = ${totalVal})`
    });
    
    if (!isSlot1Correct || !isSlot2Correct) {
      trace.push({
        line: 3,
        ram: { price: priceVal, qty: qtyVal, total: totalVal },
        console: ["Syntax Error: ตรวจสอบเงื่อนไขไม่ถูกต้อง"],
        explain: "ไวยากรณ์ไม่ถูกต้อง! ในการตรวจเช็คทางเลือกเงื่อนไขต้องขึ้นต้นด้วย IF และเปิดบล็อกย่อยด้วย THEN",
        isError: true
      });
      return trace;
    }
    
    const isDiscount = totalVal >= 1000;
    trace.push({
      line: 3,
      ram: { price: priceVal, qty: qtyVal, total: totalVal },
      console: [],
      explain: `ตรวจสอบเงื่อนไขส่วนลด: ยอดรวม total >= 1000 (${totalVal} >= 1000) มีค่าตรรกะเป็น ${isDiscount ? 'จริง (True)' : 'เท็จ (False)'}`
    });
    
    let finalTotal = totalVal;
    if (isDiscount) {
      finalTotal = totalVal * 0.9;
      trace.push({
        line: 4,
        ram: { price: priceVal, qty: qtyVal, total: finalTotal },
        console: [],
        explain: `เงื่อนไขเป็นจริง: คำนวณลดราคาร้อยละ 10 (คูณ 0.9) ค่าของตัวแปร total ใน RAM ปรับปรุงเป็น: ${finalTotal}`
      });
    }
    
    if (!isSlot3Correct) {
      trace.push({
        line: 5,
        ram: { price: priceVal, qty: qtyVal, total: finalTotal },
        console: ["Syntax Error: ขาดคำสั่งปิดขอบเขตเงื่อนไข"],
        explain: "ไวยากรณ์ไม่ถูกต้อง! เมื่อประมวลผลคำสั่งย่อยในเงื่อนไขเสร็จแล้ว ต้องปิดบล็อกด้วยคีย์เวิร์ด END IF เสมอ",
        isError: true
      });
      return trace;
    }
    
    trace.push({
      line: 5,
      ram: { price: priceVal, qty: qtyVal, total: finalTotal },
      console: [],
      explain: "สิ้นสุดขอบเขตเงื่อนไขของโครงสร้าง IF"
    });
    
    trace.push({
      line: 6,
      ram: { price: priceVal, qty: qtyVal, total: finalTotal },
      console: [finalTotal.toString()],
      explain: `พิมพ์แสดงมูลค่ายอดรวมราคาสุทธิสุทธิด้านปลายทางออกจอคอนโซล: ${finalTotal}`
    });
    
    trace.push({
      line: 7,
      ram: { price: priceVal, qty: qtyVal, total: finalTotal },
      console: [finalTotal.toString()],
      explain: "สิ้นสุดขั้นตอนอัลกอริทึมสมบูรณ์"
    });
  }
  else if (level === 3) {
    const isSlot1Correct = answers.slot1 === 'WHILE';
    const isSlot2Correct = answers.slot2 === 'DO';
    const isSlot3Correct = answers.slot3 === 'END WHILE';
    
    trace.push({
      line: 0,
      ram: {},
      console: [],
      explain: "เริ่มต้นจำลองโปรแกรมวนซ้ำแบบเช็คเงื่อนไข"
    });
    
    trace.push({
      line: 1,
      ram: { counter: 0 },
      console: [],
      explain: "ประกาศตัวแปรเริ่มต้น counter = 0 เก็บลงสู่ RAM"
    });
    
    if (!isSlot1Correct || !isSlot2Correct) {
      trace.push({
        line: 2,
        ram: { counter: 0 },
        console: ["Syntax Error: การควบคุมทิศทางวนซ้ำไม่ถูกต้อง"],
        explain: "ไวยากรณ์ไม่ถูกต้อง! โครงสร้างการวนซ้ำทำตามเงื่อนไข (Pre-test loop) นิยมเปิดด้วย WHILE และระบุคำสั่งรันงานด้วย DO",
        isError: true
      });
      return trace;
    }
    
    let counterVal = 0;
    let consoleLog = [];
    
    while (counterVal < 3) {
      trace.push({
        line: 2,
        ram: { counter: counterVal },
        console: [...consoleLog],
        explain: `ตรวจสอบประเมินลูป: counter < 3 (${counterVal} < 3) มีค่าเป็น จริง (True) เตรียมทำรอบถัดไป`
      });
      
      counterVal = counterVal + 1;
      trace.push({
        line: 3,
        ram: { counter: counterVal },
        console: [...consoleLog],
        explain: `คำนวณเพิ่มค่าตัวแปร: counter = counter + 1 ค่าปัจจุบันใน RAM ปรับเพิ่มเป็น: ${counterVal}`
      });
      
      consoleLog.push(counterVal.toString());
      trace.push({
        line: 4,
        ram: { counter: counterVal },
        console: [...consoleLog],
        explain: `แสดงผลทางจอภาพ: พิมพ์ค่า counter ล่าสุดคือ "${counterVal}"`
      });
    }
    
    trace.push({
      line: 2,
      ram: { counter: counterVal },
      console: [...consoleLog],
      explain: `ตรวจสอบประเมินลูป: counter < 3 (${counterVal} < 3) มีค่าเป็น เท็จ (False) จึงข้ามออกจากลูปซ้ำ`
    });
    
    if (!isSlot3Correct) {
      trace.push({
        line: 5,
        ram: { counter: counterVal },
        console: [...consoleLog, "Syntax Error: ลืมคำสั่งปิดลูป"],
        explain: "ไวยากรณ์ไม่ถูกต้อง! เมื่อสิ้นสุดการวนลูปเงื่อนไขแล้ว ต้องแจ้งปิดโครงสร้างด้วยคีย์เวิร์ด END WHILE เสมอ",
        isError: true
      });
      return trace;
    }
    
    trace.push({
      line: 5,
      ram: { counter: counterVal },
      console: [...consoleLog],
      explain: "สิ้นสุดขอบเขตวนลูปโครงสร้าง WHILE"
    });
    
    trace.push({
      line: 6,
      ram: { counter: counterVal },
      console: [...consoleLog],
      explain: "สิ้นสุดขั้นตอนอัลกอริทึมสมบูรณ์"
    });
  }
  
  return trace;
};

// ============================================================================
// 7. MAIN EXPORT COMPONENT
// ============================================================================
export default function py2_3() {
  const teacherTaskContent = `ให้นักเรียนเขียนรหัสเทียม (Pseudocode) จากสถานการณ์แก้ปัญหาต่อไปนี้ลงในสมุด:

1. รับค่าราคาสินค้า (Price) และจำนวนสินค้า (Quantity)
2. นำราคาคูณกับจำนวน เพื่อคำนวณยอดรวม (Total)
3. หากยอดรวมมากกว่า 1000 บาท ให้ลดราคาสุทธิ 10%
4. พิมพ์แสดงยอดราคาสุทธิที่ผู้ใช้ต้องจ่ายจริง

(พิจารณานิยมคีย์เวิร์ดภาษาอังกฤษตัวพิมพ์ใหญ่, มี BEGIN-END และเคาะย่อหน้าให้เป็นไปตามระเบียบสากล)`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-purple-200 selection:text-purple-900 relative">
      {/* Layer 1: Ambient Background Glow Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-100/40 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-100/50 blur-[140px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-10 space-y-16">
        
        {/* Layer 3: Flexible Subtopics & Interactives */}
        <IntroCard />
        <PrinciplesCard />
        <PseudocodeLabSimulator />
        <PseudocodeFlowchartCompare />

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.3)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
