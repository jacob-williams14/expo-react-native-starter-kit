# Providers

React Context providers for app-wide state management.

## Recommended Providers

- `AppProvider.tsx` - Main wrapper combining all providers
- `LoadingProvider.tsx` - Global loading states
- `AlertProvider.tsx` - Toast/alert notifications
- `ThemeProvider.tsx` - Theme management

## Usage

Wrap your app in the root layout:

```tsx
import { AppProvider } from "~/providers/AppProvider";

export default function RootLayout() {
  return <AppProvider>{/* Your app content */}</AppProvider>;
}
```

## Access Context

```tsx
import { useLoading } from "~/providers/LoadingProvider";

const { showLoading, hideLoading } = useLoading();
```
