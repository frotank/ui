# Google OAuth & Gmail API Setup Guide

This guide will help you set up Google OAuth authentication with Gmail API access for your React Native app.

## 1. Prerequisites

- Google Cloud Console account
- React Native development environment
- Expo CLI (if using Expo)

## 2. Google Cloud Console Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID

### Step 2: Enable APIs

1. Go to "APIs & Services" > "Library"
2. Search and enable these APIs:
   - **Google+ API** (for user profile)
   - **Gmail API** (for email access)
   - **Google OAuth2 API**

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure the OAuth consent screen first if prompted:
   - Choose "External" user type
   - Fill in app information
   - Add scopes: `email`, `profile`, `openid`
   - Add Gmail scopes: `https://www.googleapis.com/auth/gmail.readonly`

### Step 4: Create Client IDs

You'll need different client IDs for different platforms:

#### For Android:

1. Application type: Android
2. Package name: Your app's package name (check `app.json` > `android.package`)
3. SHA-1 certificate fingerprint:
   ```bash
   # For development (debug keystore)
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```

#### For iOS:

1. Application type: iOS
2. Bundle ID: Your app's bundle identifier (check `app.json` > `ios.bundleIdentifier`)

#### For Web/Expo Development:

1. Application type: Web application
2. Authorized redirect URIs: Add your Expo development URLs

   ```
   https://auth.expo.io/@your-expo-username/your-project-name
   exp://127.0.0.1:19000/--/
   exp://localhost:19000/--/
   projectfuncpro://
   ```

   **Note**: Replace `projectfuncpro` with your app's scheme from `app.json`

## 3. Configure Your App

### Step 1: Update Configuration

Edit `config/googleAuth.js` and replace the placeholder values:

```javascript
export const GOOGLE_OAUTH_CONFIG = {
  // Replace with your actual Google OAuth 2.0 Client ID
  GOOGLE_CLIENT_ID: "YOUR_ACTUAL_CLIENT_ID_HERE",

  // Replace with your actual Google OAuth 2.0 Client Secret (for web)
  GOOGLE_CLIENT_SECRET: "YOUR_ACTUAL_CLIENT_SECRET_HERE",

  // ... rest of the config
};
```

### Step 2: For Expo Projects

If using Expo, you may also need to configure `app.json`:

```json
{
  "expo": {
    "scheme": "your-app-scheme",
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

## 4. Testing the Integration

### Step 1: Test Authentication

1. Run your app: `expo start` or `npm start`
2. Navigate to the Google Auth screen
3. Tap "Continue with Google"
4. Complete the OAuth flow
5. Check console logs for success messages

### Step 2: Test Gmail API Access

After successful authentication, check the console for:

- `✅ Gmail API access confirmed for: [email]`
- `📬 Found X recent messages`

### Step 3: Use Gmail Service

```javascript
import gmailService from "../services/gmailService";

// Example usage in a component
const testGmailAccess = async () => {
  try {
    // Get Gmail profile
    const profile = await gmailService.getProfile();
    console.log("Gmail Profile:", profile);

    // Get recent messages
    const messages = await gmailService.listMessages({ maxResults: 5 });
    console.log("Recent Messages:", messages);

    // Search for specific emails
    const searchResults = await gmailService.searchMessages(
      "from:noreply@example.com"
    );
    console.log("Search Results:", searchResults);

    // Get unread messages
    const unreadMessages = await gmailService.getUnreadMessages();
    console.log("Unread Messages:", unreadMessages);
  } catch (error) {
    console.error("Gmail API Error:", error);
  }
};
```

## 5. Available Gmail Operations

The `gmailService` provides these methods:

### Reading Emails

- `getProfile()` - Get Gmail profile info
- `listMessages(options)` - List messages with filters
- `getMessage(messageId)` - Get specific message details
- `searchMessages(query)` - Search messages by query
- `getUnreadMessages()` - Get unread messages
- `getMessagesFromSender(email)` - Get messages from specific sender
- `getMessagesBySubject(subject)` - Get messages by subject

### Sending Emails

- `sendEmail(to, subject, body, isHtml)` - Send an email

### Utility Methods

- `getEmailHeaders(message)` - Extract email headers
- `getEmailBody(message)` - Extract email body content

## 6. Gmail Search Queries

You can use Gmail's powerful search syntax:

```javascript
// Search examples
await gmailService.searchMessages("from:bank@example.com");
await gmailService.searchMessages('subject:"Credit Card Statement"');
await gmailService.searchMessages("is:unread");
await gmailService.searchMessages("has:attachment");
await gmailService.searchMessages("label:important");
await gmailService.searchMessages("newer_than:7d");
```

## 7. Error Handling

The service includes comprehensive error handling:

```javascript
try {
  const messages = await gmailService.listMessages();
} catch (error) {
  if (error.message.includes("No Google access token")) {
    // Redirect to auth screen
    navigation.navigate("GoogleAuth");
  } else {
    // Handle other API errors
    console.error("Gmail API Error:", error);
  }
}
```

## 8. Privacy & Permissions

### Scopes Requested

- `openid` - Basic authentication
- `profile` - User profile information
- `email` - User email address
- `gmail.readonly` - Read Gmail messages
- `gmail.send` - Send emails (optional)

### Best Practices

1. Only request scopes you actually need
2. Clearly explain to users what data you'll access
3. Store tokens securely using AsyncStorage
4. Implement token refresh logic for production
5. Follow Google's API usage policies

## 9. Troubleshooting

### Common Issues

#### "OAuth not ready" Error

- Check that GOOGLE_CLIENT_ID is set correctly
- Verify the client ID matches your platform (Android/iOS/Web)

#### "Gmail API access failed" Error

- Ensure Gmail API is enabled in Google Cloud Console
- Check that the correct scopes are requested
- Verify the access token is valid

#### "Authentication required" Error

- User needs to re-authenticate
- Check if token has expired
- Redirect to GoogleAuthScreen

#### Platform-specific Issues

- **Android**: Verify SHA-1 fingerprint is correct
- **iOS**: Check bundle identifier matches
- **Expo**: Ensure redirect URIs include Expo URLs

### Debug Tips

1. Check console logs for detailed error messages
2. Test with different Google accounts
3. Verify API quotas in Google Cloud Console
4. Use Google's OAuth 2.0 Playground for testing

## 10. Production Considerations

1. **Token Refresh**: Implement refresh token logic
2. **Error Recovery**: Handle network errors gracefully
3. **Rate Limiting**: Respect Gmail API rate limits
4. **Security**: Store client secrets securely (backend only)
5. **Privacy Policy**: Update to reflect Gmail data usage
