/**
 * App-wide constants
 *
 * Colors, sizes, and other configuration values used throughout the app.
 */

export const COLORS = {
  primary: {
    50: "#fff5f5",
    100: "#ffe5e6",
    200: "#ffccce",
    300: "#ff999c",
    400: "#ff666a",
    500: "#fd4f57", // main primary color
    600: "#e4474f",
    700: "#cc3f46",
    800: "#b3373d",
    900: "#992f34",
  },
  secondary: {
    50: "#f7f6f5",
    100: "#eeedeb",
    200: "#dddbd7",
    300: "#cbc9c3",
    400: "#bab7af",
    500: "#a9a59b",
    600: "#979387",
    700: "#868173",
    800: "#746f5f",
    900: "#5e5a56", // main secondary color
  },
  tertiary: {
    50: "#f0fcfb",
    100: "#e1f9f7",
    200: "#c3f3ef",
    300: "#a5ede7",
    400: "#87e7df",
    500: "#16cbc4", // main tertiary color
    600: "#14b7b0",
    700: "#12a39c",
    800: "#108f88",
    900: "#0e7b74",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#c3c3c3",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  base: {
    white: "#FFFFFF",
    black: "#000000",
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Navigation theme using color palette
export const NAV_THEME = {
  light: {
    background: COLORS.base.white,
    border: COLORS.neutral[200],
    card: COLORS.base.white,
    notification: COLORS.primary[500],
    primary: COLORS.primary[500],
    secondary: COLORS.secondary[500],
    text: COLORS.primary[600],
    interaction: COLORS.secondary[900],
  },
  dark: {
    background: COLORS.neutral[900],
    border: COLORS.neutral[800],
    card: COLORS.neutral[900],
    notification: COLORS.primary[600],
    primary: COLORS.primary[500],
    secondary: COLORS.secondary[500],
    text: COLORS.neutral[50],
    interaction: COLORS.secondary[900],
  },
} as const;
