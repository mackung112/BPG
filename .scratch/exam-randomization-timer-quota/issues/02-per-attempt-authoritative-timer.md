# 02: Per-Attempt Authoritative Timer & Auto-Submit Defense

**What to build:**
Decouple examinee countdown timers from the room's global creation timestamp, anchoring each examinee's timer to their individual attempt start time. Add a positive-time countdown guard to prevent the timer from immediately firing an auto-submission on already-expired attempts.

**Blocked by:** None (can start immediately)

**Status:** resolved

## Acceptance Criteria
- [x] Examinee attempt start timestamp (`started_at`) is initialized at the time an authorized attempt or retake actually begins.
- [x] Examinees reconnecting to an ongoing attempt preserve their active start time without resetting the countdown clock.
- [x] Countdown calculation provides examinees with their full allotted duration per attempt across both Onsite and Online modes.
- [x] Timer hook enforces a positive-time guard: auto-submission is only triggered if the timer actively counted down from a positive value to zero.
- [x] When entering an already-expired attempt, room initialization halts cleanly with an informative alert and disables automated submission.
- [x] Unit test suite verifies countdown accuracy and non-negative bounds.
