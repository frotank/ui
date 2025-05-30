import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
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

// Import reusable components
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import BottomNavigation from "../components/BottomNavigation";

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  // Personal information state
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "January 15, 1990",
    address: "123 Main St, New York, NY 10001",
  });

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleEditField = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
    setEditModalVisible(true);
  };

  const handleSaveField = () => {
    if (!tempValue.trim()) {
      Alert.alert("Error", "Field cannot be empty");
      return;
    }

    setPersonalInfo((prev) => ({
      ...prev,
      [editingField]: tempValue,
    }));

    setEditModalVisible(false);
    setEditingField(null);
    setTempValue("");
    Alert.alert("Success", "Information updated successfully!");
  };

  const getFieldLabel = (field) => {
    const labels = {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      dateOfBirth: "Date of Birth",
      address: "Home Address",
    };
    return labels[field] || field;
  };

  const renderPersonalInfo = () => (
    <View className="px-6 py-6">
      {/* Profile Header */}
      <View
        className="bg-white rounded-3xl p-6 mb-8"
        style={{
          shadowColor: "#3b82f6",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <View className="items-center mb-8">
          <View className="w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-blue-100">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
              }}
              className="w-full h-full"
            />
          </View>
          <Text
            className="text-blue-900 text-2xl mb-2"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            {personalInfo.name}
          </Text>
          <Text
            className="text-blue-600 text-base"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            Premium Member
          </Text>
        </View>

        <TouchableOpacity className="bg-blue-600 rounded-2xl py-4">
          <Text
            className="text-white text-center text-base"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Personal Information */}
      <View
        className="bg-white rounded-3xl p-6 mb-8"
        style={{
          shadowColor: "#3b82f6",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <Text
          className="text-blue-900 text-xl mb-6"
          style={{
            fontFamily: "Inter_700Bold",
            letterSpacing: -0.5,
          }}
        >
          Personal Information
        </Text>

        <View className="space-y-1">
          {/* Email */}
          <View className="bg-blue-50 rounded-2xl p-4 border border-blue-100 mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-4">
                <Ionicons name="mail" size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-blue-600 text-sm mb-1"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  {getFieldLabel("email")}
                </Text>
                <Text
                  className="text-blue-900 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {personalInfo.email}
                </Text>
              </View>
            </View>
          </View>

          {/* Phone */}
          <View className="bg-green-50 rounded-2xl p-4 border border-green-100 mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center mr-4">
                <Ionicons name="call" size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-green-600 text-sm mb-1"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  {getFieldLabel("phone")}
                </Text>
                <Text
                  className="text-green-900 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {personalInfo.phone}
                </Text>
              </View>
            </View>
          </View>

          {/* Date of Birth */}
          <View className="bg-purple-50 rounded-2xl p-4 border border-purple-100 mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-4">
                <Ionicons name="calendar" size={20} color="#8b5cf6" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-purple-600 text-sm mb-1"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  {getFieldLabel("dateOfBirth")}
                </Text>
                <Text
                  className="text-purple-900 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {personalInfo.dateOfBirth}
                </Text>
              </View>
            </View>
          </View>

          {/* Address */}
          <View className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
            <View className="flex-row items-start">
              <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mr-4 mt-1">
                <Ionicons name="location" size={20} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-orange-600 text-sm mb-1"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  {getFieldLabel("address")}
                </Text>
                <Text
                  className="text-orange-900 text-base leading-6"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {personalInfo.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
          shadowColor: "#3b82f6",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <Text
          className="text-blue-900 text-xl mb-6"
          style={{
            fontFamily: "Inter_700Bold",
            letterSpacing: -0.5,
          }}
        >
          Your Cards
        </Text>

        <View className="space-y-6">
          {/* Visa Platinum Card */}
          <TouchableOpacity>
            <View
              className="rounded-3xl overflow-hidden mx-2 mb-4"
              style={{
                height: 200,
                width: "100%",
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              <LinearGradient
                colors={["#1e40af", "#2563eb", "#3b82f6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, padding: 24, position: "relative" }}
              >
                {/* Card Header */}
                <View className="flex-row items-start justify-between mb-4">
                  <View>
                    <Text
                      className="text-white text-lg tracking-wider"
                      style={{
                        fontFamily: "Inter_700Bold",
                        textShadowColor: "#00000030",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}
                    >
                      VISA PLATINUM
                    </Text>
                  </View>
                  <View className="bg-white/25 rounded-lg px-3 py-2">
                    <Text
                      className="text-white text-xs"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      ACTIVE
                    </Text>
                  </View>
                </View>

                {/* Card Number and Balance */}
                <View className="flex-1 justify-center">
                  <Text
                    className="text-white/80 text-sm mb-2"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    Card Number
                  </Text>
                  <Text
                    className="text-white text-2xl mb-4"
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      letterSpacing: 3,
                    }}
                  >
                    •••• •••• •••• 1234
                  </Text>
                </View>

                {/* Card Footer */}
                <View className="flex-row items-end justify-between">
                  <View>
                    <Text
                      className="text-white/80 text-sm mb-1"
                      style={{ fontFamily: "Inter_500Medium" }}
                    >
                      Current Balance
                    </Text>
                    <Text
                      className="text-white text-2xl"
                      style={{
                        fontFamily: "Inter_700Bold",
                        textShadowColor: "#00000030",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}
                    >
                      $5,234.50
                    </Text>
                  </View>
                  <View>
                    <Text
                      className="text-white text-sm"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      ZASHIT
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>

          {/* Mastercard Gold Card */}
          <TouchableOpacity>
            <View
              className="rounded-3xl overflow-hidden mx-2"
              style={{
                height: 200,
                width: "100%",
                shadowColor: "#f59e0b",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              <LinearGradient
                colors={["#f59e0b", "#f97316", "#ea580c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, padding: 24, position: "relative" }}
              >
                {/* Card Header */}
                <View className="flex-row items-start justify-between mb-4">
                  <View>
                    <Text
                      className="text-white text-lg tracking-wider"
                      style={{
                        fontFamily: "Inter_700Bold",
                        textShadowColor: "#00000030",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}
                    >
                      MASTERCARD GOLD
                    </Text>
                  </View>
                  <View className="bg-white/25 rounded-lg px-3 py-2">
                    <Text
                      className="text-white text-xs"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      ACTIVE
                    </Text>
                  </View>
                </View>

                {/* Card Number and Balance */}
                <View className="flex-1 justify-center">
                  <Text
                    className="text-white/80 text-sm mb-2"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    Card Number
                  </Text>
                  <Text
                    className="text-white text-2xl mb-4"
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      letterSpacing: 3,
                    }}
                  >
                    •••• •••• •••• 5678
                  </Text>
                </View>

                {/* Card Footer */}
                <View className="flex-row items-end justify-between">
                  <View>
                    <Text
                      className="text-white/80 text-sm mb-1"
                      style={{ fontFamily: "Inter_500Medium" }}
                    >
                      Current Balance
                    </Text>
                    <Text
                      className="text-white text-2xl"
                      style={{
                        fontFamily: "Inter_700Bold",
                        textShadowColor: "#00000030",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}
                    >
                      $3,421.75
                    </Text>
                  </View>
                  <View>
                    <Text
                      className="text-white text-sm"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      ZASHIT
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
