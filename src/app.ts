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
import { adminMallRoutes } from './modules/admin/malls/routes';
import { adminStoreRoutes } from './modules/admin/stores/routes';

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

  // Mobile API routes - v1
  await app.register(authRoutes, { prefix: '/api/v1/mobile/auth' });
  await app.register(userRoutes, { prefix: '/api/v1/mobile/users' });
  await app.register(mallRoutes, { prefix: '/api/v1/mobile/malls' });
  await app.register(navigationRoutes, { prefix: '/api/v1/mobile/navigation' });
  await app.register(offerRoutes, { prefix: '/api/v1/mobile/offers' });
  await app.register(rewardRoutes, { prefix: '/api/v1/mobile/rewards' });
  await app.register(savedRoutes, { prefix: '/api/v1/mobile/saved' });
  await app.register(messagingRoutes, { prefix: '/api/v1/mobile/messages' });
  await app.register(parkingRoutes, { prefix: '/api/v1/mobile/parking' });

  // Admin API routes - v1
  await app.register(adminAuthRoutes, { prefix: '/api/v1/admin/auth' });
  await app.register(adminMallRoutes, { prefix: '/api/v1/admin' });
  await app.register(adminStoreRoutes, { prefix: '/api/v1/admin' });

  return app;
};
