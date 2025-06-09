import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import gmailService from "../services/gmailService";

export default function GmailExample() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadGmailData();
  }, []);

  const loadGmailData = async () => {
    try {
      setLoading(true);

      // Get Gmail profile
      const profileData = await gmailService.getProfile();
      setProfile(profileData);

      // Get recent messages
      const recentMessages = await gmailService.listMessages({ maxResults: 5 });
      setMessages(recentMessages.messages || []);

      // Get unread message count
      const unreadMessages = await gmailService.getUnreadMessages(1);
      setUnreadCount(unreadMessages.resultSizeEstimate || 0);
    } catch (error) {
      console.error("Gmail Error:", error);
      Alert.alert("Gmail Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchEmails = async (query) => {
    try {
      setLoading(true);
      const searchResults = await gmailService.searchMessages(query, 10);
      setMessages(searchResults.messages || []);
      Alert.alert(
        "Search Complete",
        `Found ${searchResults.messages?.length || 0} messages`
      );
    } catch (error) {
      console.error("Search Error:", error);
      Alert.alert("Search Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMessageDetails = async (messageId) => {
    try {
      const message = await gmailService.getMessage(messageId, "metadata");
      const headers = gmailService.getEmailHeaders(message);

      Alert.alert(
        "Email Details",
        `From: ${headers.from}\nSubject: ${headers.subject}\nDate: ${headers.date}`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Message Error:", error);
      Alert.alert("Error", "Failed to get message details");
    }
  };

  const sendTestEmail = async () => {
    try {
      setLoading(true);

      Alert.prompt(
        "Send Test Email",
        "Enter recipient email:",
        async (email) => {
          if (email) {
            await gmailService.sendEmail(
              email,
              "Test Email from React Native App",
              "This is a test email sent from the React Native app using Gmail API!"
            );
            Alert.alert("Success", "Email sent successfully!");
          }
        }
      );
    } catch (error) {
      console.error("Send Error:", error);
      Alert.alert("Send Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Gmail Profile Section */}
      {profile && (
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Gmail Profile
          </Text>
          <Text className="text-gray-600">Email: {profile.emailAddress}</Text>
          <Text className="text-gray-600">
            Total Messages: {profile.messagesTotal}
          </Text>
          <Text className="text-gray-600">Threads: {profile.threadsTotal}</Text>
          <Text className="text-blue-600 font-semibold">
            Unread: {unreadCount}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Gmail Actions
        </Text>

        <TouchableOpacity
          onPress={loadGmailData}
          disabled={loading}
          className="bg-blue-500 rounded-lg p-3 mb-2 flex-row items-center justify-center"
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">
            {loading ? "Loading..." : "Refresh Gmail Data"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => searchEmails("is:unread")}
          disabled={loading}
          className="bg-orange-500 rounded-lg p-3 mb-2 flex-row items-center justify-center"
        >
          <Ionicons name="mail-unread" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">
            Get Unread Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => searchEmails("has:attachment")}
          disabled={loading}
          className="bg-green-500 rounded-lg p-3 mb-2 flex-row items-center justify-center"
        >
          <Ionicons name="attach" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">
            Search Attachments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={sendTestEmail}
          disabled={loading}
          className="bg-purple-500 rounded-lg p-3 flex-row items-center justify-center"
        >
          <Ionicons name="send" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Send Test Email</Text>
        </TouchableOpacity>
      </View>

      {/* Search Examples */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Quick Searches
        </Text>

        <View className="flex-row flex-wrap">
          {[
            { label: "Important", query: "is:important" },
            { label: "Last 7 Days", query: "newer_than:7d" },
            { label: "From Banks", query: "from:bank" },
            { label: "Starred", query: "is:starred" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => searchEmails(item.query)}
              disabled={loading}
              className="bg-gray-100 rounded-lg px-3 py-2 mr-2 mb-2"
            >
              <Text className="text-gray-700 text-sm">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Messages */}
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Recent Messages ({messages.length})
        </Text>

        {messages.length === 0 ? (
          <Text className="text-gray-500 text-center py-4">
            No messages to display
          </Text>
        ) : (
          messages.map((message, index) => (
            <TouchableOpacity
              key={message.id}
              onPress={() => getMessageDetails(message.id)}
              className="border-b border-gray-100 py-3 last:border-b-0"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Message ID:</Text>
                  <Text className="text-gray-600 text-sm">{message.id}</Text>
                  <Text className="text-gray-500 text-xs">
                    Thread: {message.threadId}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Usage Tips */}
      <View className="bg-blue-50 rounded-xl p-4 mt-4">
        <Text className="text-blue-800 font-bold mb-2">💡 Usage Tips</Text>
        <Text className="text-blue-700 text-sm mb-1">
          • Tap messages to see details
        </Text>
        <Text className="text-blue-700 text-sm mb-1">
          • Use search queries like "from:bank@example.com"
        </Text>
        <Text className="text-blue-700 text-sm mb-1">
          • Try "subject:invoice" or "newer_than:3d"
        </Text>
        <Text className="text-blue-700 text-sm">
          • Check console logs for detailed API responses
        </Text>
      </View>
    </ScrollView>
  );
}
