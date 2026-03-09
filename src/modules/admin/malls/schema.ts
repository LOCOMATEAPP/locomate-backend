import { z } from 'zod';

export const createMallSchema = z.object({
  name: z.string().min(1, 'Mall name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  description: z.string().optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateMallSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  zipCode: z.string().min(1).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const createFloorSchema = z.object({
  mallId: z.string().uuid(),
  name: z.string().min(1, 'Floor name is required'),
  floorNumber: z.number().int().min(-10).max(100),
  mapImage: z.string().url().optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateFloorSchema = z.object({
  name: z.string().min(1).optional(),
  floorNumber: z.number().int().min(-10).max(100).optional(),
  mapImage: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export type CreateMallInput = z.infer<typeof createMallSchema>;
export type UpdateMallInput = z.infer<typeof updateMallSchema>;
export type CreateFloorInput = z.infer<typeof createFloorSchema>;
export type UpdateFloorInput = z.infer<typeof updateFloorSchema>;
