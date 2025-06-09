import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_OAUTH_CONFIG, getGmailHeaders } from "../config/googleAuth";

class GmailService {
  constructor() {
    this.baseUrl = GOOGLE_OAUTH_CONFIG.GMAIL_API_BASE;
  }

  // Get access token from storage
  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem("googleAccessToken");
      if (!token) {
        throw new Error("No Google access token found. Please sign in again.");
      }
      return token;
    } catch (error) {
      console.error("❌ Error getting access token:", error);
      throw error;
    }
  }

  // Get user's Gmail profile
  async getProfile() {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseUrl}/users/me/profile`, {
        headers: getGmailHeaders(accessToken),
      });

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error getting Gmail profile:", error);
      throw error;
    }
  }

  // List messages with optional query
  async listMessages(options = {}) {
    try {
      const accessToken = await this.getAccessToken();
      const {
        maxResults = 10,
        query = "",
        labelIds = [],
        includeSpamTrash = false,
      } = options;

      const params = new URLSearchParams({
        maxResults: maxResults.toString(),
        includeSpamTrash: includeSpamTrash.toString(),
      });

      if (query) params.append("q", query);
      if (labelIds.length > 0) {
        labelIds.forEach((labelId) => params.append("labelIds", labelId));
      }

      const response = await fetch(
        `${this.baseUrl}/users/me/messages?${params}`,
        {
          headers: getGmailHeaders(accessToken),
        }
      );

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error listing messages:", error);
      throw error;
    }
  }

  // Get a specific message by ID
  async getMessage(messageId, format = "full") {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(
        `${this.baseUrl}/users/me/messages/${messageId}?format=${format}`,
        {
          headers: getGmailHeaders(accessToken),
        }
      );

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error getting message:", error);
      throw error;
    }
  }

  // Search messages by query
  async searchMessages(query, maxResults = 10) {
    return this.listMessages({ query, maxResults });
  }

  // Get messages from a specific sender
  async getMessagesFromSender(email, maxResults = 10) {
    return this.searchMessages(`from:${email}`, maxResults);
  }

  // Get unread messages
  async getUnreadMessages(maxResults = 10) {
    return this.listMessages({ query: "is:unread", maxResults });
  }

  // Get messages with specific subject
  async getMessagesBySubject(subject, maxResults = 10) {
    return this.searchMessages(`subject:"${subject}"`, maxResults);
  }

  // Send an email
  async sendEmail(to, subject, body, isHtml = false) {
    try {
      const accessToken = await this.getAccessToken();

      // Create the email in RFC 2822 format
      const email = [
        `To: ${to}`,
        `Subject: ${subject}`,
        `Content-Type: ${isHtml ? "text/html" : "text/plain"}; charset=utf-8`,
        "",
        body,
      ].join("\r\n");

      // Encode the email in base64url format
      const encodedEmail = btoa(email)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const response = await fetch(`${this.baseUrl}/users/me/messages/send`, {
        method: "POST",
        headers: {
          ...getGmailHeaders(accessToken),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error sending email:", error);
      throw error;
    }
  }

  // Get email headers helper
  getEmailHeaders(message) {
    const headers = message.payload?.headers || [];
    const headerMap = {};

    headers.forEach((header) => {
      headerMap[header.name.toLowerCase()] = header.value;
    });

    return {
      from: headerMap.from || "",
      to: headerMap.to || "",
      subject: headerMap.subject || "",
      date: headerMap.date || "",
      messageId: headerMap["message-id"] || "",
    };
  }

  // Extract email body (simplified)
  getEmailBody(message) {
    const payload = message.payload;

    if (payload.body && payload.body.data) {
      // Simple text/html body
      return this.decodeBase64Url(payload.body.data);
    } else if (payload.parts) {
      // Multipart message
      for (const part of payload.parts) {
        if (part.mimeType === "text/plain" || part.mimeType === "text/html") {
          if (part.body && part.body.data) {
            return this.decodeBase64Url(part.body.data);
          }
        }
      }
    }

    return "Email body not available";
  }

  // Decode base64url
  decodeBase64Url(str) {
    try {
      // Convert base64url to base64
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      // Add padding if needed
      const padded = base64 + "===".slice(0, (4 - (base64.length % 4)) % 4);
      return atob(padded);
    } catch (error) {
      console.error("❌ Error decoding base64url:", error);
      return "Error decoding content";
    }
  }
}

// Export a singleton instance
export const gmailService = new GmailService();
export default gmailService;
