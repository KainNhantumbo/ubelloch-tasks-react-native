import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../styles/global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
