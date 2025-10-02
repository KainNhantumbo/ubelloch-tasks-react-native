import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";
import { useColorScheme } from "nativewind";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsOfUse() {
  const { colorScheme } = useColorScheme();
  
  return (
    <SafeAreaView className='flex-1'>
      <StatusBar
        animated={true}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          colorScheme === "dark" ? THEME.dark.background : THEME.light.background
        }
      />
      <ScrollView
        className='flex-1 px-4'
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        <Text className='mt-4 text-center font-display text-2xl font-bold'>
          Terms of Use
        </Text>

        <Text className='mt-6 text-base leading-6 text-gray-700 dark:text-gray-300'>
          Welcome to our application. By accessing or using our services, you agree to be
          bound by these Terms of Use. Please read them carefully.
        </Text>

        {/* Section 1 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>1. Acceptance of Terms</Text>
          <Text variant={"p"}>
            By creating an account or using our services, you confirm that you have read,
            understood, and agreed to be bound by these Terms. If you do not agree, you may
            not use the service.
          </Text>
        </View>

        {/* Section 2 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>2. User Responsibilities</Text>
          <Text variant={"p"}>
            You agree to use the service only for lawful purposes and in compliance with all
            applicable laws and regulations. You are responsible for maintaining the
            confidentiality of your account credentials.
          </Text>
        </View>

        {/* Section 3 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>3. Intellectual Property</Text>
          <Text variant={"p"}>
            All content, logos, trademarks, and other intellectual property displayed within
            the application remain the property of the company. You may not copy, reproduce,
            or distribute any part of the service without permission.
          </Text>
        </View>

        {/* Section 4 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>4. Limitation of Liability</Text>
          <Text variant={"p"}>
            We are not responsible for any indirect, incidental, or consequential damages
            arising from the use of our services. Your use of the application is at your own
            risk.
          </Text>
        </View>

        {/* Section 5 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>5. Changes to Terms</Text>
          <Text variant={"p"}>
            We may update these Terms from time to time. Continued use of the service
            constitutes acceptance of the revised Terms.
          </Text>
        </View>

        {/* Section 6 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold'>6. Contact Us</Text>
          <Text variant={"p"}>
            If you have any questions about these Terms, please contact us at
            support@example.com.
          </Text>
        </View>

        {/* Action Button */}
        <View className='mb-5 mt-10'>
          <Button variant='default' size='lg' onPress={() => console.log("Accepted")}>
            <Text className='font-semibold uppercase text-white'>Accept & Continue</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
