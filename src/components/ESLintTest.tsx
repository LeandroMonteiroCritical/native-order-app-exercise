import React from "react";
import { View, Text } from "react-native";

// This file demonstrates ESLint catching text rendering issues

export const TestComponent = () => {
  return (
    <View>
      {/* ❌ This should trigger an error - whitespace expression */}
      <View>
        <Text>Some content</Text>
      </View>

      {/* ❌ This should trigger an error - raw text outside Text */}
      <View>Raw text here</View>

      {/* ✅ This is correct - text inside Text component */}
      <Text>Properly wrapped text</Text>
    </View>
  );
};
