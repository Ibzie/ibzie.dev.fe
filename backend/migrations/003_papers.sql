CREATE TABLE IF NOT EXISTS papers (
    id         BIGSERIAL PRIMARY KEY,
    title      TEXT NOT NULL,
    authors    TEXT NOT NULL,
    year       TEXT NOT NULL,
    status     TEXT NOT NULL CHECK(status IN ('published','submitted','unpublished')),
    abstract   TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
