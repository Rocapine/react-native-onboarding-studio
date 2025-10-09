import {
  OnboardingProvider,
  OnboardingStudioClient,
  DefaultQuestionAnswerButton,
  ProgressBar,
} from "@rocapine/react-native-onboarding-studio";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { MinimalAnswerButton } from "@/components/MinimalAnswerButton";

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

const client = new OnboardingStudioClient(
  "438d5493-1b72-4e12-9523-d9835ee98a52",
  {
    appVersion: "1.0.0",
    isSanbdox: true,
  }
);

function RootLayoutNav() {
  const router = useRouter();

  return (
    <>
      <ProgressBar
        canGoBack={router.canGoBack()}
        onBack={() => router.back()}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  // Load custom fonts - Futura Bold for demonstration
  const [fontsLoaded, fontError] = useFonts({
    "Futura-Bold": require("../assets/fonts/FuturaBold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <OnboardingProvider
      client={client}
      isSandbox={true}
      locale="en"
      getStepsParams={{
        myconfig: "myconfig",
        onboardingId: "1be1af53-70f2-4310-9352-fdd7ca6b43eb",
      }}
      customComponents={{
        QuestionAnswerButton: MinimalAnswerButton,
      }}
      // Demonstrate theme customization with custom font
      theme={{
        colors: {
          primary: "red", // Custom primary color
        },
        typography: {
          fontFamily: {
            // title: "Futura-Bold",  // Used by heading1, heading2 (titles)
            // text: "System", // Use system font for body text
          },
        },
      }}
    >
      <RootLayoutNav />
    </OnboardingProvider>
  );
}
