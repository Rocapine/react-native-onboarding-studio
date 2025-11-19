import { useContext } from "react";
import { OnboardingProgressContext } from "../provider/OnboardingProvider";

export const useOnboarding = () => {
  const { activeStep, totalSteps, onboarding } = useContext(
    OnboardingProgressContext
  );
  const progressPercentage =
    totalSteps > 0 ? Math.round((100 * activeStep.number) / totalSteps) : 0;
  const isProgressBarVisible = activeStep.displayProgressHeader;
  return {
    progressPercentage,
    isProgressBarVisible,
    onboarding,
  };
};
