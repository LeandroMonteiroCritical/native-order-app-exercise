import { View, Text, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className="space-y-2">
      {label && (
        <Text className="text-sm font-medium text-text-primary">{label}</Text>
      )}
      <TextInput
        className={`
          h-12 px-3 py-3 rounded-lg border text-center bg-background-secondary text-text-primary
          ${error ? "border-error-500" : "border-border-light"}
          ${props.editable === false ? "bg-background-tertiary" : ""}
        `}
        placeholderTextColor="#94a3b8"
        {...props}
      />
      {error && <Text className="text-sm text-error-500">{error}</Text>}
    </View>
  );
}
