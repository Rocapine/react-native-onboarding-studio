import { useCallback, useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingProgressContext } from "../provider/OnboardingProvider";
import { OnboardingStepType } from "../../UI/types";

export const useOnboardingQuestions = ({
  stepNumber,
}: {
  stepNumber: number;
}): {
  step: OnboardingStepType;
  isLastStep: boolean;
  totalSteps: number;
} => {
  // Get all config from context
  const {
    client,
    isSandbox,
    locale,
    getStepsParams,
    cacheKey,
    setActiveStep,
    setTotalSteps,
  } = useContext(OnboardingProgressContext);

  // Build query with config from context
  const { data: onboardingSteps } = useSuspenseQuery<OnboardingStepType[]>({
    queryKey: ["onboardingQuestions"],
    queryFn: async () => {
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

      // Fetch from API
      const { data, headers } = await client!.getSteps(
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
    },
    staleTime: Infinity,
  });

  useFocusEffect(
    useCallback(() => {
      const currentStep = onboardingSteps[stepNumber - 1];
      setActiveStep({
        number: stepNumber,
        displayProgressHeader: currentStep?.displayProgressHeader ?? true,
      });
      setTotalSteps(onboardingSteps.length);
    }, [stepNumber, onboardingSteps, setActiveStep, setTotalSteps])
  );

  const step = onboardingSteps[stepNumber - 1];
  const isLastStep = stepNumber >= onboardingSteps.length;
  const totalSteps = onboardingSteps.length;

  return {
    step,
    isLastStep,
    totalSteps,
  };
};
