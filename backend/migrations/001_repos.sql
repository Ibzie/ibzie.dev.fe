CREATE TABLE IF NOT EXISTS repos (
    id           BIGSERIAL PRIMARY KEY,
    name         TEXT NOT NULL UNIQUE,
    lang         TEXT NOT NULL,
    stars        BIGINT NOT NULL DEFAULT 0,
    score        BIGINT NOT NULL DEFAULT 0,
    description  TEXT NOT NULL DEFAULT '',
    github_url   TEXT NOT NULL DEFAULT '',
    demo_url     TEXT,
    file_tree    TEXT NOT NULL DEFAULT '[]',
    doc_score    BIGINT NOT NULL DEFAULT 0,
    test_score   BIGINT NOT NULL DEFAULT 0,
    commit_score BIGINT NOT NULL DEFAULT 0,
    coverage     BIGINT NOT NULL DEFAULT 0,
    featured     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
