import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { isMobileOrTouchDevice, getStrikeAction } from '../src/hooks/exam/useAntiCheat.js';

describe('Ticket 05: useAntiCheat - Device Detection & 3-Strike Escalation', () => {
  test('isMobileOrTouchDevice correctly identifies iOS, Android, and iPadOS devices', () => {
    // iPhone UA
    const iPhoneUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15';
    assert.equal(isMobileOrTouchDevice(iPhoneUA, 5), true);

    // iPad with touch points
    const iPadUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15';
    assert.equal(isMobileOrTouchDevice(iPadUA, 5), true);

    // Standard Desktop Windows/Mac
    const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    assert.equal(isMobileOrTouchDevice(desktopUA, 0), false);
  });

  test('getStrikeAction returns progressive warnings and suspends on strike 3', () => {
    assert.deepEqual(getStrikeAction(1), { strike: 1, action: 'warning', message: 'เตือนครั้งที่ 1/3: กรุณาอย่าสลับหน้าจอหรือคลิกออกนอกหน้าต่างข้อสอบ' });
    assert.deepEqual(getStrikeAction(2), { strike: 2, action: 'warning', message: 'เตือนครั้งที่ 2/3: คำเตือนสุดท้าย หากเกิดอีกครั้งหน้าจอจะถูกล็อกทันที' });
    assert.deepEqual(getStrikeAction(3), { strike: 3, action: 'suspend', message: 'การสอบถูกระงับ: ตรวจพบการออกจากหน้าจอข้อสอบครบ 3 ครั้ง' });
    assert.deepEqual(getStrikeAction(4), { strike: 4, action: 'suspend', message: 'การสอบถูกระงับ: ตรวจพบการออกจากหน้าจอข้อสอบครบ 3 ครั้ง' });
  });
});
