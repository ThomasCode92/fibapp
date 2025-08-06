import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
});

export const { PORT, REDIS_HOST, REDIS_PORT } = envSchema.parse(process.env);
