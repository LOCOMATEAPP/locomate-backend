import { z } from 'zod';
export declare const adminLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const adminRefreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type AdminRefreshTokenInput = z.infer<typeof adminRefreshTokenSchema>;
//# sourceMappingURL=schema.d.ts.map