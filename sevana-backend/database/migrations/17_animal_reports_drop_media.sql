-- ============================================================
-- 17_animal_reports_drop_media.sql
-- Sevana - Remove denormalized media columns from animal_reports
-- Media lives in report_media (1 → many)
-- ============================================================

ALTER TABLE animal_reports
    DROP COLUMN IF EXISTS cover_image,
    DROP COLUMN IF EXISTS image_count,
    DROP COLUMN IF EXISTS video_url;
