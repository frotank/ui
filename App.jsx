import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";
import ProfitPilotOnboardingScreen from "./screens/ProfitPilotOnboardingScreen";
import BankingScreen from "./screens/BankingScreen";
import CardManagementScreen from "./screens/CardManagementScreen";
export default function App() {
  return <CardManagementScreen />;
}
