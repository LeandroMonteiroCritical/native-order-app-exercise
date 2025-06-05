import { View, Text, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className="space-y-2">
      {label && (
        <Text className="text-sm font-medium text-gray-900">{label}</Text>
      )}
      <TextInput
        className={`
          h-12 px-3 py-3 rounded-lg border text-center
          ${error ? "border-red-500" : "border-gray-200"}
          ${props.editable === false ? "bg-gray-50" : "bg-white"}
        `}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  );
}
