import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored auth data on app launch
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("accessToken");
      const storedUser = await AsyncStorage.getItem("user");

      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (googleAccessToken, email, name) => {
    try {
      const options = {
        method: "POST",
        url: "https://zashit-backend-production.up.railway.app/api/v1/auth",
        headers: { "Content-Type": "application/json" },
        data: {
          name: name,
          email: email,
          accessToken: googleAccessToken,
        },
      };

      const { data } = await axios.request(options);

      if (data.success) {
        // Store user data and token
        await AsyncStorage.setItem("accessToken", data.accessToken);
        await AsyncStorage.setItem("user", JSON.stringify(data.data));

        setAccessToken(data.accessToken);
        setUser(data.data);

        return { success: true, data: data.data };
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const mockLogin = async (mockAccessToken, userData) => {
    try {
      // Store mock user data and token
      await AsyncStorage.setItem("accessToken", mockAccessToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      setAccessToken(mockAccessToken);
      setUser(userData);

      return { success: true, data: userData };
    } catch (error) {
      console.error("Mock login error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("user");
      setAccessToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getAuthHeaders = () => {
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  };

  const value = {
    user,
    accessToken,
    loading,
    isAuthenticated: !!user && !!accessToken,
    login,
    mockLogin,
    logout,
    getAuthHeaders,
    setUser,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
