// Google OAuth Configuration
// You'll need to replace these values with your actual Google Cloud Project credentials

import Constants from "expo-constants";
import * as AuthSession from "expo-auth-session";

export const GOOGLE_OAUTH_CONFIG = {
  // Real Google OAuth 2.0 Client ID from Google Cloud Console
  GOOGLE_CLIENT_ID:
    "36022447291-6fak7c3gsr1p7jgvu58lnerumvs077c7.apps.googleusercontent.com",

  // Real Google OAuth 2.0 Client Secret (for web)
  GOOGLE_CLIENT_SECRET: "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",

  // OAuth scopes for accessing Gmail API
  SCOPES: [
    "openid",
    "profile",
    "email",
    "https://www.googleapis.com/auth/gmail.readonly", // Read Gmail messages
    // "https://www.googleapis.com/auth/gmail.send", // Send emails (optional)
    // "https://www.googleapis.com/auth/gmail.modify", // Modify Gmail messages (optional)
  ],

  // Gmail API endpoints
  GMAIL_API_BASE: "https://gmail.googleapis.com/gmail/v1",

  // Google OAuth endpoints
  AUTH_ENDPOINT: "https://accounts.google.com/o/oauth2/v2/auth",
  TOKEN_ENDPOINT: "https://oauth2.googleapis.com/token",
  USERINFO_ENDPOINT: "https://www.googleapis.com/oauth2/v2/userinfo",

  // Redirect URI - this will be automatically set by Expo
  get REDIRECT_URI() {
    return "https://auth.expo.io/@gunesh.munjal/zashit-finance";
  },
};

// Helper function to get Gmail API headers
export const getGmailHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
});

// Helper function to check if Gmail scopes are granted
export const hasGmailScopes = (grantedScopes) => {
  const requiredScopes = ["https://www.googleapis.com/auth/gmail.readonly"];

  return requiredScopes.every(
    (scope) => grantedScopes && grantedScopes.includes(scope)
  );
};
