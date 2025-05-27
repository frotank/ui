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
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Svg, { Path } from "react-native-svg";

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
    { category: "Dining", amount: 450, color: "#f43f5e", icon: "🍽️" },
    { category: "Travel", amount: 380, color: "#8b5cf6", icon: "✈️" },
    { category: "Shopping", amount: 250, color: "#06b6d4", icon: "🛍️" },
    { category: "Fuel", amount: 120, color: "#10b981", icon: "⛽" },
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
      color: "#dc2626",
    },
    {
      id: 2,
      name: "ICICI Amazon Pay",
      bank: "ICICI Bank",
      perks: ["5% on Amazon", "2% on bill payments", "1% on other spends"],
      whyThisCard: "Ideal for your frequent online shopping",
      potentialSavings: "₹1,800/month",
      color: "#2563eb",
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
          style={{
            position: "absolute",
            width: size * 0.7,
            height: size * 0.7,
          }}
          className="bg-white rounded-full items-center justify-center shadow-lg"
        >
          <Text
            className="text-slate-900 text-2xl"
            style={{ fontFamily: "Inter_700Bold" }}
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
    <View className="flex-row items-center justify-between bg-white p-4 rounded-2xl mb-3 border border-slate-100">
      <View className="flex-row items-center flex-1">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
          style={{
            backgroundColor: `${item.color}15`,
          }}
        >
          <Text className="text-xl">{item.icon}</Text>
        </View>
        <View>
          <Text
            className="text-slate-900 text-base mb-0.5"
            style={{ fontFamily: "Inter_600SemiBold" }}
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
        className="h-8 px-3 rounded-lg items-center justify-center"
        style={{ backgroundColor: `${item.color}15` }}
      >
        <Text
          className="text-sm"
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8fafc"
        translucent={true}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header with Branding, Greeting, and Notification */}
        <View
          className="px-0 pt-0 pb-10"
          style={{
            backgroundColor: "transparent",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: "hidden",
          }}
        >
          {/* Glassy Gradient Background with SVG Accent */}
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 180,
              zIndex: 0,
            }}
          >
            <LinearGradient
              colors={["#dbeafe", "#bae6fd", "#f0f9ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ width: "100%", height: 180 }}
            >
              {/* SVG fintech accent (wave + shapes) */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 180,
                  opacity: 0.18,
                }}
              >
                <Svg width="100%" height={180} viewBox="0 0 400 180">
                  {/* Wavy line */}
                  <Path
                    d="M0,80 Q100,30 200,80 T400,80"
                    stroke="#6366f1"
                    strokeWidth="3"
                    fill="none"
                  />
                  {/* Rectangle shapes */}
                  <Path
                    d="M40 30 h60 v20 h-60z"
                    fill="#a5b4fc"
                    opacity="0.25"
                  />
                  <Path
                    d="M320 120 h30 v12 h-30z"
                    fill="#06b6d4"
                    opacity="0.18"
                  />
                  {/* Circle shapes */}
                  <Path
                    d="M120,50 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0"
                    fill="#fbbf24"
                    opacity="0.18"
                  />
                  <Path
                    d="M280,150 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0"
                    fill="#a21caf"
                    opacity="0.13"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </View>

          {/* Top Row: Logo and Notification */}
          <View
            className="flex-row items-center justify-between px-6 pt-8 mb-6"
            style={{ zIndex: 1 }}
          >
            <View className="flex-row items-center flex-1">
              <Image
                source={require("../assets/logo.png")}
                style={{
                  width: 54,
                  height: 38,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
              />
              <Text
                className="text-black text-2xl"
                style={{
                  fontFamily: "Inter_700Bold",
                  letterSpacing: -0.5,
                  textShadowColor: "#0006",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 8,
                }}
              >
                ZashIt
              </Text>
            </View>
            <TouchableOpacity
              className="bg-white/20 backdrop-blur-md rounded-full p-3.5 border border-white/30"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View className="px-6 mb-8" style={{ zIndex: 1 }}>
            <Text
              className="text-black/80 text-base mb-1"
              style={{
                fontFamily: "Inter_500Medium",
                opacity: 0.95,
                textShadowColor: "#0004",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 4,
              }}
            >
              Good morning,
            </Text>
            <Text
              className="text-black text-3xl"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.5,
                textShadowColor: "#0006",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 8,
              }}
            >
              Devansh
            </Text>
          </View>

          {/* USP - Missed Rewards Alert (kept, but glassy) */}
          <View className="px-6" style={{ zIndex: 1 }}>
            <LinearGradient
              colors={["#e0f2fe", "#60a5fa", "#fff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.7 }}
              className="rounded-3xl p-6 backdrop-blur-lg"
              style={{
                shadowColor: "#e0e7ff",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.18,
                shadowRadius: 25,
                elevation: 20,
                backgroundColor: "rgba(224, 231, 255, 0.85)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* SVG accent for extra creativity */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 60,
                  opacity: 0.13,
                }}
              >
                <Svg width="100%" height={60} viewBox="0 0 400 60">
                  <Path
                    d="M0,40 Q100,10 200,30 Q300,50 400,20"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <Path
                    d="M320 30 h30 v8 h-30z"
                    fill="#06b6d4"
                    opacity="0.18"
                  />
                  <Path
                    d="M120,20 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0"
                    fill="#a21caf"
                    opacity="0.13"
                  />
                </Svg>
              </View>
              <View style={{ position: "relative", zIndex: 1 }}>
                <View className="flex-row items-center mb-4">
                  <View className="bg-white/30 backdrop-blur-md rounded-2xl p-3 mr-4">
                    <Text className="text-3xl">💫</Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-black text-xl leading-6 mb-1"
                      style={{
                        fontFamily: "Inter_700Bold",
                        letterSpacing: -0.5,
                      }}
                    >
                      ₹{totalMissed} rewards missed
                    </Text>
                    <Text
                      className="text-black/80 text-sm leading-5"
                      style={{ fontFamily: "Inter_500Medium" }}
                    >
                      last month
                    </Text>
                  </View>
                </View>
                <Text
                  className="text-black/90 text-sm leading-5 bg-white/40 backdrop-blur-md p-3 rounded-xl"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Let's optimize your spending this month for better rewards! 🎯
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Missed Rewards Breakdown */}
        <View className="px-6 pt-8">
          <Text
            className="text-slate-900 text-xl mb-6"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            Missed Rewards Breakdown
          </Text>

          <View
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 28,
              marginBottom: 32,
            }}
          >
            {/* Gradient background */}
            <LinearGradient
              colors={["#e0f2fe", "#60a5fa", "#fff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.7 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 28,
              }}
            />
            {/* SVG line pattern overlay */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 120,
                opacity: 0.18,
              }}
            >
              <Svg width="100%" height={120} viewBox="0 0 400 120">
                <Path
                  d="M0,60 Q100,20 200,60 T400,60"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  fill="none"
                />
                <Path
                  d="M0,90 Q100,50 200,90 T400,90"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  fill="none"
                />
                <Path
                  d="M0,30 Q100,-10 200,30 T400,30"
                  stroke="#a21caf"
                  strokeWidth="1"
                  fill="none"
                />
              </Svg>
            </View>
            {/* Card content */}
            <View className="p-6" style={{ position: "relative", zIndex: 1 }}>
              <View className="items-center mb-6">
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

        {/* Recent Transactions */}
        <View className="px-6">
          <Text
            className="text-slate-900 text-xl mb-6"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            Recent Transactions
          </Text>

          <View className="space-y-4">
            {recentTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() =>
                  navigation.navigate("TransactionDetail", { transaction })
                }
                className="bg-white p-4 rounded-2xl border border-slate-100"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center mb-3">
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                    style={{
                      backgroundColor: transaction.isOptimal
                        ? "#bbf7d0"
                        : "#fee2e2",
                    }}
                  >
                    <Text className="text-2xl">{transaction.icon}</Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className="text-slate-900 text-base mb-1"
                        style={{ fontFamily: "Inter_600SemiBold" }}
                      >
                        {transaction.merchant}
                      </Text>
                      <Text
                        className="text-slate-900 text-base"
                        style={{ fontFamily: "Inter_700Bold" }}
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

                {/* Reward Status */}
                <View
                  className="p-3 rounded-xl"
                  style={{
                    backgroundColor: transaction.isOptimal
                      ? "#f0fdf4"
                      : "#fef2f2",
                  }}
                >
                  {transaction.isOptimal ? (
                    <View className="flex-row items-center">
                      <View className="bg-green-400 rounded-full p-1 mr-2">
                        <Ionicons name="checkmark" size={12} color="white" />
                      </View>
                      <Text
                        className="text-green-700 text-sm flex-1"
                        style={{ fontFamily: "Inter_600SemiBold" }}
                      >
                        Earned {transaction.earnedReward} in rewards
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center">
                      <View className="bg-red-400 rounded-full p-1 mr-2">
                        <Ionicons name="alert" size={12} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-red-700 text-sm mb-0.5"
                          style={{ fontFamily: "Inter_600SemiBold" }}
                        >
                          Missed {transaction.missedReward} in rewards
                        </Text>
                        <Text
                          className="text-red-600/80 text-xs"
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

        {/* Recommended Cards */}
        <View className="px-6 pt-8 pb-4">
          <Text
            className="text-slate-900 text-xl mb-6"
            style={{ fontFamily: "Inter_700Bold" }}
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
                className="mr-4 w-[300px]"
                onPress={() => navigation.navigate("CardDetail", { card })}
              >
                <View
                  className="bg-white p-5 rounded-3xl border border-slate-100"
                  style={{
                    shadowColor: card.color,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.15,
                    shadowRadius: 24,
                    elevation: 8,
                  }}
                >
                  {/* Card Header */}
                  <View className="flex-row items-center justify-between mb-4">
                    <View>
                      <Text
                        className="text-slate-500 text-sm mb-1"
                        style={{ fontFamily: "Inter_500Medium" }}
                      >
                        {card.bank}
                      </Text>
                      <Text
                        className="text-slate-900 text-lg"
                        style={{ fontFamily: "Inter_700Bold" }}
                      >
                        {card.name}
                      </Text>
                    </View>
                    <View
                      style={{ backgroundColor: `${card.color}15` }}
                      className="w-12 h-12 rounded-xl items-center justify-center"
                    >
                      <Ionicons name="card" size={24} color={card.color} />
                    </View>
                  </View>

                  {/* Card Benefits */}
                  <View className="mb-4">
                    {card.perks.map((perk, idx) => (
                      <View key={idx} className="flex-row items-center mb-2">
                        <View
                          style={{ backgroundColor: `${card.color}15` }}
                          className="w-6 h-6 rounded-full items-center justify-center mr-3"
                        >
                          <Ionicons
                            name="checkmark"
                            size={14}
                            color={card.color}
                          />
                        </View>
                        <Text
                          className="text-slate-600 text-sm flex-1"
                          style={{ fontFamily: "Inter_500Medium" }}
                        >
                          {perk}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Why This Card */}
                  <View
                    style={{ backgroundColor: `${card.color}08` }}
                    className="p-3 rounded-xl mb-4"
                  >
                    <Text
                      className="text-slate-600 text-sm"
                      style={{ fontFamily: "Inter_500Medium" }}
                    >
                      {card.whyThisCard}
                    </Text>
                  </View>

                  {/* Potential Savings */}
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-slate-600 text-sm"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      Potential Savings
                    </Text>
                    <Text
                      className="text-lg"
                      style={{
                        fontFamily: "Inter_700Bold",
                        color: card.color,
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
