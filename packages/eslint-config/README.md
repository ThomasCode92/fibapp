# @repo/eslint-config

Collection of ESLint configurations:

- `base.js`: a base ESLint configuration, for TypeScript, prettier and Turbo.
- `react-internal.js`: React ESLint configuration
- `testing-library.js`: ESLint configuration for vitest and React Testing
  Library

## Usage Examples

### Basic React

```typescript
import { config } from "@repo/eslint-config/react-internal";
export default base;
```

### React with Testing Library

```typescript
import { config as baseConfig } from "@repo/eslint-config/react-internal";
import { config as testingLibraryConfig } from "@repo/eslint-config/testing-library";

export default [...baseConfig, { ...testingLibraryConfig }];
```
