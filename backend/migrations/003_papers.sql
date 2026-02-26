CREATE TABLE IF NOT EXISTS papers (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    authors    TEXT NOT NULL,
    year       TEXT NOT NULL,
    status     TEXT NOT NULL CHECK(status IN ('published','submitted','unpublished')),
    abstract   TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
