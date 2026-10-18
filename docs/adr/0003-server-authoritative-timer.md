# 0003: Server-Authoritative Exam Timer and Expiry Validation

## Context
Previously, countdown timers ran purely in browser memory (`useExamTimer`), allowing examinees to tamper with device clocks, throttle JavaScript execution, or pause background tabs to artificially prolong their test duration.

## Decision
We made exam duration tracking server-authoritative:
1. When an examinee enters an exam, their `started_at` timestamp is recorded in `exam_participants`.
2. The remaining time is calculated from `(started_at + duration_minutes + extra_time_minutes) - server_now`.
3. Client-side timers serve purely as a visual countdown.
4. When `submit_exam_result` is invoked, the database RPC asserts that submission occurs within the authorized window plus a standard network grace period (30 seconds). Submissions arriving past the grace window are automatically finalized with their latest saved draft.

## Consequences
- Examinees cannot gain an unfair time advantage through client-side manipulation.
- Network jitter is accommodated via the grace period.
- Requires recording accurate `started_at` and `extra_time_minutes` per participant in PostgreSQL.
