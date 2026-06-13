import Link from "next/link";

export const metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <main className="container page" style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: "1rem" }}>404</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        This page doesn&apos;t exist. Maybe it&apos;s still loading in another
        save file.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          background: "var(--surface)",
          fontWeight: 500,
        }}
      >
        Back home
      </Link>
    </main>
  );
}
