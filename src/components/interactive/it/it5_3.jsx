import React, { useState, useEffect } from 'react';
import { 
  Network, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2, 
  Info, 
  Database, 
  Cpu, 
  ArrowRight,
  Server,
  Laptop,
  ArrowLeftRight,
  Sliders,
  Settings,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Layers
} from 'lucide-react';
import { QuizEngine } from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// ─── Custom CSS Animations and Styles ───
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes drift-blob {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(25px, -25px) scale(1.06); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes pulse-light {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }
    .animate-drift-blob { animation: drift-blob 20s ease-in-out infinite; }
    .animate-pulse-light { animation: pulse-light 2s ease-in-out infinite; }
    
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

export default function IT5_3() {
  // ─── Simulator 1: DHCP DORA Animation State ───
  const [doraState, setDoraState] = useState(0); // 0: Idle, 1: Discover, 2: Offer, 3: Request, 4: ACK, 5: Complete
  const [isDoraAnimating, setIsDoraAnimating] = useState(false);
  const [clientIp, setClientIp] = useState('0.0.0.0');
  const [clientMask, setClientMask] = useState('0.0.0.0');
  const [clientGateway, setClientGateway] = useState('0.0.0.0');

  const handleStartDHCP = () => {
    if (isDoraAnimating) return;
    setIsDoraAnimating(true);
    setClientIp('0.0.0.0');
    setClientMask('0.0.0.0');
    setClientGateway('0.0.0.0');
    setDoraState(1);

    // Step 1: Discover (Client -> Server)
    setTimeout(() => {
      setDoraState(2);
      // Step 2: Offer (Server -> Client)
      setTimeout(() => {
        setDoraState(3);
        // Step 3: Request (Client -> Server)
        setTimeout(() => {
          setDoraState(4);
          // Step 4: ACK (Server -> Client)
          setTimeout(() => {
            setDoraState(5);
            setClientIp('192.168.1.185');
            setClientMask('255.255.255.0');
            setClientGateway('192.168.1.1');
            setIsDoraAnimating(false);
          }, 1800);
        }, 1800);
      }, 1800);
    }, 1800);
  };

  const handleResetDHCP = () => {
    setDoraState(0);
    setIsDoraAnimating(false);
    setClientIp('0.0.0.0');
    setClientMask('0.0.0.0');
    setClientGateway('0.0.0.0');
  };

  // ─── Simulator 2: Interactive Subnet Carver State ───
  const [subnetCount, setSubnetCount] = useState(4); // 1, 2, 4, 8 subnets
  const [selectedSubnetIdx, setSelectedSubnetIdx] = useState(0);

  // Subnet calculations helper based on class C 192.168.1.0/24
  const getSubnetInfo = () => {
    const baseIP = '192.168.1';
    
    if (subnetCount === 1) {
      return {
        borrowedBits: 0,
        newCidr: 24,
        mask: '255.255.255.0',
        hostsPerSubnet: 254,
        subnetsList: [
          {
            index: 0,
            network: `${baseIP}.0`,
            firstUsable: `${baseIP}.1`,
            lastUsable: `${baseIP}.254`,
            broadcast: `${baseIP}.255`,
            color: 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700 border-indigo-200'
          }
        ]
      };
    }
    
    if (subnetCount === 2) {
      return {
        borrowedBits: 1,
        newCidr: 25,
        mask: '255.255.255.128',
        hostsPerSubnet: 126,
        subnetsList: [
          {
            index: 0,
            network: `${baseIP}.0`,
            firstUsable: `${baseIP}.1`,
            lastUsable: `${baseIP}.126`,
            broadcast: `${baseIP}.127`,
            color: 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700 border-indigo-200'
          },
          {
            index: 1,
            network: `${baseIP}.128`,
            firstUsable: `${baseIP}.129`,
            lastUsable: `${baseIP}.254`,
            broadcast: `${baseIP}.255`,
            color: 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-700 border-teal-200'
          }
        ]
      };
    }
    
    if (subnetCount === 4) {
      return {
        borrowedBits: 2,
        newCidr: 26,
        mask: '255.255.255.192',
        hostsPerSubnet: 62,
        subnetsList: [
          {
            index: 0,
            network: `${baseIP}.0`,
            firstUsable: `${baseIP}.1`,
            lastUsable: `${baseIP}.62`,
            broadcast: `${baseIP}.63`,
            color: 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700 border-indigo-200'
          },
          {
            index: 1,
            network: `${baseIP}.64`,
            firstUsable: `${baseIP}.65`,
            lastUsable: `${baseIP}.127`,
            broadcast: `${baseIP}.127`,
            color: 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-700 border-teal-200'
          },
          {
            index: 2,
            network: `${baseIP}.128`,
            firstUsable: `${baseIP}.129`,
            lastUsable: `${baseIP}.190`,
            broadcast: `${baseIP}.191`,
            color: 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-700 border-cyan-200'
          },
          {
            index: 3,
            network: `${baseIP}.192`,
            firstUsable: `${baseIP}.193`,
            lastUsable: `${baseIP}.254`,
            broadcast: `${baseIP}.255`,
            color: 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 border-emerald-200'
          }
        ]
      };
    }

    // Default 8 subnets
    const list = [];
    const colors = [
      'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700 border-indigo-200',
      'bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 border-blue-200',
      'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-700 border-cyan-200',
      'bg-teal-500/20 hover:bg-teal-500/30 text-teal-700 border-teal-200',
      'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 border-emerald-200',
      'bg-green-500/20 hover:bg-green-500/30 text-green-700 border-green-200',
      'bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 border-amber-200',
      'bg-orange-500/20 hover:bg-orange-500/30 text-orange-700 border-orange-200'
    ];
    for (let i = 0; i < 8; i++) {
      const start = i * 32;
      list.push({
        index: i,
        network: `${baseIP}.${start}`,
        firstUsable: `${baseIP}.${start + 1}`,
        lastUsable: `${baseIP}.${start + 30}`,
        broadcast: `${baseIP}.${start + 31}`,
        color: colors[i]
      });
    }
    return {
      borrowedBits: 3,
      newCidr: 27,
      mask: '255.255.255.224',
      hostsPerSubnet: 30,
      subnetsList: list
    };
  };

  const subnetInfo = getSubnetInfo();

  // Reset selected subnet index when count changes
  useEffect(() => {
    setSelectedSubnetIdx(0);
  }, [subnetCount]);

  // ─── Quiz Levels Config ───
  const QUIZ_LEVELS = [
    {
      title: 'ด่านที่ 1: ขั้นตอน Discover ของ DHCP',
      desc: 'ในกระบวนการรับไอพีแบบ DORA ของโปรโตคอล DHCP เมื่อคอมพิวเตอร์เปิดเครื่องขึ้นมาครั้งแรก (IP เป็น 0.0.0.0) อุปกรณ์จะทำการส่งแพ็กเกจประเภทใดเพื่อค้นหาเครื่องเซิร์ฟเวอร์ที่แจกจ่ายไอพีในเครือข่าย?',
      options: [
        { key: 'A', text: 'DHCP Request (ส่งแบบเจาะจงที่อยู่ Server)', isCorrect: false },
        { key: 'B', text: 'DHCP Discover (ส่งแบบแพร่กระจาย Broadcast ไปทั่วโครงข่าย)', isCorrect: true },
        { key: 'C', text: 'DHCP Offer (รอรับข้อความเสนอหมายเลขจาก Router)', isCorrect: false },
        { key: 'D', text: 'Static Announcement (ประกาศไอพีที่ต้องการใช้ออกไปตรงๆ)', isCorrect: false }
      ],
      tip: 'ในขั้นตอนแรก Client ไม่รู้จักไอพีของ DHCP Server เลย จึงต้องส่งข้อความ DHCP Discover แบบ Broadcast ไปยังปลายทาง IP 255.255.255.255'
    },
    {
      title: 'ด่านที่ 2: วัตถุประสงค์หลักของการแบ่ง Subnet',
      desc: 'เหตุผลสำคัญที่สุดที่วิศวกรโครงข่ายไอทีต้องทำกระบวนการ Subnetting (แบ่งวงเครือข่ายย่อย) สำหรับองค์กรที่มีอุปกรณ์จำนวนมากคือข้อใด?',
      options: [
        { key: 'A', text: 'เพื่อเพิ่มความเร็วในการเชื่อมต่ออินเทอร์เน็ตระหว่างประเทศ', isCorrect: false },
        { key: 'B', text: 'เพื่อเปลี่ยนสาย LAN ทั้งหมดในสำนักงานให้เป็นระบบไฟเบอร์ออปติก', isCorrect: false },
        { key: 'C', text: 'เพื่อเพิ่มจำนวนหมายเลขไอพีแอดเดรสที่มีในโลกให้มากขึ้น', isCorrect: false },
        { key: 'D', text: 'เพื่อควบคุมการกระจายของ Broadcast Traffic และจำกัดขอบเขตความมั่นคงปลอดภัย', isCorrect: true }
      ],
      tip: 'การแบ่งซับเน็ตจะลดขนาด Broadcast Domain ทำให้อุปกรณ์ไม่ได้รับผลกระทบจากทราฟฟิกขยะ และช่วยจำกัดขอบเขตสิทธิ์ความปลอดภัย'
    },
    {
      title: 'ด่านที่ 3: คณิตศาสตร์คำนวณซับเน็ต',
      desc: 'ถ้าคุณได้รับไอพีคลาส C หมายเลข 192.168.1.0/24 มาจากผู้บริการ และต้องการแบ่งเครือข่ายนี้ออกเป็น 4 วงย่อยอย่างเท่าๆ กัน คุณจำเป็นต้องปรับ Subnet Mask เป็นหมายเลขใดเพื่อควบคุมการคำนวณบิต?',
      options: [
        { key: 'A', text: '255.255.255.128 (/25)', isCorrect: false },
        { key: 'B', text: '255.255.255.192 (/26)', isCorrect: true },
        { key: 'C', text: '255.255.255.224 (/27)', isCorrect: false },
        { key: 'D', text: '255.255.255.240 (/28)', isCorrect: false }
      ],
      tip: 'ต้องการแบ่งเป็น 4 ซับเน็ต (2^2 = 4) ต้องยืมบิตของ Host มา 2 บิต เดิมจาก /24 จะกลายเป็น /26 ซึ่งมีบิตหน้าเป็น 1 ทั้งหมดใน Octet สุดท้ายคือ 11000000 แปลงเป็นฐานสิบได้ 192'
    }
  ];

  return (
    <div className="font-sans text-slate-800 pb-20 relative overflow-hidden">
      <CustomStyles />

      {/* ─── Layer 1: Ambient Background Blobs ─── */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-drift-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none animate-drift-blob" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-88 h-88 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-drift-blob" style={{ animationDelay: '6s' }}></div>
      <div className="absolute top-1/2 right-12 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none animate-drift-blob" style={{ animationDelay: '9s' }}></div>

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* Intro Section */}
        <div className="space-y-4">
          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            หลังจากทำความเข้าใจโครงสร้างของที่อยู่ตรรกะแล้ว ขั้นตอนสำคัญถัดไปในงานไอทีคือ **การตั้งค่าใช้งานจริง** ซึ่งแบ่งออกเป็นการกำหนดหมายเลขแบบจดบันทึกด้วยมือ (Static IP) และการรับหมายเลขโดยอัตโนมัติจากผู้บริหารโครงข่าย (Dynamic IP ผ่านระบบ DHCP) นอกจากนี้ วิศวกรเครือข่ายยังต้องมีความสามารถในการออกแบบและบริหารจัดซอยโครงข่ายย่อย หรือที่เรียกว่า <strong className="text-indigo-600 font-semibold">Subnetting</strong> เพื่อสร้างความมั่นคงปลอดภัยและประสิทธิภาพสูงสุดในองค์กร
          </p>

          <div className="p-5 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl border-l-[3.5px] border-l-indigo-500 shadow-sm leading-relaxed">
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1 block">💡 สรุปหลักการเปรียบเทียบในชีวิตจริง (Human Analogy)</span>
            <p className="text-zinc-600 text-[14.5px] font-normal leading-relaxed">
              - **Static IP vs Dynamic IP**: เปรียบเสมือน **"การมีเบอร์โทรศัพท์ประจำตัว"** แบบจองถาวรไม่เคยเปลี่ยน (Static) เทียบกับ **"การใช้บัตรคิวร้านอาหาร"** ที่จะได้รับเบอร์ชั่วคราวตามที่ว่างในเวลานั้น เมื่อทานเสร็จก็ส่งคืนบัตรคิวกลับร้านเพื่อให้ลูกค้าคนอื่นหยิบใช้ต่อไป (Dynamic DHCP)
              <br/>
              - **Subnetting**: เปรียบเหมือน **"ตึกสำนักงานใหญ่ 1 หลัง"** ที่เปิดโล่ง หากพนักงานทุกคนส่งเสียงคุยพร้อมกันจะเกิดเสียงดังวุ่นวายหนวกหูมาก (Broadcast Storm) จึงต้องแก้ปัญหาโดยการสร้าง **"ห้องย่อยแยกแผนก" (Subnets)** เพื่อกั้นทราฟฟิกคุยเสียงให้ได้ยินกันเฉพาะคนในแผนกนั้นๆ
            </p>
          </div>
        </div>

        {/* ─── Section 1: Static IP vs Dynamic IP (DHCP) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              วิธีการแจกจ่ายไอพีแอดเดรส
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การกำหนดหมายเลขไอพีแบบคงที่ และแบบอัตโนมัติ (Static IP vs Dynamic DHCP)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ในการนำอุปกรณ์เข้ามาเชือมต่อในระบบแลน มีวิธีจัดการกำหนดที่อยู่ไอพีแอดเดรสออกเป็น 2 แนวทางหลัก:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Static Card */}
            <div className="glass-panel border-l-[3.5px] border-l-amber-500 rounded-3xl p-6 flex flex-col justify-between cursor-default">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  <Settings className="w-3.5 h-3.5" /> Static IP (แบบตั้งค่าเองคงที่)
                </span>
                <p className="text-zinc-600 text-[14.5px] leading-relaxed font-semibold">
                  การที่วิศวกรผู้ดูแลระบบป้อนตัวเลขไอพีแอดเดรส ซับเน็ตมาสก์ และเกตเวย์ เข้าไปฝังในอุปกรณ์เครื่องนั้นๆ โดยตรงผ่านแป้นพิมพ์
                </p>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex items-start gap-1">
                    <span className="text-amber-500">•</span>
                    <span><strong>ความเสถียร</strong>: สูงสุด ไอพีไม่มีการเปลี่ยนแปลงอย่างแน่นอน</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-amber-500">•</span>
                    <span><strong>การใช้งาน</strong>: เหมาะสำหรับเครื่องแม่ข่าย (Servers), เครื่องพิมพ์เครือข่าย (Printers), และเราเตอร์กลาง</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-amber-500">•</span>
                    <span><strong>ข้อจำกัด</strong>: ยุ่งยาก เสียเวลาจัดการ และอาจเกิดข้อผิดพลาดในการป้อนจนไอพีชนกันได้ง่าย</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dynamic Card */}
            <div className="glass-panel border-l-[3.5px] border-l-teal-500 rounded-3xl p-6 flex flex-col justify-between cursor-default">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold rounded-full">
                  <RefreshCw className="w-3.5 h-3.5" /> Dynamic IP / DHCP (แบบแจกจ่ายอัตโนมัติ)
                </span>
                <p className="text-zinc-600 text-[14.5px] leading-relaxed font-semibold">
                  ระบบที่อุปกรณ์ปลายทางจะทำการร้องขอหมายเลขไอพีจาก **DHCP Server** ในเครือข่ายเมื่อเปิดเครื่อง ซึ่งจะถูกจัดสรรไอพีที่ยังว่างอยู่ให้ชั่วคราวตามเวลาเช่า (Lease Time)
                </p>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex items-start gap-1">
                    <span className="text-teal-500">•</span>
                    <span><strong>ความสะดวก</strong>: สูงสุด เสียบสายแลนปุ๊บก็เชื่อมต่อใช้งานได้ทันทีไม่ต้องพิมพ์ตัวเลข</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-teal-500">•</span>
                    <span><strong>การใช้งาน</strong>: เหมาะสำหรับอุปกรณ์ทั่วไป เช่น โน้ตบุ๊ก, โทรศัพท์มือถือ, แท็บเล็ต, ลูกข่ายออฟฟิศ</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-teal-500">•</span>
                    <span><strong>ข้อดีหลัก</strong>: บริหารค่าไอพีได้ประหยัด ป้องกันบั๊กไอพีชนกันในวงได้ดีเยี่ยม</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Section 2: DHCP DORA Process Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ตัวจำลองการรับส่งข้อความสิทธิเช่า
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องจำลองการขอไอพีอัตโนมัติ (DHCP DORA Process Simulator)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            กระบวนการรับไอพีแบบไดนามิก ทำงานอยู่ภายใต้ลำดับการจับคู่แบบ **DORA (Discover, Offer, Request, Acknowledge)** ทดลองกดปุ่มเพื่อจำลองสถานการณ์การขอรับสิทธิ์เช่าไอพีของอุปกรณ์ลูกข่าย:
          </p>

          {/* SIMULATOR SHELL - DARK PANEL */}
          <div className="dark-panel-left rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Top Right Label */}
            <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">// DHCP_DORA_ANIMATOR</span>
            
            <div className="relative z-10 flex flex-col gap-8">
              
              {/* Animation Visual Stage */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center p-4 bg-slate-950/60 rounded-3xl border border-slate-800 min-h-[220px] relative overflow-hidden">
                
                {/* Client Node - Left - Span 3 */}
                <div className="md:col-span-3 flex flex-col items-center gap-3 text-center">
                  <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center shadow-lg relative group">
                    <Laptop className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                    {isDoraAnimating && doraState === 1 && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500 animate-ping opacity-60"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-white font-bold text-xs">เครื่องคอมพิวเตอร์ลูกข่าย (Client)</span>
                    <div className="font-mono text-[10px] text-slate-400 mt-1 space-y-0.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <div>IP: {clientIp}</div>
                      <div>Mask: {clientMask}</div>
                      <div>Gateway: {clientGateway}</div>
                    </div>
                  </div>
                </div>

                {/* Path with animated packet - Middle - Span 6 */}
                <div className="md:col-span-6 flex flex-col items-center justify-center relative py-8">
                  {/* DORA Packet Visual */}
                  {doraState > 0 && doraState < 5 && (
                    <div 
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-[10px] font-bold text-white border transition-all duration-[1700ms] ease-in-out
                        ${doraState === 1 || doraState === 3 ? 'bg-indigo-600 border-indigo-400' : 'bg-emerald-600 border-emerald-400'}
                      `}
                      style={{
                        left: doraState === 1 || doraState === 3 ? 'calc(100% - 2rem)' : '0px',
                        transform: doraState === 1 || doraState === 3 ? 'translateX(-100%)' : 'translateX(0%)',
                        transitionProperty: 'left, transform'
                      }}
                    >
                      ✉️
                    </div>
                  )}

                  {/* SVG line */}
                  <svg className="w-full h-4" viewBox="0 0 200 16" preserveAspectRatio="none">
                    <path d="M 0,8 L 200,8" stroke="#334155" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 8" />
                  </svg>

                  {/* Stage description text */}
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-2">
                    {doraState === 0 && 'รอการเริ่มต้นส่งคำขอ'}
                    {doraState === 1 && '1. DHCP DISCOVER (Broadcast ค้นหา)'}
                    {doraState === 2 && '2. DHCP OFFER (Server เสนอ IP)'}
                    {doraState === 3 && '3. DHCP REQUEST (Client ขอเช่า)'}
                    {doraState === 4 && '4. DHCP ACK (Server อนุมัติการเช่า)'}
                    {doraState === 5 && 'เสร็จสิ้นการเช่าไอพีแอดเดรสสำเร็จ!'}
                  </span>
                </div>

                {/* Server Node - Right - Span 3 */}
                <div className="md:col-span-3 flex flex-col items-center gap-3 text-center">
                  <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center shadow-lg relative group">
                    <Server className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    {isDoraAnimating && doraState === 2 && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500 animate-ping opacity-60"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-white font-bold text-xs">DHCP Server (บนเราเตอร์/แม่ข่าย)</span>
                    <div className="font-mono text-[10px] text-slate-400 mt-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <div>IP Pool: 192.168.1.100 - 250</div>
                      <div>Gateway: 192.168.1.1</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Status Explanation Card */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                    {doraState === 0 && 'สถานะ: พลักพร้อมเชื่อมต่อเครือข่าย'}
                    {doraState === 1 && 'ขั้นตอนที่ 1: DHCP Discover (Client -> All)'}
                    {doraState === 2 && 'ขั้นตอนที่ 2: DHCP Offer (Server -> Client)'}
                    {doraState === 3 && 'ขั้นตอนที่ 3: DHCP Request (Client -> Server)'}
                    {doraState === 4 && 'ขั้นตอนที่ 4: DHCP Acknowledge (Server -> Client)'}
                    {doraState === 5 && 'สถานะ: อุปกรณ์พร้อมใช้การสื่อสารสำเร็จ'}
                  </h5>
                </div>
                <p className="text-slate-300 text-[14px] leading-relaxed font-normal min-h-[48px]">
                  {doraState === 0 && 'เสียบสายเชื่อมสัญญาณ เครื่องจะตั้งค่าไอพีชั่วคราวเริ่มต้นเป็น 0.0.0.0 รอรับหมายเลขจริง'}
                  {doraState === 1 && 'เครื่อง Client ตะโกนถามกระแสหลัก Broadcast (255.255.255.255) ว่า "ในห้องนี้มีใครเป็นเซิร์ฟเวอร์แจกหมายเลขไอพีแอดเดรสบ้างไหม?"'}
                  {doraState === 2 && 'DHCP Server เมื่อได้ยินคำถาม จึงเช็คฐานระบบแล้วยื่นส่งข้อเสนอ "ฉันเสนอให้เช่าไอพีแอดเดรสหมายเลข 192.168.1.185 นะ"'}
                  {doraState === 3 && 'Client ตอบรับกลับแบบส่งตรงไปหาเครื่องเซิร์ฟเวอร์นั้นว่า "ตกลงครับ ฉันขอยืนยันสิทธิ์ในการเช่าไอพี 192.168.1.185 ที่เสนอมา"' }
                  {doraState === 4 && 'Server ตอบรับบันทึกตารางเข้าระบบฐานและยืนยันการเช่าเรียบร้อย "อนุมัติเช่า! นี่คือรายละเอียด Gateway 192.168.1.1 และ DNS 8.8.8.8 และซับเน็ตมาสก์ 255.255.255.0"' }
                  {doraState === 5 && 'เครื่อง Client ทำการรับรายละเอียด ตั้งค่าระบบตนเองเรียบร้อย และเริ่มเชื่อมต่อแล่นใช้อินเทอร์เน็ตได้ทันที' }
                </p>
              </div>

              {/* Simulation controls */}
              <div className="flex gap-4 items-center justify-center">
                <button
                  onClick={handleStartDHCP}
                  disabled={isDoraAnimating || doraState === 5}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl font-bold text-xs cursor-pointer hover:scale-[1.02] active:scale-98 transition-all border border-indigo-500"
                >
                  ⚡ เริ่มจำลองรับไอพีอัตโนมัติ (DORA)
                </button>
                <button
                  onClick={handleResetDHCP}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs cursor-pointer hover:scale-[1.02] active:scale-98 transition-all border border-slate-700"
                >
                  รีเซ็ต
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Section 3: Subnetting Math & Carver ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คณิตศาสตร์การหั่นเครือข่ายย่อย
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              หลักการและเครื่องจำลองการหั่นแบ่งวงซับเน็ต (Subnetting & Subnet Carver)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ในการบริหารไอพีขององค์กร การใช้เครือข่ายวงแลนขนาดใหญ่ร่วมกันจะทำให้ทราฟฟิก Broadcast ไหลกว้างจนเครื่องคอมพิวเตอร์ช้าลง จึงต้องมีแนวคิดการแบ่งซอยเรียกว่า **Subnetting** โดยใช้คณิตศาสตร์บิตมาทำหน้าที่ **"ยืมบิตของเครื่องลูกข่าย (Host Bits) มาเสริมบิตของเครือข่าย (Network Bits)"**
          </p>

          {/* Interactive Subnet Carver Visualizer */}
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8 border border-slate-200/50 shadow-xl bg-white/60 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Subnet Control Panel - Span 4 */}
              <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-white/10 shadow-2xl text-slate-200">
                <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">SUBNET_CARVER_INPUT</span>
                
                <div className="space-y-5">
                  <div className="border-b border-slate-800 pb-2">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-indigo-400" /> ตั้งค่าแบ่งซับเน็ต
                    </h4>
                  </div>

                  <div className="text-xs text-slate-400 leading-relaxed">
                    เลือกความต้องการในการหั่นแบ่งวงแลนหลัก <strong>192.168.1.0/24</strong> (ดีฟอลต์ Class C) ออกเป็นกี่เครือข่ายย่อย:
                  </div>

                  {/* Subnet selector options */}
                  <div className="flex flex-col gap-2.5">
                    {[
                      { count: 1, text: 'ไม่แบ่งเลย (1 ซับเน็ต)', cidr: '/24' },
                      { count: 2, text: 'แบ่งเป็น 2 วงย่อย', cidr: '/25' },
                      { count: 4, text: 'แบ่งเป็น 4 วงย่อย', cidr: '/26' },
                      { count: 8, text: 'แบ่งเป็น 8 วงย่อย', cidr: '/27' }
                    ].map((opt) => (
                      <button
                        key={opt.count}
                        onClick={() => setSubnetCount(opt.count)}
                        className={`w-full text-left p-3.5 rounded-xl border font-bold text-xs cursor-pointer hover:scale-[1.01] active:scale-99 transition-all duration-200 flex justify-between items-center
                          ${subnetCount === opt.count
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                      >
                        <span>{opt.text}</span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${subnetCount === opt.count ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-900 text-indigo-300'}`}>
                          {opt.cidr}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Subnet Parameter Outputs */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 flex flex-col gap-2 text-xs font-mono">
                    <div className="flex justify-between items-center py-1 border-b border-slate-900">
                      <span className="text-slate-400">ยืมบิต Host (Borrow):</span>
                      <span className="text-indigo-400 font-bold">{subnetInfo.borrowedBits} บิต</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-900">
                      <span className="text-slate-400">ซับเน็ตมาสก์ใหม่:</span>
                      <span className="text-teal-400 font-bold">{subnetInfo.mask}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">จำนวนเครื่องต่อวง:</span>
                      <span className="text-emerald-400 font-bold">{subnetInfo.hostsPerSubnet} เครื่อง</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Visual Subnet Carver Map - Span 8 */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Visual Block Representation */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">แผนภูมิสัดส่วนการหั่นแยกเครือข่ายหลัก 192.168.1.0 (Octet ที่ 4: 0-255)</span>
                  
                  {/* Grid layout with dynamic column width to visualize slices */}
                  <div className="w-full flex h-14 rounded-2xl border border-slate-300/80 overflow-hidden shadow-inner font-mono font-bold text-xs select-none">
                    {subnetInfo.subnetsList.map((sub, idx) => {
                      const isSelected = selectedSubnetIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedSubnetIdx(idx)}
                          className={`h-full flex-1 flex flex-col items-center justify-center border-r last:border-r-0 border-white/20 transition-all duration-300 cursor-pointer
                            ${sub.color}
                            ${isSelected ? 'ring-4 ring-indigo-500/80 ring-inset opacity-100 z-10 scale-[1.01]' : 'opacity-90'}
                          `}
                        >
                          <span className="text-[11px] sm:text-xs">ซับเน็ต #{idx + 1}</span>
                          <span className="text-[9px] opacity-80 mt-0.5">.{sub.network.split('.')[3]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subnet Details Box */}
                {(() => {
                  const s = subnetInfo.subnetsList[selectedSubnetIdx];
                  if (!s) return null;
                  return (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" /> 
                          รายละเอียดซับเน็ตลำดับที่ #{s.index + 1}
                        </h5>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase font-mono">
                          ID: 192.168.1.{s.network.split('.')[3]} /{subnetInfo.newCidr}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col gap-1 justify-between">
                          <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Network Address</span>
                          <span className="font-mono text-sm font-bold text-slate-800">{s.network}</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col gap-1 justify-between">
                          <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">ช่วงที่อุปกรณ์ใช้งานได้ (Usable Range)</span>
                          <span className="font-mono text-xs font-bold text-slate-800">{s.firstUsable} - {s.lastUsable}</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col gap-1 justify-between">
                          <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Broadcast Address</span>
                          <span className="font-mono text-sm font-bold text-slate-800">{s.broadcast}</span>
                        </div>

                      </div>
                    </div>
                  );
                })()}

                {/* Subnets List Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-sm bg-white/60">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs sm:text-sm">
                        <th className="p-3.5 font-bold border-b border-slate-800">ลำดับ</th>
                        <th className="p-3.5 font-bold border-b border-slate-800 font-mono">Network Address</th>
                        <th className="p-3.5 font-bold border-b border-slate-800 font-mono">Usable IP Range</th>
                        <th className="p-3.5 font-bold border-b border-slate-800 font-mono">Broadcast Address</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-[13.5px] text-zinc-700 font-medium font-mono">
                      {subnetInfo.subnetsList.map((sub, idx) => (
                        <tr 
                          key={idx}
                          onClick={() => setSelectedSubnetIdx(idx)}
                          className={`border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors
                            ${selectedSubnetIdx === idx ? 'bg-indigo-50/50' : ''}
                          `}
                        >
                          <td className="p-3 font-bold text-slate-800 text-center font-sans">#{idx + 1}</td>
                          <td className="p-3 text-slate-800 font-bold">{sub.network}</td>
                          <td className="p-3">{sub.firstUsable} - {sub.lastUsable}</td>
                          <td className="p-3 text-slate-600">{sub.broadcast}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ─── Section 4: QuizEngine Gamification ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ประเมินความรอบรู้ท้ายการเรียน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบประเมินทักษะการแจกจ่ายไอพีและ Subnetting (Interactive Quiz Challenge)
            </h3>
          </div>
          
          <QuizEngine 
            title="เกมไขปมเครือข่าย (DHCP & Subnetting Quiz)"
            description="ประเมินทักษะขั้นตอน DORA, Static/Dynamic IP และคณิตศาสตร์คำนวณแบ่งช่วงหมายเลขซับเน็ต"
            levels={QUIZ_LEVELS}
            accentColor="from-teal-600/25 to-emerald-500/10"
            icon={<Layers className="w-8 h-8 text-teal-500" />}
          />
        </section>

        {/* ─── Section 5: Standardized TeacherTask Footer ─── */}
        <TeacherTask 
          title="กิจกรรมปฏิบัติการ: ออกแบบและจัดสรรซับเน็ตเครือข่ายสาขา (IT Branch Subnet Design Sheet)"
          taskText={`คำชี้แจง: ให้นักเรียนสวมบทบาทเป็น วิศวกรผู้ออกแบบและวางระบบโครงข่าย (Network Infrastructure Architect) ทำการประเมินวิเคราะห์และเขียนรายงานการแบ่งที่อยู่ไอพีให้กับสำนักงานสาขา โดยตอบคำถามและทำงานส่งดังต่อไปนี้:

1. แผนภาพลำดับ DORA (DHCP DORA Sequence Report):
   - ให้นักเรียนเรียงลำดับขั้นตอนและอธิบายวัตถุประสงค์สั้นๆ ของข้อมูล 4 ชุดในกระบวนการ DORA ที่ใช้ในการขอหมายเลขไอพีอัตโนมัติจาก DHCP Server
   - เพราะเหตุใดคอมพิวเตอร์ที่เปิดเครื่องครั้งแรกสุด จึงยังไม่สามารถตั้งค่าแบบ Static IP ได้เองแบบอัตโนมัติ หากไม่มีเทคโนโลยี DHCP?

2. โครงงานออกแบบการหั่นแบ่งวงย่อย (Subnetting Calculator Task):
   กำหนดหมายเลขเครือข่ายตั้งต้นที่เป็นของบริษัทลูกข่ายคือ: "192.168.10.0/24" (Class C)
   ฝ่ายบริหารต้องการจัดแบ่งแผนกออกเป็น 2 ส่วนย่อย ได้แก่ แผนกบัญชี (ต้องการอุปกรณ์ใช้งานสูงสุด 40 เครื่อง) และแผนกการตลาด (ต้องการอุปกรณ์ใช้งานสูงสุด 50 เครื่อง)
   - จงเสนอหมายเลข Subnet Mask ใหม่ในรูป CIDR และตัวเลขฐานสิบ ที่ใช้งานได้เหมาะสมและประหยัดพื้นที่ไอพีที่สุด
   - จงเขียนบอกตารางวิเคราะห์ซับเน็ตทั้ง 2 วง ได้แก่:
     * ซับเน็ตวงที่ 1 (แผนกบัญชี): Network Address, Usable Host Range, และ Broadcast Address
     * ซับเน็ตวงที่ 2 (แผนกการตลาด): Network Address, Usable Host Range, และ Broadcast Address
     * เครื่องลูกข่ายแผนกการตลาดเครื่องแรกสุดที่ติดตั้งด้วย DHCP จะได้รับหมายเลขไอพีอะไร?

3. การวิเคราะห์ปัญหาเครือข่าย (Static/Dynamic Troubleshooting):
   - ถ้าวิศวกรระบบทำการป้อน Static IP ขนาด "192.168.1.50" ลงในเครื่องคอมพิวเตอร์ลูกข่ายแบบตั้งโต๊ะ แต่ DHCP Server ในวงเดียวกันก็แจกหมายเลข "192.168.1.50" ออกไปให้สมาร์ตโฟนด้วย จะเกิดความผิดพลาดใดในระบบ และจะส่งผลกระทบต่ออุปกรณ์ทั้งสองชิ้นอย่างไร?`}
        />

      </main>
    </div>
  );
}
