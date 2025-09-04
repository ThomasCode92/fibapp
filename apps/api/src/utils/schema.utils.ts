import z from "zod";

export const indexSchema = z.object({
  index: z.coerce.number().min(0).max(40),
});

export type IndexSchema = z.infer<typeof indexSchema>;
