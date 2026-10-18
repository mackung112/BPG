# 0002: Hybrid Draft Answers Sync

## Context
Student progress was previously saved only in `localStorage`. If an examinee refreshed on a shared school computer, cleared cache, had browser storage blocked, or switched devices due to hardware issues, their in-progress answers were lost.

## Decision
We implemented a hybrid synchronization mechanism:
1. Immediate instant caching in browser memory and `localStorage` to ensure zero typing/clicking delay.
2. Debounced periodic sync (every 15 seconds or upon navigating questions) writing the student's answer JSON map to `exam_participants.current_answers` in Supabase.
3. Upon entering or rejoining an Exam Session, the client restores answers from the server draft first, falling back to local storage if newer.

## Consequences
- Examinees can recover their exact exam progress across page reloads or device changes.
- Server write load increases slightly during exams, but is mitigated by a 15-second debounce and only sending diffs or updated JSON.
