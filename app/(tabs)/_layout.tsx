import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import "~/global.css";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

import { Header } from "~/components/navigation/HeaderButton";
import HeaderNav from "~/components/navigation/HeaderNav";
import { COLORS } from "~/lib/theme/constants";

export default function Layout() {
  const isAndroid = Platform.OS === "android";
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      backBehavior="none"
      screenOptions={{
        header: (props: BottomTabHeaderProps) => <HeaderNav {...props} />,
        tabBarActiveTintColor: COLORS.primary[500],
        tabBarInactiveTintColor: COLORS.secondary[300],
        tabBarStyle: {
          backgroundColor: COLORS.base.white,
          borderTopColor: COLORS.neutral[300],
          borderTopWidth: 1,
          paddingBottom: isAndroid ? insets.bottom : 0,
          paddingTop: 10,
          height: isAndroid ? 70 + insets.bottom : 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Home",
          headerLeft: () => <Header.Profile />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerTitle: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
