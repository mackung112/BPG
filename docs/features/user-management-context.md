# 👤 User Management & Auth System — Context Document

> **อัปเดตล่าสุด:** 2026-08-30  
> **อ้างอิงจากไฟล์:** `AuthContext.jsx`, `Login.jsx`, `StudentManagement.jsx`, `AdminManagement.jsx`

---

## 1. ภาพรวมระบบ

ระบบมี **ผู้ใช้ 2 ประเภท** ที่ทำงานบน Auth Stack แยกกันโดยสิ้นเชิง:

| ประเภท | Auth Method | Session Storage | เข้าถึงหน้า |
|---|---|---|---|
| **ครู (Admin)** | Supabase Auth (Email/Password) | `supabase.auth.session` (cookie/localStorage) | `/admin/*` |
| **นักเรียน (Student)** | Custom (student_id + secret_code) | `localStorage` เท่านั้น | `/exam-lobby/*`, `/exam-room/*`, `/exam-result/*` |

---

## 2. Database Tables ที่เกี่ยวข้อง

### 2.1 `auth.users` (Supabase built-in)
| Column | Type | หมายเหตุ |
|---|---|---|
| `id` | uuid PK | ใช้เป็น FK ใน `admins.id` |
| `email` | text | |
| `created_at` | timestamptz | |

### 2.2 `admins` (ข้อมูลเพิ่มเติมของครู)
| Column | Type | หมายเหตุ |
|---|---|---|
| `id` | uuid PK = auth.users.id | ผูกกับ Supabase Auth user |
| `email` | text | |
| `first_name` | text | ชื่อครู |
| `role` | text | `'admin'` หรือ `'super_admin'` |
| `created_at` | timestamptz | |

### 2.3 `students` (ข้อมูลนักเรียน)
| Column | Type | หมายเหตุ |
|---|---|---|
| `student_id` | text PK | รหัสนักเรียน (เช่น "65001") |
| `first_name` | text | |
| `last_name` | text | |
| `nickname` | text | ชื่อเล่น (optional) |
| `classroom` | text | ห้องเรียน (เช่น "ม.4/1") |
| `created_at` | timestamptz | |

---

## 3. Auth Context (`AuthContext.jsx`)

### 3.1 State ที่ให้บริการ
```js
const {
  user,          // Supabase auth.user (ครูที่ล็อกอิน) | null
  adminData,     // ข้อมูลจากตาราง admins | null  
  isSuperAdmin,  // boolean: adminData?.role === 'super_admin'
  isAdmin,       // boolean: role เป็น admin หรือ super_admin
  studentSession,// { student_id, session_id } จาก localStorage | null
  loading,       // boolean: กำลังโหลด auth state
  loginAdmin,    // fn(email, password) → Promise
  logoutAdmin,   // fn() → Promise
  loginStudent,  // fn(studentId, secretCode) → Promise<sessionId>
  logoutStudent, // fn() → Promise
} = useAuth();
```

### 3.2 การ Initialize (เมื่อเปิดแอป)
```
เปิดแอป
  ├── supabase.auth.getSession()
  │     └── ถ้ามี session → setUser + fetchAdminData(userId)
  │
  └── localStorage.getItem('student_id') + 'exam_session_id'
        └── ถ้ามีข้อมูล → setStudentSession({ student_id, session_id })
```

### 3.3 Admin Inactivity Timeout
- ถ้าครูไม่ขยับเมาส์ / ไม่กดคีย์บอร์ด / ไม่ scroll เกิน **30 นาที**
- ระบบจะ Auto-logout ครูออกโดยอัตโนมัติ
- Listeners: `mousemove`, `keydown`, `scroll`, `click`

---

## 4. Login Flow (`Login.jsx`)

### 4.1 นักเรียนเข้าสอบ (Student Login)
```
กรอก student_id + secret_code
  ↓
loginStudent() ใน AuthContext → ทำงาน 5 ขั้นตอน:
  1. ค้นหา exam_sessions ด้วย secret_code → ตรวจสอบสถานะห้องสอบ
  2. ตรวจสอบว่า student_id มีในตาราง students
  3. ตรวจสอบ exam_participants (มีอยู่แล้วหรือไม่?)
  4. อัปเดต หรือ Insert exam_participants ตามสถานะ
  5. บันทึก student_id และ session_id ลง localStorage
  ↓
navigate('/exam-lobby/{sessionId}')
```

**Error Cases ที่ต้องรู้:**
| Error Message | สาเหตุ |
|---|---|
| ไม่พบรหัสการสอบนี้ | secret_code ไม่ตรง |
| การสอบนี้สิ้นสุดลงแล้ว | status = 'completed' และไม่มีสิทธิ์ retake |
| การสอบนี้หมดเวลาแล้ว | session active แต่เกินเวลา (onsite mode) |
| ไม่พบรหัสนักเรียนนี้ | student_id ไม่มีในตาราง students |
| คุณถูกระงับการสอบ | status = 'cheating' และไม่ได้รับ allow_rejoin |
| คุณสอบผ่านเกณฑ์แล้ว | retake_until_pass = true และผ่านแล้ว |
| คุณได้ทำข้อสอบชุดนี้ครบแล้ว | attempt_count >= max_attempts |

### 4.2 ครูเข้าระบบ (Admin Login)
```
กรอก email + password
  ↓
loginAdmin() → supabase.auth.signInWithPassword()
  ↓
onAuthStateChange trigger → fetchAdminData(user.id)
  ↓
navigate('/admin')
```

### 4.3 Auto-Redirect (ถ้าล็อกอินอยู่แล้ว)
- `user && isAdmin` → redirect ไป `/admin`
- `studentSession` → redirect ไป `/exam-lobby/{session_id}`

---

## 5. Student Management (`StudentManagement.jsx`)

### 5.1 CRUD นักเรียน
| Action | DB Operation |
|---|---|
| โหลดทั้งหมด | SELECT * ORDER BY classroom ASC, student_id ASC |
| เพิ่มทีละคน | INSERT 1 row (validate: student_id ต้อง unique) |
| แก้ไขข้อมูล | UPDATE WHERE student_id |
| ลบนักเรียน | DELETE WHERE student_id |
| นำเข้า CSV | INSERT หลาย rows (upsert on student_id) |

### 5.2 CSV Import Format
```
student_id,first_name,last_name,nickname,classroom
65001,สมชาย,ใจดี,ชาย,ม.4/1
65002,สมหญิง,รักเรียน,หญิง,ม.4/1
```
- Row แรกเป็น Header (ถูก skip)
- ถ้า student_id ซ้ำ → ข้าม (ไม่ throw error)

### 5.3 Filter & Search
- Search: ค้นหาจากชื่อ, รหัสนักเรียน, ห้อง
- Filter: แยกตามห้องเรียน (dropdown)

---

## 6. Admin Management (`AdminManagement.jsx`)

### 6.1 สิทธิ์การเข้าถึง
- **เฉพาะ Super Admin เท่านั้น** ที่เข้าหน้านี้ได้ (ตรวจสอบ `isSuperAdmin` จาก AuthContext)
- ถ้าเป็นแค่ `admin` ธรรมดา → แสดงหน้า "ไม่มีสิทธิ์เข้าถึง"

### 6.2 CRUD Admin
| Action | กลไก | หมายเหตุ |
|---|---|---|
| สร้าง Admin ใหม่ | `authClient.auth.signUp()` + INSERT `admins` | ใช้ **Secondary Supabase Client** เพื่อไม่ให้ล็อกเอ้าท์ผู้ใช้ปัจจุบัน |
| แก้ไข Admin | UPDATE `admins` (first_name, role) | |
| ลบ Admin | DELETE `admins` WHERE id | ห้ามลบตัวเอง |
| เปลี่ยนรหัสผ่าน | `supabase.rpc('admin_change_user_password')` | Super Admin only |

### 6.3 Secondary Supabase Client (สำคัญมาก!)
```js
// AdminManagement.jsx line 29-35
const authClient = createClient(supabaseUrl, supabaseAnonKey, { 
  auth: { 
    persistSession: false,      // ← ไม่บันทึก session
    autoRefreshToken: false,    // ← ไม่ refresh token
    storageKey: 'supabase.admin_creation.token' // ← ใช้ key แยก
  } 
});
```
> ⚠️ **ห้ามลบหรือเปลี่ยน secondary client นี้!** ถ้าใช้ main `supabase` client สร้าง user ใหม่ จะทำให้ครูที่กำลังล็อกอินอยู่ถูก log out ทันที

### 6.4 Roles
| Role | สิทธิ์ |
|---|---|
| `admin` | จัดการนักเรียน, คลังข้อสอบ, ห้องสอบ, ดูคะแนน |
| `super_admin` | ทุกอย่างของ admin + จัดการบัญชีครู + เปลี่ยนรหัสผ่านครูคนอื่น |

---

## 7. Protected Routes (`ProtectedRoute.jsx`)

ระบบป้องกันการเข้าถึงหน้าต่างๆ ผ่าน `ProtectedRoute` Component ใน `App.jsx`:
```
/admin/*      → ต้องมี user (Supabase Auth) + isAdmin = true
/exam-lobby/* → ต้องมี studentSession ใน localStorage
/exam-room/*  → ต้องมี studentSession ใน localStorage
/exam-result/*→ ต้องมี studentSession ใน localStorage
```

---

## 8. Routing Map (App.jsx)

| Path | Component | Auth Guard |
|---|---|---|
| `/` | HomeView (LMS หน้าแรก) | ไม่มี |
| `/login` | Login | ไม่มี (redirect ถ้าล็อกอินแล้ว) |
| `/admin` | DashboardLayout | isAdmin |
| `/admin/students` | StudentManagement | isAdmin |
| `/admin/question-bank` | QuestionBank | isAdmin |
| `/admin/admins` | AdminManagement | isAdmin + isSuperAdmin |
| `/admin/exam-control` | ExamControl | isAdmin |
| `/admin/exam-results` | ExamResults | isAdmin |
| `/exam-lobby/:sessionId` | ExamLobby | studentSession |
| `/exam-room/:sessionId` | ExamRoom | studentSession |
| `/exam-result/:sessionId` | ExamResult | studentSession |

---

## 9. Student Session (localStorage)

นักเรียนไม่ใช้ Supabase Auth แต่ใช้ **localStorage** เก็บ session:
```js
localStorage.setItem('student_id', studentId)
localStorage.setItem('exam_session_id', sessionId)
```

**logoutStudent():** 
1. อัปเดต `exam_participants.status = 'disconnected'` (ยกเว้น status เป็น `completed` หรือ `cheating`)
2. ลบ localStorage ทั้งสอง keys
3. Set `studentSession = null`

---

## 10. Known Issues / Technical Debt

1. **loginStudent() ยาวมาก:** ฟังก์ชันเดียว 260+ บรรทัด ควรแยกเป็น helper functions
2. **Logic ซ้ำซ้อน:** การตรวจสอบ retake eligibility ถูกเขียนซ้ำใน AuthContext 3 ที่ที่ต่างกัน ควรรวบเป็น `canStudentRetake()` ฟังก์ชันเดียว
3. **Student Password-less:** นักเรียนใช้แค่ student_id + secret_code ไม่มี password จริงๆ อาจมีความเสี่ยงด้านความปลอดภัย
4. **Admin Role ใน DB ไม่ sync กับ Auth metadata:** ถ้าเปลี่ยน role ใน `admins` table ต้องรอ session ใหม่ถึงจะมีผล
