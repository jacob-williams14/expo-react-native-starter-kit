import { ExpoConfig } from "expo/config";

const APP_VARIANT = process.env.EXPO_PUBLIC_APP_VARIANT;

// Centralized variant configuration mapping
const VARIANT_CONFIG = {
  development: {
    bundleName: "React Native Starter Kit (Dev)",
    bundleIdentifier: "com.jwill.reactnativestarterkit.dev",
    packageName: "com.jwill.exporeactnativestarterkit.app.dev",
    scheme: "jwillstarterkitdev",
  },
  staging: {
    bundleName: "React Native Starter Kit (Staging)",
    bundleIdentifier: "com.jwill.reactnativestarterkit",
    packageName: "com.jwill.exporeactnativestarterkit.app",
    scheme: "jwillstarterkit",
  },
} as const;

// Helper function to get configuration for current variant
function getVariantConfig(
  key: "bundleName" | "bundleIdentifier" | "packageName" | "scheme"
): string | undefined {
  return VARIANT_CONFIG[APP_VARIANT as keyof typeof VARIANT_CONFIG]?.[key];
}

// Clean constant accessors
const bundleName = getVariantConfig("bundleName");
const bundleIdentifier = getVariantConfig("bundleIdentifier");
const packageName = getVariantConfig("packageName");
const scheme = getVariantConfig("scheme");

export default (): ExpoConfig => ({
  name: bundleName ?? "expo-react-native-starter-kit",
  slug: "expo-react-native-starter-kit",
  version: "0.0.0",
  scheme,
  runtimeVersion: {
    policy: "fingerprint",
  },
  platforms: ["ios", "android"],
  userInterfaceStyle: "automatic",
  orientation: "portrait",
  ios: {
    bundleIdentifier,
    appleTeamId: undefined,
    infoPlist: {},
    // associatedDomains: [],
  },
  android: {
    package: packageName,
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
    [
      "react-native-edge-to-edge",
      {
        android: {
          parentTheme: "Default",
          enforceNavigationBarContrast: false,
        },
      },
    ],
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
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
  updates: {
    url: "https://u.expo.dev/YOUR_PROJECT_ID",
  },
});
