import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { supabase } from '../src/lib/supabase.js';
import {
  getExamQuestions,
  submitExamResult,
  saveDraftAnswers,
  loadDraftAnswers
} from '../src/services/examStudentService.js';

describe('Ticket 01 & 02: examStudentService - Zero Leak, RPC Submission & Draft Sync', () => {
  test('getExamQuestions transforms raw questions and strips all correct answer keys', async () => {
    // Mock supabase.from
    const mockRawData = [
      {
        id: 'sq_1',
        points: 2,
        order_index: 0,
        questions: {
          id: 'q_1',
          question_text: 'What is 2 + 2?',
          choices: [
            { text: '3', is_correct: false },
            { text: '4', is_correct: true },
            { text: '5', is_correct: false }
          ],
          correct_answer_index: 1,
          explanation: 'Because 2+2=4'
        }
      }
    ];

    const originalFrom = supabase.from;
    supabase.from = (table) => {
      assert.equal(table, 'exam_session_questions');
      return {
        select: (columns) => {
          // Columns should NOT request correct_answer_index or explanation
          assert.ok(!columns.includes('correct_answer_index'), 'Must not request correct_answer_index');
          assert.ok(!columns.includes('explanation'), 'Must not request explanation in exam mode');
          return {
            eq: (field, val) => {
              return {
                order: (orderField, opts) => {
                  return Promise.resolve({ data: mockRawData, error: null });
                }
              };
            }
          };
        }
      };
    };

    try {
      const result = await getExamQuestions('session_123');
      assert.equal(result.length, 1);
      const q = result[0];
      assert.equal(q.question_id, 'q_1');
      assert.equal(q.question_text, 'What is 2 + 2?');
      assert.equal(q.points, 2);
      assert.equal(q.order_index, 0);

      // Verify that NO answer leak exists
      assert.equal(q.correct_answer_index, undefined);
      assert.equal(q.correctText, undefined);
      assert.equal(q.explanation, undefined);

      // Verify choices do not contain is_correct
      for (const choice of q.choices) {
        assert.equal(choice.is_correct, undefined);
        assert.equal(choice.isCorrect, undefined);
      }
    } finally {
      supabase.from = originalFrom;
    }
  });

  test('submitExamResult calls submit_exam_result RPC with correct parameters', async () => {
    let rpcCalledWith = null;
    const originalRpc = supabase.rpc;
    supabase.rpc = (fnName, params) => {
      rpcCalledWith = { fnName, params };
      return Promise.resolve({
        data: {
          success: true,
          score: 8,
          total_score: 10,
          attempt_number: 1,
          is_suspended: false
        },
        error: null
      });
    };

    try {
      const payload = {
        sessionId: 'sess_1',
        studentId: 'stud_1',
        answers: { q_1: '4', q_2: 'blue' },
        timeSpentSeconds: 120,
        isSuspended: false,
        note: 'Normal submission'
      };

      const res = await submitExamResult(payload);
      assert.equal(rpcCalledWith.fnName, 'submit_exam_result');
      assert.equal(rpcCalledWith.params.p_session_id, 'sess_1');
      assert.equal(rpcCalledWith.params.p_student_id, 'stud_1');
      assert.deepEqual(rpcCalledWith.params.p_answers, { q_1: '4', q_2: 'blue' });
      assert.equal(rpcCalledWith.params.p_is_suspended, false);
      assert.equal(res.success, true);
      assert.equal(res.score, 8);
    } finally {
      supabase.rpc = originalRpc;
    }
  });

  test('saveDraftAnswers and loadDraftAnswers properly persist and retrieve student progress', async () => {
    let updatePayload = null;
    const originalFrom = supabase.from;

    supabase.from = (table) => {
      assert.equal(table, 'exam_participants');
      return {
        update: (payload) => {
          updatePayload = payload;
          return {
            eq: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
          };
        },
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: () => Promise.resolve({
                data: {
                  current_answers: { q_1: '4' },
                  flagged_questions: ['q_2']
                },
                error: null
              })
            })
          })
        })
      };
    };

    try {
      await saveDraftAnswers('sess_1', 'stud_1', { q_1: '4' }, ['q_2']);
      assert.deepEqual(updatePayload.current_answers, { q_1: '4' });
      assert.deepEqual(updatePayload.flagged_questions, ['q_2']);

      const draft = await loadDraftAnswers('sess_1', 'stud_1');
      assert.deepEqual(draft.answers, { q_1: '4' });
      assert.deepEqual(draft.flagged, ['q_2']);
    } finally {
      supabase.from = originalFrom;
    }
  });
});
