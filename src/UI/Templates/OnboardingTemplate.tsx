import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OnboardingStepType } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../Theme/useTheme";

type OnboardingTemplateProps = {
  children: React.ReactNode;
  onContinue: () => void;
  button?: {
    text: string;
    disabled?: boolean;
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
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.lowest,
          paddingTop: step.displayProgressHeader ? top + 40 : top
        },
      ]}
    >
      {children}
      {button && (
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[
              styles.ctaButton,
              { backgroundColor: theme.colors.primary },
              button.disabled && { backgroundColor: theme.colors.disable },
            ]}
            onPress={onContinue}
            activeOpacity={0.8}
            disabled={button.disabled}
          >
            <Text
              style={[
                styles.ctaButtonText,
                { color: theme.colors.text.opposite },
                button.disabled && { color: theme.colors.text.disable },
              ]}
            >
              {button.text}
            </Text>
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
    borderRadius: 90,
    paddingVertical: 18,
    paddingHorizontal: 24,
    minWidth: 234,
    alignItems: "center",
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
});
