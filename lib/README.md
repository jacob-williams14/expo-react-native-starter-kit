# Lib

Shared libraries, utilities, and configurations.

## Structure

- `constants/` - App-wide constants (colors, sizes, config values)
- `utils/` - Utility functions (formatting, validation, helpers)

## Future Additions

As your app grows, you may add:

- `api/` - API client configuration and token management
- `icons/` - Icon component wrappers
- `stores/` - Zustand state management stores
- `config.ts` - App configuration

## Usage

```tsx
import { COLORS } from "~/lib/constants";
import { formatDate } from "~/lib/utils/format";
```
