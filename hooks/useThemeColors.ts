import { useColorScheme } from "react-native";

/**
 * Custom hook to get theme colors based on the current color scheme
 *
 * @returns Object with color values for light and dark modes
 */
export function useThemeColors() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    isDark,
    background: isDark ? "#171717" : "#fafafa",
    foreground: isDark ? "#fafafa" : "#171717",
    card: isDark ? "#262626" : "#ffffff",
    text: isDark ? "#fafafa" : "#5e5a56",
    textSecondary: isDark ? "#a3a3a3" : "#9a9693",
    border: isDark ? "#404040" : "#e5e5e5",
    primary: "#fd4f57",
    primaryLight: "#ffe5e6",
    secondary: "#5e5a56",
    tertiary: "#16cbc4",
  };
}
