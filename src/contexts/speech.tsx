import React, { createContext, useContext, useCallback } from "react";
import { useSpeech } from "../hooks/useSpeech";

interface SpeechContextType {
  speakText: (text: string, options?: { language?: string }) => Promise<void>;
  stopSpeaking: () => Promise<void>;
  isSpeaking: boolean;
}

const SpeechContext = createContext<SpeechContextType | null>(null);

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const { speak, stop, isSpeaking } = useSpeech();

  const speakText = useCallback(
    async (text: string, options?: { language?: string }) => {
      await speak(text, { language: options?.language || "en-US" });
    },
    [speak]
  );

  const stopSpeaking = useCallback(async () => {
    await stop();
  }, [stop]);

  return (
    <SpeechContext.Provider
      value={{
        speakText,
        stopSpeaking,
        isSpeaking,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeechContext() {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error("useSpeechContext must be used within a SpeechProvider");
  }
  return context;
}
