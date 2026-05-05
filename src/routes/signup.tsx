import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LabinaShell } from "@/components/labina/Layout";
import { useLabinaTheme, fontArabic, fontSans } from "@/components/labina/theme";
import { StoreBadges } from "./index";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Créer un compte — Labina" },
      { name: "description", content: "Rejoignez Labina gratuitement et apportez votre pierre à des projets communautaires." },
      { property: "og:title", content: "Créer un compte — Labina" },
      { property: "og:description", content: "Inscription gratuite en 30 secondes." },
    ],
  }),
});

function SignupPage() {
  const { C } = useLabinaTheme();
  const [form, setForm] = useState({ name: "", email: "", city: "", password: "" });
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <LabinaShell>
      <section className="labina-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${C.dark}`, minHeight: "calc(100vh - 80px)" }}>
        <style>{`@media (max-width: 768px) { .labina-grid-2 { grid-template-columns: 1fr !important; } }`}</style>
        <div style={{ padding: "80px 56px", borderRight: `1px solid ${C.dark}`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", padding: "7px 14px", border: `1.5px solid ${C.dark}`, borderRadius: 999, fontSize: 12, fontWeight: 500, color: C.textSec }}>
            <span style={{ fontFamily: fontArabic, color: C.text }}>لبنة</span>
            <span>· Inscription gratuite</span>
          </div>
          <h1 className="labina-h1" style={{ fontSize: 56, color: C.text, margin: 0 }}>Bienvenue dans la communauté.</h1>
          <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.6, margin: 0, maxWidth: 480 }}>
            Créez votre compte en 30 secondes et accédez aux projets vérifiés. Aucune contribution demandée à l'inscription.
          </p>

          {done ? (
            <div style={{ background: C.dark, color: C.cream, padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 32 }}>✓</div>
              <h2 className="labina-h2" style={{ fontSize: 24, color: C.cream, margin: 0 }}>Bienvenue, {form.name || "ami"} !</h2>
              <p style={{ fontSize: 14, color: C.textFaint, margin: 0 }}>Un email de confirmation vient d'être envoyé à <strong style={{ color: C.gold }}>{form.email}</strong>.</p>
              <Link to="/projects" style={{ marginTop: 12, alignSelf: "flex-start", background: C.cream, color: C.dark, padding: "12px 22px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
                Découvrir les projets
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (form.email && form.password) setDone(true); }}
              style={{ display: "grid", gap: 14, maxWidth: 480 }}
            >
              <Field label="Prénom & nom" value={form.name} onChange={set("name")} placeholder="Aïcha Benali" C={C} />
              <Field label="Email" type="email" required value={form.email} onChange={set("email")} placeholder="vous@exemple.com" C={C} />
              <Field label="Ville" value={form.city} onChange={set("city")} placeholder="Paris, Lyon, Bruxelles…" C={C} />
              <Field label="Mot de passe" type="password" required value={form.password} onChange={set("password")} placeholder="Au moins 8 caractères" C={C} />
              <button type="submit" style={{ marginTop: 8, background: C.dark, color: C.cream, border: "none", borderRadius: 8, padding: "16px 22px", fontFamily: fontSans, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Créer mon compte
              </button>
              <p style={{ fontSize: 12, color: C.textMuted, margin: "4px 0 0", lineHeight: 1.5 }}>
                En créant votre compte, vous acceptez nos conditions d'utilisation. Aucun spam, désinscription en un clic.
              </p>
            </form>
          )}
        </div>

        <div style={{ background: C.dark, color: C.cream, padding: "80px 56px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint, marginBottom: 18 }}>Pourquoi rejoindre</div>
            <h2 className="labina-h2" style={{ fontSize: 36, color: C.cream, margin: 0 }}>Plus on est nombreux, moins chacun contribue.</h2>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 18 }}>
            {[
              "Accès à tous les projets vérifiés",
              "Suivi photo et reporting des chantiers",
              "Reçus fiscaux automatiques",
              "Pas d'engagement, pas de prélèvement caché",
              "Une communauté soudée, en France et en Europe",
            ].map((t) => (
              <li key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ color: C.gold, fontSize: 18, lineHeight: 1.4 }}>✓</span>
                <span style={{ color: C.textFaint, fontSize: 16, lineHeight: 1.5 }}>{t}</span>
              </li>
            ))}
          </ul>

          <div style={{ height: 1, background: C.borderDark }} />

          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint, marginBottom: 14 }}>Ou installez l'application</div>
            <StoreBadges />
          </div>
        </div>
      </section>
    </LabinaShell>
  );
}

function Field({ label, C, ...rest }: { label: string; C: ReturnType<typeof useLabinaTheme>["C"] } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      <input
        {...rest}
        style={{
          background: "#fff", border: `1.5px solid ${C.dark}`, borderRadius: 8,
          padding: "13px 14px", fontFamily: fontSans, fontSize: 15, color: C.text, outline: "none",
        }}
      />
    </label>
  );
}