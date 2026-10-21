# 01: Seeded Randomization for Questions and Choices

**What to build:**
Deliver deterministic per-student question and multiple-choice option randomization using a seeded pseudo-random algorithm. Each student receives a unique question sequence and choice sequence to prevent adjacent screen copying, while guaranteeing 100% stability across page reloads and network reconnections.

**Blocked by:** None (can start immediately)

**Status:** resolved

## Acceptance Criteria
- [x] Deterministic PRNG utility (`seededShuffle`) produces identical permutations for identical seeds and distinct permutations for different student seeds.
- [x] Question delivery service sanitizes choices and applies seeded shuffle to questions and multiple-choice options per student.
- [x] Question order and choice order remain identical when examinee refreshes the browser or re-enters the exam room.
- [x] Server-side grading via PostgreSQL RPC matches submitted choice texts accurately regardless of client-side choice ordering.
- [x] Random question bank mode supports subset sampling when requested question count is smaller than the available bank question pool.
- [x] Unit test suite verifies stability, uniqueness, and edge cases.
