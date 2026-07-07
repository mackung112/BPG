const itCourse = {
    id: "31910-0001",
    title: "ระบบปฏิบัติการ บำรุงรักษา และเครือข่ายคอมพิวเตอร์เบื้องต้น",
    description: "ศึกษาและปฏิบัติเกี่ยวกับระบบปฏิบัติการ การประกอบและบำรุงรักษาเครื่องคอมพิวเตอร์ อุปกรณ์และสื่อกลางเครือข่าย การตั้งค่าโปรโตคอล IP Address การแชร์ทรัพยากร ตลอดจนกระบวนการวิเคราะห์และแก้ไขปัญหาไอทีระดับวิชาชีพ",
    icon: "💻",
    chapters: [
        {
            id: 1,
            title: "บทที่ 1: ปูพื้นฐานระบบคอมพิวเตอร์และเครือข่าย",
            lessons: [
                {
                    id: "1.1",
                    title: "1.1 สถาปัตยกรรมคอมพิวเตอร์เบื้องต้น",
                    mainTitle: "สถาปัตยกรรมคอมพิวเตอร์เบื้องต้น",
                    subTitle: "(Computer System Architecture)",
                    description: "ทำความรู้จัก ฮาร์ดแวร์ ซอฟต์แวร์ และวงจรการประมวลผลข้อมูล (Input, Process, Storage, Output)",
                    content: "[it1_1]"
                },
                {
                    id: "1.2",
                    title: "1.2 ก้าวแรกสู่ระบบเครือข่าย",
                    mainTitle: "ก้าวแรกสู่ระบบเครือข่าย",
                    subTitle: "(Introduction to Computer Networks)",
                    description: "เครือข่ายคอมพิวเตอร์คือหัวใจสำคัญของการแบ่งปันทรัพยากรและการแลกเปลี่ยนข้อมูลข่าวสารระหว่างอุปกรณ์ การทำความเข้าใจจุดประสงค์ องค์ประกอบ และทิศทางการสื่อสารจึงเป็นรากฐานสู่โลกไอทีและวิศวกรรมระบบ<br/><br/>เครือข่ายคอมพิวเตอร์ (Computer Network) คือการนำคอมพิวเตอร์และอุปกรณ์ตั้งแต่ 2 เครื่องขึ้นไปมาเชื่อมต่อกัน เพื่อเป้าหมายสูงสุดคือ <strong class=\"text-emerald-600\">การแชร์ทรัพยากร (Resource Sharing)</strong> ให้เกิดความคุ้มค่าและรวดเร็ว",
                    content: "[it1_2]"
                },
                {
                    id: "1.3",
                    title: "1.3 ประเภทและโครงสร้างเครือข่าย (Network Types)",
                    mainTitle: "ประเภทและโครงสร้างเครือข่าย",
                    subTitle: "(Network Types & Architectures)",
                    description: "ระบบเครือข่ายคอมพิวเตอร์สามารถจำแนกประเภทได้หลากหลายมิติ การแบ่งตามขนาดพื้นที่ทางภูมิศาสตร์ (Scale) และสถาปัตยกรรมการให้บริการ (Architecture) เป็นหลักการสำคัญที่ช่วยให้วิศวกรระบบสามารถออกแบบโครงข่ายเพื่อเชื่อมต่อและแชร์ทรัพยากรได้อย่างคุ้มค่า ปลอดภัย และมีประสิทธิภาพสูงสุด",
                    content: "[it1_3]"
                },
                {
                    id: "1.4",
                    title: "1.4 โทโพโลยีเครือข่าย (Network Topology)",
                    mainTitle: "โทโพโลยีเครือข่าย",
                    subTitle: "(Network Topologies)",
                    description: "โทโพโลยีเครือข่าย (Network Topology) คือโครงสร้างทางกายภาพและทางตรรกะในการเชื่อมต่อคอมพิวเตอร์และอุปกรณ์โครงข่ายเข้าด้วยกัน การทำความเข้าใจข้อดี ข้อจำกัด และรูปแบบ Bus, Star, Ring, Mesh และ Hybrid ช่วยให้สามารถออกแบบและติดตั้งเครือข่ายได้อย่างมีเสถียรภาพและประหยัดต้นทุนสูงสุด",
                    content: "[it1_4]"
                }
            ]
        },
        {
            id: 2,
            title: "บทที่ 2: เจาะลึกฮาร์ดแวร์และการประกอบคอมพิวเตอร์",
            lessons: [
                {
                    id: "2.1",
                    title: "2.1 รู้จักชิ้นส่วนหลัก",
                    mainTitle: "รู้จักชิ้นส่วนหลัก",
                    subTitle: "(Hardware Components)",
                    description: "ทำความรู้จัก CPU, Motherboard, RAM, Storage (HDD/SSD), PSU และ VGA แบบละเอียด",
                    content: "[it2_1]"
                },
                {
                    id: "2.2",
                    title: "2.2 ความปลอดภัยในการปฏิบัติงาน",
                    mainTitle: "ความปลอดภัยในการปฏิบัติงาน",
                    subTitle: "(Assembly Tools & Safety)",
                    description: "รู้จักเครื่องมือช่างคอมพิวเตอร์เบื้องต้น และขั้นตอนการป้องกันอันตรายจากไฟฟ้าสถิต (ESD)",
                    content: "[it2_2]"
                },
                {
                    id: "2.3",
                    title: "2.3 การประกอบคอมพิวเตอร์ทีละขั้นตอน",
                    mainTitle: "การประกอบคอมพิวเตอร์ทีละขั้นตอน",
                    subTitle: "(Step-by-Step Computer Assembly)",
                    description: "การจัดเตรียมเคส ติดตั้งชิ้นส่วน ไปจนถึงศิลปะการจัดสายไฟ (Cable Management) ภายใน",
                    content: "[it2_3]"
                },
                {
                    id: "2.4",
                    title: "2.4 การตรวจสอบระบบ (POST & BIOS)",
                    mainTitle: "การตรวจสอบระบบ (POST & BIOS)",
                    subTitle: "(POST & BIOS Setup)",
                    description: "การทดสอบเปิดเครื่องครั้งแรก การแปลความเสียง Beep Code และการตั้งค่า BIOS/UEFI เบื้องต้น",
                    content: "[it2_4]"
                }
            ]
        },
        {
            id: 3,
            title: "บทที่ 3: ระบบปฏิบัติการและการเตรียมความพร้อม",
            lessons: [
                {
                    id: "3.1",
                    title: "3.1 การเตรียมไฟล์ติดตั้ง (ดาวน์โหลด Windows 11)",
                    mainTitle: "ดาวน์โหลด Windows 11",
                    subTitle: "(Download Windows 11)",
                    description: "จำลองหน้าเว็บไซต์ดาวน์โหลดซอฟต์แวร์ Windows 11 เพื่อเรียนรู้ช่องทางการเตรียมไฟล์ติดตั้งอย่างเป็นทางการ",
                    content: "[it3_1]"
                },
                {
                    id: "3.2",
                    title: "3.2 การติดตั้งระบบปฏิบัติการและการเตรียมความพร้อม",
                    mainTitle: "การติดตั้งระบบปฏิบัติการและการเตรียมความพร้อม",
                    subTitle: "(OS Installation & Deployment)",
                    description: "เรียนรู้บทบาทหน้าที่และประเภทของระบบปฏิบัติการ (OS) ตลอดจนขั้นตอนปฏิบัติงานจริง: การเตรียมเครื่องและสำรองข้อมูล, การทำ USB บูตผ่าน Rufus, การบูตเข้าตั้งค่า BIOS/UEFI, ขั้นตอนติดตั้ง Windows 10 แบบล้างเครื่อง และการอัปเดตไดรเวอร์ของอุปกรณ์",
                    content: "[it3_2]"
                }
            ]
        },
        {
            id: 4,
            title: "บทที่ 4: สื่อกลางและการเชื่อมต่อทางกายภาพ",
            lessons: [
                {
                    id: "4.1",
                    title: "4.1 สื่อกลางและการเชื่อมต่อทางกายภาพ",
                    mainTitle: "สื่อกลางและการเชื่อมต่อทางกายภาพ",
                    subTitle: "(Network Media & Cabling)",
                    description: "เรียนรู้อุปกรณ์เครือข่ายคอมพิวเตอร์พื้นฐาน (Switch, Router, AP, NIC), ชนิดสายสัญญาณ UTP vs STP และสเปกความเร็วมาตรฐาน CAT 5e/6/6A, มาตรฐานสีและการขั้วต่อสาย T568A vs T568B ตลอดจนขั้นตอนปฏิบัติการจำลองการเข้าหัวสายสัญญาณ RJ-45 และทดสอบผ่านเครื่องสแกนสัญญาณเน็ตเวิร์ก",
                    content: "[it4_1]"
                }
            ]
        },
        {
            id: 5,
            title: "บทที่ 5: โปรโตคอล IP Address และการแชร์ทรัพยากร",
            lessons: [
                {
                    id: "5.1",
                    title: "5.1 มาตรฐานการสื่อสาร",
                    mainTitle: "มาตรฐานการสื่อสาร",
                    subTitle: "(OSI Model & TCP/IP Protocol Suite)",
                    description: "ทำความเข้าใจแบบจำลองการรับส่งข้อมูล OSI Model 7 ชั้น และชุดโปรโตคอล TCP/IP",
                    content: "[it5_1]"
                },
                {
                    id: "5.2",
                    title: "5.2 โครงสร้าง IP Address (IPv4)",
                    mainTitle: "โครงสร้าง IP Address (IPv4)",
                    subTitle: "(IP Addressing & Classes)",
                    description: "ความหมายของ Network ID/Host ID, คลาสไอพี (Class A,B,C), Public/Private IP และ Subnet Mask",
                    content: "[it5_2]"
                },
                {
                    id: "5.3",
                    title: "5.3 การตั้งค่า IP และ Subnetting เบื้องต้น",
                    mainTitle: "การตั้งค่า IP และ Subnetting เบื้องต้น",
                    subTitle: "(IP Config & Subnetting)",
                    description: "การกำหนด Static/Dynamic IP (DHCP) และแนวทางการแบ่งวงเครือข่ายย่อย",
                    content: "[it5_3]"
                },
                {
                    id: "5.4",
                    title: "5.4 การทดสอบและแชร์ทรัพยากร",
                    mainTitle: "การทดสอบและแชร์ทรัพยากร",
                    subTitle: "(Network Diagnostics & Resource Sharing)",
                    description: "การใช้คำสั่ง Ping, Tracert ตรวจสอบระบบเครือข่าย และขั้นตอนแชร์โฟลเดอร์/เครื่องพิมพ์ในวงแลน",
                    content: "[it5_4]"
                }
            ]
        },
        {
            id: 6,
            title: "บทที่ 6: การบำรุงรักษาระบบและโปรแกรมอรรถประโยชน์",
            lessons: [
                {
                    id: "6.1",
                    title: "6.1 เครื่องมือจัดการระบบจาก Windows (Built-in Tools)",
                    mainTitle: "เครื่องมือจัดการระบบจาก Windows (Built-in Tools)",
                    subTitle: "(Windows Built-in Utilities)",
                    description: "การใช้ Disk Cleanup, Storage Sense และการจัดระเบียบข้อมูลดิสก์ (Defragmentation)",
                    content: "[it6_1]"
                },
                {
                    id: "6.2",
                    title: "6.2 การตรวจสอบและซ่อมแซมไฟล์ระบบ",
                    mainTitle: "การตรวจสอบและซ่อมแซมไฟล์ระบบ",
                    subTitle: "(System & Registry Repair)",
                    description: "การใช้งานคำสั่ง Command Prompt พื้นฐานสำหรับซ่อมแซมไฟล์ระบบ (sfc /scannow, chkdsk)",
                    content: "[it6_2]"
                },
                {
                    id: "6.3",
                    title: "6.3 การป้องกันและสำรองข้อมูล",
                    mainTitle: "การป้องกันและสำรองข้อมูล",
                    subTitle: "(Security & Data Backup)",
                    description: "ศึกษาภัยคุกคามไซเบอร์เบื้องต้น การอัปเดต Antivirus และขั้นตอนการสร้าง System Restore Point",
                    content: "[it6_3]"
                },
                {
                    id: "6.4",
                    title: "6.4 การตรวจสอบประสิทธิภาพ (Monitoring Tools)",
                    mainTitle: "การตรวจสอบประสิทธิภาพ (Monitoring Tools)",
                    subTitle: "(System Performance Monitoring)",
                    description: "การใช้ Task Manager และ Resource Monitor ค้นหาสาเหตุอาการเครื่องช้าและหน่วงผิดปกติ",
                    content: "[it6_4]"
                }
            ]
        },
        {
            id: 7,
            title: "บทที่ 7: การวิเคราะห์และแก้ไขปัญหาไอที",
            lessons: [
                {
                    id: "7.1",
                    title: "7.1 ระเบียบวิธีแก้ปัญหา (Troubleshooting Methodology)",
                    mainTitle: "ระเบียบวิธีแก้ปัญหา",
                    subTitle: "(Troubleshooting Methodology)",
                    description: "กระบวนการ 6 ขั้นตอนตามหลักสากลในการค้นหาสาเหตุ แยกแยะประเภท และแก้ไขปัญหาไอที",
                    content: "[it7_1]"
                },
                {
                    id: "7.2",
                    title: "7.2 การวิเคราะห์ปัญหาเครือข่ายและฮาร์ดแวร์",
                    mainTitle: "การวิเคราะห์ปัญหาเครือข่ายและฮาร์ดแวร์",
                    subTitle: "(Network & Hardware Diagnosis)",
                    description: "การแยกแยะสาเหตุอาการเสีย (Hardware/Software) และการใช้เครื่องมือคำสั่ง (ipconfig, netstat)",
                    content: "[it7_2]"
                },
                {
                    id: "7.3",
                    title: "7.3 การอ่านบันทึกระบบ (Windows Logs)",
                    mainTitle: "การอ่านบันทึกระบบ (Windows Logs)",
                    subTitle: "(Event Viewer System Logs)",
                    description: "การใช้งาน Event Viewer เพื่อสืบสวนข้อผิดพลาด หาสาเหตุเครื่องค้าง ดับ หรือระบบล่ม",
                    content: "[it7_3]"
                },
                {
                    id: "7.4",
                    title: "7.4 การจัดทำระบบเอกสาร (IT Helpdesk Documentation)",
                    mainTitle: "การจัดทำระบบเอกสาร (IT Helpdesk Documentation)",
                    subTitle: "(IT Maintenance Report & RCA)",
                    description: "ความสำคัญของบันทึกประวัติการซ่อม แนะนำระบบ IT Ticketing และการเขียนรายงาน RCA อย่างมืออาชีพ",
                    content: "[it7_4]"
                }
            ]
        }
    ]
};

export default itCourse;
