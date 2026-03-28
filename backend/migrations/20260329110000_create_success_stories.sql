-- Showcase success stories that the admin can manage
CREATE TABLE IF NOT EXISTS success_stories (
    id BIGSERIAL PRIMARY KEY,
    student_name TEXT NOT NULL,
    exam TEXT NOT NULL,
    score TEXT NOT NULL,
    image_url TEXT NOT NULL,
    highlight TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_success_stories_created_at ON success_stories (created_at DESC);

CREATE OR REPLACE FUNCTION set_success_story_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_success_story_updated_at ON success_stories;
CREATE TRIGGER trg_success_story_updated_at
BEFORE UPDATE ON success_stories
FOR EACH ROW
EXECUTE PROCEDURE set_success_story_updated_at();
