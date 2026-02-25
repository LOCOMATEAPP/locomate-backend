import { FastifyInstance } from 'fastify';
import { UserController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const userRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new UserController();

  app.get('/profile', { preHandler: mobileAuthMiddleware }, controller.getProfile);
  app.put('/profile', { preHandler: mobileAuthMiddleware }, controller.updateProfile);
};
