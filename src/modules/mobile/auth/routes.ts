import { FastifyInstance } from 'fastify';
import { AuthController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const authRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new AuthController();

  app.post('/send-otp', controller.sendOTP);
  app.post('/verify-otp', controller.verifyOTP);
  app.post('/refresh-token', controller.refreshToken);
  app.post('/logout', { preHandler: mobileAuthMiddleware }, controller.logout);
};
