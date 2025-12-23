/**
 * App-wide constants
 *
 * Colors, sizes, and other configuration values used throughout the app.
 */

export const COLORS = {
  primary: {
    50: "#f0f6f4",
    100: "#dbe8e4",
    200: "#c7d8d1",
    300: "#b3c8be",
    400: "#9fb8ab",
    500: "#8ba898", // main primary color - sage
    600: "#7a9b8e",
    700: "#6a8075",
    800: "#5a6e64",
    900: "#4a5c54",
  },
  secondary: {
    50: "#f2f1f0",
    100: "#e0dfdd",
    200: "#c4c2bf",
    300: "#a8a5a1",
    400: "#8d8985",
    500: "#736f6b",
    600: "#5e5a56", // main secondary color - warm charcoal
    700: "#4c4845",
    800: "#3d3a37",
    900: "#2a2826",
  },
  tertiary: {
    50: "#fdf8f7",
    100: "#f9ece9",
    200: "#f3d9d4",
    300: "#ecc5bf",
    400: "#e5b1aa",
    500: "#de9d95", // main tertiary color - terracotta
    600: "#d4877e",
    700: "#b97366",
    800: "#9a5e50",
    900: "#7a4a3e",
  },
  neutral: {
    50: "#f7f6f3",
    100: "#efede8",
    200: "#dcdad3",
    300: "#c3c0b9",
    400: "#aaa69f",
    500: "#918c86",
    600: "#78736d",
    700: "#5f5b56",
    800: "#47443f",
    900: "#2e2c2a",
  },
  base: {
    white: "#ffffff",
    offWhite: "#f5f3ed",
    black: "#2a2826",
    sage: "#8ba898",
    terracotta: "#d4877e",
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
    background: COLORS.base.offWhite,
    border: COLORS.neutral[200],
    card: COLORS.base.white,
    notification: COLORS.tertiary[500],
    primary: COLORS.primary[500],
    secondary: COLORS.secondary[600],
    text: COLORS.secondary[700],
    interaction: COLORS.secondary[600],
  },
  dark: {
    background: COLORS.secondary[900],
    border: COLORS.secondary[700],
    card: COLORS.secondary[800],
    notification: COLORS.tertiary[400],
    primary: COLORS.primary[400],
    secondary: COLORS.secondary[700],
    text: COLORS.neutral[50],
    interaction: COLORS.neutral[50],
  },
} as const;
