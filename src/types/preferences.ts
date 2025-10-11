import { ColorScheme, Mode, PaletteColorScheme } from "./theme";

export type LanguageOpts = "EN" | "PT";

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
