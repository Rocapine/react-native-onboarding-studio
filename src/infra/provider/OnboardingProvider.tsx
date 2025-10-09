import { createContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "../../UI/Theme/ThemeProvider";
import { ColorScheme } from "../../UI/Theme/types";
import { OnboardingStudioClient } from "../../OnboardingStudioClient";

interface OnboardingProviderProps {
  children: React.ReactNode;
  client: OnboardingStudioClient;
  initialColorScheme?: ColorScheme;
  isSandbox?: boolean;
  locale?: string;
  getStepsParams?: Record<string, any>;
  cacheKey?: string;
}

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const OnboardingProvider = ({
  children,
  client,
  initialColorScheme = "light",
  isSandbox = false,
  locale = "en",
  getStepsParams = {},
  cacheKey = "rocapine-onboarding-studio",
}: OnboardingProviderProps) => {
  const [activeStep, setActiveStep] = useState({
    number: 0,
    displayProgressHeader: false,
  });
  const [totalSteps, setTotalSteps] = useState(0);

  // Configure query function
  const getOnboardingQuery = async () => {
    // Try to get data from AsyncStorage first for production
    if (!isSandbox) {
      try {
        const cachedData = await AsyncStorage.getItem(cacheKey);
        if (cachedData) {
          return JSON.parse(cachedData);
        }
      } catch (error) {
        console.warn("Failed to load cached onboarding questions:", error);
      }
    }

    const { data, headers } = await client.getSteps(
      { locale },
      getStepsParams
    );

    console.info("onbs-onboarding-name", headers["ONBS-Onboarding-Name"]);
    console.info("onbs-onboarding-id", headers["ONBS-Onboarding-Id"]);

    const steps = data.steps || [];

    // Cache the steps
    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(steps));
    } catch (error) {
      console.warn("Failed to cache onboarding questions:", error);
    }

    return steps;
  };

  // Set up query client with our query function
  defaultQueryClient.setQueryDefaults(["onboardingQuestions"], {
    queryFn: getOnboardingQuery,
  });

  return (
    <QueryClientProvider client={defaultQueryClient}>
      <SafeAreaProvider>
        <ThemeProvider initialColorScheme={initialColorScheme}>
          <OnboardingProgressContext.Provider
            value={{ activeStep, setActiveStep, totalSteps, setTotalSteps }}
          >
            {children}
          </OnboardingProgressContext.Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export const OnboardingProgressContext = createContext({
  activeStep: { number: 0, displayProgressHeader: false },
  setActiveStep: (step: {
    number: number;
    displayProgressHeader: boolean;
  }) => {},
  totalSteps: 0,
  setTotalSteps: (steps: number) => {},
});
