import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../../UI/Theme/ThemeProvider";
import { ColorScheme, DeepPartial, Theme } from "../../UI/Theme/types";
import { OnboardingStudioClient } from "../../OnboardingStudioClient";
import {
  CustomComponentsProvider,
  CustomComponents,
} from "./CustomComponentsContext";
import { getOnboardingQuery } from "../queries/getOnboarding.query";
import { Onboarding, OnboardingMetadata } from "../../types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

interface OnboardingProviderProps {
  children: React.ReactNode;
  client: OnboardingStudioClient;
  initialColorScheme?: ColorScheme;
  locale?: string;
  customAudienceParams?: Record<string, any>;
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
  initialColorScheme = "light", // @todo To move in the Onboarding Layout
  locale = "en",
  customAudienceParams = {},
  theme, // @todo To move in the Onboarding Layout
  lightTheme, // @todo To move in the Onboarding Layout
  darkTheme, // @todo To move in the Onboarding Layout
  customComponents, // @todo To move in the Onboarding Layout
}: OnboardingProviderProps) => {
  const [activeStep, setActiveStep] = useState({
    number: 0,
    displayProgressHeader: false,
  });
  const [totalSteps, setTotalSteps] = useState(0);
  const [onboarding, setOnboarding] = useState<Onboarding | null>(null);

  queryClient.prefetchQuery(getOnboardingQuery(client, locale, customAudienceParams, setOnboarding))

  return (
    <QueryClientProvider client={queryClient}>
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
              locale,
              customAudienceParams,
              onboarding,
              setOnboarding,
            }}
          >
            {children}
          </OnboardingProgressContext.Provider>
        </CustomComponentsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export const OnboardingProgressContext = createContext<{
  activeStep: { number: number; displayProgressHeader: boolean };
  setActiveStep: (step: { number: number; displayProgressHeader: boolean }) => void;
  totalSteps: number;
  setTotalSteps: (steps: number) => void;
  client: OnboardingStudioClient;
  locale: string;
  customAudienceParams: Record<string, any>;
  onboarding: Onboarding | null;
  setOnboarding: (onboarding: Onboarding) => void;
}>({
  activeStep: { number: 0, displayProgressHeader: false },
  setActiveStep: () => { },
  totalSteps: 0,
  setTotalSteps: () => { },
  client: new OnboardingStudioClient('', {}),
  locale: "en",
  customAudienceParams: {},
  onboarding: null,
  setOnboarding: () => { },
});
