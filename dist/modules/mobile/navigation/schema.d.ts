import { z } from 'zod';
export declare const calculateRouteSchema: z.ZodObject<{
    startX: z.ZodNumber;
    startY: z.ZodNumber;
    targetStoreId: z.ZodString;
    mallId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    mallId: string;
    startX: number;
    startY: number;
    targetStoreId: string;
}, {
    mallId: string;
    startX: number;
    startY: number;
    targetStoreId: string;
}>;
export type CalculateRouteInput = z.infer<typeof calculateRouteSchema>;
//# sourceMappingURL=schema.d.ts.map