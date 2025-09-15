"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./(tabs)/splash";
import LoginScreen from "./(auth)/login";
import SignUpScreen from "./(auth)/signup";
import VerifyEmailScreen from "./(auth)/verify-email";
import ResetPasswordScreen from "./(auth)/reset-password";
import ForgotPasswordScreen from "./(auth)/forgot-password";

type Screen =
  | "splash"
  | "login"
  | "signup"
  | "verify-email"
  | "forgot-password"
  | "reset-password";

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  useEffect(() => {
    const splashSeen = localStorage.getItem("splash_seen");
    if (splashSeen === "true") {
      setCurrentScreen("login");
      setHasSeenSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem("splash_seen", "true");
    setCurrentScreen("login");
    setHasSeenSplash(true);
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (currentScreen === "signup" || currentScreen === "forgot-password") {
      setCurrentScreen("login");
    } else if (currentScreen === "verify-email") {
      setCurrentScreen("signup");
    } else if (currentScreen === "reset-password") {
      setCurrentScreen("forgot-password");
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onGetStarted={handleSplashComplete} />;
      case "login":
        return <LoginScreen onNavigate={navigateTo} />;
      case "signup":
        return <SignUpScreen onNavigate={navigateTo} onBack={goBack} />;
      case "verify-email":
        return <VerifyEmailScreen onNavigate={navigateTo} onBack={goBack} />;
      case "forgot-password":
        return <ForgotPasswordScreen onNavigate={navigateTo} onBack={goBack} />;
      case "reset-password":
        return <ResetPasswordScreen onNavigate={navigateTo} onBack={goBack} />;
      default:
        return <LoginScreen onNavigate={navigateTo} />;
    }
  };

  return renderScreen();
}
