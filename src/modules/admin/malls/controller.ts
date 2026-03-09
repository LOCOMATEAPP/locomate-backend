import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminMallService } from './service';
import { createMallSchema, updateMallSchema, createFloorSchema, updateFloorSchema } from './schema';
import { sendSuccess, sendError } from '../../../utils/response';

export class AdminMallController {
  private service: AdminMallService;

  constructor() {
    this.service = new AdminMallService();
  }

  createMall = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const data = createMallSchema.parse(request.body);
      const result = await this.service.createMall(data);
      sendSuccess(reply, result, 'Mall created successfully', 201);
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to create mall', 400);
    }
  };

  updateMall = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const data = updateMallSchema.parse(request.body);
      const result = await this.service.updateMall(id, data);
      sendSuccess(reply, result, 'Mall updated successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to update mall', 400);
    }
  };

  deleteMall = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const result = await this.service.deleteMall(id);
      sendSuccess(reply, result, 'Mall deleted successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to delete mall', 400);
    }
  };

  getMalls = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { page = '1', limit = '10' } = request.query as { page?: string; limit?: string };
      const result = await this.service.getMalls(parseInt(page), parseInt(limit));
      sendSuccess(reply, result, 'Malls retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to retrieve malls', 400);
    }
  };

  getMallById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const result = await this.service.getMallById(id);
      sendSuccess(reply, result, 'Mall retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to retrieve mall', 404);
    }
  };

  createFloor = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const data = createFloorSchema.parse(request.body);
      const result = await this.service.createFloor(data);
      sendSuccess(reply, result, 'Floor created successfully', 201);
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to create floor', 400);
    }
  };

  updateFloor = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const data = updateFloorSchema.parse(request.body);
      const result = await this.service.updateFloor(id, data);
      sendSuccess(reply, result, 'Floor updated successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to update floor', 400);
    }
  };

  deleteFloor = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { id } = request.params as { id: string };
      const result = await this.service.deleteFloor(id);
      sendSuccess(reply, result, 'Floor deleted successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to delete floor', 400);
    }
  };

  getFloors = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { mallId } = request.params as { mallId: string };
      const result = await this.service.getFloors(mallId);
      sendSuccess(reply, result, 'Floors retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to retrieve floors', 400);
    }
  };
}
