import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminStoreService } from './service';
import { createStoreSchema, updateStoreSchema } from './schema';
import { sendSuccess, sendError } from '../../../utils/response';

export class AdminStoreController {
  private service: AdminStoreService;

  constructor() {
    this.service = new AdminStoreService();
  }

  createStore = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const data = createStoreSchema.parse(request.body);
      const result = await this.service.createStore(data);
      sendSuccess(reply, result, 'Store created successfully', 201);
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to create store', 400);
    }
  };

  updateStore = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const data = updateStoreSchema.parse(request.body);
      const result = await this.service.updateStore(id, data);
      sendSuccess(reply, result, 'Store updated successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to update store', 400);
    }
  };

  deleteStore = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const result = await this.service.deleteStore(id);
      sendSuccess(reply, result, 'Store deleted successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to delete store', 400);
    }
  };

  getStores = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { mallId, page = '1', limit = '10' } = request.query as {
        mallId?: string;
        page?: string;
        limit?: string;
      };
      const result = await this.service.getStores(mallId, parseInt(page), parseInt(limit));
      sendSuccess(reply, result, 'Stores retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to retrieve stores', 400);
    }
  };

  getStoreById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const result = await this.service.getStoreById(id);
      sendSuccess(reply, result, 'Store retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to retrieve store', 404);
    }
  };
}
