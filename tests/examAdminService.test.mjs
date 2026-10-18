import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { supabase } from '../src/lib/supabase.js';
import { examAdminService } from '../src/services/examAdminService.js';

describe('Ticket 06: examAdminService - Broadcast, Time Extension & Suspension Resolution', () => {
  test('broadcastAnnouncement sends realtime payload with message and timestamp', async () => {
    let broadcastSent = null;
    const originalChannel = supabase.channel;

    supabase.channel = (channelName) => {
      assert.equal(channelName, 'room:exam_sess_1');
      return {
        send: (payload) => {
          broadcastSent = payload;
          return Promise.resolve({ error: null });
        }
      };
    };

    try {
      await examAdminService.broadcastAnnouncement('sess_1', 'เหลือเวลาสอบอีก 5 นาที', 'ครูแม็ค');
      assert.equal(broadcastSent.type, 'broadcast');
      assert.equal(broadcastSent.event, 'broadcast_announcement');
      assert.equal(broadcastSent.payload.message, 'เหลือเวลาสอบอีก 5 นาที');
      assert.equal(broadcastSent.payload.teacherName, 'ครูแม็ค');
    } finally {
      supabase.channel = originalChannel;
    }
  });

  test('addExtraTimeToStudent updates extra_time_minutes in participant record', async () => {
    let updateRecord = null;
    const originalFrom = supabase.from;
    const originalChannel = supabase.channel;

    supabase.channel = () => ({
      send: () => Promise.resolve({ error: null })
    });

    supabase.from = (table) => {
      assert.equal(table, 'exam_participants');
      return {
        select: () => ({
          eq: () => ({
            maybeSingle: () => Promise.resolve({
              data: { id: 'p_1', extra_time_minutes: 5, student_id: 'st_1', session_id: 'sess_1' },
              error: null
            })
          })
        }),
        update: (payload) => {
          updateRecord = payload;
          return {
            eq: () => Promise.resolve({ data: null, error: null })
          };
        }
      };
    };

    try {
      const res = await examAdminService.addExtraTimeToStudent('p_1', 10);
      assert.equal(updateRecord.extra_time_minutes, 15);
      assert.equal(res.newTotal, 15);
    } finally {
      supabase.from = originalFrom;
      supabase.channel = originalChannel;
    }
  });

  test('resolveSuspension handles resume and force_submit actions', async () => {
    let updatePayload = null;
    let rpcCalled = false;
    const originalFrom = supabase.from;
    const originalRpc = supabase.rpc;
    const originalChannel = supabase.channel;

    supabase.channel = () => ({
      send: () => Promise.resolve({ error: null })
    });

    supabase.from = (table) => {
      assert.equal(table, 'exam_participants');
      return {
        update: (payload) => {
          updatePayload = payload;
          return {
            eq: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
          };
        }
      };
    };

    supabase.rpc = (fnName, params) => {
      rpcCalled = true;
      assert.equal(fnName, 'submit_exam_result');
      assert.equal(params.p_is_suspended, true);
      return Promise.resolve({ data: { success: true }, error: null });
    };

    try {
      // Test Resume
      await examAdminService.resolveSuspension('sess_1', 'st_1', 'resume');
      assert.equal(updatePayload.status, 'testing');
      assert.equal(updatePayload.allow_rejoin, true);
      assert.equal(updatePayload.strike_count, 0);

      // Test Force Submit
      await examAdminService.resolveSuspension('sess_1', 'st_1', 'force_submit', 'Suspect tab switching');
      assert.equal(rpcCalled, true);
    } finally {
      supabase.from = originalFrom;
      supabase.rpc = originalRpc;
      supabase.channel = originalChannel;
    }
  });
});
