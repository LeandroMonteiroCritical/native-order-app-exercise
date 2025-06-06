import { useState, useCallback } from "react";
import * as Speech from "expo-speech";

interface SpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(
    async (text: string, options?: SpeechOptions) => {
      try {
        // Stop any currently speaking text
        if (isSpeaking) {
          await Speech.stop();
        }

        setIsSpeaking(true);

        const speechOptions: Speech.SpeechOptions = {
          language: options?.language || "en-US",
          pitch: options?.pitch || 1.0,
          rate: options?.rate || 1.0,
          volume: options?.volume || 1.0,
          onStart: () => setIsSpeaking(true),
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false),
          onError: (error) => {
            console.error("Speech error:", error);
            setIsSpeaking(false);
          },
        };

        await Speech.speak(text, speechOptions);
      } catch (error) {
        console.error("Speech error:", error);
        setIsSpeaking(false);
      }
    },
    [isSpeaking]
  );

  const stop = useCallback(async () => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
    } catch (error) {
      console.error("Stop speech error:", error);
    }
  }, []);

  const getAvailableVoices = useCallback(async () => {
    try {
      return await Speech.getAvailableVoicesAsync();
    } catch (error) {
      console.error("Get voices error:", error);
      return [];
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    getAvailableVoices,
  };
};
