import { Stack } from "expo-router";

export default function SplashLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='splash' options={{ headerBlurEffect: "dark" }} />
    </Stack>
  );
}
