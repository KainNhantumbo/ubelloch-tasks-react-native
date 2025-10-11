import { NAV_THEME, THEME } from "@/lib/theme";
import { useAppPreferencesStore } from "@/store/preferences";
import { NavigationContainer } from "@react-navigation/native";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";

type ResolvedTheme = "light" | "dark";

interface AppThemeContextValue {
  theme: ResolvedTheme;
  colors: typeof THEME.light;
}

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function useAppTheme() {
  const ctx = useContext(AppThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used inside ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferences, hydrated } = useAppPreferencesStore();

  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    preferences.ui.mode === "system"
      ? Appearance.getColorScheme() === "dark"
        ? "dark"
        : "light"
      : preferences.ui.theme
  );

  useEffect(() => {
    if (preferences.ui.mode !== "system") return;
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setResolved(colorScheme === "dark" ? "dark" : "light");
    });
    return () => sub.remove();
  }, [preferences.ui.mode]);

  useEffect(() => {
    if (!hydrated) return;
    if (preferences.ui.mode === "strict") {
      setResolved(preferences.ui.theme);
    } else {
      const current = Appearance.getColorScheme();
      setResolved(current === "dark" ? "dark" : "light");
    }
  }, [hydrated, preferences.ui.mode, preferences.ui.theme]);

  const colorTokens = THEME[resolved];

  const contextValue = useMemo(
    () => ({
      theme: resolved,
      colors: colorTokens
    }),
    [resolved, colorTokens]
  );

  return (
    <AppThemeContext.Provider value={contextValue}>
      <NavigationContainer theme={NAV_THEME[resolved]}>{children}</NavigationContainer>
    </AppThemeContext.Provider>
  );
}
