import { useAppPreferencesStore } from "@/store/preferences";
import { Folder, Plus, Tag } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { cn } from "../lib/utils";

interface FloatingButtonProps {
  onPress: () => void;
  onNewFolder?: () => void;
  onNewTag?: () => void;
  visible?: SharedValue<number>;
}

export const CreateButton = ({
  onPress,
  onNewFolder,
  onNewTag,
  visible
}: FloatingButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const preferences = useAppPreferencesStore((state) => state.preferences);

  const isDark = preferences.ui.theme === "dark";
  const expanded = useSharedValue(0);

  const toggleExpanded = () => {
    expanded.value = expanded.value ? 0 : 1;
  };

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(pressed ? 0.95 : 1) }],
    opacity: withSpring(pressed ? 0.9 : 1)
  }));

  const visibilityStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(visible?.value === 0 ? 100 : 0, { duration: 250 })
      }
    ],
    opacity: withTiming(visible?.value ?? 1, { duration: 250 })
  }));

  const actionsStyle = useAnimatedStyle(() => ({
    opacity: withTiming(expanded.value, { duration: 250 }),
    transform: [
      {
        scale: withTiming(interpolate(expanded.value, [0, 1], [0.9, 1]), {
          duration: 250
        })
      }
    ]
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 50,
          alignItems: "center"
        },
        visibilityStyle
      ]}>
      <Animated.View
        style={[
          actionsStyle,
          {
            marginBottom: 12,
            gap: 10,
            alignItems: "flex-end"
          }
        ]}>
        <QuickActionButton
          label='New Tag'
          icon={<Tag size={18} color={isDark ? "#fff" : "#000"} />}
          onPress={() => {
            expanded.value = 0;
            onNewTag?.();
          }}
          isDark={isDark}
        />
        <QuickActionButton
          label='New Folder'
          icon={<Folder size={18} color={isDark ? "#fff" : "#000"} />}
          onPress={() => {
            expanded.value = 0;
            onNewFolder?.();
          }}
          isDark={isDark}
        />
        <QuickActionButton
          label='New Note'
          icon={<Plus size={18} color={isDark ? "#fff" : "#000"} />}
          onPress={() => {
            expanded.value = 0;
            onPress();
          }}
          isDark={isDark}
        />
      </Animated.View>

      <Animated.View style={[scaleStyle]}>
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={onPress}
          onLongPress={toggleExpanded}
          className={cn(
            "h-14 w-14 items-center justify-center rounded-full border backdrop-blur-md",
            isDark
              ? "border-neutral-700/40 bg-neutral-900/60"
              : "border-white/30 bg-white/40"
          )}>
          <Plus size={26} color={isDark ? "#fff" : "#000"} strokeWidth={2.2} />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

function QuickActionButton({
  label,
  icon,
  onPress,
  isDark
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  isDark: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md",
        isDark ? "border-neutral-700/40 bg-neutral-900/70" : "border-white/30 bg-white/50"
      )}>
      {icon}
      <Text className={cn("text-sm font-medium", isDark ? "text-white" : "text-black")}>
        {label}
      </Text>
    </Pressable>
  );
}
