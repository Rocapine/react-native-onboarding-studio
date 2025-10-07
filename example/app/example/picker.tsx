import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function PickerExample() {
  const router = useRouter();

  const stepPayload = {
    title: 'What is your weight?',
    description: 'This helps us personalize your fitness plan',
    pickerType: 'weight' as const,
  } satisfies OnboardingStudio.PickerStepType['payload'];

  const step = {
    id: 'picker-1',
    type: 'Picker',
    name: 'Picker',
    displayProgressHeader: true,
    payload: stepPayload,
    customPayload: null,
    continueButtonLabel: 'Continue',
    figmaUrl: null,
  } satisfies OnboardingStudio.PickerStepType;

  const handleContinue = (value?: string | number) => {
    console.log('Picker completed! Weight:', value);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.PickerRenderer step={step} onContinue={handleContinue} />
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
