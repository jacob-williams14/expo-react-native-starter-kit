import { Stack } from "expo-router";

import { Header } from "~/components/navigation/HeaderButton";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerRight: () => <Header.ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
}
