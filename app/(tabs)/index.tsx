import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Checkbox, H3, P, Text } from "~/components/ui";
import { MaterialCommunityIcons } from "~/lib/icons/material-community-icons";
import { COLORS } from "~/lib/theme/constants";

const checklistItems = [
  {
    title: "Update app icon and splash screen",
    description: "Replace placeholder assets with your brand",
  },
  {
    title: "Customize color palette",
    description: "Adjust theme colors in global.css and constants.ts",
  },
  {
    title: "Set up authentication",
    description: "Replace mock auth with your auth provider",
  },
  {
    title: "Configure environment variables",
    description: "Update .envrc with your API keys and endpoints",
  },
  {
    title: "Choose native dependencies",
    description: "Add analytics, crash reporting, or other SDKs",
  },
  {
    title: "Set up CI/CD pipelines",
    description: "Configure EAS builds and GitHub Actions",
  },
  {
    title: "Review app.config.ts",
    description: "Update app name, bundle ID, and build settings",
  },
];

const CHECKLIST_STORAGE_KEY = "@starter_kit_checklist";

export default function GetStartedPage() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // Load checked state from AsyncStorage on mount
  useEffect(() => {
    const loadCheckedState = async () => {
      try {
        const stored = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY);
        if (stored) {
          setCheckedItems(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load checklist state:", error);
      }
    };
    void loadCheckedState();
  }, []);

  // Save checked state to AsyncStorage whenever it changes
  const handleCheckChange = async (index: number, checked: boolean) => {
    const newCheckedItems = { ...checkedItems, [index]: checked };
    setCheckedItems(newCheckedItems);
    try {
      await AsyncStorage.setItem(
        CHECKLIST_STORAGE_KEY,
        JSON.stringify(newCheckedItems)
      );
    } catch (error) {
      console.error("Failed to save checklist state:", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-5 py-6">
        {/* Welcome Section */}
        <View className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="rocket-launch"
              size={32}
              color={COLORS.primary[500]}
            />
            <H3 className="ml-3">Welcome to Your Starter Kit</H3>
          </View>
          <P className="leading-5">
            This checklist will help you customize and configure your app. Check
            out the Toolkit tab to explore what's included.
          </P>
        </View>

        {/* Checklist */}
        <View className="bg-card rounded-2xl p-5 border border-border">
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              size={22}
              color={COLORS.primary[500]}
            />
            <Text className="text-lg font-bold ml-2">
              Getting Started Checklist
            </Text>
          </View>

          <View className="gap-4">
            {checklistItems.map((item, index) => (
              <View
                key={index}
                className="flex-row gap-3 pb-4"
                style={{
                  borderBottomWidth: index < checklistItems.length - 1 ? 1 : 0,
                  borderBottomColor: COLORS.neutral[200],
                }}
              >
                <View className="pt-0.5">
                  <Checkbox
                    checked={checkedItems[index] ?? false}
                    onCheckedChange={(checked) =>
                      handleCheckChange(index, checked)
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold mb-1">
                    {item.title}
                  </Text>
                  <Text variant="muted">{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
