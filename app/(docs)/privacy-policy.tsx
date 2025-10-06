import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";
import { Stack, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicy() {
  const router = useRouter();
  const canGoBack = router.canGoBack();
  const { colorScheme } = useColorScheme();

  function getBack() {
    if (canGoBack) {
      router.back();
    }
  }

  return (
    <SafeAreaView className='flex-1'>
      <StatusBar
        animated={true}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          colorScheme === "dark" ? THEME.dark.background : THEME.light.background
        }
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className='font-display text-xl font-bold'>Privacy Policy</Text>
          ),
          headerTitleAlign: "center"
        }}
      />

      <ScrollView
        className='flex-1 px-4'
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        <Text className='mt-6 text-base leading-6'>
          Your privacy is important to us. This Privacy Policy explains how we collect, use,
          and protect your personal information when you use our application.
        </Text>

        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>1. Information We Collect</Text>
          <Text className='text-base leading-6'>
            We may collect personal information such as your name, email address, and
            account details when you register. We also collect usage data to improve our
            services.
          </Text>
        </View>

        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>2. How We Use Your Information</Text>
          <Text className='text-base leading-6'>
            Your information is used to provide, maintain, and improve our services. We may
            also use it to communicate with you, send updates, and respond to support
            requests.
          </Text>
        </View>

        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>3. Sharing of Information</Text>
          <Text className='text-base leading-6'>
            We do not sell or rent your personal information. We may share limited data with
            trusted third parties that help us operate the service, subject to strict
            confidentiality agreements.
          </Text>
        </View>

        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>4. Data Security</Text>
          <Text className='text-base leading-6'>
            We take reasonable measures to protect your information from unauthorized
            access, alteration, or disclosure. However, no system is completely secure.
          </Text>
        </View>

        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>5. Your Rights</Text>
          <Text className='text-base leading-6'>
            You have the right to access, update, or delete your personal information at any
            time. Contact us to exercise these rights.
          </Text>
        </View>

        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>6. Changes to This Policy</Text>
          <Text className='text-base leading-6'>
            We may update this Privacy Policy from time to time. Please review it regularly
            to stay informed of how we protect your information.
          </Text>
        </View>

        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>7. Contact Us</Text>
          <Text className='text-base leading-6'>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@example.com.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
