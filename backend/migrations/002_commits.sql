CREATE TABLE IF NOT EXISTS commits (
    id           BIGSERIAL PRIMARY KEY,
    repo_name    TEXT NOT NULL REFERENCES repos(name) ON DELETE CASCADE,
    hash         TEXT NOT NULL,
    message      TEXT NOT NULL,
    author       TEXT NOT NULL DEFAULT 'ibzie',
    lang         TEXT NOT NULL DEFAULT '',
    score        BIGINT NOT NULL DEFAULT 0,
    committed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(repo_name, hash)
);
CREATE INDEX IF NOT EXISTS idx_commits_repo ON commits(repo_name);
