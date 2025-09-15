import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Rect } from "react-native-svg";

const NotebookIllustration = () => (
  <View className='items-center justify-center'>
    <Svg width={200} height={240} viewBox='0 0 200 240'>
      <Rect
        x='20'
        y='40'
        width='140'
        height='180'
        rx='8'
        fill='white'
        stroke='#e5e7eb'
        strokeWidth='2'
      />
      <Circle cx='40' cy='20' r='8' fill='none' stroke='#374151' strokeWidth='3' />
      <Circle cx='70' cy='20' r='8' fill='none' stroke='#374151' strokeWidth='3' />
      <Circle cx='100' cy='20' r='8' fill='none' stroke='#374151' strokeWidth='3' />
      <Circle cx='130' cy='20' r='8' fill='none' stroke='#374151' strokeWidth='3' />
      <Path
        d='M35 70 L145 70 M35 90 L145 90 M35 110 L145 110 M35 130 L145 130'
        stroke='#e5e7eb'
        strokeWidth='1'
      />
      <Rect
        x='120'
        y='60'
        width='60'
        height='8'
        rx='4'
        fill='#0891b2'
        transform='rotate(45 150 64)'
      />
      <Circle cx='165' cy='49' r='3' fill='#374151' transform='rotate(45 150 64)' />
    </Svg>
  </View>
);

interface SplashScreenProps {
  onGetStarted?: () => void;
}

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      console.log("Get Started pressed");
    }
  };

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
            <Text className='text-center text-4xl font-bold tracking-wide text-white'>
              Wordsy
            </Text>
          </View>

          <View className='mb-16'>
            <NotebookIllustration />
          </View>

          <View className='bg-wordsy-cyan mx-4 mb-16 rounded-2xl px-6 py-4'>
            <Text className='text-center text-xl font-semibold text-white'>
              All your ideas{"\n"}in one place
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleGetStarted}
            className='rounded-full bg-gray-800 px-12 py-4 shadow-lg'
            activeOpacity={0.8}>
            <Text className='text-lg font-medium text-white'>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
