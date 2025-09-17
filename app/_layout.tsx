import { ThemeProvider } from "@/theme/theme-provider";
import { Stack } from "expo-router";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name='(tabs)/splash' />
      </Stack>
    </ThemeProvider>
  );
}
