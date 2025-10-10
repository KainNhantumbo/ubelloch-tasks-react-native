import ScreenContainer from "@/components/screen-container";
import { Text } from "@/components/ui/text";
import { Clock } from "lucide-react-native";
import { View } from "react-native";

export default function RemindersScreen() {
  return (
    <ScreenContainer>
      <View className='flex-1 items-center justify-center bg-background'>
        <Clock size={48} color='#007AFF' className='mb-4' />
        <Text className='mb-2 text-2xl font-bold'>Projects</Text>
      </View>
    </ScreenContainer>
  );
}
