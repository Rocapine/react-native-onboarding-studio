import { Theme, ColorTokens, TypographyTokens, DeepPartial } from "./types";

/**
 * Deep merge utility for theme tokens.
 * Recursively merges custom theme values into default theme.
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: DeepPartial<T> | undefined
): T {
  if (!source) return target;

  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      // Recursively merge nested objects
      result[key] = deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      // Override primitive values
      result[key] = sourceValue as any;
    }
  }

  return result;
}

/**
 * Merge custom theme tokens with default tokens.
 * Supports partial Theme objects with nested property overrides.
 */
export function mergeThemeTokens(
  defaultColors: ColorTokens,
  defaultTypography: TypographyTokens,
  customTheme?: DeepPartial<Theme>
): Theme {
  if (!customTheme) {
    return {
      colors: defaultColors,
      typography: defaultTypography,
    };
  }

  // Check if customTheme has colors and/or typography
  const hasColors = "colors" in customTheme && customTheme.colors !== undefined;
  const hasTypography =
    "typography" in customTheme && customTheme.typography !== undefined;

  return {
    colors: hasColors
      ? deepMerge(defaultColors, customTheme.colors)
      : defaultColors,
    typography: hasTypography
      ? deepMerge(defaultTypography, customTheme.typography)
      : defaultTypography,
  };
}
