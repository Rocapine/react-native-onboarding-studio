import { Stack } from "expo-router";
import { ProgressBar, useOnboarding } from "@rocapine/react-native-onboarding-studio";
import { useEffect } from "react";

export default function OnboardingLayout() {
  const { isProgressBarVisible, progressPercentage, theme, onboarding } = useOnboarding()

  useEffect(() => {
    console.log('onboardingMetadata', onboarding?.metadata);
  }, [onboarding]);

  return <>
    <ProgressBar isProgressBarVisible={isProgressBarVisible} theme={theme} progressPercentage={progressPercentage} />
    <Stack screenOptions={{ headerShown: false }} />
  </>;
}

