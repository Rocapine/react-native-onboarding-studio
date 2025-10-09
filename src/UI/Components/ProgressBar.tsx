import React, { useContext, useEffect } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { OnboardingProgressContext } from "../../infra/provider/OnboardingProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../Theme/useTheme";
import { ChevronLeft } from "lucide-react-native";

interface ProgressBarProps {
  value?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  width?: string | number;
  animated?: boolean;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  height = 6,
  backgroundColor,
  progressColor,
  width = "70%",
  animated = true,
  onBack,
  canGoBack = false,
}) => {
  const { theme } = useTheme();
  const { activeStep, totalSteps } = useContext(OnboardingProgressContext);
  const { top } = useSafeAreaInsets();
  const value = (activeStep.number / totalSteps) * 100;
  const screenWidth = Dimensions.get("window").width;
  const progressWidth =
    typeof width === "string" ? (parseFloat(width) / 100) * screenWidth : width;

  // Use Reanimated shared value for smooth animations
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(value / 100, {
        duration: 300,
      });
    } else {
      progress.value = value / 100;
    }
  }, [value, animated]);

  // Animated style for the progress bar
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progress.value * progressWidth,
    };
  });

  // Use theme colors with fallback to props
  const trackBgColor = backgroundColor || theme.colors.neutral.lower;
  const barColor = progressColor || theme.colors.primary;

  return (
    activeStep.displayProgressHeader && (
      <View style={[styles.container, { paddingTop: top }]}>
        {canGoBack && onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft
              size={24}
              color={theme.colors.text.primary}
              strokeWidth={2}
            />
          </TouchableOpacity>
        )}
        <View style={[styles.track, { height, backgroundColor: trackBgColor }]}>
          <Animated.View
            style={[
              styles.progress,
              {
                height,
                backgroundColor: barColor,
              },
              animatedStyle,
            ]}
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 70,
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 0,
    zIndex: 2,
    padding: 4,
  },
  track: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    borderRadius: 10,
  },
});
