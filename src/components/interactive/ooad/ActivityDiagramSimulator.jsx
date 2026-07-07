import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';
import SimulatorShell from '../shared/SimulatorShell';

const STEPS = [
  { id: 0, title: "1. เริ่มกระบวนการ", desc: "จุดเริ่มต้นของระบบ (Initial Node) ฝั่ง Front-end" },
  { id: 1, title: "2. แสดงหน้า Login", desc: "Front-end แสดงหน้าจอเพื่อให้ผู้ใช้กรอกข้อมูล" },
  { id: 2, title: "3. ส่งข้อมูลไป Back-end", desc: "ผู้ใช้กรอกข้อมูลครบและกดปุ่มเข้าสู่ระบบ ข้อมูลถูกส่งมาตรวจสอบที่ Back-end" },
  { id: 3, title: "4. ดึงข้อมูลผู้ใช้", desc: "Back-end ร้องขอข้อมูลบัญชีผู้ใช้จาก Database เพื่อนำมาเปรียบเทียบ" },
  { id: 4, title: "5. ตรวจสอบความถูกต้อง", desc: "นำข้อมูลที่ผู้ใช้กรอกมาเทียบกับข้อมูลจาก Database" },
  { id: 5, title: "6. ตัดสินใจ (Decision)", desc: "ระบบพิจารณาจากเงื่อนไข (Guard Condition) ว่าข้อมูลตรงกันหรือไม่" },
  { id: 6, title: "7. กรณีข้อมูลผิด (Error Loop)", desc: "กระแสควบคุมไหลไปทาง [ข้อมูลไม่ถูกต้อง] แจ้งเตือนข้อผิดพลาดที่ Front-end แล้ววนกลับไปหน้า Login" },
  { id: 7, title: "8. กรณีข้อมูลถูก (Success)", desc: "กระแสควบคุมไหลไปทาง [เข้าสู่ระบบสำเร็จ] ปิดหน้า Login แล้วเปิดหน้า Dashboard ในสเตตัส 'เข้าสู่ระบบแล้ว'" },
  { id: 8, title: "9. สิ้นสุดกระบวนการ", desc: "จบการทำงานอย่างสมบูรณ์ที่ Final Node" }
];

export default function ActivityDiagramSimulator() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const reset = () => setCurrentStep(0);

  const isNodeVisited = (stepId) => currentStep >= stepId;

  // Exact Node Y Positions
  const Y0_INIT = "12%";
  const Y1_LOGIN = "23%";
  const Y2_AUTH = "34%";
  const Y3_DB = "34%";
  const Y4_VAL = "46%";
  const Y5_DECISION = "58%";
  const Y6_ERROR = "58%";
  const Y7_DASH = "82%";
  const Y8_FINAL = "95%";

  // Exact X Positions (Centers)
  const X_FE = "22%";
  const X_BE = "53.5%";
  const X_DB = "85%";

  return (
    <SimulatorShell
      icon={<Play className="w-6 h-6" />}
      title="Activity Diagram Simulator (Swimlanes)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="flex flex-col xl:flex-col gap-6 mt-6">
        
        {/* Canvas Area */}
        <div className="relative w-full h-[650px] bg-white rounded-2xl border-2 border-slate-800 overflow-hidden text-sm">
          
          <style>
            {`
              @keyframes dashFlow {
                from { stroke-dashoffset: 24; }
                to { stroke-dashoffset: 0; }
              }
              .line-flowing {
                stroke-dasharray: 8 8;
                animation: dashFlow 0.8s linear infinite;
              }
              .text-vertical {
                writing-mode: vertical-rl;
                transform: rotate(180deg);
                text-align: center;
              }
            `}
          </style>

          {/* ================= BACKGROUND GRID (SWIMLANES) ================= */}
          {/* Vertical Lines */}
          <div className="absolute left-[5%] top-0 bottom-0 border-r-2 border-slate-800"></div>
          <div className="absolute left-[37.33%] top-0 bottom-0 border-r-2 border-slate-800"></div>
          <div className="absolute left-[69.66%] top-0 bottom-0 border-r-2 border-slate-800"></div>
          
          {/* Horizontal Lines */}
          <div className="absolute left-[5%] top-[8%] right-0 border-b-2 border-slate-800"></div>
          <div className="absolute left-0 top-[73%] right-0 border-b-2 border-slate-800"></div>

          {/* Headers */}
          <div className="absolute left-[5%] right-[62.66%] top-0 h-[8%] flex items-center justify-center font-bold text-slate-700 bg-slate-50">Front-end</div>
          <div className="absolute left-[37.33%] right-[30.33%] top-0 h-[8%] flex items-center justify-center font-bold text-slate-700 bg-slate-50">Back-end</div>
          <div className="absolute left-[69.66%] right-0 top-0 h-[8%] flex items-center justify-center font-bold text-slate-700 bg-slate-50">Database</div>

          {/* Row Labels (Vertical) */}
          <div className="absolute left-0 top-[8%] bottom-[27%] w-[5%] flex items-center justify-center bg-slate-50">
            <span className="text-vertical font-bold text-slate-700 text-xs tracking-wider">ยังไม่ได้เข้าสู่ระบบ</span>
          </div>
          <div className="absolute left-0 top-[73%] bottom-0 w-[5%] flex items-center justify-center bg-slate-50">
            <span className="text-vertical font-bold text-slate-700 text-xs tracking-wider">เข้าสู่ระบบแล้ว</span>
          </div>

          {/* ================= SVG EDGES ================= */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
              </marker>
              <marker id="arrowhead-error" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
              </marker>
              <marker id="arrowhead-success" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
              </marker>
            </defs>

            {/* Line 1: Initial -> Login */}
            <line x1="22%" y1="calc(12% + 14px)" x2="22%" y2="calc(23% - 24px)" stroke={currentStep >= 1 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep >= 1 ? '-active' : ''})`} className={`transition-colors duration-500 ${currentStep >= 1 ? 'line-flowing' : ''}`} />
            <text x="22%" y="17.5%" dx="15" dy="5" fill={currentStep >= 1 ? "#4f46e5" : "#94a3b8"} fontSize="11" fontWeight="bold" className="transition-colors duration-500">[ผู้ใช้ยังไม่ได้ login]</text>

            {/* Line 2: Login -> Auth (Right then Down) */}
            <line x1="calc(22% + 92px)" y1="23%" x2="53.5%" y2="23%" stroke={currentStep >= 2 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" className={`transition-colors duration-500 ${currentStep >= 2 ? 'line-flowing' : ''}`} />
            <line x1="53.5%" y1="23%" x2="53.5%" y2="calc(34% - 32px)" stroke={currentStep >= 2 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep >= 2 ? '-active' : ''})`} className={`transition-colors duration-500 ${currentStep >= 2 ? 'line-flowing' : ''}`} />
            <text x="44%" y="23%" fill={currentStep >= 2 ? "#4f46e5" : "#94a3b8"} fontSize="11" fontWeight="bold" textAnchor="middle" className="transition-colors duration-500">
              <tspan x="44%" dy="-18">[กรอกข้อมูลครบ</tspan>
              <tspan x="44%" dy="13">+ กดปุ่มเข้าสู่ระบบ]</tspan>
            </text>

            {/* Line 3: Auth -> DB (Straight Right) */}
            <line x1="calc(53.5% + 118px)" y1="34%" x2="calc(85% - 82px)" y2="34%" stroke={currentStep >= 3 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep >= 3 ? '-active' : ''})`} className={`transition-colors duration-500 ${currentStep >= 3 ? 'line-flowing' : ''}`} />

            {/* Line 4: DB -> Validate (Down then Left) */}
            <line x1="85%" y1="calc(34% + 24px)" x2="85%" y2="46%" stroke={currentStep >= 4 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" className={`transition-colors duration-500 ${currentStep >= 4 ? 'line-flowing' : ''}`} />
            <line x1="85%" y1="46%" x2="calc(53.5% + 92px)" y2="46%" stroke={currentStep >= 4 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep >= 4 ? '-active' : ''})`} className={`transition-colors duration-500 ${currentStep >= 4 ? 'line-flowing' : ''}`} />

            {/* Line 5: Validate -> Decision (Straight Down) */}
            <line x1="53.5%" y1="calc(46% + 24px)" x2="53.5%" y2="calc(58% - 22px)" stroke={currentStep >= 5 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep >= 5 ? '-active' : ''})`} className={`transition-colors duration-500 ${currentStep >= 5 ? 'line-flowing' : ''}`} />

            {/* Line 6: Decision -> Error (Straight Left) */}
            <line x1="calc(53.5% - 22px)" y1="58%" x2="calc(22% + 92px)" y2="58%" stroke={currentStep === 6 ? "#ef4444" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep === 6 ? '-error' : ''})`} className={`transition-colors duration-500 ${currentStep === 6 ? 'line-flowing' : ''}`} />
            <text x="37.5%" y="58%" dy="-8" fill={currentStep === 6 ? "#ef4444" : "#94a3b8"} fontSize="11" fontWeight="bold" textAnchor="middle" className="transition-colors duration-500">[ข้อมูลไม่ถูกต้อง]</text>

            {/* Line 7: Error -> Login (Up) */}
            <line x1="22%" y1="calc(58% - 24px)" x2="22%" y2="calc(23% + 24px)" stroke={currentStep === 6 ? "#ef4444" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep === 6 ? '-error' : ''})`} className={`transition-colors duration-500 ${currentStep === 6 ? 'line-flowing' : ''}`} />

            {/* Line 8: Decision -> Dashboard (Down then Left) */}
            <line x1="53.5%" y1="calc(58% + 22px)" x2="53.5%" y2="82%" stroke={currentStep >= 7 ? "#10b981" : "#94a3b8"} strokeWidth="2" className={`transition-colors duration-500 ${currentStep >= 7 ? 'line-flowing' : ''}`} />
            <line x1="53.5%" y1="82%" x2="calc(22% + 92px)" y2="82%" stroke={currentStep >= 7 ? "#10b981" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep >= 7 ? '-success' : ''})`} className={`transition-colors duration-500 ${currentStep >= 7 ? 'line-flowing' : ''}`} />
            <text x="53.5%" y="70%" dx="15" dy="5" fill={currentStep >= 7 ? "#10b981" : "#94a3b8"} fontSize="11" fontWeight="bold" textAnchor="start" className="transition-colors duration-500">[เข้าสู่ระบบสำเร็จ]</text>

            {/* Line 9: Dashboard -> Final (Straight Down) */}
            <line x1="22%" y1="calc(82% + 32px)" x2="22%" y2="calc(95% - 16px)" stroke={currentStep >= 8 ? "#4f46e5" : "#94a3b8"} strokeWidth="2" markerEnd={`url(#arrowhead${currentStep >= 8 ? '-active' : ''})`} className={`transition-colors duration-500 ${currentStep >= 8 ? 'line-flowing' : ''}`} />
          </svg>

          {/* ================= NODES ================= */}
          {/* N0: Initial Node */}
          <div className={`absolute left-[22%] top-[12%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-800 z-20 shadow-sm transition-all duration-500 ${currentStep === 0 ? 'ring-4 ring-slate-800/20' : ''}`}></div>
          
          {/* N1: Action (Login) */}
          <div className={`absolute left-[22%] top-[23%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[48px] rounded-2xl border-2 z-20 font-bold text-xs md:text-sm flex items-center justify-center transition-all duration-500 shadow-sm ${isNodeVisited(1) ? 'bg-indigo-50 border-indigo-400 text-indigo-700' : 'bg-white border-slate-300 text-slate-500'}`}>
            แสดงหน้า Login ขึ้นมา
          </div>

          {/* N2: Action (Auth) */}
          <div className={`absolute left-[53.5%] top-[34%] -translate-x-1/2 -translate-y-1/2 w-[230px] h-[64px] rounded-2xl border-2 z-20 font-bold text-xs flex flex-col items-center justify-center text-center px-4 transition-all duration-500 shadow-sm ${isNodeVisited(2) ? 'bg-indigo-50 border-indigo-400 text-indigo-700' : 'bg-white border-slate-300 text-slate-500'}`}>
            <span>ตรวจสอบชื่อผู้ใช้และรหัสผ่าน</span>
            <span>เพื่อทำการเข้าสู่ระบบ</span>
          </div>

          {/* N3: Action (Database) */}
          <div className={`absolute left-[85%] top-[34%] -translate-x-1/2 -translate-y-1/2 w-[160px] h-[48px] rounded-2xl border-2 z-20 font-bold text-xs md:text-sm flex items-center justify-center transition-all duration-500 shadow-sm ${isNodeVisited(3) ? 'bg-indigo-50 border-indigo-400 text-indigo-700' : 'bg-white border-slate-300 text-slate-500'}`}>
            ดึงข้อมูลบัญชีผู้ใช้
          </div>

          {/* N4: Action (Validate) */}
          <div className={`absolute left-[53.5%] top-[46%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[48px] rounded-2xl border-2 z-20 font-bold text-xs md:text-sm flex items-center justify-center transition-all duration-500 shadow-sm ${isNodeVisited(4) ? 'bg-indigo-50 border-indigo-400 text-indigo-700' : 'bg-white border-slate-300 text-slate-500'}`}>
            ตรวจสอบความถูกต้อง
          </div>

          {/* N5: Decision Node */}
          <div className={`absolute left-[53.5%] top-[58%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rotate-45 border-2 z-20 transition-all duration-500 shadow-sm flex items-center justify-center ${isNodeVisited(5) ? 'bg-amber-50 border-amber-400' : 'bg-white border-slate-300'}`}></div>

          {/* N6: Action (Error) */}
          <div className={`absolute left-[22%] top-[58%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[48px] rounded-2xl border-2 z-20 font-bold text-xs md:text-sm flex items-center justify-center transition-all duration-500 shadow-sm ${currentStep === 6 ? 'bg-rose-50 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-500'}`}>
            แจ้งเตือนข้อผิดพลาด
          </div>

          {/* N7: Action (Dashboard) */}
          <div className={`absolute left-[22%] top-[82%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[64px] rounded-2xl border-2 z-20 font-bold text-xs flex flex-col items-center justify-center text-center px-4 transition-all duration-500 shadow-sm ${isNodeVisited(7) ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-slate-300 text-slate-500'}`}>
            <span>ปิดหน้า Login แล้วเปิด</span>
            <span>หน้า Dashboard ขึ้นมา</span>
          </div>

          {/* N8: Final Node */}
          <div className={`absolute left-[22%] top-[95%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-slate-800 bg-white z-20 flex items-center justify-center shadow-sm transition-all duration-500 ${currentStep === 8 ? 'ring-4 ring-slate-800/20' : ''}`}>
            <div className="w-5 h-5 rounded-full bg-slate-800"></div>
          </div>
        </div>

        {/* Control Panel Area */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full z-0"></div>
            <h3 className="font-bold text-lg text-slate-800 mb-2 border-b border-slate-100 pb-2 relative z-10">คำอธิบายการทำงาน</h3>
            
            <div className="relative z-10 min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="py-2"
                >
                  <h4 className={`font-bold text-[17px] ${currentStep === 6 ? 'text-rose-600' : currentStep >= 7 ? 'text-emerald-600' : 'text-indigo-600'}`}>
                    {STEPS[currentStep].title}
                  </h4>
                  <p className="text-slate-600 mt-2 leading-relaxed text-[15px]">
                    {STEPS[currentStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">
            <button
              onClick={nextStep}
              disabled={currentStep >= STEPS.length - 1}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold transition-all shadow-sm ${
                currentStep >= STEPS.length - 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]'
              }`}
            >
              <span>{currentStep === 0 ? 'เริ่มจำลอง' : 'ก้าวถัดไป'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>เริ่มใหม่</span>
            </button>
          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}
