"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { loginSchema, type LoginFormData } from "../../../schemas/auth";

interface LoginScreenProps {
  onNavigate: (screen: "signup" | "forgot-password") => void;
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
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
    <View className='flex-1'>
      <StatusBar barStyle='light-content' />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <View className='animate-fade-in flex-1 justify-center px-8'>
          <View className='mb-12'>
            <Text className='mb-2 text-center text-4xl font-bold tracking-wide text-white'>
              Wordsy
            </Text>
            <Text className='text-center text-lg text-white/80'>
              Welcome back to your ideas
            </Text>
          </View>

          <View className='animate-slide-up mb-8 rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
            <Text className='mb-8 text-center text-2xl font-semibold text-white'>
              Sign In
            </Text>

            <View className='mb-6'>
              <Text className='mb-2 text-sm font-medium text-white/90'>Email</Text>
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
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
                <Text className='mt-1 text-sm text-red-300'>{errors.email.message}</Text>
              )}
            </View>

            <View className='mb-6'>
              <Text className='mb-2 text-sm font-medium text-white/90'>Password</Text>
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
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
                <Text className='mt-1 text-sm text-red-300'>{errors.password.message}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => onNavigate("forgot-password")}
              activeOpacity={0.7}
              className='mb-8'>
              <Text className='text-right text-sm text-cyan-300'>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className='mb-4 rounded-xl bg-gray-800 py-4 transition-transform active:scale-95'
              activeOpacity={0.8}>
              <Text className='text-center text-lg font-semibold text-white'>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onNavigate("signup")} activeOpacity={0.7}>
              <Text className='text-center text-white/80'>
                Don't have an account? <Text className='text-cyan-300'>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className='py-3' activeOpacity={0.7}>
            <Text className='text-center text-base text-white/60'>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
