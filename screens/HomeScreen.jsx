import React, { useState, useEffect } from "react";
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
import { useAuth } from "../context/AuthContext";
import { apiCalls } from "../utils/api";
import api from "../utils/api";
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
  const { user, logout } = useAuth();
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [frequentTransactions, setFrequentTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Fetch recommended cards
  const fetchRecommendedCards = async () => {
    try {
      console.log("🔍 Fetching recommended cards...");
      const { data } = await api.get(
        "/financial-data/credit-cards/recommended"
      );
      console.log("✅ Recommended cards API response:", data);

      if (data.code === 200 && data.data.recommendedCards) {
        // Take only first 2 cards as requested
        const cards = data.data.recommendedCards
          .slice(0, 2)
          .map((card, index) => ({
            id: card.id,
            name: card.cardName,
            bank: card.issuer, // Bank name (issuer)
            perks: card.features || [card.rewardRate], // Features as perks
            whyThisCard: card.description,
            potentialSavings: index === 0 ? "₹2,400/month" : "₹1,800/month", // Static potential savings
            annualFeeWaiver:
              card.annualFeeWaiver || `Annual fee: ₹${card.annualFee}`,
            color: index === 0 ? "#1e40af" : "#3b82f6",
          }));
        setRecommendedCards(cards);
      }
    } catch (error) {
      console.error("❌ Error fetching recommended cards:", error);
      // Fallback to static data if API fails
      setRecommendedCards([
        {
          id: 1,
          name: "HDFC Infinia",
          bank: "HDFC Bank",
          perks: [
            "5X rewards on dining",
            "3X on travel",
            "Airport lounge access",
          ],
          whyThisCard: "Perfect for your dining & travel spending pattern",
          potentialSavings: "₹2,400/month",
          annualFeeWaiver: "Annual fee waived on ₹4L annual spend",
          color: "#1e40af",
        },
        {
          id: 2,
          name: "ICICI Amazon Pay",
          bank: "ICICI Bank",
          perks: ["5% on Amazon", "2% on bill payments", "1% on other spends"],
          whyThisCard: "Ideal for your frequent online shopping",
          potentialSavings: "₹1,800/month",
          annualFeeWaiver: "No annual fee",
          color: "#3b82f6",
        },
      ]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Fetch frequent transactions
  const fetchFrequentTransactions = async () => {
    try {
      console.log("🔍 Fetching frequent transactions...");
      const { data } = await api.get("/financial-data/transactions/frequent");
      console.log("✅ Frequent transactions API response:", data);

      if (data.code === 200 && data.data.frequentMerchants) {
        // Get category icon mapping
        const getCategoryIcon = (category) => {
          const iconMap = {
            transportation: "🚗",
            dining: "🍔",
            shopping: "📦",
            fuel: "⛽",
            groceries: "🛒",
            entertainment: "🎬",
            utilities: "💡",
          };
          return iconMap[category.toLowerCase()] || "💳";
        };

        // Take only first 4 transactions as requested
        const transactions = data.data.frequentMerchants
          .slice(0, 4)
          .map((merchant, index) => ({
            id: index + 1,
            merchant: merchant.merchantName,
            category:
              merchant.category.charAt(0).toUpperCase() +
              merchant.category.slice(1),
            amount: `₹${Math.round(merchant.totalAmount)}`, // Using totalAmount
            cardUsed: "SBI Platinum", // Static as requested
            isOptimal: index % 2 === 1, // Alternate for variety
            betterCard: "HDFC Swiggy Card", // Static as requested
            missedReward: `₹${Math.round(merchant.totalAmount * 0.1)}`, // Static calculation
            earnedReward:
              index % 2 === 1
                ? `₹${Math.round(merchant.totalAmount * 0.05)}`
                : null,
            icon: getCategoryIcon(merchant.category),
          }));
        setFrequentTransactions(transactions);
      }
    } catch (error) {
      console.error("❌ Error fetching frequent transactions:", error);
      // Fallback to static data if API fails
      setFrequentTransactions([
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
        {
          id: 4,
          merchant: "Rapido",
          category: "Transportation",
          amount: "₹450",
          cardUsed: "SBI Platinum",
          isOptimal: true,
          earnedReward: "₹22",
          icon: "🚗",
        },
      ]);
    } finally {
      setLoadingTransactions(false);
    }
  };

  // Test API call function
  const testApiCall = async () => {
    try {
      console.log("🧪 Testing API call...");
      const response = await apiCalls.getUserProfile();
      console.log("✅ API Response:", response.data);
    } catch (error) {
      console.log("❌ API Error:", error.message);
      console.log("🔍 Error details:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchRecommendedCards();
    fetchFrequentTransactions();
  }, []);

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

  const LoaderStyleBreakdown = ({ data }) => {
    const totalMissed = data.reduce((sum, item) => sum + item.amount, 0);

    return (
      <View>
        {/* Total Summary at Top */}
        <View
          className="bg-white rounded-3xl p-8 mb-8 border border-gray-100"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 15,
          }}
        >
          <View className="items-center">
            {/* Blue Gradient Icon Container */}
            <LinearGradient
              colors={["#3b82f6", "#1d4ed8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 50,
                padding: 24,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <Path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeOpacity="0.4"
                />
              </Svg>
            </LinearGradient>

            {/* Title with elegant styling */}
            <Text
              className="text-gray-600 text-sm mb-3"
              style={{
                fontFamily: "Inter_500Medium",
                letterSpacing: 0.8,
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Missed Cashback
            </Text>

            {/* Amount with dramatic styling */}
            <View className="items-center">
              <Text
                className="text-gray-900 mb-2"
                style={{
                  fontFamily: "Inter_900Black",
                  fontSize: 42,
                  letterSpacing: -2,
                  textShadowColor: "rgba(0, 0, 0, 0.1)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                ₹{totalMissed}
              </Text>
              <Text
                className="text-blue-500 text-sm"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  letterSpacing: 0.5,
                  opacity: 0.8,
                }}
              >
                last month
              </Text>
            </View>

            {/* Decorative elements */}
            <View
              className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-200"
              style={{ opacity: 0.6 }}
            />
            <View
              className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-blue-300"
              style={{ opacity: 0.5 }}
            />
            <View
              className="absolute top-8 left-6 w-1 h-1 rounded-full bg-blue-400"
              style={{ opacity: 0.7 }}
            />
          </View>
        </View>

        {/* Simplified Progress Bars */}
        <View className="space-y-6">
          {data.map((item, index) => {
            const percentage = (item.amount / totalMissed) * 100;
            const color = "#3b82f6"; // All bars use blue color

            return (
              <View
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {/* Enhanced Header with Context */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <Text className="text-2xl mr-3">{item.icon}</Text>
                    <View>
                      <Text
                        className="text-gray-900 text-base"
                        style={{ fontFamily: "Inter_600SemiBold" }}
                      >
                        {item.category}
                      </Text>
                      <Text
                        className="text-gray-500 text-xs"
                        style={{ fontFamily: "Inter_400Regular" }}
                      >
                        Cashback missed
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text
                      className="text-gray-900 text-lg"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      ₹{item.amount}
                    </Text>
                    <Text
                      className="text-blue-600 text-xs"
                      style={{ fontFamily: "Inter_500Medium" }}
                    >
                      {percentage.toFixed(0)}% of total
                    </Text>
                  </View>
                </View>

                {/* Simple Progress Bar */}
                <View className="bg-gray-100 rounded-full h-3 overflow-hidden">
                  <View
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      borderRadius: 6,
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

            {/* Creative Curved White Lines Behind Header Elements */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                opacity: 0.35,
              }}
            >
              <Svg width="100%" height="100%" viewBox="0 0 400 260">
                {/* Elegant flowing curves - main focal curves */}
                <Path
                  d="M-20,80 Q80,40 160,80 Q240,120 320,80 Q360,60 420,80"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="1"
                />
                <Path
                  d="M-20,100 Q60,60 140,100 Q220,140 300,100 Q380,60 420,100"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.8"
                />
                <Path
                  d="M-20,120 Q100,80 200,120 Q300,160 400,120"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.6"
                />

                {/* Swirling decorative curves around header area */}
                <Path
                  d="M50,60 Q90,20 130,60 Q170,100 210,60"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.7"
                />
                <Path
                  d="M250,70 Q290,30 330,70 Q370,110 410,70"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.6"
                />

                {/* Circular flowing patterns */}
                <Path
                  d="M80,50 Q120,10 160,50 Q200,90 240,50 Q280,10 320,50"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.8"
                />
                <Path
                  d="M60,90 Q100,50 140,90 Q180,130 220,90 Q260,50 300,90"
                  stroke="white"
                  strokeWidth="0.6"
                  fill="none"
                  opacity="0.6"
                />

                {/* Vertical flowing lines */}
                <Path
                  d="M30,40 Q50,80 30,120 Q10,160 30,200"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.5"
                />
                <Path
                  d="M370,30 Q390,70 370,110 Q350,150 370,190"
                  stroke="white"
                  strokeWidth="0.6"
                  fill="none"
                  opacity="0.4"
                />

                {/* Interconnected curves */}
                <Path
                  d="M100,40 Q150,80 200,40 Q250,80 300,40"
                  stroke="white"
                  strokeWidth="0.7"
                  fill="none"
                  opacity="0.7"
                />
                <Path
                  d="M80,110 Q130,70 180,110 Q230,150 280,110"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.5"
                />

                {/* Spiral-like decorative elements */}
                <Path
                  d="M350,40 Q340,50 350,60 Q360,50 350,40"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.8"
                />
                <Path
                  d="M70,110 Q60,120 70,130 Q80,120 70,110"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.6"
                />

                {/* Background accent curves */}
                <Path
                  d="M-10,140 Q100,100 210,140 Q320,180 430,140"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.5"
                />
                <Path
                  d="M-10,160 Q80,120 170,160 Q260,200 350,160 Q380,140 410,160"
                  stroke="white"
                  strokeWidth="0.4"
                  fill="none"
                  opacity="0.4"
                />
              </Svg>
            </View>

            {/* Top Navigation Bar */}
            <View
              className="flex-row items-center justify-between px-6 pt-8 mb-8"
              style={{ zIndex: 2 }}
            >
              <View className="flex-row items-center">
                <Text
                  className="text-blue-900 text-base mr-4"
                  style={{
                    fontFamily: "Inter_700Bold",
                    letterSpacing: -1.2,
                    textShadowColor: "rgba(255, 255, 255, 0.8)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 4,
                    lineHeight: 44,
                  }}
                >
                  {user?.name || "Guest"}
                </Text>
                <View
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-4"
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
                  <Text className="text-base">👋</Text>
                </View>
              </View>

              <View className="flex-row space-x-3">
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

                <TouchableOpacity
                  onPress={testApiCall}
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
                  <Ionicons name="flask-outline" size={24} color="#1e40af" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={logout}
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
                  <Ionicons name="log-out-outline" size={24} color="#1e40af" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Missed Rewards Card */}
            <View className="px-6 mb-8" style={{ zIndex: 2 }}>
              <View
                className="bg-white rounded-2xl p-8"
                style={{
                  borderWidth: 2,
                  borderColor: "#ffffff",
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
                      className="bg-white rounded-xl p-4 mr-4"
                      style={{
                        shadowColor: "#f97316",
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 4,
                        borderWidth: 2,
                        borderColor: "#ffffff",
                      }}
                    >
                      <Text className="text-base">💸</Text>
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-blue-900 text-base mb-2"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: 0.3,
                        }}
                      >
                        Missed Cashback
                      </Text>
                      <Text
                        className="text-blue-600 text-base"
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
                      className="text-blue-950 text-2xl"
                      style={{
                        fontFamily: "Inter_900Black",
                        letterSpacing: -1.5,
                        fontSize: 28,
                        fontWeight: "900",
                        textShadowColor: "rgba(30, 64, 175, 0.2)",
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 4,
                      }}
                    >
                      ₹{totalMissed}
                    </Text>
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
        <View style={{ marginTop: -20, paddingTop: 32 }}>
          {/* Enhanced Missed Rewards Breakdown */}
          <View className="px-6 pt-16">
            <View className="p-6">
              <LoaderStyleBreakdown data={missedRewardsData} />
            </View>
          </View>

          {/* Enhanced Frequent Transactions */}
          <View className="px-6 pt-8">
            <Text
              className="text-blue-900 text-base mb-8"
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

            <View className="mx-2">
              {frequentTransactions.map((transaction, index) => (
                <TouchableOpacity
                  key={transaction.id}
                  className="bg-white rounded-2xl p-8 border border-gray-100 mb-8"
                  style={{
                    shadowColor: "#1e40af",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 6,
                  }}
                  onPress={() =>
                    navigation.navigate("TransactionDetail", { transaction })
                  }
                >
                  <View className="flex-row items-center mb-6">
                    <View
                      className="bg-blue-50 rounded-xl p-4 mr-4"
                      style={{
                        shadowColor: "#3b82f6",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Text className="text-base">{transaction.icon}</Text>
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-slate-900 text-base mb-2"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: 0.2,
                        }}
                      >
                        {transaction.merchant}
                      </Text>
                      <View className="flex-row items-center justify-between">
                        <Text
                          className="text-slate-900 text-base"
                          style={{
                            fontFamily: "Inter_700Bold",
                            letterSpacing: -0.3,
                          }}
                        >
                          {transaction.amount}
                        </Text>
                      </View>
                      <Text
                        className="text-slate-500 text-base"
                        style={{
                          fontFamily: "Inter_400Regular",
                          letterSpacing: 0.1,
                          marginTop: 4,
                        }}
                      >
                        {transaction.cardUsed}
                      </Text>
                    </View>
                  </View>

                  {/* Optimization Status */}
                  <View
                    className={`rounded-xl p-6 ${
                      transaction.isOptimal
                        ? "bg-green-50 border border-green-100"
                        : "bg-blue-50 border border-blue-100"
                    }`}
                    style={{
                      shadowColor: transaction.isOptimal
                        ? "#10b981"
                        : "#3b82f6",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.06,
                      shadowRadius: 6,
                      elevation: 2,
                    }}
                  >
                    {transaction.isOptimal ? (
                      <Text
                        className="text-green-700 text-base flex-1"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: 0.2,
                        }}
                      >
                        ✅ Optimal card used! Earned {transaction.earnedReward}
                      </Text>
                    ) : (
                      <View>
                        <Text
                          className="text-blue-700 text-base mb-3"
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            letterSpacing: 0.2,
                          }}
                        >
                          ⚠️ Suboptimal card choice
                        </Text>
                        <Text
                          className="text-blue-600/80 text-base"
                          style={{
                            fontFamily: "Inter_400Regular",
                            letterSpacing: 0.1,
                            lineHeight: 20,
                          }}
                        >
                          Use {transaction.betterCard} next time to earn{" "}
                          {transaction.missedReward} more rewards
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recommended Cards Section */}
          <View className="px-6 py-12">
            <Text
              className="text-blue-900 text-lg mb-8"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.5,
                textAlign: "center",
              }}
            >
              Recommended Cards for You
            </Text>

            {loadingRecommendations ? (
              <View className="items-center justify-center py-8">
                <Text
                  className="text-gray-500 text-base"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Loading recommendations...
                </Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mx-[-16px]"
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingRight: 32,
                }}
              >
                {recommendedCards.map((card, index) => (
                  <View
                    key={card.id}
                    className="bg-white rounded-3xl p-8 border border-gray-100 mr-8"
                    style={{
                      width: width * 0.85,
                      shadowColor: "#1e40af",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.1,
                      shadowRadius: 20,
                      elevation: 10,
                    }}
                  >
                    <View className="mb-8">
                      <Text
                        className="text-blue-600 text-sm mb-2"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: 0.3,
                          opacity: 0.8,
                        }}
                      >
                        {card.bank}
                      </Text>
                      <Text
                        className="text-blue-900 text-lg"
                        style={{
                          fontFamily: "Inter_700Bold",
                          letterSpacing: -0.5,
                          lineHeight: 28,
                        }}
                      >
                        {card.name}
                      </Text>
                    </View>

                    {/* Card Benefits */}
                    <View className="space-y-4 mb-8">
                      {card.perks.map((perk, perkIndex) => (
                        <View key={perkIndex} className="flex-row items-center">
                          <View
                            className="bg-blue-100 rounded-full w-2 h-2 mr-4"
                            style={{ opacity: 0.8 }}
                          />
                          <Text
                            className="text-blue-800 text-base flex-1"
                            style={{
                              fontFamily: "Inter_400Regular",
                              letterSpacing: 0.2,
                              lineHeight: 22,
                            }}
                          >
                            {perk}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Why This Card, Savings & Annual Fee Waiver */}
                    <View className="space-y-4">
                      <Text
                        className="text-blue-700 text-base"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: 0.2,
                          lineHeight: 22,
                        }}
                      >
                        {card.whyThisCard}
                      </Text>
                      <Text
                        className="text-blue-700 text-base"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: 0.2,
                        }}
                      >
                        Potential savings: {card.potentialSavings}
                      </Text>
                      <Text
                        className="text-blue-600 text-sm"
                        style={{
                          fontFamily: "Inter_500Medium",
                          letterSpacing: 0.2,
                          opacity: 0.8,
                        }}
                      >
                        {card.annualFeeWaiver}
                      </Text>
                    </View>

                    {/* Apply Button */}
                    <TouchableOpacity
                      className="bg-blue-600 rounded-2xl py-4 px-8 mt-8"
                      style={{
                        shadowColor: "#2563eb",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 6,
                      }}
                    >
                      <Text
                        className="text-white text-base text-center"
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          letterSpacing: 0.3,
                        }}
                      >
                        Learn More
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Footer spacing for bottom navigation */}
          <View style={{ height: 32 }} />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="home" />
    </SafeAreaView>
  );
}
