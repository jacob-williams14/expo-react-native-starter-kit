import { ExpoConfig } from "expo/config";

export default (): ExpoConfig => ({
  name: "expo-react-native-starter-kit",
  slug: "expo-react-native-starter-kit",
  version: "0.0.0",
  scheme: undefined,
  runtimeVersion: {
    policy: "fingerprint",
  },
  userInterfaceStyle: "automatic",
  orientation: "default",
  ios: {
    bundleIdentifier: "com.expo.reactnativestarterkit",
    appleTeamId: undefined,
    infoPlist: {},
    // associatedDomains: [],
  },
  android: {
    package: "com.expo.reactnativestarterkit",
    permissions: [],
    // intentFilters: [
    //   {
    //     action: "VIEW",
    //     autoVerify: true,
    //     data: {
    //       scheme: "https",
    //     },
    //     category: ["BROWSABLE", "DEFAULT"],
    //   },
    // ],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-dev-client",
      {
        launchMode: "launcher",
      },
    ],
    [
      "expo-font",
      {
        fonts: [],
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
  owner: undefined,
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: undefined,
    },
  },
});
