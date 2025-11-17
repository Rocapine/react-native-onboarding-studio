import {
  OnboardingPage,
} from "@rocapine/react-native-onboarding-ui";
import { useOnboardingStep } from "@rocapine/react-native-onboarding";
import { useLocalSearchParams, useRouter } from "expo-router";
import { OnboardingStep } from "./types";
import { MinimalAnswerButton } from "@/components/MinimalAnswerButton";

export const unstable_settings = {
  anchor: "(tabs)",
};



export default function QuestionPage() {
  const { questionId } = useLocalSearchParams();
  console.log("questionId", questionId);
  const { step, isLastStep } = useOnboardingStep<OnboardingStep>({
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
  return <OnboardingPage step={step} onContinue={onContinue} isSandbox={true} customComponents={{
    QuestionAnswerButton: MinimalAnswerButton,
  }} />;
}
