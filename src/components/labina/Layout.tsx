import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { fontArabic, fontSans, useLabinaTheme, PALETTES } from "./theme";

const NAV = [
  { to: "/how", label: "Comment ça marche" },
  { to: "/associations", label: "Pour les associations" },
  { to: "/projects", label: "Nos projets" },
] as const;

export function LabinaShell({ children }: { children: ReactNode }) {
  const { C } = useLabinaTheme();
  return (
    <div
      style={{
        background: C.cream,
        color: C.text,
        fontFamily: fontSans,
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        .labina-h1 { font-family: 'Playfair Display', Georgia, serif; font-weight: 600; letter-spacing: -0.02em; line-height: 1.05; }
        .labina-h2 { font-family: 'Playfair Display', Georgia, serif; font-weight: 600; letter-spacing: -0.015em; line-height: 1.1; }
        .labina-num { font-variant-numeric: tabular-nums; font-family: 'DM Mono', ui-monospace, monospace; }
        .labina-nav-link { color: ${C.textSec}; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .labina-nav-link:hover, .labina-nav-link[data-active="true"] { color: ${C.text}; }
        .labina-nav-link[data-active="true"] { font-weight: 600; }
        @media (max-width: 768px) {
          .labina-nav-links { display: none !important; }
          .labina-h1 { font-size: 44px !important; }
        }
      `}</style>
      <LabinaHeader />
      {children}
      <LabinaFooter />
      <PaletteSwitcher />
    </div>
  );
}

function LabinaHeader() {
  const { C } = useLabinaTheme();
  const { pathname } = useLocation();
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 30,
        background: C.cream, borderBottom: `1px solid ${C.dark}`,
      }}
    >
      <div
        style={{
          maxWidth: 1280, margin: "0 auto", padding: "18px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", color: C.text }}>
          <span className="labina-h2" style={{ fontSize: 26, fontWeight: 700 }}>labina</span>
          <span style={{ fontFamily: fontArabic, fontSize: 22, color: C.textSec }}>لبنة</span>
        </Link>
        <nav className="labina-nav-links" style={{ display: "flex", gap: 32 }}>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="labina-nav-link" data-active={pathname === n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/signup"
          style={{
            background: C.dark, color: C.cream, padding: "10px 18px",
            borderRadius: 6, textDecoration: "none", fontSize: 14, fontWeight: 600,
          }}
        >
          Créer un compte
        </Link>
      </div>
    </header>
  );
}

function LabinaFooter() {
  const { C } = useLabinaTheme();
  return (
    <footer style={{ background: C.dark, color: C.textFaint, padding: "32px", borderTop: `1px solid ${C.borderDark}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", color: C.cream }}>
          <span className="labina-h2" style={{ fontSize: 20, fontWeight: 700 }}>labina</span>
          <span style={{ fontFamily: fontArabic, fontSize: 16 }}>لبنة</span>
        </Link>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} style={{ color: C.textFaint, textDecoration: "none", fontSize: 13 }}>
              {n.label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: 12, margin: 0 }}>© 2026 Labina · Solidarité · Transparence · Oumma</p>
      </div>
    </footer>
  );
}

function PaletteSwitcher() {
  const { C, paletteKey, setPaletteKey } = useLabinaTheme();
  return (
    <div
      style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 100,
        background: C.cream, border: `1.5px solid ${C.dark}`, borderRadius: 12,
        padding: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        fontFamily: fontSans, minWidth: 220,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
        Palette (aperçu)
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {(Object.keys(PALETTES) as Array<keyof typeof PALETTES>).map((k) => {
          const pal = PALETTES[k];
          const active = k === paletteKey;
          return (
            <button
              key={k}
              onClick={() => setPaletteKey(k)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                border: `1.5px solid ${active ? C.dark : "transparent"}`,
                background: active ? C.cream : "transparent",
                fontFamily: fontSans, fontSize: 13, color: C.text, textAlign: "left",
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: pal.colors.dark, border: `1px solid ${pal.colors.borderDark}` }} />
                <span style={{ width: 14, height: 14, borderRadius: 3, background: pal.colors.gold }} />
                <span style={{ width: 14, height: 14, borderRadius: 3, background: pal.colors.green }} />
              </div>
              <span style={{ fontWeight: active ? 600 : 500 }}>{pal.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}