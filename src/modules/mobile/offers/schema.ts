import { z } from 'zod';

export const getOffersQuerySchema = z.object({
  mallId: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export type GetOffersQuery = z.infer<typeof getOffersQuerySchema>;
