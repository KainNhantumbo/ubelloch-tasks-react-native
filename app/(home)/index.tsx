import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotesStore } from "../../store/notes";

export default function HomeScreen() {
  const { notes } = useNotesStore();
  console.log({ notes });

  return (
    <SafeAreaView className='flex-1'>
      <View>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          renderItem={({ item }) => (
            <View className='flex-row justify-between border-b p-2'></View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
