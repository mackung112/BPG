# 08: Multi-Table Relations (Ref) & Calculation Formulas

**What to build:** การสร้างความสัมพันธ์ระหว่างตารางแบบเชื่อมโยงหลายตาราง (Parent-Child Relations ด้วยประเภท Ref) การเขียนสูตรคำนวณราคารวมอัตโนมัติ `[Quantity] * [Unit_Price]` การสรุปยอดรวมในใบสั่งซื้อ (Rollup Summaries) และการสร้างระบบสั่งซื้อแบบตะกร้าสินค้า

**Blocked by:** 07: Mobile Forms, Column Types, & Input Validation

**Status:** resolved

## Engineering & Architecture Patterns
- **Relational Integrity & Foreign Key Pattern:** การเชื่อมโยง Foreign Key ผ่านประเภทข้อมูล `Ref` และการตั้งค่า `IsPartOf = TRUE` เพื่อสร้างความสัมพันธ์แบบ Parent-Child (ทำให้สามารถเพิ่ม/ลบรายการสินค้าในบิลสั่งซื้อได้โดยตรงจากหน้าฟอร์มใบสั่งซื้อ)
- **Computed Column & Dereference Pattern:** การดึงข้อมูลข้ามตารางอัตโนมัติด้วย Dereference Expression เช่น `[Product_ID].[Unit_Price]` และการคำนวณมูลค่ารวมรายการสินค้า `[Quantity] * [Unit_Price]` แบบเรียลไทม์
- **Rollup Aggregation Pattern:** การรวบรวมและสรุปข้อมูลสถิติจากตารางลูกขึ้นสู่ตารางแม่ เช่น ยอดรวมทั้งสิ้นด้วยสูตร `SUM([Related Order_Details][Subtotal])` หรือจำนวนรายการด้วย `COUNT()`

## Acceptance Criteria
- [x] อธิบายและผูกความสัมพันธ์ตารางแม่-ลูก (Parent-Child) ด้วยประเภท Ref ได้ถูกต้อง
- [x] สร้างฟอร์มสั่งซื้อที่ดึงข้อมูลสินค้าและราคามาแสดงผลอัตโนมัติ
- [x] เขียนสูตรคำนวณเงิน Subtotal และสูตรหาผลรวม `SUM()` สรุปยอดเงินรวมแม่นยำ
- [x] ครอบคลุมการคำนวณของทั้ง 3 รูปแบบธุรกิจ (Archetypes)
- [x] มีแบบตรวจสอบตนเอง (Self-Checklist) และเกณฑ์การประเมิน 10 คะแนน (Rubric)
