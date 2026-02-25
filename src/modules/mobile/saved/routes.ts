import { FastifyInstance } from 'fastify';
import { SavedController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const savedRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new SavedController();

  app.post('/store', { preHandler: mobileAuthMiddleware }, controller.saveStore);
  app.post('/offer', { preHandler: mobileAuthMiddleware }, controller.saveOffer);
  app.delete('/:id', { preHandler: mobileAuthMiddleware }, controller.removeSaved);
  app.get('/', { preHandler: mobileAuthMiddleware }, controller.getSavedItems);
};
