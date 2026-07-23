-- ============================================================
-- 11_constraints.sql
-- Additional Constraints
-- ============================================================

ALTER TABLE animal_reports
ADD CONSTRAINT chk_latitude
CHECK (
    latitude BETWEEN -90 AND 90
);

ALTER TABLE animal_reports
ADD CONSTRAINT chk_longitude
CHECK (
    longitude BETWEEN -180 AND 180
);

ALTER TABLE users
ADD CONSTRAINT chk_user_latitude
CHECK (
    latitude IS NULL OR latitude BETWEEN -90 AND 90
);

ALTER TABLE users
ADD CONSTRAINT chk_user_longitude
CHECK (
    longitude IS NULL OR longitude BETWEEN -180 AND 180
);

ALTER TABLE donations
ADD CONSTRAINT chk_positive_amount
CHECK (
    amount > 0
);