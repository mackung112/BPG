import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  CircleDot,
  Calculator,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Percent,
  Terminal,
  Activity,
  ArrowDownToLine,
  ArrowUpToLine,
  Target,
  SearchCode
} from 'lucide-react';

// ============================================================================
// 1. Division Explorer (Float vs Int Division)
// ============================================================================
const DivisionExplorer = () => {
  const [numA, setNumA] = useState(10);
  const [numB, setNumB] = useState(3);

  const regularDiv = numB !== 0 ? (numA / numB) : 0;
  const floorDiv = numB !== 0 ? Math.floor(numA / numB) : 0;

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-bl-full blur-3xl -z-0 transition-all duration-700 group-hover:scale-125"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Activity className="w-8 h-8 text-teal-400" />
          ห้องทดลองการหาร (Division Lab)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          ลองเปลี่ยนตัวเลขด้านล่าง เพื่อดูความแตกต่างระหว่าง <strong>การหารปกติ ( / )</strong> ที่ให้ผลลัพธ์เป็น Float เสมอ 
          เทียบกับ <strong>การหารปัดเศษทิ้ง ( // )</strong> ที่ให้ผลลัพธ์เป็น Integer
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
        
        {/* Input Form */}
        <div className="flex items-center gap-4 mb-10 bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-inner">
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1 ml-2">ตัวตั้ง</label>
            <input 
              type="number" 
              value={numA}
              onChange={(e) => setNumA(parseFloat(e.target.value) || 0)}
              className="bg-slate-900 border border-slate-600 rounded-xl w-24 px-4 py-3 text-white font-mono text-2xl text-center outline-none focus:border-teal-500"
            />
          </div>
          <div className="text-4xl text-slate-500 font-light mt-4">÷</div>
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1 ml-2">ตัวหาร</label>
            <input 
              type="number" 
              value={numB}
              onChange={(e) => setNumB(parseFloat(e.target.value) || 1)}
              className="bg-slate-900 border border-slate-600 rounded-xl w-24 px-4 py-3 text-white font-mono text-2xl text-center outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Results Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Float Result */}
          <div className="bg-[#1E1E1E] rounded-3xl p-6 border-2 border-teal-500/30 hover:border-teal-500 transition-colors shadow-lg relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-bl-full blur-2xl"></div>
            <div className="text-teal-400 bg-teal-500/10 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-teal-500/20">
              การหารปกติ ( / )
            </div>
            <div className="font-mono text-xl text-slate-400 mb-2">
              {numA} / {numB}
            </div>
            <div className="font-mono text-4xl font-black text-white mb-2 break-all px-2">
              {Number.isInteger(regularDiv) ? `${regularDiv}.0` : regularDiv.toPrecision(7)}
            </div>
            <div className="text-teal-300 text-sm mt-4 font-mono">
              type: &lt;class 'float'&gt;
            </div>
          </div>

          {/* Int Result */}
          <div className="bg-[#1E1E1E] rounded-3xl p-6 border-2 border-amber-500/30 hover:border-amber-500 transition-colors shadow-lg relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full blur-2xl"></div>
            <div className="text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-amber-500/20">
              หารปัดเศษทิ้ง ( // )
            </div>
            <div className="font-mono text-xl text-slate-400 mb-2">
              {numA} // {numB}
            </div>
            <div className="font-mono text-4xl font-black text-white mb-2 break-all px-2">
              {floorDiv}
            </div>
            <div className="text-amber-300 text-sm mt-4 font-mono">
              type: &lt;class 'int'&gt;
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};


// ============================================================================
// 2. Float Rounding Simulator (Enhanced)
// ============================================================================
const FloatRoundingSimulator = () => {
  const [baseNumber, setBaseNumber] = useState(3.14159);
  const [decimals, setDecimals] = useState(2);
  const [method, setMethod] = useState('round'); // round, floor, ceil, trunc
  
  const getRoundedValue = () => {
    if (method === 'floor') return Math.floor(baseNumber);
    if (method === 'ceil') return Math.ceil(baseNumber);
    if (method === 'trunc') return Math.trunc(baseNumber);
    
    // Default: round
    const factor = Math.pow(10, decimals);
    return Math.round(baseNumber * factor) / factor;
  };

  const getFormatDisplay = () => {
    if (method !== 'round' || decimals === 0) return `${getRoundedValue()} (Int)`;
    return getRoundedValue().toFixed(decimals);
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Calculator className="w-8 h-8 text-indigo-400" />
          เครื่องจำลองการจัดการทศนิยม
        </h3>
        <p className="text-slate-400 max-w-3xl mx-auto leading-loose">
          ใน Python มีหลายวิธีในการจัดการทศนิยม! ลองเปลี่ยนตัวเลขและเลือกวิธีต่างๆ 
          เช่น <code>round()</code> ปัดเศษปกติ, <code>math.floor()</code> ปัดลงเสมอ, <code>math.ceil()</code> ปัดขึ้นเสมอ
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto bg-slate-950 border border-slate-700 rounded-3xl p-8 flex flex-col items-center gap-8 shadow-inner">
        
        {/* Method Selector */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          <button 
            onClick={() => setMethod('round')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${method === 'round' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            <Target className="w-4 h-4 inline-block mr-2"/> round()
          </button>
          <button 
            onClick={() => setMethod('floor')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${method === 'floor' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            <ArrowDownToLine className="w-4 h-4 inline-block mr-2"/> math.floor()
          </button>
          <button 
            onClick={() => setMethod('ceil')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${method === 'ceil' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            <ArrowUpToLine className="w-4 h-4 inline-block mr-2"/> math.ceil()
          </button>
          <button 
            onClick={() => setMethod('trunc')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${method === 'trunc' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            <Percent className="w-4 h-4 inline-block mr-2"/> int() / trunc()
          </button>
        </div>

        {/* Input & Output Split */}
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          
          <div className="w-full md:w-1/2 flex flex-col gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-700">
            <div>
              <label className="text-slate-400 text-sm font-bold mb-2 block">ตัวเลขต้นทาง (number)</label>
              <input 
                type="number" 
                step="0.00001"
                value={baseNumber}
                onChange={(e) => setBaseNumber(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-xl outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className={`transition-opacity duration-300 ${method !== 'round' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-slate-400 text-sm font-bold">จำนวนตำแหน่ง (digits)</label>
                <span className="bg-indigo-500/20 text-indigo-400 font-bold px-3 py-1 rounded-full text-sm">{decimals} ตำแหน่ง</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="1"
                value={decimals}
                onChange={(e) => setDecimals(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center shrink-0">
             <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          <div className="w-full md:w-1/2">
             <div className="bg-[#1E1E1E] border border-slate-700 rounded-2xl p-6 w-full relative shadow-xl text-center min-h-[180px] flex flex-col justify-center">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-400 text-xs font-bold px-4 py-1.5 rounded-full border border-slate-700">
                 โค้ด Python
               </div>
               
               <div className="text-indigo-400 font-mono mt-4 mb-4 text-center text-lg">
                 {method === 'round' && <><span className="text-blue-400">round</span>({baseNumber}, {decimals})</>}
                 {method === 'floor' && <><span className="text-blue-400">math.floor</span>({baseNumber})</>}
                 {method === 'ceil' && <><span className="text-blue-400">math.ceil</span>({baseNumber})</>}
                 {method === 'trunc' && <><span className="text-blue-400">int</span>({baseNumber})</>}
               </div>
               
               <div className="border-t border-slate-800 pt-4 text-center flex-1 flex flex-col items-center justify-center">
                 <div className="text-4xl font-bold font-mono text-white tracking-widest break-all">
                   {getFormatDisplay()}
                 </div>
               </div>
             </div>
             
             {/* Dynamic Explanation */}
             <div className="mt-4 text-sm text-slate-400 text-center h-12">
                {method === 'round' && "ปัดเศษตามหลักคณิตศาสตร์ทั่วไป (>= 0.5 ปัดขึ้น)"}
                {method === 'floor' && "ปัดทศนิยมทิ้งลงมาหาค่าที่น้อยกว่าเสมอ (เช่น 3.9 -> 3, -3.1 -> -4)"}
                {method === 'ceil' && "ปัดทศนิยมขึ้นไปหาค่าที่มากกว่าเสมอ (เช่น 3.1 -> 4, -3.9 -> -3)"}
                {method === 'trunc' && "ตัดจุดทศนิยมทิ้งทั้งหมดอย่างเลือดเย็น! ไม่สนว่าค่าจะใกล้เคียงฝั่งไหน"}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};


// ============================================================================
// 3. Floating Point Secret (Terminal Lab)
// ============================================================================
const FloatingPointSecret = () => {
  const [val1, setVal1] = useState(0.1);
  const [val2, setVal2] = useState(0.2);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const calculate = () => {
    setIsCalculating(true);
    setResult(null);
    setTimeout(() => {
      setResult(val1 + val2);
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <div className="mb-20">
       <div className="flex items-center gap-4 mb-8 pl-4 border-l-[6px] border-rose-500">
         <h3 className="text-4xl font-bold text-slate-800">
           ความลับของทศนิยม: ทำไม 0.1 + 0.2 ถึงไม่เท่ากับ 0.3?
         </h3>
       </div>
       
       <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row gap-12 items-center">
         <div className="w-full lg:w-1/2">
            <p className="text-slate-600 leading-loose text-lg mb-8">
              ถ้าคุณลองพิมพ์ <code>print(0.1 + 0.2)</code> ใน Python (รวมถึงภาษาโปรแกรมส่วนใหญ่อย่าง JavaScript หรือ Java) 
              ผลลัพธ์ที่ได้จะไม่ใช่ <code>0.3</code> พอดีเป๊ะ แต่จะเป็น <strong className="text-rose-500 bg-rose-50 px-2 py-1 rounded">0.30000000000000004</strong> !
            </p>
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                <SearchCode className="w-20 h-20 text-rose-500" />
              </div>
              <strong className="text-rose-900 text-xl block mb-3 flex items-center gap-2 relative z-10"><AlertTriangle className="w-6 h-6"/> สาเหตุ (Floating-Point Precision):</strong>
              <p className="text-rose-800 leading-loose text-base relative z-10">
                คอมพิวเตอร์เก็บข้อมูลด้วยระบบเลขฐานสอง (0 และ 1) แต่เศษส่วนบางค่าในฐานสิบ (เช่น 0.1 หรือ 1/10) 
                ไม่สามารถแปลงเป็นเลขฐานสองแบบลงตัวเป๊ะๆ ได้ (เหมือนเราหาร 1/3 แล้วได้ 0.3333... ไม่สิ้นสุด) 
                ทำให้คอมพิวเตอร์ต้องเก็บค่าประมาณ และเกิดเศษทศนิยมติ่งท้ายมาเล็กน้อยตอนนำมาบวกกัน 
                <strong>นี่จึงเป็นเหตุผลว่าทำไมเราถึงต้องมีฟังก์ชันสำหรับการ "ปัดเศษ (round)"</strong>
              </p>
            </div>
         </div>
         <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-slate-900 rounded-3xl p-8 w-full shadow-2xl border border-slate-800 font-mono relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-orange-500 group-hover:h-3 transition-all"></div>
              
              <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-4">
                <Terminal className="w-5 h-5 text-slate-400" />
                <div className="text-slate-400 text-sm font-bold tracking-widest">Python Interactive Shell</div>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                 <input 
                   type="number" 
                   step="0.1" 
                   value={val1} 
                   onChange={e => setVal1(parseFloat(e.target.value) || 0)}
                   className="bg-slate-800 text-blue-400 font-bold px-4 py-2 rounded-lg w-24 text-center outline-none focus:border-blue-500 border border-transparent"
                 />
                 <span className="text-slate-500 font-bold text-2xl">+</span>
                 <input 
                   type="number" 
                   step="0.1" 
                   value={val2} 
                   onChange={e => setVal2(parseFloat(e.target.value) || 0)}
                   className="bg-slate-800 text-blue-400 font-bold px-4 py-2 rounded-lg w-24 text-center outline-none focus:border-blue-500 border border-transparent"
                 />
                 <button 
                   onClick={calculate}
                   className="ml-auto bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-colors"
                 >
                   Enter ↵
                 </button>
              </div>

              <div className="text-slate-300 flex items-center gap-3 text-lg mb-4">
                <span className="text-blue-500 font-bold">&gt;&gt;&gt;</span> 
                <span>print({val1} + {val2})</span>
              </div>
              
              <div className="min-h-[50px]">
                {isCalculating && (
                  <div className="text-slate-500 animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                )}
                {result !== null && (
                  <div className="text-rose-400 mt-2 font-bold bg-rose-500/10 px-4 py-3 rounded-xl border border-rose-500/20 break-all text-xl animate-[fadeIn_0.3s_ease-out]">
                    {result}
                  </div>
                )}
              </div>
            </div>
         </div>
       </div>
    </div>
  );
};


// ============================================================================
// 4. Main Page Component
// ============================================================================
const pyUnit3_4_Float = () => {
  const teacherTaskContent = `
    ใบงาน "นักปัดเศษทศนิยม"
    1. ให้นักเรียนหาผลลัพธ์ของคำสั่งต่อไปนี้:
       - round(10.567, 2)
       - round(9.999, 1)
       - round(5.5, 0)
    2. หาผลลัพธ์ของการหาร 2 แบบนี้:
       - 15 / 2
       - 15 // 2
    3. อธิบายความแตกต่างระหว่าง int(3.9) กับ round(3.9, 0)
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.4.1 Float Characteristics */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 flex flex-col md:flex-row gap-12 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full md:w-1/2">
              <h4 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                ลักษณะของทศนิยม
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-8">
                จุดสังเกตของข้อมูลประเภท Float คือ <strong>ต้องมีจุด <code>.</code> เสมอ</strong> 
                แม้ว่าค่าที่แท้จริงจะเป็นจำนวนเต็มก็ตาม
              </p>
              
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-[2px] rounded-3xl shadow-lg mb-6">
                 <div className="bg-white rounded-[22px] p-8">
                   <strong className="text-teal-900 block mb-4 flex items-center gap-3 text-xl"><Percent className="w-6 h-6 text-teal-600"/> กฎเหล็ก 2 ข้อของ Float:</strong>
                   <ul className="text-teal-800/90 leading-loose text-lg space-y-4">
                     <li className="flex items-start gap-3">
                       <span className="bg-teal-100 text-teal-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 text-sm font-bold">1</span>
                       <span>แม้ตัวเลขนั้นจะมีค่าเป็นจำนวนเต็ม แต่ถ้าเราเติม <code>.0</code> ต่อท้าย (เช่น <code>5.0</code>) Python จะมองว่าเป็น Float ทันที!</span>
                     </li>
                     <li className="flex items-start gap-3">
                       <span className="bg-teal-100 text-teal-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 text-sm font-bold">2</span>
                       <span>ผลลัพธ์จากการ <strong>หารแบบปกติ (/)</strong> จะได้ข้อมูลเป็น Float เสมอ แม้จะหารลงตัวก็ตาม (เช่น <code>10 / 2 = 5.0</code>)</span>
                     </li>
                   </ul>
                 </div>
              </div>
           </div>
           
           <div className="w-full md:w-1/2">
             <div className="bg-[#1E1E1E] rounded-3xl p-8 shadow-2xl font-mono text-sm md:text-base border border-slate-800 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full blur-2xl group-hover:bg-teal-500/20 transition-colors"></div>
               
               <div className="space-y-5 relative z-10">
                 <div className="text-slate-500 mb-2">// การประกาศตัวแปร Float</div>
                 <div className="text-slate-300">pi = <span className="text-emerald-400">3.14159</span></div>
                 <div className="text-slate-300">weight = <span className="text-emerald-400">65.5</span></div>
                 <div className="text-slate-300">gravity = <span className="text-emerald-400">9.81</span></div>
                 <div className="text-slate-300">integer_but_float = <span className="text-emerald-400">100.0</span></div>
                 
                 <div className="text-slate-500 mt-8 mb-2">// การคำนวณที่ให้ผลลัพธ์เป็น Float</div>
                 <div className="text-slate-300">result = <span className="text-blue-400">10</span> / <span className="text-blue-400">2</span></div>
                 <div className="text-slate-300">print(result)</div>
                 <div className="text-teal-300 italic bg-white/5 p-2 rounded mt-2 border-l-4 border-teal-500">
                   &gt;&gt; 5.0
                 </div>
                 
                 <div className="text-slate-300 mt-4">print(<span className="text-amber-400">type</span>(result))</div>
                 <div className="text-teal-300 italic bg-white/5 p-2 rounded mt-2 border-l-4 border-teal-500">
                   &gt;&gt; &lt;class 'float'&gt;
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* 3.4.2 Division Simulator */}
        <DivisionExplorer />

        {/* 3.4.3 Floating-Point Secret */}
        <FloatingPointSecret />

        {/* 3.4.4 Rounding Simulator */}
        <h3 className="text-4xl font-bold text-slate-800 mb-10 pl-4 border-l-[6px] border-indigo-500">
          การแก้ปัญหาด้วยฟังก์ชันจัดการทศนิยม
        </h3>
        <FloatRoundingSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.4)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit3_4_Float;
