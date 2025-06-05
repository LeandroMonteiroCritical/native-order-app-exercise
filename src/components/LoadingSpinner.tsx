import { View, ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "large",
  color = "#0ea5e9",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <View className={`flex-1 justify-center items-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
