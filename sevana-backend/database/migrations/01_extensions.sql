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

CREATE TYPE user_role AS ENUM (
    'user',
    'volunteer',
    'vet',
    'ngo',
    'admin'
);

-- ============================================================
-- ENUM: Report Status
-- ============================================================

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

-- ============================================================
-- ENUM: Severity Level
-- ============================================================

CREATE TYPE severity_level AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);

-- ============================================================
-- ENUM: Report Category
-- ============================================================

CREATE TYPE report_category AS ENUM (
    'DOG',
    'CAT',
    'BIRD',
    'CATTLE',
    'WILDLIFE',
    'OTHER'
);

-- ============================================================
-- ENUM: Notification Type
-- ============================================================

CREATE TYPE notification_type AS ENUM (
    'EMERGENCY',
    'RESCUE_UPDATE',
    'CONFIRMATION_REQUEST',
    'RESCUE_COMPLETED',
    'VOLUNTEER',
    'SYSTEM',
    'ACHIEVEMENT'
);

-- ============================================================
-- ENUM: Notification Priority
-- ============================================================

CREATE TYPE notification_priority AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);

-- ============================================================
-- ENUM: Participant Role
-- ============================================================

CREATE TYPE participant_role AS ENUM (
    'REPORTER',
    'VOLUNTEER',
    'VET',
    'NGO'
);

-- ============================================================
-- ENUM: Participant Status
-- ============================================================

CREATE TYPE participant_status AS ENUM (
    'JOINED',
    'ON_THE_WAY',
    'ON_SITE',
    'ACTIVE',
    'COMPLETED',
    'LEFT'
);

-- ============================================================
-- ENUM: Volunteer Availability
-- ============================================================

CREATE TYPE availability_status AS ENUM (
    'AVAILABLE',
    'BUSY',
    'OFFLINE'
);

-- ============================================================
-- ENUM: Verification Status
-- ============================================================

CREATE TYPE verification_status AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);

-- ============================================================
-- ENUM: Story Visibility
-- ============================================================

CREATE TYPE story_visibility AS ENUM (
    'PUBLIC',
    'PRIVATE'
);