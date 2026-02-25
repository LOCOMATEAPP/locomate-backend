import crypto from 'crypto';

export const generateRewardCode = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `RWD-${timestamp}-${random}`;
};
