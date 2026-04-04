"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOfferRoutes = adminOfferRoutes;
const admin_auth_1 = require("../../../middleware/admin-auth");
const repository_1 = require("./repository");
const repo = new repository_1.AdminOfferRepository();
async function adminOfferRoutes(app) {
    app.addHook('preHandler', admin_auth_1.adminAuthMiddleware);
    app.get('/offers', async (req, reply) => {
        const { page = 1, limit = 20, mallId, storeId } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const { offers, total } = await repo.findOffers(mallId, storeId, skip, Number(limit));
        return reply.send({ success: true, data: { offers, pagination: { total, page: Number(page), limit: Number(limit) } } });
    });
    app.post('/offers', async (req, reply) => {
        const offer = await repo.createOffer(req.body);
        return reply.code(201).send({ success: true, data: offer });
    });
    app.put('/offers/:id', async (req, reply) => {
        const offer = await repo.updateOffer(req.params.id, req.body);
        return reply.send({ success: true, data: offer });
    });
    app.delete('/offers/:id', async (req, reply) => {
        await repo.deleteOffer(req.params.id);
        return reply.send({ success: true });
    });
}
//# sourceMappingURL=routes.js.map