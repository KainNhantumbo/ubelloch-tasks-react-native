import { useKeyboardManager } from "@/hooks/use-keyboard-manager";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback, useRef } from "react";
import { BackHandler, TouchableOpacity } from "react-native";

export interface SheetProps {
  content: React.ReactNode;
  trigger: React.ReactNode;
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
}

export function SheetContainer(props: SheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { handleBeforeSheetOpen, handleAfterSheetClose } = useKeyboardManager();

  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
    handleBeforeSheetOpen();
    props.setIsSheetOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    props.setIsSheetOpen(false);
    handleAfterSheetClose();
  }, []);

  React.useEffect(() => {
    const backAction = () => {
      if (props.isSheetOpen) {
        closeSheet();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [props.isSheetOpen, closeSheet]);

  return (
    <BottomSheetModalProvider>
      <TouchableOpacity onPress={openSheet}>{props.trigger}</TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enablePanDownToClose
        onDismiss={closeSheet}>
        <BottomSheetView className='bg-background px-5 py-6'>
          {props.content}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
