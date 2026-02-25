import { FastifyInstance } from 'fastify';
import { ParkingController } from './controller';
import { mobileAuthMiddleware } from '../../../middleware/mobile-auth';

export const parkingRoutes = async (app: FastifyInstance): Promise<void> => {
  const controller = new ParkingController();

  app.post('/start', { preHandler: mobileAuthMiddleware }, controller.startParking);
  app.get('/active', { preHandler: mobileAuthMiddleware }, controller.getActiveSession);
  app.post('/end', { preHandler: mobileAuthMiddleware }, controller.endParking);
  app.get('/history', { preHandler: mobileAuthMiddleware }, controller.getHistory);
};
