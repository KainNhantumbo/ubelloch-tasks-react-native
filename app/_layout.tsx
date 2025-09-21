import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../styles/global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
      <KeyboardProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name='splash' />
        </Stack>
        <StatusBar style='auto' />
      </KeyboardProvider>
    </GluestackUIProvider>
  );
}
