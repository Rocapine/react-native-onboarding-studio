import { useCallback, useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
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
  const { data: onboardingSteps } = useSuspenseQuery<OnboardingStepType[]>({
    queryKey: ["onboardingQuestions"],
  });

  const { setActiveStep, setTotalSteps } = useContext(
    OnboardingProgressContext
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
