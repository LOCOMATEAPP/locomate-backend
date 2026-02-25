import { z } from 'zod';

export const getMallsQuerySchema = z.object({
  city: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export type GetMallsQuery = z.infer<typeof getMallsQuerySchema>;
