-- Admin users table (BCrypt via pgcrypto)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default admin
INSERT INTO admins (username, password_hash)
VALUES ('carrer_admin', crypt('admin_901290', gen_salt('bf', 12)))
ON CONFLICT (username)
DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = NOW();
