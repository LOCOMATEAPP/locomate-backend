import Fastify, { FastifyInstance } from 'fastify';
import { logger } from './config/logger';
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
import { mobileBannerRoutes } from './modules/mobile/banners/routes';

// Admin routes
import { adminAuthRoutes } from './modules/admin/auth/routes';
import { adminMallRoutes } from './modules/admin/malls/routes';
import { adminStoreRoutes } from './modules/admin/stores/routes';
import { adminUserRoutes } from './modules/admin/users/routes';
import { adminOfferRoutes } from './modules/admin/offers/routes';
import { adminAnalyticsRoutes } from './modules/admin/analytics/routes';
import { adminBannerRoutes } from './modules/admin/banners/routes';

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    logger: logger as any,
    trustProxy: true,
    requestIdLogLabel: 'reqId',
  });

  await registerCors(app as any);
  await registerHelmet(app as any);
  await registerRateLimit(app as any);
  app.setErrorHandler(errorHandler as any);

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }));

  // Mobile API routes
  await app.register(authRoutes, { prefix: '/api/v1/mobile/auth' });
  await app.register(userRoutes, { prefix: '/api/v1/mobile/users' });
  await app.register(mallRoutes, { prefix: '/api/v1/mobile/malls' });
  await app.register(navigationRoutes, { prefix: '/api/v1/mobile/navigation' });
  await app.register(offerRoutes, { prefix: '/api/v1/mobile/offers' });
  await app.register(rewardRoutes, { prefix: '/api/v1/mobile/rewards' });
  await app.register(savedRoutes, { prefix: '/api/v1/mobile/saved' });
  await app.register(messagingRoutes, { prefix: '/api/v1/mobile/messages' });
  await app.register(parkingRoutes, { prefix: '/api/v1/mobile/parking' });
  await app.register(mobileBannerRoutes, { prefix: '/api/v1/mobile' });

  // Admin API routes
  await app.register(adminAuthRoutes, { prefix: '/api/v1/admin/auth' });
  await app.register(adminMallRoutes, { prefix: '/api/v1/admin' });
  await app.register(adminStoreRoutes, { prefix: '/api/v1/admin' });
  await app.register(adminUserRoutes, { prefix: '/api/v1/admin' });
  await app.register(adminOfferRoutes, { prefix: '/api/v1/admin' });
  await app.register(adminAnalyticsRoutes, { prefix: '/api/v1/admin' });
  await app.register(adminBannerRoutes, { prefix: '/api/v1/admin' });

  return app as unknown as FastifyInstance;
};
