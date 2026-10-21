import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Calculates remaining seconds based on server start time and duration.
 */
export function calculateRemainingSeconds(startedAt, durationMinutes, extraTimeMinutes = 0, serverNow = Date.now()) {
  if (!startedAt || durationMinutes === undefined || durationMinutes === null) return null;
  const startMs = new Date(startedAt).getTime();
  if (isNaN(startMs)) return null;

  const totalDurationMs = (Number(durationMinutes) + Number(extraTimeMinutes || 0)) * 60 * 1000;
  const endMs = startMs + totalDurationMs;
  const remainingMs = endMs - serverNow;
  return Math.max(0, Math.floor(remainingMs / 1000));
}

/**
 * Hook for managing the exam timer.
 * Can be initialized with a simple number (initialTimeLeft) or server config { startedAt, durationMinutes, extraTimeMinutes }.
 */
export function useExamTimer(configOrInitialSeconds, onSubmit, isActive = true) {
  const isServerMode = typeof configOrInitialSeconds === 'object' && configOrInitialSeconds !== null;
  
  const startedAt = isServerMode ? configOrInitialSeconds.startedAt : null;
  const durationMinutes = isServerMode ? configOrInitialSeconds.durationMinutes : null;
  const extraTimeMinutes = isServerMode ? (configOrInitialSeconds.extraTimeMinutes || 0) : 0;

  const onSubmitRef = useRef(onSubmit);
  onSubmitRef.current = onSubmit;

  const getInitialSeconds = useCallback(() => {
    if (isServerMode) {
      return calculateRemainingSeconds(startedAt, durationMinutes, extraTimeMinutes);
    }
    return typeof configOrInitialSeconds === 'number' ? configOrInitialSeconds : null;
  }, [isServerMode, startedAt, durationMinutes, extraTimeMinutes, configOrInitialSeconds]);

  const [timeLeft, setTimeLeft] = useState(getInitialSeconds);
  const submittedRef = useRef(false);
  const hadPositiveTimeRef = useRef(false);

  useEffect(() => {
    const initial = getInitialSeconds();
    setTimeLeft(initial);
    if (initial !== null && initial > 0) {
      hadPositiveTimeRef.current = true;
    }
  }, [getInitialSeconds]);

  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      if (isServerMode && startedAt && durationMinutes) {
        const remaining = calculateRemainingSeconds(startedAt, durationMinutes, extraTimeMinutes);
        setTimeLeft(remaining);

        if (remaining !== null && remaining > 0) {
          hadPositiveTimeRef.current = true;
        }

        // Only auto-submit if the timer actually ran down (had positive time before reaching 0)
        if (remaining !== null && remaining <= 0 && hadPositiveTimeRef.current && !submittedRef.current) {
          submittedRef.current = true;
          onSubmitRef.current?.(true);
        }
      } else {
        setTimeLeft((prev) => {
          if (prev === null) return null;
          if (prev > 0) {
            hadPositiveTimeRef.current = true;
          }
          if (prev <= 1) {
            if (hadPositiveTimeRef.current && !submittedRef.current) {
              submittedRef.current = true;
              onSubmitRef.current?.(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isActive, isServerMode, startedAt, durationMinutes, extraTimeMinutes]);

  const addTime = (seconds) => {
    setTimeLeft((prev) => (prev !== null ? prev + seconds : seconds));
  };

  const deductTime = (seconds) => {
    setTimeLeft((prev) => (prev !== null ? Math.max(0, prev - seconds) : 0));
  };

  return { timeLeft, setTimeLeft, addTime, deductTime };
}
