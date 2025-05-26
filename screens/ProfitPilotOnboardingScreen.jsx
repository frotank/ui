import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  statusbars,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function ProfitPilotOnboardingScreen() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="off" backgroundColor="black" />

      {/* Background with light blue gradient */}
      <View className="flex-1" style={{ backgroundColor: "#ffffff" }}>
        {/* Header with ProfitPilot branding */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-black text-xl font-bold">ZashIt</Text>
        </View>

        {/* Main content container */}
        <View className="flex-1 px-6">
          {/* Curved design element */}
          <View className="relative mb-4" style={{ height: 80 }}>
            <View className="absolute top-8 left-8">
              <Svg width={80} height={60} viewBox="0 0 80 60">
                <Path
                  d="M10,40 Q25,10 50,25 Q65,35 70,15"
                  stroke="#000000"
                  strokeWidth={2.5}
                  fill="none"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          </View>

          {/* Card mockups section */}
          <View className="relative mb-12" style={{ height: 300 }}>
            {/* Background card (top-right) */}
            <View
              className="absolute bg-white rounded-3xl"
              style={{
                width: width * 0.75,
                height: 190,
                top: 0,
                right: 0,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.08,
                shadowRadius: 24,
                elevation: 12,
              }}
            >
              <View className="p-6">
                {/* US Dollar flag and label */}
                <View className="flex-row items-center mb-3">
                  <View className="w-7 h-5 rounded-sm mr-2 overflow-hidden">
                    <View className="flex-1 bg-red-600"></View>
                    <View className="absolute top-0 left-0 w-3 h-3 bg-primary-800"></View>
                    <View className="w-full h-0.5 bg-white absolute top-1"></View>
                    <View className="w-full h-0.5 bg-white absolute top-2"></View>
                    <View className="w-full h-0.5 bg-white absolute top-3"></View>
                    <View className="w-full h-0.5 bg-white absolute bottom-1"></View>
                    <View className="w-full h-0.5 bg-white absolute bottom-2"></View>
                  </View>
                  <Text className="text-gray-600 text-sm font-medium">
                    US Dollar
                  </Text>
                </View>

                {/* Balance label */}
                <Text className="text-gray-500 text-xs mb-1">Your balance</Text>

                {/* Amount */}
                <Text className="text-black text-3xl font-bold mb-8">
                  $40,500.80
                </Text>

                {/* Card details */}
                <View className="flex-row justify-between items-end">
                  <Text className="text-gray-400 text-sm">••••9934</Text>
                  <View className="bg-gray-100 rounded px-2 py-1">
                    <Text className="text-gray-600 text-xs font-semibold">
                      05/28
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Foreground card (bottom-left) */}
            <View
              className="absolute rounded-3xl"
              style={{
                width: width * 0.75,
                height: 190,
                top: 90,
                left: 0,
                backgroundColor: "#A7F3D0", // Light green/mint
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.08,
                shadowRadius: 24,
                elevation: 12,
              }}
            >
              <View className="p-6">
                {/* US Dollar flag and label */}
                <View className="flex-row items-center mb-3">
                  <View className="w-7 h-5 rounded-sm mr-2 overflow-hidden">
                    <View className="flex-1 bg-red-600"></View>
                    <View className="absolute top-0 left-0 w-3 h-3 bg-primary-800"></View>
                    <View className="w-full h-0.5 bg-white absolute top-1"></View>
                    <View className="w-full h-0.5 bg-white absolute top-2"></View>
                    <View className="w-full h-0.5 bg-white absolute top-3"></View>
                    <View className="w-full h-0.5 bg-white absolute bottom-1"></View>
                    <View className="w-full h-0.5 bg-white absolute bottom-2"></View>
                  </View>
                  <Text className="text-gray-700 text-sm font-medium">
                    US Dollar
                  </Text>
                </View>

                {/* Balance label */}
                <Text className="text-gray-600 text-xs mb-1">Your balance</Text>

                {/* Amount */}
                <Text className="text-black text-3xl font-bold mb-8">
                  $40,500.80
                </Text>

                {/* Card details */}
                <View className="flex-row justify-between items-end">
                  <Text className="text-gray-500 text-sm">••••9934</Text>
                  <Text className="text-gray-500 text-sm">05/28</Text>
                </View>
              </View>

              {/* Request indicator with arrow */}
              <View className="absolute bottom-6 right-6">
                <View className="bg-white rounded-2xl px-4 py-2 shadow-sm flex-row items-center">
                  <Text className="text-black text-sm font-medium mr-1">
                    Request
                  </Text>
                  <Text className="text-black text-lg">↙</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Main heading */}
          <View className="mb-6">
            <Text
              className="text-black font-bold leading-tight mb-2"
              style={{ fontSize: 36 }}
            >
              Your{"\n"}Financial{"\n"}Navigator
            </Text>
          </View>

          {/* Description text */}
          <View className="mb-12">
            <Text
              className="text-gray-600 text-base leading-relaxed pb-10"
              style={{ lineHeight: 24 }}
            >
              Invest in projects that make a difference.lorem ipsum dolor sit
              ioec sjbeuhajenh jbfijf
            </Text>
          </View>

          {/* Pagination dots
          <View className="flex-row justify-center mb-8">
            <View className="w-2 h-2 bg-red-500 rounded-full mx-1"></View>
            <View className="w-2 h-2 bg-gray-300 rounded-full mx-1"></View>
            <View className="w-2 h-2 bg-gray-300 rounded-full mx-1"></View>
          </View> */}
        </View>

        {/* Get Started button */}
        <View className="px-4 pb-8">
          <TouchableOpacity
            className="bg-black rounded-2xl py-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
