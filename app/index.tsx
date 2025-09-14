import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View className='border-1 h-[40px] w-[50px] flex-1 rounded-full border border-slate-400 bg-black'></View>
    </View>
  );
}
