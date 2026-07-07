/**
 * it3_1.jsx — การติดตั้งระบบปฏิบัติการและการเตรียมความพร้อม (OS Installation & Deployment)
 * =========================================================================================
 * บทเรียนรวมบทที่ 3:
 *   3.1.1 บทบาทและหน้าที่ของระบบปฏิบัติการ (OS Roles & Architecture)
 *   3.1.2 ประเภทของระบบปฏิบัติการ (Windows, macOS, Linux)
 *   3.2.1 การสำรองข้อมูล (Data Backup & 3-2-1 Rule)
 *   3.2.2 การเช็คสเปกคอมพิวเตอร์ (Hardware Requirements)
 *   3.2.3 การสร้างสื่อติดตั้ง (Bootable Media) และประเภทระบบไฟล์ / Partition Scheme (MBR/GPT)
 *   3.3.1 การเข้าตั้งค่า BIOS/UEFI และลำดับบูต (Boot Priority)
 *   3.3.2 ขั้นตอนติดตั้ง Windows 10 แบบล้างเครื่อง (Clean Install)
 *   3.4.1 หน้าที่ของไดรเวอร์ (Device Drivers) และการตรวจสอบผ่าน Device Manager
 * 
 * ระบบจำลองแบบรวมหน้าเดียว (Interactive Simulators Stacked):
 *   1. Rufus USB Bootable Creator Simulator
 *   2. BIOS Boot Selector & Windows 10 Setup Engine Simulator
 *   3. Windows Device Manager Driver Installer Simulator
 * 
 * ธีมสี: Teal / Indigo / Amber (System Setup & Architecture Palette)
 */
import React, { useState, useEffect } from 'react';
import {
  Monitor, Usb, Settings, Power, CheckCircle2, AlertTriangle, HardDrive, 
  Play, ArrowRight, RefreshCw, HelpCircle, Check, Cpu, Shield, 
  Plus, Trash2, CheckCircle, Info, FolderOpen, Save, Database, Server,
  Layers, Paintbrush, Terminal, Globe, Lock, Wifi, Volume2, Image, Sparkles
} from 'lucide-react';
import { AmbientBackdrop, SectionBlock, ConceptCard, SimulatorShell, QuizEngine } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

/* ── Ambient Blobs (Chapter 3 Unified Theme Blobs) ──────────────── */
const IT3_UNIFIED_BLOBS = [
  { color: 'bg-teal-200', size: 'w-[500px] h-[500px]', position: '-top-20 -left-20', opacity: 'opacity-30' },
  { color: 'bg-indigo-200', size: 'w-[400px] h-[400px]', position: 'top-1/4 -right-20', opacity: 'opacity-25' },
  { color: 'bg-amber-100', size: 'w-[400px] h-[400px]', position: 'bottom-1/3 left-1/3', opacity: 'opacity-20' },
  { color: 'bg-cyan-200', size: 'w-[500px] h-[500px]', position: 'bottom-10 right-10', opacity: 'opacity-25' },
];

/* ── Data: OS Roles ─────────────────────────────────────────────── */
const OS_ROLES = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'จัดสรรทรัพยากร (Resource Management)',
    desc: 'จัดการ CPU, RAM และอุปกรณ์ I/O ให้กับโปรแกรมต่าง ๆ อย่างเหมาะสม ป้องกันเครื่องค้างหรือโปรแกรมแย่งทรัพยากรกัน',
    accent: 'teal',
    detail: 'CPU Scheduling กำหนดเวลาให้โปรเซส — Memory Management จัดการ RAM — I/O Control บริหารคิวอุปกรณ์ต่อพ่วง',
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: 'ควบคุมการทำงานของแอป (Process Control)',
    desc: 'สร้าง รัน และยุติโปรเซสทั้งหมดในเบื้องหลัง รวมถึงจัดการ Multitasking สลับงานอย่างลื่นไหล',
    accent: 'cyan',
    detail: 'Process คือแอปพลิเคชันที่รันทำงานอยู่ — Thread คือส่วนย่อยของโปรเซส — Context Switching สลับการรันแบบวินาทีต่อวินาที',
  },
  {
    icon: <FolderOpen className="w-6 h-6" />,
    title: 'จัดการระบบไฟล์ (File Management)',
    desc: 'จัดระเบียบโครงสร้างไดเรกทอรี ควบคุมสิทธิ์การอ่าน เขียน และลบไฟล์ลงในอุปกรณ์เก็บข้อมูลอย่างมีมาตรฐาน',
    accent: 'emerald',
    detail: 'File Systems เช่น NTFS, FAT32, exFAT — Directory Tree โครงสร้างโฟลเดอร์ต้นไม้ — Permission สิทธิ์ Read/Write/Execute',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'ระบบรักษาความปลอดภัย (Security)',
    desc: 'ยืนยันตัวตนของผู้ใช้ (Login) กำหนดสิทธิ์ และทำหน้าที่ปกป้องโปรแกรม/ข้อมูลไม่ให้โดนมัลแวร์เข้าถึงโดยไม่ได้รับอนุญาต',
    accent: 'rose',
    detail: 'Authentication ยืนยันไอดีผู้ใช้ — Authorization กำหนดสิทธิ์ผู้ดูแลระบบ/ทั่วไป — Local Security Policy คุมความปลอดภัย',
  },
];

/* ── Data: OS Types ─────────────────────────────────────────────── */
const OS_TYPES = [
  {
    name: 'Windows',
    icon: <Monitor className="w-8 h-8" />,
    color: 'sky',
    developer: 'Microsoft',
    license: 'Proprietary (มีค่าลิขสิทธิ์)',
    gui: 'Windows Desktop + Start Menu',
    cli: 'CMD, PowerShell',
    fileSystem: 'NTFS, FAT32, exFAT',
    marketShare: '~72%',
    strengths: ['ใช้งานง่ายสำหรับผู้ใช้ทั่วไป', 'ซอฟต์แวร์และเกมรองรับมากที่สุด', 'มีผู้ใช้จำนวนมากที่สุดในโลก'],
    weaknesses: ['เสียค่าลิขสิทธิ์ใบอนุญาต', 'เป้าหมายหลักของไวรัสและมัลแวร์'],
    useCases: ['คอมพิวเตอร์สำนักงาน, วงการเกม, สถาบันการศึกษา'],
  },
  {
    name: 'macOS',
    icon: <Paintbrush className="w-8 h-8" />,
    color: 'rose',
    developer: 'Apple Inc.',
    license: 'Proprietary (ฟรีกับฮาร์ดแวร์ Mac)',
    gui: 'Aqua UI + Dock',
    cli: 'Terminal (Zsh)',
    fileSystem: 'APFS, HFS+',
    marketShare: '16%',
    strengths: ['การออกแบบ UX/UI สวยสะดุดตา', 'ระบบมีความเสถียรและความปลอดภัยสูง', 'ทำงานเข้ากันกับอุปกรณ์ Apple ได้ยอดเยี่ยม'],
    weaknesses: ['ราคาสูง ใช้ได้กับฮาร์ดแวร์ Apple เท่านั้น', 'เกมและซอฟต์แวร์เฉพาะทางน้อยกว่า Windows'],
    useCases: ['งานด้านกราฟิกดีไซน์, ตัดต่อวิดีโอ, พัฒนาแอปพลิเคชัน iOS/macOS'],
  },
  {
    name: 'Linux',
    icon: <Terminal className="w-8 h-8" />,
    color: 'amber',
    developer: 'Community (Open Source)',
    license: 'GPL (ฟรี 100% และเปิดโค้ด)',
    gui: 'GNOME, KDE (ปรับเปลี่ยนได้)',
    cli: 'Bash, Zsh',
    fileSystem: 'ext4, XFS, Btrfs',
    marketShare: '~4% (Desktop) / ~80% (Server)',
    strengths: ['ใช้งานได้ฟรี ปรับเปลี่ยนซอร์สโค้ดได้อิสระ', 'กินทรัพยากรเครื่องน้อย มีความปลอดภัยสูงมาก'],
    weaknesses: ['ต้องพิมพ์คำสั่ง CLI บ่อย เหมาะสำหรับช่างและแอดมิน', 'แอปพลิเคชันส่วนใหญ่ต้องจำลองใช้'],
    useCases: ['เครื่องแม่ข่าย (Server), งาน DevOps, ความมั่นคงปลอดภัยไซเบอร์ (Cybersecurity)'],
  },
];

/* ── Data: Unified Quiz ─────────────────────────────────────────── */
const QUIZ_LEVELS_UNIFIED = [
  {
    title: 'หน้าที่ใดคือหน้าที่หลักของระบบปฏิบัติการ (OS)?',
    desc: 'เลือกหน้าที่เชิงนิยามของ OS ในการควบคุมฮาร์ดแวร์',
    options: [
      { key: 'A', text: 'เชื่อมอินพุตสัญญาณไร้สายเข้าคอมพิวเตอร์เครื่องอื่น', isCorrect: false },
      { key: 'B', text: 'เป็นสื่อกลางระหว่างฮาร์ดแวร์และผู้ใช้งาน คอยจัดสรรทรัพยากรในระบบ', isCorrect: true },
      { key: 'C', text: 'ออกแบบกระดานเมนบอร์ดและระบบระบายความร้อน', isCorrect: false },
      { key: 'D', text: 'แปลงพลังงานไฟฟ้าบ้านมาจ่ายเป็นกำลังไฟกระแสตรง', isCorrect: false },
    ],
    tip: 'OS ทำหน้าที่เป็นผู้ควบคุมความสงบเรียบร้อย จัดการคิว RAM และ CPU ให้โปรแกรมรันได้โดยไม่ค้างชนกัน',
  },
  {
    title: 'กฎการสำรองข้อมูลแบบ 3-2-1 กำหนดให้ต้องสำรองข้อมูลไว้นอกสถานที่ (Off-site) อย่างน้อยกี่ชุด?',
    desc: 'เลือกจำนวนชุดข้อมูลสำรองภายนอกเพื่อกระจายความเสี่ยง',
    options: [
      { key: 'A', text: '3 ชุด', isCorrect: false },
      { key: 'B', text: '2 ชุด', isCorrect: false },
      { key: 'C', text: '1 ชุด', isCorrect: true },
      { key: 'D', text: 'ไม่จำเป็นต้องมี', isCorrect: false },
    ],
    tip: 'เก็บสำรอง 3 ชุด, ลงสื่อต่างกัน 2 ชนิด, และจัดเก็บไว้นอกสถานที่ (เช่น Cloud Storage) 1 ชุด',
  },
  {
    title: 'พาร์ติชันดิสก์แบบใดที่ออกแบบมาสำหรับเมนบอร์ดรุ่นใหม่ที่เป็นระบบ UEFI?',
    desc: 'เลือกรหัสสกีมพาร์ติชันที่ถูกต้อง',
    options: [
      { key: 'A', text: 'MBR (Master Boot Record)', isCorrect: false },
      { key: 'B', text: 'GPT (GUID Partition Table)', isCorrect: true },
      { key: 'C', text: 'NTFS (New Technology File System)', isCorrect: false },
      { key: 'D', text: 'exFAT (Extended File Allocation Table)', isCorrect: false },
    ],
    tip: 'GPT ทำงานเข้าคู่กับโหมด UEFI รองรับพาร์ติชันใหญ่กว่า 2TB และมีความปลอดภัยสูงกว่า MBR ดั้งเดิม',
  },
  {
    title: 'ในตัวติดตั้ง Windows 10 Setup หากนักเรียนต้องการล้างข้อมูลเพื่อติดตั้งระบบใหม่ทั้งหมดอย่างหมดจด ควรเลือกหัวข้อประเภทการติดตั้งใด?',
    desc: 'เลือกวิธีการติดตั้งระบบวินโดวส์สะอาดใหม่เอี่ยม',
    options: [
      { key: 'A', text: 'Upgrade: Install Windows and keep files, settings, and applications', isCorrect: false },
      { key: 'B', text: 'Custom: Install Windows only (advanced)', isCorrect: true },
      { key: 'C', text: 'Repair: Fix system registry automatically', isCorrect: false },
      { key: 'D', text: 'System Restore from previous shadow copies', isCorrect: false },
    ],
    tip: 'การเลือก Custom (Clean Install) จะเปิดหน้าต่าง Disk Partition ให้ลบพาร์ติชันเดิมทิ้งเพื่อความเสถียร',
  },
  {
    title: 'ถ้าเปิดคอมพิวเตอร์มาแล้วภาพจอหยาบ มีสเกลที่จำกัด 1024x768 และไม่มีเสียงออก ลำดับแรกควรตรวจสอบอะไรใน Device Manager?',
    desc: 'เลือกข้อตรวจสอบความสมบูรณ์ของระบบควบคุมฮาร์ดแวร์',
    options: [
      { key: 'A', text: 'เช็คว่าพัดลม CPU ทำงานรอบจัดเพียงพอหรือไม่', isCorrect: false },
      { key: 'B', text: 'ตรวจสอบสถานะไดรเวอร์ว่ามีไอคอนแจ้งเตือน ⚠️ หรือมี Unknown Device หรือไม่', isCorrect: true },
      { key: 'C', text: 'ลบระบบ NTFS แล้วลง FAT32 ใหม่เพื่อรีเซ็ตดิสก์', isCorrect: false },
      { key: 'D', text: 'ถอดการ์ดเสียงและสายแลนออกถาวร', isCorrect: false },
    ],
    tip: 'ไอคอนตกใจสีเหลือง ⚠️ หรือ Unknown Device บ่งบอกว่าอุปกรณ์ตรวจพบแต่ไม่มีไดรเวอร์ที่ตรงรุ่นมาแปลการทำงานให้ OS',
  },
];

/* ── Hardcoded Color Asset Mapping ──────────────────────────────── */
const ACCENT_BORDER = {
  teal: 'border-teal-200/60 hover:border-teal-400/80',
  cyan: 'border-cyan-200/60 hover:border-cyan-400/80',
  emerald: 'border-emerald-200/60 hover:border-emerald-400/80',
  rose: 'border-rose-200/60 hover:border-rose-400/80',
};

const ACCENT_ICON_BG = {
  teal: 'bg-teal-50 text-teal-700',
  cyan: 'bg-cyan-50 text-cyan-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  rose: 'bg-rose-50 text-rose-700',
};

const ACCENT_TEXT = {
  teal: 'text-teal-600',
  cyan: 'text-cyan-600',
  emerald: 'text-emerald-600',
  rose: 'text-rose-600',
};

const ACCENT_BG = {
  teal: 'bg-teal-50/50',
  cyan: 'bg-cyan-50/50',
  emerald: 'bg-emerald-50/50',
  rose: 'bg-rose-50/50',
};

const OS_CARD_BORDER = {
  sky: 'border-sky-300/60 hover:border-sky-400/80',
  rose: 'border-rose-300/60 hover:border-rose-400/80',
  amber: 'border-amber-300/60 hover:border-amber-400/80',
};

const OS_HEADER_BG = {
  sky: 'bg-gradient-to-br from-sky-500 to-blue-600',
  rose: 'bg-gradient-to-br from-rose-500 to-pink-600',
  amber: 'bg-gradient-to-br from-amber-500 to-orange-600',
};

/* ── SUB-COMPONENT: OS Role Card ───────────────────────────────── */
function RoleCard({ role }) {
  const [expanded, setExpanded] = useState(false);
  const accent = role.accent;

  return (
    <div
      className={`bg-white/75 backdrop-blur-xl border ${ACCENT_BORDER[accent]} shadow-xl rounded-[2rem] p-7 
        hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${ACCENT_BG[accent]} rounded-bl-full z-0 transition-transform group-hover:scale-110`} />

      <div className="relative z-10">
        <div className="flex items-start gap-5 mb-3">
          <div className={`p-4 rounded-2xl ${ACCENT_ICON_BG[accent]} ${ACCENT_TEXT[accent]} 
            transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0`}>
            {role.icon}
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="text-lg font-bold text-zinc-900 leading-snug mb-1">{role.title}</h4>
            <p className="text-[14.5px] md:text-[15.5px] text-zinc-600 leading-relaxed">{role.desc}</p>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-350 ${expanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className={`${ACCENT_BG[accent]} border ${ACCENT_BORDER[accent]} rounded-2xl p-4 border-l-[3.5px] border-l-teal-500`}>
            <p className="text-[13.5px] text-zinc-700 leading-relaxed font-mono">{role.detail}</p>
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
export default function It3_1() {
  /* ── State สำหรับ Toast Notification ────────────────────────────── */
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showNotification = (msg, type = 'info') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  /* ── STATE: Simulator 1 - Rufus ─────────────────────────────────── */
  const [rufusState, setRufusState] = useState({
    device: 'USB_DRIVE_16GB (E:)',
    isoSelected: false,
    partitionScheme: 'GPT',
    targetSystem: 'UEFI (non CSM)',
    status: 'READY_TO_START', // READY, WRITING, COMPLETED
    progress: 0
  });

  useEffect(() => {
    let interval;
    if (rufusState.status === 'WRITING') {
      interval = setInterval(() => {
        setRufusState(prev => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            showNotification("เขียนแผ่นติดตั้ง Rufus สำเร็จ! กรุณาเปิดเครื่องจำลองในสเต็ปถัดไป", "success");
            return { ...prev, status: 'COMPLETED', progress: 100 };
          }
          return { ...prev, progress: prev.progress + 20 };
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [rufusState.status]);

  const handleStartRufus = () => {
    if (!rufusState.isoSelected) {
      showNotification("กรุณาคลิกปุ่ม SELECT ISO เพื่อเปิดแผ่นติดตั้งวินโดวส์!", "warning");
      return;
    }
    setRufusState(prev => ({ ...prev, status: 'WRITING', progress: 0 }));
  };

  const handleResetRufus = () => {
    setRufusState({
      device: 'USB_DRIVE_16GB (E:)',
      isoSelected: false,
      partitionScheme: 'GPT',
      targetSystem: 'UEFI (non CSM)',
      status: 'READY_TO_START',
      progress: 0
    });
    showNotification("รีเซ็ตค่าซอฟต์แวร์ Rufus เรียบร้อยแล้ว", "info");
  };

  /* ── STATE: Simulator 2 - BIOS & OS Install ─────────────────────── */
  const [installPhase, setInstallPhase] = useState('power_off'); // power_off, post_screen, bios_bootmenu, os_installer
  const [biosBoot, setBiosBoot] = useState(null); // ssd, usb
  const [setupStep, setSetupStep] = useState('lang'); // lang, install_now, activate_key, os_select, license, type_select, partitioning, progress, oobe_region, oobe_keyboard, oobe_account, win_desktop
  const [targetOS, setTargetOS] = useState('Windows 10 Pro');
  const [licenseAccept, setLicenseAccept] = useState(false);
  const [partitions, setPartitions] = useState([
    { id: 1, name: 'Drive 0 Partition 1: System Reserved', sizeGB: 0.5, type: 'System', freeGB: 0.1 },
    { id: 2, name: 'Drive 0 Partition 2: System C:', sizeGB: 119.5, type: 'Primary', freeGB: 12.0 },
    { id: 3, name: 'Drive 0 Partition 3: Recovery', sizeGB: 1.5, type: 'Recovery', freeGB: 0.2 },
  ]);
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [osInstallProgress, setOsInstallProgress] = useState(0);
  const [oobeRegion, setOobeRegion] = useState('Thailand');
  const [oobeKbd, setOobeKbd] = useState('Thai Kedmanee');
  const [oobeUser, setOobeUser] = useState('');

  // ติดตามสถานะความคืบหน้าการเขียนไฟล์ติดตั้งวินโดวส์ลงในดิสก์
  useEffect(() => {
    let interval;
    if (setupStep === 'progress') {
      interval = setInterval(() => {
        setOsInstallProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            showNotification("ขยายไฟล์ติดตั้งสำเร็จ! กำลังเข้าสู่การบูตเข้าตั้งค่า OOBE", "success");
            setSetupStep('oobe_region');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [setupStep]);

  const handleResetOSSimulator = () => {
    setInstallPhase('power_off');
    setBiosBoot(null);
    setSetupStep('lang');
    setLicenseAccept(false);
    setPartitions([
      { id: 1, name: 'Drive 0 Partition 1: System Reserved', sizeGB: 0.5, type: 'System', freeGB: 0.1 },
      { id: 2, name: 'Drive 0 Partition 2: System C:', sizeGB: 119.5, type: 'Primary', freeGB: 12.0 },
      { id: 3, name: 'Drive 0 Partition 3: Recovery', sizeGB: 1.5, type: 'Recovery', freeGB: 0.2 },
    ]);
    setSelectedPartId(null);
    setOsInstallProgress(0);
    setOobeUser('');
    showNotification("รีเซ็ตระบบบูตคอมพิวเตอร์เรียบร้อยแล้ว", "info");
  };

  const handlePartitionDelete = () => {
    if (selectedPartId === null) {
      showNotification("โปรดเลือกพาร์ติชันในลิสต์ก่อนกดลบ!", "warning");
      return;
    }
    const target = partitions.find(p => p.id === selectedPartId);
    const remaining = partitions.filter(p => p.id !== selectedPartId);
    const unallocated = remaining.find(p => p.type === 'Unallocated');
    if (unallocated) {
      unallocated.sizeGB += target.sizeGB;
      unallocated.freeGB += target.sizeGB;
    } else {
      remaining.push({
        id: 99,
        name: 'Drive 0 Unallocated Space',
        sizeGB: target.sizeGB,
        type: 'Unallocated',
        freeGB: target.sizeGB
      });
    }
    setPartitions(remaining);
    setSelectedPartId(null);
    showNotification(`ลบพาร์ติชัน ${target.name} สำเร็จ`, "success");
  };

  const handlePartitionFormat = () => {
    if (selectedPartId === null) {
      showNotification("โปรดเลือกพาร์ติชันระบบเพื่อฟอร์แมต!", "warning");
      return;
    }
    const updated = partitions.map(p => {
      if (p.id === selectedPartId) {
        if (p.type === 'Unallocated') {
          showNotification("พื้นที่ว่างดิสก์ยังไม่ได้แบ่งส่วนลงไฟล์ระบบฟอร์แมตไม่ได้ ต้องสร้างพาร์ติชันก่อน!", "warning");
          return p;
        }
        showNotification(`ฟอร์แมตข้อมูลใน ${p.name} เรียบร้อยแล้ว`, "success");
        return { ...p, freeGB: p.sizeGB };
      }
      return p;
    });
    setPartitions(updated);
  };

  const handlePartitionNew = () => {
    const unallocated = partitions.find(p => p.type === 'Unallocated');
    if (!unallocated) {
      showNotification("ไม่มี Unallocated Space ว่างสำหรับจัดพาร์ติชันเพิ่มเติม ให้ลบไดรฟ์เก่าทิ้งก่อน!", "warning");
      return;
    }
    const remaining = partitions.filter(p => p.type !== 'Unallocated');
    const newId = Date.now();
    remaining.push({
      id: newId,
      name: `Drive 0 Partition ${remaining.length + 1}`,
      sizeGB: unallocated.sizeGB,
      type: 'Primary',
      freeGB: unallocated.sizeGB
    });
    setPartitions(remaining);
    setSelectedPartId(newId);
    showNotification("แบ่งพื้นที่ดิสก์ใหม่ขนาดเต็มพาร์ติชันเรียบร้อย", "success");
  };

  /* ── STATE: Simulator 3 - Device Drivers ────────────────────────── */
  const [devices, setDevices] = useState([
    { id: 'chipset', category: 'System devices', name: 'Intel PCI-LPC Controller', status: 'OK', statusText: 'This device is working properly.' },
    { id: 'vga', category: 'Display adapters', name: 'Microsoft Basic Display Adapter', status: 'WARNING', statusText: 'Basic display driver active. Install graphic driver for high resolution.', isTarget: true, icon: <Image className="w-4 h-4 text-amber-500" /> },
    { id: 'nic', category: 'Network adapters', name: 'Unknown Network Device', status: 'MISSING', statusText: 'Missing device driver.', isTarget: true, icon: <Wifi className="w-4 h-4 text-rose-500" /> },
    { id: 'sound', category: 'Sound controllers', name: 'Unknown Multimedia Audio Controller', status: 'MISSING', statusText: 'Missing driver.', isTarget: true, icon: <Volume2 className="w-4 h-4 text-rose-500" /> }
  ]);

  const [activeDevId, setActiveDevId] = useState(null);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [driverUpdating, setDriverUpdating] = useState({ active: false, progress: 0, targetId: null });

  useEffect(() => {
    let interval;
    if (driverUpdating.active) {
      interval = setInterval(() => {
        setDriverUpdating(prev => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            setDevices(list => list.map(dev => {
              if (dev.id === prev.targetId) {
                let verifiedName = dev.name;
                if (dev.id === 'vga') verifiedName = 'NVIDIA GeForce RTX 3060 GPU';
                if (dev.id === 'nic') verifiedName = 'Intel(R) Wi-Fi 6 AX201 Controller';
                if (dev.id === 'sound') verifiedName = 'Realtek High Definition Audio Device';

                return {
                  ...dev,
                  name: verifiedName,
                  status: 'OK',
                  statusText: 'This device is working properly.',
                  icon: dev.id === 'vga' ? <Image className="w-4 h-4 text-emerald-500" /> :
                        dev.id === 'nic' ? <Wifi className="w-4 h-4 text-emerald-500" /> :
                        <Volume2 className="w-4 h-4 text-emerald-500" />
                };
              }
              return dev;
            }));
            showNotification("ติดตั้งอัปเดตไดรเวอร์เสร็จเรียบร้อย!", "success");
            setPropertiesOpen(false);
            return { active: false, progress: 0, targetId: null };
          }
          return { ...prev, progress: prev.progress + 25 };
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [driverUpdating.active]);

  const triggerUpdateDriver = (id) => {
    setDriverUpdating({ active: true, progress: 0, targetId: id });
  };

  const currentDevice = devices.find(d => d.id === activeDevId);
  const allDriversInstalled = devices.every(d => d.status === 'OK');

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-teal-200 selection:text-teal-900">
      {/* Layer 1: Ambient Background */}
      <AmbientBackdrop blobs={IT3_UNIFIED_BLOBS} />

      {/* Simulated Toast Overlay */}
      {toast.show && (
        <div className="fixed top-24 right-6 z-50 transition-all duration-300 ease-out opacity-100 transform translate-y-0">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl ${
            toast.type === 'success' ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-300' :
            toast.type === 'warning' ? 'bg-amber-950/95 border-amber-500/50 text-amber-300' :
            'bg-slate-950/95 border-slate-800 text-slate-300'
          }`}>
            <div className="w-2.5 h-2.5 rounded-full bg-current animate-pulse"></div>
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Layer 3: Main Immersive Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ──────────── 1. SECTION: นิยาม OS ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              Operating System Core
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              บทบาทและหน้าที่ของระบบปฏิบัติการ (OS)
            </h3>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-8 border-l-[3.5px] border-l-teal-500 leading-relaxed">
            <p className="text-[16px] md:text-[17px] text-zinc-700">
              <span className="bg-teal-50/70 border border-teal-200/50 text-teal-700 text-[13.5px] font-bold px-2.5 py-1 rounded-lg mr-2 font-mono">
                Operating System (OS)
              </span>
              คือ <strong>ซอฟต์แวร์ระบบหลักที่ทำหน้าที่เป็นสื่อกลางแปลภาษา</strong> ระหว่างโครงสร้างฮาร์ดแวร์อิเล็กทรอนิกส์กับโปรแกรมประยุกต์และผู้ใช้งาน มีจุดมุ่งหมายหลักในการจัดสรรทรัพยากรระบบคอมพิวเตอร์อย่างราบรื่น ปลอดภัย และมีประสิทธิภาพสูงสุด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OS_ROLES.map((role, i) => (
              <RoleCard key={i} role={role} />
            ))}
          </div>
        </section>

        {/* ──────────── 2. SECTION: ประเภทของ OS ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              OS Classification
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ประเภทระบบปฏิบัติการในปัจจุบัน
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
            ในโลกคอมพิวเตอร์ปัจจุบัน ระบบปฏิบัติการหลักที่ทำงานบนคอมพิวเตอร์ส่วนบุคคล เวิร์กสเตชัน และเซิร์ฟเวอร์ แบ่งได้เป็น <strong>3 ค่ายยักษ์ใหญ่</strong> ซึ่งมีข้อดี เอกลักษณ์ และโครงสร้างระบบไฟล์ที่แตกต่างกันโดยสิ้นเชิง:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OS_TYPES.map((os) => (
              <div
                key={os.name}
                className={`bg-white/70 backdrop-blur-xl border ${OS_CARD_BORDER[os.color]} shadow-xl rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group`}
              >
                <div className={`${OS_HEADER_BG[os.color]} p-6 text-white relative`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full z-0 transition-transform group-hover:scale-110" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl transition-transform duration-350 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0 text-white">
                      {os.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black tracking-wide font-mono">{os.name}</h4>
                      <p className="text-white/80 text-[12.5px] font-medium">{os.developer}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5 text-sm text-zinc-650 relative z-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-bold tracking-wider">MARKET SHARE</span>
                      <span className="text-zinc-800 font-extrabold text-[15px] font-mono">{os.marketShare}</span>
                    </div>
                    <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-bold tracking-wider">LICENSE TYPE</span>
                      <span className="text-zinc-850 font-bold text-[13.5px] leading-tight">{os.license.split(' ')[0]}</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100 font-mono text-[12.5px] text-zinc-700 leading-relaxed">
                    <p>• <strong>GUI:</strong> {os.gui}</p>
                    <p>• <strong>CLI:</strong> {os.cli}</p>
                    <p>• <strong>File System:</strong> {os.fileSystem}</p>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-wider block mb-2">✦ จุดเด่นสำคัญ</span>
                      <ul className="space-y-2 text-[13px] leading-relaxed">
                        {os.strengths.map((s, j) => (
                          <li key={j} className="flex gap-2 items-start text-zinc-700">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <span className="text-[12px] font-bold text-rose-600 uppercase tracking-wider block mb-2">✦ ข้อจำกัด</span>
                      <ul className="space-y-2 text-[13px] leading-relaxed">
                        {os.weaknesses.map((w, j) => (
                          <li key={j} className="flex gap-2 items-start text-zinc-700">
                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── 3. SECTION: การเตรียมความพร้อมก่อนติดตั้ง ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-amber-600 tracking-wider uppercase">
              Deployment Preparation
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเตรียมความพร้อมและการสำรองข้อมูล (Backup)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
            ก่อนที่จะลงมือล้างฮาร์ดดิสก์เพื่อเขียนระบบปฏิบัติการใหม่ นักปฏิบัติการไอทีจำเป็นต้องวางกลยุทธ์การจัดเก็บข้อมูลให้ปลอดภัยตามมาตรฐานสากล <strong>3-2-1 Backup Rule</strong> และตรวจสอบเกณฑ์ขั้นต่ำของคอมพิวเตอร์เป้าหมาย:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Database className="w-6 h-6" />,
                title: '3 ชุด: สำเนาหลัก + สำรอง 2',
                text: 'เก็บไฟล์ข้อมูลตัวจริง 1 ชุด และสำเนาสำรองก๊อปปี้กระจายแยกไว้อีกอย่างน้อย 2 ชุดเพื่อป้องกันกรณีสื่อบันทึกหลักชำรุดเสียหาย'
              },
              {
                icon: <Save className="w-6 h-6" />,
                title: '2 สื่อ: ลงในสื่อ 2 ประเภท',
                text: 'บันทึกไฟล์ลงบนสื่อเก็บข้อมูลประเภทที่แตกต่างกันเพื่อลดความเสี่ยงเชิงฮาร์ดแวร์ เช่น ใน Internal Drive ของ PC และสำรองลง External SSD แยก'
              },
              {
                icon: <Server className="w-6 h-6" />,
                title: '1 สถานที่: ไดรฟ์นอกสถานที่ 1 ชุด',
                text: 'ฝากส่งไฟล์สำรองสำคัญไปเก็บไว้คนละสถานที่ทางกายภาพ หรือฝากไว้ใน Cloud Storage (Google Drive, OneDrive) ป้องกันภัยพิบัติหรือเครื่องสูญหาย'
              }
            ].map((card, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
                <div className="p-3.5 bg-amber-50 text-amber-700 w-fit rounded-2xl mb-4 group-hover:scale-105 group-hover:rotate-3 transition-all">
                  {card.icon}
                </div>
                <h4 className="font-bold text-zinc-900 text-base mb-2">{card.title}</h4>
                <p className="text-zinc-600 text-[13.5px] leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Specs Check Windows 10 */}
            <div className="bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-xl rounded-[2rem] p-7 border-l-[3.5px] border-l-cyan-500">
              <h4 className="font-bold text-zinc-900 text-lg mb-3">เกณฑ์ฮาร์ดแวร์ขั้นต่ำ Windows 10</h4>
              <ul className="space-y-3 text-[14.5px] text-zinc-600">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-cyan-500 mt-1 shrink-0" /><span><strong>CPU:</strong> 1 GHz หรือเร็วกว่าชนิดสถาปัตยกรรม 64-bit</span></li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-cyan-500 mt-1 shrink-0" /><span><strong>RAM:</strong> 2 GB ขึ้นไป</span></li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-cyan-500 mt-1 shrink-0" /><span><strong>Storage:</strong> พื้นที่ว่างของดิสก์อย่างน้อย 20 GB</span></li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-cyan-500 mt-1 shrink-0" /><span><strong>Firmware:</strong> รองรับ Legacy BIOS / UEFI</span></li>
              </ul>
            </div>
            {/* Specs Check Windows 11 */}
            <div className="bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-xl rounded-[2rem] p-7 border-l-[3.5px] border-l-indigo-500">
              <h4 className="font-bold text-zinc-900 text-lg mb-3">เกณฑ์ฮาร์ดแวร์ขั้นต่ำ Windows 11</h4>
              <ul className="space-y-3 text-[14.5px] text-zinc-600">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-indigo-500 mt-1 shrink-0" /><span><strong>CPU:</strong> 1 GHz 2 Cores 64-bit (Gen 8 ขึ้นไป)</span></li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-indigo-500 mt-1 shrink-0" /><span><strong>RAM:</strong> 4 GB ขึ้นไป</span></li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-indigo-500 mt-1 shrink-0" /><span><strong>Storage:</strong> พื้นที่ไดรฟ์ว่างขั้นต่ำ 64 GB</span></li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-indigo-500 mt-1 shrink-0" /><span><strong>Security:</strong> ต้องมี <span className="bg-indigo-50/80 text-indigo-700 text-xs px-2 py-0.5 rounded font-bold border border-indigo-200">TPM 2.0</span> และเปิดใช้งาน Secure Boot</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ──────────── 4. SECTION: Rufus Simulator ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              Rufus Media Creator
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสร้างตัวติดตั้งระบบปฏิบัติการ (Bootable USB) ผ่าน Rufus
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
            หัวใจหลักในการเตรียมแฟลชไดรฟ์สำหรับติดตั้งคือการทำความเข้าใจ <strong>Partition Schemes (GPT/MBR)</strong> และ <strong>File Systems (FAT32/NTFS)</strong> ให้แมปเข้ากับข้อกำหนดความเข้ากันได้ของเมนบอร์ด ลองจำลองตั้งค่าใน Rufus ด้านล่าง:
          </p>

          <SimulatorShell
            dark
            icon={<Usb className="w-6 h-6" />}
            title="Rufus Bootable USB Writer [ระบบจำลองการสร้างสื่อติดตั้ง]"
            glowColors="from-sky-500/15 to-blue-500/10"
            iconColor="text-blue-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              
              {/* Rufus Controller Panel */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative z-10">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROL PANEL
                </span>
                <h4 className="text-xs font-bold text-slate-200 mb-4 border-b border-white/5 pb-2">Rufus Settings</h4>
                
                <div className="space-y-4 text-xs">
                  {/* Device Select */}
                  <div>
                    <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">1. Device</label>
                    <select 
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg cursor-pointer focus:outline-none focus:border-indigo-500"
                      value={rufusState.device}
                      onChange={(e) => setRufusState({ ...rufusState, device: e.target.value })}
                      disabled={rufusState.status === 'WRITING'}
                    >
                      <option value="USB_DRIVE_16GB (E:)">USB_DRIVE_16GB (E:) [Kingston 14.8 GB]</option>
                      <option value="EXTERNAL_STORAGE (F:)">EXTERNAL_STORAGE (F:) [Transcend 931 GB]</option>
                    </select>
                  </div>

                  {/* ISO select */}
                  <div>
                    <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">2. ISO File Selection</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        className="flex-1 p-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-400 font-mono text-[10.5px]" 
                        value={rufusState.isoSelected ? "Win10_22H2_English_x64.iso" : "No ISO file selected..."} 
                      />
                      <button 
                        onClick={() => {
                          setRufusState({ ...rufusState, isoSelected: true });
                          showNotification("นำเข้าไฟล์อิมเมจ Windows 10.iso เรียบร้อย", "success");
                        }}
                        disabled={rufusState.status === 'WRITING'}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border cursor-pointer shrink-0 ${
                          rufusState.isoSelected 
                            ? 'bg-emerald-950 border-emerald-500/30 text-emerald-400' 
                            : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500'
                        }`}
                      >
                        {rufusState.isoSelected ? "LOADED" : "SELECT ISO"}
                      </button>
                    </div>
                  </div>

                  {/* Partition & Target System */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">3. Partition Scheme</label>
                      <select 
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg cursor-pointer focus:outline-none focus:border-indigo-500"
                        value={rufusState.partitionScheme}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRufusState({
                            ...rufusState,
                            partitionScheme: val,
                            targetSystem: val === 'GPT' ? 'UEFI (non CSM)' : 'BIOS (or UEFI-CSM)'
                          });
                        }}
                        disabled={rufusState.status === 'WRITING'}
                      >
                        <option value="GPT">GPT</option>
                        <option value="MBR">MBR</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">4. Target System</label>
                      <input 
                        type="text" 
                        readOnly 
                        className="w-full p-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-400 font-mono text-[10.5px]" 
                        value={rufusState.targetSystem} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rufus Visual Status Screen */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl flex flex-col justify-between min-h-[300px] relative z-10">
                <span className="text-[9px] font-mono text-slate-500 font-bold tracking-widest uppercase mb-3">Writer Status output</span>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  {rufusState.status === 'READY_TO_START' && (
                    <div className="space-y-3">
                      <HelpCircle className="w-12 h-12 text-slate-500 mx-auto animate-pulse" />
                      <h5 className="text-slate-300 font-bold text-sm">รอกำหนดพารามิเตอร์ซอฟต์แวร์</h5>
                      <p className="text-[11.5px] text-slate-500 max-w-xs leading-relaxed">
                        เลือกไฟล์ระบบ Windows 10 ISO ด้านซ้าย แล้วคลิกเริ่มเขียนเพื่อบันทึกไฟล์บูตลง Kingston USB
                      </p>
                    </div>
                  )}

                  {rufusState.status === 'WRITING' && (
                    <div className="space-y-4 w-full max-w-xs">
                      <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                      <div>
                        <h5 className="text-slate-200 font-bold text-sm">กำลังคัดลอกไฟล์และแบ่งส่วนดิสก์ลง USB...</h5>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">
                          Target File System: {rufusState.partitionScheme === 'GPT' ? 'NTFS/exFAT (UEFI Mode)' : 'NTFS/FAT32 (Legacy Mode)'}
                        </p>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700 shadow-inner">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300" style={{ width: `${rufusState.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-indigo-400 font-mono font-bold">{rufusState.progress}%</span>
                    </div>
                  )}

                  {rufusState.status === 'COMPLETED' && (
                    <div className="space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h5 className="text-slate-100 font-bold text-sm">การเขียนแผ่นบูตสำเร็จเสร็จสิ้น!</h5>
                      <p className="text-[12px] text-slate-400 max-w-xs leading-relaxed">
                        Kingston USB ในพาร์ติชันดิสก์แบบ {rufusState.partitionScheme} บูตพร้อมใช้งานสำหรับขั้นตอนถัดไปแล้ว
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
                  <button
                    onClick={handleResetRufus}
                    disabled={rufusState.status === 'WRITING'}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer font-bold font-mono"
                  >
                    Reset Form
                  </button>
                  <button
                    onClick={handleStartRufus}
                    disabled={rufusState.status === 'WRITING' || rufusState.status === 'COMPLETED'}
                    className={`px-6 py-2 font-bold rounded-lg text-white shadow-lg cursor-pointer transition-all ${
                      rufusState.status === 'WRITING' || rufusState.status === 'COMPLETED'
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800'
                        : 'bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] border border-indigo-500'
                    }`}
                  >
                    {rufusState.status === 'WRITING' ? 'WRITING...' : 'START'}
                  </button>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ──────────── 5. SECTION: ขั้นตอนการตั้งค่าติดตั้ง ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-amber-650 tracking-wider uppercase">
              OS Deployment Steps
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ขั้นตอนการติดตั้งระบบปฏิบัติการในหน้างานจริง
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed">
            เมื่อนำสื่อบันทึก Kingston USB บูตระบบไปเสียบต่อคอมพิวเตอร์เป้าหมาย นักเรียนจะต้องกดปุ่มลัดเพื่อเลือก <strong>Boot Priority</strong> ในเมนู BIOS/UEFI แล้วเข้าสู่ Windows Installer เพื่อลบพาร์ติชันดิสก์เดิม ฟอร์แมตใหม่ และกำหนดตัวตนผู้ใช้งานใน OOBE:
          </p>
        </section>

        {/* ──────────── 6. SECTION: BIOS + Windows Setup Simulator ──────────── */}
        <section className="space-y-6">
          <SimulatorShell
            dark
            icon={<Monitor className="w-6 h-6" />}
            title="BIOS Boot & Windows Setup Wizard [ตัวจำลองการประมวลผลการติดตั้ง]"
            glowColors="from-amber-600/15 to-orange-500/10"
            iconColor="text-amber-400"
          >
            <div className="flex justify-between items-center mb-4 text-xs font-mono relative z-10">
              <span className="text-slate-400">
                Phase: <strong className="text-amber-400">{installPhase.toUpperCase()}</strong>
              </span>
              <button
                onClick={handleResetOSSimulator}
                className="text-xs bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Reset PC Screen
              </button>
            </div>

            {/* Simulated monitor frame */}
            <div className="bg-slate-950 rounded-[2.5rem] border-4 border-slate-800 overflow-hidden shadow-2xl min-h-[460px] flex items-center justify-center p-6 relative">
              {/* Scanline CRT overlay */}
              <div className="bg-[linear-gradient(rgba(18,16,28,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,6px_100%] z-30 pointer-events-none absolute inset-0" />
              
              <span className="text-[9px] font-mono text-slate-700 absolute top-4 left-4 select-none">
                SIMULATED PC MONITOR
              </span>

              {/* PHASE: power_off */}
              {installPhase === 'power_off' && (
                <div className="text-center space-y-5 relative z-10">
                  <div className="p-6 bg-slate-900 border border-slate-800 rounded-full inline-block">
                    <Power className="w-12 h-12 text-rose-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-slate-200 font-bold text-sm">ระบบคอมพิวเตอร์ไม่มีกระแสไฟเข้า (Off-State)</h4>
                    <p className="text-[11.5px] text-slate-500 max-w-sm mt-1 leading-relaxed">
                      กดปุ่มสวิตช์เครื่องด้านล่าง จากนั้นเตรียมกดปุ่มลัดเรียกบูตเมนู F12 บนคีย์บอร์ดจำลอง
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (rufusState.status !== 'COMPLETED') {
                        showNotification("คำแนะนำ: ควรเขียนแผ่น Bootable USB ในโปรแกรม Rufus จำลองด้านบนให้สำเร็จ 100% ก่อนนะครับ!", "warning");
                      }
                      setInstallPhase('post_screen');
                      showNotification("คอมพิวเตอร์กำลัง POST เมนบอร์ด...", "info");
                    }}
                    className="bg-rose-600 hover:bg-rose-500 hover:scale-[1.02] text-white font-bold text-xs py-2.5 px-6 rounded-lg flex items-center gap-2 mx-auto transition-all cursor-pointer shadow-lg shadow-rose-950/20"
                  >
                    <Power className="w-4 h-4" /> เปิดสวิตช์เครื่อง (Power On)
                  </button>
                </div>
              )}

              {/* PHASE: post_screen */}
              {installPhase === 'post_screen' && (
                <div className="text-center space-y-6 py-4 relative z-10">
                  <div className="text-slate-500 text-3xl font-black tracking-widest font-mono select-none">
                    PRO MOTHERBOARD
                  </div>
                  <div className="space-y-4 font-mono">
                    <p className="text-amber-500 text-xs tracking-wider animate-pulse font-bold">
                      [ ตรวจพบสื่อติดตั้งภายนอก — กดปุ่มลัด [ F12 ] เพื่อเข้าสู่ตัวจัดการบูต ]
                    </p>
                    <button
                      onClick={() => {
                        setInstallPhase('bios_bootmenu');
                        showNotification("ดึงหน้าจอ Boot Menu สำเร็จ", "success");
                      }}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                    >
                      กดปุ่มคีย์ [ F12 ]
                    </button>
                  </div>
                  <span className="text-[9px] text-slate-650 font-mono block select-none">UEFI Setup Utility v2.30 - AMI Firmware</span>
                </div>
              )}

              {/* PHASE: bios_bootmenu */}
              {installPhase === 'bios_bootmenu' && (
                <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono p-5 rounded-xl flex flex-col justify-between text-xs min-h-[300px] relative z-10">
                  <div>
                    <div className="border-b border-zinc-800 pb-2 mb-4 flex justify-between items-center text-[10px] font-bold">
                      <span className="text-amber-500">▲ SYSTEM BOOT MENU DIRECTORY</span>
                      <span className="text-zinc-650">UEFI BOOT SETUP</span>
                    </div>
                    <p className="text-zinc-400 mb-3 text-[11.5px]">เลือกไดรฟ์ระบบหลักสำหรับการดึงข้อมูลติดตั้ง OS:</p>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setBiosBoot('ssd');
                          showNotification("คุณเลือก SSD ระบบจะเข้าระบบ Windows ตัวเดิมที่เกิดความเสียหาย ไม่เข้าหน้าลงใหม่", "warning");
                        }}
                        className={`w-full p-3 rounded-lg border text-[11.5px] flex justify-between items-center cursor-pointer transition-all ${
                          biosBoot === 'ssd' ? 'bg-zinc-900 border-rose-500 text-rose-450 font-bold' : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-900 text-zinc-450'
                        }`}
                      >
                        <span className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-slate-500" /> SSD P0: NVMe Sabrent 500GB</span>
                        <span className="text-[9.5px] text-rose-500">(Windows เดิมเสียหาย)</span>
                      </button>

                      <button
                        onClick={() => {
                          setBiosBoot('usb');
                          showNotification("เลือกบูตผ่าน Kingston USB แฟลชไดรฟ์สำเร็จ", "success");
                        }}
                        className={`w-full p-3 rounded-lg border text-[11.5px] flex justify-between items-center cursor-pointer transition-all ${
                          biosBoot === 'usb' ? 'bg-zinc-900 border-indigo-500 text-indigo-400 font-bold shadow-md shadow-indigo-950/20' : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-900 border-dashed animate-pulse text-indigo-200'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Usb className="w-4 h-4 text-indigo-400" /> UEFI: Kingston DataTraveler 16GB</span>
                        <span className="text-[9.5px] text-indigo-400 font-bold">(Rufus USB Creator)</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-between items-center text-[9.5px] text-zinc-550">
                    <span>ใช้เมาส์คลิกเพื่อเลือกและดำเนินการบูต</span>
                    {biosBoot === 'usb' ? (
                      <button
                        onClick={() => {
                          setInstallPhase('os_installer');
                          setSetupStep('lang');
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                      >
                        BOOT COMPILER <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : biosBoot === 'ssd' ? (
                      <span className="text-rose-500 font-sans font-bold">⚠️ แฟลชไดรฟ์ Kingston USB เป็นอุปกรณ์เป้าหมายของวิชา</span>
                    ) : null}
                  </div>
                </div>
              )}

              {/* PHASE: os_installer */}
              {installPhase === 'os_installer' && (
                <div className="w-full max-w-lg aspect-video bg-gradient-to-b from-[#1c1840] via-[#09152a] to-[#010e1a] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between select-none text-xs text-slate-200 relative z-10 shadow-2xl">
                  <div className="flex justify-between items-center border-b border-indigo-950/40 pb-2 text-[10px] text-indigo-300/60 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="grid grid-cols-2 gap-0.5 w-3 h-3 text-white transform -skew-y-12">
                        <div className="bg-cyan-500 w-1 h-1"></div>
                        <div className="bg-cyan-500 w-1 h-1"></div>
                        <div className="bg-cyan-500 w-1 h-1"></div>
                        <div className="bg-cyan-500 w-1 h-1"></div>
                      </div>
                      <span className="font-semibold text-slate-350">Windows Setup</span>
                    </div>
                    <span className="font-bold text-cyan-400 uppercase tracking-widest text-[8px]">OS Installer Wizard</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center p-2">
                    
                    {/* Setup step: lang */}
                    {setupStep === 'lang' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3">
                        <h5 className="font-bold text-indigo-950 border-b border-slate-200 pb-1.5 flex items-center gap-1.5"><Monitor className="w-4 h-4 text-indigo-650" /> Windows Install</h5>
                        <div className="space-y-2 text-[11px] text-slate-650">
                          <div className="flex justify-between border-b border-slate-100 pb-1">
                            <span>Language:</span>
                            <span className="font-semibold text-slate-800">English (US)</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-1">
                            <span>Time format:</span>
                            <span className="font-semibold text-slate-800">Thai (Thailand)</span>
                          </div>
                          <div className="flex justify-between pb-1">
                            <span>Keyboard:</span>
                            <span className="font-semibold text-slate-800">Thai Kedmanee</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSetupStep('install_now')}
                          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1.5 px-4 rounded-lg mt-2 border border-blue-800 cursor-pointer self-end transition-all"
                        >
                          Next
                        </button>
                      </div>
                    )}

                    {/* Setup step: install_now */}
                    {setupStep === 'install_now' && (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-2 gap-0.5 w-10 h-10 mx-auto text-white transform -skew-y-12">
                          <div className="bg-cyan-500 w-4 h-4"></div>
                          <div className="bg-cyan-500 w-4 h-4"></div>
                          <div className="bg-cyan-500 w-4 h-4"></div>
                          <div className="bg-cyan-500 w-4 h-4"></div>
                        </div>
                        <button
                          onClick={() => setSetupStep('activate_key')}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-750 hover:to-indigo-750 border border-blue-500 text-white font-bold py-2.5 px-8 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105"
                        >
                          Install Now
                        </button>
                      </div>
                    )}

                    {/* Setup step: activate_key */}
                    {setupStep === 'activate_key' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-2.5">
                        <h5 className="font-bold text-indigo-950">Activate Windows</h5>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          กรอกรหัส Product Key ลิขสิทธิ์ หรือข้ามเพื่อทำขั้นตอนตั้งค่าต่อไป
                        </p>
                        <input type="text" placeholder="รหัสคีย์ 25 หลัก..." disabled className="w-full p-2 bg-slate-200/50 border border-slate-300 rounded text-center text-xs" />
                        <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-2 text-[10.5px]">
                          <button onClick={() => setSetupStep('os_select')} className="text-blue-700 hover:underline cursor-pointer font-bold">I don't have a product key</button>
                          <button onClick={() => setSetupStep('os_select')} className="bg-blue-700 text-white font-bold py-1 px-4 rounded border border-blue-800 cursor-pointer transition-all hover:bg-blue-800">Next</button>
                        </div>
                      </div>
                    )}

                    {/* Setup step: os_select */}
                    {setupStep === 'os_select' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3">
                        <h5 className="font-bold text-indigo-950">Select Operating System</h5>
                        <div className="bg-white border rounded-lg divide-y max-h-24 overflow-y-auto font-mono text-[10.5px] border-slate-200 shadow-inner">
                          {['Windows 10 Home', 'Windows 10 Pro'].map(os => (
                            <div 
                              key={os}
                              onClick={() => setTargetOS(os)}
                              className={`p-2.5 cursor-pointer flex items-center justify-between transition-all ${
                                targetOS === os ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-50 text-indigo-950'
                              }`}
                            >
                              <span>{os}</span>
                              {targetOS === os && <Check className="w-3.5 h-3.5" />}
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setSetupStep('license')} className="bg-blue-700 text-white font-bold py-1.5 px-5 rounded-lg border border-blue-800 cursor-pointer self-end transition-all hover:bg-blue-800">Next</button>
                      </div>
                    )}

                    {/* Setup step: license */}
                    {setupStep === 'license' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3">
                        <h5 className="font-bold text-indigo-950">Notices and License Terms</h5>
                        <div className="bg-white border border-slate-200 p-2.5 rounded-lg max-h-20 overflow-y-auto text-[9.5px] text-slate-500 leading-relaxed font-mono shadow-inner">
                          MICROSOFT SOFTWARE LICENSE TERMS<br/>เงื่อนไขความเป็นส่วนตัวและการยอมรับสิทธิ์ในการติดตั้งระบบ Windows 10
                        </div>
                        <label className="flex items-center gap-2.5 cursor-pointer text-[10.5px] font-medium py-1">
                          <input type="checkbox" checked={licenseAccept} onChange={(e) => setLicenseAccept(e.target.checked)} className="w-4 h-4 cursor-pointer accent-blue-700" />
                          <span>I accept the license terms</span>
                        </label>
                        <button
                          onClick={() => {
                            if (!licenseAccept) {
                              showNotification("กรุณายอมรับเงื่อนไขสิทธิ์การอนุญาตก่อน!", "warning");
                              return;
                            }
                            setSetupStep('type_select');
                          }}
                          className={`font-bold py-1.5 px-5 rounded-lg border cursor-pointer self-end transition-all ${
                            licenseAccept 
                              ? 'bg-blue-700 border-blue-800 text-white hover:bg-blue-800 hover:scale-[1.02]' 
                              : 'bg-slate-300 border-slate-400 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    )}

                    {/* Setup step: type_select */}
                    {setupStep === 'type_select' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3">
                        <h5 className="font-bold text-indigo-950 text-[11px] border-b pb-1">Choose Installation Type</h5>
                        <div className="space-y-2 text-[10px]">
                          <div onClick={() => showNotification("สำหรับการลง Windows แบบสะอาด แนะนำให้กดเลือก Custom (ล้างพาร์ติชัน) นะครับ", "warning")} className="bg-white border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                            <strong className="text-blue-700 block">Upgrade: Install Windows and keep files</strong>
                            <span className="text-slate-500 mt-0.5 block">อัปเกรดระบบปฏิบัติการโดยไม่ลบระบบไฟล์เดิม</span>
                          </div>
                          <div onClick={() => setSetupStep('partitioning')} className="bg-white border border-indigo-200 p-2.5 rounded-lg cursor-pointer hover:bg-indigo-50/70 transition-colors shadow-sm">
                            <strong className="text-indigo-700 block">Custom: Install Windows only (advanced)</strong>
                            <span className="text-slate-500 mt-0.5 block">ล้างพาร์ติชันดิสก์เก่าออกเพื่อติดตั้งแบบ Clean Install</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Setup step: partitioning */}
                    {setupStep === 'partitioning' && (
                      <div className="w-full max-w-md bg-[#e9e9f0] text-slate-800 rounded-xl p-3.5 shadow-xl border border-slate-300 flex flex-col justify-between text-[10px]">
                        <div>
                          <h5 className="font-bold text-indigo-950 mb-1">Where do you want to install Windows?</h5>
                          <p className="text-slate-500 text-[9px] mb-2 leading-relaxed font-sans">
                            คลิกเลือกพาร์ติชัน <strong>Drive 0 Partition 2 (System C:)</strong> แล้วกด <strong>Format</strong> ก่อนกดปุ่ม Next
                          </p>

                          <div className="bg-white border rounded-lg border-slate-200 max-h-24 overflow-y-auto mb-2.5 font-mono shadow-inner">
                            {partitions.map((part) => (
                              <div
                                key={part.id}
                                onClick={() => setSelectedPartId(part.id)}
                                className={`p-2 border-b last:border-0 cursor-pointer flex justify-between items-center transition-colors ${
                                  selectedPartId === part.id ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-50 text-indigo-950'
                                }`}
                              >
                                <span>{part.name}</span>
                                <span className="text-[9px]">Cap: {part.sizeGB}GB | Free: {part.freeGB.toFixed(1)}GB</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 justify-end mb-2.5 border-b border-slate-200 pb-2.5">
                            <button onClick={handlePartitionDelete} className="flex items-center gap-1.5 bg-white hover:bg-rose-50 border border-slate-300 hover:border-rose-350 rounded-lg px-2.5 py-1 text-rose-600 font-bold cursor-pointer transition-colors shadow-sm"><Trash2 className="w-3.5 h-3.5 font-bold" /> Delete</button>
                            <button onClick={handlePartitionFormat} className="flex items-center gap-1.5 bg-white hover:bg-amber-50 border border-slate-300 hover:border-amber-350 rounded-lg px-2.5 py-1 text-amber-600 font-bold cursor-pointer transition-colors shadow-sm"><RefreshCw className="w-3.5 h-3.5 font-bold" /> Format</button>
                            <button onClick={handlePartitionNew} className="flex items-center gap-1.5 bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-350 rounded-lg px-2.5 py-1 text-indigo-650 font-bold cursor-pointer transition-colors shadow-sm"><Plus className="w-3.5 h-3.5 font-bold" /> New</button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <span className="text-slate-500 font-bold text-[9px] uppercase tracking-wide">Target disk location</span>
                          <button
                            onClick={() => {
                              if (selectedPartId === null) {
                                showNotification("โปรดเลือกพื้นที่ติดตั้งข้อมูลไดรฟ์ C: ก่อนรันไฟล์!", "warning");
                                return;
                              }
                              const current = partitions.find(p => p.id === selectedPartId);
                              if (current.freeGB < current.sizeGB - 1 && current.type !== 'Unallocated') {
                                showNotification("คำแนะนำ: แนะนำให้คลิก Format ไดรฟ์เพื่อล้างไฟล์ระบบเก่าก่อนรันระบบใหม่ครับ!", "warning");
                                return;
                              }
                              setSetupStep('progress');
                            }}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1.5 px-4 rounded-lg border border-blue-800 cursor-pointer transition-all hover:scale-[1.02]"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Setup step: progress */}
                    {setupStep === 'progress' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3.5">
                        <h5 className="font-bold text-indigo-950">Installing Windows 10...</h5>
                        <div className="space-y-2 text-[10px] font-mono text-slate-650">
                          <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 font-bold" /> Copying Windows files (100%)</p>
                          <p className="flex items-center gap-2">
                            {osInstallProgress >= 100 ? (
                              <Check className="w-4 h-4 text-emerald-600 font-bold" />
                            ) : (
                              <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                            )}
                            <span>Getting files ready for installation ({osInstallProgress}%)</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Setup step: oobe_region */}
                    {setupStep === 'oobe_region' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3 text-center">
                        <h5 className="font-bold text-indigo-950 text-[11px] leading-snug">Let's start with region. Is this correct?</h5>
                        <div className="bg-white border border-slate-200 rounded-lg divide-y max-h-24 overflow-y-auto w-full text-[10.5px] shadow-inner">
                          {['United States', 'Thailand', 'Singapore'].map(reg => (
                            <div 
                              key={reg} 
                              onClick={() => setOobeRegion(reg)}
                              className={`p-2 text-left cursor-pointer transition-colors ${
                                oobeRegion === reg ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-50 text-indigo-950'
                              }`}
                            >
                              {reg}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            if (oobeRegion !== 'Thailand') showNotification("แนะนำให้เลือกประเทศเป็น Thailand สำหรับการสาธิตนะครับ", "info");
                            setSetupStep('oobe_keyboard');
                          }}
                          className="bg-blue-700 text-white py-1.5 px-5 rounded-lg border border-blue-800 hover:bg-blue-800 cursor-pointer self-center transition-all font-bold"
                        >
                          Yes
                        </button>
                      </div>
                    )}

                    {/* Setup step: oobe_keyboard */}
                    {setupStep === 'oobe_keyboard' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3 text-center">
                        <h5 className="font-bold text-indigo-950 text-[11px] leading-snug">Is this the right keyboard layout?</h5>
                        <div className="bg-white border border-slate-200 rounded-lg divide-y max-h-20 overflow-y-auto w-full text-[10.5px] shadow-inner">
                          {['US Keyboard', 'Thai Kedmanee'].map(kbd => (
                            <div 
                              key={kbd} 
                              onClick={() => setOobeKbd(kbd)}
                              className={`p-2 text-left cursor-pointer transition-colors ${
                                oobeKbd === kbd ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-50 text-indigo-950'
                              }`}
                            >
                              {kbd}
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setSetupStep('oobe_account')} className="bg-blue-700 text-white py-1.5 px-5 rounded-lg border border-blue-800 hover:bg-blue-800 cursor-pointer self-center transition-all font-bold">Yes</button>
                      </div>
                    )}

                    {/* Setup step: oobe_account */}
                    {setupStep === 'oobe_account' && (
                      <div className="w-full max-w-xs bg-[#e9e9f0] text-slate-800 rounded-xl p-4 shadow-xl border border-slate-300 flex flex-col gap-3">
                        <h5 className="font-bold text-indigo-950 text-center text-[11px]">Who is going to use this PC?</h5>
                        <input 
                          type="text" 
                          placeholder="พิมพ์ชื่อบัญชีคอมพิวเตอร์ของคุณ..." 
                          value={oobeUser} 
                          onChange={(e) => setOobeUser(e.target.value)} 
                          className="p-2 border border-slate-300 rounded-lg bg-white text-center font-bold text-slate-800 text-xs focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => {
                            if (!oobeUser.trim()) {
                              showNotification("กรุณากรอก Username บัญชีระบบด้วยครับ!", "warning");
                              return;
                            }
                            setSetupStep('win_desktop');
                          }}
                          className="bg-blue-750 text-white py-1.5 px-6 rounded-lg border border-blue-800 hover:bg-blue-800 cursor-pointer self-center transition-all font-bold"
                        >
                          Next
                        </button>
                      </div>
                    )}

                    {/* Setup step: win_desktop */}
                    {setupStep === 'win_desktop' && (
                      <div className="text-center space-y-4 py-4">
                        <div className="w-12 h-12 bg-emerald-950/70 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-slate-100 font-bold text-sm">Windows 10 ติดตั้งสำเร็จสมบูรณ์!</h4>
                          <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                            ระบบบันทึกโปรไฟล์ชื่อ <strong>{oobeUser}</strong> และเริ่มงานเดสก์ท็อปแล้ว ให้ก้าวไปจัดการลงไดรเวอร์ระบบในลำดับถัดไป
                          </p>
                        </div>
                      </div>
                    )}

                  </div>

                  <div className="border-t border-indigo-950/40 pt-2 text-[9px] text-indigo-300/40 font-mono flex justify-between select-none">
                    <span>Windows Installer v10.0.19045</span>
                    <span>© Microsoft Corporation. All rights reserved.</span>
                  </div>
                </div>
              )}

            </div>
          </SimulatorShell>
        </section>

        {/* ──────────── 7. SECTION: การตั้งค่าหลังติดตั้งและไดรเวอร์ ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-650 tracking-wider uppercase">
              Device Drivers & Systems
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การจัดการหลังติดตั้งและการจัดการไดรเวอร์ (Device Drivers)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed">
            หลังจากการติดตั้งระบบ OS เสร็จสิ้น อุปกรณ์ฮาร์ดแวร์ส่วนสำคัญมักจะทำงานได้เพียงแค่ฟังก์ชันพื้นฐาน ช่างเทคนิคจึงต้องนำเข้าโปรแกรมควบคุมเฉพาะตัวที่เรียกว่า <strong>Device Drivers</strong> เพื่อเป็นตัวช่วยแปลคำสั่งงานฮาร์ดแวร์เข้ากับระบบปฏิบัติการ โดยตรวจสอบความพร้อมผ่านระบบ <strong>Device Manager</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-7 border-l-[3.5px] border-l-teal-500">
              <h4 className="font-bold text-zinc-900 text-base mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />สัญลักษณ์ที่ต้องวิเคราะห์ใน Device Manager:</h4>
              <div className="space-y-4 text-[13.5px]">
                <div className="flex gap-3 items-start">
                  <span className="bg-amber-100 text-amber-850 font-bold px-2 py-0.5 rounded-lg text-xs shrink-0 h-6 flex items-center justify-center font-mono">⚠️</span>
                  <p className="text-zinc-650 leading-relaxed">
                    <strong>เครื่องหมายตกใจสีเหลือง:</strong> บ่งบอกว่าตรวจพบอุปกรณ์แต่อุปกรณ์ตัวนั้นมีไดรเวอร์ที่ไม่สมบูรณ์หรือเสียหาย ทำงานผิดพลาด
                  </p>
                </div>
                <div className="flex gap-3 items-start border-t border-slate-100 pt-3">
                  <span className="bg-rose-100 text-rose-850 font-bold px-2.5 py-0.5 rounded-lg text-xs shrink-0 h-6 flex items-center justify-center font-mono">?</span>
                  <p className="text-zinc-650 leading-relaxed">
                    <strong>Unknown Device (เครื่องหมายคำถาม):</strong> อุปกรณ์ขาดการเชื่อมไดรเวอร์อย่างสิ้นเชิง ส่งผลให้ระบบปฏิบัติการมองไม่เห็นรายละเอียดชื่อหรือแบรนด์
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-7 border-l-[3.5px] border-l-indigo-500">
              <h4 className="font-bold text-zinc-900 text-base mb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-indigo-500" />ลำดับความสำคัญในการติดตั้งไดรเวอร์:</h4>
              <ul className="space-y-3.5 text-[13.5px] text-zinc-650 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="bg-indigo-50 text-indigo-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  <span><strong>Chipset Driver:</strong> จำเป็นต้องลงเป็นอันดับแรกเพื่อให้สล็อตเชื่อมบัสบนเมนบอร์ดมองเห็นอุปกรณ์ย่อยรอบเครื่อง</span>
                </li>
                <li className="flex items-start gap-2.5 border-t border-slate-100 pt-3">
                  <span className="bg-indigo-50 text-indigo-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Graphics Card:</strong> ดาวน์โหลดเฉพาะรุ่นจากผู้ผลิตชิป (NVIDIA, AMD, Intel) เพื่อส่งสัญญาณภาพได้ความละเอียดสูง คมชัดลื่นไหล</span>
                </li>
                <li className="flex items-start gap-2.5 border-t border-slate-100 pt-3">
                  <span className="bg-indigo-50 text-indigo-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Network (Wi-Fi/LAN):</strong> นำเข้าตัวควบคุมสัญญาณเพื่อให้สามารถใช้เวิลด์ไวด์เว็บ ค้นหาสินทรัพย์เน็ตเวิร์กอื่นได้</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ──────────── 8. SECTION: Device Manager Simulator ──────────── */}
        <section className="space-y-6">
          <SimulatorShell
            dark
            icon={<Monitor className="w-6 h-6" />}
            title="Device Manager Simulation [ตัวจำลองการจัดการไดรเวอร์ระบบ]"
            glowColors="from-teal-600/15 to-emerald-500/10"
            iconColor="text-teal-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              
              {/* Virtual Screen showing resolution state */}
              <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col justify-between min-h-[320px] relative z-10">
                <span className="text-[9px] font-mono text-slate-500 font-bold tracking-widest uppercase mb-3">Hardware Output Monitor</span>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center p-3">
                  {allDriversInstalled ? (
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <h5 className="text-slate-100 font-bold text-sm">คอมพิวเตอร์พร้อมใช้งาน 100%</h5>
                        <p className="text-[11.5px] text-slate-400 leading-relaxed mt-1">
                          บอร์ดประมวลผล สัญญาณกราฟิก ความคมชัดภาพ และ Wi-Fi ทำงานครบถ้วนตรงตามสเปกแล้ว
                        </p>
                      </div>
                      <div className="p-2 border border-slate-800 bg-slate-950 text-emerald-400 font-mono text-[9px] rounded-lg">
                        Crisp Resolution: 1920x1080 | Wi-Fi 6 Connected
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-amber-950 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <AlertTriangle className="w-7 h-7 animate-pulse" />
                      </div>
                      <div>
                        <h5 className="text-slate-200 font-bold text-sm">คอมทำงานจำกัด (Missing Drivers)</h5>
                        <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1">
                          ตรวจพบข้อผิดพลาดด้านระบบควบคุมส่งผลให้ภาพจอมีขนาดหยาบ 1024x768 ไม่มีเสียง และเน็ตต่อไม่ได้
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 block border-t border-white/5 pt-2 font-medium">
                  ℹ️ คลิกเปิดอุปกรณ์ที่มีเครื่องหมายแจ้งเตือนด้านขวา เพื่ออัปเดตไดรเวอร์
                </span>
              </div>

              {/* Device manager Tree view list */}
              <div className="lg:col-span-8 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl relative z-10">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-4">DEVICE LISTING</span>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 pt-6 min-h-[260px] text-xs font-mono text-slate-350 space-y-3.5 shadow-inner">
                  <div className="border-b border-slate-800 pb-2 flex justify-between items-center text-[10px]">
                    <span className="font-bold text-teal-400">🖥️ DESKTOP-ITPRO (Hardware Device Tree)</span>
                    <span className="text-slate-500">Action - View Options</span>
                  </div>

                  <div className="space-y-2.5 pl-1">
                    {devices.map(dev => (
                      <div
                        key={dev.id}
                        onClick={() => {
                          setActiveDevId(dev.id);
                          setPropertiesOpen(true);
                        }}
                        className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center transition-all ${
                          dev.status !== 'OK' 
                            ? 'bg-slate-950 border-amber-900/40 hover:border-amber-500 hover:bg-slate-950/80 shadow-md shadow-amber-950/5' 
                            : 'bg-slate-950/45 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          {dev.icon ? dev.icon : <Cpu className="w-4.5 h-4.5 text-slate-500" />}
                          <div>
                            <span className="text-[8.5px] text-slate-500 block uppercase font-bold tracking-wider">{dev.category}</span>
                            <span className="font-bold text-slate-100 text-[11.5px]">{dev.name}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          {dev.status === 'OK' && <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded font-bold">OK</span>}
                          {dev.status === 'WARNING' && <span className="bg-amber-950 text-amber-400 border border-amber-500/30 text-[9px] px-2 py-0.5 rounded font-bold animate-pulse">WARNING</span>}
                          {dev.status === 'MISSING' && <span className="bg-rose-950 text-rose-400 border border-rose-500/30 text-[9px] px-2 py-0.5 rounded font-bold animate-pulse font-sans">MISSING DRIVER</span>}
                          <ArrowRight className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Properties propertiesOpen modal dialog */}
            {propertiesOpen && currentDevice && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-40 relative z-50">
                <div className="bg-[#e9e9f0] text-slate-800 rounded-2xl p-5 shadow-2xl border border-slate-300 w-full max-w-sm text-xs relative">
                  <div className="border-b border-slate-200 pb-2.5 mb-3.5 flex justify-between items-center font-bold">
                    <span className="text-indigo-950 uppercase tracking-wider text-[10px]">Device Properties</span>
                    <button onClick={() => setPropertiesOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer font-bold text-sm">✕</button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3.5 bg-white p-3 rounded-xl border border-slate-200 items-start shadow-sm">
                      <div className="bg-slate-100 p-2.5 rounded-lg shrink-0">
                        {currentDevice.icon ? currentDevice.icon : <Cpu className="w-4.5 h-4.5 text-slate-600" />}
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">{currentDevice.category}</span>
                        <h5 className="font-extrabold text-slate-900 mt-0.5 text-sm">{currentDevice.name}</h5>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 shadow-inner">
                      <strong className="text-slate-500 text-[10px] block mb-1 uppercase tracking-wide">Device Status:</strong>
                      <p className="text-[11.5px] leading-relaxed text-slate-700">{currentDevice.statusText}</p>
                    </div>

                    {driverUpdating.active && driverUpdating.targetId === currentDevice.id && (
                      <div className="space-y-2 pt-2 border-t border-slate-200/50">
                        <div className="flex justify-between font-bold text-indigo-700 text-[10.5px]">
                          <span>กำลังดึงข้อมูลและติดตั้งไดรเวอร์...</span>
                          <span className="font-mono">{driverUpdating.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 border border-slate-300 overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300" style={{ width: `${driverUpdating.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-3.5 mt-4 flex justify-end gap-2 text-xs font-bold">
                    <button 
                      onClick={() => setPropertiesOpen(false)} 
                      disabled={driverUpdating.active} 
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg cursor-pointer transition-colors"
                    >
                      Close
                    </button>
                    {currentDevice.status !== 'OK' && !driverUpdating.active && (
                      <button 
                        onClick={() => triggerUpdateDriver(currentDevice.id)} 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-5 rounded-lg cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-1.5 shadow"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Update Driver
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </SimulatorShell>
        </section>

        {/* ──────────── 9. SECTION: Gamification Quiz ──────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              Gamification Zone
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบประเมินความรู้รวมบทเรียน
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
            วัดระดับและพัฒนาความรู้ความเข้าใจเกี่ยวกับการสำรองข้อมูลตามหลัก 3-2-1 การสร้าง Bootable USB การล้างติดตั้ง Windows 10/11 และวิเคราะห์ไดรเวอร์ผ่าน Device Manager ด้วยแบบทดสอบด้านล่าง:
          </p>

          <QuizEngine
            title="ระบบทดสอบประเมินผลความรู้รวมบทเรียนบทที่ 3"
            description="ทดสอบความรู้เกี่ยวกับกฎการสำรองข้อมูล, ตารางพาร์ติชันดิสก์ GPT/MBR, การติดตั้ง Windows Setup และสัญลักษณ์ใน Device Manager"
            levels={QUIZ_LEVELS_UNIFIED}
            accentColor="from-sky-600/20 to-blue-500/10"
            icon={<Usb className="w-8 h-8 text-blue-400 animate-pulse" />}
          />
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <section className="relative z-10">
          <TeacherTask
            title="ภารกิจปฏิบัติการประจำบทเรียน: การสร้างสื่อติดตั้ง ติดตั้ง Windows 10 และจัดการไดรเวอร์ระบบ"
            taskText={`ให้นักเรียนเข้าสู่แผงควบคุมและจำลองการปฏิบัติงานติดตั้งระบบปฏิบัติการของบทเรียนนี้แบบครบวงจร จากนั้นจัดทำคู่มือส่งครูผู้สอน:

1. ปฏิบัติการจำลองสร้างแผ่นบูตผ่าน Rufus:
- เข้าจำลองโปรแกรม Rufus ด้านบน เลือกนำเข้า ISO ไฟล์ และตั้งพาร์ติชันดิสก์ปลายทางเป็นแบบ GPT (UEFI)
- กดเริ่มคัดลอก (START) และรอให้การเขียนแผ่น Kingston สำเร็จ 100%

2. ปฏิบัติการตั้งค่า BIOS บูตและติดตั้งวินโดวส์:
- ในคอมจำลองตัวที่ 2 กดสวิตช์เครื่อง (Power On) แล้วกดปุ่มคีย์ [ F12 ] เพื่อสลับเข้าเมนูตั้งค่าเลือกบูต
- เลือกอุปกรณ์บูตผ่าน Kingston USB แฟลชไดรฟ์
- เมื่อเข้าสู่ Windows Setup ให้เลือกโหมดติดตั้งแบบ Custom
- ลบพาร์ติชันดิสก์ข้อมูลตัวเดิม (Delete) และทำการฟอร์แมตระบบไฟล์ใหม่ จากนั้นรอขยายไฟล์ระบบ
- ดำเนินการตั้งโซนประเทศ OOBE เป็น Thailand และคีย์บอร์ด Thai Kedmanee พร้อมสร้างบัญชีผู้ใช้ของคุณ

3. ปฏิบัติการแก้ปัญหาไดรเวอร์ผ่าน Device Manager:
- ในคอมจำลองตัวที่ 3 ตรวจสอบชื่ออุปกรณ์ที่ไอคอนแจ้งเตือนผิดพลาด ⚠️ หรือ ?
- กดเข้าไปที่ Device Properties แล้วดำเนินการ Update Driver ทีละรายการจนกระทั่งหน้าจอแสดงผลได้ความคมชัด HD และเชื่อมต่อ Wi-Fi สำเร็จ
- จดรายงานขั้นตอนหลักทั้งหมด รวมสเปกและไดรเวอร์ตัวเครื่องที่อัปเดตลงกระดาษเพื่อนำส่งครูผู้สอน`}
          />
        </section>

      </main>
    </div>
  );
}
