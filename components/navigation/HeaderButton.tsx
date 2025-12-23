import { useRouter } from "expo-router";

import IconButton from "~/components/general/iconButton";
import { useColorScheme } from "~/hooks/useColorScheme";
import { config } from "~/lib/config";

/**
 * Header button components for navigation
 * Provides consistent styling and behavior for header actions
 */

const Back = () => {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <IconButton
      iconName="chevron-left"
      onPress={handleBack}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      accessibilityHint="Navigate to the previous screen"
    />
  );
};

const Profile = () => {
  const router = useRouter();

  const handleDevScreen = () => {
    if (config.isDevEnabled) {
      router.push("/dev");
    }
  };

  return (
    <IconButton
      iconName="account-outline"
      onPress={() => {}}
      onLongPress={() => handleDevScreen()}
      accessibilityRole="button"
      accessibilityLabel="Go to profile"
      accessibilityHint="Navigate to the profile screen"
    />
  );
};

const Search = () => {
  return (
    <IconButton
      iconName="magnify"
      onPress={() => {}}
      accessibilityRole="button"
      accessibilityLabel="Search"
      accessibilityHint="Navigate to the search screen"
    />
  );
};

const ThemeToggle = () => {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <IconButton
      iconName={isDarkColorScheme ? "weather-sunny" : "weather-night"}
      iconSize={24}
      iconClassName="text-primary-500"
      onPress={toggleColorScheme}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDarkColorScheme ? "light" : "dark"} mode`}
      accessibilityHint="Toggle between light and dark theme"
    />
  );
};

export const Header = {
  Back,
  Profile,
  Search,
  ThemeToggle,
};
