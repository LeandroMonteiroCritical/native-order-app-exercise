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
  gold: { bg: "bg-warning-100", text: "text-warning-800" },
  silver: { bg: "bg-secondary-100", text: "text-secondary-800" },
  bronze: { bg: "bg-warning-200", text: "text-warning-900" },
  success: { bg: "bg-success-100", text: "text-success-800" },
  warning: { bg: "bg-warning-100", text: "text-warning-800" },
  error: { bg: "bg-error-100", text: "text-error-800" },
  info: { bg: "bg-primary-100", text: "text-primary-800" },
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
