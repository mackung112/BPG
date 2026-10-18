# 01: Zero-Leak Question Delivery & Server-Side Grading Engine

**What to build:** 
Deliver secure, leak-free exam questions to student examinees and perform all grading calculations on PostgreSQL via Supabase RPC. When a student loads the exam, `getExamQuestions` strictly excludes `correct_answer_index`, `correctText`, and solution explanations from the query response. When submitting, answers are passed to the `submit_exam_result` RPC, which validates the session, calculates the score against the answer key atomically on the server, creates an entry in `exam_results`, and returns the sanitized result.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Database migration script in `supabase/exam_v2_migration.sql` creating/replacing `submit_exam_result` RPC and ensuring safe schema.
- [x] `examStudentService.getExamQuestions` omits correct answer keys from the query payload.
- [x] `examStudentService.submitExamResult` calls `supabase.rpc('submit_exam_result', ...)` instead of client-side grading.
- [x] `ExamRoom.jsx` and `ExamResult.jsx` adapt to receive server-calculated scores without calculating answers on the client.
- [x] Test verifies that question payloads do not expose answers and the RPC submission contract behaves as specified.
