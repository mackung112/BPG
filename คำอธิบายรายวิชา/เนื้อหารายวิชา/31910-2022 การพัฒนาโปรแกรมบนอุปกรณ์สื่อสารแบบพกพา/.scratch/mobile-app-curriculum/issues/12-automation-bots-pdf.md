# 12: Event-Driven Automation Bots & PDF Receipt Generation

**What to build:** การพัฒนาระบบอัตโนมัติบนคลาวด์ (AppSheet Automation) โดยสร้างบอทตรวจจับเหตุการณ์เมื่อมีออร์เดอร์ใหม่เข้ามา สั่งให้ระบบสร้างไฟล์ใบเสร็จรับเงิน (PDF Receipt) จากเทมเพลต และส่งอีเมลแจ้งเตือนลูกค้าและเจ้าของร้านทันที

**Blocked by:** 11: Geolocation Tracking & Google Maps Delivery

**Status:** resolved

## Engineering & Architecture Patterns
- **Event-Driven Architecture (EDA) Pattern:** การทำงานแบบ Event-Condition-Action (ECA) ➔ ตรวจจับ Event (Data Change: Adds_Only) ➔ กรองเงื่อนไข Condition (`[Order_Status] = "Paid"`) ➔ สั่งรัน Task อัตโนมัติ
- **Document Template Pattern:** การสร้างแม่แบบเอกสารบน Google Docs โดยใช้แท็กตัวแปร เช่น `<<[Order_ID]>>`, `<<Start:[Related Order_Details]>>...<<End>>` เพื่อให้ระบบ Compile ข้อมูลออกมาเป็นไฟล์ PDF ใบเสร็จจริง
- **Asynchronous Notification Pattern:** การส่งอีเมลแจ้งเตือนในฉากหลัง (Background Process) เพื่อไม่ให้กระทบต่อความเร็วในการใช้งานหน้าจอของลูกค้า

## Acceptance Criteria
- [x] สร้างและตั้งค่า Automation Bot ตรวจจับเมื่อมีข้อมูลใหม่เข้ามาในตาราง
- [x] สร้างเทมเพลตใบเสร็จบน Google Docs พร้อมแท็กตัวแปรดึงข้อมูลครบถ้วน
- [x] ระบบสามารถประมวลผลและสร้างไฟล์ PDF บันทึกลงใน Google Drive ได้จริง
- [x] ระบบส่งอีเมลยืนยันพร้อมแนบไฟล์ใบเสร็จ PDF เข้าสู่กล่องจดหมายจริง
- [x] ครอบคลุมระบบบอทของทั้ง 3 รูปแบบธุรกิจ (Archetypes)
- [x] มีแบบตรวจสอบตนเอง (Self-Checklist) และเกณฑ์การประเมิน 10 คะแนน (Rubric)
