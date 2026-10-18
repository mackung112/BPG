# 03: Server-Authoritative Timer & Grace Period Validation

**What to build:** 
A synchronized, tamper-proof timer that computes remaining time from server timestamps: `(started_at + duration_minutes + extra_time_minutes) - server_now`. The client hook displays a countdown for UX, but expiry validation and late-submission rejection are enforced by the server with a 30-second network grace window. When the timer reaches zero, the current draft is automatically submitted.

**Blocked by:** 01: Zero-Leak Question Delivery & Server-Side Grading Engine, 02: Hybrid Draft Auto-Sync & Session Resume

**Status:** resolved

- [x] `exam_participants` records `started_at` (timestamptz) and `extra_time_minutes` (integer, default 0).
- [x] `useExamTimer` hook calculates remaining seconds based on server duration and start time, ignoring device clock alterations.
- [x] Auto-submit triggered upon timer zero without manual confirmation popup blocking the submission.
- [x] Server RPC checks duration expiration and accepts submissions within grace period.
- [x] Test verifies timer calculation logic against arbitrary local machine time offsets.
