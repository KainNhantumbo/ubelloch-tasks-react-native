import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode='light'>
      <Stack
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name='splash' />
      </Stack>
      <StatusBar style='auto' />
    </GluestackUIProvider>
  );
}
