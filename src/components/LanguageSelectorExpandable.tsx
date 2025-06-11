import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import {
  supportedLanguages,
  changeLanguage,
  getCurrentLanguage,
} from "../locales/i18n";

interface LanguageSelectorExpandableProps {
  className?: string;
}

export function LanguageSelectorExpandable({
  className = "",
}: LanguageSelectorExpandableProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentLanguage = getCurrentLanguage();
  const animationProgress = useSharedValue(0);
  const checkMark = "✓";

  const getCurrentLanguageFlag = () => {
    const language = supportedLanguages.find(
      (lang) => lang.code === currentLanguage
    );
    return language?.flag || "🇺🇸";
  };

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);

    animationProgress.value = withSpring(newState ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode);

    // Collapse after selection
    setIsExpanded(false);
    animationProgress.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  }; // Animated styles for the flag options dropdown
  const flagOptionsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [0, 0.3, 1],
      [0, 0, 1],
      "clamp"
    );

    return {
      opacity,
    };
  });

  return (
    <View className={`relative ${className}`} style={{ zIndex: 1001 }}>
      {/* Main button - always visible */}
      <View className="rounded-lg bg-background-secondary border border-border-light">
        <TouchableOpacity
          onPress={handleToggle}
          className="px-3 py-2 flex-row items-center justify-between"
          accessibilityRole="button"
          accessibilityLabel="Language selector"
          accessibilityHint={
            isExpanded ? "Collapse language options" : "Expand language options"
          }
        >
          <Text className="text-xl">{getCurrentLanguageFlag()}</Text>
          <Text className="text-xs text-text-secondary ml-2">
            {isExpanded ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Absolutely positioned dropdown overlay */}
      {isExpanded && (
        <Animated.View
          style={[flagOptionsStyle, { zIndex: 9999 }]}
          className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-background-secondary border border-border-light shadow-lg"
        >
          {supportedLanguages.map((language) => {
            const isCurrentLanguage = currentLanguage === language.code;

            return (
              <TouchableOpacity
                key={language.code}
                onPress={() => handleLanguageSelect(language.code)}
                className={`px-3 py-2 flex-row items-center justify-center relative ${
                  isCurrentLanguage ? "bg-primary-500/10" : ""
                } ${language.code === supportedLanguages[supportedLanguages.length - 1].code ? "rounded-b-lg" : ""}`}
                accessibilityRole="button"
                accessibilityLabel={`Select ${language.name}`}
              >
                <Text className="text-2xl">{language.flag}</Text>
                {isCurrentLanguage && (
                  <View className="absolute top-1 right-1 w-6 h-6 bg-primary-500 rounded-full justify-center items-center">
                    <Text className="text-white text-sm font-bold">
                      {checkMark}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      )}
    </View>
  );
}
