/**
 * shared/index.js — Barrel Export (รวมทาง import เดียว)
 * =====================================================
 * ใช้งาน: import { SimulatorShell, ConceptCard, LogicGateSimulator, ... } from '../shared';
 *
 * หลักการ OO-style Composition:
 *   - SimulatorShell       = "Base Card Class"        (ห่อ UI ภายนอก dark mode)
 *   - ConsoleScreen        = "Terminal Renderer"       (แสดงผล output)
 *   - OptionSelector       = "Interactive Selector"    (ปุ่มตัวเลือก)
 *   - QuizEngine           = "Game State Controller"   (เกมตอบคำถาม)
 *   - AmbientBackdrop      = "Theme Layer 1 Factory"   (พื้นหลังเรืองแสง)
 *   - ConceptCard          = "Semantic Concept Card"   (การ์ดแนวคิดสีต่างกัน)
 *   - SectionBlock         = "Section Grouping Wrapper"(ตีกรอบส่วนเนื้อหา)
 *   - LogicGateSimulator   = "Visual Flow Simulator"   (จำลองตรรกะ boolean)
 */
export { default as SimulatorShell } from './SimulatorShell';
export { default as ConsoleScreen }  from './ConsoleScreen';
export { default as OptionSelector } from './OptionSelector';
export { default as QuizEngine }     from './QuizEngine';
export {
  default as AmbientBackdrop,
  PY1_BLOBS,
  PY2_BLOBS,
  PY3_BLOBS,
  PY4_BLOBS,
  SQL1_BLOBS,
} from './AmbientBackdrop';
export { default as ConceptCard }          from './ConceptCard';
export { default as ContentCard }          from './ContentCard';
export { default as SectionBlock }         from './SectionBlock';
export { default as LogicGateSimulator, computeResult } from './LogicGateSimulator';
