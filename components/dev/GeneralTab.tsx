import Constants from "expo-constants";
import { ScrollView, View } from "react-native";

import { AuthDebugTools } from "./AuthDebugTools";
import { CollapsibleGroup, Large, P } from "~/components/ui";

export function GeneralTab() {
  const version = Constants.expoConfig?.version;

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4 p-6">
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

      <CollapsibleGroup title="Auth Debug Tools" contentClassName="gap-3">
        <AuthDebugTools />
      </CollapsibleGroup>
    </ScrollView>
  );
}
