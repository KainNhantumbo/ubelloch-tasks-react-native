import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { ArrowLeft, ChevronLastIcon, MailIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const canGoBack = router.canGoBack();
  const { colorScheme } = useColorScheme();

  function getBack() {
    if (canGoBack) {
      router.back();
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    Keyboard.dismiss();
    console.log("Send reset pressed", data);
  };

  return (
    <SafeAreaView className='flex-1'>
      <StatusBar
        animated={true}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          colorScheme === "dark" ? THEME.dark.background : THEME.light.background
        }
      />

      <View className='flex flex-row items-center justify-between bg-transparent px-2 py-3'>
        <Button
          variant={"ghost"}
          size={"sm"}
          onPress={getBack}
          className='flex flex-row items-center gap-2 px-1'>
          <ArrowLeft
            size={18}
            color={colorScheme === "light" ? THEME.light.foreground : THEME.dark.foreground}
          />
          <Text className='text-base'>Back</Text>
        </Button>

        <Link asChild href={"/login"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            className='flex flex-row items-center gap-2'>
            <Text className='text-base'>Skip</Text>
            <ChevronLastIcon
              size={18}
              color={
                colorScheme === "light" ? THEME.light.foreground : THEME.dark.foreground
              }
            />
          </Button>
        </Link>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 30 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}>
        <View className='flex-1 justify-center'>
          <View className='mb-12'>
            <Text className='mb-4 text-center text-3xl font-bold text-white'>
              Reset Password
            </Text>
            <Text className='text-center text-base leading-6 text-white/80'>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            contentContainerClassName='relative'
            className='animate-slide-up px-4'>
            <View className='flex flex-col gap-1'>
              <View className='flex flex-row items-center gap-2'>
                <MailIcon
                  size={16}
                  color={
                    colorScheme === "light" ? THEME.light.foreground : THEME.dark.foreground
                  }
                />
                <Label htmlFor='email'>Email</Label>
              </View>
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder='Enter your email'
                    className={cn(errors.email ? "border border-destructive" : "")}
                    keyboardType='email-address'
                    autoCapitalize='none'
                  />
                )}
              />
              {errors.email && (
                <Text className='mt-1 text-sm text-destructive'>
                  {errors.email.message}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className='rounded-xl bg-gray-800 py-4 transition-transform active:scale-95'
              activeOpacity={0.8}>
              <Text className='text-center text-lg font-semibold text-white'>
                Send Reset Link
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <Link asChild href={"/login"}>
            <Button activeOpacity={0.7}>
              <Text className='text-center'>Remember your password? Sign In</Text>
            </Button>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
