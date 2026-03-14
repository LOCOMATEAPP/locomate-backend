"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.signupSchema = exports.verifyOTPSchema = exports.checkUserSchema = exports.sendOTPSchema = void 0;
const zod_1 = require("zod");
exports.sendOTPSchema = zod_1.z.object({
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
});
exports.checkUserSchema = zod_1.z.object({
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
});
exports.verifyOTPSchema = zod_1.z.object({
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
    otp: zod_1.z.string().length(6, 'OTP must be 6 digits'),
});
exports.signupSchema = zod_1.z.object({
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100),
    avatar: zod_1.z.string().url('Invalid avatar URL').optional(),
    gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
    dob: zod_1.z.string().optional(), // ISO date string
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, 'Refresh token is required'),
});
//# sourceMappingURL=schema.js.map