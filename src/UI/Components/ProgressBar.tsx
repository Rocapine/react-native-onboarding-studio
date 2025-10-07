import React, { useContext } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";
import { OnboardingProgressContext } from "../Provider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  backgroundColor = "#E5E5E7",
  progressColor = "#007AFF",
  width = "70%",
  animated = true,
}) => {
  const { activeStep, totalSteps } = useContext(OnboardingProgressContext);
  const { top } = useSafeAreaInsets();
  const value = (activeStep.number / totalSteps) * 100;
  const screenWidth = Dimensions.get("window").width;
  const progressWidth =
    typeof width === "string" ? (parseFloat(width) / 100) * screenWidth : width;
  const animatedWidth = new Animated.Value(0);

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: (value / 100) * progressWidth,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue((value / 100) * progressWidth);
    }
  }, [value, progressWidth, animated, animatedWidth]);

  return (
    activeStep.displayProgressHeader && (
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={[styles.track, { height, backgroundColor }]}>
          <Animated.View
            style={[
              styles.progress,
              {
                height,
                backgroundColor: progressColor,
                width: animatedWidth,
              },
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
