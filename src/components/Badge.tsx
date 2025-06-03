import { View, Text } from "react-native";

type BadgeVariant =
  | "gold"
  | "silver"
  | "bronze"
  | "success"
  | "warning"
  | "error"
  | "info";

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  gold: { bg: "bg-yellow-100", text: "text-yellow-800" },
  silver: { bg: "bg-gray-100", text: "text-gray-800" },
  bronze: { bg: "bg-orange-100", text: "text-orange-800" },
  success: { bg: "bg-green-100", text: "text-green-800" },
  warning: { bg: "bg-yellow-100", text: "text-yellow-800" },
  error: { bg: "bg-red-100", text: "text-red-800" },
  info: { bg: "bg-blue-100", text: "text-blue-800" },
};

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
}

export function Badge({ variant, label }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <View className={`px-2.5 py-0.5 rounded-full ${styles.bg}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{label}</Text>
    </View>
  );
}
