-- ============================================================
-- Sevana Database
-- Module 01 - Extensions & ENUM Types
-- ============================================================

-- ============================================================
-- Extensions
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- ============================================================
-- ENUM: User Roles
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'user_role'
    ) THEN
        CREATE TYPE user_role AS ENUM (
            'user',
            'volunteer',
            'vet',
            'ngo',
            'admin'
        );
    END IF;
END$$;

-- ===========================================================
-- ENUM: Report Status
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'report_status'
    ) THEN
        CREATE TYPE report_status AS ENUM (
            'REPORTED',
            'RESPONDERS_JOINING',
            'RESPONDER_ON_SITE',
            'FIRST_AID_GIVEN',
            'TRANSPORT_IN_PROGRESS',
            'AT_VETERINARY_CLINIC',
            'UNDER_TREATMENT',
            'RECOVERING',
            'RESCUED',
            'CLOSED'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Severity Level
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'severity_level'
    ) THEN
        CREATE TYPE severity_level AS ENUM (
            'LOW',
            'MEDIUM',
            'HIGH',
            'CRITICAL'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Report Category
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'report_category'
    ) THEN
        CREATE TYPE report_category AS ENUM (
            'DOG',
            'CAT',
            'BIRD',
            'CATTLE',
            'WILDLIFE',
            'OTHER'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Notification Type
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'notification_type'
    ) THEN
        CREATE TYPE notification_type AS ENUM (
            'EMERGENCY',
            'RESCUE_UPDATE',
            'CONFIRMATION_REQUEST',
            'RESCUE_COMPLETED',
            'VOLUNTEER',
            'SYSTEM',
            'ACHIEVEMENT'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Notification Priority
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'notification_priority'
    ) THEN
        CREATE TYPE notification_priority AS ENUM (
            'LOW',
            'MEDIUM',
            'HIGH',
            'CRITICAL'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Participant Role
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'participant_role'
    ) THEN
        CREATE TYPE participant_role AS ENUM (
            'REPORTER',
            'VOLUNTEER',
            'VET',
            'NGO'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Participant Status
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'participant_status'
    ) THEN
        CREATE TYPE participant_status AS ENUM (
            'JOINED',
            'ON_THE_WAY',
            'ON_SITE',
            'ACTIVE',
            'COMPLETED',
            'LEFT'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Volunteer Availability
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'availability_status'
    ) THEN
        CREATE TYPE availability_status AS ENUM (
            'AVAILABLE',
            'BUSY',
            'OFFLINE'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Verification Status
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'verification_status'
    ) THEN
        CREATE TYPE verification_status AS ENUM (
            'PENDING',
            'APPROVED',
            'REJECTED'
        );
    END IF;
END$$;

-- ============================================================
-- ENUM: Story Visibility
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'story_visibility'
    ) THEN
        CREATE TYPE story_visibility AS ENUM (
            'PUBLIC',
            'PRIVATE'
        );
    END IF;
END$$;