import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingStudioClient } from "../../OnboardingStudioClient";

const cacheKey = "rocapine-onboarding-studio";

export const getOnboardingQuery = (
  client: OnboardingStudioClient,
  locale: string,
  getStepsParams: Record<string, any>
) => {
  return {
    queryKey: [
      "onboardingQuestions",
      client.projectId,
      locale,
      JSON.stringify(getStepsParams),
    ],
    queryFn: async () => {
      // Try to get data from AsyncStorage first for production
      if (!(client?.options?.isSanbdox || false)) {
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
        getStepsParams
      );

      console.info("onbs-onboarding-name", headers["ONBS-Onboarding-Name"]);
      console.info("onbs-onboarding-id", headers["ONBS-Onboarding-Id"]);

      const steps = data.steps || [];

      // Cache the steps
      try {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(steps));
      } catch (error) {
        console.warn("Failed to cache onboarding questions:", error);
      }

      return steps;
    },
    staleTime: Infinity,
  };
};
