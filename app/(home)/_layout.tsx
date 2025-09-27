import { Tabs } from "expo-router";
// import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
// import { TouchableOpacity } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   interpolate,
//   useSharedValue
// } from 'react-native-reanimated';
// import { useWindowDimensions } from 'react-native';
//
// import { Tabs } from 'expo-router';
import { CalendarDaysIcon, CogIcon, Home, Search } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: isDark ? "#666" : "#999",
        tabBarStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
          borderTopColor: isDark ? "#333" : "#e0e0e0"
        },
        tabBarLabelStyle: {
          fontWeight: "bold"
        }
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name='folders/index'
        options={{
          title: "Folders",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name='search/index'
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name='calendar/index'
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => <CalendarDaysIcon size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name='settings/index'
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => <CogIcon size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
