import {
  OnboardingProgressContext,
  OnboardingStepType,
  OnboardingStudioClient,
} from "@rocapine/react-native-onboarding-studio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useFocusEffect } from "expo-router";

const isSandbox = true;
const STORAGE_KEY = "rocapine-onboarding-studio";

export const onboardingStudioClient = new OnboardingStudioClient(
  "438d5493-1b72-4e12-9523-d9835ee98a52",
  {
    appVersion: "1.0.0", // TODO: get the version from the expo app
    isSanbdox: isSandbox,
  }
);

export const getOnboardingQuery = async () => {
  // Try to get data from AsyncStorage first for production
  if (!isSandbox) {
    try {
      const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (error) {
      console.warn("Failed to load cached onboarding questions:", error);
    }
  }

  const { data, headers } = await onboardingStudioClient.getSteps(
    { locale: "en" },
    {
      myconfig: "myconfig",
      onboardingId: "1be1af53-70f2-4310-9352-fdd7ca6b43eb",
    }
  );

  console.info("onbs-onboarding-name", headers["ONBS-Onboarding-Name"]);
  console.info("onbs-onboarding-id", headers["ONBS-Onboarding-Id"]);

  const steps = data.steps || [];
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
  } catch (error) {
    console.warn("Failed to cache onboarding questions:", error);
  }
  return steps;
};

export const useOnboardingQuestions = ({
  onboardingStepNumber,
}: {
  onboardingStepNumber: number;
}): {
  ONBOARDING_STEPS_COUNT: number;
  step: OnboardingStepType;
  isLastStep: boolean;
} => {
  const { data: onboardingSteps } = useSuspenseQuery({
    queryFn: () => getOnboardingQuery(),
    queryKey: ["onboardingQuestions"],
    staleTime: Infinity,
  });

  const { setActiveStep, setTotalSteps } = useContext(
    OnboardingProgressContext
  );

  useFocusEffect(() => {
    setActiveStep({
      number: onboardingStepNumber,
      displayProgressHeader: true,
    });
    setTotalSteps(onboardingSteps.length);
  });

  const step = onboardingSteps[onboardingStepNumber - 1];

  const isLastStep = onboardingStepNumber >= onboardingSteps.length;
  const ONBOARDING_STEPS_COUNT = onboardingSteps.length;

  return {
    step,
    ONBOARDING_STEPS_COUNT,
    isLastStep,
  };
};
