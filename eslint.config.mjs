import prettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginA11y from "eslint-plugin-jsx-a11y";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactNative from "eslint-plugin-react-native";
import pluginTestingLibrary from "eslint-plugin-testing-library";

import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/dist/*",
      "**/node_modules/*",
      "**/coverage/*",
      "**/.expo/*",
      "**/build/*",
      "**/.turbo/*",
      "**/android/*",
      "**/ios/*",
      "tailwind.config.js",
      "babel.config.js",
      "metro.config.js",
      "jest.config.js",
      "postcss.config.js",
      "*.config.js",
      "**/*.cjs",
      "eslint.config.mjs",
      "index.js",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
      "react-native": pluginReactNative,
      prettier: pluginPrettier,
      import: pluginImport,
      "jsx-a11y": pluginA11y,
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...tseslint.configs["eslint-recommended"].rules,
      ...tseslint.configs.recommended.rules,
      ...pluginA11y.configs.recommended.rules,
      "import/no-duplicates": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-floating-promises": [
        "error",
        { checkThenables: true },
      ],
      "@typescript-eslint/no-deprecated": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-native-gesture-handler",
              message:
                "Please import from 'react-native' instead of 'react-native-gesture-handler' where possible.",
              allowImportNames: [
                "GestureHandlerRootView",
                "FlatList",
                "RefreshControl",
              ],
            },
            {
              name: "expo-router",
              message:
                "Please use 'useRouter' from expo-router instead of importing 'router' directly.",
              importNames: ["router"],
            },
            {
              name: "expo-router/testing-library",
              message:
                "Direct imports from 'expo-router/testing-library' are not allowed. Import from 'test-utils' instead.",
            },
            {
              name: "@testing-library/react-native",
              message:
                "Direct imports from '@testing-library/react-native' are not allowed. Import from 'test-utils' instead.",
            },
            {
              name: "~/test-utils",
              importNames: ["queryClient"],
              message:
                "Do not import queryClient from test-utils outside of test files.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
    ...pluginTestingLibrary.configs["flat/react"],
  },
  prettier,
];
