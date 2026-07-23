-- ============================================================
-- 13_rescue_updates.sql
-- Rescue Timeline
-- ============================================================

CREATE TABLE IF NOT EXISTS rescue_updates (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    rescue_id UUID NOT NULL
        REFERENCES rescues(id)
        ON DELETE CASCADE,

    updated_by UUID
        REFERENCES users(id)
        ON DELETE SET NULL,

    status VARCHAR(40),

    remarks TEXT,

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);