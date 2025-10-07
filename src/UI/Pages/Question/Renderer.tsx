import { useState } from "react";
import { QuestionStepTypeSchema, QuestionStepType } from "./types";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionRendererProps {
  step: QuestionStepType;
  onContinue?: (...args: any[]) => void;
}

export const QuestionRenderer = ({ step, onContinue }: QuestionRendererProps) => {
  // Validate the schema
  const validatedData = QuestionStepTypeSchema.parse(step);
  const { title, subtitle, answers, multipleAnswer } = validatedData.payload;

  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleContinue = () => {
    if (!onContinue) return;
    const selectedAnswers = Object.keys(selected).filter((key) => selected[key]);
    onContinue(multipleAnswer ? selectedAnswers : selectedAnswers[0]);
  };

  const onAnswerSelected = (answer: string) => {
    if (!onContinue) return;
    if (multipleAnswer) {
      toggleSelected(answer);
    } else {
      onContinue(answer);
    }
  };

  const toggleSelected = (answer: string) => {
    const isNoneOfTheAbove = answer === "None of the above";

    setSelected((prev) => {
      if (multipleAnswer) {
        let newSelected: Record<string, boolean>;

        if (isNoneOfTheAbove) {
          return { [answer]: true };
        }

        newSelected = { ...prev, [answer]: !prev[answer] };

        if (newSelected["None of the above"]) {
          newSelected["None of the above"] = false;
        }

        return newSelected;
      } else {
        return { [answer]: true };
      }
    });
  };

  const isAnySelected = Object.values(selected).some((value) => value);

  return (
    <View style={styles.container}>
      {/* Status Bar Spacer */}
      <View style={styles.statusBarSpacer} />

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>

        {/* Answers */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.answersContainer}>
            {answers.map((answer) => (
              <TouchableOpacity
                key={answer.value}
                style={[
                  styles.answerButton,
                  selected[answer.value] && styles.answerButtonSelected,
                ]}
                onPress={() => onAnswerSelected(answer.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.answerText,
                    selected[answer.value] && styles.answerTextSelected,
                  ]}
                >
                  {answer.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Continue Button (only for multiple answer) */}
      {multipleAnswer && (
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isAnySelected && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!isAnySelected}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <View style={styles.homeIndicator} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  statusBarSpacer: {
    height: 48,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 40,
  },
  headerSection: {
    gap: 8,
  },
  title: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '600',
    color: '#262626',
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '400',
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 22.1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  answersContainer: {
    gap: 10,
  },
  answerButton: {
    backgroundColor: '#f6f6f6',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  answerButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  answerText: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '500',
    color: '#262626',
    textAlign: 'center',
  },
  answerTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 8,
    gap: 24,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#262626',
    borderRadius: 90,
    paddingVertical: 18,
    paddingHorizontal: 24,
    minWidth: 234,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#d1d1d6',
  },
  continueButtonText: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  homeIndicator: {
    width: 148,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
    opacity: 0.3,
  },
});
