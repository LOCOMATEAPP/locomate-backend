import { FastifyInstance } from 'fastify';
import { adminAuthMiddleware } from '../../../middleware/admin-auth';
import { AdminUserRepository } from './repository';

const repo = new AdminUserRepository();

export async function adminUserRoutes(app: FastifyInstance) {
  app.addHook('preHandler', adminAuthMiddleware);

  app.get('/users', async (req: any, reply) => {
    const { page = 1, limit = 20 } = req.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const { users, total } = await repo.findUsers(skip, Number(limit));
    return reply.send({ success: true, data: { users, pagination: { total, page: Number(page), limit: Number(limit) } } });
  });

  app.patch('/users/:id/block', async (req: any, reply) => {
    const user = await repo.blockUser(req.params.id);
    return reply.send({ success: true, data: user });
  });

  app.patch('/users/:id/unblock', async (req: any, reply) => {
    const user = await repo.unblockUser(req.params.id);
    return reply.send({ success: true, data: user });
  });
}
