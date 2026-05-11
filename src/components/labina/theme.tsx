import { createContext, useContext, useState, type ReactNode } from "react";

export type Palette = {
  cream: string; dark: string; cardDark: string; borderDark: string;
  gold: string; green: string; text: string; textSec: string;
  textMuted: string; textFaint: string;
};

export const PALETTES: Record<string, { name: string; colors: Palette }> = {
  emeraude: {
    name: "Terre & Émeraude",
    colors: {
      cream: "#faf8f4", dark: "#1a1614", cardDark: "#2c2820", borderDark: "#3d3530",
      gold: "#c9a96e", green: "#0f7a5a",
      text: "#1a1614", textSec: "#5a4e38", textMuted: "#8a7a60", textFaint: "#b8a88a",
    },
  },
  doctolib: {
    name: "Bleu Doctolib + Doré",
    colors: {
      cream: "#faf8f4", dark: "#1a2942", cardDark: "#243352", borderDark: "#34456a",
      gold: "#c9a96e", green: "#107aca",
      text: "#1a2942", textSec: "#3d4e6e", textMuted: "#7a89a3", textFaint: "#b3c0d4",
    },
  },
  sauge: {
    name: "Sauge & Argile",
    colors: {
      cream: "#f5f1e8", dark: "#2a3d35", cardDark: "#34493f", borderDark: "#4a5e54",
      gold: "#d4c4a0", green: "#c47a5a",
      text: "#2a3d35", textSec: "#5a6f64", textMuted: "#7a9181", textFaint: "#aab8af",
    },
  },
};

export const fontDisplay = "'Playfair Display', Georgia, serif";
export const fontSans = "'DM Sans', system-ui, sans-serif";
export const fontMono = "'DM Mono', ui-monospace, monospace";
export const fontArabic = "'Noto Sans Arabic', sans-serif";

type Ctx = {
  C: Palette;
  paletteKey: keyof typeof PALETTES;
  setPaletteKey: (k: keyof typeof PALETTES) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function LabinaThemeProvider({ children }: { children: ReactNode }) {
  // Persisted across nav via localStorage
  const [paletteKey, setKeyState] = useState<keyof typeof PALETTES>(() => {
    if (typeof window === "undefined") return "sauge";
    const saved = window.localStorage.getItem("labina-palette") as keyof typeof PALETTES | null;
    return saved && PALETTES[saved] ? saved : "sauge";
  });
  const setPaletteKey = (k: keyof typeof PALETTES) => {
    setKeyState(k);
    if (typeof window !== "undefined") window.localStorage.setItem("labina-palette", String(k));
  };
  const C = PALETTES[paletteKey].colors;
  return (
    <ThemeCtx.Provider value={{ C, paletteKey, setPaletteKey }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useLabinaTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useLabinaTheme must be used inside LabinaThemeProvider");
  return ctx;
}