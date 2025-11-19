import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Theme } from "./types";
import { lightTokens, typography } from "./tokens";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    const theme: Theme = {
      colors: lightTokens.colors,
      typography,
    };
    return {
      theme: theme,
      colorScheme: "light",
      toggleTheme: () => {},
    };
  }

  return context;
};
