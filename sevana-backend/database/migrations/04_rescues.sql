-- ============================================================
-- 04_rescues.sql
-- Sevana - Rescue Workflow
-- ============================================================

CREATE TABLE IF NOT EXISTS rescues (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    report_id UUID NOT NULL
        REFERENCES animal_reports(id)
        ON DELETE CASCADE,

    volunteer_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    accepted_at TIMESTAMPTZ DEFAULT NOW(),

    arrived_at TIMESTAMPTZ,

    first_aid_at TIMESTAMPTZ,

    transport_started_at TIMESTAMPTZ,

    reached_clinic_at TIMESTAMPTZ,

    completed_at TIMESTAMPTZ,

    status VARCHAR(40)
        NOT NULL
        DEFAULT 'accepted'
        CHECK (
            status IN (
                'accepted',
                'on_the_way',
                'arrived',
                'first_aid_given',
                'transporting',
                'at_clinic',
                'completed',
                'cancelled'
            )
        ),

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()
);