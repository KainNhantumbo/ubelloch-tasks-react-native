import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className='flex-1'>
      <StatusBar barStyle='light-content' />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <View className='flex-1 items-center justify-center px-8'>
          <View className='mb-16'>
            <Heading className='' size={"5xl"}>
              {appBaseConfig.title}
            </Heading>
          </View>

          <View className='bg-wordsy-cyan mx-4 mb-16 rounded-2xl px-6 py-4'>
            <Text className='text-fo'>{appBaseConfig.description}</Text>
          </View>

          <Link asChild href={"/login"}>
            <TouchableOpacity
              className='rounded-full bg-gray-800 px-12 py-4 shadow-lg'
              activeOpacity={0.8}>
              <Text className='text-lg font-medium text-white'>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </LinearGradient>
    </View>
  );
}
