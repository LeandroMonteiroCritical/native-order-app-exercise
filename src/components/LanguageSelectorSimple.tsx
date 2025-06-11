import React from "react";
import { TouchableOpacity, Text } from "react-native";
import {
  supportedLanguages,
  changeLanguage,
  getCurrentLanguage,
} from "../locales/i18n";

interface LanguageSelectorSimpleProps {
  className?: string;
}

export function LanguageSelectorSimple({
  className = "",
}: LanguageSelectorSimpleProps) {
  const currentLanguage = getCurrentLanguage();

  const getCurrentLanguageFlag = () => {
    const language = supportedLanguages.find(
      (lang) => lang.code === currentLanguage
    );
    return language?.flag || "🇺🇸";
  };

  const cycleToNextLanguage = async () => {
    const currentIndex = supportedLanguages.findIndex(
      (lang) => lang.code === currentLanguage
    );
    const nextIndex = (currentIndex + 1) % supportedLanguages.length;
    const nextLanguage = supportedLanguages[nextIndex];

    await changeLanguage(nextLanguage.code);
  };

  return (
    <TouchableOpacity
      onPress={cycleToNextLanguage}
      className={`px-3 py-2 rounded-lg bg-background-secondary border border-border-light ${className}`}
      accessibilityRole="button"
      accessibilityLabel="Cycle language"
      accessibilityHint="Tap to switch to next language"
    >
      <Text className="text-xl">{getCurrentLanguageFlag()}</Text>
    </TouchableOpacity>
  );
}
