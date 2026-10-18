# 02: Hybrid Draft Auto-Sync & Session Resume

**What to build:** 
Ensure examinee answers are resilient against crashes, reloads, and device changes. Answers are immediately cached locally in memory/localStorage, and debounced every 15 seconds (or upon question navigation) to `exam_participants.current_answers` and `flagged_questions` in PostgreSQL. When an examinee opens `ExamRoom`, the latest draft is restored from the server draft (falling back to local cache if newer).

**Blocked by:** 01: Zero-Leak Question Delivery & Server-Side Grading Engine

**Status:** resolved

- [x] `exam_participants` table schema updated with `current_answers` (jsonb) and `flagged_questions` (jsonb).
- [x] `examStudentService` provides `saveDraftAnswers` and `loadDraftAnswers` methods.
- [x] `ExamRoom.jsx` implements debounced hybrid saving on answer selection and question changes.
- [x] Session restore loads existing answers and flagged statuses seamlessly on mount.
- [x] Test verifies sync serialization, debounce logic, and answer restore priority.
