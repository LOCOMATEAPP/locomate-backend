import { z } from 'zod';

export const startParkingSchema = z.object({
  location: z.string().min(1).max(200),
});

export type StartParkingInput = z.infer<typeof startParkingSchema>;
