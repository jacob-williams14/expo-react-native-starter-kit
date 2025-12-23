import { Link } from "expo-router";
import { View } from "react-native";

import { Text } from "~/components/ui";
import { MaterialCommunityIcons } from "~/lib/icons/material-community-icons";
import { COLORS } from "~/lib/theme/constants";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-6">
      <View className="items-center">
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={120}
          color={COLORS.primary[500]}
        />
        <Text className="text-4xl font-bold mt-6 mb-3">404</Text>
        <Text className="text-xl font-semibold mb-2">Page Not Found</Text>
        <Text variant="muted" className="text-center mb-8">
          Sorry, we couldn't find the page you're looking for.
        </Text>
        <Link href="/(tabs)" className="bg-primary-500 px-8 py-4 rounded-xl">
          <Text className="text-white font-bold text-base">Go Home</Text>
        </Link>
      </View>
    </View>
  );
}
