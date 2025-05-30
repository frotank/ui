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
    <TouchableOpacity key={card.id} className="mb-6">
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
                top: 30,
                right: 30,
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#fff",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 60,
                right: 60,
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
                left: 30,
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#fff",
              }}
            />
          </View>

          {/* Card Header */}
          <View
            className="flex-row items-start justify-between mb-6"
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
            <View className="bg-white/25 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <Text
                className="text-white text-xs"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                ACTIVE
              </Text>
            </View>
          </View>

          {/* Card Number */}
          <View className="flex-1 justify-center" style={{ zIndex: 1 }}>
            <Text
              className="text-white/80 text-sm mb-2"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Card Number
            </Text>
            <Text
              className="text-white text-2xl mb-4"
              style={{
                fontFamily: "Inter_600SemiBold",
                letterSpacing: 3,
                textShadowColor: "#00000030",
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
                className="text-white/80 text-sm mb-1"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                {card.holder}
              </Text>
              <Text
                className="text-white text-base"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  textShadowColor: "#00000020",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                Exp {card.expiry}
              </Text>
            </View>
            <View>
              <Text
                className="text-white/80 text-sm mb-1"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Balance
              </Text>
              <Text
                className="text-white text-xl"
                style={{
                  fontFamily: "Inter_700Bold",
                  textShadowColor: "#00000030",
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
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-6 py-6 bg-white border-b border-blue-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text
              className="text-blue-600 text-base mb-2"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Manage your
            </Text>
            <Text
              className="text-blue-900 text-2xl"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Cards
            </Text>
          </View>

          <TouchableOpacity className="bg-blue-50 rounded-2xl p-4">
            <Ionicons name="notifications-outline" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* My Cards Section */}
        <View className="px-6 py-6">
          <View className="flex-row items-center justify-between mb-6">
            <Text
              className="text-blue-900 text-xl"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.5,
              }}
            >
              My Cards ({cards.length})
            </Text>
            <TouchableOpacity
              onPress={() => setShowAddCardModal(true)}
              className="bg-blue-600 rounded-xl px-4 py-2"
            >
              <Text
                className="text-white text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Add Card
              </Text>
            </TouchableOpacity>
          </View>

          {/* Render Cards */}
          {cards.map(renderCard)}

          {/* Card Benefits Section */}
          <View
            className="bg-white rounded-3xl p-6 mt-4"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text
              className="text-blue-900 text-xl mb-6"
              style={{
                fontFamily: "Inter_700Bold",
                letterSpacing: -0.5,
              }}
            >
              Card Benefits
            </Text>

            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="shield-checkmark" size={24} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-blue-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Fraud Protection
                  </Text>
                  <Text
                    className="text-blue-600 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    24/7 monitoring and instant alerts
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="gift" size={24} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-green-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Cashback Rewards
                  </Text>
                  <Text
                    className="text-green-600 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Earn up to 5% on every purchase
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-4">
                  <Ionicons name="airplane" size={24} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-purple-900 text-base mb-1"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Travel Benefits
                  </Text>
                  <Text
                    className="text-purple-600 text-sm"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Airport lounge access and travel insurance
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddCardModal}
        onRequestClose={() => setShowAddCardModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 pb-8">
            <View className="flex-row items-center justify-between mb-6">
              <Text
                className="text-blue-900 text-xl"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                Add New Card
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddCardModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Card Type */}
              <View className="mb-4">
                <Text
                  className="text-blue-900 text-base mb-2"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Card Type
                </Text>
                <TextInput
                  value={newCard.type}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, type: text })
                  }
                  placeholder="e.g., VISA PLATINUM"
                  className="bg-blue-50 rounded-xl p-4 text-blue-900 border border-blue-100"
                  style={{ fontFamily: "Inter_500Medium" }}
                />
              </View>

              {/* Card Number */}
              <View className="mb-4">
                <Text
                  className="text-blue-900 text-base mb-2"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Card Number
                </Text>
                <TextInput
                  value={newCard.number}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, number: text })
                  }
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  className="bg-blue-50 rounded-xl p-4 text-blue-900 border border-blue-100"
                  style={{ fontFamily: "Inter_500Medium" }}
                />
              </View>

              {/* Card Holder */}
              <View className="mb-4">
                <Text
                  className="text-blue-900 text-base mb-2"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Card Holder Name
                </Text>
                <TextInput
                  value={newCard.holder}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, holder: text })
                  }
                  placeholder="John Doe"
                  className="bg-blue-50 rounded-xl p-4 text-blue-900 border border-blue-100"
                  style={{ fontFamily: "Inter_500Medium" }}
                />
              </View>

              {/* Expiry and CVV */}
              <View className="flex-row space-x-4 mb-6">
                <View className="flex-1">
                  <Text
                    className="text-blue-900 text-base mb-2"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Expiry Date
                  </Text>
                  <TextInput
                    value={newCard.expiry}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, expiry: text })
                    }
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    className="bg-blue-50 rounded-xl p-4 text-blue-900 border border-blue-100"
                    style={{ fontFamily: "Inter_500Medium" }}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-blue-900 text-base mb-2"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    CVV
                  </Text>
                  <TextInput
                    value={newCard.cvv}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, cvv: text })
                    }
                    placeholder="123"
                    keyboardType="numeric"
                    secureTextEntry
                    className="bg-blue-50 rounded-xl p-4 text-blue-900 border border-blue-100"
                    style={{ fontFamily: "Inter_500Medium" }}
                  />
                </View>
              </View>

              {/* Add Card Button */}
              <TouchableOpacity
                onPress={handleAddCard}
                className="bg-blue-600 rounded-xl py-4 items-center"
                style={{
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                <Text
                  className="text-white text-lg"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Add Card
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Cards" />
    </SafeAreaView>
  );
}
