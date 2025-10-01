import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsOfUse() {
  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-black'>
      <ScrollView
        className='flex-1 px-5'
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        <Text className='mt-4 text-center font-display text-2xl font-bold text-black dark:text-white'>
          Terms of Use
        </Text>

        <Text className='mt-6 text-base leading-6 text-gray-700 dark:text-gray-300'>
          Welcome to our application. By accessing or using our services, you agree to be
          bound by these Terms of Use. Please read them carefully.
        </Text>

        {/* Section 1 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold text-black dark:text-white'>
            1. Acceptance of Terms
          </Text>
          <Text className='text-base leading-6 text-gray-700 dark:text-gray-300'>
            By creating an account or using our services, you confirm that you have read,
            understood, and agreed to be bound by these Terms. If you do not agree, you may
            not use the service.
          </Text>
        </View>

        {/* Section 2 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold text-black dark:text-white'>
            2. User Responsibilities
          </Text>
          <Text className='text-base leading-6 text-gray-700 dark:text-gray-300'>
            You agree to use the service only for lawful purposes and in compliance with all
            applicable laws and regulations. You are responsible for maintaining the
            confidentiality of your account credentials.
          </Text>
        </View>

        {/* Section 3 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold text-black dark:text-white'>
            3. Intellectual Property
          </Text>
          <Text className='text-base leading-6 text-gray-700 dark:text-gray-300'>
            All content, logos, trademarks, and other intellectual property displayed within
            the application remain the property of the company. You may not copy, reproduce,
            or distribute any part of the service without permission.
          </Text>
        </View>

        {/* Section 4 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold text-black dark:text-white'>
            4. Limitation of Liability
          </Text>
          <Text className='text-base leading-6 text-gray-700 dark:text-gray-300'>
            We are not responsible for any indirect, incidental, or consequential damages
            arising from the use of our services. Your use of the application is at your own
            risk.
          </Text>
        </View>

        {/* Section 5 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold text-black dark:text-white'>
            5. Changes to Terms
          </Text>
          <Text className='text-base leading-6 text-gray-700 dark:text-gray-300'>
            We may update these Terms from time to time. Continued use of the service
            constitutes acceptance of the revised Terms.
          </Text>
        </View>

        {/* Section 6 */}
        <View className='mt-6'>
          <Text className='mb-2 text-lg font-semibold text-black dark:text-white'>
            6. Contact Us
          </Text>
          <Text className='text-base leading-6 text-gray-700 dark:text-gray-300'>
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
