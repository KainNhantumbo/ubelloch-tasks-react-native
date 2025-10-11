import { THEME } from "@/lib/theme";
import { useAppPreferencesStore } from "@/store/preferences";
import {
  LucideBold,
  LucideItalic,
  LucideList,
  LucideListOrdered,
  LucideRotateCcw,
  LucideRotateCw,
  LucideUnderline
} from "lucide-react-native";
import * as React from "react";
import { Animated, Keyboard, Pressable, Text, View } from "react-native";
import type { NoteContentEditorRef } from "./index";

type Props = {
  editorRef: React.RefObject<NoteContentEditorRef | null>;
};

export function FormattingToolbar({ editorRef }: Props) {
  const theme = useAppPreferencesStore((s) => s.preferences.ui.theme);
  const isDark = theme === "dark";
  // const { registerInputFocus } = useKeyboardManager?.() ?? {
  //   registerToolbarKeyboard: () => {}
  // };

  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const anim = React.useRef(new Animated.Value(0)).current;
  const visibleRef = React.useRef(false);

  React.useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates?.height ?? 260);
      visibleRef.current = true;
      Animated.timing(anim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      visibleRef.current = false;
      Animated.timing(anim, { toValue: 0, duration: 160, useNativeDriver: true }).start();
      setKeyboardHeight(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [anim]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0]
  });

  const Button = ({
    onPress,
    children
  }: {
    onPress: () => void;
    children: React.ReactNode;
  }) => (
    <Pressable
      onPress={onPress}
      className={`h-10 w-10 items-center justify-center rounded-md ${isDark ? "bg-neutral-800" : "bg-white"} border ${isDark ? "border-neutral-700" : "border-gray-200"} shadow-sm`}
      android_ripple={{ color: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
      {children}
    </Pressable>
  );

  return (
    <Animated.View
      pointerEvents='box-none'
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: keyboardHeight,
        transform: [{ translateY }],
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: isDark ? THEME.dark.background : THEME.light.background,
        borderTopWidth: 1,
        borderTopColor: isDark ? "rgba(255,255,255,0.03)" : "#E5E7EB",
        zIndex: 60
      }}>
      <View className='flex-row items-center gap-2'>
        <Button onPress={() => editorRef.current?.toggleBold()}>
          <LucideBold size={18} color={isDark ? "#fff" : "#111"} />
        </Button>

        <Button onPress={() => editorRef.current?.toggleItalic()}>
          <LucideItalic size={18} color={isDark ? "#fff" : "#111"} />
        </Button>

        <Button onPress={() => editorRef.current?.toggleUnderline()}>
          <LucideUnderline size={18} color={isDark ? "#fff" : "#111"} />
        </Button>

        <Button onPress={() => editorRef.current?.toggleH2()}>
          <Text className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
            H2
          </Text>
        </Button>

        <Button onPress={() => editorRef.current?.toggleUnorderedList()}>
          <LucideList size={18} color={isDark ? "#fff" : "#111"} />
        </Button>

        <Button onPress={() => editorRef.current?.toggleOrderedList()}>
          <LucideListOrdered size={18} color={isDark ? "#fff" : "#111"} />
        </Button>

        <Button onPress={() => editorRef.current?.undo()}>
          <LucideRotateCcw size={18} color={isDark ? "#fff" : "#111"} />
        </Button>

        <Button onPress={() => editorRef.current?.redo()}>
          <LucideRotateCw size={18} color={isDark ? "#fff" : "#111"} />
        </Button>
      </View>
    </Animated.View>
  );
}
