import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import { RatingsStepType, RatingsStepTypeSchema } from "./types";
import { useState } from "react";
import { useTheme } from "../../Theme/useTheme";

// Lazy load StoreReview - only needed for ratings screens
let StoreReview: any;
try {
  StoreReview = require("expo-store-review");
} catch (e) {
  // StoreReview not installed - will show error when ratings screen is used
  StoreReview = null;
}

interface RatingsRendererProps {
  step: RatingsStepType;
  onContinue?: () => void;
}

const StarIcon = ({ size, filled }: { size: number; filled: boolean }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M16 2L20.12 11.76L31 13.24L23.5 20.48L25.24 31.24L16 26.76L6.76 31.24L8.5 20.48L1 13.24L11.88 11.76L16 2Z"
      fill={filled ? "#FED64B" : "none"}
      stroke={filled ? "#FED64B" : "#D1D1D6"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const RatingsRendererBase = ({ step, onContinue }: RatingsRendererProps) => {
  const [hasOpenedRequestReview, setHasOpenedRequestReview] = useState(false);
  const { theme } = useTheme();

  // Check if StoreReview is available
  if (!StoreReview) {
    throw new Error(
      "Ratings screens require expo-store-review. Install it with: npx expo install expo-store-review"
    );
  }

  const handlePress = async () => {
    if (!hasOpenedRequestReview) {
      setHasOpenedRequestReview(true);
      if (await StoreReview.hasAction()) {
        // you can call StoreReview.requestReview()
        await StoreReview.requestReview();
      }
    } else {
      onContinue?.();
    }
  };
  // Validate the schema
  const validatedData = RatingsStepTypeSchema.parse(step);
  const { title, subtitle, socialProofs, rateTheAppButtonLabel } =
    validatedData.payload;

  // Get the first social proof to display (as shown in design)
  const mainReview = socialProofs[0];
  const otherUsersCount = socialProofs.length > 1 ? socialProofs.length - 1 : 0;

  const renderStars = (numberOfStar: number, size: number = 20) => {
    return (
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} size={size} filled={index < numberOfStar} />
        ))}
      </View>
    );
  };

  return (
    <OnboardingTemplate
      step={step}
      onContinue={handlePress}
      button={{
        text: !hasOpenedRequestReview
          ? rateTheAppButtonLabel
          : validatedData.continueButtonLabel,
      }}
    >
      <View style={styles.container}>
        {/* Main Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Award Section */}
          <View style={styles.awardSection}>
            <View style={styles.awardContainer}>
              <Image
                source={require("../../../assets/laurel-left.png")}
                style={styles.laurelImage}
                resizeMode="contain"
              />
              <View style={styles.awardTextContainer}>
                {renderStars(5, 32)}
                <Text style={[styles.awardTitle, { color: theme.colors.text.secondary }]}>Users Choice</Text>
              </View>
              <Image
                source={require("../../../assets/laurel-right.png")}
                style={styles.laurelImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Review Section */}
          <View style={styles.reviewSection}>
            <View style={[styles.reviewCard, { backgroundColor: theme.colors.neutral.lowest }]}>
              <View style={styles.reviewAuthor}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {mainReview.authorName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={[styles.authorName, { color: theme.colors.neutral.higher }]}>{mainReview.authorName}</Text>
              </View>

              <Text style={[styles.reviewContent, { color: theme.colors.text.primary }]}>{mainReview.content}</Text>

              {renderStars(mainReview.numberOfStar)}
            </View>

            {/* Other Users Count */}
            {otherUsersCount > 0 && (
              <View style={styles.usersCount}>
                <View style={styles.avatarGroup}>
                  {socialProofs.slice(1, 4).map((proof, index) => (
                    <View
                      key={index}
                      style={[
                        styles.smallAvatar,
                        {
                          zIndex: 3 - index,
                          marginLeft: index > 0 ? -10 : 0,
                          borderColor: theme.colors.surface.lowest
                        },
                      ]}
                    >
                      <Text style={styles.smallAvatarText}>
                        {proof.authorName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.usersCountText, { color: theme.colors.neutral.higher }]}>
                  +{otherUsersCount.toLocaleString()} others
                </Text>
              </View>
            )}
          </View>

          {/* Title and Subtitle */}
          <View style={styles.textSection}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.tertiary }]}>{subtitle}</Text>
          </View>
        </ScrollView>
      </View>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 48,
    paddingTop: 20,
    justifyContent: "space-between",
  },
  awardSection: {
    flex: 1,
    alignItems: "center",
  },
  awardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  laurelImage: {
    width: 27,
    height: 63,
  },
  awardTextContainer: {
    alignItems: "center",
    gap: 12,
  },
  awardTitle: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  reviewSection: {
    paddingHorizontal: 32,
    gap: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewCard: {
    borderRadius: 24,
    padding: 20,
    width: "100%",
    maxWidth: 326,
    gap: 16,
  },
  reviewAuthor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#d1d1d6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  authorName: {
    fontFamily: "System",
    fontSize: 15,
  },
  reviewContent: {
    fontFamily: "System",
    fontSize: 16,
    lineHeight: 20.8,
    textAlign: "center",
  },
  usersCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatarGroup: {
    flexDirection: "row",
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#d1d1d6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  smallAvatarText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  usersCountText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "500",
  },
  textSection: {
    paddingHorizontal: 32,
    gap: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  title: {
    fontFamily: "System",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 40,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22.1,
    textAlign: "center",
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 8,
    gap: 24,
    alignItems: "center",
  },
  ctaButton: {
    backgroundColor: "#262626",
    borderRadius: 90,
    paddingVertical: 18,
    paddingHorizontal: 24,
    minWidth: 234,
    alignItems: "center",
  },
  ctaButtonText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  homeIndicator: {
    width: 148,
    height: 5,
    backgroundColor: "#000000",
    borderRadius: 100,
    opacity: 0.3,
  },
});

import { withErrorBoundary } from "../../ErrorBoundary";

export const RatingsRenderer = withErrorBoundary(
  RatingsRendererBase,
  "Ratings"
);
