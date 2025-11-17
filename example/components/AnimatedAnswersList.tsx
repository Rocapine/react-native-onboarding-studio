import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import {
  QuestionAnswersListProps,
  DefaultQuestionAnswerButton,
} from "@rocapine/react-native-onboarding-ui";

/**
 * Animated answers list with staggered entrance animation.
 * Each answer slides in from below with a fade effect.
 *
 * Features:
 * - Staggered entrance (150ms delay between items)
 * - Slide + fade animation
 * - Uses DefaultQuestionAnswerButton for consistent styling
 * - Spring animation for natural feel
 */
export const AnimatedAnswersList: React.FC<QuestionAnswersListProps> = ({
  answers,
  selected,
  onAnswerPress,
  theme,
}) => {
  // Create an animated value for each answer
  const animations = useRef(
    answers.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Stagger the animations with 150ms delay between each
    const stagger = Animated.stagger(
      150,
      animations.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        })
      )
    );
    stagger.start();
  }, [animations]);

  return (
    <View style={styles.container}>
      {answers.map((answer, index) => (
        <Animated.View
          key={answer.value}
          style={{
            opacity: animations[index],
            transform: [
              {
                translateY: animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          <DefaultQuestionAnswerButton
            answer={answer}
            selected={selected[answer.value]}
            onPress={() => onAnswerPress(answer.value)}
            theme={theme}
            index={index}
            isFirst={index === 0}
            isLast={index === answers.length - 1}
          />
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
