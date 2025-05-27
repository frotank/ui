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
        // Inter for headings and titles (replacing Cirka)
        heading: ["Inter_700Bold", "Inter_600SemiBold"],
        title: ["Inter_700Bold", "Inter_600SemiBold"],
        display: ["Inter_700Bold", "Inter_600SemiBold"],

        // Poppins for body text and general content (replacing Gilroy)
        body: ["Poppins_400Regular", "Poppins_500Medium"],
        sans: [
          "Poppins_400Regular",
          "Poppins_500Medium",
          "Poppins_600SemiBold",
          "Poppins_700Bold",
        ],
        gilroy: [
          "Poppins_400Regular",
          "Poppins_500Medium",
          "Poppins_600SemiBold",
          "Poppins_700Bold",
        ],

        // Inter alternative mapping
        inter: [
          "Inter_400Regular",
          "Inter_500Medium",
          "Inter_600SemiBold",
          "Inter_700Bold",
        ],

        // Poppins alternative mapping
        poppins: [
          "Poppins_400Regular",
          "Poppins_500Medium",
          "Poppins_600SemiBold",
          "Poppins_700Bold",
        ],

        // Overpass Mono for monospace text
        mono: [
          "OverpassMono_400Regular",
          "OverpassMono_600SemiBold",
          "OverpassMono_700Bold",
        ],
        overpass: [
          "OverpassMono_400Regular",
          "OverpassMono_600SemiBold",
          "OverpassMono_700Bold",
        ],
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
        // Modern finance app colors inspired by Dribbble reference
        finance: {
          light: "#ACD5E8", // Light blue
          medium: "#8CB2C7", // Medium blue-gray
          soft: "#CAE6EF", // Soft light blue
          primary: "#719BB2", // Primary blue-gray
          dark: "#0B0D0E", // Near black
          accent: "#52A6F5", // Bright blue accent
          muted: "#5F7775", // Muted gray-green
        },
      },
    },
  },
  plugins: [],
};
