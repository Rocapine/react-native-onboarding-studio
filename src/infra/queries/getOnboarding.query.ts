import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingStudioClient } from "../../OnboardingStudioClient";
import { Onboarding, OnboardingMetadata } from "../../types";
import type { UseQueryOptions } from "@tanstack/react-query";

const cacheKey = "rocapine-onboarding-studio";

export const getOnboardingQuery = (
  client: OnboardingStudioClient,
  locale: string,
  customAudienceParams: Record<string, any>,
  setOnboarding?: (onboarding: Onboarding) => void
) => {
  return {
    queryKey: [
      "onboardingQuestions",
      client.projectId,
      locale,
      JSON.stringify(customAudienceParams),
    ],
    queryFn: async (): Promise<Onboarding> => {
      // Try to get data from AsyncStorage first for production
      if (!(client?.options?.isSandbox || false)) {
        try {
          const cachedData = await AsyncStorage.getItem(cacheKey);
          if (cachedData) {
            return JSON.parse(cachedData);
          }
        } catch (error) {
          console.warn("Failed to load cached onboarding questions:", error);
        }
      }

      // Fetch from API
      const { data, headers } = await client!.getSteps(
        { locale },
        customAudienceParams
      );

      console.info("onbs-onboarding-name", headers["ONBS-Onboarding-Name"]);
      console.info("onbs-onboarding-id", headers["ONBS-Onboarding-Id"]);
      setOnboarding && setOnboarding(data);

      // Cache the steps
      try {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (error) {
        console.warn("Failed to cache onboarding questions:", error);
      }

      return data;
    },
    staleTime: Infinity,
  };
};
