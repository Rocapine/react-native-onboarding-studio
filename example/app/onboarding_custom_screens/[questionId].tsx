import {
  useOnboardingStep,
  OnboardingPage,
  LoaderStepType,
  CommitmentStepType,
} from "@rocapine/react-native-onboarding-studio";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { OnboardingStep } from "./types";

export const unstable_settings = {
  anchor: "(tabs)",
};



export default function QuestionPage() {
  const { questionId } = useLocalSearchParams();
  console.log("questionId", questionId);
  const { step, isLastStep, onboardingMetadata } = useOnboardingStep<OnboardingStep>({
    stepNumber: parseInt(questionId as string, 10),
  });


  const router = useRouter();

  const onContinue = (args?: any) => {
    if (isLastStep) {
      router.push("/");
      return;
    } else {
      router.push(`/onboarding/${parseInt(questionId as string, 10) + 1}`);
    }
  };

  // @ts-ignore
  return <OnboardingPage step={step} onContinue={onContinue} />;
}
