# Project Structure

This document outlines the file structure for this React Native starter kit, following Expo Router conventions and best practices.

## Directory Structure

```
project-root/
├── app/                        # Expo Router - file-based routing
│   ├── _layout.tsx            # Root layout with providers and navigation
│   ├── (tabs)/                # Tab-based navigation group
│   │   ├── _layout.tsx        # Tabs layout configuration
│   │   ├── index.tsx          # Home tab screen
│   │   ├── explore.tsx        # Explore tab screen
│   │   └── profile.tsx        # Profile tab screen
│   └── +not-found.tsx         # 404 error screen
│
├── assets/                     # Static assets
│   ├── fonts/                 # Custom font files
│   ├── images/                # Images, icons, splash screens
│   └── README.md              # Asset usage guide
│
├── components/                 # Reusable UI components
│   ├── ui/                    # Primitive UI components
│   ├── navigation/            # Navigation-related components
│   ├── general/               # General shared components
│   └── README.md              # Component organization guide
│
├── hooks/                      # Custom React hooks
│   ├── useThemeColors.ts      # Theme color hook
│   └── README.md              # Hooks documentation
│
├── lib/                        # Shared libraries and configurations
│   ├── constants/             # App constants
│   │   └── index.tsx          # Color, spacing, size constants
│   ├── utils/                 # Utility functions
│   │   └── format.ts          # Formatting utilities
│   └── README.md              # Library documentation
│
├── providers/                  # React Context providers
│   └── README.md              # Provider setup guide
│
├── scripts/                    # Build and deployment scripts
│   ├── build-*.sh             # Build scripts for different environments
│   ├── submit-*.sh            # App store submission scripts
│   └── eas-*.sh               # EAS CLI helper scripts
│
├── app.config.ts              # Expo configuration
├── babel.config.js            # Babel configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── global.css                 # Global styles and CSS variables
├── tsconfig.json              # TypeScript configuration
├── metro.config.js            # Metro bundler configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Key Patterns

### 1. Path Aliases

Use `~/` for imports from project root:

```typescript
import { Button } from "~/components/ui/button";
import { useThemeColors } from "~/hooks/useThemeColors";
import { COLORS } from "~/lib/constants";
import { formatCurrency } from "~/lib/utils/format";
```

Configuration is in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"]
    }
  }
}
```

### 2. Expo Router File-Based Routing

- Folders become routes: `app/profile/index.tsx` → `/profile`
- Route groups: `app/(tabs)/home.tsx` - groups screens without affecting URL
- Dynamic routes: `app/user/[id].tsx` → `/user/123`
- Not found: `app/+not-found.tsx` - 404 error boundary

### 3. Component Organization

```
components/
├── ui/              # Reusable primitives (Button, Input, Card)
├── navigation/      # Nav-specific (Header, TabBar)
└── general/         # Shared components (LoadingSpinner, ErrorBoundary)
```

Keep components small and focused. Co-locate related components in feature folders.

### 4. Type Safety

- TypeScript strict mode enabled
- Define types in `types.ts` files within feature folders
- Use interfaces over types for consistency

### 5. State Management Options

- **Context API** - Global UI state (loading, alerts) → `providers/`
- **Zustand** - Complex app state → `lib/stores/`
- **React Query** - Server state → Use `@tanstack/react-query`

## Recent Changes

### Migration from `src/app/` to `app/`

The project structure has been updated to follow Expo Router conventions:

**Before:**

```
src/
└── app/
    ├── _layout.tsx     # Tabs layout
    ├── index.tsx
    ├── explore.tsx
    └── profile.tsx
```

**After:**

```
app/
├── _layout.tsx         # Root layout
├── (tabs)/             # Route group
│   ├── _layout.tsx     # Tabs layout
│   ├── index.tsx
│   ├── explore.tsx
│   └── profile.tsx
└── +not-found.tsx      # 404 page
```

**What Changed:**

- Moved `src/app/` → `app/` (root level)
- Organized tab screens into `(tabs)` route group
- Created root layout for providers
- Added 404 error page
- Updated path alias from `@/*` to `~/*`
- Created organized directory structure for scalability

## Scaling Your App

### As Your App Grows, Add:

1. **`lib/api/`** - API client configuration

   ```
   lib/api/
   ├── client.ts          # Axios/fetch setup
   └── tokenManager.ts    # Auth token handling
   ```

2. **`lib/stores/`** - Zustand state stores

   ```
   lib/stores/
   ├── useAuthStore.ts
   └── useCartStore.ts
   ```

3. **`services/`** - Domain services (business logic)

   ```
   services/
   └── auth/
       ├── api.ts         # Auth API calls
       ├── types.ts       # Auth types
       └── service.ts     # Auth business logic
   ```

4. **`test-utils/`** - Testing utilities

   ```
   test-utils/
   ├── index.tsx          # Custom render functions
   └── utils.ts           # MSW server setup
   ```

5. **`mocks/`** - Mock data for testing
   ```
   mocks/
   ├── data/              # Mock data objects
   └── handlers/          # MSW request handlers
   ```

## Best Practices

1. **Start Minimal** - Add directories as needed
2. **Keep It Flat** - Avoid deep nesting until necessary
3. **Co-locate** - Keep related files close together
4. **Type Everything** - Use TypeScript for type safety
5. **Test** - Add tests as features grow
6. **Document** - Keep README files updated in each directory

## Useful Commands

```bash
# Development
npm run dev              # Start Expo dev server
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator

# Building
npm run build:preview    # Build preview version
npm run build:staging    # Build staging version
npm run build:production # Build production version

# Code Quality
npm run lint             # Run ESLint and Prettier
npm test                 # Run Jest tests
npm run test:watch       # Run tests in watch mode
```

## Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
