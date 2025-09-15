"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    console.log("Login pressed", { email, password });
  };

  const handleSignUp = () => {
    console.log("Sign up pressed", { email, password });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <View className='flex-1'>
      <StatusBar barStyle='light-content' />

      <LinearGradient
        colors={["#7e1b8c", "#ff6f91"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <View className='flex-1 justify-center px-8'>
          <View className='mb-12'>
            <Text className='mb-2 text-center text-4xl font-bold tracking-wide text-white'>
              Wordsy
            </Text>
            <Text className='text-center text-lg text-white/80'>
              Welcome back to your ideas
            </Text>
          </View>

          <View className='mb-8 rounded-3xl bg-white/10 p-8 backdrop-blur-sm'>
            <Text className='mb-8 text-center text-2xl font-semibold text-white'>
              {isSignUp ? "Create Account" : "Sign In"}
            </Text>

            <View className='mb-6'>
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

            <View className='mb-8'>
              <Text className='mb-2 text-sm font-medium text-white/90'>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='Enter your password'
                placeholderTextColor='#ffffff80'
                className='rounded-xl bg-white/20 px-4 py-4 text-base text-white'
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={isSignUp ? handleSignUp : handleLogin}
              className='mb-4 rounded-xl bg-gray-800 py-4'
              activeOpacity={0.8}>
              <Text className='text-center text-lg font-semibold text-white'>
                {isSignUp ? "Create Account" : "Sign In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
              <Text className='text-center text-white/80'>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className='py-3'
            activeOpacity={0.7}
            onPress={() => console.log("Skip pressed")}>
            <Text className='text-center text-base text-white/60'>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
