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
import Svg, {
  Path,
  Rect,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";

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
      {/* Header with gradient and wavy accent */}
      <View style={{ position: "relative" }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 110,
            zIndex: 0,
          }}
        >
          <Svg width="100%" height={110} viewBox="0 0 400 110">
            <Defs>
              <SvgLinearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#e0f2fe" />
                <Stop offset="100%" stopColor="#60a5fa" />
              </SvgLinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="400"
              height="110"
              fill="url(#headerGrad)"
            />
            <Path
              d="M0,80 Q100,100 200,90 T400,100"
              stroke="#38bdf8"
              strokeWidth="3"
              fill="none"
              opacity="0.18"
            />
          </Svg>
        </View>
        <View className="px-6 py-6" style={{ zIndex: 1 }}>
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
        {/* Highlighted line under header */}
        <View
          style={{
            height: 4,
            backgroundColor: "#60a5fa",
            width: "30%",
            borderRadius: 2,
            marginLeft: 24,
            marginTop: -8,
            marginBottom: 8,
            opacity: 0.7,
          }}
        />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Amount Spent Card */}
        <View className="px-6 py-6">
          <View
            style={{
              backgroundColor: "#e0f2fe",
              borderRadius: 28,
              padding: 32,
              shadowColor: "#60a5fa",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 24,
              elevation: 8,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Floating accent shape */}
            <Svg
              width={80}
              height={80}
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                opacity: 0.13,
              }}
            >
              <Rect x="0" y="0" width="80" height="80" rx="24" fill="#60a5fa" />
            </Svg>
            {/* Vertical accent line */}
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 24,
                bottom: 24,
                width: 5,
                borderRadius: 3,
                backgroundColor: "#38bdf8",
                opacity: 0.5,
              }}
            />
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
            style={{
              borderRadius: 28,
              padding: 32,
              backgroundColor: "#fff",
              shadowColor: "#60a5fa",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.18,
              shadowRadius: 32,
              elevation: 12,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Diagonal SVG accent */}
            <Svg
              width={120}
              height={60}
              style={{ position: "absolute", top: 0, right: 0, opacity: 0.13 }}
            >
              <Path
                d="M0,50 Q60,0 120,50"
                stroke="#60a5fa"
                strokeWidth="6"
                fill="none"
              />
            </Svg>
            <Text
              className="text-blue-600 text-lg mb-3"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Potential Savings
            </Text>
            <Text
              className="text-blue-900 text-6xl mb-8"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -2,
                textShadowColor: "#60a5fa33",
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 16,
              }}
            >
              ${potentialSavings}
            </Text>
            <View className="bg-blue-50 rounded-2xl p-6">
              <Text
                className="text-blue-600 text-base mb-2"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Recommended Card
              </Text>
              <Text
                className="text-blue-900 text-2xl mb-3"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                {recommendedCard.name}
              </Text>
              <Text
                className="text-blue-600 text-lg"
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
            style={{
              backgroundColor: "#f0f9ff",
              borderRadius: 28,
              padding: 32,
              borderLeftWidth: 6,
              borderLeftColor: "#60a5fa",
              shadowColor: "#60a5fa",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Dotted SVG pattern */}
            <Svg
              width={120}
              height={32}
              style={{
                position: "absolute",
                bottom: 8,
                left: 16,
                opacity: 0.12,
              }}
            >
              <Path
                d="M0,16 h120"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeDasharray="8,8"
              />
            </Svg>
            <Text
              className="text-blue-900 text-xl mb-6"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Rewards Comparison
            </Text>
            {/* Your Card */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-blue-900 text-lg"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Your Card
                </Text>
                <Text
                  className="text-blue-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  {recommendedCard.yourCardRewards}
                </Text>
              </View>
              <View className="bg-blue-100 rounded-full h-2">
                <View
                  className="bg-blue-400 rounded-full h-2"
                  style={{ width: "20%" }}
                />
              </View>
            </View>
            {/* Recommended Card */}
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-blue-900 text-lg"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Recommended Card
                </Text>
                <Text
                  className="text-blue-900 text-lg"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  {recommendedCard.rewards}
                </Text>
              </View>
              <View className="bg-blue-100 rounded-full h-2">
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
            style={{
              backgroundColor: "#fff",
              borderRadius: 28,
              padding: 32,
              borderTopWidth: 4,
              borderTopColor: "#60a5fa",
              shadowColor: "#60a5fa",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent line as SVG */}
            <Svg
              width={120}
              height={8}
              style={{ position: "absolute", top: 0, left: 24, opacity: 0.13 }}
            >
              <Rect x="0" y="0" width="120" height="8" rx="4" fill="#60a5fa" />
            </Svg>
            <Text
              className="text-blue-900 text-xl mb-6"
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
            style={{
              backgroundColor:
                "linear-gradient(90deg, #60a5fa 0%, #38bdf8 100%)",
              borderRadius: 18,
              paddingVertical: 20,
              shadowColor: "#60a5fa",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.18,
              shadowRadius: 12,
              elevation: 6,
              borderWidth: 2,
              borderColor: "#e0f2fe",
            }}
          >
            <Text
              className="text-blue-900 text-center text-lg"
              style={{
                fontFamily: "Inter_600SemiBold",
                textShadowColor: "#60a5fa33",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 8,
              }}
            >
              Apply for {recommendedCard.name}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
