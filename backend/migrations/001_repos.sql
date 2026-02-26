CREATE TABLE IF NOT EXISTS repos (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL UNIQUE,
    lang         TEXT NOT NULL,
    stars        INTEGER NOT NULL DEFAULT 0,
    score        INTEGER NOT NULL DEFAULT 0,
    description  TEXT NOT NULL DEFAULT '',
    github_url   TEXT NOT NULL DEFAULT '',
    demo_url     TEXT,
    file_tree    TEXT NOT NULL DEFAULT '[]',
    doc_score    INTEGER NOT NULL DEFAULT 0,
    test_score   INTEGER NOT NULL DEFAULT 0,
    commit_score INTEGER NOT NULL DEFAULT 0,
    coverage     INTEGER NOT NULL DEFAULT 0,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
