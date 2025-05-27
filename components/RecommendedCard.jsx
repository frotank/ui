import React from "react";
import { View, Text, TouchableOpacity, Animated, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RecommendedCard({
  card,
  index = 0,
  onPress,
  onLearnMore,
}) {
  if (!card) return null;

  const {
    id,
    name,
    bank,
    perks = [],
    whyThisCard,
    potentialSavings,
    color,
    gradientColors,
    isRecommended = true,
  } = card;

  const defaultGradients = [
    ["#2563eb", "#3b82f6"],
    ["#7c3aed", "#8b5cf6"],
    ["#dc2626", "#ef4444"],
    ["#059669", "#10b981"],
  ];

  const cardGradient =
    gradientColors || defaultGradients[index % defaultGradients.length];

  // Animated scale for press effect
  const scale = React.useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], marginBottom: 24 }}>
      <TouchableOpacity
        onPress={() => onPress?.(card)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.92}
      >
        <LinearGradient
          colors={cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl p-7"
          style={{
            shadowColor: cardGradient[0],
            shadowOffset: { width: 0, height: 16 },
            shadowOpacity: 0.22,
            shadowRadius: 32,
            elevation: 18,
            borderRadius: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <View className="flex-row items-start justify-between mb-6">
            <View className="flex-1 mr-4">
              <Text
                className="text-white text-lg mb-1"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                {name}
              </Text>
              <Text
                className="text-white/80 text-sm"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                {bank}
              </Text>
            </View>

            {isRecommended && (
              <View className="bg-white/20 rounded-2xl px-3 py-1">
                <Text
                  className="text-white text-xs"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  #{index + 1} PICK
                </Text>
              </View>
            )}
          </View>

          {/* Glassy overlay for perks/why section */}
          {/* Perks */}
          {perks.length > 0 && (
            <View className="mb-6">
              <View
                style={{
                  ...Platform.select({
                    web: { backdropFilter: "blur(8px)" },
                    default: {},
                  }),
                  backgroundColor: "rgba(255,255,255,0.10)",
                  borderRadius: 18,
                  padding: 10,
                  marginBottom: 12,
                }}
              >
                {perks.slice(0, 3).map((perk, perkIndex) => (
                  <View key={perkIndex} className="flex-row items-center mb-3">
                    <View className="w-2 h-2 bg-white rounded-full mr-4" />
                    <Text
                      className="text-white text-[14px] flex-1"
                      style={{ fontFamily: "Inter_400Regular" }}
                    >
                      {perk}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Why This Card */}
          {whyThisCard && (
            <View
              className="mb-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.13)",
                borderRadius: 18,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.18)",
                padding: 14,
                ...Platform.select({
                  web: { backdropFilter: "blur(8px)" },
                  default: {},
                }),
              }}
            >
              <Text
                className="text-white text-xs mb-2"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Why this card?
              </Text>
              <Text
                className="text-white/95 text-sm"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                {whyThisCard}
              </Text>
            </View>
          )}

          {/* Bottom Section */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              {potentialSavings && (
                <>
                  <Text
                    className="text-white text-lg"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    {potentialSavings}
                  </Text>
                  <Text
                    className="text-white/85 text-xs"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    potential savings
                  </Text>
                </>
              )}
            </View>

            <TouchableOpacity
              className="bg-white rounded-2xl px-7 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.13,
                shadowRadius: 12,
                elevation: 8,
                borderWidth: 1,
                borderColor: "#e0e7ff",
              }}
              onPress={() => onLearnMore?.(card)}
            >
              <Text
                className="text-primary-600 text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
