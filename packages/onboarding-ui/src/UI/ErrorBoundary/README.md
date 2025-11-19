# Error Boundary

The Error Boundary is a Higher Order Component (HOC) that wraps all renderers to catch and display errors gracefully, especially Zod validation errors.

## Features

- **Automatic Error Catching**: Catches all errors thrown by renderers
- **Zod Error Formatting**: Specially formats Zod validation errors to show which fields are invalid
- **Developer-Friendly Display**: Shows error messages, stack traces, and validation details
- **Type-Specific Context**: Displays which step type caused the error

## How It Works

All renderers are automatically wrapped with the `withErrorBoundary` HOC:

```typescript
import { QuestionRenderer as QuestionRendererBase } from "./Renderer";
import { withErrorBoundary } from "../../ErrorBoundary";

export const QuestionRenderer = withErrorBoundary(
  QuestionRendererBase,
  "Question"
);
```

When a Zod validation error occurs (e.g., missing required fields, wrong types), the error boundary will display:

1. Step Type (e.g., "Question", "Ratings")
2. Validation Errors (formatted list of field paths and messages)
3. Helpful hints for fixing the payload

## Example

If you pass an invalid payload:

```typescript
const invalidStep = {
  id: "test",
  type: "Question",
  payload: {
    title: "Test",
    // Missing required 'answers' field
    // Missing required 'multipleAnswer' field
  },
} as any;
```

The error boundary will show:

```
⚠️ Invalid Step Payload
Step Type: Question

Validation Errors:
• payload > answers: Required
• payload > multipleAnswer: Required

💡 Check the step payload structure and ensure all required fields match the schema.
```

## Manual Usage

You can also use the ErrorBoundary component directly:

```typescript
import { ErrorBoundary } from "@rocapine/react-native-onboarding";

<ErrorBoundary stepType="MyCustomComponent">
  <MyCustomComponent />
</ErrorBoundary>;
```

## Testing

An error test example is available at `/example/error-test` in the example app to see the error boundary in action.
