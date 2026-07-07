import React, { useState, useEffect } from 'react';
import {
  Wrench, ShieldAlert, Zap, Settings, CheckCircle2, RotateCcw,
  Info, HelpCircle, Activity, Flame, Sparkles, Trash2,
  Shield, Cpu, Cable, AlertTriangle, Play, Check, AlertCircle,
  Eye, RefreshCw, Layers, ShieldCheck, ZapOff
} from 'lucide-react';
import {
  AmbientBackdrop,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// ──────────────────────────────────────────────────────────────────────────────
// DATA DEFINITIONS & CONSTANTS
// ──────────────────────────────────────────────────────────────────────────────

const safetyBlobs = [
  { color: 'bg-amber-200', size: 'w-[480px] h-[480px]', position: '-top-28 -left-28', opacity: 'opacity-35' },
  { color: 'bg-orange-200', size: 'w-[400px] h-[400px]', position: 'top-1/4 -right-28', opacity: 'opacity-30' },
  { color: 'bg-rose-100', size: 'w-[320px] h-[320px]', position: '-bottom-28 left-1/3', opacity: 'opacity-25' },
];

const toolData = [
  {
    symbol: '🪛',
    title: 'ไขควงปากแฉกและปากแบน (Screwdrivers)',
    description: 'ใช้สำหรับขันยึดและคลายน็อตสกรูในทุกส่วนประกอบของเครื่อง แนะนำขนาด PH2 สำหรับน็อตตัวถัง/เมนบอร์ด และ PH1 สำหรับน็อตพัดลมหรืออุปกรณ์ขนาดเล็ก ห้ามใช้ไขควงหัวแม่เหล็กแรงสูงใกล้กับสื่อบันทึกข้อมูลแบบจานหมุน',
    code: 'Phillips PH2 & PH1',
    result: 'เครื่องมือประกอบหลัก',
    accent: 'cyan',
    resultColor: 'indigo'
  },
  {
    symbol: '✂️',
    title: 'คีมปากแหลม (Long-Nose Pliers)',
    description: 'เครื่องมือจำเป็นสำหรับคีบจับน็อต สกรู หรือชิ้นส่วนโลหะขนาดเล็กที่ตกลงไปในซอกแคบของเคสคอมพิวเตอร์ที่มือเอื้อมไม่ถึง รวมถึงใช้ในการดึงหรือเสียบจัมเปอร์ (Jumper) บนเมนบอร์ดได้อย่างแม่นยำ',
    code: 'Precision Long-Nose',
    result: 'คีบจับชิ้นส่วนเล็ก',
    accent: 'amber',
    resultColor: 'amber'
  },
  {
    symbol: '🧪',
    title: 'ซิลิโคนระบายความร้อน (Thermal Paste)',
    description: 'สารเหนี่ยวนำความร้อนที่ใช้ทาบางๆ บนกระดองโลหะของ CPU ก่อนติดตั้งฮีทซิงก์ ทำหน้าที่เติมเต็มช่องว่างอากาศระดับไมโครระหว่างหน้าสัมผัส เพื่อช่วยให้การส่งผ่านและระบายความร้อนไปยังชุดพัดลมเป็นไปได้อย่างสมบูรณ์',
    code: 'Thermal Conductivity W/mK',
    result: 'ส่งผ่านความร้อน',
    accent: 'emerald',
    resultColor: 'emerald'
  },
  {
    symbol: '⚡',
    title: 'มัลติมิเตอร์แบบดิจิทัล (Digital Multimeter)',
    description: 'เครื่องมือสำคัญสำหรับช่างในการตรวจวัดความถูกต้องของแรงดันไฟฟ้ากระแสสลับ (AC) เต้ารับ, ตรวจสอบไฟรั่ว 110V ลงสู่โครงเหล็กเคส, และตรวจสอบความต่อเนื่อง (Continuity Test) ของสายสัญญาณกราวด์',
    code: 'V / A / Ohm Tester',
    result: 'วัดไฟฟ้าและกราวด์',
    accent: 'indigo',
    resultColor: 'indigo'
  },
  {
    symbol: '🧤',
    title: 'ถุงมือป้องกันไฟฟ้าสถิต (Anti-Static Gloves)',
    description: 'ถุงมือผ้าโพลีเอสเตอร์ผสมใยคาร์บอนนำไฟฟ้า (Carbon Fiber) ช่วยป้องกันไม่ให้ไขมันจากนิ้วมือและเหงื่อสัมผัสโดนขาลายวงจรทองแดง ซึ่งเป็นตัวนำไฟฟ้าสถิตและก่อให้เกิดการผุกร่อนในระยะยาว',
    code: 'ESD-Safe Gloves',
    result: 'ป้องกันคราบและประจุ',
    accent: 'teal',
    resultColor: 'emerald'
  },
  {
    symbol: '💨',
    title: 'เครื่องเป่าลมและแปรงปัดฝุ่น (Blower & Static Brush)',
    description: 'แปรงขนนุ่มปัดฝุ่นชนิดป้องกันไฟฟ้าสถิต (Anti-static Brush) และโบลเวอร์ไฟฟ้า ใช้เป่ากำจัดฝุ่นสะสมตามแผงวงจรและชุดระบายความร้อน ซึ่งเป็นตัวนำฝุ่นประจุและขวางทางลมระบายอากาศ',
    code: 'Clean Air & ESD Brush',
    result: 'บำรุงรักษาเชิงป้องกัน',
    accent: 'violet',
    resultColor: 'rose'
  }
];

// Triboelectric Lab Data
const materialsPositive = [
  { id: 'hair', name: 'เส้นผม/ผิวหนังมนุษย์', value: 5, desc: 'สูญเสียอิเล็กตรอนได้ง่ายที่สุด มักเกิดประจุบวกสะสมสูง' },
  { id: 'wool', name: 'ขนหนู/เสื้อไหมพรม', value: 4, desc: 'สูญเสียอิเล็กตรอนง่าย มักเกิดเมื่ออยู่ในห้องแอร์เย็นๆ' },
  { id: 'glass', name: 'กระจกแก้ว', value: 3, desc: 'สูญเสียอิเล็กตรอนปานกลาง' }
];

const materialsNegative = [
  { id: 'teflon', name: 'แผ่นเทฟลอน (Teflon)', value: -5, desc: 'ดึงดูดอิเล็กตรอนได้ดีที่สุด เกิดประจุลบเข้มข้น' },
  { id: 'rubber', name: 'พื้นรองเท้ายาง/ไวนิล', value: -4, desc: 'ดึงดูดอิเล็กตรอนดีเยี่ยม สร้างสปาร์กไฟง่ายเมื่อเสียดสี' },
  { id: 'polyester', name: 'เสื้อผ้าใยสังเคราะห์', value: -3, desc: 'ดึงดูดอิเล็กตรอนปานกลาง' }
];

const esdScenarios = [
  {
    id: 'carpet-wool',
    label: 'เดินบนพรมขนสัตว์ (ถุงเท้าขนสัตว์)',
    voltage: 3500,
    risk: 'อันตรายสูงสุดต่อวงจร CMOS',
    desc: 'แรงเสียดทานระหว่างขนสัตว์กับพรมทำให้เกิดการสะสมประจุไฟฟ้าสถิตบนร่างกายสูงมาก แรงดันไฟพุ่งทะยานทะลุเกณฑ์ความทนทานของสารกึ่งตัวนำ ชิปจะไหม้เสียหายทันทีที่สัมผัส',
    status: 'dangerous'
  },
  {
    id: 'vinyl-rubber',
    label: 'เดินบนพื้นไวนิล (รองเท้ายาง)',
    voltage: 1500,
    risk: 'อันตรายสูงเกินขีดจำกัดอุปกรณ์',
    desc: 'การเสียดสีบนพื้นสังเคราะห์สร้างแรงดันไฟสถิตสะสมระดับปานกลาง แม้ร่างกายมนุษย์จะไม่รู้สึกถึงกระแสไฟฟ้าช็อต (เพราะต่ำกว่า 3,000V) แต่เป็นระดับที่รุนแรงพอจะทำลายทรานซิสเตอร์ใน CPU/RAM ได้อย่างง่ายดาย',
    status: 'warning'
  },
  {
    id: 'normal-desk',
    label: 'ขยับตัวทำงานบนเก้าอี้พลาสติกทั่วไป',
    voltage: 800,
    risk: 'เสี่ยงทำให้อุปกรณ์ชำรุดเงียบ',
    desc: 'การเสียดสีของเสื้อผ้ากับเบาะเก้าอี้สร้างประจุไฟฟ้าสถิตสะสมเบาๆ การจับต้องแรมหรือการ์ดจอโดยไม่มีการคายประจุหรือสวมอุปกรณ์ป้องกัน จะส่งผลให้บอร์ดเกิดความชำรุดเสียหายแบบแฝง (Latent Defect)',
    status: 'warning'
  },
  {
    id: 'touch-case',
    label: 'แตะโครงตัวถังโลหะของเคสเพื่อคายประจุ',
    voltage: 0,
    risk: 'ปลอดภัยชั่วคราว (Self-Grounding)',
    desc: 'การสัมผัสพื้นผิวโลหะที่เป็นตัวนำไฟฟ้าขนาดใหญ่และเชื่อมต่อสายกราวด์ ทำให้ประจุไฟฟ้าสถิตส่วนเกินที่สะสมบนร่างกายไหลลงสู่พื้นดินทันที ค่าแรงดันไฟฟ้าสถิตลดลงสู่ศูนย์โวลต์',
    status: 'safe'
  },
  {
    id: 'wrist-strap',
    label: 'สวมใส่สายรัดข้อมือป้องกันไฟฟ้าสถิต (Wrist Strap)',
    voltage: 0,
    risk: 'ปลอดภัยสูงสุดตลอดการทำงาน',
    desc: 'สายรัดข้อมือที่มีสายตัวนำทองแดงเชื่อมต่อไปยังกราวด์ของเคสคอมพิวเตอร์ จะทำการระบายประจุไฟฟ้าสถิตที่เกิดขึ้นจากการเคลื่อนไหวร่างกายลงดินตลอดเวลาอย่างต่อเนื่อง ป้องกันการสปาร์ก 100%',
    status: 'safe'
  }
];

const quizQuestions = [
  {
    question: "ความล้มเหลวแบบแฝงเร้น (Latent Failure) ของชิ้นส่วนสารกึ่งตัวนำอันเกิดจากไฟฟ้าสถิต (ESD) มีลักษณะตรงกับข้อใดมากที่สุด?",
    options: [
      "อุปกรณ์เสียหายและใช้งานไม่ได้ทันทีตั้งแต่เปิดเครื่องครั้งแรก",
      "อุปกรณ์ยังคงเปิดใช้งานได้ปกติหลังติดตั้ง แต่เสื่อมสภาพลงเรื่อยๆ จนส่งผลให้เครื่องสุ่มแฮงก์หรือค้างในสัปดาห์ถัดๆ ไป",
      "อุปกรณ์เกิดรอยแตกหักทางกายภาพของแผ่นวงจรสีน้ำเงินจนมองเห็นได้ด้วยตาเปล่า",
      "โปรแกรมในคอมพิวเตอร์ทั้งหมดถูกลบหายไปพร้อมประวัติวินิจฉัยข้อผิดพลาด"
    ],
    answer: 1,
    explanation: "Latent Failure คือภัยเงียบที่สุดของไฟฟ้าสถิต ชิ้นส่วนไม่พังตายทันที (ไม่เหมือน Catastrophic Failure) แต่จะสร้างความชำรุดแบบซ่อนเร้นอยู่ภายในโครงสร้างทรานซิสเตอร์ ทำให้ชิปค่อยๆ เสื่อมประสิทธิภาพ ส่งผลให้เครื่องไม่เสถียรและตรวจหาสาเหตุได้ยากมากในภายหลัง"
  },
  {
    question: "หากช่างใช้ไขควงเข้าไปประกอบหรือบำรุงรักษาโดยสับเพียงสวิตช์หน้าเคสปิดเครื่อง แต่ไม่ได้ถอดปลั๊ก AC ออกจากเต้ารับ จะมีความเสี่ยงในทางปฏิบัติอย่างไร?",
    options: [
      "กระแสไฟฟ้าหลัก 220V จะวิ่งไหลย้อนกลับเข้าไปทำลายข้อมูลในฮาร์ดดิสก์แบบจานหมุนจนเสียหาย",
      "พัดลมในตัวเครื่องจะเร่งรอบการหมุนเป็นความเร็วสูงสุดอัตโนมัติเนื่องจากมีสปาร์ก",
      "มีแรงดันสแตนด์บาย 5V (5VSB) ส่งมาจากพาวเวอร์ซัพพลายไปเลี้ยงเมนบอร์ดอยู่ตลอดเวลา ซึ่งอาจสปาร์กช็อตชิปเสียหายหากหัวไขควงเผลอแตะตัวนำ",
      "ระบบความถี่สัญญาณนาฬิกาของ CPU จะค้างจนไม่สามารถทำ Overclocking ได้อีกต่อไป"
    ],
    answer: 2,
    explanation: "การเสียบปลั๊กไฟ AC ทิ้งไว้ ส่งผลให้พาวเวอร์ซัพพลายจ่ายไฟฟ้าเลี้ยงสแตนด์บาย 5V Standby (5VSB) เข้าสู่เมนบอร์ดตลอดเวลาเพื่อระบบควบคุมของบอร์ด การนำไขควงโลหะลงไปขันหากลื่นไถลโดนพินสัมผัสอาจส่งผลให้วงจรลัดเสียหายได้ทันที"
  },
  {
    question: "ตามตาราง Triboelectric Series หากผู้ปฏิบัติงานสวมใส่เสื้อกันหนาวทำด้วยผ้าขนสัตว์ (Wool) แล้วเสียดสีถูเข้ากับพื้นรองเท้าหรือเก้าอี้ไวนิลยาง จะเกิดผลลัพธ์ประจุไฟฟ้าในทางฟิสิกส์อย่างไร?",
    options: [
      "ประจุบวกและประจุลบหักล้างกันจนแรงดันไฟสถิตเป็นศูนย์",
      "อิเล็กทรอนิกส์ในพาวเวอร์ซัพพลายจะจ่ายไฟได้มีประสิทธิภาพสูงขึ้น 20%",
      "ขนสัตว์จะสูญเสียอิเล็กตรอน (เป็นประจุบวก) และยางไวนิลจะดึงดูดอิเล็กตรอนไป (เป็นประจุลบ) เกิดแรงดันไฟฟ้าสถิตสะสมสูงมากระหว่างตัวผู้ปฏิบัติงานกับพื้น",
      "กระแสไฟฟ้ากระแสสลับ 220V จะวิ่งเหนี่ยวนำไหลผ่านเสื้อขนสัตว์จนกลายเป็นไฟสแตนด์บาย"
    ],
    answer: 2,
    explanation: "ตามตารางความขัดสีทริโบอิเล็กทริก ผ้าขนสัตว์ (Wool) อยู่ด้านขั้วบวก (สูญเสียอิเล็กตรอนง่าย) ขณะที่ยางสังเคราะห์หรือไวนิลอยู่ด้านขั้วลบ (ดึงอิเล็กตรอนดี) เมื่อเสียดสีกันจึงเกิดการดึงประจุข้ามโมเลกุล ทำให้เกิดแรงดันไฟฟ้าสถิตสะสมระหว่างร่างกายของช่างกับสภาพแวดล้อมได้สูงมาก"
  },
  {
    question: "เหตุใดผู้ผลิตจึงกำหนดกฎห้ามช่างแกะเปิดกล่องครอบโลหะของพาวเวอร์ซัพพลาย (PSU) เพื่อซ่อมบำรุงด้วยตัวเองอย่างเด็ดขาด?",
    options: [
      "เพราะจะส่งผลให้พัดลมระบายความร้อนของพาวเวอร์ซัพพลายหลุดและหมุนกลับทิศทาง",
      "เพราะกล่องพาวเวอร์ซัพพลายบรรจุตัวเก็บประจุ (Capacitors) แรงสูงที่คงค้างแรงดันไฟ 300V-400V ได้เป็นเวลานานแม้จะถอดปลั๊กแล้ว ซึ่งอันตรายถึงชีวิตหากสัมผัส",
      "เพราะควันหรือสารระเหยเคมีของซิลิโคนภายในพาวเวอร์ซัพพลายจะระเบิดหากโดนอากาศภายนอก",
      "เพราะขอบเหล็กของตัวพาวเวอร์ซัพพลายจะคายประจุไฟฟ้าสถิต ESD ออกมารุนแรงที่สุดกว่าชิ้นส่วนอื่น"
    ],
    answer: 1,
    explanation: "ภายใน PSU มีตัวเก็บประจุแรงดันสูงที่เชื่อมโยงวงจรแปลงไฟกระแสสลับ ซึ่งเก็บพลังงานไฟฟ้าแรงดันสูงระดับ 300-400 โวลต์เอาไว้ได้นานหลายชั่วโมงหรือหลายวันแม้จะถอดปลั๊ก หากช่างสัมผัสโดนจุดบัดกรีหรือสายส่งอาจเป็นอันตรายถึงหัวใจวายได้ทันที"
  },
  {
    question: "ในการทดสอบเต้ารับผนังและโครงเหล็กคอมพิวเตอร์ด้วยดิจิทัลมัลติมิเตอร์ (Digital Multimeter) หากระบบไฟไม่มีการเชื่อมโยงระบบสายดิน (Earth Ground) ที่เต้ารับ จะเกิดแรงดันรั่วไหลที่โครงเคสเท่าใดเมื่อวัดเทียบกับสายนิวทรัล?",
    options: [
      "0 โวลต์ เพราะพาวเวอร์ซัพพลายทำหน้าที่ตัดแยกกระแสไปหมดสิ้นแล้ว",
      "ประมาณ 5 โวลต์ ซึ่งเป็นค่าของไฟฟ้าสแตนด์บายของเมนบอร์ด",
      "ประมาณ 110 โวลต์ AC (ครึ่งหนึ่งของแรงดัน 220V จากวงจรกองไฟ Y-Capacitor ใน PSU) ซึ่งแรงพอที่จะดูดช่างให้สะดุ้งเจ็บตัว",
      "400 โวลต์ DC เพราะตัวเก็บประจุระเบิดประจุรั่วออกมาภายนอกเคส"
    ],
    answer: 2,
    explanation: "พาวเวอร์ซัพพลายคอมพิวเตอร์จะมีวงจร EMI Filter และตัวเก็บประจุกลุ่ม Y-Capacitor ต่อพ่วงคั่นเพื่อลดสัญญาณรบกวน โดยปลายสายจะต่อลงดิน หากเต้ารับไม่มีสายดินแรงดันครึ่งหนึ่งของ 220V (คือประมาณ 110V AC) จะลอยค้างอยู่ที่โครงเหล็กตัวเคส หากแตะต้องขณะเท้าเหยียบพื้นดินเปลือยจะถูกไฟดูดสะดุ้ง"
  }
];

export default function IT2_2() {
  // ESD Meter Simulator State
  const [selectedEsdScenario, setSelectedEsdScenario] = useState('normal-desk');
  const activeScenario = esdScenarios.find(s => s.id === selectedEsdScenario) || esdScenarios[2];

  // Triboelectric Lab State
  const [posMaterial, setPosMaterial] = useState('hair');
  const [negMaterial, setNegMaterial] = useState('teflon');
  const [rubbing, setRubbing] = useState(false);
  const [rubbedVoltage, setRubbedVoltage] = useState(0);
  const [electronFlow, setElectronFlow] = useState([]);

  // Workbench Simulator State
  const [acPlugged, setAcPlugged] = useState(true);
  const [psuOn, setPsuOn] = useState(true);
  const [wristStrapConnected, setWristStrapConnected] = useState(false);
  const [esdMatDeployed, setEsdMatDeployed] = useState(false);
  const [wallGroundConnected, setWallGroundConnected] = useState(true); // Wall outlet ground configuration
  const [selectedTool, setSelectedTool] = useState('none'); // 'none' | 'screwdriver' | 'paste' | 'brush' | 'ties' | 'multimeter'
  
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0); // 0 to 4
  const [simulationLogs, setSimulationLogs] = useState([
    'ระบบเครื่องจำลองความปลอดภัยเริ่มต้น...',
    'คำเตือน: โปรดตรวจสอบสภาพแวดล้อม ปลั๊กไฟ และระบบไฟฟ้าสถิตก่อนเริ่มงาน'
  ]);
  const [simulationStatus, setSimulationStatus] = useState('idle'); // 'idle' | 'success' | 'shocked' | 'esd_damage' | 'wrong_tool' | 'completed' | 'voltage_leak'

  // Task components installation status
  const [fanCleaned, setFanCleaned] = useState(false);
  const [pasteApplied, setPasteApplied] = useState(false);
  const [ramInstalled, setRamInstalled] = useState(false);
  const [motherboardMounted, setMotherboardMounted] = useState(false);
  const [leakageMeasured, setLeakageMeasured] = useState(false);

  // Body static charge in Workbench Simulator (dynamically matches strap connection)
  const [workbenchBodyVoltage, setWorkbenchBodyVoltage] = useState(1500);

  // Synchronize body voltage in simulator with wrist strap
  useEffect(() => {
    if (wristStrapConnected) {
      setWorkbenchBodyVoltage(0);
      addLog('สายรัดข้อมือกันไฟฟ้าสถิตเชื่อมต่อกับตัวถังโลหะ -> แรงดันไฟฟ้าสถิตร่างกาย = 0 โวลต์ (ปลอดภัย)');
    } else {
      setWorkbenchBodyVoltage(1500);
      addLog('สายรัดข้อมือถูกปลดออก -> ร่างกายเกิดการสะสมประจุไฟฟ้าสถิตอีกครั้ง (~1500 โวลต์)');
    }
  }, [wristStrapConnected]);

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setSimulationLogs(prev => [`[${time}] ${message}`, ...prev]);
  };

  const resetSimulation = () => {
    setAcPlugged(true);
    setPsuOn(true);
    setWristStrapConnected(false);
    setEsdMatDeployed(false);
    setWallGroundConnected(true);
    setSelectedTool('none');
    setCurrentTaskIndex(0);
    setFanCleaned(false);
    setPasteApplied(false);
    setRamInstalled(false);
    setMotherboardMounted(false);
    setLeakageMeasured(false);
    setWorkbenchBodyVoltage(1500);
    setSimulationStatus('idle');
    setSimulationLogs([
      'รีเซ็ตระบบเครื่องจำลองเรียบร้อย...',
      'คำเตือน: ตรวจสอบสภาพแวดล้อม ปลั๊กไฟ และประจุไฟฟ้าสถิตก่อนดำเนินการ'
    ]);
  };

  // Triboelectric calculation
  const handleRubMaterials = () => {
    setRubbing(true);
    setRubbedVoltage(0);
    setElectronFlow([]);

    // Generate electron migration dots
    const dots = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      delay: i * 0.1,
    }));
    setElectronFlow(dots);

    setTimeout(() => {
      const posObj = materialsPositive.find(m => m.id === posMaterial);
      const negObj = materialsNegative.find(m => m.id === negMaterial);
      if (posObj && negObj) {
        // formula: difference in position multiplied by scale factor
        const diff = posObj.value - negObj.value;
        const calculatedVal = Math.round(diff * 450);
        setRubbedVoltage(calculatedVal);
      }
      setRubbing(false);
    }, 1500);
  };

  const tasksList = [
    {
      title: 'ปัดทำความสะอาดฝุ่นที่พัดลมและซิงก์ระบายความร้อน CPU',
      requiredTool: 'brush',
      description: 'ใช้แปรงขนนุ่มปัดฝุ่นละอองออกจากฮีทซิงก์และใบพัดลมระบายความร้อนของตัวเก็บความร้อนของ CPU',
      checkSafety: () => {
        if (acPlugged && psuOn) return { ok: false, type: 'shocked', msg: 'ไฟฟ้าแรงดันกระแสสลับ 220V ดูด! ช่างได้รับอันตรายจากการทำงานขณะเครื่องมีไฟเลี้ยงเต็มระบบ' };
        return { ok: true };
      }
    },
    {
      title: 'ทาซิลิโคนระบายความร้อนบนฝากระดอง CPU',
      requiredTool: 'paste',
      description: 'ทาซิลิโคนนำความร้อนจุดกึ่งกลางเป็นขนาดเมล็ดถั่วเขียวบนฝาครอบโลหะ เพื่อเตรียมพร้อมสำหรับฮีทซิงก์',
      checkSafety: () => {
        if (acPlugged && psuOn) return { ok: false, type: 'shocked', msg: 'ไฟฟ้าช็อต! เมนบอร์ดลัดวงจรเนื่องจากมีไฟเลี้ยงสแตนด์บาย 5VSB ขณะสัมผัสตัวนำ' };
        return { ok: true };
      }
    },
    {
      title: 'ติดตั้งหน่วยความจำแรม (RAM DDR5) ลงบนสล็อตเมนบอร์ด',
      requiredTool: 'none', // Hand install
      description: 'จัดแนวหน้าสัมผัสทองแดงของ RAM ให้ตรงบ่าล็อกสล็อต กดลงให้แน่นจนได้ยินเสียงล็อกดังคลิก',
      checkSafety: () => {
        if (acPlugged && psuOn) return { ok: false, type: 'shocked', msg: 'ไฟฟ้าช็อตบอร์ดลุกไหม้! มีไฟเลี้ยงแรมสแตนด์บายอยู่ในวงจรขณะนำชิ้นส่วนทองแดงลงติดตั้ง' };
        if (workbenchBodyVoltage > 100) return { ok: false, type: 'esd_damage', msg: 'ไฟฟ้าสถิตแรงสูงสะสมบนร่างกายคายประจุ (ESD Flashover) ช็อคลายวงจรและเมมโมรี่ชิป DDR5 พังเสียหายทางกายภาพทันที!' };
        if (!esdMatDeployed) return { ok: false, type: 'esd_damage', msg: 'ความเสียหายทางเทคนิค: การวางและติดตั้งบอร์ดเปลือยบนโต๊ะทำงานที่ไม่มีแผ่นยางกันไฟฟ้าสถิต (ESD Mat) ทำให้ประจุสะสมที่มุมบอร์ดส่งผลชิปพังเงียบ' };
        return { ok: true };
      }
    },
    {
      title: 'ยึดเมนบอร์ดลงในตัวเคสคอมพิวเตอร์และเชื่อมต่อสายสัญญาณ',
      requiredTool: 'screwdriver',
      description: 'วางเมนบอร์ดให้ตรงกับเสารองน็อตยึดโลหะ (Standoffs) ขันสกรูยึดขอบทั้ง 9 จุดเข้ากับตัวเคส',
      checkSafety: () => {
        if (acPlugged && psuOn) return { ok: false, type: 'shocked', msg: 'ไฟดูดรุนแรง! โครงเคสโลหะมีไฟรั่วช็อคผู้ทำงานเนื่องจากยังไม่ถอดปลั๊ก AC 220V เกรดเครื่องไม่ได้ลงดิน' };
        if (workbenchBodyVoltage > 100) return { ok: false, type: 'esd_damage', msg: 'กระแสสปาร์กไฟฟ้าสถิตวิ่งออกจากนิ้วมือผ่านหัวสกรูลงไปยังเมนบอร์ดและวงจรจ่ายไฟ VRM พังเสียหายถาวร' };
        return { ok: true };
      }
    },
    {
      title: 'ตรวจสอบแรงดันไฟฟ้ารั่วไหลที่โครงตัวถังเคสด้วยมัลติมิเตอร์',
      requiredTool: 'multimeter',
      description: 'สำหรับการวัดไฟรั่ว ต้องเชื่อมปลั๊ก AC และสับสวิตช์ PSU เป็น ON เพื่อตรวจสอบว่าไฟบ้านรั่วไหลผ่านตัวเครื่องหรือไม่',
      checkSafety: () => {
        // For measuring leakage, power MUST be plugged in and on!
        if (!acPlugged || !psuOn) return { ok: false, type: 'wrong_tool', msg: 'ความผิดพลาดทางเทคนิค: ต้องเสียบปลั๊ก AC และสับสวิตช์ PSU เป็น ON เพื่อตรวจสอบกระแสไฟฟ้าที่รั่วไหลจริง' };
        if (!wallGroundConnected) return { ok: false, type: 'voltage_leak', msg: 'อันตราย: เต้ารับไม่มีสายดิน! มัลติมิเตอร์วัดไฟรั่วได้ 110V AC ช่างโดนกระแสไฟรั่วช็อตมือสะดุ้งเกร็ง' };
        return { ok: true };
      }
    }
  ];

  const handlePerformTask = () => {
    if (simulationStatus === 'shocked' || simulationStatus === 'esd_damage' || simulationStatus === 'voltage_leak' || currentTaskIndex >= tasksList.length) {
      addLog('ระบบถูกล็อกกรุณากดปุ่ม Reset เพื่อเริ่มใหม่อีกครั้ง');
      return;
    }

    const task = tasksList[currentTaskIndex];
    
    // 1. Check Tool
    if (selectedTool !== task.requiredTool) {
      setSimulationStatus('wrong_tool');
      addLog(`ข้อบกพร่อง: การใช้เครื่องมือผิดประเภท! ภารกิจนี้ต้องการการใช้ "${
        task.requiredTool === 'brush' ? 'แปรงปัดฝุ่น' :
        task.requiredTool === 'paste' ? 'ซิลิโคนระบายความร้อน' :
        task.requiredTool === 'screwdriver' ? 'ไขควงปากแฉก' :
        task.requiredTool === 'multimeter' ? 'มัลติมิเตอร์ดิจิทัล' : 'มือเปล่า (ไม่มีเครื่องมือ)'
      }" แต่ช่างเลือกใช้ "${
        selectedTool === 'brush' ? 'แปรงปัดฝุ่น' :
        selectedTool === 'paste' ? 'ซิลิโคนระบายความร้อน' :
        selectedTool === 'screwdriver' ? 'ไขควงปากแฉก' :
        selectedTool === 'ties' ? 'สายรัดเคเบิล' :
        selectedTool === 'multimeter' ? 'มัลติมิเตอร์ดิจิทัล' : 'มือเปล่า'
      }"`);
      return;
    }

    // 2. Check Safety
    const safetyCheck = task.checkSafety();
    if (!safetyCheck.ok) {
      setSimulationStatus(safetyCheck.type);
      addLog(`❌ ความล้มเหลว: ${safetyCheck.msg}`);
      return;
    }

    // 3. Perform Task Success
    addLog(`✔️ ภารกิจสำเร็จ: ${task.title}`);
    
    // Update graphic states
    if (currentTaskIndex === 0) setFanCleaned(true);
    if (currentTaskIndex === 1) setPasteApplied(true);
    if (currentTaskIndex === 2) setRamInstalled(true);
    if (currentTaskIndex === 3) setMotherboardMounted(true);
    if (currentTaskIndex === 4) setLeakageMeasured(true);

    if (currentTaskIndex < tasksList.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setSimulationStatus('idle');
      addLog(`เข้าสู่ขั้นตอนถัดไป: ${tasksList[currentTaskIndex + 1].title}`);
    } else {
      setSimulationStatus('completed');
      addLog('🎉 ยินดีด้วย! ช่างปฏิบัติงานประกอบและบำรุงรักษาอย่างปลอดภัย 100% ผ่านทุกเกณฑ์สากล');
    }
  };

  return (
    <>
      {/* Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <AmbientBackdrop blobs={safetyBlobs} />

      {/* Layer 3: Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-12 space-y-16 md:space-y-20 relative z-10">

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 1: เครื่องมือช่างพื้นฐานสำหรับงานคอมพิวเตอร์
            ────────────────────────────────────────────────────────────────── */}
        <section id="section-tools" className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-cyan-500 rounded-full" />
              <h3 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                เครื่องมือช่างพื้นฐานสำหรับงานคอมพิวเตอร์
              </h3>
            </div>
            {/* Fluid Open-Air Layout: paragraph text directly on background */}
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl">
              การซ่อมบำรุงและประกอบฮาร์ดแวร์คอมพิวเตอร์จำเป็นต้องอาศัยเครื่องมือที่เหมาะสมเพื่อป้องกันความเสียหายต่อตัวอุปกรณ์นำไฟฟ้าและชิ้นส่วนอิเล็กทรอนิกส์ที่มีความละเอียดอ่อน การเลือกขนาดไขควงและการดูแลถนอมชิ้นส่วนอย่างมืออาชีพช่วยลดความชำรุดเสียหายของหัวเกลียวสลักและการเชื่อมโยงสัญญาณ
            </p>
          </div>

          {/* Tools Image Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-cyan-100/50 bg-white/40">
            <img
              src="/images/it/tools_technician.png"
              alt="เครื่องมือช่างและอุปกรณ์เสริมสำหรับการซ่อมคอมพิวเตอร์"
              className="w-full object-cover max-h-80"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent px-6 py-4">
              <p className="text-white text-[13px] font-semibold">ภาพแสดงชุดเครื่องมือช่างคอมพิวเตอร์พื้นฐาน — ไขควงสเปคต่างขนาด, ซิลิโคนนำความร้อนคุณภาพสูง, และสายรัดจัด Airflow</p>
            </div>
          </div>

          {/* Grid of Concept Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {toolData.map((tool, i) => (
              <ConceptCard
                key={i}
                symbol={tool.symbol}
                title={tool.title}
                description={tool.description}
                code={tool.code}
                result={tool.result}
                accent={tool.accent}
                resultColor={tool.resultColor}
              />
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            INTERACTIVE ADDON: Triboelectric Series Physics Lab
            ────────────────────────────────────────────────────────────────── */}
        <section id="section-tribo-lab" className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
              <h3 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ห้องปฏิบัติการทดลองไฟฟ้าสถิตขัดสี (Triboelectric Physics Lab)
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl">
              ไฟฟ้าสถิตไม่ได้เกิดขึ้นเอง แต่เกิดจากการย้ายถิ่นของอิเล็กตรอน (Electron Transfer) เมื่อวัสดุสองชนิดที่อยู่ห่างกันใน **ตารางความขัดสีทริโบอิเล็กทริก (Triboelectric Series)** นำมาเสียดสีกัน ทดลองเลือกคู่ของวัสดุด้านล่างแล้วคลิกขัดสีเพื่อดูการสปาร์กและระดับแรงดันไฟฟ้าสถิตสะสม
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Selector A (Positive tendency) */}
              <div className="space-y-4">
                <label className="text-[13px] font-black text-rose-500 uppercase tracking-wider block">วัสดุผู้ให้ประจุบวก (สูญเสียอิเล็กตรอน)</label>
                <div className="flex flex-col gap-2">
                  {materialsPositive.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setPosMaterial(m.id); setRubbedVoltage(0); }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                        posMaterial === m.id
                          ? 'border-rose-400 bg-rose-50/50 text-rose-800 font-bold'
                          : 'border-slate-100 bg-white/50 hover:border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[14px]">{m.name}</span>
                        <span className="text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-mono font-bold">+{m.value}</span>
                      </div>
                      <p className="text-[12px] text-slate-500 font-normal leading-tight">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Central Physics Visual Board */}
              <div className="bg-slate-950 rounded-2xl p-5 text-white flex flex-col items-center justify-center min-h-[220px] relative border border-slate-800 text-center space-y-4">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">MOLECULAR CHARGE TRANSFER</span>

                <div className="w-full flex items-center justify-around relative px-4">
                  {/* Positive Node */}
                  <div className="z-10">
                    <div className="w-14 h-14 rounded-full bg-rose-950 border-2 border-rose-500 flex items-center justify-center text-lg font-black text-rose-300">
                      {posMaterial === 'hair' ? '💇' : posMaterial === 'wool' ? '🧣' : '🥃'}
                    </div>
                    <span className="text-[11px] text-rose-400 font-bold block mt-1">ขั้วบวก (+)</span>
                  </div>

                  {/* Electron Flow Lane */}
                  <div className="absolute inset-x-12 top-6 h-1 flex items-center justify-between">
                    {rubbing && electronFlow.map((dot) => (
                      <div
                        key={dot.id}
                        className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-[flowRight_1.5s_infinite] absolute"
                        style={{
                          left: `${15 + (dot.id * 7)}%`,
                          animationDelay: `${dot.delay}s`,
                        }}
                      />
                    ))}
                    {!rubbing && <div className="w-full h-0.5 border-t border-dashed border-slate-800" />}
                  </div>

                  {/* Negative Node */}
                  <div className="z-10">
                    <div className="w-14 h-14 rounded-full bg-indigo-950 border-2 border-indigo-500 flex items-center justify-center text-lg font-black text-indigo-300">
                      {negMaterial === 'teflon' ? '🍳' : negMaterial === 'rubber' ? '🥾' : '👕'}
                    </div>
                    <span className="text-[11px] text-indigo-400 font-bold block mt-1">ขั้วลบ (-)</span>
                  </div>
                </div>

                {/* Rub button */}
                <button
                  onClick={handleRubMaterials}
                  disabled={rubbing}
                  className={`px-5 py-2 rounded-xl text-[13px] font-bold cursor-pointer transition-all ${
                    rubbing
                      ? 'bg-slate-800 text-slate-500 border border-slate-700'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-slate-950 active:scale-95 font-black hover:shadow-md'
                  }`}
                >
                  {rubbing ? 'กำลังขัดถูและถ่ายโอนประจุ...' : '⚡ ขัดสีคู่สัมผัส (Rub Materials)'}
                </button>

                {/* Calculated Result */}
                {rubbedVoltage > 0 && (
                  <div className="animate-fade-in space-y-1">
                    <p className="text-[22px] font-black text-yellow-400 font-mono tracking-tight">
                      {rubbedVoltage.toLocaleString()} V
                    </p>
                    <p className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${
                      rubbedVoltage > 3000 ? 'bg-rose-950/80 text-rose-400 border border-rose-900' :
                      rubbedVoltage > 1500 ? 'bg-amber-950/80 text-amber-400 border border-amber-900' :
                      'bg-emerald-950/80 text-emerald-400 border border-emerald-900'
                    }`}>
                      {rubbedVoltage > 3000 ? 'อันตราย: ไฟสปาร์กแรงสูง ชิปพังคาที่' :
                       rubbedVoltage > 1500 ? 'อันตรายแฝง: ทำลายเกตชิปโดยไม่รู้สึกตัว' : 'เสี่ยงต่อลายวงจร CMOS'}
                    </p>
                  </div>
                )}
              </div>

              {/* Selector B (Negative tendency) */}
              <div className="space-y-4">
                <label className="text-[13px] font-black text-indigo-500 uppercase tracking-wider block">วัสดุผู้รับประจุลบ (ดึงดูดอิเล็กตรอน)</label>
                <div className="flex flex-col gap-2">
                  {materialsNegative.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setNegMaterial(m.id); setRubbedVoltage(0); }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                        negMaterial === m.id
                          ? 'border-indigo-400 bg-indigo-50/50 text-indigo-800 font-bold'
                          : 'border-slate-100 bg-white/50 hover:border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[14px]">{m.name}</span>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono font-bold">{m.value}</span>
                      </div>
                      <p className="text-[12px] text-slate-500 font-normal leading-tight">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 2: อันตรายจากไฟฟ้าสถิต (ESD) ที่มีผลต่อวงจรอิเล็กทรอนิกส์
            ────────────────────────────────────────────────────────────────── */}
        <section id="section-esd-danger" className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
              <h3 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                อันตรายจากไฟฟ้าสถิตที่มีผลต่อวงจรอิเล็กทรอนิกส์
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl">
              ไฟฟ้าสถิต (Electrostatic Discharge - ESD) คือการถ่ายเทประจุไฟฟ้าอย่างรวดเร็วระหว่างวัตถุสองชิ้นที่มีศักย์ไฟฟ้าต่างกัน วงจรรวม (IC) และทรานซิสเตอร์บนชิปประมวลผลยุคใหม่มีความหนาแน่นสูงมากและมีชั้นไดอิเล็กตริกบางในระดับนาโนเมตร แรงดันไฟฟ้าสถิตเพียง 100 โวลต์สามารถสปาร์กเจาะทะลุเกตของชิปและทำให้วงจรขาดเสียหายอย่างถาวร
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Image Block */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-amber-100 bg-white/40 flex flex-col justify-between">
              <img
                src="/images/it/esd_damage.png"
                alt="ความเสียหายของชิปจากไฟฟ้าสถิตภายใต้กล้องจุลทรรศน์"
                className="w-full object-cover h-64 lg:h-full max-h-72 lg:max-h-none"
              />
              <div className="bg-slate-900/90 px-5 py-3 border-t border-white/10">
                <p className="text-white text-[12px] font-medium leading-relaxed">
                  ภาพถ่ายความเสียหายของทรานซิสเตอร์ด้วยกล้องจุลทรรศน์อิเล็กตรอน (SEM) ที่โดนสปาร์กเสียหายเงียบ (Latent Defect)
                </p>
              </div>
            </div>

            {/* Interactive ESD Meter Block */}
            <div className="lg:col-span-7 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[13px] font-black text-amber-600 uppercase tracking-widest block mb-2">
                  ESD VOLTAGE SIMULATOR • เครื่องวัดประจุสะสมของช่าง
                </span>
                <p className="text-[14px] text-zinc-500 mb-4 leading-relaxed">
                  คลิกจำลองสถานการณ์ทางกายภาพของช่าง เพื่อดูการสะสมประจุและการกระจายตัวของโวลต์ในร่างกาย:
                </p>

                {/* Scenario buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {esdScenarios.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedEsdScenario(sc.id)}
                      className={`px-4 py-3 rounded-xl text-left text-[13px] font-bold border-2 transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-between gap-3 ${
                        selectedEsdScenario === sc.id
                          ? sc.status === 'dangerous'
                            ? 'border-rose-400 bg-rose-50/50 text-rose-800'
                            : sc.status === 'warning'
                              ? 'border-amber-400 bg-amber-50/50 text-amber-800'
                              : 'border-emerald-400 bg-emerald-50/50 text-emerald-800'
                          : 'border-slate-100 bg-white/50 text-slate-700 hover:border-slate-200'
                      }`}
                    >
                      <span className="leading-snug">{sc.label}</span>
                      <span className={`text-[11px] font-mono font-black shrink-0 px-2 py-0.5 rounded-md ${
                        sc.voltage > 2000
                          ? 'bg-rose-100 text-rose-700'
                          : sc.voltage > 500
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {sc.voltage}V
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Voltage Gauge */}
              <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className={`w-5 h-5 animate-pulse ${
                      activeScenario.voltage > 2000 ? 'text-rose-500' :
                      activeScenario.voltage > 500 ? 'text-amber-500' : 'text-emerald-500'
                    }`} />
                    <span className="text-[13px] font-bold text-slate-400 tracking-wider">BODY ELECTROSTATIC METER</span>
                  </div>
                  <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                    activeScenario.status === 'dangerous' ? 'bg-rose-500/20 text-rose-400' :
                    activeScenario.status === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {activeScenario.risk}
                  </span>
                </div>

                {/* Meter graphic */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>0V (Ground)</span>
                    <span>100V (ชิปเริ่มพัง)</span>
                    <span>1,500V (เซมิคอนดักเตอร์ไหม้)</span>
                    <span>3,000V+ (ช่างสะดุ้งช็อต)</span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full p-0.5 overflow-hidden flex">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeScenario.voltage > 2000 ? 'bg-gradient-to-r from-amber-500 to-rose-500' :
                        activeScenario.voltage > 500 ? 'bg-gradient-to-r from-emerald-500 to-amber-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.max(3, Math.min(100, (activeScenario.voltage / 3500) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                  <h4 className="text-[14px] font-black text-slate-200 flex items-center gap-2 mb-1.5">
                    <Info className="w-4 h-4 text-cyan-400" />
                    วิเคราะห์ผลกระทบทางวิศวกรรม
                  </h4>
                  <p className="text-[13.5px] text-slate-300 leading-relaxed">
                    {activeScenario.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ESD Fault Types Sub-section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-rose-100 p-6 space-y-2">
              <div className="flex items-center gap-2 text-rose-700">
                <Flame className="w-5 h-5" />
                <h4 className="text-[16px] font-bold">ความล้มเหลวเฉียบพลัน (Catastrophic Failure)</h4>
              </div>
              <p className="text-[14px] text-slate-600 text-slate-600 leading-relaxed">
                เกิดการไหม้ขาดหรือทะลุของสายสลักเชื่อมโยงสัญญาณภายในชิปทันทีหลังจากโดนสปาร์กไฟฟ้าสถิต ส่งผลให้อุปกรณ์ไม่ทำงานโดยสิ้นเชิง เมนบอร์ดหรือแรมเปิดไม่ติด ช่างสามารถใช้เครื่องมือเช็คอาการเสียได้ทันทีเนื่องจากอุปกรณ์มีสถานะเสียชีวิตตายคาที่
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-amber-100 p-6 space-y-2">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertCircle className="w-5 h-5 animate-pulse" />
                <h4 className="text-[16px] font-bold">ความเสียหายแฝงเร้น (Latent Failure / Latent Defect)</h4>
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                ทรานซิสเตอร์หรือเกตชิปไหม้เสียหายเป็นบางส่วนแต่ไม่ถึงกับขาด ชิปยังคงสามารถทำงานส่งสัญญาณได้ตามปกติในกระบวนการเบื้องต้น แต่โครงสร้างซิลิกอนจะเสื่อมประสิทธิภาพอย่างรวดเร็ว ส่งผลให้คอมพิวเตอร์เกิดจอฟ้า (BSOD) หรือค้างอย่างไร้สาเหตุหลังใช้งานไป 2-3 สัปดาห์ ตรวจสอบหาจุดบกพร่องยากมาก
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 3: วิธีการป้องกันและควบคุมไฟฟ้าสถิต
            ────────────────────────────────────────────────────────────────── */}
        <section id="section-esd-prevention" className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
              <h3 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                วิธีการป้องกันและควบคุมไฟฟ้าสถิต
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl">
              เพื่อป้องกันการถ่ายประจุฉับพลันที่สร้างความเสียหายให้แผงวงจร ช่างเทคนิคคอมพิวเตอร์จึงต้องจัดเตรียมสภาพแวดล้อมที่ป้องกันไฟฟ้าสถิต (Static-Safe Workspace) และนำส่งประจุที่สะสมอยู่บนร่างกายไหลระบายลงดินอย่างสม่ำเสมอผ่านสายกราวด์นำไฟ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Theory Cards */}
            <div className="space-y-4">
              {[
                {
                  title: 'สายรัดข้อมือป้องกันไฟฟ้าสถิต (Anti-Static Wrist Strap)',
                  desc: 'อุปกรณ์คลาสสิกที่ประกอบด้วยผ้าสายรัดข้อมือที่มีเส้นใยนำไฟฟ้า สัมผัสกับผิวหนังอย่างแนบสนิท และมีปลายสายปากคีบโลหะเชื่อมต่อเข้ากับจุดกราวด์ของเคสคอมพิวเตอร์เพื่อสลายแรงดันไฟฟ้าสถิตตลอดเวลาการทำงาน',
                  icon: <Shield className="w-6 h-6" />,
                  color: 'indigo'
                },
                {
                  title: 'แผ่นยางรองป้องกันไฟฟ้าสถิต (Anti-Static Mat)',
                  desc: 'แผ่นยางนำไฟฟ้ากึ่งสังเคราะห์สำหรับปูรองบนโต๊ะทำงาน ป้องกันไม่ให้แผงวงจรเมนบอร์ดหรือการ์ดจอสัมผัสกับเนื้อโต๊ะพลาสติกหรือโต๊ะขัดมัน ซึ่งมีประจุไฟฟ้าสถิตและอาจทำให้ขาลายวงจรข้ามจุดส่งไฟฟ้าสปาร์กเสียหาย',
                  icon: <Layers className="w-6 h-6" />,
                  color: 'emerald'
                },
                {
                  title: 'ซองบรรจุอุปกรณ์ป้องกันไฟฟ้าสถิต (ESD Shielding Bag)',
                  desc: 'ซองเคลือบวัสดุคาร์บอน/เมทัลไลซ์โปร่งแสงสีเทา ใช้บรรจุเมนบอร์ด แรม และการ์ดจอจากโรงงาน ป้องกันสนามแม่เหล็กไฟฟ้าและฝุ่นประจุไฟฟ้าภายนอกเจาะเข้าชิ้นส่วนในระหว่างการขนย้าย',
                  icon: <Cpu className="w-6 h-6" />,
                  color: 'cyan'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-200">
                  <div className={`p-3 rounded-xl shrink-0 h-fit ${
                    item.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                    item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-cyan-50 text-cyan-600'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-bold text-slate-800">{item.title}</h4>
                    <p className="text-[14px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Guide Mat */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-100 bg-white/40">
              <img
                src="/images/it/esd_prevention.png"
                alt="การสวมใส่สายรัดข้อมือกันไฟฟ้าสถิตเชื่อมต่อเคส"
                className="w-full object-cover max-h-96"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent px-6 py-4">
                <p className="text-white text-[13px] font-semibold">การต่อพ่วงที่ถูกต้อง — ตัวปากคีบคลิปหนีบเข้ากับมุมโลหะของโครงเหล็กเคสโดยไม่มีสีเคลือบขวางการเหนี่ยวนำประจุ</p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 4: ความปลอดภัยเกี่ยวกับไฟฟ้ากระแสสลับ
            ────────────────────────────────────────────────────────────────── */}
        <section id="section-ac-safety" className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-rose-500 rounded-full" />
              <h3 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ความปลอดภัยเกี่ยวกับไฟฟ้ากระแสสลับในงานคอมพิวเตอร์
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl">
              แรงดันไฟฟ้ากระแสสลับ 220V AC 50Hz ที่ส่งเข้ามายังแหล่งจ่ายไฟหลัก (PSU) ของระบบ มีระดับไฟฟ้าช็อตที่สามารถทำให้หัวใจหยุดเต้นและเป็นอันตรายถึงแก่ชีวิต การเข้าใจขอบข่ายการติดตั้งและการถอดสายไฟก่อนทำงานกับชิ้นส่วนตัวนำจึงเป็นเกณฑ์ความปลอดภัยขั้นวิชาชีพ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Image Guide */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-rose-100 bg-white/40 flex flex-col justify-between">
              <img
                src="/images/it/ac_safety.png"
                alt="ป้ายเตือนไฟฟ้าแรงดันสูงและการถอดปลั๊ก AC"
                className="w-full object-cover h-64 lg:h-full max-h-72 lg:max-h-none"
              />
              <div className="bg-slate-900/90 px-5 py-3 border-t border-white/10">
                <p className="text-white text-[12px] font-medium leading-relaxed">
                  ป้ายสัญลักษณ์สากลเตือนแรงดันไฟฟ้าสูงภายในกล่องฝาครอบพาวเวอร์ซัพพลาย (PSU Closed Case)
                </p>
              </div>
            </div>

            {/* Critical Rules Panel */}
            <div className="lg:col-span-7 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-[14px] font-black uppercase tracking-wider">SAFETY PROTOCOLS • กฎเหล็กความปลอดภัย</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex gap-3 items-start p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                    <span className="text-rose-600 font-bold shrink-0 text-base">⚠️ กฎข้อที่ 1</span>
                    <p className="text-[14px] text-rose-900 leading-relaxed">
                      <strong>ถอดสายไฟ AC 220V เสมอก่อนแตะต้องชิ้นส่วนในเครื่อง:</strong> การปิดเฉพาะสวิตช์หน้าเคสจะยังคงมีแรงดันไฟ Standby Power (5VSB) ส่งมาจากพาวเวอร์ซัพพลายตลอดเวลา ซึ่งสามารถช็อตเมนบอร์ดเสียหายหรือช็อตผู้ปฏิบัติงานได้หากไขควงเผลอสัมผัส
                    </p>
                  </div>

                  <div className="flex gap-3 items-start p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                    <span className="text-rose-600 font-bold shrink-0 text-base">⚠️ กฎข้อที่ 2</span>
                    <p className="text-[14px] text-rose-900 leading-relaxed">
                      <strong>ห้ามแกะรื้อฝาครอบตัวพาวเวอร์ซัพพลาย (PSU) เด็ดขาด:</strong> ภายในพาวเวอร์ซัพพลายประกอบด้วยตัวเก็บประจุแรงดันสูง (Capacitors) ขนาดใหญ่ ซึ่งทำหน้าที่เก็บสะสมไฟฟ้ากระแสตรงแรงสูงกว่า 300V-400V เอาไว้ได้นานหลายชั่วโมงหรือเป็นวันแม้จะถอดปลั๊กไปแล้ว หากสัมผัสอาจโดนช็อตเสียชีวิตทันที
                    </p>
                  </div>

                  <div className="flex gap-3 items-start p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                    <span className="text-indigo-600 font-bold shrink-0 text-base">ℹ️ ระบบสายดิน (Grounding)</span>
                    <p className="text-[14px] text-indigo-900 leading-relaxed">
                      <strong>สายดินและความปลอดภัยโครงเคส:</strong> ปลั๊กไฟแบบ 3 ขา (มีช่อง Ground) ช่วยระบายกระแสรั่วไหลจากโครงโลหะเคสลงดิน หากเต้ารับไม่มีสายดิน กระแสไฟจะสะสมที่ตัวถังโลหะสูงถึง 110V AC ทำให้ช่างสะดุ้งช็อตเมื่อแตะ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 5: เครื่องจำลองการจัดการเครื่องมือและป้องกันไฟฟ้าสถิต (Workbench Simulator)
            ────────────────────────────────────────────────────────────────── */}
        <section id="section-workbench-simulator" className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
              <h3 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                เครื่องจำลองการจัดการเครื่องมือและป้องกันไฟฟ้าสถิต
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl">
              ทดลองสวมบทบาทเป็นช่างเทคนิคคอมพิวเตอร์ในการดำเนินการจัดซ่อมตามภารกิจ 5 ลำดับ คุณต้องจัดการเคลียร์ระบบไฟฟ้ากระแสสลับ (AC Plug) และจัดการประจุไฟฟ้าสถิตบนร่างกายเพื่อปกป้องบอร์ดและอุปกรณ์จากอันตราย ESD ก่อนเลือกเครื่องมือประกอบให้ถูกต้องตรงงาน
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Workbench Visual Board (SVG) */}
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
              {/* Circuit ambient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[12px] font-mono font-bold text-slate-400">VIRTUAL WORKBENCH ACTIVE</span>
                </div>
                <div className="flex gap-2">
                  <div className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${acPlugged ? 'bg-red-950 text-red-400 border border-red-900' : 'bg-slate-800 text-slate-400'}`}>
                    AC: {acPlugged ? 'PLUGGED' : 'UNPLUGGED'}
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${wristStrapConnected ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-slate-800 text-slate-400'}`}>
                    ESD: {wristStrapConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${wallGroundConnected ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-rose-950 text-rose-400 border border-rose-900'}`}>
                    GROUND: {wallGroundConnected ? 'YES' : 'NO'}
                  </div>
                </div>
              </div>

              {/* Graphic Display Area (SVG) */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-center min-h-[300px] z-10 relative">
                
                {/* Status Overlay animation (Shocked/ESD spark) */}
                {simulationStatus === 'shocked' && (
                  <div className="absolute inset-0 bg-red-900/50 backdrop-blur-xs flex flex-col items-center justify-center z-30 animate-pulse rounded-2xl">
                    <Zap className="w-16 h-16 text-yellow-400 animate-bounce" />
                    <span className="text-white font-black text-[18px] mt-2">DANGER: ไฟฟ้ารั่วช็อตช่าง!</span>
                    <span className="text-red-200 text-xs mt-1">กรุณากดปุ่ม Reset เพื่อเริ่มงานใหม่</span>
                  </div>
                )}
                {simulationStatus === 'voltage_leak' && (
                  <div className="absolute inset-0 bg-rose-900/60 backdrop-blur-xs flex flex-col items-center justify-center z-30 animate-pulse rounded-2xl">
                    <AlertTriangle className="w-16 h-16 text-rose-400 animate-bounce" />
                    <span className="text-white font-black text-[18px] mt-2">SHOCK: ไฟรั่ว 110V ดูดช่าง!</span>
                    <span className="text-rose-200 text-xs mt-1">เต้ารับไม่มีสายดิน กระแสรั่วลงผิวหนังสั่นสะดุ้ง (กด Reset)</span>
                  </div>
                )}
                {simulationStatus === 'esd_damage' && (
                  <div className="absolute inset-0 bg-amber-950/50 backdrop-blur-xs flex flex-col items-center justify-center z-30 animate-pulse rounded-2xl">
                    <Flame className="w-16 h-16 text-amber-500 animate-bounce" />
                    <span className="text-white font-black text-[18px] mt-2">ESD FAIL: อุปกรณ์ช็อตเสียหาย!</span>
                    <span className="text-amber-200 text-xs mt-1">ประจุลัดวงจรชิปพังแล้ว (กด Reset)</span>
                  </div>
                )}

                {/* Multimeter Overlay Screen if Tool is Multimeter */}
                {selectedTool === 'multimeter' && (
                  <div className="absolute bottom-4 right-4 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-xl z-20 w-36 font-mono text-center">
                    <span className="text-[9px] text-slate-400 block mb-0.5">DMM DISPLAY</span>
                    <div className="bg-yellow-400 text-slate-950 font-black text-base py-1 px-2 rounded tracking-wider shadow-inner">
                      {acPlugged && psuOn
                        ? !wallGroundConnected ? '110.2 V AC' : '0.18 V AC'
                        : '0.00 V AC'}
                    </div>
                    <span className="text-[8px] text-slate-500 block mt-1">MODE: AC VOLTAGE (V~)</span>
                  </div>
                )}

                <svg viewBox="0 0 500 300" className="w-full max-w-[450px] h-auto">
                  <rect width="500" height="300" fill="url(#grid)" rx="8" />

                  {/* 1. AC Wall Outlet (Left) */}
                  <rect x="20" y="30" width="40" height="60" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="40" cy="45" r="4" fill="#0f172a" />
                  <circle cx="40" cy="57" r="4" fill="#0f172a" />
                  {/* Ground Slot hole */}
                  <circle cx="40" cy="69" r="3" fill={wallGroundConnected ? '#10b981' : '#0f172a'} />
                  <text x="40" y="84" fontSize="6.5" fill="#64748b" textAnchor="middle">220V AC</text>

                  {/* 2. ESD Rubber Mat (Center Table) */}
                  {esdMatDeployed ? (
                    <rect x="110" y="110" width="280" height="150" rx="10" fill="#065f46" stroke="#047857" strokeWidth="2" opacity="0.8" className="transition-all duration-300" />
                  ) : (
                    <rect x="110" y="110" width="280" height="150" rx="10" fill="#334155" stroke="#475569" strokeWidth="1" opacity="0.3" className="transition-all duration-300" />
                  )}
                  <text x="250" y="250" fontSize="8" fill="#64748b" textAnchor="middle" opacity="0.6">
                    {esdMatDeployed ? 'GREEN ESD WORK MAT (GROUNDED)' : 'UNPROTECTED WOOD WORKBENCH'}
                  </text>

                  {/* 3. Computer Case (Right Back) */}
                  <g transform="translate(360, 20)">
                    {/* Metal Case body */}
                    <rect width="110" height="150" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    {/* Interior bay line */}
                    <rect x="10" y="10" width="90" height="130" rx="3" fill="#1e293b" stroke="#334155" />
                    <text x="55" y="25" fontSize="7.5" fill="#94a3b8" textAnchor="middle" fontWeight="bold">COMPUTER CASE</text>
                    
                    {/* PSU representation */}
                    <rect x="15" y="105" width="80" height="30" rx="3" fill="#0f172a" stroke="#475569" />
                    <circle cx="75" cy="120" r="6" fill="#1e293b" />
                    
                    {/* AC Inlet Plug on Case */}
                    <rect x="3" y="115" width="12" height="10" fill="#334155" />
                    
                    {/* Grounding terminal label on Case */}
                    <circle cx="95" cy="120" r="3" fill="#e2e8f0" />
                    <text x="95" y="114" fontSize="6.5" fill="#f8fafc" textAnchor="middle">GND</text>

                    {/* Mounted Motherboard (Condition visual) */}
                    {motherboardMounted && (
                      <g transform="translate(15, 35)">
                        <rect width="80" height="65" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
                        <circle cx="40" cy="32" r="8" fill="#0284c7" stroke="#bae6fd" />
                        <line x1="15" y1="15" x2="35" y2="15" stroke="#bae6fd" strokeWidth="3" />
                        {/* Screws */}
                        <circle cx="5" cy="5" r="2" fill="#94a3b8" />
                        <circle cx="75" cy="5" r="2" fill="#94a3b8" />
                        <circle cx="5" cy="60" r="2" fill="#94a3b8" />
                        <circle cx="75" cy="60" r="2" fill="#94a3b8" />
                      </g>
                    )}
                  </g>

                  {/* 4. Motherboard on Mat (When not mounted) */}
                  {!motherboardMounted && (
                    <g transform="translate(140, 125)">
                      {/* PCB body */}
                      <rect width="180" height="110" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                      
                      {/* CPU Socket */}
                      <rect x="25" y="30" width="40" height="40" rx="4" fill="#1e293b" stroke="#475569" />
                      <rect x="30" y="35" width="30" height="30" fill="#f8fafc" opacity="0.8" />
                      
                      {/* CPU Thermal Paste Layer */}
                      {pasteApplied && (
                        <circle cx="45" cy="50" r="6" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
                      )}

                      {/* CPU Fan (Clean or Dirty) */}
                      <circle cx="45" cy="50" r="16" fill="rgba(15,23,42,0.6)" stroke="#e2e8f0" strokeWidth="1.5" />
                      <line x1="33" y1="38" x2="57" y2="62" stroke="#e2e8f0" strokeWidth="2" />
                      <line x1="57" y1="38" x2="33" y2="62" stroke="#e2e8f0" strokeWidth="2" />
                      
                      {!fanCleaned && (
                        <g fill="#555" opacity="0.8">
                          <circle cx="40" cy="40" r="3.5" />
                          <circle cx="50" cy="40" r="2.5" />
                          <circle cx="45" cy="55" r="3.5" />
                          <circle cx="35" cy="50" r="2.5" />
                        </g>
                      )}

                      {/* RAM Slots */}
                      <rect x="85" y="20" width="8" height="65" fill="#0f172a" rx="1" />
                      <rect x="98" y="20" width="8" height="65" fill="#0f172a" rx="1" />
                      
                      {/* Installed RAM module */}
                      {ramInstalled && (
                        <g transform="translate(98, 20)">
                          <rect width="8" height="65" fill="#10b981" rx="1" stroke="#34d399" strokeWidth="1" />
                          <rect x="2" y="10" width="4" height="8" fill="#000" />
                          <rect x="2" y="25" width="4" height="8" fill="#000" />
                          <rect x="2" y="40" width="4" height="8" fill="#000" />
                        </g>
                      )}

                      <text x="90" y="100" fontSize="7.5" fill="#93c5fd" fontWeight="bold">MOTHERBOARD V1.0</text>
                    </g>
                  )}

                  {/* 5. AC Cable (SVG Line from socket to Case PSU) */}
                  {acPlugged && (
                    <path d="M 60,55 L 100,55 L 100,95 L 340,95 L 340,135 L 363,135" 
                          fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                  )}

                  {/* 6. ESD Wrist Strap Connection wire */}
                  {wristStrapConnected && (
                    <path d="M 220,285 L 220,270 L 455,270 L 455,140" 
                          fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />
                  )}

                  {/* 7. Technician Hand (Left Side) */}
                  <g transform="translate(180, 275)">
                    <circle cx="20" cy="10" r="10" fill="#fbcfe8" stroke="#db2777" />
                    <text x="20" y="13" fontSize="8" fill="#db2777" textAnchor="middle" fontWeight="bold">ช่าง</text>
                    {wristStrapConnected && (
                      <circle cx="20" cy="10" r="11" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                    )}
                  </g>

                  {/* 8. Multimeter probes if selected */}
                  {selectedTool === 'multimeter' && (
                    <g>
                      {/* Black Probe going to GND */}
                      <path d="M 450,140 L 440,160 L 435,260 L 420,285" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 1" />
                      <circle cx="455" cy="140" r="2.5" fill="#EF4444" />
                      {/* Red Probe on chassis */}
                      <path d="M 370,80 L 320,120 L 220,285" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="2 1" />
                      <circle cx="370" cy="80" r="2.5" fill="#e2e8f0" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Console log screen */}
              <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[13px] text-slate-300">
                <p className="text-slate-400 font-bold border-b border-slate-800 pb-1.5 mb-2 flex items-center justify-between">
                  <span>LOG CONSOLE SCREEN</span>
                  <span className="text-[10px] text-emerald-500 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">SYSTEM STABLE</span>
                </p>
                <div className="h-28 overflow-y-auto space-y-1 select-none leading-relaxed flex flex-col-reverse">
                  {simulationLogs.map((log, index) => (
                    <div key={index} className={`text-left ${
                      log.includes('✔️') ? 'text-emerald-400' :
                      log.includes('❌') ? 'text-red-400 font-bold' :
                      log.includes('ข้อบกพร่อง') ? 'text-amber-400' : 'text-slate-300'
                    }`}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Controller Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Task list and current step status */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-4">
                <span className="text-[13px] font-black text-indigo-600 uppercase tracking-widest block">
                  ACTIVE TASK CHECKLIST
                </span>

                <div className="space-y-2">
                  {tasksList.map((tsk, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
                        idx === currentTaskIndex
                          ? 'border-indigo-200 bg-indigo-50/70 shadow-sm'
                          : idx < currentTaskIndex
                            ? 'border-emerald-100 bg-emerald-50/30 opacity-70'
                            : 'border-slate-100 bg-white/20 opacity-50'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {idx < currentTaskIndex ? (
                          <Check className="w-4 h-4 text-emerald-600 font-black" />
                        ) : idx === currentTaskIndex ? (
                          <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300" />
                        )}
                      </div>
                      <div className="space-y-0.5 text-left">
                        <h4 className={`text-[13.5px] font-bold ${
                          idx === currentTaskIndex ? 'text-indigo-900' :
                          idx < currentTaskIndex ? 'text-emerald-800 line-through' : 'text-slate-500'
                        }`}>
                          {tsk.title}
                        </h4>
                        {idx === currentTaskIndex && (
                          <p className="text-[12px] text-indigo-700/80 leading-relaxed font-medium">
                            {tsk.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety switch controls */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-4">
                <span className="text-[13px] font-black text-indigo-600 uppercase tracking-widest block">
                  ENVIRONMENT SAFETY CONTROLS
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {/* AC Outlet Power Cord Switch */}
                  <button
                    onClick={() => {
                      setAcPlugged(prev => !prev);
                      addLog(acPlugged ? 'ดึงปลั๊กไฟ AC 220V ออกจากช่องกำแพง' : 'เสียบปลั๊กไฟ AC 220V เข้ากับตัวเต้ารับ');
                    }}
                    className={`px-3 py-2.5 rounded-xl border-2 font-bold text-[13px] transition-all cursor-pointer text-center active:scale-[0.98] ${
                      acPlugged 
                        ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    🔌ปลั๊ก AC: {acPlugged ? 'เสียบคาไว้' : 'ถอดปลั๊กออก'}
                  </button>

                  {/* PSU Toggle Switch */}
                  <button
                    onClick={() => {
                      setPsuOn(prev => !prev);
                      addLog(psuOn ? 'สับสวิตช์หลัง PSU เป็นตำแหน่ง OFF' : 'สับสวิตช์หลัง PSU เป็นตำแหน่ง ON');
                    }}
                    className={`px-3 py-2.5 rounded-xl border-2 font-bold text-[13px] transition-all cursor-pointer text-center active:scale-[0.98] ${
                      psuOn 
                        ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    ⚡สวิตช์ PSU: {psuOn ? 'เปิด (I)' : 'ปิด (O)'}
                  </button>

                  {/* Wrist Strap connection toggle */}
                  <button
                    onClick={() => setWristStrapConnected(prev => !prev)}
                    className={`px-3 py-2.5 rounded-xl border-2 font-bold text-[13px] transition-all cursor-pointer text-center active:scale-[0.98] ${
                      wristStrapConnected 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    ⛓️สายรัดข้อมือ: {wristStrapConnected ? 'คีบกราวด์' : 'ปล่อยว่าง'}
                  </button>

                  {/* ESD Mat deployment toggle */}
                  <button
                    onClick={() => {
                      setEsdMatDeployed(prev => !prev);
                      addLog(esdMatDeployed ? 'เก็บแผ่นยางรองกันไฟฟ้าสถิตออก' : 'ปูแผ่นยางรองกันไฟฟ้าสถิต (ESD Mat) บนโต๊ะ');
                    }}
                    className={`px-3 py-2.5 rounded-xl border-2 font-bold text-[13px] transition-all cursor-pointer text-center active:scale-[0.98] ${
                      esdMatDeployed 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    🟢แผ่นรอง ESD: {esdMatDeployed ? 'ปูแล้ว' : 'โต๊ะไม้เปลือย'}
                  </button>

                  {/* Wall outlet Ground configuration switch (New Addon) */}
                  <button
                    onClick={() => {
                      setWallGroundConnected(prev => !prev);
                      addLog(wallGroundConnected ? 'ตัดการต่อระบบสายดิน (Earth Ground) ของเต้ารับที่ผนัง' : 'ต่อระบบสายดินจริงของเต้ารับที่ผนัง');
                    }}
                    className={`col-span-2 px-3 py-2.5 rounded-xl border-2 font-bold text-[13px] transition-all cursor-pointer text-center active:scale-[0.98] ${
                      wallGroundConnected 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    🔌 สายดินเต้ารับที่ผนัง: {wallGroundConnected ? 'ต่อจริง (มีกราวด์)' : 'ไม่มีสายดินจริง (เสี่ยงไฟรั่ว!)'}
                  </button>
                </div>
              </div>

              {/* Tool Chest Selector & Run Action */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-4">
                <span className="text-[13px] font-black text-indigo-600 uppercase tracking-widest block">
                  TOOL CHEST • เลือกใช้เครื่องมือช่าง
                </span>

                {/* Tool chest grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'screwdriver', icon: '🪛', label: 'ไขควง' },
                    { id: 'paste', icon: '🧪', label: 'ซิลิโคน' },
                    { id: 'brush', icon: '💨', label: 'แปรง' },
                    { id: 'multimeter', icon: '⚡', label: 'มัลติมิเตอร์' },
                    { id: 'none', icon: '🖐️', label: 'มือเปล่า' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedTool(t.id);
                        addLog(`ช่างหยิบชิ้นงานเครื่องมือ: [${t.label}]`);
                      }}
                      className={`py-2 rounded-xl border text-[13px] font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-[0.95] ${
                        selectedTool === t.id
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-extrabold ring-1 ring-indigo-400'
                          : 'border-slate-100 bg-white/50 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Run button */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handlePerformTask}
                    className="flex-1 h-[46px] bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] rounded-xl font-bold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    เริ่มลงมือปฏิบัติงาน (Perform Task)
                  </button>

                  <button
                    onClick={resetSimulation}
                    className="w-12 h-[46px] border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-xl cursor-pointer transition-all flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 6: แบบประเมินตนเองหลังเรียน
            ────────────────────────────────────────────────────────────────── */}
        <section id="section-quiz" className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
              <h3 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                แบบประเมินและทบทวนความรู้บทเรียน
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed max-w-4xl">
              ทดสอบความเข้าใจเกี่ยวกับประเภทเครื่องมือช่าง วิธีการทำงานของระบบไฟฟ้าสถิต และกฎเกณฑ์ความปลอดภัยเพื่อเตรียมความพร้อมในการประกอบเครื่องคอมพิวเตอร์จริง
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-2 shadow-xl">
            <QuizEngine questions={quizQuestions} />
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            LAYER 4: Standardized TeacherTask Footer
            ────────────────────────────────────────────────────────────────── */}
        <TeacherTask
          title="ใบงานบำรุงรักษา: จัดเตรียมคู่มือความปลอดภัยและเลือกชุดเครื่องมือช่าง"
          taskText="ให้ผู้เรียนเข้าคู่ปฏิบัติงานจำลองและร่าง 'เอกสารคู่มือความปลอดภัยในการประกอบเครื่องและป้องกันไฟฟ้าสถิต (ESD Best Practice Handbook)' สำหรับห้องบริการไอทีธุรกิจ โดยต้องมีเนื้อหาครอบคลุม:
1. การระบุชุดเครื่องมือช่าง 6 ชนิดหลักพร้อมข้อห้ามการใช้งานอย่างมีเหตุผลทางฟิสิกส์ รวมถึงข้อแตกต่างระหว่างความล้มเหลวเฉียบพลัน (Catastrophic) และความชำรุดแฝงเร้น (Latent Defect)
2. การอธิบายกลไกการเกิดประจุไฟฟ้าสถิตตามตาราง Triboelectric Series และขั้นตอนการตรวจวัดไฟรั่วตัวเคสด้วยมัลติมิเตอร์
3. ข้อควรระวังในการทดสอบแรงดัน AC 220V และระบบสายดิน Grounding ของโครงสร้างเคสโลหะอย่างละเอียด"
        />

      </main>
      
      {/* Styles Injection for Triboelectric Lab animation */}
      <style>{`
        @keyframes flowRight {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
