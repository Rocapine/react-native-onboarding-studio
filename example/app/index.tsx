import { Text } from 'react-native';
import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';




export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const stepPayload = {
    title: 'Why users love us',
    subtitle: 'Simple, effective, and reliable',
    socialProofs: [
      { numberOfStar: 5, content: 'Best app Ive used.', authorName: 'Emma Davis' },
      { numberOfStar: 4, content: 'Intuitive and powerful.', authorName: 'Mike Chen' },
      { numberOfStar: 3, content: 'This app has completely transformed how I manage my daily tasks. Highly recommended!', authorName: 'Sarah Johnson' },
      { numberOfStar: 2, content: 'Great app!', authorName: 'Lisa Anderson' },
      { numberOfStar: 1, content: 'Love it!', authorName: 'David Martinez' },
    ],
  } satisfies OnboardingStudio.RatingsStep['payload'];
  const step = {
    id: '1',
    type: 'Ratings',
    name: 'Ratings',
    displayProgressHeader: true,
    payload: stepPayload,
    customPayload: null,
    figmaUrl: null,
  } satisfies OnboardingStudio.RatingsStep;

  // return <Text>Hello</Text>
  return (
    <OnboardingStudio.RatingsRenderer step={step} />
  );
}
