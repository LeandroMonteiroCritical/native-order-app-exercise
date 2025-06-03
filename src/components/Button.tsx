import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantStyles: Record<ButtonVariant, { button: string; text: string }> = {
  primary: {
    button: "bg-gray-900 active:bg-gray-800",
    text: "text-white",
  },
  secondary: {
    button: "bg-gray-100 active:bg-gray-200",
    text: "text-gray-900",
  },
  outline: {
    button: "border border-gray-200 active:bg-gray-100",
    text: "text-gray-900",
  },
  ghost: {
    button: "active:bg-gray-100",
    text: "text-gray-900",
  },
};

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  onPress,
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const styles = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`
        h-10 px-4 rounded-lg justify-center items-center
        ${styles.button}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "white" : "black"} />
      ) : (
        <Text className={`text-sm font-medium ${styles.text}`}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
