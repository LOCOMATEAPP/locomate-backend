import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from './service';
import { updateProfileSchema } from './schema';
import { sendSuccess, sendError } from '../../../utils/response';
import { AuthenticatedRequest, MobileAuthPayload } from '../../../types';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getProfile = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const profile = await this.service.getProfile(user.userId);
      sendSuccess(reply, profile, 'Profile retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get profile', 400);
    }
  };

  updateProfile = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const data = updateProfileSchema.parse(request.body);
      const profile = await this.service.updateProfile(user.userId, data);
      sendSuccess(reply, profile, 'Profile updated successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to update profile', 400);
    }
  };
}
