import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNavigation({
  navigation,
  activeTab = "Home",
  tabs = [
    { name: "Home", icon: "home", route: "Home" },
    { name: "Cards", icon: "wallet", route: "CardManagement" },
    { name: "Profile", icon: "person", route: "Profile" },
  ],
}) {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 20,
      }}
    >
      <View className="flex-row justify-around py-4 px-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              className="items-center"
              onPress={() => navigation.navigate(tab.route)}
            >
              <View
                className={`w-12 h-12 rounded-2xl items-center justify-center mb-2 ${
                  isActive ? "bg-blue-600" : "bg-gray-50"
                }`}
                style={
                  isActive
                    ? {
                        shadowColor: "#2563eb",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 12,
                        elevation: 8,
                      }
                    : {}
                }
              >
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={isActive ? "white" : "#6b7280"}
                />
              </View>
              <Text
                className={`text-xs ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
                style={{
                  fontFamily: isActive
                    ? "Inter_600SemiBold"
                    : "Inter_500Medium",
                }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
