import React, { createContext, useState, ReactNode, useMemo } from "react";
import { lightTokens, darkTokens, typography } from "./tokens";
import { Theme, ColorScheme, DeepPartial } from "./types";
import { mergeThemeTokens, deepMerge } from "./utils";

type ThemeContextType = {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: ReactNode;
  initialColorScheme?: ColorScheme;
  /**
   * Custom theme to override both light and dark mode tokens.
   */
  customTheme?: DeepPartial<Theme>;
  /**
   * Custom theme tokens for light mode only.
   */
  customLightTheme?: DeepPartial<Theme>;
  /**
   * Custom theme tokens for dark mode only.
   */
  customDarkTheme?: DeepPartial<Theme>;
};

export const ThemeProvider = ({
  children,
  initialColorScheme = "light",
  customTheme,
  customLightTheme,
  customDarkTheme,
}: ThemeProviderProps) => {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(initialColorScheme);

  // Merge custom themes with defaults (memoized for performance)
  const mergedLightTheme = useMemo(() => {
    let baseLight = mergeThemeTokens(
      lightTokens.colors,
      typography,
      customLightTheme
    );

    // Apply global customTheme on top if provided
    if (customTheme) {
      baseLight = {
        colors: customTheme.colors
          ? deepMerge(baseLight.colors, customTheme.colors)
          : baseLight.colors,
        typography: customTheme.typography
          ? deepMerge(baseLight.typography, customTheme.typography)
          : baseLight.typography,
      };
    }

    return baseLight;
  }, [customTheme, customLightTheme]);

  const mergedDarkTheme = useMemo(() => {
    let baseDark = mergeThemeTokens(
      darkTokens.colors,
      typography,
      customDarkTheme
    );

    // Apply global customTheme on top if provided
    if (customTheme) {
      baseDark = {
        colors: customTheme.colors
          ? deepMerge(baseDark.colors, customTheme.colors)
          : baseDark.colors,
        typography: customTheme.typography
          ? deepMerge(baseDark.typography, customTheme.typography)
          : baseDark.typography,
      };
    }

    return baseDark;
  }, [customTheme, customDarkTheme]);

  const theme: Theme =
    colorScheme === "light" ? mergedLightTheme : mergedDarkTheme;

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
