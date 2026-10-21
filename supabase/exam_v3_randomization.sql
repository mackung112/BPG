-- ==============================================================================
-- Exam System V3 Migration: Seeded Randomization & Onsite Attempt Quota Support
-- ==============================================================================

ALTER TABLE IF EXISTS exam_sessions
  ADD COLUMN IF NOT EXISTS shuffle_questions BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS shuffle_choices BOOLEAN DEFAULT true;
