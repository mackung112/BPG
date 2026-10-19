import { useState, useEffect, useRef } from 'react';
import { updateParticipantStatus } from '../../services/examStudentService.js';

const SLEEP_THRESHOLD_MS = 30000; // 30 seconds

/**
 * Detects whether the current environment is a touch device, mobile phone, or iPad.
 */
export function isMobileOrTouchDevice(
  ua = (typeof navigator !== 'undefined' ? navigator.userAgent : ''),
  touchPoints = (typeof navigator !== 'undefined' ? navigator.maxTouchPoints : 0)
) {
  if (!ua) return false;
  const isMobileOS = /iPad|iPhone|iPod|Android/i.test(ua);
  const isIPadOS = /Macintosh/i.test(ua) && touchPoints > 1;
  return isMobileOS || isIPadOS;
}

/**
 * Maps strike number to progressive policy action.
 */
export function getStrikeAction(strike) {
  if (strike === 1) {
    return {
      strike: 1,
      action: 'warning',
      message: 'เตือนครั้งที่ 1/3: กรุณาอย่าสลับหน้าจอหรือคลิกออกนอกหน้าต่างข้อสอบ'
    };
  }
  if (strike === 2) {
    return {
      strike: 2,
      action: 'warning',
      message: 'เตือนครั้งที่ 2/3: คำเตือนสุดท้าย หากเกิดอีกครั้งหน้าจอจะถูกล็อกทันที'
    };
  }
  return {
    strike: Math.max(3, strike),
    action: 'suspend',
    message: 'การสอบถูกระงับ: ตรวจพบการออกจากหน้าจอข้อสอบครบ 3 ครั้ง'
  };
}

export function useAntiCheat({
  sessionId,
  studentId,
  sessionMode,
  initialWarnings = 0,
  onSuspended,
  onAutoSubmit,
  onWarning,
  onSleep,
  onStrikeAlert, // callback to broadcast alert to teacher room
  isActive = true
}) {
  const isMobile = isMobileOrTouchDevice();
  const [isFullscreen, setIsFullscreen] = useState(() => {
    if (typeof document === 'undefined') return true;
    return isMobile ? true : !!document.fullscreenElement;
  });

  const cheatingFlag = useRef(false);
  const violationCountRef = useRef(initialWarnings || 0);
  const gracePeriodRef = useRef(true);
  const hiddenTimestampRef = useRef(null);

  useEffect(() => {
    violationCountRef.current = initialWarnings || 0;
  }, [initialWarnings]);

  useEffect(() => {
    if (!isActive) return;

    // Grace period for browser fullscreen / initial focus transitions
    const graceTimer = setTimeout(() => {
      gracePeriodRef.current = false;
    }, 10000);

    const handleViolation = (reason) => {
      if (cheatingFlag.current) return;

      violationCountRef.current += 1;
      const count = violationCountRef.current;
      const strikePolicy = getStrikeAction(count);

      // Persist strike in database for realtime dashboard tracking
      updateParticipantStatus(sessionId, studentId, {
        warnings_count: count,
        strike_count: count
      }).catch(console.error);

      // Notify realtime channel if provided
      onStrikeAlert?.({
        strikeCount: count,
        reason,
        timestamp: new Date().toISOString()
      });

      if (strikePolicy.action === 'warning') {
        onWarning?.(strikePolicy.message);
      } else {
        cheatingFlag.current = true;
        if (sessionMode === 'online') {
          onAutoSubmit?.();
        } else {
          onSuspended?.(reason || strikePolicy.message);
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
          onSleep?.(lostSeconds);
        } else if (hiddenDuration > 1000) { // small buffer for system flickers
          handleViolation('ออกจากหน้าต่างข้อสอบ หรือสลับแท็บเบราว์เซอร์');
        }
      }
    };

    const handleWindowBlur = () => {
      if (gracePeriodRef.current || isMobile) return;
      if (!cheatingFlag.current && !document.hidden) {
        handleViolation('คลิกออกนอกหน้าจอข้อสอบ หรือสลับโปรแกรม');
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      onWarning?.('🚫 ไม่อนุญาตให้คลิกขวาในห้องสอบ');
      return false;
    };

    const handleCopyCutPaste = (e) => {
      e.preventDefault();
      onWarning?.(`🚫 ไม่อนุญาตให้${e.type === 'copy' ? 'คัดลอก' : e.type === 'cut' ? 'ตัด' : 'วาง'}ข้อความ`);
      return false;
    };

    const handleSelectDrag = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'F12' || e.key === 'F5' || e.key === 'F11') {
        e.preventDefault();
        onWarning?.('🚫 ไม่อนุญาตให้ใช้ปุ่มฟังก์ชันนี้ในห้องสอบ');
        return false;
      }

      if (e.key === 'PrintScreen') {
        e.preventDefault();
        onWarning?.('🚫 ไม่อนุญาตให้แคปภาพหน้าจอในห้องสอบ');
        return false;
      }

      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (e.shiftKey && ['i', 'j', 'c'].includes(key)) {
          e.preventDefault();
          onWarning?.('🚫 ไม่อนุญาตให้เปิดเครื่องมือสำหรับนักพัฒนา');
          return false;
        }
        if (['c', 'v', 'x', 'a', 'u', 's', 'p', 'r', 'j', 'i', 'w', 'q'].includes(key)) {
          e.preventDefault();
          onWarning?.(`🚫 ไม่อนุญาตให้ใช้คีย์ลัด Ctrl+${key.toUpperCase()}`);
          return false;
        }
      }

      if (e.altKey && (e.key === 'Tab' || e.key === 'F4')) {
        e.preventDefault();
        if (!cheatingFlag.current) {
          cheatingFlag.current = true;
          onSuspended?.('พยายามใช้คีย์ลัดสลับหน้าต่างหรือปิดโปรแกรม');
        }
        return false;
      }
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'ข้อสอบยังดำเนินอยู่ หากออกจากหน้านี้อาจทำให้ผลการสอบถูกยุติ';
      return e.returnValue;
    };

    const handlePageHide = () => {
      updateParticipantStatus(sessionId, studentId, { status: 'disconnected' }).catch(() => {});
    };

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      onWarning?.('⚠️ หากต้องการส่งข้อสอบ กรุณากดปุ่ม "ส่งข้อสอบ" ภายในหน้าจอ');
    };

    const handleFullscreenChange = () => {
      if (!isMobile) {
        setIsFullscreen(!!document.fullscreenElement);
      }
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
  }, [isActive, sessionMode, sessionId, studentId, onSuspended, onAutoSubmit, onWarning, onSleep, onStrikeAlert, isMobile]);

  const requestFullscreen = async () => {
    if (isMobile) {
      setIsFullscreen(true);
      return;
    }
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      setIsFullscreen(true);
    } catch (e) {
      console.warn('Fullscreen blocked:', e.message);
      setIsFullscreen(true);
      onWarning?.('⚠️ เบราว์เซอร์ไม่อนุญาตให้เปิดโหมดเต็มจอ ระบบอนุญาตให้ทำข้อสอบต่อ');
    }
  };

  const exitFullscreen = async () => {
    if (typeof document !== 'undefined' && document.fullscreenElement && document.exitFullscreen) {
      try { await document.exitFullscreen(); } catch (_) {}
    }
  };

  return { isFullscreen, requestFullscreen, exitFullscreen, isMobile };
}
