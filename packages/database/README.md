# `@repo/db`

## Configuration

### Environment Variables

To configure the environment variables, copy the `.env.example` file and update
the values as needed.

```bash
cp .env.example .env.local
```

### Using the Database and Prisma Client

First, migrate the database schema and generate the _Prisma Client_:

```bash
pnpm run db:migrate
pnpm run db:generate
```

After that, the _Prisma Client_ can be imported and used within the application:

```typescript
import { prisma as prismaClient } from "@repo/db";

const data = await prismClient.users.findMany(); // users table
```
