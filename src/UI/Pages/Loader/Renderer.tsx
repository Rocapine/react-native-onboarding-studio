import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import { LoaderStepType, LoaderStepTypeSchema, LoaderStep } from "./types";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  useWindowDimensions,
  Image,
} from "react-native";
import { useRef, useEffect, useState, useCallback } from "react";

type ContentProps = {
  step: LoaderStepType;
  onContinue: () => void;
};

const LoaderRendererBase = ({ step, onContinue }: ContentProps) => {
  const validatedData = LoaderStepTypeSchema.parse(step);
  const { title, steps, didYouKnowImages, duration } = validatedData.payload;

  const [isComplete, setIsComplete] = useState(false);
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  // Create animated values for each step
  const progressValues = useRef(
    steps.map(() => new Animated.Value(0))
  ).current;

  const handleAnimationComplete = useCallback(() => {
    setIsComplete(true);
    Animated.timing(buttonFadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [buttonFadeAnim]);

  useEffect(() => {
    // Animate each step sequentially
    const animations = progressValues.map((progress, index) =>
      Animated.timing(progress, {
        toValue: 1,
        duration: duration,
        delay: index * duration,
        useNativeDriver: false,
      })
    );

    Animated.sequence(animations).start(() => {
      handleAnimationComplete();
    });
  }, [progressValues, duration, handleAnimationComplete]);

  return (
    <OnboardingTemplate
      step={step}
      onContinue={onContinue}
      button={
        isComplete
          ? { text: validatedData.continueButtonLabel }
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Steps */}
          <View style={styles.stepsContainer}>
            {steps.map((stepItem, index) => (
              <StepProgress
                key={index}
                step={stepItem}
                progress={progressValues[index]}
              />
            ))}
          </View>

          {/* Did you know carousel */}
          {didYouKnowImages && didYouKnowImages.length > 0 && (
            <View style={styles.carouselSection}>
              <Text style={styles.carouselTitle}>Did you know?</Text>
              <DidYouKnowCarousel images={didYouKnowImages} />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Animated button */}
      {isComplete && (
        <Animated.View
          style={[styles.buttonContainer, { opacity: buttonFadeAnim }]}
        />
      )}
    </OnboardingTemplate>
  );
};

type StepProgressProps = {
  step: LoaderStep;
  progress: Animated.Value;
};

const StepProgress = ({ step, progress }: StepProgressProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => {
      if (value >= 1 && !isComplete) {
        setIsComplete(true);
      }
    });

    return () => progress.removeListener(listener);
  }, [progress, isComplete]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepLabel}>
          {isComplete ? step.completed : step.label}
        </Text>
        {isComplete && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.progressBar}>
        <Animated.View
          style={[styles.progressFill, { width: progressWidth }]}
        />
      </View>
    </View>
  );
};

type DidYouKnowCarouselProps = {
  images: Array<{ type: string; url?: string; localPathId?: string }>;
};

const DidYouKnowCarousel = ({ images }: DidYouKnowCarouselProps) => {
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContent}
    >
      {images.map((image, index) => {
        if (image.type === "image" && "url" in image && image.url) {
          return (
            <Image
              key={index}
              source={{ uri: image.url }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          );
        }
        // Placeholder for local images or other types
        return (
          <View key={index} style={styles.carouselPlaceholder}>
            <Text style={styles.placeholderText}>Image {index + 1}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 40,
  },
  title: {
    fontFamily: "System",
    fontSize: 38,
    fontWeight: "500",
    lineHeight: 49.4,
    color: "#262626",
    textAlign: "center",
    letterSpacing: -0.76,
  },
  stepsContainer: {
    gap: 24,
  },
  stepContainer: {
    gap: 12,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepLabel: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "500",
    color: "#262626",
  },
  checkmark: {
    fontSize: 20,
    color: "#34C759",
    fontWeight: "600",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e5e5e5",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1745de",
    borderRadius: 2,
  },
  carouselSection: {
    gap: 16,
    marginTop: 20,
  },
  carouselTitle: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "500",
    color: "#8e8e93",
    textAlign: "center",
  },
  carouselContent: {
    gap: 16,
    paddingHorizontal: 8,
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 16,
  },
  carouselPlaceholder: {
    width: 300,
    height: 200,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#8e8e93",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

import { withErrorBoundary } from '../../ErrorBoundary';

export const LoaderRenderer = withErrorBoundary(LoaderRendererBase, 'Loader');
