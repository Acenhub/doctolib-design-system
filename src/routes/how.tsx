import { createFileRoute, Link } from "@tanstack/react-router";
import { LabinaShell } from "@/components/labina/Layout";
import { useLabinaTheme, fontArabic } from "@/components/labina/theme";

export const Route = createFileRoute("/how")({
  component: HowPage,
  head: () => ({
    meta: [
      { title: "Comment ça marche — Labina" },
      { name: "description", content: "Découvrez comment Labina mutualise vos contributions pour financer des projets communautaires en toute transparence." },
      { property: "og:title", content: "Comment ça marche — Labina" },
      { property: "og:description", content: "Le financement participatif communautaire, expliqué étape par étape." },
    ],
  }),
});

function HowPage() {
  const { C } = useLabinaTheme();

  const steps = [
    { n: "01", t: "Créez un compte gratuit", d: "Inscription en 30 secondes avec votre email. Aucun engagement, aucune contribution demandée à l'inscription. Vous accédez à l'ensemble des projets ouverts." },
    { n: "02", t: "Explorez les projets vérifiés", d: "Chaque projet est porté par une association certifiée. Vous voyez l'objectif, le porteur, les documents officiels et le nombre de contributeurs en temps réel." },
    { n: "03", t: "Votre part se calcule automatiquement", d: "Le montant du projet est divisé par le nombre de membres engagés. Plus on est nombreux, plus la part de chacun diminue. Vous voyez votre part évoluer en direct." },
    { n: "04", t: "Vous contribuez en toute sécurité", d: "Paiement sécurisé, reçu fiscal automatique, suivi photo du chantier, rapport d'avancement mensuel. Transparence totale, du premier euro au dernier." },
  ];

  const faqs = [
    { q: "Est-ce conforme à l'éthique islamique ?", a: "Oui. Labina ne pratique aucun intérêt (ribâ), ne finance que des projets licites (halâl), et reverse 100 % des contributions aux porteurs de projet vérifiés." },
    { q: "Que se passe-t-il si l'objectif n'est pas atteint ?", a: "Les fonds sont conservés en escrow et restitués intégralement aux contributeurs si le projet est annulé. Aucun frais retenu." },
    { q: "Puis-je obtenir un reçu fiscal ?", a: "Oui. Tous les projets portés par des associations reconnues d'intérêt général ouvrent droit à un reçu fiscal donnant lieu à 66 % de réduction d'impôt." },
    { q: "Comment Labina gagne de l'argent ?", a: "Une commission transparente de 3 % est ajoutée à votre contribution (jamais retenue sur les fonds versés au projet). Vous voyez le détail avant de payer." },
  ];

  return (
    <LabinaShell>
      <section style={{ borderBottom: `1px solid ${C.dark}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 18 }}>Comment ça marche</div>
          <h1 className="labina-h1" style={{ fontSize: 64, color: C.text, margin: 0, maxWidth: 780 }}>
            Le pouvoir du collectif, simple comme une <span style={{ fontFamily: fontArabic, color: C.gold }}>لبنة</span>.
          </h1>
          <p style={{ fontSize: 20, color: C.textSec, marginTop: 24, maxWidth: 680, lineHeight: 1.55 }}>
            Labina réunit la communauté pour mutualiser le financement de projets utiles. Chaque membre apporte sa pierre — petite ou grande — et l'édifice se construit ensemble.
          </p>
        </div>
      </section>

      <section style={{ borderBottom: `1px solid ${C.dark}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gap: 48 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 32, paddingBottom: i < steps.length - 1 ? 48 : 0, borderBottom: i < steps.length - 1 ? `1px solid ${C.textFaint}` : "none" }}>
              <div className="labina-num" style={{ fontSize: 56, color: C.gold, fontWeight: 500, lineHeight: 1 }}>{s.n}</div>
              <div>
                <h2 className="labina-h2" style={{ fontSize: 32, color: C.text, margin: 0 }}>{s.t}</h2>
                <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.6, marginTop: 14, maxWidth: 680 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: C.dark, color: C.cream, padding: "80px 32px", borderBottom: `1px solid ${C.borderDark}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 className="labina-h2" style={{ fontSize: 36, color: C.cream, margin: 0, marginBottom: 40 }}>Questions fréquentes</h2>
          <div style={{ display: "grid", gap: 24 }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ padding: 28, background: C.cardDark, border: `1px solid ${C.borderDark}`, borderRadius: 10 }}>
                <h3 className="labina-h2" style={{ fontSize: 20, color: C.cream, margin: 0 }}>{f.q}</h3>
                <p style={{ fontSize: 15, color: C.textFaint, lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="labina-h2" style={{ fontSize: 40, color: C.text, margin: 0 }}>Prêt à poser votre première brique ?</h2>
          <Link to="/signup" style={{ display: "inline-block", marginTop: 28, background: C.dark, color: C.cream, padding: "16px 32px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
            Créer mon compte gratuit
          </Link>
        </div>
      </section>
    </LabinaShell>
  );
}