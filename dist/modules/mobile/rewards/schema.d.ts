import { z } from 'zod';
export declare const claimOfferSchema: z.ZodObject<{
    offerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    offerId: string;
}, {
    offerId: string;
}>;
export declare const redeemRewardSchema: z.ZodObject<{
    rewardCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    rewardCode: string;
}, {
    rewardCode: string;
}>;
export type ClaimOfferInput = z.infer<typeof claimOfferSchema>;
export type RedeemRewardInput = z.infer<typeof redeemRewardSchema>;
//# sourceMappingURL=schema.d.ts.map