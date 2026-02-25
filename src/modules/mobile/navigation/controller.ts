import { FastifyRequest, FastifyReply } from 'fastify';
import { NavigationService } from './service';
import { calculateRouteSchema } from './schema';
import { sendSuccess, sendError } from '../../../utils/response';
import { AuthenticatedRequest, MobileAuthPayload } from '../../../types';

export class NavigationController {
  private service: NavigationService;

  constructor() {
    this.service = new NavigationService();
  }

  calculateRoute = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const data = calculateRouteSchema.parse(request.body);
      const result = await this.service.calculateRoute(user.userId, data);
      sendSuccess(reply, result, 'Route calculated successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to calculate route', 400);
    }
  };

  getHistory = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { page, limit } = request.query as { page?: number; limit?: number };
      const result = await this.service.getHistory(user.userId, page, limit);
      sendSuccess(reply, result, 'History retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get history', 400);
    }
  };
}
