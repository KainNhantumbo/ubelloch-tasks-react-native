import { CreateButton } from "@/components/create-button";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotesStore } from "../../store/notes";

export default function HomeScreen() {
  const { notes } = useNotesStore();
  const router = useRouter();
  const fabVisible = useSharedValue(1);
  const lastOffset = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      if (y > lastOffset.value + 20) fabVisible.value = 0;
      else if (y < lastOffset.value - 20) fabVisible.value = 1;
      lastOffset.value = y;
    }
  });

  console.log({ notes });

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1'>
        <Animated.View style={{ flex: 1 }}>
          <FlashList
            data={notes}
            onScroll={onScroll}
            renderItem={({ item }) => (
              <View className='flex-row justify-between border-b border-gray-200 p-3 dark:border-gray-700'></View>
            )}
            keyExtractor={(item) => item.id?.toString() ?? ""}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className='flex-1 items-center justify-center py-10'>
                {/*"no notes" UI comes here */}
              </View>
            }
          />
        </Animated.View>

        <CreateButton
          visible={fabVisible}
          onPress={async () => {
            const id = await useNotesStore.getState().createEmptyNote();
            router.push(`/note/${id}`);
          }}
          onNewFolder={() => console.log("📁 Create new folder")}
          onNewTag={() => console.log("🏷️ Create new tag")}
        />
      </View>
    </SafeAreaView>
  );
}
