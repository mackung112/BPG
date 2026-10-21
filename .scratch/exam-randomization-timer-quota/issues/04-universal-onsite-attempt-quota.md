# 04: Universal Onsite Attempt Quota & Retake Lifecycle

**What to build:**
Unlock the maximum attempts (`max_attempts`) configuration for Onsite exams, enabling teachers to configure multi-attempt exams and quizzes in classroom lab environments, and allowing examinees to take multiple attempts or retakes up to the configured quota.

**Blocked by:** None (can start immediately)

**Status:** resolved

## Acceptance Criteria
- [x] Session creation modal in the teacher cockpit exposes the "จำนวนครั้งสูงสุด" numeric input for both Onsite and Online modes.
- [x] Session edit modal exposes and persists `max_attempts` for both Onsite and Online modes.
- [x] Student authentication service permits re-entry when `actualAttemptCount < max_attempts` for Onsite exams.
- [x] Exam result interface computes `hasAttemptsLeft` uniformly across both exam modes and renders the retake button when attempts remain.
- [x] Retake attempts initialize fresh attempt start timestamps while preserving overall session historical results.
- [x] All 26 unit tests pass and Vite production bundle compiles with 0 errors.
