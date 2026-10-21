# Spec: Seeded Randomization, Per-Attempt Timer & Onsite Attempt Quota

**Status:** ready-for-agent

## Problem Statement

Following the Exam System upgrade in October 2026, teachers and students experienced three major defects during live classroom examinations:
1. **Lack of Question & Choice Randomization**: Questions and multiple-choice options were presented in the exact same static sequence to every examinee. Students sitting at adjacent desks could easily peek and copy choices without reading the questions.
2. **Premature Auto-Submission (Bouncing)**: In Onsite examinations, the countdown timer was bound to the global session start timestamp. When a student joined the exam after the allotted duration had elapsed, or when a student attempted a retake outside the initial room window, the timer immediately calculated a non-positive duration (`remaining <= 0`) and fired an automatic submission within 3 seconds, burning an attempt and locking in a 0-score or incomplete submission without examinee interaction.
3. **Restricted Onsite Exam Attempts**: The teacher administration interface strictly locked Onsite exam configurations to a single attempt (`max_attempts: 1`), hiding the attempt limit input field and preventing teachers from enabling multi-attempt retake policies or practice runs in physical classrooms.

## Solution

1. **Seeded Deterministic Randomization**: Implement deterministic pseudo-random permutation for both question ordering and choice ordering based on a composite seed of `sessionId + studentId`. Each student receives a unique test permutation to prevent adjacent peeking, while ensuring that page reloads or network reconnects preserve the identical question and option layout.
2. **Per-Attempt Authoritative Timer with Real-Time Teacher Synchronization**: Decouple the examinee timer from the global room creation timestamp. Each authorized attempt begins with its own countdown anchored to the examinee's attempt start timestamp. When a teacher extends time or modifies the room time limit in real-time, all connected examinees receive a broadcast event and have their timers adjusted instantaneously. If an attempt is genuinely expired, entry is cleanly blocked with an explanatory notice rather than triggering a zero-score submission.
3. **Universal Attempt Quota**: Unlock the `max_attempts` configuration for both Onsite and Online exam modes across session creation, session editing, student authentication, and result display interfaces.

## User Stories

1. As a teacher, I want questions to appear in different orders for different students, so that students sitting next to each other cannot copy answers by question number.
2. As a teacher, I want multiple-choice options to be shuffled uniquely per student, so that students cannot copy choices by letter (A, B, C, D).
3. As a student, I want my question and choice order to remain completely consistent when I refresh the page, so that I do not lose my place or my drafted answers.
4. As a student, I want to receive the full allotted time when I begin an approved retake, so that I am not penalized by the time elapsed during earlier attempts.
5. As a student, I want the system to alert me clearly if my exam time has already expired, so that the system does not silently auto-submit an empty exam with zero score.
6. As a teacher, I want to add extra time (+5, +10, +15 minutes) to the entire room during an exam, so that all students' countdown clocks immediately reflect the extension.
7. As a teacher, I want to configure the maximum allowed attempts (`max_attempts`) for Onsite exams, so that my students can take multiple attempts or retakes in the computer lab.
8. As a student, I want to be allowed to re-enter and take another attempt in an Onsite exam if I have attempts remaining, so that I can improve my score as permitted by the teacher.
9. As a teacher, I want random question bank selection to deliver the exact requested subset count to each student, so that tests with 10 questions selected from a pool of 30 present exactly 10 questions per student.
10. As a teacher, I want server-side grading to continue evaluating correct answers accurately, regardless of how choices were shuffled on the client.

## Implementation Decisions

1. **Deterministic PRNG and Fisher-Yates Permutation**:
   - Seeded shuffling is implemented via a 32-bit FNV-1a hash function driving a Mulberry32 pseudo-random number generator.
   - Question order is seeded with `${sessionId}_${studentId}_questions`.
   - Choice order for each question is seeded with `${sessionId}_${studentId}_choice_${questionId}`.
   - Server-side grading evaluates submitted choice text rather than numeric indices, ensuring zero grading drift across choice permutations.

2. **Per-Attempt Timer Anchoring**:
   - In both Onsite and Online modes, the base timer timestamp is anchored to `pData.started_at` (the participant's attempt start time) rather than the global session creation time.
   - When an examinee begins a new attempt or approved retake, `pData.started_at` is initialized to the current timestamp.
   - When an examinee reconnects mid-attempt, the existing `pData.started_at` is preserved to prevent timer reset abuse.

3. **Real-Time Teacher Room Time Synchronization**:
   - Teacher time adjustments broadcast a `room_time_adjusted` event containing the updated duration and extension minutes.
   - Examinee clients subscribe to this event and dynamically update their timer configuration and alert banners.
   - Database updates to session time limits trigger realtime synchronization for all active examinees.

4. **Auto-Submit Guard & Zero-Score Prevention**:
   - The countdown timer hook enforces a `hadPositiveTime` guard: automatic submission is only permitted if the timer actively counted down from a positive value to zero.
   - If an examinee arrives at an already-expired attempt, the room initialization aborts with an informative message and disables automatic submission.

5. **Universal Attempt Quota & Retake Permissions**:
   - Session creation and edit dialogs expose the `max_attempts` numeric input for both Onsite and Online modes.
   - The student authentication and lobby gatekeeper verify `actualAttemptCount < max_attempts` uniformly across both exam modes.
   - The exam results screen displays retake eligibility for Onsite exams when remaining attempts exist.

## Testing Decisions

- **Black-Box Determinism Verification**: Tests verify that seeded permutations with identical seeds yield identical sequences, while distinct student IDs yield distinct sequences, without testing internal PRNG math.
- **Clock Immutability & Safe Bounds**: Tests verify that attempt countdown calculations return non-negative integers and accurately reflect duration offsets.
- **Contract Integrity**: Tests verify that sanitized questions delivered to students omit grading keys while preserving question IDs and choice texts.

## Out of Scope

- Adaptive item-response testing (varying question difficulty dynamically based on prior responses).
- Offline browser caching of entire question banks for air-gapped exam terminals.
- Biometric facial recognition or webcam proctoring.

## Further Notes

- Database schema additions for optional session toggles (`shuffle_questions`, `shuffle_choices`) default to `true` to ensure out-of-the-box protection.
