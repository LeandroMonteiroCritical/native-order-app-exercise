import { Stack } from "expo-router";
import { colors } from "../../constants/colors";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        animationDuration: 400,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
        // Ensure card presentation mode for consistent background
        presentation: "card",
        // Ensure consistent animation pattern
        animationTypeForReplace: "push",
        animationMatchesGesture: true,
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{
          animation: "fade_from_bottom",
          animationDuration: 400,
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
          // Dashboard should not be gesturable back since it's the main screen
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="orders/[id]"
        options={{
          animation: "fade_from_bottom",
          animationDuration: 400,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
          presentation: "card",
          animationMatchesGesture: true,
          // Ensure consistent animation direction
          animationTypeForReplace: "push",
        }}
      />
    </Stack>
  );
}
