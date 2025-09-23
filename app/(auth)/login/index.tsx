import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
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
        <StatusBar barStyle='light-content' />

        <LinearGradient
          colors={["#7e1b8c", "#ff6f91"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}>
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
              {/* Header */}
              <View className='mb-12'>
                <Text className='mb-2 text-center text-4xl font-bold tracking-wide text-white'>
                  {appBaseConfig.title}
                </Text>
                <Text className='text-center text-lg text-white/80'>
                  Welcome back to your ideas
                </Text>
              </View>

              {/* Card */}
              <View className='animate-slide-up mb-8 rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
                <Text className='mb-8 text-center text-2xl font-semibold text-white'>
                  Sign In
                </Text>

                {/* Email */}
                <View className='mb-6'>
                  <Text className='mb-2 text-sm font-medium text-white/90'>Email</Text>
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
                        className={`rounded-xl bg-white/20 px-4 py-4 text-base text-white ${errors.email ? "border border-red-400" : ""}`}
                        keyboardType='email-address'
                        autoCapitalize='none'
                      />
                    )}
                  />
                  {errors.email && (
                    <Text className='mt-1 text-sm text-red-300'>
                      {errors.email.message}
                    </Text>
                  )}
                </View>

                {/* Password */}
                <View className='mb-6'>
                  <Text className='mb-2 text-sm font-medium text-white/90'>Password</Text>
                  <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder='Enter your password'
                        placeholderTextColor='#ffffff80'
                        className={`rounded-xl bg-white/20 px-4 py-4 text-base text-white ${errors.password ? "border border-red-400" : ""}`}
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

                {/* Forgot Password */}
                <Link asChild href={"/forgot-password"}>
                  <TouchableOpacity activeOpacity={0.7} className='mb-8'>
                    <Text className='text-right text-sm text-cyan-300'>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </Link>

                {/* Submit */}
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className='mb-4 rounded-xl bg-gray-800 py-4 transition-transform active:scale-95'
                  activeOpacity={0.8}>
                  <Text className='text-center text-lg font-semibold text-white'>
                    Sign In
                  </Text>
                </TouchableOpacity>

                {/* Sign Up */}
                <Link asChild href={"/signup"}>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text className='text-center text-white/80'>
                      Don't have an account? <Text className='text-cyan-300'>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>

              {/* Skip */}
              <Link asChild href={"/(home)"}>
                <TouchableOpacity className='py-3' activeOpacity={0.7}>
                  <Text className='text-center text-base text-white/60'>Skip for now</Text>
                </TouchableOpacity>
              </Link>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}
