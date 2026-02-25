import { redis } from '../config/redis';
import { env } from '../config/env';

const OTP_PREFIX = 'otp:';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = async (phone: string, otp: string): Promise<void> => {
  const key = `${OTP_PREFIX}${phone}`;
  await redis.setex(key, parseInt(env.OTP_EXPIRY_SECONDS), otp);
};

export const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
  const key = `${OTP_PREFIX}${phone}`;
  const storedOTP = await redis.get(key);
  
  if (!storedOTP || storedOTP !== otp) {
    return false;
  }
  
  await redis.del(key);
  return true;
};

export const getOTPTTL = async (phone: string): Promise<number> => {
  const key = `${OTP_PREFIX}${phone}`;
  return await redis.ttl(key);
};
