-- ============================================================
-- 08_notifications.sql
-- Sevana - Notifications
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    type VARCHAR(40)
        DEFAULT 'general'
        CHECK (
            type IN (
                'general',
                'report',
                'rescue',
                'donation',
                'achievement',
                'system'
            )
        ),

    is_read BOOLEAN DEFAULT FALSE,

    action_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);