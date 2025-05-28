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
          style={{
            shadowColor: "#1e40af",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 8,
          }}
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
          className="bg-white rounded-full items-center justify-center"
          style={{
            shadowColor: "#1e40af",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
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
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#f8fafc" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Enhanced Header with Creative Background */}
        <View
          className="px-0 pt-0 pb-12"
          style={{
            backgroundColor: "transparent",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            overflow: "hidden",
          }}
        >
          {/* Premium Gradient Background with Creative Elements */}
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 200,
              zIndex: 0,
            }}
          >
            <LinearGradient
              colors={["#dbeafe", "#bfdbfe", "#93c5fd"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ width: "100%", height: 200 }}
            >
              {/* Creative SVG Background with Stars and Lines */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 200,
                  opacity: 0.25,
                }}
              >
                <Svg width="100%" height={200} viewBox="0 0 400 200">
                  {/* Flowing lines */}
                  <Path
                    d="M0,100 Q100,50 200,100 T400,100"
                    stroke="#1e40af"
                    strokeWidth="2"
                    fill="none"
                  />
                  <Path
                    d="M0,130 Q150,80 300,130 T400,130"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* Stars */}
                  <Polygon
                    points="80,40 84,52 96,52 87,60 91,72 80,65 69,72 73,60 64,52 76,52"
                    fill="#1e40af"
                    opacity="0.6"
                  />
                  <Polygon
                    points="320,160 323,168 331,168 325,173 328,181 320,177 312,181 315,173 309,168 317,168"
                    fill="#2563eb"
                    opacity="0.5"
                  />
                  <Polygon
                    points="150,170 152,176 158,176 154,180 156,186 150,183 144,186 146,180 142,176 148,176"
                    fill="#60a5fa"
                    opacity="0.7"
                  />

                  {/* Geometric shapes */}
                  <Circle cx="350" cy="50" r="8" fill="#3b82f6" opacity="0.3" />
                  <Circle cx="50" cy="160" r="5" fill="#1d4ed8" opacity="0.4" />

                  {/* Abstract rectangles */}
                  <Path
                    d="M250 30 h40 v15 h-40z"
                    fill="#2563eb"
                    opacity="0.2"
                  />
                  <Path
                    d="M120 180 h25 v8 h-25z"
                    fill="#1e40af"
                    opacity="0.3"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </View>

          {/* Enhanced Top Row: Logo and Notification */}
          <View
            className="flex-row items-center justify-between px-8 pt-12 mb-8"
            style={{ zIndex: 1 }}
          >
            <View className="flex-row items-center flex-1">
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  shadowColor: "#1e40af",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <Text className="text-2xl">💳</Text>
              </View>
              <Text
                className="text-slate-900 text-3xl"
                style={{
                  fontFamily: "Inter_700Bold",
                  letterSpacing: -1,
                  textShadowColor: "#0002",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                ZashIt
              </Text>
            </View>
            <TouchableOpacity
              className="rounded-2xl p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#1e40af"
              />
            </TouchableOpacity>
          </View>

          {/* Enhanced Greeting Section */}
          <View className="px-8 mb-10" style={{ zIndex: 1 }}>
            <Text
              className="text-slate-600 text-lg mb-2"
              style={{
                fontFamily: "Inter_500Medium",
                letterSpacing: -0.2,
                textShadowColor: "#0001",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Good morning,
            </Text>
            <Text
              className="text-slate-900 text-4xl"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -1.5,
                textShadowColor: "#0003",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 6,
              }}
            >
              Devansh
            </Text>
          </View>

          {/* Enhanced Rewards Alert Card */}
          <View className="px-8" style={{ zIndex: 1 }}>
            <View
              style={{
                borderRadius: 28,
                overflow: "hidden",
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 16 },
                shadowOpacity: 0.2,
                shadowRadius: 32,
                elevation: 16,
              }}
            >
              <LinearGradient
                colors={["#1e40af", "#2563eb", "#3b82f6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-8"
              >
                {/* Subtle background pattern */}
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                  }}
                >
                  <Svg width="100%" height="100%" viewBox="0 0 400 120">
                    <Circle cx="350" cy="20" r="15" fill="#fff" />
                    <Circle cx="50" cy="100" r="10" fill="#fff" />
                    <Polygon
                      points="300,80 303,88 311,88 305,93 308,101 300,97 292,101 295,93 289,88 297,88"
                      fill="#fff"
                    />
                  </Svg>
                </View>

                <View style={{ position: "relative", zIndex: 1 }}>
                  <View className="flex-row items-center mb-6">
                    <View
                      className="rounded-3xl p-4 mr-5"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Text className="text-4xl">💫</Text>
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-white text-2xl leading-7 mb-2"
                        style={{
                          fontFamily: "Inter_700Bold",
                          letterSpacing: -0.8,
                          textShadowColor: "#0004",
                          textShadowOffset: { width: 0, height: 2 },
                          textShadowRadius: 4,
                        }}
                      >
                        ₹{totalMissed} rewards missed
                      </Text>
                      <Text
                        className="text-blue-100 text-base"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: -0.2,
                        }}
                      >
                        last month
                      </Text>
                    </View>
                  </View>
                  <View
                    className="p-5 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Text
                      className="text-white text-base leading-6"
                      style={{
                        fontFamily: "Inter_500Medium",
                        letterSpacing: -0.2,
                      }}
                    >
                      Let's optimize your spending this month for better
                      rewards! 🎯
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Enhanced Missed Rewards Breakdown */}
        <View className="px-8 pt-10">
          <Text
            className="text-slate-900 text-2xl mb-8"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.8,
              textShadowColor: "#0001",
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
              shadowColor: "#1e40af",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.12,
              shadowRadius: 24,
              elevation: 12,
            }}
          >
            {/* Enhanced gradient background */}
            <LinearGradient
              colors={["#f8fafc", "#f1f5f9", "#e2e8f0"]}
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

            {/* Subtle pattern overlay */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 120,
                opacity: 0.08,
              }}
            >
              <Svg width="100%" height={120} viewBox="0 0 400 120">
                <Path
                  d="M0,60 Q100,20 200,60 T400,60"
                  stroke="#1e40af"
                  strokeWidth="2"
                  fill="none"
                />
                <Path
                  d="M0,90 Q100,50 200,90 T400,90"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  fill="none"
                />
                <Circle cx="80" cy="30" r="3" fill="#2563eb" />
                <Circle cx="320" cy="100" r="2" fill="#1e40af" />
              </Svg>
            </View>

            {/* Enhanced card content */}
            <View className="p-8" style={{ position: "relative", zIndex: 1 }}>
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
        <View className="px-8">
          <Text
            className="text-slate-900 text-2xl mb-8"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.8,
              textShadowColor: "#0001",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
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
                className="bg-white/95 p-6 rounded-3xl"
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(30, 64, 175, 0.08)",
                  shadowColor: "#1e40af",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 16,
                  elevation: 4,
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
        <View className="px-8 pt-10 pb-6">
          <Text
            className="text-slate-900 text-2xl mb-8"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.8,
              textShadowColor: "#0001",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          >
            Recommended for You
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mx-[-32px] px-8"
          >
            {recommendedCards.map((card, index) => (
              <TouchableOpacity
                key={card.id}
                className="mr-6 w-[320px]"
                onPress={() => navigation.navigate("CardDetail", { card })}
              >
                <LinearGradient
                  colors={[card.color, "#3b82f6", "#60a5fa"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-8 rounded-3xl"
                  style={{
                    shadowColor: card.color,
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.25,
                    shadowRadius: 32,
                    elevation: 16,
                  }}
                >
                  {/* Background pattern */}
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.1,
                    }}
                  >
                    <Svg width="100%" height="100%" viewBox="0 0 320 200">
                      <Circle cx="280" cy="30" r="20" fill="#fff" />
                      <Circle cx="40" cy="160" r="15" fill="#fff" />
                      <Polygon
                        points="250,140 253,148 261,148 255,153 258,161 250,157 242,161 245,153 239,148 247,148"
                        fill="#fff"
                      />
                    </Svg>
                  </View>

                  {/* Card Header */}
                  <View
                    className="flex-row items-center justify-between mb-6"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <View>
                      <Text
                        className="text-blue-100 text-base mb-2"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: -0.2,
                        }}
                      >
                        {card.bank}
                      </Text>
                      <Text
                        className="text-white text-xl"
                        style={{
                          fontFamily: "Inter_700Bold",
                          letterSpacing: -0.5,
                        }}
                      >
                        {card.name}
                      </Text>
                    </View>
                    <View
                      className="w-14 h-14 rounded-2xl items-center justify-center"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Ionicons name="card" size={28} color="#fff" />
                    </View>
                  </View>

                  {/* Card Benefits */}
                  <View
                    className="mb-6"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    {card.perks.map((perk, idx) => (
                      <View key={idx} className="flex-row items-center mb-3">
                        <View
                          className="w-8 h-8 rounded-full items-center justify-center mr-4"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 1,
                          }}
                        >
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        </View>
                        <Text
                          className="text-white text-base flex-1"
                          style={{
                            fontFamily: "Inter_500Medium",
                            letterSpacing: -0.2,
                          }}
                        >
                          {perk}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Why This Card */}
                  <View
                    className="p-5 rounded-2xl mb-6"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Text
                      className="text-blue-100 text-sm"
                      style={{
                        fontFamily: "Inter_500Medium",
                        letterSpacing: -0.1,
                      }}
                    >
                      {card.whyThisCard}
                    </Text>
                  </View>

                  {/* Potential Savings */}
                  <View
                    className="flex-row items-center justify-between"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <Text
                      className="text-blue-100 text-base"
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        letterSpacing: -0.2,
                      }}
                    >
                      Potential Savings
                    </Text>
                    <Text
                      className="text-white text-xl"
                      style={{
                        fontFamily: "Inter_700Bold",
                        letterSpacing: -0.5,
                      }}
                    >
                      {card.potentialSavings}
                    </Text>
                  </View>
                </LinearGradient>
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
