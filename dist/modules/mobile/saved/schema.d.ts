import { z } from 'zod';
export declare const saveStoreSchema: z.ZodObject<{
    storeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    storeId: string;
}, {
    storeId: string;
}>;
export declare const saveOfferSchema: z.ZodObject<{
    offerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    offerId: string;
}, {
    offerId: string;
}>;
export type SaveStoreInput = z.infer<typeof saveStoreSchema>;
export type SaveOfferInput = z.infer<typeof saveOfferSchema>;
//# sourceMappingURL=schema.d.ts.map