import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function CarouselExample() {
  const router = useRouter();

  const stepPayload = {
    screens: [
      {
        mediaUrl: 'https://picsum.photos/400/600',
        title: 'Welcome to Our App',
        subtitle: 'Discover amazing features',
      },
      {
        mediaUrl: 'https://picsum.photos/400/601',
        title: 'Track Your Progress',
        subtitle: 'See your improvements over time',
      },
      {
        mediaUrl: 'https://picsum.photos/400/602',
        title: 'Achieve Your Goals',
        subtitle: 'Stay motivated and reach new heights',
      },
    ],
  } satisfies OnboardingStudio.CarouselStepType['payload'];

  const step = {
    id: 'carousel-1',
    type: 'Carousel',
    name: 'Carousel',
    displayProgressHeader: true,
    payload: stepPayload,
    customPayload: null,
    figmaUrl: null,
  } satisfies OnboardingStudio.CarouselStepType;

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.CarouselRenderer step={step} />
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
