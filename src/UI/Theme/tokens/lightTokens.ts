import { ColorTokens } from "../types";

export const lightTokens = {
  colors: {
    primary: "#264653",
    disable: "#6d6d6d",
    neutral: {
      high: "#4f4f4f",
      higher: "#3d3d3d",
      highest: "#262626",
      low: "#b0b0b0",
      lower: "#e7e7e7",
      lowest: "#f6f6f6",
      lowestest: "#ffffff",
      medium: "#6d6d6d",
    },
    text: {
      disable: "#b0b0b0",
      opposite: "#ffffff",
      primary: "#262626",
      secondary: "#3d3d3d",
      tertiary: "#6d6d6d",
    },
  },
} satisfies { colors: ColorTokens };
