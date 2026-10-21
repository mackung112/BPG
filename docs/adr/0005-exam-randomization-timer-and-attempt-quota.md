# 0005: Seeded Randomization, Per-Attempt Authoritative Timer, and Onsite Attempt Quota

## Context
Following the Exam System V2 upgrade in October 2026, three critical defects emerged during classroom trials:
1. **Lack of Randomization**: Questions and choices were delivered in static database order for all examinees, facilitating cheating across neighboring desks.
2. **Premature Auto-Submission (Bouncing)**: In Onsite mode, examinee timers were coupled to the global session start timestamp (`sData.started_at`). Late-joining examinees or retake examinees entered with an already-elapsed timer, triggering an immediate auto-submission within seconds.
3. **Restricted Onsite Attempts**: The teacher admin cockpit restricted `max_attempts` configuration exclusively to Online exams, locking Onsite quizzes to a single attempt and blocking planned classroom retake policies.

## Decision
1. **Seeded Randomization**:
   - Implement deterministic seeded Fisher-Yates shuffling using a deterministic hash of `sessionId + studentId`.
   - Questions and choices are shuffled per-student: different examinees receive unique permutations, but any given examinee's permutation remains 100% stable across browser reloads or reconnections.
   - Introduce `shuffle_questions` and `shuffle_choices` session configuration flags, defaulting to `true`.
2. **Per-Attempt Authoritative Timer with Real-Time Teacher Control**:
   - Decouple examinee countdowns from the initial room creation time. Countdowns are calculated from the examinee's individual attempt start timestamp (`pData.started_at`) + `duration_minutes` + `extra_time_minutes`.
   - Teacher adjustments to time limits or individual extensions are synced in real-time via Supabase Broadcast channels (`time_extended` / `session_updated`).
   - If a session is ended by the teacher or an attempt is genuinely expired, block entry cleanly with an informative banner rather than triggering a zero-score automatic submission.
3. **Universal Attempt Quota**:
   - Unlock `max_attempts` for both Onsite and Online modes in the session creation and modification forms.
   - Support retake rules uniformly across all exam environments.

## Consequences
- Prevents adjacent screen-peeking through unique per-student question and option ordering.
- Eliminates the false auto-submit failure mode for retakes and late-arriving students.
- Gives teachers full pedagogical flexibility to offer multiple attempts and quizzes in Onsite classrooms.
