import { Stack } from "expo-router";
import { useOnboarding } from "@rocapine/react-native-onboarding";
import { ProgressBar, useTheme } from "@rocapine/react-native-onboarding-ui";
import { useEffect } from "react";

export default function OnboardingLayout() {
  const { isProgressBarVisible, progressPercentage, onboarding } = useOnboarding()
  const { theme } = useTheme();

  useEffect(() => {
    console.log('onboardingMetadata', onboarding?.metadata);
  }, [onboarding]);

  return <>
    <ProgressBar isProgressBarVisible={isProgressBarVisible} theme={theme} progressPercentage={progressPercentage} />
    <Stack screenOptions={{ headerShown: false }} />
  </>;
}

