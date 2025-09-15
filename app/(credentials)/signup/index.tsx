"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SignUpScreenProps {
  onNavigate: (screen: "verify-email" | "login") => void;
  onBack: () => void;
}

export default function SignUpScreen({ onNavigate, onBack }: SignUpScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    console.log("Sign up pressed", { name, email, password });
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
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder='Enter your full name'
                  placeholderTextColor='#ffffff80'
                  className='rounded-xl bg-white/20 px-4 py-4 text-base text-white'
                />
              </View>

              <View className='mb-4'>
                <Text className='mb-2 text-sm font-medium text-white/90'>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder='Enter your email'
                  placeholderTextColor='#ffffff80'
                  className='rounded-xl bg-white/20 px-4 py-4 text-base text-white'
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </View>

              <View className='mb-4'>
                <Text className='mb-2 text-sm font-medium text-white/90'>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder='Create a password'
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
                  placeholder='Confirm your password'
                  placeholderTextColor='#ffffff80'
                  className='rounded-xl bg-white/20 px-4 py-4 text-base text-white'
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                onPress={handleSignUp}
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
