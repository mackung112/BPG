/**
 * it4_1.jsx — สื่อกลางและการเชื่อมต่อทางกายภาพ (Network Media & Cabling)
 * =========================================================================
 * บทเรียนรวมบทที่ 4:
 *   4.1 อุปกรณ์เครือข่ายคอมพิวเตอร์พื้นฐาน (Basic Network Equipment)
 *   4.2 สายสัญญาณคอมพิวเตอร์และสื่อกลาง (Network Cables & Transmission Media)
 *   4.3 มาตรฐานการจัดสีและการเข้าหัวสาย LAN (Wiring Standards)
 *   4.4 ขั้นตอนการปฏิบัติการเข้าหัวสายแลน RJ-45 (Termination Steps)
 * 
 * ระบบจำลองแบบรวมหน้าเดียว (Interactive UTP Termination Master Simulator):
 *   - Phase 1: Arrange - เรียงสีสายแลนตามมาตรฐาน T568B
 *   - Phase 2: Crimp - จำลองการใช้คีมย้ำทองแดงเข้าสัมผัสสาย
 *   - Phase 3: Test Cable - สแกนไฟกะพริบเช็คสัญญาณ Pin 1-8
 * 
 * ธีมสี: Indigo / Blue / Sky (Cabling & Hardware Infrastructure Palette)
 */
import React, { useState, useEffect } from 'react';
import { AmbientBackdrop, SectionBlock, ConceptCard, SimulatorShell, QuizEngine } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// === สร้าง SVG Icons แบบ Inline เพื่อความเสถียรและความเข้ากันได้สูงสุดของระบบ Preview ===
const CableIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 3h12a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" />
    <path d="M10 11v8a3 3 0 0 0 3 3h5" />
    <circle cx="6" cy="7" r="1" />
    <circle cx="18" cy="7" r="1" />
  </svg>
);

const ToolsIcon = () => (
  <svg className="w-[1.2rem] h-[1.2rem] inline-block mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const NetworkIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M12 8v8M5 16v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const RotateIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CpuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

/* ── Ambient Blobs (Chapter 4 Theme Blobs) ──────────────── */
const IT4_UNIFIED_BLOBS = [
  { color: 'bg-indigo-200', size: 'w-[500px] h-[500px]', position: '-top-20 -left-20', opacity: 'opacity-30' },
  { color: 'bg-blue-200', size: 'w-[400px] h-[400px]', position: 'top-1/4 -right-20', opacity: 'opacity-25' },
  { color: 'bg-sky-200', size: 'w-[400px] h-[400px]', position: 'bottom-1/3 left-1/3', opacity: 'opacity-20' },
  { color: 'bg-cyan-200', size: 'w-[500px] h-[500px]', position: 'bottom-10 right-10', opacity: 'opacity-25' },
];

/* ── Data: 4.1 Network Devices ────────────────────────────────── */
const NETWORK_DEVICES = [
  {
    icon: <NetworkIcon />,
    title: 'สวิตช์เครือข่าย (Switch)',
    desc: 'ทำหน้าที่เป็นตัวกลางเชื่อมต่ออุปกรณ์คอมพิวเตอร์หลายเครื่องในวงแลน (LAN) เดียวกัน มีจุดเด่นคือส่งข้อมูลได้แม่นยำแยกตามพอร์ตอุปกรณ์ปลายทาง',
    accent: 'indigo',
    detail: 'ทำงานใน Layer 2 (Data Link Layer) — จดจำ MAC Address ของอุปกรณ์เพื่อสวิตช์และส่งข้อมูลโดยเฉพาะพอร์ต ป้องกันการชนกันของสัญญาณ',
  },
  {
    icon: <ArrowRightIcon />,
    title: 'เราเตอร์ (Router)',
    desc: 'อุปกรณ์หลักในการจัดเส้นทางข้อมูลระหว่างเครือข่าย ทำหน้าที่เชื่อมโยงวงแลนย่อยต่าง ๆ เข้ากัน และเป็นประตูออกสู่อินเทอร์เน็ตภายนอก',
    accent: 'blue',
    detail: 'ทำงานใน Layer 3 (Network Layer) — ค้นหาเส้นทางที่ดีที่สุดตามตาราง Routing Table และข้อมูล IP Address ในการรับส่งแพ็กเกจข้อมูล',
  },
  {
    icon: <CpuIcon />,
    title: 'จุดเชื่อมต่อสัญญาณไร้สาย (Access Point)',
    desc: 'ทำหน้าที่กระจายสัญญาณไวไฟ (Wi-Fi) เพื่อให้อุปกรณ์พกพา เช่น แล็ปท็อป แท็บเล็ต หรือมือถือ สามารถล็อกอินเข้าใช้วงเน็ตเวิร์กสายหลักได้',
    accent: 'cyan',
    detail: 'ทำหน้าที่เสมือนเป็นสวิตช์ไร้สาย ขยายขอบเขตทางกายภาพ โดยส่งสัญญาณคลื่นวิทยุความถี่สูงแทนการเดินสายสัญญาณย่อยไปยังผู้ใช้',
  },
  {
    icon: <CableIcon />,
    title: 'การ์ดเครือข่าย (Network Interface Card - NIC)',
    desc: 'แผงวงจรควบคุมหลักที่อยู่บนเมนบอร์ด ทำหน้าที่แปลงชุดรหัสข้อมูลดิจิทัลให้อยู่ในรูปของสัญญาณไฟฟ้าเพื่อรับส่งผ่านสายแลนผ่านพอร์ต RJ-45',
    accent: 'sky',
    detail: 'มีการระบุรหัสประจำตัวทางกายภาพเรียกว่า MAC Address ซึ่งสลักมาจากโรงงานผู้ผลิตและไม่ซ้ำกันเลยในเครื่องคอมพิวเตอร์ทั่วโลก',
  },
];

/* ── Data: 4.2 Cables ────────────────────────────────────────── */
const CABLE_CATEGORIES = [
  {
    name: 'CAT 5e',
    bandwidth: '100 MHz',
    speed: '1 Gbps (1,000 Mbps)',
    dist: '100 เมตร',
    desc: 'มาตรฐานสายแลนดั้งเดิมที่นิยมใช้เดินตามบ้านพักอาศัยทั่วไป มีราคาประหยัด ติดตั้งง่ายและยืดหยุ่นสูง',
    accent: 'sky',
  },
  {
    name: 'CAT 6',
    bandwidth: '250 MHz',
    speed: '10 Gbps (ระยะไม่เกิน 55 ม.) / 1 Gbps (ระยะ 100 ม.)',
    dist: '55 - 100 เมตร',
    desc: 'มีความเร็วและแบนด์วิดท์สูงขึ้น มีแกนแกนพลาสติกทรงกากบาทแยกคู่สายสัญญาณข้างในเพื่อลดสัญญาณรบกวน',
    accent: 'blue',
  },
  {
    name: 'CAT 6A',
    bandwidth: '500 MHz',
    speed: '10 Gbps (สปีดเต็มพิกัด)',
    dist: '100 เมตร',
    desc: 'พัฒนาเกราะและฉนวนป้องกันสัญญาณรบกวนข้ามสายได้ดียิ่งขึ้น รองรับความเร็ว 10 Gbps ได้ยาวเต็มความยาวสายสากล',
    accent: 'indigo',
  },
];

/* ── Data: 4.3 Color Codes ────────────────────────────────────── */
const T568B_COLORS = [
  { id: 'wo', name: 'ขาว-ส้ม', code: 'white-orange', bgClass: 'bg-amber-100 border-t-4 border-orange-500 text-amber-950 font-bold' },
  { id: 'o', name: 'ส้ม', code: 'orange', bgClass: 'bg-orange-500 text-white font-bold' },
  { id: 'wg', name: 'ขาว-เขียว', code: 'white-green', bgClass: 'bg-emerald-100 border-t-4 border-emerald-500 text-emerald-950 font-bold' },
  { id: 'b', name: 'น้ำเงิน', code: 'blue', bgClass: 'bg-blue-600 text-white font-bold' },
  { id: 'wb', name: 'ขาว-น้ำเงิน', code: 'white-blue', bgClass: 'bg-blue-100 border-t-4 border-blue-500 text-blue-950 font-bold' },
  { id: 'g', name: 'เขียว', code: 'green', bgClass: 'bg-emerald-600 text-white font-bold' },
  { id: 'wbr', name: 'ขาว-น้ำตาล', code: 'white-brown', bgClass: 'bg-amber-50 border-t-4 border-amber-800 text-amber-900 font-bold' },
  { id: 'br', name: 'น้ำตาล', code: 'brown', bgClass: 'bg-amber-800 text-white font-bold' }
];

const T568A_COLORS = [
  { id: 'wg', name: 'ขาว-เขียว', code: 'white-green', bgClass: 'bg-emerald-100 border-t-4 border-emerald-500 text-emerald-950 font-bold' },
  { id: 'g', name: 'เขียว', code: 'green', bgClass: 'bg-emerald-600 text-white font-bold' },
  { id: 'wo', name: 'ขาว-ส้ม', code: 'white-orange', bgClass: 'bg-amber-100 border-t-4 border-orange-500 text-amber-950 font-bold' },
  { id: 'b', name: 'น้ำเงิน', code: 'blue', bgClass: 'bg-blue-600 text-white font-bold' },
  { id: 'wb', name: 'ขาว-น้ำเงิน', code: 'white-blue', bgClass: 'bg-blue-100 border-t-4 border-blue-500 text-blue-950 font-bold' },
  { id: 'o', name: 'ส้ม', code: 'orange', bgClass: 'bg-orange-500 text-white font-bold' },
  { id: 'wbr', name: 'ขาว-น้ำตาล', code: 'white-brown', bgClass: 'bg-amber-50 border-t-4 border-amber-800 text-amber-900 font-bold' },
  { id: 'br', name: 'น้ำตาล', code: 'brown', bgClass: 'bg-amber-800 text-white font-bold' }
];

/* ── Data: 4.5 Unified Quiz ───────────────────────────────────── */
const QUIZ_LEVELS_CABLE = [
  {
    title: 'ข้อใดอธิบายหน้าที่การทำงานของสวิตช์เครือข่าย (Switch) ได้ถูกต้องที่สุด?',
    desc: 'เลือกนิยามการทำงานของอุปกรณ์ในเครือข่ายวงแลนเดียวกัน',
    options: [
      { key: 'A', text: 'เชื่อมอินเทอร์เน็ตภายนอกเข้าหาวงแลนเพื่อค้นหา IP ของเว็บ', isCorrect: false },
      { key: 'B', text: 'เป็นสื่อกลางไร้สายกระจายสัญญาณไวไฟให้อุปกรณ์พกพา', isCorrect: false },
      { key: 'C', text: 'เชื่อมต่ออุปกรณ์ในวงแลนเดียวกัน โดยส่งข้อมูลตรงพอร์ตปลายทางตาม MAC Address', isCorrect: true },
      { key: 'D', text: 'แปลงพลังงานไฟกระแสสลับมาจ่ายบอร์ดคอมพิวเตอร์', isCorrect: false },
    ],
    tip: 'Switch จะบันทึกตาราง MAC Address Table เพื่อสลับช่องสัญญาณส่งข้อมูลตรงหาคอมพิวเตอร์พอร์ตปลายทางโดยไม่ส่งกวนพอร์ตอื่น',
  },
  {
    title: 'สายสัญญาณประเภทใดมีเกราะชีลด์ฟอยล์โลหะเสริมภายในเพื่อป้องกันคลื่นสัญญาณแม่เหล็กไฟฟ้ารบกวนข้ามสาย?',
    desc: 'เลือกประเภทสายสัญญาณที่ระบุฉนวนป้องกันสัญญาณรบกวนภายนอก',
    options: [
      { key: 'A', text: 'สาย UTP (Unshielded Twisted Pair)', isCorrect: false },
      { key: 'B', text: 'สาย STP (Shielded Twisted Pair)', isCorrect: true },
      { key: 'C', text: 'สาย Coaxial เปลือกเดี่ยว', isCorrect: false },
      { key: 'D', text: 'สาย Fiber Optic แกนพลาสติก', isCorrect: false },
    ],
    tip: 'สาย STP (Shielded) มีฟอยล์โลหะหุ้มเป็นเกราะเสริมเพื่อบล็อกคลื่นรบกวนภายนอก เหมาะสำหรับโซนโรงงานอุตสาหกรรม',
  },
  {
    title: 'ตามมาตรฐานสากล T568B ในการเข้าหัวสาย LAN ลำดับสี 3 เส้นแรกต้องเรียงตามข้อใด?',
    desc: 'เลือกคู่ลำดับสีทองแดง T568B ที่ถูกต้อง',
    options: [
      { key: 'A', text: 'ขาวเขียว → เขียว → ขาวส้ม', isCorrect: false },
      { key: 'B', text: 'ขาวส้ม → ส้ม → ขาวเขียว', isCorrect: true },
      { key: 'C', text: 'ขาวน้ำเงิน → น้ำเงิน → ขาวเขียว', isCorrect: false },
      { key: 'D', text: 'ขาวส้ม → ขาวเขียว → ส้ม', isCorrect: false },
    ],
    tip: 'มาตรฐาน T568B ยอดนิยมจะเริ่มด้วยคู่สีส้ม: ขาวส้ม (พิน 1) -> ส้ม (พิน 2) -> ขาวเขียว (พิน 3)',
  },
  {
    title: 'เมื่อต้องการเชื่อมต่อคอมพิวเตอร์ 2 เครื่องโดยตรงแบบเครื่องชนเครื่อง (PC-to-PC) โดยไม่ผ่าน Switch จะต้องเข้าหัวสายแลนชนิดใด?',
    desc: 'เลือกประเภทสายต่อพ่วงสัญญาณทางกายภาพ',
    options: [
      { key: 'A', text: 'สายตรง (Straight-through Cable) โดยสลับพอร์ตที่ตัวบอร์ด', isCorrect: false },
      { key: 'B', text: 'สายไขว้ (Crossover Cable) เข้า T568A ฝั่งหนึ่ง และ T568B อีกฝั่งหนึ่ง', isCorrect: true },
      { key: 'C', text: 'สายคู่แบบ MDI-X สำรองข้อมูล', isCorrect: false },
      { key: 'D', text: 'สาย Coaxial เชื่อมโยงตรงผ่านการ์ดเสียง', isCorrect: false },
    ],
    tip: 'การต่ออุปกรณ์ชนิดเดียวกันตรงๆ ต้องใช้สายไขว้ (Crossover) เพื่อให้พินส่งข้อมูล (TX) ฝั่งหนึ่งตรงพอร์ตรับ (RX) ของอีกฝั่งหนึ่ง',
  },
  {
    title: 'ในขั้นตอนการทดสอบสัญญาณผ่านเครื่อง Cable Tester ไฟ LED ของพิน 1-8 ควรมีพฤติกรรมอย่างไรจึงจะพร้อมใช้งาน?',
    desc: 'เลือกพฤติกรรมดวงไฟ LED ตรวจเช็คสายสัญญาณสำเร็จ',
    options: [
      { key: 'A', text: 'ไฟติดนิ่งค้างสีส้มพร้อมกันทุกดวงบนเครื่องเทส', isCorrect: false },
      { key: 'B', text: 'ไฟกะพริบวิ่งกวาดสลับดวงคี่และดวงคู่สลับไปมา', isCorrect: false },
      { key: 'C', text: 'ไฟวิ่งกะพริบเรียงลำดับพิน 1 ถึง 8 ขนานตรงกันทั้งฝั่ง Master และ Remote', isCorrect: true },
      { key: 'D', text: 'ไฟฝั่ง Remote ดับทั้งหมดเพื่อยืนยันว่าสัญญาณไม่มีกระแสไหลวน', isCorrect: false },
    ],
    tip: 'ไฟต้องกะพริบไล่ลำดับตั้งแต่ 1 ไปถึง 8 ทีละดวงพร้อมกันทั้งสองฝั่ง แสดงว่าขั้วทองแดงสัมผัสครบถ้วนและไม่สลับไขว้สาย',
  },
];

/* ── SUB-COMPONENT: Device Info Card ───────────────────────────── */
function DeviceCard({ device }) {
  const [expanded, setExpanded] = useState(false);
  const accent = device.accent;

  const ACCENT_BORDER = {
    indigo: 'border-indigo-200/60 hover:border-indigo-400/80',
    blue: 'border-blue-200/60 hover:border-blue-400/80',
    cyan: 'border-cyan-200/60 hover:border-cyan-400/80',
    sky: 'border-sky-200/60 hover:border-sky-400/80',
  };

  const ACCENT_ICON_BG = {
    indigo: 'bg-indigo-50 text-indigo-650',
    blue: 'bg-blue-50 text-blue-650',
    cyan: 'bg-cyan-50 text-cyan-650',
    sky: 'bg-sky-50 text-sky-650',
  };

  const ACCENT_TEXT = {
    indigo: 'text-indigo-650',
    blue: 'text-blue-650',
    cyan: 'text-cyan-650',
    sky: 'text-sky-650',
  };

  const ACCENT_BG = {
    indigo: 'bg-indigo-50/50',
    blue: 'bg-blue-50/50',
    cyan: 'bg-cyan-50/50',
    sky: 'bg-sky-50/50',
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`bg-white/70 backdrop-blur-xl border ${ACCENT_BORDER[accent]} shadow-xl rounded-[2rem] p-7 
        hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${ACCENT_BG[accent]} rounded-bl-full z-0 transition-transform group-hover:scale-110`} />

      <div className="relative z-10">
        <div className="flex items-start gap-5 mb-3">
          <div className={`p-4 rounded-2xl ${ACCENT_ICON_BG[accent]} ${ACCENT_TEXT[accent]} 
            transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0`}>
            {device.icon}
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="text-lg font-bold text-zinc-900 leading-snug mb-1">{device.title}</h4>
            <p className="text-[14.5px] md:text-[15.5px] text-zinc-605 leading-relaxed">{device.desc}</p>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-350 ${expanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className={`${ACCENT_BG[accent]} border ${ACCENT_BORDER[accent]} rounded-2xl p-4 border-l-[3.5px] border-l-indigo-500`}>
            <p className="text-[13.5px] text-zinc-700 leading-relaxed font-mono">{device.detail}</p>
          </div>
        </div>
        
        <div className="text-right mt-3">
          <span className={`text-[12px] font-bold ${ACCENT_TEXT[accent]} flex items-center justify-end gap-1`}>
            {expanded ? 'ย่อรายละเอียด ▲' : 'ดูรายละเอียดเพิ่มเติม ▼'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN EXPORT COMPONENT ──────────────────────────────────────── */
export default function It4_1() {
  /* ── State สำหรับ Toast Notification ── */
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showNotification = (msg, type = 'info') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  /* ── STATE: UTP Crimp Simulator ────────────────────────────────── */
  const [simPhase, setSimPhase] = useState('arrange'); // arrange, crimp, test
  const [poolWires, setPoolWires] = useState([]); // กองสายแลนรอเลือก
  const [userWireOrder, setUserWireOrder] = useState([]); // สายแลนที่จัดเข้าพิน
  const [crimpProgress, setCrimpProgress] = useState(0);
  const [crimpCompleted, setCrimpCompleted] = useState(false);
  const [testLedIndex, setTestLedIndex] = useState(-1);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // pass, fail, null

  // สุ่มลำดับสายแลนเมื่อโหลดหน้าจำลอง หรือรีเซ็ตค่า
  const initializeSimulator = () => {
    const shuffled = [...T568B_COLORS].sort(() => Math.random() - 0.5);
    setPoolWires(shuffled);
    setUserWireOrder([]);
    setSimPhase('arrange');
    setCrimpProgress(0);
    setCrimpCompleted(false);
    setTestLedIndex(-1);
    setIsTesting(false);
    setTestResult(null);
    showNotification("รีเซ็ตแผงฝึกหัดและสุ่มลำดับกองสายสัญญาณแล้ว", "info");
  };

  useEffect(() => {
    // โหลดลำดับสุ่มของสายเมื่อครั้งแรก
    const shuffled = [...T568B_COLORS].sort(() => Math.random() - 0.5);
    setPoolWires(shuffled);
  }, []);

  // เมื่อผู้เรียนเลือกหยิบสายจากกองเข้าใส่พิน
  const handleSelectWire = (wire) => {
    if (userWireOrder.length >= 8) return;
    setUserWireOrder([...userWireOrder, wire]);
    setPoolWires(poolWires.filter(w => w.id !== wire.id));
  };

  // ดึงสายล่าสุดคืนสู่กอง
  const handleRemoveLastWire = () => {
    if (userWireOrder.length === 0) return;
    const last = userWireOrder[userWireOrder.length - 1];
    setUserWireOrder(userWireOrder.slice(0, -1));
    setPoolWires([...poolWires, last]);
  };

  // ตรวจการจัดลำดับว่าถูกต้องตาม T568B หรือไม่
  const verifyWireOrder = () => {
    const correctSequence = T568B_COLORS.map(c => c.id);
    const userSequence = userWireOrder.map(c => c.id);
    return JSON.stringify(correctSequence) === JSON.stringify(userSequence);
  };

  // สอดเข้าหัว RJ-45 และเข้าสู่สเต็ปบีบย้ำสาย
  const handleInsertIntoRJ45 = () => {
    if (userWireOrder.length < 8) {
      showNotification("คำแนะนำ: กรุณาจัดสีสายไฟเข้าพอร์ตพินให้ครบถ้วนทั้ง 8 พินก่อนครับ!", "warning");
      return;
    }
    setSimPhase('crimp');
    showNotification("สอดสายสัญญาณเข้าหัว RJ-45 แล้ว! นำเข้าคีมเพื่อบีบย้ำสาย", "success");
  };

  // การทำงานของคีมบีบย้ำหัวแลน
  const handleCrimpAction = () => {
    if (crimpProgress >= 100) return;
    setCrimpProgress(prev => {
      const next = prev + 25;
      if (next >= 100) {
        setCrimpCompleted(true);
        showNotification("บีบอัดขั้วทองแดงยึดสายสัญญาณเข้ากับหัว RJ-45 แน่นสนิทแล้ว!", "success");
        return 100;
      }
      return next;
    });
  };

  // เข้าสู่ส่วนทดสอบสายแลน (Cable Tester)
  const handleGoToTest = () => {
    setSimPhase('test');
    showNotification("เข้าสู่แผงทดสอบสาย LAN เสียบสายเข้ากับขั้วเครื่องสแกน", "info");
  };

  // เริ่มรันไฟกะพริบ LED บนเครื่องสแกน
  const handleStartCableTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    setTestLedIndex(0);
    setTestResult(null);
  };

  // ไล่สลักกะพริบ LED 1 ถึง 8 ทีละดวงอย่างสมดุล ป้องกันเครื่องค้าง
  useEffect(() => {
    let timer;
    if (isTesting && testLedIndex >= 0 && testLedIndex < 8) {
      timer = setTimeout(() => {
        setTestLedIndex(prev => prev + 1);
      }, 300);
    } else if (isTesting && testLedIndex === 8) {
      setIsTesting(false);
      const isCorrect = verifyWireOrder();
      if (isCorrect) {
        setTestResult('pass');
        showNotification("PASS! สัญญาณไฟวิ่งสมบูรณ์ครบถ้วน 100% สายแลนพร้อมใช้งาน", "success");
      } else {
        setTestResult('fail');
        showNotification("FAIL! สัญญาณขาดหาย ขั้วพินสลับตำแหน่งเนื่องจากเรียงสีไม่ตรงมาตรฐาน", "warning");
      }
    }
    return () => clearTimeout(timer);
  }, [isTesting, testLedIndex]);

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-sky-200 selection:text-sky-900">
      {/* Layer 1: Ambient Background */}
      <AmbientBackdrop blobs={IT4_UNIFIED_BLOBS} />

      {/* Simulated Toast Overlay */}
      {toast.show && (
        <div className="fixed top-24 right-6 z-50 transition-all duration-300 ease-out opacity-100 transform translate-y-0">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl ${
            toast.type === 'success' ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-300' :
            toast.type === 'warning' ? 'bg-amber-950/95 border-amber-500/50 text-amber-300' :
            'bg-slate-950/95 border-slate-800 text-slate-300'
          }`}>
            <div className="w-2.5 h-2.5 rounded-full bg-current animate-pulse"></div>
            <span className="text-sm font-semibold leading-relaxed">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Layer 3: Main Immersive Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ──────────── 1. SECTION: อุปกรณ์เครือข่ายพื้นฐาน ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-650 tracking-wider uppercase">
              Basic Network Devices
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              อุปกรณ์เครือข่ายคอมพิวเตอร์พื้นฐาน
            </h3>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-8 border-l-[3.5px] border-l-indigo-500 leading-relaxed">
            <p className="text-[16px] md:text-[17px] text-zinc-700">
              <span className="bg-indigo-50/70 border border-indigo-200/50 text-indigo-700 text-[13.5px] font-bold px-2.5 py-1 rounded-lg mr-2 font-mono">
                Network Devices
              </span>
              คือ <strong>อุปกรณ์ฮาร์ดแวร์หลักในการรับส่ง แปลความหมาย และนำพาแพ็กเกจข้อมูล</strong> เพื่อเชื่อมคอมพิวเตอร์และขยายขอบเขตการส่งสัญญาณภายในเครือข่ายท้องถิ่นหรือวงแลนให้เป็นระเบียบและเสถียร
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NETWORK_DEVICES.map((dev, i) => (
              <DeviceCard key={i} device={dev} />
            ))}
          </div>
        </section>

        {/* ──────────── 2. SECTION: สายสัญญาณและสื่อกลาง ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-650 tracking-wider uppercase">
              Cables & Transmission Media
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สายสัญญาณคอมพิวเตอร์และสื่อกลาง
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed">
            สื่อกลางทางกายภาพประเภทสายที่ได้รับความนิยมสูงสุดในเครือข่าย LAN คือ <strong>สายคู่บิดเกลียว (Twisted Pair Cable)</strong> ที่ทำการบิดเกลียวคู่สายทองแดงเพื่อลดสัญญาณรบกวนแม่เหล็กไฟฟ้าระหว่างคู่สาย (Crosstalk)
          </p>

          {/* UTP vs STP Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-xl border border-blue-200/50 shadow-xl rounded-[2rem] p-7 border-l-[3.5px] border-l-blue-500">
              <span className="bg-blue-100 text-blue-750 text-xs px-2.5 py-1 rounded-lg font-bold tracking-wide font-mono">UTP (Unshielded)</span>
              <h4 className="font-bold text-zinc-900 text-lg mt-3.5 mb-2">สายชนิด Unshielded Twisted Pair</h4>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed">
                สายทองแดงคู่บิดเกลียวทั่วไป <strong>ไม่มีเกราะโลหะหุ้มป้องกันสัญญาณรบกวนภายนอก</strong> มีจุดเด่นคือยืดหยุ่นสูง โค้งงอง่าย และมีราคาประหยัด จึงเป็นที่นิยมใช้เดินเครือข่ายคอมพิวเตอร์ในบ้านหรือสำนักงานทั่วไป
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-indigo-200/50 shadow-xl rounded-[2rem] p-7 border-l-[3.5px] border-l-indigo-500">
              <span className="bg-indigo-100 text-indigo-755 text-xs px-2.5 py-1 rounded-lg font-bold tracking-wide font-mono">STP (Shielded)</span>
              <h4 className="font-bold text-zinc-900 text-lg mt-3.5 mb-2">สายชนิด Shielded Twisted Pair</h4>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed">
                สายทองแดงคู่บิดเกลียวที่ <strong>มีชั้นเกราะฟอยล์โลหะบาง ๆ หุ้มห่อรอบสายทองแดงภายใน</strong> เพื่อเป็นโล่บัดกรีคลื่นรบกวนภายนอก เหมาะอย่างยิ่งสำหรับเดินสายพาดผ่านโซนเครื่องจักรหรือโรงงานอุตสาหกรรมที่มีคลื่นสัญญาณรบกวนสูง
              </p>
            </div>
          </div>

          {/* Bandwidth Speed Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {CABLE_CATEGORIES.map((cat, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-sky-500/10 to-blue-650/5 p-5 border-b border-slate-100/80 flex justify-between items-center">
                  <h4 className="font-black text-indigo-700 text-[17px] font-mono">{cat.name}</h4>
                  <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-bold border border-indigo-200/80 font-mono">
                    {cat.bandwidth}
                  </span>
                </div>
                <div className="p-5 space-y-4 text-xs text-zinc-650">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">MAX SPEED / BANDWIDTH</span>
                    <p className="text-zinc-800 font-extrabold text-[14px] mt-0.5 leading-snug font-mono">{cat.speed}</p>
                    <p className="text-indigo-650 font-bold text-[11px] mt-1">ระยะทางส่งสัญญาณสูงสุด: {cat.dist}</p>
                  </div>
                  <p className="text-[13.5px] text-zinc-500 leading-relaxed border-t border-slate-100 pt-3.5">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── 3. SECTION: มาตรฐานการเข้าหัวสาย LAN ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-650 tracking-wider uppercase">
              Wiring Standards & Cables
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              มาตรฐานการจัดสีและการเข้าหัวสาย LAN
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed">
            ขั้วทองแดงสัมผัส 8 เส้นภายในหัว RJ-45 จำเป็นต้องจัดเรียงสลับคู่สีตามข้อกำหนดสากลทางไฟฟ้าเพื่อนำสัญญาณได้อย่างคงที่ <strong>มาตรฐาน T568B และ T568A</strong> กำหนดตำแหน่งพินจากซ้ายไปขวาดังนี้:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* T568B Standard */}
            <div className="bg-white/70 backdrop-blur-xl border border-amber-300/40 shadow-xl rounded-[2rem] p-6">
              <h4 className="font-bold text-zinc-900 text-[15.5px] border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></span>
                มาตรฐาน T568B (ยอดนิยมเป็นมาตรฐานหลัก)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {T568B_COLORS.map((wire, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border border-slate-200/45 text-center text-[12px] ${wire.bgClass} flex flex-col justify-between min-h-[72px] shadow-sm`}>
                    <span className="text-[9.5px] text-zinc-600 block font-mono">Pin #{idx + 1}</span>
                    <span className="mt-1 block leading-tight">{wire.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* T568A Standard */}
            <div className="bg-white/70 backdrop-blur-xl border border-emerald-300/40 shadow-xl rounded-[2rem] p-6">
              <h4 className="font-bold text-zinc-900 text-[15.5px] border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                มาตรฐาน T568A (มักใช้สำหรับระบบงานราชการ)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {T568A_COLORS.map((wire, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border border-slate-200/45 text-center text-[12px] ${wire.bgClass} flex flex-col justify-between min-h-[72px] shadow-sm`}>
                    <span className="text-[9.5px] text-zinc-600 block font-mono">Pin #{idx + 1}</span>
                    <span className="mt-1 block leading-tight">{wire.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Straight vs Crossover Callout */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-6 border-l-[3.5px] border-l-indigo-500 flex flex-col sm:flex-row gap-4 text-zinc-700">
            <div className="flex-shrink-0 text-indigo-500 mt-1"><InfoIcon /></div>
            <div className="space-y-2.5">
              <h5 className="font-bold text-zinc-900 text-sm leading-snug">การเลือกนำสายไปใช้งานต่อเชื่อมต่ออุปกรณ์:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-zinc-650 leading-relaxed text-[13.5px]">
                <p>
                  🛡️ <strong>สายตรง (Straight-through Cable):</strong> เข้าหัวแบบ <strong>T568B ทั้งสองฝั่ง</strong> ใช้เชื่อมโยงต่อสัญญาณระหว่างอุปกรณ์ต่างชนิดกัน เช่น คอมพิวเตอร์เข้ากับ Switch หรือเราเตอร์เชื่อมเข้าสวิตช์
                </p>
                <p>
                  🔄 <strong>สายไขว้ (Crossover Cable):</strong> เข้าหัวแบบ <strong>T568A ฝั่งหนึ่ง และ T568B อีกฝั่งหนึ่ง</strong> ใช้เชื่อมโยงคอมพิวเตอร์ 2 เครื่องเข้าหากันตรง ๆ เพื่อสลับคู่รับ-ส่งข้อมูล (TX/RX) โดยไม่ต้องผ่านสวิตช์
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── 4. SECTION: ขั้นตอนการเข้าหัวสายแลน ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-650 tracking-wider uppercase">
              LAN Cable Termination Steps
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ขั้นตอนทางปฏิบัติในการเข้าหัวสายแลน RJ-45
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { num: '1', title: 'ปลอกฉนวนภายนอก', desc: 'ใช้คัตเตอร์ปลอกสายสัญญาณ ค่อย ๆ ขูดเปลือกสีภายนอกออกยาวประมาณ 2-3 ซม. โดยระวังไม่ให้กรีดโดนแกนพลาสติกหรือสายหุ้มคู่ทองแดงเส้นข้างในชำรุดขาด' },
              { num: '2', title: 'คลี่เกลียวเรียงสี T568B', desc: 'คลายเกลียวที่บิดออก ดึงเส้นสายทองแดงแต่ละสีให้ตรง สลับตำแหน่งและจัดพินจากซ้ายไปขวา: ขาวส้ม, ส้ม, ขาวเขียว, น้ำเงิน, ขาวน้ำเงิน, เขียว, ขาวน้ำตาล, น้ำตาล' },
              { num: '3', title: 'ตัดแต่งปลายสายไฟ', desc: 'รวบแนวระนาบทองแดงทั้ง 8 เส้นบีบให้เรียงชิดแบนเสมอกัน จากนั้นใช้ปากใบมีดคีมตัดปลายสายออกให้เรียบตรงเป็นฉากขนาน โดยคงเหลือความยาวสายประมาณ 1.5 ซม.' },
              { num: '4', title: 'สอดหัวและบีบย้ำหัว', desc: 'หันหน้าสัมผัสทองเหลืองของหัว RJ-45 ขึ้น (หันสลักล็อกลงล่าง) สอดสายแลนเข้าไปจนสุดปลายหน้าสัมผัส สอดหัวเข้าที่ช่องย้ำคีม แล้วกดบีบด้ามให้สลักกดทับสายแน่นหนา' },
              { num: '5', title: 'สแกนทดสอบสัญญาณ', desc: 'เสียบสายแลนทั้ง 2 ปลายเข้ากับพอร์ตเครื่อง Cable Tester เปิดสแกนรันไฟ LED 1-8 หากไฟกะพริบวิ่งตรงกันจากบนลงล่างทั้งฝั่ง Master/Remote แสดงว่าเข้าสายสำเร็จ' }
            ].map((card, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-5 flex flex-col justify-between hover:-translate-y-0.5 transition-all">
                <div>
                  <span className="bg-indigo-50 text-indigo-600 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs font-mono mb-3 shadow-inner">{card.num}</span>
                  <h4 className="font-bold text-zinc-900 text-[14.5px] leading-snug mb-2">{card.title}</h4>
                  <p className="text-zinc-500 text-[12px] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── 5. SECTION: UTP Crimp Simulator ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-650 tracking-wider uppercase">
              Interactive Simulation
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องจำลองปฏิบัติการเข้าหัวสาย UTP (Arrange {"->"} Crimp {"->"} Test)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed">
            ทดลองลงมือปฏิบัติตามเฟสงาน ทั้งจัดเรียงแถบสีทองแดง 8 เส้น สอดเข้าพิน บีบคีมย้ำพินหัว RJ-45 และเปิดสัญญาณเครื่องเทสสแกนดูพฤติกรรมสายแลน:
          </p>

          <SimulatorShell
            dark
            icon={<ToolsIcon />}
            title="UTP Termination Master Simulator [ระบบปฏิบัติการและบำรุงรักษาสายสัญญาณ]"
            glowColors="from-blue-600/15 to-indigo-500/10"
            iconColor="text-indigo-400"
          >
            <div className="flex justify-between items-center mb-5 text-xs font-mono relative z-10 border-b border-white/5 pb-2.5">
              <span className="text-slate-400">
                Phase: <strong className="text-indigo-400 uppercase tracking-widest">{simPhase}</strong>
              </span>
              <button
                onClick={initializeSimulator}
                className="text-xs bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateIcon /> รีเซ็ตสายสัญญาณ
              </button>
            </div>

            {/* Main Simulator Work Area */}
            <div className="relative min-h-[380px] flex items-center justify-center relative z-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* SIMULATOR PHASE: Arrange Wires */}
              {simPhase === 'arrange' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
                  
                  {/* Left: Pool Wires (shuffled) */}
                  <div className="lg:col-span-5 bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-300 mb-1 border-b border-white/5 pb-2 uppercase tracking-wide">1. คลังคู่สายทองแดงย่อย (คลิกเลือกตามลำดับ)</h4>
                      <p className="text-[10px] text-slate-500 leading-normal mb-3.5">
                        เป้าหมาย: คลิกเลือกสายเรียงให้ถูกต้องตามลำดับ T568B
                      </p>
                      
                      {poolWires.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2.5">
                          {poolWires.map(wire => (
                            <button
                              key={wire.id}
                              onClick={() => handleSelectWire(wire)}
                              className={`p-2.5 rounded-lg border border-slate-800 text-left text-xs cursor-pointer hover:border-indigo-500 hover:bg-slate-950 transition-all font-mono flex items-center gap-2 ${wire.bgClass.split(' text-')[0]}`}
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-100 border shadow-inner"></span>
                              <span className="text-[11px] leading-none">{wire.name}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-slate-550 font-mono text-[11px]">
                          จัดสายครบ 8 เส้นเรียบร้อยในพินหัวแลน
                        </div>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
                      <span>เหลือกองสาย: {poolWires.length} เส้น</span>
                      {userWireOrder.length > 0 && (
                        <button
                          onClick={handleRemoveLastWire}
                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-rose-450 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all"
                        >
                          ดึงสายเส้นหลังออก
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right: RJ-45 Pin Slots */}
                  <div className="lg:col-span-7 bg-slate-950/95 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-350 mb-1 border-b border-white/5 pb-2 uppercase tracking-wide">2. พินและพอร์ต RJ-45 CONNECTOR SLOTS</h4>
                      <p className="text-[10px] text-slate-500 leading-normal mb-4">
                        จัดลำดับสายจากซ้ายพิน 1 ไปยังขวาพิน 8
                      </p>
                      
                      {/* Interactive Visual Wire Slots */}
                      <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[160px] shadow-inner">
                        
                        {/* RJ-45 Connector Shape representation */}
                        <div className="w-full max-w-sm bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 relative shadow-inner">
                          <span className="text-[8px] font-mono text-slate-500 absolute top-2 right-3 select-none">RJ-45 CLIP SIDE</span>
                          
                          {/* Pins container */}
                          <div className="grid grid-cols-8 gap-1 border-b border-slate-800 pb-3">
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((pinIdx) => {
                              const wire = userWireOrder[pinIdx];
                              return (
                                <div key={pinIdx} className="flex flex-col items-center gap-1.5">
                                  <span className="text-[9px] text-slate-600 font-mono">P{pinIdx + 1}</span>
                                  <div className="w-full aspect-square max-w-[28px] rounded-md border border-slate-800 flex items-center justify-center bg-slate-900 overflow-hidden shadow-inner">
                                    {wire ? (
                                      <div className={`w-full h-full ${wire.bgClass.split(' text-')[0]}`} />
                                    ) : (
                                      <div className="w-1.5 h-1.5 bg-slate-800 rounded-full animate-pulse"></div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Render wires coming out of jacket */}
                          <div className="flex justify-between items-stretch px-1 h-10">
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((pinIdx) => {
                              const wire = userWireOrder[pinIdx];
                              return (
                                <div key={pinIdx} className="w-[11.5%] flex justify-center items-stretch">
                                  {wire && (
                                    <div className={`w-1.5 rounded-b shadow-inner ${wire.bgClass.split(' text-')[0]}`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Outer sheath jacket */}
                          <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-2.5 text-center text-[9px] text-slate-400 font-mono uppercase tracking-widest shadow-inner">
                            UTP outer jacket sheath
                          </div>

                        </div>

                      </div>

                      {/* Complete phase trigger button */}
                      {userWireOrder.length === 8 && (
                        <div className="text-right pt-2 border-t border-white/5 mt-4">
                          <button
                            onClick={handleInsertIntoRJ45}
                            className="bg-indigo-650 hover:bg-indigo-550 hover:scale-[1.02] text-white font-bold text-xs py-2 px-6 rounded-lg flex items-center gap-2 ml-auto transition-all cursor-pointer shadow-lg shadow-indigo-950/20"
                          >
                            สอดสายเข้าหัวแลน <ArrowRightIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

                {/* SIMULATOR PHASE: Crimp */}
                {simPhase === 'crimp' && (
                  <div className="space-y-6 flex-1 flex flex-col justify-center items-center py-6 relative z-10">
                    <div className="text-center space-y-5">
                      {/* Simulated Crimp Visual Representation */}
                      <div className="relative w-44 h-44 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <ToolsIcon />
                        {/* Status badge in circle */}
                        <div className="absolute inset-0 border-4 border-dashed border-indigo-500/20 rounded-full animate-pulse pointer-events-none"></div>
                        {crimpCompleted && (
                          <div className="absolute inset-2 border-2 border-emerald-500/30 rounded-full animate-ping pointer-events-none"></div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-slate-100 font-bold text-sm">ย้ำหัวสายสัญญาณผ่านคีมแลน</h4>
                        <p className="text-[11.5px] text-slate-500 mt-1 max-w-xs leading-relaxed">
                          กดคลิกปุ่มบีบคีมย้ำสายซ้ำเพื่อล็อกพินขั้วทองแดงขูดทะลุฉนวนยึดแน่น
                        </p>
                      </div>

                      {/* Progress bar info */}
                      <div className="space-y-2 w-48 mx-auto text-xs font-sans">
                        <div className="flex justify-between font-mono text-slate-400">
                          <span>บีบแรงย้ำ:</span>
                          <span className="font-bold text-indigo-400">{crimpProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700 shadow-inner">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300" style={{ width: `${crimpProgress}%` }}></div>
                        </div>
                      </div>

                      {/* Crimp action button */}
                      {!crimpCompleted ? (
                        <button
                          onClick={handleCrimpAction}
                          className="bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] text-white font-bold text-xs py-2 px-6 rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-950/20"
                        >
                          <ToolsIcon /> บีบคีมย้ำสายแลน
                        </button>
                      ) : (
                        <button
                          onClick={handleGoToTest}
                          className="bg-emerald-650 hover:bg-emerald-550 hover:scale-[1.02] text-white font-bold text-xs py-2.5 px-6 rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-950/20"
                        >
                          ไปยังเฟสถัดไป: ทดสอบสัญญาณ <ArrowRightIcon />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* SIMULATOR PHASE: Test Cable */}
                {simPhase === 'test' && (
                  <div className="space-y-6 flex-1 flex flex-col justify-between mt-4 relative z-10">
                    
                    {/* Simulated Tester Panel */}
                    <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto w-full py-4">
                      
                      {/* Master Unit Display */}
                      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col items-center shadow-inner">
                        <span className="text-[10px] text-slate-500 block mb-3 font-mono font-bold tracking-wider">MASTER TX</span>
                        <div className="grid grid-cols-2 gap-2 w-full text-[11px] font-mono text-slate-400">
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                            const isActive = isTesting && testLedIndex === num;
                            const isTested = testResult === 'pass';
                            const isFailed = testResult === 'fail';
                            return (
                              <div key={num} className="flex items-center gap-1.5 justify-center py-1.5 bg-slate-950 rounded-lg border border-slate-800 shadow-sm">
                                <span className={`w-2.5 h-2.5 rounded-full block transition-all ${
                                  isActive ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse' :
                                  isTested ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' :
                                  isFailed ? 'bg-rose-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]' : 'bg-slate-800'
                                }`}></span>
                                <span className="font-bold">พิน {num + 1}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Remote Unit Display */}
                      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col items-center shadow-inner">
                        <span className="text-[10px] text-slate-500 block mb-3 font-mono font-bold tracking-wider">REMOTE RX</span>
                        <div className="grid grid-cols-2 gap-2.5 w-full text-[11px] font-mono text-slate-450">
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                            const isActive = isTesting && testLedIndex === num;
                            // จำลองว่าพินฝั่ง Remote จะสว่างตามค่าสายไฟที่เรียงมา
                            // ค้นหาตำแหน่งของพินทองแดงที่ผู้เรียนเรียงไว้จริง
                            const expectedColorId = T568B_COLORS[num].id;
                            const userWireAtPin = userWireOrder[num];
                            const isPinCorrect = userWireAtPin && userWireAtPin.id === expectedColorId;
                            
                            const isTested = testResult === 'pass';
                            const isFailed = testResult === 'fail';

                            return (
                              <div key={num} className="flex items-center gap-1.5 justify-center py-1.5 bg-slate-950 rounded-lg border border-slate-850 shadow-sm">
                                <span className={`w-2.5 h-2.5 rounded-full block transition-all ${
                                  isActive ? (isPinCorrect ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse') :
                                  isTested ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' :
                                  isFailed ? (isPinCorrect ? 'bg-emerald-500/40' : 'bg-rose-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]') : 'bg-slate-800'
                                }`}></span>
                                <span className="font-bold">พิน {num + 1}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Result Notification strip */}
                    {testResult && (
                      <div className={`p-4 rounded-xl border text-center text-xs leading-relaxed max-w-sm mx-auto w-full font-sans shadow-xl ${
                        testResult === 'pass' 
                          ? 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300' 
                          : 'bg-rose-950/70 border-rose-500/30 text-rose-300'
                      }`}>
                        {testResult === 'pass' ? (
                          <p>🎉 <strong>PASS:</strong> ยินดีด้วยครับ! สัญญาณไฟวิ่งผ่านตรงกันครบ 8 พินตามลำดับสี T568B สาย LAN สมบูรณ์พร้อมใช้งานจริง</p>
                        ) : (
                          <div>
                            <p>⚠️ <strong>FAIL:</strong> ตรวจพบการเรียงพินสลับตำแหน่ง สัญญาณไม่วิ่งตรงกันทำให้เน็ตเวิร์กเกิดความผิดพลาด</p>
                            <button 
                              onClick={initializeSimulator}
                              className="mt-2 text-rose-300 underline font-bold hover:text-white cursor-pointer transition-colors block mx-auto text-[10.5px]"
                            >
                              คลิกเพื่อกลับไปจัดเรียงสายสัญญาณใหม่
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action button panel */}
                    <div className="text-right pt-2 border-t border-white/5 mt-4 flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-medium font-sans">
                        {isTesting ? "กำลังจ่ายสัญญาณสแกนพิน..." : "พร้อมสำหรับการตรวจสอบความสมบูรณ์สัญญาณ"}
                      </span>
                      <button
                        onClick={handleStartCableTest}
                        disabled={isTesting}
                        className={`font-bold text-xs py-2 px-6 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                          isTesting 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800' 
                            : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white shadow-emerald-950/20'
                        }`}
                      >
                        <PlayIcon /> ทดสอบสาย LAN (TEST)
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </SimulatorShell>
          </section>

        {/* ──────────── 6. SECTION: Gamification Quiz ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              Gamification Zone
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินความรู้รวมบทเรียน
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed">
            ทดสอบความรู้ความเข้าใจเกี่ยวกับการออกแบบสายสัญญาณคอมพิวเตอร์ UTP vs STP, มาตรฐานความเร็วของคู่สายแลน CAT 5e/6/6A, ลำดับพินการจัดคู่สี T568B/T568A ตลอดจนข้อกำหนดและการวิเคราะห์แก้ปัญหาการติดตั้ง:
          </p>

          <QuizEngine
            title="ระบบทดสอบประเมินผลความรู้รวมบทเรียนบทที่ 4"
            description="ตอบคำถามเพื่อตรวจสอบทักษะระดับช่างเน็ตเวิร์ก อุปกรณ์ สเปกสาย มาตรฐานสี T568B และวิเคราะห์ตัวทดสอบ LED"
            levels={QUIZ_LEVELS_CABLE}
            accentColor="from-sky-600/20 to-blue-500/10"
            icon={<CableIcon />}
          />
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <section className="relative z-10">
          <TeacherTask
            title="ภารกิจปฏิบัติการประจำบทเรียน: การประกอบจัดเรียงสี และตรวจสอบสัญญาณสาย LAN UTP"
            taskText={`ให้นักเรียนประยุกต์ใช้เนื้อหาทฤษฎีควบคู่แผงทดสอบห้องปฏิบัติการจำลองในหน้านี้ เพื่อจำลองการเข้าหัวสายและทำใบงานรายงานผลการทดลอง:

1. ปฏิบัติการจำลองจัดเรียงสีคู่สาย T568B:
- เข้าจำลองพาร์ท Simulator 1 ทำการคลิกเรียงลำดับสีทองแดงให้ถูกต้องตามมาตรฐาน T568B (ขาวส้ม, ส้ม, ขาวเขียว, น้ำเงิน, ขาวน้ำเงิน, เขียว, ขาวน้ำตาล, น้ำตาล)
- จากนั้นสอดสายสัญญาณเข้าหัวและกดย้ำบีบคีมจำลอง (Crimp) จนระดับความคืบหน้าครบ 100%

2. ปฏิบัติการสแกนทดสอบสัญญาณ:
- ในสเต็ปที่ 3 ให้กดเริ่มทดสอบสัญญาณ (TEST) สังเกตดวงไฟ LED ตรวจจับทั้งฝั่ง Master และ Remote ว่าวิ่งเรียงแถวครบตามลำดับสัญญาณดีหรือไม่
- ดึงหน้าจอยืนยันสเตตัส PASS สีเขียว หรือวิเคราะห์ข้อบกพร่องหากกะพริบผิดปกติ

3. ทำรายงานรายงานส่งครูผู้สอน:
- เขียนรายงานคู่สี T568B และ T568A ประจำพิน 1 ถึง 8 ลงในรายงานผลวิเคราะห์
- ระบุความแตกต่างในการนำสายตรง (Straight) และสายไขว้ (Crossover) ไปใช้งานจริง พร้อมชนิดการใช้งานสาย STP และ UTP`}
          />
        </section>

      </main>
    </div>
  );
}

// === ไอคอนเสริมสำหรับการเล่นมินิเกม ===
const PlayIcon = () => (
  <svg className="w-4 h-4 mr-1.5 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
