# 0004: Device-Adaptive Anti-Cheat and Unified Realtime Channel

## Context
1. Examinees take tests across diverse devices: Desktops, Android tablets, and iPads/iPhones. The HTML5 Fullscreen API is notoriously unsupported or broken for container elements on iOS Safari. Forcing fullscreen checks on iOS produces false-positive cheating strikes.
2. In-exam communication previously used disparate polling or scattered channels, increasing Supabase connection usage.

## Decision
1. **Device-Adaptive Anti-Cheat**: On iOS Safari and small mobile viewports, the anti-cheat monitor disables forced fullscreen lock and relies strictly on `document.visibilitychange` and `window.blur` events to detect app switching or backgrounding.
2. **Unified Realtime Channel**: All real-time telemetry for a session (teacher announcements, student strike signals, per-student time extensions, and session closures) is multiplexed over a single Supabase Realtime broadcast channel: `room:exam_${sessionId}`.

## Consequences
- No false-positive locks or crashes on iPad/iPhone student devices.
- Dramatically reduced Supabase Realtime connection overhead by sharing a single broadcast channel per exam session.
