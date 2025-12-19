import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeName = "dark" | "light";

type TokenSet = {
  pageBackground: string;
  textPrimary: string;
  textMuted: string;
  textSubtle: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  softBorder: string;
  shadow: string;
  accentPrimary: string;
  accentSecondary: string;
  accentHighlight: string;
  accentBlend: string;
  cardGradient: string;
  featureGradient: string;
  highlightText: string;
  warning: string;
  navActiveBg: string;
  navActiveBorder: string;
  navText: string;
  navTextActive: string;
  inputBg: string;
  inputText: string;
  glass: string;
};

type BadgeTonePalette = { background: string; color: string; border: string };

type BadgeToneMap = Record<ThemeName, BadgeTonePalette>;

const themeTokens: Record<ThemeName, TokenSet> = {
  dark: {
    pageBackground:
      "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.08), transparent 30%), #0b1021",
    textPrimary: "#e2e8f0",
    textMuted: "#cbd5e1",
    textSubtle: "#94a3b8",
    surface: "#0f172a",
    surfaceAlt: "#0b1224",
    border: "rgba(255,255,255,0.06)",
    softBorder: "rgba(255,255,255,0.05)",
    shadow: "0 24px 60px rgba(0,0,0,0.35)",
    accentPrimary: "#6366f1",
    accentSecondary: "#8b5cf6",
    accentHighlight: "#38bdf8",
    accentBlend:
      "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06))",
    cardGradient:
      "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(15,23,42,0.9))",
    featureGradient:
      "linear-gradient(180deg, rgba(99,102,241,0.06), rgba(15,23,42,0.85))",
    highlightText: "#c7d2fe",
    warning: "#fca5a5",
    navActiveBg: "rgba(79,70,229,0.16)",
    navActiveBorder: "1px solid rgba(79,70,229,0.4)",
    navText: "#e2e8f0",
    navTextActive: "#c7d2fe",
    inputBg: "#0b1224",
    inputText: "#e5e7eb",
    glass: "rgba(255,255,255,0.04)",
  },
  light: {
    pageBackground:
      "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.12), transparent 32%), #f8fafc",
    textPrimary: "#0f172a",
    textMuted: "#334155",
    textSubtle: "#475569",
    surface: "#ffffff",
    surfaceAlt: "#f1f5f9",
    border: "rgba(15,23,42,0.08)",
    softBorder: "rgba(15,23,42,0.08)",
    shadow: "0 18px 40px rgba(15,23,42,0.12)",
    accentPrimary: "#6366f1",
    accentSecondary: "#8b5cf6",
    accentHighlight: "#38bdf8",
    accentBlend:
      "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(56,189,248,0.12))",
    cardGradient:
      "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(56,189,248,0.06))",
    featureGradient:
      "linear-gradient(180deg, rgba(99,102,241,0.1), rgba(241,245,249,0.9))",
    highlightText: "#312e81",
    warning: "#dc2626",
    navActiveBg: "rgba(99,102,241,0.14)",
    navActiveBorder: "1px solid rgba(99,102,241,0.24)",
    navText: "#0f172a",
    navTextActive: "#312e81",
    inputBg: "#eef2ff",
    inputText: "#0f172a",
    glass: "rgba(15,23,42,0.04)",
  },
};

const badgeTones: Record<"blue" | "emerald" | "amber", BadgeToneMap> = {
  blue: {
    dark: {
      background: "rgba(59,130,246,0.12)",
      color: "#bfdbfe",
      border: "1px solid rgba(59,130,246,0.35)",
    },
    light: {
      background: "rgba(59,130,246,0.14)",
      color: "#1d4ed8",
      border: "1px solid rgba(59,130,246,0.25)",
    },
  },
  emerald: {
    dark: {
      background: "rgba(16,185,129,0.12)",
      color: "#bbf7d0",
      border: "1px solid rgba(16,185,129,0.3)",
    },
    light: {
      background: "rgba(16,185,129,0.14)",
      color: "#047857",
      border: "1px solid rgba(16,185,129,0.28)",
    },
  },
  amber: {
    dark: {
      background: "rgba(245,158,11,0.12)",
      color: "#fde68a",
      border: "1px solid rgba(245,158,11,0.35)",
    },
    light: {
      background: "rgba(245,158,11,0.18)",
      color: "#92400e",
      border: "1px solid rgba(245,158,11,0.25)",
    },
  },
};

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
  toggleTheme: () => void;
  tokens: TokenSet;
  badgeTones: typeof badgeTones;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("theme") as ThemeName | null;
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.body.style.background = themeTokens[theme].pageBackground;
    document.body.style.color = themeTokens[theme].textPrimary;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark")),
      tokens: themeTokens[theme],
      badgeTones,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
