import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LabinaShell } from "@/components/labina/Layout";
import { useLabinaTheme, fontArabic, fontSans, type Palette } from "@/components/labina/theme";
import mosqueImg from "@/assets/project-mosque.jpg";
import schoolImg from "@/assets/project-quran-school.jpg";
import orphanageImg from "@/assets/project-orphanage.jpg";
import wellImg from "@/assets/project-well.jpg";

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
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

const PROJECTS = [
  { key: "mosque", label: "Mosquée Al-Nour — Paris 18ᵉ", tag: "Lieu de culte", goal: 200_000, image: mosqueImg, alt: "Mosquée moderne au coucher du soleil" },
  { key: "school", label: "Dar al-Qur'an — Lyon", tag: "École coranique", goal: 120_000, image: schoolImg, alt: "Enfants étudiant le Coran" },
  { key: "orphanage", label: "Orphelinat — Mali", tag: "Humanitaire", goal: 80_000, image: orphanageImg, alt: "Enfants devant un orphelinat" },
  { key: "well", label: "Puits d'eau potable — Niger", tag: "Accès à l'eau", goal: 4_500, image: wellImg, alt: "Villageois autour d'un puits" },
] as const;

function ProjectRotator({ members, C, index }: { members: number; C: Palette; index: number }) {
  const p = Math.min(1, Math.max(0, (members - 100) / (10000 - 100)));
  const fillPct = Math.round(Math.min(1, p / 0.85) * 100);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${C.borderDark}`,
        background: C.cardDark,
        boxShadow: "0 20px 50px -20px rgba(0,0,0,0.55)",
      }}
    >
      {PROJECTS.map((proj, i) => {
        const active = i === index;
        return (
          <div
            key={proj.key}
            aria-hidden={!active}
            style={{
              position: "absolute",
              inset: 0,
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(1.04)",
              transition: `opacity 0.8s ${ease}, transform 1.2s ${ease}`,
            }}
          >
            <img
              src={proj.image}
              alt={proj.alt}
              loading="lazy"
              width={1024}
              height={768}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: `saturate(${0.85 + p * 0.25}) brightness(${0.78 + p * 0.22})`,
                transition: `filter 0.6s ${ease}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0, right: 0, bottom: 0,
                height: `${100 - fillPct}%`,
                background: `linear-gradient(to top, ${C.dark} 0%, ${C.dark} 55%, transparent 100%)`,
                transition: `height 0.6s ${ease}`,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, transparent 65%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, color: C.cream, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: 4 }}>{proj.tag}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{proj.label}</div>
              </div>
              <div className="labina-num" style={{ fontSize: 12, color: C.cream, background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: 999, border: `1px solid ${C.borderDark}` }}>
                {fillPct}% financé
              </div>
            </div>
          </div>
        );
      })}
    </div>
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
  const [projectIdx, setProjectIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProjectIdx((i) => (i + 1) % PROJECTS.length), 4500);
    return () => clearInterval(id);
  }, []);
  const project = PROJECTS[projectIdx];
  const animatedCount = useAnimatedNumber(CURRENT_MEMBERS);
  const showCounter = CURRENT_MEMBERS >= MEMBER_THRESHOLD;

  const contribution = useMemo(() => Math.ceil(project.goal / members), [members, project.goal]);

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
      <section id="top" className="labina-grid-2 labina-hero" style={{ borderBottom: `1px solid ${C.dark}` }}>
        <div id="join" style={{ background: C.cream, padding: "24px 48px", borderRight: `1px solid ${C.dark}`, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", padding: "7px 14px", border: `1.5px solid ${C.dark}`, borderRadius: 999, fontSize: 12, fontWeight: 500, color: C.textSec }}>
            <span style={{ fontFamily: fontArabic, color: C.text }}>لبنة</span>
            <span>· La pierre qu'on apporte à l'édifice</span>
          </div>
          <h1 className="labina-h1" style={{ fontSize: 40, color: C.text, margin: 0 }}>Apportez votre pierre à l'édifice.</h1>
          <p className="labina-h2" style={{ fontSize: 18, color: C.textSec, margin: 0, fontWeight: 400, fontStyle: "italic" }}>
            Plus on est nombreux, moins chacun{" "}
            <span style={{ color: C.green, fontWeight: 600, fontStyle: "normal" }}>contribue</span>.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: C.textSec, margin: 0, maxWidth: 520 }}>
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
          <p style={{ fontSize: 12, color: C.textMuted, margin: "-8px 0 0" }}>Aucune contribution demandée à l'inscription</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "4px 0" }}>
            <div style={{ flex: 1, height: 1, background: C.textFaint }} />
            <span style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>ou téléchargez l'application</span>
            <div style={{ flex: 1, height: 1, background: C.textFaint }} />
          </div>
          <StoreBadges />
        </div>

        <div style={{ background: C.dark, color: C.cream, padding: "24px 48px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ maxWidth: 320, alignSelf: "center", width: "100%" }}>
            <ProjectRotator members={members} C={C} index={projectIdx} />
          </div>
          <div style={{ height: 1, background: C.borderDark }} />
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Simulateur collectif</span>
              <span style={{ display: "inline-flex", gap: 6 }}>
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProjectIdx(i)}
                    aria-label={`Projet ${i + 1}`}
                    style={{
                      width: 18, height: 4, borderRadius: 2, border: "none", cursor: "pointer",
                      background: i === projectIdx ? C.gold : C.borderDark,
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </span>
            </div>
            <div style={{ background: C.cardDark, border: `1px solid ${C.borderDark}`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 14, color: C.cream, fontWeight: 600 }}>{project.label}</div>
              <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>Objectif : <span className="labina-num">{project.goal.toLocaleString("fr-FR")} €</span></div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textFaint }}>
                  <span>Nombre de membres</span>
                  <span className="labina-num" style={{ color: C.cream, fontWeight: 600 }}>{members.toLocaleString("fr-FR")}</span>
                </div>
                <input type="range" min={100} max={10000} step={100} value={members} onChange={(e) => setMembers(Number(e.target.value))} className="labina-slider" />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted }}>
                  <span>100</span><span>10 000</span>
                </div>
              </div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.borderDark}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: C.textFaint }}>Votre contribution serait de</div>
                  <div className="labina-num" style={{ fontSize: 36, fontWeight: 600, color: C.cream, marginTop: 4 }}>{contribution.toLocaleString("fr-FR")} €</div>
                  <div className="labina-num" style={{ fontSize: 12, color: C.gold, marginTop: 6 }}>{project.goal.toLocaleString("fr-FR")} € ÷ {members.toLocaleString("fr-FR")} membres</div>
                </div>
                <div style={{ fontSize: 44, lineHeight: 1 }}>🧱</div>
              </div>
              <p style={{ fontStyle: "italic", fontSize: 12, color: C.textFaint, marginTop: 12 }}>Si vous rejoignez maintenant, votre part ne peut que diminuer.</p>
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
