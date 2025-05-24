# `@repo/vitest-config`

Collection of Vitest configurations.

- `base-config.ts`: a base Vitest configuration, for use in Node.js
  environments.
- `ui-config.ts`: a Vitest configuration for testing React applications.

## Usage Examples

### React UI Tests

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { uiConfig } from "@repo/vitest-config/ui";

export default defineConfig({
  // other Vite config options...
  test: uiConfig.test,
});
```
