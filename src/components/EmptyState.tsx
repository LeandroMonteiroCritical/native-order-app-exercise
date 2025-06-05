import { View, Text } from "react-native";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center p-8">
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-xl font-semibold text-text-primary mb-2 text-center">
        {title}
      </Text>
      <Text className="text-text-secondary text-center mb-6 max-w-sm">
        {description}
      </Text>
      {actionLabel && onAction && (
        <Button variant="primary" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}
