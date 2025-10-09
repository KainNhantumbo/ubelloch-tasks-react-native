import { Keyboard } from "react-native";
import { useRef } from "react";

export function useKeyboardManager() {
  const wasKeyboardOpen = useRef(false);
  const lastFocusedInput = useRef<() => void | null>(null);

  const registerInputFocus = (focusFn: () => void) => {
    lastFocusedInput.current = focusFn;
  };

  const handleBeforeSheetOpen = () => {
    Keyboard.dismiss();
    wasKeyboardOpen.current = true;
  };

  const handleAfterSheetClose = () => {
    if (wasKeyboardOpen.current && lastFocusedInput.current) {
      setTimeout(() => {
        lastFocusedInput.current?.();
      }, 150);
    }
  };

  return {
    registerInputFocus,
    handleBeforeSheetOpen,
    handleAfterSheetClose
  };
}
