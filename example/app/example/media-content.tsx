import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
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
      numberOfUsers: 276000,
      stars: 5,
    },
  } satisfies OnboardingStudio.MediaContentStepType['payload'];

  const step = {
    id: 'media-content-1',
    type: 'MediaContent',
    name: 'MediaContent',
    displayProgressHeader: true,
    payload: stepPayload,
    customPayload: null,
    figmaUrl: null,
  } satisfies OnboardingStudio.MediaContentStepType;

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.MediaContentRenderer step={step} />
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
