import { View } from "react-native";

import Constants from "expo-constants";
import { Button } from "~/components/ui/button";
import { Large, P, Text } from "~/components/ui/text";
import { CollapsibleGroup } from "../ui/collapsible";

export function GeneralTab() {
  const version = Constants.expoConfig?.version;
  return (
    <View className="gap-4 pt-4">
      {/* App Info Collapsible */}
      <CollapsibleGroup title="App Information" contentClassName="gap-3">
        <View className="flex-row justify-between">
          <P className="text-neutral-600">Version</P>
          <Large>{version}</Large>
        </View>
        <View className="flex-row justify-between">
          <P className="text-neutral-600">Build</P>
          <Large>Development</Large>
        </View>
        <View className="flex-row justify-between">
          <P className="text-neutral-600">Environment</P>
          <Large>Local</Large>
        </View>
        <View className="flex-row justify-between">
          <P className="text-neutral-600">Platform</P>
          <Large>React Native</Large>
        </View>
      </CollapsibleGroup>

      {/* Debug Actions Collapsible */}
      <CollapsibleGroup title="Debug Actions" contentClassName="gap-3">
        <Button variant="outline">
          <Text>Clear Tokens</Text>
        </Button>
        <Button variant="outline">
          <Text>Test API Request</Text>
        </Button>
        <Button variant="outline">
          <Text>Expire Auth Token</Text>
        </Button>
        <Button variant="destructive">
          <Text>Expire Refresh Token</Text>
        </Button>
      </CollapsibleGroup>
    </View>
  );
}
