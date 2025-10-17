import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "expo-react-native-starter-kit",
  slug: "expo-react-native-starter-kit",
  scheme: "acme",
  userInterfaceStyle: "automatic",
  orientation: "default",
  ios: {
    bundleIdentifier: "com.expo.reactnativestarterkit",
  },
  android: {
    package: "com.expo.reactnativestarterkit",
  },
  web: {
    output: "static",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: "https://n",
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "expo-react-native-starter-kit needs your location to find stores near you.",
        locationWhenInUsePermission:
          "expo-react-native-starter-kit needs your location to find stores near you.",
      },
    ],
  ],
});
