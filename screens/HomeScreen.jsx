import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Polygon } from "react-native-svg";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

// Import reusable components
import Card from "../components/Card";
import TransactionItem from "../components/TransactionItem";
import RecommendedCard from "../components/RecommendedCard";
import SectionHeader from "../components/SectionHeader";
import BottomNavigation from "../components/BottomNavigation";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock data for missed rewards breakdown
  const missedRewardsData = [
    {
      category: "Dining",
      amount: 450,
      color: "#2563eb",
      icon: "🍽️",
      svgIcon: "restaurant",
    },
    {
      category: "Travel",
      amount: 380,
      color: "#1d4ed8",
      icon: "✈️",
      svgIcon: "airplane",
    },
    {
      category: "Shopping",
      amount: 250,
      color: "#3b82f6",
      icon: "🛍️",
      svgIcon: "bag",
    },
    {
      category: "Fuel",
      amount: 120,
      color: "#60a5fa",
      icon: "⛽",
      svgIcon: "car",
    },
  ];

  const totalMissed = missedRewardsData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Frequent transactions with optimization status
  const frequentTransactions = [
    {
      id: 1,
      merchant: "Zomato",
      category: "Dining",
      amount: "₹850",
      cardUsed: "SBI Platinum",
      isOptimal: false,
      betterCard: "HDFC Swiggy Card",
      missedReward: "₹85",
      icon: "🍔",
    },
    {
      id: 2,
      merchant: "Amazon",
      category: "Shopping",
      amount: "₹2,400",
      cardUsed: "ICICI Amazon Pay",
      isOptimal: true,
      earnedReward: "₹120",
      icon: "📦",
    },
    {
      id: 3,
      merchant: "Indian Oil",
      category: "Fuel",
      amount: "₹3,000",
      cardUsed: "HDFC Regalia",
      isOptimal: false,
      betterCard: "BPCL SBI Card",
      missedReward: "₹150",
      icon: "⛽",
    },
  ];

  // Top recommended cards
  const recommendedCards = [
    {
      id: 1,
      name: "HDFC Infinia",
      bank: "HDFC Bank",
      perks: ["5X rewards on dining", "3X on travel", "Airport lounge access"],
      whyThisCard: "Perfect for your dining & travel spending pattern",
      potentialSavings: "₹2,400/month",
      color: "#1e40af",
    },
    {
      id: 2,
      name: "ICICI Amazon Pay",
      bank: "ICICI Bank",
      perks: ["5% on Amazon", "2% on bill payments", "1% on other spends"],
      whyThisCard: "Ideal for your frequent online shopping",
      potentialSavings: "₹1,800/month",
      color: "#3b82f6",
    },
  ];

  const LoaderStyleBreakdown = ({ data }) => {
    const totalMissed = data.reduce((sum, item) => sum + item.amount, 0);

    return (
      <View>
        {/* Total Summary at Top */}
        <View className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 mb-6 border border-red-100">
          <View className="items-center">
            <View className="bg-red-100 rounded-full p-6 mb-4">
              <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                  stroke="#ef4444"
                  strokeWidth="2"
                  fill="#fecaca"
                />
                <Path
                  d="M9 12l2 2 4-4"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text
              className="text-red-600 text-sm mb-2"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Total Missed Rewards
            </Text>
            <Text
              className="text-red-900 text-3xl"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              ₹{totalMissed}
            </Text>
          </View>
        </View>

        {/* Simplified Progress Bars */}
        <View className="space-y-8">
          {data.map((item, index) => {
            const percentage = (item.amount / totalMissed) * 100;
            const gradientColors = {
              Dining: "#3b82f6",
              Travel: "#8b5cf6",
              Shopping: "#06b6d4",
              Fuel: "#10b981",
            };
            const color = gradientColors[item.category] || "#3b82f6";

            return (
              <View
                key={index}
                className="bg-white rounded-xl p-5 border border-gray-100 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {/* Simple Header */}
                <View className="flex-row items-center justify-between mb-3">
                  <Text
                    className="text-gray-900 text-lg"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {item.category}
                  </Text>
                  <Text
                    className="text-gray-900 text-lg"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    ₹{item.amount}
                  </Text>
                </View>

                {/* Simple Progress Bar */}
                <View className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <View
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      borderRadius: 4,
                      backgroundColor: color,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const HorizontalSwipeCards = ({ data }) => {
    // ... existing code ...
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="dark" backgroundColor="#f8fafc" />

      {/* Background floating shapes - positioned absolutely behind all content */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 400 800"
          style={{ position: "absolute" }}
        >
          {/* Floating circles */}
          <Path
            d="M50,200 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0"
            fill="#6366f1"
            opacity="0.05"
          />
          <Path
            d="M320,350 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0"
            fill="#06b6d4"
            opacity="0.04"
          />
          <Path
            d="M80,600 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0"
            fill="#a21caf"
            opacity="0.06"
          />
          <Path
            d="M270,250 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0"
            fill="#10b981"
            opacity="0.04"
          />
          <Path
            d="M150,450 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0"
            fill="#f59e0b"
            opacity="0.05"
          />
          <Path
            d="M370,520 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0"
            fill="#ef4444"
            opacity="0.04"
          />

          {/* Floating stars */}
          <Path
            d="M60,300 L65,285 L70,300 L85,295 L75,305 L85,315 L70,310 L65,325 L60,310 L45,315 L55,305 L45,295 Z"
            fill="#8b5cf6"
            opacity="0.05"
          />
          <Path
            d="M340,180 L343,170 L346,180 L356,177 L349,184 L356,191 L346,188 L343,198 L340,188 L330,191 L337,184 L330,177 Z"
            fill="#06b6d4"
            opacity="0.04"
          />
          <Path
            d="M180,550 L183,540 L186,550 L196,547 L189,554 L196,561 L186,558 L183,568 L180,558 L170,561 L177,554 L170,547 Z"
            fill="#f43f5e"
            opacity="0.05"
          />
          <Path
            d="M300,380 L302,372 L304,380 L312,378 L307,383 L312,388 L304,386 L302,394 L300,386 L292,388 L297,383 L292,378 Z"
            fill="#a21caf"
            opacity="0.04"
          />
        </Svg>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Premium Header with Light Blue Theme */}
        <View style={{ position: "relative", overflow: "hidden" }}>
          <LinearGradient
            colors={["#dbeafe", "#bfdbfe", "#93c5fd"]} // Light blue gradient matching app theme
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingTop: StatusBar.currentHeight || 44,
              paddingBottom: 50,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              minHeight: 260,
            }}
          >
            {/* Light blue-themed background pattern */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                opacity: 0.15,
              }}
            >
              <Svg width="100%" height="100%" viewBox="0 0 400 260">
                {/* Elegant flowing curves */}
                <Path
                  d="M-50,130 Q100,70 250,130 T550,130"
                  stroke="#1e40af"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                />
                <Path
                  d="M-50,170 Q150,110 350,170 T650,170"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.25"
                />
                <Path
                  d="M-100,200 Q200,140 400,200 T700,200"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.2"
                />

                {/* Modern geometric shapes */}
                <Path
                  d="M50,40 L80,40 L90,70 L60,70 Z"
                  fill="#1e40af"
                  opacity="0.15"
                />
                <Path
                  d="M320,30 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0"
                  fill="#2563eb"
                  opacity="0.18"
                />
                <Path
                  d="M120,190 L140,210 L120,230 L100,220 Z"
                  fill="#3b82f6"
                  opacity="0.12"
                />
                <Path
                  d="M350,180 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0"
                  fill="#1e40af"
                  opacity="0.2"
                />

                {/* Additional subtle shapes */}
                <Path
                  d="M150,60 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0"
                  fill="#2563eb"
                  opacity="0.15"
                />
                <Path
                  d="M280,90 L300,90 L305,110 L275,110 Z"
                  fill="#3b82f6"
                  opacity="0.12"
                />
                <Path
                  d="M70,160 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0"
                  fill="#1e40af"
                  opacity="0.18"
                />

                {/* Tech grid pattern - enhanced */}
                <Path
                  d="M200,20 L200,70"
                  stroke="#1e40af"
                  strokeWidth="1.5"
                  opacity="0.12"
                />
                <Path
                  d="M180,40 L220,40"
                  stroke="#1e40af"
                  strokeWidth="1.5"
                  opacity="0.12"
                />
                <Path
                  d="M280,140 L280,190"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  opacity="0.15"
                />
                <Path
                  d="M260,160 L300,160"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  opacity="0.15"
                />

                {/* Additional grid lines */}
                <Path
                  d="M100,80 L100,120"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  opacity="0.1"
                />
                <Path
                  d="M80,100 L120,100"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  opacity="0.1"
                />
                <Path
                  d="M330,60 L330,100"
                  stroke="#2563eb"
                  strokeWidth="1"
                  opacity="0.12"
                />
                <Path
                  d="M310,80 L350,80"
                  stroke="#2563eb"
                  strokeWidth="1"
                  opacity="0.12"
                />

                {/* Diagonal lines for depth */}
                <Path
                  d="M40,50 L80,90"
                  stroke="#1e40af"
                  strokeWidth="1"
                  opacity="0.08"
                />
                <Path
                  d="M360,40 L380,60"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  opacity="0.1"
                />
                <Path
                  d="M160,180 L200,220"
                  stroke="#2563eb"
                  strokeWidth="1"
                  opacity="0.09"
                />

                {/* Scattered dots */}
                <Path
                  d="M250,50 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0"
                  fill="#1e40af"
                  opacity="0.2"
                />
                <Path
                  d="M180,130 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0"
                  fill="#2563eb"
                  opacity="0.15"
                />
                <Path
                  d="M320,120 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0"
                  fill="#3b82f6"
                  opacity="0.18"
                />
              </Svg>
            </View>

            {/* Top Navigation Bar */}
            <View
              className="flex-row items-center justify-between px-6 pt-6 mb-10"
              style={{ zIndex: 2 }}
            >
              <View className="flex-row items-center flex-1">
                <View
                  className="bg-white/60 backdrop-blur-md rounded-2xl p-3 mr-4"
                  style={{
                    shadowColor: "#1e40af",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 4,
                    borderWidth: 1,
                    borderColor: "rgba(30, 64, 175, 0.2)",
                  }}
                >
                  <Image
                    source={require("../assets/logo.png")}
                    style={{
                      width: 32,
                      height: 24,
                      resizeMode: "contain",
                      tintColor: "#1e40af",
                    }}
                  />
                </View>
                <Text
                  className="text-blue-900 text-2xl"
                  style={{
                    fontFamily: "Inter_700Bold",
                    letterSpacing: -0.8,
                    textShadowColor: "rgba(255, 255, 255, 0.8)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  ZashIt
                </Text>
              </View>

              <TouchableOpacity
                className="bg-white/60 backdrop-blur-md rounded-2xl p-4"
                style={{
                  shadowColor: "#1e40af",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 6,
                  borderWidth: 1,
                  borderColor: "rgba(30, 64, 175, 0.2)",
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#1e40af"
                />
                <View
                  className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-3 h-3"
                  style={{
                    shadowColor: "#f97316",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.6,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Enhanced Light Blue-themed Greeting Section */}
            <View className="px-6 mb-8" style={{ zIndex: 2 }}>
              <View className="flex-row items-center mb-6">
                <View
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-4 mr-4"
                  style={{
                    shadowColor: "#1e40af",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.2,
                    shadowRadius: 12,
                    elevation: 8,
                    borderWidth: 1,
                    borderColor: "rgba(30, 64, 175, 0.3)",
                  }}
                >
                  <Text className="text-3xl">🌅</Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-blue-700 text-lg mb-2"
                    style={{
                      fontFamily: "Inter_500Medium",
                      letterSpacing: 0.8,
                      opacity: 0.9,
                      textShadowColor: "rgba(255, 255, 255, 0.6)",
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}
                  >
                    Good morning,
                  </Text>
                  <Text
                    className="text-blue-900 text-4xl"
                    style={{
                      fontFamily: "Inter_700Bold",
                      letterSpacing: -1.2,
                      textShadowColor: "rgba(255, 255, 255, 0.8)",
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 4,
                      lineHeight: 44,
                    }}
                  >
                    Devansh
                  </Text>
                </View>
              </View>

              {/* Missed Rewards Alert in Header - Light Blue Theme */}
              <View
                className="bg-white/50 backdrop-blur-md rounded-2xl p-6"
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(30, 64, 175, 0.2)",
                  shadowColor: "#1e40af",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.15,
                  shadowRadius: 20,
                  elevation: 12,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View
                      className="bg-orange-100 rounded-xl p-3 mr-4"
                      style={{
                        shadowColor: "#f97316",
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 4,
                        borderWidth: 1,
                        borderColor: "rgba(249, 115, 22, 0.3)",
                      }}
                    >
                      <Text className="text-2xl">💸</Text>
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-blue-900 text-lg mb-1"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: 0.3,
                          textShadowColor: "rgba(255, 255, 255, 0.6)",
                          textShadowOffset: { width: 0, height: 1 },
                          textShadowRadius: 2,
                        }}
                      >
                        Missed Rewards
                      </Text>
                      <Text
                        className="text-blue-600 text-sm"
                        style={{
                          fontFamily: "Inter_400Regular",
                          letterSpacing: 0.2,
                          opacity: 0.8,
                        }}
                      >
                        last month
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text
                      className="text-blue-900 text-4xl mb-2"
                      style={{
                        fontFamily: "Inter_700Bold",
                        letterSpacing: -1,
                        textShadowColor: "rgba(255, 255, 255, 0.8)",
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 4,
                      }}
                    >
                      ₹{totalMissed}
                    </Text>
                    <View
                      className="bg-orange-200 rounded-lg px-4 py-2"
                      style={{
                        borderWidth: 1,
                        borderColor: "rgba(249, 115, 22, 0.4)",
                        shadowColor: "#f97316",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                      }}
                    >
                      <Text
                        className="text-orange-700 text-sm"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: 0.3,
                        }}
                      >
                        OPTIMIZE
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Light blue-themed transition effect */}
          <LinearGradient
            colors={["rgba(147, 197, 253, 0.6)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              position: "absolute",
              bottom: -20,
              left: 0,
              right: 0,
              height: 40,
              zIndex: 1,
            }}
          />
        </View>

        {/* Content with Better Spacing */}
        <View style={{ marginTop: -20, paddingTop: 20 }}>
          {/* Enhanced Missed Rewards Breakdown */}
          <View className="px-2 pt-10">
            <Text
              className="text-blue-900 text-2xl mb-8 px-4"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.5,
                textShadowColor: "rgba(29, 78, 216, 0.05)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Missed Rewards Breakdown
            </Text>

            <View
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 32,
                marginBottom: 40,
                marginHorizontal: 4,
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 20,
                elevation: 12,
              }}
            >
              {/* Enhanced blue gradient background */}
              <LinearGradient
                colors={["#e0e7ff", "#f0fdfa", "#f3e8ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 32,
                }}
              />
              {/* Enhanced geometric pattern overlay */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 140,
                  opacity: 0.08,
                }}
              >
                <Svg width="100%" height={140} viewBox="0 0 400 140">
                  <Path
                    d="M0,70 Q100,30 200,70 T400,70"
                    stroke="#1d4ed8"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <Path
                    d="M0,100 Q100,60 200,100 T400,100"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <Path
                    d="M60 40 h80 v8 h-80z"
                    fill="#3b82f6"
                    opacity="0.12"
                    rx="4"
                  />
                  <Path
                    d="M280 110 h60 v6 h-60z"
                    fill="#1e40af"
                    opacity="0.10"
                    rx="3"
                  />
                  <Path
                    d="M150,50 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0"
                    fill="#2563eb"
                    opacity="0.08"
                  />
                </Svg>
              </View>
              {/* Enhanced card content */}
              <View className="p-2" style={{ position: "relative", zIndex: 1 }}>
                <LoaderStyleBreakdown data={missedRewardsData} />
              </View>
            </View>
          </View>

          {/* Enhanced Recent Transactions */}
          <View className="px-6 pt-6">
            <Text
              className="text-blue-900 text-2xl mb-8"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.5,
                textShadowColor: "rgba(29, 78, 216, 0.05)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Frequent Transactions
            </Text>

            <View className="space-y-8">
              {frequentTransactions.map((transaction) => (
                <TouchableOpacity
                  key={transaction.id}
                  onPress={() =>
                    navigation.navigate("TransactionDetail", { transaction })
                  }
                  className="bg-white p-6 rounded-2xl border border-blue-50"
                  style={{
                    shadowColor: "#3b82f6",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 6,
                    marginBottom: 12,
                  }}
                >
                  <View className="flex-row items-center mb-5">
                    <View
                      className="w-16 h-16 rounded-2xl items-center justify-center mr-5"
                      style={{
                        backgroundColor: transaction.isOptimal
                          ? "#dcfce7"
                          : "#fef2f2",
                        shadowColor: transaction.isOptimal
                          ? "#10b981"
                          : "#ef4444",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Text className="text-3xl">{transaction.icon}</Text>
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-center justify-between">
                        <Text
                          className="text-slate-900 text-xl mb-2"
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            letterSpacing: -0.3,
                          }}
                        >
                          {transaction.merchant}
                        </Text>
                        <Text
                          className="text-slate-900 text-xl"
                          style={{
                            fontFamily: "Inter_700Bold",
                            letterSpacing: -0.3,
                          }}
                        >
                          {transaction.amount}
                        </Text>
                      </View>

                      <View className="flex-row items-center justify-end">
                        <Text
                          className="text-slate-500 text-base"
                          style={{ fontFamily: "Inter_500Medium" }}
                        >
                          {transaction.cardUsed}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Enhanced Reward Status */}
                  <View
                    className="p-5 rounded-2xl"
                    style={{
                      backgroundColor: transaction.isOptimal
                        ? "#f0fdf4"
                        : "#fef2f2",
                      borderWidth: 1,
                      borderColor: transaction.isOptimal
                        ? "#bbf7d0"
                        : "#fecaca",
                    }}
                  >
                    {transaction.isOptimal ? (
                      <View className="flex-row items-center">
                        <View
                          className="rounded-full p-3 mr-4"
                          style={{
                            backgroundColor: "#10b981",
                            shadowColor: "#10b981",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 2,
                          }}
                        >
                          <Ionicons name="checkmark" size={16} color="white" />
                        </View>
                        <Text
                          className="text-green-700 text-lg flex-1"
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            letterSpacing: -0.2,
                          }}
                        >
                          Earned {transaction.earnedReward} in rewards
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center">
                        <View
                          className="rounded-full p-3 mr-4"
                          style={{
                            backgroundColor: "#ef4444",
                            shadowColor: "#ef4444",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 2,
                          }}
                        >
                          <Ionicons name="alert" size={16} color="white" />
                        </View>
                        <View className="flex-1">
                          <Text
                            className="text-red-700 text-lg mb-2"
                            style={{
                              fontFamily: "Inter_600SemiBold",
                              letterSpacing: -0.2,
                            }}
                          >
                            Missed {transaction.missedReward} in rewards
                          </Text>
                          <Text
                            className="text-red-600/80 text-base"
                            style={{ fontFamily: "Inter_500Medium" }}
                          >
                            Use {transaction.betterCard} next time
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Enhanced Recommended Cards */}
          <View className="px-6 pt-12 pb-8">
            <Text
              className="text-blue-900 text-2xl mb-10"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.5,
                textShadowColor: "rgba(29, 78, 216, 0.05)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Recommended for You
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mx-[-24px]"
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingRight: 48,
              }}
            >
              {recommendedCards.map((card, index) => (
                <TouchableOpacity
                  key={card.id}
                  className="mr-6"
                  style={{ width: width * 0.85 }}
                  onPress={() => navigation.navigate("CardDetail", { card })}
                >
                  <View
                    className="bg-white p-8 rounded-3xl border border-blue-50"
                    style={{
                      shadowColor: "#3b82f6",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.12,
                      shadowRadius: 20,
                      elevation: 10,
                      minHeight: 280,
                    }}
                  >
                    {/* Enhanced Card Header */}
                    <View className="flex-row items-center justify-between mb-6">
                      <View className="flex-1">
                        <Text
                          className="text-blue-600 text-base mb-2"
                          style={{
                            fontFamily: "Inter_500Medium",
                            letterSpacing: 0.2,
                          }}
                        >
                          {card.bank}
                        </Text>
                        <Text
                          className="text-blue-900 text-xl"
                          style={{
                            fontFamily: "Inter_700Bold",
                            letterSpacing: -0.3,
                            lineHeight: 28,
                          }}
                        >
                          {card.name}
                        </Text>
                      </View>
                      <View
                        style={{ backgroundColor: "#dbeafe" }}
                        className="w-14 h-14 rounded-xl items-center justify-center"
                      >
                        <Ionicons name="card" size={28} color="#2563eb" />
                      </View>
                    </View>

                    {/* Enhanced Card Benefits */}
                    <View className="mb-6">
                      {card.perks.map((perk, idx) => (
                        <View key={idx} className="flex-row items-center mb-4">
                          <View
                            style={{ backgroundColor: "#dbeafe" }}
                            className="w-7 h-7 rounded-full items-center justify-center mr-4"
                          >
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color="#2563eb"
                            />
                          </View>
                          <Text
                            className="text-blue-800 text-base flex-1"
                            style={{
                              fontFamily: "Inter_500Medium",
                              letterSpacing: 0.1,
                              lineHeight: 22,
                            }}
                          >
                            {perk}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Enhanced Why This Card */}
                    <View
                      style={{ backgroundColor: "#f0f9ff" }}
                      className="p-5 rounded-xl mb-6 border border-blue-100"
                    >
                      <Text
                        className="text-blue-700 text-base"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: 0.1,
                          lineHeight: 22,
                        }}
                      >
                        {card.whyThisCard}
                      </Text>
                    </View>

                    {/* Enhanced Potential Savings */}
                    <View className="flex-row items-center justify-between">
                      <Text
                        className="text-blue-700 text-base"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: 0.1,
                        }}
                      >
                        Potential Savings
                      </Text>
                      <Text
                        className="text-xl"
                        style={{
                          fontFamily: "Inter_700Bold",
                          color: "#2563eb",
                          letterSpacing: -0.3,
                        }}
                      >
                        {card.potentialSavings}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Home" />
    </SafeAreaView>
  );
}
