import { FastifyRequest, FastifyReply } from 'fastify';
import { OfferService } from './service';
import { sendSuccess, sendError } from '../../../utils/response';

export class OfferController {
  private service: OfferService;

  constructor() {
    this.service = new OfferService();
  }

  getOffers = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { mallId, page, limit } = request.query as { mallId?: string; page?: number; limit?: number };
      const result = await this.service.getOffers(mallId, page, limit);
      sendSuccess(reply, result, 'Offers retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get offers', 400);
    }
  };

  getOfferById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const offer = await this.service.getOfferById(id);
      sendSuccess(reply, offer, 'Offer retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get offer', 404);
    }
  };
}
