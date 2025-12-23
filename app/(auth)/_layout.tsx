import { Stack } from "expo-router";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { Header } from "~/components/navigation/HeaderButton";
import HeaderNav from "~/components/navigation/HeaderNav";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        header: (props: NativeStackHeaderProps) => <HeaderNav {...props} />,
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
