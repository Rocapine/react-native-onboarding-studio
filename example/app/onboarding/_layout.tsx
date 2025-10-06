import { OnboardingProvider } from "@/onboarding/OnboardingProvider";
import { Stack } from "expo-router";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnboardingProvider>
    <Stack />
  </OnboardingProvider >;
}