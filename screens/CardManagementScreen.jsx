import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
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

// Import reusable components
import BottomNavigation from "../components/BottomNavigation";

export default function CardManagementScreen({ navigation }) {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "VISA PLATINUM",
      number: "1253 5432 3524 3090",
      holder: "John Doe",
      expiry: "05/24",
      gradient: ["#3b82f6", "#1d4ed8", "#1e40af"],
      balance: 5234.5,
    },
    {
      id: 2,
      type: "MASTERCARD GOLD",
      number: "1253 5432 3524 9081",
      holder: "John Doe",
      expiry: "08/26",
      gradient: ["#f59e0b", "#f97316", "#ea580c"],
      balance: 3421.75,
    },
    {
      id: 3,
      type: "AMEX BLACK",
      number: "1253 5432 3524 1205",
      holder: "John Doe",
      expiry: "12/25",
      gradient: ["#1f2937", "#374151", "#4b5563"],
      balance: 8750.25,
    },
  ]);

  const [newCard, setNewCard] = useState({
    type: "",
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const cardGradients = [
    ["#8b5cf6", "#7c3aed", "#6366f1"], // Purple
    ["#06b6d4", "#0891b2", "#0e7490"], // Cyan
    ["#10b981", "#059669", "#047857"], // Emerald
    ["#ef4444", "#dc2626", "#b91c1c"], // Red
    ["#f59e0b", "#f97316", "#ea580c"], // Orange
  ];

  const handleAddCard = () => {
    if (
      !newCard.type ||
      !newCard.number ||
      !newCard.holder ||
      !newCard.expiry
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const randomGradient =
      cardGradients[Math.floor(Math.random() * cardGradients.length)];
    const cardToAdd = {
      id: cards.length + 1,
      ...newCard,
      gradient: randomGradient,
      balance: 0.0,
    };

    setCards([...cards, cardToAdd]);
    setNewCard({ type: "", number: "", holder: "", expiry: "", cvv: "" });
    setShowAddCardModal(false);
    Alert.alert("Success", "Card added successfully!");
  };

  const renderCard = (card) => (
    <TouchableOpacity key={card.id} className="mb-8">
      <View
        className="rounded-3xl overflow-hidden"
        style={{
          height: 220,
          shadowColor: card.gradient[0],
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          elevation: 15,
        }}
      >
        <LinearGradient
          colors={card.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, padding: 24, position: "relative" }}
        >
          {/* Background Design */}
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
            <View
              style={{
                position: "absolute",
                top: 32,
                right: 32,
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#fff",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 64,
                right: 64,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#fff",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 40,
                left: 32,
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#fff",
              }}
            />
          </View>

          {/* Card Header */}
          <View
            className="flex-row items-start justify-between mb-8"
            style={{ zIndex: 1 }}
          >
            <View>
              <Text
                className="text-white text-lg tracking-wider"
                style={{
                  fontFamily: "Inter_700Bold",
                  textShadowColor: "#00000030",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                {card.type}
              </Text>
              <View className="flex-row items-center mt-2">
                <Ionicons
                  name="wifi"
                  size={20}
                  color="white"
                  style={{ transform: [{ rotate: "90deg" }], opacity: 0.8 }}
                />
                <Text
                  className="text-white/80 text-xs ml-2"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Contactless
                </Text>
              </View>
            </View>
            <View className="bg-white/25 rounded-lg px-4 py-2">
              <Text
                className="text-white text-xs"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                ACTIVE
              </Text>
            </View>
          </View>

          {/* Card Number */}
          <View className="mb-8" style={{ zIndex: 1 }}>
            <Text
              className="text-white/80 text-sm mb-2"
              style={{
                fontFamily: "Inter_500Medium",
                letterSpacing: 0.5,
              }}
            >
              CARD NUMBER
            </Text>
            <Text
              className="text-white text-xl mb-6"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: 2,
                textShadowColor: "rgba(0,0,0,0.2)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {card.number}
            </Text>
          </View>

          {/* Card Footer */}
          <View
            className="flex-row items-end justify-between"
            style={{ zIndex: 1 }}
          >
            <View>
              <Text
                className="text-white/80 text-sm mb-2"
                style={{
                  fontFamily: "Inter_500Medium",
                  letterSpacing: 0.5,
                }}
              >
                CARD HOLDER
              </Text>
              <Text
                className="text-white text-base"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  letterSpacing: 1,
                  textShadowColor: "rgba(0,0,0,0.2)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                {card.holder.toUpperCase()}
              </Text>
            </View>
            <View>
              <Text
                className="text-white/80 text-sm mb-2"
                style={{
                  fontFamily: "Inter_500Medium",
                  letterSpacing: 0.5,
                }}
              >
                EXPIRES
              </Text>
              <Text
                className="text-white text-base"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  letterSpacing: 1,
                  textShadowColor: "rgba(0,0,0,0.2)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                {card.expiry}
              </Text>
            </View>
            <View>
              <Text
                className="text-white/80 text-sm mb-2"
                style={{
                  fontFamily: "Inter_500Medium",
                  letterSpacing: 0.5,
                }}
              >
                BALANCE
              </Text>
              <Text
                className="text-white text-base"
                style={{
                  fontFamily: "Inter_700Bold",
                  letterSpacing: 0.5,
                  textShadowColor: "rgba(0,0,0,0.2)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                ${card.balance.toFixed(2)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View className="px-6 py-8 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text
              className="text-gray-900 text-2xl mb-2"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -1,
              }}
            >
              My Cards
            </Text>
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Manage your payment cards
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowAddCardModal(true)}
            className="bg-blue-600 rounded-2xl px-6 py-4"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="add" size={20} color="white" />
              <Text
                className="text-white text-base ml-2"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Add Card
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
      >
        {cards.map((card) => renderCard(card))}

        {/* Statistics Card */}
        <View
          className="bg-white rounded-3xl p-8 border border-gray-100"
          style={{
            shadowColor: "#3b82f6",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Text
            className="text-gray-900 text-xl mb-8"
            style={{
              fontFamily: "Inter_700Bold",
              letterSpacing: -0.5,
            }}
          >
            Card Statistics
          </Text>

          <View className="space-y-6">
            <View className="flex-row items-center justify-between">
              <Text
                className="text-gray-600 text-base"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Total Cards
              </Text>
              <Text
                className="text-gray-900 text-xl"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                {cards.length}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text
                className="text-gray-600 text-base"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Total Balance
              </Text>
              <Text
                className="text-green-600 text-xl"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                ${cards.reduce((sum, card) => sum + card.balance, 0).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddCardModal(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-6 py-8 border-b border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text
                className="text-gray-900 text-xl"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                Add New Card
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddCardModal(false)}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1 px-6 py-8">
            <View className="space-y-6">
              <View>
                <Text
                  className="text-gray-700 text-base mb-3"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Card Type
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-2xl px-4 py-4 text-gray-900 text-base border border-gray-200"
                  placeholder="e.g., VISA PLATINUM"
                  value={newCard.type}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, type: text })
                  }
                  style={{ fontFamily: "Inter_500Medium" }}
                />
              </View>

              <View>
                <Text
                  className="text-gray-700 text-base mb-3"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Card Number
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-2xl px-4 py-4 text-gray-900 text-base border border-gray-200"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.number}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, number: text })
                  }
                  keyboardType="numeric"
                  maxLength={19}
                  style={{ fontFamily: "Inter_500Medium" }}
                />
              </View>

              <View>
                <Text
                  className="text-gray-700 text-base mb-3"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Card Holder Name
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-2xl px-4 py-4 text-gray-900 text-base border border-gray-200"
                  placeholder="John Doe"
                  value={newCard.holder}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, holder: text })
                  }
                  style={{ fontFamily: "Inter_500Medium" }}
                />
              </View>

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text
                    className="text-gray-700 text-base mb-3"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Expiry Date
                  </Text>
                  <TextInput
                    className="bg-gray-50 rounded-2xl px-4 py-4 text-gray-900 text-base border border-gray-200"
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, expiry: text })
                    }
                    keyboardType="numeric"
                    maxLength={5}
                    style={{ fontFamily: "Inter_500Medium" }}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-700 text-base mb-3"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    CVV
                  </Text>
                  <TextInput
                    className="bg-gray-50 rounded-2xl px-4 py-4 text-gray-900 text-base border border-gray-200"
                    placeholder="123"
                    value={newCard.cvv}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, cvv: text })
                    }
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    style={{ fontFamily: "Inter_500Medium" }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View className="px-6 py-8 border-t border-gray-100">
            <TouchableOpacity
              onPress={handleAddCard}
              className="bg-blue-600 rounded-2xl py-4"
              style={{
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text
                className="text-white text-center text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Add Card
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <BottomNavigation navigation={navigation} activeTab="cards" />
    </SafeAreaView>
  );
}
