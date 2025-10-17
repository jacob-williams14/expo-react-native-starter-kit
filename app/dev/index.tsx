import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { DesignSystemTab } from "~/components/dev/DesignTab";
import { GeneralTab } from "~/components/dev/GeneralTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { H2, Text } from "~/components/ui/text";

export default function DevComponentScreen() {
  const [tabValue, setTabValue] = useState("general");
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-neutral-50 pt-safe">
      <View className="p-6 gap-6">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-white active:bg-neutral-100"
          >
            <Ionicons name="arrow-back" size={24} color="#4c4845" />
          </TouchableOpacity>
          <H2>Developer Tools</H2>
        </View>
        <Tabs value={tabValue} onValueChange={setTabValue}>
          <TabsList>
            <TabsTrigger value="general">
              <Text>General</Text>
            </TabsTrigger>
            <TabsTrigger value="design">
              <Text>Design System</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>
          <TabsContent value="design">
            <DesignSystemTab />
          </TabsContent>
        </Tabs>
      </View>
    </ScrollView>
  );
}
