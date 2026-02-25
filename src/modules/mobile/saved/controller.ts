import { FastifyRequest, FastifyReply } from 'fastify';
import { SavedService } from './service';
import { saveStoreSchema, saveOfferSchema } from './schema';
import { sendSuccess, sendError, sendCreated } from '../../../utils/response';
import { AuthenticatedRequest, MobileAuthPayload } from '../../../types';

export class SavedController {
  private service: SavedService;

  constructor() {
    this.service = new SavedService();
  }

  saveStore = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { storeId } = saveStoreSchema.parse(request.body);
      const result = await this.service.saveStore(user.userId, storeId);
      sendCreated(reply, result, 'Store saved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to save store', 400);
    }
  };

  saveOffer = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { offerId } = saveOfferSchema.parse(request.body);
      const result = await this.service.saveOffer(user.userId, offerId);
      sendCreated(reply, result, 'Offer saved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to save offer', 400);
    }
  };

  removeSaved = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { id } = request.params as { id: string };
      await this.service.removeSaved(id, user.userId);
      sendSuccess(reply, null, 'Item removed successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to remove item', 400);
    }
  };

  getSavedItems = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { type } = request.query as { type?: string };
      const result = await this.service.getSavedItems(user.userId, type);
      sendSuccess(reply, result, 'Saved items retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get saved items', 400);
    }
  };
}
