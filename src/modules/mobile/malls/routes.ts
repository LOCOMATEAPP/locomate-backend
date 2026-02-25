import { FastifyInstance } from 'fastify';
import { MallController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const mallRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new MallController();

  app.get('/', { preHandler: mobileAuthMiddleware }, controller.getMalls);
  app.get('/:id', { preHandler: mobileAuthMiddleware }, controller.getMallById);
  app.get('/:mallId/floors', { preHandler: mobileAuthMiddleware }, controller.getFloors);
  app.get('/:mallId/stores', { preHandler: mobileAuthMiddleware }, controller.getStores);
  app.get('/:mallId/stores/search', { preHandler: mobileAuthMiddleware }, controller.searchStores);
  app.get('/stores/:id', { preHandler: mobileAuthMiddleware }, controller.getStoreById);
};
