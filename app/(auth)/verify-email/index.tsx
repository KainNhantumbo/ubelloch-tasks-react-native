"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface VerifyEmailScreenProps {
  onNavigate: (screen: "login") => void;
  onBack: () => void;
}

export default function VerifyEmailScreen({ onNavigate, onBack }: VerifyEmailScreenProps) {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    console.log("Verify pressed", { code });
    onNavigate("login");
  };

  const handleResend = () => {
    console.log("Resend code");
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
            <Text className='text-xl font-semibold text-white'>Verify Email</Text>
            <TouchableOpacity onPress={() => onNavigate("login")} className='p-2'>
              <Text className='text-base text-cyan-300'>Skip</Text>
            </TouchableOpacity>
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
                <Text className='mb-4 text-center text-sm font-medium text-white/90'>
                  Verification Code
                </Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder='Enter 6-digit code'
                  placeholderTextColor='#ffffff80'
                  className='rounded-xl bg-white/20 px-4 py-4 text-center text-2xl tracking-widest text-white'
                  keyboardType='number-pad'
                  maxLength={6}
                />
              </View>

              <TouchableOpacity
                onPress={handleVerify}
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
