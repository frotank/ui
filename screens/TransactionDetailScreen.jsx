import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function TransactionDetailScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Get transaction data from route params or use default data
  const transaction = route?.params?.transaction || {
    id: 1,
    name: "Amazon",
    category: "Shopping",
    date: "April 15, 2025",
    amount: "$3,000",
    icon: "🛍️",
    period: "Last 30 days",
  };

  // Function to handle back navigation - works with or without navigation prop
  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log(
        "Navigation not available - this is likely being viewed standalone"
      );
    }
  };

  const potentialSavings = 240;
  const recommendedCard = {
    name: "HDFC Millennia",
    cashback: "5% cashback vs your current 1%",
    rewards: 150,
    yourCardRewards: 30,
  };

  const additionalBenefits = [
    "Purchase Protection up to $50,000",
    "Extended Warranty Coverage",
    "Easy EMI Conversion",
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-6 py-6 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={handleGoBack}
            className="w-12 h-12 rounded-2xl bg-gray-50 items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#374151" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text
              className="text-gray-900 text-xl"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              {transaction.name} Transaction
            </Text>
          </View>
          <View className="w-12" />
        </View>
        <View className="items-center mt-3">
          <Text
            className="text-gray-500 text-base"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            {transaction.category} | {transaction.period}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Amount Spent Card */}
        <View className="px-6 py-6">
          <View
            className="bg-white rounded-3xl p-8"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Text
              className="text-gray-500 text-base mb-2"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Amount Spent
            </Text>
            <Text
              className="text-gray-900 text-5xl mb-4"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              {transaction.amount}
            </Text>
            <Text
              className="text-gray-600 text-base mb-1"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Transaction Date
            </Text>
            <Text
              className="text-gray-900 text-lg"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              {transaction.date}
            </Text>
          </View>
        </View>

        {/* Potential Savings Card */}
        <View className="px-6 pb-6">
          <View
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8"
            style={{
              backgroundColor: "#4F46E5",
              shadowColor: "#4F46E5",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.25,
              shadowRadius: 32,
              elevation: 12,
            }}
          >
            <Text
              className="text-blue-100 text-lg mb-3"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Potential Savings
            </Text>
            <Text
              className="text-white text-6xl mb-8"
              style={{ fontFamily: "Inter_700Bold", letterSpacing: -2 }}
            >
              ${potentialSavings}
            </Text>

            <View className="bg-white/10 rounded-2xl p-6">
              <Text
                className="text-blue-100 text-base mb-2"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Recommended Card
              </Text>
              <Text
                className="text-white text-2xl mb-3"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                {recommendedCard.name}
              </Text>
              <Text
                className="text-blue-100 text-lg"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                {recommendedCard.cashback}
              </Text>
            </View>
          </View>
        </View>

        {/* Rewards Comparison */}
        <View className="px-6 pb-6">
          <View
            className="bg-white rounded-3xl p-8"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Text
              className="text-gray-900 text-xl mb-6"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Rewards Comparison
            </Text>

            {/* Your Card */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Your Card
                </Text>
                <Text
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  {recommendedCard.yourCardRewards}
                </Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2">
                <View
                  className="bg-gray-400 rounded-full h-2"
                  style={{ width: "20%" }}
                />
              </View>
            </View>

            {/* Recommended Card */}
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Recommended Card
                </Text>
                <Text
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  {recommendedCard.rewards}
                </Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2">
                <View
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: "100%" }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Additional Benefits */}
        <View className="px-6 pb-6">
          <View
            className="bg-white rounded-3xl p-8"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Text
              className="text-gray-900 text-xl mb-6"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Additional Benefits
            </Text>

            {additionalBenefits.map((benefit, index) => (
              <View
                key={index}
                className="flex-row items-center mb-4 last:mb-0"
              >
                <View className="w-6 h-6 rounded-full bg-green-100 items-center justify-center mr-4">
                  <Ionicons name="checkmark" size={16} color="#059669" />
                </View>
                <Text
                  className="text-gray-700 text-lg flex-1"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  {benefit}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Button */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            className="bg-gray-900 rounded-2xl py-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text
              className="text-white text-center text-lg"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Apply for {recommendedCard.name}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
