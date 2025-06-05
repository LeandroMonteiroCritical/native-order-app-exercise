import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantStyles: Record<ButtonVariant, { button: string; text: string }> = {
  primary: {
    button: "bg-primary-500 active:bg-primary-600",
    text: "text-white",
  },
  secondary: {
    button: "bg-background-secondary active:bg-background-tertiary",
    text: "text-text-primary",
  },
  outline: {
    button: "border border-border-light active:bg-background-secondary",
    text: "text-text-primary",
  },
  ghost: {
    button: "active:bg-background-secondary",
    text: "text-text-primary",
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

  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(0.8, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={animatedStyle}
      className={`
        h-10 px-4 rounded-lg justify-center items-center
        ${styles.button}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "white" : "#ffffff"}
        />
      ) : (
        <Text className={`text-sm font-medium ${styles.text}`}>{children}</Text>
      )}
    </AnimatedTouchableOpacity>
  );
}
