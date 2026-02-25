import { FastifyInstance } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import { env } from '../config/env';

export const registerRateLimit = async (app: FastifyInstance): Promise<void> => {
  await app.register(rateLimit, {
    max: parseInt(env.RATE_LIMIT_MAX),
    timeWindow: parseInt(env.RATE_LIMIT_TIME_WINDOW),
    redis: undefined, // Can be configured to use Redis for distributed rate limiting
  });
};
