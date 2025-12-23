import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DesignSystemTab } from "~/components/dev/DesignTab";
import { GeneralTab } from "~/components/dev/GeneralTab";
import { TabGroup } from "~/components/ui";

export default function DevComponentScreen() {
  const { bottom } = useSafeAreaInsets();
  const { tab } = useLocalSearchParams<{ tab?: string }>();

  const tabs = [
    {
      value: "general",
      label: "General",
      content: <GeneralTab />,
    },
    {
      value: "design",
      label: "Design System",
      content: <DesignSystemTab />,
    },
  ];

  return (
    <View className="flex-1 bg-background" style={{ paddingBottom: bottom }}>
      <TabGroup
        tabs={tabs}
        defaultValue={tab || "general"}
        showContent={true}
        showTabShadow
        tabBackgroundColor="bg-transparent"
      />
    </View>
  );
}
