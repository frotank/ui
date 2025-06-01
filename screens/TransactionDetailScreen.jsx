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
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Svg, { Path, Circle, Polygon } from "react-native-svg";

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
    merchant: "Zomato",
    name: "Zomato",
    category: "Dining",
    date: "Today, 2:30 PM",
    amount: "₹850",
    icon: "🍔",
    period: "Last 30 days",
    cardUsed: "SBI Platinum",
    currentCashbackRate: "1%",
    actualEarned: "8.50",
    potentialEarned: "42.50",
    missedAmount: "34.00",
    monthlySpending: "2,400",
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

  // Calculate rewards for this specific transaction amount
  const transactionAmount = parseFloat(
    transaction.amount.replace("₹", "").replace(",", "")
  );

  const optimalCardsForThisTransaction = [
    {
      name: "HDFC Swiggy Card",
      cashback: "5% cashback on dining",
      rewardRate: 0.05,
      rewardsForThisTransaction: (transactionAmount * 0.05).toFixed(2),
      currentCardRewards: transaction.actualEarned,
      additionalEarnings: (
        transactionAmount * 0.05 -
        parseFloat(transaction.actualEarned)
      ).toFixed(2),
      annualFee: "₹0 (first year)",
      icon: "trending-up",
      iconColor: "#059669",
      bgColor: "#f0fdf4",
      borderColor: "#bbf7d0",
      textColor: "#059669",
    },
    {
      name: "American Express Gold",
      cashback: "4X points on dining",
      rewardRate: 0.04,
      rewardsForThisTransaction: (transactionAmount * 0.04).toFixed(2),
      currentCardRewards: transaction.actualEarned,
      additionalEarnings: (
        transactionAmount * 0.04 -
        parseFloat(transaction.actualEarned)
      ).toFixed(2),
      annualFee: "₹4,500",
      icon: "star",
      iconColor: "#d97706",
      bgColor: "#fffbeb",
      borderColor: "#fed7aa",
      textColor: "#d97706",
    },
  ];

  const relevantBenefits = [
    "5% cashback on dining & food delivery",
    "No annual fee for first year",
    "Instant digital card available",
    "₹1,200/year potential savings on dining",
  ];

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
            paddingVertical: 24,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
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
            <Svg width="100%" height="120" viewBox="0 0 400 120">
              {/* Stars */}
              <Polygon
                points="50,20 55,35 70,35 58,45 63,60 50,50 37,60 42,45 30,35 45,35"
                fill="#1e40af"
              />
              <Polygon
                points="320,15 323,25 333,25 325,31 328,41 320,35 312,41 315,31 307,25 317,25"
                fill="#2563eb"
              />
              <Polygon
                points="150,80 153,90 163,90 155,96 158,106 150,100 142,106 145,96 137,90 147,90"
                fill="#3b82f6"
              />
              {/* Flowing Lines */}
              <Path
                d="M0,60 Q100,30 200,60 T400,60"
                stroke="#1e40af"
                strokeWidth="2.5"
                fill="none"
              />
              <Path
                d="M0,80 Q150,50 300,80 T400,80"
                stroke="#2563eb"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Circles */}
              <Circle cx="80" cy="100" r="8" fill="#3b82f6" />
              <Circle cx="280" cy="40" r="6" fill="#1e40af" />
              <Circle cx="370" cy="90" r="4" fill="#2563eb" />
            </Svg>
          </View>

          {/* Header Content */}
          <View
            className="flex-row items-center justify-between"
            style={{ position: "relative", zIndex: 1 }}
          >
            <TouchableOpacity
              onPress={handleGoBack}
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.25)",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              <Ionicons name="chevron-back" size={24} color="#1e40af" />
            </TouchableOpacity>

            <View className="flex-1 items-center">
              <Text
                className="text-blue-900 text-xl mb-1"
                style={{ fontFamily: "Inter_700Bold", letterSpacing: -0.5 }}
              >
                Transaction Details
              </Text>
              <Text
                className="text-blue-700 text-sm"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                {transaction.category} • {transaction.date}
              </Text>
            </View>

            <View className="w-12" />
          </View>
        </LinearGradient>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Transaction Context Card */}
        <View className="px-6 pt-6 pb-4">
          <View
            className="bg-white rounded-2xl p-6 border border-gray-100"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: "#f3f4f6" }}
                >
                  <Text className="text-3xl">{transaction.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-900 text-xl mb-1"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    {transaction.merchant}
                  </Text>
                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    {transaction.category} • {transaction.date}
                  </Text>
                </View>
              </View>
              <Text
                className="text-gray-900 text-2xl"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                {transaction.amount}
              </Text>
            </View>

            {/* Card Used */}
            <View
              className="bg-gray-50 rounded-xl p-4"
              style={{ borderLeftWidth: 4, borderLeftColor: "#6b7280" }}
            >
              <Text
                className="text-gray-600 text-xs mb-2"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                PAID WITH
              </Text>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text
                    className="text-gray-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {transaction.cardUsed}
                  </Text>
                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    {transaction.currentCashbackRate} cashback • Earned ₹
                    {transaction.actualEarned}
                  </Text>
                </View>
                <View className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center">
                  <Ionicons name="card" size={20} color="#6b7280" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Loss Analysis */}
        <View className="px-6 pb-6">
          <View
            className="bg-red-50 rounded-2xl p-6 border border-red-200"
            style={{
              shadowColor: "#ef4444",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="trending-down" size={24} color="#ef4444" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-red-900 text-lg mb-1"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  Suboptimal Reward Rate
                </Text>
                <Text
                  className="text-red-600 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  You're earning below market rate for this category
                </Text>
              </View>
            </View>

            {/* Loss Breakdown */}
            <View className="bg-white/60 rounded-xl p-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className="text-red-800 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Current earnings
                </Text>
                <Text
                  className="text-red-800 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  ₹{transaction.actualEarned}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Optimal earnings
                </Text>
                <Text
                  className="text-gray-800 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  ₹{transaction.potentialEarned}
                </Text>
              </View>
              <View className="border-t border-red-200 pt-2 mt-2">
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-red-900 text-base"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    Opportunity loss
                  </Text>
                  <Text
                    className="text-red-900 text-xl"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    ₹{transaction.missedAmount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Optimal Card Analysis */}
        <View className="px-6 pb-6">
          <Text
            className="text-gray-900 text-lg mb-4"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            Optimal Cards for Dining
          </Text>

          {optimalCardsForThisTransaction.map((card, index) => (
            <View
              key={index}
              className="bg-white rounded-2xl p-5 border border-gray-100 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View
                    className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <Ionicons
                      name={card.icon}
                      size={20}
                      color={card.iconColor}
                    />
                  </View>
                  <View>
                    <Text
                      className="text-gray-900 text-base mb-1"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      {card.name}
                    </Text>
                    <Text
                      className="text-green-600 text-sm"
                      style={{ fontFamily: "Inter_500Medium" }}
                    >
                      {card.cashback}
                    </Text>
                  </View>
                </View>
                <Text
                  className="text-green-600 text-xl"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  ₹{card.rewardsForThisTransaction}
                </Text>
              </View>

              {/* Quick Benefits for each card */}
              <View
                className="rounded-xl p-4"
                style={{
                  backgroundColor: card.bgColor,
                  borderColor: card.borderColor,
                  borderWidth: 1,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-green-800 text-sm"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    Annual fee
                  </Text>
                  <Text
                    className="text-green-800 text-sm"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {card.annualFee}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-2">
                  <Text
                    className="text-green-800 text-sm"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    Additional earnings
                  </Text>
                  <Text
                    className="text-green-800 text-sm"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    ₹{card.additionalEarnings}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Impact Insight */}
        <View className="px-6 pb-8">
          <View
            className="bg-blue-50 rounded-xl p-4 border border-blue-200"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="analytics" size={16} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-blue-900 text-sm mb-1"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Monthly dining spend: ₹{transaction.monthlySpending}
                </Text>
                <Text
                  className="text-blue-600 text-xs"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  You could save ₹
                  {Math.round(
                    parseFloat(
                      optimalCardsForThisTransaction[0].annualSavings
                    ) / 12
                  )}
                  /month with better optimization
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
