"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAnalyticsRoutes = adminAnalyticsRoutes;
const admin_auth_1 = require("../../../middleware/admin-auth");
const repository_1 = require("./repository");
const repo = new repository_1.AnalyticsRepository();
async function adminAnalyticsRoutes(app) {
    app.addHook('preHandler', admin_auth_1.adminAuthMiddleware);
    app.get('/analytics', async (_req, reply) => {
        const [totalUsers, activeUsers, totalStores, activeOffers, totalClaims, redeemedClaims, parking, topStores] = await Promise.all([
            repo.getTotalUsers(),
            repo.getActiveUsers(30),
            repo.getTotalStores(),
            repo.getActiveOffers(),
            repo.getTotalClaims(),
            repo.getRedeemedClaims(),
            repo.getParkingStats(),
            repo.getTopStores(5),
        ]);
        return reply.send({ success: true, data: { totalUsers, activeUsers, totalStores, activeOffers, totalClaims, redeemedClaims, parking, topStores } });
    });
}
//# sourceMappingURL=routes.js.map