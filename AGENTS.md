# Agent Guidelines for FibApp

## Commands

- **Build/Test/Lint**: Use `pnpm build`, `pnpm test`, `pnpm lint`,
  `pnpm check-types` at root (runs all apps via turbo)
- **Single test**: `cd apps/api && pnpm test values.test.ts` or
  `cd apps/client && pnpm test App.test.tsx`
- **Development**: `pnpm dev` (starts all apps) or per-app:
  `cd apps/{api|client|worker} && pnpm dev`

## Code Style

- **TypeScript**: Strict mode enabled, use `type` for imports
  (`import type { Request }`), explicit return types for functions
- **Imports**: Use `~` alias for local imports
  (`import { redisClient } from "~/clients/redis.client"`), group external
  before local
- **Formatting**: Prettier with 2-space tabs, double quotes, semicolons, 80 char
  width, arrow parens avoid
- **Naming**: camelCase for variables/functions, PascalCase for
  types/components, kebab-case for files
- **Error handling**: Use Zod for validation with proper error responses (422
  for validation, 500 for server errors)
- **Exports**: Use `export function` for functions, `export default` for React
  components
- **Types**: Define schemas with Zod (`indexSchema`), extract types
  (`IndexSchema`), prefer explicit typing

## Architecture

- Monorepo with turbo: `apps/{api,client,worker}` and shared
  `packages/{eslint-config,typescript-config,vitest-config}`
- API uses Express with Redis, Worker processes background tasks, Client is
  React with Vite
- Use workspace packages (`@repo/*`) for shared configs, tsx for Node.js
  TypeScript execution
