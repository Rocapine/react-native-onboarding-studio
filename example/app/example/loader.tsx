import * as OnboardingStudio from "@rocapine/react-native-onboarding-studio";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function LoaderExample() {
  const router = useRouter();

  const stepPayload = {
    title: "Curating your personalized profile...",
    steps: [
      { label: "Analyzing your cycles", completed: "Cycles analyzed" },
      { label: "Adjusting your profile", completed: "Profile adjusted" },
      {
        label: "Preparing your recommendations",
        completed: "Recommendations ready",
      },
    ],
    didYouKnowImages: [
      { type: "image" as const, url: "https://picsum.photos/300/200?random=1" },
      { type: "image" as const, url: "https://picsum.photos/300/200?random=2" },
      { type: "image" as const, url: "https://picsum.photos/300/200?random=3" },
    ],
    duration: 1000,
  } satisfies OnboardingStudio.LoaderStepType["payload"];

  const step = {
    id: "loader-1",
    type: "Loader",
    name: "Loader",
    displayProgressHeader: false,
    payload: stepPayload,
    customPayload: null,
    continueButtonLabel: "Access my profile",
    figmaUrl: null,
  } satisfies OnboardingStudio.LoaderStepType;

  const handleContinue = () => {
    console.log("Loader completed!");
    router.back();
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
