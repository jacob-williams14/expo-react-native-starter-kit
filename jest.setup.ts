// fix for type errors related to jest test matchers after expo 53 upgrade
// reference: https://github.com/expo/expo/issues/33851#issuecomment-2861727401
/// <reference types="expo-router/types/expect" />

/* eslint-disable @typescript-eslint/no-require-imports */
import "react-native-gesture-handler/jestSetup";

import { setUpTests } from "react-native-reanimated";

import { afterAll, afterEach, beforeAll } from "@jest/globals";

import { resetQueryClient } from "~/test-utils";
import { Scenario } from "~/test-utils/scenario";
import { server } from "~/test-utils/utils";

setUpTests();

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("react-native-keyboard-controller", () => {
  const mockReact = require("react");
  const mockRN = require("react-native");

  return {
    KeyboardProvider: jest.fn(({ children }) => children),
    KeyboardAvoidingView: jest.fn(({ children, ...props }) =>
      mockReact.createElement(mockRN.View, props, children)
    ),
    KeyboardAwareScrollView: jest.fn(({ children, ...props }) =>
      mockReact.createElement(mockRN.ScrollView, props, children)
    ),
    useKeyboardHandler: jest.fn(),
    useKeyboardAnimation: jest.fn(() => ({
      height: { value: 0 },
      progress: { value: 0 },
    })),
    useReanimatedKeyboardAnimation: jest.fn(() => ({
      height: { value: 0 },
      progress: { value: 0 },
    })),
    KeyboardEvents: {
      addListener: jest.fn(() => ({ remove: jest.fn() })),
    },
  };
});

jest.mock("expo-crypto", () => {
  const crypto = require("crypto");
  return {
    randomUUID: jest.fn().mockReturnValue(crypto.randomUUID()),
  };
});

jest.mock("expo-constants", () => {
  const ConstantsModule = jest.requireActual("expo-constants");
  const { default: Constants } = ConstantsModule;
  return {
    ...ConstantsModule,
    __esModule: true,
    default: {
      ...Constants,
      manifest: {
        ...Constants.manifest,
        scheme: "starterkit",
      },
      expoConfig: {
        scheme: "starterkit",
        plugins: [],
      },
    },
  };
});

jest.mock("expo-secure-store", () => ({
  _items: {
    auth_access_token: "mock-access-token",
  },
  getItemAsync: jest.fn(function (key) {
    return Promise.resolve(this._items[key] || null);
  }),
  setItemAsync: jest.fn(function (key, value) {
    this._items[key] = value;
    return Promise.resolve();
  }),
  deleteItemAsync: jest.fn(function (key) {
    delete this._items[key];
    return Promise.resolve();
  }),
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("@expo/vector-icons/Ionicons", () => {
  const mockView = jest.fn();
  return mockView;
});

jest.mock("nativewind", () => ({
  styled: (component: unknown) => component,
  cssInterop: () => {},
  useColorScheme: () => ({
    colorScheme: "light",
    setColorScheme: jest.fn(),
    toggleColorScheme: jest.fn(),
  }),
}));

jest.mock("react-native-edge-to-edge", () => ({
  SystemBars: jest.fn(({ children }) => children || null),
}));

jest.mock("expo-linking", () => ({
  openURL: jest.fn(),
  createURL: jest.fn((path: string) => `starterkit://${path}`),
  parse: jest.fn((url: string) => ({ path: url })),
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  getInitialURL: jest.fn().mockResolvedValue(null),
}));

jest.mock("@react-navigation/elements", () => ({
  ...jest.requireActual("@react-navigation/elements"),
  useHeaderHeight: jest.fn(() => 44),
}));

jest.mock("~/components/general/ScrollViewWithPinnedButtons", () => {
  const mockReact = require("react");
  const mockRN = require("react-native");

  const MockPinnedContentScrollView = ({ children }: { children: unknown }) => {
    return mockReact.createElement(
      mockRN.ScrollView,
      { testID: "pinned-content-scroll-view" },
      mockReact.createElement(mockRN.View, { style: { flex: 1 } }, children)
    );
  };

  const MockPinned = ({ children }: { children: unknown }) => {
    return mockReact.createElement(
      mockRN.View,
      { testID: "pinned-buttons" },
      children
    );
  };

  MockPinnedContentScrollView.Pinned = MockPinned;

  return {
    PinnedContentScrollView: MockPinnedContentScrollView,
  };
});

type LocationPermissionMock = jest.Mock & {
  setMockLocation: (location: unknown) => void;
  setMockPermission: (hasPermission: boolean, canAskAgain?: boolean) => void;
  reset: () => void;
};

jest.mock("~/hooks/useLocationPermission", () => {
  const defaultLocation = {
    coords: {
      latitude: 43.0389,
      longitude: -87.9065,
      altitude: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      heading: 0,
      speed: 0,
    },
    timestamp: 1612345678000,
  };

  const defaultState = {
    hasPermission: true,
    location: defaultLocation,
    isLoading: false,
    canAskAgain: false,
    requestPermission: jest.fn().mockResolvedValue(true),
    getCurrentLocation: jest.fn().mockResolvedValue(defaultLocation),
    checkInitialPermissionState: jest.fn().mockResolvedValue(undefined),
  };

  const mockUseLocationPermission = jest.fn().mockReturnValue({
    ...defaultState,
  }) as LocationPermissionMock;

  mockUseLocationPermission.setMockLocation = (location: unknown) => {
    mockUseLocationPermission.mockReturnValue({
      ...defaultState,
      location,
      getCurrentLocation: jest.fn().mockResolvedValue(location),
    });
  };

  mockUseLocationPermission.setMockPermission = (
    hasPermission: boolean,
    canAskAgain: boolean = !hasPermission
  ) => {
    mockUseLocationPermission.mockReturnValue({
      ...defaultState,
      hasPermission,
      canAskAgain,
      location: hasPermission ? defaultLocation : null,
    });
  };

  mockUseLocationPermission.reset = () => {
    mockUseLocationPermission.mockClear();
    mockUseLocationPermission.mockReturnValue({ ...defaultState });
  };

  const shouldPromptForLocation = jest.fn().mockResolvedValue(false);

  return {
    useLocationPermission: mockUseLocationPermission,
    shouldPromptForLocation,
  };
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(async () => {
  server.close();
});

afterEach(async () => {
  resetQueryClient();
  await Scenario.reset();
});
