import { FastifyReply } from 'fastify';
import { ApiResponse } from '../types';

export const sendSuccess = <T>(
  reply: FastifyReply,
  data: T,
  message = 'Success',
  statusCode = 200
): FastifyReply => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    error: null,
  };
  return reply.code(statusCode).send(response);
};

export const sendError = (
  reply: FastifyReply,
  error: string,
  message = 'Error',
  statusCode = 400
): FastifyReply => {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  return reply.code(statusCode).send(response);
};

export const sendCreated = <T>(
  reply: FastifyReply,
  data: T,
  message = 'Created successfully'
): FastifyReply => {
  return sendSuccess(reply, data, message, 201);
};

export const sendNoContent = (reply: FastifyReply): FastifyReply => {
  return reply.code(204).send();
};
