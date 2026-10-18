# AI Agent Guidelines & UI Development Rules: Red Broadcast

เอกสารฉบับนี้เป็นข้อตกลงและ **กฎเหล็ก (Ironclad Rules)** สูงสุดสำหรับ AI Agent ในการเขียนโค้ดและพัฒนาส่วนติดต่อผู้ใช้งาน (UI) ทุกส่วนในโปรเจกต์นี้ เพื่อให้คุณภาพโค้ด ดีไซน์ และสถาปัตยกรรมของระบบเป็นมาตรฐานเดียวกัน 100%

---

## 1. กฎเหล็กข้อที่ 1: Strict Token-First Policy (ต้องใช้ Design Tokens เท่านั้น)

ทุกการกำหนดสไตล์ เลย์เอาต์ และการแสดงผล UI **ต้องอ้างอิงค่าจาก Design Tokens ที่กำหนดไว้ในโปรเจกต์เท่านั้น** โดยอิงจากไฟล์ในโฟลเดอร์นี้:
- **CSS Variables**: `tokens.css` (ใช้ `var(--token-name)`)
- **Tailwind Config**: `tailwind.config.js` (ใช้ Utility classes ที่แมปไว้ เช่น `bg-primary`, `text-text-primary`, `rounded-lg`)
- **TypeScript / React / React Native**: `theme.ts` (Import จาก `theme`, `colors`, `typography`, `spacing`, `borderRadius`, `shadows`)

### ตารางการแมปและใช้งาน:
| ประเภทสไตล์ | รูปแบบใน CSS | รูปแบบใน Tailwind | รูปแบบใน TypeScript (`theme.ts`) |
| :--- | :--- | :--- | :--- |
| **สีหลัก (Primary)** | `var(--color-primary)` | `bg-primary` / `text-primary` | `colors.primary.default` |
| **สีข้อความหลัก** | `var(--color-text-primary)` | `text-text-primary` | `colors.text.primary` |
| **สีพื้นหลังการ์ด/Chip** | `var(--color-surface)` | `bg-surface` | `colors.surface.default` |
| **ช่องไฟพื้นฐาน (8px)** | `var(--space-1)` | `p-1`, `gap-1`, `m-1` | `spacing.scale['1']` |
| **ความโค้ง Thumbnail (12px)** | `var(--radius-lg)` | `rounded-lg` | `borderRadius.lg` |
| **ความโค้งปุ่ม/Pill (Full)** | `var(--radius-full)` | `rounded-full` | `borderRadius.full` |
| **เงา Dropdown (Level 2)** | `var(--elevation-2)` | `shadow-elevation-2` | `shadows.elevation2` |

---

## 2. กฎเหล็กข้อที่ 2: Zero Hardcoding Policy (ห้าม Hardcode เด็ดขาด)

- ❌ **ห้ามระบุค่าสีแบบ Hardcode ลอย ๆ โดยเด็ดขาด**:
  - ตัวอย่างที่ผิด: `color: #2563EB;`, `background-color: #000;`, `border: 1px solid #d1d5db;`
  - ตัวอย่างที่ถูก: `color: var(--color-secondary);`, `background: var(--color-text-primary);`, `border: 1px solid var(--color-border);`
- ❌ **ห้ามกำหนดขนาดช่องไฟหรือความกว้างยาวตามอำเภอใจ**:
  - ตัวอย่างที่ผิด: `margin: 15px;`, `padding: 13px 21px;`, `gap: 17px;`
  - ตัวอย่างที่ถูก: อิงตามสเกล 8px (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`)
- ❌ **ห้ามตั้งค่า Box-Shadow หรือ Font-Size ขึ้นมาเอง**: ต้องเลือกจากระดับ Elevation (0, 1, 2, 3) และ Type Scale ที่กำหนดไว้ใน `design.md` เท่านั้น

---

## 3. กฎเหล็กข้อที่ 3: Stop & Confirm on Token Gaps (ห้ามคิดสไตล์ใหม่ขึ้นมาเอง)

หากมีสถานการณ์ใด ๆ ที่จำเป็นต้องใช้สไตล์, สี, ขนาด, หรือพฤติกรรม UI ที่ **ไม่มีอยู่ใน `design.md` หรือไฟล์ Tokens**:
1. **ห้ามแต่งเติมหรือคิดค่าขึ้นมาเองโดยพลการ**
2. **ต้องหยุดการเขียนโค้ดชั่วคราว (Pause Execution)**
3. **แจ้งช่องว่าง (Token Gap) และสอบถามยืนยันกับผู้ใช้งาน (User) เสมอ** โดยระบุ:
   - ชิ้นส่วน UI ที่ต้องการสไตล์ใหม่
   - เหตุผลที่ Tokens ปัจจุบันไม่รองรับ
   - ทางเลือกที่เป็นไปได้ เพื่อให้ผู้ใช้งานตัดสินใจอนุมัติก่อนบรรจุเข้าสู่ Design System

---

## 4. กฎเหล็กข้อที่ 4: Reusable Component Architecture & Accessibility (a11y)

### 4.1 Reusable & Atomic Component
- ต้องแยกชิ้นส่วน UI ออกเป็น Component ย่อยที่นำกลับมาใช้ซ้ำได้ง่าย เช่น:
  - `Button` (Primary dark subscribe, Secondary chip, Outlined, Icon-only)
  - `VideoCard` (Thumbnail 16:9, Avatar, 2-line clamped title, Metadata dot separator)
  - `Badge` (Duration tag, Verified badge, Live indicator)
  - `Chip` (Filter pill, Active/Inactive state)
  - `SearchInput` (Flat bottom border, Attached search button)
- ใช้หลักการ **Single Responsibility Principle** และ Component Composition หลีกเลี่ยงโค้ดที่ผูกติดหน้าจอแบบ Monolithic

### 4.2 Accessibility (a11y) พื้นฐานที่ต้องมีเสมอ
1. **Semantic HTML**: ใช้แท็กที่มีความหมาย เช่น `<button>`, `<nav>`, `<header>`, `<main>`, `<article>`, `<section>` แทน `<div>` ในการคลิกหรือสร้างเค้าโครง
2. **Icon-only Buttons**: ปุ่มที่มีเฉพาะไอคอน (เช่น ปุ่มค้นหา, ปุ่มไมโครโฟน, ปุ่มกระดิ่งแจ้งเตือน) **ต้องใส่ `aria-label` เสมอ**:
   ```html
   <!-- ถูกต้อง -->
   <button aria-label="ค้นหา" class="...">
     <svg aria-hidden="true" ...></svg>
   </button>
   ```
3. **Image Alt Text**: รูปภาพและภาพขนาดย่อ (Thumbnail) ต้องมีแอตทริบิวต์ `alt` ที่อธิบายเนื้อหาอย่างชัดเจน
4. **Keyboard Focus & States**: ต้องรองรับการนำทางด้วยคีย์บอร์ด โดยมี `:focus-visible` ชัดเจน ไม่ลบ `outline` ทิ้งลอย ๆ
5. **Text Clamping**: ชื่อวิดีโอบน Grid ต้องจำกัดไม่เกิน 2 บรรทัด (`-webkit-line-clamp: 2`) พร้อมระบุ `title="..."` เพื่อให้ผู้ใช้ Screen Reader หรือเมาส์ Hover อ่านชื่อเต็มได้

---

## 5. กฎเฉพาะสำหรับ Red Broadcast UI (Content-First Principles)

1. **Thumbnail Dominance**: การ์ดวิดีโอต้องไม่มีเส้นขอบและไม่มีเงา ให้ Thumbnail ขนาดอัตราส่วน 16:9 เด่นที่สุดบนพื้นหลัง
2. **Red Usage**: สีแดง `#FF0000` (Broadcast Red) อนุญาตให้ใช้เฉพาะกับ **ปุ่ม Subscribe, Live Badges, Progress Bars และ Error state** เท่านั้น ห้ามนำไปใช้เป็นสีพื้นหลังทั่วไป
3. **Metadata Format**: รูปแบบข้อความรองต้องใช้ฟอร์แมตกระชับ `ชื่อช่อง • การดู ... ครั้ง • ... ที่ผ่านมา` โดยใช้สี `var(--color-text-secondary)` ขนาด `12px`

---

## 6. Karpathy Behavioral Principles (หลักปฏิบัติการเขียนโค้ด 4 ข้อ)

ยึดตามข้อสังเกตและแนวทางของ Andrej Karpathy เพื่อลดข้อผิดพลาดทั่วไปของ AI:

### 6.1 Think Before Coding (คิดและแจกแจงก่อนลงมือ)
- **ไม่เดาใจ ไม่ซ่อนข้อสงสัย**: ระบุสมมติฐานอย่างชัดเจน หากมีทางเลือกหลายทางหรือโจทย์ไม่ชัดเจน ต้องหยุดถามผู้ใช้เสมอ ห้ามเลือกเองเงียบ ๆ
- **เสนอทางที่ง่ายกว่า**: หากพบวิธีแก้ปัญหาที่เรียบง่ายและปลอดภัยกว่า ให้ทักท้วงและนำเสนอทันทีก่อนลงมือ

### 6.2 Simplicity First (เน้นความเรียบง่าย ไม่สร้างส่วนเกิน)
- **เขียนโค้ดน้อยที่สุดที่แก้ปัญหาได้**: ไม่สร้างฟีเจอร์หรือ Abstraction ล่วงหน้าสำหรับการใช้งานครั้งเดียว (No premature abstractions)
- **หลีกเลี่ยงความยืดหยุ่นเกินจำเป็น**: ไม่เพิ่ม Config หรือ Parameter ที่ผู้ใช้ไม่ได้ร้องขอ หากโค้ด 50 บรรทัดแก้ปัญหาได้ ห้ามเขียน 200 บรรทัด

### 6.3 Surgical Changes (แก้ไขตรงจุดแบบผ่าตัด)
- **แตะเฉพาะจุดที่จำเป็น**: ไม่แตะต้อง ไม่จัดฟอร์แมตใหม่ หรือ "ปรับปรุง" โค้ดรอบข้างที่ไม่เกี่ยวกับงานที่ได้รับมอบหมาย
- **ทำความสะอาดเฉพาะสิ่งที่ตนเองสร้าง**: ลบเฉพาะ Imports / Variables ที่ไม่ได้ใช้ซึ่งเกิดจากการแก้ของตนเองเท่านั้น ไม่ลบ Dead code เดิมที่มีอยู่ก่อนเว้นแต่ได้รับคำสั่ง

### 6.4 Goal-Driven Execution (ขับเคลื่อนด้วยเป้าหมายที่ตรวจวัดได้)
- กำหนดเกณฑ์ความสำเร็จ (Success Criteria) ที่ตรวจสอบได้จริงก่อนเริ่มเขียนโค้ด
- ตรวจสอบความถูกต้องและทดสอบซ้ำจนมั่นใจว่าผ่านเกณฑ์อย่างสมบูรณ์

---

## Checklist ก่อนส่งมอบโค้ด UI ทุกครั้ง (AI Pre-flight Checklist)
- [ ] มีการ Hardcode สีด้วยรหัสสีลอย ๆ หรือไม่? (ต้องไม่มี)
- [ ] Spacing และ Padding ทุกจุดตรงตามสเกล 8px หรือไม่?
- [ ] มีการสร้าง Component ย่อยที่ Reusable หรือไม่?
- [ ] ปุ่มทุกปุ่มและไอคอนที่กดได้มี Accessible Label หรือไม่?
- [ ] สไตล์ทั้งหมดเชื่อมโยงกับ `tokens.css` / `tailwind.config.js` / `theme.ts` แล้วหรือไม่?
- [ ] โค้ดตรงประเด็นและเรียบง่ายที่สุด ไม่เขียนฟีเจอร์เกินที่ขอ? (Simplicity First)
- [ ] แก้ไขเฉพาะจุดที่เกี่ยวข้อง ไม่แตะต้องโค้ดข้างเคียงโดยไม่จำเป็น? (Surgical Changes)
