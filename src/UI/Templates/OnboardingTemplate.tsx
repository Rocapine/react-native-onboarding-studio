import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type OnboardingTemplateProps = {
  children: React.ReactNode;
  onContinue: () => void;
  button: {
    text: string;
  };
};

export const OnboardingTemplate = ({
  children,
  onContinue,
  button,
}: OnboardingTemplateProps) => {
  return (
    <View style={styles.container}>
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
    backgroundColor: "white",
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
