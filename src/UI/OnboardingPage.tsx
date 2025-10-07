import { OnboardingStudioClient } from "../OnboardingStudioClient";
import { OnboardingStepType } from "./types";
import { RatingsRenderer, PickerRenderer, CommitmentRenderer, CarouselRenderer, LoaderRenderer, MediaContentRenderer, QuestionRenderer } from "./Pages";
import { View, Text, Button } from 'react-native';


interface OnboardingPageProps {
  step: OnboardingStepType;
  onContinue: (args?: any) => void;
  client: OnboardingStudioClient;
}

export const OnboardingPage = ({ step, onContinue, client }: OnboardingPageProps) => {
  switch (step.type) {
    case 'Ratings':
      return <RatingsRenderer step={step} onContinue={onContinue} />;
    case 'Picker':
      return <PickerRenderer step={step} onContinue={onContinue} />;
    case 'Commitment':
      return <CommitmentRenderer step={step} onContinue={onContinue} />;
    case 'Carousel':
      return <CarouselRenderer step={step} onContinue={onContinue} />;
    case 'MediaContent':
      return <MediaContentRenderer step={step} onContinue={onContinue} />;
    case 'Loader':
      return <LoaderRenderer step={step} onContinue={onContinue} />;
    case 'Question':
      return <QuestionRenderer step={step} onContinue={onContinue} />;
    default:
      if (client.options.isSanbdox) {
        // @ts-ignore
        const stepType = step.type;
        return <View>
          <Text>Screen {stepType} not implemented</Text>
          <Button title="Continue" onPress={onContinue} />
        </View>
      } else {
        onContinue("onboarding_screen_not_implemented");
        return <View>
          <Text>You are almost done</Text>
          <Button title="Continue" onPress={onContinue} />
        </View>
      }
  }
};