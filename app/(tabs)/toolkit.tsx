import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { H3, P, Text } from "~/components/ui";
import {
  MaterialCommunityIconName,
  MaterialCommunityIcons,
} from "~/lib/icons/material-community-icons";
import { COLORS } from "~/lib/theme/constants";

const toolkitFeatures: Array<{
  title: string;
  description: string;
  icon: MaterialCommunityIconName;
  route: string | null;
  tab?: string;
}> = [
  {
    title: "Dev Tools",
    description: "Built-in development utilities and debugging tools",
    icon: "hammer-wrench",
    route: "/dev",
    tab: "general",
  },
  {
    title: "Design System",
    description: "Complete UI component library with NativeWind styling",
    icon: "palette",
    route: "/dev",
    tab: "design",
  },
  {
    title: "Authentication",
    description: "Mock auth context ready to swap with your provider",
    icon: "shield-account",
    route: null,
  },
  {
    title: "Navigation",
    description: "Expo Router with file-based routing and layouts",
    icon: "navigation-variant",
    route: null,
  },
  {
    title: "State Management",
    description: "Zustand stores for scalable global state",
    icon: "database",
    route: null,
  },
  {
    title: "Data Fetching",
    description: "TanStack Query configured for server state",
    icon: "cloud-download",
    route: null,
  },
  {
    title: "Forms",
    description: "TanStack Form for type-safe form management",
    icon: "form-textbox",
    route: null,
  },
  {
    title: "Testing",
    description: "Jest + React Testing Library + MSW test harness",
    icon: "test-tube",
    route: null,
  },
];

export default function ToolkitPage() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-5 py-6">
        <View className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="toolbox"
              size={32}
              color={COLORS.primary[500]}
            />
            <H3 className="ml-3">What's Included</H3>
          </View>
          <P className="leading-5">
            This starter kit comes with everything you need to build a
            production-ready React Native app.
          </P>
        </View>

        <View className="gap-3">
          {toolkitFeatures.map((feature, index) => (
            <TouchableOpacity
              key={index}
              className="bg-card rounded-xl p-5 border border-border"
              activeOpacity={feature.route ? 0.7 : 1}
              onPress={() => {
                if (feature.route) {
                  router.push({
                    pathname: feature.route,
                    params: feature.tab ? { tab: feature.tab } : undefined,
                  });
                }
              }}
            >
              <View className="flex-row items-start">
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: `${COLORS.primary[500]}15` }}
                >
                  <MaterialCommunityIcons
                    name={feature.icon}
                    size={24}
                    color={COLORS.primary[500]}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold mb-1">
                    {feature.title}
                  </Text>
                  <Text variant="muted" className="leading-5">
                    {feature.description}
                  </Text>
                </View>
                {feature.route && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={COLORS.neutral[400]}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
