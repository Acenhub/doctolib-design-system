import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, MessageCircle, Heart, Video, Bell, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Doctolib · Design System" },
      { name: "description", content: "Système de design Doctolib — couleurs, typographie, composants et patterns inspirés de doctolib.fr." },
    ],
  }),
});

const colorTokens = [
  { name: "primary", label: "Doctolib Blue", className: "bg-primary" },
  { name: "navy", label: "Deep Navy", className: "bg-navy" },
  { name: "primary-soft", label: "Soft Blue", className: "bg-primary-soft" },
  { name: "accent", label: "Accent", className: "bg-accent" },
  { name: "success", label: "Success", className: "bg-success" },
  { name: "warning", label: "Warning", className: "bg-warning" },
  { name: "destructive", label: "Destructive", className: "bg-destructive" },
  { name: "surface", label: "Surface", className: "bg-surface border" },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">D</div>
      <span className="text-xl font-semibold tracking-tight text-navy">Doctolib</span>
      <Badge variant="secondary" className="ml-2 bg-primary-soft text-primary">Design System</Badge>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#colors" className="hover:text-primary">Couleurs</a>
            <a href="#typo" className="hover:text-primary">Typographie</a>
            <a href="#components" className="hover:text-primary">Composants</a>
            <a href="#patterns" className="hover:text-primary">Patterns</a>
          </nav>
          <Button variant="pill" size="sm">Se connecter</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24 text-navy-foreground">
          <Badge className="mb-6 bg-white/10 text-navy-foreground hover:bg-white/15">v1.0 · Inspiré de doctolib.fr</Badge>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
            Vivez en meilleure santé
          </h1>
          <p className="mt-4 max-w-xl text-lg text-navy-foreground/80">
            Un système de design clair, accessible et chaleureux pour les expériences de santé.
          </p>

          {/* Search bar pattern */}
          <div className="mt-10 flex max-w-3xl flex-col gap-2 rounded-full bg-background p-2 shadow-[var(--shadow-elevated)] md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input className="border-0 shadow-none focus-visible:ring-0" placeholder="Nom, spécialité, établissement…" />
            </div>
            <div className="hidden h-8 w-px bg-border md:block" />
            <div className="flex flex-1 items-center gap-2 px-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Input className="border-0 shadow-none focus-visible:ring-0" placeholder="Où ?" />
            </div>
            <Button variant="pill" size="lg" className="px-8">Rechercher</Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      </section>

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-20">
        {/* Colors */}
        <section id="colors">
          <SectionHeader eyebrow="01 — Fondations" title="Palette de couleurs" subtitle="Tons inspirés de l'identité Doctolib : un bleu confiance, une marine profonde, et des accents doux." />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {colorTokens.map((c) => (
              <Card key={c.name} className="overflow-hidden p-0">
                <div className={`h-24 ${c.className}`} />
                <div className="space-y-1 p-4">
                  <div className="text-sm font-medium">{c.label}</div>
                  <code className="text-xs text-muted-foreground">--{c.name}</code>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section id="typo">
          <SectionHeader eyebrow="02 — Fondations" title="Typographie" subtitle="Inter, claire et lisible. Hiérarchie nette pour guider le patient." />
          <Card className="mt-10 space-y-6 p-10">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Display · 60/64 · semibold</div>
              <p className="mt-2 text-6xl font-semibold tracking-tight text-navy">Vivez en meilleure santé</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">H1 · 36 · semibold</div>
              <p className="mt-2 text-4xl font-semibold text-navy">Prenez rendez-vous facilement</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">H2 · 24 · medium</div>
              <p className="mt-2 text-2xl font-medium text-navy">Votre compagnon de santé au quotidien</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Body · 16 · regular</div>
              <p className="mt-2 max-w-2xl text-base text-foreground/80">
                Réservez des consultations vidéo ou en présentiel, et recevez des rappels pour ne jamais les manquer.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Caption · 13 · medium</div>
              <p className="mt-2 text-[13px] font-medium text-muted-foreground">Confidentialité · Données chiffrées de bout en bout</p>
            </div>
          </Card>
        </section>

        {/* Buttons & Inputs */}
        <section id="components">
          <SectionHeader eyebrow="03 — Composants" title="Boutons & champs" subtitle="Pills arrondies, ombres douces, focus accessibles." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="space-y-5 p-8">
              <div className="text-sm font-medium text-muted-foreground">Boutons</div>
              <div className="flex flex-wrap gap-3">
                <Button variant="pill">Rechercher</Button>
                <Button variant="navy">Espace praticien</Button>
                <Button variant="soft">Centre d'aide</Button>
                <Button variant="outline" className="rounded-full">Découvrir</Button>
                <Button variant="ghost" className="rounded-full">En savoir plus</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="pill" size="xl">Prendre rendez-vous</Button>
              </div>
            </Card>
            <Card className="space-y-5 p-8">
              <div className="text-sm font-medium text-muted-foreground">Champs</div>
              <Input placeholder="Email professionnel" className="h-12 rounded-full px-5" />
              <div className="flex items-center gap-2 rounded-full border border-input bg-background px-5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input className="h-12 border-0 px-0 shadow-none focus-visible:ring-0" placeholder="Médecin généraliste…" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary-soft text-primary hover:bg-primary-soft">Téléconsultation</Badge>
                <Badge className="bg-primary-soft text-primary hover:bg-primary-soft">Disponible aujourd'hui</Badge>
                <Badge variant="outline">Conventionné secteur 1</Badge>
              </div>
            </Card>
          </div>
        </section>

        {/* Feature cards pattern */}
        <section id="patterns">
          <SectionHeader eyebrow="04 — Patterns" title="Cartes de fonctionnalités" subtitle="Icône colorée + titre + description courte. Le motif clé du site Doctolib." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Calendar, title: "Accédez aux soins", desc: "Réservez des consultations vidéo ou en présentiel et recevez des rappels." },
              { icon: MessageCircle, title: "Soins personnalisés", desc: "Échangez avec vos soignants par message et obtenez des conseils." },
              { icon: Heart, title: "Gérez votre santé", desc: "Centralisez vos informations et celles de vos proches en toute sécurité." },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="p-8 transition-all hover:shadow-[var(--shadow-elevated)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </Card>
            ))}
          </div>

          {/* Appointment card */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden p-0">
              <div className="flex items-start gap-4 p-6">
                <div className="h-16 w-16 shrink-0 rounded-full bg-primary-soft" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-navy">Dr. Camille Laurent</h4>
                      <p className="text-sm text-muted-foreground">Médecin généraliste · Paris 11ᵉ</p>
                    </div>
                    <Badge className="bg-success/15 text-success hover:bg-success/15">Dispo</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["09:30", "10:15", "11:00", "14:30", "16:00"].map((t) => (
                      <button key={t} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary-soft">{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-navy p-6 text-navy-foreground">
              <Video className="h-8 w-8 text-primary-foreground" />
              <h4 className="mt-4 text-lg font-semibold">Téléconsultation sécurisée</h4>
              <p className="mt-2 text-sm text-navy-foreground/75">Consultez un soignant en vidéo, où que vous soyez, en toute confidentialité.</p>
              <Button variant="pill" className="mt-6 bg-background text-primary hover:brightness-95">Lancer une consultation</Button>
            </Card>
          </div>

          {/* Alert / utility row */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card className="flex items-start gap-3 p-5">
              <Bell className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium text-navy">Rappel automatique</div>
                <div className="text-xs text-muted-foreground">SMS 24h avant votre rendez-vous</div>
              </div>
            </Card>
            <Card className="flex items-start gap-3 p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-success" />
              <div>
                <div className="text-sm font-medium text-navy">Données protégées</div>
                <div className="text-xs text-muted-foreground">Hébergement HDS certifié</div>
              </div>
            </Card>
            <Card className="flex items-start gap-3 p-5">
              <Heart className="mt-0.5 h-5 w-5 text-destructive" />
              <div>
                <div className="text-sm font-medium text-navy">Suivi familial</div>
                <div className="text-xs text-muted-foreground">Gérez les RDV de vos proches</div>
              </div>
            </Card>
          </div>
        </section>

        {/* Spacing & radius */}
        <section>
          <SectionHeader eyebrow="05 — Fondations" title="Rayons & ombres" subtitle="Coins doux et ombres légères pour une sensation chaleureuse." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col items-center gap-3 p-8">
              <div className="h-20 w-20 rounded-md bg-primary-soft" />
              <code className="text-xs text-muted-foreground">radius-md</code>
            </Card>
            <Card className="flex flex-col items-center gap-3 p-8">
              <div className="h-20 w-20 rounded-2xl bg-primary-soft" />
              <code className="text-xs text-muted-foreground">radius-2xl</code>
            </Card>
            <Card className="flex flex-col items-center gap-3 p-8">
              <div className="h-20 w-20 rounded-full bg-primary-soft" />
              <code className="text-xs text-muted-foreground">radius-full</code>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <p>Design system non officiel · Inspiré de doctolib.fr</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy md:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
    </div>
  );
}
