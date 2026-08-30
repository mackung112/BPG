import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { examAdminService } from '../../services/examAdminService';

export function useExamControl() {
  const [banks, setBanks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [examResultsMap, setExamResultsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const bData = await examAdminService.fetchQuestionBanks();
      if (bData) setBanks(bData);
      await fetchSessions();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const data = await examAdminService.fetchExamSessions();
      if (data) {
        setSessions(data);
        if (activeSession) {
          const updated = data.find(s => s.id === activeSession.id);
          if (updated) setActiveSession(updated);
          else if (data.length > 0) setActiveSession(data[0]);
        } else if (data.length > 0) {
          setActiveSession(data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchParticipants = async (sessionId) => {
    try {
      const data = await examAdminService.fetchExamParticipants(sessionId);
      if (data) setParticipants(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchExamResults = async (sid) => {
    try {
      const data = await examAdminService.fetchExamResultsValid(sid);
      if (data) {
        const map = {};
        for (const r of data) {
          if (!map[r.student_id]) map[r.student_id] = [];
          map[r.student_id].push(r);
        }
        setExamResultsMap(map);
      }
    } catch (e) {
      console.error('Error fetching exam results:', e);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    let subscription = null;
    if (activeSession) {
      fetchParticipants(activeSession.id);
      fetchExamResults(activeSession.id);
      
      subscription = supabase
        .channel(`exam_room_${activeSession.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${activeSession.id}` },
          () => {
            fetchParticipants(activeSession.id);
            fetchExamResults(activeSession.id);
          }
        )
        .subscribe();
    } else {
      setParticipants([]);
    }

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [activeSession?.id]);

  const hasPassed = (studentId) => {
    const results = examResultsMap[studentId] || [];
    if (results.length === 0) return false;
    const bestScore = Math.max(...results.map(r => Number(r.score)));
    const totalScore = Number(activeSession?.total_score || 10);
    const passingPct = activeSession?.passing_percentage || 50;
    return (bestScore / totalScore * 100) >= passingPct;
  };

  const forceCompleteParticipants = async (sessionId) => {
    try {
      await supabase
        .from('exam_participants')
        .update({ status: 'completed', allow_rejoin: false })
        .eq('session_id', sessionId)
        .in('status', ['testing', 'waiting', 'cheating', 'disconnected']);
    } catch (e) {
      console.error('Error force completing participants:', e);
    }
  };

  const allowAllParticipantsRejoin = async (sessionId) => {
    try {
      await supabase
        .from('exam_participants')
        .update({ allow_rejoin: true, rejoin_mode: 'continue', status: 'waiting' })
        .eq('session_id', sessionId);
    } catch (e) {
      console.error('Error allowing rejoin:', e);
    }
  };

  const broadcastKick = async (sessionId, studentId) => {
    try {
      const channel = supabase.channel(`exam_room_${sessionId}`);
      // Subscribe if not already? Since we just want to broadcast, we might need an active channel.
      // But we already have a subscription for postgres_changes on this channel name in useEffect.
      await channel.send({
        type: 'broadcast',
        event: 'kick_participant',
        payload: { student_id: studentId }
      });
      // Optional: short delay
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error('Error broadcasting kick:', e);
    }
  };

  return {
    banks,
    sessions,
    activeSession,
    setActiveSession,
    participants,
    examResultsMap,
    loading,
    fetchSessions,
    fetchParticipants,
    fetchExamResults,
    hasPassed,
    forceCompleteParticipants,
    allowAllParticipantsRejoin,
    broadcastKick,
  };
}
