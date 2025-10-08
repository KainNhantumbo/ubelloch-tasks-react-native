import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { verifyEmailSchema, type VerifyEmailFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { ArrowLeft, BinaryIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyEmailScreen() {
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
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: ""
    }
  });

  const onSubmit = (data: VerifyEmailFormData) => {
    console.log("Verify pressed", data);
  };

  const handleResend = () => {
    Keyboard.dismiss();
    console.log("Resend code");
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
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 30 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}>
        <View className='flex-1 justify-center'>
          <View className='mb-4'>
            <Text className='mb-2 text-center font-display font-extrabold' variant={"h1"}>
              Check Your Email
            </Text>
            <Text
              variant={"small"}
              className='max-w-sm px-8 text-center font-display text-lg'>
              We've sent a verification code to your email address. Enter the code below to
              verify your account.
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            contentContainerClassName='relative'
            className='animate-slide-up mt-4 px-4'>
            <View className='flex flex-col gap-1'>
              <View className='flex flex-row items-center gap-2'>
                <BinaryIcon
                  size={16}
                  color={
                    colorScheme === "light" ? THEME.light.foreground : THEME.dark.foreground
                  }
                />
                <Label htmlFor='code'>Verification Code</Label>
              </View>

              <Controller
                control={control}
                name='code'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    aria-labelledby='code'
                    placeholder='Enter 6-digit code'
                    className={cn(errors.code ? "border border-destructive" : "")}
                    keyboardType='number-pad'
                    maxLength={6}
                  />
                )}
              />
              {errors.code && (
                <Text className='mt-1 text-sm text-destructive'>{errors.code.message}</Text>
              )}
            </View>

            <Button
              className='mt-6'
              size={"lg"}
              variant={"default"}
              onPress={handleSubmit(onSubmit)}>
              <Text className='text-center font-semibold text-primary-foreground'>
                Verify Email
              </Text>
            </Button>

            <Separator className='my-4' />

            <Button variant={"outline"} onPress={handleResend}>
              <Text className='w-fit text-center' variant={"muted"}>
                Didn't receive the code? Resend
              </Text>
            </Button>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
