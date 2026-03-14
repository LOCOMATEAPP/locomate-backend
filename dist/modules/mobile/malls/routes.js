"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mallRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const mallRoutes = async (app) => {
    const controller = new controller_1.MallController();
    app.get('/', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getMalls);
    app.get('/:id', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getMallById);
    app.get('/:mallId/floors', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getFloors);
    app.get('/:mallId/stores', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getStores);
    app.get('/:mallId/stores/search', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.searchStores);
    app.get('/stores/:id', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getStoreById);
};
exports.mallRoutes = mallRoutes;
//# sourceMappingURL=routes.js.map