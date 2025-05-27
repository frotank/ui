import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
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
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import BottomNavigation from "../components/BottomNavigation";

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("personal");

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderPersonalInfo = () => (
    <View className="px-6 py-6">
      {/* Profile Header */}
      <Card padding="p-6" margin="mb-8">
        <View className="items-center mb-8">
          <View className="w-28 h-28 rounded-full overflow-hidden mb-6">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
              }}
              className="w-full h-full"
            />
          </View>
          <Text
            className="text-gray-900 text-2xl mb-2"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            John Doe
          </Text>
          <Text
            className="text-gray-500 text-base"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            Premium Member
          </Text>
        </View>

        <TouchableOpacity className="bg-gray-900 rounded-2xl py-4">
          <Text
            className="text-white text-center text-base"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </Card>

      {/* Personal Information */}
      <Card padding="p-6" margin="mb-8">
        <SectionHeader
          title="Personal Information"
          marginBottom="mb-6"
          marginTop="mt-0"
        />

        <View>
          <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Email
            </Text>
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              john.doe@email.com
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Phone
            </Text>
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              +1 (555) 123-4567
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Date of Birth
            </Text>
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              January 15, 1990
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-4">
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Address
            </Text>
            <Text
              className="text-gray-900 text-base text-right flex-1 ml-4"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              123 Main St, New York, NY 10001
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderBankCards = () => (
    <View className="px-6 py-6">
      {/* Connected Banks */}
      <View
        className="bg-white rounded-3xl p-6 mb-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <Text
          className="text-gray-900 text-xl mb-6"
          style={{ fontFamily: "Inter_700Bold" }}
        >
          Connected Banks
        </Text>

        <View className="space-y-4">
          <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="business" size={24} color="#3b82f6" />
              </View>
              <View>
                <Text
                  className="text-gray-900 text-base mb-1"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Chase Bank
                </Text>
                <Text
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  ••••1234
                </Text>
              </View>
            </View>
            <View className="bg-green-100 rounded-xl px-3 py-1">
              <Text
                className="text-green-700 text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Active
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="business" size={24} color="#8b5cf6" />
              </View>
              <View>
                <Text
                  className="text-gray-900 text-base mb-1"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Bank of America
                </Text>
                <Text
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  ••••5678
                </Text>
              </View>
            </View>
            <View className="bg-green-100 rounded-xl px-3 py-1">
              <Text
                className="text-green-700 text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Active
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Cards */}
      <View
        className="bg-white rounded-3xl p-6 mb-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <Text
          className="text-gray-900 text-xl mb-6"
          style={{ fontFamily: "Inter_700Bold" }}
        >
          Your Cards
        </Text>

        <View className="space-y-4">
          <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-900 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="card" size={24} color="white" />
              </View>
              <View>
                <Text
                  className="text-gray-900 text-base mb-1"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Visa Platinum
                </Text>
                <Text
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  ••••1234 • $5,234.50
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-green-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="card" size={24} color="#059669" />
              </View>
              <View>
                <Text
                  className="text-gray-900 text-base mb-1"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Mastercard Gold
                </Text>
                <Text
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  ••••5678 • $3,421.75
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Add New Card */}
      <TouchableOpacity className="bg-gray-900 rounded-2xl py-4 mx-6">
        <Text
          className="text-white text-center text-base"
          style={{ fontFamily: "Inter_600SemiBold" }}
        >
          Add New Card
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHelpSupport = () => (
    <View className="px-6 py-6">
      {/* Quick Help */}
      <View
        className="bg-white rounded-3xl p-6 mb-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <Text
          className="text-gray-900 text-xl mb-6"
          style={{ fontFamily: "Inter_700Bold" }}
        >
          Quick Help
        </Text>

        <View className="space-y-4">
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="help-circle" size={24} color="#3b82f6" />
              </View>
              <Text
                className="text-gray-900 text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                FAQ
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-green-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="chatbubble" size={24} color="#059669" />
              </View>
              <Text
                className="text-gray-900 text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Live Chat
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="call" size={24} color="#8b5cf6" />
              </View>
              <Text
                className="text-gray-900 text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Call Support
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Information */}
      <View
        className="bg-white rounded-3xl p-6 mb-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <Text
          className="text-gray-900 text-xl mb-6"
          style={{ fontFamily: "Inter_700Bold" }}
        >
          Contact Information
        </Text>

        <View className="space-y-4">
          <View className="py-3 border-b border-gray-100">
            <Text
              className="text-gray-500 text-sm mb-1"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Email Support
            </Text>
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              support@zashit.com
            </Text>
          </View>

          <View className="py-3 border-b border-gray-100">
            <Text
              className="text-gray-500 text-sm mb-1"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Phone Support
            </Text>
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              1-800-ZASH-IT (1-800-927-448)
            </Text>
          </View>

          <View className="py-3">
            <Text
              className="text-gray-500 text-sm mb-1"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Business Hours
            </Text>
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Mon-Fri: 9AM-6PM EST
            </Text>
          </View>
        </View>
      </View>

      {/* App Information */}
      <View
        className="bg-white rounded-3xl p-6 mb-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <Text
          className="text-gray-900 text-xl mb-6"
          style={{ fontFamily: "Inter_700Bold" }}
        >
          App Information
        </Text>

        <View className="space-y-4">
          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Version
            </Text>
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              1.0.0
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Privacy Policy
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <Text
              className="text-gray-900 text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Terms of Service
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
              Welcome back,
            </Text>
            <Text
              className="text-gray-900 text-2xl"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Profile
            </Text>
          </View>

          <TouchableOpacity className="bg-blue-50 rounded-2xl p-4">
            <Ionicons name="settings-outline" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row bg-gray-100 rounded-2xl p-1">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl ${
              activeTab === "personal" ? "bg-white" : ""
            }`}
            onPress={() => setActiveTab("personal")}
            style={
              activeTab === "personal"
                ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }
                : {}
            }
          >
            <Text
              className={`text-center text-sm ${
                activeTab === "personal" ? "text-gray-900" : "text-gray-500"
              }`}
              style={{
                fontFamily:
                  activeTab === "personal"
                    ? "Inter_600SemiBold"
                    : "Inter_500Medium",
              }}
            >
              Personal Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl ${
              activeTab === "banking" ? "bg-white" : ""
            }`}
            onPress={() => setActiveTab("banking")}
            style={
              activeTab === "banking"
                ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }
                : {}
            }
          >
            <Text
              className={`text-center text-sm ${
                activeTab === "banking" ? "text-gray-900" : "text-gray-500"
              }`}
              style={{
                fontFamily:
                  activeTab === "banking"
                    ? "Inter_600SemiBold"
                    : "Inter_500Medium",
              }}
            >
              Bank & Cards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl ${
              activeTab === "support" ? "bg-white" : ""
            }`}
            onPress={() => setActiveTab("support")}
            style={
              activeTab === "support"
                ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }
                : {}
            }
          >
            <Text
              className={`text-center text-sm ${
                activeTab === "support" ? "text-gray-900" : "text-gray-500"
              }`}
              style={{
                fontFamily:
                  activeTab === "support"
                    ? "Inter_600SemiBold"
                    : "Inter_500Medium",
              }}
            >
              Help & Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {activeTab === "personal" && renderPersonalInfo()}
        {activeTab === "banking" && renderBankCards()}
        {activeTab === "support" && renderHelpSupport()}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
}
