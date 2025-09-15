"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleLogin = () => {
    console.log("Login pressed", { email, password })
  }

  const handleSignUp = () => {
    console.log("Sign up pressed", { email, password })
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />

      <LinearGradient colors={["#7e1b8c", "#ff6f91"]} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <View className="flex-1 justify-center px-8">
          <View className="mb-12">
            <Text className="text-white text-4xl font-bold text-center tracking-wide mb-2">Wordsy</Text>
            <Text className="text-white/80 text-lg text-center">Welcome back to your ideas</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <Text className="text-white text-2xl font-semibold text-center mb-8">
              {isSignUp ? "Create Account" : "Sign In"}
            </Text>

            <View className="mb-6">
              <Text className="text-white/90 text-sm font-medium mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#ffffff80"
                className="bg-white/20 rounded-xl px-4 py-4 text-white text-base"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-8">
              <Text className="text-white/90 text-sm font-medium mb-2">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#ffffff80"
                className="bg-white/20 rounded-xl px-4 py-4 text-white text-base"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={isSignUp ? handleSignUp : handleLogin}
              className="bg-gray-800 rounded-xl py-4 mb-4"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold text-center">
                {isSignUp ? "Create Account" : "Sign In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
              <Text className="text-white/80 text-center">
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="py-3" activeOpacity={0.7} onPress={() => console.log("Skip pressed")}>
            <Text className="text-white/60 text-center text-base">Skip for now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}
