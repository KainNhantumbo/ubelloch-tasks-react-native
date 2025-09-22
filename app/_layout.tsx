import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../styles/global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    "Fredoka-Bold": require("@/assets/fonts/Fredoka-Bold.ttf"),
    "Fredoka-Light": require("@/assets/fonts/Fredoka-Light.ttf"),
    "Fredoka-Medium": require("@/assets/fonts/Fredoka-Medium.ttf"),
    "Fredoka-Regular": require("@/assets/fonts/Fredoka-Regular.ttf"),
    "Fredoka-SemiBold": require("@/assets/fonts/Fredoka-SemiBold.ttf"),
    "AlbertSans-Regular": require("@/assets/fonts/albert-sans-latin-400-normal.ttf"),
    "AlbertSans-Italic": require("@/assets/fonts/albert-sans-latin-400-italic.ttf"),
    "AlbertSans-Medium": require("@/assets/fonts/albert-sans-latin-500-normal.ttf"),
    "AlbertSans-MediumItalic": require("@/assets/fonts/albert-sans-latin-500-italic.ttf"),
    "AlbertSans-SemiBold": require("@/assets/fonts/albert-sans-latin-600-normal.ttf"),
    "AlbertSans-SemiBoldItalic": require("@/assets/fonts/albert-sans-latin-600-italic.ttf"),
    "AlbertSans-Bold": require("@/assets/fonts/albert-sans-latin-700-normal.ttf"),
    "AlbertSans-BoldItalic": require("@/assets/fonts/albert-sans-latin-700-italic.ttf"),
    "AlbertSans-ExtraBold": require("@/assets/fonts/albert-sans-latin-800-normal.ttf"),
    "AlbertSans-ExtraBoldItalic": require("@/assets/fonts/albert-sans-latin-800-italic.ttf")
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
    <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
      <GestureHandlerRootView>
        <KeyboardProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
