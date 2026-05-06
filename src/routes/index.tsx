import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LabinaShell } from "@/components/labina/Layout";
import { useLabinaTheme, fontArabic, fontMono, fontSans, type Palette } from "@/components/labina/theme";

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
const CURRENT_MEMBERS = 312;
const PROJECT_GOAL = 200_000;

/* ───────── Mosque builder ───────── */
function MosqueBuilder({ members, C }: { members: number; C: Palette }) {
  const p = Math.min(1, Math.max(0, (members - 100) / (10000 - 100)));
  const ROWS = 6;
  const COLS = 9;
  const TOTAL = ROWS * COLS;
  const brickProgress = Math.min(1, p / 0.7);
  const litBricks = Math.floor(brickProgress * TOTAL);

  const showDoor = p > 0.35;
  const showWindows = p > 0.55;
  const showSideDomes = p > 0.7;
  const showMainDome = p > 0.82;
  const showMinaret = p > 0.9;
  const showCrescent = p > 0.96;

  const W = 360, H = 280, baseY = 250, wallTop = 130;
  const wallH = baseY - wallTop, wallW = 220;
  const wallX = (W - wallW) / 2;
  const brickW = wallW / COLS, brickH = wallH / ROWS;
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }} aria-label="Mosquée en construction">
      <rect x={wallX - 16} y={baseY} width={wallW + 32} height={6} fill={C.gold} opacity={0.9} />
      <rect x={wallX - 24} y={baseY + 6} width={wallW + 48} height={4} fill={C.borderDark} />
      {Array.from({ length: ROWS }).map((_, rFromTop) => {
        const rFromBottom = ROWS - 1 - rFromTop;
        const yRow = wallTop + rFromTop * brickH;
        const offset = rFromBottom % 2 === 1 ? brickW / 2 : 0;
        return Array.from({ length: COLS }).map((_, c) => {
          const poseIndex = rFromBottom * COLS + c;
          const active = poseIndex < litBricks;
          const x = wallX + c * brickW - offset;
          if (x < wallX - brickW / 2 || x > wallX + wallW) return null;
          return (
            <rect
              key={`${rFromTop}-${c}`}
              x={x + 1} y={yRow + 1} width={brickW - 2} height={brickH - 2} rx={1.5}
              fill={active ? C.gold : C.cardDark}
              stroke={active ? C.gold : C.borderDark}
              strokeWidth={1}
              style={{
                transition: `fill 0.4s ${ease}, stroke 0.4s ${ease}, transform 0.5s ${ease}, opacity 0.4s ${ease}`,
                transformOrigin: `${x + brickW / 2}px ${yRow + brickH}px`,
                transformBox: "fill-box",
                transform: active ? "translateY(0) scaleY(1)" : "translateY(8px) scaleY(0.6)",
                opacity: active ? 1 : 0.35,
                transitionDelay: active ? `${poseIndex * 18}ms` : "0ms",
              }}
            />
          );
        });
      })}
      <g style={{ transition: `opacity 0.5s ${ease}, transform 0.5s ${ease}`, transformOrigin: `${W / 2}px ${baseY}px`, transformBox: "fill-box", opacity: showDoor ? 1 : 0, transform: showDoor ? "scaleY(1)" : "scaleY(0)" }}>
        <path d={`M ${W/2-22} ${baseY} L ${W/2-22} ${baseY-38} A 22 22 0 0 1 ${W/2+22} ${baseY-38} L ${W/2+22} ${baseY} Z`} fill={C.dark} stroke={C.gold} strokeWidth={1.5} />
      </g>
      {showWindows && [-70, 70].map((dx) => (
        <g key={dx} style={{ transition: `opacity 0.5s ${ease}`, opacity: 1 }}>
          <path d={`M ${W/2+dx-10} ${baseY-30} L ${W/2+dx-10} ${baseY-50} A 10 10 0 0 1 ${W/2+dx+10} ${baseY-50} L ${W/2+dx+10} ${baseY-30} Z`} fill={C.dark} stroke={C.gold} strokeWidth={1.2} />
        </g>
      ))}
      {[-85, 85].map((dx) => (
        <g key={dx} style={{ transition: `opacity 0.5s ${ease}, transform 0.5s ${ease}`, transformOrigin: `${W/2+dx}px ${wallTop}px`, transformBox: "fill-box", opacity: showSideDomes ? 1 : 0, transform: showSideDomes ? "scale(1)" : "scale(0.4)" }}>
          <path d={`M ${W/2+dx-18} ${wallTop} Q ${W/2+dx} ${wallTop-32}, ${W/2+dx+18} ${wallTop} Z`} fill={C.gold} stroke={C.gold} strokeWidth={1} />
          <rect x={W/2+dx-1} y={wallTop-42} width={2} height={12} fill={C.gold} />
        </g>
      ))}
      <g style={{ transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, transformOrigin: `${W/2}px ${wallTop}px`, transformBox: "fill-box", opacity: showMainDome ? 1 : 0, transform: showMainDome ? "scale(1)" : "scale(0.3)" }}>
        <rect x={W/2-36} y={wallTop-14} width={72} height={14} fill={C.cardDark} stroke={C.gold} strokeWidth={1.2} />
        <path d={`M ${W/2-40} ${wallTop-14} Q ${W/2-40} ${wallTop-70}, ${W/2} ${wallTop-70} Q ${W/2+40} ${wallTop-70}, ${W/2+40} ${wallTop-14} Z`} fill={C.gold} />
        <rect x={W/2-1} y={wallTop-86} width={2} height={20} fill={C.gold} />
      </g>
      <g style={{ transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, transformOrigin: `${wallX+wallW+8}px ${baseY}px`, transformBox: "fill-box", opacity: showMinaret ? 1 : 0, transform: showMinaret ? "scaleY(1)" : "scaleY(0)" }}>
        <rect x={wallX+wallW+4} y={wallTop-30} width={18} height={baseY-(wallTop-30)} fill={C.cardDark} stroke={C.gold} strokeWidth={1.2} />
        <rect x={wallX+wallW+1} y={wallTop-20} width={24} height={4} fill={C.gold} />
        <path d={`M ${wallX+wallW+4} ${wallTop-30} Q ${wallX+wallW+13} ${wallTop-56}, ${wallX+wallW+22} ${wallTop-30} Z`} fill={C.gold} />
        <rect x={wallX+wallW+12} y={wallTop-68} width={2} height={14} fill={C.gold} />
      </g>
      <g style={{ transition: `opacity 0.5s ${ease}, transform 0.5s ${ease}`, transformOrigin: `${W/2}px ${wallTop-90}px`, transformBox: "fill-box", opacity: showCrescent ? 1 : 0, transform: showCrescent ? "scale(1) rotate(0deg)" : "scale(0) rotate(-40deg)" }}>
        <path d={`M ${W/2-6} ${wallTop-92} a 7 7 0 1 0 0 -2 a 5 5 0 1 1 0 2 Z`} fill={C.gold} />
      </g>
    </svg>
  );
}

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

export function EmailForm({ dark = false, ctaLabel }: { dark?: boolean; ctaLabel: string }) {
  const { C } = useLabinaTheme();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", background: dark ? C.cardDark : "#fff", border: `1.5px solid ${dark ? C.borderDark : C.dark}`, borderRadius: 8, padding: 6 }}>
        <input type="email" required placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: "1 1 200px", minWidth: 0, background: "transparent", border: "none", outline: "none", padding: "12px 14px", fontFamily: fontSans, fontSize: 15, color: dark ? C.cream : C.text }} />
        <button type="submit" style={{ background: dark ? C.cream : C.dark, color: dark ? C.dark : C.cream, border: "none", borderRadius: 6, padding: "12px 20px", fontFamily: fontSans, fontWeight: 600, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
          {sent ? "✓ Merci !" : ctaLabel}
        </button>
      </div>
    </form>
  );
}

export function StoreBadges() {
  const { C } = useLabinaTheme();
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: C.dark, color: C.cream, borderRadius: 8, textDecoration: "none", fontFamily: fontSans, minWidth: 170, transition: "transform 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.3c-.4.4-.6 1-.6 1.7v16c0 .7.2 1.3.6 1.7L13 12 3.6 2.3zM14.4 12.7l2.4 2.4-11 6.4c-.4.2-.8.2-1.2 0l9.8-8.8zM20.6 10.6c.7.4 1.1 1 1.1 1.7s-.4 1.3-1.1 1.7l-2.7 1.6-2.8-2.8 2.8-2.8 2.7.6zM5.6 2.5l11 6.4-2.4 2.4L4.4 2.5c.4-.2.8-.2 1.2 0z"/></svg>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 10, opacity: 0.7 }}>DISPONIBLE SUR</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Google Play</span>
        </div>
      </a>
      <div title="Bientôt disponible" aria-disabled="true" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "transparent", color: C.textMuted, border: `1.5px dashed ${C.textFaint}`, borderRadius: 8, fontFamily: fontSans, minWidth: 170, cursor: "not-allowed", opacity: 0.7 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 12.5c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.2 1-4 2.5-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.7 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1.1-2.7-4zM15 4.8c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/></svg>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 10, opacity: 0.8 }}>BIENTÔT SUR</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>App Store</span>
        </div>
      </div>
    </div>
  );
}

function LabinaLanding() {
  const { C } = useLabinaTheme();
  const [members, setMembers] = useState(2000);
  const animatedCount = useAnimatedNumber(CURRENT_MEMBERS);
  const showCounter = CURRENT_MEMBERS >= MEMBER_THRESHOLD;

  const contribution = useMemo(() => Math.ceil(PROJECT_GOAL / members), [members]);
  const emoji = members < 2000 ? "📐" : members < 5000 ? "🧱" : members < 8000 ? "🏗️" : "🏛️";

  return (
    <LabinaShell>
      <style>{`
        @keyframes labinaPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0.5; } }
        .labina-pulse-dot::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: ${C.green}; animation: labinaPulse 2s ease-in-out infinite; }
        .labina-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: ${C.borderDark}; outline: none; cursor: pointer; }
        .labina-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: ${C.cream}; border: 2px solid ${C.dark}; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
        .labina-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: ${C.cream}; border: 2px solid ${C.dark}; cursor: pointer; }
        .labina-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .labina-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 768px) { .labina-grid-2 { grid-template-columns: 1fr; } .labina-steps { grid-template-columns: 1fr; gap: 16px; } }
      `}</style>

      {/* HERO */}
      <section id="top" className="labina-grid-2" style={{ borderBottom: `1px solid ${C.dark}` }}>
        <div id="join" style={{ background: C.cream, padding: "44px 56px", borderRight: `1px solid ${C.dark}`, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", padding: "7px 14px", border: `1.5px solid ${C.dark}`, borderRadius: 999, fontSize: 12, fontWeight: 500, color: C.textSec }}>
            <span style={{ fontFamily: fontArabic, color: C.text }}>لبنة</span>
            <span>· La pierre qu'on apporte à l'édifice</span>
          </div>
          <h1 className="labina-h1" style={{ fontSize: 52, color: C.text, margin: 0 }}>Apportez votre pierre à l'édifice.</h1>
          <p className="labina-h2" style={{ fontSize: 22, color: C.textSec, margin: 0, fontWeight: 400, fontStyle: "italic" }}>
            Plus on est nombreux, moins chacun{" "}
            <span style={{ color: C.green, fontWeight: 600, fontStyle: "normal" }}>contribue</span>.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: C.textSec, margin: 0, maxWidth: 520 }}>
            Labina réunit la communauté pour financer ensemble des mosquées, écoles coraniques et projets humanitaires. Chaque nouveau membre réduit la part de tous.
          </p>
          {showCounter ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 18px", background: "#fff", border: `1.5px solid ${C.dark}`, borderRadius: 8, alignSelf: "flex-start" }}>
              <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: C.green }}><span className="labina-pulse-dot" /></span>
              <span className="labina-num" style={{ fontSize: 22, fontWeight: 600, color: C.text }}>{animatedCount.toLocaleString("fr-FR")}</span>
              <span style={{ fontSize: 13, color: C.textSec }}>membres déjà inscrits</span>
            </div>
          ) : (
            <p style={{ fontSize: 14, color: C.textMuted, margin: 0, fontStyle: "italic" }}>Soyez parmi les premiers à bâtir quelque chose de grand.</p>
          )}
          <EmailForm ctaLabel="Rejoindre Labina — c'est gratuit" />
          <p style={{ fontSize: 12, color: C.textMuted, margin: "-12px 0 0" }}>Aucune contribution demandée à l'inscription</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "8px 0" }}>
            <div style={{ flex: 1, height: 1, background: C.textFaint }} />
            <span style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>ou téléchargez l'application</span>
            <div style={{ flex: 1, height: 1, background: C.textFaint }} />
          </div>
          <StoreBadges />
        </div>

        <div style={{ background: C.dark, color: C.cream, padding: "44px 56px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint, marginBottom: 18 }}>Chaque membre pose une brique</div>
            <MosqueBuilder members={members} C={C} />
          </div>
          <div style={{ height: 1, background: C.borderDark }} />
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint, marginBottom: 14 }}>Simulateur collectif</div>
            <div style={{ background: C.cardDark, border: `1px solid ${C.borderDark}`, borderRadius: 10, padding: 22 }}>
              <div style={{ fontSize: 14, color: C.cream, fontWeight: 600 }}>Mosquée Al-Nour — Paris 18ᵉ</div>
              <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>Objectif : <span className="labina-num">200 000 €</span></div>
              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textFaint }}>
                  <span>Nombre de membres</span>
                  <span className="labina-num" style={{ color: C.cream, fontWeight: 600 }}>{members.toLocaleString("fr-FR")}</span>
                </div>
                <input type="range" min={100} max={10000} step={100} value={members} onChange={(e) => setMembers(Number(e.target.value))} className="labina-slider" />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted }}>
                  <span>100</span><span>10 000</span>
                </div>
              </div>
              <div style={{ marginTop: 26, paddingTop: 22, borderTop: `1px solid ${C.borderDark}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: C.textFaint }}>Votre contribution serait de</div>
                  <div className="labina-num" style={{ fontSize: 44, fontWeight: 600, color: C.cream, marginTop: 6 }}>{contribution.toLocaleString("fr-FR")} €</div>
                  <div className="labina-num" style={{ fontSize: 12, color: C.gold, marginTop: 6 }}>200 000 € ÷ {members.toLocaleString("fr-FR")} membres</div>
                </div>
                <div style={{ fontSize: 56, lineHeight: 1 }}>{emoji}</div>
              </div>
              <p style={{ fontStyle: "italic", fontSize: 12, color: C.textFaint, marginTop: 18 }}>Si vous rejoignez maintenant, votre part ne peut que diminuer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" style={{ background: C.cream, padding: "100px 32px", borderBottom: `1px solid ${C.dark}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 56 }}>
            <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>Comment ça marche</div>
            <h2 className="labina-h2" style={{ fontSize: 44, color: C.text, margin: 0 }}>Quatre étapes pour bâtir ensemble.</h2>
          </div>
          <div className="labina-steps">
            {[
              { n: "01", t: "Créez un compte", d: "Email seulement, gratuit, en 30 secondes." },
              { n: "02", t: "Explorez les projets", d: "Mosquées, écoles, puits, orphelinats…" },
              { n: "03", t: "Votre part se calcule", d: "Montant du projet ÷ nombre de membres inscrits." },
              { n: "04", t: "Vous contribuez", d: "Reçu fiscal, suivi photos du chantier, transparence totale." },
            ].map((s) => (
              <div key={s.n} style={{ borderTop: `1.5px solid ${C.dark}`, paddingTop: 22, display: "flex", flexDirection: "column", gap: 12 }}>
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
          <h2 className="labina-h2" style={{ fontSize: 48, color: C.cream, margin: 0 }}>Prêt à apporter votre pierre ?</h2>
          <p style={{ fontSize: 16, color: C.textFaint, margin: 0, maxWidth: 480 }}>Rejoignez la communauté Labina et découvrez les premiers projets dès leur ouverture.</p>
          <div style={{ width: "100%", maxWidth: 460 }}>
            <EmailForm dark ctaLabel="Je rejoins Labina" />
          </div>
        </div>
      </section>
    </LabinaShell>
  );
}
