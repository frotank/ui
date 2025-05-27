import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SectionHeader({
  title,
  subtitle,
  actionText,
  onActionPress,
  marginBottom = "mb-6",
  marginTop = "mt-0",
  titleStyle,
  subtitleStyle,
  actionStyle,
}) {
  return (
    <View className={`${marginBottom} flex-row items-center`}>
      {/* Accent bar */}
      <View
        className="h-8 w-1.5 rounded-full mr-3"
        style={{ backgroundColor: "#6366f1", opacity: 0.85 }}
      />
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-2">
          <Text
            className="text-gray-900 text-2xl tracking-tight"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.5,
              ...titleStyle,
            }}
          >
            {title}
          </Text>
          {actionText && onActionPress && (
            <TouchableOpacity onPress={onActionPress}>
              <Text
                className="text-primary-600 text-base"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  textDecorationLine: "underline",
                  ...actionStyle,
                }}
              >
                {actionText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {subtitle && (
          <Text
            className="text-gray-500 text-sm leading-5"
            style={{
              fontFamily: "Inter_500Medium",
              ...subtitleStyle,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}
