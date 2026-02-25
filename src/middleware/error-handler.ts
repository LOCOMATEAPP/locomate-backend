import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../config/logger';
import { sendError } from '../utils/response';
import { ZodError } from 'zod';

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): void => {
  logger.error({
    err: error,
    url: request.url,
    method: request.method,
  }, 'Request error');

  if (error instanceof ZodError) {
    const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return sendError(reply, messages, 'Validation error', 400);
  }

  if (error.statusCode === 429) {
    return sendError(reply, 'Too many requests', 'Rate limit exceeded', 429);
  }

  if (error.statusCode && error.statusCode < 500) {
    return sendError(reply, error.message, 'Client error', error.statusCode);
  }

  return sendError(reply, 'Internal server error', 'Server error', 500);
};
