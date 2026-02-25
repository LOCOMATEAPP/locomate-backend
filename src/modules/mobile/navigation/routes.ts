import { FastifyInstance } from 'fastify';
import { NavigationController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const navigationRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new NavigationController();

  app.post('/route', { preHandler: mobileAuthMiddleware }, controller.calculateRoute);
  app.get('/history', { preHandler: mobileAuthMiddleware }, controller.getHistory);
};
