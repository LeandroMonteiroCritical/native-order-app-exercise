import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import {
  supportedLanguages,
  changeLanguage,
  getCurrentLanguage,
} from "../locales/i18n";

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const currentLanguage = getCurrentLanguage();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const checkMark = "✓";
  const cancelText = "Cancel";
  const selectLanguageText = "Select Language";

  const getCurrentLanguageFlag = () => {
    const language = supportedLanguages.find(
      (lang) => lang.code === currentLanguage
    );
    return language?.flag || "🇺🇸";
  };

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        className={`px-3 py-2 rounded-lg bg-background-secondary border border-border-light ${className}`}
        accessibilityRole="button"
        accessibilityLabel="Select language"
        accessibilityHint="Opens language selection menu"
      >
        <Text className="text-xl">{getCurrentLanguageFlag()}</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={() => setIsVisible(false)}
        statusBarTranslucent
      >
        {/* Full screen backdrop with pink background */}
        <TouchableOpacity
          className="flex-1 justify-center items-center px-5 py-10"
          style={{ backgroundColor: "rgba(255, 192, 203, 0.5)" }}
          onPress={() => setIsVisible(false)}
          activeOpacity={1}
        >
          {/* Modal content - prevent backdrop close when tapping inside */}
          <TouchableOpacity activeOpacity={1}>
            <Animated.View
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown.springify().damping(15)}
              className="bg-background-primary rounded-lg shadow-lg"
              style={{
                width: Math.min(320, screenWidth * 0.85),
                maxHeight: screenHeight * 0.7,
                borderWidth: 3,
                borderColor: "white",
                elevation: 10, // Android shadow
                shadowColor: "#000", // iOS shadow
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              {/* Header */}
              <View className="p-4 border-b border-border-light">
                <Text className="text-lg font-semibold text-text-primary text-center">
                  {selectLanguageText}
                </Text>
              </View>

              {/* Language Options */}
              <View className="py-2">
                {supportedLanguages.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    onPress={() => handleLanguageSelect(language.code)}
                    className={`p-4 flex-row items-center gap-4 ${
                      currentLanguage === language.code
                        ? "bg-primary-500/10"
                        : ""
                    }`}
                    accessibilityRole="button"
                    accessibilityLabel={`Select ${language.name}`}
                  >
                    <Text className="text-2xl">{language.flag}</Text>
                    <View className="flex-1">
                      <Text className="text-text-primary font-medium text-base">
                        {language.nativeName}
                      </Text>
                      <Text className="text-text-secondary text-sm">
                        {language.name}
                      </Text>
                    </View>
                    {currentLanguage === language.code && (
                      <View className="w-6 h-6 bg-primary-500 rounded-full justify-center items-center">
                        <Text className="text-white text-sm font-bold">
                          {checkMark}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Footer */}
              <View className="p-4 border-t border-border-light">
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
                  className="py-2"
                  accessibilityRole="button"
                  accessibilityLabel="Close language selection"
                >
                  <Text className="text-center text-text-secondary font-medium">
                    {cancelText}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
