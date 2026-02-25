import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyMobileAccessToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export const mobileAuthMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(reply, 'No token provided', 'Unauthorized', 401);
    }

    const token = authHeader.substring(7);
    const payload = verifyMobileAccessToken(token);

    (request as AuthenticatedRequest).user = payload;
  } catch (error) {
    return sendError(reply, 'Invalid or expired token', 'Unauthorized', 401);
  }
};
