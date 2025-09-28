import { CarouselContainer } from "@/components/onboarding-carousel";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { THEME } from "@/lib/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { SproutIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import * as React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className='flex-1'>
      <StatusBar barStyle='default' animated={true} backgroundColor={"#7e1b8c"} />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91", "#ff6f9110"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <CarouselContainer />

        <View className='flex-1 items-center justify-center px-4'>
          <View className='mb-16'>
            <Text className='font-display text-5xl font-bold'>{appBaseConfig.title}</Text>
          </View>

          <View className='flex w-full flex-col gap-3'>
            <Link asChild href={"/(home)"}>
              <Button size={"lg"} variant={"default"}>
                <Text className='font-bold uppercase'>Skip and start now</Text>
              </Button>
            </Link>

            <View className='flex w-full flex-row gap-2'>
              <Link asChild href={"/login"} className='flex-1'>
                <Button variant='outline' size='default' className='w-full'>
                  <Text className='font-bold uppercase'>Login</Text>
                </Button>
              </Link>

              <Link asChild href={"/signup"} className='flex-1'>
                <Button variant='outline' size='default' className='w-full'>
                  <Text className='font-bold uppercase'>Sign Up</Text>
                </Button>
              </Link>
            </View>
            <View className='flex flex-row items-center'>
              <Link asChild href={"/signup"} className='flex-1'>
                <Button variant='link' size='sm' className='w-full'>
                  <Text className='text-sm font-semibold'>Terms of Use</Text>
                </Button>
              </Link>
              <SproutIcon
                size={18}
                color={
                  colorScheme === "light" ? THEME.light.foreground : THEME.dark.foreground
                }
              />
              <Link asChild href={"/signup"} className='flex-1'>
                <Button variant='link' size='sm' className='w-full'>
                  <Text className='text-sm font-semibold'>Privacy Policy</Text>
                </Button>
              </Link>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
