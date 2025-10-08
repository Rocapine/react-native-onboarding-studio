import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import { MediaContentStepType, MediaContentStepTypeSchema } from "./types";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

type ContentProps = {
  step: MediaContentStepType;
  onContinue: () => void;
};

const MediaContentRendererBase = ({ step, onContinue }: ContentProps) => {
  // Validate the schema
  const validatedData = MediaContentStepTypeSchema.parse(step);
  const { mediaSource, title, description } = validatedData.payload;

  const renderMedia = () => {
    if (mediaSource.type === "image") {
      // Check if it's a local path or URL
      if ("localPathId" in mediaSource) {
        // TODO: Map localPathId to actual local image path
        return (
          <View style={styles.mediaPlaceholder}>
            <Text style={styles.placeholderText}>
              Image: {mediaSource.localPathId}
            </Text>
          </View>
        );
      } else if ("url" in mediaSource) {
        return (
          <Image
            source={{ uri: mediaSource.url }}
            style={styles.mediaImage}
            resizeMode="cover"
          />
        );
      }
    } else if (mediaSource.type === "lottie") {
      // TODO: Implement Lottie animation support
      return (
        <View style={styles.mediaPlaceholder}>
          <Text style={styles.placeholderText}>Lottie Animation</Text>
        </View>
      );
    } else if (mediaSource.type === "rive") {
      // Rive animation placeholder
      return (
        <View style={styles.mediaPlaceholder}>
          <Text style={styles.placeholderText}>Rive Animation</Text>
        </View>
      );
    }

    return (
      <View style={styles.mediaPlaceholder}>
        <Text style={styles.placeholderText}>Media</Text>
      </View>
    );
  };

  return (
    <OnboardingTemplate
      step={step}
      onContinue={onContinue}
      button={{ text: validatedData.continueButtonLabel }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Media Content */}
          <View style={styles.mediaContainer}>{renderMedia()}</View>

          {/* Description/Subtitle */}
          {description && <Text style={styles.subtitle}>{description}</Text>}
        </View>
      </ScrollView>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 24,
    alignItems: "center",
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
  mediaContainer: {
    width: "100%",
    height: 400,
    borderRadius: 32,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#8e8e93",
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 31.2,
    color: "#3d3d3d",
    textAlign: "center",
  },
});

import { withErrorBoundary } from '../../ErrorBoundary';

export const MediaContentRenderer = withErrorBoundary(MediaContentRendererBase, 'MediaContent');
