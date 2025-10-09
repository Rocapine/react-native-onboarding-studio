import React, { useContext, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { OnboardingProgressContext } from "../Provider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../Theme/useTheme";

interface ProgressBarProps {
  value?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  width?: string | number;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  height = 6,
  backgroundColor,
  progressColor,
  width = "70%",
  animated = true,
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
  track: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    borderRadius: 10,
  },
});
