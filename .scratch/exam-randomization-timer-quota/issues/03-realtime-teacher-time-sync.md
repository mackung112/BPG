# 03: Real-Time Teacher Time Adjustments & Room Broadcast

**What to build:**
Enable real-time synchronization between the teacher's exam control cockpit and examinee screens so that when a teacher extends time (+5, +10, +15 minutes) or sets a custom duration, all active examinee countdown clocks reflect the updated time immediately.

**Blocked by:** 02: Per-Attempt Authoritative Timer & Auto-Submit Defense

**Status:** resolved

## Acceptance Criteria
- [x] Teacher room extension buttons (+5, +10, +15 min) broadcast a `room_time_adjusted` event to all connected examinee devices.
- [x] Custom time changes in the teacher control bar broadcast the new room time limit.
- [x] Examinee room component subscribes to `room_time_adjusted` and immediately updates the countdown timer state and displays an announcement banner.
- [x] Database changes to `exam_sessions.time_limit_minutes` are captured via Supabase Realtime table changes.
- [x] Unit test suite verifies broadcast and event subscription handlers.
