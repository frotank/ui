import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CardManagementScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-gray-300 mr-3">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              }}
              className="w-12 h-12 rounded-full"
            />
          </View>
          <View className="mt-10">
            <Text className="text-gray-600 text-sm">Welcome back</Text>
            <Text className="text-gray-900 text-lg font-semibold">
              Sarah Muller
            </Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <View className="w-8 h-8 bg-green-400 rounded-lg items-center justify-center">
            <Ionicons name="notifications-outline" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 py-6 bg-white">
        {/* My Card Title */}
        <Text className="text-gray-900 text-2xl font-bold mb-6">My Card</Text>

        {/* Cards Container */}
        <View className="flex-1">
          {/* Green Card */}
          <View className="bg-green-200 rounded-3xl p-6 mb-6 shadow-lg">
            {/* NFC Icon */}
            <View className="mb-8">
              <Ionicons
                name="wifi"
                size={24}
                color="#374151"
                style={{ transform: [{ rotate: "90deg" }] }}
              />
            </View>

            {/* Card Number */}
            <Text className="text-gray-800 text-xl font-mono font-bold tracking-widest mb-8">
              1253 5432 3524 3090
            </Text>

            {/* Bottom Row */}
            <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-gray-700 text-sm font-medium">
                  Sarah Muller
                </Text>
                <Text className="text-gray-700 text-sm">Exp 05/24</Text>
              </View>
              <View className="bg-white rounded-lg px-3 py-2">
                <Text className="text-primary-600 font-bold text-lg">VISA</Text>
              </View>
            </View>
          </View>

          {/* Black Card */}
          <View className="bg-gray-900 rounded-3xl p-6 mb-8 shadow-lg">
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
            <Text className="text-white text-xl font-mono font-bold tracking-widest mb-8">
              1253 5432 3524 3090
            </Text>

            {/* Bottom Row */}
            <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-white text-sm font-medium">
                  Sarah Muller
                </Text>
                <Text className="text-white text-sm">Exp 05/24</Text>
              </View>
              <View className="bg-white rounded-lg px-3 py-2">
                <Text className="text-primary-600 font-bold text-lg">VISA</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Add New Card Button */}
        <TouchableOpacity className="bg-primary-500 rounded-2xl py-4 items-center mb-6">
          <Text className="text-white text-lg font-semibold">Add New Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
