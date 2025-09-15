"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ResetPasswordScreenProps {
  onNavigate: (screen: "login") => void;
  onBack: () => void;
}

export default function ResetPasswordScreen({
  onNavigate,
  onBack
}: ResetPasswordScreenProps) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    console.log("Reset password pressed", { code, password });
    onNavigate("login");
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
            <Text className='text-xl font-semibold text-white'>Reset Password</Text>
            <TouchableOpacity onPress={() => onNavigate("login")} className='p-2'>
              <Text className='text-base text-cyan-300'>Skip</Text>
            </TouchableOpacity>
          </View>

          <View className='flex-1 justify-center'>
            <View className='mb-8'>
              <Text className='mb-4 text-center text-3xl font-bold text-white'>
                New Password
              </Text>
              <Text className='text-center text-base text-white/80'>
                Enter the code from your email and create a new password.
              </Text>
            </View>

            <View className='animate-slide-up rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
              <View className='mb-4'>
                <Text className='mb-2 text-sm font-medium text-white/90'>Reset Code</Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder='Enter reset code'
                  placeholderTextColor='#ffffff80'
                  className='rounded-xl bg-white/20 px-4 py-4 text-base text-white'
                  keyboardType='number-pad'
                />
              </View>

              <View className='mb-4'>
                <Text className='mb-2 text-sm font-medium text-white/90'>New Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder='Create new password'
                  placeholderTextColor='#ffffff80'
                  className='rounded-xl bg-white/20 px-4 py-4 text-base text-white'
                  secureTextEntry
                />
              </View>

              <View className='mb-8'>
                <Text className='mb-2 text-sm font-medium text-white/90'>
                  Confirm Password
                </Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder='Confirm new password'
                  placeholderTextColor='#ffffff80'
                  className='rounded-xl bg-white/20 px-4 py-4 text-base text-white'
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                onPress={handleResetPassword}
                className='rounded-xl bg-gray-800 py-4 transition-transform active:scale-95'
                activeOpacity={0.8}>
                <Text className='text-center text-lg font-semibold text-white'>
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
