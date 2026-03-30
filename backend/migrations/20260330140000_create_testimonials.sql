CREATE TABLE IF NOT EXISTS testimonials (
    id BIGSERIAL PRIMARY KEY,
    author TEXT NOT NULL,
    program TEXT NOT NULL,
    quote TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_testimonial_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_testimonial_updated_at ON testimonials;
CREATE TRIGGER trg_testimonial_updated_at
BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE PROCEDURE set_testimonial_updated_at();
