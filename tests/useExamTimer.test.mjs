import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateRemainingSeconds } from '../src/hooks/exam/useExamTimer.js';

describe('Ticket 03: useExamTimer - Server-Authoritative Calculation', () => {
  test('calculateRemainingSeconds calculates accurate countdown from startedAt and duration', () => {
    const startedAt = '2026-10-18T10:00:00.000Z';
    const durationMinutes = 60; // 1 hour
    const extraTimeMinutes = 5; // +5 mins
    
    // Test 1: Exactly 10 minutes into the exam
    const mockNow1 = new Date('2026-10-18T10:10:00.000Z').getTime();
    const rem1 = calculateRemainingSeconds(startedAt, durationMinutes, extraTimeMinutes, mockNow1);
    // (65 - 10) minutes = 55 minutes * 60 = 3300 seconds
    assert.equal(rem1, 3300);

    // Test 2: Exactly at end time
    const mockNow2 = new Date('2026-10-18T11:05:00.000Z').getTime();
    const rem2 = calculateRemainingSeconds(startedAt, durationMinutes, extraTimeMinutes, mockNow2);
    assert.equal(rem2, 0);

    // Test 3: Past end time should be 0, not negative
    const mockNow3 = new Date('2026-10-18T11:10:00.000Z').getTime();
    const rem3 = calculateRemainingSeconds(startedAt, durationMinutes, extraTimeMinutes, mockNow3);
    assert.equal(rem3, 0);
  });
});
