import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { verifyEmailSchema, type VerifyEmailFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { ArrowLeft, ChevronLastIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, TouchableOpacity, View } from "react-native";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const canGoBack = router.canGoBack();

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
    console.log("Resend code");
  };

  return (
    <View className='flex-1'>
      <StatusBar barStyle='default' animated={true} backgroundColor={"#7e1b8c"} />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <View className='animate-fade-in flex-1 px-8 pt-16'>
          <View className='flex flex-row items-center justify-between bg-transparent px-4 py-3'>
            <TouchableOpacity
              onPress={getBack}
              className='flex flex-row items-center gap-2'>
              <ArrowLeft size={16} color='white' />
              <Text className='text-base text-white'>Back</Text>
            </TouchableOpacity>

            <Link asChild href={"/login"}>
              <TouchableOpacity className='flex flex-row items-center gap-2'>
                <Text className='text-base text-white'>Skip</Text>
                <ChevronLastIcon size={18} color='white' />
              </TouchableOpacity>
            </Link>
          </View>

          <View className='flex-1 justify-center'>
            <View className='mb-12'>
              <Text className='mb-4 text-center text-3xl font-bold text-white'>
                Check Your Email
              </Text>
              <Text className='text-center text-base leading-6 text-white/80'>
                We've sent a verification code to your email address. Enter the code below
                to verify your account.
              </Text>
            </View>

            <View className='animate-slide-up mb-8 rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
              <View className='mb-8'>
                <Label
                  htmlFor='code'
                  className='mb-4 text-center text-sm font-medium text-white/90'>
                  Verification Code
                </Label>
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
                      placeholderTextColor='#ffffff80'
                      className={`rounded-xl bg-white/20 px-4 py-4 text-center text-2xl tracking-widest text-white ${errors.code ? "border border-red-400" : ""}`}
                      keyboardType='number-pad'
                      maxLength={6}
                    />
                  )}
                />
                {errors.code && (
                  <Text className='mt-2 text-center text-sm text-red-300'>
                    {errors.code.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className='mb-4 rounded-xl bg-gray-800 py-4 transition-transform active:scale-95'
                activeOpacity={0.8}>
                <Text className='text-center text-lg font-semibold text-white'>
                  Verify Email
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text className='text-center text-cyan-300'>
                  Didn't receive the code? Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
