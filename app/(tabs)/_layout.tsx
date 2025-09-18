import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SplashLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='splash' options={{ headerBlurEffect: "dark" }} />
      <StatusBar style='auto' />
    </Stack>
  );
}
