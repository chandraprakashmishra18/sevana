-- Sevana - Animal Rescue Module Schema
-- Uses earthdistance + cube for cheap "nearby" geo queries (no PostGIS needed)

CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(120) NOT NULL,
  phone         VARCHAR(20) UNIQUE,
  email         VARCHAR(160) UNIQUE,
  password_hash TEXT NOT NULL,
  area          VARCHAR(160),
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  role          VARCHAR(20) NOT NULL DEFAULT 'user', -- user | vet_admin | ngo_admin
  xp            INTEGER NOT NULL DEFAULT 0,
  streak_days   INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ANIMAL REPORTS  (core "Report Animal" flow)
-- ============================================================
CREATE TABLE IF NOT EXISTS animal_reports (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  species       VARCHAR(60),               -- dog, cat, cow, bird, other
  description   TEXT,
  photo_url     TEXT,
  severity      VARCHAR(20) NOT NULL DEFAULT 'moderate', -- critical | moderate | low
  status        VARCHAR(20) NOT NULL DEFAULT 'reported',  -- reported | acknowledged | in_progress | rescued | closed
  lat           DOUBLE PRECISION NOT NULL,
  lng           DOUBLE PRECISION NOT NULL,
  address_label VARCHAR(200),              -- e.g. "Sector 14, 8 min ago" style display text
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_animal_reports_geo
  ON animal_reports USING gist (ll_to_earth(lat, lng));

CREATE INDEX IF NOT EXISTS idx_animal_reports_status ON animal_reports(status);

-- ============================================================
-- RESCUE RESPONSES  ("Raise Hand" on a specific report / dispatch log)
-- ============================================================
CREATE TABLE IF NOT EXISTS rescue_responses (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_report_id  UUID NOT NULL REFERENCES animal_reports(id) ON DELETE CASCADE,
  volunteer_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note              TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (animal_report_id, volunteer_id)
);

-- ============================================================
-- VETS  (VetFinder screen)
-- ============================================================
CREATE TABLE IF NOT EXISTS vets (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(160) NOT NULL,
  clinic_name   VARCHAR(160),
  phone         VARCHAR(20),
  lat           DOUBLE PRECISION NOT NULL,
  lng           DOUBLE PRECISION NOT NULL,
  address       VARCHAR(200),
  services      TEXT[],           -- e.g. {general, surgery, vaccination}
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  rating        NUMERIC(2,1),
  open_hours    VARCHAR(100),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vets_geo
  ON vets USING gist (ll_to_earth(lat, lng));

-- ============================================================
-- LOST & FOUND
-- ============================================================
CREATE TABLE IF NOT EXISTS lost_found_posts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_type     VARCHAR(10) NOT NULL,  -- lost | found
  animal_desc   TEXT,
  photo_url     TEXT,
  contact_info  VARCHAR(160),
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  status        VARCHAR(20) NOT NULL DEFAULT 'open', -- open | resolved
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- RAISE HAND ALERTS  (general "alert nearby", not tied to one report)
-- ============================================================
CREATE TABLE IF NOT EXISTS raise_hand_alerts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message       TEXT,
  lat           DOUBLE PRECISION NOT NULL,
  lng           DOUBLE PRECISION NOT NULL,
  radius_km     NUMERIC(4,1) NOT NULL DEFAULT 2.0,
  status        VARCHAR(20) NOT NULL DEFAULT 'active', -- active | closed
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- XP TRANSACTIONS  (audit trail - server is the only source of truth)
-- ============================================================
CREATE TABLE IF NOT EXISTS xp_transactions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount      INTEGER NOT NULL,
  reason      VARCHAR(80) NOT NULL,   -- report_submitted | rescue_confirmed | bowl_photo_upload | ...
  ref_table   VARCHAR(40),
  ref_id      UUID,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
