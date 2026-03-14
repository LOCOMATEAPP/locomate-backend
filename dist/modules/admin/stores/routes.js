"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStoreRoutes = void 0;
const controller_1 = require("./controller");
const admin_auth_1 = require("../../../middleware/admin-auth");
const adminStoreRoutes = async (app) => {
    const controller = new controller_1.AdminStoreController();
    // All routes require admin authentication
    app.addHook('preHandler', admin_auth_1.adminAuthMiddleware);
    // Store routes
    app.post('/stores', controller.createStore);
    app.get('/stores', controller.getStores);
    app.get('/stores/:id', controller.getStoreById);
    app.put('/stores/:id', controller.updateStore);
    app.delete('/stores/:id', controller.deleteStore);
};
exports.adminStoreRoutes = adminStoreRoutes;
//# sourceMappingURL=routes.js.map