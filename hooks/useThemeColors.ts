import { useColorScheme } from "~/hooks/useColorScheme";
import { NAV_THEME } from "~/lib/theme/constants";

/**
 * Custom hook to get theme colors based on the current color scheme
 *
 * @returns Object with color values for light and dark modes
 */
export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  return NAV_THEME[colorScheme];
}
