import { FastifyRequest, FastifyReply } from 'fastify';
import { MessagingService } from './service';
import { sendSuccess, sendError } from '../../../utils/response';
import { AuthenticatedRequest, MobileAuthPayload } from '../../../types';

export class MessagingController {
  private service: MessagingService;

  constructor() {
    this.service = new MessagingService();
  }

  getMessages = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { page, limit } = request.query as { page?: number; limit?: number };
      const result = await this.service.getMessages(user.userId, page, limit);
      sendSuccess(reply, result, 'Messages retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get messages', 400);
    }
  };

  markAsRead = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { id } = request.params as { id: string };
      await this.service.markAsRead(user.userId, id);
      sendSuccess(reply, null, 'Message marked as read');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to mark message as read', 400);
    }
  };
}
