import { FastifyInstance } from 'fastify';
import { adminAuthMiddleware } from '../../../middleware/admin-auth';
import { prisma } from '../../../config/database';

export async function adminBannerRoutes(app: FastifyInstance) {
  app.addHook('preHandler', adminAuthMiddleware);

  app.get('/banners', async (_req, reply) => {
    const banners = await prisma.banner.findMany({ orderBy: { sortOrder: 'asc' } });
    return reply.send({ success: true, data: banners });
  });

  app.post('/banners', async (req: any, reply) => {
    const banner = await prisma.banner.create({ data: req.body });
    return reply.code(201).send({ success: true, data: banner });
  });

  app.put('/banners/:id', async (req: any, reply) => {
    const banner = await prisma.banner.update({ where: { id: req.params.id }, data: req.body });
    return reply.send({ success: true, data: banner });
  });

  app.delete('/banners/:id', async (req: any, reply) => {
    await prisma.banner.delete({ where: { id: req.params.id } });
    return reply.send({ success: true });
  });
}
