import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChangeText,
  onClear,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-background-secondary border border-border-light rounded-lg px-3 py-2 mx-4 mb-4">
      <TextInput
        className="flex-1 text-text-primary text-base"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && onClear && (
        <TouchableOpacity
          onPress={onClear}
          className="ml-2 w-6 h-6 rounded-full bg-border-medium justify-center items-center"
        >
          <Text className="text-text-primary text-sm">×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
