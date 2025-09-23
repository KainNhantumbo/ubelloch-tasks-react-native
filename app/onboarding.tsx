import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { useAssets } from "expo-asset";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import * as React from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

type OnboardCarouselItem = {
  title: string;
  description: string;
  imagePath: string | undefined;
};

export function CarouselContainer() {
  const progress = useSharedValue<number>(0);
  const [assets, error] = useAssets([
    require("../assets/onboarding/images/notebook.png"),
    require("../assets/onboarding/images/organization.png"),
    require("../assets/onboarding/images/user-vision.png")
  ]);

  const onboardCarouselItems: OnboardCarouselItem[] = [
    {
      title: "Track Your Tasks",
      description:
        "Easily manage and organize your daily tasks with our intuitive interface.",
      imagePath: assets?.[0].uri
    },
    {
      title: "Stay Organized",
      description: "Categorize your tasks and set priorities to maximize productivity.",
      imagePath: assets?.[1].uri
    },
    {
      title: "Achieve More",
      description:
        "Boost your efficiency and accomplish your goals with our task management system.",
      imagePath: assets?.[2].uri
    }
  ];

  if (error) {
    console.error(error);
    return (
      <View>
        <Text>Error loading assets</Text>
      </View>
    );
  }

  return (
    <Carousel
      autoPlayInterval={4000}
      data={onboardCarouselItems}
      loop={true}
      pagingEnabled={true}
      snapEnabled={true}
      autoPlay={true}
      onProgressChange={progress}
      width={400}
      height={400}
      renderItem={({ item, index }) => {
        return (
          <View key={index} className='-ml-6 mt-4 w-full flex-1 items-center'>
            <Image
              source={{ uri: item.imagePath }}
              className='aspect-square h-[260px] w-[260px] object-cover'
            />
            <View className='p-8'>
              <Text className='text-center font-sans text-3xl font-medium leading-relaxed'>
                {item.title}
              </Text>
              <Text className='text-md w-[280px] text-center font-sans leading-8'>
                {item.description}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
}

export default function Onboarding() {
  return (
    <SafeAreaView className='flex-1'>
      <StatusBar barStyle='default' animated={true} backgroundColor={"#7e1b8c"} />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <CarouselContainer />

        <View className='flex-1 items-center justify-center px-8'>
          <View className='mb-16'>
            <Text className='bg-primary font-sans text-5xl font-bold'>
              {appBaseConfig.title}
            </Text>
          </View>

          <Link asChild href={"/login"}>
            <TouchableOpacity
              className='rounded-full bg-gray-800 px-12 py-4 shadow-lg'
              activeOpacity={0.8}>
              <Text className='font-sans text-lg font-medium text-white'>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
