import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { examAdminService } from '../../services/examAdminService';

export function useExamResultsAdmin() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [results, setResults] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allStudents, setAllStudents] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllStudents = async () => {
    try {
      const data = await examAdminService.fetchAllStudents();
      if (data) setAllStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const data = await examAdminService.fetchExamSessions();
      if (data) {
        setSessions(data);
        if (!selectedSession && data.length > 0) {
          setSelectedSession(data[0]);
        }
      }
    } catch (err) {
      setError('โหลดรายการสอบไม่สำเร็จ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchResultsAndParticipants = async (sessionId) => {
    try {
      const rData = await examAdminService.fetchExamResultsFull(sessionId);
      if (rData) setResults(rData);

      const pData = await examAdminService.fetchExamParticipantsForResults(sessionId);
      if (pData) setParticipants(pData);
    } catch (err) {
      setError('โหลดคะแนนไม่สำเร็จ: ' + err.message);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchAllStudents();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchResultsAndParticipants(selectedSession.id);

      const channel = supabase
        .channel(`admin_exam_results_${selectedSession.id}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${selectedSession.id}` }, () => {
          fetchResultsAndParticipants(selectedSession.id);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'exam_results', filter: `session_id=eq.${selectedSession.id}` }, () => {
          fetchResultsAndParticipants(selectedSession.id);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setResults([]);
      setParticipants([]);
    }
  }, [selectedSession?.id]);

  return {
    sessions,
    selectedSession,
    setSelectedSession,
    results,
    participants,
    loading,
    allStudents,
    error,
    setError,
    fetchSessions,
    fetchResultsAndParticipants,
  };
}
