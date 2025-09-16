import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signUpSchema, type SignUpFormData } from "../../../schemas/auth";

interface SignUpScreenProps {
  onNavigate: (screen: "verify-email" | "login") => void;
  onBack: () => void;
}

export default function SignUpScreen({ onNavigate, onBack }: SignUpScreenProps) {
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
    onNavigate("verify-email");
  };

  return (
    <View className='flex-1'>
      <StatusBar barStyle='light-content' />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <View className='animate-fade-in flex-1 px-8 pt-16'>
          <View className='mb-8 flex-row items-center justify-between'>
            <TouchableOpacity
              onPress={onBack}
              className='p-2 transition-transform active:scale-95'>
              <Text className='text-2xl text-white'>←</Text>
            </TouchableOpacity>
            <Text className='text-xl font-semibold text-white'>Sign Up</Text>
            <TouchableOpacity onPress={() => onNavigate("login")} className='p-2'>
              <Text className='text-base text-cyan-300'>Skip</Text>
            </TouchableOpacity>
          </View>

          <View className='flex-1 justify-center'>
            <View className='mb-8'>
              <Text className='mb-2 text-center text-3xl font-bold text-white'>
                Create Account
              </Text>
              <Text className='text-center text-base text-white/80'>
                Join Wordsy and organize your ideas
              </Text>
            </View>

            <View className='animate-slide-up rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
              <View className='mb-4'>
                <Text className='mb-2 text-sm font-medium text-white/90'>Full Name</Text>
                <Controller
                  control={control}
                  name='name'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Enter your full name'
                      placeholderTextColor='#ffffff80'
                      className={`rounded-xl bg-white/20 px-4 py-4 text-base text-white ${errors.name ? "border border-red-400" : ""}`}
                    />
                  )}
                />
                {errors.name && (
                  <Text className='mt-1 text-sm text-red-300'>{errors.name.message}</Text>
                )}
              </View>

              <View className='mb-4'>
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

              <View className='mb-4'>
                <Text className='mb-2 text-sm font-medium text-white/90'>Password</Text>
                <Controller
                  control={control}
                  name='password'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Create a password'
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

              <View className='mb-8'>
                <Text className='mb-2 text-sm font-medium text-white/90'>
                  Confirm Password
                </Text>
                <Controller
                  control={control}
                  name='confirmPassword'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Confirm your password'
                      placeholderTextColor='#ffffff80'
                      className={`rounded-xl bg-white/20 px-4 py-4 text-base text-white ${errors.confirmPassword ? "border border-red-400" : ""}`}
                      secureTextEntry
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text className='mt-1 text-sm text-red-300'>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className='rounded-xl bg-gray-800 py-4 transition-transform active:scale-95'
                activeOpacity={0.8}>
                <Text className='text-center text-lg font-semibold text-white'>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
