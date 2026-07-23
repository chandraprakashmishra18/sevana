-- ============================================================
-- 12_report_media.sql
-- Media uploaded for reports
-- ============================================================

CREATE TABLE IF NOT EXISTS report_media (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    report_id UUID NOT NULL
        REFERENCES animal_reports(id)
        ON DELETE CASCADE,

    uploaded_by UUID
        REFERENCES users(id)
        ON DELETE SET NULL,

    media_type VARCHAR(20)
        CHECK (
            media_type IN ('image','video')
        ),

    media_url TEXT NOT NULL,

    caption TEXT,

    is_primary BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);