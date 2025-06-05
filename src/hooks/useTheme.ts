import { colors } from "../constants/colors";

/**
 * Custom hook for accessing the centralized color scheme
 * Can be used when you need colors in JavaScript/TypeScript code
 * For styling with NativeWind, use the Tailwind classes directly
 */
export const useTheme = () => {
  return {
    colors,
    // Helper functions for common color patterns
    getColor: (
      colorKey: keyof typeof colors,
      shade?: keyof typeof colors.primary
    ) => {
      const colorGroup = colors[colorKey];
      if (typeof colorGroup === "object" && shade) {
        return (colorGroup as any)[shade];
      }
      return colorGroup;
    }, // Pre-defined semantic colors for common use cases
    semantic: {
      background: colors.background.primary, // Deep navy blue
      surface: colors.background.secondary,
      primary: colors.primary[500],
      secondary: colors.secondary[500],
      success: colors.success[500],
      error: colors.error[500],
      warning: colors.warning[500],
      textPrimary: colors.text.primary, // White text
      textSecondary: colors.text.secondary,
      border: colors.border.light,
    },
  };
};

export type Theme = ReturnType<typeof useTheme>;
