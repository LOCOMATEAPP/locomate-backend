import { z } from 'zod';

export const createStoreSchema = z.object({
  mallId: z.string().uuid('Invalid mall ID'),
  floorId: z.string().uuid('Invalid floor ID'),
  name: z.string().min(1, 'Store name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  logo: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  coordinateX: z.number().min(0, 'X coordinate must be positive'),
  coordinateY: z.number().min(0, 'Y coordinate must be positive'),
  isActive: z.boolean().optional().default(true),
});

export const updateStoreSchema = z.object({
  mallId: z.string().uuid().optional(),
  floorId: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  logo: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  coordinateX: z.number().min(0).optional(),
  coordinateY: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
