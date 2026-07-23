-- ============================================================
-- 07_donations.sql
-- Sevana - Donations
-- ============================================================

CREATE TABLE IF NOT EXISTS donations (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    donor_id UUID
        REFERENCES users(id)
        ON DELETE SET NULL,

    report_id UUID
        REFERENCES animal_reports(id)
        ON DELETE SET NULL,

    ngo_id UUID
        REFERENCES ngos(id)
        ON DELETE SET NULL,

    amount NUMERIC(12,2) NOT NULL
        CHECK (amount > 0),

    currency VARCHAR(10) DEFAULT 'INR',

    payment_method VARCHAR(30),

    payment_status VARCHAR(20)
        DEFAULT 'pending'
        CHECK (
            payment_status IN (
                'pending',
                'successful',
                'failed',
                'refunded'
            )
        ),

    transaction_reference VARCHAR(255),

    purpose VARCHAR(150),

    notes TEXT,

    donated_at TIMESTAMPTZ DEFAULT NOW(),

    created_at TIMESTAMPTZ DEFAULT NOW()
);