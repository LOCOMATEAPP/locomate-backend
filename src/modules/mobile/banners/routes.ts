import { FastifyInstance } from 'fastify';
import { prisma } from '../../../config/database';

export async function mobileBannerRoutes(app: FastifyInstance) {
  app.get('/banners', async (_req, reply) => {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return reply.send({ success: true, data: banners });
  });
}
