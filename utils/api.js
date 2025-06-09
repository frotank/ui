import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://zashit-backend-production.up.railway.app/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(
          "🔐 API Request with token:",
          token.substring(0, 20) + "..."
        );
        console.log("📡 API URL:", config.url);
      } else {
        console.log("⚠️ No token found for API request");
      }
    } catch (error) {
      console.error("Error getting token from storage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to auth
      await AsyncStorage.multiRemove(["accessToken", "user"]);
      // You might want to emit an event here to trigger logout in your auth context
    }
    return Promise.reject(error);
  }
);

export default api;

// Example API functions
export const apiCalls = {
  // Get user profile
  getUserProfile: () => api.get("/user/profile"),

  // Get transactions
  getTransactions: (params) => api.get("/transactions", { params }),

  // Get card recommendations
  getCardRecommendations: () => api.get("/cards/recommendations"),

  // Get missed rewards
  getMissedRewards: () => api.get("/rewards/missed"),

  // Update user profile
  updateUserProfile: (data) => api.put("/user/profile", data),

  // Add more API calls as needed
};
