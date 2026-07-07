const ooadCourse = {
    id: "31910-2003",
    title: "วิเคราะห์และออกแบบระบบเชิงวัตถุ",
    description: "ศึกษาและปฏิบัติเกี่ยวกับวงจรการพัฒนาระบบ (SDLC) การวิเคราะห์ความต้องการผู้ใช้ (Requirements Engineering) การจัดทำเอกสารข้อกำหนดความต้องการ (SRS) การใช้สัญลักษณ์ภาษาภาพแบบมาตรฐาน UML ในการออกแบบ Use Case, Class, Activity, และ Sequence Diagrams และการวิเคราะห์โครงงานประยุกต์เชิงอาชีพ",
    icon: "📊",
    chapters: [
        {
            id: 1,
            title: "Unit 1: การจัดทำเอกสาร SRS",
            lessons: [
                { id: "1.1", title: "1.1 องค์ประกอบของ SRS", mainTitle: "องค์ประกอบของ SRS", subTitle: "(Elements of SRS)", description: "ทำความเข้าใจส่วนประกอบพื้นฐานของเอกสารข้อกำหนดความต้องการซอฟต์แวร์ และความเชื่อมโยงในการพัฒนา", content: "[ooad1_1]" },
                { id: "1.2", title: "1.2 โครงสร้างมาตรฐานของ SRS", mainTitle: "โครงสร้างมาตรฐานของ SRS", subTitle: "(Standard SRS Structure)", description: "เจาะลึกโครงสร้างมาตรฐานของ SRS ตั้งแต่บทนำ คำอธิบายโดยรวม ข้อกำหนดเชิงฟังก์ชันและไม่เชิงฟังก์ชัน", content: "[ooad1_2]" },
                { id: "1.3", title: "1.3 ตัวอย่าง SRS งานระบบจัดการข้อมูลนักศึกษา", mainTitle: "ตัวอย่าง SRS ระบบจัดการข้อมูลนักศึกษา", subTitle: "(Project 1: Student Management SRS)", description: "วิเคราะห์และศึกษาโครงร่างเอกสาร SRS จริงสำหรับระบบทะเบียนและจัดการข้อมูลนักศึกษา", content: "[ooad1_3]" },
                { id: "1.4", title: "1.4 ตัวอย่าง SRS งานระบบจัดการข้อมูลสินค้าคงคลัง", mainTitle: "ตัวอย่าง SRS ระบบจัดการข้อมูลสินค้าคงคลัง", subTitle: "(Project 2: Inventory Management SRS)", description: "วิเคราะห์และศึกษาโครงร่างเอกสาร SRS จริงสำหรับระบบคลังสินค้าและการตัดยอดสินค้าคงเหลือ", content: "[ooad1_4]" },
                { id: "1.5", title: "1.5 ตัวอย่าง SRS งานระบบจัดการข้อมูลการจอง", mainTitle: "ตัวอย่าง SRS ระบบจัดการข้อมูลการจอง", subTitle: "(Project 3: Booking Management SRS)", description: "วิเคราะห์และศึกษาโครงร่างเอกสาร SRS จริงสำหรับระบบการจองห้องพักหรือบริการออนไลน์", content: "[ooad1_5]" }
            ]
        },
        {
            id: 2,
            title: "Unit 2: ภาพรวมและแผนภาพ UML (UML Overview)",
            lessons: [
                { id: "2.1", title: "2.1 ทำความรู้จักกับ UML", mainTitle: "ทำความรู้จักกับ UML", subTitle: "(UML Basics)", description: "ประวัติความเป็นมาและการแบ่งประเภทของแผนภาพ UML (Structural และ Behavioral Diagrams)", content: "[ooad2_1]" },
                { id: "2.2", title: "2.2 แผนภาพกิจกรรม (Activity Diagram)", mainTitle: "แผนภาพกิจกรรม", subTitle: "(Activity Diagram)", description: "การอธิบายขั้นตอนการทำงานหรือ Workflow ของระบบคล้ายกับ Flowchart", content: "[ooad2_2]" },
                { id: "2.3", title: "2.3 แผนภาพยูสเคส (Use Case Diagram)", mainTitle: "แผนภาพยูสเคส", subTitle: "(Use Case Diagram)", description: "เรียนรู้การระบุองค์ประกอบและวาดแผนภาพยูสเคส (ระบบโหวต) ทีละขั้นตอนผ่านเครื่องมือจำลอง", content: "[ooad2_3]" },
                { id: "2.4", title: "2.4 แผนภาพลำดับเวลา (Sequence Diagram)", mainTitle: "แผนภาพลำดับเวลา", subTitle: "(Sequence Diagram)", description: "การแสดงการสื่อสารและการส่งข้อความระหว่างอ็อบเจกต์ตามลำดับเวลา", content: "[ooad2_4]" },
                { id: "2.5", title: "2.5 แผนภาพคลาส (Class Diagram)", mainTitle: "แผนภาพคลาส", subTitle: "(Class Diagram)", description: "เรียนรู้โครงสร้างของคลาส การประกาศข้อมูลและเมธอด การกำหนดสิทธิ์เข้าถึง และความสัมพันธ์รูปแบบต่างๆ ในระบบเข้าสู่ระบบ (Login Flow)", content: "[ooad2_5]" },
                { id: "2.6", title: "2.6 สรุปการเลือกใช้ UML Diagram", mainTitle: "สรุปการเลือกใช้ UML Diagram", subTitle: "(Summary & Quiz)", description: "สรุปภาพรวมแผนภาพ UML และทดสอบความเข้าใจในการเลือกใช้แผนภาพให้เหมาะสมกับสถานการณ์", content: "[ooad2_6]" }
            ]
        },
        {
            id: 3,
            title: "Unit 3: การจัดทำเอกสารข้อกำหนดความต้องการ (SRS Document)",
            lessons: [
                { id: "3.1", title: "3.1 บทบาทและความสำคัญของเอกสาร SRS (Software Requirements Specification)", mainTitle: "บทบาทของเอกสารข้อกำหนดความต้องการ", subTitle: "(SRS Importance)", description: "ความสำคัญของข้อตกลงและสัญญาความเข้าใจร่วมกันระหว่างช่างโปรแกรมและลูกค้านักธุรกิจ", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "3.2", title: "3.2 มาตรฐานของเอกสาร SRS (เช่น IEEE 830 หรือมาตรฐาน ISO ที่เกี่ยวข้อง)", mainTitle: "โครงสร้างมาตรฐานของเอกสารความต้องการ", subTitle: "(SRS Standards: IEEE 830)", description: "การจัดทำโครงสร้างเอกสารความต้องการตามระเบียบมาตรฐานสากล IEEE 830 หรือ ISO", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "3.3", title: "3.3 โครงสร้างหลักของเอกสาร SRS", mainTitle: "องค์ประกอบหลักของเอกสาร SRS", subTitle: "(SRS Structure)", description: "ทำความเข้าใจส่วนบทนำ (Introduction) รายละเอียดภาพรวม (Overall Description) และข้อกำหนดเจาะจง (Specific Requirements)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "3.4", title: "3.4 เทคนิคการเขียนเนื้อหาและลักษณะของ SRS ที่ดี (Correct, Unambiguous, Complete, Consistent)", mainTitle: "แนวทางและคุณภาพของข้อกำหนดที่ดี", subTitle: "(Writing Quality Requirements)", description: "หลักการความชัดเจน ไม่กำกวม สอดคล้อง มีความถูกต้อง และสามารถสอบทวนตรวจวัดผลได้จริง", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "3.5", title: "3.5 การสอบทานและการอนุมัติเอกสาร (Requirements Validation & Sign-off)", mainTitle: "กระบวนการอนุมัติรับรองผลงาน", subTitle: "(Requirements Validation & Sign-off)", description: "ขั้นตอนการสแกนความสอดคล้องและการลงนามยอมรับสิทธิ์ (Sign-off) เพื่อเริ่มโครงงาน", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" }
            ]
        },
        {
            id: 4,
            title: "Unit 4: แผนภาพยูสเคส (Use Case Diagram และ Use Case Specification)",
            lessons: [
                { id: "4.1", title: "4.1 ทำความรู้จักกับ UML (Unified Modeling Language)", mainTitle: "ภาษาภาพมาตรฐาน UML", subTitle: "(Introduction to UML)", description: "ประวัติ ความเข้าใจเบื้องต้น และวิวัฒนาการของระบบแผนภาพโครงสร้างและพฤติกรรมสากล", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "4.2", title: "4.2 ประเภทของแผนภาพ UML", mainTitle: "การแบ่งจำแนกแผนภาพ UML", subTitle: "(UML Diagram Types)", description: "การแยกแยะกลุ่มแผนภาพจัดวางโครงสร้างทางกายภาพ (Structural) และจำลองตรรกะการกระทำ (Behavioral)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "4.3", title: "4.3 องค์ประกอบของ Use Case Diagram", mainTitle: "องค์ประกอบแผนภาพยูสเคส", subTitle: "(Use Case Elements)", description: "ทำความเข้าใจและวาดสัญลักษณ์ Actor, Use Case, System Boundary ได้แม่นยำตามสากล", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "4.4", title: "4.4 ความสัมพันธ์ใน Use Case Diagram", mainTitle: "ความสัมพันธ์ในแผนภาพยูสเคส", subTitle: "(Use Case Relationships)", description: "การใช้สัญลักษณ์ความสัมพันธ์แบบ Include, Extend, Association และ Generalization ได้ตรงตามเงื่อนไข", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "4.5", title: "4.5 การเขียนคำอธิบายยูสเคส (Use Case Specification / Use Case Description)", mainTitle: "การบันทึกสเปคยูสเคส", subTitle: "(Use Case Specifications)", description: "ระเบียบการเขียนบรรยายรายละเอียด Pre/Post-conditions, Normal Flow, Alternate Flow และ Exception Flow", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" }
            ]
        },
        {
            id: 5,
            title: "Unit 5: พื้นฐานการคิดเชิงวัตถุ (Object-Oriented Concepts)",
            lessons: [
                { id: "5.1", title: "5.1 แนวคิดเชิงวัตถุ (Object-Oriented Paradigm)", mainTitle: "กระบวนทัศน์เชิงวัตถุ", subTitle: "(Object-Oriented Philosophy)", description: "ความแตกต่างระหว่างโครงสร้างเชิงฟังก์ชันและการจำลองมองปัญหาเป็นวัตถุในชีวิตจริง", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "5.2", title: "5.2 ความแตกต่างและความสัมพันธ์ระหว่าง Class กับ Object (Instance)", mainTitle: "ความสัมพันธ์ระหว่างคลาสและวัตถุ", subTitle: "(Class vs Object Instance)", description: "ความเข้าใจเชิงลึกในพิมพ์เขียว (Class) และอินสแตนซ์วัตถุจริงที่จับจองตำแหน่งหน่วยความจำ (Object)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "5.3", title: "5.3 องค์ประกอบของคลาส", mainTitle: "โครงสร้างชิ้นส่วนภายในคลาส", subTitle: "(Class Members & Structures)", description: "การแยกแยะชื่อคลาส (Name) คุณลักษณะ (Attributes/State) และการกระทำของวัตถุ (Methods/Behaviors)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "5.4", title: "5.4 หลักการสำคัญ 4 ประการของ OOP (Four Pillars of OOP)", mainTitle: "กฎเหล็ก 4 ประการของ OOP", subTitle: "(Four Pillars of OOP)", description: "เจาะลึก Abstraction, Encapsulation, Inheritance, และ Polymorphism ในระดับสถาปัตยกรรม", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "5.5", title: "5.5 เทคนิคการสกัดคลาสและเมธอดจากข้อกำหนด (Noun-Verb Analysis)", mainTitle: "การวิเคราะห์คำนามและคำกริยา", subTitle: "(Noun-Verb Analysis)", description: "การอ่านทำความเข้าใจและไฮไลท์คำนาม (Nouns) เพื่อทำเป็นคลาส และคำกริยา (Verbs) ทำเป็นเมธอด", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" }
            ]
        },
        {
            id: 6,
            title: "Unit 6: กระบวนการวิเคราะห์และออกแบบเชิงวัตถุ (OOAD Process)",
            lessons: [
                { id: "6.1", title: "6.1 ความแตกต่างระหว่าง Object-Oriented Analysis (OOA) และ Object-Oriented Design (OOD)", mainTitle: "ขอบเขตของ OOA และ OOD", subTitle: "(Analysis vs Design)", description: "ความเข้าใจบทบาทของนักวิเคราะห์ในการหาสาเหตุคำตอบ (What) เปรียบเทียบกับการออกแบบวิธีแก้ (How)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "6.2", title: "6.2 การวิเคราะห์คลาสด้วยเครื่องมือ CRC Cards (Class-Responsibility-Collaborator)", mainTitle: "การจัดการการ์ดวิเคราะห์ CRC", subTitle: "(CRC Cards Modeling)", description: "การจำลองระบุ Class, Responsibilities, และคลาสร่วมงาน (Collaborators) ด้วยการ์ดกระดาษ", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "6.3", title: "6.3 หลักการออกแบบคลาสที่ดี (SOLID Principles เบื้องต้น)", mainTitle: "หลักการออกแบบคลาสที่ดี", subTitle: "(SOLID Principles Introduction)", description: "แนวทางเบื้องต้นเรื่อง Single Responsibility Principle (SRP) และการขจัดปัญหา God Class", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "6.4", title: "6.4 การเชื่อมโยง Use Case สู่ CRC Cards และ Class Model", mainTitle: "การผูกโยง Use Case สู่โครงสร้างคลาส", subTitle: "(Use Case to Class Mapping)", description: "การแกะขั้นตอนกิจกรรมของ Use Case มาจัดสรรความรับผิดชอบระบุลงบนตัวคลาสโมเดล", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" }
            ]
        },
        {
            id: 7,
            title: "Unit 7: แผนภาพคลาส (Class Diagram)",
            lessons: [
                { id: "7.1", title: "7.1 สัญลักษณ์และการวาด Class Diagram", mainTitle: "การจัดทำโครงร่างแผนภาพคลาส", subTitle: "(Class Diagram Symbols)", description: "การใช้กล่องสี่เหลี่ยม 3 ส่วนมาตรฐาน แสดง Name, Attributes, Operations ได้ครบถ้วน", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "7.2", title: "7.2 สัญลักษณ์การเข้าถึงข้อมูล (Visibility Modifiers)", mainTitle: "ระดับการเข้าถึงความปลอดภัยข้อมูล", subTitle: "(Visibility Modifiers)", description: "ความเข้าใจและการใช้สัญลักษณ์ควบคุมความปลอดภัยของสมาชิกคลาส (+ Public, - Private, # Protected)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "7.3", title: "7.3 การกำหนดชนิดข้อมูล (Data Types) และค่าเริ่มต้น (Initial Value)", mainTitle: "การประกาศประเภทข้อมูลและค่าดั้งเดิม", subTitle: "(Types & Initial values)", description: "การระบุชนิดตัวแปรและค่าแรกเกิดให้กับแอตทริบิวต์และพารามิเตอร์ขากลับของเมธอด", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "7.4", title: "7.4 ความสัมพันธ์ระหว่างคลาส (Relationships)", mainTitle: "ความสัมพันธ์และการเหนี่ยวรั้งระหว่างคลาส", subTitle: "(Class Relationships)", description: "การกำหนดสัญลักษณ์หัวลูกศรแบบ Association (Multiplicity), Aggregation, Composition, Generalization, และ Dependency", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "7.5", title: "7.5 การเปลี่ยนจาก Analysis Class Diagram ไปสู่ Design Class Diagram", mainTitle: "การขยายพิมพ์เขียวสู่การเขียนโค้ด", subTitle: "(Analysis to Design Diagrams)", description: "การอัปเกรดแผนภาพเชิงแนวคิดให้อัดแน่นด้วยรายละเอียดชนิดข้อมูลทางเทคนิคของภาษาโปรแกรมจริง", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" }
            ]
        },
        {
            id: 8,
            title: "Unit 8: แผนภาพพฤติกรรม (Behavioral Diagrams: Activity & Sequence)",
            lessons: [
                { id: "8.1", title: "8.1 Activity Diagram (แผนภาพกิจกรรม)", mainTitle: "การวางผังแผนภาพกิจกรรม", subTitle: "(Activity Diagrams)", description: "การออกแบบผังการไหลของเงื่อนไขการทำงานแบบคู่ขนาน ด้วย Initial Node, Action, Decision/Merge, Fork/Join, และ Swimlane", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "8.2", title: "8.2 Sequence Diagram (แผนภาพลำดับเหตุการณ์)", mainTitle: "แผนภาพลำดับเวลาและปฏิสัมพันธ์วัตถุ", subTitle: "(Sequence Diagrams)", description: "การวาดและแกะสายการสื่อสาร Message (Synchronous, Asynchronous, Return) ของอ็อบเจกต์ข้ามช่วงเวลา Lifeline", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" }
            ]
        },
        {
            id: 9,
            title: "Unit 9: การประยุกต์ใช้และโครงงานขนาดเล็ก (Mini Project)",
            lessons: [
                { id: "9.1", title: "9.1 การตรวจสอบความสอดคล้อง (Consistency) ของโมเดลทั้งหมด", mainTitle: "การทบทวนสอดประสานโมเดล", subTitle: "(Model Consistency)", description: "การตรวจทานรอยต่อระหว่างแผนภาพ Use Case, Activity, Sequence, และ Class ให้มีความเป็นหนึ่งสอดรับกันตรงแกน 100%", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "9.2", title: "9.2 การออกแบบสถาปัตยกรรมซอฟต์แวร์เบื้องต้น (Software Architecture)", mainTitle: "การจัดสรรเลเยอร์สถาปัตยกรรมซอฟต์แวร์", subTitle: "(Software Architectures: 3-Tier & MVC)", description: "การทำความเข้าใจโครงสร้างการแบ่งเลเยอร์แบบ 3-Tier และการแบ่งหน้าที่จัดระเบียบตรรกะแบบ MVC", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "9.3", title: "9.3 การออกแบบส่วนติดต่อผู้ใช้ (User Interface Mockup / Wireframing)", mainTitle: "การจัดทำโครงร่างหน้าจอจำลอง", subTitle: "(UI Mockup & Wireframing)", description: "ทฤษฎีการออกแบบส่วนติดต่อประสานงาน และการประยุกต์ใช้เครื่องมือจำลองสร้างหน้าจอระบบ", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" },
                { id: "9.4", title: "9.4 การนำเสนอโครงการ (Project Pitching)", mainTitle: "การส่งมอบงานจำลองและรายงาน", subTitle: "(Project Presentation & Docs)", description: "การรวบรวมเล่มรายงานเอกสารระบบ การทำ Role-Play สวมบทบาทนักวิเคราะห์สาธิตการรันระบบต่อหน้าลูกค้า", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมการจัดทำ</p>" }
            ]
        }
    ]
};

export default ooadCourse;
