# @rocapine/react-native-onboarding-studio

React Native client for Rocapine Onboarding Studio - A CMS for onboarding flows in consumer apps.

## Installation

```bash
npm install @rocapine/react-native-onboarding-studio
# or
yarn add @rocapine/react-native-onboarding-studio
```

## Usage

### Initialize the Client

```typescript
import { OnboardingStudioClient } from "@rocapine/react-native-onboarding-studio";

// Create a client instance
const client = new OnboardingStudioClient();
```

### Fetch Onboarding Steps

```typescript
const steps = await client.getSteps({
  projectId: "your-project-id",
  paywallVariant: "variant-a",
  appEnv: "production",
  locale: "en",
  platform: "ios",
  appVersion: "1.0.0",
});

console.log(steps);
```

### Parameters

- `projectId` (required): Your Rocapine project ID
- `paywallVariant` (optional): Paywall variant identifier
- `appEnv` (optional): Application environment (e.g., 'production', 'staging')
- `locale` (optional): User's locale (e.g., 'en', 'fr')
- `platform` (optional): Platform identifier (e.g., 'ios', 'android')
- `appVersion` (optional): Application version

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

## Project Structure

```
react-native-onboarding/
├── src/
│   ├── OnboardingStudioClient.ts  # Main client class
│   ├── types.ts                    # TypeScript interfaces
│   └── index.ts                    # Public exports
├── dist/                           # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT
