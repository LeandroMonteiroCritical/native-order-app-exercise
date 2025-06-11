import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { SpeechButton } from "./SpeechButton";
import { LanguageSelectorExpandable } from "./LanguageSelectorExpandable";
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
  speechText?: string;
}

export function AnimatedHeader({
  mode,
  title,
  subtitle,
  badge,
  onBackPress,
  onLogout,
  showBackButton = false,
  speechText,
}: AnimatedHeaderProps) {
  const { t } = useTranslation();
  const headerHeight = useSharedValue(20);
  const opacity = useSharedValue(0);

  const backArrow = "←";
  const logoutText = "Logout";

  useEffect(() => {
    const finalHeight = mode === "dashboard" ? 100 : 140;
    headerHeight.value = withSpring(finalHeight, {
      damping: 15,
      stiffness: 60,
    });
    opacity.value = withSpring(1, {
      damping: 12,
      stiffness: 80,
    });
  }, [mode, headerHeight, opacity]);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
      opacity: opacity.value,
    };
  });

  const backButtonStyle = useAnimatedStyle(() => {
    const buttonOpacity = interpolate(
      headerHeight.value,
      [40, 140],
      [0, 1],
      "clamp"
    );

    return {
      opacity: buttonOpacity,
      transform: [
        {
          translateY: interpolate(
            headerHeight.value,
            [40, 140],
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
            [40, 140],
            [10, 0],
            "clamp"
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[animatedHeaderStyle, { zIndex: 1000 }]}
      className={`bg-background-secondary border-b border-border-light justify-end ${
        mode === "order-details" ? "mb-4" : ""
      }`}
    >
      <View className="px-4 pb-4 pt-2">
        {/* Back Button - Only visible in order details mode */}
        {showBackButton && (
          <Animated.View style={backButtonStyle} className="mb-3">
            <Button
              variant="ghost"
              onPress={onBackPress}
              className="self-start -ml-2"
            >
              <Text className="text-text-primary text-lg">
                {backArrow} {t("common.back")}
              </Text>
            </Button>
          </Animated.View>
        )}

        {/* Main Header Content */}
        <Animated.View style={mainContentStyle} className="space-y-2">
          {/* Main content with right-aligned controls */}
          <View className="flex-row items-start justify-between">
            {/* Left side: Title and Badge/Speech */}
            <View className="flex-1 space-y-2">
              {/* Title */}
              <Text className="text-xl font-bold text-text-primary">
                {title}
              </Text>

              {/* Badge and Speech Button (only in dashboard mode) */}
              {mode === "dashboard" && (badge || speechText) && (
                <View className="flex-row items-center gap-2">
                  {badge && (
                    <Badge variant={badge.variant as any} label={badge.label} />
                  )}
                  {speechText && (
                    <SpeechButton text={speechText} variant="icon" />
                  )}
                </View>
              )}

              {/* Badge and Speech Button for order details (inline with title) */}
              {mode === "order-details" && (badge || speechText) && (
                <View className="flex-row items-center gap-2 mt-2">
                  {badge && (
                    <Badge variant={badge.variant as any} label={badge.label} />
                  )}
                  {speechText && (
                    <SpeechButton text={speechText} variant="icon" />
                  )}
                </View>
              )}
            </View>

            {/* Right side: Logout and Language Selector stacked */}
            <View className="items-end space-y-1 ml-4">
              {/* Logout button on top */}
              {mode === "dashboard" && onLogout && (
                <Button variant="ghost" onPress={onLogout} className="py-1">
                  <Text className="text-text-primary text-sm">
                    {logoutText}
                  </Text>
                </Button>
              )}

              {/* Language selector beneath */}
              <LanguageSelectorExpandable />
            </View>
          </View>
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
