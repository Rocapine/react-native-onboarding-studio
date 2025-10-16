import { ColorTokens } from "../types";

export const darkTokens = {
  colors: {
    primary: "#c8ff2f",
    disable: "#6d6d6d",
    neutral: {
      high: "#6d6d6d",
      higher: "#b0b0b0",
      highest: "#f6f6f6",
      low: "#4f4f4f",
      lower: "#3d3d3d",
      lowest: "#262626",
      lowestest: "#000000",
      medium: "#6d6d6d",
    },
    text: {
      disable: "#6d6d6d",
      opposite: "#262626",
      primary: "#ffffff",
      secondary: "#d1d1d1",
      tertiary: "#b0b0b0",
    },
  },
} satisfies { colors: ColorTokens };
