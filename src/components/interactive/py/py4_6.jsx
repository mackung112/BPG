import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import { 
  Network, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  Lightbulb,
  Power,
  PowerOff,
  Lock,
  Gift,
  ArrowRight
} from 'lucide-react';



const LogicSimulator = () => {
  const [sw1, setSw1] = useState(false);
  const [sw2, setSw2] = useState(false);
  const [operator, setOperator] = useState('and');
  
  const [notInput, setNotInput] = useState(false);

  // Calculate Results
  const resultMain = operator === 'and' ? (sw1 && sw2) : (sw1 || sw2);
  const resultNot = !notInput;

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Network className="w-6 h-6 text-violet-500" />
          เครื่องจำลองวงจรตรรกะ (Logic Gates)
        </h3>
        <p className="text-slate-500 mt-2">จำลองการทำงานของตัวดำเนินการ เพื่อดูว่าจะส่งผลลัพธ์ (ไฟติด/ไฟดับ) อย่างไร</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        
        {/* AND / OR Simulator */}
        <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-700">จำลอง <code className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded">and</code> / <code className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded">or</code></h4>
            <div className="bg-slate-200 p-1 rounded-xl flex">
              <button 
                onClick={() => setOperator('and')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${operator === 'and' ? 'bg-white shadow-sm text-violet-600' : 'text-slate-500'}`}
              >
                and
              </button>
              <button 
                onClick={() => setOperator('or')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${operator === 'or' ? 'bg-white shadow-sm text-violet-600' : 'text-slate-500'}`}
              >
                or
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex flex-col gap-4">
              {/* Switch 1 */}
              <button 
                onClick={() => setSw1(!sw1)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all w-32 ${sw1 ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-slate-200 text-slate-500'}`}
              >
                {sw1 ? <Power className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
                <span className="font-bold">{sw1 ? 'True' : 'False'}</span>
              </button>
              
              {/* Operator Badge */}
              <div className="text-center">
                <span className="bg-violet-500 text-white font-mono font-bold px-3 py-1 rounded shadow">{operator}</span>
              </div>

              {/* Switch 2 */}
              <button 
                onClick={() => setSw2(!sw2)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all w-32 ${sw2 ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-slate-200 text-slate-500'}`}
              >
                {sw2 ? <Power className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
                <span className="font-bold">{sw2 ? 'True' : 'False'}</span>
              </button>
            </div>

            <ArrowRight className="w-8 h-8 text-slate-300" />

            {/* Output Bulb */}
            <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-500 ${resultMain ? 'bg-yellow-100 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.6)]' : 'bg-slate-100 border-slate-200'}`}>
              <Lightbulb className={`w-12 h-12 mb-2 transition-all duration-500 ${resultMain ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
              <span className={`font-bold font-mono ${resultMain ? 'text-yellow-700' : 'text-slate-400'}`}>{resultMain ? 'True' : 'False'}</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 text-center shadow-inner">
            <span className={sw1 ? 'text-emerald-400' : 'text-rose-400'}>{sw1 ? 'True' : 'False'}</span>
            <span className="text-violet-400 font-bold mx-2">{operator}</span>
            <span className={sw2 ? 'text-emerald-400' : 'text-rose-400'}>{sw2 ? 'True' : 'False'}</span>
            <span className="mx-2 text-slate-500">→</span>
            <span className={resultMain ? 'text-yellow-400 font-bold' : 'text-slate-500'}>{resultMain ? 'True' : 'False'}</span>
          </div>
        </div>

        {/* NOT Simulator */}
        <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-200 flex flex-col">
          <h4 className="font-bold text-slate-700 mb-6">จำลอง <code className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded">not</code> (ตัวสลับค่า)</h4>
          
          <div className="flex-grow flex items-center justify-center gap-6 mb-8">
            <button 
              onClick={() => setNotInput(!notInput)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${notInput ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-rose-50 border-rose-400 text-rose-700'}`}
            >
              <span className="font-bold text-lg">{notInput ? 'True' : 'False'}</span>
            </button>

            <ArrowRight className="w-6 h-6 text-slate-300" />
            
            <div className="bg-violet-500 text-white font-mono font-bold px-4 py-2 rounded-lg shadow">not</div>
            
            <ArrowRight className="w-6 h-6 text-slate-300" />

            <div className={`px-6 py-4 rounded-xl border-2 transition-all font-bold text-lg ${resultNot ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-rose-100 border-rose-500 text-rose-700'}`}>
              {resultNot ? 'True' : 'False'}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 text-center shadow-inner mt-auto">
            <span className="text-violet-400 font-bold mr-2">not</span>
            <span className={notInput ? 'text-emerald-400' : 'text-rose-400'}>{notInput ? 'True' : 'False'}</span>
            <span className="mx-2 text-slate-500">→</span>
            <span className={resultNot ? 'text-emerald-400 font-bold' : 'text-rose-400'}>{resultNot ? 'True' : 'False'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function pyUnit4_7_LogicalOps() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม: "ระบบสมัครสมาชิก VIP"
ร้านค้ารับสมัครสมาชิก VIP โดยมีเงื่อนไขว่า ผู้สมัครจะต้อง "อายุ 18 ปีขึ้นไป" และมี "เงินฝากขั้นต่ำ 5000 บาท"

ให้นักเรียนเขียนโปรแกรม:
1. รับค่าอายุ (age) และ เงินฝาก (deposit)
2. ใช้ตัวดำเนินการเปรียบเทียบ (>=) เพื่อเช็คเงื่อนไขแต่ละข้อ
3. นำเงื่อนไขทั้งสองมาเชื่อมกันด้วยตัวดำเนินการทางตรรกะที่เหมาะสม (and หรือ or?)
4. แสดงผลลัพธ์การอนุมัติเป็น True หรือ False

# ตัวอย่างโค้ด:
age = int(input("กรุณากรอกอายุ: "))
deposit = int(input("กรุณากรอกเงินฝาก: "))

# เงื่อนไข
is_adult = age >= 18
has_money = deposit >= 5000

# ใช้ and หรือ or ตรงนี้?
is_approved = is_adult _____ has_money

print(f"ผลการอนุมัติ VIP: {is_approved}")`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-violet-200 selection:text-violet-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-violet-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/70 blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* The 3 Core Operators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* AND */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:border-violet-300 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black font-mono text-violet-600 mb-2">and</h3>
              <h4 className="font-bold text-slate-800 mb-4 text-lg">"ต้องจริงทั้งคู่" (และ)</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                เปรียบเหมือนการตั้งกฎที่เข้มงวด <strong>ถ้ามีเท็จ (False) หลุดมาแม้แต่ตัวเดียว</strong> ผลลัพธ์จะกลายเป็นเท็จทั้งหมดทันที
              </p>
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono border border-slate-100">
                <div className="flex justify-between text-emerald-600"><span>True and True</span> <span>→ True</span></div>
                <div className="flex justify-between text-slate-400 mt-1"><span>True and False</span> <span>→ False</span></div>
                <div className="flex justify-between text-slate-400 mt-1"><span>False and False</span> <span>→ False</span></div>
              </div>
            </div>
          </div>

          {/* OR */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:border-indigo-300 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black font-mono text-indigo-500 mb-2">or</h3>
              <h4 className="font-bold text-slate-800 mb-4 text-lg">"จริงแค่อย่างเดียวก็พอ" (หรือ)</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                เปรียบเหมือนกฎที่ผ่อนปรน <strong>ขอแค่มีจริง (True) ปรากฏขึ้นมาแค่ตัวเดียว</strong> ผลลัพธ์ก็จะกลายเป็นจริงทั้งหมดทันที
              </p>
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono border border-slate-100">
                <div className="flex justify-between text-emerald-600"><span>True or True</span> <span>→ True</span></div>
                <div className="flex justify-between text-emerald-600 mt-1"><span>True or False</span> <span>→ True</span></div>
                <div className="flex justify-between text-slate-400 mt-1"><span>False or False</span> <span>→ False</span></div>
              </div>
            </div>
          </div>

          {/* NOT */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:border-fuchsia-300 hover:shadow-xl transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-50 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black font-mono text-fuchsia-500 mb-2">not</h3>
              <h4 className="font-bold text-slate-800 mb-4 text-lg">"สลับค่า" (ไม่)</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                เป็นตัวดำเนินการที่ใช้กับเงื่อนไขเดียว มีหน้าที่ <strong>สลับหน้ามือเป็นหลังมือ</strong> (นิเสธ) ถ้าเดิมเป็นจริงจะกลายเป็นเท็จ
              </p>
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono border border-slate-100">
                <div className="flex justify-between text-slate-400"><span>not True</span> <span className="text-rose-500">→ False</span></div>
                <div className="flex justify-between text-slate-400 mt-1"><span>not False</span> <span className="text-emerald-500">→ True</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Real World Application */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 flex flex-col md:flex-row gap-8 items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          
          <div className="w-full md:w-1/2 relative z-10 space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
              <Lock className="w-6 h-6" /> ตัวอย่างการใช้ "and" (ระบบ Login)
            </h3>
            <p className="text-slate-400 text-sm">ผู้ใช้จะเข้าระบบได้ ก็ต่อเมื่อใส่ "ชื่อผู้ใช้ถูกต้อง" <strong className="text-emerald-400">และ</strong> "รหัสผ่านถูกต้อง" ทั้งสองอย่างเท่านั้น</p>
            <code className="block bg-black/50 p-4 rounded-xl text-sm font-mono border border-slate-800 text-slate-300">
              user_correct = <span className="text-emerald-400">True</span><br/>
              pass_correct = <span className="text-rose-400">False</span><br/>
              can_login = user_correct <span className="text-violet-400 font-bold">and</span> pass_correct<br/>
              <span className="text-slate-500"># can_login = False</span>
            </code>
          </div>

          <div className="hidden md:block w-px h-48 bg-slate-800 relative z-10"></div>

          <div className="w-full md:w-1/2 relative z-10 space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-fuchsia-300">
              <Gift className="w-6 h-6" /> ตัวอย่างการใช้ "or" (ระบบส่งฟรี)
            </h3>
            <p className="text-slate-400 text-sm">ลูกค้าจะได้ส่งฟรี เมื่อซื้อของ "เกิน 500 บาท" <strong className="text-emerald-400">หรือ</strong> เป็น "สมาชิก VIP" (เข้าเงื่อนไขเดียวก็ได้เลย)</p>
            <code className="block bg-black/50 p-4 rounded-xl text-sm font-mono border border-slate-800 text-slate-300">
              buy_over_500 = <span className="text-rose-400">False</span><br/>
              is_vip = <span className="text-emerald-400">True</span><br/>
              free_shipping = buy_over_500 <span className="text-indigo-400 font-bold">or</span> is_vip<br/>
              <span className="text-slate-500"># free_shipping = True</span>
            </code>
          </div>
        </div>

        {/* Interactive Simulator */}
        <LogicSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}