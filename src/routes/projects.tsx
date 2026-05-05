import { createFileRoute, Link } from "@tanstack/react-router";
import { LabinaShell } from "@/components/labina/Layout";
import { useLabinaTheme } from "@/components/labina/theme";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Nos projets — Labina" },
      { name: "description", content: "Découvrez les projets en cours de financement sur Labina : mosquées, écoles coraniques, puits, projets humanitaires." },
      { property: "og:title", content: "Nos projets — Labina" },
      { property: "og:description", content: "Soutenez des projets vérifiés portés par la communauté." },
    ],
  }),
});

const PROJECTS = [
  { id: 1, title: "Mosquée Al-Nour", city: "Paris 18ᵉ, France", category: "Mosquée", goal: 200_000, members: 1840, emoji: "🕌", status: "En cours" },
  { id: 2, title: "École coranique Al-Hikma", city: "Lyon, France", category: "Éducation", goal: 85_000, members: 920, emoji: "📖", status: "En cours" },
  { id: 3, title: "10 puits d'eau potable", city: "Mali", category: "Humanitaire", goal: 50_000, members: 1240, emoji: "💧", status: "En cours" },
  { id: 4, title: "Orphelinat Dar Al-Yatim", city: "Istanbul, Turquie", category: "Humanitaire", goal: 320_000, members: 2110, emoji: "🏠", status: "En cours" },
  { id: 5, title: "Centre culturel musulman", city: "Bruxelles, Belgique", category: "Culture", goal: 480_000, members: 760, emoji: "🏛️", status: "Bientôt" },
  { id: 6, title: "Cantine du Ramadan 2026", city: "Marseille, France", category: "Solidarité", goal: 35_000, members: 480, emoji: "🍲", status: "Bientôt" },
];

function ProjectsPage() {
  const { C } = useLabinaTheme();

  return (
    <LabinaShell>
      <section style={{ borderBottom: `1px solid ${C.dark}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 18 }}>Nos projets</div>
          <h1 className="labina-h1" style={{ fontSize: 64, color: C.text, margin: 0, maxWidth: 820 }}>
            Des projets vérifiés, financés ensemble.
          </h1>
          <p style={{ fontSize: 20, color: C.textSec, marginTop: 24, maxWidth: 680, lineHeight: 1.55 }}>
            Chaque projet est porté par une association certifiée. Choisissez celui qui résonne avec vous — votre part diminue à chaque nouveau membre qui rejoint.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 32px", borderBottom: `1px solid ${C.dark}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p) => {
              const part = Math.ceil(p.goal / Math.max(p.members, 1));
              const soon = p.status === "Bientôt";
              return (
                <article key={p.id} style={{ background: "#fff", border: `1.5px solid ${C.dark}`, borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 16, opacity: soon ? 0.75 : 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ fontSize: 42 }}>{p.emoji}</div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: soon ? C.textMuted : C.green, textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 10px", border: `1px solid ${soon ? C.textFaint : C.green}`, borderRadius: 999 }}>
                      {p.status}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{p.category}</div>
                    <h3 className="labina-h2" style={{ fontSize: 22, color: C.text, margin: "6px 0 4px" }}>{p.title}</h3>
                    <div style={{ fontSize: 13, color: C.textSec }}>{p.city}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${C.textFaint}` }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Objectif</div>
                      <div className="labina-num" style={{ fontSize: 18, color: C.text, fontWeight: 600, marginTop: 2 }}>{p.goal.toLocaleString("fr-FR")} €</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Membres</div>
                      <div className="labina-num" style={{ fontSize: 18, color: C.text, fontWeight: 600, marginTop: 2 }}>{p.members.toLocaleString("fr-FR")}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Votre part</div>
                      <div className="labina-num" style={{ fontSize: 18, color: C.gold, fontWeight: 700, marginTop: 2 }}>{part.toLocaleString("fr-FR")} €</div>
                    </div>
                  </div>
                  <button disabled={soon} style={{ marginTop: 4, background: soon ? "transparent" : C.dark, color: soon ? C.textMuted : C.cream, border: soon ? `1.5px dashed ${C.textFaint}` : "none", padding: "12px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: soon ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                    {soon ? "Bientôt disponible" : "Apporter ma pierre"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 className="labina-h2" style={{ fontSize: 36, color: C.text, margin: 0 }}>Vous portez un projet ?</h2>
          <p style={{ fontSize: 17, color: C.textSec, marginTop: 16 }}>Soumettez-le en quelques clics. Notre équipe vous accompagne.</p>
          <Link to="/associations" style={{ display: "inline-block", marginTop: 24, background: C.dark, color: C.cream, padding: "14px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
            Espace associations
          </Link>
        </div>
      </section>
    </LabinaShell>
  );
}