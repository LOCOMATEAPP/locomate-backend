import { z } from 'zod';
export declare const getMallsQuerySchema: z.ZodObject<{
    city: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    city?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}, {
    city?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type GetMallsQuery = z.infer<typeof getMallsQuerySchema>;
//# sourceMappingURL=schema.d.ts.map