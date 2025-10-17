import { GetStepsResponse } from "@rocapine/react-native-onboarding-studio";
import { step as questionStep } from "../app/example/question";
import { step as commitmentStep } from "../app/example/commitment";

export const fallbackOnboarding = {
  metadata: {
    id: "fallback",
  },
  steps: [questionStep, commitmentStep],
  configuration: {},
} satisfies GetStepsResponse;
