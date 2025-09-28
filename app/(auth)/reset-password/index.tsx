import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { ArrowLeft, BinaryIcon, LockIcon } from "lucide-react-native";
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

export default function ResetPasswordScreen() {
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
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    Keyboard.dismiss();
    console.log("Reset password pressed", data);
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
              New Password
            </Text>
            <Text className='max-w-sm px-8 text-center font-display text-lg'>
              Enter the code from your email and create a new password.
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            contentContainerClassName='relative'
            className='animate-slide-up px-4'>
            <View className='flex gap-4'>
              <View className='flex flex-col gap-1'>
                <View className='flex flex-row items-center gap-2'>
                  <BinaryIcon
                    size={16}
                    color={
                      colorScheme === "light"
                        ? THEME.light.foreground
                        : THEME.dark.foreground
                    }
                  />
                  <Label htmlFor='code'>Reset Code</Label>
                </View>
                <Controller
                  control={control}
                  name='code'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      aria-labelledby='code'
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Enter reset code'
                      className={cn(errors.code ? "border border-destructive" : "")}
                      keyboardType='number-pad'
                    />
                  )}
                />
                {errors.code && (
                  <Text className='mt-1 text-sm text-destructive'>
                    {errors.code.message}
                  </Text>
                )}
              </View>

              <View className='flex flex-col gap-1'>
                <View className='flex flex-row items-center gap-2'>
                  <LockIcon
                    size={16}
                    color={
                      colorScheme === "light"
                        ? THEME.light.foreground
                        : THEME.dark.foreground
                    }
                  />
                  <Label htmlFor='password'>New Password</Label>
                </View>
                <Controller
                  control={control}
                  name='password'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      aria-labelledby='password'
                      placeholder='* * * * * * * *'
                      className={cn(errors.password ? "border border-destructive" : "")}
                      secureTextEntry
                    />
                  )}
                />
                {errors.password && (
                  <Text className='mt-1 text-sm text-destructive'>
                    {errors.password.message}
                  </Text>
                )}
              </View>
              <View className='flex flex-col gap-1'>
                <View className='flex flex-row items-center gap-2'>
                  <LockIcon
                    size={16}
                    className='stroke-foreground text-foreground'
                    color={
                      colorScheme === "light"
                        ? THEME.light.foreground
                        : THEME.dark.foreground
                    }
                  />
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                </View>
                <Controller
                  control={control}
                  name='confirmPassword'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='* * * * * * * *'
                      aria-labelledby='confirmPassword'
                      className={cn(
                        errors.confirmPassword ? "border border-destructive" : ""
                      )}
                      secureTextEntry
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text className='mt-1 text-sm text-destructive'>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <Button
                className='mt-6'
                size={"lg"}
                variant={"default"}
                onPress={handleSubmit(onSubmit)}>
                <Text className='text-center font-semibold text-primary-foreground'>
                  Reset Password
                </Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
