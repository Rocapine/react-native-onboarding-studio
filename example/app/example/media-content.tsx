import * as OnboardingUi from '@rocapine/react-native-onboarding-ui';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function MediaContentExample() {
  const router = useRouter();

  const stepPayload = {
    mediaSource: {
      type: 'image' as const,
      url: 'https://picsum.photos/400/400',
    },
    title: 'Welcome to Our Platform',
    description: 'Start your journey with us today and unlock amazing features',
    socialProof: {
      numberOfStar: 5,
      content: 'This app changed my life! Highly recommended for everyone.',
      authorName: 'John Doe',
    },
  } satisfies OnboardingUi.MediaContentStepType['payload'];

  const step = {
    id: 'media-content-1',
    type: 'MediaContent',
    name: 'MediaContent',
    displayProgressHeader: true,
    payload: stepPayload,
    customPayload: null,
    continueButtonLabel: 'Continue',
    figmaUrl: null,
  } satisfies OnboardingUi.MediaContentStepType;

  const handleContinue = () => {
    console.log('MediaContent completed!');
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingUi.MediaContentRenderer step={step} onContinue={handleContinue} />
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 32,
  },
});
