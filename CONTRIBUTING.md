# Contributing to Rocapine Onboarding Studio SDK

Thank you for your interest in contributing! This guide will help you get started with development.

## Development Setup

### Prerequisites

- Node.js 16+ and npm
- Expo CLI (for testing in the example app)
- macOS (for iOS development) or Linux/Windows (for Android)

### Initial Setup

1. **Clone the repository:**

```bash
git clone https://github.com/rocapine/react-native-onboarding-studio.git
cd react-native-onboarding-studio
```

2. **Install dependencies:**

```bash
npm install
```

3. **Build the package:**

```bash
npm run build
```

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

**Important:** When adding or modifying assets in `src/assets/`, you must run `npm run build` to copy them to `dist/`.

### Testing in Example App

```bash
cd example/
npm install
npm start
```

The example app uses a local file dependency (`"file:.."`), so changes to the SDK require a rebuild.

**Workflow:**
1. Make changes to SDK (`src/`)
2. Run `npm run build` in root
3. Reload example app

## Project Architecture

### Core Components

#### OnboardingStudioClient (`src/OnboardingStudioClient.ts`)

- Main API client class
- Fetches onboarding steps from Supabase backend
- Handles URL parameters: `projectId`, `platform`, `appVersion`, `locale`, `draft` mode
- Returns step data along with custom headers

#### OnboardingProvider (`src/infra/provider/OnboardingProvider.tsx`)

- Main provider component that wraps the app
- Manages query state, caching with AsyncStorage, and progress context
- Internally wraps with `QueryClientProvider`, `SafeAreaProvider`, `ThemeProvider`, and `CustomComponentsProvider`

#### useOnboardingQuestions (`src/infra/hooks/useOnboardingQuestions.ts`)

- Hook to access onboarding steps
- Returns `{ step, isLastStep, totalSteps }`
- Automatically manages progress context
- Uses React Query's `useSuspenseQuery`

#### OnboardingPage (`src/UI/OnboardingPage.tsx`)

- Central routing component
- Uses switch statement to delegate to specific renderers
- Handles fallback for unimplemented step types

### File Organization

```
src/
├── OnboardingStudioClient.ts    # API client
├── types.ts                      # Core types
├── index.ts                      # Public exports
├── infra/                        # Infrastructure layer
│   ├── provider/
│   │   ├── OnboardingProvider.tsx     # Main provider
│   │   └── CustomComponentsContext.tsx # Custom components
│   └── hooks/
│       └── useOnboardingQuestions.ts  # Main hook
└── UI/
    ├── OnboardingPage.tsx        # Router component
    ├── Theme/                    # Theme system
    │   ├── ThemeProvider.tsx
    │   ├── useTheme.ts
    │   └── tokens/               # Default tokens
    ├── Components/               # Shared components
    │   └── ProgressBar.tsx
    ├── Templates/                # Reusable layouts
    │   └── OnboardingTemplate.tsx
    └── Pages/                    # Page type implementations
        ├── Ratings/
        ├── MediaContent/
        ├── Picker/
        ├── Commitment/
        ├── Carousel/
        ├── Loader/
        └── Question/
            ├── types.ts          # Zod schemas
            ├── Renderer.tsx      # Component
            ├── components.tsx    # Default components
            └── index.ts          # Exports
```

## Adding a New Page Type

Follow these steps to add a new screen type:

### 1. Create Directory Structure

```bash
mkdir -p src/UI/Pages/NewType
```

### 2. Create `types.ts`

Define Zod schema and infer TypeScript type:

```typescript
// src/UI/Pages/NewType/types.ts
import { z } from "zod";
import { CustomPayloadSchema } from "../types";

export const NewTypeStepSchema = z.object({
  id: z.string(),
  type: z.literal("NewType"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    // ... your fields
  }),
  customPayload: CustomPayloadSchema,
  continueButtonLabel: z.string().optional().default("Continue"),
  figmaUrl: z.string().nullable().optional(),
});

export type NewTypeStepType = z.infer<typeof NewTypeStepSchema>;
```

### 3. Create `Renderer.tsx`

```typescript
// src/UI/Pages/NewType/Renderer.tsx
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import { useTheme, getTextStyle } from "../../Theme";
import { NewTypeStepType, NewTypeStepSchema } from "./types";

export interface NewTypeRendererProps {
  step: NewTypeStepType;
  onContinue: (args?: any) => void;
}

export const NewTypeRenderer: React.FC<NewTypeRendererProps> = ({
  step,
  onContinue,
}) => {
  const { theme } = useTheme();

  // Validate step data
  const validatedData = NewTypeStepSchema.parse(step);

  return (
    <OnboardingTemplate
      displayProgressHeader={validatedData.displayProgressHeader}
      button={{
        text: validatedData.continueButtonLabel,
        onPress: () => onContinue(),
      }}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        alwaysBounceVertical={false}
      >
        <Text
          style={[
            getTextStyle(theme, "heading1"),
            { color: theme.colors.text.primary },
          ]}
        >
          {validatedData.payload.title}
        </Text>

        {/* Your custom UI */}
      </ScrollView>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
});
```

### 4. Create `index.ts`

```typescript
// src/UI/Pages/NewType/index.ts
export * from "./Renderer";
export * from "./types";
```

### 5. Export from Pages

```typescript
// src/UI/Pages/index.ts
export * from "./NewType";
// ... other exports
```

### 6. Add to Type Union

```typescript
// src/UI/types.ts
export type OnboardingStepType =
  | QuestionStepType
  | MediaContentStepType
  | NewTypeStepType // Add here
  // ...
```

### 7. Add to Router

```typescript
// src/UI/OnboardingPage.tsx
switch (step.type) {
  case "NewType":
    return <NewTypeRenderer step={step} onContinue={onContinue} />;
  // ... other cases
}
```

### 8. Create Example

Add an example in `example/app/example/new-type.tsx`.

## Screen Implementation Guidelines

### Must Follow

- **NO ProgressBar** in individual screens - it's added once in `OnboardingProvider`
- **Validate step data** using Zod schema: `const validatedData = StepTypeSchema.parse(step)`
- **Use OnboardingTemplate** for consistent layout, safe areas, and button positioning
- **Use ScrollView** with `alwaysBounceVertical={false}` to handle overflow
- **Use theme tokens** via `useTheme()` for all colors
- **Use semantic text styles** via `getTextStyle(theme, "heading1")`
- **Use button label** from `validatedData.continueButtonLabel`

### Recommended

- Use `getTextStyle()` for typography
- Handle loading and error states
- Add TypeScript interfaces for all props
- Memoize complex components

## Custom Components System

### Adding Customizable Components

To make a component customizable:

1. **Define Props Interface** in the page's `components.tsx`:

```typescript
export interface NewComponentProps {
  data: any;
  theme: Theme;
  onPress: () => void;
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
// src/infra/provider/CustomComponentsContext.tsx
export interface CustomComponents {
  QuestionAnswerButton?: React.ComponentType<QuestionAnswerButtonProps>;
  NewComponent?: React.ComponentType<NewComponentProps>; // Add here
}
```

4. **Update Renderer** to use custom component:

```typescript
const customComponents = useCustomComponents();
const Component = customComponents.NewComponent || DefaultNewComponent;

return <Component {...props} />;
```

5. **Export from Module**:

```typescript
// src/UI/Pages/NewType/index.ts
export { DefaultNewComponent } from "./components";
export type { NewComponentProps } from "./components";
```

## Testing

### Unit Tests (TODO)

```bash
npm test
```

### Integration Tests

Test in the example app:

1. Build SDK: `npm run build`
2. Start example: `cd example && npm start`
3. Navigate to your screen type
4. Test all interactions

### Test Checklist

- [ ] All screen types render correctly
- [ ] Theme tokens apply
- [ ] Custom components work
- [ ] Navigation flows properly
- [ ] Progress tracking updates
- [ ] Cache works offline
- [ ] Both light and dark modes

## Publishing Workflow

1. **Update version:**

```bash
npm version [patch|minor|major]
```

2. **Build:**

```bash
npm run build
```

3. **Publish:**

```bash
npm publish --access public
```

The `prepare` script automatically runs build on `npm install`.

### Pre-publish Checklist

- [ ] All tests pass
- [ ] Code is built
- [ ] Version number is updated
- [ ] README is up to date
- [ ] CHANGELOG is updated (if applicable)
- [ ] Git changes are committed
- [ ] Example app works with new build

## Code Style

### TypeScript

- Use strict type checking
- Prefer interfaces over types for objects
- Use Zod for runtime validation
- Infer types from Zod schemas

### React

- Use functional components
- Use hooks, not class components
- Memoize expensive components
- Keep components focused and small

### Naming

- PascalCase for components: `OnboardingProvider`
- camelCase for functions/variables: `useOnboardingQuestions`
- UPPER_CASE for constants: `DEFAULT_CACHE_KEY`
- Descriptive names over short names

### File Organization

- One component per file
- Co-locate related files (component + types + styles)
- Export from index.ts files
- Keep public API exports in `src/index.ts`

## Common Patterns

### Special Page Patterns

#### Carousel

- Horizontal ScrollView with `pagingEnabled`
- Track current page with `useState` and `onMomentumScrollEnd`
- Button label changes: "Next" for intermediate, `continueButtonLabel` for last
- Page indicators (dots)

#### Picker

- Route to specific picker implementations based on `pickerType`
- Uses native `Picker` from `@react-native-picker/picker`
- Return value as formatted string (e.g., "70-kg")
- `onContinue` receives selected value

#### Loader

- Sequential progress animation with React Native `Animated` API
- `Animated.sequence()` for chaining
- Optional carousel section
- Button fades in after completion

## Best Practices

### Performance

- Use `useNativeDriver: true` for animations
- Memoize components with `React.memo`
- Use `FlatList` for long lists
- Lazy load heavy components

### Accessibility

- Add `accessibilityLabel` to interactive elements
- Use `accessibilityRole` appropriately
- Test with screen readers
- Ensure sufficient color contrast

### Theme Integration

- Always use theme tokens from `useTheme()`
- Never hardcode colors or fonts
- Support both light and dark modes
- Test theme overrides

### Error Handling

- Validate data with Zod schemas
- Provide clear error messages
- Handle missing dependencies gracefully
- Use sandbox mode for development errors

## Getting Help

### Resources

- 📖 [User Documentation](./docs/intro.mdx)
- 💬 [GitHub Discussions](https://github.com/rocapine/react-native-onboarding-studio/discussions)
- 🐛 [GitHub Issues](https://github.com/rocapine/react-native-onboarding-studio/issues)
- 📧 Email: dev@rocapine.com

### Before Submitting PR

- [ ] Code follows style guide
- [ ] Tests pass
- [ ] Example app works
- [ ] Documentation updated
- [ ] Types are correct
- [ ] No console warnings

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
