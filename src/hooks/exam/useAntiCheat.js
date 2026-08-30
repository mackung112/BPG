import { useState, useEffect, useRef } from 'react';
import { updateParticipantStatus } from '../../services/examStudentService';

const SLEEP_THRESHOLD_MS = 30000; // 30 seconds

export function useAntiCheat({
  sessionId,
  studentId,
  sessionMode,
  initialWarnings,
  onSuspended,
  onAutoSubmit,
  onWarning,
  onSleep,
  isActive
}) {
  const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
  const cheatingFlag = useRef(false);
  const violationCountRef = useRef(initialWarnings || 0);
  const gracePeriodRef = useRef(true);
  const hiddenTimestampRef = useRef(null);

  useEffect(() => {
    violationCountRef.current = initialWarnings || 0;
  }, [initialWarnings]);

  useEffect(() => {
    if (!isActive) return;

    // Grace period for browser fullscreen prompts
    const graceTimer = setTimeout(() => {
      gracePeriodRef.current = false;
    }, 10000);

    const handleViolation = (reason) => {
      if (cheatingFlag.current) return;

      violationCountRef.current += 1;

      // ยิงข้อมูลอัปเดตความประพฤติเข้าฐานข้อมูลเสมอ เพื่อให้ Dashboard ครูอัปเดตแบบ Realtime ไม่ว่าจะเป็นโหมดไหน
      updateParticipantStatus(sessionId, studentId, { warnings_count: violationCountRef.current }).catch(console.error);

      if (sessionMode === 'online') {
        if (violationCountRef.current < 3) {
          onWarning(`⚠️ คำเตือน: ระบบตรวจพบการออกจากหน้าจอข้อสอบ (เตือนครั้งที่ ${violationCountRef.current}/2)`);
        } else {
          cheatingFlag.current = true;
          onAutoSubmit();
        }
      } else {
        if (violationCountRef.current <= 3) {
          onWarning('⚠️ คำเตือน: ระบบตรวจพบการออกจากหน้าจอข้อสอบ');
        } else {
          cheatingFlag.current = true;
          onSuspended(reason || 'สลับหน้าต่างหรือออกจากหน้าจอข้อสอบเกินที่ระบบอนุญาต');
        }
      }
    };

    const handleVisibilityChange = () => {
      if (gracePeriodRef.current) return;

      if (document.hidden) {
        hiddenTimestampRef.current = Date.now();
      } else {
        const hiddenDuration = hiddenTimestampRef.current ? Date.now() - hiddenTimestampRef.current : 0;
        hiddenTimestampRef.current = null;

        if (hiddenDuration > SLEEP_THRESHOLD_MS) {
          const lostSeconds = Math.floor(hiddenDuration / 1000);
          onSleep(lostSeconds);
        } else if (hiddenDuration > 0) {
          handleViolation('ออกจากหน้าต่างข้อสอบ หรือสลับแท็บเบราว์เซอร์');
        }
      }
    };

    const handleWindowBlur = () => {
      if (gracePeriodRef.current) return;
      if (!cheatingFlag.current && !document.hidden) {
        handleViolation('คลิกออกนอกหน้าจอข้อสอบ หรือสลับโปรแกรม');
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      onWarning('🚫 ไม่อนุญาตให้คลิกขวาในห้องสอบ');
      return false;
    };

    const handleCopyCutPaste = (e) => {
      e.preventDefault();
      onWarning(`🚫 ไม่อนุญาตให้${e.type === 'copy' ? 'คัดลอก' : e.type === 'cut' ? 'ตัด' : 'วาง'}ข้อความ`);
      return false;
    };

    const handleSelectDrag = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'F12' || e.key === 'F5') {
        e.preventDefault();
        onWarning('🚫 ไม่อนุญาตให้ใช้ปุ่มฟังก์ชันนี้');
        return false;
      }
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (['c', 'v', 'x', 'a', 'u', 's', 'p', 'r', 'j', 'i'].includes(key)) {
          e.preventDefault();
          onWarning(`🚫 ไม่อนุญาตให้ใช้คีย์ลัด Ctrl+${key.toUpperCase()}`);
          return false;
        }
      }
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        if (!cheatingFlag.current) {
            cheatingFlag.current = true;
            onSuspended('พยายามใช้ Alt+Tab สลับหน้าต่าง');
        }
        return false;
      }
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'ข้อสอบยังดำเนินอยู่ หากออกจากหน้านี้จะถือว่าสิ้นสุดการสอบ';
      return e.returnValue;
    };

    const handlePageHide = () => {
      // ส่งสัญญาณเฮือกสุดท้ายก่อนโดนตัดจบ ว่านร.ออกจากหน้าเพจ (เน็ตตัด / ปิดจอ) 
      // เพื่อให้จอของครูขึ้นสถานะ Disconnected ทันที
      updateParticipantStatus(sessionId, studentId, { status: 'disconnected' }).catch(() => {});
    };

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      onWarning('⚠️ หากต้องการส่งข้อสอบ กรุณากดปุ่ม "ส่งข้อสอบ" ด้านล่าง');
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCutPaste);
    document.addEventListener('cut', handleCopyCutPaste);
    document.addEventListener('paste', handleCopyCutPaste);
    document.addEventListener('selectstart', handleSelectDrag);
    document.addEventListener('dragstart', handleSelectDrag);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearTimeout(graceTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCutPaste);
      document.removeEventListener('cut', handleCopyCutPaste);
      document.removeEventListener('paste', handleCopyCutPaste);
      document.removeEventListener('selectstart', handleSelectDrag);
      document.removeEventListener('dragstart', handleSelectDrag);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isActive, sessionMode, sessionId, studentId, onSuspended, onAutoSubmit, onWarning, onSleep]);

  const requestFullscreen = async () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      setIsFullscreen(true);
    } catch (e) {
      console.warn('Fullscreen blocked:', e.message);
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      try { await document.exitFullscreen(); } catch (_) {}
    }
  };

  return { isFullscreen, requestFullscreen, exitFullscreen };
}
