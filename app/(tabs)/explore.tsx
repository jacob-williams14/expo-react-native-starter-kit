import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ExplorePage() {
  const categories = [
    {
      id: 1,
      name: "Design",
      color: "bg-purple-500",
      icon: "color-palette",
      count: 24,
    },
    {
      id: 2,
      name: "Development",
      color: "bg-blue-500",
      icon: "code-slash",
      count: 32,
    },
    {
      id: 3,
      name: "Marketing",
      color: "bg-gold-500",
      icon: "megaphone",
      count: 18,
    },
    {
      id: 4,
      name: "Business",
      color: "bg-primary-500",
      icon: "briefcase",
      count: 15,
    },
  ];

  const featured = [
    {
      id: 1,
      title: "Getting Started with React Native",
      category: "Development",
      views: "1.2k",
      icon: "logo-react",
      color: "#4cacd4",
    },
    {
      id: 2,
      title: "Modern UI Design Principles",
      category: "Design",
      views: "890",
      icon: "brush",
      color: "#ba5c9f",
    },
    {
      id: 3,
      title: "Digital Marketing Strategies",
      category: "Marketing",
      views: "2.1k",
      icon: "trending-up",
      color: "#e4bf85",
    },
    {
      id: 4,
      title: "Business Growth Tactics",
      category: "Business",
      views: "1.5k",
      icon: "rocket",
      color: "#fd4f57",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="px-5 py-6">
        {/* Categories */}
        <View className="mb-5">
          <View className="flex-row items-center mb-3">
            <Ionicons name="grid-outline" size={20} color="#fd4f57" />
            <Text className="text-lg font-bold text-secondary-900 ml-2">
              Categories
            </Text>
          </View>
          <View className="flex-row flex-wrap" style={{ gap: 10 }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`${category.color} rounded-xl p-5`}
                style={{ width: "48%" }}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={category.icon as keyof typeof Ionicons.glyphMap}
                  size={24}
                  color="#ffffff"
                />
                <Text className="text-white font-bold text-base mt-2 mb-0.5">
                  {category.name}
                </Text>
                <Text className="text-white text-sm opacity-90">
                  {category.count} items
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Content */}
        <View className="bg-white rounded-xl p-5 mb-5">
          <View className="flex-row items-center mb-4">
            <Ionicons name="star" size={20} color="#fd4f57" />
            <Text className="text-lg font-bold text-secondary-900 ml-2">
              Featured Content
            </Text>
          </View>
          <View style={{ gap: 12 }}>
            {featured.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-neutral-50 rounded-xl p-4 flex-row items-center"
                activeOpacity={0.7}
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Ionicons
                    name={item.icon as keyof typeof Ionicons.glyphMap}
                    size={22}
                    color={item.color}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-secondary-900 mb-1">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-neutral-600">
                    {item.category}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="eye-outline" size={12} color="#9a9693" />
                    <Text className="text-xs text-neutral-600 ml-1">
                      {item.views}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#c3c3c3" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
