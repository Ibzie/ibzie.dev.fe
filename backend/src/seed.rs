use sqlx::PgPool;

pub async fn run(pool: &PgPool) {
    tracing::info!("Seeding database...");

    let ibz_git_tree = serde_json::json!([
        {"name":"src","type":"dir"},
        {"name":"main.rs","type":"file","indent":"  "},
        {"name":"sanity/","type":"dir","indent":"  "},
        {"name":"analyzer.rs","type":"file","indent":"    ","note":"lang-aware"},
        {"name":"scorer.rs","type":"file","indent":"    "},
        {"name":"Cargo.toml","type":"file"},
        {"name":"ibz.toml","type":"file","note":"config schema"},
        {"name":"README.md","type":"file"}
    ])
    .to_string();

    let voice_nav_tree = serde_json::json!([
        {"name":"agent/","type":"dir"},
        {"name":"intent.py","type":"file","indent":"  ","note":"LLM routing"},
        {"name":"stt.py","type":"file","indent":"  "},
        {"name":"tts.py","type":"file","indent":"  "},
        {"name":"pipeline.py","type":"file"},
        {"name":"requirements.txt","type":"file"},
        {"name":"README.md","type":"file"}
    ])
    .to_string();

    let deepseek_tree = serde_json::json!([
        {"name":"src","type":"dir"},
        {"name":"model/","type":"dir","indent":"  "},
        {"name":"attention.rs","type":"file","indent":"    "},
        {"name":"moe.rs","type":"file","indent":"    ","note":"MixtureOfExperts"},
        {"name":"tokenizer.rs","type":"file","indent":"  "},
        {"name":"Cargo.toml","type":"file"},
        {"name":"README.md","type":"file"}
    ])
    .to_string();

    let sdf_vae_tree = serde_json::json!([
        {"name":"src/","type":"dir"},
        {"name":"model.py","type":"file","indent":"  "},
        {"name":"sdf_encoder.py","type":"file","indent":"  "},
        {"name":"train.py","type":"file"},
        {"name":"requirements.txt","type":"file"},
        {"name":"README.md","type":"file"}
    ])
    .to_string();

    let repos: &[(&str, &str, i64, i64, &str, &str, Option<&str>, &str, i64, i64, i64, i64, bool)] = &[
        (
            "ibz-git", "Rust", 12, 91,
            "Self-hosted git with sanity metrics baked in. PRs get scored on docstrings, test coverage, and commit granularity — not just merged.",
            "https://git.ibzie.dev/ibz/ibz-git", None,
            &ibz_git_tree, 88, 85, 94, 79,
            true,
        ),
        (
            "voice-nav", "Python", 7, 78,
            "AI voice agent that navigates this portfolio in real-time. Pipecat + AssemblyAI streaming STT, sub-300ms response latency.",
            "https://git.ibzie.dev/ibz/voice-nav", Some("https://demo.ibzie.dev/voice-nav"),
            &voice_nav_tree, 72, 65, 88, 61,
            true,
        ),
        (
            "deepseek-burn", "Rust", 4, 84,
            "DeepSeek-V3 MoE architecture from scratch using the Burn ML framework. Pure Rust, no Python runtime.",
            "https://git.ibzie.dev/ibz/deepseek-burn", None,
            &deepseek_tree, 81, 70, 90, 72,
            false,
        ),
        (
            "sdf-vae", "Python", 9, 76,
            "Multi-perspective SDF-VAE for 3D shape generation without 3D supervision. Competitive on ShapeNet, runs on a 3090.",
            "https://git.ibzie.dev/ibz/sdf-vae", None,
            &sdf_vae_tree, 79, 68, 80, 65,
            false,
        ),
    ];

    for (name, lang, stars, score, desc, github_url, demo_url, file_tree, doc_score, test_score, commit_score, coverage, featured) in repos {
        sqlx::query(
            "INSERT INTO repos (name, lang, stars, score, description, github_url, demo_url, file_tree, doc_score, test_score, commit_score, coverage, featured)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
             ON CONFLICT (name) DO NOTHING",
        )
        .bind(name)
        .bind(lang)
        .bind(stars)
        .bind(score)
        .bind(desc)
        .bind(github_url)
        .bind(demo_url)
        .bind(file_tree)
        .bind(doc_score)
        .bind(test_score)
        .bind(commit_score)
        .bind(coverage)
        .bind(featured)
        .execute(pool)
        .await
        .ok();
    }

    let commits: &[(&str, &str, &str, &str, &str, i64, &str)] = &[
        ("ibz-git", "a3f9c2e", "impl sanity scoring — unwrap/panic detection", "ibzie", "Rust", 94, "2h ago"),
        ("ibz-git", "b71d88a", "fix borrow checker edge case in tree traversal", "ibzie", "Rust", 88, "6h ago"),
        ("ibz-git", "f590a12", "toml config schema v1 + validation tests", "ibzie", "Rust", 82, "4d ago"),
        ("ibz-git", "9cc01de", "add per-repo metric weight overrides", "ibzie", "Rust", 78, "5d ago"),
        ("ibz-git", "2ab44f1", "initial fork from gitoxide — strip ci bloat", "ibzie", "Rust", 61, "8d ago"),
        ("voice-nav", "c209fe1", "add intent routing for portfolio nav", "ibzie", "Python", 82, "1d ago"),
        ("voice-nav", "d4ae301", "reduce vad transition latency by 40ms", "ibzie", "Python", 77, "2d ago"),
        ("voice-nav", "88bc021", "integrate assemblyai streaming stt", "ibzie", "Python", 71, "3d ago"),
        ("voice-nav", "7f3a99c", "webrtc peer connection setup + ice handling", "ibzie", "Python", 68, "5d ago"),
        ("deepseek-burn", "e1f03bc", "moe routing first pass", "ibzie", "Rust", 84, "3d ago"),
        ("deepseek-burn", "f2209aa", "attention layer — flash attn variant", "ibzie", "Rust", 80, "4d ago"),
        ("deepseek-burn", "a8810de", "tokenizer impl — bpe from scratch", "ibzie", "Rust", 76, "6d ago"),
        ("deepseek-burn", "b003f1e", "project scaffold + burn backend setup", "ibzie", "Rust", 68, "9d ago"),
        ("sdf-vae", "9f12ab3", "multi-perspective sdf encoder v2", "ibzie", "Python", 81, "1d ago"),
        ("sdf-vae", "c44ef01", "vae loss — kl + chamfer distance", "ibzie", "Python", 76, "3d ago"),
        ("sdf-vae", "d1b88f2", "shapenet dataloader + augmentation", "ibzie", "Python", 72, "5d ago"),
        ("sdf-vae", "e99a041", "initial model scaffold", "ibzie", "Python", 65, "7d ago"),
    ];

    for (repo_name, hash, message, author, lang, score, committed_at) in commits {
        sqlx::query(
            "INSERT INTO commits (repo_name, hash, message, author, lang, score, committed_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (repo_name, hash) DO NOTHING",
        )
        .bind(repo_name)
        .bind(hash)
        .bind(message)
        .bind(author)
        .bind(lang)
        .bind(score)
        .bind(committed_at)
        .execute(pool)
        .await
        .ok();
    }

    let papers: &[(&str, &str, &str, &str, &str)] = &[
        (
            "Multi-Perspective SDF-VAE: Geometric Priors for 3D Shape Generation",
            "Ibrahim A., et al.",
            "2025",
            "unpublished",
            "We present a variational autoencoder framework that incorporates signed distance function (SDF) representations from multiple camera perspectives as geometric priors. The model learns to encode latent 3D shape structure without explicit 3D supervision, achieving competitive reconstruction on ShapeNet benchmarks while remaining trainable on consumer hardware.",
        ),
        (
            "Latency Optimization in Real-Time Voice AI Pipelines Using Adaptive VAD",
            "Ibrahim A.",
            "2024",
            "unpublished",
            "An empirical analysis of voice activity detection transition latencies in production WebRTC voice agents. We propose an adaptive threshold strategy that reduces mean end-of-utterance delay by 38ms on LTE connections, with measurable UX improvement across 80+ deployed agents.",
        ),
    ];

    for (title, authors, year, status, abstract_) in papers {
        sqlx::query(
            "INSERT INTO papers (title, authors, year, status, abstract) VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT DO NOTHING",
        )
        .bind(title)
        .bind(authors)
        .bind(year)
        .bind(status)
        .bind(abstract_)
        .execute(pool)
        .await
        .ok();
    }

    tracing::info!("Seed complete.");
}
