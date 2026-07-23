-- ============================================================
-- 05_vets.sql
-- Sevana - Veterinary Professionals
-- ============================================================

CREATE TABLE IF NOT EXISTS vets (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    clinic_name VARCHAR(200) NOT NULL,

    registration_number VARCHAR(100) UNIQUE NOT NULL,

    license_number VARCHAR(100),

    specialization VARCHAR(150),

    years_of_experience INTEGER
        CHECK (years_of_experience >= 0),

    consultation_fee NUMERIC(10,2),

    available_24x7 BOOLEAN DEFAULT FALSE,

    emergency_service BOOLEAN DEFAULT TRUE,

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()
);