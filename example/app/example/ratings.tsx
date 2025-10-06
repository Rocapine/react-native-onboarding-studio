import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RatingsExample() {
  const router = useRouter();

  const stepPayload = {
    title: 'Why users love us',
    subtitle: 'Simple, effective, and reliable',
    socialProofs: [
      { numberOfStar: 5, content: 'Finally found a nutrition app that’s helping me hit my fitness goals. It’s all about eating the right foods and staying disciplined.I’ve already seen real changes in my body in just a month!', authorName: 'Emma Davis' },
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

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.RatingsRenderer step={step} />
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 1000,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
