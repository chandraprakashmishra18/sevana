-- ============================================================
-- 14_rescue_updates.sql
-- Sevana - Rescue table extensions (vet / NGO assignment)
-- ============================================================

ALTER TABLE rescues
    ADD COLUMN IF NOT EXISTS vet_id UUID
        REFERENCES vets(id)
        ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS ngo_id UUID
        REFERENCES ngos(id)
        ON DELETE SET NULL;
