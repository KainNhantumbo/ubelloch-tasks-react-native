export type ColorScheme = "light" | "dark";
export type LanguageOpts = "EN" | "PT";

export enum PaletteColorScheme {
  BLANK = "Blank",
  MONOKAI = "Monokai",
  SOLARIZED_DARK = "Solarized Dark",
  SOLARIZED_LIGHT = "Solarized Light",
  DRACULA = "Dracula",
  NORD = "Nord",
  GRUVBOX = "Gruvbox"
}

// strict type is for light/dark mode, system is to infer and match device current theme
export type Mode = "strict" | "system";

export interface AppPreferences {
  ui: {
    mode: Mode;
    theme: ColorScheme;
    palette: keyof typeof PaletteColorScheme;
  };
  editor: {
    fontSize: number;
    fontFamily: string;
    enableAutoSave: boolean;
  };
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
    hasCompletedOnboarding: boolean;
  };
  auth: {
    token: string;
  };
  enableNotifications: boolean;
  language: LanguageOpts;
}
