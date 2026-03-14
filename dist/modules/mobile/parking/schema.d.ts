import { z } from 'zod';
export declare const startParkingSchema: z.ZodObject<{
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
}, {
    location: string;
}>;
export type StartParkingInput = z.infer<typeof startParkingSchema>;
//# sourceMappingURL=schema.d.ts.map