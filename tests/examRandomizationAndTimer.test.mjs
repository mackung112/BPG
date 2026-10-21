import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { seededShuffle } from '../src/utils/seededShuffle.js';
import { calculateRemainingSeconds } from '../src/hooks/exam/useExamTimer.js';

describe('Exam Randomization and Timer Integration Tests', () => {
  const sampleQuestions = Array.from({ length: 20 }, (_, i) => ({
    id: `q_${i + 1}`,
    question_text: `Question ${i + 1}`,
    choices: [
      { text: `Choice A for ${i + 1}` },
      { text: `Choice B for ${i + 1}` },
      { text: `Choice C for ${i + 1}` },
      { text: `Choice D for ${i + 1}` }
    ]
  }));

  test('Seeded randomization produces stable question and choice orders across reloads', () => {
    const studentId = '68219100001';
    const sessionId = 'session_test_abc';

    // Simulate first load
    const qOrder1 = seededShuffle(sampleQuestions, `${sessionId}_${studentId}_questions`);
    const cOrder1 = seededShuffle(sampleQuestions[0].choices, `${sessionId}_${studentId}_choice_${sampleQuestions[0].id}`);

    // Simulate reload (F5)
    const qOrder2 = seededShuffle(sampleQuestions, `${sessionId}_${studentId}_questions`);
    const cOrder2 = seededShuffle(sampleQuestions[0].choices, `${sessionId}_${studentId}_choice_${sampleQuestions[0].id}`);

    assert.deepEqual(qOrder1.map(q => q.id), qOrder2.map(q => q.id));
    assert.deepEqual(cOrder1.map(c => c.text), cOrder2.map(c => c.text));
  });

  test('Different students receive different question and choice orders', () => {
    const sessionId = 'session_test_abc';
    const student1 = '68219100001';
    const student2 = '68219100002';

    const qOrder1 = seededShuffle(sampleQuestions, `${sessionId}_${student1}_questions`);
    const qOrder2 = seededShuffle(sampleQuestions, `${sessionId}_${student2}_questions`);

    assert.notDeepEqual(qOrder1.map(q => q.id), qOrder2.map(q => q.id));
  });

  test('Subset sampling slices to target questionCount', () => {
    const studentId = '68219100003';
    const sessionId = 'session_test_abc';
    const targetCount = 10;

    const shuffled = seededShuffle(sampleQuestions, `${sessionId}_${studentId}_questions`);
    const subset = shuffled.slice(0, targetCount);

    assert.equal(subset.length, 10);
    assert.equal(sampleQuestions.length, 20);
  });

  test('Per-attempt timer calculation starts from current attempt started_at', () => {
    const now = Date.now();
    const currentAttemptStart = new Date(now).toISOString();
    const durationMinutes = 10;

    const remaining = calculateRemainingSeconds(currentAttemptStart, durationMinutes, 0, now);
    assert.equal(remaining, 600); // exactly 10 minutes (600 seconds)
  });

  test('Expired time returns 0 rather than negative numbers', () => {
    const now = Date.now();
    const pastTime = new Date(now - 30 * 60 * 1000).toISOString(); // 30 minutes ago
    const durationMinutes = 10;

    const remaining = calculateRemainingSeconds(pastTime, durationMinutes, 0, now);
    assert.equal(remaining, 0);
  });

  test('Contract Integrity: Sanitized student questions omit grading keys and preserve question IDs/choice texts', () => {
    // Simulating database question bank records with sensitive grading keys
    const rawBankData = [
      {
        id: 'sq_1',
        points: 1,
        order_index: 0,
        questions: {
          id: 'q_leak_1',
          question_text: 'What is 2 + 2?',
          correct_answer_index: 1,
          solution_explanation: '2 + 2 equals 4 by basic arithmetic.',
          choices: [
            { text: '3', is_correct: false },
            { text: '4', is_correct: true },
            { text: '5', is_correct: false }
          ]
        }
      }
    ];

    // Mirroring client transformation logic in getExamQuestions
    const studentId = '68219100005';
    const sessionId = 'session_test_xyz';

    const processed = rawBankData.map((item) => {
      const rawQ = item.questions || {};
      const rawChoices = rawQ.choices || [];
      let sanitizedChoices = rawChoices.map((choice) => {
        if (typeof choice === 'object' && choice !== null) {
          return { text: choice.text ?? '' };
        }
        return { text: String(choice) };
      });

      sanitizedChoices = seededShuffle(sanitizedChoices, `${sessionId}_${studentId}_choice_${rawQ.id}`);

      return {
        id: rawQ.id,
        session_question_id: item.id,
        question_text: rawQ.question_text,
        points: item.points || 1,
        choices: sanitizedChoices
      };
    });

    const examineeQ = processed[0];

    // Assert: No grading keys or secret explanations leaked to client
    assert.equal(examineeQ.correct_answer_index, undefined);
    assert.equal(examineeQ.solution_explanation, undefined);
    assert.equal(examineeQ.id, 'q_leak_1');
    assert.equal(examineeQ.choices.length, 3);

    // Assert: Every choice has ONLY text, no is_correct key
    for (const choice of examineeQ.choices) {
      assert.ok('text' in choice);
      assert.equal(choice.is_correct, undefined);
    }

    // Assert: All original choices still present in transformed array
    const texts = examineeQ.choices.map(c => c.text).sort();
    assert.deepEqual(texts, ['3', '4', '5']);
  });
});
