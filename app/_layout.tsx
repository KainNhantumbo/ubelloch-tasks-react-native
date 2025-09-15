import { Stack } from "expo-router";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)/splash'
        options={{
          headerShown: false,
          statusBarStyle: "light"
        }}
      />
    </Stack>
  );
}
