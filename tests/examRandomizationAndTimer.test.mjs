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
});
