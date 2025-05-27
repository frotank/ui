import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.85;
const cardMargin = 16;

export default function RecommendedCarousel({
  cards = [],
  onCardPress,
  onLearnMore,
}) {
  const scrollViewRef = useRef(null);

  if (!cards || cards.length === 0) return null;

  const defaultGradients = [
    ["#2563eb", "#3b82f6"],
    ["#7c3aed", "#8b5cf6"],
    ["#dc2626", "#ef4444"],
    ["#059669", "#10b981"],
    ["#f59e0b", "#fbbf24"],
    ["#06b6d4", "#0891b2"],
  ];

  const RecommendedCardCarousel = ({ card, index }) => {
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
      rating,
      annualFee,
      welcomeBonus,
    } = card;

    const cardGradient =
      gradientColors || defaultGradients[index % defaultGradients.length];

    return (
      <TouchableOpacity
        onPress={() => onCardPress?.(card)}
        style={{
          width: cardWidth,
          marginRight: index === cards.length - 1 ? cardMargin : cardMargin,
          marginLeft: index === 0 ? cardMargin : 0,
        }}
      >
        <LinearGradient
          colors={cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl p-6 h-72"
          style={{
            shadowColor: color || cardGradient[0],
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          {/* Header with Rank Badge */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text
                className="text-white text-xl mb-1"
                style={{ fontFamily: "Inter_700Bold" }}
                numberOfLines={1}
              >
                {name}
              </Text>
              <Text
                className="text-white/80 text-sm"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                {bank}
              </Text>
              {rating && (
                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text
                    className="text-white/90 text-sm ml-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {rating}
                  </Text>
                </View>
              )}
            </View>

            {isRecommended && (
              <View className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
                <Text
                  className="text-white text-xs"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  #{index + 1} PICK
                </Text>
              </View>
            )}
          </View>

          {/* Key Perks - Limited to 3 for carousel */}
          {perks.length > 0 && (
            <View className="mb-4">
              {perks.slice(0, 3).map((perk, perkIndex) => (
                <View key={perkIndex} className="flex-row items-center mb-2">
                  <View className="w-2 h-2 bg-white rounded-full mr-3" />
                  <Text
                    className="text-white text-sm flex-1"
                    style={{ fontFamily: "Inter_400Regular" }}
                    numberOfLines={1}
                  >
                    {perk}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Why This Card - Compact version for carousel */}
          {whyThisCard && (
            <View className="bg-white/15 backdrop-blur rounded-2xl p-3 mb-4 flex-1">
              <Text
                className="text-white text-xs mb-1"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Perfect for you because:
              </Text>
              <Text
                className="text-white/90 text-sm leading-5"
                style={{ fontFamily: "Inter_400Regular" }}
                numberOfLines={2}
              >
                {whyThisCard}
              </Text>
            </View>
          )}

          {/* Bottom Section with CTA */}
          <View className="flex-row items-end justify-between">
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
                    className="text-white/80 text-xs"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    potential savings
                  </Text>
                </>
              )}
              {annualFee && (
                <Text
                  className="text-white/70 text-xs mt-1"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  Annual fee: {annualFee}
                </Text>
              )}
            </View>

            <TouchableOpacity
              className="bg-white rounded-2xl px-4 py-2"
              onPress={() => onLearnMore?.(card)}
            >
              <Text
                className="text-sm"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  color: cardGradient[0],
                }}
              >
                Apply Now
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mb-8">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + cardMargin}
        snapToAlignment="start"
        contentInsetAdjustmentBehavior="automatic"
        pagingEnabled={false}
      >
        {cards.map((card, index) => (
          <RecommendedCardCarousel
            key={card.id || index}
            card={card}
            index={index}
          />
        ))}
      </ScrollView>

      {/* Carousel Indicators */}
      {cards.length > 1 && (
        <View className="flex-row justify-center mt-4 space-x-2">
          {cards.map((_, index) => (
            <TouchableOpacity
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
              onPress={() => {
                scrollViewRef.current?.scrollTo({
                  x: index * (cardWidth + cardMargin),
                  animated: true,
                });
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
