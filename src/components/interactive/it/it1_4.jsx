import React, { useState } from 'react';
import { 
  Network, 
  Share2, 
  Circle, 
  Grid, 
  GitMerge, 
  Monitor, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Info 
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    
    /* Topology Animations via SVG stroke-dasharray and CSS */
    @keyframes dash-move {
      to { stroke-dashoffset: -100; }
    }
    @keyframes packet-travel {
      0% { offset-distance: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { offset-distance: 100%; opacity: 0; }
    }
    @keyframes node-pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--rgb-color), 0.7); }
      70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(var(--rgb-color), 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--rgb-color), 0); }
    }

    .animate-dash {
      animation: dash-move 3s linear infinite;
    }
    .animate-dash-fast {
      animation: dash-move 1.5s linear infinite;
    }
    .animate-dash-reverse {
      animation: dash-move 3s linear infinite reverse;
    }

    .sim-grid-bg {
      background-size: 30px 30px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }

    @keyframes blob-drift {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(25px, -25px) scale(1.05); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-drift {
      animation: blob-drift 15s ease-in-out infinite;
    }
  `}} />
);

// Component สำหรับแสดงหน้าจอจำลองการวิ่งของข้อมูล (Simulator)
const TopologySimulator = ({ type }) => {
  switch (type) {
    case 'Bus':
      return (
        <div className="relative w-full h-72 bg-slate-950/95 backdrop-blur-xl rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-500 font-bold tracking-widest">
            SIMULATOR: BUS_TOPOLOGY
          </div>
          
          <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
            {/* Backbone Cable */}
            <line x1="10%" y1="35%" x2="90%" y2="35%" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
            <line x1="10%" y1="35%" x2="90%" y2="35%" stroke="#fdba74" strokeWidth="2" strokeDasharray="10 15" className="animate-dash" />
            
            {/* Drop Lines */}
            <line x1="25%" y1="35%" x2="25%" y2="65%" stroke="#f97316" strokeWidth="3" />
            <line x1="50%" y1="35%" x2="50%" y2="65%" stroke="#f97316" strokeWidth="3" />
            <line x1="75%" y1="35%" x2="75%" y2="65%" stroke="#f97316" strokeWidth="3" />
            
            {/* Animated Data Packet */}
            <circle cx="25%" cy="35%" r="5" fill="#fef08a" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="50%" cy="35%" r="5" fill="#fef08a" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          </svg>

          {/* Nodes */}
          <div className="absolute top-[65%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-orange-300 animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-orange-300 animate-pulse" style={{ animationDuration: '4s' }} />
          </div>
          <div className="absolute top-[65%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-orange-300 animate-pulse" style={{ animationDuration: '5s' }} />
          </div>
          
          {/* Terminators */}
          <div className="absolute top-[35%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-slate-600 border border-slate-500 rounded-sm z-20 shadow-md"></div>
          <div className="absolute top-[35%] left-[90%] -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-slate-600 border border-slate-500 rounded-sm z-20 shadow-md"></div>
        </div>
      );

    case 'Star':
      return (
        <div className="relative w-full h-72 bg-slate-950/95 backdrop-blur-xl rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-500 font-bold tracking-widest">
            SIMULATOR: STAR_TOPOLOGY
          </div>
          
          <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
            {/* Connection Lines */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#2563eb" strokeWidth="3" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#2563eb" strokeWidth="3" />
            <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#2563eb" strokeWidth="3" />
            <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#2563eb" strokeWidth="3" />
            
            {/* Animated Data Packets (In and Out) */}
            <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#93c5fd" strokeWidth="3" strokeDasharray="10 100" className="animate-dash" />
            <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#93c5fd" strokeWidth="3" strokeDasharray="10 100" className="animate-dash" style={{ animationDelay: '1.5s' }} />
          </svg>

          {/* Central Hub/Switch */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-blue-600 border-2 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.6)] rounded-2xl flex items-center justify-center">
            <Server className="w-8 h-8 text-white" />
          </div>

          {/* Nodes */}
          <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-blue-300" />
          </div>
          <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-blue-300" />
          </div>
          <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-blue-300" />
          </div>
          <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-blue-300" />
          </div>
        </div>
      );

    case 'Ring':
      return (
        <div className="relative w-full h-72 bg-slate-950/95 backdrop-blur-xl rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-500 font-bold tracking-widest">
            SIMULATOR: RING_TOPOLOGY
          </div>
          
          <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
            {/* Ring Cable */}
            <ellipse cx="50%" cy="50%" rx="35%" ry="35%" fill="none" stroke="#10b981" strokeWidth="4" />
            
            {/* Animated Token/Data moving in circle */}
            <ellipse cx="50%" cy="50%" rx="35%" ry="35%" fill="none" stroke="#6ee7b7" strokeWidth="4" strokeDasharray="20 300" className="animate-dash-fast" />
          </svg>

          {/* Nodes (Positioned symmetrically on the circle path) */}
          <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="absolute top-[50%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="absolute top-[50%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-900 border-2 border-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-6 h-6 text-emerald-300" />
          </div>
        </div>
      );

    case 'Mesh':
      return (
        <div className="relative w-full h-72 bg-slate-950/95 backdrop-blur-xl rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-500 font-bold tracking-widest">
            SIMULATOR: FULL_MESH_TOPOLOGY
          </div>
          
          <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
            <g stroke="#8b5cf6" strokeWidth="2" opacity="0.6">
              {/* Node 1 to others */}
              <line x1="50%" y1="15%" x2="85%" y2="40%" />
              <line x1="50%" y1="15%" x2="70%" y2="80%" />
              <line x1="50%" y1="15%" x2="30%" y2="80%" />
              <line x1="50%" y1="15%" x2="15%" y2="40%" />
              {/* Node 2 to others */}
              <line x1="85%" y1="40%" x2="70%" y2="80%" />
              <line x1="85%" y1="40%" x2="30%" y2="80%" />
              <line x1="85%" y1="40%" x2="15%" y2="40%" />
              {/* Node 3 to others */}
              <line x1="70%" y1="80%" x2="30%" y2="80%" />
              <line x1="70%" y1="80%" x2="15%" y2="40%" />
              {/* Node 4 to 5 */}
              <line x1="30%" y1="80%" x2="15%" y2="40%" />
            </g>
            
            {/* Animated Data Packets across multiple paths */}
            <g stroke="#c4b5fd" strokeWidth="3" strokeDasharray="10 100" className="animate-dash">
              <line x1="15%" y1="40%" x2="50%" y2="15%" />
              <line x1="70%" y1="80%" x2="30%" y2="80%" style={{ animationDelay: '0.5s' }} />
              <line x1="85%" y1="40%" x2="30%" y2="80%" style={{ animationDelay: '1s' }} />
            </g>
          </svg>

          {/* Nodes (Pentagon arrangement for symmetry) */}
          <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-purple-300" />
          </div>
          <div className="absolute top-[40%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-purple-300" />
          </div>
          <div className="absolute top-[80%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-purple-300" />
          </div>
          <div className="absolute top-[80%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-purple-300" />
          </div>
          <div className="absolute top-[40%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-purple-300" />
          </div>
        </div>
      );

    case 'Hybrid':
      return (
        <div className="relative w-full h-72 bg-slate-950/95 backdrop-blur-xl rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          <div className="absolute inset-0 sim-grid-bg"></div>
          <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-500 font-bold tracking-widest">
            SIMULATOR: HYBRID (STAR + BUS)
          </div>
          
          <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
            {/* Main Backbone (Bus) */}
            <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#f43f5e" strokeWidth="4" />
            <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#fda4af" strokeWidth="2" strokeDasharray="15 30" className="animate-dash" />
            
            {/* Left Star Connections */}
            <line x1="30%" y1="50%" x2="15%" y2="25%" stroke="#e11d48" strokeWidth="2" />
            <line x1="30%" y1="50%" x2="45%" y2="25%" stroke="#e11d48" strokeWidth="2" />
            
            {/* Right Star Connections */}
            <line x1="70%" y1="50%" x2="55%" y2="75%" stroke="#e11d48" strokeWidth="2" />
            <line x1="70%" y1="50%" x2="85%" y2="75%" stroke="#e11d48" strokeWidth="2" />
          </svg>

          {/* Hubs/Switches on Backbone */}
          <div className="absolute top-[50%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-rose-600 border-2 border-rose-400 rounded-xl flex items-center justify-center shadow-lg">
            <Server className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[50%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-rose-600 border-2 border-rose-400 rounded-xl flex items-center justify-center shadow-lg">
            <Server className="w-6 h-6 text-white" />
          </div>

          {/* End Nodes */}
          <div className="absolute top-[25%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-rose-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-rose-300" />
          </div>
          <div className="absolute top-[25%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-rose-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-rose-300" />
          </div>
          <div className="absolute top-[75%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-rose-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-rose-300" />
          </div>
          <div className="absolute top-[75%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-slate-900 border-2 border-rose-500 rounded-xl flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-rose-300" />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function IT1_4() {
  const [activeTopology, setActiveTopology] = useState('Star');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTopologyChange = (type) => {
    if (type === activeTopology) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTopology(type);
      setIsTransitioning(false);
    }, 200);
  };

  const topologiesData = {
    Bus: {
      name: 'แบบบัส (Bus Topology)',
      icon: <Share2 className="w-6 h-6" />,
      color: 'orange',
      textClass: 'text-orange-655',
      bgLight: 'bg-orange-50/60',
      textLight: 'text-orange-700',
      borderLight: 'border-orange-200/60',
      borderLeft: 'border-l-orange-500',
      desc: 'ใช้สายสัญญาณเส้นเดียว (Backbone) เป็นแกนหลัก คอมพิวเตอร์ทุกเครื่องเชื่อมต่อเข้ากับสายแกนหลักนี้ผ่านตัวเชื่อมต่อ (T-Connector)',
      pros: [
        'ใช้สายสัญญาณน้อย ประหยัดต้นทุน',
        'ติดตั้งและขยายเครือข่ายได้ง่าย',
        'โครงสร้างไม่ซับซ้อน เหมาะกับเครือข่ายขนาดเล็ก'
      ],
      cons: [
        'หากสายแกนหลักขาด เครือข่ายจะล่มทั้งหมด (Single Point of Failure)',
        'ข้อมูลชนกันได้ง่าย (Collision) หากส่งข้อมูลพร้อมกัน',
        'ตรวจสอบจุดที่เสียได้ยาก'
      ],
      useCase: 'ระบบเครือข่ายขนาดเล็กในอดีต หรือการเดินสายสัญญาณเซนเซอร์ในโรงงานอุตสาหกรรมบางประเภท'
    },
    Star: {
      name: 'แบบดาว (Star Topology)',
      icon: <Network className="w-6 h-6" />,
      color: 'blue',
      textClass: 'text-blue-655',
      bgLight: 'bg-blue-50/60',
      textLight: 'text-blue-700',
      borderLight: 'border-blue-200/60',
      borderLeft: 'border-l-blue-500',
      desc: 'คอมพิวเตอร์ทุกเครื่องเชื่อมต่อเข้ากับอุปกรณ์ศูนย์กลาง เช่น Switch หรือ Hub การส่งข้อมูลต้องผ่านจุดศูนย์กลางเสมอ (เป็นรูปแบบที่นิยมที่สุดในปัจจุบัน)',
      pros: [
        'หากสายสัญญาณของเครื่องใดขาด จะไม่กระทบกับเครื่องอื่น',
        'จัดการและตรวจสอบปัญหาได้ง่ายผ่านจุดศูนย์กลาง',
        'ลดปัญหาข้อมูลชนกัน (หากใช้ Switch)'
      ],
      cons: [
        'ใช้สายสัญญาณเปลืองกว่าแบบบัส (ต้องลากสายจากทุกเครื่องมาที่ศูนย์กลาง)',
        'หากอุปกรณ์ศูนย์กลาง (Switch) เสีย เครือข่ายล่มทั้งหมด'
      ],
      useCase: 'เครือข่าย LAN ในสำนักงาน, บ้านพักอาศัย, ห้องปฏิบัติการคอมพิวเตอร์ทั่วไป'
    },
    Ring: {
      name: 'แบบวงแหวน (Ring Topology)',
      icon: <Circle className="w-6 h-6" />,
      color: 'emerald',
      textClass: 'text-emerald-655',
      bgLight: 'bg-emerald-50/60',
      textLight: 'text-emerald-700',
      borderLight: 'border-emerald-200/60',
      borderLeft: 'border-l-emerald-500',
      desc: 'คอมพิวเตอร์เชื่อมต่อกันเป็นวงกลม ข้อมูลถูกส่งไปในทิศทางเดียวกันโดยใช้ระบบ "โทเคน (Token Passing)" เครื่องที่มีโทเคนเท่านั้นถึงจะส่งข้อมูลได้',
      pros: [
        'ไม่มีปัญหาข้อมูลชนกันเลย เพราะต้องรอรอบคิวโทเคน',
        'คอมพิวเตอร์ทุกเครื่องมีสิทธิ์เข้าถึงเครือข่ายเท่าเทียมกัน',
        'ประสิทธิภาพไม่ตกแม้มีปริมาณข้อมูลมาก'
      ],
      cons: [
        'หากสายขาดจุดเดียว หรือเครื่องใดเครื่องหนึ่งเสีย วงแหวนจะขาดและเครือข่ายล่มทันที',
        'การเพิ่ม/ลดเครื่องทำได้ยาก เพราะต้องตัดต่อสายในวงแหวนใหม่',
        'ข้อมูลอาจส่งถึงช้าหากวงแหวนมีขนาดใหญ่'
      ],
      useCase: 'เครือข่ายที่มีปริมาณข้อมูลหนาแน่นคงที่ หรือเครือข่าย Backbone ของใยแก้วนำแสงในอดีต (FDDI)'
    },
    Mesh: {
      name: 'แบบเมช (Mesh Topology)',
      icon: <Grid className="w-6 h-6" />,
      color: 'slate',
      textClass: 'text-slate-700',
      bgLight: 'bg-slate-50/60',
      textLight: 'text-slate-700',
      borderLight: 'border-slate-200/60',
      borderLeft: 'border-l-slate-500',
      desc: 'คอมพิวเตอร์ทุกเครื่องในเครือข่ายเชื่อมต่อโยงใยถึงกันหมดแบบใยแมงมุม (Full Mesh) หรือเชื่อมแค่บางส่วน (Partial Mesh) หากเส้นทางใดขาด ข้อมูลจะหาเส้นทางอื่นไปแทน',
      pros: [
        'มีความเสถียรและทนทานต่อความเสียหายสูงสุด (High Fault Tolerance)',
        'ข้อมูลไม่ติดขัดเพราะมีหลายเส้นทางให้เลือกเดิน',
        'มีความปลอดภัยและเป็นส่วนตัวสูง'
      ],
      cons: [
        'ต้นทุนสูงมากที่สุด เพราะต้องใช้สายสัญญาณจำนวนมหาศาล',
        'การติดตั้งและตั้งค่าซับซ้อนมาก',
        'จัดการเครือข่ายได้ยากเมื่อขยายขนาด'
      ],
      useCase: 'เครือข่ายอินเทอร์เน็ตระดับโลก (WAN), เครือข่ายทางการทหาร, หรือการเชื่อมต่อระหว่าง Core Router ในศูนย์ข้อมูล'
    },
    Hybrid: {
      name: 'แบบผสม (Hybrid Topology)',
      icon: <GitMerge className="w-6 h-6" />,
      color: 'rose',
      textClass: 'text-rose-655',
      bgLight: 'bg-rose-50/60',
      textLight: 'text-rose-700',
      borderLight: 'border-rose-200/60',
      borderLeft: 'border-l-rose-500',
      desc: 'เป็นการนำรูปแบบการเชื่อมต่อ (Topology) ตั้งแต่ 2 รูปแบบขึ้นไปมาผสมผสานกัน เช่น นำเครือข่ายแบบ Star หลายๆ วงมาเชื่อมต่อกันด้วยสายแกนหลักแบบ Bus (Tree Topology)',
      pros: [
        'มีความยืดหยุ่นสูง สามารถออกแบบให้เข้ากับโครงสร้างองค์กรได้',
        'รองรับการขยายเครือข่ายขนาดใหญ่ (Scalability) ได้ดี',
        'ดึงข้อดีของแต่ละ Topology มาใช้งานร่วมกันได้'
      ],
      cons: [
        'มีความซับซ้อนในการจัดการและการบำรุงรักษา',
        'อาจมีต้นทุนสูงขึ้นอยู่กับอุปกรณ์และรูปแบบที่เลือกใช้'
      ],
      useCase: 'เครือข่ายในองค์กรขนาดใหญ่, มหาวิทยาลัย ที่มีหลายอาคารและหลายแผนกย่อย'
    }
  };

  const activeStyles = {
    Bus: 'text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 ring-2 ring-orange-400 ring-offset-2 ring-offset-slate-50',
    Star: 'text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-50',
    Ring: 'text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-50',
    Mesh: 'text-white bg-gradient-to-r from-slate-700 to-zinc-800 shadow-lg shadow-slate-600/30 ring-2 ring-slate-500 ring-offset-2 ring-offset-slate-50',
    Hybrid: 'text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400 ring-offset-2 ring-offset-slate-50',
  };
  
  const iconColors = {
    Bus: 'text-orange-500',
    Star: 'text-blue-500',
    Ring: 'text-emerald-500',
    Mesh: 'text-slate-600',
    Hybrid: 'text-rose-500',
  };

  const activeData = topologiesData[activeTopology];

  return (
    <div className="font-sans text-slate-800 pb-20 relative overflow-hidden">
      <CustomStyles />
      
      {/* ─── Layer 1: Ambient Backdrop & 4 Blobs ─── */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-drift pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift pointer-events-none" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/2 right-0 w-88 h-88 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-drift pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Intro Section - Fluid Open-Air Design */}
        <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
          โครงสร้างการเชื่อมต่อหรือ <strong className="text-emerald-600 font-semibold">โทโพโลยีเครือข่าย (Network Topology)</strong> คือการวางแผนผังทางกายภาพ (Physical Layout) และการไหลเชิงตรรกะ (Logical Flow) ในการส่งข้อมูลระหว่างอุปกรณ์ต่างๆ ในเครือข่ายคอมพิวเตอร์ การทำความเข้าใจข้อดีและข้อจำกัดของแต่ละรูปแบบช่วยให้วิศวกรโครงข่ายสามารถออกแบบและแก้ไขปัญหาเครือข่ายได้อย่างถูกต้อง แม่นยำ และมีประสิทธิภาพสูงสุด
        </p>

        {/* Section 1: Main Simulator and Information Block */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              วิเคราะห์โครงสร้างผังเชื่อมโยงอุปกรณ์
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              รูปแบบการเชื่อมต่อเครือข่ายและระบบจำลองเสถียรภาพ (Interactive Topology Simulator)
            </h3>
          </div>

          {/* Selector Menu */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {Object.keys(topologiesData).map((key) => {
              const data = topologiesData[key];
              const isActive = activeTopology === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTopologyChange(key)}
                  className={`relative px-5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 font-bold overflow-hidden shadow-sm cursor-pointer hover:scale-[1.02] active:scale-98
                    ${isActive 
                      ? activeStyles[key]
                      : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200'
                    }`}
                >
                  <div className={`relative z-10 ${isActive ? 'text-white' : iconColors[key]} transition-colors duration-300`}>
                    {data.icon}
                  </div>
                  <span className="relative z-10 text-[14.5px] tracking-tight">{data.name.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>

          {/* Main Visual Display and Pros/Cons */}
          <div className="glass-panel rounded-[2.5rem] p-6 sm:p-10 border border-slate-200/60 shadow-xl bg-white/60 backdrop-blur-xl">
            <div className={`transition-all duration-300 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              
              <div className="grid lg:grid-cols-2 gap-10">
                
                {/* Left Column: Information Details and Simulator */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className={`text-2xl font-bold mb-3 ${activeData.textClass} flex items-center gap-3`}>
                      {activeData.icon} {activeData.name}
                    </h3>
                    <p className="text-zinc-600 leading-relaxed text-[16px] md:text-[17px] font-normal bg-white/60 p-5 rounded-2xl border border-white/80 shadow-sm">
                      {activeData.desc}
                    </p>
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    <TopologySimulator type={activeTopology} />
                  </div>

                  {/* Use Case Box - Styled as Frosted Glass Callout */}
                  <div className={`p-5 rounded-2xl border-l-[3.5px] shadow-sm bg-white/70 backdrop-blur-md ${activeData.borderLeft} ${activeData.borderLight}`}>
                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${activeData.textClass}`}>
                      <Zap className="w-4 h-4" /> ความเหมาะสมในการนำไปใช้งาน (Real-world Use Case)
                    </h4>
                    <p className="text-zinc-700 text-[14.5px] font-medium leading-relaxed">
                      {activeData.useCase}
                    </p>
                  </div>
                </div>

                {/* Right Column: Pros and Cons */}
                <div className="flex flex-col gap-5 justify-start">
                  
                  {/* Pros Section */}
                  <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-250/60 rounded-3xl p-6 border-l-[3.5px] border-l-emerald-500 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-100/40">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shadow-inner shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-emerald-800">ข้อดี (Advantages)</h4>
                    </div>
                    <ul className="space-y-3">
                      {activeData.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2 text-emerald-900/80 text-[14.5px] font-semibold">
                          <span className="text-emerald-650 font-bold mt-0.5">✓</span>
                          <span className="leading-relaxed">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons Section */}
                  <div className="bg-rose-50/60 backdrop-blur-md border border-rose-250/60 rounded-3xl p-6 border-l-[3.5px] border-l-rose-500 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-rose-100/40">
                      <div className="w-10 h-10 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center shadow-inner shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-rose-800">ข้อจำกัด (Disadvantages)</h4>
                    </div>
                    <ul className="space-y-3">
                      {activeData.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-rose-900/80 text-[14.5px] font-semibold">
                          <span className="text-rose-500 font-bold mt-0.5">×</span>
                          <span className="leading-relaxed">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Concept Notice */}
          <div className="mt-8 flex items-start gap-4 p-5 bg-slate-900/90 backdrop-blur-md text-slate-350 rounded-2xl border border-white/10 max-w-4xl mx-auto shadow-xl">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <p className="leading-relaxed text-[14.5px] font-normal">
              <strong className="text-white">ข้อสำคัญน่ารู้:</strong> ในเชิงปฏิบัติของการออกแบบเครือข่ายปัจจุบัน เครือข่ายส่วนใหญ่จะใช้การเชื่อมต่อทางกายภาพแบบดาว <strong className="text-blue-300 font-semibold">(Physical Star)</strong> ด้วยการโยงสายจากคอมพิวเตอร์ทุกเครื่องมาที่ตู้ Switch กลาง แต่ในทางตรรกะอาจทำงานเป็นรูปแบบบัส <strong className="text-blue-300 font-semibold">(Logical Bus)</strong> หากใช้อุปกรณ์ Hub แบบเก่า ดังนั้นการเลือกใช้อุปกรณ์ศูนย์กลางเป็น Switch อัจฉริยะจึงมีความสำคัญยิ่งในการจัดการสัญญาณและป้องกันการชนกันของข้อมูล
            </p>
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="กิจกรรมปฏิบัติการ: การจัดทำบัญชีฮาร์ดแวร์สำหรับสำนักงาน (IT Asset Inventory)"
          taskText={`คำชี้แจง: ให้นักเรียนสวมบทบาทเป็นเจ้าหน้าที่ IT Support ของสำนักงานแห่งหนึ่ง และจัดทำตารางบัญชีฮาร์ดแวร์ (IT Asset Inventory) พร้อมอธิบายแนวทางการวางระบบเชื่อมต่อเครือข่ายของอุปกรณ์เหล่านี้ โดยตอบคำถามและทำงานส่งดังต่อไปนี้:

1. ตารางบันทึกบัญชีฮาร์ดแวร์สำนักงาน (Hardware Asset Inventory Table):
   ให้นักเรียนเขียนตารางข้อมูลสำหรับคอมพิวเตอร์และอุปกรณ์โครงข่ายในแผนก IT และแผนกบัญชี จำนวน 5 เครื่องลงในรายงาน โดยระบุข้อมูลดังนี้:
   - รหัสอุปกรณ์ (Asset ID) เช่น IT-PC-001, AC-PC-002, IT-SW-001
   - ประเภทอุปกรณ์ (Asset Type) เช่น Workstation, Server, Switch, Network Printer
   - รายละเอียดสเปกฮาร์ดแวร์ (Specifications) เช่น CPU, RAM, SSD หรือจำนวนพอร์ต
   - หมายเลขซีเรียล (Serial Number) เช่น S/N: PC-992837
   - สถานะอุปกรณ์ (Status) เช่น Active, Maintenance, Spare
   - แผนกและที่ตั้ง (Location/Department) เช่น IT Office, Accounting Dept

2. การวิเคราะห์เลือกโทโพโลยีเครือข่าย (Network Topology Selection):
   - หากต้องการวางสายสัญญาณเครือข่าย LAN เพื่อเชื่อมต่ออุปกรณ์ทั้ง 5 เครื่องนี้เข้าด้วยกัน ให้นักเรียนเลือก "โทโพโลยีที่เหมาะสมที่สุด" สำหรับใช้ในสำนักงาน
   - อธิบายเหตุผลสนับสนุนเชิงวิชาการอย่างน้อย 3 ข้อ (เช่น ความง่ายในการขยายเครือข่าย, ความคุ้มค่าทางราคา, ความทนทานต่อความเสียหายกรณีสายขาด)

3. สถานการณ์จำลองการวิเคราะห์ระบบ (Troubleshooting Scenario):
   - สมมติว่ามีสายสัญญาณสายหนึ่งขาดในระบบเครือข่ายที่คุณเลือก จงวิเคราะห์และตอบว่า คอมพิวเตอร์เครื่องอื่นยังคงสื่อสารหากันได้หรือไม่? เพราะเหตุใด? และจะมีข้อแนะนำในการเพิ่มเสถียรภาพระบบนี้อย่างไร`}
        />
      </main>
    </div>
  );
}
