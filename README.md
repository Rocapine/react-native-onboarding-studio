# @rocapine/react-native-onboarding-studio

React Native SDK for Rocapine Onboarding Studio - A CMS-driven onboarding system for mobile apps. Build beautiful, customizable onboarding flows that update instantly without app releases.

## Features

- 🎨 **Pre-built Components**: Ready-to-use screens (ratings, pickers, carousels, media content, and more)
- 🔄 **CMS-Driven**: Update onboarding flows remotely without app releases
- 📱 **React Native**: Works with Expo and bare React Native projects
- 🎯 **Type-Safe**: Full TypeScript support with runtime validation
- 💾 **Offline Support**: Built-in caching with AsyncStorage
- 🎭 **Themeable**: Customizable colors and styling

## Installation

```bash
npm install @rocapine/react-native-onboarding-studio
```

### Required Dependencies

Install the required peer dependencies:

```bash
npm install expo-router react-native-reanimated react-native-gesture-handler react-native-svg @react-native-picker/picker @shopify/react-native-skia
```

If you're using Expo (recommended):

```bash
npx expo install expo-router react-native-reanimated react-native-gesture-handler react-native-svg @react-native-picker/picker @shopify/react-native-skia
```

## Quick Start

### 1. Set Up the Provider

Wrap your app with `OnboardingProvider` in your root layout (e.g., `app/_layout.tsx`):

```typescript
import {
  OnboardingProvider,
  OnboardingStudioClient,
  ProgressBar,
} from "@rocapine/react-native-onboarding-studio";
import { Stack } from "expo-router";

// Initialize the client with your project ID
const client = new OnboardingStudioClient("your-project-id", {
  appVersion: "1.0.0",
  isSanbdox: false, // Set to true for development
});

export default function RootLayout() {
  return (
    <OnboardingProvider
      client={client}
      locale="en"
      getStepsParams={{
        onboardingId: "your-onboarding-id", // From Rocapine dashboard
      }}
    >
      <ProgressBar />
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProvider>
  );
}
```

### 2. Create an Onboarding Screen

Create your onboarding screen using the `useOnboardingQuestions` hook:

```typescript
import {
  useOnboardingQuestions,
  OnboardingPage,
} from "@rocapine/react-native-onboarding-studio";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function OnboardingScreen() {
  const { stepNumber } = useLocalSearchParams();
  const router = useRouter();

  // Fetch the current step
  const { step, isLastStep } = useOnboardingQuestions({
    stepNumber: parseInt(stepNumber as string, 10),
  });

  const handleContinue = () => {
    if (isLastStep) {
      // Navigate to your main app
      router.push("/home");
    } else {
      // Go to next step
      router.push(`/onboarding/${parseInt(stepNumber as string, 10) + 1}`);
    }
  };

  return <OnboardingPage step={step} onContinue={handleContinue} />;
}
```

### 3. Start Your Onboarding Flow

Navigate to the first step:

```typescript
router.push("/onboarding/1");
```

That's it! Your onboarding flow is now ready to use.

## Configuration

### OnboardingProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `client` | `OnboardingStudioClient` | Required | Client instance |
| `isSandbox` | `boolean` | `false` | Enable sandbox mode (shows dev messages for unimplemented screens) |
| `locale` | `string` | `"en"` | Locale for fetching steps |
| `getStepsParams` | `object` | `{}` | Additional parameters for the API (e.g., `onboardingId`) |
| `cacheKey` | `string` | `"rocapine-onboarding-studio"` | AsyncStorage key for caching |
| `initialColorScheme` | `"light" \| "dark"` | `"light"` | Initial theme |

### OnboardingStudioClient Options

```typescript
const client = new OnboardingStudioClient(projectId, {
  appVersion: "1.0.0",    // Your app version
  isSanbdox: false,       // Enable sandbox mode
  platform: "ios",        // Platform (ios/android)
});
```

## Available Page Types

The SDK includes pre-built renderers for:

- **Ratings**: App store rating prompts with social proof
- **MediaContent**: Image/video content with title and description
- **Picker**: Interactive pickers (weight, height, age, gender, etc.)
- **Commitment**: User commitment/agreement screens
- **Carousel**: Multi-slide horizontal pagination
- **Loader**: Loading screens with sequential progress animations
- **Question**: Question/answer interactions

## Advanced Usage

### Using Individual Renderers

You can use individual renderers directly for custom implementations:

```typescript
import { MediaContentRenderer } from "@rocapine/react-native-onboarding-studio";

const step = {
  id: "welcome",
  type: "MediaContent",
  name: "Welcome",
  displayProgressHeader: true,
  payload: {
    title: "Welcome!",
    description: "Let's get started",
    media: { type: "image", url: "https://..." },
    ctaLabel: "Continue",
  },
  customPayload: null,
  continueButtonLabel: "Get Started",
  figmaUrl: null,
};

<MediaContentRenderer step={step} onContinue={handleContinue} />
```

### Custom Styling

The SDK uses a theming system. You can customize colors by passing `initialColorScheme` to the provider or by using the `useTheme` hook in your custom components.

## Local Development

### Setup

1. Clone the repository:

```bash
git clone https://github.com/rocapine/react-native-onboarding-studio.git
cd react-native-onboarding-studio
```

2. Install dependencies:

```bash
npm install
```

3. Build the package:

```bash
npm run build
```

4. Watch the changes

```bash
npm run watch
```

### Using in the example App

1. Go to example App : `cd example/`
2. Install dependencies : `npm install`
3. Start the app : `npm start`
4. Make changes to the source code of the package in `src/`
5. Repeat

#### Assets management

1. Add the asset in `./src/assets``
2. rerun the `npm run build` command to copy the asset in the dist folder

## Publishing to npm

### First-time Setup

1. Create an npm account at https://www.npmjs.com/signup

2. Login to npm:

```bash
npm login
```

3. If publishing a scoped package (@rocapine/...), ensure you have access to the organization or use public access flag.

### Publishing Steps

1. Update the version in `package.json`:

```bash
# Patch release (0.1.0 -> 0.1.1)
npm version patch

# Minor release (0.1.0 -> 0.2.0)
npm version minor

# Major release (0.1.0 -> 1.0.0)
npm version major
```

2. Build the package:

```bash
npm run build
```

3. Publish to npm:

```bash
# For scoped packages
npm publish --access public

# For regular packages
npm publish
```

### Pre-publish Checklist

- [ ] All tests pass
- [ ] Code is built (`npm run build`)
- [ ] Version number is updated
- [ ] README is up to date
- [ ] CHANGELOG is updated (if applicable)
- [ ] Git changes are committed

## API Reference

### `useOnboardingQuestions(options)`

Hook for accessing onboarding steps.

**Parameters:**
- `stepNumber` (number): The current step number (1-indexed)

**Returns:**
```typescript
{
  step: OnboardingStepType;      // Current step data
  isLastStep: boolean;            // True if this is the last step
  totalSteps: number;             // Total number of steps
}
```

### `OnboardingPage`

Component that renders the appropriate page based on step type.

**Props:**
```typescript
{
  step: OnboardingStepType;       // Step data
  onContinue: (args?) => void;    // Callback when user continues
  client?: OnboardingStudioClient; // Optional client for sandbox mode
}
```

## Troubleshooting

### Common Issues

**"Cannot find module 'expo-router'"**
- Make sure you've installed all peer dependencies
- For Expo projects, use `npx expo install expo-router`

**"useSuspenseQuery requires a Suspense boundary"**
- The SDK uses React Query's `useSuspenseQuery`
- Expo Router handles this automatically, but if you see errors, wrap your routes with a Suspense boundary

**Steps not loading**
- Verify your `projectId` and `onboardingId` are correct
- Check network connectivity
- In sandbox mode, check console logs for API responses

## Project Structure

```
src/
├── OnboardingStudioClient.ts    # API client
├── types.ts                      # Core types
├── index.ts                      # Public exports
├── infra/                        # Infrastructure layer
│   ├── provider/                 # OnboardingProvider
│   └── hooks/                    # useOnboardingQuestions
└── UI/
    ├── OnboardingPage.tsx        # Router component
    ├── Components/               # ProgressBar, etc.
    ├── Templates/                # OnboardingTemplate
    ├── Theme/                    # Theming system
    └── Pages/                    # Page type renderers
        ├── Ratings/
        ├── MediaContent/
        ├── Picker/
        ├── Commitment/
        ├── Carousel/
        ├── Loader/
        └── Question/
```

## Support

- 📧 Email: support@rocapine.com
- 🐛 Issues: [GitHub Issues](https://github.com/rocapine/react-native-onboarding-studio/issues)
- 📚 Documentation: [Rocapine Docs](https://docs.rocapine.com)

## License

MIT
