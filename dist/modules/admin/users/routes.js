"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserRoutes = adminUserRoutes;
const admin_auth_1 = require("../../../middleware/admin-auth");
const repository_1 = require("./repository");
const repo = new repository_1.AdminUserRepository();
async function adminUserRoutes(app) {
    app.addHook('preHandler', admin_auth_1.adminAuthMiddleware);
    app.get('/users', async (req, reply) => {
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const { users, total } = await repo.findUsers(skip, Number(limit));
        return reply.send({ success: true, data: { users, pagination: { total, page: Number(page), limit: Number(limit) } } });
    });
    app.patch('/users/:id/block', async (req, reply) => {
        const user = await repo.blockUser(req.params.id);
        return reply.send({ success: true, data: user });
    });
    app.patch('/users/:id/unblock', async (req, reply) => {
        const user = await repo.unblockUser(req.params.id);
        return reply.send({ success: true, data: user });
    });
}
//# sourceMappingURL=routes.js.map