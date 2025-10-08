import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function ErrorTestExample() {
  const router = useRouter();

  // Intentionally invalid payload to test error boundary
  const invalidStep = {
    id: 'error-test-1',
    type: 'Question',
    name: 'Question',
    displayProgressHeader: true,
    payload: {
      title: 'Test Question',
      // Missing required 'answers' field
      // Missing required 'multipleAnswer' field
      subtitle: 'This should trigger a validation error',
    },
    customPayload: null,
    figmaUrl: null,
  } as any;

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.QuestionRenderer
        step={invalidStep}
        onContinue={(answers) => console.log('Selected:', answers)}
      />
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
