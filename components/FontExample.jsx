import React from "react";
import { View, Text } from "react-native";

const FontExample = () => {
  return (
    <View className="p-6 bg-white">
      {/* Cirka fonts for headings and titles */}
      <Text className="font-heading text-3xl text-gray-900 mb-4">
        Heading with Cirka Bold
      </Text>

      <Text className="font-title text-2xl text-gray-800 mb-4">
        Title with Cirka
      </Text>

      <Text className="font-display text-xl text-gray-700 mb-6">
        Display text with Cirka
      </Text>

      {/* Gilroy fonts for body text */}
      <Text className="font-body text-base text-gray-600 mb-4">
        This is body text using Gilroy Regular. It's perfect for readable
        content and general text throughout your app.
      </Text>

      <Text className="font-sans font-medium text-base text-gray-600 mb-4">
        This is medium weight Gilroy text for slightly emphasized content.
      </Text>

      <Text className="font-gilroy font-semibold text-base text-gray-600 mb-4">
        This is semi-bold Gilroy text for more emphasis.
      </Text>

      <Text className="font-gilroy font-bold text-base text-gray-600 mb-6">
        This is bold Gilroy text for strong emphasis.
      </Text>

      {/* Overpass Mono for monospace text */}
      <Text className="font-mono text-sm text-gray-800 bg-gray-100 p-3 rounded mb-4">
        This is Overpass Mono for code: const example = "monospace text";
      </Text>

      <Text className="font-overpass font-semibold text-sm text-gray-800 bg-gray-100 p-3 rounded">
        Overpass Mono SemiBold: function boldCode() {`{`} return true; {`}`}
      </Text>
    </View>
  );
};

export default FontExample;
