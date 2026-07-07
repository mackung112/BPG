import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Check, 
  X, 
  HelpCircle, 
  MousePointerClick, 
  BookOpen, 
  Monitor, 
  Sparkles, 
  Award, 
  Play, 
  Pause,
  RotateCcw, 
  ExternalLink,
  Layers,
  Info,
  CheckCircle2,
  Terminal as TerminalIcon,
  Code as CodeIcon,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function pyUnit2_8_FlowchartSymbols() {
  // Audio Synthesizer sound generator disabled as per user request
  const playSound = (type) => {};

  // State 1: ANSI Symbol Explorer
  const [selectedShape, setSelectedShape] = useState("terminal");
  const [terminalLog, setTerminalLog] = useState("");
  const [isRunningCode, setIsRunningCode] = useState(false);

  // State 2: Flowchart Constructor Matching Game
  const gameNodesInitial = [
    { id: 1, label: "เริ่มต้นการทำงาน", requiredShape: "terminal", currentShape: null, hint: "สัญลักษณ์ครอบปุ่มควบคุมการเข้า-ออกของกระแสข้อมูล" },
    { id: 2, label: "รับค่าคะแนนสอบ (score)", requiredShape: "input", currentShape: null, hint: "การดึงข้อมูลจากผู้ใช้งานเข้ามาทางช่องทางหลัก" },
    { id: 3, label: "ตรวจสอบ score >= 50 ?", requiredShape: "decision", currentShape: null, hint: "กล่องเปรียบเทียบเงื่อนไขที่มีทางแยกซ้ายและขวา" },
    { id: 4, label: "กำหนดเกรด = 'PASS'", requiredShape: "process", currentShape: null, hint: "ขั้นตอนประมวลผลคำนวณและเก็บตัวแปรภายใน" },
    { id: 5, label: "กำหนดเกรด = 'FAIL'", requiredShape: "process", currentShape: null, hint: "ขั้นตอนประมวลผลคำนวณและเก็บตัวแปรภายใน" },
    { id: 6, label: "แสดงผลเกรดทางจอคอมพิวเตอร์", requiredShape: "display", currentShape: null, hint: "การส่งข้อมูลออกไปจัดแสดงบนจอภาพฮาร์ดแวร์โดยเฉพาะ" },
    { id: 7, label: "สิ้นสุดการทำงาน", requiredShape: "terminal", currentShape: null, hint: "สัญลักษณ์ปลายทางตัวควบคุมการไหลจุดสุดท้าย" }
  ];

  const [gameNodes, setGameNodes] = useState(gameNodesInitial);
  const [selectedGameNode, setSelectedGameNode] = useState(null);
  const [score, setScore] = useState(0);
  const [gameSuccess, setGameSuccess] = useState(false);
  const [enteredScore, setEnteredScore] = useState("75");
  const [simRunning, setSimRunning] = useState(false);
  const [simLog, setSimLog] = useState([]);
  const [simStep, setSimStep] = useState(-1);

  // State 3: draw.io Simulator
  const [drawioCanvas, setDrawioCanvas] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [connectorSource, setConnectorSource] = useState(null);
  const [drawioLog, setDrawioLog] = useState("ลากรูปทรงจากเมนูด้านซ้ายมาวางในบอร์ดวาดเพื่อจำลองโครงสร้าง");

  // ANSI Symbol details database
  const shapeDatabase = {
    terminal: {
      name: "Terminal (จุดเริ่มต้นและสิ้นสุด)",
      english: "Terminal Symbol",
      desc: "สัญลักษณ์รูปแคปซูลทรงรี ใช้เป็นจุดเริ่ม (Start) และจุดสิ้นสุด (Stop) ของผังงานเสมอ เพื่อกำหนดเส้นเขตแดนทางเข้าออกของระบบเพียงอย่างละ 1 แห่ง",
      code: "# จุดเริ่มต้นและสิ้นสุดในภาษา Python\nimport sys\n\ndef main():\n    print('[โปรแกรมเริ่มต้นรัน...]')\n    # ... การประมวลผล ...\n    print('[จบการทำงานของระบบ]')\n    sys.exit(0)\n\nmain()",
      equivalent: "จุดเริ่มต้นของฟังก์ชันหลัก `main()` หรือคำสั่งจบโปรแกรม `exit()`"
    },
    process: {
      name: "Process (กระบวนการประมวลผล)",
      english: "Process Symbol",
      desc: "สัญลักษณ์รูปสี่เหลี่ยมผืนผ้า ใช้แทนการทำงานทั่วไป การคำนวณทางคณิตศาสตร์ หรือการกำหนดค่าตัวแปร เช่น การประมวลผลชุดสูตรคณิตศาสตร์ หรือการเปลี่ยนตำแหน่งวัตถุในระบบข้อมูล",
      code: "# การประมวลผลและกำหนดค่าในภาษา Python\nx = 10\ny = 20\ntotal = x + y\n\nprint(f'ผลรวมคือ: {total}')",
      equivalent: "การกําหนดค่าตัวแปร (Assignment) หรือการคำนวณเชิงตัวเลขในโค้ด"
    },
    input: {
      name: "Input / Output (รับข้อมูลและแสดงผลทั่วไป)",
      english: "Data Symbol",
      desc: "สัญลักษณ์รูปสี่เหลี่ยมด้านขนานเอียงลาด ใช้สำหรับการรับข้อมูลเข้าหรือการส่งข้อมูลออกโดยที่ไม่ได้เจาะจงเฉพาะสื่อนวัตกรรม เช่น การรับส่งผ่านไฟล์ หรือการไหลผ่านพอร์ตเน็ตเวิร์ก",
      code: "# การนำเข้าและแสดงผลทั่วไปในภาษา Python\nusername = input('ป้อนชื่อผู้ใช้: ')\nprint('รับค่าสำเร็จ:', username)",
      equivalent: "ฟังก์ชัน `input()` หรือการรับส่งพารามิเตอร์ข้ามระบบ"
    },
    decision: {
      name: "Decision (การตัดสินใจและเงื่อนไข)",
      english: "Decision Symbol",
      desc: "สัญลักษณ์สี่เหลี่ยมขนมเปียกปูน (รูปเพชร) ใช้สำหรับกำหนดเงื่อนไขทางเลือกตรวจสอบความจริง โดยจะมีการรับกระแสไหลเข้า 1 ทิศทาง และมีลูกศรทางเลือกชี้ออก 2 ทางเสมอกำกับด้วยคำว่า ใช่/ไม่ใช่ (Yes/No) หรือ จริง/เท็จ (True/False)",
      code: "# การตรวจสอบเงื่อนไขในภาษา Python\nscore = 75\n\nif score >= 50:\n    print('ผลลัพธ์: ผ่านเกณฑ์ (PASS)')\nelse:\n    print('ผลลัพธ์: ตกเกณฑ์ (FAIL)')",
      equivalent: "โครงสร้างควบคุมเงื่อนไข `if-else` หรือ `elif` ในซอฟต์แวร์"
    },
    display: {
      name: "Display (แสดงผลทางจอภาพคอมพิวเตอร์)",
      english: "Display Symbol",
      desc: "สัญลักษณ์ทรงกระดาษเขียนด้านข้าง หรือทรงกระดานด้านขวาแหลมด้านซ้ายโค้งเว้า (ANSI Standard Shape) ใช้ระบุเฉพาะเจาะจงว่า ต้องการส่งข้อความ ผลลัพธ์ หรือแจ้งเตือนออกแสดงบนจอคอมพิวเตอร์ส่วนบุคคลโดยตรง",
      code: "# การแสดงผลออกจอภาพในภาษา Python\nmessage = 'ยินดีต้อนรับเข้าสู่บทเรียน Python Interactive!'\nprint(message)",
      equivalent: "คำสั่ง `print()` ที่แสดงผลออกทางหน้าจอคอนโซลมาตรฐาน"
    },
    manual_input: {
      name: "Manual Input (รับข้อมูลผ่านแผงแป้นพิมพ์)",
      english: "Manual Input Symbol",
      desc: "สัญลักษณ์รูปสี่เหลี่ยมคางหมูเอียงเฉียงด้านบน ใช้สำหรับระบุชัดเจนว่าคอมพิวเตอร์กำลังหยุดรอข้อมูลดิบที่ป้อนจากมือผู้เรียนโดยการกดคีย์บอร์ด (Keyboard) เท่านั้น",
      code: "# การดึงข้อมูลดิบจากผู้เรียนกดคีย์บอร์ดใน Python\nage_input = input('กรุณาป้อนอายุของคุณ: ')\nage = int(age_input)\nprint('อายุของคุณคือ:', age)",
      equivalent: "การรับข้อมูลจากคีย์บอร์ดด้วยฟังก์ชัน `input()` ร่วมกับการแปลงชนิดข้อมูล (Type Casting)"
    },
    flowline: {
      name: "Flow Line (เส้นแสดงทิศทางการไหล)",
      english: "Flow Line",
      desc: "เส้นหัวลูกศรใช้สำหรับระบุทิศทางการไหลของกระบวนการทำงานและกระแสข้อมูล ปกติจะลากจากบนลงล่างหรือซ้ายไปขวา หัวลูกศรต้องชี้ให้ชัดเจน ห้ามใช้เส้นตรงเฉยๆ",
      code: "# ลำดับการประมวลผลตามแนวเส้นไหลใน Python\nstep1 = 'ตรวจสอบไฟล์'\nstep2 = 'อ่านค่าข้อมูล'\nstep3 = 'ประมวลผล'\n\n# ทำทีละบรรทัดตามลำดับลูกศร\nprint(step1)\nprint(step2)\nprint(step3)",
      equivalent: "การรันคำสั่งบรรทัดถัดไปตามลำดับจากบนลงล่าง (Sequence execution)"
    },
    connector: {
      name: "Connector (จุดเชื่อมต่อในหน้าเดียวกัน)",
      english: "On-page Connector",
      desc: "รูปทรงวงกลมขนาดเล็กพร้อมตัวอักษรระบุกำกับด้านใน ใช้สำหรับเชื่อมจุดปลายของสายการประมวลผลที่อยู่ไกลกันมารวมกัน หรือรวบหลายเส้นทางย่อยให้เป็นเส้นตรงเดียวกันเพื่อหลีกเลี่ยงเส้นตัดกัน",
      code: "# การเชื่อมจุดลอจิกกลับมารวมกันใน Python\n# เมื่อจบบล็อก if และ else ตัวแปรจะมารวมประมวลผลที่จุดเดียวกันด้านล่าง\nif score >= 50:\n    grade = 'PASS'\nelse:\n    grade = 'FAIL'\n\n# นี่คือเสมือนจุดเชื่อมต่อ (A) ที่กลับมาบรรจบกัน\nprint(f'เกรดของท่านคือ: {grade}')",
      equivalent: "จุดสิ้นสุดของบล็อกคำสั่งที่มีการรวบเยื้องหน้า (Indentation) กลับมาเท่ากัน"
    },
    offpage_connector: {
      name: "Off-Page Connector (จุดเชื่อมต่อคนละหน้า)",
      english: "Off-page Connector",
      desc: "รูปห้าเหลี่ยมปลายแหลมชี้ลง ใช้ระบุว่าผังงานยาวเกินหน้ากระดาษแผ่นปัจจุบัน และจะต้องถูกลากไปเขียนอธิบายต่อที่หน้ากระดาษแผ่นถัดไป โดยใช้รหัสเชื่อมโยงตัวอักษรเดียวกันระบุไว้ในกล่อง",
      code: "# การเรียกใช้ฟังก์ชันข้ามไฟล์หรือโมดูลใน Python\n# เสมือนการโยนลอจิกข้ามหน้ากระดาษ\nfrom database_helper import save_user_score\n\nsave_user_score('mac', 95)",
      equivalent: "การเรียกใช้ฟังก์ชันข้ามไฟล์ หรือการแบ่งไฟล์โค้ด (Modularization / Module Import)"
    }
  };

  const runSampleCode = (shapeKey) => {
    playSound('click');
    setIsRunningCode(true);
    setTerminalLog("[กำลังวิเคราะห์ไวยากรณ์คอมไพเลอร์...]\n");
    
    setTimeout(() => {
      if (shapeKey === "terminal") {
        setTerminalLog(prev => prev + "[โปรแกรมเริ่มต้นรัน...]\n[ระบบจัดสรรสแต็กหน่วยความจำเสร็จสิ้น]\n[จบการทำงานของระบบ]\nExit Code: 0 (ผ่านการทำงาน)");
      } else if (shapeKey === "process") {
        setTerminalLog(prev => prev + "x = 10\ny = 20\ntotal = 10 + 20\nผลรวมคือ: 30");
      } else if (shapeKey === "input") {
        setTerminalLog(prev => prev + "ป้อนชื่อผู้ใช้: ครูแม็คแอนติกราวิตี้\nรับค่าสำเร็จ: ครูแม็คแอนติกราวิตี้");
      } else if (shapeKey === "decision") {
        setTerminalLog(prev => prev + "score = 75\nผลลัพธ์: ผ่านเกณฑ์ (PASS) (ตรวจสอบเงื่อนไข 75 >= 50 เป็นจริง)");
      } else if (shapeKey === "display") {
        setTerminalLog(prev => prev + "ยินดีต้อนรับเข้าสู่บทเรียน Python Interactive!");
      } else if (shapeKey === "manual_input") {
        setTerminalLog(prev => prev + "กรุณาป้อนอายุของคุณ: 17\nอายุของคุณคือ: 17 (แปลงข้อมูลจากตัวอักษรเป็นจำนวนเต็มสมบูรณ์)");
      } else if (shapeKey === "flowline") {
        setTerminalLog(prev => prev + "ตรวจสอบไฟล์\nอ่านค่าข้อมูล\nประมวลผล\n[การทำงานเรียงจาก 1 ไป 2 ไป 3 ตามลำดับลูกศร]");
      } else if (shapeKey === "connector") {
        setTerminalLog(prev => prev + "grade = 'PASS'\nเกรดของท่านคือ: PASS\n[รวบทางเลือก 2 ฝั่งกลับมาทำบรรทัดเดียวกัน]");
      } else if (shapeKey === "offpage_connector") {
        setTerminalLog(prev => prev + "[เชื่อมโยงไปยังโมดูล database_helper]\n[บันทึกคะแนนผู้ใช้ mac = 95 เข้าสู่ฐานข้อมูลสำเร็จ]");
      }
      setIsRunningCode(false);
    }, 1000);
  };

  // Game Matching Logics
  const handleAssignShape = (shapeKey) => {
    if (selectedGameNode === null) return;
    playSound('match');
    
    setGameNodes(prev => prev.map(node => {
      if (node.id === selectedGameNode) {
        return {
          ...node,
          currentShape: shapeKey
        };
      }
      return node;
    }));
    setSelectedGameNode(null);
  };

  // Check Game State
  useEffect(() => {
    const isCompleted = gameNodes.every(node => node.currentShape !== null);
    if (isCompleted) {
      const allCorrect = gameNodes.every(node => node.currentShape === node.requiredShape);
      if (allCorrect) {
        playSound('success');
        setGameSuccess(true);
        setScore(100);
      } else {
        playSound('fail');
        setScore(Math.floor((gameNodes.filter(node => node.currentShape === node.requiredShape).length / gameNodes.length) * 100));
      }
    }
  }, [gameNodes]);

  const handleResetGame = () => {
    playSound('click');
    setGameNodes(gameNodesInitial);
    setSelectedGameNode(null);
    setScore(0);
    setGameSuccess(false);
    setSimRunning(false);
    setSimLog([]);
    setSimStep(-1);
  };

  // Run Flow Simulator of Game Nodes
  const handleStartSimulation = () => {
    if (!gameSuccess) return;
    playSound('click');
    setSimRunning(true);
    setSimStep(1);
    setSimLog(["[เริ่มต้น] กระแสลอจิกวิเคราะห์เข้าสู่ Start Terminal"]);
  };

  useEffect(() => {
    let timer;
    if (simRunning && simStep >= 1 && simStep <= 7) {
      timer = setTimeout(() => {
        const nextStep = simStep + 1;
        
        if (simStep === 1) {
          setSimLog(prev => [...prev, `[รับข้อมูล] นำคะแนนสอบ ${enteredScore} ป้อนผ่าน Parallelogram Input`]);
          setSimStep(nextStep);
        } else if (simStep === 2) {
          setSimLog(prev => [...prev, `[ตัดสินใจ] ตรวจสอบเงื่อนไขในรูปทรงข้าวหลามตัด: คะแนน ${enteredScore} >= 50 ?`]);
          setSimStep(nextStep);
        } else if (simStep === 3) {
          const pass = Number(enteredScore) >= 50;
          if (pass) {
            setSimLog(prev => [...prev, `[ใช่] คะแนนสอบผ่านเกณฑ์! นำทางไปสู่ Process บล็อก 4: กำหนดเกรด = 'PASS'`]);
            setSimStep(4); // Go to Node 4
          } else {
            setSimLog(prev => [...prev, `[ไม่ใช่] คะแนนสอบต่ำกว่าเกณฑ์! นำทางไปสู่ Process บล็อก 5: กำหนดเกรด = 'FAIL'`]);
            setSimStep(5); // Go to Node 5
          }
        } else if (simStep === 4 || simStep === 5) {
          const finalGrade = Number(enteredScore) >= 50 ? 'PASS' : 'FAIL';
          setSimLog(prev => [...prev, `[แสดงผล] ลำดับการประมวลผลกระแสเข้าสู่ทรง Display: พิมพ์คำว่า "${finalGrade}" บนจอหน้าจอ`]);
          setSimStep(6); // Go to Node 6
        } else if (simStep === 6) {
          setSimLog(prev => [...prev, "[สิ้นสุด] กระแสลอจิกเรียงกลับลงมาบรรจบที่ Stop Terminal ทรงวงกลมรีเรียบร้อย"]);
          setSimStep(7); // End of program
        } else if (simStep === 7) {
          setSimRunning(false);
        }
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [simRunning, simStep, enteredScore]);

  // draw.io Simulator Logics
  const handleDragStart = (shapeType) => {
    playSound('click');
    setDraggedItem(shapeType);
  };

  const handleDropCanvas = (e) => {
    e.preventDefault();
    if (!draggedItem) return;
    playSound('match');
    
    const uniqueId = Date.now();
    const newSymbol = {
      id: uniqueId,
      type: draggedItem,
      x: 100 + (drawioCanvas.length * 20) % 200,
      y: 80 + (drawioCanvas.length * 20) % 200,
      name: shapeDatabase[draggedItem]?.name.split(' ')[0] || "Symbol"
    };

    setDrawioCanvas(prev => [...prev, newSymbol]);
    setDrawioLog(`ลากรูปทรง [${newSymbol.name}] วางเข้าสู่ Canvas สำเร็จ! (คุณสามารถเชื่อมโยงเส้นต่อไป)`);
    setDraggedItem(null);
  };

  const handleConnectShapes = (nodeId) => {
    playSound('click');
    if (!connectorSource) {
      setConnectorSource(nodeId);
      setDrawioLog("เลือกจุดเชื่อมต้นทางแล้ว: กรุณาคลิกรูปทรงปลายทางเพื่อผูกสมาร์ทไลน์ (Flowline)");
    } else {
      if (connectorSource === nodeId) {
        setConnectorSource(null);
        setDrawioLog("ยกเลิกการเชื่อมโยง");
        return;
      }
      playSound('success');
      const srcName = drawioCanvas.find(n => n.id === connectorSource)?.name;
      const destName = drawioCanvas.find(n => n.id === nodeId)?.name;
      setDrawioLog(`เชื่อมต่อเส้นลอจิกอัจฉริยะ (Smart Flowline) จาก [${srcName}] ชี้ไปยัง [${destName}] สำเร็จ!`);
      setConnectorSource(null);
    }
  };

  const clearDrawio = () => {
    playSound('fail');
    setDrawioCanvas([]);
    setConnectorSource(null);
    setDrawioLog("บอร์ดวาดว่างเปล่าแล้ว เริ่มต้นลากวางใหม่ได้เลย");
  };

  // Standard interactive components styles
  const activeClass = "ring-4 ring-indigo-500/30 border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]";

  // Teacher Task instruction text
  const teacherTaskContent = `ใบงานปฏิบัติการ "นักวิเคราะห์และสถาปนิกผังงานชั้นครู"
ให้นักเรียนเลือกทำภารกิจต่อไปนี้ลงในสมุดบันทึกหรือเครื่องมือวาดผังงาน:

ภารกิจที่ 1: วิเคราะห์ข้อบกพร่อง (10 คะแนน)
- ครูมีผังงานคำนวณราคาสินค้ารวมภาษีมูลค่าเพิ่ม 7% (VAT) แต่ผังงานนี้มีจุดบกพร่องตามมาตรฐาน ANSI อยู่ 3 จุดหลัก
- ให้นักเรียนเขียนอธิบายข้อผิดพลาดทั้ง 3 จุดนั้นโดยอ้างอิงหลักการเขียนผังงานที่ดี (เช่น การใช้สัญลักษณ์ผิดรูป, ทิศทางย้อนศร, ขาดจุดสิ้นสุด) พร้อมบอกวิธีแก้ไขที่ถูกต้องอย่างเป็นระบบ

ภารกิจที่ 2: ออกแบบผังงานควบคุมระบบเซนเซอร์แจ้งเตือนน้ำท่วม (15 คะแนน)
- ให้นักเรียนเขียนผังงานแบบโต้ตอบสำหรับควบคุม "เครื่องตรวจวัดระดับน้ำและเปิดสวิตช์เครื่องสูบน้ำอัตโนมัติ"
- ข้อกำหนดในการออกแบบ:
  1. มีจุดเริ่มต้นและจุดสิ้นสุดเพียงอย่างละ 1 จุด
  2. รับค่าระดับน้ำ (Water Level) เข้ามาอย่างต่อเนื่อง
  3. ตรวจสอบว่าระดับน้ำสูงกว่า 80 ซม. หรือไม่?
  4. หากสูงกว่า (ใช่): ให้สั่ง "เปิดเครื่องสูบน้ำอัตโนมัติ" และแสดงข้อความเตือน "ระดับน้ำวิกฤต!" ทางหน้าจอคอมพิวเตอร์ (ใช้รูปทรง ANSI Display ให้ถูกต้อง)
  5. หากไม่สูงกว่า (ไม่ใช่): ให้สั่ง "ปิดเครื่องสูบน้ำ"
  6. วาดผังงานให้สะอาด เรียบร้อย ทิศทางลูกศรไม่อ้อมไปมาหรือตัดกัน และระบุข้อความในกล่องให้กระชับที่สุด
- ส่งผลงานเป็นภาพถ่ายการวาดในกระดาษ หรือลิงก์จากโปรแกรม draw.io`;

  return (
    <div className="min-h-screen text-slate-800 pb-20 relative overflow-hidden bg-[#FAFAFA]">
      
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[35rem] h-[35rem] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-cyan-200/30 rounded-full blur-[110px] duration-10000"></div>
        <div className="absolute top-[50%] left-[5%] w-[25rem] h-[25rem] bg-violet-200/40 rounded-full blur-[100px]"></div>
      </div>

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-16">
        
        {/* Ambient Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="relative z-10 max-w-4xl space-y-4">
            <span className="bg-indigo-500/20 text-indigo-300 font-mono text-sm px-4 py-1.5 rounded-full border border-indigo-400/30 inline-block font-semibold">
              Software Engineering Visual Language
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-normal tracking-tight">
              สัญลักษณ์ผังงาน (Flowchart Symbols)
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              เครื่องมืออันทรงพลังที่จะแปลงขั้นตอนวิธี (Algorithm) แบบตัวอักษรให้อยู่ในรูปของสัญญลักษณ์ภาพที่เป็นสากล 
              สถาบันมาตรฐานแห่งชาติของสหรัฐอเมริกา (ANSI) และสถาบันมาตรฐานสากล (ISO) ได้ร่วมกันขัดเกลาชุดรูปทรงมาตรฐานขึ้นมา 
              ทำให้วิศวกรซอฟต์แวร์ทุกคนบนโลกสามารถทำความเข้าใจอัลกอริทึมได้ผ่านสัญลักษณ์สากลเหล่านี้
            </p>
          </div>
        </div>

        {/* 2.8.1 สัญลักษณ์มาตรฐานสากล (ANSI) */}
        <div className="space-y-8">
          <div className="border-l-4 border-indigo-600 pl-4 space-y-1">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              สัญลักษณ์มาตรฐานสากล (ANSI)
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              เจาะลึก 9 สัญลักษณ์เรขาคณิตสำคัญในการสร้างแผนภาพระบบ พร้อมการเปรียบเทียบโค้ดจำลองภาษา Python
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Shape Grid Selector (Left Column) */}
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Terminal Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("terminal"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "terminal" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 border-2.5 border-violet-500 rounded-full flex items-center justify-center bg-violet-500/10 mb-4 shrink-0">
                  <span className="text-[10px] font-bold text-violet-400">Start / Stop</span>
                </div>
                <span className="text-xs font-bold text-slate-800">Terminal</span>
              </div>

              {/* Process Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("process"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "process" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 border-2.5 border-blue-500 flex items-center justify-center bg-blue-500/10 mb-4 shrink-0">
                  <span className="text-[10px] font-bold text-blue-400">Process</span>
                </div>
                <span className="text-xs font-bold text-slate-800">Process</span>
              </div>

              {/* Input/Output Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("input"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "input" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 border-2.5 border-emerald-500 flex items-center justify-center bg-emerald-500/10 -skew-x-12 mb-4 shrink-0">
                  <span className="text-[10px] font-bold text-emerald-400 skew-x-12">Input / Output</span>
                </div>
                <span className="text-xs font-bold text-slate-800">Input / Output</span>
              </div>

              {/* Decision Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("decision"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "decision" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-12 h-12 border-2.5 border-rose-500 rotate-45 flex items-center justify-center bg-rose-500/10 mb-4 shrink-0">
                  <span className="text-[8px] font-bold text-rose-400 -rotate-45 leading-none">Decision</span>
                </div>
                <span className="text-xs font-bold text-slate-800">Decision</span>
              </div>

              {/* Display Symbol Button (ANSI FIXED PATH) */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("display"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "display" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 mb-4 shrink-0 flex items-center justify-center">
                  <svg width="80" height="40" viewBox="0 0 100 50">
                    <path 
                      d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" 
                      fill="rgba(245, 158, 11, 0.1)" 
                      stroke="#f59e0b" 
                      strokeWidth="2.5" 
                    />
                    <text x="50" y="29" textAnchor="middle" fill="#f59e0b" className="text-[10px] font-bold">Display</text>
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-800">Display</span>
              </div>

              {/* Manual Input Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("manual_input"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "manual_input" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 mb-4 shrink-0 flex items-center justify-center">
                  <svg width="80" height="40" viewBox="0 0 100 50">
                    <polygon 
                      points="10,18 90,5 90,45 10,45" 
                      fill="rgba(6, 182, 212, 0.1)" 
                      stroke="#06b6d4" 
                      strokeWidth="2.5" 
                    />
                    <text x="50" y="32" textAnchor="middle" fill="#06b6d4" className="text-[10px] font-bold">Keyboard</text>
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-800">Manual Input</span>
              </div>

              {/* Flow Line Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("flowline"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "flowline" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 mb-4 shrink-0 flex items-center justify-center">
                  <svg width="80" height="40" viewBox="0 0 100 50">
                    <line x1="20" y1="25" x2="65" y2="25" stroke="#6366f1" strokeWidth="3" />
                    <polygon points="65,20 75,25 65,30" fill="#6366f1" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-800">Flow Line</span>
              </div>

              {/* Connector Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("connector"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "connector" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 mb-4 shrink-0 flex items-center justify-center">
                  <svg width="80" height="40" viewBox="0 0 100 50">
                    <circle cx="50" cy="25" r="14" fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="2.5" />
                    <text x="50" y="29" textAnchor="middle" fill="#6366f1" className="text-[10px] font-mono font-bold">A</text>
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-800">Connector</span>
              </div>

              {/* Off-Page Connector Symbol Button */}
              <div 
                onClick={() => { playSound('click'); setSelectedShape("offpage_connector"); }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center bg-white flex flex-col items-center justify-between hover:bg-indigo-50/20 ${selectedShape === "offpage_connector" ? activeClass : 'border-slate-200 shadow-sm'}`}
              >
                <div className="w-24 h-12 mb-4 shrink-0 flex items-center justify-center">
                  <svg width="80" height="40" viewBox="0 0 100 50">
                    <polygon 
                      points="35,8 65,8 65,28 50,42 35,28" 
                      fill="rgba(99, 102, 241, 0.1)" 
                      stroke="#6366f1" 
                      strokeWidth="2.5" 
                    />
                    <text x="50" y="25" textAnchor="middle" fill="#6366f1" className="text-[9px] font-bold font-mono">1</text>
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-800">Off-Page Conn.</span>
              </div>

            </div>

            {/* Shape Detail Console (Right Column) */}
            <div className="lg:col-span-6 bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white border border-slate-800 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full blur-xl pointer-events-none"></div>
              
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">ANSI STANDARD SYMBOL SPECIFICATION</span>
                    <h4 className="text-xl font-bold text-white mt-1">
                      {shapeDatabase[selectedShape].name}
                    </h4>
                  </div>
                  <span className="text-2xs bg-indigo-500 text-white font-mono px-3 py-1 rounded-full shrink-0 font-bold align-self-start sm:align-self-center">
                    {shapeDatabase[selectedShape].english}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-2 text-left">
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-indigo-400" /> นิยามและความหมาย:</span>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {shapeDatabase[selectedShape].desc}
                  </p>
                </div>

                {/* Code Box equivalent with play button */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5"><CodeIcon className="w-4 h-4 text-emerald-400" /> เทียบเท่าคำสั่งภาษา Python:</span>
                    <button
                      onClick={() => runSampleCode(selectedShape)}
                      disabled={isRunningCode}
                      className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:bg-slate-700 text-white font-bold py-1.5 px-3 rounded-lg text-2xs transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" /> ทดลองรันโค้ด
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                    <pre className="font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed max-h-40">
                      {shapeDatabase[selectedShape].code}
                    </pre>
                  </div>
                </div>

                {/* Simulated Terminal Output Console */}
                <div className="space-y-2 text-left">
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5"><TerminalIcon className="w-4 h-4 text-indigo-400" /> ผลการทำงานจำลอง (Simulated Terminal Output):</span>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-28 font-mono text-xs text-slate-300 overflow-y-auto leading-relaxed relative">
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                    {terminalLog ? (
                      <div className="whitespace-pre-wrap">{terminalLog}</div>
                    ) : (
                      <span className="text-slate-600">กดปุ่ม 'ทดลองรันโค้ด' ด้านบน เพื่อวิเคราะห์เอาต์พุตจำลอง</span>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 2.8.2 ความหมายและการนำสัญลักษณ์ไปใช้งาน */}
        <div className="space-y-8 pt-8">
          <div className="border-l-4 border-rose-500 pl-4 space-y-1">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              การประกอบและจัดสร้างผังงาน
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              ประกอบจิ๊กซอว์ผังงานการประเมินเกรดผลสอบ เลือกหยิบประเภทรูปทรงให้ถูกต้องตามกฎมาตรฐานสากลเพื่อเปิดการทำงานระบบ
            </p>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-slate-800 shadow-2xl text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 rounded-bl-full blur-3xl pointer-events-none"></div>

            <div className="text-center mb-8 relative z-10 space-y-2">
              <h4 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                จิ๊กซอว์สถาปัตยกรรม: Flowchart Matching Lab
              </h4>
              <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-xs md:text-sm">
                โจทย์: รับค่าคะแนนสอบ ตรวจเงื่อนไข หากมากกว่าหรือเท่ากับ 50 คะแนนให้แสดงผลลัพธ์ผ่าน (PASS) ไม่เช่นนั้นแสดงตก (FAIL) 
                คลิกเลือกบล็อกการทำงานสีเทา แล้วคลิกเลือกรูปทรงสัญลักษณ์ ANSI สากลทางขวาเพื่อสวมประกอบรูปทรงให้ตรงวัตถุประสงค์
              </p>
            </div>

            {/* Scoreboard and Control Row */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div className="flex items-center gap-4 text-xs">
                <span>ความก้าวหน้าการประกอบ: <strong className="text-indigo-400 font-mono text-sm">{gameNodes.filter(n => n.currentShape !== null).length} / {gameNodes.length}</strong></span>
                <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500" 
                    style={{ width: `${(gameNodes.filter(n => n.currentShape !== null).length / gameNodes.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {gameSuccess && (
                  <div className="flex items-center gap-2 bg-emerald-950 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-emerald-400 text-2xs font-bold font-mono">โครงสร้างสอดคล้อง 100%!</span>
                  </div>
                )}
                <button
                  onClick={handleResetGame}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-lg text-2xs transition-all active:scale-95 cursor-pointer border border-slate-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> เริ่มใหม่
                </button>
              </div>
            </div>

            {/* Matching Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
              
              {/* Left Column: Visual Flowchart Canvas Builder */}
              <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center">
                <span className="text-2xs text-slate-500 block mb-6 font-bold tracking-wider uppercase">FLOWCHART BOARD CONSTRUCT</span>
                
                <div className="space-y-4 w-full max-w-md">
                  
                  {gameNodes.map((node, index) => {
                    const isSelected = selectedGameNode === node.id;
                    const shapeAssigned = node.currentShape;
                    const isCorrect = shapeAssigned === node.requiredShape;
                    
                    return (
                      <div key={node.id} className="flex flex-col items-center">
                        
                        {/* Flowline Arrow (show between nodes, except before start) */}
                        {index > 0 && (
                          <div className="my-1 flex flex-col items-center">
                            <div className={`w-0.5 h-6 ${simStep >= index ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'}`}></div>
                            <div className={`w-0 h-0 border-t-[6px] border-l-[4px] border-r-[4px] border-l-transparent border-r-transparent ${simStep >= index ? 'border-t-indigo-400' : 'border-t-slate-700'}`}></div>
                          </div>
                        )}

                        {/* Interactive Node Box */}
                        <div 
                          onClick={() => { playSound('click'); setSelectedGameNode(isSelected ? null : node.id); }}
                          className={`w-full max-w-xs p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                            isSelected 
                              ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02] shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                              : shapeAssigned 
                                ? isCorrect 
                                  ? 'border-emerald-500 bg-emerald-950/10' 
                                  : 'border-rose-500 bg-rose-950/10'
                                : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700'
                          } ${simStep === index ? 'ring-4 ring-indigo-500/40 bg-indigo-500/10 scale-[1.03] shadow-[0_0_20px_rgba(99,102,241,0.4)]' : ''}`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-slate-500 font-bold block">ขั้นตอนที่ {node.id}</span>
                            <span className="text-sm font-bold text-white">{node.label}</span>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            {shapeAssigned ? (
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${isCorrect ? 'bg-emerald-900 text-emerald-400' : 'bg-rose-900 text-rose-400'}`}>
                                  {shapeAssigned}
                                </span>
                                {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-rose-500" />}
                              </div>
                            ) : (
                              <div className="bg-slate-800 border border-slate-700 text-slate-500 text-[10px] font-bold py-1 px-2.5 rounded-lg flex items-center gap-1">
                                <MousePointerClick className="w-3.5 h-3.5" /> เลือกรูปทรง
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* Right Column: Shape Selector Panel / Game Details */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                
                {/* Node Shape Palette */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 flex-1 flex flex-col justify-center min-h-[300px]">
                  
                  {selectedGameNode !== null ? (
                    <div className="space-y-5 text-left">
                      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                        <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">CHOOSE MATCHING ANSI SHAPE</span>
                        <span className="text-[10px] text-slate-500 font-bold">ขั้นตอนที่ {selectedGameNode}</span>
                      </div>
                      
                      <div className="space-y-1.5 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-indigo-300 font-bold block flex items-center gap-1"><Info className="w-3.5 h-3.5" /> คำใบ้คำอธิบายงาน:</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          {gameNodes.find(n => n.id === selectedGameNode)?.hint}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {Object.keys(shapeDatabase).map(key => (
                          <button
                            key={key}
                            onClick={() => handleAssignShape(key)}
                            className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-left border border-slate-800 hover:border-indigo-500 rounded-xl p-3 text-xs transition-all flex flex-col justify-between h-20 cursor-pointer group"
                          >
                            <span className="text-2xs text-slate-500 uppercase tracking-wider block group-hover:text-indigo-400 transition-colors font-bold">{key}</span>
                            <span className="font-bold text-white text-[11px] leading-tight truncate">{shapeDatabase[key].name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      
                      {gameSuccess ? (
                        <div className="space-y-5">
                          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                            <CheckCircle2 className="w-10 h-10" />
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-yellow-400" /> ประกอบผังงานสมบูรณ์แบบ!
                            </h5>
                            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                              สุดยอดมาก! สัญลักษณ์ผังงานของคุณสอดคล้องตามมาตรฐาน ANSI 100% 
                              พร้อมสำหรับการเปิดแบบทดลองคำนวณและประมวลผลกระแสลอจิกเรียบร้อยแล้ว
                            </p>
                          </div>

                          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl max-w-sm mx-auto space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>จำลองค่าส่งสอบ:</span>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={enteredScore}
                                  onChange={(e) => setEnteredScore(e.target.value)}
                                  className="w-16 bg-slate-950 text-white font-mono font-bold text-center rounded border border-slate-700 py-1 px-1.5 focus:border-indigo-500 outline-none"
                                />
                                <span>คะแนน</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={handleStartSimulation}
                              disabled={simRunning}
                              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 text-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] cursor-pointer"
                            >
                              <Play className="w-4 h-4" /> เริ่มต้นคำนวณรันโปรแกรม
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
                            <HelpCircle className="w-7 h-7" />
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="text-sm font-bold text-slate-300">หน้าต่างควบคุมประกอบชิ้นงาน</h5>
                            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                              กรุณาคลิกเลือกบล็อกการทำงาน (Node) ทางด้านซ้าย 
                              จากนั้นเลือกรูปทรง ANSI ที่ถูกต้องจากรายการที่จะปรากฏขึ้น
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>

                {/* Simulation Output Logger */}
                {simLog.length > 0 && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left font-mono text-2xs text-slate-300 h-32 overflow-y-auto leading-relaxed relative">
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
                    <span className="text-[10px] text-indigo-400 font-bold block mb-1 font-sans">CONSOLE LOGGER OUTPUT:</span>
                    {simLog.map((log, idx) => (
                      <div key={idx} className="flex gap-1 items-start mt-1">
                        <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>

        {/* 2.8.3 draw.io Sandbox Simulator */}
        <div className="space-y-8 pt-8">
          <div className="border-l-4 border-cyan-500 pl-4 space-y-1">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              การวาดผังงานด้วยเครื่องมือระดับสากล (draw.io)
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              ทำความรู้จักและทดลองจำลองลากวางเพื่อขึ้นรูปโครงสร้างแผนภูมิผ่าน draw.io (app.diagrams.net)
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-lg flex flex-col xl:flex-row gap-10 items-stretch">
            
            {/* Left: draw.io introduction text */}
            <div className="xl:w-2/5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  ในโลกการพัฒนาซอฟต์แวร์ระดับอาชีพ การเขียนผังงานจะเขียนผ่านเว็บบราวเซอร์ระดับโลกอย่าง **draw.io (หรือ app.diagrams.net)** 
                  ซึ่งเป็นโปรแกรมเวกเตอร์ฟรีที่มีไลบรารีสัญญลักษณ์ ANSI มาตรฐานครบถ้วน 
                  มีระบบลูกศรอัจฉริยะ (Smart Connector) ที่จะลากเชื่อมต่อได้ลื่นไหล ไม่หลุดจากขอบทรงแม้จะเคลื่อนย้ายวัตถุ
                </p>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3.5 text-left">
                  <span className="text-xs text-slate-700 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> จุดเด่นหลักในการทำงาน:</span>
                  
                  <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>ลากรูปทรงมาวาง (Drag & Drop) และพิมพ์ข้อความได้สะดวก</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>บันทึกเข้าระบบคลาวด์ เช่น Google Drive, OneDrive ได้เรียลไทม์</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>สามารถส่งออกเป็นไฟล์รูปภาพ PNG, PDF หรือ SVG ไปพิมพ์เขียนต่อได้สะดวก</span>
                    </li>
                  </ul>
                </div>
              </div>

              <a
                href="https://app.diagrams.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-cyan-600/20 text-sm w-full cursor-pointer"
              >
                เข้าสู่เว็บไซต์หลัก draw.io <ExternalLink className="w-4.5 h-4.5" />
              </a>
            </div>

            {/* Right: draw.io Sandbox drag-and-drop builder */}
            <div className="xl:w-3/5 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-inner text-white flex flex-col justify-between min-h-[420px] relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    <Monitor className="w-4.5 h-4.5 text-cyan-400" />
                     draw.io Sandbox Simulator (จำลองการทำงาน)
                  </h5>
                  <p className="text-2xs text-slate-500 mt-0.5">ลากรูปทรงจาก แผงด้านซ้าย มาวางที่ บอร์ดทางขวา เพื่อจัดรูปแบบ</p>
                </div>
                
                <button
                  onClick={clearDrawio}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold px-3 py-1.5 rounded-lg text-2xs transition-all cursor-pointer"
                >
                  เคลียร์บอร์ด
                </button>
              </div>

              <div className="flex flex-1 gap-4 items-stretch min-h-[280px]">
                
                {/* Left side: shapes panel list */}
                <div className="w-1/4 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-3 justify-center select-none shrink-0 overflow-y-auto">
                  <span className="text-[9px] text-slate-500 font-bold text-center block uppercase tracking-wider">Shapes Palette</span>
                  
                  {Object.keys(shapeDatabase).map(key => (
                    <div
                      key={key}
                      draggable
                      onDragStart={() => handleDragStart(key)}
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl p-2 text-center cursor-grab active:cursor-grabbing hover:border-cyan-500 transition-colors shrink-0"
                    >
                      <span className="text-[9px] font-bold font-mono text-cyan-400 block tracking-wide truncate">{key.toUpperCase()}</span>
                    </div>
                  ))}
                </div>

                {/* Right side: canvas board dropping */}
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDropCanvas}
                  className="w-3/4 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-4 relative flex items-center justify-center overflow-hidden min-h-[260px]"
                >
                  
                  {drawioCanvas.length === 0 ? (
                    <div className="text-center space-y-2 pointer-events-none opacity-40">
                      <span className="text-3xl block">🖱️</span>
                      <span className="text-2xs font-semibold text-slate-400 max-w-xs block leading-relaxed">ลากรูปทรงด้านซ้าย วางที่นี่ หรือคลิกเพื่อจำลองสลับเชื่อม Smart Line</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 p-4 overflow-auto">
                      {drawioCanvas.map(symbol => {
                        const isSelectedSource = connectorSource === symbol.id;
                        return (
                          <div
                            key={symbol.id}
                            style={{ left: `${symbol.x}px`, top: `${symbol.y}px`, position: 'absolute' }}
                            onClick={() => handleConnectShapes(symbol.id)}
                            className={`p-3 rounded-lg border-2 text-center bg-slate-950 cursor-pointer transition-all duration-300 hover:scale-105 shrink-0 ${
                              isSelectedSource 
                                ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse' 
                                : 'border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-2xs font-bold text-white block uppercase tracking-wider leading-none mb-1 font-mono text-[9px] text-slate-500">{symbol.type}</span>
                            <span className="text-xs font-bold text-cyan-400">{symbol.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>

              {/* Status bar */}
              <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl text-left text-2xs text-slate-400 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
                <span>{drawioLog}</span>
              </div>

            </div>

          </div>
        </div>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.8)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
