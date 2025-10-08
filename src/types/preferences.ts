export type ColorScheme = "light" | "dark";

export interface AppPreferences {
  ui: {
    theme: ColorScheme;
    enableDarkMode: boolean;
    enableNotifications: boolean;
    language: string;
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
}
