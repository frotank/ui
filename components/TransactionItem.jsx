import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionItem({
  transaction,
  onPress,
  showOptimization = true,
}) {
  if (!transaction) return null;

  const {
    id,
    merchant,
    category,
    amount,
    cardUsed,
    isOptimal,
    betterCard,
    missedReward,
    earnedReward,
    icon,
    date,
    description,
  } = transaction;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(transaction)}
      className="bg-white/80 rounded-3xl p-7 mb-5"
      style={{
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 8,
        borderLeftWidth: 5,
        borderLeftColor: transaction.color || "#6366f1",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(8px)", // for web, ignored on native
      }}
      activeOpacity={0.93}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {/* Icon */}
          <View
            className="w-16 h-16 rounded-2xl items-center justify-center mr-6"
            style={{
              backgroundColor: transaction.color || "#a5b4fc",
              shadowColor: "#6366f1",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Text className="text-3xl">{icon || "💳"}</Text>
          </View>

          {/* Transaction Details */}
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Text
                className="text-gray-900 text-base mr-2 flex-1"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                {merchant}
              </Text>
              {showOptimization && (
                <View
                  className={`rounded-full p-1 ${
                    isOptimal ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <Ionicons
                    name={isOptimal ? "checkmark" : "close"}
                    size={12}
                    color={isOptimal ? "#059669" : "#dc2626"}
                  />
                </View>
              )}
            </View>

            <Text
              className="text-gray-500 text-sm mb-1"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              {category} • {date}
            </Text>

            {cardUsed && (
              <Text
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                {cardUsed}
              </Text>
            )}
          </View>
        </View>

        {/* Amount and Action */}
        <View className="items-end ml-4">
          <Text
            className="text-gray-900 text-lg mb-2"
            style={{ fontFamily: "Inter_700Bold" }}
          >
            {amount}
          </Text>

          {showOptimization && (
            <>
              {isOptimal ? (
                <Text
                  className="text-green-600 text-xs"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  +{earnedReward} earned
                </Text>
              ) : (
                <View className="bg-blue-50 rounded-lg px-3 py-1">
                  <Text
                    className="text-blue-600 text-xs"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    -{missedReward} missed
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
