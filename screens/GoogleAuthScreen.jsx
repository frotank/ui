import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Svg, { Path, Circle, Polygon } from "react-native-svg";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function GoogleAuthScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { setUser, setAccessToken } = useAuth();

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      // Your exact API call
      const options = {
        method: "POST",
        url: "https://zashit-backend-production.up.railway.app/api/v1/auth",
        headers: { "Content-Type": "application/json" },
        data: {
          name: "Devansh",
          email: "devansh@gmail.com",
          accessToken: "cool",
        },
      };

      const { data } = await axios.request(options);
      console.log("🔐 Auth API Response:", data);

      if (data.success && data.accessToken) {
        // Store the real token from backend response
        await AsyncStorage.setItem("accessToken", data.accessToken);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(
            data.data || {
              name: "Devansh",
              email: "devansh@gmail.com",
              id: data.data?.id || "user_devansh",
            }
          )
        );

        // Update auth context state
        setAccessToken(data.accessToken);
        setUser(
          data.data || {
            name: "Devansh",
            email: "devansh@gmail.com",
            id: data.data?.id || "user_devansh",
          }
        );

        console.log("✅ Real authentication successful");
        console.log(
          "🔑 Token stored:",
          data.accessToken.substring(0, 30) + "..."
        );
        console.log("✅ Authentication complete - redirecting to app");
      } else {
        throw new Error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("❌ Auth error:", error);
      console.error("❌ Auth error response:", error.response?.data);
      Alert.alert(
        "Authentication Error",
        `Failed to authenticate: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#f8fafc" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8fafc"
        translucent={true}
      />

      {/* Enhanced Header with Blue Gradient and Creative Shapes */}
      <View style={{ position: "relative", overflow: "hidden" }}>
        <LinearGradient
          colors={["#dbeafe", "#93c5fd", "#60a5fa"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 32,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            height: 200,
          }}
        >
          {/* Creative Background Shapes */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.15,
            }}
          >
            <Svg width="100%" height="200" viewBox="0 0 400 200">
              <Polygon
                points="50,40 55,55 70,55 58,65 63,80 50,70 37,80 42,65 30,55 45,55"
                fill="#1e40af"
              />
              <Polygon
                points="320,35 323,45 333,45 325,51 328,61 320,55 312,61 315,51 307,45 317,45"
                fill="#2563eb"
              />
              <Path
                d="M0,100 Q100,70 200,100 T400,100"
                stroke="#1e40af"
                strokeWidth="2.5"
                fill="none"
              />
              <Circle cx="80" cy="150" r="8" fill="#3b82f6" />
              <Circle cx="280" cy="60" r="6" fill="#1e40af" />
            </Svg>
          </View>

          {/* Header Content */}
          <View
            className="flex-1 items-center justify-center"
            style={{ position: "relative", zIndex: 1 }}
          >
            <View className="w-20 h-20 bg-white/20 rounded-2xl items-center justify-center mb-6">
              <Ionicons name="shield-checkmark" size={36} color="#1e40af" />
            </View>
            <Text
              className="text-blue-900 text-3xl text-center mb-3"
              style={{ fontFamily: "Inter_700Bold", letterSpacing: -0.5 }}
            >
              Get Started
            </Text>
            <Text
              className="text-blue-700 text-lg text-center"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Unlock personalized insights
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View className="flex-1 px-6 pt-12 justify-between">
        {/* Simplified Trust Section */}
        <View>
          <Text
            className="text-gray-900 text-xl mb-8 text-center"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            We use your email to send alerts and sync your data securely
          </Text>

          {/* Privacy Badge */}
          <View
            className="bg-blue-50 rounded-xl p-4 mb-12 border border-blue-200"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="lock-closed" size={20} color="#3b82f6" />
              <Text
                className="text-blue-800 text-sm ml-3"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Your data is encrypted and never shared
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            {/* Google Sign In Button */}
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              disabled={loading}
              className={`rounded-xl p-5 border border-gray-200 flex-row items-center justify-center ${
                loading ? "bg-gray-100" : "bg-white"
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <View className="w-6 h-6 mr-3">
                <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">G</Text>
                </View>
              </View>
              <Text
                className={`text-lg ${
                  loading ? "text-gray-400" : "text-gray-800"
                }`}
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                {loading ? "Signing in..." : "Continue with Google"}
              </Text>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleSkip}
              className="py-4"
              disabled={loading}
            >
              <Text
                className="text-gray-500 text-base text-center"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms */}
        <View className="mb-6">
          <Text
            className="text-gray-400 text-xs text-center"
            style={{ fontFamily: "Inter_400Regular" }}
          >
            By continuing, you agree to our{" "}
            <Text className="text-blue-600">Terms</Text> and{" "}
            <Text className="text-blue-600">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
