import { OnboardingProgressProvider } from "@rocapine/react-native-onboarding-studio";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <OnboardingProgressProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProgressProvider>
  );
}
