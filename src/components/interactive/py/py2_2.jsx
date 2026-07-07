import React, { useState } from 'react';
import {
    Settings,
    Search,
    PenTool,
    Code2,
    Bug,
    Rocket,
    Wrench,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    FileText,
    Users,
    ShoppingCart,
    Smartphone,
    RotateCcw,
    Sparkles,
    ClipboardList,
    TestTube2,
    PackageCheck
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

export default function py2_2() {
    const [activePhase, setActivePhase] = useState(null);
    const [simStep, setSimStep] = useState(0);
    const [simStarted, setSimStarted] = useState(false);

    // ===== SDLC Phases Data =====
    const sdlcPhases = [
        {
            name: 'วิเคราะห์ความต้องการ',
            eng: 'Requirements Analysis',
            icon: <Search className="w-7 h-7" />,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            bgDark: 'bg-blue-500',
            ring: 'ring-blue-500',
            borderColor: 'border-blue-400',
            glowColor: 'bg-blue-500/20',
            desc: 'เก็บรวบรวมและวิเคราะห์ความต้องการของผู้ใช้งาน เพื่อให้เข้าใจว่าระบบที่จะพัฒนาต้องทำอะไรได้บ้าง',
            example: 'สัมภาษณ์ลูกค้า สร้างเอกสาร SRS (Software Requirements Specification)',
            output: 'เอกสารความต้องการ (SRS)'
        },
        {
            name: 'ออกแบบระบบ',
            eng: 'System Design',
            icon: <PenTool className="w-7 h-7" />,
            color: 'text-violet-500',
            bg: 'bg-violet-50',
            bgDark: 'bg-violet-500',
            ring: 'ring-violet-500',
            borderColor: 'border-violet-400',
            glowColor: 'bg-violet-500/20',
            desc: 'ออกแบบโครงสร้างของระบบ ทั้งฐานข้อมูล หน้าจอ และสถาปัตยกรรมซอฟต์แวร์ เพื่อเป็นแผนที่นำทางของนักพัฒนา',
            example: 'วาด ER Diagram, ออกแบบ UI/UX Mockup, เลือกเทคโนโลยี',
            output: 'แบบแปลนระบบ (Blueprint)'
        },
        {
            name: 'เขียนโปรแกรม',
            eng: 'Implementation',
            icon: <Code2 className="w-7 h-7" />,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
            bgDark: 'bg-emerald-500',
            ring: 'ring-emerald-500',
            borderColor: 'border-emerald-400',
            glowColor: 'bg-emerald-500/20',
            desc: 'ลงมือเขียนโค้ดจริงตามแบบที่ออกแบบไว้ โดยทีมนักพัฒนาจะแบ่งงานกันทำทีละส่วน (Module)',
            example: 'เขียนโค้ด Python สร้างฐานข้อมูล MySQL สร้างหน้าเว็บ',
            output: 'ซอร์สโค้ด (Source Code)'
        },
        {
            name: 'ทดสอบระบบ',
            eng: 'Testing',
            icon: <Bug className="w-7 h-7" />,
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            bgDark: 'bg-amber-500',
            ring: 'ring-amber-500',
            borderColor: 'border-amber-400',
            glowColor: 'bg-amber-500/20',
            desc: 'ทดสอบว่าโปรแกรมทำงานถูกต้องตรงตามความต้องการหรือไม่ หาข้อผิดพลาด (Bug) แล้วส่งกลับไปแก้ไข',
            example: 'Unit Test, Integration Test, UAT (User Acceptance Testing)',
            output: 'รายงานผลทดสอบ (Test Report)'
        },
        {
            name: 'ติดตั้งและส่งมอบ',
            eng: 'Deployment',
            icon: <Rocket className="w-7 h-7" />,
            color: 'text-rose-500',
            bg: 'bg-rose-50',
            bgDark: 'bg-rose-500',
            ring: 'ring-rose-500',
            borderColor: 'border-rose-400',
            glowColor: 'bg-rose-500/20',
            desc: 'นำซอฟต์แวร์ที่ผ่านการทดสอบแล้วไปติดตั้งบนเซิร์ฟเวอร์จริง พร้อมฝึกอบรมผู้ใช้งาน',
            example: 'ติดตั้งบน Server, อบรมพนักงาน, เปิดใช้งานจริง',
            output: 'ระบบใช้งานจริง (Production)'
        },
        {
            name: 'บำรุงรักษา',
            eng: 'Maintenance',
            icon: <Wrench className="w-7 h-7" />,
            color: 'text-cyan-500',
            bg: 'bg-cyan-50',
            bgDark: 'bg-cyan-500',
            ring: 'ring-cyan-500',
            borderColor: 'border-cyan-400',
            glowColor: 'bg-cyan-500/20',
            desc: 'ดูแลระบบหลังส่งมอบ แก้ไขข้อผิดพลาดที่พบภายหลัง ปรับปรุงฟีเจอร์ และอัปเดตให้ทันสมัย',
            example: 'แก้ Bug ที่ผู้ใช้แจ้ง, เพิ่มฟีเจอร์ใหม่, อัปเดตความปลอดภัย',
            output: 'เวอร์ชันอัปเดต (Updated System)'
        }
    ];

    // ===== SDLC Simulation Data (สร้างแอปสั่งอาหาร) =====
    const simScenario = {
        title: 'พัฒนาแอปสั่งอาหารออนไลน์ 🍕',
        steps: [
            {
                phase: 'วิเคราะห์ความต้องการ',
                icon: <Search className="w-6 h-6" />,
                color: 'text-blue-500',
                bgColor: 'bg-blue-500',
                action: 'สัมภาษณ์ร้านอาหารและลูกค้า',
                detail: 'ลูกค้าต้องการ: ดูเมนูอาหาร, เลือกสั่งของ, ชำระเงินออนไลน์, ติดตามสถานะคำสั่ง',
                result: '✅ ได้เอกสารความต้องการ (SRS) ครบถ้วน'
            },
            {
                phase: 'ออกแบบระบบ',
                icon: <PenTool className="w-6 h-6" />,
                color: 'text-violet-500',
                bgColor: 'bg-violet-500',
                action: 'ออกแบบ UI และฐานข้อมูล',
                detail: 'วาดหน้าจอแอป (Wireframe), ออกแบบตาราง: เมนู, คำสั่งซื้อ, ผู้ใช้, ร้านค้า',
                result: '✅ ได้แบบแปลน UI + Database Schema'
            },
            {
                phase: 'เขียนโปรแกรม',
                icon: <Code2 className="w-6 h-6" />,
                color: 'text-emerald-500',
                bgColor: 'bg-emerald-500',
                action: 'เขียนโค้ด Backend + Frontend',
                detail: 'Backend: Python (Flask) + MySQL | Frontend: React | Payment: PromptPay API',
                result: '✅ ซอร์สโค้ดพร้อมใช้งาน'
            },
            {
                phase: 'ทดสอบระบบ',
                icon: <Bug className="w-6 h-6" />,
                color: 'text-amber-500',
                bgColor: 'bg-amber-500',
                action: 'ทดสอบทุกฟังก์ชัน',
                detail: 'ทดสอบการสั่งอาหาร, ระบบชำระเงิน, การแจ้งเตือน → พบ Bug 3 จุด → แก้ไขเสร็จ',
                result: '✅ ผ่านการทดสอบ UAT แล้ว'
            },
            {
                phase: 'ติดตั้งและส่งมอบ',
                icon: <Rocket className="w-6 h-6" />,
                color: 'text-rose-500',
                bgColor: 'bg-rose-500',
                action: 'เปิดให้บริการจริง',
                detail: 'อัปโหลดขึ้น Cloud Server, เผยแพร่บน App Store / Google Play, อบรมร้านค้า',
                result: '✅ แอปเปิดให้บริการแล้ว! 🎉'
            },
            {
                phase: 'บำรุงรักษา',
                icon: <Wrench className="w-6 h-6" />,
                color: 'text-cyan-500',
                bgColor: 'bg-cyan-500',
                action: 'ดูแลและปรับปรุง',
                detail: 'แก้ Bug ที่ผู้ใช้แจ้ง, เพิ่มระบบรีวิวร้านอาหาร, ปรับปรุง UI ให้สวยขึ้น',
                result: '✅ อัปเดตเวอร์ชัน 1.1 สำเร็จ'
            }
        ]
    };

    return (
        <div className="w-full mx-auto space-y-8 font-['Inter',_'Noto_Sans_Thai'] pb-12">
            {/* Layer 1: Ambient Backdrop */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[5%] left-[15%] w-[550px] h-[550px] bg-violet-500/8 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[5%] right-[10%] w-[450px] h-[450px] bg-emerald-500/8 rounded-full blur-[120px]"></div>
                <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] bg-rose-500/6 rounded-full blur-[100px]"></div>
            </div>

            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-12">

                {/* ===== Card 1: ความหมายและความสำคัญของ SDLC ===== */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
                                <Settings className="w-6 h-6" />
                            </div>
                            <h3 className="text-[28px] font-bold text-zinc-900 leading-relaxed tracking-tight">
                                ความหมายและความสำคัญของ SDLC
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {/* คำจำกัดความ */}
                            <div className="p-6 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-100">
                                <p className="text-[16px] text-zinc-700 leading-loose">
                                    <strong className="text-violet-700">SDLC (Software Development Life Cycle)</strong> หรือ <strong>วงจรการพัฒนาซอฟต์แวร์</strong> คือ กระบวนการที่เป็นขั้นเป็นตอนสำหรับวางแผน สร้าง ทดสอบ และส่งมอบซอฟต์แวร์ที่มีคุณภาพ โดยมีเป้าหมายเพื่อผลิตซอฟต์แวร์ที่ตรงตามความต้องการของลูกค้า ภายในงบประมาณและระยะเวลาที่กำหนด
                                </p>
                            </div>

                            {/* ทำไมต้องมี SDLC (3 cards) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="group p-5 bg-white rounded-xl border border-zinc-200 hover:border-violet-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <ClipboardList className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[18px] font-bold text-zinc-900 mb-2">ลดความเสี่ยง</h4>
                                    <p className="text-[14px] text-zinc-600 leading-relaxed">มีขั้นตอนชัดเจน ทำให้สามารถคาดการณ์ปัญหาล่วงหน้าและวางแผนรับมือได้ก่อนที่จะสายเกินไป</p>
                                </div>
                                <div className="group p-5 bg-white rounded-xl border border-zinc-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <TestTube2 className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[18px] font-bold text-zinc-900 mb-2">รับประกันคุณภาพ</h4>
                                    <p className="text-[14px] text-zinc-600 leading-relaxed">มีขั้นตอนการทดสอบอย่างเป็นระบบ ทำให้มั่นใจได้ว่าซอฟต์แวร์ที่ส่งมอบจะทำงานได้อย่างถูกต้อง</p>
                                </div>
                                <div className="group p-5 bg-white rounded-xl border border-zinc-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <PackageCheck className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[18px] font-bold text-zinc-900 mb-2">ส่งมอบตรงเวลา</h4>
                                    <p className="text-[14px] text-zinc-600 leading-relaxed">การแบ่งงานเป็นระยะ (Phase) ช่วยให้ประเมินเวลาและทรัพยากรได้แม่นยำ ส่งมอบงานได้ตามกำหนด</p>
                                </div>
                            </div>

                            {/* อุปมา */}
                            <div className="flex items-start gap-4 p-5 bg-zinc-900 rounded-xl text-white">
                                <div className="text-3xl shrink-0 mt-1">🏗️</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">อุปมาให้เห็นภาพ</h4>
                                    <p className="text-[15px] text-zinc-300 leading-relaxed">
                                        คิดง่ายๆ ว่า SDLC เปรียบเหมือน <strong className="text-white">\"ขั้นตอนการสร้างบ้าน\"</strong> — ก่อนสร้างบ้านต้องสำรวจที่ดิน → ออกแบบพิมพ์เขียว → ก่อสร้าง → ตรวจรับ → ส่งมอบให้ลูกค้า → ดูแลซ่อมแซม ถ้าข้ามขั้นตอนไป เช่น ไม่ออกแบบแล้วลงมือสร้างเลย บ้านก็อาจพังได้!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Card 2: ระยะต่างๆ ใน SDLC (Interactive) ===== */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                                <RotateCcw className="w-6 h-6" />
                            </div>
                            <h3 className="text-[28px] font-bold text-zinc-900 leading-relaxed tracking-tight">
                                ระยะต่างๆ ในวงจรการพัฒนาซอฟต์แวร์
                            </h3>
                        </div>

                        <p className="text-[16px] text-zinc-600 leading-relaxed mb-8">
                            SDLC ประกอบด้วย <strong>6 ระยะหลัก</strong> ที่ต่อเนื่องกันเป็นวงจร เมื่อจบระยะสุดท้ายแล้วอาจวนกลับมาปรับปรุงใหม่ได้ <strong>คลิกแต่ละระยะเพื่อดูรายละเอียด</strong>
                        </p>

                        {/* Circular SDLC Diagram (SVG) */}
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Phase buttons */}
                            <div className="w-full lg:w-2/5 flex flex-col gap-3">
                                {sdlcPhases.map((phase, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActivePhase(activePhase === idx ? null : idx)}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 active:scale-98 flex items-center gap-4 group ${
                                            activePhase === idx
                                                ? `bg-white shadow-xl ring-2 ${phase.ring} border-transparent`
                                                : 'bg-zinc-50 border border-zinc-200 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                            activePhase === idx 
                                                ? `${phase.bgDark} text-white shadow-lg` 
                                                : `${phase.bg} ${phase.color}`
                                        }`}>
                                            {phase.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold text-[16px] ${activePhase === idx ? 'text-zinc-900' : 'text-zinc-700'}`}>
                                                    {phase.name}
                                                </span>
                                                <span className="text-xs text-zinc-400 font-mono hidden sm:inline">({phase.eng})</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                                            activePhase === idx ? 'rotate-90 text-zinc-900' : 'text-zinc-400'
                                        }`} />
                                    </button>
                                ))}

                                {/* วงจร indicator */}
                                <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg text-zinc-500 text-sm">
                                    <RotateCcw className="w-4 h-4" />
                                    <span>จากนั้นวนกลับมาที่ระยะแรกเพื่อปรับปรุงต่อ</span>
                                </div>
                            </div>

                            {/* Detail Panel */}
                            <div className="w-full lg:w-3/5 sticky top-24">
                                {activePhase !== null ? (
                                    <div key={activePhase} className="bg-zinc-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl min-h-[320px] animate-fade-in-up">
                                        <div className={`absolute top-0 right-0 w-48 h-48 blur-[80px] rounded-full ${sdlcPhases[activePhase].glowColor}`}></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${sdlcPhases[activePhase].bgDark} text-white shadow-lg`}>
                                                    {React.cloneElement(sdlcPhases[activePhase].icon, { className: "w-8 h-8" })}
                                                </div>
                                                <div>
                                                    <div className="text-sm text-zinc-400 font-mono">Phase {activePhase + 1} / 6</div>
                                                    <h4 className="text-[24px] font-bold">{sdlcPhases[activePhase].name}</h4>
                                                </div>
                                            </div>

                                            <p className="text-[16px] text-zinc-300 leading-relaxed mb-6">
                                                {sdlcPhases[activePhase].desc}
                                            </p>

                                            <div className="space-y-3">
                                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                                    <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1 font-bold">ตัวอย่างกิจกรรม</div>
                                                    <p className="text-[15px] text-zinc-200 leading-relaxed">{sdlcPhases[activePhase].example}</p>
                                                </div>
                                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                                    <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1 font-bold">ผลลัพธ์ที่ได้ (Output)</div>
                                                    <p className="text-[15px] text-emerald-300 font-semibold">{sdlcPhases[activePhase].output}</p>
                                                </div>
                                            </div>

                                            {/* Navigation */}
                                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                                                <button
                                                    onClick={() => setActivePhase(activePhase > 0 ? activePhase - 1 : 5)}
                                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition-all active:scale-95"
                                                >
                                                    ← ก่อนหน้า
                                                </button>
                                                <div className="flex gap-1.5">
                                                    {sdlcPhases.map((_, i) => (
                                                        <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === activePhase ? 'bg-white w-6' : 'bg-white/30'}`}></div>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => setActivePhase(activePhase < 5 ? activePhase + 1 : 0)}
                                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition-all active:scale-95"
                                                >
                                                    ถัดไป →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-300 p-12 flex flex-col items-center justify-center text-center min-h-[320px]">
                                        <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center mb-4">
                                            <Sparkles className="w-10 h-10 text-zinc-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-zinc-500 mb-2">เลือกระยะเพื่อดูรายละเอียด</h4>
                                        <p className="text-zinc-400 text-sm">คลิกที่ระยะใดระยะหนึ่งทางด้านซ้ายเพื่อศึกษาข้อมูลเชิงลึก</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Card 3: ตัวอย่างการใช้งาน SDLC (Simulator) ===== */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-[28px] font-bold text-zinc-900 leading-relaxed tracking-tight">
                                ตัวอย่างการใช้งาน SDLC
                            </h3>
                        </div>

                        <p className="text-[16px] text-zinc-600 leading-relaxed mb-4">
                            ลองจำลองการพัฒนาซอฟต์แวร์จริงผ่าน SDLC ทั้ง 6 ระยะ ด้วยโจทย์ <strong>"{simScenario.title}"</strong>
                        </p>

                        {/* Simulator Controls */}
                        <div className="mb-6 flex items-center gap-3">
                            {!simStarted ? (
                                <button
                                    onClick={() => { setSimStarted(true); setSimStep(0); }}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-rose-500/25 active:scale-95 transition-all text-[15px]"
                                >
                                    <Rocket className="w-5 h-5" /> เริ่มจำลองการพัฒนา
                                </button>
                            ) : (
                                <button
                                    onClick={() => { setSimStarted(false); setSimStep(0); }}
                                    className="inline-flex items-center gap-2 bg-zinc-200 text-zinc-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-zinc-300 active:scale-95 transition-all text-sm"
                                >
                                    <RotateCcw className="w-4 h-4" /> เริ่มใหม่
                                </button>
                            )}
                        </div>

                        {simStarted && (
                            <div className="space-y-4 animate-fade-in-up">
                                {/* Progress Bar */}
                                <div className="flex items-center gap-2 mb-6">
                                    {simScenario.steps.map((_, i) => (
                                        <React.Fragment key={i}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-500 ${
                                                i < simStep ? 'bg-emerald-500 text-white scale-90'
                                                : i === simStep ? 'bg-zinc-900 text-white ring-4 ring-zinc-900/20 scale-110'
                                                : 'bg-zinc-200 text-zinc-400'
                                            }`}>
                                                {i < simStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                                            </div>
                                            {i < simScenario.steps.length - 1 && (
                                                <div className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                                                    i < simStep ? 'bg-emerald-400' : 'bg-zinc-200'
                                                }`}></div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>

                                {/* Current Step Detail */}
                                <div key={simStep} className="bg-zinc-900 rounded-2xl p-6 text-white relative overflow-hidden animate-fade-in-up">
                                    <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full ${
                                        simStep === 0 ? 'bg-blue-500/30' :
                                        simStep === 1 ? 'bg-violet-500/30' :
                                        simStep === 2 ? 'bg-emerald-500/30' :
                                        simStep === 3 ? 'bg-amber-500/30' :
                                        simStep === 4 ? 'bg-rose-500/30' :
                                        'bg-cyan-500/30'
                                    }`}></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-10 h-10 rounded-lg ${simScenario.steps[simStep].bgColor} text-white flex items-center justify-center`}>
                                                {simScenario.steps[simStep].icon}
                                            </div>
                                            <div>
                                                <div className="text-xs text-zinc-400 font-mono">ระยะที่ {simStep + 1}/6</div>
                                                <h4 className="text-lg font-bold">{simScenario.steps[simStep].phase}</h4>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="p-3 bg-white/10 rounded-lg">
                                                <span className="text-xs text-zinc-400 font-bold uppercase">กิจกรรม:</span>
                                                <p className="text-[15px] text-white mt-1">{simScenario.steps[simStep].action}</p>
                                            </div>
                                            <div className="p-3 bg-white/10 rounded-lg">
                                                <span className="text-xs text-zinc-400 font-bold uppercase">รายละเอียด:</span>
                                                <p className="text-[15px] text-zinc-300 mt-1 leading-relaxed">{simScenario.steps[simStep].detail}</p>
                                            </div>
                                            <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-lg">
                                                <p className="text-[15px] text-emerald-300 font-semibold">{simScenario.steps[simStep].result}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            {simStep > 0 && (
                                                <button
                                                    onClick={() => setSimStep(prev => prev - 1)}
                                                    className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition-all active:scale-95"
                                                >
                                                    ← ย้อนกลับ
                                                </button>
                                            )}
                                            {simStep < simScenario.steps.length - 1 ? (
                                                <button
                                                    onClick={() => setSimStep(prev => prev + 1)}
                                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 transition-all active:scale-95"
                                                >
                                                    ดำเนินการระยะถัดไป <ArrowRight className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <div className="flex-1 p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 rounded-lg text-center">
                                                    <p className="text-emerald-300 font-bold text-lg">🎉 ครบทุกระยะของ SDLC แล้ว!</p>
                                                    <p className="text-zinc-400 text-sm mt-1">จากนั้นจะวนกลับไปเริ่ม "บำรุงรักษา" → "วิเคราะห์ความต้องการใหม่" เป็นวงจรต่อเนื่อง</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== TeacherTask ===== */}
                <TeacherTask
                    title="ภารกิจประจำหัวข้อ"
                    description="ให้นักเรียนยกตัวอย่างซอฟต์แวร์หรือแอปพลิเคชันที่นักเรียนใช้งานในชีวิตประจำวัน 1 ตัว แล้วลองจำลองขั้นตอน SDLC ทั้ง 6 ระยะ สำหรับการพัฒนาซอฟต์แวร์นั้น"
                    code={`# ตัวอย่างรูปแบบการตอบ (สมมุติเลือก "แอปเช็คตารางเรียน")

1. วิเคราะห์ความต้องการ: ......
2. ออกแบบระบบ: ......
3. เขียนโปรแกรม: ......
4. ทดสอบระบบ: ......
5. ติดตั้งและส่งมอบ: ......
6. บำรุงรักษา: ......
`}
                />
            </main>

            {/* Animations */}
            <style jsx="true">{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(12px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
