import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../styles/global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [loaded, error] = useFonts({
    "Fredoka-Bold": require("../assets/fonts/fredoka/Fredoka-Bold.ttf"),
    "Fredoka-Light": require("../assets/fonts/fredoka/Fredoka-Light.ttf"),
    "Fredoka-Medium": require("../assets/fonts/fredoka/Fredoka-Medium.ttf"),
    "Fredoka-Regular": require("../assets/fonts/fredoka/Fredoka-Regular.ttf"),
    "Fredoka-SemiBold": require("../assets/fonts/fredoka/Fredoka-SemiBold.ttf"),
    "AlbertSans-Regular": require("../assets/fonts/albert/albert-sans-latin-400-normal.ttf"),
    "AlbertSans-Italic": require("../assets/fonts/albert/albert-sans-latin-400-italic.ttf"),
    "AlbertSans-Medium": require("../assets/fonts/albert/albert-sans-latin-500-normal.ttf"),
    "AlbertSans-MediumItalic": require("../assets/fonts/albert/albert-sans-latin-500-italic.ttf"),
    "AlbertSans-SemiBold": require("../assets/fonts/albert/albert-sans-latin-600-normal.ttf"),
    "AlbertSans-SemiBoldItalic": require("../assets/fonts/albert/albert-sans-latin-600-italic.ttf"),
    "AlbertSans-Bold": require("../assets/fonts/albert/albert-sans-latin-700-normal.ttf"),
    "AlbertSans-BoldItalic": require("../assets/fonts/albert/albert-sans-latin-700-italic.ttf"),
    "AlbertSans-ExtraBold": require("../assets/fonts/albert/albert-sans-latin-800-normal.ttf"),
    "AlbertSans-ExtraBoldItalic": require("../assets/fonts/albert/albert-sans-latin-800-italic.ttf")
  });

  console.log({ colorScheme });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={NAV_THEME[colorScheme === "dark" ? "dark" : "light"]}>
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
      <PortalHost />
      <GestureHandlerRootView>
        <KeyboardProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
