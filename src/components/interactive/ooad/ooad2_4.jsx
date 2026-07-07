import React, { useState } from 'react';
import { 
  Frown, 
  Smile, 
  HelpCircle, 
  GitCommit, 
  User, 
  Box, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Server,
  FileCode,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { SimulatorShell, ConceptCard, AmbientBackdrop } from '../shared';

export default function OOAD2_4() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Actor (User)",
      desc: "ในการเขียน sequence diagram นั้นเราจะต้องเริ่มวาดจากสิ่งที่เริ่มต้นกระบวนการก่อน ซึ่งในการ login นั้นจุดเริ่มต้นของมันคือมีผู้ใช้เข้ามานั่นเอง ดังนั้นเราก็จะวาดรูป ผู้ใช้ (User) เป็นสิ่งแรกลงไป",
      dialog: "🧔 เริ่มแรกเราต้องวาดผู้ใช้งานระบบ (User) ที่เป็นจุดเริ่มต้นกระบวนการ",
      highlight: ["user"]
    },
    {
      title: "2. Lifeline (Login page)",
      desc: "หลังจากที่มีผู้ใช้เข้ามาในระบบแล้ว ระบบก็จะเปิดหน้า Login page มาให้ผู้ใช้เห็น ดังนั้นเราก็จะวาดกล่องของหน้า Login page เข้าไปพร้อมเส้นประ (Lifeline) เพื่อบอกช่วงเวลาการคงอยู่ของคอมโพเนนต์",
      dialog: "🧔 วาดกล่องของ Login page และลากเส้นประแนวตั้ง (Lifeline) ลงมานะ",
      highlight: ["user", "loginPage"]
    },
    {
      title: "3. Message (1 : กดปุ่มเข้าสู่ระบบ)",
      desc: "ถัดไปผู้ใช้ก็จะทำการกรอกข้อมูลและกดปุ่มเข้าสู่ระบบซึ่งเป็นการทำงานระหว่าง User กับ Login page โดยวาดเป็นลูกศรเส้นทึบหัวปิด ชี้ทิศทางการส่งข้อมูล หมายเลข 1 : กดปุ่มเข้าสู่ระบบ",
      dialog: "🧔 ลากเส้นลูกศรส่งข้อความ 1 : กดปุ่มเข้าสู่ระบบ จาก User ไปที่ Login page",
      highlight: ["user", "loginPage", "message1"]
    },
    {
      title: "4. Activations (Login page)",
      desc: "หลังจากที่ Login page ถูกเรียกแล้ว มันก็จะเริ่มต้นทำงานต่อ โดยเราจะวาดกล่องครอบบนเส้นประของ Login page (เรียกว่า Activation Bar) เพื่อแสดงให้เห็นว่าคอมโพเนนต์นี้กำลังทำหน้าที่อยู่",
      dialog: "🧔 วาดกล่อง Activation Bar ครอบทับเส้นประของ Login page นับจากขั้นตอนที่ 1 เป็นต้นไป",
      highlight: ["user", "loginPage", "message1", "loginPageActivation"]
    },
    {
      title: "5. Self Message (2 : ตรวจสอบว่าข้อมูลกรอกครบหรือยัง)",
      desc: "สิ่งแรกที่หน้า Login page จะทำก็คือตรวจสอบว่าข้อมูลที่ผู้ใช้กรอกมานั้นครบหรือยัง ซึ่งการทำงานนี้มันจะทำงานภายในตัวเอง จึงวาดเป็นลูกศรวนกลับเข้าหาตัวเอง เรียกว่า Self Message หมายเลข 2",
      dialog: "🧔 วาดลูปตรวจสอบตนเองหมายเลข 2 บน Login page",
      highlight: ["user", "loginPage", "message1", "loginPageActivation", "message2"]
    },
    {
      title: "6. alt Fragment & Message 3 (แจ้งเตือนว่าต้องกรอกข้อมูลให้ครบ)",
      desc: "ถัดมาถ้าผู้ใช้ยังกรอกข้อมูลไม่ครบ ระบบก็จะแจ้งเตือนออกมา ซึ่งมันจะแจ้งเตือนเฉพาะกรณีที่ใส่ข้อมูลไม่ครบเท่านั้น ดังนั้นเราก็จะใส่กล่องเงื่อนไข alt ครอบลงไป พร้อมใส่ Self Message หมายเลข 3 เพื่อแจ้งเตือน",
      dialog: "🧔 วาดกล่อง alt เงื่อนไขข้อมูลไม่ครบ และ Self Message หมายเลข 3 เพื่อส่งการแจ้งเตือน",
      highlight: ["user", "loginPage", "message1", "loginPageActivation", "message2", "fragment1"]
    },
    {
      title: "7. API Lifeline & Message 4 (Login)",
      desc: "ถัดมาถ้าผู้ใช้กรอกข้อมูลครบ (Guard condition [ข้อมูลถูกกรอกครบแล้ว]) ก็จะส่งข้อมูลไปตรวจสอบที่ API ด้วยข้อความหมายเลข 4 : Login โดยชี้ไปที่ Lifeline ของ API",
      dialog: "🧔 แสดง API และส่งข้อความ 4 : Login เพื่อตรวจสอบความถูกต้องของบัญชี",
      highlight: ["user", "loginPage", "api", "message1", "loginPageActivation", "message2", "fragment1", "message4"]
    },
    {
      title: "8. Return Message (5 : Result)",
      desc: "หลังจากที่ API ตรวจสอบผลลัพธ์ต่างๆ แล้ว มันก็จะส่งผลลัพธ์กลับมาให้กับหน้า Login นั่นเอง ซึ่งเราจะวาดรูปออกมาเป็น เส้นประพร้อมหัวลูกศรเปิด (Return Message) หมายเลข 5 : Result",
      dialog: "🧔 วาดเส้นประ Return Message ชี้กลับจาก API มายัง Login page เป็นการบอกผลลัพธ์",
      highlight: ["user", "loginPage", "api", "message1", "loginPageActivation", "message2", "fragment1", "message4", "apiActivation", "message5"]
    },
    {
      title: "9. Note (JSON Response structure)",
      desc: "ผลลัพธ์ที่ API ส่งกลับมา เราอยากอธิบายโครงสร้างข้อมูลให้เห็นชัดเจนขึ้น จึงใส่ Note สีเหลืองข้างๆ เส้นประ เพื่อบอกว่าส่ง JSON format ที่มีฟิลด์ IsSuccess และ ErrorMessage กลับมา",
      dialog: "🧔 เพิ่มกระดาษโน้ต Note แขวนระบุโครงสร้าง JSON ที่ API ส่งกลับมาในขั้นตอนที่ 5",
      highlight: ["user", "loginPage", "api", "message1", "loginPageActivation", "message2", "fragment1", "message4", "apiActivation", "message5", "note"]
    },
    {
      title: "10. alt (Login Result) & Messages 6 & 7",
      desc: "เมื่อได้ผลลัพธ์กลับมา หน้า Login page ก็จะทำการตัดสินใจต่อว่ามันจะต้องแสดงผลยังไงต่อดี จึงวาดกล่อง alt แบ่ง 2 เงื่อนไข: [IsSuccess = false] จะรัน Message 6 เพื่อแจ้งข้อผิดพลาด และ [IsSuccess = true] จะรัน Message 7 แจ้งเตือนเข้าสู่ระบบ",
      dialog: "🧔 วาดกล่อง alt เงื่อนไขความสำเร็จแยกเป็น 2 ทางเลือก (แจ้งเตือนข้อผิดพลาด หรือ แจ้งเตือนสลับหน้าสำเร็จ) เสร็จสิ้นแผนภาพ",
      highlight: ["user", "loginPage", "api", "message1", "loginPageActivation", "message2", "fragment1", "message4", "apiActivation", "message5", "note", "fragment2"]
    }
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isHighlighted = (id) => {
    return steps[activeStep].highlight.includes(id);
  };

  return (
    <div className="font-sans text-slate-900 pb-24 relative min-h-screen bg-slate-50/50">
      
      {/* Dynamic Spring Pop Animation Styles */}
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-spring-pop {
          animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Layer 1: Ambient Background Glow Layers */}
      <AmbientBackdrop />

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
                เคยไหมเวลาอธิบายการทำงานให้กับเพื่อนๆ ในทีมว่า ของต่างๆ มันทำงานร่วมกันยังไง ซึ่งตอนที่คุยกันก็อาจจะต้องทวนกันหลายทีบ้างเพื่อให้เข้าใจตรงกัน แต่แล้วตอนไปทำงานจริงๆ ก็ไม่ได้ทำตามที่คุย เพราะเข้าใจผิดหรือลืม เพราะมันมีขั้นตอนการทำงานที่ค่อนข้างเยอะและตัวแปรต่างๆ ที่รับส่งก็วุ่นวายเช่นกัน
              </p>
              <div className="mt-4 bg-rose-50/50 p-3 rounded-2xl border border-rose-100 text-[13px] text-rose-800">
                <strong>ตัวอย่าง:</strong> Front-end จะต้องส่งข้อมูลไปให้ Back-end ผ่าน API ตัวนี้ แล้วฝั่ง Back-end ไปเรียก Module อื่น แล้วได้ของคืนมา... อธิบายปากเปล่ามักจะสับสนและลืมขั้นตอน
              </div>
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
                ผมเชื่อว่าคนเราเห็นภาพแล้วเข้าใจได้ง่ายกว่าเห็นตัวหนังสือ ดังนั้นเราจะใช้แผนภาพที่เรียกว่า <strong>Sequence Diagram</strong> มาช่วยแก้ปัญหาโลกแตกนี้กัน โดยเจ้า sequence diagram นั้นจะแปลงเรื่องราวทั้งหมดที่เกิดขึ้นให้กลายเป็นรูปที่เข้าใจง่ายๆ นั่นเอง
              </p>
              <div className="mt-4 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100 text-[13px] text-emerald-800">
                <strong>หัวใจหลัก:</strong> แปลงการทำงานแบบขั้นตอนทีละสเต็ปออกมาเป็นเส้นสายและมิติของเวลา ทำให้คุยเรื่องเทคนิคลำดับการส่งข้อมูลได้เห็นพ้องตรงกันทันที
              </div>
            </div>
          </div>
          
        </div>

        {/* =========================================================================
            Sequence Diagram ใช้ยังไง?
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-bl-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              Sequence Diagram ใช้ยังไง?
            </h4>
            <p className="text-slate-600 text-[16px] leading-relaxed">
              โดยปรกติเวลาที่เราใช้ UML เราจะไม่เขียนโค้ดหรือเขียนเอกสารกัน แต่เราจะวาดรูปเล่นกันต่างหาก โดยในตัวอย่างรอบนี้เราจะใช้ตัวอย่างของการ <strong>Login</strong> มาเขียนเป็น diagram แบบ step-by-step ดูละกัน ซึ่งผมจะให้ <strong>ดช.แมวน้ำ</strong> 🧔 เป็นคนไล่ลำดับการเขียน diagram ให้ดูละกันนะ
            </p>
          </div>
        </div>

        {/* =========================================================================
            ลองเขียน Sequence Diagram กัน (TIMELINE LAYOUT)
        ========================================================================= */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">ลองเขียน Sequence Diagram กัน</h3>
              <p className="text-slate-500 text-sm mt-1">
                มาไล่ตามสิ่งที่ ดช.แมวน้ำ จะวาดเพื่ออธิบายระบบ Login ทั้งหมด 10 ขั้นตอน
              </p>
            </div>
          </div>

          <div className="relative border-l-[3px] border-indigo-100 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4">
            
            {/* Step 1: Actor */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">1</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <User className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Actor</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ในการเขียน sequence diagram นั้นเราจะต้อง<strong>เริ่มวาดจากสิ่งที่เริ่มต้นกระบวนการ</strong>ก่อน ซึ่งในการ login นั้นจุดเริ่มต้นของมันคือมีผู้ใช้เข้ามานั่นเอง ดังนั้นเราก็จะวาดรูป <strong>ผู้ใช้</strong> เป็นสิ่งแรกลงไป
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LnSFu3kbeI9K5_QswaE%252Fimage.png%3Fgeneration%3D1583529109985673%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=dbd7db39&sv=2" 
                    alt="Actor" 
                    className="w-full max-w-[120px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Lifeline */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">2</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Box className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Lifeline</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      หลังจากที่มีผู้ใช้เข้ามาในระบบแล้ว ระบบก็จะเปิดหน้า Login มาให้ผู้ใช้เห็น ดังนั้นเราก็จะวาดกล่องของหน้า Login เข้าไปตามรูปด้านล่าง
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LrncjXNKK1j6WvFihbd%252Fimage.png%3Fgeneration%3D1583529113813951%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=a87afc96&sv=2" 
                    alt="Lifeline" 
                    className="w-full max-w-[200px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full bg-indigo-50 border-l-[3px] border-indigo-400 p-4 rounded-r-xl shadow-sm">
                  <p className="text-indigo-900 text-[14px] leading-relaxed">
                    <strong>เส้นประ (Lifeline):</strong> คือตัวที่เอาไว้บอกว่าคอมโพเนนต์หรือวัตถุต่างๆ นั้นเริ่มต้นทำงานที่จุดไหน และ สิ้นสุดขอบเขตเวลาชีวิตที่ตรงไหน
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Message */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">3</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <ArrowRightLeft className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Message</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      หลังจากที่ระบบแสดงหน้า login ขึ้นมาแล้ว ถัดไปผู้ใช้ก็จะทำการกรอกข้อมูลและกดปุ่มเข้าสู่ระบบซึ่งเป็นการทำงานระหว่าง <strong>User</strong> กับ <strong>Login page</strong> นั่นเอง ดังนั้นเราก็จะวาดรูปออกมาเป็นแบบนี้
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-Lsb5cH3a0bO02fbw6Sd%252Fimage.png%3Fgeneration%3D1583529162604325%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=1f31b9f5&sv=2" 
                    alt="Message" 
                    className="w-full max-w-[220px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Activations */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">4</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Activations</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      หลังจากที่ Login page ถูก User เรียกมาแล้ว มันก็จะเริ่มต้นทำงานต่อ โดยเราจะวาดกล่องครอบจุดเริ่มต้นของสิ่งที่มันจะทำไปจนถึงขั้นตอนการทำงานสุดท้ายของมันลงไปภายในเส้นประตามรูปเลย
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LnhFwX6_TcvDO5G1f2y%252Fimage.png%3Fgeneration%3D1583529135572947%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=acb8be47&sv=2" 
                    alt="Activations" 
                    className="w-full max-w-[220px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Self Message */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">5</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <RotateCcw className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Self Message</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      สิ่งแรกที่หน้า Login จะทำก็คือตรวจสอบว่าข้อมูลที่ผู้ใช้กรอกมานั้นครบหรือยัง เช่น ชื่อผู้ใช้ และ รหัสผ่าน ต้องไม่เป็นค่าว่างไรงี้ ซึ่งการทำงานนี้มันจะทำงานภายในหน้า Login เองไม่ได้ให้ใครช่วยทำ เราก็จะวาดรูปออกมาราวๆ นี้
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LqpkPQlGZQYrWzwA1Tf%252Fimage.png%3Fgeneration%3D1583529176970105%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=ea2d35d0&sv=2" 
                    alt="Self Message" 
                    className="w-full max-w-[260px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 6: Fragments */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">6</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Fragments</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ถัดมาถ้าผู้ใช้ยังกรอกข้อมูลไม่ครบ ระบบก็จะแจ้งเตือนออกมา ซึ่งมันจะแจ้งเตือนเฉพาะกรณีที่ใส่ข้อมูลไม่ครบเท่านั้น ดังนั้นเราก็จะใส่กล่องเงื่อนไขครอบลงไปตามนี้
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-Lv0LVdlYjLgL8eJmC5P%252Fimage.png%3Fgeneration%3D1583529174847185%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=5fd20d29&sv=2" 
                    alt="Fragments" 
                    className="w-full max-w-[280px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full bg-amber-50 border-l-[3px] border-amber-400 p-4 rounded-r-xl shadow-sm">
                  <p className="text-amber-900 text-[14px] leading-relaxed">
                    <strong>Fragments:</strong> ในกล่อง fragment จะเห็นว่ามันเขียนไว้ว่าเป็น <strong>alt</strong> ซึ่งย่อมาจาก <strong>Alternative</strong> ที่แปลว่า<strong>ทางเลือก</strong> ซึ่งมันจะทำงานก็ต่อเมื่อเงื่อนไขที่เขียนกำกับไว้เป็นจริง ส่วน fragments นั้นจริงๆ มีให้เลือกใช้เยอะมาก เช่น loop, ref ครับ
                  </p>
                </div>
              </div>
            </div>

            {/* Step 7: Guard condition */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">7</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-red-50 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Guard condition</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ถัดมาถ้าผู้ใช้กรอกข้อมูลครบ มันก็จะส่งข้อมูลชื่อผู้ใช้และรหัสผ่านไปตรวจสอบกับเซิฟเวอร์โดยส่งผ่าน API ไป ซึ่งมันจะส่งไปก็ต่อเมื่อ <strong>ข้อมูลถูกกรอกครบหมดแล้วเท่านั้น</strong> เราก็จะวาดรูปออกมาราวๆ นี้
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LngWLw6wrdxayhwbZr0%252Fimage.png%3Fgeneration%3D1583529169940442%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=caa7e97a&sv=2" 
                    alt="Guard condition" 
                    className="w-full max-w-[300px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                  <p className="text-[13px] text-slate-500">และการส่ง Message ในข้อนี้ เราสามารถระบุรายละเอียดตัวแปรพารามิเตอร์เพิ่มเติมได้ด้วย:</p>
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-Lw9OzZF-9yXgJlfUpUJ%252Fimage.png%3Fgeneration%3D1583529155304914%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=49950ab5&sv=2" 
                    alt="Guard variables" 
                    className="w-full max-w-[320px] object-contain drop-shadow-sm" 
                  />
                </div>
                <div className="w-full bg-rose-50 border-l-[3px] border-rose-400 p-4 rounded-r-xl shadow-sm">
                  <p className="text-rose-950 text-[14px] leading-relaxed">
                    <strong>ข้อควรระวัง:</strong> สังเกตนะว่าถ้าเราไม่ใส่ <strong>Guard condition</strong> ไว้ ตอนที่มันทำขั้นตอนถัดไป คนที่ไม่รู้เรื่องก็จะเข้าใจว่ามันจะยิงข้อความถัดไปได้ทันทีโดยไม่ต้องผ่านผลตรวจสอบ การมีกริ่ง Guard กำกับไว้ช่วยป้องกันความเข้าใจผิดนี้ได้ดีมาก
                  </p>
                </div>
              </div>
            </div>

            {/* Step 8: Return Message */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">8</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <ArrowRightLeft className="w-5 h-5 rotate-180" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Return Message</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      หลังจากที่ตัว API ตรวจสอบผลลัพธ์ต่างๆ แล้ว มันก็จะส่งผลลัพธ์กลับมาให้กับหน้า Login นั่นเอง ซึ่งเราจะวาดรูปออกมาเป็น <strong>เส้นประ</strong> ชี้กลับหาหน้าผู้เรียกพร้อมหัวลูกศรเปิด
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-M-w9fLTQQHf348jlLW3%252Fimage.png%3Fgeneration%3D1583529143690710%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=5d5e6ec2&sv=2" 
                    alt="Return Message" 
                    className="w-full max-w-[320px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 9: Note */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">9</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-yellow-50 text-yellow-600">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Note</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ผลลัพธ์ที่มันส่งกลับมา ในบางครั้งเราก็อยากจะเขียนรายละเอียดไว้กันลืมว่ามันส่งอะไรกลับมาบ้าง เราก็สามารถใส่ note ไว้ก็ได้ ซึ่งของที่เขียนไว้ใน note ไม่มีรูปแบบกำหนดไว้ ดังนั้นในตัวอย่างผมจะเขียน Json ที่มันส่งกลับมาละกันตามรูปเลย
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LrKRFGR9bkEg-Jr5C9J%252Fimage.png%3Fgeneration%3D1583529129353442%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=14f7568b&sv=2" 
                    alt="Note" 
                    className="w-full max-w-[340px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 10: Fragments (ต่อ) */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">10</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Fragments (ต่อ)</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ตัวผลลัพธ์ที่ได้กลับมานั้น หน้า Login ก็จะทำการตัดสินใจต่อว่ามันจะต้องแสดงผลยังไงต่อดี ซึ่งเราจะเขียนแยกเงื่อนไขออกเป็น 2 เรื่องตามนี้คือ เข้าใช้งานไม่ได้ (แจ้งข้อผิดพลาด) หรือ เข้าใช้งานได้ (แจ้งเตือนเตรียมสลับหน้า Dashboard)
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LpqDUw-xwi3t6fFZN23%252Fimage.png%3Fgeneration%3D1583529141696368%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=ceb588d2&sv=2" 
                    alt="Fragments continuation" 
                    className="w-full max-w-[340px] object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full bg-slate-50/50 p-4 rounded-2xl border border-slate-200 text-center">
                  <p className="text-slate-600 text-sm">
                    เสร็จเรียบร้อย! เราก็จะได้ลำดับการทำงานของระบบ Login ทั้งหมด 7 ขั้นตอนแบบกระชับเห็นภาพชัดเจน
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* แผนภาพภาพรวม */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm text-center">
          <h5 className="font-bold text-slate-800 text-lg mb-4">ภาพรวม Sequence Diagram ฉบับสมบูรณ์</h5>
          <div className="flex justify-center p-4 bg-slate-50 rounded-3xl border border-slate-100 max-w-4xl mx-auto shadow-inner">
            <img 
              src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LvAEGzvMtJTs6P1pzWw%252Fimage.png%3Fgeneration%3D1583529134819899%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=15a34216&sv=2" 
              alt="Complete Sequence Diagram" 
              className="w-full object-contain rounded-2xl cursor-zoom-in" 
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">หากภาพขนาดเล็กเกินไป สามารถกดขยายดูรายละเอียดเพิ่มเติมในหน้าต่างบราวเซอร์ได้นะครับ</p>
        </div>

        {/* =========================================================================
            UML INTERACTIVE SIMULATOR (CENTERED SIM LAYOUT)
        ========================================================================= */}
        <div className="scroll-mt-12" id="simulator-section">
          <SimulatorShell title="เครื่องมือจำลองการวาด Sequence Diagram (Login Flow)">
            <div className="flex flex-col gap-6">
              
              {/* Top description */}
              <div className="text-slate-300 text-sm">
                ทดลองคลิกสเต็ปด้านล่างเพื่อสังเกตลำดับและกระบวนการประกอบร่างบล็อก Sequence Diagram ทีละขั้นตอน
              </div>

              {/* 1. Simulator Canvas (CENTERED) */}
              <div className="w-full flex justify-center">
                <div className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden relative shadow-2xl">
                  
                  {/* Grid background effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-25"></div>
                  
                  <div className="relative p-6 z-10 w-full overflow-x-auto">
                    <svg viewBox="0 0 800 580" className="w-full min-w-[750px] h-auto drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
                      
                      {/* Define markers and glows */}
                      <defs>
                        <marker id="arrow-solid-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#22d3ee" />
                        </marker>
                        <marker id="arrow-open-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                        </marker>
                        <marker id="arrow-solid-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#c084fc" />
                        </marker>
                        <marker id="arrow-open-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
                        </marker>
                        <marker id="arrow-solid-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
                        </marker>
                        <marker id="arrow-open-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                        </marker>
                      </defs>

                      {/* ==========================================
                          LIFELINES & DASHED LINES
                          ========================================== */}
                      
                      {/* USER (x = 100) */}
                      {isHighlighted("user") && (
                        <g className="transition-all duration-500 opacity-100">
                          {/* Actor Stick Figure */}
                          <circle cx="100" cy="30" r="7" stroke="#38bdf8" strokeWidth="2" fill="#1e293b" />
                          <line x1="100" y1="37" x2="100" y2="57" stroke="#38bdf8" strokeWidth="2" />
                          <line x1="85" y1="45" x2="115" y2="45" stroke="#38bdf8" strokeWidth="2" />
                          <line x1="100" y1="57" x2="88" y2="72" stroke="#38bdf8" strokeWidth="2" />
                          <line x1="100" y1="57" x2="112" y2="72" stroke="#38bdf8" strokeWidth="2" />
                          <text x="100" y="87" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">User</text>
                          {/* Dashed line */}
                          <line x1="100" y1="95" x2="100" y2="565" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,5" />
                        </g>
                      )}

                      {/* LOGIN PAGE (x = 320) */}
                      {isHighlighted("loginPage") && (
                        <g className="transition-all duration-500 opacity-100">
                          {/* Top Box */}
                          <rect x="250" y="30" width="140" height="45" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                          <text x="320" y="58" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">Login page</text>
                          {/* Dashed line */}
                          <line x1="320" y1="75" x2="320" y2="565" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,5" />
                        </g>
                      )}

                      {/* API (x = 600) */}
                      {isHighlighted("api") && (
                        <g className="transition-all duration-500 opacity-100">
                          {/* Top Box */}
                          <rect x="540" y="30" width="120" height="45" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                          <text x="600" y="58" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">API</text>
                          {/* Dashed line */}
                          <line x1="600" y1="75" x2="600" y2="565" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,5" />
                        </g>
                      )}

                      {/* ==========================================
                          ACTIVATIONS (VERTICAL BARS)
                          ========================================== */}
                      
                      {/* Login page Main Activation Bar */}
                      {isHighlighted("loginPageActivation") && (
                        <rect x="314" y="90" width="12" height="460" rx="2" fill="#8b5cf6" opacity="0.85" className="transition-all duration-500" />
                      )}

                      {/* Nested Activations for self-messages (LoginPage) */}
                      {/* Self Msg 2 */}
                      {isHighlighted("message2") && (
                        <rect x="326" y="145" width="10" height="20" rx="1" fill="#c084fc" opacity="0.9" />
                      )}
                      
                      {/* Self Msg 3 */}
                      {isHighlighted("fragment1") && (
                        <rect x="326" y="205" width="10" height="20" rx="1" fill="#c084fc" opacity="0.9" />
                      )}

                      {/* API Activation Bar */}
                      {isHighlighted("apiActivation") && (
                        <rect x="594" y="265" width="12" height="60" rx="2" fill="#10b981" opacity="0.85" className="transition-all duration-500" />
                      )}

                      {/* Nested Activations for final alt block */}
                      {/* Self Msg 6 (Failure) */}
                      {isHighlighted("fragment2") && (
                        <rect x="326" y="420" width="10" height="20" rx="1" fill="#c084fc" opacity="0.9" />
                      )}
                      
                      {/* Self Msg 7 (Success) */}
                      {isHighlighted("fragment2") && (
                        <rect x="326" y="505" width="10" height="20" rx="1" fill="#c084fc" opacity="0.9" />
                      )}

                      {/* ==========================================
                          MESSAGES & DYNAMIC PATHS
                          ========================================== */}
                      
                      {/* Message 1: 1 : กดปุ่มเข้าสู่ระบบ */}
                      {isHighlighted("message1") && (
                        <g className="transition-all duration-500">
                          <path d="M 100,95 L 314,95" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow-solid-cyan)" />
                          <text x="200" y="88" fill="#22d3ee" fontSize="11" fontWeight="semibold" textAnchor="middle">1 : กดปุ่มเข้าสู่ระบบ</text>
                        </g>
                      )}

                      {/* Message 2: 2 : ตรวจสอบว่าข้อมูลกรอกครบหรือยัง */}
                      {isHighlighted("message2") && (
                        <g className="transition-all duration-500">
                          <path d="M 326,135 H 360 V 155 H 336" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-solid-purple)" fill="none" />
                          <text x="370" y="142" fill="#c084fc" fontSize="11" fontWeight="semibold" textAnchor="start">2 : ตรวจสอบว่าข้อมูล</text>
                          <text x="370" y="157" fill="#c084fc" fontSize="11" fontWeight="semibold" textAnchor="start">กรอกครบหรือยัง</text>
                        </g>
                      )}

                      {/* alt ข้อมูลกรอกไม่ครบ Box */}
                      {isHighlighted("fragment1") && (
                        <g className="transition-all duration-500">
                          {/* alt boundary box */}
                          <rect x="180" y="175" width="450" height="75" rx="4" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
                          {/* alt tag */}
                          <path d="M 180,175 H 300 L 290,190 H 180 Z" fill="#ca8a04" />
                          <text x="185" y="186" fill="#ffffff" fontSize="9" fontWeight="bold">alt ข้อมูลกรอกไม่ครบ</text>
                          
                          {/* Message 3 inside alt */}
                          <path d="M 326,195 H 360 V 215 H 336" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-solid-purple)" fill="none" />
                          <text x="370" y="210" fill="#c084fc" fontSize="11" fontWeight="semibold" textAnchor="start">3 : แจ้งเตือนว่าต้องกรอกข้อมูลให้ครบ</text>
                        </g>
                      )}

                      {/* Message 4: 4 [ข้อมูลถูกกรอกครบแล้ว] : Login */}
                      {isHighlighted("message4") && (
                        <g className="transition-all duration-500">
                          <path d="M 326,270 L 594,270" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-solid-emerald)" />
                          <text x="460" y="263" fill="#34d399" fontSize="11" fontWeight="semibold" textAnchor="middle">4 [ข้อมูลถูกกรอกครบแล้ว] : Login</text>
                        </g>
                      )}

                      {/* Message 5: 5 : Result */}
                      {isHighlighted("message5") && (
                        <g className="transition-all duration-500">
                          <path d="M 594,320 L 326,320" stroke="#34d399" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#arrow-open-emerald)" />
                          <text x="460" y="315" fill="#34d399" fontSize="11" fontWeight="semibold" textAnchor="middle">5 : Result</text>
                        </g>
                      )}

                      {/* Note linked to return Message 5 */}
                      {isHighlighted("note") && (
                        <g className="transition-all duration-500">
                          {/* Dotted linking line */}
                          <line x1="460" y1="320" x2="645" y2="330" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                          
                          {/* Note box shape */}
                          <polygon points="645,295 765,295 775,305 775,365 645,365" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                          <polygon points="765,295 765,305 775,305" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
                          
                          {/* Note text inside */}
                          <text x="653" y="312" fill="#854d0e" fontSize="10" fontFamily="monospace">{"{"}</text>
                          <text x="660" y="328" fill="#854d0e" fontSize="10" fontFamily="monospace">IsSuccess: bool,</text>
                          <text x="660" y="344" fill="#854d0e" fontSize="10" fontFamily="monospace">ErrorMessage: string</text>
                          <text x="653" y="358" fill="#854d0e" fontSize="10" fontFamily="monospace">{"}"}</text>
                        </g>
                      )}

                      {/* Fragment 2: alt success/failure check box */}
                      {isHighlighted("fragment2") && (
                        <g className="transition-all duration-500">
                          {/* alt boundary box */}
                          <rect x="175" y="385" width="460" height="165" rx="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
                          
                          {/* alt tag */}
                          <path d="M 175,385 H 220 L 210,398 H 175 Z" fill="#10b981" />
                          <text x="179" y="394" fill="#ffffff" fontSize="8" fontWeight="bold">alt</text>
                          
                          {/* Condition 1: [IsSuccess = false] */}
                          <text x="200" y="407" fill="#f87171" fontSize="10" fontWeight="bold">[IsSuccess = false]</text>
                          
                          {/* Message 6 */}
                          <path d="M 326,410 H 360 V 430 H 336" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-solid-purple)" fill="none" />
                          <text x="370" y="425" fill="#c084fc" fontSize="11" fontWeight="semibold" textAnchor="start">6 : แจ้งเตือนข้อผิดพลาด</text>
                          
                          {/* Separating horizontal dashed line */}
                          <line x1="175" y1="465" x2="635" y2="465" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5,5" />
                          
                          {/* Condition 2: [IsSuccess = true] */}
                          <text x="200" y="487" fill="#34d399" fontSize="10" fontWeight="bold">[IsSuccess = true]</text>
                          
                          {/* Message 7 */}
                          <path d="M 326,495 H 360 V 515 H 336" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-solid-purple)" fill="none" />
                          <text x="370" y="510" fill="#c084fc" fontSize="11" fontWeight="semibold" textAnchor="start">7 : แจ้งเตือนกำลังเข้าสู่ระบบกรุณารอสักครู่</text>
                        </g>
                      )}

                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. Step selector pills (BELOW THE SIM CANVAS) */}
              <div className="flex flex-col items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex flex-wrap justify-center gap-2">
                  {steps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-9 h-9 rounded-full font-bold text-sm transition-all duration-300 ${
                        activeStep === idx
                          ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] scale-110'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Back / Next buttons */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={handlePrev}
                    disabled={activeStep === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    ย้อนกลับ
                  </button>
                  
                  <span className="text-slate-400 text-xs font-semibold min-w-[5rem] text-center">
                    ขั้นตอน {activeStep + 1} / {steps.length}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 border border-blue-500 text-white transition-colors hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ถัดไป
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                    title="เริ่มวาดใหม่"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>

              {/* 3. Details description card (DYNAMIC BOUNCE ANIMATION ON CHANGE) */}
              <div 
                key={activeStep} 
                className="bg-slate-900 border-l-[3px] border-blue-500 p-5 rounded-r-2xl shadow-lg relative overflow-hidden animate-spring-pop min-h-[9rem] flex flex-col justify-between"
              >
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-blue-400 text-base flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-900/50 text-[11px] text-blue-300 font-extrabold border border-blue-800">
                        {activeStep + 1}
                      </span>
                      {steps[activeStep].title}
                    </h5>
                  </div>
                  <p className="text-slate-300 text-[14px] leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>
                
                {/* Character dialog at the bottom card */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-blue-300/90 font-medium">
                  <span className="text-base select-none">🧔</span>
                  <p className="italic pt-0.5">{steps[activeStep].dialog}</p>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </div>

        {/* =========================================================================
            Sequence Diagram มีแค่นี้เหรอ ?
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-8">
          <div className="relative">
            <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              Sequence Diagram มีแค่นี้เหรอ ?
            </h4>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              เครื่องมือและสัญลักษณ์พื้นฐานด้านบนช่วยอธิบายขั้นตอนการทำงานได้ถึง 80% แล้วครับ แต่อย่างไรก็ดี UML ยังมีการส่ง Message เพิ่มเติมในรูปแบบพิเศษเพื่อบ่งบอกสถานะการเกิดขึ้นและดับไปของช่วงเวลาชีวิตวัตถุ (Lifeline) ดังนี้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Create Message */}
            <div className="space-y-4 border border-slate-100 rounded-3xl p-6 bg-slate-50 hover:shadow-md transition-shadow group">
              <h6 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                Create Message
              </h6>
              <p className="text-slate-600 text-[14px] leading-relaxed">
                ถ้ากระบวนการเริ่มทำงานในจุดนั้นแล้วต้องการสร้างคอมโพเนนต์หรือออบเจกต์ใหม่ขึ้นมากลางคัน เพื่อเริ่มต้นทำงานเฉพาะกิจ เราจะชี้เส้น Message ไปยังหัวกล่อง Lifeline ตัวใหม่ตรงๆ เลย เพื่อบอกว่ามันเพิ่งถูกชุบชีวิตขึ้นมาในขั้นตอนนี้
              </p>
              <div className="flex justify-center p-4 bg-white rounded-2xl border border-slate-200">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-M1VRbOBlyQn3iAa0eEw%252Fimage.png%3Fgeneration%3D1583529152258270%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=feb1b8f2&sv=2" 
                  alt="Create Message" 
                  className="w-full max-w-[220px] object-contain group-hover:scale-[1.03] transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Destroy Message */}
            <div className="space-y-4 border border-slate-100 rounded-3xl p-6 bg-slate-50 hover:shadow-md transition-shadow group">
              <h6 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                Destroy Message
              </h6>
              <p className="text-slate-600 text-[14px] leading-relaxed">
                ในทางตรงกันข้าม หากต้องการทำลายหรือเคลียร์หน่วยความจำของวัตถุนั้นทิ้งทันทีหลังเสร็จภารกิจ (เช่น คำสั่ง dispose) เราจะลากหัวลูกศรมาปะทะแล้วทำสัญลักษณ์กากบาท (X) ไว้ที่จุดล่างสุดของ Lifeline ตัวนั้น เพื่อบอกว่ามันสิ้นอายุขัยแล้ว
              </p>
              <div className="flex justify-center p-4 bg-white rounded-2xl border border-slate-200">
                <img 
                  src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LntqUTIyVeHiMOPH-S7%252Fimage.png%3Fgeneration%3D1583529143042745%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=6bb1fdb5&sv=2" 
                  alt="Destroy Message" 
                  className="w-full max-w-[220px] object-contain group-hover:scale-[1.03] transition-transform duration-500" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            🎯 บทสรุป
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className="relative z-10 space-y-4">
            <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              🎯 บทสรุป
            </h4>
            
            <p className="text-slate-600 text-[15px] leading-relaxed">
              จากทั้งหมดเราก็จะเห็นแล้วว่า เราสามารถแปลงขั้นตอนการทำงานร่วมกันของคลาสต่างๆ หรือ module ต่างๆ ให้กลายมาเป็นรูปภาพที่เข้าใจง่ายๆ ได้ยังไง ดังนั้นเราลองไปหัดวาดรูปเล่นเพื่อทำให้คนในทีมเข้าใจการทำงานได้ง่ายๆ กันเถอะ
            </p>

            <div className="bg-red-50 border-l-[3px] border-red-500 p-4 rounded-r-xl shadow-sm mt-4">
              <h6 className="font-bold text-red-800 text-[15px] mb-1">⚠️ คำเตือนสำคัญ</h6>
              <p className="text-red-950 text-[14px] leading-relaxed">
                เวลาที่เราเขียน Diagram ต่างๆ ห้ามเอาทุกกระบวนการทำงานมาเขียนยำกันไว้ในแผนภาพเดียวอย่างเด็ดขาด เพราะไม่อย่างนั้นมันจะกลายเป็นแผนภาพพาทัวร์นรกเลย เนื่องจากเส้นมันจะยุ่งเหยิงพันกันไปหมดจนหาจุดเริ่มต้นไม่ได้ สิ่งที่ควรทำคือ เขียน 1 กระบวนการทำงานหลักต่อ 1 diagram เท่านั้น
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
