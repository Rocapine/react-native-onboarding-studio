import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import type { QuestionAnswerButtonProps } from "@rocapine/react-native-onboarding-studio";

/**
 * Minimal answer button matching Figma design.
 * Features:
 * - 96px height
 * - Top and bottom borders only (no left/right)
 * - No border-radius (sharp corners)
 * - 24px font size
 * - Centered text
 * - Black left border when selected
 */
export const MinimalAnswerButton: React.FC<QuestionAnswerButtonProps> = ({
  answer,
  selected,
  onPress,
  theme,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[
      styles.button,
      { borderColor: theme.colors.neutral.lower },
      selected && {
        backgroundColor: theme.colors.neutral.lowest,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.text.primary, // Black left border
      },
    ]}
  >
    <Text
      style={[
        styles.text,
        { color: theme.colors.text.primary },
      ]}
    >
      {answer.label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 96,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});
