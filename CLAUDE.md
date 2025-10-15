# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native library (`@rocapine/react-native-onboarding-studio`) that provides a client SDK for Rocapine Onboarding Studio - a CMS-driven onboarding system for mobile apps. The library fetches onboarding steps from a CMS and renders them as native React Native screens.

## Development Commands

### Build

```bash
npm run build
```

Compiles TypeScript to `dist/` and copies assets from `src/assets` to `dist/assets`.

### Watch Mode

```bash
npm run watch
```

Watches for changes and rebuilds automatically (does not copy assets).

**Important**: When adding or modifying assets in `src/assets/`, you must run `npm run build` to copy them to `dist/`.

### Testing in Example App

```bash
cd example/
npm install
npm start
```

## Architecture

### Core Components

**OnboardingStudioClient** (`src/OnboardingStudioClient.ts`)

- Main API client class
- Fetches onboarding steps from Supabase backend
- Handles URL parameters: `projectId`, `platform`, `appVersion`, `locale`, `draft` mode
- Returns step data along with custom headers (`ONBS-Onboarding-Id`, `ONBS-Audience-Id`, `ONBS-Onboarding-Name`)

**OnboardingProvider** (`src/infra/provider/OnboardingProvider.tsx`)

- Main provider component that wraps your app
- Accepts `OnboardingStudioClient` instance and configuration
- Manages query state, caching with AsyncStorage, and progress context
- **Automatically includes ProgressBar** - no need to add it separately
- Internally wraps with `QueryClientProvider`, `SafeAreaProvider`, and `ThemeProvider`
- Configuration props:
  - `client`: OnboardingStudioClient instance (required)
  - `isSandbox`: Enable sandbox mode (default: false)
  - `locale`: Locale for fetching steps (default: "en")
  - `getStepsParams`: Additional params for getSteps API call
  - `cacheKey`: AsyncStorage key for caching (default: "rocapine-onboarding-studio")
  - `initialColorScheme`: Theme color scheme (default: "light")
  - `theme`: Custom theme to override both light and dark modes (optional)
  - `lightTheme`: Custom theme tokens for light mode only (optional)
  - `darkTheme`: Custom theme tokens for dark mode only (optional)
  - `customComponents`: Custom UI component overrides (optional)

**useOnboardingQuestions** (`src/infra/hooks/useOnboardingQuestions.ts`)

- Hook to access onboarding steps in your pages
- Accepts `stepNumber` parameter
- Returns `{ step, isLastStep, totalSteps }`
- Automatically manages progress context (activeStep, totalSteps)
- Uses React Query's `useSuspenseQuery` for data fetching

**OnboardingPage** (`src/UI/OnboardingPage.tsx`)

- Central routing component that renders the appropriate page based on step type
- Uses switch statement to delegate to specific Renderers
- Handles fallback for unimplemented step types (sandbox mode shows dev message, production auto-continues)
- Props: `step`, `onContinue`, optional `client` (for sandbox detection)

**Page Types** (`src/UI/Pages/`)
Each page type follows a consistent pattern:

- `types.ts`: Zod schemas defining step structure and validation
- `Renderer.tsx`: React component that renders the step
- `index.ts`: Exports

Available page types:

- `Ratings`: App store rating prompts with social proofs
- `MediaContent`: Image/video content with title/description
- `Picker`: Selection UI for user choices
- `Commitment`: User commitment/agreement screens
- `Carousel`: Multi-slide content presentation with horizontal pagination
- `Loader`: Loading/transition screens
- `Question`: Question/answer interactions

### Shared Infrastructure

**OnboardingTemplate** (`src/UI/Templates/OnboardingTemplate.tsx`)

- Reusable layout wrapper for onboarding screens
- Handles safe area insets
- Manages progress header display based on `step.displayProgressHeader`
- Provides standardized CTA button at bottom

**ProgressBar** (`src/UI/Components/ProgressBar.tsx`)

- **Automatically included in `OnboardingProvider`** - no need to add it manually
- Global progress indicator component
- Automatically shows/hides based on `step.displayProgressHeader`
- Uses Reanimated for smooth width animations (300ms duration)
- Integrates directly with expo-router for automatic back navigation
- Three-column responsive layout: back button (flex: 1) | progress bar (flex: 5) | spacer (flex: 1)

**Back Navigation:**

- Uses `useRouter()` from expo-router internally
- Back button appears automatically when `router.canGoBack()` returns `true`
- Renders a chevron-left icon using `lucide-react-native`
- Automatically uses theme colors (`theme.colors.text.primary`)
- Positioned on the left side (flex: 1 section)

**Control Back Navigation:**

Use `router.push()` vs `router.replace()` in your step handlers to control when users can navigate back:

```typescript
// app/onboarding/[questionId].tsx
const onContinue = () => {
  if (isLastStep) {
    // Exit onboarding - prevent going back
    router.replace("/");
  } else {
    // Normal progression - allow back navigation
    router.push(`/onboarding/${nextStep}`);
  }
};
```

See the example app's `app/onboarding/[questionId].tsx` for full implementation.

**Common Types** (`src/UI/Pages/types.ts`)

- Shared Zod schemas: `CustomPayloadSchema`, `MediaSourceSchema`, `SocialProofSchema`, `InfoBoxSchema`
- `MediaSourceSchema`: Defines media types (image/lottie/rive) with url or localPathId
- Used across multiple page types for consistency

### Type System

All step types use Zod for runtime validation and TypeScript type inference:

```typescript
const StepTypeSchema = z.object({ ... });
export type StepType = z.infer<typeof StepTypeSchema>;
```

Common step properties:

- `id`: Unique identifier
- `type`: Discriminated union field (e.g., "Ratings", "MediaContent")
- `name`: Display name
- `displayProgressHeader`: Boolean to show/hide progress UI
- `payload`: Step-specific data (validated by schema)
- `customPayload`: Additional user-defined fields
- `continueButtonLabel`: Optional CTA text
- `figmaUrl`: Optional design reference

## Publishing Workflow

1. Update version: `npm version [patch|minor|major]`
2. Build: `npm run build`
3. Publish: `npm publish --access public`

The `prepare` script automatically runs build on `npm install`.

## Example App

The `example/` directory contains an Expo app demonstrating all page types.

### Development Commands

```bash
cd example/
npm install           # Install dependencies
npm start            # Start Expo dev server
npm run type         # Run TypeScript type checking
npm run android      # Run on Android
npm run ios          # Run on iOS
```

### Structure

- `app/example/` - Individual page type examples
  - `carousel.tsx` - Carousel page example
  - `media-content.tsx` - MediaContent page example
  - `picker.tsx` - Picker page example
  - `commitment.tsx` - Commitment page example
  - `loader.tsx` - Loader page example
- `app/onboarding/` - Full onboarding flow examples
- `app/_layout.tsx` - Root layout with `OnboardingProvider` setup

### Setup Pattern

In your root `_layout.tsx`, set up the provider:

```typescript
import {
  OnboardingProvider,
  OnboardingStudioClient,
} from "@rocapine/react-native-onboarding-studio";
import { Stack } from "expo-router";

const client = new OnboardingStudioClient("your-project-id", {
  appVersion: "1.0.0",
  isSanbdox: true,
});

export default function RootLayout() {
  return (
    <OnboardingProvider
      client={client}
      isSandbox={true}
      locale="en"
      getStepsParams={{
        onboardingId: "your-onboarding-id",
      }}
      // Optional: Customize theme
      theme={{
        colors: {
          primary: "#FF5733",
        },
        typography: {
          fontFamily: {
            title: "CustomFont-Bold",
          },
        },
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProvider>
  );
}
```

**Note:** The ProgressBar is automatically included in the provider - no manual setup needed!

### Page Pattern

In your onboarding pages, use the hook and component:

```typescript
import {
  useOnboardingQuestions,
  OnboardingPage,
} from "@rocapine/react-native-onboarding-studio";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function QuestionPage() {
  const { questionId } = useLocalSearchParams();
  const { step, isLastStep } = useOnboardingQuestions({
    stepNumber: parseInt(questionId as string, 10),
  });

  const router = useRouter();

  const onContinue = (args?: any) => {
    if (isLastStep) {
      router.push("/");
    } else {
      router.push(`/onboarding/${parseInt(questionId as string, 10) + 1}`);
    }
  };

  return <OnboardingPage step={step} onContinue={onContinue} />;
}
```

### Individual Renderer Pattern

For standalone page examples, you can use individual renderers:

```typescript
import * as OnboardingStudio from "@rocapine/react-native-onboarding-studio";

const stepPayload = {
  /* ... */
} satisfies OnboardingStudio.XxxStepType["payload"];

const step = {
  id: "example-1",
  type: "MediaContent",
  name: "Example",
  displayProgressHeader: true,
  payload: stepPayload,
  customPayload: null,
  continueButtonLabel: "Continue", // Optional but recommended for type safety
  figmaUrl: null,
} satisfies OnboardingStudio.MediaContentStepType;

const handleContinue = () => {
  console.log("Step completed!");
  // Navigate or continue to next step
};

return (
  <OnboardingStudio.MediaContentRenderer
    step={step}
    onContinue={handleContinue}
  />
);
```

### Important Notes

- The example app uses `@rocapine/react-native-onboarding-studio` as a local dependency via `"file:.."`
- After making changes to the library, run `npm run build` in the root, then reload the example app
- `OnboardingProvider` automatically includes the `ProgressBar` component - **do not add it manually**
- Control back navigation using `router.push()` vs `router.replace()` in your `onContinue` handlers
- Individual renderers should NEVER include their own `ProgressBar`
- The `useOnboardingQuestions` hook uses `useSuspenseQuery`, so wrap routes with proper Suspense boundaries if needed

## Theme Customization

The SDK provides a comprehensive theming system with semantic text styles, custom colors, and typography tokens that match Figma design specifications.

### Quick Start

```typescript
<OnboardingProvider
  client={client}
  theme={{
    colors: { primary: "#FF5733" },
    typography: {
      fontFamily: { title: "CustomFont-Bold" }
    }
  }}
>
```

---

## Color Customization

### Available Color Tokens

```typescript
colors: {
  primary: string,           // Main brand color (buttons, accents)
  secondary: string,          // Secondary brand color
  disable: string,            // Disabled state color

  tertiary: {
    tertiary1: string,        // Accent color 1
    tertiary2: string,        // Accent color 2
    tertiary3: string,        // Accent color 3
  },

  neutral: {
    highest: string,          // Darkest neutral
    higher: string,
    high: string,
    medium: string,
    low: string,
    lower: string,
    lowest: string,           // Lightest neutral
  },

  surface: {
    lowest: string,           // Background color
    lower: string,
    low: string,
    medium: string,
    high: string,
    higher: string,
    highest: string,
    opposite: string,         // Opposite of background
  },

  text: {
    primary: string,          // Main text color
    secondary: string,        // Secondary text
    tertiary: string,         // Tertiary text
    opposite: string,         // Opposite of primary
    disable: string,          // Disabled text
  }
}
```

### Color Customization Examples

**Override primary color:**

```typescript
<OnboardingProvider theme={{ colors: { primary: "#007AFF" } }} />
```

**Mode-specific colors:**

```typescript
<OnboardingProvider
  lightTheme={{ colors: { primary: "#007AFF" } }}
  darkTheme={{ colors: { primary: "#0A84FF" } }}
/>
```

**Nested color overrides:**

```typescript
<OnboardingProvider
  theme={{
    colors: {
      neutral: { lowest: "#F5F5F5" },
      text: { primary: "#1A1A1A" },
    },
  }}
/>
```

---

## Typography Customization

### Semantic Text Styles

The SDK provides semantic text styles that match Figma design specifications:

```typescript
textStyles: {
  heading1: {
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 1.25,
    fontFamily: "title"
  },
  heading2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 1.3,
    fontFamily: "title"
  },
  heading3: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 1.3,
    fontFamily: "text"
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 1.3,
    fontFamily: "text"
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 1.3,
    fontFamily: "text"
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 1.3,
    fontFamily: "text"
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 1.3,
    fontFamily: "text"
  },
  button: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 1.5,
    fontFamily: "text"
  }
}
```

### Font Family Customization

**IMPORTANT:** The SDK accepts font names but does not load fonts. You must load custom fonts in your app using `expo-font` or React Native's asset linking.

**Step 1: Load fonts in your app**

```typescript
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return <OnboardingProvider ... />
}
```

**Step 2: Customize font families**

```typescript
<OnboardingProvider
  theme={{
    typography: {
      fontFamily: {
        title: "Poppins-Bold", // Used by heading1, heading2
        text: "Roboto-Regular", // Used by body, button, etc.
        tagline: "Poppins-Bold", // Used by special text
      },
    },
  }}
/>
```

### Typography Token Customization

**Override font sizes:**

```typescript
<OnboardingProvider
  theme={{
    typography: {
      fontSize: {
        xl: 28, // heading2 size
        "2xl": 36, // heading1 size
      },
    },
  }}
/>
```

**Override font weights:**

```typescript
<OnboardingProvider
  theme={{
    typography: {
      fontWeight: {
        semibold: "700", // Make semibold bolder
      },
    },
  }}
/>
```

**Override text styles:**

```typescript
<OnboardingProvider
  theme={{
    typography: {
      textStyles: {
        heading1: {
          fontSize: 40,
          fontWeight: "700",
          lineHeight: 1.2,
          fontFamily: "title",
        },
      },
    },
  }}
/>
```

### Available Typography Tokens

```typescript
typography: {
  fontFamily: {
    title: string,      // Display/heading font
    text: string,       // Body/UI font
    tagline: string,    // Special emphasis font
  },

  fontSize: {
    xs: number,         // 12px
    sm: number,         // 14px
    md: number,         // 16px
    lg: number,         // 20px
    xl: number,         // 24px
    "2xl": number,      // 32px
    "3xl": number,      // 40px
    "4xl": number,      // 72px
  },

  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  lineHeight: {
    tight: number,      // 1.25
    normal: number,     // 1.3
    relaxed: number,    // 1.4
  }
}
```

---

## Using Theme in Custom Components

### Using Colors and Raw Tokens

```typescript
import { useTheme } from "@rocapine/react-native-onboarding-studio";

function MyComponent() {
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.surface.lowest }}>
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.textStyles.heading3.fontSize,
        }}
      >
        Hello
      </Text>
    </View>
  );
}
```

### Using Semantic Text Styles

```typescript
import {
  useTheme,
  getTextStyle,
} from "@rocapine/react-native-onboarding-studio";

function MyComponent() {
  const { theme } = useTheme();

  return (
    <View>
      <Text
        style={[
          getTextStyle(theme, "heading1"),
          { color: theme.colors.text.primary },
        ]}
      >
        Title
      </Text>
      <Text
        style={[
          getTextStyle(theme, "body"),
          { color: theme.colors.text.secondary },
        ]}
      >
        Body text
      </Text>
    </View>
  );
}
```

---

## Complete Example

```typescript
import { useFonts } from "expo-font";
import { OnboardingProvider } from "@rocapine/react-native-onboarding-studio";

export default function App() {
  const [fontsLoaded] = useFonts({
    "CustomFont-Bold": require("./assets/fonts/CustomFont-Bold.ttf"),
    "CustomFont-Regular": require("./assets/fonts/CustomFont-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <OnboardingProvider
      client={client}
      theme={{
        colors: {
          primary: "#FF5733",
          text: { primary: "#1A1A1A" },
        },
        typography: {
          fontFamily: {
            title: "CustomFont-Bold",
            text: "CustomFont-Regular",
          },
          textStyles: {
            heading1: {
              fontSize: 36,
              fontWeight: "700",
              lineHeight: 1.2,
              fontFamily: "title",
            },
          },
        },
      }}
    >
      <YourApp />
    </OnboardingProvider>
  );
}
```

---

## Default Theme Reference

Import and extend default tokens:

```typescript
import {
  lightTokens,
  darkTokens,
  typography,
} from "@rocapine/react-native-onboarding-studio";

const myTheme = {
  colors: {
    ...lightTokens.colors,
    primary: "#FF5733",
  },
  typography: {
    ...typography,
    fontFamily: {
      ...typography.fontFamily,
      title: "CustomFont-Bold",
    },
  },
};
```

## File Organization

```
src/
├── OnboardingStudioClient.ts    # API client
├── types.ts                      # Core types
├── index.ts                      # Public exports
├── infra/                        # Infrastructure layer
│   ├── provider/                 # OnboardingProvider with query management
│   └── hooks/                    # useOnboardingQuestions hook
└── UI/
    ├── OnboardingPage.tsx        # Main router component
    ├── Theme/                    # Theme system
    │   ├── ThemeProvider.tsx     # Theme context provider
    │   ├── useTheme.ts          # Theme hook
    │   ├── types.ts             # Theme type definitions
    │   ├── utils.ts             # Deep merge utilities
    │   └── tokens/              # Default theme tokens
    │       ├── lightTokens.ts
    │       ├── darkTokens.ts
    │       └── typography.ts
    ├── Templates/                # Reusable layouts
    ├── Components/               # Shared UI components (e.g., ProgressBar)
    └── Pages/                    # Step type implementations
        ├── Ratings/
        ├── MediaContent/
        ├── Picker/
        ├── Commitment/
        ├── Carousel/
        ├── Loader/
        └── Question/
```

## Adding a New Page Type

1. Create directory in `src/UI/Pages/{NewType}/`
2. Add `types.ts` with Zod schema and inferred TypeScript type
   - Include `continueButtonLabel: z.string().optional().default("Continue")`
3. Add `Renderer.tsx` component following these guidelines:
   - **DO NOT** include `ProgressBar` component - it's automatically added by `OnboardingProvider`
   - Use `OnboardingTemplate` for consistent layout and CTA button
   - Use `ScrollView` for content that may exceed screen height
   - Validate step data with Zod: `const validatedData = StepTypeSchema.parse(step)`
   - Use button label from validated data: `button={{ text: validatedData.continueButtonLabel }}`
4. Add `index.ts` to export both types and renderer
5. Export from `src/UI/Pages/index.ts`
6. Add type to union in `src/UI/types.ts`
7. Add case to switch in `src/UI/OnboardingPage.tsx`
8. Always use values from useTheme() like in Loader/Renderer.tsx
9. When creating variant of the same screens make sure to add it in the example app and add it to the list of examples in example/app/example/index.tsx

### Screen Implementation Guidelines

- **ProgressBar**: NEVER include in individual screens - it's automatically added by `OnboardingProvider`
- **Validation**: Always validate step data using the Zod schema
- **Layout**: Use `OnboardingTemplate` for consistent structure, safe areas, and button positioning
- **Scrolling**: Wrap content in `ScrollView` to handle overflow gracefully
- **Button Labels**: Use `validatedData.continueButtonLabel` to support customization
- **Component Reuse**: Only reuse components that make sense for the specific page type. For example:
  - Star ratings and social proof cards belong in `Ratings` screens
  - Don't copy components from other renderers unless they're truly needed for the design
- **Media Rendering**: Use `MediaSourceSchema` for consistent media handling across page types
  - Supports image (url or localPathId), lottie, and rive media types
  - Implement placeholder views for unsupported media types during development
  - Always use alwaysBounceVertical={false} when using ScrollView

### Special Page Patterns

**Carousel**: Multi-screen horizontal pagination

- Uses horizontal `ScrollView` with `pagingEnabled`
- Tracks current page with `useState` and `onMomentumScrollEnd`
- Button label changes based on page: "Next" for intermediate pages, `continueButtonLabel` for last page
- Includes page indicators (dots) showing progress through carousel
- Each screen has its own media and text content

**Picker**: Type-specific input pickers with routing pattern

- **Requires**: `@react-native-picker/picker` peer dependency
- Main renderer routes to specific picker implementations based on `pickerType`
- Supports: `weight`, `height`, `age`, `gender`, `coach`, `name` (extend as needed)
- Example: Weight Picker
  - Uses native `Picker` component from `@react-native-picker/picker`
  - Two-column layout: weight value (65%) and unit (35%)
  - Weight range: 1-300 kg or 1-660 lb (descending order)
  - Unit switch resets weight to default (70 kg or 154 lb)
  - Returns value as "value-unit" format (e.g., "70-kg")
- `onContinue` callback receives selected value as parameter
- Easy to extend: add new picker types by checking `pickerType` in main renderer

**Loader**: Sequential progress animation with optional carousel

- Uses React Native's built-in `Animated` API (NOT Reanimated)
- Displays sequential progress bars for each step with configurable duration
- Each step shows:
  - Label text while loading (e.g., "Analyzing your cycles")
  - Completed text when done (e.g., "Cycles analyzed")
  - Animated progress bar (0% → 100%)
  - Green checkmark (✓) on completion
- Animation system:
  - Creates `Animated.Value` for each step's progress
  - Uses `Animated.sequence()` to chain animations
  - Each animation has delay: `index * duration`
  - Default duration: 2000ms per step
- Optional "Did you know?" carousel section with horizontal scrolling images
- Button fades in after all steps complete using `Animated.timing()`
- Payload structure:
  ```typescript
  {
    title: string,
    steps: Array<{ label: string, completed: string }>,
    didYouKnowImages?: Array<MediaSourceSchema>,
    duration?: number // milliseconds per step, default 2000
  }
  ```

## Custom Components System

### Overview

The SDK provides a powerful component customization system that allows users to replace specific UI components with their own implementations. This enables complete control over styling, animations, and behavior while maintaining compatibility with the SDK's data flow and state management.

### Architecture

**CustomComponentsContext** (`src/infra/provider/CustomComponentsContext.tsx`)

- React Context for distributing custom components throughout the app
- Provides `CustomComponents` interface defining all customizable components
- Exports `useCustomComponents()` hook for accessing custom components in renderers

**Integration Points:**

1. `OnboardingProvider` accepts `customComponents` prop
2. `CustomComponentsProvider` wraps the app
3. Renderers use `useCustomComponents()` to access custom implementations
4. Falls back to default implementations when no custom component is provided

### Component Interfaces

All custom components must implement specific interfaces that define their props:

**QuestionAnswerButtonProps** (`src/UI/Pages/Question/components.tsx`)

```typescript
interface QuestionAnswerButtonProps {
  answer: { label: string; value: string };
  selected: boolean;
  onPress: () => void;
  theme: Theme;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}
```

**QuestionAnswersListProps** (`src/UI/Pages/Question/components.tsx`)

```typescript
interface QuestionAnswersListProps {
  answers: Array<{ label: string; value: string }>;
  selected: Record<string, boolean>;
  onAnswerPress: (value: string) => void;
  multipleAnswer: boolean;
  theme: Theme;
}
```

### Default Components

Each customizable component has a default implementation exported for composition:

**DefaultQuestionAnswerButton** (`src/UI/Pages/Question/components.tsx`)

- Standard button with theme integration
- Rounded corners (borderRadius: 16)
- Semantic text styles (body)
- 2px border, theme-aware colors
- 20px vertical padding, 24px horizontal padding

**DefaultQuestionAnswersList** (`src/UI/Pages/Question/components.tsx`)

- Container with 10px gap between items
- Maps over answers and renders DefaultQuestionAnswerButton for each
- Respects custom button component if provided via context

### Usage Patterns

#### Pattern 1: Simple Button Styling

Replace button appearance while keeping list logic:

```typescript
const MinimalButton = ({
  answer,
  selected,
  onPress,
  theme,
}: QuestionAnswerButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 96,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.neutral.lower,
      backgroundColor: selected ? theme.colors.primary : "transparent",
    }}
  >
    <Text style={{ fontSize: 24 }}>{answer.label}</Text>
  </TouchableOpacity>
);

<OnboardingProvider
  customComponents={{ QuestionAnswerButton: MinimalButton }}
/>;
```

#### Pattern 2: Animated List

Full control over list rendering with animations:

```typescript
const AnimatedList = ({
  answers,
  selected,
  onAnswerPress,
  theme,
}: QuestionAnswersListProps) => {
  const animations = useRef(answers.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      150,
      animations.map((anim) =>
        Animated.spring(anim, { toValue: 1, useNativeDriver: true })
      )
    ).start();
  }, []);

  return (
    <View style={{ gap: 10 }}>
      {answers.map((answer, index) => (
        <Animated.View
          key={answer.value}
          style={{
            opacity: animations[index],
            transform: [
              {
                translateY: animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          <DefaultQuestionAnswerButton
            answer={answer}
            selected={selected[answer.value]}
            onPress={() => onAnswerPress(answer.value)}
            theme={theme}
            index={index}
            isFirst={index === 0}
            isLast={index === answers.length - 1}
          />
        </Animated.View>
      ))}
    </View>
  );
};

<OnboardingProvider customComponents={{ QuestionAnswersList: AnimatedList }} />;
```

#### Pattern 3: Wrapping Default Components

Extend default behavior:

```typescript
const TrackedButton = (props: QuestionAnswerButtonProps) => {
  const handlePress = () => {
    analytics.track("answer_selected", { value: props.answer.value });
    props.onPress();
  };

  return <DefaultQuestionAnswerButton {...props} onPress={handlePress} />;
};
```

### Component Resolution Priority

The system resolves components in this order:

1. **Custom List Component** (`QuestionAnswersList`) - Takes complete control
2. **Custom Button Component** (`QuestionAnswerButton`) - Used by DefaultList
3. **Default Implementation** - Built-in SDK styling

This priority system ensures:

- List customization overrides everything
- Button customization works with default list logic
- No custom components means full default behavior

### Renderer Implementation Pattern

Renderers follow this pattern for custom component support:

```typescript
const QuestionRendererBase = ({ step, onContinue }: QuestionRendererProps) => {
  const { theme } = useTheme();
  const customComponents = useCustomComponents();
  const AnswersList =
    customComponents.QuestionAnswersList || DefaultQuestionAnswersList;
  const AnswerButton =
    customComponents.QuestionAnswerButton || DefaultQuestionAnswerButton;

  return (
    <OnboardingTemplate>
      {/* Header content */}
      {customComponents.QuestionAnswersList ? (
        <AnswersList {...listProps} />
      ) : (
        <View style={styles.answersContainer}>
          {answers.map((answer, index) => (
            <AnswerButton key={answer.value} {...buttonProps} />
          ))}
        </View>
      )}
    </OnboardingTemplate>
  );
};
```

### Adding New Customizable Components

To add a new customizable component:

1. **Define Props Interface** in the component's file:

   ```typescript
   export interface NewComponentProps {
     // Define all props the component receives
   }
   ```

2. **Create Default Implementation**:

   ```typescript
   export const DefaultNewComponent: React.FC<NewComponentProps> = (props) => {
     // Default rendering logic
   };
   ```

3. **Add to CustomComponents Interface**:

   ```typescript
   export interface CustomComponents {
     // Existing components...
     NewComponent?: React.ComponentType<NewComponentProps>;
   }
   ```

4. **Update Renderer** to use custom component:

   ```typescript
   const customComponents = useCustomComponents();
   const Component = customComponents.NewComponent || DefaultNewComponent;
   ```

5. **Export from Module**:
   ```typescript
   export { DefaultNewComponent, NewComponentProps } from "./components";
   ```

### Example Components

The `example/components/` directory contains reference implementations:

**MinimalAnswerButton.tsx**

- Matches Figma minimal design
- 96px height, top/bottom borders only
- No border-radius
- 24px font size

**AnimatedAnswersList.tsx**

- Staggered entrance animation (150ms delay)
- Slide + fade effect
- Uses React Native Animated API
- Composes with DefaultQuestionAnswerButton

### Testing Custom Components

When testing custom components:

1. **Build SDK**: `npm run build`
2. **Test in Example App**: `cd example && npm start`
3. **Update Provider** in `example/app/_layout.tsx`:
   ```typescript
   <OnboardingProvider
     customComponents={{
       QuestionAnswerButton: MinimalAnswerButton,
       // or
       QuestionAnswersList: AnimatedAnswersList,
     }}
   />
   ```

### Best Practices

1. **Type Safety**: Always implement the exact props interface
2. **Theme Integration**: Use `theme` prop for consistent styling
3. **Composition**: Extend default components when possible
4. **Performance**: Use `React.memo` for complex custom components
5. **Accessibility**: Maintain or improve accessibility features
6. **Testing**: Test both single and multiple selection scenarios

### Future Extensibility

The system is designed to support more customizable components:

- Carousel slide components
- Picker input components
- MediaContent renderers
- Progress indicators
- Custom transitions

Each new component follows the same pattern: interface definition, default implementation, context distribution, and renderer integration.
