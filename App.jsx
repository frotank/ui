import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  OverpassMono_400Regular,
  OverpassMono_600SemiBold,
  OverpassMono_700Bold,
} from "@expo-google-fonts/overpass-mono";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProfitPilotOnboardingScreen from "./screens/ProfitPilotOnboardingScreen";
import BankingScreen from "./screens/BankingScreen";
import CardManagementScreen from "./screens/CardManagementScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GoogleAuthScreen from "./screens/GoogleAuthScreen";

const Stack = createStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Navigation component that handles auth state
function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You can return a loading screen here
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#6b7280",
            fontFamily: "Inter_500Medium",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "Home" : "Auth"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        // Auth screens
        <Stack.Screen name="Auth" component={GoogleAuthScreen} />
      ) : (
        // Main app screens
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    // Overpass Mono fonts (available via Expo Google Fonts)
    OverpassMono_400Regular,
    OverpassMono_600SemiBold,
    OverpassMono_700Bold,

    // Inter fonts (replacing Cirka fonts)
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,

    // Poppins fonts (replacing Gilroy fonts)
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,

    // Font aliases for compatibility with existing Tailwind config
    "Cirka-Regular": Inter_400Regular,
    "Cirka-Bold": Inter_700Bold,
    "Gilroy-Regular": Poppins_400Regular,
    "Gilroy-Medium": Poppins_500Medium,
    "Gilroy-SemiBold": Poppins_600SemiBold,
    "Gilroy-Bold": Poppins_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="#000000" />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
