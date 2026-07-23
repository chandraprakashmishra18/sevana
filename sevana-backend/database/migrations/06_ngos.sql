-- ============================================================
-- 06_ngos.sql
-- Sevana - NGO Directory
-- ============================================================

CREATE TABLE IF NOT EXISTS ngos (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    organization_name VARCHAR(200) NOT NULL,

    registration_number VARCHAR(100) UNIQUE,

    website TEXT,

    email VARCHAR(255),

    phone VARCHAR(20),

    description TEXT,

    coverage_radius_km INTEGER
        DEFAULT 10,

    emergency_support BOOLEAN DEFAULT TRUE,

    rescue_vehicle_available BOOLEAN DEFAULT FALSE,

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()
);