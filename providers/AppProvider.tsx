import { SystemBars } from "react-native-edge-to-edge";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import type { Theme } from "@react-navigation/native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Sheets } from "~/components/action-sheets/sheets";
import { AuthProvider } from "~/lib/contexts/AuthContext";
import { NAV_THEME } from "~/lib/theme/constants";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export function AppProvider({
  children,
  queryClient,
  isDarkColorScheme,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
  isDarkColorScheme: boolean;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SystemBars style={isDarkColorScheme ? "light" : "dark"} />
      <PortalHost />
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SheetProvider>
            <Sheets />
            <AuthProvider>
              <SafeAreaProvider>
                <KeyboardProvider>{children}</KeyboardProvider>
              </SafeAreaProvider>
            </AuthProvider>
          </SheetProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
