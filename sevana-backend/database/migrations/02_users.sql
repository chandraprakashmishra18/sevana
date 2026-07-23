-- ============================================================
-- 02_users.sql
-- Sevana - Users Table
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Basic Information
    full_name VARCHAR(120) NOT NULL,

    email VARCHAR(255) UNIQUE,

    phone VARCHAR(20) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    avatar_url TEXT,

    -- Role
    role VARCHAR(20) NOT NULL DEFAULT 'user'
        CHECK (role IN (
            'user',
            'volunteer',
            'vet',
            'ngo',
            'admin'
        )),

    -- Verification
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- XP System
    xp INTEGER NOT NULL DEFAULT 0
        CHECK (xp >= 0),

    level INTEGER NOT NULL DEFAULT 1
        CHECK (level >= 1),

    -- Location
    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    area VARCHAR(150),

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    -- Profile
    bio TEXT,

    blood_group VARCHAR(5),

    emergency_contact_name VARCHAR(120),

    emergency_contact_phone VARCHAR(20),

    -- Audit
    last_login TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);