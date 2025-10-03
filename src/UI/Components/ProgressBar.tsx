import React from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

interface ProgressBarProps {
  value?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  width?: string | number;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 70,
  height = 6,
  backgroundColor = '#E5E5E7',
  progressColor = '#007AFF',
  width = '70%',
  animated = true,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const progressWidth = typeof width === 'string' ?
    (parseFloat(width) / 100) * screenWidth : width;

  const animatedWidth = React.useRef(new Animated.Value(0)).current;

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
    <View style={[styles.container]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 10,
  },
});