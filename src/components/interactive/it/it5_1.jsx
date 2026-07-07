import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Layers, 
  Send, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  HelpCircle, 
  Shield, 
  Cpu, 
  Server, 
  Cable, 
  FileCode, 
  CheckCircle2,
  Lock,
  Binary,
  ArrowLeftRight,
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { QuizEngine } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// ─── Custom CSS Animations and Styles ───
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(0.95); opacity: 0.5; }
    }
    @keyframes flow-bits {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -40; }
    }
    @keyframes blob-drift {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(25px, -25px) scale(1.05); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
    .animate-flow-bits { animation: flow-bits 1.5s linear infinite; }
    .animate-drift { animation: blob-drift 15s ease-in-out infinite; }
    
    .glass-panel {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.03);
    }
    .dark-panel-left {
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .dark-panel-right {
      background: rgba(2, 6, 23, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
  `}} />
);

// ─── Data: OSI 7 Layers Detailed Textbook Definitions ───
const OSI_LAYERS_DATA = [
  {
    layerNumber: 7,
    nameTH: 'ชั้นแอปพลิเคชัน',
    nameEN: 'Application Layer',
    pdu: 'Data (ข้อมูล)',
    accent: 'violet',
    textClass: 'text-violet-650',
    bgLight: 'bg-violet-50/60',
    borderClass: 'border-violet-200/60',
    leftBorder: 'border-l-violet-500',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-100',
    description: 'เป็นชั้นที่อยู่ใกล้ตัวผู้ใช้มากที่สุด ทำหน้าที่เป็นตัวกลางในการเชื่อมต่อระหว่างผู้ใช้งาน (User) หรือแอปพลิเคชันซอฟต์แวร์ กับระบบเครือข่าย โดยจะรับคำสั่งและส่งผ่านข้อมูลไปยังโปรแกรมใช้งานปลายทาง',
    functions: [
      'ให้บริการอินเทอร์เฟซแก่แอปพลิเคชันต่างๆ เช่น เว็บบราวเซอร์, โปรแกรมอีเมล',
      'ระบุตัวตนและตรวจสอบความพร้อมใช้งานของคู่สนทนาปลายทาง',
      'จัดการความยินยอมและความปลอดภัยในการแลกเปลี่ยนข้อมูล'
    ],
    protocols: ['HTTP (Web)', 'HTTPS (Secure Web)', 'FTP (File Transfer)', 'SMTP (Email)', 'DNS (Name Resolution)', 'DHCP (Auto IP)'],
    hardware: ['Gateway (เกตเวย์)', 'Firewall (ไฟร์วอลล์ระดับแอปพลิเคชัน)', 'คอมพิวเตอร์ลูกข่าย/แม่ข่าย (Host)']
  },
  {
    layerNumber: 6,
    nameTH: 'ชั้นนำเสนอข้อมูล',
    nameEN: 'Presentation Layer',
    pdu: 'Data (ข้อมูล)',
    accent: 'cyan',
    textClass: 'text-cyan-650',
    bgLight: 'bg-cyan-50/60',
    borderClass: 'border-cyan-200/60',
    leftBorder: 'border-l-cyan-500',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    description: 'ทำหน้าที่เสมือน "ล่ามแปลภาษา" ประจำระบบเครือข่าย มีหน้าที่แปลงรูปแบบข้อมูล (Syntax) ให้คอมพิวเตอร์ทั้งสองฝั่งเข้าใจตรงกัน พร้อมทั้งดูแลเรื่องความปลอดภัยและการจัดเก็บข้อมูลให้มีประสิทธิภาพก่อนส่งออกไป',
    functions: [
      'การแปลงรหัสข้อมูล (Data Translation/Formatting) เช่น ASCII, EBCDIC, Unicode',
      'การเข้ารหัสและถอดรหัสข้อมูล (Encryption/Decryption) เพื่อความปลอดภัย (เช่น SSL/TLS)',
      'การบีบอัดข้อมูล (Data Compression) เพื่อลดขนาดข้อมูลก่อนส่ง ช่วยประหยัดแบนด์วิธ'
    ],
    protocols: ['SSL/TLS (ระบบความปลอดภัย)', 'ASCII/Unicode', 'JPEG/PNG/GIF (รูปภาพ)', 'MPEG/MP4 (วิดีโอ)', 'JSON/XML'],
    hardware: ['ซอฟต์แวร์ระดับระบบปฏิบัติการ', 'การ์ดเร่งความเร็วการเข้ารหัสข้อมูล']
  },
  {
    layerNumber: 5,
    nameTH: 'ชั้นควบคุมเซสชัน',
    nameEN: 'Session Layer',
    pdu: 'Data (ข้อมูล)',
    accent: 'pink',
    textClass: 'text-pink-650',
    bgLight: 'bg-pink-50/60',
    borderClass: 'border-pink-200/60',
    leftBorder: 'border-l-pink-500',
    badgeClass: 'bg-pink-50 text-pink-700 border-pink-100',
    description: 'ทำหน้าที่จัดการเกี่ยวกับการเชื่อมต่อในการสื่อสาร (Session) โดยเป็นผู้เริ่มต้น (Establish) ดูแลรักษา (Maintain) และยุติการเชื่อมต่อ (Terminate) ระหว่างแอปพลิเคชันที่ทำงานบนอุปกรณ์คนละเครื่องกัน',
    functions: [
      'ควบคุมการสนทนา (Dialogue Control) กำหนดว่าฝั่งใดจะส่งหรือรับข้อมูลในเวลานั้นๆ (Simplex, Half-Duplex, Full-Duplex)',
      'ประสานเวลาและการทำงาน (Synchronization) โดยใส่จุดตรวจสอบ (Checkpoint) ในข้อมูล เพื่อให้สามารถกู้คืนระบบกลับมาส่งต่อจากจุดล่าสุดได้หากการเชื่อมต่อหลุด'
    ],
    protocols: ['NetBIOS', 'RPC (Remote Procedure Call)', 'SQL Session Management', 'PPTP (Vpn Connection)', 'AppleTalk Session Protocol'],
    hardware: ['ระบบปฏิบัติการเครือข่าย (Network OS)', 'ไคลเอนต์/เซิร์ฟเวอร์ซอฟต์แวร์']
  },
  {
    layerNumber: 4,
    nameTH: 'ชั้นนำส่งข้อมูล',
    nameEN: 'Transport Layer',
    pdu: 'Segment / Datagram',
    accent: 'indigo',
    textClass: 'text-indigo-650',
    bgLight: 'bg-indigo-50/60',
    borderClass: 'border-indigo-200/60',
    leftBorder: 'border-l-indigo-500',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    description: 'ทำหน้าที่ดูแลการส่งข้อมูลแบบต้นทางถึงปลายทาง (End-to-End Delivery) จากแอปพลิเคชันผู้ส่งไปยังแอปพลิเคชันผู้รับอย่างถูกต้อง รับผิดชอบในการแบ่งซอยข้อมูลขนาดใหญ่เป็นชิ้นเล็กๆ และควบคุมคุณภาพการไหลไม่ให้ข้อมูลสูญหาย',
    functions: [
      'แบ่งส่วนข้อมูล (Segmentation) ฝั่งผู้ส่ง และรวบรวมข้อมูลกลับคืน (Reassembly) ฝั่งผู้รับ',
      'ควบคุมการไหลของข้อมูล (Flow Control) ป้องกันไม่ให้ส่งข้อมูลเร็วเกินกว่าที่ผู้รับจะรับไหว',
      'ควบคุมข้อผิดพลาด (Error Control) และกู้คืนข้อมูล โดยการส่งข้อมูลใหม่หากส่วนเดิมเสียหาย',
      'ระบุโปรเซสผ่านหมายเลขพอร์ต (Port Addressing) เช่น Port 80 สำหรับ HTTP'
    ],
    protocols: ['TCP (เน้นความถูกต้อง เสถียรสูง มี Handshake)', 'UDP (เน้นความเร็วเป็นหลัก ไม่รอเช็คผลตอบรับ เช่น Streaming/VoIP)'],
    hardware: ['Firewall (ไฟร์วอลล์ตรวจสอบพอร์ต)', 'Layer 4 Load Balancer', 'ระบบเครือข่ายในตัวระบบปฏิบัติการ (TCP Stack)']
  },
  {
    layerNumber: 3,
    nameTH: 'ชั้นเครือข่าย',
    nameEN: 'Network Layer',
    pdu: 'Packet (แพ็กเกจ)',
    accent: 'emerald',
    textClass: 'text-emerald-650',
    bgLight: 'bg-emerald-50/60',
    borderClass: 'border-emerald-200/60',
    leftBorder: 'border-l-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    description: 'ทำหน้าที่นำส่งข้อมูลข้ามเครือข่าย (Logical Addressing) จากผู้ส่งไปยังผู้รับที่อาจจะอยู่คนละวงแลนกัน รับผิดชอบในการระบุที่อยู่ IP และหาเส้นทางที่รวดเร็วและปลอดภัยที่สุดในการส่งข้อมูลผ่านอุปกรณ์โครงข่าย',
    functions: [
      'กำหนดตำแหน่งที่อยู่ตรรกะ (Logical Addressing) ผ่านระบบหมายเลข IP Address',
      'การเลือกเส้นทาง (Routing) โดยใช้อัลกอริทึมคำนวณและเลือกเส้นทางที่ดีที่สุดผ่านเราเตอร์',
      'การแปลงสายแพ็กเกจข้ามเครือข่ายที่มีมาตรฐานต่างกัน (Fragmentation)'
    ],
    protocols: ['IP (IPv4 / IPv6)', 'ICMP (โปรโตคอลแจ้งเตือน/ทดสอบ เช่น Ping)', 'IPsec (ความปลอดภัย IP)', 'OSPF / BGP (โปรโตคอลกำหนดเส้นทางเราเตอร์)'],
    hardware: ['Router (เราเตอร์)', 'Layer 3 Switch (สวิตช์เลเยอร์ 3)', 'เครือข่ายคลาวด์เกตเวย์']
  },
  {
    layerNumber: 2,
    nameTH: 'ชั้นเชื่อมโยงข้อมูล',
    nameEN: 'Data Link Layer',
    pdu: 'Frame (เฟรม)',
    accent: 'orange',
    textClass: 'text-orange-650',
    bgLight: 'bg-orange-50/60',
    borderClass: 'border-orange-200/60',
    leftBorder: 'border-l-orange-500',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-100',
    description: 'ทำหน้าที่ควบคุมการส่งข้อมูลระหว่างอุปกรณ์ที่เชื่อมต่อกันทางกายภาพโดยตรงภายในเครือข่ายแลนเดียวกัน (Local Area Network) แปลงสัญญาณไฟฟ้าดิบให้เป็นกลุ่มข้อมูลที่มีความหมาย และตรวจเช็คความผิดพลาดของระดับสัญญาณพอร์ต',
    functions: [
      'กำหนดที่อยู่ทางกายภาพ (Physical Addressing) โดยระบุหมายเลข MAC Address ของการ์ดเครือข่าย',
      'จัดระเบียบเฟรมข้อมูล (Framing) โดยการแบ่งข้อมูลระดับ IP Packet ให้มีส่วนหัวและส่วนท้ายเฟรม',
      'ควบคุมการเข้าถึงสื่อกลางสื่อสาร (Media Access Control - MAC)',
      'ตรวจหาข้อผิดพลาดทางกายภาพ (Error Detection) ผ่านการใส่รหัสท้ายเฟรมตรวจสอบความถูกต้อง (FCS / CRC)'
    ],
    protocols: ['Ethernet (สายแลน)', 'Wi-Fi (IEEE 802.11 ทางกายภาพเบื้องต้น)', 'ARP (ค้นหา MAC Address จาก IP)', 'PPP (Point-to-Point Protocol)', 'VLAN (IEEE 802.1Q)'],
    hardware: ['Switch Layer 2 (สวิตช์เลเยอร์ 2)', 'Bridge (บริดจ์)', 'NIC (การ์ดเครือข่ายคอมพิวเตอร์ - ฝั่งทำงานควบคุม MAC)']
  },
  {
    layerNumber: 1,
    nameTH: 'ชั้นกายภาพ',
    nameEN: 'Physical Layer',
    pdu: 'Bits (บิต)',
    accent: 'rose',
    textClass: 'text-rose-650',
    bgLight: 'bg-rose-50/60',
    borderClass: 'border-rose-200/60',
    leftBorder: 'border-l-rose-500',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-100',
    description: 'ชั้นล่างสุดของแบบจำลอง รับผิดชอบในการรับและส่งกระแสบิตข้อมูลดิจิทัลดิบ (เลข 0 และ 1) ผ่านสื่อกลางทางกายภาพ เช่น สายไฟ สายไฟเบอร์ออปติก หรือคลื่นความถี่วิทยุ โดยไม่ได้สนใจความหมายของข้อมูลนั้นๆ',
    functions: [
      'กำหนดลักษณะทางกายภาพและกลไกของขั้วต่อ อุปกรณ์ สัญญาณสาย เช่น ระดับโวลต์ไฟฟ้า สายไฟเบอร์ อิมพีแดนซ์',
      'แปลงสถานะข้อมูลให้เหมาะสมกับสื่อนำสัญญาณ เช่น แปลงบิตเป็นความถี่คลื่นแสงหรือคลื่นวิทยุ',
      'กำหนดอัตราเร็วการรับส่งข้อมูล (Data Rate) และการซิงโครไนซ์ระดับบิตสัญญาณนาฬิกา'
    ],
    protocols: ['มาตรฐานสาย 100BASE-TX / 1000BASE-T', 'DSL / ISDN', 'USB Cable Specifications', 'Bluetooth Radio Specification'],
    hardware: ['สาย UTP / สาย Fiber Optic / สาย Coaxial', 'RJ-45 Connector (หัวต่อแลน)', 'Hub (ฮับ) & Repeater (อุปกรณ์ทวนสัญญาณ)', 'Access Point (เฉพาะฝั่งสื่อวิทยุส่งคลื่น)']
  }
];

// ─── Data: TCP/IP 4 Layers Definitions ───
const TCPIP_LAYERS_DATA = [
  {
    layerNumber: 4,
    name: 'Application Layer',
    nameTH: 'ชั้นแอปพลิเคชัน',
    color: 'from-fuchsia-600 to-rose-600',
    shadowGlow: 'hover:shadow-fuchsia-200/50',
    mappedOSILayers: [7, 6, 5],
    desc: 'รวมการทำงานของ Application, Presentation และ Session ของ OSI เข้าไว้ด้วยกัน จัดการโปรโตคอลระดับแอปพลิเคชันและการโต้ตอบกับผู้ใช้งานโดยตรง',
    examples: 'HTTP, HTTPS, FTP, DNS, SMTP'
  },
  {
    layerNumber: 3,
    name: 'Transport Layer',
    nameTH: 'ชั้นนำส่งข้อมูล',
    color: 'from-blue-600 to-cyan-600',
    shadowGlow: 'hover:shadow-blue-200/50',
    mappedOSILayers: [4],
    desc: 'ควบคุมการนำส่งข้อมูลแบบ End-to-End มีการจัดลำดับ ตรวจเช็คความเสถียรและความพร้อมในการแลกเปลี่ยนข้อมูลของพอร์ตระบบ',
    examples: 'TCP, UDP'
  },
  {
    layerNumber: 2,
    name: 'Internet Layer',
    nameTH: 'ชั้นอินเทอร์เน็ต',
    color: 'from-emerald-600 to-teal-500',
    shadowGlow: 'hover:shadow-emerald-200/50',
    mappedOSILayers: [3],
    desc: 'ระบุตำแหน่งตรรกะ (Logical Address) และดำเนินการนำส่งข้อมูลข้ามโครงข่ายด้วยการจัดเส้นทางให้แพ็กเกจเดินทางไปยังจุดหมาย',
    examples: 'IP (IPv4, IPv6), ICMP, ARP'
  },
  {
    layerNumber: 1,
    name: 'Network Access Layer',
    nameTH: 'ชั้นเข้าถึงเครือข่าย',
    color: 'from-orange-500 to-amber-600',
    shadowGlow: 'hover:shadow-orange-200/50',
    mappedOSILayers: [2, 1],
    desc: 'รวมการทำงานระดับกายภาพและจัดโครงสร้างเฟรมข้อมูล ควบคุมวิธีการนำสัญญาณเข้าและออกจากสายสัญญาณฮาร์ดแวร์โดยตรง',
    examples: 'Ethernet, Wi-Fi, MAC Address, PPP'
  }
];

// ─── Visual Nested PDU Component ───
const NestedPDUViewer = ({ step }) => {
  // Determine header visibility based on simStep
  // step matches:
  // 0: Raw Data
  // 1: Application (HTTP)
  // 2: Presentation (SSL/TLS Encryption)
  // 3: Session (Session ID Added)
  // 4: Transport (TCP Segment - Split visual)
  // 5: Network (IP Packet)
  // 6: Data Link (Ethernet Frame + FCS Trailer)
  // 7: Physical (Bitstream)
  // 8: Transmission (Bits flowing)
  // 9: Physical Received (Bits received)
  // 10: Data Link Received (Checking Ethernet Frame, FCS Trailer is still active)
  // 11: Network Received (Ethernet stripped, IP Packet remains)
  // 12: Transport Received (IP stripped, TCP Segment remains)
  // 13: Session Received (TCP stripped, Session data remains)
  // 14: Presentation Received (Session ID stripped, Encrypted Presentation data)
  // 15: Application Received (Decrypted, HTTP request remains)
  // 16: Complete (HTTP read, Raw data processed)

  const showEthernet = step === 6 || step === 10;
  const showIP = (step >= 5 && step <= 6) || (step >= 10 && step <= 11);
  const showTCP = (step >= 4 && step <= 6) || (step >= 10 && step <= 12);
  const showSess = (step >= 3 && step <= 6) || (step >= 10 && step <= 13);
  const showPres = (step >= 2 && step <= 6) || (step >= 10 && step <= 14);
  const showApp = (step >= 1 && step <= 6) || (step >= 10 && step <= 15);
  const isBitStream = step === 7 || step === 8 || step === 9;
  const isComplete = step === 16;
  const isReady = step === 0;

  // Encryption status of data: L6 to L10 is encrypted
  const isDataEncrypted = (step >= 2 && step <= 6) || (step >= 10 && step <= 13);

  // Define terminology label
  let pduLabel = "ข้อมูลดิบ (Raw Data)";
  let pduDesc = "ข้อความคำสั่งร้องขอที่พิมพ์ส่งจากหน้าจอแอปพลิเคชัน";
  let labelBgColor = "bg-slate-700 text-white";

  if (isBitStream) {
    pduLabel = "บิต (Bits) - Layer 1 PDU";
    pduDesc = "สัญญาณไฟฟ้าหรือแสงในรูปของบิต 0 และ 1";
    labelBgColor = "bg-rose-600 text-white border-rose-500";
  } else if (showEthernet) {
    pduLabel = "เฟรม (Frame) - Layer 2 PDU";
    pduDesc = "ข้อมูลที่พร้อมส่งในสายแลน มีการระบุที่อยู่ MAC Address และตัวควบคุมความผิดพลาด FCS";
    labelBgColor = "bg-orange-600 text-white border-orange-500";
  } else if (showIP) {
    pduLabel = "แพ็กเกจ (Packet) - Layer 3 PDU";
    pduDesc = "ข้อมูลที่ระบุที่อยู่ IP Address ต้นทาง-ปลายทาง สำหรับส่งข้ามเครือข่ายอินเทอร์เน็ต";
    labelBgColor = "bg-emerald-600 text-white border-emerald-500";
  } else if (showTCP) {
    pduLabel = "เซกเมนต์ (Segment) - Layer 4 PDU";
    pduDesc = "ข้อมูลที่แบ่งส่วนพร้อมแนบ TCP Header ระบุ Port ควบคุมความปลอดภัยของช่องทาง";
    labelBgColor = "bg-indigo-600 text-white border-indigo-500";
  } else if (showApp) {
    pduLabel = "ข้อมูลแอปพลิเคชัน (Application Data)";
    pduDesc = "ข้อมูลที่ถูกแปล จัดรูปแบบ หรือระบุรหัสเซสชันในระบบแอปพลิเคชันระดับบน";
    labelBgColor = "bg-violet-600 text-white border-violet-500";
  } else if (isComplete) {
    pduLabel = "ข้อมูลปลายทางประมวลผลสำเร็จ (Processed Data)";
    pduDesc = "เว็บเซิร์ฟเวอร์นำข้อมูลดิบไปใช้ออกคำสั่งให้บริการได้เรียบร้อย";
    labelBgColor = "bg-emerald-500 text-white border-emerald-400 animate-pulse";
  }

  // Visual container for bitstream
  if (isBitStream) {
    return (
      <div className="w-full flex flex-col gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl animate-float">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">// PHYSICAL MEDIA CONVERTED</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${labelBgColor}`}>{pduLabel}</span>
        </div>
        
        <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/25 flex flex-col items-center justify-center gap-3">
          <Binary className="w-10 h-10 text-rose-500 animate-pulse" />
          <div className="w-full text-center font-mono text-rose-400 break-all leading-loose text-[13.5px] tracking-widest bg-slate-900/60 p-4 rounded-xl border border-slate-900">
            01000111 01000101 01010100 00100000 00101111 01101001 01101110 01100100 01100101 01111000 00101110 01101000 01110100 01101101 01101100
          </div>
          <span className="text-xs text-slate-400 font-medium">สัญญาณทางกายภาพ: {pduDesc}</span>
        </div>
      </div>
    );
  }

  // Recursively render nested boxes representing PDU Headers
  const renderDataPayload = () => {
    return (
      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-850 flex flex-col gap-1.5 min-w-[200px]">
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>PAYLOAD DATA (ข้อมูล)</span>
          <span className="text-slate-600">(Layer 7 Request Payload)</span>
        </div>
        <div className="font-mono text-xs font-semibold text-sky-400 p-2 bg-slate-900/40 rounded border border-slate-900/50">
          {isDataEncrypted ? (
            <div className="flex items-center gap-1.5 text-cyan-400 animate-pulse">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>🔐 Encrypted: e83b2a75cd...</span>
            </div>
          ) : (
            <span>GET /index.html HTTP/1.1</span>
          )}
        </div>
      </div>
    );
  };

  const renderNestedContent = () => {
    let currentContent = renderDataPayload();

    if (showApp) {
      currentContent = (
        <div className="border border-violet-500/80 bg-violet-950/20 p-3 rounded-2xl flex flex-col gap-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-violet-400 font-bold tracking-wide">APPLICATION HEADER (HTTP)</span>
            <span className="text-[9px] text-violet-500/80 font-mono">L7 Header</span>
          </div>
          {currentContent}
        </div>
      );
    }

    if (showPres) {
      currentContent = (
        <div className="border border-cyan-500/80 bg-cyan-950/20 p-3 rounded-2xl flex flex-col gap-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-cyan-400 font-bold tracking-wide">PRESENTATION HEADER (SSL/TLS ENCRYPTION)</span>
            <span className="text-[9px] text-cyan-500/80 font-mono">L6 Header</span>
          </div>
          {currentContent}
        </div>
      );
    }

    if (showSess) {
      currentContent = (
        <div className="border border-pink-500/80 bg-pink-950/20 p-3 rounded-2xl flex flex-col gap-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-pink-400 font-bold tracking-wide">SESSION HEADER (SESSION ID: 9842)</span>
            <span className="text-[9px] text-pink-500/80 font-mono">L5 Header</span>
          </div>
          {currentContent}
        </div>
      );
    }

    if (showTCP) {
      currentContent = (
        <div className="border border-indigo-500/85 bg-indigo-950/20 p-3 rounded-2xl flex flex-col gap-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-indigo-400 font-bold tracking-wide flex items-center gap-1">
              <span>TRANSPORT HEADER (TCP PORT 443)</span>
            </span>
            <span className="text-[9px] text-indigo-500/80 font-mono">L4 Segment</span>
          </div>
          
          {/* Visual representation of Segmentation (แบ่งซอยข้อมูล) */}
          {step === 4 && (
            <div className="bg-indigo-950/30 border border-indigo-900/40 p-2.5 rounded-xl text-center mb-1 text-[11px] text-indigo-300/85">
              💡 <strong>ขั้นตอนการแบ่งซอย (Segmentation)</strong>: ข้อมูลขนาดใหญ่ถูกหั่นแบ่งซอยเป็นชิ้นย่อยเพื่อนำส่ง
            </div>
          )}
          
          {currentContent}
        </div>
      );
    }

    if (showIP) {
      currentContent = (
        <div className="border border-emerald-500/85 bg-emerald-950/20 p-3 rounded-2xl flex flex-col gap-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-emerald-400 font-bold tracking-wide">NETWORK HEADER (IP: 192.168.1.50 {"→"} 8.8.8.8)</span>
            <span className="text-[9px] text-emerald-500/80 font-mono">L3 Packet</span>
          </div>
          {currentContent}
        </div>
      );
    }

    if (showEthernet) {
      currentContent = (
        <div className="border border-orange-500/85 bg-orange-950/25 p-3 rounded-2xl flex flex-col gap-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-orange-400 font-bold tracking-wide">ETHERNET HEADER (SOURCE & DEST MAC)</span>
            <span className="text-[9px] text-orange-500/80 font-mono">L2 Frame</span>
          </div>
          
          {currentContent}
          
          <div className="flex justify-between items-center border-t border-orange-900/40 pt-2 mt-1">
            <span className="text-[10px] text-orange-400 font-bold tracking-wide">ETHERNET TRAILER (FCS / CRC ERROR CHECK)</span>
            <span className="text-[9px] text-orange-500/80 font-mono">Frame Check Sequence</span>
          </div>
        </div>
      );
    }

    return currentContent;
  };

  return (
    <div className="w-full flex flex-col gap-4 p-5 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden transition-all duration-500">
      {/* Top Header details */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            {isReady ? 'ข้อมูลเปล่า (Raw Payload)' : isComplete ? 'เสร็จสมบูรณ์ (Received Data)' : 'การวิเคราะห์โครงสร้างกล่อง PDU'}
          </span>
        </div>
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-inner ${labelBgColor}`}>
          {pduLabel}
        </span>
      </div>

      {/* Description */}
      <div className="text-slate-400 text-xs font-medium bg-slate-950/50 p-3 rounded-xl border border-slate-850">
        📢 <strong>รายละเอียด</strong>: {pduDesc}
      </div>

      {/* Main visualization area */}
      <div className="p-2 sm:p-4 bg-slate-950 rounded-2xl border border-slate-850 flex flex-col justify-center min-h-[220px]">
        {renderNestedContent()}
      </div>
    </div>
  );
};

export default function IT5_1() {
  // --- OSI Explorer State ---
  const [selectedOSILayer, setSelectedOSILayer] = useState(7);
  const [highlightedGroup, setHighlightedGroup] = useState(null);

  // --- Encapsulation Simulator State ---
  const [simStep, setSimStep] = useState(0);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simIntervalId, setSimIntervalId] = useState(null);

  // ─── Simulation Steps Config ───
  const simSteps = [
    {
      title: 'เตรียมพร้อมส่งข้อมูล (Ready to Send)',
      desc: 'เครื่องคอมพิวเตอร์ผู้ส่ง (Host A) ต้องการส่งข้อความร้องขอหน้าเว็บผ่านโปรโตคอล HTTP ไปยังเว็บเซิร์ฟเวอร์ผู้รับ (Host B) โดยเริ่มแรกข้อมูลจะอยู่ในสภาพเป็นข้อความคำสั่งดิบ (GET /index.html) ในระดับแอปพลิเคชันต้นทาง',
      analogy: 'เปรียบเหมือนการเขียนข้อความลงบนจดหมายกระดาษแผ่นเปล่า'
    },
    // Sender Encapsulation (Steps 1 to 7)
    {
      title: 'ขั้นตอนที่ 1 (ชั้นที่ 7: Application Layer) - ห่อหุ้มคำสั่ง HTTP',
      desc: 'แอปพลิเคชันเว็บบราวเซอร์จะนำคำสั่งดิบมาแนบหัวกระดาษ HTTP Header (เช่น ระบุ GET Method, Host, User-Agent) เพื่อใช้บอกผู้รับว่าข้อมูลชุดนี้เป็นเอกสารเว็บร้องขอ',
      analogy: 'เปรียบเหมือนการใส่หัวข้อและตราสัญลักษณ์ของจดหมายให้รู้ว่าเป็นแบบฟอร์มเอกสารทางการ'
    },
    {
      title: 'ขั้นตอนที่ 2 (ชั้นที่ 6: Presentation Layer) - เข้ารหัสข้อมูลลับ',
      desc: 'ข้อมูลจะส่งผ่าน Presentation Layer เพื่อทำการเข้ารหัสลับข้อมูลความปลอดภัย (SSL/TLS Encryption) ทำให้ข้อมูลข้อความถูกปั่นป่วนกลายเป็นรหัสลับที่ไม่สามารถอ่านรู้เรื่องได้หากถูกดักฟังระหว่างทาง',
      analogy: 'เปรียบเหมือนการแปลงสารในจดหมายให้เป็นรหัสลับพิเศษที่รู้กันเฉพาะผู้ส่งและผู้รับปลายทางเท่านั้น'
    },
    {
      title: 'ขั้นตอนที่ 3 (ชั้นที่ 5: Session Layer) - แปะรหัสระบุช่องสัญญาณ',
      desc: 'ระบบทำการแนบรหัส Session ID เพื่อควบคุมรักษาเซสชันช่องทางติดต่อสื่อสาร ช่วยระบุว่าข้อมูลชุดนี้สอดคล้องกับหน้าต่างแท็บบราวเซอร์บานไหน ป้องกันข้อมูลชนหรือสับสนกัน',
      analogy: 'เปรียบเหมือนการปั๊มตราเลขรหัสอ้างอิงประจำครั้งที่ส่งจดหมายลงไปที่เอกสาร'
    },
    {
      title: 'ขั้นตอนที่ 4 (ชั้นที่ 4: Transport Layer) - จัดเตรียมการนำส่ง (Segment)',
      desc: 'ข้อมูลระดับบนทั้งหมดจะถูกแบ่งชิ้นส่วนย่อย (Segmentation) เพื่อให้เหมาะสมกับการส่งผ่านสายเครือข่าย จากนั้นจะแนบ TCP Header ระบุหมายเลขพอร์ตต้นทางและพอร์ตปลายทาง (เช่น Port 443 HTTPS) พร้อมสร้างลำดับ Sequence Number เพื่อให้ปลายทางสามารถเช็คและประกอบชิ้นข้อมูลกลับคืนได้อย่างถูกต้องครบถ้วน หน่วยข้อมูลในชั้นนี้เรียกว่า เซกเมนต์ (Segment)',
      analogy: 'เปรียบเหมือนการแยกแบ่งส่วนเนื้อหาเป็นบทๆ ใส่หมายเลขกำกับ (Sequence) แล้วใส่ซองขนาดใหญ่ระบุเบอร์แผนกรับปลายทาง'
    },
    {
      title: 'ขั้นตอนที่ 5 (ชั้นที่ 3: Network Layer) - แปะที่อยู่หมายเลข IP (Packet)',
      desc: 'ข้อมูล TCP Segment จะถูกสวมเข้าในกล่อง Network Layer โดยการแนบ IP Header เพื่อระบุหมายเลข IP Address ต้นทาง (Source IP) และหมายเลข IP Address ปลายทาง (Destination IP) ข้อมูลที่หุ้มด้วยชั้น IP นี้เรียกว่า แพ็กเกจ (Packet) ซึ่งช่วยให้เราเตอร์ในเครือข่ายอินเทอร์เน็ตค้นหาและจัดเส้นทางส่งไปถูกตึกถูกบ้าน',
      analogy: 'เปรียบเหมือนการเอาซองจดหมายเดิมมาใส่ลงในกล่องพัสดุใหญ่ขึ้น แล้วจ่าหน้าเขียนที่อยู่ บ้านเลขที่ และรหัสไปรษณีย์ของบ้านผู้ส่งและบ้านผู้รับ'
    },
    {
      title: 'ขั้นตอนที่ 6 (ชั้นที่ 2: Data Link Layer) - สวมแผ่นป้าย MAC Address (Frame)',
      desc: 'ข้อมูล Packet จะถูกนำมาใส่หัว (Ethernet Header) ระบุที่อยู่กายภาพประจำการ์ดแลนคือ MAC Address ของอุปกรณ์ถัดไปในวงแลน และแปะท้ายเฟรมด้วยค่าตรวจสอบข้อผิดพลาด (FCS/CRC Trailer) ข้อมูลที่พร้อมเข้าสายสัญญาณนี้เรียกว่า เฟรม (Frame)',
      analogy: 'เปรียบเหมือนการนำกล่องพัสดุเดิมมาใส่ลงในถุงส่งของของบริษัทขนส่ง แปะป้ายรหัสบาร์โค้ดประจำรอบรถ และผูกเงื่อนเชือกปิดผนึกเช็กความเสียหายด้านหลัง'
    },
    {
      title: 'ขั้นตอนที่ 7 (ชั้นที่ 1: Physical Layer) - แปลงสภาพข้อมูลเป็นกลุ่มบิต',
      desc: 'โครงสร้างกล่องเฟรมทั้งหมดที่ซ้อนกันอยู่จะถูกอ่านค่าและแปลงสภาพให้อยู่ในรูปบิตสัญญาณไฟฟ้าหรือแสง (เลข 0 และ 1) เพื่อส่งออกไปทางพอร์ตและฮาร์ดแวร์ช่องสัญญาณ หน่วย PDU ในชั้นนี้คือ บิต (Bits)',
      analogy: 'เปรียบเหมือนรถขนส่งวิ่งเดินทางขนพัสดุแล่นออกไปตามรางถนนหรือท่อส่งของทางกายภาพ'
    },
    // Transmission (Step 8)
    {
      title: 'ขั้นตอนที่ 8 (สื่อกลางทางกายภาพ) - กระแสบิตวิ่งเดินทางผ่านสายสัญญาณ',
      desc: 'บิตสัญญาณ (0 และ 1) เดินทางไหลผ่านสายนำสัญญาณ LAN (สาย UTP) หรือสายใยแก้วนำแสง (Fiber Optic) มุ่งหน้าไปตามเส้นทางแลนไปสู่พอร์ตรับฝั่งปลายทางโดยตรง',
      analogy: 'กระแสรถไฟขนพัสดุวิ่งเดินทางผ่านไปตามสายพานโครงข่ายแลนหลัก'
    },
    // Receiver Decapsulation (Steps 9 to 15)
    {
      title: 'ขั้นตอนที่ 9 (ชั้นที่ 1: Physical Layer) - การ์ดรับข้อมูลตรวจจับบิต',
      desc: 'การ์ดเครือข่ายฝั่งผู้รับ (Host B) ตรวจจับการเปลี่ยนแปลงของคลื่นไฟฟ้าหรือความถี่แสง แล้วแปลงข้อมูลกลับคืนมาเป็นบิตตัวเลขส่งขึ้นสู่ชั้นที่สอง',
      analogy: 'เครื่องรับไปรษณีย์ปลายทางรับกล่องและถุงพัสดุที่ขนมาลงจากรถขนส่งสายหลัก'
    },
    {
      title: 'ขั้นตอนที่ 10 (ชั้นที่ 2: Data Link Layer) - แกะถุงขอบเฟรม ตรวจสอบ MAC',
      desc: 'ชั้น Data Link ตรวจหาที่อยู่ MAC Address ในส่วน Ethernet Header ว่าตรงกับการ์ดเครื่องนี้หรือไม่ และคำนวณบาร์โค้ด CRC ท้ายเฟรมว่าได้รับสัญญาณครบสมบูรณ์ไร้รอยชำรุด หากถูกต้องจะตัดหัว Ethernet และ FCS ท้ายเฟรมทิ้ง เพื่อส่งต่อข้างในขึ้นข้างบน',
      analogy: 'แกะถุงขนส่งชั้นนอกสุดออก ตรวจเช็คป้ายนำส่ง และเช็คสายรัดผนึกความปลอดภัย (FCS) หากสภาพสมบูรณ์จึงแกะเปิดถุงชั้นนอกสุดทิ้ง เหลือแต่กล่องพัสดุ'
    },
    {
      title: 'ขั้นตอนที่ 11 (ชั้นที่ 3: Network Layer) - แกะกล่อง IP Packet',
      desc: 'แกะและตรวจสอบที่อยู่ IP Address ต้นทาง-ปลายทางใน IP Header หากถูกต้องตรงกับที่อยู่เครื่องเซิร์ฟเวอร์นี้ จะทำการแกะและตัด IP Header ออก ส่งข้อมูล TCP Segment ที่อยู่ข้างในต่อขึ้นชั้นถัดไป',
      analogy: 'เปิดกล่องพัสดุ อ่านจ่าหน้าบ้านเลขที่ IP ปลายทางว่าระบุบ้านหลังนี้ถูกต้อง จึงแกะเอากล่องนอกทิ้ง เหลือซองจดหมายใหญ่ข้างใน'
    },
    {
      title: 'ขั้นตอนที่ 12 (ชั้นที่ 4: Transport Layer) - แกะซอง TCP Segment คัดพอร์ต',
      desc: 'แกะ TCP Header อ่านหมายเลข Port ปลายทาง (เช่น Port 443 แปลว่าส่งต่อให้แอปพลิเคชันเว็บเซิร์ฟเวอร์ประมวลผล) และตรวจสอบ Sequence Number ว่าครบลำดับชิ้นข้อมูลหลักไหม ก่อนส่งข้อมูลขึ้นชั้นเซสชัน',
      analogy: 'เปิดซองจดหมายใหญ่ เช็คเบอร์แผนก (Port) ประจำตึกบริษัท และตรวจสอบนำชิ้นส่วนจดหมายย่อยมาจัดลำดับเรียงต่อกันให้สมบูรณ์'
    },
    {
      title: 'ขั้นตอนที่ 13 (ชั้นที่ 5: Session Layer) - ตรวจสอบช่องเซสชันการสนทนา',
      desc: 'แกะและยืนยันหมายเลข Session ID ว่าข้อความตอบสนองนี้ตรงกับคู่สายสนทนาใดที่จัดระเบียบเปิดทิ้งไว้อยู่บนเซิร์ฟเวอร์ จากนั้นส่งข้อมูลต่อขึ้นชั้นนำเสนอข้อมูล',
      analogy: 'ยืนยันรหัสใบอ้างอิงของเซสชันที่เคยติดต่อกันว่าถูกต้องตรงงานเดิม'
    },
    {
      title: 'ขั้นตอนที่ 14 (ชั้นที่ 6: Presentation Layer) - ถอดรหัสลับความปลอดภัย',
      desc: 'ข้อมูลที่เข้ารหัสลับอยู่จะถูกถอดรหัสความปลอดภัย (SSL/TLS Decryption) และแปลงรูปแบบไวยากรณ์ Syntax กลับมาเป็นข้อความเว็บภาษาคอมพิวเตอร์พื้นฐานที่เข้าใจได้',
      analogy: 'ให้พนักงานล่ามแปลจดหมายถอดรหัสลับกลับมาเป็นคำอธิบายภาษาอังกฤษทั่วไปที่ทุกคนในแผนกอ่านออก'
    },
    {
      title: 'ขั้นตอนที่ 15 (ชั้นที่ 7: Application Layer) - อ่านรับข้อมูลคำสั่งสำเร็จ',
      desc: 'ซอฟต์แวร์เว็บเซิร์ฟเวอร์แกะข้อมูลส่วนหัว HTTP Header อ่านคำสั่งเนื้อหาดิบที่ได้รับว่า "ต้องการดึงหน้าเว็บ index.html" และส่งต่อข้อมูลนี้ให้โปรแกรมแม่ข่ายจัดการหาเอกสารส่งกลับไป',
      analogy: 'หัวหน้าแผนกเปิดซองจดหมายชั้นในสุด อ่านคำสั่งข้อความทฤษฎีดั้งเดิมที่ระบุมา'
    },
    {
      title: 'ส่งผ่านและถอดรหัสข้อมูลเรียบร้อยสมบูรณ์ (Simulation Complete)',
      desc: 'กระบวนการส่งผ่านสิ้นสุดโดยสมบูรณ์ ข้อมูลดิบผ่านกระบวนการสวมเปลือกครอบ (Encapsulation) เป็นบิต วิ่งเดินทางผ่านสายสัญญาณ และแกะเป่าครอบออกทั้งหมด (Decapsulation) อย่างราบรื่นไร้ข้อบกพร่อง',
      analogy: 'ผู้รับปลายทางได้รับข้อความคำจดหมายต้นฉบับอย่างสมบูรณ์แบบและถูกต้อง'
    }
  ];

  // --- Animation control ---
  useEffect(() => {
    if (isSimRunning) {
      const id = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= simSteps.length - 1) {
            setIsSimRunning(false);
            clearInterval(id);
            return prev;
          }
          return prev + 1;
        });
      }, 3000); // Step every 3s to let student read the analogy
      setSimIntervalId(id);
    } else {
      if (simIntervalId) {
        clearInterval(simIntervalId);
      }
    }
    return () => {
      if (simIntervalId) clearInterval(simIntervalId);
    };
  }, [isSimRunning]);

  const handleStartSim = () => {
    setIsSimRunning(true);
  };

  const handlePauseSim = () => {
    setIsSimRunning(false);
  };

  const handleNextStep = () => {
    setSimStep((prev) => Math.min(prev + 1, simSteps.length - 1));
  };

  const handlePrevStep = () => {
    setSimStep((prev) => Math.max(prev - 1, 0));
  };

  const handleResetSim = () => {
    setIsSimRunning(false);
    setSimStep(0);
  };

  // --- Quiz Levels Config ---
  const QUIZ_LEVELS = [
    {
      title: 'ด่านที่ 1: ค้นหารอยรั่วระดับกายภาพ',
      desc: 'หน้าจอนักเรียนค้างและไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้ เมื่อช่างเทคนิคเข้ามาตรวจสอบพบว่า "หัวต่อ RJ-45 มีคลิปล็อคหัก ทำให้สายหลวมหลุดออกจากพอร์ตด้านหลังของคอมพิวเตอร์" ปัญหานี้สอดคล้องกับความผิดพลาดในชั้นใดของแบบจำลอง OSI Model?',
      options: [
        { key: 'A', text: 'Application Layer', isCorrect: false },
        { key: 'B', text: 'Network Layer', isCorrect: false },
        { key: 'C', text: 'Physical Layer', isCorrect: true },
        { key: 'D', text: 'Data Link Layer', isCorrect: false }
      ],
      tip: 'ชั้น Physical Layer ควบคุมระบบการเชื่อมต่อทางกายภาพ สายนำสัญญาณ พินรับส่ง และขั้วต่อต่อเชื่อมทั้งหมด'
    },
    {
      title: 'ด่านที่ 2: ร่องรอยของ "Packet" และ "IP Address"',
      desc: 'ในขณะที่คุณกำลังวิเคราะห์พฤทีกรรมการเชื่อมต่อด้วยโปรแกรมเครือข่าย คุณตรวจเจอหน่วยข้อมูลระดับ "Packet" ที่มีการจ่าหน้า Source IP: 192.168.1.15 และ Destination IP: 8.8.8.8 ข้อมูลระดับ Packet และ IP Address นี้นำส่งอยู่ในระดับชั้นใด?',
      options: [
        { key: 'A', text: 'Network Layer', isCorrect: true },
        { key: 'B', text: 'Data Link Layer', isCorrect: false },
        { key: 'C', text: 'Transport Layer', isCorrect: false },
        { key: 'D', text: 'Presentation Layer', isCorrect: false }
      ],
      tip: 'ชั้น Network Layer (ระดับ 3) ทำหน้าที่จัดการ Logical Address (IP Address) และดูแลการจัดเส้นทาง (Routing) ข้ามวงเครือข่าย'
    },
    {
      title: 'ด่านที่ 3: ความแตกต่างในทางปฏิบัติ (TCP/IP VS OSI)',
      desc: 'ระบบปฏิบัติการรุ่นใหม่ทำงานอยู่บนชุดโปรโตคอล TCP/IP ซึ่งประกอบด้วย 4 ชั้นสื่อสาร หากมีโปรโตคอลการเข้ารหัสลับความปลอดภัยการโอนเงิน (SSL/TLS) และโปรโตคอลส่งคำสั่งเว็บ (HTTP) ปลั๊กโปรแกรมนี้จะจัดอยู่ภายใต้ชั้นใดของโมเดล TCP/IP?',
      options: [
        { key: 'A', text: 'Internet Layer', isCorrect: false },
        { key: 'B', text: 'Transport Layer', isCorrect: false },
        { key: 'C', text: 'Network Access Layer', isCorrect: false },
        { key: 'D', text: 'Application Layer', isCorrect: true }
      ],
      tip: 'ชั้น Application Layer ของ TCP/IP ยุบรวมเอาชั้น Application, Presentation และ Session ของ OSI เข้าไว้ด้วยกัน เพื่อให้ง่ายต่อการพัฒนาซอฟต์แวร์'
    }
  ];

  return (
    <div className="font-sans text-slate-800 pb-20 relative overflow-hidden">
      <CustomStyles />
      
      {/* ─── Layer 1: Ambient Background Blobs ─── */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none animate-drift"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-drift" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-88 h-88 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none animate-drift" style={{ animationDelay: '6s' }}></div>
      <div className="absolute top-1/2 right-12 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-drift" style={{ animationDelay: '9s' }}></div>

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Intro section: Fluid Open-Air Layout */}
        <div className="space-y-4">
          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ในการสื่อสารบนระบบเครือข่าย อุปกรณ์ต่างยี่ห้อ ต่างโครงสร้าง หรือต่างระบบปฏิบัติการ จำเป็นต้องมีภาษาและกฎเกณฑ์ส่วนกลางในการสนทนา เพื่อให้สามารถจัดส่งและแปลความหมายข้อมูลได้อย่างสมบูรณ์ กฎเหล็กส่วนกลางนี้เรียกว่า <strong className="text-indigo-600 font-semibold">โปรโตคอล (Protocol)</strong> และเพื่อช่วยให้นักพัฒนารวมถึงวิศวกรโครงข่ายออกแบบระบบได้อย่างสม่ำเสมอ จึงมีการวางหลักการทำงานออกเป็นชั้นๆ ในรูปแบบจำลองการสื่อสารที่เป็นสากล
          </p>

          {/* Analogy frosted glass callout */}
          <div className="p-5 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl border-l-[3.5px] border-l-indigo-600 shadow-sm leading-relaxed">
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1 block">💡 เปรียบเทียบให้เข้าใจง่าย (Human Analogy)</span>
            <p className="text-zinc-600 text-[14.5px] font-normal leading-relaxed">
              เปรียบเสมือน <strong>"การส่งจดหมายไปต่างประเทศ"</strong>: ผู้ส่งเขียนจดหมายภาษาไทย (Application) แปลจดหมายเป็นภาษาอังกฤษเพื่อให้ปลายทางอ่านออก (Presentation) บรรจุจดหมายลงซองและกาวปิด (Session) เขียนระบุส่งจดหมายลงทะเบียนแบบด่วน EMS ป้องกันการสูญหาย (Transport) จ่าหน้าซองที่อยู่ผู้รับ/ผู้ส่งข้ามประเทศ (Network) นำจดหมายไปใส่รถขนส่งไปรษณีย์ (Data Link) และท้ายสุดรถไปรษณีย์วิ่งแล่นไปตามถนนดิน/ลาดยางทางกายภาพ (Physical) จนถึงจุดหมายปลายทาง
            </p>
          </div>
        </div>

        {/* ─── Section 1: OSI Model 7 Layers Interactive Explorer ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              แบบจำลองอ้างอิงมาตรฐานสากล
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลอง OSI Model 7 ชั้น (Open Systems Interconnection Model)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            OSI Model คือแบบจำลองเชิงทฤษฎีที่สร้างโดยองค์การระหว่างประเทศว่าด้วยการมาตรฐาน (ISO) เพื่อใช้เป็นกรอบอ้างอิงในการพัฒนาโครงสร้างเครือข่าย โดยแบ่งการสนทนาแลกเปลี่ยนข้อมูลออกเป็น <strong>7 ชั้นสื่อสารอย่างชัดเจน</strong>
          </p>

          {/* Interactive Layout: Left list of layers / Right detail panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (OSI stack list) - Span 5 */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">เลือกชั้นสื่อสารเพื่อเจาะลึกรายละเอียด</span>
              {OSI_LAYERS_DATA.map((layer) => {
                const isSelected = selectedOSILayer === layer.layerNumber;
                return (
                  <button
                    key={layer.layerNumber}
                    onClick={() => setSelectedOSILayer(layer.layerNumber)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer hover:scale-[1.01] active:scale-99
                      ${isSelected 
                        ? `bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-900 ring-2 ring-slate-400 ring-offset-2`
                        : `bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900`
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                        isSelected 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        L{layer.layerNumber}
                      </span>
                      <div>
                        <div className="font-bold text-[14.5px] leading-tight">{layer.nameTH}</div>
                        <div className={`text-xs font-medium ${
                          isSelected ? 'text-indigo-400' : 'text-slate-450'
                        }`}>{layer.nameEN}</div>
                      </div>
                    </div>
                    
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase shrink-0 ${
                      isSelected 
                        ? 'bg-white/10 text-white border-white/20' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      PDU: {layer.pdu.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column (Detail Panel) - Span 7 */}
            <div className="lg:col-span-7 glass-panel rounded-[2rem] p-6 sm:p-8 border border-slate-200/50 shadow-xl bg-white/60 relative min-h-[460px] flex flex-col justify-between">
              {(() => {
                const l = OSI_LAYERS_DATA.find(x => x.layerNumber === selectedOSILayer);
                return (
                  <div className="space-y-6">
                    {/* Layer Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
                      <div>
                        <span className="text-xs font-extrabold text-indigo-600 tracking-wider uppercase block">
                          OSI MODEL - LAYER {l.layerNumber}
                        </span>
                        <h4 className="text-2xl font-extrabold text-slate-800 mt-0.5">
                          {l.nameTH} <span className="text-slate-400 text-lg font-bold font-sans">({l.nameEN})</span>
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-900 text-white font-mono shadow-inner shrink-0">
                        หน่วย PDU: {l.pdu}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-650 text-[15.5px] leading-relaxed font-normal bg-white/70 p-4 rounded-2xl border border-white/80 shadow-sm">
                      {l.description}
                    </p>

                    {/* Detailed Functions */}
                    <div className="space-y-3">
                      <h5 className="text-[14px] font-bold text-slate-700 tracking-wide uppercase flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-indigo-500" /> หน้าที่และภาระงานหลัก (Key Functions)
                      </h5>
                      <ul className="space-y-2.5">
                        {l.functions.map((fn, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-zinc-655 text-[14.5px] font-semibold leading-relaxed">
                            <span className="text-indigo-500 font-bold mt-0.5">✓</span>
                            <span>{fn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Protocols & Hardware badges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      
                      {/* Protocols */}
                      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3 block">โปรโตคอลตัวอย่าง (Protocols)</span>
                        <div className="flex flex-wrap gap-1.5">
                          {l.protocols.map((proto, idx) => (
                            <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1.5 rounded-xl font-bold border border-indigo-100">
                              {proto}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hardware */}
                      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3 block">ฮาร์ดแวร์ / สื่อนำสัญญาณ (Devices)</span>
                        <div className="flex flex-wrap gap-1.5">
                          {l.hardware.map((hw, idx) => (
                            <span key={idx} className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1.5 rounded-xl font-bold border border-emerald-100">
                              {hw}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </section>

        {/* ─── Section 2: Encapsulation & Decapsulation Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              เรียนรู้ผ่านกระบวนการจำลอง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลองการไหลข้อมูลแบบกล่องสวมซ้อนกล่อง (Visual Nested Doll PDU Simulator)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            กระบวนการรับส่งข้อมูลในคอมพิวเตอร์ ทำงานในลักษณะห่อหุ้มเปลือกซ้อนเป็นชั้นๆ:
          </p>

          {/* Simple bullet explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 rounded-2xl p-5 border border-white/50 shadow-sm">
              <h4 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">1</span>
                การห่อหุ้มข้อมูล (Encapsulation)
              </h4>
              <p className="text-[14.5px] text-zinc-655 leading-relaxed font-semibold">
                ฝั่งผู้ส่ง (Sender) ส่งข้อมูลจากบนลงล่าง (Layer 7 → 1) แต่ละชั้นจะทำการแนบ **ส่วนหัว (Header)** เพื่อระบุข้อมูลควบคุมของชั้นนั้นๆ ซ้อนเป็นชั้นคล้ายซองจดหมายซ้อนกัน
              </p>
            </div>
            <div className="bg-white/60 rounded-2xl p-5 border border-white/50 shadow-sm">
              <h4 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">2</span>
                การแกะถอดรหัสข้อมูล (Decapsulation)
              </h4>
              <p className="text-[14.5px] text-zinc-655 leading-relaxed font-semibold">
                ฝั่งผู้รับ (Receiver) รับสัญญาณไฟฟ้าขึ้นมาจากล่างขึ้นบน (Layer 1 → 7) และแกะลอกส่วนหัวออกทีละชั้น ตรวจสอบจนเหลือเพียงข้อความดั้งเดิมเพื่อนำส่งแอปพลิเคชันปลายทาง
              </p>
            </div>
          </div>

          {/* SIMULATOR SHELL - DARK PANEL */}
          <div className="dark-panel-left rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Top Right Tagging */}
            <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-500 font-bold tracking-widest pointer-events-none">
              SIMULATOR: DATA_ENCAPSULATION_LAB
            </div>

            <div className="relative z-10 flex flex-col gap-8">
              {/* Sender & Receiver UI Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Host A: Sender (Left) - Span 4 */}
                <div className="lg:col-span-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4 text-center">
                  <div className="flex items-center gap-3 justify-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse-ring"></div>
                    <span className="text-white font-bold text-sm">คอมพิวเตอร์ผู้ส่ง (Host A)</span>
                  </div>
                  
                  {/* Vertical stack showing Sender layers */}
                  <div className="flex flex-col gap-1.5 text-xs font-mono font-bold">
                    {OSI_LAYERS_DATA.map((layer) => {
                      const isActive = simStep === (8 - layer.layerNumber);
                      const isProcessed = simStep >= (8 - layer.layerNumber) && simStep < 8;
                      return (
                        <div 
                          key={layer.layerNumber}
                          className={`p-2 rounded-xl transition-all duration-300 border text-center
                            ${isActive 
                              ? 'bg-indigo-600 text-white border-white shadow-md scale-102 ring-2 ring-indigo-400'
                              : isProcessed
                                ? 'bg-indigo-950/50 text-indigo-300 border-indigo-900/50 opacity-60'
                                : 'bg-slate-900 text-slate-500 border-slate-850'
                            }`}
                        >
                          L{layer.layerNumber}: {layer.nameEN.split(' ')[0]}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cable / Medium (Middle) - Span 4 */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 font-mono font-bold">การส่งสัญญาณกระแสบิต</span>
                  
                  <div className="relative w-full h-16 flex items-center justify-center">
                    <svg className="w-full h-6 pointer-events-none" viewBox="0 0 200 24" preserveAspectRatio="none">
                      {/* Connection Cable */}
                      <path d="M 0,12 L 200,12" stroke="#475569" strokeWidth="6" strokeLinecap="round" fill="none" />
                      {/* Active transmission line */}
                      {simStep === 8 && (
                        <path 
                          d="M 0,12 L 200,12" 
                          stroke="#ef4444" 
                          strokeWidth="6" 
                          strokeLinecap="round" 
                          fill="none" 
                          strokeDasharray="10 15" 
                          className="animate-flow-bits" 
                        />
                      )}
                    </svg>
                    
                    {simStep === 8 && (
                      <span className="absolute text-[11px] font-mono font-bold text-rose-400 bg-slate-950 px-2 py-0.5 rounded-full border border-rose-500/20 animate-float">
                        10101100...
                      </span>
                    )}
                  </div>
                  
                  <span className="text-[11px] font-medium text-slate-400 mt-2 text-center">สื่อส่งผ่านข้อมูลทางกายภาพ (สายแลน UTP)</span>
                </div>

                {/* Host B: Receiver (Right) - Span 4 */}
                <div className="lg:col-span-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4 text-center">
                  <div className="flex items-center gap-3 justify-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-white font-bold text-sm">เครื่องเซิร์ฟเวอร์ผู้รับ (Host B)</span>
                  </div>

                  {/* Vertical stack showing Receiver layers */}
                  <div className="flex flex-col gap-1.5 text-xs font-mono font-bold">
                    {OSI_LAYERS_DATA.map((layer) => {
                      const stepMapping = 8 + layer.layerNumber; // step 9 to 15
                      const isActive = simStep === stepMapping;
                      const isProcessed = simStep > stepMapping || simStep === 16;
                      return (
                        <div 
                          key={layer.layerNumber}
                          className={`p-2 rounded-xl transition-all duration-300 border text-center
                            ${isActive 
                              ? 'bg-emerald-600 text-white border-white shadow-md scale-102 ring-2 ring-emerald-400'
                              : isProcessed
                                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-900/50 opacity-60'
                                : 'bg-slate-900 text-slate-500 border-slate-850'
                            }`}
                        >
                          L{layer.layerNumber}: {layer.nameEN.split(' ')[0]}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Step explanation panel (Inside dark panel) */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/80 shadow-inner space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase">
                      ขั้นตอนที่ {simStep} / {simSteps.length - 1}
                    </span>
                    <h5 className="text-base font-bold text-white">
                      {simSteps[simStep].title}
                    </h5>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800">
                    PDU: {simStep === 0 ? 'Data' : simStep < 4 ? 'Data' : simStep === 4 ? 'Segment' : simStep === 5 ? 'Packet' : simStep === 6 ? 'Frame' : simStep < 10 ? 'Bits' : simStep === 10 ? 'Frame' : simStep === 11 ? 'Packet' : simStep === 12 ? 'Segment' : 'Data'}
                  </span>
                </div>

                <p className="text-slate-350 text-[14.5px] leading-relaxed font-normal">
                  {simSteps[simStep].desc}
                </p>

                {/* Nested PDU Doll Viewer - Displays Nested Box Flow */}
                <div className="space-y-3 pt-3 border-t border-slate-900">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">จำลองโครงสร้างซ้อนกล่อง PDU และความหมายทางวิชาการ (PDU Nested Doll Inspector)</span>
                  <NestedPDUViewer step={simStep} />
                </div>

                {/* Analogy Box */}
                <div className="bg-slate-900/50 border border-slate-850/80 p-3.5 rounded-xl text-slate-400 text-xs flex gap-2">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>ชีวิตจริงเปรียบได้กับ:</strong> {simSteps[simStep].analogy}</span>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex flex-wrap gap-3 items-center justify-center">
                <button 
                  onClick={handlePrevStep}
                  disabled={simStep === 0}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-30 transition-all border border-slate-750"
                >
                  <ChevronLeft className="w-4 h-4" /> ก่อนหน้า
                </button>

                {isSimRunning ? (
                  <button 
                    onClick={handlePauseSim}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <span>⏸️</span> หยุดชั่วคราว
                  </button>
                ) : (
                  <button 
                    onClick={handleStartSim}
                    disabled={simStep === simSteps.length - 1}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-500/20 disabled:opacity-30 transition-all border border-indigo-500"
                  >
                    <span>▶️</span> เล่นจำลองทีละขั้น
                  </button>
                )}

                <button 
                  onClick={handleNextStep}
                  disabled={simStep === simSteps.length - 1}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-30 transition-all border border-slate-750"
                >
                  ถัดไป <ChevronRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={handleResetSim}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all border border-slate-750 ml-auto"
                >
                  <RefreshCw className="w-4 h-4" /> รีเซ็ต
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Section 3: TCP/IP Protocol Suite ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              โมเดลการใช้งานจริงในยุคอินเทอร์เน็ต
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ชุดโปรโตคอล TCP/IP Model (Transmission Control Protocol / Internet Protocol)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            หาก OSI Model เปรียบเสมือนแบบจำลองเชิงทฤษฎี <strong>TCP/IP Model</strong> ก็คือชุดจำลองการส่งข้อมูลที่นำมาพัฒนาและใช้งานจริงทั่วโลกบนระบบอินเทอร์เน็ตในปัจจุบัน โดยปรับลดความซับซ้อนให้ครอบคลุมการทำงานเหลือเพียง <strong>4 ชั้นสื่อสารหลัก</strong>
          </p>

          {/* Grid presenting 4 layers of TCP/IP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TCPIP_LAYERS_DATA.map((layer) => (
              <div 
                key={layer.layerNumber}
                className={`group relative bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${layer.shadowGlow} overflow-hidden cursor-default`}
              >
                {/* Visual Accent top strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${layer.color}`} />
                
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">Layer {layer.layerNumber}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      OSI L{layer.mappedOSILayers.join(', L')}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 leading-tight">{layer.name}</h4>
                    <span className="text-xs font-semibold text-slate-400">{layer.nameTH}</span>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed min-h-[72px]">
                    {layer.desc}
                  </p>

                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ตัวอย่างโปรโตคอล</span>
                    <span className="font-mono text-xs text-slate-700 font-bold block truncate">{layer.examples}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 4: OSI vs TCP/IP Mapping Interface ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ผังเปรียบเทียบมาตรฐานสื่อสาร
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แผนผังการเปรียบเทียบ OSI Model กับ TCP/IP Model (Side-by-Side Comparison Map)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            วางเมาส์หรือคลิกที่ชั้นสื่อสารเพื่อสังเกตการแมปปิ้งหรือยุบรวมชั้นในทางปฏิบัติ:
          </p>

          {/* Mapping visualizer using CSS grid and group highlighting */}
          <div className="glass-panel rounded-[2.5rem] p-6 sm:p-10 border border-slate-200/50 shadow-xl bg-white/60 relative">
            <div className="grid grid-cols-12 gap-2 sm:gap-6 items-stretch">
              
              {/* Left Column: OSI Layers (7 Rows) - Span 5 */}
              <div className="col-span-5 flex flex-col gap-2 justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block text-center">แบบจำลอง OSI Model (7 ชั้น)</span>
                
                {/* L7 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('app')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('app')}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${highlightedGroup === 'app' 
                      ? 'bg-violet-600 text-white border-violet-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-violet-300'
                    }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Layer 7: Application</div>
                </div>

                {/* L6 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('app')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('app')}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${highlightedGroup === 'app' 
                      ? 'bg-violet-600 text-white border-violet-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-violet-300'
                    }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Layer 6: Presentation</div>
                </div>

                {/* L5 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('app')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('app')}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${highlightedGroup === 'app' 
                      ? 'bg-violet-600 text-white border-violet-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-violet-300'
                    }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Layer 5: Session</div>
                </div>

                {/* L4 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('transport')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('transport')}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${highlightedGroup === 'transport' 
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                    }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Layer 4: Transport</div>
                </div>

                {/* L3 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('internet')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('internet')}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${highlightedGroup === 'internet' 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                    }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Layer 3: Network</div>
                </div>

                {/* L2 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('access')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('access')}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${highlightedGroup === 'access' 
                      ? 'bg-orange-600 text-white border-orange-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Layer 2: Data Link</div>
                </div>

                {/* L1 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('access')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('access')}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${highlightedGroup === 'access' 
                      ? 'bg-orange-600 text-white border-orange-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Layer 1: Physical</div>
                </div>
              </div>

              {/* Middle Column: SVG Mapping Lines - Span 2 */}
              <div className="col-span-2 flex flex-col justify-center items-center relative min-h-[380px]">
                <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 380">
                  {/* Group App Lines (L7, L6, L5 -> TCP L4) */}
                  <path d="M 0,22 Q 50,22 50,56 M 0,76 L 50,56 M 0,132 Q 50,132 50,56 M 50,56 L 100,56" 
                    stroke={highlightedGroup === 'app' ? '#8b5cf6' : '#cbd5e1'} 
                    strokeWidth={highlightedGroup === 'app' ? '3' : '1.5'} 
                    fill="none" 
                  />
                  
                  {/* Group Transport Line (L4 -> TCP L3) */}
                  <path d="M 0,188 L 100,162" 
                    stroke={highlightedGroup === 'transport' ? '#4f46e5' : '#cbd5e1'} 
                    strokeWidth={highlightedGroup === 'transport' ? '3' : '1.5'} 
                    fill="none" 
                  />

                  {/* Group Internet Line (L3 -> TCP L2) */}
                  <path d="M 0,244 L 100,244" 
                    stroke={highlightedGroup === 'internet' ? '#10b981' : '#cbd5e1'} 
                    strokeWidth={highlightedGroup === 'internet' ? '3' : '1.5'} 
                    fill="none" 
                  />

                  {/* Group Access Lines (L2, L1 -> TCP L1) */}
                  <path d="M 0,300 Q 50,300 50,328 M 0,356 Q 50,356 50,328 M 50,328 L 100,328" 
                    stroke={highlightedGroup === 'access' ? '#f97316' : '#cbd5e1'} 
                    strokeWidth={highlightedGroup === 'access' ? '3' : '1.5'} 
                    fill="none" 
                  />
                </svg>
              </div>

              {/* Right Column: TCP/IP Layers (4 Rows) - Span 5 */}
              <div className="col-span-5 flex flex-col justify-between py-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block text-center">ชุดโปรโตคอล TCP/IP Model (4 ชั้น)</span>
                
                {/* TCP/IP L4 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('app')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('app')}
                  className={`rounded-2xl border text-center transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[140px] p-4
                    ${highlightedGroup === 'app' 
                      ? 'bg-violet-600 text-white border-violet-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-violet-300'
                    }`}
                >
                  <div>
                    <div className="font-extrabold text-sm sm:text-base">Layer 4: Application Layer</div>
                    <span className={`text-[10px] block mt-1 ${highlightedGroup === 'app' ? 'text-violet-250' : 'text-slate-400'}`}>
                      (เทียบเท่า OSI ชั้น 5, 6, 7)
                    </span>
                  </div>
                </div>

                {/* TCP/IP L3 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('transport')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('transport')}
                  className={`rounded-2xl border text-center transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[52px] p-3
                    ${highlightedGroup === 'transport' 
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                    }`}
                >
                  <div>
                    <div className="font-extrabold text-sm sm:text-base">Layer 3: Transport Layer</div>
                    <span className={`text-[10px] block ${highlightedGroup === 'transport' ? 'text-indigo-250' : 'text-slate-400'}`}>
                      (เทียบเท่า OSI ชั้น 4)
                    </span>
                  </div>
                </div>

                {/* TCP/IP L2 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('internet')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('internet')}
                  className={`rounded-2xl border text-center transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[52px] p-3
                    ${highlightedGroup === 'internet' 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                    }`}
                >
                  <div>
                    <div className="font-extrabold text-sm sm:text-base">Layer 2: Internet Layer</div>
                    <span className={`text-[10px] block ${highlightedGroup === 'internet' ? 'text-emerald-250' : 'text-slate-400'}`}>
                      (เทียบเท่า OSI ชั้น 3)
                    </span>
                  </div>
                </div>

                {/* TCP/IP L1 */}
                <div 
                  onMouseEnter={() => setHighlightedGroup('access')}
                  onMouseLeave={() => setHighlightedGroup(null)}
                  onClick={() => setHighlightedGroup('access')}
                  className={`rounded-2xl border text-center transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[96px] p-4
                    ${highlightedGroup === 'access' 
                      ? 'bg-orange-600 text-white border-orange-500 shadow-md scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                >
                  <div>
                    <div className="font-extrabold text-sm sm:text-base">Layer 1: Network Access Layer</div>
                    <span className={`text-[10px] block mt-1 ${highlightedGroup === 'access' ? 'text-orange-250' : 'text-slate-400'}`}>
                      (เทียบเท่า OSI ชั้น 1, 2)
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Quick reference table textbook style */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">ตารางสรุปความแตกต่างที่สำคัญทางวิชาการ</span>
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-sm bg-white/60">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs sm:text-sm">
                    <th className="p-4 font-bold border-b border-slate-800">หัวข้อเปรียบเทียบ</th>
                    <th className="p-4 font-bold border-b border-slate-800">แบบจำลอง OSI Model</th>
                    <th className="p-4 font-bold border-b border-slate-800">แบบจำลอง TCP/IP Model</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-[14px] text-zinc-700 font-medium">
                  <tr className="border-b border-slate-200">
                    <td className="p-4 font-bold text-slate-800 bg-slate-50/50">จำนวนชั้น (Layer)</td>
                    <td className="p-4">7 ชั้นสื่อสาร</td>
                    <td className="p-4">4 ชั้นสื่อสารหลัก</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 font-bold text-slate-800 bg-slate-50/50">วัตถุประสงค์และประเภท</td>
                    <td className="p-4">โมเดลอ้างอิงเชิงทฤษฎี (Theoretical Model) สร้างขึ้นเพื่อเป็นกรอบอ้างอิงและใช้ในการศึกษาเรียนรู้</td>
                    <td className="p-4">โมเดลทางปฏิบัติจริง (Practical Model) พัฒนาขึ้นโดยตรงจากโปรโตคอลหลักที่ใช้งานจริงบนระบบเครือข่ายอินเทอร์เน็ต</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 font-bold text-slate-800 bg-slate-50/50">ความชัดเจนของหน้างาน</td>
                    <td className="p-4">แยกส่วนการจัดการข้อมูล (Application/Presentation/Session) ออกเป็น 3 ชั้น เพื่อการออกแบบระบบซอฟต์แวร์ที่เป็นระเบียบ</td>
                    <td className="p-4">รวมการจัดการข้อมูลเบื้องบนทั้งหมดไว้ภายใต้ Application Layer เพื่อให้มีประสิทธิภาพในการไหลเวียนข้อมูลสูงขึ้น</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 bg-slate-50/50">ความแพร่หลายและการใช้</td>
                    <td className="p-4">ใช้เป็นมาตรฐานกลางในการสอนวิชาการระบบเครือข่ายและอ้างอิงข้อผิดพลาดทางวิชาชีพ</td>
                    <td className="p-4">เป็นโครงสร้างโปรแกรมเมอร์หลักและชุดโปรโตคอลระบบสื่อสารที่กำลังใช้งานอยู่จริงในระบบเครือข่ายปัจจุบัน</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Gamification Zone (QuizEngine) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ประเมินความรู้ท้ายการเรียน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบประเมินความรอบรู้ด้านมาตรฐานการสื่อสาร (Interactive Quiz Challenge)
            </h3>
          </div>
          
          <QuizEngine 
            title="เกมไขรหัส OSI & TCP/IP"
            description="ทดสอบความเข้าใจเกี่ยวกับชั้นการทำงานของแบบจำลองเครือข่ายและโปรโตคอลสื่อสารสากลเพื่อสะสมระดับผ่านเกณฑ์"
            levels={QUIZ_LEVELS}
            accentColor="from-blue-600/20 to-emerald-500/10"
            icon={<Network className="w-8 h-8 text-blue-400" />}
          />
        </section>

        {/* ─── Section 6: Standardized TeacherTask Footer ─── */}
        <TeacherTask 
          title="กิจกรรมปฏิบัติการ: วิเคราะห์โครงสร้างข้อมูล (PDU) และขั้นตอนการห่อหุ้มข้อมูล (Encapsulation Analysis)"
          taskText={`คำชี้แจง: ให้นักเรียนสวมบทบาทเป็น วิศวกรความมั่นคงระบบเครือข่าย (Network Security Engineer) ทำการเขียนวิเคราะห์และจำลองการรับส่งข้อมูลของบริการในองค์กร โดยตอบคำถามและทำงานส่งดังต่อไปนี้:

1. การวิเคราะห์ขั้นตอนการส่งข้อมูล (Encapsulation Steps):
   สมมติว่าพนักงานคนหนึ่งพิมพ์ข้อความส่งอีเมลผ่านโปรแกรมประยุกต์ไปยังแผนกบัญชี จงอธิบายขั้นตอนและรูปแบบของข้อมูล (PDU) ที่เปลี่ยนแปลงไปในแต่ละระดับชั้น ตั้งแต่หน้าจอคอมพิวเตอร์ผู้ส่ง (Layer 7) ลงไปจนถึงสายไฟเคเบิลแลนทางกายภาพ (Layer 1) 
   - ให้ระบุชื่อชั้น (ไทย/อังกฤษ)
   - ระบุชนิดของ PDU ที่เกิดขึ้นในชั้นนั้นๆ
   - อธิบายว่าข้อมูลได้รับการแนบหัวข้อ (Header) หรือมีฟังก์ชันการแปลงข้อมูลใดเกิดขึ้นในชั้นนั้น เช่น การแปลงภาษารหัสข้อมูล หรือการใส่ Port ส่ง/รับ

2. สถานการณ์จำลองการเกิดข้อบกพร่อง (Troubleshooting Analysis):
   - หากเราเตอร์ในแผนก IT ประสบปัญหา "หน่วยความจำเต็มทำให้ไม่สามารถหาเส้นทางเดินของข้อมูลปลายทางได้ (Routing Table Failure)" ปัญหานี้จัดอยู่ภายใต้ความผิดพลาดของ OSI Model ในชั้นใด? จงบอกชื่อชั้นพร้อมอธิบายเหตุผลประกอบเชิงวิทยาการคอมพิวเตอร์
   - หากการ์ดแลนส่งข้อมูลผิดพลาดแต่ไม่สามารถตรวจวัดรหัสเช็กข้อผิดพลาด CRC ท้ายข้อมูลได้ เกิดจากความล้มเหลวในชั้นใด?

3. แนวคิดเปรียบเทียบเชิงลึก (Textbook Terminology Reflection):
   - ในทางปฏิบัติ ระบบสารสนเทศในปัจจุบันทำไมจึงพัฒนาและใช้ตามโครงสร้างแบบจำลอง TCP/IP Model แทนการสร้างระบบโปรแกรมขึ้นตามข้อกำหนดเป๊ะๆ ของ OSI Model ทั้ง 7 ชั้น? ให้วิเคราะห์ข้อดี in แง่ของความรวดเร็วและขั้นตอนความซับซ้อน`}
        />

      </main>
    </div>
  );
}
