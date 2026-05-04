import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: LabinaLanding,
  head: () => ({
    meta: [
      { title: "Labina — Apportez votre pierre à l'édifice" },
      {
        name: "description",
        content:
          "Labina (لبنة) — plateforme de financement participatif communautaire islamique. Plus on est nombreux, moins chacun contribue.",
      },
      { property: "og:title", content: "Labina — Apportez votre pierre à l'édifice" },
      {
        property: "og:description",
        content: "Financez ensemble mosquées, écoles coraniques et projets humanitaires.",
      },
    ],
  }),
});

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.labina.app";
const MEMBER_THRESHOLD = 500;
const CURRENT_MEMBERS = 312; // demo value, masked under threshold
const PROJECT_GOAL = 200_000;

const C = {
  cream: "#faf8f4",
  dark: "#1a1614",
  cardDark: "#2c2820",
  borderDark: "#3d3530",
  gold: "#c9a96e",
  green: "#2d6a4f",
  text: "#1a1614",
  textSec: "#5a4e38",
  textMuted: "#8a7a60",
  textFaint: "#b8a88a",
};

const fontDisplay = "'Playfair Display', Georgia, serif";
const fontSans = "'DM Sans', system-ui, sans-serif";
const fontMono = "'DM Mono', ui-monospace, monospace";
const fontArabic = "'Noto Sans Arabic', sans-serif";

/* ───────── Brick wall ───────── */
function BrickWall({ members, rows = 10, cols = 5 }: { members: number; rows?: number; cols?: number }) {
  const max = rows * cols;
  const lit = Math.min(max, Math.floor((members / 10000) * max));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {Array.from({ length: rows }, (_, r) => (
        <div
          key={r}
          style={{ display: "flex", gap: 5, marginLeft: r % 2 === 1 ? 22 : 0 }}
        >
          {Array.from({ length: cols }, (_, c) => {
            const idx = r * cols + c;
            const active = idx < lit;
            return (
              <div
                key={c}
                style={{
                  flex: 1,
                  height: 22,
                  background: active ? C.gold : C.cardDark,
                  border: `1.5px solid ${active ? C.gold : C.borderDark}`,
                  borderRadius: 3,
                  transition: "background 0.35s ease, border-color 0.35s ease, opacity 0.35s ease",
                  transitionDelay: active ? `${idx * 12}ms` : "0ms",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ───────── Animated counter ───────── */
function useAnimatedNumber(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/* ───────── Email form ───────── */
function EmailForm({ dark = false, ctaLabel }: { dark?: boolean; ctaLabel: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSent(true);
      }}
      style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          background: dark ? C.cardDark : "#fff",
          border: `1.5px solid ${dark ? C.borderDark : C.dark}`,
          borderRadius: 8,
          padding: 6,
        }}
      >
        <input
          type="email"
          required
          placeholder="vous@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: "1 1 200px",
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            padding: "12px 14px",
            fontFamily: fontSans,
            fontSize: 15,
            color: dark ? C.cream : C.text,
          }}
        />
        <button
          type="submit"
          style={{
            background: dark ? C.cream : C.dark,
            color: dark ? C.dark : C.cream,
            border: "none",
            borderRadius: 6,
            padding: "12px 20px",
            fontFamily: fontSans,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {sent ? "✓ Merci !" : ctaLabel}
        </button>
      </div>
    </form>
  );
}

/* ───────── Store badges ───────── */
function StoreBadges() {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          background: C.dark,
          color: C.cream,
          borderRadius: 8,
          textDecoration: "none",
          fontFamily: fontSans,
          minWidth: 170,
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.3c-.4.4-.6 1-.6 1.7v16c0 .7.2 1.3.6 1.7L13 12 3.6 2.3zM14.4 12.7l2.4 2.4-11 6.4c-.4.2-.8.2-1.2 0l9.8-8.8zM20.6 10.6c.7.4 1.1 1 1.1 1.7s-.4 1.3-1.1 1.7l-2.7 1.6-2.8-2.8 2.8-2.8 2.7.6zM5.6 2.5l11 6.4-2.4 2.4L4.4 2.5c.4-.2.8-.2 1.2 0z"/></svg>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 10, opacity: 0.7 }}>DISPONIBLE SUR</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Google Play</span>
        </div>
      </a>
      <div
        title="Bientôt disponible"
        aria-disabled="true"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          background: "transparent",
          color: C.textMuted,
          border: `1.5px dashed ${C.textFaint}`,
          borderRadius: 8,
          fontFamily: fontSans,
          minWidth: 170,
          cursor: "not-allowed",
          opacity: 0.7,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 12.5c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.2 1-4 2.5-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.7 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1.1-2.7-4zM15 4.8c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/></svg>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 10, opacity: 0.8 }}>BIENTÔT SUR</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>App Store</span>
        </div>
      </div>
    </div>
  );
}

/* ───────── Page ───────── */
function LabinaLanding() {
  const [members, setMembers] = useState(2000);
  const animatedCount = useAnimatedNumber(CURRENT_MEMBERS);
  const showCounter = CURRENT_MEMBERS >= MEMBER_THRESHOLD;

  const contribution = useMemo(() => Math.ceil(PROJECT_GOAL / members), [members]);
  const emoji =
    members < 2000 ? "📐" : members < 5000 ? "🧱" : members < 8000 ? "🏗️" : "🏛️";

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
        .labina-h1 { font-family: ${fontDisplay}; font-weight: 600; letter-spacing: -0.02em; line-height: 1.05; }
        .labina-h2 { font-family: ${fontDisplay}; font-weight: 600; letter-spacing: -0.015em; line-height: 1.1; }
        .labina-num { font-variant-numeric: tabular-nums; font-family: ${fontMono}; }
        @keyframes labinaPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
        .labina-pulse-dot::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: ${C.green}; animation: labinaPulse 2s ease-in-out infinite;
        }
        .labina-slider { -webkit-appearance: none; width: 100%; height: 6px;
          border-radius: 3px; background: ${C.borderDark}; outline: none; cursor: pointer; }
        .labina-slider::-webkit-slider-thumb { -webkit-appearance: none;
          width: 22px; height: 22px; border-radius: 50%; background: ${C.cream};
          border: 2px solid ${C.dark}; cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
        .labina-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%;
          background: ${C.cream}; border: 2px solid ${C.dark}; cursor: pointer; }
        .labina-nav-link { color: ${C.textSec}; text-decoration: none; font-size: 14px;
          font-weight: 500; transition: color 0.2s; }
        .labina-nav-link:hover { color: ${C.text}; }
        .labina-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .labina-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 768px) {
          .labina-grid-2 { grid-template-columns: 1fr; }
          .labina-steps { grid-template-columns: 1fr; gap: 16px; }
          .labina-nav-links { display: none !important; }
          .labina-h1 { font-size: 44px !important; }
        }
      `}</style>

      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: C.cream,
          borderBottom: `1px solid ${C.dark}`,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "18px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", color: C.text }}>
            <span className="labina-h2" style={{ fontSize: 26, fontWeight: 700 }}>labina</span>
            <span style={{ fontFamily: fontArabic, fontSize: 22, color: C.textSec }}>لبنة</span>
          </a>
          <nav className="labina-nav-links" style={{ display: "flex", gap: 32 }}>
            <a href="#how" className="labina-nav-link">Comment ça marche</a>
            <a href="#assoc" className="labina-nav-link">Pour les associations</a>
            <a href="#projects" className="labina-nav-link">Nos projets</a>
          </nav>
          <a
            href="#join"
            style={{
              background: C.dark,
              color: C.cream,
              padding: "10px 18px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Créer un compte
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="labina-grid-2" style={{ borderBottom: `1px solid ${C.dark}` }}>
        {/* LEFT */}
        <div
          id="join"
          style={{
            background: C.cream,
            padding: "80px 56px",
            borderRight: `1px solid ${C.dark}`,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              padding: "7px 14px",
              border: `1.5px solid ${C.dark}`,
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
              color: C.textSec,
            }}
          >
            <span style={{ fontFamily: fontArabic, color: C.text }}>لبنة</span>
            <span>· La pierre qu'on apporte à l'édifice</span>
          </div>

          <h1 className="labina-h1" style={{ fontSize: 64, color: C.text, margin: 0 }}>
            Apportez votre pierre à l'édifice.
          </h1>

          <p
            className="labina-h2"
            style={{ fontSize: 26, color: C.textSec, margin: 0, fontWeight: 400, fontStyle: "italic" }}
          >
            Plus on est nombreux, moins chacun{" "}
            <span style={{ color: C.green, fontWeight: 600, fontStyle: "normal" }}>contribue</span>.
          </p>

          <p style={{ fontSize: 16, lineHeight: 1.6, color: C.textSec, margin: 0, maxWidth: 520 }}>
            Labina réunit la communauté pour financer ensemble des mosquées, écoles
            coraniques et projets humanitaires. Chaque nouveau membre réduit la part de tous.
          </p>

          {/* Counter */}
          {showCounter ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 18px",
                background: "#fff",
                border: `1.5px solid ${C.dark}`,
                borderRadius: 8,
                alignSelf: "flex-start",
              }}
            >
              <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: C.green }}>
                <span className="labina-pulse-dot" />
              </span>
              <span className="labina-num" style={{ fontSize: 22, fontWeight: 600, color: C.text }}>
                {animatedCount.toLocaleString("fr-FR")}
              </span>
              <span style={{ fontSize: 13, color: C.textSec }}>membres déjà inscrits</span>
            </div>
          ) : (
            <p style={{ fontSize: 14, color: C.textMuted, margin: 0, fontStyle: "italic" }}>
              Soyez parmi les premiers à bâtir quelque chose de grand.
            </p>
          )}

          <EmailForm ctaLabel="Rejoindre Labina — c'est gratuit" />
          <p style={{ fontSize: 12, color: C.textMuted, margin: "-12px 0 0" }}>
            Aucune contribution demandée à l'inscription
          </p>

          {/* Separator */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "8px 0" }}>
            <div style={{ flex: 1, height: 1, background: C.textFaint }} />
            <span style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ou téléchargez l'application
            </span>
            <div style={{ flex: 1, height: 1, background: C.textFaint }} />
          </div>

          <StoreBadges />
        </div>

        {/* RIGHT */}
        <div
          style={{
            background: C.dark,
            color: C.cream,
            padding: "80px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          {/* Brick wall block */}
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.textFaint,
                marginBottom: 18,
              }}
            >
              Chaque membre = une brique
            </div>
            <BrickWall members={members} />
          </div>

          <div style={{ height: 1, background: C.borderDark }} />

          {/* Simulator */}
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.textFaint,
                marginBottom: 14,
              }}
            >
              Simulateur collectif
            </div>

            <div
              style={{
                background: C.cardDark,
                border: `1px solid ${C.borderDark}`,
                borderRadius: 10,
                padding: 22,
              }}
            >
              <div style={{ fontSize: 14, color: C.cream, fontWeight: 600 }}>
                Mosquée Al-Nour — Paris 18ᵉ
              </div>
              <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>
                Objectif : <span className="labina-num">200 000 €</span>
              </div>

              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textFaint }}>
                  <span>Nombre de membres</span>
                  <span className="labina-num" style={{ color: C.cream, fontWeight: 600 }}>
                    {members.toLocaleString("fr-FR")}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={members}
                  onChange={(e) => setMembers(Number(e.target.value))}
                  className="labina-slider"
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted }}>
                  <span>100</span>
                  <span>10 000</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: 26,
                  paddingTop: 22,
                  borderTop: `1px solid ${C.borderDark}`,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: C.textFaint }}>Votre contribution serait de</div>
                  <div className="labina-num" style={{ fontSize: 44, fontWeight: 600, color: C.cream, marginTop: 6 }}>
                    {contribution.toLocaleString("fr-FR")} €
                  </div>
                  <div className="labina-num" style={{ fontSize: 12, color: C.gold, marginTop: 6 }}>
                    200 000 € ÷ {members.toLocaleString("fr-FR")} membres
                  </div>
                </div>
                <div style={{ fontSize: 56, lineHeight: 1 }}>{emoji}</div>
              </div>

              <p style={{ fontStyle: "italic", fontSize: 12, color: C.textFaint, marginTop: 18 }}>
                Si vous rejoignez maintenant, votre part ne peut que diminuer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ background: C.cream, padding: "100px 32px", borderBottom: `1px solid ${C.dark}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 56 }}>
            <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>
              Comment ça marche
            </div>
            <h2 className="labina-h2" style={{ fontSize: 44, color: C.text, margin: 0 }}>
              Quatre étapes pour bâtir ensemble.
            </h2>
          </div>

          <div className="labina-steps">
            {[
              { n: "01", t: "Créez un compte", d: "Email seulement, gratuit, en 30 secondes." },
              { n: "02", t: "Explorez les projets", d: "Mosquées, écoles, puits, orphelinats…" },
              { n: "03", t: "Votre part se calcule", d: "Montant du projet ÷ nombre de membres inscrits." },
              { n: "04", t: "Vous contribuez", d: "Reçu fiscal, suivi photos du chantier, transparence totale." },
            ].map((s) => (
              <div
                key={s.n}
                style={{
                  borderTop: `1.5px solid ${C.dark}`,
                  paddingTop: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div className="labina-num" style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}>{s.n}</div>
                <h3 className="labina-h2" style={{ fontSize: 22, color: C.text, margin: 0 }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: C.textSec, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ background: C.dark, color: C.cream, padding: "100px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
          <span style={{ fontFamily: fontArabic, fontSize: 28, color: C.gold }}>لبنة</span>
          <h2 className="labina-h2" style={{ fontSize: 48, color: C.cream, margin: 0 }}>
            Prêt à apporter votre pierre ?
          </h2>
          <p style={{ fontSize: 16, color: C.textFaint, margin: 0, maxWidth: 480 }}>
            Rejoignez la communauté Labina et découvrez les premiers projets dès leur ouverture.
          </p>
          <div style={{ width: "100%", maxWidth: 460 }}>
            <EmailForm dark ctaLabel="Je rejoins Labina" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark, color: C.textFaint, padding: "32px", borderTop: `1px solid ${C.borderDark}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="labina-h2" style={{ fontSize: 20, color: C.cream, fontWeight: 700 }}>labina</span>
            <span style={{ fontFamily: fontArabic, fontSize: 16 }}>لبنة</span>
          </div>
          <p style={{ fontSize: 12, margin: 0 }}>© 2026 Labina · Solidarité · Transparence · Oumma</p>
        </div>
      </footer>
    </div>
  );
}
