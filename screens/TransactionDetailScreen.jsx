import React, { useState, useEffect } from "react";
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
import api from "../utils/api";

export default function TransactionDetailScreen({ route, navigation }) {
  const [transactionData, setTransactionData] = useState({
    transactionCount: 0,
    totalAmount: 0,
    averageAmount: 0,
  });
  const [loadingTransactionData, setLoadingTransactionData] = useState(true);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Fetch frequent transactions data
  const fetchTransactionData = async () => {
    try {
      console.log("🔍 Fetching transaction data for details...");
      const { data } = await api.get("/financial-data/transactions/frequent");
      console.log("✅ Transaction data API response:", data);

      if (
        data.code === 200 &&
        data.data.frequentMerchants &&
        data.data.frequentMerchants.length > 0
      ) {
        // Use the first merchant's data for the transaction details
        const firstMerchant = data.data.frequentMerchants[0];
        setTransactionData({
          transactionCount: firstMerchant.transactionCount,
          totalAmount: Math.round(firstMerchant.totalAmount),
          averageAmount: Math.round(firstMerchant.averageAmount),
        });
      }
    } catch (error) {
      console.error("❌ Error fetching transaction data:", error);
      // Keep default static values on error
    } finally {
      setLoadingTransactionData(false);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

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
            paddingVertical: 32,
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
        {/* Transaction Details Card */}
        <View className="px-6 pt-8 pb-6">
          <View
            className="bg-white rounded-2xl p-8 border border-gray-100"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 6,
            }}
          >
            <View className="flex-row items-center justify-between mb-6">
              <Text
                className="text-gray-900 text-xl mb-2"
                style={{
                  fontFamily: "Inter_700Bold",
                  letterSpacing: -0.5,
                }}
              >
                Transaction Details
              </Text>
              <View className="bg-blue-100 rounded-xl px-4 py-2">
                <Text
                  className="text-blue-700 text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {transaction.category}
                </Text>
              </View>
            </View>

            <View className="bg-gray-50 rounded-xl p-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text
                  className="text-gray-600 text-xs mb-2"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Transaction Count
                </Text>
                <Text
                  className="text-gray-900 text-base mb-2"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {loadingTransactionData
                    ? "Loading..."
                    : transactionData.transactionCount}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-4">
                <Text
                  className="text-gray-600 text-xs mb-2"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Total Amount
                </Text>
                <Text
                  className="text-gray-900 text-base mb-2"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {loadingTransactionData
                    ? "Loading..."
                    : `₹${transactionData.totalAmount}`}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-gray-600 text-xs"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Average Amount
                </Text>
                <Text
                  className="text-gray-900 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {loadingTransactionData
                    ? "Loading..."
                    : `₹${transactionData.averageAmount}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Missed Rewards Alert */}
        <View className="px-6 pb-8">
          <View
            className="bg-red-50 rounded-2xl p-8 border border-red-200"
            style={{
              shadowColor: "#ef4444",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <View className="flex-row items-center mb-6">
              <Text
                className="text-red-900 text-lg mb-2"
                style={{
                  fontFamily: "Inter_700Bold",
                  letterSpacing: -0.3,
                }}
              >
                🚨 Missed Rewards Alert
              </Text>
            </View>

            <View className="bg-white/60 rounded-xl p-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-red-700 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  You could have earned
                </Text>
                <Text
                  className="text-red-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  ₹{transaction.potentialEarned}
                </Text>
              </View>

              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-red-700 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  You actually earned
                </Text>
                <Text
                  className="text-red-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  ₹{transaction.actualEarned}
                </Text>
              </View>

              <View className="border-t border-red-200 pt-3 mt-3">
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-red-800 text-base"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Missed Amount
                  </Text>
                  <Text
                    className="text-red-900 text-xl"
                    style={{
                      fontFamily: "Inter_700Bold",
                      letterSpacing: -0.5,
                    }}
                  >
                    ₹{transaction.missedAmount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Optimal Cards for This Transaction */}
        <View className="px-6 pb-8">
          <Text
            className="text-gray-900 text-lg mb-6"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.5,
            }}
          >
            Better Cards for This Transaction
          </Text>

          {optimalCardsForThisTransaction.map((card, index) => (
            <View
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 mb-6"
              style={{
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
                elevation: 6,
              }}
            >
              <View className="flex-row items-center justify-between mb-6">
                <Text
                  className="text-gray-900 text-base mb-2"
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    letterSpacing: 0.2,
                  }}
                >
                  {card.name}
                </Text>
                <View
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: card.bgColor,
                    borderColor: card.borderColor,
                    borderWidth: 1,
                  }}
                >
                  <Ionicons name={card.icon} size={24} color={card.iconColor} />
                </View>
              </View>

              <Text
                className="text-gray-600 text-sm mb-4"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                {card.cashback}
              </Text>

              <View className="flex-row items-center justify-between mt-3">
                <Text
                  className="text-gray-700 text-sm"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Would have earned: ₹{card.rewardsForThisTransaction}
                </Text>
                <Text
                  className="text-green-600 text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  +₹{card.additionalEarnings} more
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Apply Section */}
        <View className="px-6 pb-8">
          <View
            className="bg-blue-50 rounded-xl p-6 border border-blue-200"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Text
              className="text-blue-900 text-sm mb-2"
              style={{
                fontFamily: "Inter_600SemiBold",
                letterSpacing: 0.2,
              }}
            >
              💡 Smart Recommendation
            </Text>
            <Text
              className="text-blue-700 text-sm leading-5"
              style={{
                fontFamily: "Inter_400Regular",
                opacity: 0.9,
              }}
            >
              Switch to HDFC Swiggy Card for dining transactions to maximize
              your rewards. You could save ₹{potentialSavings}/month on similar
              spending.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
