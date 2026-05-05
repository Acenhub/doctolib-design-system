import { createFileRoute, Link } from "@tanstack/react-router";
import { LabinaShell } from "@/components/labina/Layout";
import { useLabinaTheme } from "@/components/labina/theme";

export const Route = createFileRoute("/associations")({
  component: AssociationsPage,
  head: () => ({
    meta: [
      { title: "Pour les associations — Labina" },
      { name: "description", content: "Lancez votre projet sur Labina : visibilité auprès de la diaspora, transparence, escrow sécurisé, 0 % d'intérêt." },
      { property: "og:title", content: "Pour les associations — Labina" },
      { property: "og:description", content: "La plateforme de financement participatif communautaire pour les associations musulmanes." },
    ],
  }),
});

function AssociationsPage() {
  const { C } = useLabinaTheme();

  const benefits = [
    { t: "Une diaspora engagée", d: "Accédez à une communauté de milliers de membres en France et en Europe, prête à soutenir des projets utiles." },
    { t: "Aucun intérêt, jamais", d: "Labina respecte la finance islamique. Pas de prêt, pas d'usure, uniquement du don participatif." },
    { t: "Escrow sécurisé", d: "Les fonds sont conservés par un tiers de confiance et libérés selon les jalons du projet." },
    { t: "Outils de transparence", d: "Photos du chantier, rapports d'avancement, vote des donateurs sur les paliers — tout est intégré." },
    { t: "Reçus fiscaux automatiques", d: "Vos contributeurs reçoivent leur reçu fiscal automatiquement, vous économisez du temps administratif." },
    { t: "Accompagnement humain", d: "Une équipe dédiée vous accompagne pour rédiger votre projet, fixer les paliers et communiquer." },
  ];

  return (
    <LabinaShell>
      <section style={{ borderBottom: `1px solid ${C.dark}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 18 }}>Pour les associations</div>
          <h1 className="labina-h1" style={{ fontSize: 64, color: C.text, margin: 0, maxWidth: 820 }}>
            Donnez à votre projet la force du collectif.
          </h1>
          <p style={{ fontSize: 20, color: C.textSec, marginTop: 24, maxWidth: 680, lineHeight: 1.55 }}>
            Mosquée, école coranique, puits, orphelinat, projet humanitaire — quel que soit votre projet, Labina vous met en relation avec la communauté qui l'attendait.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <a href="mailto:contact@labina.com" style={{ background: C.dark, color: C.cream, padding: "16px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
              Soumettre un projet
            </a>
            <Link to="/projects" style={{ background: "transparent", color: C.text, padding: "16px 28px", border: `1.5px solid ${C.dark}`, borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
              Voir les projets en cours
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 32px", borderBottom: `1px solid ${C.dark}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 className="labina-h2" style={{ fontSize: 36, color: C.text, margin: 0, marginBottom: 48 }}>Pourquoi choisir Labina ?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {benefits.map((b) => (
              <div key={b.t} style={{ borderTop: `1.5px solid ${C.dark}`, paddingTop: 22 }}>
                <h3 className="labina-h2" style={{ fontSize: 22, color: C.text, margin: 0 }}>{b.t}</h3>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.dark, color: C.cream, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <h2 className="labina-h2" style={{ fontSize: 40, color: C.cream, margin: 0 }}>Comment ça se passe concrètement</h2>
            <ol style={{ marginTop: 28, paddingLeft: 0, listStyle: "none", display: "grid", gap: 18 }}>
              {[
                "Vous nous soumettez votre projet et vos documents officiels.",
                "Notre équipe vérifie l'association et structure les paliers.",
                "Le projet est mis en ligne avec un objectif clair et un calendrier.",
                "Les contributeurs s'inscrivent — leur part diminue à mesure qu'ils sont plus nombreux.",
                "Les fonds sont libérés par paliers selon l'avancement vérifié.",
              ].map((t, i) => (
                <li key={i} style={{ display: "flex", gap: 16 }}>
                  <span className="labina-num" style={{ color: C.gold, fontWeight: 600, minWidth: 24 }}>{(i + 1).toString().padStart(2, "0")}</span>
                  <span style={{ color: C.textFaint, fontSize: 16, lineHeight: 1.55 }}>{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div style={{ background: C.cardDark, border: `1px solid ${C.borderDark}`, borderRadius: 12, padding: 36 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint, marginBottom: 18 }}>Frais Labina</div>
            <div className="labina-num" style={{ fontSize: 64, color: C.gold, fontWeight: 600, lineHeight: 1 }}>3 %</div>
            <p style={{ color: C.textFaint, fontSize: 15, lineHeight: 1.6, marginTop: 18 }}>
              Une commission unique, ajoutée à la contribution du donateur — jamais retenue sur les fonds versés à votre projet. <strong style={{ color: C.cream }}>Vous recevez 100 % de l'objectif.</strong>
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="labina-h2" style={{ fontSize: 40, color: C.text, margin: 0 }}>Vous portez un projet ?</h2>
          <p style={{ fontSize: 17, color: C.textSec, marginTop: 16 }}>Parlons-en. Réponse sous 48 h.</p>
          <a href="mailto:contact@labina.com" style={{ display: "inline-block", marginTop: 28, background: C.dark, color: C.cream, padding: "16px 32px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
            contact@labina.com
          </a>
        </div>
      </section>
    </LabinaShell>
  );
}