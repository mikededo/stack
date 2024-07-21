import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export const theme: NonNullable<Config["theme"]> = {
  container: {
    center: true,
    screens: { xl: "1100px", "2xl": "1360px" },
  },
  extend: {
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
      mono: ["var(--font-mono)", ...fontFamily.mono],
    },
    borderColor: { DEFAULT: "#dee3e7" },
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        DEFAULT: "#7561E5",
        950: "#5D1EB5",
        900: "#5D20C0",
        800: "#5E23D6",
        700: "#6235DE",
        600: "#6B4BE1",
        500: "#7561E5",
        400: "#8177E9",
        300: "#908DEC",
        200: "#A3A5F0",
        100: "#B9BDF3",
        50: "#C4C9F5",
      },
      secondary: {
        DEFAULT: "#F5F5F4",
        950: "#1b242c",
        900: "#272e35",
        800: "#3a424a",
        700: "#4a545e",
        600: "#555f6d",
        500: "#7e8c9a",
        400: "#9ea8b3",
        300: "#cfd6dd",
        200: "#dee3e7",
        100: "#eaedf0",
        50: "#f0f3f5",
      },
      info: {
        DEFAULT: "#6792F4",
        950: "#EDF2FF",
        900: "#E5EEFF",
        800: "#D7E4FF",
        700: "#CDDDFF",
        600: "#8DB0FB",
        500: "#6792F4",
        400: "#3062D4",
        300: "#2759CD",
        200: "#1E50C0",
        100: "#113997",
        50: "#05205E",
      },
      positive: {
        DEFAULT: "#4aa578",
        950: "#062d1b",
        900: "#0e4e30",
        800: "#196742",
        700: "#1e714a",
        600: "#1d7c4d",
        500: "#4aa578",
        400: "#75cc9e",
        300: "#c2ebd5",
        200: "#c6f1da",
        100: "#d8f8e7",
        50: "#e6f9ef",
      },
      orange: {
        DEFAULT: "#f6a351",
        950: "#482909",
        900: "#7a4510",
        800: "#a05c1c",
        700: "#b4610e",
        600: "#f59638",
        500: "#f6a351",
        400: "#feb872",
        300: "#ffd4a8",
        200: "#fcdec0",
        100: "#ffe8d1",
        50: "#fff0e0",
      },
      destructive: {
        DEFAULT: "#f26464",
        950: "#4a0d0d",
        900: "#6f2020",
        800: "#952d2d",
        700: "#a13636",
        600: "#c53434",
        500: "#f26464",
        400: "#f49090",
        300: "#fccfcf",
        200: "#fcd9d9",
        100: "#fee6e6",
        50: "#ffebeb",
      },
    },
  },
  borderRadius: {
    DEFAULT: "0.5rem",
    "2xl": "1rem",
    xl: "calc(0.5rem + 4px)",
    lg: "calc(0.5rem + 2px)",
    md: "calc(0.5rem - 2px)",
    sm: "calc(0.5rem - 4px)",
    full: "9999px",
  },
};

export const typography = () =>
  plugin((api) => {
    const { addBase, theme } = api;
    addBase({
      h1: {
        fontSize: theme("fontSize.4xl"),
        fontWeight: theme("fontWeight.semibold"),
        lineHeight: theme("lineHeight.tight"),
      },
      h2: {
        fontSize: theme("fontSize.3xl"),
        fontWeight: theme("fontWeight.semibold"),
        lineHeight: theme("lineHeight.tight"),
      },
      h3: {
        fontSize: theme("fontSize.2xl"),
        fontWeight: theme("fontWeight.semibold"),
        lineHeight: theme("lineHeight.tight"),
      },
      h4: {
        fontSize: theme("fontSize.xl"),
        fontWeight: theme("fontWeight.semibold"),
        lineHeight: theme("lineHeight.tight"),
      },
      h5: {
        fontSize: theme("fontSize.lg"),
        fontWeight: theme("fontWeight.semibold"),
        lineHeight: theme("lineHeight.tight"),
      },
      h6: {
        fontSize: theme("fontSize.base"),
        fontWeight: theme("fontWeight.semibold"),
        lineHeight: theme("lineHeight.tight"),
      },
    });
  });
