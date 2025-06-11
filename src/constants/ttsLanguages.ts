// TTS Language mapping for supported languages
export const getTTSLanguage = (languageCode: string): string => {
  const languageMap: Record<string, string> = {
    en: "en-US",
    fr: "fr-FR",
    pt: "pt-BR", // or 'pt-PT' for European Portuguese
  };

  return languageMap[languageCode] || "en-US";
};

// Export language-specific TTS options
export const getTTSOptions = (languageCode: string) => {
  const language = getTTSLanguage(languageCode);

  // Optional: Adjust speech parameters per language
  const languageOptions: Record<string, { pitch: number; rate: number }> = {
    "en-US": { pitch: 1.0, rate: 1.0 },
    "fr-FR": { pitch: 1.1, rate: 0.9 }, // Slightly higher pitch, slower rate
    "pt-BR": { pitch: 1.0, rate: 0.95 },
  };

  return {
    language,
    ...languageOptions[language],
  };
};
