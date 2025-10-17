import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function ProfilePage() {
  const stats = [
    { label: "Projects", value: "12", icon: "folder-open", color: "#fd4f57" },
    {
      label: "Completed",
      value: "48",
      icon: "checkmark-done",
      color: "#16cbc4",
    },
    { label: "In Progress", value: "8", icon: "timer", color: "#4cacd4" },
  ];

  const settings = [
    { id: 1, title: "Edit Profile", icon: "create-outline", color: "#fd4f57" },
    {
      id: 2,
      title: "Notifications",
      icon: "notifications-outline",
      color: "#16cbc4",
    },
    {
      id: 3,
      title: "Privacy & Security",
      icon: "shield-checkmark-outline",
      color: "#ba5c9f",
    },
    {
      id: 4,
      title: "Help & Support",
      icon: "help-circle-outline",
      color: "#4cacd4",
    },
    {
      id: 5,
      title: "About",
      icon: "information-circle-outline",
      color: "#e4bf85",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="px-5 py-6">
        {/* Profile Header */}
        <View className="bg-primary-500 rounded-2xl p-6 mb-5 items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-3">
            <Ionicons name="person" size={48} color="#fd4f57" />
          </View>
          <Text className="text-xl font-bold text-white mb-1">John Doe</Text>
          <Text className="text-sm text-white/90 mb-3">
            john.doe@example.com
          </Text>
          <View className="bg-white/20 px-4 py-1.5 rounded-full">
            <Text className="text-white text-sm font-semibold">
              Premium Member
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row mb-5" style={{ gap: 10 }}>
          {stats.map((stat, index) => (
            <View
              key={index}
              className="flex-1 bg-white rounded-xl p-4 items-center"
            >
              <View
                className="w-10 h-10 rounded-lg items-center justify-center mb-2"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Ionicons
                  name={stat.icon as any}
                  size={20}
                  color={stat.color}
                />
              </View>
              <Text className="text-xl font-bold text-secondary-900 mb-0.5">
                {stat.value}
              </Text>
              <Text className="text-xs text-neutral-600 text-center">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View className="bg-white rounded-xl p-5 mb-5">
          <View className="flex-row items-center mb-4">
            <Ionicons name="settings" size={20} color="#fd4f57" />
            <Text className="text-lg font-bold text-secondary-900 ml-2">
              Settings
            </Text>
          </View>
          <View>
            {settings.map((setting, index) => (
              <Button
                key={setting.id}
                variant="ghost"
                className="flex-row items-center py-3 rounded-none"
                style={{
                  borderBottomWidth: index < settings.length - 1 ? 1 : 0,
                  borderBottomColor: "#f5f5f5",
                }}
              >
                <View
                  className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                  style={{ backgroundColor: `${setting.color}15` }}
                >
                  <Ionicons
                    name={setting.icon as any}
                    size={20}
                    color={setting.color}
                  />
                </View>
                <Text className="flex-1 text-base text-secondary-900 font-semibold">
                  {setting.title}
                </Text>
                <Ionicons name="chevron-forward" size={18} color="#c3c3c3" />
              </Button>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <Button
          variant="default"
          className="bg-primary-500 rounded-xl p-4 flex-row items-center justify-center mb-5"
        >
          <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          <Text className="text-white font-bold text-base ml-2">Logout</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
