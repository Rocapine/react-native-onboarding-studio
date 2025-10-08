import { OnboardingProgressProvider } from "@rocapine/react-native-onboarding-studio";
import { Stack } from "expo-router";

export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProgressProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProgressProvider>
  );
}
