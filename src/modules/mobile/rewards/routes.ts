import { FastifyInstance } from 'fastify';
import { RewardController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const rewardRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new RewardController();

  app.post('/claim', { preHandler: mobileAuthMiddleware }, controller.claimOffer);
  app.get('/my-claims', { preHandler: mobileAuthMiddleware }, controller.getMyClaims);
  app.post('/redeem', { preHandler: mobileAuthMiddleware }, controller.redeemReward);
};
