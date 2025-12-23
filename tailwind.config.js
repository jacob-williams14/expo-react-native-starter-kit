import { hairlineWidth } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
export const darkMode = "class";
export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./hooks/**/*.{js,jsx,ts,tsx}",
  "./lib/**/*.{js,jsx,ts,tsx}",
  "./providers/**/*.{js,jsx,ts,tsx}",
];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      background: "var(--background)",
      foreground: "var(--foreground)",

      // Primary Colors
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
        50: "var(--primary-50)",
        100: "var(--primary-100)",
        200: "var(--primary-200)",
        300: "var(--primary-300)",
        400: "var(--primary-400)",
        500: "var(--primary-500)",
        600: "var(--primary-600)",
        700: "var(--primary-700)",
        800: "var(--primary-800)",
        900: "var(--primary-900)",
      },

      // Secondary Colors
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
        50: "var(--secondary-50)",
        100: "var(--secondary-100)",
        200: "var(--secondary-200)",
        300: "var(--secondary-300)",
        400: "var(--secondary-400)",
        500: "var(--secondary-500)",
        600: "var(--secondary-600)",
        700: "var(--secondary-700)",
        800: "var(--secondary-800)",
        900: "var(--secondary-900)",
      },

      // Tertiary Colors
      tertiary: {
        50: "var(--tertiary-50)",
        100: "var(--tertiary-100)",
        200: "var(--tertiary-200)",
        300: "var(--tertiary-300)",
        400: "var(--tertiary-400)",
        500: "var(--tertiary-500)",
        600: "var(--tertiary-600)",
        700: "var(--tertiary-700)",
        800: "var(--tertiary-800)",
        900: "var(--tertiary-900)",
      },

      // Blue Colors
      blue: {
        50: "var(--blue-50)",
        100: "var(--blue-100)",
        200: "var(--blue-200)",
        300: "var(--blue-300)",
        400: "var(--blue-400)",
        500: "var(--blue-500)",
        600: "var(--blue-600)",
        700: "var(--blue-700)",
        800: "var(--blue-800)",
        900: "var(--blue-900)",
      },

      // Purple Colors
      purple: {
        50: "var(--purple-50)",
        100: "var(--purple-100)",
        200: "var(--purple-200)",
        300: "var(--purple-300)",
        400: "var(--purple-400)",
        500: "var(--purple-500)",
        600: "var(--purple-600)",
        700: "var(--purple-700)",
        800: "var(--purple-800)",
        900: "var(--purple-900)",
      },

      // Gold Colors
      gold: {
        50: "var(--gold-50)",
        100: "var(--gold-100)",
        200: "var(--gold-200)",
        300: "var(--gold-300)",
        400: "var(--gold-400)",
        500: "var(--gold-500)",
        600: "var(--gold-600)",
        700: "var(--gold-700)",
        800: "var(--gold-800)",
        900: "var(--gold-900)",
      },

      // Neutral Colors
      neutral: {
        50: "var(--neutral-50)",
        100: "var(--neutral-100)",
        200: "var(--neutral-200)",
        300: "var(--neutral-300)",
        400: "var(--neutral-400)",
        500: "var(--neutral-500)",
        600: "var(--neutral-600)",
        700: "var(--neutral-700)",
        800: "var(--neutral-800)",
        900: "var(--neutral-900)",
      },

      // Base Colors
      base: {
        white: "var(--base-white)",
        black: "var(--base-black)",
        red: "var(--base-red)",
        teal: "var(--base-teal)",
        "off-white": "var(--base-off-white)",
      },

      // System mappings
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    borderWidth: {
      hairline: hairlineWidth(),
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};
export const future = {
  hoverOnlyWhenSupported: true,
};
export const plugins = [];
export const safelist =
  // NOTE: Safelist all color combinations in development
  // Only include used colors in production for optimal bundle size
  process.env.NODE_ENV === "development"
    ? [
        {
          pattern:
            /(?:bg|border|text|stroke|fill)-(?:primary|secondary|tertiary|blue|purple|gold|neutral|base|muted|accent|popover|card|destructive)-(?:[0-9]{1,3}|950|white|black|red|teal|off-white)/,
          variants: ["hover", "focus", "dark"],
        },
      ]
    : [];
