-- ============================================================
-- 10_indexes.sql
-- Sevana - Performance Indexes
-- ============================================================

-- Users
CREATE INDEX IF NOT EXISTS idx_users_role
ON users(role);

CREATE INDEX IF NOT EXISTS idx_users_phone
ON users(phone);

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

-- Animal Reports
CREATE INDEX IF NOT EXISTS idx_reports_status
ON animal_reports(status);

CREATE INDEX IF NOT EXISTS idx_reports_severity
ON animal_reports(severity);

CREATE INDEX IF NOT EXISTS idx_reports_reported_by
ON animal_reports(reported_by);

CREATE INDEX IF NOT EXISTS idx_reports_responder
ON animal_reports(responder_id);

CREATE INDEX IF NOT EXISTS idx_reports_created_at
ON animal_reports(created_at DESC);

-- Rescues
CREATE INDEX IF NOT EXISTS idx_rescue_report
ON rescues(report_id);

CREATE INDEX IF NOT EXISTS idx_rescue_volunteer
ON rescues(volunteer_id);

CREATE INDEX IF NOT EXISTS idx_rescue_status
ON rescues(status);

-- Donations
CREATE INDEX IF NOT EXISTS idx_donations_report
ON donations(report_id);

CREATE INDEX IF NOT EXISTS idx_donations_donor
ON donations(donor_id);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user
ON notifications(user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_read
ON notifications(is_read);

-- XP
CREATE INDEX IF NOT EXISTS idx_xp_user
ON xp_transactions(user_id);