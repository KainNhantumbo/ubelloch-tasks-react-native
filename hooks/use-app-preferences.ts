import { useAppPreferencesStore } from "../store/preferences";

export function useThemePreference() {
  const { ui, setPreferences } = useAppPreferencesStore((state) => ({
    ui: state.preferences.ui,
    setPreferences: state.setPreferences
  }));

  const setTheme = (theme: string) => setPreferences({ ui: { ...ui, theme } });

  const toggleDarkMode = () =>
    setPreferences({ ui: { ...ui, enableDarkMode: !ui.enableDarkMode } });

  const setLanguage = (language: string) => setPreferences({ ui: { ...ui, language } });

  const toggleNotifications = () =>
    setPreferences({ ui: { ...ui, enableNotifications: !ui.enableNotifications } });

  return {
    ui,
    setTheme,
    toggleDarkMode,
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
