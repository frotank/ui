import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import BottomNavigation from "../components/BottomNavigation";

export default function BankingScreen({ navigation }) {
  const transactions = [
    {
      id: 1,
      type: "transfer",
      title: "Transfer to Firmansyah A.",
      time: "08:15 PM",
      amount: "-$20",
      icon: "arrow-up-outline",
    },
    {
      id: 2,
      type: "receive",
      title: "Receive from Adam S.",
      time: "02:15 PM",
      amount: "+$1,300",
      icon: "arrow-down-outline",
    },
    {
      id: 3,
      type: "transfer",
      title: "Transfer to Bank",
      time: "01:30 PM",
      amount: "-$20",
      icon: "arrow-up-outline",
    },
  ];

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
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-6 py-8 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text
              className="text-gray-900 text-2xl mb-2"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -1,
              }}
            >
              Banking
            </Text>
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Manage your accounts
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
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Account Balance Card */}
        <View className="px-6 py-8">
          <View
            className="bg-white rounded-3xl p-8 border border-gray-100"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <View className="items-center mb-8">
              <Text
                className="text-gray-600 text-base mb-2"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Total Balance
              </Text>
              <Text
                className="text-gray-900 text-4xl mb-4"
                style={{
                  fontFamily: "Inter_700Bold",
                  letterSpacing: -2,
                }}
              >
                $12,847.50
              </Text>
              <View className="bg-green-100 rounded-xl px-4 py-2">
                <Text
                  className="text-green-700 text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  +$234.50 this month
                </Text>
              </View>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <Text
                  className="text-gray-600 text-base"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Available Balance
                </Text>
                <Text
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  $11,247.50
                </Text>
              </View>
              <View className="flex-row items-center justify-between py-4">
                <Text
                  className="text-gray-600 text-base"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Pending Transactions
                </Text>
                <Text
                  className="text-orange-600 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  $1,600.00
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-8">
          <Text
            className="text-gray-900 text-xl mb-6"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.5,
            }}
          >
            Quick Actions
          </Text>

          <View className="flex-row space-x-4">
            <TouchableOpacity className="flex-1">
              <View
                className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.08,
                  shadowRadius: 16,
                  elevation: 6,
                }}
              >
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mb-4">
                  <Ionicons name="arrow-up" size={24} color="#3b82f6" />
                </View>
                <Text
                  className="text-gray-900 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Send Money
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1">
              <View
                className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.08,
                  shadowRadius: 16,
                  elevation: 6,
                }}
              >
                <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mb-4">
                  <Ionicons name="arrow-down" size={24} color="#10b981" />
                </View>
                <Text
                  className="text-gray-900 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Request
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1">
              <View
                className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.08,
                  shadowRadius: 16,
                  elevation: 6,
                }}
              >
                <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mb-4">
                  <Ionicons name="card" size={24} color="#8b5cf6" />
                </View>
                <Text
                  className="text-gray-900 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Pay Bills
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-6 pb-8">
          <Text
            className="text-gray-900 text-xl mb-6"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.5,
            }}
          >
            Recent Transactions
          </Text>

          <View className="space-y-4">
            <TouchableOpacity
              className="bg-white rounded-2xl p-6 border border-gray-100"
              style={{
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
                elevation: 6,
              }}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-red-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="restaurant" size={24} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Starbucks Coffee
                  </Text>
                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Today, 2:30 PM
                  </Text>
                </View>
                <Text
                  className="text-red-600 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  -$8.50
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-2xl p-6 border border-gray-100"
              style={{
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
                elevation: 6,
              }}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="arrow-down" size={24} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Salary Deposit
                  </Text>
                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Yesterday, 9:00 AM
                  </Text>
                </View>
                <Text
                  className="text-green-600 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  +$3,200.00
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation navigation={navigation} activeTab="banking" />
    </SafeAreaView>
  );
}
