import * as OnboardingStudio from "@rocapine/react-native-onboarding-studio";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function LoaderCircleExample() {
  const router = useRouter();

  const stepPayload = {
    title: "Curating your personalized profile...",
    variant: "circle" as const,
    steps: [
      { label: "Evaluating your answers...", completed: "Answers evaluated" },
      { label: "Identifying patterns...", completed: "Patterns identified" },
      { label: "Personalizing...", completed: "Personalized" },
    ],
    didYouKnowImages: [
      { type: "image" as const, url: "https://picsum.photos/300/200?random=4" },
      { type: "image" as const, url: "https://picsum.photos/300/200?random=5" },
      { type: "image" as const, url: "https://picsum.photos/300/200?random=6" },
    ],
    duration: 2000,
  } satisfies OnboardingStudio.LoaderStepType["payload"];

  const step = {
    id: "loader-circle-1",
    type: "Loader",
    name: "Loader Circle Variant",
    displayProgressHeader: false,
    payload: stepPayload,
    customPayload: null,
    continueButtonLabel: "Continue",
    figmaUrl: null,
  } satisfies OnboardingStudio.LoaderStepType;

  const handleContinue = () => {
    console.log("Loader circle completed!");
    // router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingStudio.LoaderRenderer
        step={step}
        onContinue={handleContinue}
      />
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 32,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 32,
  },
});
