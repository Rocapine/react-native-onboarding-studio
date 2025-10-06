import { onboardingStudioClient, useOnboardingQuestions } from '@/onboarding/onboarding-studio';
import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
import { useLocalSearchParams, useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function QuestionPage() {
  const { questionId } = useLocalSearchParams();
  const { step, isLastStep } = useOnboardingQuestions({
    onboardingStepNumber: parseInt(questionId as string, 10),
  });

  const router = useRouter();

  const onContinue = (args?: any) => {
    console.log("isLastStep", isLastStep);
    if (isLastStep) {
      router.push('/');
      return;
    } else {
      router.push(`/onboarding/${parseInt(questionId as string, 10) + 1}`);
    }
  };

  return (
    <OnboardingStudio.OnboardingPage step={step} onContinue={onContinue} client={onboardingStudioClient} />
  );
}
