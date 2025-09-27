import { THEME } from "@/lib/theme";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { StatusBar } from "react-native";

export default function AuthLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <StatusBar
        animated={true}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          colorScheme === "dark" ? THEME.dark.background : THEME.light.background
        }
      />
    </Stack>
  );
}
