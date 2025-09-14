import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View className="flex-1 border border-1 border-slate-400 w-[50px] bg-black h-[40px] rounded-full"></View>
    </View>
  );
}
