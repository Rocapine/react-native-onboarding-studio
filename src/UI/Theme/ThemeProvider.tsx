import React, { createContext, useState, ReactNode } from "react";
import { lightTokens, darkTokens, typography } from "./tokens";
import { Theme, ColorScheme } from "./types";

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
};

export const ThemeProvider = ({
  children,
  initialColorScheme = "light",
}: ThemeProviderProps) => {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(initialColorScheme);

  const theme: Theme = {
    colors: colorScheme === "light" ? lightTokens.colors : darkTokens.colors,
    typography,
  };

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
