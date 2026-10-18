# 05: Device-Adaptive Anti-Cheat & Progressive 3-Strike Warning

**What to build:** 
A reliable anti-cheat monitor that adapts to the examinee's device. On iOS Safari and small touchscreen devices, forced Fullscreen lock is disabled (avoiding false-positive violations) while `visibilitychange` and window blur are actively tracked. A progressive 3-strike escalation warns the student on strikes 1 & 2, and locks the screen with an informative suspension notice on strike 3, simultaneously broadcasting a real-time strike alert to the teacher's room.

**Blocked by:** 01: Zero-Leak Question Delivery & Server-Side Grading Engine

**Status:** resolved

- [x] Update `useAntiCheat.js` with device detection (suppressing fullscreen requirements on iOS/touch devices).
- [x] Implement progressive 3-strike warning modal in `ExamRoom.jsx`.
- [x] Strike 3 transitions the exam room into a suspended screen state with an explicit message to contact the teacher.
- [x] Realtime dispatch informs teacher room of strike events with timestamps and reasons.
- [x] Test verifies device detection branches and strike escalation logic.
