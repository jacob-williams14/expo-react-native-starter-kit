import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { QueryClient } from "@tanstack/react-query";

import "~/global.css";

import { Header } from "~/components/navigation/HeaderButton";
import HeaderNav from "~/components/navigation/HeaderNav";
import { useColorScheme } from "~/hooks/useColorScheme";
import { AppProvider } from "~/providers/AppProvider";

export const unstable_settings = {
  // Push the initial route onto the stack when deep linking, even if it's to another screen
  // https://docs.expo.dev/router/advanced/router-settings/
  initialRouteName: "index",
};

void SplashScreen.preventAutoHideAsync();

const useInitializeApp = () => {
  const { setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeTheme = async () => {
      setColorScheme("light");
    };

    void Promise.allSettled([initializeTheme()]).then(() => {
      setIsReady(true);
      void SplashScreen.hideAsync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isReady,
    isDarkColorScheme,
  };
};

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { isDarkColorScheme } = useInitializeApp();

  return (
    <AppProvider
      queryClient={queryClient}
      isDarkColorScheme={isDarkColorScheme}
    >
      <Stack
        initialRouteName="index"
        screenOptions={{ header: (props) => <HeaderNav {...props} /> }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="dev/index"
          options={{
            title: "Dev Menu",
            headerShadowVisible: false,
            headerLeft: () => <Header.Back />,
            headerRight: () => <Header.ThemeToggle />,
          }}
        />
      </Stack>
    </AppProvider>
  );
}
