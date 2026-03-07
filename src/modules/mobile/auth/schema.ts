import { z } from 'zod';

export const sendOTPSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
});

export const checkUserSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
});

export const verifyOTPSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const signupSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  avatar: z.string().url('Invalid avatar URL').optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dob: z.string().optional(), // ISO date string
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type SendOTPInput = z.infer<typeof sendOTPSchema>;
export type CheckUserInput = z.infer<typeof checkUserSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
