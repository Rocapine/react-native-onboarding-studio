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

**OnboardingPage** (`src/UI/OnboardingPage.tsx`)
- Central routing component that renders the appropriate page based on step type
- Uses switch statement to delegate to specific Renderers
- Handles fallback for unimplemented step types (sandbox mode shows dev message, production auto-continues)

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

**OnboardingProgressProvider** (`src/UI/Provider/OnboardingProgressProvider.tsx`)
- React Context for tracking onboarding progress
- Manages `activeStep` (number + displayProgressHeader flag) and `totalSteps`
- Wraps content in `SafeAreaProvider`

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
- `onboarding/OnboardingProvider.tsx` - Shows proper setup with `OnboardingProgressProvider` and `ProgressBar`

### Example Pattern

All examples follow this pattern:

```typescript
import * as OnboardingStudio from '@rocapine/react-native-onboarding-studio';

const stepPayload = { /* ... */ } satisfies OnboardingStudio.XxxStepType['payload'];

const step = {
  id: 'example-1',
  type: 'MediaContent',
  name: 'Example',
  displayProgressHeader: true,
  payload: stepPayload,
  customPayload: null,
  continueButtonLabel: 'Continue', // Optional but recommended for type safety
  figmaUrl: null,
} satisfies OnboardingStudio.MediaContentStepType;

const handleContinue = () => {
  console.log('Step completed!');
  // Navigate or continue to next step
};

return <OnboardingStudio.MediaContentRenderer step={step} onContinue={handleContinue} />;
```

### Important Notes

- The example app uses `@rocapine/react-native-onboarding-studio` as a local dependency via `"file:.."`
- After making changes to the library, run `npm run build` in the root, then reload the example app
- `OnboardingProgressProvider` wraps the app and includes the global `ProgressBar` component
- Individual renderers should NEVER include their own `ProgressBar`

## File Organization

```
src/
├── OnboardingStudioClient.ts    # API client
├── types.ts                      # Core types
├── index.ts                      # Public exports
└── UI/
    ├── OnboardingPage.tsx        # Main router component
    ├── Provider/                 # Context providers
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
   - **DO NOT** include `ProgressBar` component - it's managed globally by `OnboardingProgressProvider`
   - Use `OnboardingTemplate` for consistent layout and CTA button
   - Use `ScrollView` for content that may exceed screen height
   - Validate step data with Zod: `const validatedData = StepTypeSchema.parse(step)`
   - Use button label from validated data: `button={{ text: validatedData.continueButtonLabel }}`
4. Add `index.ts` to export both types and renderer
5. Export from `src/UI/Pages/index.ts`
6. Add type to union in `src/UI/types.ts`
7. Add case to switch in `src/UI/OnboardingPage.tsx`

### Screen Implementation Guidelines

- **ProgressBar**: NEVER include in individual screens - it's added once in the app's `OnboardingProvider`
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

### Special Page Patterns

**Carousel**: Multi-screen horizontal pagination
- Uses horizontal `ScrollView` with `pagingEnabled`
- Tracks current page with `useState` and `onMomentumScrollEnd`
- Button label changes based on page: "Next" for intermediate pages, `continueButtonLabel` for last page
- Includes page indicators (dots) showing progress through carousel
- Each screen has its own media and text content
