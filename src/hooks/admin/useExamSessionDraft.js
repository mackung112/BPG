import { useState, useEffect, useCallback } from 'react';

const DRAFT_STORAGE_KEY = 'exam_control_new_session_draft';

const DEFAULT_STATE = {
  sessionTitle: '',
  examConfig: null,
  timeLimit: 60,
  examMode: 'onsite',
  maxAttempts: 1,
  retakeUntilPass: false,
  passingPercentage: 50
};

const loadInitialDraft = () => {
  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_STATE,
        ...parsed
      };
    }
  } catch (err) {
    console.error('Failed to load exam session draft from localStorage:', err);
  }
  return DEFAULT_STATE;
};

export function useExamSessionDraft() {
  const [draft, setDraft] = useState(loadInitialDraft);

  // Sync state to localStorage whenever draft changes
  useEffect(() => {
    try {
      const isDefault =
        !draft.examConfig &&
        !draft.sessionTitle.trim() &&
        draft.timeLimit === 60 &&
        draft.examMode === 'onsite' &&
        draft.maxAttempts === 1 &&
        !draft.retakeUntilPass &&
        draft.passingPercentage === 50;

      if (isDefault) {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } else {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      }
    } catch (err) {
      console.error('Failed to save exam session draft to localStorage:', err);
    }
  }, [draft]);

  const setExamConfig = useCallback((config) => {
    setDraft(prev => ({ ...prev, examConfig: config }));
  }, []);

  const setSessionTitle = useCallback((title) => {
    setDraft(prev => ({ ...prev, sessionTitle: title }));
  }, []);

  const setTimeLimit = useCallback((limit) => {
    setDraft(prev => ({ ...prev, timeLimit: limit }));
  }, []);

  const setExamMode = useCallback((mode) => {
    setDraft(prev => ({ ...prev, examMode: mode }));
  }, []);

  const setMaxAttempts = useCallback((attempts) => {
    setDraft(prev => ({ ...prev, maxAttempts: attempts }));
  }, []);

  const setRetakeUntilPass = useCallback((val) => {
    setDraft(prev => ({ ...prev, retakeUntilPass: val }));
  }, []);

  const setPassingPercentage = useCallback((percentage) => {
    setDraft(prev => ({ ...prev, passingPercentage: percentage }));
  }, []);

  const resetDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setDraft(DEFAULT_STATE);
  }, []);

  return {
    examConfig: draft.examConfig,
    sessionTitle: draft.sessionTitle,
    timeLimit: draft.timeLimit,
    examMode: draft.examMode,
    maxAttempts: draft.maxAttempts,
    retakeUntilPass: draft.retakeUntilPass,
    passingPercentage: draft.passingPercentage,
    setExamConfig,
    setSessionTitle,
    setTimeLimit,
    setExamMode,
    setMaxAttempts,
    setRetakeUntilPass,
    setPassingPercentage,
    resetDraft
  };
}
