import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

export const registerCors = async (app: FastifyInstance): Promise<void> => {
  await app.register(cors, {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] 
      : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
};
