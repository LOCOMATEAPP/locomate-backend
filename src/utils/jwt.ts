import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { MobileAuthPayload, AdminAuthPayload } from '../types';

export const generateMobileAccessToken = (payload: MobileAuthPayload): string => {
  return jwt.sign(payload as object, env.MOBILE_JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY as any,
  });
};

export const generateMobileRefreshToken = (payload: MobileAuthPayload): string => {
  return jwt.sign(payload as object, env.MOBILE_JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY as any,
  });
};

export const verifyMobileAccessToken = (token: string): MobileAuthPayload => {
  return jwt.verify(token, env.MOBILE_JWT_ACCESS_SECRET) as MobileAuthPayload;
};

export const verifyMobileRefreshToken = (token: string): MobileAuthPayload => {
  return jwt.verify(token, env.MOBILE_JWT_REFRESH_SECRET) as MobileAuthPayload;
};

export const generateAdminAccessToken = (payload: AdminAuthPayload): string => {
  return jwt.sign(payload as object, env.ADMIN_JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY as any,
  });
};

export const generateAdminRefreshToken = (payload: AdminAuthPayload): string => {
  return jwt.sign(payload as object, env.ADMIN_JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY as any,
  });
};

export const verifyAdminAccessToken = (token: string): AdminAuthPayload => {
  return jwt.verify(token, env.ADMIN_JWT_ACCESS_SECRET) as AdminAuthPayload;
};

export const verifyAdminRefreshToken = (token: string): AdminAuthPayload => {
  return jwt.verify(token, env.ADMIN_JWT_REFRESH_SECRET) as AdminAuthPayload;
};
