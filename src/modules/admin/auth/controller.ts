import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminAuthService } from './service';
import { adminLoginSchema, adminRefreshTokenSchema } from './schema';
import { sendSuccess, sendError } from '../../../utils/response';
import { AuthenticatedRequest, AdminAuthPayload } from '../../../types';

export class AdminAuthController {
  private service: AdminAuthService;

  constructor() {
    this.service = new AdminAuthService();
  }

  login = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { email, password } = adminLoginSchema.parse(request.body);
      const result = await this.service.login(email, password);
      sendSuccess(reply, result, 'Login successful');
    } catch (error: any) {
      sendError(reply, error.message, 'Login failed', 401);
    }
  };

  refreshToken = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { refreshToken } = adminRefreshTokenSchema.parse(request.body);
      const result = await this.service.refreshAccessToken(refreshToken);
      sendSuccess(reply, result, 'Token refreshed successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Token refresh failed', 401);
    }
  };

  logout = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as AdminAuthPayload;
      const { refreshToken } = request.body as { refreshToken?: string };
      
      await this.service.logout(user.adminId, refreshToken);
      sendSuccess(reply, null, 'Logged out successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Logout failed', 400);
    }
  };
}
