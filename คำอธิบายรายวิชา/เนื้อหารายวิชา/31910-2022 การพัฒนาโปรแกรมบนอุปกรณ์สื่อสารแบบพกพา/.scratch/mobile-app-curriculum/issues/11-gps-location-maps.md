# 11: Geolocation Tracking & Google Maps Delivery

**What to build:** การพัฒนาระบบระบุพิกัดดาวเทียม (GPS Tracking) และแผนที่นำทาง (Google Maps Integration) โดยการบันทึกตำแหน่งร้านค้าและพิกัดลูกค้าด้วยประเภท `LatLong` พร้อมปุ่มกดเปิด Google Maps นำทางจัดส่งสินค้าจริง

**Blocked by:** 10: Barcode/QR Scanning & Digital Signature Capture

**Status:** resolved

## Engineering & Architecture Patterns
- **Spatial Data Pattern:** การจัดการข้อมูลพิกัดละติจูดและลองจิจูดด้วยประเภทข้อมูล `LatLong` และการดึงพิกัดปัจจุบันอัตโนมัติด้วยฟังก์ชัน `=HERE()`
- **Deep Linking Pattern:** การสร้าง Action เชื่อมโยงข้ามแอปพลิเคชันเพื่อส่งต่อพิกัดไปยังแอปพลิเคชันเนวิเกชันภายนอก (Google Maps / Apple Maps) ผ่าน URL Scheme มาตรฐาน
- **Geotagged Proof-of-Delivery Pattern:** การประทับตราพิกัดดาวเทียมคู่กับเวลาตอนส่งของ เพื่อเป็นหลักฐานว่าพนักงานจัดส่งได้เดินทางไปถึงสถานที่จริง

## Acceptance Criteria
- [x] กำหนดคอลัมน์ประเภท LatLong และทดสอบบันทึกพิกัดจริงผ่าน GPS สมาร์ตโฟน
- [x] สร้างมุมมอง Map View แสดงจุดปักหมุดของร้านค้าและลูกค้าได้อย่างแม่นยำ
- [x] สร้างปุ่ม Action สำหรับกดเปิด Google Maps เพื่อเริ่มระบบนำทางเลี้ยวต่อเลี้ยว (Turn-by-turn Navigation)
- [x] ครอบคลุมระบบแผนที่และพิกัดของทั้ง 3 รูปแบบธุรกิจ (Archetypes)
- [x] มีแบบตรวจสอบตนเอง (Self-Checklist) และเกณฑ์การประเมิน 10 คะแนน (Rubric)
