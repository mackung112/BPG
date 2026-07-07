import React from 'react';
import ActivityDiagramSimulator from './ActivityDiagramSimulator';
import { 
  Frown, 
  Smile, 
  HelpCircle, 
  GitCommit, 
  Layers, 
  Target,
  PlayCircle,
  Square,
  ArrowDown,
  Split,
  Combine,
  Network,
  StopCircle
} from 'lucide-react';

export default function OOAD2_2() {
  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-blue-200 selection:text-blue-900 relative min-h-screen bg-slate-50/50">
      
      {/* Layer 1: Ambient Background Glow Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-100/60 blur-[140px]"></div>
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-sky-50/50 blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-8 sm:pt-12 space-y-10 sm:space-y-12">
        
        {/* =========================================================================
            ปัญหา และ วิธีแก้ปัญหา
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ปัญหา */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                  <Frown className="w-5 h-5 text-rose-600" />
                </div>
                ปัญหา
              </h4>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                บ่อยครั้งที่คุยงานกันแล้วจะสับสนเพราะมันมีขั้นตอนเยอะ และ แต่ละขั้นตอนก็มีรายละเอียดปลีกย่อยอยู่ข้างในด้วย ทำให้เสียเวลาเคลียความเข้าใจกันอยู่นาน และ หลังจากที่คุยกันเสร็จบางทีก็ลืมรายละเอียดบางขั้นตอนไปเสียแล้วทำให้ต้องกลับมาคุยกันใหม่ เป็น<strong className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">ปัญหางูกินหาง</strong> แล้วเราจะจัดการกับปัญหาพวกนี้ยังไงดี?
              </p>
            </div>
          </div>

          {/* วิธีแก้ปัญหา */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Smile className="w-5 h-5 text-emerald-600" />
                </div>
                วิธีแก้ปัญหา
              </h4>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                ผมเชื่อว่าคนเราเห็นภาพแล้วเข้าใจได้ง่ายกว่าเห็นตัวหนังสือ ดังนั้นเราจะใช้แผนภาพที่เรียกว่า <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Activity Diagram</strong> มาช่วยแก้ปัญหาโลกแตกนี้กัน โดยเจ้า activity diagram นั้นจะแปลงเรื่องราวทั้งหมดที่เกิดขึ้นให้กลายเป็นรูปที่เข้าใจง่ายๆนั่นเอง
              </p>
            </div>
          </div>
          
        </div>

        {/* =========================================================================
            Activity Diagram ใช้ยังไง?
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-bl-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              Activity Diagram ใช้ยังไง?
            </h4>
            <p className="text-slate-600 text-[16px] leading-relaxed">
              สมมุติว่าเราต้องเขียนโปรแกรม <strong>Login</strong> ละกัน ซึ่งกระบวนการ login นั้นมันเกี่ยวข้องกับงานในหลายๆส่วน ดังนั้นเราจะลองให้ ดช.แมวน้ำ 🧔 เป็นคนไล่ลำดับการทำงานของตัวโปรแกรมให้ฟังละกันนะ
            </p>
          </div>
        </div>

        {/* =========================================================================
            ลองเขียน Activity Diagram กัน (TIMELINE LAYOUT)
        ========================================================================= */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">ลองเขียน Activity Diagram กัน</h3>
              <p className="text-slate-500 text-sm mt-1">
                มาลองไล่ตามสิ่งที่ ดช.แมวน้ำ จะวาดรูปให้ดูทีละขั้นตอน เพื่อสร้างโครงสร้างของระบบ Login แบบ Step-by-step
              </p>
            </div>
          </div>

          <div className="relative border-l-4 border-indigo-100 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4">
            
            {/* Step 1: Initial Node */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">1</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Initial Node</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      สิ่งแรกที่จะวาดลงไปก็คือจุดเริ่มต้นที่เป็น <strong>วงกลมทึบ</strong> เพื่อบอกว่าการทำงานมันจะเริ่มที่จุดนี้นะ
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LsfCybVQvkuYiz8KWOA%252Fimage.png%3Fgeneration%3D1583529174513045%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=db34d04&sv=2" 
                    alt="Initial Node" 
                    className="w-full max-w-[140px] object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Action */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">2</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <Square className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Action</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      การที่จะทำการ login ได้นั้นจะต้องเริ่มที่หน้า Login ดังนั้นถัดไปเราก็จะวาดรูป <strong>วงรี</strong> แล้วเขียนว่า เปิดหน้า Login เพื่อกำหนดว่าขั้นตอนนี้มันคืออะไรลงไป
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LrKRVAybN70BOfQF0bt%252Fimage.png%3Fgeneration%3D1583529147389251%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=abd6de36&sv=2" 
                    alt="Action" 
                    className="w-full max-w-[160px] object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Control Flow */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">3</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <ArrowDown className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Control Flow</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ในตัวระบบนี้ถ้าผู้ใช้เข้ามาและยังไม่ได้ login ระบบจะพาเข้าไปที่หน้า Login ดังนั้นเราก็จะ <strong>ลากเส้น</strong> จากจุดเริ่มต้นไปยังกล่องแสดงหน้า login เพื่อบอกว่าโปรแกรมจะพาผู้ใช้ไปในทิศทางไหนนั่นเอง
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LqC70xV8RQhCabsh5r1%252Fimage.png%3Fgeneration%3D1583529165738767%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=8642afeb&sv=2" 
                    alt="Control Flow" 
                    className="w-full max-w-[140px] object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Guard Condition */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">4</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Guard Condition</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ในเส้นที่พึ่งวาดลงไปเราสามารถเขียน <strong>เงื่อนไขกำกับบนเส้น</strong> ได้ว่าเฉพาะผู้ใช้ที่ยังไม่ได้ login เท่านั้นนะถึงจะวิ่งมาเส้นนี้ได้ด้วยนะ
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LsoP49N0A-zXQT0q6ck%252Fimage.png%3Fgeneration%3D1583529162337788%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=a73f9c62&sv=2" 
                    alt="Guard Condition" 
                    className="w-full max-w-[140px] object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Decision Node */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">5</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-orange-50 text-orange-600 transform rotate-45">
                      <Square className="w-4 h-4 -rotate-45" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Decision Node</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ถัดมาผู้ใช้ก็ทำการกรอกข้อมูลชื่อผู้ใช้และรหัสผ่านของเขาลงไปแล้วก็กดปุ่มเข้าสู่ระบบ สิ่งที่ระบบจะทำต่อก็คือตรวจสอบว่าถูกต้องสามารถเข้าสู่ระบบได้หรือเปล่า
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LoAW7-rayvpYBP5DJts%252Fimage.png%3Fgeneration%3D1583529176008680%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=3062766c&sv=2" 
                    alt="Decision Node 1" 
                    className="w-full max-w-[500px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full space-y-4 mt-2">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      คราวนี้ระบบก็จะต้องตัดสินใจว่าข้อมูลที่ใส่เข้ามาถูกต้องหรือเปล่าโดยการวาดรูป <strong>Diamond</strong> ลงไป และลากเส้นผลลัพธ์ที่เป็นไปได้ออกมา ซึ่งในกรณีนี้ ถ้า login ได้ระบบก็จะพาไปหน้า Dashboard แต่ถ้าไม่ได้ระบบก็จะแจ้งเตือนข้อผิดพลาดแล้วยังอยู่ที่หน้า Login เช่นเดิม
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-Lv0Seje4gD41zmLB2Py%252Fimage.png%3Fgeneration%3D1583529137683716%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=6386bd2b&sv=2" 
                    alt="Decision Node 2" 
                    className="w-full max-w-[500px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 6: Final Node */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">6</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                      <StopCircle className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Final Node</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      สุดท้ายเมื่ออยู่ในหน้า Dashboard แล้วก็จะถือว่าการทำงานทั้งหมดในกระบวนการ login นั้นจบละ ดังนั้นเราก็จะวาด <strong>วงกลมซ้อนกัน</strong> แล้วลากเส้นไปใส่มันเพื่อบอกว่ากระบวนการทำงานเรื่องนี้จบลงแล้วนั่นเอง
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-Lps2h-BEOQcY_WHOrSi%252F-LpsDkgTsMEsu6mTzRHJ%252Fimage.png%3Falt%3Dmedia%26token%3D9582d68b-7d7c-4ebb-b828-fa035263f2bf&width=768&dpr=3&quality=100&sign=9bc71d14&sv=2" 
                    alt="Final Node" 
                    className="w-full max-w-[600px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full bg-rose-50 border-l-4 border-rose-400 p-5 rounded-r-xl shadow-sm mt-2">
                  <p className="text-rose-800 text-[14px] leading-relaxed">
                    เห็นไหมว่าแทนที่จะเขียนข้อความยาวๆ ตั้งแต่เริ่มต้น ทำไมเราไม่เอารูปสุดท้ายนี้มาให้ดูตั้งแต่แรก เพราะมันอ่านแล้วเข้าใจได้เลยโดยที่ไม่ต้องมีคนมาอธิบายอะไรต่อนั่นเอง
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            Activity Diagram มีแค่นี้เหรอ ?
        ========================================================================= */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-violet-100 text-violet-600">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Activity Diagram มีแค่นี้เหรอ ?</h3>
              <p className="text-slate-500 text-sm mt-1">
                จริงๆมันก็เพียงพอต่อการใช้งาน 80% แล้วล่ะ ส่วนที่เหลือมันเป็นตัวเสริมให้เราสามารถลงรายละเอียดได้ชัดขึ้น
              </p>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Swimlane and Partition */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <Split className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-xl text-slate-800">Swimlane and Partition</h5>
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                ในบางครั้งเราอาจจะต้องแบ่งแยกการทำงานออกเป็นสัดเป็นส่วนให้ชัดเจนมากยิ่งขึ้น ซึ่ง activity diagram สามารถแบ่งกลุ่มได้โดยใช้ <strong>Swimlane</strong>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[14px] leading-relaxed pt-1">
                      ในตัวอย่างการ Login ถ้าเราแบ่งกลุ่มเป็นงานของ Front-end, Back-end และตัว Database เราก็จะได้หน้าตาแบบนี้
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                    <img 
                      src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-M0hvnd9HBs70tc-3RW1%252Fimage.png%3Fgeneration%3D1583529136567620%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=b12806a9&sv=2" 
                      alt="Swimlane 1" 
                      className="rounded-xl w-full object-contain mix-blend-multiply" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[14px] leading-relaxed pt-1">
                      หรือเราจะทำการแบ่งกลุ่มแบบแนวนอนเพื่อแยกสถานะว่าผู้ใช้อยู่ในสถานะไหนก็ได้นะ
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                    <img 
                      src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LpsByzxjoF5dKRAV5mH%252Fimage.png%3Fgeneration%3D1583529173294540%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=9ad25181&sv=2" 
                      alt="Swimlane 2" 
                      className="rounded-xl w-full object-contain mix-blend-multiply" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fork Node */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-2 rounded-xl bg-fuchsia-50 text-fuchsia-600">
                    <Network className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-xl text-slate-800">Fork Node</h5>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🧔</span>
                  <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                    ในบางทีการทำงานของเราก็จะทำงานพร้อมๆกัน (parallel) เราสามารถวาดรูปเส้นทึบยาวๆแล้วโยงออกไปยังการทำงานที่จะทำพร้อมกันได้เลย เช่น เงินในบัญชีถูกถอนออก ระบบต้องบันทึกข้อมูล พร้อมส่งแจ้งเตือนผู้ใช้ทันที
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LrKN7B4Dc1moHCExmIp%252Fimage.png%3Fgeneration%3D1583529116600388%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=bfdc3e0d&sv=2" 
                  alt="Fork Node" 
                  className="w-full max-w-[500px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Join Node */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Combine className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-xl text-slate-800">Join Node</h5>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🧔</span>
                  <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                    หลังจากที่ทำงานแบบ Parallel เสร็จแล้ว บางครั้งก็ต้องรอจนกว่าจะเสร็จพร้อมกันแล้วค่อยเริ่มขั้นถัดไป โดยเราจะวาดเส้นทึบเหมือนเดิมแล้วลากเส้นจากการทำงานที่ถูกแยกออกไปกลับมารวมกันอีกครั้ง
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-Lq70K9TIXhDRBsz9xdo%252Fimage.png%3Fgeneration%3D1583529124363682%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=bb871d69&sv=2" 
                  alt="Join Node" 
                  className="w-full max-w-[500px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Merge Node */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-2 rounded-xl bg-orange-50 text-orange-600 transform rotate-45">
                    <Square className="w-4 h-4 -rotate-45" />
                  </div>
                  <h5 className="font-bold text-xl text-slate-800">Merge Node</h5>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🧔</span>
                  <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                    หลังจากที่มีการแยกการทำงานออกจากการตัดสินใจแล้ว เราก็สามารถนำการทำงานกลับมารวมกันใหม่ก็ได้ โดยการใช้สัญลักษณ์ <strong>Diamond</strong> เหมือนเดิม แล้วลากเส้นที่เคยแยกออกไปกลับมารวมกัน
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LshaCEatacVUMrxEhrp%252Fimage.png%3Fgeneration%3D1583529159471448%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=d050791f&sv=2" 
                  alt="Merge Node" 
                  className="w-full max-w-[500px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            Simulator
        ========================================================================= */}
        <ActivityDiagramSimulator />

        {/* =========================================================================
            บทสรุป
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 pointer-events-none"></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              บทสรุป
            </h4>
            <p className="text-slate-600 leading-relaxed text-[16px] mb-6">
              จากตัวอย่างทั้งหมดเราจะเห็นว่าจริงๆแล้วเราสามารถใช้ <strong>Activity Diagram</strong> กับการอธิบายการทำงานเรื่องอะไรก็ได้ให้กลายเป็นภาพที่ดูแล้วเข้าใจได้เลย ดังนั้นต่อไปเวลาเราอธิบายอะไรก็ลองหัดเปลี่ยนมาใช้แผนภาพแทนนะ
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl shadow-sm mb-6">
              <p className="text-amber-800 text-[15px] leading-relaxed font-bold mb-1">คำเตือน ⚠️</p>
              <p className="text-amber-700 text-[14px] leading-relaxed">
                เวลาที่เราเขียน Diagram ต่างๆ ห้ามเอาทุกกระบวนการทำงานมาเขียนยำกันไว้ในภายใน diagram เดียวกัน เพราะมันจะกลายเป็นแผนภาพพาทัวร์นรก เส้นมันจะยุ่งเหยิงไม่รู้จุดเริ่มต้นแต่ละเรื่องคืออะไร
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed text-[15px]">
              สิ่งที่ควรทำคือ <strong className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">เขียน 1 กระบวนการทำงานต่อ 1 diagram เท่านั้น</strong> เพื่อช่วยให้เรา focus กับแต่ละกระบวนการทำงานได้ชัดเจนขึ้น
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
