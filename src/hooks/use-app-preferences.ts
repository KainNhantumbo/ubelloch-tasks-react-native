import type { LanguageOpts } from "@/types/preferences";
import { ColorScheme } from "@/types/theme";
import { useAppPreferencesStore } from "../store/preferences";

export function useThemePreference() {
  const { ui, setPreferences, enableNotifications } = useAppPreferencesStore((state) => ({
    ui: state.preferences.ui,
    setPreferences: state.setPreferences,
    enableNotifications: state.preferences.enableNotifications
  }));

  const setTheme = (theme: ColorScheme) => setPreferences({ ui: { ...ui, theme } });

  const setLanguage = (language: LanguageOpts) => setPreferences({ language });

  const toggleNotifications = () =>
    setPreferences({ enableNotifications: !enableNotifications });

  return {
    ui,
    setTheme,
    setLanguage,
    toggleNotifications
  };
}

export function useEditorSettings() {
  const { editor, setPreferences } = useAppPreferencesStore((state) => ({
    editor: state.preferences.editor,
    setPreferences: state.setPreferences
  }));

  const setFontSize = (fontSize: number) =>
    setPreferences({ editor: { ...editor, fontSize } });

  const setFontFamily = (fontFamily: string) =>
    setPreferences({ editor: { ...editor, fontFamily } });

  const toggleAutoSave = () =>
    setPreferences({ editor: { ...editor, enableAutoSave: !editor.enableAutoSave } });

  return {
    editor,
    setFontSize,
    setFontFamily,
    toggleAutoSave
  };
}

export function useUserProfile() {
  const { user, setPreferences, resetPreferences } = useAppPreferencesStore((state) => ({
    user: state.preferences.user,
    setPreferences: state.setPreferences,
    resetPreferences: state.resetPreferences
  }));

  const updateProfile = (updates: Partial<typeof user>) =>
    setPreferences({ user: { ...user, ...updates } });
  const clearProfile = () => resetPreferences();

  return { user, updateProfile, clearProfile };
}

export function useAuth() {
  const { auth, setPreferences } = useAppPreferencesStore((state) => ({
    auth: state.preferences.auth,
    setPreferences: state.setPreferences
  }));

  const setToken = (token: string) => setPreferences({ auth: { ...auth, token } });
  const clearToken = () => setPreferences({ auth: { token: "" } });

  return { auth, setToken, clearToken };
}
