import { z } from 'zod';
export declare const sendOTPSchema: z.ZodObject<{
    phone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone: string;
}, {
    phone: string;
}>;
export declare const checkUserSchema: z.ZodObject<{
    phone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone: string;
}, {
    phone: string;
}>;
export declare const verifyOTPSchema: z.ZodObject<{
    phone: z.ZodString;
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone: string;
    otp: string;
}, {
    phone: string;
    otp: string;
}>;
export declare const signupSchema: z.ZodObject<{
    phone: z.ZodString;
    name: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["male", "female", "other"]>>;
    dob: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phone: string;
    avatar?: string | undefined;
    gender?: "male" | "female" | "other" | undefined;
    dob?: string | undefined;
}, {
    name: string;
    phone: string;
    avatar?: string | undefined;
    gender?: "male" | "female" | "other" | undefined;
    dob?: string | undefined;
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
export type SendOTPInput = z.infer<typeof sendOTPSchema>;
export type CheckUserInput = z.infer<typeof checkUserSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
//# sourceMappingURL=schema.d.ts.map