import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function CommitmentExample() {
  const router = useRouter();

  // Example with commitments list variant
  const stepPayloadWithCommitments = {
    title: "Let's commit",
    subtitle: "Starting today, I will",
    commitments: [
      { text: "Take care of my mental health" },
      { text: "Practice mindfulness daily" },
      { text: "Build healthy habits" },
    ],
    signatureCaption: "Your signature is not recorded",
    variant: "signature" as const,
  } satisfies OnboardingStudio.CommitmentStepType["payload"];

  // Example with description variant
  const stepPayloadWithDescription = {
    title: "Terms & Commitment",
    subtitle: "Please review and sign",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    signatureCaption: "Your signature is not recorded",
    variant: "signature" as const,
  } satisfies OnboardingStudio.CommitmentStepType["payload"];

  // Use the commitments list variant for this example
  const step = {
    id: 'commitment-1',
    type: 'Commitment',
    name: 'Commitment',
    displayProgressHeader: true,
    payload: stepPayloadWithCommitments,
    customPayload: null,
    continueButtonLabel: "I commit to myself",
    figmaUrl: "https://www.figma.com/design/oQ4b8R28pdkIq3nptR30uU/Concept-Base-Template?node-id=7119-2446&m=dev",
  } satisfies OnboardingStudio.CommitmentStepType;

  const handleContinue = () => {
    console.log('Commitment completed!');
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.CommitmentRenderer step={step} onContinue={handleContinue} />
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
