CREATE TABLE IF NOT EXISTS commits (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_name    TEXT NOT NULL REFERENCES repos(name) ON DELETE CASCADE,
    hash         TEXT NOT NULL,
    message      TEXT NOT NULL,
    author       TEXT NOT NULL DEFAULT 'ibzie',
    lang         TEXT NOT NULL DEFAULT '',
    score        INTEGER NOT NULL DEFAULT 0,
    committed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_commits_repo ON commits(repo_name);
