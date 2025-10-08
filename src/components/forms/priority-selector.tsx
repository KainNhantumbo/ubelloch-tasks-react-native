import { SheetContainer } from "@/components/sheet-container";
import { NOTE_PRIORITIES } from "@/constants";
import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { NotePriority } from "../../types/note";

const PRIORITY_COLORS: Record<NotePriority, string> = {
  NONE: "#9CA3AF",
  LOW: "#10B981",
  MEDIUM: "#3B82F6",
  HIGH: "#F59E0B",
  URGENT: "#EF4444"
};

interface PrioritySelectorProps {
  value: NotePriority;
  onChange: (value: NotePriority) => void;
}

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  let isActive = useMemo(() => false, []);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: withSpring(isActive ? 1.05 : 1) }],
      opacity: withSpring(isActive ? 1 : 0.7)
    }),
    [isActive]
  );

  const renderPriorityItem = (priority: NotePriority) => {
    isActive = value === priority;
    return (
      <Animated.View key={priority} style={[animatedStyle]}>
        <Pressable
          onPress={() => {
            onChange(priority);
            setIsSheetOpen(false);
          }}
          className='flex-row items-center justify-between border-b border-gray-200 py-3'>
          <Text
            className='text-base font-medium'
            style={{ color: isActive ? PRIORITY_COLORS[priority] : "#6B7280" }}>
            {priority}
          </Text>
          {isActive && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: PRIORITY_COLORS[priority]
              }}
            />
          )}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <SheetContainer
      isSheetOpen={isSheetOpen}
      setIsSheetOpen={setIsSheetOpen}
      trigger={
        <Pressable
          className='mt-2 flex-row items-center justify-between rounded-md border border-gray-300 p-3'
          onPress={() => setIsSheetOpen(true)}>
          <Text className='font-medium text-gray-800'>Priority: {value}</Text>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: PRIORITY_COLORS[value]
            }}
          />
        </Pressable>
      }
      content={
        <View className='gap-1'>
          <Text className='mb-2 text-lg font-semibold'>Select Priority</Text>
          {NOTE_PRIORITIES.map(renderPriorityItem)}
        </View>
      }
    />
  );
}
