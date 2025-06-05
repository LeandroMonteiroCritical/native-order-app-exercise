import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { useEffect } from "react";

interface AnimatedHeaderProps {
  mode: "dashboard" | "order-details";
  title: string;
  subtitle?: string;
  badge?: {
    variant: string;
    label: string;
  };
  onBackPress?: () => void;
  onLogout?: () => void;
  showBackButton?: boolean;
}

export function AnimatedHeader({
  mode,
  title,
  subtitle,
  badge,
  onBackPress,
  onLogout,
  showBackButton = false,
}: AnimatedHeaderProps) {
  const headerHeight = useSharedValue(20); // Start much smaller for more visible animation
  const opacity = useSharedValue(0); // Start invisible

  useEffect(() => {
    // Animate to final state on mount with slower, more visible animation
    const finalHeight = mode === "dashboard" ? 80 : 120;
    headerHeight.value = withSpring(finalHeight, {
      damping: 15,
      stiffness: 60,
    });
    opacity.value = withSpring(1, {
      damping: 12,
      stiffness: 80,
    });
  }, [mode]);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
      opacity: opacity.value,
    };
  });
  const backButtonStyle = useAnimatedStyle(() => {
    const buttonOpacity = interpolate(
      headerHeight.value,
      [40, 120],
      [0, 1],
      "clamp"
    );

    return {
      opacity: buttonOpacity,
      transform: [
        {
          translateY: interpolate(
            headerHeight.value,
            [40, 120],
            [20, 0],
            "clamp"
          ),
        },
      ],
    };
  });

  const mainContentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: interpolate(
            headerHeight.value,
            [40, 120],
            [10, 0],
            "clamp"
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={animatedHeaderStyle}
      className={`bg-background-secondary border-b border-border-light justify-end ${
        mode === "order-details" ? "mb-4" : ""
      }`}
    >
      <View className="px-4 pb-4">
        {/* Back Button - Only visible in order details mode */}
        {showBackButton && (
          <Animated.View style={backButtonStyle} className="mb-3">
            <Button
              variant="ghost"
              onPress={onBackPress}
              className="self-start -ml-2"
            >
              ← Back to Orders
            </Button>
          </Animated.View>
        )}

        {/* Main Header Content */}
        <Animated.View
          style={mainContentStyle}
          className="flex-row justify-between items-center"
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-xl font-bold text-text-primary">{title}</Text>
            {badge && (
              <Badge variant={badge.variant as any} label={badge.label} />
            )}
          </View>

          {mode === "dashboard" && onLogout && (
            <Button variant="ghost" onPress={onLogout}>
              <Text>Logout</Text>
            </Button>
          )}
        </Animated.View>

        {/* Subtitle - Only for order details */}
        {subtitle && mode === "order-details" && (
          <Animated.View style={mainContentStyle}>
            <Text className="text-text-secondary mt-1">{subtitle}</Text>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
}
