import { z } from 'zod';

export const calculateRouteSchema = z.object({
  startX: z.number(),
  startY: z.number(),
  targetStoreId: z.string().uuid(),
  mallId: z.string().uuid(),
});

export type CalculateRouteInput = z.infer<typeof calculateRouteSchema>;
