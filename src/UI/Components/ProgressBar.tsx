import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { OnboardingProgressContext } from "../../infra/provider/OnboardingProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../Theme/useTheme";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

interface ProgressBarProps {
  value?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  height = 12,
  backgroundColor,
  progressColor,
  animated = true,
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { activeStep, totalSteps } = useContext(OnboardingProgressContext);
  const { top } = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);

  const progressPercentage = totalSteps > 0 ? (activeStep.number / totalSteps) : 0;

  // Use Reanimated shared value for smooth animations
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(progressPercentage, {
        duration: 300,
      });
    } else {
      progress.value = progressPercentage;
    }
  }, [progressPercentage, animated]);

  // Animated style for the progress bar
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const onLayoutContainer = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  // Use theme colors with fallback to props
  const trackBgColor = backgroundColor || theme.colors.neutral.lower;
  const barColor = progressColor || theme.colors.primary;

  return (
    activeStep.displayProgressHeader && (
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={styles.progressBarContainer}>
          {/* Left section: Back button */}
          <View style={styles.backButtonSection}>
            {router.canGoBack() && (
              <TouchableOpacity
                onPress={() => router.back()}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.backButton}
              >
                <ChevronLeft
                  size={24}
                  color={theme.colors.text.primary}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Center section: Progress bar */}
          <View style={styles.progressSection}>
            <View
              style={[styles.track, { height, backgroundColor: trackBgColor }]}
              onLayout={onLayoutContainer}
            >
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

          {/* Right section: Spacer */}
          <View style={styles.spacerSection} />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: "center",
    paddingBottom: 24,
  },
  progressBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
  },
  backButtonSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  backButton: {
    padding: 4,
  },
  progressSection: {
    flex: 5,
    alignItems: "flex-end",
  },
  spacerSection: {
    flex: 1,
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
