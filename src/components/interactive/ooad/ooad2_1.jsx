import React from 'react';
import { 
  Frown, 
  Smile, 
  HelpCircle, 
  Layers, 
  GitCommit, 
  ArrowRightLeft, 
  Users, 
  Box, 
  Wrench, 
  Target,
  ZoomIn,
  CheckCircle2,
  Cpu,
  MonitorPlay
} from 'lucide-react';

export default function OOAD2_1() {
  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative min-h-screen bg-slate-50/50">
      
      {/* Layer 1: Ambient Background Glow Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-violet-100/60 blur-[140px]"></div>
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-rose-50/50 blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-8 sm:pt-12 space-y-12 sm:space-y-16">
        


        {/* =========================================================================
            ปัญหา และ วิธีแก้ปัญหา
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ปัญหา */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5 group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-50 rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center">
                  <Frown className="w-6 h-6 text-rose-600" />
                </div>
                ปัญหา
              </h4>
              <p className="text-slate-600 text-[16px] leading-relaxed">
                ปัญหาที่ developer เจอนั้นมีหลายเรื่องเลย และส่วนหนึ่งจะเกิดจาก <strong className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">การคุยกันไม่รู้เรื่องของเหล่า developer ด้วยกันเอง</strong> สาเหตุนั้นเป็นเพราะ งานที่ developer ทำจริงๆแล้วมันไม่ใช่งานที่จับต้องได้ เพราะมันเป็น <strong>Logical</strong> ที่อยู่ในโค้ดเพียงอย่างเดียว และโค้ดทั้งหมดที่ประกอบกันเป็นโปรแกรม มันก็มีโครงสร้างที่ซับซ้อนยากต่อการอธิบาย และกว่าจะรู้ตัวว่าทำงานไม่ถูกบางทีก็จะไปพบว่ามันเป็น bug ในตัวแอพที่มีคนมาใช้งานจริงๆแล้ว ดังนั้นในคอร์สนี้เราจะมาดูหนึ่งในวิธีการแก้ปัญหาในเรื่องการสื่อสาร เพื่อป้องกันไม่ให้ทำผิดแล้วต้องเสียเวลากลับมาแก้ภายหลัง
              </p>
            </div>
          </div>

          {/* วิธีแก้ปัญหา */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5 group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <Smile className="w-6 h-6 text-emerald-600" />
                </div>
                วิธีแก้ปัญหา
              </h4>
              <p className="text-slate-600 text-[16px] leading-relaxed">
                สาเหตุหลักๆที่คุยกันไม่เข้าใจ หรือ เสียเวลาอธิบายกันนานนั้นมีสาเหตุมาจาก ตัวโค้ดของโปรแกรมมันจับต้องไม่ได้ มันเป็นแค่ตัวหนังสือที่อยู่ในคอม ต้องเสียเวลาในการทำความเข้าใจว่าอะไรมันเชื่อมต่อกันยังไงบ้างนั่นเอง ซึ่งจากปัญหาที่ว่ามานี้เราจะใช้สิ่งที่เรียกว่า <strong className="text-emerald-700">Unified Modeling Language</strong> หรือที่เรียกกันติดปากว่า <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-lg tracking-wider">UML</strong> เป็นตัวอธิบายแทนโค้ดของเราทั้งหมด โดยเจ้า UML นั้นจะแปลงของที่เข้าใจยากๆเหล่านั้นให้กลายเป็นรูปภาพที่ developer สากลทั่วโลกดูแล้วจะเข้าใจในระดับนึงนั่นเอง ดังนั้นถ้าเราเอา UML เข้ามาใช้มันจะทำให้ทุกคนในทีมสามารถเข้าใจสิ่งต่างๆได้ตรงจุดมากขึ้น และข้อดีที่สุดของมันคือ <strong className="text-emerald-600 border-b border-emerald-300 pb-0.5">ทีมสามารถป้องกันข้อผิดพลาดได้ก่อนที่มันจะเกิดเสียอีก</strong> เพราะแผนภาพมันจะฟ้องว่าทีมเข้าใจติดตรงไหน
              </p>
            </div>
          </div>
          
        </div>

        {/* =========================================================================
            UML คืออะไร ?
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50/60 rounded-bl-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col xl:flex-row gap-10 items-center">
            <div className="flex-1 space-y-6">
              <h4 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-100 text-cyan-600">
                  <HelpCircle className="w-7 h-7" />
                </div>
                UML คืออะไร ?
              </h4>
              <p className="text-slate-600 text-lg leading-relaxed">
                <strong>UML</strong> มันคือภาษาชนิดหนึ่ง ไม่ใช่ภาษาที่เอามาเขียนโปรแกรมนะ แต่เป็นภาษาที่เอาไว้อธิบายของต่างๆให้ออกมาเป็นแผนภาพ ซึ่งตัวมันเองมีวิธีการอธิบายความสัมพันธ์แบบต่างๆไว้เต็มไปหมดเลย ดังนั้นเดี๋ยวเราจะลองไปดูรายละเอียดคร่าวๆของแต่ละตัวกันก่อนว่ามันใช้ทำอะไรได้บ้างก่อนที่จะลงลึกในแต่ละตัว
              </p>
              <div className="bg-cyan-50/80 p-5 rounded-2xl border border-cyan-100">
                <p className="text-slate-600 leading-relaxed">
                  ในคอร์สนี้ผมคงไม่ร่ายยาวประวัติ UML ให้ฟังเพราะหาอ่านได้ตาม Google เลย แต่แค่จะบอกว่ามันมีวิวัฒนาการมาหลายๆเวอร์ชั่น ส่วนรายละเอียด UML อ่านได้จากเว็บนี้ได้เลย <a href="https://www.uml.org" target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-cyan-700 font-bold hover:underline transition-colors underline-offset-4">https://www.uml.org</a>
                </p>
              </div>
            </div>
            
            <div className="w-full xl:w-[50%] p-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner group">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LpMgV35gMr5WaM2ev7J%252Fimage.png%3Fgeneration%3D1583529133135177%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=fa0485bd&sv=2" 
                  alt="UML Overview" 
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            UML ใช้อธิบายอะไรได้บ้าง ?
        ========================================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="p-4 rounded-full bg-violet-100 text-violet-600 mb-2">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800">UML ใช้อธิบายอะไรได้บ้าง ?</h3>
            <p className="text-slate-500 text-lg max-w-3xl">
              ตัว UML สามารถอธิบายความสัมพันธ์สิ่งของต่างๆที่เกี่ยวข้องกันได้หลายวิธี ซึ่งแต่ละแผนภาพของ UML ก็จะเหมาะสมกับรายละเอียดในมุมมองแต่ละแบบ ดังนั้นเราจะล่องไล่ดูตัวอย่างแผนภาพที่ได้ใช้กันบ่อยๆดูก่อนเลยละกัน
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Activity Diagram */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <GitCommit className="w-7 h-7" />
                  </div>
                  <h5 className="font-bold text-2xl text-slate-800">Activity Diagram</h5>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">
                  เป็นแผนภาพที่เอาไว้ <strong className="text-blue-600">อธิบายทิศทางในการทำงาน</strong> หรือที่เราเรียกกันว่า <strong className="text-blue-600">Workflow</strong> นั่นเอง ดังนั้นเราลองมาดูว่าถ้าเราไม่ใช้ activity diagram ผมจะต้องอธิบายการทำงานไว้แบบนี้
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <p className="font-bold text-slate-800 mb-2">ตัวอย่างการอธิบาย</p>
                  <p className="text-slate-600 leading-relaxed text-sm">ได้เมื่อไหร่ก็ตามที่ได้รับเงินจากแม่จะต้องไปซื้อไข่ที่ตลาดจำนวน 1 แผง จากร้านไหนก็ได้ที่เปิดขายไข่อยู่ แล้วถ้าเจอพ่อที่ตลาดให้เอาเงินให้พ่อให้หมดเลยแล้วกลับบ้านซะไม่ต้องซื้ออะไรอีก ส่วนถ้าฝนตกไม่ต้องไปตลาดและเอาเงินคืนแม่ซะ</p>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">แล้วลองเปรียบเทียบกับการเอา activity diagram มาใช้อธิบายตามรูปด้านล่าง ก็จะเห็นว่าคำอธิบายวุ่นวายๆนั้นหายไปหมดเลย</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm cursor-pointer relative overflow-hidden group/img mt-auto">
                <div className="absolute inset-0 bg-blue-500/0 group-hover/img:bg-blue-500/5 transition-colors z-10 rounded-3xl pointer-events-none flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-blue-600 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 drop-shadow-md" />
                </div>
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-Ln6uEwC_G5kpaIPpZYJ%252Fimage.png%3Fgeneration%3D1583529162408139%26alt%3Dmedia&width=768&dpr=1&quality=100&sign=de8d2adf&sv=2" 
                  alt="Activity Diagram Example" 
                  className="rounded-2xl w-full object-contain bg-white transition-transform duration-700 group-hover/img:scale-[1.02] shadow-sm border border-slate-100" 
                />
              </div>
            </div>

            {/* Sequence Diagram */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-all">
                    <ArrowRightLeft className="w-7 h-7" />
                  </div>
                  <h5 className="font-bold text-2xl text-slate-800">Sequence Diagram</h5>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">
                  เป็นแผนภาพที่ใช้อธิบาย <strong className="text-indigo-600">การคุยกันระหว่างงานแต่ละส่วน</strong> ดังนั้นเราลองมาดูว่าถ้าเราไม่ใช่ sequence diagram ผมจะต้องอธิบายการทำงานไว้แบบนี้
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <p className="font-bold text-slate-800 mb-2">ตัวอย่างการอธิบาย</p>
                  <p className="text-slate-600 leading-relaxed text-sm">ผู้ใช้ทำการใส่ชื่อผู้ใช้และรหัสผ่านเพื่อทำการเข้าสู่ระบบ เมื่อกดปุ่มเข้าสู่ระบบแล้ว ตัวโปรแกรมจะทำการป้องกันรหัสผ่านไม่ให้รั่วไหลโดยการเข้ารหัสผ่านเอาไว้ แล้วค่อยส่งข้อมูลทั้งหมดต่อให้กับเซิฟเวอร์ แล้วเซิฟเวอร์จะทำการดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยอ้างจากชื่อผู้ใช้ที่ทำการกรอกเข้ามา แล้วค่อยทำการตรวจสอบว่ารหัสผ่านที่เข้ารหัสทั้งสองตรงกันหรือเปล่า สุดท้ายระบบก็จะส่งผลลัพท์กลับไปให้หน้าเว็บทำการแสดงผลการเข้าสู่ระบบ</p>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">แล้วลองเปรียบเทียบกับการเอา sequence diagram มาใช้อธิบายตามรูปด้านล่าง ก็จะเห็นว่าคำอธิบายวุ่นวายๆนั้นหายไปหมดเลย</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm cursor-pointer relative overflow-hidden group/img mt-auto">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-LpnRbcgAcdvuV7yZKs2%252F-Lpncvn4XAE2h84xuytJ%252Fdigram-1.png%3Falt%3Dmedia%26token%3D2e06a8ea-074f-4070-a4e2-65c112858dbf&width=768&dpr=1&quality=100&sign=8bdf075d&sv=2" 
                  alt="Sequence Diagram Example" 
                  className="rounded-2xl w-full object-contain bg-white transition-transform duration-700 group-hover/img:scale-[1.02] shadow-sm border border-slate-100" 
                />
              </div>
            </div>

            {/* Use case Diagram */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Users className="w-7 h-7" />
                  </div>
                  <h5 className="font-bold text-2xl text-slate-800">Use case Diagram</h5>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">
                  เป็นแผนภาพที่ใช้อธิบายว่า <strong className="text-emerald-600">ในระบบมีใครทำอะไรกันได้บ้าง</strong> ดังนั้นเราลองมาดูว่าถ้าเราไม่ใช่ use case diagram ผมจะต้องอธิบายการทำงานไว้แบบนี้
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                  <p className="font-bold text-slate-800 mb-2">ตัวอย่างการอธิบาย</p>
                  <p className="text-slate-600 leading-relaxed text-sm">ในระบบโทรศัพท์มีเรื่องที่ทำได้ 3 เรื่องคือ การจัดการเรื่องการโทร การจัดการเรื่องข้อความ และ ค่าโทรศัพท์ แต่ตัวมือถือจะเป็นตัวที่จัดการเรื่อง การโทร และ เรื่องข้อความต่างๆให้ โดยที่ผู้ใช้มีหน้าที่แค่จ่ายเงินค่าโทรศัพท์อย่างเดียวก็พอ</p>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">แล้วลองเปรียบเทียบกับการเอา use case diagram มาใช้อธิบายตามรูปด้านล่าง ก็จะเห็นว่าคำอธิบายวุ่นวายๆนั้นหายไปหมดเลย</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm cursor-pointer relative overflow-hidden group/img mt-auto">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LqpTTlmFpAo_9SEiTVf%252Fimage.png%3Fgeneration%3D1583529178223326%26alt%3Dmedia&width=768&dpr=1&quality=100&sign=12eb2f2d&sv=2" 
                  alt="Use case Diagram Example" 
                  className="rounded-2xl w-full object-contain bg-white transition-transform duration-700 group-hover/img:scale-[1.02] shadow-sm border border-slate-100" 
                />
              </div>
            </div>

            {/* Class Diagram */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center border border-fuchsia-100 shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-all">
                    <Box className="w-7 h-7" />
                  </div>
                  <h5 className="font-bold text-2xl text-slate-800">Class Diagram</h5>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">
                  เป็นแผนภาพที่ใช้อธิบายว่า <strong className="text-fuchsia-600">ในระบบมีคลาสอะไรอยู่บ้างและแต่ละคลาสมีความสัมพันธ์กันยังไง</strong> ดังนั้นเราลองมาดูว่าถ้าเราไม่ใช่ class diagram ผมจะต้องอธิบายการทำงานไว้แบบนี้
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500"></div>
                  <p className="font-bold text-slate-800 mb-2">ตัวอย่างการอธิบาย</p>
                  <p className="text-slate-600 leading-relaxed text-sm">ในระบบมีคลาส 3 คลาสคือ คลาสหมา คลาสแมว และ คลาสสัตว์ โดยที่คลาสหมากับแมวสืดทอดมากจากคลาสสัตว์ด้วยกันทั้งคู่ และคลาสหมากับแมวสามารถส่งเสียงร้องของมันเองได้หรือจะใช้ความสามารถที่สืบทอดจากคลาส์แม่ก็ได้ โดยที่คลาสสัตว์เป็น abstract ด้วยนะ</p>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">หรือทั้งหมดที่ยกตัวอย่างมาผมสามารถเขียนโค้ดให้เข้าใจง่ายๆได้ว่า</p>
                
                {/* Code Block - Light Theme Styling */}
                <div className="bg-[#1e1e2e] p-6 rounded-2xl border border-slate-800 shadow-xl mb-6 relative overflow-hidden group/code">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="ml-2 text-xs font-mono text-slate-400">Animal.cs</span>
                  </div>
                  <pre className="text-[14px] font-mono text-indigo-300 leading-relaxed overflow-x-auto">
{`public abstract class Animal
{
    public virtual void Goes()
    {
        Console.WriteLine("ส่งเสียงร้อง");
    }
}

public class Dog : Animal
{
    public override void Goes()
    {
        Console.WriteLine("โฮ่งๆ");
    }
}

public class Cat: Animal
{
    public override void Goes()
    {
        Console.WriteLine("เหมี๊ยวๆ");
    }
}`}
                  </pre>
                </div>
                <p className="mb-6 text-slate-600 text-[16px] leading-relaxed">แล้วลองเปรียบเทียบกับการเอา class diagram มาใช้อธิบายตามรูปด้านล่าง ก็จะเห็นว่าคำอธิบายวุ่นวายๆนั้นหายไปหมดเลย และ แค่ดูแผนภาพปุ๊ปก็เข้าใจได้เลยว่ามีคลาสอะไรอยู่บ้างและความสัมพันธ์มันเป็นยังไงโดยที่ไม่ต้องไปไล่อ่านโค้ดเลย</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm cursor-pointer relative overflow-hidden group/img mt-auto">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LnS9yccAgFh-JV_20hw%252Fimage.png%3Fgeneration%3D1583529179265608%26alt%3Dmedia&width=768&dpr=1&quality=100&sign=fb12f774&sv=2" 
                  alt="Class Diagram Example" 
                  className="rounded-2xl w-full object-contain bg-white transition-transform duration-700 group-hover/img:scale-[1.02] shadow-sm border border-slate-100" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            แผนภาพมีเพียงแค่นี้เองเหรอ? & เนื้อหาของคอร์สทั้งหมด
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h4 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
                <HelpCircle className="w-7 h-7" />
              </div>
              แผนภาพมีเพียงแค่นี้เองเหรอ?
            </h4>
            
            <p className="mb-10 text-slate-600 text-lg leading-relaxed">
              ใจเย็นโยม มีอีกเพียบให้ศึกษาเลย นี่แค่เป็นเพียงน้ำจิ้มให้เห็นถึงพลังของ UML ที่ทำให้ทีมเข้าใจของหลายๆอย่างได้เร็วขึ้นเท่านั้น และในแต่ละแผนภาพนั้นก็มีรายละเอียดในการอธิบายอยู่เยอะเลยล่ะ ดังนั้นเดี๋ยวเราไปดูรายละเอียดของแต่ละแผนภาพกันเลยละกัน
            </p>
            
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                เนื้อหาของคอร์สทั้งหมด
              </h3>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl mb-10 shadow-sm">
                <p className="text-blue-800 text-[16px] leading-relaxed">
                  เรื่อง diagram ต่างๆขอสอนเท่าที่ได้ใช้กันบ่อยๆ และเป็นพื้นฐานก่อนนะ ไว้มีเวลาแล้วจะมาเพิ่มให้มันครบทุกตัวภายหลัง ถ้าไม่อยากพลาดบทความดีๆ ก็ไปกดติดตามได้จากลิงค์นี้เบย <a href="https://facebook.com/mr.saladpuk" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 font-bold underline decoration-blue-300 underline-offset-4 transition-colors">Saladpuk Facebook</a>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Activity Diagram', path: '/basic/uml/activity-diagram.md', color: 'text-blue-600' },
                  { name: 'Class Diagram', path: '/basic/uml/class-diagram.md', color: 'text-fuchsia-600' },
                  { name: 'Sequence Diagram', path: '/basic/uml/sequence-diagram.md', color: 'text-indigo-600' },
                  { name: 'Use case Diagram', path: '/basic/uml/use-case-diagram.md', color: 'text-emerald-600' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-center hover:bg-white hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className={`font-bold mb-2 text-lg ${item.color}`}>{item.name}</div>
                    <div className="text-sm text-slate-500 font-mono bg-white border border-slate-100 px-3 py-1.5 rounded-lg w-max shadow-sm">{item.path}</div>
                  </div>
                ))}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-center md:col-span-2 hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group">
                  <div className="text-emerald-700 font-bold mb-2 text-xl flex items-center gap-2">
                    <Target className="w-5 h-5" /> บทสรุปการใช้ UML
                  </div>
                  <div className="text-sm text-emerald-600 font-mono bg-white/60 border border-emerald-100 px-3 py-1.5 rounded-lg w-max shadow-sm">/basic/uml/summary.md</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            สร้าง UML ใช้โปรแกรมอะไรได้บ้าง?
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h4 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
                <Wrench className="w-7 h-7" />
              </div>
              สร้าง UML ใช้โปรแกรมอะไรได้บ้าง?
            </h4>
            <p className="mb-8 text-slate-600 text-lg">
              มีโปรแกรมอยู่ยั้วเยี้ยบทเน็ทเลย ลอง search หาดูเอาละกันทั้งฟรีและไม่ฟรี ซึ่งตัวที่แนะนำก็จะขอแบ่งเป็น 2 หมวดละกันคือ
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-white transition-all">
                <h4 className="text-xl font-bold text-orange-600 mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-orange-400 rounded-full"></span>
                  สร้างแผนภาพจาก text
                </h4>
                <ul className="space-y-4 text-slate-600 text-[16px]">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="http://plantuml.com" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">Plant UML</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="https://github.com/knsv/mermaid" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">MermaidJS</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="http://flowchart.js.org/" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">FlowChart.JS</a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-white transition-all">
                <h4 className="text-xl font-bold text-orange-600 mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-orange-400 rounded-full"></span>
                  สร้างแผนภาพจาก เครื่องมือ
                </h4>
                <ul className="space-y-4 text-slate-600 text-[16px]">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="https://www.lucidchart.com" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">Lucidchart (online)</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="https://creately.com/" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">Creately.com (online)</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="https://www.draw.io/" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">Draw.io (online)</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="http://staruml.io/" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">Start UML (app)</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <a href="https://www.microsoft.com/th-th/p/visio-standard-2019/cfq7ttc0k7cf" target="_blank" rel="noreferrer" className="hover:text-orange-600 hover:underline underline-offset-4 decoration-orange-300 transition-colors">Visio (app)</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-3xl shadow-sm relative overflow-hidden">
              <p className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-3">
                <span className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                  <Target className="w-6 h-6" />
                </span> 
                โปรแกรมที่แนะนำ
              </p>
              <p className="text-emerald-800 text-[16px] leading-relaxed relative z-10">
                ตัวที่ผมชอบใช้จริงๆมี 2 ตัวคือ <strong className="text-emerald-700 bg-emerald-100/50 px-2 rounded">Plant UML</strong> กับ <strong className="text-emerald-700 bg-emerald-100/50 px-2 rounded">Star UML</strong> ซึ่งแต่ก่อนชอบ <strong>Star UML</strong> มากเพราะลากวางแล้วสวยมากครับฟรีด้วย (แต่ก็มีให้จ่ายเงินเหมือนกันนะ) แต่หลังๆมาชอบใช้ <strong className="text-emerald-700 bg-emerald-100/50 px-2 rounded">Plant UML</strong> มากกว่าเพราะเวลาที่ผมแก้ไข diagram มันไม่ต้องมาคอยจัดตำแหน่งเส้นต่างๆ เพราะโปรแกรมมันจะจัดการให้หมดเรามีหน้าที่แค่พิมพ์ของที่เราอยากได้แค่นั้นเอง ทำให้ผมลดเวลาในการทำงานลงไปได้เยอะมาก
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            บทสรุป
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full z-0 pointer-events-none"></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-rose-600" />
              </div>
              บทสรุป
            </h4>
            <p className="text-slate-600 leading-relaxed text-lg">
              ตัว UML มันสามารถใช้อธิบายของหลายๆอย่างได้ทั้งที่เกี่ยวและไม่เกี่ยวกับโปรแกรมนะ เพียงแค่มันถูกออกแบบมาให้ใช้อธิบายเรื่องโครงสร้างและความสัมพันธ์ของโปรแกรมเฉยๆ แต่จากในตัวอย่างก็น่าจะพอเห็นภาพแล้วว่า <strong className="text-rose-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100 shadow-sm">ภาพมันเข้าใจได้มากกว่าคำพูด</strong> เพราะการอธิบายยาวๆนั้นคนส่วนใหญ่จะต้องคอยจินตนาการตาม แต่ถ้าเรามีแผนภาพเราจะเข้าใจสิ่งต่างๆได้เร็วขึ้นนั่นเอง
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
