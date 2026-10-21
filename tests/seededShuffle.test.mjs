import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { seededShuffle } from '../src/utils/seededShuffle.js';

describe('Seeded Randomization Utility', () => {
  const original = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  test('produces identical output for identical seed', () => {
    const seed = 'session_123_student_456';
    const run1 = seededShuffle(original, seed);
    const run2 = seededShuffle(original, seed);

    assert.deepEqual(run1, run2);
    assert.equal(run1.length, original.length);
  });

  test('produces different permutations for different student seeds', () => {
    const student1Seed = 'session_123_student_001';
    const student2Seed = 'session_123_student_002';

    const run1 = seededShuffle(original, student1Seed);
    const run2 = seededShuffle(original, student2Seed);

    assert.notDeepEqual(run1, run2);
  });

  test('does not mutate original array', () => {
    const copy = [...original];
    seededShuffle(original, 'test_seed');
    assert.deepEqual(original, copy);
  });

  test('handles edge cases gracefully (empty, single item, null)', () => {
    assert.deepEqual(seededShuffle([], 'seed'), []);
    assert.deepEqual(seededShuffle(['X'], 'seed'), ['X']);
    assert.deepEqual(seededShuffle(null, 'seed'), []);
  });
});
