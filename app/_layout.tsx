import { Text } from "@/components/ui/text";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import React, { Suspense, useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../styles/global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [loaded, error] = useFonts({
    "PlusJakartaSans-Bold": require("../assets/fonts/jakarta/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-BoldItalic": require("../assets/fonts/jakarta/PlusJakartaSans-BoldItalic.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/jakarta/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-MediumItalic": require("../assets/fonts/jakarta/PlusJakartaSans-MediumItalic.ttf"),
    "PlusJakartaSans-Regular": require("../assets/fonts/jakarta/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Italic": require("../assets/fonts/jakarta/PlusJakartaSans-Italic.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/jakarta/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-SemiBoldItalic": require("../assets/fonts/jakarta/PlusJakartaSans-SemiBoldItalic.ttf"),

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
          <Suspense fallback={<Text>Loading...</Text>}>
            <Stack
              screenOptions={{
                headerShown: false
              }}
            />
          </Suspense>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
