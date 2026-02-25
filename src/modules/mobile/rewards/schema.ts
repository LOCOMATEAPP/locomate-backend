import { z } from 'zod';

export const claimOfferSchema = z.object({
  offerId: z.string().uuid(),
});

export const redeemRewardSchema = z.object({
  rewardCode: z.string().min(1),
});

export type ClaimOfferInput = z.infer<typeof claimOfferSchema>;
export type RedeemRewardInput = z.infer<typeof redeemRewardSchema>;
