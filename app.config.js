export default {
  expo: {
    name: "ZashIt Finance",
    slug: "zashit-finance",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.zashit.finance",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.zashit.finance",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    scheme: "zashit-finance",
    extra: {
      googleClientId:
        "979302956161-lkprbbqrskv3o4kocaapn6a7bofcnj7u.apps.googleusercontent.com", // Replace with your actual Google OAuth client ID
      apiBaseUrl: "https://zashit-backend-production.up.railway.app/api/v1",
    },
  },
};
