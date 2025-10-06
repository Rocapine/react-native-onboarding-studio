import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function LoaderExample() {
  const router = useRouter();

  const stepPayload = {};

  const step = {
    id: 'loader-1',
    type: 'Loader',
    name: 'Loader',
    displayProgressHeader: false,
    payload: stepPayload,
    customPayload: null,
    figmaUrl: null,
  } satisfies OnboardingStudio.LoaderStepType;

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.LoaderRenderer step={step} />
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
