import AsyncStorage from "@react-native-async-storage/async-storage";

type Environment = "development" | "staging";

const ENVIRONMENT_STORAGE_KEY = "@environment";

const APP_VARIANT = process.env.EXPO_PUBLIC_APP_VARIANT;

const isDevEnabled = APP_VARIANT !== "production";

let currentEnvironment: Environment =
  (process.env.EXPO_PUBLIC_API_ENVIRONMENT as Environment) || "development";

// Load saved environment on init
void AsyncStorage.getItem(ENVIRONMENT_STORAGE_KEY).then((saved) => {
  if (saved as Environment) {
    currentEnvironment = saved as Environment;
  }
});

const environments = {
  development: {
    apiUrl: "",
  },
  staging: {
    apiUrl: "",
  },
};

export const setEnvironment = isDevEnabled
  ? (env: Environment) => {
      currentEnvironment = env;
      // Save to persistent storage
      void AsyncStorage.setItem(ENVIRONMENT_STORAGE_KEY, env);
    }
  : undefined;

export const config = {
  get apiUrl() {
    return environments[currentEnvironment].apiUrl;
  },
  isDevEnabled,
  getCurrentEnvironment: isDevEnabled
    ? (): Environment => currentEnvironment
    : undefined,
  appVariant: APP_VARIANT,
};
