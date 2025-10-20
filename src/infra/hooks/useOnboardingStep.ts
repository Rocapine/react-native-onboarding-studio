import { useCallback, useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { OnboardingProgressContext } from "../provider/OnboardingProvider";
import { OnboardingStepType } from "../../UI/types";
import { getOnboardingQuery } from "../queries/getOnboarding.query";
import { Onboarding, OnboardingMetadata } from "../../types";

export const useOnboardingStep = ({
  stepNumber,
}: {
  stepNumber: number;
}): {
  step: OnboardingStepType;
  isLastStep: boolean;
  stepsLength: number;
  onboardingMetadata: OnboardingMetadata;
  steps: OnboardingStepType[];
} => {
  // Get all config from context
  const {
    client,
    locale,
    customAudienceParams,
    setActiveStep,
    setTotalSteps,
    setOnboarding,
  } = useContext(OnboardingProgressContext);

  // Build query with config from context
  const { data } = useSuspenseQuery<Onboarding>(
    getOnboardingQuery(client, locale, customAudienceParams, setOnboarding)
  );
  const steps = data.steps;
  const onboardingMetadata = data.metadata;

  useFocusEffect(
    useCallback(() => {
      const currentStep = steps[stepNumber - 1];
      setActiveStep({
        number: stepNumber,
        displayProgressHeader: currentStep?.displayProgressHeader ?? true,
      });
      setTotalSteps(steps.length);
    }, [stepNumber, steps, setActiveStep, setTotalSteps])
  );

  const step = steps[stepNumber - 1];
  const isLastStep = stepNumber >= steps.length;
  const stepsLength = steps.length;

  return {
    step,
    isLastStep,
    stepsLength,
    onboardingMetadata,
    steps,
  };
};
