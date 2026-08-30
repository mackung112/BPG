---
name: clean-architecture-react
description: สถาปัตยกรรมโค้ด React ที่ถูกต้องสำหรับโปรเจกต์นี้ เรียกใช้เมื่อสร้างหน้าใหม่ ทำ Refactor หรือเขียนโค้ดที่ต้องการสถาปัตยกรรมที่ชัดเจน โดยเฉพาะเมื่อมีการติดต่อ Supabase หรือจัดการ State ที่ซับซ้อน
---

# 🏗️ Clean Architecture for React (Exam LMS)

สกิลนี้บังคับใช้เมื่อ: สร้างหน้าใหม่, Refactor ไฟล์เก่า, หรือเขียนโค้ดใดๆ ที่ติดต่อฐานข้อมูลหรือมี State ที่ซับซ้อน

---

## ⚠️ กฎเหล็ก — ห้ามทำ (Breaking Rules)

### ❌ ห้ามเรียก Supabase ใน Component โดยตรง
```js
// ❌ ผิด — ห้ามทำ
export default function MyPage() {
  const handleSave = async () => {
    const { data } = await supabase.from('students').insert([...]) // ← ห้าม!
  }
}
```

```js
// ✅ ถูก — ต้องทำแบบนี้
// 1. เขียน Service function ใน src/services/
// 2. เรียกผ่าน Custom Hook
export default function MyPage() {
  const { saveStudent } = useStudents()  // ← ผ่าน Hook เท่านั้น
  const handleSave = async () => {
    await saveStudent(data)
  }
}
```

### ❌ ห้ามมี useEffect ซ้อนกันเกิน 2 ตัวโดยไม่มีเหตุผล
- ถ้ามีมากกว่า 2 useEffect → แยกออกเป็น Custom Hook

### ❌ ห้ามมี useState เกิน 10 ตัวในหน้าเดียว
- ถ้าเกิน → แยก UI State และ Server State ออกจากกัน
- ใช้ `useReducer` แทนสำหรับ State ที่เกี่ยวข้องกัน

### ❌ ห้ามเขียน Logic การคำนวณใน JSX โดยตรง
```jsx
// ❌ ผิด
<span>{Math.max(...results.map(r => r.score)) / totalScore * 100}%</span>

// ✅ ถูก — คำนวณก่อน แล้วใส่ใน JSX
const percentage = Math.round((bestScore / totalScore) * 100)
<span>{percentage}%</span>
```

---

## 📂 โครงสร้างโฟลเดอร์มาตรฐาน (Target Architecture)

```
src/
├── services/                    ← API calls ทั้งหมด (ติดต่อ Supabase)
│   ├── examService.js           ← CRUD ระบบสอบ
│   ├── studentService.js        ← CRUD นักเรียน
│   ├── questionBankService.js   ← CRUD คลังข้อสอบ
│   └── adminService.js          ← CRUD แอดมิน
│
├── hooks/                       ← Custom Hooks (Logic)
│   ├── exam/
│   │   ├── useExamTimer.js      ← นับเวลาสอบ
│   │   ├── useAntiCheat.js      ← ระบบป้องกันทุจริต
│   │   └── useExamRealtime.js   ← Supabase Realtime listeners
│   ├── useStudents.js           ← Hook สำหรับจัดการนักเรียน
│   └── useQuestionBank.js       ← Hook สำหรับคลังข้อสอบ
│
├── components/                  ← Shared UI Components
│   ├── ui/
│   │   ├── ConfirmModal.jsx     ← Modal ยืนยันการกระทำ (reusable)
│   │   ├── Toast.jsx            ← Toast notification
│   │   └── EmptyState.jsx       ← หน้าว่าง
│   └── exam/
│       └── ParticipantCard.jsx  ← การ์ดนักเรียนในห้องสอบ
│
├── utils/                       ← Helper functions
│   ├── giftParser.js            ← Parser สำหรับ GIFT format
│   ├── scoreCalculator.js       ← คำนวณคะแนน (retake policies)
│   └── formatters.js            ← formatTime, formatDate ฯลฯ
│
└── pages/                       ← UI หน้าต่างๆ (บาง มี Hook เท่านั้น)
    ├── admin/
    └── exam/
```

---

## 🎯 Pattern มาตรฐานสำหรับหน้าที่มีข้อมูล

```jsx
// ตัวอย่าง: หน้าจัดการนักเรียน (ถูกต้อง)

// 1. Service layer (src/services/studentService.js)
export const getStudents = async () => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('classroom')
  if (error) throw error
  return data
}

export const createStudent = async (studentData) => {
  const { data, error } = await supabase
    .from('students')
    .insert([studentData])
    .select()
    .single()
  if (error) throw error
  return data
}

// 2. Custom Hook (src/hooks/useStudents.js)
export function useStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    try {
      setLoading(true)
      const data = await getStudents()
      setStudents(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return { students, loading, error, reload: load, createStudent }
}

// 3. Page Component (src/pages/admin/StudentManagement.jsx)
export default function StudentManagement() {
  const { students, loading, createStudent } = useStudents()
  // ← ไม่มี supabase.from() ที่นี่เลย!
  // ← ไม่มี useState มากมายสำหรับข้อมูล
  // ← มีแค่ UI state (modal open/close, search term)
}
```

---

## 🔄 Pattern สำหรับ Realtime

```js
// src/hooks/exam/useExamRealtime.js
export function useExamRealtime(sessionId, onSessionUpdate, onParticipantUpdate) {
  useEffect(() => {
    const channel = supabase
      .channel(`session_update_${sessionId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'exam_sessions',
        filter: `id=eq.${sessionId}`
      }, onSessionUpdate)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [sessionId])
}

// ใน ExamRoom.jsx
export default function ExamRoom() {
  const { timeLeft, addTime } = useExamTimer(sessionId)
  const {} = useAntiCheat({ onViolation: handleCheating })
  useExamRealtime(sessionId, handleSessionUpdate, handleParticipantUpdate)
  // ← Component สะอาด อ่านง่าย
}
```

---

## 📏 ขนาดไฟล์มาตรฐาน

| ประเภทไฟล์ | ขนาดสูงสุดที่แนะนำ |
|---|---|
| Page Component | ≤ 300 บรรทัด |
| Custom Hook | ≤ 150 บรรทัด |
| Service file | ≤ 100 บรรทัด |
| Shared Component | ≤ 100 บรรทัด |

ถ้าไฟล์ไหนเกิน → แบ่งแยกออกทันที

---

## ✅ Checklist ก่อน Commit โค้ดใหม่

- [ ] ไม่มี `supabase.from()` ใน Page/Component ไฟล์
- [ ] ทุก API call อยู่ใน `src/services/`
- [ ] ทุก Logic อยู่ใน Custom Hook ใน `src/hooks/`
- [ ] ไม่มี `useState` เกิน 10 ตัวในไฟล์เดียว
- [ ] ไม่มี `useEffect` ซ้อน Logic ที่ควรอยู่ใน Service
- [ ] Realtime channel ถูก `removeChannel` ใน cleanup function
- [ ] Toast/Modal เป็น Shared Component ไม่ได้เขียน inline
