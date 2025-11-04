import {
  OnboardingProvider,
  OnboardingStudioClient,
} from "@rocapine/react-native-onboarding-studio";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { MinimalAnswerButton } from "@/components/MinimalAnswerButton";
import { fallbackOnboarding } from "@/assets/fallback-onboarding";

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

const client = new OnboardingStudioClient(
  "438d5493-1b72-4e12-9523-d9835ee98a52",
  {
    appVersion: "1.0.0",
    isSandbox: true,
    fallbackOnboarding
  }
);

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
      locale="en"
      customAudienceParams={{
        myconfig: "myconfig",
        onboardingId: "6e5c6818-b9a1-44e8-a5c3-a27f7cfccbb3",
      }}
      customComponents={{
        QuestionAnswerButton: MinimalAnswerButton,
      }}
      // Demonstrate theme customization with custom font
      theme={{
        // colors: {
        //   primary: "red", // Custom primary color
        // },
        // typography: {
        //   textStyles: {
        //     body: {
        //       fontSize: 16,
        //       fontWeight: "400",
        //       lineHeight: 1.2,
        //       fontFamily: "Futura-Bold",
        //     },
        //   }
        // },
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProvider>
  );
}
