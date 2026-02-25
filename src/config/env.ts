import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  MOBILE_JWT_ACCESS_SECRET: z.string(),
  MOBILE_JWT_REFRESH_SECRET: z.string(),
  ADMIN_JWT_ACCESS_SECRET: z.string(),
  ADMIN_JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  OTP_EXPIRY_SECONDS: z.string().default('300'),
  RATE_LIMIT_MAX: z.string().default('100'),
  RATE_LIMIT_TIME_WINDOW: z.string().default('60000'),
  PARKING_RATE_PER_HOUR: z.string().default('50'),
  DEFAULT_PAGE_SIZE: z.string().default('20'),
  MAX_PAGE_SIZE: z.string().default('100'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
