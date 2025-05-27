import { View } from "react-native";
import React from "react";

export default function Card({
  children,
  className = "",
  style = {},
  padding = "p-6",
  margin = "mb-6",
  shadow = true,
}) {
  const shadowStyle = shadow
    ? {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 16,
        elevation: 4,
      }
    : {};

  return (
    <View
      className={`bg-white/70 rounded-[24px] ${padding} ${margin} ${className}`}
      style={{
        shadowColor: "#3b82f6",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(12px)", // for web, ignored on native
        ...shadowStyle,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
