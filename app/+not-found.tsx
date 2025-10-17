import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View className="flex-1 items-center justify-center bg-neutral-50 p-6">
        <View className="items-center">
          <Ionicons name="alert-circle-outline" size={120} color="#fd4f57" />
          <Text className="text-4xl font-bold text-secondary-900 mt-6 mb-3">
            404
          </Text>
          <Text className="text-xl font-semibold text-secondary-700 mb-2">
            Page Not Found
          </Text>
          <Text className="text-base text-neutral-600 text-center mb-8">
            Sorry, we couldn't find the page you're looking for.
          </Text>
          <Link href="/" className="bg-primary-500 px-8 py-4 rounded-xl">
            <Text className="text-white font-bold text-base">Go to Home</Text>
          </Link>
        </View>
      </View>
    </>
  );
}
