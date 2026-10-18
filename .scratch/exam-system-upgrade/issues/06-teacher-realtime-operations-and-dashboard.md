# 06: Teacher Realtime Operations & Incident Dashboard

**What to build:** 
A live exam management cockpit in `ExamControl.jsx` powered by a unified Supabase Realtime channel (`room:exam_${sessionId}`). Teachers can broadcast instant announcement popups to all students, add extra time (+5, +10 mins) to individual students with a single click, and resolve strike 3 suspensions with immediate "Resume Exam" or "Force Submit" actions.

**Blocked by:** 03: Server-Authoritative Timer & Grace Period Validation, 05: Device-Adaptive Anti-Cheat & Progressive 3-Strike Warning

**Status:** resolved

- [x] Unified Realtime broadcast channel `room:exam_${sessionId}` handles announcements, strikes, time extensions, and resolution commands.
- [x] `examAdminService` provides methods for broadcasting messages, extending student time, and resolving suspensions.
- [x] `ExamControl.jsx` renders live student status with strike badges and action dropdown/buttons.
- [x] Broadcast Announcement modal sends real-time popups to student viewports.
- [x] Suspension Resolution actions (Resume Exam / Force Submit) push immediate state updates to examinees.
