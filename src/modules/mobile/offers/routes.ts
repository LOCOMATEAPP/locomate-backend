import { FastifyInstance } from 'fastify';
import { OfferController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const offerRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new OfferController();

  app.get('/', { preHandler: mobileAuthMiddleware }, controller.getOffers);
  app.get('/:id', { preHandler: mobileAuthMiddleware }, controller.getOfferById);
};
