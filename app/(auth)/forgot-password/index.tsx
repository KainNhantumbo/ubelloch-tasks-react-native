import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordScreen() {
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
    console.log("Send reset pressed", data);
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
            <Link asChild href={"/forgot-password"}>
              <TouchableOpacity className='p-2 transition-transform active:scale-95'>
                <Text className='text-2xl text-white'>←</Text>
              </TouchableOpacity>
              <Text className='text-xl font-semibold text-white'>Forgot Password</Text>
            </Link>

            <Link asChild href={"/login"}>
              <TouchableOpacity className='p-2'>
                <Text className='text-base text-cyan-300'>Skip</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className='flex-1 justify-center'>
            <View className='mb-12'>
              <Text className='mb-4 text-center text-3xl font-bold text-white'>
                Reset Password
              </Text>
              <Text className='text-center text-base leading-6 text-white/80'>
                Enter your email address and we'll send you a link to reset your password.
              </Text>
            </View>

            <View className='animate-slide-up mb-8 rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
              <View className='mb-8'>
                <Label className='mb-2 text-sm font-medium text-white/90'>
                  Email Address
                </Label>
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
                  <Text className='mt-1 text-sm text-red-300'>{errors.email.message}</Text>
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
            </View>

            <Link asChild href={"/login"}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className='text-center text-cyan-300'>
                  Remember your password? Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
