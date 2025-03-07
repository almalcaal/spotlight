import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { style } from "@/styles/auth.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <View style={style.container}>
      {/* brand section */}
      <View style={style.brandSection}>
        <View style={style.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={style.appName}>spotlight</Text>
        <Text style={style.tagline}>don't miss anything</Text>
      </View>

      {/* illustration */}
      <View style={style.illustrationContainer}>
        <Image
          source={require("../../assets/images/auth-bg.png")}
          style={style.illustration}
          resizeMode="cover"
        />
      </View>

      {/* login section */}
      <View style={style.loginSection}>
        <TouchableOpacity
          style={style.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={style.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={style.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={style.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
