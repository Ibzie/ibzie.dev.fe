import type { Metadata } from "next";
import "../styles/globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { MagicCanvas } from "@/components/magic-canvas";
import { CursorGlow } from "@/components/cursor-glow";

export const metadata: Metadata = {
  title: {
    default: "Ibzie — Ibrahim's personal site",
    template: "%s — Ibzie",
  },
  description:
    "Ibz (Ibrahim) — ML Engineer & Applied Researcher. Voice AI, self-supervised learning, open-source tools.",
};

const themeScript = `
  (function(){
    try {
      var t = localStorage.getItem('ibzie-theme');
      if (t === 'lax') document.documentElement.setAttribute('data-theme', 'lax');
      else document.documentElement.removeAttribute('data-theme');
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <MagicCanvas />
          <CursorGlow />
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
