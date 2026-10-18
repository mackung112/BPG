# 0001: Server-Side Grading and Zero-Leak Questions

## Context
Previously, exam questions delivered to the student browser included `correct_answer_index`, and the React frontend evaluated scores upon submission. This allowed tech-savvy students to inspect network responses or browser memory to see answers in advance.

## Decision
We moved all grading logic into a transactional PostgreSQL Database Function (`submit_exam_result` RPC) in Supabase. The client query for active exam questions now explicitly omits correct answers and solution explanations. When students submit, their answer map is passed directly to the RPC, which computes the score, records attempts, updates participant state, and returns only the final score and feedback (if allowed by session settings).

## Consequences
- Students cannot extract answers from DevTools or network payloads.
- Grading cannot be tampered with by manipulated client requests.
- Score calculation is atomic and reliable.
- Edge case: Requires Supabase RPC deployment and migration script.
