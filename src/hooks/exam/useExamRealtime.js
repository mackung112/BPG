import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function useExamRealtime({
  sessionId,
  studentId,
  onSessionUpdate,
  onParticipantUpdate,
  isActive = true
}) {
  useEffect(() => {
    if (!isActive || !sessionId) return;

    let sessionSub = null;
    let participantSub = null;

    if (onSessionUpdate) {
      sessionSub = supabase
        .channel(`session_update_${sessionId}`)
        .on('postgres_changes', { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'exam_sessions', 
            filter: `id=eq.${sessionId}` 
        }, (payload) => {
            onSessionUpdate(payload.new);
        })
        .subscribe();
    }

    if (onParticipantUpdate && studentId) {
      participantSub = supabase
        .channel(`lobby_participant_${studentId}`)
        .on('postgres_changes', { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'exam_participants', 
            filter: `session_id=eq.${sessionId}` 
        }, (payload) => {
            if (payload.new.student_id === studentId) {
                onParticipantUpdate(payload.new);
            }
        })
        .subscribe();
    }

    return () => {
      if (sessionSub) supabase.removeChannel(sessionSub);
      if (participantSub) supabase.removeChannel(participantSub);
    };
  }, [sessionId, studentId, onSessionUpdate, onParticipantUpdate, isActive]);
}

export function useExamLobbyRealtime({
  sessionId,
  studentId,
  onSessionActive,
  onSessionCompleted,
  onParticipantStatusChange,
  isActive = true
}) {
  useEffect(() => {
    if (!isActive || !sessionId || !studentId) return;

    const sessionSub = supabase
      .channel(`lobby_session_${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'exam_sessions', filter: `id=eq.${sessionId}` },
        (payload) => {
          if (payload.new.status === 'active') {
            onSessionActive(payload.new);
          } else if (payload.new.status === 'completed') {
            onSessionCompleted(payload.new);
          }
        }
      )
      .subscribe();

    const participantSub = supabase
      .channel(`lobby_participant_${studentId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'exam_participants', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          if (payload.new.student_id === studentId) {
            onParticipantStatusChange(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sessionSub);
      supabase.removeChannel(participantSub);
    };
  }, [sessionId, studentId, onSessionActive, onSessionCompleted, onParticipantStatusChange, isActive]);
}
