import { CreateButton } from "@/components/create-button";
import { useNavigation } from "expo-router";
import { View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotesStore } from "../../store/notes";

export default function HomeScreen() {
  const { notes } = useNotesStore();
  const navigation = useNavigation();
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
      <View>
        <Animated.FlatList
          data={notes}
          onScroll={onScroll}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          renderItem={({ item }) => (
            <View className='flex-row justify-between border-b p-2'></View>
          )}
        />
        <CreateButton
          visible={fabVisible}
          onPress={() => navigation.navigate("NoteForm" as never)}
          onNewFolder={() => console.log("📁 Create new folder")}
          onNewTag={() => console.log("🏷️ Create new tag")}
        />
      </View>
    </SafeAreaView>
  );
}
