import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RatingsStepTypeSchema, RatingsStep } from './types';


interface RatingsRendererProps {
  step: RatingsStep;
  onContinue?: () => void;
}

export const RatingsRenderer = ({ step, onContinue }: RatingsRendererProps) => {
  // Validate the schema
  const validatedData = RatingsStepTypeSchema.parse(step);
  const { title, subtitle, socialProofs } = validatedData.payload;

  // Get the first social proof to display (as shown in design)
  const mainReview = socialProofs[0];
  const otherUsersCount = socialProofs.length > 1 ? socialProofs.length - 1 : 0;

  const renderStars = (numberOfStar: number) => {
    return (
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Text key={index} style={styles.star}>
            {index < numberOfStar ? '★' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  return (
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
            <Text style={styles.awardLeaf}>🌿</Text>
            <View style={styles.awardTextContainer}>
              {renderStars(5)}
              <Text style={styles.awardTitle}>Users Choice</Text>
            </View>
            <Text style={styles.awardLeaf}>🌿</Text>
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
                    style={[styles.smallAvatar, { zIndex: 3 - index, marginLeft: index > 0 ? -10 : 0 }]}
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

      {/* Bottom CTA */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Rate the app</Text>
        </TouchableOpacity>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    alignItems: 'center',
    paddingVertical: 24,
  },
  awardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  awardLeaf: {
    fontSize: 32,
  },
  awardTextContainer: {
    alignItems: 'center',
    gap: 12,
  },
  awardTitle: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '600',
    color: '#3d3d3d',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  star: {
    fontSize: 20,
    color: '#FFD700',
  },
  reviewSection: {
    paddingHorizontal: 32,
    gap: 24,
    alignItems: 'center',
  },
  reviewCard: {
    backgroundColor: '#f6f6f6',
    borderRadius: 24,
    padding: 20,
    width: '100%',
    maxWidth: 326,
    gap: 16,
  },
  reviewAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1d1d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  authorName: {
    fontFamily: 'System',
    fontSize: 15,
    color: '#4f4f4f',
  },
  reviewContent: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 20.8,
    color: '#262626',
    textAlign: 'center',
  },
  usersCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1d1d6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  smallAvatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  usersCountText: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
    color: '#4f4f4f',
  },
  textSection: {
    paddingHorizontal: 32,
    gap: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  title: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
    color: '#262626',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'System',
    fontSize: 17,
    lineHeight: 22.1,
    color: '#8e8e93',
    textAlign: 'center',
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 8,
    gap: 24,
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#262626',
    borderRadius: 90,
    paddingVertical: 18,
    paddingHorizontal: 24,
    minWidth: 234,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  homeIndicator: {
    width: 148,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
    opacity: 0.3,
  },
});
