-- ============================================================
-- 03_animal_reports.sql
-- Sevana - Animal Reports
-- ============================================================

CREATE TABLE IF NOT EXISTS animal_reports (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Reporter
    reported_by UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    -- Animal Details
    animal_type VARCHAR(50) NOT NULL,
    species VARCHAR(100),
    breed VARCHAR(100),

    gender VARCHAR(20)
        CHECK (gender IN ('male','female','unknown')),

    estimated_age VARCHAR(50),

    color VARCHAR(100),

    -- Emergency

    severity VARCHAR(20) NOT NULL DEFAULT 'medium'
        CHECK (
            severity IN (
                'low',
                'medium',
                'high',
                'critical'
            )
        ),

    condition TEXT NOT NULL,

    -- Location

    latitude DOUBLE PRECISION NOT NULL,

    longitude DOUBLE PRECISION NOT NULL,

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    landmark TEXT,

    -- Rescue Status

    status VARCHAR(40)
        NOT NULL
        DEFAULT 'reported'
        CHECK (
            status IN (
                'reported',
                'responders_joining',
                'responder_on_site',
                'first_aid_given',
                'transport_in_progress',
                'at_veterinary_clinic',
                'under_treatment',
                'recovering',
                'rescued',
                'closed'
            )
        ),

    responder_id UUID
        REFERENCES users(id)
        ON DELETE SET NULL,

    -- Media

    cover_image TEXT,

    image_count INTEGER
        DEFAULT 0
        CHECK (image_count >= 0),

    video_url TEXT,

    -- AI Ready

    ai_detected_species VARCHAR(100),

    ai_confidence NUMERIC(5,2),

    tags TEXT[],

    -- Engagement

    views INTEGER
        DEFAULT 0,

    volunteer_count INTEGER
        DEFAULT 0,

    shares INTEGER
        DEFAULT 0,

    -- Audit

    created_at TIMESTAMPTZ
        DEFAULT NOW(),

    updated_at TIMESTAMPTZ
        DEFAULT NOW(),

    resolved_at TIMESTAMPTZ
);