import { FastifyInstance } from 'fastify';
import { adminAuthMiddleware } from '../../../middleware/admin-auth';
import { AnalyticsRepository } from './repository';

const repo = new AnalyticsRepository();

export async function adminAnalyticsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', adminAuthMiddleware);

  app.get('/analytics', async (_req, reply) => {
    const [totalUsers, activeUsers, totalStores, activeOffers, totalClaims, redeemedClaims, parking, topStores] = await Promise.all([
      repo.getTotalUsers(),
      repo.getActiveUsers(30),
      repo.getTotalStores(),
      repo.getActiveOffers(),
      repo.getTotalClaims(),
      repo.getRedeemedClaims(),
      repo.getParkingStats(),
      repo.getTopStores(5),
    ]);
    return reply.send({ success: true, data: { totalUsers, activeUsers, totalStores, activeOffers, totalClaims, redeemedClaims, parking, topStores } });
  });
}
