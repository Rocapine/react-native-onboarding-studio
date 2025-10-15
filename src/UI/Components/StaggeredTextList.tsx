import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  interpolateColor,
  SharedValue,
} from "react-native-reanimated";
import { useTheme } from "../Theme/useTheme";
import { Theme } from "../Theme/types";

type TextItem = {
  label: string;
  completed: string;
};

type StaggeredTextListProps = {
  items: TextItem[];
  duration: number;
};

export const StaggeredTextList = ({
  items,
  duration,
}: StaggeredTextListProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Create a shared value to track the current active index
  const activeIndex = useSharedValue(0);

  useEffect(() => {
    // Reset animation
    activeIndex.value = 0;

    // Animate sequentially through each text
    const animateSequentially = async () => {
      for (let i = 0; i < items.length; i++) {
        activeIndex.value = i;

        // Wait for duration before moving to next
        // Last item stays longer
        const waitTime = i === items.length - 1 ? duration * 1.5 : duration;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    };

    animateSequentially();
  }, [items, duration, activeIndex]);

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <AnimatedTextItem
          key={index}
          item={item}
          index={index}
          activeIndex={activeIndex}
          totalItems={items.length}
        />
      ))}
    </View>
  );
};

type AnimatedTextItemProps = {
  item: TextItem;
  index: number;
  activeIndex: SharedValue<number>;
  totalItems: number;
};

const AnimatedTextItem = ({
  item,
  index,
  activeIndex,
  totalItems,
}: AnimatedTextItemProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const animatedStyle = useAnimatedStyle(() => {
    const isActive = activeIndex.value === index;
    const wasActive = activeIndex.value > index;
    const willBeActive = activeIndex.value < index;

    // Opacity animation
    const opacity = withTiming(
      isActive ? 1 : wasActive ? 0.6 : willBeActive ? 0.4 : 0.4,
      {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }
    );

    // Color interpolation
    const color = interpolateColor(
      isActive ? 1 : 0,
      [0, 1],
      [theme.colors.text.disable, theme.colors.text.primary]
    );

    // Subtle translateY for active text
    const translateY = withTiming(isActive ? 0 : 2, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Pulse effect for the last active item
    const scale =
      isActive && index === totalItems - 1
        ? withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(1.05, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        )
        : 1;

    return {
      opacity,
      color,
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <Animated.Text style={[styles.text, animatedStyle]}>
      {item.label}
    </Animated.Text>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 8,
      alignItems: "center",
      width: "100%",
    },
    text: {
      fontFamily: theme.typography.fontFamily.text,
      fontSize: theme.typography.textStyles.heading3.fontSize,
      fontWeight: theme.typography.fontWeight.medium,
      textAlign: "center",
      lineHeight:
        theme.typography.textStyles.heading3.fontSize * theme.typography.lineHeight.normal,
      letterSpacing: 0.3,
    },
  });
