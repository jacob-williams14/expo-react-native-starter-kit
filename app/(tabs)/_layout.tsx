import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import "~/global.css";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

import { Header } from "~/components/navigation/HeaderButton";
import HeaderNav from "~/components/navigation/HeaderNav";
import { useThemeColors } from "~/hooks/useThemeColors";
import { COLORS } from "~/lib/theme/constants";

export default function Layout() {
  const isAndroid = Platform.OS === "android";
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();

  return (
    <Tabs
      backBehavior="none"
      screenOptions={{
        header: (props: BottomTabHeaderProps) => <HeaderNav {...props} />,
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.primary[500],
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: isAndroid ? insets.bottom : 0,
          paddingTop: 10,
          height: isAndroid ? 70 + insets.bottom : 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          fontFamily: "Inter",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Get Started",
          headerTitle: "Get Started",
          headerRight: () => <Header.ThemeToggle />,
          headerShadowVisible: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "rocket" : "rocket-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Toolkit",
          headerTitle: "Toolkit",
          headerRight: () => <Header.ThemeToggle />,
          headerShadowVisible: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "construct" : "construct-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
