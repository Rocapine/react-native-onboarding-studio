import {
  OnboardingProvider,
  OnboardingStudioClient,
  ProgressBar,
} from "@rocapine/react-native-onboarding-studio";
import { Stack } from "expo-router";

const client = new OnboardingStudioClient(
  "438d5493-1b72-4e12-9523-d9835ee98a52",
  {
    appVersion: "1.0.0",
    isSanbdox: true,
  }
);

export default function RootLayout() {
  return (
    <OnboardingProvider
      client={client}
      isSandbox={true}
      locale="en"
      getStepsParams={{
        myconfig: "myconfig",
        onboardingId: "1be1af53-70f2-4310-9352-fdd7ca6b43eb",
      }}
    >
      <ProgressBar />
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProvider>
  );
}
