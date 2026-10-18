# Diagram Design Skill Guide

คู่มือฉบับสรุปสำหรับการใช้งานสกิล **[diagram-design](https://github.com/cathrynlavery/diagram-design)** เครื่องมือออกแบบ สร้าง และส่งออกแผนภาพสถาปัตยกรรมระบบ โฟลว์ข้อมูล และแผนภูมิธุรกิจระดับมืออาชีพ รองรับทั้ง SVG, Mermaid, Excalidraw และ Draw.io

---

## 1. จุดเด่นของ Diagram Design

- **รองรับหลายฟอร์แมตชั้นนำ**: สามารถสร้างและแปลงเป็น **SVG**, **Mermaid.js**, **Excalidraw**, และ **Draw.io** ได้อย่างอิสระ
- **ครอบคลุมกว่า 30+ รูปแบบไดอะแกรม**: ตั้งแต่ระดับ System Architecture, Database Schema, Data Pipeline ไปจนถึง Strategy & Business Models
- **มีสคริปต์ตรวจสอบความถูกต้อง (Self-check)**: ตรวจสอบ Layout Budget, สัดส่วนเส้น, และความคมชัดก่อน Export เป็นไฟล์ภาพ

---

## 2. หมวดหมู่ไดอะแกรมที่รองรับ (Diagram Types)

### 🏗️ 1. สถาปัตยกรรมระบบ (System Architecture)
- **High-Level Architecture**: ภาพรวมระบบเชื่อมต่อระหว่าง Client, API Gateway, Microservices, และ Storage
- **Deployment Topology**: การกระจายตัวของเซิร์ฟเวอร์, K8s Pods, Load Balancers, และ CDN
- **Axonometric / 3D Isometric**: ภาพสถาปัตยกรรมแบบ 3 มิติเชิงลึก ดูสวยงามและพรีเมียม
- **Exploded View**: ผ่าองค์ประกอบภายในระบบออกมาแสดงทีละเลเยอร์

### 🗄️ 2. ข้อมูลและฐานข้อมูล (Data & Databases)
- **Data Flow Diagram (DFD)**: เส้นทางการไหลของข้อมูลระหว่างกระบวนการและแหล่งจัดเก็บ
- **Database Schema & ERD**: แผนผัง Entity Relationship และความสัมพันธ์ของ Foreign Keys
- **Medallion Data Architecture**: แผนผัง Data Lakehouse แบ่งชั้น Bronze, Silver, Gold

### 🔄 3. กระบวนการและตรรกะ (Logic & Flow)
- **Sequence Diagram**: แผนภาพลำดับการส่ง Request/Response ระหว่าง Services
- **State Machine**: แผนผังการเปลี่ยนสถานะของ Entity (เช่น Order Lifecycle)
- **Flowchart & Swimlane**: ลำดับขั้นตอนการทำงานแบ่งตามแผนกหรือผู้รับผิดชอบ

### 📈 4. ธุรกิจและกลยุทธ์ (Business & Strategy)
- **Wardley Mapping**: แผนผังวิเคราะห์ภูมิทัศน์กลยุทธ์และวิวัฒนาการของเทคโนโลยี
- **Sankey Diagram**: แสดงสัดส่วนปริมาณการไหล (เช่น Traffic หรือ งบประมาณ)
- **Fishbone Diagram (ก้างปลา)**: วิเคราะห์สาเหตุและปัจจัยของปัญหา (Root Cause Analysis)
- **2x2 Quadrant Matrix**: ตาราง 4 ช่องสำหรับการจัดลำดับความสำคัญ (Priority Matrix)
- **Gantt & Timeline**: แผนผังระยะเวลาของโปรเจกต์และ Roadmap

---

## 3. รูปแบบการส่งออกไฟล์ (Export Formats)

| ฟอร์แมต | สกริปต์ตัวช่วยเบื้องหลัง | เหมาะสำหรับการใช้งาน |
| :--- | :--- | :--- |
| **SVG (Scalable Vector)** | `export_svg.py` | คมชัด 100% เหมาะสำหรับฝังใน Markdown, เว็บไซต์ หรือ Presentation |
| **Mermaid Code** | `mermaid_extract.py` | ก๊อปปี้ไปแสดงผลใน GitHub, Notion หรือ IDE ได้ทันที |
| **Excalidraw** | `excalidraw_extract.py` | สไตล์ภาพสเก็ตช์ลายมือ เปิดแก้ไขต่อใน Excalidraw ได้ |
| **Draw.io** | `drawio_extract.py` | ไฟล์ XML ที่นำไปเปิดแก้ไขต่อใน diagrams.net / draw.io |

---

## 4. ตัวอย่างคำสั่งใช้งานจริง

- **สร้างแผนภาพสถาปัตยกรรม Microservices:**
  > `/diagram-design สร้าง High-level Architecture ของระบบ E-Commerce ที่ใช้ Event-Driven ด้วย Kafka และส่งออกเป็น SVG`
- **สร้างแผนผัง Database ERD:**
  > `/diagram-design สร้าง ER Diagram ของระบบจองโรงแรม มีตาราง Users, Rooms, Bookings, Payments`
- **สร้าง Sequence Diagram:**
  > `/diagram-design สร้าง Sequence Diagram แสดงขั้นตอนการทำ OAuth 2.0 Authorization Code Flow`
- **สร้างแผนผังกลยุทธ์ Wardley Map:**
  > `/diagram-design สร้าง Wardley Map เพื่อวิเคราะห์การย้ายระบบ On-premise ไปสู่ Cloud-native`
