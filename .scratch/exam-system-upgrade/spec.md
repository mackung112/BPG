# Spec: Exam System Upgrade (ระบบสอบ V2)

Status: ready-for-agent

## Problem Statement
The current online exam system suffers from critical security vulnerabilities and resilience risks:
1. Questions sent to the student's browser include `correct_answer_index`, and grading is performed by client-side JavaScript (`ExamRoom.jsx`), allowing tech-savvy students to inspect network traffic or browser memory to discover correct answers.
2. In-progress student answers are stored solely in `localStorage`. If an examinee refreshes on a public/school computer, encounters a browser crash, or switches devices due to hardware failure, their answers are wiped.
3. Exam timers are tracked locally in browser state (`useExamTimer`), allowing students to pause tabs, sleep laptops, or adjust machine clocks to gain extra time.
4. The exam room renders 2 questions per page with rigid pagination, lacking a clear Question Palette or review flags.
5. The anti-cheat mechanism locks users aggressively on mobile/iOS devices due to Fullscreen API incompatibility, and teachers lack live controls to broadcast announcements, add extra time for individuals, or resolve suspensions.

## Solution
An end-to-end upgrade to the Exam System incorporating:
1. **Zero-Leak & Server-Side Grading**: Questions delivered to examinees omit answer keys; grading is executed atomically in PostgreSQL via Supabase RPC (`submit_exam_result`).
2. **Hybrid Draft Sync**: Instant local caching coupled with a 15-second debounced server synchronization to `exam_participants.current_answers`, enabling instant state recovery across reloads or device swaps.
3. **Server-Authoritative Timer**: Timers derive remaining time from `(started_at + duration_minutes + extra_time_minutes) - server_now` with a 30-second network grace period.
4. **Focused Exam Room UX**: Single Question Focus mode with a responsive Question Palette (desktop sidebar / mobile bottom sheet drawer) supporting answered, unanswered, and flagged states.
5. **Device-Adaptive Anti-Cheat & 3-Strike Policy**: Adaptive detection tailored to device capabilities (disabling forced fullscreen on iOS/mobile while tracking visibility/blur) and a 3-strike escalation model with live teacher resolution (Resume / Force Submit).
6. **Teacher Real-Time Operations**: Single multiplexed broadcast channel (`room:exam_${sessionId}`) for live alerts, emergency announcements, and per-student time extensions.

## User Stories
1. As a student, I want my exam questions to load smoothly without exposing answers in DevTools, so that test integrity is maintained fairly for everyone.
2. As a student, I want my selected answers to be continuously saved to the server, so that I can resume without losing my work if my browser crashes or I need to switch computers.
3. As a student, I want to view one question at a time with clear, un-cluttered typography, so that I can focus entirely on solving the problem without cognitive overload.
4. As a student, I want a Question Palette showing all question numbers with visual indicators for answered, unanswered, and flagged items, so that I can easily navigate between questions and review my progress.
5. As a student, I want to flag questions for later review, so that I can skip difficult questions and return to them before final submission.
6. As a student on a mobile phone or iPad, I want to take exams without false-positive cheating alerts from incompatible fullscreen modes, so that I am not unfairly penalized.
7. As a student, I want an accurate countdown timer based on official exam time, so that I know exactly how much time I have left regardless of local clock quirks.
8. As a student, I want a 3-strike progressive warning system if I accidentally switch tabs, so that a simple accidental notification doesn't immediately disqualify me.
9. As a student taking an Official Exam, I want immediate confirmation that my answers were submitted successfully, while knowing solutions are kept hidden until the teacher unlocks them.
10. As a student taking a Practice Quiz, I want to view my score, breakdown, and explanations immediately after submission, so that I can learn from my mistakes.
11. As a teacher in Exam Control, I want to see a live dashboard of all participants with their current progress, strike count, and active status, so that I can monitor the room in real time.
12. As a teacher, I want to send instant broadcast announcements that pop up on every student's screen, so that I can communicate urgent instructions or question clarifications.
13. As a teacher, I want to grant extra time (+5, +10 mins) to a specific student whose hardware or network malfunctioned, so that they have a fair opportunity to complete the exam.
14. As a teacher, I want to be alerted immediately when a student hits Strike 3, with one-click options to "Resume Exam" or "Force Submit", so that I retain full authority over discipline and grading.
15. As a teacher, I want to toggle "Release Solutions" when an Official Exam session concludes, so that students can subsequently view answer keys safely without risks of earlier leaks.

## Implementation Decisions
- **Database Schema**:
  - `exam_participants`: Add `current_answers` (jsonb), `flagged_questions` (jsonb), `extra_time_minutes` (int, default 0), `strike_count` (int, default 0), `strike_logs` (jsonb, default '[]'), `started_at` (timestamptz).
  - `exam_sessions`: Add `solutions_released` (boolean, default false).
- **Database RPC**:
  - `submit_exam_result(p_session_id uuid, p_student_id text, p_answers jsonb)`: Computes score against `exam_session_questions` and `questions.correct_answer_index`, validates submission window (`started_at + duration + extra_time + 30s grace`), inserts `exam_results`, marks `exam_participants.status = 'submitted'`, and returns sanitized result.
- **Client API & Query Seam**:
  - `getExamQuestions`: Excludes `correct_answer_index`, `correctText`, and solution explanations from client queries.
  - `syncParticipantDraft`: Debounced function pushing local answer JSON to `exam_participants.current_answers`.
- **Realtime Architecture**:
  - Multiplexed channel `room:exam_${sessionId}` with events: `broadcast_announcement`, `student_strike_alert`, `time_extended`, `suspension_resolved`, and `solutions_released`.
- **UI Architecture**:
  - `ExamRoom.jsx`: Refactored to Single-Question View (`currentQuestionIndex`) with a responsive `QuestionPalette` component (sidebar on desktop, sliding drawer on mobile).
  - `ExamControl.jsx`: Enhanced with a Broadcast modal, Strike 3 alert banner with Resume/Force Submit triggers, and per-row "+ Time" quick action.

## Testing Decisions
- **What makes a good test**: Tests should verify observable contracts and behavior (e.g. payload sanitization, score accuracy, recovery from server draft), not private component states.
- **Modules to test**:
  1. `examStudentService`: Verify `getExamQuestions` does not contain answer keys. Verify `submitExamResult` returns score structure.
  2. `examAdminService`: Verify time extension and suspension resolution payload structures.
  3. UI Smoke & Build Test: `npm run build` must compile cleanly without lint/syntax errors.
- **Prior Art**: Existing service tests and pattern in `src/services/` and `src/hooks/admin/`.

## Out of Scope
- Essay/subjective question grading (manual marking interface).
- Audio/Video webcam proctoring.
- Multi-select (multiple answers per question) or drag-and-drop question formats (reserved for future phases).

## Further Notes
- Adheres to `karpathy-guidelines` (Simplicity first, surgical changes, no speculative features).
- References:
  - [GLOSSARY.md](file:///d:/BPG/GLOSSARY.md)
  - [ADR 0001: Server-Side Grading](file:///d:/BPG/docs/adr/0001-server-side-grading-and-zero-leak-questions.md)
  - [ADR 0002: Hybrid Draft Sync](file:///d:/BPG/docs/adr/0002-hybrid-draft-answers-sync.md)
  - [ADR 0003: Server-Authoritative Timer](file:///d:/BPG/docs/adr/0003-server-authoritative-timer.md)
  - [ADR 0004: Device-Adaptive Anti-Cheat](file:///d:/BPG/docs/adr/0004-device-adaptive-anti-cheat-and-unified-realtime.md)
