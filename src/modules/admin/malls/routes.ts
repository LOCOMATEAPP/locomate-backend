import { FastifyInstance } from 'fastify';
import { AdminMallController } from './controller';
import { adminAuthMiddleware } from '../../../middleware/admin-auth';

export const adminMallRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new AdminMallController();

  // All routes require admin authentication
  app.addHook('preHandler', adminAuthMiddleware);

  // Mall routes
  app.post('/malls', controller.createMall);
  app.get('/malls', controller.getMalls);
  app.get('/malls/:id', controller.getMallById);
  app.put('/malls/:id', controller.updateMall);
  app.delete('/malls/:id', controller.deleteMall);

  // Floor routes
  app.post('/floors', controller.createFloor);
  app.get('/malls/:mallId/floors', controller.getFloors);
  app.put('/floors/:id', controller.updateFloor);
  app.delete('/floors/:id', controller.deleteFloor);
};
