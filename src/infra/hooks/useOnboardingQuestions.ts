import { useCallback, useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { OnboardingProgressContext } from "../provider/OnboardingProvider";
import { OnboardingStepType } from "../../UI/types";
import { getOnboardingQuery } from "../queries/getOnboarding.query";

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
  const { client, locale, customAudienceParams, setActiveStep, setTotalSteps } =
    useContext(OnboardingProgressContext);

  // Build query with config from context
  const { data: onboardingSteps } = useSuspenseQuery<OnboardingStepType[]>(
    getOnboardingQuery(client, locale, customAudienceParams)
  );

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
