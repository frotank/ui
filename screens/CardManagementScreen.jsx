import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

// Import reusable components
import BottomNavigation from "../components/BottomNavigation";

export default function CardManagementScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-6 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text
              className="text-gray-500 text-base mb-2"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Manage your
            </Text>
            <Text
              className="text-gray-900 text-2xl"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Cards
            </Text>
          </View>

          <TouchableOpacity className="bg-blue-50 rounded-2xl p-4">
            <Ionicons name="notifications-outline" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* My Cards Section */}
        <View className="px-6 py-6">
          <Text
            className="text-gray-900 text-xl mb-6"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            My Cards
          </Text>

          {/* Green Card */}
          <View
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-6 mb-6"
            style={{
              shadowColor: "#10b981",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 15,
            }}
          >
            {/* NFC Icon */}
            <View className="mb-8">
              <Ionicons
                name="wifi"
                size={24}
                color="white"
                style={{ transform: [{ rotate: "90deg" }] }}
              />
            </View>

            {/* Card Number */}
            <Text
              className="text-white text-xl font-mono tracking-widest mb-8"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              1253 5432 3524 3090
            </Text>

            {/* Bottom Row */}
            <View className="flex-row justify-between items-end">
              <View>
                <Text
                  className="text-white text-sm mb-1"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Sarah Muller
                </Text>
                <Text
                  className="text-green-100 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Exp 05/24
                </Text>
              </View>
              <View className="bg-white rounded-lg px-3 py-2">
                <Text
                  className="text-green-600 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  VISA
                </Text>
              </View>
            </View>
          </View>

          {/* Black Card */}
          <View
            className="bg-gray-900 rounded-3xl p-6 mb-8"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 15,
            }}
          >
            {/* NFC Icon */}
            <View className="mb-8">
              <Ionicons
                name="wifi"
                size={24}
                color="white"
                style={{ transform: [{ rotate: "90deg" }] }}
              />
            </View>

            {/* Card Number */}
            <Text
              className="text-white text-xl font-mono tracking-widest mb-8"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              1253 5432 3524 3090
            </Text>

            {/* Bottom Row */}
            <View className="flex-row justify-between items-end">
              <View>
                <Text
                  className="text-white text-sm mb-1"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Sarah Muller
                </Text>
                <Text
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Exp 05/24
                </Text>
              </View>
              <View className="bg-white rounded-lg px-3 py-2">
                <Text
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  VISA
                </Text>
              </View>
            </View>
          </View>

          {/* Add New Card Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-2xl py-4 items-center mb-6"
            style={{
              shadowColor: "#2563eb",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="add" size={24} color="white" />
              <Text
                className="text-white text-lg ml-2"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Add New Card
              </Text>
            </View>
          </TouchableOpacity>

          {/* Card Benefits Section */}
          <View
            className="bg-white rounded-3xl p-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.03,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Text
              className="text-gray-900 text-xl mb-4"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Card Benefits
            </Text>

            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="shield-checkmark" size={20} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Fraud Protection
                  </Text>
                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    24/7 monitoring and instant alerts
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="gift" size={20} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Cashback Rewards
                  </Text>
                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Earn up to 5% on every purchase
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="airplane" size={20} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Travel Benefits
                  </Text>
                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Airport lounge access and travel insurance
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Cards" />
    </SafeAreaView>
  );
}
