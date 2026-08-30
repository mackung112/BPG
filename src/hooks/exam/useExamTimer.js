import { useState, useEffect, useRef } from 'react';

export function useExamTimer(initialTimeLeft, onSubmit, isActive = true) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const lastTickTimeRef = useRef(Date.now());

  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft === null || timeLeft <= 0) {
      if (timeLeft === 0 && isActive) {
        onSubmit(true); // Auto-submit when time is up
      }
      return;
    }

    lastTickTimeRef.current = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const drift = Math.floor((now - lastTickTimeRef.current) / 1000);
      lastTickTimeRef.current = now;
      setTimeLeft((prev) => Math.max(0, prev - Math.max(1, drift)));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onSubmit, isActive]);

  const addTime = (seconds) => {
    setTimeLeft((prev) => prev + seconds);
  };

  const deductTime = (seconds) => {
    setTimeLeft((prev) => Math.max(0, (prev || 0) - seconds));
  };

  return { timeLeft, setTimeLeft, addTime, deductTime };
}
