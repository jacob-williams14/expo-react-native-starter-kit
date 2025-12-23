import { View } from "react-native";

import { DesignSystemTab } from "~/components/dev/DesignTab";
import { GeneralTab } from "~/components/dev/GeneralTab";
import { TabGroup } from "~/components/ui";

export default function DevComponentScreen() {
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
    <View className="flex-1 bg-background">
      <TabGroup
        tabs={tabs}
        defaultValue="general"
        showContent={true}
        showTabShadow
        tabBackgroundColor="bg-transparent"
      />
    </View>
  );
}
