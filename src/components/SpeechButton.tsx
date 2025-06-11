import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useSpeech } from "../hooks/useSpeech";
import { getCurrentLanguage } from "../locales/i18n";
import { getTTSOptions } from "../constants/ttsLanguages";

interface SpeechButtonProps {
  text: string;
  language?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "icon";
}

export function SpeechButton({
  text,
  language, // Optional override, otherwise uses current app language
  children,
  className = "",
  variant = "icon",
}: SpeechButtonProps) {
  const { speak, stop, isSpeaking } = useSpeech();
  const scale = useSharedValue(1);

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const handlePress = async () => {
    // Haptic feedback for accessibility
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isSpeaking) {
      await stop();
    } else {
      // Get current language and TTS options
      const currentLang = language || getCurrentLanguage();
      const ttsOptions = getTTSOptions(currentLang);

      // Start speaking with language-specific options
      await speak(text, ttsOptions);

      // Animation for speaking state
      scale.value = withSequence(
        withSpring(1.1, { damping: 15 }),
        withSpring(1.0, { damping: 15 })
      );
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          container:
            "bg-primary-500 px-3 py-2 rounded-lg flex-row items-center",
          text: "text-white text-sm font-medium ml-2",
        };
      case "secondary":
        return {
          container:
            "bg-background-secondary border border-border-light px-3 py-2 rounded-lg flex-row items-center",
          text: "text-text-primary text-sm font-medium ml-2",
        };
      case "icon":
      default:
        return {
          container:
            "w-8 h-8 rounded-full bg-primary-500/20 justify-center items-center",
          text: "text-primary-500 text-lg",
        };
    }
  };

  const styles = getVariantStyles();
  return (
    <AnimatedTouchableOpacity
      onPress={handlePress}
      style={animatedStyle}
      className={`${styles.container} ${className}`}
      accessibilityRole="button"
      accessibilityLabel={isSpeaking ? "Stop reading text" : "Read text aloud"}
      accessibilityHint={
        isSpeaking
          ? "Tap to stop speech"
          : "Tap to hear this content spoken aloud"
      }
      accessibilityState={{ selected: isSpeaking }}
    >
      {children || (
        <>
          <Text className={styles.text}>{isSpeaking ? "⏸" : "🔊"}</Text>
          {variant !== "icon" && (
            <Text className={styles.text}>
              {isSpeaking ? "Stop" : "Listen"}
            </Text>
          )}
        </>
      )}
    </AnimatedTouchableOpacity>
  );
}
