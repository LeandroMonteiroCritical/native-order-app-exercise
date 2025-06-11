import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translations
import en from "./en.json";
import fr from "./fr.json";
import pt from "./pt.json";

const LANGUAGE_STORAGE_KEY = "app_language";

// Language detection
const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  // eslint-disable-next-line no-unused-vars
  detect: async (callback: (lng: string) => void) => {
    try {
      // Check if user has previously selected a language
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // Fall back to device language
      const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";
      const supportedLanguages = ["en", "fr", "pt"];
      const language = supportedLanguages.includes(deviceLanguage)
        ? deviceLanguage
        : "en";
      callback(language);
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error("Error detecting language:", error);
      callback("en");
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error("Error saving language:", error);
    }
  },
};

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  pt: { translation: pt },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: __DEV__,

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Enable pluralization
    pluralSeparator: "_",
    contextSeparator: "_",

    // Cache configuration
    load: "languageOnly", // Remove country code from language
  });

export default i18n;

// Export supported languages for the language selector
export const supportedLanguages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
  },
];

// Helper function to change language
export const changeLanguage = async (languageCode: string) => {
  try {
    await i18n.changeLanguage(languageCode);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error("Error changing language:", error);
  }
};

// Helper function to get current language
export const getCurrentLanguage = () => i18n.language || "en";
