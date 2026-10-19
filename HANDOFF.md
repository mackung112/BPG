# Handoff

> Generated: 2026-10-18T12:41:00+07:00  
> Project: ห้องเรียนครูแม็ค (d:\BPG)  
> Session summary: Upgraded online exam system to V2 with server-side grading, hybrid draft sync, server-authoritative timer, single-question focus UI, device-adaptive anti-cheat, and realtime teacher dashboard.

## Goal

Upgrade the Exam System (ระบบสอบ) to production-grade security, resilience, and UX. Eliminate answer leaks in browser DevTools by moving all grading logic to PostgreSQL RPC (`submit_exam_result`), ensure zero-loss draft recovery via hybrid saving, enforce server-authoritative countdown timing with a grace period, deliver a calm single-question exam UI with a Question Palette (desktop sidebar & mobile drawer), introduce a progressive 3-strike device-adaptive anti-cheat system, and equip teachers with live realtime broadcast, extra time extensions, and suspension resolution.

## Current State

**Working:**
- **Zero-Leak Question Delivery**: `getExamQuestions` strictly excludes `correct_answer_index`, `is_correct`, and solution keys from API queries.
- **Server-Side Grading Engine**: `submit_exam_result` PostgreSQL RPC computes score atomically on the database, inserts `exam_results`, and updates participant status.
- **Database Schema & Live Migration**: `exam_participants` (`started_at`, `extra_time_minutes`, `strike_count`, `current_answers`, `flagged_questions`) and `exam_sessions` (`solutions_released`, `exam_mode`) executed and verified on Supabase Cloud.
- **Automated SQL Runner**: `scripts/run-supabase-sql.mjs` executes SQL migrations via Supabase Management API using credentials stored in `.env` / `.env.local`.
- **Hybrid Draft Auto-Sync**: Debounced 15-second / on-action sync to `exam_participants.current_answers` + immediate local storage fallback.
- **Server-Authoritative Timer**: `useExamTimer` calculates countdowns from `(started_at + duration + extra_time) - server_now`.
- **Single-Question Focus & Question Palette**: `QuestionPalette.jsx` and `ExamRoom.jsx` with answered/unanswered/flagged badges, desktop sidebar, and mobile bottom drawer.
- **Device-Adaptive Anti-Cheat**: `useAntiCheat` suppresses forced fullscreen on iOS/mobile devices to avoid false positives, with progressive 3-strike modal and live teacher alert dispatch.
- **Teacher Live Control**: `ExamControl.jsx` with instant broadcast announcement popups, per-student +5m time extension buttons, and 1-click suspension resolution (Resume / Force Submit).
- **Test Suite & Build**: All 9 unit tests pass in 320ms via `npm test` (`node --test tests/*.test.mjs`), and `npm run build` compiles with 0 errors.

**Broken:**
- None. All tickets (01–06) are marked `resolved` and verified.

## Files in Play

| File | Why It Matters |
|------|---------------|
| `supabase/exam_v2_migration.sql` | PostgreSQL migration script containing schema additions and `submit_exam_result` RPC |
| `scripts/run-supabase-sql.mjs` | Automated script to run SQL files on Supabase project via Management API |
| `src/services/examStudentService.js` | Student exam service with zero-leak question fetching, RPC submission, and draft sync |
| `src/services/examAdminService.js` | Admin service with broadcast announcements, extra time extension, and suspension resolution |
| `src/hooks/exam/useExamTimer.js` | Server-authoritative timer hook calculating countdown based on server timestamps |
| `src/hooks/exam/useAntiCheat.js` | Anti-cheat hook with iOS/mobile device detection and progressive 3-strike escalation |
| `src/components/exam/QuestionPalette.jsx` | Responsive question palette grid (answered, unanswered, flagged) |
| `src/pages/exam/ExamRoom.jsx` | Focused single-question student exam room |
| `src/pages/admin/ExamControl.jsx` | Teacher exam room cockpit with broadcast modal, strike badges, and quick actions |
| `tests/*.test.mjs` | Comprehensive unit tests for services, timer, and anti-cheat |
| `GLOSSARY.md` | Domain glossary for Exam System canonical terms |
| `docs/adr/0001` - `0004` | Architectural Decision Records for grading, draft sync, timer, and anti-cheat |
| `.scratch/exam-system-upgrade/` | Spec and 6 resolved vertical slice issues |
| `.env` / `.env.local` | Configuration containing Supabase URL, anon key, project ref, and management token |

## What Has Been Tried (and Why It Failed)

### Attempt 1: Node.js test runner importing `src/lib/supabase.js`
- **What:** Ran `node --test tests/examStudentService.test.mjs` directly.
- **Why it failed:** `src/lib/supabase.js` referenced Vite-specific `import.meta.env.VITE_SUPABASE_URL` which threw `ReferenceError` outside Vite.
- **Fix:** Added a fallback check: `const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});`.

### Attempt 2: Node ESM local file resolution
- **What:** Imported local modules without `.js` extension (e.g. `import { supabase } from '../lib/supabase'`).
- **Why it failed:** Node.js native ESM requires explicit file extensions (`.js`), whereas Vite bundler previously resolved extensionless imports.
- **Fix:** Appended `.js` to local imports in `examStudentService.js`, `examAdminService.js`, and `useAntiCheat.js`.

### Attempt 3: Multiline inline PowerShell eval of fetch request
- **What:** Executed `node -e "..."` in PowerShell with multiline string and string interpolation.
- **Why it failed:** PowerShell interpolated `$token` and `${projectRef}` before passing to Node, resulting in syntax error.
- **Fix:** Packaged execution logic into `scripts/run-supabase-sql.mjs` reading clean environment variables.

## Current Best Theory

The core architecture (PostgreSQL RPC server grading + debounced hybrid draft sync + server-authoritative timer + device-adaptive anti-cheat) is complete, robust, and verified live on Supabase Cloud. Future enhancements can safely build on top of these verified seams without breaking backwards compatibility.

## Next Steps

1. **Conduct Live Pilot Simulation**:
   - Log in as a teacher at `/admin/exam-control`
   - Create or start an active exam session
   - Log in as a test student in an incognito window or mobile device at `/exam-room/:sessionId`
   - Test answering, refreshing the page (verify instant answer restore), testing the Question Palette, and triggering a tab switch (verify progressive 3-strike warning and teacher dashboard alert).
2. **Expand Question Formats (Future Phase)**:
   - When ready, update `submit_exam_result` and `QuestionModal.jsx` to support multi-select (multiple choice answers) and short answers.
3. **Item Analysis & Discrimination Index**:
   - In `ExamResults.jsx`, add item analysis metrics based on server-stored student answers.

## Key Constraints

- **Zero Client Scoring**: Under no circumstances should `ExamRoom.jsx` compute scores or inspect `correct_answer_index` directly. All grading must remain inside the `submit_exam_result` RPC.
- **Mobile/iOS Fullscreen Limitation**: Do not enforce `requestFullscreen()` on iOS Safari; rely on `visibilitychange` and `window.blur` to prevent unfair strikes.
- **Never Prefix Secrets with `VITE_`**: `SUPABASE_ACCESS_TOKEN` must never have the `VITE_` prefix to prevent Vite from packaging management tokens into client bundles.
