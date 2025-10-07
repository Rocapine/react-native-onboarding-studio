import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OnboardingStepType } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type OnboardingTemplateProps = {
  children: React.ReactNode;
  onContinue: () => void;
  button: {
    text: string;
  };
  step: OnboardingStepType;
};

export const OnboardingTemplate = ({
  children,
  onContinue,
  step,
  button,
}: OnboardingTemplateProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: step.displayProgressHeader ? top + 40 : top },
      ]}
    >
      {children}
      {button && (
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaButtonText}>{button.text}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 8,
    gap: 24,
    alignItems: "center",
  },
  ctaButton: {
    backgroundColor: "#262626",
    borderRadius: 90,
    paddingVertical: 18,
    paddingHorizontal: 24,
    minWidth: 234,
    alignItems: "center",
  },
  ctaButtonText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    color: "#fff",
  },
});
