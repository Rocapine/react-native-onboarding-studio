import React, { createContext, useContext } from "react";
import {
  QuestionAnswerButtonProps,
  QuestionAnswersListProps,
} from "../../UI/Pages/Question/components";

/**
 * Custom components that can be provided to override default implementations.
 * Allows full UI customization for specific parts of the onboarding flow.
 */
export interface CustomComponents {
  /**
   * Custom component for individual Question answer buttons.
   * Replaces the default button styling while keeping list logic.
   *
   * @example
   * ```tsx
   * const MyButton = ({ answer, selected, onPress, theme }) => (
   *   <TouchableOpacity onPress={onPress} style={{ height: 96 }}>
   *     <Text>{answer.label}</Text>
   *   </TouchableOpacity>
   * );
   *
   * <OnboardingProvider customComponents={{ QuestionAnswerButton: MyButton }} />
   * ```
   */
  QuestionAnswerButton?: React.ComponentType<QuestionAnswerButtonProps>;

  /**
   * Custom component for the entire Question answers list.
   * Provides full control over list rendering, animations, and layout.
   * Takes priority over QuestionAnswerButton.
   *
   * @example
   * ```tsx
   * const MyList = ({ answers, selected, onAnswerPress, theme }) => (
   *   <Animated.View>
   *     {answers.map(answer => (
   *       <MyButton key={answer.value} answer={answer} />
   *     ))}
   *   </Animated.View>
   * );
   *
   * <OnboardingProvider customComponents={{ QuestionAnswersList: MyList }} />
   * ```
   */
  QuestionAnswersList?: React.ComponentType<QuestionAnswersListProps>;

  // Future: Add more customizable components here
  // CarouselSlide?: React.ComponentType<CarouselSlideProps>;
  // PickerInput?: React.ComponentType<PickerInputProps>;
  // etc.
}

const CustomComponentsContext = createContext<CustomComponents>({});

/**
 * Provider for custom components.
 * Wraps the app to make custom components available to all renderers.
 */
export const CustomComponentsProvider: React.FC<{
  children: React.ReactNode;
  components?: CustomComponents;
}> = ({ children, components = {} }) => (
  <CustomComponentsContext.Provider value={components}>
    {children}
  </CustomComponentsContext.Provider>
);

/**
 * Hook to access custom components from context.
 * Returns empty object if no custom components are provided.
 */
export const useCustomComponents = () => useContext(CustomComponentsContext);
