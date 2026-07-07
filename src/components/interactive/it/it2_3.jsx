/**
 * it2_3.jsx — หน่วยที่ 2.3 ขั้นตอนการประกอบคอมพิวเตอร์อย่างเป็นระบบ
 * ====================================================================
 * Vertical Stacking Page Architecture: 9 subtopics + Assembly Simulator + Quiz
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 */
import React, { useState, useCallback } from 'react';
import {
  Monitor, Cpu, MemoryStick, HardDrive, Plug, Cable, Wind, Layers,
  Box, Wrench, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw,
  Zap, CircuitBoard, Fan, Power, ChevronRight, ChevronDown,
  Shield, Thermometer, Settings, Package, Sparkles, Eye
} from 'lucide-react';
import { AmbientBackdrop, SimulatorShell, QuizEngine } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

/* ═══════════════════════════════════════════════════════════════════
   AMBIENT BACKDROP THEME — IT Unit 2 (Teal/Cyan/Slate Hardware)
   ═══════════════════════════════════════════════════════════════════ */
const IT2_3_BLOBS = [
  { color: 'bg-teal-200',   size: 'w-96 h-96', position: '-top-20 -left-20',       opacity: 'opacity-35' },
  { color: 'bg-cyan-200',   size: 'w-80 h-80', position: 'top-1/3 -right-20',      opacity: 'opacity-30' },
  { color: 'bg-sky-200',    size: 'w-72 h-72', position: '-bottom-20 left-1/4',     opacity: 'opacity-25' },
  { color: 'bg-indigo-200', size: 'w-60 h-60', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: ขั้นตอนการประกอบ 9 ลำดับ (for subtopics + simulator)
   ═══════════════════════════════════════════════════════════════════ */
const ASSEMBLY_STEPS = [
  {
    id: 'case-prep',
    step: 1,
    title: 'การเตรียมพื้นที่ทำงานและเคส',
    subtitle: 'Case Preparation',
    icon: <Box className="w-6 h-6" />,
    accent: 'teal',
    accentBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    borderColor: 'border-teal-200',
    gradFrom: 'from-teal-500',
    gradTo: 'to-emerald-500',
    image: null,
    paragraphs: [
      'การเตรียมพื้นที่ทำงานถือเป็นขั้นตอนแรกที่สำคัญที่สุดก่อนเริ่มลงมือประกอบคอมพิวเตอร์ พื้นที่ทำงานที่ดีจะต้องมีลักษณะเป็นโต๊ะที่กว้างพอสมควร (กว้างอย่างน้อย 80×60 ซม.) มีแสงสว่างเพียงพอ หลีกเลี่ยงพื้นที่ที่มีพรมซึ่งเป็นตัวกักเก็บไฟฟ้าสถิต (ESD) นำเสื่อป้องกันไฟฟ้าสถิต (Anti-static Mat) มาวางบนพื้นโต๊ะ และสวมสายรัดข้อมือป้องกันไฟฟ้าสถิต (Wrist Strap) โดยต่อสายกราวด์เข้ากับเคสโลหะหรือตัวจุดกราวด์บนเต้ารับไฟฟ้า',
      'การแกะกล่องชิ้นส่วน (Unboxing) ต้องทำด้วยความระมัดระวัง เปิดกล่องเมนบอร์ดก่อนเป็นลำดับแรก เพราะสามารถใช้ถุง Anti-static หรือกล่องเมนบอร์ดเป็นฐานวางชิ้นส่วนได้ จัดเก็บสกรูยึดบอร์ดและอุปกรณ์เสริมไว้ในถาดแม่เหล็กหรือถ้วยเล็กๆ ป้องกันการสูญหาย',
    ],
    details: [
      { label: 'ถอดฝาข้างเคส (Side Panel)', desc: 'ปลดสกรูหัวแม่มือ (Thumbscrews) หรือปุ่มกดสลักที่ด้านหลังเคส แล้วเลื่อนแผงข้างออกทั้งสองฝั่ง เพื่อเข้าถึงพื้นที่ภายในและช่องเดินสายด้านหลัง' },
      { label: 'ตรวจสอบเสารองบอร์ด (Standoffs)', desc: 'เสารองทองเหลือง (Brass Standoffs) ทำหน้าที่ยกเมนบอร์ดให้ลอยขึ้นจากเพลทเคส ป้องกันการลัดวงจร ต้องขันยึดให้ตรงตำแหน่งรูบอร์ดที่ตรงกับฟอร์มแฟกเตอร์ (ATX มี 9 จุด, Micro-ATX มี 6 จุด)' },
      { label: 'ติดตั้ง I/O Shield', desc: 'แผ่นเหล็กบังช่องพอร์ตด้านหลัง ดันกดจากด้านในเคสออกจนล็อกเข้าที่ครบทั้ง 4 มุม ก่อนวางเมนบอร์ด — หากลืมติดตั้งจะต้องถอดบอร์ดออกมาทั้งแผ่น' },
    ],
    tips: ['ใช้พื้นโต๊ะไม้หรือเหล็กเปลือย หลีกเลี่ยงพรมและผ้า', 'ตรวจให้แน่ใจว่าปลั๊กไฟของ PSU ยังไม่ได้เสียบเข้ากับเต้ารับ', 'เตรียมไขควงแฉก #2 (Phillips) ไว้เป็นหลัก'],
  },
  {
    id: 'cpu-cooler',
    step: 2,
    title: 'การติดตั้ง CPU, ซิลิโคน และ CPU Cooler',
    subtitle: 'CPU & Thermal Paste Installation',
    icon: <Cpu className="w-6 h-6" />,
    accent: 'indigo',
    accentBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    gradFrom: 'from-indigo-500',
    gradTo: 'to-violet-500',
    image: '/images/it/cpu_installation.png',
    paragraphs: [
      'การติดตั้ง CPU เป็นขั้นตอนที่ต้องอาศัยความละเอียดอ่อนมากที่สุด เนื่องจากขา Contact หรือ Pin ของซ็อกเก็ตมีความบอบบางสูง หากงอหรือหักแม้แต่ขาเดียวจะทำให้เมนบอร์ดหรือ CPU เสียหายถาวร ซ็อกเก็ตในปัจจุบันแบ่งออกเป็น 2 กลุ่มหลัก: LGA (Land Grid Array) ที่ใช้โดย Intel โดยขา Contact อยู่บนเมนบอร์ด และ PGA (Pin Grid Array) ที่ใช้โดย AMD บางรุ่น โดยขา Pin อยู่บนตัว CPU',
      'เริ่มจากยกคันโยกสลัก (Retention Lever) ของซ็อกเก็ตขึ้น เปิดฝาครอบโลหะ (Load Plate) จากนั้นจับ CPU ที่ขอบด้วยนิ้วหัวแม่มือและนิ้วชี้ (ห้ามสัมผัสพื้นผิวสัมผัสด้านล่าง) แล้วหาตำแหน่งเครื่องหมายสามเหลี่ยมทองคำ (Golden Triangle) ที่มุมหนึ่งของ CPU ซึ่งต้องตรงกับเครื่องหมายบนซ็อกเก็ต วาง CPU ลงตรงๆ โดยไม่ต้องออกแรงกด แล้วปิดฝาครอบกลับและกดสลักลงจนล็อก',
      'การทาซิลิโคนระบายความร้อน (Thermal Paste) มีเทคนิคหลายแบบ เทคนิคที่นิยมมากที่สุดคือ "วิธีเม็ดถั่ว (Pea Method)" หยอดซิลิโคนขนาดเท่าเม็ดถั่วลันเตาตรงกลาง IHS (Integrated Heat Spreader) ของ CPU แล้วปล่อยให้แรงกดของ Cooler กระจายซิลิโคนให้ทั่วเอง ห้ามทามากเกินไปเพราะซิลิโคนจะล้นออกมาเปื้อนซ็อกเก็ต',
    ],
    details: [
      { label: 'การขันน็อต CPU Cooler', desc: 'ขันแบบทแยงมุม (X-pattern หรือ Cross-tightening) เช่น ขันมุมซ้ายบน → ขวาล่าง → ขวาบน → ซ้ายล่าง โดยขันเบาๆ ก่อนครึ่งรอบทุกตัว แล้วค่อยขันซ้ำจนแน่น เพื่อกระจายแรงกดลงบนพื้นผิว CPU ได้สม่ำเสมอ ป้องกันชิป Die แตกร้าว' },
      { label: 'เสียบสาย CPU_FAN', desc: 'หลังขันยึด Cooler เรียบร้อยแล้ว ต้องเสียบสายพัดลมเข้าที่ขั้ว Header บนเมนบอร์ดที่มีป้ายกำกับ CPU_FAN (4-pin PWM) เพื่อให้เมนบอร์ดควบคุมรอบพัดลมตามอุณหภูมิอัตโนมัติ หากไม่เสียบ ระบบอาจเตือน "CPU Fan Error" ตอน POST' },
      { label: 'ประเภท CPU Cooler', desc: 'Air Cooler (ทาวเวอร์พัดลม): ราคาถูก ติดตั้งง่าย | AIO Liquid Cooler (ระบายน้ำแบบปิด): ประสิทธิภาพสูง ต้องยึด Radiator กับเคส | Custom Loop: ประสิทธิภาพสูงสุด แต่ติดตั้งยากและราคาแพง' },
    ],
    tips: ['ห้ามถอด CPU ออกแล้วใส่กลับโดยไม่ทำความสะอาดซิลิโคนเก่าก่อน', 'ใช้ Isopropyl Alcohol 90%+ เช็ดทำความสะอาดซิลิโคนเก่า', 'ตรวจสอบ TDP ของ CPU ให้ตรงกับกำลังระบายความร้อนของ Cooler'],
  },
  {
    id: 'ram',
    step: 3,
    title: 'การติดตั้ง RAM (Dual-Channel)',
    subtitle: 'Memory Module Installation',
    icon: <MemoryStick className="w-6 h-6" />,
    accent: 'violet',
    accentBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderColor: 'border-violet-200',
    gradFrom: 'from-violet-500',
    gradTo: 'to-purple-500',
    image: null,
    paragraphs: [
      'RAM (Random Access Memory) เป็นหน่วยความจำชั่วคราวที่ CPU ใช้เป็นพื้นที่ทำงาน การติดตั้ง RAM ต้องใส่ในสล็อตที่ถูกต้องเพื่อเปิดใช้งานโหมด Dual-Channel ซึ่งจะเพิ่มแบนด์วิดท์การรับส่งข้อมูลเป็นสองเท่าเมื่อเทียบกับ Single-Channel',
      'สำหรับเมนบอร์ดที่มี 4 สล็อต (DIMM Slots) สล็อตจะมีป้ายกำกับเป็น A1, A2, B1, B2 ตามลำดับ เพื่อเปิดใช้งาน Dual-Channel ให้ใส่แรม 2 แถวในสล็อต A2 และ B2 (สล็อตที่ 2 และ 4 จากซ้ายไปขวา) ซึ่งเป็นคู่สลับสีที่กำหนดไว้โดยผู้ผลิตเมนบอร์ด หากใส่สล็อต A1-A2 แทน แรมจะทำงานได้แต่จะอยู่ในโหมด Single-Channel ที่ช้ากว่า',
      'ก่อนเสียบแรม ให้กดปุ่มปลดสลักที่ปลายทั้งสองข้างของสล็อตให้เปิดออก จากนั้นหาช่องร่อง Notch ที่ด้านล่างของแรมโมดูลให้ตรงกับส่วนนูนในสล็อต (Key) เพื่อป้องกันการใส่กลับด้าน วางแรมลงตรงๆ แล้วกดลงทั้งสองด้านพร้อมกันจนสลักล็อกดีดปิดอัตโนมัติพร้อมเสียง "คลิก" เบาๆ',
    ],
    details: [
      { label: 'Dual-Channel คืออะไร', desc: 'โหมดการทำงานที่ Memory Controller บน CPU จะเปิดเส้นทางข้อมูล (Data Bus) 2 ช่องทางพร้อมกัน เพิ่ม Bandwidth จากเดิม 64-bit เป็น 128-bit ทำให้ RAM ที่มีความเร็ว DDR5-5600 MT/s จะได้ Bandwidth สูงถึง ~89.6 GB/s ในโหมด Dual-Channel' },
      { label: 'XMP / EXPO Profile', desc: 'เมนบอร์ดจะตั้งค่าแรมที่ความเร็ว JEDEC มาตรฐาน (เช่น DDR5-4800) หากต้องการความเร็วเต็มสเปก (เช่น DDR5-6000) ต้องเข้า BIOS แล้วเปิด XMP (Intel) หรือ EXPO (AMD) ซึ่งจะโหลดค่า Timing และ Voltage ที่ผ่านการทดสอบจากผู้ผลิตแรม' },
      { label: 'ข้อควรระวัง', desc: 'ห้ามจับ Gold Contact ด้านล่างของแรมโมดูล ใช้แรมยี่ห้อและรุ่นเดียวกันในคู่ Dual-Channel เพื่อความเสถียร ตรวจสอบจำนวน Pin ให้ตรงกับซ็อกเก็ต (DDR4 = 288 pin, DDR5 = 288 pin แต่ Key ต่างตำแหน่ง)' },
    ],
    tips: ['ใช้แรงกดสม่ำเสมอทั้งสองด้านเมื่อกดแรมลงสล็อต', 'DDR4 และ DDR5 มี Notch คนละตำแหน่ง ใส่สลับกันไม่ได้', 'ตรวจสอบ QVL (Qualified Vendor List) ของเมนบอร์ดเพื่อความเข้ากันได้'],
  },
  {
    id: 'storage',
    step: 4,
    title: 'การติดตั้งอุปกรณ์จัดเก็บข้อมูล (M.2 SSD & HDD)',
    subtitle: 'Storage Device Installation',
    icon: <HardDrive className="w-6 h-6" />,
    accent: 'amber',
    accentBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-200',
    gradFrom: 'from-amber-500',
    gradTo: 'to-orange-500',
    image: null,
    paragraphs: [
      'อุปกรณ์จัดเก็บข้อมูลในคอมพิวเตอร์ยุคปัจจุบันมี 2 รูปแบบหลักที่นิยม คือ M.2 NVMe SSD ที่เสียบตรงบนเมนบอร์ด และ SATA SSD/HDD ที่ต้องยึดในช่องเบย์ (Drive Bay) ของเคส M.2 NVMe SSD มีความเร็วสูงกว่า SATA อย่างมาก (อ่าน/เขียน 5,000-7,000 MB/s เทียบกับ SATA ที่ 550 MB/s) เนื่องจากใช้ Bus PCIe โดยตรง',
      'การติดตั้ง M.2 SSD เริ่มจากหาตำแหน่งสล็อต M.2 บนเมนบอร์ด (โดยทั่วไปจะมี 1-3 สล็อตตามรุ่นเมนบอร์ด) ถอดน็อตยึดหรือฝาครอบ Heat Sink ออก จากนั้นเสียบ SSD เข้าไปในสล็อตในทำมุมประมาณ 30 องศากับพื้นเมนบอร์ด เมื่อ Connector ล็อกเข้าที่แล้วจึงกดปลายอีกด้านลงให้ราบและขันน็อตยึดปลาย เมนบอร์ดบางรุ่นมีกลไกล็อกแบบ Clip ไร้ไขควง (Toolless Latch) ที่เพียงหมุนสลักก็ล็อก SSD ได้ทันที',
      'สำหรับ HDD/SATA SSD 2.5" หรือ 3.5" ให้ยึดตัวไดรฟ์ลงใน Drive Bay หรือถาดสไลด์ (Caddy Tray) ของเคส ขันสกรูยึด 4 ตัวให้แน่น จากนั้นเสียบสาย SATA Data (สายแบนหัว L-shape) เข้าที่พอร์ต SATA บนเมนบอร์ด และเสียบสายไฟเลี้ยง SATA Power จาก PSU เข้าที่ตัวไดรฟ์',
    ],
    details: [
      { label: 'ขนาดฟอร์มแฟกเตอร์ M.2', desc: 'M.2 SSD มีหลายขนาด เช่น 2230 (22×30 มม.) ใช้ใน Laptop/Console, 2242 (22×42 มม.) และ 2280 (22×80 มม.) ที่เป็นมาตรฐานสำหรับ Desktop ตรวจสอบขนาดที่เมนบอร์ดรองรับก่อนซื้อ' },
      { label: 'M.2 Key Types', desc: 'Key M = NVMe/PCIe (ช่องหยักขวา), Key B = SATA (ช่องหยักซ้าย), Key B+M = ใช้ได้ทั้ง SATA และ NVMe ขึ้นอยู่กับวงจรของ SSD ตรวจสอบว่าสล็อตบนเมนบอร์ดรองรับโปรโตคอลใด' },
      { label: 'Heatsink / Heat Spreader', desc: 'SSD NVMe Gen4/Gen5 มีอุณหภูมิสูง (สูงถึง 70-80°C ภายใต้ภาระหนัก) จึงจำเป็นต้องมี Heat Sink เพื่อป้องกัน Thermal Throttling ที่จะทำให้ความเร็วลดลงอัตโนมัติ เมนบอร์ดรุ่นใหม่มักแถมฮีทซิงค์มาให้พร้อม' },
    ],
    tips: ['ติดตั้ง M.2 SSD ก่อนวางเมนบอร์ดลงเคส จะสะดวกกว่า', 'ห้ามออกแรงกดลง M.2 SSD โดยตรง ต้องเสียบที่มุม 30° ก่อน', 'สาย SATA Data มีสลัก L-shape ป้องกันการเสียบกลับด้าน'],
  },
  {
    id: 'motherboard',
    step: 5,
    title: 'การวางเมนบอร์ดลงในเคส',
    subtitle: 'Mounting Motherboard',
    icon: <CircuitBoard className="w-6 h-6" />,
    accent: 'emerald',
    accentBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    gradFrom: 'from-emerald-500',
    gradTo: 'to-teal-500',
    image: null,
    paragraphs: [
      'ก่อนวางเมนบอร์ดลงในเคส ต้องตรวจสอบให้แน่ใจว่า I/O Shield (แผ่นเหล็กบังช่องพอร์ตด้านหลัง) ได้ถูกติดตั้งเรียบร้อยแล้ว เพราะหากลืมติดตั้งในขั้นตอนนี้จะต้องถอดเมนบอร์ดออกมาทั้งหมด I/O Shield มีหน้าที่ป้องกันฝุ่นและสัตว์เล็กเข้าเคส รวมถึงช่วยลดสัญญาณรบกวนแม่เหล็กไฟฟ้า (EMI Shielding)',
      'ค่อยๆ วางเมนบอร์ดลงในเคสโดยให้พอร์ต I/O ด้านหลังตรงกับช่องบน I/O Shield และรูสกรูบนเมนบอร์ดตรงกับตำแหน่ง Standoffs ทุกจุด ขั้นตอนแนะนำคือขันสกรูตรงกลางบอร์ดก่อน 1 ตัว เพื่อยึดตำแหน่งไม่ให้บอร์ดเลื่อน แล้วจึงค่อยขันสกรูตัวอื่นๆ ตามมุมทแยง ห้ามขันแน่นจนแน่ในครั้งเดียว ค่อยๆ ขันทีละครึ่งรอบ (Half Turn) สลับไปมา จนสกรูทุกตัวแน่นสม่ำเสมอ',
      'สกรูที่ใช้ยึดเมนบอร์ดเป็น "สกรูหัวแบน #6-32 UNC" ขนาดมาตรฐาน สกรูทุกตัวต้องมีแหวนรอง (Washer) รองรับเพื่อกระจายแรงกดและป้องกันไม่ให้หัวสกรูขูด PCB ของเมนบอร์ด หากเคสแถมสกรูมาไม่ครบ ห้ามใช้สกรูอื่นที่ขนาดเกลียวไม่ตรงมาทดแทนเด็ดขาด',
    ],
    details: [
      { label: 'ATX vs Micro-ATX vs ITX', desc: 'ATX (305×244 มม.) = 9 จุดสกรู, ใส่ในเคส ATX/Full Tower | Micro-ATX (244×244 มม.) = 6 จุดสกรู, ใส่ในเคส Micro-ATX ขึ้นไป | Mini-ITX (170×170 มม.) = 4 จุดสกรู, ใส่ในเคส ITX ขนาดเล็กพิเศษ' },
      { label: 'ตำแหน่ง Standoffs', desc: 'เคสส่วนใหญ่จะมี Standoffs ติดตั้งมาล่วงหน้าสำหรับ ATX หากใช้ Micro-ATX ต้องย้ายหรือถอด Standoffs ส่วนเกินออก เพราะ Standoffs ที่ไม่มีรูสกรูรองรับอาจแตะเข้ากับวงจรด้านล่างเมนบอร์ดและทำให้ลัดวงจร' },
    ],
    tips: ['ตรวจสอบว่า Standoffs ทุกตัวตรงกับรูสกรูของเมนบอร์ด', 'ขันสกรูแบบทแยงมุม — ไม่ขันวนตามเข็มนาฬิกา', 'ถ้าเมนบอร์ดดูแน่นผิดปกติเมื่อวาง ให้ตรวจ I/O Shield ว่าขอบโลหะงอขวางหรือไม่'],
  },
  {
    id: 'psu-wiring',
    step: 6,
    title: 'การติดตั้ง Power Supply และเดินสายไฟเลี้ยงหลัก',
    subtitle: 'PSU & Main Power Cables',
    icon: <Zap className="w-6 h-6" />,
    accent: 'orange',
    accentBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    gradFrom: 'from-orange-500',
    gradTo: 'to-red-500',
    image: null,
    paragraphs: [
      'Power Supply Unit (PSU) เป็นอุปกรณ์แปลงไฟฟ้ากระแสสลับ AC 220V จากเต้ารับให้เป็นไฟฟ้ากระแสตรง DC แรงดันต่ำ (+3.3V, +5V, +12V) สำหรับจ่ายให้อุปกรณ์ภายในเครื่อง ติดตั้ง PSU โดยวางลงในช่องด้านล่างหลังของเคส (Bottom-mount) โดยให้พัดลม PSU หันลงพื้น (มีช่องระบายอากาศที่ก้นเคส) เพื่อดูดอากาศเย็นจากด้านล่างเข้ามาระบายความร้อนภายใน PSU โดยเฉพาะ ขันสกรู 4 ตัวที่แผงหลังเคส',
      'PSU แบบ Modular (ถอดสายได้) มีข้อดีคือสามารถเสียบเฉพาะสายไฟที่จำเป็นต้องใช้ ลดความยุ่งเหยิงภายในเคส ส่วน PSU แบบ Non-Modular จะมีสายทุกเส้นติดมาตายตัว ทำให้ต้องม้วนสายส่วนเกินซ่อนไว้หลังเคส',
    ],
    details: [
      { label: 'สาย ATX 24-pin (20+4 pin)', desc: 'สายไฟเลี้ยงหลักของเมนบอร์ดที่ใหญ่ที่สุด จ่ายไฟ +3.3V, +5V, +12V ให้ชิปเซ็ตและวงจรรอบข้างบนเมนบอร์ด ตำแหน่งเสียบอยู่ทางขอบขวาของเมนบอร์ด มีสลักล็อกป้องกันหลุด กดลงจนได้ยินเสียงคลิก' },
      { label: 'สาย EPS 8-pin (4+4 pin)', desc: 'สายไฟเลี้ยง CPU โดยเฉพาะ เสียบที่มุมซ้ายบนของเมนบอร์ดใกล้ซ็อกเก็ต CPU จ่ายไฟ +12V ให้วงจร VRM (Voltage Regulator Module) แปลงเป็นแรงดันที่ CPU ต้องการ สำหรับ CPU ระดับสูง (เช่น Core i9, Ryzen 9) เมนบอร์ดอาจมีขั้ว EPS เพิ่มอีก 4-pin หรือ 8-pin เพิ่มเติม' },
      { label: 'สาย PCIe Power (6+2 pin / 12VHPWR)', desc: 'สายไฟเลี้ยงการ์ดจอ สำหรับ GPU รุ่นเก่าใช้ 6-pin หรือ 8-pin (6+2), GPU รุ่นท็อป (RTX 4090, 5090) ใช้ขั้ว 12VHPWR 16-pin หรือ 12V-2x6 ที่สามารถจ่ายไฟสูงถึง 600W เสียบสายเหล่านี้หลังติดตั้งการ์ดจอเสร็จ' },
      { label: 'สาย SATA Power', desc: 'สายไฟจ่ายเลี้ยง HDD, SSD SATA และ Optical Drive ขั้วแบน 15-pin L-shape สาย PSU 1 เส้นมักมีหัว SATA Power ต่อพ่วง 3-4 หัว' },
    ],
    tips: ['ห้ามใช้สาย Modular ของ PSU ยี่ห้ออื่นมาเสียบสลับกัน เพราะลำดับ Pin ไม่เหมือนกัน อาจทำให้อุปกรณ์ไหม้', 'เดินสายผ่านช่องด้านหลังเคสให้มากที่สุด', 'ก่อนเสียบสายไฟ ตรวจสอบว่าสวิตช์ PSU ด้านหลังอยู่ที่ตำแหน่ง OFF (O)'],
  },
  {
    id: 'front-panel',
    step: 7,
    title: 'การเชื่อมต่อสายสัญญาณแผงด้านหน้า',
    subtitle: 'Front Panel Headers & USB',
    icon: <Cable className="w-6 h-6" />,
    accent: 'cyan',
    accentBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-200',
    gradFrom: 'from-cyan-500',
    gradTo: 'to-blue-500',
    image: null,
    paragraphs: [
      'สายสัญญาณแผงด้านหน้า (Front Panel Headers) เป็นชุดสายเล็กๆ ที่เชื่อมระหว่างปุ่มกดและไฟ LED บนตัวเคสกับขั้ว Header บนเมนบอร์ด ประกอบด้วยสายหลัก 4 เส้น: Power Switch (PWR_SW), Reset Switch (RESET_SW), HDD Activity LED (HDD_LED) และ Power LED (PWR_LED) ขั้ว Header อยู่บริเวณมุมขวาล่างของเมนบอร์ด โดยมีแผนผังการเสียบ (Pin-out Diagram) ระบุไว้ในคู่มือเมนบอร์ด',
      'สาย Power SW เป็นสายที่สำคัญที่สุด เพราะทำหน้าที่ส่งสัญญาณให้ PSU เปิดจ่ายไฟ ไม่มีขั้วบวกลบ สามารถเสียบด้านไหนก็ได้ ส่วนสาย LED (HDD_LED, PWR_LED) มีขั้วบวก-ลบ หากเสียบกลับด้าน LED จะไม่ติด แต่ไม่เสียหาย เพียงสลับกลับด้านก็ใช้งานได้ปกติ',
      'นอกจากสายแผงปุ่มกดแล้ว เคสสมัยใหม่ยังมีสายพ่วง USB 3.0 (ขั้ว 20-pin Header สีฟ้า), USB Type-C (ขั้ว USB 3.2 Gen2 Header) และสาย HD Audio (ขั้ว 9-pin Header) ที่ต้องเสียบเพิ่มเติมเพื่อให้พอร์ตด้านหน้าเคสทำงานได้',
    ],
    details: [
      { label: 'Power SW (2-pin)', desc: 'สั่งเปิด/ปิดเครื่อง ไม่มีทิศทางขั้ว เสียบตำแหน่ง PWR_SW หรือ POWER+ POWER- บนเมนบอร์ด' },
      { label: 'Reset SW (2-pin)', desc: 'สั่ง Restart เครื่อง ไม่มีทิศทางขั้ว เสียบตำแหน่ง RESET_SW' },
      { label: 'HDD LED (2-pin)', desc: 'ไฟแสดงสถานะการอ่าน/เขียนดิสก์ มีขั้ว +/- ถ้าเสียบกลับด้านไฟจะไม่ติดแต่ไม่เสียหาย' },
      { label: 'Power LED (2/3-pin)', desc: 'ไฟแสดงสถานะเปิดเครื่อง มีขั้ว +/- บางเคสมาเป็นสาย 3-pin แถวเดียว ให้ตรวจสอบคู่มือเมนบอร์ดว่าจะเสียบหัวไหนลงตรงไหน' },
      { label: 'USB 3.0 Header (20-pin)', desc: 'ขั้วเสียบขนาดใหญ่สีฟ้า มี Key กันเสียบกลับด้าน หาตำแหน่ง USB3 บนเมนบอร์ดแล้วกดเสียบลงจนล็อก' },
      { label: 'HD Audio Header (9-pin)', desc: 'ขั้วเสียบสายหูฟัง/ไมโครโฟนด้านหน้า ตำแหน่งมักอยู่มุมซ้ายล่างของเมนบอร์ด มีป้ายกำกับ AAFP หรือ HD_AUDIO' },
    ],
    tips: ['ใช้คีม (Tweezers) ช่วยเสียบสายเล็กๆ เพราะนิ้วอาจใหญ่เกินไป', 'ถ่ายรูปแผนผังในคู่มือเมนบอร์ดไว้ในมือถือเพื่อดูสะดวก', 'สาย Power SW คือสายเดียวที่ต้องเสียบให้ได้ก่อนเป็นอันดับแรก มิฉะนั้นจะเปิดเครื่องไม่ได้'],
  },
  {
    id: 'cable-mgmt',
    step: 8,
    title: 'ศิลปะการจัดสายสัญญาณ (Cable Management)',
    subtitle: 'Cable Management & Airflow',
    icon: <Wind className="w-6 h-6" />,
    accent: 'sky',
    accentBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderColor: 'border-sky-200',
    gradFrom: 'from-sky-500',
    gradTo: 'to-blue-500',
    image: '/images/it/cable_management.png',
    paragraphs: [
      'Cable Management ไม่ใช่เรื่องความสวยงามเพียงอย่างเดียว แต่มีผลโดยตรงต่อประสิทธิภาพการระบายอากาศ (Airflow) ภายในเคส หลักการคือทิศทางลม (Airflow Path) ต้องไหลจากด้านหน้า (Intake) ผ่านชิ้นส่วนที่ร้อน (CPU, GPU, VRM) ออกไปทางด้านหลังและด้านบน (Exhaust) หากมีสายไฟพันกันขวางทางลมจะทำให้เกิด Dead Zone ที่สะสมความร้อน',
      'หลักการจัดสายเบื้องต้น: เดินสายไฟทุกเส้นผ่านช่องด้านหลังเมนบอร์ดเทรย์ (Cable Routing Holes / Grommets) แล้วค่อยนำสายลอดกลับออกมาเฉพาะตรงจุดที่ต้องเสียบ ใช้สายรัดไนลอน (Zip Ties) หรือแถบตีนตุ๊กแก (Velcro Straps) รวบสายเป็นมัดแล้วยึดติดกับจุดยึดสายที่เคสจัดเตรียมไว้',
      'เคสรุ่นใหม่มักมี PSU Shroud (แผงบังครอบ PSU) ที่ช่วยซ่อนสายส่วนเกินไว้ด้านล่าง รวมถึงมี Cable Management Bar แถบโลหะที่ช่วยกดสายให้แนบชิดผนังเคส ทำให้ด้านหน้าดูสะอาดเรียบร้อยเหมือนมืออาชีพ',
    ],
    details: [
      { label: 'Positive vs Negative Air Pressure', desc: 'Positive Pressure (พัดลม Intake > Exhaust) ป้องกันฝุ่นเข้าช่องรอยรั่ว แต่ลมร้อนอาจระบายช้า | Negative Pressure (Exhaust > Intake) ระบายความร้อนดี แต่ฝุ่นจะถูกดูดเข้าตามช่องรอยรั่ว | แนะนำ Slight Positive Pressure เพื่อสมดุลทั้งสองอย่าง' },
      { label: 'ข้อห้ามในการจัดสาย', desc: 'ห้ามใช้ Zip Ties รัดสายกับขอบคมของโลหะเคส ห้ามดึงสายแน่นเกินไปจนเกิดแรงตึงที่ขั้วเสียบ และห้ามปล่อยสายหลวมจนเข้าไปขัดใบพัดลม (Fan Blade) ซึ่งอาจทำให้พัดลมหยุดทำงานหรือสายไฟชำรุด' },
    ],
    tips: ['ใช้ Velcro Straps แทน Zip Ties ถ้าเป็นไปได้ เพราะถอดปรับได้ง่ายกว่า', 'จัดสาย 24-pin ATX เป็นเส้นสุดท้าย เพราะเป็นสายที่ใหญ่และดัดยากที่สุด', 'ถ้าเคสมีฝั่งกระจก ให้จัดสายด้านหน้าให้เรียบร้อยเป็นพิเศษ'],
  },
  {
    id: 'gpu',
    step: 9,
    title: 'การติดตั้งการ์ดแสดงผล (GPU) บนสล็อต PCIe x16',
    subtitle: 'Graphics Card Installation',
    icon: <Monitor className="w-6 h-6" />,
    accent: 'rose',
    accentBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    gradFrom: 'from-rose-500',
    gradTo: 'to-pink-500',
    image: null,
    paragraphs: [
      'การ์ดแสดงผล (GPU) เป็นชิ้นส่วนที่ใหญ่และหนักที่สุดที่ต้องติดตั้ง จึงควรเป็นขั้นตอนสุดท้ายก่อนปิดฝาเคส เริ่มจากถอดฝาสลักช่องระบายอากาศด้านหลังเคส (Expansion Slot Covers) ออกตามจำนวนสล็อตที่ GPU ใช้ — การ์ดจอรุ่นใหม่ใช้ 2-3 สล็อต (Dual/Triple Slot) บางรุ่นท็อปใช้ถึง 3.5-4 สล็อต',
      'หาตำแหน่งสล็อต PCIe x16 แถวบนสุดบนเมนบอร์ด (ซึ่งมักเป็นสล็อตที่ได้รับ PCIe Lanes เต็มจำนวนจาก CPU โดยตรง ทำให้ได้ Bandwidth สูงสุด) กดปลดตัวล็อกสลักที่ปลายสล็อต จากนั้นจับ GPU ที่ขอบด้านบนด้วยมือทั้งสอง เล็งขั้ว PCIe Gold Fingers ให้ตรงกับสล็อต แล้วกดลงสม่ำเสมอทั้งสองด้านจนสลักดีดล็อกอัตโนมัติ',
      'ขันสกรูยึด GPU กับโครงเคสที่ฝาสลักด้านหลัง จากนั้นเสียบสาย PCIe Power จาก PSU — การ์ดจอระดับกลาง (เช่น RTX 4060) ใช้สาย 8-pin 1 เส้น, การ์ดจอระดับสูง (เช่น RTX 4080) ใช้ 12VHPWR 16-pin หรือสาย 8-pin 2-3 เส้น สำหรับ GPU ที่ยาวและหนัก ควรติดตั้ง GPU Support Bracket (ขาค้ำ) เพื่อป้องกันปัญหา GPU Sag ที่ทำให้การ์ดจอหย่อนลงมาทำลายสล็อต PCIe ได้',
    ],
    details: [
      { label: 'PCIe Generations', desc: 'PCIe Gen3 x16 = 32 GB/s, Gen4 x16 = 64 GB/s, Gen5 x16 = 128 GB/s — การ์ดจอรุ่นปัจจุบัน (RTX 40/50 Series) ใช้ PCIe Gen4 ซึ่ง Backward Compatible กับสล็อต Gen3 ได้แต่ Bandwidth จะลดลง' },
      { label: 'GPU Sag Prevention', desc: 'GPU หนัก 1.5-2.5 กก. ที่แขวนอยู่ที่สล็อตเดียวจะหย่อนลงตามเวลา ใช้ Support Bracket, 3D-printed Brace หรือ Anti-Sag Holder ยันจากด้านล่าง' },
      { label: 'สายเอาต์พุตภาพ', desc: 'หลังติดตั้ง GPU ต้องเสียบสาย Display (HDMI/DisplayPort) ที่พอร์ตบนตัว GPU ไม่ใช่พอร์ตบนเมนบอร์ด มิฉะนั้นจะใช้ Integrated Graphics แทนซึ่งประสิทธิภาพต่ำกว่ามาก' },
    ],
    tips: ['ถอด Plastic Cover ที่ปิดขั้ว PCIe Gold Fingers บนการ์ดจอก่อนเสียบ', 'หากเครื่องเปิดแต่ไม่มีภาพ ตรวจสอบว่าเสียบสาย Display ที่ GPU ไม่ใช่เมนบอร์ด', 'การ์ดจอ NVIDIA RTX 30/40 Series บางรุ่นต้องการ PSU 750W ขึ้นไป'],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   INTERACTIVE ASSEMBLY SIMULATOR — SVG + State Machine
   ═══════════════════════════════════════════════════════════════════ */
const SIM_PARTS = [
  { id: 'case',    label: 'เตรียมเคส',   color: '#14B8A6', icon: '🖥️' },
  { id: 'cpu',     label: 'CPU + Cooler', color: '#6366F1', icon: '🔲' },
  { id: 'ram',     label: 'RAM',          color: '#8B5CF6', icon: '💾' },
  { id: 'storage', label: 'M.2 SSD',     color: '#F59E0B', icon: '💽' },
  { id: 'mobo',    label: 'วางบอร์ด',    color: '#10B981', icon: '🟩' },
  { id: 'psu',     label: 'PSU + สาย',   color: '#F97316', icon: '⚡' },
  { id: 'front',   label: 'สายแผงหน้า',  color: '#06B6D4', icon: '🔌' },
  { id: 'cables',  label: 'จัดสาย',       color: '#0EA5E9', icon: '🌀' },
  { id: 'gpu',     label: 'การ์ดจอ',      color: '#F43F5E', icon: '🎮' },
];

function AssemblySimulator() {
  const [installed, setInstalled] = useState([]);
  const [warning, setWarning] = useState('');
  const [showPost, setShowPost] = useState(false);
  const [consoleLog, setConsoleLog] = useState(['[SYS] เครื่องจำลองพร้อมใช้งาน — เลือกชิ้นส่วนด้านล่างเพื่อเริ่มประกอบ']);

  const handleInstall = useCallback((partId) => {
    const partIndex = SIM_PARTS.findIndex(p => p.id === partId);
    const nextIndex = installed.length;

    if (installed.includes(partId)) {
      setWarning(`⚠️ ชิ้นส่วน "${SIM_PARTS[partIndex].label}" ถูกติดตั้งแล้ว`);
      return;
    }

    if (partIndex !== nextIndex) {
      const expectedPart = SIM_PARTS[nextIndex];
      setWarning(`❌ ต้องติดตั้ง "${expectedPart.label}" ก่อน! ลำดับขั้นตอนสำคัญมาก`);
      setConsoleLog(prev => [...prev, `[ERR] พยายามข้ามขั้นตอน: "${SIM_PARTS[partIndex].label}" → ต้องติดตั้ง "${expectedPart.label}" ก่อน`]);
      return;
    }

    const newInstalled = [...installed, partId];
    setInstalled(newInstalled);
    setWarning('');
    setConsoleLog(prev => [...prev, `[OK] ติดตั้ง ${SIM_PARTS[partIndex].label} สำเร็จ (${newInstalled.length}/9)`]);

    if (newInstalled.length === SIM_PARTS.length) {
      setConsoleLog(prev => [...prev, '[SYS] ━━━ ประกอบเสร็จสมบูรณ์ 100% ━━━', '[POST] กำลังเปิดเครื่อง...', '[POST] CPU OK — RAM OK — GPU OK — Storage OK', '[POST] ✅ POST PASSED — ระบบพร้อมติดตั้ง OS']);
      setTimeout(() => setShowPost(true), 600);
    }
  }, [installed]);

  const handleReset = () => {
    setInstalled([]);
    setWarning('');
    setShowPost(false);
    setConsoleLog(['[SYS] รีเซ็ตเครื่องจำลอง — เริ่มประกอบใหม่']);
  };

  const progress = (installed.length / SIM_PARTS.length) * 100;

  return (
    <SimulatorShell
      icon={<Wrench className="w-6 h-6" />}
      title="เครื่องจำลองการประกอบคอมพิวเตอร์ทีละขั้นตอน"
      dark
    >
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">ความคืบหน้า</span>
          <span className="text-emerald-400 font-bold">{installed.length} / {SIM_PARTS.length} ขั้นตอน</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* SVG Assembly Visualization */}
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 p-4 mb-6 overflow-hidden">
        <svg viewBox="0 0 800 420" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Case outline */}
          <rect x="200" y="10" width="400" height="400" rx="16" fill="#1E293B" stroke={installed.includes('case') ? '#14B8A6' : '#334155'} strokeWidth="3" />
          {installed.includes('case') && (
            <>
              <text x="400" y="40" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="monospace">ATX Mid-Tower Case</text>
              {/* Standoffs dots */}
              {[[260,80],[400,80],[540,80],[260,200],[400,200],[540,200],[260,340],[400,340],[540,340]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill={installed.includes('mobo') ? '#10B981' : '#475569'} />
              ))}
            </>
          )}

          {/* Motherboard */}
          {installed.includes('mobo') && (
            <rect x="240" y="60" width="320" height="300" rx="6" fill="#0F172A" stroke="#10B981" strokeWidth="2" strokeDasharray="none" opacity="0.9" />
          )}

          {/* CPU Socket */}
          {installed.includes('cpu') && (
            <g>
              <rect x="340" y="90" width="80" height="80" rx="4" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
              <text x="380" y="135" textAnchor="middle" fill="#A5B4FC" fontSize="11" fontFamily="monospace">CPU</text>
              {/* Cooler fan */}
              <circle cx="380" cy="130" r="30" fill="none" stroke="#818CF8" strokeWidth="1" strokeDasharray="4 2" opacity="0.5">
                {showPost && <animateTransform attributeName="transform" type="rotate" from="0 380 130" to="360 380 130" dur="2s" repeatCount="indefinite" />}
              </circle>
            </g>
          )}

          {/* RAM sticks */}
          {installed.includes('ram') && (
            <g>
              <rect x="460" y="90" width="14" height="100" rx="3" fill="#7C3AED" stroke="#A78BFA" strokeWidth="1.5" />
              <rect x="490" y="90" width="14" height="100" rx="3" fill="#7C3AED" stroke="#A78BFA" strokeWidth="1.5" />
              <text x="481" y="210" textAnchor="middle" fill="#C4B5FD" fontSize="9" fontFamily="monospace">DIMM A2 B2</text>
            </g>
          )}

          {/* M.2 SSD */}
          {installed.includes('storage') && (
            <g>
              <rect x="290" y="200" width="60" height="12" rx="3" fill="#92400E" stroke="#F59E0B" strokeWidth="1.5" />
              <text x="320" y="230" textAnchor="middle" fill="#FCD34D" fontSize="9" fontFamily="monospace">M.2 NVMe</text>
            </g>
          )}

          {/* PSU */}
          {installed.includes('psu') && (
            <g>
              <rect x="220" y="330" width="120" height="50" rx="6" fill="#431407" stroke="#F97316" strokeWidth="2" />
              <text x="280" y="360" textAnchor="middle" fill="#FDBA74" fontSize="10" fontFamily="monospace">PSU 750W</text>
              {/* ATX 24-pin cable */}
              <path d="M 540 160 L 570 160 L 570 355 L 340 355" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6 3" opacity="0.7" />
              {/* EPS 8-pin cable */}
              <path d="M 340 355 L 340 90 L 340 90" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
            </g>
          )}

          {/* Front panel connectors */}
          {installed.includes('front') && (
            <g>
              <rect x="520" y="310" width="60" height="30" rx="4" fill="#083344" stroke="#06B6D4" strokeWidth="1.5" />
              <text x="550" y="330" textAnchor="middle" fill="#67E8F9" fontSize="8" fontFamily="monospace">F_PANEL</text>
              {/* USB 3.0 header */}
              <rect x="520" y="270" width="40" height="20" rx="3" fill="#083344" stroke="#22D3EE" strokeWidth="1" />
              <text x="540" y="284" textAnchor="middle" fill="#67E8F9" fontSize="7" fontFamily="monospace">USB3</text>
            </g>
          )}

          {/* Cable management visualization */}
          {installed.includes('cables') && (
            <g opacity="0.6">
              <path d="M 200 200 L 185 200 L 185 350 L 200 350" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="3 2" />
              <text x="180" y="280" textAnchor="middle" fill="#7DD3FC" fontSize="8" fontFamily="monospace" transform="rotate(-90 180 280)">CABLE MGMT</text>
            </g>
          )}

          {/* GPU */}
          {installed.includes('gpu') && (
            <g>
              <rect x="260" y="250" width="200" height="40" rx="6" fill="#4C0519" stroke="#F43F5E" strokeWidth="2" />
              <text x="360" y="275" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontFamily="monospace">GPU — PCIe x16</text>
              {/* RGB effect when POST */}
              {showPost && (
                <>
                  <rect x="262" y="252" width="196" height="36" rx="5" fill="none" strokeWidth="2">
                    <animate attributeName="stroke" values="#F43F5E;#8B5CF6;#06B6D4;#10B981;#F59E0B;#F43F5E" dur="3s" repeatCount="indefinite" />
                  </rect>
                </>
              )}
            </g>
          )}

          {/* POST success animation */}
          {showPost && (
            <g>
              <rect x="300" y="160" width="200" height="50" rx="8" fill="#022C22" stroke="#10B981" strokeWidth="2" />
              <text x="400" y="182" textAnchor="middle" fill="#34D399" fontSize="13" fontFamily="monospace" fontWeight="bold">✅ POST PASSED</text>
              <text x="400" y="200" textAnchor="middle" fill="#6EE7B7" fontSize="9" fontFamily="monospace">System Ready</text>
              {/* Fans spinning indicator */}
              <circle cx="260" cy="130" r="15" fill="none" stroke="#6EE7B7" strokeWidth="1" opacity="0.5">
                <animateTransform attributeName="transform" type="rotate" from="0 260 130" to="360 260 130" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </svg>
      </div>

      {/* Part selection buttons */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {SIM_PARTS.map((part, idx) => {
          const isInstalled = installed.includes(part.id);
          const isNext = idx === installed.length;
          return (
            <button
              key={part.id}
              onClick={() => handleInstall(part.id)}
              disabled={isInstalled}
              className={`p-3 rounded-xl border text-center transition-all active:scale-95 cursor-pointer ${
                isInstalled
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : isNext
                    ? 'bg-indigo-500/20 border-indigo-400 text-white animate-pulse hover:bg-indigo-500/30'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-2xl mb-1">{part.icon}</div>
              <div className="text-[11px] font-bold leading-tight">{part.label}</div>
              {isInstalled && <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Warning */}
      {warning && (
        <div className="bg-rose-500/10 border border-rose-500/40 text-rose-400 p-4 rounded-xl flex items-center gap-3 mb-4 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{warning}</span>
        </div>
      )}

      {/* Console log */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-[13px] max-h-48 overflow-y-auto">
        <div className="text-[10px] text-teal-400 uppercase tracking-wider mb-2 font-bold">// Assembly Console</div>
        {consoleLog.map((line, i) => (
          <div key={i} className={`leading-relaxed ${
            line.startsWith('[ERR]') ? 'text-rose-400' :
            line.startsWith('[OK]') ? 'text-emerald-400' :
            line.startsWith('[POST]') ? 'text-amber-300' :
            'text-slate-400'
          }`}>
            {line}
          </div>
        ))}
      </div>

      {/* Reset */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4" /> รีเซ็ตเครื่องจำลอง
        </button>
      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INTERACTIVE WIDGET: Front Panel Header Pin-out
   ═══════════════════════════════════════════════════════════════════ */
function FrontPanelPinout() {
  const [activePin, setActivePin] = useState(null);
  const pins = [
    { id: 'pwr_sw', label: 'PWR_SW', color: '#10B981', desc: 'ปุ่มเปิด/ปิดเครื่อง — ไม่มีขั้วบวกลบ', pos: [0,0] },
    { id: 'rst_sw', label: 'RST_SW', color: '#3B82F6', desc: 'ปุ่ม Reset — ไม่มีขั้วบวกลบ', pos: [1,0] },
    { id: 'hdd_led', label: 'HDD LED', color: '#F59E0B', desc: 'ไฟแสดงสถานะอ่าน/เขียนดิสก์ — มีขั้ว +/-', pos: [0,1] },
    { id: 'pwr_led', label: 'PWR LED', color: '#EF4444', desc: 'ไฟแสดงสถานะเปิดเครื่อง — มีขั้ว +/-', pos: [1,1] },
    { id: 'speaker', label: 'SPEAKER', color: '#8B5CF6', desc: 'ลำโพง Beep Code แจ้งเตือน POST — มีขั้ว +/-', pos: [0,2] },
  ];

  return (
    <div className="bg-slate-900/70 backdrop-blur rounded-2xl border border-slate-700 p-6">
      <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Cable className="w-5 h-5 text-cyan-400" /> แผนผังขั้ว Front Panel Header
      </h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {pins.map(pin => (
          <button
            key={pin.id}
            onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
            className={`p-3 rounded-xl border text-left transition-all active:scale-95 cursor-pointer ${
              activePin === pin.id
                ? 'bg-white/10 border-white/30 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pin.color }} />
              <span className="font-mono text-sm font-bold">{pin.label}</span>
            </div>
            {activePin === pin.id && (
              <p className="text-[13px] text-slate-400 leading-relaxed mt-2">{pin.desc}</p>
            )}
          </button>
        ))}
      </div>
      <p className="text-[13px] text-slate-500 leading-relaxed">
        💡 <strong>คำแนะนำ:</strong> คลิกที่แต่ละขั้วเพื่อดูรายละเอียด — สาย Power SW และ Reset SW ไม่มีขั้วบวกลบ สามารถเสียบด้านไหนก็ได้ ส่วนสาย LED จะมีขั้ว +/- หากเสียบกลับไฟจะไม่ติดแต่ไม่เสียหาย
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INTERACTIVE WIDGET: Dual-Channel RAM Slot Selector
   ═══════════════════════════════════════════════════════════════════ */
function DualChannelDemo() {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const slots = [
    { id: 'A1', color: 'bg-slate-600', label: 'A1' },
    { id: 'A2', color: 'bg-violet-600', label: 'A2' },
    { id: 'B1', color: 'bg-slate-600', label: 'B1' },
    { id: 'B2', color: 'bg-violet-600', label: 'B2' },
  ];

  const toggleSlot = (slotId) => {
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slotId));
    } else if (selectedSlots.length < 2) {
      setSelectedSlots([...selectedSlots, slotId]);
    }
  };

  const isDualChannel = selectedSlots.length === 2 &&
    ((selectedSlots.includes('A2') && selectedSlots.includes('B2')) ||
     (selectedSlots.includes('A1') && selectedSlots.includes('B1')));

  const isSingleChannel = selectedSlots.length === 2 && !isDualChannel;

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
      <h5 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
        <MemoryStick className="w-5 h-5 text-violet-500" /> ทดลองเลือกสล็อต RAM
      </h5>
      <p className="text-sm text-slate-500 mb-4">คลิกเลือกสล็อต 2 ช่องที่ต้องการติดตั้ง RAM เพื่อดูว่าจะได้โหมด Dual-Channel หรือไม่</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        {slots.map(slot => (
          <button
            key={slot.id}
            onClick={() => toggleSlot(slot.id)}
            className={`w-12 h-28 rounded-lg border-2 flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${
              selectedSlots.includes(slot.id)
                ? 'bg-violet-500 border-violet-400 text-white shadow-lg shadow-violet-500/30'
                : `${slot.color} border-slate-500 text-slate-300 hover:border-violet-400`
            }`}
          >
            <span className="font-mono text-xs font-bold">{slot.label}</span>
            {selectedSlots.includes(slot.id) && <MemoryStick className="w-4 h-4 mt-1" />}
          </button>
        ))}
      </div>
      <div className="text-center">
        {selectedSlots.length === 0 && <span className="text-sm text-slate-400">เลือกสล็อต 2 ช่อง</span>}
        {selectedSlots.length === 1 && <span className="text-sm text-amber-500">เลือกอีก 1 สล็อต...</span>}
        {isDualChannel && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 inline mr-2" />
            ✅ Dual-Channel Mode — Bandwidth x2!
          </div>
        )}
        {isSingleChannel && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 text-sm font-bold">
            <AlertTriangle className="w-5 h-5 inline mr-2" />
            ⚠️ Single-Channel Mode — ประสิทธิภาพลดครึ่ง
          </div>
        )}
      </div>
      {selectedSlots.length > 0 && (
        <button onClick={() => setSelectedSlots([])} className="mt-3 text-sm text-slate-400 hover:text-slate-600 cursor-pointer underline mx-auto block">ล้างการเลือก</button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INTERACTIVE WIDGET: Thermal Paste Application Methods
   ═══════════════════════════════════════════════════════════════════ */
function ThermalPasteDemo() {
  const [method, setMethod] = useState('pea');
  const methods = [
    { id: 'pea', label: 'Pea Method', desc: 'หยอดเม็ดกลมขนาดถั่วลันเตาตรงกลาง IHS — วิธีที่นิยมที่สุดและปลอดภัยที่สุด แรงกดของ Cooler จะกดกระจายซิลิโคนให้ทั่วอัตโนมัติ', emoji: '🟢', svg: 'M 40 40 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0' },
    { id: 'cross', label: 'Cross Method', desc: 'ลากเส้นกากบาท (X) บางๆ จากมุมสู่มุม — ช่วยให้ซิลิโคนกระจายทั่วกว่าวิธีเม็ดถั่ว เหมาะกับ IHS ขนาดใหญ่ (AMD Ryzen 9)', emoji: '✖️', svg: 'M 20 20 L 60 60 M 60 20 L 20 60' },
    { id: 'spread', label: 'Spread Method', desc: 'ใช้ไม้พายป้ายบางๆ ทั่ว IHS ด้วยมือ — ควบคุมความหนาได้แม่นยำ แต่เสี่ยงจับฟองอากาศไว้ใต้ชั้นซิลิโคน', emoji: '🟫', svg: 'M 15 25 L 65 25 L 65 55 L 15 55 Z' },
  ];
  const active = methods.find(m => m.id === method);

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
      <h5 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
        <Thermometer className="w-5 h-5 text-indigo-500" /> เทคนิคการทาซิลิโคนระบายความร้อน
      </h5>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`p-3 rounded-xl border text-center transition-all active:scale-95 cursor-pointer ${
              method === m.id
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:shadow-sm'
            }`}
          >
            <div className="text-2xl mb-1">{m.emoji}</div>
            <div className="text-sm font-bold">{m.label}</div>
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <svg viewBox="0 0 80 80" className="w-24 h-24 shrink-0">
          <rect x="5" y="5" width="70" height="70" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <text x="40" y="16" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="monospace">IHS</text>
          <path d={active.svg} fill={method === 'spread' ? '#6366F180' : 'none'} stroke="#6366F1" strokeWidth={method === 'pea' ? 0 : 2} />
          {method === 'pea' && <circle cx="40" cy="40" r="6" fill="#6366F1" opacity="0.8" />}
        </svg>
        <p className="text-[15px] text-slate-600 leading-relaxed">{active.desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INTERACTIVE WIDGET: PSU Cable Identifier
   ═══════════════════════════════════════════════════════════════════ */
function PSUCableIdentifier() {
  const [activeC, setActiveC] = useState(null);
  const cables = [
    { id: 'atx24', label: 'ATX 24-pin', color: '#F97316', pins: '20+4', voltage: '+3.3V / +5V / +12V', target: 'เมนบอร์ด (ขอบขวา)', icon: '🔌' },
    { id: 'eps8', label: 'EPS 8-pin', color: '#FBBF24', pins: '4+4', voltage: '+12V', target: 'CPU VRM (มุมซ้ายบน)', icon: '⚡' },
    { id: 'pcie', label: 'PCIe 8-pin', color: '#F43F5E', pins: '6+2', voltage: '+12V', target: 'การ์ดจอ (GPU)', icon: '🎮' },
    { id: 'sata', label: 'SATA Power', color: '#10B981', pins: '15', voltage: '+3.3V / +5V / +12V', target: 'HDD / SSD / Optical Drive', icon: '💾' },
    { id: '12vhpwr', label: '12VHPWR 16-pin', color: '#8B5CF6', pins: '16', voltage: '+12V (600W)', target: 'GPU รุ่นใหม่ (RTX 40/50)', icon: '🔥' },
  ];

  return (
    <div className="bg-slate-900/70 backdrop-blur rounded-2xl border border-slate-700 p-6">
      <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Plug className="w-5 h-5 text-orange-400" /> ระบุสายไฟ PSU
      </h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {cables.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveC(activeC === c.id ? null : c.id)}
            className={`p-3 rounded-xl border transition-all active:scale-95 cursor-pointer text-left ${
              activeC === c.id
                ? 'bg-white/10 border-white/30'
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{c.icon}</span>
              <span className="font-mono text-sm font-bold" style={{ color: c.color }}>{c.label}</span>
            </div>
            <div className="text-[12px] text-slate-500">{c.pins} pin</div>
          </button>
        ))}
      </div>
      {activeC && (() => {
        const c = cables.find(x => x.id === activeC);
        return (
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-slate-400">จำนวน Pin:</span>
              <span className="text-white font-mono">{c.pins}-pin</span>
              <span className="text-slate-400">แรงดัน:</span>
              <span className="text-amber-300 font-mono">{c.voltage}</span>
              <span className="text-slate-400">เสียบที่:</span>
              <span className="text-emerald-300">{c.target}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   QUIZ DATA
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'ลำดับการประกอบที่ถูกต้อง',
    desc: 'ข้อใดเป็นลำดับที่ถูกต้องในการประกอบคอมพิวเตอร์?',
    options: [
      { key: 'A', text: 'ติดตั้ง GPU → ติดตั้ง CPU → ใส่ RAM', isCorrect: false },
      { key: 'B', text: 'เตรียมเคส → CPU+Cooler → RAM → Storage → วางบอร์ด → PSU', isCorrect: true },
      { key: 'C', text: 'วางบอร์ด → ติดตั้ง CPU → ติดตั้ง PSU → ใส่ RAM', isCorrect: false },
      { key: 'D', text: 'ติดตั้ง PSU → วางบอร์ด → ใส่ RAM → ติดตั้ง CPU', isCorrect: false },
    ],
    tip: 'ลำดับที่ปลอดภัยคือติดตั้ง CPU บนเมนบอร์ดก่อนวางลงเคส',
  },
  {
    title: 'Dual-Channel RAM',
    desc: 'หากเมนบอร์ดมี 4 สล็อต DIMM (A1, A2, B1, B2) ต้องใส่ RAM 2 แถวที่สล็อตใดเพื่อเปิด Dual-Channel?',
    options: [
      { key: 'A', text: 'A1 และ A2', isCorrect: false },
      { key: 'B', text: 'A1 และ B1', isCorrect: false },
      { key: 'C', text: 'A2 และ B2', isCorrect: true },
      { key: 'D', text: 'A1 และ B2', isCorrect: false },
    ],
    tip: 'Dual-Channel ต้องใส่คู่สล็อตที่มีสีเดียวกัน (A2+B2 หรือ A1+B1)',
  },
  {
    title: 'การทาซิลิโคน',
    desc: 'เทคนิคการทาซิลิโคน (Thermal Paste) วิธีใดนิยมมากที่สุดสำหรับมือใหม่?',
    options: [
      { key: 'A', text: 'Spread Method — ป้ายทั่ว IHS ด้วยไม้พาย', isCorrect: false },
      { key: 'B', text: 'Pea Method — หยอดเม็ดกลมตรงกลาง', isCorrect: true },
      { key: 'C', text: 'Line Method — ลากเส้นตรง 1 เส้น', isCorrect: false },
      { key: 'D', text: 'Dot Method — หยอด 5 จุดกระจาย', isCorrect: false },
    ],
    tip: 'Pea Method ปลอดภัย ง่ายที่สุด และแรงกด Cooler จะกระจายซิลิโคนให้เอง',
  },
  {
    title: 'สายไฟ PSU หลัก',
    desc: 'สายไฟเลี้ยง CPU บนเมนบอร์ดคือสายอะไร?',
    options: [
      { key: 'A', text: 'ATX 24-pin', isCorrect: false },
      { key: 'B', text: 'SATA Power', isCorrect: false },
      { key: 'C', text: 'PCIe 8-pin', isCorrect: false },
      { key: 'D', text: 'EPS 8-pin (4+4)', isCorrect: true },
    ],
    tip: 'EPS 8-pin จ่ายไฟ +12V ให้ VRM ของ CPU โดยเฉพาะ',
  },
  {
    title: 'สาย Front Panel',
    desc: 'สาย Power SW มีคุณสมบัติพิเศษอย่างไร?',
    options: [
      { key: 'A', text: 'มีขั้วบวก-ลบ ต้องเสียบให้ถูกทิศทาง', isCorrect: false },
      { key: 'B', text: 'ไม่มีขั้วบวก-ลบ เสียบด้านไหนก็ได้', isCorrect: true },
      { key: 'C', text: 'ต้องเสียบคู่กับ Reset SW เท่านั้น', isCorrect: false },
      { key: 'D', text: 'ต้องต่อสายกราวด์เพิ่มเติม', isCorrect: false },
    ],
    tip: 'Power SW เป็นสวิตช์ที่แค่ต่อวงจร ON/OFF ไม่มีทิศทางขั้ว',
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT — Vertical Stacking Architecture
   ═══════════════════════════════════════════════════════════════════ */
export default function IT2_3() {
  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      {/* Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={IT2_3_BLOBS} />

      {/* Layer 3: Content (Layer 2 StandardHeader handled by LessonViewer) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-6 md:space-y-8">

        {/* ─── Introduction Section ─── */}
        <div className="space-y-4">
          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
            การประกอบคอมพิวเตอร์เป็นทักษะพื้นฐานที่ช่างคอมพิวเตอร์ทุกคนต้องเชี่ยวชาญ ลำดับขั้นตอนการประกอบที่ถูกต้องจะช่วยป้องกันความเสียหายต่ออุปกรณ์ ลดความเสี่ยงจากไฟฟ้าสถิต และทำให้กระบวนการทำงานเป็นไปอย่างราบรื่น ในบทเรียนนี้จะอธิบายขั้นตอนการประกอบคอมพิวเตอร์ทั้ง 9 ลำดับ ตั้งแต่การเตรียมพื้นที่ทำงานจนถึงการติดตั้งการ์ดแสดงผลเป็นชิ้นสุดท้าย
          </p>
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl p-5 border border-teal-200/50">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-teal-700 mb-1">ข้อควรจำก่อนเริ่มประกอบ</p>
                <p className="text-sm text-teal-600 leading-relaxed">
                  สวมสายรัดข้อมือป้องกันไฟฟ้าสถิต (ESD Wrist Strap) ตลอดเวลาระหว่างประกอบ ถอดปลั๊กไฟ PSU ออกก่อน
                  และอย่าวางชิ้นส่วนบนพื้นผิวที่นำไฟฟ้าสถิตได้ (เช่น พรม ผ้า หรือถุงพลาสติกทั่วไป)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 9 Subtopics — Vertical Stacking ─── */}
        {ASSEMBLY_STEPS.map((section) => (
          <section key={section.id} className="space-y-5">
            {/* Section Header — Fluid Open-Air */}
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${section.accentBg} ${section.iconColor} transition-all duration-300 hover:scale-110 hover:rotate-6`}>
                {section.icon}
              </div>
              <div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-zinc-900 leading-tight">
                  {section.title}
                </h3>
                <span className={`text-sm font-semibold bg-gradient-to-r ${section.gradFrom} ${section.gradTo} text-transparent bg-clip-text pb-1 leading-normal`}>
                  {section.subtitle}
                </span>
              </div>
            </div>

            {/* Image (if applicable) */}
            {section.image && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto object-cover max-h-[400px]"
                  loading="lazy"
                />
              </div>
            )}

            {/* Theory paragraphs — Open Air (no card wrap) */}
            <div className="space-y-4">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Detail cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.details.map((detail, i) => (
                <div
                  key={i}
                  className={`bg-white/60 backdrop-blur-xl rounded-2xl border ${section.borderColor} shadow-lg p-5 transition-all hover:-translate-y-1 hover:shadow-xl group`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0`} style={{ backgroundColor: `var(--tw-color-${section.accent}-500, #6366F1)` }} />
                    <div>
                      <h5 className="text-base font-bold text-slate-800 mb-1">{detail.label}</h5>
                      <p className="text-sm text-slate-500 leading-relaxed">{detail.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            {section.tips && section.tips.length > 0 && (
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 p-5">
                <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-500" /> เคล็ดลับสำคัญ
                </h5>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Embedded Interactive Widgets per section */}
            {section.id === 'cpu-cooler' && <ThermalPasteDemo />}
            {section.id === 'ram' && <DualChannelDemo />}
            {section.id === 'psu-wiring' && <PSUCableIdentifier />}
            {section.id === 'front-panel' && <FrontPanelPinout />}
          </section>
        ))}

        {/* ─── Interactive Assembly Simulator ─── */}
        <AssemblySimulator />

        {/* ─── Quiz Engine ─── */}
        <QuizEngine
          title="ทดสอบความรู้: การประกอบคอมพิวเตอร์"
          description="ตอบคำถาม 5 ข้อเพื่อทดสอบความเข้าใจในขั้นตอนการประกอบคอมพิวเตอร์"
          levels={QUIZ_LEVELS}
          accentColor="from-teal-500/20 to-cyan-500/20"
          icon={<Wrench className="w-6 h-6" />}
        />
      </main>

      {/* Layer 4: Teacher Task Footer */}
      <div className="relative z-10">
        <TeacherTask
          title="ใบงานปฏิบัติ: ถอดประกอบเครื่องคอมพิวเตอร์จริง"
          taskText={`1. ศึกษาขั้นตอนการประกอบคอมพิวเตอร์ทั้ง 9 ลำดับให้เข้าใจก่อนลงมือปฏิบัติ\n2. จับกลุ่ม 3-4 คน ถอดชิ้นส่วนเครื่องคอมพิวเตอร์ออกทั้งหมดตามลำดับย้อนกลับ\n3. ประกอบชิ้นส่วนกลับคืนตามลำดับที่ถูกต้อง พร้อมทำ Cable Management\n4. ทดสอบเปิดเครื่องและตรวจสอบ POST ผ่านหน้าจอ BIOS/UEFI\n5. ถ่ายรูปผลงานการจัดสายไฟภายในเคสส่งครูพร้อมเขียนรายงานสรุปขั้นตอน`}
        />
      </div>
    </div>
  );
}
