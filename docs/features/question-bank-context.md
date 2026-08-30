# 📚 Question Bank System — Context Document

> **อัปเดตล่าสุด:** 2026-08-30  
> **อ้างอิงจากไฟล์:** `QuestionBank.jsx`, `QuestionPicker.jsx`

---

## 1. ภาพรวมระบบ

ระบบคลังข้อสอบประกอบด้วย **2 ส่วน** ที่ทำงานร่วมกัน:

| ส่วน | ไฟล์ | Route | ผู้ใช้ |
|---|---|---|---|
| **จัดการคลังข้อสอบ** | `src/pages/admin/QuestionBank.jsx` | `/admin/question-bank` | ครู (Admin) |
| **เลือกข้อสอบเข้าห้อง** | `src/pages/admin/QuestionPicker.jsx` | Modal (เรียกจาก ExamControl) | ครู (Admin) |

---

## 2. Database Tables ที่เกี่ยวข้อง

### 2.1 `question_banks` (คลังข้อสอบ)
| Column | Type | หมายเหตุ |
|---|---|---|
| `id` | uuid PK | |
| `title` | text | ชื่อคลังข้อสอบ |
| `created_by` | uuid FK → auth.users | ครูที่สร้าง |
| `created_at` | timestamptz | |

### 2.2 `questions` (ข้อสอบ)
| Column | Type | หมายเหตุ |
|---|---|---|
| `id` | uuid PK | |
| `bank_id` | uuid FK → question_banks | คลังที่ข้อนี้สังกัด |
| `question_text` | text | โจทย์คำถาม |
| `choices` | jsonb | array ของ `{ text: string, is_correct: boolean }` |
| `correct_answer_index` | int | index ของตัวเลือกที่ถูก (0-based) |
| `created_at` | timestamptz | |

> ⚠️ **หมายเหตุสำคัญ:** ข้อมูลตัวเลือก (choices) เก็บใน JSON array โดย `is_correct` และ `correct_answer_index` ต้องสอดคล้องกันเสมอ

---

## 3. CRUD Operations (QuestionBank.jsx)

### 3.1 คลังข้อสอบ (question_banks)
| Action | Function | DB Operation |
|---|---|---|
| โหลดคลังทั้งหมด | `fetchBanks()` | SELECT * ORDER BY created_at DESC |
| สร้างคลังใหม่ | `handleCreateBank()` | INSERT + auto-select คลังใหม่ |
| แก้ไขชื่อคลัง | `handleUpdateBank()` | UPDATE title WHERE id |
| ลบคลัง | `handleConfirmDeleteBank()` | DELETE WHERE id (cascade ลบข้อสอบทั้งหมดในคลัง) |

### 3.2 ข้อสอบ (questions)
| Action | Function | DB Operation |
|---|---|---|
| โหลดข้อสอบในคลัง | `fetchQuestions(bankId)` | SELECT * WHERE bank_id ORDER BY created_at ASC |
| สร้างข้อสอบทีละข้อ | `handleSaveSingleQuestion()` | INSERT 1 row |
| แก้ไขข้อสอบ | `handleUpdateQuestion()` | UPDATE question_text, choices, correct_answer_index |
| ลบข้อสอบ | `handleConfirmDeleteQuestion()` | DELETE WHERE id |
| นำเข้าจาก GIFT | `handleImportText()` | INSERT หลาย rows พร้อมกัน |

---

## 4. รูปแบบ GIFT Format (การนำเข้าข้อสอบจำนวนมาก)

ระบบรองรับการนำเข้าข้อสอบผ่านรูปแบบ GIFT (Moodle standard) ที่ดัดแปลง:

```
// นี่คือ comment (ถูกตัดทิ้งก่อน parse)
โจทย์คำถาม?{
=ตัวเลือกที่ถูกต้อง
~ตัวเลือกผิด 1
~ตัวเลือกผิด 2
~ตัวเลือกผิด 3
}
```

**กฎการ Parse (`parseQuestions()`):**
- `=` นำหน้า = ตัวเลือกถูกต้อง
- `~` นำหน้า = ตัวเลือกผิด
- `//` = comment (ไม่ถูก parse)
- `\=`, `\~`, `\{`, `\}` = Escape characters (แสดงตัวอักษรนั้นตรงๆ)
- Regex pattern: `/([^{]+)\{([^}]+)\}/g`

**Validation ก่อน Import:**
1. ต้องมีโจทย์ข้อสอบ (qText)
2. ต้องมีตัวเลือกที่กรอกแล้วอย่างน้อย 2 ข้อ
3. ต้องมีตัวเลือกถูก (`=`) อย่างน้อย 1 ข้อ

---

## 5. Export CSV

ระบบรองรับ Export ข้อสอบออกเป็น CSV ผ่าน `handleExportCSV()`:
- Format: `Question, Choice A, Choice B, Choice C, Choice D, Correct Answer`
- ดาวน์โหลดเป็นไฟล์ `question_bank_{bankTitle}.csv`

---

## 6. QuestionPicker (Modal เลือกข้อสอบเข้าห้องสอบ)

**เรียกจาก:** `ExamControl.jsx` → ปุ่ม "เลือกข้อสอบ"

**การทำงาน:**
1. โหลดคลังข้อสอบทั้งหมดขึ้นมาให้ครูเลือก
2. ครูเลือกคลัง → กำหนดจำนวนข้อที่ต้องการสุ่ม (question_count)
3. กำหนดคะแนนต่อข้อ (points_per_question)
4. กด Save → ส่ง config ผ่าน `onSave(config)` callback กลับไปให้ ExamControl
5. ExamControl นำ config นี้ไปใช้ตอนสร้างห้องสอบ (`exam_sessions` + `exam_session_questions`)

**Config Object ที่ส่งกลับ:**
```js
{
  bankId: string,         // id ของคลังที่เลือก
  bankTitle: string,      // ชื่อคลัง (แสดงใน UI)
  questionCount: number,  // จำนวนข้อที่สุ่มออกมา
  pointsPerQuestion: number // คะแนนต่อข้อ
}
```

---

## 7. ความสัมพันธ์กับระบบสอบ

```
question_banks (คลัง)
    │
    └── questions (ข้อสอบทั้งหมดในคลัง)
            │
            └── exam_session_questions (ข้อสอบที่ถูกสุ่มเข้าห้องสอบนั้นๆ)
                    │
                    └── exam_sessions (ห้องสอบ)
```

**ตอนสร้างห้องสอบ:**
- ระบบดึงข้อสอบจาก `questions` WHERE `bank_id = selected`
- สุ่ม (shuffle) ตามจำนวน `question_count`
- Insert ลง `exam_session_questions` พร้อม `points` และ `order_index`
- ข้อสอบใน `exam_session_questions` จะไม่เปลี่ยนแม้คลังต้นฉบับจะถูกแก้ไขภายหลัง

---

## 8. Known Issues / Technical Debt

1. **ไฟล์ใหญ่:** QuestionBank.jsx (~900 บรรทัด) รวม CRUD + GIFT Parser + UI ไว้ด้วยกัน
2. **Parser ฝั่ง Client:** Logic การ parse GIFT format อยู่ใน Component โดยตรง ควรย้ายไป `src/utils/giftParser.js`
3. **ไม่มี Pagination:** ถ้าคลังมีข้อสอบเกิน 500 ข้อ หน้าเว็บจะหนักมาก
4. **ไม่มี Tag/Category:** ข้อสอบไม่มีหมวดหมู่ย่อย ทำให้การสุ่มทำได้แค่ระดับ "ทั้งคลัง" เท่านั้น
