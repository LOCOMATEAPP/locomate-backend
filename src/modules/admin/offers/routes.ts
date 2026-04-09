import { FastifyInstance } from 'fastify';
import { adminAuthMiddleware } from '../../../middleware/admin-auth';
import { AdminOfferRepository } from './repository';

const repo = new AdminOfferRepository();

function buildOfferData(body: any) {
  const { discountType, discountValue, ...rest } = body;
  const discount = discountType === 'PERCENTAGE' ? `${discountValue}%` :
                   discountType === 'FLAT' ? `₹${discountValue}` :
                   discountType || String(discountValue || '');
  const data: any = { ...rest, discount };
  if (!data.storeId) delete data.storeId;
  if (!data.mallId) delete data.mallId;
  if (!data.description) data.description = '';
  // Convert date strings to Date objects
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate) data.endDate = new Date(data.endDate);
  return data;
}

export async function adminOfferRoutes(app: FastifyInstance) {
  app.addHook('preHandler', adminAuthMiddleware);

  app.get('/offers', async (req: any, reply) => {
    const { page = 1, limit = 20, mallId, storeId } = req.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const { offers, total } = await repo.findOffers(mallId, storeId, skip, Number(limit));
    return reply.send({ success: true, data: { offers, pagination: { total, page: Number(page), limit: Number(limit) } } });
  });

  app.post('/offers', async (req: any, reply) => {
    const offer = await repo.createOffer(buildOfferData(req.body));
    return reply.code(201).send({ success: true, data: offer });
  });

  app.put('/offers/:id', async (req: any, reply) => {
    const offer = await repo.updateOffer(req.params.id, buildOfferData(req.body));
    return reply.send({ success: true, data: offer });
  });

  app.delete('/offers/:id', async (req: any, reply) => {
    await repo.deleteOffer(req.params.id);
    return reply.send({ success: true });
  });
}
