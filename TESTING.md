# Testing

This document outlines the testing practices and guidelines for this project.

## Philosophy

> **"The more your tests resemble the way your software is used, the more confidence they can give you."**
>
> — Kent C. Dodds, [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

This project follows the testing philosophy outlined in Kent C. Dodds' article. Our approach emphasizes:

- **Write tests** - Automated tests catch bugs during development rather than in production
- **Not too many** - Avoid testing implementation details or chasing 100% coverage at the expense of test quality
- **Mostly integration** - Focus on integration tests that strike the best balance between confidence and speed, testing how components work together as users actually experience them

We prioritize tests that simulate real-world usage over tests that verify internal implementation details. This means less mocking, more realistic test scenarios, and greater confidence that our app works as intended.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run a specific test file
npm test -- path/to/file.test.tsx
```

## Test File Organization

Test files are colocated with source files:

- `Component.tsx` → `Component.test.tsx`
- `utils.ts` → `utils.test.ts`

**Important**: Never add test files in the `app/` directory - expo-router treats all files as routes.

## Test Utilities

Import test utilities from `~/test-utils`:

```typescript
import { fireEvent, render, screen, waitFor } from "~/test-utils";
import { Scenario } from "~/test-utils/scenario";
```

### Scenario Helper

Use `Scenario` to set up common test states:

```typescript
beforeEach(async () => {
  await Scenario.reset().authenticatedUser();
});

// Or for guest/unauthenticated state:
beforeEach(async () => {
  await Scenario.reset().guest();
});
```

### Form Test Wrappers

For testing `withForm` components, use the typed form wrappers:

```typescript
import { MyFormWrapper } from "~/test-utils/forms";

render(
  <MyFormWrapper>
    {(form) => <NameStep form={form} onContinue={jest.fn()} />}
  </MyFormWrapper>
);
```

## Best Practices

### Wait for UI State Before Assertions

Always wait for meaningful UI elements before interacting or asserting:

```typescript
// Good - wait for specific form element
await waitFor(() => {
  expect(screen.getByText("First Name")).toBeOnTheScreen();
});

// Then interact
fireEvent.press(screen.getByRole("button", { name: "Submit" }));
```

### Wait After Form Input Changes

When testing forms, wait for input values to be set after each change:

```typescript
fireEvent.changeText(
  screen.getByPlaceholderText("Enter your email"),
  "test@example.com"
);

// Wait for value to be set before continuing
await waitFor(() => {
  expect(screen.getByPlaceholderText("Enter your email").props.value).toBe(
    "test@example.com"
  );
});
```

### Wait for UI Transitions After Submissions

After form submissions, wait for the resulting UI change:

```typescript
fireEvent.press(screen.getByRole("button", { name: "Submit" }));

// Wait for the next screen/state to appear
await waitFor(() => {
  expect(screen.getByText("Success!")).toBeOnTheScreen();
});
```

## Handling Async State Updates (act warnings)

When testing components that use TanStack Form or TanStack Query, you may encounter "not wrapped in act(...)" warnings. These warnings indicate that async state updates are happening after your test thinks it's done.

The solution is to wait for meaningful UI state changes rather than artificially flushing microtasks.

### References

- [Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning) by Kent C. Dodds
- [TanStack Query Issue #270](https://github.com/TanStack/query/issues/270)
- [TanStack Query Issue #432](https://github.com/TanStack/query/issues/432)

### Key Insight

From Kent C. Dodds: "If you're still experiencing the act warning, then the most likely reason is something is happening **after your test completes** for which you should be waiting."

The fix is to ensure your test waits for the **actual user-visible state** that indicates the async operation completed, rather than trying to artificially flush microtasks or suppress warnings.

## Mocking

### API Mocking with MSW

API calls are mocked using MSW (Mock Service Worker). Handlers are defined in `mocks/handlers/`:

```typescript
// mocks/handlers/userHandlers.ts
import { http, HttpResponse } from "msw";

export const userHandlers = [
  http.get(`${config.apiUrl}/api/v1/user`, () => {
    return HttpResponse.json(getMockUser());
  }),
];
```

### Auth Mocking

Auth is mocked at the authentication library layer in `jest.setup.ts`. Use `Scenario` to configure auth state:

```typescript
// Authenticated user
await Scenario.reset().authenticatedUser();

// Guest/unauthenticated
await Scenario.reset().guest();
```

### Mock Data

Reusable mock data lives in `mocks/data/`:

- `mocks/data/user.ts` - User and auth data
- Add additional mock data files as needed for your domain
