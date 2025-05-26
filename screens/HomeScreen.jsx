import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
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

  // Recent transactions with optimization status
  const recentTransactions = [
    {
      id: 1,
      name: "Amazon",
      category: "Shopping",
      date: "Today, 2:30 PM",
      amount: "₹3,240",
      icon: "🛍️",
      optimized: true,
      cardUsed: "HDFC Regalia",
      savedAmount: "₹324",
      missedAmount: null,
      rewardRate: "3.3%",
    },
    {
      id: 2,
      name: "Swiggy",
      category: "Food & Dining",
      date: "Today, 1:15 PM",
      amount: "₹850",
      icon: "🍔",
      optimized: false,
      cardUsed: "SBI Platinum",
      savedAmount: null,
      missedAmount: "₹85",
      betterCard: "Zomato RBL Card",
      potentialReward: "10%",
    },
    {
      id: 3,
      name: "BookMyShow",
      category: "Entertainment",
      date: "Yesterday, 7:45 PM",
      amount: "₹1,200",
      icon: "🎬",
      optimized: true,
      cardUsed: "ICICI Amazon Pay",
      savedAmount: "₹120",
      missedAmount: null,
      rewardRate: "10%",
    },
  ];

  // Recommended credit cards
  const recommendedCards = [
    {
      id: 1,
      name: "HDFC Infinia",
      bank: "HDFC Bank",
      perks: [
        "5X rewards on dining",
        "3X on online shopping",
        "Airport lounge access",
      ],
      potentialSavings: "₹18,500",
      annualFee: "₹12,500",
      rating: 4.8,
      trustScore: 95,
      matchReason: "Perfect for your dining spending",
    },
    {
      id: 2,
      name: "ICICI Amazon Pay",
      bank: "ICICI Bank",
      perks: ["5% on Amazon", "2% on bill payments", "1% on other spends"],
      potentialSavings: "₹12,200",
      annualFee: "₹500",
      rating: 4.6,
      trustScore: 92,
      matchReason: "Great for your online shopping",
    },
  ];

  const totalMissedSavings = recentTransactions
    .filter((t) => !t.optimized && t.missedAmount)
    .reduce(
      (sum, t) =>
        sum + parseInt(t.missedAmount.replace("₹", "").replace(",", "")),
      0
    );

  const optimizedTransactions = recentTransactions.filter(
    (t) => t.optimized
  ).length;
  const totalTransactions = recentTransactions.length;
  const optimizationPercentage = Math.round(
    (optimizedTransactions / totalTransactions) * 100
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" backgroundColor="#f9fafb" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Clean Header */}
        <View className="px-6 py-6 bg-white">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center flex-1">
              <View className="w-14 h-14 rounded-2xl mr-4 overflow-hidden bg-blue-50 border-2 border-blue-100">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                  }}
                  className="w-full h-full"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-gray-500 text-base mb-1"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Good morning,
                </Text>
                <Text
                  className="text-gray-900 text-xl"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  Devansh Sharma
                </Text>
              </View>
            </View>

            <View className="flex-row items-center space-x-3">
              <TouchableOpacity className="bg-blue-50 rounded-2xl p-3">
                <Ionicons name="search" size={22} color="#2563eb" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-blue-600 rounded-2xl p-3 relative">
                <Ionicons name="notifications" size={22} color="white" />
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                  <Text
                    className="text-white text-xs"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    3
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Balance Overview Card */}
          <LinearGradient
            colors={["#1e40af", "#2563eb", "#3b82f6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 relative overflow-hidden"
            style={{
              shadowColor: "#1e40af",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 15,
            }}
          >
            <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
            <View className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-3xl rotate-45" />

            <View className="relative z-10">
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text
                    className="text-blue-100 text-sm mb-2"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    Total Potential Savings
                  </Text>
                  <Text
                    className="text-white text-4xl mb-1"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    ₹24,680
                  </Text>
                  <Text
                    className="text-blue-200 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    This month with AI optimization
                  </Text>
                </View>
                <View className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm">
                  <Ionicons name="trending-up" size={28} color="white" />
                </View>
              </View>

              <View className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-white text-base"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Optimization Score
                  </Text>
                  <Text
                    className="text-white text-xl"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    {optimizationPercentage}%
                  </Text>
                </View>
                <View className="bg-white/20 rounded-full h-2 mt-3">
                  <View
                    className="bg-white rounded-full h-2"
                    style={{ width: `${optimizationPercentage}%` }}
                  />
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View className="px-6 py-6">
          <Text
            className="text-gray-900 text-xl mb-4"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            Quick Actions
          </Text>

          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              className="bg-white rounded-2xl p-5 flex-1 mr-3"
              style={{
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <View className="bg-blue-50 rounded-2xl p-4 mb-4 self-start">
                <Ionicons name="card" size={24} color="#2563eb" />
              </View>
              <Text
                className="text-gray-900 text-base mb-1"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Find Best Card
              </Text>
              <Text
                className="text-gray-500 text-sm"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Get AI recommendations
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-2xl p-5 flex-1 ml-3"
              style={{
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <View className="bg-amber-50 rounded-2xl p-4 mb-4 self-start">
                <Ionicons name="warning" size={24} color="#f59e0b" />
              </View>
              <Text
                className="text-gray-900 text-base mb-1"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Money Leaks
              </Text>
              <Text
                className="text-gray-500 text-sm"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Fix spending issues
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="text-gray-900 text-xl"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Recent Transactions
            </Text>
            <TouchableOpacity>
              <Text
                className="text-blue-600 text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            {recentTransactions.slice(0, 4).map((transaction, index) => (
              <View
                key={transaction.id}
                className="bg-white rounded-2xl p-4"
                style={{
                  shadowColor: "#1e40af",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <View className="flex-row items-center">
                  <View className="bg-gray-50 rounded-2xl p-3 mr-4">
                    <Text className="text-2xl">{transaction.icon}</Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text
                        className="text-gray-900 text-base"
                        style={{ fontFamily: "Inter_600SemiBold" }}
                      >
                        {transaction.name}
                      </Text>
                      <Text
                        className="text-gray-900 text-base"
                        style={{ fontFamily: "Inter_700Bold" }}
                      >
                        {transaction.amount}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Text
                          className="text-gray-500 text-sm mr-3"
                          style={{ fontFamily: "Inter_400Regular" }}
                        >
                          {transaction.category}
                        </Text>
                        {transaction.optimized ? (
                          <View className="bg-green-50 rounded-full px-2 py-1">
                            <Text
                              className="text-green-600 text-xs"
                              style={{ fontFamily: "Inter_500Medium" }}
                            >
                              Optimized
                            </Text>
                          </View>
                        ) : (
                          <View className="bg-red-50 rounded-full px-2 py-1">
                            <Text
                              className="text-red-600 text-xs"
                              style={{ fontFamily: "Inter_500Medium" }}
                            >
                              -{transaction.missedAmount}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text
                        className="text-gray-400 text-sm"
                        style={{ fontFamily: "Inter_400Regular" }}
                      >
                        {transaction.date.split(",")[0]}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Cards */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text
                className="text-gray-900 text-xl"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                Smart Card Recommendations
              </Text>
              <Text
                className="text-gray-500 text-sm mt-1"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Cards that could maximize your rewards
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                className="text-blue-600 text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-blue-50 rounded-2xl p-4 mb-4 border border-blue-100">
            <View className="flex-row items-center">
              <Ionicons name="bulb" size={20} color="#2563eb" />
              <Text
                className="text-blue-700 text-sm ml-2 flex-1"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                We suggest these cards based on your spending habits to help you
                earn more rewards
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {recommendedCards.map((card, index) => (
              <View key={card.id} className={`${index > 0 ? "ml-4" : ""} w-72`}>
                <LinearGradient
                  colors={["#1e40af", "#2563eb", "#3b82f6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{
                    shadowColor: "#1e40af",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 12,
                  }}
                >
                  <View className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />

                  <View className="relative z-10">
                    <View className="flex-row items-center justify-between mb-4">
                      <View className="flex-1">
                        <Text
                          className="text-white text-lg mb-1"
                          style={{ fontFamily: "Inter_700Bold" }}
                        >
                          {card.name}
                        </Text>
                        <Text
                          className="text-blue-200 text-sm"
                          style={{ fontFamily: "Inter_500Medium" }}
                        >
                          {card.bank}
                        </Text>
                        <Text
                          className="text-blue-100 text-xs mt-1"
                          style={{ fontFamily: "Inter_400Regular" }}
                        >
                          {card.matchReason}
                        </Text>
                      </View>
                      <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2">
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text
                          className="text-white text-sm ml-1"
                          style={{ fontFamily: "Inter_600SemiBold" }}
                        >
                          {card.rating}
                        </Text>
                      </View>
                    </View>

                    <View className="mb-4">
                      <Text
                        className="text-blue-100 text-xs mb-2"
                        style={{ fontFamily: "Inter_500Medium" }}
                      >
                        ESTIMATED YEARLY SAVINGS
                      </Text>
                      <Text
                        className="text-white text-2xl"
                        style={{ fontFamily: "Inter_700Bold" }}
                      >
                        {card.potentialSavings}
                      </Text>
                      <Text
                        className="text-blue-200 text-xs"
                        style={{ fontFamily: "Inter_400Regular" }}
                      >
                        based on your spending pattern
                      </Text>
                    </View>

                    <View className="mb-5">
                      <Text
                        className="text-blue-100 text-xs mb-3"
                        style={{ fontFamily: "Inter_500Medium" }}
                      >
                        KEY BENEFITS
                      </Text>
                      {card.perks.slice(0, 2).map((perk, perkIndex) => (
                        <View
                          key={perkIndex}
                          className="flex-row items-center mb-2"
                        >
                          <View className="bg-green-400/20 rounded-full p-1 mr-3">
                            <Ionicons
                              name="checkmark"
                              size={12}
                              color="#a3e635"
                            />
                          </View>
                          <Text
                            className="text-white text-sm flex-1"
                            style={{ fontFamily: "Inter_400Regular" }}
                          >
                            {perk}
                          </Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity className="bg-white rounded-xl py-3 px-6 flex-row items-center justify-center">
                      <Ionicons
                        name="information-circle"
                        size={18}
                        color="#1e40af"
                      />
                      <Text
                        className="text-blue-600 text-base ml-2"
                        style={{ fontFamily: "Inter_700Bold" }}
                      >
                        Learn More
                      </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200"
        style={{
          shadowColor: "#1e40af",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 20,
        }}
      >
        <View className="flex-row justify-around py-4 px-6">
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-blue-600 rounded-2xl items-center justify-center mb-2">
              <Ionicons name="home" size={20} color="white" />
            </View>
            <Text
              className="text-blue-600 text-xs"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mb-2">
              <Ionicons name="wallet" size={20} color="#6b7280" />
            </View>
            <Text
              className="text-gray-500 text-xs"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Cards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mb-2">
              <Ionicons name="bar-chart" size={20} color="#6b7280" />
            </View>
            <Text
              className="text-gray-500 text-xs"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Analytics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => navigation.navigate("Profile")}
          >
            <View className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mb-2">
              <Ionicons name="person" size={20} color="#6b7280" />
            </View>
            <Text
              className="text-gray-500 text-xs"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
