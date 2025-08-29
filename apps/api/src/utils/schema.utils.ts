import z from "zod";

export const indexSchema = z.object({
  index: z.coerce.number().max(40),
});

export type IndexSchema = z.infer<typeof indexSchema>;
