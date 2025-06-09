import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar, Alert } from "react-native";
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
import Svg, { Path, Circle, Polygon } from "react-native-svg";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  GOOGLE_OAUTH_CONFIG,
  getGmailHeaders,
  hasGmailScopes,
} from "../config/googleAuth";

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

// Define redirect URI at module level to avoid scope issues
// Use the redirect URI registered in Google Cloud Console
const REDIRECT_URI = GOOGLE_OAUTH_CONFIG.REDIRECT_URI;

console.log("🔗 Configured Redirect URI:", GOOGLE_OAUTH_CONFIG.REDIRECT_URI);
console.log(
  "🔗 Expo AuthSession.getDefaultReturnUrl():",
  AuthSession.getDefaultReturnUrl()
);

export default function GoogleAuthScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { setUser, setAccessToken } = useAuth();

  console.log("🔗 Redirect URI:", REDIRECT_URI);

  // Google OAuth configuration
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_OAUTH_CONFIG.GOOGLE_CLIENT_ID,
      scopes: GOOGLE_OAUTH_CONFIG.SCOPES,
      redirectUri: REDIRECT_URI,
      responseType: AuthSession.ResponseType.Code,
      additionalParameters: {},
      extraParams: {
        access_type: "offline", // To get refresh token
      },
    },
    {
      authorizationEndpoint: GOOGLE_OAUTH_CONFIG.AUTH_ENDPOINT,
    }
  );

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Handle OAuth response
  useEffect(() => {
    if (response?.type === "success") {
      console.log("✅ OAuth response success:", response);
      handleGoogleAuthSuccess(response.params.code);
    } else if (response?.type === "error") {
      console.error("❌ OAuth response error:", response.error);
      Alert.alert(
        "Authentication Error",
        `OAuth failed: ${
          response.error.description ||
          response.error.message ||
          "Unknown error"
        }`
      );
      setLoading(false);
    } else if (response?.type === "cancel") {
      console.log("⚠️ OAuth cancelled by user");
      setLoading(false);
    } else if (response) {
      console.log("ℹ️ OAuth response:", response);
      setLoading(false);
    }
  }, [response]);

  if (!fontsLoaded) {
    return null;
  }

  const handleGoogleAuthSuccess = async (authCode) => {
    try {
      setLoading(true);
      console.log("🔐 Google OAuth success, exchanging code for tokens...");
      console.log("Auth code received:", authCode ? "✅" : "❌");
      console.log("Auth code length:", authCode?.length);
      console.log("Client ID:", GOOGLE_OAUTH_CONFIG.GOOGLE_CLIENT_ID);
      console.log("Redirect URI:", REDIRECT_URI);

      if (!authCode) {
        throw new Error("No authorization code received");
      }

      // Exchange authorization code for tokens
      console.log("🔄 Making token exchange request...");
      const tokenRequestBody = new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_OAUTH_CONFIG.GOOGLE_CLIENT_SECRET,
        code: authCode,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      });

      console.log("📤 Token request body:", tokenRequestBody.toString());

      const tokenResponse = await fetch(GOOGLE_OAUTH_CONFIG.TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: tokenRequestBody,
      });

      console.log("📥 Token response status:", tokenResponse.status);
      console.log("📥 Token response headers:", tokenResponse.headers);

      const tokenResponseText = await tokenResponse.text();
      console.log("📥 Token response raw text:", tokenResponseText);

      let tokens;
      try {
        tokens = JSON.parse(tokenResponseText);
      } catch (parseError) {
        console.error("❌ Failed to parse token response:", parseError);
        throw new Error(`Invalid token response: ${tokenResponseText}`);
      }

      console.log("🔑 Token exchange response:", tokens);

      if (tokens.error) {
        throw new Error(
          `Token exchange failed: ${tokens.error_description || tokens.error}`
        );
      }

      if (!tokens.access_token) {
        throw new Error("No access token received from Google");
      }

      console.log("✅ Access token received, getting user profile...");

      // Get user profile from Google
      const profileResponse = await fetch(
        GOOGLE_OAUTH_CONFIG.USERINFO_ENDPOINT,
        {
          headers: getGmailHeaders(tokens.access_token),
        }
      );

      console.log("👤 Profile response status:", profileResponse.status);

      if (!profileResponse.ok) {
        const profileError = await profileResponse.text();
        console.error("❌ Profile response error:", profileError);
        throw new Error(
          `Failed to get user profile: ${profileResponse.status} - ${profileError}`
        );
      }

      const userProfile = await profileResponse.json();
      console.log("👤 User profile:", userProfile);

      // Store tokens and user data immediately (skip backend for now)
      console.log("💾 Storing user data...");
      await AsyncStorage.setItem("googleAccessToken", tokens.access_token);
      await AsyncStorage.setItem(
        "googleRefreshToken",
        tokens.refresh_token || ""
      );
      await AsyncStorage.setItem("accessToken", "mock_token_" + Date.now());
      await AsyncStorage.setItem("user", JSON.stringify(userProfile));

      // Update auth context
      setAccessToken("mock_token_" + Date.now());
      setUser(userProfile);

      console.log("✅ Authentication successful!");
      console.log("📧 User email:", userProfile.email);

      // Show success message
      Alert.alert(
        "Success!",
        `Welcome ${userProfile.name}! You are now signed in.`,
        [
          {
            text: "Continue",
            onPress: () => {
              if (navigation && navigation.navigate) {
                navigation.navigate("Home");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("❌ Google auth error:", error);
      console.error("❌ Error stack:", error.stack);
      Alert.alert(
        "Authentication Error",
        `Failed to authenticate: ${error.message}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const testGmailAccess = async (accessToken, email) => {
    try {
      console.log("📧 Testing Gmail API access...");

      // Test Gmail profile access
      const profileResponse = await fetch(
        `${GOOGLE_OAUTH_CONFIG.GMAIL_API_BASE}/users/me/profile`,
        {
          headers: getGmailHeaders(accessToken),
        }
      );

      if (!profileResponse.ok) {
        throw new Error(`Gmail API error: ${profileResponse.status}`);
      }

      const profile = await profileResponse.json();
      console.log("📧 Gmail profile:", profile);
      console.log("✅ Gmail API access confirmed for:", email);

      // Test listing recent messages (optional)
      try {
        const messagesResponse = await fetch(
          `${GOOGLE_OAUTH_CONFIG.GMAIL_API_BASE}/users/me/messages?maxResults=5`,
          {
            headers: getGmailHeaders(accessToken),
          }
        );

        if (messagesResponse.ok) {
          const messages = await messagesResponse.json();
          console.log(
            `📬 Found ${messages.messages?.length || 0} recent messages`
          );
        }
      } catch (msgError) {
        console.log(
          "ℹ️ Message listing test failed (this is optional):",
          msgError.message
        );
      }

      return profile;
    } catch (error) {
      console.error("❌ Gmail API access failed:", error);
      throw error;
    }
  };

  const authenticateWithBackend = async (userProfile, googleAccessToken) => {
    try {
      console.log("🔐 Authenticating with backend...");

      const options = {
        method: "POST",
        url: "https://zashit-backend-production.up.railway.app/api/v1/auth",
        headers: { "Content-Type": "application/json" },
        data: {
          name: userProfile.name,
          email: userProfile.email,
          accessToken: googleAccessToken, // Send the real Google access token
          googleId: userProfile.id,
          picture: userProfile.picture,
        },
      };

      const { data } = await axios.request(options);
      console.log("🔐 Backend Auth Response:", data);

      return data;
    } catch (error) {
      console.error("❌ Backend auth error:", error);
      // Fallback to mock authentication if backend fails
      return {
        success: true,
        accessToken: "fallback_token_" + Date.now(),
        data: userProfile,
      };
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      console.log("🚀 Starting Google OAuth flow...");

      // CRITICAL: Log the redirect URI that will be used for the request.
      console.log(
        "========================================================================================"
      );
      console.log(
        "‼️ COPY THIS URI AND ADD IT TO YOUR GOOGLE CLOUD CONSOLE AUTHORIZED REDIRECT URIS ‼️"
      );
      console.log(`➡️  ${REDIRECT_URI}`);
      console.log(
        "========================================================================================"
      );

      if (!request) {
        console.error("❌ OAuth request not ready");
        Alert.alert("Error", "Google OAuth not ready. Please try again.");
        setLoading(false);
        return;
      }

      console.log("📱 Launching OAuth prompt...");
      // Start the OAuth flow
      const result = await promptAsync();
      console.log("📱 OAuth prompt result:", result);
    } catch (error) {
      console.error("❌ OAuth error:", error);
      Alert.alert(
        "Authentication Error",
        `Failed to start Google authentication: ${error.message}`
      );
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#f8fafc" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8fafc"
        translucent={true}
      />

      {/* Enhanced Header with Blue Gradient and Creative Shapes */}
      <View style={{ position: "relative", overflow: "hidden" }}>
        <LinearGradient
          colors={["#dbeafe", "#93c5fd", "#60a5fa"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 32,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            height: 200,
          }}
        >
          {/* Creative Background Shapes */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.15,
            }}
          >
            <Svg width="100%" height="200" viewBox="0 0 400 200">
              <Polygon
                points="50,40 55,55 70,55 58,65 63,80 50,70 37,80 42,65 30,55 45,55"
                fill="#1e40af"
              />
              <Polygon
                points="320,35 323,45 333,45 325,51 328,61 320,55 312,61 315,51 307,45 317,45"
                fill="#2563eb"
              />
              <Path
                d="M0,100 Q100,70 200,100 T400,100"
                stroke="#1e40af"
                strokeWidth="2.5"
                fill="none"
              />
              <Circle cx="80" cy="150" r="8" fill="#3b82f6" />
              <Circle cx="280" cy="60" r="6" fill="#1e40af" />
            </Svg>
          </View>

          {/* Header Content */}
          <View
            className="flex-1 items-center justify-center"
            style={{ position: "relative", zIndex: 1 }}
          >
            <View className="w-20 h-20 bg-white/20 rounded-2xl items-center justify-center mb-6">
              <Ionicons name="shield-checkmark" size={36} color="#1e40af" />
            </View>
            <Text
              className="text-blue-900 text-3xl text-center mb-3"
              style={{ fontFamily: "Inter_700Bold", letterSpacing: -0.5 }}
            >
              Get Started
            </Text>
            <Text
              className="text-blue-700 text-lg text-center"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Unlock personalized insights
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View className="flex-1 px-6 pt-12 justify-between">
        {/* Simplified Trust Section */}
        <View>
          <Text
            className="text-gray-900 text-xl mb-8 text-center"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            We use your email to send alerts and sync your data securely
          </Text>

          {/* Privacy Badge */}
          <View
            className="bg-blue-50 rounded-xl p-4 mb-12 border border-blue-200"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="lock-closed" size={20} color="#3b82f6" />
              <Text
                className="text-blue-800 text-sm ml-3"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Your data is encrypted and never shared
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            {/* Google Sign In Button */}
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              disabled={loading}
              className={`rounded-xl p-5 border border-gray-200 flex-row items-center justify-center ${
                loading ? "bg-gray-100" : "bg-white"
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <View className="w-6 h-6 mr-3">
                <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">G</Text>
                </View>
              </View>
              <Text
                className={`text-lg ${
                  loading ? "text-gray-400" : "text-gray-800"
                }`}
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                {loading ? "Signing in..." : "Continue with Google"}
              </Text>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleSkip}
              className="py-4"
              disabled={loading}
            >
              <Text
                className="text-gray-500 text-base text-center"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms */}
        <View className="mb-6">
          <Text
            className="text-gray-400 text-xs text-center"
            style={{ fontFamily: "Inter_400Regular" }}
          >
            By continuing, you agree to our{" "}
            <Text className="text-blue-600">Terms</Text> and{" "}
            <Text className="text-blue-600">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
