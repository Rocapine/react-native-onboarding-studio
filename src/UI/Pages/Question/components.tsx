import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Theme } from "../../Theme/types";
import { getTextStyle } from "../../Theme/helpers";

/**
 * Props for custom Question answer button component.
 * Individual button in the answers list.
 */
export interface QuestionAnswerButtonProps {
  /** The answer data (label and value) */
  answer: { label: string; value: string };
  /** Whether this answer is currently selected */
  selected: boolean;
  /** Callback when button is pressed */
  onPress: () => void;
  /** Current theme */
  theme: Theme;
  /** Index in the list (0-based) */
  index: number;
  /** True if this is the first answer */
  isFirst: boolean;
  /** True if this is the last answer */
  isLast: boolean;
}

/**
 * Props for custom Question answers list component.
 * Full control over the entire answers list rendering.
 */
export interface QuestionAnswersListProps {
  /** All available answers */
  answers: Array<{ label: string; value: string }>;
  /** Record of which answers are selected (value -> boolean) */
  selected: Record<string, boolean>;
  /** Callback when an answer is pressed */
  onAnswerPress: (value: string) => void;
  /** Whether multiple answers can be selected */
  multipleAnswer: boolean;
  /** Current theme */
  theme: Theme;
}

/**
 * Default answer button component.
 * Can be used standalone or wrapped in custom implementations.
 */
export const DefaultQuestionAnswerButton: React.FC<
  QuestionAnswerButtonProps
> = ({ answer, selected, onPress, theme }) => (
  <TouchableOpacity
    style={[
      styles.answerButton,
      { backgroundColor: theme.colors.neutral.lowest },
      selected && [
        styles.answerButtonSelected,
        {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
      ],
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        getTextStyle(theme, "body"),
        styles.answerText,
        { color: theme.colors.text.primary },
        selected && [
          styles.answerTextSelected,
          { color: theme.colors.text.opposite },
        ],
      ]}
    >
      {answer.label}
    </Text>
  </TouchableOpacity>
);

/**
 * Default answers list component.
 * Renders all answers using DefaultQuestionAnswerButton or custom button if provided via context.
 * Note: This component needs to be wrapped with custom components context provider to work properly.
 * It will be imported dynamically in the renderer to avoid circular dependencies.
 */
export const DefaultQuestionAnswersList: React.FC<
  QuestionAnswersListProps
> = ({ answers, selected, onAnswerPress, theme }) => {
  return (
    <View style={styles.answersContainer}>
      {answers.map((answer, index) => (
        <DefaultQuestionAnswerButton
          key={answer.value}
          answer={answer}
          selected={selected[answer.value]}
          onPress={() => onAnswerPress(answer.value)}
          theme={theme}
          index={index}
          isFirst={index === 0}
          isLast={index === answers.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  answerButton: {
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "transparent",
  },
  answerButtonSelected: {},
  answerText: {
    textAlign: "center",
  },
  answerTextSelected: {},
  answersContainer: {
    gap: 10,
  },
});
