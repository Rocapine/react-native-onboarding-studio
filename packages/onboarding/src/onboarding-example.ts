import { Onboarding } from "./types";

export const onboardingExample = {
  metadata: {
    id: "example-onboarding",
    name: "Example Onboarding",
    audienceId: undefined,
    audienceName: undefined,
    audienceOrder: undefined,
    draft: true,
  },
  steps: [
    {
      id: "welcome",
      name: "Welcome",
      type: "MediaContent",
      payload: {
        title: "Welcome Test 11/12!",
        description: "Get started with your personalized experience",
        mediaSource: {
          url: "https://api-ninjas.com/images/cats/abyssinian.jpg",
          type: "image",
        },
      },
      figmaUrl: null,
      customPayload: {},
      continueButtonLabel: "Continue",
      displayProgressHeader: true,
    },
    {
      id: "question-favorite-color",
      name: "Favorite Color",
      type: "Question",
      payload: {
        title: "What's your favorite color?",
        answers: [
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
          { label: "Yellow", value: "yellow" },
        ],
        infoBox: null,
        subtitle: null,
        multipleAnswer: false,
      },
      figmaUrl: null,
      customPayload: {},
      displayProgressHeader: true,
    },
    {
      id: "picker-name",
      name: "Name",
      type: "Picker",
      payload: {
        title: "What's your name?",
        pickerType: "name",
        description: "",
      },
      figmaUrl: null,
      customPayload: {},
      continueButtonLabel: "Continue",
      displayProgressHeader: true,
    },
    {
      id: "loader-creating-profile",
      name: "Creating Profile",
      type: "Loader",
      payload: {
        steps: [
          {
            label: "Processing your information",
            completed: "Information processed",
          },
          { label: "Setting up your profile", completed: "Profile ready" },
          { label: "Preparing your experience", completed: "All set!" },
        ],
        title: "Creating your personalized profile...",
        variant: "bars",
        duration: 2000,
        didYouKnowImages: [
          { url: "https://picsum.photos/300/200?random=1", type: "image" },
          { url: "https://picsum.photos/300/200?random=2", type: "image" },
          { url: "https://picsum.photos/300/200?random=3", type: "image" },
        ],
      },
      figmaUrl: null,
      customPayload: {},
      continueButtonLabel: "Continue",
      displayProgressHeader: false,
    },
    {
      id: "ratings-app",
      name: "Rate the App",
      type: "Ratings",
      payload: {
        title: "Enjoying the app?",
        subtitle: "How do you rate our app?",
        socialProofs: [
          {
            content:
              "This app is amazing! It helped me get started quickly and the experience is so smooth.",
            authorName: "happyuser2024",
            numberOfStar: 5,
          },
        ],
        rateTheAppButtonLabel: "Rate the App",
      },
      figmaUrl: null,
      customPayload: {},
      continueButtonLabel: "Continue",
      displayProgressHeader: false,
    },
  ],
  configuration: {},
} satisfies Onboarding;
