import { useContext } from "react";
import { useTheme } from "../../UI";
import { OnboardingProgressContext } from "../provider/OnboardingProvider";

export const useOnboardingNavigation = () => {
  const { activeStep, totalSteps } = useContext(OnboardingProgressContext);
  const progressPercentage =
    totalSteps > 0 ? activeStep.number / totalSteps : 0;
  const { theme } = useTheme();
  const isProgressBarVisible = activeStep.displayProgressHeader;
  return {
    progressPercentage,
    theme,
    isProgressBarVisible,
  };
};
