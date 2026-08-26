-- ============================================================
-- 09_xp.sql
-- Sevana - XP Transactions
-- ============================================================

CREATE TABLE IF NOT EXISTS xp_transactions (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    points INTEGER NOT NULL,

    reason VARCHAR(100) NOT NULL,

    reference_type VARCHAR(50),

    reference_id UUID,

    created_at TIMESTAMPTZ DEFAULT NOW()
);