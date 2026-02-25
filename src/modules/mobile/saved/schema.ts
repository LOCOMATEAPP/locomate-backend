import { z } from 'zod';

export const saveStoreSchema = z.object({
  storeId: z.string().uuid(),
});

export const saveOfferSchema = z.object({
  offerId: z.string().uuid(),
});

export type SaveStoreInput = z.infer<typeof saveStoreSchema>;
export type SaveOfferInput = z.infer<typeof saveOfferSchema>;
