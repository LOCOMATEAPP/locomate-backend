import Fastify, { FastifyInstance } from 'fastify';
import { logger } from './config/logger';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { registerCors } from './plugins/cors';
import { registerHelmet } from './plugins/helmet';
import { registerRateLimit } from './plugins/rate-limit';

// Mobile routes
import { authRoutes } from './modules/mobile/auth/routes';
import { userRoutes } from './modules/mobile/users/routes';
import { mallRoutes } from './modules/mobile/malls/routes';
import { navigationRoutes } from './modules/mobile/navigation/routes';
import { offerRoutes } from './modules/mobile/offers/routes';
import { rewardRoutes } from './modules/mobile/rewards/routes';
import { savedRoutes } from './modules/mobile/saved/routes';
import { messagingRoutes } from './modules/mobile/messaging/routes';
import { parkingRoutes } from './modules/mobile/parking/routes';

// Admin routes
import { adminAuthRoutes } from './modules/admin/auth/routes';

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    logger,
    trustProxy: true,
    requestIdLogLabel: 'reqId',
  });

  // Register plugins
  await registerCors(app);
  await registerHelmet(app);
  await registerRateLimit(app);

  // Error handler
  app.setErrorHandler(errorHandler);

  // Health check
  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  // Mobile API routes
  await app.register(authRoutes, { prefix: '/api/mobile/auth' });
  await app.register(userRoutes, { prefix: '/api/mobile/users' });
  await app.register(mallRoutes, { prefix: '/api/mobile/malls' });
  await app.register(navigationRoutes, { prefix: '/api/mobile/navigation' });
  await app.register(offerRoutes, { prefix: '/api/mobile/offers' });
  await app.register(rewardRoutes, { prefix: '/api/mobile/rewards' });
  await app.register(savedRoutes, { prefix: '/api/mobile/saved' });
  await app.register(messagingRoutes, { prefix: '/api/mobile/messages' });
  await app.register(parkingRoutes, { prefix: '/api/mobile/parking' });

  // Admin API routes
  await app.register(adminAuthRoutes, { prefix: '/api/admin/auth' });

  return app;
};
