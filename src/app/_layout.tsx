import "../global.css";
import "../locales/i18n"; // Initialize i18n
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/auth";
import { SpeechProvider } from "../contexts/speech";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

function RouteGuard() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, segments, isLoading, router]);
  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center bg-background-primary"
        style={{ backgroundColor: "#0f172a" }}
      >
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }
  return (
    <View
      className="flex-1 bg-background-primary"
      style={{ backgroundColor: "#0f172a" }}
    >
      <Slot />
    </View>
  );
}

export default function Layout() {
  return (
    <View
      className="flex-1 bg-background-primary"
      style={{ backgroundColor: "#0f172a" }}
    >
      <AuthProvider>
        <SpeechProvider>
          <StatusBar style="light" />
          <RouteGuard />
        </SpeechProvider>
      </AuthProvider>
    </View>
  );
}
