import { FastifyInstance } from 'fastify';
import { AdminStoreController } from './controller';
import { adminAuthMiddleware } from '../../../middleware/admin-auth';

export const adminStoreRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new AdminStoreController();

  // All routes require admin authentication
  app.addHook('preHandler', adminAuthMiddleware);

  // Store routes
  app.post('/stores', controller.createStore);
  app.get('/stores', controller.getStores);
  app.get('/stores/:id', controller.getStoreById);
  app.put('/stores/:id', controller.updateStore);
  app.delete('/stores/:id', controller.deleteStore);
};
