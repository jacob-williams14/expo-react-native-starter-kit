import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Button } from "~/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  const handleAllowLocationAccess = () => {
    void Location.requestForegroundPermissionsAsync().then((status) => {
      if (status.granted) {
        console.log("Location access granted");
      } else {
        console.log("Location access denied");
      }
    });
  };

  const handleAllowNotifications = () => {
    void Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        console.log("Notifications access granted");
      } else {
        console.log("Notifications access denied");
      }
    });
  };

  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="px-5 py-6">
        {/* Welcome Section */}
        <View className="bg-primary-500 rounded-2xl p-6 mb-5">
          <Text className="text-2xl font-bold text-white mb-2">
            Welcome Back
          </Text>
          <Text className="text-base text-white/90 leading-5">
            Here's what's happening with your projects today.
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row mb-5" style={{ gap: 12 }}>
          <View className="flex-1 bg-white rounded-xl p-4">
            <View className="bg-primary-100 w-12 h-12 rounded-xl items-center justify-center mb-3">
              <Ionicons name="folder" size={24} color="#fd4f57" />
            </View>
            <Text className="text-2xl font-bold text-secondary-900 mb-0.5">
              12
            </Text>
            <Text className="text-sm text-neutral-600">Projects</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4">
            <View className="bg-tertiary-100 w-12 h-12 rounded-xl items-center justify-center mb-3">
              <Ionicons name="checkmark-circle" size={24} color="#16cbc4" />
            </View>
            <Text className="text-2xl font-bold text-secondary-900 mb-0.5">
              48
            </Text>
            <Text className="text-sm text-neutral-600">Tasks</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white rounded-xl p-5 mb-5">
          <View className="flex-row items-center mb-4">
            <Ionicons name="time-outline" size={22} color="#fd4f57" />
            <Text className="text-lg font-bold text-secondary-900 ml-2">
              Recent Activity
            </Text>
          </View>

          {[
            {
              title: "Mobile App Design",
              time: "2 hours ago",
              icon: "phone-portrait-outline",
              color: "#fd4f57",
            },
            {
              title: "Backend API Update",
              time: "5 hours ago",
              icon: "server-outline",
              color: "#16cbc4",
            },
            {
              title: "Database Migration",
              time: "1 day ago",
              icon: "cloud-upload-outline",
              color: "#4cacd4",
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-3"
              style={{
                borderBottomWidth: index < 2 ? 1 : 0,
                borderBottomColor: "#f5f5f5",
              }}
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 bg-neutral-50 rounded-lg items-center justify-center mr-3">
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color={item.color}
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-secondary-900 mb-0.5">
                  {item.title}
                </Text>
                <Text className="text-sm text-neutral-500">{item.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c3c3c3" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-xl p-5 mb-5">
          <View className="flex-row items-center mb-4">
            <Ionicons name="flash" size={22} color="#fd4f57" />
            <Text className="text-lg font-bold text-secondary-900 ml-2">
              Quick Actions
            </Text>
          </View>
          <View style={{ gap: 10 }}>
            <Button
              className="bg-primary-500 rounded-xl p-4 flex-row items-center justify-center"
              onPress={() => {
                handleAllowLocationAccess();
              }}
            >
              <Ionicons name="location-outline" size={20} color="#ffffff" />
              <Text className="text-white font-bold text-base ml-2">
                Allow Location Access
              </Text>
            </Button>
            <Button
              className="bg-neutral-100 rounded-xl p-4 flex-row items-center justify-center"
              onPress={() => {
                router.push("/dev");
              }}
            >
              <Ionicons name="build-outline" size={20} color="#5e5a56" />
              <Text className="text-secondary-900 font-semibold text-base ml-2">
                View Dev Tools
              </Text>
            </Button>
            <Button
              className="bg-tertiary-500 rounded-xl p-4 flex-row items-center justify-center"
              onPress={() => {
                handleAllowNotifications();
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#ffffff"
              />
              <Text className="text-white font-semibold text-base ml-2">
                Allow Notifications
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
