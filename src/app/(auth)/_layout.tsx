import { Stack } from "expo-router";
import { colors } from "../../constants/colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 350,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        animationTypeForReplace: "push",
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
        // Add presentation mode to prevent white flash
        presentation: "card",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          animation: "fade",
          animationDuration: 400,
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
        }}
      />
    </Stack>
  );
}
