import { mockDeep, mockReset } from "vitest-mock-extended";

import { PrismaClient } from "@repo/db";

beforeEach(() => {
  mockReset(prisma);
});

const prisma = mockDeep<PrismaClient>();
export { prisma };
