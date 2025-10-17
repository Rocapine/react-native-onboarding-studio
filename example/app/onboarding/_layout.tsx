import { Stack } from "expo-router";
import { ProgressBar, useOnboardingNavigation } from "@rocapine/react-native-onboarding-studio";

export default function OnboardingLayout() {
  const { isProgressBarVisible, progressPercentage, theme } = useOnboardingNavigation()
  return <>
    <ProgressBar isProgressBarVisible={isProgressBarVisible} theme={theme} progressPercentage={progressPercentage} />
    <Stack screenOptions={{ headerShown: false }} />
  </>;
}
