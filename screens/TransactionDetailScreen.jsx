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
        {/* Enhanced Amount Card */}
        <View className="px-6 pt-8 pb-6">
          <View style={{ position: "relative", overflow: "hidden" }}>
            <LinearGradient
              colors={["#eff6ff", "#dbeafe", "#bfdbfe"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 24,
                padding: 32,
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.15,
                shadowRadius: 32,
                elevation: 12,
              }}
            >
              {/* Background Creative Shapes */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.08,
                }}
              >
                <Svg width="100%" height="160" viewBox="0 0 350 160">
                  <Polygon
                    points="280,20 285,35 300,35 288,45 293,60 280,50 267,60 272,45 260,35 275,35"
                    fill="#3b82f6"
                  />
                  <Circle cx="50" cy="130" r="12" fill="#2563eb" />
                  <Path
                    d="M0,80 Q175,40 350,80"
                    stroke="#1e40af"
                    strokeWidth="2"
                    fill="none"
                  />
                </Svg>
              </View>

              <View
                className="items-center"
                style={{ position: "relative", zIndex: 1 }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    shadowColor: "#3b82f6",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 4,
                  }}
                >
                  <Text className="text-5xl">{transaction.icon}</Text>
                </View>

                <Text
                  className="text-blue-600 text-base mb-2"
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    letterSpacing: 0.5,
                  }}
                >
                  AMOUNT SPENT
                </Text>
                <Text
                  className="text-blue-900 mb-3"
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 48,
                    letterSpacing: -2,
                  }}
                >
                  {transaction.amount}
                </Text>
                <Text
                  className="text-blue-700 text-lg"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {transaction.name}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Potential Savings Card */}
        <View className="px-6 pb-6">
          <View style={{ position: "relative", overflow: "hidden" }}>
            <LinearGradient
              colors={["#1e40af", "#2563eb", "#3b82f6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 24,
                padding: 32,
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 16 },
                shadowOpacity: 0.25,
                shadowRadius: 40,
                elevation: 16,
              }}
            >
              {/* Background Creative Elements */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.12,
                }}
              >
                <Svg width="100%" height="200" viewBox="0 0 350 200">
                  <Polygon
                    points="50,40 55,55 70,55 58,65 63,80 50,70 37,80 42,65 30,55 45,55"
                    fill="#fff"
                  />
                  <Polygon
                    points="280,150 283,160 293,160 285,166 288,176 280,170 272,176 275,166 267,160 277,160"
                    fill="#fff"
                  />
                  <Circle cx="320" cy="60" r="10" fill="#fff" />
                  <Path
                    d="M0,120 Q175,80 350,120"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                  />
                  <Path
                    d="M0,160 Q100,140 200,160 T350,160"
                    stroke="#fff"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </Svg>
              </View>

              <View style={{ position: "relative", zIndex: 1 }}>
                <Text
                  className="text-blue-200 text-lg mb-4"
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    letterSpacing: 0.5,
                  }}
                >
                  POTENTIAL SAVINGS
                </Text>
                <Text
                  className="text-white mb-8"
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 56,
                    letterSpacing: -2,
                  }}
                >
                  ${potentialSavings}
                </Text>

                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderRadius: 20,
                    padding: 24,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Text
                    className="text-blue-100 text-base mb-3"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    Recommended Card
                  </Text>
                  <Text
                    className="text-white text-2xl mb-4"
                    style={{ fontFamily: "Inter_700Bold", letterSpacing: -0.5 }}
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
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Rewards Comparison */}
        <View className="px-6 pb-6">
          <View style={{ position: "relative", overflow: "hidden" }}>
            <LinearGradient
              colors={["#ffffff", "#f8fafc", "#f1f5f9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 24,
                padding: 32,
                shadowColor: "#64748b",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 24,
                elevation: 8,
                borderWidth: 1,
                borderColor: "rgba(59, 130, 246, 0.1)",
              }}
            >
              {/* Subtle Background Pattern */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.05,
                }}
              >
                <Svg width="100%" height="160" viewBox="0 0 350 160">
                  <Circle cx="60" cy="40" r="6" fill="#3b82f6" />
                  <Circle cx="290" cy="120" r="8" fill="#2563eb" />
                  <Path
                    d="M0,80 Q175,60 350,80"
                    stroke="#3b82f6"
                    strokeWidth="1"
                    fill="none"
                  />
                </Svg>
              </View>

              <View style={{ position: "relative", zIndex: 1 }}>
                <Text
                  className="text-blue-900 text-xl mb-8"
                  style={{ fontFamily: "Inter_700Bold", letterSpacing: -0.5 }}
                >
                  Rewards Comparison
                </Text>

                {/* Your Card */}
                <View className="mb-8">
                  <View className="flex-row items-center justify-between mb-4">
                    <Text
                      className="text-slate-700 text-lg"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      Your Current Card
                    </Text>
                    <Text
                      className="text-slate-900 text-xl"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      ${recommendedCard.yourCardRewards}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#e2e8f0",
                      borderRadius: 12,
                      height: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#64748b",
                        borderRadius: 12,
                        height: 8,
                        width: "20%",
                      }}
                    />
                  </View>
                </View>

                {/* Recommended Card */}
                <View>
                  <View className="flex-row items-center justify-between mb-4">
                    <Text
                      className="text-blue-700 text-lg"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      Recommended Card
                    </Text>
                    <Text
                      className="text-blue-900 text-xl"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      ${recommendedCard.rewards}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#dbeafe",
                      borderRadius: 12,
                      height: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#3b82f6",
                        borderRadius: 12,
                        height: 8,
                        width: "100%",
                      }}
                    />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Additional Benefits */}
        <View className="px-6 pb-6">
          <View style={{ position: "relative", overflow: "hidden" }}>
            <LinearGradient
              colors={["#ffffff", "#f8fafc", "#f1f5f9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 24,
                padding: 32,
                shadowColor: "#64748b",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 24,
                elevation: 8,
                borderWidth: 1,
                borderColor: "rgba(59, 130, 246, 0.1)",
              }}
            >
              {/* Background Stars */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.04,
                }}
              >
                <Svg width="100%" height="160" viewBox="0 0 350 160">
                  <Polygon
                    points="80,30 83,40 93,40 85,46 88,56 80,50 72,56 75,46 67,40 77,40"
                    fill="#3b82f6"
                  />
                  <Polygon
                    points="270,110 272,117 279,117 274,121 276,128 270,124 264,128 266,121 261,117 268,117"
                    fill="#2563eb"
                  />
                </Svg>
              </View>

              <View style={{ position: "relative", zIndex: 1 }}>
                <Text
                  className="text-blue-900 text-xl mb-8"
                  style={{ fontFamily: "Inter_700Bold", letterSpacing: -0.5 }}
                >
                  Additional Benefits
                </Text>

                {additionalBenefits.map((benefit, index) => (
                  <View
                    key={index}
                    className="flex-row items-center mb-6"
                    style={{
                      marginBottom:
                        index === additionalBenefits.length - 1 ? 0 : 24,
                    }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: "#dbeafe",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 16,
                        shadowColor: "#3b82f6",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 2,
                      }}
                    >
                      <Ionicons name="checkmark" size={20} color="#1e40af" />
                    </View>
                    <Text
                      className="text-slate-700 text-lg flex-1"
                      style={{ fontFamily: "Inter_500Medium", lineHeight: 24 }}
                    >
                      {benefit}
                    </Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Action Button */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            style={{ position: "relative", overflow: "hidden" }}
          >
            <LinearGradient
              colors={["#1e40af", "#2563eb", "#3b82f6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 20,
                paddingVertical: 20,
                paddingHorizontal: 32,
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 20,
                elevation: 12,
              }}
            >
              {/* Button Background Pattern */}
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
                <Svg width="100%" height="60" viewBox="0 0 350 60">
                  <Polygon
                    points="50,15 52,22 59,22 54,26 56,33 50,29 44,33 46,26 41,22 48,22"
                    fill="#fff"
                  />
                  <Circle cx="300" cy="40" r="6" fill="#fff" />
                  <Path
                    d="M0,30 Q175,20 350,30"
                    stroke="#fff"
                    strokeWidth="1"
                    fill="none"
                  />
                </Svg>
              </View>

              <Text
                className="text-white text-center text-lg"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  letterSpacing: 0.5,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Apply for {recommendedCard.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
