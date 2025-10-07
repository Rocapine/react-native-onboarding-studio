import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import { RatingsStepType, RatingsStepTypeSchema } from "./types";
import { useState } from "react";
import * as StoreReview from "expo-store-review";

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

export const RatingsRenderer = ({ step, onContinue }: RatingsRendererProps) => {
  const [hasOpenedRequestReview, setHasOpenedRequestReview] = useState(false);

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
      onContinue={handlePress}
      button={{
        text: !hasOpenedRequestReview
          ? rateTheAppButtonLabel
          : validatedData.continueButtonLabel,
      }}
    >
      <View style={styles.container}>
        {/* Status Bar Spacer */}
        <View style={styles.statusBarSpacer} />

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
                <Text style={styles.awardTitle}>Users Choice</Text>
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
            <View style={styles.reviewCard}>
              <View style={styles.reviewAuthor}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {mainReview.authorName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.authorName}>{mainReview.authorName}</Text>
              </View>

              <Text style={styles.reviewContent}>{mainReview.content}</Text>

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
                        { zIndex: 3 - index, marginLeft: index > 0 ? -10 : 0 },
                      ]}
                    >
                      <Text style={styles.smallAvatarText}>
                        {proof.authorName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.usersCountText}>
                  +{otherUsersCount.toLocaleString()} others
                </Text>
              </View>
            )}
          </View>

          {/* Title and Subtitle */}
          <View style={styles.textSection}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </ScrollView>
      </View>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  statusBarSpacer: {
    height: 48,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 48,
  },
  awardSection: {
    alignItems: "center",
    paddingVertical: 24,
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
    color: "#3d3d3d",
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
    alignItems: "center",
  },
  reviewCard: {
    backgroundColor: "#f6f6f6",
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
    color: "#4f4f4f",
  },
  reviewContent: {
    fontFamily: "System",
    fontSize: 16,
    lineHeight: 20.8,
    color: "#262626",
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
    borderColor: "#ffffff",
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
    color: "#4f4f4f",
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
    color: "#262626",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22.1,
    color: "#8e8e93",
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
