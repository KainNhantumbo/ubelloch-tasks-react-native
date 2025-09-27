import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function LoginScreen() {
  const { colorScheme } = useColorScheme();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login pressed", data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className='flex-1'>
        <StatusBar
          animated={true}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={
            colorScheme === "dark" ? THEME.dark.background : THEME.light.background
          }
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
          <ScrollView
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 32
            }}>
            <View className='mb-12'>
              <Text className='mb-2 text-center font-display font-extrabold' variant={"h1"}>
                {appBaseConfig.title}
              </Text>
              <Text className='text-center font-display text-lg'>
                Welcome back to your ideas
              </Text>
            </View>

            <View className='animate-slide-up'>
              <View className='mb-6'>
                <Label className='mb-2 text-sm font-medium'>Email</Label>
                <Controller
                  control={control}
                  name='email'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Enter your email'
                      placeholderTextColor='#ffffff80'
                      keyboardType='email-address'
                      className={cn(errors.password ? "border border-red-400" : "")}
                      autoCapitalize='none'
                    />
                  )}
                />
                {errors.email && (
                  <Text className='mt-1 text-sm text-red-300'>{errors.email.message}</Text>
                )}
              </View>

              <View className='mb-6'>
                <Label className='mb-2 text-sm font-medium'>Password</Label>
                <Controller
                  control={control}
                  name='password'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Enter your password'
                      className={cn(errors.password ? "border border-red-400" : "")}
                      secureTextEntry
                    />
                  )}
                />
                {errors.password && (
                  <Text className='mt-1 text-sm text-red-300'>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <Link asChild href={"/forgot-password"}>
                <Button variant={"link"} className='mb-8 self-end'>
                  <Text variant={"small"} className='text-sm'>
                    Forgot Password?
                  </Text>
                </Button>
              </Link>

              <Button
                size={"lg"}
                variant={"default"}
                onPress={handleSubmit(onSubmit)}
                className=''>
                <Text className='text-center font-semibold text-primary-foreground'>
                  Sign In
                </Text>
              </Button>

              <Link asChild href={"/signup"} className='mt-4'>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className='text-center'>
                    Don't have an account? <Text className='text-blue-400'>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            <Link asChild href={"/(home)"}>
              <TouchableOpacity className='py-3' activeOpacity={0.7}>
                <Text className='text-center text-base' variant={"muted"}>
                  Skip for now
                </Text>
              </TouchableOpacity>
            </Link>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
