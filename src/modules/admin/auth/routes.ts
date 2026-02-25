import { FastifyInstance } from 'fastify';
import { AdminAuthController } from './controller';
import { adminAuthMiddleware } from '../../../middleware/admin-auth';

export const adminAuthRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new AdminAuthController();

  app.post('/login', controller.login);
  app.post('/refresh-token', controller.refreshToken);
  app.post('/logout', { preHandler: adminAuthMiddleware }, controller.logout);
};
