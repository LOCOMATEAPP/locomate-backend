import { FastifyRequest, FastifyReply } from 'fastify';
import { MallService } from './service';
import { getMallsQuerySchema } from './schema';
import { sendSuccess, sendError } from '../../../utils/response';

export class MallController {
  private service: MallService;

  constructor() {
    this.service = new MallService();
  }

  getMalls = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { city, page, limit } = getMallsQuerySchema.parse(request.query);
      const result = await this.service.getMalls(city, page, limit);
      sendSuccess(reply, result, 'Malls retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get malls', 400);
    }
  };

  getMallById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const mall = await this.service.getMallById(id);
      sendSuccess(reply, mall, 'Mall retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get mall', 404);
    }
  };

  getFloors = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { mallId } = request.params as { mallId: string };
      const floors = await this.service.getFloorsByMallId(mallId);
      sendSuccess(reply, floors, 'Floors retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get floors', 400);
    }
  };

  getStores = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { mallId } = request.params as { mallId: string };
      const { floorId } = request.query as { floorId?: string };
      const stores = await this.service.getStoresByMallId(mallId, floorId);
      sendSuccess(reply, stores, 'Stores retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get stores', 400);
    }
  };

  searchStores = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { mallId } = request.params as { mallId: string };
      const { q } = request.query as { q: string };
      const stores = await this.service.searchStores(mallId, q);
      sendSuccess(reply, stores, 'Search completed successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Search failed', 400);
    }
  };

  getStoreById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const store = await this.service.getStoreById(id);
      sendSuccess(reply, store, 'Store retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get store', 404);
    }
  };
}
