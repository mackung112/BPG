# 📋 Exam System — Full Context Document

> **สถานะ:** เอกสารอ้างอิง (Living Document)
> **อัปเดตล่าสุด:** 2026-08-30
> **วัตถุประสงค์:** ให้ AI Agent อ่านเป็นบริบทก่อนแก้ไขโค้ดระบบสอบ เพื่อป้องกันการแก้ไขที่ทำให้ Logic เดิมพัง

---

## 1. ภาพรวมระบบ (System Overview)

ระบบสอบออนไลน์ประกอบด้วย **5 หน้าจอหลัก** ที่ทำงานประสานกันแบบ Real-time ผ่าน Supabase Realtime (Postgres Changes):

| หน้าจอ | ไฟล์ | Route | ผู้ใช้ | บรรทัด |
|---|---|---|---|---|
| **Exam Control** (แผงควบคุม) | `src/pages/admin/ExamControl.jsx` | `/admin/exam-control` | ครู (Admin) | ~1,441 |
| **Exam Results** (สรุปคะแนน) | `src/pages/admin/ExamResults.jsx` | `/admin/exam-results` | ครู (Admin) | ~1,191 |
| **Exam Lobby** (ห้องรอสอบ) | `src/pages/exam/ExamLobby.jsx` | `/exam-lobby/:sessionId` | นักเรียน | ~315 |
| **Exam Room** (ห้องสอบ) | `src/pages/exam/ExamRoom.jsx` | `/exam-room/:sessionId` | นักเรียน | ~1,202 |
| **Exam Result** (ผลสอบรายคน) | `src/pages/exam/ExamResult.jsx` | `/exam-result/:sessionId` | นักเรียน | ~361 |

**คอมโพเนนต์เสริม:**
- `src/pages/admin/QuestionPicker.jsx` — Modal เลือกชุดข้อสอบ (เรียกจาก ExamControl)

---

## 2. Database Tables ที่เกี่ยวข้อง

### 2.1 `exam_sessions` (ห้องสอบ)
| Column | Type | หมายเหตุ |
|---|---|---|
| `id` | uuid PK | |
| `bank_id` | uuid FK → question_banks | |
| `created_by` / `teacher_id` | uuid | ครูที่สร้างห้อง |
| `title` | text | ชื่อการสอบ |
| `secret_code` | text | รหัส 6 ตัวอักษร (auto-gen) |
| `time_limit_minutes` | int | เวลาสอบ (นาที) |
| `exam_mode` | text | `'onsite'` หรือ `'online'` |
| `max_attempts` | int | จำนวนครั้งสูงสุด (ใช้เฉพาะ online) |
| `retake_until_pass` | bool | สอบซ่อมจนกว่าจะผ่าน |
| `passing_percentage` | int | เกณฑ์ผ่าน (%) |
| `question_count` | int | จำนวนข้อที่สุ่มออกมา |
| `total_score` | numeric | คะแนนเต็ม |
| `status` | text | `'waiting'` → `'active'` → `'completed'` |
| `started_at` | timestamptz | เวลาเริ่มสอบ (ครูกด Start) |
| `end_time` | timestamptz | เวลาจบสอบ |
| `created_at` | timestamptz | |

### 2.2 `exam_session_questions` (ข้อสอบในห้อง)
| Column | Type | หมายเหตุ |
|---|---|---|
| `session_id` | uuid FK | |
| `question_id` | uuid FK → questions | |
| `points` | numeric | คะแนนต่อข้อ |
| `order_index` | int | ลำดับข้อ |

### 2.3 `exam_participants` (ผู้เข้าสอบ)
| Column | Type | หมายเหตุ |
|---|---|---|
| `id` | uuid PK | |
| `session_id` | uuid FK | |
| `student_id` | text FK → students | |
| `status` | text | `'waiting'` / `'testing'` / `'completed'` / `'cheating'` / `'disconnected'` |
| `allow_rejoin` | bool | ครูอนุมัติให้กลับเข้าสอบ |
| `rejoin_mode` | text | `'continue'` (ทำต่อ) / `'restart'` (เริ่มใหม่) |
| `saved_exam_state` | jsonb | เก็บ { questions, answers, flagged, timeLeft, attemptNumber } |
| `is_retake` | bool | เป็นการสอบซ่อมหรือไม่ |
| `attempt_count` | int | จำนวนครั้งที่สอบแล้ว |
| `warnings_count` | int | จำนวนครั้งที่ถูกเตือน (anti-cheat) |
| `retake_requested` | bool | นักเรียนกดขอสอบซ่อม |
| `retake_requested_at` | timestamptz | |
| `started_at` | timestamptz | เวลาที่นักเรียนเริ่มทำ (ใช้กับ online/retake) |
| `joined_at` | timestamptz | |

### 2.4 `exam_results` (ผลคะแนน)
| Column | Type | หมายเหตุ |
|---|---|---|
| `id` | uuid PK | |
| `session_id` | uuid FK | |
| `student_id` | text FK | |
| `score` | numeric | คะแนนที่ได้ |
| `total_questions` | int | |
| `attempt_number` | int | รอบที่เท่าไหร่ |
| `is_retake` | bool | |
| `is_suspended` | bool | คะแนนถูกระงับ (เกิดจากทุจริต) |
| `started_at` | timestamptz | |
| `submitted_at` | timestamptz | |
| `note` | text | บันทึกเพิ่มเติม |

---

## 3. State Machine — สถานะห้องสอบ (Session Status)

```
                    ครูกด "เริ่มสอบ"                  ครูกด "จบสอบ"
  ┌──────────┐  ──────────────────►  ┌──────────┐  ──────────────►  ┌──────────────┐
  │ waiting  │                       │  active  │                   │  completed   │
  └──────────┘                       └──────────┘                   └──────────────┘
       │                                  ▲                               │
       │                                  │    ครูกด "เปิดสอบอีกครั้ง"     │
       │                                  └───────────────────────────────┘
       │
       └── (online mode: สร้างเป็น active ทันที)
```

---

## 4. State Machine — สถานะผู้เข้าสอบ (Participant Status)

```
  ┌──────────┐  session=active   ┌──────────┐  กดส่ง/หมดเวลา   ┌──────────────┐
  │ waiting  │ ────────────────► │ testing  │ ────────────────► │  completed   │
  └──────────┘                   └──────────┘                   └──────────────┘
       ▲                              │                               │
       │                              │ สลับแท็บ > 3 ครั้ง            │
       │                              ▼                               │
       │                         ┌──────────┐                         │
       │   ครูกด allow_rejoin    │ cheating │                         │
       └─────────────────────────┤          │                         │
                                 └──────────┘                         │
                                                                      │
                                 ┌──────────────┐   ครูกดอนุมัติ      │
                                 │ disconnected │ ──────────────► waiting
                                 └──────────────┘
```

---

## 5. Interaction Flow (ครูกดอะไร → ส่งผลอะไรต่อนักเรียน)

### 5.1 ครูกด "เริ่มสอบ" (Start Exam)
- **DB:** `exam_sessions.status` = `'active'`, `started_at` = now()
- **Realtime Channel:** `lobby_session_{sessionId}` → event UPDATE
- **ฝั่งนักเรียน (Lobby):** ตรวจจับ `payload.new.status === 'active'` → `navigate('/exam-room/{sessionId}')`
- **ผลลัพธ์:** นักเรียนทุกคนที่รออยู่ใน Lobby จะถูกเด้งเข้า ExamRoom ทันที

### 5.2 ครูกด "เพิ่มเวลาสอบ" (+5/+10/+15 นาที หรือ Custom)
- **DB:** `exam_sessions.time_limit_minutes` = newValue
- **Realtime Channel:** `session_update_{sessionId}` → event UPDATE
- **ฝั่งนักเรียน (ExamRoom):** ตรวจจับ `payload.new.time_limit_minutes` → คำนวณ remaining ใหม่ → `setTimeLeft(remaining)` + แสดง Toast

### 5.3 ครูกด "จบการสอบ" (End Exam)
- **DB:** `exam_sessions.status` = `'completed'`, `end_time` = now()
- **ฝั่งนักเรียน (ExamRoom):** ตรวจจับ `payload.new.status === 'completed'` → Auto-submit (บังคับส่งข้อสอบ) → navigate ไป ExamResult
- **ข้อยกเว้น:** ถ้านักเรียนอยู่ในโหมดสอบซ่อม (`isRetakeMode = true`) จะ **ไม่ถูก auto-submit** (ให้ยึดเวลาของตัวเอง)

### 5.4 ระบบ Anti-Cheat ตรวจจับทุจริต (นักเรียนสลับแท็บ)
- **โหมด Onsite:** เตือน 3 ครั้ง → ครั้งที่ 4 ระงับทันที (status = `'cheating'`)
- **โหมด Online:** เตือน 2 ครั้ง → ครั้งที่ 3 บังคับ auto-submit (ไม่เตะออก แต่ส่งข้อสอบ)
- **เมื่อถูกระงับ (Onsite):**
  1. บันทึกคะแนนปัจจุบันลง `exam_results` (is_suspended = true)
  2. บันทึก state ทั้งหมด (answers, flagged, timeLeft) ลง `exam_participants.saved_exam_state`
  3. อัปเดต status เป็น `'cheating'`
  4. เด้งนักเรียนกลับไป ExamLobby (แสดงหน้าจอสีแดง "ถูกระงับ")

### 5.5 ครูกด "อนุมัติกลับเข้าสอบ" (Allow Rejoin)
- **ตัวเลือก A — Continue (แก้ข้อสอบเดิม):**
  - DB: `rejoin_mode = 'continue'`, `status = 'waiting'`, `allow_rejoin = true`
  - ฝั่งนักเรียน: กลับเข้า ExamRoom → โหลดจาก `saved_exam_state` → คืนค่าคำตอบเดิม + เวลาเดิม
  - ลบ suspended result → เคลียร์ saved_exam_state
- **ตัวเลือก B — Restart (เริ่มทำใหม่):**
  - DB: `rejoin_mode = 'restart'`, `status = 'waiting'`, `allow_rejoin = true`
  - ฝั่งนักเรียน: กลับเข้า ExamRoom → สุ่มข้อสอบใหม่ทั้งชุด + รีเซ็ตเวลา
  - ลบ suspended result → เคลียร์ saved_exam_state

### 5.6 ครูกด "ลบนักเรียนออก" (Delete Participant)
- **DB:** ลบ `exam_results` ของนักเรียนคนนั้น → ลบ `exam_participants`
- **ฝั่งนักเรียน:** ในรอบ Polling ถัดไป ระบบจะจับได้ว่า participant ไม่มีแล้ว → เตะไป Login

### 5.7 ครูกด "เปิดสอบอีกครั้ง" (Reopen Exam)
- **DB:** `status = 'active'`, `started_at = now()`, `end_time = null`, `time_limit_minutes = newValue`
- **ผลลัพธ์:** นักเรียนที่ได้รับสิทธิ์สอบซ่อม (allow_rejoin = true) สามารถเข้าทำข้อสอบได้

---

## 6. ระบบสอบซ่อม (Retake System)

### 6.1 Flow การขอสอบซ่อมจากฝั่งนักเรียน (ExamResult)
1. นักเรียนดูคะแนนที่ ExamResult → กดปุ่ม "ขอสอบซ่อม"
2. DB: `exam_participants.retake_requested = true`
3. ฝั่งครู (ExamResults): เห็นสถานะ "🔔 นักเรียนขอสอบซ่อม" พร้อมปุ่มอนุมัติ
4. ครูกดอนุมัติ → DB: `allow_rejoin = true`, `status = 'waiting'`
5. ฝั่งนักเรียน (ExamResult): Realtime ตรวจจับ `allow_rejoin = true` → แสดงปุ่ม "เริ่มสอบซ่อม"
6. นักเรียนกดเริ่ม → เข้า ExamRoom ด้วย `attemptNumber` ถัดไป

### 6.2 Auto-Retake (Online Mode)
- ถ้า `retake_until_pass = true` → นักเรียนสอบซ่อมได้ไม่จำกัดจนกว่าจะผ่านเกณฑ์
- ถ้า `exam_mode = 'online'` → ใช้ `max_attempts` เป็นตัวจำกัดจำนวนครั้ง
- นักเรียนไม่ต้องรอครูอนุมัติ สามารถกดเริ่มสอบรอบใหม่ได้ทันที

### 6.3 นโยบายคำนวณคะแนนสอบซ่อม (Retake Policy — ExamResults)
เป็น **Front-end only** (ไม่ได้เก็บลง DB) ครูเลือกนโยบายเฉพาะตอนดูคะแนน:
| นโยบาย | การคำนวณ |
|---|---|
| `best` | ใช้คะแนนสูงสุดจากทุกรอบ |
| `latest` | ใช้คะแนนรอบล่าสุด |
| `average` | ค่าเฉลี่ยทุกรอบ |
| `capped` | คะแนนดีสุดแต่จำกัดเพดาน (ครูกำหนด) |
| `scaled` | เทียบบัญญัติไตรยางศ์ปรับคะแนนเต็มใหม่ |

---

## 7. ระบบ Anti-Cheat (ExamRoom)

### 7.1 การดักจับพฤติกรรม
| ลำดับ | กลไก | วิธีการ |
|---|---|---|
| 1 | Tab Switch / Window Blur | `visibilitychange` + `blur` event |
| 2 | Context Menu (คลิกขวา) | `contextmenu` event → `e.preventDefault()` |
| 3 | Copy / Cut / Paste | `copy` / `cut` / `paste` event → block |
| 4 | Select Text / Drag | `selectstart` / `dragstart` → block |
| 5 | Keyboard Shortcuts | F12, F5, Ctrl+C/V/X/A/U/S/P/R/J/I, Alt+Tab → block |
| 6 | Page Reload / Close | `beforeunload` → แจ้งเตือน |
| 7 | Browser Back Button | `popstate` → push state กลับ |
| 8 | Fullscreen Exit | `fullscreenchange` → แสดง overlay บังคับเข้า fullscreen |

### 7.2 การแยก Sleep vs Tab Switch
- **Sleep (> 30 วินาที):** ไม่นับเป็นทุจริต แต่หักเวลาสอบตามจริง + แสดง Modal เตือน
- **Tab Switch (< 30 วินาที):** นับเป็นทุจริต + เพิ่ม warning count

### 7.3 Timer System
- ใช้ `setInterval` 1 วินาที + drift detection (`lastTickTimeRef`)
- เมื่อ `timeLeft === 0` → auto-submit ทันที
- ครูสามารถปรับเวลาได้แบบ Realtime → นักเรียนจะเห็นเวลาเปลี่ยนทันที

---

## 8. Realtime Channels ที่ใช้

| Channel Name | ตาราง | ใช้ที่ | หน้าที่ |
|---|---|---|---|
| `exam_room_{sessionId}` | `exam_participants` | ExamControl | ติดตามสถานะนักเรียน (เข้า/ออก/ทุจริต) |
| `lobby_session_{sessionId}` | `exam_sessions` | ExamLobby | รอสัญญาณเริ่มสอบจากครู |
| `lobby_participant_{studentId}` | `exam_participants` | ExamLobby | รอสัญญาณ allow_rejoin จากครู |
| `session_update_{sessionId}` | `exam_sessions` | ExamRoom | รับเวลาที่ครูปรับ / สัญญาณจบสอบ |
| `admin_exam_results_{sessionId}` | `exam_participants` + `exam_results` | ExamResults | อัปเดตคะแนนแบบ Real-time |
| `exam_result_participant_...` | `exam_participants` | ExamResult | รอสัญญาณอนุมัติสอบซ่อม |

**Fallback Polling:** ExamLobby ใช้ polling ทุก 3 วินาที เผื่อ Realtime หลุด

---

## 9. ไฟล์ที่เกี่ยวข้อง (File Map)

```
src/
├── pages/
│   ├── admin/
│   │   ├── ExamControl.jsx      ← แผงควบคุมสอบ (1,441 บรรทัด)
│   │   ├── ExamResults.jsx      ← สรุปคะแนนสอบ (1,191 บรรทัด)
│   │   ├── QuestionPicker.jsx   ← Modal เลือกข้อสอบ
│   │   └── DashboardLayout.jsx  ← Layout ของหน้า Admin
│   └── exam/
│       ├── ExamLobby.jsx        ← ห้องรอสอบ (315 บรรทัด)
│       ├── ExamRoom.jsx         ← ห้องสอบ + Anti-Cheat (1,202 บรรทัด)
│       └── ExamResult.jsx       ← ผลสอบรายคน (361 บรรทัด)
├── contexts/
│   └── AuthContext.jsx          ← Auth + studentSession
├── lib/
│   └── supabase.js              ← Supabase client
└── App.jsx                      ← Routing definitions
```

---

## 10. ปัญหาที่ทราบ (Known Issues / Technical Debt)

1. **ไฟล์ใหญ่เกินไป:** ExamRoom.jsx (1,200+ บรรทัด) และ ExamControl.jsx (1,400+ บรรทัด) รวม Logic ทั้งหมดไว้ในไฟล์เดียว
2. **State มากเกินไป:** ExamControl มี useState กว่า 30 ตัว → ยากต่อการ Debug
3. **supabase.from() กระจัดกระจาย:** API calls ถูกเขียนตรงๆ ในทุก handler function ไม่ได้รวมไว้เป็น service layer
4. **Timer ใช้ setInterval:** อาจเพี้ยนเมื่อเบราว์เซอร์ throttle แท็บที่ไม่ active
5. **Retake Policy ไม่ persist:** นโยบายคำนวณคะแนนเก็บเป็น state ฝั่ง client เท่านั้น ไม่ได้บันทึกลง DB
6. **Modal ซ้ำซ้อน:** มี Confirmation Modal หลายตัวที่โครงสร้าง UI เหมือนกัน ควรทำเป็น Shared Component
