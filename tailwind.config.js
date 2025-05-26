/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./routes/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          "Inter_400Regular",
          "Inter_500Medium",
          "Inter_600SemiBold",
          "Inter_700Bold",
        ],
        display: ["Inter_600SemiBold", "Inter_700Bold"],
        body: ["Inter_400Regular", "Inter_500Medium"],
        heading: ["Inter_600SemiBold", "Inter_700Bold"],
      },
      colors: {
        primary: {
          50: "#eff6ff", // Very light blue
          100: "#dbeafe", // Light blue
          200: "#bfdbfe", // Lighter blue
          300: "#93c5fd", // Light blue
          400: "#60a5fa", // Medium blue
          500: "#3b82f6", // Main trustworthy blue
          600: "#2563eb", // Deeper blue
          700: "#1d4ed8", // Dark blue
          800: "#1e40af", // Darker blue
          900: "#1e3a8a", // Very dark blue
        },
        trust: {
          50: "#f0f9ff", // Very light trust blue
          100: "#e0f2fe", // Light trust blue
          200: "#bae6fd", // Lighter trust blue
          300: "#7dd3fc", // Light trust blue
          400: "#38bdf8", // Medium trust blue
          500: "#0ea5e9", // Main trust blue
          600: "#0284c7", // Deeper trust blue
          700: "#0369a1", // Dark trust blue
          800: "#075985", // Darker trust blue
          900: "#0c4a6e", // Very dark trust blue
        },
      },
    },
  },
  plugins: [],
};
