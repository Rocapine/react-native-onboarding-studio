import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import {
  CarouselStepType,
  CarouselStepTypeSchema,
  CarouselScreenType,
} from "./types";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useRef, useState } from "react";

type ContentProps = {
  step: CarouselStepType;
  onContinue: () => void;
};

const CarouselRendererBase = ({ step, onContinue }: ContentProps) => {
  const validatedData = CarouselStepTypeSchema.parse(step);
  const { screens } = validatedData.payload;
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(event.nativeEvent.contentOffset.x / width);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const handleButtonPress = () => {
    const isLastPage = currentPage === screens.length - 1;

    if (isLastPage) {
      onContinue();
      return;
    }

    const nextPage = currentPage + 1;
    scrollViewRef.current?.scrollTo({
      x: nextPage * width,
      animated: true,
    });
    setCurrentPage(nextPage);
  };

  const isLastPage = currentPage === screens.length - 1;

  return (
    <OnboardingTemplate
      step={step}
      onContinue={handleButtonPress}
      button={{
        text: isLastPage ? validatedData.continueButtonLabel : "Next",
      }}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScroll}
          style={styles.scrollView}
        >
          {screens.map((screen, index) => (
            <CarouselScreen key={index} width={width} screen={screen} />
          ))}
        </ScrollView>

        {/* Page Indicators */}
        <View style={styles.indicatorContainer}>
          {screens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentPage && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      </View>
    </OnboardingTemplate>
  );
};

type CarouselScreenProps = {
  width: number;
  screen: CarouselScreenType;
};

const CarouselScreen = ({ width, screen }: CarouselScreenProps) => {
  const renderMedia = () => {
    const { mediaUrl } = screen;

    if (mediaUrl.includes(".riv")) {
      return (
        <View style={styles.mediaPlaceholder}>
          <Text style={styles.placeholderText}>Rive Animation</Text>
        </View>
      );
    } else if (mediaUrl.includes(".json")) {
      return <View style={styles.mediaPlaceholder}>
        <Text style={styles.placeholderText}>Lottie Animation</Text>
      </View>
    } else {
      return (
        <Image
          source={{ uri: mediaUrl }}
          style={styles.mediaImage}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <View style={[styles.screenContainer, { width }]}>
      {/* Media */}
      <View style={styles.mediaContainer}>{renderMedia()}</View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{screen.title}</Text>
        {screen.subtitle && (
          <Text style={styles.subtitle}>{screen.subtitle}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 32,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f6f6f6",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#8e8e93",
  },
  textContainer: {
    gap: 16,
    paddingBottom: 24,
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
  subtitle: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 31.2,
    color: "#3d3d3d",
    textAlign: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e5e5e5",
  },
  indicatorActive: {
    backgroundColor: "#1745de",
    width: 24,
  },
});

import { withErrorBoundary } from '../../ErrorBoundary';

export const CarouselRenderer = withErrorBoundary(CarouselRendererBase, 'Carousel');
