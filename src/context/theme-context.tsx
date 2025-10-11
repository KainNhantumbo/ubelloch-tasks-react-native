import { NAV_THEME } from "@/lib/theme";
import { getEffectiveTheme } from "@/lib/utils";
import { useAppPreferencesStore } from "@/store/preferences";
import { ThemeProvider as ThemeInitializer } from "@react-navigation/native";
import * as React from "react";
import { Appearance, AppState } from "react-native";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferences, hydrated, setPreferences } = useAppPreferencesStore();

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    getEffectiveTheme(preferences.ui.mode, preferences.ui.theme)
  );

  React.useEffect(() => {
    if (hydrated) {
      setResolvedTheme(getEffectiveTheme(preferences.ui.mode, preferences.ui.theme));
    }
  }, [hydrated, preferences.ui.mode, preferences.ui.theme]);

  React.useEffect(() => {
    if (preferences.ui.mode !== "system") return;

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setResolvedTheme(colorScheme === "dark" ? "dark" : "light");
    });

    return () => sub.remove();
  }, [preferences.ui.mode]);

  React.useEffect(() => {
    setPreferences({ ui: { ...preferences.ui, theme: resolvedTheme } });
  }, [resolvedTheme]);

  React.useEffect(() => {
    if (preferences.ui.mode !== "system") return;

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setResolvedTheme(Appearance.getColorScheme() === "dark" ? "dark" : "light");
      }
    });

    return () => sub.remove();
  }, [preferences.ui.mode]);

  return <ThemeInitializer value={NAV_THEME[resolvedTheme]}>{children}</ThemeInitializer>;
}
