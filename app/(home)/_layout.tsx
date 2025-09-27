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
import { Clock, Heart, Home, MoreHorizontal, Search } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
          borderTopColor: isDark ? "#333" : "#e0e0e0"
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: isDark ? "#666" : "#999"
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Home size={size} color={color} fill={focused ? color : "none"} />
          )
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Search size={size} color={color} fill={focused ? color : "none"} />
          )
        }}
      />
      <Tabs.Screen
        name='more'
        options={{
          title: "More",
          tabBarIcon: ({ color, size, focused }) => (
            <MoreHorizontal size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='reminders'
        options={{
          title: "Reminders",
          tabBarIcon: ({ color, size, focused }) => (
            <Clock size={size} color={color} fill={focused ? color : "none"} />
          )
        }}
      />
      <Tabs.Screen
        name='projects'
        options={{
          title: "Projects",
          tabBarIcon: ({ color, size, focused }) => (
            <Heart size={size} color={color} fill={focused ? color : "none"} />
          )
        }}
      />
    </Tabs>
  );
}
