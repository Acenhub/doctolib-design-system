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
  nuit: {
    name: "Nuit & Or",
    colors: {
      cream: "#f4efe6", dark: "#13203a", cardDark: "#1c2b48", borderDark: "#2d3d5e",
      gold: "#e0b770", green: "#3aa886",
      text: "#13203a", textSec: "#42526e", textMuted: "#7a8aa3", textFaint: "#b6c1d4",
    },
  },
  desert: {
    name: "Désert & Olive",
    colors: {
      cream: "#f7f0e1", dark: "#3a3324", cardDark: "#4a4130", borderDark: "#615641",
      gold: "#d9b365", green: "#7a8a3a",
      text: "#3a3324", textSec: "#6a5e44", textMuted: "#8d8164", textFaint: "#b8aa86",
    },
  },
  marbre: {
    name: "Marbre & Émeraude",
    colors: {
      cream: "#f3f1ec", dark: "#1f2a26", cardDark: "#2a3833", borderDark: "#3d4d47",
      gold: "#bfae7c", green: "#1f8a6b",
      text: "#1f2a26", textSec: "#52605b", textMuted: "#828e88", textFaint: "#b3bcb6",
    },
  },
  ivoire: {
    name: "Ivoire & Sauge claire",
    colors: {
      cream: "#fbf8f1", dark: "#7a8a78", cardDark: "#e8e2d4", borderDark: "#cdd2c5",
      gold: "#d9c48a", green: "#8fb39a",
      text: "#3d463c", textSec: "#6b7468", textMuted: "#9aa097", textFaint: "#c2c6bd",
    },
  },
  brume: {
    name: "Brume & Lin",
    colors: {
      cream: "#f9f6f0", dark: "#a89a82", cardDark: "#ece4d3", borderDark: "#d8cdb6",
      gold: "#e1c98a", green: "#a7b89e",
      text: "#4a4234", textSec: "#7a7060", textMuted: "#a39882", textFaint: "#c9c0aa",
    },
  },
  perle: {
    name: "Perle & Eucalyptus",
    colors: {
      cream: "#f6f8f5", dark: "#88a59a", cardDark: "#e3ece6", borderDark: "#c8d6cd",
      gold: "#d8c891", green: "#9bbfae",
      text: "#3a4842", textSec: "#6a7872", textMuted: "#95a39c", textFaint: "#bcc6c0",
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