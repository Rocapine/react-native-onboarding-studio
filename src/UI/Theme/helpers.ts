import { Theme, TextStyles } from "./types";
import { TextStyle } from "react-native";

/**
 * Get a semantic text style from the theme with resolved font family.
 *
 * @example
 * <Text style={[getTextStyle(theme, "heading1"), { color: theme.colors.text.primary }]}>
 *   Title
 * </Text>
 */
export function getTextStyle(
  theme: Theme,
  styleName: keyof TextStyles
): TextStyle {
  const style = theme.typography.textStyles[styleName];
  const fontFamily = theme.typography.fontFamily[style.fontFamily];

  return {
    fontFamily,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.fontSize * style.lineHeight,
  };
}
