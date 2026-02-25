import { FastifyRequest, FastifyReply } from 'fastify';
import { ParkingService } from './service';
import { startParkingSchema } from './schema';
import { sendSuccess, sendError, sendCreated } from '../../../utils/response';
import { AuthenticatedRequest, MobileAuthPayload } from '../../../types';

export class ParkingController {
  private service: ParkingService;

  constructor() {
    this.service = new ParkingService();
  }

  startParking = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { location } = startParkingSchema.parse(request.body);
      const result = await this.service.startParking(user.userId, location);
      sendCreated(reply, result, 'Parking session started');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to start parking', 400);
    }
  };

  getActiveSession = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const result = await this.service.getActiveSession(user.userId);
      sendSuccess(reply, result, 'Active session retrieved');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get active session', 400);
    }
  };

  endParking = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const result = await this.service.endParking(user.userId);
      sendSuccess(reply, result, 'Parking session ended');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to end parking', 400);
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
