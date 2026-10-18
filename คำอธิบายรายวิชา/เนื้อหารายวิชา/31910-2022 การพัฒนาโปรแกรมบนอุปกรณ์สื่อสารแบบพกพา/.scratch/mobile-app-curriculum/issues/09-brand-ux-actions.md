# 09: Brand UX Theming & Interactive Action Buttons

**What to build:** การปรับแต่งอัตลักษณ์แบรนด์ (Branding Theme & Colors) ใน AppSheet ให้สอดคล้องกับ Figma Tokens และการสร้างปุ่มดำเนินการอัจฉริยะ (Contextual Action Buttons) เช่น ปุ่มโทรหาลูกค้า ปุ่มเปลี่ยนสถานะออร์เดอร์ และปุ่มเปิดแผนที่

**Blocked by:** 08: Multi-Table Relations (Ref) & Calculation Formulas

**Status:** resolved

## Engineering & Architecture Patterns
- **State Machine Pattern:** การเปลี่ยนสถานะของเรคอร์ดตามวงจรธุรกิจ (เช่น `Pending` ➔ `In Progress` ➔ `Completed`) ด้วยปุ่ม Action เดียวที่เปลี่ยนป้ายกำกับและสีตามเงื่อนไข
- **Command Pattern (Action Buttons):** การสร้างคำสั่งสำเร็จรูปที่ผูกกับเหตุการณ์ เช่น `External: open a phone call`, `Data: set the values of some columns in this row`
- **Visual Branding Consistency Pattern:** การแมปรหัสสีหลัก (Primary), สีเน้น (Accent), และโลโก้ร้านให้ตรงกับ Design Tokens ของ Figma

## Acceptance Criteria
- [x] ปรับแต่ง Theme และ Brand Colors ใน AppSheet ให้ตรงกับ Design System จาก Figma
- [x] สร้างปุ่ม Action "โทรออกหาลูกค้า" (Type: Phone Call) ที่ทำงานได้จริงบนสมาร์ตโฟน
- [x] สร้างปุ่ม Action สำหรับเปลี่ยนสถานะคำสั่งซื้อ/สถานะพัสดุ (State Machine Action) พร้อมการแสดงผลแบบมีเงื่อนไข (Only if this condition is true)
- [x] ครอบคลุมการตั้งค่า Action Buttons ของทั้ง 3 รูปแบบธุรกิจ (Archetypes)
- [x] มีแบบตรวจสอบตนเอง (Self-Checklist) และเกณฑ์การประเมิน 10 คะแนน (Rubric)
