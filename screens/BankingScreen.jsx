import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function BankingScreen() {
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-gray-300 mr-3">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              }}
              className="w-10 h-10 rounded-full"
            />
          </View>
          <View className="mt-10">
            <Text className="text-gray-600 text-sm">Welcome back,</Text>
            <Text className="text-gray-900 text-lg font-semibold">
              Sarah Muller
            </Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="notifications-outline" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View className="px-6 mb-6">
          <Text className="text-gray-900 text-2xl font-bold mb-6">Account</Text>

          {/* Balance Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {/* Main Card - Cyan/Light Blue */}
            <View
              className="bg-cyan-400 rounded-2xl p-5 mr-4"
              style={{ width: 280, height: 230 }}
            >
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1">
                  <Text className="text-white/90 text-xs font-medium mb-1 tracking-wide">
                    Your Balance
                  </Text>
                  <Text className="text- text-4xl  pt-20 text-center font-semibold">
                    $ 40,500.80
                  </Text>
                </View>
                <View className="bg-white/30 rounded-lg p-2">
                  <Ionicons name="eye-outline" size={18} color="white" />
                </View>
              </View>

              <View className="flex-row justify-between items-end mt-auto">
                <View>
                  <Text className="text-white/90 text-lg font-medium">
                    Card Number
                  </Text>
                  <Text className="text-black/90 text-xs font-medium mt-0.5 ml-4">
                    ••••9934
                  </Text>
                </View>
                <View className="bg-white rounded-md px-3 py-1.5">
                  <Text className="text-cyan-600 font-bold text-sm">VISA</Text>
                </View>
              </View>
            </View>

            {/* Secondary Card - Red */}

            <View
              className="bg-green-400 rounded-2xl p-5 mr-4"
              style={{ width: 280, height: 230 }}
            >
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1">
                  <Text className="text-white/90 text-xs font-medium mb-1 tracking-wide">
                    Your Balance
                  </Text>
                  <Text className="text- text-4xl  pt-20 text-center font-semibold">
                    $ 40,500.80
                  </Text>
                </View>
                <View className="bg-white/30 rounded-lg p-2">
                  <Ionicons name="eye-outline" size={18} color="white" />
                </View>
              </View>

              <View className="flex-row justify-between items-end mt-auto">
                <View>
                  <Text className="text-white/90 text-lg font-medium">
                    Card Number
                  </Text>
                  <Text className="text-black/90 text-xs font-medium mt-0.5 ml-4">
                    ••••9934
                  </Text>
                </View>
                <View className="bg-white rounded-md px-3 py-1.5">
                  <Text className="text-cyan-600 font-bold text-sm">VISA</Text>
                </View>
              </View>
            </View>

            <View
              className="bg-yellow-100 rounded-2xl p-5 mr-4"
              style={{ width: 280, height: 230 }}
            >
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1">
                  <Text className="text-white/90 text-xs font-medium mb-1 tracking-wide">
                    Your Balance
                  </Text>
                  <Text className="text- text-4xl  pt-20 text-center font-semibold">
                    $ 40,500.80
                  </Text>
                </View>
                <View className="bg-white/30 rounded-lg p-2">
                  <Ionicons name="eye-outline" size={18} color="white" />
                </View>
              </View>

              <View className="flex-row justify-between items-end mt-auto">
                <View>
                  <Text className="text-white/90 text-lg font-medium">
                    Card Number
                  </Text>
                  <Text className="text-black/90 text-xs font-medium mt-0.5 ml-4">
                    ••••9934
                  </Text>
                </View>
                <View className="bg-white rounded-md px-3 py-1.5">
                  <Text className="text-cyan-600 font-bold text-sm">VISA</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="flex-row justify-around mb-8">
            <TouchableOpacity className="items-center">
              <View className="bg-white rounded-full p-4 shadow-sm mb-2">
                <Ionicons name="arrow-down-outline" size={24} color="#374151" />
              </View>
              <Text className="text-gray-700 text-sm font-medium">Request</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="bg-white rounded-full p-4 shadow-sm mb-2">
                <Ionicons name="arrow-up-outline" size={24} color="#374151" />
              </View>
              <Text className="text-gray-700 text-sm font-medium">
                Transfer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="bg-black rounded-full p-4 mb-2">
                <Ionicons name="add" size={24} color="white" />
              </View>
              <Text className="text-gray-700 text-sm font-medium">More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction Section */}
        <View className="px-6 mb-20">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 text-xl font-bold">Transaction</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 text-sm font-medium">
                View all
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <Text className="text-gray-500 text-sm font-medium">TODAY</Text>

            {transactions.map((transaction) => (
              <View
                key={transaction.id}
                className="flex-row items-center justify-between py-3"
              >
                <View className="flex-row items-center flex-1">
                  <View className="bg-gray-100 rounded-full p-3 mr-3">
                    <Ionicons
                      name={transaction.icon}
                      size={20}
                      color={
                        transaction.type === "receive" ? "#10B981" : "#6B7280"
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-medium">
                      {transaction.title}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {transaction.time}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`font-semibold ${
                    transaction.amount.startsWith("+")
                      ? "text-green-500"
                      : "text-gray-900"
                  }`}
                >
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <View className="flex-row justify-around py-3">
          <TouchableOpacity className="items-center py-2 px-4">
            <Ionicons name="home" size={24} color="#3B82F6" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center py-2 px-4">
            <Ionicons name="card-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center py-2 px-4">
            <Ionicons name="bar-chart-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center py-2 px-4">
            <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
