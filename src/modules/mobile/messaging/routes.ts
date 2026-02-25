import { FastifyInstance } from 'fastify';
import { MessagingController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const messagingRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new MessagingController();

  app.get('/', { preHandler: mobileAuthMiddleware }, controller.getMessages);
  app.post('/:id/read', { preHandler: mobileAuthMiddleware }, controller.markAsRead);
};
