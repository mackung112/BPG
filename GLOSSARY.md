# Exam System (ระบบการสอบ)

บริบทสำหรับการจัดการห้องสอบ การควบคุมการสอบแบบเรียลไทม์ การทำข้อสอบของนักเรียน และการประมวลผลคะแนนอย่างปลอดภัย

## Language

**Exam Session**:
ช่วงเวลาและห้องสอบที่ครูสร้างขึ้นเพื่อให้นักเรียนเข้ามาทำข้อสอบตามกำหนดการและกติกา
_Avoid_: Test instance, quiz room, exam class

**Exam Participant**:
นักเรียนที่เข้าร่วมใน Exam Session นั้นๆ พร้อมข้อมูลสถานะการสอบ (กำลังสอบ, ส่งแล้ว, หรือขอสอบใหม่)
_Avoid_: Examinee, test taker, student session

**Draft Answers**:
ชุดคำตอบที่นักเรียนเลือกไว้ชั่วคราวระหว่างยังไม่กดส่งข้อสอบ ซึ่งถูกซิงก์เพื่อป้องกันข้อมูลสูญหาย
_Avoid_: Temporary answers, exam state, cache

**Server-Side Grading**:
การตรวจให้คะแนนและเปรียบเทียบคำตอบที่เซิร์ฟเวอร์ (Database RPC) โดยไม่มีการส่งเฉลยมายังเครื่องนักเรียน
_Avoid_: Client grading, frontend scoring

**Anti-Cheat Strike**:
ระบบนับครั้งการแจ้งเตือนพฤติกรรมน่าสงสัยระหว่างสอบ (เช่น สลับหน้าจอ หลุดจากโหมดเต็มจอ) แบบขั้นบันไดก่อนส่งคำขอปลดล็อกให้ครู
_Avoid_: Violation count, cheat penalty, warning flag

**Server-Authoritative Timer**:
การนับเวลาสอบที่คำนวณจากเวลาเริ่มต้นและระยะเวลาบนเซิร์ฟเวอร์เป็นหลัก เพื่อป้องกันการยื้อเวลาผ่านการปรับนาฬิกาของเครื่องไคลเอนต์
_Avoid_: Client timer, countdown hook, local clock

**Question Palette**:
แผงตารางแสดงหมายเลขข้อสอบทั้งหมด แสดงสถานะ (ตอบแล้ว, ยังไม่ตอบ, ปักธงทบทวน) และใช้คลิกเพื่อกระโดดไปยังข้อนั้นๆ ได้ทันที
_Avoid_: Question navigator, question buttons, index list

**Exam Mode**:
การตั้งค่าการเปิดเผยผลสอบใน Exam Session แบ่งเป็น Official Exam (ซ่อนเฉลยจนกว่าครูจะสั่งเปิด) และ Practice Quiz (เฉลยทันทีหลังส่ง)
_Avoid_: Test type, scoring mode

**Teacher Broadcast**:
ข้อความประกาศฉุกเฉินจากครูผู้คุมสอบที่ส่งผ่าน Realtime ไปปรากฏบนหน้าจอของผู้เข้าสอบทุกคนในห้องสอบพร้อมกันทันที
_Avoid_: Admin announcement, alert popup, system notification

**Suspension Resolution**:
การตัดสินใจของครูผู้คุมสอบในการเลือก "อนุญาตให้สอบต่อ (Resume)" หรือ "ตรวจและยุติการสอบทันที (Force Submit)" เมื่อผู้เข้าสอบติด Strike ครบกำหนด
_Avoid_: Unlock student, strike reset, violation penalty

**Device-Adaptive Anti-Cheat**:
การปรับระดับการตรวจจับพฤติกรรมผิดปกติให้สอดคล้องกับขีดจำกัดของแต่ละอุปกรณ์ (เช่น ปิดการบังคับ Fullscreen บนอุปกรณ์ iOS เพื่อป้องกันการแจ้งเตือนผิดพลาด)
_Avoid_: Mobile cheat filter, device blocker

**Question Drawer**:
แผงผังข้อสอบแบบแผ่นเลื่อนด้านล่าง (Bottom Sheet / Drawer) สำหรับอุปกรณ์พกพา เพื่อไม่ให้บดบังพื้นที่อ่านโจทย์
_Avoid_: Mobile palette, popup question list

**Seeded Randomization (การสุ่มแบบล็อกผลเฉพาะบุคคล)**:
อัลกอริทึมการสลับลำดับข้อสอบและตัวเลือกโดยใช้ Seed คงที่ (Session ID + Student ID) เพื่อให้นักเรียนแต่ละคนได้ชุดข้อสอบและตัวเลือกที่สลับลำดับไม่ซ้ำกัน แต่เมื่อรีเฟรชหน้าจอหรือหลุดการเชื่อมต่อ ลำดับข้อและตัวเลือกจะคงเดิม 100% ไม่เลื่อนหลุด
_Avoid_: Random shuffle, pure shuffle, dynamic random

**Per-Attempt Timer (ตัวจับเวลารายรอบการสอบ)**:
การคำนวณเวลานับถอยหลังของนักเรียนที่อิงตามเวลาเริ่มต้นของแต่ละรอบการสอบจริง (`started_at` ของนักเรียน) ผสานกับการปรับเวลาเพิ่มแบบเรียลไทม์จากครูผู้สอน ป้องกันปัญหาเวลาติดลบหรือเด้งส่งอัตโนมัติจากการผูกกับเวลาห้องสอบรวม
_Avoid_: Session-locked timer, global clock

**Attempt Quota (โควตาจำนวนครั้งในการสอบ)**:
จำนวนครั้งสูงสุด (`max_attempts`) ที่ผู้เข้าสอบสามารถทำข้อสอบใน Exam Session นั้นๆ ได้ ทั้งในโหมด Onsite และ Online พร้อมรองรับการสอบซ่อม (Retake) จนกว่าจะผ่านเกณฑ์
_Avoid_: Retake count, exam limit
