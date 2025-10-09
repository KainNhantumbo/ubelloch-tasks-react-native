import { THEME } from "@/lib/theme";
import { useAppPreferencesStore } from "@/store/preferences";
import * as React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export default function ScreenContainer({ children }: Props) {
  const { theme } = useAppPreferencesStore((s) => s.preferences.ui);

  return (
    <SafeAreaView className='flex-1'>
      <StatusBar
        animated={true}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? THEME.dark.background : THEME.light.background}
      />
      {children}
    </SafeAreaView>
  );
}
