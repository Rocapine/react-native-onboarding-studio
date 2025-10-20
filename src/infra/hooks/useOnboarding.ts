import { useContext } from "react";
import { useTheme } from "../../UI";
import { OnboardingProgressContext } from "../provider/OnboardingProvider";

export const useOnboarding = () => {
  const { activeStep, totalSteps, onboarding } = useContext(
    OnboardingProgressContext
  );
  const progressPercentage =
    totalSteps > 0 ? Math.round((100 * activeStep.number) / totalSteps) : 0;
  const { theme } = useTheme();
  const isProgressBarVisible = activeStep.displayProgressHeader;
  return {
    progressPercentage,
    theme,
    isProgressBarVisible,
    onboarding,
  };
};
