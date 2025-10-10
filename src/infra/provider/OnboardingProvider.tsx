import { createContext, useState, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../../UI/Theme/ThemeProvider";
import { ColorScheme, DeepPartial, Theme } from "../../UI/Theme/types";
import { OnboardingStudioClient } from "../../OnboardingStudioClient";
import {
  CustomComponentsProvider,
  CustomComponents,
} from "./CustomComponentsContext";
import { ProgressBar } from "../../UI/Components/ProgressBar";

interface OnboardingProviderProps {
  children: React.ReactNode;
  client: OnboardingStudioClient;
  initialColorScheme?: ColorScheme;
  isSandbox?: boolean;
  locale?: string;
  getStepsParams?: Record<string, any>;
  cacheKey?: string;
  /**
   * Custom theme to override default theme tokens for both light and dark modes.
   * Partial overrides are supported - only provide the tokens you want to customize.
   */
  theme?: DeepPartial<Theme>;
  /**
   * Custom theme tokens for light mode only.
   * Partial overrides are supported - only provide the tokens you want to customize.
   */
  lightTheme?: DeepPartial<Theme>;
  /**
   * Custom theme tokens for dark mode only.
   * Partial overrides are supported - only provide the tokens you want to customize.
   */
  darkTheme?: DeepPartial<Theme>;
  /**
   * Custom components to replace default implementations.
   * Allows full UI customization for specific parts of the onboarding flow.
   * @example
   * ```tsx
   * <OnboardingProvider
   *   customComponents={{
   *     QuestionAnswerButton: MyCustomButton,
   *     QuestionAnswersList: MyCustomList
   *   }}
   * />
   * ```
   */
  customComponents?: CustomComponents;
}

export const OnboardingProvider = ({
  children,
  client,
  initialColorScheme = "light",
  isSandbox = false,
  locale = "en",
  getStepsParams = {},
  cacheKey = "rocapine-onboarding-studio",
  theme,
  lightTheme,
  darkTheme,
  customComponents,
}: OnboardingProviderProps) => {
  const [activeStep, setActiveStep] = useState({
    number: 0,
    displayProgressHeader: false,
  });
  const [totalSteps, setTotalSteps] = useState(0);

  // Create query client instance (one per provider)
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider
          initialColorScheme={initialColorScheme}
          customTheme={theme}
          customLightTheme={lightTheme}
          customDarkTheme={darkTheme}
        >
          <CustomComponentsProvider components={customComponents}>
            <OnboardingProgressContext.Provider
              value={{
                activeStep,
                setActiveStep,
                totalSteps,
                setTotalSteps,
                client,
                isSandbox,
                locale,
                getStepsParams,
                cacheKey,
              }}
            >
              <ProgressBar />
              {children}
            </OnboardingProgressContext.Provider>
          </CustomComponentsProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export const OnboardingProgressContext = createContext<{
  activeStep: { number: number; displayProgressHeader: boolean };
  setActiveStep: (step: { number: number; displayProgressHeader: boolean }) => void;
  totalSteps: number;
  setTotalSteps: (steps: number) => void;
  client: OnboardingStudioClient | null;
  isSandbox: boolean;
  locale: string;
  getStepsParams: Record<string, any>;
  cacheKey: string;
}>({
  activeStep: { number: 0, displayProgressHeader: false },
  setActiveStep: () => {},
  totalSteps: 0,
  setTotalSteps: () => {},
  client: null,
  isSandbox: false,
  locale: "en",
  getStepsParams: {},
  cacheKey: "rocapine-onboarding-studio",
});
