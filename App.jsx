import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ProfitPilotOnboardingScreen from "./screens/ProfitPilotOnboardingScreen";
import BankingScreen from "./screens/BankingScreen";
import CardManagementScreen from "./screens/CardManagementScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
          />
          <Stack.Screen
            name="ProfitPilotOnboarding"
            component={ProfitPilotOnboardingScreen}
          />
          <Stack.Screen name="Banking" component={BankingScreen} />
          <Stack.Screen
            name="CardManagement"
            component={CardManagementScreen}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
