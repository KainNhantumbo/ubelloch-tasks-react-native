import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { appBaseConfig } from "@/constants";
import { signUpSchema, type SignUpFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { ArrowLeft, ChevronLastIcon, LockIcon, Mail, UserIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
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
      <StatusBar barStyle='default' animated={true} backgroundColor={"#7e1b8c"} />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <View className='flex flex-row items-center justify-between bg-transparent px-4 py-3'>
          <TouchableOpacity onPress={getBack} className='flex flex-row items-center gap-2'>
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

        <KeyboardAwareScrollView>
          <View className='animate-fade-in mt-10 flex-1 px-8'>
            <View className='flex-1 justify-center'>
              <View className='mb-8'>
                <Text className='mb-2 text-center text-3xl font-bold text-white'>
                  Create Account
                </Text>
                <Text className='text-center text-base text-white/80'>
                  Join {appBaseConfig.title} and organize your universe!
                </Text>
              </View>

              <View className='animate-slide-up rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
                <View className='flex gap-4'>
                  <View>
                    <View className='flex flex-row gap-2'>
                      <UserIcon size={16} color='#ffffff90' />
                      <Text className='mb-2 text-sm font-medium text-white/90'>Name</Text>
                    </View>
                    <Controller
                      control={control}
                      name='name'
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
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
                      <Text className='mt-1 text-sm text-red-300'>
                        {errors.name.message}
                      </Text>
                    )}
                  </View>

                  <View>
                    <View className='flex flex-row gap-2'>
                      <Mail size={16} color='#ffffff90' />
                      <Text className='mb-2 text-sm font-medium text-white/90'>Email</Text>
                    </View>
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

                  <View>
                    <View className='flex flex-row gap-2'>
                      <LockIcon size={16} color='#ffffff90' />
                      <Text className='mb-2 text-sm font-medium text-white/90'>
                        Password
                      </Text>
                    </View>
                    <Controller
                      control={control}
                      name='password'
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
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

                  <View>
                    <View className='flex flex-row gap-2'>
                      <LockIcon size={16} color='#ffffff90' />
                      <Text className='mb-2 text-sm font-medium text-white/90'>
                        Confirm Password
                      </Text>
                    </View>
                    <Controller
                      control={control}
                      name='confirmPassword'
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
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
                </View>

                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className='mt-8 rounded-xl bg-gray-800 py-4 transition-transform active:scale-95'
                  activeOpacity={0.8}>
                  <Text className='text-center text-lg font-semibold text-white'>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
