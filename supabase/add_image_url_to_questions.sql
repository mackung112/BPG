-- Add image_url to questions table if not exists
ALTER TABLE IF EXISTS questions
  ADD COLUMN IF NOT EXISTS image_url TEXT;
