import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { signUpSchema, type SignUpFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { ArrowLeft, ChevronLastIcon, LockIcon, Mail, UserIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
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
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign up pressed", data);
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

      <View className='flex flex-row items-center justify-between bg-transparent px-4 py-3'>
        <TouchableOpacity onPress={getBack} className='flex flex-row items-center gap-2'>
          <ArrowLeft
            size={18}
            color={colorScheme === "light" ? THEME.light.foreground : THEME.dark.foreground}
          />
          <Text className='text-base'>Back</Text>
        </TouchableOpacity>

        <Link asChild href={"/login"}>
          <TouchableOpacity className='flex flex-row items-center gap-2'>
            <Text className='text-base'>Skip</Text>
            <ChevronLastIcon
              size={18}
              color={
                colorScheme === "light" ? THEME.light.foreground : THEME.dark.foreground
              }
            />
          </TouchableOpacity>
        </Link>
      </View>

      <KeyboardAwareScrollView>
        <View className='animate-fade-in mt-6 flex-1'>
          <View className='flex-1 justify-center'>
            <View className='mb-8'>
              <Text className='mb-2 text-center font-display font-extrabold' variant={"h1"}>
                Create Account
              </Text>
              <Text className='max-w-sm px-8 text-center font-display text-lg'>
                Join {appBaseConfig.title} and organize your universe of ideas!
              </Text>
            </View>

            <View className='animate-slide-up px-4'>
              <View className='flex gap-4'>
                <View className='flex flex-col gap-1'>
                  <View className='flex flex-row items-center gap-2'>
                    <UserIcon
                      size={16}
                      color={
                        colorScheme === "light"
                          ? THEME.light.foreground
                          : THEME.dark.foreground
                      }
                    />
                    <Label htmlFor='name'>Name</Label>
                  </View>
                  <Controller
                    control={control}
                    name='name'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        aria-labelledby='name'
                        placeholder='Enter your name'
                        className={cn(errors.password ? "border border-destructive" : "")}
                      />
                    )}
                  />
                  {errors.name && (
                    <Text className='mt-1 text-sm text-destructive'>
                      {errors.name.message}
                    </Text>
                  )}
                </View>

                <View className='flex flex-col gap-1'>
                  <View className='flex flex-row items-center gap-2'>
                    <Mail
                      size={16}
                      color={
                        colorScheme === "light"
                          ? THEME.light.foreground
                          : THEME.dark.foreground
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
                        aria-labelledby='email'
                        placeholder='Enter your email'
                        className={cn(errors.password ? "border border-destructive" : "")}
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
                    <Label htmlFor='password'>Password</Label>
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
                        placeholder='Create a password'
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
                        aria-labelledby='confirmPassword'
                        placeholder='Confirm your password'
                        className={cn(errors.password ? "border border-destructive" : "")}
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
              </View>

              <Button
                className='mt-6'
                size={"lg"}
                variant={"default"}
                onPress={handleSubmit(onSubmit)}>
                <Text className='text-center font-semibold text-primary-foreground'>
                  Create Account
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
