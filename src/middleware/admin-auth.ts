import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyAdminAccessToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import { AuthenticatedRequest, AdminAuthPayload } from '../types';

export const adminAuthMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(reply, 'No token provided', 'Unauthorized', 401);
    }

    const token = authHeader.substring(7);
    const payload = verifyAdminAccessToken(token);

    (request as AuthenticatedRequest).user = payload;
  } catch (error) {
    return sendError(reply, 'Invalid or expired token', 'Unauthorized', 401);
  }
};

export const requirePermission = (_resource: string, _action: string) => {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const user = (request as AuthenticatedRequest).user as AdminAuthPayload;

    if (!user || user.type !== 'admin') {
      return sendError(reply, 'Unauthorized', 'Forbidden', 403);
    }

    // Permission check would be done via database query
    // For now, we'll assume SuperAdmin has all permissions
    // In production, query the role_permissions table
  };
};
