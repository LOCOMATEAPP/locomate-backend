"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('3000'),
    HOST: zod_1.z.string().default('0.0.0.0'),
    DATABASE_URL: zod_1.z.string(),
    REDIS_HOST: zod_1.z.string().default('localhost'),
    REDIS_PORT: zod_1.z.string().default('6379'),
    REDIS_PASSWORD: zod_1.z.string().optional(),
    MOBILE_JWT_ACCESS_SECRET: zod_1.z.string(),
    MOBILE_JWT_REFRESH_SECRET: zod_1.z.string(),
    ADMIN_JWT_ACCESS_SECRET: zod_1.z.string(),
    ADMIN_JWT_REFRESH_SECRET: zod_1.z.string(),
    JWT_ACCESS_EXPIRY: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRY: zod_1.z.string().default('7d'),
    OTP_EXPIRY_SECONDS: zod_1.z.string().default('300'),
    RATE_LIMIT_MAX: zod_1.z.string().default('100'),
    RATE_LIMIT_TIME_WINDOW: zod_1.z.string().default('60000'),
    PARKING_RATE_PER_HOUR: zod_1.z.string().default('50'),
    DEFAULT_PAGE_SIZE: zod_1.z.string().default('20'),
    MAX_PAGE_SIZE: zod_1.z.string().default('100'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map