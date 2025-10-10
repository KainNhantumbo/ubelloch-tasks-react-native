import ScreenContainer from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { cn } from "@/lib/utils";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function LoginScreen() {
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
      <ScreenContainer>
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
                      className={cn(errors.password ? "border border-destructive" : "")}
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

              <Link asChild href={"/forgot-password"}>
                <Button variant={"link"} className='mb-8 self-end'>
                  <Text variant={"small"} className='text-sm'>
                    Forgot Password?
                  </Text>
                </Button>
              </Link>

              <Button size={"lg"} variant={"default"} onPress={handleSubmit(onSubmit)}>
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

            <Separator className='my-4' />

            <Link asChild href={"/(home)"}>
              <Button variant={"link"}>
                <Text className='w-fit text-center' variant={"muted"}>
                  Skip for now
                </Text>
              </Button>
            </Link>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
}
