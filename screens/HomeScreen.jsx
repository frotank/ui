import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
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
    { category: "Dining", amount: 450, color: "#2563eb", icon: "🍽️" },
    { category: "Travel", amount: 380, color: "#1d4ed8", icon: "✈️" },
    { category: "Shopping", amount: 250, color: "#3b82f6", icon: "🛍️" },
    { category: "Fuel", amount: 120, color: "#60a5fa", icon: "⛽" },
  ];

  const totalMissed = missedRewardsData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Recent transactions with optimization status
  const recentTransactions = [
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
      date: "Today, 2:30 PM",
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
      date: "Today, 11:15 AM",
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
      date: "Yesterday, 6:45 PM",
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

  const PieChart = ({ data, size = 140 }) => {
    let cumulativePercentage = 0;

    return (
      <View className="items-center justify-center">
        <View
          style={{ width: size, height: size }}
          className="rounded-full relative overflow-hidden"
        >
          {data.map((item, index) => {
            const percentage = (item.amount / totalMissed) * 100;
            const startAngle = (cumulativePercentage / 100) * 360;
            cumulativePercentage += percentage;

            return (
              <View
                key={index}
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  backgroundColor: item.color,
                  transform: [{ rotate: `${startAngle}deg` }],
                }}
                className="rounded-full"
              />
            );
          })}
        </View>
        <View
          className="bg-white rounded-full items-center justify-center"
          style={{
            position: "absolute",
            width: size * 0.7,
            height: size * 0.7,
            shadowColor: "#1e40af",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text
            className="text-slate-900 text-2xl"
            style={{
              fontFamily: "Inter_700Bold",
              textShadowColor: "#0001",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          >
            ₹{totalMissed}
          </Text>
          <Text
            className="text-slate-500 text-xs"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            total missed
          </Text>
        </View>
      </View>
    );
  };

  const RewardBreakdownItem = ({ item }) => (
    <View
      className="flex-row items-center justify-between bg-white/90 p-5 rounded-2xl mb-4 border border-blue-100/50"
      style={{
        shadowColor: "#1e40af",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center mr-4"
          style={{
            backgroundColor: `${item.color}20`,
            shadowColor: item.color,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text className="text-2xl">{item.icon}</Text>
        </View>
        <View>
          <Text
            className="text-slate-900 text-lg mb-1"
            style={{
              fontFamily: "Inter_600SemiBold",
              letterSpacing: -0.3,
            }}
          >
            {item.category}
          </Text>
          <Text
            className="text-slate-500 text-sm"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            ₹{item.amount} missed
          </Text>
        </View>
      </View>
      <View
        className="h-10 px-4 rounded-full items-center justify-center"
        style={{ backgroundColor: `${item.color}15` }}
      >
        <Text
          className="text-sm font-semibold"
          style={{
            fontFamily: "Inter_600SemiBold",
            color: item.color,
          }}
        >
          {Math.round((item.amount / totalMissed) * 100)}%
        </Text>
      </View>
    </View>
  );

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
        {/* Header with Branding, Greeting, and Notification */}
        <View
          className="px-0 pt-0 pb-12"
          style={{
            backgroundColor: "transparent",
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            overflow: "hidden",
          }}
        >
          {/* Enhanced Blue Gradient Background with Geometric Shapes */}
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 200,
              zIndex: 0,
            }}
          >
            <LinearGradient
              colors={["#dbeafe", "#bfdbfe", "#93c5fd"]} // soft blue gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ width: "100%", height: 200 }}
            >
              {/* Enhanced geometric background shapes */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 200,
                  opacity: 0.12,
                }}
              >
                <Svg width="100%" height={200} viewBox="0 0 400 200">
                  {/* Primary wave */}
                  <Path
                    d="M0,80 Q100,30 200,80 T400,80"
                    stroke="#1d4ed8"
                    strokeWidth="3"
                    fill="none"
                  />
                  {/* Secondary wave */}
                  <Path
                    d="M0,120 Q150,70 300,120 T600,120"
                    stroke="#2563eb"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Floating rectangles */}
                  <Path d="M50 40 h80 v6 h-80z" fill="#3b82f6" opacity="0.15" />
                  <Path
                    d="M280 140 h60 v4 h-60z"
                    fill="#1e40af"
                    opacity="0.12"
                    rx="2"
                  />
                  <Path
                    d="M320 60 h40 v8 h-40z"
                    fill="#2563eb"
                    opacity="0.18"
                    rx="4"
                  />
                  {/* Geometric circles */}
                  <Path
                    d="M120,45 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0"
                    fill="#60a5fa"
                    opacity="0.15"
                  />
                  <Path
                    d="M300,160 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0"
                    fill="#3b82f6"
                    opacity="0.12"
                  />
                  <Path
                    d="M80,140 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0"
                    fill="#1d4ed8"
                    opacity="0.10"
                  />
                  {/* Abstract lines */}
                  <Path
                    d="M180 20 L220 35"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    opacity="0.15"
                  />
                  <Path
                    d="M150 170 L190 155"
                    stroke="#1e40af"
                    strokeWidth="1"
                    opacity="0.12"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </View>

          {/* Enhanced Top Row: Logo and Notification */}
          <View
            className="flex-row items-center justify-between px-6 pt-10 mb-8"
            style={{ zIndex: 1 }}
          >
            <View className="flex-row items-center flex-1">
              <Image
                source={require("../assets/logo.png")}
                style={{
                  width: 54,
                  height: 38,
                  resizeMode: "contain",
                  marginRight: 12,
                }}
              />
              <Text
                className="text-blue-900 text-2xl"
                style={{
                  fontFamily: "Inter_700Bold",
                  letterSpacing: -0.5,
                  textShadowColor: "rgba(59, 130, 246, 0.1)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                ZashIt
              </Text>
            </View>
            <TouchableOpacity
              className="bg-white/90 backdrop-blur-md rounded-full p-4 border border-blue-100"
              style={{
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#1d4ed8"
              />
            </TouchableOpacity>
          </View>

          {/* Enhanced Greeting */}
          <View className="px-6 mb-10" style={{ zIndex: 1 }}>
            <Text
              className="text-blue-700 text-base mb-2"
              style={{
                fontFamily: "Inter_500Medium",
                opacity: 0.8,
                letterSpacing: 0.2,
              }}
            >
              Good morning,
            </Text>
            <Text
              className="text-blue-900 text-3xl"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.8,
                textShadowColor: "rgba(29, 78, 216, 0.1)",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 6,
              }}
            >
              Devansh
            </Text>
          </View>

          {/* Enhanced Rewards Alert with Blue Theme */}
          <View className="px-6" style={{ zIndex: 1 }}>
            <LinearGradient
              colors={["#1e40af", "#2563eb", "#3b82f6"]} // rich blue gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-3xl p-6"
              style={{
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.25,
                shadowRadius: 24,
                elevation: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle geometric overlay */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  opacity: 0.08,
                }}
              >
                <Svg width="100%" height={80} viewBox="0 0 400 80">
                  <Path
                    d="M0,50 Q100,20 200,40 Q300,60 400,30"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="none"
                  />
                  <Path
                    d="M320 40 h40 v6 h-40z"
                    fill="#ffffff"
                    opacity="0.12"
                    rx="3"
                  />
                  <Path
                    d="M80,25 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0"
                    fill="#ffffff"
                    opacity="0.08"
                  />
                </Svg>
              </View>
              <View style={{ position: "relative", zIndex: 1 }}>
                <View className="flex-row items-center mb-5">
                  <View className="bg-white/20 backdrop-blur-md rounded-2xl p-3 mr-4">
                    <Text className="text-3xl">💫</Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-white text-xl leading-6 mb-1"
                      style={{
                        fontFamily: "Inter_700Bold",
                        letterSpacing: -0.5,
                      }}
                    >
                      ₹{totalMissed} rewards missed
                    </Text>
                    <Text
                      className="text-white/90 text-sm leading-5"
                      style={{
                        fontFamily: "Inter_500Medium",
                        letterSpacing: 0.2,
                      }}
                    >
                      last month
                    </Text>
                  </View>
                </View>
                <Text
                  className="text-white/95 text-sm leading-6 bg-white/15 backdrop-blur-md p-4 rounded-2xl"
                  style={{ fontFamily: "Inter_500Medium", letterSpacing: 0.1 }}
                >
                  Let's optimize your spending this month for better rewards! 🎯
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Missed Rewards Breakdown */}
        <View className="px-6 pt-10">
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
            Missed Rewards Breakdown
          </Text>

          <View
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 32,
              marginBottom: 40,
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 20,
              elevation: 12,
            }}
          >
            {/* Enhanced blue gradient background */}
            <LinearGradient
              colors={["#dbeafe", "#bfdbfe", "#93c5fd"]}
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
            <View className="p-7" style={{ position: "relative", zIndex: 1 }}>
              <View className="items-center mb-8">
                <PieChart data={missedRewardsData} />
              </View>
              <View>
                {missedRewardsData.map((item, index) => (
                  <RewardBreakdownItem key={index} item={item} />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Enhanced Recent Transactions */}
        <View className="px-6">
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
            Recent Transactions
          </Text>

          <View className="space-y-5">
            {recentTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() =>
                  navigation.navigate("TransactionDetail", { transaction })
                }
                className="bg-white p-5 rounded-2xl border border-blue-50"
                style={{
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <View className="flex-row items-center mb-4">
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
                        className="text-slate-900 text-lg mb-1"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: -0.3,
                        }}
                      >
                        {transaction.merchant}
                      </Text>
                      <Text
                        className="text-slate-900 text-lg"
                        style={{
                          fontFamily: "Inter_700Bold",
                          letterSpacing: -0.3,
                        }}
                      >
                        {transaction.amount}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <Text
                        className="text-slate-500 text-sm"
                        style={{ fontFamily: "Inter_500Medium" }}
                      >
                        {transaction.date}
                      </Text>
                      <Text
                        className="text-slate-500 text-sm"
                        style={{ fontFamily: "Inter_500Medium" }}
                      >
                        {transaction.cardUsed}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Enhanced Reward Status */}
                <View
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: transaction.isOptimal
                      ? "#f0fdf4"
                      : "#fef2f2",
                    borderWidth: 1,
                    borderColor: transaction.isOptimal ? "#bbf7d0" : "#fecaca",
                  }}
                >
                  {transaction.isOptimal ? (
                    <View className="flex-row items-center">
                      <View
                        className="rounded-full p-2 mr-3"
                        style={{
                          backgroundColor: "#10b981",
                          shadowColor: "#10b981",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 2,
                        }}
                      >
                        <Ionicons name="checkmark" size={14} color="white" />
                      </View>
                      <Text
                        className="text-green-700 text-base flex-1"
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
                        className="rounded-full p-2 mr-3"
                        style={{
                          backgroundColor: "#ef4444",
                          shadowColor: "#ef4444",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 2,
                        }}
                      >
                        <Ionicons name="alert" size={14} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-red-700 text-base mb-1"
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            letterSpacing: -0.2,
                          }}
                        >
                          Missed {transaction.missedReward} in rewards
                        </Text>
                        <Text
                          className="text-red-600/80 text-sm"
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
        <View className="px-6 pt-10 pb-6">
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
            Recommended for You
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mx-[-24px] px-6"
          >
            {recommendedCards.map((card, index) => (
              <TouchableOpacity
                key={card.id}
                className="mr-5 w-[300px]"
                onPress={() => navigation.navigate("CardDetail", { card })}
              >
                <View
                  className="bg-white p-6 rounded-3xl border border-blue-50"
                  style={{
                    shadowColor: "#3b82f6",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 20,
                    elevation: 10,
                  }}
                >
                  {/* Enhanced Card Header */}
                  <View className="flex-row items-center justify-between mb-5">
                    <View>
                      <Text
                        className="text-blue-600 text-sm mb-1"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: 0.2,
                        }}
                      >
                        {card.bank}
                      </Text>
                      <Text
                        className="text-blue-900 text-lg"
                        style={{
                          fontFamily: "Inter_700Bold",
                          letterSpacing: -0.3,
                        }}
                      >
                        {card.name}
                      </Text>
                    </View>
                    <View
                      style={{ backgroundColor: "#dbeafe" }}
                      className="w-12 h-12 rounded-xl items-center justify-center"
                    >
                      <Ionicons name="card" size={24} color="#2563eb" />
                    </View>
                  </View>

                  {/* Enhanced Card Benefits */}
                  <View className="mb-5">
                    {card.perks.map((perk, idx) => (
                      <View key={idx} className="flex-row items-center mb-3">
                        <View
                          style={{ backgroundColor: "#dbeafe" }}
                          className="w-6 h-6 rounded-full items-center justify-center mr-3"
                        >
                          <Ionicons
                            name="checkmark"
                            size={14}
                            color="#2563eb"
                          />
                        </View>
                        <Text
                          className="text-blue-800 text-sm flex-1"
                          style={{
                            fontFamily: "Inter_500Medium",
                            letterSpacing: 0.1,
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
                    className="p-4 rounded-xl mb-5 border border-blue-100"
                  >
                    <Text
                      className="text-blue-700 text-sm"
                      style={{
                        fontFamily: "Inter_500Medium",
                        letterSpacing: 0.1,
                      }}
                    >
                      {card.whyThisCard}
                    </Text>
                  </View>

                  {/* Enhanced Potential Savings */}
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-blue-700 text-sm"
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        letterSpacing: 0.1,
                      }}
                    >
                      Potential Savings
                    </Text>
                    <Text
                      className="text-lg"
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
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Home" />
    </SafeAreaView>
  );
}
