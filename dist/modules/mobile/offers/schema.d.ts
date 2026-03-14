import { z } from 'zod';
export declare const getOffersQuerySchema: z.ZodObject<{
    mallId: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    mallId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}, {
    mallId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type GetOffersQuery = z.infer<typeof getOffersQuerySchema>;
//# sourceMappingURL=schema.d.ts.map