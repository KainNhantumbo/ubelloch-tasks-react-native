export enum PaletteColorScheme {
  BLANK = "Blank",
  MONOKAI = "Monokai",
  SOLARIZED = "Solarized",
  DRACULA = "Dracula",
  NORD = "Nord",
  GRUVBOX = "Gruvbox"
}

export type PaletteColors = Record<keyof typeof PaletteColorScheme, ThemeColors>;

export interface PaletteTheme {
  light: PaletteColors;
  dark: PaletteColors;
}

// strict type is for light/dark mode, system is to infer and match device current theme
export type Mode = "strict" | "system";

export type ColorScheme = "light" | "dark";

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  accent_1: string;
  accent_2: string;
  accent_3: string;
  accent_4: string;
  accent_5: string;
  accent_6: string;
};
