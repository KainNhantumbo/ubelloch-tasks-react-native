import { Text } from "@/components/ui/text";
import { Search } from "lucide-react-native";
import { View } from "react-native";

export default function SearchScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-background'>
      <Search size={48} color='#007AFF' className='mb-4' />
      <Text className='mb-2 text-2xl font-bold'>Search</Text>
      <Text className='text-base text-secondary'>Busque por conteúdo</Text>
    </View>
  );
}
