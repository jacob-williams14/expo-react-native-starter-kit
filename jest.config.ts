/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "<rootDir>/jest.setupSuppressWarnings.ts",
    "<rootDir>/jest.setup.ts",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(" +
      "react-native|" +
      "@react-native.*|" +
      "@react-navigation.*|" +
      "@expo.*|" +
      "expo.*|" +
      "react-native-.*|" +
      "@rn-primitives|nativewind|tailwindcss|" +
      "msw|@mswjs|until-async|" +
      "))",
  ],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  coverageProvider: "v8",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testEnvironment: "node",
  maxWorkers: "50%",
  verbose: true,
  cache: true,
};

export default config;
